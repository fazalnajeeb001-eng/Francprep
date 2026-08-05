import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { chapterService } from '../services/chapter.service';

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const result = await chapterService.getPublishedChapters({});

  console.log('\n==================================================');
  console.log('      FRANCPREP COMPLETE CATALOG AUDIT');
  console.log('==================================================\n');

  let totalChapters = 0;
  let totalLessons = 0;

  for (const levelInfo of result.data) {
    console.log(`\nLEVEL [${levelInfo.level}] — ${levelInfo.title} (${levelInfo.chapters.length} chapters):`);
    totalChapters += levelInfo.chapters.length;
    for (const ch of levelInfo.chapters) {
      totalLessons += ch.lessonCount;
      console.log(`  └─ Chapter #${ch.order} "${ch.title}" → ${ch.lessonCount} lessons`);
    }
  }

  console.log('\n==================================================');
  console.log(`TOTAL CHAPTERS ACCESSIBLE TO STUDENTS: ${totalChapters}`);
  console.log(`TOTAL LESSONS ACCESSIBLE TO STUDENTS: ${totalLessons}`);
  console.log('==================================================\n');

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
