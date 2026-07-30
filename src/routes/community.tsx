import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import {
  MessageSquare,
  Sparkles,
  ShieldAlert,
  ArrowLeft,
  Flame,
  Globe,
  Plus,
  ThumbsUp,
  MessageCircle,
  Volume2,
  Mic,
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  Share2,
  TrendingUp,
  Tag,
  Search,
  Filter,
  Users,
  Compass,
  FileCheck2,
  GraduationCap,
  Target,
  Bookmark,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/community")({
  component: CommunityExamHubPage,
});

interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  authorExam: string;
  avatarBg: string;
  category: "exam_debrief" | "study_routine" | "essay_review";
  categoryLabel: string;
  categoryColor: string;
  title: string;
  content: string;
  frenchSnippet?: string;
  upvotes: number;
  commentsCount: number;
  timestamp: string;
  isUpvoted?: boolean;
  isBookmarked?: boolean;
  comments?: { id: string; author: string; authorId?: string; text: string; time: string }[];
}

export interface BuddyCircleRequest {
  id: string;
  authorName: string;
  authorExam: string;
  targetLevel: string;
  type: "1on1" | "group";
  capacity: number;
  acceptedCount: number;
  title: string;
  description: string;
  frenchAudioIntro?: string;
  createdAt: number;
  isFulfilled: boolean;
  acceptedUsers: string[];
}

const CATEGORIES = [
  { id: "all", label: "🔥 All Candidate Threads" },
  { id: "buddy_circle", label: "🤝 Buddy Circles & 1-on-1 Requests" },
  { id: "saved", label: "🔖 Saved Threads" },
  { id: "exam_debrief", label: "🎯 Official Exam Debriefs (TCF / TEF / DELF)" },
  { id: "study_routine", label: "🎒 Study Routines & Roadmaps" },
  { id: "essay_review", label: "✍️ Essay & Speaking Review Workshop" },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    authorName: "Sarah M.",
    authorRole: "Candidate",
    authorExam: "TCF Canada (CLB 7 Target)",
    avatarBg: "from-purple-500 to-indigo-600",
    category: "exam_debrief",
    categoryLabel: "🎯 Exam Debrief",
    categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    title: "TCF Canada Exam Debrief: Passed Listening & Reading with CLB 8!",
    content: "Here is my full breakdown: For the listening section, speed is everything. Don't spend more than 5 seconds overthinking past questions! The CBT simulator on FrancPrep prepared me for the exact audio cadence.",
    frenchSnippet: "J'ai obtenu NCLC 8 au TCF Canada ! Merci pour les simulations !",
    upvotes: 38,
    commentsCount: 7,
    timestamp: "3 hours ago",
    comments: [
      { author: "Marc D. (TEF)", text: "Félicitations Sarah ! Which chapter in FrancPrep was most useful for section 2?", time: "2 hours ago" },
      { author: "Sarah M.", text: "Chapter 4 and Chapter 6 flashcard chunks were direct hits!", time: "1 hour ago" },
    ],
  },
  {
    id: "post-2",
    authorName: "Jean-Luc (Senior Academic Examiner)",
    authorRole: "Academic Lead",
    authorExam: "DELF / TCF Lead Evaluator",
    avatarBg: "from-emerald-500 to-teal-600",
    category: "essay_review",
    categoryLabel: "✍️ Examiner Tip",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "DELF B1 / B2 Writing Guide: Avoiding Common Punctuation & Linker Errors",
    content: "When writing your formal argument (Task 2), examiners look specifically for transition markers: 'Tout d'abord', 'En outre', and 'Cependant'. Using these guarantees higher points in structural coherence!",
    frenchSnippet: "Utilisez des connecteurs logiques pour structurer votre argumentation.",
    upvotes: 54,
    commentsCount: 12,
    timestamp: "6 hours ago",
  },
  {
    id: "post-3",
    authorName: "Amara K.",
    authorRole: "Candidate",
    authorExam: "TEF Canada Candidate",
    avatarBg: "from-amber-500 to-orange-600",
    category: "study_routine",
    categoryLabel: "🎒 Candidate Roadmap",
    categoryColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "My 45-Day Routine for Working Professionals (1 Hour / Day)",
    content: "Morning: 20 mins Flashcards Vault. Evening: 1 Lesson + Cheat Sheet summary printout. Weekends: 1 Full CBT Mock Exam. Consistency > Intensity!",
    upvotes: 29,
    commentsCount: 4,
    timestamp: "Yesterday",
  },
  {
    id: "post-4",
    authorName: "Marc D.",
    authorRole: "Candidate",
    authorExam: "DELF B2 Candidate",
    avatarBg: "from-cyan-500 to-blue-600",
    category: "essay_review",
    categoryLabel: "✍️ Speaking Workshop",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "DELF B2 Oral Monologue Strategy: Structuring Your 10-Minute Argument",
    content: "For the speaking monologue, structure your introduction into 3 clear parts: Problematic, Plan, and Thesis statement. This structure alone secures 4/5 points in speech organization!",
    frenchSnippet: "En premier lieu, il convient de souligner l'importance de ce débat.",
    upvotes: 42,
    commentsCount: 9,
    timestamp: "2 days ago",
  },
];

const INITIAL_BUDDY_REQUESTS: BuddyCircleRequest[] = [
  {
    id: "buddy-1",
    authorName: "Elena R.",
    authorExam: "DELF B1 Candidate",
    targetLevel: "B1 Intermediate",
    type: "1on1",
    capacity: 1,
    acceptedCount: 0,
    title: "Looking for 1 Partner for 20-Min Daily DELF B1 Monologue Drills",
    description: "Targeting DELF B1 next month. Looking for a partner to practice Task 3 speaking monologues 3x a week.",
    frenchAudioIntro: "Bonjour ! Je cherche un partenaire pour pratiquer mon exposé oral.",
    createdAt: Date.now() - 3600000 * 5, // 5 hours ago
    isFulfilled: false,
    acceptedUsers: [],
  },
  {
    id: "buddy-2",
    authorName: "Kevin T.",
    authorExam: "TCF Canada CLB 7",
    targetLevel: "NCLC 7 Target",
    type: "group",
    capacity: 4,
    acceptedCount: 2,
    title: "TCF Canada Evening Oral Practice Group Pod (4 Members Max)",
    description: "Forming a 4-person study pod for TCF Canada Speaking Section 2 roleplays. 2 slots filled, 2 open!",
    frenchAudioIntro: "Salut tout le monde ! Rejoignez notre groupe d'entraînement oral.",
    createdAt: Date.now() - 3600000 * 12, // 12 hours ago
    isFulfilled: false,
    acceptedUsers: ["Sarah M.", "Jean-Luc P."],
  },
];

function CommunityExamHubPage() {
  const { user } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [buddyRequests, setBuddyRequests] = useState<BuddyCircleRequest[]>(INITIAL_BUDDY_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSocialEnabled, setIsSocialEnabled] = useState<boolean | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Buddy Connect Modal State
  const [connectModalRequest, setConnectModalRequest] = useState<BuddyCircleRequest | null>(null);
  const [connectIntroText, setConnectIntroText] = useState("");
  const [connectSuccessMsg, setConnectSuccessMsg] = useState("");

  // Active Joined Pod Workspace State
  const [activePodWorkspace, setActivePodWorkspace] = useState<BuddyCircleRequest | null>(null);
  const [podMessages, setPodMessages] = useState<Array<{ id: string; sender: string; text: string; time: string }>>([
    { id: "m-1", sender: "Elena R.", text: "Bonjour everyone! Ready for our DELF monologue practice session!", time: "10 mins ago" },
    { id: "m-2", sender: "Kevin T.", text: "Salut ! Let's practice Chapter 4 roleplays on Section 2 speaking.", time: "5 mins ago" },
  ]);
  const [podMessageInput, setPodMessageInput] = useState("");

  // Admin Delete Confirmation State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetType, setDeleteTargetType] = useState<"post" | "buddy">("post");
  const [deleteInputText, setDeleteInputText] = useState("");
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

  // Create Buddy Request Modal
  const [showBuddyModal, setShowBuddyModal] = useState(false);
  const [buddyTitle, setBuddyTitle] = useState("");
  const [buddyDesc, setBuddyDesc] = useState("");
  const [buddyType, setBuddyType] = useState<"1on1" | "group">("1on1");
  const [buddyCapacity, setBuddyCapacity] = useState<number>(1);
  const [buddyTargetLevel, setBuddyTargetLevel] = useState("TCF / TEF CLB 7");
  const [buddyAudioIntro, setBuddyAudioIntro] = useState("");

  // New Post Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFrenchSnippet, setNewFrenchSnippet] = useState("");
  const [newContactHandle, setNewContactHandle] = useState("");
  const [newCategory, setNewCategory] = useState<Post["category"]>("exam_debrief");

  // Active Comment Expanded Post ID
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const pageBg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-md shadow-slate-200/50";
  const textMuted = dark ? "text-gray-400" : "text-slate-500";

  useEffect(() => {
    async function checkToggle() {
      try {
        const res = await apiFetch("/subscriptions/plans");
        const json = await res.json();
        const enabled = json.data?.isSocialHubEnabled === true;
        setIsSocialEnabled(enabled);

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

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isUpvoted = p.isUpvoted;
          return {
            ...p,
            upvotes: isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
            isUpvoted: !isUpvoted,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const catLabelMap: Record<string, string> = {
      exam_debrief: "🎯 Exam Debrief",
      study_routine: "🎒 Candidate Roadmap",
      essay_review: "✍️ Workshop",
    };

    const catColorMap: Record<string, string> = {
      exam_debrief: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      study_routine: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      essay_review: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: `${user?.firstName || "Candidate"} ${user?.lastName ? user.lastName[0] + "." : ""}`,
      authorRole: user?.role === "admin" ? "Academic Lead" : "Candidate",
      authorExam: user?.learningGoal !== "none" ? `${user?.learningGoal} Candidate` : "A1-B2 Candidate",
      contactHandle: newContactHandle.trim() || undefined,
      avatarBg: user?.role === "admin" ? "from-emerald-500 to-teal-600" : "from-purple-500 to-indigo-600",
      category: newCategory,
      categoryLabel: catLabelMap[newCategory] || "🎯 Post",
      categoryColor: catColorMap[newCategory] || "bg-purple-500/10 text-purple-400 border-purple-500/20",
      title: newTitle.trim(),
      content: newContent.trim(),
      frenchSnippet: newFrenchSnippet.trim() || undefined,
      upvotes: 1,
      isUpvoted: true,
      commentsCount: 0,
      timestamp: "Just now",
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewFrenchSnippet("");
    setNewContactHandle("");
    setShowCreateModal(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const authorName = `${user?.firstName || "Candidate"}`;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = p.comments || [];
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [
              ...updatedComments,
              {
                id: `c-${Date.now()}`,
                author: authorName,
                authorId: user?.id,
                text: commentInput.trim(),
                time: "Just now",
              },
            ],
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const filtered = (p.comments || []).filter((c) => c.id !== commentId);
          return {
            ...p,
            commentsCount: Math.max(0, p.commentsCount - 1),
            comments: filtered,
          };
        }
        return p;
      })
    );
  };

  const handleToggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, isBookmarked: !p.isBookmarked };
        }
        return p;
      })
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCat =
      selectedCategory === "all"
        ? true
        : selectedCategory === "saved"
        ? p.isBookmarked === true
        : p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (loadingConfig) {
    return (
      <div className={`min-h-screen ${pageBg} flex items-center justify-center`}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300 pb-16`}>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Stealth Mode Notice for Admin */}
        {user?.role === "admin" && !isSocialEnabled && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Admin Stealth Mode Active:</strong> Candidate Knowledge Hub is <strong>HIDDEN from students</strong> until you publish it in Admin Settings!
              </span>
            </div>
            <Link to="/admin/subscriptions" className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold rounded-lg hover:bg-amber-400 shrink-0">
              Admin Settings →
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b dark:border-[#1e2a4a] border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={`p-2.5 rounded-xl border ${dark ? "bg-[#101828] border-purple-500/20 text-purple-400 hover:bg-purple-500/10" : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"} transition-all`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                FrancPrep Candidate Network
              </span>
              <h1 className={`text-xl sm:text-2xl font-black ${dark ? "text-white" : "text-gray-900"} mt-0.5`}>
                🎓 Professional Exam Knowledge & Strategy Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowBuddyModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" /> ⚡ Create Buddy / Pod Request
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Share Exam Strategy
            </button>
          </div>
        </div>

        {/* Academic Benefit Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${dark ? "bg-[#101828]/60 border-purple-500/20" : "bg-purple-50/50 border-purple-200"}`}>
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-purple-300">Verified Exam Debriefs</h4>
              <p className={`text-[11px] ${textMuted} mt-0.5`}>Real candidate breakdowns for TCF Canada, TEF, and DELF exams.</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${dark ? "bg-[#101828]/60 border-emerald-500/20" : "bg-emerald-50/50 border-emerald-200"}`}>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-emerald-300">Examiner Advice & Writing</h4>
              <p className={`text-[11px] ${textMuted} mt-0.5`}>Official scoring rubric insights & Task 2 argument structures.</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${dark ? "bg-[#101828]/60 border-amber-500/20" : "bg-amber-50/50 border-amber-200"}`}>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-amber-300">French Speech & Audio Practice</h4>
              <p className={`text-[11px] ${textMuted} mt-0.5`}>1-tap text-to-speech & voice dictation for active listening practice.</p>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white border-purple-500 shadow-md"
                    : dark
                    ? "bg-[#101828] border-[#1e2a4a] text-gray-300 hover:bg-white/5"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam threads..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none transition-all ${
                dark ? "bg-[#101828] border-[#1e2a4a] text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-slate-200 text-slate-900 placeholder-gray-400 focus:border-purple-400"
              }`}
            />
          </div>
        </div>

        {/* ─── BUDDY CIRCLES & 1-ON-1 REQUESTS STREAM ─── */}
        {(selectedCategory === "all" || selectedCategory === "buddy_circle") && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold flex items-center gap-2 text-emerald-400">
                <Users className="w-4 h-4 text-emerald-400" /> Active Buddy Circles & Ephemeral 1-on-1 Requests
              </h2>
              <span className={`text-[10px] ${textMuted}`}>Auto-deletes when matched or after 48h ⏳</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buddyRequests
                .filter((r) => {
                  const hoursElapsed = (Date.now() - r.createdAt) / 3600000;
                  return !r.isFulfilled && hoursElapsed < 48; // Expire automatically after 48h
                })
                .map((req) => {
                  const hoursRemaining = Math.max(0, Math.floor(48 - (Date.now() - req.createdAt) / 3600000));
                  return (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                        dark ? "bg-gradient-to-br from-[#101828] to-[#0d1322] border-emerald-500/30" : "bg-white border-emerald-200 shadow-md"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {req.type === "1on1" ? "🤝 1-on-1 Buddy Request" : `👥 Study Pod (${req.acceptedCount}/${req.capacity} Joined)`}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                              ⏳ Expires in {hoursRemaining}h
                            </span>
                            {user?.role === "admin" && (
                              <button
                                onClick={() => {
                                  setDeleteTargetId(req.id);
                                  setDeleteTargetType("buddy");
                                  setDeleteInputText("");
                                  setDeleteErrorMsg("");
                                }}
                                className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                title="Admin Delete Buddy Request"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <h3 className="text-sm font-extrabold text-white leading-snug">{req.title}</h3>
                        <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-700"} line-clamp-2`}>{req.description}</p>

                        {/* Optional Audio Intro */}
                        {req.frenchAudioIntro && (
                          <div className={`p-2 rounded-xl border text-[11px] font-mono flex items-center justify-between ${dark ? "bg-black/40 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                            <span className="truncate italic">🇫🇷 "{req.frenchAudioIntro}"</span>
                            <button
                              onClick={() => {
                                if (!window.speechSynthesis) return;
                                window.speechSynthesis.cancel();
                                const u = new SpeechSynthesisUtterance(req.frenchAudioIntro!);
                                u.lang = "fr-FR";
                                u.rate = 0.9;
                                window.speechSynthesis.speak(u);
                              }}
                              className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50 text-[10px] font-extrabold shrink-0"
                            >
                              🔊 Play
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-gray-100 text-xs">
                        <span className={`text-[11px] ${textMuted} font-bold`}>Posted by {req.authorName} ({req.targetLevel})</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActivePodWorkspace(req);
                            }}
                            className="px-2.5 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 font-bold text-xs rounded-xl transition-all"
                            title="Open Private Pod Practice Workspace"
                          >
                            💬 Workspace
                          </button>
                          <button
                            onClick={() => {
                              setConnectModalRequest(req);
                              setConnectIntroText("");
                              setConnectSuccessMsg("");
                            }}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer flex items-center gap-1"
                          >
                            ⚡ Connect & Match
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Posts Stream */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${cardBg}`}>
              <MessageSquare className="w-10 h-10 text-purple-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">No candidate threads in this category yet.</p>
              <p className={`text-xs ${textMuted} mt-1`}>Be the first to share an exam debrief or study roadmap!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5.5 rounded-2xl border transition-all ${cardBg}`}
              >
                {/* Author Bar */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${post.avatarBg} flex items-center justify-center text-white font-extrabold text-xs shadow-md shrink-0`}>
                      {post.authorName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
                          {post.authorName}
                        </span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold ${
                          post.authorRole.includes("Academic") ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : dark ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "bg-purple-50 text-purple-700"
                        }`}>
                          {post.authorExam}
                        </span>
                      </div>
                      <span className={`text-[10px] ${textMuted}`}>{post.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${post.categoryColor}`}>
                      {post.categoryLabel}
                    </span>

                    {/* Admin 3-Dot Options Button */}
                    {user?.role === "admin" && (
                      <button
                        onClick={() => {
                          setDeleteTargetId(post.id);
                          setDeleteTargetType("post");
                          setDeleteInputText("");
                          setDeleteErrorMsg("");
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Admin Delete Thread"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Post Body */}
                <div className="space-y-2">
                  <h3 className={`text-base font-extrabold leading-snug ${dark ? "text-purple-200" : "text-purple-900"}`}>
                    {post.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {post.content}
                  </p>

                  {/* Partner Contact Handle Badge */}
                  {post.contactHandle && (
                    <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 ${dark ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
                      <span className="flex items-center gap-1.5">
                        <span>🤝 Direct Contact / Preferred Handle:</span>
                        <code className="px-2 py-0.5 rounded bg-black/30 text-amber-300 font-mono text-[11px]">{post.contactHandle}</code>
                      </span>
                    </div>
                  )}

                  {/* Optional French Snippet Box with Audio TTS */}
                  {post.frenchSnippet && (
                    <div className={`p-3 rounded-xl border text-xs font-mono italic flex items-center justify-between gap-3 ${dark ? "bg-purple-950/30 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-900"}`}>
                      <span>🇫🇷 "{post.frenchSnippet}"</span>
                      <button
                        onClick={() => {
                          if (!window.speechSynthesis) return;
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(post.frenchSnippet!);
                          u.lang = "fr-FR";
                          u.rate = 0.9;
                          window.speechSynthesis.speak(u);
                        }}
                        className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 transition-colors shrink-0 not-italic font-sans text-[11px] flex items-center gap-1 cursor-pointer"
                        title="Listen Pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t dark:border-white/10 border-gray-100 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all border ${
                        post.isUpvoted
                          ? "bg-purple-600 text-white border-purple-500 shadow"
                          : dark
                          ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes} Helpful</span>
                    </button>

                    <button
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className={`flex items-center gap-1.5 font-bold transition-all ${dark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-purple-700"}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount} Candidate Replies</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!window.speechSynthesis) return;
                        window.speechSynthesis.cancel();
                        const u = new SpeechSynthesisUtterance(post.title + ". " + post.content);
                        u.lang = "fr-FR";
                        u.rate = 0.9;
                        window.speechSynthesis.speak(u);
                      }}
                      className={`hidden sm:flex items-center gap-1 text-[11px] font-bold transition-all ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-700 hover:text-purple-900"}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        post.isBookmarked
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : dark
                          ? "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                          : "bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900"
                      }`}
                      title={post.isBookmarked ? "Remove Bookmark" : "Save Thread to Bookmarks"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${post.isBookmarked ? "fill-amber-400" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Comments Section Drawer */}
                {expandedPostId === post.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-3 border-t dark:border-white/10 border-gray-100 space-y-3">
                    <div className="space-y-2">
                      {(post.comments || []).map((c, idx) => {
                        const canDelete = user?.role === "admin" || (c.authorId && c.authorId === user?.id) || c.author.includes(user?.firstName || "____");
                        return (
                          <div key={c.id || idx} className={`p-2.5 rounded-xl text-xs space-y-1 ${dark ? "bg-black/40 border border-white/5 text-gray-300" : "bg-gray-50 border border-gray-200 text-gray-800"}`}>
                            <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold">
                              <span>{c.author}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">{c.time}</span>
                                {canDelete && (
                                  <button
                                    onClick={() => handleDeleteComment(post.id, c.id || `c-${idx}`)}
                                    className="p-0.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                    title="Delete Reply"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <p>{c.text}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                          if (!SpeechRecognition) {
                            alert("Speech recognition is not supported in this browser. You can type your reply!");
                            return;
                          }
                          try {
                            const rec = new SpeechRecognition();
                            rec.lang = "fr-FR";
                            rec.onresult = (e: any) => {
                              const txt = e.results[0][0].transcript;
                              if (txt) setCommentInput(prev => prev ? `${prev} ${txt}` : txt);
                            };
                            rec.start();
                          } catch {}
                        }}
                        className={`p-2 rounded-xl border transition-all ${
                          dark ? "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20" : "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                        }`}
                        title="Dictate French Voice Reply"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        placeholder="Reply in French or English... (Or click Mic to dictate)"
                        className={`flex-1 p-2 rounded-xl text-xs border outline-none ${
                          dark ? "bg-black/50 border-purple-500/30 text-white placeholder-gray-500" : "bg-white border-purple-200 text-gray-900 placeholder-gray-400"
                        }`}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow"
                      >
                        Reply
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-4 ${cardBg}`}>
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Share Exam Strategy or Question
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Thread Category:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    >
                      <option value="exam_debrief">🎯 Official Exam Debrief (TCF / TEF / DELF)</option>
                      <option value="study_routine">🎒 Candidate Study Roadmap & Schedule</option>
                      <option value="essay_review">✍️ Writing & Speaking Strategy / Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Thread Title:</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. TCF Canada Listening Strategy: How I reached CLB 8..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Details & Key Takeaways:</label>
                    <textarea
                      rows={4}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Share your detailed breakdown, exam experience, or specific questions..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Optional French Expression / Sentence:</label>
                    <input
                      type="text"
                      value={newFrenchSnippet}
                      onChange={(e) => setNewFrenchSnippet(e.target.value)}
                      placeholder="e.g. J'ai utilisé le connecteur 'cependant' dans ma production écrite !"
                      className={`w-full p-2.5 rounded-xl border outline-none font-mono ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-extrabold rounded-xl shadow-md"
                  >
                    Publish Thread
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CONNECT REQUEST MODAL ─── */}
        <AnimatePresence>
          {connectModalRequest && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${cardBg}`}>
                <h3 className="text-lg font-extrabold flex items-center gap-2 text-emerald-400">
                  <Users className="w-5 h-5 text-emerald-400" /> Send Ephemeral Connect Request
                </h3>

                <p className="text-xs text-gray-300">
                  Send a private intro message to <strong>{connectModalRequest.authorName}</strong> ({connectModalRequest.targetLevel}). This request auto-expires in <strong>48 hours</strong>!
                </p>

                {connectSuccessMsg ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center space-y-2">
                    <p>{connectSuccessMsg}</p>
                    <button
                      onClick={() => setConnectModalRequest(null)}
                      className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-black rounded-lg text-xs"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Your Intro Message / French Practice Intro:</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                            if (!SpeechRecognition) return;
                            try {
                              const rec = new SpeechRecognition();
                              rec.lang = "fr-FR";
                              rec.onresult = (e: any) => {
                                const txt = e.results[0][0].transcript;
                                if (txt) setConnectIntroText(prev => prev ? `${prev} ${txt}` : txt);
                              };
                              rec.start();
                            } catch {}
                          }}
                          className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                          title="Dictate French Voice Intro"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <textarea
                          rows={3}
                          value={connectIntroText}
                          onChange={(e) => setConnectIntroText(e.target.value)}
                          placeholder="e.g. Bonjour Elena ! I am also aiming for DELF B1. Available at 6 PM EST for oral drills..."
                          className={`flex-1 p-2.5 rounded-xl border outline-none ${
                            dark ? "bg-[#070B17] border-emerald-500/30 text-white" : "bg-white border-emerald-200 text-slate-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setConnectModalRequest(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Simulate matching acceptance
                          setBuddyRequests((prev) =>
                            prev.map((r) => {
                              if (r.id === connectModalRequest.id) {
                                const newCount = r.acceptedCount + 1;
                                const isFulfilled = newCount >= r.capacity;
                                return {
                                  ...r,
                                  acceptedCount: newCount,
                                  isFulfilled: isFulfilled,
                                  acceptedUsers: [...r.acceptedUsers, user?.firstName || "Candidate"],
                                };
                              }
                              return r;
                            })
                          );
                          setConnectSuccessMsg(
                            connectModalRequest.type === "1on1"
                              ? "⚡ Connect Request Sent! Post automatically FULFILLED and auto-removed from feed!"
                              : `⚡ Joined Study Pod! (${connectModalRequest.acceptedCount + 1}/${connectModalRequest.capacity} slots filled)`
                          );
                        }}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black rounded-xl shadow-md"
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CREATE BUDDY REQUEST MODAL ─── */}
        <AnimatePresence>
          {showBuddyModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-4 ${cardBg}`}>
                <h3 className="text-lg font-extrabold flex items-center gap-2 text-emerald-400">
                  <Users className="w-5 h-5 text-emerald-400" /> Create Buddy / Study Pod Request
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Request Type:</label>
                      <select
                        value={buddyType}
                        onChange={(e) => {
                          const t = e.target.value as any;
                          setBuddyType(t);
                          if (t === "1on1") setBuddyCapacity(1);
                          else setBuddyCapacity(4);
                        }}
                        className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                          dark ? "bg-[#070B17] border-emerald-500/30 text-white" : "bg-white border-emerald-200 text-slate-900"
                        }`}
                      >
                        <option value="1on1">🤝 1-on-1 Speaking Partner</option>
                        <option value="group">👥 Small Group Study Pod</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Member Capacity:</label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={buddyCapacity}
                        onChange={(e) => setBuddyCapacity(parseInt(e.target.value) || 1)}
                        disabled={buddyType === "1on1"}
                        className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                          dark ? "bg-[#070B17] border-emerald-500/30 text-white" : "bg-white border-emerald-200 text-slate-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Target Exam & Level:</label>
                    <input
                      type="text"
                      value={buddyTargetLevel}
                      onChange={(e) => setBuddyTargetLevel(e.target.value)}
                      placeholder="e.g. DELF B1 or TCF Canada CLB 7"
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-emerald-500/30 text-white" : "bg-white border-emerald-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Request Title:</label>
                    <input
                      type="text"
                      value={buddyTitle}
                      onChange={(e) => setBuddyTitle(e.target.value)}
                      placeholder="e.g. Looking for 1 partner for 20-min daily monologue practice..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-emerald-500/30 text-white" : "bg-white border-emerald-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Details & Schedule Availability:</label>
                    <textarea
                      rows={3}
                      value={buddyDesc}
                      onChange={(e) => setBuddyDesc(e.target.value)}
                      placeholder="e.g. Available weekdays 6-7 PM EST. Focusing on speaking roleplays..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Optional French Audio Intro Sentence:</label>
                    <input
                      type="text"
                      value={buddyAudioIntro}
                      onChange={(e) => setBuddyAudioIntro(e.target.value)}
                      placeholder="e.g. Salut ! Je cherche un partenaire pour pratiquer mon oral !"
                      className={`w-full p-2.5 rounded-xl border outline-none font-mono ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowBuddyModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!buddyTitle.trim() || !buddyDesc.trim()) return;
                      const newReq: BuddyCircleRequest = {
                        id: `buddy-${Date.now()}`,
                        authorName: `${user?.firstName || "Candidate"}`,
                        authorExam: user?.learningGoal !== "none" ? `${user?.learningGoal}` : "A1-B2 Candidate",
                        targetLevel: buddyTargetLevel || "CEFR Candidate",
                        type: buddyType,
                        capacity: buddyCapacity,
                        acceptedCount: 0,
                        title: buddyTitle.trim(),
                        description: buddyDesc.trim(),
                        frenchAudioIntro: buddyAudioIntro.trim() || undefined,
                        createdAt: Date.now(),
                        isFulfilled: false,
                        acceptedUsers: [],
                      };
                      setBuddyRequests([newReq, ...buddyRequests]);
                      setShowBuddyModal(false);
                      setBuddyTitle("");
                      setBuddyDesc("");
                      setBuddyAudioIntro("");
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black rounded-xl shadow-md"
                  >
                    Publish Buddy Request
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── ADMIN DELETE CONFIRMATION MODAL ─── */}
        <AnimatePresence>
          {deleteTargetId && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${cardBg}`}>
                <div className="flex items-center gap-2 text-red-400">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-extrabold text-red-400">Confirm Admin Deletion</h3>
                </div>

                <p className="text-xs text-gray-300">
                  Are you sure you want to permanently delete this {deleteTargetType === "post" ? "thread" : "buddy request"}? To confirm, type <strong className="text-red-400 font-mono font-bold">delete</strong> below:
                </p>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={deleteInputText}
                    onChange={(e) => {
                      setDeleteInputText(e.target.value);
                      setDeleteErrorMsg("");
                    }}
                    placeholder="Type 'delete' to confirm..."
                    className={`w-full p-2.5 rounded-xl border outline-none font-mono text-xs ${
                      dark ? "bg-[#070B17] border-red-500/40 text-white placeholder-gray-500" : "bg-white border-red-300 text-slate-900"
                    }`}
                  />
                  {deleteErrorMsg && <p className="text-[11px] text-red-400 font-bold">{deleteErrorMsg}</p>}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setDeleteTargetId(null);
                      setDeleteInputText("");
                      setDeleteErrorMsg("");
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (deleteInputText.trim().toLowerCase() !== "delete") {
                        setDeleteErrorMsg("You must type 'delete' exactly to confirm deletion.");
                        return;
                      }

                      if (deleteTargetType === "post") {
                        setPosts((prev) => prev.filter((p) => p.id !== deleteTargetId));
                      } else {
                        setBuddyRequests((prev) => prev.filter((b) => b.id !== deleteTargetId));
                      }

                      setDeleteTargetId(null);
                      setDeleteInputText("");
                      setDeleteErrorMsg("");
                    }}
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm Permanent Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── ACTIVE PRIVATE POD WORKSPACE MODAL ─── */}
        <AnimatePresence>
          {activePodWorkspace && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-4 ${cardBg} max-h-[90vh] flex flex-col justify-between`}>
                
                {/* Header */}
                <div className="flex items-center justify-between border-b dark:border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-purple-300">{activePodWorkspace.title}</h3>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Active 30-Day Pod
                        </span>
                      </div>
                      <p className={`text-xs ${textMuted}`}>Target: {activePodWorkspace.targetLevel} • Members: {activePodWorkspace.acceptedUsers.join(", ") || activePodWorkspace.authorName}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePodWorkspace(null)}
                    className="p-2 rounded-xl text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Quick Academic Practice Actions */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    to="/flashcards"
                    className="p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 font-bold text-purple-300 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-purple-400" /> Launch Pod Flashcard Drill
                  </Link>
                  <Link
                    to="/exam"
                    className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold text-emerald-300 flex items-center justify-center gap-2"
                  >
                    <Target className="w-4 h-4 text-emerald-400" /> Start TCF/TEF CBT Simulator
                  </Link>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[300px] space-y-2 p-3 rounded-xl dark:bg-black/50 border dark:border-white/5 bg-gray-50 border-gray-200">
                  {podMessages.map((msg) => (
                    <div key={msg.id} className="p-2.5 rounded-xl text-xs space-y-1 bg-purple-500/10 border border-purple-500/20">
                      <div className="flex items-center justify-between text-[10px] text-purple-400 font-extrabold">
                        <span>{msg.sender}</span>
                        <span className="text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-200">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Pod Message Input Bar with Voice Mic */}
                <div className="flex items-center gap-2 pt-2 border-t dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                      if (!SpeechRecognition) return;
                      try {
                        const rec = new SpeechRecognition();
                        rec.lang = "fr-FR";
                        rec.onresult = (e: any) => {
                          const txt = e.results[0][0].transcript;
                          if (txt) setPodMessageInput(prev => prev ? `${prev} ${txt}` : txt);
                        };
                        rec.start();
                      } catch {}
                    }}
                    className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                    title="Dictate French Voice Note"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={podMessageInput}
                    onChange={(e) => setPodMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && podMessageInput.trim()) {
                        setPodMessages((prev) => [
                          ...prev,
                          { id: `m-${Date.now()}`, sender: user?.firstName || "Candidate", text: podMessageInput.trim(), time: "Just now" },
                        ]);
                        setPodMessageInput("");
                      }
                    }}
                    placeholder="Send French practice note or schedule times... (Or click Mic)"
                    className={`flex-1 p-2.5 rounded-xl text-xs border outline-none ${
                      dark ? "bg-[#070B17] border-purple-500/30 text-white placeholder-gray-500" : "bg-white border-purple-200 text-slate-900"
                    }`}
                  />

                  <button
                    onClick={() => {
                      if (!podMessageInput.trim()) return;
                      setPodMessages((prev) => [
                        ...prev,
                        { id: `m-${Date.now()}`, sender: user?.firstName || "Candidate", text: podMessageInput.trim(), time: "Just now" },
                      ]);
                      setPodMessageInput("");
                    }}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl shadow"
                  >
                    Send
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
