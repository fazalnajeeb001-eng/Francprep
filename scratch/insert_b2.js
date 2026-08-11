import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
const b2SnippetPath = path.join(process.cwd(), 'scratch', 'b2_code_snippet.ts');

let schemaCode = fs.readFileSync(examSchemaPath, 'utf8');
const b2Code = fs.readFileSync(b2SnippetPath, 'utf8');

const targetAnchor = 'function shuffleOptions(';
if (!schemaCode.includes(targetAnchor)) {
  console.error("❌ Target anchor not found in examSchema.ts!");
  process.exit(1);
}

const parts = schemaCode.split(targetAnchor);
schemaCode = parts[0] + "\n" + b2Code + "\n" + targetAnchor + parts[1];

fs.writeFileSync(examSchemaPath, schemaCode);
console.log("✅ Successfully inserted getB2Propositions into src/lib/examSchema.ts!");
