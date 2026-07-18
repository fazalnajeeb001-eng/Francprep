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
  const valid = validate(lesson);
  if (!valid) {
    const errors = (validate.errors || []).map(e =>
      `${e.instancePath} ${e.message}`
    );
    console.error(`[validateLesson] Validation failed:`, JSON.stringify(errors, null, 2));
    return { valid: false, errors };
  }
  return { valid: true, errors: [] };
}

module.exports = { validateLesson };
