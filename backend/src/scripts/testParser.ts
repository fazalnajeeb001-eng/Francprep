import { parseChapterFile } from '../services/markdownLessonParser';
import * as path from 'path';
import * as fs from 'fs';
import Ajv from 'ajv';

const mdPath = path.resolve(__dirname, '../../../full a1 content including ledger and course skeleton/FrancPrep_A1_Chapter1_Greetings_First_Contact.md');
const standardSchemaPath = path.resolve(__dirname, '../schemas/lesson.schema.json');
const integratedSchemaPath = path.resolve(__dirname, '../schemas/lesson-integrated.schema.json');
const reviewSchemaPath = path.resolve(__dirname, '../schemas/lesson-review.schema.json');

const lessons: any[] = parseChapterFile(mdPath, 'A1', 1);

console.log(`\nParsed ${lessons.length} lessons from Chapter 1\n`);

for (const lesson of lessons) {
  console.log(`=== ${lesson.lessonId}: ${lesson.title} ===`);
  console.log(`  Anchor Skill: ${lesson.anchorSkill}`);
  if (lesson.warmUp?.content) console.log(`  Warm-Up: ${lesson.warmUp.content.slice(0, 60)}...`);
  if (lesson.explanation?.content) console.log(`  Explanation: ${lesson.explanation.content.slice(0, 60)}...`);
  if (lesson.vocabulary) console.log(`  Vocabulary: ${lesson.vocabulary.length} items`);
  if (lesson.vocabularyBank?.items) console.log(`  Vocabulary Bank: ${lesson.vocabularyBank.items.length} items`);
  
  if (lesson.grammarDrills?.questions) {
    console.log(`  Grammar drills: ${lesson.grammarDrills.questions.length} questions`);
    for (const q of lesson.grammarDrills.questions) {
      console.log(`    [${q.id}] ${q.prompt.slice(0, 60)} → answer: "${q.correctAnswer}"`);
    }
  }

  if (lesson.reading) {
    console.log(`  Reading: "${lesson.reading.title}" (${lesson.reading.questions.length} questions)`);
    for (const q of lesson.reading.questions) {
      console.log(`    [${q.id}] ${q.prompt.slice(0, 60)} → answer: "${String(q.correctAnswer).slice(0, 40)}"`);
    }
  }

  if (lesson.listening) {
    console.log(`  Listening: "${lesson.listening.title}" (${lesson.listening.questions.length} questions, type: ${lesson.listening.questions[0]?.type || 'N/A'})`);
    for (const q of lesson.listening.questions) {
      console.log(`    [${q.id}] type=${q.type} prompt="${q.prompt.slice(0, 50)}" answer="${String(q.correctAnswer).slice(0, 40)}"`);
    }
  }

  if (lesson.practiceExercises?.questions) {
    console.log(`  Practice: ${lesson.practiceExercises.questions.length} questions`);
    for (const q of lesson.practiceExercises.questions) {
      const answerStr = Array.isArray(q.correctAnswer) ? JSON.stringify(q.correctAnswer).slice(0, 50) : String(q.correctAnswer).slice(0, 50);
      console.log(`    [${q.id}] type=${q.type} prompt="${q.prompt.slice(0, 50)}" answer="${answerStr}"${q.options ? ` opts=${q.options.length}` : ''}${q.pairs ? ` pairs=${q.pairs.length}` : ''}${q.items ? ` items=${q.items.length}` : ''}`);
    }
  }

  if (lesson.selfAssessment) console.log(`  Self Assessment: ${lesson.selfAssessment.length} items`);
  console.log('');
}

// Validate all lessons against their respective schema variants
console.log('=== Schema Validation (All 8 Lessons) ===');
const ajv = new Ajv({ allErrors: true, strict: false });

const validateStandard = ajv.compile(JSON.parse(fs.readFileSync(standardSchemaPath, 'utf-8')));
const validateIntegrated = ajv.compile(JSON.parse(fs.readFileSync(integratedSchemaPath, 'utf-8')));
const validateReview = ajv.compile(JSON.parse(fs.readFileSync(reviewSchemaPath, 'utf-8')));

let passCount = 0;
let failCount = 0;

for (const lesson of lessons) {
  const isL7 = lesson.lessonId.endsWith('-l7') || lesson.anchorSkill === 'integrated';
  const isL8 = lesson.lessonId.endsWith('-l8') || lesson.anchorSkill === 'review';

  let valid = false;
  let validatorErrors = null;

  if (isL7) {
    valid = validateIntegrated(lesson as any);
    validatorErrors = validateIntegrated.errors;
  } else if (isL8) {
    valid = validateReview(lesson as any);
    validatorErrors = validateReview.errors;
  } else {
    valid = validateStandard(lesson as any);
    validatorErrors = validateStandard.errors;
  }

  if (valid) {
    passCount++;
    console.log(`  ✓ ${lesson.lessonId} (${lesson.anchorSkill}): VALID`);
  } else {
    failCount++;
    const uniqueErrors = [...new Set((validatorErrors || []).map(e => `${e.instancePath || '/'} ${e.message}`))];
    console.log(`  ✗ ${lesson.lessonId} (${lesson.anchorSkill}): ${uniqueErrors.length} error(s)`);
    for (const err of uniqueErrors) {
      console.log(`    - ${err}`);
    }
  }
}

console.log(`\n  Final Audit Result: ${passCount} VALID, ${failCount} INVALID out of ${lessons.length} lessons`);
