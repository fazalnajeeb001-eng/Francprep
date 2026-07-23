import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
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
  Zap,
  Globe2,
  Users,
  Check,
  Star,
  Play
} from "lucide-react";
import { InteractiveHeroDemo } from "./InteractiveHeroDemo";
import { PRPointsCalculator } from "./PRPointsCalculator";

export function LandingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: "How does FrancPrep help with TCF and TEF Canada exams?",
      a: "FrancPrep's 11-page structured curriculum specifically targets NCLC 7+ (B2 Level) requirements mandated by IRCC for Canada Express Entry PR. Our exercises focus on real TCF/TEF listening, reading, writing, and speaking patterns."
    },
    {
      q: "How does the AI Pedagogical Tutor work?",
      a: "Our AI Engine evaluates your typed French answers in real time, checking grammar, vocabulary, and sentence structure. It explains mistakes in clear English using only concepts taught in your current CEFR lesson level, with bilingual flexibility for A1 and A2 learners."
    },
    {
      q: "Can I try FrancPrep for free?",
      a: "Yes! Our Free Starter plan gives you full access to Chapter 1 lessons, interactive Drag-and-Drop drills, and AI evaluation without requiring a credit card."
    },
    {
      q: "Does FrancPrep work on mobile devices?",
      a: "Yes! FrancPrep is 100% mobile responsive. All interactive matching exercises include touch-to-pair fallback and smooth mobile audio playback for listening comprehension."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="font-extrabold text-xl text-white">F</span>
            </div>
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
              FrancPrep
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#demo" className="hover:text-white transition-colors">Interactive Demo</a>
            <a href="#calculator" className="hover:text-white transition-colors">Canada PR Calculator</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>#1 AI-Powered Platform for TCF & TEF Canada</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Master French. <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                Claim Your Canada PR Points.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Structured 11-page CEFR curriculum, tactile drag-and-drop matching drills, and real-time AI tutor feedback designed to take you from <strong>A1 to NCLC 7+ (B2)</strong>.
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
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 rounded-2xl transition-all bg-slate-900/50 hover:bg-slate-800/50 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>Try Live Demo</span>
              </a>
            </div>

            {/* Micro stats */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-8 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>NCLC 7 Target Aligned</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Demo Widget in Hero */}
          <div className="lg:col-span-6" id="demo">
            <InteractiveHeroDemo />
          </div>
        </div>
      </section>

      {/* CANADA PR CALCULATOR SECTION */}
      <section className="py-20 bg-slate-900/60 border-y border-white/5" id="calculator">
        <div className="max-w-7xl mx-auto px-6">
          <PRPointsCalculator />
        </div>
      </section>

      {/* CEFR CURRICULUM ROADMAP SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="curriculum">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Proven Learning Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            11-Page Structured Lessons for Complete Mastery
          </h2>
          <p className="text-slate-400 text-base">
            Every lesson guides you step-by-step through context, vocabulary, grammar rules, native listening audio, interactive drills, and speaking practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Interactive Matching Drills</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Target answer cards start shuffled by default. Drag and drop or tap to pair questions with valid French answers.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pedagogical AI Tutor</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time grammar evaluations scoped to your CEFR level with bilingual flexibility for A1 and A2 comprehension drills.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3-Attempt Reveal Loop</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Attempts 1 & 2 are spoiler-free to encourage active thinking. Attempt 3 unlocks a single unified AI review and model answer card.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 bg-slate-900/40 border-t border-white/5" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Simple & Transparent Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Invest in Your French & Canada PR Future
            </h2>

            {/* Toggle Monthly / Annual */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 mt-4">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                  billingCycle === "monthly" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
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
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Starter Practice</h3>
                <p className="text-xs text-slate-400">Perfect for exploring the curriculum and testing interactive drills.</p>
                <div className="text-4xl font-extrabold text-white">$0 <span className="text-sm font-normal text-slate-400">/ forever</span></div>

                <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Chapter 1 A1 Full Lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Interactive Drag & Drop Drills
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Standard AI Evaluation
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full py-3.5 text-center text-sm font-semibold rounded-xl border border-slate-700 hover:border-slate-500 text-white bg-slate-800/60 hover:bg-slate-800 transition-all block"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro TCF/TEF Pass */}
            <div className="p-8 rounded-3xl border-2 border-purple-500/80 bg-gradient-to-b from-purple-950/40 via-slate-900/80 to-slate-900/90 backdrop-blur-md space-y-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-purple-600/20">
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold rounded-bl-xl uppercase tracking-wider">
                Recommended
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">TCF & TEF Canada Mastery Pass</h3>
                <p className="text-xs text-purple-200">Full access to A1-B2 CEFR curriculum and unlimited AI Tutor reviews.</p>
                <div className="text-4xl font-extrabold text-white">
                  {billingCycle === "annual" ? "$19" : "$24"}{" "}
                  <span className="text-sm font-normal text-purple-300">/ month</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/30 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Full A1, A2, B1, B2 CEFR Syllabi
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Unlimited Real-Time AI Tutor Feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> TCF/TEF Exam Preparation Simulators
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Native Audio & Pronunciation Practice
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full py-3.5 text-center text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all block"
              >
                Enroll Now & Claim Bonus PR Points
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-6" id="faq">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about FrancPrep and TCF/TEF Canada prep.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-semibold text-sm text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform ${faqOpen[idx] ? "rotate-180" : ""}`}
                />
              </button>
              {faqOpen[idx] && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
              F
            </div>
            <span className="font-bold text-slate-300">FrancPrep</span>
          </div>
          <p>© {new Date().getFullYear()} FrancPrep. All rights reserved. Built for TCF & TEF Canada Success.</p>
        </div>
      </footer>
    </div>
  );
}
