import { generateListeningQuestions } from "../src/lib/examSchema.ts";

const questions = generateListeningQuestions(39, "tcf1", 3);
const q18 = questions.find((q) => q.questionNumber === 18);

console.log("=== 🔍 INSPECTING PAPER 1 QUESTION 18 ===");
console.log("ID:", q18?.id);
console.log("Level:", (q18 as any)?.level);
console.log("SpeakingRate:", (q18 as any)?.speakingRate);
console.log("QuestionInAudio:", (q18 as any)?.questionInAudio);
console.log("Text:", q18?.text);
console.log("Transcript:\n", q18?.transcript);
console.log("Options:", q18?.options);
