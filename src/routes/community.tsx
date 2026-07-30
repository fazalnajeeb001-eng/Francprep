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
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  Share2,
  TrendingUp,
  Tag,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/community")({
  component: CommunityForumPage,
});

interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  authorLevel: string;
  avatarBg: string;
  category: "journey" | "milestone" | "question" | "tips";
  categoryLabel: string;
  categoryColor: string;
  title: string;
  content: string;
  frenchText?: string;
  upvotes: number;
  commentsCount: number;
  timestamp: string;
  isUpvoted?: boolean;
  comments?: { author: string; text: string; time: string }[];
}

const CATEGORIES = [
  { id: "all", label: "🔥 All Posts" },
  { id: "journey", label: "🎒 Student Journeys" },
  { id: "milestone", label: "🎉 Milestones & Exam Passes" },
  { id: "question", label: "❓ Grammar & Prep Q&A" },
  { id: "tips", label: "💡 Study Tips & Advice" },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    authorName: "Sarah M.",
    authorRole: "Student",
    authorLevel: "A2 Level",
    avatarBg: "from-pink-500 to-rose-600",
    category: "milestone",
    categoryLabel: "🎉 Milestone Passed",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "Just completed Chapter 1 Capstone Exam with 95%! Here is what helped me:",
    content: "Honestly, the Flashcards Vault and the Cheat Sheet summaries made a massive difference. For anyone starting A1 Chapter 1, make sure you memorize the subject pronouns and the irregular verbs 'Être' and 'Avoir' early!",
    frenchText: "J'ai réussi l'examen du chapitre 1 ! Je suis très heureuse !",
    upvotes: 24,
    commentsCount: 5,
    timestamp: "2 hours ago",
    comments: [
      { author: "Marc D. (A1)", text: "Félicitations Sarah ! How long did it take you to finish Chapter 1?", time: "1 hour ago" },
      { author: "Sarah M.", text: "Thanks Marc! It took me about 4 days studying 30 mins a day.", time: "45 mins ago" },
    ],
  },
  {
    id: "post-2",
    authorName: "Jean-Luc (Admin / Instructor)",
    authorRole: "Admin",
    authorLevel: "Native Instructor",
    avatarBg: "from-purple-500 to-indigo-600",
    category: "tips",
    categoryLabel: "💡 Instructor Tip",
    categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    title: "TCF / TEF Canada Strategy: Don't translate in your head!",
    content: "When listening to native dialogues, try to visualize the context instead of translating word-for-word into English. Think in chunks! For example, treat 'Je vais prendre' as a single action chunk rather than 3 separate words.",
    frenchText: "Pensez en français, ne traduisez pas chaque mot !",
    upvotes: 42,
    commentsCount: 8,
    timestamp: "5 hours ago",
  },
  {
    id: "post-3",
    authorName: "Amara K.",
    authorRole: "Student",
    authorLevel: "TCF Candidate",
    avatarBg: "from-amber-500 to-orange-600",
    category: "journey",
    categoryLabel: "🎒 Student Journey",
    categoryColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "My 30-Day TCF Canada Routine (Aiming for NCLC 7)",
    content: "Day 12 update: Doing 1 lesson per day on FrancPrep + reviewing 20 cards in the Flashcard Vault every morning before work. My confidence in French listening has doubled!",
    upvotes: 19,
    commentsCount: 3,
    timestamp: "Yesterday",
  },
  {
    id: "post-4",
    authorName: "David L.",
    authorRole: "Student",
    authorLevel: "A1 Beginner",
    avatarBg: "from-cyan-500 to-blue-600",
    category: "question",
    categoryLabel: "❓ Question",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "When to use 'Tu' vs 'Vous' in everyday conversation?",
    content: "I keep getting confused when practicing dialogues. Is 'Vous' strictly for elders and strangers, or should I use it in shops as well?",
    frenchText: "Quand faut-il utiliser 'tu' ou 'vous' ?",
    upvotes: 11,
    commentsCount: 4,
    timestamp: "2 days ago",
  },
];

function CommunityForumPage() {
  const { user } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSocialEnabled, setIsSocialEnabled] = useState<boolean | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // New Post Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFrenchText, setNewFrenchText] = useState("");
  const [newCategory, setNewCategory] = useState<Post["category"]>("journey");

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
      journey: "🎒 Student Journey",
      milestone: "🎉 Milestone Passed",
      question: "❓ Question",
      tips: "💡 Study Tip",
    };

    const catColorMap: Record<string, string> = {
      journey: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      milestone: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      question: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      tips: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: `${user?.firstName || "Student"} ${user?.lastName ? user.lastName[0] + "." : ""}`,
      authorRole: user?.role === "admin" ? "Admin" : "Student",
      authorLevel: user?.learningGoal !== "none" ? `${user?.learningGoal} Candidate` : "A1 Level",
      avatarBg: user?.role === "admin" ? "from-purple-500 to-indigo-600" : "from-pink-500 to-rose-600",
      category: newCategory,
      categoryLabel: catLabelMap[newCategory] || "🎒 Post",
      categoryColor: catColorMap[newCategory] || "bg-purple-500/10 text-purple-400 border-purple-500/20",
      title: newTitle.trim(),
      content: newContent.trim(),
      frenchText: newFrenchText.trim() || undefined,
      upvotes: 1,
      isUpvoted: true,
      commentsCount: 0,
      timestamp: "Just now",
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewFrenchText("");
    setShowCreateModal(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const authorName = `${user?.firstName || "Student"}`;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = p.comments || [];
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...updatedComments, { author: authorName, text: commentInput.trim(), time: "Just now" }],
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
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
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Stealth Mode Notice for Admin */}
        {user?.role === "admin" && !isSocialEnabled && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Admin Stealth Mode Active:</strong> Student Forum is currently <strong>HIDDEN from regular students</strong> until you publish it in Admin Settings!
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
                FrancPrep Student Hub
              </span>
              <h1 className={`text-xl sm:text-2xl font-extrabold ${dark ? "text-white" : "text-gray-900"} mt-0.5`}>
                🎒 Student Journeys & Community Forum
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Share Your Journey / Ask Question
          </button>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
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
              placeholder="Search forum..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none transition-all ${
                dark ? "bg-[#101828] border-[#1e2a4a] text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-slate-200 text-slate-900 placeholder-gray-400 focus:border-purple-400"
              }`}
            />
          </div>
        </div>

        {/* Posts Stream */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${cardBg}`}>
              <MessageSquare className="w-10 h-10 text-purple-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">No posts found in this topic yet.</p>
              <p className={`text-xs ${textMuted} mt-1`}>Be the first to share your learning milestone or ask a question!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border transition-all ${cardBg}`}
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
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          post.authorRole === "Admin" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : dark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}>
                          {post.authorLevel}
                        </span>
                      </div>
                      <span className={`text-[10px] ${textMuted}`}>{post.timestamp}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${post.categoryColor}`}>
                    {post.categoryLabel}
                  </span>
                </div>

                {/* Post Body */}
                <div className="space-y-2">
                  <h3 className={`text-base font-extrabold leading-snug ${dark ? "text-purple-200" : "text-purple-900"}`}>
                    {post.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {post.content}
                  </p>

                  {/* Optional French Snippet Box */}
                  {post.frenchText && (
                    <div className={`p-3 rounded-xl border text-xs font-mono italic ${dark ? "bg-purple-950/30 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-900"}`}>
                      🇫🇷 "{post.frenchText}"
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
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className={`flex items-center gap-1.5 font-bold transition-all ${dark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-purple-700"}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section Drawer */}
                {expandedPostId === post.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-3 border-t dark:border-white/10 border-gray-100 space-y-3">
                    <div className="space-y-2">
                      {(post.comments || []).map((c, idx) => (
                        <div key={idx} className={`p-2.5 rounded-xl text-xs space-y-1 ${dark ? "bg-black/40 border border-white/5 text-gray-300" : "bg-gray-50 border border-gray-200 text-gray-800"}`}>
                          <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold">
                            <span>{c.author}</span>
                            <span className="text-gray-500">{c.time}</span>
                          </div>
                          <p>{c.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        placeholder="Write a comment..."
                        className={`flex-1 p-2 rounded-xl text-xs border outline-none ${
                          dark ? "bg-black/50 border-purple-500/30 text-white placeholder-gray-500" : "bg-white border-purple-200 text-gray-900 placeholder-gray-400"
                        }`}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow"
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
                  <Sparkles className="w-5 h-5 text-purple-400" /> Share with FrancPrep Students
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Topic Category:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    >
                      <option value="journey">🎒 Student Journey & Routine</option>
                      <option value="milestone">🎉 Milestone / Passed Exam</option>
                      <option value="question">❓ Grammar or Exam Question</option>
                      <option value="tips">💡 Study Tip & Advice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Title:</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Passed Chapter 2 Capstone! Here is what helped me..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Post Details:</label>
                    <textarea
                      rows={4}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Share your experience, routine, advice, or question for fellow students..."
                      className={`w-full p-2.5 rounded-xl border outline-none ${
                        dark ? "bg-[#070B17] border-purple-500/30 text-white" : "bg-white border-purple-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Optional French Sentence (Practice):</label>
                    <input
                      type="text"
                      value={newFrenchText}
                      onChange={(e) => setNewFrenchText(e.target.value)}
                      placeholder="e.g. J'ai révisé les verbes du premier groupe aujourd'hui !"
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
                    Publish Post
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
