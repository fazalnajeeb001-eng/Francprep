import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

interface QuizProps {
  questions: Question[];
  type: "multiple_choice" | "fill_blank" | "matching" | "ordering" | "translation" | "short_answer";
  onComplete?: (score: number, total: number) => void;
  onAnswer?: (questionId: string, correct: boolean) => void;
}

export function QuizComponent({ questions, type: _type, onComplete, onAnswer }: QuizProps) {
  const { dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const q = questions[current];
  if (!q) return <div className={`text-sm p-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>No questions</div>;

  const normalize = (s: string) => s.replace(/\s+([?.!,])/g, "$1").toLowerCase().trim();

  const checkAnswer = (qId: string, answer: string | string[]): boolean => {
    const qq = questions.find(qq => qq.id === qId);
    if (!qq) return false;
    const ans = Array.isArray(answer) ? answer.join(",") : answer;
    return normalize(ans) === normalize(qq.correctAnswer.toString());
  };

  const isCorrect = submitted[q.id] ? checkAnswer(q.id, answers[q.id] ?? "") : undefined;

  const handleSubmit = () => {
    const correct = checkAnswer(q.id, answers[q.id] ?? "");
    setSubmitted({ ...submitted, [q.id]: true });
    onAnswer?.(q.id, correct);
    if (current === questions.length - 1) {
      const score = questions.filter(qq => checkAnswer(qq.id, answers[qq.id] ?? "")).length;
      onComplete?.(score, questions.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`flex items-center justify-between mb-4 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
        <span>Question {current + 1} of {questions.length}</span>
        <span>{q.points || 1} point{q.points !== 1 ? "s" : ""}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
          <p className={`text-sm font-semibold leading-relaxed ${dark ? "text-gray-200" : "text-gray-800"}`}>{q.text}</p>

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

          {(_type === "matching" || _type === "ordering") && (
            <div className="space-y-2">
              <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
                {_type === "matching" ? "Match the items by entering your answer below:" : "Enter the correct order below:"}
              </p>
              <input
                type="text"
                value={(answers[q.id] as string) || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder={_type === "matching" ? "e.g. A→1, B→2, C→3" : "e.g. 3, 1, 2"}
                className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${
                  dark
                    ? "bg-[#0a0e1a] border-[#1e2a4a] text-gray-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-500"
                    : "border-gray-200 text-gray-800 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 placeholder-gray-400"
                }`}
              />
            </div>
          )}

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

      <div className="flex justify-between mt-6">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className={`px-4 py-2 text-sm border rounded-lg disabled:opacity-30 transition-all ${
            dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}>Previous</button>
        {!submitted[q.id] ? (
          <button onClick={handleSubmit} disabled={!answers[q.id]}
            className="px-6 py-2 bg-purple-500 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-purple-600 transition-all">
            Submit
          </button>
        ) : (
          <button onClick={() => current < questions.length - 1 && setCurrent(current + 1)}
            className="px-6 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition-all flex items-center gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}