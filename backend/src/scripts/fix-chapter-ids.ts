import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("No MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  if (!db) throw new Error("No DB");

  console.log("=== FIXING CHAPTER IDS ON LESSONS ===");

  const chapters = await db.collection('chapters').find({}).toArray();
  const lessons = await db.collection('lessons').find({}).toArray();
  const modules = await db.collection('modules').find({}).toArray();
  const courses = await db.collection('courses').find({}).toArray();

  console.log(`Found ${chapters.length} chapters, ${lessons.length} lessons, ${modules.length} modules, ${courses.length} courses.`);

  // Build map of course _id -> level
  const courseLevelMap: Record<string, string> = {};
  for (const c of courses) {
    courseLevelMap[c._id.toString()] = c.level;
  }

  // Build map of module _id -> level
  const moduleLevelMap: Record<string, string> = {};
  for (const m of modules) {
    const lvl = courseLevelMap[m.courseId?.toString()];
    if (lvl) moduleLevelMap[m._id.toString()] = lvl;
  }

  // Build map of (level + order) -> chapter _id
  const chapterSlugMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const ch of chapters) {
    const lvl = moduleLevelMap[ch.moduleId?.toString()] || 'A1';
    const chNum = ch.order || 1;
    const slugKey = `${lvl.toLowerCase()}-ch${chNum}`;
    chapterSlugMap[slugKey] = ch._id as any;
    console.log(`Chapter ${slugKey} -> ${ch._id} ("${ch.title}")`);
  }

  let updatedCount = 0;
  for (const l of lessons) {
    if (typeof l.chapterId === 'string' && l.chapterId.includes('-ch')) {
      const targetChId = chapterSlugMap[l.chapterId.toLowerCase()];
      if (targetChId) {
        await db.collection('lessons').updateOne(
          { _id: l._id },
          { $set: { chapterId: targetChId } }
        );
        console.log(`Fixed lesson ${l.lessonId || l._id} ("${l.title}"): ${l.chapterId} -> ${targetChId}`);
        updatedCount++;
      }
    }
  }

  console.log(`\nSuccessfully resolved ${updatedCount} lesson chapterId references to ObjectId!`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
