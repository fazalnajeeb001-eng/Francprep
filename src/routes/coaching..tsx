import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/coaching/$level")({
  component: LevelPage,
});

const API = import.meta.env.VITE_API_URL || "https://francprep-production.up.railway.app/api";

const categoryLabels: Record<string, string> = {
  reading: "📖 Reading",
  writing: "✍️ Writing",
  listening: "🎧 Listening",
  speaking: "🗣️ Speaking",
  grammar: "📐 Grammar",
  vocabulary: "📚 Vocabulary",
};

const levelTitles: Record<string, string> = {
  A1: "Beginner – Découverte",
  A2: "Elementary – Progrès",
  B1: "Intermediate – Indépendance",
  B2: "Upper-Intermediate – Autonomie",
  C1: "Advanced – Maîtrise",
  C2: "Mastery – Perfectionnement",
};

interface Lesson {
  _id: string;
  title: string;
  description: string;
  category: string;
  order: number;
  estimatedDuration: number;
  tags: string[];
}

function LevelPage() {
  const { level } = Route.useParams();
  const levelId = level.toUpperCase();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(`${API}/lessons?level=${levelId}&limit=100&sort=order`);
        const data = await res.json();
        if (data.success) {
          setLessons(data.data || []);
        } else {
          setError("Failed to load lessons");
        }
      } catch {
        setError("Unable to reach server");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [levelId]);

  // Group lessons by category
  const grouped = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    const cat = lesson.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(lesson);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-gray-500 text-lg">Loading lessons...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-red-500 text-lg">{error}</div>
        <Link to="/coaching" className="text-indigo-600 hover:underline mt-4 inline-block">← Back to levels</Link>
      </div>
    );
  }

  const totalLessons = lessons.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/coaching" className="mb-6 inline-flex items-center text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← All Levels
      </Link>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{levelId}: {levelTitles[levelId] || levelId}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {totalLessons} lessons available
        </p>
      </div>

      {totalLessons === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No lessons available for this level yet.
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, catLessons]) => (
            <div key={category} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-bold mb-1">
                {categoryLabels[category] || category}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{catLessons.length} lessons</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {catLessons.map((lesson) => (
                  <Link
                    key={lesson._id}
                    to="/coaching/$level/$concept"
                    params={{ level: level.toLowerCase(), concept: lesson._id }}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm dark:border-gray-800 dark:bg-gray-800 dark:hover:border-indigo-800 dark:hover:bg-gray-800"
                  >
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{lesson.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span>⏱ {lesson.estimatedDuration} min</span>
                      {lesson.tags?.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="truncate">{lesson.tags.slice(0, 2).join(", ")}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}