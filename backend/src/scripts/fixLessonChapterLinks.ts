/**
 * Fix script: Link all lessons to their correct chapters via chapterId.
 * The seedAllLessons script created lessons without chapterId — this fixes that.
 * Usage: cd backend && npx ts-node src/scripts/fixLessonChapterLinks.ts
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db!;
  console.log(`Connected to: ${mongoose.connection.host}\n`);

  // Step 1: Get all chapters and build a lookup: level+chapterNum -> chapter _id
  const chapters = await db.collection('chapters').find().toArray();
  console.log(`Found ${chapters.length} chapters`);

  // We need to map each chapter to its level.
  // Chapter -> Module -> Course -> level
  const moduleIds = [...new Set(chapters.map((ch: any) => ch.moduleId?.toString()).filter(Boolean))];
  const modules = await db.collection('modules').find({ _id: { $in: moduleIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).toArray();
  const courseIds = [...new Set(modules.map((m: any) => m.courseId?.toString()).filter(Boolean))];
  const courses = await db.collection('courses').find({ _id: { $in: courseIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).toArray();

  // Build maps
  const moduleToCourse: Record<string, string> = {};
  for (const m of modules) {
    moduleToCourse[m._id.toString()] = m.courseId?.toString();
  }
  const courseToLevel: Record<string, string> = {};
  for (const c of courses) {
    courseToLevel[c._id.toString()] = c.level;
  }

  // Build a chapter lookup: "level-chN" -> chapter _id
  // We need to figure out the chapter number within each level.
  // Group chapters by level, sort by order, assign chapterNum.
  const chaptersByLevel: Record<string, any[]> = {};
  for (const ch of chapters) {
    const modId = ch.moduleId?.toString();
    const courseId = moduleToCourse[modId];
    const level = courseToLevel[courseId];
    if (!level) continue;
    if (!chaptersByLevel[level]) chaptersByLevel[level] = [];
    chaptersByLevel[level].push(ch);
  }

  // Sort each level's chapters by order and assign chapterNum
  const chapterLookup: Record<string, mongoose.Types.ObjectId> = {}; // "a1-ch1" -> _id
  for (const [level, chs] of Object.entries(chaptersByLevel)) {
    chs.sort((a: any, b: any) => a.order - b.order);
    chs.forEach((ch: any, idx: number) => {
      const key = `${level.toLowerCase()}-ch${idx + 1}`;
      chapterLookup[key] = ch._id;
    });
    console.log(`  ${level}: ${chs.length} chapters mapped`);
  }

  console.log(`\nChapter lookup built: ${Object.keys(chapterLookup).length} entries\n`);

  // Step 2: Get all lessons and update their chapterId
  const lessons = await db.collection('lessons').find().toArray();
  console.log(`Found ${lessons.length} lessons\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const lesson of lessons) {
    const lessonId = lesson.lessonId;
    if (!lessonId) {
      skipped++;
      continue;
    }

    // Parse lessonId like "a1-ch1-l1" to extract level and chapterNum
    const match = lessonId.match(/^([a-z]\d+)-ch(\d+)-l(\d+)$/);
    if (!match) {
      console.log(`  ✗ Cannot parse lessonId: ${lessonId}`);
      errors++;
      continue;
    }

    const level = match[1].toUpperCase(); // "A1"
    const chapterNum = parseInt(match[2]);
    const lookupKey = `${level.toLowerCase()}-ch${chapterNum}`;
    const chapterId = chapterLookup[lookupKey];

    if (!chapterId) {
      console.log(`  ✗ No chapter found for ${lookupKey} (lesson: ${lessonId})`);
      errors++;
      continue;
    }

    // Skip if already linked
    if (lesson.chapterId && lesson.chapterId.toString() === chapterId.toString()) {
      skipped++;
      continue;
    }

    await db.collection('lessons').updateOne(
      { _id: lesson._id },
      { $set: { chapterId: chapterId } }
    );
    updated++;
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (already linked): ${skipped}`);
  console.log(`Errors: ${errors}`);

  // Verify: check lesson counts per chapter
  console.log(`\n=== VERIFICATION ===`);
  const verifyChapters = await db.collection('chapters').find().sort({ order: 1 }).toArray();
  for (const ch of verifyChapters) {
    const count = await db.collection('lessons').countDocuments({ chapterId: ch._id });
    if (count === 0) {
      console.log(`  ⚠ "${ch.title}" (${ch._id}): 0 lessons`);
    }
  }

  // Count lessons with no chapterId
  const orphans = await db.collection('lessons').countDocuments({ chapterId: { $exists: false } });
  const orphansNull = await db.collection('lessons').countDocuments({ chapterId: null });
  console.log(`\nLessons without chapterId: ${orphans + orphansNull}`);

  await mongoose.disconnect();
  console.log('\n✅ Fix complete!');
}

main().catch((err) => {
  console.error('❌ Fix failed:', err);
  process.exit(1);
});
