import mongoose from 'mongoose';
import Lesson from '../models/Lesson';
import dotenv from 'dotenv';
import path from 'path';
import { parseChapterFile } from '../services/markdownLessonParser';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const filePath = path.resolve(__dirname, '../../../full a1 content including ledger and course skeleton/FrancPrep_A1_Chapter1_Greetings_First_Contact.md');
    const lessons = parseChapterFile(filePath, 'A1', 1);
    const lesson1 = lessons[0];

    console.log(`\nSeeding: ${lesson1.lessonId} - "${lesson1.title}"`);

    await Lesson.deleteOne({ lessonId: lesson1.lessonId });
    console.log('Deleted old lesson (if existed)');

    // Strip fields that conflict with old model schema
    const seedData: any = { ...lesson1 };
    delete seedData.chapterId;  // parser outputs string, model expects ObjectId
    delete seedData.vocabulary; // parser outputs objects, model expects ObjectId[] — use vocabItems instead

    const doc = await Lesson.create(seedData);
    console.log(`Inserted with _id: ${doc._id}`);

    // Verify
    const saved = await Lesson.findOne({ lessonId: lesson1.lessonId });
    if (saved) {
      console.log('\n=== VERIFICATION ===');
      console.log('lessonId:', saved.lessonId);
      console.log('title:', saved.title);
      console.log('warmUp:', saved.warmUp?.content?.substring(0, 60) + '...');
      console.log('vocabulary:', saved.vocabItems?.length, 'words');
      console.log('grammarDrills:', saved.grammarDrills?.questions?.length, 'questions');
      console.log('reading.questions:', saved.reading?.questions?.length);
      console.log('listening.questions:', saved.listening?.questions?.length);
      console.log('writing.task:', saved.writing?.task?.substring(0, 60) + '...');
      console.log('practiceExercises:', saved.practiceExercises?.questions?.length, 'questions');
      console.log('selfAssessment:', saved.selfAssessment?.length, 'items');
    }

    console.log('\nDone!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
