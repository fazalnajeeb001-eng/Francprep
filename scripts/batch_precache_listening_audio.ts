import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "backend/.env" });
import { getExamRegistry } from "../src/lib/examSchema";
import { generateNeuralAudio } from "../backend/src/services/tts.service";

async function batchPrecachePaper(paperIndex = 0) {
  console.log("==========================================================================");
  console.log("🚀 BATCH PRE-RECORDING ELEVENLABS AUDIO INTO MONGODB");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const registry = getExamRegistry();
  const paper = registry[paperIndex];
  if (!paper) throw new Error(`Paper index ${paperIndex} not found`);

  const listeningSec = paper.sections.find((s: any) => s.type === "COMPREHENSION_ORALE");
  const questions = listeningSec?.questions || [];

  console.log(`\n📚 Processing Paper: ${paper.title} (${paper.code || paper.id})`);
  console.log(`🎯 Total Questions to pre-record: ${questions.length}`);

  let successCount = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = q.questionNumber || (i + 1);
    const textToSynthesize = (q.transcript || q.text || '').trim();
    const rate = (q as any).speakingRate || 0.9;
    const isFemale = !textToSynthesize.startsWith("Locuteur") && !textToSynthesize.startsWith("Homme");

    console.log(`\n[${i + 1}/${questions.length}] Pre-recording Q${qNum} (${textToSynthesize.length} chars)...`);

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
        console.log(`   ✅ Q${qNum} Stored in MongoDB! Provider: ${res.provider} | Size: ${(byteLen / 1024).toFixed(1)} KB`);
      } else {
        failCount++;
        console.error(`   ❌ Q${qNum} Failed to synthesize audio!`);
      }
    } catch (err: any) {
      failCount++;
      console.error(`   ❌ Q${qNum} Error:`, err?.message);
    }

    // Delay between questions to prevent hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 350));
  }

  console.log("\n==========================================================================");
  console.log(`🎉 100% PRE-RECORDING COMPLETED FOR ${paper.title}`);
  console.log(`• Total Questions Successfully Stored in MongoDB: ${successCount} / ${questions.length}`);
  console.log(`• Total Failed: ${failCount}`);
  console.log(`• Total Audio Data in MongoDB: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

// Pre-record Paper 1 (Index 0)
batchPrecachePaper(0);
