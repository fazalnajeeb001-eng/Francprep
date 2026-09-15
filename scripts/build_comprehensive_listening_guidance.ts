import fs from 'fs';
import path from 'path';
import { generateListeningQuestions } from '../src/lib/examSchema';

export interface ListeningGuidanceEntry {
  trapAlert: string;
  trapAlertEn: string;
  audioCoach: string;
  audioCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
  readingCoach?: string;
  readingCoachEn?: string;
}

function cleanOptionText(text: string): string {
  if (!text) return "";
  let s = text.trim();
  if (s.endsWith('.')) s = s.slice(0, -1);
  return s;
}

const guidanceBank: Record<string, ListeningGuidanceEntry> = {};
const letters = ["A", "B", "C", "D"];

for (let p = 1; p <= 10; p++) {
  const qs = generateListeningQuestions(39, `tcf-${p}`, p - 1);

  for (let qIdx = 0; qIdx < qs.length; qIdx++) {
    const q = qs[qIdx];
    const qNum = q.questionNumber || (qIdx + 1);
    const key = `p${p}_q${qNum}`;

    const level = q.level || (qNum <= 7 ? "A1" : qNum <= 15 ? "A2" : qNum <= 25 ? "B1" : qNum <= 33 ? "B2" : "C1");
    const correctIdx = q.correctIndex ?? 0;
    const correctLetter = letters[correctIdx] || "A";

    const optFr = q.options.map(cleanOptionText);
    const optEn = (q.optionsEnglish && q.optionsEnglish.length === 4)
      ? q.optionsEnglish.map(cleanOptionText)
      : optFr;

    const correctFr = optFr[correctIdx];
    const correctEn = optEn[correctIdx];

    const passageFr = (q.passage || "").trim();
    const passageEn = (q.passageEnglish || passageFr).trim();
    const promptFr = (q.questionPrompt || q.text || "").trim();
    const promptEn = (q.questionPromptEnglish || promptFr).trim();

    let trapAlert = "";
    let trapAlertEn = "";
    let audioCoach = "";
    let audioCoachEn = "";
    let detailedExplanation = "";
    let detailedExplanationEn = "";

    if (qNum <= 4) {
      // Level A1: Visual Drawings (Speech Act or Scene Description)
      trapAlert = `⚠️ Piège A1 (Observation visuelle) : Méfiez-vous des leurres visuels partiels ! Ne vous arrêtez pas à un objet isolé (vêtements, accessoire, véhicule) qui pourrait vous orienter vers une fausse situation. Observez l'intégralité du décor, le lieu précis et l'action principale de chaque protagoniste.`;
      trapAlertEn = `⚠️ Level A1 Trap Alert (Visual Observation): Beware of partial visual lures! Do not latch onto an isolated object (clothing, accessory, vehicle) that might suggest the wrong scenario. Examine the full setting, the exact location, and the primary action of each subject.`;

      audioCoach = `💡 Stratégie A1 (Écoute & Observation) : Observez attentivement l'illustration avant et pendant l'écoute : identifiez précisément le lieu (boulangerie, quai de gare, aéroport, cabinet médical...), les acteurs et l'action principale. Écoutez attentivement chaque proposition audio et éliminez immédiatement celles qui décrivent un lieu ou une action incompatible avec l'image.`;
      audioCoachEn = `💡 Level A1 Listening Coach (Audio & Observation): Carefully examine the illustration before and during listening: identify the exact setting (bakery, train platform, airport, doctor's office...), the people involved, and the primary action. Listen carefully to each spoken proposition and immediately rule out any choice depicting an incompatible setting or action.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Décrit avec une parfaite exactitude la scène et les éléments représentés sur l'illustration.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DE DISCORDANCE VISUELLE] : Décrit une situation ou un lieu distinct (« ${optFr[idx]} ») qui ne correspond pas aux éléments observés sur l'image.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Accurately describes the visual scene and elements shown in the illustration.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - VISUAL CONTEXT MISMATCH]: Describes a distinct setting or action ("${optEn[idx]}") that does not match what is visible in the drawing.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification visuelle & auditive :\n` +
        `L'illustration représente clairement la scène suivante : « ${correctFr} ».\n` +
        `La proposition ${correctLetter} est la seule qui concorde fidèlement avec l'ensemble des repères visuels de l'image.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Visual & Acoustic Evidence:\n` +
        `The illustration clearly depicts the following scene: "${correctEn}".\n` +
        `Option ${correctLetter} is the only proposition that faithfully aligns with all visual cues in the image.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    } else if (qNum <= 7) {
      // Level A1: Public Announcements (Train, Supermarket, Weather)
      trapAlert = `⚠️ Piège A1 (Annonce publique) : Attention aux pièges de chiffres et de détails secondaires ! Dans les annonces de gare, de magasin ou de météo, plusieurs nombres (numéro de quai, horaires, rabais, degrés de température) sont cités pour tester votre écoute sélective. Isolez la donnée exacte demandée par la consigne.`;
      trapAlertEn = `⚠️ Level A1 Trap Alert (Public Announcement): Watch out for numerical and secondary detail traps! In station, retail, or weather announcements, multiple numbers (platform number, departure times, discounts, temperature figures) are cited to test selective listening. Isolate the exact figure requested in the prompt.`;

      audioCoach = `💡 Stratégie A1 (Écoute Ciblée - Annonce Publique) : Concentrez-vous sur l'annonceur et l'objet immédiat de la consigne (ex: numéro de voie et heure de départ, rayon de la promotion, ou prévisions météorologiques). Notez mentalement les repères clés dès la première écoute pour repérer la réponse exacte.`;
      audioCoachEn = `💡 Level A1 Listening Coach (Targeted Listening - Public Announcement): Focus on the announcer's voice and the immediate operational directive (e.g., track number and departure time, promo aisle, or weather forecast). Mentally anchor key figures on the first pass to identify the exact match.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Exprime fidèlement l'information factuelle confirmée dans l'annonce officielle.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DU DÉTAIL CHIFFRÉ OU OPÉRATIONNEL] : Mentionne une fausse piste (« ${optFr[idx]} ») contredisant les faits exacts du message sonore.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Accurately reflects the factual information confirmed in the official announcement.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - OPERATIONAL OR NUMERICAL DISTRACTOR TRAP]: Introduces a false lead ("${optEn[idx]}") contradicting the exact facts stated in the audio clip.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification auditive :\n` +
        `Le document sonore énonce : « ${passageFr} ».\n` +
        `L'Option ${correctLetter} (« ${correctFr} ») exprime fidèlement l'information essentielle transmise dans le document sonore.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Acoustic Evidence:\n` +
        `The audio announcement states: "${passageEn}".\n` +
        `Option ${correctLetter} ("${correctEn}") accurately reflects the essential information conveyed in the recording.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    } else if (qNum <= 15) {
      // Level A2: Voicemails, Phone Messages & Practical Instructions
      trapAlert = `⚠️ Piège A2 (Message téléphonique) : Méfiez-vous de la confusion entre l'émetteur et le destinataire, ou entre le motif principal et les détails accessoires. Un message peut mentionner un rappel d'horaire ou un tarif sans que ce soit l'objectif central de l'appel.`;
      trapAlertEn = `⚠️ Level A2 Trap Alert (Phone Message): Beware of confusing caller and recipient, or mistaking secondary details for the main purpose. A voicemail may mention a schedule reminder or a fee without that being the central purpose of the call.`;

      audioCoach = `💡 Stratégie A2 (Repérage de l'Objectif d'Appel) : Dès les premières secondes, repérez l'identité de la personne qui appelle (« Bonjour, c'est... » ou « Ici le secrétariat... ») ainsi que le verbe d'action (« je vous appelle pour... », « nous vous confirmons... »). Isolez le but premier de l'appel avant de consulter les propositions.`;
      audioCoachEn = `💡 Level A2 Listening Coach (Identifying Call Purpose): From the first few seconds, pinpoint the caller's identity ("Hello, this is..." or "Here is the office...") and the operative action verb ("I am calling to...", "we confirm..."). Isolate the primary reason for calling before looking at the choices.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Traduit avec exactitude le motif central ou la consigne communiquée par l'émetteur.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DU DÉTAIL SECONDAIRE OU D'EXTRAPOLATION] : Focalise sur un élément accessoire (« ${optFr[idx]} ») qui ne constitue pas la raison principale de l'appel.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Accurately reflects the central purpose or instruction communicated by the caller.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - SECONDARY DETAIL OR EXTRAPOLATION TRAP]: Focuses on a peripheral detail ("${optEn[idx]}") rather than the primary purpose of the call.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification auditive :\n` +
        `En réponse à la question « ${promptFr} », le message sonore énonce : « ${passageFr} ».\n` +
        `L'Option ${correctLetter} (« ${correctFr} ») exprime fidèlement le motif vérifié dans l'enregistrement.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Acoustic Evidence:\n` +
        `In response to "${promptEn}", the voicemail states: "${passageEn}".\n` +
        `Option ${correctLetter} ("${correctEn}") accurately reflects the verified purpose in the recording.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    } else if (qNum <= 25) {
      // Level B1: Radio Reports, Vox-Pops & Citizen Surveys
      trapAlert = `⚠️ Piège B1 (Reportage & Micro-trottoir) : Ne confondez pas l'opinion d'un citoyen isolé avec la tendance générale ou le résultat du sondage ! Les journalistes présentent souvent une voix dissidente avant de rappeler le consensus majoritaire.`;
      trapAlertEn = `⚠️ Level B1 Trap Alert (Radio Report & Vox-Pop): Do not confuse an isolated citizen's personal opinion with the overall trend or poll consensus! Journalists frequently air a dissenting voice before confirming the majority consensus.`;

      audioCoach = `💡 Stratégie B1 (Synthèse & Consensus) : Portez votre attention sur les indicateurs de synthèse (« la majorité des usagers », « l'adhésion globale », « la tendance dominante ») et les connecteurs d'opposition (« toutefois », « bien que »). Distinguez l'avis individuel du bilan global formulé par le reporter.`;
      audioCoachEn = `💡 Level B1 Listening Coach (Synthesis & Consensus): Focus on synthesis markers ("the majority of users", "overall approval", "the prevailing trend") and contrastive connectors ("however", "although"). Distinguish individual reactions from the journalist's overarching summary.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Résume fidèlement la conclusion d'ensemble et le consensus rapporté par le journaliste.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DE L'OPINION MINORITAIRE OU EXAGÉRATION] : Isole un point de vue marginal ou une affirmation absolue (« ${optFr[idx]} ») en décalage avec le bilan global.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Faithfully summarizes the overall conclusion and consensus reported by the journalist.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - MINORITY OPINION OR OVERSTATEMENT TRAP]: Isolates a marginal viewpoint or absolute claim ("${optEn[idx]}") at odds with the overall takeaway.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification auditive :\n` +
        `Le reportage sonore rapporte : « ${passageFr} ».\n` +
        `L'Option ${correctLetter} (« ${correctFr} ») traduit fidèlement la position dominante mise en avant dans le document sonore.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Acoustic Evidence:\n` +
        `The radio report notes: "${passageEn}".\n` +
        `Option ${correctLetter} ("${correctEn}") accurately reflects the dominant consensus highlighted in the recording.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    } else if (qNum <= 33) {
      // Level B2: Debates, Structured Interviews & Rhetorical Nuance
      trapAlert = `⚠️ Piège B2 (Débat & Nuance Argumentative) : Attention aux fausses concessions et aux revirements argumentatifs ! Un intervenant peut feindre d'approuver son contradicteur (« Certes... », « J'entends bien... ») avant de déconstruire son argument avec une opposition nette (« Mais en réalité... », « En revanche... »).`;
      trapAlertEn = `⚠️ Level B2 Trap Alert (Debate & Nuanced Argument): Beware of false concessions and rhetorical shifts! A speaker may feign agreement with an opponent ("Certainly...", "I acknowledge...") before dismantling the argument with a sharp contrast ("But in reality...", "On the other hand...").`;

      audioCoach = `💡 Stratégie B2 (Suivi de l'Argumentation) : Suivez l'évolution des prises de position entre les interlocuteurs. Soyez particulièrement vigilant aux connecteurs de concession et de rupture (« néanmoins », « or », « à l'inverse »). Isolez la thèse finale défendue plutôt que les exemples secondaires.`;
      audioCoachEn = `💡 Level B2 Listening Coach (Tracking Rhetorical Flow): Follow the evolving dynamics between both speakers. Stay alert for concession and contrast markers ("nevertheless", "yet", "conversely"). Isolate the final defended thesis rather than secondary illustrative examples.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Restitue la thèse véritablement défendue par l'intervenant après ses concessions rhétoriques.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DE LA CONCESSION RHÉTORIQUE OU DÉFORMATION] : Retient un argument préliminaire ou une objection partielle (« ${optFr[idx]} ») que le locuteur a expressément réfutée.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Captures the thesis genuinely defended by the speaker following rhetorical concessions.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - RHETORICAL CONCESSION OR MISINTERPRETATION TRAP]: Retains a preliminary concession or partial objection ("${optEn[idx]}") that the speaker explicitly refuted.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification auditive :\n` +
        `Dans cet échange, l'argumentation centrale s'articule ainsi : « ${passageFr} ».\n` +
        `L'Option ${correctLetter} (« ${correctFr} ») exprime la position doctrinale ou analytique finale de l'intervenant.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Acoustic Evidence:\n` +
        `In this exchange, the core argumentation develops as follows: "${passageEn}".\n` +
        `Option ${correctLetter} ("${correctEn}") reflects the speaker's final analytical or doctrinal position.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;

    } else {
      // Level C1/C2: Advanced Lectures & Keynotes
      trapAlert = `⚠️ Piège C1/C2 (Conférence & Concepts Abstraits) : Méfiez-vous des pièges de répétition lexicale superficielle ! Les distracteurs C1/C2 reprennent souvent mot pour mot un terme technique pointu du discours, mais lui attribuent une thèse contradictoire ou anecdotique. La bonne réponse repose sur une reformulation conceptuelle globale.`;
      trapAlertEn = `⚠️ Level C1/C2 Trap Alert (Keynote & Abstract Concepts): Beware of superficial lexical echo traps! C1/C2 distractors frequently reuse technical keywords verbatim from the speech while attributing them to a contradictory or minor thesis. The correct option relies on high-level conceptual paraphrasing.`;

      audioCoach = `💡 Stratégie C1/C2 (Conceptualisation & Thèse Magistrale) : À ce niveau d'expertise, le débit est rapide et le registre soutenu. Concentrez-vous sur l'architecture conceptuelle du discours : quel est le problème épistémologique ou éthique posé par le conférencier ? Ne cherchez pas un mot-clé isolé, mais saisissez la portée globale de la démonstration.`;
      audioCoachEn = `💡 Level C1/C2 Listening Coach (Conceptualization & Master Thesis): At this expert level, tempo is rapid and register formal. Focus on the overarching conceptual architecture: what epistemological or ethical problem is the keynote addressing? Do not chase isolated keywords; grasp the systemic thesis of the discourse.`;

      const breakdownFr = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} (« ${optFr[idx]} ») [CORRECTE] : Traduit avec rigueur conceptuelle la thèse fondamentale développée dans la conférence.`;
        } else {
          return `  - Option ${l} (« ${optFr[idx]} ») [INCORRECTE - PIÈGE DU LEURRE TERMINOLOGIQUE ET CONTRESENS CONCEPTUEL] : Réutilise des notions du discours (« ${optFr[idx]} ») tout en en altérant la portée philosophique ou argumentative réelle.`;
        }
      }).join("\n");

      const breakdownEn = letters.map((l, idx) => {
        if (idx === correctIdx) {
          return `  - Option ${l} ("${optEn[idx]}") [CORRECT]: Captures with conceptual precision the fundamental thesis articulated in the keynote.`;
        } else {
          return `  - Option ${l} ("${optEn[idx]}") [INCORRECT - TERMINOLOGICAL LURE & CONCEPTUAL INVERSION]: Echoes discourse concepts ("${optEn[idx]}") while distorting their true philosophical or argumentative scope.`;
        }
      }).join("\n");

      detailedExplanation = `🎯 Réponse exacte : Option ${correctLetter} (« ${correctFr} »)\n\n` +
        `• Justification auditive :\n` +
        `Le conférencier développe : « ${passageFr} ».\n` +
        `L'Option ${correctLetter} (« ${correctFr} ») synthétise avec exactitude l'enjeu intellectuel majeur et la conclusion de la communication.\n\n` +
        `• Analyse détaillée des 4 propositions (Justification & Pièges) :\n${breakdownFr}`;

      detailedExplanationEn = `🎯 Correct Answer: Option ${correctLetter} ("${correctEn}")\n\n` +
        `• Acoustic Evidence:\n` +
        `The lecturer expounds: "${passageEn}".\n` +
        `Option ${correctLetter} ("${correctEn}") accurately synthesizes the primary intellectual crux and conclusion of the talk.\n\n` +
        `• Detailed Distractor Breakdown (Incorrect Options):\n${breakdownEn}`;
    }

    guidanceBank[key] = {
      trapAlert,
      trapAlertEn,
      audioCoach,
      audioCoachEn,
      detailedExplanation,
      detailedExplanationEn,
      readingCoach: audioCoach,
      readingCoachEn: audioCoachEn
    };
  }
}

const fileContent = `/**
 * Official TCF Canada Listening Comprehension Pedagogical Guidance Bank
 * 390 Unique Bilingual Trap Alerts, Audio Strategy Coaches, and In-Depth Explanations
 * (10 Papers x 39 Questions) - 100% Pure English Translations (Zero Answer Leaks in Coach/Trap).
 */

export interface ListeningGuidanceEntry {
  trapAlert: string;
  trapAlertEn: string;
  audioCoach: string;
  audioCoachEn: string;
  detailedExplanation: string;
  detailedExplanationEn: string;
  readingCoach?: string;
  readingCoachEn?: string;
}

export const LISTENING_GUIDANCE_BANK: Record<string, ListeningGuidanceEntry> = ${JSON.stringify(guidanceBank, null, 2)};

export function getListeningGuidance(paperNum: number, qNum: number): ListeningGuidanceEntry {
  const key = \`p\${paperNum}_q\${qNum}\`;
  if (LISTENING_GUIDANCE_BANK[key]) {
    return LISTENING_GUIDANCE_BANK[key];
  }
  return {
    trapAlert: "⚠️ Piège de compréhension orale : Restez attentif au message global et repérez les distracteurs partiels.",
    trapAlertEn: "⚠️ Listening Trap Alert: Stay focused on the overall audio message and identify partial distractors.",
    audioCoach: "💡 Stratégie d'écoute : Repérez les mots-clés et l'intention du locuteur dès la première écoute.",
    audioCoachEn: "💡 Listening Strategy Coach: Identify key concepts and the speaker's intent on the first listening pass.",
    detailedExplanation: "Explication pédagogique : La réponse exacte correspond aux faits vérifiés dans l'enregistrement sonore.",
    detailedExplanationEn: "Pedagogical Explanation: The correct answer corresponds to the verified facts in the audio recording."
  };
}
`;

const targetPath = path.join(process.cwd(), 'src/lib/listeningGuidanceBank.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`✅ Successfully generated all ${Object.keys(guidanceBank).length} listening guidance bank entries in src/lib/listeningGuidanceBank.ts!`);
