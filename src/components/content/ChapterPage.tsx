import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Target, ChevronRight, CheckCircle, Circle } from "lucide-react";

interface ChapterData {
  _id: string;
  title: string;
  objectives: string[];
  cefrGoals: string[];
  estimatedTime: string;
  order: number;
  lessons: {
    _id: string;
    title: string;
    order: number;
    skill: string;
    estimatedDuration: number;
  }[];
  moduleId: { title: string };
}

export function ChapterPage({ chapterId }: { chapterId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: async () => {
      const res = await apiFetch(`/chapters/${chapterId}`);
      const json = await res.json();
      return json.data as ChapterData;
    },
  });

  if (isLoading) return <div className="animate-pulse p-8"><div className="h-8 w-64 bg-gray-200 rounded mb-4" /><div className="h-4 w-96 bg-gray-200 rounded mb-8" /><div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl" />)}</div></div>;
  if (!data) return <div className="p-8 text-gray-500">Chapter not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-2 text-sm text-purple-600 font-medium">{data.moduleId?.title || ""}</div>
      <h1 className="text-3xl font-bold mb-3">{data.title}</h1>

      {/* Objectives */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 mb-6 border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-purple-500" />
          <span className="font-semibold text-sm">Chapter Objectives</span>
        </div>
        <ul className="space-y-1.5">
          {data.objectives?.map((obj, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>{obj}
            </li>
          ))}
        </ul>
        {data.estimatedTime && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.estimatedTime}</span>
          </div>
        )}
        {data.cefrGoals?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.cefrGoals.map((goal, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 bg-white/60 rounded-full border border-purple-200 text-purple-700 font-medium">
                {goal}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Lessons List */}
      <div className="space-y-2">
        {data.lessons?.sort((a, b) => a.order - b.order).map((lesson) => (
          <Link
            key={lesson._id}
            to="/lessons/$lessonId"
            params={{ lessonId: lesson._id }}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {lesson.skill || "L"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{lesson.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{lesson.estimatedDuration || 15} min</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProgressIndicator({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 font-medium">{completed}/{total}</span>
    </div>
  );
}