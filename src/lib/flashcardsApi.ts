import { apiFetch } from "~/lib/apiFetch";

export interface FlashcardReviewInput {
  cardId: string;
  lessonId: string;
  french: string;
  english: string;
  pronunciation?: string;
  quality: number; // 0-5: 0-1=fail, 2-3=hard, 4=good, 5=easy
}

export interface FlashcardProgress {
  _id: string;
  userId: string;
  cardId: string;
  lessonId: string;
  french: string;
  english: string;
  pronunciation?: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
  lastReview: string;
}

export interface FlashcardStats {
  total: number;
  due: number;
  mastered: number;
}

export async function reviewFlashcards(reviews: FlashcardReviewInput[]) {
  const res = await apiFetch("/flashcards/review", {
    method: "POST",
    body: JSON.stringify({ reviews }),
  });
  if (!res.ok) throw new Error("Failed to save review");
  return res.json();
}

export async function getDueCards(lessonId?: string): Promise<FlashcardProgress[]> {
  const path = lessonId ? `/flashcards/due?lessonId=${lessonId}` : "/flashcards/due";
  const res = await apiFetch(path);
  if (!res.ok) throw new Error("Failed to fetch due cards");
  const json = await res.json();
  return json.data;
}

export async function getAllCardProgress(lessonId?: string): Promise<FlashcardProgress[]> {
  const path = lessonId ? `/flashcards/progress?lessonId=${lessonId}` : "/flashcards/progress";
  const res = await apiFetch(path);
  if (!res.ok) throw new Error("Failed to fetch progress");
  const json = await res.json();
  return json.data;
}

export async function getFlashcardStats(): Promise<FlashcardStats> {
  const res = await apiFetch("/flashcards/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  const json = await res.json();
  return json.data;
}
