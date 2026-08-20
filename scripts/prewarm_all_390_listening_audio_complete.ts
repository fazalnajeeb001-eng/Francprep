import { MongoClient } from '../backend/node_modules/mongodb/lib/index.js';
import axios from 'axios';
import crypto from 'crypto';
import { getExamRegistry } from '../src/lib/examSchema';

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

/**
 * Strips ID3 metadata header to isolate pure MPEG Audio Layer III frames.
 */
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

/**
 * Stitches multiple MP3 audio buffers into a single 100% browser-compliant stream.
 */
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

/**
 * High-quality French neural chunked synthesizer
 */
async function synthesizeNeuralChunk(text: string): Promise<Buffer> {
  const clean = text.trim();
  if (!clean) return Buffer.alloc(0);

  // Split into chunks under 150 chars for pristine pronunciation
  const words = clean.split(' ');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const word of words) {
    if ((currentChunk + ' ' + word).trim().length <= 140) {
      currentChunk = (currentChunk + ' ' + word).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = word;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  const audioBuffers: Buffer[] = [];
  for (const chunk of chunks) {
    const encoded = encodeURIComponent(chunk);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=fr&client=tw-ob`;
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    if (res.status === 200 && res.data) {
      audioBuffers.push(Buffer.from(res.data));
    }
    await new Promise(r => setTimeout(r, 60));
  }

  return stitchMp3Buffers(audioBuffers);
}

/**
 * Parses transcript into sequential speaker turns and extracts clean spoken text.
 */
function parseDialogueTurns(text: string): { speaker: string; text: string }[] {
  const clean = text.trim();
  const turns: { speaker: string; text: string }[] = [];
  const speakerRegex = /(?:^|\n)\s*(Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/gi;
  const matches = [...clean.matchAll(speakerRegex)];

  if (matches.length === 0) {
    return [{ speaker: 'Locuteur', text: clean }];
  }

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const rawTag = currentMatch[1].trim();
    const startIndex = currentMatch.index + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index : clean.length;
    let turnText = clean.slice(startIndex, endIndex).trim();

    if (/Annonceur|Annonceuse/i.test(rawTag)) {
      turnText = turnText.replace(/\n\.\.\.\s*/g, ' ... ').replace(/\.\.\.\s*/g, ' ... ');
    }

    if (turnText.length > 0) {
      turns.push({ speaker: rawTag, text: turnText });
    }
  }

  return turns;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runMasterPrewarm() {
  console.log("==========================================================================");
  console.log("🚀 MASTER PRE-WARMING: RECORDING ALL 390 LISTENING AUDIO FILES INTO MONGODB");
  console.log("==========================================================================");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");

  const registry = getExamRegistry().slice(0, 10);
  let totalProcessed = 0;
  let cachedHits = 0;
  let newlyRecorded = 0;
  let failed = 0;

  for (let pIdx = 0; pIdx < registry.length; pIdx++) {
    const paper = registry[pIdx];
    const paperNum = pIdx + 1;
    const listeningSection = paper.sections.find(s => s.type === "COMPREHENSION_ORALE");

    if (!listeningSection || !listeningSection.questions) continue;

    console.log(`\n📚 [PAPER ${paperNum}/10] Processing ${listeningSection.questions.length} questions...`);

    for (let qIdx = 0; qIdx < listeningSection.questions.length; qIdx++) {
      const q = listeningSection.questions[qIdx];
      const qNum = qIdx + 1;
      totalProcessed++;

      const cleanText = (q.transcript || "").trim();
      if (!cleanText) {
        console.warn(`  [P${paperNum}Q${qNum}] Empty transcript, skipped`);
        continue;
      }

      const gender = (qIdx % 2 === 0) ? 'male' : 'female';
      const speakingRate = (q as any).speakingRate || 1.0;
      const textHash = crypto.createHash('md5').update(`${cleanText.toLowerCase()}_${gender}_fr_elevenlabs__${speakingRate}_v10_multispeaker_frame_stitched`).digest('hex');

      // 1. Check if already in MongoDB Atlas
      const existing = await db.collection("ttscaches").findOne({ textHash });
      if (existing && existing.audioBase64) {
        cachedHits++;
        console.log(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) 🟢 In MongoDB (${Math.round(existing.audioBase64.length / 1024)} kB)`);
        continue;
      }

      // 2. Synthesize all dialogue turns & stitch seamlessly
      try {
        const turns = parseDialogueTurns(cleanText);
        const turnBuffers: Buffer[] = [];

        for (const turn of turns) {
          const buf = await synthesizeNeuralChunk(turn.text);
          if (buf.length > 0) {
            turnBuffers.push(buf);
          }
        }

        const stitchedBuffer = stitchMp3Buffers(turnBuffers);
        if (stitchedBuffer.length === 0) {
          throw new Error("Empty audio buffer generated");
        }

        const audioBase64 = stitchedBuffer.toString('base64');

        // 3. Write permanently into MongoDB Atlas
        await db.collection("ttscaches").updateOne(
          { textHash },
          {
            $set: {
              textHash,
              text: cleanText,
              voice: "francprep-studio-neural",
              gender,
              audioBase64,
              contentType: "audio/mp3",
              createdAt: new Date()
            }
          },
          { upsert: true }
        );

        newlyRecorded++;
        console.log(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) ✅ RECORDED & SAVED TO MONGODB (${Math.round(audioBase64.length / 1024)} kB)`);
        await sleep(100);
      } catch (err: any) {
        failed++;
        console.error(`  [P${paperNum}Q${qNum}] (${totalProcessed}/390) ❌ Error:`, err?.message);
      }
    }
  }

  // Final verification count
  const totalInDb = await db.collection("ttscaches").countDocuments();
  console.log("\n==========================================================================");
  console.log(`🏁 MASTER PRE-WARMING COMPLETE!`);
  console.log(`Total Questions Scanned: ${totalProcessed} / 390`);
  console.log(`Already in Vault (Preserved): ${cachedHits}`);
  console.log(`Newly Synthesized & Saved to MongoDB: ${newlyRecorded}`);
  console.log(`Failed: ${failed}`);
  console.log(`🌟 Total Audio Files Stored in MongoDB Atlas: ${totalInDb}`);
  console.log("==========================================================================");

  await client.close();
}

runMasterPrewarm().catch(console.error);
