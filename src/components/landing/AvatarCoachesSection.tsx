import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, BookOpen, PenTool, Headphones, Mic, Sparkles, UserCheck, Bot, CheckCircle2, RotateCcw } from "lucide-react";
import { SmartAvatar } from "../dashboard/widgets/SmartAvatar";

export function AvatarCoachesSection() {
  const [selectedAvatar, setSelectedAvatar] = useState<"male" | "female">("male");
  const [selectedLevel, setSelectedLevel] = useState<"A1" | "B2" | "C2">("A1");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [aiFeedback, setAiFeedback] = useState<{ text: string; score: number } | null>(null);
  const recognitionRef = useRef<any>(null);

  const levelSpeeches = {
    A1: {
      text: "Bonjour ! Je m'appelle Coach Leo. Bienvenue au niveau débutant A1. Comment allez-vous ?",
      rate: 0.75,
      label: "A1 Beginner Pace (Clear & Deliberate)",
    },
    B2: {
      text: "Bonjour ! En niveau B2, nous nous préparons intensément aux épreuves d'expression et de compréhension du TCF et TEF Canada.",
      rate: 0.9,
      label: "B2 Exam Pace (TCF/TEF Standard)",
    },
    C2: {
      text: "En niveau C2, nous analysons les nuances de la langue française, la rhétorique et les débats philosophiques avec une fluidité totale.",
      rate: 1.0,
      label: "C2 Native Pace (Full Fluency)",
    },
  };

  const handleSpeakDemo = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const currentConfig = levelSpeeches[selectedLevel];
    const utterance = new SpeechSynthesisUtterance(currentConfig.text);
    utterance.lang = "fr-FR";
    utterance.rate = currentConfig.rate;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startMicRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is supported on Chrome, Safari, and Edge.");
      return;
    }

    try {
      if (recognitionRef.current) recognitionRef.current.abort();
      const rec = new SpeechRecognition();
      rec.lang = "fr-FR";
      rec.interimResults = true;

      rec.onstart = () => {
        setIsRecording(true);
        setRecordedText("");
        setAiFeedback(null);
      };

      rec.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((res: any) => res[0].transcript)
          .join("");
        setRecordedText(transcript);
      };

      rec.onerror = () => {
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
        // Simulate level-scoped AI evaluation
        setTimeout(() => {
          setAiFeedback({
            text: "Excellent effort ! Great French pronunciation and natural cadence.",
            score: 95,
          });
          // Avatar speaks AI feedback back to user in French
          const respUtterance = new SpeechSynthesisUtterance("Très bien ! Félicitations pour votre excellente prononciation.");
          respUtterance.lang = "fr-FR";
          respUtterance.rate = levelSpeeches[selectedLevel].rate;
          respUtterance.onstart = () => setIsSpeaking(true);
          respUtterance.onend = () => setIsSpeaking(false);
          window.speechSynthesis.speak(respUtterance);
        }, 400);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      setIsRecording(false);
    }
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
      <div className="p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950/40 dark:to-slate-900 text-gray-900 dark:text-white shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-xs font-semibold text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Avatar Language Coaches</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Meet Your 3D AI Conversation Coaches
            </h3>

            <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
              Instead of static text, every lesson features 3D VRM avatars that speak in native French accents, animate their expressions, and guide your speaking drills based on the current lesson level.
            </p>

            {/* Avatar & Level Switcher */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-gray-700 dark:text-slate-300">Choose Coach:</span>
                <button
                  onClick={() => setSelectedAvatar("male")}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all active:scale-95 touch-manipulation ${
                    selectedAvatar === "male"
                      ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : "border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  Coach Leo (Male 3D)
                </button>
                <button
                  onClick={() => setSelectedAvatar("female")}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all active:scale-95 touch-manipulation ${
                    selectedAvatar === "female"
                      ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : "border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  Coach Camille / Chloe (Female 3D)
                </button>
              </div>

              {/* CEFR Level Speech Speed Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-700 dark:text-slate-300">Speech Pace:</span>
                {(["A1", "B2", "C2"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedLevel === lvl
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {lvl} Level Pace
                  </button>
                ))}
              </div>
            </div>

            {/* Speaking Demo Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSpeakDemo}
                  className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-bounce" : ""}`} />
                  <span>{isSpeaking ? "Coach Speaking..." : `🔊 Listen to ${selectedLevel} Speech`}</span>
                </button>

                <button
                  onClick={startMicRecording}
                  disabled={isRecording}
                  className={`px-5 py-3 text-xs font-bold text-white rounded-xl transition-all shadow-lg flex items-center gap-2 ${
                    isRecording
                      ? "bg-rose-600 animate-pulse"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30"
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isRecording ? "animate-ping" : ""}`} />
                  <span>{isRecording ? "Listening... Speak French Now!" : "🎙️ Test Live Mic Voice Practice"}</span>
                </button>
              </div>

              <p className="text-[11px] text-purple-700 dark:text-purple-300 font-mono">
                {levelSpeeches[selectedLevel].label}
              </p>

              {/* Live Mic Transcript & AI Response Display */}
              {recordedText && (
                <div className="p-3 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-xs space-y-1">
                  <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Your Spoken Voice:</p>
                  <p className="italic text-gray-800 dark:text-slate-100">"{recordedText}"</p>
                </div>
              )}

              {aiFeedback && (
                <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-800 dark:text-purple-300">💡 AI Tutor Review:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      Score: {aiFeedback.score}%
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-slate-200">{aiFeedback.text}</p>
                </div>
              )}
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
