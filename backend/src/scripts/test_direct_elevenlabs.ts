import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function testElevenLabsTTS() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  const db = mongoose.connection.db!;
  const settingsColl = db.collection("settings");
  const settings = await settingsColl.findOne({});

  const key = settings?.elevenLabsApiKey;
  console.log("Testing ElevenLabs text-to-speech with key:", key ? `${key.slice(0, 10)}...` : "NONE");

  try {
    const res = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        text: "Bonjour, ceci est un test de synthèse vocale pour FrancPrep.",
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8
        }
      },
      {
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        responseType: "arraybuffer"
      }
    );

    console.log("✅ Synthesis succeeded! Status:", res.status, "Buffer length:", res.data?.byteLength);
  } catch (err: any) {
    let msg = err.message;
    if (err?.response?.data) {
      try {
        msg = Buffer.from(err.response.data).toString("utf-8");
      } catch {}
    }
    console.error("❌ Synthesis failed:", err?.response?.status, msg);
  }

  await mongoose.disconnect();
}

testElevenLabsTTS();
