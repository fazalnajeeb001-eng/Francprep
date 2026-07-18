/**
 * testLessonParser.ts — Test the lessonParser module against real A1 Chapter 1, Lesson 1 markdown.
 *
 * Run: cd backend && npx ts-node src/scripts/testLessonParser.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseLessonMarkdown, ParseMetadata } from '../services/lessonParser';

const CONTENT_FILE = path.join(
  __dirname, '..', '..', '..',
  'full a1 content including ledger and course skeleton',
  'FrancPrep_A1_Chapter1_Greetings_First_Contact.md',
);

const EXAMPLE_LESSON = path.join(
  __dirname, '..', '..', '..',
  'STructure for parsing',
  'example-lesson.json',
);

// ─── Extract LESSON block from the chapter file ───────────────────────────

function extractLessonBlock(fullMarkdown: string, lessonNum: number): string {
  const lines = fullMarkdown.split('\n');
  let startLine = -1;
  let endLine = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === `# LESSON ${lessonNum}`) {
      startLine = i;
    } else if (startLine >= 0 && line.startsWith('# LESSON ') && !line.includes(`${lessonNum}`)) {
      endLine = i;
      break;
    }
  }

  if (startLine < 0) throw new Error(`Could not find LESSON ${lessonNum} header`);

  // Skip the LESSON header line itself
  return lines.slice(startLine + 1, endLine).join('\n').trim();
}

// ─── Build metadata manually (matches what migration script extracts) ─────

const metadata: ParseMetadata = {
  lessonId: 'a1-ch1-l1',
  chapterId: 'a1-ch1',
  level: 'A1',
  title: 'Basic Greetings (Bonjour/Salut/Bonsoir)',
  anchorSkill: 'reading',
  durationMinutes: 22,
  objectives: [
    'Recognize and use the core greeting and farewell expressions, matched correctly to time of day and formality.',
  ],
  grammarFocus:
    'Introduction to être: je suis / tu es (used only in the fixed phrase pattern "Je suis... / Tu es...", not yet taught as a full paradigm).',
  vocabularyFocus: 'bonjour, bonsoir, salut, au revoir, à bientôt, bonne nuit, madame, monsieur',
};

// ─── Shape verification ───────────────────────────────────────────────────

function checkShape(lesson: any, example: any): string[] {
  const issues: string[] = [];

  // Top-level keys that must exist
  const expectedKeys = [
    'lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes',
    'objectives', 'grammarFocus', 'vocabularyFocus',
    'warmUp', 'explanation', 'vocabulary', 'grammar', 'grammarDrills',
    'reading', 'listening', 'speaking', 'writing', 'practiceExercises',
    'miniReview', 'selfAssessment',
  ];

  for (const key of expectedKeys) {
    if (!(key in lesson)) {
      issues.push(`Missing top-level key: ${key}`);
    }
  }

  // Check section shapes
  if (lesson.warmUp && typeof lesson.warmUp.content !== 'string') {
    issues.push('warmUp.content should be a string');
  }
  if (lesson.explanation && typeof lesson.explanation.content !== 'string') {
    issues.push('explanation.content should be a string');
  }
  if (!Array.isArray(lesson.vocabulary)) {
    issues.push('vocabulary should be an array');
  } else if (lesson.vocabulary.length > 0) {
    const v = lesson.vocabulary[0];
    for (const vk of ['french', 'english', 'pronunciation', 'example']) {
      if (typeof v[vk] !== 'string') issues.push(`vocabulary[0].${vk} should be a string`);
    }
  }
  if (lesson.grammar) {
    for (const gk of ['explanation', 'formation', 'usage']) {
      if (typeof lesson.grammar[gk] !== 'string') issues.push(`grammar.${gk} should be a string`);
    }
    if (!Array.isArray(lesson.grammar.examples)) issues.push('grammar.examples should be an array');
    if (!Array.isArray(lesson.grammar.commonMistakes)) issues.push('grammar.commonMistakes should be an array');
  }
  if (lesson.grammarDrills && !Array.isArray(lesson.grammarDrills.questions)) {
    issues.push('grammarDrills.questions should be an array');
  }
  if (lesson.reading) {
    if (typeof lesson.reading.title !== 'string') issues.push('reading.title should be a string');
    if (typeof lesson.reading.text !== 'string') issues.push('reading.text should be a string');
    if (!Array.isArray(lesson.reading.questions)) issues.push('reading.questions should be an array');
  }
  if (lesson.listening) {
    if (typeof lesson.listening.title !== 'string') issues.push('listening.title should be a string');
    if (typeof lesson.listening.transcript !== 'string') issues.push('listening.transcript should be a string');
    if (!Array.isArray(lesson.listening.questions)) issues.push('listening.questions should be an array');
  }
  if (lesson.speaking && typeof lesson.speaking.guidedActivity !== 'string') {
    issues.push('speaking.guidedActivity should be a string');
  }
  if (lesson.writing) {
    if (typeof lesson.writing.task !== 'string') issues.push('writing.task should be a string');
    if (typeof lesson.writing.modelAnswer !== 'string') issues.push('writing.modelAnswer should be a string');
    if (!Array.isArray(lesson.writing.checklist)) issues.push('writing.checklist should be an array');
  }
  if (lesson.practiceExercises && !Array.isArray(lesson.practiceExercises.questions)) {
    issues.push('practiceExercises.questions should be an array');
  }
  if (lesson.miniReview && typeof lesson.miniReview.content !== 'string') {
    issues.push('miniReview.content should be a string');
  }
  if (!Array.isArray(lesson.selfAssessment)) {
    issues.push('selfAssessment should be an array');
  }

  return issues;
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  FrancPrep Lesson Parser — Test Suite');
  console.log('═══════════════════════════════════════════\n');

  // 1. Load markdown
  console.log('1. Loading Chapter 1 markdown...');
  const fullMarkdown = fs.readFileSync(CONTENT_FILE, 'utf-8');
  const lessonBlock = extractLessonBlock(fullMarkdown, 1);
  console.log(`   Extracted LESSON 1 block: ${lessonBlock.length} chars\n`);

  // 2. Parse
  console.log('2. Parsing with parseLessonMarkdown()...');
  const result = parseLessonMarkdown(lessonBlock, metadata);

  if (!result.success) {
    console.error('   ❌ Parse failed!');
    console.error('   Errors:', JSON.stringify(result.errors, null, 2));
    console.error('   Warnings:', JSON.stringify(result.warnings, null, 2));
    process.exit(1);
  }

  console.log('   ✅ Parse succeeded');
  if (result.warnings && result.warnings.length > 0) {
    console.log(`   ⚠ Warnings (${result.warnings.length}):`);
    result.warnings.forEach(w => console.log(`      - ${w}`));
  }
  console.log('');

  // 3. Validate shape
  console.log('3. Checking output shape against example-lesson.json...');
  const exampleJson = JSON.parse(fs.readFileSync(EXAMPLE_LESSON, 'utf-8'));
  const shapeIssues = checkShape(result.lesson, exampleJson);

  if (shapeIssues.length > 0) {
    console.error(`   ❌ Shape check found ${shapeIssues.length} issue(s):`);
    shapeIssues.forEach(i => console.error(`      - ${i}`));
    process.exit(1);
  }

  console.log('   ✅ Shape matches expected structure\n');

  // 4. Print summary
  console.log('4. Parsed lesson summary:');
  console.log(`   lessonId:     ${result.lesson.lessonId}`);
  console.log(`   title:        ${result.lesson.title}`);
  console.log(`   level:        ${result.lesson.level}`);
  console.log(`   anchorSkill:  ${result.lesson.anchorSkill}`);
  console.log(`   warmUp:       ${result.lesson.warmUp.content.slice(0, 80)}...`);
  console.log(`   vocabulary:   ${result.lesson.vocabulary.length} items`);
  console.log(`   grammar:      explanation=${result.lesson.grammar.explanation.slice(0, 50)}...`);
  console.log(`   grammarDrills: ${result.lesson.grammarDrills.questions.length} questions`);
  console.log(`   reading:      "${result.lesson.reading.title}" (${result.lesson.reading.questions.length} questions)`);
  console.log(`   listening:    "${result.lesson.listening.title}" (${result.lesson.listening.questions.length} questions)`);
  console.log(`   speaking:     guidedActivity=${result.lesson.speaking.guidedActivity.slice(0, 60)}...`);
  console.log(`   writing:      task=${result.lesson.writing.task.slice(0, 60)}...`);
  console.log(`   practice:     ${result.lesson.practiceExercises.questions.length} exercises`);
  console.log(`   selfAssessment: ${result.lesson.selfAssessment.length} items`);

  // 5. Check question types
  console.log('\n5. Question types in each section:');
  const allQuestionBlocks = [
    { name: 'grammarDrills', questions: result.lesson.grammarDrills.questions },
    { name: 'reading', questions: result.lesson.reading.questions },
    { name: 'listening', questions: result.lesson.listening.questions },
    { name: 'practiceExercises', questions: result.lesson.practiceExercises.questions },
  ];

  for (const block of allQuestionBlocks) {
    const types = [...new Set(block.questions.map((q: any) => q.type))];
    console.log(`   ${block.name}: ${block.questions.length} questions, types: [${types.join(', ')}]`);
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('  ✅ ALL TESTS PASSED');
  console.log('═══════════════════════════════════════════');
}

main().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
