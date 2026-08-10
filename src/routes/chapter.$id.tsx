import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChapterPage } from "~/components/content/ChapterPage";

export const Route = createFileRoute("/chapter/$id")({
  component: ChapterRoute,
});

function ChapterRoute() {
  const { id } = (useParams({ strict: false }) || {}) as any;
  return <ChapterPage chapterId={id} />;
}