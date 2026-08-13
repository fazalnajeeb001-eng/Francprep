import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function auditAudioLengthsAndRates() {
  console.log("=========================================================================");
  console.log("🎧 DEEP AUDIT: AUDIO LENGTHS, WORD COUNTS & SPEECH RATES (390 QUESTIONS)");
  console.log("=========================================================================\n");

  const bandStats: Record<string, { count: number; totalWords: number; minWords: number; maxWords: number; rates: number[] }> = {
    "Q1-Q4 (A1 Visual)": { count: 0, totalWords: 0, minWords: Infinity, maxWords: -Infinity, rates: [] },
    "Q5-Q15 (A1-A2 Voicemail)": { count: 0, totalWords: 0, minWords: Infinity, maxWords: -Infinity, rates: [] },
    "Q16-Q25 (B1 News/Radio)": { count: 0, totalWords: 0, minWords: Infinity, maxWords: -Infinity, rates: [] },
    "Q26-Q33 (B2 Debates)": { count: 0, totalWords: 0, minWords: Infinity, maxWords: -Infinity, rates: [] },
    "Q34-Q39 (C1-C2 Academic)": { count: 0, totalWords: 0, minWords: Infinity, maxWords: -Infinity, rates: [] },
  };

  let totalEvaluated = 0;
  const shortPassageWarnings: { paper: number; qNum: number; words: number; text: string }[] = [];

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalEvaluated++;
      const qNum = q.questionNumber;
      const rate = (q as any).speakingRate || 1.0;

      // Extract spoken passage text (excluding announcer lines)
      const transcript = q.transcript || "";
      const passageMatch = transcript.match(/Locut(?:eur|rice):\s*([^\n]+)/i);
      const passageText = passageMatch ? passageMatch[1] : transcript;
      const wordCount = passageText.trim().split(/\s+/).filter(Boolean).length;

      let bandKey = "Q1-Q4 (A1 Visual)";
      if (qNum >= 5 && qNum <= 15) bandKey = "Q5-Q15 (A1-A2 Voicemail)";
      else if (qNum >= 16 && qNum <= 25) bandKey = "Q16-Q25 (B1 News/Radio)";
      else if (qNum >= 26 && qNum <= 33) bandKey = "Q26-Q33 (B2 Debates)";
      else if (qNum >= 34) bandKey = "Q34-Q39 (C1-C2 Academic)";

      const stat = bandStats[bandKey];
      stat.count++;
      stat.totalWords += wordCount;
      if (wordCount < stat.minWords) stat.minWords = wordCount;
      if (wordCount > stat.maxWords) stat.maxWords = wordCount;
      if (!stat.rates.includes(rate)) stat.rates.push(rate);

      // Check for unnaturally short passages in B1, B2, C1, C2
      if (qNum >= 16 && wordCount < 35) {
        if (shortPassageWarnings.length < 5) {
          shortPassageWarnings.push({ paper: p, qNum, words: wordCount, text: passageText });
        }
      }
    });
  }

  console.log("=========================================================================");
  console.log("📊 AUDIO LENGTH & SPEECH RATE AUDIT RESULTS");
  console.log("=========================================================================");
  Object.entries(bandStats).forEach(([band, stat]) => {
    const avgWords = (stat.totalWords / stat.count).toFixed(1);
    console.log(`\n📌 ${band}`);
    console.log(`   - Question Count:    ${stat.count}`);
    console.log(`   - Average Words:     ${avgWords} words`);
    console.log(`   - Word Range:        ${stat.minWords} to ${stat.maxWords} words`);
    console.log(`   - Speech Rate Multiplier: ${stat.rates.join(", ")}x`);
  });
  console.log("=========================================================================\n");

  if (shortPassageWarnings.length > 0) {
    console.log("⚠️ Sample Unnaturally Short Passages Found (< 35 words for B1/B2/C1):");
    shortPassageWarnings.forEach((w, idx) => {
      console.log(`  ${idx + 1}. [Paper ${w.paper} Q${w.qNum}] (${w.words} words): "${w.text}"`);
    });
  }
}

auditAudioLengthsAndRates();
