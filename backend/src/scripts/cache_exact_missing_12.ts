import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { generateListeningQuestions } from '../../../src/lib/examSchema';
import { generateNeuralAudio } from '../services/tts.service';
import TTSCache from '../models/TTSCache';

async function cacheExactMissing12() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB Atlas.");

  const targetPapers = [1, 2];
  let savedCount = 0;

  for (const p of targetPapers) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? (p * 3) : (p * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    // Q34 to Q39 (indices 33 to 38)
    for (let i = 33; i < 39; i++) {
      const q = questions[i];
      const qNum = q.questionNumber || (i + 1);
      const text = (q.transcript || q.text || '').trim();
      const rate = (q as any).speakingRate || (qNum <= 36 ? 1.15 : 1.20);
      const gender = (text.toLowerCase().includes("annonceur:") || text.toLowerCase().includes("locuteur:") || qNum % 2 === 0) ? "male" : "female";

      console.log(`🎙️ Synthesizing Paper ${p} Q${qNum} (${rate}x | ${gender}) natural studio audio...`);
      try {
        const res = await generateNeuralAudio(text, gender, "fr", "edge-neural", undefined, undefined, rate);
        if (res && res.audioBase64) {
          savedCount++;
          console.log(`   ✅ Saved Paper ${p} Q${qNum} (${(Buffer.from(res.audioBase64, 'base64').length / 1024).toFixed(1)} KB | ${res.provider})`);

          // Also save in 'test' database for complete cross-compatibility
          if (mongoose.connection.client) {
            const testDb = mongoose.connection.client.db('test');
            await testDb.collection('ttscaches').updateOne(
              { text },
              {
                $set: {
                  text,
                  gender,
                  voice: res.provider,
                  audioBase64: res.audioBase64,
                  contentType: 'audio/mp3'
                }
              },
              { upsert: true }
            );
          }
        }
      } catch (err: any) {
        console.error(`   ❌ Failed Paper ${p} Q${qNum}:`, err?.message || err);
      }
    }
  }

  console.log(`\n🎉 Successfully pre-synthesized and saved ${savedCount}/12 missing questions using natural studio voices!`);
  await mongoose.disconnect();
}

cacheExactMissing12().catch(console.error);
