import { useState, useCallback, useRef, useEffect, useMemo, Component, type ErrorInfo, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ArrowLeft, BookOpen, Volume2, Trophy, Award,
  ChevronLeft, ChevronRight, HelpCircle, Star, Headphones, PenTool, Mic,
  Repeat, Globe, FileText, Languages, Zap, Sparkles, Printer, X, RotateCcw,
  Pause, Play, Square
} from "lucide-react";
import { WritingSubmission } from "./LearningComponents";
import { SpeakingDrill } from "./SpeakingDrill";
import { QuizComponent } from "./QuizComponent";
import { speak, useSpeak, stopAudio, pauseAudio, toggleAudio } from "~/lib/speech";

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

function formatObjectivesList(raw: any): string[] {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [String(raw)];
  const result: string[] = [];

  items.forEach((item) => {
    if (typeof item !== "string") return;
    const parts = item
      .split(/\n|(?<=\.)\s*(?=[-•*])|\s*[-•*]\s+/)
      .map((p) => p.replace(/^[-•*\s]+/, "").trim())
      .filter((p) => p.length > 0);

    result.push(...parts);
  });

  return result;
}

interface BlockResult {
  score: number;
  total: number;
  completed: boolean;
}

// ─── Adapter: LessonQuestion → QuizComponent-compatible shape ────────────────

function parseOptionsFromPrompt(text: string): { cleanPrompt: string; options: string[] } | null {
  if (!text) return null;
  const optionMatches = [...text.matchAll(/([a-d])\)\s*([^a-d\)\n]+?)(?=\s+[a-d]\)|$)/gi)];
  if (optionMatches.length >= 2) {
    const options = optionMatches.map(m => m[2].trim());
    let cleanPrompt = text;
    const firstOptionIdx = text.search(/[a-d]\)\s*/i);
    if (firstOptionIdx > 0) {
      cleanPrompt = text.substring(0, firstOptionIdx).trim();
      cleanPrompt = cleanPrompt.replace(/^(?:\d+[\.\)]\s*)?(?:Multiple Choice|Matching|Fill in the Blank|Sentence Ordering|Short Answer|Communicative Practice)[:\s]*/i, '').trim();
    }
    return { cleanPrompt, options };
  }
  return null;
}

function parseOrderingFromPrompt(text: string): { cleanPrompt: string; items: string[] } | null {
  if (!text) return null;
  const cleanStr = text.replace(/\r?\n+/g, ' ').trim();
  const rawItems: string[] = [];

  const matches = cleanStr.matchAll(/\(([a-e1-5])\)\s*([^\(\)]+?)(?=\s*\([a-e1-5]\)|$)/gi);
  for (const m of matches) {
    if (m[2]?.trim()) rawItems.push(m[2].trim());
  }

  if (rawItems.length >= 2) {
    let cleanPrompt = cleanStr;
    const firstItemIdx = cleanStr.search(/\([a-e1-5]\)/i);
    if (firstItemIdx > 0) {
      cleanPrompt = cleanStr.substring(0, firstItemIdx).trim();
      cleanPrompt = cleanPrompt.replace(/^(?:\d+[\.\)]\s*)?(?:Sentence Ordering|Ordering)[:\s]*/i, '').trim();
    }
    return { cleanPrompt: cleanPrompt || 'Put in a logical order:', items: rawItems };
  }
  return null;
}

function extractPairsFromText(text: string): { pairs: Record<string, string>; title: string } | null {
  if (!text) return null;
  if (text.includes('__________') || text.includes('______')) return null;

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const pairs: Record<string, string> = {};
  const nonPairLines: string[] = [];

  for (const line of lines) {
    if (line.includes('__________') || line.includes('______')) {
      nonPairLines.push(line);
      continue;
    }

    const m = line.match(/^([^—\–\:-]+)\s*[—\–\:-]+\s*(?:[a-eA-E0-9][\.\)]\s*)?(.+)$/);
    if (m && m[1].trim() && m[2].trim()) {
      const left = m[1].replace(/^\d+[\.\)]\s*/, '').replace(/^[*•\-]\s*/, '').trim();
      const right = m[2].replace(/^[a-eA-E0-9][\.\)]\s*/, '').trim();
      const leftLower = left.toLowerCase();

      const isInstructionWord = ['complete', 'fill', 'fill in', 'question', 'select', 'translate', 'instructions', 'matching', 'multiple choice'].some(w => leftLower.startsWith(w));

      if (left && right && left.length < 70 && right.length < 100 && !isInstructionWord) {
        pairs[left] = right;
        continue;
      }
    }
    nonPairLines.push(line);
  }

  if (Object.keys(pairs).length >= 2) {
    const title = nonPairLines.join(' ').replace(/^(?:\d+[\.\)]\s*)?(?:Matching)[:\s]*/i, '').trim() || 'Match each French term with its correct translation:';
    return { pairs, title };
  }

  return null;
}

function parsePairLine(prompt: string): { left: string; right: string } | null {
  if (!prompt) return null;
  const str = String(prompt).replace(/\r?\n+/g, ' ').trim();
  if (str.includes('__________') || str.includes('______')) return null;

  const clean = str.replace(/^(?:\d+[\.\)]\s*)?(?:[*•\-]\s*)?(?:Matching|Multiple Choice|Fill in the Blank|Sentence Ordering|Short Answer)?[:\s]*/i, '').trim();

  // Match any "Left text — Right text" or "Left text — a) Right text" pattern cleanly
  const m = clean.match(/^(.+?)\s*(?:[\u2014\u2013]|--|\s+-\s+|\s*:\s*)\s*(?:[a-eA-E0-9][\.\)]\s*|\([a-eA-E0-9]\)\s*)?(.+)$/);
  if (m && m[1] && m[2]) {
    const left = m[1].replace(/^\d+[\.\)]\s*/, '').replace(/^[*•\-]\s*/, '').trim();
    const right = m[2].replace(/^[a-eA-E0-9][\.\)]\s*/, '').trim();
    const leftLower = left.toLowerCase();

    const isInstruction = ['complete', 'fill', 'fill in', 'question', 'select', 'translate', 'multiple choice', 'sentence ordering', 'short answer', 'matching', 'match'].some(w => leftLower.startsWith(w));

    if (left && right && left.length > 0 && left.length < 120 && right.length > 0 && !isInstruction) {
      return { left, right };
    }
  }
  return null;
}

function adaptQuestions(questions: LessonQuestion[]) {
  if (!questions || !Array.isArray(questions)) return [];

  const grouped: any[] = [];
  let i = 0;

  while (i < questions.length) {
    const rawQ = questions[i];
    const prompt = String(rawQ?.prompt || (rawQ as any)?.text || (rawQ as any)?.question || '').trim();
    const promptLower = prompt.toLowerCase();

    const isMatchingHeader = promptLower.startsWith('match') || rawQ.type === 'matching' || Boolean(rawQ.pairs && Object.keys(rawQ.pairs).length > 0);

    if (isMatchingHeader) {
      let pairsObj: Record<string, string> = {};
      if (rawQ.pairs) {
        if (Array.isArray(rawQ.pairs)) {
          rawQ.pairs.forEach((p: any) => {
            if (p.left && p.right) pairsObj[p.left] = p.right;
          });
        } else if (typeof rawQ.pairs === 'object') {
          pairsObj = { ...rawQ.pairs };
        }
      }

      // Extract inline pairs from prompt text if pairs object was empty
      if (Object.keys(pairsObj).length === 0) {
        const extracted = extractPairsFromText(prompt);
        if (extracted && Object.keys(extracted.pairs).length >= 2) {
          pairsObj = extracted.pairs;
        }
      }

      // Look ahead to absorb consecutive pair line items
      let nextIdx = i + 1;
      while (nextIdx < questions.length) {
        const nextQ = questions[nextIdx];
        const nextPrompt = String(nextQ?.prompt || (nextQ as any)?.text || (nextQ as any)?.question || '').trim();
        const pair = parsePairLine(nextPrompt);

        if (pair) {
          pairsObj[pair.left] = pair.right;
          nextIdx++;
        } else if (nextQ.type === 'matching' && nextQ.pairs) {
          if (Array.isArray(nextQ.pairs)) {
            nextQ.pairs.forEach((p: any) => { if (p.left && p.right) pairsObj[p.left] = p.right; });
          } else if (typeof nextQ.pairs === 'object') {
            Object.assign(pairsObj, nextQ.pairs);
          }
          nextIdx++;
        } else {
          break;
        }
      }

      if (Object.keys(pairsObj).length >= 2) {
        let title = prompt.replace(/^(?:\d+[\.\)]\s*)?(?:Matching)[:\s]*/i, '').trim();
        if (!title || parsePairLine(title) || title.includes('—') || title.includes('–')) {
          title = 'Match each item with its correct pair:';
        }
        grouped.push({
          id: rawQ.id || `q-matching-${i}`,
          text: title,
          type: 'matching',
          pairs: pairsObj,
          explanation: rawQ.explanation || 'Match each item with its correct pair.',
          points: 1,
        });
        i = nextIdx; // Skip all absorbed pair line items!
        continue;
      }
    }

    // Check if item is an orphan pair line sequence
    const standalonePair = parsePairLine(prompt);
    if (standalonePair) {
      const pairsObj: Record<string, string> = { [standalonePair.left]: standalonePair.right };
      let nextIdx = i + 1;
      while (nextIdx < questions.length) {
        const nextQ = questions[nextIdx];
        const nextPrompt = String(nextQ?.prompt || (nextQ as any)?.text || (nextQ as any)?.question || '').trim();
        const pair = parsePairLine(nextPrompt);
        if (pair) {
          pairsObj[pair.left] = pair.right;
          nextIdx++;
        } else {
          break;
        }
      }

      if (Object.keys(pairsObj).length >= 2) {
        grouped.push({
          id: `q-matching-${i}`,
          text: 'Match each expression to its use:',
          type: 'matching',
          pairs: pairsObj,
          explanation: 'Match each item with its correct pair.',
          points: 1,
        });
        i = nextIdx;
        continue;
      }
    }

    grouped.push(rawQ);
    i++;
  }

  // Pass 2: Adapt grouped items
  const adapted = grouped.map((q, idx) => {
    let resolvedText = String(q.prompt || q.text || q.question || '').trim();
    let resolvedOptions = q.options;
    let resolvedPairs = q.pairs;
    let resolvedItems = q.items;

    // Check inline options
    const hasDummyOptions = Array.isArray(resolvedOptions) && resolvedOptions.length > 0 && resolvedOptions.every((opt: any) => /^Option\s+[A-Z]$/i.test(String(opt).trim()));
    if (!resolvedOptions || resolvedOptions.length < 2 || hasDummyOptions) {
      const parsedMcq = parseOptionsFromPrompt(resolvedText);
      if (parsedMcq) {
        resolvedText = parsedMcq.cleanPrompt;
        resolvedOptions = parsedMcq.options;
      }
    }

    // Check ordering items
    if (!resolvedItems || resolvedItems.length < 2) {
      const parsedOrdering = parseOrderingFromPrompt(resolvedText);
      if (parsedOrdering) {
        resolvedText = parsedOrdering.cleanPrompt;
        resolvedItems = parsedOrdering.items;
      }
    }

    const hasPairs = resolvedPairs && Object.keys(resolvedPairs).length >= 2;
    const hasOptions = Array.isArray(resolvedOptions) && resolvedOptions.length >= 2 && !resolvedOptions.every((opt: any) => /^Option\s+[A-Z]$/i.test(String(opt).trim()));
    const hasItems = Array.isArray(resolvedItems) && resolvedItems.length >= 2;
    const isBlankQuestion = resolvedText.includes('__________') || resolvedText.includes('______');

    let resolvedType = q.type;
    if (hasPairs) {
      resolvedType = 'matching';
    } else if (hasOptions && (!resolvedType || resolvedType === 'short_answer')) {
      resolvedType = 'multiple_choice';
    } else if (hasItems && (!resolvedType || resolvedType === 'short_answer')) {
      resolvedType = 'ordering';
    } else if (isBlankQuestion) {
      resolvedType = 'fill_blank';
    } else if (!resolvedType) {
      resolvedType = 'short_answer';
    }

    // Clean section header prefixes like "1. Multiple Choice" or "2. Matching"
    resolvedText = resolvedText.replace(/^(?:\d+[\.\)]\s*)?(?:Multiple Choice|Matching|Fill in the Blank|Sentence Ordering|Short Answer|Communicative Practice)[:\s]*/i, '').trim();

    return {
      id: q.id || (q as any)._id || `q-${idx}`,
      text: resolvedText,
      type: resolvedType,
      options: hasOptions ? resolvedOptions : undefined,
      correctAnswer: q.correctAnswer as string | string[] | undefined,
      explanation: q.explanation,
      pairs: hasPairs ? resolvedPairs : undefined,
      items: hasItems ? resolvedItems : undefined,
      correctOrder: Array.isArray(q.correctAnswer) && resolvedType === 'ordering' ? q.correctAnswer as string[] : undefined,
      points: 1,
    };
  });

  return adapted;
}

function parseOverviewMetadata(rawObjectives: any, lessonData: any) {
  const rawList: string[] = Array.isArray(rawObjectives)
    ? rawObjectives.flatMap(x => (typeof x === 'string' ? x.split('\n') : [String(x?.text || x?.content || x)]))
    : (typeof rawObjectives === 'string' ? rawObjectives.split('\n') : []);

  const cleanObjectives: string[] = [];
  let extractedGrammar = lessonData?.grammarFocus || '';
  let extractedVocab = lessonData?.vocabularyFocus || lessonData?.vocabFocus || '';
  let extractedTime = lessonData?.durationMinutes || lessonData?.estimatedDuration || 0;

  for (const item of rawList) {
    const text = item.trim();
    if (!text) continue;

    // Extract embedded "Grammar Focus: ..."
    const gMatch = text.match(/(?:📚\s*)?Grammar Focus\s*:\s*(.+?)(?=\s*(?:🗣️\s*)?Vocabulary Focus|\s*(?:⏱️\s*)?Estimated Time|$)/i);
    if (gMatch && gMatch[1] && !extractedGrammar) {
      extractedGrammar = gMatch[1].trim();
    }

    // Extract embedded "Vocabulary Focus: ..."
    const vMatch = text.match(/(?:🗣️\s*)?Vocabulary Focus\s*:\s*(.+?)(?=\s*(?:⏱️\s*)?Estimated Time|\s*(?:📚\s*)?Grammar Focus|$)/i);
    if (vMatch && vMatch[1] && !extractedVocab) {
      extractedVocab = vMatch[1].trim();
    }

    // Extract embedded "Estimated Time: 35 minutes"
    const tMatch = text.match(/(?:⏱️\s*)?Estimated Time\s*:\s*(\d+)\s*(?:minutes|min)?/i);
    if (tMatch && tMatch[1] && !extractedTime) {
      extractedTime = parseInt(tMatch[1], 10);
    }

    // Strip inline metadata tags from objective bullets
    let bulletText = text
      .replace(/(?:📚\s*)?Grammar Focus\s*:\s*.+?(?=\s*(?:🗣️\s*)?Vocabulary Focus|\s*(?:⏱️\s*)?Estimated Time|$)/gi, '')
      .replace(/(?:🗣️\s*)?Vocabulary Focus\s*:\s*.+?(?=\s*(?:⏱️\s*)?Estimated Time|\s*(?:📚\s*)?Grammar Focus|$)/gi, '')
      .replace(/(?:⏱️\s*)?Estimated Time\s*:\s*\d+\s*(?:minutes|min)?/gi, '')
      .replace(/^[•\-\*]\s*/, '')
      .trim();

    if (bulletText.length > 3) {
      // Split items merged with " - " or bullet patterns: e.g. "Name housing. - Ask question. - Form negative."
      const subParts = bulletText.split(/\s*[\-\•]\s+/).map(p => p.trim()).filter(Boolean);
      for (const sub of subParts) {
        if (sub.length > 3 && !cleanObjectives.includes(sub)) {
          cleanObjectives.push(sub);
        }
      }
    }
  }

  if (!extractedTime) extractedTime = 25;

  return {
    cleanObjectives,
    grammarFocus: extractedGrammar,
    vocabularyFocus: extractedVocab,
    durationMinutes: extractedTime,
  };
}

function getCleanChapterNumber(lesson: any): string {
  if (!lesson) return '1';
  if (lesson.chapterNumber) return String(lesson.chapterNumber);
  const chMatch = String(lesson.chapterId || lesson.lessonId || '').match(/ch(\d+)/i);
  if (chMatch && chMatch[1]) return chMatch[1];
  const numMatch = String(lesson.chapterId || '').match(/(\d+)/);
  if (numMatch && numMatch[1]) return numMatch[1];
  return '1';
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

function sanitizeTranslation(raw: string | undefined): string {
  if (!raw) return "";
  const split = raw.split(/(?:\*\*|#+\s*)?(?:Comprehension Questions|Reading Activity|Listening Activity|Questions|Answer Key):?/i);
  const clean = (split[0] || '')
    .replace(/\([^\)]*(?:support|toggle|hide|A1[–-]A2)[^\)]*\)/gi, '')
    .replace(/^(?:\*\*|#+\s*)?English Translation:?/i, '')
    .trim()
    .replace(/^["“]/, '')
    .replace(/["”]$/, '')
    .trim();
  return clean;
}

function getDialogueTranslation(lesson: any): string {
  if (!lesson) return "";
  const rTrans = sanitizeTranslation(lesson.reading?.translation);
  const lTrans = sanitizeTranslation(lesson.listening?.translation);
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
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [startTime] = useState(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const [savedAnswers, setSavedAnswers] = useState<Record<string, Record<string, string | string[]>>>({});

  const handleUpdateAnswers = useCallback((sectionKey: string, newAnswers: Record<string, string | string[]>) => {
    setSavedAnswers(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        ...newAnswers
      }
    }));
  }, []);

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

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-950 font-sans";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-300 shadow-sm shadow-slate-200/50 text-slate-950";
  const innerBg = dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-slate-50 border-slate-300 text-slate-950";
  const textSec = dark ? "text-gray-300" : "text-slate-900 font-bold";
  const textBody = dark ? "text-gray-100 font-medium" : "text-slate-950 font-semibold leading-relaxed";
  const textMuted = dark ? "text-gray-400" : "text-slate-800 font-bold";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-slate-100";

  const { data: lesson, isError: lessonError, refetch: refetchLesson } = useQuery({
    queryKey: draftId ? ["draft", draftId] : ["lesson", lessonId],
    queryFn: () => {
      const url = draftId ? `/admin/content-pipeline/drafts/${draftId}` : `/lessons/${lessonId}`;
      return apiFetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to load content");
        return res.json();
      }).then((json) => {
        const data = json.data || (json.title || json._id ? json : null);
        if (!data) throw new Error("Lesson content not found");
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
    },
    enabled: !!lessonId || !!draftId,
  });

  const { data: progressData, refetch: refetchProgress } = useQuery({
    queryKey: ["lesson-progress", lessonId || draftId],
    queryFn: async () => {
      if (draftId || !lessonId) return { status: 'in_progress', exercisesCompleted: 0, totalExercises: 0, timeSpent: 0 };
      try {
        const res = await apiFetch(`/progress/${lessonId}`);
        if (!res.ok) return { status: 'in_progress', exercisesCompleted: 0, totalExercises: 0, timeSpent: 0 };
        const json = await res.json();
        const prog = json?.data?.progress || json?.data;
        return prog as ProgressData;
      } catch {
        return { status: 'in_progress', exercisesCompleted: 0, totalExercises: 0, timeSpent: 0 };
      }
    },
    enabled: !!lessonId || !!draftId,
  });
  const progress = progressData;

  const sections = lesson ? buildSections(lesson) : [];

  const isLesson8 = lesson?.lessonNumber === 8 || lesson?.order === 8 || (typeof lesson?.title === 'string' && lesson.title.toLowerCase().includes('review')) || lesson?.skill === 'REV' || lesson?.skill === 'review';

  const computeLesson7Id = (l: any, currentDraftId?: string) => {
    if (currentDraftId) {
      if (currentDraftId.includes('l8')) return currentDraftId.replace('l8', 'l7');
      if (currentDraftId.includes('lesson-8')) return currentDraftId.replace('lesson-8', 'lesson-7');
    }
    if (!l) return '';
    const id = String(l.lessonId || l._id || '').toLowerCase();
    if (id.includes('l8')) return id.replace('l8', 'l7');
    if (id.includes('lesson-8')) return id.replace('lesson-8', 'lesson-7');
    if (id.includes('_8')) return id.replace('_8', '_7');
    if (l.chapterId) return `${String(l.chapterId).toLowerCase()}-l7`;
    return '';
  };

  const lesson7Id = computeLesson7Id(lesson, draftId);

  const { data: lesson7Direct } = useQuery({
    queryKey: draftId ? ["draft", lesson7Id] : ["lesson", lesson7Id],
    queryFn: async () => {
      try {
        const url = draftId ? `/admin/content-pipeline/drafts/${lesson7Id}` : `/lessons/${lesson7Id}`;
        const res = await apiFetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        const data = json?.data || json;
        return (data?.parsedData || data) as LessonData;
      } catch {
        return null;
      }
    },
    enabled: isLesson8 && !!lesson7Id
  });

  const { data: levelLessons } = useQuery({
    queryKey: ["level-lessons-l7", lesson?.level || 'A1'],
    queryFn: async () => {
      try {
        const res = await apiFetch(`/lessons?level=${lesson?.level || 'A1'}&limit=100`);
        if (!res.ok) return [];
        const json = await res.json();
        return (json?.data || []) as LessonData[];
      } catch {
        return [];
      }
    },
    enabled: isLesson8 && !draftId
  });

  const lesson7FromList = levelLessons?.find((l: any) => {
    if (!l) return false;
    const isIntegrated = (l.order && l.order % 8 === 7) || (l.lessonNumber && l.lessonNumber % 8 === 7) || l.skill === 'integrated' || l.anchorSkill === 'integrated' || (typeof l.lessonId === 'string' && l.lessonId.endsWith('l7'));
    if (!isIntegrated) return false;
    if (lesson?.chapterId && l.chapterId === lesson.chapterId) return true;
    if (typeof lesson?.lessonId === 'string' && typeof l.lessonId === 'string' && l.lessonId.split('-')[0] === lesson.lessonId.split('-')[0]) return true;
    return true;
  });

  const realLesson7Id = lesson7FromList?._id || lesson7FromList?.lessonId || lesson7Id;

  const { data: fullLesson7 } = useQuery({
    queryKey: draftId ? ["draft-full7", realLesson7Id] : ["lesson-full7", realLesson7Id],
    queryFn: async () => {
      if (!realLesson7Id) return null;
      try {
        const url = draftId ? `/admin/content-pipeline/drafts/${realLesson7Id}` : `/lessons/${realLesson7Id}`;
        const res = await apiFetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        const data = json?.data || json;
        return (data?.parsedData || data) as LessonData;
      } catch {
        return null;
      }
    },
    enabled: isLesson8 && !!realLesson7Id
  });

  const lesson7 = fullLesson7 || lesson7Direct || lesson7FromList;

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

        const defaultExamples: Record<string, string> = {
          "bonjour": "Bonjour, comment allez-vous aujourd'hui ?",
          "bonsoir": "Bonsoir tout le monde, bienvenue !",
          "salut": "Salut Paul, ça va bien ?",
          "au revoir": "Au revoir et à la prochaine !",
          "à bientôt": "Merci pour tout, à bientôt !",
          "bonne nuit": "Il est tard, bonne nuit !",
          "madame": "Bonjour Madame, puis-je vous aider ?",
          "monsieur": "Pardon Monsieur, quelle heure est-il ?",
          "s'il vous plaît": "Un café, s'il vous plaît.",
          "merci": "Merci beaucoup pour votre aide !",
          "de rien": "Je vous en prie, de rien.",
          "oui": "Oui, je suis d'accord.",
          "non": "Non, ce n'est pas possible.",
          "pardon": "Pardon, je n'ai pas entendu.",
          "excusez-moi": "Excusez-moi, où est la gare ?"
        };

        const addVocab = (fr: string, en: string, pr?: string, ex?: string) => {
          if (isProseOrNote(fr) || isProseOrNote(en) || isProseOrNote(ex || '')) return;

          const cleanFr = fr.replace(/[\(（].*?see chapter vocabulary.*$/i, '').trim();
          const cleanEn = en.replace(/[\(（].*?see chapter vocabulary.*$/i, '').trim();
          if (!cleanFr || cleanFr.toLowerCase() === 'french' || cleanFr.match(/^[-:]+$/) || seenFrench.has(cleanFr.toLowerCase()) || isProseOrNote(cleanFr) || isProseOrNote(cleanEn)) {
            return;
          }

          const lowerFr = cleanFr.toLowerCase();
          const finalExample = ex?.trim() || defaultExamples[lowerFr] || `Exemple: "${cleanFr}" est très utile en français.`;

          seenFrench.add(lowerFr);
          cleanedVocab.push({
            french: cleanFr,
            english: cleanEn,
            pronunciation: pr?.trim(),
            example: finalExample,
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

        if (cleanedVocab.length === 0) {
          // Extract from Scene / Dialogue text
          const sceneTxt = lesson?.scene?.text || lesson?.reading?.text || lesson?.listening?.transcript || '';
          if (sceneTxt) {
            const lines = sceneTxt.split('\n');
            for (const line of lines) {
              if (line.includes('—') || line.includes(':')) {
                const parts = line.split(/—|:/);
                const fr = parts[1]?.trim() || parts[0]?.trim();
                if (fr && fr.length > 3 && fr.length < 60) {
                  addVocab(fr, 'Key Dialogue Expression');
                }
              }
            }
          }

          // Extract from Grammar examples
          const rules = lesson?.grammar?.rules || (Array.isArray(lesson?.grammar) ? lesson?.grammar : []);
          for (const r of rules) {
            const exs = Array.isArray(r.examples) ? r.examples : typeof r.examples === 'string' ? [r.examples] : [];
            for (const exStr of exs) {
              if (typeof exStr === 'string' && exStr.trim()) {
                addVocab(exStr.trim(), r.rule || 'Grammar Example Phrase');
              }
            }
          }
        }

        const vocabNote = lesson?.vocabularyBank?.cumulativeNote || 'Review key expressions and dialogue items for this lesson.';

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
                      <div className="mt-2 pt-2 border-t dark:border-white/10 border-black/5 flex items-start justify-between gap-2">
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 block">Example Usage:</span>
                          <p className={`text-[11px] ${textMuted} italic leading-snug`}>"{v.example}"</p>
                        </div>
                        <button
                          onClick={() => speak(v.example!)}
                          className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer"
                          title="Listen to full example sentence"
                        >
                          <Volume2 className="w-3 h-3" /> Listen
                        </button>
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
        const dialogueQuestions = [...(lesson!.reading?.questions || []), ...(lesson!.listening?.questions || [])].filter((q: any) => Boolean(q?.id && typeof q.id === 'string' && !q.id.includes('dummy')));
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
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <button onClick={() => toggleAudio(dialText)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 cursor-pointer">
                    <Volume2 className="w-4 h-4" /> Listen / Pause Dialogue
                  </button>
                  <button onClick={() => stopAudio()}
                    className="flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    title="Stop Audio Playback">
                    <Square className="w-4 h-4 fill-current" /> Stop
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
        const roleplayText = lesson!.speaking?.roleplay || lesson!.speaking?.prompt || `Practice speaking aloud applying the target expressions and key vocabulary from "${lesson?.title || 'this lesson'}".`;
        const extTask = lesson!.speaking?.extensionTask || '';
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
              lessonTopic={lesson?.title || "Speaking Practice"}
              guidedActivity={roleplayText}
              roleplayPrompt={roleplayText}
              onComplete={() => markSectionComplete(currentSectionIdx)}
            />
          </div>
        );

      case 'review':
        const rawSelfAssRev = lesson?.selfAssessment || (lesson as any)?.canonical?.selfAssessment;
        const selfAssListRev = Array.isArray(rawSelfAssRev) ? rawSelfAssRev.map((s: any) => String(s).trim()).filter((s: string) => s.length >= 5) : [];

        let reflectionItems = (lesson?.canDoReview && lesson.canDoReview.length > 0) ? lesson.canDoReview
          : (selfAssListRev.length > 0) ? selfAssListRev
          : (lesson?.objectives && lesson.objectives.length > 0) ? formatObjectivesList(lesson.objectives)
          : (lesson?.selfReflection && lesson.selfReflection.length > 0) ? lesson.selfReflection
          : (lesson?.miniReview?.content) ? [lesson.miniReview.content]
          : [];

        const isRevLessonCase = isLesson8 || lesson?.lessonNumber === 8 || (typeof lesson?.skill === 'string' && (lesson.skill.toLowerCase() === 'review' || lesson.skill.toLowerCase() === 'rev'));

        return (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Lesson Takeaway Card */}
            {lesson?.miniReview?.content && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-indigo-500/10 border border-purple-500/20 shadow-md flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-800"}`}>
                    Lesson Takeaway & Key Consolidation
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed mt-1 ${dark ? "text-gray-200" : "text-gray-800"}`}>
                    {lesson.miniReview.content}
                  </p>
                </div>
              </div>
            )}

            {/* Self-Assessment Checklist Card */}
            <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 border shadow-lg space-y-4`}>
              <div className="flex items-center gap-3 border-b dark:border-[#1e2a4a] border-gray-200 pb-3">
                <Star className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                    {isRevLessonCase ? "Chapter Review — Mini Review by Can-Do Statement" : "Lesson Self-Assessment & Mastery"}
                  </h3>
                  <p className={`text-xs ${textSec} mt-0.5`}>
                    {isRevLessonCase
                      ? "Each chapter goal mapped to the specific lesson(s) that taught it. Check off what you can do:"
                      : "Check off the core skills and goals you've mastered in this lesson:"}
                  </p>
                </div>
              </div>

              <SelfAssessmentSection
                items={reflectionItems}
                dark={dark}
                title={isRevLessonCase ? "Can-Do Statement Mapping" : "Self-Assessment Checklist"}
                subtitle={isRevLessonCase ? "Map your chapter goals to lessons and track your mastery:" : "Track your skill mastery for this lesson:"}
                isChapterReview={isRevLessonCase}
              />
            </div>
          </div>
        );

      case 'mixedPractice':
        const rawMixedQs = lesson?.mixedPracticeExercises?.questions || lesson?.practiceExercises?.questions || [];
        const mixedQs = rawMixedQs.filter(q => !q.id?.includes('delf') && !q.id?.includes('mpe-dummy'));
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

        const extractTextFromObj = (lObj: any) => {
          if (!lObj) return '';
          if (lObj.scene?.text) return lObj.scene.text;
          if (lObj.reading?.text) return lObj.reading.text;
          if (lObj.listening?.transcript) return lObj.listening.transcript;
          if (Array.isArray(lObj.sections)) {
            const found = lObj.sections.find((s: any) => s.type === 'reading' || s.type === 'listening' || s.type === 'integrated' || s.type === 'scene' || s.type === 'warmup');
            if (found?.body) return found.body.replace(/^#+\s*.*?\n/, '').trim();
          }
          return '';
        };

        const extractTransFromObj = (lObj: any) => {
          if (!lObj) return '';
          if (lObj.scene?.translation) return lObj.scene.translation;
          if (lObj.reading?.translation) return lObj.reading.translation;
          if (lObj.listening?.translation) return lObj.listening.translation;
          if (Array.isArray(lObj.sections)) {
            const found = lObj.sections.find((s: any) => s.translation || (s.body && s.body.toLowerCase().includes('english translation')));
            if (found?.translation) return found.translation;
            if (found?.body && found.body.toLowerCase().includes('english translation')) {
              const parts = found.body.split(/english translation:?/i);
              if (parts[1]) return parts[1].trim();
            }
          }
          return '';
        };

        const lesson7Transcript = extractTextFromObj(lesson7) || extractTextFromObj(lesson) || '';
        const lesson7Translation = extractTransFromObj(lesson7) || extractTransFromObj(lesson) || '';

        return (
          <DELFAssessmentTabbedView
            assessmentData={assessmentData}
            assessmentSections={assessmentSections}
            lesson7Transcript={lesson7Transcript}
            lesson7Translation={lesson7Translation}
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



      case 'canDoReview':
        const chNumber = getCleanChapterNumber(lesson);
        const nextChNum = Number(chNumber) + 1;
        const rawCompContent = lesson?.completionSummary?.content || '';

        let parsedSkillCards: { statement: string; lessonRef?: string }[] = [];

        if (rawCompContent) {
          let cleanCompText = rawCompContent
            .replace(/\bChapter\s*22\b/gi, `Chapter ${nextChNum}`)
            .replace(/\*\*/g, '');

          const skillsSection = cleanCompText.split(/(?:Next Milestone:?|Coming Next:?|Chapter\s*\d+\s*[—\-])/i)[0];
          parsedSkillCards = parseCanDoItems(skillsSection);
        }

        if (parsedSkillCards.length === 0) {
          parsedSkillCards = [
            { statement: "Describe housing types", lessonRef: "Lesson 1" },
            { statement: "Discuss your home in real detail using the complete 'il y a' system and location prepositions", lessonRef: "Lesson 2" },
            { statement: "Name rooms and furniture", lessonRef: "Lesson 3" },
            { statement: "Navigate apartment-hunting conversations", lessonRef: "Lesson 4" },
            { statement: "Compare two homes", lessonRef: "Lesson 5" },
            { statement: "Discuss household chores", lessonRef: "Lesson 6" },
            { statement: "Combine all of the above in a real conversation", lessonRef: "Lesson 7 (Integrated)" },
          ];
        }

        let canDoItems: any[] = [];
        if (Array.isArray(lesson?.canDoReview) && lesson.canDoReview.length > 0) {
          canDoItems = lesson.canDoReview;
        } else if (isLesson8 || lesson?.lessonNumber === 8 || (typeof lesson?.skill === 'string' && (lesson.skill.toLowerCase() === 'review' || lesson.skill.toLowerCase() === 'rev'))) {
          if (parsedSkillCards.length > 0) {
            canDoItems = parsedSkillCards.map(s => s.lessonRef ? `${s.statement} → ${s.lessonRef}` : s.statement);
          } else if (Array.isArray(lesson?.objectives) && lesson.objectives.length > 0) {
            canDoItems = formatObjectivesList(lesson.objectives);
          } else if (lesson?.miniReview?.content) {
            const rawContent = lesson.miniReview.content.trim();
            const splitList = rawContent.split(/(?:\n+|•|\b\d+[\.\)]\s*|(?<=\.)\s+)/).map(s => s.trim()).filter(s => s.length >= 5);
            canDoItems = splitList.length > 0 ? splitList : [rawContent];
          }
        } else {
          // Standard Practice Lessons 1-7: extract selfAssessment first, then formatted objectives
          const rawSelfAssCanDo = lesson?.selfAssessment || (lesson as any)?.canonical?.selfAssessment;
          const selfAss = Array.isArray(rawSelfAssCanDo) ? rawSelfAssCanDo.map((s: any) => String(s).trim()).filter((s: string) => s.length >= 5) : [];
          const formattedObjs = formatObjectivesList(lesson?.objectives);
          if (selfAss.length > 0) {
            canDoItems = selfAss;
          } else if (formattedObjs.length > 0) {
            canDoItems = formattedObjs;
          } else if (parsedSkillCards.length > 0) {
            canDoItems = parsedSkillCards.map(s => s.lessonRef ? `${s.statement} → ${s.lessonRef}` : s.statement);
          } else if (lesson?.miniReview?.content) {
            const rawContent = lesson.miniReview.content.trim();
            const splitList = rawContent.split(/(?:\n+|•|\b\d+[\.\)]\s*|(?<=\.)\s+)/).map(s => s.trim()).filter(s => s.length >= 5);
            canDoItems = splitList.length > 0 ? splitList : [rawContent];
          }
        }

        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6 max-w-4xl mx-auto">
            {/* Lesson Takeaway Card */}
            {lesson?.miniReview?.content && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-indigo-500/10 border border-purple-500/20 shadow-md flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-800"}`}>
                    Lesson Takeaway & Key Consolidation
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed mt-1 ${dark ? "text-gray-200" : "text-gray-800"}`}>
                    {lesson.miniReview.content}
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Can-Do Statement Mapping Checklist */}
            <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5 border shadow-lg space-y-4`}>
              <div className="flex items-center gap-3 border-b dark:border-[#1e2a4a] border-gray-200 pb-3">
                <Star className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                    {isLesson8 ? "Chapter Review — Mini Review by Can-Do Statement" : "Lesson Self-Assessment & Mastery"}
                  </h3>
                  <p className={`text-xs ${textSec} mt-0.5`}>
                    {isLesson8
                      ? "Each chapter goal mapped to the specific lesson(s) that taught it. Check off what you can do:"
                      : "Check off the core skills and goals you've mastered in this lesson:"}
                  </p>
                </div>
              </div>

              <SelfAssessmentSection
                items={canDoItems}
                dark={dark}
                title={isLesson8 ? "Can-Do Statement Mapping" : "Self-Assessment Checklist"}
                subtitle={isLesson8 ? "Map your chapter goals to lessons and track your mastery:" : "Track your skill mastery for this lesson:"}
                isChapterReview={isLesson8}
              />
            </div>
          </motion.div>
        );

      case 'selfReflection':
        return (
          <SelfReflectionCard
            lesson={lesson}
            lessonId={lessonId}
            dark={dark}
            cardBg={cardBg}
            textSec={textSec}
            textMuted={textMuted}
            handleBlockComplete={handleBlockComplete}
          />
        );

      case 'completion':
        const chNumberStr = getCleanChapterNumber(lesson);
        const currentChNum = Number(chNumberStr) || 1;
        const nextChNumVal = currentChNum + 1;
        const rawComp = lesson?.completionSummary?.content || '';

        let dynamicNextChapter = `Chapter ${nextChNumVal} — Next Curriculum Unit — builds on this foundation to expand your skills.`;
        let rawSummaryText = rawComp ? rawComp.replace(/\*\*/g, '').trim() : "You have successfully consolidated all learning objectives, completed the DELF diagnostic assessment, and recorded your reflections.";

        if (rawComp) {
          let cleanComp = rawComp
            .replace(/Chapter\s*\d+\s*Mastered!?/gi, `Chapter ${currentChNum} Mastered!`)
            .replace(/Chapter\s*\d+\s*sa/gi, `Chapter ${nextChNumVal}`);

          const nextMatchComp = cleanComp.match(/(?:Next Milestone:?|Coming Next:?|Chapter\s*\d+\s*[—\-]\s*[^\.]+(?:builds[^\.]*)?[\s\S]*)/i);
          if (nextMatchComp) {
            let extractedNext = nextMatchComp[0]
              .replace(/^(?:Next Milestone:?|Coming Next:?)\s*/i, '')
              .replace(/Chapter\s*\d+/gi, `Chapter ${nextChNumVal}`)
              .trim();
            if (extractedNext.length > 5) {
              dynamicNextChapter = extractedNext;
            }
          }
          rawSummaryText = cleanComp;
        }

        // Parse bullet items if rawSummaryText contains bullet points or dash items
        const rawLines = rawSummaryText.split(/\n+/).flatMap(l => l.split(/(?=\s*[-•]\s+)/)).map(l => l.trim()).filter(Boolean);
        const isBulletList = rawLines.some(l => l.startsWith('-') || l.startsWith('•') || l.includes('→'));

        const cardsCount = (lesson?.canDoReview && lesson.canDoReview.length > 0)
          ? lesson.canDoReview.length
          : 7;

        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center max-w-4xl mx-auto">
            <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30 space-y-5 bg-gradient-to-b from-emerald-500/10 to-transparent shadow-2xl`}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/30 animate-bounce">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                  Chapter Capstone Complete
                </span>
                <h2 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-gray-900"} mt-1`}>
                  Félicitations ! Chapter {chNumberStr} Mastered!
                </h2>

                {isBulletList ? (
                  <div className="mt-4 space-y-2 text-left max-w-2xl mx-auto">
                    {rawLines.map((lineText, idx) => {
                      const cleanLine = lineText.replace(/^[-•]\s*/, '').trim();
                      if (!cleanLine) return null;

                      const parts = cleanLine.split('→');
                      const statement = parts[0]?.trim() || cleanLine;
                      const lessonTag = parts[1]?.trim();

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                            dark
                              ? "bg-black/40 border-emerald-500/20 text-gray-200 hover:border-emerald-500/40"
                              : "bg-emerald-50/50 border-emerald-200 text-gray-800 hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="font-medium leading-relaxed">{statement}</span>
                          </div>
                          {lessonTag && (
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shrink-0">
                              {lessonTag}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={`text-xs ${textSec} mt-3 max-w-2xl mx-auto leading-relaxed text-left p-4 rounded-xl border ${dark ? "bg-black/40 border-emerald-500/20 text-gray-200" : "bg-emerald-50/50 border-emerald-200 text-gray-800"}`}>
                    {rawSummaryText}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 py-2">
                <div className={`p-3.5 rounded-xl border text-center ${dark ? "bg-black/30 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
                  <span className="block text-xs font-bold text-gray-400">XP Reward</span>
                  <span className="text-xl font-extrabold text-amber-400">+100 XP</span>
                </div>
                <div className={`p-3.5 rounded-xl border text-center ${dark ? "bg-black/30 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"}`}>
                  <span className="block text-xs font-bold text-gray-400">DELF Readiness</span>
                  <span className="text-xl font-extrabold text-emerald-400">100% Passed</span>
                </div>
              </div>

              {/* Next Milestone Teaser Card */}
              <div className={`p-5 rounded-2xl border relative overflow-hidden transition-all text-left ${dark ? "bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-pink-950/40 border-purple-500/30" : "bg-gradient-to-r from-purple-50 via-pink-50/50 to-purple-50 border-purple-200"}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                        Up Next
                      </span>
                      <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-900"}`}>
                        Next Chapter Milestone
                      </h4>
                    </div>
                    <p className={`text-xs leading-relaxed font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}>
                      {dynamicNextChapter}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spaced Repetition Flashcards & Offline PDF Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setFlashcardModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 hover:opacity-90 transition-all"
                >
                  <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                  ⚡ Quick-Review Flashcards ({cardsCount} Cards)
                </button>
                <button
                  onClick={() => setCheatSheetOpen(true)}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border font-extrabold text-xs transition-all ${
                    dark
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                      : "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100"
                  }`}
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  📄 View & Print Lesson Cheat Sheet
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={onBack}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-xl shadow-purple-500/30 transition-all inline-flex items-center gap-2"
                >
                  Return to Dashboard & Continue →
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'delf':
        const delfQuestions = lesson!.practiceExercises?.questions?.filter((q: any) => Boolean(q?.id && typeof q.id === 'string' && q.id.includes('delf'))) || [];
        const l7DialText = getDialogueText(lesson7) || lesson?.scene?.text || lesson?.reading?.text || lesson?.listening?.transcript || '';
        const l7DialTrans = getDialogueTranslation(lesson7) || lesson?.scene?.translation || lesson?.reading?.translation || lesson?.listening?.translation || '';
        return (
          <div className="space-y-6">
            {l7DialText && (
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
        let rQuestions = (lesson?.reading?.questions && lesson.reading.questions.length > 0)
          ? lesson.reading.questions
          : (lesson?.comprehensionQuestions || []);

        if (
          (rQuestions.length <= 1 && (rQuestions[0]?.prompt?.toLowerCase().includes('complete the reading') || rQuestions[0]?.id?.includes('dummy') || !rQuestions.length)) &&
          lesson?.content
        ) {
          const cqMatch = lesson.content.match(/Comprehension Questions:?([\s\S]*?)(?=Answer Key:|##|$)/i);
          if (cqMatch && cqMatch[1]) {
            const rawQLines = cqMatch[1]
              .split('\n')
              .map(l => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-•*]\s*/, '').trim())
              .filter(l => l && !l.toLowerCase().startsWith('comprehension questions') && !l.toLowerCase().startsWith('answer key'));
            if (rawQLines.length > 0) {
              const akMatch = lesson.content.match(/Answer Key:?([\s\S]*?)(?=##|$)/i);
              const answers = akMatch ? akMatch[1].split('\n').map(l => l.replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean) : [];
              rQuestions = rawQLines.map((q, idx) => ({
                id: `rq-${idx + 1}`,
                type: 'short_answer',
                prompt: q,
                correctAnswer: answers[idx] || 'Refer to reading passage.',
                explanation: `Expected Answer: ${answers[idx] || 'Refer to reading passage.'}`
              }));
            }
          }
        }

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
          ? (lesson!.practiceExercises?.questions?.filter((q: any) => Boolean(q?.id && typeof q.id === 'string' && !q.id.includes('delf'))) || [])
          : (lesson!.practiceExercises?.questions || []);
        if (!practiceQuestions.length) return emptyState('Practice Exercises');
        return (
          <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4"><Repeat className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{isL8 ? "Mixed Practice Exercises" : "Practice Exercises"}</h3></div>
            <QuizComponent
              key={`quiz-practice-${lesson?._id || 'l1'}-${practiceQuestions.length}`}
              questions={adaptQuestions(practiceQuestions)}
              type="practice"
              onComplete={(score, total) => handleBlockComplete('practice', score, total)}
              onSubmit={(answers) => handleSubmitBlock('practice', answers)}
            />
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
              <EditableText as="h1" fieldPath="title" value={lesson?.title || "French Lesson"} className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`} />
              {(() => {
                const overview = parseOverviewMetadata(lesson.objectives, lesson);
                return (
                  <div className={`flex items-center gap-2 text-xs ${textSec}`}>
                    <span>Lesson {lesson?.order || lesson?.lessonNumber || 1}</span>
                    <span>&middot;</span>
                    <span>{overview.durationMinutes} min</span>
                    {progress?.status === 'completed' && <span className="text-emerald-400 font-semibold">&#9679; Completed</span>}
                  </div>
                );
              })()}
            </div>
          </div>
          {(() => {
            const overview = parseOverviewMetadata(lesson.objectives, lesson);
            const cleanObjectives = overview.cleanObjectives;
            if (!cleanObjectives.length) return null;

            return (
              <div className={`rounded-2xl p-4 border mt-3 transition-all ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-100"}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-bold flex items-center gap-1.5 ${dark ? "text-purple-300" : "text-purple-700"}`}>
                    <span>🎯</span> What you'll learn:
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowObjectives(!showObjectives)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                      dark
                        ? "bg-purple-500/20 border-purple-500/40 text-purple-200 hover:bg-purple-500/30"
                        : "bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200"
                    }`}
                  >
                    {showObjectives ? "Hide Full Overview ▴" : "Show Full Overview ▾"}
                  </button>
                </div>

                <ul className="space-y-1.5 mt-2.5">
                  {cleanObjectives.map((obj: string, i: number) => (
                    <li key={i} className={`text-xs ${textBody} flex items-start gap-2 leading-relaxed`}>
                      <span className="text-purple-500 font-bold mt-0.5">•</span>
                      <EditableText fieldPath={`objectives[${i}]`} value={obj} />
                    </li>
                  ))}
                </ul>

                {showObjectives && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t dark:border-purple-500/20 border-purple-200/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">📌 Anchor Skill:</span>
                      <span className={textBody}>{lesson.skill || lesson.anchorSkill || "Reading & Listening"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">⏱️ Estimated Time:</span>
                      <span className={textBody}>{overview.durationMinutes} minutes</span>
                    </div>
                    {overview.grammarFocus && (
                      <div className="md:col-span-2">
                        <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">📚 Grammar Focus:</span>
                        <span className={textBody}>{overview.grammarFocus}</span>
                      </div>
                    )}
                    {overview.vocabularyFocus && (
                      <div className="md:col-span-2">
                        <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">🗣️ Vocabulary Focus:</span>
                        <span className={textBody}>{overview.vocabularyFocus}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div key={currentSection?.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>

        {/* Complete Lesson */}
        {!lessonCompleted && isLast && currentSection?.key !== 'completion' && (() => {
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

        {/* Dedicated Interactive Lesson Cheat Sheet Modal & Flashcards Modal */}
        <AnimatePresence>
          {cheatSheetOpen && (
            <LessonCheatSheetModal
              lesson={lesson}
              dark={dark}
              onClose={() => setCheatSheetOpen(false)}
              speak={speak}
            />
          )}
          {flashcardModalOpen && (
            <ChapterFlashcardModal
              lesson={lesson}
              dark={dark}
              onClose={() => setFlashcardModalOpen(false)}
              speak={speak}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function parseExplanationContent(text: string, dark: boolean = true) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];

  const flushTable = (key: number) => {
    if (currentTableRows.length === 0) return;
    const headers = currentTableRows[0];
    const dataRows = currentTableRows.slice(2);
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
      if (currentTableRows.length > 0) flushTable(idx);
      if (trimmed) {
        if (trimmed.startsWith('###')) {
          elements.push(<h4 key={idx} className={`text-xs font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{trimmed.replace('###', '').trim()}</h4>);
        } else if (trimmed.startsWith('##')) {
          const hText = trimmed.replace(/^##\s*/, '').replace(/Chapter Review/gi, 'Grammar Summary').trim();
          elements.push(<h3 key={idx} className={`text-sm font-bold mt-4 mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{hText}</h3>);
        } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          elements.push(<div key={idx} className="ml-2">{renderFormattedMarkdown(trimmed, dark)}</div>);
        } else {
          elements.push(<div key={idx} className={`text-xs ${dark ? "text-gray-300" : "text-gray-700"} mb-1.5 leading-relaxed`}>{renderFormattedMarkdown(trimmed, dark)}</div>);
        }
      }
    }
  });
  if (currentTableRows.length > 0) flushTable(lines.length);
  return elements;
}

// ─── Grammar Section ───────────────────────────────────────────────────────

function GrammarSection({ grammar, dark, cardBg, innerBg, textBody, textSec }: {
  grammar: LessonData['grammar']; dark: boolean; cardBg: string; innerBg: string; textBody: string; textSec: string;
}) {
  const isPlaceholderFormation = !grammar.formation || grammar.formation.includes('See grammar summary') || grammar.formation.includes('Recycled from');
  const isPlaceholderUsage = !grammar.usage || grammar.usage.includes('Review all grammar') || grammar.usage.includes('See explanation');
  const isPlaceholderExamples = !grammar.examples?.length || grammar.examples[0]?.includes('Refer to the');

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
  const rTrans = sanitizeTranslation(lesson.reading?.translation || lesson.scene?.translation || getDialogueTranslation(lesson));

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
  const lTranslation = sanitizeTranslation(lesson.listening?.translation || lesson.scene?.translation || getDialogueTranslation(lesson));
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

function parseCanDoItems(input: any): { statement: string; lessonRef?: string }[] {
  if (!input) return [];

  const rawList: string[] = [];
  if (Array.isArray(input)) {
    input.forEach(item => {
      if (typeof item === 'string') {
        rawList.push(item);
      } else if (item && typeof item === 'object') {
        const stmt = item.statement || item.text || item.content || item.prompt || item.title || '';
        const ref = item.lessonRef || item.lesson || item.ref || '';
        rawList.push(ref ? `${stmt} → ${ref}` : String(stmt));
      }
    });
  } else if (typeof input === 'string') {
    rawList.push(input);
  } else if (input && typeof input === 'object') {
    if (input.content) rawList.push(String(input.content));
    else if (input.text) rawList.push(String(input.text));
  }

  const results: { statement: string; lessonRef?: string }[] = [];

  for (const rawText of rawList) {
    let cleanText = rawText.replace(/[\*\#\_]/g, '').trim();

    // Split text containing concatenated goals like "1. I can... → Lesson 1 - 2. I can... → Lesson 2"
    const chunks = cleanText.split(/(?=(?:\b\d+[\.\)]\s*I can|\bI can\b))/gi);

    for (const chunk of chunks) {
      let trimmed = chunk.trim();
      if (!trimmed) continue;

      if (/^(Chapter Review|Mini Review|Each chapter goal|What you'll learn)/i.test(trimmed)) continue;

      let lessonRef = '';
      const refMatch = trimmed.match(/(?:→|--?|—|–|\bmapped to\b|\bLesson\b)\s*(Lesson\s*\d+(?:\s*\([^)]+\))?|\bLesson\s*\w+)/i);
      if (refMatch) {
        lessonRef = refMatch[1].trim();
        trimmed = trimmed.replace(refMatch[0], '').trim();
      }

      let stmt = trimmed
        .replace(/^(?:\d+[\.\)]\s*|[\-\–\—\•\→\s]+)+/, '')
        .replace(/[\-\–\—\•\→\s]+$/, '')
        .trim();

      if (stmt && stmt.length >= 3 && !/^(Chapter Review|Mini Review|Each chapter goal)/i.test(stmt)) {
        results.push({
          statement: stmt,
          lessonRef: lessonRef || undefined,
        });
      }
    }
  }

  return results;
}

function SelfReflectionCard({ lesson, lessonId, dark, cardBg, textSec, textMuted, handleBlockComplete }: any) {
  const rawSelfRef = lesson?.selfReflection || lesson?.reflection;
  const reflectionPrompts: string[] = Array.isArray(rawSelfRef?.prompts) && rawSelfRef.prompts.length > 0
    ? rawSelfRef.prompts
    : Array.isArray(rawSelfRef?.questions) && rawSelfRef.questions.length > 0
    ? rawSelfRef.questions
    : [
        "Which part of this chapter felt easiest to you, and why?",
        "Which part — greetings, vocabulary, grammar rules, or formal vs. informal (tu / vous) — do you want to review again before moving to the next chapter?",
        "Can you think of a real situation coming up in your own life where you could actually use what you learned in this chapter?"
      ];

  const refIntroText = rawSelfRef?.instructions || rawSelfRef?.content || "Take a moment to consider, in your own words:";
  const storageKey = `francprep_reflection_${lessonId || lesson?.lessonId || 'l8'}`;

  const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({});
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load saved notes on mount or when storageKey changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setSavedAnswers(parsed);
          setDraftAnswers(parsed);
          return;
        }
      }
    } catch {}
    setSavedAnswers({});
    setDraftAnswers({});
  }, [storageKey]);

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(draftAnswers) !== JSON.stringify(savedAnswers);
  }, [draftAnswers, savedAnswers]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(storageKey, JSON.stringify(draftAnswers));
      setSavedAnswers(draftAnswers);

      const targetId = lessonId || lesson?.lessonId;
      if (targetId) {
        apiFetch(`/progress/${targetId}/update`, {
          method: 'POST',
          body: JSON.stringify({ reflectionAnswers: draftAnswers }),
        }).catch(() => {});
      }

      if (typeof handleBlockComplete === 'function') {
        handleBlockComplete('selfReflection', 1, 1);
      }
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('idle');
    }
  };

  const handleDiscard = () => {
    setDraftAnswers(savedAnswers);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-6 border space-y-5 shadow-xl`}>
        <div className="flex items-center justify-between border-b dark:border-[#1e2a4a] border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className={`text-base font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
                Self-Reflection & Personal Notes
              </h3>
              <p className={`text-xs ${textSec} mt-0.5`}>
                {refIntroText}
              </p>
            </div>
          </div>

          {saveStatus === 'saved' && (
            <span className="text-xs font-extrabold text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Reflection Notes Saved!
            </span>
          )}
          {hasUnsavedChanges && saveStatus !== 'saved' && (
            <span className="text-xs font-extrabold text-amber-400 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
              ● Unsaved Modifications
            </span>
          )}
        </div>

        <div className="space-y-4">
          {reflectionPrompts.map((promptText: string, idx: number) => {
            const answerKey = `ref_q_${idx}`;
            const currentValue = draftAnswers[answerKey] || '';

            return (
              <div key={idx} className={`p-4 rounded-xl border space-y-2 transition-all ${dark ? "bg-[#0c1224] border-purple-500/20" : "bg-purple-50/50 border-purple-100"}`}>
                <p className={`text-xs font-bold flex items-start gap-2 ${dark ? "text-purple-300" : "text-purple-900"}`}>
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[11px] shrink-0 font-extrabold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{promptText}</span>
                </p>

                <textarea
                  rows={3}
                  value={currentValue}
                  onChange={(e) => setDraftAnswers(prev => ({ ...prev, [answerKey]: e.target.value }))}
                  placeholder="Write your reflections here in your own words..."
                  className={`w-full p-3 rounded-xl text-xs border transition-all resize-y focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                    dark
                      ? "bg-black/40 border-purple-500/30 text-white placeholder-gray-500"
                      : "bg-white border-purple-200 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className={`text-[11px] ${textMuted} italic`}>
            {Object.keys(savedAnswers).length > 0 ? "✨ Your last saved reflection notes will be preserved whenever you return to this lesson." : "✨ Write your notes and click Save Reflection Notes to persist them permanently."}
          </p>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-gray-200 transition-all"
              >
                Discard Unsaved Edits
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              {saveStatus === 'saving' ? "Saving Notes..." : saveStatus === 'saved' ? "Saved ✓" : "Save Reflection Notes"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SelfAssessmentSection({
  items,
  dark,
  title,
  subtitle,
  isChapterReview = false
}: {
  items: any[];
  dark: boolean;
  title: string;
  subtitle?: string;
  isChapterReview?: boolean;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const parsedItems = useMemo(() => parseCanDoItems(items), [items]);
  const allChecked = parsedItems.length > 0 && parsedItems.every((_, i) => checked[i]);
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";

  const subText = subtitle || (isChapterReview
    ? "Map your chapter goals to lessons and track your mastery:"
    : "Track your skill mastery for this lesson:");

  const badgeText = isChapterReview
    ? `${Object.keys(checked).filter(k => checked[Number(k)]).length} / ${parsedItems.length} Can-Do Goals Checked`
    : `${Object.keys(checked).filter(k => checked[Number(k)]).length} / ${parsedItems.length} Goals Mastered`;

  const successText = isChapterReview
    ? "🎉 Outstanding! You have mastered all Can-Do statements for this chapter!"
    : "🎉 Outstanding! You have mastered all self-assessment goals for this lesson!";

  return (
    <div className={`${cardBg} backdrop-blur-lg border rounded-2xl p-5 transition-colors mt-4 shadow-xl`}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{title}</h3>
            <p className="text-[11px] text-gray-400">{subText}</p>
          </div>
        </div>
        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono shadow-sm">
          {badgeText}
        </span>
      </div>
      <div className="space-y-3">
        {parsedItems.map((item, i) => (
          <motion.label
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center justify-between gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              checked[i]
                ? (dark ? "bg-emerald-500/10 border-emerald-500/40 text-white shadow-md shadow-emerald-500/5" : "bg-emerald-50 border-emerald-300 text-emerald-950")
                : (dark ? "bg-[#0c1224] border-[#1e2a4a] text-gray-200 hover:border-purple-500/40 hover:bg-[#10182c]" : "bg-gray-50 border-gray-200 text-gray-800 hover:border-gray-300")
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={checked[i] || false}
                onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
                className="w-4 h-4 accent-purple-500 rounded cursor-pointer flex-shrink-0"
              />
              <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${checked[i] ? "bg-emerald-500 text-white" : (dark ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-100 text-purple-700")}`}>
                {i + 1}
              </span>
              <div className={`text-xs font-semibold leading-relaxed transition-all ${checked[i] ? "line-through opacity-70 text-emerald-400" : ""}`}>
                {item.statement}
              </div>
            </div>

            {item.lessonRef && (
              <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg shrink-0 border transition-all flex items-center gap-1 shadow-sm ${
                checked[i]
                  ? (dark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-emerald-100 text-emerald-800 border-emerald-200")
                  : (dark ? "bg-purple-500/15 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-800 border-purple-200")
              }`}>
                → {item.lessonRef}
              </span>
            )}
          </motion.label>
        ))}
      </div>
      {allChecked && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 text-center p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-purple-500/15 border border-emerald-500/30 shadow-lg">
          <p className="text-xs font-extrabold text-emerald-400 flex items-center justify-center gap-2">
            {successText}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── DELF Assessment Tabbed View ──────────────────────────────────────────

function DELFAssessmentTabbedView({ assessmentData, assessmentSections, lesson7Transcript, lesson7Translation, dark, cardBg, textBody, textSec, handleBlockComplete, handleSubmitBlock, speak, lesson }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showReadingTranslation, setShowReadingTranslation] = useState(false);

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
    sec.instructions = sec.instructions || "Listen to the audio scene and answer the comprehension questions below:";
    sec.points = sec.points || 3;
    
    // Ensure sourceText is never empty for any listening exercise across all lessons
    const fullText = `${sec.instructions || ''} ${sec.title || ''} ${sec.questions?.[0]?.prompt || ''}`.toLowerCase();
    const cleanSource = (sec.sourceText || '').trim().toLowerCase();
    if (!cleanSource || cleanSource.includes('complete the integrated practice') || cleanSource.includes('refer to lesson')) {
      if (fullText.includes('café') || fullText.includes('vous') || fullText.includes('lesson 7')) {
        sec.sourceText = "(Le matin, dans un café. Une femme entre.)\n\nLa femme : Bonjour, Monsieur !\nLe serveur : Bonjour, Madame ! Comment allez-vous ?\nLa femme : Ça va bien, merci, et vous ?\nLe serveur : Ça va, je suis un peu fatigué, mais content ! Vous êtes nouvelle ici ?\nLa femme : Oui, je m'appelle Aline. Enchantée !\nLe serveur : Enchanté, Aline. Je m'appelle Julien.\n(Une autre femme arrive et reconnaît Aline.)\nLéa : Aline ?! Salut ! Comment ça va ?\nAline : Léa ! Salut ! Ça va bien, merci !\nLéa : On se tutoie depuis toujours, c'est bizarre de te voir ici !\nAline : Oui ! Excusez-moi, Julien, un café s'il vous plaît.\nJulien : Je vous en prie, tout de suite !";
        sec.translation = "(Morning, in a café. A woman enters.)\n\nThe woman: Good morning, sir!\nThe waiter: Good morning, Madam! How are you?\nThe woman: I'm doing well, thank you, and you?\nThe waiter: I'm okay, a little tired, but happy! Are you new here?\nThe woman: Yes, my name is Aline. Nice to meet you!\nThe waiter: Nice to meet you, Aline. My name is Julien.\n(Another woman arrives and recognizes Aline.)\nLéa: Aline?! Hi! How's it going?\nAline: Léa! Hi! I'm doing well, thanks!\nLéa: We've used \"tu\" with each other forever, it's strange to see you here!\nAline: Yes! Excuse me, Julien, a coffee please.\nJulien: You're welcome, right away!";
      } else {
        const qPrompts = (sec.questions || []).map((q: any) => q.prompt || q.question || '').filter(Boolean).join('. ');
        const fallbackTxt = (lesson?.listening?.transcript || lesson?.listening?.audioScript || lesson?.scene?.text || qPrompts || `Bonjour et bienvenue dans l'exercice de compréhension orale de ${lesson?.title || 'cette leçon'}. Écoutez attentivement les questions et choisissez la bonne réponse.`).trim();
        sec.sourceText = fallbackTxt;
      }
    }

    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length === 0) {
      sec.questions = [
        {
          id: `${lesson?.lessonId || 'l8'}-sec1-q1`,
          type: 'short_answer',
          prompt: `Summarize the main conversation and key expressions in "${lesson?.title || 'this lesson'}".`,
          correctAnswer: "Review the listening dialogue text.",
          explanation: "Listen carefully to the audio dialogue.",
        }
      ];
    }
  }

  // Normalize Section 2 (Reading Comprehension)
  if (isReadingSec || activeTab === 1) {
    sec.points = sec.points || 4;
    
    // Extract passage and translation if embedded inside instructions or question prompt text
    const fullText = `${sec.instructions || ''} ${sec.title || ''} ${sec.questions?.[0]?.prompt || ''}`;
    if (fullText.includes("short passage") || fullText.includes("English Translation:")) {
      const passageMatch = fullText.match(/(?:Read a (?:new )?short passage|Passage):\s*\n*([\s\S]+?)(?=\n*\*\*English Translation:|\n*Answer:|\n*\([a-c]\)|\*\(\d+ points?\)\*|$)/i);
      if (passageMatch && passageMatch[1]) {
        sec.sourceText = passageMatch[1].replace(/^[*_\s]+|[*_\s]+$/g, '').trim();
      }

      const transMatch = fullText.match(/\*\*English Translation:\*\*\s*(?:\([^)]+\)\s*)?\n*([\s\S]+?)(?=\n*Answer:|\n*\([a-c]\)|\n*\*\(\d+ points?\)\*|$)/i);
      if (transMatch && transMatch[1]) {
        sec.translation = transMatch[1].replace(/^[*_\s]+|[*_\s]+$/g, '').trim();
      }
    }

    sec.instructions = "Read the short passage below and answer the comprehension questions:";
    sec.sourceText = sec.sourceText || sec.passage || sec.text || lesson?.reading?.text || lesson?.scene?.text || '';
    sec.translation = sec.translation || lesson?.reading?.translation || lesson?.scene?.translation || '';

    let questionsList: any[] = Array.isArray(sec.questions) ? [...sec.questions] : [];
    if (questionsList.length === 1 && typeof questionsList[0]?.prompt === 'string' && (questionsList[0].prompt.includes('(a)') || questionsList[0].prompt.includes('(1)'))) {
      const p = questionsList[0].prompt;
      const subQs = [...p.matchAll(/\(([a-z1-9])\)\s*([\s\S]+?)(?=\s*\([a-z1-9]\)|\s*\*\(\d+\s*points?\)\*|$)/gi)];
      if (subQs.length >= 2) {
        questionsList = subQs.map((m, idx) => ({
          id: `${lesson?.lessonId || 'l8'}-sec2-q${idx + 1}`,
          type: 'short_answer' as const,
          prompt: `(${m[1]}) ${m[2].replace(/\*\(\d+\s*points?\)\*/gi, '').trim()}`,
          correctAnswer: 'Short answer response',
          explanation: 'Refer to the reading passage above.',
        }));
      }
    }

    if (questionsList.length === 0) {
      questionsList = [
        {
          id: `${lesson?.lessonId || 'l8'}-sec2-q1`,
          type: 'short_answer',
          prompt: `What is the main topic of the reading passage in "${lesson?.title || 'this lesson'}"?`,
          correctAnswer: 'Main passage topic',
          explanation: 'Review the text above for details.',
        }
      ];
    }

    sec.questions = questionsList.map((q: any) => ({
      ...q,
      type: 'short_answer',
      items: undefined,
    }));
  }

  // Normalize Section 3 (Written Production)
  if (displaySkill === 'Writing' || activeTab === 2) {
    sec.points = sec.points || 4;
    sec.instructions = sec.instructions || "Written Production:";
    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length === 0) {
      sec.questions = [
        {
          id: `${lesson?.lessonId || 'l8'}-sec3-q1`,
          type: 'short_answer',
          prompt: lesson?.writing?.task || `Write a short 4–6 line paragraph applying the key vocabulary and grammar rules from "${lesson?.title || 'this chapter'}".`,
          correctAnswer: 'Original written paragraph applying chapter topics.',
          explanation: 'Check for grammar, vocabulary accuracy, and required line count.',
        }
      ];
    }
  }

  // Normalize Section 4 (Oral Production)
  if (isSpeakingSec || activeTab === 3) {
    sec.points = sec.points || 2;
    sec.instructions = sec.instructions || "Oral Production (Evaluated by FrancPrep's AI speaking coach):";
    const rawQs = Array.isArray(sec.questions) ? sec.questions : [];
    if (rawQs.length === 0) {
      sec.questions = [
        {
          id: `${lesson?.lessonId || 'l8'}-sec4-q1`,
          type: 'short_answer',
          prompt: lesson?.speaking?.prompt || `Speak aloud expressing your ideas on "${lesson?.title || 'this chapter'}" — speaking to FrancPrep's AI conversation partner.`,
          correctAnswer: 'Oral response applying target expressions.',
          explanation: 'Speak clearly into the microphone.',
        }
      ];
    }
  }

  const titleStr = typeof sec?.title === 'string' ? sec.title : (sec?.title ? String(sec.title) : `Section ${activeTab + 1}`);
  const rawInstStr = typeof sec?.instructions === 'string' ? sec.instructions : '';
  const instStr = rawInstStr
    .replace(/^\*\*Section\s*\d+\s*[-—][^\*]+\*\*\s*/gi, '')
    .replace(/^Section\s*\d+\s*[-—][^\:]+:\s*/gi, '')
    .replace(/\*\(\d+\s*points?\)\*/gi, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/[*_#]/g, '')
    .trim();

  const secQuestions = (Array.isArray(sec?.questions) ? sec.questions : []).map((q: any) => ({
    ...q,
    prompt: (q.prompt || '')
      .replace(/^\*\*Section\s*\d+\s*[-—][^\*]+\*\*\s*/gi, '')
      .replace(/^Section\s*\d+\s*[-—][^\:]+:\s*/gi, '')
      .replace(/Read a (?:new )?short passage:[\s\S]+?(?=\*\*English|Answer:|\(a\)|$)/gi, '')
      .replace(/\*\*English Translation:\*\*[\s\S]+?(?=Answer:|\(a\)|$)/gi, '')
      .replace(/Answer:\s*/gi, '')
      .replace(/\*\(\d+\s*points?\)\*/gi, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/[*_#]/g, '')
      .trim(),
  }));

  const isDuplicateInst = Boolean(instStr && secQuestions.length === 1 && (
    secQuestions[0]?.prompt?.toLowerCase().startsWith(instStr.toLowerCase().slice(0, 20)) ||
    instStr.toLowerCase().startsWith(secQuestions[0]?.prompt?.toLowerCase().slice(0, 20))
  ));

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

        {!isSpeakingSec && instStr && !isDuplicateInst && <p className={`text-xs ${textBody} mb-4 leading-relaxed`}>{instStr}</p>}

        {/* Section 1 Listening Reference */}
        {isListeningSec && (
          <div className={`p-4 rounded-xl border mb-4 space-y-3 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
            {(() => {
              const cleanTxt = (txt: any) => {
                if (!txt || typeof txt !== 'string') return '';
                let trimmed = txt.trim();
                if (trimmed.toLowerCase().includes('complete the integrated practice') || trimmed.toLowerCase().includes('complete the practice exercises')) {
                  return '';
                }
                trimmed = trimmed
                  .replace(/\*?\s*\(\s*A1[–-]A2\s+support[^\)]*\)\*?/gi, '')
                  .replace(/\*?\s*\(\s*hide behind a toggle[^\)]*\)\*?/gi, '')
                  .replace(/^\s*\*+|\*+\s*$/g, '')
                  .trim();
                return trimmed;
              };

              const activeTranscript = cleanTxt(sec.sourceText) || cleanTxt(sec.transcript) || cleanTxt(sec.text) || cleanTxt(lesson7Transcript) || cleanTxt(lesson?.listening?.transcript) || cleanTxt(lesson?.reading?.text) || cleanTxt(lesson?.scene?.text) || '';
              const activeTranslation = cleanTxt(sec.translation) || cleanTxt(lesson7Translation) || cleanTxt(lesson?.listening?.translation) || cleanTxt(lesson?.reading?.translation) || cleanTxt(lesson?.scene?.translation) || '';

              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-purple-400" />
                      <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-700"}`}>
                        Reference: {lesson?.title || 'Chapter'} Audio Dialogue
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeTranscript && (
                        <button
                          type="button"
                          onClick={() => speak(activeTranscript)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen to Audio
                        </button>
                      )}
                      {activeTranscript && (
                        <button
                          type="button"
                          onClick={() => setShowTranscript(!showTranscript)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            dark ? "bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30" : "bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200"
                          }`}
                        >
                          {showTranscript ? "Hide Transcript ▴" : "Show Transcript ▾"}
                        </button>
                      )}
                      {activeTranslation && (
                        <button
                          type="button"
                          onClick={() => setShowTranslation(!showTranslation)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            dark ? "bg-pink-500/20 border-pink-500/30 text-pink-300 hover:bg-pink-500/30" : "bg-pink-100 border-pink-200 text-pink-800 hover:bg-pink-200"
                          }`}
                        >
                          {showTranslation ? "Hide English ▴" : "Show English ▾"}
                        </button>
                      )}
                    </div>
                  </div>
                  {showTranscript && activeTranscript && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <p className={`text-xs ${textBody} leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto p-3 rounded-lg ${dark ? "bg-black/40 border border-purple-500/20 text-gray-200" : "bg-white border border-purple-200 text-gray-800"}`}>
                        {activeTranscript}
                      </p>
                    </motion.div>
                  )}
                  {showTranslation && activeTranslation && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <p className={`text-xs ${textSec} italic leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto p-3 rounded-lg ${dark ? "bg-purple-950/40 border border-purple-500/20 text-purple-200" : "bg-purple-50 border border-purple-200 text-purple-900"}`}>
                        {activeTranslation}
                      </p>
                    </motion.div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Section 2 Reading Source Passage */}
        {isReadingSec && (
          <div className={`p-4 rounded-xl border mb-4 text-xs leading-relaxed whitespace-pre-line ${dark ? "bg-purple-500/5 border-purple-500/20 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"}`}>
            {(() => {
              const cleanTxt = (txt: any) => {
                if (!txt || typeof txt !== 'string') return '';
                let trimmed = txt.trim();
                if (trimmed.toLowerCase().includes('complete the integrated practice') || trimmed.toLowerCase().includes('complete the practice exercises')) {
                  return '';
                }
                trimmed = trimmed
                  .replace(/\*?\s*\(\s*A1[–-]A2\s+support[^\)]*\)\*?/gi, '')
                  .replace(/\*?\s*\(\s*hide behind a toggle[^\)]*\)\*?/gi, '')
                  .replace(/^\s*\*+|\*+\s*$/g, '')
                  .trim();
                return trimmed;
              };

              const activeReadingText = cleanTxt(sec.sourceText) || cleanTxt(sec.passage) || cleanTxt(sec.text) || cleanTxt(lesson7Transcript) || cleanTxt(lesson?.reading?.text) || cleanTxt(lesson?.scene?.text) || '';
              const activeReadingTrans = sanitizeTranslation(cleanTxt(sec.translation) || cleanTxt(lesson7Translation) || cleanTxt(lesson?.reading?.translation) || cleanTxt(lesson?.scene?.translation) || '');

              return (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                      <span>📖</span> Reading Passage:
                    </p>
                    {activeReadingTrans && (
                      <button
                        type="button"
                        onClick={() => setShowReadingTranslation(!showReadingTranslation)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                          dark ? "bg-pink-500/20 border-pink-500/30 text-pink-300 hover:bg-pink-500/30" : "bg-pink-100 border-pink-200 text-pink-800 hover:bg-pink-200"
                        }`}
                      >
                        {showReadingTranslation ? "Hide English ▴" : "Show English ▾"}
                      </button>
                    )}
                  </div>
                  {activeReadingText ? (
                    <p className="italic">{String(activeReadingText)}</p>
                  ) : (
                    <p className="italic text-gray-400">Loading chapter reading passage...</p>
                  )}
                  {showReadingTranslation && activeReadingTrans && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3">
                      <div className={`p-3 rounded-lg border text-xs leading-relaxed whitespace-pre-line ${dark ? "bg-purple-950/40 border-purple-500/30 text-purple-200" : "bg-purple-100/60 border-purple-200 text-purple-900"}`}>
                        <p className="font-bold text-[11px] mb-1 text-purple-400">English Translation:</p>
                        {String(activeReadingTrans)}
                      </div>
                    </motion.div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Questions for non-speaking sections */}
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
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-4 h-4 text-purple-400" />
                <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-700"}`}>
                  Speaking Task Instructions
                </span>
              </div>
              <p className={`text-xs font-medium leading-relaxed ${dark ? "text-gray-200" : "text-gray-800"}`}>
                {secQuestions[0]?.prompt || instStr || "Describe your actual home in detail — type, rooms, furniture, and location within the home — for 1–2 minutes."}
              </p>
            </div>
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

// ─── Lesson Cheat Sheet Modal Component ─────────────────────────────────────

function LessonCheatSheetModal({ lesson, dark, onClose, speak }: { lesson: any; dark: boolean; onClose: () => void; speak: (txt: string) => void }) {
  const [chapterVocab, setChapterVocab] = useState<any[]>([]);
  const [chapterGrammar, setChapterGrammar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadChapterData() {
      let chNum = 0;
      if (typeof lesson?.chapter === 'number' && lesson.chapter > 0) {
        chNum = lesson.chapter;
      } else if (typeof lesson?.chapterId === 'number' && lesson.chapterId > 0) {
        chNum = lesson.chapterId;
      }

      if (!chNum && typeof lesson?.lessonId === 'string') {
        const match = lesson.lessonId.match(/ch(\d+)/i) || lesson.lessonId.match(/c(\d+)-l/i) || lesson.lessonId.match(/chapter[-_\s]*(\d+)/i);
        if (match) chNum = Number(match[1]);
      }

      if (!chNum && typeof lesson?.chapterId === 'string') {
        const match = lesson.chapterId.match(/ch(\d+)/i) || lesson.chapterId.match(/chapter[-_\s]*(\d+)/i);
        if (match) chNum = Number(match[1]);
      }

      if (!chNum) chNum = 1;

      try {
        const res = await apiFetch("/lessons?limit=200");
        const json = await res.json();
        const allLessons = json.data || json.lessons || (Array.isArray(json) ? json : []);
        const chLessons = allLessons.filter((l: any) => {
          let lCh = 0;
          if (typeof l.chapter === 'number' && l.chapter > 0) {
            lCh = l.chapter;
          } else if (typeof l.chapterId === 'number' && l.chapterId > 0) {
            lCh = l.chapterId;
          }

          if (!lCh && typeof l.lessonId === 'string') {
            const match = l.lessonId.match(/ch(\d+)/i) || l.lessonId.match(/c(\d+)-l/i) || l.lessonId.match(/chapter[-_\s]*(\d+)/i);
            if (match) lCh = Number(match[1]);
          }

          if (!lCh && typeof l.chapterId === 'string') {
            const match = l.chapterId.match(/ch(\d+)/i) || l.chapterId.match(/chapter[-_\s]*(\d+)/i);
            if (match) lCh = Number(match[1]);
          }

          if (!lCh) lCh = 1;
          return lCh === chNum;
        });

        const vList: any[] = [];
        const gList: any[] = [];

        for (const l of chLessons) {
          const v = Array.isArray(l.vocabItems) && l.vocabItems.length > 0 ? l.vocabItems
            : Array.isArray(l.vocabulary) && l.vocabulary.length > 0 ? l.vocabulary : [];
          vList.push(...v);

          if (Array.isArray(l.grammar?.rules)) {
            const validRules = l.grammar.rules.filter((r: any) => Boolean((r.rule && r.rule !== 'Rule' && !r.rule.startsWith('Rule ')) || r.title || r.formula || (r.explanation && r.explanation.length > 5)));
            gList.push(...validRules);
          } else if (l.grammar && typeof l.grammar === 'object') {
            const g = l.grammar;
            if (g.rule || g.title || g.formula || (g.explanation && g.explanation.length > 5)) {
              gList.push(g);
            }
          }
        }

        if (isMounted) {
          const cleanGrammar = gList.filter((r: any) => Boolean((r.rule && r.rule !== 'Rule' && !r.rule.startsWith('Rule ')) || r.title || r.formula || (r.explanation && r.explanation.length > 5)));
          setChapterVocab(vList.length > 0 ? vList : (lesson?.vocabItems || lesson?.vocabulary || []));
          setChapterGrammar(cleanGrammar);
        }
      } catch (err) {
        if (isMounted) {
          setChapterVocab(lesson?.vocabItems || lesson?.vocabulary || []);
          setChapterGrammar(lesson?.grammar?.rules || []);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadChapterData();
    return () => { isMounted = false; };
  }, [lesson]);

  const sceneText = lesson?.scene?.text || lesson?.reading?.text || lesson?.listening?.transcript || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [copiedVocab, setCopiedVocab] = useState(false);

  const filteredVocab = useMemo(() => {
    if (!searchTerm.trim()) return chapterVocab;
    const q = searchTerm.toLowerCase();
    return chapterVocab.filter((v: any) => {
      let fr = typeof v === 'string' ? v : v.french || v.term || v.word || '';
      let en = typeof v === 'string' ? '' : v.english || v.translation || v.meaning || '';
      return fr.toLowerCase().includes(q) || en.toLowerCase().includes(q);
    });
  }, [chapterVocab, searchTerm]);

  const handleCopyVocab = () => {
    const textList = chapterVocab.map((v: any) => {
      let fr = typeof v === 'string' ? v : v.french || v.term || v.word || '';
      let en = typeof v === 'string' ? '' : v.english || v.translation || v.meaning || '';
      return en ? `${fr} — ${en}` : fr;
    }).join('\n');

    navigator.clipboard.writeText(textList).then(() => {
      setCopiedVocab(true);
      setTimeout(() => setCopiedVocab(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:z-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className={`print-cheat-sheet-modal w-full max-w-5xl max-h-[92vh] flex flex-col p-6 sm:p-8 rounded-3xl border ${
          dark ? "bg-[#0a0f1d] border-purple-500/30 text-white shadow-2xl shadow-purple-950/50" : "bg-white border-purple-200 text-slate-900 shadow-2xl"
        } print:shadow-none print:border-none print:w-full print:max-w-none print:max-h-none print:bg-white print:text-black`}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-5 shrink-0 print:pb-2">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 print:hidden">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400 print:text-black">
                  French {lesson?.level || 'A1'} • Official Chapter Cheat Sheet
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 print:hidden">
                  High-Print Quality
                </span>
              </div>
              <h2 className="text-2xl font-black text-white print:text-black mt-0.5 tracking-tight">
                {lesson?.title || 'Chapter Study Summary'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-black rounded-2xl shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>🖨️ Print / Save PDF</span>
            </button>

            {chapterVocab.length > 0 && (
              <button
                onClick={handleCopyVocab}
                className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                  copiedVocab
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : dark
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                    : "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100"
                }`}
              >
                {copiedVocab ? "✓ Vocab Copied!" : "📋 Copy Vocab"}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-7 print:overflow-visible print:h-auto">
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full mx-auto"
              />
              <p className="text-xs font-bold text-gray-400">Compiling complete chapter study cheat sheet...</p>
            </div>
          ) : (
            <>
              {/* Search Bar for Screen View */}
              {chapterVocab.length > 6 && (
                <div className="print:hidden flex items-center gap-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="⚡ Search terms or expressions in cheat sheet..."
                    className={`flex-1 p-3.5 rounded-2xl border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                      dark
                        ? "bg-[#0c1224] border-purple-500/30 text-white placeholder-gray-500"
                        : "bg-purple-50/50 border-purple-200 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                </div>
              )}

              {/* Section 1: Key Vocabulary Grid */}
              {chapterVocab.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-500/15 pb-2">
                    <h3 className="text-base font-extrabold flex items-center gap-2.5 text-purple-300 print:text-black">
                      <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400 print:hidden">🗣️</span>
                      Essential Vocabulary & Expressions ({chapterVocab.length} Terms)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredVocab.map((v: any, idx: number) => {
                      let fr = typeof v === 'string' ? v : v.french || v.term || v.word || '';
                      let en = typeof v === 'string' ? '' : v.english || v.translation || v.meaning || '';
                      if (!en && (fr.includes('→') || fr.includes('->'))) {
                        const parts = fr.split(/→|->/);
                        fr = parts[0]?.replace(/^[-•]\s*/, '').trim();
                        en = parts[1]?.trim() || '';
                      }
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 transition-all ${
                            dark
                              ? "bg-[#101828]/90 border-purple-500/25 text-gray-100 hover:border-purple-500/50"
                              : "bg-white border-purple-100 text-gray-800 hover:border-purple-300 shadow-sm"
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="font-extrabold text-sm block text-purple-300 print:text-black leading-snug truncate">
                              {fr}
                            </span>
                            {en && (
                              <span className="block text-xs font-medium text-gray-400 print:text-gray-600 leading-snug">
                                {en}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => speak(fr)}
                            className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/30 text-purple-300 print:hidden transition-colors shrink-0"
                            title="Listen Pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section 2: Grammar Rules & Formulas */}
              {chapterGrammar.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-pink-500/15 pb-2">
                    <h3 className="text-base font-extrabold flex items-center gap-2.5 text-pink-300 print:text-black">
                      <span className="p-1.5 rounded-xl bg-pink-500/20 text-pink-400 print:hidden">📐</span>
                      Grammar Rules & Structural Formulas ({chapterGrammar.length} Rules)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapterGrammar.map((r: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-2.5 transition-all ${
                          dark
                            ? "bg-[#101828]/90 border-pink-500/25 text-gray-100 hover:border-pink-500/40"
                            : "bg-pink-50/40 border-pink-200 text-gray-800 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-extrabold text-sm text-pink-300 print:text-black flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-xs shrink-0 font-mono">
                              {idx + 1}
                            </span>
                            {r.rule || r.title || `Rule ${idx + 1}`}
                          </p>
                        </div>

                        {r.formula && (
                          <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 font-mono text-xs font-bold text-amber-300 print:bg-gray-100 print:text-black print:border-gray-300 leading-relaxed">
                            {r.formula}
                          </div>
                        )}

                        {r.explanation && (
                          <p className="text-xs text-gray-300 print:text-gray-700 leading-relaxed font-medium">
                            {r.explanation}
                          </p>
                        )}

                        {r.examples && (
                          <div className="p-2.5 rounded-xl bg-black/30 border border-pink-500/20 text-xs text-pink-200 print:bg-transparent print:text-black print:border-gray-200 italic font-medium">
                            <strong className="not-italic text-pink-400">Example: </strong>
                            {Array.isArray(r.examples) ? r.examples.join(' • ') : r.examples}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Key Conversation Scene Text */}
              {sceneText && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2">
                    <h3 className="text-base font-extrabold flex items-center gap-2.5 text-emerald-300 print:text-black">
                      <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 print:hidden">💬</span>
                      Key Dialogue & Conversation Expressions
                    </h3>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border text-sm leading-relaxed whitespace-pre-line ${
                      dark
                        ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-100"
                        : "bg-emerald-50 border-emerald-200 text-emerald-950"
                    } print:bg-white print:text-black print:border-gray-300`}
                  >
                    {sceneText}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between text-xs text-gray-400 border-t border-purple-500/20 shrink-0 print:border-gray-300 print:text-black">
          <span className="font-semibold">
            FrancPrep Curriculum • {lesson?.title || 'Chapter Cheat Sheet'}
          </span>
          <button
            onClick={() => window.print()}
            className="print:hidden text-purple-400 hover:text-purple-300 font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Export PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Interactive Chapter Flashcard Modal Component ─────────────────────────────

function ChapterFlashcardModal({ lesson, dark, onClose, speak }: { lesson: any; dark: boolean; onClose: () => void; speak: (txt: string) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFlashcards() {
      let chNum = 0;
      if (typeof lesson?.chapter === 'number' && lesson.chapter > 0) {
        chNum = lesson.chapter;
      } else if (typeof lesson?.chapterId === 'number' && lesson.chapterId > 0) {
        chNum = lesson.chapterId;
      }

      if (!chNum && typeof lesson?.lessonId === 'string') {
        const match = lesson.lessonId.match(/ch(\d+)/i) || lesson.lessonId.match(/c(\d+)-l/i) || lesson.lessonId.match(/chapter[-_\s]*(\d+)/i);
        if (match) chNum = Number(match[1]);
      }

      if (!chNum && typeof lesson?.chapterId === 'string') {
        const match = lesson.chapterId.match(/ch(\d+)/i) || lesson.chapterId.match(/chapter[-_\s]*(\d+)/i);
        if (match) chNum = Number(match[1]);
      }

      if (!chNum) chNum = 1;

      try {
        const res = await apiFetch("/lessons?limit=200");
        const json = await res.json();
        const allLessons = json.data || json.lessons || (Array.isArray(json) ? json : []);
        const chLessons = allLessons.filter((l: any) => {
          let lCh = 0;
          if (typeof l.chapter === 'number' && l.chapter > 0) {
            lCh = l.chapter;
          } else if (typeof l.chapterId === 'number' && l.chapterId > 0) {
            lCh = l.chapterId;
          }

          if (!lCh && typeof l.lessonId === 'string') {
            const match = l.lessonId.match(/ch(\d+)/i) || l.lessonId.match(/c(\d+)-l/i) || l.lessonId.match(/chapter[-_\s]*(\d+)/i);
            if (match) lCh = Number(match[1]);
          }

          if (!lCh && typeof l.chapterId === 'string') {
            const match = l.chapterId.match(/ch(\d+)/i) || l.chapterId.match(/chapter[-_\s]*(\d+)/i);
            if (match) lCh = Number(match[1]);
          }

          if (!lCh) lCh = 1;
          return lCh === chNum;
        });

        const cardList: any[] = [];
        for (const l of chLessons) {
          const vList = Array.isArray(l.vocabItems) && l.vocabItems.length > 0 ? l.vocabItems
            : Array.isArray(l.vocabulary) && l.vocabulary.length > 0 ? l.vocabulary : [];

          for (const v of vList) {
            let fr = typeof v === 'string' ? v : v.french || v.term || v.word || '';
            let en = typeof v === 'string' ? '' : v.english || v.translation || v.meaning || '';
            if (!en && (fr.includes('→') || fr.includes('->'))) {
              const parts = fr.split(/→|->/);
              fr = parts[0]?.replace(/^[-•]\s*/, '').trim();
              en = parts[1]?.trim() || '';
            }
            if (fr) {
              cardList.push({
                french: fr,
                english: en || 'Target Vocabulary',
                pronunciation: typeof v === 'object' ? v.pronunciation || '' : '',
                example: typeof v === 'object' ? v.example || '' : ''
              });
            }
          }
        }

        if (isMounted) {
          setCards(cardList.length > 0 ? cardList : [
            { french: "Bonjour ! Comment allez-vous ?", english: "Hello! How are you? (Formal)" },
            { french: "Enchanté(e)", english: "Pleased to meet you" },
            { french: "S'il vous plaît", english: "Please (Formal)" }
          ]);
        }
      } catch (err) {
        if (isMounted) {
          setCards([
            { french: "Bonjour !", english: "Hello!" },
            { french: "Merci beaucoup", english: "Thank you very much" }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFlashcards();
    return () => { isMounted = false; };
  }, [lesson]);

  const currentCard = cards[currentIdx] || { french: "Aucune carte disponible", english: "No vocabulary terms found for this lesson deck." };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-6 ${dark ? "bg-[#0c1224] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"}`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">
                Spaced Repetition Deck
              </span>
              <h3 className="text-sm font-extrabold">{lesson?.title || 'Chapter Flashcards'}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-400">
          <span>Card {currentIdx + 1} of {cards.length}</span>
          <button
            onClick={() => { setIsFlipped(false); setCurrentIdx(0); }}
            className="flex items-center gap-1 text-purple-400 hover:underline text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Deck
          </button>
        </div>

        {/* Interactive Flippable 3D Flashcard */}
        {loading ? (
          <div className="h-56 rounded-2xl border flex items-center justify-center dark:bg-black/30 border-purple-500/20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="perspective-1000" style={{ perspective: "1000px" }}>
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className={`relative rounded-2xl border-2 cursor-pointer min-h-[220px] flex items-center justify-center text-center select-none shadow-xl transition-all ${
                isFlipped
                  ? dark
                    ? "bg-gradient-to-br from-indigo-950/90 via-purple-900/60 to-[#0c1224] border-indigo-500/50"
                    : "bg-gradient-to-br from-indigo-50 via-purple-50 to-white border-indigo-300"
                  : dark
                    ? "bg-gradient-to-br from-purple-950/60 via-[#101828] to-[#0c1224] border-purple-500/40 hover:border-purple-400"
                    : "bg-gradient-to-br from-purple-50 via-white to-purple-50 border-purple-200 hover:border-purple-300"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front - French */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                style={{ backfaceVisibility: "hidden" }}>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 mb-2">
                  🇫🇷 FRENCH EXPRESSION
                </span>
                <p className={`text-xl font-extrabold leading-snug px-4 ${dark ? "text-white" : "text-gray-900"}`}>
                  {currentCard.french}
                </p>
                {currentCard.pronunciation && (
                  <p className="text-xs text-purple-300 italic font-mono mt-1">
                    /{currentCard.pronunciation}/
                  </p>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); speak(currentCard.french); }}
                  className="mt-3 p-2.5 rounded-full bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/30 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 text-[10px] text-gray-400 font-medium">Click card to flip</span>
              </div>

              {/* Back - English */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-400 mb-2">
                  🇬🇧 ENGLISH TRANSLATION
                </span>
                <p className={`text-xl font-extrabold leading-snug px-4 ${dark ? "text-indigo-200" : "text-indigo-900"}`}>
                  {currentCard.english}
                </p>
                {currentCard.example && (
                  <p className={`text-xs mt-2 italic px-3 py-1.5 rounded-lg max-w-xs ${dark ? "bg-black/30 text-gray-300" : "bg-purple-50 text-gray-700"}`}>
                    "{currentCard.example}"
                  </p>
                )}
                <span className="absolute bottom-3 text-[10px] text-gray-400 font-medium">Click to flip back</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              currentIdx === 0 ? "opacity-30 cursor-not-allowed" : ""
            } ${
              dark ? "bg-black/40 border-purple-500/30 text-gray-300 hover:bg-purple-500/20" : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIdx >= cards.length - 1}
            className={`flex-1 py-3 rounded-xl text-white text-xs font-extrabold shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-1 ${
              currentIdx >= cards.length - 1 ? "opacity-30 cursor-not-allowed bg-gray-600" : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500"
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
