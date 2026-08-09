import { getOfficialLineArtSvg } from "./lineArtIllustrations";

export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: string[];
  optionImages?: string[];
  mainImage?: string;
  mainImageSvg?: string;
  hasSpokenOptions?: boolean;
  correctIndex: number;
  explanation: string;
  hint?: string;
  transcript?: string;
  transcriptEnglish?: string;
  passage?: string;
  passageEnglish?: string;
  questionInAudio?: boolean;
  perQuestionTimerSeconds?: number;
}

export interface WritingTask {
  id: string;
  taskNumber: number;
  title: string;
  prompt: string;
  wordCountMin: number;
  wordCountMax: number;
  timeLimitMins: number;
  guidedTips?: string[];
  sampleResponse?: string;
}

export interface SpeakingTask {
  id: string;
  taskNumber: number;
  title: string;
  scenario: string;
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases?: string[];
}

export interface ExamSection {
  type: SectionType;
  title: string;
  description: string;
  durationMins: number;
  totalQuestions: number;
  questions?: ExamQuestion[];
  writingTasks?: WritingTask[];
  speakingTasks?: SpeakingTask[];
}

export interface ExamPaper {
  id: string;
  title: string;
  type: ExamType;
  code: string; // e.g. "TCF-PRAC-01" or "TCF-EXAM-01"
  description: string;
  totalDurationMins: number;
  isSamplePaper: boolean;
  published: boolean;
  recommendedMode?: ExamMode;
  sections: ExamSection[];
}

// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
const LISTENING_TOPICS = [
  // A1 ELEMENTARY (Q1 - Q10)
  {
    level: "A1",
    title: "Annonce de gare SNCF / Via Rail",
    text: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    opt: ["Au quai / voie 4", "À la gare du Nord", "En retard de 45 minutes", "Annulé sans correspondance"],
    ans: 0,
    tr: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    en: "Dear passengers, attention please. TGV train 7842 to Paris-Gare de Lyon, originally scheduled for 2:15pm, will exceptionally depart from platform 4. Please proceed to immediate boarding.",
    hint: "⚠️ Trap Alert: Notice the departure platform shift marker 'exceptionnellement'.\n🔄 Paraphrase Key: 'partira de la voie 4' defines the exact platform location.\n🎧 Acoustic Cues: Listen for 'voie' or 'quai'."
  },
  {
    level: "A1",
    title: "Message vocal d'un ami au supermarché",
    text: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    opt: ["Au supermarché", "À la boulangerie du quartier", "À la maison", "Au cinéma municipal"],
    ans: 0,
    tr: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    en: "Hi Thomas! It's Marc. I'm currently at the downtown supermarket doing weekly grocery shopping. Tell me, do you need me to pick up fresh bread or cheese for dinner tonight?",
    hint: "⚠️ Trap Alert: Do not confuse items the speaker offers to buy with where the speaker currently is.\n🔄 Paraphrase Key: 'je suis actuellement au...' establishes the physical location.\n🎧 Acoustic Cues: Listen for location prepositions like 'au'."
  },
  {
    level: "A1",
    title: "Annonce dans un magasin de vêtements",
    text: "Chers clients, votre magasin informe que le rayon des vêtements d'hiver ferme dans 15 minutes. Profitez de nos promotions de 50 % sur toutes les vestes et manteaux à la caisse principale.",
    opt: ["Fermeture du rayon dans 15 minutes", "Ouverture d'un nouveau magasin", "Perte d'un sac à main", "Distribution de cartes de fidélité gratuites"],
    ans: 0,
    tr: "Chers clients, votre magasin informe que le rayon des vêtements d'hiver ferme dans 15 minutes. Profitez de nos promotions de 50 % sur toutes les vestes et manteaux à la caisse principale.",
    en: "Dear customers, your store informs you that the winter clothing department closes in 15 minutes. Take advantage of 50% discounts on all jackets and coats at the main checkout.",
    hint: "⚠️ Trap Alert: Distinguish department closing time (15 mins) from discount percentage (50%).\n🔄 Paraphrase Key: 'ferme dans 15 minutes' states the closing delay.\n🎧 Acoustic Cues: Listen for time expressions after 'ferme dans'."
  },
  {
    level: "A1",
    title: "Message de confirmation de livraison",
    text: "Bonjour Madame Martin, votre colis Amazon numéro 4590 sera livré à votre domicile ce mercredi entre 9h et 12h. En cas d'absence, il sera déposé chez votre voisin du rez-de-chaussée.",
    opt: ["Mercredi matin entre 9h et 12h", "Jeudi après-midi à 16h", "Lundi soir à 20h", "Vendredi durant le week-end"],
    ans: 0,
    tr: "Bonjour Madame Martin, votre colis numéro 4590 sera livré à votre domicile ce mercredi entre 9h et 12h. En cas d'absence, il sera déposé chez votre voisin.",
    en: "Hello Mrs. Martin, your package 4590 will be delivered to your home this Wednesday between 9am and 12pm. If absent, it will be left with your neighbor.",
    hint: "⚠️ Trap Alert: Listen for the primary delivery window before the fallback option.\n🔄 Paraphrase Key: 'livré ce mercredi entre 9h et 12h'.\n🎧 Acoustic Cues: Pay attention to day names and hour numbers."
  },
  {
    level: "A1",
    title: "Annonce d'aéroport / Embarquement",
    text: "Attention aux passagers du vol Air Canada AC870 à destination de Montréal. L'embarquement commence maintenant à la porte B12. Veuillez présenter votre carte d'embarquement et votre passeport.",
    opt: ["À la porte B12", "À la porte A5", "Au comptoir des bagages", "Dans la salle d'attente principale"],
    ans: 0,
    tr: "Attention aux passagers du vol Air Canada AC870 à destination de Montréal. L'embarquement commence maintenant à la porte B12.",
    en: "Attention passengers on Air Canada flight AC870 to Montreal. Boarding is now starting at gate B12.",
    hint: "⚠️ Trap Alert: Do not confuse flight number (AC870) with gate number (B12).\n🔄 Paraphrase Key: 'à la porte B12' gives the gate location.\n🎧 Acoustic Cues: Gate numbers follow 'porte'."
  },
  {
    level: "A1",
    title: "Message sur répondeur d'un restaurant",
    text: "Bonjour, vous êtes bien au restaurant Le Petit Bistro. Nous sommes ouverts du mardi au samedi pour le déjeuner et le dîner. Pour toute réservation, veuillez laisser un message après le signal sonore.",
    opt: ["Du mardi au samedi", "Tous les jours 24h/24", "Uniquement le dimanche midi", "Le lundi soir seulement"],
    ans: 0,
    tr: "Bonjour, vous êtes au restaurant Le Petit Bistro. Nous sommes ouverts du mardi au samedi pour le déjeuner et le dîner.",
    en: "Hello, you have reached Le Petit Bistro restaurant. We are open Tuesday to Saturday for lunch and dinner.",
    hint: "⚠️ Trap Alert: Listen for exact open days vs closed days.\n🔄 Paraphrase Key: 'ouverts du mardi au samedi'.\n🎧 Acoustic Cues: Focus on day range after 'ouverts'."
  },
  {
    level: "A1",
    title: "Message d'une amie pour un café",
    text: "Coucou Sarah ! C'est Julie. Es-tu libre cet après-midi pour prendre un café vers 15h30 sur la place de la Comédie ? Rappelle-moi dès que tu peux !",
    opt: ["Prendre un café à 15h30", "Faire du sport au parc", "Aller au cinéma à 20h", "Visiter un musée"],
    ans: 0,
    tr: "Coucou Sarah ! C'est Julie. Es-tu libre cet après-midi pour prendre un café vers 15h30 sur la place de la Comédie ?",
    en: "Hi Sarah! It's Julie. Are you free this afternoon to grab a coffee around 3:30pm at Place de la Comédie?",
    hint: "⚠️ Trap Alert: Identify the activity (coffee) and proposed time (15h30).\n🔄 Paraphrase Key: 'prendre un café vers 15h30'.\n🎧 Acoustic Cues: Time indicators follow 'vers'."
  },
  {
    level: "A1",
    title: "Annonce dans un bus de ville",
    text: "Prochain arrêt : Place de l'Hôtel de Ville. Correspondance avec la ligne de métro 1 et la ligne de bus 14. Terminus pour ce véhicule.",
    opt: ["Place de l'Hôtel de Ville", "Gare Centrale", "Aéroport International", "Parc des Expositions"],
    ans: 0,
    tr: "Prochain arrêt : Place de l'Hôtel de Ville. Correspondance avec la ligne de métro 1 et la ligne de bus 14.",
    en: "Next stop: City Hall Square. Transfer with metro line 1 and bus line 14.",
    hint: "⚠️ Trap Alert: Distinguish stop name from connecting metro/bus line numbers.\n🔄 Paraphrase Key: 'Prochain arrêt : Place de l'Hôtel de Ville'.\n🎧 Acoustic Cues: Listen for words following 'prochain arrêt'."
  },
  {
    level: "A1",
    title: "Message vocal d'un collègue de travail",
    text: "Bonjour Paul, c'est Antoine du bureau. J'ai laissé le dossier de présentation sur ton bureau à côté de ton ordinateur. N'oublie pas de le lire avant la réunion de 14h.",
    opt: ["Sur le bureau d'ordinateur", "Dans le tiroir de l'accueil", "À la cafétéria", "Dans la voiture du directeur"],
    ans: 0,
    tr: "Bonjour Paul, c'est Antoine. J'ai laissé le dossier de présentation sur ton bureau à côté de ton ordinateur.",
    en: "Hello Paul, it's Antoine from the office. I left the presentation file on your desk next to your computer.",
    hint: "⚠️ Trap Alert: Note the exact location of the document.\n🔄 Paraphrase Key: 'sur ton bureau à côté de ton ordinateur'.\n🎧 Acoustic Cues: Prepositions of place 'sur' or 'à côté de'."
  },
  {
    level: "A1",
    title: "Annonce de pharmacie de garde",
    text: "La pharmacie Saint-Jean vous informe que la garde de nuit ce dimanche est assurée par la pharmacie du Centre située 12 rue de la Paix.",
    opt: ["La pharmacie du Centre", "La pharmacie de la Gare", "La clinique vétérinaire", "L'hôpital général"],
    ans: 0,
    tr: "La pharmacie Saint-Jean vous informe que la garde de nuit ce dimanche est assurée par la pharmacie du Centre.",
    en: "Saint-Jean Pharmacy informs you that night duty this Sunday is provided by Centre Pharmacy located at 12 rue de la Paix.",
    hint: "⚠️ Trap Alert: Saint-Jean Pharmacy is making the call, but Centre Pharmacy is providing night service.\n🔄 Paraphrase Key: 'assurée par la pharmacie du Centre'.\n🎧 Acoustic Cues: Listen for names following 'assurée par'."
  },

  // A2 BASIC (Q11 - Q18)
  {
    level: "A2",
    title: "Bulletin météo radio",
    text: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues sur l'ensemble de la région au cours de l'après-midi.",
    opt: ["Prendre un parapluie pour les averses", "Mettre des lunettes de soleil", "Rester à la maison toute la journée", "Prendre la voiture pour éviter la neige"],
    ans: 0,
    tr: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues.",
    en: "Hello everyone, here is your weather forecast for Tuesday. Be sure to bring a sturdy umbrella this morning, as heavy thunderstorm showers are expected in the afternoon.",
    hint: "⚠️ Trap Alert: Distinguish morning weather conditions from afternoon weather changes.\n🔄 Paraphrase Key: 'parapluie' relates to 'averses'.\n🎧 Acoustic Cues: Recommendations given after 'pensez à vous équiper de...'."
  },
  {
    level: "A2",
    title: "Rappel de rendez-vous médical",
    text: "Bonjour, vous êtes bien sur le répondeur du cabinet dentaire. Nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    opt: ["Mardi à 10h00", "Mercredi à 14h00", "Lundi matin à 9h00", "Jeudi en fin d'après-midi"],
    ans: 0,
    tr: "Bonjour, nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    en: "Hello, we are reminding you that your annual dental check-up with Dr. Mercier is confirmed for this Tuesday at 10:00am.",
    hint: "⚠️ Trap Alert: Distinguish office name from appointment day/time.\n🔄 Paraphrase Key: 'confirmé pour ce mardi à 10h00'.\n🎧 Acoustic Cues: Pay attention to numbers and days of the week."
  },
  {
    level: "A2",
    title: "Annonce d'incident de transport en commun",
    text: "En raison d'une panne de signalisation entre les stations Berri-UQAM et Lionel-Groulx, le service de la ligne verte du métro est interrompu pour environ 30 minutes. Des bus navettes de remplacement sont déployés.",
    opt: ["Service interrompu pour 30 minutes", "Grève générale des conducteurs", "Augmentation du prix du billet", "Fermeture définitive de la station"],
    ans: 0,
    tr: "En raison d'une panne de signalisation, le service de la ligne verte du métro est interrompu pour environ 30 minutes.",
    en: "Due to a signaling breakdown, service on the green line is interrupted for approximately 30 minutes. Replacement shuttle buses are deployed.",
    hint: "⚠️ Trap Alert: Note the reason (signal breakdown) and delay duration (30 mins).\n🔄 Paraphrase Key: 'interrompu pour environ 30 minutes'.\n🎧 Acoustic Cues: Time duration follows 'interrompu pour'."
  },
  {
    level: "A2",
    title: "Message d'hôtel / Réservation",
    text: "Bonjour Monsieur Laval, nous vous confirmons votre réservation d'une chambre double pour trois nuits du 14 au 17 juillet. Le petit-déjeuner buffet est inclus de 7h à 10h au rez-de-chaussée.",
    opt: ["Trois nuits avec petit-déjeuner inclus", "Deux nuits sans repas", "Une semaine complète en pension complète", "Une nuit en chambre simple"],
    ans: 0,
    tr: "Bonjour Monsieur Laval, nous vous confirmons votre réservation d'une chambre double pour trois nuits du 14 au 17 juillet. Le petit-déjeuner buffet est inclus.",
    en: "Hello Mr. Laval, we confirm your reservation of a double room for three nights from July 14 to 17. Breakfast buffet is included.",
    hint: "⚠️ Trap Alert: Calculate total nights (July 14-17 = 3 nights).\n🔄 Paraphrase Key: 'pour trois nuits... petit-déjeuner inclus'.\n🎧 Acoustic Cues: Listen for 'trois nuits' and 'inclus'."
  },
  {
    level: "A2",
    title: "Message de centre sportif municipal",
    text: "Le centre aquatique municipal informe ses usagers que le grand bassin sera exceptionnellement fermé ce vendredi après-midi pour des travaux d'entretien sanitaire. Le petit bassin reste accessible aux familles.",
    opt: ["Fermeture du grand bassin ce vendredi après-midi", "Fermeture totale de toute la piscine", "Ouverture d'un nouveau sauna", "Cours de natation gratuits le samedi"],
    ans: 0,
    tr: "Le centre aquatique informe que le grand bassin sera exceptionnellement fermé ce vendredi après-midi pour travaux.",
    en: "The municipal aquatic center informs users that the main pool will be exceptionally closed this Friday afternoon for maintenance. The small pool remains open.",
    hint: "⚠️ Trap Alert: Only the main pool (grand bassin) is closed, not the whole facility.\n🔄 Paraphrase Key: 'le grand bassin sera fermé'.\n🎧 Acoustic Cues: Facility parts after 'fermé'."
  },
  {
    level: "A2",
    title: "Message vocal d'un mécanicien",
    text: "Bonjour Monsieur Roy, c'est le garage automobile. Votre voiture est prête. Les freins et la batterie ont été réparés. La facture totale s'élève à 240 dollars. Vous pouvez venir chercher votre véhicule avant 18h.",
    opt: ["Voiture prête pour 240 dollars", "Réparation impossible", "Nécessité de changer le moteur", "Retard de livraison de trois jours"],
    ans: 0,
    tr: "Bonjour, c'est le garage. Votre voiture est prête. La facture totale s'élève à 240 dollars. Vous pouvez venir la chercher avant 18h.",
    en: "Hello Mr. Roy, this is the auto garage. Your car is ready. Total bill is 240 dollars. You can pick it up before 6pm.",
    hint: "⚠️ Trap Alert: Note the status (ready) and exact price (240$).\n🔄 Paraphrase Key: 'votre voiture est prête... s'élève à 240 dollars'.\n🎧 Acoustic Cues: Price numbers follow 's'élève à'."
  },
  {
    level: "A2",
    title: "Annonce d'exposition culturelle",
    text: "Le musée des Beaux-Arts propose une visite guidée gratuite de l'exposition impressionniste ce samedi à 14h30. Les places étant limitées, veuillez réserver votre billet sur notre site internet.",
    opt: ["Visite guidée gratuite ce samedi à 14h30", "Exposition fermée au public", "Entrée payante à 50 dollars", "Concert de musique classique le soir"],
    ans: 0,
    tr: "Le musée propose une visite guidée gratuite de l'exposition impressionniste ce samedi à 14h30.",
    en: "The Museum of Fine Arts offers a free guided tour of the Impressionist exhibition this Saturday at 2:30pm. Reservation online required.",
    hint: "⚠️ Trap Alert: Guided tour is free ('gratuite') but online reservation is mandatory.\n🔄 Paraphrase Key: 'visite guidée gratuite ce samedi'.\n🎧 Acoustic Cues: Listen for 'gratuite' and time."
  },
  {
    level: "A2",
    title: "Message de bibliothèque universitaire",
    text: "Chers étudiants, nous vous rappelons que les livres empruntés le mois dernier doivent être retournés avant le 20 mai. Au-delà de cette date, des pénalités de retard seront appliquées.",
    opt: ["Retourner les livres avant le 20 mai", "Acheter de nouveaux manuels", "Fermeture de la bibliothèque pour travaux", "Inscriptions gratuites pour l'été"],
    ans: 0,
    tr: "Chers étudiants, nous vous rappelons que les livres empruntés doivent être retournés avant le 20 mai.",
    en: "Dear students, we remind you that books borrowed last month must be returned before May 20. Late penalties apply after.",
    hint: "⚠️ Trap Alert: Pay attention to return deadline date (20 mai).\n🔄 Paraphrase Key: 'doivent être retournés avant le 20 mai'.\n🎧 Acoustic Cues: Deadline date follows 'avant le'."
  },

  // B1 INTERMEDIATE (Q19 - Q26)
  {
    level: "B1",
    title: "Annonce d'organisation d'entreprise",
    text: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique initialement programmée ce jeudi matin est reportée à vendredi 15h00 dans la grande salle de conférence B au deuxième étage.",
    opt: ["Vendredi à 15h00 en salle B", "Jeudi matin en salle A", "Lundi matin au rez-de-chaussée", "Annulée définitivement"],
    ans: 0,
    tr: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique est reportée à vendredi 15h00 dans la grande salle B.",
    en: "Hello project team. Please note that the strategic meeting is postponed to Friday at 3:00pm in large conference room B.",
    hint: "⚠️ Trap Alert: The initial schedule is overridden by 'reportée à'.\n🔄 Paraphrase Key: 'reportée à vendredi 15h00' establishes the new schedule.\n🎧 Acoustic Cues: Watch for workplace change verbs like 'reporté'."
  },
  {
    level: "B1",
    title: "Consigne de sécurité incendie",
    text: "Attention, exercice de sécurité incendie dans le bâtiment. En cas d'alarme sonore, veuillez évacuer calmement les locaux en empruntant exclusivement les escaliers de secours et ne pas utiliser les ascenseurs.",
    opt: ["Utiliser les escaliers de secours", "Prendre les ascenseurs principaux", "Rester enfermé dans son bureau", "Ouvrir toutes les fenêtres"],
    ans: 0,
    tr: "Attention, exercice de sécurité incendie. En cas d'alarme, veuillez évacuer calmement en empruntant exclusivement les escaliers de secours.",
    en: "Attention, fire safety drill. In case of alarm, please evacuate calmly using exclusively emergency stairs and do not use elevators.",
    hint: "⚠️ Trap Alert: Listen for mandatory safety actions vs forbidden actions (elevators).\n🔄 Paraphrase Key: 'empruntant exclusivement' means using only that exit path.\n🎧 Acoustic Cues: Safety commands following 'en cas d'alarme'."
  },
  {
    level: "B1",
    title: "Message de syndic de copropriété",
    text: "Chers résidents, en raison de travaux de rénovation de la tuyauterie principale, l'eau chaude sanitaire sera coupée demain jeudi entre 8h00 et 16h00. Nous vous prions de nous excuser pour ce désagrément temporaire.",
    opt: ["Coupure d'eau chaude demain de 8h à 16h", "Panne d'électricité dans tout l'immeuble", "Nettoyage des tapis du hall principal", "Interdiction de garer les voitures au parking"],
    ans: 0,
    tr: "Chers résidents, l'eau chaude sanitaire sera coupée demain jeudi entre 8h00 et 16h00 en raison de travaux.",
    en: "Dear residents, due to pipe renovation work, hot water will be shut off tomorrow Thursday between 8:00am and 4:00pm.",
    hint: "⚠️ Trap Alert: Note what is cut off (hot water) vs electricity/parking.\n🔄 Paraphrase Key: 'l'eau chaude sera coupée'.\n🎧 Acoustic Cues: Interruption details after 'sera coupée'."
  },
  {
    level: "B1",
    title: "Interview sur le bénévolat communautaire",
    text: "Pour moi, donner deux heures par semaine à l'épicerie solidaire du quartier n'est pas seulement un acte généreux. Cela permet de briser l'isolement social des personnes âgées tout en luttant contre le gaspillage alimentaire.",
    opt: ["Lutter contre l'isolement et le gaspillage", "Gagner un salaire complémentaire", "Obtenir des réductions sur les courses", "Voyager gratuitement à l'étranger"],
    ans: 0,
    tr: "Donner deux heures par semaine permet de briser l'isolement social des personnes âgées tout en luttant contre le gaspillage.",
    en: "Volunteering two hours a week helps break social isolation for seniors while fighting food waste.",
    hint: "⚠️ Trap Alert: The speaker emphasizes social impact over financial gain.\n🔄 Paraphrase Key: 'briser l'isolement... lutter contre le gaspillage'.\n🎧 Acoustic Cues: Listen for benefits after 'cela permet de'."
  },
  {
    level: "B1",
    title: "Annonce de formation continue",
    text: "La chambre de commerce propose une formation de trois jours consacrée à la gestion des réseaux sociaux pour les petites entreprises. La session débutera le premier lundi du mois prochain. Tarif préférentiel pour les membres.",
    opt: ["Formation de 3 jours sur les réseaux sociaux", "Stage de comptabilité d'un an", "Cours d'anglais des affaires le soir", "Séminaire de vente immobilière"],
    ans: 0,
    tr: "La chambre de commerce propose une formation de trois jours consacrée à la gestion des réseaux sociaux.",
    en: "The chamber of commerce offers a 3-day training course on social media management for small businesses.",
    hint: "⚠️ Trap Alert: Course duration (3 days) vs subject (social media).\n🔄 Paraphrase Key: 'consacrée à la gestion des réseaux sociaux'.\n🎧 Acoustic Cues: Topic keywords after 'consacrée à'."
  },
  {
    level: "B1",
    title: "Extrait de radio associative locale",
    text: "Ce week-end, l'association 'Jardins Partagés' organise une grande bourse aux plantes et graines dans le parc municipal. L'objectif est d'encourager la biodiversité urbaine et d'échanger des conseils de jardinage écologique.",
    opt: ["Partager plantes, graines et conseils écologiques", "Vendre des outils de jardinage industriels", "Construire des serres privées", "Organiser un concours de cuisine régionale"],
    ans: 0,
    tr: "L'association organise une bourse aux plantes et graines pour encourager la biodiversité urbaine et échanger des conseils.",
    en: "The association is organizing a plant and seed swap to encourage urban biodiversity and share ecological gardening advice.",
    hint: "⚠️ Trap Alert: Exchange of plants/seeds vs commercial sales.\n🔄 Paraphrase Key: 'bourse aux plantes... échanger des conseils'.\n🎧 Acoustic Cues: Action verbs after 'l'objectif est de'."
  },
  {
    level: "B1",
    title: "Message de service des ressources humaines",
    text: "Chers collaborateurs, l'entreprise met en place un nouveau système de réservation de postes de travail en flex-office. Merci de valider vos présences hebdomadaires sur le logiciel interne avant chaque vendredi soir.",
    opt: ["Réserver son poste de travail avant vendredi soir", "Changer de bureau définitivement", "Demander une augmentation de salaire", "Prendre un congé payé obligatoire"],
    ans: 0,
    tr: "Chers collaborateurs, merci de valider vos présences hebdomadaires sur le logiciel interne avant chaque vendredi soir.",
    en: "Dear staff, please confirm your weekly presence on internal software before every Friday evening for flex-office booking.",
    hint: "⚠️ Trap Alert: Action required (booking before Friday evening).\n🔄 Paraphrase Key: 'valider vos présences... avant vendredi'.\n🎧 Acoustic Cues: Deadline instructions after 'merci de'."
  },
  {
    level: "B1",
    title: "Compte-rendu de réunion de quartier",
    text: "Lors de la réunion citoyenne d'hier, les résidents ont voté à la majorité en faveur de la création d'une piste cyclable sécurisée le long du boulevard principal pour encourager les déplacements à vélo.",
    opt: ["Création d'une piste cyclable sécurisée", "Fermeture totale de l'avenue principale", "Augmentation du prix du stationnement", "Installation de nouveaux feux de circulation"],
    ans: 0,
    tr: "Les résidents ont voté à la majorité en faveur de la création d'une piste cyclable sécurisée le long du boulevard.",
    en: "Residents voted by majority in favor of creating a protected bike lane along the main boulevard.",
    hint: "⚠️ Trap Alert: Note the approved project (bike lane) vs traffic light or parking distractor options.\n🔄 Paraphrase Key: 'vote en faveur d'une piste cyclable'.\n🎧 Acoustic Cues: Approved decision follows 'en faveur de'."
  },

  // B2 UPPER INTERMEDIATE - NCLC 7 TARGET (Q27 - Q34)
  {
    level: "B2",
    title: "Chronique environnementale radio",
    text: "Selon la nouvelle réglementation municipale entrée en vigueur ce mois-ci, la collecte sélective et le compostage obligatoire des déchets organiques permettent d'abaisser le volume global des ordures ménagères de 30 % dans les arrondissements pilotes.",
    opt: ["Réduire le volume des poubelles de 30%", "Augmenter la taxe d'enlèvement d'ordures", "Interdire la vente d'emballages en plastique", "Construire de nouvelles usines d'incinération"],
    ans: 0,
    tr: "La collecte sélective et le compostage obligatoire permettent d'abaisser le volume global des ordures de 30 %.",
    en: "Selective collection and mandatory composting reduce household waste volume by 30% in pilot boroughs.",
    hint: "⚠️ Trap Alert: Watch for percentage figures (30%) associated with waste reduction.\n🔄 Paraphrase Key: 'abaisser le volume' = 'réduire le volume'.\n🎧 Acoustic Cues: Policy statistics after 'permettent de'."
  },
  {
    level: "B2",
    title: "Reportage économique et marché du travail",
    text: "L'accélération du travail hybride au Québec a stimulé les ventes d'équipements informatiques et d'ergonomie de bureau, enregistrant une hausse nette de 25 % du chiffre d'affaires du secteur au cours du dernier trimestre.",
    opt: ["Une hausse de 25% des ventes d'équipements", "Une baisse drastique des salaires", "La fermeture massive des commerces physiques", "La fin du matériel informatique de bureau"],
    ans: 0,
    tr: "L'accélération du travail hybride a stimulé les ventes d'équipements, enregistrant une hausse nette de 25 % du chiffre d'affaires.",
    en: "The acceleration of hybrid work boosted equipment sales, recording a net 25% increase in revenue.",
    hint: "⚠️ Trap Alert: Connect financial trends ('hausse') with 25%.\n🔄 Paraphrase Key: 'stimulé les ventes... hausse nette'.\n🎧 Acoustic Cues: Economic terms following 'chiffre d'affaires'."
  },
  {
    level: "B2",
    title: "Analyse sur la numérisation des services publics",
    text: "Bien que la dématérialisation des démarches administratives simplifie la gestion pour la majorité des citoyens, plusieurs sociologues alertent sur le risque d'accentuer la fracture numérique auprès des populations vulnérables et des aînés.",
    opt: ["Risque d'accentuer la fracture numérique", "Suppression totale des impôts régionaux", "Obligation de posséder deux ordinateurs", "Fermeture définitive des préfectures"],
    ans: 0,
    tr: "Bien que la dématérialisation simplifie la gestion, les sociologues alertent sur le risque d'accentuer la fracture numérique.",
    en: "Although digitization simplifies management, sociologists warn of the risk of widening the digital divide for vulnerable groups.",
    hint: "⚠️ Trap Alert: Contrast marker 'bien que' introduces the benefit, while main clause states the risk.\n🔄 Paraphrase Key: 'accentuer la fracture numérique'.\n🎧 Acoustic Cues: Main concern follows 'alertent sur'."
  },
  {
    level: "B2",
    title: "Reportage sur la rénovation énergétique",
    text: "Les nouvelles subventions gouvernementales destinées à l'isolation thermique des bâtiments anciens visent à réduire de 40 % la consommation d'énergie d'ici 2030, tout en luttant contre la précarité énergétique hivernale.",
    opt: ["Réduire la consommation d'énergie de 40%", "Doubler le prix du gaz naturel", "Interdire le chauffage électrique", "Démolir les bâtiments anciens de la métropole"],
    ans: 0,
    tr: "Les subventions pour l'isolation visent à réduire de 40 % la consommation d'énergie d'ici 2030.",
    en: "New government subsidies for thermal insulation aim to cut energy consumption by 40% by 2030 while fighting winter fuel poverty.",
    hint: "⚠️ Trap Alert: Link target figure (40%) to energy reduction goal.\n🔄 Paraphrase Key: 'réduire de 40 % la consommation'.\n🎧 Acoustic Cues: Objective stated after 'visent à'."
  },
  {
    level: "B2",
    title: "Chronique santé et alimentation durable",
    text: "L'introduction de menus végétariens deux fois par semaine dans la restauration scolaire a permis de diminuer l'empreinte carbone des cantines de 18 %, tout en sensibilisant les enfants à la nutrition équilibrée et locale.",
    opt: ["Diminuer l'empreinte carbone de 18%", "Multiplier par trois le coût des repas", "Supprimer totalement les viandes et poissons", "Interdire la vente de produits laitiers"],
    ans: 0,
    tr: "L'introduction de menus végétariens a permis de diminuer l'empreinte carbone des cantines de 18 %.",
    en: "Introducing vegetarian menus twice a week in school canteens reduced their carbon footprint by 18% while promoting balanced nutrition.",
    hint: "⚠️ Trap Alert: Note frequency (twice a week) vs environmental result (-18% carbon footprint).\n🔄 Paraphrase Key: 'diminuer l'empreinte carbone de 18 %'.\n🎧 Acoustic Cues: Results follow 'a permis de'."
  },
  {
    level: "B2",
    title: "Interview sur le développement des transports collectifs",
    text: "L'extension du réseau de tramway en périphérie métropolitaine ne vise pas uniquement à désengorger le trafic automobile, mais répond également au besoin de désenclaver les quartiers résidentiels excentrés.",
    opt: ["Désengorger le trafic et désenclaver les quartiers", "Augmenter la vitesse autorisée sur autoroute", "Remplacer les bus par des taxis électriques", "Construire un deuxième aéroport régional"],
    ans: 0,
    tr: "L'extension du tramway vise à désengorger le trafic automobile et désenclaver les quartiers excentrés.",
    en: "Expanding the suburban tramway network aims not only to relieve traffic congestion but also to connect remote residential neighborhoods.",
    hint: "⚠️ Trap Alert: 'ne vise pas uniquement X mais également Y' implies dual benefits.\n🔄 Paraphrase Key: 'désengorger le trafic... désenclaver'.\n🎧 Acoustic Cues: Connective 'mais répond également'."
  },
  {
    level: "B2",
    title: "Débat sur la semaine de travail de 4 jours",
    text: "Les premières expérimentations de la semaine de quatre jours en entreprise révèlent une baisse du stress professionnel et un gain de productivité de 15 %, à condition d'optimiser l'organisation des réunions.",
    opt: ["Baisse du stress et gain de productivité de 15%", "Réduction des salaires de 20%", "Augmentation du temps de trajet quotidien", "Obligation de travailler les week-ends"],
    ans: 0,
    tr: "La semaine de 4 jours révèle une baisse du stress et un gain de productivité de 15 %.",
    en: "Initial 4-day workweek trials reveal reduced workplace stress and a 15% productivity gain, provided meetings are streamlined.",
    hint: "⚠️ Trap Alert: Salary remains constant despite day reduction.\n🔄 Paraphrase Key: 'gain de productivité de 15 %'.\n🎧 Acoustic Cues: Results following 'révèlent'."
  },
  {
    level: "B2",
    title: "Reportage sur l'économie circulaire",
    text: "La mise en place de filières locales de réemploi des matériaux de construction permet de détourner des décharges plus de 50 000 tonnes de débris chaque année, créant simultanément des emplois non délocalisables.",
    opt: ["Détourner 50 000 tonnes de déchets et créer des emplois", "Exporter les débris vers l'étranger", "Augmenter le prix du ciment neuf", "Interdire la rénovation des bâtiments historiques"],
    ans: 0,
    tr: "Le réemploi des matériaux permet de détourner des décharges plus de 50 000 tonnes de débris et créer des emplois.",
    en: "Establishing local construction material reuse networks diverts over 50,000 tons of debris from landfills yearly while creating local jobs.",
    hint: "⚠️ Trap Alert: Link tonnage figure (50,000 tons) to landfill diversion.\n🔄 Paraphrase Key: 'détourner des décharges... créer des emplois'.\n🎧 Acoustic Cues: Key metrics after 'permet de'."
  },

  // C1 ADVANCED (Q35 - Q37)
  {
    level: "C1",
    title: "Interview radio d'urbanisme métropolitain",
    text: "Dans cette perspective d'adaptation climatique, l'aménagement de micro-forêts urbaines et la végétalisation systématique des toitures contribuent de manière décisive à l'atténuation des îlots de chaleur au cœur des grandes métropoles.",
    opt: ["Combattre les îlots de chaleur urbains", "Accélérer la bétonisation des voies publiques", "Augmenter la vitesse de circulation automobile", "Remplacer les espaces verts par des parkings"],
    ans: 0,
    tr: "La végétalisation systématique des toitures contribue de manière décisive à l'atténuation des îlots de chaleur.",
    en: "Systematic rooftop greening contributes decisively to mitigating urban heat islands in major metropolitan centers.",
    hint: "⚠️ Trap Alert: Distinguish climate adaptation goals from negative development distractors.\n🔄 Paraphrase Key: 'atténuation des îlots de chaleur'.\n🎧 Acoustic Cues: Urban planning terms like 'végétalisation'."
  },
  {
    level: "C1",
    title: "Chronique scientifique sur l'intelligence artificielle",
    text: "L'intégration d'algorithmes d'apprentissage profond dans le diagnostic imagerie médicale permet de détecter précocement des anomalies invisibles à l'œil humain, tout en exigeant une rigueur éthique stricte quant à la souveraineté des données patients.",
    opt: ["Détecter précocement des anomalies avec rigueur éthique", "Remplacer intégralement les médecins spécialistes", "Rendre le diagnostic médical entièrement gratuit", "Interdire l'usage des ordinateurs en hôpital"],
    ans: 0,
    tr: "L'apprentissage profond en imagerie médicale permet de détecter précocement des anomalies tout en exigeant une rigueur éthique.",
    en: "Integrating deep learning algorithms in medical imaging enables early anomaly detection while demanding strict data privacy ethics.",
    hint: "⚠️ Trap Alert: AI assists early detection; it does NOT replace human doctors completely.\n🔄 Paraphrase Key: 'détecter précocement des anomalies... rigueur éthique'.\n🎧 Acoustic Cues: Scientific terms after 'permet de'."
  },
  {
    level: "C1",
    title: "Analyse sociologique de la mobilité durable",
    text: "L'analyse rétrospective des politiques d'intermodalité montre que la seule création d'infrastructures ne suffit pas ; une transformation pérenne des comportements exige une tarification incitative et un accompagnement pédagogique citoyen.",
    opt: ["Combiner infrastructures, tarification et accompagnement", "Mier exclusivement sur la construction d'autoroutes", "Supprimer les transports en commun urbains", "Interdire la marche à pied en centre-ville"],
    ans: 0,
    tr: "La transformation pérenne exige une tarification incitative et un accompagnement pédagogique citoyen en plus des infrastructures.",
    en: "Retrospective analysis shows infrastructure alone is insufficient; lasting behavioral change requires incentive pricing and citizen education.",
    hint: "⚠️ Trap Alert: Note that infrastructure ALONE is insufficient ('ne suffit pas').\n🔄 Paraphrase Key: 'transformation exige tarification et accompagnement'.\n🎧 Acoustic Cues: Nuanced argumentation following 'exige'."
  },
  {
    level: "C1",
    title: "Conférence sur la transition énergétique navale",
    text: "L'électrification partielle des flottes maritimes de cabotage combinée à l'usage de voiles rigides automatisées permet de réduire l'empreinte carbone du fret maritime de 28 % sur les lignes côtières nord-atlantiques.",
    opt: ["Réduire l'empreinte carbone du fret maritime de 28%", "Doubler le nombre de conteneurs transportés", "Interdire la circulation des bateaux de pêche", "Construire des ports en eaux profondes uniquement"],
    ans: 0,
    tr: "L'électrification partielle combinée aux voiles automatisées permet de réduire l'empreinte carbone de 28 %.",
    en: "Partial electrification combined with automated rigid sails cuts maritime freight carbon footprint by 28%.",
    hint: "⚠️ Trap Alert: Connect tech innovation to -28% emissions.\n🔄 Paraphrase Key: 'réduire l'empreinte carbone de 28%'.\n🎧 Acoustic Cues: Percentage stats after 'permet de'."
  },
  {
    level: "C1",
    title: "Débat sur la préservation de la biodiversité marine",
    text: "La création de réserves marines hauturières totalement fermées à l'extraction minière sous-marine constitue l'unique moyen d'assurer la survie des écosystèmes des fosses abyssales face à la pression industrielle émergente.",
    opt: ["Protéger les écosystèmes abyssaux de l'extraction minière", "Multiplier les autorisations de forage en haute mer", "Financer la pêche industrielle d'espèces menacées", "Fermer tous les laboratoires de biologie marine"],
    ans: 0,
    tr: "La création de réserves fermées à l'extraction minière est l'unique moyen de protéger les écosystèmes abyssaux.",
    en: "Creating marine reserves closed to deep-sea mining is the sole way to protect abyssal ecosystems.",
    hint: "⚠️ Trap Alert: Protection mandate vs industrial mining expansion.\n🔄 Paraphrase Key: 'protéger les écosystèmes abyssaux'.\n🎧 Acoustic Cues: Conservation terms after 'l'unique moyen'."
  },

  // C2 MASTERY (Q38 - Q40)
  {
    level: "C2",
    title: "Conférence de recherche scientifique quantique",
    text: "L'avènement de la cryptographie quantique intégrée aux protocoles de communication de nouvelle génération permet d'envisager une étanchéité théoriquement absolue des flux de données face aux risques de cyber-intrusion.",
    opt: ["Garantir une étanchéité théoriquement absolue des données", "Accélérer les composants électroniques mobiles", "Diminuer les investissements dans la recherche", "Remplacer les serveurs informatiques distants"],
    ans: 0,
    tr: "L'avènement de la cryptographie quantique permet d'envisager une étanchéité théoriquement absolue des flux de données.",
    en: "The advent of quantum cryptography allows for theoretically absolute data flow security against cyber intrusions.",
    hint: "⚠️ Trap Alert: Avoid mistaking technical cryptography hardware for server options.\n🔄 Paraphrase Key: 'étanchéité théoriquement absolue'.\n🎧 Acoustic Cues: High-level academic discourse."
  },
  {
    level: "C2",
    title: "Essai philosophique sur la gouvernance algorithmique",
    text: "La délégation croissante des décisions administratives à des systèmes décisionnels automatisés pose un défi ontologique à la démocratie, risquant de substituer l'arbitraire du code informatique à la délibération contradictoire des citoyens.",
    opt: ["Risque de substituer le code informatique au débat citoyen", "Garantie d'une égalité parfaite sans contestation possible", "Fin définitive de la bureaucratie administrative", "Obligation pour chaque citoyen de programmer du code"],
    ans: 0,
    tr: "La délégation aux systèmes automatisés risque de substituer l'arbitraire du code à la délibération contradictoire des citoyens.",
    en: "Delegating administrative decisions to automated systems poses an ontological challenge to democracy, risking replacing citizen debate with algorithmic code.",
    hint: "⚠️ Trap Alert: Focus on the core risk identified by the philosopher ('substituer l'arbitraire du code au débat').\n🔄 Paraphrase Key: 'substituer le code à la délibération'.\n🎧 Acoustic Cues: High-register philosophical concepts."
  },
  {
    level: "C2",
    title: "Sémiotique et analyse du discours médiatique",
    text: "L'analyse sémiotique de la surabondance d'informations révélée par la culture numérique montre une saturation cognitive où la vitesse de diffusion l'emporte sur l'exigence de vérification des faits, fragilisant l'espace public délibératif.",
    opt: ["La vitesse de diffusion supplante la vérification des faits", "L'amélioration spectaculaire de la mémoire humaine", "La disparition complète des réseaux de télévision", "L'obligation légale de lire uniquement des livres imprimés"],
    ans: 0,
    tr: "L'analyse sémiotique montre que la vitesse de diffusion l'emporte sur la vérification des faits.",
    en: "Semiotic analysis shows diffusion speed outweighs fact-checking, fragileing deliberative public space.",
    hint: "⚠️ Trap Alert: Speed vs factual verification tension.\n🔄 Paraphrase Key: 'vitesse de diffusion l'emporte sur la vérification'.\n🎧 Acoustic Cues: Epistemological critique."
  },
  {
    level: "C2",
    title: "Économie politique des communs mondiaux",
    text: "La théorie de la gouvernance polycentrique appliquée aux biens communs mondiaux démontre que la seule réglementation étatique ou l'abandon aux lois du marché s'avèrent incapables d'enrayer l'épuisement des ressources naturelles partagées.",
    opt: ["Réglementation étatique et marché seuls sont incapables d'éviter l'épuisement", "La privatisation totale garantit la protection éternelle", "L'interdiction absolue de tout échange commercial", "La suppression de tous les gouvernements nationaux"],
    ans: 0,
    tr: "La gouvernance polycentrique démontre que ni l'État seul ni le marché ne suffisent à protéger les communs.",
    en: "Polycentric governance demonstrates neither state regulation alone nor market forces suffice to protect global commons.",
    hint: "⚠️ Trap Alert: Failure of state-only or market-only approaches.\n🔄 Paraphrase Key: 'incapables d'enrayer l'épuisement'.\n🎧 Acoustic Cues: Institutional economics terminology."
  }
];

const READING_TOPICS = [
  // A1 DISCOVERY (Q1 - Q10)
  {
    level: "A1",
    text: "Horaires de la boulangerie 'La Parisis' : Ouvert du mardi au dimanche de 7h00 à 19h00 sans interruption. Fermeture hebdomadaire le lundi.",
    q: "Quand la boulangerie est-elle fermée ?",
    opt: ["Le lundi", "Le dimanche", "Le mardi", "Tous les après-midis"],
    ans: 0,
    passEn: "Opening hours for 'La Parisis' Bakery: Open Tuesday to Sunday from 7:00 AM to 7:00 PM non-stop. Weekly closure on Mondays.",
    hint: "⚠️ Trap Alert: Do not confuse daily operating hours (Tuesday-Sunday) with the weekly closure day.\n🔄 Paraphrase Key: 'Fermeture hebdomadaire le lundi' directly specifies the closed day.\n📖 Structural Cue: Look for exact day names following 'Fermeture'."
  },
  {
    level: "A1",
    text: "Avis de passage de la Poste canadienne : Votre colis recommandé est disponible au bureau central à partir de demain 14h. Veuillez vous munir d'une pièce d'identité.",
    q: "Où et quand récupérer votre colis ?",
    opt: ["Au bureau central dès demain 14h", "À la maison aujourd'hui", "À la mairie la semaine prochaine", "Chez le voisin ce soir"],
    ans: 0,
    passEn: "Canada Post Delivery Notice: Your registered package is available at the central office starting tomorrow at 2:00 PM. Please bring a valid photo ID.",
    hint: "⚠️ Trap Alert: Distinguish the pick-up location (bureau central) from home delivery.\n🔄 Paraphrase Key: 'disponible à partir de demain 14h' defines the availability time.\n📖 Structural Cue: Focus on location prepositions after 'au'."
  },
  {
    level: "A1",
    text: "Annonce de la bibliothèque municipale : Les ateliers de lecture pour enfants ont lieu chaque samedi matin de 10h00 à 11h30. Entrée libre et gratuite.",
    q: "À quel moment ont lieu les ateliers de lecture ?",
    opt: ["Le samedi matin de 10h00 à 11h30", "Le vendredi soir", "Le dimanche après-midi", "Tous les jours à midi"],
    ans: 0,
    passEn: "Municipal Library Announcement: Children's reading workshops take place every Saturday morning from 10:00 AM to 11:30 AM. Free admission for all.",
    hint: "⚠️ Trap Alert: Watch for specific day/time combinations.\n🔄 Paraphrase Key: 'chaque samedi matin de 10h00 à 11h30'.\n📖 Structural Cue: Identify day markers after 'ont lieu'."
  },
  {
    level: "A1",
    text: "Message de la clinique médicale : Le cabinet du docteur Roy sera exceptionnellement fermé du 15 au 20 août pour congés annuels.",
    q: "Pourquoi le cabinet médical est-il fermé ?",
    opt: ["Pour congés annuels du docteur", "Pour rénovation complète", "En raison d'un problème technique", "Pour déménagement"],
    ans: 0,
    passEn: "Medical Clinic Message: Dr. Roy's office will be exceptionally closed from August 15th to August 20th for annual vacation.",
    hint: "⚠️ Trap Alert: Pay attention to the reason given after 'pour'.\n🔄 Paraphrase Key: 'congés annuels' means annual vacation leave.\n📖 Structural Cue: Look for cause prepositions like 'pour'."
  },
  {
    level: "A1",
    text: "Pharmacie du Centre — Service de garde : En dehors des heures d'ouverture normales, adressez-vous à la pharmacie Saint-Jean située au 12 rue de la Paix.",
    q: "Où se rendre en dehors des heures d'ouverture ?",
    opt: ["À la pharmacie Saint-Jean rue de la Paix", "À l'hôpital général de nuit", "Chez le médecin de famille", "À la mairie du quartier"],
    ans: 0,
    passEn: "Center Pharmacy — Emergency On-Call Service: Outside of normal operating hours, please visit Saint-Jean Pharmacy located at 12 rue de la Paix.",
    hint: "⚠️ Trap Alert: Distinguish the primary pharmacy from the after-hours referral pharmacy.\n🔄 Paraphrase Key: 'adressez-vous à...' points to the emergency destination.\n📖 Structural Cue: Note address details following location directives."
  },
  {
    level: "A1",
    text: "Musée des Beaux-Arts de Montréal : Tarif réduit pour tous les étudiants et les jeunes de moins de 25 ans sur présentation de leur carte.",
    q: "Qui peut obtenir un tarif réduit au musée ?",
    opt: ["Les étudiants et jeunes de moins de 25 ans", "Seulement les enfants de moins de 5 ans", "Uniquement les professeurs d'université", "Tous les groupes de touristes"],
    ans: 0,
    passEn: "Montreal Museum of Fine Arts: Reduced rate for all students and young people under 25 upon presentation of their card.",
    hint: "⚠️ Trap Alert: Identify the eligible age/status criteria mentioned in the notice.\n🔄 Paraphrase Key: 'étudiants et jeunes de moins de 25 ans'.\n📖 Structural Cue: Look for qualification criteria after 'pour'."
  },
  {
    level: "A1",
    text: "Supermarché Métro — Promotion de la semaine : Pour deux paquets de café achetés, le troisième est offert. Offre valable jusqu'à ce dimanche soir.",
    q: "Quelle est la condition de la promotion sur le café ?",
    opt: ["Troisième paquet offert pour deux achetés", "Café gratuit sans achat", "Réduction de 80% sur les fruits", "Livraison à domicile gratuite"],
    ans: 0,
    passEn: "Metro Supermarket — Weekly Special: Buy two packs of coffee, get the third free. Offer valid through this Sunday evening.",
    hint: "⚠️ Trap Alert: Note the quantity ratio (buy 2 get 1 free).\n🔄 Paraphrase Key: 'le troisième est offert pour deux achetés'.\n📖 Structural Cue: Look for promotional terms after 'pour'."
  },
  {
    level: "A1",
    text: "Centre aquatique municipal : Les cours d'aquagym pour adultes ont lieu tous les mardis et jeudis de 18h30 à 19h30. Bonnet de bain obligatoire.",
    q: "Quel équipement est obligatoire pour les cours d'aquagym ?",
    opt: ["Un bonnet de bain", "Des lunettes de plongée", "Des palmes professionnelles", "Un peignoir de bain"],
    ans: 0,
    passEn: "Municipal Aquatic Center: Adult aquagym classes take place every Tuesday and Thursday from 6:30 PM to 7:30 PM. Swim cap required.",
    hint: "⚠️ Trap Alert: Identify mandatory gear requirement ('bonnet de bain').\n🔄 Paraphrase Key: 'bonnet de bain obligatoire'.\n📖 Structural Cue: Look for obligation adjectives."
  },
  {
    level: "A1",
    text: "Pizzeria Napolitaine : Livraison gratuite à domicile à partir de 25$ d'achat. Commande par téléphone ou directement sur notre site web.",
    q: "À partir de quel montant la livraison est-elle gratuite ?",
    opt: ["À partir de 25 dollars d'achat", "À partir de 50 dollars", "Pour toutes les commandes sans minimum", "Uniquement les week-ends"],
    ans: 0,
    passEn: "Neapolitan Pizzeria: Free home delivery on orders over $25. Order by phone or directly on our website.",
    hint: "⚠️ Trap Alert: Identify the minimum spending amount ($25).\n🔄 Paraphrase Key: 'à partir de 25$ d'achat'.\n📖 Structural Cue: Amount figures following 'à partir de'."
  },
  {
    level: "A1",
    text: "Gare routière régionale : Le guichet de vente des billets d'autobus est ouvert du lundi au vendredi de 6h00 à 20h00. Les week-ends, utilisez l'automate.",
    q: "Comment acheter un billet le samedi ou le dimanche ?",
    opt: ["En utilisant l'automate de vente", "Au guichet principal", "Auprès du chauffeur de bus", "Par courrier postal"],
    ans: 0,
    passEn: "Regional Bus Station: Ticket window is open Monday to Friday 6:00 AM to 8:00 PM. On weekends, use the ticket machine.",
    hint: "⚠️ Trap Alert: Weekday ticket window vs weekend automated kiosk.\n🔄 Paraphrase Key: 'Les week-ends, utilisez l'automate'.\n📖 Structural Cue: Weekend instructions following 'week-ends'."
  },

  // A2 BREAKTHROUGH (Q11 - Q18)
  {
    level: "A2",
    text: "Règlement municipal de la piscine municipale : Les enfants âgés de moins de 12 ans doivent obligatoirement être accompagnés d'un adulte majeur dans l'enceinte des bassins.",
    q: "Quelle condition est exigée pour les enfants de moins de 12 ans ?",
    opt: ["Être accompagné par un adulte majeur", "Avoir un certificat médical", "Venir uniquement le matin", "Payer un tarif spécial"],
    ans: 0,
    passEn: "Municipal Swimming Pool Regulations: Children under 12 years of age must strictly be accompanied by an adult inside the pool enclosure.",
    hint: "⚠️ Trap Alert: Listen for mandatory requirements ('doivent obligatoirement').\n🔄 Paraphrase Key: 'accompagnés d'un adulte majeur'.\n📖 Structural Cue: Focus on obligation modal verbs like 'doivent'."
  },
  {
    level: "A2",
    text: "Offre d'emploi spécialisée : Restaurant gastronomique du Vieux-Montréal recherche un serveur bilingue français-anglais avec 2 ans d'expérience au service en salle.",
    q: "Quel profil correspond exactement à cette offre ?",
    opt: ["Un serveur bilingue expérimenté", "Un cuisinier italien débutant", "Un comptable à mi-temps", "Un gérant de magasin"],
    ans: 0,
    passEn: "Specialized Job Offer: Fine dining restaurant in Old Montreal is seeking a bilingual French-English server with 2 years of table service experience.",
    hint: "⚠️ Trap Alert: Match both language fluency (bilingue) and experience.\n🔄 Paraphrase Key: '2 ans d'expérience' = experienced server.\n📖 Structural Cue: Job title keywords preceding experience requirements."
  },
  {
    level: "A2",
    text: "Note d'information aux résidents : Des travaux de réfection de la chaussée auront lieu dans la rue Sherbrooke le mercredi 12 octobre. Le stationnement sera interdit de 7h à 18h.",
    q: "Quelle interdiction concerne les résidents le mercredi 12 octobre ?",
    opt: ["L'interdiction de stationner dans la rue de 7h à 18h", "L'interdiction de sortir de chez soi", "L'interdiction de prendre le bus", "L'interdiction d'utiliser l'eau courante"],
    ans: 0,
    passEn: "Information Notice to Residents: Road resurfacing work will take place on Sherbrooke Street on Wednesday, October 12. Parking will be prohibited from 7:00 AM to 6:00 PM.",
    hint: "⚠️ Trap Alert: Note the prohibited action ('stationnement interdit').\n🔄 Paraphrase Key: 'stationnement interdit' = parking prohibition.\n📖 Structural Cue: Time restrictions given."
  },
  {
    level: "A2",
    text: "Annonce du centre communautaire : Inscriptions aux cours de langue italienne et espagnole ouvertes pour la session d'automne. Tarif réduit pour les étudiants et retraités.",
    q: "Qui peut bénéficier d'un tarif réduit ?",
    opt: ["Les étudiants et les retraités", "Seulement les enfants de moins de 5 ans", "Uniquement les professeurs", "Tous les touristes de passage"],
    ans: 0,
    passEn: "Community Center Announcement: Registration for Italian and Spanish language classes is now open for fall. Reduced rate for students and retirees.",
    hint: "⚠️ Trap Alert: Distinguish eligible discount groups.\n🔄 Paraphrase Key: 'étudiants et retraités'.\n📖 Structural Cue: Look for recipient nouns following 'pour'."
  },
  {
    level: "A2",
    text: "Avis de coupure d'eau potable : En raison de travaux de maintenance sur le réseau aqueduc, l'alimentation en eau sera interrompue ce jeudi de 22h00 à 05h00 du matin.",
    q: "À quel moment l'eau sera-t-elle coupée ?",
    opt: ["Ce jeudi durant la nuit de 22h à 05h", "Vendredi toute la journée", "Samedi après-midi", "Lundi matin à partir de 8h"],
    ans: 0,
    passEn: "Drinking Water Notice: Due to aqueduct maintenance, water supply will be cut off this Thursday from 10:00 PM to 5:00 AM.",
    hint: "⚠️ Trap Alert: Overnight time window (22h00 à 05h00).\n🔄 Paraphrase Key: 'interrompue ce jeudi de 22h00 à 05h00'.\n📖 Structural Cue: Time range prepositions 'de... à'."
  },
  {
    level: "A2",
    text: "Annonce d'agence immobilière : Appartement 3 pièces à louer en centre-ville, rénové, lumineux, proche métro. Loyer 1100$/mois, chauffage et eau chaude inclus.",
    q: "Quelles charges sont incluses dans le loyer de 1100$ ?",
    opt: ["Le chauffage et l'eau chaude", "L'électricité et l'internet haut débit", "Le garage sous-sol sécurisé", "La taxe d'habitation municipale"],
    ans: 0,
    passEn: "Real Estate Announcement: Renovated 3-room apartment for rent downtown, bright, near metro. Rent $1100/month, heating and hot water included.",
    hint: "⚠️ Trap Alert: Identify explicitly included utilities (chauffage, eau chaude).\n🔄 Paraphrase Key: 'chauffage et eau chaude inclus'.\n📖 Structural Cue: Included items follow 'inclus'."
  },
  {
    level: "A2",
    text: "Compagnie d'assurance auto : Pensez à renouveler votre contrat d'assurance véhicule avant la date d'échéance du 30 juin pour éviter toute interruption de couverture.",
    q: "Quelle est la date limite pour renouveler le contrat d'assurance ?",
    opt: ["Le 30 juin", "Le 1er janvier", "Le 15 août", "Le 31 décembre"],
    ans: 0,
    passEn: "Auto Insurance Company: Remember to renew your vehicle insurance policy before the June 30 expiration date to avoid coverage gaps.",
    hint: "⚠️ Trap Alert: Deadline date is June 30th.\n🔄 Paraphrase Key: 'date d'échéance du 30 juin'.\n📖 Structural Cue: Date follows 'échéance'."
  },
  {
    level: "A2",
    text: "Service de transport par ferroutage : Les voyageurs à mobilité réduite sont invités à contacter le service d'assistance 48 heures avant leur départ pour réserver un accompagnement.",
    q: "Quel délai est demandé aux voyageurs à mobilité réduite ?",
    opt: ["Contacter le service 48 heures avant le départ", "Reserver deux semaines à l'avance", "Arriver 10 minutes avant l'embarquement", "Demander de l'aide une fois à bord"],
    ans: 0,
    passEn: "Rail Transport Service: Passengers with reduced mobility are invited to contact the assistance service 48 hours prior to departure to book support.",
    hint: "⚠️ Trap Alert: Time delay requirement (48h before departure).\n🔄 Paraphrase Key: '48 heures avant leur départ'.\n📖 Structural Cue: Time window after 'contacter'."
  },

  // B1 THRESHOLD (Q19 - Q26)
  {
    level: "B1",
    text: `ÉCONOMIE ET NUTRITION — LE POUVOIR D'ACHAT ET LA SANTÉ AU QUÉBEC\n\nUn rapport récent de l'Institut National de Santé Publique du Québec souligne l'importance des choix alimentaires quotidiens sur la santé cardiaque. Selon les chercheurs, réduire sa consommation de sel de seulement 3 grammes par jour diminuerait de 15 % les risques d'hypertension artérielle à l'échelle nationale.\n\nCette recommandation s'inscrit dans une campagne globale d'éducation à la nutrition. Les professionnels du secteur médical encouragent les consommateurs à privilégier les aliments frais préparés à la maison plutôt que les plats industriels transformés, souvent riches en sodium et en conservateurs artificiels.\n\nEn outre, les autorités canadiennes envisagent d'imposer un étiquetage nutritionnel plus clair sur la face avant des emballages afin d'aider les familles à identifier rapidement les produits à forte teneur en sel et en sucres ajoutés.`,
    q: "Selon l'étude, quel est l'impact direct d'une diminution quotidienne de 3 grammes de sel ?",
    opt: ["Une baisse de 15% des risques d'hypertension artérielle", "Une hausse de 20% du pouvoir d'achat des ménages", "La fermeture immédiate des usines agroalimentaires", "Une réduction automatique de la consommation de sucre"],
    ans: 0,
    passEn: `ECONOMY AND NUTRITION — PURCHASING POWER AND HEALTH IN QUEBEC\n\nA recent report from the National Institute of Public Health of Quebec emphasizes the importance of daily food choices on heart health. According to researchers, reducing daily salt intake by just 3 grams per day would lower the risk of high blood pressure by 15% nationwide.\n\nThis recommendation is part of a comprehensive nutrition education campaign. Medical professionals encourage consumers to favor fresh home-cooked meals over processed industrial foods, which are often high in sodium and artificial preservatives.\n\nFurthermore, Canadian authorities are considering mandating clearer front-of-package nutritional labeling to help families quickly identify products with high salt and added sugar content.`,
    hint: "⚠️ Trap Alert: Link 3g salt reduction directly to hypertension risk statistics.\n🔄 Paraphrase Key: 'diminuerait de 15% les risques' = 'Une baisse de 15% des risques'.\n📖 Structural Cue: Causal percentage figure in paragraph 1."
  },
  {
    level: "B1",
    text: `TRANSPORT URBAIN ET MOBILITÉ DURABLE — ROULEZ VERT À MONTRÉAL\n\nLa Société de Transport de Montréal (STM) a annoncé une restructuration majeure de son réseau routier nocturne. Afin de poursuivre les travaux d'électrification des infrastructures, les lignes de tramway et de métro léger seront remplacées par des bus électriques articulés dès 22h00 les soirs de semaine.\n\nCette transition permettra non seulement d'accélérer la rénovation des voies ferroviaires, mais garantira également un niveau de bruit réduit pour les résidents des quartiers centraux. Les usagers sont invités à consulter la nouvelle application mobile pour suivre la position des bus en temps réel.\n\nMalgré quelques réticences initiales liées aux légers retards de correspondance, la majorité des voyageurs salue cette initiative moderne qui s'inscrit pleinement dans le plan climat de la métropole.`,
    q: "Quelle mesure la Société de Transport prend-elle les soirs de semaine dès 22h00 ?",
    opt: ["Le remplacement des lignes ferroviaires par des bus électriques", "La gratuité totale de l'ensemble du réseau de métro", "L'arrêt complet de tous les transports collectifs", "L'interdiction de circuler pour les piétons"],
    ans: 0,
    passEn: `URBAN TRANSIT AND SUSTAINABLE MOBILITY — RIDE GREEN IN MONTREAL\n\nThe Montreal Transit Corporation (STM) has announced a major restructuring of its night road network. In order to continue infrastructure electrification work, tramway and light rail lines will be replaced by articulated electric buses starting at 10:00 PM on weeknights.\n\nThis transition will not only accelerate railway track renovation, but will also guarantee reduced noise levels for central neighborhood residents. Riders are invited to check the new mobile application to track bus locations in real time.\n\nDespite some initial hesitation regarding minor transfer delays, the majority of travelers welcome this modern initiative, which aligns fully with the metropolis's climate plan.`,
    hint: "⚠️ Trap Alert: Note shift to electric buses at 22h00, not a total shutdown.\n🔄 Paraphrase Key: 'remplacées par des bus électriques'.\n📖 Structural Cue: Action verbs following 'dès 22h00'."
  },
  {
    level: "B1",
    text: `ÉDUCATION ET TECHNOLOGIE — LES MANUELS NUMÉRIQUES DANS LES ÉCOLES\n\nL'introduction généralisée des tablettes numériques dans les établissements secondaires du Nouveau-Brunswick suscite des débats passionnés parmi les enseignants et les parents d'élèves. Selon une enquête menée auprès de 500 éducateurs, 68 % constatent une augmentation significative de l'engagement des étudiants lors des activités de recherche documentaire.\n\nCependant, plusieurs spécialistes en pédiatrie mettent en garde contre l'augmentation du temps d'écran quotidien et soulignent l'importance de maintenir un équilibre avec l'apprentissage sur support papier traditionnel. Les écoles mettent donc en place des chartes d'utilisation responsable pour encadrer cet usage en classe.`,
    q: "Que constate la majorité des enseignants enquêtés concernant les tablettes ?",
    opt: ["Une hausse de l'engagement des élèves dans la recherche documentaire", "Une baisse drastique des résultats scolaires généraux", "L'abandon complet de tous les cours de lecture", "Le refus des parents d'acheter des fournitures"],
    ans: 0,
    passEn: `EDUCATION AND TECHNOLOGY — DIGITAL TEXTBOOKS IN SCHOOLS\n\nThe widespread introduction of digital tablets in New Brunswick secondary schools is sparking passionate debates among teachers and parents. According to a survey of 500 educators, 68% report a significant increase in student engagement during documentary research activities.\n\nHowever, several pediatric specialists warn against increased daily screen time and emphasize the importance of maintaining a balance with traditional paper-based learning. Schools are therefore implementing responsible use charters to regulate classroom tablet usage.`,
    hint: "⚠️ Trap Alert: Focus on positive survey statistic (68%).\n🔄 Paraphrase Key: 'augmentation significative de l'engagement' = 'hausse de l'engagement'.\n📖 Structural Cue: Locate '68%' in paragraph 1."
  },
  {
    level: "B1",
    text: `ENVIRONNEMENT ET GESTION DES DÉCHETS — LE COMPOSTAGE OBLIGATOIRE\n\nDans le cadre de son plan de réduction de l'empreinte carbone, la Ville de Québec a rendu obligatoire le bac brun pour la collecte des résidus alimentaires ménagers. Cette mesure vise à détourner 40 000 tonnes de matière organique des sites d'enfouissement chaque année.\n\nLe compost produit sera redistribué gratuitement aux agriculteurs régionaux et aux jardins communautaires urbains. Cette démarche écologique contribue à enrichir les sols sans recourir aux engrais chimiques industriels.`,
    q: "Quel est l'objectif principal de la collecte obligatoire du bac brun ?",
    opt: ["Détourner la matière organique des sites d'enfouissement", "Vendre le compost aux entreprises étrangères", "Interdire les jardins communautaires urbains", "Augmenter la taxe de collecte des ordures"],
    ans: 0,
    passEn: `ENVIRONMENT AND WASTE MANAGEMENT — MANDATORY COMPOSTING\n\nAs part of its carbon footprint reduction plan, the City of Quebec has mandated the brown bin for household food waste collection. This measure aims to divert 40,000 tons of organic material from landfills every year.\n\nThe resulting compost will be distributed free of charge to regional farmers and urban community gardens. This eco-friendly approach helps enrich the soil without relying on industrial chemical fertilizers.`,
    hint: "⚠️ Trap Alert: Environmental goal (diverting organic waste).\n🔄 Paraphrase Key: 'détourner 40 000 tonnes de matière organique'.\n📖 Structural Cue: Purpose expressions after 'vise à'."
  },
  {
    level: "B1",
    text: `SANTÉ PUBLIQUE ET ACTIVITÉ PHYSIQUE EN ENTREPRISE\n\nDe nombreuses entreprises québécoises intègrent désormais des pauses actives de 15 minutes et des aménagements d'ergonomie de bureau dans leur quotidien. Selon une étude de l'Université de Montréal, encourager l'activité physique modérée durant la journée de travail réduit les arrêts maladie liés aux troubles musculosquelettiques de 22 %.\n\nDe surcroît, les salariés participant à ces programmes témoignent d'un sentiment d'appartenance renforcé et d'une meilleure gestion du stress quotidien.`,
    q: "Quel est l'effet mesuré des pauses actives de 15 minutes en entreprise ?",
    opt: ["Une baisse de 22% des arrêts maladie musculosquelettiques", "L'obligation d'effectuer des heures supplémentaires payées", "La suppression de la pause déjeuner", "Une augmentation des accidents du travail"],
    ans: 0,
    passEn: `PUBLIC HEALTH AND PHYSICAL ACTIVITY AT WORK\n\nMany Quebec companies are now incorporating 15-minute active breaks and office ergonomic arrangements into daily routines. According to a study by the University of Montreal, encouraging moderate physical activity reduces musculoskeletal sick leave by 22%.\n\nFurthermore, employees participating in these programs report a stronger sense of belonging and improved daily stress management.`,
    hint: "⚠️ Trap Alert: Link 15-minute breaks to -22% sick leave reduction.\n🔄 Paraphrase Key: 'réduit les arrêts maladie de 22%'.\n📖 Structural Cue: Percentage statistic in paragraph 1."
  },
  {
    level: "B1",
    text: `CULTURE ET PATRIMOINE — LA VALORISATION DES LANGUES AUTOCHTONES\n\nUn nouveau programme national soutient la numérisation et la conservation des récits oraux traduits dans plusieurs langues autochtones au Canada. En créant des archives sonores accessibles en ligne, les communautés cherchent à transmettre ce patrimoine linguistique précieux aux jeunes générations.\n\nCette initiative favorise également la création de manuels scolaires bilingues et le développement d'applications mobiles d'apprentissage de la langue.`,
    q: "Quel est le but central du projet d'archives sonores en ligne ?",
    opt: ["Transmettre le patrimoine linguistique aux jeunes générations", "Vendre des disques audio aux touristes", "Remplacer l'enseignement du français à l'école", "Fermer les musées d'histoire régionale"],
    ans: 0,
    passEn: `CULTURE AND HERITAGE — PROMOTING INDIGENOUS LANGUAGES\n\nA new national program supports the digitization and preservation of oral narratives translated into several Indigenous languages in Canada. By creating online accessible audio archives, communities seek to pass this language heritage to younger generations.\n\nThis initiative also supports creating bilingual textbooks and language learning mobile apps.`,
    hint: "⚠️ Trap Alert: Heritage transmission to youth, not commercial sales.\n🔄 Paraphrase Key: 'transmettre ce patrimoine linguistique'.\n📖 Structural Cue: Purpose statement after 'cherche à'."
  },
  {
    level: "B1",
    text: `AGRICULTURE BIOLOGIQUE ET CIRCUITS COURTS AU QUÉBEC\n\nL'engouement des consommateurs pour les paniers de légumes biologiques livrés directement par les producteurs locaux a connu une progression de 30 % cette année. Cette formule d'agriculture soutenue par la communauté garantit un revenu stable aux maraîchers tout en réduisant le transport des marchandises.\n\nLes abonnés bénéficient de produits de saison fraîchement récoltés sans intermédiaires commerciaux.`,
    q: "Quel avantage la formule des paniers bios offre-t-elle aux producteurs locaux ?",
    opt: ["Garantir un revenu stable en éliminant les intermédiaires", "Doubler la taille de leurs fermes gratuitement", "Exporter leur récolte vers l'Europe", "Interdire la vente sur les marchés publics"],
    ans: 0,
    passEn: `ORGANIC AGRICULTURE AND SHORT SUPPLY CHAINS IN QUEBEC\n\nConsumer enthusiasm for organic vegetable baskets delivered directly by local farmers grew by 30% this year. This community-supported agriculture model guarantees stable revenue for farmers while reducing freight transport.\n\nSubscribers enjoy freshly harvested seasonal produce without commercial middlemen.`,
    hint: "⚠️ Trap Alert: Producer benefit (stable income without middlemen).\n🔄 Paraphrase Key: 'garantit un revenu stable... sans intermédiaires'.\n📖 Structural Cue: Farmer benefits in paragraph 1."
  },
  {
    level: "B1",
    text: `TOURISME DURABLE ET PROTECTION DES PARCS NATIONAUX\n\nAfin de protéger la faune sauvage et préserver les sentiers de randonnée de l'érosion, la direction des Parcs Canada instaure un système de réservation préalable en ligne pour les visiteurs durant la haute saison estivale.\n\nCette régulation des flux touristiques permet d'éviter la surfréquentation des sites fragiles tout en maintenant une expérience immersive de qualité pour les usagers.`,
    q: "Pourquoi Parcs Canada impose-t-il une réservation préalable en ligne ?",
    opt: ["Éviter la surfréquentation et protéger la faune et les sentiers", "Multiplier par dix le prix d'entrée des parcs", "Fermer tous les sentiers aux randonneurs", "Autoriser les véhicules à moteur dans les réserves"],
    ans: 0,
    passEn: `SUSTAINABLE TOURISM AND NATIONAL PARK PROTECTION\n\nTo protect wildlife and preserve hiking trails from erosion, Parks Canada management is introducing a mandatory online advance reservation system for visitors during peak summer season.\n\nThis tourist flow regulation avoids overcrowding fragile sites while maintaining a high-quality immersive experience.`,
    hint: "⚠️ Trap Alert: Conservation goal (avoiding overcrowding, protecting nature).\n🔄 Paraphrase Key: 'protéger la faune... éviter la surfréquentation'.\n📖 Structural Cue: Purpose after 'Afin de'."
  },

  // B2 VANTAGE TARGET (Q27 - Q34)
  {
    level: "B2",
    text: `URBANISME ÉCOLOGIQUE ET ÎLOTS DE CHALEUR MÉTROPOLITAINS\n\nDans la plupart des grandes agglomérations nord-américaines, la multiplication des îlots de chaleur constitue désormais un enjeu sanitaire et environnemental préoccupant. L'accumulation d'asphalte et de béton accentue l'absorption thermique, entraînant des températures estivales étouffantes au cœur des cités.\n\nPour contrer ce phénomène, les urbanistes préconisent la mise en place de péages urbains incitatifs couplée à un vaste programme de végétalisation des toitures d'immeubles. Les premiers résultats observés dans les quartiers pilotes démontrent une réduction de 20 % de la circulation automobile, corrélée à une baisse mesurable de la pollution atmosphérique.\n\nCependant, les commerçants du centre-ville expriment des inquiétudes quant à la baisse potentielle du chalandage. Les municipalités s'engagent donc à compenser ces effets en renforçant la fréquence des transports en commun.`,
    q: "Selon l'article, quel est l'effet combiné de la végétalisation et des péages incitatifs ?",
    opt: ["Une baisse de 20% du trafic automobile et une réduction de la pollution", "La disparition complète des commerces de proximité", "Une hausse de la température estivale au centre-ville", "L'obligation d'utiliser uniquement des véhicules électriques"],
    ans: 0,
    passEn: `ECOLOGICAL URBANISM AND METROPOLITAN HEAT ISLANDS\n\nIn most major North American urban areas, the proliferation of heat islands has become a pressing health concern. Asphalt and concrete accumulation increases heat absorption, leading to stifling summer temperatures.\n\nTo combat this, urban planners recommend incentive tolls combined with rooftop greening. Initial results in pilot neighborhoods show a 20% reduction in traffic, correlated with dropped air pollution.\n\nHowever, downtown merchants express concern regarding foot traffic drops. Municipalities commit to boosting public transit frequency.`,
    hint: "⚠️ Trap Alert: 20% reduction figure linked to car traffic.\n🔄 Paraphrase Key: 'réduction de 20% de la circulation' = 'baisse de 20% du trafic'.\n📖 Structural Cue: Pilot result data in paragraph 2."
  },
  {
    level: "B2",
    text: `INTELLIGENCE ARTIFICIELLE ET DIAGNOSTIC MÉDICAL AU CANADA\n\nL'intégration d'algorithmes d'apprentissage profond dans le réseau hospitalier canadien révolutionne le dépistage précoce des pathologies radiologiques. En analysant des milliers d'imageries médicales en quelques secondes, ces outils d'intelligence artificielle assistent efficacement les médecins dans la détection d'anomalies microscopiques.\n\nNéanmoins, les comités de bioéthique rappellent que la décision thérapeutique finale doit impérativement demeurer sous la responsabilité exclusive du practitioner humain. La technologie est conçue comme un puissant levier d'aide à la décision et non comme un substitut à l'expertise clinique.\n\nDe plus, la protection de la confidentialité des données médicales des patients exige le déploiement de protocoles de cryptage de haute sécurité avant tout partage interhospitalier.`,
    q: "Quelle est la recommandation majeure des comités de bioéthique concernant l'IA médicale ?",
    opt: ["La décision thérapeutique finale doit rester sous responsabilité humaine", "L'IA doit remplacer définitivement les radiologues", "Les données des patients peuvent être publiées librement", "Les examens d'imagerie doivent être supprimés"],
    ans: 0,
    passEn: `ARTIFICIAL INTELLIGENCE AND MEDICAL DIAGNOSTICS IN CANADA\n\nIntegrating deep learning algorithms into the Canadian hospital network is revolutionizing early radiological screening. By analyzing medical images in seconds, AI tools effectively assist physicians in detecting anomalies.\n\nNevertheless, bioethics committees emphasize that the final treatment decision must strictly remain the sole responsibility of the human practitioner. Technology is a decision-support tool, not a replacement for clinical expertise.\n\nFurthermore, protecting patient data confidentiality requires deploying high-security encryption protocols.`,
    hint: "⚠️ Trap Alert: Bioethics contrast marker 'Néanmoins' preserving human clinical authority.\n🔄 Paraphrase Key: 'demeurer sous la responsabilité exclusive du praticien humain'.\n📖 Structural Cue: Bioethical guidelines in paragraph 2."
  },
  {
    level: "B2",
    text: `ÉCONOMIE CIRCULAIRE ET RECYCLAGE DES ÉQUIPEMENTS ÉLECTRONIQUES\n\nLa gestion des déchets électroniques représente un défi environnemental majeur à l'ère du numérique. Chaque année, des millions de tonnes d'ordinateurs, téléphones et batteries usagées sont jetées sans subir de traitement approprié, provoquant le gaspillage de métaux précieux comme le cobalt, le lithium et l'or.\n\nFace à ce constat, plusieurs provinces canadiennes adoptent une législation sur la Responsabilité Élargie des Producteurs (REP). Cette réglementation oblige désormais les fabricants de matériel informatique à financer et organiser la collecte ainsi que le recyclage sécurisé de leurs produits en fin de vie.\n\nCette démarche favorise l'émergence d'une véritable économie circulaire, créatrice d'emplois locaux spécialisés dans la décontamination et le réemploi des composants électroniques.`,
    q: "Que stipule la réglementation sur la Responsabilité Élargie des Producteurs (REP) ?",
    opt: ["Les fabricants doivent financer la collecte et le recyclage de leurs produits", "Les consommateurs doivent payer une amende pour chaque téléphone jeté", "L'importation de matériel électronique est désormais interdite", "Toutes les batteries usagées doivent être incinérées sans tri"],
    ans: 0,
    passEn: `CIRCULAR ECONOMY AND ELECTRONIC WASTE RECYCLING\n\nElectronic waste management represents a major environmental challenge in the digital age. Used electronics discarding causes waste of precious metals like cobalt, lithium, and gold.\n\nCanadian provinces are adopting Extended Producer Responsibility (EPR) legislation, requiring electronics manufacturers to fund and organize collection and safe recycling of end-of-life products.\n\nThis approach fosters a circular economy creating local decontamination jobs.`,
    hint: "⚠️ Trap Alert: EPR obligates manufacturers to fund recycling.\n🔄 Paraphrase Key: 'oblige les fabricants... à financer la collecte'.\n📖 Structural Cue: Legislative mandate in paragraph 2."
  },
  {
    level: "B2",
    text: `IMMIGRATION FRANCOPHONE HORS QUÉBEC ET DYNAMISME COMMUNAUTAIRE\n\nLe gouvernement fédéral canadien intensifie ses efforts pour atteindre les objectifs de recrutement d'immigrants francophones s'établissant dans les communautés en minorité linguistique hors du Québec, notamment en Ontario, au Nouveau-Brunswick et au Manitoba.\n\nL'installation de nouveaux arrivants d'expression française contribue au dynamisme économique régional, à la pérennité des écoles de langue française et à l'enrichissement culturel des collectivités locales. Des services d'accueil personnalisés facilitent leur intégration professionnelle dès leur arrivée.\n\nDes programmes de parrainage communautaire permettent également aux familles immigrantes de tisser rapidement des liens sociaux durables et de trouver un logement adapté.`,
    q: "Quel est l'impact recherché de l'immigration francophone hors Québec ?",
    opt: ["Renforcer le dynamisme économique et la vitalité culturelle des collectivités", "Obliger toutes les provinces à devenir exclusivement unilingues françaises", "Fermer les centres d'accueil communautaires régionaux", "Limiter l'accès aux écoles publiques d'expression française"],
    ans: 0,
    passEn: `FRANCOPHONE IMMIGRATION OUTSIDE QUEBEC AND COMMUNITY VITALITY\n\nThe Canadian federal government is stepping up efforts to meet recruitment targets for French-speaking immigrants settling in minority communities outside Quebec.\n\nSettlement of French-speaking newcomers contributes to regional economic dynamism, school sustainability, and cultural enrichment. Personalized welcoming services facilitate professional integration.\n\nCommunity mentorship programs enable immigrant families to build lasting connections.`,
    hint: "⚠️ Trap Alert: Focus on positive community vitality and school sustainability.\n🔄 Paraphrase Key: 'contribue au dynamisme économique... et à l'enrichissement culturel'.\n📖 Structural Cue: Positive impact nouns in paragraph 2."
  },
  {
    level: "B2",
    text: `TRANSITION ÉNERGÉTIQUE ET ARCHITECTURE BIOCLIMATIQUE\n\nLa construction de bâtiments à haute performance énergétique s'impose progressivement comme la norme architecturale dans les projets de rénovation urbaine. L'intégration de matériaux isolants biosourcés, comme la fibre de bois ou le chanvre, permet de réduire considérablement la consommation de chauffage en hiver.\n\nDe plus, la conception bioclimatique exploite l'orientation naturelle du soleil pour optimiser la luminosité et la chaleur passive. Des systèmes de ventilation à double flux avec récupération d'énergie assurent un renouvellement continu de l'air intérieur sans déperdition thermique.\n\nLes propriétaires bénéficient d'aides financières gouvernementales incitatives pour compenser le surcoût initial des travaux de rénovation verte.`,
    q: "Quel principe fondamental caractérise la conception bioclimatique ?",
    opt: ["Exploiter l'orientation du soleil pour optimiser la chaleur passive", "Utiliser exclusivement de la climatisation électrique en continu", "Supprimer toutes les fenêtres des façades exposées au nord", "Consommer plus de mazout durant les périodes de grand froid"],
    ans: 0,
    passEn: `ENERGY TRANSITION AND BIOCLIMATIC ARCHITECTURE\n\nBuilding high-performance energy-efficient structures is becoming standard. Incorporating bio-sourced insulation (wood fiber, hemp) significantly cuts winter heating consumption.\n\nBioclimatic design harnesses natural sun orientation for passive solar heat. Dual-flow ventilation with heat recovery ensures air turnover without heat loss.\n\nHomeowners benefit from government grants to offset green renovation costs.`,
    hint: "⚠️ Trap Alert: Natural passive solar design vs heavy electric HVAC usage.\n🔄 Paraphrase Key: 'exploite l'orientation naturelle du soleil'.\n📖 Structural Cue: Technical definitions in paragraph 2."
  },
  {
    level: "B2",
    text: `DÉCARBONATION DES TRANSPORTS DE MARCHANDISES AU CANADA\n\nLe secteur de la logistique canadienne opère un virage technologique vers le camionnage lourd à hydrogène vert. En remplaçant les moteurs diesel traditionnels sur les longs parcours interprovinciaux, cette innovation vise à éliminer plusieurs millions de tonnes d'émissions de gaz à effet de serre d'ici 2035.\n\nCependant, le déploiement massif de cette flotte propre nécessite la construction rapide d'un réseau national de stations de recharge à haute pression le long des grands corridors autoroutiers.`,
    q: "Quel obstacle majeur entrave le déploiement rapide des camions à hydrogène ?",
    opt: ["La nécessité de construire un réseau de stations de recharge à haute pression", "L'interdiction absolue de transporter des marchandises interprovinciales", "Le refus des conducteurs de conduire des camions neufs", "La baisse du prix du pétrole brut"],
    ans: 0,
    passEn: `FREIGHT DECARBONIZATION IN CANADA\n\nCanadian logistics is shifting toward green hydrogen heavy trucking. Replacing diesel engines on long interprovincial routes aims to eliminate millions of tons of greenhouse gases by 2035.\n\nHowever, massive rollout requires rapidly constructing a national high-pressure refueling station network along major highway corridors.`,
    hint: "⚠️ Trap Alert: Infrastructure bottleneck (refueling station network).\n🔄 Paraphrase Key: 'nécessite la construction d'un réseau de stations'.\n📖 Structural Cue: Challenge statement after 'Cependant'."
  },
  {
    level: "B2",
    text: `ÉCONOMIE DU SAVOIR ET CYBERSÉCURITÉ INDUSTRIELLE\n\nLa recrudescence des cyberattaques ciblant les infrastructures critiques au Canada pousse le gouvernement fédéral à durcir les normes de protection informatique imposées aux entreprises stratégiques. Les compagnies de distribution d'énergie, de télécommunications et de transport doivent désormais réaliser des audits de vulnérabilité semestriels obligatoires.\n\nLes entreprises manquant à ces obligations d'étanchéité numérique s'exposent à des sanctions financières lourdes et à la suspension temporaire de leurs licences d'exploitation.`,
    q: "Quelle obligation nouvelle concerne les entreprises d'infrastructures critiques ?",
    opt: ["Réaliser des audits de vulnérabilité informatique semestriels obligatoires", "Remplacer tous leurs employés par des robots informatiques", "Publier leurs codes secrets sur internet", "Fermer leurs réseaux de distribution d'énergie"],
    ans: 0,
    passEn: `KNOWLEDGE ECONOMY AND INDUSTRIAL CYBERSECURITY\n\nSurging cyberattacks targeting critical infrastructure prompt the federal government to tighten IT protection standards for strategic firms. Energy, telecom, and transit companies must now undergo mandatory semi-annual vulnerability audits.\n\nFirms failing to meet digital security mandates face heavy financial penalties and temporary operating license suspensions.`,
    hint: "⚠️ Trap Alert: Mandate (mandatory semi-annual audits).\n🔄 Paraphrase Key: 'audits de vulnérabilité semestriels obligatoires'.\n📖 Structural Cue: New rule in paragraph 1."
  },
  {
    level: "B2",
    text: `ÉVALUATION PEDAGOGIQUE ET APPRENTISSAGE DES LANGUES AU SECOND-AIRE\n\nUne réforme ministérielle récente introduit l'évaluation par compétences intégrées dans l'enseignement des langues secondes au secondaire. Plutôt que de privilégier la mémorisation théorique de règles grammaticales isolées, les examens évaluent la capacité des élèves à réaliser des tâches communicatives authentiques en situation réelle.\n\nLes enseignants rapportent que cette approche pragmatique stimule la confiance orale des apprenants et réduit l'anxiété liée aux épreuves d'examen.`,
    q: "Quel est le principe central de la réforme de l'évaluation en langues ?",
    opt: ["Évaluer la capacité à accomplir des tâches communicatives authentiques", "Multiplier par deux le nombre de règles de grammaire à réciter", "Supprimer totalement les cours de langue au secondaire", "Remplacer les professeurs par des logiciels automatisés"],
    ans: 0,
    passEn: `PEDAGOGICAL ASSESSMENT AND SECONDARY LANGUAGE LEARNING\n\nA recent ministerial reform introduces competency-based assessment in secondary second language teaching. Rather than favoring theoretical memorization of isolated grammar rules, exams assess students' ability to perform authentic communicative tasks in real-life situations.\n\nTeachers report that this pragmatic approach boosts learners' oral confidence and reduces exam anxiety.`,
    hint: "⚠️ Trap Alert: Shift to authentic communicative tasks vs rote grammar.\n🔄 Paraphrase Key: 'réaliser des tâches communicatives authentiques'.\n📖 Structural Cue: Core principle in paragraph 1."
  },

  // C1 AUTONOMOUS (Q35 - Q37)
  {
    level: "C1",
    text: `SOCIOLOGIE DU TRAVAIL — LA MUTATION DES MODÈLES ORGANISATIONNELS\n\nL'expérimentation à grande échelle de la semaine de travail de quatre jours dans le secteur tertiaire suscite un intérêt croissant auprès des chercheurs en gestion et des décideurs économiques. Loin de nuire au rendement des entreprises, ce modèle fondé sur la réduction du temps de travail sans baisse de salaire démontre une préservation, voire une amélioration de la productivité globale.\n\nSur le plan de la santé mentale des salariés, les données recueillies indiquent une diminution remarquable de 35 % des épisodes de surmenage professionnel et de syndrome d'épuisement (burnout). Les employés bénéficiant d'un équilibre renforcé entre vie privée et engagement professionnel affichent une fidélité accrued envers leur organisation.\n\nNéanmoins, la transposabilité de cette organisation aux secteurs industriels à feu continu ou aux services d'urgence médicale soulève des défis logistiques majeurs.`,
    q: "Quel résultat marquant ressort de l'analyse sociologique de la semaine de 4 jours ?",
    opt: ["Une diminution de 35% du surmenage professionnel chez les salariés", "Une baisse inévitable de la productivité globale de l'entreprise", "Une augmentation généralisée du taux d'absentéisme", "L'obligation de baisser les salaires des employés"],
    ans: 0,
    passEn: `WORKPLACE SOCIOLOGY — MUTATION OF ORGANIZATIONAL MODELS\n\nTrials of the four-day workweek in the service sector show that reducing hours without pay cuts preserves or improves overall productivity.\n\nRegarding mental health, data indicates a 35% decrease in workplace overwork and burnout. Balanced employees display increased loyalty.\n\nNevertheless, applying this to continuous industrial sectors or emergency services presents major logistical challenges.`,
    hint: "⚠️ Trap Alert: 35% burnout reduction figure.\n🔄 Paraphrase Key: 'diminution remarquable de 35% des épisodes de surmenage'.\n📖 Structural Cue: Mental health survey results in paragraph 2."
  },
  {
    level: "C1",
    text: `AMÉNAGEMENT DU TERRITOIRE ET GESTION DES RESSOURCES EN EAU\n\nLa gestion concertée des bassins versants face aux aléas pluviométriques extrêmes exige le dépassement des découpages administratifs traditionnels au profit de gouvernances environnementales intégrées. L'accentuation des épisodes de sécheresse estivale couplée aux risques de ruissellement torrentiel impose une réévaluation fondamentale des schémas d'aménagement urbain et agricole.\n\nLes spécialistes de l'hydrologie préconisent la restauration prioritaire des zones humides naturelles qui jouent le rôle d'éponges écologiques régulatrices. Ces écosystèmes absorbent les surplus d'eau lors des crues printanières et restituent progressivement l'humidité durant les périodes d'étiage.\n\nCette approche fondée sur la nature s'avère économiquement plus pérenne que le dimensionnement perpétuel d'ouvrages de génie civil lourds.`,
    q: "Quel rôle écologique majeur remplissent les zones humides naturelles ?",
    opt: ["Réguler le cycle de l'eau en absorbant les crues et restituant l'humidité", "Accélérer l'assèchement définitif des terres agricoles", "Favoriser le ruissellement torrentiel vers les zones urbaines", "Remplacer l'eau douce par des réservoirs d'eau de mer"],
    ans: 0,
    passEn: `TERRITORIAL PLANNING AND WATER RESOURCE MANAGEMENT\n\nConcerted watershed management in extreme rainfall hazards demands transcending administrative boundaries for integrated environmental governance. Intensifying summer droughts and torrential runoff risks mandate re-evaluating urban and agricultural development plans.\n\nHydrology specialists advocate restoring natural wetlands as regulating ecological sponges. These ecosystems absorb excess spring flood water and release moisture during dry spells.\n\nThis nature-based approach proves economically more sustainable than perpetual heavy civil engineering.`,
    hint: "⚠️ Trap Alert: Natural sponge concept (absorbing floods, releasing moisture).\n🔄 Paraphrase Key: 'éponges écologiques régulatrices... absorbent... restituent'.\n📖 Structural Cue: Hydrological function definitions in paragraph 2."
  },
  {
    level: "C1",
    text: `DROIT INTERNATIONAL ET ÉTIQUETAGE DES PRODUITS DE LA MER\n\nL'harmonisation transfrontalière des exigences de traçabilité des produits halieutiques constitue un impératif éthique et juridique face au fléau de la pêche illégale et non réglementée. L'adoption de certificats numériques infalsifiables de la capture jusqu'au consommateur final vise à garantir la durabilité des stocks d'espèces marines menacées.\n\nCependant, les pays en développement soulignent la lourdeur des investissements technologiques requis pour certifier leurs flottes artisanales, réclamant un fonds de transfert de compétences équitable.`,
    q: "Quel est l'objectif premier des certificats numériques de traçabilité halieutique ?",
    opt: ["Garantir la durabilité des stocks de pêche et lutter contre la pêche illégale", "Augmenter le prix du poisson de 200% pour les consommateurs", "Interdire définitivement la consommation de fruits de mer", "Favoriser les grandes flottes de pêche industrielles non certifiées"],
    ans: 0,
    passEn: `INTERNATIONAL LAW AND SEAFOOD LABELS\n\nCross-border harmonization of seafood traceability requirements is an ethical imperative against illegal fishing. Digital tamper-proof capture-to-consumer certificates guarantee stock sustainability.\n\nHowever, developing nations highlight heavy tech investment burdens for artisanal fleets, demanding an equitable skills transfer fund.`,
    hint: "⚠️ Trap Alert: Sustainability goal (combating illegal fishing, preserving stocks).\n🔄 Paraphrase Key: 'garantir la durabilité des stocks... lutter contre la pêche illégale'.\n📖 Structural Cue: Legal goal in paragraph 1."
  },
  {
    level: "C1",
    text: `ÉCONOMIE POLITIQUE DE LA TRANSITION ÉNERGÉTIQUE EN AMÉRIQUE DU NORD\n\nLa reconversion industrielle des bassins miniers et pétroliers vers les énergies renouvelables exige une planification stratégique anticipatrice pour prévenir la dévitalisation sociale des territoires dépendants des énergies fossiles. La réussite de ce virage repose sur des programmes de reconversion professionnelle ciblés et des investissements publics massifs dans la filière hydrogène.\n\nLes analystes insistent sur la nécessité d'un contrat social équitable garantissant que les coûts de la transition ne reposent pas de manière disproportionnée sur les travailleurs les plus vulnérables.`,
    q: "Quelle condition est jugée indispensable pour réussir la reconversion des bassins fossiles ?",
    opt: ["Assurer des formations de reconversion et un contrat social équitable pour les travailleurs", "Fermer toutes les usines sans indemnisation pour les employés", "Mier uniquement sur les forces du marché sans intervention publique", "Augmenter l'extraction de charbon pour financer le solaire"],
    ans: 0,
    passEn: `POLITICAL ECONOMY OF NORTH AMERICAN ENERGY TRANSITION\n\nIndustrial conversion of mining and oil basins toward renewables demands anticipatory strategic planning to prevent social devitalisation. Success relies on targeted retraining and public hydrogen investment.\n\nAnalysts emphasize an equitable social contract ensuring transition costs do not fall disproportionately on vulnerable workers.`,
    hint: "⚠️ Trap Alert: Retraining and equitable social contract for workers.\n🔄 Paraphrase Key: 'reconversion professionnelle ciblée... contrat social équitable'.\n📖 Structural Cue: Policy requirement in paragraph 2."
  },

  // C2 MASTERY (Q38 - Q39)
  {
    level: "C2",
    text: `ÉPISTÉMOLOGIE ET NARRATIFS DE LA TRANSITION ÉCOLOGIQUE\n\nLa déconstruction des paradigmes extractivistes contemporains requiert un réexamen épistémologique profond de notre rapport à la matérialité du monde et aux communs terrestres. L'obsolescence théorique des modèles de croissance linéaire illimitée impose l'élaboration de nouvelles métriques de prospérité intégrant les limites planétaires infranchissables.\n\nDans cette perspective, la pensée complexe rejette les solutions technocratiques réductrices qui prétendent résoudre la crise systémique par un simple ajustement marginal des mécanismes de marché. Il s'agit d'opérer une mutation culturelle refondant les représentations collectives de l'abondance et du progrès.\n\nCette réorientation philosophique implique une redéfinition globale des responsabilités éthiques envers les générations futures et le vivant non humain.`,
    q: "Que préconise l'analyse épistémologique face à la crise systémique ?",
    opt: ["Une mutation culturelle refondant les représentations collectives du progrès", "La poursuite indéfinie des modèles de croissance linéaire illimitée", "L'abandon de toute réflexion éthique envers les générations futures", "Le recours exclusif à des ajustements marchands marginaux"],
    ans: 0,
    passEn: `EPISTEMOLOGY AND ECOLOGICAL TRANSITION NARRATIVES\n\nDeconstructing extractivist paradigms requires an epistemological re-examination of planetary commons. Obsolescence of unlimited growth models mandates metrics incorporating planetary boundaries.\n\nComplex thinking rejects technocratic market adjustments, urging a cultural mutation reframing abundance and progress.\n\nThis implies redefining ethical responsibilities toward future generations and non-human life.`,
    hint: "⚠️ Trap Alert: Reject technocratic market-only fixes in favor of deep cultural shift.\n🔄 Paraphrase Key: 'opérer une mutation culturelle refondant les représentations'.\n📖 Structural Cue: Analyze philosophical stance in paragraph 2."
  },
  {
    level: "C2",
    text: `PHILOSOPHIE DE LA TECHNIQUE ET GOUVERNANCE DES ALGORITHMES\n\nL'omniprésence des architectures algorithmiques d'optimisation comportementale au sein de la sphère publique contemporaine soulève une interrogation fondamentale sur la pérennité de l'autonomie délibérative des citoyens. En orientant de façon imperceptible les flux d'information et les choix individuels, la gouvernementalité algorithmique risque d'atrophier l'espace d'affrontement contradictoire indispensable à l'exercice démocratique.\n\nFace à cette dérive, les théoriciens du droit constitutionnel plaident pour l'instauration d'un principe d'explicabilité et d'auditabilité publique des systèmes décisionnels automatisés, garantissant le maintien de la souveraineté citoyenne face à l'arbitraire du code.`,
    q: "Quel principe constitutionnel est préconisé pour protéger la démocratie face aux algorithmes ?",
    opt: ["L'explicabilité et l'auditabilité publique des systèmes automatisés", "L'interdiction totale de tout réseau de télécommunication", "La délégation complète du pouvoir législatif aux ordinateurs", "La suppression des lois sur la protection des données"],
    ans: 0,
    passEn: `PHILOSOPHY OF TECHNOLOGY AND ALGORITHMIC GOVERNANCE\n\nThe ubiquity of behavioral optimization algorithmic architectures in the contemporary public sphere raises a fundamental question about citizen deliberative autonomy.\n\nConstitutional law theorists advocate establishing a principle of public explainability and auditability for automated decision systems to preserve citizen sovereignty.`,
    hint: "⚠️ Trap Alert: Constitutional safeguard (public explainability and auditability).\n🔄 Paraphrase Key: 'explicabilité et auditabilité publique'.\n📖 Structural Cue: Legal solution in paragraph 2."
  },
  {
    level: "C2",
    text: `ESTHÉTIQUE LITTÉRAIRE ET POÉTIQUE DE LA MODERNITÉ EN FRANCOPHONIE\n\nL'émergence de nouvelles formes romanesques hybrides au sein de la littérature francophone contemporaine témoigne d'un éclatement salutaire des canons esthétiques classiques. En entrelaçant fragments poétiques, archives historiques recontextualisées et polyphonie narrative, ces œuvres déstabilisent la posture traditionnelle de l'auteur démiurge au profit d'une expérience de lecture participative et critique.\n\nCette poétique du métissage formel réinvente la langue française en la libérant de son académisme institutionnel, en faisant un réceptacle vibrant des mémoires périphériques et des imaginaires décentrés.`,
    q: "Quelle caractéristique majeure définit la nouvelle poétique romanesque francophone ?",
    opt: ["Un métissage formel libérant la langue de son académisme institutionnel", "Un retour à la rigidité absolue de la poésie classique du XVIIe siècle", "L'abandon complet de l'écriture en langue française", "L'obligation d'écrire uniquement des récits autobiographiques univoques"],
    ans: 0,
    passEn: `LITERARY AESTHETICS AND POETICS OF MODERNITY IN FRANCOPHONIE\n\nThe emergence of hybrid novelistic forms in contemporary Francophone literature reflects a salutary breaking of classic aesthetic canons. Interweaving poetic fragments, historical archives, and narrative polyphony, these works dismantle the demiurgic author posture for a participatory reading experience.\n\nThis formal hybridization redefines the French language, freeing it from institutional academicism to make it a vibrant vessel for peripheral memories.`,
    hint: "⚠️ Trap Alert: Formal hybridization freeing language from academicism.\n🔄 Paraphrase Key: 'métissage formel libérant la langue de son académisme'.\n📖 Structural Cue: Aesthetic analysis in paragraph 2."
  }
];

function getTargetLevel(questionNum: number): string {
  if (questionNum <= 10) return "A1";
  if (questionNum <= 18) return "A2";
  if (questionNum <= 26) return "B1";
  if (questionNum <= 34) return "B2";
  if (questionNum <= 37) return "C1";
  return "C2";
}

function shuffleOptions(rawOpt: string[], origCorrectIdx: number, rawImages?: string[]) {
  const correctText = rawOpt[origCorrectIdx];
  const indexed = rawOpt.map((optText, i) => ({
    optText,
    isCorrect: i === origCorrectIdx,
    imgUrl: rawImages ? rawImages[i] : undefined
  }));

  // Deterministic shuffle using option text lengths to vary option order
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = (indexed[i].optText.length + i) % (i + 1);
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  const options = indexed.map((item) => item.optText);
  const correctIndex = indexed.findIndex((item) => item.isCorrect);
  const optionImages = rawImages ? indexed.map((item) => item.imgUrl as string) : undefined;
  return { options, correctIndex, correctText, optionImages };
}

function customizeListeningTopicForPaper(t: any, i: number, prefix: string, seedOffset: number) {
  const paperNum = (parseInt(prefix.replace(/\D/g, ""), 10) || 1) + seedOffset;
  let text = t.text;
  let tr = t.tr;
  let en = t.en;
  let opt = [...t.opt];
  let ans = t.ans;

  if (i === 1) {
    const tracks = ["voie 4", "quai 2", "porte B15", "arrêt 3", "embarcadère 7", "quai 12", "voie 8", "quai 1", "pont 5", "quai 4"];
    const trains = ["TGV 7842", "VIA Rail 5619", "Air Canada AC402", "Exo Bus 24", "Traversier 102", "Orléans Express 804", "TGV 9104", "REM 303", "Navette 505", "TransLink 99"];
    const dests = ["Paris-Gare de Lyon", "Québec", "Toronto", "Laval", "Lévis", "Gatineau", "Lyon", "Aéroport", "Trois-Rivières", "Vancouver"];
    const track = tracks[(paperNum - 1) % tracks.length];
    const train = trains[(paperNum - 1) % trains.length];
    const dest = dests[(paperNum - 1) % dests.length];

    tr = `Chers voyageurs, votre attention s'il vous plaît. Le transport ${train} à destination de ${dest}, départ initialement prévu, partira exceptionnellement du ${track}. Veuillez assurer l'embarquement immédiat.`;
    en = `Dear passengers, attention please. Transport ${train} bound for ${dest} will exceptionally depart from ${track}. Please proceed to immediate boarding.`;
    opt = [`Au ${track}`, `À la gare centrale`, `En retard de 45 minutes`, `Annulé sans correspondance`];
    ans = 0;
  } else if (i === 2) {
    const places = ["au supermarché du centre-ville", "à la boulangerie du quartier", "au grand marché public", "à la pharmacie de garde", "au magasin d'électronique", "à la caisse du supermarché"];
    const place = places[(paperNum - 1) % places.length];
    tr = `Salut Thomas ! C'est Marc. Je suis actuellement ${place} pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?`;
    en = `Hi Thomas! It's Marc. I'm currently at ${place} doing weekly shopping. Tell me, do you need me to pick up fresh bread or cheese for dinner tonight?`;
    opt = [place.charAt(0).toUpperCase() + place.slice(1), "À la maison", "Au cinéma municipal", "Au parc communautaire"];
    ans = 0;
  }

  return { text, tr, en, opt, ans };
}

function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    LISTENING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : LISTENING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = LISTENING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const rawT = LISTENING_TOPICS[chosenIdx];
    const t = customizeListeningTopicForPaper(rawT, i, prefix, seedOffset);

    const isQuestionInAudio = i <= 29;

    let rawImages: string[] | undefined = undefined;
    let mainImage: string | undefined = undefined;
    let mainImageSvg: string | undefined = undefined;

    if (i <= 4) {
      mainImageSvg = getOfficialLineArtSvg(i, seedOffset);
    }

    let topicOpt = t.opt;
    let topicAns = t.ans;

    if (i <= 4) {
      const type = ((i + seedOffset) % 4) + 1;
      if (type === 1) {
        topicOpt = [
          "Deux collègues discutent debout dans un bureau.",
          "Le directeur dort à son poste de travail.",
          "Les deux hommes jouent au tennis en extérieur.",
          "Un employé répare un ordinateur portable."
        ];
        topicAns = "Deux collègues discutent debout dans un bureau.";
      } else if (type === 2) {
        topicOpt = [
          "Un client demande une information à la réceptionniste.",
          "Le pilote de l'avion s'installe dans le cockpit.",
          "Deux personnes nagent dans la piscine de l'hôtel.",
          "Le technicien répare la porte d'entrée."
        ];
        topicAns = "Un client demande une information à la réceptionniste.";
      } else if (type === 3) {
        topicOpt = [
          "Le boulanger sert du pain frais au client.",
          "Un mécanicien change la roue d'une voiture.",
          "Les voyageurs montent dans le train en gare.",
          "Le professeur écrit au tableau dans la classe."
        ];
        topicAns = "Le boulanger sert du pain frais au client.";
      } else if (type === 4) {
        topicOpt = [
          "L'agente d'escale vérifie le billet du passager.",
          "Un cuisinier prépare une pizza dans le four.",
          "Deux jardiniers arrosent les fleurs du parc.",
          "Le médecin consulte le dossier du patient."
        ];
        topicAns = "L'agente d'escale vérifie le billet du passager.";
      }
    }

    const { options, correctIndex, correctText, optionImages } = shuffleOptions(topicOpt, topicAns, rawImages);

    const specificHint = (t as any).hint || `Level ${t.level} Listening Guidance: Focus on the speaker's main intent and tone. Pay attention to key transition words (e.g. "cependant", "en revanche") to identify the correct message without guessing.`;

    let questionTextPrompt = (t as any).q;
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
    }

    const isMaleSpeaker = i % 2 === 1;
    const passageSpeakerLabel = isMaleSpeaker ? "Locuteur" : "Locutrice";
    const announcerLabel = isMaleSpeaker ? "Annonceuse" : "Annonceur";

    const isSpokenOptionQuestion = (i >= 5 && i <= 8);

    let fullSpokenTranscript = isQuestionInAudio
      ? (isSpokenOptionQuestion
        ? `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question et les 4 réponses. Question N°${i} : ${questionTextPrompt}\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`
        : `${passageSpeakerLabel}: ${t.tr}\n${announcerLabel}: Écoutez la question. Question N°${i} : ${questionTextPrompt}`)
      : t.tr;

    if (i <= 4 && mainImageSvg) {
      fullSpokenTranscript = `${announcerLabel}: Consigne : Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... A : ${options[0]}.\n... B : ${options[1]}.\n... C : ${options[2]}.\n... D : ${options[3]}.`;
    }

    const speakingRate = i <= 7 ? 0.85 : i <= 15 ? 0.92 : i <= 25 ? 1.00 : i <= 33 ? 1.15 : 1.30;

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      level: t.level,
      speakingRate,
      hasSpokenOptions: isSpokenOptionQuestion || (i <= 4 && !!mainImageSvg),
      text: i <= 4 && mainImageSvg
        ? "Écoutez les 4 propositions. Choisissez celle qui correspond à l'image."
        : isSpokenOptionQuestion
        ? `Écoutez le document sonore, la question audio N°${i} et les 4 réponses. Cochez la bonne réponse.`
        : isQuestionInAudio
        ? `Écoutez le document sonore et la question audio N°${i}. Choisissez la bonne option.`
        : `${t.text}`,
      options,
      optionImages,
      mainImage,
      mainImageSvg,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The spoken document confirms "${correctText}".`,
      hint: specificHint,
      transcript: fullSpokenTranscript,
      transcriptEnglish: t.en,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: 15
    });
  }
  return qList;
}

function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingIndices: number[] = [];

    READING_TOPICS.forEach((t, idx) => {
      if (t.level === targetLevel || (targetLevel === "C2" && t.level === "C1")) {
        matchingIndices.push(idx);
      }
    });

    const pool = matchingIndices.length > 0
      ? matchingIndices
      : READING_TOPICS.map((_, idx) => idx);

    let chosenIdx = pool[(i - 1 + seedOffset) % pool.length];
    if (usedIndices.has(chosenIdx)) {
      const unused = pool.find((idx) => !usedIndices.has(idx));
      if (unused !== undefined) {
        chosenIdx = unused;
      } else {
        const globalUnused = READING_TOPICS.findIndex((_, idx) => !usedIndices.has(idx));
        if (globalUnused !== -1) chosenIdx = globalUnused;
      }
    }
    usedIndices.add(chosenIdx);
    const t = READING_TOPICS[chosenIdx];

    const { options, correctIndex, correctText } = shuffleOptions(t.opt, t.ans);

    const specificHint = (t as any).hint || `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`;

    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The text states "${correctText}".`,
      hint: `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`
    });
  }
  return qList;
}

// ─── 1. OFFICIAL TCF CANADA PAPER 1 (TCF-CAN-01) ───
export const SAMPLE_TCF_PAPER_1: ExamPaper = {
  id: "tcf-canada-sample-1",
  title: "TCF Canada Official Practice Paper 1",
  code: "TCF-CAN-01",
  type: "TCF_CANADA",
  description: "Full-length official FEI standard simulator for TCF Canada Express Entry PR Points (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf1-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez obtenir des informations concernant la location d'un appartement au Québec. Rédigez un courriel au propriétaire (60 à 120 mots) pour demander les détails sur le loyer, les charges et la date de disponibilité.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation formelle (Monsieur/Madame)", "Formuler 3 questions précises sur le logement", "Formule de politesse formelle de fin"],
          sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'appartement de trois pièces actuellement proposé à la location. Intéressé par votre annonce, je souhaiterais obtenir des précisions avant d'envisager une visite.\n\nPourriez-vous m'indiquer le montant exact du loyer mensuel ainsi que la nature des charges incluses (chauffage, électricité, eau) ? De plus, j'aimerais connaître la date exacte à partir de laquelle le logement sera disponible.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf1-w2",
          taskNumber: 2,
          title: "Tâche 2 : Compte-rendu d'expérience (Travel Experience Report)",
          prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Utiliser le passé composé et l'imparfait", "Décrire le paysage et l'ambiance", "Exprimer vos sentiments (joie, surprise)"],
          sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une expérience inoubliable en assistant au Carnaval d'hiver de Québec. Dès mon arrivée, la ville historique était magnifiquement recouverte d'un manteau de neige et illuminée de mille feux.\n\nJ'ai eu la chance d'admirer d'impressionnantes sculptures sur glace et d'assister à la traditionnelle course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était à la fois féerique et très chaleureuse, malgré des températures extrêmement froides.\n\nCette immersion culturelle exceptionnelle m'a permis d'enrichir mon vocabulaire français et d'échanger avec des habitants chaleureux. Je garde un souvenir impérissable de cette aventure nordique et je recommande vivement cette destination !"
        },
        {
          id: "tcf1-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Introduction présentant le débat", "Argument 1 avec exemple précis", "Argument 2 (coût financier)", "Conclusion claire affirmant votre prise de position"],
          sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un vif débat au sein des municipalités modernes.\n\nD'un côté, les partisans de cette mesure soutiennent qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour la collectivité. Sans recettes de billetterie, la rénovation et la modernisation des infrastructures risqueraient d'être compromises.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité du réseau."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf1-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
          scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2,
          keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est...", "Dans mon temps libre, j'aime..."]
        },
        {
          id: "tcf1-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice en interaction (Information Gathering)",
          scenario: "Vous voulez vous inscrire à un cours de sport. Posez au moins 5 questions à l'examinateur sur les horaires, les tarifs et l'équipement requis.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5,
          keyPhrases: ["Quels sont les jours de cours ?", "Combien coûte l'abonnement mensuel ?", "Est-il nécessaire d'apporter son propre matériel ?"]
        },
        {
          id: "tcf1-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Que pensez-vous du travail à distance généralisé ? Présentez les avantages et les inconvénients puis donnez votre avis personnel à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5,
          keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "En ce qui concerne les avantages...", "Pour conclure, je dirais que..."]
        }
      ]
    }
  ]
};

// ─── 2. OFFICIAL TCF CANADA PAPER 2 (TCF-CAN-02) ───
export const SAMPLE_TCF_PAPER_2: ExamPaper = {
  id: "tcf-canada-sample-2",
  title: "TCF Canada Official Practice Paper 2",
  code: "TCF-CAN-02",
  type: "TCF_CANADA",
  description: "Advanced TCF Canada examination paper for Express Entry NCLC 8 / B2 Vantage targets (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, interviews, and public service announcements (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles and environmental press reports (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Argumentative essay writing for Canadian Express Entry (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf2-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation courtoise", "Formuler 3 questions claires", "Remercier à la fin"],
          sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf2-w2",
          taskNumber: 2,
          title: "Tâche 2 : Article de témoignage",
          prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Décrire l'ambiance", "Utiliser le passé composé", "Expliquer pourquoi vous recommandez cet événement"],
          sampleResponse: "Lors de mon dernier séjour au Québec, j'ai eu l'immense privilège de participer au Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été émerveillé par l'atmosphère festive et l'énergie vibrante des spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux et la convivialité des Québécois ont rendu cette expérience inoubliable.\n\nJe recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une immersion festive sans égale que vous ne regretterez pas !"
        },
        {
          id: "tcf2-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Présenter la problématique", "Développer 2 arguments solides", "Conclure avec une synthèse claire"],
          sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite de vifs débats sociétaux.\n\nD'une part, les partisans soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des structures phonétiques. De surcroît, une maîtrise précoce constitue un atout indiscutable dans un monde professionnel globalisé.\n\nD'autre part, les détracteurs craignent qu'une surcharge cognitive n'entrave l'acquisition fondamentale de la langue maternelle et du calcul.\n\nEn somme, bien que ces réserves soient légitimes, je suis convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle indispensable, à condition d'adapter la pédagogie au rythme de chaque élève."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive debate with oral examiner (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf2-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé",
          scenario: "Décrivez votre profession actuelle, vos compétences principales et pourquoi vous souhaitez poursuivre votre carrière au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2
        },
        {
          id: "tcf2-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice d'interaction (Recherche de logement)",
          scenario: "Vous cherchez un appartement à louer. Interrogez le propriétaire (l'examinateur) sur les charges, le quartier et la date de disponibilité.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5
        },
        {
          id: "tcf2-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Faut-il limiter l'utilisation des écrans chez les adolescents ? Présentez votre opinion à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5
        }
      ]
    }
  ]
};

// ─── 3. OFFICIAL TEF CANADA PAPER 1 (TEF-CAN-01) ───
export const SAMPLE_TEF_PAPER_1: ExamPaper = {
  id: "tef-canada-sample-1",
  title: "TEF Canada Official Practice Paper 1",
  code: "TEF-CAN-01",
  type: "TEF_CANADA",
  description: "Full-length simulator tailored for TEF Canada Paris Chamber of Commerce (CCI) standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef1-w1",
          taskNumber: 1,
          title: "Section A : Article de Fait Divers (Newspaper Article Continuation)",
          prompt: "Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          guidedTips: ["Employer le passé composé et l'imparfait", "Décrire l'intervention des pompiers", "Conclure par la réouverture de la circulation"],
          sampleResponse: "Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures. L'animal effrayé s'était réfugié au sommet d'une structure métallique, refusant de descendre malgré les appels des automobilistes immobilisés.\n\nAvertis rapidement, les pompiers de Montréal et la patrouille policière sont arrivés sur les lieux afin d'établir un périmètre de sécurité. Un secouriste expérimenté a dû escalader la structure équipé d'une nacelle spéciale pour récupérer le félin sain et sauf.\n\nAprès cette opération spectaculaire saluée par les applaudissements des riverains, la circulation a pu reprendre progressivement en fin d'après-midi."
        },
        {
          id: "tef1-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'opinion persuasive (Letter to Editor)",
          prompt: "La municipalité souhaite remplacer une place publique historique par un centre commercial. Écrivez une lettre au maire (200 mots minimum) pour défendre la préservation du patrimoine urbain.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation formelle (Monsieur le Maire)", "Exprimer l'inquiétude des habitants", "Présenter 2 arguments patrimoniaux et écologiques", "Formule de politesse formelle"],
          sampleResponse: "Monsieur le Maire,\n\nJe vous adresse cette lettre en tant que citoyen soucieux de l'avenir de notre ville afin de vous faire part de ma profonde inquiétude concernant le projet de démolition de la place Saint-Jean au profit d'un complexe commercial.\n\nD'une part, cette place constitue un fleuron incontestable de notre patrimoine architectural et historique. Elle représente un lieu de mémoire collective où les générations se croisent et tissent des liens sociaux essentiels à la vitalité de notre communauté.\n\nD'autre part, la destruction de cet espace vert au cœur du centre-ville accentuera les îlots de chaleur urbains et aggravera l'empreinte carbone municipale. À l'heure où la transition écologique exige la sauvegarde de la biodiversité urbaine, remplacer un havre de paix végétalisé par des structures bétonnées m'apparaît comme un choix à contre-courant des impératifs environnementaux actuels.\n\nEn somme, je vous prie de bien vouloir reconsidérer cette décision et d'envisager la réhabilitation de la place dans le respect de son identité d'origine.\n\nDans l'attente de votre prise en considération, je vous prie d'agréer, Monsieur le Maire, l'expression de ma haute considération."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef1-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (10 Questions)",
          scenario: "Vous voyez une annonce pour une offre d'emploi à mi-temps dans un journal. Appelez le recruteur pour poser au moins 10 questions sur le poste.",
          prepTimeMins: 0,
          speakingTimeMins: 5,
          keyPhrases: ["Quelles sont les heures de travail ?", "Quel est le salaire proposé ?", "Quelles sont les qualifications requises ?"]
        },
        {
          id: "tef1-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Un ami hésite à partir faire du camping sauvage ce week-end. Convainquez-le d'accepter cette aventure avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Pense à la beauté des paysages !", "Je m'occupe de tout le matériel.", "C'est l'occasion idéale de se déconnecter."]
        }
      ]
    }
  ]
};

// ─── 4. OFFICIAL TEF CANADA PAPER 2 (TEF-CAN-02) ───
export const SAMPLE_TEF_PAPER_2: ExamPaper = {
  id: "tef-canada-sample-2",
  title: "TEF Canada Official Practice Paper 2",
  code: "TEF-CAN-02",
  type: "TEF_CANADA",
  description: "Advanced TEF Canada examination paper tailored for CCI Paris standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Radio interviews and complex dialogs (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Editorial columns and economic synthesis (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section B (Formal Persuasive Letter to an Editor) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef2-w1",
          taskNumber: 1,
          title: "Section A : Fait divers (Continuation)",
          prompt: "Rédigez la suite d'un fait divers à partir du début suivant (80 mots minimum) : 'Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          sampleResponse: "Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15. Des milliers de familles impatientes ont afflué dès l'aube, saturant complètement les voies d'accès principales.\n\nFace à cette paralysie du réseau routier, la sûreté du Québec a dû déployer en urgence plusieurs unités de motards pour rediriger les usagers vers des itinéraires secondaires. Malgré la frustration initiale des conducteurs, aucun incident majeur n'a été déploré.\n\nLa direction du parc a rapidement présenté ses excuses et s'est engagée à renforcer l'organisation des parkings pour les jours à venir."
        },
        {
          id: "tef2-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'argumentation (Letter to a Friend / Newspaper)",
          prompt: "Un de vos amis refuse d'utiliser le recyclage et jette tout dans les poubelles ordinaires. Écrivez-lui une lettre persuasive (200 mots minimum) pour le convaincre d'adopter des habitudes écologiques.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation amicale", "Exprimer sa surprise tout en restant bienveillant", "Présenter 2 arguments environnementaux concrets", "Proposer des gestes simples pour commencer dès aujourd'hui"],
          sampleResponse: "Cher Alexandre,\n\nJe me permets de t'écrire après notre discussion de la semaine dernière, car ton scepticisme concernant le tri sélectif m'a beaucoup fait réfléchir.\n\nEn premier lieu, saches que le recyclage des déchets n'est pas une simple contrainte administrative, mais un acte citoyen essentiel pour limiter le gaspillage des ressources naturelles. Lorsque nous jetons du plastique ou du papier dans les ordures ménagères, ces matériaux finissent enfouis ou incinérés, générant des gaz à effet de serre néfastes pour notre atmosphère.\n\nEn second lieu, adopter le tri au quotidien est aujourd'hui d'une simplicité enfantine. Il suffit d'installer deux bacs distincts dans sa cuisine. Par ce geste minime qui ne prend que quelques secondes par jour, tu participes activement à la réutilisation des matières premières et à la protection des écosystèmes.\n\nJe sais que tu es une personne responsable et attentive à ton environnement. Pourquoi ne pas essayer ensemble dès ce week-end ? Je serais ravi de t'aider à mettre en place ce système chez toi.\n\nAmicalement,\nThomas"
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section B (Persuasive Oral Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef2-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (Logement de vacances)",
          scenario: "Vous lisez une annonce pour la location d'un chalet à la montagne. Posez 10 questions au propriétaire sur le prix, la capacité et les activités à proximité.",
          prepTimeMins: 0,
          speakingTimeMins: 5
        },
        {
          id: "tef2-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Votre ami hésite à participer à un programme de bénévolat communautaire le week-end. Convainquez-le de s'inscrire avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Tu sais, c'est une opportunité unique pour...", "Je comprends ton hésitation, mais pense au fait que...", "On pourrait y aller ensemble, ce sera beaucoup plus amusant !"]
        }
      ]
    }
  ]
};

// ─── DYNAMIC GENERATOR FOR 10 UNIQUE TCF CANADA PAPERS & 10 UNIQUE TEF CANADA PAPERS ───

export const TCF_WRITING_SUITE = [
  [
    {
      title: "Tâche 1 : Message court (Problème de chauffage)",
      prompt: "Vous louez un appartement au Québec. Le système de chauffage ne fonctionne plus en plein hiver. Rédigez un courriel au propriétaire (60 à 120 mots) pour expliquer la situation et demander une réparation urgente.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris en urgence afin de vous signaler un problème majeur dans l'appartement que je loue au 45 rue Saint-Denis. Depuis hier soir, le système de chauffage central est totalement en panne et la température intérieure a chuté de manière préoccupante en raison des températures négatives extérieures.\n\nEn conséquence, je vous saurais gré d'intervenir dans les plus brefs délais ou d'envoyer un technicien qualifié dès aujourd'hui pour procéder aux réparations nécessaires. Je reste joignable par téléphone à tout moment pour faciliter l'accès au logement.\n\nEn vous remerciant vivement pour votre réactivité et votre compréhension, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)",
      prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable en assistant au traditionnel Carnaval d'hiver de la ville de Québec. Dès mon arrivée dans le Vieux-Québec, la cité historique était magnifiquement recouverte d'un manteau de neige féerique et illuminée de mille feux.\n\nPendant mon séjour, j'ai eu la chance d'admirer d'impressionnantes sculptures sur glace réalisées par des artistes internationaux et d'assister à la spectaculaire course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était chaleureuse et festive, malgré les températures froides.\n\nEn outre, cette immersion culturelle exceptionnelle m'a permis d'échanger avec des habitants accueillants et d'enrichir considérablement mes connaissances régionales. Bien que le climat fût rigoureux, je garde un souvenir impérissable de cette escapade nordique et je recommande chaleureusement cette destination féerique !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Transports gratuits)",
      prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un débat passionné au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus en augmentant directement leur pouvoir d'achat.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour les collectivités locales. Sans recettes tarifaires, la rénovation, la sécurité et la modernisation des infrastructures risqueraient d'être compromises à long terme.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan environnemental et social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité et la qualité du réseau de transport public."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande d'informations (Atelier culinaire)",
      prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain dans votre établissement. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement personnel.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Article de témoignage (Festival culturel)",
      prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon dernier séjour au Canada, j'ai eu l'immense privilège de participer au prestigieux Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été immédiatement émerveillé par l'atmosphère festive et l'énergie vibrante des milliers de spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux présentés et la convivialité légendaire des Québécois ont rendu cette expérience absolument inoubliable.\n\nEn outre, les dégustations culinaires proposées sur place ont agréablement complété cette escapade. Je recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une expérience festive d'une richesse exceptionnelle que vous ne regretterez pas !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Langues à l'école)",
      prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite d'intenses débats éducatifs et sociétaux à travers le monde.\n\nD'une part, les défenseurs de cette mesure soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des phonèmes et structures linguistiques complexe. De surcroît, une maîtrise précoce des langues étrangères constitue un atout culturel et professionnel indiscutable dans une société globale hautement interconnectée.\n\nD'autre part, les détracteurs mettent en garde contre le risque d'une surcharge des programmes scolaires qui pourrait entraver l'acquisition fondamentale des compétences de base en langue maternelle et en mathématiques.\n\nEn somme, bien que ces réserves soient parfaitement légitimes, je demeure convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle et d'épanouissement personnel indispensable, à condition toutefois d'adapter une pédagogie ludique au rythme d'apprentissage de chaque élève."
    }
  ],
  [
    {
      title: "Tâche 1 : Message formel (Inscription au club de sport)",
      prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame, Monsieur,\n\nJe vous adresse ce courriel afin d'obtenir des informations précises concernant les modalités d'inscription à votre complexe sportif à Montréal pour la saison à venir.\n\nPourriez-vous m'indiquer la diversité des formules d'abonnement disponibles ainsi que les horaires d'ouverture des installations en semaine et le week-end ? Par ailleurs, j'aimerais savoir si une séance d'essai gratuite est envisageable avant tout engagement annuel.\n\nEn vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Compte-rendu (Action bénévole)",
      prompt: "Rédigez un court article pour le bulletin d'information de votre quartier (120 à 150 mots) résumant une journée d'action bénévole.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Samedi dernier, notre quartier a été le théâtre d'une magnifique journée de solidarité consacrée au nettoyage environnemental des berges du parc local. Plus de soixante citoyens enthousiastes de tous âges se sont rassemblés dès le matin munis de gants robustes et de bacs de collecte écologiques.\n\nGrâce à un effort collectif remarquable et à une organisation logistique sans faille, nous avons réussi à récolter plus de trois cents kilos de déchets plastiques et recyclables. Cette journée inspirante s'est ensuite clôturée chaleureusement autour d'un grand pique-nique partagé riche en échanges bienveillants entre voisins.\n\nEn conclusion, cette initiative citoyenne démontre avec force qu'un engagement local concret peut préserver notre cadre de vie commun. Une expérience humaine profondément gratifiante à renouveler impérativement dans les mois à venir !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Télétravail à 100%)",
      prompt: "Le télétravail à 100% est-il bénéfique pour l'épanouissement des salariés et la cohésion d'équipe ? Donnez votre opinion (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La généralisation du télétravail à temps plein transforme aujourd'hui en profondeur l'organisation contemporaine du monde professionnel.\n\nD'un côté, les avantages pour les employés sont indiscutables : élimination des trajets quotidiens stressants, réduction des dépenses de transport et meilleure conciliation entre vie privée et obligations professionnelles. De surcroît, de nombreux salariés rapportent une concentration accrue dans la réalisation de leurs tâches complexes et une autonomie renforcée au quotidien.\n\nCependant, un isolement professionnel prolongé risque d'affaiblir la cohésion d'équipe, d'entraver le transfert informel de connaissances et de détériorer le sentiment d'appartenance à l'entreprise. En outre, la frontière entre sphère personnelle et vie professionnelle devient parfois floue.\n\nEn conclusion, bien que le travail à distance offre une flexibilité appréciable, le modèle hybride combinant harmonieusement présentiel et distanciel me paraît être l'équation optimale pour concilier le bien-être individuel des salariés et la performance collective à long terme."
    }
  ],
  [
    {
      title: "Tâche 1 : Courriel de réclamation (Achat en ligne défectueux)",
      prompt: "Vous avez commandé du matériel informatique mais vous avez reçu un article défectueux. Écrivez au service client (60 à 120 mots) pour réclamer un échange.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Responsable du Service Client,\n\nJe vous écris suite à la réception de ma commande N°84920 contenant un ordinateur portable. À ma grande surprise, l'écran présente un défaut d'affichage majeur dès l'allumage.\n\nLe matériel étant sous garantie, je sollicite par la présente un échange standard ou le remboursement intégral de mon achat. Pourriez-vous me transmettre la procédure de retour ainsi que le bon d'expédition prépayé ?\n\nDans l'attente d'une prise en charge rapide de ma réclamation, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit personnel (Changement de carrière)",
      prompt: "Dans une lettre à un ami collègue (120 à 150 mots), expliquez les raisons qui vous ont poussé à changer de domaine professionnel.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Cher Julien,\n\nJe prends enfin le temps de t'écrire pour partager avec toi une grande nouvelle : j'ai officiellement décidé de réorienter ma carrière professionnelle vers le secteur passionnant des éco-technologies.\n\nAprès dix années stimulantes dans le domaine financier, je ressentais le besoin fondamental de donner davantage de sens à mon quotidien et de contribuer activement à des projets d'innovation durable. J'ai donc suivi avec succès une formation intensive de six mois en gestion de projets environnementaux.\n\nBien que cette transition exige de sortir de ma zone de confort et de relever de nouveaux défis, je me sens immensément motivé par cette aventure. En outre, la diversité des projets me stimule énormément. J'espère que nous pourrons nous retrouver très prochainement pour en discuter de vive voix !\n\nAmicalement,\nMarc"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Interdiction des véhicules à essence)",
      prompt: "Les gouvernements devraient-ils interdire la vente de véhicules thermiques neufs d'ici 2035 ? Présentez votre argumentation (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'interdiction projetée de la vente de véhicules thermiques neufs d'ici 2035 suscite d'intenses débats entre impératifs écologiques vitaux et réalités socio-économiques.\n\nD'une part, les partisans de cette législation rappellent à juste titre que le secteur des transports constitue l'un des principaux émetteurs de gaz à effet de serre. Interdire les moteurs à essence apparaît donc comme une étape indispensable pour accélérer la décarbonation globale de l'économie et assainir durablement la qualité de l'air urbain au bénéfice de la santé publique.\n\nD'autre part, les opposants mettent en avant le coût financier élevé des véhicules électriques et l'insuffisance actuelle des infrastructures de recharge rapide. De surcroît, les répercussions sur l'emploi dans l'industrie automobile classique sont préoccupantes pour de nombreuses régions industrielles.\n\nEn conclusion, bien que la transition vers la mobilité électrique soit inéluctable, sa réussite dépendra d'un soutien financier équitable aux ménages modestes et d'un investissement massif dans les réseaux énergétiques."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de renseignements (Bibliothèque municipale)",
      prompt: "Écrivez à la bibliothèque municipale de votre ville (60 à 120 mots) pour vous renseigner sur les horaires et le prêt numérique.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame la Bibliothécaire,\n\nJe vous adresse ce courriel afin de me renseigner sur les conditions d'adhésion et les services numériques offerts par la bibliothèque municipale.\n\nPourriez-vous me préciser les documents justificatifs requis pour l'établissement de la carte d'usager ainsi que le tarif annuel pour les résidents ? De plus, j'aimerais savoir si votre catalogue de livres numériques est accessible à distance depuis une tablette personnelle.\n\nEn vous remerciant pour vos informations, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Intégration au Québec)",
      prompt: "Racontez vos premiers mois d'installation au Canada dans un billet de blog (120 à 150 mots) en donnant des conseils pratiques aux nouveaux arrivants.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Installé à Montréal depuis maintenant six mois, je souhaite partager mon expérience d'intégration avec les futurs arrivants. Le choc culturel et climatique initial s'est très rapidement dissipé grâce à l'accueil d'une bienveillance remarquable réservé au quotidien par les Québécois.\n\nDès les premières semaines de mon arrivée, je me suis inscrit à des ateliers de réseautage professionnel et j'ai exploré avec passion les différents quartiers de la métropole. Bien que les démarches administratives exigent de la rigueur et de la patience, l'environnement social offre des perspectives d'épanouissement remarquables.\n\nUn conseil fondamental aux futurs immigrants : n'hésitez surtout pas à aller spontanément au-devant des gens et à participer aux activités communautaires locales. C'est la clé absolue d'une intégration harmonieuse, enrichissante et réussie !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Intelligence Artificielle et Emploi)",
      prompt: "L'intelligence artificielle représente-t-elle une menace ou une opportunité majeure pour le marché du travail de demain ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'essor fulgurant des technologies d'intelligence artificielle suscite aujourd'hui de profondes inquiétudes quant à la pérennité du marché de l'emploi mondial.\n\nD'un côté, les détracteurs soulignent à juste titre le risque d'une automatisation massive qui pourrait supprimer de nombreux postes administratifs et techniques, créant une précarité inédite pour les travailleurs dont les tâches sont répétitives et prévisibles.\n\nD'un autre côté, les défenseurs de l'IA rappellent opportunément que chaque révolution technologique génère de nouveaux métiers spécialisés et libère les humains des contraintes exécutives au profit d'activités créatives, stratégiques et relationnelles. De surcroît, l'IA constitue un multiplicateur de productivité sans précédent pour les entreprises modernes du XXIe siècle.\n\nEn somme, l'intelligence artificielle ne doit pas être redoutée mais encadrée par des politiques gouvernementales et institutionnelles très ambitieuses de formation continue afin de garantir une transition numérique inclusive et équitable pour l'ensemble des travailleurs."
    }
  ],
  [
    {
      title: "Tâche 1 : Message d'absence (Congé exceptionnel)",
      prompt: "Écrivez un message à votre responsable hiérarchique (60 à 120 mots) pour demander une autorisation d'absence exceptionnelle de 3 jours.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur le Directeur,\n\nJe vous adresse ce courriel afin de solliciter une autorisation d'absence exceptionnelle de trois jours, du 12 au 14 du mois prochain, pour des raisons familiales impérieuses.\n\nJ'ai pris soin d'avancer mes dossiers en cours et de planifier l'intérim de mes projets avec mon collègue Thomas afin d'éviter tout retard de livraison. Je resterai joignable par courriel en cas d'urgence absolue.\n\nEn vous remerciant par avance pour votre compréhension, je vous prie d'agréer mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Critique culturelle (Exposition d'art)",
      prompt: "Rédigez une critique d'une exposition culturelle ou d'un musée récent auquel vous avez assisté (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Le week-end dernier, j'ai eu le plaisir de visiter la nouvelle exposition immersive consacrée à l'impressionnisme au Musée des Beaux-Arts. Dès l'entrée dans la grande galerie, les projections numériques géantes accompagnées d'une symphonie captivante transportent immédiatement le visiteur au cœur même des œuvres magistrales.\n\nLa scénographie audacieuse et l'éclairage méticuleusement étudié mettent en valeur la texture et la richesse des nuances chromatiques de chaque toile. Ce parcours sensoriel novateur offre ainsi une perspective totalement renouvelée sur l'histoire de l'art classique.\n\nEn outre, la section interactive proposée à la fin du parcours constitue un ajout très ludique. Une visite culturelle incontournable que je recommande chaleureusement à tous les passionnés d'art !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Écrans et réseaux sociaux)",
      prompt: "Faut-il réglementer strictement l'utilisation des téléphones portables et des réseaux sociaux chez les jeunes adolescents ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'omniprésence des smartphones et des plateformes numériques dans le quotidien des adolescents soulève aujourd'hui d'importantes interrogations quant aux risques d'addiction.\n\nD'un côté, les partisans d'une réglementation stricte mettent en garde avec fermeté contre les méfaits du cyberharcèlement, la perturbation du sommeil et la baisse de l'attention scolaire entraînées par l'exposition excessive aux écrans.\n\nD'un autre côté, interdire autoritairement ces technologies semble illusoire à l'ère du numérique. Les réseaux sociaux constituent également d'épatants espaces d'apprentissage interactif, de création artistique et de socialisation pour la jeunesse contemporaine.\n\nEn conclusion, plus qu'une interdiction coercitive, il convient de privilégier une véritable éducation aux médias numériques dès le collège pour accompagner les adolescents vers un usage responsable et équilibré."
    }
  ],
  [
    {
      title: "Tâche 1 : Invitation (Fête des voisins)",
      prompt: "Invitez vos voisins de quartier (60 à 120 mots) à une fête communautaire que vous organisez le mois prochain.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Chers Voisins,\n\nAfin de renforcer les liens de convivialité au sein de notre résidence, j'ai le plaisir de vous inviter à notre traditionnelle fête des voisins qui se tiendra le samedi 15 du mois prochain à partir de 18 heures dans le jardin collectif.\n\nChacun est invité à apporter une spécialité culinaire ou une boisson à partager. Ce sera l'occasion idéale d'accueillir les nouveaux résidents et d'échanger un moment chaleureux.\n\nMerci de bien vouloir me confirmer votre présence avant le 10 afin d'organiser au mieux cet événement !"
    },
    {
      title: "Tâche 2 : Récit d'initiative (Jardin collectif)",
      prompt: "Décrivez la création d'un jardin collectif dans votre quartier (120 à 150 mots) et son impact sur la vie de quartier.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Au printemps dernier, les résidents de notre quartier se sont mobilisés avec enthousiasme pour transformer un terrain vague abandonné en un magnifique jardin potager communautaire. Grâce au précieux soutien municipal et à l'implication de bénévoles de tous âges, nous avons aménagé des parcelles de culture biologiques écologiques.\n\nAujourd'hui, cet espace vert est devenu un véritable lieu de rassemblement intergénérationnel dynamique où voisins échangent conseils d'horticulture, graines et légumes frais dans une atmosphère extrêmement conviviale.\n\nEn outre, ce projet exemplaire a sensiblement renforcé la cohésion sociale de notre communauté. Une réussite citoyenne remarquable qui a revitalisé notre quartier et que nous souhaitons prolonger durablement !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Semaine de 4 jours)",
      prompt: "La semaine de travail de 4 jours devrait-elle être généralisée à l'ensemble des entreprises ? Argumentez votre position (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le passage à la semaine de travail de quatre jours sans diminution de salaire s'impose actuellement comme une expérimentation sociale majeure.\n\nD'un côté, les organisations ayant mis en œuvre ce modèle constatent une baisse spectaculaire du niveau d'épuisement professionnel, une diminution de l'absentéisme et un regain notable de productivité chez les salariés, ce qui compense amplement la journée non travaillée.\n\nCependant, plusieurs secteurs d'activité essentiels comme la santé publique, les transports et les services de secours peineraient à financer la réorganisation complexe des plannings et les recrutements compensatoires nécessaires.\n\nEn conclusion, bien que la semaine de quatre jours offre un équilibre personnel précieux, sa généralisation doit s'effectuer avec flexibilité et s'adapter aux réalités spécifiques de chaque secteur d'activité."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de réservation (Chalet à la montagne)",
      prompt: "Écrivez un courriel à un propriétaire de chalet (60 à 120 mots) pour réserver un séjour en famille pendant les vacances d'hiver.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur,\n\nJe vous adresse ce courriel afin de me renseigner sur la disponibilité de votre chalet à Mont-Tremblant pour la semaine du 10 au 17 février pour une famille de cinq personnes.\n\nPourriez-vous me confirmer le tarif total de la location ainsi que le montant du dépôt de garantie ? De plus, j'aimerais savoir si le chalet dispose d'un espace de rangement sécurisé pour les équipements de ski.\n\nDans l'attente de vos précisions, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Formation professionnelle)",
      prompt: "Racontez une formation continue récente que vous avez suivie (120 à 150 mots) et expliquez ses apports concrets.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "J'ai récemment suivi une formation continue intensive consacrée au marketing numérique et à l'analyse des médias sociaux. Durant deux semaines particulièrement stimulantes, des formateurs expérimentés nous ont enseigné les dernières méthodologies d'optimisation de campagnes web et de stratégie de contenu.\n\nGrâce aux cas pratiques traités en équipe et aux outils modernes manipulés en atelier, j'ai pu acquérir des compétences techniques immédiatement transposables dans mon activité quotidienne. Cela m'a permis d'augmenter le taux d'engagement en ligne de mon entreprise de plus de trente pour cent.\n\nEn outre, cette expérience m'a donné un véritable élan professionnel. Une formation hautement enrichissante que je recommande vivement à tout professionnel souhaitant faire évoluer sa carrière !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Consommation de produits locaux)",
      prompt: "Acheter exclusivement des produits alimentaires locaux et de saison est-il un objectif réaliste pour tous les ménages ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La promotion du locavorisme, qui préconise la consommation exclusive de denrées alimentaires produites localement, suscite un intérêt croissant face aux défis écologiques contemporains.\n\nD'une part, privilégier les circuits de distribution courts permet de soutenir concrètement l'économie agricole régionale et de réduire de manière drastique les émissions de carbone liées au transport international des marchandises.\n\nD'autre part, exiger le 100% local se heurte à des contraintes budgétaires majeures pour les ménages à revenus modestes, les produits issus d'exploitations locales étant souvent plus coûteux. De surcroît, la variété alimentaire en période hivernale s'avère restreinte sous les climats nordiques.\n\nEn somme, bien que la consommation locale représente un idéal vertueux, elle doit s'inscrire dans une démarche pragmatique sans devenir une contrainte financière inaccessible."
    }
  ],
  [
    {
      title: "Tâche 1 : Remerciement formel (Fin de stage)",
      prompt: "Rédigez un courriel de remerciement à votre maître de stage (60 à 120 mots) à la fin de votre période en entreprise.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nAlors que mon stage au sein de votre entreprise touche à sa fin, je tiens à vous exprimer ma sincère gratitude pour l'accueil chaleureux et la confiance que vous m'avez accordés tout au long de ces trois mois.\n\nCette expérience professionnelle m'a permis d'approfondir mes connaissances pratiques et de développer des compétences solides en gestion de projets. Je remercie également toute l'équipe pour sa disponibilité et ses précieux conseils.\n\nEn vous souhaitant une excellente continuation, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit d'événement (Marathon de Montréal)",
      prompt: "Décrivez votre participation ou votre soutien lors d'un événement sportif populaire (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Dimanche dernier, j'ai eu l'immense bonheur de participer au Marathon de Montréal aux côtés de milliers de coureurs passionnés venus du monde entier. Le parcours pittoresque sillonnait les plus emblématiques quartiers de la métropole sous les encouragements vifs d'une foule nombreuse et enthousiaste.\n\nBien que la seconde moitié du parcours ait exigé un effort physique particulièrement intense, l'énergie collective formidable et les fanfares musicales réparties le long du trajet m'ont transcendé jusqu'à la ligne d'arrivée.\n\nEn outre, cette épreuve exigeante m'a permis de dépasser mes limites personnelles. Franchir l'arrivée après quarante-deux kilomètres d'effort reste un moment d'intense fierté et une aventure sportive inoubliable !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Quotas touristiques)",
      prompt: "Faut-il imposer des quotas stricts d'accès à certains sites naturels et patrimoniaux pour protéger la planète ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Face aux dégradations entraînées par le surtourisme de masse, la mise en place de quotas d'accès aux sites naturels et patrimoniaux suscite d'importants débats.\n\nD'un côté, les écologistes soulignent à juste titre que la surfréquentation touristique détruit irréversiblement les écosystèmes fragiles, accélère l'érosion des monuments historiques et nuit à la quiétude des résidents locaux. Limiter le nombre de visiteurs quotidiens constitue donc le seul moyen efficace de préserver ces trésors pour les générations futures.\n\nD'un autre côté, les acteurs économiques redoutent des baisses de revenus dévastatrices et dénoncent une mesure inégalitaire qui risquerait de réserver la culture aux publics privilégiés.\n\nEn conclusion, bien que la régulation des flux touristiques soit devenue indispensable, elle doit s'accompagner d'une promotion active du tourisme écoresponsable."
    }
  ],
  [
    {
      title: "Tâche 1 : Proposition de partenariat (Association locale)",
      prompt: "Proposez un partenariat commercial à un commerce de quartier au nom de votre association étudiante (60 à 120 mots).",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Gérant,\n\nAu nom de l'association étudiante de l'Université de Montréal, je vous écris afin de vous proposer un partenariat commercial à l'occasion de notre rentrée universitaire.\n\nNous souhaiterions offrir à nos 500 membres des réductions exclusives dans votre établissement en échange d'une visibilité prioritaire sur nos réseaux sociaux et nos supports de communication.\n\nSeriez-vous disponible la semaine prochaine pour une courte rencontre afin d'échanger sur cette opportunité mutually bénéfique ?\n\nDans l'attente de votre réponse, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Résumé de conférence (Développement durable)",
      prompt: "Rédigez le compte-rendu d'une conférence publique sur la transition écologique (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Hier soir, l'Hôtel de Ville accueillait une conférence captivante consacrée aux stratégies de transition écologique dans les grandes métropoles. Trois experts renommés ont présenté des solutions innovantes axées sur la rénovation thermique des bâtiments et la mobilité douce.\n\nLes intervenants ont insisté sur l'urgence d'une action concertée entre citoyens, entreprises et collectivités territoriales pour atteindre la neutralité carbone d'ici 2050.\n\nCette présentation claire et inspirante s'est conclue par un débat passionnant avec le public, démontrant une prise de conscience collective prometteuse pour notre avenir urbain !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Université gratuite)",
      prompt: "L'accès aux études supérieures devrait-il être entièrement gratuit et financé par l'État pour tous les étudiants ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le débat sur la gratuité totale de l'enseignement supérieur ravive les discussions autour de l'égalité des chances et du financement public.\n\nD'une part, garantir la gratuité universitaire permettrait d'éliminer les barrières financières qui freinent l'accès des jeunes issus de milieux défavorisés aux diplômes du supérieur, favorisant ainsi une méritocratie réelle et la mobilité sociale.\n\nD'autre part, la gratuité universelle représenterait un coût budgétaire colossal pour l'État, risquant de dégrader la qualité des infrastructures et du corps professoral sans financement privé complémentaire.\n\nEn conclusion, l'accès à l'université doit être garanti à tous, mais une gratuité ciblée sous forme de bourses sociales élevées me semble plus équitable qu'une gratuité aveugle bénéficiant également aux ménages aisés."
    }
  ]
];

let _cachedRegistry: ExamPaper[] | null = null;

export function getExamRegistry(): ExamPaper[] {
  if (_cachedRegistry) return _cachedRegistry;
  const registry: ExamPaper[] = [];

  // Generate 10 TCF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;
    const writingSet = TCF_WRITING_SUITE[i - 1];

    // Different question pool seed offset for Real Exam Mode to guarantee ZERO cheating
    const seedOffset = isPractice ? (i * 3) : (i * 7 + 13);

    registry.push({
      id: isPractice ? `tcf-canada-practice-paper-${paperNum}` : `tcf-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TCF Canada Guided Practice Paper ${paperNum}` : `TCF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TCF-PRAC-${numStr}` : `TCF-EXAM-${numStr}`,
      type: "TCF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper with step-by-step hints, audio transcripts, and 2-attempt answer validation (84 Items / 119 Mins).`
        : `Strict official FEI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 119 Mins).`,
      totalDurationMins: 119,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
          durationMins: 35,
          totalQuestions: 39,
          questions: generateListeningQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 39,
          questions: generateReadingQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 3,
          writingTasks: writingSet.map((wt, idx) => ({
            id: `tcf${i}-w${idx + 1}`,
            taskNumber: idx + 1,
            title: wt.title,
            prompt: wt.prompt,
            wordCountMin: wt.min,
            wordCountMax: wt.max,
            timeLimitMins: wt.time,
            guidedTips: ["Introduction claire", "Présenter 2 arguments développés", "Conclusion synthétique avec prise de position"],
            sampleResponse: wt.sampleResponse
          }))
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
          durationMins: 12,
          totalQuestions: 3,
          speakingTasks: [
            {
              id: `tcf${i}-spk-1`,
              taskNumber: 1,
              title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
              scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
              prepTimeMins: 0,
              speakingTimeMins: 2,
              keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est..."]
            },
            {
              id: `tcf${i}-spk-2`,
              taskNumber: 2,
              title: "Tâche 2 : Exercice en interaction (Recherche d'informations)",
              scenario: `Vous souhaitez obtenir des informations sur un service public au Québec (Sujet épreuve ${i}). Posez au moins 5 questions à l'examinateur sur les conditions d'accès, tarifs et démarches.`,
              prepTimeMins: 1,
              speakingTimeMins: 3.5,
              keyPhrases: ["Quels sont les documents requis ?", "Combien coûte l'inscription ?", "Est-il possible de faire les démarches en ligne ?"]
            },
            {
              id: `tcf${i}-spk-3`,
              taskNumber: 3,
              title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
              scenario: `Exprimez et défendez votre opinion à l'examinateur sur l'impact de la numérisation des services publics dans la société actuelle.`,
              prepTimeMins: 1,
              speakingTimeMins: 4.5,
              keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "Pour conclure, je dirais que..."]
            }
          ]
        }
      ]
    });
  }

  // Generate 10 TEF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;

    // Distinct seed offset for Real Exam Mode
    const seedOffset = isPractice ? (i * 4) : (i * 9 + 17);

    registry.push({
      id: isPractice ? `tef-canada-practice-paper-${paperNum}` : `tef-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TEF Canada Guided Practice Paper ${paperNum}` : `TEF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TEF-PRAC-${numStr}` : `TEF-EXAM-${numStr}`,
      type: "TEF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper tailored for TEF Canada Paris Chamber of Commerce (CCI) standards with hints and transcripts (84 Items / 135 Mins).`
        : `Strict official CCI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 135 Mins).`,
      totalDurationMins: 135,
      isSamplePaper: isPractice,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
          durationMins: 40,
          totalQuestions: 40,
          questions: generateListeningQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 40,
          questions: generateReadingQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 2,
          writingTasks: [
            {
              id: `tef${i}-w1`,
              taskNumber: 1,
              title: "Section A : Article de Fait Divers (Newspaper Continuation)",
              prompt: `Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un événement inattendu a perturbé le centre-ville de Montréal (Sujet épreuve ${i})...'`,
              wordCountMin: 80,
              wordCountMax: 120,
              timeLimitMins: 25,
              guidedTips: ["Employer le passé composé et l'imparfait", "Décrire la réaction des passants et des secours", "Conclure par un retour au calme"]
            },
            {
              id: `tef${i}-w2`,
              taskNumber: 2,
              title: "Section B : Lettre d'opinion persuasive (Letter to Editor / Mayor)",
              prompt: `Rédigez une lettre d'opinion au journal local (200 mots minimum) pour exprimer votre accord ou désaccord sur l'aménagement de nouvelles pistes cyclables au détriment des voies de stationnement.`,
              wordCountMin: 200,
              wordCountMax: 250,
              timeLimitMins: 35,
              guidedTips: ["Salutation formelle", "Présenter 2 arguments environnementaux et de sécurité", "Conclure par une formule de politesse adaptée"]
            }
          ]
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
          durationMins: 15,
          totalQuestions: 2,
          speakingTasks: [
            {
              id: `tef${i}-spk-1`,
              taskNumber: 1,
              title: "Section A : Demande d'informations (10 Questions)",
              scenario: `Vous voyez une annonce pour une offre d'emploi ou un service à mi-temps. Appelez le responsable pour poser au moins 10 questions précises sur le poste (Épreuve ${i}).`,
              prepTimeMins: 0,
              speakingTimeMins: 5,
              keyPhrases: ["Quelles sont les compétences requises ?", "Quel est le salaire horaire proposé ?", "Quand commence le contrat ?"]
            },
            {
              id: `tef${i}-spk-2`,
              taskNumber: 2,
              title: "Section B : Convaincre un ami (Persuasive Speaking)",
              scenario: `Un ami hésite à s'inscrire à une aventure sportive ou culturelle ce week-end. Convainquez-le d'accepter cette opportunité avec vous (Épreuve ${i}).`,
              prepTimeMins: 1,
              speakingTimeMins: 10,
              keyPhrases: ["Pense à tous les bénéfices !", "Je m'occupe de la logistique.", "C'est le moment idéal de tenter l'expérience."]
            }
          ]
        }
      ]
    });
  }

  _cachedRegistry = registry;
  return registry;
}

export interface NCLCScoreResult {
  nclcLevel: number; // 1 to 12
  cefrEquivalent: string; // A1, A2, B1, B2, C1, C2
  expressEntryPoints: number; // CLB points for Express Entry
  statusMessage: string;
  isNCLC7TargetReached: boolean;
}

export function calculateNCLCScore(pctScore: number, _examType: ExamType, sectionType?: SectionType): NCLCScoreResult {
  const pct = Math.max(0, Math.min(100, pctScore));
  let nclcLevel = 0;
  let cefrEquivalent = "Unrated";
  let expressEntryPoints = 0;
  let isNCLC7TargetReached = false;

  if (pct === 0) {
    nclcLevel = 0;
    cefrEquivalent = "Unrated";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  } else if (sectionType === "EXPRESSION_ECRITE" || sectionType === "EXPRESSION_ORALE") {
    // Official 20-Point Scale Cutoffs for Writing & Speaking (FEI / Paris Standards)
    if (pct >= 90.0) { // 18-20 / 20 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 80.0) { // 16-17 / 20 (C1 Advanced)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 70.0) { // 14-16 / 20 (B2 Upper Vantage)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 60.0) { // 12-13 / 20 (B2 Target Benchmark)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 50.0) { // 10-11 / 20 (B1 Intermediate)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 40.0) { // 8-9 / 20 (B1 Threshold)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.0) { // 5-7 / 20 (A2 Elementary)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // 1-4 / 20 (A1 Beginner)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  } else {
    // Official 39-Item Scale Cutoffs for Listening & Reading
    if (pct >= 89.7) { // 35-39 / 39 (C2 Mastery)
      nclcLevel = 10;
      cefrEquivalent = "C2";
      expressEntryPoints = 34;
      isNCLC7TargetReached = true;
    } else if (pct >= 82.0) { // 32-34 / 39 (NCLC 9 C1 Advanced - 31 CRS Points)
      nclcLevel = 9;
      cefrEquivalent = "C1";
      expressEntryPoints = 31;
      isNCLC7TargetReached = true;
    } else if (pct >= 69.2) { // 27-31 / 39 (NCLC 8 B2 Upper - 23 CRS Points)
      nclcLevel = 8;
      cefrEquivalent = "B2";
      expressEntryPoints = 23;
      isNCLC7TargetReached = true;
    } else if (pct >= 58.9) { // 23-27 / 39 (NCLC 7 B2 Target Benchmark for Express Entry - 17 CRS Points)
      nclcLevel = 7;
      cefrEquivalent = "B2";
      expressEntryPoints = 17;
      isNCLC7TargetReached = true;
    } else if (pct >= 46.1) { // 18-22 / 39 (NCLC 6 B1 Intermediate - 12 CRS Points)
      nclcLevel = 6;
      cefrEquivalent = "B1";
      expressEntryPoints = 12;
      isNCLC7TargetReached = false;
    } else if (pct >= 35.8) { // 14-17 / 39 (NCLC 5 B1 Threshold - 6 CRS Points)
      nclcLevel = 5;
      cefrEquivalent = "B1";
      expressEntryPoints = 6;
      isNCLC7TargetReached = false;
    } else if (pct >= 25.6) { // 10-13 / 39 (NCLC 4 A2 Elementary - 0 CRS Points)
      nclcLevel = 4;
      cefrEquivalent = "A2";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    } else { // < 10 / 39 (NCLC 3 A1 - 0 CRS Points)
      nclcLevel = 3;
      cefrEquivalent = "A1";
      expressEntryPoints = 0;
      isNCLC7TargetReached = false;
    }
  }

  const statusMessage = pct === 0
    ? `⚠️ No questions attempted or 0% score recorded. Please complete the test questions in each section to receive a diagnostic NCLC rating.`
    : isNCLC7TargetReached
    ? `🎉 Excellent! Score achieves NCLC ${nclcLevel} (${cefrEquivalent}) — Meets Canadian Express Entry PR Benchmark!`
    : `💪 NCLC ${nclcLevel} (${cefrEquivalent}) recorded. Aim for 23/39 (58.9%+) to hit the official NCLC 7 (B2) immigration benchmark.`;

  return {
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    statusMessage,
    isNCLC7TargetReached
  };
}
