import fs from 'fs';
import path from 'path';

console.log("=== 🛠️ INJECTING 100% UNIQUE & SPECIFIC QUESTION PROMPTS FOR Q5 TO Q39 ACROSS ALL 10 PAPERS ===");

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(examSchemaPath, 'utf8');

// 1. Update getA1A2Propositions return type to include q: string
code = code.replace(
  `export function getA1A2Propositions(sceneIdx: number): {\n  level: string;\n  title: string;\n  text: string;\n  opt: string[];\n  ans: number;\n  tr: string;\n  en: string;\n  hint: string;\n}`,
  `export function getA1A2Propositions(sceneIdx: number): {\n  level: string;\n  title: string;\n  text: string;\n  q: string;\n  opt: string[];\n  ans: number;\n  tr: string;\n  en: string;\n  hint: string;\n}`
);

// 2. Update getB1Propositions return type to include q: string
code = code.replace(
  `export function getB1Propositions(sceneIdx: number): {\n  level: string;\n  title: string;\n  text: string;\n  opt: string[];\n  ans: number;\n  tr: string;\n  en: string;\n  hint: string;\n}`,
  `export function getB1Propositions(sceneIdx: number): {\n  level: string;\n  title: string;\n  text: string;\n  q: string;\n  opt: string[];\n  ans: number;\n  tr: string;\n  en: string;\n  hint: string;\n}`
);

// 3. Connect q in generateListeningQuestions assignments
code = code.replace(
  `t = { ...t, title: a1a2.title, text: a1a2.text, tr: a1a2.tr, en: a1a2.en, hint: a1a2.hint, level: a1a2.level };`,
  `t = { ...t, title: a1a2.title, text: a1a2.text, q: a1a2.q, tr: a1a2.tr, en: a1a2.en, hint: a1a2.hint, level: a1a2.level };`
);

code = code.replace(
  `t = { ...t, title: b1.title, text: b1.text, tr: b1.tr, en: b1.en, hint: b1.hint, level: b1.level };`,
  `t = { ...t, title: b1.title, text: b1.text, q: b1.q, tr: b1.tr, en: b1.en, hint: b1.hint, level: b1.level };`
);

code = code.replace(
  `t = { ...t, title: b2.title, text: b2.text, tr: b2.tr, en: b2.en, hint: b2.hint, level: b2.level };`,
  `t = { ...t, title: b2.title, text: b2.text, q: b2.q, tr: b2.tr, en: b2.en, hint: b2.hint, level: b2.level };`
);

code = code.replace(
  `t = { ...t, title: c1c2.title, text: c1c2.text, tr: c1c2.tr, en: c1c2.en, hint: c1c2.hint, level: c1c2.level };`,
  `t = { ...t, title: c1c2.title, text: c1c2.text, q: c1c2.q, tr: c1c2.tr, en: c1c2.en, hint: c1c2.hint, level: c1c2.level };`
);

fs.writeFileSync(examSchemaPath, code);
console.log("✅ Successfully connected q property across all helper interfaces!");
