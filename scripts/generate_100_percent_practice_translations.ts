import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

// Let's create a comprehensive translation dictionary for all French phrases, questions, and options
export interface DetailedQuestionTranslation {
  id: string;
  paperNum: number;
  questionNumber: number;
  level: string;
  frenchPassage: string;
  passageEnglish: string;
  frenchQuestion: string;
  questionPromptEnglish: string;
  frenchOptions: string[];
  optionsEnglish: string[];
  transcriptEnglish: string;
}

// Helper to translate questions
export function translateFrenchQuestionPrompt(fr: string): string {
  const clean = fr.trim();
  const map: Record<string, string> = {
    "Écoutez les 4 propositions, choisissez celle qui correspond à l'image.": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "Quel est le sujet principal de ce message sonore ?": "What is the main topic of this audio message?",
    "Quelle information importante est annoncée aux voyageurs ?": "What important information is announced to passengers?",
    "Quelle offre spéciale est proposée aux clients ?": "What special offer is being proposed to customers?",
    "Quelles sont les prévisions météorologiques annoncées ?": "What weather forecast is announced?",
    "Quelle est la consigne communiquée aux clients ?": "What instruction is communicated to customers?",
    "Pourquoi la personne laisse-t-elle ce message téléphonique ?": "Why is the person leaving this phone message?",
    "Quelle est la raison de l'appel du garage automobile ?": "What is the reason for the auto repair shop's call?",
    "Pour quel motif le salon de coiffure contacte-t-il le client ?": "Why is the hair salon contacting the customer?",
    "Quelle information est transmise par la bibliothèque municipale ?": "What information is provided by the municipal library?",
    "Où le destinataire doit-il récupérer son colis ?": "Where must the recipient pick up their package?",
    "Quelle recommandation est donnée par le médecin ?": "What recommendation is given by the doctor?",
    "Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?": "What is the reaction of most citizens to these new developments?",
    "Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?": "What is the main outcome of the 4-day workweek trial?",
    "Quel est l'objectif principal de cet événement culturel ?": "What is the primary objective of this cultural event?",
    "Quel avantage principal présente cette nouvelle habitude d'achat ?": "What is the main advantage of this new purchasing habit?",
    "Changement majeur annoncé pour le réseau de transport public ?": "What major change is announced for the public transit network?",
    "Quel conseil est préconisé par les spécialistes de santé ?": "What advice is recommended by health specialists?",
    "Quelle est la tendance observée sur le marché immobilier local ?": "What trend is observed in the local real estate market?",
    "Quel est l'impact principal décrit dans ce reportage ?": "What is the main impact described in this news report?",
    "Quel est l'objectif ou le message central de ce document sonore ?": "What is the central objective or message of this audio document?",
    "Quel est le principal point de désaccord abordé dans ce débat ?": "What is the main point of disagreement discussed in this debate?",
    "Quelle analyse économique ou technique est présentée par l'intervenant ?": "What economic or technical analysis is presented by the speaker?",
    "Quelle réforme éducative est préconisée dans cette intervention ?": "What educational reform is recommended in this speech?",
    "Quel enjeu environnemental majeur est mis en avant ?": "What major environmental issue is highlighted?",
    "Quelle idée essentielle le locuteur cherche-t-il à démontrer ?": "What key idea is the speaker attempting to demonstrate?",
    "Quelle est la décision ou la mesure prioritaire exposée dans ce débat ?": "What priority decision or measure is outlined in this debate?",
    "Selon le conférencier, quel est le défi technique majeur de cette nouvelle technologie ?": "According to the speaker, what is the major technical challenge of this new technology?",
    "Quelle exigence éthique la communauté scientifique internationale met-elle en avant ?": "What ethical requirement is emphasized by the international scientific community?",
    "De quel facteur dépend principalement l'apprentissage tardif d'une seconde langue ?": "On what factor does late second-language acquisition mainly depend?",
    "Quelle conséquence sociale le sociologue associe-t-il à ce phénomène de réhabilitation ?": "What social consequence does the sociologist associate with this revitalization phenomenon?",
    "Par quel moyen la théorie de l'incitation douce cherche-t-elle à orienter les choix citoyens ?": "By what means does nudge theory seek to guide citizens' choices?",
    "Quel risque majeur l'intervenant identifie-t-il dans la délibération citoyenne contemporaine ?": "What major risk does the speaker identify in contemporary civic deliberation?",
    "En quoi l'émergence des œuvres générées par IA remet-elle en cause le concept traditionnel d'art ?": "How does the emergence of AI-generated artwork challenge the traditional concept of art?",
    "Quelle est la thèse centrale développée par le conférencier lors de cette présentation ?": "What is the central thesis developed by the speaker during this presentation?",
    "Quelle est la thèse centrale développée par le conférencier ?": "What is the central thesis developed by the speaker?"
  };

  if (map[clean]) return map[clean];
  for (const [k, v] of Object.entries(map)) {
    if (clean.includes(k) || k.includes(clean)) return v;
  }
  return clean;
}

console.log("Translation dictionary helper initialized.");
