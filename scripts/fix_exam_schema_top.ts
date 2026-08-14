import * as fs from "fs";

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

const tag = "export interface ExamSection {";
const tagIndex = content.indexOf(tag);

if (tagIndex === -1) {
  console.error("❌ tag not found");
  process.exit(1);
}

const topContent = `import { getHdIllustration } from "./hdIllustrationAssets";
import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";
import { translateOptionMaster } from "./masterOptionsDictionary";
import { getAuthenticB2Item, getAuthenticC1C2Item } from "./authenticListeningAdvancedBank";
import { getQuestionGuidance } from "./practiceGuidanceBank";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  level?: string;
  speakingRate?: number;
  text: string;
  questionPrompt?: string;
  questionPromptEnglish?: string;
  options: string[];
  optionsEnglish?: string[];
  optionImages?: string[];
  mainImage?: string;
  hasSpokenOptions?: boolean;
  correctIndex: number;
  explanation: string;
  hint?: string;
  trapAlert?: string;
  trapAlertEn?: string;
  audioCoach?: string;
  audioCoachEn?: string;
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

`;

content = topContent + content.substring(tagIndex);
fs.writeFileSync(filePath, content);
console.log("✅ Successfully fixed top of examSchema.ts!");
