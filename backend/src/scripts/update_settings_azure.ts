import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  if (!db) {
    console.error('Database connection failed');
    process.exit(1);
  }
  const setPayload: Record<string, any> = {
    preferredVoiceEngine: 'edge-neural',
    activeTTSProvider: 'edge-neural',
  };
  if (process.env.OPENROUTER_API_KEY) {
    setPayload.openRouterApiKey = process.env.OPENROUTER_API_KEY;
  }
  const result = await db.collection('settings').updateMany({}, {
    $set: setPayload
  });
  console.log('Successfully updated settings in MongoDB to Azure Neural Voice (edge-neural):', result);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
