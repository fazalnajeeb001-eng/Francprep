import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 DETAILED AUDIT OF B1 ITEMS IN ALL 10 PAPERS ===");

const b1List: any[] = [];

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    if (q.questionNumber >= 16 && q.questionNumber <= 25) {
      b1List.push({
        paper: p,
        qNum: q.questionNumber,
        level: "B1",
        transcript: q.transcript,
        options: q.options,
        correctIndex: q.correctIndex
      });
    }
  });
}

console.log(`Total B1 items found across 10 papers: ${b1List.length}`);
fs.writeFileSync("scratch/b1_all_items.json", JSON.stringify(b1List, null, 2));
