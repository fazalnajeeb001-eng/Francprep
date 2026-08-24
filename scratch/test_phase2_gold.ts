import { GOLD_PAPER_3_ITEMS, GOLD_PAPER_4_ITEMS } from "./phase2_gold_data";

function testPhase2GoldData() {
  console.log("=== 🏆 5 GOLD-STANDARD RULES AUDIT (PHASE 2: PAPERS 3 & 4) ===");

  const papers = [
    { num: 3, items: GOLD_PAPER_3_ITEMS },
    { num: 4, items: GOLD_PAPER_4_ITEMS }
  ];

  let errors: string[] = [];

  papers.forEach(({ num, items }) => {
    if (items.length !== 39) {
      errors.push(`Paper ${num}: expected 39 questions, got ${items.length}`);
    }

    const dist = [0, 0, 0, 0];

    items.forEach((item, idx) => {
      const qNum = idx + 1;
      dist[item.ans]++;

      // Check level bounds
      const words = item.text.trim().split(/\s+/).length;
      if (item.level === "A1" || item.level === "A2") {
        if (words < 15 || words > 85) {
          errors.push(`Paper ${num} Q${qNum} (${item.level}): word count ${words} outside A1-A2 range (15-85)`);
        }
      } else if (item.level === "B1" || item.level === "B2") {
        if (words < 70 || words > 155) {
          errors.push(`Paper ${num} Q${qNum} (${item.level}): word count ${words} outside B1-B2 range (70-155)`);
        }
      } else if (item.level === "C1" || item.level === "C2") {
        if (words < 140 || words > 260) {
          errors.push(`Paper ${num} Q${qNum} (${item.level}): word count ${words} outside C1-C2 range (140-260)`);
        }
      }

      // Check English translations
      if (!item.passEn || item.passEn.length < 10) errors.push(`Paper ${num} Q${qNum}: missing passEn`);
      if (!item.qEn || item.qEn.length < 5) errors.push(`Paper ${num} Q${qNum}: missing qEn`);
      if (!item.optEn || item.optEn.length !== 4) errors.push(`Paper ${num} Q${qNum}: invalid optEn`);
    });

    console.log(`📊 Gold Paper ${num} Answer Distribution: [0: ${dist[0]}, 1: ${dist[1]}, 2: ${dist[2]}, 3: ${dist[3]}]`);
  });

  if (errors.length > 0) {
    console.error("❌ GOLD-STANDARD AUDIT FAILED with errors:", errors);
    process.exit(1);
  } else {
    console.log("✅ GOLD-STANDARD AUDIT PASSED 100%! (0 errors)");
  }
}

testPhase2GoldData();
