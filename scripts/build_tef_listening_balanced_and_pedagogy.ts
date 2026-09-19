import fs from 'fs';
import path from 'path';

console.log("=== 🇨🇦 BALANCING TEF LISTENING ANSWER KEYS & GENERATING BESPOKE PEDAGOGY ===");

// 1. Target answer indices for Q5 to Q40 (36 questions: exactly 9 of each 0, 1, 2, 3)
const targetIndicesQ5to40 = [
  1, 2, 0, 3, 1, 3, 0, 2, 1, 3, 0, 2, 3, 1, 0, 2, 1, 3, 0, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 3, 0, 2
];

// Verify distribution
const counts: Record<number, number> = { 0: 1, 1: 1, 2: 1, 3: 1 }; // Q1=0, Q2=1, Q3=2, Q4=3
for (const idx of targetIndicesQ5to40) {
  counts[idx] = (counts[idx] || 0) + 1;
}
console.log("Answer key distribution across 40 questions:", counts);
if (counts[0] !== 10 || counts[1] !== 10 || counts[2] !== 10 || counts[3] !== 10) {
  console.error("❌ Distribution error: not 10 of each!", counts);
  process.exit(1);
}

// 2. Read tefListeningMasterBank.ts
const masterBankPath = path.resolve(process.cwd(), 'src/lib/tefListeningMasterBank.ts');
let masterBankContent = fs.readFileSync(masterBankPath, 'utf8');

// Section A drawings rotation:
// Q1: Target A (index 0) - Already in slot 0.
// Q2: Target B (index 1) - Swap slot 0 and 1 of optionImages.
// Q3: Target C (index 2) - Move target (index 0) to slot 2.
// Q4: Target D (index 3) - Move target (index 0) to slot 3.

// Let's import the existing items dynamically to inspect and transform
import { TEF_PAPER_1_LISTENING_ITEMS } from '../src/lib/tefListeningMasterBank.js';

interface Item {
  id: string;
  paperNumber: number;
  questionNumber: number;
  typology: string;
  level: string;
  title: string;
  speakingRate: number;
  prepTimeSeconds: number;
  answerTimeSeconds: number;
  speakerCount: number;
  speakers: string[];
  audioFr: string;
  audioEn: string;
  questionFr: string;
  questionEn: string;
  optionsFr: string[];
  optionsEn: string[];
  correctIndex: number;
  mainImage?: string;
  optionImages?: string[];
}

const updatedItems: Item[] = JSON.parse(JSON.stringify(TEF_PAPER_1_LISTENING_ITEMS));

// Transform Q1 - Q4:
// Q1: correctIndex = 0
updatedItems[0].correctIndex = 0;

// Q2: target was at 0 (tef_p1_q2_a.png). Rotate to 1 (B)
updatedItems[1].correctIndex = 1;
updatedItems[1].optionImages = [
  "/illustrations/tef/tef_p1_q2_b.png", // A: Fruits & légumes
  "/illustrations/tef/tef_p1_q2_a.png", // B: Boulangerie (CORRECT)
  "/illustrations/tef/tef_p1_q2_c.png", // C: Pharmacie
  "/illustrations/tef/tef_p1_q2_d.png"  // D: Fast Food
];

// Q3: target was at 0 (tef_p1_q3_a.png). Rotate to 2 (C)
updatedItems[2].correctIndex = 2;
updatedItems[2].optionImages = [
  "/illustrations/tef/tef_p1_q3_b.png", // A: Bibliothèque
  "/illustrations/tef/tef_p1_q3_c.png", // B: Supermarché
  "/illustrations/tef/tef_p1_q3_a.png", // C: Cabinet médical (CORRECT)
  "/illustrations/tef/tef_p1_q3_d.png"  // D: Hôtel accueil
];

// Q4: target was at 0 (tef_p1_q4_a.png). Rotate to 3 (D)
updatedItems[3].correctIndex = 3;
updatedItems[3].optionImages = [
  "/illustrations/tef/tef_p1_q4_b.png", // A: Rayon casques
  "/illustrations/tef/tef_p1_q4_c.png", // B: Trottinettes
  "/illustrations/tef/tef_p1_q4_d.png", // C: Gonflage pneu
  "/illustrations/tef/tef_p1_q4_a.png"  // D: Réparation vélo (CORRECT)
];

// Transform Q5 - Q40:
for (let i = 4; i < 40; i++) {
  const item = updatedItems[i];
  const targetIdx = targetIndicesQ5to40[i - 4];
  
  // The correct option was originally at index 0.
  // Swap index 0 and targetIdx
  if (targetIdx !== 0) {
    const tempFr = item.optionsFr[0];
    item.optionsFr[0] = item.optionsFr[targetIdx];
    item.optionsFr[targetIdx] = tempFr;

    const tempEn = item.optionsEn[0];
    item.optionsEn[0] = item.optionsEn[targetIdx];
    item.optionsEn[targetIdx] = tempEn;
  }
  item.correctIndex = targetIdx;
}

// Update Typology for Q38-Q40 to ACTES_DE_PAROLE
for (let i = 37; i < 40; i++) {
  updatedItems[i].typology = "ACTES_DE_PAROLE";
}

// Write updated tefListeningMasterBank.ts
const newMasterBankCode = `/**
 * 🇨🇦 Official TEF Canada Listening Master Bank (Compréhension Orale - 40 Questions)
 * Official CCI Paris Structure:
 *   - Groupe 1 (Q1-Q4): Identification de dessins (A1-A2) [Balanced keys: 1A, 1B, 1C, 1D]
 *   - Groupe 2 (Q5-Q12): Messages téléphoniques & annonces publiques (A2-B1)
 *   - Groupe 3 (Q13-Q16): Informations et consignes pratiques (B1-B2)
 *   - Groupe 4 (Q17-Q20): Micro-trottoirs (opinions de 6 intervenants) (B2)
 *   - Groupe 5 (Q21-Q26): Reportages d'actualité & débats sociétaux (B2-C1)
 *   - Groupe 6 (Q27-Q37): Grands entretiens et chroniques spécialisées (C1)
 *   - Groupe 7 (Q38-Q40): Actes de parole & intentions implicites (C1-C2)
 *
 * 100% Balanced Key Distribution: 10 A (25%), 10 B (25%), 10 C (25%), 10 D (25%).
 */

export interface TefListeningItem {
  id: string;
  paperNumber: number;
  questionNumber: number;
  typology: "DESSINS" | "MESSAGES" | "CONSIGNES" | "MICRO_TROTTOIR" | "REPORTAGE_DEBAT" | "GRAND_ENTRETIEN" | "ACTES_DE_PAROLE" | "DISCRIMINATION";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  speakingRate: number;
  prepTimeSeconds: number;
  answerTimeSeconds: number;
  speakerCount: number;
  speakers: string[];
  audioFr: string;
  audioEn: string;
  questionFr: string;
  questionEn: string;
  optionsFr: string[];
  optionsEn: string[];
  correctIndex: number;
  mainImage?: string;
  optionImages?: string[];
}

export const TEF_PAPER_1_LISTENING_ITEMS: TefListeningItem[] = ${JSON.stringify(updatedItems, null, 2)};
`;

fs.writeFileSync(masterBankPath, newMasterBankCode, 'utf8');
console.log("✓ Updated src/lib/tefListeningMasterBank.ts with balanced keys (10A, 10B, 10C, 10D).");
