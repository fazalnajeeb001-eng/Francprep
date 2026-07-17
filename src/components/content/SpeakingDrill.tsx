import { useState, useRef, useEffect } from "react";
import { Mic, Send, Volume2, RotateCcw, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SpeakingDrillProps {
  lessonLevel?: string;
  lessonTopic?: string;
  onComplete?: () => void;
}

const GREETINGS: Record<string, string> = {
  A1: "Bonjour ! Je suis Madame Sophie. Comment tu t'appelles ?",
  A2: "Salut ! Bienvenue en cours de français. Comment ça va aujourd'hui ?",
  B1: "Bonjour ! Prêt pour une petite conversation en français ? Dis-moi, qu'est-ce que tu as fait aujourd'hui ?",
  B2: "Bonjour ! Aujourd'hui, on va discuter. Quel est le sujet qui t'intéresse en ce moment ?",
  C1: "Bonjour ! Je suis curieuse de savoir ce que tu penses. Quel est ton avis sur l'apprentissage des langues ?",
  C2: "Bonjour ! Parlons de quelque chose d'interesting. Qu'est-ce qui te passionne en ce moment ?",
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

export function SpeakingDrill({ lessonLevel = "A1", lessonTopic }: SpeakingDrillProps) {
  const { dark } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [interimText, setInterimText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const greeting = GREETINGS[lessonLevel] || GREETINGS.A1;
  const hasSpeechRecognition = !!getSpeechRecognition();

  // Initialize with greeting
  useEffect(() => {
    setMessages([{ role: "assistant", content: greeting }]);
  }, [greeting]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Auto-speak greeting
  useEffect(() => {
    const timer = setTimeout(() => speakText(greeting), 500);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(
        v => v.lang.startsWith("fr") && (v.name.includes("Audrey") || v.name.includes("Amélie") || v.name.includes("Julie") || v.name.includes("Marie") || v.name.includes("Thomas"))
      );
      if (frenchVoice) u.voice = frenchVoice;
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch { /* ignore */ }
  };

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
        speakText(data.data.reply);
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
    setMessages([{ role: "assistant", content: greeting }]);
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
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-[#1e2a4a] border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className={`text-xs font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Madame Sophie</p>
            <p className={`text-[10px] ${textSec}`}>Your French conversation tutor</p>
          </div>
        </div>
        <button onClick={resetChat} className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`} title="Start over">
          <RotateCcw className="w-4 h-4" />
        </button>
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
                  {msg.role === "assistant" && i === messages.length - 1 && !isThinking && (
                    <button
                      onClick={() => speakText(msg.content)}
                      className="ml-2 inline-flex items-center gap-1 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                      disabled={isSpeaking}
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
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
