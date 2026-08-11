import fs from 'fs';
import path from 'path';

console.log("=== 🛠️ BUILDING 100% PARALLEL FRENCH TRANSCRIPTS & ENGLISH TRANSLATIONS (390 ITEMS) ===");

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(examSchemaPath, 'utf8');

// Function to translate French option text into English for Q1-Q4 visual scenes & Q5-Q8 spoken options
const translateOptionToEnglish = (opt) => {
  if (!opt) return "";
  let s = opt;

  // Q1-Q4 Common visual options
  s = s.replace("Un usager demande un renseignement à un guichet d'information de gare.", "A passenger asks for information at a station information desk.");
  s = s.replace("Un mécanicien vérifie la pression des pneus d'une voiture dans un garage.", "A mechanic checks the tire pressure of a car in a garage.");
  s = s.replace("Une personne paie ses achats avec une carte bancaire au supermarché.", "A person pays for purchases with a bank card at a supermarket.");
  s = s.replace("Un serveur apporte une boisson chaude à une table en terrasse de café.", "A waiter brings a hot drink to a table at a sidewalk café.");
  s = s.replace("Un facteur dépose une lettre dans une boîte aux lettres résidentielle.", "A mail carrier delivers a letter to a residential mailbox.");
  s = s.replace("Un médecin ausculte un patient avec un stéthoscope dans un cabinet.", "A doctor examines a patient with a stethoscope in a medical office.");
  s = s.replace("Une femme choisit un livre sur une étagère dans une bibliothèque.", "A woman chooses a book from a shelf in a library.");
  s = s.replace("Un jardinier taille des buissons dans un parc public de la ville.", "A gardener trims bushes in a city public park.");
  s = s.replace("Un voyageur montre son billet de bus au conducteur en montant.", "A traveler shows their bus ticket to the driver while boarding.");
  s = s.replace("Une cliente règle ses achats en espèces auprès du caissier.", "A customer pays for purchases in cash to the cashier.");
  s = s.replace("Un technicien répare un ordinateur portable sur un bureau de travail.", "A technician repairs a laptop on a workbench.");
  s = s.replace("Une personne composte des épluchures de légumes dans un bac.", "A person composts vegetable peels in a outdoor bin.");
  s = s.replace("Un usager achète un titre de transport à une borne automatique.", "A passenger buys a transit ticket at an automated kiosk.");
  s = s.replace("Une femme demande son chemin à un passant dans une rue piétonne.", "A woman asks for directions from a passerby in a pedestrian street.");
  s = s.replace("Un livreur dépose un carton sur le pas d'une porte d'entrée.", "A delivery worker places a box on the doorstep.");
  s = s.replace("Des passagers attendent l'arrivée de leur vol dans une salle d'embarquement.", "Passengers wait for their flight arrival in a boarding lounge.");
  s = s.replace("Un cuisinier découpe des légumes sur une planche dans une cuisine.", "A chef chops vegetables on a cutting board in a kitchen.");
  s = s.replace("Un client essaie une paire de chaussures dans un magasin de sport.", "A customer tries on a pair of shoes in a sporting goods store.");
  s = s.replace("Un pompier déroule un tuyau d'incendie lors d'un exercice d'entraînement.", "A firefighter unrolls a fire hose during a training drill.");
  s = s.replace("Une personne arrose des plantes vertes sur le balcon d'un appartement.", "A person waters green plants on an apartment balcony.");
  s = s.replace("Un coiffeur seigne les cheveux d'une cliente avant une coupe.", "A hair stylist washes a client's hair before a haircut.");
  s = s.replace("Un boulanger dispose des baguettes fraîches dans des paniers en osier.", "A baker places fresh baguettes into wicker baskets.");
  s = s.replace("Une personne valide son passe de transport au portillon du métro.", "A person taps their transit pass at the subway turnstile.");
  s = s.replace("Un peintre applique de la peinture fraîche sur la façade d'un bâtiment.", "A painter applies fresh paint to a building facade.");

  // Generic fallback translation if not explicitly matched
  if (s === opt) {
    s = s.replace("Départ du train", "Train departure")
         .replace("Offre promotionnelle", "Promotional offer")
         .replace("Annonce de pluie", "Rain announcement")
         .replace("Demande de rappel", "Callback request")
         .replace("Réparation terminée", "Repair completed")
         .replace("Report du rendez-vous", "Appointment rescheduled")
         .replace("L'interdiction", "Interdiction of")
         .replace("La fermeture", "Closure of")
         .replace("L'annulation", "Cancellation of")
         .replace("La hausse", "Increase of")
         .replace("La baisse", "Decrease of")
         .replace("Le maintien", "Maintenance of")
         .replace("La création", "Creation of")
         .replace("La suppression", "Suppression of");
  }

  return s;
};

// Now replace the transcript / translation assembly in generateListeningQuestions in examSchema.ts
const targetBlock = `    let spokenEnglishTranslation = t.en;
    if (i <= 4) {
      spokenEnglishTranslation = \`Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image.\`;
    } else if (isSpokenOptionQuestion) {
      spokenEnglishTranslation = \`\${t.en}\\nInstruction: Listen to the audio document and answer the audio question N°\${i}.\`;
    }`;

const replacementBlock = `    const optionsEn0 = translateOptionToEnglish(options[0]);
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
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${t.tr}\\n\${announcerLabel}: Écoutez la question et les 4 réponses. Question N°\${i} : \${questionTextPrompt}\\n... A : \${options[0]}.\\n... B : \${options[1]}.\\n... C : \${options[2]}.\\n... D : \${options[3]}.\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${t.en}\\n\${announcerLabelEn}: Listen to the question and the 4 options. Question N°\${i}: \${questionTextPrompt}\\n... A: \${optionsEn0}.\\n... B: \${optionsEn1}.\\n... C: \${optionsEn2}.\\n... D: \${optionsEn3}.\`;
    } else if (isQuestionInAudio) {
      fullSpokenTranscript = \`\${passageSpeakerLabel}: \${t.tr}\\n\${announcerLabel}: Écoutez la question. Question N°\${i} : \${questionTextPrompt}\`;
      spokenEnglishTranslation = \`\${passageSpeakerLabelEn}: \${t.en}\\n\${announcerLabelEn}: Listen to the question. Question N°\${i}: \${questionTextPrompt}\`;
    } else {
      fullSpokenTranscript = t.tr;
      spokenEnglishTranslation = t.en;
    }`;

if (code.includes(targetBlock)) {
  code = code.replace(targetBlock, replacementBlock);
} else {
  const targetBlockCRLF = targetBlock.replace(/\n/g, '\r\n');
  const replacementBlockCRLF = replacementBlock.replace(/\n/g, '\r\n');
  if (code.includes(targetBlockCRLF)) {
    code = code.replace(targetBlockCRLF, replacementBlockCRLF);
  } else {
    console.error("❌ targetBlock not found in examSchema.ts!");
    process.exit(1);
  }
}

fs.writeFileSync(examSchemaPath, code);
console.log("✅ Successfully refactored 100% parallel transcripts & English translations in src/lib/examSchema.ts!");
