import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Sparkles, Clock, Layers, GraduationCap, Target, BookText, Pen, Headphones, MessageSquare, User, Lock } from "lucide-react";

import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";

const CEFR_STYLES: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
  A1: { gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500" },
  A2: { gradient: "from-teal-500 to-cyan-500", bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-500" },
  B1: { gradient: "from-blue-500 to-indigo-500", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-500" },
  B2: { gradient: "from-indigo-500 to-purple-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-500" },
  C1: { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-500" },
  C2: { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-500" },
};

const CEFR_LIGHT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  A1: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600" },
  A2: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
  B1: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  B2: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
  C1: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
  C2: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600" },
};

const SKILL_STYLES: Record<string, { icon: any; label: string; dark: string; light: string }> = {
  R: { icon: BookText, label: "Reading", dark: "text-blue-400 bg-blue-500/10", light: "text-blue-600 bg-blue-100" },
  W: { icon: Pen, label: "Writing", dark: "text-emerald-400 bg-emerald-500/10", light: "text-emerald-600 bg-emerald-100" },
  L: { icon: Headphones, label: "Listening", dark: "text-amber-400 bg-amber-500/10", light: "text-amber-600 bg-amber-100" },
  S: { icon: MessageSquare, label: "Speaking", dark: "text-pink-400 bg-pink-500/10", light: "text-pink-600 bg-pink-100" },
  INT: { icon: User, label: "Integrated", dark: "text-purple-400 bg-purple-500/10", light: "text-purple-600 bg-purple-100" },
  REV: { icon: BookOpen, label: "Review", dark: "text-cyan-400 bg-cyan-500/10", light: "text-cyan-600 bg-cyan-100" },
};

const LEVEL_ICONS: Record<string, string> = {
  A1: "🌱", A2: "🌿", B1: "🌳", B2: "🔥", C1: "⭐", C2: "👑",
};

function LearnPage() {
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
    return <Navigate to="/login" search={{ redirect: "/learn" }} replace />;
  }
  const activeBranding = getTrackBranding(getActiveLanguageCode(user));
  const passedMilestones = (user as any)?.passedMilestones || [];

  const [view, setView] = useState<"levels" | string>("levels");
  const [chapters, setChapters] = useState<any[]>([]);
  const [chapterData, setChapterData] = useState<any>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Theme-aware class helpers
  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200/90 shadow-sm shadow-slate-200/50";
  const cardHover = dark ? "hover:border-purple-500/50 hover:shadow-purple-500/5" : "hover:border-purple-300 hover:shadow-md hover:shadow-purple-100/60";
  const textSec = dark ? "text-gray-300" : "text-slate-700";
  const textMuted = dark ? "text-gray-400" : "text-slate-600";
  const border = dark ? "border-[#1e2a4a]" : "border-slate-200";
  const mutedBg = dark ? "bg-[#0a0e1a]/60" : "bg-slate-100/80";
  const mutedBorder = dark ? "border-[#1a1f35]" : "border-slate-200";
  const headerBg = dark ? "bg-[#101828]/60 border-[#1e2a4a]" : "bg-slate-100/80 border-slate-200";
  const linkHover = dark ? "hover:text-gray-300" : "hover:text-slate-900";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-slate-100";
  const tagBg = dark ? "bg-[#101828]/50 border-[#1e2a4a]" : "bg-slate-100 border-slate-200";

  const [gatingSettings, setGatingSettings] = useState<{ gatingMode: string; passingScorePercentage: number; lockedChapterIds: string[] }>({ gatingMode: "all_unlocked", passingScorePercentage: 70, lockedChapterIds: [] });
  const [userExempt, setUserExempt] = useState(false);

  useEffect(() => {
    apiFetch("/admin/settings/gating").then(r => r.json()).then(j => {
      if (j.success && j.data) setGatingSettings(j.data);
    }).catch(() => {});
    apiFetch("/auth/me").then(r => r.json()).then(j => {
      if (j.success && j.data) setUserExempt(Boolean(j.data.isExemptFromGating));
    }).catch(() => {});
  }, []);

  const isModuleLocked = (levelCode: string) => {
    if (user?.role === 'admin' || userExempt || (user as any)?.isVipFreeAccess || user?.subscriptionTier === 'premium' || user?.subscriptionTier === 'exam_prep') return false;
    if (gatingSettings.gatingMode === 'all_unlocked') return false;
    if (levelCode === 'A1') return false;

    const prevLevelMap: Record<string, string> = { A2: 'A1', B1: 'A2', B2: 'B1', C1: 'B2', C2: 'C1' };
    const requiredPrev = prevLevelMap[levelCode];
    if (requiredPrev && Array.isArray(passedMilestones) && passedMilestones.some((m: string) => typeof m === 'string' && m.toLowerCase().includes(requiredPrev.toLowerCase()))) {
      return false;
    }

    if (gatingSettings.gatingMode === 'all_locked') return true;
    if (gatingSettings.gatingMode === 'selective_locked') {
      return gatingSettings.lockedChapterIds.includes(levelCode);
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      try {
        const langCode = activeBranding.code || 'fr';
        const res = await apiFetch(`/chapters?language=${langCode}`);
        const json = await res.json();
        if (json.success) setLevels(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [activeBranding.code]);

  const selectLevel = (level: string) => {
    const data = levels.find((l: any) => l.level === level);
    setChapters(data?.chapters || []);
    setView(level);
    setChapterData(null);
  };

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
    if (view === "chapter") {
      // Find which level this chapter belongs to
      for (const lvl of levels) {
        if (lvl.chapters.some((c: any) => String(c._id) === String(chapterData?._id))) {
          setView(lvl.level);
          setChapters(lvl.chapters || []);
          setChapterData(null);
          return;
        }
      }
      setView("levels");
      setChapterData(null);
    } else {
      setView("levels");
    }
  };

  const loadingSkeleton = (count: number) => (
    <div className={`min-h-screen ${pageBg} p-8`}>
      <div className="max-w-3xl mx-auto space-y-4">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className={`h-28 ${dark ? "bg-[#101828]" : "bg-gray-200"} rounded-2xl animate-pulse border ${border}`} />
        ))}
      </div>
    </div>
  );

  if (loading && view === "levels" && levels.length === 0) return loadingSkeleton(6);

  // ─── CHAPTER DETAIL VIEW ───
  if (view === "chapter") {
    if (loading) return loadingSkeleton(4);
    if (!chapterData) return null;

    const lessons = chapterData.lessons?.filter((l: any) => l) || [];

    return (
      <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Back + Breadcrumb */}
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className={`p-2 rounded-xl ${btnHover} transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${textSec}`} />
            </button>
            <div>
              <p className={`text-xs ${textMuted} mb-1`}>
                <button onClick={() => { setView("levels"); setChapterData(null); }} className={`${linkHover} transition-colors`}>Levels</button>
                <span className="mx-1">·</span>
                <span className={textSec}>{chapterData.title}</span>
              </p>
              <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{chapterData.title}</h1>
            </div>
          </div>

          {/* Chapter Metadata */}
          <div className={`${headerBg} backdrop-blur-lg border rounded-2xl p-5 mb-8`}>
            <div className="flex flex-wrap items-center gap-4">
              <span className={`flex items-center gap-1.5 text-sm ${textSec}`}>
                <BookOpen className="w-4 h-4" />{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
              {chapterData.estimatedTime && (
                <span className={`flex items-center gap-1.5 text-sm ${textSec}`}>
                  <Clock className="w-4 h-4" />{chapterData.estimatedTime}
                </span>
              )}
            </div>
            {chapterData.objectives?.length > 0 && (
              <div className={`mt-4 pt-4 border-t ${border}`}>
                <p className={`text-xs font-semibold ${textMuted} uppercase tracking-wider mb-2`}>Learning Objectives</p>
                <ul className="space-y-1">
                  {chapterData.objectives.map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <span className="mt-0.5">•</span>
                      <span className={textSec}>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Lessons */}
          <h2 className={`text-sm font-semibold ${textMuted} uppercase tracking-wider mb-4`}>Lessons</h2>
          <div className="space-y-3">
            {lessons.map((lesson: any, i: number) => {
              const sk = SKILL_STYLES[lesson.skill] || SKILL_STYLES.INT;
              const SkIcon = sk.icon;
              const skColor = dark ? sk.dark : sk.light;
              return (
                <motion.div key={lesson._id || lesson.lessonId || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to="/lessons/$lessonId" params={{ lessonId: String(lesson._id || lesson.lessonId || lesson.id || `lesson-${i+1}`) }}
                    className={`block rounded-2xl ${cardBg} backdrop-blur-lg border p-5 ${cardHover} transition-all duration-300 group`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${skColor}`}>
                        <SkIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${dark ? "text-white group-hover:text-purple-400" : "text-gray-900 group-hover:text-purple-600"} transition-colors`}>
                          {lesson.order}. {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${skColor}`}>{sk.label}</span>
                          {lesson.estimatedDuration && (
                            <span className={`flex items-center gap-1 text-xs ${textMuted}`}>
                              <Clock className="w-3 h-3" />{lesson.estimatedDuration} min
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${textMuted} group-hover:text-purple-500 transition-colors shrink-0`} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            {lessons.length === 0 && <p className={`text-center ${textMuted} py-8`}>No lessons in this chapter yet</p>}
          </div>
        </div>
      </div>
    );
  }

  // ─── LEVEL CHAPTERS VIEW ───
  if (view !== "levels") {
    const lvlStyle = CEFR_STYLES[view] || CEFR_STYLES.A1;
    const lightStyle = CEFR_LIGHT_STYLES[view] || CEFR_LIGHT_STYLES.A1;
    const icon = LEVEL_ICONS[view] || "📖";
    const levelData = levels.find((l: any) => l.level === view);
    const levelTitle = levelData?.title || `${activeBranding.languageName} ${view}`;
    const levelDesc = levelData?.description || "";

    return (
      <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Back + Header */}
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className={`p-2 rounded-xl ${btnHover} transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${textSec}`} />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lvlStyle.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                {view}
              </div>
              <div>
                <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{icon} {levelTitle}</h1>
                <p className={`text-sm ${textMuted} mt-0.5`}>{chapters.length} chapter{chapters.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Level Description */}
          {levelDesc && (
            <div className={`${headerBg} backdrop-blur-lg border rounded-2xl p-4 mb-8`}>
              <div className="flex items-start gap-3">
                <GraduationCap className={`w-5 h-5 ${textMuted} mt-0.5 shrink-0`} />
                <p className={`text-sm ${textSec} leading-relaxed`}>{levelDesc}</p>
              </div>
            </div>
          )}

          {chapters.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className={`w-12 h-12 mx-auto ${textMuted} mb-4`} />
              <p className={`font-semibold ${dark ? "text-gray-400" : "text-gray-600"}`}>No chapters available yet</p>
              <p className={`text-sm ${textMuted} mt-1`}>Content for this level is being prepared.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className={`text-sm font-semibold ${textMuted} uppercase tracking-wider mb-4`}>Chapters</h2>
              {chapters.map((ch: any, i: number) => (
                <motion.div key={ch._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => selectChapter(ch._id)}
                    className={`w-full text-left block rounded-2xl ${cardBg} backdrop-blur-lg border p-5 ${cardHover} transition-all duration-300 group`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${dark ? "bg-purple-500/20 border-purple-500/20" : "bg-purple-100 border-purple-200"} border flex items-center justify-center ${dark ? "text-purple-400" : "text-purple-600"} font-bold text-sm shrink-0`}>
                        {ch.order || i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${dark ? "text-white group-hover:text-purple-400" : "text-gray-900 group-hover:text-purple-600"} transition-colors`}>{ch.title}</h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`flex items-center gap-1 text-xs ${textMuted}`}>
                            <BookOpen className="w-3 h-3" />{ch.lessonCount} {ch.lessonCount === 1 ? 'lesson' : 'lessons'}
                          </span>
                          {ch.estimatedTime && (
                            <span className={`flex items-center gap-1 text-xs ${textMuted}`}>
                              <Clock className="w-3 h-3" />{ch.estimatedTime}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${textMuted} group-hover:text-purple-500 transition-colors shrink-0`} />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* End of Module DELF Diagnostic Exam Gate Card */}
          <div className="mt-8 p-5 rounded-2xl border bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 border-amber-500/30 backdrop-blur-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0">
                  🏆
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-base font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
                      {(activeBranding.primaryExamName || activeBranding.languageName)} {view} Milestone Diagnostic Exam
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Module Gate
                    </span>
                  </div>
                  <p className={`text-xs ${textMuted} mt-0.5`}>
                    Complete your chapter studies, then take the {(activeBranding.primaryExamName || activeBranding.languageName)} {view} Diagnostic Exam to unlock Module {view === 'A1' ? 'A2' : view === 'A2' ? 'B1' : view === 'B1' ? 'B2' : 'C1'}.
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">
                    (Diagnostic evaluation exam formatted to mirror official {activeBranding.languageName} CEFR certification standards).
                  </p>
                </div>
              </div>

              <Link
                to={activeBranding.code === 'fr' ? "/exam/delf" : "/exam"}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all shrink-0 hover:scale-[1.02]"
              >
                <span>📜 Take {(activeBranding.primaryExamName || activeBranding.languageName)} {view} Exam</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── LEVEL LISTING VIEW ───
  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/dashboard" className={`p-2 rounded-xl ${btnHover} transition-colors`}>
            <ArrowLeft className={`w-5 h-5 ${textSec}`} />
          </Link>
          <div>
            <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{activeBranding.proficiencyPathTitle}</h1>
            <p className={`text-sm ${textMuted} mt-0.5`}>Select your level to begin mastering {activeBranding.languageName}</p>
          </div>
        </div>

        {levels.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className={`w-16 h-16 mx-auto ${textMuted} mb-4`} />
            <p className={`font-semibold text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>No levels available</p>
            <p className={`text-sm ${textMuted} mt-1`}>Content is being added — check back soon!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {levels.map((data: any, i: number) => {
              const lvlStyle = CEFR_STYLES[data.level] || CEFR_STYLES.A1;
              const lvlLight = CEFR_LIGHT_STYLES[data.level] || CEFR_LIGHT_STYLES.A1;
              const icon = LEVEL_ICONS[data.level] || "📖";
              const hasContent = data.chapters.length > 0;
              const locked = isModuleLocked(data.level);

              // Badge classes
              const badgeClasses = dark
                ? `${lvlStyle.bg} ${lvlStyle.text} ${lvlStyle.border}`
                : `${lvlLight.bg} ${lvlLight.text} ${lvlLight.border}`;

              return (
                <motion.div key={data.level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  {locked ? (
                    <div className={`w-full text-left block group relative overflow-hidden rounded-2xl border ${cardBg} border-amber-500/30 backdrop-blur-lg opacity-90 p-5 pl-7`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold shrink-0">
                            🔒
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-lg">{icon}</span>
                              <h2 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>{data.title}</h2>
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                🔒 {(activeBranding.primaryExamName || activeBranding.languageName)} Gate Locked
                              </span>
                            </div>
                            <p className="text-xs text-amber-400/90 mt-1">
                              Pass the {(activeBranding.primaryExamName || activeBranding.languageName)} Milestone Exam ({gatingSettings.passingScorePercentage}%+) to unlock Module {data.level}.
                            </p>
                          </div>
                        </div>
                        <Link to={activeBranding.code === 'fr' ? "/exam/delf" : "/exam"} className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black rounded-xl shadow flex items-center gap-1 hover:brightness-110 transition-all shrink-0">
                          📜 Take {(activeBranding.primaryExamName || activeBranding.languageName)} Exam
                        </Link>
                      </div>
                    </div>
                  ) : hasContent ? (
                    <button onClick={() => selectLevel(data.level)}
                      className={`w-full text-left block group relative overflow-hidden rounded-2xl border ${cardBg} backdrop-blur-lg ${cardHover} transition-all duration-300 cursor-pointer`}>
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${lvlStyle.gradient} rounded-l-2xl`} />
                      <div className="flex items-center gap-5 p-5 pl-7">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lvlStyle.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg`}>
                          {data.level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-lg">{icon}</span>
                            <h2 className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>{data.title}</h2>
                          </div>
                          <p className={`text-sm ${textSec} leading-relaxed line-clamp-2 mt-1`}>{data.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${badgeClasses}`}>
                              <Layers className="w-3 h-3" />{data.chapters.length} {data.chapters.length === 1 ? 'chapter' : 'chapters'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-500 dark:text-emerald-400">
                              <Sparkles className="w-3 h-3" />Available now
                            </span>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${textMuted} group-hover:text-purple-500 transition-colors shrink-0`} />
                      </div>
                    </button>
                  ) : (
                    <div className={`block relative overflow-hidden rounded-2xl border ${mutedBorder} ${mutedBg} opacity-70`}>
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${lvlStyle.gradient} rounded-l-2xl opacity-40`} />
                      <div className="flex items-center gap-5 p-5 pl-7">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lvlStyle.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg opacity-70`}>
                          {data.level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-lg">{icon}</span>
                            <h2 className={`text-base font-bold ${dark ? "text-gray-300" : "text-gray-600"}`}>{data.title}</h2>
                          </div>
                          <p className={`text-sm ${textMuted} leading-relaxed line-clamp-2 mt-1`}>{data.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${badgeClasses}`}>
                              <Layers className="w-3 h-3" />0 chapters
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                              <Clock className="w-3 h-3" />Coming soon
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className={`inline-flex items-center gap-2 text-xs ${textMuted} ${tagBg} border rounded-full px-4 py-2`}>
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Common European Framework of Reference for Languages (CEFR)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/learn")({ component: LearnPage });