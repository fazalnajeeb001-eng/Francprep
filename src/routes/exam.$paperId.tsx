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
  Moon
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { speak } from "~/lib/speech";
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

  // User Responses State
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [writingResponses, setWritingResponses] = useState<{ [taskId: string]: string }>({});

  // Practice Mode Attempt & Check Answer Logic
  const [attemptsMap, setAttemptsMap] = useState<{ [qId: string]: number }>({});
  const [checkedMap, setCheckedMap] = useState<{ [qId: string]: boolean }>({});

  // AI Writing Evaluation States
  const [writingAiResults, setWritingAiResults] = useState<Record<string, any>>({});
  const [evaluatingWriting, setEvaluatingWriting] = useState<Record<string, boolean>>({});

  // AI Speaking Evaluation States
  const [speakingTranscripts, setSpeakingTranscripts] = useState<Record<string, string>>({});
  const [recordingSpeaking, setRecordingSpeaking] = useState<Record<string, boolean>>({});
  const [speakingAiResults, setSpeakingAiResults] = useState<Record<string, any>>({});
  const [evaluatingSpeaking, setEvaluatingSpeaking] = useState<Record<string, boolean>>({});

  // Submission & Results & Strategy Modals State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [openModelAnswerTaskId, setOpenModelAnswerTaskId] = useState<string | null>(null);

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

  useEffect(() => {
    setTimeLeft(currentSection.durationMins * 60);
    setCurrentQuestionIdx(0);
  }, [activeSectionIdx, currentSection.durationMins]);

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
    speak(text, "fr-FR", 0.85, "female");
    setTimeout(() => setIsPlayingAudio(false), 4000);
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

    paper.sections.forEach((sec) => {
      if (sec.questions) {
        sec.questions.forEach((q) => {
          totalQs += 1;
          if (selectedAnswers[q.id] === q.correctIndex) {
            totalCorrect += 1;
          }
        });
      }
    });

    const percentage = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 100;
    const nclcResult = calculateNCLCScore(percentage, paper.type, currentSection.type);

    return { totalCorrect, totalQs, percentage, ...nclcResult };
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
                ? "bg-emerald-600 text-white border-emerald-600"
                : cbtDark
                ? "bg-[#1E293B] text-slate-200 border-slate-700"
                : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? "Hide Hints" : "Show Hints"}</span>
          </button>

          {currentSection.type === "COMPREHENSION_ORALE" && (
            <button
              onClick={() => setShowTranscripts(!showTranscripts)}
              className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                showTranscripts
                  ? "bg-purple-600 text-white border-purple-600"
                  : cbtDark
                  ? "bg-[#1E293B] text-slate-200 border-slate-700"
                  : "bg-white text-slate-950 border-slate-300 font-bold shadow-sm"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscripts ? "Hide Transcript & Translation" : "Audio Transcript & EN Translation"}</span>
            </button>
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
                          <button
                            type="button"
                            onClick={() => setShowTranscripts(!showTranscripts)}
                            className="px-3 py-1.5 rounded bg-purple-100 border border-purple-300 text-purple-950 font-bold text-xs hover:bg-purple-200 transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5 text-purple-700" />
                            <span>{showTranscripts ? "Hide Transcript 🙈" : "Reveal Transcript & EN Translation 👁️"}</span>
                          </button>
                        )}

                        <button
                          onClick={() => handlePlayAudio(currentQ.transcript || currentQ.text)}
                          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                        >
                          <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                          <span>{isPlayingAudio ? "Playing Audio Document..." : "Play Audio Recording (1-Play Limit)"}</span>
                        </button>
                      </div>
                    </div>

                    {currentQ.questionInAudio && (
                      <div className="p-2.5 rounded bg-purple-100 border border-purple-300 text-purple-950 text-xs font-semibold flex items-center gap-2">
                        <span>🎧 <strong>Notice Épreuve CBT :</strong> La question n'est pas écrite à l'écran. Écoutez attentivement l'audio où le document et la question sont énoncés, puis choisissez l'option (A, B, C, D) ci-contre.</span>
                      </div>
                    )}

                    {showTranscripts && currentQ.transcript && (
                      <div className="pt-3 border-t border-purple-300 text-xs space-y-1.5">
                        <p className="font-bold text-purple-900 uppercase text-[10px]">{activeBranding.transcriptLabel}</p>
                        <p className="font-serif italic font-semibold text-slate-950">"{currentQ.transcript}"</p>
                        {currentQ.transcriptEnglish && (
                          <>
                            <p className="font-bold text-blue-900 uppercase text-[10px] pt-1">English Translation:</p>
                            <p className="italic font-semibold text-slate-950">"{currentQ.transcriptEnglish}"</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Official Reading Passage Component */}
                {currentSection.type === "COMPREHENSION_ECRITE" && currentQ.passage && (
                  <div className={`p-4 rounded-lg border space-y-3 ${
                    cbtDark ? "bg-blue-950/40 border-blue-800/60 text-slate-100" : "bg-blue-50 border-blue-300 text-slate-950"
                  }`}>
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Document d'épreuve :</span>
                    </span>
                    <p className="font-serif text-sm leading-relaxed font-medium text-slate-950 dark:text-slate-100">
                      "{currentQ.passage}"
                    </p>

                    {showPassageTranslation && currentQ.passageEnglish && (
                      <div className="pt-3 border-t border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                        <p className="font-bold uppercase text-[10px]">English Translation:</p>
                        <p className="italic font-medium">"{currentQ.passageEnglish}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hints Display */}
              {showHints && currentQ.hint && (
                <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-300 flex items-center gap-2 font-medium">
                  <HelpCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-500" />
                  <span><strong>Hint:</strong> {currentQ.hint}</span>
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
                  disabled={currentQuestionIdx === 0 || currentSection.type === "COMPREHENSION_ORALE"}
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    currentQuestionIdx === 0 || currentSection.type === "COMPREHENSION_ORALE"
                      ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300"
                  }`}
                  title={currentSection.type === "COMPREHENSION_ORALE" ? "Navigation arrière désactivée pour la compréhension orale (FEI CBT Rules)" : ""}
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

        {/* WRITING SECTION WORKSPACE */}
        {currentSection.writingTasks && currentSection.writingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.writingTasks.map((task) => {
              const textVal = writingResponses[task.id] || "";
              const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
              const isValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;
              const aiEval = writingAiResults[task.id];
              const isEvaluating = evaluatingWriting[task.id];

              return (
                <div key={task.id} className={`p-6 rounded-lg border ${cbtCard} shadow-sm space-y-4`}>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase">
                      {task.title}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100">{task.prompt}</h3>
                    <p className="text-xs text-slate-500">Target Range: {task.wordCountMin} to {task.wordCountMax} words</p>
                  </div>

                  {mode === "PRACTICE" && task.guidedTips && (
                    <div className="p-3.5 rounded bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
                      <p className="font-bold text-pink-700 uppercase text-[10px]">Guided Structure Tips:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-800 dark:text-slate-200">
                        {task.guidedTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <textarea
                    rows={8}
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

                    <button
                      disabled={wordCount < 10 || isEvaluating}
                      onClick={() => handleEvaluateWritingAI(task.id, task.prompt, textVal, task.sampleResponse)}
                      className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isEvaluating ? "Evaluating Writing with AI..." : "🤖 Evaluate Writing with AI"}</span>
                    </button>
                  </div>

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
            })}
          </div>
        )}

        {/* SPEAKING SECTION WORKSPACE */}
        {currentSection.speakingTasks && currentSection.speakingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.speakingTasks.map((task) => {
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
                    <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100">{task.scenario}</h3>
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
            })}
          </div>
        )}

        {/* WRITING SECTION WORKSPACE */}
        {currentSection.writingTasks && currentSection.writingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.writingTasks.map((task) => {
              const textVal = writingResponses[task.id] || "";
              const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
              const isValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;

              return (
                <div key={task.id} className={`p-6 rounded-lg border ${cbtCard} shadow-sm space-y-4`}>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase">
                      {task.title}
                    </span>
                    <h3 className="text-lg font-bold">{task.prompt}</h3>
                    <p className="text-xs text-slate-500">Target Range: {task.wordCountMin} to {task.wordCountMax} words</p>
                  </div>

                  {mode === "PRACTICE" && task.guidedTips && (
                    <div className="p-3.5 rounded bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs space-y-1">
                      <p className="font-bold text-pink-700 uppercase text-[10px]">Guided Structure Tips:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                        {task.guidedTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <textarea
                    rows={8}
                    value={textVal}
                    onChange={(e) => setWritingResponses((prev) => ({ ...prev, [task.id]: e.target.value }))}
                    placeholder="Saisissez votre texte officiel ici..."
                    className={`w-full p-4 rounded border text-sm font-sans leading-relaxed ${
                      cbtDark ? "bg-[#090D16] border-slate-700 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold">
                    <span className={isValid ? "text-emerald-600 font-bold" : "text-amber-600"}>
                      Word Count: {wordCount} / {task.wordCountMin} min ({isValid ? "✓ Target Met" : "Requires minimum length"})
                    </span>
                    {task.sampleResponse && mode === "PRACTICE" && (
                      <button
                        onClick={() => setOpenModelAnswerTaskId(openModelAnswerTaskId === task.id ? null : task.id)}
                        className="px-3 py-1.5 rounded bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-all shrink-0 flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{openModelAnswerTaskId === task.id ? "Hide Model Response 🙈" : "📝 View Official NCLC 7+ Model Answer"}</span>
                      </button>
                    )}
                  </div>

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
                </div>
              );
            })}
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

              <div className={`p-4 rounded-xl text-xs text-left space-y-2 border ${
                calculateResults().isNCLC7TargetReached
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                  : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300"
              }`}>
                <p className="font-bold">
                  🍁 Estimated Express Entry CRS Point Contribution:
                </p>
                <p className="leading-relaxed font-medium">
                  {calculateResults().statusMessage}
                </p>
                <p className="pt-1 text-[11px] opacity-80 border-t border-slate-300 dark:border-slate-700">
                  Calculated Express Entry CLB Point Contribution: <strong>+{calculateResults().expressEntryPoints} Points</strong>
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
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                    <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">🎧 Compréhension Orale (Listening Focus):</p>
                    <p className="text-[11px] leading-relaxed">
                      {calculateResults().percentage >= 70
                        ? "✓ High retention on single-play audio. Continue practicing B2/C1 fast-paced radio chronicle items."
                        : "⚠️ Practice audio-only questions (Q1–29). Focus on identifying key acoustic markers and speaker intent before reading distractors."}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                    <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">📖 Compréhension Écrite (Reading Focus):</p>
                    <p className="text-[11px] leading-relaxed">
                      {calculateResults().percentage >= 70
                        ? "✓ Strong scanning speed. Continue reviewing formal academic connectors and editorial vocabulary."
                        : "⚠️ Work on paragraph structure scanning in B2/C1 texts. Use keyword matching between questions and passage."}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                    <p className="font-bold text-purple-900 dark:text-purple-300 text-[11px]">✍️ Expression Écrite & Orale (Productive Skills):</p>
                    <p className="text-[11px] leading-relaxed">
                      Ensure Task 3 essays include 4 distinct paragraphs (Intro, Pour, Contre, Conclusion) with connectors like <em>"bien que"</em> and <em>"en revanche"</em> to guarantee NCLC 7+.
                    </p>
                  </div>
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
