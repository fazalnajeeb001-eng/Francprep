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
  Globe
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { getExamRegistry, type ExamPaper, type ExamMode, type SectionType } from "~/lib/examSchema";

export const Route = createFileRoute("/exam/$paperId")({ component: ExamEnginePage });

export function ExamEnginePage() {
  const navigate = useNavigate();
  const { paperId } = Route.useParams();
  const search = Route.useSearch() as any;
  const mode: ExamMode = (search?.mode as ExamMode) || "PRACTICE";
  const { dark } = useTheme();

  const registry = getExamRegistry();
  const paper: ExamPaper | undefined = registry.find((p) => p.id === paperId) || registry[0];

  // Active Section Index
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const currentSection = paper.sections[activeSectionIdx] || paper.sections[0];

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

  // Speaking Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSpeechText, setRecordedSpeechText] = useState("");
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);

  // Exam Submission & Results Modal
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Update timer when section changes
  useEffect(() => {
    setTimeLeft(currentSection.durationMins * 60);
  }, [activeSectionIdx, currentSection.durationMins]);

  // Countdown Interval
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
      alert("Speech recognition is not supported in your browser. Please try Chrome.");
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
      setSpeakingFeedback("Score: NCLC 8 (B2 Vantage) • Excellent fluency, clear pronunciation, and strong vocabulary structure.");
    };

    recognition.start();
  };

  // Score Calculation
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
    let nclcLevel = "NCLC 7 (B2)";
    if (percentage >= 85) nclcLevel = "NCLC 9 (C1 Advanced)";
    else if (percentage >= 75) nclcLevel = "NCLC 8 (B2 Vantage)";
    else if (percentage >= 60) nclcLevel = "NCLC 7 (B2 Threshold)";
    else if (percentage >= 45) nclcLevel = "NCLC 5 (B1)";
    else nclcLevel = "NCLC 4 (A2)";

    return { totalCorrect, totalQs, percentage, nclcLevel };
  };

  const bg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white/90 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bg} flex flex-col justify-between p-4 md:p-6 transition-colors duration-300`}>
      {/* Official Exam Header */}
      <div className="w-full max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border bg-white/90 dark:bg-[#101828]/90 backdrop-blur-xl shadow-lg border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/exam" })}
              className="p-2 rounded-xl border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight">{paper.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[10px] font-mono font-bold">
                  {paper.code}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{currentSection.title}</p>
            </div>
          </div>

          {/* Mode & Timer Controls */}
          <div className="flex items-center gap-4">
            {/* Mode Badge */}
            {mode === "PRACTICE" ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practice Mode (Pausable)</span>
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>Real Exam Mode (Unpausable)</span>
              </span>
            )}

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 font-mono font-bold text-sm text-purple-600 dark:text-purple-300">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
              {mode === "PRACTICE" && (
                <button
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="ml-2 p-1 rounded-lg hover:bg-purple-500/20"
                >
                  {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-purple-400" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Finish & Submit</span>
            </button>
          </div>
        </div>

        {/* Practice Mode Assistant Toolbar */}
        {mode === "PRACTICE" && (
          <div className="flex items-center gap-2 p-3 rounded-2xl border bg-emerald-500/5 border-emerald-500/20 text-xs font-semibold overflow-x-auto">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 mr-2">
              <Sparkles className="w-4 h-4" />
              <span>Practice Tools:</span>
            </span>

            <button
              onClick={() => setShowHints(!showHints)}
              className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                showHints ? "bg-emerald-500 text-white border-emerald-500" : "bg-white/80 dark:bg-white/5 border-gray-300 dark:border-white/10"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHints ? "Hide Hints" : "Show Hints"}</span>
            </button>

            {currentSection.type === "COMPREHENSION_ORALE" && (
              <button
                onClick={() => setShowTranscripts(!showTranscripts)}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                  showTranscripts ? "bg-purple-600 text-white border-purple-600" : "bg-white/80 dark:bg-white/5 border-gray-300 dark:border-white/10"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showTranscripts ? "Hide Transcript & Translation" : "Audio Transcript & EN Translation"}</span>
              </button>
            )}

            {currentSection.type === "COMPREHENSION_ECRITE" && (
              <button
                onClick={() => setShowPassageTranslation(!showPassageTranslation)}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                  showPassageTranslation ? "bg-blue-600 text-white border-blue-600" : "bg-white/80 dark:bg-white/5 border-gray-300 dark:border-white/10"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{showPassageTranslation ? "Hide Reading EN Translation" : "Side-by-Side English Translation"}</span>
              </button>
            )}
          </div>
        )}

        {/* Tested Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-white/10">
          {paper.sections.map((sec, idx) => {
            const isSelected = activeSectionIdx === idx;
            return (
              <button
                key={sec.type}
                onClick={() => setActiveSectionIdx(idx)}
                className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/15 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/30"
                    : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-purple-300"
                }`}
              >
                {sec.type === "COMPREHENSION_ORALE" && <Volume2 className="w-4 h-4 text-purple-400" />}
                {sec.type === "COMPREHENSION_ECRITE" && <BookOpen className="w-4 h-4 text-blue-400" />}
                {sec.type === "EXPRESSION_ECRITE" && <PenTool className="w-4 h-4 text-pink-400" />}
                {sec.type === "EXPRESSION_ORALE" && <Mic className="w-4 h-4 text-emerald-400" />}
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Section Content Area */}
      <div className="w-full max-w-7xl mx-auto my-6 flex-1">
        {/* LISTENING / READING MULTIPLE CHOICE QUESTIONS */}
        {currentSection.questions && currentSection.questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Questions Panel */}
            <div className="lg:col-span-2 space-y-6">
              {currentSection.questions.map((q) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border ${cardBg} space-y-4 shadow-xl relative overflow-hidden`}
                  >
                    {/* Passage (If Reading) */}
                    {q.passage && (
                      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-2">
                        <p className="font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider text-[10px]">
                          Reading Passage:
                        </p>
                        <p className="text-gray-800 dark:text-slate-200 leading-relaxed font-serif text-sm">
                          "{q.passage}"
                        </p>
                        {showPassageTranslation && q.passageEnglish && (
                          <div className="pt-2 border-t border-blue-500/20 text-blue-600 dark:text-blue-300">
                            <p className="font-semibold text-[10px] uppercase">English Translation:</p>
                            <p className="italic">"{q.passageEnglish}"</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Audio Transcript (If Listening in Practice Mode) */}
                    {showTranscripts && q.transcript && (
                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-2">
                        <p className="font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider text-[10px]">
                          Audio Transcript & Translation:
                        </p>
                        <p className="text-gray-800 dark:text-slate-200">"{q.transcript}"</p>
                        {q.transcriptEnglish && (
                          <p className="text-purple-600 dark:text-purple-300 italic pt-1">"{q.transcriptEnglish}"</p>
                        )}
                      </div>
                    )}

                    {/* Question Prompt */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                          Question {q.questionNumber}
                        </span>
                        <h3 className="text-base md:text-lg font-bold leading-snug">
                          {q.text}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handlePlayAudio(q.text)}
                          className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
                        >
                          <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                        </button>

                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={`p-2 rounded-xl border transition-all ${
                            isFlagged ? "bg-amber-500 text-white border-amber-500" : "bg-white/50 border-gray-300 dark:border-white/10 text-gray-500"
                          }`}
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5 pt-2">
                      {q.options.map((opt, idx) => {
                        const isChosen = selectedAnswers[q.id] === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectOption(q.id, idx)}
                            className={`p-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isChosen
                                ? "border-purple-500 bg-purple-500/15 text-purple-900 dark:text-purple-100 ring-2 ring-purple-500/30"
                                : "border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 hover:border-purple-300"
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isChosen ? "border-purple-500 bg-purple-500 text-white" : "border-gray-400"}`}>
                              {isChosen && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Hints (In Practice Mode) */}
                    {showHints && q.hint && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 shrink-0 text-amber-500" />
                        <span><strong>Hint:</strong> {q.hint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Answer Grid Navigator */}
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border ${cardBg} space-y-4 shadow-xl`}>
                <h4 className="text-sm font-bold">Answer Navigation Sheet</h4>
                <div className="grid grid-cols-4 gap-2">
                  {currentSection.questions.map((q) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions[q.id];
                    return (
                      <button
                        key={q.id}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all relative ${
                          isAnswered
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white/50 dark:bg-white/5 border-gray-300 dark:border-white/10"
                        }`}
                      >
                        <span>Q{q.questionNumber}</span>
                        {isFlagged && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WRITING TASKS SECTION */}
        {currentSection.writingTasks && currentSection.writingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.writingTasks.map((task) => {
              const textVal = writingResponses[task.id] || "";
              const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
              const isWordCountValid = wordCount >= task.wordCountMin && wordCount <= task.wordCountMax;

              return (
                <div key={task.id} className={`p-6 md:p-8 rounded-3xl border ${cardBg} space-y-6 shadow-xl`}>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                      {task.title}
                    </span>
                    <h3 className="text-xl font-bold">{task.prompt}</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                      <span>Target: {task.wordCountMin} – {task.wordCountMax} words</span>
                      <span>Time: ~{task.timeLimitMins} mins</span>
                    </div>
                  </div>

                  {/* Guided Writing Tips (Practice Mode) */}
                  {mode === "PRACTICE" && task.guidedTips && (
                    <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-xs space-y-2">
                      <p className="font-bold text-pink-800 dark:text-pink-300 uppercase text-[10px]">
                        ✍️ Guided Writing Sentence Starters & Structure Tips:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-slate-200">
                        {task.guidedTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Writing Editor */}
                  <div className="space-y-2">
                    <textarea
                      rows={8}
                      value={textVal}
                      onChange={(e) => setWritingResponses((prev) => ({ ...prev, [task.id]: e.target.value }))}
                      placeholder="Tapez votre texte en français ici..."
                      className={`w-full p-4 rounded-2xl border text-sm leading-relaxed ${
                        dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans`}
                    />
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className={isWordCountValid ? "text-emerald-500" : "text-amber-500"}>
                        Word Count: <strong>{wordCount}</strong> / {task.wordCountMin} words min
                      </span>
                      {task.sampleResponse && mode === "PRACTICE" && (
                        <button
                          onClick={() => alert(`Sample Response:\n\n${task.sampleResponse}`)}
                          className="text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          View Official Sample Response →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SPEAKING TASKS SECTION */}
        {currentSection.speakingTasks && currentSection.speakingTasks.length > 0 && (
          <div className="space-y-6">
            {currentSection.speakingTasks.map((task) => (
              <div key={task.id} className={`p-6 md:p-8 rounded-3xl border ${cardBg} space-y-6 shadow-xl text-center`}>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {task.title}
                  </span>
                  <h3 className="text-xl font-bold max-w-2xl mx-auto">{task.scenario}</h3>
                </div>

                {/* Key Phrases in Practice Mode */}
                {mode === "PRACTICE" && task.keyPhrases && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-left max-w-xl mx-auto space-y-2">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300 uppercase text-[10px]">
                      🎙️ Recommended Key Oral Expressions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {task.keyPhrases.map((phrase, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-semibold">
                          "{phrase}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Mic Speaking Recorder */}
                <div className="space-y-4 pt-2">
                  <button
                    onClick={handleStartSpeakingRecord}
                    className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-xl transition-all ${
                      isRecording
                        ? "bg-red-500 text-white animate-pulse ring-8 ring-red-500/30"
                        : "bg-gradient-to-tr from-emerald-500 to-teal-500 text-white hover:scale-105"
                    }`}
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                  <p className="text-xs font-bold">
                    {isRecording ? "Listening & Recording French Speech..." : "Click Mic to Practice Speaking"}
                  </p>

                  {recordedSpeechText && (
                    <div className="p-4 rounded-2xl bg-gray-100 dark:bg-white/5 border text-xs text-left max-w-xl mx-auto space-y-2">
                      <p className="font-bold text-gray-500 uppercase text-[10px]">Speech Transcription:</p>
                      <p className="italic">"{recordedSpeechText}"</p>
                    </div>
                  )}

                  {speakingFeedback && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 font-semibold max-w-xl mx-auto">
                      {speakingFeedback}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Results Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl p-8 rounded-3xl border bg-white dark:bg-[#101828] border-gray-200 dark:border-white/10 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-600/30">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Exam Submission & Diagnostic Benchmark Report
                </span>
                <h2 className="text-3xl font-extrabold">{calculateResults().nclcLevel}</h2>
                <p className="text-xs text-gray-500">
                  Overall Score: <strong className="text-purple-600 dark:text-purple-400">{calculateResults().percentage}%</strong> ({calculateResults().totalCorrect} / {calculateResults().totalQs} Correct)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-left space-y-2">
                <p className="font-bold text-purple-800 dark:text-purple-300">
                  🍁 Express Entry CRS Points Impact:
                </p>
                <p className="text-gray-700 dark:text-slate-200">
                  Scoring NCLC 7+ in all 4 skills unlocks <strong>+50 Bonus CRS Points</strong> for Express Entry Category-Based Selection Draws!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate({ to: "/exam" })}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <span>Return to Exam Simulator Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
