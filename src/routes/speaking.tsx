import { createFileRoute, Link, Navigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowLeft, Mic, MicOff, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Shuffle, MessageSquare, Send, Sparkles, ShieldCheck } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
import { speak as speakText } from "~/lib/speech";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { SmartAvatar } from "~/components/dashboard/widgets/SmartAvatar";

import { Component, type ReactNode } from "react";

class SpeakingErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) {
    console.error("[SpeakingPage] Boundary caught error:", error);
  }
  handleRetry = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B17] text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-xl font-bold mb-2 text-purple-400">🎙️ AI Speaking Coach</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-md">Mobile audio session ready. Tap below to start talking with your AI Coach.</p>
          <button onClick={this.handleRetry} className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all">
            Start Speaking Session
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface ChatMessage {
  sender: "user" | "coach";
  text: string;
  timestamp: string;
}

const TTS_LOCALE_MAP: Record<string, string> = {
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
  en: "en-US",
  pt: "pt-PT",
  ru: "ru-RU",
  zh: "zh-CN",
};

const MULTILINGUAL_GREETINGS: Record<string, Record<string, string>> = {
  fr: {
    A1: "Bonjour ! Bienvenue. Comment allez-vous aujourd'hui ? On va pratiquer le français ensemble !",
    A2: "Salut ! Ravi de vous voir. Parlez-moi un peu de votre journée ou de vos passe-temps !",
    B1: "Bonjour ! Prêt pour une vraie conversation ? Quel sujet aimeriez-vous aborder aujourd'hui ?",
    B2: "Bienvenue ! Discutons d'un sujet d'actualité ou d'une opinion personnelle. Qu'en pensez-vous ?",
    C1: "Bonjour. Abordons un débat complexe adapté au TCF Canada. Quel thème souhaitez-vous analyser ?",
    C2: "Bonjour. Entraînons-nous au niveau d'expression le plus élevé. Exposez votre thèse sur le sujet de votre choix.",
  },
  de: {
    A1: "Hallo! Willkommen. Wie geht es Ihnen heute? Lass uns zusammen Deutsch üben!",
    A2: "Hi! Schön dich zu sehen. Erzähl mir etwas über deinen Tag oder deine Hobbys!",
    B1: "Hallo! Bereit für ein echtes Gespräch? Welches Thema möchtest du heute besprechen?",
    B2: "Willkommen! Lass uns über aktuelle Themen oder persönliche Meinungen sprechen.",
    C1: "Guten Tag. Lass uns eine komplexe Debatte führen. Welches Thema möchtest du analysieren?",
    C2: "Willkommen. Üben wir auf höchstem sprachlichem Niveau. Präsentiere deine Ausführungen.",
  },
  es: {
    A1: "¡Hola! Bienvenido. ¿Cómo estás hoy? ¡Vamos a practicar español juntos!",
    A2: "¡Hola! Qué gusto verte. Cuéntame un poco sobre tu día o tus pasatiempos.",
    B1: "¡Hola! ¿Listo para una conversación real? ¿Qué tema te gustaría abordar hoy?",
    B2: "¡Bienvenido! Hablemos de un tema de actualidad o tu opinión personal.",
    C1: "Buenas tardes. Debatamos sobre un tema complejo. ¿Qué tema deseas analizar?",
    C2: "Bienvenido. Practiquemos al más alto nivel de fluidez. Presenta tus argumentos.",
  },
  it: {
    A1: "Ciao! Benvenuto. Come stai oggi? Pratichiamo l'italiano insieme!",
    A2: "Ciao! Che bello vederti. Raccontami della tua giornata o dei tuoi hobby!",
    B1: "Ciao! Pronto per una vera conversazione? Di cosa vorresti parlare oggi?",
    B2: "Benvenuto! Parliamo di attualità o della tua opinione personale.",
    C1: "Buongiorno. Affrontiamo un dibattito complesso. Quale argomento vuoi analizzare?",
    C2: "Benvenuto. Alleniamoci al massimo livello di espressione orale.",
  },
  en: {
    A1: "Hello! Welcome. How are you feeling today? Let's practice speaking together!",
    A2: "Hi! Great to see you. Tell me a bit about your day or your favorite hobbies!",
    B1: "Hello! Ready for a real conversation? What topic would you like to explore today?",
    B2: "Welcome! Let me know your thoughts on current affairs or your personal opinions.",
    C1: "Good day. Let me guide your advanced fluency with complex analytical topics.",
    C2: "Welcome. Let's practice at the highest native fluency level. Share your insights.",
  },
};

function SpeakingPage() {
  const rawSearch = (useSearch({ strict: false }) || {}) as { mode?: string; level?: string };
  const mode = rawSearch.mode || "drill";
  const level = rawSearch.level || "A1";
  const { dark } = useTheme();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [cardPhrases, setCardPhrases] = useState<{ french: string; english: string; lesson: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  
  // Free-Speaking Coach State
  const activeLevel = (level || "A1").toUpperCase();
  const activeLang = getActiveLanguageCode(user);
  const targetTtsLocale = TTS_LOCALE_MAP[activeLang] || "fr-FR";
  const coachGender: "male" | "female" = user?.avatarFeatures?.gender === "male" ? "male" : "female";
  
  const initialGreetingText = MULTILINGUAL_GREETINGS[activeLang]?.[activeLevel] || MULTILINGUAL_GREETINGS.fr[activeLevel] || MULTILINGUAL_GREETINGS.fr.A1;

  const [avatarAnim, setAvatarAnim] = useState<"idle" | "wave" | "speak" | "celebrate">("idle");
  const recognitionRef = useRef<any>(null);
  const hasAutoGreetedRef = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "coach",
      text: initialGreetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [userInputText, setUserInputText] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  // 🔊 Auto-Speak Greeting on Page Open
  useEffect(() => {
    if (mode === "free" && user && !hasAutoGreetedRef.current) {
      hasAutoGreetedRef.current = true;
      setAvatarAnim("speak");
      speakText(initialGreetingText, targetTtsLocale, 0.85, coachGender);
      const timer = setTimeout(() => setAvatarAnim("idle"), 4500);
      return () => clearTimeout(timer);
    }
  }, [mode, user, initialGreetingText, targetTtsLocale, coachGender]);

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" search={{ redirect: "/speaking" }} replace />;
  }

  const activeBranding = getTrackBranding(activeLang);

  useEffect(() => {
    collectPhrases().then(setCardPhrases);
  }, []);

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const textSec = dark ? "text-gray-300" : "text-slate-700";
  const textMuted = dark ? "text-gray-500" : "text-slate-400";
  const btnHover = dark ? "hover:bg-[#1e2a4a]" : "hover:bg-slate-100";

  const handleSpeak = (text: string) => {
    speakText(text, targetTtsLocale, 0.85, coachGender);
  };

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = targetTtsLocale;
    rec.interimResults = true;
    rec.continuous = false;

    rec.onstart = () => {
      setIsListening(true);
      if (mode === "free") setAvatarAnim("idle");
    };

    rec.onresult = (event: any) => {
      const currentRes = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      if (mode === "free") {
        setUserInputText(currentRes);
      } else {
        setTranscript(currentRes);
      }
    };

    rec.onerror = (err: any) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    try {
      rec.start();
      recognitionRef.current = rec;
    } catch {
      setIsListening(false);
    }
  }, [mode, targetTtsLocale]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
    }
  }, []);

  // AI Free Speaking Conversation Handler
  const sendFreeConversationMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || userInputText).trim();
    if (!messageContent || isAiProcessing) return;

    const userMsg: ChatMessage = {
      sender: "user",
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInputText("");
    setIsAiProcessing(true);
    setAvatarAnim("idle");

    try {
      const systemInstruction = `You are Coach Léo/Chloé, an encouraging AI language coach for Francprep. The student's selected active language is ${activeLang.toUpperCase()} and CEFR Level is ${activeLevel}. Respond in ${activeLang.toUpperCase()} at a CEFR ${activeLevel} level (2 concise sentences), followed by a helpful 1-sentence English explanation & grammar correction to guide the student and boost speaking fluency by 200%. Maintain strict safety boundaries.`;

      const res = await apiFetch("/ai/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType: "Task 1",
          prompt: systemInstruction,
          userResponse: messageContent,
        }),
      });

      const json = await res.json();
      let coachReply = "Great job! Keep practicing, you are expressing yourself more naturally!";
      if (json.data && json.data.feedback) {
        coachReply = json.data.feedback.split("\n")[0].replace(/^Coach:\s*/i, "").trim();
      }

      const coachMsg: ChatMessage = {
        sender: "coach",
        text: coachReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, coachMsg]);
      setAvatarAnim("speak");
      speakText(coachReply, targetTtsLocale, 0.85, coachGender);
      setTimeout(() => setAvatarAnim("idle"), 4000);
    } catch {
      const fallbackReply = `Very good! At ${activeLevel} level, your phrasing is clear. Keep speaking!`;
      setMessages((prev) => [...prev, {
        sender: "coach",
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setAvatarAnim("speak");
      speakText(fallbackReply, targetTtsLocale, 0.85, coachGender);
      setTimeout(() => setAvatarAnim("idle"), 3000);
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Render Mode: Dedicated AI Free-Speaking Coach Page
  if (mode === "free") {
    return (
      <div className={`min-h-screen ${pageBg} transition-colors duration-300 flex flex-col`}>
        {/* Header Bar */}
        <header className={`sticky top-0 z-30 ${dark ? "bg-[#070B17]/80 border-[#1e2a4a]" : "bg-white/90 border-slate-200 shadow-sm"} backdrop-blur-xl border-b px-4 py-3`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className={`p-2 rounded-xl ${btnHover} transition-colors`}>
                <ArrowLeft className={`w-5 h-5 ${textSec}`} />
              </Link>
              <div>
                <h1 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${dark ? "text-white" : "text-gray-900"}`}>
                  <span>{user?.avatarFeatures?.gender === "male" ? "Coach Léo 👨‍🏫" : "Coach Chloé 👩‍🏫"}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold">
                    Level {activeLevel}
                  </span>
                </h1>
                <p className={`text-[11px] ${textMuted}`}>Live 3D Conversational Coaching</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`hidden sm:flex items-center gap-1.5 ${dark ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"} border px-3 py-1 rounded-full text-xs font-semibold`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI Safety Guarded</span>
              </div>
              <Link to="/speaking" search={{ mode: "drill" }} className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${dark ? "border-purple-500/40 text-purple-300 hover:bg-purple-500/20" : "border-purple-300 text-purple-700 hover:bg-purple-50"}`}>
                Drills Mode
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col md:flex-row gap-6">
          {/* Left Column: 3D Animated Coach Stage */}
          <div className="md:w-5/12 flex flex-col items-center justify-center p-6 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-900/20 via-slate-900/40 to-slate-950/80 backdrop-blur-xl relative overflow-hidden min-h-[300px]">
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-purple-300 bg-purple-900/60 border border-purple-400/40 backdrop-blur-md">
              AI Coach active
            </div>
            <SmartAvatar
              features={user?.avatarFeatures}
              size={230}
              animate={avatarAnim}
              glowColor="none"
              showThoughts={false}
            />
            <p className="text-xs text-purple-300 font-semibold mt-4 text-center">
              Tap avatar to wave • Speak freely below
            </p>
          </div>

          {/* Right Column: Dynamic Live Chat & Audio Speech Console */}
          <div className="md:w-7/12 flex flex-col flex-1 rounded-3xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-xl overflow-hidden min-h-[400px]">
            <div className="p-3.5 border-b border-purple-500/20 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                Live Conversation Log
              </span>
              <button
                onClick={() => setMessages([{ sender: "coach", text: LEVEL_INITIAL_GREETINGS[activeLevel] || LEVEL_INITIAL_GREETINGS.A1, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])}
                className="text-[10px] text-purple-400 hover:underline"
              >
                Clear History
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[350px]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-lg shadow-purple-600/20"
                        : "bg-slate-800/90 border border-purple-500/30 text-purple-100 rounded-bl-none shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </motion.div>
              ))}
              {isAiProcessing && (
                <div className="flex items-center gap-2 text-xs text-purple-400 italic py-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Coach is thinking in French...
                </div>
              )}
            </div>

            {/* Input Controls */}
            <div className="p-3 border-t border-purple-500/20 bg-slate-950/80 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInputText}
                  onChange={(e) => setUserInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendFreeConversationMessage()}
                  placeholder="Type or speak in French..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-900 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2.5 rounded-xl text-white transition-all shadow-md ${
                    isListening ? "bg-red-600 animate-pulse" : "bg-purple-600 hover:bg-purple-500"
                  }`}
                  title={isListening ? "Stop Listening" : "Speak via Microphone"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => sendFreeConversationMessage()}
                  disabled={!userInputText.trim() || isAiProcessing}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Mode: Standard Phrase Speaking Drills Mode
  const currentPhrase = cardPhrases[current];

  const checkAnswer = () => {
    if (!transcript || !currentPhrase) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[?.!,;:\s]+/g, " ").trim();
    const userStr = normalize(transcript);
    const expected = normalize(currentPhrase.french);
    const userWords = userStr.split(" ").filter(Boolean);
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
          <div className="flex items-center gap-2">
            <Link
              to="/speaking"
              search={{ mode: "free", level: "A1" }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>🎙️ Free AI Mode</span>
            </Link>
            <button onClick={shuffle} className={`p-2 rounded-xl ${btnHover} transition-colors`} title="Shuffle">
              <Shuffle className={`w-4 h-4 ${textSec}`} />
            </button>
          </div>
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
          <p className={`text-xs font-semibold mb-4 ${textMuted}`}>{activeBranding.speakingPrompt}</p>
          <h2 className={`text-2xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
            {currentPhrase.french}
          </h2>
          <p className={`text-sm mb-6 ${textSec}`}>{currentPhrase.english}</p>

          {/* Speaker button */}
          <button onClick={() => handleSpeak(currentPhrase.french)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all shadow-lg shadow-purple-500/25 mx-auto mb-8">
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Mic Button */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-xl ${
                isListening
                  ? "bg-red-500 animate-pulse shadow-red-500/40"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/30"
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <span className={`text-xs ${textMuted}`}>
              {isListening ? "Listening... Speak now!" : "Tap to record your voice"}
            </span>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className={`p-4 rounded-xl mb-4 ${dark ? "bg-slate-900/80 border-purple-500/20" : "bg-slate-100 border-slate-200"} border text-left`}>
              <p className={`text-xs font-semibold mb-1 ${textMuted}`}>Your Speech:</p>
              <p className={`text-sm font-medium ${dark ? "text-purple-200" : "text-purple-900"}`}>{transcript}</p>
            </div>
          )}

          {/* Result Feedback */}
          {result && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-xl flex items-center gap-3 mb-4 ${
                result === "correct"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {result === "correct" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="text-sm font-semibold">
                {result === "correct" ? "Excellent pronunciation!" : "Try again — listen to the audio sample above."}
              </span>
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800/40">
            <button onClick={prevPhrase} disabled={current === 0}
              className={`flex items-center gap-1 text-xs font-semibold ${btnHover} px-3 py-2 rounded-xl disabled:opacity-40`}>
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            {transcript && !result && (
              <button onClick={checkAnswer} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                Check Speech
              </button>
            )}
            <button onClick={nextPhrase} disabled={current === cardPhrases.length - 1}
              className={`flex items-center gap-1 text-xs font-semibold ${btnHover} px-3 py-2 rounded-xl disabled:opacity-40`}>
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/speaking")({
  validateSearch: (search: Record<string, unknown> = {}) => {
    return {
      mode: (search?.mode as string) || "drill",
      level: (search?.level as string) || "A1",
    };
  },
  component: () => (
    <SpeakingErrorBoundary>
      <SpeakingPage />
    </SpeakingErrorBoundary>
  ),
});