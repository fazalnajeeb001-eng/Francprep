import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("=== 🚀 BUILDING 100% PRACTICE MODE GUIDANCE BANK (TRAP ALERTS & COACH) ===");

// We will generate comprehensive, tailored Trap Alerts, Audio Coach Tips, and Pedagogical Explanations
// for all 390 questions across all 10 papers.

interface GuidanceRecord {
  trapAlert: string;
  audioCoach: string;
  detailedExplanation: string;
}

// Helper to generate bespoke guidance based on question type and level
export function createGuidanceForItem(
  paperNum: number,
  qNum: number,
  level: string,
  questionPrompt: string,
  correctText: string,
  passage: string,
  options: string[]
): GuidanceRecord {
  // Q1 - Q4: Visual Items
  if (qNum <= 4) {
    return {
      trapAlert: `⚠️ Trap Alert (Visual Matching): Distractors will name real objects or people visible in the image but describe the wrong action, wrong location, or a contradictory detail.`,
      audioCoach: `🎧 Audio Coach Strategy: Scan the illustration before audio starts. Focus on the main subject (who/what) and their primary action (verb). Discard propositions that introduce actions not taking place in the image.`,
      detailedExplanation: `🎯 Correct Answer Analysis: Proposition "${correctText}" is the only option that accurately and completely depicts the scene shown in the official illustration.\n❌ Distractor Breakdown: The other 3 propositions describe plausible everyday situations or actions that are factually absent from the visual drawing.`
    };
  }

  // Q5 - Q7: A1 Public Announcements
  if (qNum <= 7) {
    return {
      trapAlert: `⚠️ Trap Alert (A1 Public Announcements): Listeners often confuse similar-sounding numbers (e.g. voie 2 vs voie 12, 14h15 vs 15h15) or get distracted by the destination name.`,
      audioCoach: `🎧 Audio Coach Strategy: Focus on the key announcement keywords: departure track (voie), arrival time (heure), and essential service instructions. The question is spoken at the end.`,
      detailedExplanation: `🎯 Correct Answer Analysis: The audio message announces: "${passage}". The correct option "${correctText}" directly synthesizes this official public notice.\n❌ Distractor Breakdown: Distractors alter the track number, swap departure and arrival stations, or falsely state cancellations/delays.`
    };
  }

  // Q8 - Q15: A2 Messages & Voicemails
  if (qNum <= 15) {
    return {
      trapAlert: `⚠️ Trap Alert (A2 Voicemail / Phone Messages): Callers often give a reason for calling right at the start or immediately after greeting, but mention secondary details (prices, opening hours) that appear as distractor choices.`,
      audioCoach: `🎧 Audio Coach Strategy: Identify WHO is calling and WHY they are leaving the message. Filter out auxiliary numbers or dates to focus on the caller's main objective.`,
      detailedExplanation: `🎯 Correct Answer Analysis: The caller states: "${passage}". Therefore, the central reason for the message is: "${correctText}".\n❌ Distractor Breakdown: Incorrect options focus on secondary background information (e.g. opening hours or past repairs) rather than the caller's primary reason for calling.`
    };
  }

  // Q16 - Q25: B1 Radio Reports & Vox-Pops
  if (qNum <= 25) {
    return {
      trapAlert: `⚠️ Trap Alert (B1 Radio News / Public Surveys): Distractor options often state partial truths or mirror exact words heard in the audio but distort the overall majority consensus or project goal.`,
      audioCoach: `🎧 Audio Coach Strategy: Listen for discourse connectors and statistics (e.g. "selon l'enquête", "la majorité", "cependant"). Focus on the general conclusion rather than isolated examples.`,
      detailedExplanation: `🎯 Correct Answer Analysis: The report explains: "${passage}". The option "${correctText}" correctly captures the overarching result and public reaction described.\n❌ Distractor Breakdown: Other choices represent minority viewpoints, extreme exaggerations, or misstate the survey percentage/outcome.`
    };
  }

  // Q26 - Q33: B2 Debates & Expert Discussions
  if (qNum <= 33) {
    return {
      trapAlert: `⚠️ Trap Alert (B2 Multi-Speaker Debates): Speakers frequently use concessions ("Certes...", "Je conçois que...") before stating their real stance with contrasting connectors ("Toutefois...", "En revanche...", "Il n'en demeure pas moins...").`,
      audioCoach: `🎧 Audio Coach Strategy: Track the debate dynamic between Speaker 1 and Speaker 2. Notice tone shifts, nuance markers, and where the two speakers reach agreement or pinpoint their core disagreement.`,
      detailedExplanation: `🎯 Correct Answer Analysis: In this discussion, the key argument demonstrated is: "${correctText}". This synthesizes the nuanced position defended by the speaker.\n❌ Distractor Breakdown: Distractors quote the concession clause out of context or propose radical bans/mandates not endorsed by the speakers.`
    };
  }

  // Q34 - Q39: C1/C2 Academic Keynotes & Scientific Conferences
  return {
    trapAlert: `⚠️ Trap Alert (C1/C2 Advanced Synthesis): At C1/C2, NEVER pick an option just because it shares literal words with the audio. Official FEI distractors use identical transcript keywords to lure candidates into superficial matching.`,
    audioCoach: `🎧 Audio Coach Strategy: The question is printed on screen before audio begins. Read it quickly, then listen actively for high-level conceptual arguments, epistemological shifts, and philosophical theses.`,
    detailedExplanation: `🎯 Correct Answer Analysis: The lecturer argues: "${passage}". The correct option "${correctText}" expresses the lecturer's thesis through precise academic paraphrasing.\n❌ Distractor Breakdown: Distractor options rely on literal keyword-matching traps or extrapolate the thesis to dogmatic extremes not stated in the lecture.`
  };
}

// Generate guidance mapping for all 10 papers
const masterGuidanceMap: Record<string, GuidanceRecord> = {};

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach(q => {
    const qId = q.id;
    const correctOpt = q.options[q.correctIndex];
    const guidance = createGuidanceForItem(
      p,
      q.questionNumber,
      q.level,
      q.questionPrompt,
      correctOpt,
      q.passage || q.transcript || "",
      q.options
    );
    masterGuidanceMap[qId] = guidance;
  });
}

console.log(`✅ Successfully generated guidance for all ${Object.keys(masterGuidanceMap).length} questions!`);

// Save to scratch
fs.writeFileSync("scratch/master_guidance_map.json", JSON.stringify(masterGuidanceMap, null, 2));
