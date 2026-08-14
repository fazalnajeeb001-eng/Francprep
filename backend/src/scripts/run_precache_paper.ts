import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

async function runPrecachePaper(paperNum = 1) {
  console.log("==========================================================================");
  console.log(`🎙️ PRE-RECORDING ALL 39 QUESTIONS FOR PAPER ${paperNum} INTO MONGODB`);
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const jsonPath = path.join(process.cwd(), "listening_transcripts.json");
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const questions: Array<{ qNum: number; text: string; rate: number }> = allData[paperNum];

  if (!questions || questions.length === 0) {
    throw new Error(`No questions found for Paper ${paperNum}`);
  }

  console.log(`📚 Loaded ${questions.length} questions for Paper ${paperNum}`);

  let successCount = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const textToSynthesize = q.text.trim();
    const rate = q.rate || 0.9;
    const isFemale = !textToSynthesize.startsWith("Locuteur") && !textToSynthesize.startsWith("Homme");

    console.log(`\n[${i + 1}/${questions.length}] Pre-recording Q${q.qNum} (${textToSynthesize.length} chars)...`);

    try {
      const res = await generateNeuralAudio(
        textToSynthesize,
        isFemale ? "female" : "male",
        "fr",
        "elevenlabs",
        undefined,
        undefined,
        rate
      );

      if (res && res.audioBase64) {
        successCount++;
        const byteLen = Buffer.from(res.audioBase64, "base64").length;
        totalBytes += byteLen;
        console.log(`   ✅ Q${q.qNum} Saved in MongoDB! Provider: ${res.provider} | Size: ${(byteLen / 1024).toFixed(1)} KB`);
      } else {
        failCount++;
        console.error(`   ❌ Q${q.qNum} Failed to synthesize audio!`);
      }
    } catch (err: any) {
      failCount++;
      console.error(`   ❌ Q${q.qNum} Error:`, err?.message);
    }

    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 350));
  }

  console.log("\n==========================================================================");
  console.log(`🎉 100% PRE-RECORDING COMPLETED FOR PAPER ${paperNum}`);
  console.log(`• Successfully Stored in MongoDB: ${successCount} / ${questions.length}`);
  console.log(`• Failed: ${failCount}`);
  console.log(`• Total Audio Size in MongoDB: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

// Get paper number from CLI arg or default to Paper 1
const paperArg = parseInt(process.argv[2] || "1", 10);
runPrecachePaper(paperArg);
