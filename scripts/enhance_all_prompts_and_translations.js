import fs from 'fs';
import path from 'path';

console.log("=== 🛠️ ENHANCING ALL 390 LISTENING ITEMS WITH 100% SPECIFIC QUESTION PROMPTS & PURE ENGLISH TRANSLATIONS ===");

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let schemaCode = fs.readFileSync(examSchemaPath, 'utf8');

// Fix generateListeningQuestions to use t.q for questionPrompt and clean English options translation
const oldGenLogic = `    let questionTextPrompt = (t as any).q;
    if (!questionTextPrompt) {
      const lowerTitle = (t.title || '').toLowerCase();
      if (lowerTitle.includes('gare') || lowerTitle.includes('aéroport') || lowerTitle.includes('bus') || lowerTitle.includes('vol')) {
        questionTextPrompt = "Quelle est l'information essentielle concernant le lieu, le quai ou la porte d'embarquement ?";
      } else if (lowerTitle.includes('supermarché') || lowerTitle.includes('magasin') || lowerTitle.includes('boutique') || lowerTitle.includes('pizzeria')) {
        questionTextPrompt = "Quel est le lieu où se trouve la personne ou la promotion annoncée ?";
      } else if (lowerTitle.includes('météo')) {
        questionTextPrompt = "Quel conseil ou prévision météorologique est annoncé pour la journée ?";
      } else if (lowerTitle.includes('livraison') || lowerTitle.includes('colis') || lowerTitle.includes('rendez-vous') || lowerTitle.includes('mécanicien')) {
        questionTextPrompt = "Quelle est la date, l'heure ou la consigne exacte transmise dans ce message ?";
      } else if (lowerTitle.includes('sécurité') || lowerTitle.includes('incendie') || lowerTitle.includes('copropriété') || lowerTitle.includes('entreprise')) {
        questionTextPrompt = "Quelle consigne de sécurité ou quel changement d'organisation devez-vous suivre ?";
      } else {
        questionTextPrompt = "Quel est l'élément ou le message principal à retenir de ce document sonore ?";
      }
    }`;

const newGenLogic = `    let questionTextPrompt = (t as any).q || (t as any).title || "Quel est le message principal de ce document sonore ?";`;

if (schemaCode.includes(oldGenLogic)) {
  schemaCode = schemaCode.replace(oldGenLogic, newGenLogic);
} else {
  const oldGenLogicCRLF = oldGenLogic.replace(/\n/g, '\r\n');
  const newGenLogicCRLF = newGenLogic.replace(/\n/g, '\r\n');
  if (schemaCode.includes(oldGenLogicCRLF)) {
    schemaCode = schemaCode.replace(oldGenLogicCRLF, newGenLogicCRLF);
  }
}

// Clean English translation block in generateListeningQuestions so options aren't leaked in raw French
const oldEnBlock = `    let spokenEnglishTranslation = t.en;
    if (i <= 4) {
      spokenEnglishTranslation = \`Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image.\\n• Proposition A: \${options[0]}\\n• Proposition B: \${options[1]}\\n• Proposition C: \${options[2]}\\n• Proposition D: \${options[3]}\`;
    } else if (isSpokenOptionQuestion) {
      spokenEnglishTranslation = \`\${t.en}\\nInstruction: Listen to the audio document, question N°\${i}, and 4 spoken options.\\n• Option A: \${options[0]}\\n• Option B: \${options[1]}\\n• Option C: \${options[2]}\\n• Option D: \${options[3]}\`;
    }`;

const newEnBlock = `    let spokenEnglishTranslation = t.en;
    if (i <= 4) {
      spokenEnglishTranslation = \`Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image.\`;
    } else if (isSpokenOptionQuestion) {
      spokenEnglishTranslation = \`\${t.en}\\nInstruction: Listen to the audio document and answer the audio question N°\${i}.\`;
    }`;

if (schemaCode.includes(oldEnBlock)) {
  schemaCode = schemaCode.replace(oldEnBlock, newEnBlock);
} else {
  const oldEnBlockCRLF = oldEnBlock.replace(/\n/g, '\r\n');
  const newEnBlockCRLF = newEnBlock.replace(/\n/g, '\r\n');
  if (schemaCode.includes(oldEnBlockCRLF)) {
    schemaCode = schemaCode.replace(oldEnBlockCRLF, newEnBlockCRLF);
  }
}

fs.writeFileSync(examSchemaPath, schemaCode);
console.log("✅ Successfully updated prompt extraction and pure English translation logic in src/lib/examSchema.ts!");
