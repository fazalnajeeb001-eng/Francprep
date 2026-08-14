import * as fs from "fs";
import { MASTER_40_VISUAL_ITEMS } from "./build_50_50_visual_bank";

// 1. Update masterOptionsDictionary.ts
const dictPath = "src/lib/masterOptionsDictionary.ts";
let dictContent = fs.readFileSync(dictPath, "utf-8");

const newEntries: Record<string, string> = {};
MASTER_40_VISUAL_ITEMS.forEach(item => {
  item.options.forEach((opt, idx) => {
    newEntries[opt] = item.optionsEnglish[idx];
  });
});

let entriesCode = "\n  // Visual Items 50/50 Calibration (Speech Acts & Scene Descriptions)\n";
for (const [fr, en] of Object.entries(newEntries)) {
  entriesCode += `  ${JSON.stringify(fr)}: ${JSON.stringify(en)},\n`;
}

// Insert before closing of MASTER_OPTIONS_DICTIONARY
const closingIdx = dictContent.lastIndexOf("};");
if (closingIdx !== -1) {
  dictContent = dictContent.substring(0, closingIdx) + entriesCode + dictContent.substring(closingIdx);
  fs.writeFileSync(dictPath, dictContent, "utf-8");
  console.log(`✅ Added ${Object.keys(newEntries).length} visual translations to masterOptionsDictionary.ts`);
}

// 2. Update shuffleOptions in examSchema.ts
const schemaPath = "src/lib/examSchema.ts";
let schemaContent = fs.readFileSync(schemaPath, "utf-8");

const oldShuffle = `function shuffleOptions(
  options: string[],
  correctIndex: number,
  seed: number = 0,
  optionImages?: string[]
): { options: string[]; correctIndex: number; correctText: string; optionImages?: string[] } {
  const originalCorrectText = options[correctIndex] || options[0] || "";
  const indexed = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex, img: optionImages?.[idx] }));

  // Deterministic pseudo-random shuffle based on seed
  for (let i = indexed.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i * 997) * 10000);
    const j = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * (i + 1));
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  const shuffledOptions = indexed.map((item) => item.opt);
  const newCorrectIndex = indexed.findIndex((item) => item.isCorrect);
  const shuffledImages = optionImages ? indexed.map((item) => item.img || "") : undefined;

  return {
    options: shuffledOptions,
    correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
    correctText: originalCorrectText,
    optionImages: shuffledImages
  };
}`;

const newShuffle = `function shuffleOptions(
  options: string[],
  correctIndex: number,
  seed: number = 0,
  optionImages?: string[],
  optionsEnglish?: string[]
): { options: string[]; correctIndex: number; correctText: string; optionImages?: string[]; optionsEnglish?: string[] } {
  const originalCorrectText = options[correctIndex] || options[0] || "";
  const indexed = options.map((opt, idx) => ({
    opt,
    isCorrect: idx === correctIndex,
    img: optionImages?.[idx],
    optEn: optionsEnglish?.[idx]
  }));

  // Deterministic pseudo-random shuffle based on seed
  for (let i = indexed.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i * 997) * 10000);
    const j = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * (i + 1));
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  const shuffledOptions = indexed.map((item) => item.opt);
  const newCorrectIndex = indexed.findIndex((item) => item.isCorrect);
  const shuffledImages = optionImages ? indexed.map((item) => item.img || "") : undefined;
  const shuffledEn = optionsEnglish ? indexed.map((item) => item.optEn || "") : undefined;

  return {
    options: shuffledOptions,
    correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
    correctText: originalCorrectText,
    optionImages: shuffledImages,
    optionsEnglish: shuffledEn
  };
}`;

if (schemaContent.includes(oldShuffle)) {
  schemaContent = schemaContent.replace(oldShuffle, newShuffle);
}

// Ensure generateListeningQuestions sets props.optEn and passes optionsEnglish
schemaContent = schemaContent.replace(
  `      topicOpt = props.opt;
      topicAns = props.ans;`,
  `      topicOpt = props.opt;
      topicAns = props.ans;
      t = { ...t, optionsEnglish: props.optEn };`
);

schemaContent = schemaContent.replace(
  `const { options, correctIndex, correctText, optionImages } = shuffleOptions(topicOpt, topicAns, seed, rawImages);`,
  `const { options, correctIndex, correctText, optionImages, optionsEnglish: shuffledOptionsEn } = shuffleOptions(topicOpt, topicAns, seed, rawImages, (t as any).optionsEnglish);`
);

schemaContent = schemaContent.replace(
  `const optionsEn0 = (t as any).optionsEnglish?.[0] || translateOptionToEnglish(options[0]);
    const optionsEn1 = (t as any).optionsEnglish?.[1] || translateOptionToEnglish(options[1]);
    const optionsEn2 = (t as any).optionsEnglish?.[2] || translateOptionToEnglish(options[2]);
    const optionsEn3 = (t as any).optionsEnglish?.[3] || translateOptionToEnglish(options[3]);`,
  `const optionsEn0 = shuffledOptionsEn?.[0] || (t as any).optionsEnglish?.[0] || translateOptionToEnglish(options[0]);
    const optionsEn1 = shuffledOptionsEn?.[1] || (t as any).optionsEnglish?.[1] || translateOptionToEnglish(options[1]);
    const optionsEn2 = shuffledOptionsEn?.[2] || (t as any).optionsEnglish?.[2] || translateOptionToEnglish(options[2]);
    const optionsEn3 = shuffledOptionsEn?.[3] || (t as any).optionsEnglish?.[3] || translateOptionToEnglish(options[3]);`
);

fs.writeFileSync(schemaPath, schemaContent, "utf-8");
console.log("✅ Successfully updated examSchema.ts with synchronized 50/50 visual translations!");
