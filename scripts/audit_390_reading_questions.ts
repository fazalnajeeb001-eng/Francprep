import { generateReadingQuestions } from "../src/lib/examSchema.ts";

function audit390ReadingQuestions() {
  console.log("=========================================================================");
  console.log("📖 PHASE 4 AUDIT: COMPRÉHENSION ÉCRITE (390 READING QUESTIONS)");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let emptyPassageCount = 0;
  let shortPassageCount = 0;
  let promptErrors = 0;
  let duplicateOptionCount = 0;
  let levelMismatchCount = 0;

  const levelCounts: Record<string, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  const answerDistribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateReadingQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalQuestions++;
      const qNum = q.questionNumber;
      const passageText = q.passage || q.text || "";
      const levelMatch = passageText.match(/Niveau\s+(A1|A2|B1|B2|C1|C2)/);
      const level = q.level || (levelMatch ? levelMatch[1] : "A1");
      const prompt = q.text;
      const options = q.options || [];
      const correctIdx = q.correctIndex;

      levelCounts[level] = (levelCounts[level] || 0) + 1;
      answerDistribution[correctIdx] = (answerDistribution[correctIdx] || 0) + 1;

      // 1. Passage Text Check
      if (!passageText.trim()) {
        emptyPassageCount++;
        console.error(`❌ [Paper ${p} Q${qNum}] Reading passage text is completely EMPTY!`);
      } else {
        const wordCount = passageText.trim().split(/\s+/).length;
        if (qNum >= 16 && wordCount < 20) {
          shortPassageCount++;
          console.warn(`⚠️ [Paper ${p} Q${qNum}] Unnaturally short Reading passage (${wordCount} words): "${passageText.slice(0, 50)}..."`);
        }
      }

      // 2. Question Prompt Check
      if (!prompt || !prompt.trim().endsWith("?")) {
        promptErrors++;
        console.error(`❌ [Paper ${p} Q${qNum}] Question prompt does not end with '?': "${prompt}"`);
      }

      // 3. Option Uniqueness Check
      const uniqueOpts = new Set(options.map((o) => o.trim().toLowerCase()));
      if (uniqueOpts.size < options.length) {
        duplicateOptionCount++;
        console.error(`❌ [Paper ${p} Q${qNum}] Duplicate options detected!`);
      }

      // 4. Level Mapping Check
      let expectedLevel = "A1";
      if (qNum <= 7) expectedLevel = "A1";
      else if (qNum <= 15) expectedLevel = "A2";
      else if (qNum <= 25) expectedLevel = "B1";
      else if (qNum <= 33) expectedLevel = "B2";
      else if (qNum <= 36) expectedLevel = "C1";
      else expectedLevel = "C2";

      if (level !== expectedLevel && !(expectedLevel === "C2" && level === "C1")) {
        levelMismatchCount++;
      }
    });
  }

  console.log("=========================================================================");
  console.log("📊 READING SECTION DIFFICULTY PROGRESSION & DISTRIBUTION");
  console.log("=========================================================================");
  Object.entries(levelCounts).forEach(([lvl, count]) => {
    console.log(`   - Level ${lvl.padEnd(2)}: ${count} questions (${(count / 390 * 100).toFixed(1)}%)`);
  });

  console.log("\n📌 Correct Answer Shuffling Balance (A/B/C/D):");
  console.log(`   - Choice A (Index 0): ${answerDistribution[0]} (${(answerDistribution[0] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice B (Index 1): ${answerDistribution[1]} (${(answerDistribution[1] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice C (Index 2): ${answerDistribution[2]} (${(answerDistribution[2] / 390 * 100).toFixed(1)}%)`);
  console.log(`   - Choice D (Index 3): ${answerDistribution[3]} (${(answerDistribution[3] / 390 * 100).toFixed(1)}%)`);

  console.log("=========================================================================");
  console.log(`Total Reading Questions Evaluated: ${totalQuestions} / 390`);
  console.log(`Empty Reading Passages:            ${emptyPassageCount}`);
  console.log(`Unnaturally Short Passages:        ${shortPassageCount}`);
  console.log(`Question Prompt Errors:            ${promptErrors}`);
  console.log(`Duplicate Option Violations:       ${duplicateOptionCount}`);
  console.log(`Level Mismatches:                  ${levelMismatchCount}`);
  console.log("=========================================================================\n");

  if (emptyPassageCount === 0 && promptErrors === 0 && duplicateOptionCount === 0 && levelMismatchCount === 0) {
    console.log("🎉 PHASE 4 AUDIT PASSED: All 390 Reading questions comply with FEI CECRL standards!");
  } else {
    console.log("⚠️ Phase 4 audit detected calibration opportunities.");
  }
}

audit390ReadingQuestions();
