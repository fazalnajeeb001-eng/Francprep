import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";
import { generateListeningQuestions } from "../../../src/lib/examSchema";

function getListeningSpeakingRate(qNum: number): number {
  if (qNum <= 7) return 0.90;   // A1
  if (qNum <= 15) return 0.95;  // A2
  if (qNum <= 25) return 1.00;  // B1
  if (qNum <= 33) return 1.08;  // B2
  if (qNum <= 36) return 1.15;  // C1
  return 1.20;                  // C2
}

async function verifyAllPapersInstantCache() {
  console.log("==========================================================================");
  console.log("⚡ TESTING INSTANT MONGODB RETRIEVAL FOR ALL 10 PAPERS (390 QUESTIONS)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);

  let grandTotalHits = 0;
  let totalQuestions = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? (p * 3) : (p * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
    let pHits = 0;
    totalQuestions += questions.length;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qNum = q.questionNumber || (i + 1);
      const text = (q.transcript || q.text || '').trim();
      const rate = (q as any).speakingRate || getListeningSpeakingRate(qNum);
      const gender = (text.toLowerCase().includes("annonceur:") || qNum % 2 === 0) ? "male" : "female";

      const res = await generateNeuralAudio(text, gender, "fr", undefined, undefined, undefined, rate);
      if (res && res.audioBase64 && res.provider.startsWith("cache-")) {
        pHits++;
        grandTotalHits++;
      } else {
        console.warn(`   ⚠️ Uncached Q${qNum} in Paper ${p}: provider=${res?.provider}`);
      }
    }

    console.log(`📄 Paper ${p.toString().padStart(2, ' ')}: ${pHits}/${questions.length} (${((pHits / questions.length) * 100).toFixed(1)}%) instant cache hit ✅`);
  }

  console.log("\n==========================================================================");
  console.log(`🎉 GRAND TOTAL: ${grandTotalHits} / ${totalQuestions} (${((grandTotalHits / totalQuestions) * 100).toFixed(1)}%) INSTANT MONGODB HITS`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

verifyAllPapersInstantCache().catch(console.error);
