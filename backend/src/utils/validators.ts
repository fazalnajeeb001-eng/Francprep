import { z } from 'zod';

// Auth validators
export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Lesson validators
export const createLessonSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  category: z.enum(['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking']),
  content: z.string().min(1),
  order: z.number().int().positive(),
  isPublished: z.boolean().default(false),
  estimatedDuration: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
});

export const updateLessonSchema = createLessonSchema.partial();

// Exercise validators
export const createExerciseSchema = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(1).max(200),
  type: z.enum(['multiple_choice', 'fill_blank', 'matching', 'listening', 'writing']),
  instructions: z.string().min(1),
  questions: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1),
        options: z.array(z.string()).optional(),
        correctAnswer: z.union([z.string(), z.array(z.string())]),
        explanation: z.string(),
        points: z.number().int().positive(),
      })
    )
    .min(1),
  timeLimit: z.number().int().positive().optional(),
  points: z.number().int().positive(),
  isExamStyle: z.boolean().default(false),
  order: z.number().int().positive(),
});

export const updateExerciseSchema = createExerciseSchema.partial();

export const submitExerciseSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        answer: z.union([z.string(), z.array(z.string())]),
      })
    )
    .min(1),
});

// Progress validators
export const updateProgressSchema = z.object({
  status: z.enum(['not_started', 'in_progress', 'completed']).optional(),
  score: z.number().int().min(0).optional(),
  totalPoints: z.number().int().min(0).optional(),
  exercisesCompleted: z.number().int().min(0).optional(),
  totalExercises: z.number().int().min(0).optional(),
  timeSpent: z.number().int().min(0).optional(),
});

// Syllabus validators
export const createSyllabusSchema = z.object({
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  objectives: z.array(z.string()).min(1),
  lessons: z.array(z.string()).default([]),
  order: z.number().int().positive(),
  isPublished: z.boolean().default(false),
  examType: z.enum(['TCF', 'TEF', 'both']),
});

// Announcement validators
export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  type: z.enum(['info', 'warning', 'update', 'exam_tip']),
  isActive: z.boolean().default(true),
  priority: z.enum(['low', 'medium', 'high']),
  expiresAt: z.string().datetime().optional(),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

// Pagination validator
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('asc'),
});