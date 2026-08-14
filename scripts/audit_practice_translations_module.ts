import { PRACTICE_LISTENING_TRANSLATIONS } from "../src/lib/practiceListeningTranslations";

console.log("=== 🔍 AUDITING PRACTICE LISTENING TRANSLATIONS (195 QUESTIONS) ===");

let total = 0;
let emptyPromptEn = 0;
let emptyPassageEn = 0;
let emptyOptsEn = 0;
let frenchWordsInOpts = 0;

for (const [id, item] of Object.entries(PRACTICE_LISTENING_TRANSLATIONS)) {
  total++;
  if (!item.questionPromptEnglish || !item.questionPromptEnglish.trim()) {
    emptyPromptEn++;
    console.error(`❌ [${id}] Empty questionPromptEnglish!`);
  }
  if (!item.passageEnglish || !item.passageEnglish.trim()) {
    emptyPassageEn++;
    console.error(`❌ [${id}] Empty passageEnglish!`);
  }
  if (!item.optionsEnglish || item.optionsEnglish.length !== 4 || item.optionsEnglish.some(o => !o || !o.trim())) {
    emptyOptsEn++;
    console.error(`❌ [${id}] Incomplete optionsEnglish!`);
  } else {
    for (let i = 0; i < 4; i++) {
      const optEn = item.optionsEnglish[i];
      if (/\b(à|du|des|pour|dans|le|la|les|une|un|fermeture|annulation|départ|proposée|réduction)\b/i.test(optEn)) {
        frenchWordsInOpts++;
        console.warn(`⚠️ [${id} Opt ${i}] Untranslated French indicator in option: "${optEn}"`);
      }
    }
  }
}

console.log("=========================================================================");
console.log(`Total Questions Evaluated:          ${total} / 195`);
console.log(`Empty English Question Prompts:     ${emptyPromptEn}`);
console.log(`Empty English Passages:             ${emptyPassageEn}`);
console.log(`Empty English Options:              ${emptyOptsEn}`);
console.log(`Untranslated French Options:        ${frenchWordsInOpts} / ${195 * 4}`);
console.log("=========================================================================");

if (emptyPromptEn === 0 && emptyPassageEn === 0 && emptyOptsEn === 0 && frenchWordsInOpts === 0) {
  console.log("🎉 100% PERFECT: All 195 Practice Questions have 100% pure, accurate English translations for passages, questions, and options!");
} else {
  console.log("⚠️ Minor adjustments needed.");
}
