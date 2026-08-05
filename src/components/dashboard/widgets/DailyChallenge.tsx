import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronRight, Clock, Check, RotateCcw } from "lucide-react";
import { getActiveLanguageCode } from "~/lib/trackBranding";
import { useWidgets } from "~/lib/WidgetsContext";

const TIMER_SECONDS = 60;

const MULTI_LANG_CHALLENGES: Record<string, { q: string; a: string; hint: string }[]> = {
  fr: [
    { q: "Translate: 'I would like a coffee'", a: "Je voudrais un café", hint: "Use 'voudrais' (conditional of vouloir)" },
    { q: "What's the French word for 'library'?", a: "La bibliothèque", hint: "Think of 'biblio' for books" },
    { q: "Conjugate 'aller' in present tense: je ___", a: "Je vais", hint: "Irregular! vais, vas, va, allons, allez, vont" },
    { q: "What's 'goodbye' in French?", a: "Au revoir", hint: "Literally 'until seeing again'" },
    { q: "Fill in: Je ___ (to be) étudiant", a: "Je suis", hint: "Être conjugation: suis, es, est, sommes, êtes, sont" },
    { q: "Translate: 'Thank you very much'", a: "Merci beaucoup", hint: "'Merci' + 'beaucoup' = a lot of thanks" },
    { q: "What's the feminine form of 'content' (happy)?", a: "Contente", hint: "Add -e for feminine" },
    { q: "How do you say 'excuse me' in French?", a: "Excusez-moi", hint: "Formal way, using 'vous'" },
  ],
  de: [
    { q: "Translate: 'Hello, how are you?'", a: "Guten Tag, wie geht es Ihnen", hint: "Polite formal German greeting" },
    { q: "What's the German word for 'library'?", a: "Die Bibliothek", hint: "Feminine noun with 'Die'" },
    { q: "Conjugate 'sein' for 'Ich': Ich ___", a: "Ich bin", hint: "Present tense of sein for Ich" },
    { q: "What's 'goodbye' in German?", a: "Auf Wiedersehen", hint: "Literally 'until seeing again'" },
    { q: "Complete with dative preposition: mit ___ Bus", a: "mit dem Bus", hint: "Dative masculine article" },
    { q: "Translate: 'Thank you very much'", a: "Vielen Dank", hint: "Literal: many thanks" },
    { q: "How do you say 'excuse me' in German?", a: "Entschuldigung", hint: "Standard polite apology" },
  ],
  es: [
    { q: "Translate: 'I would like a coffee'", a: "Me gustaría un café", hint: "Conditional of gustar" },
    { q: "What's the Spanish word for 'library'?", a: "La biblioteca", hint: "Feminine noun with 'La'" },
    { q: "Conjugate 'tener' for 'Yo': Yo ___", a: "Yo tengo", hint: "First-person present of tener" },
    { q: "What's 'goodbye' in Spanish?", a: "Hasta luego", hint: "Literally 'until later'" },
    { q: "Choose Ser vs Estar: Juan ___ cansado", a: "está", hint: "Temporary state uses Estar" },
    { q: "Translate: 'Thank you very much'", a: "Muchas gracias", hint: "'Muchas' + 'gracias'" },
    { q: "How do you say 'excuse me' in Spanish?", a: "Perdón", hint: "Standard polite excuse" },
  ],
  it: [
    { q: "Translate: 'Hello, how are you?'", a: "Buongiorno, come sta", hint: "Formal polite Italian greeting" },
    { q: "What's the Italian word for 'library'?", a: "La biblioteca", hint: "Feminine noun with 'La'" },
    { q: "Conjugate 'avere' for 'Io': Io ___", a: "Io ho", hint: "First-person present of avere" },
    { q: "What's 'goodbye' in Italian?", a: "Arrivederci", hint: "Standard formal farewell" },
    { q: "Complete with article: ___ studente", a: "Lo studente", hint: "Nouns starting with st take 'Lo'" },
    { q: "Translate: 'Thank you very much'", a: "Grazie mille", hint: "Literal: a thousand thanks" },
    { q: "How do you say 'excuse me' in Italian?", a: "Scusi", hint: "Formal polite request" },
  ],
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

export function DailyChallenge({ dark }: { dark: boolean }) {
  const { widgets, updateDailyChallenge } = useWidgets();
  const challengeDate = widgets?.dailyChallengeDate || "";
  const challengeIndex = widgets?.dailyChallengeIndex || 0;

  const activeLang = getActiveLanguageCode();
  const challenges = MULTI_LANG_CHALLENGES[activeLang] || MULTI_LANG_CHALLENGES.fr;

  const today = new Date().toDateString();
  const challenge = challengeDate === today
    ? (challenges[challengeIndex] || challenges[0])
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
    <div className={`${
      dark
        ? "bg-[#101828]/90 border-[#1e2a4a] shadow-xl shadow-black/10 text-white"
        : "bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 text-slate-900"
    } backdrop-blur-xl rounded-3xl p-6 transition-all duration-300 overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className={`text-base font-extrabold ${dark ? "text-gray-200" : "text-slate-900"}`}>Daily Challenge</h3>
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
                className={`mt-2 text-xs font-semibold transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                Need a hint?
              </button>
            ) : (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                className={`text-xs mt-2 ${dark ? "text-gray-400" : "text-gray-600"} italic`}>
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
                {isCorrect ? <Check className={`w-4 h-4 ${dark ? "text-emerald-400" : "text-emerald-600"}`} /> : <RotateCcw className={`w-4 h-4 ${dark ? "text-red-400" : "text-red-600"}`} />}
                <p className={`text-sm font-semibold ${isCorrect ? (dark ? "text-emerald-400" : "text-emerald-800") : (dark ? "text-red-400" : "text-red-800")}`}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </p>
              </div>
              {!isCorrect && (
                <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                  Answer: <span className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{challenge.a}</span>
                </p>
              )}
            </div>
            <button onClick={reset}
              className={`mt-2 text-xs font-semibold transition-colors flex items-center gap-1 ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
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
