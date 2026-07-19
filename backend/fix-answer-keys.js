const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({ order: 1 }).toArray();

  for (let idx = 2; idx <= 3; idx++) {
    const l = lessons[idx];
    const doc = await db.collection('lessons').findOne({ _id: l._id });
    const updatedSections = doc.sections.map(s => {
      if (!s.body) return s;
      let newBody = s.body;
      // Remove answer key section (from "Answer Key:" to end or next section marker)
      newBody = newBody.replace(/\n*Answer Key:[\s\S]*$/i, '');
      // Remove comprehension questions (only the questions section header + question list, keep the reading text)
      // But keep the questions themselves as they're part of the exercise
      // The LessonPage shows body as-is, so we need questions but NOT answers
      return { ...s, body: newBody.trim() };
    });
    await db.collection('lessons').updateOne(
      { _id: l._id },
      { $set: { sections: updatedSections } }
    );
    console.log(`✅ Lesson ${idx+1}: ${l.title} - answer keys removed from body`);
  }

  // Verify
  console.log('\n=== VERIFICATION ===');
  for (let idx = 2; idx <= 3; idx++) {
    const l = lessons[idx];
    const doc = await db.collection('lessons').findOne({ _id: l._id });
    const rs = doc.sections.find(s => s.type === 'reading');
    const ls = doc.sections.find(s => s.type === 'listening');
    console.log(`Lesson ${idx+1} reading has Answer Key:`, rs?.body?.toLowerCase().includes('answer key'));
    console.log(`Lesson ${idx+1} listening has Answer Key:`, ls?.body?.toLowerCase().includes('answer key'));
    console.log(`Lesson ${idx+1} reading body ends with: ...${(rs?.body || '').slice(-80)}`);
    console.log();
  }

  mongoose.disconnect();
  console.log('✅ DONE');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
