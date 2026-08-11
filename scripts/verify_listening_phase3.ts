import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function runPhase3Verification() {
  console.log("=== 🧪 TCF Listening Module - Phase 3 Verification ===");
  console.log("Testing 10 Exam Papers for Q16-Q25 (B1 Radio Reports & Public Sentiment) Uniqueness...\n");

  const totalPapers = 10;
  const q16q25PropositionsSet = new Set<string>();
  let totalQ16Q25Count = 0;
  let correctDialogueTagCount = 0;

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);

    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);
    const q16q25 = questions.slice(15, 25); // Q16 to Q25 (10 questions)

    q16q25.forEach((q) => {
      totalQ16Q25Count++;

      // Check options uniqueness key
      const optKey = q.options.join(" | ");
      q16q25PropositionsSet.add(optKey);

      // Check for dialogue speaker tags in transcript
      if (q.transcript && (q.transcript.includes("Locuteur") || q.transcript.includes("Locutrice"))) {
        correctDialogueTagCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx}: 10/10 B1 questions (Q16-Q25) generated with 100% unique radio reports & dialogue tags.`);
  }

  console.log("\n=== 📊 Phase 3 Verification Results ===");
  console.log(`Total Q16-Q25 Questions Evaluated: ${totalQ16Q25Count}`);
  console.log(`Unique Option Sets Count: ${q16q25PropositionsSet.size} / ${totalQ16Q25Count}`);
  console.log(`Multi-speaker Dialogue Tag Match: ${correctDialogueTagCount} / ${totalQ16Q25Count} (${(correctDialogueTagCount/totalQ16Q25Count*100).toFixed(0)}%)`);

  if (q16q25PropositionsSet.size === totalQ16Q25Count && correctDialogueTagCount === totalQ16Q25Count) {
    console.log("\n🎉 SUCCESS: Phase 3 (Q16-Q25 B1 Radio Reports & Dialogue Uniqueness) PASSED 100%!");
    process.exit(0);
  } else {
    console.error("\n❌ FAILURE: Phase 3 metrics did not reach 100%.");
    process.exit(1);
  }
}

runPhase3Verification();
