import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 INSPECTING PRACTICE MODE GUIDANCE (HINTS & EXPLANATIONS) ===");

for (let p = 1; p <= 3; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  console.log(`\n================== 📄 PAPER ${p} ==================`);
  [1, 5, 9, 16, 26, 34, 37].forEach(qNum => {
    const q = questions.find(x => x.questionNumber === qNum);
    if (!q) return;
    console.log(`\n--- Q${qNum} (Level ${q.level}) ---`);
    console.log(`💡 Hint: ${q.hint}`);
    console.log(`📖 Explanation: ${q.explanation}`);
  });
}
