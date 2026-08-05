import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }
  console.log("Connecting to URI:", uri.slice(0, 35) + "...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  if (!db) {
    console.error("Database connection failed");
    process.exit(1);
  }

  const lessons = await db.collection('lessons').find({ level: 'A1' }).toArray();
  const drafts = await db.collection('drafts').find({ level: 'A1' }).toArray();
  const chapters = await db.collection('chapters').find({}).toArray();

  console.log('\n=== A1 AUDIT ===');
  console.log('Total A1 Lessons in DB:', lessons.length);
  console.log('Published A1 Lessons (isPublished: true):', lessons.filter(l => l.isPublished).length);
  console.log('Total A1 Drafts in DB:', drafts.length);
  console.log('Published A1 Drafts (status: "published"):', drafts.filter(d => d.status === 'published').length);

  console.log('\n=== Sample A1 Lessons ===');
  lessons.forEach(l => {
    console.log(` - ID: ${l.lessonId || l._id} | Title: "${l.title}" | Published: ${l.isPublished} | Chapter: ${l.chapterId}`);
  });

  console.log('\n=== Sample A1 Drafts ===');
  drafts.forEach(d => {
    console.log(` - ID: ${d._id} | LessonId: ${d.lessonId} | Title: "${d.title}" | Status: ${d.status}`);
  });

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
