import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function cleanDuplicateGerman() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('=== CLEANING DUPLICATE GERMAN ENTRIES IN MONGO DB ===\n');

    const db = mongoose.connection.db;
    if (!db) {
      console.error('Database connection failed');
      process.exit(1);
    }

    // 1. Merge & Normalize Language documents
    await db.collection('languages').deleteMany({ code: { $in: ['ger', 'GER', 'fre', 'FRE'] } });
    
    // Ensure single canonical German language document exists with 'de' code
    await db.collection('languages').updateOne(
      { code: 'de' },
      {
        $set: {
          code: 'de',
          name: 'German',
          nativeName: 'Deutsch',
          flag: '🇩🇪',
          examName: 'Goethe-Zertifikat / TestDaF',
          direction: 'ltr',
          isActive: true,
          order: 3,
        }
      },
      { upsert: true }
    );
    console.log('✓ Cleaned languages collection — canonical code "de" established');

    // 2. Update Drafts collection
    const draftsRes = await db.collection('drafts').updateMany(
      { language: { $in: ['ger', 'GER', 'German', 'german'] } },
      { $set: { language: 'de' } }
    );
    console.log(`✓ Updated ${draftsRes.modifiedCount} draft document(s) to language 'de'`);

    // 3. Update Chapters collection
    const chaptersRes = await db.collection('chapters').updateMany(
      { language: { $in: ['ger', 'GER', 'German', 'german'] } },
      { $set: { language: 'de' } }
    );
    console.log(`✓ Updated ${chaptersRes.modifiedCount} chapter document(s) to language 'de'`);

    // 4. Update Lessons collection
    const lessonsRes = await db.collection('lessons').updateMany(
      { language: { $in: ['ger', 'GER', 'German', 'german'] } },
      { $set: { language: 'de' } }
    );
    console.log(`✓ Updated ${lessonsRes.modifiedCount} lesson document(s) to language 'de'`);

    console.log('\n✅ MONGO DB GERMAN DEDUPLICATION COMPLETE!');
    await mongoose.disconnect();
  } catch (err: any) {
    console.error('Cleanup Error:', err);
    process.exit(1);
  }
}

cleanDuplicateGerman();
