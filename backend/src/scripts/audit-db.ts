/**
 * Quick DB audit script — checks what data exists in the FrancPrep MongoDB
 * Usage: cd backend && npx ts-node src/scripts/audit-db.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function audit() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to: ${mongoose.connection.host}\n`);

  const db = mongoose.connection.db!;

  // 1. List all collections
  const collections = await db.listCollections().toArray();
  console.log('=== Collections ===');
  for (const col of collections) {
    const count = await db.collection(col.name).countDocuments();
    console.log(`  ${col.name}: ${count} documents`);
  }
  console.log();

  // 2. Users
  const users = await db.collection('users').find().toArray();
  console.log(`=== Users (${users.length}) ===`);
  for (const u of users) {
    console.log(`  [${u.role}] ${u.firstName} ${u.lastName} — ${u.email} — active: ${u.isActive}`);
    console.log(`    _id: ${u._id}`);
  }
  console.log();

  // 3. Lessons
  const lessons = await db.collection('lessons').find().toArray();
  console.log(`=== Lessons (${lessons.length}) ===`);
  for (const l of lessons) {
    console.log(`  [${l.level}] #${l.order} "${l.title}" — published: ${l.isPublished} — category: ${l.category}`);
  }
  console.log();

  // 4. Chapters
  const chapters = await db.collection('chapters').find().toArray();
  console.log(`=== Chapters (${chapters.length}) ===`);
  for (const ch of chapters) {
    console.log(`  #${ch.order} "${ch.title}" — published: ${ch.isPublished} — lessons: ${ch.lessons?.length || 0}`);
  }
  console.log();

  // 5. Syllabi
  const syllabi = await db.collection('syllabi').find().toArray();
  console.log(`=== Syllabi (${syllabi.length}) ===`);
  for (const s of syllabi) {
    console.log(`  [${s.level}] "${s.title}" — lessons: ${s.lessons?.length || 0} — examType: ${s.examType}`);
  }
  console.log();

  // 6. Exercises
  const exercises = await db.collection('exercises').find().toArray();
  console.log(`=== Exercises (${exercises.length}) ===`);
  for (const ex of exercises) {
    console.log(`  "${ex.title}" — type: ${ex.type} — questions: ${ex.questions?.length || 0}`);
  }
  console.log();

  // 7. StudentProgress
  const progress = await db.collection('studentprogresses').find().toArray();
  console.log(`=== Student Progress (${progress.length}) ===`);
  for (const p of progress) {
    const user = users.find((u: any) => u._id.toString() === p.userId?.toString());
    const lesson = lessons.find((l: any) => l._id.toString() === p.lessonId?.toString());
    console.log(`  User: ${user?.firstName || p.userId} → Lesson: "${lesson?.title || p.lessonId}" — status: ${p.status} — score: ${p.score || '-'}`);
  }
  console.log();

  // 8. Courses & Modules
  const courses = await db.collection('courses').find().toArray();
  console.log(`=== Courses (${courses.length}) ===`);
  for (const c of courses) {
    console.log(`  [${c.level}] "${c.name}" — modules: ${c.modules?.length || 0}`);
  }

  const modules = await db.collection('modules').find().toArray();
  console.log(`\n=== Modules (${modules.length}) ===`);
  for (const m of modules) {
    console.log(`  #${m.order} "${m.title}" — chapters: ${m.chapters?.length || 0}`);
  }

  // 9. Announcements
  const announcements = await db.collection('announcements').find().toArray();
  console.log(`\n=== Announcements (${announcements.length}) ===`);

  // 10. Vocabulary
  const vocabulary = await db.collection('vocabularies').find().toArray();
  console.log(`=== Vocabulary (${vocabulary.length}) ===`);

  await mongoose.disconnect();
  console.log('\n✅ Audit complete!');
}

audit().catch((err) => {
  console.error('❌ Audit failed:', err);
  process.exit(1);
});
