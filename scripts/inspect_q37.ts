import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 INSPECTING PAPER 1 QUESTION 37 (C2) & ADVANCED ITEMS ===");

const questions = generateListeningQuestions(39, "tcf1", 3);
const q37 = questions.find(q => q.questionNumber === 37);

if (q37) {
  console.log("-----------------------------------------------------------------");
  console.log(`Question ID: ${q37.id} (Level ${q37.level})`);
  console.log(`French Prompt: "${q37.questionPrompt}"`);
  console.log(`English Prompt: "${q37.questionPromptEnglish}"`);
  console.log(`French Audio Transcript:\n"${q37.transcript}"`);
  console.log(`English Audio Transcript:\n"${q37.transcriptEnglish}"`);
  console.log("\nOptions:");
  q37.options.forEach((opt, idx) => {
    const isCorrect = idx === q37.correctIndex;
    const optEn = q37.optionsEnglish?.[idx] || "MISSING";
    console.log(`  [${String.fromCharCode(65 + idx)}] ${isCorrect ? "⭐ (CORRECT)" : "  (DISTRACTOR)"}: "${opt}"`);
    console.log(`      EN: "${optEn}"`);
  });
  console.log("-----------------------------------------------------------------");
} else {
  console.error("Q37 not found!");
}
