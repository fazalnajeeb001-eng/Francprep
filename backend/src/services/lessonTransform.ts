/**
 * Transforms a canonical schema-shaped lesson document (lesson.schema.json)
 * into the `LessonData` shape the existing LessonPage UI consumes.
 *
 * The UI reads `lesson.sections` (an ordered array of page sections, each with
 * a markdown `body` parsed client-side) plus a separate `exercises` collection.
 * We never touch the UI; we only reshape the stored canonical doc on read.
 */

import type { ParsedLesson } from './markdownLessonParser';
import type { ILessonQuestion } from '../models/Lesson';

type LessonDoc = ParsedLesson;
type Question = ILessonQuestion;

function anchorToSkill(anchor: string): 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV' {
  switch ((anchor || '').toLowerCase()) {
    case 'reading': return 'R';
    case 'writing': return 'W';
    case 'listening': return 'L';
    case 'speaking': return 'S';
    case 'integrated': return 'INT';
    case 'review': return 'REV';
    default: return 'R';
  }
}

function serializeVocabulary(doc: LessonDoc): string {
  // UI's parseVocabulary splits each "|"-containing line by "|" into
  // [french, english, pronunciation, example]. No header/separator rows
  // (a header row would be rendered as a bogus vocabulary card).
  return doc.vocabItems
    .map((v: { french: string; english: string; pronunciation?: string; example?: string }) =>
      `| ${v.french} | ${v.english} | ${v.pronunciation || '—'} | ${v.example || '—'} |`)
    .join('\n');
}

function serializeGrammar(doc: LessonDoc): string {
  const g = doc.grammar;
  const parts: string[] = [];
  if (g.explanation) parts.push(g.explanation.trim());
  if (g.formation) parts.push(`Formation:\n${g.formation.trim()}`);
  if (g.usage) parts.push(`Usage:\n${g.usage.trim()}`);
  if (g.examples && g.examples.length) {
    parts.push(`Examples:\n${g.examples.map((e) => `- ${e}`).join('\n')}`);
  }
  if (g.commonMistakes && g.commonMistakes.length) {
    parts.push(
      `Common Mistakes:\n${g.commonMistakes
        .map((m) => `❌ ${m.wrong} → ✅ ${m.correct}${m.why ? ` (${m.why})` : ''}`)
        .join('\n')}`
    );
  }
  // Grammar drills become inline ____ markers (answers stripped — they only live in questions[]).
  const drills = doc.grammarDrills.questions || [];
  if (drills.length) {
    parts.push(
      `Mini Drills:\n${drills
        .map((d) => `${d.prompt} ____`)
        .join('\n')}`
    );
  }
  return parts.join('\n\n');
}

function serializeSpeaking(doc: LessonDoc): string {
  const parts: string[] = [];
  if (doc.speaking.guidedActivity) parts.push(doc.speaking.guidedActivity.trim());
  if (doc.speaking.roleplay) parts.push(`Roleplay:\n${doc.speaking.roleplay.trim()}`);
  if (doc.speaking.pronunciationTip) parts.push(`Pronunciation Tip:\n${doc.speaking.pronunciationTip.trim()}`);
  return parts.join('\n\n');
}

function serializeWriting(doc: LessonDoc): string {
  const w = doc.writing;
  const checklist = (w.checklist || []).map((c) => `- ${c}`).join('\n');
  return [`Task:\n${w.task.trim()}`, `Model Answer:\n${w.modelAnswer.trim()}`, `Checklist:\n${checklist}`].join('\n\n');
}

function serializeReview(doc: LessonDoc): string {
  const parts: string[] = [];
  if (doc.miniReview.content) parts.push(doc.miniReview.content.trim());
  if (doc.selfAssessment && doc.selfAssessment.length) {
    parts.push(`Self-Assessment:\n${doc.selfAssessment.filter((s) => s && s.trim()).map((s) => `- ${s}`).join('\n')}`);
  }
  return parts.join('\n\n');
}

export interface TransformedSection {
  type: string;
  title: string;
  body: string;
  translation?: string;
  questions?: Question[];
  media?: { audio?: string[]; images?: string[] };
}

export interface TransformedLesson {
  _id: string;
  title: string;
  chapterId: string;
  order: number;
  skill: string;
  level: string;
  objectives: string[];
  grammarTopics: string[];
  sections: TransformedSection[];
  content: string;
  estimatedDuration: number;
}

/**
 * Build the UI-facing LessonData from a stored Lesson document that has a
 * `canonical` field. Preserves the 11-page order from the spec §1.
 */
export function transformLesson(lesson: any): TransformedLesson {
  const doc: LessonDoc = lesson.canonical;
  
  // Build grammar section WITH drills merged in (frontend parses ____[answer:] from body)
  const grammarExplanation = [doc.grammar.explanation, doc.grammar.formation, doc.grammar.usage]
    .filter(Boolean)
    .map(s => s.trim())
    .join('\n\n');
  
  const grammarExamples = doc.grammar.examples?.length
    ? `Examples:\n${doc.grammar.examples.map(e => `- ${e}`).join('\n')}`
    : '';
  
  const grammarMistakes = doc.grammar.commonMistakes?.length
    ? `Common Mistakes:\n${doc.grammar.commonMistakes
        .map(m => `❌ ${m.wrong} → ✅ ${m.correct}${m.why ? ` (${m.why})` : ''}`)
        .join('\n')}`
    : '';
  
  const drills = doc.grammarDrills?.questions || [];
  const grammarDrillsText = drills.length
    ? `\n\nMini Drills:\n${drills
        .map(d => `${d.prompt} ____`)
        .join('\n')}`
    : '';

  const grammarBody = [grammarExplanation, grammarExamples, grammarMistakes, grammarDrillsText]
    .filter(Boolean)
    .join('\n\n');

  const readingQs = doc.reading?.questions || [];
  const readingBodyParts = [doc.reading?.text || ''];
  if (doc.reading?.translation) {
    readingBodyParts.push(`\nEnglish Translation:\n${doc.reading.translation}`);
  }
  if (readingQs.length) {
    readingBodyParts.push(`\nComprehension Questions:\n${readingQs.map((q, i) => `${i + 1}. ${q.prompt}`).join('\n')}`);
  }
  const readingBody = readingBodyParts.join('\n');

  const listeningQs = doc.listening?.questions || [];
  const listeningBodyParts = [doc.listening?.transcript || ''];
  if (doc.listening?.translation) {
    listeningBodyParts.push(`\nEnglish Translation:\n${doc.listening.translation}`);
  }
  if (listeningQs.length) {
    listeningBodyParts.push(`\nListening Activity:\n${listeningQs.map((q, i) => `${i + 1}. ${q.prompt}`).join('\n')}`);
  }
  const listeningBody = listeningBodyParts.join('\n');

  const sections: TransformedSection[] = [
    { type: 'warmup', title: 'Warm-Up', body: doc.warmUp?.content || '' },
    { type: 'explanation', title: 'Lesson Explanation', body: doc.explanation?.content || '' },
    { type: 'vocabulary', title: 'Vocabulary', body: serializeVocabulary(doc) },
    { type: 'grammar', title: 'Grammar', body: grammarBody || serializeGrammar(doc) },
    {
      type: 'reading',
      title: doc.reading?.title || 'Reading',
      body: readingBody,
      translation: doc.reading?.translation,
    },
    {
      type: 'listening',
      title: doc.listening?.title || 'Listening',
      body: listeningBody,
      translation: doc.listening?.translation,
    },
    { type: 'speaking', title: 'Speaking', body: serializeSpeaking(doc) },
    { type: 'writing', title: 'Writing', body: serializeWriting(doc) },
    {
      type: 'practice',
      title: 'Practice Exercises',
      body: 'Complete the exercises below to practice everything you have learned in this lesson.',
    },
    { type: 'review', title: 'Mini Review & Self-Assessment', body: serializeReview(doc) },
  ];

  return {
    _id: lesson._id?.toString?.() || lesson._id,
    title: doc.title,
    chapterId: lesson.chapterId?.toString?.() || lesson.chapterId || doc.chapterId,
    order: typeof lesson.order === 'number' ? lesson.order : 1,
    skill: anchorToSkill(doc.anchorSkill),
    level: doc.level,
    objectives: doc.objectives || [],
    grammarTopics: doc.grammarFocus ? [doc.grammarFocus] : [],
    sections,
    content: lesson.content || '',
    estimatedDuration: doc.durationMinutes,
  };
}

/** Map a canonical question to the Exercise question shape (IQuestion). */
export function canonicalQuestionToExerciseQuestion(q: Question, idx: number) {
  const base: any = {
    id: q.id || `q-${idx}`,
    text: q.prompt,
    question: q.prompt,
    type: q.type,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || '',
    points: 1,
    prompt: q.prompt,
  };
  if (q.options) base.options = q.options;
  if (q.pairs) base.pairs = q.pairs;
  if (q.items) base.items = q.items;
  if (q.type === 'ordering' && Array.isArray(q.correctAnswer)) base.correctOrder = q.correctAnswer;
  if (q.type === 'short_answer' || q.type === 'translation') base.sampleAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : String(q.correctAnswer);
  return base;
}
