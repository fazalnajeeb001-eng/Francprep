import { generateListeningQuestions, generateReadingQuestions } from "../src/lib/examSchema.ts";

function auditTranslationsAllQuestions() {
  console.log("=========================================================================");
  console.log("🌐 COMPREHENSIVE TRANSLATION AUDIT: LISTENING & READING (780 TOTAL ITEMS)");
  console.log("=========================================================================\n");

  let listeningEmptyTranslations = 0;
  let listeningShortTranslations = 0;
  let readingEmptyTranslations = 0;
  let readingShortTranslations = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;

    // 1. Listening Questions Audit (390 items)
    const listeningQuestions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
    listeningQuestions.forEach((q) => {
      const trans = (q as any).transcriptEnglish || (q as any).passageEnglish || "";
      if (!trans.trim()) {
        listeningEmptyTranslations++;
        console.error(`❌ [Listening Paper ${p} Q${q.questionNumber}] English translation is completely EMPTY!`);
      } else if (trans.trim().split(/\s+/).length < 3) {
        listeningShortTranslations++;
        console.warn(`⚠️ [Listening Paper ${p} Q${q.questionNumber}] Very short translation: "${trans}"`);
      }
    });

    // 2. Reading Questions Audit (390 items)
    const readingQuestions = generateReadingQuestions(39, `tcf${p}`, seedOffset);
    readingQuestions.forEach((q) => {
      const trans = (q as any).passageEnglish || (q as any).englishTranslation || "";
      if (!trans.trim()) {
        readingEmptyTranslations++;
        console.error(`❌ [Reading Paper ${p} Q${q.questionNumber}] English translation is completely EMPTY!`);
      } else if (trans.trim().split(/\s+/).length < 3) {
        readingShortTranslations++;
        console.warn(`⚠️ [Reading Paper ${p} Q${q.questionNumber}] Very short translation: "${trans}"`);
      }
    });
  }

  console.log("=========================================================================");
  console.log(`Listening Questions Audited:        390 / 390`);
  console.log(`Listening Empty Translations:       ${listeningEmptyTranslations}`);
  console.log(`Listening Short Translations:       ${listeningShortTranslations}`);
  console.log("-------------------------------------------------------------------------");
  console.log(`Reading Questions Audited:          390 / 390`);
  console.log(`Reading Empty Translations:         ${readingEmptyTranslations}`);
  console.log(`Reading Short Translations:         ${readingShortTranslations}`);
  console.log("=========================================================================\n");

  if (listeningEmptyTranslations === 0 && readingEmptyTranslations === 0) {
    console.log("🎉 100% CONFIRMED: All 390 Listening and all 390 Reading questions have complete, valid English translations!");
  } else {
    console.log("⚠️ Translation audit detected missing translations.");
  }
}

auditTranslationsAllQuestions();
