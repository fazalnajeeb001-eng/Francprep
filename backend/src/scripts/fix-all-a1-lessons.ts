import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("No MONGODB_URI");
  await mongoose.connect(uri);
  const db = mongoose.connection.db!;

  console.log("=== FIXING & PUBLISHING ALL A1 LESSONS ===");

  // 1. Fetch all A1 drafts
  const drafts = await db.collection('drafts').find({ level: 'A1' }).toArray();
  console.log(`Found ${drafts.length} A1 drafts.`);

  // 2. Fetch all chapters
  const chapters = await db.collection('chapters').find({}).toArray();
  const modules = await db.collection('modules').find({}).toArray();
  const courses = await db.collection('courses').find({}).toArray();

  // Map course _id -> level
  const courseLevelMap: Record<string, string> = {};
  for (const c of courses) {
    courseLevelMap[c._id.toString()] = c.level;
  }

  // Map module _id -> level
  const moduleLevelMap: Record<string, string> = {};
  for (const m of modules) {
    const lvl = courseLevelMap[m.courseId?.toString()];
    if (lvl) moduleLevelMap[m._id.toString()] = lvl;
  }

  // Map chapter slug (e.g. "a1-ch1") -> chapter _id
  const chapterSlugMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const ch of chapters) {
    const lvl = moduleLevelMap[ch.moduleId?.toString()] || 'A1';
    const chNum = ch.order || 1;
    const slugKey = `${lvl.toLowerCase()}-ch${chNum}`;
    chapterSlugMap[slugKey] = ch._id as any;
  }

  let publishedCount = 0;
  for (const d of drafts) {
    let canonical = d.parsedData;
    if (!canonical || !canonical.lessonId) continue;

    const lessonId = canonical.lessonId || d.lessonId;
    const match = lessonId.match(/^(a0|a1|a2|b1|b2|c1|c2)-ch(\d+)-l(\d+)$/i);
    let targetChId = d.chapterId;
    if (match) {
      const slugKey = `${match[1].toLowerCase()}-ch${match[2]}`;
      if (chapterSlugMap[slugKey]) {
        targetChId = chapterSlugMap[slugKey];
      }
    }

    const orderNum = parseInt((lessonId.match(/l(\d+)/i) || [])[1], 10) || 1;

    const lessonPayload = {
      lessonId: lessonId,
      chapterId: targetChId,
      title: canonical.title || d.title,
      level: canonical.level || d.level || 'A1',
      order: orderNum,
      anchorSkill: canonical.anchorSkill || 'grammar',
      durationMinutes: canonical.durationMinutes || 30,
      warmUp: canonical.warmUp,
      explanation: canonical.explanation,
      vocabItems: canonical.vocabulary || canonical.vocabItems,
      grammar: canonical.grammar,
      grammarDrills: canonical.grammarDrills,
      reading: canonical.reading,
      listening: canonical.listening,
      speaking: canonical.speaking,
      writing: canonical.writing,
      practiceExercises: canonical.practiceExercises,
      miniReview: canonical.miniReview,
      selfAssessment: canonical.selfAssessment,
      isPublished: true,
      canonical,
      updatedAt: new Date(),
    };

    // Upsert into lessons collection
    await db.collection('lessons').updateOne(
      { lessonId: lessonId },
      { $set: lessonPayload, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    // Update draft status to published
    await db.collection('drafts').updateOne(
      { _id: d._id },
      { $set: { status: 'published', publishedAt: new Date(), publishedBy: 'admin' } }
    );

    console.log(`Published ${lessonId}: "${canonical.title}" -> Chapter ${targetChId}`);
    publishedCount++;
  }

  console.log(`\nSuccessfully compiled & published ${publishedCount} A1 lessons!`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
