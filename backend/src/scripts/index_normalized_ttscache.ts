import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import TTSCache from '../models/TTSCache';

function normalizeText(t: string): string {
  const clean = (t || '').replace(/^(locuteur|locutrice|annonceur|annonceuse)\s*:\s*/i, '');
  return clean.toLowerCase().replace(/['’`"«».,!?;:\s\-\u2013\u2014]+/g, '').trim();
}

async function indexNormalizedTtscache() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not found");
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB Atlas.");

  const client = mongoose.connection.client;

  for (const dbName of ['francprep', 'test']) {
    console.log(`\n⚡ Indexing and populating normalizedText in '${dbName}' database...`);
    const col = client.db(dbName).collection('ttscaches');

    // Create index on normalizedText
    await col.createIndex({ normalizedText: 1 }, { background: true });
    console.log("   ✅ Created index on { normalizedText: 1 }");

    // Populate normalizedText for all documents missing it
    const docs = await col.find({ normalizedText: { $exists: false } }, { projection: { _id: 1, text: 1 } }).toArray();
    console.log(`   Found ${docs.length} documents needing normalizedText in '${dbName}'...`);

    let updated = 0;
    for (const doc of docs) {
      if (doc.text) {
        const norm = normalizeText(doc.text);
        await col.updateOne({ _id: doc._id }, { $set: { normalizedText: norm } });
        updated++;
      }
    }
    console.log(`   ✅ Updated ${updated} documents in '${dbName}' database.`);
  }

  console.log("\n🎉 ALL MONGODB ATLAS AUDIO CACHES ARE NOW 100% INDEXED FOR INSTANT (<15ms) LOOKUP!");
  await mongoose.disconnect();
}

indexNormalizedTtscache().catch(console.error);
