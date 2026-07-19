/**
 * MIGRATION: Fix exercise question field names
 * 
 * The seed script used `question` but the Exercise schema defines `text`.
 * This script renames `question` → `text` in all exercise questions.
 * 
 * Run: node migrate-exercise-questions.js
 * Dry run by default. Add --apply to make changes.
 */
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep';

const APPLY = process.argv.includes('--apply');

async function main() {
  console.log('🔧 Exercise Question Field Migration\n');
  console.log(`Mode: ${APPLY ? '✅ APPLY CHANGES' : '👀 DRY RUN (no changes)'}\n`);

  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  // Find exercises where questions have `question` field but not `text`
  const exercises = await db.collection('exercises').find({}).toArray();
  let totalFixed = 0;
  let totalSkipped = 0;

  for (const ex of exercises) {
    if (!ex.questions || !Array.isArray(ex.questions)) continue;

    let needsUpdate = false;
    const updatedQuestions = ex.questions.map(q => {
      // If has `question` but no `text`, rename
      if (q.question && !q.text) {
        needsUpdate = true;
        const { question, ...rest } = q;
        return { ...rest, text: question };
      }
      // If has both, keep `text` and remove `question`
      if (q.question && q.text) {
        needsUpdate = true;
        const { question, ...rest } = q;
        return rest;
      }
      return q;
    });

    if (needsUpdate) {
      console.log(`📝 Exercise: "${ex.title}" (${ex._id})`);
      console.log(`   Questions to fix: ${ex.questions.filter(q => q.question && !q.text).length}`);

      if (APPLY) {
        await db.collection('exercises').updateOne(
          { _id: ex._id },
          { $set: { questions: updatedQuestions } }
        );
        console.log(`   ✅ Fixed`);
      }
      totalFixed++;
    } else {
      totalSkipped++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Exercises to fix: ${totalFixed}`);
  console.log(`   Exercises already correct: ${totalSkipped}`);

  if (!APPLY && totalFixed > 0) {
    console.log(`\n⚠️  Run with --apply to make changes:`);
    console.log(`   node migrate-exercise-questions.js --apply`);
  }

  if (APPLY) {
    console.log(`\n✅ Migration complete.`);
  }

  mongoose.disconnect();
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
