import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

async function batchPrecachePaper() {
  console.log("==========================================================================");
  console.log("🚀 BATCH PRE-RECORDING ELEVENLABS AUDIO DIRECTLY INTO MONGODB");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  // Read examSchema.ts to extract Paper 1 questions
  const schemaPath = path.resolve(__dirname, "../../../src/lib/examSchema.ts");
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");

  // Extract listening questions from Paper 1 (TCF-PRAC-01)
  const transcriptRegex = /transcript:\s*`([^`]+)`|transcript:\s*"([^"]+)"/g;
  const matches = [...schemaContent.matchAll(transcriptRegex)];
  
  // Get first 39 transcripts for Paper 1
  const paper1Transcripts: string[] = [];
  for (let i = 0; i < matches.length && paper1Transcripts.length < 39; i++) {
    const raw = matches[i][1] || matches[i][2];
    if (raw && raw.trim().length > 10) {
      paper1Transcripts.push(raw.trim());
    }
  }

  console.log(`\n📚 Loaded ${paper1Transcripts.length} Listening Questions for Paper 1`);

  let successCount = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (let i = 0; i < paper1Transcripts.length; i++) {
    const textToSynthesize = paper1Transcripts[i];
    const qNum = i + 1;
    const isFemale = !textToSynthesize.startsWith("Locuteur") && !textToSynthesize.startsWith("Homme");

    console.log(`\n[${i + 1}/${paper1Transcripts.length}] Pre-recording Q${qNum} (${textToSynthesize.length} chars)...`);

    try {
      const res = await generateNeuralAudio(
        textToSynthesize,
        isFemale ? "female" : "male",
        "fr",
        "elevenlabs",
        undefined,
        undefined,
        0.9
      );

      if (res && res.audioBase64) {
        successCount++;
        const byteLen = Buffer.from(res.audioBase64, "base64").length;
        totalBytes += byteLen;
        console.log(`   ✅ Q${qNum} Stored in MongoDB! Provider: ${res.provider} | Size: ${(byteLen / 1024).toFixed(1)} KB`);
      } else {
        failCount++;
        console.error(`   ❌ Q${qNum} Failed to synthesize audio!`);
      }
    } catch (err: any) {
      failCount++;
      console.error(`   ❌ Q${qNum} Error:`, err?.message);
    }

    // Delay between questions
    await new Promise(resolve => setTimeout(resolve, 350));
  }

  console.log("\n==========================================================================");
  console.log(`🎉 100% PRE-RECORDING COMPLETED FOR PAPER 1`);
  console.log(`• Total Questions Successfully Stored in MongoDB: ${successCount} / ${paper1Transcripts.length}`);
  console.log(`• Total Failed: ${failCount}`);
  console.log(`• Total Audio Data in MongoDB: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

batchPrecachePaper();
