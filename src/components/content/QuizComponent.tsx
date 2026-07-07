import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

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
}

export function QuizComponent({ questions, type: _type, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const q = questions[current];
  if (!q) return <div className="text-gray-400 text-sm p-4">No questions</div>;

  const correct = answers[q.id]?.toString().toLowerCase() === q.correctAnswer.toString().toLowerCase();
  const isCorrect = submitted[q.id] ? correct : undefined;

  const handleSubmit = () => {
    setSubmitted({ ...submitted, [q.id]: true });
    if (current === questions.length - 1) {
      const score = questions.filter(qq => answers[qq.id]?.toString().toLowerCase() === qq.correctAnswer.toString().toLowerCase()).length;
      onComplete?.(score, questions.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>Question {current + 1} of {questions.length}</span>
        <span>{q.points || 1} point{q.points !== 1 ? "s" : ""}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
          <p className="text-sm font-semibold leading-relaxed">{q.text}</p>

          {q.options && (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${answers[q.id] === opt ? "border-purple-400 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {isCorrect !== undefined && (
            <div className={`p-4 rounded-xl ${isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <span className={`text-sm font-semibold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </span>
              </div>
              <p className={`text-xs ${isCorrect ? "text-emerald-600" : "text-red-600"}`}>{q.explanation}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className="px-4 py-2 text-sm border rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all">Previous</button>
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