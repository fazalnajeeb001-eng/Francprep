import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import fs from "fs";
import path from "path";
import TTSCache from "../models/TTSCache";
import crypto from "crypto";

function getHash(text: string, gender: string = 'female', lang: string = 'fr', rate: number = 1.0): string {
  const normLang = (lang || 'fr').toLowerCase().slice(0, 2);
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${normLang}_${rate}`).digest('hex');
}

async function audit390() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);

  const transcriptsPath = path.join(__dirname, "../../listening_transcripts.json");
  if (!fs.existsSync(transcriptsPath)) {
    console.error("❌ listening_transcripts.json not found!");
    await mongoose.disconnect();
    return;
  }

  const raw = JSON.parse(fs.readFileSync(transcriptsPath, "utf-8"));
  let totalQuestions = 0;
  let cachedCount = 0;
  let uncachedCount = 0;
  const paperStats: Record<number, { cached: number; uncached: number }> = {};

  for (let p = 1; p <= 10; p++) {
    const list = raw[p.toString()] || [];
    paperStats[p] = { cached: 0, uncached: 0 };
    totalQuestions += list.length;

    for (const q of list) {
      const text = q.text.trim();
      const isFemale = !text.toLowerCase().includes("annonceur:") && q.qNum % 2 !== 0;
      const gender = isFemale ? "female" : "male";
      const hash = getHash(text, gender, 'fr', q.rate || 1.0);
      const cached = await TTSCache.findOne({
        $or: [
          { textHash: hash },
          { text }
        ]
      }).lean();

      if (cached && cached.audioBase64) {
        cachedCount++;
        paperStats[p].cached++;
      } else {
        uncachedCount++;
        paperStats[p].uncached++;
      }
    }
  }

  console.log("\n==========================================================================");
  console.log("📊 390 LISTENING QUESTIONS MONGODB CACHE AUDIT");
  console.log("==========================================================================");
  console.log(`Total Cached Questions in MongoDB:   ${cachedCount} / ${totalQuestions}`);
  console.log(`Total Uncached Questions:            ${uncachedCount} / ${totalQuestions}`);
  console.log("\nBreakdown by Paper (1 to 10):");
  for (let p = 1; p <= 10; p++) {
    const s = paperStats[p];
    const status = s.cached === 39 ? "✅ 100% Cached" : `⚠️ ${s.cached}/39 Cached`;
    console.log(`   • Paper ${p.toString().padStart(2, ' ')}: ${status} (${s.cached} cached, ${s.uncached} remaining)`);
  }
  console.log("==========================================================================\n");

  await mongoose.disconnect();
}

audit390();
