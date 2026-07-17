import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronRight, Clock, Check, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useWidgets } from "~/lib/WidgetsContext";

const TIMER_SECONDS = 60;

const challenges = [
  { q: "Translate: 'I would like a coffee'", a: "Je voudrais un café", hint: "Use 'voudrais' (conditional of vouloir)" },
  { q: "What's the French word for 'library'?", a: "La bibliothèque", hint: "Think of 'biblio' for books" },
  { q: "Conjugate 'aller' in present tense: je ___", a: "Je vais", hint: "Irregular! vais, vas, va, allons, allez, vont" },
  { q: "What's 'goodbye' in French?", a: "Au revoir", hint: "Literally 'until seeing again'" },
  { q: "Fill in: Je ___ (to be) étudiant", a: "Je suis", hint: "Être conjugation: suis, es, est, sommes, êtes, sont" },
  { q: "Translate: 'Thank you very much'", a: "Merci beaucoup", hint: "'Merci' + 'beaucoup' = a lot of thanks" },
  { q: "What's the feminine form of 'content' (happy)?", a: "Contente", hint: "Add -e for feminine" },
  { q: "How do you say 'excuse me' in French?", a: "Excusez-moi", hint: "Formal way, using 'vous'" },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

export function DailyChallenge({ dark }: { dark: boolean }) {
  const { widgets, updateDailyChallenge } = useWidgets();
  const challengeDate = widgets?.dailyChallengeDate || "";
  const challengeIndex = widgets?.dailyChallengeIndex || 0;

  const today = new Date().toDateString();
  const challenge = challengeDate === today
    ? challenges[challengeIndex]
    : challenges[Math.floor(Math.random() * challenges.length)];

  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [timerRunning, setTimerRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (challengeDate !== today) {
      const idx = challenges.indexOf(challenge);
      updateDailyChallenge(today, idx);
    }
  }, []);

  const startTimer = useCallback(() => {
    setTimerRunning(true);
    setTimer(TIMER_SECONDS);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timerRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCorrect(normalize(userAnswer) === normalize(challenge.a));
    setSubmitted(true);
  };

  const reset = () => {
    setUserAnswer("");
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setTimer(TIMER_SECONDS);
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const timerPct = (timer / TIMER_SECONDS) * 100;
  const timerColor = timer > 30 ? "from-emerald-500 to-teal-500" : timer > 10 ? "from-amber-500 to-orange-500" : "from-red-500 to-rose-500";

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-4 sm:p-5 transition-colors overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>Daily Challenge</h3>
        </div>
        {timerRunning && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className={`text-sm font-bold tabular-nums ${timer <= 10 ? "text-red-400" : "text-purple-400"}`}>{timer}s</span>
          </div>
        )}
      </div>

      {timerRunning && (
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-3">
          <motion.div className={`h-full bg-gradient-to-r ${timerColor} rounded-full`}
            initial={{ width: "100%" }}
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 1, ease: "linear" }} />
        </div>
      )}

      <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border`}>
        <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>{challenge.q}</p>

        {!submitted ? (
          <>
            <div className="flex flex-wrap gap-2 mt-3">
              <input ref={inputRef} type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitAnswer(); }}
                placeholder="Type your answer..."
                disabled={submitted}
                className={`flex-1 min-w-0 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border disabled:opacity-50`} />
              {!timerRunning && !submitted && (
                <button onClick={startTimer}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-2.5 rounded-xl hover:opacity-90 transition-all whitespace-nowrap">
                  ⏱ 60s
                </button>
              )}
              <button onClick={submitAnswer} disabled={!userAnswer.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-40">
                Check
              </button>
            </div>
            {!showHint ? (
              <button onClick={() => setShowHint(true)}
                className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Need a hint?
              </button>
            ) : (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                className={`text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-400"} italic`}>
                💡 {challenge.hint}
              </motion.p>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
            <div className={`${isCorrect
              ? dark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"
              : dark ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-200"
            } rounded-xl p-3 border`}>
              <div className="flex items-center gap-2">
                {isCorrect ? <Check className="w-4 h-4 text-emerald-400" /> : <RotateCcw className="w-4 h-4 text-red-400" />}
                <p className={`text-sm font-semibold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </p>
              </div>
              {!isCorrect && (
                <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  Answer: <span className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{challenge.a}</span>
                </p>
              )}
            </div>
            <button onClick={reset}
              className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Try another
            </button>
          </motion.div>
        )}
      </div>

      <Link to="/learn" className={`mt-3 text-xs font-semibold flex items-center gap-1 transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
        More practice <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
