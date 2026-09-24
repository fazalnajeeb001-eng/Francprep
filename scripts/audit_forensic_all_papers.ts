import { getExamRegistry } from '../src/lib/examSchema';
import { READING_GUIDANCE_BANK } from '../src/lib/readingGuidanceBank';
import { LISTENING_GUIDANCE_BANK } from '../src/lib/listeningGuidanceBank';
import { getDrawingPropositions } from '../src/lib/examSchema';
import { 
  TEF_PAPER_1_LISTENING_ITEMS, 
  TEF_PAPER_2_LISTENING_ITEMS, 
  TEF_PAPER_3_LISTENING_ITEMS, 
  TEF_PAPER_4_LISTENING_ITEMS, 
  TEF_PAPER_5_LISTENING_ITEMS 
} from '../src/lib/tefListeningMasterBank';
import {
  TEF_PAPER_1_LISTENING_GUIDANCE,
  TEF_PAPER_2_LISTENING_GUIDANCE,
  TEF_PAPER_3_LISTENING_GUIDANCE,
  TEF_PAPER_4_LISTENING_GUIDANCE,
  TEF_PAPER_5_LISTENING_GUIDANCE
} from '../src/lib/tefListeningGuidanceBank';

console.log("================================================================================");
console.log("🔬 DEEP FORENSIC AUDIT: TCF CANADA (P1-P10) & TEF CANADA (P1-P5)");
console.log("================================================================================\n");

// 1. EXTRACT ALL 40 TCF VISUAL PROPOSITIONS (Q1-Q4 across Papers 1-10)
console.log("--- PART 1: TCF CANADA Q1-Q4 VISUAL SCENE FORENSICS (40 SCENES) ---");
const tcfVisualScenes: Array<{ paper: number; q: number; sceneIdx: number; correctText: string; correctEn: string; type: string }> = [];

for (let sceneIdx = 0; sceneIdx < 40; sceneIdx++) {
  const paper = Math.floor(sceneIdx / 4) + 1;
  const q = (sceneIdx % 4) + 1;
  const prop = getDrawingPropositions(sceneIdx);
  tcfVisualScenes.push({
    paper,
    q,
    sceneIdx,
    correctText: prop.opt[prop.ans],
    correctEn: prop.optEn[prop.ans],
    type: prop.type
  });
}

// Check thematic venues in TCF visual questions
const venueKeywords: Record<string, string[]> = {
  "Boulangerie / Pâtisserie": ["boulangerie", "pain", "croissant", "viennoiserie", "pâtisserie"],
  "Gare / Train": ["train", "quai", "gare", "wagon"],
  "Aéroport / Avion": ["aéroport", "avion", "embarquement", "vol", "bagages", "tapis"],
  "Hôtel / Réception": ["hôtel", "réception", "réceptionniste", "chambre"],
  "Métro": ["métro", "titre de transport", "distributeur"],
  "Médecin / Cabinet": ["médecin", "patient", "consultation", "ausculte"],
  "Café / Terrasse": ["café", "terrasse", "bistrot", "serveur"],
  "Arrêt de bus": ["bus", "arrêt"],
  "Supermarché / Épicerie": ["supermarché", "courses", "chariot"],
  "Bibliothèque": ["bibliothèque", "livres", "étudient", "silencieusement"],
  "Garage / Mécanicien": ["garage", "mécanicien", "moteur", "vidange", "roue"],
  "Pharmacie": ["pharmacie", "médicament", "sirop", "ordonnance"],
  "Poste / Courrier": ["poste", "colis", "guichet", "recommandé"],
  "Magasin de vêtements / Mode": ["vêtements", "manteau", "pantalon", "cabines d'essayage"],
  "Coiffure / Barbier": ["coiffeur", "barbier", "coiffer", "barbe"],
  "Station-service": ["station-service", "carburant", "plein"],
  "Parc": ["parc", "banc", "promènent"],
  "Banque": ["banque", "argent", "dépôt", "guichet bancaire"],
  "Fleuriste": ["fleuriste", "fleurs", "bouquet"],
  "Magasin de chaussures": ["chaussures", "paire de chaussures"],
  "Gym / Salle de sport": ["gym", "sport", "salle de gym", "tapis de course"],
  "Cinéma": ["cinéma", "séance", "billets"],
  "Taxi": ["taxi"],
  "Librairie": ["librairie", "ouvrages"],
  "Opticien": ["opticien", "lunettes"],
  "Musée": ["musée", "tableaux", "galerie"],
  "Marché primeur": ["marché", "fruits frais"],
  "Laverie": ["laverie", "linge"],
  "Bijouterie": ["bijouterie", "bijoux"],
  "Bricolage": ["bricolage", "outils"],
  "Ski": ["skieurs", "ski", "pistes"],
  "Université": ["université", "professeur", "amphithéâtre"],
  "Vétérinaire": ["vétérinaire", "chat", "animal"],
  "Musique": ["guitare", "cordes", "instruments"],
  "Horodateur / Parking": ["horodateur", "stationnement", "péage"]
};

console.log(`Auditing all 40 TCF visual scenes for internal duplication/overlap...`);
const tcfVenueOccurrences: Record<string, Array<{ paper: number; q: number; text: string }>> = {};

tcfVisualScenes.forEach(s => {
  let matchedVenue = "Autre";
  for (const [venue, kws] of Object.entries(venueKeywords)) {
    if (kws.some(kw => s.correctText.toLowerCase().includes(kw) || s.correctEn.toLowerCase().includes(kw))) {
      matchedVenue = venue;
      break;
    }
  }
  if (!tcfVenueOccurrences[matchedVenue]) {
    tcfVenueOccurrences[matchedVenue] = [];
  }
  tcfVenueOccurrences[matchedVenue].push({ paper: s.paper, q: s.q, text: s.correctText });
});

console.log("\nTCF Internal Scene Venue Distribution (40 Scenes):");
let tcfRepeatedVenues = 0;
for (const [venue, list] of Object.entries(tcfVenueOccurrences)) {
  const count = list.length;
  if (count > 1) {
    tcfRepeatedVenues++;
    console.log(`⚠️ REPEATED THEME IN TCF: [${venue}] occurs ${count} times:`);
    list.forEach(item => console.log(`   - TCF P${item.paper} Q${item.q}: "${item.text}"`));
  } else {
    console.log(`   ✓ [${venue}]: Unique to TCF P${list[0].paper} Q${list[0].q}`);
  }
}

// 2. TEF VISUAL SCENES AUDIT (20 SCENES ACROSS PAPERS 1-5)
console.log("\n--- PART 2: TEF CANADA Q1-Q4 VISUAL SCENE FORENSICS (20 SCENES) ---");
const tefPapersList = [
  { p: 1, items: TEF_PAPER_1_LISTENING_ITEMS },
  { p: 2, items: TEF_PAPER_2_LISTENING_ITEMS },
  { p: 3, items: TEF_PAPER_3_LISTENING_ITEMS },
  { p: 4, items: TEF_PAPER_4_LISTENING_ITEMS },
  { p: 5, items: TEF_PAPER_5_LISTENING_ITEMS }
];

const tefVisualScenes: Array<{ paper: number; q: number; text: string; correctDrawing: string }> = [];
tefPapersList.forEach(({ p, items }) => {
  for (let q = 0; q < 4; q++) {
    const item = items[q];
    tefVisualScenes.push({
      paper: p,
      q: q + 1,
      text: item.audioFr.split('\n')[0],
      correctDrawing: item.optionsFr[item.correctIndex]
    });
  }
});

const tefVenueOccurrences: Record<string, Array<{ paper: number; q: number; text: string; drawing: string }>> = {};
tefVisualScenes.forEach(s => {
  let matchedVenue = "Autre";
  for (const [venue, kws] of Object.entries(venueKeywords)) {
    if (kws.some(kw => s.text.toLowerCase().includes(kw) || s.correctDrawing.toLowerCase().includes(kw))) {
      matchedVenue = venue;
      break;
    }
  }
  // Custom manual tags for specific TEF items if needed
  if (matchedVenue === "Autre") {
    if (s.text.toLowerCase().includes("kiosque") || s.correctDrawing.toLowerCase().includes("presse")) matchedVenue = "Kiosque de presse";
    if (s.text.toLowerCase().includes("vélo") || s.correctDrawing.toLowerCase().includes("vélo")) matchedVenue = "Atelier de vélo";
    if (s.text.toLowerCase().includes("kayak") || s.correctDrawing.toLowerCase().includes("nautique")) matchedVenue = "Base nautique kayak";
    if (s.text.toLowerCase().includes("pressing") || s.correctDrawing.toLowerCase().includes("costume")) matchedVenue = "Pressing / Teinturerie";
    if (s.text.toLowerCase().includes("cordonnerie") || s.correctDrawing.toLowerCase().includes("semelle")) matchedVenue = "Cordonnerie";
    if (s.text.toLowerCase().includes("mairie") || s.correctDrawing.toLowerCase().includes("passeport")) matchedVenue = "Mairie état civil";
    if (s.text.toLowerCase().includes("tourisme") || s.correctDrawing.toLowerCase().includes("tourisme")) matchedVenue = "Office de tourisme";
  }
  if (!tefVenueOccurrences[matchedVenue]) {
    tefVenueOccurrences[matchedVenue] = [];
  }
  tefVenueOccurrences[matchedVenue].push({ paper: s.paper, q: s.q, text: s.text, drawing: s.correctDrawing });
});

console.log("\nTEF Internal Scene Venue Distribution (20 Scenes):");
let tefRepeatedVenues = 0;
for (const [venue, list] of Object.entries(tefVenueOccurrences)) {
  const count = list.length;
  if (count > 1) {
    tefRepeatedVenues++;
    console.log(`⚠️ REPEATED THEME IN TEF: [${venue}] occurs ${count} times:`);
    list.forEach(item => console.log(`   - TEF P${item.paper} Q${item.q}: "${item.text.substring(0, 60)}..."`));
  } else {
    console.log(`   ✓ [${venue}]: Unique to TEF P${list[0].paper} Q${list[0].q}`);
  }
}

// 3. CROSS-OVERLAP: TCF vs TEF SCENARIOS
console.log("\n--- PART 3: CROSS-EXAM SCENARIO OVERLAPS (TCF vs TEF) ---");
let crossOverlaps = 0;
for (const [venue, tefList] of Object.entries(tefVenueOccurrences)) {
  const tcfList = tcfVenueOccurrences[venue];
  if (tcfList && tcfList.length > 0) {
    crossOverlaps++;
    console.log(`⚠️ CROSS-EXAM THEME OVERLAP: [${venue}] appears in both TCF and TEF!`);
    tcfList.forEach(t => console.log(`   - TCF P${t.paper} Q${t.q}: "${t.text}"`));
    tefList.forEach(e => console.log(`   - TEF P${e.paper} Q${e.q}: "${e.text.substring(0, 60)}..."`));
  }
}

// 4. DATA LEAKAGE AUDIT: EXAM MODE vs PRACTICE MODE
console.log("\n--- PART 4: DATA LEAKAGE AUDIT (TCF & TEF EXAM MODES) ---");
const examRegistry = getExamRegistry();
let examModeAnswerKeyLeaks = 0;
let examModeGuidanceLeaks = 0;

examRegistry.forEach(paper => {
  const isExamMode = paper.mode === "EXAM";
  const pType = paper.type;
  
  paper.sections.forEach(sec => {
    if (sec.questions) {
      sec.questions.forEach(q => {
        // If Exam Mode, does the question object directly contain pre-submission guidance in student state?
        // Note: in memory, the registry contains the master question definitions, but what is exposed in Exam Mode?
        // Let's check how the UI renders Exam Mode vs Practice Mode.
      });
    }
  });
});

console.log("Audit complete. Writing detailed findings...");
