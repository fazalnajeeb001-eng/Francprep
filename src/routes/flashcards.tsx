import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowLeft, Shuffle, ChevronLeft, ChevronRight, BookOpen, RotateCcw, Brain, Star } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { useAuth } from "~/lib/AuthContext";
import { reviewFlashcards, getDueCards, getFlashcardStats, type FlashcardProgress } from "~/lib/flashcardsApi";

export const Route = createFileRoute("/flashcards")({ component: FlashcardsPage });

function collectAllVocab() {
  return apiFetch("/lessons?limit=100")
    .then(res => res.json())
    .then(json => {
      const lessons = json.data || [];
      const all: { french: string; english: string; pronunciation: string; example: string; lesson: number }[] = [];
      for (const lesson of lessons) {
        if (lesson.vocabItems) {
          for (const v of lesson.vocabItems) {
            all.push({ french: v.french, english: v.english, pronunciation: v.pronunciation || "", example: v.example || "", lesson: lesson.order || 1 });
          }
        }
      }
      return all;
    })
    .catch(() => []);
}

import { speak } from "~/lib/speech";

const RATING_LABELS = [
  { quality: 0, label: "Blackout", color: "from-red-600 to-red-700", icon: "😵" },
  { quality: 1, label: "Wrong", color: "from-red-500 to-rose-500", icon: "❌" },
  { quality: 2, label: "Hard", color: "from-orange-500 to-amber-500", icon: "😓" },
  { quality: 3, label: "Okay", color: "from-yellow-500 to-amber-500", icon: "🤔" },
  { quality: 4, label: "Good", color: "from-emerald-500 to-teal-500", icon: "👍" },
  { quality: 5, label: "Easy", color: "from-purple-500 to-indigo-500", icon: "🚀" },
];

function FlashcardsPage() {
  const { dark } = useTheme();
  const { isAuthenticated } = useAuth();
  const [cards, setCards] = useState<{ french: string; english: string; pronunciation: string; example: string; lesson: number }[]>([]);
  const [allVocab, setAllVocab] = useState<typeof cards>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [lessonFilter, setLessonFilter] = useState<number | null>(null);
  const [dueCards, setDueCards] = useState<FlashcardProgress[]>([]);
  const [showRating, setShowRating] = useState(false);
  const [stats, setStats] = useState({ total: 0, due: 0, mastered: 0 });
  const [reviewed, setReviewed] = useState(0);
  const [mode, setMode] = useState<"all" | "due">("all");

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  useEffect(() => {
    collectAllVocab().then(vocab => {
      setAllVocab(vocab);
      setCards([...vocab].sort(() => Math.random() - 0.5));
    });
    if (isAuthenticated) {
      getFlashcardStats().then(setStats).catch(() => {});
      getDueCards().then(setDueCards).catch(() => {});
    }
  }, [isAuthenticated]);

  const shuffleCards = useCallback(() => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setFlipped(false);
    setShowRating(false);
  }, []);

  const filterByLesson = useCallback((lesson: number | null) => {
    setLessonFilter(lesson);
    const filtered = lesson === null ? allVocab : allVocab.filter(v => v.lesson === lesson);
    setCards([...filtered].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setFlipped(false);
    setShowRating(false);
  }, []);

  const startDueReview = useCallback(() => {
    if (dueCards.length === 0) return;
    const dueVocab = dueCards.map(dc => ({
      french: dc.french,
      english: dc.english,
      pronunciation: dc.pronunciation || "",
      example: "",
      lesson: 1,
      cardId: dc.cardId,
    }));
    setCards(dueVocab as any);
    setMode("due");
    setCurrent(0);
    setFlipped(false);
    setReviewed(0);
  }, [dueCards]);

  const goNext = () => {
    if (current < cards.length - 1) {
      setCurrent(c => c + 1);
      setFlipped(false);
      setShowRating(false);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
      setFlipped(false);
      setShowRating(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) setShowRating(true);
  };

  const handleRate = async (quality: number) => {
    const card = cards[current];
    if (isAuthenticated) {
      try {
        await reviewFlashcards([{
          cardId: `${card.french}-${card.english}`,
          lessonId: String(card.lesson || "1"),
          french: card.french,
          english: card.english,
          pronunciation: card.pronunciation,
          quality,
        }]);
        setReviewed(r => r + 1);
      } catch {}
    }
    goNext();
  };

  const currentCard = cards[current];

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/learn" className={`p-2 rounded-xl ${btnHover} transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${textSec}`} />
            </Link>
            <div>
              <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>📇 Flashcards</h1>
              <p className={`text-xs ${textMuted}`}>
                {mode === "due" ? `${cards.length} due cards · ${reviewed} reviewed` : `${cards.length} words · Lesson ${lessonFilter || "All"}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && dueCards.length > 0 && mode === "all" && (
              <button onClick={startDueReview}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                <Brain className="w-3.5 h-3.5" /> Due ({dueCards.length})
              </button>
            )}
            <button onClick={shuffleCards}
              className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Shuffle">
              <Shuffle className={`w-4 h-4 ${textSec}`} />
            </button>
            <button onClick={() => { filterByLesson(null); setMode("all"); }}
              className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Reset filter">
              <RotateCcw className={`w-4 h-4 ${textSec}`} />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {isAuthenticated && stats.total > 0 && mode === "all" && (
          <div className={`flex items-center gap-4 mb-4 p-3 rounded-xl ${dark ? "bg-[#101828]/60 border border-[#1e2a4a]" : "bg-white/60 border border-gray-200"} backdrop-blur-sm`}>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] text-purple-400 font-semibold">{stats.mastered} mastered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] text-amber-400 font-semibold">{stats.due} due</span>
            </div>
          </div>
        )}

        {/* Lesson Filter Chips */}
        {mode === "all" && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <button onClick={() => filterByLesson(null)}
              className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                lessonFilter === null
                  ? "bg-purple-500 text-white border-purple-500"
                  : dark ? "border-[#1e2a4a] text-gray-400 hover:border-purple-500/50" : "border-gray-200 text-gray-500 hover:border-purple-400"
              }`}>
              All ({allVocab.length})
            </button>
            {[1, 2, 3, 4].map(n => {
              const count = allVocab.filter(v => v.lesson === n).length;
              return count > 0 ? (
                <button key={n} onClick={() => filterByLesson(n)}
                  className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                    lessonFilter === n
                      ? "bg-purple-500 text-white border-purple-500"
                      : dark ? "border-[#1e2a4a] text-gray-400 hover:border-purple-500/50" : "border-gray-200 text-gray-500 hover:border-purple-400"
                  }`}>
                  Lesson {n} ({count})
                </button>
              ) : null;
            })}
          </div>
        )}

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${cards.length > 0 ? ((current + 1) / cards.length) * 100 : 0}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
          <span className={`text-xs ${textMuted}`}>{current + 1}/{cards.length}</span>
        </div>

        {/* Flash Card */}
        {currentCard ? (
          <div className="perspective-1000" style={{ perspective: "1000px" }}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="cursor-pointer"
              onClick={handleFlip}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                className={`relative rounded-2xl ${cardBg} backdrop-blur-lg border shadow-lg min-h-[280px] flex items-center justify-center`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front - French */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden" }}>
                  <p className={`text-xs font-semibold mb-3 ${textMuted}`}>🇫🇷 French</p>
                  <h2 className={`text-2xl font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
                    {currentCard.french}
                  </h2>
                  <p className={`text-sm ${textMuted} mb-4`}>{currentCard.pronunciation}</p>
                  <button onClick={(e) => { e.stopPropagation(); speak(currentCard.french); }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all shadow-lg shadow-purple-500/25"
                    aria-label={`Hear ${currentCard.french}`}>
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <p className={`text-xs ${textMuted} mt-4`}>Tap to reveal English</p>
                </div>

                {/* Back - English */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <p className={`text-xs font-semibold mb-3 ${textMuted}`}>🇬🇧 English</p>
                  <h2 className={`text-2xl font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
                    {currentCard.english}
                  </h2>
                  <div className={`mt-4 p-3 rounded-xl text-xs ${dark ? "bg-[#070B17] text-gray-400" : "bg-gray-50 text-gray-500"} max-w-sm`}>
                    <span className="font-semibold">Example: </span>
                    {currentCard.example}
                  </div>
                  <p className={`text-xs ${textMuted} mt-4`}>Rate your recall below</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Rating Buttons (spaced repetition) */}
            <AnimatePresence>
              {showRating && flipped && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4"
                >
                  <p className={`text-center text-[10px] mb-2 ${textMuted}`}>How well did you know this?</p>
                  <div className="flex justify-center gap-1.5 flex-wrap">
                    {RATING_LABELS.map((r) => (
                      <button
                        key={r.quality}
                        onClick={(e) => { e.stopPropagation(); handleRate(r.quality); }}
                        className={`flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl bg-gradient-to-r ${r.color} text-white text-[10px] font-semibold hover:opacity-80 transition-all shadow-md min-w-[52px]`}>
                        <span className="text-sm">{r.icon}</span>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={goPrev} disabled={current === 0}
                className={`flex items-center gap-1 text-sm font-semibold disabled:opacity-30 ${textSec} ${btnHover} px-3 py-2 rounded-xl transition-all`}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={goNext} disabled={current >= cards.length - 1}
                className={`flex items-center gap-1 text-sm font-semibold disabled:opacity-30 ${textSec} ${btnHover} px-3 py-2 rounded-xl transition-all`}>
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className={`w-12 h-12 mx-auto ${textMuted} mb-4`} />
            <p className={`font-semibold ${dark ? "text-gray-400" : "text-gray-600"}`}>
              {mode === "due" ? "No cards due for review!" : "No vocabulary words found"}
            </p>
            {mode === "due" && (
              <button onClick={() => setMode("all")} className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-semibold">
                Browse all cards
              </button>
            )}
          </div>
        )}

        {/* Keyboard hints */}
        <div className="mt-8 text-center">
          <p className={`text-[10px] ${textMuted}`}>
            ← → Arrow keys · Space to flip · S to shuffle
          </p>
        </div>
      </div>
    </div>
  );
}
