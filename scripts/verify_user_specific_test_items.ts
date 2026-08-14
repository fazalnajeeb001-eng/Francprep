import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 VERIFYING USER-SPECIFIC CRITICAL ITEMS ===");

const targetItems = [5, 9, 15, 34, 37];

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  console.log(`\n============================ 📄 PAPER ${p} ============================`);

  targetItems.forEach(itemNum => {
    const q = questions.find(x => x.questionNumber === itemNum);
    if (!q) return;

    console.log(`\n--- 📌 ITEM ${itemNum} (${q.id}) [Level ${q.level}] ---`);
    console.log(`🇫🇷 Question FR: ${q.questionPrompt}`);
    console.log(`🇬🇧 Question EN: ${q.questionPromptEnglish}`);
    console.log(`🇬🇧 English Spoken Transcript:\n"""\n${q.transcriptEnglish}\n"""`);
    console.log(`🇬🇧 English Options:`);
    q.optionsEnglish?.forEach((opt, idx) => {
      console.log(`   [${String.fromCharCode(65 + idx)}] ${opt}`);
    });
  });
}
