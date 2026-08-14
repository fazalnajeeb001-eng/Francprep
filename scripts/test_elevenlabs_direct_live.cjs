const { MongoClient } = require("mongodb");
const https = require("https");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

function synthesizeSegment(text, voiceId, apiKey) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.8 }
    });

    const req = https.request({
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${voiceId}`,
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
        "Content-Length": Buffer.byteLength(postData)
      }
    }, (res) => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`ElevenLabs status ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function extractMpegPayload(buf) {
  if (!buf || buf.length < 10) return buf;
  if (buf.slice(0, 3).toString() === 'ID3') {
    const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    const audioStart = 10 + tagSize;
    if (audioStart < buf.length) {
      return buf.slice(audioStart);
    }
  }
  return buf;
}

function stitchMp3Buffers(buffers) {
  if (!buffers || buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];
  const firstBuf = buffers[0];
  let id3Header = Buffer.alloc(0);
  if (firstBuf.slice(0, 3).toString() === 'ID3') {
    const b0 = firstBuf[6], b1 = firstBuf[7], b2 = firstBuf[8], b3 = firstBuf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    id3Header = firstBuf.slice(0, 10 + tagSize);
  }
  const rawPayloads = buffers.map(b => extractMpegPayload(b));
  return Buffer.concat([id3Header, ...rawPayloads]);
}

async function run() {
  console.log("=== 🚀 TESTING DIRECT MULTI-VOICE SYNTHESIS & MONGODB PERMANENT CACHING ===");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const s = await db.collection("settings").findOne();
  const apiKey = s?.elevenLabsApiKey;

  if (!apiKey) {
    console.error("No API key");
    await client.close();
    return;
  }

  // 1. Synthesize Speaker 1 (George - JBFqnCBsd6RMkjVDRZzb)
  console.log("Synthesizing George (Male 1)...");
  const b1 = await synthesizeSegment("Bonjour madame, est-ce que ce train dessert bien la gare centrale ?", "JBFqnCBsd6RMkjVDRZzb", apiKey);
  console.log(`✓ George: ${b1.length} bytes`);

  // 2. Synthesize Speaker 2 (Alice - Xb7hH8MSUJpSbSDYk0k2)
  console.log("Synthesizing Alice (Female 1)...");
  const b2 = await synthesizeSegment("Oui monsieur, il part dans cinq minutes au quai numéro trois.", "Xb7hH8MSUJpSbSDYk0k2", apiKey);
  console.log(`✓ Alice: ${b2.length} bytes`);

  // 3. Synthesize Announcer (Sarah - EXAVITQu4vr4xnSDxMaL)
  console.log("Synthesizing Sarah (Announcer)...");
  const b3 = await synthesizeSegment("Écoutez la question. Question N°5 : Où se rend ce train ? ... A : À la mairie. ... B : À la gare centrale.", "EXAVITQu4vr4xnSDxMaL", apiKey);
  console.log(`✓ Sarah: ${b3.length} bytes`);

  // Stitch them together
  const stitched = stitchMp3Buffers([b1, b2, b3]);
  console.log(`\n🎉 Stitched Multi-Speaker MP3: ${stitched.length} bytes`);

  // Save into MongoDB TTSCache
  const crypto = require("crypto");
  const text = "Locuteur : Bonjour madame, est-ce que ce train dessert bien la gare centrale ?\nLocutrice : Oui monsieur, il part dans cinq minutes au quai numéro trois.\nAnnonceuse : Écoutez la question. Question N°5 : Où se rend ce train ?\n... A : À la mairie.\n... B : À la gare centrale.";
  const textHash = crypto.createHash('md5').update(`${text.trim().toLowerCase()}_female_fr_elevenlabs__1_v10_multispeaker_frame_stitched`).digest('hex');

  console.log(`\nStoring in MongoDB Atlas (ttscaches)... Hash: ${textHash}`);
  await db.collection("ttscaches").updateOne(
    { textHash },
    {
      $set: {
        textHash,
        text,
        voice: "elevenlabs-multi-voice",
        gender: "female",
        audioBase64: stitched.toString('base64'),
        contentType: "audio/mp3",
        createdAt: new Date()
      }
    },
    { upsert: true }
  );

  console.log("✅ Successfully saved into MongoDB Atlas!");

  // Verify instant retrieval from MongoDB
  const retrieved = await db.collection("ttscaches").findOne({ textHash });
  console.log(`\n⚡ Instant MongoDB Retrieval: ${Math.round(retrieved.audioBase64.length / 1024)} kB MP3 loaded with 0 API calls!`);

  await client.close();
}

run().catch(console.error);
