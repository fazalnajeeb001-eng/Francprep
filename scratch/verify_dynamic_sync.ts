import { generateReadingQuestions } from "../src/lib/examSchema";

function verifyDynamicSyncAll390() {
  console.log("=== 🧪 100% DYNAMIC STATE SYNCHRONIZATION AUDIT (390 QUESTIONS / ALL 10 PAPERS) ===");

  let totalQuestionsAudited = 0;
  let syncMismatchErrors: string[] = [];

  for (let paperNum = 1; paperNum <= 10; paperNum++) {
    const questions = generateReadingQuestions(39, `tcf${paperNum}`, 0);
    
    if (questions.length !== 39) {
      syncMismatchErrors.push(`Paper ${paperNum}: expected 39 questions, got ${questions.length}`);
    }

    questions.forEach((q, idx) => {
      totalQuestionsAudited++;
      const qNum = idx + 1;

      // Verify essential dynamic fields
      if (!q.explanation || !q.detailedExplanationEn) {
        syncMismatchErrors.push(`Paper ${paperNum} Q${qNum}: missing dynamic explanation fields`);
        return;
      }
      if (!q.trapAlert || !q.trapAlertEn) {
        syncMismatchErrors.push(`Paper ${paperNum} Q${qNum}: missing dynamic trapAlert fields`);
        return;
      }
      if (!q.readingCoach || !q.readingCoachEn) {
        syncMismatchErrors.push(`Paper ${paperNum} Q${qNum}: missing dynamic readingCoach fields`);
        return;
      }

      // Check correct rationale sync
      const correctOptText = q.options[q.correctIndex];
      const correctLetter = String.fromCharCode(65 + q.correctIndex);

      if (!q.explanation.includes(correctOptText)) {
        syncMismatchErrors.push(`Paper ${paperNum} Q${qNum}: French explanation does not include active correct option text "${correctOptText}"`);
      }
      if (!q.explanation.includes(`Option ${correctLetter}`)) {
        syncMismatchErrors.push(`Paper ${paperNum} Q${qNum}: French explanation does not include active correct letter "${correctLetter}"`);
      }
    });
  }

  console.log(`\n🎉 Total Questions Evaluated for Dynamic Synchronization: ${totalQuestionsAudited}`);

  if (syncMismatchErrors.length > 0) {
    console.error("❌ DYNAMIC STATE SYNCHRONIZATION AUDIT FAILED:", syncMismatchErrors);
    process.exit(1);
  } else {
    console.log("✅ DYNAMIC STATE SYNCHRONIZATION AUDIT PASSED 100%! ZERO STATIC MOCK FALLBACKS ACROSS ALL 390 QUESTIONS!");
  }
}

verifyDynamicSyncAll390();
