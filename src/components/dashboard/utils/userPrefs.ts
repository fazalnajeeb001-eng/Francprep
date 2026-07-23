const GOAL_KEY = "fp_learning_goal";
const AVATAR_KEY = "fp_user_avatar";

export type LearningGoal = "A2" | "B1" | "B2" | "C1" | "C2" | "TCF_B2" | "TEF_B2" | "DELF_B2" | "DALF_C1" | "none";

export interface GoalData {
  goal: LearningGoal;
  label: string;
  setAt: number;
}

const GOAL_LABELS: Record<LearningGoal, string> = {
  A2: "Reach A2", B1: "Reach B1", B2: "Reach B2", C1: "Reach C1", C2: "Reach C2",
  TCF_B2: "Pass TCF Canada (B2)", TEF_B2: "Pass TEF Canada (B2)",
  DELF_B2: "Pass DELF (B2)", DALF_C1: "Pass DALF (C1)",
  none: "No goal for now",
};

export function getGoal(): GoalData | null {
  try {
    const stored = localStorage.getItem(GOAL_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch { return null; }
}

export function setGoal(goal: LearningGoal): GoalData {
  const data: GoalData = { goal, label: GOAL_LABELS[goal], setAt: Date.now() };
  localStorage.setItem(GOAL_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("goal-changed"));
  return data;
}

const DAILY_GOAL_KEY = "fp_daily_study_goal_mins";

export function getDailyStudyGoal(): number {
  try {
    const val = localStorage.getItem(DAILY_GOAL_KEY);
    return val ? parseInt(val, 10) : 30;
  } catch {
    return 30;
  }
}

export function setDailyStudyGoal(mins: number) {
  localStorage.setItem(DAILY_GOAL_KEY, String(mins));
  window.dispatchEvent(new Event("daily-goal-changed"));
}

export function getAvatar(): string | null {
  try { return localStorage.getItem(AVATAR_KEY); }
  catch { return null; }
}

export function setAvatar(dataUrl: string) {
  localStorage.setItem(AVATAR_KEY, dataUrl);
}

export function clearAvatar() {
  localStorage.removeItem(AVATAR_KEY);
}

export const GOAL_OPTIONS: Array<{ value: LearningGoal; label: string; emoji: string }> = [
  { value: "TCF_B2", label: "Pass TCF Canada (B2)", emoji: "📋" },
  { value: "TEF_B2", label: "Pass TEF Canada (B2)", emoji: "📝" },
  { value: "DELF_B2", label: "Pass DELF (B2)", emoji: "🎓" },
  { value: "DALF_C1", label: "Pass DALF (C1)", emoji: "📜" },
  { value: "A2", label: "Reach A2 Breakthrough", emoji: "🌱" },
  { value: "B1", label: "Reach B1 Threshold", emoji: "🌿" },
  { value: "B2", label: "Reach B2 Vantage", emoji: "🌳" },
  { value: "C1", label: "Reach C1 Autonomous", emoji: "🏙️" },
  { value: "C2", label: "Reach C2 Mastery", emoji: "🏆" },
  { value: "none", label: "No goal for now", emoji: "✨" },
];

export const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const LEVEL_BACKGROUNDS: Record<string, { gradient: string; scene: string; label: string }> = {
  A1: { gradient: "from-amber-900/40 via-amber-800/20 to-green-900/30", scene: "🏡", label: "Small French Village" },
  A2: { gradient: "from-orange-900/40 via-amber-800/20 to-yellow-900/30", scene: "🏪", label: "Lively Market Square" },
  B1: { gradient: "from-blue-900/40 via-indigo-800/20 to-purple-900/30", scene: "☕", label: "Parisian Cafés" },
  B2: { gradient: "from-purple-900/40 via-pink-800/20 to-rose-900/30", scene: "🗼", label: "Iconic Landmark" },
  C1: { gradient: "from-orange-900/30 via-rose-800/20 to-purple-900/40", scene: "🌅", label: "Paris Skyline at Sunset" },
  C2: { gradient: "from-yellow-900/30 via-amber-800/20 to-purple-900/40", scene: "🎆", label: "Grand Celebration" },
};

export function getGreeting(): { greeting: string; emoji: string; motivational: string } {
  const hour = new Date().getHours();
  const isEvening = hour >= 18 || hour < 6;
  const emoji = isEvening ? "🌙" : "☀️";
  const word = isEvening ? "Bonsoir" : "Bonjour";
  const motivations = [
    "Every lesson brings you closer to fluency.",
    "Consistency is the key to mastery.",
    "Today is a great day to learn something new.",
    "Your dedication is paying off!",
    "Small steps lead to big progress.",
    "Keep the momentum going!",
    "You're building something amazing.",
  ];
  const motivational = motivations[new Date().getDay() % motivations.length];
  return { greeting: word, emoji, motivational };
}
