import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/pipeline")({
  component: PipelineLayout,
});

function PipelineLayout() {
  return <Outlet />;
}
