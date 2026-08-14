import * as fs from "fs";

console.log("=== 🛠️ PATCHING examSchema.ts WITH MASTER TRANSLATIONS ENGINE ===");

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

// 1. Add imports at the top
if (!content.includes('import { translateOptionMaster } from "./masterOptionsDictionary";')) {
  content = content.replace(
    'import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";',
    'import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";\nimport { translateOptionMaster } from "./masterOptionsDictionary";'
  );
}

// 2. Add QUESTION_PROMPT_ENGLISH_MAP
const promptMapCode = `
export const QUESTION_PROMPT_ENGLISH_MAP: Record<string, string> = {
  "Pourquoi la personne laisse-t-elle ce message téléphonique ?": "Why is the person leaving this phone message?",
  "Quel argument principal est formulé pour justifier une réorientation stratégique ?": "What primary argument is put forward to justify a strategic policy pivot?",
  "Quel avantage principal présente cette nouvelle habitude d'achat ?": "What is the main advantage of this new purchasing habit?",
  "Quel compromis fiscal est privilégié dans ce débat municipal ?": "What tax compromise is favored in this municipal debate?",
  "Quel conseil est préconisé par les spécialistes de santé ?": "What advice is recommended by health specialists?",
  "Quel est l'objectif ou le message central de ce document sonore ?": "What is the central objective or message of this audio document?",
  "Quel est l'objectif principal de cet événement culturel ?": "What is the primary objective of this cultural event?",
  "Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?": "What is the main outcome of the 4-day workweek trial?",
  "Quel est le sujet principal de ce message sonore ?": "What is the main topic of this audio message?",
  "Quel risque systémique majeur est identifié par l'économiste ?": "What major systemic risk is identified by the economist?",
  "Quelle approche technique est privilégiée par les ingénieurs municipaux ?": "What technical approach is favored by municipal engineers?",
  "Quelle condition technique est jugée indispensable pour valider ce projet ?": "What technical condition is deemed essential to approve this project?",
  "Quelle est la consigne communiquée aux clients ?": "What instruction is communicated to customers?",
  "Quelle est la mesure prioritaire défendue lors de cette concertation ?": "What is the priority measure advocated during this consultation?",
  "Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?": "What is the reaction of most citizens to these new developments?",
  "Quelle est la tendance observée sur le marché immobilier local ?": "What trend is observed in the local real estate market?",
  "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?": "What is the central thesis developed by the speaker during this presentation?",
  "Quelle information importante est annoncée aux voyageurs ?": "What important information is announced to passengers?",
  "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?": "What major warning is expressed regarding these intervention technologies?",
  "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?": "What conceptual shift does the researcher highlight in their analysis?",
  "Quelle offre spéciale est proposée aux clients ?": "What special offer is being proposed to customers?",
  "Quelle orientation d'urbanisme est préconisée par les experts ?": "What urban planning direction is recommended by experts?",
  "Quelle préoccupation principale est exprimée concernant ces outils numériques ?": "What primary concern is expressed regarding these digital management tools?",
  "Quelle revendication majeure est portée par les représentants des travailleurs ?": "What major demand is brought forward by worker representatives?",
  "Quelle stratégie environnementale est mise en avant dans cette allocution ?": "What environmental strategy is highlighted in this address?",
  "Quelle thèse épistémologique est défendue par la linguiste ?": "What epistemological thesis is defended by the linguist?",
  "Quelles sont les prévisions météorologiques annoncées ?": "What weather forecast is announced?",
  "Écoutez les 4 propositions, choisissez celle qui correspond à l'image.": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image."
};
`;

if (!content.includes("export const QUESTION_PROMPT_ENGLISH_MAP")) {
  content = content.replace(
    "export function translateOptionToEnglish(opt: string): string {",
    promptMapCode + "\nexport function translateOptionToEnglish(opt: string): string {"
  );
}

// 3. Update translateOptionToEnglish to use translateOptionMaster
const oldTranslateFnRegex = /export function translateOptionToEnglish\(opt: string\): string \{[\s\S]*?return dict\[trimmed\] \|\| trimmed;\s*\}/;
const newTranslateFn = `export function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  return translateOptionMaster(opt);
}`;

if (oldTranslateFnRegex.test(content)) {
  content = content.replace(oldTranslateFnRegex, newTranslateFn);
}

// 4. Update spoken English transcript assembly in generateListeningQuestions
const targetPattern = /let spokenEnglishTranslation = t\.en;[\s\S]*?const finalTranscriptEnglish = practiceTr\?\.transcriptEnglish \|\| spokenEnglishTranslation;/;

const newTranscriptAssembly = `let questionPromptEn = QUESTION_PROMPT_ENGLISH_MAP[questionTextPrompt] || (t as any).questionPromptEnglish;
    if (!questionPromptEn) {
      questionPromptEn = questionTextPrompt;
    }

    const passageTextEn = (t.en || "").replace(/^(?:Speaker|Locut(?:eur|rice))\\s*\\d*:\\s*/gm, "").trim();
    const passageSpeakerLabelEn = isMaleSpeaker ? "Speaker" : "Speaker";
    const announcerLabelEn = "Announcer";

    if (i <= 4) {
      fullSpokenTranscript = \`\${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\\n... Proposition A : \${options[0]}.\\n... Proposition B : \${options[1]}.\\n... Proposition C : \${options[2]}.\\n... Proposition D : \${options[3]}.\`;
      spokenEnglishTranslation = \`\${announcerLabelEn}: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\\n... Option A: \${optionsEn0}.\\n... Option B: \${optionsEn1}.\\n... Option C: \${optionsEn2}.\\n... Option D: \${optionsEn3}.\`;
    } else if (isSpokenOptionQuestion) {
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question et les 4 réponses. Question N°\${i} : \${questionTextPrompt}\\n... A : \${options[0]}.\\n... B : \${options[1]}.\\n... C : \${options[2]}.\\n... D : \${options[3]}.\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${passageTextEn}\\n\${announcerLabelEn}: Listen to the question and the 4 options. Question N°\${i}: \${questionPromptEn}\\n... A: \${optionsEn0}.\\n... B: \${optionsEn1}.\\n... C: \${optionsEn2}.\\n... D: \${optionsEn3}.\`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question. Question N°\${i} : \${questionTextPrompt}\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${passageTextEn}\\n\${announcerLabelEn}: Listen to the question. Question N°\${i}: \${questionPromptEn}\`;
    } else {
      // Q30-Q39
      fullSpokenTranscript = passageBodyText;
      spokenEnglishTranslation = (i >= 26 && i <= 33) ? t.en : (t.en.startsWith("Speaker:") ? t.en : \`Speaker: \${passageTextEn}\`);
    }

    const finalQuestionPromptEnglish = (i <= 4 ? "Look at the image. Listen to the 4 options and choose the one that corresponds to the image." : (practiceTr?.questionPromptEnglish || questionPromptEn));
    const finalOptionsEnglish = practiceTr?.optionsEnglish || [optionsEn0, optionsEn1, optionsEn2, optionsEn3];
    const finalTranscriptEnglish = practiceTr?.transcriptEnglish || spokenEnglishTranslation;`;

if (targetPattern.test(content)) {
  content = content.replace(targetPattern, newTranscriptAssembly);
  fs.writeFileSync(filePath, content);
  console.log("✅ Successfully patched examSchema.ts with master translations engine!");
} else {
  console.error("❌ Target pattern for transcript assembly not matched.");
}
