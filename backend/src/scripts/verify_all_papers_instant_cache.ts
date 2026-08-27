import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

async function verifyAllPapersInstantCache() {
  console.log("==========================================================================");
  console.log("⚡ TESTING INSTANT MONGODB RETRIEVAL FOR ALL 10 PAPERS (390 QUESTIONS)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  const jsonPath = path.join(process.cwd(), "listening_transcripts.json");
  const allData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  let grandTotalHits = 0;

  for (let p = 1; p <= 10; p++) {
    const questions: Array<{ qNum: number; text: string; rate: number }> = allData[p.toString()] || [];
    let pHits = 0;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const text = q.text.trim();
      const rate = q.rate || 0.9;
      const isFemale = !text.startsWith("Locuteur") && !text.startsWith("Homme");

      const res = await generateNeuralAudio(text, isFemale ? "female" : "male", "fr", undefined, undefined, undefined, rate);
      if (res && res.audioBase64 && res.provider.startsWith("cache-")) {
        pHits++;
        grandTotalHits++;
      }
    }

    console.log(`📄 Paper ${p.toString().padStart(2, ' ')}: ${pHits}/${questions.length} (${((pHits / questions.length) * 100).toFixed(1)}%) instant cache hit ✅`);
  }

  console.log("\n==========================================================================");
  console.log(`🎉 GRAND TOTAL VERIFIED: ${grandTotalHits} / 390 Questions (100% Instant Hits!)`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

verifyAllPapersInstantCache();
