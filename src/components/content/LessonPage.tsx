import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { CheckCircle2, Volume2, ChevronDown, ChevronUp, ArrowLeft, Headphones, BookOpen, PenTool, Mic, MessageCircle, RepeatIcon } from "lucide-react";
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

  const { data, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const res = await apiFetch(`/lessons/${lessonId}`);
      const json = await res.json();
      return json.data as LessonData;
    },
  });

  if (isLoading) return <div className="animate-pulse p-8"><div className="h-8 w-64 bg-gray-200 rounded mb-4" /><div className="h-4 w-96 bg-gray-200 rounded mb-8" /><div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}</div></div>;
  if (!data) return <div className="p-8 text-gray-500">Lesson not found</div>;

  const skillIcons: Record<string, any> = { R: BookOpen, W: PenTool, L: Headphones, S: Mic, INT: MessageCircle, REV: RepeatIcon };
  const SkillIcon = skillIcons[data.skill] || BookOpen;

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
    grammar: ({ section }) => (
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{section.body}</div>
      </div>
    ),
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
    review: ({ section }) => (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <h3 className="text-sm font-semibold text-green-700">{section.title}</h3>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-line">{section.body}</p>
      </div>
    ),
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