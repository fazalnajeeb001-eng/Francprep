const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async () => {
  const db = mongoose.connection.db;

  // Check A1 course
  const a1Course = await db.collection('courses').findOne({level:'A1'});
  console.log('A1 Course ID:', a1Course._id);

  // Check all A1 modules
  const a1Modules = await db.collection('modules').find({courseId: a1Course._id}).sort({order:1}).toArray();
  console.log('\nA1 Modules:');
  a1Modules.forEach(m => console.log('  order:', m.order, '|', m.title, '| _id:', m._id));

  // Check all A1 chapters sorted by current order
  const a1Chapters = await db.collection('chapters').find({}).sort({order:1}).toArray();
  
  // Get module-level mapping
  const allModules = await db.collection('modules').find().toArray();
  const modMap = {};
  allModules.forEach(m => modMap[m._id.toString()] = m);

  console.log('\nA1 Chapters with current order:');
  a1Chapters.forEach(ch => {
    const mod = modMap[ch.moduleId?.toString()];
    if (mod && mod.courseId?.toString() === a1Course._id.toString()) {
      console.log('  order:', ch.order, '|', ch.title, '| module:', mod.title);
    }
  });

  console.log('\n--- Also checking Lesson 1 exercises ---');
  const ch1 = a1Chapters.find(c => c.title.includes('Greeting'));
  if (ch1) {
    const lessons = await db.collection('lessons').find({chapterId: ch1._id}).sort({order:1}).toArray();
    const l1 = lessons[0];
    if (l1) {
      const ex = await db.collection('exercises').find({lessonId: l1._id}).toArray();
      console.log('Lesson 1:', l1.title, 'has', ex.length, 'exercises');
      ex.forEach(e => console.log('  type:', e.type, '| category:', e.category, '| title:', (e.title||'').slice(0,40)));
    }
  }

  mongoose.disconnect();
}).catch(e => { console.error(e); mongoose.disconnect(); });