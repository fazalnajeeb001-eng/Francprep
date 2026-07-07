import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, BookOpen, XCircle, Volume2 } from "lucide-react";
import { AudioPlayer, ProgressTracker, SpeakingRecorder, WritingSubmission } from "./LearningComponents";

interface SectionData {
  type: string;
  title: string;
  body: string;
  translation?: string;
  media?: { audio?: string[]; images?: string[] };
}

interface LessonData {
  _id: string;
  title: string;
  chapterId: string;
  order: number;
  skill: string;
  objectives: string[];
  grammarTopics: string[];
  sections: SectionData[];
  content: string;
  estimatedDuration: number;
}

export function LessonPage({ lessonId, onBack }: { lessonId: string; onBack?: () => void }) {
  const { dark } = useTheme();
  const [completedSections, _setCompletedSections] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
  const [selfAssessments, setSelfAssessments] = useState<Record<string, boolean>>({});
  const [drillAnswers, setDrillAnswers] = useState<Record<string, Record<number, string>>>({});
  const [drillResults, setDrillResults] = useState<Record<string, Record<number, boolean | null>>>({});

  // Theme classes
  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textBody = dark ? "text-gray-300" : "text-gray-700";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const border = dark ? "border-[#1e2a4a]" : "border-gray-200";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  const { data } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => apiFetch(`/lessons/${lessonId}`).then((res) => res.json()).then((json) => json.data as LessonData),
  });

  const GrammarDrillRenderer = useCallback(({ sectionId, body }: { sectionId: string; body: string }) => {
    const parts: { text: string; isBlank: boolean; index: number }[] = [];
    const answerMap: Record<number, string> = {};
    let idx = 0;
    const regex = /____\[answer:(.*?)\]/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(body)) !== null) {
      if (match.index > lastIndex) parts.push({ text: body.slice(lastIndex, match.index), isBlank: false, index: -1 });
      parts.push({ text: "", isBlank: true, index: idx });
      answerMap[idx] = match[1];
      idx++;
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < body.length) parts.push({ text: body.slice(lastIndex), isBlank: false, index: -1 });

    const answers = drillAnswers[sectionId] || {};
    const results = drillResults[sectionId] || {};

    const checkDrill = (blankIdx: number) => {
      const newResults = { ...drillResults[sectionId] || {} };
      const userAns = (drillAnswers[sectionId] || {})[blankIdx]?.trim().toLowerCase() || "";
      const correctAns = answerMap[blankIdx]?.trim().toLowerCase() || "";
      newResults[blankIdx] = userAns === correctAns;
      setDrillResults(prev => ({ ...prev, [sectionId]: newResults }));
    };

    const updateAnswer = (blankIdx: number, val: string) => {
      setDrillAnswers(prev => ({
        ...prev,
        [sectionId]: { ...(prev[sectionId] || {}), [blankIdx]: val }
      }));
      setDrillResults(prev => {
        const r = { ...(prev[sectionId] || {}) };
        delete r[blankIdx];
        return { ...prev, [sectionId]: r };
      });
    };

    return (
      <p className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>
        {parts.map((part, i) =>
          part.isBlank ? (
            <span key={i} className="inline-flex items-center gap-1 mx-0.5">
              <input
                type="text"
                value={answers[part.index] || ""}
                onChange={(e) => updateAnswer(part.index, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkDrill(part.index)}
                className={`w-28 inline-block px-2 py-0.5 text-sm border-b-2 bg-transparent focus:outline-none text-center ${
                  results[part.index] === true ? "border-emerald-400 text-emerald-400" :
                  results[part.index] === false ? "border-red-400 text-red-400" :
                  dark ? "border-purple-500/50 text-gray-200" : "border-purple-300 text-gray-800"
                }`}
                placeholder="______"
              />
              {results[part.index] !== undefined && (
                <span className="text-xs">
                  {results[part.index] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" /> : <XCircle className="w-3.5 h-3.5 text-red-400 inline" />}
                </span>
              )}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </p>
    );
  }, [drillAnswers, drillResults, dark, textBody]);

  const sectionComponents: Record<string, React.FC<{ section: SectionData }>> = {
    warmup: ({ section }) => (
      <div className={`rounded-2xl p-5 border ${dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"}`}>
        <h3 className={`text-sm font-semibold mb-2 ${dark ? "text-amber-300" : "text-amber-700"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} whitespace-pre-line`}>{section.body}</p>
      </div>
    ),
    explanation: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>{section.body}</div>
      </div>
    ),
    vocabulary: ({ section }) => {
      const lines = section.body.split("\n").filter(l => l.includes("|"));
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          <div className="space-y-2">
            {lines.map((line, i) => {
              const parts = line.split("|").map(p => p.trim());
              if (parts.length < 2) return null;
              return (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${btnHover} transition-colors`}>
                  <button onClick={() => { if (typeof window !== "undefined") { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(parts[0]); u.lang = "fr-FR"; u.rate = 0.85; window.speechSynthesis.speak(u); } }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{parts[0]}</span>
                    <span className={`text-xs ${textMuted} ml-2`}>{parts[2] || ""}</span>
                    <p className={`text-xs ${textSec}`}>{parts[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {section.translation && (
            <div className="mt-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className={`text-xs ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                {showTranslation[section.title] ? "Hide English" : "Show English translation"}
              </button>
              {showTranslation[section.title] && <p className={`text-xs ${textMuted} mt-1 italic`}>{section.translation}</p>}
            </div>
          )}
        </div>
      );
    },
    grammar: ({ section }) => {
      const hasDrills = section.body.includes("____[answer:");
      return (
        <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
          <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
          {hasDrills ? (
            <GrammarDrillRenderer sectionId={section.title} body={section.body} />
          ) : (
            <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>{section.body}</div>
          )}
          {section.translation && (
            <div className="mt-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className={`text-xs ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                {showTranslation[section.title] ? "Hide English" : "Show English translation"}
              </button>
              {showTranslation[section.title] && <p className={`text-xs ${textMuted} mt-1 italic`}>{section.translation}</p>}
            </div>
          )}
        </div>
      );
    },
    reading: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <div className={`text-sm ${textBody} whitespace-pre-line leading-relaxed mb-3`}>{section.body}</div>
        {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen to the passage" />}
        {section.translation && (
          <div className="mt-3">
            <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
              className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"}`}>Show English translation</button>
            {showTranslation[section.title] && <p className={`text-xs ${textMuted} mt-1 italic`}>{section.translation}</p>}
          </div>
        )}
      </div>
    ),
    listening: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen" transcript={section.body} />}
        {!section.media?.audio?.length && <p className={`text-sm ${textBody} whitespace-pre-line`}>{section.body}</p>}
      </div>
    ),
    speaking: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm text-center ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} mb-4`}>{section.body}</p>
        <SpeakingRecorder />
      </div>
    ),
    writing: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} mb-4`}>{section.body}</p>
        <WritingSubmission />
      </div>
    ),
    practice: ({ section }) => (
      <div className={`rounded-2xl p-5 border shadow-sm ${cardBg} backdrop-blur-lg`}>
        <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
        <p className={`text-sm ${textBody} whitespace-pre-line`}>{section.body}</p>
      </div>
    ),
    review: ({ section }) => {
      const lines = section.body.split("\n").filter(l => l.trim());
      const items = lines.map(l => l.replace(/^[\u2713\u2705]\s*/, "").trim()).filter(l => l.length > 0);

      return (
        <div className={`rounded-2xl p-5 border ${dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"}`}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className={`text-sm font-semibold ${dark ? "text-emerald-300" : "text-green-700"}`}>{section.title}</h3>
          </div>
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item, i) => {
                const key = `${section.title}_${i}`;
                return (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => setSelfAssessments(prev => ({ ...prev, [key]: !prev[key] }))}>
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selfAssessments[key]
                        ? "bg-emerald-500 border-emerald-500"
                        : dark ? "border-gray-600 group-hover:border-emerald-500 bg-transparent" : "border-gray-300 group-hover:border-emerald-400 bg-white/60"
                    }`}>
                      {selfAssessments[key] && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${selfAssessments[key] ? (dark ? "text-emerald-300 line-through" : "text-green-700 line-through decoration-green-400") : (dark ? "text-gray-300" : "text-gray-700")}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} whitespace-pre-line`}>{section.body}</p>
          )}
        </div>
      );
    },
  };

  if (!data) {
    return (
      <div className={`max-w-3xl mx-auto px-4 py-8 ${pageBg}`}>
        <div className="flex items-center justify-center py-16">
          <div className={textSec}>Loading lesson...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          {onBack && (
            <button onClick={onBack} className={`p-2 rounded-lg ${btnHover} transition-colors`}>
              <ArrowLeft className={`w-5 h-5 ${textSec}`} />
            </button>
          )}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{data.title}</h1>
            <div className={`flex items-center gap-2 text-xs ${textSec}`}>
              <span>Lesson {data.order}</span>
              <span>&middot;</span>
              <span>{data.estimatedDuration} min</span>
            </div>
          </div>
        </div>

        {/* Objectives */}
        {data.objectives?.length > 0 && (
          <div className={`rounded-2xl p-4 border mb-6 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-100"}`}>
            <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-300" : "text-purple-700"}`}>What you&apos;ll learn:</p>
            <ul className="space-y-1">
              {data.objectives.map((obj, i) => (
                <li key={i} className={`text-xs ${textBody} flex items-start gap-2`}>
                  <span className={`${dark ? "text-purple-400" : "text-purple-400"} mt-0.5`}>{'\u2022'}</span>{obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {data.sections?.map((section, i) => {
            const Component = sectionComponents[section.type];
            if (!Component) return null;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Component section={section} />
              </motion.div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-8">
          <ProgressTracker completed={completedSections.length} total={data.sections?.length || 0} label="Lesson Progress" />
        </div>
      </div>
    </div>
  );
}