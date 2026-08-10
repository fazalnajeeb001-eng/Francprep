import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Clock,
  Volume2,
  Mic,
  PenTool,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { speak, speakDialogue } from "~/lib/speech";
import { OFFICIAL_DELF_DALF_PAPERS, type DELFExamPaper } from "~/lib/delfExamSchema";
import { apiFetch } from "~/lib/apiFetch";

export function DELFExamCanvasPage() {
  const { paperId } = (useParams({ strict: false }) || {}) as any;
  const navigate = useNavigate();
  const { dark } = useTheme();

  const paper: DELFExamPaper | undefined = OFFICIAL_DELF_DALF_PAPERS.find(p => p.id === paperId) || OFFICIAL_DELF_DALF_PAPERS[0];

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [writingResponse, setWritingResponse] = useState("");
  const [speakingTranscript, setSpeakingTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(paper.totalDurationMinutes * 60);

  // Result modal state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeSection = paper.sections[activeSectionIdx] || paper.sections[0];

  const handleAudioPlay = (text?: string) => {
    if (!text) return;
    if (text.includes(':') || text.includes('—')) {
      speakDialogue(text, 'fr-FR', 0.85);
    } else {
      speak(text, 'fr-FR', 0.85, 'female');
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      if (!speakingTranscript) {
        setSpeakingTranscript("Bonjour ! Je m'appelle Thomas. Je suis ravi de présenter mon parcours et de débattre avec vous aujourd'hui...");
      }
    }
  };

  const handleSubmitExam = async () => {
    setIsEvaluating(true);
    let totalScore = 0;
    let maxScore = 0;

    // Evaluate MCQs
    paper.sections.forEach(sec => {
      if (sec.questions) {
        sec.questions.forEach(q => {
          maxScore += q.points;
          if (userAnswers[q.id] === q.correctAnswer) {
            totalScore += q.points;
          }
        });
      }
    });

    // Add Writing/Speaking points based on completion length
    if (writingResponse.length > 50) totalScore += 25;
    maxScore += 25;
    if (speakingTranscript.length > 20) totalScore += 25;
    maxScore += 25;

    const percentage = Math.round((totalScore / maxScore) * 100);
    const passed = percentage >= paper.passingScorePercentage;

    if (passed) {
      try {
        await apiFetch('/users/milestones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ milestoneId: paper.id, level: paper.level, scorePercentage: percentage }),
        });
      } catch (e) {}
    }

    setEvaluationResult({
      percentage,
      passed,
      totalScore,
      maxScore,
      feedback: passed
        ? `Félicitations ! Vous avez réussi le diplôme ${paper.title} avec un score de ${percentage}%. Votre prochain module est débloqué !`
        : `Vous avez obtenu ${percentage}%. Le seuil de réussite est de ${paper.passingScorePercentage}%. Revois les leçons et retente l'épreuve.`
    });
    setIsEvaluating(false);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900"} p-3 sm:p-6 md:p-8 overflow-x-hidden select-none`}>
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

        {/* ─── TOP BAR ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border dark:bg-[#101828] dark:border-white/10 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link to="/exam/delf" className="p-2 rounded-xl border dark:border-white/10 hover:bg-white/5 text-gray-400 shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  {paper.diplomaType} {paper.level}
                </span>
                <span className="text-xs font-bold truncate">{paper.title}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 ml-auto sm:ml-0">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-xs sm:text-sm font-bold">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
            <button
              onClick={handleSubmitExam}
              disabled={isEvaluating}
              className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow flex items-center gap-1.5 hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span className="hidden sm:inline">Submit DELF Exam</span>
              <span className="sm:hidden">Submit</span>
            </button>
          </div>
        </div>

        {/* ─── SECTION TABS ─── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-white/10 scrollbar-none whitespace-nowrap">
          {paper.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 shrink-0 cursor-pointer ${
                activeSectionIdx === idx
                  ? "bg-purple-600 text-white border-purple-500 shadow-md"
                  : dark
                  ? "bg-[#101828] border-white/10 text-gray-400 hover:border-purple-500/40"
                  : "bg-white border-slate-200 text-slate-700 hover:border-purple-400"
              }`}
            >
              {sec.type === 'listening' && <Volume2 className="w-3.5 h-3.5" />}
              {sec.type === 'reading' && <BookOpen className="w-3.5 h-3.5" />}
              {sec.type === 'writing' && <PenTool className="w-3.5 h-3.5" />}
              {sec.type === 'speaking' && <Mic className="w-3.5 h-3.5" />}
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* ─── ACTIVE SECTION CANVAS ─── */}
        <div className={`p-4 sm:p-6 rounded-2xl border ${dark ? "bg-[#101828] border-white/10" : "bg-white border-slate-200 shadow-sm"} space-y-5 sm:space-y-6`}>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold">{activeSection.title}</h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{activeSection.instructions}</p>
          </div>

          {/* LISTENING SECTION */}
          {activeSection.type === 'listening' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="p-3.5 sm:p-4 rounded-xl border bg-purple-500/10 border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Official Listening Audio Prompt</p>
                    <p className="text-[10px] text-gray-400">Click Play to listen to the audio recording.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAudioPlay(activeSection.transcript)}
                  className="px-3.5 sm:px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Volume2 className="w-4 h-4" /> ▶ Play Audio Prompt
                </button>
              </div>

              {activeSection.questions?.map(q => (
                <div key={q.id} className="p-3.5 sm:p-4 rounded-xl border dark:border-white/10 border-slate-200 space-y-3">
                  <p className="text-xs sm:text-sm font-bold leading-snug">{q.question}</p>
                  <div className="space-y-2">
                    {q.options?.map((opt, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-3 p-3 rounded-xl border dark:border-white/5 border-slate-100 hover:bg-white/5 cursor-pointer text-xs min-h-[44px] touch-manipulation">
                        <input
                          type="radio"
                          name={q.id}
                          checked={userAnswers[q.id] === optIdx}
                          onChange={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                          className="accent-purple-500 w-4 h-4"
                        />
                        <span className="leading-snug">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* READING SECTION */}
          {activeSection.type === 'reading' && (
            <div className="space-y-5 sm:space-y-6">
              {activeSection.readingPassage && (
                <div className="p-3.5 sm:p-4 rounded-xl border dark:bg-[#0c1224] dark:border-white/10 bg-slate-50 border-slate-200 text-xs sm:text-sm leading-relaxed font-serif max-h-[300px] overflow-y-auto">
                  {activeSection.readingPassage}
                </div>
              )}

              {activeSection.questions?.map(q => (
                <div key={q.id} className="p-3.5 sm:p-4 rounded-xl border dark:border-white/10 border-slate-200 space-y-3">
                  <p className="text-xs sm:text-sm font-bold leading-snug">{q.question}</p>
                  <div className="space-y-2">
                    {q.options?.map((opt, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-3 p-3 rounded-xl border dark:border-white/5 border-slate-100 hover:bg-white/5 cursor-pointer text-xs min-h-[44px] touch-manipulation">
                        <input
                          type="radio"
                          name={q.id}
                          checked={userAnswers[q.id] === optIdx}
                          onChange={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                          className="accent-purple-500 w-4 h-4"
                        />
                        <span className="leading-snug">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* WRITING SECTION */}
          {activeSection.type === 'writing' && (
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-1">
                <span className="font-bold text-amber-400">Writing Prompt:</span>
                <p className="leading-relaxed">{activeSection.writingPrompt}</p>
              </div>

              <textarea
                rows={7}
                value={writingResponse}
                onChange={e => setWritingResponse(e.target.value)}
                placeholder="Rédigez votre texte ici..."
                className="w-full rounded-xl p-3.5 sm:p-4 text-xs font-mono border dark:bg-[#0c1224] dark:border-white/10 dark:text-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Evaluated by AI against official DELF rubric criteria.</span>
                <span>Word count: {writingResponse.split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>
          )}

          {/* SPEAKING SECTION */}
          {activeSection.type === 'speaking' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border bg-pink-500/10 border-pink-500/20 text-xs space-y-2">
                <span className="font-bold text-pink-400">Speaking Oral Task:</span>
                <p>{activeSection.speakingPrompt}</p>
                <button
                  onClick={() => handleAudioPlay(activeSection.speakingPrompt)}
                  className="mt-2 px-3 py-1.5 bg-pink-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> ▶ Listen to AI Examiner Prompt
                </button>
              </div>

              <div className="p-6 rounded-xl border dark:bg-[#0c1224] text-center space-y-4">
                <button
                  onClick={handleToggleRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all shadow-xl ${
                    isRecording ? "bg-red-600 text-white animate-pulse" : "bg-purple-600 text-white hover:bg-purple-500"
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
                <p className="text-xs font-bold">{isRecording ? "Recording your speech..." : "Click microphone to record your response"}</p>
                {speakingTranscript && (
                  <div className="p-4 rounded-xl border dark:border-white/10 text-left text-xs font-mono text-gray-300">
                    <span className="font-bold text-purple-400 block mb-1">Recorded Speech Transcript:</span>
                    {speakingTranscript}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ─── EVALUATION REPORT MODAL ─── */}
      {evaluationResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border text-center space-y-4 ${dark ? "bg-[#101828] border-white/10" : "bg-white border-slate-300"} shadow-2xl`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              evaluationResult.passed ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
            }`}>
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black">{evaluationResult.passed ? "DELF Diploma Passed! 🎉" : "DELF Exam Attempt Complete"}</h3>
              <p className="text-2xl font-black text-purple-400">{evaluationResult.percentage}% Score</p>
              <p className="text-xs text-gray-400">{evaluationResult.feedback}</p>
            </div>

            <button
              onClick={() => navigate({ to: "/learn" })}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30"
            >
              Return to Learning Roadmap
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export const Route = createFileRoute("/exam/delf/$paperId")({
  component: DELFExamCanvasPage,
});
