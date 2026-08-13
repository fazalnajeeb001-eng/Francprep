import { generateListeningQuestions } from "../src/lib/examSchema.ts";

const questions = generateListeningQuestions(39, "tcf1", 3);

[1, 5, 18, 26, 34].forEach((qNum) => {
  const q = questions.find((item) => item.questionNumber === qNum);
  console.log(`\n=================== QUESTION N°${qNum} TRANSCRIPT ===================`);
  console.log(q?.transcript);
  console.log("=================================================================\n");
});
