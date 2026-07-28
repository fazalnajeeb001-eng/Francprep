import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/lesson/$id")({
  component: LessonRoute,
});

function LessonRoute() {
  const { id } = Route.useParams() as any;
  const router = useRouter();

  const handleBack = () => {
    try {
      if (router?.history) router.history.back();
      else window.history.back();
    } catch {
      window.history.back();
    }
  };

  return <LessonPage lessonId={id} onBack={handleBack} />;
}
