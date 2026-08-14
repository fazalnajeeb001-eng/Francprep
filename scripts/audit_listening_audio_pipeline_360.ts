import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🔬 360-DEGREE AUDIT OF LISTENING AUDIO PIPELINE & MULTI-VOICE SYNTHESIS ===");

interface QuestionAudioAudit {
  paper: number;
  qNum: number;
  level: string;
  hasDialogueOrMultiSpeaker: boolean;
  hasAnnouncerPrompt: boolean;
  speakerLabels: string[];
  speechRate: number;
  transcriptSample: string;
}

const auditList: QuestionAudioAudit[] = [];

for (let p = 1; p <= 10; p++) {
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);

  qs.forEach((q, idx) => {
    const qNum = idx + 1;
    const transcript = q.transcript || q.text || "";
    const rate = (q as any).speakingRate || (qNum <= 7 ? 0.90 : qNum <= 15 ? 0.95 : qNum <= 25 ? 1.05 : qNum <= 33 ? 1.15 : 1.25);

    // Extract speaker labels
    const matches = transcript.match(/([A-Za-zÀ-ÿ0-9\s]+)\s*:/g) || [];
    const speakerLabels = Array.from(new Set(matches.map(m => m.replace(":", "").trim())));

    const hasAnnouncerPrompt = speakerLabels.some(l => /annonceur|annonceuse/i.test(l));
    const hasDialogueOrMultiSpeaker = speakerLabels.length > 1;

    let level = "A1";
    if (qNum >= 8 && qNum <= 15) level = "A2";
    else if (qNum >= 16 && qNum <= 25) level = "B1";
    else if (qNum >= 26 && qNum <= 33) level = "B2";
    else if (qNum >= 34) level = "C1/C2";

    auditList.push({
      paper: p,
      qNum,
      level,
      hasDialogueOrMultiSpeaker,
      hasAnnouncerPrompt,
      speakerLabels,
      speechRate: rate,
      transcriptSample: transcript.substring(0, 80).replace(/\n/g, " ")
    });
  });
}

console.log("\n--- Audio Breakdown by CEFR Tier ---");
["A1", "A2", "B1", "B2", "C1/C2"].forEach(lvl => {
  const tier = auditList.filter(a => a.level === lvl);
  const multiSpeakerCount = tier.filter(a => a.hasDialogueOrMultiSpeaker).length;
  const announcerCount = tier.filter(a => a.hasAnnouncerPrompt).length;
  const avgRate = tier.reduce((sum, a) => sum + a.speechRate, 0) / tier.length;
  console.log(`[Level ${lvl.padEnd(5)}] Total: ${tier.length.toString().padEnd(3)} | Multi-Speaker: ${multiSpeakerCount.toString().padEnd(3)} | Announcer Tagged: ${announcerCount.toString().padEnd(3)} | Avg Speed: ${avgRate.toFixed(2)}x`);
});

console.log("\n--- Sample Speaker Labels Across Questions ---");
auditList.filter(a => a.paper === 1 && (a.qNum === 1 || a.qNum === 5 || a.qNum === 12 || a.qNum === 22 || a.qNum === 35)).forEach(a => {
  console.log(`[Paper 1 - Q${a.qNum} (${a.level})] Speakers: [${a.speakerLabels.join(", ")}] | Speed: ${a.speechRate}x | Sample: "${a.transcriptSample}..."`);
});
