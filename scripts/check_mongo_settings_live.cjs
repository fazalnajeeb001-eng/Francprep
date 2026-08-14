const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

async function check() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const s = await db.collection("settings").findOne();
  console.log("=== MongoDB (test.settings) ===");
  console.log({
    preferredVoiceEngine: s?.preferredVoiceEngine,
    activeTTSProvider: s?.activeTTSProvider,
    hasElevenLabsKey: Boolean(s?.elevenLabsApiKey),
    keyPrefix: s?.elevenLabsApiKey ? s.elevenLabsApiKey.slice(0, 10) : 'none'
  });

  // Ensure preferredVoiceEngine is elevenlabs
  if (s?.preferredVoiceEngine !== "elevenlabs" || s?.activeTTSProvider !== "elevenlabs") {
    console.log("Updating preferredVoiceEngine & activeTTSProvider to elevenlabs...");
    await db.collection("settings").updateOne({}, {
      $set: {
        preferredVoiceEngine: "elevenlabs",
        activeTTSProvider: "elevenlabs"
      }
    });
    console.log("Updated!");
  }

  await client.close();
}

check().catch(console.error);
