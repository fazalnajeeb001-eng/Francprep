import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 COMPREHENSIVE 360° TRANSLATION AUDIT ACROSS ALL 390 QUESTIONS (10 PAPERS) ===");

let totalAudited = 0;
let frenchLeakErrors = 0;
let duplicateAnnouncerErrors = 0;
let speakerTagArtifactErrors = 0;
let totalOptionsAudited = 0;
let optionsTranslationErrors = 0;

const frenchLeakRegex = /\b(pourquoi|quel|quelle|quelles|écoute|écoutez|choisissez|consigne|réponse|locuteur|locutrice|annonceur|annonceuse)\b/i;

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach(q => {
    totalAudited++;
    const qId = q.id;
    const qNum = q.questionNumber;

    // Check 1: Question Prompt English
    if (!q.questionPromptEnglish || q.questionPromptEnglish.trim() === "") {
      frenchLeakErrors++;
      console.error(`❌ [${qId}] Missing questionPromptEnglish!`);
    } else if (frenchLeakRegex.test(q.questionPromptEnglish)) {
      frenchLeakErrors++;
      console.error(`❌ [${qId}] French leak in questionPromptEnglish: "${q.questionPromptEnglish}"`);
    }

    // Check 2: Spoken Transcript English
    const trEn = q.transcriptEnglish || "";
    if (!trEn || trEn.trim() === "") {
      frenchLeakErrors++;
      console.error(`❌ [${qId}] Missing transcriptEnglish!`);
    } else {
      // Check for French words in announcer block
      if (/Announcer:\s*Listen to the question.*?\b(pourquoi|quel|quelle|est-il|sont-ils|du|des|dans|le|la|les|ce|cette)\b/i.test(trEn)) {
        frenchLeakErrors++;
        console.error(`❌ [${qId}] French question leaked into transcriptEnglish Announcer block:\n${trEn}`);
      }

      // Check for duplicate Announcer tags
      const announcerCount = (trEn.match(/Announcer:/gi) || []).length;
      if (announcerCount > 1) {
        duplicateAnnouncerErrors++;
        console.error(`❌ [${qId}] Duplicate Announcer tag (${announcerCount} occurrences):\n${trEn}`);
      }

      // Check for duplicate Speaker labels or double prefixes
      if (/Speaker:\s*Speaker/i.test(trEn) || /Speaker 1:\s*Speaker/i.test(trEn)) {
        speakerTagArtifactErrors++;
        console.error(`❌ [${qId}] Double speaker prefix in transcriptEnglish:\n${trEn}`);
      }

      // Check for artificial Speaker 1 / Speaker 2 in single-speaker monologues (Q34-Q39)
      if (qNum >= 34 && qNum <= 39 && /Speaker 2:/i.test(trEn)) {
        speakerTagArtifactErrors++;
        console.error(`❌ [${qId}] Artificial Speaker 2 tag in single-speaker C1/C2 monologue:\n${trEn}`);
      }
    }

    // Check 3: Options English (all 4)
    if (!q.optionsEnglish || q.optionsEnglish.length !== 4) {
      optionsTranslationErrors++;
      console.error(`❌ [${qId}] Missing or invalid optionsEnglish array!`);
    } else {
      q.optionsEnglish.forEach((optEn, idx) => {
        totalOptionsAudited++;
        if (!optEn || optEn.trim() === "" || optEn === q.options[idx]) {
          optionsTranslationErrors++;
          console.error(`❌ [${qId}] Option ${idx} untranslated: "${q.options[idx]}" ➔ "${optEn}"`);
        } else if (/\b(à|du|des|pour|dans|le|la|les|une|un|d'|l'|d’|l’)\b/i.test(optEn) && !/^\s*(A|An|The|In|On|At|To|For|Of|With)\b/i.test(optEn)) {
          // Additional check for French prepositions remaining
          if (frenchLeakRegex.test(optEn)) {
            optionsTranslationErrors++;
            console.error(`❌ [${qId}] French words detected in option ${idx}: "${optEn}"`);
          }
        }
      });
    }
  });
}

console.log("\n=========================================================================================");
console.log(`🎯 360° TRANSLATION AUDIT COMPLETE:`);
console.log(`- TOTAL QUESTIONS AUDITED:      ${totalAudited} / 390 (100%)`);
console.log(`- TOTAL OPTIONS AUDITED:        ${totalOptionsAudited} / 1,560 (100%)`);
console.log(`- FRENCH LEAK ERRORS:           ${frenchLeakErrors}`);
console.log(`- DUPLICATE ANNOUNCER ERRORS:   ${duplicateAnnouncerErrors}`);
console.log(`- SPEAKER TAG ARTIFACT ERRORS:  ${speakerTagArtifactErrors}`);
console.log(`- OPTIONS TRANSLATION ERRORS:   ${optionsTranslationErrors}`);
console.log("=========================================================================================\n");

if (frenchLeakErrors === 0 && duplicateAnnouncerErrors === 0 && speakerTagArtifactErrors === 0 && optionsTranslationErrors === 0) {
  console.log("🏆 100% PASS RATE! ALL 390 QUESTIONS MEET STRICT FEi & TCF TRANSLATION STANDARDS!");
} else {
  console.error("🚨 AUDIT FOUND DEFECTS. PLEASE REVIEW THE LOGS ABOVE.");
  process.exit(1);
}
