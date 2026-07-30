import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { speak } from "~/lib/speech";
import {
  MessageSquare,
  Bot,
  Users,
  Send,
  Volume2,
  Sparkles,
  ShieldAlert,
  ArrowLeft,
  Flame,
  Globe,
  Plus,
  Check,
  RotateCcw,
  Headphones,
  BookOpen,
  Mic,
  MessageCircle,
  ExternalLink,
  Lock,
  Unlock,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "peer";
  senderName: string;
  senderAvatar?: string;
  text: string;
  translation?: string;
  audioText?: string;
  timestamp: string;
  channelId?: string;
}

interface Channel {
  id: string;
  name: string;
  icon: string;
  description: string;
  topic: string;
}

const OFFICIAL_CHANNELS: Channel[] = [
  {
    id: "bot-francprep",
    name: "🤖 Le Bot FrancPrep",
    icon: "🤖",
    description: "24/7 AI French Companion & Conversation Simulator",
    topic: "Practice everyday French conversation, order coffee, roleplay DELF/TCF oral exams!",
  },
  {
    id: "salon-de-discussion",
    name: "💬 #salon-de-discussion",
    icon: "💬",
    description: "General French Conversation Practice",
    topic: "Chat in French with fellow learners. Practice everyday expressions!",
  },
  {
    id: "tcf-tef-canada",
    name: "🇨🇦 #tcf-tef-canada-prep",
    icon: "🇨🇦",
    description: "TCF / TEF Canada Candidate Network",
    topic: "CLB score strategies, NCLC goals, and immigration study groups.",
  },
  {
    id: "delf-prep-hub",
    name: "🎓 #delf-prep-hub",
    icon: "🎓",
    description: "DELF A1–B2 Exam Practice",
    topic: "Discuss written & oral exam questions, mock tests, and scoring rubrics.",
  },
  {
    id: "study-circles",
    name: "🌐 #groupes-d-etudes",
    icon: "🌐",
    description: "FrancPrep Candidate Study Circles",
    topic: "Connect with dedicated study circles for peer exam preparation.",
  },
  {
    id: "private-partner",
    name: "💬 1-on-1 Private Peer Chat",
    icon: "🔒",
    description: "Private 1-on-1 Practice with a Study Partner",
    topic: "Direct private messaging channel with your assigned study partner.",
  },
];

const BOT_SCENARIOS = [
  { id: "free", label: "🗣️ Free Conversation", prompt: "Bonjour ! Je suis Le Bot FrancPrep. Comment vas-tu aujourd'hui ? Qu'as-tu appris en français ?" },
  { id: "bakery", label: "🥐 At the Bakery (Café)", prompt: "Bonjour ! Bienvenue à la boulangerie Parisienne. Que souhaitez-vous commander aujourd'hui ?" },
  { id: "delf_oral", label: "🎯 DELF A1 Oral Exam", prompt: "Bonjour candidate ! Présentez-vous s'il vous plaît : quel est votre nom, votre nationalité et votre profession ?" },
  { id: "directions", label: "🗺️ Asking Directions", prompt: "Pardon Monsieur/Madame, est-ce que vous savez où se trouve la station de métro la plus proche ?" },
];

function CommunityPage() {
  const { user } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [activeChannelId, setActiveChannelId] = useState<string>("bot-francprep");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    "bot-francprep": [
      {
        id: "msg-1",
        sender: "bot",
        senderName: "Le Bot FrancPrep 🤖",
        text: "Bonjour ! Je suis Le Bot FrancPrep, ton compagnon virtuel pour pratiquer le français 24/7 sans aucune timidité !\n\nChoisis un scénario ci-dessous ou écris-moi directement en français !",
        timestamp: "Just now",
      },
    ],
    "salon-de-discussion": [
      {
        id: "msg-salon-1",
        sender: "peer",
        senderName: "Camille (Modérateur 🇨🇦)",
        text: "Bienvenue dans le salon de discussion ! N'hésite pas à vous présenter en français !",
        timestamp: "10:15 AM",
      },
    ],
    "tcf-tef-canada": [
      {
        id: "msg-tcf-1",
        sender: "peer",
        senderName: "Hugo (Canada Candidate)",
        text: "Salut tout le monde ! Quelqu'un révise la compréhension orale TCF Canada ce soir ?",
        timestamp: "11:30 AM",
      },
    ],
    "delf-prep-hub": [
      {
        id: "msg-delf-1",
        sender: "peer",
        senderName: "Inès (DELF A2 Candidate)",
        text: "Conseil du jour : pensez à réviser les connecteurs logiques (d'abord, puis, enfin) pour la production écrite !",
        timestamp: "12:00 PM",
      },
    ],
    "private-partner": [
      {
        id: "msg-priv-1",
        sender: "peer",
        senderName: "Lucas (Study Partner 🇫🇷)",
        text: "Salut ! On révise l’oral ensemble aujourd’hui ? Tu peux m’envoyer un message vocal ou texte !",
        translation: "Hi! Shall we review oral exam together today? You can send me a voice or text message!",
        timestamp: "12:30 PM",
      },
    ],
  });

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [botScenario, setBotScenario] = useState("free");
  const [isSocialEnabled, setIsSocialEnabled] = useState<boolean | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. You can type your message in French!");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) setInputText(transcript);
      };
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Theme styling
  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-md shadow-slate-200/50";
  const textSec = dark ? "text-gray-300" : "text-slate-700";
  const textMuted = dark ? "text-gray-400" : "text-slate-500";

  // Check System Feature Toggle on Mount
  useEffect(() => {
    async function checkToggle() {
      try {
        const res = await apiFetch("/subscriptions/plans");
        const json = await res.json();
        const enabled = json.data?.isSocialHubEnabled === true;
        setIsSocialEnabled(enabled);

        // Stealth Mode Rule: If disabled and user is NOT admin, redirect out
        if (!enabled && user?.role !== "admin") {
          navigate({ to: "/dashboard" });
        }
      } catch (err) {
        setIsSocialEnabled(false);
      } finally {
        setLoadingConfig(false);
      }
    }
    checkToggle();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChannelId, isTyping]);

  const activeChannel = OFFICIAL_CHANNELS.find((c) => c.id === activeChannelId) || OFFICIAL_CHANNELS[0];
  const channelMessages = messages[activeChannelId] || [];

  const handlePlayCommunityAudio = (txt: string) => {
    speak(txt, "fr-FR", 0.9, "female");
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      senderName: `${user?.firstName || "Student"}`,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), userMsg],
    }));

    const userText = inputText.trim();
    setInputText("");

    // If talking to Le Bot FrancPrep, generate AI response
    if (activeChannelId === "bot-francprep") {
      setIsTyping(true);
      setTimeout(() => {
        let botText = "Très bien ! C'est une excellente phrase en français. Peux-tu m'en dire plus ?";
        let botTrans = "Very good! That's an excellent French sentence. Can you tell me more?";

        const lower = userText.toLowerCase();
        if (lower.includes("bonjour") || lower.includes("salut")) {
          botText = "Bonjour ! Enchanté de vous rencontrer. Comment vous appelez-vous ?";
          botTrans = "Hello! Nice to meet you. What is your name?";
        } else if (lower.includes("je m'appelle") || lower.includes("je suis")) {
          botText = "Enchanté ! C'est un très joli prénom. Quel est votre objectif d'examen (DELF, TCF, TEF) ?";
          botTrans = "Nice to meet you! That is a very nice name. What is your exam goal?";
        } else if (lower.includes("café") || lower.includes("croissant") || lower.includes("commander")) {
          botText = "Parfait ! Cela fera 3,50 € s'il vous plaît. Désirez-vous autre chose avec votre café ?";
          botTrans = "Perfect! That will be €3.50 please. Would you like anything else with your coffee?";
        } else if (lower.includes("merci") || lower.includes("au revoir")) {
          botText = "De rien ! Bonne journée et à bientôt pour la prochaine séance de français ! 🇫🇷";
          botTrans = "You're welcome! Have a great day and see you soon for the next French session!";
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          senderName: "Le Bot FrancPrep 🤖",
          text: botText,
          translation: botTrans,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => ({
          ...prev,
          "bot-francprep": [...(prev["bot-francprep"] || []), botMsg],
        }));
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleSelectScenario = (sc: typeof BOT_SCENARIOS[0]) => {
    setBotScenario(sc.id);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      senderName: "Le Bot FrancPrep 🤖",
      text: sc.prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      "bot-francprep": [...(prev["bot-francprep"] || []), botMsg],
    }));
  };

  if (loadingConfig) {
    return (
      <div className={`min-h-screen ${pageBg} flex items-center justify-center`}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300 pb-12`}>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        
        {/* Stealth Mode Admin Notice Banner */}
        {user?.role === "admin" && !isSocialEnabled && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Admin Stealth Mode Active:</strong> Community Lounge & Le Bot FrancPrep are currently <strong>HIDDEN from regular students</strong> until you enable it in Admin Settings!
              </span>
            </div>
            <Link to="/admin" className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold rounded-lg hover:bg-amber-400 shrink-0">
              Admin Settings →
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-[#1e2a4a] border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={`p-2.5 rounded-xl border ${dark ? "bg-[#101828] border-purple-500/20 text-purple-400 hover:bg-purple-500/10" : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"} transition-all`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  FrancPrep Social Lounge
                </span>
                <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Live
                </span>
              </div>
              <h1 className={`text-xl font-extrabold ${dark ? "text-white" : "text-gray-900"} mt-0.5`}>
                💬 FrancPrep Community & Speaking Hub
              </h1>
            </div>
          </div>
        </div>

        {/* Discord/WhatsApp Style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[700px]">
          
          {/* Left Column: Channels List */}
          <div className={`lg:col-span-4 rounded-2xl border p-4 flex flex-col space-y-4 ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-slate-200"}`}>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 mb-1">
                Official Channels & Bots
              </h3>
              <p className={`text-[11px] ${textMuted}`}>Select a lounge room or AI companion:</p>
            </div>

            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
              {OFFICIAL_CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannelId(ch.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    activeChannelId === ch.id
                      ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-500 shadow-md"
                      : dark
                      ? "bg-[#101828]/50 border-purple-500/10 hover:bg-purple-500/10 text-gray-300"
                      : "bg-gray-50 border-gray-100 hover:bg-purple-50 text-gray-800"
                  }`}
                >
                  <span className="text-lg shrink-0 mt-0.5">{ch.icon}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-extrabold block truncate text-purple-300 dark:text-purple-300">
                      {ch.name}
                    </span>
                    <span className={`text-[10px] ${textMuted} block truncate mt-0.5`}>
                      {ch.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Official Study Circle Info Card */}
            <div className={`p-3 rounded-xl border ${dark ? "bg-purple-950/20 border-purple-500/20" : "bg-purple-50 border-purple-200"}`}>
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400">FrancPrep Peer Study Circles</span>
              </div>
              <p className={`text-[11px] ${textMuted} leading-relaxed`}>
                Connect with fellow FrancPrep candidates to practice conversation and review exam strategies together!
              </p>
            </div>
          </div>

          {/* Right Column: Active Chat Feed & Input */}
          <div className={`lg:col-span-8 rounded-2xl border flex flex-col overflow-hidden ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-slate-200"}`}>
            
            {/* Channel Top Header */}
            <div className={`p-4 border-b flex items-center justify-between ${dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-purple-50/60 border-slate-200"}`}>
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{activeChannel.icon}</span>
                <div>
                  <h3 className={`text-sm font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>{activeChannel.name}</h3>
                  <p className={`text-[11px] ${textMuted}`}>{activeChannel.topic}</p>
                </div>
              </div>
            </div>

            {/* Special Bot Scenario Picker (Only for Le Bot FrancPrep) */}
            {activeChannelId === "bot-francprep" && (
              <div className={`p-3 border-b flex items-center gap-2 overflow-x-auto ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-gray-50 border-slate-200"}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 shrink-0">Scenario Mode:</span>
                {BOT_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                      botScenario === sc.id
                        ? "bg-purple-600 text-white border-purple-500 shadow-md"
                        : dark
                        ? "bg-[#101828] border-purple-500/20 text-gray-300 hover:bg-purple-500/10"
                        : "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            )}

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {channelMessages.map((msg) => {
                const isMe = msg.sender === "user";
                const isBot = msg.sender === "bot";

                return (
                  <div key={msg.id} className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isBot ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white" : isMe ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white" : "bg-emerald-600 text-white"
                    }`}>
                      {isBot ? "🤖" : isMe ? "Me" : "Peer"}
                    </div>

                    <div className={`max-w-[80%] space-y-1 ${isMe ? "text-right" : "text-left"}`}>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="font-bold">{msg.senderName}</span>
                        <span>• {msg.timestamp}</span>
                      </div>

                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md rounded-tr-none"
                          : isBot
                          ? dark ? "bg-[#101828] border border-purple-500/30 text-purple-100 rounded-tl-none" : "bg-purple-50 border border-purple-200 text-purple-900 rounded-tl-none"
                          : dark ? "bg-black/40 border border-gray-800 text-gray-200 rounded-tl-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        
                        {msg.translation && (
                          <p className="mt-1.5 pt-1.5 border-t border-purple-500/20 text-[11px] italic opacity-85">
                            Translation: {msg.translation}
                          </p>
                        )}
                      </div>

                      {/* Audio TTS button */}
                      <button
                        onClick={() => speak(msg.text)}
                        className={`text-[10px] font-bold flex items-center gap-1 hover:underline ${isMe ? "ml-auto text-purple-400" : "text-purple-400"}`}
                      >
                        <Volume2 className="w-3 h-3" /> Listen
                      </button>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-purple-400 italic p-2">
                  <Bot className="w-4 h-4 animate-spin" />
                  <span>Le Bot FrancPrep is thinking in French...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className={`p-3 border-t flex items-center gap-2 ${dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-gray-50 border-slate-200"}`}>
              <button
                type="button"
                onClick={startVoiceInput}
                className={`p-3 rounded-xl border transition-all ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse border-red-400"
                    : dark
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                    : "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                }`}
                title="Speak French into Microphone"
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={isListening ? "Listening... Speak in French!" : `Type or speak a message in ${activeChannel.name}...`}
                className={`flex-1 p-3 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  dark ? "bg-black/50 border-purple-500/30 text-white placeholder-gray-500" : "bg-white border-purple-200 text-gray-900 placeholder-gray-400"
                }`}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white rounded-xl shadow-md transition-all flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
