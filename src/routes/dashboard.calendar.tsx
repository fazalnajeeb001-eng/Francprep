import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
import { useTheme } from "~/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Calendar as CalendarIcon, BookOpen, ArrowLeft, TrendingUp, Target } from "lucide-react";

export const Route = createFileRoute("/dashboard/calendar")({ component: CalendarPage });

interface DashboardData {
  streakCalendar: Array<{ date: string; count: number }>;
  stats: { streak: number; xp: number; totalStudyTime: number; hearts: number };
  weeklyActivity: Array<{ day: string; minutes: number }>;
  user: { firstName: string; lastName: string; email: string; subscriptionTier: string };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { dark } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      try {
        const res = await apiFetch("/dashboard");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user, authLoading]);

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  // Calendar math
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const studyMap = new Map<string, number>();
  if (data) data.streakCalendar.forEach((d) => studyMap.set(d.date, d.count));

  const prevMonth = () => { setCurrentMonth((m) => (m === 0 ? 11 : m - 1)); if (currentMonth === 0) setCurrentYear((y) => y - 1); };
  const nextMonth = () => { setCurrentMonth((m) => (m === 11 ? 0 : m + 1)); if (currentMonth === 11) setCurrentYear((y) => y + 1); };

  const days: (string | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  }

  const getActivity = (dateStr: string) => studyMap.get(dateStr) || 0;
  const getColor = (count: number) => {
    if (count === 0) return dark ? "bg-[#1e2a4a]" : "bg-gray-200";
    if (count <= 2) return "bg-purple-500/30";
    if (count <= 4) return "bg-purple-500/60";
    return "bg-purple-500";
  };

  if (authLoading || loading) return (
    <div className="min-h-screen bg-[#070B17] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className={`${txtSec} hover:text-purple-400 text-sm transition-colors`}>← Dashboard</Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Study Calendar</h1>
          </div>
          {data && (
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"}`}>
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-amber-500 font-bold text-sm">{data.stats.streak} day streak</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"}`}>
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-sm">{data.stats.xp} XP</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Flame className="w-4 h-4 text-amber-400" />, label: "Current Streak", value: `${data?.stats.streak || 0} days`, color: "from-amber-500 to-orange-500" },
            { icon: <CalendarIcon className="w-4 h-4 text-purple-400" />, label: "This Month", value: `${days.filter((d) => d && getActivity(d) > 0).length} days`, color: "from-purple-500 to-pink-500" },
            { icon: <Target className="w-4 h-4 text-emerald-400" />, label: "Total Study", value: `${Math.floor((data?.stats.totalStudyTime || 0) / 60)}h`, color: "from-emerald-500 to-teal-500" },
            { icon: <BookOpen className="w-4 h-4 text-blue-400" />, label: "Best Streak", value: `${data?.stats.streak || 0} days`, color: "from-blue-500 to-cyan-500" },
          ].map((stat) => (
            <div key={stat.label} className={`${card} backdrop-blur-lg border rounded-2xl p-4 transition-colors`}>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>{stat.icon}</div>
              <p className={`text-xs ${txtSec}`}>{stat.label}</p>
              <p className={`text-lg font-bold mt-0.5 ${dark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Calendar Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`${card} backdrop-blur-lg border rounded-2xl p-5 md:p-6 transition-colors`}>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className={`p-2 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`} aria-label="Previous month">
              <ChevronLeft className={`w-5 h-5 ${txtSec}`} />
            </button>
            <h2 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>{MONTHS[currentMonth]} {currentYear}</h2>
            <button onClick={nextMonth} className={`p-2 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`} aria-label="Next month">
              <ChevronRight className={`w-5 h-5 ${txtSec}`} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className={`text-center text-[10px] font-semibold ${txtSec} py-1`}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dateStr, i) => (
              <div key={i} className="aspect-square">
                {dateStr ? (
                  <button onClick={() => setSelectedDay(selectedDay === dateStr ? null : dateStr)}
                    className={`w-full h-full rounded-xl flex flex-col items-center justify-center text-sm transition-all ${
                      selectedDay === dateStr
                        ? "bg-purple-500 text-white ring-2 ring-purple-500 ring-offset-2 ring-offset-[#101828]"
                        : dateStr === today
                        ? `${dark ? "bg-purple-500/20 border border-purple-500/30" : "bg-purple-100 border border-purple-200"} text-purple-400`
                        : getActivity(dateStr) > 0
                        ? `${getColor(getActivity(dateStr))} ${dark ? "text-white" : "text-gray-900"}`
                        : `${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`
                    }`}
                    aria-label={`${dateStr}${getActivity(dateStr) > 0 ? `, ${getActivity(dateStr)} activities` : ""}`}
                  >
                    <span className="text-xs font-medium">{dateStr.split("-")[2]}</span>
                    {getActivity(dateStr) > 0 && <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-purple-400" />}
                  </button>
                ) : <div />}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-gray-500">
            <span>Less</span>
            <div className={`w-3 h-3 rounded-sm ${dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`} />
            <div className="w-3 h-3 rounded-sm bg-purple-500/30" />
            <div className="w-3 h-3 rounded-sm bg-purple-500/60" />
            <div className="w-3 h-3 rounded-sm bg-purple-500" />
            <span>More</span>
          </div>
        </motion.div>

        {/* Selected Day Detail */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className={`${card} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
                  📅 {new Date(selectedDay + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </h3>
                <span className={`text-xs px-3 py-1 rounded-full ${getActivity(selectedDay) > 0 ? "bg-purple-500/20 text-purple-400" : "bg-gray-800 text-gray-500"}`}>
                  {getActivity(selectedDay) > 0 ? `${getActivity(selectedDay)} activities` : "No activity"}
                </span>
              </div>
              {getActivity(selectedDay) > 0 ? (
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                  <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>You studied on this day! Keep up the great work! 🎉</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-amber-400 font-semibold">Streak maintained!</span>
                  </div>
                </div>
              ) : (
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                  <p className={`text-sm ${txtSec}`}>No study activity recorded on this day.</p>
                  <p className="text-xs text-gray-500 mt-1">Complete a lesson to add activity to your calendar!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Activity Summary */}
        {data && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`${card} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
            <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>📊 This Week</h3>
            <div className="flex items-end gap-3 h-20">
              {data.weeklyActivity.map((a) => {
                const max = Math.max(...data.weeklyActivity.map((w) => w.minutes), 1);
                return (
                  <div key={a.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all"
                      style={{ height: `${(a.minutes / max) * 100}%`, minHeight: a.minutes > 0 ? "4px" : "2px" }} />
                    <span className={`text-[10px] ${txtSec}`}>{a.day}</span>
                    <span className="text-[8px] text-gray-600">{a.minutes}m</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}