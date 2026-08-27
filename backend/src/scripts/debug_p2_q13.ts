import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { generateListeningQuestions } from '../../../src/lib/examSchema';
import { generateNeuralAudio } from '../services/tts.service';

async function debugP2Q13() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  const questions = generateListeningQuestions(39, 'tcf2', 6);
  console.log("Paper 2 total questions:", questions.length);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = q.questionNumber || (i + 1);
    const text = (q.transcript || q.text || '').trim();
    const rate = (q as any).speakingRate || (qNum <= 7 ? 0.90 : qNum <= 15 ? 0.95 : qNum <= 25 ? 1.00 : qNum <= 33 ? 1.08 : qNum <= 36 ? 1.15 : 1.20);
    const gender = (text.toLowerCase().includes("annonceur:") || qNum % 2 === 0) ? "male" : "female";

    const res = await generateNeuralAudio(text, gender, "fr", undefined, undefined, undefined, rate);
    if (!res || !res.audioBase64) {
      console.error(`❌ FAILED: Q${qNum} (${rate}x | ${gender}): text="${text.substring(0, 40)}..."`);
    } else {
      console.log(`✅ OK: Q${qNum} (${rate}x | ${gender} | ${res.provider}): ${(Buffer.from(res.audioBase64, 'base64').length / 1024).toFixed(1)} KB`);
    }
  }

  await mongoose.disconnect();
}

debugP2Q13().catch(console.error);
