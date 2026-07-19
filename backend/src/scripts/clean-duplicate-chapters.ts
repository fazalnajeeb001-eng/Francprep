import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

const DUPLICATE_CHAPTER_TITLES = [
  "Chapter 1",
  "Présentations et Informations Personnelles",
  "La Famille et les Relations",
  "Ma Maison et ma Routine",
  "La Nourriture et le Restaurant",
  "Les Achats et les Vêtements",
  "Les Nombres, l'Heure et les Dates",
  "La Ville et les Transports",
  "La Météo et le Portrait Physique",
  "La Santé et le Corps Humain"
];

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db!;
  console.log('Connected to database.');

  // Find A1 course
  const a1Course = await db.collection('courses').findOne({ level: 'A1' });
  if (!a1Course) {
    console.log('A1 course not found.');
    await mongoose.disconnect();
    return;
  }
  console.log(`A1 Course ID: ${a1Course._id}`);

  // Find A1 Module 1
  const a1Module = await db.collection('modules').findOne({ title: 'A1 Module 1' });
  if (a1Module) {
    console.log(`Removing duplicate module: ${a1Module.title} (${a1Module._id})`);
    await db.collection('modules').deleteOne({ _id: a1Module._id });
    // Also remove it from course modules array
    await db.collection('courses').updateOne(
      { _id: a1Course._id },
      { $pull: { modules: a1Module._id } } as any
    );
  }

  // Remove the duplicate chapters
  const deleteResult = await db.collection('chapters').deleteMany({
    title: { $in: DUPLICATE_CHAPTER_TITLES }
  });
  console.log(`Deleted ${deleteResult.deletedCount} duplicate chapters.`);

  // Now, find all clean chapters for A1
  // These belong to modules that belong to the A1 Course
  const a1Modules = await db.collection('modules').find({ courseId: a1Course._id }).toArray();
  const a1ModuleIds = a1Modules.map(m => m._id);

  const cleanChapters = await db.collection('chapters').find({
    moduleId: { $in: a1ModuleIds }
  }).sort({ order: 1 }).toArray();

  console.log(`Remaining clean A1 chapters count: ${cleanChapters.length}`);

  // Re-run mapping logic
  const chapterLookup: Record<string, mongoose.Types.ObjectId> = {};
  cleanChapters.forEach((ch, idx) => {
    const key = `a1-ch${idx + 1}`;
    chapterLookup[key] = ch._id;
    console.log(`  Mapping ${key} -> "${ch.title}" (${ch._id})`);
  });

  // Re-link lessons
  const lessons = await db.collection('lessons').find({ level: 'A1' }).toArray();
  console.log(`Found ${lessons.length} A1 lessons to re-link.`);

  let updatedCount = 0;
  for (const lesson of lessons) {
    const match = lesson.lessonId?.match(/^a1-ch(\d+)-l\d+$/i);
    if (!match) continue;
    const chapterNum = parseInt(match[1]);
    const lookupKey = `a1-ch${chapterNum}`;
    const chapterId = chapterLookup[lookupKey];

    if (chapterId) {
      await db.collection('lessons').updateOne(
        { _id: lesson._id },
        { $set: { chapterId: chapterId } }
      );
      // Ensure the chapter has this lesson ID in its lessons array
      await db.collection('chapters').updateOne(
        { _id: chapterId },
        { $addToSet: { lessons: lesson._id } }
      );
      updatedCount++;
    }
  }

  console.log(`Re-linked ${updatedCount} lessons to clean chapters.`);
  await mongoose.disconnect();
  console.log('Cleanup completed successfully.');
}

main().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
