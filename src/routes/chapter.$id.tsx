import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChapterPage } from "~/components/content/ChapterPage";

function ChapterRoute() {
  const { id } = (useParams({ strict: false }) || {}) as any;
  return <ChapterPage chapterId={id} />;
}

export const Route = createFileRoute("/chapter/$id")({
  component: ChapterRoute,
});