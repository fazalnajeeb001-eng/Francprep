import Lesson from '../models/Lesson';
import { parseChapterFile, ParsedLesson } from './markdownLessonParser';

/**
 * Convert a ParsedLesson (from markdown parser) to a Lesson model document shape.
 * Maps canonical fields to the Lesson model's new-field layout.
 */
function mapSkillCode(anchorSkill: string): 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV' {
  const map: Record<string, 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV'> = {
    reading: 'R', writing: 'W', listening: 'L', speaking: 'S', integrated: 'INT', review: 'REV',
  };
  return map[anchorSkill] || 'R';
}

function mapCategoryCode(anchorSkill: string): string {
  const map: Record<string, string> = {
    reading: 'reading', writing: 'writing', listening: 'listening', speaking: 'speaking', integrated: 'grammar', review: 'grammar',
  };
  return map[anchorSkill] || 'grammar';
}

export function parsedLessonToDocument(lesson: ParsedLesson): Record<string, any> {
  return {
    lessonId: lesson.lessonId,
    title: lesson.title,
    level: lesson.level,
    skill: mapSkillCode(lesson.anchorSkill),
    anchorSkill: lesson.anchorSkill,
    durationMinutes: lesson.durationMinutes,
    objectives: lesson.objectives,
    grammarFocus: lesson.grammarFocus,
    vocabularyFocus: lesson.vocabularyFocus,
    warmUp: lesson.warmUp,
    explanation: lesson.explanation,
    vocabItems: lesson.vocabItems,
    grammar: lesson.grammar,
    grammarDrills: lesson.grammarDrills,
    reading: lesson.reading,
    listening: lesson.listening,
    speaking: lesson.speaking,
    writing: lesson.writing,
    practiceExercises: lesson.practiceExercises,
    miniReview: lesson.miniReview,
    selfAssessment: lesson.selfAssessment,
    // Old fields set to defaults for backward compatibility
    category: mapCategoryCode(lesson.anchorSkill),
    isPublished: false,
    order: parseInt(lesson.lessonId.split('-l')[1]) || 1,
  };
}

/**
 * Import a single chapter markdown file into the database.
 * Uses upsert (update if lessonId exists, insert if not).
 * Returns summary of what was imported.
 */
export async function importChapterMarkdown(
  filePath: string,
  level: string,
  chapterNum: number
): Promise<{
  total: number;
  created: number;
  updated: number;
  skipped: number;
  errors: { lessonId: string; error: string }[];
}> {
  const lessons = parseChapterFile(filePath, level, chapterNum);
  let created = 0, updated = 0, skipped = 0;
  const errors: { lessonId: string; error: string }[] = [];

  for (const lesson of lessons) {
    try {
      const doc = parsedLessonToDocument(lesson);

      // Skip review chapters that have no real content
      if (lesson.lessonId.endsWith('-l8') && lesson.warmUp.content === '...') {
        skipped++;
        continue;
      }

      const existing = await Lesson.findOne({ lessonId: lesson.lessonId });
      if (existing) {
        await Lesson.findOneAndUpdate({ lessonId: lesson.lessonId }, doc, { runValidators: true });
        updated++;
      } else {
        await Lesson.create(doc);
        created++;
      }
    } catch (err: any) {
      errors.push({ lessonId: lesson.lessonId, error: err.message });
    }
  }

  return { total: lessons.length, created, updated, skipped, errors };
}

/**
 * Import all chapter markdown files matching a glob pattern.
 * Looks for files named FrancPrep_{LEVEL}_Chapter{N}_*.md
 */
export async function importAllChapters(
  chaptersDir: string,
  chapters: { level: string; chapterNum: number; filename: string }[]
): Promise<{
  totalLessons: number;
  totalCreated: number;
  totalUpdated: number;
  totalSkipped: number;
  totalErrors: number;
  details: { filename: string; result: Awaited<ReturnType<typeof importChapterMarkdown>> }[];
}> {
  let totalLessons = 0, totalCreated = 0, totalUpdated = 0, totalSkipped = 0, totalErrors = 0;
  const details: { filename: string; result: Awaited<ReturnType<typeof importChapterMarkdown>> }[] = [];

  for (const ch of chapters) {
    const path = `${chaptersDir}/${ch.filename}`;
    const result = await importChapterMarkdown(path, ch.level, ch.chapterNum);
    totalLessons += result.total;
    totalCreated += result.created;
    totalUpdated += result.updated;
    totalSkipped += result.skipped;
    totalErrors += result.errors.length;
    details.push({ filename: ch.filename, result });
  }

  return { totalLessons, totalCreated, totalUpdated, totalSkipped, totalErrors, details };
}
