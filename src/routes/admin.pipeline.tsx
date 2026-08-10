import { createFileRoute, Outlet } from "@tanstack/react-router";

function PipelineLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/admin/pipeline")({
  component: PipelineLayout,
});
