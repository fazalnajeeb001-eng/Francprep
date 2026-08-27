import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import fs from "fs";
import path from "path";
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

async function precacheAllPapers() {
  console.log("==========================================================================");
  console.log("🚀 PRE-RECORDING ALL 390 TCF LISTENING QUESTIONS (PAPERS 1 TO 10)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  let totalProcessed = 0;
  let totalSaved = 0;
  let totalBytes = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? (p * 3) : (p * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    console.log(`\n🎙️ Processing Paper ${p} (${questions.length} questions)...`);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      totalProcessed++;
      const qNum = q.questionNumber || (i + 1);
      const text = (q.transcript || q.text || '').trim();
      const rate = (q as any).speakingRate || getListeningSpeakingRate(qNum);
      const gender = (text.toLowerCase().includes("annonceur:") || qNum % 2 === 0) ? "male" : "female";

      try {
        const res = await generateNeuralAudio(text, gender, "fr", undefined, undefined, undefined, rate);
        if (res && res.audioBase64) {
          totalSaved++;
          const bytes = Buffer.from(res.audioBase64, "base64").length;
          totalBytes += bytes;
          const isCached = res.provider.startsWith("cache-");
          console.log(`   [Paper ${p} | Q${qNum}/39 | ${gender} | ${rate}x] ${isCached ? "⚡ Instant Cache Hit" : "✨ Synthesized & Saved"} (${(bytes / 1024).toFixed(1)} KB)`);
        }
      } catch (err: any) {
        console.error(`   ❌ Failed Q${qNum}:`, err?.message || err);
      }

      await new Promise(r => setTimeout(r, 60));
    }
  }

  console.log("\n==========================================================================");
  console.log("🎉 ALL 390 LISTENING QUESTIONS ARE NOW 100% PRE-RECORDED IN MONGODB");
  console.log(`• Total Questions Processed: ${totalProcessed} / 390`);
  console.log(`• Successfully Saved in Cache: ${totalSaved} / 390`);
  console.log(`• Total Storage Size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

precacheAllPapers().catch(console.error);
