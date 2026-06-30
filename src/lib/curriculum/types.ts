// FrancPrep Curriculum — Shared Types
// CEFR-aligned types for the A1-C2 coaching syllabus

export type Skill = "reading" | "writing" | "listening" | "speaking";

export interface Exercise {
  id: string;
  title: string;
  type: "multiple-choice" | "fill-blank" | "match" | "short-answer" | "prompt" | "comprehension" | "translation" | "roleplay" | "dictation" | "correction";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  hint?: string;
  audioUrl?: string;
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  grammarFocus?: string;
  vocabularyTheme?: string;
  skills: Record<Skill, {
    summary: string;
    exercises: Exercise[];
  }>;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  concepts: Concept[];
}

export interface Level {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  chapters: Chapter[];
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";