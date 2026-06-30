// FrancPrep Curriculum — Utility functions
import type { CEFRLevel, Level, Concept, Skill, Exercise } from "./types";

/**
 * Get total exercise count per level
 */
export function getExerciseCountByLevel(levels: Record<CEFRLevel, Level>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [levelId, level] of Object.entries(levels)) {
    let total = 0;
    for (const chapter of level.chapters) {
      for (const concept of chapter.concepts) {
        for (const data of Object.values(concept.skills)) {
          total += data.exercises.length;
        }
      }
    }
    counts[levelId] = total;
  }
  return counts;
}

/**
 * Get a summary object for a level
 */
export function getLevelSummary(levelId: CEFRLevel, levels: Record<CEFRLevel, Level>) {
  const level = levels[levelId];
  if (!level) return null;
  const conceptCount = level.chapters.reduce((sum, ch) => sum + ch.concepts.length, 0);
  const exerciseCount = level.chapters.reduce(
    (sum, ch) => sum + ch.concepts.reduce(
      (s, c) => s + Object.values(c.skills).reduce(
        (ss, sk) => ss + sk.exercises.length, 0
      ), 0
    ), 0
  );
  return {
    id: level.id,
    title: level.title,
    subtitle: level.subtitle,
    description: level.description,
    chapterCount: level.chapters.length,
    conceptCount,
    exerciseCount,
  };
}

/**
 * Flatten all exercises across all levels for quick lookup
 */
export function getAllExercises(levels: Record<CEFRLevel, Level>): { levelId: CEFRLevel; conceptId: string; skill: Skill; exercise: Exercise }[] {
  const all: { levelId: CEFRLevel; conceptId: string; skill: Skill; exercise: Exercise }[] = [];
  for (const [levelId, level] of Object.entries(levels)) {
    for (const chapter of level.chapters) {
      for (const concept of chapter.concepts) {
        for (const [skill, data] of Object.entries(concept.skills)) {
          for (const exercise of data.exercises) {
            all.push({ levelId: levelId as CEFRLevel, conceptId: concept.id, skill: skill as Skill, exercise });
          }
        }
      }
    }
  }
  return all;
}