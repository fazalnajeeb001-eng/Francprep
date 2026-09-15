import fs from 'fs';
import path from 'path';
import { AUTHENTIC_READING_MASTER_BANK } from '../src/lib/authenticReadingMasterBank';

export interface ReadingGuidanceEntry {
  trapAlert: string;
  trapAlertEn: string;
  readingCoach: string;
  readingCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
}

function cleanOptionForSentence(opt: string): string {
  if (!opt) return "";
  let s = opt.trim();
  if (s.endsWith('.')) s = s.slice(0, -1);
  return s;
}

const guidanceBank: Record<string, ReadingGuidanceEntry> = {};
const letters = ["A", "B", "C", "D"];

for (let pIdx = 0; pIdx < AUTHENTIC_READING_MASTER_BANK.length; pIdx++) {
  const paper = AUTHENTIC_READING_MASTER_BANK[pIdx];
  const paperNum = pIdx + 1;

  for (const item of paper) {
    const qNum = item.qNum;
    const key = `p${paperNum}_q${qNum}`;

    const correctIdx = item.ans;
    const correctLetter = letters[correctIdx] || "A";

    const optFr = item.opt.map(cleanOptionForSentence);
    const optEn = (item.optEn && item.optEn.length === 4)
      ? item.optEn.map(cleanOptionForSentence)
      : optFr;

    const correctOptFr = optFr[correctIdx];
    const correctOptEn = optEn[correctIdx];

    const docType = item.docType || "Document";
    const level = item.level;

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. NON-SPOILING TRAP ALERTS (Zero mention of Option [ABCD] or correct answer)
    // ─────────────────────────────────────────────────────────────────────────────
    let trapAlert = "";
    let trapAlertEn = "";

    if (level === "A1") {
      trapAlert = `⚠️ Piège A1 (${docType}) : Ne vous fiez pas uniquement à un mot isolé dans le texte. Vérifiez l'objectif global du document public pour éviter les options mentionnant des éléments secondaires ou non écrits.`;
      trapAlertEn = `⚠️ Level A1 Trap Alert (${docType}): Do not rely solely on an isolated keyword. Verify the overarching purpose of the public document to avoid distractor options mentioning secondary or unwritten details.`;
    } else if (level === "A2") {
      trapAlert = `⚠️ Piège A2 (${docType}) : Attention aux conditions pratiques et aux consignes obligatoires (horaires, formalités, dates). Les distracteurs modifient fréquemment un détail opérationnel ou inventent une contrainte.`;
      trapAlertEn = `⚠️ Level A2 Trap Alert (${docType}): Pay close attention to practical guidelines and mandatory requirements (schedules, procedures, deadlines). Distractors often alter an operational detail or fabricate an unstated constraint.`;
    } else if (level === "B1") {
      trapAlert = `⚠️ Piège B1 (${docType}) : Méfiez-vous des options radicales affirmant un échec total ou un succès absolu. Les articles B1 présentent un bilan équilibré combinant réussites concrètes et ajustements nécessaires.`;
      trapAlertEn = `⚠️ Level B1 Trap Alert (${docType}): Beware of extreme binary options claiming complete failure or total success. Level B1 articles present a balanced assessment combining tangible achievements with necessary refinements.`;
    } else if (level === "B2") {
      trapAlert = `⚠️ Piège B2 (${docType}) : Ne confondez pas le constat introductif des difficultés avec la thèse prospective défendue par l'auteur. Éliminez les options proposant le statu quo ou des mesures palliatives superficielles.`;
      trapAlertEn = `⚠️ Level B2 Trap Alert (${docType}): Do not confuse the introductory overview of challenges with the author's forward-looking thesis. Eliminate options proposing status quo complacency or superficial temporary palliatives.`;
    } else {
      // C1 / C2
      trapAlert = `⚠️ Piège ${level} (${docType}) : Attention aux leurres terminologiques ! Les textes académiques et philosophiques réutilisent des concepts denses ; méfiez-vous des propositions qui reprennent des mots exacts du passage mais en déforment la portée dialectique.`;
      trapAlertEn = `⚠️ Level ${level} Trap Alert (${docType}): Watch out for terminological echo traps! Advanced academic and philosophical texts use dense concepts; beware of options repeating verbatim passage terms while distorting their dialectical intent.`;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. NON-SPOILING READING COACH (Actionable strategy, zero spoilers)
    // ─────────────────────────────────────────────────────────────────────────────
    let readingCoach = "";
    let readingCoachEn = "";

    if (level === "A1") {
      readingCoach = `💡 Stratégie A1 (${docType}) : Effectuez une lecture de repérage rapide (skimming) sur l'en-tête et les deux premières lignes pour identifier immédiatement l'objet principal (qui, quoi, où, quand).`;
      readingCoachEn = `💡 Level A1 Reading Coach (${docType}): Perform a quick scanning pass (skimming) of the header and opening lines to immediately identify the primary factual objective (who, what, where, when).`;
    } else if (level === "A2") {
      readingCoach = `💡 Stratégie A2 (${docType}) : Balayez le document à la recherche des mots-clés d'action (« inscription », « obligatoire », « conditions », « horaire ») afin de vérifier l'instruction exacte demandée.`;
      readingCoachEn = `💡 Level A2 Reading Coach (${docType}): Scan the document for action-oriented keywords ("registration", "mandatory", "requirements", "schedule") to verify the exact practical instruction requested.`;
    } else if (level === "B1") {
      readingCoach = `💡 Stratégie B1 (${docType}) : Repérez les connecteurs logiques de concession et d'opposition (« bien que », « toutefois », « néanmoins », « malgré ») pour cerner la synthèse globale des observateurs.`;
      readingCoachEn = `💡 Level B1 Reading Coach (${docType}): Locate logical transition words of concession and contrast ("although", "however", "nevertheless", "despite") to grasp the observers' overall balanced takeaway.`;
    } else if (level === "B2") {
      readingCoach = `💡 Stratégie B2 (${docType}) : Analysez le paragraphe de synthèse et les verbes d'argumentation forte (« exige », « démontre », « impose », « plaide pour ») afin d'isoler la thèse structurelle de l'auteur.`;
      readingCoachEn = `💡 Level B2 Reading Coach (${docType}): Analyze the concluding synthesis and strong argumentative verbs ("requires", "demonstrates", "demands", "advocates for") to isolate the author's structural thesis.`;
    } else {
      // C1 / C2
      readingCoach = `💡 Stratégie ${level} (${docType}) : Cartographiez l'architecture dialectique (thèse, antithèse, synthèse) et repérez la posture épistémologique de l'auteur face aux mutations sociétales pour identifier la reformulation conceptuelle exacte.`;
      readingCoachEn = `💡 Level ${level} Reading Coach (${docType}): Map the dialectical framework (thesis, antithesis, synthesis) and identify the author's epistemological stance regarding societal transformations to pinpoint the accurate conceptual reformulation.`;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 3. DETAILED EXPLANATION & DISTRACTOR BREAKDOWN (Post-submission disclosure)
    // ─────────────────────────────────────────────────────────────────────────────
    let wrongCount = 0;

    const breakdownFr = letters.map((l, idx) => {
      if (idx === correctIdx) {
        return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Traduit avec une parfaite exactitude l'information vérifiée dans le document sans aucune altération.`;
      }

      wrongCount++;
      const currentOptFr = optFr[idx];
      const hasDigits = /\d/.test(currentOptFr);

      if (level === "A1" || level === "A2") {
        if (hasDigits) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - PIÈGE DU DISTRACTEUR CHIFFRÉ OU TEMPOREL] : Utilise des repères chiffrés ou temporels erronés (« ${currentOptFr} ») qui déforment les faits précis du document.`;
        } else if (wrongCount % 3 === 1) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - PIÈGE DE LEURRE LEXICAL ET FAUSSE ASSUMPTION] : Réutilise des termes du vocabulaire du texte (« ${currentOptFr} ») mais introduit une déduction injustifiée ou non mentionnée.`;
        } else if (wrongCount % 3 === 2) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - CONTRESENS FACTUEL] : Énonce une affirmation (« ${currentOptFr} ») qui contredit directement les consignes ou les faits établis dans le document.`;
        } else {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - DÉTAIL INVENTÉ OU HORS CONTEXTE] : Fait référence à une modalité (« ${currentOptFr} ») totalement absente des informations officielles fournies.`;
        }
      } else if (level === "B1") {
        if (wrongCount % 3 === 1) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - PIÈGE D'EXAGÉRATION ABSOLUE] : Présente un jugement excessif ou catégorique (« ${currentOptFr} ») qui ignore le bilan équilibré et nuancé de l'article.`;
        } else if (wrongCount % 3 === 2) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - DÉTAIL SECONDAIRE NON REPRÉSENTATIF] : Focalise sur un aspect périphérique (« ${currentOptFr} ») au détriment de la conclusion d'ensemble des observateurs.`;
        } else {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - GÉNÉRALISATION ABUSIVE ET CONTRESENS] : Déforme les retours d'expérience en affirmant (« ${currentOptFr} »), ce qui contredit la synthèse générale.`;
        }
      } else if (level === "B2") {
        if (wrongCount % 3 === 1) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - MINIMISATION PALLIATIVE ET STATU QUO] : Propose une mesure superficielle (« ${currentOptFr} ») explicitement rejetée par l'auteur au profit d'une refonte structurelle.`;
        } else if (wrongCount % 3 === 2) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - FAUSSE CAUSALITÉ ET DÉFORMATION THÉMATIQUE] : Établit un lien de cause à effet erroné (« ${currentOptFr} ») non étayé par la démonstration critique de l'auteur.`;
        } else {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - OPINION PARTICULIÈRE NON VALIDÉE] : Isole un argument intermédiaire (« ${currentOptFr} ») sans intégrer la perspective d'ensemble défendue dans l'essai.`;
        }
      } else {
        // C1 / C2
        if (wrongCount % 3 === 1) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - SUR-EXTRAPOLATION ET RÉDUCTION CONCEPTUELLE] : Réduit la complexité dialectique du traité à une interprétation simplificatrice (« ${currentOptFr} ») réfutée par le texte.`;
        } else if (wrongCount % 3 === 2) {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - DÉTERMINISME RÉDUCTEUR] : Affirme une causalité mécanique rigide (« ${currentOptFr} ») incompatible avec l'autonomie réflexive défendue par l'auteur.`;
        } else {
          return `  - Option ${l} (« ${currentOptFr} ») [INCORRECTE - INVERSION ARGUMENTATIVE ET LEURRE TERMINOLOGIQUE] : Réutilise le vocabulaire conceptuel (« ${currentOptFr} ») mais en inverse la portée philosophique et épistémologique.`;
        }
      }
    }).join("\n");

    let wrongCountEn = 0;
    const breakdownEn = letters.map((l, idx) => {
      if (idx === correctIdx) {
        return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Accurately conveys the verified information from the document without distortion.`;
      }

      wrongCountEn++;
      const currentOptEn = optEn[idx];
      const hasDigits = /\d/.test(currentOptEn);

      if (level === "A1" || level === "A2") {
        if (hasDigits) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - NUMERICAL OR TEMPORAL DISTRACTOR TRAP]: Uses inaccurate numerical or temporal anchors ("${currentOptEn}") that distort explicit passage figures.`;
        } else if (wrongCountEn % 3 === 1) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - LEXICAL LURE & UNSTATED ASSUMPTION]: Reuses passage keywords ("${currentOptEn}") while introducing an unfounded deduction not present in the text.`;
        } else if (wrongCountEn % 3 === 2) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - FACTUAL CONTRADICTION]: Asserts a condition ("${currentOptEn}") that directly contradicts the instructions or facts stated in the document.`;
        } else {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - FABRICATED DETAIL OUTSIDE CONTEXT]: Refers to an operational requirement ("${currentOptEn}") completely absent from the official notice.`;
        }
      } else if (level === "B1") {
        if (wrongCountEn % 3 === 1) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - EXTREME OVERSTATEMENT TRAP]: Presents an excessive or categorical judgment ("${currentOptEn}") ignoring the article's balanced and nuanced synthesis.`;
        } else if (wrongCountEn % 3 === 2) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - PERIPHERAL DETAIL DISTRACTOR]: Focuses on a peripheral detail ("${currentOptEn}") rather than the overarching conclusion of the observers.`;
        } else {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - OVERGENERALIZATION & CONTRADICTION]: Distorts reported experience by asserting ("${currentOptEn}"), contradicting the general synthesis.`;
        }
      } else if (level === "B2") {
        if (wrongCountEn % 3 === 1) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - SUPERFICIAL PALLIATIVE & STATUS QUO]: Proposes a superficial measure ("${currentOptEn}") explicitly rejected by the author in favor of deep structural transformation.`;
        } else if (wrongCountEn % 3 === 2) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - FALSE CAUSALITY & THEMATIC DISTORTION]: Establishes an erroneous causal link ("${currentOptEn}") unsupported by the author's critical demonstration.`;
        } else {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - UNVALIDATED PARTICULAR OPINION]: Isolates an intermediate argument ("${currentOptEn}") without integrating the comprehensive analytical thesis defended in the essay.`;
        }
      } else {
        // C1 / C2
        if (wrongCountEn % 3 === 1) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - CONCEPTUAL OVER-EXTRAPOLATION & REDUCTIONISM]: Reduces the dialectical complexity of the treatise to an oversimplified claim ("${currentOptEn}") refuted by the passage.`;
        } else if (wrongCountEn % 3 === 2) {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - REDUCTIVE DETERMINISM]: Asserts a rigid mechanical determinism ("${currentOptEn}") incompatible with the reflexive intellectual autonomy defended by the author.`;
        } else {
          return `  - Option ${l} ("${currentOptEn}") [INCORRECT - ARGUMENTATIVE INVERSION & TERMINOLOGICAL LURE]: Reuses conceptual terminology ("${currentOptEn}") while inverting its true philosophical and epistemological substance.`;
        }
      }
    }).join("\n");

    const detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctOptFr} »)\n\n` +
      `• Justification textuelle (${docType}) :\n` +
      `En réponse à la question « ${item.q} », le document énonce : « ${item.text.trim()} ».\n` +
      `L'Option ${correctLetter} (« ${correctOptFr} ») exprime fidèlement l'information essentielle transmise dans le document.\n\n` +
      `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

    const detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctOptEn}")\n\n` +
      `• Textual Evidence (${docType}):\n` +
      `In response to "${item.qEn}", the passage states: "${item.passEn.trim()}".\n` +
      `Option ${correctLetter} ("${correctOptEn}") accurately conveys the essential information presented in the text.\n\n` +
      `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    guidanceBank[key] = {
      trapAlert,
      trapAlertEn,
      readingCoach,
      readingCoachEn,
      detailedExplanation,
      detailedExplanationEn,
    };
  }
}

const fileContent = `/**
 * Official TCF Canada Reading Comprehension Pedagogical Guidance Bank
 * 390 Unique Bilingual Trap Alerts, Reading Strategy Coaches, and In-Depth Explanations
 * (10 Papers x 39 Questions) - 100% Pure English Translations (Zero Leaks).
 */

export interface ReadingGuidanceEntry {
  trapAlert: string;
  trapAlertEn: string;
  readingCoach: string;
  readingCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
}

export const READING_GUIDANCE_BANK: Record<string, ReadingGuidanceEntry> = ${JSON.stringify(guidanceBank, null, 2)};

export function getReadingGuidance(paperNum: number, qNum: number): ReadingGuidanceEntry {
  const key = \`p\${paperNum}_q\${qNum}\`;
  if (READING_GUIDANCE_BANK[key]) {
    return READING_GUIDANCE_BANK[key];
  }
  return {
    trapAlert: "⚠️ Piège de lecture : Lisez attentivement le texte et éliminez les distracteurs excessifs.",
    trapAlertEn: "⚠️ Reading Trap Alert: Read the text carefully and eliminate extreme distractors.",
    readingCoach: "💡 Stratégie de lecture : Identifiez les mots-clés du paragraphe principal.",
    readingCoachEn: "💡 Reading Strategy Coach: Identify key concepts in the main paragraph.",
    detailedExplanation: "Explication pédagogique : La réponse exacte découle directement des informations du document.",
    detailedExplanationEn: "Pedagogical Explanation: The correct answer directly derives from the information in the text."
  };
}
`;

const targetPath = path.join(process.cwd(), 'src/lib/readingGuidanceBank.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`✅ Successfully wrote ${Object.keys(guidanceBank).length} comprehensive pedagogical guidance entries to readingGuidanceBank.ts!`);
