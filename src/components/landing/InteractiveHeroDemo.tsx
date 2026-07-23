import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2 } from "lucide-react";

export function InteractiveHeroDemo() {
  const [activeTab, setActiveTab] = useState<"matching" | "ai">("matching");
  
  // Matching state
  const [pairs, setPairs] = useState<{ [key: string]: string }>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchingSuccess, setMatchingSuccess] = useState(false);

  const questions = [
    { id: "q1", prompt: "Un appartement", correct: "An apartment" },
    { id: "q2", prompt: "Une cuisine", correct: "A kitchen" },
    { id: "q3", prompt: "Est-ce qu'il y a... ?", correct: "Is there... ?" },
  ];

  const targetOptions = ["Is there... ?", "An apartment", "A kitchen"];

  const handleSelectLeft = (id: string) => {
    setSelectedLeft(id);
  };

  const handleSelectRight = (option: string) => {
    if (!selectedLeft) return;
    const newPairs = { ...pairs, [selectedLeft]: option };
    setPairs(newPairs);
    setSelectedLeft(null);

    // Check if all correct
    if (
      newPairs["q1"] === "An apartment" &&
      newPairs["q2"] === "A kitchen" &&
      newPairs["q3"] === "Is there... ?"
    ) {
      setMatchingSuccess(true);
    }
  };

  const resetMatching = () => {
    setPairs({});
    setSelectedLeft(null);
    setMatchingSuccess(false);
  };

  // AI Typed demo state
  const [typedAnswer, setTypedAnswer] = useState("");
  const [aiState, setAiState] = useState<"idle" | "evaluating" | "result">("idle");

  const handleCheckAi = () => {
    if (!typedAnswer.trim()) return;
    setAiState("evaluating");
    setTimeout(() => {
      setAiState("result");
    }, 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-white/15 dark:border-white/10 bg-white/70 dark:bg-[#0c1329]/80 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Demo Header Tabs */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200/60 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Interactive Experience
          </span>
        </div>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200/50 dark:border-white/10">
          <button
            onClick={() => setActiveTab("matching")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              activeTab === "matching"
                ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Drag & Pair
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              activeTab === "ai"
                ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            AI Tutor Review
          </button>
        </div>
      </div>

      {/* Tab 1: Drag & Pair Demo */}
      {activeTab === "matching" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Tap a French term, then tap its English match:
            </p>
            {Object.keys(pairs).length > 0 && (
              <button
                onClick={resetMatching}
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* French Left Items */}
            <div className="space-y-2">
              {questions.map((q) => {
                const isSelected = selectedLeft === q.id;
                const isMatched = Boolean(pairs[q.id]);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectLeft(q.id)}
                    className={`w-full p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-2 ring-purple-500/30"
                        : isMatched
                        ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300"
                        : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:border-purple-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{q.prompt}</span>
                      {isMatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* English Right Items */}
            <div className="space-y-2">
              {targetOptions.map((option, idx) => {
                const isPaired = Object.values(pairs).includes(option);
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectRight(option)}
                    className={`w-full p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                      isPaired
                        ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 opacity-60"
                        : selectedLeft
                        ? "border-purple-400/60 bg-purple-500/5 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 cursor-pointer animate-pulse"
                        : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {matchingSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between"
            >
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Parfait! All 3 pairs matched accurately!
              </span>
              <button
                onClick={resetMatching}
                className="text-[11px] underline font-medium hover:text-emerald-900 dark:hover:text-emerald-100"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Tab 2: AI Tutor Review Demo */}
      {activeTab === "ai" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs">
            <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
              Lesson Drill (A1 Level):
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Ask if there is a balcony in the apartment."
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Type your answer in French (or English):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="e.g. Est-ce qu'il y a un balcon ?"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleCheckAi}
                disabled={!typedAnswer.trim() || aiState === "evaluating"}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md shadow-purple-500/20"
              >
                {aiState === "evaluating" ? (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI Reviewing...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Check
                  </>
                )}
              </button>
            </div>
            <div className="flex gap-1.5 pt-1">
              <button
                onClick={() => setTypedAnswer("Est-ce qu'il y a un balcon ?")}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-purple-500/10 hover:text-purple-600"
              >
                Sample French
              </button>
              <button
                onClick={() => setTypedAnswer("Is there a balcony?")}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-purple-500/10 hover:text-purple-600"
              >
                Sample English
              </button>
            </div>
          </div>

          <AnimatePresence>
            {aiState === "result" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-xs space-y-1.5"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>AI Tutor Review: Correct!</span>
                </div>
                <p className="text-gray-700 dark:text-purple-200 leading-relaxed">
                  Excellent! You correctly used the full <strong>"Est-ce qu'il y a... ?"</strong> pattern taught in this lesson for asking questions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
