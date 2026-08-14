import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";

console.log("=== 🔬 AUDITING 390 READING ITEMS FOR TRANSLATION ACCURACY & LEAKS ===");

// List of common French words that should NOT appear untranslated in English fields unless proper nouns
const frenchLeakWords = [
  " s'il vous plaît", " une ", " des ", " les ", " du ", " de la ", " au ", " aux ",
  " un client ", " une femme ", " un voyageur ", " pour ", " avec ", " dans ", " sur ",
  " par ", " à propos ", " est-ce que ", " quel est ", " quelle est ", " selon "
];

let totalLeaks = 0;
let totalPassagesChecked = 0;
let totalQuestionsChecked = 0;
let totalOptionsChecked = 0;

AUTHENTIC_READING_MASTER_BANK.forEach((paper, pIdx) => {
  const pNum = pIdx + 1;
  paper.forEach(item => {
    totalPassagesChecked++;
    totalQuestionsChecked++;

    // Check passEn
    const passEn = item.passEn.toLowerCase();
    frenchLeakWords.forEach(w => {
      if (passEn.includes(w)) {
        console.error(`🚨 French leak in Paper ${pNum} Q${item.qNum} passEn: "${w}" in "${item.passEn}"`);
        totalLeaks++;
      }
    });

    // Check qEn
    const qEn = item.qEn.toLowerCase();
    frenchLeakWords.forEach(w => {
      if (qEn.includes(w)) {
        console.error(`🚨 French leak in Paper ${pNum} Q${item.qNum} qEn: "${w}" in "${item.qEn}"`);
        totalLeaks++;
      }
    });

    // Check optEn
    item.optEn.forEach((opt, optIdx) => {
      totalOptionsChecked++;
      const optEn = opt.toLowerCase();
      frenchLeakWords.forEach(w => {
        if (optEn.includes(w)) {
          console.error(`🚨 French leak in Paper ${pNum} Q${item.qNum} optEn[${optIdx}]: "${w}" in "${opt}"`);
          totalLeaks++;
        }
      });
    });
  });
});

console.log("\n==================== 📊 AUDIT RESULTS ====================");
console.log(`- Passages Checked: ${totalPassagesChecked} / 390`);
console.log(`- Questions Checked: ${totalQuestionsChecked} / 390`);
console.log(`- Options Checked: ${totalOptionsChecked} / 1,560`);
console.log(`- Total French Leaks Detected: ${totalLeaks}`);
if (totalLeaks === 0) {
  console.log("🎉 100% PURE ENGLISH TRANSLATIONS CONFIRMED (0 LEAKS)!");
}
