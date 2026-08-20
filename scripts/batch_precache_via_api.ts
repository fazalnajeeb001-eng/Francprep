import axios from "axios";
import { generateListeningQuestions } from "../src/lib/examSchema.ts";

async function precachePaper(paperNumber = 1) {
  console.log("==========================================================================");
  console.log(`🎙️ PRE-RECORDING ALL 39 QUESTIONS FOR PAPER ${paperNumber} VIA ELEVENLABS`);
  console.log("==========================================================================");

  const seedOffset = paperNumber <= 5 ? (paperNumber * 3) : (paperNumber * 7 + 13);
  const questions = generateListeningQuestions(39, `tcf${paperNumber}`, seedOffset);

  console.log(`📚 Loaded ${questions.length} questions for Paper ${paperNumber}`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = q.questionNumber || (i + 1);
    const textToSynthesize = (q.transcript || q.text || '').trim();
    const rate = (q as any).speakingRate || 0.9;
    const isFemale = !textToSynthesize.startsWith("Locuteur") && !textToSynthesize.startsWith("Homme");

    console.log(`\n[${i + 1}/${questions.length}] Pre-recording Q${qNum} (${textToSynthesize.length} chars)...`);

    try {
      // Call backend /tts/speak which executes ElevenLabs synthesis & stores in MongoDB TTSCache
      const res = await axios.post("http://localhost:5000/api/tts/speak", {
        text: textToSynthesize,
        gender: isFemale ? "female" : "male",
        lang: "fr",
        provider: "elevenlabs",
        speakingRate: rate
      });

      if (res.data?.success && res.data?.data?.audioUrl) {
        successCount++;
        const provider = res.data?.data?.provider || "elevenlabs";
        console.log(`   ✅ Q${qNum} Stored in MongoDB! Provider: ${provider}`);
      } else {
        failCount++;
        console.error(`   ❌ Q${qNum} Failed:`, res.data?.error || "Unknown error");
      }
    } catch (err: any) {
      failCount++;
      console.error(`   ❌ Q${qNum} Error:`, err?.response?.data || err?.message);
    }

    // Delay between questions
    await new Promise(resolve => setTimeout(resolve, 400));
  }

  console.log("\n==========================================================================");
  console.log(`🎉 PRE-RECORDING RUN COMPLETED FOR PAPER ${paperNumber}`);
  console.log(`• Successfully Pre-Recorded into MongoDB: ${successCount} / ${questions.length}`);
  console.log(`• Failed: ${failCount}`);
  console.log("==========================================================================");
}

// Pre-record Paper 1
precachePaper(1);
