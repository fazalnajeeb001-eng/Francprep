import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowLeft, Shuffle, ChevronLeft, ChevronRight, BookOpen, RotateCcw } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { chapterA1, lessons } from "~/lib/lessons/a1-greetings";

export const Route = createFileRoute("/flashcards")({ component: FlashcardsPage });

// Collect all vocabulary from all lessons
function collectAllVocab() {
  const all: { french: string; english: string; pronunciation: string; example: string; lesson: number }[] = [];
  for (const [id, lesson] of Object.entries(lessons)) {
    for (const section of lesson.sections) {
      if (section.vocabulary) {
        for (const v of section.vocabulary) {
          all.push({ ...v, lesson: lesson.lessonNumber });
        }
      }
    }
  }
  return all;
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

function FlashcardsPage() {
  const { dark } = useTheme();
  const allVocab = collectAllVocab();
  const [cards, setCards] = useState(allVocab);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [lessonFilter, setLessonFilter] = useState<number | null>(null);

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const border = dark ? "border-[#1e2a4a]" : "border-gray-200";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  const shuffleCards = useCallback(() => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setFlipped(false);
  }, []);

  const filterByLesson = useCallback((lesson: number | null) => {
    setLessonFilter(lesson);
    const filtered = lesson === null ? allVocab : allVocab.filter(v => v.lesson === lesson);
    setCards([...filtered].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setFlipped(false);
  }, []);

  const goNext = () => {
    if (current < cards.length - 1) {
      setCurrent(c => c + 1);
      setFlipped(false);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
      setFlipped(false);
    }
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
              <p className={`text-xs ${textMuted}`}>{cards.length} words · Lesson {lessonFilter || "All"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={shuffleCards}
              className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Shuffle">
              <Shuffle className={`w-4 h-4 ${textSec}`} />
            </button>
            <button onClick={() => filterByLesson(null)}
              className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Reset filter">
              <RotateCcw className={`w-4 h-4 ${textSec}`} />
            </button>
          </div>
        </div>

        {/* Lesson Filter Chips */}
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
              onClick={() => setFlipped(!flipped)}
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
                  <p className={`text-xs ${textMuted} mt-4`}>Tap to see French</p>
                </div>
              </motion.div>
            </motion.div>

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
            <p className={`font-semibold ${dark ? "text-gray-400" : "text-gray-600"}`}>No vocabulary words found</p>
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