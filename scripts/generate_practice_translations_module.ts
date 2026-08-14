import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";
import { translateOptionToEnglish } from "../src/lib/examSchema";
import { translateFrenchQuestionPrompt } from "./generate_100_percent_practice_translations";

console.log("=== 🛠️ CREATING COMPLETE PRACTICE LISTENING TRANSLATIONS MODULE ===");

interface TranslationEntry {
  id: string;
  paperNum: number;
  questionNumber: number;
  level: string;
  passageEnglish: string;
  questionPromptEnglish: string;
  optionsEnglish: [string, string, string, string];
  transcriptEnglish: string;
}

const translationsMap: Record<string, TranslationEntry> = {};

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    const qNum = q.questionNumber;
    const itemLevel = (q as any).level || (qNum <= 4 ? "A1" : qNum <= 10 ? "A1" : qNum <= 15 ? "A2" : qNum <= 25 ? "B1" : qNum <= 33 ? "B2" : "C1");
    const frenchPrompt = q.text || (q as any).questionPrompt || "";
    const promptEn = translateFrenchQuestionPrompt(frenchPrompt);

    // 1. Options translations
    const optsEn: [string, string, string, string] = [
      translateOptionToEnglish(q.options[0]) || q.options[0],
      translateOptionToEnglish(q.options[1]) || q.options[1],
      translateOptionToEnglish(q.options[2]) || q.options[2],
      translateOptionToEnglish(q.options[3]) || q.options[3]
    ];

    // 2. Passage translation
    let passageEn = (q as any).passageEnglish || "";
    let fullTranscriptEn = (q as any).transcriptEnglish || "";

    // Clean transcriptEnglish from any leaked French question prompts
    if (fullTranscriptEn.includes("Question N°") && fullTranscriptEn.includes(" : ")) {
      fullTranscriptEn = fullTranscriptEn.replace(/Question N°\d+\s*:\s*([^.\n]+)/, `Question N°${qNum}: ${promptEn}`);
    }

    translationsMap[q.id] = {
      id: q.id,
      paperNum: p,
      questionNumber: qNum,
      level: itemLevel,
      passageEnglish: passageEn,
      questionPromptEnglish: promptEn,
      optionsEnglish: optsEn,
      transcriptEnglish: fullTranscriptEn
    };
  });
}

console.log(`Generated translation entries for ${Object.keys(translationsMap).length} questions.`);
fs.writeFileSync("scratch/practice_translations_built.json", JSON.stringify(translationsMap, null, 2));
console.log("Saved to scratch/practice_translations_built.json");
