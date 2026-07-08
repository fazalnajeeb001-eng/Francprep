import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, ArrowUp, ArrowDown, Volume2 } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  items?: string[];
  correctOrder?: string[];
  pairs?: Record<string, string>;
}

interface QuizProps {
  questions: Question[];
  type: "multiple_choice" | "fill_blank" | "matching" | "ordering" | "translation" | "short_answer";
  onComplete?: (score: number, total: number) => void;
  onAnswer?: (questionId: string, correct: boolean) => void;
}

function speak(text: string, lang = "fr-FR") {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      v => v.lang.startsWith("fr") && (v.name.toLowerCase().includes("female") || v.name.includes("Samantha") || v.name.includes("Audrey") || v.name.includes("Amélie") || v.name.includes("Julie") || v.name.includes("Marie"))
    );
    if (femaleVoice) u.voice = femaleVoice;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function QuizComponent({ questions, type: _type, onComplete, onAnswer }: QuizProps) {
  const { dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [matchLeft, setMatchLeft] = useState<number | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<number, number>>({});

  const q = questions[current];

  // Initialize ordering order per question — resets when question changes
  const [orderingState, setOrderingState] = useState<Record<string, number[]>>({});
  const orderingOrder = orderingState[q?.id] || [];
  const setOrderingOrder = (order: number[]) => {
    if (!q) return;
    setOrderingState(prev => ({ ...prev, [q.id]: order }));
  };

  if (!q) return <div className={`text-sm p-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>No questions</div>;

  // Init ordering order on first render per question
  if (_type === "ordering" && q.items && orderingOrder.length === 0) {
    const init = [...Array(q.items.length).keys()].sort(() => Math.random() - 0.5);
    // Use a state setter to avoid setting state during render
    queueMicrotask(() => setOrderingOrder(init));
  }

  const normalize = (s: string) => s.replace(/\s+([?.!,])/g, "$1").toLowerCase().trim();

  const checkAnswer = (qId: string, answer: string | string[]): boolean => {
    const qq = questions.find(qq => qq.id === qId);
    if (!qq) return false;
    const ans = Array.isArray(answer) ? answer.join(",") : answer;
    return normalize(ans) === normalize(qq.correctAnswer.toString());
  };

  // Initialize ordering order on question change
  if (q.id && _type === "ordering" && orderingOrder.length === 0 && q.items) {
    const init = [...Array(q.items.length).keys()].sort(() => Math.random() - 0.5);
    if (orderingOrder.length === 0) {
      // Will be set via useState below
    }
  }

  const isCorrect = submitted[q.id] ? checkAnswer(q.id, answers[q.id] ?? "") : undefined;

  const handleSubmit = () => {
    // For matching/ordering, encode the state into answers
    if (_type === "matching" && q.pairs) {
      const keys = Object.keys(q.pairs);
      const encoded = keys.map((k, i) => `${k}→${matchPairs[i] ?? ""}`).join(",");
      setAnswers(prev => ({ ...prev, [q.id]: encoded }));
    } else if (_type === "ordering" && q.items) {
      const encoded = orderingOrder.join(",");
      setAnswers(prev => ({ ...prev, [q.id]: encoded }));
    }

    const correct = _type === "matching"
      ? (() => {
          if (!q.pairs) return false;
          const keys = Object.keys(q.pairs);
          return keys.every((_, i) => matchPairs[i] !== undefined && matchPairs[i] === i);
        })()
      : _type === "ordering"
      ? (() => {
          if (!q.items) return false;
          return orderingOrder.join(",") === [...Array(q.items.length).keys()].join(",");
        })()
      : checkAnswer(q.id, answers[q.id] ?? "");

    setSubmitted({ ...submitted, [q.id]: true });
    onAnswer?.(q.id, correct);
    if (current === questions.length - 1) {
      const score = questions.filter(qq => checkAnswer(qq.id, answers[qq.id] ?? "")).length;
      onComplete?.(score, questions.length);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setMatchLeft(null);
      setMatchPairs({});
      setOrderingOrder([]);
    }
  };

  const items = q.items || [];
  const pairs = q.pairs ? Object.entries(q.pairs) : [];

  // Initialize ordering
  if (_type === "ordering" && orderingOrder.length === 0 && items.length > 0) {
    const init = [...Array(items.length).keys()].sort(() => Math.random() - 0.5);
    // Use setTimeout to set after render - but actually we can use the pattern below
    // We need to do this differently - store initial shuffle in a ref or lazy state
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`flex items-center justify-between mb-4 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
        <span>Question {current + 1} of {questions.length}</span>
        <span>{q.points || 1} point{q.points !== 1 ? "s" : ""}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
          <p className={`text-sm font-semibold leading-relaxed ${dark ? "text-gray-200" : "text-gray-800"}`}>{q.text}</p>

          {/* MULTIPLE CHOICE */}
          {q.options && _type === "multiple_choice" && (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                    answers[q.id] === opt
                      ? dark ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-purple-400 bg-purple-50 text-purple-700"
                      : dark ? "border-[#1e2a4a] text-gray-300 hover:border-purple-500/50" : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* FILL BLANK / TRANSLATION */}
          {(_type === "fill_blank" || _type === "translation") && (
            <div className="space-y-2">
              <input
                type="text"
                value={(answers[q.id] as string) || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder={_type === "fill_blank" ? "Type the missing word..." : "Type the translation..."}
                className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${
                  dark
                    ? "bg-[#0a0e1a] border-[#1e2a4a] text-gray-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-500"
                    : "border-gray-200 text-gray-800 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 placeholder-gray-400"
                }`}
              />
            </div>
          )}

          {/* SHORT ANSWER */}
          {_type === "short_answer" && (
            <div className="space-y-2">
              <textarea
                value={(answers[q.id] as string) || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                rows={3}
                placeholder="Write your answer in French..."
                className={`w-full p-3 rounded-xl border text-sm outline-none transition-all resize-none ${
                  dark
                    ? "bg-[#0a0e1a] border-[#1e2a4a] text-gray-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-500"
                    : "border-gray-200 text-gray-800 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 placeholder-gray-400"
                }`}
              />
            </div>
          )}

          {/* MATCHING — click-to-match interaction */}
          {_type === "matching" && pairs.length > 0 && (
            <div className="space-y-3">
              <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>
                Click a left item, then click its match on the right.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Left column: the keys */}
                <div className="space-y-1.5">
                  {pairs.map(([key], i) => {
                    const isMatched = matchPairs[i] !== undefined;
                    return (
                      <button key={`l-${i}`}
                        onClick={() => {
                          if (isMatched) {
                            setMatchPairs(prev => { const n = { ...prev }; delete n[i]; return n; });
                          } else {
                            setMatchLeft(matchLeft === i ? null : i);
                          }
                        }}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                          isMatched
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                            : matchLeft === i
                            ? "bg-purple-500/20 text-purple-400 border-purple-500 ring-1 ring-purple-500"
                            : dark
                            ? "bg-[#0a0e1a] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400"
                        }`}>
                        {key}
                      </button>
                    );
                  })}
                </div>
                {/* Right column: the values */}
                <div className="space-y-1.5">
                  {pairs.map(([, value], i) => {
                    const isMatched = Object.values(matchPairs).includes(i);
                    const matchedLeftIdx = Object.entries(matchPairs).find(([_, v]) => v === i)?.[0];
                    return (
                      <button key={`r-${i}`}
                        onClick={() => {
                          if (isMatched) return;
                          if (matchLeft === null) return;
                          setMatchPairs(prev => ({ ...prev, [matchLeft]: i }));
                          setMatchLeft(null);
                        }}
                        disabled={isMatched}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                          isMatched
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                            : dark
                            ? "bg-[#0a0e1a] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40 disabled:opacity-50"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400 disabled:opacity-50"
                        }`}>
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
              {Object.keys(matchPairs).length > 0 && (
                <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                  {Object.keys(matchPairs).length}/{pairs.length} paired
                  {Object.keys(matchPairs).length === pairs.length && " — ready to submit!"}
                </p>
              )}
            </div>
          )}

          {/* ORDERING — up/down reorder */}
          {_type === "ordering" && items.length > 0 && orderingOrder.length > 0 && (
            <div className="space-y-2">
              <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>
                Arrange the items in the correct order:
              </p>
              {orderingOrder.map((idx, pos) => (
                <div key={pos} className={`flex items-center gap-2 p-3 rounded-xl border ${
                  dark ? "bg-[#0a0e1a] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"
                }`}>
                  <span className={`text-xs font-bold w-5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{pos + 1}.</span>
                  <span className={`text-sm flex-1 ${dark ? "text-gray-200" : "text-gray-800"}`}>{items[idx]}</span>
                  <div className="flex gap-1">
                    <button onClick={() => {
                      if (pos > 0) {
                        const n = [...orderingOrder];
                        [n[pos], n[pos-1]] = [n[pos-1], n[pos]];
                        setOrderingOrder(n);
                      }
                    }}
                      className={`p-1 rounded ${dark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}>
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => {
                      if (pos < orderingOrder.length - 1) {
                        const n = [...orderingOrder];
                        [n[pos], n[pos+1]] = [n[pos+1], n[pos]];
                        setOrderingOrder(n);
                      }
                    }}
                      className={`p-1 rounded ${dark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {_type === "ordering" && items.length > 0 && orderingOrder.length === 0 && (
            <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Preparing ordering exercise...</p>
          )}

          {/* FEEDBACK */}
          {isCorrect !== undefined && (
            <div className={`p-4 rounded-xl border ${
              isCorrect
                ? dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                : dark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <span className={`text-sm font-semibold ${isCorrect ? (dark ? "text-emerald-300" : "text-emerald-700") : (dark ? "text-red-300" : "text-red-700")}`}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </span>
              </div>
              <p className={`text-xs ${isCorrect ? (dark ? "text-emerald-400" : "text-emerald-600") : (dark ? "text-red-400" : "text-red-600")}`}>{q.explanation}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION */}
      <div className="flex justify-between mt-6">
        <button onClick={() => {
          setCurrent(Math.max(0, current - 1));
          setMatchLeft(null);
          setMatchPairs({});
          setOrderingOrder([]);
        }} disabled={current === 0}
          className={`px-4 py-2 text-sm border rounded-lg disabled:opacity-30 transition-all ${
            dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}>Previous</button>
        {!submitted[q.id] ? (
          <button onClick={handleSubmit}
            disabled={
              _type === "matching" ? Object.keys(matchPairs).length === 0 :
              _type === "ordering" ? orderingOrder.length === 0 :
              !answers[q.id]
            }
            className="px-6 py-2 bg-purple-500 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-purple-600 transition-all">
            Submit
          </button>
        ) : (
          <button onClick={handleNext}
            disabled={current >= questions.length - 1}
            className="px-6 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition-all flex items-center gap-1 disabled:opacity-30">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}