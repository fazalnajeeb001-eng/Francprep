import { useState, useCallback, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft, ChevronRight, Volume2, CheckCircle2, XCircle, HelpCircle,
  Star, ArrowLeft, Moon, Sun, BookOpen, MessageCircle, Headphones,
  PenTool, Mic, Repeat, Award
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import type { LessonData, LessonSection, VocabWord } from "~/lib/lessons/a1-greetings";

// ─── Speak helper ─────────────────────────────────────────────────────────
function speak(text: string, lang = "fr-FR") {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    // Prefer female French voice if available
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

function useSpeak() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const checkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const speakWithState = useCallback((text: string, lang = "fr-FR") => {
    speak(text, lang);
    setIsSpeaking(true);
    if (checkInterval.current) clearInterval(checkInterval.current);
    checkInterval.current = setInterval(() => {
      if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
        setIsSpeaking(false);
        if (checkInterval.current) {
          clearInterval(checkInterval.current);
          checkInterval.current = null;
        }
      }
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, []);

  return { speak: speakWithState, isSpeaking };
}

// ─── Translation Toggle ─────────────────────────────────────────────────
function TranslationToggle({ enabled, onToggle, dark }: { enabled: boolean; onToggle: () => void; dark: boolean }) {
  return (
    <button onClick={onToggle}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
        enabled
          ? "bg-purple-500/20 border-purple-500/40 text-purple-400 shadow-sm shadow-purple-500/20"
          : dark
          ? "border-[#1e2a4a] text-gray-500 hover:text-gray-300"
          : "border-gray-200 text-gray-400 hover:text-gray-600"
      }`}
      aria-label={enabled ? "Hide translations" : "Show translations"}
    >
      <span className={enabled ? "opacity-100" : "opacity-50"}>🇫🇷</span>
      <span className={`relative w-7 h-3.5 rounded-full transition-colors ${enabled ? "bg-purple-500" : dark ? "bg-[#1e2a4a]" : "bg-gray-300"}`}>
        <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${enabled ? "left-[calc(100%-10px)]" : "left-0.5"}`} />
      </span>
      <span className={enabled ? "opacity-100" : "opacity-50"}>🇬🇧</span>
    </button>
  );
}

// ─── Section components ───────────────────────────────────────────────────

function WarmUp({ section, dark }: { section: LessonSection; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-indigo-500/5 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"} rounded-2xl p-5 border`}>
      <div className="flex items-center gap-2 mb-3"><HelpCircle className="w-5 h-5 text-indigo-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <p className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>{section.content}</p>
    </div>
  );
}

function Explanation({ section, dark }: { section: LessonSection; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      <div className={`text-sm leading-relaxed whitespace-pre-line ${dark ? "text-gray-300" : "text-gray-700"}`}>
        {section.content?.split("\n").map((line, i) => (
          line.startsWith("•") ? <li key={i} className="ml-4 list-disc">{line.slice(2)}</li> :
          line.trim() ? <p key={i} className="mb-2">{line}</p> : null
        ))}
      </div>
    </div>
  );
}

function VocabSection({ section, dark, showTranslation }: { section: LessonSection; dark: boolean; showTranslation?: boolean }) {
  const voc = section.vocabulary || [];
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      <div className="space-y-2">
        {voc.map((v, i) => (
          <motion.div key={v.french} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-50"} transition-colors`}>
            <button onClick={() => speak(v.french)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0"
              aria-label={`Hear ${v.french}`}>
              <Volume2 className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{v.french}</span>
              <span className={`text-[10px] ml-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>{v.pronunciation}</span>
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: showTranslation ? 1 : 0, height: showTranslation ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"} overflow-hidden`}
              >
                {v.english}
              </motion.p>
            </div>
            <button onClick={() => speak(v.example)}
              className={`text-[10px] px-2 py-1 rounded-lg border flex-shrink-0 ${dark ? "border-[#1e2a4a] text-gray-400 hover:text-purple-400" : "border-gray-200 text-gray-500 hover:text-purple-600"} transition-colors`}
              title="Hear example sentence">
              ▶ Example
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GrammarSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  const [drillResults, setDrillResults] = useState<boolean[]>([]);
  const allChecked = drillResults.length === (section.grammarDrills?.length || 0) && drillResults.length > 0;
  const correctCount = drillResults.filter(Boolean).length;

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      <div className={`text-sm leading-relaxed whitespace-pre-line ${dark ? "text-gray-300" : "text-gray-700"} mb-4`}>{section.grammarNotes}</div>
      {section.grammarExamples && (
        <div className={`${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-4 border mb-4`}>
          <p className={`text-xs font-semibold mb-2 ${dark ? "text-emerald-400" : "text-emerald-700"}`}>✅ Examples</p>
          {section.grammarExamples.map((ex, i) => (
            <p key={i} className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} mb-1`}>• {ex}</p>
          ))}
        </div>
      )}
      {section.grammarMistakes && (
        <div className={`${dark ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-200"} rounded-xl p-4 border mb-4`}>
          <p className={`text-xs font-semibold mb-2 ${dark ? "text-red-400" : "text-red-700"}`}>❌ Common Mistakes</p>
          {section.grammarMistakes.map((m, i) => (
            <p key={i} className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"} mb-1`}>
              <span className="line-through text-red-400">{m.wrong}</span> → <span className="text-emerald-400">{m.correct}</span>
            </p>
          ))}
        </div>
      )}
      {section.grammarDrills && (
        <div>
          <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>✏️ Mini Drills</p>
          <div className="space-y-2">
            {section.grammarDrills.map((d, i) => (
              <GrammarDrill key={i} drill={d} dark={dark} index={i} onResult={(correct) => {
                setDrillResults(prev => {
                  const n = [...prev];
                  n[i] = correct;
                  return n;
                });
              }} />
            ))}
          </div>
          {allChecked && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`mt-3 p-3 rounded-xl text-center text-sm font-semibold ${
                correctCount === drillResults.length
                  ? `${dark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border-emerald-300"} border`
                  : correctCount >= drillResults.length / 2
                  ? `${dark ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-amber-50 text-amber-700 border-amber-300"} border`
                  : `${dark ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-red-50 text-red-700 border-red-300"} border`
              }`}>
              You got {correctCount}/{drillResults.length} correct!
              {correctCount === drillResults.length ? " 🎉" : correctCount >= drillResults.length / 2 ? " 👍" : " 💪"}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

const GrammarDrill = memo(function GrammarDrill({ drill, dark, index, onResult }: { drill: { prompt: string; answer: string }; dark: boolean; index: number; onResult?: (correct: boolean) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const isTemplate = drill.answer.includes("[your name]");
  const prefix = isTemplate ? drill.answer.replace(/\s*\[your name\].*/, "").toLowerCase().trim() : "";

  function normalize(s: string) {
    return s.replace(/\s+([?.!,])/g, "$1").toLowerCase().trim();
  }

  function isCorrect(input: string, expected: string): boolean {
    const n = normalize(input);
    const e = normalize(expected);
    if (isTemplate) {
      return n.length > 0 && n.startsWith(prefix) && n.length > prefix.length;
    }
    return n === e;
  }

  const handleCheck = () => {
    const correct = isCorrect(userAnswer, drill.answer);
    setRevealed(true);
    onResult?.(correct);
  };

  return (
    <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
      <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{drill.prompt}</p>
      <div className="flex gap-2">
        <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
          className={`flex-1 text-sm rounded-lg px-3 py-1.5 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} border focus:outline-none focus:ring-1 focus:ring-purple-500`}
          placeholder="Type your answer..." />
        <button onClick={handleCheck} disabled={!userAnswer.trim()}
          className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-lg hover:opacity-80 disabled:opacity-30 transition-all">Check</button>
      </div>
      {revealed && (
        <p className={`text-xs mt-2 ${isCorrect(userAnswer, drill.answer) ? "text-emerald-400" : "text-red-400"}`}>
          {isCorrect(userAnswer, drill.answer) ? "✅ Correct!" : `❌ Answer: ${drill.answer}`}
        </p>
      )}
    </div>
  );
}

function ReadingSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const qs = section.comprehensionQuestions || [];

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>
        {section.readingText}
      </div>
      <div className="space-y-3">
        <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>📝 Comprehension Questions</p>
        {qs.map((q, i) => (
          <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
            <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{q.question}</p>
            <textarea value={answers[i] || ""} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
              className={`w-full text-sm rounded-lg px-3 py-2 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} border focus:outline-none focus:ring-1 focus:ring-purple-500`}
              rows={2} placeholder="Write your answer..." />
            {revealed[i] && (
              <p className="text-xs text-emerald-400 mt-1">✅ {q.answer}</p>
            )}
            {!revealed[i] && (
              <button onClick={() => setRevealed({ ...revealed, [i]: true })}
                className="text-xs text-purple-400 hover:text-purple-300 mt-1 font-semibold">Reveal Answer →</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListeningSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [tfRevealed, setTfRevealed] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [fbAnswers, setFbAnswers] = useState<Record<number, string>>({});
  const [fbChecked, setFbChecked] = useState<Record<number, boolean>>({});
  const { speak: speakWithState, isSpeaking } = useSpeak();
  const tfs = section.listeningTrueFalse || [];
  const mcqs = section.listeningMCQ || [];
  const fbs = section.listeningFillBlank || [];

  const playListening = () => {
    const lines = (section.listeningTranscript || "").replace(/\*\*/g, "").split("\n").filter(Boolean);
    const fullText = lines.join(". ");
    speakWithState(fullText);
  };

  const tfCorrect = (idx: number) => {
    if (tfAnswers[idx] === undefined) return "";
    return tfAnswers[idx] === tfs[idx].answer ? "✅" : "❌";
  };

  function normalize(s: string) {
    return s.replace(/\s+([?.!,])/g, "$1").toLowerCase().trim();
  }

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-4">
        <Headphones className="w-5 h-5 text-purple-400" />
        <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      </div>
      <div className="flex gap-3 mb-4">
        <button onClick={playListening}
          className={`flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 ${isSpeaking ? "opacity-80 animate-pulse" : ""}`}>
          <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-bounce" : ""}`} /> {isSpeaking ? "Playing..." : "Play Audio"}
        </button>
        <button onClick={() => setShowTranscript(!showTranscript)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
          {showTranscript ? "Hide" : "Show"} Transcript
        </button>
      </div>
      {showTranscript && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border mb-4 whitespace-pre-line text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
          {section.listeningTranscript}
        </motion.div>
      )}

      {/* Listening True/False */}
      {tfs.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>True or False</p>
          {tfs.map((tf, i) => (
            <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
              <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{tf.statement}</p>
              <div className="flex gap-2">
                <button onClick={() => setTfAnswers({ ...tfAnswers, [i]: true })}
                  className={`px-4 py-1.5 text-xs rounded-lg font-semibold transition-all ${tfAnswers[i] === true ? "bg-emerald-500 text-white" : dark ? "bg-white/5 text-gray-400" : "bg-gray-200 text-gray-600"}`}>True</button>
                <button onClick={() => setTfAnswers({ ...tfAnswers, [i]: false })}
                  className={`px-4 py-1.5 text-xs rounded-lg font-semibold transition-all ${tfAnswers[i] === false ? "bg-red-500 text-white" : dark ? "bg-white/5 text-gray-400" : "bg-gray-200 text-gray-600"}`}>False</button>
                {tfAnswers[i] !== undefined && <span className="text-sm">{tfCorrect(i)}</span>}
              </div>
              {tfAnswers[i] !== undefined && tfAnswers[i] !== tfs[i].answer && (
                <p className="text-xs text-red-400 mt-1">{tfs[i].explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Listening MCQ (Lesson 3) */}
      {mcqs.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>Multiple Choice</p>
          {mcqs.map((q, i) => (
            <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
              <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{q.question}</p>
              <div className="space-y-1">
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => setMcqAnswers({ ...mcqAnswers, [i]: oi })}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${mcqAnswers[i] === oi ? (oi === q.correctIndex ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-red-500/20 text-red-400 border-red-500") : dark ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} border border-transparent`}>
                    {opt}
                  </button>
                ))}
              </div>
              {mcqAnswers[i] !== undefined && mcqAnswers[i] !== null && (
                <p className={`text-xs mt-1 ${mcqAnswers[i] === q.correctIndex ? "text-emerald-400" : "text-red-400"}`}>
                  {mcqAnswers[i] === q.correctIndex ? "✅ Correct!" : "❌ Incorrect."}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Listening Fill-in-the-Blank (Lesson 4) */}
      {fbs.length > 0 && (
        <div className="space-y-2">
          <p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-700"}`}>Fill in the Blank</p>
          {fbs.map((fb, i) => (
            <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
              <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{fb.text}</p>
              <div className="flex gap-2">
                <input value={fbAnswers[i] || ""} onChange={(e) => setFbAnswers({ ...fbAnswers, [i]: e.target.value })}
                  className={`flex-1 text-sm rounded-lg px-3 py-1.5 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} border focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  placeholder="Type your answer..." />
                <button onClick={() => setFbChecked({ ...fbChecked, [i]: true })}
                  className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-lg hover:opacity-80 transition-all">Check</button>
              </div>
              {fbChecked[i] && (
                <p className={`text-xs mt-1 ${normalize(fbAnswers[i] || "") === normalize(fb.answer) ? "text-emerald-400" : "text-red-400"}`}>
                  {normalize(fbAnswers[i] || "") === normalize(fb.answer) ? "✅ Correct!" : `❌ Answer: ${fb.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SpeakingSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  const roleplay = section.speakingRoleplay || [];
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-3"><Mic className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} mb-4`}>{section.speakingPrompt}</p>
      {roleplay.map((rp, i) => (
        <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border mb-2`}>
          <p className="text-sm"><span className="text-purple-400 font-semibold">Person A:</span> <span className={dark ? "text-gray-300" : "text-gray-700"}>{rp.personA}</span></p>
          <p className="text-sm mt-1"><span className="text-pink-400 font-semibold">Person B:</span> <span className={dark ? "text-gray-300" : "text-gray-700"}>{rp.personB}</span></p>
        </div>
      ))}
      {section.pronunciationTip && (
        <div className={`${dark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"} rounded-xl p-3 border mt-3`}>
          <p className="text-xs text-amber-400 font-semibold mb-1">💡 Pronunciation Tip</p>
          <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>{section.pronunciationTip}</p>
        </div>
      )}
    </div>
  );
}

function WritingSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  const checklist = section.writingChecklist || [];
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-3"><PenTool className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} mb-3`}>{section.writingTask}</p>
      {section.writingModel && (
        <div className={`${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border mb-3`}>
          <p className={`text-xs font-semibold ${dark ? "text-emerald-400" : "text-emerald-700"} mb-1`}>📝 Model Answer</p>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{section.writingModel}</p>
        </div>
      )}
      <div className="space-y-1">
        <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-700"}`}>✅ Checklist</p>
        {checklist.map((item, i) => (
          <label key={i} className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" className="accent-purple-500" />
            <span className={dark ? "text-gray-400" : "text-gray-600"}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PracticeSection({ section, dark }: { section: LessonSection; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-4"><Repeat className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      {section.mcq && section.mcq.length > 0 && <MCQExercise mcq={section.mcq} dark={dark} />}
      {section.matching && section.matching.length > 0 && <MatchingExercise pairs={section.matching} dark={dark} />}
      {section.fillBlank && section.fillBlank.length > 0 && <FillBlankExercise fills={section.fillBlank} dark={dark} />}
      {section.ordering && section.ordering.length > 0 && <OrderingExercise items={section.ordering} dark={dark} />}
      {section.shortAnswer && section.shortAnswer.length > 0 && <ShortAnswerExercise qas={section.shortAnswer} dark={dark} />}
    </div>
  );
}

function MCQExercise({ mcq, dark }: { mcq: { question: string; options: string[]; correctIndex: number; explanation?: string }[]; dark: boolean }) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  return (
    <div className="mb-4">
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>1. Multiple Choice</p>
      {mcq.map((q, i) => (
        <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border mb-2`}>
          <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{q.question}</p>
          <div className="space-y-1">
            {q.options.map((opt, oi) => (
              <button key={oi} onClick={() => setAnswers({ ...answers, [i]: oi })}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${answers[i] === oi ? (oi === q.correctIndex ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-red-500/20 text-red-400 border-red-500") : dark ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} border border-transparent`}>
                {opt}
              </button>
            ))}
          </div>
          {answers[i] !== null && answers[i] !== undefined && q.explanation && (
            <p className={`text-xs mt-2 ${answers[i] === q.correctIndex ? "text-emerald-400" : "text-red-400"}`}>
              {q.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function MatchingExercise({ pairs, dark }: { pairs: { left: string; right: string }[]; dark: boolean }) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [leftShuffled] = useState(() => [...pairs].sort(() => Math.random() - 0.5));
  const [rightShuffled] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  const matchedLeftIndices = new Set(Object.keys(matches).map(Number));
  const matchedRightIndices = new Set(Object.values(matches));

  const handleLeftClick = (leftIdx: number) => {
    if (matchedLeftIndices.has(leftIdx)) return;
    setSelectedLeft(selectedLeft === leftIdx ? null : leftIdx);
  };

  const handleRightClick = (rightIdx: number) => {
    if (matchedRightIndices.has(rightIdx)) return;
    if (selectedLeft === null) return;
    // Pair the selected left with this right item
    setMatches(prev => ({ ...prev, [selectedLeft]: rightIdx }));
    setSelectedLeft(null);
  };

  // Remove a match by clicking a paired left item
  const handleMatchedLeftClick = (leftIdx: number) => {
    setMatches(prev => {
      const n = { ...prev };
      delete n[leftIdx];
      return n;
    });
  };

  const allMatched = Object.keys(matches).length === pairs.length;
  const correctCount = pairs.filter((_, i) => matches[i] !== undefined && rightShuffled[matches[i]].left === pairs[i].left && rightShuffled[matches[i]].right === pairs[i].right).length;

  return (
    <div className="mb-4">
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>2. Matching</p>
      <p className={`text-[10px] mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>Click a left item, then click its match on the right.</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          {leftShuffled.map((p, i) => {
            const isSelected = selectedLeft === i;
            const isMatched = matchedLeftIndices.has(i);
            const matchedRightIdx = matches[i];
            const isCorrectPair = isMatched && rightShuffled[matchedRightIdx]?.left === pairs[i].left;
            return (
              <button key={`l-${i}`} onClick={() => isMatched ? handleMatchedLeftClick(i) : handleLeftClick(i)}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                  isMatched
                    ? isCorrectPair
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                      : "bg-red-500/20 text-red-400 border-red-500"
                    : isSelected
                    ? "bg-purple-500/20 text-purple-400 border-purple-500 ring-1 ring-purple-500"
                    : dark
                    ? "bg-[#070B17] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400"
                }`}>
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="space-y-1">
          {rightShuffled.map((p, i) => {
            const isMatched = matchedRightIndices.has(i);
            const matchedLeftIdx = Object.entries(matches).find(([_, v]) => v === i)?.[0];
            const isCorrectPair = matchedLeftIdx !== undefined && p.left === pairs[Number(matchedLeftIdx)].left;
            return (
              <button key={`r-${i}`} onClick={() => handleRightClick(i)}
                disabled={isMatched}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                  isMatched
                    ? isCorrectPair
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                      : "bg-red-500/20 text-red-400 border-red-500"
                    : dark
                    ? "bg-[#070B17] text-gray-300 border-[#1e2a4a] hover:border-purple-500/40 disabled:opacity-50"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400 disabled:opacity-50"
                }`}>
                {p.right}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {allMatched && (
          <span className={`text-xs font-semibold ${correctCount === pairs.length ? "text-emerald-400" : "text-amber-400"}`}>
            {correctCount === pairs.length ? "��� All correct!" : `${correctCount}/${pairs.length} correct`}
          </span>
        )}
        <button onClick={() => setShowResults(!showResults)}
          className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
          {showResults ? "Hide" : "Show"} Answer Key
        </button>
        {Object.keys(matches).length > 0 && (
          <button onClick={() => { setMatches({}); setSelectedLeft(null); }}
            className="text-xs text-gray-400 hover:text-gray-300 font-semibold">
            Reset
          </button>
        )}
      </div>
      {showResults && (
        <div className={`${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border mt-2`}>
          {pairs.map((p, i) => (
            <p key={i} className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>{p.left} ↔ {p.right}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function FillBlankExercise({ fills, dark }: { fills: { text: string; answer: string }[]; dark: boolean }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function normalize(s: string) {
    return s.replace(/\s+([?.!,])/g, "$1").toLowerCase().trim();
  }
  return (
    <div className="mb-4">
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>3. Fill in the Blank</p>
      {fills.map((f, i) => (
        <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border mb-2`}>
          <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{f.text}</p>
          <div className="flex gap-2">
            <input value={answers[i] || ""} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
              className={`flex-1 text-sm rounded-lg px-3 py-1.5 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} border focus:outline-none focus:ring-1 focus:ring-purple-500`}
              placeholder="Type here..." />
            <button onClick={() => setChecked({ ...checked, [i]: true })}
              className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-lg hover:opacity-80 transition-all">Check</button>
          </div>
          {checked[i] && (
            <p className={`text-xs mt-1 ${normalize(answers[i] || "") === normalize(f.answer) ? "text-emerald-400" : "text-red-400"}`}>
              {normalize(answers[i] || "") === normalize(f.answer) ? "✅ Correct!" : `❌ Answer: ${f.answer}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function OrderingExercise({ items, dark }: { items: { text: string }[]; dark: boolean }) {
  const [order, setOrder] = useState<number[]>([...Array(items.length).keys()].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  // Items are stored in their correct sequence in the data, so sequential indices = correct order
  const correct = [...Array(items.length).keys()];
  const isCorrect = order.join(",") === correct.join(",");

  return (
    <div className="mb-4">
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>4. Put in Correct Order</p>
      <div className="space-y-1">
        {order.map((idx, pos) => (
          <div key={pos} className={`flex items-center gap-2 ${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-2 border`}>
            <span className="text-xs text-gray-500 w-5">{pos + 1}.</span>
            <span className={`text-sm flex-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>{items[idx].text}</span>
            <div className="flex gap-1">
              <button onClick={() => { if (pos > 0) { const n = [...order]; [n[pos], n[pos-1]] = [n[pos-1], n[pos]]; setOrder(n); setChecked(false); }}}
                className="text-xs px-2 py-0.5 rounded dark:text-gray-400 hover:text-white">↑</button>
              <button onClick={() => { if (pos < order.length - 1) { const n = [...order]; [n[pos], n[pos+1]] = [n[pos+1], n[pos]]; setOrder(n); setChecked(false); }}}
                className="text-xs px-2 py-0.5 rounded dark:text-gray-400 hover:text-white">↓</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setChecked(true)}
        className="text-xs text-purple-400 hover:text-purple-300 mt-2 font-semibold">Check Order</button>
      {checked && (
        <p className={`text-xs mt-1 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
          {isCorrect ? "✅ Correct order!" : `❌ Incorrect — try reordering the items.`}
        </p>
      )}
    </div>
  );
}

function ShortAnswerExercise({ qas, dark }: { qas: { question: string; modelAnswer: string }[]; dark: boolean }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <div>
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>5. Short Answer</p>
      {qas.map((qa, i) => (
        <div key={i} className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border mb-2`}>
          <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{qa.question}</p>
          {!revealed[i] ? (
            <button onClick={() => setRevealed({ ...revealed, [i]: true })}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold">Show Model Answer →</button>
          ) : (
            <div className={`${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border`}>
              <p className="text-xs text-emerald-400 font-semibold mb-1">💡 Model Answer</p>
              <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-700"}`}>{qa.modelAnswer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ReviewSection({ section, dark, lessonNumber }: { section: LessonSection; dark: boolean; lessonNumber: number }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-3"><Star className="w-5 h-5 text-amber-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <p className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>{section.content}</p>
      <Link to={lessonNumber >= 4 ? "/learn" : `/lesson/${lessonNumber + 1}`} className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
        <BookOpen className="w-4 h-4" /> Next Lesson
      </Link>
    </div>
  );
}

function SelfCheckSection({ section, dark, lessonNumber }: { section: LessonSection; dark: boolean; lessonNumber: number }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const sc = section.selfCheck || [];
  const allChecked = sc.length > 0 && sc.every((_, i) => checked[i]);

  // When lesson 4 (last of ch1) is completed, save the flag
  useEffect(() => {
    if (allChecked && lessonNumber >= 4) {
      localStorage.setItem("fp_ch1_complete", "true");
    }
  }, [allChecked, lessonNumber]);

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-3"><Award className="w-5 h-5 text-purple-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <div className="space-y-2">
        {sc.map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
              className="w-4 h-4 accent-purple-500 rounded" />
            <span className={`text-sm ${checked[i] ? "line-through text-emerald-400" : dark ? "text-gray-300" : "text-gray-700"}`}>{item}</span>
          </label>
        ))}
      </div>
      {allChecked && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center">
          <p className="text-lg mb-2">🎉</p>
          <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Chapter Complete!</p>
          {/* XP Popup */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg shadow-amber-500/30"
          >
            <Star className="w-5 h-5 fill-white" />
            <span className="text-lg">+50 XP</span>
          </motion.div>
          {/* Confetti particles */}
          <div className="relative h-20 overflow-hidden mt-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * -80 - 20,
                  opacity: [1, 0.8, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1 + Math.random() * 0.5, delay: 0.5 + Math.random() * 0.3 }}
                className="absolute left-1/2 bottom-0 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"][i % 6],
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main LessonPlayer ────────────────────────────────────────────────────

const sectionIcons: Record<string, React.ReactNode> = {
  warmup: <HelpCircle className="w-4 h-4" />,
  explanation: <BookOpen className="w-4 h-4" />,
  vocabulary: <Volume2 className="w-4 h-4" />,
  grammar: <PenTool className="w-4 h-4" />,
  reading: <BookOpen className="w-4 h-4" />,
  listening: <Headphones className="w-4 h-4" />,
  speaking: <Mic className="w-4 h-4" />,
  writing: <PenTool className="w-4 h-4" />,
  practice: <Repeat className="w-4 h-4" />,
  review: <Star className="w-4 h-4" />,
  selfcheck: <Award className="w-4 h-4" />,
};

export function LessonPlayer({ lesson }: { lesson: LessonData }) {
  const { dark } = useTheme();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const sections = lesson.sections;
  const progress = sections.length > 0 ? Math.round(((currentSection + 1) / sections.length) * 100) : 0;
  const isLast = currentSection >= sections.length - 1;

  const goNext = useCallback(() => {
    setCompletedSections(prev => new Set(prev).add(currentSection));
    if (!isLast) {
      setCurrentSection(s => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection, isLast]);

  const goPrev = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection]);

  const sec = sections[currentSection];

  const renderSection = () => {
    switch (sec.type) {
      case "warmup": return <WarmUp section={sec} dark={dark} />;
      case "explanation": return <Explanation section={sec} dark={dark} />;
      case "vocabulary": return <VocabSection section={sec} dark={dark} showTranslation={showTranslation} />;
      case "grammar": return <GrammarSection section={sec} dark={dark} />;
      case "reading": return <ReadingSection section={sec} dark={dark} />;
      case "listening": return <ListeningSection section={sec} dark={dark} />;
      case "speaking": return <SpeakingSection section={sec} dark={dark} />;
      case "writing": return <WritingSection section={sec} dark={dark} />;
      case "practice": return <PracticeSection section={sec} dark={dark} />;
      case "review": return <ReviewSection section={sec} dark={dark} lessonNumber={lesson.lessonNumber} />;
      case "selfcheck": return <SelfCheckSection section={sec} dark={dark} lessonNumber={lesson.lessonNumber} />;
      default: return null;
    }
  };

  return (
    <div ref={topRef} className="min-h-screen pb-20">
      {/* Progress bar */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border-b dark:border-[#1e2a4a] border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link to="/learn" className={`text-xs ${dark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors`}>
                <ArrowLeft className="w-4 h-4 inline mr-1" />Chapter 1
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <TranslationToggle enabled={showTranslation} onToggle={() => setShowTranslation(!showTranslation)} dark={dark} />
              <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{currentSection + 1} / {sections.length}</span>
            </div>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" />
          </div>
          <h1 className={`text-sm font-semibold mt-1.5 ${dark ? "text-white" : "text-gray-900"}`}>{sec.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderSection()}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={goPrev} disabled={currentSection === 0}
            className="flex items-center gap-1 text-sm font-semibold disabled:opacity-30 dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {sec.type === "selfcheck" ? (
            <Link to={lesson.lessonNumber >= 4 ? "/learn" : `/lesson/${lesson.lessonNumber + 1}`} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">
              {lesson.lessonNumber >= 4 ? "🎉 Complete" : "Next Lesson"} <Award className="w-4 h-4" />
            </Link>
          ) : (
            <button onClick={goNext}
              className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
