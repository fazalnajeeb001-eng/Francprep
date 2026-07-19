const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async () => {
  const db = mongoose.connection.db;
  
  const ch1 = await db.collection('chapters').findOne({title:'Greetings & First Contact'});
  const l1 = await db.collection('lessons').findOne({chapterId:ch1._id, order:1});
  
  console.log('Lesson 1 title:', l1.title);
  console.log('Section types:', l1.sections?.map(s => s.type + ': ' + s.title));
  console.log('Has sections array:', Array.isArray(l1.sections));
  console.log('Section count:', l1.sections?.length);
  
  // Check if sections have proper content for each type
  l1.sections?.forEach(s => {
    console.log(`\n--- ${s.type}: ${s.title} ---`);
    console.log('  body length:', s.body?.length);
    console.log('  has translation:', !!s.translation);
    console.log('  media:', JSON.stringify(s.media));
  });
  
  mongoose.disconnect();
}).catch(e => { console.error(e); mongoose.disconnect(); });