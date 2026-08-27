import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function cleanCache() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not found in environment');

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas!');

  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection failed');

  const countBefore = await db.collection('ttscaches').countDocuments();
  console.log(`Current ttscaches count: ${countBefore}`);

  const result = await db.collection('ttscaches').deleteMany({});
  console.log(`Deleted ${result.deletedCount} documents from ttscaches collection.`);

  const countAfter = await db.collection('ttscaches').countDocuments();
  console.log(`ttscaches count after cleanup: ${countAfter}`);

  await mongoose.disconnect();
  console.log('Phase 1 Baseline Clean-up Complete!');
}

cleanCache().catch(console.error);
