import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Sparkles, Clock, Layers, GraduationCap, Target, BookText, Pen, Headphones, MessageSquare, User } from "lucide-react";

export const Route = createFileRoute("/learn")({ component: LearnPage });

const CEFR_STYLES: Record<string, { gradient: string; badge: string }> = {
  A1: { gradient: "from-emerald-500 to-teal-500", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  A2: { gradient: "from-teal-500 to-cyan-500", badge: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
  B1: { gradient: "from-blue-500 to-indigo-500", badge: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  B2: { gradient: "from-indigo-500 to-purple-500", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
  C1: { gradient: "from-purple-500 to-pink-500", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  C2: { gradient: "from-pink-500 to-rose-500", badge: "bg-pink-500/10 text-pink-400 border-pink-500/30" },
};

const LEVEL_ICONS: Record<string, string> = {
  A1: "🌱", A2: "🌿", B1: "🌳", B2: "🔥", C1: "⭐", C2: "👑",
};

const SKILL_ICONS: Record<string, { icon: any; label: string; color: string }> = {
  R: { icon: BookText, label: "Reading", color: "text-blue-400 bg-blue-500/10" },
  W: { icon: Pen, label: "Writing", color: "text-emerald-400 bg-emerald-500/10" },
  L: { icon: Headphones, label: "Listening", color: "text-amber-400 bg-amber-500/10" },
  S: { icon: MessageSquare, label: "Speaking", color: "text-pink-400 bg-pink-500/10" },
  INT: { icon: User, label: "Integrated", color: "text-purple-400 bg-purple-500/10" },
  REV: { icon: BookOpen, label: "Review", color: "text-cyan-400 bg-cyan-500/10" },
};

function LearnPage() {
  const [view, setView] = useState<"levels" | string>("levels");
  const [chapters, setChapters] = useState<any[]>([]);
  const [chapterData, setChapterData] = useState<any>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all levels on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/chapters");
        const json = await res.json();
        if (json.success) setLevels(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  // When user selects a level, fetch chapters for that level
  const selectLevel = (level: string) => {
    const data = levels.find((l: any) => l.level === level);
    setChapters(data?.chapters || []);
    setView(level);
    setChapterData(null);
  };

  // When user selects a chapter, fetch its detail
  const selectChapter = async (chapterId: string) => {
    setView("chapter");
    setLoading(true);
    try {
      const res = await apiFetch(`/chapters/${chapterId}`);
      const json = await res.json();
      if (json.success) setChapterData(json.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const goBack = () => {
    if (view === "chapter" && chapterData) {
      // Find which level this chapter belongs to
      for (const lvl of levels) {
        if (lvl.chapters.some((c: any) => c._id === chapterData._id || String(c._id) === String(chapterData._id))) {
          // Just go back to the level we came from
          const prevLevel = view === chapterData?.level || lvl.level;
          setView(lvl.level);
          setChapters(lvl.chapters || []);
          setChapterData(null);
          return;
        }
      }
      // Fallback
      setView("levels");
      setChapterData(null);
    } else {
      setView("levels");
      setChapters([]);
    }
  };

  const backTo = () => {
    setView("levels");
    setChapters([]);
    setChapterData(null);
  };

  if (loading && view === "levels" && levels.length === 0) {
    return (
      <div className="min-h-screen bg-[#070B17] p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-28 bg-[#101828] rounded-2xl animate-pulse border border-[#1e2a4a]" />)}
        </div>
      </div>
    );
  }

  // --- CHAPTER DETAIL VIEW ---
  if (view === "chapter") {
    if (loading) return (
      <div className="min-h-screen bg-[#070B17] p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 bg-[#101828] rounded-xl w-1/3 animate-pulse" />
          <div className="h-48 bg-[#101828] rounded-2xl animate-pulse" />
          {[1,2].map(i => <div key={i} className="h-20 bg-[#101828] rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
    if (!chapterData) return null;

    const lessons = chapterData.lessons?.filter((l: any) => l) || [];
    return (
      <div className="min-h-screen bg-[#070B17]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <p className="text-xs text-gray-500 mb-1">
                <button onClick={backTo} className="hover:text-gray-300">Levels</button>
                <span className="mx-1">/</span>
                <span className="text-gray-400">{chapterData.title}</span>
              </p>
              <h1 className="text-xl font-bold text-white">{chapterData.title}</h1>
            </div>
          </div>
          <div className="bg-[#101828]/60 border border-[#1e2a4a] rounded-2xl p-5 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-gray-400"><BookOpen className="w-4 h-4" />{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}</span>
              {chapterData.estimatedTime && <span className="flex items-center gap-1.5 text-sm text-gray-400"><Clock className="w-4 h-4" />{chapterData.estimatedTime}</span>}
            </div>
            {chapterData.objectives?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#1e2a4a]">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Learning Objectives</p>
                <ul className="space-y-1">{chapterData.objectives.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-emerald-400 mt-0.5">•</span>{obj}</li>
                ))}</ul>
              </div>
            )}
          </div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Lessons</h2>
          <div className="space-y-3">
            {lessons.map((lesson: any, i: number) => {
              const sk = SKILL_ICONS[lesson.skill] || SKILL_ICONS.INT;
              const SkIcon = sk.icon;
              return (
                <motion.div key={lesson._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/lessons/${lesson._id}`}
                    className="block rounded-2xl bg-[#101828]/80 border border-[#1e2a4a] p-5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sk.color}`}><SkIcon className="w-5 h-5" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">{lesson.order}. {lesson.title}</h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${sk.color}`}>{sk.label}</span>
                          {lesson.estimatedDuration && <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{lesson.estimatedDuration} min</span>}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            {lessons.length === 0 && <p className="text-center text-gray-500 py-8">No lessons in this chapter yet</p>}
          </div>
        </div>
      </div>
    );
  }

  // --- LEVEL CHAPTERS VIEW ---
  if (view !== "levels") {
    const lvlInfo = CEFR_STYLES[view] || CEFR_STYLES.A1;
    const icon = LEVEL_ICONS[view] || "📖";
    const levelTitle = levels.find((l: any) => l.level === view)?.title || `French ${view}`;
    const levelDesc = levels.find((l: any) => l.level === view)?.description || "";

    return (
      <div className="min-h-screen bg-[#070B17]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lvlInfo.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>{view}</div>
              <div>
                <h1 className="text-xl font-bold text-white">{icon} {levelTitle}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{chapters.length} chapter{chapters.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {levelDesc && (
            <div className="bg-[#101828]/60 border border-[#1e2a4a] rounded-2xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">{levelDesc}</p>
              </div>
            </div>
          )}

          {chapters.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 font-semibold">No chapters available yet</p>
              <p className="text-sm text-gray-500 mt-1">Content for this level is being prepared. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Chapters</h2>
              {chapters.map((ch: any, i: number) => (
                <motion.div key={ch._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => selectChapter(ch._id)}
                    className="w-full text-left block rounded-2xl bg-[#101828]/80 border border-[#1e2a4a] p-5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0">{ch.order || i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">{ch.title}</h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-xs text-gray-500"><BookOpen className="w-3 h-3" />{ch.lessonCount} {ch.lessonCount === 1 ? 'lesson' : 'lessons'}</span>
                          {ch.estimatedTime && <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{ch.estimatedTime}</span>}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- LEVEL LISTING VIEW ---
  return (
    <div className="min-h-screen bg-[#070B17]">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/dashboard" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">French Proficiency Path</h1>
            <p className="text-sm text-gray-500 mt-0.5">Select your level to begin mastering French</p>
          </div>
        </div>

        <div className="space-y-4">
          {levels.map((data: any, i: number) => {
            const lvlInfo = CEFR_STYLES[data.level] || CEFR_STYLES.A1;
            const icon = LEVEL_ICONS[data.level] || "📖";
            const hasContent = data.chapters.length > 0;

            return (
              <motion.div key={data.level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                {hasContent ? (
                  <button onClick={() => selectLevel(data.level)}
                    className="w-full text-left block group relative overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${lvlInfo.gradient} rounded-l-2xl`} />
                    <div className="flex items-center gap-5 p-5 pl-7">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lvlInfo.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg`}>{data.level}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-lg">{icon}</span>
                          <h2 className="text-base font-bold text-white">{data.title}</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-1">{data.description}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${lvlInfo.badge}`}><Layers className="w-3 h-3" />{data.chapters.length} {data.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80"><Sparkles className="w-3 h-3" />Available now</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
                    </div>
                  </button>
                ) : (
                  <div className="block group relative overflow-hidden rounded-2xl border border-[#1a1f35] bg-[#0a0e1a]/60 opacity-60 cursor-default">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${lvlInfo.gradient} rounded-l-2xl`} />
                    <div className="flex items-center gap-5 p-5 pl-7">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lvlInfo.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg`}>{data.level}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-lg">{icon}</span>
                          <h2 className="text-base font-bold text-white">{data.title}</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-1">{data.description}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${lvlInfo.badge}`}><Layers className="w-3 h-3" />0 chapters</span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />Coming soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-[#101828]/50 border border-[#1e2a4a] rounded-full px-4 py-2">
            <GraduationCap className="w-3.5 h-3.5" /><span>Common European Framework of Reference for Languages (CEFR)</span>
          </div>
        </div>
      </div>
    </div>
  );
}