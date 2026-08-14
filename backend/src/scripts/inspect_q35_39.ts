import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import TTSCache from "../models/TTSCache";

async function inspectQ35() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  const allCached = await TTSCache.find({}).lean();
  console.log(`Total Cached in MongoDB: ${allCached.length}`);

  for (let i = 0; i < allCached.length; i++) {
    const item = allCached[i];
    console.log(`[${i+1}] voice: ${item.voice} | text: "${item.text.slice(0, 45)}..." | size: ${Math.round(item.audioBase64.length / 1024)} KB`);
  }

  await mongoose.disconnect();
}

inspectQ35();
