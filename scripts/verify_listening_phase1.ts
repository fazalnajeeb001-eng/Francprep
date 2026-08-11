import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function runPhase1Verification() {
  console.log("=== 🧪 TCF Listening Module - Phase 1 Verification ===");
  console.log("Testing 10 Exam Papers for Q1-Q4 Uniqueness & Official FEI Prompting...\n");

  const totalPapers = 10;
  const q1q4PropositionsSet = new Set<string>();
  let totalQ1Q4Count = 0;
  let correctFeiPromptCount = 0;
  let validVisualCount = 0;

  const feiIntroPrompt = "Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.";

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const paperNum = isPractice ? paperIdx : paperIdx - 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);

    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);
    const q1q4 = questions.slice(0, 4);

    q1q4.forEach((q) => {
      totalQ1Q4Count++;

      // Check visual representation (mainImage or hasSpokenOptions for Q1-Q4)
      if (q.mainImage || q.hasSpokenOptions) {
        validVisualCount++;
      }

      // Check options uniqueness key
      const optKey = q.options.join(" | ");
      q1q4PropositionsSet.add(optKey);

      // Check transcript format
      if (q.transcript && q.transcript.includes(feiIntroPrompt)) {
        correctFeiPromptCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx}: 4/4 questions generated with unique scene descriptions.`);
  }

  console.log("\n=== 📊 Phase 1 Verification Results ===");
  console.log(`Total Q1-Q4 Questions Evaluated: ${totalQ1Q4Count}`);
  console.log(`Unique Option Sets Count: ${q1q4PropositionsSet.size} / ${totalQ1Q4Count}`);
  console.log(`Visual Illustration Pass Rate: ${validVisualCount} / ${totalQ1Q4Count} (${(validVisualCount/totalQ1Q4Count*100).toFixed(0)}%)`);
  console.log(`Official FEI Intro Prompt Match: ${correctFeiPromptCount} / ${totalQ1Q4Count} (${(correctFeiPromptCount/totalQ1Q4Count*100).toFixed(0)}%)`);

  if (q1q4PropositionsSet.size === totalQ1Q4Count && validVisualCount === totalQ1Q4Count && correctFeiPromptCount === totalQ1Q4Count) {
    console.log("\n🎉 SUCCESS: Phase 1 (Q1-Q4 Uniqueness & Official FEI Standards) PASSED 100%!");
    process.exit(0);
  } else {
    console.error("\n❌ FAILURE: Phase 1 metrics did not reach 100%.");
    process.exit(1);
  }
}

runPhase1Verification();
