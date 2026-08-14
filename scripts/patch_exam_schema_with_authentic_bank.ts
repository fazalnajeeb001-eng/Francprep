import * as fs from "fs";

console.log("=== 🛠️ PATCHING examSchema.ts WITH AUTHENTIC ADVANCED LISTENING BANK ===");

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

// 1. Add import at the top
if (!content.includes('import { getAuthenticB2Item, getAuthenticC1C2Item } from "./authenticListeningAdvancedBank";')) {
  content = content.replace(
    'import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";',
    'import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";\nimport { getAuthenticB2Item, getAuthenticC1C2Item } from "./authenticListeningAdvancedBank";'
  );
}

// 2. Find and replace getB2Propositions and getC1C2Propositions
const startIdx = content.indexOf("function getB2Propositions(sceneIdx: number)");
const endIdx = content.indexOf("function shuffleOptions(");

if (startIdx === -1 || endIdx === -1) {
  console.error("❌ Could not find boundaries for getB2Propositions / getC1C2Propositions");
  process.exit(1);
}

const replacementFunctions = `export function getB2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
  optionsEnglish?: string[];
  questionPromptEnglish?: string;
} {
  const item = getAuthenticB2Item(sceneIdx);
  return {
    opt: [...item.optionsFr],
    ans: item.ans,
    title: item.title,
    text: item.qFr,
    q: item.qFr,
    tr: item.audioFr,
    en: item.audioEn,
    hint: item.hint,
    level: item.level,
    optionsEnglish: [...item.optionsEn],
    questionPromptEnglish: item.qEn
  };
}

export function getC1C2Propositions(sceneIdx: number): {
  opt: string[];
  ans: number;
  title: string;
  text: string;
  q: string;
  tr: string;
  en: string;
  hint: string;
  level: string;
  optionsEnglish?: string[];
  questionPromptEnglish?: string;
} {
  const item = getAuthenticC1C2Item(sceneIdx);
  return {
    opt: [...item.optionsFr],
    ans: item.ans,
    title: item.title,
    text: item.qFr,
    q: item.qFr,
    tr: item.audioFr,
    en: item.audioEn,
    hint: item.hint,
    level: item.level,
    optionsEnglish: [...item.optionsEn],
    questionPromptEnglish: item.qEn
  };
}

`;

const before = content.slice(0, startIdx);
const after = content.slice(endIdx);

content = before + replacementFunctions + after;

fs.writeFileSync(filePath, content);
console.log("✅ Successfully replaced legacy getB2Propositions & getC1C2Propositions with authentic advanced bank!");
