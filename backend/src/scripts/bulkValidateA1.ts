/**
 * bulkValidateA1.ts — Parse all 80 A1 lessons across 10 chapters and report results.
 *
 * Run: cd backend && npx ts-node src/scripts/bulkValidateA1.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseLessonMarkdown, ParseMetadata } from '../services/lessonParser';

const CONTENT_DIR = path.join(
  __dirname, '..', '..', '..',
  'full a1 content including ledger and course skeleton',
);

const CHAPTER_FILES = [
  'FrancPrep_A1_Chapter1_Greetings_First_Contact.md',
  'FrancPrep_A1_Chapter2_Personal_Information.md',
  'FrancPrep_A1_Chapter3_Describing_People_Family.md',
  'FrancPrep_A1_Chapter4_Daily_Routines.md',
  'FrancPrep_A1_Chapter5_Food_Dining.md',
  'FrancPrep_A1_Chapter6_Shopping_Money.md',
  'FrancPrep_A1_Chapter7_Numbers_Time_Dates.md',
  'FrancPrep_A1_Chapter8_Places_Directions.md',
  'FrancPrep_A1_Chapter9_Weather_Nature.md',
  'FrancPrep_A1_Chapter10_Health_Body_Leisure.md',
];

// ─── Extract lesson blocks ──────────────────────────────────────────────────

interface LessonBlock {
  lessonNum: number;
  markdown: string; // the full block including Lesson Information header
}

function extractLessons(fullMarkdown: string): LessonBlock[] {
  const lessons: LessonBlock[] = [];
  const lines = fullMarkdown.split('\n');

  // Find all LESSON headers
  const lessonStarts: { num: number; lineIdx: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].trim().match(/^# LESSON (\d+)$/);
    if (m) {
      lessonStarts.push({ num: parseInt(m[1], 10), lineIdx: i });
    }
  }

  for (let j = 0; j < lessonStarts.length; j++) {
    const startIdx = lessonStarts[j].lineIdx + 1; // skip the LESSON header line
    const endIdx =
      j + 1 < lessonStarts.length
        ? lessonStarts[j + 1].lineIdx
        : lines.length;

    const block = lines.slice(startIdx, endIdx).join('\n').trim();
    lessons.push({
      lessonNum: lessonStarts[j].num,
      markdown: block,
    });
  }

  return lessons;
}

// ─── Parse metadata from lesson information block ───────────────────────────

function parseMetadata(
  lessonNum: number,
  chapterNum: number,
  block: string,
): ParseMetadata | null {
  try {
    // Extract the Lesson Information section
    const infoMatch = block.match(
      /# Lesson Information[\s\S]*?(?=\n---|\n# (?:Warm|Lesson|Vocab|Gramm|Read|List|Speak|Writ|Pract|Mini|Self|Chapter))/m,
    );
    if (!infoMatch) {
      console.error(`    ⚠ No Lesson Information block found for Lesson ${lessonNum}`);
      return null;
    }

    const info = infoMatch[0];

    // Extract fields
    const titleMatch = info.match(/\*\*Lesson Title:\*\*\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Lesson ${lessonNum}`;

    const skillMatch = info.match(/\*\*Anchor Skill:\*\*\s*(.+)/);
    const anchorSkillRaw = skillMatch ? skillMatch[1].trim() : 'Reading (R)';
    const anchorSkill = anchorSkillRaw.toLowerCase().includes('read') ? 'reading'
      : anchorSkillRaw.toLowerCase().includes('listen') ? 'listening'
      : anchorSkillRaw.toLowerCase().includes('speak') ? 'speaking'
      : anchorSkillRaw.toLowerCase().includes('writ') ? 'writing'
      : 'reading';

    const timeMatch = info.match(/\*\*Estimated Time:\*\*\s*(\d+)/);
    const durationMinutes = timeMatch ? parseInt(timeMatch[1], 10) : 25;

    const objMatch = info.match(/\*\*Lesson Objectives:\*\*\s*(.+)/);
    const objectives = objMatch
      ? [objMatch[1].trim()]
      : ['Complete this lesson successfully.'];

    const grammarMatch = info.match(/\*\*Grammar Focus:\*\*\s*(.+)/);
    const grammarFocus = grammarMatch ? grammarMatch[1].trim() : '';

    const vocabMatch = info.match(/\*\*Vocabulary Focus:\*\*\s*(.+)/);
    const vocabularyFocus = vocabMatch ? vocabMatch[1].trim() : '';

    const lessonId = `a1-ch${chapterNum}-l${lessonNum}`;
    const chapterId = `a1-ch${chapterNum}`;

    return {
      lessonId,
      chapterId,
      level: 'A1',
      title,
      anchorSkill: anchorSkill as ParseMetadata['anchorSkill'],
      durationMinutes,
      objectives,
      grammarFocus,
      vocabularyFocus,
    };
  } catch (err: any) {
    console.error(`    ⚠ Error parsing metadata for Lesson ${lessonNum}: ${err.message}`);
    return null;
  }
}

// ─── Get chapter name from filename ─────────────────────────────────────────

function chapterName(filename: string): string {
  const m = filename.match(/FrancPrep_A1_Chapter(\d+)_(.+)\.md/);
  if (m) return `Chapter ${m[1]} — ${m[2].replace(/_/g, ' ')}`;
  return filename;
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface LessonResult {
  lessonNum: number;
  lessonId: string;
  title: string;
  success: boolean;
  errors: string[];
  warnings: string[];
  vocabCount: number;
}

interface ChapterResult {
  chapterFile: string;
  chapterName: string;
  totalLessons: number;
  passed: number;
  failed: number;
  lessons: LessonResult[];
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  FrancPrep A1 Bulk Validation — 10 Chapters, 80 Lessons');
  console.log('═══════════════════════════════════════════════════════\n');

  const allResults: ChapterResult[] = [];
  let grandTotalLessons = 0;
  let grandTotalPassed = 0;
  let grandTotalFailed = 0;
  let grandTotalWarnings = 0;

  for (const chapterFile of CHAPTER_FILES) {
    const fullPath = path.join(CONTENT_DIR, chapterFile);
    const name = chapterName(chapterFile);

    console.log(`\n📖 ${name}`);
    console.log(`   File: ${chapterFile}`);

    if (!fs.existsSync(fullPath)) {
      console.log(`   ❌ FILE NOT FOUND — skipping`);
      continue;
    }

    const fullMarkdown = fs.readFileSync(fullPath, 'utf-8');
    const lessons = extractLessons(fullMarkdown);
    console.log(`   Found ${lessons.length} lesson(s)`);

    const chapterResults: LessonResult[] = [];
    let chapterPassed = 0;
    let chapterFailed = 0;

    for (const lesson of lessons) {
      const chapterNumMatch = chapterFile.match(/Chapter(\d+)/);
      const chapterNum = chapterNumMatch ? parseInt(chapterNumMatch[1], 10) : 0;

      const metadata = parseMetadata(lesson.lessonNum, chapterNum, lesson.markdown);
      if (!metadata) {
        chapterFailed++;
        chapterResults.push({
          lessonNum: lesson.lessonNum,
          lessonId: `a1-ch${chapterNum}-l${lesson.lessonNum}`,
          title: 'UNKNOWN',
          success: false,
          errors: ['Failed to parse metadata'],
          warnings: [],
          vocabCount: 0,
        });
        continue;
      }

      const result = parseLessonMarkdown(lesson.markdown, metadata);

      if (result.success) {
        chapterPassed++;
      } else {
        chapterFailed++;
      }

      if (result.warnings && result.warnings.length > 0) {
        grandTotalWarnings += result.warnings.length;
      }

      chapterResults.push({
        lessonNum: lesson.lessonNum,
        lessonId: metadata.lessonId,
        title: metadata.title,
        success: result.success,
        errors: result.errors || [],
        warnings: result.warnings || [],
        vocabCount: result.lesson?.vocabulary?.length || 0,
      });

      // Print per-lesson status
      const status = result.success ? '✅' : '❌';
      const vocabInfo = result.success ? ` (${result.lesson?.vocabulary?.length || 0} vocab)` : '';
      console.log(`     L${lesson.lessonNum} ${status} ${metadata.title}${vocabInfo}`);

      if (!result.success && result.errors) {
        for (const err of result.errors) {
          console.log(`        ↳ ${err}`);
        }
      }
    }

    allResults.push({
      chapterFile,
      chapterName: name,
      totalLessons: lessons.length,
      passed: chapterPassed,
      failed: chapterFailed,
      lessons: chapterResults,
    });

    grandTotalLessons += lessons.length;
    grandTotalPassed += chapterPassed;
    grandTotalFailed += chapterFailed;

    console.log(`   ── ${chapterPassed} passed, ${chapterFailed} failed`);
  }

  // ─── Grand summary ────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  GRAND SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Chapters processed:  ${allResults.length}/10`);
  console.log(`  Total lessons found: ${grandTotalLessons}`);
  console.log(`  Passed:              ${grandTotalPassed}`);
  console.log(`  Failed:              ${grandTotalFailed}`);
  console.log(`  Total warnings:      ${grandTotalWarnings}`);
  console.log('═══════════════════════════════════════════════════════');

  if (grandTotalFailed > 0) {
    console.log('\n  FAILURES:');
    for (const ch of allResults) {
      for (const lr of ch.lessons) {
        if (!lr.success) {
          console.log(`    ${ch.chapterName} / L${lr.lessonNum} (${lr.lessonId}):`);
          for (const e of lr.errors) {
            console.log(`      - ${e}`);
          }
        }
      }
    }
    process.exit(1);
  } else {
    console.log('\n  ✅ ALL LESSONS PASSED VALIDATION');
    process.exit(0);
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
