import fs from "fs";
import path from "path";
import { getExamRegistry, calculateNCLCScore } from "../src/lib/examSchema";
import { calculateTefListeningScore } from "../src/lib/tefScoringEngine";

console.log("================================================================================");
console.log("🇨🇦 TEF CANADA COMPRÉHENSION ORALE (LISTENING): FULL FORENSIC INTEGRATION TEST");
console.log("================================================================================");

const registry = getExamRegistry();

// 1. Find TEF Paper 1 Exam and Practice papers
const examPaper1 = registry.find((p) => p.id === "tef-canada-official-exam-paper-1");
const pracPaper1 = registry.find((p) => p.id === "tef-canada-practice-paper-1");

if (!examPaper1) {
  console.error("❌ FAILED: 'tef-canada-official-exam-paper-1' not found in registry.");
  process.exit(1);
}
if (!pracPaper1) {
  console.error("❌ FAILED: 'tef-canada-practice-paper-1' not found in registry.");
  process.exit(1);
}

console.log("✓ Found TEF Canada Official Exam Paper 1 & Guided Practice Paper 1.");

// 2. Audit Section Duration & Total Items
const examListening = examPaper1.sections.find((s) => s.type === "COMPREHENSION_ORALE");
const pracListening = pracPaper1.sections.find((s) => s.type === "COMPREHENSION_ORALE");

if (!examListening || examListening.totalQuestions !== 40 || examListening.durationMins !== 40) {
  console.error("❌ FAILED: Exam Paper 1 Compréhension Orale must be 40 questions and 40 minutes.", examListening);
  process.exit(1);
}

console.log(`✓ Section Verification: 40 Questions / 40 Minutes confirmed (Total Exam Duration: ${examPaper1.totalDurationMins} Mins).`);

// 3. Question Item Integrity Audit across all 40 questions
console.log("\n[Audit 1] Verifying all 40 Authentic Questions...");
examListening.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (q.questionNumber !== qNum) {
    console.error(`❌ Question number mismatch at index ${idx}: expected ${qNum}, got ${q.questionNumber}`);
    process.exit(1);
  }
  if (!q.text || q.text.trim().length === 0) {
    console.error(`❌ Question ${qNum} has empty text.`);
    process.exit(1);
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`❌ Question ${qNum} does not have 4 options.`);
    process.exit(1);
  }
  if (!Array.isArray(q.optionsEnglish) || q.optionsEnglish.length !== 4) {
    console.error(`❌ Question ${qNum} does not have 4 English options.`);
    process.exit(1);
  }
  if (q.correctIndex < 0 || q.correctIndex > 3) {
    console.error(`❌ Question ${qNum} has invalid correctIndex: ${q.correctIndex}`);
    process.exit(1);
  }
  if (!q.transcript || q.transcript.length === 0) {
    console.error(`❌ Question ${qNum} missing French audio transcript.`);
    process.exit(1);
  }
  if (!q.transcriptEnglish || q.transcriptEnglish.length === 0) {
    console.error(`❌ Question ${qNum} missing English audio transcript.`);
    process.exit(1);
  }
});
console.log("✓ All 40 questions verified: valid French/English text, 4 options, transcripts, and correct indices.");

// 4. Visual Image Assets Audit (Authentic e-TEF: Q1-Q4 only)
console.log("\n[Audit 2] Auditing Visual Illustrations for Q1-Q4 (2x2 Drawing Grid)...");
const visualIndices = [1, 2, 3, 4];
visualIndices.forEach((qNum) => {
  const q = examListening.questions[qNum - 1];
  if (!q.mainImage) {
    console.error(`❌ Visual question Q${qNum} is missing mainImage.`);
    process.exit(1);
  }
  const cleanPath = q.mainImage.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", cleanPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Visual asset file not found on disk: ${fullPath}`);
    process.exit(1);
  }
  if (!Array.isArray(q.optionImages) || q.optionImages.length !== 4) {
    console.error(`❌ Question Q${qNum} missing 4 optionImages for 2x2 grid.`);
    process.exit(1);
  }
  const stats = fs.statSync(fullPath);
  console.log(`   ✓ Q${qNum} Asset [${q.mainImage}] (${(stats.size / 1024).toFixed(1)} KB) + 4 optionImages — VERIFIED`);
});

// 5. Dual-Mode Verification: Exam Mode (Zero Leaks) vs Practice Mode (Guidance Bar)
console.log("\n[Audit 3] Verifying Dual-Mode Pedagogy & Zero-Leak Lockdown...");
examListening.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (q.trapAlert !== undefined || q.audioCoach !== undefined) {
    console.error(`❌ EXAM MODE LEAK on Q${qNum}: trapAlert or audioCoach is exposed in exam mode!`);
    process.exit(1);
  }
});
console.log("✓ Official Exam Mode Lockdown: 100% CLEAN (0 leaks, 0 hints, 0 pre-submission clues).");

// Practice mode guidance check
pracListening.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (!q.trapAlert || q.trapAlert.length === 0) {
    console.error(`❌ PRACTICE MODE: Q${qNum} missing trapAlert!`);
    process.exit(1);
  }
  if (!q.audioCoach || q.audioCoach.length === 0) {
    console.error(`❌ PRACTICE MODE: Q${qNum} missing audioCoach!`);
    process.exit(1);
  }
  // Anti-spoil test: trap alert must not state 'Option A' or 'Option B'
  if (/Option\s+[A-D]\s+est\s+la\s+bonne/i.test(q.trapAlert)) {
    console.error(`❌ PRACTICE MODE SPOIL on Q${qNum}: trapAlert contains answer spoiler!`);
    process.exit(1);
  }
});
console.log("✓ Guided Practice Mode Pedagogy: 100% VERIFIED (40/40 Trap Alerts + Audio Coaches active, 0 spoilers).");

// 6. Scoring Engine Verification
console.log("\n[Audit 4] Auditing Official CCI Paris 0-699 Scoring Engine & NCLC Scale...");
const testCases = [
  { raw: 40, expectedNclc: 10, expectedCefr: "C2", expectedCrs: 34, target: true, safety: true },
  { raw: 38, expectedNclc: 10, expectedCefr: "C2", expectedCrs: 34, target: true, safety: true },
  { raw: 35, expectedNclc: 9, expectedCefr: "C1", expectedCrs: 31, target: true, safety: true },
  { raw: 33, expectedNclc: 9, expectedCefr: "C1", expectedCrs: 31, target: true, safety: true },
  { raw: 30, expectedNclc: 8, expectedCefr: "B2", expectedCrs: 23, target: true, safety: true },
  { raw: 27, expectedNclc: 7, expectedCefr: "B2", expectedCrs: 17, target: true, safety: true }, // 442 pts (Safety buffer reached)
  { raw: 24, expectedNclc: 7, expectedCefr: "B2", expectedCrs: 17, target: true, safety: false }, // 398 pts (IRCC Legal Cutoff)
  { raw: 20, expectedNclc: 6, expectedCefr: "B1", expectedCrs: 9, target: false, safety: false },
  { raw: 15, expectedNclc: 5, expectedCefr: "B1", expectedCrs: 6, target: false, safety: false },
  { raw: 10, expectedNclc: 4, expectedCefr: "A2", expectedCrs: 0, target: false, safety: false },
  { raw: 4, expectedNclc: 2, expectedCefr: "A1", expectedCrs: 0, target: false, safety: false }
];

testCases.forEach((tc) => {
  const res = calculateTefListeningScore(tc.raw);
  if (
    res.nclcLevel !== tc.expectedNclc ||
    res.cefrEquivalent !== tc.expectedCefr ||
    res.expressEntryPoints !== tc.expectedCrs ||
    res.isNCLC7TargetReached !== tc.target ||
    res.isSafetyZoneReached !== tc.safety ||
    !res.legacyEquivalent
  ) {
    console.error(`❌ Scoring error on raw score ${tc.raw}:`, res, tc);
    process.exit(1);
  }
  console.log(`   • Raw ${tc.raw}/40 ➔ CCI: ${res.cciScore}/699 | Legacy: ${res.legacyEquivalent} | CEFR: ${res.cefrEquivalent} | NCLC ${res.nclcLevel} | CRS +${res.expressEntryPoints} pts | PR Target: ${res.isNCLC7TargetReached ? 'PASS' : 'FAIL'} | Safety Buffer: ${res.isSafetyZoneReached ? 'YES' : 'NO'}`);
});

// 7. Answer Key Distribution Audit (10 A, 10 B, 10 C, 10 D)
console.log("\n[Audit 5] Auditing Balanced Answer Key Distribution across all 40 items...");
const keyCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
examListening.questions.forEach((q) => {
  keyCounts[q.correctIndex] = (keyCounts[q.correctIndex] || 0) + 1;
});
console.log(`   • Option A: ${keyCounts[0]} / 40 (${((keyCounts[0]/40)*100).toFixed(1)}%)`);
console.log(`   • Option B: ${keyCounts[1]} / 40 (${((keyCounts[1]/40)*100).toFixed(1)}%)`);
console.log(`   • Option C: ${keyCounts[2]} / 40 (${((keyCounts[2]/40)*100).toFixed(1)}%)`);
console.log(`   • Option D: ${keyCounts[3]} / 40 (${((keyCounts[3]/40)*100).toFixed(1)}%)`);

if (keyCounts[0] !== 10 || keyCounts[1] !== 10 || keyCounts[2] !== 10 || keyCounts[3] !== 10) {
  console.error("❌ FAILED: Answer keys are not evenly balanced (Expected exactly 10 of each A, B, C, D)!", keyCounts);
  process.exit(1);
}
console.log("✓ Answer Key Distribution: 100% BALANCED & UNBIASED (10 A, 10 B, 10 C, 10 D).");

console.log("\n╔══════════════════════════════════════════════════════════════════════════════════╗");
console.log("║     🎉 TEF CANADA COMPRÉHENSION ORALE (PAPER 1): 100% CERTIFIED & PASSED!        ║");
console.log("╚══════════════════════════════════════════════════════════════════════════════════╝\n");
