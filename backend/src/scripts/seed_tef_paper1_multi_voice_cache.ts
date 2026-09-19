import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config({ path: path.join(__dirname, "../../../.env") });

import { generateNeuralAudio } from "../services/tts.service";
import TTSCache from "../models/TTSCache";
import { TEF_PAPER_1_LISTENING_ITEMS } from "../../../src/lib/tefListeningMasterBank";

async function seedTefPaper1MultiVoiceCache() {
  console.log("==========================================================================");
  console.log("🇨🇦 SEEDING & PRE-CACHING MULTI-VOICE AUDIO FOR ALL 40 TEF QUESTIONS");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI || "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";
  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("✓ Connected to MongoDB.");

  let successCount = 0;
  const startAll = Date.now();

  for (let i = 0; i < TEF_PAPER_1_LISTENING_ITEMS.length; i++) {
    const q = TEF_PAPER_1_LISTENING_ITEMS[i];
    const text = q.audioFr.trim();
    const qNum = q.questionNumber;
    const rate = q.speakingRate || 1.0;

    // Detect gender from script tags or default
    const isFemale = !text.toLowerCase().startsWith("locuteur") && 
                     !text.toLowerCase().startsWith("homme") && 
                     !text.toLowerCase().startsWith("client :") &&
                     !text.toLowerCase().startsWith("alain :") &&
                     !text.toLowerCase().startsWith("laurent :");

    console.log(`\n[${i + 1}/40] Processing Q${qNum} (${q.title})...`);

    const t0 = Date.now();
    try {
      const res = await generateNeuralAudio(
        text,
        isFemale ? "female" : "male",
        "fr",
        undefined,
        undefined,
        undefined,
        rate
      );
      const durationMs = Date.now() - t0;

      if (res && res.audioBase64) {
        successCount++;
        const sizeKb = Math.round(Buffer.from(res.audioBase64, "base64").length / 1024);
        console.log(`   ✓ Q${qNum} Synthesized & Cached! (${durationMs}ms) | Provider: ${res.provider} | Size: ${sizeKb} KB`);
      } else {
        console.error(`   ❌ Q${qNum} Failed to generate audio!`);
      }
    } catch (err: any) {
      console.error(`   ❌ Q${qNum} Error:`, err?.message || err);
    }
  }

  const totalTime = ((Date.now() - startAll) / 1000).toFixed(1);
  console.log("\n==========================================================================");
  console.log(`🎉 COMPLETED: ${successCount} / ${TEF_PAPER_1_LISTENING_ITEMS.length} TEF Audio Items Cached!`);
  console.log(`⚡ Total Elapsed Time: ${totalTime}s`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

seedTefPaper1MultiVoiceCache().catch(console.error);
