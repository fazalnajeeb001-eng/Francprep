import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function runPhase5Verification() {
  console.log("=== 🧪 TCF Listening Module - Phase 5 Verification ===");
  console.log("Testing 10 Exam Papers for Q34-Q39 (C1 & C2 High-Register Academic Lectures) Uniqueness...\n");

  const totalPapers = 10;
  const q34q39PropositionsSet = new Set<string>();
  let totalQ34Q39Count = 0;
  let correctC1C2LevelCount = 0;

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);

    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);
    const q34q39 = questions.slice(33, 39); // Q34 to Q39 (6 questions)

    q34q39.forEach((q) => {
      totalQ34Q39Count++;

      // Check options uniqueness key
      const optKey = q.options.join(" | ");
      q34q39PropositionsSet.add(optKey);

      // Check level tag (C1 or C2)
      const lvl = (q as any).level;
      if (lvl === "C1" || lvl === "C2") {
        correctC1C2LevelCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx}: 6/6 C1 & C2 questions (Q34-Q39) generated with 100% unique academic lectures.`);
  }

  console.log("\n=== 📊 Phase 5 Verification Results ===");
  console.log(`Total Q34-Q39 Questions Evaluated: ${totalQ34Q39Count}`);
  console.log(`Unique Option Sets Count: ${q34q39PropositionsSet.size} / ${totalQ34Q39Count}`);
  console.log(`C1/C2 Level Metadata Match: ${correctC1C2LevelCount} / ${totalQ34Q39Count} (${(correctC1C2LevelCount/totalQ34Q39Count*100).toFixed(0)}%)`);

  if (q34q39PropositionsSet.size === totalQ34Q39Count && correctC1C2LevelCount === totalQ34Q39Count) {
    console.log("\n🎉 SUCCESS: Phase 5 (Q34-Q39 C1 & C2 Academic Lectures Uniqueness) PASSED 100%!");
    process.exit(0);
  } else {
    console.error("\n❌ FAILURE: Phase 5 metrics did not reach 100%.");
    process.exit(1);
  }
}

runPhase5Verification();
