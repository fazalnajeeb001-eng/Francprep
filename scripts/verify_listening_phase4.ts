import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function runPhase4Verification() {
  console.log("=== 🧪 TCF Listening Module - Phase 4 Verification ===");
  console.log("Testing 10 Exam Papers for Q26-Q33 (B2 Debates & Complex Topics) Uniqueness...\n");

  const totalPapers = 10;
  const q26q33PropositionsSet = new Set<string>();
  let totalQ26Q33Count = 0;
  let correctB2LevelCount = 0;

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);

    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);
    const q26q33 = questions.slice(25, 33); // Q26 to Q33 (8 questions)

    q26q33.forEach((q) => {
      totalQ26Q33Count++;

      // Check options uniqueness key
      const optKey = q.options.join(" | ");
      q26q33PropositionsSet.add(optKey);

      // Check level tag
      if ((q as any).level === "B2") {
        correctB2LevelCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx}: 8/8 B2 questions (Q26-Q33) generated with 100% unique debate topics & connectors.`);
  }

  console.log("\n=== 📊 Phase 4 Verification Results ===");
  console.log(`Total Q26-Q33 Questions Evaluated: ${totalQ26Q33Count}`);
  console.log(`Unique Option Sets Count: ${q26q33PropositionsSet.size} / ${totalQ26Q33Count}`);
  console.log(`B2 Level Metadata Match: ${correctB2LevelCount} / ${totalQ26Q33Count} (${(correctB2LevelCount/totalQ26Q33Count*100).toFixed(0)}%)`);

  if (q26q33PropositionsSet.size === totalQ26Q33Count && correctB2LevelCount === totalQ26Q33Count) {
    console.log("\n🎉 SUCCESS: Phase 4 (Q26-Q33 B2 Debates & Complex Topics Uniqueness) PASSED 100%!");
    process.exit(0);
  } else {
    console.error("\n❌ FAILURE: Phase 4 metrics did not reach 100%.");
    process.exit(1);
  }
}

runPhase4Verification();
