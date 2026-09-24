import { PRACTICE_LISTENING_TRANSLATIONS } from "../src/lib/practiceListeningTranslations";
import { TEF_PAPER_1_LISTENING_ITEMS, TEF_PAPER_2_LISTENING_ITEMS, TEF_PAPER_3_LISTENING_ITEMS, TEF_PAPER_4_LISTENING_ITEMS, TEF_PAPER_5_LISTENING_ITEMS } from "../src/lib/tefListeningMasterBank";

console.log("================================================================================");
console.log("🔍 COMPREHENSIVE SCENARIO AUDIT: TCF CANADA (P1-P10) vs TEF CANADA (P1-P5)");
console.log("================================================================================");

console.log("\n--- TCF CANADA (Q1 to Q4 Visual Scenarios Across All 10 Papers) ---");
for (let p = 1; p <= 10; p++) {
  console.log(`\nTCF Paper ${p}:`);
  for (let q = 1; q <= 4; q++) {
    const item = PRACTICE_LISTENING_TRANSLATIONS[`tcf${p}-lis-${q}`];
    if (item) {
      console.log(`  • Q${q}: ${item.optionsEnglish?.[0] || item.passageEnglish}`);
    }
  }
}

console.log("\n--- TEF CANADA (Q1 to Q4 Visual Scenarios Across All 5 Papers) ---");
const tefPapers = [
  { p: 1, items: TEF_PAPER_1_LISTENING_ITEMS },
  { p: 2, items: TEF_PAPER_2_LISTENING_ITEMS },
  { p: 3, items: TEF_PAPER_3_LISTENING_ITEMS },
  { p: 4, items: TEF_PAPER_4_LISTENING_ITEMS },
  { p: 5, items: TEF_PAPER_5_LISTENING_ITEMS }
];

tefPapers.forEach(({ p, items }) => {
  console.log(`\nTEF Paper ${p}:`);
  for (let q = 0; q < 4; q++) {
    const it = items[q];
    console.log(`  • Q${q + 1} (${it.level}, Key ${['A','B','C','D'][it.correctIndex]}): ${it.title}`);
    console.log(`    - Scenario: ${it.audioFr.split('\n')[0].substring(0, 70)}...`);
    console.log(`    - Correct drawing: ${it.optionsFr[it.correctIndex]}`);
  }
});
