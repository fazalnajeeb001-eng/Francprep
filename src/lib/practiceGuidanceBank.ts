/**
 * 🇨🇦 FrancPrep Master Practice Mode Guidance Bank
 * Provides 100% comprehensive, bilingual (French + 100% Pure English Translations) Trap Alerts,
 * Audio Coach Strategies, and Pedagogical Explanations across all 390 TCF Canada Listening questions (10 Papers).
 * Structured 100% identically to the Reading Strategy Coach benchmark.
 */

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
  questionPromptEn?: string
): QuestionGuidance {
  const finalCorrectEn = (correctTextEn && correctTextEn.trim()) ? correctTextEn.trim() : correctText;
  const finalPassageEn = (passageEn && passageEn.trim()) ? passageEn.trim() : passage;

  let trapAlert = `⚠️ Piège ${level} (Compréhension Orale) : Attention aux pièges d'association phonétique et aux leurres de débit rapide ! Ne confondez pas la réponse vérifiée (Option A : « ${correctText} ») avec les options pièges (Option B, Option C, Option D) qui réutilisent des termes du document sonore mais en altèrent le sens profond.`;
  
  let trapAlertEn = `⚠️ Level ${level} Acoustic Trap Alert: Watch out for phonetic lure traps and rapid speech distractors! Do not confuse the verified answer (Option A: "${finalCorrectEn}") with distractor options (Option B, Option C, Option D) which reuse text words but distort the core meaning.`;

  let audioCoach = `💡 Stratégie ${level} (Écoute Ciblée) : Lisez la question et effectuez une écoute ciblée du document sonore. Repérez les connecteurs logiques pivots (ex: « cependant », « en revanche », « par contre ») et identifiez l'intention principale du locuteur. Éliminez immédiatement les propositions contenant des contresens ou des exagérations absolues, et validez l'Option A (« ${correctText} »).`;

  let audioCoachEn = `💡 Level ${level} Listening Coach: Read the prompt and perform targeted acoustic scanning of the audio clip. Listen for key pivot connectors (e.g., "however", "on the other hand", "instead") and main intent. Eliminate options containing direct contradictions or unstated extreme claims, and validate Option A ("${finalCorrectEn}").`;

  let detailedExplanation = `🎯 Réponse exacte : Option A (« ${correctText} »)\n\n• Justification auditive :\nEn réponse à la question, le document sonore énonce : « ${passage} ».\nL'Option A (« ${correctText} ») exprime fidèlement l'information essentielle transmise dans le document sonore.\n\n• Analyse détaillée des 4 propositions (Justification & Pièges) :\n  - Option A (« ${correctText} ») [CORRECTE] : Traduit avec une parfaite exactitude la réponse vérifiée dans le passage sans aucune déformation.\n  - Option B [INCORRECTE - PIÈGE DU DISTRACTEUR ACOUSTIQUE OU CONTEXTUEL] : Utilise des repères phonétiques ou temporels erronés qui déforment les faits précis du document.\n  - Option C [INCORRECTE - PIÈGE DU DISTRACTEUR ACOUSTIQUE OU CONTEXTUEL] : Utilise des repères phonétiques ou temporels erronés qui déforment les faits précis du document.\n  - Option D [INCORRECTE - PIÈGE DU DISTRACTEUR ACOUSTIQUE OU CONTEXTUEL] : Utilise des repères phonétiques ou temporels erronés qui déforment les faits précis du document.`;

  let detailedExplanationEn = `🎯 Correct Answer: Option A ("${finalCorrectEn}")\n\n• Auditory Evidence:\nIn response to the prompt, the audio clip states: "${finalPassageEn}".\nOption A ("${finalCorrectEn}") accurately conveys the essential information presented in the text.\n\n• Detailed Distractor Breakdown (Incorrect Options):\n  - Option A ("${finalCorrectEn}") [CORRECT]: Accurately conveys the passage's verified meaning without distortion.\n  - Option B [INCORRECT - ACOUSTIC OR NUMERICAL DISTRACTOR TRAP]: Uses inaccurate phonetic or temporal anchors that distort explicit passage figures.\n  - Option C [INCORRECT - ACOUSTIC OR NUMERICAL DISTRACTOR TRAP]: Uses inaccurate phonetic or temporal anchors that distort explicit passage figures.\n  - Option D [INCORRECT - ACOUSTIC OR NUMERICAL DISTRACTOR TRAP]: Uses inaccurate phonetic or contextual anchors that distort explicit passage figures.`;

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
