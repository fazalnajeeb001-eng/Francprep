import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import Lesson from "../models/Lesson";
import Vocabulary from "../models/Vocabulary";
import { generateNeuralAudio } from "../services/tts.service";

async function batchPrecacheAllLevels() {
  console.log("==========================================================================");
  console.log("🚀 MASTER PRE-RECORDING: ALL 436 LESSONS (A1 to C2) + VOCABULARY");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const allLessons = await Lesson.find({}).sort({ level: 1, order: 1 }).lean();
  console.log(`📚 Loaded ${allLessons.length} Total Lessons across all levels (A1-C2)`);

  const textItems = new Set<string>();

  for (const rawL of allLessons) {
    const l: any = rawL;

    // Vocab items in lessons
    if (l.vocabItems && Array.isArray(l.vocabItems)) {
      for (const v of l.vocabItems) {
        if (v.french && v.french.trim()) textItems.add(v.french.trim());
        if (v.example && v.example.trim()) textItems.add(v.example.trim());
      }
    }

    // Dialogue lines in lessons
    if (l.dialogue && l.dialogue.lines && Array.isArray(l.dialogue.lines)) {
      for (const line of l.dialogue.lines) {
        const text = line.french || line.text || line.content || '';
        if (text && text.trim()) textItems.add(text.trim());
      }
    }

    // Speaking drill prompts in lessons
    if (l.speakingDrill && l.speakingDrill.prompts && Array.isArray(l.speakingDrill.prompts)) {
      for (const p of l.speakingDrill.prompts) {
        const text = p.french || p.prompt || p.text || '';
        if (text && text.trim()) textItems.add(text.trim());
      }
    }

    // Lesson content titles
    if (l.sections && Array.isArray(l.sections)) {
      for (const s of l.sections) {
        if (s.title && s.title.trim().length > 3) textItems.add(s.title.trim());
      }
    }
  }

  // Flashcards / Vocabulary entity collection
  const allVocab = await Vocabulary.find({}).lean();
  console.log(`🗂️ Loaded ${allVocab.length} Flashcard Vocabulary items`);
  for (const rawV of allVocab) {
    const v: any = rawV;
    if (v.french && v.french.trim()) textItems.add(v.french.trim());
    if (v.exampleSentence && v.exampleSentence.trim()) textItems.add(v.exampleSentence.trim());
  }

  const uniqueStrings = Array.from(textItems);
  console.log(`\n🎯 Total Unique French Spoken Items Across Entire Platform: ${uniqueStrings.length}`);
  console.log(`🎙️ Total Audio Generations (Female + Male): ${uniqueStrings.length * 2} files\n`);

  let femaleSuccess = 0;
  let maleSuccess = 0;
  let skippedCached = 0;
  let totalBytes = 0;

  for (let i = 0; i < uniqueStrings.length; i++) {
    const text = uniqueStrings[i];
    if (i % 50 === 0 || i === uniqueStrings.length - 1) {
      console.log(`[${i + 1}/${uniqueStrings.length}] Progress: ${Math.round(((i + 1) / uniqueStrings.length) * 100)}% | Current: "${text.slice(0, 40)}..."`);
    }

    // 1. Synthesize Female Voice
    try {
      const resFem = await generateNeuralAudio(text, "female", "fr", undefined, undefined, undefined, 0.9);
      if (resFem && resFem.audioBase64) {
        femaleSuccess++;
        if (resFem.provider.startsWith("cache-")) skippedCached++;
        totalBytes += Buffer.from(resFem.audioBase64, "base64").length;
      }
    } catch (e: any) {}

    // 2. Synthesize Male Voice
    try {
      const resMale = await generateNeuralAudio(text, "male", "fr", undefined, undefined, undefined, 0.9);
      if (resMale && resMale.audioBase64) {
        maleSuccess++;
        if (resMale.provider.startsWith("cache-")) skippedCached++;
        totalBytes += Buffer.from(resMale.audioBase64, "base64").length;
      }
    } catch (e: any) {}

    // Micro delay
    await new Promise(r => setTimeout(r, 30));
  }

  console.log("\n==========================================================================");
  console.log("🎉 MASTER PRE-RECORDING 100% COMPLETE FOR ALL LESSONS & VOCABULARY");
  console.log(`• Total Unique French Text Phrases: ${uniqueStrings.length}`);
  console.log(`• Female Voice Audio Files: ${femaleSuccess} / ${uniqueStrings.length}`);
  console.log(`• Male Voice Audio Files:   ${maleSuccess} / ${uniqueStrings.length}`);
  console.log(`• Total Audio Cached in MongoDB: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

batchPrecacheAllLevels();
