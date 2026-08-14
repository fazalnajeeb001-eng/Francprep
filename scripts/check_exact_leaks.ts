import { generateListeningQuestions } from "../src/lib/examSchema";

const frenchLeakWords = [
  " s'il vous plaît", " une ", " des ", " les ", " du ", " de la ", " au ", " aux ",
  " un client ", " une femme ", " un voyageur ", " pour ", " avec ", " dans ", " sur "
];

for (let p = 1; p <= 10; p++) {
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);
  qs.forEach(q => {
    const qNum = q.questionNumber;
    const qEn = (q.questionPromptEnglish || "").toLowerCase();
    frenchLeakWords.forEach(w => {
      if (qEn.includes(w)) console.log(`[P${p}Q${qNum}] qEn: "${w}" in "${q.questionPromptEnglish}"`);
    });

    q.optionsEnglish?.forEach((opt: string, optIdx: number) => {
      const oEn = (opt || "").toLowerCase();
      frenchLeakWords.forEach(w => {
        if (oEn.includes(w)) console.log(`[P${p}Q${qNum}] optEn[${optIdx}]: "${w}" in "${opt}"`);
      });
    });

    const passEn = (q.passageEnglish || "").toLowerCase();
    frenchLeakWords.forEach(w => {
      if (passEn.includes(w)) console.log(`[P${p}Q${qNum}] passEn: "${w}" in "${q.passageEnglish}"`);
    });
  });
}
