import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

console.log("=== 🔍 COLLECTING ALL UNIQUE QUESTION PROMPTS ACROSS ALL 10 PAPERS ===");

const uniquePrompts = new Set<string>();

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach(q => {
    if (q.questionPrompt) uniquePrompts.add(q.questionPrompt.trim());
    if (q.text) uniquePrompts.add(q.text.trim());
  });
}

const promptList = Array.from(uniquePrompts).sort();
console.log(`Found ${promptList.length} unique question prompts across all 390 questions.`);

fs.writeFileSync("scratch/all_unique_prompts.json", JSON.stringify(promptList, null, 2));

promptList.forEach((pr, idx) => {
  console.log(`${idx + 1}. "${pr}"`);
});
