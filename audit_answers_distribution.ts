import { getExamRegistry } from './src/lib/examSchema';

const papers = getExamRegistry();
console.log(`Total Papers in Registry: ${papers.length}`);

for (const paper of papers) {
  console.log(`\n======================================================`);
  console.log(`PAPER: ${paper.id} - ${paper.title}`);
  console.log(`======================================================`);

  for (const sec of paper.sections) {
    if (sec.type === 'COMPREHENSION_ORALE' || sec.type === 'COMPREHENSION_ECRITE') {
      const qList = sec.questions || [];
      const dist = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0 };
      const answers = [];

      for (let i = 0; i < qList.length; i++) {
        const q = qList[i];
        const ans = q.correctIndex !== undefined ? q.correctIndex : q.correctAnswer;
        if (ans === 0 || ans === 1 || ans === 2 || ans === 3) {
          dist[ans]++;
        } else {
          dist.other++;
        }
        answers.push(`Q${q.questionNumber}:${ans}`);
      }

      console.log(`[${sec.type}] (${qList.length} questions) -> Distribution: A(0): ${dist[0]}, B(1): ${dist[1]}, C(2): ${dist[2]}, D(3): ${dist[3]}, Other/Missing: ${dist.other}`);
      if (dist[2] === 0 && dist[3] === 0) {
        console.warn(`⚠️ WARNING: ${sec.type} in ${paper.id} has ZERO C (2) or D (3) answers! All answers are only A (0) or B (1)!`);
      }
    }
  }
}
