/**
 * 🇨🇦 Official TEF Canada Exam Schema & Typologies
 * Governed strictly by CCI Paris Île-de-France (Le français des affaires)
 * Standards for Compréhension Orale (40 Questions / 40 Minutes)
 */

export type TefListeningTypology =
  | "DESSINS"           // Q1-Q4: Conversations de la vie quotidienne avec 4 dessins (A1-A2)
  | "MESSAGES"          // Q5-Q12: Messages sur répondeur & annonces publiques (A2-B1)
  | "MICRO_TROTTOIR"    // Q13-Q18: Sondages d'opinion / micro-trottoirs (4-6 intervenants) (B1-B2)
  | "RADIO"             // Q19-Q28: Émissions de radio, chroniques & flashes d'information (B2)
  | "GRAND_ENTRETIEN"   // Q29-Q34: Entretiens approfondis & débats spécialisés (B2/C1)
  | "REPORTAGE_DEBAT"   // Q35-Q37: Reportages sociétaux, chroniques de fond & controverses (B2/C1)
  | "DISCRIMINATION";   // Q38-Q40: Discrimination phonétique fine & actes de parole (C1/C2)

export type TefLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface TefListeningItem {
  id: string;
  paperNumber: number;
  questionNumber: number; // 1 to 40
  typology: TefListeningTypology;
  level: TefLevel;
  title: string;
  speakingRate: number; // e.g. 0.90 for A1 to 1.15 for C2
  prepTimeSeconds: number; // e.g. 10s to 20s
  answerTimeSeconds: number; // e.g. 15s to 25s
  
  // Spoken Document
  audioFr: string;
  audioEn: string;
  speakerCount: number;
  speakers?: string[]; // e.g. ["Annonceur", "Passant 1", "Passant 2"]
  
  // Question Prompt
  questionFr: string;
  questionEn: string;
  
  // 4 Options
  optionsFr: [string, string, string, string];
  optionsEn: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  
  // Visuals (Exclusively for DESSINS Q1-Q4 in authentic e-TEF)
  mainImage?: string;
  optionImages?: [string, string, string, string];
  
  // Audio Vault Pre-cached Asset
  audioUrl?: string;
}

export interface TefExamSection {
  type: "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";
  title: string;
  durationMins: number;
  totalQuestions: number;
  questions?: TefListeningItem[];
}

export interface TefExamPaper {
  id: string;
  paperNumber: number;
  title: string;
  code: string;
  type: "TEF_CANADA";
  mode: "EXAM" | "PRACTICE";
  totalDurationMins: number; // 175 mins for full exam
  sections: TefExamSection[];
}
