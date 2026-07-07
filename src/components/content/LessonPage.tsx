import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { CheckCircle2, Volume2, ChevronDown, ChevronUp, ArrowLeft, Headphones, BookOpen, PenTool, Mic, MessageCircle, RepeatIcon, XCircle } from "lucide-react";
import { AudioPlayer, ProgressTracker, QuizComponent, SpeakingRecorder, WritingSubmission } from "./LearningComponents";
import { VocabularyCard, FlashcardComponent } from "./VocabularyCard";
import { GrammarCard, CalloutBox } from "./GrammarCard";

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
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
  const [selfAssessments, setSelfAssessments] = useState<Record<string, boolean>>({});
  const [drillAnswers, setDrillAnswers] = useState<Record<string, Record<number, string>>>({});
  const [drillResults, setDrillResults] = useState<Record<string, Record<number, boolean | null>>>({});

  // Grammar drill: renders ____ in body as fillable inputs
  // Format: word|answer — the answer is hidden in a comment marker
  const GrammarDrillRenderer = useCallback(({ sectionId, body }: { sectionId: string; body: string }) => {
    // Parse drill answers from the body using [answer:...] markers
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
      // Clear result when user edits
      setDrillResults(prev => {
        const r = { ...(prev[sectionId] || {}) };
        delete r[blankIdx];
        return { ...prev, [sectionId]: r };
      });
    };

    return (
      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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
                  "border-purple-300 text-gray-800"
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
  }, [drillAnswers, drillResults]);

  const sectionComponents: Record<string, React.FC<{ section: SectionData }>> = {
    warmup: ({ section }) => (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
        <h3 className="text-sm font-semibold text-amber-700 mb-2">{section.title}</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">{section.body}</p>
      </div>
    ),
    explanation: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{section.body}</div>
      </div>
    ),
    vocabulary: ({ section }) => {
      const lines = section.body.split("\n").filter(l => l.includes("|"));
      return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
          <div className="space-y-2">
            {lines.map((line, i) => {
              const parts = line.split("|").map(p => p.trim());
              if (parts.length < 2) return null;
              return (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <button onClick={() => { if (typeof window !== "undefined") { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(parts[0]); u.lang = "fr-FR"; u.rate = 0.85; window.speechSynthesis.speak(u); } }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 flex-shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <span className="text-sm font-semibold">{parts[0]}</span>
                    <span className="text-xs text-gray-500 ml-2">{parts[2] || ""}</span>
                    <p className="text-xs text-gray-400">{parts[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {section.translation && (
            <div className="mt-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className="text-xs text-purple-600 hover:text-purple-700">
                {showTranslation[section.title] ? "Hide English" : "Show English translation"}
              </button>
              {showTranslation[section.title] && <p className="text-xs text-gray-500 mt-1 italic">{section.translation}</p>}
            </div>
          )}
        </div>
      );
    },
    grammar: ({ section }) => {
      const hasDrills = section.body.includes("____[answer:");
      return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
          {hasDrills ? (
            <GrammarDrillRenderer sectionId={section.title} body={section.body} />
          ) : (
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{section.body}</div>
          )}
          {section.translation && (
            <div className="mt-3">
              <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
                className="text-xs text-purple-600 hover:text-purple-700">
                {showTranslation[section.title] ? "Hide English" : "Show English translation"}
              </button>
              {showTranslation[section.title] && <p className="text-xs text-gray-500 mt-1 italic">{section.translation}</p>}
            </div>
          )}
        </div>
      );
    },
    reading: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-3">{section.body}</div>
        {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen to the passage" />}
        {section.translation && (
          <div className="mt-3">
            <button onClick={() => setShowTranslation({ ...showTranslation, [section.title]: !showTranslation[section.title] })}
              className="text-xs text-purple-600 hover:text-purple-700">Show English translation</button>
            {showTranslation[section.title] && <p className="text-xs text-gray-500 mt-1 italic">{section.translation}</p>}
          </div>
        )}
      </div>
    ),
    listening: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        {section.media?.audio?.[0] && <AudioPlayer src={section.media.audio[0]} label="Listen" transcript={section.body} />}
        {!section.media?.audio?.length && <p className="text-sm text-gray-700 whitespace-pre-line">{section.body}</p>}
      </div>
    ),
    speaking: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{section.body}</p>
        <SpeakingRecorder />
      </div>
    ),
    writing: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{section.body}</p>
        <WritingSubmission />
      </div>
    ),
    practice: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">{section.body}</p>
      </div>
    ),
    review: ({ section }) => {
      // Parse self-assessment items (lines starting with ✓ or I can)
      const lines = section.body.split("\n").filter(l => l.trim());
      const items = lines.map(l => l.replace(/^[✓✅]\s*/, "").trim()).filter(l => l.length > 0);

      return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-semibold text-green-700">{section.title}</h3>
          </div>
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item, i) => {
                const key = `${section.title}_${i}`;
                return (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => setSelfAssessments(prev => ({ ...prev, [key]: !prev[key] }))}>
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selfAssessments[key]
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 group-hover:border-green-400 bg-white/60"
                    }`}>
                      {selfAssessments[key] && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${selfAssessments[key] ? "text-green-700 line-through decoration-green-400" : "text-gray-700"}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-700 whitespace-pre-line">{section.body}</p>
          )}
        </div>
      );
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        {onBack && (
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
          <SkillIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{data.title}</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Lesson {data.order}</span>
            <span>·</span>
            <span>{data.estimatedDuration} min</span>
          </div>
        </div>
      </div>

      {/* Objectives */}
      {data.objectives?.length > 0 && (
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-6">
          <p className="text-xs font-semibold text-purple-700 mb-2">What you'll learn:</p>
          <ul className="space-y-1">
            {data.objectives.map((obj, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>{obj}
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
  );
}