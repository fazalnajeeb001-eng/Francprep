import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import Lesson from "../models/Lesson";
import Chapter from "../models/Chapter";
import Vocabulary from "../models/Vocabulary";
import TTSCache from "../models/TTSCache";

async function auditAllAudioTargets() {
  console.log("==========================================================================");
  console.log("🔍 AUDITING ALL AUDIO TARGETS ACROSS ENTIRE PLATFORM (LESSONS + EXAMS)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  // 1. Lessons & Chapters
  const lessonsCount = await Lesson.countDocuments({});
  const chaptersCount = await Chapter.countDocuments({});
  const vocabCount = await Vocabulary.countDocuments({});
  const cachedCount = await TTSCache.countDocuments({});

  console.log(`\n📚 MongoDB Content Counts:`);
  console.log(`• Total Lessons in DB: ${lessonsCount}`);
  console.log(`• Total Chapters in DB: ${chaptersCount}`);
  console.log(`• Total Vocabulary Entities in DB: ${vocabCount}`);
  console.log(`• Total TTS Audio Items in DB: ${cachedCount}`);

  // Lessons breakdown by level
  const lessons = await Lesson.find({}).lean();
  const byLevel: Record<string, number> = {};
  let totalLessonAudioStrings = 0;

  for (const rawL of lessons) {
    const l: any = rawL;
    const lvl = l.level || 'A1';
    byLevel[lvl] = (byLevel[lvl] || 0) + 1;

    // Count audio strings in vocabItems, sections, dialogue
    if (l.vocabItems && Array.isArray(l.vocabItems)) {
      totalLessonAudioStrings += l.vocabItems.length * 2; // French word + example sentence
    }
    if (l.dialogue && l.dialogue.lines) {
      totalLessonAudioStrings += (l.dialogue.lines || []).length;
    }
    if (l.speakingDrill && l.speakingDrill.prompts) {
      totalLessonAudioStrings += (l.speakingDrill.prompts || []).length;
    }
    if (l.sections && Array.isArray(l.sections)) {
      for (const s of l.sections) {
        if (s.body && s.body.length > 5) totalLessonAudioStrings++;
      }
    }
  }

  console.log(`\n🎓 Lessons by Level:`);
  for (const [lvl, count] of Object.entries(byLevel)) {
    console.log(`   • Level ${lvl}: ${count} lessons`);
  }

  console.log(`\n🎯 Total Audio Target Strings in Lessons: ~${totalLessonAudioStrings.toLocaleString()} audio units`);

  console.log("==========================================================================");
  await mongoose.disconnect();
}

auditAllAudioTargets();
