import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function checkAllKeys() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);
  const db = mongoose.connection.db!;
  const settingsColl = db.collection("settings");
  const settings = await settingsColl.findOne({});

  console.log("=================================================");
  console.log("🔑 API KEYS CONFIGURED IN SETTINGS:");
  console.log("=================================================");
  console.log("• ElevenLabs Key:", settings?.elevenLabsApiKey ? `${settings.elevenLabsApiKey.slice(0, 8)}... (${settings.elevenLabsApiKey.length} chars)` : "NONE");
  console.log("• OpenAI Key:", settings?.openaiApiKey ? `${settings.openaiApiKey.slice(0, 8)}... (${settings.openaiApiKey.length} chars)` : "NONE");
  console.log("• Anthropic Key:", settings?.anthropicApiKey ? `${settings.anthropicApiKey.slice(0, 8)}...` : "NONE");
  console.log("• OpenRouter Key:", settings?.openRouterApiKey ? `${settings.openRouterApiKey.slice(0, 8)}...` : "NONE");
  console.log("• HuggingFace Token:", (settings?.huggingFaceToken || settings?.huggingFaceApiKey) ? "PRESENT" : "NONE");
  console.log("• Active TTS Provider:", settings?.activeTTSProvider);
  console.log("• Preferred Voice Engine:", settings?.preferredVoiceEngine);
  console.log("=================================================");

  await mongoose.disconnect();
}

checkAllKeys();
