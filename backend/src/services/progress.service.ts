import StudentProgress from '../models/StudentProgress';
import Lesson from '../models/Lesson';
import { updateProgressSchema } from '../utils/validators';
import { z } from 'zod';

export class ProgressService {
  /**
   * Get overall progress for a user
   */
  async getUserProgress(userId: string) {
    const progressRecords = await StudentProgress.find({ userId })
      .populate('lessonId', 'title level category order')
      .sort('-lastAccessedAt');

    const totalLessons = await Lesson.countDocuments({ isPublished: true });
    const completedLessons = progressRecords.filter(
      (p) => p.status === 'completed'
    ).length;
    const inProgressLessons = progressRecords.filter(
      (p) => p.status === 'in_progress'
    ).length;

    // Calculate overall score
    const completedRecords = progressRecords.filter(
      (p) => p.status === 'completed' && p.score !== undefined
    );
    const averageScore =
      completedRecords.length > 0
        ? Math.round(
            completedRecords.reduce((sum, p) => sum + (p.score || 0), 0) /
              completedRecords.length
          )
        : 0;

    // Time spent
    const totalTimeSpent = progressRecords.reduce(
      (sum, p) => sum + p.timeSpent,
      0
    );

    // Progress by level
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelProgress: { level: string; total: number; completed: number }[] = [];

    for (const level of levels) {
      const levelLessons = await Lesson.countDocuments({
        level,
        isPublished: true,
      });
      const completedLevelLessons = progressRecords.filter((p) => {
        const lesson = p.lessonId as any;
        return lesson && lesson.level === level && p.status === 'completed';
      }).length;

      levelProgress.push({
        level,
        total: levelLessons,
        completed: completedLevelLessons,
      });
    }

    return {
      overall: {
        totalLessons,
        completedLessons,
        inProgressLessons,
        notStartedLessons: totalLessons - completedLessons - inProgressLessons,
        completionPercentage:
          totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0,
        averageScore,
        totalTimeSpent,
      },
      levelProgress,
      recentActivity: progressRecords.slice(0, 10),
    };
  }

  /**
   * Get progress for a specific lesson
   */
  async getLessonProgress(userId: string, lessonId: string) {
    const [progress, lesson] = await Promise.all([
      StudentProgress.findOne({ userId, lessonId }),
      Lesson.findById(lessonId),
    ]);

    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    return {
      lesson: lesson.toJSON(),
      progress: progress
        ? progress.toJSON()
        : {
            status: 'not_started',
            exercisesCompleted: 0,
            totalExercises: 0,
            timeSpent: 0,
            score: undefined,
          },
    };
  }

  /**
   * Update progress for a specific lesson
   */
  async updateProgress(
    userId: string,
    lessonId: string,
    data: z.infer<typeof updateProgressSchema>
  ) {
    // Check lesson exists
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    const updateData: any = {
      ...data,
      lastAccessedAt: new Date(),
    };

    if (data.status === 'in_progress' && !data.exercisesCompleted) {
      updateData.$setOnInsert = { startedAt: new Date() };
    }

    if (data.status === 'completed') {
      updateData.completedAt = new Date();
    }

    const progress = await StudentProgress.findOneAndUpdate(
      { userId, lessonId },
      { $set: updateData },
      { upsert: true, new: true, runValidators: true }
    );

    return progress.toJSON();
  }

  /**
   * Get all progress records for a user (admin view)
   */
  async getAllProgressForUser(userId: string) {
    const progressRecords = await StudentProgress.find({ userId })
      .populate('lessonId', 'title level category')
      .sort('-lastAccessedAt');

    return progressRecords;
  }
}

export const progressService = new ProgressService();