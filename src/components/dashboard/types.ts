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

export interface ThemeProps { dark: boolean; }
