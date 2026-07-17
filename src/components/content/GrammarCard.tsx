import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Info, AlertTriangle, Lightbulb, BookOpen, Globe } from "lucide-react";

interface GrammarItem {
  title: string;
  explanation: string;
  examples: { french: string; english: string }[];
  calloutType?: "grammar" | "vocabulary" | "culture" | "tip" | "warning";
}

const calloutStyles: Record<string, { bg: string; border: string; icon: any; accent: string }> = {
  grammar: { bg: "bg-purple-50", border: "border-purple-200", icon: BookOpen, accent: "text-purple-600" },
  vocabulary: { bg: "bg-blue-50", border: "border-blue-200", icon: BookOpen, accent: "text-blue-600" },
  culture: { bg: "bg-amber-50", border: "border-amber-200", icon: Globe, accent: "text-amber-600" },
  tip: { bg: "bg-emerald-50", border: "border-emerald-200", icon: Lightbulb, accent: "text-emerald-600" },
  warning: { bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, accent: "text-red-600" },
};

export function GrammarCard({ item }: { item: GrammarItem }) {
  const [open, setOpen] = useState(false);
  const style = calloutStyles[item.calloutType || "grammar"];
  const Icon = style.icon;

  return (
    <div className={`rounded-2xl ${style.bg} border ${style.border} overflow-hidden transition-all`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${style.accent}`} />
          <span className={`text-sm font-semibold ${style.accent}`}>{item.title}</span>
        </div>
        {open ? <ChevronUp className={`w-4 h-4 ${style.accent}`} /> : <ChevronDown className={`w-4 h-4 ${style.accent}`} />}
      </button>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">{item.explanation}</p>
          {item.examples?.map((ex, i) => (
            <div key={i} className="bg-white/60 rounded-xl p-3 mb-2 border border-white">
              <p className="text-sm font-medium text-gray-900">{ex.french}</p>
              <p className="text-xs text-gray-500 mt-0.5">{ex.english}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function CalloutBox({ type, title, children }: { type: "grammar" | "vocabulary" | "culture" | "tip" | "warning"; title: string; children: React.ReactNode }) {
  const style = calloutStyles[type];
  const Icon = style.icon;
  return (
    <div className={`rounded-2xl ${style.bg} border ${style.border} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${style.accent}`} />
        <span className={`text-sm font-semibold ${style.accent}`}>{title}</span>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}