import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowLeft, Shuffle, ChevronLeft, ChevronRight, RotateCcw, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { useAuth } from "~/lib/AuthContext";
import { reviewFlashcards, getDueCards, getFlashcardStats, type FlashcardProgress } from "~/lib/flashcardsApi";
import { speak } from "~/lib/speech";

export const Route = createFileRoute("/flashcards")({ component: FlashcardsPage });

interface VocabCard {
  id: string;
  french: string;
  english: string;
  pronunciation: string;
  example: string;
  level: string;
  lesson: number;
  chapter: number;
  chapterTitle: string;
  isUnlocked: boolean;
}

const RATING_LABELS = [
  { quality: 0, label: "Again", color: "from-red-600 to-rose-700", icon: "😵" },
  { quality: 1, label: "Hard", color: "from-orange-500 to-amber-600", icon: "😓" },
  { quality: 3, label: "Good", color: "from-emerald-500 to-teal-600", icon: "👍" },
  { quality: 5, label: "Easy", color: "from-purple-500 to-indigo-600", icon: "🚀" },
];

function FlashcardsPage() {
  const { dark } = useTheme();
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const [allCards, setAllCards] = useState<VocabCard[]>([]);
  const [activeCards, setActiveCards] = useState<VocabCard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [dueCards, setDueCards] = useState<FlashcardProgress[]>([]);
  const [showRating, setShowRating] = useState(false);
  const [stats, setStats] = useState({ total: 0, due: 0, mastered: 0 });
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewMode, setReviewMode] = useState<"all" | "due">("all");
  const [loadingData, setLoadingData] = useState(true);

  // Theme styling helpers
  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-md shadow-slate-200/50";
  const textSec = dark ? "text-gray-300" : "text-slate-700";
  const textMuted = dark ? "text-gray-400" : "text-slate-500";
  const btnHover = dark ? "hover:bg-white/10" : "hover:bg-slate-100";

  // Check completed chapter capstones from user progress
  const completedChapters = new Set<number>((user as any)?.completedChapters || []);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      try {
        // Fetch chapters first to build an ObjectId -> Chapter Number lookup map
        const chMap: Record<string, number> = {};
        try {
          const chRes = await apiFetch("/chapters?limit=100");
          const chJson = await chRes.json();
          const chList = chJson.data || chJson.chapters || (Array.isArray(chJson) ? chJson : []);
          chList.forEach((chObj: any) => {
            if (chObj._id && (chObj.order || chObj.chapterNum)) {
              chMap[chObj._id.toString()] = Number(chObj.order || chObj.chapterNum);
            }
          });
        } catch {}

        const res = await apiFetch("/lessons?limit=200");
        const json = await res.json();
        const lessons = json.data || json.lessons || (Array.isArray(json) ? json : []);
        
        const extracted: VocabCard[] = [];
        let cardCounter = 0;

        for (const lesson of lessons) {
          // Resolve chapter number using ObjectId map or string regex
          let chNum = 0;
          if (lesson.chapterId && chMap[lesson.chapterId.toString()]) {
            chNum = chMap[lesson.chapterId.toString()];
          } else if (typeof lesson.chapter === 'number' && lesson.chapter > 0) {
            chNum = lesson.chapter;
          } else if (typeof lesson.chapterId === 'number' && lesson.chapterId > 0) {
            chNum = lesson.chapterId;
          }

          if (!chNum && typeof lesson.lessonId === 'string') {
            const match = lesson.lessonId.match(/ch(\d+)/i) || lesson.lessonId.match(/c(\d+)-l/i) || lesson.lessonId.match(/chapter[-_\s]*(\d+)/i);
            if (match) chNum = Number(match[1]);
          }

          if (!chNum && typeof lesson.chapterId === 'string') {
            const match = lesson.chapterId.match(/ch(\d+)/i) || lesson.chapterId.match(/chapter[-_\s]*(\d+)/i);
            if (match) chNum = Number(match[1]);
          }

          if (!chNum) chNum = 1;

          // Resolve lesson order (1-8) within chapter
          let lessonOrder = 1;
          if (typeof lesson.order === 'number' && lesson.order > 0) {
            lessonOrder = lesson.order;
          } else if (typeof lesson.lessonNumber === 'number' && lesson.lessonNumber > 0) {
            lessonOrder = lesson.lessonNumber;
          } else if (typeof lesson.lessonId === 'string') {
            const lMatch = lesson.lessonId.match(/l(\d+)/i);
            if (lMatch) lessonOrder = Number(lMatch[1]);
          }
          const isChUnlocked = user?.role === 'admin' || completedChapters.has(chNum) || chNum === 1;

          let vocabList = Array.isArray(lesson.vocabItems) && lesson.vocabItems.length > 0 ? lesson.vocabItems
            : Array.isArray(lesson.vocabulary) && lesson.vocabulary.length > 0 ? lesson.vocabulary
            : [];

          // For practice & dialogue lessons (Lessons 4-7) where standalone vocabulary tables aren't present,
          // extract key expressions from conversation scenes & grammar examples!
          if (vocabList.length === 0) {
            const extraTerms: any[] = [];
            
            // Extract from Scene / Dialogue text
            const sceneTxt = lesson.scene?.text || lesson.reading?.text || lesson.listening?.transcript || '';
            if (sceneTxt) {
              const lines = sceneTxt.split('\n');
              for (const line of lines) {
                if (line.includes('—') || line.includes(':')) {
                  const parts = line.split(/—|:/);
                  const fr = parts[1]?.trim() || parts[0]?.trim();
                  if (fr && fr.length > 3 && fr.length < 60) {
                    extraTerms.push({ french: fr, english: 'Key Dialogue Line' });
                  }
                }
              }
            }

            // Extract from Grammar examples
            const rules = lesson.grammar?.rules || (Array.isArray(lesson.grammar) ? lesson.grammar : []);
            for (const r of rules) {
              const exs = Array.isArray(r.examples) ? r.examples : typeof r.examples === 'string' ? [r.examples] : [];
              for (const exStr of exs) {
                if (typeof exStr === 'string' && exStr.trim()) {
                  extraTerms.push({ french: exStr.trim(), english: r.rule || 'Grammar Example' });
                }
              }
            }

            if (extraTerms.length > 0) {
              vocabList = extraTerms;
            }
          }

          for (const v of vocabList) {
            cardCounter++;
            let fr = '';
            let en = '';
            let pron = '';
            let ex = '';

            if (typeof v === 'string') {
              const parts = v.split(/→|->/);
              fr = parts[0]?.replace(/^[-•]\s*/, '').trim() || v;
              en = parts[1]?.trim() || '';
            } else if (v && typeof v === 'object') {
              fr = v.french || v.term || v.word || v.expression || '';
              en = v.english || v.translation || v.meaning || v.definition || '';
              pron = v.pronunciation || '';
              ex = v.example || '';

              if (!en && (fr.includes('→') || fr.includes('->'))) {
                const parts = fr.split(/→|->/);
                fr = parts[0]?.replace(/^[-•]\s*/, '').trim();
                en = parts[1]?.trim() || '';
              }
            }

            if (fr) {
              const lvl = (lesson.level || 'A1').toUpperCase();
              extracted.push({
                id: `card-${cardCounter}-${fr}`,
                french: fr,
                english: en || 'Key Expression',
                pronunciation: pron,
                example: ex,
                level: lvl,
                lesson: lessonOrder,
                chapter: chNum,
                chapterTitle: lesson.title || `Lesson ${lessonOrder}`,
                isUnlocked: isChUnlocked
              });
            }
          }
        }

        setAllCards(extracted);
        const a1Cards = extracted.filter(c => c.level === 'A1');
        setActiveCards(a1Cards.length > 0 ? a1Cards : extracted);
      } catch (err) {
        console.error("Failed to load flashcard vocab", err);
      } finally {
        setLoadingData(false);
      }

      try {
        const statsData = await getFlashcardStats();
        if (statsData) setStats(statsData);
        const dueData = await getDueCards();
        if (Array.isArray(dueData)) setDueCards(dueData);
      } catch {}
    }

    loadData();
  }, [user]);

  const filterCards = (lvl: string, ch: number | 'all', lsn: number | 'all') => {
    setSelectedLevel(lvl);
    setSelectedChapter(ch);
    setSelectedLesson(lsn);
    setIsFlipped(false);
    setShowRating(false);
    setCurrentIdx(0);

    let filtered = allCards.filter(c => c.level === lvl);

    // Filter by Chapter
    if (ch !== 'all') {
      filtered = filtered.filter(c => c.chapter === ch);
    } else {
      filtered = filtered.filter(c => c.isUnlocked);
    }

    // Filter by Lesson
    if (lsn !== 'all') {
      filtered = filtered.filter(c => c.lesson === lsn);
    }

    setActiveCards(filtered.length > 0 ? filtered : []);
  };

  const handleSelectLevel = (lvl: string) => {
    filterCards(lvl, 'all', 'all');
  };

  const handleSelectChapter = (ch: number | 'all') => {
    filterCards(selectedLevel, ch, 'all');
  };

  const handleSelectLesson = (lsn: number | 'all') => {
    filterCards(selectedLevel, selectedChapter, lsn);
  };

  const handleShuffle = () => {
    setActiveCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setIsFlipped(false);
    setShowRating(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) setShowRating(true);
  };

  const handleNext = () => {
    if (currentIdx < activeCards.length - 1) {
      setCurrentIdx(c => c + 1);
      setIsFlipped(false);
      setShowRating(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(c => c - 1);
      setIsFlipped(false);
      setShowRating(false);
    }
  };

  const handleRateCard = async (quality: number) => {
    const card = activeCards[currentIdx];
    if (card && isAuthenticated) {
      try {
        await reviewFlashcards([{
          cardId: card.id,
          lessonId: String(card.chapter),
          french: card.french,
          english: card.english,
          pronunciation: card.pronunciation,
          quality,
        }]);
        setReviewedCount(r => r + 1);
      } catch {}
    }
    handleNext();
  };

  const currentCard = activeCards[currentIdx];
  const uniqueLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const levelCards = allCards.filter(c => c.level === selectedLevel);
  const uniqueChapters = Array.from(new Set(levelCards.map(c => c.chapter))).sort((a, b) => a - b);

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300 pb-16`}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b dark:border-[#1e2a4a] border-gray-200 pb-5">
          <div className="flex items-center gap-3">
            <Link to="/learn" className={`p-2.5 rounded-xl border ${dark ? "bg-[#101828] border-purple-500/20 text-purple-400 hover:bg-purple-500/10" : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"} transition-all`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  Spaced Repetition Engine
                </span>
              </div>
              <h1 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-gray-900"} mt-0.5`}>
                ⚡ Flashcards Study Vault
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                dark ? "bg-[#101828] border-purple-500/20 text-purple-300 hover:bg-purple-500/10" : "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
              }`}
              title="Shuffle Cards"
            >
              <Shuffle className="w-4 h-4 text-purple-400" /> Shuffle
            </button>
            <button
              onClick={() => handleSelectChapter('all')}
              className={`p-2.5 rounded-xl border transition-all ${
                dark ? "bg-[#101828] border-purple-500/20 text-gray-400 hover:text-white" : "bg-white border-purple-200 text-gray-600 hover:text-gray-900"
              }`}
              title="Reset Deck"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6-Module CEFR Level Selector Tabs (A1 - C2) */}
        <div className="space-y-2">
          <span className={`text-xs font-bold uppercase tracking-wider block ${dark ? "text-purple-400" : "text-purple-700"}`}>
            Select Module Level:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {uniqueLevels.map((lvl) => {
              const count = allCards.filter(c => c.level === lvl).length;
              return (
                <button
                  key={lvl}
                  onClick={() => handleSelectLevel(lvl)}
                  className={`flex-1 min-w-[70px] py-2.5 px-2 rounded-xl text-xs font-extrabold border text-center transition-all shrink-0 ${
                    selectedLevel === lvl
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500 shadow-lg shadow-purple-500/25 scale-[1.02]"
                      : dark ? "bg-[#101828] border-purple-500/20 text-gray-300 hover:bg-purple-500/10" : "bg-white border-purple-200 text-purple-900 hover:bg-purple-50"
                  }`}
                >
                  <span className="block text-sm font-black">{lvl}</span>
                  <span className="block text-[10px] opacity-75 font-normal">{count} Cards</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Chapter Unlock Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-400" : "text-purple-700"}`}>
              Select {selectedLevel} Chapter Deck:
            </span>
            <span className={`text-xs ${textMuted}`}>
              {activeCards.length} Cards in Deck
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleSelectChapter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedChapter === 'all'
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500 shadow-lg shadow-purple-500/25"
                  : dark ? "bg-[#101828] border-purple-500/20 text-gray-300 hover:bg-purple-500/10" : "bg-white border-purple-200 text-slate-700 hover:bg-purple-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              All Unlocked ({levelCards.filter(c => c.isUnlocked).length})
            </button>

            {uniqueChapters.map((chNum) => {
              const isUnlocked = user?.role === 'admin' || completedChapters.has(chNum) || (selectedLevel === 'A1' && chNum === 1);
              const chCardsCount = levelCards.filter(c => c.chapter === chNum).length;

              return (
                <button
                  key={chNum}
                  onClick={() => isUnlocked && handleSelectChapter(chNum)}
                  disabled={!isUnlocked}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all whitespace-nowrap flex items-center gap-2 ${
                    selectedChapter === chNum
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500 shadow-lg shadow-purple-500/25"
                      : isUnlocked
                      ? dark
                        ? "bg-[#101828] border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                        : "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
                      : dark
                      ? "bg-black/40 border-gray-800 text-gray-600 opacity-60 cursor-not-allowed"
                      : "bg-gray-100 border-gray-200 text-gray-400 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Chapter {chNum} ({chCardsCount})
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      Chapter {chNum} (Complete L8)
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Sub-Filter Tabs (Clean Chapter & Lesson Categorization) */}
        {selectedChapter !== 'all' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className={`text-[11px] font-bold uppercase tracking-wider shrink-0 ${dark ? "text-purple-400" : "text-purple-700"}`}>
              Lesson Filter:
            </span>
            <button
              onClick={() => handleSelectLesson('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                selectedLesson === 'all'
                  ? "bg-purple-600 text-white border-purple-500 shadow-md"
                  : dark ? "bg-[#101828] border-purple-500/20 text-gray-400 hover:text-white" : "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
              }`}
            >
              All Chapter {selectedChapter} ({allCards.filter(c => c.chapter === selectedChapter).length})
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((lsnNum) => {
              const lsnCardsCount = allCards.filter(c => c.chapter === selectedChapter && c.lesson === lsnNum).length;
              return (
                <button
                  key={lsnNum}
                  onClick={() => handleSelectLesson(lsnNum)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                    selectedLesson === lsnNum
                      ? "bg-purple-600 text-white border-purple-500 shadow-md"
                      : dark ? "bg-[#101828] border-purple-500/20 text-gray-400 hover:text-white" : "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
                  }`}
                >
                  Lesson {lsnNum} ({lsnCardsCount})
                </button>
              );
            })}
          </div>
        )}

        {/* Progress Tracker Bar */}
        {activeCards.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={dark ? "text-purple-400" : "text-purple-700"}>
                Card {currentIdx + 1} of {activeCards.length}
              </span>
              <span className={textMuted}>
                {Math.round(((currentIdx + 1) / activeCards.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-800/40 overflow-hidden border border-purple-500/20 p-0.5">
              <motion.div
                animate={{ width: `${((currentIdx + 1) / activeCards.length) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"
              />
            </div>
          </div>
        )}

        {/* Main Interactive 3D Card Display */}
        {loadingData ? (
          <div className="h-72 rounded-3xl border flex items-center justify-center dark:bg-[#101828]/50 border-purple-500/20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
          </div>
        ) : currentCard ? (
          <div className="space-y-5">
            {!currentCard.isUnlocked && (
              <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-amber-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> This Chapter Deck is locked. Complete Chapter {currentCard.chapter} Capstone to unlock full flashcard reviews!
              </div>
            )}

            <div className="w-full relative" style={{ perspective: "1000px" }}>
              <motion.div
                onClick={handleFlip}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="w-full min-h-[300px] cursor-pointer relative select-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face - French */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-colors ${
                    dark
                      ? "bg-gradient-to-br from-purple-950/80 via-[#101828] to-[#0c1224] border-purple-500/40 hover:border-purple-400 shadow-purple-500/10"
                      : "bg-gradient-to-br from-purple-50 via-white to-purple-50 border-purple-200 hover:border-purple-300 shadow-purple-100"
                  }`}
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                      🇫🇷 FRENCH EXPRESSION
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300 px-2.5 py-1 rounded bg-purple-900/30 border border-purple-500/20">
                      Level {currentCard.level}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 py-1 rounded bg-black/20">
                      Chapter {currentCard.chapter}
                    </span>
                  </div>

                  <h2 className={`text-2xl sm:text-3xl font-extrabold leading-snug px-4 my-2 ${dark ? "text-white" : "text-gray-900"}`}>
                    {currentCard.french}
                  </h2>

                  {currentCard.pronunciation && (
                    <p className="text-xs text-purple-300 italic font-mono mb-2">
                      /{currentCard.pronunciation}/
                    </p>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); speak(currentCard.french); }}
                    className="mt-3 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4" /> Listen Audio
                  </button>

                  <div className="absolute bottom-4 text-[11px] text-gray-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <span>Click card to flip</span>
                  </div>
                </div>

                {/* Back Face - English */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-colors ${
                    dark
                      ? "bg-gradient-to-br from-indigo-950/90 via-purple-900/60 to-[#0c1224] border-indigo-500/50 shadow-indigo-500/10"
                      : "bg-gradient-to-br from-indigo-50 via-purple-50 to-white border-indigo-300 shadow-indigo-100"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      🇬🇧 ENGLISH TRANSLATION
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 py-1 rounded bg-black/20">
                      Chapter {currentCard.chapter}
                    </span>
                  </div>

                  <h2 className={`text-2xl sm:text-3xl font-extrabold leading-snug px-4 my-2 ${dark ? "text-indigo-200" : "text-indigo-900"}`}>
                    {currentCard.english}
                  </h2>

                  {currentCard.example && (
                    <div className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed max-w-md ${dark ? "bg-black/40 border-purple-500/20 text-gray-300" : "bg-purple-50/50 border-purple-200 text-gray-800"}`}>
                      <span className="font-bold text-purple-400 block mb-0.5">Context Example:</span>
                      "{currentCard.example}"
                    </div>
                  )}

                  <div className="absolute bottom-4 text-[11px] text-gray-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <span>Click to flip back</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Spaced Repetition Rating Buttons */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-2 pt-1"
                >
                  <p className={`text-center text-xs font-bold ${textMuted}`}>
                    How easily did you recall this expression?
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto">
                    {RATING_LABELS.map((r) => (
                      <button
                        key={r.quality}
                        onClick={() => handleRateCard(r.quality)}
                        className={`py-3 rounded-xl bg-gradient-to-r ${r.color} text-white font-extrabold text-xs shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2`}
                      >
                        <span className="text-base">{r.icon}</span>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card Navigation */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`flex-1 py-3.5 rounded-xl border text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  currentIdx === 0
                    ? "opacity-30 cursor-not-allowed"
                    : dark ? "bg-[#101828] border-purple-500/20 text-gray-300 hover:bg-purple-500/10" : "bg-white border-purple-200 text-slate-700 hover:bg-purple-50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous Card
              </button>

              <button
                onClick={handleNext}
                disabled={currentIdx >= activeCards.length - 1}
                className={`flex-1 py-3.5 rounded-xl text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-1.5 ${
                  currentIdx >= activeCards.length - 1
                    ? "opacity-30 cursor-not-allowed bg-gray-600"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500"
                }`}
              >
                Next Card <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl border dark:bg-[#101828]/50 border-purple-500/20 space-y-3">
            <BookOpen className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-base font-extrabold">No Cards Available in this Selection</h3>
            <p className={`text-xs ${textMuted} max-w-sm mx-auto`}>
              Complete previous chapter lessons in the main learning roadmap to populate your study deck.
            </p>
            <button
              onClick={() => handleSelectChapter('all')}
              className="px-5 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
            >
              Browse All Unlocked Cards
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
