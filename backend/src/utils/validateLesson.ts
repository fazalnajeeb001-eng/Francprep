import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs';
import * as path from 'path';

function loadSchema(filename: string): any {
  // Try several directories
  const paths = [
    path.resolve(__dirname, '..', 'schemas', filename),
    path.resolve(__dirname, '..', '..', '..', 'src', 'schemas', filename),
    path.resolve(process.cwd(), 'src', 'schemas', filename),
    path.resolve(process.cwd(), 'backend', 'src', 'schemas', filename),
    path.resolve(process.cwd(), 'backend', 'dist', 'schemas', filename)
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }
  throw new Error(`Schema file not found: ${filename}. Tried paths: ${JSON.stringify(paths, null, 2)}`);
}

const standardSchema = loadSchema('lesson.schema.json');
const integratedSchema = loadSchema('lesson-integrated.schema.json');
const reviewSchema = loadSchema('lesson-review.schema.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validateStandard = ajv.compile(standardSchema);
const validateIntegrated = ajv.compile(integratedSchema);
const validateReview = ajv.compile(reviewSchema);

export function validateLesson(lesson: any): { valid: boolean; errors: string[] } {
  if (!lesson) {
    return { valid: false, errors: ['Lesson data is empty'] };
  }

  const lessonId = String(lesson.lessonId || '').toLowerCase();
  let validateFn = validateStandard;
  let schemaName = 'Standard';

  if (lessonId.endsWith('-l7') || lesson.anchorSkill === 'integrated' || lesson.skill === 'INT') {
    validateFn = validateIntegrated;
    schemaName = 'Integrated Practice (Lesson 7)';
  } else if (lessonId.endsWith('-l8') || lesson.anchorSkill === 'review' || lesson.skill === 'REV') {
    validateFn = validateReview;
    schemaName = 'Review & Mini-Assessment (Lesson 8)';
  }

  const valid = validateFn(lesson);
  if (!valid) {
    const errors = (validateFn.errors || []).map(e =>
      `[${schemaName}] ${e.instancePath || '/'} ${e.message}`
    );
    console.error(`[validateLesson] Validation failed:`, JSON.stringify(errors, null, 2));
    return { valid: false, errors };
  }
  return { valid: true, errors: [] };
}
