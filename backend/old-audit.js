const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async () => {
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({title:'Greetings & First Contact'});
  
  const lessons = await db.collection('lessons').find({chapterId: ch1._id}).sort({order:1}).toArray();
  lessons.forEach(l => {
    console.log(`\n=== L${l.order}: ${l.title} ===`);
    console.log('Sections:', l.sections?.map(s => s.type) || 'NONE');
    if (l.sections) {
      l.sections.forEach(s => {
        console.log(`  ${s.type}: "${s.title}" bodyLen=${s.body?.length||0} hasTrans=${!!s.translation}`);
      });
    }
    const vocab = l.vocabulary || [];
    console.log('Vocabulary in lesson doc:', vocab.length);
  });

  // Check exercises
  const allEx = await db.collection('exercises').find({}).toArray();
  console.log(`\n=== TOTAL EXERCISES: ${allEx.length} ===`);
  
  // Check vocabulary collection
  const allVocab = await db.collection('vocabularies').find({}).toArray();
  console.log(`\n=== TOTAL VOCAB ITEMS: ${allVocab.length} ===`);
  allVocab.forEach(v => console.log(`  ${v.french} - ${v.english} (lesson: ${v.lessonId?.toString().slice(-6)})`));
  
  mongoose.disconnect();
}).catch(e => { console.error(e); mongoose.disconnect(); });