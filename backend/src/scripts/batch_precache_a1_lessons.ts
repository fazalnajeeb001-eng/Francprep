import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import Lesson from "../models/Lesson";
import { generateNeuralAudio } from "../services/tts.service";

async function batchPrecacheA1Lessons() {
  console.log("==========================================================================");
  console.log("🚀 BATCH PRE-RECORDING AUDIO FOR ALL 80 A1 LESSONS (MALE & FEMALE VOICES)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  const a1Lessons = await Lesson.find({ level: "A1" }).sort({ order: 1 }).lean();
  console.log(`📚 Found ${a1Lessons.length} A1 Lessons in Database`);

  // Collect all unique French text strings in A1 lessons
  const textItems = new Set<string>();

  for (const rawL of a1Lessons) {
    const l: any = rawL;

    // Vocab items
    if (l.vocabItems && Array.isArray(l.vocabItems)) {
      for (const v of l.vocabItems) {
        if (v.french && v.french.trim()) textItems.add(v.french.trim());
        if (v.example && v.example.trim()) textItems.add(v.example.trim());
      }
    }

    // Dialogue lines
    if (l.dialogue && l.dialogue.lines && Array.isArray(l.dialogue.lines)) {
      for (const line of l.dialogue.lines) {
        const text = line.french || line.text || line.content || '';
        if (text && text.trim()) textItems.add(text.trim());
      }
    }

    // Speaking drill prompts
    if (l.speakingDrill && l.speakingDrill.prompts && Array.isArray(l.speakingDrill.prompts)) {
      for (const p of l.speakingDrill.prompts) {
        const text = p.french || p.prompt || p.text || '';
        if (text && text.trim()) textItems.add(text.trim());
      }
    }

    // Lesson content sections
    if (l.sections && Array.isArray(l.sections)) {
      for (const s of l.sections) {
        if (s.title && s.title.trim().length > 3) textItems.add(s.title.trim());
      }
    }
  }

  const uniqueStrings = Array.from(textItems);
  console.log(`🎯 Extracted ${uniqueStrings.length} Unique French Audio Items across all 80 A1 Lessons`);
  console.log(`🎙️ Total Audio Generations to execute (Female + Male): ${uniqueStrings.length * 2} files\n`);

  let femaleSuccess = 0;
  let maleSuccess = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (let i = 0; i < uniqueStrings.length; i++) {
    const text = uniqueStrings[i];
    console.log(`[${i + 1}/${uniqueStrings.length}] Processing: "${text.slice(0, 45)}..."`);

    // 1. Synthesize Female Voice
    try {
      const resFem = await generateNeuralAudio(text, "female", "fr", undefined, undefined, undefined, 0.9);
      if (resFem && resFem.audioBase64) {
        femaleSuccess++;
        totalBytes += Buffer.from(resFem.audioBase64, "base64").length;
      } else {
        failCount++;
      }
    } catch (e: any) {
      failCount++;
    }

    // 2. Synthesize Male Voice
    try {
      const resMale = await generateNeuralAudio(text, "male", "fr", undefined, undefined, undefined, 0.9);
      if (resMale && resMale.audioBase64) {
        maleSuccess++;
        totalBytes += Buffer.from(resMale.audioBase64, "base64").length;
      } else {
        failCount++;
      }
    } catch (e: any) {
      failCount++;
    }

    // Micro-delay
    await new Promise(r => setTimeout(r, 60));
  }

  console.log("\n==========================================================================");
  console.log("🎉 BATCH PRE-RECORDING FINISHED FOR ALL 80 A1 LESSONS");
  console.log(`• Female Voice Recordings: ${femaleSuccess} / ${uniqueStrings.length}`);
  console.log(`• Male Voice Recordings:   ${maleSuccess} / ${uniqueStrings.length}`);
  console.log(`• Total Cached Audio Data: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

batchPrecacheA1Lessons();
