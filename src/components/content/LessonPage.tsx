import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, BookOpen, XCircle, Volume2, Trophy, Award } from "lucide-react";
import { AudioPlayer, ProgressTracker, SpeakingRecorder, WritingSubmission } from "./LearningComponents";
import { QuizComponent } from "./QuizComponent";

interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  prompt?: string;
  pronunciationTip?: string;
  items?: string[];
  correctOrder?: string[];
  pairs?: Record<string, string>;
  sampleAnswer?: string;
  evaluationCriteria?: string[];
  blankAnswer?: string;
}

interface SectionData {
  type: string;
  title: string;
  body: string;
  translation?: string;
  questions?: Question[];
  media?: { audio?: string[]; images?: string[] };
}

interface ExerciseData {
  _id: string;
  lessonId: string;
  type: string;
  category: string;
  title: string;
  instructions: string;
  order: number;
  estimatedDuration: number;
  points: number;
  isRequired: boolean;
  questions: Question[];
  sectionType: string;
  transcript?: string;
}

interface LessonData {
  _id: string;
  title: string;
  chapterId: string;
  order: number;
  skill: string;
  objectives: string[];
  grammarTopics: string[];
  sections: SectionData[];
  content: string;
  estimatedDuration: number;
}

interface ProgressData {
  status: string;
  exercisesCompleted: number;
  totalExercises: number;
  timeSpent: number;
  score?: number;
}

export function LessonPage({ lessonId, onBack }: { lessonId: string; onBack?: () => void }) {
  const { dark } = useTheme();
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
  const [selfAssessments, setSelfAssessments] = useState<Record<string, boolean>>({});
  const [drillAnswers, setDrillAnswers] = useState<Record<string, Record<number, string>>>({});
  const [drillResults, setDrillResults] = useState<Record<string, Record<number, boolean | null>>>({});
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [quizResults, setQuizResults] = useState<Record<string, { correct: boolean; shown: boolean }>>({});
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [lessonScore, setLessonScore] = useState<number | null>(null);
  const [startTime] = useState(Date.now());

  // Theme classes
  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textBody = dark ? "text-gray-300" : "text-gray-700";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const border = dark ? "border-[#1e2a4a]" : "border-gray-200";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  // Fetch lesson data
  const { data: lesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => apiFetch(`/lessons/${lessonId}`).then((res) => res.json()).then((json) => json.data as LessonData),
  });

  // Fetch exercises
  const { data: exercises, refetch: refetchExercises } = useQuery({
    queryKey: ["lesson-exercises", lessonId],
    queryFn: () => apiFetch(`/lessons/${lessonId}/exercises`).then((res) => res.json()).then((json) => json.data as ExerciseData[]),
    enabled: !!lessonId,
  });

  // Fetch progress
  const { data: progressData, refetch: refetchProgress } = useQuery({
    queryKey: ["lesson-progress", lessonId],
    queryFn: () => apiFetch(`/progress/${lessonId}`).then((res) => res.json()).then((json) => {
      // The backend returns { success, data: { lesson, progress } }
      const prog = json?.data?.progress || json?.data;
      return prog as ProgressData;
    }),
    enabled: !!lessonId,
  });
  const progress = progressData;

  // Mark lesson as started when first opened
  useEffect(() => {
    if (lessonId && !progress) {
      apiFetch(`/progress/${lessonId}/update`, {
        method: 'POST',
        body: JSON.stringify({ status: 'in_progress', timeSpent: 0 }),
      }).catch(() => {});
    }
  }, [lessonId]);

  // Track time and save progress periodically
  useEffect(() => {
    if (!lessonId || lessonCompleted) return;
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 60000);
      apiFetch(`/progress/${lessonId}/update`, {
        method: 'POST',
        body: JSON.stringify({ status: 'in_progress', timeSpent, exercisesCompleted }),
      }).catch(() => {});
    }, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, [lessonId, exercisesCompleted, lessonCompleted, startTime]);

  // Mark section as complete
  const markSectionComplete = useCallback((sectionId: string) => {
    setCompletedSections(prev => {
      if (prev.includes(sectionId)) return prev;
      return [...prev, sectionId];
    });
  }, []);

  // Handle quiz answer - check correctness
  const handleQuizAnswer = useCallback((questionId: string, isCorrect: boolean) => {
    setQuizResults(prev => ({
      ...prev,
      [questionId]: { correct: isCorrect, shown: true }
    }));
  }, []);

  // Handle exercise completion from QuizComponent
  const handleExerciseComplete = useCallback((exerciseId: string, score: number, total: number) => {
    setExercisesCompleted(prev => prev + 1);
    // Submit actual score to backend
    apiFetch(`/exercises/${exerciseId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ score, total, timestamp: Date.now() }),
    }).catch(() => {});
  }, []);

  // Complete lesson
  const completeLesson = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000);
    // Calculate score from quiz results
    const total = Object.keys(quizResults).length;
    const correct = Object.values(quizResults).filter(r => r.correct).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : undefined;

    setLessonScore(score ?? null);
    setLessonCompleted(true);

    await apiFetch(`/progress/${lessonId}/update`, {
      method: 'POST',
      body: JSON.stringify({
        status: 'completed',
        score: score ?? 0,
        timeSpent,
        exercisesCompleted,
      }),
    }).catch(() => {});
    
    refetchProgress();
  }, [lessonId, exercisesCompleted, quizResults, startTime, refetchProgress]);

  const GrammarDrillRenderer = useCallback(({ sectionId, body }: { sectionId: string; body: string }) => {
    const parts: { text: string; isBlank: boolean; index: number }[] = [];
    const answerMap: Record<number, string> = {};
    let idx = 0;
    const regex = /____\[answer:(.*?)\]/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(body)) !== null) {
      if (match.index > lastIndex) parts.push({ text: body.slice(lastIndex, match.index), isBlank: false, index: -1 });
      parts.push({ text: "", isBlank: true, index: idx });
      answerMap[idx] = match[1];
      idx++;
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < body.length) parts.push({ text: body.slice(lastIndex), isBlank: false, index: -1 });

    const answers = drillAnswers[sectionId] || {};
    const results = drillResults[sectionId] || {};

    const checkDrill = (blankIdx: number) => {
      const newResults = { ...drillResults[sectionId] || {} };
      const userAns = (drillAnswers[sectionId] || {})[blankIdx]?.trim().toLowerCase() || "";
      const correctAns = answerMap[blankIdx]?.trim().toLowerCase() || "";
      newResults[blankIdx] = userAns === correctAns;
      setDrillResults(prev => ({ ...prev, [sectionId]: newResults }));
    };

    const updateAnswer = (blankIdx: number, val: string) => {
      setDrillAnswers(prev => ({
        ...prev,
        [sectionId]: { ...(prev[sectionId] || {}), [blankIdx]: val }
      }));
      setDrillResults(prev => {
        const r = { ...(prev[sectionId] || {}) };
        delete r[blankIdx];
        return { ...prev, [sectionId]: r };
      });
    };

    return (
      <p className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>
        {parts.map((part, i) =>
          part.isBlank ? (
            <span key={i} className="inline-flex items-center gap-1 mx-0.5">
              <input
                type="text"
                value={answers[part.index] || ""}
                onChange={(e) => updateAnswer(part.index, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkDrill(part.index)}
                className={`w-28 inline-block px-2 py-0.5 text-sm border-b-2 bg-transparent focus:outline-none text-center ${
                  results[part.index] === true ? "border-emerald-400 text-emerald-400" :
                  results[part.index] === false ? "border-red-400 text-red-400" :
                  dark ? "border-purple-500/50 text-gray-200" : "border-purple-300 text-gray-800"
                }`}
                placeholder="______"
              />
              {results[part.index] !== undefined && (
                <span className="text-xs">
                  {results[part.index] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" /> : <XCircle className="w-3.5 h-3.5 text-red-400 inline" />}
                </span>
              )}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </p>
    );
  }, [drillAnswers, drillResults, dark, textBody]);

  const sectionComponents: Record<string, React.FC<{ section: SectionData }>> = {
    warmup: ({ section }) => (
      <div className={`rounded-2xl p-5 border ${dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"}`}>
        <h3 className={`text-sm font-semibold mb-2 ${dark ? "text-amber-300" : "text-amber-700"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} whitespace-pre-line`}>{section.body}</p>
      </div>
    ),
    explanation: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>{section.body}</div>
      </div>
    ),
    vocabulary: ({ section }) => {
      const lines = section.body.split("\n").filter(l => l.includes("|"));
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          <div className="space-y-2">
            {lines.map((line, i) => {
              const parts = line.split("|").map(p => p.trim());
              if (parts.length < 2) return null;
              return (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${btnHover} transition-colors`}>
                  <button onClick={() => { if (typeof window !== "undefined") { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(parts[0]); u.lang = "fr-FR"; u.rate = 0.85; window.speechSynthesis.speak(u); } }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{parts[0]}</span>
                    <span className={`text-xs ${textMuted} ml-2`}>{parts[3] || parts[2] || ""}</span>
                    <p className={`text-xs ${textSec}`}>{parts[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    grammar: ({ section }) => {
      const hasDrills = section.body.includes("____[answer:");
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          {hasDrills ? (
            <GrammarDrillRenderer sectionId={section.title} body={section.body} />
          ) : (
            <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>{section.body}</div>
          )}
          {section.translation && (
            <div className="mt-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className={`text-xs ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                {showTranslation[section.title] ? "Hide English" : "Show English translation"}
              </button>
              {showTranslation[section.title] && <p className={`text-xs ${textMuted} mt-1 italic`}>{section.translation}</p>}
            </div>
          )}
        </div>
      );
    },
    reading: ({ section }) => {
      const [showQuestions, setShowQuestions] = useState(false);
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed mb-3`}>{section.body}</div>
          {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen to the passage" />}
          {section.translation && (
            <div className="mt-3 mb-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} hover:underline`}>
                {showTranslation[section.title] ? "Hide English translation" : "Show English translation"}
              </button>
              {showTranslation[section.title] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                  <p className={`text-xs ${textMuted} italic p-3 rounded-xl border ${dark ? "bg-[#0a0e1a] border-purple-500/20" : "bg-gray-50 border-gray-200"}`}>{section.translation}</p>
                </motion.div>
              )}
            </div>
          )}
          {section.questions && section.questions.length > 0 && (
            <div className="mt-4">
              <button onClick={() => { setShowQuestions(!showQuestions); if (!showQuestions) markSectionComplete(`reading-${section.title}`); }}
                className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-all ${
                  dark ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}>
                {showQuestions ? "Hide Comprehension Questions" : "Answer Comprehension Questions"}
              </button>
              {showQuestions && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <QuizComponent
                    questions={section.questions.map(q => ({
                      id: q.id,
                      type: q.type,
                      question: q.question,
                      options: q.options,
                      correctAnswer: q.correctAnswer,
                      explanation: q.explanation,
                    }))}
                    type="multiple_choice"
                    onAnswer={(qId, correct) => handleQuizAnswer(qId, correct)}
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      );
    },
    listening: ({ section }) => {
      const [showQuestions, setShowQuestions] = useState(false);
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen" transcript={section.body} />}
          {!section.media?.audio?.length && (
            <div className="mb-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [`transcript-${section.title}`]: !showTranslation[`transcript-${section.title}`] })}
                className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} hover:underline mb-2 inline-flex items-center gap-1`}>
                <Volume2 className="w-3 h-3" /> {showTranslation[`transcript-${section.title}`] ? "Hide Transcript" : "Show Transcript"}
              </button>
              {showTranslation[`transcript-${section.title}`] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <p className={`text-sm ${textBody} whitespace-pre-line p-3 rounded-xl border ${dark ? "bg-[#0a0e1a] border-purple-500/20" : "bg-gray-50 border-gray-200"}`}>{section.body}</p>
                </motion.div>
              )}
            </div>
          )}
          {section.translation && (
            <div className="mb-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [`trans-${section.title}`]: !showTranslation[`trans-${section.title}`] })}
                className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} hover:underline`}>
                {showTranslation[`trans-${section.title}`] ? "Hide English translation" : "Show English translation"}
              </button>
              {showTranslation[`trans-${section.title}`] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                  <p className={`text-xs ${textMuted} italic p-3 rounded-xl border ${dark ? "bg-[#0a0e1a] border-purple-500/20" : "bg-gray-50 border-gray-200"}`}>{section.translation}</p>
                </motion.div>
              )}
            </div>
          )}
          {section.questions && section.questions.length > 0 && (
            <div className="mt-4">
              <button onClick={() => { setShowQuestions(!showQuestions); if (!showQuestions) markSectionComplete(`listening-${section.title}`); }}
                className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-all ${
                  dark ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}>
                {showQuestions ? "Hide Questions" : "Answer Listening Questions"}
              </button>
              {showQuestions && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <QuizComponent
                    questions={section.questions.map(q => ({
                      id: q.id,
                      type: q.type,
                      question: q.question,
                      options: q.options,
                      correctAnswer: q.correctAnswer,
                      explanation: q.explanation,
                    }))}
                    type="multiple_choice"
                    onAnswer={(qId, correct) => handleQuizAnswer(qId, correct)}
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      );
    },
    speaking: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm text-center ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} mb-4 text-left whitespace-pre-line`}>{section.body}</p>
        <SpeakingRecorder onSave={() => markSectionComplete(`speaking-${section.title}`)} />
      </div>
    ),
    writing: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} mb-4 whitespace-pre-line`}>{section.body}</p>
        <WritingSubmission onSubmit={() => markSectionComplete(`writing-${section.title}`)} />
      </div>
    ),
    practice: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} whitespace-pre-line`}>{section.body}</p>
      </div>
    ),
    review: ({ section }) => {
      const lines = section.body.split("\n").filter(l => l.trim());
      const items = lines.map(l => l.replace(/^[\u2713\u2705☐]\s*/, "").trim()).filter(l => l.length > 0);

      return (
        <div className={`rounded-2xl p-5 border ${dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"}`}>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className={`text-sm font-semibold ${dark ? "text-emerald-300" : "text-green-700"}`}>Self Assessment</h3>
          </div>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item, i) => {
                const key = `${section.title}_${i}`;
                return (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => setSelfAssessments(prev => ({ ...prev, [key]: !prev[key] }))}>
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selfAssessments[key]
                        ? "bg-emerald-500 border-emerald-500"
                        : dark ? "border-gray-600 group-hover:border-emerald-500 bg-transparent" : "border-gray-300 group-hover:border-emerald-400 bg-white/60"
                    }`}>
                      {selfAssessments[key] && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${selfAssessments[key] ? (dark ? "text-emerald-300 line-through" : "text-green-700 line-through decoration-green-400") : (dark ? "text-gray-300" : "text-gray-700")}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} whitespace-pre-line`}>{section.body}</p>
          )}
        </div>
      );
    },
  };

  // Count total questions across exercises
  const totalExerciseQuestions = exercises?.reduce((sum, ex) => sum + (ex.questions?.length || 0), 0) || 0;
  const completedExerciseQuestions = Object.keys(quizResults).length;
  const allSectionsCompleted = lesson?.sections?.length ? completedSections.length >= lesson.sections.length : false;

  if (!lesson) {
    return (
      <div className={`max-w-3xl mx-auto px-4 py-8 ${pageBg}`}>
        <div className="flex items-center justify-center py-16">
          <div className={textSec}>Loading lesson...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          {onBack && (
            <button onClick={onBack} className={`p-2 rounded-lg ${btnHover} transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${textSec}`} />
            </button>
          )}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{lesson.title}</h1>
            <div className={`flex items-center gap-2 text-xs ${textSec}`}>
              <span>Lesson {lesson.order}</span>
              <span>&middot;</span>
              <span>{lesson.estimatedDuration} min</span>
              {progress?.status === 'completed' && (
                <span className="text-emerald-400 font-semibold">&#9679; Completed</span>
              )}
            </div>
          </div>
        </div>

        {/* Objectives */}
        {lesson.objectives?.length > 0 && (
          <div className={`rounded-2xl p-4 border mb-6 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-100"}`}>
            <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-300" : "text-purple-700"}`}>What you&apos;ll learn:</p>
            <ul className="space-y-1">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className={`text-xs ${textBody} flex items-start gap-2`}>
                  <span className={`${dark ? "text-purple-400" : "text-purple-400"} mt-0.5`}>{'\u2022'}</span>{obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lesson Sections */}
        <div className="space-y-4">
          {lesson.sections?.map((section, i) => {
            const Component = sectionComponents[section.type];
            if (!Component) return null;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Component section={section} />
              </motion.div>
            );
          })}
        </div>

        {/* Exercises Section */}
        {exercises && exercises.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-lg font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>Practice Exercises</h2>
            <div className="space-y-6">
              {exercises.map((exercise, i) => (
                <motion.div key={exercise._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{exercise.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${dark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-600"}`}>
                      {exercise.points} pts
                    </span>
                  </div>
                  {exercise.instructions && (
                    <p className={`text-xs ${textSec} mb-3`}>{exercise.instructions}</p>
                  )}
                  <QuizComponent
                    questions={exercise.questions.map(q => ({
                      id: q.id,
                      type: q.type,
                      question: q.question,
                      options: q.options,
                      correctAnswer: q.correctAnswer,
                      explanation: q.explanation,
                      prompt: q.prompt,
                      pronunciationTip: q.pronunciationTip,
                      items: q.items,
                      correctOrder: q.correctOrder,
                      pairs: q.pairs,
                      sampleAnswer: q.sampleAnswer,
                      evaluationCriteria: q.evaluationCriteria,
                      blankAnswer: q.blankAnswer,
                    }))}
                    type={exercise.type}
                    onAnswer={(qId, correct) => handleQuizAnswer(qId, correct)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Complete Lesson Button */}
        {!lessonCompleted && (
          <div className="mt-8 text-center">
            <button onClick={completeLesson}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25">
              Complete Lesson
            </button>
            <p className={`text-xs ${textMuted} mt-2`}>
              {completedSections.length} of {lesson.sections?.length || 0} sections completed
              {totalExerciseQuestions > 0 && ` \u00B7 ${completedExerciseQuestions} of ${totalExerciseQuestions} questions answered`}
            </p>
          </div>
        )}

        {/* Completion Screen */}
        {lessonCompleted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl p-6 border bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30 text-center">
            <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className={`text-lg font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>Lesson Complete!</h2>
            {lessonScore !== null && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-2xl font-bold text-emerald-400">{lessonScore}%</span>
              </div>
            )}
            <p className={`text-xs ${textMuted} mt-2`}>Your progress has been saved.</p>
            <button onClick={onBack}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
              Back to Chapters
            </button>
          </motion.div>
        )}

        {/* Progress */}
        <div className="mt-8">
          <ProgressTracker completed={completedSections.length} total={lesson.sections?.length || 0} label="Lesson Progress" />
        </div>
      </div>
    </div>
  );
}