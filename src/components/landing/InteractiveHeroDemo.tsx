import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Volume2, Play } from "lucide-react";

export function InteractiveHeroDemo() {
  const [activeTab, setActiveTab] = useState<"matching" | "ai">("matching");

  // Exact platform matching state (QuizComponent replica)
  const questions = [
    { id: "q1", text: "Un appartement", answer: "An apartment" },
    { id: "q2", text: "Une cuisine", answer: "A kitchen" },
    { id: "q3", text: "Est-ce qu'il y a... ?", answer: "Is there... ?" },
  ];

  // Shuffled right options
  const initialTargets = ["Is there... ?", "An apartment", "A kitchen"];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [userMatches, setUserMatches] = useState<{ [qId: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLeftClick = (qId: string) => {
    setSelectedLeft(qId);
  };

  const handleRightClick = (targetText: string) => {
    if (!selectedLeft) return;
    const newMatches = { ...userMatches, [selectedLeft]: targetText };
    setUserMatches(newMatches);
    setSelectedLeft(null);

    // Verify all 3
    if (
      newMatches["q1"] === "An apartment" &&
      newMatches["q2"] === "A kitchen" &&
      newMatches["q3"] === "Is there... ?"
    ) {
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setUserMatches({});
    setSelectedLeft(null);
    setIsSuccess(false);
  };

  // Audio playing simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  // AI Typed demo state
  const [typedAnswer, setTypedAnswer] = useState("");
  const [aiStatus, setAiStatus] = useState<"idle" | "evaluating" | "done">("idle");

  const handleCheckAi = () => {
    if (!typedAnswer.trim()) return;
    setAiStatus("evaluating");
    setTimeout(() => setAiStatus("done"), 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#0c1329]/90 backdrop-blur-2xl p-6 md:p-7 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200/80 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Live Platform Engine
          </span>
        </div>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200/50 dark:border-white/10">
          <button
            onClick={() => setActiveTab("matching")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "matching"
                ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Matching Drill
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "ai"
                ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            AI Tutor Review
          </button>
        </div>
      </div>

      {/* Tab 1: Exact Matching UI */}
      {activeTab === "matching" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Match French prompts to English answers:
            </span>
            {Object.keys(userMatches).length > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-gray-400 hover:text-purple-500 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Grid matching matching platform QuizComponent */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left Prompts */}
            <div className="space-y-2.5">
              {questions.map((q) => {
                const isSelected = selectedLeft === q.id;
                const matchVal = userMatches[q.id];
                return (
                  <div
                    key={q.id}
                    onClick={() => handleLeftClick(q.id)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-2 ring-purple-500/30"
                        : matchVal
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 text-gray-900 dark:text-white hover:border-purple-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{q.text}</span>
                      {matchVal && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    {matchVal && (
                      <div className="mt-1 text-[11px] font-normal text-emerald-600 dark:text-emerald-400 italic">
                        ➔ {matchVal}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Options */}
            <div className="space-y-2.5">
              {initialTargets.map((target, idx) => {
                const isUsed = Object.values(userMatches).includes(target);
                return (
                  <div
                    key={idx}
                    onClick={() => handleRightClick(target)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                      isUsed
                        ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 opacity-50 cursor-not-allowed"
                        : selectedLeft
                        ? "border-purple-400 bg-purple-500/10 text-purple-700 dark:text-purple-300 cursor-pointer animate-pulse"
                        : "border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {target}
                  </div>
                );
              })}
            </div>
          </div>

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Parfait! All 3 pairs matched accurately!
              </span>
              <button onClick={handleReset} className="underline text-[11px]">
                Retry
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Tab 2: Native Listening & AI Tutor Demo */}
      {activeTab === "ai" && (
        <div className="space-y-3.5">
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Awa & Camille Dialogue (A1):</p>
              <p className="text-gray-500 dark:text-gray-400 italic">"J'ai trouvé un appartement ! Il y a deux chambres..."</p>
            </div>
            <button
              onClick={handlePlayAudio}
              className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-semibold flex items-center gap-1.5 hover:bg-purple-500 transition-all text-[11px]"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? "animate-bounce" : ""}`} />
              <span>{isPlayingAudio ? "Playing..." : "Play Audio"}</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Drill Prompt: Ask if there is an elevator in French (or English)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="e.g. Est-ce qu'il y a un ascenseur ?"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleCheckAi}
                disabled={!typedAnswer.trim() || aiStatus === "evaluating"}
                className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                {aiStatus === "evaluating" ? "Reviewing..." : "Check"}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTypedAnswer("Est-ce qu'il y a un ascenseur ?")}
                className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-purple-500"
              >
                Try French
              </button>
              <button
                onClick={() => setTypedAnswer("Is there an elevator?")}
                className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-purple-500"
              >
                Try English
              </button>
            </div>
          </div>

          <AnimatePresence>
            {aiStatus === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-xs space-y-1"
              >
                <p className="font-bold text-purple-700 dark:text-purple-300">
                  💡 AI Tutor Review: Correct!
                </p>
                <p className="text-gray-700 dark:text-purple-200 leading-relaxed">
                  Great job! You used the full <strong>"Est-ce qu'il y a... ?"</strong> pattern correctly. You can also say <strong>"Y a-t-il un ascenseur ?"</strong>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
