import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "fp_challenge_date";

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

function getTodayChallenge() {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.startsWith(today)) {
    const idx = parseInt(stored.split("|")[1] || "0", 10);
    return { index: idx, challenge: challenges[idx] };
  }
  const idx = Math.floor(Math.random() * challenges.length);
  localStorage.setItem(STORAGE_KEY, `${today}|${idx}`);
  return { index: idx, challenge: challenges[idx] };
}

export function DailyChallenge({ dark }: { dark: boolean }) {
  const [challenge, setChallenge] = useState(challenges[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const { challenge: c } = getTodayChallenge();
    setChallenge(c);
  }, []);

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>Daily Challenge 🎯</h3>
      </div>

      <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border`}>
        <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>{challenge.q}</p>
        {revealed ? (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
            <div className={`${dark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border`}>
              <p className="text-sm text-emerald-400 font-semibold">✅ {challenge.a}</p>
            </div>
          </motion.div>
        ) : (
          <button onClick={() => { setShowAnswer(!showAnswer); setRevealed(true); }}
            className="mt-3 text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            {showAnswer ? "Hide Answer" : "Reveal Answer →"}
          </button>
        )}
        {!revealed && showAnswer && (
          <p className={`text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-400"} italic`}>💡 {challenge.hint}</p>
        )}
      </div>

      <Link to="/learn" className={`mt-3 text-xs font-semibold flex items-center gap-1 transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
        More practice <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
