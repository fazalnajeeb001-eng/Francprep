import { generateListeningQuestions } from "../src/lib/examSchema.ts";

console.log("=== 🖼️ Testing HD PNG Image Resolution & Placeholder Card Mapping ===");

for (let paperIdx = 1; paperIdx <= 10; paperIdx++) {
  const isPractice = paperIdx <= 5;
  const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);
  const questions = generateListeningQuestions(4, `tcf${paperIdx}`, seedOffset);

  console.log(`\n--- Paper ${paperIdx} (Prefix: tcf${paperIdx}) ---`);
  questions.forEach((q) => {
    if (q.mainImage) {
      console.log(`  ✅ Q${q.questionNumber}: Displays HD Image => ${q.mainImage}`);
    } else {
      console.log(`  🎨 Q${q.questionNumber}: Displays HD Pending Card => "Illustration HD en cours de création"`);
    }
  });
}
