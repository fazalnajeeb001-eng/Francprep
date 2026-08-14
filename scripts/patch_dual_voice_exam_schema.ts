import * as fs from "fs";

console.log("=== 🛠️ APPLYING 100% DUAL-VOICE AUDIO TAGGING IN EXAMSCHEMA.TS ===");

const schemaPath = "src/lib/examSchema.ts";
let content = fs.readFileSync(schemaPath, "utf-8");

const isCRLF = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

const targetOldBlock = `    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    const passageBodyText = t.text || t.tr;

    let fullSpokenTranscript = isQuestionInAudio
      ? (isSpokenOptionQuestion
        ? \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question et les 4 réponses. Question N°\${i} : \${questionTextPrompt}\\n... A : \${options[0]}.\\n... B : \${options[1]}.\\n... C : \${options[2]}.\\n... D : \${options[3]}.\`
        : \`\${passageSpeakerLabel}: \${passageBodyText}\\n\${announcerLabel}: Écoutez la question. Question N°\${i} : \${questionTextPrompt}\`)
      : passageBodyText;

    if (i <= 4) {
      fullSpokenTranscript = \`\${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\\n... Proposition A : \${options[0]}.\\n... Proposition B : \${options[1]}.\\n... Proposition C : \${options[2]}.\\n... Proposition D : \${options[3]}.\`;
    }`;

const newReplacementBlock = `    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    const rawPassageText = (t.text || t.tr || "").trim();
    const hasExplicitSpeakerTag = rawPassageText.includes("Locuteur") || rawPassageText.includes("Locutrice") || rawPassageText.includes(":");
    const cleanPassageWithSpeaker = hasExplicitSpeakerTag ? rawPassageText : \`\${passageSpeakerLabel}: \${rawPassageText}\`;

    let fullSpokenTranscript = "";
    if (i <= 4) {
      fullSpokenTranscript = \`\${announcerLabel}: Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\\n... Proposition A : \${options[0]}.\\n... Proposition B : \${options[1]}.\\n... Proposition C : \${options[2]}.\\n... Proposition D : \${options[3]}.\`;
    } else if (isSpokenOptionQuestion) {
      fullSpokenTranscript = \`\${cleanPassageWithSpeaker}\\n\${announcerLabel}: Écoutez la question et les 4 réponses. Question N°\${i} : \${questionTextPrompt}\\n... A : \${options[0]}.\\n... B : \${options[1]}.\\n... C : \${options[2]}.\\n... D : \${options[3]}.\`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = \`\${cleanPassageWithSpeaker}\\n\${announcerLabel}: Écoutez la question. Question N°\${i} : \${questionTextPrompt}\`;
    } else {
      // Q30-Q39 (Advanced B2, C1, C2)
      fullSpokenTranscript = cleanPassageWithSpeaker;
    }`;

if (!content.includes(targetOldBlock)) {
  console.error("Target old block not found in examSchema.ts");
  process.exit(1);
}

content = content.replace(targetOldBlock, newReplacementBlock);

if (isCRLF) {
  content = content.replace(/\n/g, "\r\n");
}

fs.writeFileSync(schemaPath, content, "utf-8");
console.log("✅ Successfully patched examSchema.ts with 100% dual-voice audio tagging!");
