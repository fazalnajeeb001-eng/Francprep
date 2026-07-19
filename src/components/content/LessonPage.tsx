import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ArrowLeft, BookOpen, Volume2, Trophy, Award,
  ChevronLeft, ChevronRight, HelpCircle, Star, Headphones, PenTool, Mic,
  Repeat, Globe, FileText, Languages
} from "lucide-react";
import { WritingSubmission } from "./LearningComponents";
import { SpeakingDrill } from "./SpeakingDrill";
import { QuizComponent } from "./QuizComponent";
import { speak, useSpeak } from "~/lib/speech";

// ─── Canonical Interfaces (matches lesson.schema.json) ─────────────────────

interface LessonQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'ordering' | 'short_answer' | 'translation';
  prompt: string;
  correctAnswer: string | string[] | { left: string; right: string }[];
  explanation: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
}

interface VocabItem {
  french: string;
  english: string;
  pronunciation: string;
  example: string;
  formality?: string;
  usageNote?: string;
}

interface LessonData {
  _id: string;
  lessonId: string;
  title: string;
  level: string;
  skill: string;
  anchorSkill: string;
  durationMinutes: number;
  objectives: string[];
  grammarFocus: string;
  vocabularyFocus: string;
  warmUp: { content: string };
  explanation: { content: string };
  vocabItems: VocabItem[];
  grammar: {
    explanation: string;
    formation: string;
    usage: string;
    examples: string[];
    commonMistakes: { wrong: string; correct: string; why: string }[];
  };
  grammarDrills: { questions: LessonQuestion[] };
  reading: { title: string; text: string; translation?: string; questions: LessonQuestion[] };
  listening: { title: string; transcript: string; translation?: string; questions: LessonQuestion[] };
  speaking: { guidedActivity: string; roleplay?: string; pronunciationTip?: string };
  writing: { task: string; modelAnswer: string; checklist: string[] };
  practiceExercises: { questions: LessonQuestion[] };
  miniReview: { content: string };
  selfAssessment: string[];
  order: number;
  isPublished: boolean;
}

interface ProgressData {
  status: string;
  exercisesCompleted: number;
  totalExercises: number;
  timeSpent: number;
  score?: number;
}

interface BlockResult {
  score: number;
  total: number;
  completed: boolean;
}

// ─── Adapter: LessonQuestion → QuizComponent-compatible shape ────────────────

function adaptQuestions(questions: LessonQuestion[]) {
  if (!questions) return [];
  return questions.map(q => ({
    id: q.id,
    text: q.prompt,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer as string | string[] | undefined,
    explanation: q.explanation,
    pairs: q.pairs ? (Array.isArray(q.pairs) ? Object.fromEntries(q.pairs.map(p => [p.left, p.right])) : q.pairs) : undefined,
    items: q.items,
    correctOrder: Array.isArray(q.correctAnswer) && q.type === 'ordering' ? q.correctAnswer as string[] : undefined,
    points: 1,
  }));
}

// ─── Section Definition ────────────────────────────────────────────────────

interface SectionDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  hasContent: boolean;
}

function buildSections(lesson: LessonData): SectionDef[] {
  const isLesson7 = lesson.lessonNumber === 7 || lesson.title?.toLowerCase().includes('integrated');
  const isLesson8 = lesson.lessonNumber === 8 || lesson.title?.toLowerCase().includes('review');

  if (isLesson8) {
    return [
      { key: 'vocabBank', label: 'Vocab Bank', icon: <Languages className="w-3.5 h-3.5" />, hasContent: !!lesson.vocabItems?.length && lesson.vocabItems[0]?.french !== '—' },
      { key: 'grammarSummary', label: 'Grammar Summary', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: !!lesson.grammar?.explanation && !lesson.grammar.explanation.startsWith('No new grammar') },
      { key: 'practice', label: 'Mixed Practice', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: !!lesson.practiceExercises?.questions?.some(q => !q.id.includes('delf')) },
      { key: 'delf', label: 'DELF Assessment', icon: <Award className="w-3.5 h-3.5" />, hasContent: !!lesson.practiceExercises?.questions?.some(q => q.id.includes('delf')) },
      { key: 'review', label: 'Reflection', icon: <Star className="w-3.5 h-3.5" />, hasContent: (!!lesson.miniReview?.content && lesson.miniReview.content !== '—') || !!lesson.selfAssessment?.length },
    ].filter(s => s.hasContent);
  }

  if (isLesson7) {
    return [
      { key: 'warmUp', label: 'Warm-Up', icon: <HelpCircle className="w-3.5 h-3.5" />, hasContent: !!lesson.warmUp?.content && lesson.warmUp.content !== '—' },
      { key: 'dialogue', label: 'Dialogue', icon: <Headphones className="w-3.5 h-3.5" />, hasContent: !!lesson.reading?.text || !!lesson.listening?.transcript },
      { key: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" />, hasContent: !!lesson.speaking?.guidedActivity && !lesson.speaking.guidedActivity.startsWith('Practice pronunciation') },
      { key: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" />, hasContent: !!lesson.writing?.task && !lesson.writing.task.startsWith('Write a short summary') },
      { key: 'practice', label: 'Quiz', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: !!lesson.practiceExercises?.questions?.length && !lesson.practiceExercises.questions[0]?.id?.includes('pe-dummy') },
      { key: 'review', label: 'Review', icon: <Star className="w-3.5 h-3.5" />, hasContent: (!!lesson.miniReview?.content && lesson.miniReview.content !== '—') || !!lesson.selfAssessment?.length },
    ].filter(s => s.hasContent);
  }

  const sections: SectionDef[] = [
    { key: 'warmUp', label: 'Warm-Up', icon: <HelpCircle className="w-3.5 h-3.5" />, hasContent: !!lesson.warmUp?.content && lesson.warmUp.content !== '—' },
    { key: 'explanation', label: 'Lesson', icon: <FileText className="w-3.5 h-3.5" />, hasContent: !!lesson.explanation?.content && lesson.explanation.content !== '—' },
    { key: 'vocabulary', label: 'Vocab', icon: <Languages className="w-3.5 h-3.5" />, hasContent: !!lesson.vocabItems?.length && lesson.vocabItems[0]?.french !== '—' },
    { key: 'grammar', label: 'Grammar', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: !!lesson.grammar?.explanation && !lesson.grammar.explanation.startsWith('No new grammar') },
    { key: 'grammarDrill', label: 'Drill', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: !!lesson.grammarDrills?.questions?.length && !lesson.grammarDrills.questions[0]?.id?.includes('gd-dummy') },
    { key: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: !!lesson.reading?.text && lesson.reading.text !== '—' },
    { key: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" />, hasContent: !!lesson.listening?.transcript && lesson.listening.transcript !== '—' },
    { key: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" />, hasContent: !!lesson.speaking?.guidedActivity && !lesson.speaking.guidedActivity.startsWith('Practice pronunciation') },
    { key: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" />, hasContent: !!lesson.writing?.task && !lesson.writing.task.startsWith('Write a short summary') },
    { key: 'practice', label: 'Practice', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: !!lesson.practiceExercises?.questions?.length && !lesson.practiceExercises.questions[0]?.id?.includes('pe-dummy') },
    { key: 'review', label: 'Review', icon: <Star className="w-3.5 h-3.5" />, hasContent: (!!lesson.miniReview?.content && lesson.miniReview.content !== '—') || !!lesson.selfAssessment?.length },
  ];

  return sections.filter(s => s.hasContent);
}

// ─── Main Component ────────────────────────────────────────────────────────

export function LessonPage({ lessonId, draftId, onBack }: { lessonId?: string; draftId?: string; onBack?: () => void }) {
  const { dark } = useTheme();
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const [blockResults, setBlockResults] = useState<Record<string, BlockResult>>({});
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [lessonScore, setLessonScore] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const innerBg = dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textBody = dark ? "text-gray-300" : "text-gray-700";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  const { data: lesson, isError: lessonError } = useQuery({
    queryKey: draftId ? ["draft", draftId] : ["lesson", lessonId],
    queryFn: () => {
      const url = draftId ? `/admin/content-pipeline/drafts/${draftId}` : `/lessons/${lessonId}`;
      return apiFetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to load content");
        return res.json();
      }).then((json) => {
        const data = json.data;
        if (draftId && data?.parsedData) {
          const canonical = { ...data.parsedData };
          canonical._id = data._id;
          if (canonical.vocabulary && !canonical.vocabItems) {
            canonical.vocabItems = canonical.vocabulary;
            delete canonical.vocabulary;
          }
          if (canonical.anchorSkill && !canonical.skill) {
            canonical.skill = canonical.anchorSkill;
          }
          return canonical;
        }
        return data as LessonData;
      });
    }
  });

  const { data: progressData, refetch: refetchProgress } = useQuery({
    queryKey: ["lesson-progress", lessonId || draftId],
    queryFn: () => {
      if (draftId) return { status: 'in_progress', exercisesCompleted: 0, totalExercises: 0, timeSpent: 0 };
      return apiFetch(`/progress/${lessonId}`).then((res) => res.json()).then((json) => {
        const prog = json?.data?.progress || json?.data;
        return prog as ProgressData;
      });
    },
    enabled: !!lessonId || !!draftId,
  });
  const progress = progressData;

  useEffect(() => {
    if (lessonId && !progress) {
      apiFetch(`/progress/${lessonId}/update`, {
        method: 'POST',
        body: JSON.stringify({ status: 'in_progress', timeSpent: 0 }),
      }).catch(() => {});
    }
  }, [lessonId]);

  useEffect(() => {
    if (!lessonId || lessonCompleted) return;
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 60000);
      const completedBlocks = ['grammarDrill', 'reading', 'listening', 'practice'].filter(k => blockResults[k]?.completed).length;
      apiFetch(`/progress/${lessonId}/update`, {
        method: 'POST',
        body: JSON.stringify({ status: 'in_progress', timeSpent, exercisesCompleted: completedBlocks }),
      }).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [lessonId, blockResults, lessonCompleted, startTime]);

  const markSectionComplete = useCallback((idx: number) => {
    setCompletedSections(prev => new Set(prev).add(idx));
  }, []);

  const handleBlockComplete = useCallback((blockKey: string, score: number, total: number) => {
    setBlockResults(prev => ({
      ...prev,
      [blockKey]: { score, total, completed: true },
    }));
  }, []);

  const handleSubmitBlock = useCallback(async (blockType: string, answers: Record<string, string | string[]>) => {
    try {
      const res = await apiFetch(`/lessons/${lesson!._id}/submit-block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockType, answers }),
      });
      if (!res.ok) throw new Error("Failed to submit block");
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [lesson]);

  const completeLesson = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000);
    const possibleGraded = ['grammarDrill', 'reading', 'listening', 'practice', 'delf'];
    const gradedBlocks = possibleGraded.filter(k => sections.some(s => s.key === k));
    const totalScore = gradedBlocks.reduce((sum, k) => sum + (blockResults[k]?.score || 0), 0);
    const totalMax = gradedBlocks.reduce((sum, k) => sum + (blockResults[k]?.total || 0), 0);
    const score = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : undefined;
    setLessonScore(score ?? null);
    setLessonCompleted(true);
    const exercisesCompleted = gradedBlocks.filter(k => blockResults[k]?.completed).length;
    await apiFetch(`/progress/${lessonId}/update`, {
      method: 'POST',
      body: JSON.stringify({ status: 'completed', score: score ?? 0, timeSpent, exercisesCompleted }),
    }).catch(() => {});
    refetchProgress();
  }, [lessonId, blockResults, startTime, refetchProgress, sections]);

  const sections = lesson ? buildSections(lesson) : [];
  const currentSection = sections[currentSectionIdx] || sections[0];
  const sectionProgress = sections.length > 0 ? Math.round(((currentSectionIdx + 1) / sections.length) * 100) : 0;
  const isLast = currentSectionIdx >= sections.length - 1;

  const goNext = useCallback(() => {
    markSectionComplete(currentSectionIdx);
    if (!isLast) {
      setCurrentSectionIdx(s => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSectionIdx, isLast, markSectionComplete]);

  const goPrev = useCallback(() => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx(s => s - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSectionIdx]);

  if (lessonError) {
    return (
      <div ref={topRef} className={`${pageBg} min-h-screen`}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className={`text-sm font-medium ${dark ? "text-red-400" : "text-red-600"}`}>Failed to load lesson</p>
              <button onClick={() => onBack?.()} className={`mt-3 text-xs ${textSec} hover:underline`}>Go back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div ref={topRef} className={`${pageBg} min-h-screen`}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16"><div className={textSec}>Loading lesson...</div></div>
        </div>
      </div>
    );
  }

  // ─── Render Section Content ──────────────────────────────────────────

  function renderCurrentSection(): React.ReactNode {
    if (!currentSection) return null;

    const emptyState = (label: string) => (
      <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-8 text-center`}>
        <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${dark ? "bg-white/5" : "bg-gray-100"}`}>
          {currentSection.icon}
        </div>
        <p className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{label}</p>
        <p className={`text-xs ${textSec} mt-1`}>Content will be added soon</p>
      </div>
    );

    switch (currentSection.key) {
      case 'vocabBank':
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>Chapter Vocabulary Bank</h3>
            <p className={`text-xs ${textSec} mb-4`}>Review the consolidated vocabulary list for this chapter. Click any word to hear its pronunciation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson!.vocabItems.map((v, i) => (
                <motion.div key={v.french + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${dark ? "border-[#1e2a4a] bg-[#101828]/50" : "border-gray-100 bg-gray-50/50"} hover:border-purple-500/50 transition-all`}>
                  <button onClick={() => speak(v.french)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-semibold block ${dark ? "text-white" : "text-gray-900"}`}>{v.french}</span>
                    <span className={`text-xs ${textSec}`}>{v.english.replace(' (see chapter vocabulary)', '')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'grammarSummary':
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>Chapter Grammar Summary</h3>
            <GrammarSection grammar={lesson!.grammar!} dark={dark} cardBg={cardBg} innerBg={innerBg} textBody={textBody} textSec={textSec} />
          </div>
        );

      case 'dialogue':
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-5 h-5 text-purple-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Scenario Dialogue: {lesson!.reading?.title || "Une Rencontre"}</h3>
            </div>
            <div className="flex gap-3 mb-4">
              <button onClick={() => speak(lesson!.reading?.text || lesson!.listening?.transcript || "")}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                <Volume2 className="w-4 h-4" /> Listen to Dialogue
              </button>
              <button onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                {showTranslation ? "Hide" : "Show"} English Translation
              </button>
            </div>
            <div className={`${innerBg} rounded-xl p-4 border whitespace-pre-line text-sm leading-relaxed ${textBody} font-medium`}>
              {lesson!.reading?.text || lesson!.listening?.transcript}
            </div>
            {showTranslation && (lesson!.reading?.translation || lesson!.listening?.translation) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <p className={`text-xs ${textMuted} italic p-4 rounded-xl border ${innerBg}`}>
                  {lesson!.reading?.translation || lesson!.listening?.translation}
                </p>
              </motion.div>
            )}
          </div>
        );

      case 'delf':
        const delfQuestions = lesson!.practiceExercises?.questions?.filter(q => q.id.includes('delf')) || [];
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>DELF A1-Style Mini-Assessment</h3>
            </div>
            <p className={`text-sm ${textSec} mb-4`}>Complete the exam-style questions below. Your answers will be compared against model responses.</p>
            <QuizComponent
              questions={adaptQuestions(delfQuestions)}
              type="delf"
              onComplete={(score, total) => handleBlockComplete('delf', score, total)}
              onSubmit={(answers) => handleSubmitBlock('delf', answers)}
            />
          </div>
        );

      case 'warmUp':
        if (!lesson!.warmUp?.content) return emptyState('Warm-Up');
        return (
          <div className={`${dark ? "bg-indigo-500/5 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-3"><HelpCircle className="w-5 h-5 text-indigo-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Warm-Up</h3></div>
            <p className={`text-sm leading-relaxed ${textBody}`}>{lesson!.warmUp.content}</p>
          </div>
        );

      case 'explanation':
        if (!lesson!.explanation?.content) return emptyState('Lesson Explanation');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Lesson Explanation</h3>
            <div className={`text-sm leading-relaxed whitespace-pre-line ${textBody}`}>
              {lesson!.explanation.content.split("\n").map((line, i) => (
                line.trim() ? <p key={i} className="mb-2">{line}</p> : null
              ))}
            </div>
          </div>
        );

      case 'vocabulary':
        if (!lesson!.vocabItems?.length) return emptyState('Vocabulary');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>Vocabulary</h3>
            <div className="space-y-2">
              {lesson!.vocabItems.map((v, i) => (
                <motion.div key={v.french + i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${btnHover} transition-colors`}>
                  <button onClick={() => speak(v.french)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{v.french}</span>
                    <span className={`text-[10px] ml-2 ${textMuted}`}>{v.pronunciation}</span>
                    {showTranslation && <p className={`text-xs ${textSec}`}>{v.english}</p>}
                    {v.formality && <span className={`text-[10px] ml-2 px-1.5 py-0.5 rounded ${dark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{v.formality}</span>}
                    {v.usageNote && showTranslation && <p className={`text-[10px] ${textMuted} italic mt-0.5`}>{v.usageNote}</p>}
                  </div>
                  {v.example && (
                    <button onClick={() => speak(v.example)}
                      className={`text-[10px] px-2 py-1 rounded-lg border flex-shrink-0 ${dark ? "border-[#1e2a4a] text-gray-400 hover:text-purple-400" : "border-gray-200 text-gray-500 hover:text-purple-600"} transition-colors`}>
                      ▶ Example
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'grammar':
        if (!lesson!.grammar?.explanation) return emptyState('Grammar');
        return <GrammarSection grammar={lesson!.grammar} dark={dark} cardBg={cardBg} innerBg={innerBg} textBody={textBody} textSec={textSec} />;

      case 'grammarDrill':
        if (!lesson!.grammarDrills?.questions?.length) return emptyState('Grammar Drill');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Repeat className="w-5 h-5 text-purple-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Grammar Drill</h3>
            </div>
            <p className={`text-sm ${textSec} mb-4`}>Apply what you just learned. Complete each question below.</p>
            <QuizComponent
              questions={adaptQuestions(lesson!.grammarDrills?.questions)}
              type="grammarDrill"
              onComplete={(score, total) => handleBlockComplete('grammarDrill', score, total)}
              onSubmit={(answers) => handleSubmitBlock('grammarDrill', answers)}
            />
          </div>
        );

      case 'reading':
        if (!lesson!.reading?.text) return emptyState('Reading');
        return (
          <>
            <ReadingSection lesson={lesson!} dark={dark} cardBg={cardBg} innerBg={innerBg} textBody={textBody} textMuted={textMuted}
              showTranslation={showTranslation} setShowTranslation={setShowTranslation} />
            {lesson!.reading.questions?.length > 0 && (
              <div className="mt-6">
                <QuizComponent
                  questions={adaptQuestions(lesson!.reading?.questions || [])}
                  type="reading"
                  onComplete={(score, total) => handleBlockComplete('reading', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('reading', answers)}
                />
              </div>
            )}
          </>
        );

      case 'listening':
        if (!lesson!.listening?.transcript && !lesson!.listening?.questions?.length) return emptyState('Listening');
        return (
          <>
            <ListeningSection lesson={lesson!} dark={dark} cardBg={cardBg} innerBg={innerBg} textSec={textSec} textMuted={textMuted}
              showTranslation={showTranslation} setShowTranslation={setShowTranslation} />
            {lesson!.listening.questions?.length > 0 && (
              <div className="mt-6">
                <QuizComponent
                  questions={adaptQuestions(lesson!.listening?.questions || [])}
                  type="listening"
                  onComplete={(score, total) => handleBlockComplete('listening', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('listening', answers)}
                />
              </div>
            )}
          </>
        );

      case 'speaking':
        if (!lesson!.speaking?.guidedActivity) return emptyState('Speaking Practice');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl overflow-hidden`}>
            <div className="p-5 border-b dark:border-[#1e2a4a] border-gray-200">
              <div className="flex items-center gap-3 mb-3"><Mic className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Speaking Practice</h3></div>
              <p className={`text-sm ${textBody}`}>{lesson!.speaking.guidedActivity}</p>
              {lesson!.speaking.pronunciationTip && (
                <p className={`text-xs ${textSec} mt-2 italic`}>Tip: {lesson!.speaking.pronunciationTip}</p>
              )}
            </div>
            <SpeakingDrill
              lessonLevel={lesson!.level}
              lessonTopic={lesson!.title}
              onComplete={() => markSectionComplete(currentSectionIdx)}
            />
          </div>
        );

      case 'writing':
        if (!lesson!.writing?.task) return emptyState('Writing Task');
        return <WritingSection lesson={lesson!} dark={dark} cardBg={cardBg} innerBg={innerBg} textBody={textBody}
          onComplete={() => markSectionComplete(currentSectionIdx)} />;

      case 'practice':
        const isL8 = lesson!.lessonNumber === 8 || lesson!.title?.toLowerCase().includes('review');
        const practiceQuestions = isL8
          ? (lesson!.practiceExercises?.questions?.filter(q => !q.id.includes('delf')) || [])
          : (lesson!.practiceExercises?.questions || []);
        if (!practiceQuestions.length) return emptyState('Practice Exercises');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4"><Repeat className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{isL8 ? "Mixed Practice Exercises" : "Practice Exercises"}</h3></div>
            <QuizComponent
              questions={adaptQuestions(practiceQuestions)}
              type="practice"
              onComplete={(score, total) => handleBlockComplete('practice', score, total)}
              onSubmit={(answers) => handleSubmitBlock('practice', answers)}
            />
          </div>
        );

      case 'review':
        if (!lesson!.miniReview?.content && !lesson!.selfAssessment?.length) return emptyState('Review');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            {lesson!.miniReview?.content && (
              <>
                <div className="flex items-center gap-3 mb-3"><Star className="w-5 h-5 text-amber-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Mini Review</h3></div>
                <p className={`text-sm leading-relaxed ${textBody} mb-4`}>{lesson!.miniReview.content}</p>
              </>
            )}
            {lesson!.selfAssessment?.length > 0 && (
              <SelfAssessmentSection items={lesson!.selfAssessment} dark={dark} title="Self-Assessment" />
            )}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div ref={topRef} className={`${pageBg} min-h-screen pb-20`}>
      {/* Sticky Header with Progress */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border-b dark:border-[#1e2a4a] border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className={`text-xs ${dark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors`}>
              <ArrowLeft className="w-4 h-4 inline mr-1" />Back
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                  showTranslation
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                    : dark ? "border-[#1e2a4a] text-gray-500 hover:text-gray-300" : "border-gray-200 text-gray-400 hover:text-gray-600"
                }`}>
                <Globe className="w-3 h-3" /> {showTranslation ? "EN" : "FR"}
              </button>
              <span className={`text-xs ${textSec}`}>{currentSectionIdx + 1} / {sections.length}</span>
            </div>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${sectionProgress}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" />
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="max-w-3xl mx-auto px-4 pt-4">
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {sections.map((s, i) => (
            <button key={s.key} onClick={() => { setCurrentSectionIdx(i); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                i === currentSectionIdx
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                  : completedSections.has(i)
                  ? `${dark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`
                  : `${dark ? "text-gray-500 hover:text-gray-300 border border-transparent" : "text-gray-400 hover:text-gray-600 border border-transparent"}`
              }`}>
              {completedSections.has(i) ? <CheckCircle2 className="w-3 h-3" /> : s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Lesson Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{lesson.title}</h1>
              <div className={`flex items-center gap-2 text-xs ${textSec}`}>
                <span>Lesson {lesson.order}</span>
                <span>&middot;</span>
                <span>{lesson.durationMinutes} min</span>
                {progress?.status === 'completed' && <span className="text-emerald-400 font-semibold">&#9679; Completed</span>}
              </div>
            </div>
          </div>
          {lesson.objectives?.length > 0 && (
            <div className={`rounded-2xl p-4 border mt-3 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-100"}`}>
              <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-300" : "text-purple-700"}`}>What you'll learn:</p>
              <ul className="space-y-1">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className={`text-xs ${textBody} flex items-start gap-2`}>
                    <span className="text-purple-400 mt-0.5">•</span>{obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div key={currentSection?.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>

        {/* Complete Lesson */}
        {!lessonCompleted && isLast && (() => {
          const requiredGraded = ['grammarDrill', 'reading', 'listening', 'practice', 'delf'].filter(k => sections.some(s => s.key === k));
          const allDone = requiredGraded.every(k => blockResults[k]?.completed);
          return (
            <div className="mt-8 text-center">
              <button onClick={completeLesson}
                disabled={!allDone}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-30 disabled:cursor-not-allowed">
                Complete Lesson
              </button>
              {!allDone && (
                <p className={`text-xs ${textSec} mt-2`}>Complete all exercise blocks to finish the lesson.</p>
              )}
            </div>
          );
        })()}

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
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg shadow-amber-500/30">
              <Star className="w-5 h-5 fill-white" /><span className="text-lg">+50 XP</span>
            </motion.div>
            <button onClick={onBack}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
              Back to Chapters
            </button>
          </motion.div>
        )}

        {/* Section Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={goPrev} disabled={currentSectionIdx === 0}
            className="flex items-center gap-1 text-sm font-semibold disabled:opacity-30 dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {!lessonCompleted && (
            <button onClick={goNext}
              className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all">
              {isLast ? "Finish" : "Next"} <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Grammar Section ───────────────────────────────────────────────────────

function GrammarSection({ grammar, dark, cardBg, innerBg, textBody, textSec }: {
  grammar: LessonData['grammar']; dark: boolean; cardBg: string; innerBg: string; textBody: string; textSec: string;
}) {
  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Grammar</h3>

      {grammar.explanation && (
        <div className={`text-sm leading-relaxed ${textBody} mb-4`}>
          {grammar.explanation.split("\n").map((line, i) => (
            line.trim() ? <p key={i} className="mb-2">{line}</p> : null
          ))}
        </div>
      )}

      {grammar.formation && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>Formation:</p>
          <p className={`text-xs ${textBody}`}>{grammar.formation}</p>
        </div>
      )}

      {grammar.usage && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>Usage:</p>
          <p className={`text-xs ${textBody}`}>{grammar.usage}</p>
        </div>
      )}

      {grammar.examples.length > 0 && (
        <div className="mb-3">
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-purple-400" : "text-purple-600"}`}>Examples:</p>
          {grammar.examples.map((ex, i) => (
            <p key={i} className={`text-xs ${textBody} ml-2 mb-1`}>• {ex}</p>
          ))}
        </div>
      )}

      {grammar.commonMistakes.length > 0 && (
        <div className="mb-3">
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-red-400" : "text-red-600"}`}>Common Mistakes:</p>
          {grammar.commonMistakes.map((m, i) => (
            <div key={i} className={`text-xs p-2 rounded-lg mb-1 ${dark ? "bg-red-500/5" : "bg-red-50"}`}>
              <span className="text-red-400">✗</span> {m.wrong} → <span className="text-emerald-400">✓</span> {m.correct}
              {m.why && <span className={`ml-1 ${textSec}`}>({m.why})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reading Section ───────────────────────────────────────────────────────

function ReadingSection({ lesson, dark, cardBg, innerBg, textBody, textMuted, showTranslation, setShowTranslation }: {
  lesson: LessonData; dark: boolean; cardBg: string; innerBg: string; textBody: string; textMuted: string;
  showTranslation: boolean; setShowTranslation: (v: boolean) => void;
}) {
  const reading = lesson.reading;

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{reading.title || 'Reading'}</h3>
      <div className={`${innerBg} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm leading-relaxed ${textBody}`}>{reading.text}</div>

      {reading.translation && (
        <div className="mt-3 mb-3">
          <button onClick={() => setShowTranslation(!showTranslation)}
            className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} hover:underline`}>
            {showTranslation ? "Hide English translation" : "Show English translation"}
          </button>
          {showTranslation && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
              <p className={`text-xs ${textMuted} italic p-3 rounded-xl border ${innerBg}`}>{reading.translation}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Listening Section ─────────────────────────────────────────────────────

function ListeningSection({ lesson, dark, cardBg, innerBg, textSec, textMuted, showTranslation, setShowTranslation }: {
  lesson: LessonData; dark: boolean; cardBg: string; innerBg: string; textSec: string; textMuted: string;
  showTranslation: boolean; setShowTranslation: (v: boolean) => void;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  const listening = lesson.listening;
  const { speak: speakWithState, isSpeaking } = useSpeak();

  const cleanedTranscript = (listening.transcript || "").replace(/\*\*/g, "").trim();

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <Headphones className="w-5 h-5 text-purple-400" />
        <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{listening.title || 'Listening'}</h3>
      </div>

      {cleanedTranscript && (
        <div className="flex gap-3 mb-4">
          <button onClick={() => speakWithState(cleanedTranscript)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Volume2 className="w-4 h-4" /> {isSpeaking ? "Playing..." : "Play Audio"}
          </button>
          <button onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            {showTranscript ? "Hide" : "Show"} Transcript
          </button>
        </div>
      )}

      {showTranscript && cleanedTranscript && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className={`${innerBg} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm ${textSec}`}>
          {cleanedTranscript}
        </motion.div>
      )}

      {listening.translation && (
        <div className="mb-3">
          <button onClick={() => setShowTranslation(!showTranslation)}
            className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} hover:underline`}>
            {showTranslation ? "Hide English translation" : "Show English translation"}
          </button>
          {showTranslation && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
              <p className={`text-xs ${textMuted} italic p-3 rounded-xl border ${innerBg}`}>{listening.translation}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Writing Section ───────────────────────────────────────────────────────

function WritingSection({ lesson, dark, cardBg, innerBg, textBody, onComplete }: {
  lesson: LessonData; dark: boolean; cardBg: string; innerBg: string; textBody: string; onComplete: () => void;
}) {
  const [showModel, setShowModel] = useState(false);
  const writing = lesson.writing;

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <div className="flex items-center gap-3 mb-3"><PenTool className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Writing Practice</h3></div>
      {writing.task && <p className={`text-sm ${textBody} mb-3 whitespace-pre-line`}>{writing.task}</p>}

      {writing.checklist.length > 0 && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-purple-400" : "text-purple-600"}`}>Checklist:</p>
          {writing.checklist.map((item, i) => (
            <p key={i} className={`text-xs ${textBody} flex items-start gap-1.5 mb-0.5`}>
              <span className="text-emerald-400">&#10003;</span>{item}
            </p>
          ))}
        </div>
      )}

      {writing.modelAnswer && (
        <div className="mb-3">
          <button onClick={() => setShowModel(!showModel)}
            className={`text-xs font-semibold ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"} transition-colors`}>
            {showModel ? "Hide" : "Show"} Model Answer
          </button>
          {showModel && (
            <div className={`${innerBg} rounded-xl p-3 border mt-2`}>
              <p className={`text-xs ${textBody} whitespace-pre-line`}>{writing.modelAnswer}</p>
            </div>
          )}
        </div>
      )}

      <WritingSubmission onSubmit={onComplete} lessonTitle={lesson.title}
        expectedAnswer={writing.modelAnswer} checklist={writing.checklist} />
    </div>
  );
}

// ─── Self-Assessment Section ───────────────────────────────────────────────

function SelfAssessmentSection({ items, dark, title }: { items: string[]; dark: boolean; title: string }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allChecked = items.length > 0 && items.every((_, i) => checked[i]);
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textBody = dark ? "text-gray-300" : "text-gray-700";

  return (
    <div className={`${cardBg} backdrop-blur-lg border rounded-2xl p-5 transition-colors mt-4`}>
      <div className="flex items-center gap-3 mb-3">
        <Award className="w-5 h-5 text-purple-400" />
        <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checked[i] || false}
              onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
              className="w-4 h-4 accent-purple-500 rounded" />
            <span className={`text-sm ${checked[i] ? "line-through text-emerald-400" : textBody}`}>{item}</span>
          </label>
        ))}
      </div>
      {allChecked && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
          <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Great work! You've completed all self-assessment items.
          </p>
        </motion.div>
      )}
    </div>
  );
}
