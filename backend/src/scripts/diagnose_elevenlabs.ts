import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function diagnoseElevenLabs() {
  console.log("==========================================================================");
  console.log("🔍 DIAGNOSING ELEVENLABS API KEY & TTS ENGINE CONFIGURATION");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ MONGODB_URI not found in .env");
    return;
  }

  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const db = mongoose.connection.db;
  if (!db) {
    console.error("❌ No DB connection");
    return;
  }

  const settingsColl = db.collection("settings");
  const settings = await settingsColl.findOne({});

  console.log("\n1. 📋 Current Settings in Database:");
  console.log("   • activeTTSProvider:", settings?.activeTTSProvider);
  console.log("   • preferredVoiceEngine:", settings?.preferredVoiceEngine);
  console.log("   • elevenLabsApiKey:", settings?.elevenLabsApiKey ? `${settings.elevenLabsApiKey.slice(0, 8)}... (${settings.elevenLabsApiKey.length} chars)` : "NOT SET");
  console.log("   • selectedElevenLabsFemaleVoice:", settings?.selectedElevenLabsFemaleVoice);
  console.log("   • selectedElevenLabsMaleVoice:", settings?.selectedElevenLabsMaleVoice);

  const envKey = process.env.ELEVENLABS_API_KEY;
  console.log("   • process.env.ELEVENLABS_API_KEY:", envKey ? `${envKey.slice(0, 8)}...` : "NOT SET");

  const keyToTest = settings?.elevenLabsApiKey || envKey;

  if (!keyToTest) {
    console.error("\n❌ NO ElevenLabs API Key configured in database or .env!");
    await mongoose.disconnect();
    return;
  }

  console.log(`\n2. 🧪 Testing ElevenLabs API with key: ${keyToTest.slice(0, 8)}...`);
  try {
    const userRes = await axios.get("https://api.elevenlabs.io/v1/user", {
      headers: { "xi-api-key": keyToTest }
    });
    console.log("   ✅ ElevenLabs User Account Validated!");
    console.log("   • Tier:", userRes.data?.subscription?.tier);
    console.log("   • Character Count:", userRes.data?.subscription?.character_count);
    console.log("   • Character Limit:", userRes.data?.subscription?.character_limit);
    const remaining = (userRes.data?.subscription?.character_limit || 0) - (userRes.data?.subscription?.character_count || 0);
    console.log("   • Remaining Characters:", remaining);

    if (remaining <= 0) {
      console.warn("   ⚠️ WARNING: ElevenLabs monthly character quota is EXHAUSTED (0 remaining)!");
    }

    const voicesRes = await axios.get("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": keyToTest }
    });
    console.log(`   ✅ Fetched ${voicesRes.data?.voices?.length || 0} voices from ElevenLabs.`);
  } catch (err: any) {
    console.error("   ❌ ElevenLabs API Call Failed:", err?.response?.status, err?.response?.data || err?.message);
  }

  // Check cached audio items in TTSCache
  const ttsCacheColl = db.collection("ttscaches");
  const cacheCount = await ttsCacheColl.countDocuments({});
  console.log(`\n3. 📦 TTS Cache Collection: ${cacheCount} audio items cached.`);
  
  const sampleCached = await ttsCacheColl.find({}).limit(10).toArray();
  for (const c of sampleCached) {
    console.log(`   • [${c.voice}] text: "${(c.text || '').slice(0, 40)}..." (Audio Base64 len: ${c.audioBase64?.length || 0})`);
  }

  await mongoose.disconnect();
}

diagnoseElevenLabs();
