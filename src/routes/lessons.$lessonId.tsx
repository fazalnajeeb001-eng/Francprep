import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonRoute,
});

function LessonRoute() {
  const { lessonId } = Route.useParams();
  const { history } = useRouter();

  return <LessonPage lessonId={lessonId} onBack={() => history.back()} />;
}