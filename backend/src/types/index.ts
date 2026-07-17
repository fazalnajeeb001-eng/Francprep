import { Request } from 'express';

// User roles
export type UserRole = 'student' | 'admin';

// User interface
export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  subscriptionTier: 'free' | 'premium' | 'exam_prep';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Lesson interface
export interface ILesson {
  _id: string;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';
  content: string;
  order: number;
  isPublished: boolean;
  estimatedDuration: number; // minutes
  tags: string[];
  prerequisites: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Exercise interface
export interface IExercise {
  _id: string;
  lessonId: string;
  title: string;
  type: 'multiple_choice' | 'fill_blank' | 'matching' | 'listening' | 'writing';
  instructions: string;
  questions: IQuestion[];
  timeLimit?: number; // minutes
  points: number;
  isExamStyle: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Question interface
export interface IQuestion {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

// Student Progress interface
export interface IStudentProgress {
  _id: string;
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  totalPoints?: number;
  exercisesCompleted: number;
  totalExercises: number;
  timeSpent: number; // minutes
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Nested syllabus types ────────────────────────────────────────────────

export interface ISyllabusChapter {
  id: string;
  chapter_name: string;
  chapter_description: string;
  chapter_order: number;
  lessons: string[]; // lesson IDs
}

export interface ISyllabusUnit {
  id: string;
  unit_name: string;
  unit_description: string;
  unit_order: number;
  chapters: ISyllabusChapter[];
}

// Syllabus interface
export interface ISyllabus {
  _id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  objectives: string[];
  lessons: string[]; // lesson IDs (flat list, for backward compatibility)
  units?: ISyllabusUnit[]; // hierarchical unit → chapter → lessons structure
  order: number;
  isPublished: boolean;
  examType: 'TCF' | 'TEF' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

// Announcement interface
export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'update' | 'exam_tip';
  isActive: boolean;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// JWT payload interface
export interface IJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

// Auth request interface (extends Express Request)
export interface AuthRequest extends Request {
  user?: IJwtPayload;
}

// API response interfaces
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Signup / Login DTOs
export interface SignupDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}
