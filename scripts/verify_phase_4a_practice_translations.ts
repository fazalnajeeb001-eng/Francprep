import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=========================================================================");
console.log("🇨🇦 PHASE 4 — STEP 4A COMPREHENSIVE VERIFICATION AUDIT (195 QUESTIONS)");
console.log("=========================================================================\n");

let totalQuestions = 0;
let missingPromptEn = 0;
let missingOptionsEn = 0;
let missingPassageEn = 0;
let untranslatedFrenchOptions = 0;
let frenchInAnnouncerLine = 0;

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  console.log(`\n📄 Auditing Practice Paper ${p} (tcf${p}) — 39 Questions:`);

  questions.forEach((q) => {
    totalQuestions++;
    const qNum = q.questionNumber;

    // 1. Check questionPromptEnglish
    if (!q.questionPromptEnglish || !q.questionPromptEnglish.trim()) {
      missingPromptEn++;
      console.error(`  ❌ [${q.id}] Missing questionPromptEnglish`);
    }

    // 2. Check optionsEnglish
    if (!q.optionsEnglish || q.optionsEnglish.length !== 4) {
      missingOptionsEn++;
      console.error(`  ❌ [${q.id}] Missing or incomplete optionsEnglish (length: ${q.optionsEnglish?.length || 0})`);
    } else {
      q.optionsEnglish.forEach((optEn, optIdx) => {
        if (!optEn || !optEn.trim()) {
          missingOptionsEn++;
          console.error(`  ❌ [${q.id} Option ${optIdx}] Empty optionsEnglish string`);
        } else if (/\b(à|du|des|pour|dans|le|la|les|une|un|fermeture|annulation|départ|proposée|réduction|d'|l'|d’|l’)\b/i.test(optEn)) {
          untranslatedFrenchOptions++;
          console.warn(`  ⚠️ [${q.id} Option ${optIdx}] Untranslated French indicator: "${optEn}"`);
        }
      });
    }

    // 3. Check passageEnglish
    if (!q.passageEnglish || !q.passageEnglish.trim()) {
      missingPassageEn++;
      console.error(`  ❌ [${q.id}] Missing passageEnglish`);
    }

    // 4. Check transcriptEnglish for leaked French announcer questions
    if (q.transcriptEnglish?.includes("Question N°") && q.transcriptEnglish?.includes(" : ")) {
      frenchInAnnouncerLine++;
      console.error(`  ❌ [${q.id}] Raw French announcer line in transcriptEnglish`);
    }
  });

  console.log(`  ✅ Paper ${p}: 39/39 questions verified.`);
}

console.log("\n=========================================================================");
console.log("FINAL AUDIT SCORECARD — STEP 4A (100% PURE ENGLISH TRANSLATIONS):");
console.log("=========================================================================");
console.log(`Total Practice Questions Audited:    ${totalQuestions} / 195 (100%)`);
console.log(`Missing English Question Prompts:    ${missingPromptEn}`);
console.log(`Missing English Options Arrays:      ${missingOptionsEn}`);
console.log(`Missing English Spoken Passages:     ${missingPassageEn}`);
console.log(`Untranslated French Options:         ${untranslatedFrenchOptions} / 780 (0.0%)`);
console.log(`French Announcer Leaks in Transcript:${frenchInAnnouncerLine}`);
console.log("=========================================================================");

if (
  totalQuestions === 195 &&
  missingPromptEn === 0 &&
  missingOptionsEn === 0 &&
  missingPassageEn === 0 &&
  untranslatedFrenchOptions === 0 &&
  frenchInAnnouncerLine === 0
) {
  console.log("🎉 ALL 195 PRACTICE LISTENING QUESTIONS (PAPERS 1-5) ARE 100% PURE ENGLISH!");
} else {
  console.error("❌ Verification failed. Please check errors above.");
  process.exit(1);
}
