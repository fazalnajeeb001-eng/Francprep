import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, BookOpen, PenTool, Headphones, Mic, Sparkles, UserCheck, Bot } from "lucide-react";
import { SmartAvatar } from "../dashboard/widgets/SmartAvatar";

export function AvatarCoachesSection() {
  const [selectedAvatar, setSelectedAvatar] = useState<"male" | "female">("male");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState("Bonjour ! Bienvenue sur FrancPrep. Ensemble, nous allons maîtriser le français !");

  const handleSpeakDemo = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const skills = [
    {
      icon: BookOpen,
      title: "1. Reading Module",
      desc: "Authentic French dialogues and real-world texts with interactive vocabulary tooltips.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: PenTool,
      title: "2. Writing Module",
      desc: "Typed sentence creation and essay drills evaluated in real time by the Level-Scoped AI Tutor.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Headphones,
      title: "3. Listening Module",
      desc: "Native audio dialogues, speed controls, and listening comprehension checks.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Mic,
      title: "4. Speaking Module",
      desc: "Audio pronunciation recording & live interactive 3D AI Avatar speaking coaches.",
      color: "from-amber-500 to-rose-500",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
          <Bot className="w-3.5 h-3.5" />
          <span>4 Core Skills & 3D Avatar AI Coaches</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          4 Core Skills in Every Lesson + Live 3D Avatars
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Every single one of FrancPrep's 436 lessons integrates Reading, Writing, Listening, and Speaking with live 3D AI avatars guiding your pronunciation.
        </p>
      </div>

      {/* 4 Core Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, idx) => {
          const IconComp = skill.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${skill.color} text-white flex items-center justify-center shadow-md`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {skill.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <span>AI Evaluated</span> ➔
              </div>
            </div>
          );
        })}
      </div>

      {/* Live 3D Avatar Interactive Coach Feature Card */}
      <div className="p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 text-white shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Avatar Language Coaches</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Meet Your 3D AI Conversation Coaches
            </h3>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
              Instead of static text, every lesson features 3D VRM avatars that speak in native French accents, animate their expressions, and guide your speaking drills based on the current lesson level.
            </p>

            {/* Avatar Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Choose Coach:</span>
              <button
                onClick={() => setSelectedAvatar("male")}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  selectedAvatar === "male"
                    ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-500/30"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Coach Leo (Male)
              </button>
              <button
                onClick={() => setSelectedAvatar("female")}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  selectedAvatar === "female"
                    ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-500/30"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Coach Camille (Female)
              </button>
            </div>

            {/* Speaking Demo Action */}
            <div className="pt-2">
              <button
                onClick={handleSpeakDemo}
                className="px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-bounce" : ""}`} />
                <span>{isSpeaking ? "Coach Speaking..." : "Test 3D Avatar Live French Speech"}</span>
              </button>
            </div>
          </div>

          {/* 3D Avatar Render Canvas Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px] h-[340px] rounded-3xl bg-slate-950/60 border border-white/15 p-4 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
              <SmartAvatar
                gender={selectedAvatar}
                size={260}
                animate={isSpeaking ? "speak" : "wave"}
              />
              <div className="mt-2 text-center">
                <p className="text-xs font-bold text-white">
                  {selectedAvatar === "male" ? "Coach Leo" : "Coach Camille"}
                </p>
                <p className="text-[10px] text-purple-300">
                  {isSpeaking ? "🗣️ Speaking Native French..." : "👋 Ready for Practice"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
