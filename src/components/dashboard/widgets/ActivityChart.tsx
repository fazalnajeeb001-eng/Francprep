import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { DashboardData } from "../types";

export function ActivityChart({ activities, dark }: { activities: DashboardData["weeklyActivity"]; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>📈 Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={activities} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: dark ? "#6B7280" : "#9CA3AF" }} />
          <Tooltip contentStyle={{ background: dark ? "#101828" : "#fff", border: "none", borderRadius: 12, color: dark ? "#fff" : "#000", fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
            formatter={(v: number) => [`${v}m`, "Study Time"]} />
          <Bar dataKey="minutes" radius={[6, 6, 0, 0]} maxBarSize={28}>
            {activities.map((_, i) => (
              <Cell key={i} fill={i === activities.length - 1 ? "#7C3AED" : dark ? "#1e2a4a" : "#d1d5db"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
