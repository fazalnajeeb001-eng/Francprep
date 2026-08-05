import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { chapterService } from '../services/chapter.service';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const db = mongoose.connection.db!;
  const ch1 = await db.collection('chapters').findOne({ order: 1 });
  
  console.log('\n--- TESTING getChapterById by ObjectId ---');
  const res1 = await chapterService.getChapterById(ch1!._id.toString());
  console.log('Chapter:', res1.title, '| Lessons count:', res1.lessons.length);
  res1.lessons.forEach((l: any) => console.log('  •', l.lessonId, ':', l.title));

  console.log('\n--- TESTING getChapterById by Slug ("a1-ch1") ---');
  const res2 = await chapterService.getChapterById('a1-ch1');
  console.log('Chapter:', res2.title, '| Lessons count:', res2.lessons.length);
  res2.lessons.forEach((l: any) => console.log('  •', l.lessonId, ':', l.title));

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
