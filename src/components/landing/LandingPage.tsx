import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Layers,
  Brain,
  Moon,
  Sun,
  Play,
  Check,
  Shield
} from "lucide-react";
import { InteractiveHeroDemo } from "./InteractiveHeroDemo";
import { CEFRRoadmap } from "./CEFRRoadmap";
import { GatedProgression } from "./GatedProgression";
import { PRPointsCalculator } from "./PRPointsCalculator";
import { AvatarCoachesSection } from "./AvatarCoachesSection";
import { useTheme } from "~/lib/ThemeContext";

// Central Brand Configuration - Change here anytime!
export const BRAND_CONFIG = {
  name: "FrancPrep",
  tagline: "The Academic CEFR French Fluency System",
  targetExams: "DELF / DALF & TCF / TEF Canada",
};

export function LandingPage() {
  const { dark: isDarkMode, toggle: toggleTheme } = useTheme();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: "What makes FrancPrep different from apps like Duolingo or Babbel?",
      a: "Commercial language apps focus on casual vocabulary games without structured academic depth. FrancPrep is a comprehensive 436-lesson CEFR fluency curriculum (A1 through C2) with gated DELF/DALF & TCF/TEF milestone exams to ensure genuine fluency."
    },
    {
      q: "How does the Skippable Placement Test work?",
      a: "New students can take an optional 5-minute placement assessment to benchmark their skills. By default, students start at A1 Discovery to build an unbreakable foundation, but experienced learners can request level bypass."
    },
    {
      q: "How does the Pedagogical AI Tutor work?",
      a: "Our AI Engine evaluates your typed French responses in real time. It provides 1-2 sentence corrections in clear English, scoped strictly to what you have learned up to your current CEFR level, with bilingual flexibility for A1 and A2 learners."
    },
    {
      q: "Can I use FrancPrep for TCF or TEF Canada PR Points?",
      a: "Yes! Reaching NCLC 7+ (B2 Level) in FrancPrep fulfills IRCC requirements for Canada Express Entry, yielding up to +50 bonus CRS points."
    }
  ];

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden relative font-sans selection:bg-purple-500 selection:text-white transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-slate-100 dark" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
        isDarkMode ? "bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-blue-600/20" : "bg-gradient-to-tr from-purple-300/30 via-indigo-200/20 to-blue-300/30"
      }`} />

      {/* Header Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        isDarkMode ? "bg-slate-950/80 border-white/10" : "bg-white/80 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="font-extrabold text-xl text-white">F</span>
            </div>
            <span className={`font-extrabold text-2xl tracking-tight ${
              isDarkMode ? "bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent" : "text-slate-900"
            }`}>
              {BRAND_CONFIG.name}
            </span>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-semibold ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}>
            <a href="#roadmap" className="hover:text-purple-500 transition-colors">436-Lesson Roadmap</a>
            <a href="#gated" className="hover:text-purple-500 transition-colors">Gated Progression</a>
            <a href="#calculator" className="hover:text-purple-500 transition-colors">PR Calculator</a>
            <a href="#pricing" className="hover:text-purple-500 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-500 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                isDarkMode ? "border-white/10 bg-white/5 text-amber-400 hover:bg-white/10" : "border-gray-200 bg-gray-100 text-slate-700 hover:bg-gray-200"
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/login"
              className={`text-sm font-semibold px-3 py-2 transition-colors ${
                isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold backdrop-blur-md ${
              isDarkMode ? "border-purple-500/30 bg-purple-500/10 text-purple-300" : "border-purple-200 bg-purple-50 text-purple-700"
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>436 Academic Lessons • A1 to C2 CEFR System</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              From Absolute Zero to <br />
              <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                C2 Native Fluency.
              </span>
            </h1>

            <p className={`text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0 font-normal ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}>
              The complete academic French fluency platform with 436 structured lessons, gated DELF/DALF milestone exams, and real-time AI Tutor reviews.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#demo"
                className={`w-full sm:w-auto px-8 py-4 text-base font-semibold border rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  isDarkMode ? "border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-200" : "border-gray-200 bg-white hover:bg-gray-100 text-slate-800"
                }`}
              >
                <Play className="w-4 h-4 text-purple-500 fill-purple-500" />
                <span>Try Live Platform Engine</span>
              </a>
            </div>

            <div className="pt-6 border-t border-gray-200/50 dark:border-slate-800/80 flex items-center justify-center lg:justify-start gap-8 text-xs text-gray-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Credit Card Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>NCLC 7+ Express Entry Boost</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Hero Demo */}
          <div className="lg:col-span-6" id="demo">
            <InteractiveHeroDemo />
          </div>
        </div>
      </section>

      {/* 4 CORE SKILLS & 3D AI AVATARS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5" id="coaches">
        <AvatarCoachesSection />
      </section>

      {/* 436 LESSON ROADMAP SECTION */}
      <section className={`py-24 border-y transition-colors ${
        isDarkMode ? "bg-slate-900/60 border-white/5" : "bg-slate-100/70 border-gray-200"
      }`} id="roadmap">
        <div className="max-w-7xl mx-auto px-6">
          <CEFRRoadmap />
        </div>
      </section>

      {/* GATED PROGRESSION SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="gated">
        <GatedProgression />
      </section>

      {/* CANADA PR CALCULATOR SECTION */}
      <section className={`py-24 border-y transition-colors ${
        isDarkMode ? "bg-slate-900/60 border-white/5" : "bg-slate-100/70 border-gray-200"
      }`} id="calculator">
        <div className="max-w-7xl mx-auto px-6">
          <PRPointsCalculator />
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="pricing">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Simple & Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Invest in Your Academic French Future
          </h2>

          <div className={`inline-flex items-center gap-3 p-1.5 rounded-2xl border mt-4 ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
          }`}>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                billingCycle === "monthly" ? "bg-purple-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-purple-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-500 text-slate-950 font-bold rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Starter */}
          <div className={`p-8 rounded-3xl border space-y-6 flex flex-col justify-between ${
            isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-gray-200 shadow-xl"
          }`}>
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold">Free Starter</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Full access to A1 Discovery lessons and matching drills.</p>
              <div className="text-4xl font-extrabold">$0 <span className="text-sm font-normal text-gray-400">/ forever</span></div>

              <ul className="space-y-3 pt-4 border-t border-gray-200 dark:border-slate-800 text-xs font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> A1 Chapter 1 Lessons & Audio
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Interactive Drag & Pair Drills
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Skippable Placement Assessment
                </li>
              </ul>
            </div>

            <Link
              to="/signup"
              className={`w-full py-3.5 text-center text-sm font-bold rounded-xl border transition-all block ${
                isDarkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700 text-white" : "border-gray-300 bg-gray-100 hover:bg-gray-200 text-slate-900"
              }`}
            >
              Start Free Learning
            </Link>
          </div>

          {/* Pro Full Pass */}
          <div className="p-8 rounded-3xl border-2 border-purple-500 bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-900 backdrop-blur-md space-y-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-purple-600/30 text-white">
            <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold rounded-bl-xl uppercase tracking-wider">
              Recommended
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold">Academic All-Access Pass</h3>
              <p className="text-xs text-purple-200">Full 436-lesson A1 to C2 access & gated milestone exams.</p>
              <div className="text-4xl font-extrabold">
                {billingCycle === "annual" ? "$19" : "$24"}{" "}
                <span className="text-sm font-normal text-purple-300">/ month</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-purple-500/30 text-xs font-medium text-purple-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> All 436 Lessons Across A1, A2, B1, B2, C1, C2
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Unlimited Real-Time AI Tutor Feedback
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> DELF / DALF & TCF / TEF Milestone Exams
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Express Entry +50 CRS Points Guaranteed Roadmap
                </li>
              </ul>
            </div>

            <Link
              to="/signup"
              className="w-full py-3.5 text-center text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all block"
            >
              Enroll Now & Master French
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-6" id="faq">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Everything you need to know about the FrancPrep academic system.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isDarkMode ? "border-white/10 bg-slate-900/50" : "border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-500 transition-transform ${faqOpen[idx] ? "rotate-180" : ""}`}
                />
              </button>
              {faqOpen[idx] && (
                <div className={`px-5 pb-5 text-xs leading-relaxed border-t pt-3 ${
                  isDarkMode ? "border-white/5 text-slate-400" : "border-gray-100 text-slate-600"
                }`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t text-center text-xs ${
        isDarkMode ? "border-white/10 text-slate-500" : "border-gray-200 text-slate-500"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
              F
            </div>
            <span className="font-bold text-purple-400">{BRAND_CONFIG.name}</span>
          </div>
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. The Academic CEFR French Fluency System.</p>
        </div>
      </footer>
    </div>
  );
}
