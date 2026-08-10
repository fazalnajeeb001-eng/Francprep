import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { LandingPage } from "~/components/landing/LandingPage";

function IndexPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [user, isLoading, navigate]);

  return <LandingPage />;
}

export const Route = createFileRoute("/")({
  component: IndexPage,
});
