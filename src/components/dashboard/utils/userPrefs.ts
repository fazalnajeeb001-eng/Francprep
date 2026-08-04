const GOAL_KEY = "fp_learning_goal";
const AVATAR_KEY = "fp_user_avatar";

export type LearningGoal = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "TCF_B2" | "TEF_B2" | "none";

export interface GoalData {
  goal: LearningGoal;
  label: string;
  setAt: number;
}

export function getGoalOptionsForLanguage(langCode: string = "fr") {
  const code = langCode.toLowerCase().trim();
  if (code === "de" || code === "ger" || code === "german") {
    return [
      { value: "GOETHE_B2" as LearningGoal, label: "Pass Goethe-Zertifikat B2", emoji: "🇩🇪" },
      { value: "TESTDAF_B2" as LearningGoal, label: "Pass TestDaF Exam (TDN 4)", emoji: "🎯" },
      { value: "A1" as LearningGoal, label: "Goethe A1 (Start Deutsch 1)", emoji: "🌱" },
      { value: "A2" as LearningGoal, label: "Goethe A2 (Start Deutsch 2)", emoji: "🌿" },
      { value: "B1" as LearningGoal, label: "Goethe B1 (Zertifikat B1)", emoji: "🚀" },
      { value: "B2" as LearningGoal, label: "Goethe B2 (Zertifikat B2)", emoji: "🎓" },
      { value: "C1" as LearningGoal, label: "Goethe C1 (Zertifikat C1)", emoji: "🏆" },
    ];
  }
  if (code === "es" || code === "spa" || code === "spanish") {
    return [
      { value: "DELE_B2" as LearningGoal, label: "Pass DELE B2 Certification", emoji: "🇪🇸" },
      { value: "SIELE_B2" as LearningGoal, label: "Pass SIELE Global Exam", emoji: "🎯" },
      { value: "A1" as LearningGoal, label: "DELE A1 (Acceso)", emoji: "🌱" },
      { value: "A2" as LearningGoal, label: "DELE A2 (Plataforma)", emoji: "🌿" },
      { value: "B1" as LearningGoal, label: "DELE B1 (Umbral)", emoji: "🚀" },
      { value: "B2" as LearningGoal, label: "DELE B2 (Avanzado)", emoji: "🎓" },
      { value: "C1" as LearningGoal, label: "DELE C1 (Dominio)", emoji: "🏆" },
    ];
  }
  if (code === "it" || code === "ita" || code === "italian") {
    return [
      { value: "CILS_B2" as LearningGoal, label: "Pass CILS B2 Certification", emoji: "🇮🇹" },
      { value: "CELI_B2" as LearningGoal, label: "Pass CELI 3 B2 Exam", emoji: "🎯" },
      { value: "A1" as LearningGoal, label: "CILS A1 (Contatto)", emoji: "🌱" },
      { value: "A2" as LearningGoal, label: "CILS A2 (Sviluppo)", emoji: "🌿" },
      { value: "B1" as LearningGoal, label: "CILS B1 (Autonomia)", emoji: "🚀" },
      { value: "B2" as LearningGoal, label: "CILS B2 (Padronanza)", emoji: "🎓" },
    ];
  }
  // Default French Track
  return [
    { value: "TCF_B2" as LearningGoal, label: "Pass TCF Canada (B2)", emoji: "🇨🇦" },
    { value: "TEF_B2" as LearningGoal, label: "Pass TEF Canada (B2)", emoji: "🍁" },
    { value: "A1" as LearningGoal, label: "DELF A1 (Discovery)", emoji: "🌱" },
    { value: "A2" as LearningGoal, label: "DELF A2 (Breakthrough)", emoji: "🌿" },
    { value: "B1" as LearningGoal, label: "DELF B1 (Threshold)", emoji: "🚀" },
    { value: "B2" as LearningGoal, label: "DELF B2 (Vantage)", emoji: "🎓" },
    { value: "C1" as LearningGoal, label: "DALF C1 (Autonomous)", emoji: "🏆" },
  ];
}

export const GOAL_OPTIONS = getGoalOptionsForLanguage("fr");

export function getGoalLabelsForLanguage(langCode: string = "fr"): Record<string, string> {
  const opts = getGoalOptionsForLanguage(langCode);
  const map: Record<string, string> = { none: "No goal set" };
  opts.forEach(o => { map[o.value] = o.label; });
  return map;
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
