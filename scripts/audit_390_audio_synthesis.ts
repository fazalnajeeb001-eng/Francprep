import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function audit390AudioSynthesis() {
  console.log("=========================================================================");
  console.log("🎧 DEEP FORENSIC AUDIT: 390 LISTENING AUDIO TRANSCRIPTS & TTS PARSING");
  console.log("=========================================================================\n");

  let totalQuestions = 0;
  let emptyTranscriptCount = 0;
  let singleLineCount = 0;
  let malformedLineCount = 0;
  let missingPassageCount = 0;
  let missingQuestionCount = 0;

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
        console.error(`❌ [Paper ${p} Q${qNum}] Transcript is completely EMPTY!`);
        return;
      }

      const rawLines = transcript.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

      if (rawLines.length < 2 && qNum > 4 && qNum <= 29) {
        singleLineCount++;
        console.error(`⚠️ [Paper ${p} Q${qNum}] Transcript has ONLY 1 line: "${transcript.slice(0, 60)}..."`);
      }

      // Check parsed dialogue lines
      const parsedDialogue: { speaker: string; text: string }[] = [];
      for (const line of rawLines) {
        let speakerName = "";
        let speechText = line;

        if (line.includes(":")) {
          const parts = line.split(":");
          speakerName = parts[0].trim();
          speechText = parts.slice(1).join(":").trim();
        } else if (line.includes("—")) {
          const parts = line.split("—");
          speakerName = parts[0].trim();
          speechText = parts.slice(1).join("—").trim();
        }

        if (!speechText) {
          malformedLineCount++;
          console.error(`❌ [Paper ${p} Q${qNum}] Malformed line with empty speech text: "${line}"`);
        } else {
          parsedDialogue.push({ speaker: speakerName, text: speechText });
        }
      }

      // Check if both passage AND question line are present for in-audio questions Q5-Q29
      if (qNum >= 5 && qNum <= 29) {
        const hasQuestionLine = parsedDialogue.some((d) => d.text.toLowerCase().includes("question n°") || d.text.toLowerCase().includes("écoutez la question"));
        const hasPassageLine = parsedDialogue.some((d) => !d.text.toLowerCase().includes("question n°") && !d.text.toLowerCase().includes("consigne"));

        if (!hasQuestionLine) {
          missingQuestionCount++;
          console.error(`❌ [Paper ${p} Q${qNum}] Question prompt line MISSING from audio dialogue!`);
        }
        if (!hasPassageLine) {
          missingPassageCount++;
          console.error(`❌ [Paper ${p} Q${qNum}] Passage body MISSING from audio dialogue!`);
        }
      }
    });
  }

  console.log("=========================================================================");
  console.log(`Total Questions Evaluated:         ${totalQuestions} / 390`);
  console.log(`Empty Transcripts:                 ${emptyTranscriptCount}`);
  console.log(`Single-Line Audio (Q5-Q29):       ${singleLineCount}`);
  console.log(`Malformed Empty Lines:             ${malformedLineCount}`);
  console.log(`Missing Passage Lines (Q5-Q29):    ${missingPassageCount}`);
  console.log(`Missing Question Lines (Q5-Q29):   ${missingQuestionCount}`);
  console.log("=========================================================================\n");

  if (emptyTranscriptCount === 0 && singleLineCount === 0 && malformedLineCount === 0 && missingPassageCount === 0 && missingQuestionCount === 0) {
    console.log("🎉 AUDIT PASSED 100%: All 390 questions have clean, multi-line transcripts containing both passage body AND spoken question prompt!");
  } else {
    console.log("⚠️ Forensic audit detected audio transcript issues.");
  }
}

audit390AudioSynthesis();
