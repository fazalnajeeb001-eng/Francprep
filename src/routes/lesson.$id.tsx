import { createFileRoute, useRouter, useParams } from "@tanstack/react-router";
import { LessonPage } from "~/components/content/LessonPage";

function LessonRoute() {
  const { id } = (useParams({ strict: false }) || {}) as any;
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.history.back();
    } else {
      router.navigate({ to: "/learn" });
    }
  };

  return <LessonPage lessonId={id} onBack={handleBack} />;
}

export const Route = createFileRoute("/lesson/$id")({
  component: LessonRoute,
});
