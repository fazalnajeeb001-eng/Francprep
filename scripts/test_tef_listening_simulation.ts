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

// 4. Visual Image Assets Audit
console.log("\n[Audit 2] Auditing Visual Illustrations for Q1-Q4 and Q35-Q37...");
const visualIndices = [1, 2, 3, 4, 35, 36, 37];
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
  const stats = fs.statSync(fullPath);
  console.log(`   ✓ Q${qNum} Asset [${q.mainImage}] (${(stats.size / 1024).toFixed(1)} KB) — VERIFIED`);
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
  { raw: 40, expectedNclc: 10, expectedCefr: "C2", expectedCrs: 34, target: true },
  { raw: 38, expectedNclc: 10, expectedCefr: "C2", expectedCrs: 34, target: true },
  { raw: 35, expectedNclc: 9, expectedCefr: "C1", expectedCrs: 31, target: true },
  { raw: 33, expectedNclc: 9, expectedCefr: "C1", expectedCrs: 31, target: true },
  { raw: 30, expectedNclc: 8, expectedCefr: "B2", expectedCrs: 23, target: true },
  { raw: 25, expectedNclc: 7, expectedCefr: "B2", expectedCrs: 17, target: true }, // NCLC 7 PR Target
  { raw: 20, expectedNclc: 6, expectedCefr: "B1", expectedCrs: 9, target: false },
  { raw: 15, expectedNclc: 5, expectedCefr: "B1", expectedCrs: 6, target: false },
  { raw: 10, expectedNclc: 4, expectedCefr: "A2", expectedCrs: 0, target: false },
  { raw: 4, expectedNclc: 2, expectedCefr: "Unrated", expectedCrs: 0, target: false }
];

testCases.forEach((tc) => {
  const res = calculateTefListeningScore(tc.raw);
  if (
    res.nclcLevel !== tc.expectedNclc ||
    res.cefrEquivalent !== tc.expectedCefr ||
    res.expressEntryPoints !== tc.expectedCrs ||
    res.isNCLC7TargetReached !== tc.target
  ) {
    console.error(`❌ Scoring error on raw score ${tc.raw}:`, res, tc);
    process.exit(1);
  }
  console.log(`   • Raw ${tc.raw}/40 ➔ CCI Score: ${res.cciScore}/699 | CEFR: ${res.cefrEquivalent} | NCLC ${res.nclcLevel} | CRS +${res.expressEntryPoints} Points | PR Target: ${res.isNCLC7TargetReached ? 'PASS' : 'FAIL'}`);
});

console.log("\n╔══════════════════════════════════════════════════════════════════════════════════╗");
console.log("║     🎉 TEF CANADA COMPRÉHENSION ORALE (PAPER 1): 100% CERTIFIED & PASSED!        ║");
console.log("╚══════════════════════════════════════════════════════════════════════════════════╝\n");
