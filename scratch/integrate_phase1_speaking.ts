import { MASTER_SPEAKING_SUITE } from "./speaking_master_dataset";
import * as fs from "fs";

function integratePhase1Speaking() {
  console.log("=== 🛠️ INTEGRATING PHASE 1 CALIBRATED SPEAKING SUITE INTO src/lib/speakingMasterBank.ts ===");

  const bankRecord: Record<number, any[]> = {};

  MASTER_SPEAKING_SUITE.forEach((paper) => {
    bankRecord[paper.paperNum] = paper.tasks.map((t) => ({
      id: t.id,
      paperNumber: paper.paperNum,
      taskNumber: t.taskNumber,
      title: t.title,
      titleEn: t.title,
      cefrTarget: t.level === "A1" ? "A1-B1" : t.level === "B1" ? "B1-C1" : "B2-C2",
      scenario: t.prompt,
      scenarioEn: t.promptEnglish,
      examinerPersona: {
        name: t.examinerPersona.name,
        role: t.examinerPersona.roleDescription,
        gender: t.examinerPersona.gender,
        voiceId: t.examinerPersona.voiceId,
        openingPromptFrench: t.examinerPersona.greetingText,
        openingPromptEnglish: t.examinerPersona.greetingTextEnglish,
        followUpCounterQuestion: t.examinerPersona.counterArgumentPrompt,
        roleplayPrompt: t.examinerPersona.roleplayPrompt
      },
      prepTimeMins: t.prepTimeMins,
      speakingTimeMins: t.speakingTimeMins,
      keyPhrases: t.guidedTips,
      recommendedConnectors: ["tout d'abord", "en revanche", "de surcroît", "en conclusion"],
      trapAlert: t.guidedTips.join("\n"),
      trapAlertEn: t.guidedTips.join("\n"),
      speakingCoach: `Conseil pour ${t.title} : Maintenez un ton naturel et respectez le registre de langue.`,
      speakingCoachEn: `Advice for ${t.title}: Maintain a natural tone and respect the formal register.`
    }));
  });

  const content = `/**
 * 🇨🇦 FrancPrep Master Authentic Speaking Bank (Phase 1 Calibrated)
 * Official France Éducation International (FEI) TCF Canada Standard
 * 30 Authentic Tasks across Papers 1 to 10 with Single Examiner Voice Personas per Paper
 */

export interface MasterSpeakingTask {
  id: string;
  paperNumber: number;
  taskNumber: 1 | 2 | 3;
  title: string;
  titleEn: string;
  cefrTarget: "A1-B1" | "B1-C1" | "B2-C2";
  scenario: string;
  scenarioEn: string;
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

export const MASTER_SPEAKING_BANK: Record<number, MasterSpeakingTask[]> = ${JSON.stringify(bankRecord, null, 2)};

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
  console.log("🎉 Successfully updated src/lib/speakingMasterBank.ts with Single Examiner Voice Personas across all 10 Papers!");
}

integratePhase1Speaking();
