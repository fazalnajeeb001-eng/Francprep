import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { getExamRegistry, ExamPaper, ExamSection, ExamQuestion } from '../../../src/lib/examSchema';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

function getHash(text: string, gender: string, lang: string, provider: string, voiceId: string = '', rate: number = 1.0): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}_${provider}_${voiceId}_${rate}_v9_speed`).digest('hex');
}

async function seed() {
  console.log('🎙️ Starting Multi-Account 10,000 Credit Rotating ElevenLabs Audio Seeder...');
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB host: ${mongoose.connection.host}`);

  let settings: any = null;
  try {
    settings = await Settings.findOne().lean();
  } catch {}

  // Extract API keys from CLI arguments, env var ELEVENLABS_API_KEYS, or single ELEVENLABS_API_KEY
  const args = process.argv.slice(2);
  let keysInput = args.find(a => a.startsWith('--keys='))?.split('=')[1] || process.env.ELEVENLABS_API_KEYS || process.env.ELEVENLABS_API_KEY || settings?.elevenLabsApiKey || '';

  const apiKeys = keysInput.split(',').map(k => k.trim().replace(/^["']|["']$/g, '')).filter(k => k && !k.includes('...'));

  if (apiKeys.length === 0) {
    console.warn('\n⚠️ No valid ElevenLabs API Key(s) provided.');
    console.warn('How to run with multiple 10,000-credit accounts:');
    console.warn('  npx tsx backend/src/scripts/seed-listening-elevenlabs-cache.ts --keys=KEY_1,KEY_2,KEY_3,KEY_4,KEY_5,KEY_6,KEY_7,KEY_8');
    const totalCacheDocs = await TTSCache.countDocuments();
    console.log(`\nCurrent TTSCache Collection Count: ${totalCacheDocs} documents.`);
    await mongoose.disconnect();
    return;
  }

  console.log(`Loaded ${apiKeys.length} ElevenLabs API Key(s) for multi-account credit rotation.`);

  const femaleVoice = settings?.selectedElevenLabsFemaleVoice || '21m00Tcm4TlvDq8ikWAM';
  const maleVoice = settings?.selectedElevenLabsMaleVoice || 'ErXwobaYiN019PkySvjV';

  let currentKeyIdx = 0;
  let currentKeyUsedChars = 0;
  const KEY_CREDIT_BUDGET = 9800; // 9,800 characters per account (10k buffer)

  const registry = getExamRegistry();
  let totalProcessed = 0;
  let totalCached = 0;
  let totalSkipped = 0;

  for (const paper of registry.slice(0, 10)) { // 10 TCF Papers
    const listeningSec = paper.sections.find((s: ExamSection) => s.type === 'COMPREHENSION_ORALE');
    if (!listeningSec || !listeningSec.questions) continue;

    for (const q of listeningSec.questions) {
      totalProcessed++;
      const fullText = q.transcript || q.text;
      if (!fullText) continue;

      const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        const cleanLine = line.replace(/^(Locuteur|Locutrice|Annonceur|Annonceuse)\s*:\s*/i, '').trim();
        if (!cleanLine) continue;

        const isMale = /\b(Locuteur|Annonceur)\b/i.test(line);
        const gender: 'male' | 'female' = isMale ? 'male' : 'female';
        const voiceId = isMale ? maleVoice : femaleVoice;
        const rate = q.questionNumber <= 7 ? 0.85 : q.questionNumber <= 15 ? 0.92 : q.questionNumber <= 25 ? 1.00 : q.questionNumber <= 33 ? 1.15 : 1.30;

        const textHash = getHash(cleanLine, gender, 'fr', 'elevenlabs', voiceId, rate);

        // Check if line already exists in MongoDB
        const existing = await TTSCache.findOne({ $or: [{ textHash }, { text: cleanLine }] }).maxTimeMS(1500);
        if (existing) {
          totalSkipped++;
          continue;
        }

        // Check key character budget limit
        if (currentKeyUsedChars + cleanLine.length > KEY_CREDIT_BUDGET) {
          console.log(`\n💳 Key #${currentKeyIdx + 1} reached character budget (~${currentKeyUsedChars} / ${KEY_CREDIT_BUDGET} chars).`);
          currentKeyIdx++;
          currentKeyUsedChars = 0;
          if (currentKeyIdx >= apiKeys.length) {
            console.warn('⚠️ All provided ElevenLabs API Keys have reached their 10,000 credit budget!');
            console.warn('Progress is saved in MongoDB! You can run the script again with your next set of keys anytime.');
            await mongoose.disconnect();
            return;
          }
          console.log(`🔄 Rotated to Key #${currentKeyIdx + 1} of ${apiKeys.length}...`);
        }

        let success = false;
        while (!success && currentKeyIdx < apiKeys.length) {
          const apiKey = apiKeys[currentKeyIdx];
          try {
            console.log(`[Key ${currentKeyIdx + 1}/${apiKeys.length}] Q${q.questionNumber} (${paper.id}): Synthesizing "${cleanLine.slice(0, 30)}..." (${cleanLine.length} chars)`);
            const res = await axios.post(
              `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
              {
                text: cleanLine,
                model_id: 'eleven_multilingual_v2',
                voice_settings: { stability: 0.55, similarity_boost: 0.80, style: 0.20, use_speaker_boost: true, speed: Math.min(1.2, Math.max(0.7, rate)) },
              },
              {
                headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
                responseType: 'arraybuffer',
                timeout: 30000,
              }
            );

            if (res.status === 200 && res.data) {
              const audioBase64 = Buffer.from(res.data).toString('base64');
              await TTSCache.create({
                textHash,
                text: cleanLine,
                voice: `elevenlabs-${voiceId}`,
                gender,
                audioBase64,
                contentType: 'audio/mp3',
              });
              totalCached++;
              currentKeyUsedChars += cleanLine.length;
              success = true;
            }
          } catch (err: any) {
            let status = err?.response?.status;
            console.warn(`[Key ${currentKeyIdx + 1} Error (${status})]: ${err?.message}`);

            // Quota / Auth error -> Auto-rotate to next key!
            if (status === 401 || status === 429 || status === 402) {
              console.log(`🔄 Key #${currentKeyIdx + 1} quota exhausted (${status}). Auto-switching to Key #${currentKeyIdx + 2}...`);
              currentKeyIdx++;
              currentKeyUsedChars = 0;
            } else {
              break; // Skip line on unexpected non-quota error
            }
          }
        }
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`✅ MULTI-ACCOUNT ELEVENLABS SEEDING COMPLETE!`);
  console.log(`======================================================`);
  console.log(`Total Questions Analyzed:        ${totalProcessed}`);
  console.log(`Already Cached (Skipped):       ${totalSkipped}`);
  console.log(`Newly Synthesized to MongoDB:   ${totalCached}`);

  await mongoose.disconnect();
}

seed().catch(console.error);
