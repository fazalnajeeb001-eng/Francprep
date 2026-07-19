const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({ title: 'Greetings & First Contact' });
  const lessons = await db.collection('lessons').find({ chapterId: ch1._id }).sort({ order: 1 }).toArray();
  const l3 = lessons[2];
  const l4 = lessons[3];

  // =====================================================================
  // FIX LESSON 3 - Replace practice section body with generic text
  // =====================================================================
  const l3Doc = await db.collection('lessons').findOne({ _id: l3._id });
  const l3Sections = l3Doc.sections.map(s => {
    if (s.type === 'practice') {
      return {
        ...s,
        body: 'Test your understanding with the interactive exercises below. Click on your answer, then check if it\'s correct!'
      };
    }
    return s;
  });
  await db.collection('lessons').updateOne(
    { _id: l3._id },
    { $set: { sections: l3Sections } }
  );
  console.log('✅ Lesson 3 practice section fixed');

  // =====================================================================
  // FIX LESSON 4 - Replace practice section body with generic text
  // =====================================================================
  const l4Doc = await db.collection('lessons').findOne({ _id: l4._id });
  const l4Sections = l4Doc.sections.map(s => {
    if (s.type === 'practice') {
      return {
        ...s,
        body: 'Test your understanding with the interactive exercises below. Click on your answer, then check if it\'s correct!'
      };
    }
    return s;
  });
  await db.collection('lessons').updateOne(
    { _id: l4._id },
    { $set: { sections: l4Sections } }
  );
  console.log('✅ Lesson 4 practice section fixed');

  // =====================================================================
  // VERIFY EXERCISES exist for L3 and L4
  // =====================================================================
  const l3Ex = await db.collection('exercises').countDocuments({ lessonId: l3._id });
  const l4Ex = await db.collection('exercises').countDocuments({ lessonId: l4._id });
  console.log(`\nLesson 3 exercises: ${l3Ex}`);
  console.log(`Lesson 4 exercises: ${l4Ex}`);

  if (l3Ex === 0) console.log('⚠️ WARNING: No exercises found for Lesson 3!');
  if (l4Ex === 0) console.log('⚠️ WARNING: No exercises found for Lesson 4!');

  // =====================================================================
  // Also check L1 & L2 exercises for reference
  // =====================================================================
  const l1 = lessons[0];
  const l2 = lessons[1];
  const l1Ex = await db.collection('exercises').countDocuments({ lessonId: l1._id });
  const l2Ex = await db.collection('exercises').countDocuments({ lessonId: l2._id });
  console.log(`\nLesson 1 exercises: ${l1Ex}`);
  console.log(`Lesson 2 exercises: ${l2Ex}`);

  mongoose.disconnect();
  console.log('\n✅ DONE');
}

main().catch(e => { console.error(e); mongoose.disconnect(); });
