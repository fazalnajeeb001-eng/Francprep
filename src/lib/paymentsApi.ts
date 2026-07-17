import { apiFetch } from "~/lib/apiFetch";

export interface Plan {
  name: string;
  price: number;
  features: string[];
}

export interface Subscription {
  tier: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export async function getPlans(): Promise<Record<string, Plan>> {
  const res = await apiFetch("/payments/plans");
  if (!res.ok) throw new Error("Failed to fetch plans");
  const json = await res.json();
  return json.data;
}

export async function createCheckout(tier: "premium" | "exam_prep"): Promise<{ sessionId: string; url: string }> {
  const res = await apiFetch("/payments/checkout", {
    method: "POST",
    body: JSON.stringify({ tier }),
  });
  if (!res.ok) throw new Error("Failed to create checkout");
  const json = await res.json();
  return json.data;
}

export async function createPortal(): Promise<{ url: string }> {
  const res = await apiFetch("/payments/portal", {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to create portal");
  const json = await res.json();
  return json.data;
}

export async function getSubscription(): Promise<Subscription> {
  const res = await apiFetch("/payments/subscription");
  if (!res.ok) throw new Error("Failed to fetch subscription");
  const json = await res.json();
  return json.data;
}
