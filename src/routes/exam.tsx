import { createFileRoute, useNavigate, Outlet, useMatch, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Clock,
  Play,
  Sparkles,
  FileText,
  CheckCircle2,
  Lock,
  Volume2,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { useAuth } from "~/lib/AuthContext";
import { getExamRegistry, type ExamMode, type ExamType } from "~/lib/examSchema";

export const Route = createFileRoute("/exam")({ component: ExamRouteLayout });

function ExamRouteLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const matchDelfIndex = useMatch({ from: "/exam/delf/", shouldThrow: false });
  const matchDelfPaper = useMatch({ from: "/exam/delf/$paperId", shouldThrow: false });
  const matchPaperId = useMatch({ from: "/exam/$paperId", shouldThrow: false });
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" search={{ redirect: pathname || "/exam" }} replace />;
  }

  if (matchDelfIndex || matchDelfPaper || matchPaperId || pathname.includes('/exam/delf')) {
    return <Outlet />;
  }

  return <ExamHubPage />;
}

export function ExamHubPage() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const { user } = useAuth();

  // Wizard Step State: 1 = Exam Type, 2 = Mode, 3 = Select Paper
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<ExamType>("TCF_CANADA");
  const [selectedMode, setSelectedMode] = useState<ExamMode>("PRACTICE");

  const activeLang = (user?.activeLanguage || (typeof window !== "undefined" ? localStorage.getItem("fp_active_language") : "fr") || "fr").toLowerCase().trim();

  const examConfig = (function() {
    if (activeLang === 'de' || activeLang === 'ger' || activeLang === 'german') {
      return {
        brand: 'GermanPrep',
        title: 'Goethe-Zertifikat & TestDaF Simulators 🇩🇪',
        subtitle: 'Practice under authentic Goethe-Zertifikat B1/B2 & TestDaF exam conditions to achieve your target German B2/C1 score.',
        predictor: 'Goethe B2 / TestDaF Predictor',
        card1: { type: 'TCF_CANADA' as ExamType, badge: 'Goethe-Institut e.V.', title: 'Goethe-Zertifikat B2 Simulator', desc: 'Official German language diploma for university admission & work visa. Evaluates 4 skills: Lesen (65m), Hören (40m), Schreiben (75m), and Sprechen (15m).' },
        card2: { type: 'TEF_CANADA' as ExamType, badge: 'TestDaF-Institut', title: 'TestDaF (TDN 4) Exam Suite', desc: 'Standardized academic German language test for foreign applicants to German universities. Evaluates reading comprehension, listening, writing, and speaking.' }
      };
    }
    if (activeLang === 'es' || activeLang === 'spa' || activeLang === 'spanish') {
      return {
        brand: 'SpanPrep',
        title: 'DELE & SIELE Exam Simulators 🇪🇸',
        subtitle: 'Practice under authentic DELE B1/B2 & SIELE Global exam conditions to achieve your target Spanish B2 score.',
        predictor: 'DELE B2 / SIELE Predictor',
        card1: { type: 'TCF_CANADA' as ExamType, badge: 'Instituto Cervantes', title: 'DELE B2 Simulator', desc: 'Official diploma certifying Spanish competence granted by Instituto Cervantes. 4 Tests: Lectura (70m), Auditiva (40m), Escritura (80m), and Oral (20m).' },
        card2: { type: 'TEF_CANADA' as ExamType, badge: 'SIELE Global', title: 'SIELE Global Exam Suite', desc: 'International Spanish Language Evaluation Service certifying Spanish proficiency electronically on a scale of 0 to 1000.' }
      };
    }
    if (activeLang === 'it' || activeLang === 'ita' || activeLang === 'italian') {
      return {
        brand: 'ItalPrep',
        title: 'CILS & CELI Exam Simulators 🇮🇹',
        subtitle: 'Practice under authentic CILS B1/B2 & CELI 3 exam conditions to achieve your target Italian B2 score.',
        predictor: 'CILS B2 / CELI Predictor',
        card1: { type: 'TCF_CANADA' as ExamType, badge: 'Università per Stranieri di Siena', title: 'CILS B2 Simulator', desc: 'Official Italian certification recognized by Italian ministries & universities. 5 Sections: Ascolto, Lettura, Strutture, Produzione Scritta e Orale.' },
        card2: { type: 'TEF_CANADA' as ExamType, badge: 'Università per Stranieri di Perugia', title: 'CELI 3 Exam Suite', desc: 'Certificato di Conoscenza della Lingua Italiana certifying upper-intermediate B2 Italian competence.' }
      };
    }
    // Default French Track
    return {
      brand: 'FrancPrep',
      title: 'TCF & TEF Canada Exam Simulators 🇨🇦',
      subtitle: 'Practice under authentic exam conditions or guided practice mode to achieve your target NCLC 7+ B2 score.',
      predictor: 'NCLC 7+ Practice Predictor',
      card1: { type: 'TCF_CANADA' as ExamType, badge: 'FEI / France Éducation International', title: 'TCF Canada Simulator', desc: 'Test de connaissance du français pour le Canada. Evaluates 4 skills: Listening (39q • 35m), Reading (39q • 60m), Writing (3 tasks • 60m), and Speaking (3 tasks • 12m).' },
      card2: { type: 'TEF_CANADA' as ExamType, badge: 'CCI Paris Île-de-France', title: 'TEF Canada & DELF B2 Suite', desc: 'Test d\'évaluation de français. Evaluates Listening (60q • 40m), Reading (50q • 60m), Writing (2 tasks • 60m), and Speaking (2 tasks • 15m).' }
    };
  })();

  const registry = getExamRegistry();
  const filteredPapers = registry.filter((p) => p.type === selectedType && p.published && (p.recommendedMode === selectedMode || !p.recommendedMode));

  const handleLaunchPaper = (paperId: string) => {
    navigate({
      to: "/exam/$paperId",
      params: { paperId },
      search: { mode: selectedMode },
    });
  };

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">

        {/* ─── TOP HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>{examConfig.brand} Authentic CBT Exam Practice Standard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {examConfig.title}
            </h1>
            <p className={`text-sm ${txtSec} mt-1`}>
              {examConfig.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{examConfig.predictor}</span>
            </span>
          </div>
        </div>

        {/* ─── INDEPENDENT PRACTICE LEGAL DISCLAIMER BANNER ─── */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${dark ? "bg-amber-500/10 border-amber-500/20 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
          <p className="font-bold flex items-center gap-1.5 mb-1">
            <span>🛑</span> Independent Diagnostic Practice Disclaimer:
          </p>
          <p className="opacity-90">
            {examConfig.brand} is an independent learning platform powered by the FrancPrep engine and is not affiliated with, endorsed by, or accredited by Goethe-Institut, TestDaF-Institut, Instituto Cervantes, FEI, CCI, or official testing organizations. This CBT simulator provides diagnostic practice for self-assessment purposes only.
          </p>
        </div>

        {/* ─── 3-STEP WIZARD PROGRESS BAR ─── */}
        <div className="flex items-center justify-between max-w-3xl mx-auto px-4 py-2">
          {/* Step 1 Pill */}
          <button
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all ${
              activeStep === 1
                ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 scale-105"
                : activeStep > 1
                ? "bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20"
                : `${dark ? "bg-white/5 text-gray-400" : "bg-gray-200 text-gray-600"}`
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
              activeStep === 1 ? "bg-white text-purple-600" : activeStep > 1 ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
            }`}>
              {activeStep > 1 ? "✓" : "1"}
            </span>
            <span className="text-xs font-semibold">1. Exam Target</span>
          </button>

          <ChevronRight className="w-4 h-4 text-gray-400" />

          {/* Step 2 Pill */}
          <button
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all ${
              activeStep === 2
                ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 scale-105"
                : activeStep > 2
                ? "bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20"
                : `${dark ? "bg-white/5 text-gray-400" : "bg-gray-200 text-gray-600"}`
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
              activeStep === 2 ? "bg-white text-purple-600" : activeStep > 2 ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
            }`}>
              {activeStep > 2 ? "✓" : "2"}
            </span>
            <span className="text-xs font-semibold">2. Execution Mode</span>
          </button>

          <ChevronRight className="w-4 h-4 text-gray-400" />

          {/* Step 3 Pill */}
          <button
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all ${
              activeStep === 3
                ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 scale-105"
                : `${dark ? "bg-white/5 text-gray-400" : "bg-gray-200 text-gray-600"}`
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
              activeStep === 3 ? "bg-white text-purple-600" : "bg-gray-400 text-white"
            }`}>
              3
            </span>
            <span className="text-xs font-semibold">3. Select Set & Launch</span>
          </button>
        </div>

        {/* ─── WIZARD CONTENT PANELS ─── */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: EXAM TYPE SELECTION */}
          {activeStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Step 1: Select Your Target Exam</h2>
                <p className={`text-xs md:text-sm ${txtSec}`}>
                  Choose which official Canadian immigration test format you are preparing for.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TCF Canada Card */}
                <div
                  onClick={() => {
                    setSelectedType("TCF_CANADA");
                    setActiveStep(2);
                  }}
                  className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-6 group hover:scale-[1.02] ${
                    selectedType === "TCF_CANADA"
                      ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/40 shadow-2xl"
                      : `${cardBg} hover:border-purple-400`
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                        {examConfig.card1.badge}
                      </span>
                      {selectedType === "TCF_CANADA" && <CheckCircle2 className="w-6 h-6 text-purple-500" />}
                    </div>
                    <h3 className="text-2xl font-extrabold group-hover:text-purple-400 transition-colors">
                      {examConfig.card1.title}
                    </h3>
                    <p className={`text-xs md:text-sm ${txtSec} leading-relaxed`}>
                      {examConfig.card1.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Hören / Listening</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Lesen / Reading</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      <span>Schreiben / Writing</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      <span>Sprechen / Speaking</span>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all">
                    <span>Select {examConfig.card1.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Card 2 */}
                <div
                  onClick={() => {
                    setSelectedType("TEF_CANADA");
                    setActiveStep(2);
                  }}
                  className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-6 group hover:scale-[1.02] ${
                    selectedType === "TEF_CANADA"
                      ? "border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/40 shadow-2xl"
                      : `${cardBg} hover:border-indigo-400`
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                        {examConfig.card2.badge}
                      </span>
                      {selectedType === "TEF_CANADA" && <CheckCircle2 className="w-6 h-6 text-indigo-500" />}
                    </div>
                    <h3 className="text-2xl font-extrabold group-hover:text-indigo-400 transition-colors">
                      {examConfig.card2.title}
                    </h3>
                    <p className={`text-xs md:text-sm ${txtSec} leading-relaxed`}>
                      {examConfig.card2.desc}
                    </p>
                  </div>


                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>40 Listening Qs</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>40 Reading Qs</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      <span>2 Writing Tasks</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      <span>2 Speaking Tasks</span>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all">
                    <span>Select {examConfig.card2.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EXECUTION MODE SELECTION */}
          {activeStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-1">
                  Selected Target: {selectedType === "TCF_CANADA" ? "TCF Canada" : "TEF Canada"}
                </div>
                <h2 className="text-2xl font-bold">Step 2: Choose Execution Mode</h2>
                <p className={`text-xs md:text-sm ${txtSec}`}>
                  Select whether you want guided practice support or an unpausable real test-center exam environment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guided Practice Mode */}
                <div
                  onClick={() => {
                    setSelectedMode("PRACTICE");
                    setActiveStep(3);
                  }}
                  className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:scale-[1.02] ${
                    selectedMode === "PRACTICE"
                      ? "border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-500/40 shadow-2xl"
                      : `${cardBg} hover:border-emerald-400`
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-emerald-500" />
                        <span className="font-extrabold text-xl">Guided Practice Mode</span>
                      </div>
                      {selectedMode === "PRACTICE" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    </div>

                    <p className={`text-xs md:text-sm ${txtSec}`}>
                      Study at your own pace with helpful learning aids and hints designed to build confidence.
                    </p>

                    <ul className="text-xs space-y-2.5 text-gray-700 dark:text-gray-200">
                      <li className="flex items-center gap-2">✓ <strong>Pausable Countdown Timer</strong></li>
                      <li className="flex items-center gap-2">✓ <strong>Grammar & Vocab Hints Toggle</strong></li>
                      <li className="flex items-center gap-2">✓ <strong>Audio Transcripts & EN Translations</strong></li>
                      <li className="flex items-center gap-2">✓ <strong>Guided Writing Tips & Model Answers</strong></li>
                      <li className="flex items-center gap-2">✓ <strong>AI Speaking Coach Feedback Suggestions</strong></li>
                    </ul>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all">
                    <span>Continue with Guided Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Official Real Exam Mode */}
                <div
                  onClick={() => {
                    setSelectedMode("EXAM");
                    setActiveStep(3);
                  }}
                  className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:scale-[1.02] ${
                    selectedMode === "EXAM"
                      ? "border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40 shadow-2xl"
                      : `${cardBg} hover:border-rose-400`
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-6 h-6 text-rose-500" />
                        <span className="font-extrabold text-xl">Official Real Exam Mode</span>
                      </div>
                      {selectedMode === "EXAM" && <CheckCircle2 className="w-6 h-6 text-rose-500" />}
                    </div>

                    <p className={`text-xs md:text-sm ${txtSec}`}>
                      Simulates authentic test-center computer-based test (CBT) exam day conditions.
                    </p>

                    <ul className="text-xs space-y-2.5 text-gray-700 dark:text-gray-200">
                      <li className="flex items-center gap-2">⚡ <strong>Strict Unpausable Timer</strong></li>
                      <li className="flex items-center gap-2">🔒 <strong>Zero Hints or Translations</strong></li>
                      <li className="flex items-center gap-2">🔒 <strong>Official High-Contrast Test Center Screen</strong></li>
                      <li className="flex items-center gap-2">📊 <strong>Instant Automated Grading & NCLC Score Report</strong></li>
                      <li className="flex items-center gap-2">🏆 <strong>Express Entry CRS Point Evaluation</strong></li>
                    </ul>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all">
                    <span>Continue with Real Exam Mode</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() => setActiveStep(1)}
                  className={`px-4 py-2 rounded-xl border ${cardBg} text-xs font-semibold hover:text-purple-400 transition-colors flex items-center gap-1.5`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 1</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MOCK PAPER SELECTION & LAUNCH */}
          {activeStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-purple-400">Current Selections:</span>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all flex items-center gap-1"
                  >
                    <span>Target: {selectedType === "TCF_CANADA" ? "TCF Canada" : "TEF Canada"}</span>
                    <span className="text-[10px] opacity-75">✏️</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(2)}
                    className={`px-3 py-1 rounded-full text-white text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedMode === "EXAM" ? "bg-rose-600 hover:bg-rose-500" : "bg-emerald-600 hover:bg-emerald-500"
                    }`}
                  >
                    <span>Mode: {selectedMode === "EXAM" ? "Real Exam" : "Guided Practice"}</span>
                    <span className="text-[10px] opacity-75">✏️</span>
                  </button>
                </div>

                <span className={`text-xs ${txtSec} font-semibold`}>
                  {filteredPapers.length} Published Mock Paper(s)
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-center md:text-left space-y-1">
                  <h2 className="text-2xl font-bold">Step 3: Select Mock Paper & Launch Simulator</h2>
                  <p className={`text-xs md:text-sm ${txtSec}`}>
                    Click below to launch your authentic computer-based test simulator.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className={`p-6 rounded-3xl border ${cardBg} flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-400 transition-all shadow-lg`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[10px] font-mono font-bold">
                            {paper.code}
                          </span>
                          {paper.isSamplePaper && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                              Official Practice Sample
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold">{paper.title}</h3>
                        <p className={`text-xs ${txtSec}`}>{paper.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {paper.totalDurationMins} Minutes Total
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {paper.sections.length} Tested Sections
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchPaper(paper.id)}
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 shrink-0 group transition-all hover:scale-105"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Launch Simulator ({selectedMode === "EXAM" ? "Real Exam Mode" : "Practice Mode"})</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() => setActiveStep(2)}
                  className={`px-4 py-2 rounded-xl border ${cardBg} text-xs font-semibold hover:text-purple-400 transition-colors flex items-center gap-1.5`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 2</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
