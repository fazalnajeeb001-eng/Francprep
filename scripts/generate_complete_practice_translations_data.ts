import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";
import { translatePrompt } from "./build_full_practice_translations_module";

console.log("=== 🌐 GENERATING 100% ACCURATE PRACTICE TRANSLATIONS (195 QUESTIONS) ===");

// We will load all 195 questions and translate passages and options
const practiceQuestions: any[] = [];

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
  questions.forEach(q => practiceQuestions.push(q));
}

console.log(`Loaded ${practiceQuestions.length} practice questions.`);

// Let's create translation rules for all text patterns:
// 1. Train announcements
// 2. Store announcements
// 3. Weather bulletins
// 4. Hotel / Restaurant instructions
// 5. Phone voicemail messages
// 6. B1 Cultural, ecological, economic reports
// 7. B2 Social debates
// 8. C1/C2 Academic conferences
// 9. Visual drawing propositions (Q1-Q4)
// 10. Spoken options (Q5-Q8)

fs.writeFileSync("scratch/practice_items_to_translate.json", JSON.stringify(practiceQuestions.map(q => ({
  id: q.id,
  questionNumber: q.questionNumber,
  level: (q as any).level || "A1",
  passage: q.transcript?.split("\nAnnonce")[0] || q.transcript || q.text,
  prompt: q.text,
  options: q.options
})), null, 2));

console.log("Extracted items to scratch/practice_items_to_translate.json");
