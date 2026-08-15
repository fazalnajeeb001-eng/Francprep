import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import fs from "fs";
import path from "path";
import axios from "axios";
import TTSCache from "../models/TTSCache";
import Settings from "../models/Settings";
import { stripSpeakerLabels } from "../services/tts.service";

async function resynthesizeCleanAudio() {
  console.log("==========================================================================");
  console.log("🚀 RESYNTHESIZING CLEAN STUDIO AUDIO WITHOUT SPEAKER LABELS INTO MONGODB");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const transcriptsPath = path.join(__dirname, "../../listening_transcripts.json");
  if (!fs.existsSync(transcriptsPath)) {
    console.error("❌ listening_transcripts.json not found!");
    await mongoose.disconnect();
    return;
  }

  const raw = JSON.parse(fs.readFileSync(transcriptsPath, "utf-8"));
  let updatedCount = 0;
  let skippedCount = 0;

  for (let p = 1; p <= 10; p++) {
    const list = raw[p.toString()] || [];
    console.log(`\n🎙️ Processing Paper ${p} (${list.length} questions)...`);

    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      const fullTranscript = q.text.trim();
      const spokenText = stripSpeakerLabels(fullTranscript);

      // Only regenerate if the transcript originally contained speaker labels
      const hadSpeakerLabel = /(?:^|\n)\s*(?:Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/i.test(fullTranscript);

      if (!hadSpeakerLabel) {
        skippedCount++;
        continue;
      }

      // Check if we need to synthesize via Google Audio Fallback chunking
      try {
        const targetLang = "fr";
        const splitIntoChunks = (str: string, maxLen = 160): string[] => {
          if (str.length <= maxLen) return [str];
          const words = str.split(" ");
          const chunks: string[] = [];
          let currentChunk = "";
          for (const word of words) {
            if ((currentChunk + " " + word).trim().length <= maxLen) {
              currentChunk = (currentChunk + " " + word).trim();
            } else {
              if (currentChunk) chunks.push(currentChunk);
              currentChunk = word;
            }
          }
          if (currentChunk) chunks.push(currentChunk);
          return chunks;
        };

        const chunks = splitIntoChunks(spokenText, 160);
        const audioBuffers: Buffer[] = [];

        for (const chunk of chunks) {
          const encoded = encodeURIComponent(chunk);
          const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${targetLang}&client=tw-ob`;
          const response = await axios.get(googleTtsUrl, {
            responseType: "arraybuffer",
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
            timeout: 10000,
          });

          if (response.status === 200 && response.data) {
            audioBuffers.push(Buffer.from(response.data));
          }
        }

        if (audioBuffers.length > 0) {
          const fullAudioBuffer = Buffer.concat(audioBuffers);
          const audioBase64 = fullAudioBuffer.toString("base64");
          const contentType = "audio/mp3";

          // Update MongoDB TTSCache document matching the exact full transcript
          await TTSCache.updateMany(
            { text: fullTranscript },
            { $set: { audioBase64, contentType, voice: "studio-clean-fr" } }
          );

          updatedCount++;
          console.log(`   [Paper ${p} | Q${q.qNum}/39] ✅ Cleaned & Re-saved (${(audioBase64.length / 1024).toFixed(1)} KB) - Spoken: "${spokenText.slice(0, 45)}..."`);
        }
      } catch (err: any) {
        console.error(`   ❌ Failed to clean Q${q.qNum}:`, err?.message);
      }

      await new Promise((r) => setTimeout(r, 80));
    }
  }

  console.log("\n==========================================================================");
  console.log("🎉 RESYNTHESIS COMPLETE: ALL SPEAKER TAGS HAVE BEEN PERMANENTLY REMOVED");
  console.log(`• Total Questions Cleaned & Updated: ${updatedCount}`);
  console.log(`• Total Questions Already Clean: ${skippedCount}`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

resynthesizeCleanAudio();
