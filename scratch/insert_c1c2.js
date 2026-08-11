import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
const c1c2SnippetPath = path.join(process.cwd(), 'scratch', 'c1c2_code_snippet.ts');

let schemaCode = fs.readFileSync(examSchemaPath, 'utf8');
const c1c2Code = fs.readFileSync(c1c2SnippetPath, 'utf8');

// Insert getC1C2Propositions before shuffleOptions
const anchor = 'function shuffleOptions(';
if (!schemaCode.includes(anchor)) {
  console.error("❌ Anchor 'function shuffleOptions(' not found!");
  process.exit(1);
}

// Remove any existing getC1C2Propositions to prevent duplicate declarations
const existingReg = /function getC1C2Propositions[\s\S]*?(?=function shuffleOptions)/g;
schemaCode = schemaCode.replace(existingReg, '');

const parts = schemaCode.split(anchor);
schemaCode = parts[0] + "\n" + c1c2Code + "\n\n" + anchor + parts[1];

// Now connect the branch inside generateListeningQuestions
const targetBranch = `    } else if (i >= 26 && i <= 33) {
      const paperNumMatch = prefix.match(/\\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const b2Idx = (paperIdx * 8) + (i - 26);
      const b2 = getB2Propositions(b2Idx);
      topicOpt = b2.opt;
      topicAns = b2.ans;
      t = { ...t, title: b2.title, text: b2.text, tr: b2.tr, en: b2.en, hint: b2.hint, level: b2.level };
    }`;

const replacementBranch = targetBranch + ` else if (i >= 34 && i <= 39) {
      const paperNumMatch = prefix.match(/\\d+/);
      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);
      const c1c2Idx = (paperIdx * 6) + (i - 34);
      const c1c2 = getC1C2Propositions(c1c2Idx);
      topicOpt = c1c2.opt;
      topicAns = c1c2.ans;
      t = { ...t, title: c1c2.title, text: c1c2.text, tr: c1c2.tr, en: c1c2.en, hint: c1c2.hint, level: c1c2.level };
    }`;

if (schemaCode.includes(targetBranch)) {
  schemaCode = schemaCode.replace(targetBranch, replacementBranch);
} else {
  const targetBranchCRLF = targetBranch.replace(/\n/g, '\r\n');
  const replacementBranchCRLF = replacementBranch.replace(/\n/g, '\r\n');
  if (schemaCode.includes(targetBranchCRLF)) {
    schemaCode = schemaCode.replace(targetBranchCRLF, replacementBranchCRLF);
  } else {
    console.error("❌ targetBranch not found in examSchema.ts!");
    process.exit(1);
  }
}

fs.writeFileSync(examSchemaPath, schemaCode);
console.log("✅ Successfully inserted getC1C2Propositions and connected branch in src/lib/examSchema.ts!");
