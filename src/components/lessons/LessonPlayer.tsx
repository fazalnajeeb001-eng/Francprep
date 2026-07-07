import { useState, useCallback, useRef, useEffect } from "react";
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
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
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

function VocabSection({ section, dark }: { section: LessonSection; dark: boolean }) {
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
              <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{v.english}</p>
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
              <GrammarDrill key={i} drill={d} dark={dark} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GrammarDrill({ drill, dark, index }: { drill: { prompt: string; answer: string }; dark: boolean; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  return (
    <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-3 border`}>
      <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{drill.prompt}</p>
      <div className="flex gap-2">
        <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
          className={`flex-1 text-sm rounded-lg px-3 py-1.5 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} border focus:outline-none focus:ring-1 focus:ring-purple-500`}
          placeholder="Type your answer..." />
        <button onClick={() => { setRevealed(true); }} disabled={!userAnswer.trim()}
          className="px-3 py-1.5 text-xs bg-purple-500 text-white rounded-lg hover:opacity-80 disabled:opacity-30 transition-all">Check</button>
      </div>
      {revealed && (
        <p className={`text-xs mt-2 ${userAnswer.trim().toLowerCase() === drill.answer.toLowerCase() ? "text-emerald-400" : "text-red-400"}`}>
          {userAnswer.trim().toLowerCase() === drill.answer.toLowerCase() ? "✅ Correct!" : `❌ Answer: ${drill.answer}`}
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
  const tfs = section.listeningTrueFalse || [];

  const playListening = () => {
    const lines = (section.listeningTranscript || "").replace(/\*\*/g, "").split("\n").filter(Boolean);
    const fullText = lines.join(". ");
    speak(fullText);
  };

  const tfCorrect = (idx: number) => {
    if (tfAnswers[idx] === undefined) return "";
    return tfAnswers[idx] === tfs[idx].answer ? "✅" : "❌";
  };

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-4">
        <Headphones className="w-5 h-5 text-purple-400" />
        <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3>
      </div>
      <div className="flex gap-3 mb-4">
        <button onClick={playListening}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <Volume2 className="w-4 h-4" /> Play Audio
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
      <div className="space-y-2">
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
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const shuffledLeft = [...pairs];
  const shuffledRight = [...pairs].sort(() => Math.random() - 0.5);

  return (
    <div className="mb-4">
      <p className={`text-xs font-semibold mb-2 ${dark ? "text-purple-400" : "text-purple-700"}`}>2. Matching</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          {shuffledLeft.map((p, i) => (
            <div key={`l-${i}`} className={`text-xs px-3 py-2 rounded-lg ${dark ? "bg-[#070B17] text-gray-300" : "bg-gray-50 text-gray-700"} border ${dark ? "border-[#1e2a4a]" : "border-gray-200"}`}>
              {p.left}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {shuffledRight.map((p, i) => (
            <div key={`r-${i}`} className={`text-xs px-3 py-2 rounded-lg ${dark ? "bg-[#070B17] text-gray-300" : "bg-gray-50 text-gray-700"} border ${dark ? "border-[#1e2a4a]" : "border-gray-200"}`}>
              {p.right}
            </div>
          ))}
        </div>
      </div>
      <p className={`text-[10px] mt-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>Match items in your mind, then check the key below.</p>
      <button onClick={() => setShowResults(!showResults)}
        className="text-xs text-purple-400 hover:text-purple-300 mt-1 font-semibold">
        {showResults ? "Hide" : "Show"} Answer Key
      </button>
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
            <p className={`text-xs mt-1 ${(answers[i] || "").toLowerCase().trim() === f.answer.toLowerCase().trim() ? "text-emerald-400" : "text-red-400"}`}>
              {(answers[i] || "").toLowerCase().trim() === f.answer.toLowerCase().trim() ? "✅ Correct!" : `❌ Answer: ${f.answer}`}
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
  const correct = [...Array(items.length).keys()];

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
        <p className={`text-xs mt-1 ${order.join(",") === correct.join(",") ? "text-emerald-400" : "text-red-400"}`}>
          {order.join(",") === correct.join(",") ? "✅ Correct order!" : "❌ Try again — think about the logical sequence of a greeting."}
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
  const nextLesson = lessonNumber + 1;
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center gap-3 mb-3"><Star className="w-5 h-5 text-amber-400" /><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{section.title}</h3></div>
      <p className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>{section.content}</p>
      <Link to={`/lesson/${nextLesson}`} className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
        <BookOpen className="w-4 h-4" /> Next Lesson
      </Link>
    </div>
  );
}

function SelfCheckSection({ section, dark, lessonNumber }: { section: LessonSection; dark: boolean; lessonNumber: number }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const sc = section.selfCheck || [];
  const allChecked = sc.length > 0 && sc.every((_, i) => checked[i]);

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
  const topRef = useRef<HTMLDivElement>(null);

  const sections = lesson.sections;
  const progress = sections.length > 0 ? Math.round((currentSection / sections.length) * 100) : 0;
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
      case "vocabulary": return <VocabSection section={sec} dark={dark} />;
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
              <Link to="/coaching" className={`text-xs ${dark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors`}>
                <ArrowLeft className="w-4 h-4 inline mr-1" />Chapter 1
              </Link>
            </div>
            <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{currentSection + 1} / {sections.length}</span>
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
            <Link to={lesson.lessonNumber >= 4 ? "/coaching" : `/lesson/${lesson.lessonNumber + 1}`} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">
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
