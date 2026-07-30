const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Load the schema JSON at module init time
let schemaPath = path.resolve(__dirname, '..', 'schemas', 'lesson.schema.json');
if (!fs.existsSync(schemaPath)) {
  // If in dist/ (production), try to go up to src/
  schemaPath = path.resolve(__dirname, '..', '..', '..', 'src', 'schemas', 'lesson.schema.json');
}
if (!fs.existsSync(schemaPath)) {
  // Try process.cwd() fallback
  schemaPath = path.resolve(process.cwd(), 'src', 'schemas', 'lesson.schema.json');
}
const lessonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(lessonSchema);

function validateLesson(lesson) {
  if (!lesson || typeof lesson !== 'object') {
    return { valid: false, errors: ['Invalid lesson object'] };
  }
  const cleanData = JSON.parse(JSON.stringify(lesson));
  const ignoredKeys = [
    '_id', '__v', 'createdAt', 'updatedAt', 'parsedAt', 'validationErrors',
    'validationWarnings', 'schemaErrors', 'qualityWarnings', 'isPublished',
    'status', 'origin', 'version', 'createdBy', 'sections', 'rawMarkdown'
  ];
  for (const k of ignoredKeys) {
    delete cleanData[k];
  }
  if (typeof cleanData.chapterId === 'number') {
    cleanData.chapterId = String(cleanData.chapterId);
  }
  if (cleanData.vocabItems && (!cleanData.vocabulary || cleanData.vocabulary.length === 0)) {
    cleanData.vocabulary = cleanData.vocabItems;
    delete cleanData.vocabItems;
  }

  const valid = validate(cleanData);
  if (!valid && validate.errors) {
    const errors = validate.errors
      .filter(e => e.keyword !== 'additionalProperties')
      .map(e => `${e.instancePath || '/'} ${e.message}`);
    if (errors.length > 0) {
      console.error(`[validateLesson] Validation failed:`, JSON.stringify(errors, null, 2));
      return { valid: false, errors };
    }
  }
  return { valid: true, errors: [] };
}

module.exports = { validateLesson };
