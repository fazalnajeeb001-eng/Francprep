import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, LayoutDashboard, Settings } from "lucide-react";

const navGroups = [
  { section: "School", items: [
    { label: "Lessons", icon: BookOpen, href: "/learn" },
  ]},
  { section: "Exam Simulator", items: [
    { label: "TCF / TEF", icon: LayoutDashboard, href: "/exam" },
  ]},
  { section: "Plan", items: [
    { label: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
  ]},
  { section: "Account", items: [
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
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
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-lg font-bold">FrancPrep</span>
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
                      dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
