import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const db = mongoose.connection.db!;

  const ch1 = await db.collection('chapters').findOne({ order: 1 });
  console.log('Chapter 1 in DB:', ch1?._id, ch1?.title);

  const lessons = await db.collection('lessons').find({
    $or: [
      { chapterId: ch1?._id },
      { chapterId: ch1?._id.toString() },
      { chapterId: 'a1-ch1' },
      { lessonId: { $regex: /^a1-ch1-/i } }
    ]
  }).toArray();

  console.log(`\nFound ${lessons.length} lessons matching Chapter 1:`);
  lessons.forEach(l => {
    console.log(`- ID: ${l._id} | lessonId: ${l.lessonId} | title: "${l.title}" | isPublished: ${l.isPublished} | chapterId: ${l.chapterId} (type: ${typeof l.chapterId})`);
  });

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
