import * as fs from "fs";

console.log("=== 🛠️ PATCHING generateListeningQuestions IN examSchema.ts ===");

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

// 1. Ensure import is present
if (!content.includes('import { getPracticeQuestionTranslation } from "./practiceListeningTranslations";')) {
  content = content.replace(
    'import { getHdIllustration } from "./hdIllustrationAssets";',
    'import { getHdIllustration } from "./hdIllustrationAssets";\nimport { getPracticeQuestionTranslation } from "./practiceListeningTranslations";'
  );
}

// 2. Ensure ExamQuestion interface has fields
if (!content.includes('questionPromptEnglish?: string;')) {
  content = content.replace(
    'questionPrompt?: string;',
    'questionPrompt?: string;\n  questionPromptEnglish?: string;\n  optionsEnglish?: string[];'
  );
}

// 3. Match from "const speakingRate = i <= 7" to "return qList;"
const pattern = /const speakingRate = i <= 7 \? 0\.85 : i <= 15 \? 0\.92 : i <= 25 \? 1\.00 : i <= 33 \? 1\.15 : 1\.30;[\s\S]*?qList\.push\(\{[\s\S]*?perQuestionTimerSeconds: i <= 10 \? 15 : i <= 26 \? 20 : 25\s*\}\);\s*\}\s*return qList;/;

const replacement = `const questionId = \`\${prefix}-lis-\${i}\`;
    const practiceTr = getPracticeQuestionTranslation(questionId);

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : 1.30;

    const optionsEn0 = translateOptionToEnglish(options[0]);
    const optionsEn1 = translateOptionToEnglish(options[1]);
    const optionsEn2 = translateOptionToEnglish(options[2]);
    const optionsEn3 = translateOptionToEnglish(options[3]);

    let spokenEnglishTranslation = t.en;
    const passageSpeakerLabelEn = isMaleSpeaker ? "Speaker" : "Speaker";
    const announcerLabelEn = "Announcer";

    if (i <= 4) {
      fullSpokenTranscript = \`\${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\\n... Proposition A : \${options[0]}.\\n... Proposition B : \${options[1]}.\\n... Proposition C : \${options[2]}.\\n... Proposition D : \${options[3]}.\`;
      spokenEnglishTranslation = \`\${announcerLabelEn}: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\\n... Option A: \${optionsEn0}.\\n... Option B: \${optionsEn1}.\\n... Option C: \${optionsEn2}.\\n... Option D: \${optionsEn3}.\`;
    } else if (isSpokenOptionQuestion) {
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question et les 4 réponses. Question N°\${i} : \${questionTextPrompt}\\n... A : \${options[0]}.\\n... B : \${options[1]}.\\n... C : \${options[2]}.\\n... D : \${options[3]}.\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${t.en}\\n\${announcerLabelEn}: Listen to the question and the 4 options. Question N°\${i}: \${questionTextPrompt}\\n... A: \${optionsEn0}.\\n... B: \${optionsEn1}.\\n... C: \${optionsEn2}.\\n... D: \${optionsEn3}.\`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question. Question N°\${i} : \${questionTextPrompt}\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${t.en}\\n\${announcerLabelEn}: Listen to the question. Question N°\${i}: \${questionTextPrompt}\`;
    } else {
      fullSpokenTranscript = passageBodyText;
      spokenEnglishTranslation = t.en;
    }

    const finalQuestionPromptEnglish = practiceTr?.questionPromptEnglish || (i <= 4 ? "Look at the image. Listen to the 4 options and choose the one that corresponds to the image." : undefined);
    const finalOptionsEnglish = practiceTr?.optionsEnglish || [optionsEn0, optionsEn1, optionsEn2, optionsEn3];
    const finalTranscriptEnglish = practiceTr?.transcriptEnglish || spokenEnglishTranslation;
    const finalPassageEnglish = practiceTr?.passageEnglish || t.en;

    qList.push({
      id: questionId,
      questionNumber: i,
      level: itemLevel,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || i <= 4,
      questionPrompt: questionTextPrompt,
      questionPromptEnglish: finalQuestionPromptEnglish,
      text: i <= 4
        ? "Écoutez les 4 propositions, choisissez celle qui correspond à l'image."
        : questionTextPrompt,
      options,
      optionsEnglish: finalOptionsEnglish,
      optionImages,
      mainImage,
      correctIndex,
      explanation: \`Pedagogical Explanation [Level \${itemLevel}]: The spoken document confirms "\${correctText}".\`,
      hint: specificHint,
      transcript: fullSpokenTranscript,
      transcriptEnglish: finalTranscriptEnglish,
      passage: passageBodyText,
      passageEnglish: finalPassageEnglish,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: i <= 10 ? 15 : i <= 26 ? 20 : 25
    });
  }
  return qList;`;

if (pattern.test(content)) {
  content = content.replace(pattern, replacement);
  fs.writeFileSync(filePath, content);
  console.log("✅ Successfully patched generateListeningQuestions in src/lib/examSchema.ts!");
} else {
  console.error("❌ Regex pattern match failed for generateListeningQuestions.");
}
