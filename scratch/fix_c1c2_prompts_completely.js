import fs from 'fs';
import path from 'path';

console.log("=== 🛠️ CLEANING C1/C2 LECTURE PROMPTS & STRIPPING (QXX) SUFFIXES ===");

const schemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(schemaPath, 'utf8');

// Strip all (Q34), (Q35)... (Q39) from getC1C2Propositions text properties
code = code.replace(/text:\s*"Quelle est la thèse centrale développée par le conférencier lors de cette présentation \([^)]+\) \?"/g, 'text: "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?"');

fs.writeFileSync(schemaPath, code);
console.log("✅ Successfully cleaned C1/C2 lecture prompts across all 60 items!");
