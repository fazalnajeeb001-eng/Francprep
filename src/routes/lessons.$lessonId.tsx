import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonRoute,
});

function LessonRoute() {
  const { lessonId } = Route.useParams() as any;
  const router = useRouter();

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