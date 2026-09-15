import { LISTENING_GUIDANCE_BANK } from "./listeningGuidanceBank";

export interface QuestionGuidance {
  trapAlert: string;
  trapAlertEn: string;
  audioCoach: string;
  audioCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
  combinedHint: string;
}

export function getQuestionGuidance(
  qNum: number,
  level: string,
  questionPrompt: string,
  correctText: string,
  passage: string,
  correctTextEn?: string,
  passageEn?: string,
  questionPromptEn?: string,
  correctIndex: number = 0,
  paperNum?: number
): QuestionGuidance {
  if (paperNum) {
    const key = `p${paperNum}_q${qNum}`;
    const entry = LISTENING_GUIDANCE_BANK[key];
    if (entry) {
      return {
        trapAlert: entry.trapAlert,
        trapAlertEn: entry.trapAlertEn,
        audioCoach: entry.audioCoach,
        audioCoachEn: entry.audioCoachEn,
        detailedExplanation: entry.detailedExplanation,
        detailedExplanationEn: entry.detailedExplanationEn,
        combinedHint: `${entry.trapAlert}\n\n${entry.audioCoach}`
      };
    }
  }

  const letters = ["A", "B", "C", "D"];
  const correctLetter = letters[correctIndex] || "A";
  const finalCorrectEn = (correctTextEn && correctTextEn.trim()) ? correctTextEn.trim() : correctText;
  const finalPassageEn = (passageEn && passageEn.trim()) ? passageEn.trim() : passage;

  let trapAlert = `⚠️ Piège ${level} (Compréhension Orale) : Attention aux pièges d'association phonétique et aux leurres de débit rapide ! Ne vous fiez pas aux mots isolés qui réutilisent des sonorités du document sonore mais en déforment le sens global.`;
  
  let trapAlertEn = `⚠️ Level ${level} Acoustic Trap Alert: Watch out for phonetic lure traps and rapid speech distractors! Do not rely on isolated keywords that mimic sounds from the audio clip while distorting overall meaning.`;

  let audioCoach = `💡 Stratégie ${level} (Écoute Ciblée) : Lisez attentivement la question et effectuez une écoute ciblée du document sonore. Repérez l'intention principale du locuteur et les connecteurs logiques pivots. Éliminez immédiatement les propositions contenant des contresens ou des exagérations absolues.`;

  let audioCoachEn = `💡 Level ${level} Listening Coach: Read the prompt carefully and perform targeted acoustic scanning of the audio clip. Identify the speaker's core intent and pivot transition markers. Immediately rule out options containing direct contradictions or unstated extreme claims.`;

  const breakdownFr = letters.map((l, idx) => {
    if (idx === correctIndex) {
      return `  - Option ${l} (« ${correctText} ») [CORRECTE] : Traduit avec une parfaite exactitude la réponse vérifiée dans le passage sans aucune déformation.`;
    } else {
      return `  - Option ${l} [INCORRECTE - PIÈGE DU DISTRACTEUR ACOUSTIQUE OU CONTEXTUEL] : Utilise des repères phonétiques ou temporels erronés qui déforment les faits précis du document.`;
    }
  }).join("\n");

  const breakdownEn = letters.map((l, idx) => {
    if (idx === correctIndex) {
      return `  - Option ${l} ("${finalCorrectEn}") [CORRECT]: Accurately conveys the passage's verified meaning without distortion.`;
    } else {
      return `  - Option ${l} [INCORRECT - ACOUSTIC OR NUMERICAL DISTRACTOR TRAP]: Uses inaccurate phonetic or temporal anchors that distort explicit passage figures.`;
    }
  }).join("\n");

  let detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctText} »)\n\n• Justification auditive :\nEn réponse à la question, le document sonore énonce : « ${passage} ».\nL'Option ${correctLetter} (« ${correctText} ») exprime fidèlement l'information essentielle transmise dans le document sonore.\n\n• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

  let detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${finalCorrectEn}")\n\n• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

  const combinedHint = `${trapAlert}\n\n${audioCoach}`;

  return {
    trapAlert,
    trapAlertEn,
    audioCoach,
    audioCoachEn,
    detailedExplanation,
    detailedExplanationEn,
    combinedHint
  };
}

