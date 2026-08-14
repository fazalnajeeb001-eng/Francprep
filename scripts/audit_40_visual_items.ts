import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 AUDITING ALL 40 VISUAL ITEMS (Q1-Q4 ACROSS 10 PAPERS) ===");

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
  const visualQs = questions.filter(q => q.questionNumber <= 4);

  console.log(`\n================== 📄 PAPER ${p} ==================`);
  visualQs.forEach(q => {
    const imgKey = `tcf_p${p}_q${q.questionNumber}`;
    const imgPath = `public/illustrations/${imgKey}.png`;
    const imgExists = fs.existsSync(imgPath);
    console.log(`\n[Paper ${p} - Q${q.questionNumber}]`);
    console.log(`🖼️ Image: ${imgPath} (Exists: ${imgExists})`);
    console.log(`📝 Correct Index: ${q.correctIndex} (Option ${String.fromCharCode(65 + q.correctIndex)})`);
    console.log(`🎯 Correct Text: "${q.options[q.correctIndex]}"`);
    console.log(`📋 All Options:`);
    q.options.forEach((opt, idx) => {
      const isCorrect = idx === q.correctIndex ? "✅" : "❌";
      console.log(`   ${String.fromCharCode(65 + idx)}: ${isCorrect} "${opt}"`);
    });
  });
}
