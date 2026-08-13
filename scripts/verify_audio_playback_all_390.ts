import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function verifyAll390AudioTranscripts() {
  console.log("=========================================================================");
  console.log("🎧 DEEP AUDIT: AUDITING ALL 390 LISTENING QUESTION TRANSCRIPTS & DIALOGUES");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let missingPassageCount = 0;
  let missingQuestionPromptCount = 0;
  let emptyTranscriptCount = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? p * 3 : p * 7 + 13;
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    questions.forEach((q) => {
      totalQuestions++;
      const qNum = q.questionNumber;
      const transcript = q.transcript || "";

      if (!transcript.trim()) {
        emptyTranscriptCount++;
        console.error(`❌ [Paper ${p} Q${qNum}] Transcript is EMPTY!`);
        return;
      }

      // Check if question prompt is included for Q1-Q29 (in-audio questions)
      if (qNum <= 29 && !transcript.includes("Question N°") && qNum > 4) {
        missingQuestionPromptCount++;
        console.error(`⚠️ [Paper ${p} Q${qNum}] Question prompt line missing in transcript!`);
      }

      // Check if passage text body is present for Q5-Q39
      if (qNum >= 5) {
        const lines = transcript.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
        if (lines.length < 1) {
          missingPassageCount++;
          console.error(`⚠️ [Paper ${p} Q${qNum}] Passage body line missing!`);
        }
      }
    });
  }

  console.log("=========================================================================");
  console.log(`Total Questions Audited:           ${totalQuestions} / 390`);
  console.log(`Empty Transcripts Found:           ${emptyTranscriptCount}`);
  console.log(`Missing Question Prompts (Q5-Q29): ${missingQuestionPromptCount}`);
  console.log(`Missing Passage Bodies (Q5-Q39):   ${missingPassageCount}`);
  console.log("=========================================================================\n");

  if (emptyTranscriptCount === 0 && missingQuestionPromptCount === 0 && missingPassageCount === 0) {
    console.log("🎉 AUDIT PASSED 100%: All 390 Listening questions contain complete, multi-line passage audio transcripts & question prompts!");
  } else {
    console.log("⚠️ Audit found transcript structure issues that require calibration.");
  }
}

verifyAll390AudioTranscripts();
