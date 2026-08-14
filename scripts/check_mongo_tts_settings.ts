import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

async function checkSettings() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/francprep";
  console.log("Connecting to:", uri.replace(/:([^:@]+)@/, ":****@"));
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const settings = await db?.collection("settings").findOne();
    console.log("Settings in DB:", {
      hasElevenLabsKey: Boolean(settings?.elevenLabsApiKey),
      elevenLabsKeyLength: settings?.elevenLabsApiKey?.length,
      hasOpenAIKey: Boolean(settings?.openaiApiKey),
      hasHuggingFaceToken: Boolean(settings?.huggingFaceToken),
      preferredVoiceEngine: settings?.preferredVoiceEngine,
      activeTTSProvider: settings?.activeTTSProvider,
      selectedElevenLabsMaleVoice: settings?.selectedElevenLabsMaleVoice,
      selectedElevenLabsFemaleVoice: settings?.selectedElevenLabsFemaleVoice,
    });
    await mongoose.disconnect();
  } catch (err: any) {
    console.log("DB Connection error:", err?.message);
  }
}

checkSettings();
