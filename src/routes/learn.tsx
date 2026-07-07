import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Sparkles, Clock, Layers, GraduationCap, Target, User, BookText, Pen, Headphones, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
  validateSearch: (search: Record<string, string>) => ({
    level: (search?.level as string) || "",
    chapter: (search?.chapter as string) || "",
  }),
});

const CEFR_LEVELS_DATA = [
  { level: "A1", title: "French A1 — Beginner", icon: "🌱", gradient: "from-emerald-500 to-teal-500", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", description: "Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others, and can ask and answer simple questions about personal details." },
  { level: "A2", title: "French A2 — Elementary", icon: "🌿", gradient: "from-teal-500 to-cyan-500", badge: "bg-teal-500/10 text-teal-400 border-teal-500/30", description: "Can understand sentences and frequently used expressions related to areas of immediate relevance. Can communicate in simple and routine tasks requiring a direct exchange of information." },
  { level: "B1", title: "French B1 — Intermediate", icon: "🌳", gradient: "from-blue-500 to-indigo-500", badge: "bg-blue-500/10 text-blue-400 border-blue-500/30", description: "Can understand the main points of clear standard input on familiar matters. Can deal with most situations likely to arise while travelling in a French-speaking area." },
  { level: "B2", title: "French B2 — Upper Intermediate", icon: "🔥", gradient: "from-indigo-500 to-purple-500", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30", description: "Can understand the main ideas of complex text on both concrete and abstract topics. Can interact with a degree of fluency and spontaneity that makes regular interaction possible." },
  { level: "C1", title: "French C1 — Advanced", icon: "⭐", gradient: "from-purple-500 to-pink-500", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", description: "Can understand a wide range of demanding, longer texts and recognise implicit meaning. Can express ideas fluently and spontaneously without much obvious searching for expressions." },
  { level: "C2", title: "French C2 — Mastery", icon: "👑", gradient: "from-pink-500 to-rose-500", badge: "bg-pink-500/10 text-pink-400 border-pink-500/30", description: "Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments in a coherent presentation." },
];

const SKILL_ICONS: Record<string, { icon: any; label: string; color: string }> = {
  R: { icon: BookText, label: "Reading", color: "text-blue-400 bg-blue-500/10" },
  W: { icon: Pen, label: "Writing", color: "text-emerald-400 bg-emerald-500/10" },
  L: { icon: Headphones, label: "Listening", color: "text-amber-400 bg-amber-500/10" },
  S: { icon: MessageSquare, label: "Speaking", color: "text-pink-400 bg-pink-500/10" },
  INT: { icon: User, label: "Integrated", color: "text-purple-400 bg-purple-500/10" },
  REV: { icon: BookOpen, label: "Review", color: "text-cyan-400 bg-cyan-500/10" },
};

function LearnPage() {
  const { level, chapter } = useSearch({ from: "/learn" });
  const [levels, setLevels] = useState<any[]>([]);
  const [chapterData, setChapterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (chapter) {
          const res = await apiFetch(`/chapters/${chapter}`);
          const json = await res.json();
          if (json.success) setChapterData(json.data);
        } else {
          const res = await apiFetch("/chapters");
          const json = await res.json();
          if (json.success) setLevels(json.data);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [level, chapter]);

  if (loading) return (
    <div className="min-h-screen bg-[#070B17] p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-28 bg-[#101828] rounded-2xl animate-pulse border border-[#1e2a4a]" />)}
      </div>
    </div>
  );

  const style = (lvl: string) => CEFR_LEVELS_DATA.find(d => d.level === lvl) || CEFR_LEVELS_DATA[0];

  // --- CHAPTER DETAIL VIEW ---
  if (chapter && chapterData) {
    const lessons = chapterData.lessons?.filter((l: any) => l) || [];
    const lvlInfo = style(level);
    return (
      <div className="min-h-screen bg-[#070B17]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/learn" search={{ level, chapter: "" }} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Link to="/learn" search={{}} className="hover:text-gray-300 transition-colors">Levels</Link>
                <span>/</span>
                <Link to="/learn" search={{ level }} className="hover:text-gray-300 transition-colors">{level}</Link>
                <span>/</span>
                <span className="text-gray-400">{chapterData.title}</span>
              </div>
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
            {lessons.length === 0 && <p className="text-center text-gray-500 py-8">No lessons yet</p>}
          </div>
        </div>
      </div>
    );
  }

  // --- LEVEL VIEW (chapters for a selected level) ---
  if (level) {
    const levelData = levels.find((l: any) => l.level === level);
    const chapters = levelData?.chapters || [];
    const lvlInfo = style(level);

    if (!levelData && levels.length === 0) {
      // Loading state already handled above
    }

    return (
      <div className="min-h-screen bg-[#070B17]">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/learn" search={{}} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lvlInfo.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>{level}</div>
              <div>
                <h1 className="text-xl font-bold text-white">{lvlInfo.icon} {levelData?.title || lvlInfo.title}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{chapters.length} chapter{chapters.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {levelData?.description && (
            <div className="bg-[#101828]/60 border border-[#1e2a4a] rounded-2xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">{levelData.description}</p>
              </div>
            </div>
          )}

          {chapters.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 font-semibold">No chapters available yet</p>
              <p className="text-sm text-gray-500 mt-1">Content for this level is being prepared.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Chapters</h2>
              {chapters.map((ch: any, i: number) => (
                <motion.div key={ch._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to="/learn" search={{ level, chapter: ch._id }}
                    className="block rounded-2xl bg-[#101828]/80 border border-[#1e2a4a] p-5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
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
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- LEVEL LISTING VIEW (default) ---
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
            const lvlInfo = style(data.level);
            const hasContent = data.chapters.length > 0;
            return (
              <motion.div key={data.level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to="/learn" search={{ level: data.level, chapter: "" }}
                  className={`block group relative overflow-hidden rounded-2xl border transition-all duration-300 ${hasContent ? 'bg-[#101828]/80 border-[#1e2a4a] hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer' : 'bg-[#0a0e1a]/60 border-[#1a1f35] opacity-60 cursor-default'}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${lvlInfo.gradient} rounded-l-2xl`} />
                  <div className="flex items-center gap-5 p-5 pl-7">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lvlInfo.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg`}>{data.level}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-lg">{lvlInfo.icon}</span>
                        <h2 className="text-base font-bold text-white">{data.title}</h2>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-1">{data.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${lvlInfo.badge}`}><Layers className="w-3 h-3" />{data.chapters.length} {data.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                        {hasContent ? <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80"><Sparkles className="w-3 h-3" />Available now</span> : <span className="inline-flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />Coming soon</span>}
                      </div>
                    </div>
                    {hasContent && <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />}
                  </div>
                </Link>
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
