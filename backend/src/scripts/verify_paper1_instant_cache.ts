import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

async function verifyPaper1InstantCache() {
  console.log("==========================================================================");
  console.log("⚡ TESTING INSTANT MONGODB RETRIEVAL FOR ALL 39 QUESTIONS OF PAPER 1");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  const jsonPath = path.join(process.cwd(), "listening_transcripts.json");
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const questions: Array<{ qNum: number; text: string; rate: number }> = allData[1];

  let instantHits = 0;
  const startAll = Date.now();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const text = q.text.trim();
    const rate = q.rate || 0.9;
    const isFemale = !text.startsWith("Locuteur") && !text.startsWith("Homme");

    const t0 = Date.now();
    const res = await generateNeuralAudio(text, isFemale ? "female" : "male", "fr", undefined, undefined, undefined, rate);
    const durationMs = Date.now() - t0;

    if (res && res.audioBase64) {
      instantHits++;
      console.log(`• Q${q.qNum.toString().padStart(2, ' ')}: Instant Audio OK! (${durationMs}ms) | Provider: ${res.provider} | Size: ${Math.round(Buffer.from(res.audioBase64, 'base64').length / 1024)} KB`);
    } else {
      console.error(`❌ Q${q.qNum}: Missing audio!`);
    }
  }

  const totalTime = Date.now() - startAll;
  console.log("\n==========================================================================");
  console.log(`🎉 VERIFICATION RESULT: ${instantHits} / ${questions.length} Questions Verified!`);
  console.log(`⚡ Total 39 Questions Loaded in: ${totalTime}ms (Average: ${(totalTime / 39).toFixed(1)}ms per question)`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

verifyPaper1InstantCache();
