import { generateListeningQuestions } from "../src/lib/examSchema";
import { getHdIllustration } from "../src/lib/hdIllustrationAssets";

console.log("=== 🔬 360-DEGREE AUDIT OF ALL 40 VISUAL ITEMS (P1 TO P10) ===");

for (let p = 1; p <= 10; p++) {
  console.log(`\n================== 📄 PAPER ${p} VISUAL QUESTIONS (Q1-Q4) ==================`);
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);

  for (let qNum = 1; qNum <= 4; qNum++) {
    const q = qs[qNum - 1];
    const imgKey = `tcf_p${p}_q${qNum}`;
    const imgAsset = getHdIllustration(imgKey);

    console.log(`\n--- [Paper ${p} - Question ${qNum}] (ID: ${q.id}) ---`);
    console.log(`🖼️ Image Key: ${imgKey}`);
    console.log(`🖼️ Image Asset URL:`, imgAsset);
    console.log(`📝 Question Prompt:`, q.text);
    console.log(`🎯 Correct Option Index:`, q.correctIndex);
    console.log(`🇫🇷 Options:`, q.options);
    console.log(`🇬🇧 English Options:`, q.optionsEnglish);
    console.log(`🎙️ Audio Transcript:`, q.transcript);
    console.log(`🌐 Transcript English:`, q.transcriptEnglish);
  }
}
