import type { DashboardData } from "../types";

export function CalendarHeatmap({ calendar, dark }: { calendar: DashboardData["streakCalendar"]; dark: boolean }) {
  const weeks: typeof calendar = [];
  for (let i = 0; i < calendar.length; i += 7) weeks.push(calendar.slice(i, i + 7));
  const getColor = (count: number) => {
    if (count === 0) return dark ? "bg-[#1e2a4a]" : "bg-gray-200";
    if (count <= 2) return "bg-purple-500/30";
    if (count <= 4) return "bg-purple-500/60";
    return "bg-purple-500";
  };
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>📅 Streak Calendar</h3>
      <div className="flex gap-1.5 justify-center">
        {weeks.slice(0, 4).map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => (
              <div key={d.date} className={`w-[18px] h-[18px] rounded-sm ${getColor(d.count)} transition-colors`}
                title={`${d.date}: ${d.count} activities`} role="gridcell" aria-label={`${d.date}: ${d.count} activities`} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-gray-500">
        Less
        <div className={`w-3 h-3 rounded-sm ${dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`} />
        <div className="w-3 h-3 rounded-sm bg-purple-500/30" />
        <div className="w-3 h-3 rounded-sm bg-purple-500/60" />
        <div className="w-3 h-3 rounded-sm bg-purple-500" />
        More
      </div>
    </div>
  );
}
