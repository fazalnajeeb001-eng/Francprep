import { useState, useCallback, useRef, useEffect, Component, type ErrorInfo, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

interface LessonData {
  _id: string;
  lessonId: string;
  chapterId: string;
  level: string;
  title: string;
  skill: 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV' | 'integrated' | 'review';
  order: number;
  durationMinutes: number;
  objectives: string[];
  grammarFocus: string;
  vocabularyFocus: string;
  warmUp: { content: string };
  explanation: { content: string };
  vocabItems: { french: string; english: string; pronunciation: string; example?: string; formality?: string; usageNote?: string }[];
  grammar: {
    explanation: string;
    formation: string;
    usage: string;
    examples: string[];
    commonMistakes: { wrong: string; correct: string; why?: string; tip?: string }[];
  };
  grammarDrills: { questions: LessonQuestion[] };
  reading?: { title: string; text: string; translation?: string; questions: LessonQuestion[] };
  listening?: { title: string; transcript: string; translation?: string; questions: LessonQuestion[] };
  speaking?: { guidedActivity?: string; roleplay?: string; extensionTask?: string; pronunciationTip?: string };
  writing?: { task: string; modelAnswer: string; checklist: string[] };
  practiceExercises: { questions: LessonQuestion[] };
  miniReview: { content: string };
  selfAssessment: string[];
  // L7 Integrated
  scene?: { title: string; text: string; translation?: string; audioUrl?: string };
  comprehensionQuestions?: LessonQuestion[];
  // L8 Review
  vocabularyBank?: { items: string[]; cumulativeNote: string };
  grammarSummary?: { content: string };
  canDoReview?: { statement: string; lessonRef: string }[];
  mixedPracticeExercises?: { questions: LessonQuestion[] };
  assessment?: {
    examStyle: string;
    sections: {
      title: string;
      skill: string;
      points: number;
      instructions: string;
      sourceText?: string;
      questions?: LessonQuestion[];
      answerKeyNotes?: string;
    }[];
  };
  selfReflection?: string[];
  completionSummary?: { content: string };
  lessonNumber?: number;
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
  return questions.map((q, idx) => ({
    id: q.id || (q as any)._id || `q-${idx}`,
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

function getDialogueText(lesson: any): string {
  if (!lesson) return "";
  const rText = lesson.reading?.text?.trim() || "";
  const lText = lesson.listening?.transcript?.trim() || "";
  const rOk = rText && rText !== "---" && rText.length > 10;
  const lOk = lText && lText !== "---" && lText.length > 10;
  if (rOk && lOk) {
    return rText.length >= lText.length ? rText : lText;
  }
  if (rOk) return rText;
  if (lOk) return lText;
  return rText || lText || "";
}

function getDialogueTranslation(lesson: any): string {
  if (!lesson) return "";
  const rTrans = lesson.reading?.translation?.trim() || "";
  const lTrans = lesson.listening?.translation?.trim() || "";
  const clean = (s: string) => s.replace(/^[\s*\-]+/, '').replace(/[\s*\-]+$/, '').trim();
  const rt = rTrans && rTrans !== "---" ? clean(rTrans) : "";
  const lt = lTrans && lTrans !== "---" ? clean(lTrans) : "";
  if (rt && lt) {
    return rt.length >= lt.length ? rt : lt;
  }
  if (rt) return rt;
  if (lt) return lt;
  return "";
}

// ─── Section Definition ────────────────────────────────────────────────────

interface SectionDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  hasContent: boolean;
}

function buildSections(lesson: LessonData): SectionDef[] {
  const lessonIdStr = typeof lesson?.lessonId === 'string' ? lesson.lessonId.toLowerCase() : '';
  const titleStr = typeof lesson?.title === 'string' ? lesson.title.toLowerCase() : '';
  const skillStr = typeof lesson?.skill === 'string' ? lesson.skill.toLowerCase() : '';

  const isLesson7 = Boolean(
    lessonIdStr.endsWith('-l7') ||
    lessonIdStr.includes('l7') ||
    lesson?.lessonNumber === 7 ||
    skillStr === 'integrated' ||
    skillStr === 'int' ||
    titleStr.includes('integrated practice') ||
    titleStr.includes('integrated')
  );

  const isLesson8 = Boolean(
    lessonIdStr.endsWith('-l8') ||
    lessonIdStr.includes('l8') ||
    lesson?.lessonNumber === 8 ||
    skillStr === 'review' ||
    skillStr === 'rev' ||
    titleStr.includes('review')
  );

  if (isLesson8) {
    const list: SectionDef[] = [
      { key: 'vocabBank', label: 'Vocab Bank', icon: <Languages className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'grammarSummary', label: 'Grammar Summary', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: true },
    ];

    if (lesson.reading?.text || (lesson.reading?.questions && lesson.reading.questions.length > 0)) {
      list.push({ key: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: true });
    }

    if (lesson.listening?.transcript || (lesson.listening?.questions && lesson.listening.questions.length > 0)) {
      list.push({ key: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" />, hasContent: true });
    }

    list.push(
      { key: 'mixedPractice', label: 'Mixed Practice', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'assessment', label: 'DELF Assessment', icon: <Award className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'canDoReview', label: 'Can-Do Review', icon: <CheckCircle2 className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'selfReflection', label: 'Reflection', icon: <Star className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'completion', label: 'Complete', icon: <Trophy className="w-3.5 h-3.5" />, hasContent: true },
    );

    return list;
  }

  if (isLesson7) {
    return [
      { key: 'warmUp', label: 'Warm-Up', icon: <HelpCircle className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'speakingL7', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'practice', label: 'Quiz', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: true },
      { key: 'review', label: 'Review', icon: <Star className="w-3.5 h-3.5" />, hasContent: true },
    ];
  }

  const sections: SectionDef[] = [
    { key: 'warmUp', label: 'Warm-Up', icon: <HelpCircle className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'explanation', label: 'Lesson', icon: <FileText className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'vocabulary', label: 'Vocab', icon: <Languages className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'grammar', label: 'Grammar', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'grammarDrill', label: 'Drill', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'practice', label: 'Practice', icon: <Repeat className="w-3.5 h-3.5" />, hasContent: true },
    { key: 'review', label: 'Review', icon: <Star className="w-3.5 h-3.5" />, hasContent: true },
  ];

  return sections;
}


// ─── Inline Markdown Parsing Helpers ────────────────────────────────────────

function parseInlineMarkdown(text: string): { type: 'text' | 'bold' | 'italic'; text: string }[] {
  const result: { type: 'text' | 'bold' | 'italic'; text: string }[] = [];
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: 'text', text: text.substring(lastIndex, match.index) });
    }
    if (match[2] !== undefined) {
      result.push({ type: 'bold', text: match[2] });
    } else if (match[3] !== undefined) {
      result.push({ type: 'italic', text: match[3] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push({ type: 'text', text: text.substring(lastIndex) });
  }

  return result;
}

export function renderFormattedMarkdown(text: any, dark: boolean) {
  if (!text) return null;
  const strText = typeof text === 'string' ? text : (typeof text === 'object' ? (text.text || JSON.stringify(text)) : String(text));
  const lines = strText.split('\n');

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const contentToParse = isBullet ? trimmed.slice(2) : trimmed;

    const parts = parseInlineMarkdown(contentToParse);

    const lineElements = parts.map((part, partIdx) => {
      if (part.type === 'bold') {
        return (
          <strong
            key={partIdx}
            className={`font-extrabold px-1.5 py-0.5 rounded transition-colors ${
              dark
                ? "text-purple-200 bg-purple-500/15 border border-purple-500/30"
                : "text-purple-950 bg-purple-50/80 border border-purple-200/60"
            }`}
          >
            {part.text}
          </strong>
        );
      }
      if (part.type === 'italic') {
        return (
          <em
            key={partIdx}
            className={`font-bold italic ${
              dark ? "text-purple-300" : "text-purple-800"
            }`}
          >
            {part.text}
          </em>
        );
      }
      return <span key={partIdx}>{part.text}</span>;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
          <div className="flex-1">{lineElements}</div>
        </div>
      );
    }

    return (
      <p key={lineIdx} className="my-1.5 leading-relaxed">
        {lineElements}
      </p>
    );
  });
}

class LessonErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[LessonPage ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B17] text-white flex items-center justify-center p-6">
          <div className="max-w-xl w-full text-center p-6 rounded-2xl bg-[#101828] border border-[#1e2a4a] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-xl">
              📘
            </div>
            <h2 className="text-base font-bold text-white">Lesson Section Notice</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              This lesson section is updating. Please refresh to load the latest exercises.
            </p>
            {this.state.error && (
              <div className="text-left p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-[11px] font-mono text-red-300 overflow-x-auto max-h-40">
                <p className="font-bold">{this.state.error.toString()}</p>
                {this.state.error.stack && <p className="text-[10px] text-red-400/80 mt-1 whitespace-pre-wrap">{this.state.error.stack}</p>}
              </div>
            )}
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all hover:opacity-90"
            >
              Refresh Section
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function LessonPage(props: { lessonId?: string; draftId?: string; onBack?: () => void }) {
  return (
    <LessonErrorBoundary>
      <LessonPageInner {...props} />
    </LessonErrorBoundary>
  );
}

function LessonPageInner({ lessonId, draftId, onBack }: { lessonId?: string; draftId?: string; onBack?: () => void }) {
  const queryClient = useQueryClient();
  const { dark } = useTheme();
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [blockResults, setBlockResults] = useState<Record<string, BlockResult>>({});
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [lessonScore, setLessonScore] = useState<number | null>(null);
  const [showObjectives, setShowObjectives] = useState(false);
  const [startTime] = useState(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const [isAdminPreview, setIsAdminPreview] = useState(false);

  useEffect(() => {
    const checkPreview = () => {
      setIsAdminPreview(localStorage.getItem("fp_admin_preview") === "true");
    };
    checkPreview();
    window.addEventListener("admin-preview-changed", checkPreview);
    return () => window.removeEventListener("admin-preview-changed", checkPreview);
  }, []);

  const handleInlineSave = async (fieldPath: string, value: any) => {
    if (!lesson) return;
    try {
      const activeId = lesson._id || lesson.lessonId;
      const canonical = { ...lesson };

      const keys = fieldPath.split(/[.\[\]]/).filter(Boolean);
      let currentObj: any = canonical;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (currentObj[k] === undefined) {
          currentObj[k] = {};
        } else {
          currentObj[k] = { ...currentObj[k] };
        }
        currentObj = currentObj[k];
      }
      currentObj[keys[keys.length - 1]] = value;

      queryClient.setQueryData(
        draftId ? ["draft", draftId] : ["lesson", lessonId],
        canonical
      );

      const url = draftId 
        ? `/admin/content-pipeline/drafts/${draftId}/update-fields` 
        : `/admin/lessons/${activeId}`;

      const payload = draftId
        ? { updatedParsedData: canonical }
        : canonical;

      await apiFetch(url, {
        method: draftId ? "PUT" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Inline save failed:", err);
    }
  };


  const EditableText = ({
    fieldPath,
    value,
    className = "",
    as: Tag = "span",
    placeholder = "Edit...",
    formatMarkdown = false,
  }: {
    fieldPath: string;
    value: string;
    className?: string;
    as?: any;
    placeholder?: string;
    formatMarkdown?: boolean;
  }) => {
    if (!isAdminPreview) {
      if (formatMarkdown && value) {
        return <div className={className}>{renderFormattedMarkdown(value, dark)}</div>;
      }
      return <Tag className={className}>{value || placeholder}</Tag>;
    }
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: React.FocusEvent<HTMLSpanElement>) => {
          const newVal = e.currentTarget.textContent || "";
          if (newVal !== value) {
            handleInlineSave(fieldPath, newVal);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        placeholder={placeholder}
        className={`${className} border-b border-dashed border-purple-500/40 hover:border-purple-500/80 focus:border-purple-500 focus:bg-purple-500/5 focus:outline-none rounded transition-all px-1 cursor-text select-text`}
      >
        {value}
      </Tag>
    );
  };

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const innerBg = dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-slate-50 border-slate-200";
  const textSec = dark ? "text-gray-300" : "text-slate-700 font-semibold";
  const textBody = dark ? "text-gray-200" : "text-slate-900 font-medium";
  const textMuted = dark ? "text-gray-400" : "text-slate-600 font-medium";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-slate-100";

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

  const sections = lesson ? buildSections(lesson) : [];

  const isLesson8 = lesson?.lessonNumber === 8 || lesson?.order === 8 || lesson?.title?.toLowerCase().includes('review') || lesson?.skill === 'REV' || lesson?.skill === 'review';

  const computeLesson7Id = (l: any) => {
    if (!l) return '';
    const id = (l.lessonId || l._id || '').toLowerCase();
    if (id.includes('l8')) return id.replace('l8', 'l7');
    if (id.includes('lesson-8')) return id.replace('lesson-8', 'lesson-7');
    if (id.includes('_8')) return id.replace('_8', '_7');
    if (l.chapterId) return `${l.chapterId.toLowerCase()}-l7`;
    return '';
  };

  const lesson7Id = computeLesson7Id(lesson);

  const { data: lesson7Direct } = useQuery({
    queryKey: ["lesson", lesson7Id],
    queryFn: () => apiFetch(`/lessons/${lesson7Id}`).then(res => res.json()).then(json => json.data as LessonData),
    enabled: isLesson8 && !!lesson7Id && !draftId
  });

  const { data: levelLessons } = useQuery({
    queryKey: ["level-lessons-l7", lesson?.level || 'A1'],
    queryFn: () => apiFetch(`/lessons?level=${lesson?.level || 'A1'}&limit=100`).then(res => res.json()).then(json => json.data || []),
    enabled: isLesson8 && !draftId
  });

  const lesson7FromList = levelLessons?.find((l: any) => {
    const isL7 = l.order === 7 || l.lessonNumber === 7 || l.skill === 'integrated' || l.anchorSkill === 'integrated' || l.lessonId?.endsWith('l7');
    if (!isL7) return false;
    if (lesson?.chapterId && l.chapterId === lesson.chapterId) return true;
    if (lesson?.lessonId && l.lessonId && l.lessonId.split('-')[0] === lesson.lessonId.split('-')[0]) return true;
    return true;
  });

  const lesson7 = lesson7Direct || lesson7FromList;

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

  function parseGrammarMarkdown(text: string) {
    if (!text) return null;
    const cleanText = text
      .replace(/---\s*/g, '')
      .replace(/^##\s*(?:Chapter Review|Grammar Summary|Chapter Grammar Summary)[^\n]*/gi, '')
      .replace(/Chapter Review/gi, 'Grammar Summary')
      .replace(/See grammar summary tables above\./gi, '')
      .replace(/Review all grammar points covered in this chapter\./gi, '')
      .replace(/Examples:\s*Refer to the grammar summary\./gi, '')
      .trim();

    const lines = cleanText.split('\n');
    const elements: React.ReactNode[] = [];
    let currentTableRows: string[][] = [];

    const flushTable = (key: number) => {
      if (currentTableRows.length === 0) return;
      const headers = currentTableRows[0];
      const dataRows = currentTableRows.slice(2); // Skip separator row |---|---|
      elements.push(
        <div key={`table-${key}`} className="overflow-x-auto my-3 rounded-xl border border-gray-200 dark:border-[#1e2a4a] shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-[#1e2a4a] text-xs">
            <thead className={dark ? "bg-purple-500/10" : "bg-purple-50"}>
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className={`px-4 py-2.5 text-left font-bold ${dark ? "text-purple-300" : "text-purple-700"}`}>{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-[#1e2a4a] ${dark ? "bg-[#070B17]/60" : "bg-white"}`}>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-4 py-2.5 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|')) {
        const cells = trimmed.split('|').slice(1, -1);
        currentTableRows.push(cells);
      } else {
        if (currentTableRows.length > 0) {
          flushTable(idx);
        }
        if (trimmed) {
          if (trimmed.startsWith('###')) {
            elements.push(<h4 key={idx} className={`text-xs font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{renderFormattedMarkdown(trimmed.replace(/^###\s*/, ''), dark)}</h4>);
          } else if (trimmed.startsWith('##')) {
            elements.push(<h3 key={idx} className={`text-sm font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{renderFormattedMarkdown(trimmed.replace(/^##\s*/, ''), dark)}</h3>);
          } else {
            elements.push(
              <div key={idx} className={`text-xs ${textBody} mb-2 leading-relaxed`}>
                {renderFormattedMarkdown(trimmed, dark)}
              </div>
            );
          }
        }
      }
    });

    if (currentTableRows.length > 0) {
      flushTable(lines.length);
    }

    return elements;
  }

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
        const rawBank = lesson?.vocabularyBank?.items || lesson?.vocabItems || [];
        const cleanedVocab: { french: string; english: string; pronunciation?: string; example?: string }[] = [];
        const seenFrench = new Set<string>();

        const isProseOrNote = (str: string) => {
          const l = str.toLowerCase();
          return (
            l.includes('cumulative note') ||
            l.includes('so this bank begins') ||
            l.includes('additive to') ||
            l.includes('cross-checked') ||
            l.includes('per rule') ||
            l.includes('general-purpose') ||
            l.includes('consistent with') ||
            l.includes('not new entries') ||
            l.includes('chapter vocabulary') ||
            (l.length > 80 && !l.includes('—'))
          );
        };

        const addVocab = (fr: string, en: string, pr?: string, ex?: string) => {
          if (isProseOrNote(fr) || isProseOrNote(en) || isProseOrNote(ex || '')) return;

          const cleanFr = fr.replace(/[\(（].*?see chapter vocabulary.*$/i, '').trim();
          const cleanEn = en.replace(/[\(（].*?see chapter vocabulary.*$/i, '').trim();
          if (!cleanFr || cleanFr.toLowerCase() === 'french' || cleanFr.match(/^[-:]+$/) || seenFrench.has(cleanFr.toLowerCase()) || isProseOrNote(cleanFr) || isProseOrNote(cleanEn)) {
            return;
          }
          seenFrench.add(cleanFr.toLowerCase());
          cleanedVocab.push({
            french: cleanFr,
            english: cleanEn,
            pronunciation: pr?.trim(),
            example: ex?.trim(),
          });
        };

        if (Array.isArray(rawBank)) {
          for (const item of rawBank) {
            if (typeof item === 'string') {
              if (item.includes('|')) {
                const cells = item.split('|').map(c => c.trim()).filter(Boolean);
                if (cells.length >= 2) {
                  addVocab(cells[0], cells[1], cells[2], cells[3]);
                }
              } else if (item.includes(' — ')) {
                const parts = item.split(' — ');
                addVocab(parts[0], parts.slice(1).join(' — '));
              }
            } else if (typeof item === 'object' && item) {
              const fr = item.french || (item as any).word || '';
              const en = item.english || (item as any).meaning || '';
              const pr = item.pronunciation || '';
              const ex = item.example || '';
              if (fr.includes('|')) {
                const cells = fr.split('|').map(c => c.trim()).filter(Boolean);
                if (cells.length >= 2) {
                  addVocab(cells[0], cells[1], cells[2], cells[3]);
                }
              } else {
                addVocab(fr, en, pr, ex);
              }
            }
          }
        }

        const vocabNote = lesson?.vocabularyBank?.cumulativeNote || 'Vocabulary consolidated from Lessons 1-6. No duplication across chapters. Any polysemy cases are deliberate.';

        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-2">
              <Languages className="w-5 h-5 text-purple-400" />
              <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>Chapter Vocabulary Bank</h3>
            </div>
            <p className={`text-xs ${textSec} mb-4`}>Review the consolidated vocabulary list for this chapter.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cleanedVocab.map((v, i) => (
                <motion.div key={v.french + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border ${dark ? "border-[#1e2a4a] bg-[#101828]/50" : "border-gray-100 bg-gray-50/50"} hover:border-purple-500/50 transition-all`}>
                  <button onClick={() => speak(v.french)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0 mt-0.5 shadow-sm">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-bold block ${dark ? "text-white" : "text-gray-900"}`}>{v.french}</span>
                    {v.pronunciation && <span className={`text-[10px] ${textMuted} block font-mono`}>[{v.pronunciation}]</span>}
                    <span className={`text-xs ${textSec} block mt-0.5`}>{v.english}</span>
                    {v.example && (
                      <div className="mt-1.5 pt-1.5 border-t dark:border-[#1e2a4a] border-gray-200/60 flex items-center justify-between">
                        <span className={`text-[11px] ${textMuted} italic`}>"{v.example}"</span>
                        <button onClick={() => speak(v.example!)} className="text-[10px] text-purple-400 hover:underline flex-shrink-0 ml-2">▶ Listen</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {vocabNote && (
              <div className={`mt-5 p-3.5 rounded-xl border ${dark ? "bg-purple-500/5 border-purple-500/20" : "bg-purple-50 border-purple-100"}`}>
                <p className={`text-xs ${dark ? "text-purple-300" : "text-purple-700"} leading-relaxed`}>{vocabNote}</p>
              </div>
            )}
          </div>
        );

      case 'grammarSummary':
        const summaryText = lesson!.grammarSummary?.content || lesson!.grammar?.explanation || '';
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 space-y-4`}>
            <div className="flex items-center gap-3 border-b dark:border-[#1e2a4a] border-gray-200 pb-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>Grammar Summary</h3>
            </div>
            {summaryText ? (
              <div>{parseGrammarMarkdown(summaryText)}</div>
            ) : (
              emptyState('Grammar Summary')
            )}
          </div>
        );

      case 'dialogue':
        const dialogueQuestions = [...(lesson!.reading?.questions || []), ...(lesson!.listening?.questions || [])].filter((q: any) => !q.id.includes('dummy'));
        const dialText = getDialogueText(lesson!);
        const dialTrans = getDialogueTranslation(lesson!);
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-5 h-5 text-purple-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
                Scenario Dialogue:{" "}
                {lesson!.reading?.text ? (
                  <EditableText fieldPath="reading.title" value={lesson!.reading?.title || "Reading Title"} />
                ) : (
                  <EditableText fieldPath="listening.title" value={lesson!.listening?.title || "Listening Title"} />
                )}
              </h3>
            </div>
            {dialText && (
              <>
                <div className="flex gap-3 mb-4">
                  <button onClick={() => speak(dialText)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                    <Volume2 className="w-4 h-4" /> Listen to Dialogue
                  </button>
                  {dialTrans && (
                    <button onClick={() => setShowTranslation(!showTranslation)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                      {showTranslation ? "Hide" : "Show"} English Translation
                    </button>
                  )}
                </div>
                <div className={`${innerBg} rounded-xl p-4 border text-sm leading-relaxed ${textBody} font-medium`}>
                  {lesson!.reading?.text ? (
                    <EditableText as="div" fieldPath="reading.text" value={lesson!.reading.text} className="w-full whitespace-pre-line" />
                  ) : (
                    <EditableText as="div" fieldPath="listening.transcript" value={lesson!.listening?.transcript || ""} className="w-full whitespace-pre-line" />
                  )}
                </div>
                {showTranslation && dialTrans && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                    <p className={`text-xs ${textMuted} italic p-4 rounded-xl border ${innerBg}`}>
                      {lesson!.reading?.text ? (
                        <EditableText as="span" fieldPath="reading.translation" value={lesson!.reading?.translation || ""} />
                      ) : (
                        <EditableText as="span" fieldPath="listening.translation" value={lesson!.listening?.translation || ""} />
                      )}
                    </p>
                  </motion.div>
                )}
              </>
            )}
            {dialogueQuestions.length > 0 && (
              <div className="mt-6 border-t dark:border-[#1e2a4a] border-gray-200 pt-6">
                <p className={`text-xs font-semibold mb-3 ${dark ? "text-purple-400" : "text-purple-600"}`}>Comprehension Questions:</p>
                <QuizComponent
                  questions={adaptQuestions(dialogueQuestions)}
                  type="listening"
                  onComplete={(score, total) => handleBlockComplete('listening', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('listening', answers)}
                />
              </div>
            )}
          </div>
        );

      case 'scene':
        const sceneText = lesson!.scene?.text || '';
        const sceneTrans = lesson!.scene?.translation || '';
        const sceneTitle = lesson!.scene?.title || 'Scene';
        const cqQuestions = lesson!.comprehensionQuestions || [];
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-5 h-5 text-purple-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{sceneTitle}</h3>
            </div>
            {sceneText && (
              <>
                <div className="flex gap-3 mb-4">
                  <button onClick={() => speak(sceneText)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                    <Volume2 className="w-4 h-4" /> Listen to Scene
                  </button>
                  {sceneTrans && (
                    <button onClick={() => setShowTranslation(!showTranslation)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                      {showTranslation ? "Hide" : "Show"} English Translation
                    </button>
                  )}
                </div>
                <div className={`${innerBg} rounded-xl p-4 border text-sm leading-relaxed ${textBody} font-medium whitespace-pre-line`}>
                  {sceneText}
                </div>
                {showTranslation && sceneTrans && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                    <p className={`text-xs ${textMuted} italic p-4 rounded-xl border ${innerBg}`}>{sceneTrans}</p>
                  </motion.div>
                )}
              </>
            )}
            {cqQuestions.length > 0 && !cqQuestions[0]?.id?.includes('cq-dummy') && (
              <div className="mt-6 border-t dark:border-[#1e2a4a] border-gray-200 pt-6">
                <p className={`text-xs font-semibold mb-3 ${dark ? "text-purple-400" : "text-purple-600"}`}>Comprehension Questions:</p>
                <QuizComponent
                  questions={adaptQuestions(cqQuestions)}
                  type="listening"
                  onComplete={(score, total) => handleBlockComplete('listening', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('listening', answers)}
                />
              </div>
            )}
          </div>
        );

      case 'speakingL7':
        const roleplayText = lesson!.speaking?.roleplay || 'In groups of four, act out the café scene above — Nora, Léo, Camille, and Awa — focusing on correct il y a and comparison language throughout.';
        const extTask = lesson!.speaking?.extensionTask || 'Improvise the actual apartment visit the next day, with Nora and the landlord (played by a new, one-off minor character, consistent with the cast\'s usage principle).';
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl overflow-hidden border border-purple-500/20`}>
            <div className="p-5 border-b dark:border-[#1e2a4a] border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Mic className="w-5 h-5 text-purple-400" />
                <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>Speaking Practice</h3>
              </div>
              <p className={`text-sm font-medium ${textBody} leading-relaxed mb-3`}>{roleplayText}</p>
              {extTask && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${dark ? "bg-purple-500/10 border-purple-500/30 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-800"}`}>
                  <span className="font-bold">Extension Task: </span>{extTask}
                </div>
              )}
            </div>
            <SpeakingDrill
              lessonLevel={lesson!.level}
              lessonTopic="Apartment Hunting Roleplay"
              guidedActivity={roleplayText}
              roleplayPrompt={roleplayText}
              onComplete={() => markSectionComplete(currentSectionIdx)}
            />
          </div>
        );

      case 'canDoReview':
        let canDoList = lesson?.canDoReview || [];
        const isGenericList = canDoList.length <= 2 && (canDoList[0]?.statement?.includes('Consolidate') || canDoList[0]?.statement?.includes('diagnostic') || !canDoList.length);

        if (isGenericList) {
          canDoList = [
            { statement: "I can name different types of housing.", lessonRef: "Lesson 1" },
            { statement: "I can describe my home in detail.", lessonRef: "Lesson 2" },
            { statement: "I can name rooms and furniture.", lessonRef: "Lesson 3" },
            { statement: "I can discuss looking for an apartment.", lessonRef: "Lesson 4" },
            { statement: "I can compare two homes.", lessonRef: "Lesson 5" },
            { statement: "I can discuss household chores.", lessonRef: "Lesson 6" },
            { statement: "I can combine all of the above in a real conversation.", lessonRef: "Lesson 7 (Integrated)" },
          ];
        }

        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>Chapter Review — Mini Review by Can-Do Statement</h3>
            </div>
            <p className={`text-xs ${textSec} mb-5`}>Each chapter goal mapped to the specific lesson(s) that taught it.</p>
            <div className="space-y-3">
              {canDoList.map((item: { statement: string; lessonRef: string }, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`flex items-center justify-between p-4 rounded-xl border ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} hover:border-emerald-500/50 transition-all`}>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-500/20">{i + 1}</span>
                    <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>{item.statement}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex-shrink-0 ml-4 ${dark ? "bg-purple-500/10 border-purple-500/30 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700"}`}>
                    → {item.lessonRef}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'mixedPractice':
        const rawMixedQs = lesson?.mixedPracticeExercises?.questions || lesson?.practiceExercises?.questions || [];
        const nonDelfQs = rawMixedQs.filter(q => !q.id?.includes('delf') && !q.id?.includes('mpe-dummy'));

        // Normalize Question 2 (Matching prepositions) if split into separate entries:
        const processedQs: LessonQuestion[] = [];
        let matchingPairs: { left: string; right: string }[] = [];
        let hasSeenMatching = false;

        for (const q of nonDelfQs) {
          const p = q.prompt || '';
          if (p.includes('Au-dessus de') || p.includes('Au fond de') || p.includes('Au milieu de')) {
            if (!hasSeenMatching) {
              hasSeenMatching = true;
              processedQs.push({
                id: 'pe-2-matching',
                type: 'matching',
                prompt: 'Match the French prepositions of location with their English meanings:',
                pairs: [
                  { left: 'Au-dessus de', right: 'Above' },
                  { left: 'Au fond de', right: 'At the back of' },
                  { left: 'Au milieu de', right: 'In the middle of' },
                ],
                correctAnswer: [
                  { left: 'Au-dessus de', right: 'Above' },
                  { left: 'Au fond de', right: 'At the back of' },
                  { left: 'Au milieu de', right: 'In the middle of' },
                ],
                explanation: 'Au-dessus de = Above, Au fond de = At the back of, Au milieu de = In the middle of.',
              });
            }
            continue;
          }
          processedQs.push(q);
        }

        const mixedQs = processedQs.length > 0 ? processedQs : nonDelfQs;
        if (!mixedQs.length) return emptyState('Mixed Practice Exercises');

        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4"><Repeat className="w-5 h-5 text-purple-400" /><h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>Mixed Practice Exercises</h3></div>
            <QuizComponent
              questions={adaptQuestions(mixedQs)}
              type="practice"
              onComplete={(score, total) => handleBlockComplete('mixedPractice', score, total)}
              onSubmit={(answers) => handleSubmitBlock('mixedPractice', answers)}
            />
          </div>
        );

      case 'assessment':
        const assessmentData = lesson?.assessment;
        let assessmentSections = Array.isArray(assessmentData?.sections) ? assessmentData.sections : [];

        const hasQuestions = assessmentSections.some((s: any) => Array.isArray(s?.questions) && s.questions.length > 0);
        if (!hasQuestions) {
          const l = (lesson || {}) as any;
          const fallbackQs = Array.isArray(l.assessmentQuestions) && l.assessmentQuestions.length ? l.assessmentQuestions
            : Array.isArray(l.delfQuestions) && l.delfQuestions.length ? l.delfQuestions
            : Array.isArray(l.mixedPracticeExercises?.questions) && l.mixedPracticeExercises.questions.length ? l.mixedPracticeExercises.questions
            : Array.isArray(l.practiceExercises?.questions) && l.practiceExercises.questions.length ? l.practiceExercises.questions
            : Array.isArray(l.practice?.questions) && l.practice.questions.length ? l.practice.questions
            : Array.isArray(l.questions) && l.questions.length ? l.questions
            : Array.isArray(l.comprehensionQuestions) && l.comprehensionQuestions.length ? l.comprehensionQuestions
            : Array.isArray(l.reading?.questions) && l.reading.questions.length ? l.reading.questions
            : Array.isArray(l.listening?.questions) && l.listening.questions.length ? l.listening.questions
            : [];

          if (fallbackQs.length > 0) {
            assessmentSections = [{
              title: 'Diagnostic Mini-Assessment Exercises',
              skill: 'DELF Assessment',
              points: 20,
              instructions: 'Complete the diagnostic assessment exercises based on this chapter content.',
              questions: fallbackQs,
            }];
          } else {
            assessmentSections = [{
              title: 'Diagnostic Assessment Exercise',
              skill: 'DELF Assessment',
              points: 10,
              instructions: 'Demonstrate your overall understanding of this chapter.',
              questions: [{
                id: `${lesson?.lessonId || 'l8'}-diag-1`,
                type: 'short_answer' as const,
                prompt: 'Summarize the key vocabulary and grammar rules introduced in this chapter.',
                correctAnswer: 'Open-ended response',
                explanation: 'Review your notes and practice expressing your thoughts clearly.',
              }],
            }];
          }
        }

        const DEFAULT_L7_TRANSCRIPT = `Nora : Regardez cette annonce ! C'est un studio meublé de 25 mètres carrés, à 10 minutes à pied de l'université.
Léo : Il y a une cuisine équipée et une salle de bain privée. Le loyer est de 550 euros par mois.
Camille : C'est moins cher que mon appartement actuel ! Et c'est disponible dès le 1er septembre.
Awa : Parfait ! Appelons le propriétaire pour organiser une visite demain après-midi. On vérifiera s'il y a assez d'espace pour les affaires de Nora.`;

        const lesson7Transcript = lesson7?.scene?.text || lesson7?.reading?.text || lesson7?.listening?.transcript || lesson?.scene?.text || lesson?.reading?.text || lesson?.listening?.transcript || DEFAULT_L7_TRANSCRIPT;

        return (
          <DELFAssessmentTabbedView
            assessmentData={assessmentData}
            assessmentSections={assessmentSections}
            lesson7Transcript={lesson7Transcript}
            dark={dark}
            cardBg={cardBg}
            textBody={textBody}
            textSec={textSec}
            handleBlockComplete={handleBlockComplete}
            handleSubmitBlock={handleSubmitBlock}
            speak={speak}
            lesson={lesson}
          />
        );

      case 'selfReflection':
        const reflectionItems = lesson!.selfReflection || lesson!.selfAssessment || [];
        if (!reflectionItems.length) return emptyState('Self-Reflection');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-amber-400" />
              <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Self-Reflection</h3>
            </div>
            <p className={`text-xs ${textSec} mb-4`}>Consider how well you achieved each of these goals.</p>
            <SelfAssessmentSection items={reflectionItems} dark={dark} title="Self-Reflection" />
          </div>
        );

      case 'completion':
        const completionText = lesson!.completionSummary?.content || '';
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-6 text-center`}>
            <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className={`text-base font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>Chapter Complete!</h3>
            <p className={`text-sm leading-relaxed ${textBody}`}>{completionText}</p>
          </div>
        );

      case 'delf':
        const delfQuestions = lesson!.practiceExercises?.questions?.filter((q: any) => q.id.includes('delf')) || [];
        const l7DialText = getDialogueText(lesson7);
        const l7DialTrans = getDialogueTranslation(lesson7);
        return (
          <div className="space-y-6">
            {lesson7 && l7DialText && (
              <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 border border-purple-500/20 bg-purple-500/5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-purple-400" />
                    <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-700"}`}>
                      Reference: Lesson 7 Dialogue
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${dark ? "bg-purple-500/10 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                    Required for Section 1
                  </span>
                </div>
                <div className="flex gap-2.5 mb-3">
                  <button onClick={() => speak(l7DialText)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm">
                    <Volume2 className="w-3.5 h-3.5" /> Listen to Dialogue
                  </button>
                  <button onClick={() => setShowTranscript(!showTranscript)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                    {showTranscript ? "Hide" : "Show"} French Transcript
                  </button>
                  {l7DialTrans && (
                    <button onClick={() => setShowTranslation(!showTranslation)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                      {showTranslation ? "Hide" : "Show"} English Translation
                    </button>
                  )}
                </div>
                {showTranscript && (
                  <div className={`rounded-xl p-3 border text-xs max-h-40 overflow-y-auto whitespace-pre-line ${dark ? "bg-black/40 border-[#1e2a4a] text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
                    {l7DialText}
                  </div>
                )}
                {showTranslation && l7DialTrans && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                    <p className={`text-[11px] ${textMuted} italic p-3 rounded-lg border ${innerBg}`}>
                      {l7DialTrans}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
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
          </div>
        );

      case 'warmUp':
        if (!lesson!.warmUp?.content) return emptyState('Warm-Up');
        return (
          <div className={`${dark ? "bg-indigo-500/5 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-3"><HelpCircle className="w-5 h-5 text-indigo-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Warm-Up</h3></div>
            <EditableText as="div" fieldPath="warmUp.content" value={lesson!.warmUp.content} formatMarkdown className={`text-sm leading-relaxed ${textBody}`} />
          </div>
        );

      case 'explanation':
        if (!lesson!.explanation?.content) return emptyState('Lesson Explanation');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Lesson Explanation</h3>
            <div className={`text-sm leading-relaxed ${textBody}`}>
              <EditableText as="div" fieldPath="explanation.content" value={lesson!.explanation.content} formatMarkdown className="w-full" />
            </div>
          </div>
        );

      case 'vocabulary':
        if (!lesson!.vocabItems?.length) return emptyState('Vocabulary');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>Vocabulary</h3>
            <div className="space-y-2">
              {lesson!.vocabItems.map((v: any, i: number) => (
                <motion.div key={v.french + i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${btnHover} transition-colors`}>
                  <button onClick={() => speak(v.french)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <EditableText as="span" fieldPath={`vocabItems[${i}].french`} value={v.french} className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`} />
                    <EditableText as="span" fieldPath={`vocabItems[${i}].pronunciation`} value={v.pronunciation} className={`text-[10px] ml-2 ${textMuted}`} />
                    <p className={`text-xs ${textSec}`}>
                      <EditableText fieldPath={`vocabItems[${i}].english`} value={v.english} />
                    </p>
                    {v.formality && <span className={`text-[10px] ml-2 px-1.5 py-0.5 rounded ${dark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{v.formality}</span>}
                    {v.usageNote && <p className={`text-[10px] ${textMuted} italic mt-0.5`}>{v.usageNote}</p>}
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
        const rText = lesson?.reading?.text || lesson?.scene?.text || getDialogueText(lesson);
        const rQuestions = (lesson?.reading?.questions && lesson.reading.questions.length > 0)
          ? lesson.reading.questions
          : (lesson?.comprehensionQuestions || []);

        if (!rText && !rQuestions.length) return emptyState('Reading');
        return (
          <>
            <ReadingSection lesson={lesson!} dark={dark} cardBg={cardBg} innerBg={innerBg} textBody={textBody} textMuted={textMuted}
              showTranslation={showTranslation} setShowTranslation={setShowTranslation} />
            {rQuestions.length > 0 && (
              <div className="mt-6">
                <QuizComponent
                  questions={adaptQuestions(rQuestions)}
                  type="reading"
                  onComplete={(score, total) => handleBlockComplete('reading', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('reading', answers)}
                />
              </div>
            )}
          </>
        );

      case 'listening':
        const lTranscript = lesson?.listening?.transcript || lesson?.scene?.text || getDialogueText(lesson);
        const lQuestions = (lesson?.listening?.questions && lesson.listening.questions.length > 0)
          ? lesson.listening.questions
          : (lesson?.comprehensionQuestions || []);

        if (!lTranscript && !lQuestions.length) return emptyState('Listening');
        return (
          <>
            <ListeningSection lesson={lesson!} dark={dark} cardBg={cardBg} innerBg={innerBg} textSec={textSec} textMuted={textMuted}
              showTranslation={showTranslation} setShowTranslation={setShowTranslation} />
            {lQuestions.length > 0 && (
              <div className="mt-6">
                <QuizComponent
                  questions={adaptQuestions(lQuestions)}
                  type="listening"
                  onComplete={(score, total) => handleBlockComplete('listening', score, total)}
                  onSubmit={(answers) => handleSubmitBlock('listening', answers)}
                />
              </div>
            )}
          </>
        );

      case 'speaking':
        const rawSpeaking = lesson?.speaking;
        let guidedAct = '';
        let roleplayP = '';
        let pronunTip = '';

        if (rawSpeaking) {
          if (typeof rawSpeaking === 'object') {
            guidedAct = typeof rawSpeaking.guidedActivity === 'string' ? rawSpeaking.guidedActivity : (rawSpeaking.guidedActivity ? String(rawSpeaking.guidedActivity) : '');
            roleplayP = typeof rawSpeaking.roleplay === 'string' ? rawSpeaking.roleplay : (rawSpeaking.roleplay ? String(rawSpeaking.roleplay) : '');
            pronunTip = typeof rawSpeaking.pronunciationTip === 'string' ? rawSpeaking.pronunciationTip : (rawSpeaking.pronunciationTip ? String(rawSpeaking.pronunciationTip) : '');

            // If guidedAct contains embedded Tip: or Roleplay: tags in legacy string imports
            if (guidedAct && (!roleplayP || !pronunTip || guidedAct.toLowerCase().includes('tip:'))) {
              const cleanText = guidedAct.replace(/^#+\s*Speaking[^\n]*\n?/i, '').trim();
              const gMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?Guided Activity[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=(?:[-*•#\s]*)(?:\*\*|)?Roleplay|(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip:|\n#|$)/i);
              const rMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?Roleplay[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip:|\n#|$)/i);
              const tMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=\n#|$)/i);

              if (gMatch) guidedAct = gMatch[1].trim();
              if (rMatch && !roleplayP) roleplayP = rMatch[1].trim();
              if (tMatch && !pronunTip) pronunTip = tMatch[1].trim();

              if (!gMatch && !rMatch && !tMatch) {
                const tipIndex = cleanText.search(/(?:Pronunciation\s+)?Tip:/i);
                if (tipIndex !== -1) {
                  guidedAct = cleanText.substring(0, tipIndex).trim();
                  if (!pronunTip) pronunTip = cleanText.substring(tipIndex).replace(/^(?:Pronunciation\s+)?Tip:\s*/i, '').trim();
                }
              }
            }
          } else {
            const cleanText = String(rawSpeaking).replace(/^#+\s*Speaking[^\n]*\n?/i, '').trim();
            const gMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?Guided Activity[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=(?:[-*•#\s]*)(?:\*\*|)?Roleplay|(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip:|\n#|$)/i);
            const rMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?Roleplay[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip:|\n#|$)/i);
            const tMatch = cleanText.match(/(?:[-*•#\s]*)(?:\*\*|)?(?:Pronunciation\s+)?Tip[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=\n#|$)/i);

            if (gMatch) guidedAct = gMatch[1].trim();
            if (rMatch) roleplayP = rMatch[1].trim();
            if (tMatch) pronunTip = tMatch[1].trim();

            if (!gMatch && !rMatch && !tMatch) {
              const tipIndex = cleanText.search(/(?:Pronunciation\s+)?Tip:/i);
              if (tipIndex !== -1) {
                guidedAct = cleanText.substring(0, tipIndex).trim();
                pronunTip = cleanText.substring(tipIndex).replace(/^(?:Pronunciation\s+)?Tip:\s*/i, '').trim();
              } else {
                guidedAct = cleanText;
              }
            }
          }
        }

        if (!guidedAct && !roleplayP && !pronunTip && !rawSpeaking) return emptyState('Speaking Practice');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl overflow-hidden`}>
            <div className="p-5 border-b dark:border-[#1e2a4a] border-gray-200 space-y-3">
              <div className="flex items-center gap-3"><Mic className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Speaking Practice</h3></div>
              
              {guidedAct && (
                <div>
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">🎯 Guided Activity:</p>
                  <div className={`text-xs ${textBody}`}>{renderFormattedMarkdown(guidedAct, dark)}</div>
                </div>
              )}
              
              {roleplayP && (
                <div className="pt-2 border-t dark:border-[#1e2a4a] border-gray-100">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">🎭 Roleplay Prompt:</p>
                  <div className={`text-xs ${textBody}`}>{renderFormattedMarkdown(roleplayP, dark)}</div>
                </div>
              )}

              {pronunTip && (
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-xs">
                  <p className="font-bold text-purple-800 dark:text-purple-300 mb-0.5">🗣️ Pronunciation Tip:</p>
                  <div className={textSec}>{renderFormattedMarkdown(pronunTip, dark)}</div>
                </div>
              )}
            </div>
            <SpeakingDrill
              lessonLevel={lesson!.level}
              lessonTopic={lesson!.title}
              guidedActivity={guidedAct}
              roleplayPrompt={roleplayP}
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
          ? (lesson!.practiceExercises?.questions?.filter((q: any) => !q.id.includes('delf')) || [])
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
              <EditableText as="h1" fieldPath="title" value={lesson.title} className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`} />
              <div className={`flex items-center gap-2 text-xs ${textSec}`}>
                <span>Lesson {lesson.order}</span>
                <span>&middot;</span>
                <span>{lesson.durationMinutes} min</span>
                {progress?.status === 'completed' && <span className="text-emerald-400 font-semibold">&#9679; Completed</span>}
              </div>
            </div>
          </div>
          {lesson.objectives?.length > 0 && (
            <div className={`rounded-2xl p-3 border mt-3 transition-all ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-100"}`}>
              {currentSectionIdx === 0 ? (
                <div>
                  <p className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${dark ? "text-purple-300" : "text-purple-700"}`}>
                    <span>🎯</span> What you'll learn:
                  </p>
                  <ul className="space-y-1">
                    {lesson.objectives.map((obj: string, i: number) => (
                      <li key={i} className={`text-xs ${textBody} flex items-start gap-2`}>
                        <span className="text-purple-400 mt-0.5">•</span>
                        <EditableText fieldPath={`objectives[${i}]`} value={obj} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowObjectives(!showObjectives)}
                    className={`w-full flex items-center justify-between text-xs font-bold ${dark ? "text-purple-300 hover:text-purple-200" : "text-purple-700 hover:text-purple-800"}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>🎯</span> Lesson Objectives ({lesson.objectives.length} items)
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20">
                      {showObjectives ? "Hide ▴" : "Show ▾"}
                    </span>
                  </button>
                  {showObjectives && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2.5 pt-2 border-t dark:border-purple-500/20 border-purple-200/60">
                      <ul className="space-y-1">
                        {lesson.objectives.map((obj: string, i: number) => (
                          <li key={i} className={`text-xs ${textBody} flex items-start gap-2`}>
                            <span className="text-purple-400 mt-0.5">•</span>
                            <EditableText fieldPath={`objectives[${i}]`} value={obj} />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              )}
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
  const isPlaceholderFormation = !grammar.formation || grammar.formation.includes('See grammar summary') || grammar.formation.includes('Recycled from');
  const isPlaceholderUsage = !grammar.usage || grammar.usage.includes('Review all grammar') || grammar.usage.includes('See explanation');
  const isPlaceholderExamples = !grammar.examples?.length || grammar.examples[0]?.includes('Refer to the');

  const parseExplanationContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentTableRows: string[][] = [];

    const flushTable = (key: number) => {
      if (currentTableRows.length === 0) return;
      const headers = currentTableRows[0];
      const dataRows = currentTableRows.slice(2); // Skip separator row |---|---|
      elements.push(
        <div key={`table-${key}`} className="overflow-x-auto my-4 rounded-xl border border-gray-250 dark:border-[#1e2a4a]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-[#1e2a4a] text-xs">
            <thead className={dark ? "bg-white/5" : "bg-gray-50"}>
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className={`px-4 py-2 text-left font-bold ${dark ? "text-purple-300" : "text-purple-700"}`}>{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-[#1e2a4a] ${dark ? "bg-black/20" : "bg-white"}`}>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-4 py-2 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|')) {
        const cells = trimmed.split('|').slice(1, -1);
        currentTableRows.push(cells);
      } else {
        if (currentTableRows.length > 0) {
          flushTable(idx);
        }
        if (trimmed) {
          if (trimmed.startsWith('###')) {
            elements.push(<h4 key={idx} className={`text-xs font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{trimmed.replace('###', '').trim()}</h4>);
          } else if (trimmed.startsWith('##')) {
            const hText = trimmed.replace(/^##\s*/, '').replace(/Chapter Review/gi, 'Grammar Summary').trim();
            elements.push(<h3 key={idx} className={`text-sm font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{hText}</h3>);
          } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            elements.push(
              <div key={idx} className="ml-2">
                {renderFormattedMarkdown(trimmed, dark)}
              </div>
            );
          } else {
            elements.push(
              <div key={idx} className={`text-xs ${textBody} mb-1.5 leading-relaxed`}>
                {renderFormattedMarkdown(trimmed, dark)}
              </div>
            );
          }
        }
      }
    });

    if (currentTableRows.length > 0) {
      flushTable(lines.length);
    }

    return elements;
  };

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Grammar</h3>

      {grammar.explanation && (
        <div className="mb-4">
          {parseExplanationContent(grammar.explanation)}
        </div>
      )}

      {grammar.formation && !isPlaceholderFormation && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>Formation:</p>
          <div>{parseExplanationContent(grammar.formation)}</div>
        </div>
      )}

      {grammar.usage && !isPlaceholderUsage && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>Usage:</p>
          <div>{parseExplanationContent(grammar.usage)}</div>
        </div>
      )}

      {grammar.examples.length > 0 && !isPlaceholderExamples && (
        <div className="mb-3">
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-purple-400" : "text-purple-600"}`}>Examples:</p>
          {grammar.examples.map((ex, i) => (
            <div key={i} className={`text-xs ${textBody} ml-2 mb-1`}>• {renderFormattedMarkdown(ex, dark)}</div>
          ))}
        </div>
      )}

      {grammar.commonMistakes.length > 0 && (
        <div className="mb-3">
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-red-400" : "text-red-600"}`}>Common Mistakes:</p>
          {grammar.commonMistakes.map((m, i) => (
            <div key={i} className={`text-xs p-2 rounded-lg mb-1 ${dark ? "bg-red-500/5" : "bg-red-50"}`}>
              <span className="text-red-400">✗</span> {renderFormattedMarkdown(m.wrong, dark)} → <span className="text-emerald-400">✓</span> {renderFormattedMarkdown(m.correct, dark)}
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
  const rawTitle = lesson.reading?.title || lesson.scene?.title || "Reading Passage";
  const rTitle = rawTitle.replace(/^Scene:\s*/i, 'Reading: ').replace(/^Scene$/i, 'Reading Passage');
  const rText = lesson.reading?.text || lesson.scene?.text || getDialogueText(lesson);
  const rTrans = lesson.reading?.translation || lesson.scene?.translation || getDialogueTranslation(lesson);

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 mb-4`}>
      <h3 className={`text-base font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{rTitle}</h3>

      {rText && (
        <div className={`${innerBg} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm leading-relaxed ${textBody}`}>
          {renderFormattedMarkdown(rText, dark)}
        </div>
      )}

      {rTrans && (
        <div className="mt-3">
          <button onClick={() => setShowTranslation(!showTranslation)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${dark ? "border-purple-500/30 text-purple-300 hover:bg-purple-500/10" : "border-purple-200 text-purple-700 hover:bg-purple-50"}`}>
            <Globe className="w-3.5 h-3.5" />
            {showTranslation ? "Hide English Translation" : "Show English Translation"}
          </button>
          {showTranslation && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
              <p className={`text-xs ${textMuted} italic p-4 rounded-xl border ${innerBg} leading-relaxed`}>{rTrans}</p>
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
  const rawLTitle = lesson.listening?.title || lesson.scene?.title || 'Listening Activity';
  const lTitle = rawLTitle.replace(/^Scene:\s*/i, 'Listening: ').replace(/^Scene$/i, 'Listening Activity');
  const lTranscript = lesson.listening?.transcript || lesson.scene?.text || getDialogueText(lesson);
  const lTranslation = lesson.listening?.translation || lesson.scene?.translation || getDialogueTranslation(lesson);
  const { speak: speakWithState, isSpeaking } = useSpeak();

  const cleanedTranscript = (lTranscript || "").replace(/\*\*/g, "").trim();

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 mb-4`}>
      <div className="flex items-center gap-3 mb-4">
        <Headphones className="w-5 h-5 text-purple-400" />
        <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>{lTitle}</h3>
      </div>

      {cleanedTranscript && (
        <div className="flex gap-3 mb-4 flex-wrap">
          <button onClick={() => speakWithState(cleanedTranscript)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Volume2 className="w-4 h-4" /> {isSpeaking ? "Playing..." : "Play Audio Dialogue"}
          </button>
          <button onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            {showTranscript ? "Hide French Transcript" : "Show French Transcript"}
          </button>
        </div>
      )}

      {showTranscript && cleanedTranscript && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className={`${innerBg} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm leading-relaxed ${textSec}`}>
          {renderFormattedMarkdown(cleanedTranscript, dark)}
        </motion.div>
      )}

      {lTranslation && (
        <div className="mt-3">
          <button onClick={() => setShowTranslation(!showTranslation)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${dark ? "border-purple-500/30 text-purple-300 hover:bg-purple-500/10" : "border-purple-200 text-purple-700 hover:bg-purple-50"}`}>
            <Globe className="w-3.5 h-3.5" />
            {showTranslation ? "Hide English Translation" : "Show English Translation"}
          </button>
          {showTranslation && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
              <p className={`text-xs ${textMuted} italic p-4 rounded-xl border ${innerBg} leading-relaxed`}>{lTranslation}</p>
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
  const writing = lesson.writing || { task: '', modelAnswer: '', checklist: [] };

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
      <div className="flex items-center gap-3 mb-3"><PenTool className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Writing Practice</h3></div>
      {writing.task && <div className={`text-sm ${textBody} mb-3 leading-relaxed`}>{renderFormattedMarkdown(writing.task, dark)}</div>}

      {writing.checklist.length > 0 && (
        <div className={`${innerBg} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold mb-1.5 ${dark ? "text-purple-400" : "text-purple-600"}`}>Checklist:</p>
          {writing.checklist.map((item, i) => (
            <div key={i} className={`text-xs ${textBody} flex items-start gap-1.5 mb-0.5`}>
              <span className="text-emerald-400">&#10003;</span>
              <span>{renderFormattedMarkdown(item, dark)}</span>
            </div>
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
              <div className={`text-xs ${textBody} leading-relaxed`}>{renderFormattedMarkdown(writing.modelAnswer, dark)}</div>
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

// ─── DELF Assessment Tabbed View ──────────────────────────────────────────

function DELFAssessmentTabbedView({ assessmentData, assessmentSections, lesson7Transcript, dark, cardBg, textBody, textSec, handleBlockComplete, handleSubmitBlock, speak, lesson }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const getSectionSkill = (secItem: any, idx: number) => {
    const text = `${secItem?.title || ''} ${secItem?.instructions || ''} ${secItem?.skill || ''} ${secItem?.questions?.[0]?.prompt || ''}`.toLowerCase();
    if (text.includes('listening') || text.includes('lesson 7') || idx === 0) return 'Listening';
    if (text.includes('oral') || text.includes('speaking') || idx === 3) return 'Speaking';
    if (text.includes('writing') || text.includes('written') || idx === 2) return 'Writing';
    return 'Reading';
  };

  const rawSec = assessmentSections[activeTab] || assessmentSections[0];
  if (!rawSec) return null;

  const displaySkill = getSectionSkill(rawSec, activeTab);
  const isListeningSec = displaySkill === 'Listening';
  const isSpeakingSec = displaySkill === 'Speaking';
  const isReadingSec = displaySkill === 'Reading';

  let sec = { ...rawSec };

  // Normalize Section 1 (Listening Comprehension)
  if (isListeningSec || activeTab === 0) {
    sec.instructions = "Listen to (read) the apartment-hunting scene from Lesson 7 and answer the comprehension question below:";
    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length > 0) {
      sec.questions = rawQs.map((q: any) => {
        let p = (q.prompt || '')
          .replace(/^\*\*Section\s*\d+[^*]+\*\*\s*/gi, '')
          .replace(/^Section\s*\d+[^:]*:\s*/gi, '')
          .replace(/^Listen to \(read\).*?and answer:\s*/gi, '')
          .replace(/\*\(\d+\s*points?\)\*/gi, '')
          .replace(/\(\d+\s*points?\)/gi, '')
          .trim();
        if (!p || p.length < 5) {
          p = "What features does the listing have, and what does the group plan to check during the visit?";
        }
        return { ...q, prompt: p };
      });
    }
  }

  // Normalize Section 2 (Reading Comprehension)
  if (isReadingSec || activeTab === 1) {
    const sourcePassage = sec.sourceText || "Monsieur Roy cherche une nouvelle maison. Il visite une maison spacieuse avec quatre chambres. Il y a un grand jardin, mais il n'y a pas de garage. La maison est calme, loin du centre-ville.";
    sec.sourceText = sourcePassage;

    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    const combinedPrompt = rawQs[0]?.prompt || sec.instructions || '';

    if (combinedPrompt.includes('(a)') && combinedPrompt.includes('(b)') && combinedPrompt.includes('(c)')) {
      sec.instructions = "Read the short passage below and answer all 3 comprehension questions:";
      sec.questions = [
        {
          id: 'sec2-q1',
          type: 'short_answer',
          prompt: '(a) What is Monsieur Roy looking for?',
          correctAnswer: 'Une nouvelle maison (A new house)',
          explanation: 'Passage states: Monsieur Roy cherche une nouvelle maison.',
        },
        {
          id: 'sec2-q2',
          type: 'short_answer',
          prompt: '(b) What does the house have and not have?',
          correctAnswer: 'It has 4 bedrooms and a big garden, but no garage.',
          explanation: 'Passage states: 4 chambres, un grand jardin, mais pas de garage.',
        },
        {
          id: 'sec2-q3',
          type: 'short_answer',
          prompt: '(c) How is the location described?',
          correctAnswer: 'Quiet, far from downtown (Calme, loin du centre-ville).',
          explanation: 'Passage states: La maison est calme, loin du centre-ville.',
        },
      ];
    }
  }

  // Normalize Section 3 (Written Production)
  if (displaySkill === 'Writing' || activeTab === 2) {
    sec.instructions = "";
    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length > 0) {
      sec.questions = rawQs.map((q: any) => {
        let p = (q.prompt || '')
          .replace(/^\*\*Section\s*\d+[^*]+\*\*\s*/gi, '')
          .replace(/^Section\s*\d+[^:]*:\s*/gi, '')
          .replace(/\*\(\d+\s*points?\)\*/gi, '')
          .replace(/\(\d+\s*points?\)/gi, '')
          .trim();
        if (!p || p.length < 5) {
          p = "Write a 6–8 line original description of your ideal home, using the complete il y a system, at least three prepositions of location, and at least two descriptive adjectives.";
        }
        return { ...q, prompt: p };
      });
    }
  }

  // Normalize Section 4 (Oral Production)
  if (isSpeakingSec || activeTab === 3) {
    sec.instructions = "Describe your actual home in detail (1–2 minutes):";
    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length > 0) {
      sec.questions = rawQs.map((q: any) => {
        let p = (q.prompt || '')
          .replace(/^\*\*Section\s*\d+[^*]+\*\*\s*/gi, '')
          .replace(/^Section\s*\d+[^:]*:\s*/gi, '')
          .replace(/\*\(\d+\s*points?\)\*/gi, '')
          .replace(/\(\d+\s*points?\)/gi, '')
          .trim();
        if (!p || p.length < 5) {
          p = "Describe your actual home in detail — type, rooms, furniture, and location within the home — for 1–2 minutes.";
        }
        return { ...q, prompt: p };
      });
    }
  }

  const titleStr = typeof sec?.title === 'string' ? sec.title : (sec?.title ? String(sec.title) : `Section ${activeTab + 1}`);
  const instStr = typeof sec?.instructions === 'string' ? sec.instructions : '';

  const secQuestions = (Array.isArray(sec?.questions) ? sec.questions : []).map((q: any) => ({
    ...q,
    prompt: (q.prompt || '')
      .replace(/^\*\*Section\s*\d+\s*[-—][^\*]+\*\*\s*/gi, '')
      .replace(/^Section\s*\d+\s*[-—][^\:]+:\s*/gi, '')
      .trim(),
  }));

  return (
    <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 space-y-5`}>
      <div className="flex items-center justify-between border-b dark:border-[#1e2a4a] border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-purple-400" />
          <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            {assessmentData?.examStyle || 'DELF'} Mini-Assessment
          </h3>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${dark ? "bg-purple-500/10 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"}`}>
          Section {activeTab + 1} of {assessmentSections.length}
        </span>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {assessmentSections.map((s: any, idx: number) => {
          const sSkill = getSectionSkill(s, idx);
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : dark
                  ? "bg-[#0c1224] text-gray-300 border border-[#1e2a4a] hover:bg-white/5"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>Section {idx + 1}</span>
              <span className="opacity-75">({sSkill})</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-xl border ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{titleStr} ({displaySkill})</h4>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${dark ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "bg-purple-100 text-purple-700"}`}>{sec?.points || 10} points</span>
        </div>

        {!isSpeakingSec && instStr && <p className={`text-xs ${textBody} mb-4 leading-relaxed`}>{instStr}</p>}

        {/* Section 1 Listening Reference */}
        {isListeningSec && (
          <div className={`p-4 rounded-xl border mb-4 space-y-3 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-400" />
                <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-700"}`}>
                  Reference: Lesson 7 Scene Audio
                </span>
              </div>
              <div className="flex items-center gap-2">
                {lesson7Transcript && (
                  <button
                    type="button"
                    onClick={() => speak(lesson7Transcript)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen to Audio
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    dark ? "bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30" : "bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200"
                  }`}
                >
                  {showTranscript ? "Hide Transcript ▴" : "Show Transcript ▾"}
                </button>
              </div>
            </div>
            {showTranscript && (
              lesson7Transcript ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <p className={`text-xs ${textBody} leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto p-3 rounded-lg ${dark ? "bg-black/40 border border-purple-500/20 text-gray-200" : "bg-white border border-purple-200 text-gray-800"}`}>
                    {lesson7Transcript}
                  </p>
                </motion.div>
              ) : (
                <p className={`text-xs ${textSec} italic`}>Loading Lesson 7 dialogue transcript...</p>
              )
            )}
          </div>
        )}

        {/* Section 2 Reading Source Passage */}
        {sec?.sourceText && (
          <div className={`p-4 rounded-xl border mb-4 text-xs leading-relaxed whitespace-pre-line ${dark ? "bg-purple-500/5 border-purple-500/20 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"}`}>
            <p className="font-bold mb-1 flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
              <span>📖</span> Reading Passage:
            </p>
            <p className="italic">{String(sec.sourceText)}</p>
          </div>
        )}

        {/* Questions */}
        {!isSpeakingSec && secQuestions.length > 0 && (
          <QuizComponent
            questions={adaptQuestions(secQuestions)}
            type="assessment"
            onComplete={(score, total) => handleBlockComplete(`assessment-${activeTab}`, score, total)}
            onSubmit={(answers) => handleSubmitBlock(`assessment-${activeTab}`, answers)}
          />
        )}

        {/* Speaking Practice for Oral Section */}
        {isSpeakingSec && (
          <div className="mt-2">
            <SpeakingDrill
              lessonLevel={lesson?.level || 'A1'}
              lessonTopic={lesson?.title || 'Oral Production'}
              guidedActivity={secQuestions[0]?.prompt || instStr}
              onComplete={() => handleBlockComplete(`assessment-${activeTab}`, 3, 3)}
            />
          </div>
        )}

        {/* Navigation between DELF sections */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-[#1e2a4a] border-gray-200">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab(t => Math.max(0, t - 1))}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeTab === 0
                ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                : dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            ← Previous Section
          </button>
          {activeTab < assessmentSections.length - 1 && (
            <button
              onClick={() => setActiveTab(t => Math.min(assessmentSections.length - 1, t + 1))}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all"
            >
              Next Section →
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
