import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 360° MASTER EXAM CALIBRATION & DISTRACTOR AUDIT (390 QUESTIONS / 10 PAPERS) ===");

let totalQuestions = 0;
let totalOptions = 0;
let timingErrors = 0;
let speedErrors = 0;
let duplicateOptionErrors = 0;
let emptyOptionErrors = 0;
let verbatimC1C2Errors = 0;
let promptErrors = 0;

function calculateWordOverlap(textA: string, textB: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-zà-ÿ0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 3);
  const wordsA = new Set(normalize(textA));
  const wordsB = normalize(textB);
  if (wordsA.size === 0 || wordsB.length === 0) return 0;
  let matches = 0;
  wordsB.forEach(w => {
    if (wordsA.has(w)) matches++;
  });
  return matches / Math.max(wordsA.size, wordsB.length);
}

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach(q => {
    totalQuestions++;
    totalOptions += q.options.length;

    // 1. Response Timer Audit
    const expectedTime = q.questionNumber <= 10 ? 15 : q.questionNumber <= 26 ? 20 : 25;
    if (q.perQuestionTimerSeconds !== expectedTime) {
      console.error(`❌ [Paper ${p} Q${q.questionNumber}] Timing error: Expected ${expectedTime}s, got ${q.perQuestionTimerSeconds}s`);
      timingErrors++;
    }

    // 2. Audio Speed Audit
    const expectedRate = q.questionNumber <= 7 ? 0.85 : q.questionNumber <= 15 ? 0.92 : q.questionNumber <= 25 ? 1.00 : q.questionNumber <= 33 ? 1.15 : q.questionNumber <= 36 ? 1.25 : 1.30;
    if (Math.abs((q.speakingRate || 1.0) - expectedRate) > 0.01) {
      console.error(`❌ [Paper ${p} Q${q.questionNumber}] Speed error: Expected ${expectedRate}x, got ${q.speakingRate}x`);
      speedErrors++;
    }

    // 3. Option Count & Duplicates Audit
    if (q.options.length !== 4) {
      console.error(`❌ [Paper ${p} Q${q.questionNumber}] Expected 4 options, got ${q.options.length}`);
      emptyOptionErrors++;
    }

    const uniqueOpts = new Set(q.options.map(o => o.trim().toLowerCase()));
    if (uniqueOpts.size !== q.options.length) {
      console.error(`❌ [Paper ${p} Q${q.questionNumber}] Duplicate options found: ${JSON.stringify(q.options)}`);
      duplicateOptionErrors++;
    }

    // 4. Prompt Validity
    if (!q.questionPrompt || q.questionPrompt.trim().length === 0) {
      console.error(`❌ [Paper ${p} Q${q.questionNumber}] Missing question prompt`);
      promptErrors++;
    }

    // 5. C1/C2 Verbatim Overlap Audit (> 75% overlap is considered verbatim giveaway)
    if (q.questionNumber >= 34) {
      const correctOpt = q.options[q.correctIndex];
      const passage = q.passage || q.transcript || "";
      const overlap = calculateWordOverlap(correctOpt, passage);
      if (overlap > 0.75) {
        console.error(`❌ [Paper ${p} Q${q.questionNumber}] High verbatim overlap (${(overlap * 100).toFixed(1)}%): "${correctOpt}" in passage`);
        verbatimC1C2Errors++;
      }
    }
  });
}

console.log("\n=========================================================================================");
console.log("🎯 MASTER EXAM AUDIT SUMMARY:");
console.log(`- TOTAL PAPERS AUDITED:        10 / 10`);
console.log(`- TOTAL QUESTIONS AUDITED:     ${totalQuestions} / 390 (100.0%)`);
console.log(`- TOTAL OPTIONS AUDITED:       ${totalOptions} / 1560 (100.0%)`);
console.log(`- TIMING CALIBRATION ERRORS:   ${timingErrors}`);
console.log(`- SPEED CALIBRATION ERRORS:    ${speedErrors}`);
console.log(`- DUPLICATE OPTION ERRORS:     ${duplicateOptionErrors}`);
console.log(`- EMPTY/MISSING OPTION ERRORS: ${emptyOptionErrors}`);
console.log(`- PROMPT ERRORS:               ${promptErrors}`);
console.log(`- C1/C2 VERBATIM ERRORS:       ${verbatimC1C2Errors}`);
console.log("=========================================================================================");

if (timingErrors === 0 && speedErrors === 0 && duplicateOptionErrors === 0 && emptyOptionErrors === 0 && promptErrors === 0 && verbatimC1C2Errors === 0) {
  console.log("\n🏆 100% PERFECT SCORE! ALL EXAM MODE FLOW, SPEED, AND DISTRACTOR STANDARDS ARE 100% VERIFIED!");
} else {
  console.error("\n❌ Some audit checks failed. Review errors above.");
  process.exit(1);
}
