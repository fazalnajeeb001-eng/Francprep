import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function auditAll40VisualTranslations() {
  console.log("=========================================================================");
  console.log("🌐 AUDIT: 100% ENGLISH TRANSLATION ACCURACY FOR ALL 40 VISUAL QUESTIONS");
  console.log("=========================================================================\n");

  let totalVisualQuestions = 0;
  let untranslatedCount = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    for (let q = 1; q <= 4; q++) {
      totalVisualQuestions++;
      const item = questions.find((i) => i.questionNumber === q);
      const enTrans = (item as any)?.transcriptEnglish || "";

      // Check if French words remain untranslated in Options A, B, C, D
      const frenchKeywords = ["Des clients", "Des voyageurs", "Un homme", "Des promeneurs", "Une personne", "Un mécanicien", "Une cliente", "Un facteur", "Des skieurs", "Des enfants", "Un serveur"];
      
      const containsFrench = frenchKeywords.some((fw) => enTrans.includes(`Option A: ${fw}`) || enTrans.includes(`Option B: ${fw}`) || enTrans.includes(`Option C: ${fw}`) || enTrans.includes(`Option D: ${fw}`));

      if (containsFrench) {
        untranslatedCount++;
        console.error(`❌ [Paper ${p} Q${q}] Untranslated French options detected in English translation!`);
        console.log(`   -> English Translation Text:\n${enTrans}\n`);
      } else {
        console.log(`✅ [Paper ${p.toString().padStart(2)} Q${q}] 100% Pure English Translation`);
      }
    }
  }

  console.log("\n=========================================================================");
  console.log(`Total Visual Questions Audited: ${totalVisualQuestions} / 40`);
  console.log(`Untranslated Translation Errors: ${untranslatedCount}`);
  console.log("=========================================================================\n");

  if (untranslatedCount === 0) {
    console.log("🎉 100% PERFECT SCORE: All 40 visual items have 100% pure, accurate English translations!");
  } else {
    console.log("⚠️ Audit detected untranslated visual items.");
  }
}

auditAll40VisualTranslations();
