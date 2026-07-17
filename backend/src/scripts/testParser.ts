import { parseChapterFile } from '../services/markdownLessonParser';
import * as path from 'path';
import * as fs from 'fs';
import Ajv from 'ajv';

const mdPath = path.resolve(__dirname, '../../../full a1 content including ledger and course skeleton/FrancPrep_A1_Chapter1_Greetings_First_Contact.md');
const schemaPath = path.resolve(__dirname, '../../../STructure for parsing/lesson.schema.json');
const lessons = parseChapterFile(mdPath, 'A1', 1);

console.log(`\nParsed ${lessons.length} lessons from Chapter 1\n`);

for (const lesson of lessons) {
  console.log(`=== ${lesson.lessonId}: ${lesson.title} ===`);
  console.log(`  Anchor Skill: ${lesson.anchorSkill}`);
  console.log(`  Warm-Up: ${lesson.warmUp.content.slice(0, 60)}...`);
  console.log(`  Explanation: ${lesson.explanation.content.slice(0, 60)}...`);
  console.log(`  Vocabulary: ${lesson.vocabItems.length} items`);
  console.log(`  Grammar drills: ${lesson.grammarDrills.questions.length} questions`);
  for (const q of lesson.grammarDrills.questions) {
    console.log(`    [${q.id}] ${q.prompt.slice(0, 60)} → answer: "${q.correctAnswer}"`);
  }
  console.log(`  Reading: "${lesson.reading.title}" (${lesson.reading.questions.length} questions)`);
  for (const q of lesson.reading.questions) {
    console.log(`    [${q.id}] ${q.prompt.slice(0, 60)} → answer: "${String(q.correctAnswer).slice(0, 40)}"`);
  }
  console.log(`  Listening: "${lesson.listening.title}" (${lesson.listening.questions.length} questions, type: ${lesson.listening.questions[0]?.type || 'N/A'})`);
  for (const q of lesson.listening.questions) {
    console.log(`    [${q.id}] type=${q.type} prompt="${q.prompt.slice(0, 50)}" answer="${String(q.correctAnswer).slice(0, 40)}"`);
  }
  console.log(`  Practice: ${lesson.practiceExercises.questions.length} questions`);
  for (const q of lesson.practiceExercises.questions) {
    const answerStr = Array.isArray(q.correctAnswer) ? JSON.stringify(q.correctAnswer).slice(0, 50) : String(q.correctAnswer).slice(0, 50);
    console.log(`    [${q.id}] type=${q.type} prompt="${q.prompt.slice(0, 50)}" answer="${answerStr}"${q.options ? ` opts=${q.options.length}` : ''}${q.pairs ? ` pairs=${q.pairs.length}` : ''}${q.items ? ` items=${q.items.length}` : ''}`);
  }
  console.log(`  Self Assessment: ${lesson.selfAssessment.length} items`);
  console.log('');
}

// Validate all lessons against lesson.schema.json
console.log('=== Schema Validation (All Lessons) ===');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

let passCount = 0;
let failCount = 0;
for (const lesson of lessons) {
  const schemaCompatible: any = {
    ...lesson,
    vocabulary: lesson.vocabItems,
  };
  delete schemaCompatible.vocabItems;
  const valid = validate(schemaCompatible);
  if (valid) {
    passCount++;
    console.log(`  ✓ ${lesson.lessonId}: valid`);
  } else {
    failCount++;
    const uniqueErrors = [...new Set((validate.errors || []).map(e => `${e.instancePath || ''}: ${e.message}`))];
    console.log(`  ✗ ${lesson.lessonId}: ${uniqueErrors.length} error(s)`);
    for (const err of uniqueErrors) {
      console.log(`    - ${err}`);
    }
  }
}
console.log(`\n  Results: ${passCount} valid, ${failCount} invalid out of ${lessons.length}`);
