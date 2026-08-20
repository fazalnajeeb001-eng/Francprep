import fs from "fs";
import path from "path";
import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function exportListeningTranscripts() {
  console.log("Exporting listening transcripts for all 10 papers...");
  
  const allPapers: Record<number, Array<{ qNum: number; text: string; rate: number }>> = {};

  for (let paperIdx = 1; paperIdx <= 10; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);

    allPapers[paperIdx] = questions.map((q, idx) => ({
      qNum: q.questionNumber || (idx + 1),
      text: (q.transcript || q.text || '').trim(),
      rate: (q as any).speakingRate || 0.9
    }));
  }

  const outPath = path.join(process.cwd(), "backend", "listening_transcripts.json");
  fs.writeFileSync(outPath, JSON.stringify(allPapers, null, 2), "utf-8");
  console.log(`✅ Successfully exported all 390 listening transcripts to ${outPath}`);
}

exportListeningTranscripts();
