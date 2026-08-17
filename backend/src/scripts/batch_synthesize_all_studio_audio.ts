import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import TTSCache from '../models/TTSCache';
import { generateEdgeNeuralAudio } from '../services/edgeTts.service';
import { stripSpeakerLabels } from '../services/tts.service';
import { MASTER_SPEAKING_BANK } from '../../../src/lib/speakingMasterBank';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

function getHash(text: string, gender: string = 'female', lang: string = 'fr', rate: number = 1.0): string {
  const normText = (text || '').trim().toLowerCase().replace(/[.,!?;:\s]+/g, ' ');
  const normGender = (gender || 'female').toLowerCase();
  return crypto.createHash('md5').update(`${normText}_${normGender}`).digest('hex');
}

async function runMasterSynthesis() {
  console.log('🎙️ =========================================================================');
  console.log('🚀 MASTER STUDIO MULTI-VOICE PRE-CACHING SUITE (390 LISTENING + 44 SPEAKING)');
  console.log('🎙️ =========================================================================\n');

  await mongoose.connect(MONGODB_URI);
  console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}\n`);

  // PART 1: 390 LISTENING QUESTIONS
  const transcriptsPath = path.resolve(__dirname, '../../listening_transcripts.json');
  if (!fs.existsSync(transcriptsPath)) {
    console.error('❌ listening_transcripts.json not found!');
    await mongoose.disconnect();
    return;
  }

  const transcripts = JSON.parse(fs.readFileSync(transcriptsPath, 'utf-8'));
  let totalListeningSynthesized = 0;
  let totalListeningSkipped = 0;

  console.log('--- PHASE 1: BATCH SYNTHESIZING ALL 390 LISTENING QUESTIONS ---');

  for (let paperNum = 1; paperNum <= 10; paperNum++) {
    const list = transcripts[paperNum.toString()] || [];
    console.log(`\n📄 [Paper ${paperNum}/10] Processing ${list.length} Questions...`);

    const chunkSize = 6;
    for (let c = 0; c < list.length; c += chunkSize) {
      const chunk = list.slice(c, c + chunkSize);

      await Promise.all(chunk.map(async (item: any) => {
        const text = item.text.trim();
        const cleanSpoken = stripSpeakerLabels(text).trim();
        const isMale = /^(Locuteur|Homme|Annonceur)\b/i.test(text);
        const gender: 'female' | 'male' = isMale ? 'male' : 'female';
        const textHash = getHash(cleanSpoken, gender);

        const FORCE_REFRESH = true;

        if (!FORCE_REFRESH) {
          // Check if already in MongoDB with high quality Edge Neural audio
          const existing = await TTSCache.findOne({
            $or: [
              { textHash },
              { text: text, voice: { $regex: /^edge-neural/ } },
              { text: cleanSpoken, voice: { $regex: /^edge-neural/ } }
            ]
          }).lean();

          if (existing && existing.audioBase64 && existing.audioBase64.length > 500) {
            totalListeningSkipped++;
            process.stdout.write(`.`);
            return;
          }
        }

        // Synthesize with 8-Voice Studio Edge Neural Engine
        const res = await generateEdgeNeuralAudio(text, gender, 'fr', 1.0);

        if (res && res.audioBase64 && res.audioBase64.length > 500) {
          await TTSCache.deleteMany({
            $or: [
              { textHash },
              { text: text },
              { text: cleanSpoken }
            ]
          }).catch(() => {});

          await TTSCache.create({
            textHash,
            text: text,
            voice: res.provider,
            gender,
            audioBase64: res.audioBase64,
            contentType: 'audio/mp3'
          });

          totalListeningSynthesized++;
          process.stdout.write(`✓`);
        } else {
          console.warn(`\n⚠️ Failed to synthesize Paper ${paperNum} Q${item.qNum}`);
        }
      }));

      await new Promise((r) => setTimeout(r, 100));
    }
    console.log(`\n  ↳ Paper ${paperNum} Complete!`);
  }

  // PART 2: 44 SPEAKING EXAMINER PROMPTS
  console.log('\n--- PHASE 2: BATCH SYNTHESIZING ALL SPEAKING EXAMINER PROMPTS ---');
  let totalSpeakingSynthesized = 0;
  let totalSpeakingSkipped = 0;

  for (let p = 1; p <= 10; p++) {
    const tasks = MASTER_SPEAKING_BANK[p] || [];
    for (const t of tasks) {
      const promptsToRecord: { label: string; text: string; gender: 'female' | 'male' }[] = [
        { label: 'OpeningPrompt', text: t.examinerPersona?.openingPromptFrench || '', gender: (t.examinerPersona?.gender || 'female') as 'female' | 'male' }
      ];

      if (t.examinerPersona?.followUpCounterQuestion) {
        promptsToRecord.push({
          label: 'FollowUp',
          text: t.examinerPersona.followUpCounterQuestion,
          gender: (t.examinerPersona?.gender === 'female' ? 'male' : 'female') as 'female' | 'male'
        });
      }

      for (const pr of promptsToRecord) {
        if (!pr.text) continue;
        const cleanSpoken = stripSpeakerLabels(pr.text).trim();
        const textHash = getHash(cleanSpoken, pr.gender);

        const existing = await TTSCache.findOne({
          $or: [
            { textHash },
            { text: pr.text, voice: { $regex: /^edge-neural/ } },
            { text: cleanSpoken, voice: { $regex: /^edge-neural/ } }
          ]
        }).lean();

        if (existing && existing.audioBase64 && existing.audioBase64.length > 500) {
          totalSpeakingSkipped++;
          process.stdout.write(`.`);
          continue;
        }

        const res = await generateEdgeNeuralAudio(pr.text, pr.gender, 'fr', 1.0);
        if (res && res.audioBase64 && res.audioBase64.length > 500) {
          await TTSCache.deleteMany({
            $or: [
              { textHash },
              { text: pr.text },
              { text: cleanSpoken }
            ]
          }).catch(() => {});

          await TTSCache.create({
            textHash,
            text: pr.text,
            voice: res.provider,
            gender: pr.gender,
            audioBase64: res.audioBase64,
            contentType: 'audio/mp3'
          });

          totalSpeakingSynthesized++;
          process.stdout.write(`✓`);
        }
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  }

  console.log('\n\n======================================================');
  console.log('🎉 MASTER STUDIO PRE-CACHING COMPLETED SUCCESSFULLY!');
  console.log('======================================================');
  console.log(`Listening Questions Synthesized:  ${totalListeningSynthesized}`);
  console.log(`Listening Questions Cached/Skip:  ${totalListeningSkipped}`);
  console.log(`Speaking Prompts Synthesized:     ${totalSpeakingSynthesized}`);
  console.log(`Speaking Prompts Cached/Skip:     ${totalSpeakingSkipped}`);

  await mongoose.disconnect();
}

runMasterSynthesis().catch(console.error);
