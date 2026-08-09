import { getOfficialLineArtSvg } from "./lineArtIllustrations";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: string[];
  optionImages?: string[];
  mainImage?: string;
  mainImageSvg?: string;
  hasSpokenOptions?: boolean;
  correctIndex: number;
  explanation: string;
  hint?: string;
  transcript?: string;
  transcriptEnglish?: string;
  passage?: string;
  passageEnglish?: string;
  questionInAudio?: boolean;
  perQuestionTimerSeconds?: number;
}

export interface WritingTask {
  id: string;
  taskNumber: number;
  title: string;
  prompt: string;
  wordCountMin: number;
  wordCountMax: number;
  timeLimitMins: number;
  guidedTips?: string[];
  sampleResponse?: string;
}

export interface SpeakingTask {
  id: string;
  taskNumber: number;
  title: string;
  scenario: string;
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases?: string[];
}

export interface ExamSection {
  type: SectionType;
  title: string;
  description: string;
  durationMins: number;
  totalQuestions: number;
  questions?: ExamQuestion[];
  writingTasks?: WritingTask[];
  speakingTasks?: SpeakingTask[];
}

export interface ExamPaper {
  id: string;
  title: string;
  type: ExamType;
  code: string; // e.g. "TCF-PRAC-01" or "TCF-EXAM-01"
  description: string;
  totalDurationMins: number;
  isSamplePaper: boolean;
  published: boolean;
  recommendedMode?: ExamMode;
  sections: ExamSection[];
}

// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
const LISTENING_TOPICS = [
  {
    "level": "A1",
    "title": "Annonce A1 N°1 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1000 à destination de Montréal, départ initialement prévu à 7h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 7h00",
      "Annulation complète du train N°1000",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1000 à destination de Montréal partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1000 to Montréal will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (7h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°2 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1013 à destination de Québec, départ initialement prévu à 8h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 8h15",
      "Annulation complète du train N°1013",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1013 à destination de Québec partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1013 to Québec will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (8h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°3 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1026 à destination de Ottawa, départ initialement prévu à 9h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 9h30",
      "Annulation complète du train N°1026",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1026 à destination de Ottawa partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1026 to Ottawa will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (9h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°4 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1039 à destination de Toronto, départ initialement prévu à 10h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 10h45",
      "Annulation complète du train N°1039",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1039 à destination de Toronto partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1039 to Toronto will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (10h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°5 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1052 à destination de Vancouver, départ initialement prévu à 11h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 11h00",
      "Annulation complète du train N°1052",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1052 à destination de Vancouver partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1052 to Vancouver will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (11h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°6 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1065 à destination de Gatineau, départ initialement prévu à 12h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 12h15",
      "Annulation complète du train N°1065",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1065 à destination de Gatineau partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1065 to Gatineau will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (12h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°7 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1078 à destination de Sherbrooke, départ initialement prévu à 13h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 13h30",
      "Annulation complète du train N°1078",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1078 à destination de Sherbrooke partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1078 to Sherbrooke will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (13h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°8 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1091 à destination de Laval, départ initialement prévu à 14h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 14h45",
      "Annulation complète du train N°1091",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1091 à destination de Laval partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1091 to Laval will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (14h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°9 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1104 à destination de Trois-Rivières, départ initialement prévu à 15h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 15h00",
      "Annulation complète du train N°1104",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1104 à destination de Trois-Rivières partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1104 to Trois-Rivières will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (15h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°10 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1117 à destination de Saguenay, départ initialement prévu à 16h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 16h15",
      "Annulation complète du train N°1117",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1117 à destination de Saguenay partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1117 to Saguenay will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (16h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°11 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1130 à destination de Montréal, départ initialement prévu à 17h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 17h30",
      "Annulation complète du train N°1130",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1130 à destination de Montréal partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1130 to Montréal will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (17h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°12 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1143 à destination de Québec, départ initialement prévu à 18h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 18h45",
      "Annulation complète du train N°1143",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1143 à destination de Québec partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1143 to Québec will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (18h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°13 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1156 à destination de Ottawa, départ initialement prévu à 19h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 19h00",
      "Annulation complète du train N°1156",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1156 à destination de Ottawa partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1156 to Ottawa will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (19h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°14 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1169 à destination de Toronto, départ initialement prévu à 20h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 20h15",
      "Annulation complète du train N°1169",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1169 à destination de Toronto partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1169 to Toronto will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (20h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°15 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1182 à destination de Vancouver, départ initialement prévu à 7h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 7h30",
      "Annulation complète du train N°1182",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1182 à destination de Vancouver partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1182 to Vancouver will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (7h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°16 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1195 à destination de Gatineau, départ initialement prévu à 8h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 8h45",
      "Annulation complète du train N°1195",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1195 à destination de Gatineau partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1195 to Gatineau will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (8h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°17 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1208 à destination de Sherbrooke, départ initialement prévu à 9h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 9h00",
      "Annulation complète du train N°1208",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1208 à destination de Sherbrooke partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1208 to Sherbrooke will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (9h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°18 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1221 à destination de Laval, départ initialement prévu à 10h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 10h15",
      "Annulation complète du train N°1221",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1221 à destination de Laval partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1221 to Laval will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (10h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°19 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1234 à destination de Trois-Rivières, départ initialement prévu à 11h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 11h30",
      "Annulation complète du train N°1234",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1234 à destination de Trois-Rivières partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1234 to Trois-Rivières will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (11h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°20 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1247 à destination de Saguenay, départ initialement prévu à 12h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 12h45",
      "Annulation complète du train N°1247",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1247 à destination de Saguenay partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1247 to Saguenay will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (12h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°21 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1260 à destination de Montréal, départ initialement prévu à 13h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 13h00",
      "Annulation complète du train N°1260",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1260 à destination de Montréal partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1260 to Montréal will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (13h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°22 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1273 à destination de Québec, départ initialement prévu à 14h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 14h15",
      "Annulation complète du train N°1273",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1273 à destination de Québec partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1273 to Québec will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (14h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°23 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1286 à destination de Ottawa, départ initialement prévu à 15h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 15h30",
      "Annulation complète du train N°1286",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1286 à destination de Ottawa partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1286 to Ottawa will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (15h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°24 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1299 à destination de Toronto, départ initialement prévu à 16h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 16h45",
      "Annulation complète du train N°1299",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1299 à destination de Toronto partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1299 to Toronto will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (16h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°25 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1312 à destination de Vancouver, départ initialement prévu à 17h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 17h00",
      "Annulation complète du train N°1312",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1312 à destination de Vancouver partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1312 to Vancouver will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (17h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°26 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1325 à destination de Gatineau, départ initialement prévu à 18h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 18h15",
      "Annulation complète du train N°1325",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1325 à destination de Gatineau partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1325 to Gatineau will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (18h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°27 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1338 à destination de Sherbrooke, départ initialement prévu à 19h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 19h30",
      "Annulation complète du train N°1338",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1338 à destination de Sherbrooke partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1338 to Sherbrooke will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (19h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°28 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1351 à destination de Laval, départ initialement prévu à 20h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 20h45",
      "Annulation complète du train N°1351",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1351 à destination de Laval partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1351 to Laval will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (20h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°29 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1364 à destination de Trois-Rivières, départ initialement prévu à 7h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 7h00",
      "Annulation complète du train N°1364",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1364 à destination de Trois-Rivières partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1364 to Trois-Rivières will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (7h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°30 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1377 à destination de Saguenay, départ initialement prévu à 8h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 8h15",
      "Annulation complète du train N°1377",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1377 à destination de Saguenay partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1377 to Saguenay will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (8h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°31 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1390 à destination de Montréal, départ initialement prévu à 9h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 9h30",
      "Annulation complète du train N°1390",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1390 à destination de Montréal partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1390 to Montréal will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (9h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°32 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1403 à destination de Québec, départ initialement prévu à 10h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 10h45",
      "Annulation complète du train N°1403",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1403 à destination de Québec partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1403 to Québec will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (10h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°33 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1416 à destination de Ottawa, départ initialement prévu à 11h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 11h00",
      "Annulation complète du train N°1416",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1416 à destination de Ottawa partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1416 to Ottawa will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (11h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°34 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1429 à destination de Toronto, départ initialement prévu à 12h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 12h15",
      "Annulation complète du train N°1429",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1429 à destination de Toronto partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1429 to Toronto will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (12h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°35 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1442 à destination de Vancouver, départ initialement prévu à 13h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 13h30",
      "Annulation complète du train N°1442",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1442 à destination de Vancouver partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1442 to Vancouver will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (13h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°36 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1455 à destination de Gatineau, départ initialement prévu à 14h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 14h45",
      "Annulation complète du train N°1455",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1455 à destination de Gatineau partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1455 to Gatineau will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (14h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°37 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1468 à destination de Sherbrooke, départ initialement prévu à 15h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 15h00",
      "Annulation complète du train N°1468",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1468 à destination de Sherbrooke partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1468 to Sherbrooke will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (15h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°38 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1481 à destination de Laval, départ initialement prévu à 16h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 16h15",
      "Annulation complète du train N°1481",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1481 à destination de Laval partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1481 to Laval will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (16h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°39 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1494 à destination de Trois-Rivières, départ initialement prévu à 17h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 17h30",
      "Annulation complète du train N°1494",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1494 à destination de Trois-Rivières partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1494 to Trois-Rivières will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (17h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°40 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1507 à destination de Saguenay, départ initialement prévu à 18h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 18h45",
      "Annulation complète du train N°1507",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1507 à destination de Saguenay partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1507 to Saguenay will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (18h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°41 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1520 à destination de Montréal, départ initialement prévu à 19h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 19h00",
      "Annulation complète du train N°1520",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1520 à destination de Montréal partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1520 to Montréal will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (19h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°42 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1533 à destination de Québec, départ initialement prévu à 20h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 20h15",
      "Annulation complète du train N°1533",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1533 à destination de Québec partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1533 to Québec will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (20h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°43 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1546 à destination de Ottawa, départ initialement prévu à 7h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 7h30",
      "Annulation complète du train N°1546",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1546 à destination de Ottawa partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1546 to Ottawa will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (7h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°44 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1559 à destination de Toronto, départ initialement prévu à 8h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 8h45",
      "Annulation complète du train N°1559",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1559 à destination de Toronto partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1559 to Toronto will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (8h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°45 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1572 à destination de Vancouver, départ initialement prévu à 9h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 9h00",
      "Annulation complète du train N°1572",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1572 à destination de Vancouver partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1572 to Vancouver will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (9h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°46 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1585 à destination de Gatineau, départ initialement prévu à 10h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 10h15",
      "Annulation complète du train N°1585",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1585 à destination de Gatineau partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1585 to Gatineau will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (10h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°47 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1598 à destination de Sherbrooke, départ initialement prévu à 11h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 11h30",
      "Annulation complète du train N°1598",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1598 à destination de Sherbrooke partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1598 to Sherbrooke will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (11h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°48 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1611 à destination de Laval, départ initialement prévu à 12h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 12h45",
      "Annulation complète du train N°1611",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1611 à destination de Laval partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1611 to Laval will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (12h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°49 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1624 à destination de Trois-Rivières, départ initialement prévu à 13h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 13h00",
      "Annulation complète du train N°1624",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1624 à destination de Trois-Rivières partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1624 to Trois-Rivières will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (13h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°50 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1637 à destination de Saguenay, départ initialement prévu à 14h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 14h15",
      "Annulation complète du train N°1637",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1637 à destination de Saguenay partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1637 to Saguenay will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (14h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°51 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1650 à destination de Montréal, départ initialement prévu à 15h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 15h30",
      "Annulation complète du train N°1650",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1650 à destination de Montréal partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1650 to Montréal will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (15h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°52 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1663 à destination de Québec, départ initialement prévu à 16h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 16h45",
      "Annulation complète du train N°1663",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1663 à destination de Québec partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1663 to Québec will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (16h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°53 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1676 à destination de Ottawa, départ initialement prévu à 17h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 17h00",
      "Annulation complète du train N°1676",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1676 à destination de Ottawa partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1676 to Ottawa will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (17h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°54 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1689 à destination de Toronto, départ initialement prévu à 18h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 18h15",
      "Annulation complète du train N°1689",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1689 à destination de Toronto partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1689 to Toronto will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (18h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°55 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1702 à destination de Vancouver, départ initialement prévu à 19h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 19h30",
      "Annulation complète du train N°1702",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1702 à destination de Vancouver partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1702 to Vancouver will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (19h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°56 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1715 à destination de Gatineau, départ initialement prévu à 20h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 20h45",
      "Annulation complète du train N°1715",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1715 à destination de Gatineau partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1715 to Gatineau will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (20h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°57 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1728 à destination de Sherbrooke, départ initialement prévu à 7h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 7h00",
      "Annulation complète du train N°1728",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1728 à destination de Sherbrooke partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1728 to Sherbrooke will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (7h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°58 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1741 à destination de Laval, départ initialement prévu à 8h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 8h15",
      "Annulation complète du train N°1741",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1741 à destination de Laval partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1741 to Laval will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (8h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°59 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1754 à destination de Trois-Rivières, départ initialement prévu à 9h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 9h30",
      "Annulation complète du train N°1754",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1754 à destination de Trois-Rivières partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1754 to Trois-Rivières will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (9h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°60 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1767 à destination de Saguenay, départ initialement prévu à 10h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 10h45",
      "Annulation complète du train N°1767",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1767 à destination de Saguenay partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1767 to Saguenay will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (10h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°61 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1780 à destination de Montréal, départ initialement prévu à 11h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 11h00",
      "Annulation complète du train N°1780",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1780 à destination de Montréal partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1780 to Montréal will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (11h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°62 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1793 à destination de Québec, départ initialement prévu à 12h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 12h15",
      "Annulation complète du train N°1793",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1793 à destination de Québec partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1793 to Québec will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (12h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°63 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1806 à destination de Ottawa, départ initialement prévu à 13h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 13h30",
      "Annulation complète du train N°1806",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1806 à destination de Ottawa partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1806 to Ottawa will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (13h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°64 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1819 à destination de Toronto, départ initialement prévu à 14h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 14h45",
      "Annulation complète du train N°1819",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1819 à destination de Toronto partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1819 to Toronto will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (14h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°65 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1832 à destination de Vancouver, départ initialement prévu à 15h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 15h00",
      "Annulation complète du train N°1832",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1832 à destination de Vancouver partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1832 to Vancouver will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (15h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°66 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1845 à destination de Gatineau, départ initialement prévu à 16h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 16h15",
      "Annulation complète du train N°1845",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1845 à destination de Gatineau partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1845 to Gatineau will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (16h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°67 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1858 à destination de Sherbrooke, départ initialement prévu à 17h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 17h30",
      "Annulation complète du train N°1858",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1858 à destination de Sherbrooke partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1858 to Sherbrooke will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (17h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°68 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1871 à destination de Laval, départ initialement prévu à 18h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 18h45",
      "Annulation complète du train N°1871",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1871 à destination de Laval partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1871 to Laval will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (18h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°69 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1884 à destination de Trois-Rivières, départ initialement prévu à 19h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 19h00",
      "Annulation complète du train N°1884",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1884 à destination de Trois-Rivières partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1884 to Trois-Rivières will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (19h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°70 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1897 à destination de Saguenay, départ initialement prévu à 20h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 20h15",
      "Annulation complète du train N°1897",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1897 à destination de Saguenay partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°1897 to Saguenay will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (20h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°71 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1910 à destination de Montréal, départ initialement prévu à 7h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 7h30",
      "Annulation complète du train N°1910",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1910 à destination de Montréal partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°1910 to Montréal will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (7h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°72 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1923 à destination de Québec, départ initialement prévu à 8h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 8h45",
      "Annulation complète du train N°1923",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1923 à destination de Québec partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°1923 to Québec will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (8h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°73 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1936 à destination de Ottawa, départ initialement prévu à 9h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 9h00",
      "Annulation complète du train N°1936",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1936 à destination de Ottawa partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°1936 to Ottawa will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (9h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°74 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1949 à destination de Toronto, départ initialement prévu à 10h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 10h15",
      "Annulation complète du train N°1949",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1949 à destination de Toronto partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°1949 to Toronto will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (10h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°75 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1962 à destination de Vancouver, départ initialement prévu à 11h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 11h30",
      "Annulation complète du train N°1962",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1962 à destination de Vancouver partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°1962 to Vancouver will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (11h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°76 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1975 à destination de Gatineau, départ initialement prévu à 12h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 12h45",
      "Annulation complète du train N°1975",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1975 à destination de Gatineau partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°1975 to Gatineau will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (12h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°77 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°1988 à destination de Sherbrooke, départ initialement prévu à 13h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 13h00",
      "Annulation complète du train N°1988",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°1988 à destination de Sherbrooke partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°1988 to Sherbrooke will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (13h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°78 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2001 à destination de Laval, départ initialement prévu à 14h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 14h15",
      "Annulation complète du train N°2001",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2001 à destination de Laval partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°2001 to Laval will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (14h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°79 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2014 à destination de Trois-Rivières, départ initialement prévu à 15h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 15h30",
      "Annulation complète du train N°2014",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2014 à destination de Trois-Rivières partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°2014 to Trois-Rivières will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (15h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°80 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2027 à destination de Saguenay, départ initialement prévu à 16h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 16h45",
      "Annulation complète du train N°2027",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2027 à destination de Saguenay partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°2027 to Saguenay will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (16h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°81 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2040 à destination de Montréal, départ initialement prévu à 17h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 17h00",
      "Annulation complète du train N°2040",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2040 à destination de Montréal partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°2040 to Montréal will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (17h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°82 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2053 à destination de Québec, départ initialement prévu à 18h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 18h15",
      "Annulation complète du train N°2053",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2053 à destination de Québec partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°2053 to Québec will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (18h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°83 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2066 à destination de Ottawa, départ initialement prévu à 19h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 19h30",
      "Annulation complète du train N°2066",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2066 à destination de Ottawa partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°2066 to Ottawa will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (19h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°84 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2079 à destination de Toronto, départ initialement prévu à 20h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 20h45",
      "Annulation complète du train N°2079",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2079 à destination de Toronto partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°2079 to Toronto will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (20h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°85 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2092 à destination de Vancouver, départ initialement prévu à 7h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 7h00",
      "Annulation complète du train N°2092",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2092 à destination de Vancouver partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°2092 to Vancouver will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (7h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°86 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2105 à destination de Gatineau, départ initialement prévu à 8h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 8h15",
      "Annulation complète du train N°2105",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2105 à destination de Gatineau partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°2105 to Gatineau will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (8h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°87 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2118 à destination de Sherbrooke, départ initialement prévu à 9h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 9h30",
      "Annulation complète du train N°2118",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2118 à destination de Sherbrooke partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°2118 to Sherbrooke will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (9h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°88 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2131 à destination de Laval, départ initialement prévu à 10h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 10h45",
      "Annulation complète du train N°2131",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2131 à destination de Laval partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°2131 to Laval will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (10h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°89 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2144 à destination de Trois-Rivières, départ initialement prévu à 11h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 11h00",
      "Annulation complète du train N°2144",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2144 à destination de Trois-Rivières partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°2144 to Trois-Rivières will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (11h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°90 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2157 à destination de Saguenay, départ initialement prévu à 12h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 12h15",
      "Annulation complète du train N°2157",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2157 à destination de Saguenay partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°2157 to Saguenay will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (12h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°91 à Montréal",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2170 à destination de Montréal, départ initialement prévu à 13h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 13h30",
      "Annulation complète du train N°2170",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2170 à destination de Montréal partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°2170 to Montréal will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (13h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°92 à Québec",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2183 à destination de Québec, départ initialement prévu à 14h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 14h45",
      "Annulation complète du train N°2183",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2183 à destination de Québec partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°2183 to Québec will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (14h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°93 à Ottawa",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2196 à destination de Ottawa, départ initialement prévu à 15h00, partira exceptionnellement de la voie 5. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 5 à 15h00",
      "Annulation complète du train N°2196",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2196 à destination de Ottawa partira de la voie 5.",
    "en": "Dear passengers, attention please. Train N°2196 to Ottawa will depart from platform 5.",
    "hint": "⚠️ Trap Alert: Identify departure platform (5) and time (15h00).\n🔄 Paraphrase Key: 'partira de la voie 5' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°94 à Toronto",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2209 à destination de Toronto, départ initialement prévu à 16h15, partira exceptionnellement de la voie 6. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 6 à 16h15",
      "Annulation complète du train N°2209",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2209 à destination de Toronto partira de la voie 6.",
    "en": "Dear passengers, attention please. Train N°2209 to Toronto will depart from platform 6.",
    "hint": "⚠️ Trap Alert: Identify departure platform (6) and time (16h15).\n🔄 Paraphrase Key: 'partira de la voie 6' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°95 à Vancouver",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2222 à destination de Vancouver, départ initialement prévu à 17h30, partira exceptionnellement de la voie 7. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 7 à 17h30",
      "Annulation complète du train N°2222",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2222 à destination de Vancouver partira de la voie 7.",
    "en": "Dear passengers, attention please. Train N°2222 to Vancouver will depart from platform 7.",
    "hint": "⚠️ Trap Alert: Identify departure platform (7) and time (17h30).\n🔄 Paraphrase Key: 'partira de la voie 7' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°96 à Gatineau",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2235 à destination de Gatineau, départ initialement prévu à 18h45, partira exceptionnellement de la voie 8. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 8 à 18h45",
      "Annulation complète du train N°2235",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2235 à destination de Gatineau partira de la voie 8.",
    "en": "Dear passengers, attention please. Train N°2235 to Gatineau will depart from platform 8.",
    "hint": "⚠️ Trap Alert: Identify departure platform (8) and time (18h45).\n🔄 Paraphrase Key: 'partira de la voie 8' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°97 à Sherbrooke",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2248 à destination de Sherbrooke, départ initialement prévu à 19h00, partira exceptionnellement de la voie 1. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 1 à 19h00",
      "Annulation complète du train N°2248",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2248 à destination de Sherbrooke partira de la voie 1.",
    "en": "Dear passengers, attention please. Train N°2248 to Sherbrooke will depart from platform 1.",
    "hint": "⚠️ Trap Alert: Identify departure platform (1) and time (19h00).\n🔄 Paraphrase Key: 'partira de la voie 1' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°98 à Laval",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2261 à destination de Laval, départ initialement prévu à 20h15, partira exceptionnellement de la voie 2. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 2 à 20h15",
      "Annulation complète du train N°2261",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2261 à destination de Laval partira de la voie 2.",
    "en": "Dear passengers, attention please. Train N°2261 to Laval will depart from platform 2.",
    "hint": "⚠️ Trap Alert: Identify departure platform (2) and time (20h15).\n🔄 Paraphrase Key: 'partira de la voie 2' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°99 à Trois-Rivières",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2274 à destination de Trois-Rivières, départ initialement prévu à 7h30, partira exceptionnellement de la voie 3. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 3 à 7h30",
      "Annulation complète du train N°2274",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2274 à destination de Trois-Rivières partira de la voie 3.",
    "en": "Dear passengers, attention please. Train N°2274 to Trois-Rivières will depart from platform 3.",
    "hint": "⚠️ Trap Alert: Identify departure platform (3) and time (7h30).\n🔄 Paraphrase Key: 'partira de la voie 3' specifies platform location."
  },
  {
    "level": "A1",
    "title": "Annonce A1 N°100 à Saguenay",
    "text": "Chers voyageurs, attention s'il vous plaît. Le train N°2287 à destination de Saguenay, départ initialement prévu à 8h45, partira exceptionnellement de la voie 4. Veuillez procéder à l'embarquement immédiat.",
    "opt": [
      "Départ de la voie 4 à 8h45",
      "Annulation complète du train N°2287",
      "Arrivée en retard de 2 heures",
      "Changement de destination pour Toronto"
    ],
    "ans": 0,
    "tr": "Chers voyageurs, attention s'il vous plaît. Le train N°2287 à destination de Saguenay partira de la voie 4.",
    "en": "Dear passengers, attention please. Train N°2287 to Saguenay will depart from platform 4.",
    "hint": "⚠️ Trap Alert: Identify departure platform (4) and time (8h45).\n🔄 Paraphrase Key: 'partira de la voie 4' specifies platform location."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°1 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 1 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 1 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 1 janvier à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for janvier 1 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (1 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 1 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°2 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 2 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 2 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 2 février à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for février 2 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (2 février).\n🔄 Paraphrase Key: 'confirmé pour le 2 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°3 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 3 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 3 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 3 mars à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for mars 3 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (3 mars).\n🔄 Paraphrase Key: 'confirmé pour le 3 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°4 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 4 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 4 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 4 avril à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for avril 4 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (4 avril).\n🔄 Paraphrase Key: 'confirmé pour le 4 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°5 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 5 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 5 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 5 mai à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for mai 5 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (5 mai).\n🔄 Paraphrase Key: 'confirmé pour le 5 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°6 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 6 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 6 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 6 juin à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for juin 6 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (6 juin).\n🔄 Paraphrase Key: 'confirmé pour le 6 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°7 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 7 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 7 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 7 juillet à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for juillet 7 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (7 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 7 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°8 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 8 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 8 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 8 août à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for août 8 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (8 août).\n🔄 Paraphrase Key: 'confirmé pour le 8 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°9 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 9 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 9 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 9 septembre à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for septembre 9 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (9 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 9 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°10 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 10 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 10 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 10 octobre à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for octobre 10 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (10 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 10 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°11 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 11 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 11 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 11 novembre à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for novembre 11 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (11 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 11 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°12 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 12 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 12 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 12 décembre à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for décembre 12 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (12 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 12 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°13 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 13 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 13 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 13 janvier à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for janvier 13 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (13 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 13 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°14 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 14 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 14 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 14 février à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for février 14 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (14 février).\n🔄 Paraphrase Key: 'confirmé pour le 14 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°15 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 15 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 15 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 15 mars à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for mars 15 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (15 mars).\n🔄 Paraphrase Key: 'confirmé pour le 15 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°16 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 16 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 16 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 16 avril à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for avril 16 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (16 avril).\n🔄 Paraphrase Key: 'confirmé pour le 16 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°17 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 17 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 17 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 17 mai à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for mai 17 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (17 mai).\n🔄 Paraphrase Key: 'confirmé pour le 17 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°18 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 18 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 18 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 18 juin à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for juin 18 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (18 juin).\n🔄 Paraphrase Key: 'confirmé pour le 18 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°19 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 19 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 19 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 19 juillet à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for juillet 19 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (19 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 19 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°20 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 20 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 20 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 20 août à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for août 20 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (20 août).\n🔄 Paraphrase Key: 'confirmé pour le 20 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°21 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 21 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 21 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 21 septembre à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for septembre 21 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (21 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 21 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°22 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 22 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 22 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 22 octobre à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for octobre 22 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (22 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 22 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°23 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 23 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 23 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 23 novembre à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for novembre 23 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (23 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 23 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°24 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 24 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 24 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 24 décembre à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for décembre 24 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (24 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 24 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°25 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 25 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 25 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 25 janvier à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for janvier 25 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (25 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 25 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°26 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 1 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 1 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 1 février à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for février 1 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (1 février).\n🔄 Paraphrase Key: 'confirmé pour le 1 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°27 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 2 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 2 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 2 mars à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for mars 2 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (2 mars).\n🔄 Paraphrase Key: 'confirmé pour le 2 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°28 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 3 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 3 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 3 avril à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for avril 3 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (3 avril).\n🔄 Paraphrase Key: 'confirmé pour le 3 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°29 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 4 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 4 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 4 mai à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for mai 4 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (4 mai).\n🔄 Paraphrase Key: 'confirmé pour le 4 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°30 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 5 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 5 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 5 juin à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for juin 5 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (5 juin).\n🔄 Paraphrase Key: 'confirmé pour le 5 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°31 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 6 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 6 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 6 juillet à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for juillet 6 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (6 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 6 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°32 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 7 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 7 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 7 août à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for août 7 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (7 août).\n🔄 Paraphrase Key: 'confirmé pour le 7 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°33 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 8 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 8 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 8 septembre à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for septembre 8 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (8 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 8 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°34 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 9 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 9 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 9 octobre à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for octobre 9 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (9 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 9 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°35 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 10 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 10 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 10 novembre à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for novembre 10 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (10 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 10 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°36 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 11 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 11 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 11 décembre à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for décembre 11 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (11 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 11 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°37 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 12 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 12 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 12 janvier à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for janvier 12 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (12 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 12 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°38 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 13 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 13 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 13 février à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for février 13 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (13 février).\n🔄 Paraphrase Key: 'confirmé pour le 13 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°39 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 14 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 14 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 14 mars à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for mars 14 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (14 mars).\n🔄 Paraphrase Key: 'confirmé pour le 14 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°40 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 15 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 15 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 15 avril à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for avril 15 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (15 avril).\n🔄 Paraphrase Key: 'confirmé pour le 15 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°41 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 16 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 16 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 16 mai à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for mai 16 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (16 mai).\n🔄 Paraphrase Key: 'confirmé pour le 16 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°42 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 17 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 17 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 17 juin à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for juin 17 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (17 juin).\n🔄 Paraphrase Key: 'confirmé pour le 17 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°43 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 18 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 18 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 18 juillet à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for juillet 18 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (18 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 18 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°44 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 19 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 19 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 19 août à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for août 19 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (19 août).\n🔄 Paraphrase Key: 'confirmé pour le 19 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°45 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 20 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 20 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 20 septembre à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for septembre 20 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (20 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 20 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°46 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 21 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 21 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 21 octobre à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for octobre 21 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (21 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 21 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°47 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 22 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 22 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 22 novembre à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for novembre 22 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (22 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 22 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°48 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 23 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 23 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 23 décembre à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for décembre 23 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (23 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 23 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°49 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 24 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 24 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 24 janvier à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for janvier 24 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (24 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 24 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°50 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 25 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 25 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 25 février à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for février 25 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (25 février).\n🔄 Paraphrase Key: 'confirmé pour le 25 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°51 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 1 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 1 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 1 mars à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for mars 1 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (1 mars).\n🔄 Paraphrase Key: 'confirmé pour le 1 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°52 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 2 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 2 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 2 avril à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for avril 2 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (2 avril).\n🔄 Paraphrase Key: 'confirmé pour le 2 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°53 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 3 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 3 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 3 mai à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for mai 3 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (3 mai).\n🔄 Paraphrase Key: 'confirmé pour le 3 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°54 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 4 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 4 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 4 juin à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for juin 4 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (4 juin).\n🔄 Paraphrase Key: 'confirmé pour le 4 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°55 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 5 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 5 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 5 juillet à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for juillet 5 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (5 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 5 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°56 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 6 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 6 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 6 août à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for août 6 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (6 août).\n🔄 Paraphrase Key: 'confirmé pour le 6 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°57 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 7 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 7 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 7 septembre à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for septembre 7 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (7 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 7 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°58 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 8 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 8 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 8 octobre à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for octobre 8 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (8 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 8 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°59 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 9 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 9 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 9 novembre à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for novembre 9 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (9 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 9 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°60 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 10 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 10 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 10 décembre à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for décembre 10 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (10 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 10 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°61 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 11 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 11 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 11 janvier à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for janvier 11 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (11 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 11 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°62 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 12 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 12 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 12 février à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for février 12 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (12 février).\n🔄 Paraphrase Key: 'confirmé pour le 12 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°63 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 13 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 13 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 13 mars à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for mars 13 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (13 mars).\n🔄 Paraphrase Key: 'confirmé pour le 13 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°64 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 14 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 14 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 14 avril à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for avril 14 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (14 avril).\n🔄 Paraphrase Key: 'confirmé pour le 14 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°65 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 15 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 15 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 15 mai à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for mai 15 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (15 mai).\n🔄 Paraphrase Key: 'confirmé pour le 15 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°66 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 16 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 16 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 16 juin à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for juin 16 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (16 juin).\n🔄 Paraphrase Key: 'confirmé pour le 16 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°67 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 17 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 17 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 17 juillet à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for juillet 17 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (17 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 17 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°68 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 18 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 18 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 18 août à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for août 18 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (18 août).\n🔄 Paraphrase Key: 'confirmé pour le 18 août' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°69 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 19 septembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 19 septembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 19 septembre à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for septembre 19 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (19 septembre).\n🔄 Paraphrase Key: 'confirmé pour le 19 septembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°70 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 20 octobre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 20 octobre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 20 octobre à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for octobre 20 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (20 octobre).\n🔄 Paraphrase Key: 'confirmé pour le 20 octobre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°71 de Montréal",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Montréal est confirmé pour le 21 novembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 21 novembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Montréal est confirmé pour le 21 novembre à 10h30.",
    "en": "Hello, your appointment at the Montréal clinic is confirmed for novembre 21 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (21 novembre).\n🔄 Paraphrase Key: 'confirmé pour le 21 novembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°72 de Québec",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Québec est confirmé pour le 22 décembre à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 22 décembre à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Québec est confirmé pour le 22 décembre à 10h30.",
    "en": "Hello, your appointment at the Québec clinic is confirmed for décembre 22 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (22 décembre).\n🔄 Paraphrase Key: 'confirmé pour le 22 décembre' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°73 de Ottawa",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Ottawa est confirmé pour le 23 janvier à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 23 janvier à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Ottawa est confirmé pour le 23 janvier à 10h30.",
    "en": "Hello, your appointment at the Ottawa clinic is confirmed for janvier 23 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (23 janvier).\n🔄 Paraphrase Key: 'confirmé pour le 23 janvier' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°74 de Toronto",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Toronto est confirmé pour le 24 février à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 24 février à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Toronto est confirmé pour le 24 février à 10h30.",
    "en": "Hello, your appointment at the Toronto clinic is confirmed for février 24 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (24 février).\n🔄 Paraphrase Key: 'confirmé pour le 24 février' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°75 de Vancouver",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Vancouver est confirmé pour le 25 mars à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 25 mars à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Vancouver est confirmé pour le 25 mars à 10h30.",
    "en": "Hello, your appointment at the Vancouver clinic is confirmed for mars 25 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (25 mars).\n🔄 Paraphrase Key: 'confirmé pour le 25 mars' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°76 de Gatineau",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Gatineau est confirmé pour le 1 avril à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 1 avril à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Gatineau est confirmé pour le 1 avril à 10h30.",
    "en": "Hello, your appointment at the Gatineau clinic is confirmed for avril 1 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (1 avril).\n🔄 Paraphrase Key: 'confirmé pour le 1 avril' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°77 de Sherbrooke",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Sherbrooke est confirmé pour le 2 mai à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 2 mai à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Sherbrooke est confirmé pour le 2 mai à 10h30.",
    "en": "Hello, your appointment at the Sherbrooke clinic is confirmed for mai 2 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (2 mai).\n🔄 Paraphrase Key: 'confirmé pour le 2 mai' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°78 de Laval",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Laval est confirmé pour le 3 juin à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 3 juin à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Laval est confirmé pour le 3 juin à 10h30.",
    "en": "Hello, your appointment at the Laval clinic is confirmed for juin 3 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (3 juin).\n🔄 Paraphrase Key: 'confirmé pour le 3 juin' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°79 de Trois-Rivières",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Trois-Rivières est confirmé pour le 4 juillet à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 4 juillet à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Trois-Rivières est confirmé pour le 4 juillet à 10h30.",
    "en": "Hello, your appointment at the Trois-Rivières clinic is confirmed for juillet 4 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (4 juillet).\n🔄 Paraphrase Key: 'confirmé pour le 4 juillet' establishes the date."
  },
  {
    "level": "A2",
    "title": "Message vocal A2 N°80 de Saguenay",
    "text": "Bonjour, nous vous rappelons que votre rendez-vous annuel à la clinique de Saguenay est confirmé pour le 5 août à 10h30. En cas d'empêchement, veuillez décommander au moins 24 heures à l'avance.",
    "opt": [
      "Rendez-vous confirmé le 5 août à 10h30",
      "Annulation définitive de toutes les consultations",
      "Fermeture de la clinique pour travaux",
      "Changement d'adresse vers le centre-ville"
    ],
    "ans": 0,
    "tr": "Bonjour, votre rendez-vous à la clinique de Saguenay est confirmé pour le 5 août à 10h30.",
    "en": "Hello, your appointment at the Saguenay clinic is confirmed for août 5 at 10:30am.",
    "hint": "⚠️ Trap Alert: Note appointment confirmation date (5 août).\n🔄 Paraphrase Key: 'confirmé pour le 5 août' establishes the date."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°1 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°2 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°3 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°4 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°5 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°6 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°7 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°8 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°9 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°10 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°11 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°12 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°13 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°14 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°15 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°16 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°17 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°18 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°19 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°20 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°21 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°22 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°23 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°24 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°25 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°26 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°27 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°28 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°29 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°30 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°31 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°32 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°33 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°34 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°35 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°36 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°37 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°38 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°39 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°40 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°41 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°42 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°43 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°44 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°45 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°46 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°47 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°48 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°49 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°50 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°51 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°52 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°53 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°54 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°55 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°56 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°57 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°58 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°59 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°60 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°61 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°62 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°63 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°64 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°65 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°66 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°67 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°68 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°69 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°70 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°71 de réunion citoyenne à Montréal",
    "text": "Lors de la séance du conseil municipal de Montréal, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Montréal ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Montréal voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°72 de réunion citoyenne à Québec",
    "text": "Lors de la séance du conseil municipal de Québec, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Québec ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Québec voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°73 de réunion citoyenne à Ottawa",
    "text": "Lors de la séance du conseil municipal de Ottawa, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Ottawa ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Ottawa voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°74 de réunion citoyenne à Toronto",
    "text": "Lors de la séance du conseil municipal de Toronto, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Toronto ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Toronto voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°75 de réunion citoyenne à Vancouver",
    "text": "Lors de la séance du conseil municipal de Vancouver, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Vancouver ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Vancouver voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°76 de réunion citoyenne à Gatineau",
    "text": "Lors de la séance du conseil municipal de Gatineau, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Gatineau ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Gatineau voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°77 de réunion citoyenne à Sherbrooke",
    "text": "Lors de la séance du conseil municipal de Sherbrooke, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Sherbrooke ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Sherbrooke voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°78 de réunion citoyenne à Laval",
    "text": "Lors de la séance du conseil municipal de Laval, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Laval ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Laval voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°79 de réunion citoyenne à Trois-Rivières",
    "text": "Lors de la séance du conseil municipal de Trois-Rivières, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Trois-Rivières ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Trois-Rivières voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B1",
    "title": "Compte-rendu B1 N°80 de réunion citoyenne à Saguenay",
    "text": "Lors de la séance du conseil municipal de Saguenay, les résidents ont voté à la majorité en faveur du déploiement de nouvelles pistes cyclables sécurisées et de l'augmentation des zones vertes au cœur des quartiers résidentiels.",
    "opt": [
      "Approbation des nouvelles pistes cyclables et zones vertes",
      "Fermeture définitive des parcs municipaux",
      "Augmentation de 50% du prix des billets de bus",
      "Interdiction totale des vélos en centre-ville"
    ],
    "ans": 0,
    "tr": "Les résidents de Saguenay ont voté en faveur du déploiement de nouvelles pistes cyclables sécurisées.",
    "en": "Residents in Saguenay voted in favor of deploying new protected bike lanes.",
    "hint": "⚠️ Trap Alert: Distinguish approved infrastructure (bike lanes) from traffic distractors.\n🔄 Paraphrase Key: 'voté en faveur' = civic approval."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°1 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 12 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 12% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 12 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 12%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (12%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°2 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 13 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 13% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 13 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 13%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (13%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°3 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 14 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 14% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 14 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 14%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (14%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°4 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 15 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 15% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 15 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 15%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (15%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°5 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 16 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 16% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 16 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 16%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (16%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°6 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 17 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 17% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 17 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 17%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (17%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°7 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 18 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 18% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 18 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 18%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (18%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°8 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 19 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 19% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 19 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 19%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (19%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°9 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 20 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 20% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 20 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 20%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (20%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°10 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 21 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 21% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 21 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 21%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (21%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°11 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 22 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 22% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 22 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 22%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (22%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°12 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 23 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 23% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 23 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 23%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (23%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°13 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 24 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 24% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 24 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 24%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (24%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°14 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 25 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 25% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 25 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 25%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (25%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°15 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 26 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 26% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 26 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 26%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (26%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°16 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 27 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 27% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 27 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 27%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (27%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°17 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 28 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 28% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 28 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 28%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (28%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°18 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 29 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 29% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 29 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 29%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (29%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°19 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 30 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 30% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 30 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 30%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (30%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°20 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 31 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 31% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 31 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 31%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (31%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°21 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 32 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 32% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 32 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 32%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (32%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°22 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 33 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 33% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 33 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 33%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (33%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°23 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 34 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 34% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 34 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 34%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (34%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°24 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 35 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 35% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 35 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 35%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (35%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°25 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 36 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 36% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 36 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 36%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (36%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°26 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 37 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 37% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 37 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 37%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (37%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°27 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 38 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 38% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 38 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 38%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (38%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°28 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 39 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 39% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 39 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 39%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (39%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°29 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 12 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 12% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 12 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 12%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (12%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°30 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 13 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 13% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 13 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 13%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (13%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°31 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 14 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 14% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 14 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 14%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (14%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°32 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 15 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 15% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 15 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 15%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (15%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°33 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 16 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 16% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 16 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 16%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (16%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°34 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 17 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 17% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 17 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 17%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (17%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°35 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 18 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 18% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 18 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 18%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (18%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°36 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 19 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 19% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 19 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 19%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (19%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°37 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 20 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 20% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 20 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 20%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (20%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°38 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 21 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 21% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 21 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 21%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (21%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°39 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 22 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 22% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 22 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 22%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (22%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°40 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 23 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 23% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 23 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 23%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (23%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°41 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 24 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 24% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 24 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 24%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (24%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°42 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 25 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 25% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 25 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 25%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (25%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°43 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 26 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 26% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 26 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 26%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (26%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°44 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 27 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 27% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 27 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 27%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (27%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°45 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 28 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 28% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 28 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 28%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (28%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°46 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 29 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 29% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 29 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 29%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (29%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°47 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 30 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 30% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 30 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 30%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (30%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°48 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 31 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 31% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 31 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 31%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (31%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°49 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 32 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 32% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 32 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 32%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (32%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°50 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 33 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 33% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 33 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 33%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (33%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°51 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 34 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 34% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 34 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 34%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (34%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°52 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 35 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 35% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 35 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 35%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (35%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°53 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 36 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 36% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 36 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 36%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (36%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°54 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 37 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 37% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 37 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 37%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (37%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°55 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 38 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 38% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 38 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 38%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (38%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°56 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 39 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 39% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 39 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 39%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (39%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°57 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 12 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 12% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 12 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 12%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (12%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°58 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 13 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 13% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 13 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 13%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (13%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°59 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 14 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 14% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 14 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 14%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (14%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°60 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 15 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 15% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 15 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 15%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (15%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°61 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 16 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 16% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 16 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 16%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (16%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°62 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 17 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 17% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 17 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 17%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (17%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°63 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 18 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 18% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 18 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 18%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (18%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°64 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 19 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 19% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 19 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 19%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (19%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°65 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 20 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 20% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 20 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 20%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (20%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°66 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 21 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 21% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 21 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 21%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (21%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°67 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 22 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 22% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 22 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 22%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (22%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°68 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 23 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 23% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 23 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 23%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (23%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°69 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 24 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 24% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 24 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 24%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (24%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°70 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 25 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 25% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 25 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 25%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (25%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°71 sur l'économie à Montréal",
    "text": "L'accélération de la transition énergétique à Montréal a permis de réduire l'empreinte carbone des transports publics de 26 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 26% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Montréal a réduit l'empreinte carbone des transports de 26 %.",
    "en": "The energy transition in Montréal reduced transit carbon footprint by 26%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (26%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°72 sur l'économie à Québec",
    "text": "L'accélération de la transition énergétique à Québec a permis de réduire l'empreinte carbone des transports publics de 27 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 27% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Québec a réduit l'empreinte carbone des transports de 27 %.",
    "en": "The energy transition in Québec reduced transit carbon footprint by 27%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (27%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°73 sur l'économie à Ottawa",
    "text": "L'accélération de la transition énergétique à Ottawa a permis de réduire l'empreinte carbone des transports publics de 28 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 28% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Ottawa a réduit l'empreinte carbone des transports de 28 %.",
    "en": "The energy transition in Ottawa reduced transit carbon footprint by 28%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (28%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°74 sur l'économie à Toronto",
    "text": "L'accélération de la transition énergétique à Toronto a permis de réduire l'empreinte carbone des transports publics de 29 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 29% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Toronto a réduit l'empreinte carbone des transports de 29 %.",
    "en": "The energy transition in Toronto reduced transit carbon footprint by 29%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (29%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°75 sur l'économie à Vancouver",
    "text": "L'accélération de la transition énergétique à Vancouver a permis de réduire l'empreinte carbone des transports publics de 30 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 30% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Vancouver a réduit l'empreinte carbone des transports de 30 %.",
    "en": "The energy transition in Vancouver reduced transit carbon footprint by 30%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (30%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°76 sur l'économie à Gatineau",
    "text": "L'accélération de la transition énergétique à Gatineau a permis de réduire l'empreinte carbone des transports publics de 31 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 31% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Gatineau a réduit l'empreinte carbone des transports de 31 %.",
    "en": "The energy transition in Gatineau reduced transit carbon footprint by 31%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (31%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°77 sur l'économie à Sherbrooke",
    "text": "L'accélération de la transition énergétique à Sherbrooke a permis de réduire l'empreinte carbone des transports publics de 32 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 32% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Sherbrooke a réduit l'empreinte carbone des transports de 32 %.",
    "en": "The energy transition in Sherbrooke reduced transit carbon footprint by 32%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (32%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°78 sur l'économie à Laval",
    "text": "L'accélération de la transition énergétique à Laval a permis de réduire l'empreinte carbone des transports publics de 33 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 33% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Laval a réduit l'empreinte carbone des transports de 33 %.",
    "en": "The energy transition in Laval reduced transit carbon footprint by 33%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (33%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°79 sur l'économie à Trois-Rivières",
    "text": "L'accélération de la transition énergétique à Trois-Rivières a permis de réduire l'empreinte carbone des transports publics de 34 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 34% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Trois-Rivières a réduit l'empreinte carbone des transports de 34 %.",
    "en": "The energy transition in Trois-Rivières reduced transit carbon footprint by 34%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (34%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "B2",
    "title": "Chronique B2 N°80 sur l'économie à Saguenay",
    "text": "L'accélération de la transition énergétique à Saguenay a permis de réduire l'empreinte carbone des transports publics de 35 % au cours de l'année écoulée, tout en générant plus de 500 emplois non délocalisables dans la filière électrique.",
    "opt": [
      "Réduction de 35% de l'empreinte carbone et création d'emplois",
      "Augmentation spectaculaire des émissions polluantes",
      "Suppression de tous les budgets d'investissement écologiques",
      "Privatisation complète du réseau de transports publics"
    ],
    "ans": 0,
    "tr": "La transition énergétique à Saguenay a réduit l'empreinte carbone des transports de 35 %.",
    "en": "The energy transition in Saguenay reduced transit carbon footprint by 35%.",
    "hint": "⚠️ Trap Alert: Connect target percentage (35%) to carbon footprint reduction.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone' = environmental progress."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°1 sur la gouvernance à Montréal",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Montréal montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°2 sur la gouvernance à Québec",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Québec montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°3 sur la gouvernance à Ottawa",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Ottawa montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°4 sur la gouvernance à Toronto",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Toronto montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°5 sur la gouvernance à Vancouver",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Vancouver montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°6 sur la gouvernance à Gatineau",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Gatineau montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°7 sur la gouvernance à Sherbrooke",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Sherbrooke montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°8 sur la gouvernance à Laval",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Laval montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°9 sur la gouvernance à Trois-Rivières",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Trois-Rivières montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°10 sur la gouvernance à Saguenay",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Saguenay montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°11 sur la gouvernance à Montréal",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Montréal montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°12 sur la gouvernance à Québec",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Québec montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°13 sur la gouvernance à Ottawa",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Ottawa montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°14 sur la gouvernance à Toronto",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Toronto montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°15 sur la gouvernance à Vancouver",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Vancouver montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°16 sur la gouvernance à Gatineau",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Gatineau montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°17 sur la gouvernance à Sherbrooke",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Sherbrooke montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°18 sur la gouvernance à Laval",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Laval montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°19 sur la gouvernance à Trois-Rivières",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Trois-Rivières montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°20 sur la gouvernance à Saguenay",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Saguenay montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°21 sur la gouvernance à Montréal",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Montréal montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°22 sur la gouvernance à Québec",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Québec montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°23 sur la gouvernance à Ottawa",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Ottawa montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°24 sur la gouvernance à Toronto",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Toronto montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°25 sur la gouvernance à Vancouver",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Vancouver montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°26 sur la gouvernance à Gatineau",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Gatineau montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°27 sur la gouvernance à Sherbrooke",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Sherbrooke montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°28 sur la gouvernance à Laval",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Laval montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°29 sur la gouvernance à Trois-Rivières",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Trois-Rivières montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C1",
    "title": "Conférence C1 N°30 sur la gouvernance à Saguenay",
    "text": "L'analyse rétrospective des politiques d'intermodalité urbaine à Saguenay montre que l'infrastructures seule ne suffit pas ; une transformation pérenne des habitudes de mobilité exige une tarification incitative et un accompagnement pédagogique citoyen.",
    "opt": [
      "Necessité d'associer infrastructures, tarification et pédagogie",
      "Efficacité exclusive de la construction de nouvelles autoroutes",
      "Suppression totale des aides au transport public",
      "Abandon de toute politique de mobilité durable"
    ],
    "ans": 0,
    "tr": "L'analyse montre que l'infrastructure seule ne suffit pas ; il faut tarification incitative et pédagogie.",
    "en": "Analysis shows infrastructure alone is insufficient; incentive pricing and education are required.",
    "hint": "⚠️ Trap Alert: Infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: Integrated policy approach."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°1 de philosophie et culture à Montréal",
    "text": "La saturation de l'espace public numérique à Montréal par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°2 de philosophie et culture à Québec",
    "text": "La saturation de l'espace public numérique à Québec par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°3 de philosophie et culture à Ottawa",
    "text": "La saturation de l'espace public numérique à Ottawa par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°4 de philosophie et culture à Toronto",
    "text": "La saturation de l'espace public numérique à Toronto par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°5 de philosophie et culture à Vancouver",
    "text": "La saturation de l'espace public numérique à Vancouver par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°6 de philosophie et culture à Gatineau",
    "text": "La saturation de l'espace public numérique à Gatineau par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°7 de philosophie et culture à Sherbrooke",
    "text": "La saturation de l'espace public numérique à Sherbrooke par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°8 de philosophie et culture à Laval",
    "text": "La saturation de l'espace public numérique à Laval par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°9 de philosophie et culture à Trois-Rivières",
    "text": "La saturation de l'espace public numérique à Trois-Rivières par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°10 de philosophie et culture à Saguenay",
    "text": "La saturation de l'espace public numérique à Saguenay par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°11 de philosophie et culture à Montréal",
    "text": "La saturation de l'espace public numérique à Montréal par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°12 de philosophie et culture à Québec",
    "text": "La saturation de l'espace public numérique à Québec par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°13 de philosophie et culture à Ottawa",
    "text": "La saturation de l'espace public numérique à Ottawa par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°14 de philosophie et culture à Toronto",
    "text": "La saturation de l'espace public numérique à Toronto par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°15 de philosophie et culture à Vancouver",
    "text": "La saturation de l'espace public numérique à Vancouver par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°16 de philosophie et culture à Gatineau",
    "text": "La saturation de l'espace public numérique à Gatineau par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°17 de philosophie et culture à Sherbrooke",
    "text": "La saturation de l'espace public numérique à Sherbrooke par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°18 de philosophie et culture à Laval",
    "text": "La saturation de l'espace public numérique à Laval par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°19 de philosophie et culture à Trois-Rivières",
    "text": "La saturation de l'espace public numérique à Trois-Rivières par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  },
  {
    "level": "C2",
    "title": "Essai C2 N°20 de philosophie et culture à Saguenay",
    "text": "La saturation de l'espace public numérique à Saguenay par des flux informationnels algorithmiques pose un risque d'altération de la délibération citoyenne, substituant l'immédiateté émotionnelle à la rigueur de l'analyse factuelle.",
    "opt": [
      "Substitution de l'analyse factuelle par l'immédiateté émotionnelle",
      "Perfectionnement spectaculaire du débat démocratique en ligne",
      "Disparition complète des moyens de communication électroniques",
      "Obligation légale d'utiliser uniquement la presse papier"
    ],
    "ans": 0,
    "tr": "Les flux algorithmiques risquent de substituer l'immédiateté émotionnelle à l'analyse factuelle.",
    "en": "Algorithmic flows risk replacing factual analysis with emotional immediacy.",
    "hint": "⚠️ Trap Alert: Identify core philosophical risk ('substituer l'immédiateté à l'analyse').\n🔄 Paraphrase Key: High-register critical analysis."
  }
];

function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    LISTENING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : LISTENING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = LISTENING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const rawT = LISTENING_TOPICS[chosenIdx];
    const t = customizeListeningTopicForPaper(rawT, i, prefix, seedOffset);

    const isQuestionInAudio = i <= 29;

    let rawImages: string[] | undefined = undefined;
    let mainImage: string | undefined = undefined;
    let mainImageSvg: string | undefined = undefined;

    if (i <= 4) {
      mainImageSvg = getOfficialLineArtSvg(i, seedOffset);
    }

    let topicOpt = t.opt;
    let topicAns = t.ans;

    if (i <= 4) {
      const sceneIdx = ((seedOffset % 10) * 4) + (i - 1);
      const props = getDrawingPropositions(sceneIdx);
      topicOpt = props.opt;
      topicAns = props.ans;
    }

    const { options, correctIndex, correctText, optionImages } = shuffleOptions(topicOpt, topicAns, rawImages);

    const itemLevel = t.level || "A1";
    const specificHint = (t as any).hint || `Level ${itemLevel} Listening Guidance: Focus on the speaker's main intent and tone. Pay attention to key transition words (e.g. "cependant", "en revanche") to identify the correct message without guessing.`;

    let questionTextPrompt = (t as any).q;
    if (!questionTextPrompt) {
      const lowerTitle = (t.title || '').toLowerCase();
      if (lowerTitle.includes('gare') || lowerTitle.includes('aéroport') || lowerTitle.includes('bus') || lowerTitle.includes('vol')) {
        questionTextPrompt = "Quelle est l'information essentielle concernant le lieu, le quai ou la porte d'embarquement ?";
      } else if (lowerTitle.includes('supermarché') || lowerTitle.includes('magasin') || lowerTitle.includes('boutique') || lowerTitle.includes('pizzeria')) {
        questionTextPrompt = "Quel est le lieu où se trouve la personne ou la promotion annoncée ?";
      } else if (lowerTitle.includes('météo')) {
        questionTextPrompt = "Quel conseil ou prévision météorologique est annoncé pour la journée ?";
      } else if (lowerTitle.includes('livraison') || lowerTitle.includes('colis') || lowerTitle.includes('rendez-vous') || lowerTitle.includes('mécanicien')) {
        questionTextPrompt = "Quelle est la date, l'heure ou la consigne exacte transmise dans ce message ?";
      } else if (lowerTitle.includes('sécurité') || lowerTitle.includes('incendie') || lowerTitle.includes('copropriété') || lowerTitle.includes('entreprise')) {
        questionTextPrompt = "Quelle consigne de sécurité ou quel changement d'organisation devez-vous suivre ?";
      } else {
        questionTextPrompt = "Quel est l'élément ou le message principal à retenir de ce document sonore ?";
      }
    }

    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    let fullSpokenTranscript = isQuestionInAudio
      ? (isSpokenOptionQuestion
        ? `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`
        : `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`)
      : t.tr;

    if (i <= 4 && mainImageSvg) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`;
    }

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : 1.30;

    let spokenEnglishTranslation = t.en;
    if (i <= 4 && mainImageSvg) {
      spokenEnglishTranslation = `Instruction: Listen to the 4 options. Choose the option that corresponds to the image.\n• Option A: ${options[0]}\n• Option B: ${options[1]}\n• Option C: ${options[2]}\n• Option D: ${options[3]}`;
    } else if (isSpokenOptionQuestion) {
      spokenEnglishTranslation = `${t.en}\nInstruction: Listen to the audio document, question N°${i}, and 4 spoken options.\n• Option A: ${options[0]}\n• Option B: ${options[1]}\n• Option C: ${options[2]}\n• Option D: ${options[3]}`;
    }

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      level: itemLevel,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || (i <= 4 && !!mainImageSvg),
      text: i <= 4 && mainImageSvg
        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
        : isSpokenOptionQuestion
        ? `Écoutez le document sonore, la question audio N°${i} et les 4 réponses. Cochez la bonne réponse.`
        : isQuestionInAudio
        ? `Écoutez le document sonore et la question audio N°${i}. Choisissez la bonne option.`
        : `${t.text}`,
      options,
      optionImages,
      mainImage,
      mainImageSvg,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${itemLevel}]: The spoken document confirms "${correctText}".`,
      hint: specificHint,
      transcript: fullSpokenTranscript,
      transcriptEnglish: spokenEnglishTranslation,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: 15
    });
  }
  return qList;
}

function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    READING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : READING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = READING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const t = READING_TOPICS[chosenIdx];

    const { options, correctIndex, correctText } = shuffleOptions(t.opt, t.ans);

    const specificHint = (t as any).hint || `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`;

    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The text states "${correctText}".`,
      hint: `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`
    });
  }
  return qList;
}

// ─── 1. OFFICIAL TCF CANADA PAPER 1 (TCF-CAN-01) ───
export const SAMPLE_TCF_PAPER_1: ExamPaper = {
  id: "tcf-canada-sample-1",
  title: "TCF Canada Official Practice Paper 1",
  code: "TCF-CAN-01",
  type: "TCF_CANADA",
  description: "Full-length official FEI standard simulator for TCF Canada Express Entry PR Points (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf1-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez obtenir des informations concernant la location d'un appartement au Québec. Rédigez un courriel au propriétaire (60 à 120 mots) pour demander les détails sur le loyer, les charges et la date de disponibilité.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation formelle (Monsieur/Madame)", "Formuler 3 questions précises sur le logement", "Formule de politesse formelle de fin"],
          sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'appartement de trois pièces actuellement proposé à la location. Intéressé par votre annonce, je souhaiterais obtenir des précisions avant d'envisager une visite.\n\nPourriez-vous m'indiquer le montant exact du loyer mensuel ainsi que la nature des charges incluses (chauffage, électricité, eau) ? De plus, j'aimerais connaître la date exacte à partir de laquelle le logement sera disponible.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf1-w2",
          taskNumber: 2,
          title: "Tâche 2 : Compte-rendu d'expérience (Travel Experience Report)",
          prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Utiliser le passé composé et l'imparfait", "Décrire le paysage et l'ambiance", "Exprimer vos sentiments (joie, surprise)"],
          sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une expérience inoubliable en assistant au Carnaval d'hiver de Québec. Dès mon arrivée, la ville historique était magnifiquement recouverte d'un manteau de neige et illuminée de mille feux.\n\nJ'ai eu la chance d'admirer d'impressionnantes sculptures sur glace et d'assister à la traditionnelle course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était à la fois féerique et très chaleureuse, malgré des températures extrêmement froides.\n\nCette immersion culturelle exceptionnelle m'a permis d'enrichir mon vocabulaire français et d'échanger avec des habitants chaleureux. Je garde un souvenir impérissable de cette aventure nordique et je recommande vivement cette destination !"
        },
        {
          id: "tcf1-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Introduction présentant le débat", "Argument 1 avec exemple précis", "Argument 2 (coût financier)", "Conclusion claire affirmant votre prise de position"],
          sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un vif débat au sein des municipalités modernes.\n\nD'un côté, les partisans de cette mesure soutiennent qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour la collectivité. Sans recettes de billetterie, la rénovation et la modernisation des infrastructures risqueraient d'être compromises.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité du réseau."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf1-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
          scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2,
          keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est...", "Dans mon temps libre, j'aime..."]
        },
        {
          id: "tcf1-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice en interaction (Information Gathering)",
          scenario: "Vous voulez vous inscrire à un cours de sport. Posez au moins 5 questions à l'examinateur sur les horaires, les tarifs et l'équipement requis.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5,
          keyPhrases: ["Quels sont les jours de cours ?", "Combien coûte l'abonnement mensuel ?", "Est-il nécessaire d'apporter son propre matériel ?"]
        },
        {
          id: "tcf1-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Que pensez-vous du travail à distance généralisé ? Présentez les avantages et les inconvénients puis donnez votre avis personnel à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5,
          keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "En ce qui concerne les avantages...", "Pour conclure, je dirais que..."]
        }
      ]
    }
  ]
};

// ─── 2. OFFICIAL TCF CANADA PAPER 2 (TCF-CAN-02) ───
export const SAMPLE_TCF_PAPER_2: ExamPaper = {
  id: "tcf-canada-sample-2",
  title: "TCF Canada Official Practice Paper 2",
  code: "TCF-CAN-02",
  type: "TCF_CANADA",
  description: "Advanced TCF Canada examination paper for Express Entry NCLC 8 / B2 Vantage targets (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, interviews, and public service announcements (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles and environmental press reports (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Argumentative essay writing for Canadian Express Entry (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf2-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation courtoise", "Formuler 3 questions claires", "Remercier à la fin"],
          sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf2-w2",
          taskNumber: 2,
          title: "Tâche 2 : Article de témoignage",
          prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Décrire l'ambiance", "Utiliser le passé composé", "Expliquer pourquoi vous recommandez cet événement"],
          sampleResponse: "Lors de mon dernier séjour au Québec, j'ai eu l'immense privilège de participer au Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été émerveillé par l'atmosphère festive et l'énergie vibrante des spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux et la convivialité des Québécois ont rendu cette expérience inoubliable.\n\nJe recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une immersion festive sans égale que vous ne regretterez pas !"
        },
        {
          id: "tcf2-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Présenter la problématique", "Développer 2 arguments solides", "Conclure avec une synthèse claire"],
          sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite de vifs débats sociétaux.\n\nD'une part, les partisans soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des structures phonétiques. De surcroît, une maîtrise précoce constitue un atout indiscutable dans un monde professionnel globalisé.\n\nD'autre part, les détracteurs craignent qu'une surcharge cognitive n'entrave l'acquisition fondamentale de la langue maternelle et du calcul.\n\nEn somme, bien que ces réserves soient légitimes, je suis convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle indispensable, à condition d'adapter la pédagogie au rythme de chaque élève."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive debate with oral examiner (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf2-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé",
          scenario: "Décrivez votre profession actuelle, vos compétences principales et pourquoi vous souhaitez poursuivre votre carrière au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2
        },
        {
          id: "tcf2-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice d'interaction (Recherche de logement)",
          scenario: "Vous cherchez un appartement à louer. Interrogez le propriétaire (l'examinateur) sur les charges, le quartier et la date de disponibilité.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5
        },
        {
          id: "tcf2-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Faut-il limiter l'utilisation des écrans chez les adolescents ? Présentez votre opinion à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5
        }
      ]
    }
  ]
};

// ─── 3. OFFICIAL TEF CANADA PAPER 1 (TEF-CAN-01) ───
export const SAMPLE_TEF_PAPER_1: ExamPaper = {
  id: "tef-canada-sample-1",
  title: "TEF Canada Official Practice Paper 1",
  code: "TEF-CAN-01",
  type: "TEF_CANADA",
  description: "Full-length simulator tailored for TEF Canada Paris Chamber of Commerce (CCI) standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef1-w1",
          taskNumber: 1,
          title: "Section A : Article de Fait Divers (Newspaper Article Continuation)",
          prompt: "Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          guidedTips: ["Employer le passé composé et l'imparfait", "Décrire l'intervention des pompiers", "Conclure par la réouverture de la circulation"],
          sampleResponse: "Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures. L'animal effrayé s'était réfugié au sommet d'une structure métallique, refusant de descendre malgré les appels des automobilistes immobilisés.\n\nAvertis rapidement, les pompiers de Montréal et la patrouille policière sont arrivés sur les lieux afin d'établir un périmètre de sécurité. Un secouriste expérimenté a dû escalader la structure équipé d'une nacelle spéciale pour récupérer le félin sain et sauf.\n\nAprès cette opération spectaculaire saluée par les applaudissements des riverains, la circulation a pu reprendre progressivement en fin d'après-midi."
        },
        {
          id: "tef1-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'opinion persuasive (Letter to Editor)",
          prompt: "La municipalité souhaite remplacer une place publique historique par un centre commercial. Écrivez une lettre au maire (200 mots minimum) pour défendre la préservation du patrimoine urbain.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation formelle (Monsieur le Maire)", "Exprimer l'inquiétude des habitants", "Présenter 2 arguments patrimoniaux et écologiques", "Formule de politesse formelle"],
          sampleResponse: "Monsieur le Maire,\n\nJe vous adresse cette lettre en tant que citoyen soucieux de l'avenir de notre ville afin de vous faire part de ma profonde inquiétude concernant le projet de démolition de la place Saint-Jean au profit d'un complexe commercial.\n\nD'une part, cette place constitue un fleuron incontestable de notre patrimoine architectural et historique. Elle représente un lieu de mémoire collective où les générations se croisent et tissent des liens sociaux essentiels à la vitalité de notre communauté.\n\nD'autre part, la destruction de cet espace vert au cœur du centre-ville accentuera les îlots de chaleur urbains et aggravera l'empreinte carbone municipale. À l'heure où la transition écologique exige la sauvegarde de la biodiversité urbaine, remplacer un havre de paix végétalisé par des structures bétonnées m'apparaît comme un choix à contre-courant des impératifs environnementaux actuels.\n\nEn somme, je vous prie de bien vouloir reconsidérer cette décision et d'envisager la réhabilitation de la place dans le respect de son identité d'origine.\n\nDans l'attente de votre prise en considération, je vous prie d'agréer, Monsieur le Maire, l'expression de ma haute considération."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef1-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (10 Questions)",
          scenario: "Vous voyez une annonce pour une offre d'emploi à mi-temps dans un journal. Appelez le recruteur pour poser au moins 10 questions sur le poste.",
          prepTimeMins: 0,
          speakingTimeMins: 5,
          keyPhrases: ["Quelles sont les heures de travail ?", "Quel est le salaire proposé ?", "Quelles sont les qualifications requises ?"]
        },
        {
          id: "tef1-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Un ami hésite à partir faire du camping sauvage ce week-end. Convainquez-le d'accepter cette aventure avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Pense à la beauté des paysages !", "Je m'occupe de tout le matériel.", "C'est l'occasion idéale de se déconnecter."]
        }
      ]
    }
  ]
};

// ─── 4. OFFICIAL TEF CANADA PAPER 2 (TEF-CAN-02) ───
export const SAMPLE_TEF_PAPER_2: ExamPaper = {
  id: "tef-canada-sample-2",
  title: "TEF Canada Official Practice Paper 2",
  code: "TEF-CAN-02",
  type: "TEF_CANADA",
  description: "Advanced TEF Canada examination paper tailored for CCI Paris standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Radio interviews and complex dialogs (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Editorial columns and economic synthesis (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section B (Formal Persuasive Letter to an Editor) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef2-w1",
          taskNumber: 1,
          title: "Section A : Fait divers (Continuation)",
          prompt: "Rédigez la suite d'un fait divers à partir du début suivant (80 mots minimum) : 'Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          sampleResponse: "Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15. Des milliers de familles impatientes ont afflué dès l'aube, saturant complètement les voies d'accès principales.\n\nFace à cette paralysie du réseau routier, la sûreté du Québec a dû déployer en urgence plusieurs unités de motards pour rediriger les usagers vers des itinéraires secondaires. Malgré la frustration initiale des conducteurs, aucun incident majeur n'a été déploré.\n\nLa direction du parc a rapidement présenté ses excuses et s'est engagée à renforcer l'organisation des parkings pour les jours à venir."
        },
        {
          id: "tef2-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'argumentation (Letter to a Friend / Newspaper)",
          prompt: "Un de vos amis refuse d'utiliser le recyclage et jette tout dans les poubelles ordinaires. Écrivez-lui une lettre persuasive (200 mots minimum) pour le convaincre d'adopter des habitudes écologiques.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation amicale", "Exprimer sa surprise tout en restant bienveillant", "Présenter 2 arguments environnementaux concrets", "Proposer des gestes simples pour commencer dès aujourd'hui"],
          sampleResponse: "Cher Alexandre,\n\nJe me permets de t'écrire après notre discussion de la semaine dernière, car ton scepticisme concernant le tri sélectif m'a beaucoup fait réfléchir.\n\nEn premier lieu, saches que le recyclage des déchets n'est pas une simple contrainte administrative, mais un acte citoyen essentiel pour limiter le gaspillage des ressources naturelles. Lorsque nous jetons du plastique ou du papier dans les ordures ménagères, ces matériaux finissent enfouis ou incinérés, générant des gaz à effet de serre néfastes pour notre atmosphère.\n\nEn second lieu, adopter le tri au quotidien est aujourd'hui d'une simplicité enfantine. Il suffit d'installer deux bacs distincts dans sa cuisine. Par ce geste minime qui ne prend que quelques secondes par jour, tu participes activement à la réutilisation des matières premières et à la protection des écosystèmes.\n\nJe sais que tu es une personne responsable et attentive à ton environnement. Pourquoi ne pas essayer ensemble dès ce week-end ? Je serais ravi de t'aider à mettre en place ce système chez toi.\n\nAmicalement,\nThomas"
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section B (Persuasive Oral Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef2-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (Logement de vacances)",
          scenario: "Vous lisez une annonce pour la location d'un chalet à la montagne. Posez 10 questions au propriétaire sur le prix, la capacité et les activités à proximité.",
          prepTimeMins: 0,
          speakingTimeMins: 5
        },
        {
          id: "tef2-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Votre ami hésite à participer à un programme de bénévolat communautaire le week-end. Convainquez-le de s'inscrire avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Tu sais, c'est une opportunité unique pour...", "Je comprends ton hésitation, mais pense au fait que...", "On pourrait y aller ensemble, ce sera beaucoup plus amusant !"]
        }
      ]
    }
  ]
};

// ─── DYNAMIC GENERATOR FOR 10 UNIQUE TCF CANADA PAPERS & 10 UNIQUE TEF CANADA PAPERS ───

export const TCF_WRITING_SUITE = [
  [
    {
      title: "Tâche 1 : Message court (Problème de chauffage)",
      prompt: "Vous louez un appartement au Québec. Le système de chauffage ne fonctionne plus en plein hiver. Rédigez un courriel au propriétaire (60 à 120 mots) pour expliquer la situation et demander une réparation urgente.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris en urgence afin de vous signaler un problème majeur dans l'appartement que je loue au 45 rue Saint-Denis. Depuis hier soir, le système de chauffage central est totalement en panne et la température intérieure a chuté de manière préoccupante en raison des températures négatives extérieures.\n\nEn conséquence, je vous saurais gré d'intervenir dans les plus brefs délais ou d'envoyer un technicien qualifié dès aujourd'hui pour procéder aux réparations nécessaires. Je reste joignable par téléphone à tout moment pour faciliter l'accès au logement.\n\nEn vous remerciant vivement pour votre réactivité et votre compréhension, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)",
      prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable en assistant au traditionnel Carnaval d'hiver de la ville de Québec. Dès mon arrivée dans le Vieux-Québec, la cité historique était magnifiquement recouverte d'un manteau de neige féerique et illuminée de mille feux.\n\nPendant mon séjour, j'ai eu la chance d'admirer d'impressionnantes sculptures sur glace réalisées par des artistes internationaux et d'assister à la spectaculaire course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était chaleureuse et festive, malgré les températures froides.\n\nEn outre, cette immersion culturelle exceptionnelle m'a permis d'échanger avec des habitants accueillants et d'enrichir considérablement mes connaissances régionales. Bien que le climat fût rigoureux, je garde un souvenir impérissable de cette escapade nordique et je recommande chaleureusement cette destination féerique !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Transports gratuits)",
      prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un débat passionné au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus en augmentant directement leur pouvoir d'achat.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour les collectivités locales. Sans recettes tarifaires, la rénovation, la sécurité et la modernisation des infrastructures risqueraient d'être compromises à long terme.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan environnemental et social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité et la qualité du réseau de transport public."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande d'informations (Atelier culinaire)",
      prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain dans votre établissement. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement personnel.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Article de témoignage (Festival culturel)",
      prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon dernier séjour au Canada, j'ai eu l'immense privilège de participer au prestigieux Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été immédiatement émerveillé par l'atmosphère festive et l'énergie vibrante des milliers de spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux présentés et la convivialité légendaire des Québécois ont rendu cette expérience absolument inoubliable.\n\nEn outre, les dégustations culinaires proposées sur place ont agréablement complété cette escapade. Je recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une expérience festive d'une richesse exceptionnelle que vous ne regretterez pas !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Langues à l'école)",
      prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite d'intenses débats éducatifs et sociétaux à travers le monde.\n\nD'une part, les défenseurs de cette mesure soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des phonèmes et structures linguistiques complexe. De surcroît, une maîtrise précoce des langues étrangères constitue un atout culturel et professionnel indiscutable dans une société globale hautement interconnectée.\n\nD'autre part, les détracteurs mettent en garde contre le risque d'une surcharge des programmes scolaires qui pourrait entraver l'acquisition fondamentale des compétences de base en langue maternelle et en mathématiques.\n\nEn somme, bien que ces réserves soient parfaitement légitimes, je demeure convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle et d'épanouissement personnel indispensable, à condition toutefois d'adapter une pédagogie ludique au rythme d'apprentissage de chaque élève."
    }
  ],
  [
    {
      title: "Tâche 1 : Message formel (Inscription au club de sport)",
      prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame, Monsieur,\n\nJe vous adresse ce courriel afin d'obtenir des informations précises concernant les modalités d'inscription à votre complexe sportif à Montréal pour la saison à venir.\n\nPourriez-vous m'indiquer la diversité des formules d'abonnement disponibles ainsi que les horaires d'ouverture des installations en semaine et le week-end ? Par ailleurs, j'aimerais savoir si une séance d'essai gratuite est envisageable avant tout engagement annuel.\n\nEn vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Compte-rendu (Action bénévole)",
      prompt: "Rédigez un court article pour le bulletin d'information de votre quartier (120 à 150 mots) résumant une journée d'action bénévole.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Samedi dernier, notre quartier a été le théâtre d'une magnifique journée de solidarité consacrée au nettoyage environnemental des berges du parc local. Plus de soixante citoyens enthousiastes de tous âges se sont rassemblés dès le matin munis de gants robustes et de bacs de collecte écologiques.\n\nGrâce à un effort collectif remarquable et à une organisation logistique sans faille, nous avons réussi à récolter plus de trois cents kilos de déchets plastiques et recyclables. Cette journée inspirante s'est ensuite clôturée chaleureusement autour d'un grand pique-nique partagé riche en échanges bienveillants entre voisins.\n\nEn conclusion, cette initiative citoyenne démontre avec force qu'un engagement local concret peut préserver notre cadre de vie commun. Une expérience humaine profondément gratifiante à renouveler impérativement dans les mois à venir !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Télétravail à 100%)",
      prompt: "Le télétravail à 100% est-il bénéfique pour l'épanouissement des salariés et la cohésion d'équipe ? Donnez votre opinion (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La généralisation du télétravail à temps plein transforme aujourd'hui en profondeur l'organisation contemporaine du monde professionnel.\n\nD'un côté, les avantages pour les employés sont indiscutables : élimination des trajets quotidiens stressants, réduction des dépenses de transport et meilleure conciliation entre vie privée et obligations professionnelles. De surcroît, de nombreux salariés rapportent une concentration accrue dans la réalisation de leurs tâches complexes et une autonomie renforcée au quotidien.\n\nCependant, un isolement professionnel prolongé risque d'affaiblir la cohésion d'équipe, d'entraver le transfert informel de connaissances et de détériorer le sentiment d'appartenance à l'entreprise. En outre, la frontière entre sphère personnelle et vie professionnelle devient parfois floue.\n\nEn conclusion, bien que le travail à distance offre une flexibilité appréciable, le modèle hybride combinant harmonieusement présentiel et distanciel me paraît être l'équation optimale pour concilier le bien-être individuel des salariés et la performance collective à long terme."
    }
  ],
  [
    {
      title: "Tâche 1 : Courriel de réclamation (Achat en ligne défectueux)",
      prompt: "Vous avez commandé du matériel informatique mais vous avez reçu un article défectueux. Écrivez au service client (60 à 120 mots) pour réclamer un échange.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Responsable du Service Client,\n\nJe vous écris suite à la réception de ma commande N°84920 contenant un ordinateur portable. À ma grande surprise, l'écran présente un défaut d'affichage majeur dès l'allumage.\n\nLe matériel étant sous garantie, je sollicite par la présente un échange standard ou le remboursement intégral de mon achat. Pourriez-vous me transmettre la procédure de retour ainsi que le bon d'expédition prépayé ?\n\nDans l'attente d'une prise en charge rapide de ma réclamation, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit personnel (Changement de carrière)",
      prompt: "Dans une lettre à un ami collègue (120 à 150 mots), expliquez les raisons qui vous ont poussé à changer de domaine professionnel.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Cher Julien,\n\nJe prends enfin le temps de t'écrire pour partager avec toi une grande nouvelle : j'ai officiellement décidé de réorienter ma carrière professionnelle vers le secteur passionnant des éco-technologies.\n\nAprès dix années stimulantes dans le domaine financier, je ressentais le besoin fondamental de donner davantage de sens à mon quotidien et de contribuer activement à des projets d'innovation durable. J'ai donc suivi avec succès une formation intensive de six mois en gestion de projets environnementaux.\n\nBien que cette transition exige de sortir de ma zone de confort et de relever de nouveaux défis, je me sens immensément motivé par cette aventure. En outre, la diversité des projets me stimule énormément. J'espère que nous pourrons nous retrouver très prochainement pour en discuter de vive voix !\n\nAmicalement,\nMarc"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Interdiction des véhicules à essence)",
      prompt: "Les gouvernements devraient-ils interdire la vente de véhicules thermiques neufs d'ici 2035 ? Présentez votre argumentation (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'interdiction projetée de la vente de véhicules thermiques neufs d'ici 2035 suscite d'intenses débats entre impératifs écologiques vitaux et réalités socio-économiques.\n\nD'une part, les partisans de cette législation rappellent à juste titre que le secteur des transports constitue l'un des principaux émetteurs de gaz à effet de serre. Interdire les moteurs à essence apparaît donc comme une étape indispensable pour accélérer la décarbonation globale de l'économie et assainir durablement la qualité de l'air urbain au bénéfice de la santé publique.\n\nD'autre part, les opposants mettent en avant le coût financier élevé des véhicules électriques et l'insuffisance actuelle des infrastructures de recharge rapide. De surcroît, les répercussions sur l'emploi dans l'industrie automobile classique sont préoccupantes pour de nombreuses régions industrielles.\n\nEn conclusion, bien que la transition vers la mobilité électrique soit inéluctable, sa réussite dépendra d'un soutien financier équitable aux ménages modestes et d'un investissement massif dans les réseaux énergétiques."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de renseignements (Bibliothèque municipale)",
      prompt: "Écrivez à la bibliothèque municipale de votre ville (60 à 120 mots) pour vous renseigner sur les horaires et le prêt numérique.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame la Bibliothécaire,\n\nJe vous adresse ce courriel afin de me renseigner sur les conditions d'adhésion et les services numériques offerts par la bibliothèque municipale.\n\nPourriez-vous me préciser les documents justificatifs requis pour l'établissement de la carte d'usager ainsi que le tarif annuel pour les résidents ? De plus, j'aimerais savoir si votre catalogue de livres numériques est accessible à distance depuis une tablette personnelle.\n\nEn vous remerciant pour vos informations, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Intégration au Québec)",
      prompt: "Racontez vos premiers mois d'installation au Canada dans un billet de blog (120 à 150 mots) en donnant des conseils pratiques aux nouveaux arrivants.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Installé à Montréal depuis maintenant six mois, je souhaite partager mon expérience d'intégration avec les futurs arrivants. Le choc culturel et climatique initial s'est très rapidement dissipé grâce à l'accueil d'une bienveillance remarquable réservé au quotidien par les Québécois.\n\nDès les premières semaines de mon arrivée, je me suis inscrit à des ateliers de réseautage professionnel et j'ai exploré avec passion les différents quartiers de la métropole. Bien que les démarches administratives exigent de la rigueur et de la patience, l'environnement social offre des perspectives d'épanouissement remarquables.\n\nUn conseil fondamental aux futurs immigrants : n'hésitez surtout pas à aller spontanément au-devant des gens et à participer aux activités communautaires locales. C'est la clé absolue d'une intégration harmonieuse, enrichissante et réussie !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Intelligence Artificielle et Emploi)",
      prompt: "L'intelligence artificielle représente-t-elle une menace ou une opportunité majeure pour le marché du travail de demain ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'essor fulgurant des technologies d'intelligence artificielle suscite aujourd'hui de profondes inquiétudes quant à la pérennité du marché de l'emploi mondial.\n\nD'un côté, les détracteurs soulignent à juste titre le risque d'une automatisation massive qui pourrait supprimer de nombreux postes administratifs et techniques, créant une précarité inédite pour les travailleurs dont les tâches sont répétitives et prévisibles.\n\nD'un autre côté, les défenseurs de l'IA rappellent opportunément que chaque révolution technologique génère de nouveaux métiers spécialisés et libère les humains des contraintes exécutives au profit d'activités créatives, stratégiques et relationnelles. De surcroît, l'IA constitue un multiplicateur de productivité sans précédent pour les entreprises modernes du XXIe siècle.\n\nEn somme, l'intelligence artificielle ne doit pas être redoutée mais encadrée par des politiques gouvernementales et institutionnelles très ambitieuses de formation continue afin de garantir une transition numérique inclusive et équitable pour l'ensemble des travailleurs."
    }
  ],
  [
    {
      title: "Tâche 1 : Message d'absence (Congé exceptionnel)",
      prompt: "Écrivez un message à votre responsable hiérarchique (60 à 120 mots) pour demander une autorisation d'absence exceptionnelle de 3 jours.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur le Directeur,\n\nJe vous adresse ce courriel afin de solliciter une autorisation d'absence exceptionnelle de trois jours, du 12 au 14 du mois prochain, pour des raisons familiales impérieuses.\n\nJ'ai pris soin d'avancer mes dossiers en cours et de planifier l'intérim de mes projets avec mon collègue Thomas afin d'éviter tout retard de livraison. Je resterai joignable par courriel en cas d'urgence absolue.\n\nEn vous remerciant par avance pour votre compréhension, je vous prie d'agréer mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Critique culturelle (Exposition d'art)",
      prompt: "Rédigez une critique d'une exposition culturelle ou d'un musée récent auquel vous avez assisté (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Le week-end dernier, j'ai eu le plaisir de visiter la nouvelle exposition immersive consacrée à l'impressionnisme au Musée des Beaux-Arts. Dès l'entrée dans la grande galerie, les projections numériques géantes accompagnées d'une symphonie captivante transportent immédiatement le visiteur au cœur même des œuvres magistrales.\n\nLa scénographie audacieuse et l'éclairage méticuleusement étudié mettent en valeur la texture et la richesse des nuances chromatiques de chaque toile. Ce parcours sensoriel novateur offre ainsi une perspective totalement renouvelée sur l'histoire de l'art classique.\n\nEn outre, la section interactive proposée à la fin du parcours constitue un ajout très ludique. Une visite culturelle incontournable que je recommande chaleureusement à tous les passionnés d'art !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Écrans et réseaux sociaux)",
      prompt: "Faut-il réglementer strictement l'utilisation des téléphones portables et des réseaux sociaux chez les jeunes adolescents ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'omniprésence des smartphones et des plateformes numériques dans le quotidien des adolescents soulève aujourd'hui d'importantes interrogations quant aux risques d'addiction.\n\nD'un côté, les partisans d'une réglementation stricte mettent en garde avec fermeté contre les méfaits du cyberharcèlement, la perturbation du sommeil et la baisse de l'attention scolaire entraînées par l'exposition excessive aux écrans.\n\nD'un autre côté, interdire autoritairement ces technologies semble illusoire à l'ère du numérique. Les réseaux sociaux constituent également d'épatants espaces d'apprentissage interactif, de création artistique et de socialisation pour la jeunesse contemporaine.\n\nEn conclusion, plus qu'une interdiction coercitive, il convient de privilégier une véritable éducation aux médias numériques dès le collège pour accompagner les adolescents vers un usage responsable et équilibré."
    }
  ],
  [
    {
      title: "Tâche 1 : Invitation (Fête des voisins)",
      prompt: "Invitez vos voisins de quartier (60 à 120 mots) à une fête communautaire que vous organisez le mois prochain.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Chers Voisins,\n\nAfin de renforcer les liens de convivialité au sein de notre résidence, j'ai le plaisir de vous inviter à notre traditionnelle fête des voisins qui se tiendra le samedi 15 du mois prochain à partir de 18 heures dans le jardin collectif.\n\nChacun est invité à apporter une spécialité culinaire ou une boisson à partager. Ce sera l'occasion idéale d'accueillir les nouveaux résidents et d'échanger un moment chaleureux.\n\nMerci de bien vouloir me confirmer votre présence avant le 10 afin d'organiser au mieux cet événement !"
    },
    {
      title: "Tâche 2 : Récit d'initiative (Jardin collectif)",
      prompt: "Décrivez la création d'un jardin collectif dans votre quartier (120 à 150 mots) et son impact sur la vie de quartier.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Au printemps dernier, les résidents de notre quartier se sont mobilisés avec enthousiasme pour transformer un terrain vague abandonné en un magnifique jardin potager communautaire. Grâce au précieux soutien municipal et à l'implication de bénévoles de tous âges, nous avons aménagé des parcelles de culture biologiques écologiques.\n\nAujourd'hui, cet espace vert est devenu un véritable lieu de rassemblement intergénérationnel dynamique où voisins échangent conseils d'horticulture, graines et légumes frais dans une atmosphère extrêmement conviviale.\n\nEn outre, ce projet exemplaire a sensiblement renforcé la cohésion sociale de notre communauté. Une réussite citoyenne remarquable qui a revitalisé notre quartier et que nous souhaitons prolonger durablement !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Semaine de 4 jours)",
      prompt: "La semaine de travail de 4 jours devrait-elle être généralisée à l'ensemble des entreprises ? Argumentez votre position (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le passage à la semaine de travail de quatre jours sans diminution de salaire s'impose actuellement comme une expérimentation sociale majeure.\n\nD'un côté, les organisations ayant mis en œuvre ce modèle constatent une baisse spectaculaire du niveau d'épuisement professionnel, une diminution de l'absentéisme et un regain notable de productivité chez les salariés, ce qui compense amplement la journée non travaillée.\n\nCependant, plusieurs secteurs d'activité essentiels comme la santé publique, les transports et les services de secours peineraient à financer la réorganisation complexe des plannings et les recrutements compensatoires nécessaires.\n\nEn conclusion, bien que la semaine de quatre jours offre un équilibre personnel précieux, sa généralisation doit s'effectuer avec flexibilité et s'adapter aux réalités spécifiques de chaque secteur d'activité."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de réservation (Chalet à la montagne)",
      prompt: "Écrivez un courriel à un propriétaire de chalet (60 à 120 mots) pour réserver un séjour en famille pendant les vacances d'hiver.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur,\n\nJe vous adresse ce courriel afin de me renseigner sur la disponibilité de votre chalet à Mont-Tremblant pour la semaine du 10 au 17 février pour une famille de cinq personnes.\n\nPourriez-vous me confirmer le tarif total de la location ainsi que le montant du dépôt de garantie ? De plus, j'aimerais savoir si le chalet dispose d'un espace de rangement sécurisé pour les équipements de ski.\n\nDans l'attente de vos précisions, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Formation professionnelle)",
      prompt: "Racontez une formation continue récente que vous avez suivie (120 à 150 mots) et expliquez ses apports concrets.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "J'ai récemment suivi une formation continue intensive consacrée au marketing numérique et à l'analyse des médias sociaux. Durant deux semaines particulièrement stimulantes, des formateurs expérimentés nous ont enseigné les dernières méthodologies d'optimisation de campagnes web et de stratégie de contenu.\n\nGrâce aux cas pratiques traités en équipe et aux outils modernes manipulés en atelier, j'ai pu acquérir des compétences techniques immédiatement transposables dans mon activité quotidienne. Cela m'a permis d'augmenter le taux d'engagement en ligne de mon entreprise de plus de trente pour cent.\n\nEn outre, cette expérience m'a donné un véritable élan professionnel. Une formation hautement enrichissante que je recommande vivement à tout professionnel souhaitant faire évoluer sa carrière !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Consommation de produits locaux)",
      prompt: "Acheter exclusivement des produits alimentaires locaux et de saison est-il un objectif réaliste pour tous les ménages ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La promotion du locavorisme, qui préconise la consommation exclusive de denrées alimentaires produites localement, suscite un intérêt croissant face aux défis écologiques contemporains.\n\nD'une part, privilégier les circuits de distribution courts permet de soutenir concrètement l'économie agricole régionale et de réduire de manière drastique les émissions de carbone liées au transport international des marchandises.\n\nD'autre part, exiger le 100% local se heurte à des contraintes budgétaires majeures pour les ménages à revenus modestes, les produits issus d'exploitations locales étant souvent plus coûteux. De surcroît, la variété alimentaire en période hivernale s'avère restreinte sous les climats nordiques.\n\nEn somme, bien que la consommation locale représente un idéal vertueux, elle doit s'inscrire dans une démarche pragmatique sans devenir une contrainte financière inaccessible."
    }
  ],
  [
    {
      title: "Tâche 1 : Remerciement formel (Fin de stage)",
      prompt: "Rédigez un courriel de remerciement à votre maître de stage (60 à 120 mots) à la fin de votre période en entreprise.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nAlors que mon stage au sein de votre entreprise touche à sa fin, je tiens à vous exprimer ma sincère gratitude pour l'accueil chaleureux et la confiance que vous m'avez accordés tout au long de ces trois mois.\n\nCette expérience professionnelle m'a permis d'approfondir mes connaissances pratiques et de développer des compétences solides en gestion de projets. Je remercie également toute l'équipe pour sa disponibilité et ses précieux conseils.\n\nEn vous souhaitant une excellente continuation, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit d'événement (Marathon de Montréal)",
      prompt: "Décrivez votre participation ou votre soutien lors d'un événement sportif populaire (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Dimanche dernier, j'ai eu l'immense bonheur de participer au Marathon de Montréal aux côtés de milliers de coureurs passionnés venus du monde entier. Le parcours pittoresque sillonnait les plus emblématiques quartiers de la métropole sous les encouragements vifs d'une foule nombreuse et enthousiaste.\n\nBien que la seconde moitié du parcours ait exigé un effort physique particulièrement intense, l'énergie collective formidable et les fanfares musicales réparties le long du trajet m'ont transcendé jusqu'à la ligne d'arrivée.\n\nEn outre, cette épreuve exigeante m'a permis de dépasser mes limites personnelles. Franchir l'arrivée après quarante-deux kilomètres d'effort reste un moment d'intense fierté et une aventure sportive inoubliable !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Quotas touristiques)",
      prompt: "Faut-il imposer des quotas stricts d'accès à certains sites naturels et patrimoniaux pour protéger la planète ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Face aux dégradations entraînées par le surtourisme de masse, la mise en place de quotas d'accès aux sites naturels et patrimoniaux suscite d'importants débats.\n\nD'un côté, les écologistes soulignent à juste titre que la surfréquentation touristique détruit irréversiblement les écosystèmes fragiles, accélère l'érosion des monuments historiques et nuit à la quiétude des résidents locaux. Limiter le nombre de visiteurs quotidiens constitue donc le seul moyen efficace de préserver ces trésors pour les générations futures.\n\nD'un autre côté, les acteurs économiques redoutent des baisses de revenus dévastatrices et dénoncent une mesure inégalitaire qui risquerait de réserver la culture aux publics privilégiés.\n\nEn conclusion, bien que la régulation des flux touristiques soit devenue indispensable, elle doit s'accompagner d'une promotion active du tourisme écoresponsable."
    }
  ],
  [
    {
      title: "Tâche 1 : Proposition de partenariat (Association locale)",
      prompt: "Proposez un partenariat commercial à un commerce de quartier au nom de votre association étudiante (60 à 120 mots).",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Gérant,\n\nAu nom de l'association étudiante de l'Université de Montréal, je vous écris afin de vous proposer un partenariat commercial à l'occasion de notre rentrée universitaire.\n\nNous souhaiterions offrir à nos 500 membres des réductions exclusives dans votre établissement en échange d'une visibilité prioritaire sur nos réseaux sociaux et nos supports de communication.\n\nSeriez-vous disponible la semaine prochaine pour une courte rencontre afin d'échanger sur cette opportunité mutually bénéfique ?\n\nDans l'attente de votre réponse, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Résumé de conférence (Développement durable)",
      prompt: "Rédigez le compte-rendu d'une conférence publique sur la transition écologique (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Hier soir, l'Hôtel de Ville accueillait une conférence captivante consacrée aux stratégies de transition écologique dans les grandes métropoles. Trois experts renommés ont présenté des solutions innovantes axées sur la rénovation thermique des bâtiments et la mobilité douce.\n\nLes intervenants ont insisté sur l'urgence d'une action concertée entre citoyens, entreprises et collectivités territoriales pour atteindre la neutralité carbone d'ici 2050.\n\nCette présentation claire et inspirante s'est conclue par un débat passionnant avec le public, démontrant une prise de conscience collective prometteuse pour notre avenir urbain !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Université gratuite)",
      prompt: "L'accès aux études supérieures devrait-il être entièrement gratuit et financé par l'État pour tous les étudiants ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le débat sur la gratuité totale de l'enseignement supérieur ravive les discussions autour de l'égalité des chances et du financement public.\n\nD'une part, garantir la gratuité universitaire permettrait d'éliminer les barrières financières qui freinent l'accès des jeunes issus de milieux défavorisés aux diplômes du supérieur, favorisant ainsi une méritocratie réelle et la mobilité sociale.\n\nD'autre part, la gratuité universelle représenterait un coût budgétaire colossal pour l'État, risquant de dégrader la qualité des infrastructures et du corps professoral sans financement privé complémentaire.\n\nEn conclusion, l'accès à l'université doit être garanti à tous, mais une gratuité ciblée sous forme de bourses sociales élevées me semble plus équitable qu'une gratuité aveugle bénéficiant également aux ménages aisés."
    }
  ]
];

let _cachedRegistry: ExamPaper[] | null = null;

export function getExamRegistry(): ExamPaper[] {
  if (_cachedRegistry) return _cachedRegistry;
  const registry: ExamPaper[] = [];

  // Generate 10 TCF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;
    const writingSet = TCF_WRITING_SUITE[i - 1];

    // Different question pool seed offset for Real Exam Mode to guarantee ZERO cheating
    const seedOffset = isPractice ? (i * 3) : (i * 7 + 13);

    registry.push({
      id: isPractice ? `tcf-canada-practice-paper-${paperNum}` : `tcf-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TCF Canada Guided Practice Paper ${paperNum}` : `TCF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TCF-PRAC-${numStr}` : `TCF-EXAM-${numStr}`,
      type: "TCF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper with step-by-step hints, audio transcripts, and 2-attempt answer validation (84 Items / 119 Mins).`
        : `Strict official FEI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 119 Mins).`,
      totalDurationMins: 119,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
          durationMins: 35,
          totalQuestions: 39,
          questions: generateListeningQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 39,
          questions: generateReadingQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 3,
          writingTasks: writingSet.map((wt, idx) => ({
            id: `tcf${i}-w${idx + 1}`,
            taskNumber: idx + 1,
            title: wt.title,
            prompt: wt.prompt,
            wordCountMin: wt.min,
            wordCountMax: wt.max,
            timeLimitMins: wt.time,
            guidedTips: ["Introduction claire", "Présenter 2 arguments développés", "Conclusion synthétique avec prise de position"],
            sampleResponse: wt.sampleResponse
          }))
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
          durationMins: 12,
          totalQuestions: 3,
          speakingTasks: [
            {
              id: `tcf${i}-spk-1`,
              taskNumber: 1,
              title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
              scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
              prepTimeMins: 0,
              speakingTimeMins: 2,
              keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est..."]
            },
            {
              id: `tcf${i}-spk-2`,
              taskNumber: 2,
              title: "Tâche 2 : Exercice en interaction (Recherche d'informations)",
              scenario: `Vous souhaitez obtenir des informations sur un service public au Québec (Sujet épreuve ${i}). Posez au moins 5 questions à l'examinateur sur les conditions d'accès, tarifs et démarches.`,
              prepTimeMins: 1,
              speakingTimeMins: 3.5,
              keyPhrases: ["Quels sont les documents requis ?", "Combien coûte l'inscription ?", "Est-il possible de faire les démarches en ligne ?"]
            },
            {
              id: `tcf${i}-spk-3`,
              taskNumber: 3,
              title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
              scenario: `Exprimez et défendez votre opinion à l'examinateur sur l'impact de la numérisation des services publics dans la société actuelle.`,
              prepTimeMins: 1,
              speakingTimeMins: 4.5,
              keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "Pour conclure, je dirais que..."]
            }
          ]
        }
      ]
    });
  }

  // Generate 10 TEF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;

    // Distinct seed offset for Real Exam Mode
    const seedOffset = isPractice ? (i * 4) : (i * 9 + 17);

    registry.push({
      id: isPractice ? `tef-canada-practice-paper-${paperNum}` : `tef-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TEF Canada Guided Practice Paper ${paperNum}` : `TEF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TEF-PRAC-${numStr}` : `TEF-EXAM-${numStr}`,
      type: "TEF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper tailored for TEF Canada Paris Chamber of Commerce (CCI) standards with hints and transcripts (84 Items / 135 Mins).`
        : `Strict official CCI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 135 Mins).`,
      totalDurationMins: 135,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
          durationMins: 40,
          totalQuestions: 40,
          questions: generateListeningQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 40,
          questions: generateReadingQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 2,
          writingTasks: [
            {
              id: `tef${i}-w1`,
              taskNumber: 1,
              title: "Section A : Article de Fait Divers (Newspaper Continuation)",
              prompt: `Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un événement inattendu a perturbé le centre-ville de Montréal (Sujet épreuve ${i})...'`,
              wordCountMin: 80,
              wordCountMax: 120,
              timeLimitMins: 25,
              guidedTips: ["Employer le passé composé et l'imparfait", "Décrire la réaction des passants et des secours", "Conclure par un retour au calme"]
            },
            {
              id: `tef${i}-w2`,
              taskNumber: 2,
              title: "Section B : Lettre d'opinion persuasive (Letter to Editor / Mayor)",
              prompt: `Rédigez une lettre d'opinion au journal local (200 mots minimum) pour exprimer votre accord ou désaccord sur l'aménagement de nouvelles pistes cyclables au détriment des voies de stationnement.`,
              wordCountMin: 200,
              wordCountMax: 250,
              timeLimitMins: 35,
              guidedTips: ["Salutation formelle", "Présenter 2 arguments environnementaux et de sécurité", "Conclure par une formule de politesse adaptée"]
            }
          ]
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
          durationMins: 15,
          totalQuestions: 2,
          speakingTasks: [
            {
              id: `tef${i}-spk-1`,
              taskNumber: 1,
              title: "Section A : Demande d'informations (10 Questions)",
              scenario: `Vous voyez une annonce pour une offre d'emploi ou un service à mi-temps. Appelez le responsable pour poser au moins 10 questions précises sur le poste (Épreuve ${i}).`,
              prepTimeMins: 0,
              speakingTimeMins: 5,
              keyPhrases: ["Quelles sont les compétences requises ?", "Quel est le salaire horaire proposé ?", "Quand commence le contrat ?"]
            },
            {
              id: `tef${i}-spk-2`,
              taskNumber: 2,
              title: "Section B : Convaincre un ami (Persuasive Speaking)",
              scenario: `Un ami hésite à s'inscrire à une aventure sportive ou culturelle ce week-end. Convainquez-le d'accepter cette opportunité avec vous (Épreuve ${i}).`,
              prepTimeMins: 1,
              speakingTimeMins: 10,
              keyPhrases: ["Pense à tous les bénéfices !", "Je m'occupe de la logistique.", "C'est le moment idéal de tenter l'expérience."]
            }
          ]
        }
      ]
    });
  }

  _cachedRegistry = registry;
  return registry;
}

export interface NCLCScoreResult {
  nclcLevel: number; // 1 to 12
  cefrEquivalent: string; // A1, A2, B1, B2, C1, C2
  expressEntryPoints: number; // CLB points for Express Entry
  statusMessage: string;
  isNCLC7TargetReached: boolean;
}

export function calculateNCLCScore(pctScore: number, _examType: ExamType, sectionType?: SectionType): NCLCScoreResult {
  const pct = Math.max(0, Math.min(100, pctScore));
  let nclcLevel = 0;
  let cefrEquivalent = "Unrated";
  let expressEntryPoints = 0;
  let isNCLC7TargetReached = false;

  if (pct === 0) {
    nclcLevel = 0;
    cefrEquivalent = "Unrated";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  } else if (sectionType === "EXPRESSION_ECRITE" || sectionType === "EXPRESSION_ORALE") {
    // Official 20-Point Scale Cutoffs for Writing & Speaking (FEI / Paris Standards)
    if (pct >= 90.0) { // 18-20 / 20 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 80.0) { // 16-17 / 20 (C1 Advanced)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 70.0) { // 14-16 / 20 (B2 Upper Vantage)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 60.0) { // 12-13 / 20 (B2 Target Benchmark)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 50.0) { // 10-11 / 20 (B1 Intermediate)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 40.0) { // 8-9 / 20 (B1 Threshold)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.0) { // 5-7 / 20 (A2 Elementary)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // 1-4 / 20 (A1 Beginner)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  } else {
    // Official 39-Item Scale Cutoffs for Listening & Reading
    if (pct >= 89.7) { // 35-39 / 39 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 82.0) { // 32-34 / 39 (NCLC 9 C1 Advanced - 31 CRS Points)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 69.2) { // 27-31 / 39 (NCLC 8 B2 Upper - 23 CRS Points)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 58.9) { // 23-27 / 39 (NCLC 7 B2 Target Benchmark for Express Entry - 17 CRS Points)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 46.1) { // 18-22 / 39 (NCLC 6 B1 Intermediate - 12 CRS Points)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 35.8) { // 14-17 / 39 (NCLC 5 B1 Threshold - 6 CRS Points)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.6) { // 10-13 / 39 (NCLC 4 A2 Elementary - 0 CRS Points)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // < 10 / 39 (NCLC 3 A1 - 0 CRS Points)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  }

  const statusMessage = pct === 0
    ? `⚠️ No questions attempted or 0% score recorded. Please complete the test questions in each section to receive a diagnostic NCLC rating.`
    : isNCLC7TargetReached
    ? `🎉 Excellent! Score achieves NCLC ${nclcLevel} (${cefrEquivalent}) — Meets Canadian Express Entry PR Benchmark!`
    : `💪 NCLC ${nclcLevel} (${cefrEquivalent}) recorded. Aim for 23/39 (58.9%+) to hit the official NCLC 7 (B2) immigration benchmark.`;

  return {
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    statusMessage,
    isNCLC7TargetReached
  };
}
