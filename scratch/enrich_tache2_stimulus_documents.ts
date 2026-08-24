import { MASTER_SPEAKING_BANK } from "../src/lib/speakingMasterBank";
import * as fs from "fs";

const stimulusDocsMap: Record<number, any> = {
  1: {
    title: "INSTITUT LINGUISTIQUE INTERNATIONAL DE MONTRÉAL",
    category: "Formation Professionnelle & Perfectionnement",
    organization: "Institut Linguistique Montréal (Agréé FEI & Ministère de l'Immigration)",
    content: "Sessions intensives de français professionnel et préparation aux examens officiels. Groupes réduits (max 10 apprenants). Cours en présentiel au centre-ville ou formule hybride interactive.",
    details: [
      "📅 Sessions : Début chaque lundi, sessions de 4 à 12 semaines",
      "⏰ Horaires : Du lundi au vendredi (9h00 - 13h00 ou 18h00 - 21h00)",
      "💰 Tarifs : 380 $ CAD / semaine (Matériel pédagogique inclus)",
      "💻 Options : Ateliers de rédaction professionnelle et simulations d'entretien",
      "🎓 Attestation officielle remise en fin de cursus"
    ],
    contactInfo: "📍 1250 Boulevard René-Lévesque Ouest, Montréal • 📞 514-555-0192 • ✉️ admission@institut-montreal.qc.ca"
  },
  2: {
    title: "RÉSIDENCE ÉCO-RESPONSABLE DU VIEUX-QUÉBEC",
    category: "Immobilier & Location Saisonnière",
    organization: "Gestion Immobilière Québec Panoramique",
    content: "Superbes appartements meublés de 2 à 4 pièces situés au cœur du quartier historique. Idéal pour séjours de vacances ou déplacements professionnels.",
    details: [
      "🏢 Logements : T2 et T3 entièrement équipés avec balcon",
      "🔑 Disponibilité : Location à la semaine ou au mois",
      "💰 Tarifs : À partir de 750 $ CAD / semaine (charges comprises)",
      "🌱 Équipements : Wi-Fi haut débit, stationnement privé, lave-linge",
      "🐾 Animaux : Acceptés sur demande préalable"
    ],
    contactInfo: "📍 45 Rue Saint-Jean, Québec (QC) • 📞 418-555-0144 • ✉️ contact@quebec-loc.ca"
  },
  3: {
    title: "GRAND NETTOYAGE ÉCOLOGIQUE MUNICIPAL DE RIDEAU",
    category: "Vie Communautaire & Environnement",
    organization: "Ville d'Ottawa — Direction des Services Citoyens",
    content: "Initiative citoyenne de dépollution des berges du canal Rideau. Matériel fourni par la municipalité, inscription requise pour les groupes.",
    details: [
      "📅 Date : Samedi 14 mai de 9h00 à 16h00",
      "🛠️ Matériel : Gants, sacs recyclables et pinces fournis",
      "🚌 Accès : Navettes gratuites depuis le centre-ville",
      "🥪 Restauration : Collation bio offerte à tous les bénévoles",
      "📜 Attestation : Certificat d'engagement citoyen délivré"
    ],
    contactInfo: "📍 Parc de la Confédération, Ottawa • 📞 613-555-0188 • ✉️ benevolat@ottawa.ca"
  },
  4: {
    title: "LIBRAIRIE-CAFÉ 'LES PAGES DU SAVOIR' — SHERBROOKE",
    category: "Offre d'Emploi Étudiant & Temps Partiel",
    organization: "Librairie Culturelle Sherbrooke Inc.",
    content: "Recherche assistants polyvalents pour la saison estivale. Accueil des clients, gestion du rayon francophone et service au café-lecture.",
    details: [
      "💼 Poste : Assistant(e) librairie et service café",
      "⏰ Horaire : 15 à 25 heures / semaine (week-ends inclus)",
      "💵 Rémunération : 16,50 $ CAD / heure + avantages",
      "🎓 Exigences : Bon niveau de français parlé, sens du contact",
      "📅 Début : Prise de poste début juin"
    ],
    contactInfo: "📍 88 Rue Wellington Nord, Sherbrooke • 📞 819-555-0122 • ✉️ rh@pages-savoir.qc.ca"
  },
  5: {
    title: "MUSÉE NATIONAL DES BEAUX-ARTS DU QUÉBEC",
    category: "Sorties Culturelles & Groupes Scolaires",
    organization: "Direction de l'Action Culturelle du MNBAQ",
    content: "Visites guidées thématiques et ateliers créatifs pour groupes d'étudiants. Tarifs préférentiels et créneaux réservés sur demande.",
    details: [
      "🎨 Visites : Parcours thématiques 'Art et Histoire du Canada'",
      "👥 Groupes : De 10 à 30 personnes (réservation préalable)",
      "🎟️ Tarifs : 12 $ CAD par étudiant (gratuit pour accompagnateurs)",
      "🎧 Outils : Audioguides en français inclus",
      "☕ Espace : Salle de pique-nique et café disponibles"
    ],
    contactInfo: "📍 Parc des Champs-de-Bataille, Québec • 📞 418-555-0199 • ✉️ groupes@mnbaq.org"
  },
  6: {
    title: "AUTO-EXPRESS TROIS-RIVIÈRES",
    category: "Location de Véhicules Tous Gammes",
    organization: "Agence Régionale de Mobilité",
    content: "Location de voitures économiques, hybrides et VUS pour vos déplacements en Mauricie. Formules week-end avec kilométrage illimité.",
    details: [
      "🚗 Modèles : Citadines, berlines et VUS 100% électriques",
      "⛽ Formules : Kilométrage illimité ou forfait 500 km",
      "🛡️ Assurance : Protection tous risques et assistance 24/7",
      "💳 Conditions : Permis valide depuis 1 an, dépôt de garantie",
      "👶 Options : Sièges enfants et GPS disponibles"
    ],
    contactInfo: "📍 1500 Boulevard des Forges, Trois-Rivières • 📞 819-555-0155 • ✉️ info@auto-express-tr.ca"
  },
  7: {
    title: "COMPLEXE AQUATIQUE ET SPORTIF MUNICIPAL DE GATINEAU",
    category: "Loisirs, Santé & Sports",
    organization: "Ville de Gatineau — Direction des Sports",
    content: "Inauguration des nouvelles infrastructures : piscine olympique, salles de musculation, terrains de badminton et cours collectifs animés.",
    details: [
      "🏊 Infrastructures : Bassin 50m, sauna et salle de fitness",
      "📅 Ouverture : Portes ouvertes avec séances d'essai gratuites",
      "💳 Abonnements : Tarifs dégressifs résidents / non-résidents",
      "🏋️ Cours : Yoga, aquagym, spinning et zumba",
      "👨‍👩‍👧 Formules : Pass famille et réductions étudiants"
    ],
    contactInfo: "📍 850 Boulevard de la Gappe, Gatineau • 📞 819-555-0177 • ✉️ sports@gatineau.ca"
  },
  8: {
    title: "RÉSEAU SOLIDAIREMENT ALIMENTAIRE DE RIMOUSKI",
    category: "Bénévolat & Action Sociale",
    organization: "Association Caritative Bas-Saint-Laurent",
    content: "Appel à bénévoles pour le tri, l'emballage et la distribution de denrées alimentaires aux familles défavorisées de la région.",
    details: [
      "🤝 Missions : Tri de denrées, préparation de colis, accueil",
      "⏰ Disponibilités : 3 à 6 heures par semaine (flexible)",
      "🚌 Transport : Remboursement des frais de déplacement",
      "🎓 Formation : Sensibilisation à la sécurité alimentaire offerte",
      "📜 Attestation : Certificat de bénévolat communautaire"
    ],
    contactInfo: "📍 210 Avenue de la Cathédrale, Rimouski • 📞 418-555-0133 • ✉️ benevoles@solidarite-rimouski.ca"
  },
  9: {
    title: "ESPACE COWORKING 'INNOVA-WORK' LAVAL",
    category: "Bureaux Partagés & Flex-Office",
    organization: "Innova-Work Québec Inc.",
    content: "Espaces de travail modernes pour travailleurs autonomes, startups et professionnels nomades. Postes flexibles ou bureaux fermés.",
    details: [
      "🖥️ Postes : Formule nomade (open-space) ou bureau dédié",
      "☕ Services : Café bio à volonté, imprimante laser, Wi-Fi 1Gb/s",
      "📅 Accès : Accès sécurisé 24/7 par badge électronique",
      "🤝 Salles : 4 salles de réunion équipées en visioconférence",
      "💰 Tarifs : Forfaits journée (35$) ou mensuel (290$)"
    ],
    contactInfo: "📍 3050 Boulevard Saint-Martin Ouest, Laval • 📞 450-555-0166 • ✉️ contact@innova-work.ca"
  },
  10: {
    title: "CLUB DE LECTURE FRANC-PARLER DE MONTRÉAL",
    category: "Culture, Littérature & Échanges",
    organization: "Réseau des Bibliothèques Municipales de Montréal",
    content: "Rencontres mensuelles conviviales autour de romans, essais et œuvres théâtrales francophones. Débats passionnants et rencontres d'auteurs.",
    details: [
      "📚 Rencontres : Le 1er mardi de chaque mois (18h30 - 20h30)",
      "📖 Prêt : Emprunt gratuit des ouvrages sélectionnés",
      "☕ Ambiance : Échanges informels avec thé et rafraîchissements",
      "🎟️ Cotisation : Adhésion annuelle 25 $ CAD (gratuite pour abonnés)",
      "🎭 Événements : Conférences privées avec des écrivains invités"
    ],
    contactInfo: "📍 Bibliothèque Grande Bibliothèque, Montréal • 📞 514-555-0111 • ✉️ club-lecture@banq.qc.ca"
  }
};

function enrichTache2StimulusDocs() {
  console.log("=== 🎨 ENRICHING TÂCHE 2 STIMULUS DOCUMENTS ACROSS ALL 10 PAPERS ===");

  const fullBank = { ...MASTER_SPEAKING_BANK };

  Object.keys(fullBank).forEach((pStr) => {
    const pNum = Number(pStr);
    const tasks = fullBank[pNum];
    const t2 = tasks.find((t) => t.taskNumber === 2);
    if (t2) {
      t2.stimulusDocument = stimulusDocsMap[pNum];
      console.log(`✅ Attached Stimulus Document to Paper ${pNum} Tâche 2: "${t2.stimulusDocument.title}"`);
    }
  });

  const content = `/**
 * 🇨🇦 FrancPrep Master Authentic Speaking Bank (Phase 1 Calibrated with Stimulus Documents)
 * Official France Éducation International (FEI) TCF Canada Standard
 * 30 Authentic Tasks across Papers 1 to 10 with Single Examiner Voice Personas per Paper
 */

export interface StimulusDocument {
  title: string;
  category: string;
  organization: string;
  content: string;
  details: string[];
  contactInfo: string;
}

export interface MasterSpeakingTask {
  id: string;
  paperNumber: number;
  taskNumber: 1 | 2 | 3;
  title: string;
  titleEn: string;
  cefrTarget: "A1-B1" | "B1-C1" | "B2-C2";
  scenario: string;
  scenarioEn: string;
  stimulusDocument?: StimulusDocument;
  examinerPersona: {
    name: string;
    role: string;
    gender: "female" | "male";
    voiceId: string;
    openingPromptFrench: string;
    openingPromptEnglish: string;
    followUpCounterQuestion?: string;
    roleplayPrompt?: string;
  };
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases: string[];
  recommendedConnectors: string[];
  trapAlert: string;
  trapAlertEn: string;
  speakingCoach: string;
  speakingCoachEn: string;
}

export const MASTER_SPEAKING_BANK: Record<number, MasterSpeakingTask[]> = ${JSON.stringify(fullBank, null, 2)};

export function getMasterSpeakingTasks(paperIdOrNumber: string | number): MasterSpeakingTask[] {
  let paperNum = 1;
  if (typeof paperIdOrNumber === "number") {
    paperNum = Math.min(10, Math.max(1, paperIdOrNumber));
  } else {
    const matched = String(paperIdOrNumber).match(/\\d+/);
    if (matched) {
      paperNum = Math.min(10, Math.max(1, parseInt(matched[0], 10)));
    }
  }

  return MASTER_SPEAKING_BANK[paperNum] || MASTER_SPEAKING_BANK[1];
}
`;

  fs.writeFileSync("src/lib/speakingMasterBank.ts", content);
  console.log("\n🎉 Successfully updated src/lib/speakingMasterBank.ts with rich Stimulus Documents for all 10 Papers!");
}

enrichTache2StimulusDocs();
