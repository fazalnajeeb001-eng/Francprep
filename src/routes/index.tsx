import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) return;
    navigate({ to: isAuthenticated ? "/dashboard" : "/login" });
  }, [isAuthenticated, isLoading, navigate]);
  return null;
}
