import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";

function countSentences(text: string): number {
  if (!text) return 0;
  // Clean text and split by sentence-ending punctuation (. ! ?)
  const clean = text.replace(/[\r\n]+/g, " ").trim();
  const sentences = clean.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 3);
  return sentences.length;
}

function auditTranslationCompleteness() {
  console.log("=== 🔍 EXHAUSTIVE TRANSLATION COMPLETENESS AUDIT (ALL 390 QUESTIONS) ===");

  let issues: { paperNum: number; qNum: number; level: string; frCount: number; enCount: number; reason: string }[] = [];

  AUTHENTIC_READING_MASTER_BANK.forEach((paper, pIdx) => {
    const paperNum = pIdx + 1;
    paper.forEach((item, qIdx) => {
      const qNum = qIdx + 1;

      if (!item.passEn || item.passEn.trim().length === 0) {
        issues.push({ paperNum, qNum, level: item.level, frCount: 0, enCount: 0, reason: "Missing passEn entirely" });
        return;
      }

      const frSentences = countSentences(item.text);
      const enSentences = countSentences(item.passEn);

      // Discrepancy check: if English sentence count is less than French sentence count
      if (enSentences < frSentences) {
        issues.push({
          paperNum,
          qNum,
          level: item.level,
          frCount: frSentences,
          enCount: enSentences,
          reason: `Sentence count mismatch (FR: ${frSentences} sentences, EN: ${enSentences} sentences)`
        });
      }

      // Check title translation completeness (if title contains colon or dash)
      if (item.text.includes(":") && !item.passEn.includes(":")) {
        issues.push({
          paperNum,
          qNum,
          level: item.level,
          frCount: frSentences,
          enCount: enSentences,
          reason: `Possible missing subtitle in passEn header (FR has ':', EN missing ':')`
        });
      }
    });
  });

  console.log(`\n📋 Audit Summary: Total flagged translation items: ${issues.length}`);

  issues.forEach((iss) => {
    console.log(`- Paper ${iss.paperNum} Q${iss.qNum} (${iss.level}): ${iss.reason}`);
  });

  return issues;
}

auditTranslationCompleteness();
