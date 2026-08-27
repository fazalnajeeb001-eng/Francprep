const mongoose = require('mongoose');

async function checkAudioCaches() {
  const uri = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/francprep?appName=Francprep';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const admin = mongoose.connection.db.admin();
  const dbList = await admin.listDatabases();
  console.log('Available databases:', dbList.databases.map(d => d.name));

  for (const dbInfo of dbList.databases) {
    if (['admin', 'local'].includes(dbInfo.name)) continue;
    const db = mongoose.connection.useDb(dbInfo.name).db;
    const collections = await db.listCollections().toArray();
    console.log(`\n--- Database: ${dbInfo.name} ---`);
    for (const c of collections) {
      const count = await db.collection(c.name).countDocuments();
      console.log(`  Collection: ${c.name} (${count} docs)`);
      if (c.name.includes('tts') || c.name.includes('audio') || c.name.includes('cache')) {
        const sample = await db.collection(c.name).findOne({});
        if (sample) {
          console.log(`    Sample fields:`, Object.keys(sample));
          if (sample.voice) console.log(`    Sample voice:`, sample.voice);
          if (sample.audioBase64) console.log(`    Sample audioBase64 length:`, sample.audioBase64.length);
        }
      }
    }
  }

  await mongoose.disconnect();
}

checkAudioCaches().catch(console.error);
