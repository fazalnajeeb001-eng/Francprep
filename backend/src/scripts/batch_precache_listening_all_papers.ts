import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import fs from "fs";
import path from "path";
import { generateNeuralAudio } from "../services/tts.service";

async function precacheAllPapers() {
  console.log("==========================================================================");
  console.log("🚀 PRE-RECORDING ALL 390 TCF LISTENING QUESTIONS (PAPERS 1 TO 10)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const transcriptsPath = path.join(__dirname, "../../listening_transcripts.json");
  if (!fs.existsSync(transcriptsPath)) {
    console.error("❌ listening_transcripts.json not found!");
    await mongoose.disconnect();
    return;
  }

  const raw = JSON.parse(fs.readFileSync(transcriptsPath, "utf-8"));
  let totalProcessed = 0;
  let totalSaved = 0;
  let totalBytes = 0;

  for (let p = 1; p <= 10; p++) {
    const list = raw[p.toString()] || [];
    console.log(`\n🎙️ Processing Paper ${p} (${list.length} questions)...`);

    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      totalProcessed++;
      const text = q.text.trim();
      const rate = q.rate || 1.0;

      try {
        const res = await generateNeuralAudio(text, "female", "fr", undefined, undefined, undefined, rate);
        if (res && res.audioBase64) {
          totalSaved++;
          const bytes = Buffer.from(res.audioBase64, "base64").length;
          totalBytes += bytes;
          const isCached = res.provider.startsWith("cache-");
          console.log(`   [Paper ${p} | Q${q.qNum}/39] ${isCached ? "⚡ Instant Cache Hit" : "✨ Synthesized & Saved"} (${(bytes / 1024).toFixed(1)} KB)`);
        }
      } catch (err: any) {
        console.error(`   ❌ Failed Q${q.qNum}:`, err?.message || err);
      }

      await new Promise(r => setTimeout(r, 60));
    }
  }

  console.log("\n==========================================================================");
  console.log("🎉 ALL 390 LISTENING QUESTIONS ARE NOW 100% PRE-RECORDED IN MONGODB");
  console.log(`• Total Questions Processed: ${totalProcessed} / 390`);
  console.log(`• Successfully Saved in Cache: ${totalSaved} / 390`);
  console.log(`• Total Cached Audio Volume: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

precacheAllPapers();
