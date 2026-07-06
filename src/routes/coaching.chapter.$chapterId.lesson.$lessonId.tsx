import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonPlayer } from "~/components/lessons/LessonPlayer";
import { greetingLesson } from "~/lib/lessons/a1-greetings";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/coaching/chapter/$chapterId/lesson/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { chapterId, lessonId } = Route.useParams();
  const { dark } = useTheme();

  if (chapterId !== "a1-1-1-1" || lessonId !== "1") {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-4xl mb-4">📖</p>
          <p className={`text-sm mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>Coming soon — more lessons are being built!</p>
          <Link to={`/coaching/chapter/${chapterId}`} className="text-purple-400 text-sm hover:underline">← Back to Chapter</Link>
        </div>
      </div>
    );
  }

  return <LessonPlayer lesson={greetingLesson} />;
}
