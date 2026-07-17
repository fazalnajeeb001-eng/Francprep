import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, ArrowLeft, Mic, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";

export const Route = createFileRoute("/speaking")({ component: SpeakingPage });

function collectPhrases() {
  return apiFetch("/lessons?limit=100")
    .then(res => res.json())
    .then(json => {
      const lessons = json.data || [];
      const phrases: { french: string; english: string; lesson: number }[] = [];
      for (const lesson of lessons) {
        if (lesson.vocabItems) {
          for (const v of lesson.vocabItems) {
            phrases.push({ french: v.french, english: v.english, lesson: lesson.order || 1 });
          }
        }
        if (lesson.speaking?.guidedActivity) {
          const lines = lesson.speaking.guidedActivity.split("\n").filter((l: string) => l.trim());
          for (const line of lines) {
            const clean = line.replace(/^["""]|["""]$/g, "").trim();
            if (clean && clean.length > 3 && !clean.startsWith("Practice")) {
              phrases.push({ french: clean, english: "Speaking practice phrase", lesson: lesson.order || 1 });
            }
          }
        }
      }
      return phrases;
    })
    .catch(() => []);
}

// Declare SpeechRecognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function SpeakingPage() {
  const { dark } = useTheme();
  const [cardPhrases, setCardPhrases] = useState<{ french: string; english: string; lesson: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    collectPhrases().then(setCardPhrases);
  }, []);

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const btnHover = dark ? "hover:bg-white/5" : "hover:bg-gray-100";

  const currentPhrase = cardPhrases[current];
  const hasRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        v => v.lang.startsWith("fr") && (v.name.toLowerCase().includes("female") || v.name.includes("Samantha") || v.name.includes("Audrey") || v.name.includes("Amélie") || v.name.includes("Julie") || v.name.includes("Marie"))
      );
      if (femaleVoice) u.voice = femaleVoice;
      window.speechSynthesis.speak(u);
    } catch { /* ignore */ }
  };

  const startListening = useCallback(() => {
    if (!hasRecognition) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.lang = "fr-FR";
    recog.continuous = false;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    recog.onresult = (event: any) => {
      const t = event.results[0][0].transcript;
      setTranscript(t);
    };

    recog.onend = () => {
      setIsListening(false);
    };

    recog.onerror = () => {
      setIsListening(false);
    };

    recog.start();
    setRecognition(recog);
    setIsListening(true);
    setTranscript("");
    setResult(null);
  }, [hasRecognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const checkAnswer = () => {
    if (!transcript || !currentPhrase) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[?.!,;:\s]+/g, " ").trim();
    const user = normalize(transcript);
    const expected = normalize(currentPhrase.french);
    // Check if the transcript contains key words from the expected phrase
    const userWords = user.split(" ").filter(Boolean);
    const expectedWords = expected.split(" ").filter(Boolean);
    const matchCount = expectedWords.filter(w => userWords.some(uw => uw.includes(w) || w.includes(uw))).length;
    const isCorrect = matchCount >= Math.ceil(expectedWords.length * 0.6);
    setResult(isCorrect ? "correct" : "incorrect");
  };

  const nextPhrase = () => {
    if (current < cardPhrases.length - 1) {
      setCurrent(c => c + 1);
      setTranscript("");
      setResult(null);
    }
  };

  const prevPhrase = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
      setTranscript("");
      setResult(null);
    }
  };

  const shuffle = () => {
    setCardPhrases(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setTranscript("");
    setResult(null);
  };

  if (!currentPhrase) {
    return (
      <div className={`min-h-screen ${pageBg} flex items-center justify-center`}>
        <p className={textMuted}>No speaking phrases available</p>
      </div>
    );
  }

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
              <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>🎤 Speaking Practice</h1>
              <p className={`text-xs ${textMuted}`}>{cardPhrases.length} phrases</p>
            </div>
          </div>
          <button onClick={shuffle} className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Shuffle">
            <Shuffle className={`w-4 h-4 ${textSec}`} />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((current + 1) / cardPhrases.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
          <span className={`text-xs ${textMuted}`}>{current + 1}/{cardPhrases.length}</span>
        </div>

        {/* Phrase Card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl ${cardBg} backdrop-blur-lg border shadow-lg p-8 text-center`}
        >
          <p className={`text-xs font-semibold mb-4 ${textMuted}`}>Say this in French:</p>
          <h2 className={`text-2xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
            {currentPhrase.french}
          </h2>
          <p className={`text-sm mb-6 ${textSec}`}>{currentPhrase.english}</p>

          {/* Speaker button */}
          <button onClick={() => speak(currentPhrase.french)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all shadow-lg shadow-purple-500/25 mx-auto mb-8">
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Mic Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!hasRecognition}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? "bg-red-500 animate-pulse shadow-red-500/40"
                  : "bg-gradient-to-br from-emerald-500 to-teal-500 hover:opacity-90 shadow-emerald-500/25"
              } ${!hasRecognition ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Mic className={`w-8 h-8 text-white ${isListening ? "animate-bounce" : ""}`} />
            </button>
            <p className={`text-xs ${textMuted}`}>
              {!hasRecognition
                ? "Speech recognition not available in this browser"
                : isListening
                ? "Listening... Speak now"
                : "Tap to speak"}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className={`mt-6 p-4 rounded-xl border ${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"}`}>
              <p className={`text-xs font-semibold mb-1 ${textMuted}`}>You said:</p>
              <p className={`text-sm ${dark ? "text-gray-200" : "text-gray-800"}`}>"{transcript}"</p>
            </div>
          )}

          {/* Check button */}
          {transcript && !result && (
            <button onClick={checkAnswer}
              className="mt-4 px-6 py-2 bg-purple-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
              Check Pronunciation
            </button>
          )}

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`mt-4 p-4 rounded-xl border ${
                result === "correct"
                  ? dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                  : dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {result === "correct"
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  : <XCircle className="w-5 h-5 text-amber-500" />
                }
                <span className={`text-sm font-semibold ${
                  result === "correct"
                    ? dark ? "text-emerald-300" : "text-emerald-700"
                    : dark ? "text-amber-300" : "text-amber-700"
                }`}>
                  {result === "correct" ? "Great pronunciation!" : "Keep practicing!"}
                </span>
              </div>
              {result === "incorrect" && (
                <p className={`text-xs ${dark ? "text-amber-400" : "text-amber-600"}`}>
                  Expected: "{currentPhrase.french}"
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={prevPhrase} disabled={current === 0}
            className={`flex items-center gap-1 text-sm font-semibold disabled:opacity-30 ${textSec} ${btnHover} px-3 py-2 rounded-xl transition-all`}>
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button onClick={nextPhrase} disabled={current >= cardPhrases.length - 1}
            className={`flex items-center gap-1 text-sm font-semibold disabled:opacity-30 ${textSec} ${btnHover} px-3 py-2 rounded-xl transition-all`}>
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}