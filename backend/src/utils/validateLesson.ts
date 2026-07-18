import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs';
import * as path from 'path';

// Load the schema JSON at module init time
const schemaPath = path.resolve(__dirname, '..', 'schemas', 'lesson.schema.json');
const lessonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(lessonSchema);

export function validateLesson(lesson: unknown): { valid: boolean; errors: string[] } {
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
