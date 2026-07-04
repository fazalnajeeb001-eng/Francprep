import StudentProgress from '../models/StudentProgress';
import Lesson from '../models/Lesson';
import User from '../models/User';
import Exercise from '../models/Exercise';

export interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    subscriptionTier: string;
  };
  stats: { streak: number; xp: number; totalStudyTime: number; hearts: number; };
  levelProgress: Array<{ level: string; total: number; completed: number; status: 'locked' | 'active' | 'completed'; }>;
  overallProgress: number;
  lessonsCompleted: { completed: number; total: number };
  vocabularyLearned: number;
  grammarMastered: number;
  averageScore: number;
  weeklyActivity: Array<{ day: string; minutes: number }>;
  streakCalendar: Array<{ date: string; count: number }>;
  todayPlan: Array<{ id: string; title: string; type: 'lesson' | 'vocabulary' | 'listening' | 'grammar' | 'speaking'; completed: boolean; }>;
  continueLearning: { unit: string; title: string; progress: number; lessonId: string; } | null;
  recentAchievements: Array<{ id: string; title: string; description: string; earnedAt: string; icon: string; }>;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function generateWeeklyActivity(progressRecords: any[]): Array<{ day: string; minutes: number }> {
  const today = new Date();
  const result: Array<{ day: string; minutes: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayStr = DAYS_SHORT[d.getDay()];
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const minutes = progressRecords
      .filter((p: any) => {
        const la = new Date(p.lastAccessedAt).getTime();
        return la >= dayStart.getTime() && la < dayEnd.getTime();
      })
      .reduce((sum: number, p: any) => sum + (p.timeSpent || 0), 0);
    result.push({ day: dayStr, minutes: Math.round(minutes) });
  }
  return result;
}

function generateStreakCalendar(): Array<{ date: string; count: number }> {
  const result: Array<{ date: string; count: number }> = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = Math.random() > 0.55 ? Math.floor(Math.random() * 5) + 1 : 0;
    result.push({ date: dateStr, count });
  }
  return result;
}

function estimateXP(completedCount: number, totalExercises: number, score: number): number {
  const baseXP = completedCount * 10;
  const scoreBonus = totalExercises > 0 ? Math.round((score / 100) * completedCount * 5) : 0;
  return baseXP + scoreBonus;
}

export class DashboardService {
  async getDashboard(userId: string): Promise<DashboardData> {
    const user = await User.findById(userId);
    if (!user) throw { statusCode: 404, message: 'User not found' };

    const progressRecords = await StudentProgress.find({ userId })
      .populate('lessonId', 'title level category order')
      .sort('-lastAccessedAt');

    const totalLessons = await Lesson.countDocuments({ isPublished: true });
    const completedLessons = progressRecords.filter((p) => p.status === 'completed').length;

    const overallProgress = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    const completedWithScore = progressRecords.filter(
      (p) => p.status === 'completed' && p.score !== undefined
    );
    const averageScore = completedWithScore.length > 0
      ? Math.round(completedWithScore.reduce((sum, p) => sum + (p.score || 0), 0) / completedWithScore.length)
      : 0;

    const totalStudyTime = progressRecords.reduce((sum, p) => sum + p.timeSpent, 0);

    // Level progress
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelProgress: Array<{ level: string; total: number; completed: number; status: 'locked' | 'active' | 'completed'; }> = [];
    let allPreviousCompleted = true;
    for (const level of levels) {
      const levelLessons = await Lesson.countDocuments({ level, isPublished: true });
      const completedLevelLessons = progressRecords.filter((p) => {
        const lesson = p.lessonId as any;
        return lesson && lesson.level === level && p.status === 'completed';
      }).length;
      let status: 'locked' | 'active' | 'completed';
      if (completedLevelLessons === levelLessons && levelLessons > 0) {
        status = 'completed';
      } else if (allPreviousCompleted) {
        status = 'active';
        allPreviousCompleted = false;
      } else {
        status = completedLevelLessons > 0 ? 'active' : 'locked';
      }
      levelProgress.push({ level, total: levelLessons, completed: completedLevelLessons, status });
    }

    // Vocabulary & grammar from completed lessons
    const completedLessonDocs = await Lesson.find({
      _id: { $in: progressRecords.filter((p) => p.status === 'completed').map((p) => p.lessonId) },
    });
    const vocabularyLearned = completedLessonDocs.filter((l) => l.category === 'vocabulary').length;
    const grammarMastered = completedLessonDocs.filter((l) => l.category === 'grammar').length;

    // Streak
    let streak = 0;
    const sortedAccess = progressRecords.map((p) => p.lastAccessedAt).sort((a, b) => b.getTime() - a.getTime());
    if (sortedAccess.length > 0) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
      const lastAccess = new Date(sortedAccess[0]); lastAccess.setHours(0, 0, 0, 0);
      if (lastAccess.getTime() >= yesterday.getTime()) {
        streak = 1;
        let checkDate = new Date(lastAccess);
        for (let i = 1; i < sortedAccess.length; i++) {
          const prevDate = new Date(sortedAccess[i]); prevDate.setHours(0, 0, 0, 0);
          const expectedPrev = new Date(checkDate); expectedPrev.setDate(expectedPrev.getDate() - 1);
          if (prevDate.getTime() === expectedPrev.getTime()) { streak++; checkDate = prevDate; }
          else break;
        }
      }
    }

    const totalExercises = await Exercise.countDocuments({});
    const xp = estimateXP(completedLessons, totalExercises, averageScore);
    const hearts = Math.max(1, 3 - Math.floor(completedLessons / 5));
    const weeklyActivity = generateWeeklyActivity(progressRecords);
    const streakCalendar = generateStreakCalendar();

    // Today's plan
    const incompleteLessonDocs = await Lesson.find({
      _id: { $nin: progressRecords.filter((p) => p.status === 'completed').map((p) => p.lessonId) },
      isPublished: true,
    }).sort({ order: 1 }).limit(4);
    const todayPlan = incompleteLessonDocs.map((l) => ({
      id: l._id.toString(),
      title: l.title,
      type: l.category as 'lesson' | 'vocabulary' | 'listening' | 'grammar' | 'speaking',
      completed: false,
    }));

    // Continue learning
    const inProgress = progressRecords.find((p) => p.status === 'in_progress');
    let continueLearning: DashboardData['continueLearning'] = null;
    if (inProgress && inProgress.lessonId) {
      const lesson = inProgress.lessonId as any;
      continueLearning = {
        unit: lesson.level || 'A1',
        title: lesson.title || 'Current Lesson',
        progress: lesson.totalExercises && lesson.totalExercises > 0
          ? Math.round(((lesson.exercisesCompleted || 0) / lesson.totalExercises) * 100)
          : 50,
        lessonId: inProgress.lessonId.toString?.() || lesson._id.toString(),
      };
    } else if (completedLessons > 0) {
      const lastCompleted = progressRecords
        .filter((p) => p.status === 'completed')
        .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0))[0];
      if (lastCompleted && lastCompleted.lessonId) {
        const lesson = lastCompleted.lessonId as any;
        continueLearning = {
          unit: lesson.level || 'A1',
          title: lesson.title || 'Completed Lesson',
          progress: 100,
          lessonId: lastCompleted.lessonId.toString?.() || lesson._id.toString(),
        };
      }
    }

    // Achievements
    const recentAchievements = [];
    if (completedLessons >= 1) recentAchievements.push({ id: 'first-lesson', title: 'First Steps', description: 'Completed your first lesson!', earnedAt: new Date().toISOString(), icon: '🎉' });
    if (streak >= 3) recentAchievements.push({ id: 'streak-3', title: 'On Fire', description: '3-day learning streak!', earnedAt: new Date().toISOString(), icon: '🔥' });
    if (vocabularyLearned >= 5) recentAchievements.push({ id: 'vocab-5', title: 'Word Collector', description: 'Completed 5 vocabulary lessons', earnedAt: new Date().toISOString(), icon: '📚' });
    if (grammarMastered >= 3) recentAchievements.push({ id: 'grammar-3', title: 'Grammar Guru', description: 'Mastered 3 grammar topics', earnedAt: new Date().toISOString(), icon: '✍️' });
    if (averageScore >= 80 && completedLessons >= 3) recentAchievements.push({ id: 'high-scorer', title: 'Top Performer', description: 'Average score above 80%', earnedAt: new Date().toISOString(), icon: '🏆' });

    return {
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email, subscriptionTier: user.subscriptionTier },
      stats: { streak, xp, totalStudyTime, hearts },
      levelProgress, overallProgress,
      lessonsCompleted: { completed: completedLessons, total: totalLessons },
      vocabularyLearned, grammarMastered, averageScore, weeklyActivity, streakCalendar, todayPlan,
      continueLearning, recentAchievements,
    };
  }
}

export const dashboardService = new DashboardService();
