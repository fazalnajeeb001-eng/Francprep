import StudentProgress from '../models/StudentProgress';
import Lesson from '../models/Lesson';
import User from '../models/User';
import { updateProgressSchema } from '../utils/validators';
import { z } from 'zod';

export class ProgressService {
  async getUserProgress(userId: string) {
    const progressRecords = await StudentProgress.find({ userId }).populate('lessonId', 'title level category order').sort('-lastAccessedAt');
    const totalLessons = await Lesson.countDocuments({ isPublished: true });
    const completedLessons = progressRecords.filter((p) => p.status === 'completed').length;
    const inProgressLessons = progressRecords.filter((p) => p.status === 'in_progress').length;
    const completedRecords = progressRecords.filter((p) => p.status === 'completed' && p.score !== undefined);
    const averageScore = completedRecords.length > 0 ? Math.round(completedRecords.reduce((sum, p) => sum + (p.score || 0), 0) / completedRecords.length) : 0;
    const totalTimeSpent = progressRecords.reduce((sum, p) => sum + p.timeSpent, 0);
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelProgress: { level: string; total: number; completed: number }[] = [];
    for (const level of levels) {
      const levelLessons = await Lesson.countDocuments({ level, isPublished: true });
      const completedLevelLessons = progressRecords.filter((p) => { const lesson = p.lessonId as any; return lesson && lesson.level === level && p.status === 'completed'; }).length;
      levelProgress.push({ level, total: levelLessons, completed: completedLevelLessons });
    }
    return { overall: { totalLessons, completedLessons, inProgressLessons, notStartedLessons: totalLessons - completedLessons - inProgressLessons, completionPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0, averageScore, totalTimeSpent }, levelProgress, recentActivity: progressRecords.slice(0, 10) };
  }

  async getLessonProgress(userId: string, lessonId: string) {
    const [progress, lesson] = await Promise.all([StudentProgress.findOne({ userId, lessonId }), Lesson.findById(lessonId)]);
    if (!lesson) throw { statusCode: 404, message: 'Lesson not found' };
    return { lesson: lesson.toJSON(), progress: progress ? progress.toJSON() : { status: 'not_started', exercisesCompleted: 0, totalExercises: 0, timeSpent: 0, score: undefined } };
  }

  async updateProgress(userId: string, lessonId: string, data: z.infer<typeof updateProgressSchema>) {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw { statusCode: 404, message: 'Lesson not found' };
    const updateData: any = { ...data, lastAccessedAt: new Date() };
    if (data.status === 'in_progress' && !data.exercisesCompleted) { updateData.$setOnInsert = { startedAt: new Date() }; }
    if (data.status === 'completed') { updateData.completedAt = new Date(); }
    const progress = await StudentProgress.findOneAndUpdate({ userId, lessonId }, { $set: updateData }, { upsert: true, new: true, runValidators: true });

    // Update streak and XP when lesson is completed
    if (data.status === 'completed') {
      const user = await User.findById(userId);
      if (user) {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        user.xp = (user.xp || 0) + 10;
        if (user.lastStudyDate) {
          const last = new Date(user.lastStudyDate); last.setHours(0, 0, 0, 0);
          const diff = (today.getTime() - last.getTime()) / 86400000;
          if (diff === 1) { user.streak = (user.streak || 0) + 1; }
          else if (diff > 1) { user.streak = 1; }
          // if same day, keep streak
        } else { user.streak = 1; }
        user.lastStudyDate = new Date();
        await user.save();
      }
    }
    return progress.toJSON();
  }

  async getAllProgressForUser(userId: string) {
    return StudentProgress.find({ userId }).populate('lessonId', 'title level category').sort('-lastAccessedAt');
  }
}
export const progressService = new ProgressService();
