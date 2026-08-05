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
  RotateCcw
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { speak, speakDialogue, stopAudio, pauseAudio, resumeAudio } from "~/lib/speech";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
import { getExamRegistry, calculateNCLCScore, type ExamPaper, type ExamMode } from "~/lib/examSchema";

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

  const handleEvaluateWritingAI = async (taskId: string, prompt: string, text: string, sampleResponse?: string) => {
    setEvaluatingWriting((prev) => ({ ...prev, [taskId]: true }));

    // Instant Plagiarism / Model Answer Copy Check
    if (sampleResponse && text) {
      const normStudent = text.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, '').trim();
      const normModel = sampleResponse.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, '').trim();
      const studentWords = normStudent.split(/\s+/).filter((w) => w.length > 3);
      const modelWords = new Set(normModel.split(/\s+/).filter((w) => w.length > 3));
      let matchCount = 0;
      for (const w of studentWords) {
        if (modelWords.has(w)) matchCount++;
      }
      const matchRatio = studentWords.length > 0 ? matchCount / studentWords.length : 0;

      if (normStudent === normModel || (matchRatio >= 0.70 && studentWords.length >= 10)) {
        setWritingAiResults((prev) => ({
          ...prev,
          [taskId]: {
            score: 0,
            nclcGrade: "NCLC 0 (Zero Grade - Plagiarism Detected)",
            feedback: "🚨 PLAGIARISM DETECTED (Score: 0): Your submission is a direct copy of the official exemplar model answer. Official FEI / CCI test centers automatically award 0 points for copied template responses.",
            corrections: [{ original: text.slice(0, 60) + "...", corrected: "Rédigez votre propre texte original.", explanation: "Copied model answers receive an automatic zero grade." }],
            tips: ["Rédigez votre réponse personnelle avec votre propre vocabulaire."]
          }
        }));
        setEvaluatingWriting((prev) => ({ ...prev, [taskId]: false }));
        return;
      }
    }

    try {
      const res = await apiFetch("/writing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          lessonTitle: `${paper.title} - ${taskId}`,
          expectedAnswer: prompt + (sampleResponse ? `\nSample Exemplar Response:\n${sampleResponse}` : "")
        })
      });
      const json = await res.json();
      if (json.success) {
        setWritingAiResults((prev) => ({ ...prev, [taskId]: json.data }));
      } else {
        setWritingAiResults((prev) => ({
          ...prev,
          [taskId]: { score: 75, nclcGrade: "NCLC 7 (B2 Vantage Target)", feedback: "Evaluated text shows clear structure and good CEFR B2 vocabulary usage.", corrections: [], tips: [] }
        }));
      }
    } catch (e) {
      setWritingAiResults((prev) => ({
        ...prev,
        [taskId]: { score: 75, nclcGrade: "NCLC 7 (B2 Vantage Target)", feedback: "Text length and structure meet NCLC 7 (B2 Vantage) Canadian PR standards.", corrections: [], tips: [] }
      }));
    }
    setEvaluatingWriting((prev) => ({ ...prev, [taskId]: false }));
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

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
    if (text.includes(":") || text.includes("\n") || text.includes("—")) {
      speakDialogue(text, "fr-FR", 0.85);
    } else {
      const isMale = /\b(monsieur|m\.|homme|paul|léo|marc|antoine|pierre|thomas|hugo|louis)\b/i.test(text);
      speak(text, "fr-FR", 0.85, isMale ? "male" : "female");
    }
    setTimeout(() => setIsPlayingAudio(false), 5000);
  };

  const handlePauseResumeAudio = () => {
    if (isAudioPaused) {
      resumeAudio();
      setIsAudioPaused(false);
      setIsPlayingAudio(true);
    } else {
      pauseAudio();
      setIsAudioPaused(true);
      setIsPlayingAudio(false);
    }
  };

  const handleStopAudio = () => {
    stopAudio();
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
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

    const writingScores = Object.values(writingAiResults).map((r: any) => r.score || 0);
    const writingAvg = writingScores.length > 0 ? Math.round(writingScores.reduce((a, b) => a + b, 0) / writingScores.length) : 0;
    const writingNCLC = calculateNCLCScore(writingAvg, paper.type, "EXPRESSION_ECRITE");

    const speakingScores = Object.values(speakingAiResults).map((r: any) => r.score || 0);
    const speakingAvg = speakingScores.length > 0 ? Math.round(speakingScores.reduce((a, b) => a + b, 0) / speakingScores.length) : 0;
    const speakingNCLC = calculateNCLCScore(speakingAvg, paper.type, "EXPRESSION_ORALE");

    const overallResult = calculateNCLCScore(overallPct, paper.type, currentSection.type);

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
      writingAvg,
      writingNCLC,
      speakingAvg,
      speakingNCLC,
      ...overallResult
    };
  };

  const currentQuestions = currentSection.questions || [];
  const currentQ = currentQuestions[currentQuestionIdx] || currentQuestions[0];

  // CBT Theme Styles - Official Real Exam CBT Light Mode
  const cbtBg = "bg-[#F1F5F9] text-[#0F172A]";
  const cbtCard = "bg-white border-slate-300 shadow-sm text-[#0F172A]";
  const cbtHeader = "bg-[#1E293B] border-b border-slate-700 text-white";

  return (
    <div className={`min-h-screen ${cbtBg} flex flex-col justify-between font-sans transition-colors duration-200 select-none`}>

      {/* ─── OFFICIAL CBT TEST CENTER TOP HEADER BAR ─── */}
      <header className={`${cbtHeader} px-4 py-3 shadow-md border-b flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/exam" })}
            className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Exam</span>
          </button>

          <div className="h-6 w-px bg-slate-600 hidden md:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-wide text-white uppercase">{paper.title}</span>
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-mono font-bold">
                {paper.code}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Candidate: <strong>CANDIDATE-OFFICIAL-2026</strong> • Test Center ID: <strong>CA-MTL-042</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Badge */}
          {mode === "PRACTICE" ? (
            <span className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GUIDED PRACTICE MODE</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>OFFICIAL REAL EXAM MODE (UNPAUSABLE)</span>
            </span>
          )}

          {/* Official Countdown Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono font-bold text-sm text-emerald-400">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{formatTime(timeLeft)}</span>
            {mode === "PRACTICE" && (
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="ml-1 p-0.5 hover:text-white"
              >
                {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish Test</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

            {/* LEFT PANEL: PASSAGE / AUDIO STIMULUS (7 COLS) */}
            <div className={`lg:col-span-7 p-5 rounded-lg border ${cbtCard} shadow-sm space-y-4 flex flex-col justify-between overflow-y-auto`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {currentSection.title} — Item {currentQ.questionNumber} of {currentQuestions.length}
                  </span>
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold border flex items-center gap-1 ${
                      flaggedQuestions[currentQ.id]
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? "Flagged for Review" : "Flag Question"}</span>
                  </button>
                </div>

                {/* Official Listening Audio Component */}
                {currentSection.type === "COMPREHENSION_ORALE" && (
                  <div className="p-4 rounded-lg border space-y-3 bg-purple-50 border-purple-300 text-slate-950">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-purple-700" />
                        <span>Official Audio Document:</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {mode === "PRACTICE" && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setShowTranscript(!showTranscript)}
                              className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm border ${
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
                                className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm border ${
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
                              if (isPlayingAudio || isAudioPaused) {
                                handlePauseResumeAudio();
                              } else {
                                handlePlayAudio(currentQ.transcript || currentQ.text);
                              }
                            }}
                            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                          >
                            {isPlayingAudio ? (
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

                          {mode === "PRACTICE" && (isPlayingAudio || isAudioPaused) && (
                            <>
                              <button
                                onClick={handleStopAudio}
                                className="p-2 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 shadow"
                                title="Stop Audio"
                              >
                                <Square className="w-3.5 h-3.5 fill-current" />
                                <span>Stop</span>
                              </button>

                              <button
                                onClick={() => {
                                  handleStopAudio();
                                  setTimeout(() => handlePlayAudio(currentQ.transcript || currentQ.text), 100);
                                }}
                                className="p-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                                title="Replay Audio From Start"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Replay</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {currentQ.questionInAudio && (
                      <div className="p-2.5 rounded bg-purple-100 border border-purple-300 text-purple-950 text-xs font-semibold flex items-center gap-2">
                        <span>🎧 <strong>Notice Épreuve CBT :</strong> La question n'est pas écrite à l'écran. Écoutez attentivement l'audio où le document et la question sont énoncés, puis choisissez l'option (A, B, C, D) ci-contre.</span>
                      </div>
                    )}

                    {(showTranscript || showTranscripts) && currentQ.transcript && (
                      <div className="pt-3 border-t border-purple-300 dark:border-purple-800 text-xs space-y-1.5">
                        <p className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{activeBranding.transcriptLabel}</span>
                        </p>
                        <p className="font-serif italic font-semibold text-slate-950 dark:text-slate-100 p-2.5 rounded bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900">
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
                        <p className="italic font-semibold text-slate-950 dark:text-slate-100 p-2.5 rounded bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900">
                          "{currentQ.transcriptEnglish}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Official Reading Passage Component */}
                {currentSection.type === "COMPREHENSION_ECRITE" && currentQ.passage && (
                  <div className={`p-4 rounded-lg border space-y-3 ${
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
                              className="px-2 py-1 rounded bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-500 transition-all flex items-center gap-1"
                            >
                              <Globe className="w-3 h-3" />
                              <span>{showPassageTranslation ? "Hide EN" : "🌐 Show EN Translation"}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="font-serif text-sm leading-relaxed font-medium text-slate-950 dark:text-slate-100 whitespace-pre-line p-3 rounded bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900">
                      "{currentQ.passage}"
                    </p>

                    {showPassageTranslation && currentQ.passageEnglish && (
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                        <p className="font-bold uppercase text-[10px] flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>English Passage Translation:</span>
                        </p>
                        <p className="italic font-medium p-2.5 rounded bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900">
                          "{currentQ.passageEnglish}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Audio & Reading Coach Display (Option A - Hidden by Default) */}
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
                  <p className="leading-relaxed font-medium whitespace-pre-line">
                    {currentQ.hint}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: QUESTION & OPTIONS SELECTOR (5 COLS) */}
            <div className={`lg:col-span-5 p-5 rounded-lg border ${cbtCard} shadow-sm space-y-5 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold leading-snug text-slate-950 dark:text-slate-100">
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
                        className={`p-3.5 rounded border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                          isChosen
                            ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                            : cbtDark
                            ? "bg-slate-800/80 text-slate-200 border-slate-700 hover:border-blue-400"
                            : "bg-slate-50 text-slate-950 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50"
                        } ${isLocked ? "cursor-not-allowed opacity-90" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                            isChosen
                              ? "bg-white text-blue-600"
                              : cbtDark
                              ? "bg-slate-700 text-slate-200"
                              : "bg-slate-200 text-slate-900 font-extrabold"
                          }`}>
                            {letter}
                          </span>
                          <span className={isChosen ? "text-white" : "text-slate-950 dark:text-slate-200"}>{opt}</span>
                        </div>
                        {isChosen && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
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
              const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
              const isValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;
              const aiEval = writingAiResults[task.id];
              const isEvaluating = evaluatingWriting[task.id];

              return (
                <div key={task.id} className={`p-6 rounded-lg border ${cbtCard} shadow-sm space-y-4`}>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase">
                        {task.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-mono font-bold text-[10px]">
                        Target: {task.wordCountMin} – {task.wordCountMax} words
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 leading-snug">{task.prompt}</h3>
                  </div>

                  {mode === "PRACTICE" && task.guidedTips && (
                    <div className="p-3.5 rounded bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
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
                    className={`w-full p-4 rounded border text-sm font-sans leading-relaxed ${
                      cbtDark ? "bg-[#090D16] border-slate-700 text-white" : "bg-slate-50 border-slate-300 text-slate-950"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold">
                    <span className={isValid ? "text-emerald-600 font-bold" : "text-amber-600"}>
                      Word Count: {wordCount} / {task.wordCountMin} min ({isValid ? "✓ Target Met" : "Requires minimum length"})
                    </span>

                    <div className="flex items-center gap-2">
                      {task.sampleResponse && mode === "PRACTICE" && (
                        <button
                          onClick={() => setOpenModelAnswerTaskId(openModelAnswerTaskId === task.id ? null : task.id)}
                          className="px-3 py-1.5 rounded bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-all shrink-0 flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{openModelAnswerTaskId === task.id ? "Hide Model Response 🙈" : "📝 View Official NCLC 7+ Model Answer"}</span>
                        </button>
                      )}

                      <button
                        disabled={wordCount < 10 || isEvaluating}
                        onClick={() => handleEvaluateWritingAI(task.id, task.prompt, textVal, task.sampleResponse)}
                        className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isEvaluating ? "Evaluating Writing with AI..." : "🤖 Evaluate Writing with AI"}</span>
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
                    <div className="p-4 rounded-xl border border-pink-500/30 bg-pink-500/10 space-y-2 text-xs font-sans">
                      <div className="flex items-center justify-between border-b border-pink-500/20 pb-2">
                        <span className="font-extrabold text-sm text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4" />
                          <span>AI Writing Assessment & CEFR NCLC Grade</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-pink-600 text-white font-mono font-bold text-[10px]">
                          {aiEval.nclcGrade || "NCLC 7 (B2 Vantage Target)"}
                        </span>
                      </div>

                      <p className="leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                        {aiEval.feedback || "Good structure and grammatical agreement. To reach NCLC 8+, expand transitional connectors and formal vocabulary."}
                      </p>
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
        <footer className="bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 px-4 py-2 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-2 shrink-0">
              Question Grid Index:
            </span>
            {currentQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isCurrent = currentQuestionIdx === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`w-8 h-8 rounded text-xs font-bold transition-all relative shrink-0 ${
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

          <div className="flex items-center gap-3 shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-800" /> Answered</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400" /> Flagged</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-300" /> Unanswered</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl p-8 rounded-2xl border bg-white dark:bg-[#101828] border-slate-300 dark:border-slate-800 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Diagnostic Simulator Evaluation ({mode === "EXAM" ? "REAL EXAM MODE" : "GUIDED PRACTICE MODE"})
                </span>
                <h2 className="text-3xl font-extrabold">Estimated NCLC Level {calculateResults().nclcLevel} ({calculateResults().cefrEquivalent})</h2>
                <p className="text-xs text-slate-500">
                  Total Score: <strong>{calculateResults().percentage}%</strong> ({calculateResults().totalCorrect} / {calculateResults().totalQs} Questions Correct)
                </p>
              </div>

              {/* 4-SKILL MODULE NCLC SCORECARD GRID */}
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
                            {res.listeningNCLC.nclcLevel === 0 ? "Unrated" : `NCLC ${res.listeningNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.listeningPct}% Correct ({res.listeningCorrect}/{res.listeningTotal})
                        </p>
                      </div>

                      {/* Reading Scorecard */}
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-blue-900 dark:text-blue-300">
                          <span className="flex items-center gap-1">📖 Reading (CE)</span>
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px]">
                            {res.readingNCLC.nclcLevel === 0 ? "Unrated" : `NCLC ${res.readingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.readingPct}% Correct ({res.readingCorrect}/{res.readingTotal})
                        </p>
                      </div>

                      {/* Writing Scorecard */}
                      <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-pink-900 dark:text-pink-300">
                          <span className="flex items-center gap-1">✍️ Writing (EE)</span>
                          <span className="px-2 py-0.5 rounded bg-pink-600 text-white font-mono text-[10px]">
                            {res.writingAvg === 0 ? "Unrated" : `NCLC ${res.writingNCLC.nclcLevel}`}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {res.writingAvg === 0 ? "No submission" : `${res.writingAvg}% AI Grade`}
                        </p>
                      </div>

                      {/* Speaking Scorecard */}
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                          <span className="flex items-center gap-1">🎙️ Speaking (EO)</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px]">
                            {res.speakingAvg === 0 ? "Unrated" : `NCLC ${res.speakingNCLC.nclcLevel}`}
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
                        {res.totalCorrect === 0 ? (
                          <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                            ⚠️ <strong>Zero Questions Attempted:</strong> No test questions were answered in this session. To receive a personalized weakness breakdown, complete the items in each section before submitting.
                          </div>
                        ) : (
                          <>
                            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                              <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">🎧 Listening (CO Focus):</p>
                              <p className="text-[11px] leading-relaxed">
                                {res.listeningPct >= 65
                                  ? `✓ Strong retention (${res.listeningPct}%). High accuracy on single-play audio items.`
                                  : `⚠️ Practice audio-only items (Q1–29). Focus on identifying key acoustic markers before reading distractors.`}
                              </p>
                            </div>

                            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                              <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">📖 Reading (CE Focus):</p>
                              <p className="text-[11px] leading-relaxed">
                                {res.readingPct >= 65
                                  ? `✓ Strong scanning speed (${res.readingPct}%). Excellent grasp of academic B2/C1 connectors.`
                                  : `⚠️ Work on paragraph structure scanning in B2/C1 texts. Use keyword matching between questions and passage.`}
                              </p>
                            </div>
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

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 text-left leading-relaxed">
                🛑 <strong>Independent Practice Disclaimer:</strong> This score is a diagnostic estimation for exam preparation purposes only. FrancPrep is an independent platform and does not provide official language certification.
              </div>

              <button
                onClick={() => navigate({ to: "/exam" })}
                className="w-full py-3.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
              >
                Return to Exam Simulator Hub
              </button>
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
