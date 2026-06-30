import Lesson from '../models/Lesson';
import { createLessonSchema, updateLessonSchema } from '../utils/validators';
import { z } from 'zod';

export class LessonService {
  /**
   * Get all published lessons with optional filtering
   */
  async getAllLessons(query: {
    level?: string;
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const { level, category, page = 1, limit = 20, sort = 'order' } = query;

    const filter: any = { isPublished: true };
    if (level) filter.level = level;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const [lessons, total] = await Promise.all([
      Lesson.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-content'), // Don't return full content in list
      Lesson.countDocuments(filter),
    ]);

    return {
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get lesson by ID with full content
   */
  async getLessonById(id: string) {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }
    return lesson.toJSON();
  }

  /**
   * Create a new lesson (admin)
   */
  async createLesson(data: z.infer<typeof createLessonSchema>) {
    const lesson = await Lesson.create(data);
    return lesson.toJSON();
  }

  /**
   * Update a lesson (admin)
   */
  async updateLesson(id: string, data: z.infer<typeof updateLessonSchema>) {
    const lesson = await Lesson.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }
    return lesson.toJSON();
  }

  /**
   * Delete a lesson (admin)
   */
  async deleteLesson(id: string) {
    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }
    return { message: 'Lesson deleted successfully' };
  }

  /**
   * Get all lessons for admin (including unpublished)
   */
  async getAllLessonsAdmin(query: {
    page?: number;
    limit?: number;
    level?: string;
    isPublished?: string;
  }) {
    const { page = 1, limit = 20, level, isPublished } = query;

    const filter: any = {};
    if (level) filter.level = level;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const skip = (page - 1) * limit;

    const [lessons, total] = await Promise.all([
      Lesson.find(filter).sort('level order').skip(skip).limit(limit),
      Lesson.countDocuments(filter),
    ]);

    return {
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const lessonService = new LessonService();