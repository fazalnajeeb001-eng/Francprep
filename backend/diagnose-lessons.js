/**
 * DIAGNOSTIC SCRIPT — Check lesson/chapter linkage in MongoDB
 * Run: node diagnose-lessons.js
 * This script READS ONLY — no changes are made to the database.
 */
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  console.log('🔍 FrancPrep Lesson Diagnostic\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  // 1. Check all chapters
  const chapters = await db.collection('chapters').find({}).sort({ order: 1 }).toArray();
  console.log(`📚 Found ${chapters.length} chapters total\n`);

  for (const ch of chapters) {
    console.log(`── Chapter: "${ch.title}" (order: ${ch.order})`);
    console.log(`   _id: ${ch._id}`);
    console.log(`   isPublished: ${ch.isPublished}`);
    console.log(`   moduleId: ${ch.moduleId}`);
    console.log(`   lessons array: [${(ch.lessons || []).map(id => id.toString()).join(', ')}] (${(ch.lessons || []).length} IDs)`);

    // Find lessons by chapterId
    const lessonsByChapterId = await db.collection('lessons').find({ chapterId: ch._id }).sort({ order: 1 }).toArray();
    console.log(`   lessons found by chapterId: ${lessonsByChapterId.length}`);

    for (const lesson of lessonsByChapterId) {
      console.log(`     ✓ Lesson "${lesson.title}" (order: ${lesson.order})`);
      console.log(`       isPublished: ${lesson.isPublished}`);
      console.log(`       sections: ${(lesson.sections || []).length} (${(lesson.sections || []).map(s => s.type).join(', ')})`);
      console.log(`       chapterId matches: ${lesson.chapterId?.toString() === ch._id.toString()}`);

      // Check exercises
      const exercises = await db.collection('exercises').find({ lessonId: lesson._id }).toArray();
      console.log(`       exercises: ${exercises.length}`);
    }

    // Check if lessons array matches chapterId query
    const lessonsInArray = (ch.lessons || []).length;
    const lessonsByQuery = lessonsByChapterId.length;
    const match = lessonsInArray === lessonsByQuery;
    console.log(`   ⚠ Array count (${lessonsInArray}) vs query count (${lessonsByQuery}): ${match ? '✅ MATCH' : '❌ MISMATCH'}`);

    // Check isPublished consistency
    const publishedLessons = lessonsByChapterId.filter(l => l.isPublished);
    console.log(`   📝 Published lessons: ${publishedLessons.length}/${lessonsByQuery}`);

    console.log('');
  }

  // 2. Check total counts
  const totalLessons = await db.collection('lessons').countDocuments();
  const publishedLessons = await db.collection('lessons').countDocuments({ isPublished: true });
  const totalExercises = await db.collection('exercises').countDocuments();
  const totalChapters = await db.collection('chapters').countDocuments();
  const publishedChapters = await db.collection('chapters').countDocuments({ isPublished: true });

  console.log('📊 Summary:');
  console.log(`   Chapters: ${totalChapters} total, ${publishedChapters} published`);
  console.log(`   Lessons: ${totalLessons} total, ${publishedLessons} published`);
  console.log(`   Exercises: ${totalExercises} total`);

  // 3. Check for orphaned lessons (lessons with chapterId pointing to non-existent chapter)
  const allLessons = await db.collection('lessons').find({}).toArray();
  const chapterIds = new Set(chapters.map(c => c._id.toString()));
  const orphaned = allLessons.filter(l => l.chapterId && !chapterIds.has(l.chapterId.toString()));
  if (orphaned.length > 0) {
    console.log(`\n⚠️  Orphaned lessons (${orphaned.length}):`);
    for (const l of orphaned) {
      console.log(`   "${l.title}" → chapterId ${l.chapterId} (not found)`);
    }
  }

  // 4. Check courses/modules
  const courses = await db.collection('courses').find({}).toArray();
  const modules = await db.collection('modules').find({}).toArray();
  console.log(`\n📖 Courses: ${courses.length}, Modules: ${modules.length}`);
  for (const c of courses) {
    console.log(`   Course: "${c.title || c.name}" — level: ${c.level}`);
  }
  for (const m of modules) {
    console.log(`   Module: "${m.title || m.name}" — courseId: ${m.courseId}`);
  }

  mongoose.disconnect();
  console.log('\n✅ Diagnostic complete');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
