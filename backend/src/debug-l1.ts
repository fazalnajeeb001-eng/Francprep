import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Lesson = mongoose.model('Lesson', new mongoose.Schema({}, { strict: false }));
  const lessons: any[] = await Lesson.find({ lessonId: /^a1-ch1/i });
  console.log(`FOUND ${lessons.length} LESSONS MATCHING ^a1-ch1:`);
  for (const l of lessons) {
    console.log(`ID=${l._id}, lessonId=${l.lessonId}, title=${l.title}`);
  }
  await mongoose.disconnect();
}

run().catch(console.error);
