import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/lesson/$id")({
  component: LessonRoute,
});

function LessonRoute() {
  const { id } = Route.useParams() as any;
  const { history } = useRouter();

  return <LessonPage lessonId={id} onBack={() => history.back()} />;
}
