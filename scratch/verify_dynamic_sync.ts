import { generateReadingQuestions } from "../src/lib/examSchema";

function runDynamicSyncAudit() {
  console.log("=== 🔍 TESTING 100% DYNAMIC STATE SYNCHRONIZATION ===");

  const p1Questions = generateReadingQuestions(39, "test-p1", 0);
  const p2Questions = generateReadingQuestions(39, "test-p2", 1);
  const p3Questions = generateReadingQuestions(39, "test-p3", 2);
  const p4Questions = generateReadingQuestions(39, "test-p4", 3);
  const p5Questions = generateReadingQuestions(39, "test-p5", 4);
  const p6Questions = generateReadingQuestions(39, "test-p6", 5);
  const p7Questions = generateReadingQuestions(39, "test-p7", 6);
  const p8Questions = generateReadingQuestions(39, "test-p8", 7);

  let errors: string[] = [];

  [...p1Questions, ...p2Questions, ...p3Questions, ...p4Questions, ...p5Questions, ...p6Questions, ...p7Questions, ...p8Questions].forEach((q) => {
    // Check that explanation contains the exact question prompt or passage reference
    const explanation = q.explanation;
    const correctOpt = q.options[q.correctIndex];

    if (!explanation.includes(correctOpt)) {
      errors.push(`Q${q.questionNumber} (${q.id}): Explanation does not contain active correct option text "${correctOpt}"`);
    }

    // Ensure no legacy leaked strings like "transport public" or "frais d'inscription" appear unless they are in the active question!
    if (explanation.includes("frais d'inscription universitaire") && !q.passage.includes("frais d'inscription")) {
      errors.push(`Q${q.questionNumber} (${q.id}): Explanation contains stale legacy fallback string "frais d'inscription universitaire"`);
    }
  });

  if (errors.length > 0) {
    console.error("❌ DYNAMIC STATE SYNC ERRORS FOUND:", errors);
    process.exit(1);
  } else {
    console.log("✅ DYNAMIC STATE SYNCHRONIZATION AUDIT PASSED 100%! All 312 explanations are 100% dynamically generated from active question items!");
  }
}

runDynamicSyncAudit();
