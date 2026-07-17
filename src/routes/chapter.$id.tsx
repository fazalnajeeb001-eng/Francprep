import { createFileRoute, Link } from "@tanstack/react-router";
import { ChapterPage } from "~/components/content/ChapterPage";

export const Route = createFileRoute("/chapter/$id")({
  component: ChapterRoute,
});

function ChapterRoute() {
  const { id } = Route.useParams();
  return <ChapterPage chapterId={id} />;
}