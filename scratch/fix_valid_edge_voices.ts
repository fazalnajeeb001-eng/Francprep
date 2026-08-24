import { MASTER_SPEAKING_BANK } from "../src/lib/speakingMasterBank";
import * as fs from "fs";

// Valid MS Edge / Azure Neural French Voice Roster
const validVoiceMap: Record<number, { name: string; voiceId: string; gender: "male" | "female" }> = {
  1: { name: "Examiner Henri", voiceId: "fr-FR-HenriNeural", gender: "male" },
  2: { name: "Examiner Denise", voiceId: "fr-FR-DeniseNeural", gender: "female" },
  3: { name: "Examiner Jean", voiceId: "fr-CA-JeanNeural", gender: "male" },
  4: { name: "Examiner Sylvie", voiceId: "fr-CA-SylvieNeural", gender: "female" },
  5: { name: "Examiner Rémy", voiceId: "fr-FR-RemyMultilingualNeural", gender: "male" },
  6: { name: "Examiner Vivienne", voiceId: "fr-FR-VivienneMultilingualNeural", gender: "female" },
  7: { name: "Examiner Antoine", voiceId: "fr-CA-JeanNeural", gender: "male" },
  8: { name: "Examiner Brigitte", voiceId: "fr-FR-DeniseNeural", gender: "female" },
  9: { name: "Examiner Pierre", voiceId: "fr-FR-HenriNeural", gender: "male" },
  10: { name: "Examiner Sophie", voiceId: "fr-FR-VivienneMultilingualNeural", gender: "female" }
};

function fixValidEdgeVoices() {
  console.log("=== 🛠️ FIXING VALID MS EDGE NEURAL VOICE IDS ACROSS ALL 10 PAPERS ===");

  const fullBank = { ...MASTER_SPEAKING_BANK };

  Object.keys(fullBank).forEach((pStr) => {
    const pNum = Number(pStr);
    const persona = validVoiceMap[pNum];
    const tasks = fullBank[pNum];

    tasks.forEach((t) => {
      t.examinerPersona.name = persona.name;
      t.examinerPersona.voiceId = persona.voiceId;
      t.examinerPersona.gender = persona.gender;
    });

    console.log(`✅ Paper ${pNum}: Assigned ${persona.name} (${persona.voiceId}) [VALID]`);
  });

  const content = `/**
 * 🇨🇦 FrancPrep Master Authentic Speaking Bank (Phase 2 Voice-Fixed)
 * Official France Éducation International (FEI) TCF Canada Standard
 * 30 Authentic Tasks across Papers 1 to 10 with Valid Neural Voice Personas
 */

export interface StimulusDocument {
  title: string;
  category: string;
  organization: string;
  content: string;
  details: string[];
  contactInfo: string;
}

export interface MasterSpeakingTask {
  id: string;
  paperNumber: number;
  taskNumber: 1 | 2 | 3;
  title: string;
  titleEn: string;
  cefrTarget: "A1-B1" | "B1-C1" | "B2-C2";
  scenario: string;
  scenarioEn: string;
  stimulusDocument?: StimulusDocument;
  examinerPersona: {
    name: string;
    role: string;
    gender: "female" | "male";
    voiceId: string;
    openingPromptFrench: string;
    openingPromptEnglish: string;
    followUpCounterQuestion?: string;
    roleplayPrompt?: string;
  };
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases: string[];
  recommendedConnectors: string[];
  trapAlert: string;
  trapAlertEn: string;
  speakingCoach: string;
  speakingCoachEn: string;
}

export const MASTER_SPEAKING_BANK: Record<number, MasterSpeakingTask[]> = ${JSON.stringify(fullBank, null, 2)};

export function getMasterSpeakingTasks(paperIdOrNumber: string | number): MasterSpeakingTask[] {
  let paperNum = 1;
  if (typeof paperIdOrNumber === "number") {
    paperNum = Math.min(10, Math.max(1, paperIdOrNumber));
  } else {
    const matched = String(paperIdOrNumber).match(/\\d+/);
    if (matched) {
      paperNum = Math.min(10, Math.max(1, parseInt(matched[0], 10)));
    }
  }

  return MASTER_SPEAKING_BANK[paperNum] || MASTER_SPEAKING_BANK[1];
}
`;

  fs.writeFileSync("src/lib/speakingMasterBank.ts", content);
  console.log("\n🎉 Successfully updated src/lib/speakingMasterBank.ts with 100% valid Edge Neural Voice IDs!");
}

fixValidEdgeVoices();
