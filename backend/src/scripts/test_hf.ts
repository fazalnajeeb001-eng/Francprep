import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function testHuggingFace() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);
  const db = mongoose.connection.db!;
  const settingsColl = db.collection("settings");
  const settings = await settingsColl.findOne({});

  const token = settings?.huggingFaceToken || settings?.huggingFaceApiKey;
  console.log("Testing HuggingFace token:", token ? `${token.slice(0, 8)}...` : "NONE");

  try {
    const res = await axios.get("https://huggingface.co/api/whoami-v2", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ HuggingFace Token Valid! User:", res.data?.name);
  } catch (err: any) {
    console.error("❌ HuggingFace Token Failed:", err?.response?.status, err?.response?.data || err?.message);
  }

  await mongoose.disconnect();
}

testHuggingFace();
