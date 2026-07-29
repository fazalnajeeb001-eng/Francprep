import { createFileRoute, useRouter, Navigate } from "@tanstack/react-router";
import { useAuth } from "~/lib/AuthContext";
import { LessonPage } from "~/components/content/LessonPage";
import { motion } from "framer-motion";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonRoute,
});

function LessonRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { lessonId } = Route.useParams() as any;
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleBack = () => {
    try {
      if (router?.history) router.history.back();
      else window.history.back();
    } catch {
      window.history.back();
    }
  };

  return <LessonPage lessonId={lessonId} onBack={handleBack} />;
}