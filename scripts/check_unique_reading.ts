import { generateReadingQuestions } from "../src/lib/examSchema";

const allQuestions = new Map<string, any>();
for (let p = 1; p <= 10; p++) {
  const qs = generateReadingQuestions(39, `tcf${p}`, p * 3);
  qs.forEach(q => {
    allQuestions.set(q.text + "---" + q.passage, q);
  });
}

console.log(`Generated across 10 papers: 390 reading questions.`);
console.log(`Unique reading questions across 10 papers: ${allQuestions.size}`);
