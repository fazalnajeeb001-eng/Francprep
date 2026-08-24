import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";

function verifyBankPhase3() {
  console.log("=== 🏆 MASTER BANK PHASE 3 INTEGRATION AUDIT ===");

  const papersToAudit = [1, 2, 3, 4, 5, 6];
  let totalErrors = 0;

  papersToAudit.forEach((pNum) => {
    const items = AUTHENTIC_READING_MASTER_BANK[pNum - 1];
    console.log(`Paper ${pNum} count: ${items.length} questions`);

    if (items.length !== 39) {
      console.error(`❌ Paper ${pNum} does not have exactly 39 questions!`);
      totalErrors++;
    }

    items.forEach((item, idx) => {
      const qNum = idx + 1;
      const words = item.text.trim().split(/\s+/).length;

      // Bound checks
      if (item.level === "A1" || item.level === "A2") {
        if (words < 15 || words > 85) {
          console.error(`❌ Paper ${pNum} Q${qNum} (${item.level}) word count ${words} out of range`);
          totalErrors++;
        }
      } else if (item.level === "B1" || item.level === "B2") {
        if (words < 70 || words > 155) {
          console.error(`❌ Paper ${pNum} Q${qNum} (${item.level}) word count ${words} out of range`);
          totalErrors++;
        }
      } else if (item.level === "C1" || item.level === "C2") {
        if (words < 140 || words > 260) {
          console.error(`❌ Paper ${pNum} Q${qNum} (${item.level}) word count ${words} out of range`);
          totalErrors++;
        }
      }

      if (!item.passEn || !item.qEn || !item.optEn || item.optEn.length !== 4) {
        console.error(`❌ Paper ${pNum} Q${qNum} missing English translation fields!`);
        totalErrors++;
      }
    });
  });

  if (totalErrors > 0) {
    console.error(`❌ MASTER BANK PHASE 3 AUDIT FAILED with ${totalErrors} errors.`);
    process.exit(1);
  } else {
    console.log(`✅ MASTER BANK PHASE 3 AUDIT PASSED 100%! All 234 items in Papers 1, 2, 3, 4, 5 & 6 are 100% Gold-Standard compliant!`);
  }
}

verifyBankPhase3();
