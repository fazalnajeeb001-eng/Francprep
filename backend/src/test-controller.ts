import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Draft from './models/Draft';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

async function runTest() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const status = 'draft,review,validated,imported';
  const origin = '!ai_generator';

  const filter: any = {};
  if (status) {
    if (status.includes(',')) {
      filter.status = { $in: status.split(',') };
    } else {
      filter.status = status;
    }
  }

  if (origin) {
    if (origin.startsWith('!')) {
      filter.origin = { $ne: origin.substring(1) };
    } else {
      filter.origin = origin;
    }
  }

  console.log('Constructed Mongoose Filter:', JSON.stringify(filter));

  const items = await Draft.find(filter).sort({ updatedAt: -1 });
  console.log('Query Result count:', items.length);
  for (const item of items) {
    console.log(`- ID: ${item._id} | Lesson: ${item.lessonId} | Status: ${item.status} | Origin: ${item.origin}`);
  }

  await mongoose.disconnect();
}

runTest().catch(console.error);
