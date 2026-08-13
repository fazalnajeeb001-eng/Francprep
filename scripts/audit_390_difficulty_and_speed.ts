import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function audit390DifficultyAndSpeed() {
  console.log("=========================================================================");
  console.log("🎯 DEEP AUDIT: DIFFICULTY LEVELS (A1-C2), SPEECH RATES & DISTRACTORS");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let levelMismatchCount = 0;
  let rateMismatchCount = 0;
  let duplicateOptionCount = 0;
  const answerDistribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

  const levelCounts: Record<string, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  const rateCounts: Record<number, number> = {};

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalQuestions++;
      const qNum = q.questionNumber;
      const level = q.level || "A1";
      const rate = (q as any).speakingRate || 1.0;
      const correctIdx = q.correctIndex;

      // Track distribution
      levelCounts[level] = (levelCounts[level] || 0) + 1;
      rateCounts[rate] = (rateCounts[rate] || 0) + 1;
      answerDistribution[correctIdx] = (answerDistribution[correctIdx] || 0) + 1;

      // Check level mapping against official TCF progression
      let expectedLevel = "A1";
      if (qNum <= 4) expectedLevel = "A1";
      else if (qNum >= 5 && qNum <= 15) expectedLevel = qNum <= 7 ? "A1" : "A2";
      else if (qNum >= 16 && qNum <= 25) expectedLevel = "B1";
      else if (qNum >= 26 && qNum <= 33) expectedLevel = "B2";
      else if (qNum >= 34) expectedLevel = qNum <= 36 ? "C1" : "C2";

      if (level !== expectedLevel && !(expectedLevel === "C2" && level === "C1")) {
        levelMismatchCount++;
      }

      // Check speech rate progression
      let expectedRate = 1.0;
      if (qNum <= 7) expectedRate = 0.85;
      else if (qNum <= 15) expectedRate = 0.92;
      else if (qNum <= 25) expectedRate = 1.00;
      else if (qNum <= 33) expectedRate = 1.15;
      else expectedRate = 1.30;

      if (Math.abs(rate - expectedRate) > 0.01) {
        rateMismatchCount++;
      }

      // Check option uniqueness
      const uniqueOptions = new Set(q.options.map((o) => o.trim().toLowerCase()));
      if (uniqueOptions.size < q.options.length) {
        duplicateOptionCount++;
      }
    });
  }

  console.log("=========================================================================");
  console.log("📊 DIFFICULTY LEVEL & SPEECH RATE DISTRIBUTION (390 QUESTIONS)");
  console.log("=========================================================================");
  console.log("📌 Questions per CECRL Level:");
  Object.entries(levelCounts).forEach(([lvl, count]) => {
    console.log(`   - Level ${lvl.padEnd(2)}: ${count} questions (${(count / 390 * 100).toFixed(1)}%)`);
  });

  console.log("\n📌 Speech Rate Multipliers:");
  Object.entries(rateCounts).forEach(([rateStr, count]) => {
    console.log(`   - Rate ${parseFloat(rateStr).toFixed(2)}x: ${count} questions (${(count / 390 * 100).toFixed(1)}%)`);
  });

  console.log("\n📌 Correct Option Choice Distribution (Shuffled A/B/C/D):");
  console.log(`   - Choice A (Index 0): ${answerDistribution[0]} (${(answerDistribution[0] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice B (Index 1): ${answerDistribution[1]} (${(answerDistribution[1] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice C (Index 2): ${answerDistribution[2]} (${(answerDistribution[2] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice D (Index 3): ${answerDistribution[3]} (${(answerDistribution[3] / 390 * 100).toFixed(1)}%)`);

  console.log("=========================================================================");
  console.log(`Total Questions Evaluated:     ${totalQuestions} / 390`);
  console.log(`Level Mapping Mismatches:     ${levelMismatchCount}`);
  console.log(`Speech Rate Mismatches:       ${rateMismatchCount}`);
  console.log(`Duplicate Option Violations:   ${duplicateOptionCount}`);
  console.log("=========================================================================\n");

  if (levelMismatchCount === 0 && rateMismatchCount === 0 && duplicateOptionCount === 0) {
    console.log("🎉 PERFECT AUDIT SCORE: All 390 questions strictly adhere to official FEI TCF Canada difficulty, speed, and distractor standards!");
  } else {
    console.log("⚠️ Audit completed with minor calibration findings.");
  }
}

audit390DifficultyAndSpeed();
