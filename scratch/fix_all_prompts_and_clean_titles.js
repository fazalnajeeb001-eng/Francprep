import fs from 'fs';
import path from 'path';

console.log("=== 🛠️ CLEANING ALL QUESTION PROMPTS & ELIMINATING TITLE LEAKS ACROSS 390 QUESTIONS ===");

const schemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let schemaCode = fs.readFileSync(schemaPath, 'utf8');

// 1. Update return types of getB2Propositions and getC1C2Propositions to include q: string
schemaCode = schemaCode.replace(
  `function getB2Propositions(sceneIdx: number): {\n  opt: string[];\n  ans: number;\n  title: string;\n  text: string;\n  tr: string;\n  en: string;\n  hint: string;\n  level: string;\n}`,
  `function getB2Propositions(sceneIdx: number): {\n  opt: string[];\n  ans: number;\n  title: string;\n  text: string;\n  q: string;\n  tr: string;\n  en: string;\n  hint: string;\n  level: string;\n}`
);

schemaCode = schemaCode.replace(
  `function getC1C2Propositions(sceneIdx: number): {\n  opt: string[];\n  ans: number;\n  title: string;\n  text: string;\n  tr: string;\n  en: string;\n  hint: string;\n  level: string;\n}`,
  `function getC1C2Propositions(sceneIdx: number): {\n  opt: string[];\n  ans: number;\n  title: string;\n  text: string;\n  q: string;\n  tr: string;\n  en: string;\n  hint: string;\n  level: string;\n}`
);

// 2. Strip out (Q26), (Q27), (Q30)... suffixes from getB2Propositions text properties
schemaCode = schemaCode.replace(/text:\s*"Quelle est la décision ou la mesure prioritaire exposée dans ce débat \([^)]+\) \?"/g, 'text: "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?"');
schemaCode = schemaCode.replace(/text:\s*"Quelle est la thèse centrale développée par le conférencier \([^)]+\) \?"/g, 'text: "Quelle est la thèse centrale développée par le conférencier ?"');

// 3. Ensure generateListeningQuestions NEVER uses title as questionTextPrompt fallback
const oldPromptGen = `let questionTextPrompt = (t as any).q || (t as any).title || "Quel est le message principal de ce document sonore ?";`;
const newPromptGen = `let questionTextPrompt = (t as any).q || (t as any).text || "Quel est le message principal de ce document sonore ?";`;

if (schemaCode.includes(oldPromptGen)) {
  schemaCode = schemaCode.replace(oldPromptGen, newPromptGen);
} else {
  const oldPromptGenCRLF = oldPromptGen.replace(/\n/g, '\r\n');
  const newPromptGenCRLF = newPromptGen.replace(/\n/g, '\r\n');
  if (schemaCode.includes(oldPromptGenCRLF)) {
    schemaCode = schemaCode.replace(oldPromptGenCRLF, newPromptGenCRLF);
  }
}

fs.writeFileSync(schemaPath, schemaCode);
console.log("✅ Successfully updated examSchema.ts to eliminate title leaks and (QXX) suffixes!");
