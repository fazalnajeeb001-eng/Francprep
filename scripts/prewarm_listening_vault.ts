import { MongoClient } from '../backend/node_modules/mongodb/lib/index.js';
import https from 'https';
import crypto from 'crypto';
import { getExamRegistry } from '../src/lib/examSchema';

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

function synthesizeSegment(text: string, voiceId: string, apiKey: string, speed = 1.0): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.50, similarity_boost: 0.80, style: 0.15, use_speaker_boost: true, speed }
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
      },
      timeout: 35000
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`ElevenLabs HTTP ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
        }
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("ElevenLabs request timeout"));
    });
    req.write(postData);
    req.end();
  });
}

function extractMpegPayload(buf: Buffer): Buffer {
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

function stitchMp3Buffers(buffers: Buffer[]): Buffer {
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

interface DialogueSegment {
  speakerTag: string;
  voiceId: string;
  text: string;
}

function parseDialogueSegments(text: string, defaultGender: 'female' | 'male' = 'female'): DialogueSegment[] {
  const clean = text.trim();
  const segments: DialogueSegment[] = [];
  const speakerRegex = /(?:^|\n)\s*(Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/gi;
  const matches = [...clean.matchAll(speakerRegex)];

  const getVoiceForTag = (tag: string): string => {
    const lower = tag.toLowerCase();
    if (lower.includes('annonceuse')) return 'EXAVITQu4vr4xnSDxMaL'; // Sarah (Female Announcer)
    if (lower.includes('annonceur') || lower.includes('journaliste') || lower.includes('examinateur')) return 'onwK4e9ZLuTAKqWW03F9'; // Daniel (Male Announcer)
    if (lower.includes('locuteur 2') || lower.includes('homme 2')) return 'cjVigY5qzO86Huf0OWal'; // Eric (Male 2)
    if (lower.includes('locutrice 2') || lower.includes('femme 2')) return 'cgSgspJ2msm6clMCkdW9'; // Jessica (Female 2)
    if (lower.includes('locutrice') || lower.includes('femme')) return 'Xb7hH8MSUJpSbSDYk0k2'; // Alice (Female 1)
    return 'JBFqnCBsd6RMkjVDRZzb'; // George (Male 1)
  };

  if (matches.length === 0) {
    const isFemale = defaultGender === 'female' || /\b(locutrice|femme)\b/i.test(clean);
    return [{
      speakerTag: isFemale ? 'Locutrice' : 'Locuteur',
      voiceId: isFemale ? 'Xb7hH8MSUJpSbSDYk0k2' : 'JBFqnCBsd6RMkjVDRZzb',
      text: clean
    }];
  }

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const rawTag = currentMatch[1].trim();
    const startIndex = currentMatch.index + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : clean.length;
    let segmentText = clean.slice(startIndex, endIndex).trim();

    if (/Annonceur|Annonceuse/i.test(rawTag)) {
      segmentText = segmentText.replace(/\n\.\.\.\s*/g, ' ... ').replace(/\.\.\.\s*/g, ' ... ');
    }

    if (segmentText.length > 0) {
      segments.push({
        speakerTag: rawTag,
        voiceId: getVoiceForTag(rawTag),
        text: segmentText
      });
    }
  }

  return segments;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function prewarmVault() {
  console.log("=== 🏛️ PRE-WARMING MONGODB ATLAS AUDIO VAULT (ALL 390 LISTENING QUESTIONS) ===");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const s = await db.collection("settings").findOne();
  const apiKey = s?.elevenLabsApiKey;

  if (!apiKey) {
    console.error("❌ No ElevenLabs API Key in MongoDB");
    await client.close();
    return;
  }

  console.log("ElevenLabs API Key found:", `${apiKey.slice(0, 8)}...`);

  const papers = getExamRegistry().slice(0, 10);
  let totalProcessed = 0;
  let cachedHits = 0;
  let newlySynthesized = 0;
  let failedItems = 0;

  for (let pIdx = 0; pIdx < papers.length; pIdx++) {
    const paper = papers[pIdx];
    const paperNum = pIdx + 1;
    const listeningSection = paper.sections.find(sec => sec.type === "COMPREHENSION_ORALE");

    if (!listeningSection || !listeningSection.questions) continue;

    console.log(`\n📚 --- PROCESSING PAPER ${paperNum} / 10 (${listeningSection.questions.length} questions) ---`);

    for (let qIdx = 0; qIdx < listeningSection.questions.length; qIdx++) {
      const q = listeningSection.questions[qIdx];
      const qNum = qIdx + 1;
      totalProcessed++;

      const cleanText = (q.transcript || "").trim();
      if (!cleanText) {
        console.warn(`⚠️ [Paper ${paperNum} Q${qNum}] Empty transcript, skipping`);
        continue;
      }

      const gender = (qIdx % 2 === 0) ? 'male' : 'female';
      const speakingRate = (q as any).speakingRate || 1.0;
      const textHash = crypto.createHash('md5').update(`${cleanText.toLowerCase()}_${gender}_fr_elevenlabs__${speakingRate}_v10_multispeaker_frame_stitched`).digest('hex');

      // Check if already in MongoDB Atlas
      const existing = await db.collection("ttscaches").findOne({ textHash });
      if (existing && existing.audioBase64) {
        cachedHits++;
        console.log(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) 🟢 Already in Vault (${Math.round(existing.audioBase64.length / 1024)} kB)`);
        continue;
      }

      // Parse and synthesize
      const segments = parseDialogueSegments(cleanText, gender);
      try {
        console.log(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) 🎙️ Synthesizing ${segments.length} turns via ElevenLabs...`);
        const chunkBuffers: Buffer[] = [];

        for (let segIdx = 0; segIdx < segments.length; segIdx++) {
          const seg = segments[segIdx];
          const pauseSuffix = (segIdx < segments.length - 1) ? ' ... ' : '';
          const buf = await synthesizeSegment(seg.text + pauseSuffix, seg.voiceId, apiKey, speakingRate);
          chunkBuffers.push(buf);
          await sleep(200); // polite spacing
        }

        const stitched = stitchMp3Buffers(chunkBuffers);
        const audioBase64 = stitched.toString('base64');

        await db.collection("ttscaches").updateOne(
          { textHash },
          {
            $set: {
              textHash,
              text: cleanText,
              voice: segments.length > 1 ? "elevenlabs-multi-voice" : `elevenlabs-${segments[0]?.voiceId}`,
              gender,
              audioBase64,
              contentType: "audio/mp3",
              createdAt: new Date()
            }
          },
          { upsert: true }
        );

        newlySynthesized++;
        console.log(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) ✅ Saved to MongoDB Vault (${Math.round(audioBase64.length / 1024)} kB)`);
        await sleep(350);
      } catch (err: any) {
        failedItems++;
        console.error(`  [P${paperNum}Q${qNum}] ❌ Error:`, err?.message);
        await sleep(1000);
      }
    }
  }

  console.log("\n=== 🏁 PRE-WARMING BATCH SUMMARY ===");
  console.log(`Total Questions Checked: ${totalProcessed} / 390`);
  console.log(`Already in MongoDB (Instant Cache Hits): ${cachedHits}`);
  console.log(`Newly Recorded & Stored in MongoDB: ${newlySynthesized}`);
  console.log(`Failed Items: ${failedItems}`);

  await client.close();
}

prewarmVault().catch(console.error);
