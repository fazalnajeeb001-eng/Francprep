/**
 * FrancPrep Development Seed Script
 * 
 * Seeds test data into the database for development/testing:
 * - 1 admin user + 1 student user
 * - A1 Course + Module + Chapter with 4 lessons + exercises
 * 
 * Usage: cd backend && npx ts-node src/scripts/seed-dev-data.ts
 */

import { connectDatabase, stopMemoryServer } from '../config/database';
import mongoose from 'mongoose';
import Course from '../models/Course';
import Module from '../models/Module';
import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Exercise from '../models/Exercise';
import User from '../models/User';
import StudentProgress from '../models/StudentProgress';

async function seed() {
  await connectDatabase();
  console.log('Seeding development data...');

  // Clean existing data
  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Module.deleteMany({}),
    Chapter.deleteMany({}),
    Lesson.deleteMany({}),
    Exercise.deleteMany({}),
    StudentProgress.deleteMany({}),
  ]);

  // 1. Create users
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

  console.log(`✓ Created admin: ${admin.email} / Admin123!`);
  console.log(`✓ Created student: ${student.email} / Student123!`);

  // 2. Create Course (A1)
  const course = await Course.create({
    name: 'French A1 — Beginner',
    level: 'A1',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    isActive: true,
  });

  // 3. Create Module
  const module1 = await Module.create({
    courseId: course._id,
    title: 'Greetings & Introductions',
    order: 1,
  });

  course.modules.push(module1._id);
  await course.save();

  // 4. Create Chapter
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

  // 5. Create 4 lessons
  const lessonData = [
    {
      title: 'Bonjour & Salut',
      description: 'Learn the most common French greetings',
      level: 'A1' as const,
      category: 'vocabulary' as const,
      skill: 'R' as const,
      content: '<h1>Bonjour & Salut</h1><p>Learn how to greet people in French.</p>',
      order: 1,
      isPublished: true,
      estimatedDuration: 30,
    },
    {
      title: 'Introducing Yourself',
      description: 'Learn how to introduce yourself in French',
      level: 'A1' as const,
      category: 'speaking' as const,
      skill: 'S' as const,
      content: '<h1>Introducing Yourself</h1><p>Practice introducing yourself.</p>',
      order: 2,
      isPublished: true,
      estimatedDuration: 30,
    },
    {
      title: 'Formal vs Informal Greetings',
      description: 'Understand when to use formal vs informal greetings',
      level: 'A1' as const,
      category: 'grammar' as const,
      skill: 'R' as const,
      content: '<h1>Formal vs Informal</h1><p>Learn the difference.</p>',
      order: 3,
      isPublished: true,
      estimatedDuration: 25,
    },
    {
      title: 'Saying Goodbye',
      description: 'Learn how to say goodbye in different contexts',
      level: 'A1' as const,
      category: 'vocabulary' as const,
      skill: 'R' as const,
      content: '<h1>Saying Goodbye</h1><p>Au revoir! Learn farewells.</p>',
      order: 4,
      isPublished: true,
      estimatedDuration: 20,
    },
  ];

  const lessons = await Lesson.insertMany(
    lessonData.map((l) => ({ ...l, chapterId: chapter._id }))
  );

  chapter.lessons = lessons.map((l) => l._id);
  await chapter.save();

  console.log(`✓ Created course: ${course.name}`);
  console.log(`✓ Created module: ${module1.title}`);
  console.log(`✓ Created chapter: ${chapter.title} with ${lessons.length} lessons`);

  // 6. Create exercises for each lesson
  const exerciseData = lessons.map((lesson, li) => [
    {
      lessonId: lesson._id,
      title: `MCQ - ${lesson.title}`,
      type: 'multiple_choice' as const,
      instructions: 'Choose the correct answer.',
      questions: [
        { id: 'q1', text: 'How do you say "Hello" in French?', options: ['Bonjour', 'Au revoir', 'Merci', 'Salut'], correctAnswer: 'Bonjour', explanation: '"Bonjour" is the standard French greeting.', points: 10 },
        { id: 'q2', text: 'What does "Au revoir" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], correctAnswer: 'Goodbye', explanation: '"Au revoir" means goodbye.', points: 10 },
      ],
      points: 20,
      isExamStyle: false,
      order: 1,
    },
    {
      lessonId: lesson._id,
      title: `Fill Blank - ${lesson.title}`,
      type: 'fill_blank' as const,
      instructions: 'Fill in the blank with the correct word.',
      questions: [
        { id: 'q1', text: 'Complete: "_____ comment allez-vous ?"', options: ['Bonjour', 'Salut'], correctAnswer: 'Bonjour', explanation: '"Bonjour" is used to begin a formal greeting.', points: 10 },
      ],
      points: 10,
      isExamStyle: false,
      order: 2,
    },
  ]);

  const allExercises: any[] = [];
  for (const pair of exerciseData) {
    const [mcq, fill] = await Exercise.insertMany(pair);
    allExercises.push(mcq, fill);
  }

  console.log(`✓ Created ${allExercises.length} exercises (2 per lesson)`);

  // 7. Mark student has completed lessons 1 and 2, in-progress on lesson 3
  const now = new Date();
  await StudentProgress.create([
    { userId: student._id, lessonId: lessons[0]._id, status: 'completed', score: 90, totalPoints: 30, exercisesCompleted: 2, totalExercises: 2, timeSpent: 15, completedAt: new Date(now.getTime() - 86400000), lastAccessedAt: new Date(now.getTime() - 86400000) },
    { userId: student._id, lessonId: lessons[1]._id, status: 'completed', score: 80, totalPoints: 30, exercisesCompleted: 2, totalExercises: 2, timeSpent: 20, completedAt: new Date(now.getTime() - 43200000), lastAccessedAt: new Date(now.getTime() - 43200000) },
    { userId: student._id, lessonId: lessons[2]._id, status: 'in_progress', score: 50, totalPoints: 30, exercisesCompleted: 1, totalExercises: 2, timeSpent: 10, startedAt: new Date(now.getTime() - 3600000), lastAccessedAt: new Date() },
  ]);

  // Update student streak and XP
  student.streak = 2;
  student.xp = 20;
  student.lastStudyDate = now;
  await student.save();

  console.log('✓ Created student progress data');
  console.log('\n✅ Seed complete!');
  console.log('   Admin: admin@francprep.com / Admin123!');
  console.log('   Student: student@francprep.com / Student123!');

  await stopMemoryServer();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
