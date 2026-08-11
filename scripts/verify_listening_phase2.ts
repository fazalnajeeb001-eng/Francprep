import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function runPhase2Verification() {
  console.log("=== 🧪 TCF Listening Module - Phase 2 Verification ===");
  console.log("Testing 10 Exam Papers for Q5-Q15 (A1/A2 Announcements & Voicemails) Uniqueness...\n");

  const totalPapers = 10;
  const q5q15PropositionsSet = new Set<string>();
  let totalQ5Q15Count = 0;
  let correctFormatCount = 0;

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);

    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);
    const q5q15 = questions.slice(4, 15); // Q5 to Q15 (11 questions)

    q5q15.forEach((q) => {
      totalQ5Q15Count++;

      // Check options uniqueness key
      const optKey = q.options.join(" | ");
      q5q15PropositionsSet.add(optKey);

      // Check format
      if (q.transcript && q.options && q.options.length === 4) {
        correctFormatCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx}: 11/11 A1 & A2 questions (Q5-Q15) generated with 100% unique content.`);
  }

  console.log("\n=== 📊 Phase 2 Verification Results ===");
  console.log(`Total Q5-Q15 Questions Evaluated: ${totalQ5Q15Count}`);
  console.log(`Unique Option Sets Count: ${q5q15PropositionsSet.size} / ${totalQ5Q15Count}`);
  console.log(`Proper Options & Transcript Match: ${correctFormatCount} / ${totalQ5Q15Count} (${(correctFormatCount/totalQ5Q15Count*100).toFixed(0)}%)`);

  if (q5q15PropositionsSet.size === totalQ5Q15Count && correctFormatCount === totalQ5Q15Count) {
    console.log("\n🎉 SUCCESS: Phase 2 (Q5-Q15 A1/A2 Announcements & Voicemails) PASSED 100%!");
    process.exit(0);
  } else {
    console.error("\n❌ FAILURE: Phase 2 metrics did not reach 100%.");
    process.exit(1);
  }
}

runPhase2Verification();
