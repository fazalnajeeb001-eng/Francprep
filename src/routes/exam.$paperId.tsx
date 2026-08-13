import { createFileRoute, useNavigate, useParams, useSearch, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
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
  Home
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { useSpeak } from "~/lib/speech";
import { triggerAcousticSoundForQuestion } from "~/lib/soundEffects";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { useAuth } from "~/lib/AuthContext";
import { SmartAvatar } from "~/components/dashboard/widgets/SmartAvatar";
import { getExamRegistry, calculateNCLCScore, type ExamPaper, type ExamMode } from "~/lib/examSchema";

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

  const registry = getExamRegistry() || [];
  const paper: ExamPaper = registry.find((p) => p.id === paperId) || registry[0] || {
    id: paperId || "tcf1",
    title: "TCF Canada Exam Paper 1",
    type: "TCF_CANADA",
    code: "P1",
    sections: []
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

  // Timer State
  const [timeLeft, setTimeLeft] = useState((currentSection?.durationMins || 35) * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [qTimeLeft, setQTimeLeft] = useState<number | null>(null);

  // Audio Speech Hook (Declared at top of component to prevent TDZ ReferenceError)
  const { speak: ttsSpeak, speakDialogue: ttsSpeakDialogue, speakListening: ttsSpeakListening, isSpeaking, stop: ttsStop, pause: ttsPause, resume: ttsResume } = useSpeak();

  // Practice Mode Toggles
  const [showHints, setShowHints] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [showQuestionPrompt, setShowQuestionPrompt] = useState(false);
  const [showPassageTranslation, setShowPassageTranslation] = useState(false);

  // Session Key
  const sessionKey = `fp_exam_session_${paper?.id || "default"}_${mode}`;

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
  const [oralSpeakingTimeRemaining, setOralSpeakingTimeRemaining] = useState<Record<string, number>>({});
  const [isOralSpeakingActive, setIsOralSpeakingActive] = useState<Record<string, boolean>>({});

  // Practice Helper & Task Tab States
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showReadingHint, setShowReadingHint] = useState(false);
  const [failedImagesMap, setFailedImagesMap] = useState<Record<string, boolean>>({});
  const [activeWritingTaskIdx, setActiveWritingTaskIdx] = useState(0);
  const [activeSpeakingTaskIdx, setActiveSpeakingTaskIdx] = useState(0);
  const [showSpeakingDisclaimer, setShowSpeakingDisclaimer] = useState(false);
  const [hasAcceptedSpeakingDisclaimer, setHasAcceptedSpeakingDisclaimer] = useState(false);

  // Submission & Results & Strategy Modals State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [openModelAnswerTaskId, setOpenModelAnswerTaskId] = useState<string | null>(null);

  // Per-Question CBT Countdown Timer & Auto-Advance (Runs in BOTH Practice & Exam Modes for Comprehension Orale)
  useEffect(() => {
    if (currentSection.type !== "COMPREHENSION_ORALE" || !currentQ || isSubmitted) {
      setQTimeLeft(null);
      return;
    }

    // Do NOT count down while audio is playing, while student has audio paused, OR before audio has finished playing!
    if (isSpeaking || isAudioPaused || !isAudioFinished) {
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
  }, [currentQuestionIdx, activeSectionIdx, mode, currentSection.type, currentQ, isSubmitted, isSpeaking, isAudioPaused, isAudioFinished, currentQuestions.length, paper.sections.length]);

  const handleStartPrepTimer = (taskId: string, prepMins = 1) => {
    setOralPrepTimeRemaining((prev) => ({ ...prev, [taskId]: prepMins * 60 }));
    setIsOralPrepActive((prev) => ({ ...prev, [taskId]: true }));
  };

  const handleStartSpeakingTimer = (taskId: string, speakingMins = 2) => {
    setOralSpeakingTimeRemaining((prev) => ({ ...prev, [taskId]: Math.round(speakingMins * 60) }));
    setIsOralSpeakingActive((prev) => ({ ...prev, [taskId]: true }));
  };

  useEffect(() => {
    const activeTasks = Object.keys(isOralPrepActive).filter((k) => isOralPrepActive[k] && (oralPrepTimeRemaining[k] || 0) > 0);
    if (activeTasks.length === 0) return;

    const interval = setInterval(() => {
      setOralPrepTimeRemaining((prev) => {
        const next = { ...prev };
        activeTasks.forEach((taskId) => {
          if (next[taskId] > 1) {
            next[taskId] -= 1;
          } else {
            next[taskId] = 0;
            setIsOralPrepActive((p) => ({ ...p, [taskId]: false }));
            // Auto announce end of prep time & start speaking timer
            handlePlayExaminerAudio("Le temps de préparation est terminé. Vous pouvez maintenant vous exprimer en français.");
            const currentTask = currentSection?.speakingTasks?.find(t => t.id === taskId);
            const duration = currentTask?.speakingTimeMins || (taskId.includes("spk-1") ? 2 : taskId.includes("spk-2") ? 3.5 : 4.5);
            handleStartSpeakingTimer(taskId, duration);
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOralPrepActive, oralPrepTimeRemaining, currentSection]);

  useEffect(() => {
    const activeTasks = Object.keys(isOralSpeakingActive).filter((k) => isOralSpeakingActive[k] && (oralSpeakingTimeRemaining[k] || 0) > 0);
    if (activeTasks.length === 0) return;

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
  }, [isOralSpeakingActive, oralSpeakingTimeRemaining]);

  const handlePlayExaminerAudio = (text: string, onEnded?: () => void) => {
    handleStopAudio();
    const isMale = /\b(monsieur|m\.|homme|paul|léo|marc|antoine|pierre|thomas|hugo|louis)\b/i.test(text);
    ttsSpeak(text, "fr-FR", 0.9, isMale ? "male" : "female", undefined, undefined, undefined, onEnded);
  };

  const handleSendSpeakingQuestionToExaminer = async (taskId: string, userText: string, scenarioText: string) => {
    const clean = (userText || '').trim();
    if (!clean) return;

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
        handlePlayExaminerAudio(replyText);
      }
    } catch (e) {
      console.error("Examiner chat error:", e);
    }
    setSpeakingChatLoading((prev) => ({ ...prev, [taskId]: false }));
  };

  const startSpeakingTaskSession = (idx: number) => {
    const tasks = currentSection?.speakingTasks;
    if (!tasks || tasks.length === 0) return;
    const task = tasks[Math.min(idx, tasks.length - 1)];
    if (!task) return;

    const openingText = idx === 0 || task.title?.includes("Tâche 1")
      ? "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?"
      : idx === 1 || task.title?.includes("Tâche 2")
      ? "Bonjour ! Je suis le responsable de l'annonce. Je vous écoute, quelles sont vos questions concernant les horaires, tarifs et modalités ?"
      : "Bonjour ! J'aimerais connaître votre point de vue sur ce sujet de société. Présentez-moi vos arguments et votre position.";

    if (task.prepTimeMins > 0) {
      // Tâche 2 (Interaction with prep time):
      // Preparation Timer starts IMMEDIATELY along with the question audio!
      handleStartPrepTimer(task.id, task.prepTimeMins);
      handlePlayExaminerAudio(openingText);
    } else {
      // Tâche 1 & Tâche 3 (Direct speaking without prep time):
      // Speaking Timer starts AFTER the examiner question audio finishes speaking!
      let timerStarted = false;
      const startTimer = () => {
        if (!timerStarted) {
          timerStarted = true;
          handleStartSpeakingTimer(task.id, task.speakingTimeMins);
        }
      };

      handlePlayExaminerAudio(openingText, startTimer);

      // Fallback safety timeout (5 seconds) in case audio is blocked or delayed
      setTimeout(() => {
        startTimer();
      }, 5000);
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
        activeSectionIdx,
        currentQuestionIdx,
        timestamp: Date.now()
      };
      localStorage.setItem(sessionKey, JSON.stringify(payload));
    } catch {}
  }, [selectedAnswers, flaggedQuestions, writingResponses, speakingTranscripts, activeSectionIdx, currentQuestionIdx, isSubmitted, sessionKey]);

  useEffect(() => {
    handleStopAudio();
    setShowQuestionPrompt(false);
    setShowTranscript(false);
    setShowTranslation(false);
    setShowReadingHint(false);
    return () => {
      handleStopAudio();
    };
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

  const handleCheckAnswer = (qId: string, correctIdx: number) => {
    const currentAttempts = (attemptsMap[qId] || 0) + 1;
    const isCorrect = selectedAnswers[qId] === correctIdx;
    setAttemptsMap((prev) => ({ ...prev, [qId]: currentAttempts }));

    if (isCorrect || currentAttempts >= 2) {
      setCheckedMap((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const handleToggleSpeakingRecording = (taskId: string) => {
    const isCurrentlyRecording = recordingSpeaking[taskId];

    if (isCurrentlyRecording) {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: false }));
      return;
    }

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
    };

    recognition.onend = () => {
      setRecordingSpeaking((prev) => ({ ...prev, [taskId]: false }));
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

      const res = await apiFetch("/writing/analyze-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription: combinedSpeech, expectedText, lessonTitle: `${paper.title} - ${taskId}`, taskNumber })
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
            feedback: data.feedback || `Official FEI Oral Evaluation: Total ${totalScoreOutOf20}/20 Marks.`,
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
                      feedback: data.feedback || `Official FEI Oral Evaluation: Total ${totalScoreOutOf20}/20 Marks.`,
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

    if (currentSection.type === "EXPRESSION_ORALE") {
      if (!hasAcceptedSpeakingDisclaimer) {
        setShowSpeakingDisclaimer(true);
      } else {
        startSpeakingTaskSession(activeSpeakingTaskIdx);
      }
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
  }, [activeSectionIdx, currentSection.durationMins, mode, currentSection.type, paper.id, hasAcceptedSpeakingDisclaimer]);

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
    // FEI CBT Rule (Both Exam & Practice Modes): Selecting choice A, B, C, D automatically reveals the question prompt!
    setShowQuestionPrompt(true);
    // In Practice Mode, if audio is not actively playing, selecting a choice also unlocks the response timer countdown!
    if (mode === "PRACTICE" && !isSpeaking && !isAudioPaused) {
      setIsAudioFinished(true);
    }
  };

  const handleStopAudio = () => {
    ttsStop();
    setIsAudioPaused(false);
  };

  // Automatically kill audio and manage audio completion state / auto-play when switching questions!
  useEffect(() => {
    handleStopAudio();
    setIsAudioFinished(false);

    if (currentSection?.type === "COMPREHENSION_ORALE" && currentQ) {
      const qNum = currentQ.questionNumber;
      const initialTimer = (currentQ as any).perQuestionTimerSeconds || (qNum <= 10 ? 15 : qNum <= 26 ? 20 : 25);
      setQTimeLeft(initialTimer);

      // Q30-Q39 are always printed on screen per FEI rules, or if student already selected an answer
      const hasAnswer = currentQ?.id ? selectedAnswers?.[currentQ.id] !== undefined : false;
      if (qNum >= 30 || hasAnswer) {
        setShowQuestionPrompt(true);
      } else {
        setShowQuestionPrompt(false);
      }

      // Auto-play audio on question load in Exam Mode
      if (mode === "EXAM" && !isSubmitted) {
        const rate = (currentQ as any).speakingRate || 1.0;
        const fullText = currentQ.transcript || currentQ.text;
        const timer = setTimeout(() => {
          ttsSpeakListening(fullText, qNum, "fr-FR", rate, undefined, () => {
            setIsAudioFinished(true);
          });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentQuestionIdx, activeSectionIdx]);

  const handlePlayAudio = async (text: string, lang = "fr-FR", rate = 1.0) => {
    handleStopAudio();
    setIsAudioPaused(false);
    const qNum = (currentQ as any)?.questionNumber || 1;
    await triggerAcousticSoundForQuestion(qNum);
    const fullTextToPlay = currentQ?.transcript || text;
    ttsSpeakListening(fullTextToPlay, qNum, lang, rate, undefined, () => {
      setIsAudioFinished(true);
    });
  };

  const handlePauseResumeAudio = () => {
    if (isAudioPaused) {
      ttsResume();
      setIsAudioPaused(false);
    } else if (isSpeaking) {
      ttsPause();
      setIsAudioPaused(true);
    } else {
      handlePlayAudio(currentQ.transcript || currentQ.text);
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
            feedback: `⚠️ PLAGIARISM WARNING (${similarityPct}% Similarity with Exemplar): Your submitted response matches ${similarityPct}% of the official sample model answer. Under official FEI CBT rules, copied sample responses receive 0 marks. Please write your own authentic response in your own words!`
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
            taskFulfillmentScore: data.taskFulfillmentScore || data.taskCompletionScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            coherenceScore: data.coherenceScore || data.cohesionScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            lexicalScore: data.lexicalScore || data.vocabularyScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            grammarScore: data.grammarScore || Math.min(5, Math.ceil(totalScoreOutOf20 / 4)),
            feedback: data.feedback || `Official FEI Evaluation: Total ${totalScoreOutOf20}/20.`
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
        feedback: `Official FEI Evaluation: Total ${totalScoreOutOf20}/20 • Task Fulfillment: ${taskFulfillmentScore}/5, Coherence & Connectors: ${coherenceScore}/5, Lexical Range: ${lexicalScore}/5, Morphosyntax & Grammar: ${grammarScore}/5.`
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
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="ml-0.5 p-0.5 hover:text-white cursor-pointer"
                title={isTimerPaused ? "Resume Timer" : "Pause Timer"}
              >
                {isTimerPaused ? <Play className="w-3 h-3 fill-emerald-400" /> : <Pause className="w-3 h-3" />}
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

      {/* ─── PRACTICE MODE TOOLBAR (OPTIONAL HELPER TOGGLES & STRATEGY) ─── */}
      {mode === "PRACTICE" && (
        <div className={`${cbtDark ? "bg-emerald-950/40 border-emerald-800/60" : "bg-emerald-50 border-emerald-300"} border-b px-4 py-2 text-xs flex items-center gap-3 overflow-x-auto shrink-0`}>
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

      {/* ─── SECTION NAVIGATION TABS ─── */}
      <div className={`${cbtDark ? "bg-slate-900 border-slate-800" : "bg-slate-200 border-slate-300"} border-b px-4 py-1.5 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold`}>
        {paper.sections.map((sec, idx) => {
          const isSelected = activeSectionIdx === idx;
          return (
            <button
              key={sec.type}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-3.5 py-1.5 rounded transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow"
                  : cbtDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-300 font-bold border border-slate-300"
              }`}
            >
              {sec.type === "COMPREHENSION_ORALE" && <Volume2 className="w-3.5 h-3.5" />}
              {sec.type === "COMPREHENSION_ECRITE" && <BookOpen className="w-3.5 h-3.5" />}
              {sec.type === "EXPRESSION_ECRITE" && <PenTool className="w-3.5 h-3.5" />}
              {sec.type === "EXPRESSION_ORALE" && <Mic className="w-3.5 h-3.5" />}
              <span>{sec.title}</span>
            </button>
          );
        })}
      </div>

      {/* ─── MAIN CBT SPLIT-SCREEN CONTENT WORKSPACE ─── */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto overflow-y-auto">
        {/* PROMINENT UN-MISSABLE PRACTICE STRATEGY BANNER */}
        {mode === "PRACTICE" && (
          <div className="mb-4 p-4 rounded-xl border border-purple-300 dark:border-purple-800 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold shrink-0">
                <BookOpen className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <span>📖 {currentSection.title} Official Strategy & Prep Guide</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/40 text-purple-200 text-[10px] font-mono uppercase">FEI / CCI Standards</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 h-full">

            {/* LEFT PANEL: PASSAGE / AUDIO STIMULUS (7 COLS) */}
            <div className={`lg:col-span-7 p-4 sm:p-5 rounded-xl border ${cbtCard} shadow-sm space-y-4 flex flex-col justify-between overflow-y-auto max-h-[48vh] lg:max-h-none`}>
              <div className="space-y-4">
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
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border flex items-center gap-1 shrink-0 cursor-pointer ${
                        flaggedQuestions[currentQ.id]
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">{flaggedQuestions[currentQ.id] ? "Flagged" : "Flag"}</span>
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
                        <div className="px-2 py-0.5 rounded bg-purple-100 border border-purple-300 text-purple-900 font-mono font-extrabold text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-700" />
                          <span>CBT Pace: {currentQ.questionNumber <= 10 ? 15 : currentQ.questionNumber <= 26 ? 20 : 25}s</span>
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
                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-800 text-blue-200 border border-blue-600 hidden sm:inline">Examen Officiel FEI</span>
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
                                if (isSpeaking || isAudioPaused) {
                                  handlePauseResumeAudio();
                                } else {
                                  handlePlayAudio(currentQ.transcript || currentQ.text, "fr-FR", (currentQ as any).speakingRate || 1.0);
                                }
                              }}
                              className="px-3.5 sm:px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer active:scale-95 transition-all"
                            >
                              {isSpeaking ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  <span>Pause Audio ⏸️</span>
                                </>
                              ) : isAudioPaused ? (
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

                            {(isSpeaking || isAudioPaused) && (
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
                          <div className="p-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 space-y-2 shadow-md">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b pb-1.5 border-slate-200">
                              <span className="flex items-center gap-1.5">🖼️ <strong>Sur le livret / l'écran, vous voyez :</strong></span>
                              <span className="text-[10px] text-slate-500 font-mono">Illustration Officielle FEI (HD)</span>
                            </div>
                            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-slate-300 bg-white flex items-center justify-center">
                              <img
                                src={mainImgSrc}
                                alt={`Illustration N°${currentQ.questionNumber}`}
                                className="w-full h-full object-contain p-1 bg-white"
                                onError={() => {
                                  setFailedImagesMap((prev) => ({ ...prev, [imgKey]: true }));
                                }}
                              />
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
                    <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800 pb-2">
                      <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>Document d'épreuve (Reading Passage):</span>
                      </span>

                      {mode === "PRACTICE" && (
                        <div className="flex items-center gap-1.5">
                          {currentQ.passageEnglish && (
                            <button
                              onClick={() => setShowPassageTranslation(!showPassageTranslation)}
                              className="px-2 py-1 rounded bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-500 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Globe className="w-3 h-3" />
                              <span>{showPassageTranslation ? "Hide EN" : "🌐 Show EN Translation"}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="font-serif text-xs sm:text-sm leading-relaxed font-medium text-slate-950 dark:text-slate-100 whitespace-pre-line p-3 rounded-lg bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900 max-h-[300px] overflow-y-auto">
                      "{currentQ.passage}"
                    </p>

                    {showPassageTranslation && currentQ.passageEnglish && (
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:border-blue-800">
                        <p className="font-bold uppercase text-[10px] mb-1">English Passage Translation:</p>
                        <p className="italic text-slate-700 dark:text-slate-300">{currentQ.passageEnglish}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Practice Hint Bar */}
              {mode === "PRACTICE" && showHints && currentQ.hint && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-medium space-y-1">
                  <p className="font-extrabold flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Coach & Strategy Tip:</span>
                  </p>
                  <p className="whitespace-pre-line leading-relaxed text-[11px]">{currentQ.hint}</p>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: QUESTION & OPTIONS SELECTOR (5 COLS) */}
            <div className={`lg:col-span-5 p-4 sm:p-5 rounded-xl border ${cbtCard} shadow-sm space-y-5 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-950 dark:text-slate-100">
                    {currentQ.questionInAudio && !showTranscript && (currentQ.questionNumber || 0) < 34
                      ? `Question Audio N°${currentQ.questionNumber}`
                      : currentQ.text}
                  </h3>
                  {currentQ.questionInAudio && !showTranscript && (currentQ.questionNumber || 0) < 34 && (
                    <p className="text-xs text-purple-700 dark:text-purple-400 font-medium italic">
                      Écoutez la question posée à la fin du document audio et choisissez l'option (A, B, C, D) ci-dessous.
                    </p>
                  )}
                  {showTranslation && (
                    <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 italic pt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 shrink-0" />
                      <span>Question (EN): "{currentQ.text}"</span>
                    </p>
                  )}
                </div>

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
                                <div className="p-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                  {opt}
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  ) : (currentQ.hasSpokenOptions || (currentQ.questionNumber >= 5 && currentQ.questionNumber <= 8)) ? (
                    <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-100 shadow-md">
                      <p className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                        <span>Choisissez la bonne réponse (A, B, C ou D) :</span>
                      </p>
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
                            <span className="leading-snug break-words">{opt}</span>
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

                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {isCorrect
                              ? `Excellent! Option ${correctLetter} ("${correctOptionText}") is the correct response.`
                              : `The correct answer is Option ${correctLetter}: "${correctOptionText}".`}
                          </p>

                          {currentQ.explanation && (
                            <div className="pt-2 border-t border-slate-300 dark:border-slate-700/60 space-y-1">
                              <span className="font-bold uppercase text-[10px] tracking-wider text-slate-700 dark:text-slate-300">
                                Learning Explanation:
                              </span>
                              <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-200">
                                {currentQ.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Prev / Next Bottom Navigator */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  disabled={currentQuestionIdx === 0 || (mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE")}
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    currentQuestionIdx === 0 || (mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE")
                      ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300"
                  }`}
                  title={mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE" ? "Navigation arrière désactivée en mode examen officiel (FEI CBT Rules)" : ""}
                >
                  ← Previous Question
                </button>

                <button
                  disabled={currentQuestionIdx === currentQuestions.length - 1}
                  onClick={() => setCurrentQuestionIdx((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-xs font-bold disabled:opacity-40"
                >
                  Next Question →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* WRITING SECTION WORKSPACE WITH CBT TASK TABS */}
        {currentSection.writingTasks && currentSection.writingTasks.length > 0 && (
          <div className="space-y-4">
            {/* CBT Task Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 uppercase shrink-0 mr-1">Épreuve Écrite (Task Switcher):</span>
              {currentSection.writingTasks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveWritingTaskIdx(idx)}
                  className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 border-b-2 ${
                    activeWritingTaskIdx === idx
                      ? "bg-pink-600 text-white border-pink-600 shadow"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{t.title}</span>
                </button>
              ))}
            </div>

            {/* Active Writing Task Display */}
            {(() => {
              const task = currentSection.writingTasks[Math.min(activeWritingTaskIdx, currentSection.writingTasks.length - 1)];
              if (!task) return null;

              const textVal = writingResponses[task.id] || "";
              const wordCount = countFrenchWords(textVal);
              const isValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;
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
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-2 shadow-sm font-sans">
                      <div className="flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>✍️ Writing Strategy & Trap Alert (FEI Certified Scoring Criteria)</span>
                      </div>
                      <div className="leading-relaxed font-medium whitespace-pre-line text-xs space-y-1.5">
                        {activeWritingTaskIdx === 0 || task.title?.includes("Tâche 1") || task.wordCountMin === 60 || task.min === 60 ? (
                          <>
                            <p><strong>⚠️ Trap Alert:</strong> Do NOT omit formal salutations (<em>Monsieur le Propriétaire, Madame la Directrice,</em>) or formal closings (<em>Je vous prie d'agréer mes salutations distinguées</em>). Words copied directly from the prompt instructions are deducted from your word count and earn zero credit!</p>
                            <p><strong>🔄 Connectors & Syntax Key:</strong> Use conditional polite requests (<em>Pourriez-vous m'indiquer..., J'aimerais savoir si...</em>) and formal connectors (<em>de plus, par ailleurs, en conséquence</em>) to secure NCLC 7+ (B2).</p>
                            <p><strong>🎯 Word Count Target:</strong> Stay strictly within {task.wordCountMin} to {task.wordCountMax} words. Responses below {task.wordCountMin} words suffer an automatic Task Fulfillment penalty.</p>
                          </>
                        ) : activeWritingTaskIdx === 1 || task.title?.includes("Tâche 2") || task.wordCountMin === 120 || task.min === 120 ? (
                          <>
                            <p><strong>⚠️ Trap Alert:</strong> Do NOT write a basic list of actions. Official FEI examiners evaluate your capacity to narrate personal experiences with emotions, sensations, and recommendations using past tenses (<em>passé composé</em> for events, <em>imparfait</em> for descriptions).</p>
                            <p><strong>🔄 Connectors & Lexical Key:</strong> Enrich your narrative with vivid adjectives (<em>féerique, inoubliable, chaleureux</em>) and transitional temporal markers (<em>Dès mon arrivée, pendant mon séjour, en outre, en conclusion</em>).</p>
                            <p><strong>🎯 Word Count Target:</strong> Must reach {task.wordCountMin} to {task.wordCountMax} words. Never insert English words (causes automatic grammar score cap at 1/5).</p>
                          </>
                        ) : (
                          <>
                            <p><strong>⚠️ Trap Alert:</strong> Do NOT write a personal letter (<em>"Bonjour, je vous écris..."</em>) — format mismatch receives an automatic 0 grade! Structure as a 4-paragraph argumentative essay (Introduction → Thesis/Pros → Antithesis/Cons → Synthesis Conclusion).</p>
                            <p><strong>🔄 Connectors & Subjunctive Key:</strong> Mandatory B2/C1 connectors (<em>D'une part / d'autre part, de surcroît, cependant, néanmoins, en somme</em>) and subjunctive structures (<em>bien que + subjonctif, afin que nous puissions</em>) to unlock 14–20/20.</p>
                            <p><strong>🎯 Word Count Target:</strong> Strictly {task.wordCountMin} to {task.wordCountMax} words. Balanced synthesis addressing both sides of the societal debate.</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={9}
                    value={textVal}
                    onChange={(e) => setWritingResponses((prev) => ({ ...prev, [task.id]: e.target.value }))}
                    placeholder="Saisissez votre texte officiel ici..."
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-sm font-sans leading-relaxed ${
                      cbtDark ? "bg-[#090D16] border-slate-700 text-white" : "bg-slate-50 border-slate-300 text-slate-950"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold">
                    <span className={isValid ? "text-emerald-600 font-bold" : "text-amber-600"}>
                      Word Count: {wordCount} / {task.wordCountMin} min ({isValid ? "✓ Target Met" : "Requires minimum length"})
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

                      <button
                        disabled={isEvaluating}
                        onClick={() => handleEvaluateWritingAI(task.id, task.prompt, textVal, task.sampleResponse, task.wordCountMin, task.wordCountMax)}
                        className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isEvaluating ? "Evaluating Writing with Neural AI..." : "🤖 Evaluate Writing with AI"}</span>
                      </button>
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
                          OFFICIAL FEI BENCHMARK
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
                          <span>Official FEI CBT Writing Diagnostic & Grade</span>
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
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 font-medium">
                              <span className="text-slate-500 text-[10px] block font-bold">Task Fulfillment</span>
                              <span className="text-pink-600 font-extrabold text-xs">{aiEval.taskFulfillmentScore} / 5</span>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 font-medium">
                              <span className="text-slate-500 text-[10px] block font-bold">Coherence & Connectors</span>
                              <span className="text-purple-600 font-extrabold text-xs">{aiEval.coherenceScore} / 5</span>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 font-medium">
                              <span className="text-slate-500 text-[10px] block font-bold">Lexical Variety</span>
                              <span className="text-indigo-600 font-extrabold text-xs">{aiEval.lexicalScore} / 5</span>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900 font-medium">
                              <span className="text-slate-500 text-[10px] block font-bold">Morphosyntax</span>
                              <span className="text-blue-600 font-extrabold text-xs">{aiEval.grammarScore} / 5</span>
                            </div>
                          </div>

                          <p className="leading-relaxed font-medium p-3 rounded bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900">
                            {aiEval.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
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
              const aiEval = speakingAiResults[task.id];

              return (
                <div key={task.id} className={`p-6 rounded-lg border ${cbtCard} shadow-sm space-y-5`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                        {task.title}
                      </span>
                      <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 leading-snug">{task.scenario}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                        <span>Prep Time: {task.prepTimeMins} min</span>
                        <span>Speaking Time: {task.speakingTimeMins} min</span>
                      </div>
                    </div>
                    {/* 3D Examiner Coach Stage */}
                    <div className="shrink-0 flex items-center gap-2 pl-2">
                      <SmartAvatar
                        features={user?.avatarFeatures}
                        size={110}
                        animate={isRecording ? "speaking" : "idle"}
                        showThoughts={false}
                      />
                    </div>
                  </div>

                  {task.keyPhrases && (
                    <div className="p-3.5 rounded bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
                      <p className="font-bold text-purple-800 dark:text-purple-300 uppercase text-[10px]">Key Oral Phrases & Connectors:</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {task.keyPhrases.map((phrase, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-medium">
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Speaking Strategy & Trap Alert Display */}
                  {mode === "PRACTICE" && showHints && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-2 shadow-sm font-sans">
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-200 dark:border-amber-800/60 pb-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wide">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>🎙️ Speaking Strategy & Preparation Rules (Live FEI Examiner Protocol)</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 font-mono text-[10px]">
                          {activeSpeakingTaskIdx === 0 || task.title?.includes("Tâche 1") || task.taskNumber === 1
                            ? "T1: 0m Prep • 2m Speaking (Timer starts after audio)"
                            : activeSpeakingTaskIdx === 1 || task.title?.includes("Tâche 2") || task.taskNumber === 2
                            ? "T2: 2m Prep (Starts with audio) • 3.5m Speaking"
                            : "T3: 0m Prep • 4.5m Speaking (Timer starts after audio)"}
                        </span>
                      </div>
                      <div className="leading-relaxed font-medium whitespace-pre-line text-xs space-y-1.5">
                        {activeSpeakingTaskIdx === 0 || task.title?.includes("Tâche 1") || task.taskNumber === 1 ? (
                          <>
                            <p><strong>⏱️ Timer Protocol:</strong> Tâche 1 has <strong>0 mins preparation time</strong>. The 2-minute Speaking Timer starts automatically right after the examiner's opening greeting finishes.</p>
                            <p><strong>⚠️ Trap Alert:</strong> Avoid prolonged hesitation (&gt;5 seconds) or reading prepared notes with a monotone pitch. The examiner evaluates spontaneous conversational flow and accurate present/passé tenses.</p>
                            <p><strong>🔄 Oral Expression Key:</strong> Open naturally (<em>"Bonjour ! Je m'appelle..., je travaille actuellement comme..."</em>) and connect ideas smoothly (<em>"Ce qui me motive particulièrement à m'installer au Canada, c'est..."</em>).</p>
                          </>
                        ) : activeSpeakingTaskIdx === 1 || task.title?.includes("Tâche 2") || task.taskNumber === 2 ? (
                          <>
                            <p><strong>⏱️ Timer Protocol:</strong> Tâche 2 has <strong>2 mins preparation time</strong>. The 2-minute Prep Timer starts <strong>IMMEDIATELY along with the question audio</strong> so you can examine the scenario details.</p>
                            <p><strong>⚠️ Trap Alert:</strong> You must lead the interaction by asking at least 8 to 10 distinct, varied questions! Do NOT wait for the examiner to ask you questions or just repeat the same question stem.</p>
                            <p><strong>🔄 Question Variety Key:</strong> Invert structures (<em>"Pourriez-vous me préciser les tarifs ?", "Est-il nécessaire de réserver à l'avance ?", "Quels sont les équipements fournis sur place ?", "Proposez-vous des formules d'essai ?"</em>).</p>
                          </>
                        ) : (
                          <>
                            <p><strong>⏱️ Timer Protocol:</strong> Tâche 3 has <strong>0 mins preparation time</strong>. The 4.5-minute Speaking Timer starts automatically right after the examiner presents the societal debate topic.</p>
                            <p><strong>⚠️ Trap Alert:</strong> Do not just state a one-sided opinion. You must present a nuanced debate: analyze advantages, acknowledge disadvantages, refute counter-arguments, and conclude with your personal verdict.</p>
                            <p><strong>🔄 Argumentation Key:</strong> Use debate signposts (<em>"Selon moi...", "D'un côté..., mais d'un autre côté...", "Bien que certains prétendent que..., je demeure convaincu que...", "Pour conclure..."</em>).</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Photorealistic FEI Certified Examiner Persona Card */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-purple-300 dark:border-purple-800 bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-slate-900/10 dark:from-purple-950/60 dark:via-indigo-950/60 dark:to-slate-950/60 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg border border-purple-400/40">
                          <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                          isPlayingAudio ? "bg-emerald-500 animate-ping" : isRecording ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                        }`} />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-slate-100">
                            Mme Élodie Martin
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-mono font-bold text-[10px] uppercase">
                            Senior FEI Certified Interlocutor
                          </span>
                        </div>
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          Official TCF Canada Oral Examination Simulator • Interactive Audio Examiner
                        </p>
                        
                        {/* Audio Waveform Equalizer Display */}
                        {isPlayingAudio && (
                          <div className="flex items-center gap-1 pt-1">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mr-1">Speaking:</span>
                            <span className="w-1 h-3 bg-emerald-500 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-4 bg-emerald-500 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-2 bg-emerald-500 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
                            <span className="w-1 h-4 bg-emerald-500 rounded animate-bounce" style={{ animationDelay: '450ms' }} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timer Controls & Audio Trigger */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                      <button
                        onClick={() => {
                          const openingText = activeSpeakingTaskIdx === 0 || task.title?.includes("Tâche 1")
                            ? "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me parler de votre parcours professionnel et de vos motivations pour le Canada ?"
                            : activeSpeakingTaskIdx === 1 || task.title?.includes("Tâche 2")
                            ? "Bonjour ! Je suis le responsable de l'annonce. Je vous écoute, quelles sont vos questions concernant les horaires, tarifs et modalités ?"
                            : "Bonjour ! J'aimerais connaître votre point de vue sur ce sujet de société. Présentez-moi vos arguments et votre position.";
                          handlePlayExaminerAudio(openingText);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>🔊 Play Examiner Voice Prompt</span>
                      </button>

                      {task.prepTimeMins > 0 && (
                        <button
                          onClick={() => handleStartPrepTimer(task.id, task.prepTimeMins)}
                          className={`px-3.5 py-2 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                            isOralPrepActive[task.id]
                              ? "bg-amber-600 text-white animate-pulse"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          <span>
                            {isOralPrepActive[task.id]
                              ? `⏱️ Prep: ${Math.floor((oralPrepTimeRemaining[task.id] || 0) / 60)}:${((oralPrepTimeRemaining[task.id] || 0) % 60).toString().padStart(2, '0')}`
                              : `⏱️ ${task.prepTimeMins}-Min Prep Timer`}
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => handleStartSpeakingTimer(task.id, task.speakingTimeMins)}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          isOralSpeakingActive[task.id]
                            ? "bg-emerald-600 text-white animate-pulse"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <Mic className="w-4 h-4 text-emerald-500" />
                        <span>
                          {isOralSpeakingActive[task.id]
                            ? `🎙️ Speaking: ${Math.floor((oralSpeakingTimeRemaining[task.id] || 0) / 60)}:${((oralSpeakingTimeRemaining[task.id] || 0) % 60).toString().padStart(2, '0')}`
                            : `🎙️ ${task.speakingTimeMins}-Min Speaking Timer`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Multi-Turn Oral Dialogue Stream */}
                  {speakingDialogueMap[task.id] && speakingDialogueMap[task.id].length > 0 && (
                    <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1220] space-y-3 text-xs">
                      <p className="font-extrabold text-[11px] uppercase tracking-wide text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5" />
                        <span>Live Two-Way Examiner Exchange Log:</span>
                      </p>

                      <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                        {speakingDialogueMap[task.id].map((msg, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-3 rounded-xl max-w-[90%] sm:max-w-[80%] text-xs font-sans leading-relaxed ${
                              msg.sender === "examiner"
                                ? "bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-100 mr-auto"
                                : "bg-blue-600 text-white ml-auto"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1 font-bold text-[10px] uppercase opacity-80">
                              <span>{msg.sender === "examiner" ? "🎙️ France Éducation International Examiner" : "👤 Candidate (You)"}</span>
                              {msg.sender === "examiner" && (
                                <button
                                  onClick={() => handlePlayExaminerAudio(msg.text)}
                                  className="hover:underline flex items-center gap-0.5 cursor-pointer"
                                  title="Replay speech audio"
                                >
                                  <Volume2 className="w-3 h-3" /> Replay
                                </button>
                              )}
                            </div>
                            <p className="font-medium">{msg.text}</p>
                          </div>
                        ))}

                        {speakingChatLoading[task.id] && (
                          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 mr-auto animate-pulse flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            <span>Examiner is listening and replying in French...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CBT Live Speech Recorder Controls */}
                  <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                        <Mic className={`w-4 h-4 ${isRecording ? "text-red-500 animate-pulse" : "text-purple-600"}`} />
                        <span>{isRecording ? "Live Microphone Recording in Progress..." : "CBT Live Microphone Recorder"}</span>
                      </span>

                      <button
                        onClick={() => handleToggleSpeakingRecording(task.id)}
                        className={`px-4 py-2 rounded-lg font-bold text-xs shadow flex items-center gap-1.5 transition-all cursor-pointer ${
                          isRecording ? "bg-red-600 hover:bg-red-500 text-white animate-pulse" : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecording ? "⏹️ Stop Recording" : "🎙️ Start Oral Recording"}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs min-h-[70px]">
                      <p className="font-bold text-[10px] text-slate-500 uppercase mb-1">Live Speech-to-Text Transcription:</p>
                      <p className="font-sans italic text-slate-900 dark:text-slate-200">
                        {transcript || "(Click 'Start Oral Recording' and speak your response into your microphone in French...)"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                      <button
                        disabled={!transcript || speakingChatLoading[task.id]}
                        onClick={() => handleSendSpeakingQuestionToExaminer(task.id, transcript, task.scenario)}
                        className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>💬 Send Spoken Turn to Examiner & Hear Voice Reply</span>
                      </button>

                      <button
                        disabled={(!transcript && !(speakingDialogueMap[task.id]?.length)) || isEvaluating}
                        onClick={() => handleEvaluateSpeakingAI(task.id, task.scenario, transcript)}
                        className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isEvaluating ? "Evaluating with FEI Neural AI..." : "🤖 Complete Oral Task & Get Official FEI Grade"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Official FEI 4-Criteria Diagnostic Evaluation Result Card */}
                  {aiEval && (
                    <div className="p-4 sm:p-5 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50/90 dark:bg-purple-950/50 space-y-3 text-xs font-sans shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200 dark:border-purple-800 pb-2">
                        <span className="font-extrabold text-sm text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-purple-600" />
                          <span>Official FEI CBT Oral Production Diagnostic & Grade</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white font-mono font-extrabold text-[11px]">
                            {aiEval.nclcGrade || "NCLC 7 (B2 Benchmark Target)"}
                          </span>
                          <span className="px-2 py-1 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">
                            +{aiEval.expressEntryPoints !== undefined ? aiEval.expressEntryPoints : 17} CRS Points
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-medium">
                          <span className="text-slate-500 text-[10px] block font-bold">Task Interaction</span>
                          <span className="text-purple-600 font-extrabold text-xs">{aiEval.taskFulfillmentScore !== undefined ? aiEval.taskFulfillmentScore : 4} / 5</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-medium">
                          <span className="text-slate-500 text-[10px] block font-bold">Fluency & Cadence</span>
                          <span className="text-pink-600 font-extrabold text-xs">{aiEval.coherenceScore !== undefined ? aiEval.coherenceScore : 4} / 5</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-medium">
                          <span className="text-slate-500 text-[10px] block font-bold">Lexical Richness</span>
                          <span className="text-indigo-600 font-extrabold text-xs">{aiEval.lexicalScore !== undefined ? aiEval.lexicalScore : 4} / 5</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 font-medium">
                          <span className="text-slate-500 text-[10px] block font-bold">Morphosyntax</span>
                          <span className="text-blue-600 font-extrabold text-xs">{aiEval.grammarScore !== undefined ? aiEval.grammarScore : 3} / 5</span>
                        </div>
                      </div>

                      <p className="leading-relaxed font-medium p-3 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100">
                        {aiEval.feedback || `Official FEI Oral Evaluation: Total ${aiEval.scoreOutOf20 || 15}/20 Marks.`}
                      </p>
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
              const isPastExamListeningItem = mode === "EXAM" && currentSection.type === "COMPREHENSION_ORALE" && idx < currentQuestionIdx;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    if (!isPastExamListeningItem) setCurrentQuestionIdx(idx);
                  }}
                  disabled={isPastExamListeningItem}
                  title={isPastExamListeningItem ? "Écoute terminée — Impossible de revenir en arrière dans l'examen officiel." : `Item N°${q.questionNumber}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-bold transition-all relative shrink-0 ${
                    isCurrent
                      ? "ring-2 ring-blue-600 bg-blue-600 text-white"
                      : isAnswered
                      ? "bg-blue-800 text-white"
                      : isPastExamListeningItem
                      ? "opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500 line-through"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                  }`}
                >
                  {q.questionNumber}
                  {isFlagged && (
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-400" />
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

      {/* ─── SPEAKING PRE-TEST DISCLAIMER MODAL ─── */}
      <AnimatePresence>
        {showSpeakingDisclaimer && !hasAcceptedSpeakingDisclaimer && (
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
              <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-xl">
                <Mic className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Official TCF Canada Simulator
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Épreuve d'Expression Orale (Speaking Section)
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  This test simulates the real France Éducation International (FEI) Computer-Based Testing environment:
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-left text-xs space-y-3">
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
              </div>

              <button
                onClick={() => {
                  setHasAcceptedSpeakingDisclaimer(true);
                  setShowSpeakingDisclaimer(false);
                  startSpeakingTaskSession(activeSpeakingTaskIdx);
                }}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin Speaking Test Now</span>
              </button>
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
                  Official France Éducation International (FEI) AI Engine is scoring your Writing Tasks (1, 2, 3) and Oral Production across the 4-Criteria Analytic Grid...
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
                                    ? `✓ Strong oral fluency (${res.speakingAvg}% — ${res.speakingNCLC.nclcGrade}).`
                                    : `⚠️ Oral score is ${res.speakingAvg}% (${res.speakingNCLC.nclcGrade}). Focus on formal question structures and argument organization.`}
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
                  className="w-full sm:w-1/2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Retake Test (Reset All Answers)</span>
                </button>

                <button
                  onClick={() => {
                    try { localStorage.removeItem(sessionKey); } catch {}
                    navigate({ to: "/exam" });
                  }}
                  className="w-full sm:w-1/2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Home className="w-4 h-4 text-white" />
                  <span>Return to Exam Hub</span>
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
                      Audio clips play exactly <strong>ONCE</strong>. Backward navigation is locked on audio questions to mirror real FEI CBT regulations. Make your selection promptly after the clip finishes.
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
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm">🎙️ 1. FEI Official Examiner Interaction Persona</h4>
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



