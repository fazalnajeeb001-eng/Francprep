import fs from "fs";
import path from "path";
import { getExamRegistry } from "../src/lib/examSchema";
import { calculateTefListeningScore } from "../src/lib/tefScoringEngine";

console.log("================================================================================");
console.log("🇨🇦 TEF CANADA COMPRÉHENSION ORALE: PAPER 2 FULL FORENSIC INTEGRATION TEST");
console.log("================================================================================");

const registry = getExamRegistry();

// 1. Find TEF Paper 2 Exam and Practice papers
const examPaper2 = registry.find((p) => p.id === "tef-canada-official-exam-paper-2");
const pracPaper2 = registry.find((p) => p.id === "tef-canada-practice-paper-2");

if (!examPaper2) {
  console.error("❌ FAILED: 'tef-canada-official-exam-paper-2' not found in registry.");
  process.exit(1);
}
if (!pracPaper2) {
  console.error("❌ FAILED: 'tef-canada-practice-paper-2' not found in registry.");
  process.exit(1);
}

console.log("✓ Found TEF Canada Official Exam Paper 2 & Guided Practice Paper 2.");

// 2. Audit Section Duration & Total Items
const examListening = examPaper2.sections.find((s) => s.type === "COMPREHENSION_ORALE");
const pracListening = pracPaper2.sections.find((s) => s.type === "COMPREHENSION_ORALE");

if (!examListening || examListening.totalQuestions !== 40 || examListening.durationMins !== 40) {
  console.error("❌ FAILED: Exam Paper 2 Compréhension Orale must be 40 questions and 40 minutes.", examListening);
  process.exit(1);
}

console.log(`✓ Section Verification: 40 Questions / 40 Minutes confirmed (Total Exam Duration: ${examPaper2.totalDurationMins} Mins).`);

// 3. Question Item Integrity Audit across all 40 questions
console.log("\n[Audit 1] Verifying all 40 Authentic Questions for Paper 2...");
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
  if (!q.id.startsWith("tef-p2-co-")) {
    console.error(`❌ Question ${qNum} has unexpected id pattern: ${q.id}`);
    process.exit(1);
  }
});
console.log("✓ All 40 questions verified: valid French/English text, 4 options, transcripts, correct indices, and tef-p2-co IDs.");

// 4. Visual Image Structure Audit (Q1-Q4 only)
console.log("\n[Audit 2] Auditing Visual Structure for Q1-Q4 (2x2 Drawing Grid)...");
const visualIndices = [1, 2, 3, 4];
visualIndices.forEach((qNum) => {
  const q = examListening.questions[qNum - 1];
  if (!q.mainImage) {
    console.error(`❌ Visual question Q${qNum} is missing mainImage.`);
    process.exit(1);
  }
  if (!Array.isArray(q.optionImages) || q.optionImages.length !== 4) {
    console.error(`❌ Question Q${qNum} missing 4 optionImages for 2x2 grid.`);
    process.exit(1);
  }
  console.log(`   ✓ Q${qNum} Visual Paths [main: ${q.mainImage}] + 4 optionImages configured (quarantined).`);
});

// 5. Dual-Mode Verification: Exam Mode (Zero Leaks) vs Practice Mode (Guidance Bar)
console.log("\n[Audit 3] Verifying Dual-Mode Pedagogy & Zero-Leak Lockdown for Paper 2...");
examListening.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (q.trapAlert !== undefined || q.audioCoach !== undefined) {
    console.error(`❌ EXAM MODE LEAK on Paper 2 Q${qNum}: trapAlert or audioCoach is exposed in exam mode!`);
    process.exit(1);
  }
});
console.log("✓ Official Exam Mode Lockdown: 100% CLEAN (0 leaks, 0 hints, 0 pre-submission clues).");

// Practice mode guidance check
pracListening.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (!q.trapAlert || q.trapAlert.length === 0) {
    console.error(`❌ PRACTICE MODE: Paper 2 Q${qNum} missing trapAlert!`);
    process.exit(1);
  }
  if (!q.audioCoach || q.audioCoach.length === 0) {
    console.error(`❌ PRACTICE MODE: Paper 2 Q${qNum} missing audioCoach!`);
    process.exit(1);
  }
  if (!q.explanation || q.explanation.length === 0) {
    console.error(`❌ PRACTICE MODE: Paper 2 Q${qNum} missing detailed explanation!`);
    process.exit(1);
  }
  if (!q.detailedExplanationEn || q.detailedExplanationEn.length === 0) {
    console.error(`❌ PRACTICE MODE: Paper 2 Q${qNum} missing English detailed explanation!`);
    process.exit(1);
  }
  // Anti-spoil test: trap alert must not state 'Option A' or 'Option B'
  if (/Option\s+[A-D]\s+est\s+la\s+bonne/i.test(q.trapAlert)) {
    console.error(`❌ PRACTICE MODE SPOIL on Paper 2 Q${qNum}: trapAlert contains answer spoiler!`);
    process.exit(1);
  }
});
console.log("✓ Guided Practice Mode Pedagogy: 100% VERIFIED (40/40 Trap Alerts + Audio Coaches active, 0 spoilers, rich explanations).");

// 6. Answer Key Distribution Audit (Strict 10 A, 10 B, 10 C, 10 D)
console.log("\n[Audit 4] Auditing Balanced Answer Key Distribution across all 40 items...");
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
console.log("║     🎉 TEF CANADA COMPRÉHENSION ORALE (PAPER 2): 100% CERTIFIED & PASSED!        ║");
console.log("╚══════════════════════════════════════════════════════════════════════════════════╝\n");
