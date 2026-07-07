import mongoose from 'mongoose';
import Course from '../models/Course';
import Module from '../models/Module';
import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Vocabulary from '../models/Vocabulary';
import Exercise from '../models/Exercise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ─── Types for the import ───────────────────────────────────────────────────

interface SectionInput {
  type: 'warmup' | 'explanation' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'practice' | 'review';
  title: string;
  body: string;
  translation?: string;
  audioUrl?: string;
}

interface VocabularyInput {
  french: string;
  english: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface ExerciseInput {
  type: 'multiple_choice' | 'fill_blank' | 'matching' | 'ordering' | 'translation' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface LessonInput {
  title: string;
  order: number;
  skill: 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV';
  objectives: string[];
  grammarTopics: string[];
  estimatedDuration: number;
  sections: SectionInput[];
  vocabulary: VocabularyInput[];
  exercises: ExerciseInput[];
}

interface ChapterInput {
  title: string;
  objectives: string[];
  cefrGoals: string[];
  estimatedTime: string;
  order: number;
  lessons: LessonInput[];
}

interface ModuleInput {
  title: string;
  order: number;
  chapters: ChapterInput[];
}

// ─── Import function ────────────────────────────────────────────────────────

export async function importChapter(
  courseId: string,
  moduleId: string,
  chapterData: ChapterInput,
  options?: { autoPublish?: boolean }
) {
  const { title, objectives, cefrGoals, estimatedTime, order, lessons } = chapterData;

  // Create the chapter
  const chapter = await Chapter.create({
    moduleId,
    title,
    objectives,
    cefrGoals,
    estimatedTime,
    order,
    lessons: [],
    isPublished: options?.autoPublish || false,
  });

  const lessonIds: mongoose.Types.ObjectId[] = [];

  for (const lessonInput of lessons) {
    // Create vocabulary items
    const vocabIds: mongoose.Types.ObjectId[] = [];
    for (const v of lessonInput.vocabulary) {
      const vocab = await Vocabulary.create({
        lessonId: null as any, // Will update after lesson is created
        french: v.french,
        english: v.english,
        pronunciation: v.pronunciation,
        exampleSentence: v.exampleSentence,
        difficulty: v.difficulty || 'medium',
      });
      vocabIds.push(vocab._id);
    }

    // Create exercises
    const exerciseIds: mongoose.Types.ObjectId[] = [];
    for (const ex of lessonInput.exercises) {
      const exercise = await Exercise.create({
        lessonId: null as any,
        title: ex.question.slice(0, 100),
        type: ex.type === 'ordering' ? 'matching' : ex.type === 'translation' ? 'writing' : ex.type === 'short_answer' ? 'writing' : 'multiple_choice',
        instructions: '',
        questions: [{
          id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          text: ex.question,
          options: ex.options,
          correctAnswer: ex.correctAnswer,
          explanation: ex.explanation,
          points: 1,
        }],
        points: 1,
        order: 1,
        isExamStyle: false,
      });
      exerciseIds.push(exercise._id);
    }

    // Create the lesson
    const lesson = await Lesson.create({
      chapterId: chapter._id,
      title: lessonInput.title,
      description: lessonInput.objectives.join('. '),
      level: 'A1', // Will be inherited from course
      category: 'grammar',
      skill: lessonInput.skill,
      objectives: lessonInput.objectives,
      grammarTopics: lessonInput.grammarTopics,
      vocabulary: vocabIds,
      sections: lessonInput.sections.map(s => ({
        type: s.type,
        title: s.title,
        body: s.body,
        translation: s.translation,
        media: {
          audio: s.audioUrl ? [s.audioUrl] : undefined,
        },
      })),
      activities: exerciseIds,
      content: lessonInput.sections.map(s => s.body).join('\n\n'),
      order: lessonInput.order,
      isPublished: options?.autoPublish || false,
      estimatedDuration: lessonInput.estimatedDuration,
      tags: lessonInput.grammarTopics,
    });

    // Update vocabulary and exercises with the lesson ID
    await Vocabulary.updateMany({ _id: { $in: vocabIds } }, { lessonId: lesson._id });
    await Exercise.updateMany({ _id: { $in: exerciseIds } }, { lessonId: lesson._id });

    lessonIds.push(lesson._id);
    console.log(`  ✓ Lesson "${lessonInput.title}" created`);
  }

  // Update chapter with lesson references
  await Chapter.findByIdAndUpdate(chapter._id, { lessons: lessonIds });

  // Update module with chapter reference
  await Module.findByIdAndUpdate(moduleId, { $push: { chapters: chapter._id } });

  console.log(`✅ Chapter "${title}" imported successfully`);
  return chapter;
}

// ─── CLI entry point ────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('📦 Connected to MongoDB');

  // The chapter content will be provided by the user
  // See: importChapter() function above
  // Usage example:
  //
  // const course = await Course.findOne({ level: 'A1' });
  // const module = await Module.findOne({ courseId: course._id, order: 2 });
  //
  // await importChapter(course._id, module._id, {
  //   title: 'Chapter 4: Daily Routines',
  //   objectives: ['Talk about your daily routine', 'Use reflexive verbs'],
  //   cefrGoals: ['A1.2: Can describe daily activities'],
  //   estimatedTime: '2 hours',
  //   order: 4,
  //   lessons: [ ... ]
  // });

  await mongoose.disconnect();
  console.log('✅ Done');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Import failed:', err);
    process.exit(1);
  });
}