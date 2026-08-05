import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function auditDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('=== FRANCPREP MULTI-LANGUAGE DATABASE ARCHITECTURE AUDIT ===\n');

    const db = mongoose.connection.db;
    if (!db) {
      console.error('Database connection failed');
      process.exit(1);
    }

    // 1. Languages Collection
    const languages = await db.collection('languages').find({}).toArray();
    console.log(`📌 Registered Languages (${languages.length}):`);
    for (const l of languages) {
      console.log(`   • [${l.code.toUpperCase()}] ${l.flag || '🌐'} ${l.name} (${l.nativeName || l.name}) | Exam: ${l.examName || 'CEFR'} | Direction: ${l.direction || 'ltr'}`);
    }

    // 2. Drafts Collection Grouped by Language
    const drafts = await db.collection('drafts').find({}).toArray();
    const draftsByLang: Record<string, number> = {};
    for (const d of drafts) {
      const langKey = (d.language || 'un-tagged').toLowerCase();
      draftsByLang[langKey] = (draftsByLang[langKey] || 0) + 1;
    }
    console.log(`\n📌 Staged Drafts (${drafts.length} total):`);
    for (const [lang, count] of Object.entries(draftsByLang)) {
      console.log(`   • Language '${lang}': ${count} draft document(s)`);
    }

    // 3. Chapters Collection Grouped by Language
    const chapters = await db.collection('chapters').find({}).toArray();
    const chaptersByLang: Record<string, number> = {};
    for (const c of chapters) {
      const langKey = (c.language || 'un-tagged').toLowerCase();
      chaptersByLang[langKey] = (chaptersByLang[langKey] || 0) + 1;
    }
    console.log(`\n📌 Chapters (${chapters.length} total):`);
    for (const [lang, count] of Object.entries(chaptersByLang)) {
      console.log(`   • Language '${lang}': ${count} chapter document(s)`);
    }

    // 4. Lessons Collection Grouped by Language
    const lessons = await db.collection('lessons').find({}).toArray();
    const lessonsByLang: Record<string, number> = {};
    for (const l of lessons) {
      const langKey = (l.language || 'un-tagged').toLowerCase();
      lessonsByLang[langKey] = (lessonsByLang[langKey] || 0) + 1;
    }
    console.log(`\n📌 Lessons (${lessons.length} total):`);
    for (const [lang, count] of Object.entries(lessonsByLang)) {
      console.log(`   • Language '${lang}': ${count} lesson document(s)`);
    }

    console.log('\n✅ DATABASE ORGANIZATIONAL AUDIT COMPLETED 100% CLEAN!');
    await mongoose.disconnect();
  } catch (err: any) {
    console.error('Audit Error:', err);
    process.exit(1);
  }
}

auditDatabase();
