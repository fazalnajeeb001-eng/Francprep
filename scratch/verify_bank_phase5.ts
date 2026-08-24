import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";

function verifyFullMasterBank() {
  console.log("=== 🏆 MASTER AUDIT: ALL 390 QUESTIONS ACROSS 10 PAPERS ===");

  if (AUTHENTIC_READING_MASTER_BANK.length !== 10) {
    console.error(`❌ Expected 10 papers in Master Bank, got ${AUTHENTIC_READING_MASTER_BANK.length}`);
    process.exit(1);
  }

  let totalQuestions = 0;
  let errors: string[] = [];

  AUTHENTIC_READING_MASTER_BANK.forEach((paper, pIdx) => {
    const paperNum = pIdx + 1;
    if (paper.length !== 39) {
      errors.push(`Paper ${paperNum}: expected 39 questions, got ${paper.length}`);
    }
    totalQuestions += paper.length;

    const dist = [0, 0, 0, 0];

    paper.forEach((item, qIdx) => {
      const qNum = qIdx + 1;
      dist[item.ans]++;

      // Level check
      const words = item.text.trim().split(/\s+/).length;
      if (item.level === "A1" || item.level === "A2") {
        if (words < 15 || words > 85) {
          errors.push(`Paper ${paperNum} Q${qNum} (${item.level}): word count ${words} outside A1-A2 range (15-85)`);
        }
      } else if (item.level === "B1" || item.level === "B2") {
        if (words < 70 || words > 155) {
          errors.push(`Paper ${paperNum} Q${qNum} (${item.level}): word count ${words} outside B1-B2 range (70-155)`);
        }
      } else if (item.level === "C1" || item.level === "C2") {
        if (words < 140 || words > 260) {
          errors.push(`Paper ${paperNum} Q${qNum} (${item.level}): word count ${words} outside C1-C2 range (140-260)`);
        }
      }

      // English check
      if (!item.passEn || item.passEn.length < 5) errors.push(`Paper ${paperNum} Q${qNum}: missing passEn`);
      if (!item.qEn || item.qEn.length < 5) errors.push(`Paper ${paperNum} Q${qNum}: missing qEn`);
      if (!item.optEn || item.optEn.length !== 4) errors.push(`Paper ${paperNum} Q${qNum}: invalid optEn`);
    });

    console.log(`📊 Paper ${paperNum} Answer Distribution: [0: ${dist[0]}, 1: ${dist[1]}, 2: ${dist[2]}, 3: ${dist[3]}]`);
  });

  console.log(`\n🎉 Total Questions Audited across 10 Papers: ${totalQuestions}`);

  if (errors.length > 0) {
    console.error("❌ MASTER BANK AUDIT FAILED with errors:", errors);
    process.exit(1);
  } else {
    console.log("✅ MASTER BANK AUDIT PASSED 100%! ALL 390 QUESTIONS COMPLY WITH GOLD-STANDARD TCF RULES!");
  }
}

verifyFullMasterBank();
