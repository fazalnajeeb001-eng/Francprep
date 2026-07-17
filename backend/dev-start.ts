/**
 * FrancPrep — Auto-seed Development Server
 * Starts the API server and seeds test data on first run.
 * Usage: cd backend && npx ts-node dev-start.ts
 */

import app from './src/app';
import { connectDatabase, stopMemoryServer } from './src/config/database';
import { env } from './src/config/env';
import mongoose from 'mongoose';

async function seedData() {
  const Course = (await import('./src/models/Course')).default;
  const ModuleModel = (await import('./src/models/Module')).default;
  const Chapter = (await import('./src/models/Chapter')).default;
  const Lesson = (await import('./src/models/Lesson')).default;
  const Exercise = (await import('./src/models/Exercise')).default;
  const User = (await import('./src/models/User')).default;
  const StudentProgress = (await import('./src/models/StudentProgress')).default;

  // Check if already seeded
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) {
    console.log('Database already has data, skipping seed.');
    return;
  }

  console.log('Seeding development data...');

  // Users
  const admin = await User.create({
    email: 'admin@francprep.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    subscriptionTier: 'premium',
  });

  const student = await User.create({
    email: 'student@francprep.com',
    password: 'Student123!',
    firstName: 'Test',
    lastName: 'Student',
    role: 'student',
    subscriptionTier: 'free',
  });

  // Course
  const course = await Course.create({
    name: 'French A1 — Beginner',
    level: 'A1',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    isActive: true,
  });

  // Module
  const module1 = await ModuleModel.create({
    courseId: course._id,
    title: 'Greetings & Introductions',
    order: 1,
  });
  course.modules.push(module1._id);
  await course.save();

  // Chapter
  const chapter = await Chapter.create({
    moduleId: module1._id,
    title: 'Basic Greetings',
    objectives: ['Greet people in French', 'Introduce yourself', 'Use formal and informal greetings'],
    cefrGoals: ['A1'],
    estimatedTime: '2 hours',
    order: 1,
    isPublished: true,
  });
  module1.chapters.push(chapter._id);
  await module1.save();

  // Lessons
  const lessonData = [
    { title: 'Bonjour & Salut', description: 'Learn the most common French greetings', level: 'A1' as const, category: 'vocabulary' as const, skill: 'R' as const, content: '<h1>Bonjour & Salut</h1><p>Learn how to greet people in French.</p>', order: 1, isPublished: true, estimatedDuration: 30 },
    { title: 'Introducing Yourself', description: 'Learn how to introduce yourself in French', level: 'A1' as const, category: 'speaking' as const, skill: 'S' as const, content: '<h1>Introducing Yourself</h1><p>Practice introducing yourself.</p>', order: 2, isPublished: true, estimatedDuration: 30 },
    { title: 'Formal vs Informal Greetings', description: 'Understand when to use formal vs informal greetings', level: 'A1' as const, category: 'grammar' as const, skill: 'R' as const, content: '<h1>Formal vs Informal</h1><p>Learn the difference.</p>', order: 3, isPublished: true, estimatedDuration: 25 },
    { title: 'Saying Goodbye', description: 'Learn how to say goodbye in different contexts', level: 'A1' as const, category: 'vocabulary' as const, skill: 'R' as const, content: '<h1>Saying Goodbye</h1><p>Au revoir! Learn farewells.</p>', order: 4, isPublished: true, estimatedDuration: 20 },
  ];

  const lessons = await Lesson.insertMany(lessonData.map(l => ({ ...l, chapterId: chapter._id })));
  chapter.lessons = lessons.map(l => l._id);
  await chapter.save();

  // Exercises
  for (const lesson of lessons) {
    const [mcq, fill] = await Exercise.insertMany([
      {
        lessonId: lesson._id,
        title: `MCQ - ${lesson.title}`,
        type: 'multiple_choice' as const,
        instructions: 'Choose the correct answer.',
        questions: [
          { id: 'q1', text: 'How do you say "Hello" in French?', options: ['Bonjour', 'Au revoir', 'Merci', 'Salut'], correctAnswer: 'Bonjour', explanation: '"Bonjour" is the standard French greeting.', points: 10 },
          { id: 'q2', text: 'What does "Au revoir" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], correctAnswer: 'Goodbye', explanation: '"Au revoir" means goodbye.', points: 10 },
        ],
        points: 20, isExamStyle: false, order: 1,
      },
      {
        lessonId: lesson._id,
        title: `Fill Blank - ${lesson.title}`,
        type: 'fill_blank' as const,
        instructions: 'Fill in the blank with the correct word.',
        questions: [
          { id: 'q1', text: 'Complete: "_____ comment allez-vous ?"', options: ['Bonjour', 'Salut'], correctAnswer: 'Bonjour', explanation: '"Bonjour" is used to begin a formal greeting.', points: 10 },
        ],
        points: 10, isExamStyle: false, order: 2,
      },
    ]);
  }

  // Student progress
  const now = new Date();
  await StudentProgress.create([
    { userId: student._id, lessonId: lessons[0]._id, status: 'completed', score: 90, totalPoints: 30, exercisesCompleted: 2, totalExercises: 2, timeSpent: 15, completedAt: new Date(now.getTime() - 86400000), lastAccessedAt: new Date(now.getTime() - 86400000) },
    { userId: student._id, lessonId: lessons[1]._id, status: 'completed', score: 80, totalPoints: 30, exercisesCompleted: 2, totalExercises: 2, timeSpent: 20, completedAt: new Date(now.getTime() - 43200000), lastAccessedAt: new Date(now.getTime() - 43200000) },
    { userId: student._id, lessonId: lessons[2]._id, status: 'in_progress', score: 50, totalPoints: 30, exercisesCompleted: 1, totalExercises: 2, timeSpent: 10, startedAt: new Date(now.getTime() - 3600000), lastAccessedAt: new Date() },
  ]);

  student.streak = 2;
  student.xp = 20;
  student.lastStudyDate = now;
  await student.save();

  console.log('✅ Seed complete. Admin: admin@francprep.com / Admin123!');
}

async function startServer() {
  // Connect to database (with in-memory fallback)
  await connectDatabase();

  // Seed if empty
  await seedData();

  // Start Express
  app.listen(env.port, () => {
    console.log(`
╔══════════════════════════════════════════╗
║         FrancPrep API Server             ║
║──────────────────────────────────────────║
║  Status:   Running                        ║
║  Port:     ${String(env.port).padEnd(33)}║
║  Env:      ${env.nodeEnv.padEnd(33)}║
║  Frontend: ${env.frontendUrl.padEnd(33)}║
╚══════════════════════════════════════════╝
    `);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
