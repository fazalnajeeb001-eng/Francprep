import { createFileRoute } from "@tanstack/react-router";
import { LessonPlayer } from "~/components/lessons/LessonPlayer";
import { greetingLesson } from "~/lib/lessons/a1-greetings";

export const Route = createFileRoute("/coaching/lesson")({
  component: () => <LessonPlayer lesson={greetingLesson} />,
});
