import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
const b2SnippetPath = path.join(process.cwd(), 'scratch', 'b2_code_snippet.ts');

let schemaCode = fs.readFileSync(examSchemaPath, 'utf8');
const b2Code = fs.readFileSync(b2SnippetPath, 'utf8');

// Find all occurrences of getB2Propositions and clean them
const regex = /function getB2Propositions[\s\S]*?(?=function shuffleOptions)/g;
schemaCode = schemaCode.replace(regex, b2Code + "\n\n");

fs.writeFileSync(examSchemaPath, schemaCode);
console.log("✅ Successfully deduped getB2Propositions in src/lib/examSchema.ts!");
