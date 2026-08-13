import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function audit390QuestionStems() {
  console.log("=========================================================================");
  console.log("🔍 COMPREHENSIVE AUDIT: 390 TCF LISTENING QUESTION STEMS & TRANSCRIPTS");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let invalidStatementCount = 0;
  let genericInstructionCount = 0;
  let validInterrogativeCount = 0;

  const badExamples: { paper: number; qNum: number; text: string; transcript: string }[] = [];

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalQuestions++;
      const qNum = q.questionNumber;
      const prompt = (q as any).questionPrompt || q.text || "";
      const transcript = q.transcript || "";

      // Check if prompt is a generic instruction
      const isGenericInstruction = prompt.includes("Écoutez le document sonore") || prompt.includes("Écoutez les 4 propositions");

      // Check if the announcer spoken question is a statement (doesn't end with '?')
      const announcerMatch = transcript.match(/Annonceur:\s*Écoutez la question\.\s*Question N°\d+\s*:\s*([^.\n]+(?:\.|\?))/i);
      const spokenQuestion = announcerMatch ? announcerMatch[1] : "";
      const spokenIsQuestion = spokenQuestion.trim().endsWith("?");

      if (isGenericInstruction) {
        genericInstructionCount++;
      }

      if (spokenQuestion && !spokenIsQuestion) {
        invalidStatementCount++;
        if (badExamples.length < 5) {
          badExamples.push({ paper: p, qNum, text: prompt, transcript: spokenQuestion });
        }
      } else {
        validInterrogativeCount++;
      }
    });
  }

  console.log("=========================================================================");
  console.log("📊 AUDIT RESULTS (390 LISTENING QUESTIONS)");
  console.log("=========================================================================");
  console.log(`Total Questions Evaluated:            ${totalQuestions} / 390`);
  console.log(`Valid Interrogative Questions (?):    ${validInterrogativeCount} / 390 (${(validInterrogativeCount / 390 * 100).toFixed(1)}%)`);
  console.log(`Invalid Statement Spoken Lines:      ${invalidStatementCount} / 390 (${(invalidStatementCount / 390 * 100).toFixed(1)}%)`);
  console.log(`Generic Instruction Text Lines:      ${genericInstructionCount} / 390 (${(genericInstructionCount / 390 * 100).toFixed(1)}%)`);
  console.log("=========================================================================\n");

  if (badExamples.length > 0) {
    console.log("⚠️ Sample Invalid Statement Announcements Found:");
    badExamples.forEach((ex, idx) => {
      console.log(`  ${idx + 1}. [Paper ${ex.paper} Q${ex.qNum}]: "${ex.transcript}"`);
    });
  }
}

audit390QuestionStems();
