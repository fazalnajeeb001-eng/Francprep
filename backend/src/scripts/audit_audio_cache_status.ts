import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function auditAudioCacheStatus() {
  console.log("==========================================================================");
  console.log("📊 AUDITING MONGODB TTS AUDIO CACHE & PRE-RECORDED AUDIO STATUS");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);
  const db = mongoose.connection.db!;

  const ttsCacheColl = db.collection("ttscaches");
  const totalCached = await ttsCacheColl.countDocuments({});

  console.log(`\n1. 📦 Total Cached Audio Items in MongoDB (TTSCache): ${totalCached}`);

  // Breakdown by voice / provider
  const aggregation = await ttsCacheColl.aggregate([
    { $group: { _id: "$voice", count: { $sum: 1 } } }
  ]).toArray();

  console.log("\n2. 🎙️ Cached Items by Voice Engine / Persona:");
  for (const group of aggregation) {
    console.log(`   • ${group._id || 'default'}: ${group.count} audio files`);
  }

  // Sample check of audio sizes and durations
  const sampleItems = await ttsCacheColl.find({}).limit(5).toArray();
  console.log("\n3. 🔍 Sample Cached Items:");
  for (const s of sampleItems) {
    const sizeKB = Math.round((s.audioBase64?.length || 0) / 1024);
    console.log(`   • Voice: [${s.voice}] | Size: ~${sizeKB} KB | Text snippet: "${(s.text || '').slice(0, 50)}..."`);
  }

  console.log("==========================================================================");
  await mongoose.disconnect();
}

auditAudioCacheStatus();
