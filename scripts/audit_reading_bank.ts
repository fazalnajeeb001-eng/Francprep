import { generateReadingQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 AUDITING ALL 10 READING COMPREHENSION PAPERS (390 QUESTIONS) ===");

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateReadingQuestions(39, `tcf${p}`, seedOffset);

  const levels: Record<string, number> = {};
  let totalValidOptions = 0;
  let totalWithPassEn = 0;
  let totalWithSpecificHint = 0;

  questions.forEach(q => {
    const lvlMatch = q.passage?.match(/Niveau\s+([A-C][1-2])/);
    const lvl = lvlMatch ? lvlMatch[1] : "Unknown";
    levels[lvl] = (levels[lvl] || 0) + 1;

    if (q.options && q.options.length === 4 && q.correctIndex >= 0 && q.correctIndex <= 3) {
      totalValidOptions++;
    }
    if (q.passageEnglish && q.passageEnglish.length > 5) {
      totalWithPassEn++;
    }
    if (q.hint && !q.hint.includes("extreme words")) {
      totalWithSpecificHint++;
    }
  });

  console.log(`\n📄 Paper ${p} Reading Summary:`);
  console.log(`- Questions: ${questions.length} / 39`);
  console.log(`- Levels distribution:`, levels);
  console.log(`- Valid 4-Options: ${totalValidOptions} / 39`);
  console.log(`- English Passages Attached: ${totalWithPassEn} / 39`);
  console.log(`- Specific Hints: ${totalWithSpecificHint} / 39`);
}
