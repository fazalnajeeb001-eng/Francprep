import { useState, useRef, useEffect } from "react";
import { Mic, Send, Volume2, RotateCcw, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { getBestVoice } from "~/lib/speech";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SpeakingDrillProps {
  lessonLevel?: string;
  lessonTopic?: string;
  guidedActivity?: string;
  roleplayPrompt?: string;
  onComplete?: () => void;
}

const GREETINGS: Record<string, string> = {
  A1: "FR: Bonjour ! Je suis Madame Sophie. Comment tu t'appelles ?\nEN: (Hello! I am Madame Sophie. What is your name?)",
  A2: "FR: Salut ! Bienvenue en cours de français. Comment ça va aujourd'hui ?\nEN: (Hi! Welcome to French class. How are you doing today?)",
  B1: "FR: Bonjour ! Prêt pour une petite conversation en français ? Dis-moi, qu'est-ce que tu as fait aujourd'hui ?\nEN: (Hello! Ready for a quick French conversation? Tell me, what did you do today?)",
  B2: "FR: Bonjour ! Aujourd'hui, on va discuter. Quel est le sujet qui t'intéresse en ce moment ?\nEN: (Hello! Today we will talk. What topic interests you right now?)",
  C1: "FR: Bonjour ! Je suis curieuse de savoir ce que tu penses. Quel est ton avis sur l'apprentissage des langues ?\nEN: (Hello! I'm curious to know your thoughts. What is your opinion on language learning?)",
  C2: "FR: Bonjour ! Parlons de quelque chose d'intéressant. Qu'est-ce qui te passionne en ce moment ?\nEN: (Hello! Let's talk about something interesting. What are you passionate about right now?)",
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function getSpeechRecognition(): any {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function SpeakingDrill({ lessonLevel = "A1", lessonTopic, guidedActivity, roleplayPrompt }: SpeakingDrillProps) {
  const { dark } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(0.85);
  const [error, setError] = useState("");
  const [interimText, setInterimText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const initialGreeting = useMemo(() => {
    const topicStr = lessonTopic ? `sur "${lessonTopic}"` : "";
    const promptText = guidedActivity || roleplayPrompt || "";

    if (promptText) {
      return `FR: Bonjour ! Je suis Madame Sophie. Pour notre leçon ${topicStr}, voici ton exercice : ${promptText} Tu peux répondre à l'exercice ou me parler de ce que tu veux en français !\nEN: (Hello! I am Madame Sophie. For our lesson ${topicStr ? `on "${lessonTopic}"` : ""}, here is your exercise: ${promptText} Feel free to complete the exercise or talk about anything you like in French!)`;
    }

    return GREETINGS[lessonLevel] || GREETINGS.A1;
  }, [lessonLevel, lessonTopic, guidedActivity, roleplayPrompt]);

  const hasSpeechRecognition = !!getSpeechRecognition();

  // Advanced Sub-Sentence Bilingual Audio Engine
  const speakText = useCallback((text: string, baseRate: number = 0.85) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();

      const chunks: { lang: "fr" | "en"; text: string }[] = [];
      const cleanStr = (s: string) => s.replace(/^FR:\s*/i, "").replace(/^EN:\s*/i, "").replace(/[*_#`]/g, "").trim();

      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

      for (const line of lines) {
        if (/^(?:FR:|French:)/i.test(line)) {
          const c = cleanStr(line);
          if (c) chunks.push({ lang: "fr", text: c });
        } else if (/^(?:EN:|English:)/i.test(line) || /^\([^)]+\)$/.test(line)) {
          const c = cleanStr(line).replace(/^\(|\)$/g, "");
          if (c) chunks.push({ lang: "en", text: c });
        } else if (line.includes("💡") || /^(?:Note|Correction|Tip):/i.test(line)) {
          const parts = line.split(/(["'][^"']+["']|\([^)]+\))/g);
          for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed) continue;
            if (/^["'].*["']$/.test(trimmed)) {
              chunks.push({ lang: "fr", text: trimmed.replace(/^["']|["']$/g, "") });
            } else if (/^\(.*\)$/.test(trimmed)) {
              chunks.push({ lang: "en", text: trimmed.replace(/^\(|\)$/g, "") });
            } else {
              chunks.push({ lang: "en", text: cleanStr(trimmed) });
            }
          }
        } else {
          const parenMatch = line.match(/^(.*?)\s*\(([^)]+)\)$/);
          if (parenMatch) {
            const frText = cleanStr(parenMatch[1]);
            const enText = cleanStr(parenMatch[2]);
            if (frText) chunks.push({ lang: "fr", text: frText });
            if (enText) chunks.push({ lang: "en", text: enText });
          } else {
            chunks.push({ lang: "fr", text: cleanStr(line) });
          }
        }
      }

      if (chunks.length === 0) {
        chunks.push({ lang: "fr", text: cleanStr(text) });
      }

      const frenchVoice = getBestVoice("fr");
      const englishVoice = getBestVoice("en");

      const enRate = baseRate < 0.8 ? Math.max(0.65, baseRate * 0.95) : 0.95;

      setIsSpeaking(true);

      const playChunk = (index: number) => {
        if (index >= chunks.length) {
          setIsSpeaking(false);
          return;
        }

        const c = chunks[index];
        const u = new SpeechSynthesisUtterance(c.text);
        if (c.lang === "fr") {
          u.lang = "fr-FR";
          u.rate = baseRate;
          if (frenchVoice) u.voice = frenchVoice;
        } else {
          u.lang = "en-US";
          u.rate = enRate;
          if (englishVoice) u.voice = englishVoice;
        }

        u.onend = () => playChunk(index + 1);
        u.onerror = () => playChunk(index + 1);

        window.speechSynthesis.speak(u);
      };

      playChunk(0);
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  // Initialize with dynamic greeting
  useEffect(() => {
    setMessages([{ role: "assistant", content: initialGreeting }]);
  }, [initialGreeting]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Auto-speak greeting when page loads or greeting initializes
  useEffect(() => {
    const timer = setTimeout(() => speakText(initialGreeting, selectedSpeed), 400);
    return () => clearTimeout(timer);
  }, [initialGreeting, selectedSpeed, speakText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const startRecording = () => {
    setError("");
    setInterimText("");

    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError("Speech recognition not supported. Type your response instead, or use Chrome/Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setInputText(finalTranscript);
      setInterimText(interim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      if (event.error === "not-allowed") {
        setError("Microphone permission denied. Allow access in browser settings.");
      } else if (event.error === "no-speech") {
        if (!finalTranscript.trim()) {
          setError("No speech detected. Try again.");
        }
      } else {
        setError("Speech recognition error. Try typing instead.");
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText("");
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setInterimText("");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsThinking(true);
    setError("");
    setInputText("");

    try {
      const res = await apiFetch("/writing/speaking-chat", {
        method: "POST",
        body: JSON.stringify({
          messages: updatedMessages,
          lessonLevel,
          lessonTopic,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.reply) {
        const assistantMsg: ChatMessage = { role: "assistant", content: data.data.reply };
        setMessages(prev => [...prev, assistantMsg]);
        speakText(data.data.reply, selectedSpeed);
      } else {
        setError(data.error || "Tutor didn't respond. Try again.");
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendText = () => {
    if (inputText.trim() && !isThinking) {
      sendMessage(inputText.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const resetChat = () => {
    recognitionRef.current?.abort();
    setMessages([{ role: "assistant", content: initialGreeting }]);
    setError("");
    setInputText("");
    setIsRecording(false);
    setInterimText("");
  };

  const bubbleUser = dark ? "bg-purple-500/20 border-purple-500/30 text-white" : "bg-purple-100 border-purple-200 text-gray-900";
  const bubbleAssistant = dark ? "bg-[#1a2235] border-[#2a3a55] text-gray-200" : "bg-gray-100 border-gray-200 text-gray-800";
  const textSec = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat header with interactive Speed Selector */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-[#1e2a4a] border-gray-200 gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className={`text-xs font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Madame Sophie</p>
            <p className={`text-[10px] ${textSec}`}>AI French Conversation Coach</p>
          </div>
        </div>

        {/* Speed Selector Pills */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-lg p-0.5 text-[11px] font-semibold">
            <span className="px-1.5 text-purple-700 dark:text-purple-300 hidden sm:inline">⚡ Speed:</span>
            {[
              { label: "0.6x 🐢", val: 0.60 },
              { label: "0.85x", val: 0.85 },
              { label: "1.0x", val: 1.00 },
              { label: "1.2x 🚀", val: 1.20 },
            ].map(s => (
              <button
                key={s.val}
                onClick={() => setSelectedSpeed(s.val)}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  selectedSpeed === s.val
                    ? "bg-purple-600 text-white shadow-sm font-bold"
                    : "text-purple-700 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-purple-500/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button onClick={resetChat} className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`} title="Start over">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className={`rounded-2xl px-3.5 py-2.5 border text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user" ? bubbleUser : bubbleAssistant
                }`}>
                  {msg.content}
                  {msg.role === "assistant" && (
                    <div className="mt-2 pt-1 border-t dark:border-white/10 border-black/5 flex items-center gap-3 text-[11px]">
                      <button
                        onClick={() => speakText(msg.content, selectedSpeed)}
                        className="inline-flex items-center gap-1 font-bold text-purple-600 dark:text-purple-400 hover:underline"
                        disabled={isSpeaking}
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Play ({selectedSpeed}x)
                      </button>
                      <button
                        onClick={() => speakText(msg.content, 0.60)}
                        className="inline-flex items-center gap-1 font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                        disabled={isSpeaking}
                      >
                        <span>🐢</span> Practice Slow (0.6x)
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking indicator */}
        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className={`rounded-2xl px-4 py-3 border ${dark ? "bg-[#1a2235] border-[#2a3a55]" : "bg-gray-100 border-gray-200"}`}>
                <div className="flex gap-1.5">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className={`w-2 h-2 rounded-full ${dark ? "bg-purple-400" : "bg-purple-500"}`} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className={`w-2 h-2 rounded-full ${dark ? "bg-purple-400" : "bg-purple-500"}`} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className={`w-2 h-2 rounded-full ${dark ? "bg-purple-400" : "bg-purple-500"}`} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2">
          <p className={`text-xs px-3 py-1.5 rounded-lg ${dark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"}`}>{error}</p>
        </div>
      )}

      {/* Input area */}
      <div className={`px-4 py-3 border-t ${dark ? "border-[#1e2a4a]" : "border-gray-200"}`}>
        <div className="flex items-end gap-2">
          {/* Mic button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isThinking || !hasSpeechRecognition}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isRecording
                ? "bg-red-500 animate-pulse shadow-lg shadow-red-500/30"
                : dark
                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
            } ${!hasSpeechRecognition ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Mic className={`w-4 h-4 ${isRecording ? "text-white animate-pulse" : ""}`} />
          </button>

          {/* Text input */}
          <div className={`flex-1 flex items-end rounded-2xl border px-3 py-2 ${
            dark
              ? "bg-[#0a0e1a] border-[#1e2a4a] focus-within:border-purple-500/50"
              : "bg-white border-gray-200 focus-within:border-purple-300"
          }`}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening..." : "Type in French..."}
              rows={1}
              disabled={isRecording}
              className={`flex-1 bg-transparent text-sm resize-none outline-none max-h-20 ${
                dark ? "text-gray-200 placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
              }`}
              style={{ height: "auto", minHeight: "24px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 80) + "px";
              }}
            />
            <button
              onClick={handleSendText}
              disabled={!inputText.trim() || isThinking}
              className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                inputText.trim() && !isThinking
                  ? "bg-purple-500 text-white hover:opacity-90"
                  : dark ? "bg-white/5 text-gray-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live transcript + hint */}
        <div className="flex items-center justify-between mt-2 min-h-[16px]">
          {isRecording && interimText && (
            <p className={`text-[10px] italic truncate max-w-[70%] ${dark ? "text-purple-400" : "text-purple-600"}`}>
              "{interimText}"
            </p>
          )}
          {!isRecording && !interimText && (
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
                {hasSpeechRecognition ? "Tap mic to speak or type below" : "Type your response in French"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
