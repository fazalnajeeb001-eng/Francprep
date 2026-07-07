import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonPlayer } from "~/components/lessons/LessonPlayer";
import { lessons } from "~/lib/lessons/a1-greetings";
export const Route = createFileRoute("/lesson/2")({
  component: () => <LessonPlayer lesson={lessons["2"]} />,
});
