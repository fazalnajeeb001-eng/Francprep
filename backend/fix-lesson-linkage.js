/**
 * FIX SCRIPT — Repair lesson/chapter linkage in MongoDB
 * Run: node fix-lesson-linkage.js
 * 
 * This script:
 * 1. Finds lessons that have a chapterId but are NOT in the chapter's lessons array
 * 2. Adds them to the chapter's lessons array
 * 3. Optionally sets isPublished: true on lessons that are missing it
 * 
 * Usage:
 *   node fix-lesson-linkage.js              — dry run (shows what would change)
 *   node fix-lesson-linkage.js --apply      — apply changes
 *   node fix-lesson-linkage.js --publish    — also set isPublished: true on all lessons
 */
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep';

const APPLY = process.argv.includes('--apply');
const PUBLISH = process.argv.includes('--publish');

async function main() {
  console.log('🔧 FrancPrep Lesson Linkage Fix\n');
  console.log(`Mode: ${APPLY ? '✅ APPLY CHANGES' : '👀 DRY RUN (no changes)'}`);
  if (PUBLISH) console.log('📝 Will also set isPublished: true on all lessons');
  console.log('');

  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const chapters = await db.collection('chapters').find({}).toArray();
  let totalFixed = 0;
  let totalPublished = 0;

  for (const ch of chapters) {
    const lessonsInArray = (ch.lessons || []).map(id => id.toString());
    const lessonsByChapterId = await db.collection('lessons').find({ chapterId: ch._id }).toArray();
    const lessonIdsByQuery = lessonsByChapterId.map(l => l._id.toString());

    // Find lessons that exist by chapterId but are NOT in the chapter's lessons array
    const missingFromArrays = lessonIdsByQuery.filter(id => !lessonsInArray.includes(id));

    if (missingFromArrays.length > 0) {
      console.log(`📚 Chapter: "${ch.title}"`);
      console.log(`   Missing from lessons array: ${missingFromArrays.length} lessons`);

      for (const lesson of lessonsByChapterId) {
        if (missingFromArrays.includes(lesson._id.toString())) {
          console.log(`   → Adding: "${lesson.title}" (isPublished: ${lesson.isPublished})`);
        }
      }

      if (APPLY) {
        await db.collection('chapters').updateOne(
          { _id: ch._id },
          { $addToSet: { lessons: { $each: missingFromArrays.map(id => new mongoose.Types.ObjectId(id)) } } }
        );
        console.log(`   ✅ Fixed`);
      }
      totalFixed += missingFromArrays.length;
    }

    // Fix isPublished if requested
    if (PUBLISH) {
      const unpublished = lessonsByChapterId.filter(l => !l.isPublished);
      if (unpublished.length > 0) {
        console.log(`   📝 Publishing ${unpublished.length} unpublished lessons`);
        if (APPLY) {
          for (const lesson of unpublished) {
            await db.collection('lessons').updateOne(
              { _id: lesson._id },
              { $set: { isPublished: true } }
            );
          }
          console.log(`   ✅ Published`);
        }
        totalPublished += unpublished.length;
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Lessons to add to chapter arrays: ${totalFixed}`);
  if (PUBLISH) console.log(`   Lessons to publish: ${totalPublished}`);

  if (!APPLY && (totalFixed > 0 || totalPublished > 0)) {
    console.log(`\n⚠️  Run with --apply to make changes`);
    console.log(`   node fix-lesson-linkage.js --apply`);
    if (PUBLISH) console.log(`   node fix-lesson-linkage.js --apply --publish`);
  }

  if (APPLY) {
    console.log(`\n✅ Changes applied. Restart your backend server.`);
  }

  mongoose.disconnect();
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
