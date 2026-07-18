const mongoose = require('mongoose');
const { validateLesson } = require('./src/utils/validateLesson.cjs');

async function check() {
  await mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep');
  const db = mongoose.connection.db;

  // Pick 3 lessons from different chapters
  const lessonIds = ['a1-ch1-l1', 'a1-ch5-l3', 'a1-ch9-l6'];

  for (const id of lessonIds) {
    const doc = await db.collection('lessons').findOne({ lessonId: id });
    if (!doc || !doc.canonical) { console.log(id + ': NO CANONICAL'); continue; }
    const c = doc.canonical;
    const keys = ['warmUp','explanation','vocabulary','grammar','grammarDrills','reading','listening','speaking','writing','practiceExercises','miniReview','selfAssessment'];
    const present = keys.filter(k => c[k] !== undefined);
    const missing = keys.filter(k => c[k] === undefined);
    console.log(id + ': ' + present.length + '/12 keys present. Missing: ' + (missing.length ? missing.join(', ') : 'none'));

    // Validate
    const { valid, errors } = validateLesson(c);
    console.log('  Validates: ' + valid + (errors.length ? ' ERRORS: ' + errors.join('; ') : ''));
    if (c.vocabulary) console.log('  vocab items: ' + c.vocabulary.length);
    if (c.grammarDrills && c.grammarDrills.questions) console.log('  grammarDrills: ' + c.grammarDrills.questions.length);
    if (c.reading && c.reading.questions) console.log('  reading questions: ' + c.reading.questions.length);
    if (c.listening && c.listening.questions) console.log('  listening questions: ' + c.listening.questions.length);
    if (c.practiceExercises && c.practiceExercises.questions) console.log('  practiceExercises: ' + c.practiceExercises.questions.length);
  }

  // Also check L7 and L8 samples
  console.log('\n--- L7/L8 check ---');
  for (const id of ['a1-ch1-l7', 'a1-ch1-l8']) {
    const doc = await db.collection('lessons').findOne({ lessonId: id });
    if (!doc || !doc.canonical) { console.log(id + ': NO CANONICAL'); continue; }
    const { valid, errors } = validateLesson(doc.canonical);
    console.log(id + ': validates=' + valid + (errors.length ? ' ERRORS: ' + errors.join('; ') : ''));
  }

  await mongoose.disconnect();
}
check().catch(e => { console.error(e); process.exit(1); });
