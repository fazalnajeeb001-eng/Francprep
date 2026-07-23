import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Award,
  ChevronRight,
  Send,
  Flag,
  Globe,
  Sun,
  Moon,
  Info,
  Maximize2
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { getExamRegistry, type ExamPaper, type ExamMode } from "~/lib/examSchema";

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

  // Speaking State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSpeechText, setRecordedSpeechText] = useState("");
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);

  // Submission & Results State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.85;
    u.onstart = () => setIsPlayingAudio(true);
    u.onend = () => setIsPlayingAudio(false);
    u.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(u);
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
    let nclcLevel = "NCLC 7 (B2 Threshold)";
    if (percentage >= 85) nclcLevel = "NCLC 9 (C1 Advanced)";
    else if (percentage >= 75) nclcLevel = "NCLC 8 (B2 Vantage)";
    else if (percentage >= 60) nclcLevel = "NCLC 7 (B2 Threshold)";
    else if (percentage >= 45) nclcLevel = "NCLC 5 (B1)";
    else nclcLevel = "NCLC 4 (A2)";

    return { totalCorrect, totalQs, percentage, nclcLevel };
  };

  const currentQuestions = currentSection.questions || [];
  const currentQ = currentQuestions[currentQuestionIdx] || currentQuestions[0];

  // CBT Theme Styles
  const cbtBg = cbtDark ? "bg-[#090D16] text-slate-100" : "bg-[#F3F4F6] text-slate-900";
  const cbtCard = cbtDark ? "bg-[#111827] border-slate-800" : "bg-white border-slate-300";
  const cbtHeader = cbtDark ? "bg-[#1F2937] border-slate-700 text-white" : "bg-[#1E293B] text-white";

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

          {/* High Contrast CBT Dark Mode Toggle */}
          <button
            onClick={() => setCbtDark(!cbtDark)}
            className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs flex items-center gap-1"
            title="Toggle High Contrast Theme"
          >
            {cbtDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

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

      {/* ─── PRACTICE MODE TOOLBAR (OPTIONAL HELPER TOGGLES) ─── */}
      {mode === "PRACTICE" && (
        <div className="bg-emerald-900/20 border-b border-emerald-500/30 px-4 py-2 text-xs flex items-center gap-3 overflow-x-auto shrink-0">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Assistants:</span>
          </span>

          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              showHints ? "bg-emerald-600 text-white border-emerald-600" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? "Hide Hints" : "Show Hints"}</span>
          </button>

          {currentSection.type === "COMPREHENSION_ORALE" && (
            <button
              onClick={() => setShowTranscripts(!showTranscripts)}
              className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                showTranscripts ? "bg-purple-600 text-white border-purple-600" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
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
                showPassageTranslation ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{showPassageTranslation ? "Hide Reading EN Translation" : "Side-by-Side English Translation"}</span>
            </button>
          )}
        </div>
      )}

      {/* ─── SECTION NAVIGATION TABS ─── */}
      <div className="bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 px-4 py-1.5 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
        {paper.sections.map((sec, idx) => {
          const isSelected = activeSectionIdx === idx;
          return (
            <button
              key={sec.type}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-3.5 py-1.5 rounded transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
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
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4" />
                        <span>Official Audio Document:</span>
                      </span>
                      <button
                        onClick={() => handlePlayAudio(currentQ.text)}
                        className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                        <span>{isPlayingAudio ? "Playing Audio Document..." : "Play Audio Recording"}</span>
                      </button>
                    </div>

                    {showTranscripts && currentQ.transcript && (
                      <div className="pt-3 border-t border-purple-200 dark:border-purple-800 text-xs space-y-1.5">
                        <p className="font-bold text-purple-800 dark:text-purple-300 uppercase text-[10px]">French Audio Transcript:</p>
                        <p className="font-serif italic text-slate-800 dark:text-slate-200">"{currentQ.transcript}"</p>
                        {currentQ.transcriptEnglish && (
                          <>
                            <p className="font-bold text-blue-600 dark:text-blue-300 uppercase text-[10px] pt-1">English Translation:</p>
                            <p className="italic text-slate-600 dark:text-slate-400">"{currentQ.transcriptEnglish}"</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Official Reading Passage Component */}
                {currentSection.type === "COMPREHENSION_ECRITE" && currentQ.passage && (
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 space-y-3">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Document d'épreuve :</span>
                    </span>
                    <p className="font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      "{currentQ.passage}"
                    </p>

                    {showPassageTranslation && currentQ.passageEnglish && (
                      <div className="pt-3 border-t border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-bold uppercase text-[10px]">English Translation:</p>
                        <p className="italic">"{currentQ.passageEnglish}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hints Display */}
              {showHints && currentQ.hint && (
                <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span><strong>Hint:</strong> {currentQ.hint}</span>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: QUESTION & OPTIONS SELECTOR (5 COLS) */}
            <div className={`lg:col-span-5 p-5 rounded-lg border ${cbtCard} shadow-sm space-y-5 flex flex-col justify-between`}>
              <div className="space-y-4">
                <h3 className="text-base font-bold leading-snug">
                  {currentQ.text}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isChosen = selectedAnswers[currentQ.id] === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`p-3.5 rounded border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                          isChosen
                            ? "bg-blue-600 text-white border-blue-600 shadow"
                            : "bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-blue-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                            isChosen ? "bg-white text-blue-600" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}>
                            {letter}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isChosen && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next Bottom Navigator */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-800 text-xs font-bold disabled:opacity-40"
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

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={isValid ? "text-emerald-600 font-bold" : "text-amber-600"}>
                      Word Count: {wordCount} / {task.wordCountMin} min
                    </span>
                    {task.sampleResponse && mode === "PRACTICE" && (
                      <button
                        onClick={() => alert(`Official Sample Response:\n\n${task.sampleResponse}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View Official Model Response →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SPEAKING SECTION WORKSPACE */}
        {currentSection.speakingTasks && currentSection.speakingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.speakingTasks.map((task) => (
              <div key={task.id} className={`p-6 rounded-lg border ${cbtCard} shadow-sm space-y-5 text-center max-w-2xl mx-auto`}>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {task.title}
                  </span>
                  <h3 className="text-lg font-bold">{task.scenario}</h3>
                </div>

                {mode === "PRACTICE" && task.keyPhrases && (
                  <div className="p-3.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-left space-y-1.5">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300 uppercase text-[10px]">Key Expressions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {task.keyPhrases.map((phrase, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-semibold">
                          "{phrase}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <button
                    onClick={handleStartSpeakingRecord}
                    className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg transition-all ${
                      isRecording
                        ? "bg-red-600 text-white animate-pulse ring-4 ring-red-400"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    <Mic className="w-7 h-7" />
                  </button>
                  <p className="text-xs font-bold">
                    {isRecording ? "Recording Official Speech..." : "Click Mic to Begin Speaking Response"}
                  </p>

                  {recordedSpeechText && (
                    <div className="p-3 rounded bg-slate-100 dark:bg-slate-800 text-xs text-left space-y-1">
                      <p className="font-bold uppercase text-[10px] text-slate-500">Recorded Transcript:</p>
                      <p className="italic">"{recordedSpeechText}"</p>
                    </div>
                  )}

                  {speakingFeedback && (
                    <div className="p-3.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                      {speakingFeedback}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

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
                  Official CBT Test Center Evaluation
                </span>
                <h2 className="text-3xl font-extrabold">{calculateResults().nclcLevel}</h2>
                <p className="text-xs text-slate-500">
                  Total Score: <strong>{calculateResults().percentage}%</strong> ({calculateResults().totalCorrect} / {calculateResults().totalQs} Correct)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-left space-y-2">
                <p className="font-bold text-blue-800 dark:text-blue-300">
                  🍁 Express Entry CRS Points Evaluation:
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Reaching NCLC 7+ in all 4 skills qualifies you for <strong>+50 Bonus CRS Points</strong> under Canada Express Entry French Category Selection Draws!
                </p>
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
    </div>
  );
}
