import { generateListeningQuestions } from "../src/lib/examSchema";
import { getHdIllustration } from "../src/lib/hdIllustrationAssets";

console.log("=== 🔬 INSPECTING PAPERS 1, 2, 3 VISUAL QUESTIONS ===");

for (let p = 1; p <= 3; p++) {
  console.log(`\n================== 📄 PAPER ${p} ==================`);
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);

  for (let qNum = 1; qNum <= 4; qNum++) {
    const q = qs[qNum - 1];
    const imgKey = `tcf_p${p}_q${qNum}`;
    const imgAsset = getHdIllustration(imgKey);

    console.log(`\n[Paper ${p} - Q${qNum}]`);
    console.log(`Image Key: ${imgKey}`);
    console.log(`Image Asset:`, imgAsset);
    console.log(`Transcript:`, q.transcript);
    console.log(`Options:`, q.options);
    console.log(`Correct Index:`, q.correctIndex);
    console.log(`Correct Option Text:`, q.options[q.correctIndex]);
  }
}
