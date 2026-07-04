import StudentProgress from '../models/StudentProgress';
import Lesson from '../models/Lesson';
import User from '../models/User';
import Exercise from '../models/Exercise';

export interface DashboardData {
  user: { firstName: string; lastName: string; email: string; subscriptionTier: string };
  stats: { streak: number; xp: number; totalStudyTime: number; hearts: number };
  levelProgress: Array<{ level: string; total: number; completed: number; status: string }>;
  overallProgress: number;
  lessonsCompleted: { completed: number; total: number };
  vocabularyLearned: number; grammarMastered: number; averageScore: number;
  weeklyActivity: Array<{ day: string; minutes: number }>;
  streakCalendar: Array<{ date: string; count: number }>;
  todayPlan: Array<{ id: string; title: string; type: string; completed: boolean }>;
  continueLearning: { unit: string; title: string; progress: number; lessonId: string } | null;
  recentAchievements: Array<{ id: string; title: string; description: string; earnedAt: string; icon: string }>;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function generateWeeklyActivity(progressRecords: any[]): Array<{ day: string; minutes: number }> {
  const today = new Date(); const result: Array<{ day: string; minutes: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const minutes = progressRecords.filter((p: any) => { const la = new Date(p.lastAccessedAt).getTime(); return la >= dayStart.getTime() && la < dayEnd.getTime(); }).reduce((sum: number, p: any) => sum + (p.timeSpent || 0), 0);
    result.push({ day: DAYS_SHORT[d.getDay()], minutes: Math.round(minutes) });
  }
  return result;
}

function generateStreakCalendar(): Array<{ date: string; count: number }> {
  const result: Array<{ date: string; count: number }> = []; const today = new Date();
  for (let i = 27; i >= 0; i--) { const d = new Date(today); d.setDate(d.getDate() - i); result.push({ date: d.toISOString().slice(0, 10), count: Math.random() > 0.55 ? Math.floor(Math.random() * 5) + 1 : 0 }); }
  return result;
}

export class DashboardService {
  async getDashboard(userId: string): Promise<DashboardData> {
    const user = await User.findById(userId);
    if (!user) throw { statusCode: 404, message: 'User not found' };
    const progressRecords = await StudentProgress.find({ userId }).populate('lessonId', 'title level category order').sort('-lastAccessedAt');
    const totalLessons = await Lesson.countDocuments({ isPublished: true });
    const completedLessons = progressRecords.filter((p) => p.status === 'completed').length;
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const completedWithScore = progressRecords.filter((p) => p.status === 'completed' && p.score !== undefined);
    const averageScore = completedWithScore.length > 0 ? Math.round(completedWithScore.reduce((sum, p) => sum + (p.score || 0), 0) / completedWithScore.length) : 0;
    const totalStudyTime = progressRecords.reduce((sum, p) => sum + p.timeSpent, 0);
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelProgress: Array<{ level: string; total: number; completed: number; status: string }> = [];
    let allPreviousCompleted = true;
    for (const level of levels) {
      const levelLessons = await Lesson.countDocuments({ level, isPublished: true });
      const completedLevelLessons = progressRecords.filter((p) => { const lesson = p.lessonId as any; return lesson && lesson.level === level && p.status === 'completed'; }).length;
      let status = 'locked';
      if (completedLevelLessons === levelLessons && levelLessons > 0) status = 'completed';
      else if (allPreviousCompleted) { status = 'active'; allPreviousCompleted = false; }
      else status = completedLevelLessons > 0 ? 'active' : 'locked';
      levelProgress.push({ level, total: levelLessons, completed: completedLevelLessons, status });
    }
    const completedLessonDocs = await Lesson.find({ _id: { $in: progressRecords.filter((p) => p.status === 'completed').map((p) => p.lessonId) } });
    const vocabularyLearned = completedLessonDocs.filter((l) => l.category === 'vocabulary').length;
    const grammarMastered = completedLessonDocs.filter((l) => l.category === 'grammar').length;
    const streak = user.streak || 0;
    const xp = user.xp || 0;
    const hearts = Math.max(1, 3 - Math.floor(completedLessons / 5));
    const weeklyActivity = generateWeeklyActivity(progressRecords);
    const streakCalendar = generateStreakCalendar();
    const incompleteLessonDocs = await Lesson.find({ _id: { $nin: progressRecords.filter((p) => p.status === 'completed').map((p) => p.lessonId) }, isPublished: true }).sort({ order: 1 }).limit(4);
    const todayPlan = incompleteLessonDocs.map((l) => ({ id: l._id.toString(), title: l.title, type: l.category, completed: false }));
    const inProgress = progressRecords.find((p) => p.status === 'in_progress');
    let continueLearning: DashboardData['continueLearning'] = null;
    if (inProgress && inProgress.lessonId) {
      const lesson = inProgress.lessonId as any;
      continueLearning = { unit: lesson.level || 'A1', title: lesson.title || 'Current Lesson', progress: 50, lessonId: inProgress.lessonId.toString?.() || lesson._id.toString() };
    } else if (completedLessons > 0) {
      const lastCompleted = progressRecords.filter((p) => p.status === 'completed').sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0))[0];
      if (lastCompleted && lastCompleted.lessonId) { const lesson = lastCompleted.lessonId as any; continueLearning = { unit: lesson.level || 'A1', title: lesson.title || 'Completed Lesson', progress: 100, lessonId: lastCompleted.lessonId.toString?.() || lesson._id.toString() }; }
    }
    const recentAchievements: DashboardData['recentAchievements'] = [];
    if (completedLessons >= 1) recentAchievements.push({ id: 'first-lesson', title: 'First Steps', description: 'Completed your first lesson!', earnedAt: new Date().toISOString(), icon: '🎉' });
    return { user: { firstName: user.firstName, lastName: user.lastName, email: user.email, subscriptionTier: user.subscriptionTier }, stats: { streak, xp, totalStudyTime, hearts }, levelProgress, overallProgress, lessonsCompleted: { completed: completedLessons, total: totalLessons }, vocabularyLearned, grammarMastered, averageScore, weeklyActivity, streakCalendar, todayPlan, continueLearning, recentAchievements };
  }
}
export const dashboardService = new DashboardService();
