import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import standardSchema from '../schemas/lesson.schema.json';
import integratedSchema from '../schemas/lesson-integrated.schema.json';
import reviewSchema from '../schemas/lesson-review.schema.json';

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
