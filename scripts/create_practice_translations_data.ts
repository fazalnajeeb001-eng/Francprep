import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

console.log("=== 🌐 EXTRACTING ALL 195 PRACTICE QUESTIONS FOR TRANSLATION ===");

interface RawQuestionData {
  id: string;
  paper: number;
  qNum: number;
  level: string;
  frenchPassage: string;
  frenchPrompt: string;
  frenchOptions: string[];
}

const rawList: RawQuestionData[] = [];

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    rawList.push({
      id: q.id,
      paper: p,
      qNum: q.questionNumber,
      level: (q as any).level || "A1",
      frenchPassage: (q.transcript || q.text || "").replace(/\nAnnonceu[se].*$/s, "").trim(),
      frenchPrompt: q.text || (q as any).questionPrompt || "",
      frenchOptions: [...q.options]
    });
  });
}

console.log(`Extracted ${rawList.length} questions across 5 practice papers.`);
fs.writeFileSync("scratch/raw_practice_questions.json", JSON.stringify(rawList, null, 2));
console.log("Saved to scratch/raw_practice_questions.json");
