/**
 * 🇨🇦 Official TEF Canada Scoring Engine & IRCC Equivalency Scale
 * Governed by CCI Paris Île-de-France & IRCC Express Entry Benchmark
 * Scale: 0 to 699 CCI Points -> NCLC 4 to 10+ -> CRS Points
 */

export interface TefScoreResult {
  rawScore: number;
  maxRawScore: number;
  percentage: number;
  cciScore: number; // 0 - 699
  nclcLevel: number; // 0 - 10
  cefrEquivalent: "Unrated" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  expressEntryPoints: number; // 0, 6, 9, 17, 23, 31, 34
  isNCLC7TargetReached: boolean;
  isSafetyZoneReached: boolean; // True if cciScore >= 434 (recommended buffer zone)
  legacyEquivalent: string; // Ancien Score equivalent (e.g. 249 - 279 for NCLC 7)
  performanceFeedbackFr: string;
  performanceFeedbackEn: string;
}

/**
 * Calculates official CCI Paris scaled score, NCLC level, and Express Entry CRS points
 * for TEF Canada Compréhension Orale (40 Questions)
 */
export function calculateTefListeningScore(rawScore: number): TefScoreResult {
  const clampedRaw = Math.max(0, Math.min(40, Math.round(rawScore)));
  const percentage = Math.round((clampedRaw / 40) * 100);

  let cciScore = 0;
  let nclcLevel = 0;
  let cefrEquivalent: TefScoreResult["cefrEquivalent"] = "Unrated";
  let expressEntryPoints = 0;
  let isNCLC7TargetReached = false;
  let legacyEquivalent = "";
  let isSafetyZoneReached = false;
  let performanceFeedbackFr = "";
  let performanceFeedbackEn = "";

  if (clampedRaw >= 38) {
    // C2 (NCLC 10+) : 600 - 699 CCI Points (Legacy: 349 - 360)
    cciScore = Math.round(600 + ((clampedRaw - 38) / 2) * 99);
    nclcLevel = 10;
    cefrEquivalent = "C2";
    expressEntryPoints = 34;
    isNCLC7TargetReached = true;
    isSafetyZoneReached = true;
    legacyEquivalent = "349 – 360 pts";
    performanceFeedbackFr = "Maîtrise bilingue exceptionnelle. Compréhension parfaite des nuances, de l'implicite et des débits rapides.";
    performanceFeedbackEn = "Exceptional bilingual mastery. Flawless comprehension of implicit nuance and rapid native discourse.";
  } else if (clampedRaw >= 33) {
    // C1 (NCLC 9) : 503 - 599 CCI Points (Legacy: 316 - 348)
    cciScore = Math.round(503 + ((clampedRaw - 33) / 4) * 96);
    nclcLevel = 9;
    cefrEquivalent = "C1";
    expressEntryPoints = 31;
    isNCLC7TargetReached = true;
    isSafetyZoneReached = true;
    legacyEquivalent = "316 – 348 pts";
    performanceFeedbackFr = "Niveau autonome avancé. Compréhension solide d'émissions complexes et d'arguments nuancés.";
    performanceFeedbackEn = "Advanced autonomous proficiency. Strong grasp of complex broadcasts and nuanced arguments.";
  } else if (clampedRaw >= 29) {
    // B2 Upper (NCLC 8) : 458 - 502 CCI Points (Legacy: 280 - 315)
    cciScore = Math.round(458 + ((clampedRaw - 29) / 3) * 44);
    nclcLevel = 8;
    cefrEquivalent = "B2";
    expressEntryPoints = 23;
    isNCLC7TargetReached = true;
    isSafetyZoneReached = true;
    legacyEquivalent = "280 – 315 pts";
    performanceFeedbackFr = "Niveau B2 supérieur. Très bonne aisance sur la majorité des reportages et micro-trottoirs.";
    performanceFeedbackEn = "Upper B2 proficiency. High comfort across most news segments and public opinion interviews.";
  } else if (clampedRaw >= 24) {
    // B2 Target (NCLC 7) : 398 - 457 CCI Points (Legacy: 249 - 279) (IRCC Express Entry PR Target)
    cciScore = Math.round(398 + ((clampedRaw - 24) / 4) * 59);
    nclcLevel = 7;
    cefrEquivalent = "B2";
    expressEntryPoints = 17;
    isNCLC7TargetReached = true;
    isSafetyZoneReached = cciScore >= 434;
    legacyEquivalent = "249 – 279 pts";
    performanceFeedbackFr = isSafetyZoneReached
      ? "🎯 Seuil cible NCLC 7 atteint avec marge de sécurité (Zone Confort 434+). Validé pour l'Entrée Express !"
      : "🎯 Seuil cible NCLC 7 atteint (398+). Marge légale IRCC validée (+17 points CRS).";
    performanceFeedbackEn = isSafetyZoneReached
      ? "🎯 Target NCLC 7 Benchmark Reached with Safety Buffer (Comfort Zone 434+). Validated for Express Entry!"
      : "🎯 Target NCLC 7 Benchmark Reached (398+). Official IRCC legal threshold secured (+17 CRS Points).";
  } else if (clampedRaw >= 19) {
    // B1 Upper (NCLC 6) : 349 - 397 CCI Points (Legacy: 217 - 248)
    cciScore = Math.round(349 + ((clampedRaw - 19) / 4) * 48);
    nclcLevel = 6;
    cefrEquivalent = "B1";
    expressEntryPoints = 9;
    isNCLC7TargetReached = false;
    isSafetyZoneReached = false;
    legacyEquivalent = "217 – 248 pts";
    performanceFeedbackFr = "Niveau seuil intermédiaire B1+. Bonne compréhension des messages concrets de la vie courante.";
    performanceFeedbackEn = "Intermediate B1+ threshold. Good comprehension of concrete daily announcements and dialogues.";
  } else if (clampedRaw >= 14) {
    // B1 Lower (NCLC 5) : 310 - 348 CCI Points (Legacy: 181 - 216)
    cciScore = Math.round(310 + ((clampedRaw - 14) / 4) * 38);
    nclcLevel = 5;
    cefrEquivalent = "B1";
    expressEntryPoints = 6;
    isNCLC7TargetReached = false;
    isSafetyZoneReached = false;
    legacyEquivalent = "181 – 216 pts";
    performanceFeedbackFr = "Niveau B1 de base. Compréhension partielle des messages audio.";
    performanceFeedbackEn = "Base B1 level. Partial comprehension of spoken messages.";
  } else if (clampedRaw >= 9) {
    // A2 (NCLC 4) : 249 - 309 CCI Points (Legacy: 145 - 180)
    cciScore = Math.round(249 + ((clampedRaw - 9) / 4) * 60);
    nclcLevel = 4;
    cefrEquivalent = "A2";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
    isSafetyZoneReached = false;
    legacyEquivalent = "145 – 180 pts";
    performanceFeedbackFr = "Niveau élémentaire A2. Repérage des mots familiers uniquement.";
    performanceFeedbackEn = "Elementary A2 level. Recognition of familiar vocabulary only.";
  } else {
    // A1 / Unrated : 0 - 248 CCI Points (Legacy: 0 - 144)
    cciScore = Math.round((clampedRaw / 8) * 248);
    nclcLevel = clampedRaw >= 5 ? 3 : clampedRaw >= 3 ? 2 : clampedRaw >= 1 ? 1 : 0;
    cefrEquivalent = clampedRaw >= 5 ? "A1" : "Unrated";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
    isSafetyZoneReached = false;
    legacyEquivalent = "0 – 144 pts";
    performanceFeedbackFr = "Score insuffisant pour l'évaluation NCLC. Renforcement linguistique nécessaire.";
    performanceFeedbackEn = "Insufficient score for NCLC benchmark. Core language reinforcement required.";
  }

  return {
    rawScore: clampedRaw,
    maxRawScore: 40,
    percentage,
    cciScore,
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    isNCLC7TargetReached,
    isSafetyZoneReached,
    legacyEquivalent,
    performanceFeedbackFr,
    performanceFeedbackEn
  };
}
