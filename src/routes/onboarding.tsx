import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Award,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Target,
  Clock,
  BookOpen,
  SkipForward,
  ChevronRight,
  Flame,
  FileCheck2,
  GraduationCap
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { GOAL_OPTIONS, setGoal as saveGoalToStorage, setDailyStudyGoal, type LearningGoal } from "~/components/dashboard/utils/userPrefs";

export const Route = createFileRoute("/onboarding")({ component: OnboardingPage });

interface Question {
  id: number;
  level: "A1" | "A2" | "B1" | "B2";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const PLACEMENT_QUESTIONS: Question[] = [
  // ─── A1 DISCOVERY (Questions 1 to 5) ───
  {
    id: 1,
    level: "A1",
    question: "Choose the correct phrase for: 'Hello, how are you?'",
    options: [
      "Bonjour, comment allez-vous ?",
      "Au revoir, à bientôt !",
      "S'il vous plaît, merci.",
      "Bonne nuit, dormez bien."
    ],
    correct: 0,
    explanation: "'Bonjour, comment allez-vous ?' is the standard polite French greeting."
  },
  {
    id: 2,
    level: "A1",
    question: "Select the correct form of the verb 'avoir' (to have): 'J'____ 25 ans.'",
    options: ["suis", "ai", "habite", "fait"],
    correct: 1,
    explanation: "In French, age is expressed with 'avoir': 'J'ai 25 ans'."
  },
  {
    id: 3,
    level: "A1",
    question: "Which option correctly completes the sentence: 'Marie a ____ beaux livres.'",
    options: ["de", "un", "une", "des"],
    correct: 0,
    explanation: "Before a plural adjective preceding a noun ('beaux livres'), 'des' becomes 'de'."
  },
  {
    id: 4,
    level: "A1",
    question: "Fill in the blank: 'Où ____-vous ? — À Montréal.'",
    options: ["habitez", "habiter", "habites", "habite"],
    correct: 0,
    explanation: "With subject pronoun 'vous', the regular -er verb ending is '-ez'."
  },
  {
    id: 5,
    level: "A1",
    question: "What is the English translation of: 'Qu'est-ce que c'est ?'",
    options: ["Where is it?", "What is this?", "Who is it?", "How much is it?"],
    correct: 1,
    explanation: "'Qu'est-ce que c'est ?' means 'What is it?' or 'What is this?'."
  },

  // ─── A2 BREAKTHROUGH (Questions 6 to 10) ───
  {
    id: 6,
    level: "A2",
    question: "Which sentence correctly uses the Passé Composé with 'être'?",
    options: [
      "Hier, elle a partie à huit heures.",
      "Hier, elle est partie à huit heures.",
      "Hier, elle allait partir à huit heures.",
      "Hier, elle sera partie à huit heures."
    ],
    correct: 1,
    explanation: "Verbs of movement like 'partir' take 'être' in Passé Composé and agree in gender: 'elle est partie'."
  },
  {
    id: 7,
    level: "A2",
    question: "Complete with Imparfait vs Passé Composé: 'Pendant que je ____, le téléphone a sonné.'",
    options: ["dormais", "suis dormi", "dort", "dormirai"],
    correct: 0,
    explanation: "Background ongoing actions use the Imparfait ('dormais') when interrupted by an event ('a sonné')."
  },
  {
    id: 8,
    level: "A2",
    question: "Replace the object with a pronoun: 'Je vois le professeur tous les matins.'",
    options: [
      "Je lui vois tous les matins.",
      "Je le vois tous les matins.",
      "Je la vois tous les matins.",
      "Je les vois tous les matins."
    ],
    correct: 1,
    explanation: "'Le professeur' is masculine direct object, replaced by 'le'."
  },
  {
    id: 9,
    level: "A2",
    question: "Select the correct Future Proche structure: 'Demain, nous ____ visiter le musée.'",
    options: ["allons", "irons", "sommes", "avons"],
    correct: 0,
    explanation: "Le Futur Proche = Aller (present) + Infinitive: 'nous allons visiter'."
  },
  {
    id: 10,
    level: "A2",
    question: "Choose the correct comparative: 'Ce train est ____ rapide que le bus.'",
    options: ["plus", "très", "beaucoup", "aussi que"],
    correct: 0,
    explanation: "Superiority comparative format: 'plus + adjective + que'."
  },

  // ─── B1 THRESHOLD (Questions 11 to 15) ───
  {
    id: 11,
    level: "B1",
    question: "Select the correct Subjunctive form: 'Je veux que tu ____ à l'heure.'",
    options: ["es", "sois", "étais", "seras"],
    correct: 1,
    explanation: "Expressions of will/desire ('Je veux que') require the Subjunctive mood ('sois')."
  },
  {
    id: 12,
    level: "B1",
    question: "Choose the correct relative pronoun: 'C'est la ville ____ je suis né.'",
    options: ["qui", "que", "où", "dont"],
    correct: 2,
    explanation: "'Où' is used as a relative pronoun for places ('la ville où je suis né')."
  },
  {
    id: 13,
    level: "B1",
    question: "Which sentence correctly forms a present conditional hypothesis?",
    options: [
      "Si j'ai de l'argent, j'achèterais cette voiture.",
      "Si j'avais de l'argent, j'achèterais cette voiture.",
      "Si j'aurais de l'argent, j'achèterais cette voiture.",
      "Si j’avais de l’argent, j’achèterai cette voiture."
    ],
    correct: 1,
    explanation: "Present hypothesis rule: Si + Imparfait ('avais') -> Conditionnel présent ('achèterais')."
  },
  {
    id: 14,
    level: "B1",
    question: "Identify the correct Passive Voice transformation for: 'Le ministre a signé le décret.'",
    options: [
      "Le décret était signé par le ministre.",
      "Le décret a été signé par le ministre.",
      "Le décret sera signé par le ministre.",
      "Le décret est en train de signer par le ministre."
    ],
    correct: 1,
    explanation: "Passé Composé passive: Avoir (present) + été + past participle: 'a été signé'."
  },
  {
    id: 15,
    level: "B1",
    question: "Convert to Indirect Speech: 'Il m'a dit : \"Je viendrai demain.\"'",
    options: [
      "Il m'a dit qu'il viendra demain.",
      "Il m'a dit qu'il viendrait le lendemain.",
      "Il m'a dit qu'il est venu le lendemain.",
      "Il m'a dit qu'il va venir demain."
    ],
    correct: 1,
    explanation: "When introductory verb is past, Future ('viendrai') shifts to Conditionnel ('viendrait') and 'demain' to 'le lendemain'."
  },

  // ─── B2 VANTAGE (Questions 16 to 20) ───
  {
    id: 16,
    level: "B2",
    question: "Select the correct connector: '____ la pluie battante, le match a été maintenu.'",
    options: ["Bien que", "Malgré", "Parce que", "Grâce à"],
    correct: 1,
    explanation: "'Malgré' is followed directly by a noun ('la pluie battante'). 'Bien que' requires a full clause with subjunctive."
  },
  {
    id: 17,
    level: "B2",
    question: "Choose the correct Past Subjunctive form: 'Je suis ravi que vous ____ votre examen.'",
    options: ["réussissiez", "ayez réussi", "avez réussi", "auriez réussi"],
    correct: 1,
    explanation: "Past Subjunctive (completed action with emotion): Avoir in Subjunctive ('ayez') + Past Participle ('réussi')."
  },
  {
    id: 18,
    level: "B2",
    question: "Identify the formal academic connector: 'Cependant, il convient de ____ ces résultats avec prudence.'",
    options: ["nuancer", "regarder", "savoir", "dire"],
    correct: 0,
    explanation: "'Nuancer' (to qualify/refine) is formal academic vocabulary essential for B2/TCF essays."
  },
  {
    id: 19,
    level: "B2",
    question: "Which sentence correctly uses the Gérondif to show cause or manner?",
    options: [
      "En travaillant régulièrement, il a obtenu son C1.",
      "Pour travailler régulièrement, il a obtenu son C1.",
      "Pendant travailler régulièrement, il a obtenu son C1.",
      "Sur travailler régulièrement, il a obtenu son C1."
    ],
    correct: 0,
    explanation: "Le Gérondif is formed with 'En + Present Participle' ('En travaillant') to express manner or means."
  },
  {
    id: 20,
    level: "B2",
    question: "Select the formal transition for a TCF argument: '____ la mesure est impopulaire, elle demeure nécessaire.'",
    options: ["Si bien que", "Même si", "En outre", "C'est pourquoi"],
    correct: 1,
    explanation: "'Même si' expresses concession followed by indicative in formal argumentation."
  }
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [step, setStep] = useState<"goal" | "pace" | "choice" | "test" | "result">("goal");

  // Step 1: Goal wired directly to userPrefs
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>("TCF_B2");

  // Step 2: Pace
  const [selectedPace, setSelectedPace] = useState<number>(30);

  // Step 4: Placement Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [testScore, setTestScore] = useState<number>(0);
  const [evaluatedLevel, setEvaluatedLevel] = useState<"A1" | "A2" | "B1" | "B2">("A1");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const paces = [
    { mins: 15, label: "Regular Study", desc: "15 mins/day • ~1 lesson/day", icon: Clock },
    { mins: 30, label: "Target Pace", desc: "30 mins/day • ~2 lessons/day (Recommended)", icon: Flame, popular: true },
    { mins: 45, label: "Accelerated", desc: "45 mins/day • ~3 lessons/day", icon: BookOpen },
    { mins: 60, label: "Exam Sprint", desc: "60 mins/day • ~5 lessons/day", icon: Sparkles }
  ];

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handlePlayQuestionAudio = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.85;
    u.onstart = () => setIsPlayingAudio(true);
    u.onend = () => setIsPlayingAudio(false);
    u.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(u);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Level-gated scoring evaluation for 100% accuracy
      let a1Count = 0, a2Count = 0, b1Count = 0, b2Count = 0;
      let totalCorrect = 0;

      PLACEMENT_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correct) {
          totalCorrect++;
          if (q.level === "A1") a1Count++;
          if (q.level === "A2") a2Count++;
          if (q.level === "B1") b1Count++;
          if (q.level === "B2") b2Count++;
        }
      });

      setTestScore(totalCorrect);

      // Strict Level Progression Requirement:
      let level: "A1" | "A2" | "B1" | "B2" = "A1";

      // To reach A2: Must score >= 4/5 on A1 and >= 3/5 on A2
      if (a1Count >= 4 && a2Count >= 3) {
        level = "A2";
        // To reach B1: Must score >= 4/5 on A2 and >= 3/5 on B1
        if (a2Count >= 4 && b1Count >= 3) {
          level = "B1";
          // To reach B2: Must score >= 4/5 on B1 and >= 3/5 on B2
          if (b1Count >= 4 && b2Count >= 3) {
            level = "B2";
          }
        }
      }

      setEvaluatedLevel(level);
      setStep("result");
    }
  };

  const handleFinishOnboarding = async (levelOverride?: string) => {
    const finalLevel = levelOverride || (step === "result" ? evaluatedLevel : "A1");

    // 1. Save goal directly via userPrefs (triggers 'goal-changed' event for Dashboard!)
    saveGoalToStorage(selectedGoal);
    setDailyStudyGoal(selectedPace);

    // 2. Persist to backend database so profile syncs
    try {
      await apiFetch("/user/profile/goal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: selectedGoal }),
      });
    } catch {}

    // 3. Save onboarding level
    localStorage.setItem("francprep_onboarding_completed", "true");
    localStorage.setItem("francprep_user_level", finalLevel);

    navigate({ to: "/dashboard" });
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900"} flex flex-col justify-between p-4 md:p-8 transition-colors duration-300 overflow-x-hidden`}>
      {/* Top Header */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
            F
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">FrancPrep</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 uppercase font-mono block">Exam Preparation System</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span className={step === "goal" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>1. Target Goal</span> ➔
          <span className={step === "pace" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>2. Daily Pace</span> ➔
          <span className={step === "choice" || step === "test" || step === "result" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>3. Placement</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto my-auto py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: TARGET GOAL SELECTION */}
          {step === "goal" && (
            <motion.div
              key="step-goal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Academic & Exam Focus</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Select Your Primary Target Goal
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Your selected goal displays directly in your Dashboard header and configures your milestone exam targets. You can change this anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-left max-w-3xl mx-auto">
                {GOAL_OPTIONS.map((g) => {
                  const isSelected = selectedGoal === g.value;
                  return (
                    <div
                      key={g.value}
                      onClick={() => setSelectedGoal(g.value)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/15 ring-2 ring-purple-500/30 text-purple-900 dark:text-purple-100 shadow-md"
                          : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{g.emoji}</span>
                        <span className="text-sm font-bold">{g.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-gray-400"}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end max-w-3xl mx-auto">
                <button
                  onClick={() => setStep("pace")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2"
                >
                  <span>Continue to Daily Pace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PACE SELECTION */}
          {step === "pace" && (
            <motion.div
              key="step-pace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Study Habit</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Select Your Daily Exam Study Pace
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Consistent structured practice drives rapid CEFR progress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {paces.map((p) => {
                  const IconComp = p.icon;
                  const isSelected = selectedPace === p.mins;
                  return (
                    <div
                      key={p.mins}
                      onClick={() => setSelectedPace(p.mins)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30 shadow-xl"
                          : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-300"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-extrabold uppercase">
                          Recommended
                        </span>
                      )}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold">{p.label}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{p.desc}</p>
                      </div>
                      <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                        {p.mins} Mins / Day
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep("goal")}
                  className="px-6 py-3.5 rounded-2xl border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep("choice")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2"
                >
                  <span>Continue to Placement Choice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: LEVEL PLACEMENT CHOICE */}
          {step === "choice" && (
            <motion.div
              key="step-choice"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CEFR Diagnostic Benchmark</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Where should we start your French syllabus?
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Beginners can start immediately at A1 Discovery. Learners with prior experience can take our 20-question comprehensive diagnostic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                {/* Option A: Start A1 */}
                <div
                  onClick={() => handleFinishOnboarding("A1")}
                  className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#101828]/80 hover:border-purple-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Recommended for Complete Mastery
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        Start at A1 Discovery (Absolute Zero)
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Begin with phonetics, greetings, and basic sentence structures. Ideal for complete beginners or thorough review.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Start at A1 Level</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Option B: Take 20-Q Test */}
                <div
                  onClick={() => {
                    setCurrentQIndex(0);
                    setSelectedAnswers({});
                    setStep("test");
                  }}
                  className="p-8 rounded-3xl border border-purple-500/30 bg-purple-500/10 hover:border-purple-500 transition-all cursor-pointer shadow-xl flex flex-col justify-between space-y-6 group ring-1 ring-purple-500/20"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
                      <Compass className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                        20-Question CEFR Diagnostic
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        Take Diagnostic Placement Test
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      20 comprehensive diagnostic questions across A1, A2, B1, and B2 grammar, vocabulary, and sentence structures.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-300 group-hover:translate-x-1 transition-transform">
                    <span>Launch 20-Q Diagnostic Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center max-w-3xl mx-auto">
                <button
                  onClick={() => setStep("pace")}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  ← Back
                </button>

                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 font-semibold"
                >
                  <span>Skip test & start on A1 directly</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PLACEMENT TEST IN PROGRESS */}
          {step === "test" && (
            <motion.div
              key="step-test"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 max-w-2xl mx-auto text-left p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#101828]/90 backdrop-blur-xl shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 font-mono text-[10px]">
                      {PLACEMENT_QUESTIONS[currentQIndex].level} Stage
                    </span>
                    <span>Question {currentQIndex + 1} of {PLACEMENT_QUESTIONS.length}</span>
                  </span>
                  <span>{Math.round(((currentQIndex + 1) / PLACEMENT_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-bold leading-snug">
                    {PLACEMENT_QUESTIONS[currentQIndex].question}
                  </h2>
                  <button
                    onClick={() => handlePlayQuestionAudio(PLACEMENT_QUESTIONS[currentQIndex].question)}
                    className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 shrink-0"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlayingAudio ? "animate-bounce" : ""}`} />
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-3 pt-2">
                  {PLACEMENT_QUESTIONS[currentQIndex].options.map((opt, idx) => {
                    const isSelected = selectedAnswers[PLACEMENT_QUESTIONS[currentQIndex].id] === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectAnswer(PLACEMENT_QUESTIONS[currentQIndex].id, idx)}
                        className={`p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-500/40 dark:bg-purple-500/20 dark:text-purple-300 shadow-sm"
                            : "border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 hover:border-purple-500 hover:bg-purple-50/40 shadow-sm"
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-slate-400"}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  Skip test anytime (Default to A1)
                </button>

                <button
                  disabled={selectedAnswers[PLACEMENT_QUESTIONS[currentQIndex].id] === undefined}
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/25"
                >
                  <span>{currentQIndex === PLACEMENT_QUESTIONS.length - 1 ? "Submit & View Diagnostic" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: TEST RESULT BENCHMARK */}
          {step === "result" && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 max-w-xl mx-auto text-center p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#101828]/90 backdrop-blur-xl shadow-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Comprehensive Diagnostic Complete
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Evaluated Benchmark: {evaluatedLevel}
                </h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  You scored <strong className="text-purple-600 dark:text-purple-400">{testScore} / {PLACEMENT_QUESTIONS.length}</strong> on the 20-question diagnostic.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-left space-y-2">
                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                  💡 Level Recommendation:
                </p>
                <p className="text-gray-700 dark:text-slate-200">
                  {evaluatedLevel === "A1" && "Starting at A1 Discovery will build your core vocabulary, greetings, and basic sentence structures."}
                  {evaluatedLevel === "A2" && "Starting at A2 Breakthrough will build your conversational past tense and daily social transactions."}
                  {evaluatedLevel === "B1" && "Starting at B1 Threshold will prepare you for independent speech, essay drills, and initial TCF/TEF prep."}
                  {evaluatedLevel === "B2" && "Starting at B2 Vantage will prepare you directly for NCLC 7 TCF/TEF Canada exam practice!"}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleFinishOnboarding(evaluatedLevel)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <span>Accept {evaluatedLevel} Benchmark & Enter App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleFinishOnboarding("A1")}
                  className="w-full py-3 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  Start at A1 Foundations Anyway
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-500 py-4 border-t border-gray-200 dark:border-white/10">
        FrancPrep Fluency System • TCF / TEF Canada & DELF / DALF Standard
      </div>
    </div>
  );
}
