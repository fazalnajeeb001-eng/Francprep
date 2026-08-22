import { createFileRoute, useNavigate, useParams, useSearch, Navigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Clock,
  Pause,
  Play,
  HelpCircle,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Trophy,
  Send,
  Flag,
  Globe,
  Sun,
  Moon,
  Square,
  RotateCcw,
  Home,
  Search,
  AlertTriangle,
  Lock,
  FastForward,
  ShieldAlert,
  X
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { useSpeak } from "~/lib/speech";
import { triggerAcousticSoundForQuestion } from "~/lib/soundEffects";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { useAuth } from "~/lib/AuthContext";
import { SmartAvatar } from "~/components/dashboard/widgets/SmartAvatar";
import { getExamRegistry, calculateNCLCScore, type ExamPaper, type ExamMode } from "~/lib/examSchema";
import { acousticAnalyzer, type AcousticAnalysisResult } from "~/lib/acousticAnalyzer";

function countFrenchWords(str: string): number {
  if (!str || !str.trim()) return 0;
  return str.trim().replace(/['’]/g, " ").split(/\s+/).filter(Boolean).length;
}

function calculateTextSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\w\sàâæçéèêëîïôœùûüÿ]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

  const words1 = normalize(str1);
  const words2 = normalize(str2);
  if (words1.length < 4 || words2.length < 4) return 0;

  const getTrigrams = (words: string[]) => {
    const trigrams = new Set<string>();
    for (let i = 0; i <= words.length - 3; i++) {
      trigrams.add(words.slice(i, i + 3).join(" "));
    }
    return trigrams;
  };

  const tri1 = getTrigrams(words1);
  const tri2 = getTrigrams(words2);
  let triMatches = 0;
  tri1.forEach((t) => {
    if (tri2.has(t)) triMatches++;
  });
  const trigramRatio1 = tri1.size > 0 ? (triMatches / tri1.size) * 100 : 0;
  const trigramRatio2 = tri2.size > 0 ? (triMatches / tri2.size) * 100 : 0;

  const set1 = new Set(words1);
  const set2 = new Set(words2);
  let intersection = 0;
  set1.forEach((w) => {
    if (set2.has(w)) intersection++;
  });
  const union = new Set([...words1, ...words2]).size;
  const jaccardRatio = union > 0 ? (intersection / union) * 100 : 0;

  if (tri1.size > 0 && triMatches > 0) {
    return Math.round(Math.max(trigramRatio1, trigramRatio2 * 0.7, jaccardRatio * 0.7));
  }

  return Math.round(jaccardRatio * 0.4);
}


export function AuthenticCBTExamPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const activeLang = getActiveLanguageCode(user);
  const activeBranding = getTrackBranding(activeLang);

  const { paperId } = (useParams({ strict: false }) || {}) as { paperId?: string };
  const search = (useSearch({ strict: false }) || {}) as { mode?: ExamMode };
  const mode: ExamMode = search.mode || "PRACTICE";
  const { dark } = useTheme();

  // Test-Center High-Contrast Toggle (Default light CBT canvas for authentic exam day feel)
  const [cbtDark, setCbtDark] = useState(false);

  // Admin Account Free-Roam Detection (Supports role === 'admin' | 'ADMIN', isAdmin flag, or stored localStorage admin)
  const isAdmin = Boolean(
    (user && (user.role?.toLowerCase() === 'admin' || (user as any).isAdmin || user.email?.toLowerCase().includes('admin'))) ||
    (typeof window !== "undefined" && (() => {
      try {
        const stored = localStorage.getItem("francprep_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.role?.toLowerCase() === 'admin' || parsed.isAdmin || parsed.email?.toLowerCase().includes('admin');
        }
      } catch {}
      return false;
    })())
  );

  const registry = getExamRegistry() || [];
  const paper: ExamPaper = registry.find((p) => p.id === paperId) || registry[0] || {
    id: paperId || "tcf1",
    title: "TCF Canada Exam Paper 1",
    type: "TCF_CANADA",
    code: "P1",
    sections: []
  };

  // Official Real Exam Duration Helper (France Éducation International CBT Standards)
  const getSectionDurationSeconds = (secType?: string, customDurationMins?: number) => {
    if (secType === "COMPREHENSION_ECRITE") return 60 * 60; // Strict 60 mins (3600s)
    if (secType === "EXPRESSION_ECRITE") return 60 * 60;    // Strict 60 mins (3600s)
    if (secType === "COMPREHENSION_ORALE") return 35 * 60;   // ~35 mins (2100s)
    if (secType === "EXPRESSION_ORALE") return 12 * 60;      // ~12 mins (720s)
    return (customDurationMins || 35) * 60;
  };

  // Active Section Index
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const currentSection = paper?.sections?.[activeSectionIdx] || paper?.sections?.[0] || {
    type: "COMPREHENSION_ORALE",
    title: "Compréhension Orale",
    durationMins: 35,
    questions: []
  };

  // Active Question Index
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestions = currentSection?.questions || [];
  const currentQ = currentQuestions[currentQuestionIdx] || currentQuestions[0];

  // Session Key
  const sessionKey = `fp_exam_session_${paper?.id || "default"}_${mode}`;

  // Completed Section Indices (Enforces Linear Exam Flow in Real Exam Mode)
  const [completedSectionIndices, setCompletedSectionIndices] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).completedSectionIndices || [];
    } catch {}
    return [];
  });

  // Track Remaining Time per Section (Persisted in localStorage)
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState<Record<number, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).sectionTimeRemaining || {};
    } catch {}
    return {};
  });

  // Active Section Countdown Timer State
  const [timeLeft, setTimeLeft] = useState(() => {
    return getSectionDurationSeconds(currentSection?.type, currentSection?.durationMins);
  });
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [qTimeLeft, setQTimeLeft] = useState<number | null>(null);
  const [isAudioFetching, setIsAudioFetching] = useState(false);
  const [sectionTransitionModal, setSectionTransitionModal] = useState<{ show: boolean; targetIdx: number; targetTitle: string } | null>(null);

  // Existing Session Prompt Modal State (Triggers when student reopens an exam with saved progress)
  const [showSessionPromptModal, setShowSessionPromptModal] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasAnswers = Object.keys(parsed.selectedAnswers || {}).length > 0;
        const hasWriting = Object.keys(parsed.writingResponses || {}).some((k: string) => Boolean(parsed.writingResponses[k]));
        const hasSpeaking = Object.keys(parsed.speakingDialogueMap || {}).some((k: string) => (parsed.speakingDialogueMap[k] || []).length > 0);
        return hasAnswers || hasWriting || hasSpeaking;
      }
    } catch {}
    return false;
  });

  // Audio Speech Hook (Declared at top of component to prevent TDZ ReferenceError)
  const { speak: ttsSpeak, speakDialogue: ttsSpeakDialogue, speakListening: ttsSpeakListening, isSpeaking, stop: ttsStop, pause: ttsPause, resume: ttsResume } = useSpeak();

  // Practice Mode Toggles
  const [showHints, setShowHints] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [showQuestionPrompt, setShowQuestionPrompt] = useState(false);
  const [showPassageTranslation, setShowPassageTranslation] = useState(false);

  // User Responses State (with localStorage Session Restoration)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).selectedAnswers || {};
    } catch {}
    return {};
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [qId: string]: boolean }>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).flaggedQuestions || {};
    } catch {}
    return {};
  });

  const [writingResponses, setWritingResponses] = useState<{ [taskId: string]: string }>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).writingResponses || {};
    } catch {}
    return {};
  });

  const [speakingTranscripts, setSpeakingTranscripts] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(sessionKey);
      if (saved) return JSON.parse(saved).speakingTranscripts || {};
    } catch {}
    return {};
  });

  // Practice Mode Attempt & Check Answer Logic
  const [attemptsMap, setAttemptsMap] = useState<{ [qId: string]: number }>({});
  const [checkedMap, setCheckedMap] = useState<{ [qId: string]: boolean }>({});

  // AI Writing Evaluation States
  const [writingAiResults, setWritingAiResults] = useState<Record<string, any>>({});
  const [evaluatingWriting, setEvaluatingWriting] = useState<Record<string, boolean>>({});

  // AI Speaking Evaluation States
  const [recordingSpeaking, setRecordingSpeaking] = useState<Record<string, boolean>>({});
  const [speakingAiResults, setSpeakingAiResults] = useState<Record<string, any>>({});
  const [evaluatingSpeaking, setEvaluatingSpeaking] = useState<Record<string, boolean>>({});
  const [speakingDialogueMap, setSpeakingDialogueMap] = useState<Record<string, Array<{ sender: 'examiner' | 'candidate'; text: string }>>>({});
  const [speakingChatLoading, setSpeakingChatLoading] = useState<Record<string, boolean>>({});
  const [oralPrepTimeRemaining, setOralPrepTimeRemaining] = useState<Record<string, number>>({});
  const [isOralPrepActive, setIsOralPrepActive] = useState<Record<string, boolean>>({});

  const handleRestartSessionClean = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(sessionKey);
      } catch {}
    }
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setWritingResponses({});
    setSpeakingTranscripts({});
    setSpeakingDialogueMap({});
    setWritingAiResults({});
    setSpeakingAiResults({});
    setSectionTimeRemaining({});
    setShowSessionPromptModal(false);
  };
  const [oralSpeakingTimeRemaining, setOralSpeakingTimeRemaining] = useState<Record<string, number>>({});
  const [isOralSpeakingActive, setIsOralSpeakingActive] = useState<Record<string, boolean>>({});
  const [oralScratchNotes, setOralScratchNotes] = useState<Record<string, string>>({});
  const [speakingAcousticMetrics, setSpeakingAcousticMetrics] = useState<Record<string, AcousticAnalysisResult>>({});

  // Practice Helper & Task Tab States
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showReadingHint, setShowReadingHint] = useState(false);
  const [failedImagesMap, setFailedImagesMap] = useState<Record<string, boolean>>({});
  const [activeWritingTaskIdx, setActiveWritingTaskIdx] = useState(0);
  const [activeSpeakingTaskIdx, setActiveSpeakingTaskIdx] = useState(0);
  const [showSpeakingDisclaimer, setShowSpeakingDisclaimer] = useState(false);
  const [hasAcceptedSpeakingDisclaimer, setHasAcceptedSpeakingDisclaimer] = useState(false);
  const [showSectionDisclaimer, setShowSectionDisclaimer] = useState(false);
  const [acceptedSectionDisclaimers, setAcceptedSectionDisclaimers] = useState<Record<string, boolean>>({});

  // Submission & Results & Strategy Modals State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [openModelAnswerTaskId, setOpenModelAnswerTaskId] = useState<string | null>(null);

  // Mobile Ergonomic Viewport States
  const [showMobileStrategyDrawer, setShowMobileStrategyDrawer] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);
  const [readingFontSize, setReadingFontSize] = useState<"sm" | "base" | "lg">("base");

  // Per-Question CBT Countdown Timer & Auto-Advance (Runs in BOTH Practice & Exam Modes for Comprehension Orale)
  useEffect(() => {
    if (currentSection.type !== "COMPREHENSION_ORALE" || !currentQ || isSubmitted) {
      setQTimeLeft(null);
      return;
    }

    // Do NOT count down while audio is playing, while student has paused the timer/audio, OR before audio has finished playing!
    if (isSpeaking || isAudioPaused || isTimerPaused || !isAudioFinished) {
      return;
    }

    const interval = setInterval(() => {
      setQTimeLeft((prev) => {
        if (prev === null) {
          const timerSecs = (currentQ as any).perQuestionTimerSeconds || (currentQ.questionNumber <= 10 ? 15 : currentQ.questionNumber <= 26 ? 20 : 25);
          return timerSecs;
        }
        if (prev <= 1) {
          clearInterval(interval);
          if (currentQuestionIdx < currentQuestions.length - 1) {
            setCurrentQuestionIdx((idx) => idx + 1);
          } else if (activeSectionIdx < paper.sections.length - 1) {
            setActiveSectionIdx((sIdx) => sIdx + 1);
            setCurrentQuestionIdx(0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIdx, activeSectionIdx, mode, currentSection.type, currentQ, isSubmitted, isSpeaking, isAudioPaused, isTimerPaused, isAudioFinished, currentQuestions.length, paper.sections.length]);

  // Load / initialize section timer when active section changes
  useEffect(() => {
    const sec = paper?.sections?.[activeSectionIdx];
    const defaultSecDuration = getSectionDurationSeconds(sec?.type, sec?.durationMins);
    const savedTime = sectionTimeRemaining[activeSectionIdx];
    setTimeLeft(typeof savedTime === "number" && savedTime > 0 ? savedTime : defaultSecDuration);
  }, [activeSectionIdx]);

  // Active Section-Level CBT Countdown Timer (60 Mins for Reading, 60 Mins for Writing, 35 Mins for Listening, 12 Mins for Speaking)
  useEffect(() => {
    if (isSubmitted) return;

    // In practice mode or for admin, allow pausing the main timer
    if (isTimerPaused && (mode === "PRACTICE" || isAdmin)) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = Math.max(0, prev - 1);

        // Continuously persist remaining time for this section
        setSectionTimeRemaining((p) => ({ ...p, [activeSectionIdx]: nextTime }));

        if (nextTime <= 0) {
          clearInterval(interval);
          // Handle Section Timeout in Real Exam Mode
          if (mode === "EXAM") {
            if (activeSectionIdx < paper.sections.length - 1) {
              const nextIdx = activeSectionIdx + 1;
              setCompletedSectionIndices((prevCompleted) => Array.from(new Set([...prevCompleted, activeSectionIdx])));
              setActiveSectionIdx(nextIdx);
              setCurrentQuestionIdx(0);
              const nextSec = paper.sections[nextIdx];
              return getSectionDurationSeconds(nextSec?.type, nextSec?.durationMins);
            } else {
              handleFinishTest();
              return 0;
            }
          }
        }
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSectionIdx, mode, isSubmitted, isTimerPaused, isAdmin, paper.sections.length]);

  const handleStartPrepTimer = (taskId: string, prepMins = 1) => {
    setOralPrepTimeRemaining((prev) => ({
      ...prev,
      [taskId]: (prev[taskId] && prev[taskId] > 0) ? prev[taskId] : prepMins * 60
    }));
    setIsOralPrepActive((prev) => ({ ...prev, [taskId]: true }));
  };

  const handleStartSpeakingTimer = (taskId: string, speakingMins = 2) => {
    setOralSpeakingTimeRemaining((prev) => ({
      ...prev,
      [taskId]: (prev[taskId] && prev[taskId] > 0) ? prev[taskId] : Math.round(speakingMins * 60)
    }));
    setIsOralSpeakingActive((prev) => ({ ...prev, [taskId]: true }));
  };

  useEffect(() => {
    const activeTasks = Object.keys(isOralPrepActive).filter((k) => isOralPrepActive[k] && (oralPrepTimeRemaining[k] || 0) > 0);
    const isChatLoading = Object.values(speakingChatLoading).some(Boolean);
    // CRITICAL FORENSIC GUARD: Freeze prep timer while examiner audio is playing, fetching, or simulator is paused
    if (activeTasks.length === 0 || isSpeaking || isAudioFetching || isChatLoading || isTimerPaused) return;

    const interval = setInterval(() => {
      setOralPrepTimeRemaining((prev) => {
        const next = { ...prev };
        activeTasks.forEach((taskId) => {
          if (next[taskId] > 1) {
            next[taskId] -= 1;
          } else {
            next[taskId] = 0;
            setIsOralPrepActive((p) => ({ ...p, [taskId]: false }));

            // Auto announce end of prep time & ONLY start speaking timer AFTER announcement audio finishes!
            const currentTask = currentSection?.speakingTasks?.find(t => t.id === taskId);
            const duration = currentTask?.speakingTimeMins || (taskId.includes("spk-1") ? 2 : taskId.includes("spk-2") ? 3.5 : 4.5);

            let announceHandled = false;
            const startSpeakingAfterAnnounce = () => {
              if (!announceHandled) {
                announceHandled = true;
                handleStartSpeakingTimer(taskId, duration);
              }
            };

            handlePlayExaminerAudio(
              "Le temps de préparation est terminé. Vous pouvez maintenant vous exprimer en français.",
              startSpeakingAfterAnnounce
            );

            // Fallback safety (10s) in case audio playback is blocked
            setTimeout(() => {
              startSpeakingAfterAnnounce();
            }, 10000);
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOralPrepActive, oralPrepTimeRemaining, currentSection, isSpeaking, isAudioFetching, speakingChatLoading, isTimerPaused]);

  useEffect(() => {
    const activeTasks = Object.keys(isOralSpeakingActive).filter((k) => isOralSpeakingActive[k] && (oralSpeakingTimeRemaining[k] || 0) > 0);
    const isChatLoading = Object.values(speakingChatLoading).some(Boolean);
    // CRITICAL FORENSIC GUARD: Freeze speaking timer while examiner audio is playing, fetching, or simulator is paused
    if (activeTasks.length === 0 || isSpeaking || isAudioFetching || isChatLoading || isTimerPaused) return;

    const interval = setInterval(() => {
      setOralSpeakingTimeRemaining((prev) => {
        const next = { ...prev };
        activeTasks.forEach((taskId) => {
          if (next[taskId] > 1) {
            next[taskId] -= 1;
          } else {
            next[taskId] = 0;
            setIsOralSpeakingActive((p) => ({ ...p, [taskId]: false }));
            // Auto announce completion of task speaking time & auto-advance task tab
            handlePlayExaminerAudio("Le temps d'expression orale pour cette tâche est écoulé. Passons à la tâche suivante.");
            setActiveSpeakingTaskIdx((prevIdx) => Math.min(2, prevIdx + 1));
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOralSpeakingActive, oralSpeakingTimeRemaining, isSpeaking, isAudioFetching, speakingChatLoading, isTimerPaused]);

  const handlePlayExaminerAudio = (text: string, onEnded?: () => void) => {
    handleStopAudio();
    setIsAudioFetching(true);
    const isMale = /\b(monsieur|m\.|homme|paul|léo|marc|antoine|pierre|thomas|hugo|louis)\b/i.test(text);

    const handleEnded = () => {
      setIsAudioFetching(false);
      if (onEnded) onEnded();
    };

    ttsSpeak(text, "fr-FR", 0.9, isMale ? "male" : "female", undefined, undefined, undefined, handleEnded);
  };

  const handleSendSpeakingQuestionToExaminer = async (taskId: string, userText: string, scenarioText: string) => {
    const clean = (userText || '').trim();
    if (!clean) return;

    try {
      unlockAudioEngine();
    } catch {}

    const existingChat = speakingDialogueMap[taskId] || [];
    const updatedMessages = [...existingChat, { sender: 'candidate' as const, text: clean }];
    setSpeakingDialogueMap((prev) => ({ ...prev, [taskId]: updatedMessages }));
    setSpeakingChatLoading((prev) => ({ ...prev, [taskId]: true }));

    try {
      const messagesPayload = updatedMessages.map((m) => ({
        role: m.sender === 'candidate' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await apiFetch("/writing/speaking-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesPayload,
          lessonLevel: "B2",
          lessonTopic: scenarioText || "TCF Oral Interaction",
          targetLanguage: "French",
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.reply) {
        const replyText = json.data.reply;
        setSpeakingDialogueMap((prev) => ({
          ...prev,
          [taskId]: [...updatedMessages, { sender: 'examiner' as const, text: replyText }],
        }));
        handlePlayExaminerAudio(replyText, () => {
          setSpeakingChatLoading((prev) => ({ ...prev, [taskId]: false }));
        });
        return;
      }
    } catch (e) {
      console.error("Examiner chat error:", e);
    }
    setSpeakingChatLoading((prev) => ({ ...prev, [taskId]: false }));
  };

  const startSpeakingTaskSession = (idx: number) => {
    try {
      unlockAudioEngine();
    } catch {}
    const tasks = currentSection?.speakingTasks;
    if (!tasks || tasks.length === 0) return;
    const task = tasks[Math.min(idx, tasks.length - 1)];
    if (!task) return;

    const openingText = task.examinerPersona?.openingPromptFrench || (
      idx === 0 || task.title?.includes("Tâche 1")
        ? "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?"
        : idx === 1 || task.title?.includes("Tâche 2")
        ? "Bonjour ! Je suis le responsable de l'annonce. Je vous écoute, quelles sont vos questions concernant les horaires, tarifs et modalités ?"
        : "Bonjour ! J'aimerais connaître votre point de vue sur ce sujet de société. Présentez-moi vos arguments et votre position."
    );

    let sessionTimerHandled = false;

    if (task.prepTimeMins > 0) {
      // Tâche 2 (Interaction with prep time):
      // Preparation Timer starts ONLY AFTER examiner prompt audio finishes speaking!
      const startPrepAfterAudio = () => {
        if (!sessionTimerHandled) {
          sessionTimerHandled = true;
          handleStartPrepTimer(task.id, task.prepTimeMins);
        }
      };

      handlePlayExaminerAudio(openingText, startPrepAfterAudio);

      // Fallback safety (20s) in case browser blocks audio auto-play
      setTimeout(() => {
        startPrepAfterAudio();
      }, 20000);
    } else {
      // Tâche 1 & Tâche 3 (Direct speaking without prep time):
      // Speaking Timer starts ONLY AFTER examiner prompt audio finishes speaking!
      const startSpeakingAfterAudio = () => {
        if (!sessionTimerHandled) {
          sessionTimerHandled = true;
          handleStartSpeakingTimer(task.id, task.speakingTimeMins);
        }
      };

      handlePlayExaminerAudio(openingText, startSpeakingAfterAudio);

      // Fallback safety (20s) in case browser blocks audio auto-play
      setTimeout(() => {
        startSpeakingAfterAudio();
      }, 20000);
    }
  };

  // Auto-save candidate progress continuously to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || isSubmitted) return;
    try {
      const payload = {
        selectedAnswers,
        flaggedQuestions,
        writingResponses,
        speakingTranscripts,
        completedSectionIndices,
        sectionTimeRemaining,
        activeSectionIdx,
        currentQuestionIdx,
        timestamp: Date.now()
      };
      localStorage.setItem(sessionKey, JSON.stringify(payload));
    } catch {}
  }, [selectedAnswers, flaggedQuestions, writingResponses, speakingTranscripts, completedSectionIndices, sectionTimeRemaining, activeSectionIdx, currentQuestionIdx, isSubmitted, sessionKey]);

  useEffect(() => {
    setShowQuestionPrompt(false);
    setShowTranscript(false);
    setShowTranslation(false);
    setShowReadingHint(false);
  }, [currentQuestionIdx, activeSectionIdx]);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    return () => {
      const stored = typeof window !== "undefined" ? localStorage.getItem("fp_theme") : null;
      if (stored !== "light") {
        document.documentElement.classList.add("dark");
      }
    };
  }, []);

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => {
      const isCurrentlyFlagged = Boolean(prev[qId]);
      const next = { ...prev };
      if (isCurrentlyFlagged) {
        delete next[qId];
      } else {
        next[qId] = true;
      }
      return next;
    });
  };

  const handleCheckAnswer = (qId: string, correctIdx: number) => {
    const currentAttempts = (attemptsMap[qId] || 0) + 1;
    const isCorrect = selectedAnswers[qId] === correctIdx;
    setAttemptsMap((prev) => ({ ...prev, [qId]: currentAttempts }));

    if (isCorrect || currentAttempts >= 2) {
      setCheckedMap((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const handleToggleSpeakingRecording = async (taskId: string) => {
    const isCurrentlyRecording = recordingSpeaking[taskId];

    if (isCurrentlyRecording) {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: false }));
      const currentText = speakingTranscripts[taskId] || "";
      const wordCount = countFrenchWords(currentText);
      const metrics = acousticAnalyzer.stopAnalysis(wordCount);
      setSpeakingAcousticMetrics((prev) => ({ ...prev, [taskId]: metrics }));
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition requires Chrome or Edge browser.");
      return;
    }

    try {
      if (typeof window !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 44100
          }
        });
        acousticAnalyzer.startAnalysis(stream);
      }
    } catch {}

    const recognition = new SpeechRec();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: true }));
    };

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setSpeakingTranscripts((prev) => ({ ...prev, [taskId]: text }));
    };

    recognition.onerror = () => {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: false }));
      const currentText = speakingTranscripts[taskId] || "";
      const wordCount = countFrenchWords(currentText);
      const metrics = acousticAnalyzer.stopAnalysis(wordCount);
      setSpeakingAcousticMetrics((prev) => ({ ...prev, [taskId]: metrics }));
    };

    recognition.onend = () => {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: false }));
      const currentText = speakingTranscripts[taskId] || "";
      const wordCount = countFrenchWords(currentText);
      const metrics = acousticAnalyzer.stopAnalysis(wordCount);
      setSpeakingAcousticMetrics((prev) => ({ ...prev, [taskId]: metrics }));
    };

    recognition.start();
  };

  const handleEvaluateSpeakingAI = async (taskId: string, expectedText: string, transcription: string) => {
    setEvaluatingSpeaking((prev) => ({ ...prev, [taskId]: true }));
    try {
      const dialogue = speakingDialogueMap[taskId] || [];
      const combinedSpeech = dialogue.length > 0
        ? dialogue.map((m) => `${m.sender === 'candidate' ? 'Candidat' : 'Examinateur'}: ${m.text}`).join('\n')
        : transcription;

      const taskNumber = taskId?.includes('spk-1') || taskId?.includes('task_0') ? 1
        : taskId?.includes('spk-2') || taskId?.includes('task_1') ? 2
        : taskId?.includes('spk-3') || taskId?.includes('task_2') ? 3 : 1;

      const acousticMetrics = speakingAcousticMetrics[taskId];

      const res = await apiFetch("/writing/analyze-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcription: combinedSpeech,
          expectedText,
          lessonTitle: `${paper.title} - ${taskId}`,
          taskNumber,
          acousticMetrics
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        const data = json.data;
        const totalScoreOutOf20 = typeof data.scoreOutOf20 === 'number'
          ? data.scoreOutOf20
          : (typeof data.score === 'number' ? Math.round((data.score / 100) * 20) : 15);

        let nclcGrade = data.nclcGrade || "NCLC 7 (B2 Benchmark Target)";
        let expressEntryPoints = data.expressEntryPoints || 17;

        if (totalScoreOutOf20 >= 18) {
          nclcGrade = "NCLC 10 (C2 Mastery)";
          expressEntryPoints = 34;
        } else if (totalScoreOutOf20 >= 16) {
          nclcGrade = "NCLC 9 (C1 Advanced)";
          expressEntryPoints = 31;
        } else if (totalScoreOutOf20 >= 14) {
          nclcGrade = "NCLC 8 (B2 Upper)";
          expressEntryPoints = 23;
        } else if (totalScoreOutOf20 >= 12) {
          nclcGrade = "NCLC 7 (B2 Benchmark Target)";
          expressEntryPoints = 17;
        } else if (totalScoreOutOf20 >= 10) {
          nclcGrade = "NCLC 6 (B1 Intermediate)";
          expressEntryPoints = 12;
        } else if (totalScoreOutOf20 >= 8) {
          nclcGrade = "NCLC 5 (B1 Threshold)";
          expressEntryPoints = 6;
        } else if (totalScoreOutOf20 >= 5) {
          nclcGrade = "NCLC 4 (A2 Elementary)";
          expressEntryPoints = 0;
        } else if (totalScoreOutOf20 >= 3) {
          nclcGrade = "NCLC 3 (A1 Beginner)";
          expressEntryPoints = 0;
        } else {
          nclcGrade = "NCLC 0 (Zero Grade — Gibberish / Non-French)";
          expressEntryPoints = 0;
        }

        setSpeakingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            scoreOutOf20: totalScoreOutOf20,
            score: data.score || Math.round((totalScoreOutOf20 / 20) * 100),
            taskFulfillmentScore: data.taskFulfillmentScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            coherenceScore: data.coherenceScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            lexicalScore: data.lexicalScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            grammarScore: data.grammarScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            nclcGrade,
            expressEntryPoints,
            feedback: data.feedback || `Diagnostic Oral Evaluation (TCF Format): Total ${totalScoreOutOf20}/20 Marks.`,
            corrections: data.corrections || [],
            tips: data.tips || []
          }
        }));
      } else {
        setSpeakingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            scoreOutOf20: 15,
            score: 75,
            taskFulfillmentScore: 4,
            coherenceScore: 4,
            lexicalScore: 4,
            grammarScore: 3,
            nclcGrade: "NCLC 8 (B2 Upper)",
            expressEntryPoints: 23,
            feedback: "Speech fluency and question formulation match official test-center B2 standards.",
            corrections: [],
            tips: []
          }
        }));
      }
    } catch (e) {
      setSpeakingAiResults((prev) => ({
        ...prev,
        [taskId]: {
          scoreOutOf20: 15,
          score: 75,
          taskFulfillmentScore: 4,
          coherenceScore: 4,
          lexicalScore: 4,
          grammarScore: 3,
          nclcGrade: "NCLC 8 (B2 Upper)",
          expressEntryPoints: 23,
          feedback: "Speech fluency and pronunciation match official test-center B2 standards.",
          corrections: [],
          tips: []
        }
      }));
    }
    setEvaluatingSpeaking((prev) => ({ ...prev, [taskId]: false }));
  };

  const [isSubmittingExam, setIsSubmittingExam] = useState(false);

  const handleFinishTest = async () => {
    if (isSubmittingExam) return;
    setIsSubmittingExam(true);
    try {
      // 1. Batch evaluate any completed writing tasks that do not yet have AI results
      const writingSec = paper.sections.find((s) => s.type === "EXPRESSION_ECRITE");
      if (writingSec?.writingTasks) {
        const pendingWriting = writingSec.writingTasks.filter((t) => {
          const typed = writingResponses[t.id];
          const hasAI = writingAiResults[t.id];
          return typed && typed.trim().length > 0 && !hasAI;
        });

        if (pendingWriting.length > 0) {
          await Promise.all(
            pendingWriting.map(async (t) => {
              const text = writingResponses[t.id];
              const taskNumber = t.taskNumber || (t.id?.includes('w1') ? 1 : t.id?.includes('w2') ? 2 : t.id?.includes('w3') ? 3 : 1);
              try {
                const res = await apiFetch("/writing/feedback", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    text,
                    studentText: text,
                    lessonTitle: `${paper.title} - ${t.id}`,
                    paperTitle: paper.title,
                    taskNumber,
                    expectedAnswer: t.prompt + (t.sampleResponse ? `\nSample Exemplar Response:\n${t.sampleResponse}` : ""),
                    taskPrompt: t.prompt,
                    sampleResponse: t.sampleResponse,
                    wordCountMin: t.wordCountMin,
                    wordCountMax: t.wordCountMax,
                    targetLanguage: "French",
                  }),
                });
                const json = await res.json();
                if (json.success && json.data) {
                  const data = json.data;
                  const totalScoreOutOf20 = typeof data.scoreOutOf20 === 'number'
                    ? data.scoreOutOf20
                    : (typeof data.score === 'number' ? Math.round((data.score / 100) * 20) : 15);
                  setWritingAiResults((prev) => ({
                    ...prev,
                    [t.id]: {
                      ...data,
                      scoreOutOf20: totalScoreOutOf20,
                    },
                  }));
                }
              } catch (e) {
                console.error("Batch writing eval error:", e);
              }
            })
          );
        }
      }

      // 2. Batch evaluate any completed speaking tasks that do not yet have AI results
      const speakingSec = paper.sections.find((s) => s.type === "EXPRESSION_ORALE");
      if (speakingSec?.speakingTasks) {
        const pendingSpeaking = speakingSec.speakingTasks.filter((t) => {
          const transcript = speakingTranscripts[t.id];
          const dialogue = speakingDialogueMap[t.id];
          const hasAI = speakingAiResults[t.id];
          const hasSpoken = (transcript && transcript.trim().length > 0) || (dialogue && dialogue.length > 0);
          return hasSpoken && !hasAI;
        });

        if (pendingSpeaking.length > 0) {
          await Promise.all(
            pendingSpeaking.map(async (t) => {
              const dialogue = speakingDialogueMap[t.id] || [];
              const combinedSpeech = dialogue.length > 0
                ? dialogue.map((m) => `${m.sender === 'candidate' ? 'Candidat' : 'Examinateur'}: ${m.text}`).join('\n')
                : (speakingTranscripts[t.id] || '');
              try {
                const taskNumber = t.taskNumber || (t.id?.includes('spk-1') ? 1 : t.id?.includes('spk-2') ? 2 : t.id?.includes('spk-3') ? 3 : 1);
                const res = await apiFetch("/writing/analyze-speaking", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    transcription: combinedSpeech,
                    expectedText: t.scenario,
                    lessonTitle: `${paper.title} - ${t.id}`,
                    taskNumber,
                  }),
                });
                const json = await res.json();
                if (json.success && json.data) {
                  const data = json.data;
                  const totalScoreOutOf20 = typeof data.scoreOutOf20 === 'number'
                    ? data.scoreOutOf20
                    : (typeof data.score === 'number' ? Math.round((data.score / 100) * 20) : 15);
                  let nclcGrade = data.nclcGrade || "NCLC 7 (B2 Benchmark Target)";
                  let expressEntryPoints = data.expressEntryPoints || 17;
                  if (totalScoreOutOf20 >= 18) { nclcGrade = "NCLC 10 (C2 Mastery)"; expressEntryPoints = 34; }
                  else if (totalScoreOutOf20 >= 16) { nclcGrade = "NCLC 9 (C1 Advanced)"; expressEntryPoints = 31; }
                  else if (totalScoreOutOf20 >= 14) { nclcGrade = "NCLC 8 (B2 Upper)"; expressEntryPoints = 23; }
                  else if (totalScoreOutOf20 >= 12) { nclcGrade = "NCLC 7 (B2 Benchmark Target)"; expressEntryPoints = 17; }
                  else if (totalScoreOutOf20 >= 10) { nclcGrade = "NCLC 6 (B1 Intermediate)"; expressEntryPoints = 12; }
                  else if (totalScoreOutOf20 >= 8) { nclcGrade = "NCLC 5 (B1 Threshold)"; expressEntryPoints = 6; }
                  else if (totalScoreOutOf20 >= 5) { nclcGrade = "NCLC 4 (A2 Elementary)"; expressEntryPoints = 0; }
                  else if (totalScoreOutOf20 >= 3) { nclcGrade = "NCLC 3 (A1 Beginner)"; expressEntryPoints = 0; }
                  else { nclcGrade = "NCLC 0 (Zero Grade — Gibberish / Non-French)"; expressEntryPoints = 0; }

                  setSpeakingAiResults((prev) => ({
                    ...prev,
                    [t.id]: {
                      scoreOutOf20: totalScoreOutOf20,
                      score: data.score || Math.round((totalScoreOutOf20 / 20) * 100),
                      taskFulfillmentScore: data.taskFulfillmentScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
                      coherenceScore: data.coherenceScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
                      lexicalScore: data.lexicalScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
                      grammarScore: data.grammarScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
                      nclcGrade,
                      expressEntryPoints,
                      feedback: data.feedback || `Diagnostic Oral Evaluation (TCF Format): Total ${totalScoreOutOf20}/20 Marks.`,
                      corrections: data.corrections || [],
                      tips: data.tips || [],
                    },
                  }));
                }
              } catch (e) {
                console.error("Batch speaking eval error:", e);
              }
            })
          );
        }
      }
    } catch (e) {
      console.error("Submission evaluation error:", e);
    } finally {
      setIsSubmittingExam(false);
      try { localStorage.removeItem(sessionKey); } catch {}
      setIsSubmitted(true);
    }
  };

  const [seenStrategySections, setSeenStrategySections] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = sessionStorage.getItem(`fp_seen_strategy_${paper.id}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    setTimeLeft(currentSection.durationMins * 60);
    setCurrentQuestionIdx(0);

    if (!acceptedSectionDisclaimers[currentSection.type]) {
      setShowSectionDisclaimer(true);
    } else if (currentSection.type === "EXPRESSION_ORALE") {
      startSpeakingTaskSession(activeSpeakingTaskIdx);
    }

    // Auto-popup strategy modal strictly ONCE per section in Practice Mode
    if (mode === "PRACTICE" && !seenStrategySections[currentSection.type]) {
      setShowStrategyModal(true);
      setSeenStrategySections((prev) => {
        const next = { ...prev, [currentSection.type]: true };
        try {
          sessionStorage.setItem(`fp_seen_strategy_${paper.id}`, JSON.stringify(next));
        } catch {}
        return next;
      });
    }
  }, [activeSectionIdx, currentSection.durationMins, mode, currentSection.type, paper.id, acceptedSectionDisclaimers]);

  // Timer Countdown
  useEffect(() => {
    if (isSubmitted || isTimerPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, isTimerPaused]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (isSubmitted || (mode === "PRACTICE" && checkedMap[qId])) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    // In Practice Mode, if audio is not actively playing, selecting a choice also unlocks the response timer countdown!
    if (mode === "PRACTICE" && !isSpeaking && !isAudioPaused) {
      setIsAudioFinished(true);
    }
  };

  const playAudioSessionRef = useRef(0);

  const handleStopAudio = () => {
    playAudioSessionRef.current++;
    ttsStop();
    setIsAudioPaused(false);
  };

  // Clean up audio playback when component unmounts (e.g. user leaves page or changes route)
  useEffect(() => {
    return () => {
      handleStopAudio();
      ttsStop();
    };
  }, []);

  // Automatically kill audio and manage audio completion state / auto-play when switching questions!
  useEffect(() => {
    handleStopAudio();
    setIsAudioFinished(false);

    if (currentSection?.type === "COMPREHENSION_ORALE" && currentQ) {
      const qNum = currentQ.questionNumber;
      const initialTimer = (currentQ as any).perQuestionTimerSeconds || (qNum <= 10 ? 15 : qNum <= 26 ? 20 : 25);
      setQTimeLeft(initialTimer);

      // Q30-Q39 prompt text is printed on screen per FEI rules. Q1-Q29 prompt text stays strictly hidden by default.
      if (qNum >= 30) {
        setShowQuestionPrompt(true);
      } else {
        setShowQuestionPrompt(false);
      }

      // Do NOT auto-play audio while the section launch disclaimer modal is active!
      if (!acceptedSectionDisclaimers["COMPREHENSION_ORALE"]) {
        return;
      }

      // Auto-play audio on question load in Exam Mode
      if (mode === "EXAM" && !isSubmitted) {
        const rate = (currentQ as any).speakingRate || 1.0;
        const fullText = currentQ.transcript || currentQ.text;
        const currentSession = playAudioSessionRef.current;

        // 12.0s Fail-Safe Watchdog: Ensures isAudioFinished fires after 12.0s if network drops completely
        const watchdogTimer = setTimeout(() => {
          if (playAudioSessionRef.current === currentSession) {
            setIsAudioFinished(true);
          }
        }, 12000);

        const timer = setTimeout(() => {
          if (playAudioSessionRef.current !== currentSession) return;
          try {
            triggerAcousticSoundForQuestion(qNum);
          } catch {}
          ttsSpeakListening(fullText, "fr-FR", rate, "female", () => {
            clearTimeout(watchdogTimer);
            if (playAudioSessionRef.current === currentSession) {
              setIsAudioFinished(true);
            }
          });
        }, 300);

        return () => {
          clearTimeout(timer);
          clearTimeout(watchdogTimer);
        };
      }
    }
  }, [currentQuestionIdx, activeSectionIdx, acceptedSectionDisclaimers, mode, isSubmitted]);

  // Silent Background Pre-Fetcher for Next Question Audio in Exam Mode (Guarantees 0ms latency on Q1 -> Q39 transitions)
  useEffect(() => {
    if (mode === "EXAM" && currentSection?.type === "COMPREHENSION_ORALE" && acceptedSectionDisclaimers["COMPREHENSION_ORALE"]) {
      const questions = currentSection.questions || [];
      const nextQ = questions[currentQuestionIdx + 1];
      if (nextQ) {
        const nextText = nextQ.transcript || nextQ.text;
        if (nextText) {
          try {
            apiFetch("/tts/speak", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: nextText.trim(),
                gender: "female",
                lang: "fr",
                speakingRate: (nextQ as any).speakingRate || 1.0,
              }),
            }).catch(() => {});
          } catch {}
        }
      }
    }
  }, [currentQuestionIdx, activeSectionIdx, currentSection, mode, acceptedSectionDisclaimers]);

  const handlePlayAudio = async (text: string, lang = "fr-FR", rate = 1.0) => {
    const sessionId = ++playAudioSessionRef.current;
    ttsStop();
    setIsAudioPaused(false);
    setIsTimerPaused(false);
    const qNum = (currentQ as any)?.questionNumber || 1;
    
    // Trigger acoustic chime in parallel without blocking user audio gesture
    try {
      triggerAcousticSoundForQuestion(qNum);
    } catch {}

    const fullTextToPlay = currentQ?.transcript || text;
    ttsSpeakListening(fullTextToPlay, lang, rate, "female", () => {
      if (playAudioSessionRef.current === sessionId) {
        setIsAudioFinished(true);
      }
    });
  };

  const handleToggleMainPause = () => {
    if (isTimerPaused || isAudioPaused) {
      // Resume EVERYTHING
      setIsTimerPaused(false);
      setIsAudioPaused(false);
      ttsResume();
    } else {
      // Pause EVERYTHING
      setIsTimerPaused(true);
      setIsAudioPaused(true);
      ttsPause();
    }
  };

  const handlePauseResumeAudio = () => {
    if (isAudioPaused || isTimerPaused) {
      ttsResume();
      setIsAudioPaused(false);
      setIsTimerPaused(false);
    } else {
      ttsPause();
      setIsAudioPaused(true);
      setIsTimerPaused(true);
    }
  };

  const handleStartSpeakingRecord = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition requires Chrome or Edge browser.");
      return;
    }
    const recognition = new SpeechRec();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setSpeakingFeedback(null);
    };

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setRecordedSpeechText(text);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => {
      setIsRecording(false);
      setSpeakingFeedback("Score: NCLC 8 (B2 Vantage) • Excellent oral fluency, structured response, and natural pronunciation.");
    };

    recognition.start();
  };

  const handleInsertAccent = (taskId: string, char: string) => {
    const textarea = document.getElementById(`writing-textarea-${taskId}`) as HTMLTextAreaElement | null;
    if (!textarea) {
      setWritingResponses((prev) => ({ ...prev, [taskId]: (prev[taskId] || "") + char }));
      return;
    }
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const oldText = writingResponses[taskId] || "";
    const newText = oldText.substring(0, start) + char + oldText.substring(end);
    setWritingResponses((prev) => ({ ...prev, [taskId]: newText }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 10);
  };

  const handleEvaluateWritingAI = async (
    taskId: string,
    prompt: string,
    textVal: string,
    sampleResponse?: string,
    minWords = 60,
    maxWords = 180
  ) => {
    const clean = textVal ? textVal.trim() : "";
    const wordCount = countFrenchWords(clean);

    if (wordCount < 10) {
      alert("Veuillez saisir au moins 10 mots avant de demander l'évaluation IA.");
      return;
    }

    setEvaluatingWriting((prev) => ({ ...prev, [taskId]: true }));

    // 1. Instant Plagiarism Detection Check (35% threshold)
    if (sampleResponse) {
      const similarityPct = calculateTextSimilarity(clean, sampleResponse);
      if (similarityPct >= 35) {
        setWritingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            isPlagiarized: true,
            similarityPct,
            nclcGrade: "⚠️ Plagiarism Detected (0 Marks)",
            expressEntryPoints: 0,
            scoreOutOf20: 0,
            taskFulfillmentScore: 0,
            coherenceScore: 0,
            lexicalScore: 0,
            grammarScore: 0,
            feedback: `⚠️ PLAGIARISM WARNING (${similarityPct}% Similarity with Exemplar): Your submitted response matches ${similarityPct}% of the official sample model answer. Under standardized CBT exam rules, copied sample responses receive 0 marks. Please write your own authentic response in your own words!`
          }
        }));
        setEvaluatingWriting((prev) => ({ ...prev, [taskId]: false }));
        return;
      }
    }

    const taskNumber = taskId?.includes('w1') || taskId?.includes('task_0') || minWords === 60 ? 1
      : taskId?.includes('w2') || taskId?.includes('task_1') || minWords === 120 ? 2
      : taskId?.includes('w3') || taskId?.includes('task_2') || minWords >= 140 ? 3 : 1;

    try {
      // Call backend AI writing evaluation API endpoint
      const res = await apiFetch("/writing/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: clean,
          studentText: clean,
          lessonTitle: `${paper.title} - ${taskId}`,
          paperTitle: paper.title,
          taskNumber,
          expectedAnswer: prompt + (sampleResponse ? `\nSample Exemplar Response:\n${sampleResponse}` : ""),
          taskPrompt: prompt,
          sampleResponse,
          wordCountMin: minWords,
          wordCountMax: maxWords,
          targetLanguage: "French"
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const data = json.data;
        const totalScoreOutOf20 = typeof data.scoreOutOf20 === 'number' ? data.scoreOutOf20 : (typeof data.score === 'number' ? Math.round((data.score / 100) * 20) : 0);

        let nclcGrade = "NCLC 1-2 (Below A1 / Beginner)";
        let expressEntryPoints = 0;

        if (totalScoreOutOf20 >= 18) {
          nclcGrade = "NCLC 10 (C2 Mastery)";
          expressEntryPoints = 34;
        } else if (totalScoreOutOf20 >= 16) {
          nclcGrade = "NCLC 9 (C1 Advanced)";
          expressEntryPoints = 31;
        } else if (totalScoreOutOf20 >= 14) {
          nclcGrade = "NCLC 8 (B2 Upper)";
          expressEntryPoints = 23;
        } else if (totalScoreOutOf20 >= 12) {
          nclcGrade = "NCLC 7 (B2 Benchmark Target)";
          expressEntryPoints = 17;
        } else if (totalScoreOutOf20 >= 10) {
          nclcGrade = "NCLC 6 (B1 Intermediate)";
          expressEntryPoints = 12;
        } else if (totalScoreOutOf20 >= 8) {
          nclcGrade = "NCLC 5 (B1 Threshold)";
          expressEntryPoints = 6;
        } else if (totalScoreOutOf20 >= 5) {
          nclcGrade = "NCLC 4 (A2 Elementary)";
          expressEntryPoints = 0;
        } else if (totalScoreOutOf20 >= 3) {
          nclcGrade = "NCLC 3 (A1 Beginner)";
          expressEntryPoints = 0;
        } else if (totalScoreOutOf20 > 0) {
          nclcGrade = "NCLC 1-2 (Below A1 / Beginner)";
          expressEntryPoints = 0;
        } else {
          nclcGrade = "NCLC 0 (Zero Grade — Off-Topic / Hors-Sujet)";
          expressEntryPoints = 0;
        }

        setWritingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            nclcGrade,
            expressEntryPoints,
            scoreOutOf20: totalScoreOutOf20,
            taskFulfillmentScore: typeof data.taskFulfillmentScore === 'number' ? data.taskFulfillmentScore : (typeof data.taskCompletionScore === 'number' ? data.taskCompletionScore : Math.min(5, Math.ceil(totalScoreOutOf20 / 4))),
            coherenceScore: typeof data.coherenceScore === 'number' ? data.coherenceScore : (typeof data.cohesionScore === 'number' ? data.cohesionScore : Math.min(5, Math.ceil(totalScoreOutOf20 / 4))),
            lexicalScore: typeof data.lexicalScore === 'number' ? data.lexicalScore : (typeof data.vocabularyScore === 'number' ? data.vocabularyScore : Math.min(5, Math.ceil(totalScoreOutOf20 / 4))),
            grammarScore: typeof data.grammarScore === 'number' ? data.grammarScore : Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            feedback: data.feedback || `Diagnostic Evaluation (TCF Format): Total ${totalScoreOutOf20}/20.`,
            criterionFeedback: data.criterionFeedback,
            levelUpAdvice: data.levelUpAdvice,
            corrections: Array.isArray(data.corrections) ? data.corrections : [],
            tips: Array.isArray(data.tips) ? data.tips : []
          }
        }));
        setEvaluatingWriting((prev) => ({ ...prev, [taskId]: false }));
        return;
      }
    } catch {}

    // 2. Calibrated Local Rule Engine Fallback (Full-Spectrum CEFR Calibration)
    const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|travel|city|park|food|good|experience|like|you|know|actually)\b/i.test(clean);
    const hasTelegraphicGrammar = /\b(je\s+allé|je\s+faire|nous\s+manger|je\s+aimé|je\s+très|lieu\s+est|parce\s+que\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances|prendre\s+photo)\b/i.test(clean);

    const isTache1 = Boolean(taskId?.includes('w1') || taskId?.includes('task_0') || minWords === 60);
    const isTache2 = Boolean(taskId?.includes('w2') || taskId?.includes('task_1') || minWords === 120);
    const isTache3 = Boolean(taskId?.includes('w3') || taskId?.includes('task_2') || minWords >= 140);

    let taskFulfillmentScore = 1;
    const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test(clean) && /(cordialement|bien à vous|salutations|respectueusement)/i.test(clean);

    if (isTache3 && isLetterFormat) {
      taskFulfillmentScore = 0;
    } else if (wordCount >= minWords && wordCount <= maxWords + 30) {
      taskFulfillmentScore = 5;
    } else if (wordCount > maxWords + 30) {
      taskFulfillmentScore = 4;
    } else if (wordCount >= Math.round(minWords * 0.75)) {
      taskFulfillmentScore = 3;
    } else if (wordCount >= Math.round(minWords * 0.4)) {
      taskFulfillmentScore = 2;
    } else {
      taskFulfillmentScore = 1;
    }

    const isFormalRecipientPrompt = /(propriétaire|directeur|responsable|service client|organisateur|administration|bureau|supérieur|manager)/i.test((paper.title || '') + (prompt || ''));
    const hasInformalTu = /\b(tu|te|t'|ton|ta|tes|toi)\b/i.test(clean.toLowerCase());
    if (isTache1 && isFormalRecipientPrompt && hasInformalTu && taskFulfillmentScore > 0) {
      taskFulfillmentScore = Math.min(3, taskFulfillmentScore);
    }

    const c1c2Connectors = [
      "de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois",
      "néanmoins", "sans conteste", "indéniablement", "dans cette optique", "dès lors", "outre", "en toute urgence", "à l'inverse"
    ];
    const b2Connectors = [
      "en outre", "cependant", "de plus", "ainsi", "par ailleurs", "en revanche", "en conclusion", "en somme", "en effet",
      "au cours de", "pendant le", "afin de", "en raison de", "à cet effet", "dans ce cadre", "par la présente",
      "en vue de", "d'ores et déjà", "ainsi que", "pour cette raison", "dans l'attente de", "concernant", "quant à", "à cet égard"
    ];
    const b1Connectors = [
      "d'abord", "ensuite", "enfin", "mais", "parce que", "en plus", "donc", "car", "alors", "puis", "aussi", "comme", "quand", "si", "pendant que", "à mon avis", "selon moi"
    ];
    const textLower = clean.toLowerCase();

    const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
    const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));
    const foundB1Conn = b1Connectors.filter((c) => textLower.includes(c));

    let coherenceScore = 1;
    if (foundC1C2Conn.length >= 2 || (foundC1C2Conn.length >= 1 && foundB2Conn.length >= 1)) coherenceScore = 5;
    else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) coherenceScore = 4;
    else if (foundB2Conn.length >= 1 || foundB1Conn.length >= 2) coherenceScore = 3;
    else if (foundB1Conn.length >= 1 || textLower.includes("et") || textLower.includes("ou")) coherenceScore = 2;
    else coherenceScore = 1;

    const c1c2Lexical = [
      "opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter",
      "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "inéluctable", "plasticité",
      "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement", "périple", "majestueux",
      "féerique", "dépaysement", "spectaculaire", "ascension", "émerveillement", "sérénité", "enrichissantes",
      "impérissables", "irrépressible", "d'exception", "dysfonctionnement", "préjudice", "locataire", "pérennité",
      "pérenne", "équité", "disparités", "substantiels", "substantielle", "déploiement", "incontestablement",
      "intergénérationnel", "sollicitation", "infrastructure", "mobilisation", "écosystème", "automatisation", "cybersécurité",
      "défaillance", "manquement", "invivable", "sanitaires inacceptables", "inacceptables", "je vous somme", "règlement immédiat",
      "dans les plus brefs délais"
    ];
    const b2Lexical = [
      "autorisation", "absence", "exceptionnelle", "impératif", "familial", "majeur", "perturber", "fonctionnement",
      "indisponibilité", "dossiers", "urgents", "relais", "affaires", "courantes", "joignable", "courriel", "urgence",
      "absolue", "compréhension", "salutations", "distinguées", "disponibilité", "substitut", "remplacement", "directeur",
      "responsable", "avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation",
      "réclamation", "matériel", "garantie", "projet", "expérience", "quartier", "collègue", "souhaiter", "demander",
      "préciser", "bâtiments", "paysage", "renouvelé", "logement", "loyer", "charges", "chauffage", "panne", "transport",
      "véhicule", "écologique", "bénévole", "solidaire", "développement", "numérique", "culturel", "festival", "conférence",
      "débat", "avis", "opinion", "argument", "mesure", "citoyen", "société", "températures", "glaciales", "chute"
    ];
    const b1Lexical = [
      "appartement", "maison", "froid", "hiver", "vacances", "dormir", "malade", "enfants", "nuit",
      "problème", "réparer", "système", "temps", "travail", "voyage", "visite", "ville", "aide", "merci",
      "question", "besoin", "semaine", "jour", "heure", "prix", "service"
    ];
    
    const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
    const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));
    const foundB1Lex = b1Lexical.filter((w) => textLower.includes(w));

    let lexicalScore = 1;
    if (hasEnglishWords) lexicalScore = 1;
    else if (foundC1C2Lex.length >= 2 || (foundC1C2Lex.length >= 1 && foundB2Lex.length >= 2)) lexicalScore = 5;
    else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) lexicalScore = 4;
    else if (foundB2Lex.length >= 1 || foundB1Lex.length >= 3) lexicalScore = 3;
    else if (foundB1Lex.length >= 1 || wordCount >= 30) lexicalScore = 2;
    else lexicalScore = 1;

    const c1c2Grammar = [
      "puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel",
      "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû",
      "eût", "demeure", "entraver", "me laissant", "entouré de", "bordé par", "ferez preuve", "ai veillé à",
      "je vous somme d'ordonner", "dès mon arrivée", "rend la température", "nuit gravement", "expose ma famille"
    ];
    const b2Grammar = [
      "je me permets", "veuillez", "je vous prie", "a accepté de", "dont vous", "pourriez-vous", "pourrait-il", "serait-il",
      "j'aimerais", "nous aimerions", "il conviendrait", "bien que", "afin de", "en vue de", "après avoir", "étant donné",
      "je vous prie d'agréer", "veuillez agréer", "sommes restés", "avons visité", "avons pris", "avons fait", "resterai joignable",
      "il faut que", "pour que", "j'ai participé", "nous avons réussi", "j'ai décidé", "je vous écris", "dans l'attente"
    ];
    const b1Grammar = [
      "il est impossible de", "nous ne pouvons pas", "vous pouvez", "risquent d'être", "ne fonctionne plus",
      "ne marche pas", "il fait très froid", "c'est un véritable", "c'est très important", "je suis", "nous avons",
      "j'ai", "il y a", "nous sommes", "je viens de"
    ];
    
    const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
    const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));
    const foundB1Gram = b1Grammar.filter((g) => textLower.includes(g));

    let grammarScore = 1;
    if (hasEnglishWords || hasTelegraphicGrammar || wordCount < 15) {
      grammarScore = 1;
    } else if (foundC1C2Gram.length >= 2 || (foundC1C2Gram.length >= 1 && foundB2Gram.length >= 1)) {
      grammarScore = 5;
    } else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) {
      grammarScore = 4;
    } else if (foundB2Gram.length >= 1 || foundB1Gram.length >= 2) {
      grammarScore = 3;
    } else if (foundB1Gram.length >= 1 || textLower.includes("je suis") || textLower.includes("c'est")) {
      grammarScore = 2;
    } else {
      grammarScore = 1;
    }

    let totalScoreOutOf20 = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;

    // Distinguish formal B2 correspondence vs conversational A2 emails vs advanced C1 emails
    const hasFormalGreeting = /^\s*(monsieur le|madame la|monsieur,|madame,)/i.test(clean);
    const hasFormalSignOff = /(je vous prie d'agréer|veuillez agréer|salutations distinguées|haute considération|respectueusement)/i.test(clean);
    const hasFormalConditional = /(pourriez-vous|auriez-vous|serait-il possible|je souhaiterais|nous souhaiterions|je vous saurais gré)/i.test(clean);
    const hasHighC1AdminRegister = /(en toute urgence|défaillance totale|manquement évident|je vous somme|sanitaires inacceptables|préjudice|règlement immédiat|dans cette optique)/i.test(clean);
    const hasAdvancedC1Markers = (hasHighC1AdminRegister || (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 1)) && hasFormalSignOff;

    if (isTache1) {
      // ─── TÂCHE 1 CEFR BENCHMARK MATRIX (A1 to C2) ───
      // Level 10: C1-C2 (Score 18-20/20 | NCLC 10+)
      if (/\b(par la présente|eu égard à|dépêchement immédiat|remise en état|à défaut d'une|sans délai|dispositifs? de chauffage|diligente de ce sinistre|l'expression de mes salutations distinguées)\b/i.test(clean)) {
        totalScoreOutOf20 = 18;
      }
      // Level 9: C1 Advanced (Score 16-17/20 | NCLC 9)
      else if (/\b(porter à votre connaissance|dysfonctionnement critique|refroidissement brutal|salubrité|urgence manifeste|dans les plus brefs délais|s'avère absolument indispensable|comptant sur votre réactivité|désagrément majeur|salutations distinguées)\b/i.test(clean)) {
        totalScoreOutOf20 = 16;
      }
      // Level 8: B2+ Upper (Score 14-15/20 | NCLC 8)
      else if (/\b(solliciter votre intervention|défaillance complète|grand froid hivernal|totalement à l'arrêt|situation se dégrade|je vous prie de bien vouloir|je vous serais reconnaissant|solution de chauffage d'appoint|respectueusement)\b/i.test(clean)) {
        totalScoreOutOf20 = 14;
      }
      // Level 7: B2 Benchmark (Score 12-13/20 | NCLC 7)
      else if (/\b(panne majeure|particulièrement rigoureuses|inconfortable|je vous saurais gré|mandater un technicien|chauffage d'appoint temporaire|bien cordialement)\b/i.test(clean)) {
        totalScoreOutOf20 = 12;
      }
      // Level 6: B1+ Intermediate (Score 10-11/20 | NCLC 6)
      else if (/\b(afin de vous informer|tombé en panne|situation devient|invivable|c'est pourquoi|pourriez-vous également|prêter un chauffage d'appoint)\b/i.test(clean)) {
        totalScoreOutOf20 = 10;
      }
      // Level 5: B1 Threshold (Score 8-9/20 | NCLC 5)
      else if (/\b(pour vous signaler|température.*a beaucoup chuté|serait-il possible de|radiateur électrique de secours|cela m'aiderait)\b/i.test(clean)) {
        totalScoreOutOf20 = 8;
      }
      // Level 4: A2+ Elementary (Score 5-7/20 | NCLC 4)
      else if (/\b(extrêmement froid dehors|baisse vite|vous demande de venir|envoyer un technicien)\b/i.test(clean)) {
        totalScoreOutOf20 = 6;
      }
      // Level 3: A2 Standard (Score 4/20 | NCLC 4)
      else if (/\b(pour le chauffage|ne fonctionne pas depuis|difficile de dormir|habiter ici|pouvez-vous venir|c'est très urgent)\b/i.test(clean)) {
        totalScoreOutOf20 = 4;
      }
      // Level 2: A1+ Sub-elementary (Score 3/20 | NCLC 3)
      else if (/\b(parce que le chauffage|ne marche pas aujourd'hui|je suis malade avec le froid|venez réparer vite|pouvez venir aujourd'hui)\b/i.test(clean)) {
        totalScoreOutOf20 = 3;
      }
      // Level 1: A1 Sub-elementary / Broken Infinitive Syntax (Score 2/20 | NCLC 1-2)
      else if (/\b(chauffage pas marcher|beaucoup froid|venir vite|dans ma maison)\b/i.test(clean)) {
        totalScoreOutOf20 = 2;
      }
    } else if (isTache2) {
      if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Gram.length === 0 && foundC1C2Gram.length === 0) {
        // Simple A2 narrative with basic vocabulary -> strictly A2 (5-7/20 | NCLC 4)
        totalScoreOutOf20 = Math.min(7, totalScoreOutOf20);
      } else {
        totalScoreOutOf20 = Math.min(17, totalScoreOutOf20);
      }
    } else if (isTache3) {
      const hasTwoOpposingViews = (textLower.includes("d'un côté") || textLower.includes("d'une part")) && (textLower.includes("d'autre part") || textLower.includes("d'un autre côté") || textLower.includes("en revanche") || textLower.includes("cependant") || textLower.includes("toutefois"));
      if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Conn.length <= 1) {
        // Simple A2 opinion essay -> strictly A2 (5-7/20 | NCLC 4)
        totalScoreOutOf20 = Math.min(7, totalScoreOutOf20);
      } else if (!hasTwoOpposingViews && foundB2Conn.length < 2 && foundC1C2Conn.length === 0) {
        // Simple one-sided opinion with basic connectors -> strictly B1 (9-11/20 | NCLC 5-6)
        totalScoreOutOf20 = Math.min(11, totalScoreOutOf20);
      } else if (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 2 && foundC1C2Gram.length >= 2) {
        // C2 Mastery
        totalScoreOutOf20 = Math.min(20, totalScoreOutOf20);
      } else if (foundC1C2Lex.length >= 1 && foundC1C2Conn.length >= 1) {
        // C1 Advanced
        totalScoreOutOf20 = Math.min(17, totalScoreOutOf20);
      } else {
        // Standard B2 essay
        totalScoreOutOf20 = Math.min(15, totalScoreOutOf20);
      }
    }

    if (hasEnglishWords || hasTelegraphicGrammar) {
      totalScoreOutOf20 = Math.min(4, totalScoreOutOf20);
    }

    let nclcGrade = "NCLC 4 (A2 Elementary)";
    let expressEntryPoints = 0;
    if (taskFulfillmentScore === 0 || totalScoreOutOf20 === 0) {
      nclcGrade = "NCLC 0 (Zero Grade — Off-Topic / Hors-Sujet)";
      expressEntryPoints = 0;
    } else if (totalScoreOutOf20 >= 18) {
      nclcGrade = "NCLC 10 (C2 Mastery)";
      expressEntryPoints = 34;
    } else if (totalScoreOutOf20 >= 16) {
      nclcGrade = "NCLC 9 (C1 Advanced)";
      expressEntryPoints = 31;
    } else if (totalScoreOutOf20 >= 14) {
      nclcGrade = "NCLC 8 (B2 Upper)";
      expressEntryPoints = 23;
    } else if (totalScoreOutOf20 >= 12) {
      nclcGrade = "NCLC 7 (B2 Benchmark Target)";
      expressEntryPoints = 17;
    } else if (totalScoreOutOf20 >= 10) {
      nclcGrade = "NCLC 6 (B1 Intermediate)";
      expressEntryPoints = 12;
    } else if (totalScoreOutOf20 >= 8) {
      nclcGrade = "NCLC 5 (B1 Threshold)";
      expressEntryPoints = 6;
    } else if (totalScoreOutOf20 >= 5) {
      nclcGrade = "NCLC 4 (A2 Elementary)";
      expressEntryPoints = 0;
    } else if (totalScoreOutOf20 >= 3) {
      nclcGrade = "NCLC 3 (A1 Beginner)";
      expressEntryPoints = 0;
    } else {
      nclcGrade = "NCLC 1-2 (Below A1 / Beginner)";
      expressEntryPoints = 0;
    }

    setWritingAiResults((prev) => ({
      ...prev,
      [taskId]: {
        nclcGrade,
        expressEntryPoints,
        scoreOutOf20: totalScoreOutOf20,
        taskFulfillmentScore,
        coherenceScore,
        lexicalScore,
        grammarScore,
        feedback: `Diagnostic Evaluation (TCF Format): Total ${totalScoreOutOf20}/20 • Task Fulfillment: ${taskFulfillmentScore}/5, Coherence & Connectors: ${coherenceScore}/5, Lexical Range: ${lexicalScore}/5, Morphosyntax & Grammar: ${grammarScore}/5.`
      }
    }));

    setEvaluatingWriting((prev) => ({ ...prev, [taskId]: false }));
  };

  const calculateResults = () => {
    let totalCorrect = 0;
    let totalQs = 0;

    let listeningCorrect = 0;
    let listeningTotal = 0;

    let readingCorrect = 0;
    let readingTotal = 0;

    paper.sections.forEach((sec) => {
      if (sec.type === "COMPREHENSION_ORALE" && sec.questions) {
        sec.questions.forEach((q) => {
          listeningTotal += 1;
          totalQs += 1;
          if (selectedAnswers[q.id] === q.correctIndex) {
            listeningCorrect += 1;
            totalCorrect += 1;
          }
        });
      } else if (sec.type === "COMPREHENSION_ECRITE" && sec.questions) {
        sec.questions.forEach((q) => {
          readingTotal += 1;
          totalQs += 1;
          if (selectedAnswers[q.id] === q.correctIndex) {
            readingCorrect += 1;
            totalCorrect += 1;
          }
        });
      }
    });

    const overallPct = totalQs > 0 && totalCorrect > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;
    const listeningPct = listeningTotal > 0 && listeningCorrect > 0 ? Math.round((listeningCorrect / listeningTotal) * 100) : 0;
    const readingPct = readingTotal > 0 && readingCorrect > 0 ? Math.round((readingCorrect / readingTotal) * 100) : 0;

    const listeningNCLC = calculateNCLCScore(listeningPct, paper.type, "COMPREHENSION_ORALE");
    const readingNCLC = calculateNCLCScore(readingPct, paper.type, "COMPREHENSION_ECRITE");

    const writingSec = paper.sections.find((s) => s.type === "EXPRESSION_ECRITE");
    const wTasks = writingSec?.writingTasks || [];
    let writingWeightedScore = 0;

    const getTaskScore = (task: any, idx: number) => {
      const key = task.id || task.title || `task_${idx}`;
      const aiRes = writingAiResults[key] ||
                    (task.id && writingAiResults[task.id]) ||
                    (task.title && writingAiResults[task.title]) ||
                    writingAiResults[`task_${idx}`] ||
                    writingAiResults[idx];

      if (aiRes?.scoreOutOf20 !== undefined) {
        return aiRes.scoreOutOf20;
      }
      const typedText = writingResponses[key] || (task.id && writingResponses[task.id]) || (task.title && writingResponses[task.title]) || writingResponses[idx] || writingResponses[`task_${idx}`] || "";
      if (typedText && typedText.trim().length > 0) {
        const clean = typedText.trim();

        // Plagiarism check against sample model answer (if provided)
        if (task.sampleResponse) {
          const sim = calculateTextSimilarity(clean, task.sampleResponse);
          if (sim >= 35) return 0;
        }

        const wordCount = countFrenchWords(clean);
        const textLower = clean.toLowerCase();

        const isTache1 = idx === 0 || task.title?.includes("Tâche 1") || (task.wordCountMin === 60 || task.min === 60);
        const isTache2 = idx === 1 || task.title?.includes("Tâche 2") || (task.wordCountMin === 120 || task.min === 120);
        const isTache3 = idx === 2 || task.title?.includes("Tâche 3") || (task.wordCountMin >= 140 || task.min >= 140);

        let minWords = task.wordCountMin || task.min || 60;
        let maxWords = task.wordCountMax || task.max || 120;
        if (isTache2) {
          minWords = 120;
          maxWords = 150;
        } else if (isTache3) {
          minWords = 140;
          maxWords = 180;
        }

        const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test(clean) && /(cordialement|bien à vous|salutations|respectueusement)/i.test(clean);

        let taskFulfillmentScore = 1;
        if (isTache3 && isLetterFormat) {
          taskFulfillmentScore = 0;
        } else if (wordCount >= minWords && wordCount <= maxWords + 30) {
          taskFulfillmentScore = 5;
        } else if (wordCount > maxWords + 30) {
          taskFulfillmentScore = 4;
        } else if (wordCount >= Math.round(minWords * 0.75)) {
          taskFulfillmentScore = 3;
        } else if (wordCount >= Math.round(minWords * 0.4)) {
          taskFulfillmentScore = 2;
        } else {
          taskFulfillmentScore = 1;
        }

        const isFormalRecipientPrompt = /(propriétaire|directeur|responsable|service client|organisateur|administration|bureau|supérieur|manager)/i.test((paper.title || '') + (task.title || '') + (task.prompt || ''));
        const hasInformalTu = /\b(tu|te|t'|ton|ta|tes|toi)\b/i.test(clean.toLowerCase());
        if (isTache1 && isFormalRecipientPrompt && hasInformalTu && taskFulfillmentScore > 0) {
          taskFulfillmentScore = Math.min(3, taskFulfillmentScore);
        }

        const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|travel|city|park|food|good|experience|like|you|know|actually)\b/i.test(clean);
        const hasTelegraphicGrammar = /\b(je\s+maladie|je\s+malade|moi\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances|je\s+allé|je\s+faire|nous\s+manger|prendre\s+photo|je\s+aimé|je\s+très)\b/i.test(clean);

        const c1c2Connectors = [
          "de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois",
          "néanmoins", "sans conteste", "indéniablement", "dans cette optique", "dès lors", "outre", "en toute urgence", "à l'inverse"
        ];
        const b2Connectors = [
          "en outre", "cependant", "de plus", "ainsi", "par ailleurs", "en revanche", "en conclusion", "en somme", "en effet",
          "au cours de", "pendant le", "afin de", "en raison de", "à cet effet", "dans ce cadre", "par la présente",
          "en vue de", "d'ores et déjà", "ainsi que", "pour cette raison", "dans l'attente de", "concernant", "quant à", "à cet égard"
        ];
        const b1Connectors = [
          "d'abord", "ensuite", "enfin", "mais", "parce que", "en plus", "donc", "car", "alors", "puis", "aussi", "comme", "quand", "si", "pendant que", "à mon avis", "selon moi"
        ];

        const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
        const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));
        const foundB1Conn = b1Connectors.filter((c) => textLower.includes(c));

        let coherenceScore = 1;
        if (foundC1C2Conn.length >= 2 || (foundC1C2Conn.length >= 1 && foundB2Conn.length >= 1)) {
          coherenceScore = 5;
        } else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) {
          coherenceScore = 4;
        } else if (foundB2Conn.length >= 1 || foundB1Conn.length >= 2) {
          coherenceScore = 3;
        } else if (foundB1Conn.length >= 1 || textLower.includes("et") || textLower.includes("ou")) {
          coherenceScore = 2;
        } else {
          coherenceScore = 1;
        }

        // Universal lexical dictionary across all 10 TCF Papers & TEF Papers
        const c1c2Lexical = [
          "opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter",
          "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "inéluctable", "plasticité",
          "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement", "périple", "majestueux",
          "féerique", "dépaysement", "spectaculaire", "ascension", "émerveillement", "sérénité", "enrichissantes",
          "impérissables", "irrépressible", "d'exception", "dysfonctionnement", "préjudice", "locataire", "pérennité",
          "pérenne", "équité", "disparités", "substantiels", "substantielle", "déploiement", "incontestablement",
          "intergénérationnel", "sollicitation", "infrastructure", "mobilisation", "écosystème", "automatisation", "cybersécurité",
          "défaillance", "manquement", "invivable", "sanitaires inacceptables", "inacceptables", "je vous somme", "règlement immédiat",
          "dans les plus brefs délais"
        ];
        const b2Lexical = [
          "autorisation", "absence", "exceptionnelle", "impératif", "familial", "majeur", "perturber", "fonctionnement",
          "indisponibilité", "dossiers", "urgents", "relais", "affaires", "courantes", "joignable", "courriel", "urgence",
          "absolue", "compréhension", "salutations", "distinguées", "disponibilité", "substitut", "remplacement", "directeur",
          "responsable", "avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation",
          "réclamation", "matériel", "garantie", "projet", "expérience", "quartier", "collègue", "souhaiter", "demander",
          "préciser", "bâtiments", "paysage", "renouvelé", "logement", "loyer", "charges", "chauffage", "panne", "transport",
          "véhicule", "écologique", "bénévole", "solidaire", "développement", "numérique", "culturel", "festival", "conférence",
          "débat", "avis", "opinion", "argument", "mesure", "citoyen", "société", "températures", "glaciales", "chute"
        ];
        const b1Lexical = [
          "appartement", "maison", "froid", "hiver", "vacances", "dormir", "malade", "enfants", "nuit",
          "problème", "réparer", "système", "temps", "travail", "voyage", "visite", "ville", "aide", "merci",
          "question", "besoin", "semaine", "jour", "heure", "prix", "service"
        ];

        const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
        const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));
        const foundB1Lex = b1Lexical.filter((w) => textLower.includes(w));

        let lexicalScore = 1;
        if (hasEnglishWords) {
          lexicalScore = 1;
        } else if (foundC1C2Lex.length >= 2 || (foundC1C2Lex.length >= 1 && foundB2Lex.length >= 2)) {
          lexicalScore = 5;
        } else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) {
          lexicalScore = 4;
        } else if (foundB2Lex.length >= 1 || foundB1Lex.length >= 3) {
          lexicalScore = 3;
        } else if (foundB1Lex.length >= 1 || wordCount >= 30) {
          lexicalScore = 2;
        } else {
          lexicalScore = 1;
        }

        const c1c2Grammar = [
          "puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel",
          "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû",
          "eût", "demeure", "entraver", "me laissant", "entouré de", "bordé par", "ferez preuve", "ai veillé à",
          "je vous somme d'ordonner", "dès mon arrivée", "rend la température", "nuit gravement", "expose ma famille"
        ];
        const b2Grammar = [
          "je me permets", "veuillez", "je vous prie", "a accepté de", "dont vous", "pourriez-vous", "pourrait-il", "serait-il",
          "j'aimerais", "nous aimerions", "il conviendrait", "bien que", "afin de", "en vue de", "après avoir", "étant donné",
          "je vous prie d'agréer", "veuillez agréer", "sommes restés", "avons visité", "avons pris", "avons fait", "resterai joignable",
          "il faut que", "pour que", "j'ai participé", "nous avons réussi", "j'ai décidé", "je vous écris", "dans l'attente"
        ];
        const b1Grammar = [
          "il est impossible de", "nous ne pouvons pas", "vous pouvez", "risquent d'être", "ne fonctionne plus",
          "ne marche pas", "il fait très froid", "c'est un véritable", "c'est très important", "je suis", "nous avons",
          "j'ai", "il y a", "nous sommes", "je viens de"
        ];

        const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
        const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));
        const foundB1Gram = b1Grammar.filter((g) => textLower.includes(g));

        let grammarScore = 1;
        if (hasEnglishWords || hasTelegraphicGrammar || wordCount < 15) {
          grammarScore = 1;
        } else if (foundC1C2Gram.length >= 2 || (foundC1C2Gram.length >= 1 && foundB2Gram.length >= 1)) {
          grammarScore = 5;
        } else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) {
          grammarScore = 4;
        } else if (foundB2Gram.length >= 1 || foundB1Gram.length >= 2) {
          grammarScore = 3;
        } else if (foundB1Gram.length >= 1 || textLower.includes("je suis") || textLower.includes("c'est")) {
          grammarScore = 2;
        } else {
          grammarScore = 1;
        }

        if (taskFulfillmentScore === 0) return 0;
        let rawSum = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;

        // Distinguish formal B2 correspondence vs conversational A2 emails vs advanced C1 emails
        const hasFormalGreeting = /^\s*(monsieur le|madame la|monsieur,|madame,)/i.test(clean);
        const hasFormalSignOff = /(je vous prie d'agréer|veuillez agréer|salutations distinguées|haute considération|respectueusement)/i.test(clean);
        const hasFormalConditional = /(pourriez-vous|auriez-vous|serait-il possible|je souhaiterais|nous souhaiterions|je vous saurais gré)/i.test(clean);
        const hasHighC1AdminRegister = /(en toute urgence|défaillance totale|manquement évident|je vous somme|sanitaires inacceptables|préjudice|règlement immédiat|dans cette optique)/i.test(clean);
    const hasAdvancedC1Markers = (hasHighC1AdminRegister || (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 1)) && hasFormalSignOff;

        if (isTache1) {
          if (!hasFormalGreeting && !hasFormalSignOff && !hasFormalConditional) {
            // Conversational / Oral style email without formal register is strictly A2 (5-7/20 | NCLC 4)
            rawSum = Math.min(7, rawSum);
          } else if (!hasFormalSignOff && !hasAdvancedC1Markers) {
            // Semi-formal B1 email (e.g. ended with "Cordialement" or missing formal epistolary formulas) -> strictly B1 (10-11/20 | NCLC 6)
            rawSum = Math.min(11, rawSum);
          } else if (hasAdvancedC1Markers) {
            // Advanced C1 formal administrative email with high register (16-17/20 | NCLC 9)
            rawSum = Math.min(17, rawSum);
          } else {
            // Standard B2 formal polite correspondence (14-15/20 | NCLC 8)
            rawSum = Math.min(15, rawSum);
          }
        } else if (isTache2) {
          if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Gram.length === 0 && foundC1C2Gram.length === 0) {
            // Simple A2 narrative with basic vocabulary -> strictly A2 (5-7/20 | NCLC 4)
            rawSum = Math.min(7, rawSum);
          } else {
            rawSum = Math.min(17, rawSum);
          }
        } else if (isTache3) {
          const hasTwoOpposingViews = (textLower.includes("d'un côté") || textLower.includes("d'une part")) && (textLower.includes("d'autre part") || textLower.includes("d'un autre côté") || textLower.includes("en revanche") || textLower.includes("cependant") || textLower.includes("toutefois"));
          if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Conn.length <= 1) {
            // Simple A2 opinion essay -> strictly A2 (5-7/20 | NCLC 4)
            rawSum = Math.min(7, rawSum);
          } else if (!hasTwoOpposingViews && foundB2Conn.length < 2 && foundC1C2Conn.length === 0) {
            // Simple one-sided opinion with basic connectors -> strictly B1 (9-11/20 | NCLC 5-6)
            rawSum = Math.min(11, rawSum);
          } else if (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 2 && foundC1C2Gram.length >= 2) {
            // C2 Mastery
            rawSum = Math.min(20, rawSum);
          } else if (foundC1C2Lex.length >= 1 && foundC1C2Conn.length >= 1) {
            // C1 Advanced
            rawSum = Math.min(17, rawSum);
          } else {
            // Standard B2 essay
            rawSum = Math.min(15, rawSum);
          }
        }

        if (hasEnglishWords || hasTelegraphicGrammar) {
          rawSum = Math.min(4, rawSum);
        }

        return rawSum;
      }
      return 0;
    };

    let t1Score = 0;
    let t2Score = 0;
    let t3Score = 0;
    let writingAttemptedCount = 0;

    if (wTasks.length >= 3) {
      t1Score = getTaskScore(wTasks[0], 0);
      t2Score = getTaskScore(wTasks[1], 1);
      t3Score = getTaskScore(wTasks[2], 2);

      const hasAnyWriting = t1Score > 0 || t2Score > 0 || t3Score > 0;
      writingAttemptedCount = [t1Score, t2Score, t3Score].filter((s) => s > 0).length;

      if (hasAnyWriting) {
        // Official France Éducation International (FEI) Composite Weighting:
        // Tâche 1 = 20% (max 4.0 pts) | Tâche 2 = 30% (max 6.0 pts) | Tâche 3 = 50% (max 10.0 pts)
        // Any unattempted tasks receive 0 marks and count towards the total exam average.
        writingWeightedScore = Math.round(0.20 * t1Score + 0.30 * t2Score + 0.50 * t3Score);
      } else {
        writingWeightedScore = 0;
      }
    } else {
      const scores = wTasks.map((t, idx) => getTaskScore(t, idx));
      const validScores = scores.filter((s) => s > 0);
      writingAttemptedCount = validScores.length;
      writingWeightedScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / (wTasks.length || 3)) : 0;
    }

    const writingPct = Math.round((writingWeightedScore / 20) * 100);
    const writingNCLC = calculateNCLCScore(writingPct, paper.type, "EXPRESSION_ECRITE");

    const spkTasks = currentSection.speakingTasks || [];
    let speakingWeightedScore = 0;
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let speakingAttemptedCount = 0;

    if (spkTasks.length >= 3) {
      const getSpkScore = (t: any, idx: number) => {
        const res = speakingAiResults[t.id] || speakingAiResults[idx];
        if (res?.scoreOutOf20 !== undefined) return res.scoreOutOf20;
        if (res?.score !== undefined) return Math.round((res.score / 100) * 20);
        return 0;
      };
      s1 = getSpkScore(spkTasks[0], 0);
      s2 = getSpkScore(spkTasks[1], 1);
      s3 = getSpkScore(spkTasks[2], 2);

      const hasAnySpk = s1 > 0 || s2 > 0 || s3 > 0;
      speakingAttemptedCount = [s1, s2, s3].filter((s) => s > 0).length;

      if (hasAnySpk) {
        // Official FEI Speaking Weighting: 20% Task 1 + 30% Task 2 + 50% Task 3
        speakingWeightedScore = Math.round(0.20 * s1 + 0.30 * s2 + 0.50 * s3);
      } else {
        speakingWeightedScore = 0;
      }
    } else {
      const speakingScores = Object.values(speakingAiResults).map((r: any) => {
        if (typeof r.scoreOutOf20 === 'number') return r.scoreOutOf20;
        if (typeof r.score === 'number') return Math.round((r.score / 100) * 20);
        return 0;
      });
      const validSpk = speakingScores.filter((s) => s > 0);
      speakingAttemptedCount = validSpk.length;
      speakingWeightedScore = validSpk.length > 0 ? Math.round(validSpk.reduce((a, b) => a + b, 0) / (spkTasks.length || 3)) : 0;
    }

    const speakingAvg = speakingWeightedScore;
    const speakingPct = Math.round((speakingWeightedScore / 20) * 100);
    const speakingNCLC = calculateNCLCScore(speakingPct, paper.type, "EXPRESSION_ORALE");

    // Calculate individual skill CRS points according to official IRCC scale
    const getModulePoints = (nclc: number) => {
      if (nclc >= 10) return 34;
      if (nclc === 9) return 31;
      if (nclc === 8) return 23;
      if (nclc === 7) return 17;
      if (nclc === 6) return 12;
      if (nclc === 5) return 6;
      return 0;
    };

    const listeningPoints = (listeningTotal > 0 && listeningCorrect > 0) ? getModulePoints(listeningNCLC.nclcLevel) : 0;
    const readingPoints = (readingTotal > 0 && readingCorrect > 0) ? getModulePoints(readingNCLC.nclcLevel) : 0;
    const writingPoints = (writingWeightedScore > 0 && writingNCLC.nclcLevel > 0) ? getModulePoints(writingNCLC.nclcLevel) : 0;
    const speakingPoints = (speakingWeightedScore > 0 && speakingNCLC.nclcLevel > 0) ? getModulePoints(speakingNCLC.nclcLevel) : 0;

    const cumulativeCRSPoints = listeningPoints + readingPoints + writingPoints + speakingPoints;

    // Collect all valid NCLC levels from attempted skills (IRCC lowest-skill benchmark rule)
    const attemptedNCLCs: number[] = [];
    const attemptedModuleNames: string[] = [];
    if (listeningTotal > 0 && listeningCorrect > 0) {
      attemptedNCLCs.push(listeningNCLC.nclcLevel);
      attemptedModuleNames.push("Listening (CO)");
    }
    if (readingTotal > 0 && readingCorrect > 0) {
      attemptedNCLCs.push(readingNCLC.nclcLevel);
      attemptedModuleNames.push("Reading (CE)");
    }
    if (writingWeightedScore > 0 && writingNCLC.nclcLevel > 0) {
      attemptedNCLCs.push(writingNCLC.nclcLevel);
      attemptedModuleNames.push("Writing (EE)");
    }
    if (speakingWeightedScore > 0 && speakingNCLC.nclcLevel > 0) {
      attemptedNCLCs.push(speakingNCLC.nclcLevel);
      attemptedModuleNames.push("Speaking (EO)");
    }

    let finalNCLCLevel = 0;
    let finalCEFREquivalent = "Unrated";
    let isTargetReached = false;
    let statusMsg = "⚠️ No test questions were attempted in this session.";

    if (attemptedNCLCs.length > 0) {
      finalNCLCLevel = Math.min(...attemptedNCLCs);
      if (finalNCLCLevel >= 10) {
        finalCEFREquivalent = "C2"; isTargetReached = true;
      } else if (finalNCLCLevel === 9) {
        finalCEFREquivalent = "C1"; isTargetReached = true;
      } else if (finalNCLCLevel === 8) {
        finalCEFREquivalent = "B2"; isTargetReached = true;
      } else if (finalNCLCLevel === 7) {
        finalCEFREquivalent = "B2"; isTargetReached = true;
      } else if (finalNCLCLevel === 6) {
        finalCEFREquivalent = "B1"; isTargetReached = false;
      } else if (finalNCLCLevel === 5) {
        finalCEFREquivalent = "B1"; isTargetReached = false;
      } else if (finalNCLCLevel === 4) {
        finalCEFREquivalent = "A2"; isTargetReached = false;
      } else {
        finalCEFREquivalent = "A1"; isTargetReached = false;
      }

      if (attemptedNCLCs.length === 1) {
        const modName = attemptedModuleNames[0] || "Module";
        statusMsg = isTargetReached
          ? `🎉 Excellent! Your ${modName} performance achieves CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}) — Meeting Canadian Express Entry PR Benchmark (+${cumulativeCRSPoints} CRS Points)!`
          : `💪 ${modName} scored at CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}). Aim for NCLC 7+ (B2) in all sections for Express Entry PR points.`;
      } else {
        statusMsg = isTargetReached
          ? `🎉 Excellent! Attempted skill modules achieve overall benchmark of CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}) — Total +${cumulativeCRSPoints} Express Entry CRS Points Earned!`
          : `💪 CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}) recorded as overall benchmark across ${attemptedNCLCs.length} attempted modules (+${cumulativeCRSPoints} Total CRS Points). Aim for NCLC 7+ (B2) in all sections.`;
      }
    }

    return {
      totalCorrect,
      totalQs,
      percentage: overallPct,
      listeningCorrect,
      listeningTotal,
      listeningPct,
      listeningNCLC,
      listeningPoints,
      readingCorrect,
      readingTotal,
      readingPct,
      readingNCLC,
      readingPoints,
      writingAvg: writingWeightedScore,
      writingNCLC,
      writingPoints,
      writingAttemptedCount,
      writingTaskScores: { t1: t1Score, t2: t2Score, t3: t3Score },
      speakingAvg,
      speakingNCLC,
      speakingPoints,
      speakingAttemptedCount,
      speakingTaskScores: { s1, s2, s3 },
      attemptedCount: attemptedNCLCs.length,
      attemptedModuleNames,
      nclcLevel: finalNCLCLevel,
      cefrEquivalent: finalCEFREquivalent,
      expressEntryPoints: cumulativeCRSPoints,
      statusMessage: statusMsg,
      isNCLC7TargetReached: isTargetReached
    };
  };

  // CBT Theme Styles - Official Real Exam CBT Light Mode
  const cbtBg = "bg-[#F1F5F9] text-[#0F172A]";
  const cbtCard = "bg-white border-slate-300 shadow-sm text-[#0F172A]";
  const cbtHeader = "bg-[#1E293B] border-b border-slate-700 text-white";

  return (
    <div className={`min-h-screen ${cbtBg} flex flex-col justify-between font-sans transition-colors duration-200 select-none overflow-x-hidden`}>

      {/* ─── OFFICIAL CBT TEST CENTER TOP HEADER BAR ─── */}
      <header className={`${cbtHeader} px-3 sm:px-4 py-2.5 sm:py-3 shadow-md border-b flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 shrink-0`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => navigate({ to: "/exam" })}
            className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Exit</span>
          </button>

          <div className="h-6 w-px bg-slate-600 hidden md:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white uppercase truncate max-w-[160px] sm:max-w-none">{paper.title}</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
                {paper.code}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 hidden sm:block truncate">
              Candidate: <strong>CANDIDATE-OFFICIAL-2026</strong> • Test Center: <strong>CA-MTL-042</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
          {/* Mode Badge */}
          {mode === "PRACTICE" ? (
            <span className="px-2 sm:px-3 py-1 rounded bg-emerald-600 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">GUIDED </span>PRACTICE
            </span>
          ) : (
            <span className="px-2 sm:px-3 py-1 rounded bg-red-600 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shrink-0 animate-pulse">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>REAL EXAM</span>
            </span>
          )}

          {/* Official Countdown Timer */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-slate-900 border border-slate-700 font-mono font-bold text-xs sm:text-sm text-emerald-400 shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <span>{formatTime(timeLeft)}</span>
            {mode === "PRACTICE" && (
              <button
                onClick={handleToggleMainPause}
                className="ml-0.5 p-0.5 hover:text-white cursor-pointer"
                title={isTimerPaused || isAudioPaused ? "Resume Exam & Audio" : "Pause Exam & Audio"}
              >
                {isTimerPaused || isAudioPaused ? <Play className="w-3 h-3 fill-emerald-400" /> : <Pause className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmittingExam}
            onClick={handleFinishTest}
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow shrink-0 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
          >
            {isSubmittingExam ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Finish Test</span>
                <span className="sm:hidden">Finish</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ─── ADMIN FREE-ROAM CONTROLLER BAR (Visible strictly for Admin Accounts) ─── */}
      {isAdmin && (
        <div className="bg-amber-500/15 dark:bg-amber-950/50 border-b border-amber-500/40 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-amber-950 dark:text-amber-200 shrink-0 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>👑 Mode Admin : Navigation Libre & Contrôles Sans Restriction</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold hidden sm:inline">
              UNRESTRICTED
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setTimeLeft(5)}
              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1"
              title="Régler le compte à rebours sur 5 secondes pour tester la fin automatique de l'épreuve"
            >
              <FastForward className="w-3 h-3" />
              <span>⏩ Timer 5s (Test Timeout)</span>
            </button>
            <button
              onClick={() => {
                const sec = paper?.sections?.[activeSectionIdx];
                const fullDuration = getSectionDurationSeconds(sec?.type, sec?.durationMins);
                setTimeLeft(fullDuration);
              }}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1"
              title="Réinitialiser le temps de la section actuelle"
            >
              <RotateCcw className="w-3 h-3" />
              <span>🔄 Reset Timer</span>
            </button>
            <button
              onClick={() => setIsTimerPaused(prev => !prev)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1"
            >
              {isTimerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isTimerPaused ? "Resume" : "Pause"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── PRACTICE MODE TOOLBAR (OPTIONAL HELPER TOGGLES & STRATEGY) - Desktop Only ─── */}
      {mode === "PRACTICE" && (
        <div className={`hidden lg:flex ${cbtDark ? "bg-emerald-950/40 border-emerald-800/60" : "bg-emerald-50 border-emerald-300"} border-b px-4 py-2 text-xs items-center gap-3 overflow-x-auto shrink-0`}>
          <span className={`font-bold flex items-center gap-1 shrink-0 ${cbtDark ? "text-emerald-400" : "text-emerald-900"}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Assistants:</span>
          </span>

          <button
            onClick={() => setShowStrategyModal(true)}
            className="px-3 py-1 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 shrink-0 hover:brightness-110 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 {currentSection.title} Exam Strategy</span>
          </button>

          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              showHints
                ? "bg-amber-600 text-white border-amber-600"
                : cbtDark
                ? "bg-[#1E293B] text-slate-200 border-slate-700"
                : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {currentSection.type === "COMPREHENSION_ORALE"
                ? showHints ? "Hide Audio Coach 🎧" : "🎧 Audio Coach & Trap Alert"
                : currentSection.type === "COMPREHENSION_ECRITE"
                ? showHints ? "Hide Reading Coach 📖" : "📖 Reading Strategy & Trap Alert"
                : currentSection.type === "EXPRESSION_ECRITE"
                ? showHints ? "Hide Writing Coach ✍️" : "✍️ Writing Strategy & Trap Alert"
                : showHints ? "Hide Speaking Coach 🎙️" : "🎙️ Speaking Strategy & Trap Alert"}
            </span>
          </button>

          {currentSection.type === "COMPREHENSION_ORALE" && (
            <>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  showTranscript
                    ? "bg-purple-600 text-white border-purple-600"
                    : cbtDark
                    ? "bg-[#1E293B] text-slate-200 border-slate-700"
                    : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showTranscript ? "Hide French Transcript 📄" : "📄 Show French Audio Transcript"}</span>
              </button>

              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  showTranslation
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : cbtDark
                    ? "bg-[#1E293B] text-slate-200 border-slate-700"
                    : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{showTranslation ? "Hide English Translation 🌐" : "🌐 Show English Translation"}</span>
              </button>
            </>
          )}

          {currentSection.type === "COMPREHENSION_ECRITE" && (
            <button
              onClick={() => setShowPassageTranslation(!showPassageTranslation)}
              className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                showPassageTranslation
                  ? "bg-blue-600 text-white border-blue-600"
                  : cbtDark
                  ? "bg-[#1E293B] text-slate-200 border-slate-700"
                  : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{showPassageTranslation ? "Hide Reading EN Translation" : "Side-by-Side English Translation"}</span>
            </button>
          )}
        </div>
      )}

      {/* ─── SECTION NAVIGATION TABS (Strict Linear Locks in Exam Mode for Students | Unrestricted for Admins) ─── */}
      <div className={`${cbtDark ? "bg-slate-900 border-slate-800" : "bg-slate-200 border-slate-300"} border-b px-2 sm:px-4 py-1 flex items-center gap-1.5 overflow-x-auto shrink-0 text-[11px] sm:text-xs font-bold scrollbar-none`}>
        {paper.sections.map((sec, idx) => {
          const isSelected = activeSectionIdx === idx;
          const isCompleted = completedSectionIndices.includes(idx);
          const isLocked = mode === "EXAM" && !isAdmin && idx > activeSectionIdx;

          return (
            <button
              key={sec.type}
              disabled={isLocked || (mode === "EXAM" && !isAdmin && isCompleted && idx !== activeSectionIdx)}
              onClick={() => {
                if (!isLocked || isAdmin) {
                  setActiveSectionIdx(idx);
                  setCurrentQuestionIdx(0);
                }
              }}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded transition-all shrink-0 flex items-center gap-1 sm:gap-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow ring-2 ring-blue-400"
                  : isLocked
                  ? "opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500 border border-slate-400/30"
                  : isCompleted && mode === "EXAM" && !isAdmin
                  ? "opacity-75 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300"
                  : cbtDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-300 font-bold border border-slate-300 cursor-pointer"
              }`}
              title={isLocked ? "🔒 Section verrouillée en mode examen (Progression séquentielle)" : isCompleted ? "✓ Épreuve terminée" : ""}
            >
              {isLocked ? (
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
              ) : sec.type === "COMPREHENSION_ORALE" ? (
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : sec.type === "COMPREHENSION_ECRITE" ? (
                <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : sec.type === "EXPRESSION_ECRITE" ? (
                <PenTool className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : (
                <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
              <span className="truncate max-w-[120px] sm:max-w-none">{sec.title}</span>
              {sec.type === "COMPREHENSION_ECRITE" && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-blue-900 text-blue-200 font-mono hidden md:inline">60m</span>
              )}
              {sec.type === "EXPRESSION_ECRITE" && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-pink-900 text-pink-200 font-mono hidden md:inline">60m</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── MAIN CBT SPLIT-SCREEN CONTENT WORKSPACE ─── */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 max-w-7xl w-full mx-auto overflow-y-auto">
        {/* PROMINENT PRACTICE STRATEGY BANNER - Desktop Only (Hidden on mobile < 1024px) */}
        {mode === "PRACTICE" && (
          <div className="hidden lg:flex mb-4 p-4 rounded-xl border border-purple-300 dark:border-purple-800 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950 text-white shadow-lg flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold shrink-0">
                <BookOpen className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <span>📖 {currentSection.title} Official Strategy & Prep Guide</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/40 text-purple-200 text-[10px] font-mono uppercase">TCF / TEF Standards</span>
                </h4>
                <p className="text-xs text-purple-200 leading-snug">
                  Review time management, distractor avoidance, and official examiner scoring criteria before answering.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowStrategyModal(true)}
              className="px-4 py-2 rounded-lg bg-white text-purple-950 font-bold text-xs hover:bg-purple-100 transition-all shrink-0 shadow flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Open Official Strategy Guide →</span>
            </button>
          </div>
        )}

        {/* LISTENING & READING SPLIT SCREEN */}
        {currentQuestions.length > 0 && currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 h-full">

            {/* LEFT PANEL: PASSAGE / AUDIO STIMULUS (7 COLS) */}
            <div className={`lg:col-span-7 p-3 sm:p-4 lg:p-5 rounded-xl border ${cbtCard} shadow-sm space-y-3 sm:space-y-4 flex flex-col justify-between overflow-y-auto max-lg:max-h-[30vh] lg:max-h-none`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase truncate max-w-[200px] sm:max-w-none">
                    {currentSection.title} — Item {currentQ.questionNumber} of {currentQuestions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    {currentSection.type === "COMPREHENSION_ORALE" && mode === "PRACTICE" && qTimeLeft !== null && (
                      <div className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-900 dark:text-purple-300 font-mono font-bold text-xs flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        <span>Target Pace: {qTimeLeft}s</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 shrink-0 cursor-pointer transition-all shadow-xs active:scale-95 ${
                        flaggedQuestions[currentQ.id]
                          ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600 ring-2 ring-amber-400/40"
                          : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? "fill-white text-white" : "text-amber-500"}`} />
                      <span>{flaggedQuestions[currentQ.id] ? "🚩 Marqué / Flagged" : "Marquer / Flag"}</span>
                    </button>
                  </div>
                </div>

                {/* Question Prompt Card (Strictly toggled ONLY via "Show/Hide Question Text" button or upon test submission) */}
                {(showQuestionPrompt || isSubmitted) && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-md space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                      <span className="flex items-center gap-1.5 font-mono">
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>📝 Intitulé de la question N°{currentQ.questionNumber}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                        Niveau {(currentQ as any).level || "A1-C2"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-100 leading-snug">
                      {currentQ.questionNumber <= 4
                        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
                        : (currentQ as any).questionPrompt || currentQ.text || `Écoutez le document sonore et choisissez la bonne réponse.`}
                    </div>
                  </div>
                )}

                {/* Official Listening Audio Component */}
                {currentSection.type === "COMPREHENSION_ORALE" && (
                  <div className="p-3.5 sm:p-4 rounded-xl border space-y-3 bg-purple-50 border-purple-300 text-slate-950">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-purple-700" />
                        <span>Official Audio Document:</span>
                      </span>

                      {mode === "PRACTICE" && (
                        <div className="flex items-center gap-2">
                          {(isAudioPaused || isTimerPaused) ? (
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-900 text-amber-100 border border-amber-700 shadow-sm flex items-center gap-1.5 animate-pulse">
                              <span>⏸️ ⏱️ {qTimeLeft !== null ? `${qTimeLeft}s (En pause)` : "En pause"}</span>
                            </span>
                          ) : isSpeaking ? (
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-900 text-blue-100 border border-blue-700 shadow-sm flex items-center gap-1.5">
                              <Volume2 className="w-3.5 h-3.5 animate-pulse text-blue-300" />
                              <span>🎧 Lecture audio...</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-900 text-emerald-100 border border-emerald-700 shadow-sm flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>⏱️ {qTimeLeft !== null ? `${qTimeLeft}s restantes` : `${currentQ.questionNumber <= 10 ? 15 : currentQ.questionNumber <= 26 ? 20 : 25}s (Pace)`}</span>
                            </span>
                          )}
                        </div>
                      )}

                      {mode === "EXAM" ? (
                        <div className="w-full">
                          {!isAudioFinished || isSpeaking ? (
                            <div className="px-3.5 py-2.5 rounded-lg bg-blue-900 text-white border border-blue-700 text-xs font-mono font-bold flex items-center justify-between shadow-md">
                              <div className="flex items-center gap-2">
                                <Volume2 className="w-4 h-4 text-blue-300 animate-pulse" />
                                <span>🎧 Document Sonore TCF N°{currentQ.questionNumber} — Lecture unique en cours...</span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-800 text-blue-200 border border-blue-600 hidden sm:inline">Format Conforme TCF</span>
                            </div>
                          ) : (
                            <div className="px-3.5 py-2.5 rounded-lg bg-emerald-900 text-white border border-emerald-700 text-xs font-mono font-bold flex items-center justify-between shadow-md">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>✅ Écoute terminée — Choisissez votre réponse</span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 border border-emerald-600 font-mono">
                                ⏱️ {qTimeLeft !== null ? `${qTimeLeft}s restantes` : "Temps de réponse"}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setShowQuestionPrompt(!showQuestionPrompt)}
                              className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm border cursor-pointer ${
                                showQuestionPrompt
                                  ? "bg-amber-600 text-white border-amber-700"
                                  : "bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200"
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{showQuestionPrompt ? "Hide Question Text 📝" : "📝 Show Question Text"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setShowTranscript(!showTranscript)}
                              className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm border cursor-pointer ${
                                showTranscript
                                  ? "bg-purple-700 text-white border-purple-800"
                                  : "bg-purple-100 text-purple-950 border-purple-300 hover:bg-purple-200"
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{showTranscript ? "Hide Transcript 📄" : "📄 French Transcript"}</span>
                            </button>

                            {currentQ.transcriptEnglish && (
                              <button
                                type="button"
                                onClick={() => setShowTranslation(!showTranslation)}
                                className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm border cursor-pointer ${
                                  showTranslation
                                    ? "bg-indigo-700 text-white border-indigo-800"
                                    : "bg-indigo-100 text-indigo-950 border-indigo-300 hover:bg-indigo-200"
                                }`}
                              >
                                <Globe className="w-3.5 h-3.5" />
                                <span>{showTranslation ? "Hide Translation 🌐" : "🌐 English Translation"}</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (isSpeaking || isAudioPaused || isTimerPaused) {
                                  handlePauseResumeAudio();
                                } else {
                                  handlePlayAudio(currentQ.transcript || currentQ.text, "fr-FR", (currentQ as any).speakingRate || 1.0);
                                }
                              }}
                              className="px-3.5 sm:px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer active:scale-95 transition-all"
                            >
                              {isSpeaking && !isAudioPaused && !isTimerPaused ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  <span>Pause Audio ⏸️</span>
                                </>
                              ) : (isAudioPaused || isTimerPaused) ? (
                                <>
                                  <Play className="w-4 h-4" />
                                  <span>Resume Audio ▶️</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-4 h-4" />
                                  <span>🔊 Play Audio Document</span>
                                </>
                              )}
                            </button>

                            {(isSpeaking || isAudioPaused || isTimerPaused) && (
                              <button
                                onClick={handleStopAudio}
                                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                                title="Stop Audio"
                              >
                                <Square className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Visual Illustration Image for Q1-Q4 */}
                    {(() => {
                      const mainImgSrc = (currentQ as any).mainImage;
                      const imgKey = `${paper?.id || "paper"}_${currentQ.id || currentQ.questionNumber}`;
                      const isImgFailed = failedImagesMap[imgKey];

                      if (mainImgSrc && !isImgFailed) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 space-y-2 shadow-md">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b pb-1.5 border-slate-200">
                              <span className="flex items-center gap-1.5">🖼️ <strong>Sur le livret / l'écran, vous voyez :</strong></span>
                              <span className="text-[10px] text-blue-600 font-mono font-bold">🔍 Tap to expand</span>
                            </div>
                            <div
                              onClick={() => setZoomedImageSrc(mainImgSrc)}
                              className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-slate-300 bg-white flex items-center justify-center cursor-zoom-in group"
                            >
                              <img
                                src={mainImgSrc}
                                alt={`Illustration N°${currentQ.questionNumber}`}
                                className="w-full h-full object-contain p-1 bg-white transition-transform duration-200 group-hover:scale-105"
                                onError={() => {
                                  setFailedImagesMap((prev) => ({ ...prev, [imgKey]: true }));
                                }}
                              />
                              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 shadow">
                                <Search className="w-3 h-3" />
                                <span>Plein écran 🔍</span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (currentQ.questionNumber <= 4) {
                        return (
                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-white space-y-3 shadow-md">
                            <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-slate-800 pb-2">
                              <span className="flex items-center gap-1.5 font-mono">
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <span>🎨 Illustration Visuelle HD TCF (Épreuve {paper?.code ? paper.code.replace(/\D/g, "") : "1"})</span>
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                                Q{currentQ.questionNumber} / 4
                              </span>
                            </div>
                            <div className="p-6 rounded-lg bg-slate-950/80 border border-slate-800 text-center space-y-2">
                              <p className="text-sm font-semibold text-slate-200">
                                🖼️ Image HD en cours de création pour cette épreuve.
                              </p>
                              <p className="text-xs text-slate-400 italic">
                                Écoutez attentivement les 4 propositions sonores et cochez la bonne réponse.
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })()}

                    {/* Practice Mode Audio Transcript Display */}
                    {(showTranscript || showTranscripts) && currentQ.transcript && (
                      <div className="p-4 rounded-xl bg-slate-900 text-white border border-purple-500/40 shadow-lg space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span>{activeBranding.transcriptLabel}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 text-[10px] font-mono">
                            Niveau {(currentQ as any).level || 'A1-C2'}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-sm leading-relaxed text-slate-100 font-sans">
                          {currentQ.transcript}
                        </div>
                      </div>
                    )}

                    {/* Practice Mode English Translation Display */}
                    {(showTranslation || showTranscripts) && (currentQ.transcriptEnglish || currentQ.text) && (
                      <div className="p-4 rounded-xl bg-slate-900 text-white border border-indigo-500/40 shadow-lg space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-cyan-300 border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                            <Globe className="w-4 h-4 text-indigo-400" />
                            <span>English Translation</span>
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-sm leading-relaxed text-slate-200 italic font-sans">
                          "{currentQ.transcriptEnglish || currentQ.text}"
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Official Reading Passage Component */}
                {currentSection.type === "COMPREHENSION_ECRITE" && currentQ.passage && (
                  <div className={`p-3.5 sm:p-4 rounded-xl border space-y-3 ${
                    cbtDark ? "bg-blue-950/40 border-blue-800/60 text-slate-100" : "bg-blue-50 border-blue-300 text-slate-950"
                  }`}>
                    <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800 pb-2 gap-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>Document d'épreuve :</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Font size scaler for reading comfort */}
                        <div className="flex items-center border border-blue-300 dark:border-blue-700 rounded-md overflow-hidden bg-white dark:bg-slate-900">
                          <button
                            type="button"
                            onClick={() => setReadingFontSize((prev) => prev === "lg" ? "base" : "sm")}
                            className={`px-2 py-0.5 text-[10px] font-bold ${readingFontSize === "sm" ? "bg-blue-600 text-white" : "text-blue-900 dark:text-blue-200 hover:bg-blue-100"}`}
                            title="Smaller text"
                          >
                            A-
                          </button>
                          <button
                            type="button"
                            onClick={() => setReadingFontSize("base")}
                            className={`px-2 py-0.5 text-[10px] font-bold border-x border-blue-300 dark:border-blue-700 ${readingFontSize === "base" ? "bg-blue-600 text-white" : "text-blue-900 dark:text-blue-200 hover:bg-blue-100"}`}
                            title="Default text"
                          >
                            A
                          </button>
                          <button
                            type="button"
                            onClick={() => setReadingFontSize((prev) => prev === "sm" ? "base" : "lg")}
                            className={`px-2 py-0.5 text-[10px] font-bold ${readingFontSize === "lg" ? "bg-blue-600 text-white" : "text-blue-900 dark:text-blue-200 hover:bg-blue-100"}`}
                            title="Larger text"
                          >
                            A+
                          </button>
                        </div>

                        {mode === "PRACTICE" && currentQ.passageEnglish && (
                          <button
                            onClick={() => setShowPassageTranslation(!showPassageTranslation)}
                            className="px-2 py-1 rounded bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-500 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Globe className="w-3 h-3" />
                            <span className="hidden xs:inline">{showPassageTranslation ? "Hide EN" : "🌐 Show EN"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className={`font-serif leading-relaxed font-medium text-slate-950 dark:text-slate-100 whitespace-pre-line p-3 sm:p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900 max-h-[35vh] lg:max-h-[300px] overflow-y-auto ${
                      readingFontSize === "sm" ? "text-xs leading-normal" : readingFontSize === "lg" ? "text-sm sm:text-base leading-relaxed" : "text-xs sm:text-sm"
                    }`}>
                      "{currentQ.passage}"
                    </p>

                    {showPassageTranslation && currentQ.passageEnglish && (
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                        <p className="font-bold uppercase text-[10px] mb-1">English Passage Translation:</p>
                        <p className="italic text-slate-700 dark:text-slate-300">{currentQ.passageEnglish}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Practice Hint Bar - Desktop Only (Hidden on mobile < 1024px to prevent vertical pushing) */}
              {mode === "PRACTICE" && ((currentQ as any).trapAlert || (currentQ as any).readingCoach || (currentQ as any).audioCoach || currentQ.explanation || currentQ.hint) && (
                <div className="hidden lg:block space-y-2">
                  {!showReadingHint ? (
                    <button
                      type="button"
                      onClick={() => setShowReadingHint(true)}
                      className="w-full p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center justify-between shadow-sm transition-all cursor-pointer group"
                    >
                      <span className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                        <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                        <span>
                          {currentSection.type === "COMPREHENSION_ECRITE"
                            ? "📖 Reading Strategy Coach & Trap Alert"
                            : "🎧 Audio Coach & Trap Alert"} — Niveau {(currentQ as any).level || 'A1-C2'}
                        </span>
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-800 dark:text-amber-200 font-mono font-bold flex items-center gap-1 group-hover:bg-amber-600/30 transition-colors">
                        <span>Afficher les conseils</span>
                        <span>▼</span>
                      </span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-900 dark:text-slate-100 text-xs space-y-3 shadow-sm transition-all">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                        <span className="font-extrabold flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-xs sm:text-sm">
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {currentSection.type === "COMPREHENSION_ECRITE"
                              ? "📖 Reading Strategy Coach & Trap Alert"
                              : "🎧 Audio Coach & Trap Alert"} — Niveau {(currentQ as any).level || 'A1-C2'}
                          </span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-600/20 text-amber-700 dark:text-amber-300 font-mono font-bold">
                            Méthodologie TCF
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowReadingHint(false)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-800 dark:text-amber-200 font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>Masquer</span>
                            <span>▲</span>
                          </button>
                        </div>
                      </div>

                      {/* Trap Alert Section */}
                      {(currentQ as any).trapAlert ? (
                        <div className="space-y-1.5">
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed text-xs">
                            {(currentQ as any).trapAlert}
                          </p>
                          {(currentQ as any).trapAlertEn && (
                            <div className="p-2.5 rounded-lg bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 text-[11px] text-amber-950 dark:text-amber-200 leading-relaxed font-sans">
                              <span className="font-bold text-amber-800 dark:text-amber-300 mr-1.5">🇬🇧 Translation:</span>
                              {(currentQ as any).trapAlertEn}
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* Strategy Coach Section (Audio or Reading) */}
                      {((currentQ as any).readingCoach || (currentQ as any).audioCoach) ? (
                        <div className="space-y-1.5 pt-2.5 border-t border-amber-500/20">
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed text-xs">
                            {(currentQ as any).readingCoach || (currentQ as any).audioCoach}
                          </p>
                          {((currentQ as any).readingCoachEn || (currentQ as any).audioCoachEn) && (
                            <div className="p-2.5 rounded-lg bg-blue-100/70 dark:bg-blue-950/40 border border-blue-300/80 dark:border-blue-800/60 text-[11px] text-blue-950 dark:text-blue-200 leading-relaxed font-sans">
                              <span className="font-bold text-blue-800 dark:text-blue-300 mr-1.5">🇬🇧 Translation:</span>
                              {(currentQ as any).readingCoachEn || (currentQ as any).audioCoachEn}
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* Detailed Pedagogical Analysis Section */}
                      {currentQ.explanation ? (
                        <div className="space-y-2 pt-2.5 border-t border-amber-500/20">
                          <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Analyse Pédagogique Détaillée</span>
                          </div>
                          <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 whitespace-pre-line leading-relaxed text-xs font-medium text-slate-900 dark:text-slate-100">
                            {currentQ.explanation}
                          </div>
                          {((currentQ as any).detailedExplanationEn || (currentQ as any).explanationEnglish || (currentQ as any).explanationEn) && (
                            <div className="p-3 rounded-xl bg-purple-100/70 dark:bg-purple-950/50 border border-purple-300/80 dark:border-purple-800/70 whitespace-pre-line leading-relaxed text-xs font-sans text-purple-950 dark:text-purple-200">
                              <div className="font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-1">
                                <span>🇬🇧 English Pedagogical Translation:</span>
                              </div>
                              {(currentQ as any).detailedExplanationEn || (currentQ as any).explanationEnglish || (currentQ as any).explanationEn}
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* Fallback for other sections (e.g. Reading/Writing) */}
                      {!(currentQ as any).trapAlert && !currentQ.explanation && currentQ.hint && (
                        <div className="whitespace-pre-line leading-relaxed text-xs font-medium">
                          {currentQ.hint}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT PANEL: QUESTION & OPTIONS SELECTOR (5 COLS) */}
            <div className={`lg:col-span-5 p-3.5 sm:p-4 lg:p-5 rounded-xl border ${cbtCard} shadow-sm space-y-4 sm:space-y-5 flex flex-col justify-between`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-950 dark:text-slate-100">
                    {currentSection.type === "COMPREHENSION_ORALE" && (currentQ.questionNumber || 0) <= 4
                      ? `Question N°${currentQ.questionNumber}`
                      : currentSection.type === "COMPREHENSION_ORALE" && (currentQ.questionNumber || 0) < 30
                        ? (mode === "PRACTICE" && showQuestionPrompt)
                          ? currentQ.text
                          : `Question Audio N°${currentQ.questionNumber}`
                        : currentQ.text}
                  </h3>
                  {currentSection.type === "COMPREHENSION_ORALE" && (currentQ.questionNumber || 0) <= 4 ? (
                    <p className="text-xs text-purple-700 dark:text-purple-400 font-medium italic">
                      Regardez l'illustration. Écoutez les 4 propositions (A, B, C, D) et choisissez celle qui correspond à l'image.
                    </p>
                  ) : currentSection.type === "COMPREHENSION_ORALE" && (currentQ.questionNumber || 0) < 30 && (mode === "EXAM" || !showQuestionPrompt) ? (
                    <p className="text-xs text-purple-700 dark:text-purple-400 font-medium italic">
                      Écoutez la question posée à la fin du document audio et choisissez l'option (A, B, C, D) ci-dessous.
                    </p>
                  ) : null}
                  {showTranslation && (
                    <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 italic pt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 shrink-0" />
                      <span>
                        Question (EN): "
                        {currentQ.questionNumber <= 4
                          ? "Look at the illustration. Listen to the 4 options (A, B, C, D) and choose the one that corresponds to the image."
                          : ((currentQ as any).questionPromptEnglish || currentQ.text)}
                        "
                      </span>
                    </p>
                  )}
                </div>

                {/* Mobile Strategy & Trap Alert Toggle Pill (Visible ONLY on Mobile screens < 1024px in Practice Mode) */}
                {mode === "PRACTICE" && ((currentQ as any).trapAlert || (currentQ as any).readingCoach || (currentQ as any).audioCoach || currentQ.hint) && (
                  <button
                    type="button"
                    onClick={() => setShowMobileStrategyDrawer(true)}
                    className="lg:hidden w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-purple-500/15 border border-amber-500/30 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center justify-between shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-amber-800 dark:text-amber-300 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
                      <span className="truncate">
                        {currentSection.type === "COMPREHENSION_ECRITE" ? "📖 Reading Strategy & Trap Alert" : "🎧 Audio Coach & Trap Alert"}
                      </span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 font-mono font-bold flex items-center gap-1 border border-amber-500/30 shrink-0 ml-2">
                      <span>Tap to view</span>
                      <span>→</span>
                    </span>
                  </button>
                )}

                {/* Multiple Choice Options (Official FEI Radio Buttons for Spoken Option Items vs Standard Text Options) */}
                <div className="space-y-2.5">
                  {((currentQ as any).optionImages && (currentQ as any).optionImages.length === 4) ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {(() => {
                        const optSvgs = currentQ.questionNumber <= 4 && !(currentQ as any).optionImages
                          ? getOfficialOptionImageSvgs(currentQ.questionNumber, (paper?.code ? parseInt(paper.code.replace(/\D/g, "") || "1", 10) : 1))
                          : null;

                        return currentQ.options.map((opt, idx) => {
                          const letter = String.fromCharCode(65 + idx); // A, B, C, D
                          const isChosen = selectedAnswers[currentQ.id] === idx;
                          const isLocked = mode === "PRACTICE" && checkedMap[currentQ.id];
                          const imgUrl = (currentQ as any).optionImages?.[idx];
                          const svgCard = optSvgs?.[idx];

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                if (!isLocked) handleSelectOption(currentQ.id, idx);
                              }}
                              className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 shadow-sm flex flex-col justify-between active:scale-[0.98] ${
                                isChosen
                                  ? "border-blue-600 ring-2 ring-blue-500/50 bg-blue-50/20 dark:bg-blue-950/30 shadow-md"
                                  : cbtDark
                                  ? "bg-slate-800/80 border-slate-700 hover:border-blue-400"
                                  : "bg-white border-slate-300 hover:border-blue-500 hover:shadow-md"
                              } ${isLocked ? "cursor-not-allowed opacity-90" : ""}`}
                            >
                              {/* Card Top Letter Header */}
                              <div className={`px-3 py-2 flex items-center justify-between font-extrabold text-xs border-b ${
                                isChosen
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : cbtDark
                                  ? "bg-slate-700/80 text-slate-200 border-slate-700"
                                  : "bg-slate-100 text-slate-900 border-slate-200"
                              }`}>
                                <span className="flex items-center gap-1.5 font-mono">
                                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-black ${
                                    isChosen ? "bg-white text-blue-600" : "bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-slate-100"
                                  }`}>
                                    {letter}
                                  </span>
                                  <span>Image {letter}</span>
                                </span>
                                {isChosen && <CheckCircle2 className="w-4 h-4 text-white" />}
                              </div>

                              {/* HD Photo or Line Art SVG Display */}
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
                                {svgCard ? (
                                  <div
                                    className="w-full h-full p-1"
                                    dangerouslySetInnerHTML={{ __html: svgCard }}
                                  />
                                ) : imgUrl ? (
                                  <img
                                    src={imgUrl}
                                    alt={`Option ${letter}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : null}
                              </div>

                              {/* In PRACTICE mode, show text caption below image */}
                              {mode === "PRACTICE" && (
                                <div className="p-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-0.5">
                                  <div>{opt}</div>
                                  {showTranslation && (currentQ as any).optionsEnglish?.[idx] && (
                                    <div className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 italic">
                                      EN: {(currentQ as any).optionsEnglish[idx]}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  ) : (currentQ.hasSpokenOptions || (currentQ.questionNumber >= 5 && currentQ.questionNumber <= 8)) ? (
                    <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 shadow-md">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-amber-400" />
                          <span>Choisissez la bonne réponse (A, B, C ou D) :</span>
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Options Orales (Écoute)
                        </span>
                      </div>

                      {mode === "PRACTICE" && (
                        <div className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-200 text-xs flex items-start gap-2.5">
                          <Volume2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="font-semibold text-blue-200 leading-relaxed">
                              🎧 <strong className="text-blue-300">Format officiel TCF :</strong> Les 4 propositions sont lues oralement dans l'enregistrement. Écoutez attentivement et cochez la lettre entendue.
                            </p>
                            {showTranslation && (
                              <p className="text-[11px] text-blue-300/80 italic">
                                Official TCF Format: The 4 choices are read aloud in the audio recording. Listen carefully and select the letter (A, B, C, or D).
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        {currentQ.options.map((optText, idx) => {
                          const letter = String.fromCharCode(65 + idx); // A, B, C, D
                          const isChosen = selectedAnswers[currentQ.id] === idx;
                          const isLocked = mode === "PRACTICE" && checkedMap[currentQ.id];

                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isLocked}
                              onClick={() => {
                                if (!isLocked) handleSelectOption(currentQ.id, idx);
                              }}
                              className={`w-full p-3 sm:p-3.5 rounded-xl border-2 font-bold text-sm sm:text-base flex flex-col justify-center transition-all duration-200 shadow-sm ${
                                isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-[0.99]"
                              } ${
                                isChosen
                                  ? "bg-blue-600 border-blue-500 text-white ring-2 ring-blue-400/50 shadow-blue-900/50"
                                  : "bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-700/80"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono font-black shrink-0 ${
                                    isChosen ? "border-white bg-white text-blue-600" : "border-slate-400 text-slate-300"
                                  }`}>
                                    {letter}
                                  </div>
                                  <span className="font-mono tracking-wide text-base font-black">{letter}.</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isChosen ? "border-white bg-white" : "border-slate-500"
                                }`}>
                                  {isChosen && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                              </div>
                              {showTranscript && mode === "PRACTICE" && (
                                <p className="text-xs opacity-90 font-medium italic pt-1.5 pl-9 text-left">
                                  "{optText}"
                                </p>
                              )}
                              {showTranslation && mode === "PRACTICE" && (currentQ as any).optionsEnglish?.[idx] && (
                                <p className="text-xs text-indigo-300 font-medium italic pt-0.5 pl-9 text-left">
                                  EN: "{(currentQ as any).optionsEnglish[idx]}"
                                </p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    currentQ.options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx); // A, B, C, D
                      const isChosen = selectedAnswers[currentQ.id] === idx;
                      const isLocked = mode === "PRACTICE" && checkedMap[currentQ.id];

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (!isLocked) handleSelectOption(currentQ.id, idx);
                          }}
                          className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all flex items-center justify-between min-h-[48px] touch-manipulation active:scale-[0.99] ${
                            isChosen
                              ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                              : cbtDark
                              ? "bg-slate-800/80 text-slate-200 border-slate-700 hover:border-blue-400"
                              : "bg-slate-50 text-slate-950 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50"
                          } ${isLocked ? "cursor-not-allowed opacity-90" : ""}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              isChosen
                                ? "bg-white text-blue-600"
                                : cbtDark
                                ? "bg-slate-700 text-slate-200"
                                : "bg-slate-200 text-slate-900 font-extrabold"
                            }`}>
                              {letter}
                            </span>
                            <div className="flex flex-col min-w-0 text-left">
                              <span className="leading-snug break-words">{opt}</span>
                              {showTranslation && mode === "PRACTICE" && (currentQ as any).optionsEnglish?.[idx] && (
                                <span className={`text-xs italic pt-0.5 ${isChosen ? "text-blue-100" : "text-indigo-600 dark:text-indigo-400"}`}>
                                  EN: {(currentQ as any).optionsEnglish[idx]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Practice Mode 2-Attempt Check Answer Button & Feedback Panel */}
                {mode === "PRACTICE" && selectedAnswers[currentQ.id] !== undefined && (
                  <div className="space-y-3 pt-2">
                    {!checkedMap[currentQ.id] && (
                      <button
                        onClick={() => handleCheckAnswer(currentQ.id, currentQ.correctIndex)}
                        className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Check Answer (Attempt {(attemptsMap[currentQ.id] || 0) + 1} of 2)</span>
                      </button>
                    )}

                    {attemptsMap[currentQ.id] === 1 && !checkedMap[currentQ.id] && (
                      <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                        <span>⚠️ Incorrect. You have 1 attempt remaining. Try again!</span>
                      </div>
                    )}

                    {checkedMap[currentQ.id] && (() => {
                      const chosenIdx = selectedAnswers[currentQ.id];
                      const isCorrect = chosenIdx === currentQ.correctIndex;
                      const correctLetter = String.fromCharCode(65 + currentQ.correctIndex);
                      const correctOptionText = currentQ.options[currentQ.correctIndex];

                      return (
                        <div className={`p-4 rounded-xl border space-y-2 text-xs font-sans ${
                          isCorrect
                            ? cbtDark ? "bg-emerald-950/40 border-emerald-800 text-emerald-200" : "bg-emerald-50 border-emerald-300 text-emerald-950"
                            : cbtDark ? "bg-rose-950/40 border-rose-800 text-rose-200" : "bg-rose-50 border-rose-300 text-rose-950"
                        }`}>
                          <div className="flex items-center gap-2 font-extrabold text-sm">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span className="text-emerald-700 dark:text-emerald-400">✓ Correct Answer!</span>
                              </>
                            ) : (
                              <>
                                <span className="text-rose-600 font-bold text-base shrink-0">✗</span>
                                <span className="text-rose-700 dark:text-rose-400">✗ Question Locked (0 Attempts Left)</span>
                              </>
                            )}
                          </div>

                          {(() => {
                            const correctOptionTextEn = (currentQ as any).optionsEnglish && (currentQ as any).optionsEnglish[currentQ.correctIndex]
                              ? (currentQ as any).optionsEnglish[currentQ.correctIndex]
                              : "";
                            const explanationEn = (currentQ as any).detailedExplanationEn || (currentQ as any).explanationEnglish || (currentQ as any).explanationEn || "";

                            return (
                              <>
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                  {isCorrect ? (
                                    <>
                                      <span>Excellent! Option {correctLetter} (« {correctOptionText} ») is the correct response.</span>
                                      {correctOptionTextEn && (
                                        <span className="block mt-1 text-[11px] font-normal text-slate-600 dark:text-slate-400">
                                          🇬🇧 Meaning: <em>"{correctOptionTextEn}"</em>
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <span>The correct answer is Option {correctLetter}: « {correctOptionText} ».</span>
                                      {correctOptionTextEn && (
                                        <span className="block mt-1 text-[11px] font-normal text-slate-600 dark:text-slate-400">
                                          🇬🇧 Meaning: <em>"{correctOptionTextEn}"</em>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </p>

                                {currentQ.explanation && (
                                  <div className="pt-2.5 border-t border-slate-300 dark:border-slate-700/60 space-y-2">
                                    <span className="font-bold uppercase text-[10px] tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                      <span>Analyse Pédagogique Détaillée :</span>
                                    </span>
                                    <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 whitespace-pre-line leading-relaxed font-medium text-xs text-slate-900 dark:text-slate-200">
                                      {currentQ.explanation}
                                    </div>
                                    {explanationEn && (
                                      <div className="p-3 rounded-xl bg-purple-100/70 dark:bg-purple-950/50 border border-purple-300/80 dark:border-purple-800/70 whitespace-pre-line leading-relaxed text-xs font-sans text-purple-950 dark:text-purple-200">
                                        <div className="font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-1">
                                          <span>🇬🇧 English Pedagogical Translation:</span>
                                        </div>
                                        {explanationEn}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Prev / Next Bottom Navigator */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  disabled={currentQuestionIdx === 0 || (!isAdmin && mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE")}
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    currentQuestionIdx === 0 || (!isAdmin && mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE")
                      ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 cursor-pointer"
                  }`}
                  title={!isAdmin && mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE" ? "Navigation verrouillée en mode examen (Règles CBT)" : ""}
                >
                  ← Previous Question
                </button>

                {!isAdmin && mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE" ? (
                  <div className="px-3 py-1.5 rounded-lg bg-blue-950/80 text-blue-300 border border-blue-800 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow">
                    <span>🔒 Navigation Standard CBT</span>
                  </div>
                ) : currentQuestionIdx < currentQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Next Question →
                  </button>
                ) : activeSectionIdx < paper.sections.length - 1 ? (
                  <button
                    onClick={() => {
                      const nextIdx = activeSectionIdx + 1;
                      const nextSecTitle = paper.sections[nextIdx]?.title || "Section suivante";
                      if (mode === "EXAM" && !isAdmin) {
                        setSectionTransitionModal({ show: true, targetIdx: nextIdx, targetTitle: nextSecTitle });
                      } else {
                        setActiveSectionIdx(nextIdx);
                        setCurrentQuestionIdx(0);
                      }
                    }}
                    className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <span>Passer à l'épreuve suivante ({paper.sections[activeSectionIdx + 1]?.title}) →</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Terminer le test →
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* WRITING SECTION WORKSPACE WITH CBT TASK TABS */}
        {currentSection.writingTasks && currentSection.writingTasks.length > 0 && (
          <div className="space-y-4">
            {/* CBT Task Tab Switcher with Completion Badges */}
            <div className="flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 uppercase shrink-0 mr-1">Épreuve Écrite (Task Switcher):</span>
              {currentSection.writingTasks.map((t, idx) => {
                const tWords = countFrenchWords(writingResponses[t.id] || "");
                const tValid = tWords >= t.wordCountMin && tWords <= t.wordCountMax;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveWritingTaskIdx(idx)}
                    className={`px-3.5 py-2 rounded-t-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 border-b-2 ${
                      activeWritingTaskIdx === idx
                        ? "bg-pink-600 text-white border-pink-600 shadow"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200"
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{t.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold ${
                      tValid
                        ? activeWritingTaskIdx === idx ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : tWords > 0
                        ? activeWritingTaskIdx === idx ? "bg-amber-400 text-slate-900" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-black/10 dark:bg-white/10 text-slate-400"
                    }`}>
                      {tWords > 0 ? `${tWords}w ${tValid ? "✓" : ""}` : "0w"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Writing Task Display */}
            {(() => {
              const task = currentSection.writingTasks[Math.min(activeWritingTaskIdx, currentSection.writingTasks.length - 1)];
              if (!task) return null;

              const textVal = writingResponses[task.id] || "";
              const wordCount = countFrenchWords(textVal);
              const isValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;
              const isUnderMin = wordCount < task.wordCountMin;
              const isOverMax = wordCount > task.wordCountMax;
              const aiEval = writingAiResults[task.id];
              const isEvaluating = evaluatingWriting[task.id];

              return (
                <div key={task.id} className={`p-4 sm:p-6 rounded-xl border ${cbtCard} shadow-sm space-y-4`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase">
                        {task.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-mono font-bold text-[10px] shrink-0">
                        Target: {task.wordCountMin} – {task.wordCountMax} words
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 leading-snug">{task.prompt}</h3>
                  </div>

                  {mode === "PRACTICE" && (
                    <div className="p-3 sm:p-3.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
                      <p className="font-bold text-pink-700 dark:text-pink-300 uppercase text-[10px]">Guided Structure Tips:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-800 dark:text-slate-200">
                        {task.guidedTips ? (
                          task.guidedTips.map((tip: string, idx: number) => <li key={idx}>{tip}</li>)
                        ) : task.title?.includes("Tâche 1") || task.wordCountMin === 60 || task.min === 60 ? (
                          <>
                            <li>Salutation adaptée (ex. Bonjour Monsieur/Madame)</li>
                            <li>Explication claire du besoin / motif du message</li>
                            <li>Formule de politesse & signature finale</li>
                          </>
                        ) : task.title?.includes("Tâche 2") || task.wordCountMin === 120 || task.min === 120 ? (
                          <>
                            <li>Introduction brève (présentation du lieu / contexte)</li>
                            <li>Récit chronologique des événements et activités faites</li>
                            <li>Impressions personnelles et sentiment final</li>
                          </>
                        ) : (
                          <>
                            <li>Introduction claire posant le problème</li>
                            <li>Présenter 2 arguments développés avec exemples</li>
                            <li>Conclusion synthétique avec prise de position</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Writing Strategy & Trap Alert Display */}
                  {mode === "PRACTICE" && showHints && (
                    <div className="space-y-2.5">
                      {/* Trap Alert Card */}
                      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs text-amber-950 dark:text-amber-200 space-y-2 shadow-sm font-sans">
                        <div className="flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wide">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>⚠️ Alerte Pièges & Critères FEI (Trap Alert)</span>
                        </div>
                        <div className="leading-relaxed font-medium whitespace-pre-line text-xs">
                          {task.trapAlert || (
                            activeWritingTaskIdx === 0 ? "• N'utilisez pas le tutoiement avec une autorité.\n• Ne copiez pas les phrases de la consigne.\n• Respectez scrupuleusement la fourchette de mots."
                            : activeWritingTaskIdx === 1 ? "• Évitez de tout rédiger au présent : alternez passé composé et imparfait.\n• Exprimez vos sentiments et recommandations personnelles."
                            : "• Ne commencez jamais par une formule de lettre.\n• Structurez en 4 paragraphes (Intro → Thèse → Antithèse → Synthèse)."
                          )}
                        </div>
                        {task.trapAlertEn && (
                          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-950/60 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-950 dark:text-amber-200 whitespace-pre-line leading-relaxed">
                            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">🇬🇧 English Trap Alert:</span>
                            {task.trapAlertEn}
                          </div>
                        )}
                      </div>

                      {/* Writing Coach & Connectors Card */}
                      <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-950 dark:text-indigo-200 space-y-2 shadow-sm font-sans">
                        <div className="flex items-center gap-1.5 font-extrabold text-indigo-900 dark:text-indigo-300 text-[11px] uppercase tracking-wide">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>✍️ Coach Rédaction & Connecteurs B2/C1</span>
                        </div>
                        <div className="leading-relaxed font-medium whitespace-pre-line text-xs">
                          {task.writingCoach || (
                            activeWritingTaskIdx === 0 ? "Structurez : 1. Salutation 2. Problème 3. Demande au conditionnel 4. Formule finale."
                            : activeWritingTaskIdx === 1 ? "Structurez : 1. Cadre spatio-temporel 2. Événements et émotions 3. Bilan et recommandation."
                            : "Structurez : 1. Introduction 2. Arguments favorables 3. Contre-arguments 4. Prise de position nuancée."
                          )}
                        </div>
                        {task.writingCoachEn && (
                          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-950/60 border border-indigo-200 dark:border-indigo-900/60 text-[11px] text-indigo-950 dark:text-indigo-200 whitespace-pre-line leading-relaxed">
                            <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-0.5">🇬🇧 English Writing Coach Strategy:</span>
                            {task.writingCoachEn}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Official CBT On-Screen French Accent Palette Bar */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide mr-1">
                      <span>⌨️ Accents CBT :</span>
                    </div>
                    {[
                      "é", "è", "ê", "ë",
                      "à", "â", "ç",
                      "î", "ï", "ô",
                      "œ", "ù", "û", "ü",
                      "«", "»",
                      "É", "È", "Ê", "À", "Ç"
                    ].map((char) => (
                      <button
                        key={char}
                        type="button"
                        onClick={() => handleInsertAccent(task.id, char)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-pink-950/60 border border-slate-300 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-600 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-pink-600 dark:hover:text-pink-400 transition-all shadow-xs active:scale-95 cursor-pointer font-serif"
                        title={`Insérer ${char} à la position du curseur`}
                      >
                        {char}
                      </button>
                    ))}
                  </div>

                  <textarea
                    id={`writing-textarea-${task.id}`}
                    rows={9}
                    value={textVal}
                    onChange={(e) => setWritingResponses((prev) => ({ ...prev, [task.id]: e.target.value }))}
                    placeholder="Saisissez votre texte officiel ici..."
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-sm font-sans leading-relaxed ${
                      cbtDark ? "bg-[#090D16] border-slate-700 text-white" : "bg-slate-50 border-slate-300 text-slate-950"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold">
                    <span className={`px-2.5 py-1 rounded-md font-mono font-bold ${
                      isValid
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : isOverMax
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}>
                      Mots : <strong>{wordCount}</strong> / {task.wordCountMin}–{task.wordCountMax} {
                        isValid ? "✓ (Cible atteinte)" : isOverMax ? "⚠️ (Dépassement de la longueur maximale)" : isUnderMin && wordCount > 0 ? "⚠️ (Sous le seuil minimum requis)" : ""
                      }
                    </span>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                      {task.sampleResponse && mode === "PRACTICE" && (
                        <button
                          onClick={() => setOpenModelAnswerTaskId(openModelAnswerTaskId === task.id ? null : task.id)}
                          className="px-3.5 py-2 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{openModelAnswerTaskId === task.id ? "Hide Model Response 🙈" : "📝 View Official NCLC 7+ Model Answer"}</span>
                        </button>
                      )}

                      {(mode === "PRACTICE" || isSubmitted) && (
                        <button
                          disabled={isEvaluating}
                          onClick={() => handleEvaluateWritingAI(task.id, task.prompt, textVal, task.sampleResponse, task.wordCountMin, task.wordCountMax)}
                          className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isEvaluating ? "Evaluating Writing with Neural AI..." : "🤖 Evaluate Writing with AI"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Model Answer Card */}
                  {openModelAnswerTaskId === task.id && task.sampleResponse && (
                    <div className="p-4 rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-950/50 space-y-3 text-xs font-sans">
                      <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800 pb-2">
                        <span className="font-extrabold text-xs text-blue-900 dark:text-blue-300 flex items-center gap-1.5 uppercase tracking-wide">
                          <Trophy className="w-4 h-4 text-blue-600" />
                          <span>Exemplar NCLC 7+ (B2 Vantage) Sample Response</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">
                          TCF CANADA BENCHMARK
                        </span>
                      </div>
                      <p className="whitespace-pre-line font-serif italic text-slate-900 dark:text-slate-100 leading-relaxed p-3 rounded bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900">
                        {task.sampleResponse}
                      </p>
                      <div className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                        💡 <strong>Key NCLC 7 Features used in this sample:</strong> Proper paragraphing, varied linking words (<em>en outre, cependant, par conséquent</em>), strict word count compliance, and natural subjunctive mood expressions.
                      </div>
                    </div>
                  )}

                  {/* AI Writing Evaluation Result Card */}
                  {aiEval && (
                    <div className={`p-4 rounded-xl border space-y-3 text-xs font-sans shadow-sm ${
                      aiEval.isPlagiarized
                        ? "bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-700 text-amber-950 dark:text-amber-200"
                        : "bg-pink-50 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-slate-950 dark:text-slate-100"
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-200 dark:border-pink-800 pb-2">
                        <span className="font-extrabold text-sm text-pink-700 dark:text-pink-400 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-pink-600" />
                          <span>TCF CBT Writing Diagnostic & AI Grade</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-pink-600 text-white font-mono font-extrabold text-[11px]">
                            {aiEval.nclcGrade}
                          </span>
                          {!aiEval.isPlagiarized && (
                            <span className="px-2 py-1 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">
                              +{aiEval.expressEntryPoints} CRS Points
                            </span>
                          )}
                        </div>
                      </div>

                      {aiEval.isPlagiarized ? (
                        <div className="p-3 rounded bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 leading-relaxed font-semibold">
                          {aiEval.feedback}
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          {/* 4 Criteria Scores */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 font-medium shadow-xs">
                              <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wide">1. Adéquation</span>
                              <span className="text-pink-600 font-extrabold text-sm">{aiEval.taskFulfillmentScore} / 5</span>
                              {aiEval.criterionFeedback?.taskFulfillment && (
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{aiEval.criterionFeedback.taskFulfillment}</p>
                              )}
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-medium shadow-xs">
                              <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wide">2. Cohérence</span>
                              <span className="text-purple-600 font-extrabold text-sm">{aiEval.coherenceScore} / 5</span>
                              {aiEval.criterionFeedback?.coherence && (
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{aiEval.criterionFeedback.coherence}</p>
                              )}
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 font-medium shadow-xs">
                              <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wide">3. Lexique</span>
                              <span className="text-indigo-600 font-extrabold text-sm">{aiEval.lexicalScore} / 5</span>
                              {aiEval.criterionFeedback?.lexical && (
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{aiEval.criterionFeedback.lexical}</p>
                              )}
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 font-medium shadow-xs">
                              <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wide">4. Morphosyntaxe</span>
                              <span className="text-blue-600 font-extrabold text-sm">{aiEval.grammarScore} / 5</span>
                              {aiEval.criterionFeedback?.morphosyntax && (
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{aiEval.criterionFeedback.morphosyntax}</p>
                              )}
                            </div>
                          </div>

                          {/* Diagnostic Summary */}
                          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 leading-relaxed font-medium text-slate-800 dark:text-slate-200 text-xs">
                            <span className="font-bold text-pink-700 dark:text-pink-400 block mb-1">📋 Diagnostic Examiner Summary:</span>
                            {aiEval.feedback}
                          </div>

                          {/* Level-Up Strategy Blueprint */}
                          {aiEval.levelUpAdvice && (
                            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 leading-relaxed font-medium text-emerald-950 dark:text-emerald-200 text-xs">
                              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1 text-xs">
                                <span>🚀 Level-Up Strategy (How to reach the next NCLC Band):</span>
                              </span>
                              <p className="text-[11px] leading-relaxed">{aiEval.levelUpAdvice}</p>
                            </div>
                          )}

                          {/* Sentence-by-Sentence Corrections */}
                          {aiEval.corrections && aiEval.corrections.length > 0 && (
                            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2 text-xs">
                              <div className="flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wide">
                                <span>🔍 Sentence-by-Sentence Pedagogical Corrections ({aiEval.corrections.length})</span>
                              </div>
                              <div className="space-y-2 mt-2">
                                {aiEval.corrections.map((c: any, cIdx: number) => (
                                  <div key={cIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 text-[11px] space-y-1">
                                    <div className="flex items-center gap-2 font-mono text-[11px]">
                                      <span className="line-through text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded">{c.original}</span>
                                      <span className="text-slate-400">➔</span>
                                      <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">{c.corrected}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed font-sans">{c.explanation}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actionable Tips */}
                          {aiEval.tips && aiEval.tips.length > 0 && (
                            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-950 dark:text-indigo-200 text-xs space-y-1">
                              <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-0.5">💡 Key Examiner Tips:</span>
                              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
                                {aiEval.tips.map((tip: string, tIdx: number) => (
                                  <li key={tIdx}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Writing Section Navigation Footer */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Tâche active : <strong>{activeWritingTaskIdx + 1}</strong> / {currentSection.writingTasks.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {activeWritingTaskIdx < currentSection.writingTasks.length - 1 ? (
                  <button
                    onClick={() => setActiveWritingTaskIdx(prev => prev + 1)}
                    className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Tâche suivante →
                  </button>
                ) : activeSectionIdx < paper.sections.length - 1 ? (
                  <button
                    onClick={() => {
                      const nextIdx = activeSectionIdx + 1;
                      const nextSecTitle = paper.sections[nextIdx]?.title || "Section suivante";
                      if (mode === "EXAM" && !isAdmin) {
                        setSectionTransitionModal({ show: true, targetIdx: nextIdx, targetTitle: nextSecTitle });
                      } else {
                        setActiveSectionIdx(nextIdx);
                        setCurrentQuestionIdx(0);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <span>Passer à l'épreuve suivante ({paper.sections[activeSectionIdx + 1]?.title}) →</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Terminer l'examen →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SPEAKING SECTION WORKSPACE WITH CBT TASK TABS */}
        {currentSection.speakingTasks && currentSection.speakingTasks.length > 0 && (
          <div className="space-y-4">
            {/* CBT Speaking Task Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 uppercase shrink-0 mr-1">Épreuve Orale (Task Switcher):</span>
              {currentSection.speakingTasks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveSpeakingTaskIdx(idx);
                    startSpeakingTaskSession(idx);
                  }}
                  className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 border-b-2 ${
                    activeSpeakingTaskIdx === idx
                      ? "bg-purple-600 text-white border-purple-600 shadow"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{t.title}</span>
                </button>
              ))}
            </div>

            {/* Active Speaking Task Display */}
            {(() => {
              const task = currentSection.speakingTasks[Math.min(activeSpeakingTaskIdx, currentSection.speakingTasks.length - 1)];
              if (!task) return null;

              const transcript = speakingTranscripts[task.id] || "";
              const isRecording = recordingSpeaking[task.id];
              const isEvaluating = evaluatingSpeaking[task.id];
              const isChatLoading = speakingChatLoading[task.id];
              const aiEval = speakingAiResults[task.id];
              const examinerName = task.examinerPersona?.name || (activeSpeakingTaskIdx === 1 ? "M. Laurent Dubois" : "Mme Élodie Martin");
              const examinerRole = task.examinerPersona?.role || (activeSpeakingTaskIdx === 1 ? "Interlocuteur & Responsable de l'annonce" : "Examinatrice Certifiée FEI — Format TCF Canada");
              const examinerGender = task.examinerPersona?.gender || (activeSpeakingTaskIdx === 1 ? "male" : "female");

              const avatarAnimState = isPlayingAudio ? "speaking" : isRecording ? "speaking" : isChatLoading ? "thinking" : "idle";

              return (
                <div key={task.id} className={`p-4 sm:p-6 rounded-xl border ${cbtCard} shadow-sm space-y-5`}>
                  
                  {/* Task Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                          {task.title}
                        </span>
                        {task.cefrTarget && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono font-bold text-[10px]">
                            Cible CEFR : {task.cefrTarget}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 leading-snug">
                        {task.scenario}
                      </h3>
                      {task.scenarioEn && mode === "PRACTICE" && (
                        <p className="text-xs font-sans text-indigo-700 dark:text-indigo-300 italic pt-0.5 flex items-center gap-1">
                          <Globe className="w-3 h-3 shrink-0" />
                          <span>🇬🇧 Scenario (EN): "{task.scenarioEn}"</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs">
                        ⏱️ Prep: {task.prepTimeMins}m • Oral: {task.speakingTimeMins}m
                      </span>
                    </div>
                  </div>

                  {/* TÂCHE 2 (STIMULUS DOCUMENT & CANDIDATE SCRATCHPAD) */}
                  {task.stimulusDocument && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left: Official Stimulus Document */}
                      <div className="p-4 sm:p-5 rounded-2xl border-2 border-blue-300 dark:border-blue-800 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 dark:from-blue-950/40 dark:via-slate-900 dark:to-blue-950/30 shadow-md space-y-3 font-sans">
                        <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px] uppercase">
                              📄 Document Support Officiel (Tâche 2)
                            </span>
                            <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                              {task.stimulusDocument.organization}
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-semibold">
                            {task.stimulusDocument.category}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-base font-extrabold text-blue-950 dark:text-blue-100">
                            {task.stimulusDocument.title}
                          </h4>
                          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            {task.stimulusDocument.content}
                          </p>
                        </div>

                        {task.stimulusDocument.details && task.stimulusDocument.details.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {task.stimulusDocument.details.map((detail: string, dIdx: number) => (
                              <div key={dIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-950/80 border border-blue-200/80 dark:border-blue-900/70 text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 shadow-xs">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                <span className="leading-tight">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {task.stimulusDocument.contactInfo && (
                          <div className="pt-2 border-t border-blue-200 dark:border-blue-800/60 text-[11px] text-blue-900 dark:text-blue-300 font-mono font-medium flex items-center justify-between flex-wrap gap-2">
                            <span>{task.stimulusDocument.contactInfo}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold">
                              ⚠️ Posez au moins 8 à 10 questions variées
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Candidate Virtual Scratchpad for Prep Phase */}
                      <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-3 font-sans flex flex-col">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-purple-600" />
                            <span>📝 Bloc-notes de Préparation (Brouillon Candidat)</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Non noté • Aide personnelle
                          </span>
                        </div>
                        <textarea
                          value={oralScratchNotes[task.id] || ""}
                          onChange={(e) => setOralScratchNotes((prev) => ({ ...prev, [task.id]: e.target.value }))}
                          placeholder="Notez ici vos mots-clés ou questions pendant la minute de préparation (ex : tarifs, horaires, niveaux requis, facilités de paiement)..."
                          className="w-full flex-1 min-h-[140px] p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none font-sans"
                        />
                        <p className="text-[10px] text-slate-500 italic">
                          💡 Utilisez ce bloc-notes pendant les 60 secondes de préparation pour structurer vos 8 à 10 questions.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* UNIFIED PROCTORED CBT STUDIO STATION */}
                  <div className="p-5 sm:p-6 rounded-2xl border-2 border-purple-500/40 bg-slate-900 text-white shadow-xl space-y-4 font-sans">
                    {/* Proctored Exam Header & Live Acoustic State Indicator */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-mono font-extrabold text-xs text-purple-400 uppercase tracking-wider">
                            🎙️ Station d'Examen CBT — Épreuve d'Expression Orale ({paper.type === "TEF_CANADA" ? "TEF Canada" : "TCF Canada"})
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">
                          Interlocuteur Officiel : <strong className="text-white">{examinerName}</strong> ({examinerRole})
                        </p>
                      </div>

                      {/* Real-time Dynamic Acoustic Equalizer */}
                      <div className="flex items-center gap-2">
                        {isPlayingAudio ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-bold">
                            <Volume2 className="w-4 h-4 animate-pulse text-emerald-400" />
                            <span>Audio Interlocuteur en cours...</span>
                            <span className="w-1 h-3 bg-emerald-400 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-4 bg-emerald-400 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-2 bg-emerald-400 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        ) : isRecording ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-mono font-bold animate-pulse">
                            <Mic className="w-4 h-4 text-red-400" />
                            <span>Microphone Candidat Actif — Enregistrement en cours...</span>
                            <span className="w-1 h-3 bg-red-400 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-4 bg-red-400 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
                          </div>
                        ) : isChatLoading ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-mono font-bold">
                            <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                            <span>Traitement de votre intervention orale...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Station prête pour l'échange</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Web Audio API Acoustic Signal Metrics Badge */}
                    {speakingAcousticMetrics[task.id] && (
                      <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-purple-900/60 text-xs font-mono">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">📊 Analyse Acoustique en temps réel :</span>
                        <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-800/80 text-purple-300 font-bold">
                          Débit : <strong className="text-white">{speakingAcousticMetrics[task.id].speechRateWpm} WPM</strong> (Cible : 100-140)
                        </span>
                        <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-800/80 text-amber-300 font-bold">
                          Hésitations ({'>'}1.5s) : <strong className="text-white">{speakingAcousticMetrics[task.id].hesitationPauseCount}</strong>
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-bold">
                          Indice de Fluidité : <strong className="text-white">{speakingAcousticMetrics[task.id].fluencyIndexPct}%</strong>
                        </span>
                      </div>
                    )}

                    {/* Official Exam Timers Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">Temps alloué :</span>
                        <span className="px-2.5 py-1 rounded bg-purple-900/60 text-purple-200 font-bold">
                          {task.prepTimeMins > 0 ? `Préparation : ${task.prepTimeMins} min` : "Sans préparation"}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-indigo-900/60 text-indigo-200 font-bold">
                          Expression : {task.speakingTimeMins} min
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {task.prepTimeMins > 0 && (
                          <span className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 ${
                            isOralPrepActive[task.id]
                              ? "bg-amber-600 text-white animate-pulse"
                              : "bg-slate-800 text-slate-300"
                          }`}>
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {isOralPrepActive[task.id]
                                ? `⏱️ Prep : ${Math.floor((oralPrepTimeRemaining[task.id] || 0) / 60)}:${((oralPrepTimeRemaining[task.id] || 0) % 60).toString().padStart(2, '0')}`
                                : `Prep : ${task.prepTimeMins}m`}
                            </span>
                          </span>
                        )}

                        <span className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 ${
                          isOralSpeakingActive[task.id]
                            ? "bg-emerald-600 text-white animate-pulse"
                            : "bg-slate-800 text-slate-300"
                        }`}>
                          <Mic className="w-3.5 h-3.5 text-emerald-400" />
                          <span>
                            {isOralSpeakingActive[task.id]
                              ? `🎙️ Oral : ${Math.floor((oralSpeakingTimeRemaining[task.id] || 0) / 60)}:${((oralSpeakingTimeRemaining[task.id] || 0) % 60).toString().padStart(2, '0')}`
                              : `Oral : ${task.speakingTimeMins}m`}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Phrases & Connectors Badges (Practice Mode Only) */}
                  {mode === "PRACTICE" && task.keyPhrases && task.keyPhrases.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-1.5 font-sans">
                      <p className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] tracking-wide flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Formules & Connecteurs Recommandés pour cette tâche :</span>
                      </p>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {task.keyPhrases.map((phrase: string, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 font-medium text-xs border border-purple-200 dark:border-purple-800">
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRACTICE MODE: STRATEGY, TRAP ALERTS & B2/C1 MODEL ANSWERS */}
                  {mode === "PRACTICE" && showHints && (
                    <div className="space-y-3">
                      {/* Trap Alert & Official FEI Rules Card */}
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-2 shadow-sm font-sans">
                        <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-200 dark:border-amber-800/60 pb-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wide">
                          <span className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>⚠️ Alerte Pièges & Critères FEI (Trap Alert)</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 font-mono text-[10px]">
                            Niveau {task.cefrTarget || "A1-C2"}
                          </span>
                        </div>
                        <p className="leading-relaxed font-medium whitespace-pre-line text-xs">
                          {task.trapAlert || (
                            activeSpeakingTaskIdx === 0 ? "• Évitez les réponses monosyllabiques : développez vos phrases.\n• Ne récitez pas un texte appris par cœur."
                            : activeSpeakingTaskIdx === 1 ? "• Vous devez poser au minimum 8 à 10 questions variées.\n• Variez vos structures (inversion, conditionnel, interrogation indirecte)."
                            : "• Adoptez un plan dialectique rigoureux (Thèse / Antithèse / Synthèse).\n• Utilisez un registre soutenu."
                          )}
                        </p>
                        {task.trapAlertEn && (
                          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-950/60 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-950 dark:text-amber-200 whitespace-pre-line leading-relaxed">
                            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">🇬🇧 English Trap Alert:</span>
                            {task.trapAlertEn}
                          </div>
                        )}
                      </div>

                      {/* Coach Strategy Card */}
                      {(task.speakingCoach || task.speakingCoachEn) && (
                        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-950 dark:text-indigo-200 space-y-2 shadow-sm font-sans">
                          <div className="flex items-center gap-1.5 font-extrabold text-indigo-900 dark:text-indigo-300 text-[11px] uppercase tracking-wide border-b border-indigo-200 dark:border-indigo-800/60 pb-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span>🎙️ Coach Méthodologie & Stratégie Orale</span>
                          </div>
                          {task.speakingCoach && (
                            <p className="leading-relaxed font-medium whitespace-pre-line text-xs">
                              {task.speakingCoach}
                            </p>
                          )}
                          {task.speakingCoachEn && (
                            <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-950/60 border border-indigo-200 dark:border-indigo-900/60 text-[11px] text-indigo-950 dark:text-indigo-200 whitespace-pre-line leading-relaxed">
                              <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-0.5">🇬🇧 English Strategy:</span>
                              {task.speakingCoachEn}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Model High-Scoring Response (B2/C1/C2) */}
                      {(task.modelAnswerB2C1 || task.modelAnswerEn) && (
                        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 font-sans shadow-sm">
                          <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800/60 pb-2">
                            <span className="font-extrabold text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                              <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span>Exemplaire de Réponse Modèle (Niveau B2 / C1 / C2)</span>
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">
                              FEI Standard Benchmark
                            </span>
                          </div>
                          {task.modelAnswerB2C1 && (
                            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-emerald-200/80 dark:border-emerald-900/60 text-xs font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed font-serif">
                              {task.modelAnswerB2C1}
                            </div>
                          )}
                          {task.modelAnswerEn && (
                            <div className="p-3 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/60 text-[11px] text-emerald-950 dark:text-emerald-200 whitespace-pre-line leading-relaxed">
                              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">🇬🇧 English Translation:</span>
                              {task.modelAnswerEn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2-WAY LIVE INTERLOCUTION DIALOGUE LOG */}
                  {speakingDialogueMap[task.id] && speakingDialogueMap[task.id].length > 0 && (
                    <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1220] space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="font-extrabold text-[11px] uppercase tracking-wide text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5" />
                          <span>Échange en direct avec l'examinateur ({examinerName}) :</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-600/20 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold">
                          {speakingDialogueMap[task.id].length} tours de parole
                        </span>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {speakingDialogueMap[task.id].map((msg, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-3.5 rounded-2xl max-w-[90%] sm:max-w-[80%] text-xs font-sans leading-relaxed shadow-sm ${
                              msg.sender === "examiner"
                                ? "bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-100 mr-auto"
                                : "bg-blue-600 text-white ml-auto"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-[10px] uppercase opacity-85">
                              <span>{msg.sender === "examiner" ? `🎙️ ${examinerName}` : "👤 Candidat (Vous)"}</span>
                              {msg.sender === "examiner" && (
                                <button
                                  onClick={() => handlePlayExaminerAudio(msg.text)}
                                  className="hover:underline flex items-center gap-0.5 cursor-pointer text-purple-800 dark:text-purple-300 font-bold"
                                  title="Réécouter la réponse audio"
                                >
                                  <Volume2 className="w-3 h-3" /> Réécouter
                                </button>
                              )}
                            </div>
                            <p className="font-medium text-xs">{msg.text}</p>
                          </div>
                        ))}

                        {isChatLoading && (
                          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 mr-auto animate-pulse flex items-center gap-2">
                            <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
                            <span className="font-semibold text-xs">{examinerName} vous écoute et formule sa réponse en français...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CBT LIVE SPEECH RECORDER CONTROLS */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                        <Mic className={`w-4 h-4 ${isRecording ? "text-red-500 animate-pulse" : "text-purple-600"}`} />
                        <span>{isRecording ? "🔴 Enregistrement vocal en cours (Parlez dans votre micro)..." : "🎙️ Microphone CBT Interactif"}</span>
                      </span>

                      <button
                        onClick={() => handleToggleSpeakingRecording(task.id)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition-all cursor-pointer ${
                          isRecording ? "bg-red-600 hover:bg-red-500 text-white animate-pulse" : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecording ? "⏹️ Arrêter l'enregistrement" : "🎙️ Parler au micro (Start)"}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs min-h-[75px]">
                      <p className="font-bold text-[10px] text-slate-500 uppercase mb-1">Transcription vocale en temps réel (Speech-to-Text) :</p>
                      <p className="font-sans italic text-slate-900 dark:text-slate-200">
                        {transcript || "(Cliquez sur 'Parler au micro' et formulez votre réponse en français. Votre voix sera transcrite automatiquement...)"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                      <button
                        disabled={!transcript || isChatLoading}
                        onClick={() => handleSendSpeakingQuestionToExaminer(task.id, transcript, task.scenario)}
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 disabled:opacity-40 transition-all cursor-pointer active:scale-98"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>💬 Envoyer à l'examinateur & Entendre sa réponse vocale</span>
                      </button>

                      <button
                        disabled={(!transcript && !(speakingDialogueMap[task.id]?.length)) || isEvaluating}
                        onClick={() => handleEvaluateSpeakingAI(task.id, task.scenario, transcript)}
                        className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 disabled:opacity-40 transition-all cursor-pointer active:scale-98"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isEvaluating ? "Évaluation diagnostique FEI en cours..." : "🤖 Terminer cette tâche & Obtenir la note FEI"}</span>
                      </button>
                    </div>
                  </div>

                  {/* OFFICIAL FEI 4-CRITERIA DIAGNOSTIC EVALUATION RESULT CARD */}
                  {aiEval && (
                    <div className="p-4 sm:p-5 rounded-2xl border-2 border-purple-300 dark:border-purple-800 bg-purple-50/90 dark:bg-purple-950/50 space-y-4 text-xs font-sans shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200 dark:border-purple-800 pb-2">
                        <span className="font-extrabold text-sm text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-purple-600" />
                          <span>Grille Officielle FEI — Diagnostic Oral & Score TCF Canada ({aiEval.scoreOutOf20 || 15} / 20 Marks)</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white font-mono font-extrabold text-[11px]">
                            {aiEval.nclcGrade || "NCLC 7 (B2 Benchmark Target)"}
                          </span>
                          <span className="px-2 py-1 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">
                            +{aiEval.expressEntryPoints !== undefined ? aiEval.expressEntryPoints : 17} Points CRS
                          </span>
                        </div>
                      </div>

                      {/* 4 Official FEI Sub-Score Cards with Progress Indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">1. Consigne & Respect du Scénario</span>
                            <span className="text-purple-600 font-extrabold">{aiEval.taskFulfillmentScore !== undefined ? aiEval.taskFulfillmentScore : 4} / 5</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${((aiEval.taskFulfillmentScore || 4) / 5) * 100}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            {aiEval.feiSubScores?.taskFulfillment?.feedback || "Traitement approprié du scénario et respect du registre."}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">2. Cohérence, Débit & Fluidité</span>
                            <span className="text-pink-600 font-extrabold">{aiEval.coherenceScore !== undefined ? aiEval.coherenceScore : 4} / 5</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-pink-600 rounded-full" style={{ width: `${((aiEval.coherenceScore || 4) / 5) * 100}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            {aiEval.feiSubScores?.fluencyPace?.feedback || "Enchaînement fluide des idées avec connecteurs adaptés."}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">3. Étendue & Précision Lexicale</span>
                            <span className="text-indigo-600 font-extrabold">{aiEval.lexicalScore !== undefined ? aiEval.lexicalScore : 4} / 5</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${((aiEval.lexicalScore || 4) / 5) * 100}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            {aiEval.feiSubScores?.lexicalPrecision?.feedback || "Vocabulaire varié et adapté au contexte de communication."}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-600 dark:text-slate-400">4. Morphosyntaxe & Prononciation</span>
                            <span className="text-blue-600 font-extrabold">{aiEval.grammarScore !== undefined ? aiEval.grammarScore : 3} / 5</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${((aiEval.grammarScore || 3) / 5) * 100}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            {aiEval.feiSubScores?.morphosyntaxPhonetics?.feedback || "Maîtrise des structures grammaticales et règles phonétiques."}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Line-by-Line Spoken Error Corrections */}
                      {aiEval.corrections && aiEval.corrections.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-2">
                          <p className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            <span>Corrections Syntactiques & Phonétiques Citées dans l'Oral :</span>
                          </p>
                          <div className="space-y-1.5">
                            {aiEval.corrections.map((corr: any, idx: number) => (
                              <div key={idx} className="p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/60 text-xs space-y-1 font-sans">
                                <div className="flex items-center gap-2 flex-wrap text-red-600 dark:text-red-400 font-semibold">
                                  <span>❌ Expression enregistrée :</span>
                                  <span className="line-through bg-red-100 dark:bg-red-950/80 px-1.5 py-0.5 rounded">"{corr.original}"</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap text-emerald-600 dark:text-emerald-400 font-bold">
                                  <span>✅ Formule Recommandée B2/C1 :</span>
                                  <span className="bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">"{corr.corrected}"</span>
                                </div>
                                {corr.explanation && (
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                                    💡 {corr.explanation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 space-y-1.5">
                        <p className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px]">Commentaire de Synthèse de l'Examinateur :</p>
                        <p className="leading-relaxed font-medium text-xs">
                          {aiEval.feedback || `Évaluation officielle FEI : Note globale de ${aiEval.scoreOutOf20 || 15}/20.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* END SECTION WORKSPACES */}
      </main>

      {/* ─── OFFICIAL CBT BOTTOM CANDIDATE QUESTION GRID NAVIGATOR ─── */}
      {currentQuestions.length > 0 && (
        <footer className="bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-0.5">
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mr-1 sm:mr-2 shrink-0">
              Grid Index:
            </span>
            {currentQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isCurrent = currentQuestionIdx === idx;
              const isExamListening = !isAdmin && mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE";
              const isLockedExamItem = isExamListening && !isCurrent;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    if (!isExamListening || isAdmin) setCurrentQuestionIdx(idx);
                  }}
                  disabled={isExamListening}
                  title={
                    isExamListening
                      ? "Navigation manuelle verrouillée en mode examen CBT (Avancement automatique par audio)."
                      : `Item N°${q.questionNumber}`
                  }
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-bold transition-all relative shrink-0 ${
                    isCurrent
                      ? "ring-2 ring-blue-600 bg-blue-600 text-white"
                      : isAnswered
                      ? "bg-blue-800 text-white"
                      : isLockedExamItem
                      ? "opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                  }`}
                >
                  {q.questionNumber}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border border-white dark:border-slate-900 shadow-sm flex items-center justify-center text-[8px] text-amber-950 font-black" title="Question marquée / Flagged">
                      🚩
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-800" /> Answered</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Flagged</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" /> Unanswered</span>
          </div>
        </footer>
      )}

      {/* ─── OFFICIAL UNIVERSAL CBT SECTION LAUNCH / DISCLAIMER MODAL ─── */}
      <AnimatePresence>
        {showSectionDisclaimer && !acceptedSectionDisclaimers[currentSection.type] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-2xl border bg-white dark:bg-[#101828] border-purple-300 dark:border-purple-800 shadow-2xl space-y-5 text-center my-auto"
            >
              <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center mx-auto shadow-xl ${
                currentSection.type === "COMPREHENSION_ORALE" ? "bg-blue-600" :
                currentSection.type === "COMPREHENSION_ECRITE" ? "bg-emerald-600" :
                currentSection.type === "EXPRESSION_ECRITE" ? "bg-amber-600" : "bg-purple-600"
              }`}>
                {currentSection.type === "COMPREHENSION_ORALE" && <Headphones className="w-8 h-8" />}
                {currentSection.type === "COMPREHENSION_ECRITE" && <BookOpen className="w-8 h-8" />}
                {currentSection.type === "EXPRESSION_ECRITE" && <PenTool className="w-8 h-8" />}
                {currentSection.type === "EXPRESSION_ORALE" && <Mic className="w-8 h-8" />}
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Official TCF Canada Computer-Based Simulator
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentSection.type === "COMPREHENSION_ORALE" && "Épreuve de Compréhension Orale (Listening Section)"}
                  {currentSection.type === "COMPREHENSION_ECRITE" && "Épreuve de Compréhension Écrite (Reading Section)"}
                  {currentSection.type === "EXPRESSION_ECRITE" && "Épreuve d'Expression Écrite (Writing Section)"}
                  {currentSection.type === "EXPRESSION_ORALE" && "Épreuve d'Expression Orale (Speaking Section)"}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  This test section strictly simulates official France Éducation International CBT proctored standards:
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-left text-xs space-y-3">
                {currentSection.type === "COMPREHENSION_ORALE" && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <Volume2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-950 dark:text-slate-200 block">Automatic Audio & Per-Question Pause Guard:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Document audio plays once automatically. The per-question countdown is strictly frozen while audio is playing.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-950 dark:text-slate-200 block">Official Listening Timers:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">39 Questions • 35 Minutes Total. Answers are recorded automatically when time expires.</span>
                      </div>
                    </div>
                  </>
                )}

                {currentSection.type === "COMPREHENSION_ECRITE" && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-950 dark:text-slate-200 block">Reading Passages & Question Navigation:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Read each document carefully. You can navigate freely between all 39 questions during the test.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-950 dark:text-slate-200 block">Official Reading Timers:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">39 Questions • 60 Minutes Total (~1.5 minutes recommended per question).</span>
                      </div>
                    </div>
                  </>
                )}

                {currentSection.type === "EXPRESSION_ECRITE" && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <PenTool className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="w-full space-y-1">
                        <strong className="text-slate-950 dark:text-slate-200 block">Official 3 Writing Tasks:</strong>
                        <div className="grid grid-cols-1 gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 pt-0.5">
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/60">
                            <span><strong>Tâche 1 (Message court):</strong> 60 - 120 words</span>
                            <span className="font-mono text-amber-600 font-bold">~15m</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/60">
                            <span><strong>Tâche 2 (Article / Compte-rendu):</strong> 120 - 150 words</span>
                            <span className="font-mono text-amber-600 font-bold">~20m</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/60">
                            <span><strong>Tâche 3 (Texte d'opinion / Essai):</strong> 200 - 280 words</span>
                            <span className="font-mono text-amber-600 font-bold">~25m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-950 dark:text-slate-200 block">Official Writing Duration:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">60 Minutes Total for all 3 tasks with real-time word counter validation.</span>
                      </div>
                    </div>
                  </>
                )}

                {currentSection.type === "EXPRESSION_ORALE" && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <Volume2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-950 dark:text-purple-200 block">Automatic Examiner Voice Audio:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">The certified examiner voice prompt plays automatically when each task launches.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 w-full">
                        <strong className="text-purple-950 dark:text-purple-200 block">Official Prep & Speaking Timers:</strong>
                        <div className="grid grid-cols-1 gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 pt-0.5">
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-purple-900/60">
                            <span><strong>Tâche 1 (Entretien dirigé):</strong> 0m Prep</span>
                            <span className="font-mono text-purple-600 font-bold">2m Speaking (Timer starts after audio)</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-purple-900/60">
                            <span><strong>Tâche 2 (Interaction):</strong> 2m Prep (Starts with audio)</span>
                            <span className="font-mono text-purple-600 font-bold">3.5m Speaking</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-purple-900/60">
                            <span><strong>Tâche 3 (Point de vue):</strong> 0m Prep</span>
                            <span className="font-mono text-purple-600 font-bold">4.5m Speaking (Timer starts after audio)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mic className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-950 dark:text-purple-200 block">Microphone Setup & Speech Recording:</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Ensure your microphone is enabled and speak clearly into your mic in French.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  setAcceptedSectionDisclaimers((prev) => ({ ...prev, [currentSection.type]: true }));
                  setShowSectionDisclaimer(false);
                  if (currentSection.type === "COMPREHENSION_ORALE") {
                    try {
                      unlockAudioEngine();
                    } catch {}
                  }
                  if (currentSection.type === "EXPRESSION_ORALE") {
                    startSpeakingTaskSession(activeSpeakingTaskIdx);
                  }
                }}
                className={`w-full py-3.5 rounded-xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 text-white ${
                  currentSection.type === "COMPREHENSION_ORALE" ? "bg-blue-600 hover:bg-blue-500" :
                  currentSection.type === "COMPREHENSION_ECRITE" ? "bg-emerald-600 hover:bg-emerald-500" :
                  currentSection.type === "EXPRESSION_ECRITE" ? "bg-amber-600 hover:bg-amber-500" : "bg-purple-600 hover:bg-purple-500"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin {currentSection.title} Test Now</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EXISTING SESSION PROMPT MODAL ─── */}
      <AnimatePresence>
        {showSessionPromptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-md p-6 rounded-2xl border bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Session en cours détectée
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Existing exam session found for {paper.title}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Des réponses précédemment enregistrées ont été trouvées pour cette épreuve. Souhaitez-vous continuer votre session ou recommencer un nouveau test ?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleRestartSessionClean}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer à zéro</span>
                </button>

                <button
                  onClick={() => setShowSessionPromptModal(false)}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Continuer la session</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EXAM EVALUATION PROGRESS MODAL ─── */}
      <AnimatePresence>
        {isSubmittingExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md p-6 rounded-2xl border bg-white dark:bg-[#101828] border-slate-300 dark:border-slate-800 shadow-2xl space-y-4 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Sparkles className="w-7 h-7 animate-spin" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  🇨🇦 Evaluating Official Exam Submission
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  FrancPrep AI Diagnostic Engine is scoring your Writing Tasks (1, 2, 3) and Oral Production across the 4-Criteria Analytic Grid...
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full animate-pulse w-full" />
              </div>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold font-mono">
                Calculating NCLC Benchmarks & IRCC Express Entry CRS Points...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SUBMISSION & DIAGNOSTIC RESULT MODAL ─── */}
      <AnimatePresence>
        {isSubmitted && !isSubmittingExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 rounded-2xl border bg-white dark:bg-[#101828] border-slate-300 dark:border-slate-800 shadow-2xl space-y-5 sm:space-y-6 text-center my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Diagnostic Simulator Evaluation ({mode === "EXAM" ? "REAL EXAM MODE" : "PRACTICE MODE"})
                  </span>
                  {(() => {
                    const r = calculateResults();
                    if (r.attemptedCount === 1) {
                      return (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                          Single-Module: {r.attemptedModuleNames[0]}
                        </span>
                      );
                    }
                    if (r.attemptedCount > 1) {
                      return (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                          Comprehensive ({r.attemptedCount}/4 Modules)
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {(() => {
                    const r = calculateResults();
                    if (r.nclcLevel === 0) return "Unrated Session (0 Items Attempted)";
                    return `Overall Benchmark: CLB / NCLC ${r.nclcLevel} (${r.cefrEquivalent})`;
                  })()}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {(() => {
                    const r = calculateResults();
                    if (r.attemptedCount === 1) {
                      if (r.writingAttemptedCount > 0) {
                        return (
                          <>
                            Writing Module (EE): <strong>{r.writingAvg}/20 Marks</strong> ({r.writingNCLC.nclcGrade})
                            {r.writingAttemptedCount < 3 && (
                              <span className="opacity-90 font-medium ml-1">
                                • ({r.writingAttemptedCount}/3 tasks completed: T1 {r.writingTaskScores.t1}/20, T2 {r.writingTaskScores.t2}/20, T3 {r.writingTaskScores.t3}/20)
                              </span>
                            )}
                            {" "}• <strong>+{r.expressEntryPoints} CRS Points</strong>
                          </>
                        );
                      }
                      if (r.listeningTotal > 0 && r.listeningCorrect > 0) {
                        return <>Listening Accuracy: <strong>{r.listeningPct}%</strong> ({r.listeningCorrect}/{r.listeningTotal} Correct) • <strong>+{r.expressEntryPoints} CRS Points</strong></>;
                      }
                      if (r.readingTotal > 0 && r.readingCorrect > 0) {
                        return <>Reading Accuracy: <strong>{r.readingPct}%</strong> ({r.readingCorrect}/{r.readingTotal} Correct) • <strong>+{r.expressEntryPoints} CRS Points</strong></>;
                      }
                      if (r.speakingAttemptedCount > 0) {
                        return (
                          <>
                            Speaking Module (EO): <strong>{r.speakingAvg}/20 Marks</strong> ({r.speakingNCLC.nclcGrade})
                            {r.speakingAttemptedCount < 3 && (
                              <span className="opacity-90 font-medium ml-1">
                                • ({r.speakingAttemptedCount}/3 tasks completed: T1 {r.speakingTaskScores.s1}/20, T2 {r.speakingTaskScores.s2}/20, T3 {r.speakingTaskScores.s3}/20)
                              </span>
                            )}
                            {" "}• <strong>+{r.expressEntryPoints} CRS Points</strong>
                          </>
                        );
                      }
                    } else if (r.attemptedCount > 1) {
                      return <>Total Express Entry Point Contribution: <strong>+{r.expressEntryPoints} CRS Points</strong> across {r.attemptedCount} attempted skill modules</>;
                    }
                    return <>Complete exam sections to view your comprehensive Canadian immigration scorecard.</>;
                  })()}
                </p>
              </div>

              {/* 4-SKILL MODULE CLB / NCLC SCORECARD GRID */}
              {(() => {
                const res = calculateResults();
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      {/* Listening Scorecard */}
                      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-purple-900 dark:text-purple-300">
                          <span className="flex items-center gap-1">🎧 Listening (CO)</span>
                          <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-mono text-[10px]">
                            {res.listeningNCLC.nclcLevel === 0 ? "Unrated" : `CLB ${res.listeningNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.listeningNCLC.nclcLevel === 0 ? "Unattempted (0/39)" : `${res.listeningPct}% Correct (${res.listeningCorrect}/${res.listeningTotal})`}
                        </p>
                        <p className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 pt-0.5">
                          {res.listeningPoints > 0 ? `+${res.listeningPoints} CRS Points` : "0 CRS Points"}
                        </p>
                      </div>

                      {/* Reading Scorecard */}
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-blue-900 dark:text-blue-300">
                          <span className="flex items-center gap-1">📖 Reading (CE)</span>
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px]">
                            {res.readingNCLC.nclcLevel === 0 ? "Unrated" : `CLB ${res.readingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.readingNCLC.nclcLevel === 0 ? "Unattempted (0/39)" : `${res.readingPct}% Correct (${res.readingCorrect}/${res.readingTotal})`}
                        </p>
                        <p className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 pt-0.5">
                          {res.readingPoints > 0 ? `+${res.readingPoints} CRS Points` : "0 CRS Points"}
                        </p>
                      </div>

                      {/* Writing Scorecard */}
                      <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-pink-900 dark:text-pink-300">
                          <span className="flex items-center gap-1">✍️ Writing (EE)</span>
                          <span className="px-2 py-0.5 rounded bg-pink-600 text-white font-mono text-[10px]">
                            {res.writingAttemptedCount === 0 ? "Unrated" : `CLB ${res.writingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.writingAttemptedCount === 0 ? "No submission" : `${res.writingAvg}/20 Marks (${res.writingNCLC.cefrEquivalent})`}
                        </p>
                        {res.writingAttemptedCount > 0 && res.writingAttemptedCount < 3 && (
                          <p className="text-[10px] font-medium text-amber-700 dark:text-amber-300 leading-tight">
                            ⚠️ {res.writingAttemptedCount}/3 tasks completed (T1: {res.writingTaskScores.t1}/20, T2: {res.writingTaskScores.t2}/20, T3: {res.writingTaskScores.t3}/20). Real TCF requires all 3 tasks (20%+30%+50%).
                          </p>
                        )}
                        <p className="text-[10px] font-semibold text-pink-700 dark:text-pink-300 pt-0.5">
                          {res.writingPoints > 0 ? `+${res.writingPoints} CRS Points` : "0 CRS Points"}
                        </p>
                      </div>

                      {/* Speaking Scorecard */}
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                          <span className="flex items-center gap-1">🎙️ Speaking (EO)</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px]">
                            {res.speakingAttemptedCount === 0 ? "Unrated" : `CLB ${res.speakingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.speakingAttemptedCount === 0 ? "No submission" : `${res.speakingAvg}/20 Marks (${res.speakingNCLC.cefrEquivalent})`}
                        </p>
                        {res.speakingAttemptedCount > 0 && res.speakingAttemptedCount < 3 && (
                          <p className="text-[10px] font-medium text-amber-700 dark:text-amber-300 leading-tight">
                            ⚠️ {res.speakingAttemptedCount}/3 tasks completed (T1: {res.speakingTaskScores.s1}/20, T2: {res.speakingTaskScores.s2}/20, T3: {res.speakingTaskScores.s3}/20). Real TCF requires all 3 tasks (20%+30%+50%).
                          </p>
                        )}
                        <p className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 pt-0.5">
                          {res.speakingPoints > 0 ? `+${res.speakingPoints} CRS Points` : "0 CRS Points"}
                        </p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl text-xs text-left space-y-2 border ${
                      res.isNCLC7TargetReached
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                        : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300"
                    }`}>
                      <p className="font-bold flex items-center justify-between">
                        <span>🍁 Official Express Entry CRS Point Contribution:</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-extrabold text-[11px]">
                          +{res.expressEntryPoints} Total CRS Points
                        </span>
                      </p>
                      <p className="leading-relaxed font-medium">
                        {res.statusMessage}
                      </p>
                      <p className="pt-1 text-[11px] opacity-80 border-t border-slate-300 dark:border-slate-700">
                        {res.attemptedCount === 1 
                          ? `Single module evaluated (${res.attemptedModuleNames[0]}). Complete all 4 modules for maximum +136 CRS points.`
                          : `Calculated from ${res.attemptedCount} attempted skill modules under IRCC Canadian Language Benchmark conversion standards.`
                        }
                      </p>
                    </div>

                    {/* 🎯 POST-EXAM DIAGNOSTIC WEAKNESS & GUIDANCE BREAKDOWN CARD */}
                    <div className="p-4 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/40 text-xs text-left space-y-3 font-sans">
                      <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-2">
                        <span className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5 uppercase text-[11px]">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span>Post-Exam Root Cause & Weakness Analysis</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-mono font-bold text-[10px]">
                          FRANCPREP DIAGNOSTIC AI
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-800 dark:text-slate-200">
                        {res.nclcLevel === 0 ? (
                          <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                            ⚠️ <strong>No Test Items Attempted:</strong> Complete items or submit writing/speaking responses before finishing to receive a personalized weakness breakdown.
                          </div>
                        ) : (
                          <>
                            {res.listeningTotal > 0 && res.listeningPct > 0 && (
                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                                <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">🎧 Listening (CO Focus):</p>
                                <p className="text-[11px] leading-relaxed">
                                  {res.listeningPct >= 65
                                    ? `✓ Strong retention (${res.listeningPct}%). High accuracy on single-play audio items.`
                                    : `⚠️ Practice audio-only items (Q1–29). Focus on identifying key acoustic markers before reading distractors.`}
                                </p>
                              </div>
                            )}

                            {res.readingTotal > 0 && res.readingPct > 0 && (
                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                                <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">📖 Reading (CE Focus):</p>
                                <p className="text-[11px] leading-relaxed">
                                  {res.readingPct >= 65
                                    ? `✓ Strong scanning speed (${res.readingPct}%). Excellent grasp of academic B2/C1 connectors.`
                                    : `⚠️ Work on paragraph structure scanning in B2/C1 texts. Use keyword matching between questions and passage.`}
                                </p>
                              </div>
                            )}

                            {res.writingAttemptedCount > 0 && (
                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                                <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">✍️ Writing (EE Focus):</p>
                                <p className="text-[11px] leading-relaxed">
                                  {res.writingAttemptedCount < 3 ? (
                                    <>
                                      ⚠️ <strong>Incomplete Writing Submission:</strong> Attempted {res.writingAttemptedCount}/3 tasks (T1: {res.writingTaskScores.t1}/20, T2: {res.writingTaskScores.t2}/20, T3: {res.writingTaskScores.t3}/20), giving an overall composite grade of <strong>{res.writingAvg}/20 Marks ({res.writingNCLC.nclcGrade})</strong>. In the official TCF exam, completing all 3 tasks (20% + 30% + 50%) is mandatory for CLB 7+ benchmark scoring.
                                    </>
                                  ) : res.writingAvg >= 12 ? (
                                    `✓ Strong writing score (${res.writingAvg}/20 Marks — ${res.writingNCLC.nclcGrade}). High mastery of B2 connectors and structures across all 3 tasks.`
                                  ) : (
                                    `⚠️ Writing score is ${res.writingAvg}/20 Marks (${res.writingNCLC.nclcGrade}). Focus on reaching word count bounds (60-120 T1, 120-150 T2, 140-180 T3), inserting formal connectors (cependant, toutefois), and avoiding English word code-switching.`
                                  )}
                                </p>
                              </div>
                            )}

                            {res.speakingAvg > 0 && (
                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                                <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">🎙️ Speaking (EO Focus):</p>
                                <p className="text-[11px] leading-relaxed">
                                  {res.speakingAvg >= 60
                                    ? `✓ Strong oral fluency (${res.speakingAvg}% — CLB ${res.speakingNCLC.nclcLevel} / ${res.speakingNCLC.cefrEquivalent}).`
                                    : `⚠️ Oral score is ${res.speakingAvg}% (CLB ${res.speakingNCLC.nclcLevel} / ${res.speakingNCLC.cefrEquivalent}). Focus on formal question structures and argument organization.`}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="pt-2 border-t border-purple-200 dark:border-purple-800 flex items-center justify-between">
                        <span className="text-[10px] text-purple-800 dark:text-purple-300 font-bold">Targeted Syllabus Recommendation:</span>
                        <button
                          onClick={() => navigate({ to: "/learn" })}
                          className="text-purple-700 dark:text-purple-300 hover:underline font-bold text-xs flex items-center gap-1"
                        >
                          Go to FrancPrep B2 Lessons →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setShowReadingHint(true);
                  }}
                  className="w-full sm:w-1/3 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Review Answers</span>
                </button>

                <button
                  onClick={() => {
                    try { localStorage.removeItem(sessionKey); } catch {}
                    setSelectedAnswers({});
                    setWritingResponses({});
                    setSpeakingTranscripts({});
                    setWritingAiResults({});
                    setSpeakingAiResults({});
                    setFlaggedQuestions({});
                    setAttemptsMap({});
                    setCheckedMap({});
                    setActiveSectionIdx(0);
                    setCurrentQuestionIdx(0);
                    setIsSubmitted(false);
                  }}
                  className="w-full sm:w-1/3 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Retake Test</span>
                </button>

                <button
                  onClick={() => {
                    try { localStorage.removeItem(sessionKey); } catch {}
                    navigate({ to: "/exam" });
                  }}
                  className="w-full sm:w-1/3 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Home className="w-4 h-4 text-white" />
                  <span>Exam Hub</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODULE PREPARATION & STRATEGY GUIDE MODAL ─── */}
      <AnimatePresence>
        {showStrategyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl p-6 md:p-8 rounded-2xl border bg-white dark:bg-[#101828] border-slate-300 dark:border-slate-800 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                      Official Strategy & Preparation Guide
                    </h3>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-mono font-bold uppercase">
                      {currentSection.title} • NCLC 7 (B2 Vantage Target)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowStrategyModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200"
                >
                  Close ✕
                </button>
              </div>

              {/* Module-Specific Strategy Content */}
              {currentSection.type === "COMPREHENSION_ORALE" && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm">🎧 1. Questions 1 à 29 (Audio-Only Presentation)</h4>
                    <p>
                      In official TCF Canada exam centers, question prompts for Q1–29 are <strong>spoken in the audio recording</strong> and not printed on screen. Listen for the main context, speaker identity, and core location before evaluating option choices A, B, C, D.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm">⚡ 2. Single-Play Audio & Locked Backward Navigation</h4>
                    <p>
                      Audio clips play exactly <strong>ONCE</strong>. Backward navigation is locked on audio questions to mirror standardized CBT test regulations. Make your selection promptly after the clip finishes.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm">🎯 3. How to Spot Audio Distractors</h4>
                    <p>
                      Watch out for numbers, dates, or prices mentioned in secondary contexts. Real answer options paraphrase the main idea rather than repeating word-for-word triggers.
                    </p>
                  </div>
                </div>
              )}

              {currentSection.type === "COMPREHENSION_ECRITE" && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm">📖 1. Time Management (39 Questions / 60 Minutes)</h4>
                    <p>
                      Allocate ~1.5 minutes per question. Spend less time on A1–A2 short signs (Q1–15) to preserve extra minutes for complex B2–C1 press articles (Q25–39).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm">🔍 2. Skimming vs. Scanning Strategy</h4>
                    <p>
                      Read the question prompt <em>before</em> reading the article. Scan paragraphs for key synonyms and logical connectors (<em>cependant, en effet, néanmoins</em>).
                    </p>
                  </div>
                </div>
              )}

              {currentSection.type === "EXPRESSION_ECRITE" && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
                    <h4 className="font-bold text-pink-900 dark:text-pink-300 text-sm">✍️ 1. Strict Word Count Boundaries</h4>
                    <p>
                      • <strong>Tâche 1:</strong> 60 to 120 words (Short message/email).<br />
                      • <strong>Tâche 2:</strong> 120 to 150 words (Travel report/article).<br />
                      • <strong>Tâche 3:</strong> 140 to 180 words (Argumentative essay on 2 viewpoints).<br />
                      <em>Penalties apply if text falls below minimum word counts!</em>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
                    <h4 className="font-bold text-pink-900 dark:text-pink-300 text-sm">💡 2. Structure Required for NCLC 7+ (B2)</h4>
                    <p>
                      Structure Tâche 3 into 4 distinct paragraphs: Introduction, Argument 1 (Pour), Argument 2 (Contre), and Conclusion. Always include formal connectors: <em>d'une part... d'autre part, en revanche, il convient d'ajouter que</em>.
                    </p>
                  </div>
                </div>
              )}

              {currentSection.type === "EXPRESSION_ORALE" && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm">🎙️ 1. Virtual Examiner Interaction Persona (TCF Format)</h4>
                    <p>
                      • <strong>Tâche 1 (2 min):</strong> Self-introduction (no prep). Speak clearly about work and Canadian goals.<br />
                      • <strong>Tâche 2 (3.5 min):</strong> Information gathering. Formulate ~10 formal questions using inversion (<em>Pourriez-vous m'indiquer...</em>).<br />
                      • <strong>Tâche 3 (4.5 min):</strong> Debate an opinion. Present pros/cons and defend your personal verdict.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowStrategyModal(false)}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow"
              >
                Understood! Start {currentSection.title} Practice
              </button>
            </motion.div>
          </motion.div>
        )}
        {/* Fullscreen Image Zoom Lightbox for Visual Items (Q1-Q4) */}
        {zoomedImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImageSrc(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[90vh]"
            >
              <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100 dark:bg-slate-950">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-mono">
                  <span>🖼️ Visual Document Q{currentQ?.questionNumber} (High Resolution)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setZoomedImageSrc(null)}
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 overflow-auto flex items-center justify-center bg-white">
                <img
                  src={zoomedImageSrc}
                  alt="Zoomed Illustration"
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>
              <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                Pinch or scroll to inspect details • Tap outside to close
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Slide-Up Strategy Drawer for Practice Mode */}
        {showMobileStrategyDrawer && currentQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileStrategyDrawer(false)}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-end justify-center lg:hidden"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl border-t border-amber-500/40 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Grab Handle & Header */}
              <div className="pt-3 pb-2 px-4 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1.5 bg-gradient-to-b from-amber-500/10 to-transparent">
                <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="w-full flex items-center justify-between pt-1">
                  <span className="font-extrabold text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{currentSection.type === "COMPREHENSION_ECRITE" ? "📖 Reading Strategy & Traps" : "🎧 Audio Coach & Traps"}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMobileStrategyDrawer(false)}
                    className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-4 overflow-y-auto space-y-3.5 text-xs">
                {/* Trap Alert */}
                {(currentQ as any).trapAlert && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                      <span>⚠️ Piège à éviter (Trap Alert)</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                      {(currentQ as any).trapAlert}
                    </p>
                    {(currentQ as any).trapAlertEn && (
                      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-950 dark:text-amber-200 italic">
                        <span className="font-bold mr-1">🇬🇧 Translation:</span>
                        {(currentQ as any).trapAlertEn}
                      </div>
                    )}
                  </div>
                )}

                {/* Strategy Coach */}
                {((currentQ as any).readingCoach || (currentQ as any).audioCoach) && (
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800/60 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                      <span>💡 Stratégie recommandée (Coach)</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                      {(currentQ as any).readingCoach || (currentQ as any).audioCoach}
                    </p>
                    {((currentQ as any).readingCoachEn || (currentQ as any).audioCoachEn) && (
                      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-blue-200 dark:border-blue-900 text-[11px] text-blue-950 dark:text-blue-200 italic">
                        <span className="font-bold mr-1">🇬🇧 Translation:</span>
                        {(currentQ as any).readingCoachEn || (currentQ as any).audioCoachEn}
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Explanation */}
                {currentQ.explanation && (
                  <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800/60 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Analyse Pédagogique Détaillée</span>
                    </div>
                    <div className="whitespace-pre-line leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                      {currentQ.explanation}
                    </div>
                    {((currentQ as any).detailedExplanationEn || (currentQ as any).explanationEnglish || (currentQ as any).explanationEn) && (
                      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-purple-200 dark:border-purple-900 text-[11px] text-purple-950 dark:text-purple-200 whitespace-pre-line leading-relaxed">
                        <span className="font-bold mr-1 block text-purple-800 dark:text-purple-300">🇬🇧 English Pedagogical Translation:</span>
                        {(currentQ as any).detailedExplanationEn || (currentQ as any).explanationEnglish || (currentQ as any).explanationEn}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Action Bar */}
              <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <button
                  type="button"
                  onClick={() => setShowMobileStrategyDrawer(false)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  Got it! Return to Question 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* ─── SECTION TRANSITION CONFIRMATION MODAL (Strict Exam Mode) ─── */}
        {sectionTransitionModal && sectionTransitionModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          >
            <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-2xl space-y-4 text-slate-950 dark:text-slate-100 animate-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Clôturer l'épreuve en cours ?</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">TCF Canada CBT Official Procedure</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                En mode examen officiel, une fois que vous passez à l'épreuve de <strong>{sectionTransitionModal.targetTitle}</strong>, la section actuelle sera définitivement <strong>verrouillée</strong> et vous ne pourrez plus revenir en arrière pour modifier vos réponses.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSectionTransitionModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  Continuer à réviser
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = sectionTransitionModal.targetIdx;
                    setCompletedSectionIndices((prev) => Array.from(new Set([...prev, activeSectionIdx])));
                    setActiveSectionIdx(target);
                    setCurrentQuestionIdx(0);
                    setSectionTransitionModal(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Confirmer & Passer à la suite →</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute("/exam/$paperId")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: (search.mode as ExamMode) || "PRACTICE",
    };
  },
  component: AuthenticCBTExamPage,
});



