// FrancPrep Curriculum — All levels combined
export type { CEFRLevel, Level, Chapter, Concept, Skill, Exercise } from "./types";
export { getExerciseCountByLevel, getLevelSummary, getAllExercises } from "./utils";

import { a1 } from "./a1";
import { a2 } from "./a2";
import { b1 } from "./b1";
import { b2 } from "./b2";
import { c1 } from "./c1";
import { c2 } from "./c2";
import type { CEFRLevel, Level } from "./types";

export const curriculum: Record<CEFRLevel, Level> = { A1: a1, A2: a2, B1: b1, B2: b2, C1: c1, C2: c2 };

export const cefrLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function getLevel(levelId: CEFRLevel): Level {
  return curriculum[levelId];
}

export function getChapter(levelId: CEFRLevel, chapterId: string) {
  const level = curriculum[levelId];
  return level.chapters.find(c => c.id === chapterId) ?? null;
}

export function getConcept(levelId: CEFRLevel, chapterId: string, conceptId: string) {
  const chapter = getChapter(levelId, chapterId);
  if (!chapter) return null;
  return chapter.concepts.find(c => c.id === conceptId) ?? null;
}