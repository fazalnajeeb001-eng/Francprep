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

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const adminCreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8).max(128).optional(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  role: z.enum(['student', 'admin']).default('student'),
  subscriptionTier: z.enum(['free', 'premium', 'exam_prep']).default('free'),
  isActive: z.boolean().default(true),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Lesson question sub-schema (reused in grammarDrills, reading, listening, practiceExercises)
const lessonQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering', 'short_answer', 'translation']),
  prompt: z.string(),
  correctAnswer: z.union([z.string(), z.array(z.string()), z.array(z.object({ left: z.string(), right: z.string() }))]),
  explanation: z.string().default(''),
  options: z.array(z.string()).optional(),
  pairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
  items: z.array(z.string()).optional(),
}).passthrough();

// Lesson validators (supports both old and canonical format)
export const createLessonSchema = z.object({
  // Old format fields (backward compat)
  chapterId: z.string().optional().nullable(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().default(''),
  level: z.enum(['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  category: z.enum(['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking']).default('grammar'),
  content: z.string().optional().default(''),
  order: z.number().int().positive().default(1),
  isPublished: z.boolean().default(false),
  estimatedDuration: z.number().int().positive().optional().default(22),
  tags: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  skill: z.enum(['R', 'W', 'L', 'S', 'INT', 'REV']).optional(),
  objectives: z.array(z.string()).optional().default([]),
  grammarTopics: z.array(z.string()).optional().default([]),
  // Canonical format fields
  lessonId: z.string().optional(),
  anchorSkill: z.enum(['reading', 'writing', 'listening', 'speaking', 'integrated', 'review']).optional(),
  durationMinutes: z.number().int().positive().optional(),
  grammarFocus: z.string().optional().default(''),
  vocabularyFocus: z.string().optional().default(''),
  warmUp: z.object({ content: z.string() }).optional(),
  explanation: z.object({ content: z.string() }).optional(),
  vocabItems: z.array(z.object({
    french: z.string(),
    english: z.string(),
    pronunciation: z.string(),
    example: z.string(),
    formality: z.string().optional(),
    usageNote: z.string().optional(),
  }).passthrough()).optional(),
  grammar: z.object({
    explanation: z.string().default(''),
    formation: z.string().default(''),
    usage: z.string().default(''),
    examples: z.array(z.string()).default([]),
    commonMistakes: z.array(z.object({ wrong: z.string(), correct: z.string(), why: z.string().default('') }).passthrough()).default([]),
  }).passthrough().optional(),
  grammarDrills: z.object({ questions: z.array(lessonQuestionSchema).default([]) }).passthrough().optional(),
  reading: z.object({
    title: z.string().default(''),
    text: z.string().default(''),
    translation: z.string().optional(),
    questions: z.array(lessonQuestionSchema).default([]),
  }).passthrough().optional(),
  listening: z.object({
    title: z.string().default(''),
    transcript: z.string().default(''),
    translation: z.string().optional(),
    audioUrl: z.string().optional(),
    questions: z.array(lessonQuestionSchema).default([]),
  }).passthrough().optional(),
  speaking: z.object({
    guidedActivity: z.string().default(''),
    roleplay: z.string().optional(),
    pronunciationTip: z.string().optional(),
  }).passthrough().optional(),
  writing: z.object({
    task: z.string().default(''),
    modelAnswer: z.string().default(''),
    checklist: z.array(z.string()).default([]),
  }).passthrough().optional(),
  practiceExercises: z.object({ questions: z.array(lessonQuestionSchema).default([]) }).passthrough().optional(),
  miniReview: z.object({ content: z.string() }).optional(),
  selfAssessment: z.array(z.string()).optional().default([]),
}).passthrough();

export const updateLessonSchema = createLessonSchema.partial();

// Exercise validators
export const createExerciseSchema = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(1).max(200),
  type: z.enum(['multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering', 'short_answer', 'translation', 'listening', 'writing']),
  instructions: z.string().min(1),
  questions: z
    .array(
      z.object({
        id: z.string(),
        prompt: z.string().optional(),
        text: z.string().min(1),
        options: z.array(z.string()).optional(),
        pairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
        items: z.array(z.string()).optional(),
        correctAnswer: z.union([z.string(), z.array(z.string()), z.array(z.object({ left: z.string(), right: z.string() }))]),
        explanation: z.string(),
        points: z.number().int().positive().default(10),
      })
    )
    .min(1),
  category: z.string().optional(),
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
export const chapterSchema = z.object({
  id: z.string().min(1),
  chapter_name: z.string().min(1).max(200),
  chapter_description: z.string().min(1),
  chapter_order: z.number().int().positive(),
  lessons: z.array(z.string()).default([]),
});

export const unitSchema = z.object({
  id: z.string().min(1),
  unit_name: z.string().min(1).max(200),
  unit_description: z.string().min(1),
  unit_order: z.number().int().positive(),
  chapters: z.array(chapterSchema).default([]),
});

export const createSyllabusSchema = z.object({
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  objectives: z.array(z.string()).min(1),
  lessons: z.array(z.string()).default([]),
  units: z.array(unitSchema).optional(),
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