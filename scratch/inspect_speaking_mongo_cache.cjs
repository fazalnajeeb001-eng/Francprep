const mongoose = require('../backend/node_modules/mongoose');
const dotenv = require('../backend/node_modules/dotenv');
dotenv.config({ path: './backend/.env' });

async function inspectSpeakingMongo() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas.");

  const client = mongoose.connection.client;

  for (const dbName of ['francprep', 'test']) {
    const col = client.db(dbName).collection('ttscaches');

    // Count speaking / examiner audio entries
    const allDocs = await col.find({}).toArray();
    console.log(`\n--- DB: ${dbName} ---`);
    console.log(`  Total Audio Documents in ${dbName}: ${allDocs.length}`);

    let speakingCount = 0;
    for (const doc of allDocs) {
      const t = (doc.text || '').toLowerCase();
      if (
        t.includes('tâche') ||
        t.includes('entretien') ||
        t.includes('consigne') ||
        t.includes('examinateur') ||
        t.includes('bonjour') ||
        t.includes('avez-vous des questions')
      ) {
        speakingCount++;
      }
    }
    console.log(`  Speaking / Examiner Prompt Documents in ${dbName}: ${speakingCount}`);
  }

  await mongoose.disconnect();
}

inspectSpeakingMongo().catch(console.error);
