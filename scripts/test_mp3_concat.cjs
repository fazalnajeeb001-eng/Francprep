const { MongoClient } = require("mongodb");
const https = require("https");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

function fetchTts(text, voiceId, apiKey) {
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
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("francprep");
  const settings = await db.collection("settings").findOne();
  const apiKey = settings?.elevenLabsApiKey;
  console.log("ElevenLabs API Key found:", apiKey ? `${apiKey.slice(0, 8)}...` : "NONE");

  if (!apiKey) return;

  console.log("Fetching Part 1 (Passage - Henri)...");
  const buf1 = await fetchTts("Bonjour madame, je cherche la gare la plus proche.", "ONwBz21w4p8b7X1s5kL0", apiKey);
  console.log(`Part 1 size: ${buf1.length} bytes`);

  console.log("Fetching Part 2 (Announcer - Official)...");
  const buf2 = await fetchTts("Question N°5 : Où se rend cette personne ?", "EXAVITQu4vr4xnSDxMaL", apiKey);
  console.log(`Part 2 size: ${buf2.length} bytes`);

  function findId3AndFrames(buf, label) {
    console.log(`\n--- Inspecting ${label} ---`);
    console.log("First 16 bytes:", buf.slice(0, 16));
    if (buf.slice(0, 3).toString() === "ID3") {
      const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
      const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
      const audioStart = 10 + tagSize;
      console.log(`ID3 header detected: Tag Size = ${tagSize}, Audio payload starts at byte offset: ${audioStart}`);
      console.log("First 8 bytes of audio payload:", buf.slice(audioStart, audioStart + 8));
      return audioStart;
    }
    return 0;
  }

  const offset1 = findId3AndFrames(buf1, "Part 1");
  const offset2 = findId3AndFrames(buf2, "Part 2");

  // Show why standard Buffer.concat([buf1, buf2]) creates a corrupted stream:
  const rawConcat = Buffer.concat([buf1, buf2]);
  console.log(`\nRaw concatenated buffer size: ${rawConcat.length}`);
  console.log(`Byte at offset ${buf1.length} in concatenated stream: "${rawConcat.slice(buf1.length, buf1.length + 3).toString()}"`);
  if (rawConcat.slice(buf1.length, buf1.length + 3).toString() === "ID3") {
    console.log("🚨 CONFIRMED BUG: An 'ID3' header is embedded right in the middle of the audio stream at byte offset", buf1.length);
    console.log("   -> Most web browsers (Safari, Chrome) treat an ID3 header in the middle of MPEG stream as EOF or corrupted frame, causing playback to truncate and NOT play the question!");
  }

  // Proper MP3 Stitching:
  // Part 1 keeps its ID3 or we strip ID3 and stitch raw MPEG frames!
  const cleanFramesPart1 = buf1.slice(offset1);
  const cleanFramesPart2 = buf2.slice(offset2);
  const properlyStitched = Buffer.concat([buf1.slice(0, offset1), cleanFramesPart1, cleanFramesPart2]);
  console.log(`\nProperly stitched MP3: ${properlyStitched.length} bytes (starts with ID3 header, contains only continuous MPEG frames)`);

  await client.close();
}

run().catch(console.error);
