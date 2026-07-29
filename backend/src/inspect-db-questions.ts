import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Lesson = mongoose.model('Lesson', new mongoose.Schema({}, { strict: false }));
  const Draft = mongoose.model('Draft', new mongoose.Schema({}, { strict: false }));

  const lessons: any[] = await Lesson.find({});
  console.log(`TOTAL PUBLISHED LESSONS IN DB: ${lessons.length}`);
  for (const l of lessons) {
    if (l.canonical?.practiceExercises?.questions) {
      console.log(`Lesson ${l.lessonId} (${l.title}) has ${l.canonical.practiceExercises.questions.length} practice questions:`);
      l.canonical.practiceExercises.questions.forEach((q: any, i: number) => {
        console.log(`   Q${i+1} [${q.type}]: ${q.prompt || q.text || q.question}`);
      });
    }
  }

  const drafts: any[] = await Draft.find({ status: 'staged' });
  console.log(`\nTOTAL STAGED DRAFTS IN DB: ${drafts.length}`);
  for (const d of drafts) {
    if (d.parsedData?.practiceExercises?.questions) {
      console.log(`Draft ${d._id} (${d.lessonId}) has ${d.parsedData.practiceExercises.questions.length} practice questions:`);
      d.parsedData.practiceExercises.questions.forEach((q: any, i: number) => {
        console.log(`   Q${i+1} [${q.type}]: ${q.prompt || q.text || q.question}`);
      });
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
