import { READING_GUIDANCE_BANK } from '../src/lib/readingGuidanceBank';
import { AUTHENTIC_READING_MASTER_BANK } from '../src/lib/authenticReadingMasterBank';

console.log("=== 🔍 COMPREHENSIVE READING GUIDANCE ZERO-LEAK AUDIT ===");

let totalItemsChecked = 0;
let totalLeaks = 0;
let totalMissing = 0;
let inappropriateDistractorLabels = 0;

const leakPatterns = [
  /\bOption [A-D]\b/i,
  /\bvalidez\b/i,
  /\bla r[ée]ponse v[ée]rifi[ée]e\b/i,
  /\bthe verified answer\b/i,
  /\bcorrect answer is\b/i,
  /\bla bonne r[ée]ponse est\b/i,
];

for (let pIdx = 0; pIdx < AUTHENTIC_READING_MASTER_BANK.length; pIdx++) {
  const paper = AUTHENTIC_READING_MASTER_BANK[pIdx];
  const paperNum = pIdx + 1;

  for (const item of paper) {
    const qNum = item.qNum;
    const key = `p${paperNum}_q${qNum}`;
    totalItemsChecked++;

    const entry = READING_GUIDANCE_BANK[key];
    if (!entry) {
      console.error(`❌ Missing entry for ${key}`);
      totalMissing++;
      continue;
    }

    const correctFr = item.opt[item.ans]?.trim();
    const correctEn = item.optEn[item.ans]?.trim();

    // Check pre-submission fields
    const preSubmissionFields = [
      { name: 'trapAlert', text: entry.trapAlert },
      { name: 'trapAlertEn', text: entry.trapAlertEn },
      { name: 'readingCoach', text: entry.readingCoach },
      { name: 'readingCoachEn', text: entry.readingCoachEn },
    ];

    for (const field of preSubmissionFields) {
      if (!field.text) {
        console.error(`❌ Empty field ${field.name} in ${key}`);
        totalLeaks++;
        continue;
      }

      // Check regex leak patterns
      for (const pattern of leakPatterns) {
        if (pattern.test(field.text)) {
          console.error(`🚨 LEAK FOUND in ${key} [${field.name}]: Pattern ${pattern} matched: "${field.text}"`);
          totalLeaks++;
        }
      }

      // Check if full correct option text is leaked into trapAlert or readingCoach (if longer than 4 chars)
      if (correctFr && correctFr.length > 4 && field.text.includes(correctFr)) {
        console.error(`🚨 LEAK FOUND in ${key} [${field.name}]: Directly contains French correct option: "${correctFr}"`);
        totalLeaks++;
      }
      if (correctEn && correctEn.length > 4 && field.text.includes(correctEn)) {
        console.error(`🚨 LEAK FOUND in ${key} [${field.name}]: Directly contains English correct option: "${correctEn}"`);
        totalLeaks++;
      }
    }

    // Check detailedExplanation exists and reveals answer properly
    if (!entry.detailedExplanation.includes("🎯 Réponse exacte : Option")) {
      console.error(`❌ detailedExplanation in ${key} missing standard answer format`);
      totalLeaks++;
    }
    if (!entry.detailedExplanationEn.includes("🎯 Correct Answer: Option")) {
      console.error(`❌ detailedExplanationEn in ${key} missing standard answer format`);
      totalLeaks++;
    }

    // Check C1/C2 distractors do not have inappropriate numerical/temporal tags
    if (item.level === "C1" || item.level === "C2") {
      if (entry.detailedExplanation.includes("PIÈGE DU DISTRACTEUR CHIFFRÉ OU TEMPOREL") || entry.detailedExplanation.includes("NUMERICAL OR TEMPORAL DISTRACTOR TRAP")) {
        // Check if any distractor actually has numbers
        const hasNumbers = item.opt.some((opt, idx) => idx !== item.ans && /\d/.test(opt));
        if (!hasNumbers) {
          console.error(`⚠️ INAPPROPRIATE distractor label in ${key} (${item.level}): contains temporal trap tag without numbers!`);
          inappropriateDistractorLabels++;
        }
      }
    }
  }
}

console.log("\n================ AUDIT SUMMARY ================");
console.log(`Total questions checked: ${totalItemsChecked} / 390`);
console.log(`Total missing entries: ${totalMissing}`);
console.log(`Total pre-submission leaks: ${totalLeaks}`);
console.log(`Inappropriate distractor labels: ${inappropriateDistractorLabels}`);

if (totalLeaks === 0 && totalMissing === 0 && inappropriateDistractorLabels === 0) {
  console.log("\n🎉 ALL 390 READING ITEMS ARE 100% CLEAN, PEDAGOGICALLY SOUND, AND ZERO-LEAK CERTIFIED!");
  process.exit(0);
} else {
  console.error("\n❌ AUDIT FAILED! Leaks or defects detected.");
  process.exit(1);
}
