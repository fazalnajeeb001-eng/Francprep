import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 INSPECTING PAPERS 1 TO 6 VISUAL QUESTIONS & SCRIPTS ===");

for (let p = 1; p <= 6; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
  const visualQs = questions.filter(q => q.questionNumber <= 4);

  console.log(`\n================== 📄 PAPER ${p} ==================`);
  visualQs.forEach(q => {
    console.log(`\n[Paper ${p} - Q${q.questionNumber}]`);
    console.log(`🖼️ Image: public/illustrations/tcf_p${p}_q${q.questionNumber}.png`);
    console.log(`🎙️ Spoken Script: \n${q.transcript}`);
    console.log(`🎯 Correct Option (${String.fromCharCode(65 + q.correctIndex)}): "${q.options[q.correctIndex]}"`);
    console.log(`🌐 English Translation:\n${q.transcriptEnglish}`);
  });
}
