const mongoose = require('mongoose');

async function testQuery() {
  const uri = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/francprep?appName=Francprep';
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const doc = await db.collection('ttscaches').findOne({
    text: { $regex: 'Consigne : Regardez', $options: 'i' }
  });

  if (doc) {
    console.log('✅ Paper 1 Q1 Audio Found in MongoDB Atlas!');
    console.log('  voice:', doc.voice);
    console.log('  textHash:', doc.textHash);
    console.log('  audioBase64 length:', doc.audioBase64 ? doc.audioBase64.length : 0);
  } else {
    console.log('❌ Paper 1 Q1 Audio NOT found by regex');
  }

  await mongoose.disconnect();
}

testQuery().catch(console.error);
