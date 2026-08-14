import * as fs from "fs";

console.log("=== 🏗️ DESIGNING 140 AUTHENTIC, NON-VERBATIM B2 & C1/C2 ITEMS ===");

// We will construct the master data for all 80 B2 items and all 60 C1/C2 items
export interface AuthenticItem {
  sceneIdx: number;
  level: "B2" | "C1" | "C2";
  title: string;
  topic: string;
  questionFrench: string;
  questionEnglish: string;
  passageFrench: string;
  passageEnglish: string;
  // Options: Index 0 is ALWAYS the nuanced pedagogical paraphrase (correct answer)
  // Options 1, 2, 3 are plausible, contextually sophisticated distractors
  optionsFrench: [string, string, string, string];
  optionsEnglish: [string, string, string, string];
  hint: string;
  explanation: string;
}

console.log("Interface defined.");
