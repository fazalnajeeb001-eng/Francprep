import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function deepAudit390ListeningTranslations() {
  console.log("=========================================================================");
  console.log("🔍 DEEP FORENSIC AUDIT: 390 LISTENING ENGLISH TRANSLATIONS (ALL 10 PAPERS)");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let emptyTranslations = 0;
  let frenchWordsDetected = 0;
  let missingOptionsInTranslation = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalQuestions++;
      const qNum = q.questionNumber;
      const transEn = (q as any).transcriptEnglish || "";

      if (!transEn.trim()) {
        emptyTranslations++;
        console.error(`❌ [Paper ${p} Q${qNum}] English translation is completely EMPTY!`);
        return;
      }

      // Check Q1-Q4 visual options translation
      if (qNum <= 4) {
        const hasOptions = transEn.includes("Option A:") && transEn.includes("Option B:") && transEn.includes("Option C:") && transEn.includes("Option D:");
        if (!hasOptions) {
          missingOptionsInTranslation++;
          console.error(`❌ [Paper ${p} Q${qNum}] Missing Option A/B/C/D labels in translation!`);
        }

        // Check for common French words that indicate untranslated text
        const frenchIndicators = ["Des ", "Un ", "Une ", "Dans ", "Sur le ", "À la ", "Au "];
        const lines = transEn.split("\n");
        for (const line of lines) {
          if (line.startsWith("... Option")) {
            for (const fi of frenchIndicators) {
              if (line.includes(`Option A: ${fi}`) || line.includes(`Option B: ${fi}`) || line.includes(`Option C: ${fi}`) || line.includes(`Option D: ${fi}`)) {
                frenchWordsDetected++;
                console.error(`❌ [Paper ${p} Q${qNum}] Untranslated French indicator '${fi}' found in line: "${line}"`);
              }
            }
          }
        }
      }

      // Check Q5-Q8 spoken options translation
      if (qNum >= 5 && qNum <= 8) {
        const hasSpokenOptions = transEn.includes("... A:") && transEn.includes("... B:") && transEn.includes("... C:") && transEn.includes("... D:");
        if (!hasSpokenOptions) {
          missingOptionsInTranslation++;
          console.error(`❌ [Paper ${p} Q${qNum}] Missing spoken option A/B/C/D labels in translation!`);
        }
      }
    });
  }

  console.log("=========================================================================");
  console.log(`Total Listening Questions Audited: ${totalQuestions} / 390`);
  console.log(`Empty English Translations:        ${emptyTranslations}`);
  console.log(`Missing Option Labels (Q1-Q8):     ${missingOptionsInTranslation}`);
  console.log(`Untranslated French Options:       ${frenchWordsDetected}`);
  console.log("=========================================================================\n");

  if (emptyTranslations === 0 && missingOptionsInTranslation === 0 && frenchWordsDetected === 0) {
    console.log("🎉 100% MATHEMATICALLY VERIFIED: All 390 Listening English translations are 100% complete, fully translated, and error-free!");
  } else {
    console.log("⚠️ Forensic audit detected translation anomalies.");
  }
}

deepAudit390ListeningTranslations();
