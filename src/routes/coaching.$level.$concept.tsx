import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/coaching/$level/$concept")({
  component: LessonPage,
});

const API = import.meta.env.VITE_API_URL || "https://francprep-production.up.railway.app/api";

interface Question {
  _id?: string;
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  points?: number;
}

interface Exercise {
  _id: string;
  title: string;
  type: string;
  instructions: string;
  questions: Question[];
  order: number;
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: string;
  level: string;
  category: string;
  order: number;
  estimatedDuration: number;
  tags: string[];
}

const typeIcons: Record<string, string> = {
  multiple_choice: "🔘",
  fill_blank: "✏️",
  matching: "🔗",
  listening: "🎧",
  writing: "✍️",
};

function LessonPage() {
  const { level, concept: lessonId } = Route.useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lesson + exercises in parallel
        const [lessonRes, exercisesRes] = await Promise.all([
          fetch(`${API}/lessons/${lessonId}`),
          fetch(`${API}/lessons/${lessonId}/exercises`),
        ]);
        const lessonData = await lessonRes.json();
        const exercisesData = await exercisesRes.json();

        if (lessonData.success) {
          setLesson(lessonData.data);
        } else {
          setError("Lesson not found");
          return;
        }

        if (exercisesData.success) {
          setExercises(exercisesData.data || []);
        }
      } catch {
        setError("Unable to reach server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lessonId]);

  const toggleAnswer = (qId: string) => {
    setShowAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-gray-500 text-lg">Loading lesson...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-red-500 text-lg">{error || "Lesson not found"}</div>
        <Link to="/coaching/$level" params={{ level }} className="text-indigo-600 hover:underline mt-4 inline-block">
          ← Back to {level.toUpperCase()}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/coaching/$level" params={{ level }} className="mb-6 inline-flex items-center text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← Back to {level.toUpperCase()}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {lesson.level} · {lesson.category}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            ⏱ {lesson.estimatedDuration} min
          </span>
        </div>
        <p className="mt-3 text-gray-600 dark:text-gray-400">{lesson.description}</p>
      </div>

      {lesson.content && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold mb-3">Lesson Content</h2>
          <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
      )}

      {exercises.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Exercises ({exercises.length})</h2>
          <div className="space-y-6">
            {exercises.map((exercise) => (
              <div key={exercise._id} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-lg">{typeIcons[exercise.type] || "📝"}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {exercise.type.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{exercise.title}</h3>
                {exercise.instructions && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{exercise.instructions}</p>
                )}
                <div className="space-y-4">
                  {exercise.questions.map((q, qi) => (
                    <div key={q._id || qi} className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                      <p className="text-sm font-medium mb-2">
                        <span className="text-gray-400 mr-2">Q{qi + 1}.</span>
                        {q.text}
                      </p>
                      {q.options && q.options.length > 0 && (
                        <div className="space-y-1.5 mb-3">
                          {q.options.map((opt, oi) => (
                            <label key={oi} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                              <input type="radio" name={`q_${exercise._id}_${qi}`} className="accent-indigo-600" />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        {q.explanation && (
                          <details className="text-xs">
                            <summary className="cursor-pointer text-gray-400 hover:text-gray-600">Explanation</summary>
                            <p className="mt-1 text-gray-500">{q.explanation}</p>
                          </details>
                        )}
                        <button
                          onClick={() => toggleAnswer(q._id || `${exercise._id}_${qi}`)}
                          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          {showAnswers[q._id || `${exercise._id}_${qi}`] ? "Hide answer" : "Show answer"}
                        </button>
                      </div>
                      {showAnswers[q._id || `${exercise._id}_${qi}`] && q.correctAnswer && (
                        <div className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                          ✓ {q.correctAnswer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {exercises.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No exercises available for this lesson yet.
        </div>
      )}
    </div>
  );
}
