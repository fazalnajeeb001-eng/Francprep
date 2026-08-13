import { generateListeningQuestions } from "../src/lib/examSchema.ts";

const questions = generateListeningQuestions(39, "tcf1", 3);
const q1 = questions.find((q) => q.questionNumber === 1);

console.log("=== 🔍 PAPER 1 QUESTION 1 TRANSLATION VERIFICATION ===");
console.log("French Transcript:\n", q1?.transcript);
console.log("\nEnglish Translation:\n", (q1 as any)?.transcriptEnglish);
