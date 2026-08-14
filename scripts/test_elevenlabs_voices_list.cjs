const { MongoClient } = require("mongodb");
const https = require("https");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

async function getVoices() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const s = await db.collection("settings").findOne();
  const apiKey = s?.elevenLabsApiKey;

  console.log("ElevenLabs API Key found:", apiKey ? `${apiKey.slice(0, 8)}...` : "NONE");
  if (!apiKey) return;

  const req = https.request({
    hostname: "api.elevenlabs.io",
    path: "/v1/voices",
    method: "GET",
    headers: { "xi-api-key": apiKey }
  }, (res) => {
    let data = "";
    res.on("data", c => data += c);
    res.on("end", () => {
      const json = JSON.parse(data);
      console.log(`=== 🎙️ AVAILABLE ELEVENLABS VOICES IN ACCOUNT (${json?.voices?.length || 0} voices) ===`);
      json?.voices?.forEach(v => {
        console.log(`  - Name: "${v.name}", ID: "${v.voice_id}", Category: ${v.category}, Labels:`, v.labels);
      });
    });
  });

  req.on("error", console.error);
  req.end();
  await client.close();
}

getVoices().catch(console.error);
