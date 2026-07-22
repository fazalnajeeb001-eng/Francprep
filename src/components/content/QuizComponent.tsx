import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, GripVertical } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

interface Question {
  id?: string;
  _id?: string;
  text?: string;
  question?: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  points?: number;
  type?: string;
  pairs?: Record<string, string>;
  items?: string[];
  correctOrder?: string[];
  blankAnswer?: string;
  sampleAnswer?: string;
  evaluationCriteria?: string[];
  prompt?: string;
  pronunciationTip?: string;
}

interface ResultItem {
  questionId: string;
  correct: boolean;
  points: number;
  maxPoints: number;
  explanation: string;
  text?: string;
}

interface QuizProps {
  questions: Question[];
  type: string;
  onComplete?: (score: number, total: number) => void;
  onAnswer?: (questionId: string, isCorrect: boolean) => void;
  onSubmit?: (answers: Record<string, string | string[]>) => Promise<{
    results: ResultItem[];
    totalScore: number;
    maxPoints: number;
    percentage: number;
    passed: boolean;
  } | null>;
}

// ─── MATCHING QUESTION COMPONENT (extracted for hooks compliance) ───
function MatchingQuestion({ q, qId, dark, submitted, setAnswer }: {
  q: Question;
  qId: string;
  dark: boolean;
  submitted: boolean;
  setAnswer: (id: string, answer: string | string[]) => void;
}) {
  const pairs = q.pairs || {};
  const leftItems = Object.keys(pairs);
  const rightItems = Object.values(pairs);
  const [shuffledRight] = useState(() => [...rightItems].sort(() => Math.random() - 0.5));
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [showKey, setShowKey] = useState(false);

  const matchedLeftIndices = new Set(Object.keys(matches).map(Number));
  const matchedRightIndices = new Set(Object.values(matches));
  const allMatched = Object.keys(matches).length === leftItems.length;

  const correctCount = leftItems.filter((left, i) => {
    const rightIdx = matches[i];
    return rightIdx !== undefined && shuffledRight[rightIdx] === pairs[left];
  }).length;

  useEffect(() => {
    if (allMatched) {
      const matchRecord: Record<string, string> = {};
      leftItems.forEach((left, i) => { matchRecord[left] = shuffledRight[matches[i]] || ""; });
      setAnswer(qId, JSON.stringify(matchRecord));
    }
  }, [matches, allMatched, leftItems, shuffledRight, qId, setAnswer]);

  const handleLeftClick = (idx: number) => {
    if (submitted || matchedLeftIndices.has(idx)) return;
    setSelectedLeft(selectedLeft === idx ? null : idx);
  };

  const handleRightClick = (idx: number) => {
    if (submitted || matchedRightIndices.has(idx) || selectedLeft === null) return;
    const newMatches = { ...matches, [selectedLeft]: idx };
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const handleMatchedClick = (leftIdx: number) => {
    if (submitted) return;
    setMatches(prev => { const n = { ...prev }; delete n[leftIdx]; return n; });
  };

  return (
    <div className="space-y-3">
      <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>Click a left item, then click its match on the right.</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          {leftItems.map((left, i) => {
            const isSelected = selectedLeft === i;
            const isMatched = matchedLeftIndices.has(i);
            const matchedRightIdx = matches[i];
            const isCorrect = isMatched && shuffledRight[matchedRightIdx] === pairs[left];
            return (
              <button key={`l-${i}`} onClick={() => isMatched ? handleMatchedClick(i) : handleLeftClick(i)}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                  isMatched
                    ? isCorrect
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                      : "bg-red-500/20 text-red-400 border-red-500"
                    : isSelected
                    ? "bg-purple-500/20 text-purple-400 border-purple-500 ring-1 ring-purple-500"
                    : dark
                    ? "bg-[#070B17] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400"
                }`}>
                {left}
              </button>
            );
          })}
        </div>
        <div className="space-y-1">
          {shuffledRight.map((right, i) => {
            const isMatched = matchedRightIndices.has(i);
            const matchedLeftIdx = Number(Object.entries(matches).find(([_, v]) => v === i)?.[0] || -1);
            const isCorrect = matchedLeftIdx >= 0 && right === pairs[leftItems[matchedLeftIdx]];
            return (
              <button key={`r-${i}`} onClick={() => handleRightClick(i)}
                disabled={isMatched || submitted}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                  isMatched
                    ? isCorrect
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                      : "bg-red-500/20 text-red-400 border-red-500"
                    : dark
                    ? "bg-[#070B17] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40 disabled:opacity-50"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400 disabled:opacity-50"
                }`}>
                {right}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {allMatched && (
          <span className={`text-xs font-semibold ${correctCount === leftItems.length ? "text-emerald-400" : "text-amber-400"}`}>
            {correctCount === leftItems.length ? "All correct!" : `${correctCount}/${leftItems.length} correct`}
          </span>
        )}
        <button onClick={() => setShowKey(!showKey)}
          className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
          {showKey ? "Hide" : "Show"} Answer Key
        </button>
        {Object.keys(matches).length > 0 && !submitted && (
          <button onClick={() => { setMatches({}); setSelectedLeft(null); }}
            className="text-xs text-gray-400 hover:text-gray-300 font-semibold">Reset</button>
        )}
      </div>
      {showKey && (
        <div className={`${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border mt-2`}>
          {leftItems.map((left, i) => (
            <p key={i} className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>{left} ↔ {pairs[left]}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ORDERING QUESTION COMPONENT (with HTML5 drag-and-drop & shuffle) ───
function OrderingQuestion({ q, qId, dark, submitted, setAnswer, userAnswer, resultForQ }: {
  q: Question;
  qId: string;
  dark: boolean;
  submitted: boolean;
  setAnswer: (id: string, answer: string | string[]) => void;
  userAnswer?: string | string[];
  resultForQ?: ResultItem;
}) {
  const items = q.items || [];
  const [shuffledItems] = useState(() => [...items].sort(() => Math.random() - 0.5));
  const currentOrder = (userAnswer as string[]) || shuffledItems;

  const [isDragging, setIsDragging] = useState<number | null>(null);

  const moveItem = (fromIdx: number, toIdx: number) => {
    if (submitted) return;
    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);
    setAnswer(qId, newOrder);
  };

  useEffect(() => {
    if (!userAnswer) {
      setAnswer(qId, shuffledItems);
    }
  }, [shuffledItems, userAnswer, qId, setAnswer]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (submitted) return;
    setIsDragging(index);
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (submitted) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (submitted) return;
    let sourceIdx = Number(e.dataTransfer.getData("text/plain"));
    if (isNaN(sourceIdx) || e.dataTransfer.getData("text/plain") === "") {
      sourceIdx = isDragging !== null ? isDragging : -1;
    }
    if (sourceIdx === -1 || sourceIdx === targetIndex) return;
    moveItem(sourceIdx, targetIndex);
    setIsDragging(null);
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  return (
    <div className="space-y-2">
      <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>Drag and drop to reorder, or click the arrows:</p>
      <div className="space-y-1">
        {currentOrder.map((item, i) => (
          <div
            key={i}
            draggable={!submitted}
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 p-2.5 rounded-xl border select-none transition-all cursor-grab active:cursor-grabbing ${
              isDragging === i ? "opacity-30 scale-[0.98] border-purple-500 bg-purple-500/10" : ""
            } ${
              submitted && resultForQ?.correct
                ? "border-emerald-500/50 bg-emerald-500/10"
                : submitted && !resultForQ?.correct
                ? "border-red-500/50 bg-red-500/10"
                : dark ? "border-[#1e2a4a] bg-[#0a0e1a] hover:border-purple-500/30" : "border-gray-200 bg-white hover:border-purple-400"
            }`}
          >
            <GripVertical className={`w-4 h-4 flex-shrink-0 cursor-grab ${dark ? "text-gray-500" : "text-gray-400"}`} />
            <span className={`flex-1 text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{item}</span>
            <div className="flex gap-1">
              <button onClick={() => moveItem(i, i - 1)} disabled={i === 0 || submitted}
                className={`p-1 rounded ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"} disabled:opacity-30`}>
                <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button onClick={() => moveItem(i, i + 1)} disabled={i === currentOrder.length - 1 || submitted}
                className={`p-1 rounded ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"} disabled:opacity-30`}>
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {submitted && !resultForQ?.correct && q.correctOrder && (
        <p className={`text-xs ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
          Correct order: {q.correctOrder.join(' → ')}
        </p>
      )}
    </div>
  );
}

export function QuizComponent({ questions, type: _type, onComplete, onAnswer, onSubmit }: QuizProps) {
  const { dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Immediate question-by-question grading states
  const [questionAttempts, setQuestionAttempts] = useState<Record<string, number>>({});
  const [questionResults, setQuestionResults] = useState<Record<string, ResultItem>>({});
  const [checkingQuestion, setCheckingQuestion] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const q = questions[current];
  if (!q) return <div className={`text-sm p-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>No questions</div>;

  const qId = q.id || (q as any)._id || String(current);
  const qText = q.text || (q as any).question || '';
  const userAnswer = answers[qId];

  // Shuffle ordering items on load if not already answered
  useEffect(() => {
    if (q && q.type === 'ordering') {
      const currentQId = q.id || (q as any)._id || String(current);
      if (!answers[currentQId] && q.items) {
        const shuffled = [...q.items].sort(() => Math.random() - 0.5);
        setAnswers(prev => ({ ...prev, [currentQId]: shuffled }));
      }
    }
  }, [current, q]);

  const resultForQ = results?.find(r => r.questionId === qId) || questionResults[qId];

  const setAnswer = useCallback((qId: string, val: string | string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    setQuestionResults(prev => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  }, []);

  // ─── CHECK ANSWER (SINGLE QUESTION) ───
  const handleCheckQuestion = async (targetQId: string) => {
    const val = answers[targetQId];
    if (val === undefined) return;

    setCheckingQuestion(prev => ({ ...prev, [targetQId]: true }));
    try {
      const targetQ = questions.find(question => (question.id || (question as any)._id) === targetQId);
      if (!targetQ) return;

      if (targetQ.type === 'matching') {
        const pairs = targetQ.pairs || {};
        try {
          const userMatches = JSON.parse(val as string);
          const allCorrect = Object.entries(pairs).every(([left, correctRight]) => userMatches[left] === correctRight);
          const mockResult: ResultItem = {
            questionId: targetQId,
            correct: allCorrect,
            points: allCorrect ? (targetQ.points || 1) : 0,
            maxPoints: targetQ.points || 1,
            explanation: allCorrect ? "All pairs matched correctly!" : `Correct pairs: ${Object.entries(pairs).map(([k, v]) => `${k} ↔ ${v}`).join(', ')}`,
          };
          setQuestionResults(prev => ({ ...prev, [targetQId]: mockResult }));
          if (!allCorrect) {
            setQuestionAttempts(prev => ({ ...prev, [targetQId]: (prev[targetQId] || 0) + 1 }));
          }
        } catch {
          // ignore
        }
      } else {
        if (onSubmit) {
          const res = await onSubmit({ [targetQId]: val });
          if (res && res.results && res.results.length > 0) {
            const singleResult = res.results.find((r: any) => r.questionId === targetQId);
            if (singleResult) {
              setQuestionResults(prev => ({ ...prev, [targetQId]: singleResult }));
              if (!singleResult.correct) {
                setQuestionAttempts(prev => ({ ...prev, [targetQId]: (prev[targetQId] || 0) + 1 }));
              }
            }
          }
        } else if (targetQ.type === 'fill_blank' || targetQ.type === 'fill_in_blank' || targetQ.type === 'short_answer' || targetQ.type === 'translation') {
          // Call backend AI endpoint /writing/grammar-check for LLM evaluation of typed answers
          try {
            const apiRes = await apiFetch('/writing/grammar-check', {
              method: 'POST',
              body: JSON.stringify({
                prompt: targetQ.prompt || targetQ.question || '',
                answer: val,
                expectedAnswer: targetQ.correctAnswer ? String(targetQ.correctAnswer) : '',
              }),
            });
            const json = await apiRes.json();
            if (json.success && json.data) {
              const aiResult: ResultItem = {
                questionId: targetQId,
                correct: !!json.data.correct,
                points: json.data.correct ? (targetQ.points || 1) : 0,
                maxPoints: targetQ.points || 1,
                explanation: json.data.feedback || (json.data.correct ? "Correct!" : `Expected: ${targetQ.correctAnswer}`),
                text: targetQ.prompt,
              };
              setQuestionResults(prev => ({ ...prev, [targetQId]: aiResult }));
              if (!aiResult.correct) {
                setQuestionAttempts(prev => ({ ...prev, [targetQId]: (prev[targetQId] || 0) + 1 }));
              }
            } else {
              throw new Error('AI check failed');
            }
          } catch {
            // Local evaluation fallback if AI service fails or is unconfigured
            const correct = targetQ.correctAnswer;
            let isCorrect = false;
            if (correct !== undefined && val !== undefined) {
              const normalize = (s: string) => String(s).trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
              const userStr = normalize(val as string);

              if (Array.isArray(correct)) {
                isCorrect = correct.some(c => {
                  const targetStr = normalize(c as string);
                  return userStr === targetStr || userStr.includes(targetStr) || targetStr.includes(userStr);
                });
              } else {
                const targetStr = normalize(correct as string);
                isCorrect = userStr === targetStr || (userStr.length > 3 && (userStr.includes(targetStr) || targetStr.includes(userStr)));
              }
            }
            const singleResult: ResultItem = {
              questionId: targetQId,
              correct: isCorrect,
              points: isCorrect ? (targetQ.points || 1) : 0,
              maxPoints: targetQ.points || 1,
              explanation: isCorrect ? "Correct!" : (targetQ.explanation || `Expected: ${correct}`),
              text: targetQ.prompt,
            };
            setQuestionResults(prev => ({ ...prev, [targetQId]: singleResult }));
            if (!isCorrect) {
              setQuestionAttempts(prev => ({ ...prev, [targetQId]: (prev[targetQId] || 0) + 1 }));
            }
          }
        } else {
          // Local evaluation fallback for multiple_choice / true_false
          const correct = targetQ.correctAnswer;
          let isCorrect = false;
          if (correct !== undefined && val !== undefined) {
            const normalize = (s: string) => String(s).trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
            const userStr = normalize(val as string);

            if (Array.isArray(correct)) {
              isCorrect = correct.some(c => {
                const targetStr = normalize(c as string);
                return userStr === targetStr || userStr.includes(targetStr) || targetStr.includes(userStr);
              });
            } else {
              const targetStr = normalize(correct as string);
              isCorrect = userStr === targetStr || (userStr.length > 3 && (userStr.includes(targetStr) || targetStr.includes(userStr)));
            }
          }
          const singleResult: ResultItem = {
            questionId: targetQId,
            correct: isCorrect,
            points: isCorrect ? (targetQ.points || 1) : 0,
            maxPoints: targetQ.points || 1,
            explanation: isCorrect ? "Correct!" : (targetQ.explanation || `Expected: ${correct}`),
            text: targetQ.prompt,
          };
          setQuestionResults(prev => ({ ...prev, [targetQId]: singleResult }));
          if (!isCorrect) {
            setQuestionAttempts(prev => ({ ...prev, [targetQId]: (prev[targetQId] || 0) + 1 }));
          }
        }
      }
    } catch (e) {
      console.error('Check answer failed:', e);
    } finally {
      setCheckingQuestion(prev => ({ ...prev, [targetQId]: false }));
    }
  };

  // ─── SUBMIT ALL ANSWERS TO BACKEND ───
  const handleSubmitAll = useCallback(async () => {
    setSubmitting(true);
    try {
      // Separate matching (local validation) from other types (backend validation)
      const matchingAnswers: Record<string, string> = {};
      const backendAnswers: Record<string, string | string[]> = {};

      for (const [qId, answer] of Object.entries(answers)) {
        const question = questions.find(q => (q.id || (q as any)._id) === qId);
        if (question?.type === 'matching') {
          matchingAnswers[qId] = answer as string;
        } else {
          backendAnswers[qId] = answer;
        }
      }

      // Compute local matching results
      const matchingResults: ResultItem[] = Object.entries(matchingAnswers).map(([qId, answerStr]) => {
        const question = questions.find(q => (q.id || (q as any)._id) === qId);
        const pairs = question?.pairs || {};
        try {
          const userMatches = JSON.parse(answerStr);
          const allCorrect = Object.entries(pairs).every(([left, correctRight]) => userMatches[left] === correctRight);
          return {
            questionId: qId,
            correct: allCorrect,
            points: allCorrect ? (question?.points || 1) : 0,
            maxPoints: question?.points || 1,
            explanation: allCorrect ? "All pairs matched correctly!" : `Correct pairs: ${Object.entries(pairs).map(([k, v]) => `${k} ↔ ${v}`).join(', ')}`,
          };
        } catch {
          return { questionId: qId, correct: false, points: 0, maxPoints: question?.points || 1, explanation: "Invalid matching answer" };
        }
      });

      // Submit non-matching answers to backend
      let backendResults: ResultItem[] = [];
      if (onSubmit && Object.keys(backendAnswers).length > 0) {
        const result = await onSubmit(backendAnswers);
        if (result) backendResults = result.results;
      } else if (Object.keys(backendAnswers).length > 0) {
        // Local grading fallback when no backend submit
        backendResults = Object.entries(backendAnswers).map(([qId, userAns]) => {
          const question = questions.find(q => (q.id || (q as any)._id) === qId);
          const correct = question?.correctAnswer;
          let isCorrect = false;
          if (correct !== undefined && userAns !== undefined) {
            const normalize = (s: string) => String(s).trim().toLowerCase();
            if (Array.isArray(correct)) {
              isCorrect = correct.some(c => normalize(c as string) === normalize(userAns as string));
            } else {
              isCorrect = normalize(correct as string) === normalize(userAns as string);
            }
          }
          return {
            questionId: qId,
            correct: isCorrect,
            points: isCorrect ? (question?.points || 1) : 0,
            maxPoints: question?.points || 1,
            explanation: isCorrect ? "Correct!" : (question?.explanation || `Expected: ${correct}`),
            text: question?.text || question?.question,
          };
        });
      }

      // Merge results
      const allResults = [...backendResults, ...matchingResults];
      setResults(allResults);
      setSubmitted(true);

      for (const r of allResults) {
        onAnswer?.(r.questionId, r.correct);
      }
      const totalScore = allResults.reduce((sum, r) => sum + r.points, 0);
      const maxPoints = allResults.reduce((sum, r) => sum + r.maxPoints, 0);
      onComplete?.(totalScore, maxPoints);
    } catch (e) {
      console.error('Submit failed:', e);
    } finally {
      setSubmitting(false);
    }
  }, [answers, questions, onSubmit, onAnswer, onComplete]);

  // ─── RENDER: MULTIPLE CHOICE ───
  const renderMultipleChoice = (q: Question, qId: string) => (
    <div className="space-y-2">
      {q.options?.map((opt, i) => {
        const isSelected = userAnswer === opt;
        const isCorrect = resultForQ?.correct && isSelected;
        const isWrong = resultForQ && !resultForQ.correct && isSelected;
        const showCorrect = resultForQ && !resultForQ.correct && opt === q.correctAnswer?.toString();

        return (
          <button key={i} onClick={() => !submitted && setAnswer(qId, opt)}
            disabled={submitted}
            className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
              submitted
                ? isCorrect ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : isWrong ? "border-red-500 bg-red-500/20 text-red-300"
                : showCorrect ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : dark ? "border-[#1e2a4a] text-gray-500" : "border-gray-200 text-gray-400"
                : isSelected
                ? dark ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-purple-400 bg-purple-50 text-purple-700"
                : dark ? "border-[#1e2a4a] text-gray-300 hover:border-purple-500/50" : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}>
            <div className="flex items-center gap-2">
              {submitted && (isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : isWrong ? <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" /> : showCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400/50 flex-shrink-0" /> : null)}
              {opt}
            </div>
          </button>
        );
      })}
    </div>
  );

  // ─── RENDER: FILL IN THE BLANK ───
  const renderFillBlank = (q: Question, qId: string) => (
    <div className="space-y-3">
      <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{q.prompt || 'Fill in the blank:'}</p>
      <input
        type="text"
        value={(userAnswer as string) || ''}
        onChange={(e) => setAnswer(qId, e.target.value)}
        disabled={submitted}
        placeholder="Type your answer..."
        className={`w-full p-3 rounded-xl border text-sm transition-all ${
          submitted
            ? resultForQ?.correct
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
              : "border-red-500 bg-red-500/10 text-red-300"
            : dark ? "border-[#1e2a4a] bg-[#0a0e1a] text-gray-200 focus:border-purple-500/50" : "border-gray-200 bg-white focus:border-purple-300"
        } outline-none`}
      />
      {submitted && !resultForQ?.correct && q.correctAnswer && (
        <p className={`text-xs ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
          Correct answer: <span className="font-semibold">{q.correctAnswer.toString()}</span>
        </p>
      )}
    </div>
  );

  // ─── RENDER: MATCHING (click-to-match from LessonPlayer) ───
  const renderMatching = (q: Question, qId: string) => (
    <MatchingQuestion q={q} qId={qId} dark={dark} submitted={submitted} setAnswer={setAnswer} />
  );

  // ─── RENDER: ORDERING ───
  const renderOrdering = (q: Question, qId: string) => {
    const items = q.items || [];
    const currentOrder = (userAnswer as string[]) || [...items];

    const moveItem = (fromIdx: number, toIdx: number) => {
      if (submitted) return;
      const newOrder = [...currentOrder];
      const [moved] = newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, moved);
      setAnswer(qId, newOrder);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
      if (submitted) return;
      e.dataTransfer.effectAllowed = "move";
      setDraggedIdx(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
      if (submitted) return;
      e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetIdx: number) => {
      if (submitted || draggedIdx === null) return;
      e.preventDefault();
      const newOrder = [...currentOrder];
      const [moved] = newOrder.splice(draggedIdx, 1);
      newOrder.splice(targetIdx, 0, moved);
      setAnswer(qId, newOrder);
    };

    const handleDragEnd = () => {
      setDraggedIdx(null);
    };

    return (
      <div className="space-y-2">
        <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>Drag or use arrows to reorder:</p>
        {currentOrder.map((item, i) => (
          <div key={i}
            draggable={!submitted}
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 p-2 rounded-xl border select-none transition-all ${
              draggedIdx === i ? "opacity-40 scale-95 border-purple-500 bg-purple-500/10" : ""
            } ${
              submitted && resultForQ?.correct
                ? "border-emerald-500/50 bg-emerald-500/10"
                : submitted && !resultForQ?.correct
                ? "border-red-500/50 bg-red-500/10"
                : dark ? "border-[#1e2a4a] bg-[#0a0e1a] cursor-move hover:border-purple-500/30" : "border-gray-200 bg-white cursor-move hover:border-purple-300"
            }`}
          >
            <GripVertical className={`w-4 h-4 flex-shrink-0 ${dark ? "text-gray-500" : "text-gray-400"}`} />
            <span className={`flex-1 text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{item}</span>
            <div className="flex gap-1">
              <button onClick={() => moveItem(i, i - 1)} disabled={i === 0 || submitted}
                className={`p-1 rounded ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"} disabled:opacity-30`}>
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button onClick={() => moveItem(i, i + 1)} disabled={i === currentOrder.length - 1 || submitted}
                className={`p-1 rounded ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"} disabled:opacity-30`}>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
        {submitted && !resultForQ?.correct && q.correctOrder && (
          <p className={`text-xs ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
            Correct order: {q.correctOrder.join(' → ')}
          </p>
        )}
      </div>
    );
  };

  // ─── RENDER: SHORT ANSWER ───
  const renderShortAnswer = (q: Question, qId: string) => (
    <div className="space-y-3">
      <textarea
        value={(userAnswer as string) || ''}
        onChange={(e) => setAnswer(qId, e.target.value)}
        disabled={submitted}
        placeholder="Write your answer in French..."
        className={`w-full h-24 p-3 rounded-xl border text-sm resize-none outline-none transition-all ${
          submitted
            ? resultForQ?.correct
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
              : "border-red-500 bg-red-500/10 text-red-300"
            : dark ? "border-[#1e2a4a] bg-[#0a0e1a] text-gray-200 focus:border-purple-500/50" : "border-gray-200 bg-white focus:border-purple-300"
        }`}
      />
      {submitted && !resultForQ?.correct && q.sampleAnswer && (
        <div className={`p-3 rounded-xl border text-xs ${dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"}`}>
          <p className={`font-semibold mb-1 ${dark ? "text-emerald-300" : "text-emerald-700"}`}>Sample answer:</p>
          <p className={dark ? "text-emerald-400" : "text-emerald-600"}>{q.sampleAnswer}</p>
        </div>
      )}
    </div>
  );

  // ─── RENDER: LISTENING (multiple choice with audio context) ───
  const renderListening = (q: Question, qId: string) => renderMultipleChoice(q, qId);

  // ─── RENDER: SPEAKING PROMPT ───
  const renderSpeaking = (q: Question, qId: string) => (
    <div className="space-y-3">
      {q.prompt && (
        <div className={`p-3 rounded-xl border ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
          <p className={`text-sm font-semibold ${dark ? "text-purple-300" : "text-purple-700"}`}>{q.prompt}</p>
          {q.pronunciationTip && (
            <p className={`text-xs mt-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>{q.pronunciationTip}</p>
          )}
        </div>
      )}
      <textarea
        value={(userAnswer as string) || ''}
        onChange={(e) => setAnswer(qId, e.target.value)}
        disabled={submitted}
        placeholder="Type what you would say..."
        className={`w-full h-20 p-3 rounded-xl border text-sm resize-none outline-none transition-all ${
          dark ? "border-[#1e2a4a] bg-[#0a0e1a] text-gray-200 focus:border-purple-500/50" : "border-gray-200 bg-white focus:border-purple-300"
        }`}
      />
    </div>
  );

  // ─── RENDER: TRUE / FALSE ───
  const renderTrueFalse = (q: Question, qId: string) => {
    const options = q.options || ['True', 'False'];
    return (
      <div className="space-y-2">
        {options.map((opt, i) => {
          const isSelected = userAnswer === opt;
          const isCorrect = resultForQ?.correct && isSelected;
          const isWrong = resultForQ && !resultForQ.correct && isSelected;
          const showCorrect = resultForQ && !resultForQ.correct && opt === q.correctAnswer?.toString();
          return (
            <button key={i} onClick={() => !submitted && setAnswer(qId, opt)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                submitted ? (isCorrect ? "border-emerald-500 bg-emerald-500/20 text-emerald-300" : isWrong ? "border-red-500 bg-red-500/20 text-red-300" : showCorrect ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : dark ? "border-[#1e2a4a] text-gray-500" : "border-gray-200 text-gray-400")
                : isSelected ? (dark ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-purple-400 bg-purple-50 text-purple-700")
                : dark ? "border-[#1e2a4a] text-gray-300 hover:border-purple-500/50" : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}>
              {opt}
            </button>
          );
        })}
      </div>
    );
  };

  // ─── RENDER QUESTION BY TYPE ───
  const renderQuestion = (q: Question, qId: string) => {
    const qType = q.type || _type;
    switch (qType) {
      case 'multiple_choice': return renderMultipleChoice(q, qId);
      case 'true_false': return renderTrueFalse(q, qId);
      case 'fill_blank':
      case 'fill_in_blank': return renderFillBlank(q, qId);
      case 'matching': return renderMatching(q, qId);
      case 'ordering': return (
        <OrderingQuestion
          q={q}
          qId={qId}
          dark={dark}
          submitted={submitted}
          setAnswer={setAnswer}
          userAnswer={userAnswer}
          resultForQ={resultForQ}
        />
      );
      case 'short_answer': return renderShortAnswer(q, qId);
      case 'listening': return renderListening(q, qId);
      case 'speaking_prompt':
      case 'speaking': return renderSpeaking(q, qId);
      case 'translation': return renderFillBlank(q, qId);
      default: return renderMultipleChoice(q, qId);
    }
  };

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className={`flex items-center justify-between mb-4 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
        <span>Question {current + 1} of {questions.length}</span>
        <span>{q.points || 1} point{(q.points || 1) !== 1 ? "s" : ""}</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
          {(() => {
            if (qText.includes('**English Translation:**')) {
              const parts = qText.split('**English Translation:**');
              const mainText = parts[0].trim();
              const translationText = parts[1].trim();
              return (
                <div className="space-y-2">
                  <p className={`text-sm font-semibold leading-relaxed whitespace-pre-line ${dark ? "text-gray-200" : "text-gray-850"}`}>{mainText}</p>
                  <TranslationToggle translation={translationText} dark={dark} />
                </div>
              );
            }
            return <p className={`text-sm font-semibold leading-relaxed whitespace-pre-line ${dark ? "text-gray-200" : "text-gray-850"}`}>{qText}</p>;
          })()}
          {renderQuestion(q, qId)}

          {/* Feedback after check or submit */}
          {resultForQ && (
            <div className={`p-4 rounded-xl border ${
              resultForQ.correct
                ? dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                : dark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {resultForQ.correct ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <span className={`text-sm font-semibold ${resultForQ.correct ? (dark ? "text-emerald-300" : "text-emerald-700") : (dark ? "text-red-300" : "text-red-700")}`}>
                  {resultForQ.correct ? "Correct!" : "Not quite"}
                </span>
              </div>
              
              {/* Show explanation only if correct, OR if unlocked via button, OR if whole form is submitted */}
              {(resultForQ.correct || revealedAnswers[qId] || submitted) ? (
                <p className={`text-xs ${resultForQ.correct ? (dark ? "text-emerald-400" : "text-emerald-600") : (dark ? "text-red-400" : "text-red-600")}`}>{resultForQ.explanation}</p>
              ) : (
                <div className="mt-2 flex flex-col items-start gap-1">
                  <p className={`text-xs ${dark ? "text-red-400" : "text-red-500"}`}>Attempts: {questionAttempts[qId] || 0} / 3</p>
                  {(questionAttempts[qId] || 0) >= 3 && (
                    <button onClick={() => setRevealedAnswers(prev => ({ ...prev, [qId]: true }))}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline mt-1">
                      Reveal Explanation & Correct Answer
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className={`px-4 py-2 text-sm border rounded-lg disabled:opacity-30 transition-all ${
            dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}>
          <ChevronLeft className="w-4 h-4 inline mr-1" />Previous
        </button>

        <div className="flex items-center gap-2">
          {!submitted ? (
            <>
              {/* Check Answer Button */}
              {userAnswer !== undefined && !resultForQ?.correct && (
                <button onClick={() => handleCheckQuestion(qId)} disabled={checkingQuestion[qId]}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-all shadow-md shadow-indigo-600/20">
                  {checkingQuestion[qId] ? "Checking..." : "Check Answer"}
                </button>
              )}

              {current < questions.length - 1 ? (
                <button onClick={() => setCurrent(current + 1)}
                  className="px-6 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-all flex items-center gap-1">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmitAll} disabled={!allAnswered || submitting}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold rounded-lg disabled:opacity-30 hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25">
                  {submitting ? 'Submitting...' : `Submit All (${totalAnswered}/${questions.length})`}
                </button>
              )}
            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { setAnswers({}); setSubmitted(false); setResults(null); setCurrent(0); setQuestionAttempts({}); setQuestionResults({}); setRevealedAnswers({}); }}
                className={`px-4 py-2 text-sm border rounded-lg transition-all ${
                  dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}>
                Try Again
              </button>
              <button onClick={() => onComplete?.(results?.filter(r => r.correct).length || 0, results?.length || 0)}
                className="px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-all">
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {submitted && results && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-2xl border text-center ${
            dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-gray-200"
          }`}>
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
            Score: {results.filter(r => r.correct).length} / {results.length}
          </p>
          <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {results.filter(r => r.correct).length === results.length ? 'Perfect score!' : 'Review the explanations above.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function TranslationToggle({ translation, dark }: { translation: string; dark: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      <button onClick={() => setShow(!show)} className={`text-xs ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"} hover:underline font-semibold`}>
        {show ? "Hide English Translation" : "Show English Translation"}
      </button>
      {show && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`text-xs mt-1 italic p-2.5 rounded-lg border ${dark ? "bg-white/5 border-[#1e2a4a] text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
          {translation}
        </motion.div>
      )}
    </div>
  );
}
