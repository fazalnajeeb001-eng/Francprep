import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 AUDITING ALL 390 LISTENING QUESTIONS FOR DUAL-VOICE SPEAKER LABELS ===");

let untaggedQuestions = 0;
let taggedDualVoiceQuestions = 0;

for (let p = 1; p <= 10; p++) {
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);

  qs.forEach(q => {
    const transcript = q.transcript || "";
    const lines = transcript.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    const hasColonInLines = lines.some(l => l.includes(":"));
    const hasAnnonceur = /annonceur|annonceuse/i.test(transcript);
    const hasLocuteur = /locuteur|locutrice/i.test(transcript);

    if (q.questionNumber <= 29 && (!hasAnnonceur || !hasLocuteur)) {
      console.log(`[P${p}Q${q.questionNumber}] MISSING DUAL-VOICE TAGS! Transcript start: "${transcript.substring(0, 60)}..."`);
      untaggedQuestions++;
    } else if (q.questionNumber >= 30 && !hasColonInLines) {
      console.log(`[P${p}Q${q.questionNumber} (C1/C2)] Untagged C1/C2 passage: "${transcript.substring(0, 60)}..."`);
      untaggedQuestions++;
    } else {
      taggedDualVoiceQuestions++;
    }
  });
}

console.log("\n==================== 📊 AUDIT RESULTS ====================");
console.log(`- Dual-Voice Tagged Questions: ${taggedDualVoiceQuestions} / 390 (${((taggedDualVoiceQuestions / 390) * 100).toFixed(1)}%)`);
console.log(`- Untagged Questions: ${untaggedQuestions} / 390`);
