import * as fs from "fs";

console.log("=== 🛠️ PHASE 4: INTEGRATING READING MASTER BANK & GUIDANCE INTO EXAMSCHEMA.TS ===");

const schemaPath = "src/lib/examSchema.ts";
let content = fs.readFileSync(schemaPath, "utf-8");

const isCRLF = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

// 1. Add imports at the top
const oldImports = `import { getQuestionGuidance } from "./practiceGuidanceBank";`;
const newImports = `import { getQuestionGuidance } from "./practiceGuidanceBank";
import { getReadingPaperItems } from "./authenticReadingMasterBank";
import { getReadingGuidance } from "./readingGuidanceBank";`;

if (!content.includes(oldImports)) {
  console.error("oldImports not found");
  process.exit(1);
}
content = content.replace(oldImports, newImports);

// 2. Add readingCoach and readingCoachEn to interface ExamQuestion
const oldInterface = `  audioCoach?: string;
  audioCoachEn?: string;`;
const newInterface = `  audioCoach?: string;
  audioCoachEn?: string;
  readingCoach?: string;
  readingCoachEn?: string;`;

content = content.replace(oldInterface, newInterface);

// 3. Replace generateReadingQuestions implementation
const oldFuncStart = "export function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {";
const oldFuncEnd = "  return qList;\n}";

const startIdx = content.indexOf(oldFuncStart);
if (startIdx === -1) {
  console.error("oldFuncStart not found");
  process.exit(1);
}

const endIdx = content.indexOf(oldFuncEnd, startIdx);
if (endIdx === -1) {
  console.error("oldFuncEnd not found");
  process.exit(1);
}

const newReadingFunc = `export function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];

  const paperNumMatch = prefix.match(/\\d+/);
  const paperNum = paperNumMatch ? parseInt(paperNumMatch[0], 10) : ((seedOffset % 10) + 1);

  const paperItems = getReadingPaperItems(paperNum);

  for (let i = 1; i <= count; i++) {
    const item = paperItems[i - 1] || paperItems[(i - 1) % paperItems.length];
    const seed = seedOffset * 100 + i;

    const { options, correctIndex, correctText, optionsEnglish: shuffledOptionsEn } = shuffleOptions(
      item.opt,
      item.ans,
      seed,
      undefined,
      item.optEn
    );

    const guidance = getReadingGuidance(paperNum, i);

    qList.push({
      id: \`\${prefix}-read-\${i}\`,
      questionNumber: i,
      level: item.level,
      passage: item.text,
      passageEnglish: item.passEn,
      questionPrompt: item.q,
      questionPromptEnglish: item.qEn,
      text: \`Question \${i} : \${item.q}\`,
      options,
      optionsEnglish: shuffledOptionsEn || item.optEn,
      correctIndex,
      explanation: guidance.detailedExplanation,
      hint: guidance.readingCoach,
      trapAlert: guidance.trapAlert,
      trapAlertEn: guidance.trapAlertEn,
      readingCoach: guidance.readingCoach,
      readingCoachEn: guidance.readingCoachEn
    });
  }
  return qList;
}`;

const before = content.substring(0, startIdx);
const after = content.substring(endIdx + oldFuncEnd.length);

content = before + newReadingFunc + after;

if (isCRLF) {
  content = content.replace(/\n/g, "\r\n");
}

fs.writeFileSync(schemaPath, content, "utf-8");
console.log("✅ Successfully integrated Reading Master Bank & Guidance into generateReadingQuestions!");
