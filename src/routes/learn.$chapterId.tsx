import { createFileRoute, Link } from "@tanstack/react-router";
import { ChapterPage } from "~/components/content/ChapterPage";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/learn/$chapterId")({
  component: ChapterRoute,
});

function ChapterRoute() {
  const { chapterId } = Route.useParams();
  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50">
      <div className="sticky top-0 z-30 dark:bg-[#070B17]/80 bg-white/80 backdrop-blur-xl border-b dark:border-[#1e2a4a] border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-3">
          <Link to="/learn" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 dark:text-gray-400 text-gray-600" />
          </Link>
          <span className="text-sm dark:text-gray-400 text-gray-500">Back to chapters</span>
        </div>
      </div>
      <ChapterPage chapterId={chapterId} />
    </div>
  );
}
