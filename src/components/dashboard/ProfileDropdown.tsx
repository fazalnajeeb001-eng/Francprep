import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props { firstName: string; dark: boolean; }

export function ProfileDropdown({ firstName, dark }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2" aria-label="User menu" aria-expanded={open}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/25">
          {firstName[0]}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""} ${dark ? "text-gray-500" : "text-gray-400"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-48 ${dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-white border-gray-200"} border rounded-2xl shadow-xl p-2 text-sm z-50`}
            onMouseLeave={() => setOpen(false)}
            role="menu"
          >
            <Link to="/dashboard/settings" className={`flex items-center gap-2 px-3 py-2 rounded-xl ${dark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`} role="menuitem">
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <button className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl ${dark ? "hover:bg-white/5 text-red-400" : "hover:bg-gray-100 text-red-500"}`} role="menuitem">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
