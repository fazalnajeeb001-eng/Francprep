import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown, LayoutDashboard, BookOpen, FileText, Headphones, Mic, PenTool, Languages, Sparkles, GraduationCap, Award, Calendar, Settings, HelpCircle, BarChart3 } from "lucide-react";

const navGroups = [
  { section: "School", items: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
    { label: "My Level", icon: BarChart3, href: "/coaching" },
    { label: "Lessons", icon: BookOpen, href: "/coaching" },
    { label: "Vocabulary", icon: BookOpen, href: "/coaching" },
    { label: "Grammar", icon: Languages, href: "/coaching" },
    { label: "Reading", icon: FileText, href: "/coaching" },
    { label: "Listening", icon: Headphones, href: "/coaching" },
    { label: "Speaking", icon: Mic, href: "/coaching" },
    { label: "Writing", icon: PenTool, href: "/coaching" },
  ]},
  { section: "Practice", items: [
    { label: "Exercises", icon: FileText, href: "/exam" },
    { label: "Mock Exams", icon: GraduationCap, href: "/exam" },
  ]},
  { section: "Exam Simulator", items: [
    { label: "TCF Canada", icon: GraduationCap, href: "/exam" },
    { label: "TEF Canada", icon: GraduationCap, href: "/exam" },
  ]},
  { section: "More", items: [
    { label: "Achievements", icon: Award, href: "#" },
    { label: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Help", icon: HelpCircle, href: "#" },
  ]},
];

export function Sidebar({ open, onClose, dark }: { open: boolean; onClose: () => void; dark: boolean }) {
  const bg = dark ? "bg-[#070B17]/95" : "bg-white/95";
  const border = dark ? "border-[#1e2a4a]" : "border-gray-200";
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-64 ${bg} backdrop-blur-xl border-r ${border} flex flex-col transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className={`p-5 border-b ${border}`}>
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">F</div>
            <span className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>FrancPrep</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {navGroups.map((g) => (
            <div key={g.section}>
              <p className={`text-[10px] font-semibold tracking-widest uppercase ${dark ? "text-purple-400" : "text-purple-600"} px-3 mb-1`}>{g.section}</p>
              <div className="space-y-0.5">
                {g.items.map((item) => (
                  <Link key={item.label} to={item.href as any}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                      item.active
                        ? dark ? "bg-purple-500/20 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]" : "bg-purple-100 text-purple-700 border border-purple-200"
                        : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={`p-3 border-t ${border}`}>
          <div className={`${dark ? "bg-gradient-to-br from-purple-900/50 to-pink-900/30" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-4 text-center`}>
            <Crown className="w-8 h-8 mx-auto text-amber-400" />
            <p className={`text-xs font-semibold mt-1 ${dark ? "text-gray-200" : "text-gray-700"}`}>Go Premium</p>
            <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mb-2`}>Unlock all features</p>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all">Upgrade Now</button>
          </div>
        </div>
      </aside>
    </>
  );
}
