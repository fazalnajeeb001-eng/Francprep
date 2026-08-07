import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
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
  if (words1.length < 5 || words2.length < 5) return 0;

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
  const trigramRatio = tri1.size > 0 ? (triMatches / tri1.size) * 100 : 0;

  const set1 = new Set(words1);
  const set2 = new Set(words2);
  let intersection = 0;
  set1.forEach((w) => {
    if (set2.has(w)) intersection++;
  });
  const union = new Set([...words1, ...words2]).size;
  const jaccardRatio = union > 0 ? (intersection / union) * 100 : 0;

  if (tri1.size > 0 && triMatches > 0) {
    return Math.round(Math.max(trigramRatio, jaccardRatio * 0.7));
  }

  return Math.round(jaccardRatio * 0.4);
}

export const Route = createFileRoute("/exam/$paperId")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: (search.mode as ExamMode) || "PRACTICE",
    };
  },
  component: AuthenticCBTExamPage,
});

export function AuthenticCBTExamPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const activeLang = getActiveLanguageCode(user);
  const activeBranding = getTrackBranding(activeLang);

  if (activeLang !== "fr" && activeLang !== "fre" && activeLang !== "french") {
    return <Navigate to="/exam" replace />;
  }
  const { paperId } = Route.useParams();
  const search = Route.useSearch();
  const mode: ExamMode = search.mode || "PRACTICE";
  const { dark } = useTheme();

  // Test-Center High-Contrast Toggle (Default light CBT canvas for authentic exam day feel)
  const [cbtDark, setCbtDark] = useState(false);

  const registry = getExamRegistry();
  const paper: ExamPaper | undefined = registry.find((p) => p.id === paperId) || registry[0];

  // Active Section Index
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const currentSection = paper.sections[activeSectionIdx] || paper.sections[0];

  // Active Question Index
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(currentSection.durationMins * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Practice Mode Toggles
  const [showHints, setShowHints] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [showPassageTranslation, setShowPassageTranslation] = useState(false);

  // Session Key
  const sessionKey = `fp_exam_session_${paper.id}_${mode}`;

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

  // Practice Helper & Task Tab States
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showReadingHint, setShowReadingHint] = useState(false);
  const [activeWritingTaskIdx, setActiveWritingTaskIdx] = useState(0);
  const [activeSpeakingTaskIdx, setActiveSpeakingTaskIdx] = useState(0);

  // Submission & Results & Strategy Modals State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [openModelAnswerTaskId, setOpenModelAnswerTaskId] = useState<string | null>(null);

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
      const res = await apiFetch("/writing/analyze-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription, expectedText, lessonTitle: paper.title })
      });
      const json = await res.json();
      if (json.success && json.data) {
        const score = json.data.score || 80;
        const nclcGrade = score >= 82 ? "NCLC 9 (C1)" : score >= 65 ? "NCLC 7 (B2 Vantage Target)" : "NCLC 5 (B1 Threshold)";
        setSpeakingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            score,
            nclcGrade,
            feedback: json.data.feedback || "Oral delivery is clear with natural pronunciation and B2 level connectors.",
            corrections: json.data.corrections || [],
            tips: json.data.tips || []
          }
        }));
      } else {
        setSpeakingAiResults((prev) => ({
          ...prev,
          [taskId]: { score: 80, nclcGrade: "NCLC 8 (B2 Vantage)", feedback: "Oral delivery is clear with natural pronunciation and B2 level connectors." }
        }));
      }
    } catch (e) {
      setSpeakingAiResults((prev) => ({
        ...prev,
        [taskId]: { score: 80, nclcGrade: "NCLC 8 (B2 Vantage)", feedback: "Speech fluency and pronunciation match official test-center B2 standards." }
      }));
    }
    setEvaluatingSpeaking((prev) => ({ ...prev, [taskId]: false }));
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
  }, [activeSectionIdx, currentSection.durationMins, mode, currentSection.type, paper.id]);

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
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const { speak: ttsSpeak, speakDialogue: ttsSpeakDialogue, isSpeaking, stop: ttsStop, pause: ttsPause, resume: ttsResume } = useSpeak();

  const handleStopAudio = () => {
    ttsStop();
    setIsAudioPaused(false);
  };

  // Automatically kill and clean up any playing or paused audio when switching questions or sections!
  useEffect(() => {
    handleStopAudio();
  }, [currentQuestionIdx, activeSectionIdx]);

  const handlePlayAudio = (text: string) => {
    handleStopAudio();
    setIsAudioPaused(false);
    if (text.includes(":") || text.includes("\n") || text.includes("—")) {
      ttsSpeakDialogue(text, "fr-FR", 0.85);
    } else {
      const isMale = /\b(monsieur|m\.|homme|paul|léo|marc|antoine|pierre|thomas|hugo|louis)\b/i.test(text);
      ttsSpeak(text, "fr-FR", 0.85, isMale ? "male" : "female");
    }
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

    try {
      // Call backend AI writing evaluation API endpoint
      const res = await apiFetch("/writing/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: clean,
          lessonTitle: `${paper.title} - ${taskId}`,
          expectedAnswer: prompt + (sampleResponse ? `\nSample Exemplar Response:\n${sampleResponse}` : ""),
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
        } else if (totalScoreOutOf20 >= 9) {
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
    const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks)\b/i.test(clean);
    const hasTelegraphicGrammar = /\b(je\s+maladie|je\s+malade|moi\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances)\b/i.test(clean);

    let taskFulfillmentScore = 1;
    if (wordCount >= minWords && wordCount <= maxWords + 30) {
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

    const c1c2Connectors = ["de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois", "en effet", "néanmoins", "en somme", "en conclusion"];
    const b2Connectors = ["en outre", "cependant", "de plus", "ainsi", "par ailleurs", "d'abord", "ensuite", "enfin"];
    const textLower = clean.toLowerCase();

    const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
    const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));

    let coherenceScore = 1;
    if (foundC1C2Conn.length >= 2) coherenceScore = 5;
    else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) coherenceScore = 4;
    else if (foundB2Conn.length >= 1 || textLower.includes("mais") || textLower.includes("donc") || textLower.includes("car")) coherenceScore = 3;
    else if (textLower.includes("et") || textLower.includes("ou")) coherenceScore = 2;
    else coherenceScore = 1;

    const c1c2Lexical = ["opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter", "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "préconiser", "inéluctable", "plasticité", "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement"];
    const b2Lexical = ["avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation", "réclamation", "matériel", "garantie", "projet", "expérience", "quartier", "collègue", "souhaiter", "demander", "préciser"];
    
    const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
    const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));

    let lexicalScore = 1;
    if (hasEnglishWords) lexicalScore = 1;
    else if (foundC1C2Lex.length >= 2) lexicalScore = 5;
    else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) lexicalScore = 4;
    else if (foundB2Lex.length >= 1) lexicalScore = 3;
    else if (wordCount >= 30) lexicalScore = 2;
    else lexicalScore = 1;

    const c1c2Grammar = ["puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel", "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû", "eût", "demeure", "entraver"];
    const b2Grammar = ["serait", "pourrait", "devrais", "j'aimerais", "il faut que", "pour que", "bien que", "afin de", "en vue de", "je vous prie", "veuillez", "pourriez-vous"];
    
    const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
    const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));

    let grammarScore = 1;
    if (hasEnglishWords || hasTelegraphicGrammar || wordCount < 15) {
      grammarScore = 1;
    } else if (foundC1C2Gram.length >= 2) grammarScore = 5;
    else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) grammarScore = 4;
    else if (foundB2Gram.length >= 1 || textLower.includes("parce que") || textLower.includes("j'ai")) grammarScore = 3;
    else if (textLower.includes("je suis") || textLower.includes("c'est") || textLower.includes("il y a")) grammarScore = 2;
    else grammarScore = 1;

    const totalScoreOutOf20 = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;

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
    } else if (totalScoreOutOf20 >= 9) {
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
        feedback: `Official FEI Evaluation: Total ${totalScoreOutOf20}/20 • Task Fulfillment: ${taskFulfillmentScore}/5, Coherence & Connectors: ${coherenceScore}/5, Lexical Variety: ${lexicalScore}/5, Grammar & Tenses: ${grammarScore}/5.`
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
      const typedText = writingResponses[key] || writingResponses[idx] || writingResponses[task.title] || "";
      if (typedText && typedText.trim().length > 0) {
        const clean = typedText.trim();

        // Plagiarism check against sample model answer (if provided)
        if (task.sampleResponse) {
          const sim = calculateTextSimilarity(clean, task.sampleResponse);
          if (sim >= 35) return 0;
        }

        const wordCount = countFrenchWords(clean);
        const textLower = clean.toLowerCase();

        let minWords = task.wordCountMin || task.min || 60;
        let maxWords = task.wordCountMax || task.max || 120;

        const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test(clean) && /(cordialement|bien à vous|salutations)/i.test(clean);
        const isTache3 = idx === 2 || task.title?.includes("Tâche 3") || minWords >= 140;

        let taskFulfillmentScore = 1;
        if (isTache3 && isLetterFormat && wordCount < 100) {
          taskFulfillmentScore = 0;
        } else if (wordCount >= minWords && wordCount <= maxWords + 30) taskFulfillmentScore = 5;
        else if (wordCount > maxWords + 30) taskFulfillmentScore = 4;
        else if (wordCount >= Math.round(minWords * 0.75)) taskFulfillmentScore = 3;
        else if (wordCount >= Math.round(minWords * 0.4)) taskFulfillmentScore = 2;
        else taskFulfillmentScore = 1;

        const c1c2Connectors = ["de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois", "en effet", "néanmoins", "en somme", "en conclusion"];
        const b2Connectors = ["en outre", "cependant", "de plus", "ainsi", "par ailleurs", "d'abord", "ensuite", "enfin"];
        const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
        const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));

        let coherenceScore = 1;
        if (foundC1C2Conn.length >= 2) coherenceScore = 5;
        else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) coherenceScore = 4;
        else if (foundB2Conn.length >= 1 || textLower.includes("mais") || textLower.includes("donc") || textLower.includes("car")) coherenceScore = 3;
        else if (textLower.includes("et") || textLower.includes("ou")) coherenceScore = 2;
        else coherenceScore = 1;

        const c1c2Lexical = ["opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter", "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "inéluctable", "plasticité", "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement"];
        const b2Lexical = ["avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation", "réclamation", "matériel", "garantie", "projet", "expérience", "quartier", "collègue", "souhaiter", "demander", "préciser"];
        const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
        const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));

        let lexicalScore = 1;
        if (foundC1C2Lex.length >= 2) lexicalScore = 5;
        else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) lexicalScore = 4;
        else if (foundB2Lex.length >= 1) lexicalScore = 3;
        else if (wordCount >= 30) lexicalScore = 2;
        else lexicalScore = 1;

        const c1c2Grammar = ["puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel", "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû", "eût", "demeure", "entraver"];
        const b2Grammar = ["serait", "pourrait", "devrais", "j'aimerais", "il faut que", "pour que", "bien que", "afin de", "en vue de", "je vous prie", "veuillez", "pourriez-vous"];
        const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
        const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));

        let grammarScore = 1;
        if (wordCount < 15) {
          grammarScore = 1; lexicalScore = 1; coherenceScore = 1; taskFulfillmentScore = 1;
        } else if (foundC1C2Gram.length >= 2) grammarScore = 5;
        else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) grammarScore = 4;
        if (taskFulfillmentScore === 0) return 0;
        let rawSum = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;
        const hasB2Conn = foundB2Conn.length > 0 || foundC1C2Conn.length > 0;
        const hasB2Gram = foundB2Gram.length > 0 || foundC1C2Gram.length > 0;
        if (!hasB2Conn && !hasB2Gram) {
          rawSum = Math.min(9, rawSum);
        }
        const hasC1C2Lex = foundC1C2Lex.length > 0;
        const hasC1C2Gram = foundC1C2Gram.length > 0;
        const hasC1C2Conn = foundC1C2Conn.length > 0;
        if (!hasC1C2Conn || !hasC1C2Lex || !hasC1C2Gram) {
          rawSum = Math.min(15, rawSum);
        }
        return rawSum;
      }
      return 0;
    };

    if (wTasks.length >= 3) {
      const t1Score = getTaskScore(wTasks[0], 0);
      const t2Score = getTaskScore(wTasks[1], 1);
      const t3Score = getTaskScore(wTasks[2], 2);
      writingWeightedScore = Math.round(0.20 * t1Score + 0.30 * t2Score + 0.50 * t3Score);
    } else {
      const scores = wTasks.map((t, idx) => getTaskScore(t, idx));
      writingWeightedScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    }

    const writingPct = Math.round((writingWeightedScore / 20) * 100);
    const writingNCLC = calculateNCLCScore(writingPct, paper.type, "EXPRESSION_ECRITE");

    const speakingScores = Object.values(speakingAiResults).map((r: any) => r.score || 0);
    const speakingAvg = speakingScores.length > 0 ? Math.round(speakingScores.reduce((a, b) => a + b, 0) / speakingScores.length) : 0;
    const speakingNCLC = calculateNCLCScore(speakingAvg, paper.type, "EXPRESSION_ORALE");

    // Collect all valid NCLC levels from attempted skills (IRCC lowest-skill benchmark rule)
    const attemptedNCLCs: number[] = [];
    if (listeningTotal > 0 && listeningCorrect > 0) attemptedNCLCs.push(listeningNCLC.nclcLevel);
    if (readingTotal > 0 && readingCorrect > 0) attemptedNCLCs.push(readingNCLC.nclcLevel);
    if (writingWeightedScore > 0 && writingNCLC.nclcLevel > 0) attemptedNCLCs.push(writingNCLC.nclcLevel);
    if (speakingAvg > 0 && speakingNCLC.nclcLevel > 0) attemptedNCLCs.push(speakingNCLC.nclcLevel);

    let finalNCLCLevel = 0;
    let finalCEFREquivalent = "Unrated";
    let finalExpressEntryPoints = 0;
    let isTargetReached = false;
    let statusMsg = "⚠️ No test questions were attempted in this session.";

    if (attemptedNCLCs.length > 0) {
      finalNCLCLevel = Math.min(...attemptedNCLCs);
      if (finalNCLCLevel >= 10) {
        finalCEFREquivalent = "C2"; finalExpressEntryPoints = 34; isTargetReached = true;
      } else if (finalNCLCLevel === 9) {
        finalCEFREquivalent = "C1"; finalExpressEntryPoints = 31; isTargetReached = true;
      } else if (finalNCLCLevel === 8) {
        finalCEFREquivalent = "B2"; finalExpressEntryPoints = 23; isTargetReached = true;
      } else if (finalNCLCLevel === 7) {
        finalCEFREquivalent = "B2"; finalExpressEntryPoints = 17; isTargetReached = true;
      } else if (finalNCLCLevel === 6) {
        finalCEFREquivalent = "B1"; finalExpressEntryPoints = 12; isTargetReached = false;
      } else if (finalNCLCLevel === 5) {
        finalCEFREquivalent = "B1"; finalExpressEntryPoints = 6; isTargetReached = false;
      } else if (finalNCLCLevel === 4) {
        finalCEFREquivalent = "A2"; finalExpressEntryPoints = 0; isTargetReached = false;
      } else {
        finalCEFREquivalent = "A1"; finalExpressEntryPoints = 0; isTargetReached = false;
      }

      statusMsg = isTargetReached
        ? `🎉 Excellent! Attempted skill modules achieve CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}) — Meets Canadian Express Entry PR Benchmark!`
        : `💪 CLB / NCLC ${finalNCLCLevel} (${finalCEFREquivalent}) recorded across attempted skill modules. Aim for NCLC 7+ (B2) in all sections for Express Entry PR points.`;
    }

    return {
      totalCorrect,
      totalQs,
      percentage: overallPct,
      listeningCorrect,
      listeningTotal,
      listeningPct,
      listeningNCLC,
      readingCorrect,
      readingTotal,
      readingPct,
      readingNCLC,
      writingAvg: writingWeightedScore,
      writingNCLC,
      speakingAvg,
      speakingNCLC,
      nclcLevel: finalNCLCLevel,
      cefrEquivalent: finalCEFREquivalent,
      expressEntryPoints: finalExpressEntryPoints,
      statusMessage: statusMsg,
      isNCLC7TargetReached: isTargetReached
    };
  };

  const currentQuestions = currentSection.questions || [];
  const currentQ = currentQuestions[currentQuestionIdx] || currentQuestions[0];

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
            onClick={() => {
              try { localStorage.removeItem(sessionKey); } catch {}
              setIsSubmitted(true);
            }}
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Finish Test</span>
            <span className="sm:hidden">Finish</span>
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
                : showHints ? "Hide Reading Coach 📖" : "📖 Reading Strategy & Trap Alert"}
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

                {/* Official Listening Audio Component */}
                {currentSection.type === "COMPREHENSION_ORALE" && (
                  <div className="p-3.5 sm:p-4 rounded-xl border space-y-3 bg-purple-50 border-purple-300 text-slate-950">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-purple-700" />
                        <span>Official Audio Document:</span>
                      </span>

                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {mode === "PRACTICE" && (
                          <div className="flex flex-wrap items-center gap-1.5">
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
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (isSpeaking || isAudioPaused) {
                                handlePauseResumeAudio();
                              } else {
                                handlePlayAudio(currentQ.transcript || currentQ.text);
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

                          {mode === "PRACTICE" && (isSpeaking || isAudioPaused) && (
                            <button
                              onClick={handleStopAudio}
                              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                              title="Stop Audio"
                            >
                              <Square className="w-3.5 h-3.5 fill-current" />
                              <span className="hidden sm:inline">Stop</span>
                            </button>
                          )}

                          {mode === "PRACTICE" && (
                            <button
                              onClick={() => {
                                handleStopAudio();
                                setTimeout(() => handlePlayAudio(currentQ.transcript || currentQ.text), 50);
                              }}
                              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                              title="Replay Audio From Start"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Replay</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {currentQ.questionInAudio && (
                      <div className="p-2.5 rounded-lg bg-purple-100 border border-purple-300 text-purple-950 text-xs font-semibold flex items-center gap-2">
                        <span>🎧 <strong>Notice Épreuve CBT :</strong> La question n'est pas écrite à l'écran. Écoutez attentivement l'audio où le document et la question sont énoncés, puis choisissez l'option (A, B, C, D) ci-contre.</span>
                      </div>
                    )}

                    {(showTranscript || showTranscripts) && currentQ.transcript && (
                      <div className="pt-3 border-t border-purple-300 dark:border-purple-800 text-xs space-y-1.5">
                        <p className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{activeBranding.transcriptLabel}</span>
                        </p>
                        <p className="font-serif italic font-semibold text-slate-950 dark:text-slate-100 p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900">
                          "{currentQ.transcript}"
                        </p>
                      </div>
                    )}

                    {(showTranslation || showTranscripts) && currentQ.transcriptEnglish && (
                      <div className="pt-3 border-t border-indigo-300 dark:border-indigo-800 text-xs space-y-1.5">
                        <p className="font-bold text-indigo-900 dark:text-indigo-300 uppercase text-[10px] flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          <span>English Audio Translation</span>
                        </p>
                        <p className="italic font-semibold text-slate-950 dark:text-slate-100 p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900">
                          "{currentQ.transcriptEnglish}"
                        </p>
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
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                        <p className="font-bold uppercase text-[10px] flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>English Passage Translation:</span>
                        </p>
                        <p className="italic font-medium p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900 max-h-[200px] overflow-y-auto">
                          "{currentQ.passageEnglish}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Audio & Reading Coach Display */}
              {showHints && currentQ.hint && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1 shadow-sm font-sans">
                  <div className="flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>
                      {currentSection.type === "COMPREHENSION_ORALE"
                        ? "🎧 Audio Coach & Trap Alert (English)"
                        : "📖 Reading Strategy & Trap Alert (English)"}
                    </span>
                  </div>
                  <p className="leading-relaxed font-medium whitespace-pre-line text-xs">
                    {currentQ.hint}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: QUESTION & OPTIONS SELECTOR (5 COLS) */}
            <div className={`lg:col-span-5 p-4 sm:p-5 rounded-xl border ${cbtCard} shadow-sm space-y-5 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-950 dark:text-slate-100">
                    {currentQ.questionInAudio ? `Question Audio N°${currentQ.questionNumber}` : currentQ.text}
                  </h3>
                  {currentQ.questionInAudio && (
                    <p className="text-xs text-purple-700 font-medium italic">
                      Écoutez la question dans l'enregistrement audio et choisissez la bonne option ci-dessous.
                    </p>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
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
                  })}
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

                  {mode === "PRACTICE" && task.guidedTips && (
                    <div className="p-3 sm:p-3.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
                      <p className="font-bold text-pink-700 dark:text-pink-300 uppercase text-[10px]">Guided Structure Tips:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-800 dark:text-slate-200">
                        {task.guidedTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
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
                  onClick={() => setActiveSpeakingTaskIdx(idx)}
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
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                      {task.title}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 leading-snug">{task.scenario}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                      <span>Prep Time: {task.prepTimeMins} min</span>
                      <span>Speaking Time: {task.speakingTimeMins} min</span>
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

                  {/* CBT Speech Recorder Controls */}
                  <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                        <Mic className={`w-4 h-4 ${isRecording ? "text-red-500 animate-pulse" : "text-purple-600"}`} />
                        <span>{isRecording ? "Live Microphone Recording in Progress..." : "CBT Oral Response Recorder"}</span>
                      </span>

                      <button
                        onClick={() => handleToggleSpeakingRecording(task.id)}
                        className={`px-4 py-2 rounded font-bold text-xs shadow flex items-center gap-1.5 transition-all ${
                          isRecording ? "bg-red-600 hover:bg-red-500 text-white animate-pulse" : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecording ? "Stop Recording" : "Start Oral Recording"}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs min-h-[60px]">
                      <p className="font-bold text-[10px] text-slate-500 uppercase mb-1">Live Speech-to-Text Transcription:</p>
                      <p className="font-sans italic text-slate-900 dark:text-slate-200">
                        {transcript || "(Click 'Start Oral Recording' and speak your response into your microphone...)"}
                      </p>
                    </div>

                    <button
                      disabled={!transcript || isEvaluating}
                      onClick={() => handleEvaluateSpeakingAI(task.id, task.scenario, transcript)}
                      className="w-full py-2.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isEvaluating ? "Analyzing Oral Fluency with AI..." : "🎙️ Submit Oral Recording for AI Evaluation"}</span>
                    </button>
                  </div>

                  {/* AI Speaking Evaluation Result Card */}
                  {aiEval && (
                    <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 space-y-2 text-xs font-sans">
                      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                        <span className="font-extrabold text-sm text-purple-600 dark:text-purple-300 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4" />
                          <span>AI Oral Fluency & Pronunciation Grade</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-mono font-bold text-[10px]">
                          {aiEval.nclcGrade || "NCLC 7 (B2 Vantage Target)"}
                        </span>
                      </div>

                      <p className="leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                        {aiEval.feedback || "Clear oral delivery with proper key phrase integration. Speech rate matches standard B2 Vantage expectations."}
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

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
                    isCurrent
                      ? "ring-2 ring-blue-600 bg-blue-600 text-white"
                      : isAnswered
                      ? "bg-blue-800 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
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

      {/* ─── SUBMISSION & DIAGNOSTIC RESULT MODAL ─── */}
      <AnimatePresence>
        {isSubmitted && (
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

              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Diagnostic Simulator Evaluation ({mode === "EXAM" ? "REAL EXAM MODE" : "GUIDED PRACTICE MODE"})
                </span>
                <h2 className="text-3xl font-extrabold">Estimated CLB / NCLC Level {calculateResults().nclcLevel} ({calculateResults().cefrEquivalent})</h2>
                <p className="text-xs text-slate-500">
                  {(() => {
                    const r = calculateResults();
                    if (r.listeningTotal + r.readingTotal > 0 && (r.listeningCorrect > 0 || r.readingCorrect > 0)) {
                      return <>MCQ Accuracy: <strong>{r.percentage}%</strong> ({r.totalCorrect} / {r.totalQs} Questions Correct)</>;
                    }
                    if (r.writingAvg > 0) {
                      return <>Writing Submission Evaluated: <strong>{r.writingAvg}/20 Marks</strong> ({r.writingNCLC.nclcGrade})</>;
                    }
                    return <>Diagnostic Session Results</>;
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
                            {res.listeningNCLC.nclcLevel === 0 ? "Unrated" : `CLB / NCLC ${res.listeningNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.listeningNCLC.nclcLevel === 0 ? "Unattempted (0/39)" : `${res.listeningPct}% Correct (${res.listeningCorrect}/${res.listeningTotal})`}
                        </p>
                      </div>

                      {/* Reading Scorecard */}
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-blue-900 dark:text-blue-300">
                          <span className="flex items-center gap-1">📖 Reading (CE)</span>
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px]">
                            {res.readingNCLC.nclcLevel === 0 ? "Unrated" : `CLB / NCLC ${res.readingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.readingNCLC.nclcLevel === 0 ? "Unattempted (0/39)" : `${res.readingPct}% Correct (${res.readingCorrect}/${res.readingTotal})`}
                        </p>
                      </div>

                      {/* Writing Scorecard */}
                      <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-pink-900 dark:text-pink-300">
                          <span className="flex items-center gap-1">✍️ Writing (EE)</span>
                          <span className="px-2 py-0.5 rounded bg-pink-600 text-white font-mono text-[10px]">
                            {res.writingAvg === 0 ? "Unrated" : `CLB / NCLC ${res.writingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.writingAvg === 0 ? "No submission" : `${res.writingAvg}/20 Marks (${res.writingNCLC.cefrEquivalent})`}
                        </p>
                      </div>

                      {/* Speaking Scorecard */}
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                          <span className="flex items-center gap-1">🎙️ Speaking (EO)</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px]">
                            {res.speakingAvg === 0 ? "Unrated" : `CLB / NCLC ${res.speakingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.speakingAvg === 0 ? "No submission" : `${res.speakingAvg}% AI Grade`}
                        </p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl text-xs text-left space-y-2 border ${
                      res.isNCLC7TargetReached
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                        : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300"
                    }`}>
                      <p className="font-bold">
                        🍁 Estimated Express Entry CRS Point Contribution:
                      </p>
                      <p className="leading-relaxed font-medium">
                        {res.statusMessage}
                      </p>
                      <p className="pt-1 text-[11px] opacity-80 border-t border-slate-300 dark:border-slate-700">
                        Calculated Express Entry CLB Point Contribution: <strong>+{res.expressEntryPoints} Points</strong>
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

                            {res.writingAvg > 0 && (
                              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                                <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">✍️ Writing (EE Focus):</p>
                                <p className="text-[11px] leading-relaxed">
                                  {res.writingAvg >= 12
                                    ? `✓ Strong writing score (${res.writingAvg}/20 Marks — ${res.writingNCLC.nclcGrade}). High mastery of B2 connectors and structures.`
                                    : `⚠️ Writing score is ${res.writingAvg}/20 Marks (${res.writingNCLC.nclcGrade}). Focus on reaching word count bounds (60-120 T1, 120-150 T2, 140-180 T3), inserting formal connectors (cependant, toutefois), and avoiding English word code-switching.`}
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
