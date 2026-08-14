import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

console.log("=== 🔍 COLLECTING ALL UNIQUE OPTIONS ACROSS ALL 10 PAPERS (390 QUESTIONS) ===");

const uniqueOptions = new Set<string>();

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach(q => {
    q.options.forEach(opt => {
      if (opt && opt.trim()) uniqueOptions.add(opt.trim());
    });
  });
}

const optionList = Array.from(uniqueOptions).sort();
console.log(`Total unique options across all 390 listening questions: ${optionList.length}`);

fs.writeFileSync("scratch/all_390_unique_options.json", JSON.stringify(optionList, null, 2));
