const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("francprep");
    const settings = await db.collection("settings").findOne();
    console.log("=== 🔍 LIVE SETTINGS IN MONGODB ===");
    console.log({
      hasElevenLabsKey: Boolean(settings?.elevenLabsApiKey),
      elevenLabsKeyLength: settings?.elevenLabsApiKey?.length,
      hasOpenAIKey: Boolean(settings?.openaiApiKey),
      hasHuggingFaceToken: Boolean(settings?.huggingFaceToken),
      preferredVoiceEngine: settings?.preferredVoiceEngine,
      activeTTSProvider: settings?.activeTTSProvider,
      selectedElevenLabsMaleVoice: settings?.selectedElevenLabsMaleVoice,
      selectedElevenLabsFemaleVoice: settings?.selectedElevenLabsFemaleVoice,
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
