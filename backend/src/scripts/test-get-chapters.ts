import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { chapterService } from '../services/chapter.service';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const result = await chapterService.getPublishedChapters({});
  const a1Data = result.data.find((d: any) => d.level === 'A1');
  console.log('\n=== A1 PUBLISHED CHAPTERS SUMMARY ===');
  if (a1Data) {
    a1Data.chapters.forEach((ch: any) => {
      console.log(`\nChapter #${ch.order} "${ch.title}" (${ch.lessonCount} lessons):`);
      ch.lessons.forEach((l: any) => console.log(`  • [${l.order}] ${l.lessonId}: "${l.title}"`));
    });
  }
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
