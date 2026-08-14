import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 DETAILED AUDIT OF B2 & C1/C2 ITEMS IN ALL 10 PAPERS ===");

const b2List: any[] = [];
const c1c2List: any[] = [];

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    if (q.questionNumber >= 26 && q.questionNumber <= 33) {
      b2List.push({
        paper: p,
        qNum: q.questionNumber,
        level: "B2",
        transcript: q.transcript,
        options: q.options,
        correctIndex: q.correctIndex
      });
    } else if (q.questionNumber >= 34 && q.questionNumber <= 39) {
      c1c2List.push({
        paper: p,
        qNum: q.questionNumber,
        level: (q as any).level || "C1",
        transcript: q.transcript,
        options: q.options,
        correctIndex: q.correctIndex
      });
    }
  });
}

console.log(`Total B2 items found across 10 papers: ${b2List.length}`);
console.log(`Total C1/C2 items found across 10 papers: ${c1c2List.length}`);

fs.writeFileSync("scratch/b2_all_items.json", JSON.stringify(b2List, null, 2));
fs.writeFileSync("scratch/c1c2_all_items.json", JSON.stringify(c1c2List, null, 2));
