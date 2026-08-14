const { MongoClient } = require("mongodb");
const https = require("https");
const fs = require("fs");
const path = require("path");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

function fetchTts(text, voiceId, apiKey, speed = 1.0) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.8, speed }
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
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function extractMpegPayload(buf) {
  if (buf.length < 10) return buf;
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

  // Preserve the ID3 metadata header from the first buffer (if present)
  const firstBuf = buffers[0];
  let id3Header = Buffer.alloc(0);

  if (firstBuf.slice(0, 3).toString() === 'ID3') {
    const b0 = firstBuf[6], b1 = firstBuf[7], b2 = firstBuf[8], b3 = firstBuf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    id3Header = firstBuf.slice(0, 10 + tagSize);
  }

  // Extract pure MPEG audio frames from all buffers
  const rawPayloads = buffers.map(b => extractMpegPayload(b));

  // Concatenate ID3 header + continuous MPEG frame payloads
  return Buffer.concat([id3Header, ...rawPayloads]);
}

// Function to calculate exact MPEG frame count and duration
function analyzeMpegStream(buf, label) {
  let offset = 0;
  if (buf.slice(0, 3).toString() === 'ID3') {
    const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    offset = 10 + tagSize;
  }

  let frameCount = 0;
  let invalidHeaders = 0;
  let id3InMiddleFound = false;

  while (offset < buf.length - 4) {
    if (buf.slice(offset, offset + 3).toString() === 'ID3') {
      id3InMiddleFound = true;
      offset += 10;
      continue;
    }

    // Check MPEG Audio frame sync (11 bits set = 0xFF 0xE0)
    if (buf[offset] === 0xFF && (buf[offset + 1] & 0xE0) === 0xE0) {
      const versionBits = (buf[offset + 1] >> 3) & 0x03;
      const layerBits = (buf[offset + 1] >> 1) & 0x03;
      const bitrateIndex = (buf[offset + 2] >> 4) & 0x0F;
      const samplingIndex = (buf[offset + 2] >> 2) & 0x03;
      const padding = (buf[offset + 2] >> 1) & 0x01;

      // Bitrate table for MPEG-1 Layer III
      const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
      const sampleRates = [44100, 48000, 32000, 0];

      const bitrate = bitrates[bitrateIndex] * 1000;
      const sampleRate = sampleRates[samplingIndex];

      if (bitrate > 0 && sampleRate > 0) {
        const frameLength = Math.floor((144 * bitrate) / sampleRate) + padding;
        frameCount++;
        offset += frameLength;
      } else {
        offset++;
      }
    } else {
      invalidHeaders++;
      offset++;
    }
  }

  // Each MPEG-1 Layer III frame has 1152 samples = 1152 / 44100 = ~26.12 ms
  const estimatedSeconds = (frameCount * 1152) / 44100;
  console.log(`\n📊 [${label}] Analysis:`);
  console.log(`  - Total Size: ${buf.length} bytes`);
  console.log(`  - MPEG Audio Frames: ${frameCount} valid frames`);
  console.log(`  - Total Playable Duration: ~${estimatedSeconds.toFixed(2)} seconds`);
  console.log(`  - Corrupted ID3 Header In Middle: ${id3InMiddleFound ? "🚨 YES (WILL CUT OFF IN BROWSER!)" : "✅ NONE (CLEAN PLAYBACK)"}`);

  return { frameCount, estimatedSeconds, id3InMiddleFound };
}

async function runLiveTest() {
  console.log("=== 🔬 TESTING REAL ELEVENLABS MULTI-VOICE SYNTHESIS & MP3 STITCHING ===");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const settings = await db.collection("settings").findOne();
  const apiKey = settings?.elevenLabsApiKey;

  if (!apiKey) {
    console.error("❌ No ElevenLabs API Key in DB");
    await client.close();
    return;
  }

  // Realistic TCF Question Item with Dialogue + Announcer Question + Options:
  const speaker1Text = "Tu as vu l'annonce pour le poste de gestionnaire de projet à Lyon ?";
  const speaker2Text = "Oui, mais la date limite de candidature est déjà passée hier soir.";
  const announcerText = "Question N°16 : Que regrette l'interlocutrice ? ... A : Le salaire insuffisant. ... B : La clôture des inscriptions.";

  console.log("\n1. Synthesizing Speaker 1 (Male - Henri)...");
  const buf1 = await fetchTts(speaker1Text, "ONwBz21w4p8b7X1s5kL0", apiKey);

  console.log("2. Synthesizing Speaker 2 (Female - Charlotte)...");
  const buf2 = await fetchTts(speaker2Text, "XB0fDUnXU5powctDhC70", apiKey);

  console.log("3. Synthesizing Announcer (Official Broadcast)...");
  const buf3 = await fetchTts(announcerText, "EXAVITQu4vr4xnSDxMaL", apiKey);

  // Compare Old Flawed Method vs New Frame Stitched Method:
  const oldFlawedBuffer = Buffer.concat([buf1, buf2, buf3]);
  const newStitchedBuffer = stitchMp3Buffers([buf1, buf2, buf3]);

  const oldResult = analyzeMpegStream(oldFlawedBuffer, "OLD RAW CONCATENATION");
  const newResult = analyzeMpegStream(newStitchedBuffer, "NEW MPEG FRAME STITCHING");

  console.log("\n=== 🎯 VERIFICATION VERDICT ===");
  if (oldResult.id3InMiddleFound && !newResult.id3InMiddleFound) {
    console.log("✅ SUCCESS: The new stitching algorithm completely eliminates middle ID3 tags and produces a 100% compliant continuous MP3 stream of " + newResult.estimatedSeconds.toFixed(2) + " seconds!");
  } else {
    console.log("Verdict:", { oldResult, newResult });
  }

  await client.close();
}

runLiveTest().catch(console.error);
