/**
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

export const TEF_PAPER_1_LISTENING_ITEMS: TefListeningItem[] = [
  {
    "id": "tef-p1-co-q01",
    "paperNumber": 1,
    "questionNumber": 1,
    "typology": "DESSINS",
    "level": "A1",
    "title": "Gare ferroviaire — Renseignement de quai",
    "speakingRate": 0.92,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Voyageur",
      "Agente"
    ],
    "speakerPersonas": [
      { "role": "Voyageur", "gender": "male", "voiceId": "fr-FR-HenriNeural" },
      { "role": "Agente", "gender": "female", "voiceId": "fr-CA-SylvieNeural" }
    ],
    "audioFr": "Voyageur : Bonjour madame, excusez-moi, est-ce que le train pour Québec part bien de la voie 4 ?\nAgente : Bonjour monsieur. Non, attention, il y a eu un changement d'affichage. Il partira de la voie 7 dans dix minutes.",
    "audioEn": "Traveler: Hello ma'am, excuse me, is the train for Quebec City really departing from platform 4?\nStation Agent: Hello sir. No, watch out, there was a display change. It will depart from platform 7 in ten minutes.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A",
      "Dessin B",
      "Dessin C",
      "Dessin D"
    ],
    "optionsEn": [
      "Drawing A",
      "Drawing B",
      "Drawing C",
      "Drawing D"
    ],
    "correctIndex": 0,
    "mainImage": "/illustrations/tef/tef_p1_q1_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p1_q1_a.png",
      "/illustrations/tef/tef_p1_q1_b.png",
      "/illustrations/tef/tef_p1_q1_c.png",
      "/illustrations/tef/tef_p1_q1_d.png"
    ]
  },
  {
    "id": "tef-p1-co-q02",
    "paperNumber": 1,
    "questionNumber": 2,
    "typology": "DESSINS",
    "level": "A1",
    "title": "Boulangerie — Commande matinale",
    "speakingRate": 0.92,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Cliente",
      "Boulanger"
    ],
    "speakerPersonas": [
      { "role": "Cliente", "gender": "female", "voiceId": "fr-FR-DeniseNeural" },
      { "role": "Boulanger", "gender": "male", "voiceId": "fr-FR-HenriNeural" }
    ],
    "audioFr": "Cliente : Bonjour monsieur, je vais prendre deux baguettes bien cuites et trois croissants au beurre, s'il vous plaît.\nBoulanger : Très bien madame. Et avec ceci, ce sera tout pour aujourd'hui ?",
    "audioEn": "Customer: Hello sir, I'll take two well-done baguettes and three butter croissants, please.\nBaker: Very good ma'am. And along with this, will that be all for today?",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A",
      "Dessin B",
      "Dessin C",
      "Dessin D"
    ],
    "optionsEn": [
      "Drawing A",
      "Drawing B",
      "Drawing C",
      "Drawing D"
    ],
    "correctIndex": 1,
    "mainImage": "/illustrations/tef/tef_p1_q2_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p1_q2_b.png",
      "/illustrations/tef/tef_p1_q2_a.png",
      "/illustrations/tef/tef_p1_q2_c.png",
      "/illustrations/tef/tef_p1_q2_d.png"
    ]
  },
  {
    "id": "tef-p1-co-q03",
    "paperNumber": 1,
    "questionNumber": 3,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Cabinet médical — Accueil et orientation",
    "speakingRate": 0.92,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Patient",
      "Secrétaire médicale"
    ],
    "speakerPersonas": [
      { "role": "Patient", "gender": "male", "voiceId": "fr-FR-HenriNeural" },
      { "role": "Secrétaire médicale", "gender": "female", "voiceId": "fr-FR-VivienneMultilingualNeural" }
    ],
    "audioFr": "Patient : Bonjour, j'ai rendez-vous avec le docteur Laurent à 14 heures 30 pour mon rappel de vaccin.\nSecrétaire : Bonjour. Veuillez patienter dans la salle d'attente à droite, le médecin va venir vous chercher.",
    "audioEn": "Patient: Hello, I have an appointment with Dr. Laurent at 2:30 PM for my booster vaccine.\nSecretary: Hello. Please wait in the waiting room to the right, the doctor will come to fetch you shortly.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A",
      "Dessin B",
      "Dessin C",
      "Dessin D"
    ],
    "optionsEn": [
      "Drawing A",
      "Drawing B",
      "Drawing C",
      "Drawing D"
    ],
    "correctIndex": 2,
    "mainImage": "/illustrations/tef/tef_p1_q3_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p1_q3_b.png",
      "/illustrations/tef/tef_p1_q3_c.png",
      "/illustrations/tef/tef_p1_q3_a.png",
      "/illustrations/tef/tef_p1_q3_d.png"
    ]
  },
  {
    "id": "tef-p1-co-q04",
    "paperNumber": 1,
    "questionNumber": 4,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Atelier de cycle — Diagnostic de freinage",
    "speakingRate": 0.92,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Cycliste",
      "Mécanicien vélo"
    ],
    "speakerPersonas": [
      { "role": "Cycliste", "gender": "male", "voiceId": "fr-FR-HenriNeural" },
      { "role": "Mécanicien vélo", "gender": "male", "voiceId": "fr-FR-RemyMultilingualNeural" }
    ],
    "audioFr": "Cycliste : Bonjour, le câble de mon frein arrière s'est détendu ce matin en venant au travail. Vous pourriez y jeter un coup d'œil ?\nMécanicien : Laissez-moi votre bicyclette pour l'après-midi, je remplace le câble et vérifie la tension des patins.",
    "audioEn": "Cyclist: Hello, the cable on my rear brake became loose this morning while biking to work. Could you take a look at it?\nMechanic: Leave your bicycle with me for the afternoon, I will replace the cable and verify the brake pad tension.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A",
      "Dessin B",
      "Dessin C",
      "Dessin D"
    ],
    "optionsEn": [
      "Drawing A",
      "Drawing B",
      "Drawing C",
      "Drawing D"
    ],
    "correctIndex": 3,
    "mainImage": "/illustrations/tef/tef_p1_q4_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p1_q4_b.png",
      "/illustrations/tef/tef_p1_q4_c.png",
      "/illustrations/tef/tef_p1_q4_d.png",
      "/illustrations/tef/tef_p1_q4_a.png"
    ]
  },
  {
    "id": "tef-p1-co-q05",
    "paperNumber": 1,
    "questionNumber": 5,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Répondeur — Agence immobilière",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Agent immobilier"
    ],
    "audioFr": "Bonjour monsieur Tremblay, c'est l'agence Habitation Plus. Je vous appelle au sujet de la visite du trois-pièces prévue ce vendredi à 17 heures. Le propriétaire ayant un empêchement professionnel, nous devrons décaler le rendez-vous à samedi matin 10 heures. Merci de me rappeler pour me confirmer votre disponibilité.",
    "audioEn": "Hello Mr. Tremblay, this is Habitation Plus Real Estate Agency. I am calling regarding the two-bedroom apartment visit scheduled for this Friday at 5 PM. As the owner has a work conflict, we must reschedule the visit to Saturday morning at 10 AM. Please call me back to confirm your availability.",
    "questionFr": "Quel est le motif principal de ce message téléphonique ?",
    "questionEn": "What is the primary reason for this phone message?",
    "optionsFr": [
      "Informer le locataire d'une augmentation de son loyer mensuel",
      "Repousser l'horaire d'une visite de logement à une date ultérieure",
      "Annuler définitivement la vente d'un bien immobilier",
      "Confirmer la signature d'un bail commercial au bureau"
    ],
    "optionsEn": [
      "Informing a tenant of an increase in monthly rent",
      "Postponing an apartment viewing to a later date",
      "Permanently canceling the sale of real estate property",
      "Confirming the signing of a commercial lease at the office"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q06",
    "paperNumber": 1,
    "questionNumber": 6,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Annonce en gare — Alerte de circulation",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Voix d'annonce de gare"
    ],
    "audioFr": "Chers voyageurs, votre attention s'il vous plaît. En raison d'un dysfonctionnement de la signalisation en amont, le train express régional numéro 5420 à destination de Sherbrooke subira un retard d'environ vingt minutes. Nous vous invitons à rester à l'écoute des prochaines annonces.",
    "audioEn": "Dear passengers, your attention please. Due to a signaling malfunction up the line, regional express train number 5420 bound for Sherbrooke will experience an approximate twenty-minute delay. We invite you to stay tuned for further announcements.",
    "questionFr": "Quelle perturbation est annoncée aux voyageurs ?",
    "questionEn": "What disruption is announced to the travelers?",
    "optionsFr": [
      "L'obligation de changer de rame au cours du trajet",
      "L'annulation complète de la liaison ferroviaire pour la journée",
      "Un départ différé provoqué par une anomalie technique",
      "Une grève générale de l'ensemble du personnel de bord"
    ],
    "optionsEn": [
      "The requirement to transfer train cars during the journey",
      "The complete cancellation of the rail connection for the day",
      "A delayed departure caused by a technical anomaly",
      "A general strike by all onboard railway personnel"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q07",
    "paperNumber": 1,
    "questionNumber": 7,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Répondeur — Garage mécanique",
    "speakingRate": 0.96,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chef d'atelier"
    ],
    "audioFr": "Bonjour madame Roy, ici le garage Central. Nous avons inspecté votre véhicule ce matin. En plus des plaquettes usées, nous avons constaté une fuite sur le circuit de refroidissement. Le devis total s'élève à 420 dollars pièces et main-d'œuvre comprises. Nous attendons votre feu vert avant d'engager les réparations.",
    "audioEn": "Hello Mrs. Roy, Central Garage here. We inspected your vehicle this morning. In addition to worn brake pads, we noticed a leak in the cooling circuit. The total estimate comes to 420 dollars parts and labor included. We await your go-ahead before beginning repairs.",
    "questionFr": "Qu'attend le garagiste de la part de la cliente ?",
    "questionEn": "What does the mechanic expect from the customer?",
    "optionsFr": [
      "Son accord préalable sur le montant des travaux supplémentaires",
      "Le règlement immédiat de la facture par virement bancaire",
      "La récupération sans délai de sa voiture avant la fermeture",
      "Le dépôt des clés de secours à l'accueil du garage"
    ],
    "optionsEn": [
      "Her prior approval regarding the cost of additional repair work",
      "Immediate settlement of the invoice by bank wire transfer",
      "Immediate pickup of her vehicle prior to closing time",
      "Dropping off the spare keys at the garage reception desk"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q08",
    "paperNumber": 1,
    "questionNumber": 8,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Annonce en grand magasin — Clôture nocturne",
    "speakingRate": 0.96,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Hôtesse d'accueil magasin"
    ],
    "audioFr": "Chères clientes, chers clients, notre magasin fermera ses portes dans un quart d'heure. Nous vous prions de bien vouloir vous diriger dès à présent vers les caisses centrales situées au rez-de-chaussée pour régler vos achats. Les cabines d'essayage sont désormais inaccessibles.",
    "audioEn": "Dear customers, our store will close its doors in fifteen minutes. Please proceed right now to the central registers located on the ground floor to settle your purchases. Fitting rooms are now closed.",
    "questionFr": "Quelle consigne immédiate est donnée aux acheteurs ?",
    "questionEn": "What immediate instruction is given to shoppers?",
    "optionsFr": [
      "Demander un bon d'achat au service clientèle",
      "Déposer leurs articles aux cabines d'essayage",
      "Quitter le bâtiment sans effectuer de règlements",
      "Se rendre sans attendre aux caisses de paiement"
    ],
    "optionsEn": [
      "Request a store voucher from customer support",
      "Leave their clothing items inside the fitting rooms",
      "Evacuate the building without paying for goods",
      "Proceed immediately to the checkout registers"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q09",
    "paperNumber": 1,
    "questionNumber": 9,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Message de collègue — Réunion de service",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Collègue de bureau"
    ],
    "audioFr": "Salut Éric, c'est Sophie. La directrice financière doit prendre un vol imprévu demain après-midi. Par conséquent, notre point de cadrage budgétaire est avancé à 9 heures demain matin en salle B, au lieu de 15 heures. N'oublie pas d'imprimer les tableaux de synthèse des dépenses du troisième trimestre.",
    "audioEn": "Hi Eric, it's Sophie. The financial director has an unexpected flight tomorrow afternoon. Consequently, our budget alignment meeting is moved up to 9 AM tomorrow morning in Room B instead of 3 PM. Don't forget to print the third-quarter expenditure summary tables.",
    "questionFr": "Quelle modification d'organisation professionnelle est signalée ?",
    "questionEn": "What workplace scheduling modification is reported?",
    "optionsFr": [
      "L'annulation définitive de l'examen des comptes trimestriels",
      "L'avancement de l'horaire d'un rassemblement d'équipe",
      "Le départ en congé prolongé de la directrice financière",
      "Le report de la rencontre à la fin de la semaine suivante"
    ],
    "optionsEn": [
      "Permanent cancellation of the quarterly account review",
      "Moving forward the time of a team alignment meeting",
      "The finance director going on an extended leave of absence",
      "Postponing the meeting to the end of next week"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q10",
    "paperNumber": 1,
    "questionNumber": 10,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Annonce aéroportuaire — Embarquement",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Agent d'escale aéroportuaire"
    ],
    "audioFr": "Dernier appel pour les passagers du vol Air France 364 à destination de Montréal-Trudeau. L'embarquement s'effectue immédiatement porte B22. Nous rappelons aux voyageurs que tous les bagages cabine non étiquetés devront être enregistrés en soute sans frais supplémentaires.",
    "audioEn": "Final call for passengers on Air France flight 364 bound for Montreal-Trudeau. Boarding is taking place immediately at Gate B22. We remind travelers that all unlabeled cabin bags must be checked into the hold at no additional charge.",
    "questionFr": "Quelle exigence concerne les bagages des voyageurs ?",
    "questionEn": "What requirement applies to travelers' luggage?",
    "optionsFr": [
      "La limitation stricte à un seul bagage pour les enfants",
      "Le paiement d'un supplément tarifaire pour tout sac à main",
      "L'interdiction formelle de transporter des liquides en cabine",
      "L'enregistrement gratuit en soute en l'absence d'étiquette"
    ],
    "optionsEn": [
      "A strict restriction to a single bag allowance for children",
      "Payment of a surcharge fee for all personal hand baggage",
      "Strict ban on transporting any liquids inside the cabin",
      "Complimentary cargo hold check-in if lacking an identification tag"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q11",
    "paperNumber": 1,
    "questionNumber": 11,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Répondeur — École municipale des sports",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Coordinateur périscolaire"
    ],
    "audioFr": "Bonjour, ici le secrétariat des sports de la ville. Nous vous confirmons que les inscriptions aux cours de natation du mercredi après-midi débuteront lundi prochain dès 8 heures sur le portail citoyen. Attention, les certificats médicaux de non-contre-indication datant de moins de trois mois devront impérativement être téléversés lors de la saisie.",
    "audioEn": "Hello, this is the municipal sports office. We confirm that registrations for Wednesday afternoon swim lessons will open next Monday at 8 AM on the citizen portal. Please note, medical fitness certificates dated under three months must be uploaded during submission.",
    "questionFr": "Quelle formalité est exigée pour valider l'inscription ?",
    "questionEn": "What prerequisite is required to validate registration?",
    "optionsFr": [
      "La transmission en ligne d'une attestation de santé récente",
      "Le paiement exclusif en espèces au guichet de la piscine",
      "La possession d'un brevet de secourisme aquatique avancé",
      "La participation préalable à une séance d'essai obligatoire"
    ],
    "optionsEn": [
      "Online upload of a recent medical health certificate",
      "Payment strictly in physical cash at the swimming pool desk",
      "Possession of an advanced aquatic lifesaving certification",
      "Mandatory prior attendance at a trial swimming session"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q12",
    "paperNumber": 1,
    "questionNumber": 12,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Répondeur — Clinique dentaire",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Assistante dentaire"
    ],
    "audioFr": "Bonjour monsieur Mercier, cabinet dentaire du Parc. Le praticien ayant une intervention chirurgicale imprévue jeudi matin, nous devons reporter votre détartrage. En contrepartie, nous pouvons vous intégrer sur un créneau prioritaire ce vendredi à 11 heures ou lundi prochain à 16 heures. Rappelez notre standard pour nous indiquer votre choix.",
    "audioEn": "Hello Mr. Mercier, Parc Dental Clinic. As the dentist has an unforeseen surgical procedure on Thursday morning, we must reschedule your teeth cleaning. In return, we can fit you into a priority slot this Friday at 11 AM or next Monday at 4 PM. Please call our desk back to indicate your choice.",
    "questionFr": "Quelle solution le cabinet médical soumet-il au patient ?",
    "questionEn": "What solution does the clinic propose to the patient?",
    "optionsFr": [
      "La prescription d'antidouleurs en attendant sa venue",
      "Une réorientation vers un confrère d'une autre commune",
      "Deux alternatives d'horaires pour reprogrammer son soin",
      "Une remise financière sur sa prochaine consultation"
    ],
    "optionsEn": [
      "Prescription of painkillers pending his upcoming appointment",
      "Referral to an outside practitioner in another municipality",
      "Two schedule alternatives to reschedule his routine appointment",
      "A financial discount on his subsequent dental consultation"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q13",
    "paperNumber": 1,
    "questionNumber": 13,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-trottoir — Avis de Julien (Cycliste urbain)",
    "speakingRate": 1,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Julien"
    ],
    "audioFr": "Journaliste : Que pensez-vous de la piétonnisation intégrale de l'hypercentre d'ici deux ans ?\nJulien : Pour moi, c'est une libération indispensable ! Fini le vacarme permanent, la pollution de l'air étouffante et la peur de se faire renverser à chaque coin de rue. Les rues appartiennent aux piétons et aux vélos.",
    "audioEn": "Journalist: What do you think about the complete pedestrianization of the downtown core within two years?\nJulien: For me, it is an indispensable liberation! No more permanent din, stifling air pollution, and fear of being hit at every corner. Streets belong to pedestrians and bikes.",
    "questionFr": "Quelle est l'opinion de Julien au sujet de cette mesure urbaine ?",
    "questionEn": "What is Julien's opinion regarding this urban policy?",
    "optionsFr": [
      "Il estime que le projet est prématuré et manque de concertation",
      "Il y est totalement favorable en raison des gains environnementaux et de sécurité",
      "Il craint une dégradation rapide de l'attractivité des commerces",
      "Il propose de limiter l'interdiction aux seuls jours de week-end"
    ],
    "optionsEn": [
      "He believes the project is premature and lacks public consultation",
      "He is completely supportive due to environmental and safety gains",
      "He fears a rapid decline in commercial retail vitality",
      "He suggests restricting the ban strictly to weekend days"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q14",
    "paperNumber": 1,
    "questionNumber": 14,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-trottoir — Avis de Chantal (Commerçante de quartier)",
    "speakingRate": 1,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Chantal"
    ],
    "audioFr": "Journaliste : Madame, et de votre côté, comment accueillez-vous la suppression du trafic automobile ?\nChantal : C'est une catastrophe annoncée pour le petit commerce ! Nos clients viennent souvent de banlieue pour charger des colis volumineux. Si on leur supprime le stationnement, ils iront tous dans les centres commerciaux en périphérie et nous mettrons la clé sous la porte.",
    "audioEn": "Journalist: Ma'am, on your end, how do you welcome the elimination of vehicular traffic?\nChantal: It is a foretold disaster for independent retail! Our customers often come from suburbs to pick up bulky parcels. If street parking is removed, they will all go to suburban shopping malls and we will be forced out of business.",
    "questionFr": "Quelle est la position de Chantal sur cette réglementation ?",
    "questionEn": "What is Chantal's position on this regulation?",
    "optionsFr": [
      "Elle demande la gratuité des transports publics pour compenser",
      "Elle soutient l'initiative à condition que les taxes soient réduites",
      "Elle pense que la clientèle piétonne augmentera son chiffre d'affaires",
      "Elle s'y oppose fermement par crainte d'une désertion commerciale"
    ],
    "optionsEn": [
      "She demands free public transit to offset lost auto visits",
      "She backs the initiative provided that local taxes are trimmed",
      "She believes pedestrian foot traffic will bolster her turnover",
      "She firmly opposes it fearing a decline in retail customers"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q15",
    "paperNumber": 1,
    "questionNumber": 15,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-trottoir — Avis de Marc (Résident de banlieue)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Marc"
    ],
    "audioFr": "Journaliste : Monsieur, votre sentiment sur cette transition vers le tout-piéton ?\nMarc : L'intention écologique est louable, mais la méthode est injuste. J'habite à vingt kilomètres sans gare à proximité. Si on m'interdit l'accès sans parkings relais modernes ni métros réguliers aux terminus, c'est tout simplement une exclusion sociale pour les banlieusards.",
    "audioEn": "Journalist: Sir, your thoughts on this transition to a pedestrian-only zone?\nMarc: The environmental intent is commendable, but the method is unfair. I live twenty kilometers away without a nearby station. If I am banned without modern park-and-ride hubs or frequent subway service, it amounts to social exclusion for suburban residents.",
    "questionFr": "Comment peut-on qualifier le point de vue exprimé par Marc ?",
    "questionEn": "How can Marc's expressed viewpoint be characterized?",
    "optionsFr": [
      "Partagé : favorable à l'objectif mais critique face au déficit d'infrastructures de substitution",
      "Totalement enthousiaste à l'idée d'abandonner définitivement son véhicule personnel",
      "Indifférent car ses déplacements quotidiens n'empruntent jamais les artères centrales",
      "Convaincu que la mesure résoudra instantanément les encombrements autoroutiers"
    ],
    "optionsEn": [
      "Nuanced: supportive of the goal but critical of lacking transit alternatives",
      "Completely enthusiastic about permanently parting with his personal vehicle",
      "Indifferent because his daily commute never traverses core urban thoroughfares",
      "Convinced that the policy will instantaneously eliminate highway bottlenecks"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q16",
    "paperNumber": 1,
    "questionNumber": 16,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-trottoir — Avis de Soraya (Étudiante)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Soraya"
    ],
    "audioFr": "Journaliste : Mademoiselle, est-ce une avancée selon vous ?\nSoraya : Évidemment que c'est positif, mais soyons lucides : attendre 2030 relève de la timidité politique coupable. D'autres métropoles européennes ont banni les moteurs thermiques il y a des années. Il faudrait accélérer le calendrier et étendre le périmètre aux premières couronnes dès demain.",
    "audioEn": "Journalist: Miss, is this a step forward in your view?\nSoraya: Obviously it is positive, but let's be realistic: waiting until 2030 reflects culpable political timidity. Other European metropolises banned combustion engines years ago. We should expedite the timeline and expand the perimeter to inner rings tomorrow.",
    "questionFr": "Que reproche principalement Soraya au projet présenté ?",
    "questionEn": "What is Soraya's principal criticism of the unveiled project?",
    "optionsFr": [
      "Une absence de concertation démocratique avec les associations étudiantes",
      "Un coût financier excessif pour les finances municipales de la ville",
      "Un calendrier d'application trop lent et une portée géographique trop restreinte",
      "L'impact négatif sur la ponctualité des lignes d'autobus urbains"
    ],
    "optionsEn": [
      "A total lack of democratic consultation with student associations",
      "An excessive financial burden imposed upon municipal coffers",
      "An overly sluggish timeline and an overly restricted geographic perimeter",
      "The detrimental impact upon the scheduled punctuality of city bus lines"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q17",
    "paperNumber": 1,
    "questionNumber": 17,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-trottoir — Avis d'Alain (Artisan plombier)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Alain"
    ],
    "audioFr": "Journaliste : Monsieur, en tant que professionnel itinérant, comment réagissez-vous ?\nAlain : C'est bien joli sur le papier, mais comment je transporte mes chauffe-eaux et trois cents kilos d'outillage en vélo cargo ? Les fourgonnettes électriques coûtent le triple d'un utilitaire standard. Sans subventions intégrales, les artisans déserteront le centre-ville et plus personne ne réparera vos fuites !",
    "audioEn": "Journalist: Sir, as a mobile tradesman, what is your reaction?\nAlain: It sounds nice on paper, but how am I supposed to haul water heaters and three hundred kilos of tools in a cargo bike? Electric vans cost triple what standard utilities do. Without comprehensive subsidies, craftsmen will abandon downtown and nobody will fix your leaks!",
    "questionFr": "Quelle condition Alain pose-t-il pour rendre la mesure acceptable ?",
    "questionEn": "What prerequisite condition does Alain set to make the policy viable?",
    "optionsFr": [
      "La création de voies rapides souterraines réservées aux interventions d'urgence",
      "L'autorisation de circuler sans restriction pour tous les particuliers",
      "L'exonération totale de cotisations sociales pour les métiers d'artisanat",
      "Un soutien financier massif pour compenser le surcoût des véhicules propres"
    ],
    "optionsEn": [
      "The construction of underground thoroughfares reserved for emergency calls",
      "Unrestricted vehicular circulation privileges granted to all private drivers",
      "Complete social security tax exemptions for all certified tradespeople",
      "Massive financial assistance to absorb the extra cost of clean utility fleets"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q18",
    "paperNumber": 1,
    "questionNumber": 18,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-trottoir — Avis d'Élodie (Retraitée)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Élodie"
    ],
    "audioFr": "Journaliste : Et vous madame, êtes-vous pour ou contre ?\nÉlodie : Franchement, je n'arrive pas à me prononcer. D'un côté, j'apprécie le calme quand je me promène, mais d'un autre côté, mes petits-enfants ne peuvent plus venir me chercher en auto pour m'emmener à mes rendez-vous à l'hôpital. Tout dépendra de la qualité des navettes électriques promises.",
    "audioEn": "Journalist: And you ma'am, are you in favor or against?\nElodie: Frankly, I cannot make up my mind. On one hand, I appreciate the quiet when I walk, but on the other hand, my grandchildren can no longer pick me up by car for my hospital visits. Everything will hinge on the quality of the promised electric shuttles.",
    "questionFr": "Quelle est l'attitude d'Élodie vis-à-vis de cette réforme ?",
    "questionEn": "What is Elodie's attitude towards this reform?",
    "optionsFr": [
      "Résolument hostile à tout changement dans ses habitudes de déplacement",
      "Hésitante, subordonnant son jugement final à l'efficacité des services d'assistance",
      "Entièrement confiante dans les capacités d'innovation technologique de la ville",
      "Désintéressée car elle privilégie la marche à pied en toute circonstance"
    ],
    "optionsEn": [
      "Resolutely hostile to any adjustment in her daily travel routines",
      "Hesitant, conditioning her final verdict upon the efficacy of feeder transit",
      "Fully confident in the municipal technological innovation capacities",
      "Unconcerned as she prioritizes pedestrian walking under all circumstances"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q19",
    "paperNumber": 1,
    "questionNumber": 19,
    "typology": "RADIO",
    "level": "B2",
    "title": "Chronique environnement — Restauration des tourbières",
    "speakingRate": 1.04,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Journaliste scientifique"
    ],
    "audioFr": "Radio Plein Air, chronique Terre Vivante. Longtemps considérées comme des terres infertiles, les tourbières du bas Saint-Laurent font aujourd'hui l'objet d'un vaste programme de réhabilitation écologique. En réhumidifiant ces sols spongieux par le blocage des anciens canaux de drainage agricole, les biologistes restaurent un piège à carbone naturel dont l'efficacité surpasse celle des forêts boréales.",
    "audioEn": "Radio Plein Air, Living Earth chronicle. Long considered infertile wasteland, the peatlands of the lower Saint Lawrence are now undergoing a vast ecological rehabilitation program. By re-wetting these spongy soils through blocking legacy agricultural drainage ditches, biologists are restoring a natural carbon sink whose efficacy surpasses boreal forests.",
    "questionFr": "Quel est l'objectif premier du programme écologique décrit ?",
    "questionEn": "What is the primary objective of the ecological program described?",
    "optionsFr": [
      "Réactiver la capacité naturelle de séquestration du carbone de ces écosystèmes",
      "Convertir ces espaces humides en terres de pâturage intensif pour le bétail",
      "Exploiter industriellement la tourbe pour la production d'énergie thermique",
      "Développer le tourisme de masse par la construction d'hôtels écologiques"
    ],
    "optionsEn": [
      "Reactivate the natural carbon sequestration capacity of these ecosystems",
      "Convert these wetlands into intensive livestock grazing pastureland",
      "Industrially extract peat for commercial thermal energy production",
      "Develop mass tourism through the construction of boutique eco-lodges"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q20",
    "paperNumber": 1,
    "questionNumber": 20,
    "typology": "RADIO",
    "level": "B2",
    "title": "Flash économique — Dynamique des circuits courts",
    "speakingRate": 1.04,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse économique"
    ],
    "audioFr": "Le point sur l'économie locale. Malgré les pressions inflationnistes sur le panier d'épicerie, les coopératives maraîchères de vente directe enregistrent une hausse record de 18 % de leurs abonnés. En éliminant les marges des distributeurs intermédiaires, les producteurs parviennent à garantir des tarifs stables aux consommateurs tout en dégageant un revenu décent pour leurs exploitations.",
    "audioEn": "Local economic update. Despite inflationary pressures on household groceries, direct-sale agricultural cooperatives have recorded an 18% record surge in subscriptions. By eliminating intermediary distributor margins, farmers succeed in securing stable prices for shoppers while drawing a decent income for their farms.",
    "questionFr": "Quel avantage comparatif permet aux coopératives de prospérer ?",
    "questionEn": "What comparative advantage enables these cooperatives to thrive?",
    "optionsFr": [
      "La baisse généralisée des coûts d'emballage et de transport maritime",
      "L'octroi de subventions d'État exceptionnelles réservées aux grandes surfaces",
      "La suppression des intermédiaires commerciaux qui stabilise les prix de vente",
      "Le recours systématique à une main-d'œuvre bénévole non rémunérée"
    ],
    "optionsEn": [
      "The across-the-board drop in packaging and maritime container freight costs",
      "The allocation of exceptional state subsidies reserved for supermarket chains",
      "The elimination of retail middlemen which stabilizes end-consumer prices",
      "The systematic reliance upon an unremunerated volunteer labor pool"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q21",
    "paperNumber": 1,
    "questionNumber": 21,
    "typology": "RADIO",
    "level": "B2",
    "title": "Chronique culturelle — Réhabilitation patrimoniale",
    "speakingRate": 1.04,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Journaliste culturel"
    ],
    "audioFr": "Culture Hebdo. La manufacture textile désaffectée des rives de la rivière Saint-Charles entame sa métamorphose. Plutôt que de raser ce témoin de l'ère industrielle pour y ériger des tours de verre, la municipalité a confié le site à un collectif artistique. Dès le printemps, le complexe abritera des ateliers d'artisans, une salle de concert mutualisée et un jardin maraîcher communautaire.",
    "audioEn": "Culture Weekly. The disused textile mill on the banks of the Saint-Charles River is beginning its metamorphosis. Rather than demolishing this relic of the industrial era to erect glass high-rises, the city council handed the site to an artist collective. Starting this spring, the complex will host craft workshops, a shared concert venue, and an urban garden.",
    "questionFr": "Quelle vocation nouvelle est attribuée à cet ancien site industriel ?",
    "questionEn": "What new role is assigned to this former industrial site?",
    "optionsFr": [
      "Un complexe hôtelier de grand luxe destiné à la clientèle d'affaires internationale",
      "Un espace hybride alliant création artistique, spectacle vivant et cohésion locale",
      "Un centre logistique de distribution automatisé pour le commerce électronique",
      "Une zone résidentielle fermée exclusivement réservée aux employés municipaux"
    ],
    "optionsEn": [
      "A luxury hotel complex catering to international business travelers",
      "A hybrid venue uniting arts creation, live performances, and community cohesion",
      "An automated distribution logistics warehouse for regional e-commerce",
      "A gated residential subdivision reserved solely for civil service workers"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q22",
    "paperNumber": 1,
    "questionNumber": 22,
    "typology": "RADIO",
    "level": "B2",
    "title": "Sciences & Recherche — Biorémédiation plastique",
    "speakingRate": 1.05,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueur scientifique"
    ],
    "audioFr": "Découverte majeure à l'Institut de microbiologie marine. Une équipe de biochimistes a isolé une souche bactérienne capable de dégrader enzymatiquement le polyéthylène téréphtalate en seulement quarante-huit heures, sans dégagement toxique. Si les applications industrielles restent à dimensionner, cette percée ouvre la voie à un recyclage biologique à l'échelle planétaire.",
    "audioEn": "Major discovery at the Marine Microbiology Institute. A team of biochemists has isolated a bacterial strain capable of enzymatically breaking down polyethylene terephthalate in just forty-eight hours with zero toxic byproducts. While industrial scaling remains ahead, this breakthrough paves the way for global biological recycling.",
    "questionFr": "En quoi réside le caractère exceptionnel de cette avancée scientifique ?",
    "questionEn": "What constitutes the breakthrough nature of this scientific discovery?",
    "optionsFr": [
      "La découverte de gisements pétroliers sous-marins inexploités dans l'Arctique",
      "L'invention d'un polymère synthétique totalement imperméable à l'eau de mer",
      "La fabrication à faible coût de récipients plastiques jetables et incassables",
      "La rapidité de biodégradation enzymatique sans résidus polluants nocifs"
    ],
    "optionsEn": [
      "The discovery of untouched offshore crude oil deposits in the High Arctic",
      "The creation of a synthetic polymer entirely impervious to marine seawater",
      "The low-cost industrial manufacturing of disposable, shatterproof plastic containers",
      "The rapid enzymatic biodegradation process yielding zero toxic pollutants"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q23",
    "paperNumber": 1,
    "questionNumber": 23,
    "typology": "RADIO",
    "level": "B2",
    "title": "Santé publique — Rythme biologique et travail",
    "speakingRate": 1.05,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Journaliste santé"
    ],
    "audioFr": "Bien-être au travail sur Radio Santé. Une vaste étude ergonomique menée sur plus de trois mille cadres vient corroborer ce que les neurologues affirment depuis des décennies : s'accorder une véritable coupure de vingt minutes après le repas de midi, sans écran ni notification professionnelle, améliore la concentration cognitive de 35 % sur l'ensemble de l'après-midi.",
    "audioEn": "Workplace Wellness on Health Radio. A vast ergonomic study conducted on more than three thousand executives corroborates what neurologists have asserted for decades: granting oneself a genuine twenty-minute break after lunch, free of screens or work pings, enhances afternoon cognitive concentration by 35%.",
    "questionFr": "Selon les observations de l'étude, quel comportement s'avère le plus bénéfique ?",
    "questionEn": "According to the study's observations, which habit proves most beneficial?",
    "optionsFr": [
      "Une déconnexion numérique absolue pendant la pause de mi-journée",
      "La pratique d'exercices cardiovasculaires intensifs avant la reprise du travail",
      "La consommation répétée de boissons énergisantes pour stimuler la vigilance",
      "Le prolongement de la journée de travail le soir pour éviter les interruptions"
    ],
    "optionsEn": [
      "Absolute digital disconnection during the midday post-lunch break",
      "Engaging in rigorous cardiovascular exercises right before returning to the desk",
      "Frequent intake of caffeinated energy drinks to boost sensory vigilance",
      "Extending office working hours into late evening to avoid workplace interruptions"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q24",
    "paperNumber": 1,
    "questionNumber": 24,
    "typology": "RADIO",
    "level": "B2",
    "title": "Transports régionaux — Tarification ferroviaire unifiée",
    "speakingRate": 1.05,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse transports"
    ],
    "audioFr": "Mobilité citoyenne. Dès le premier octobre, la société régionale des transports déploie son passe unique mensuel à 49 dollars. Valable sans restriction sur l'ensemble du réseau ferré de banlieue ainsi que sur les autobus interurbains, cette mesure vise à convaincre les automobilistes solos d'abandonner l'autoroute saturée aux heures de pointe.",
    "audioEn": "Civic Mobility. Starting October 1st, the regional transit authority is rolling out its single monthly pass priced at 49 dollars. Valid without restriction across the entire commuter rail network as well as suburban coaches, this measure aims to persuade single-occupancy drivers to forgo highway gridlock during peak hours.",
    "questionFr": "Quel est le but central de ce nouveau forfait de transport ?",
    "questionEn": "What is the core aim of this newly introduced transit pass?",
    "optionsFr": [
      "Limiter le nombre quotidien d'usagers aux heures de forte affluence matinale",
      "Financer l'extension des autoroutes à péage vers les zones rurales isolées",
      "Inciter les conducteurs solitaires à se reporter vers les réseaux en commun",
      "Remplacer l'ensemble des chauffeurs d'autobus par des navettes automatisées"
    ],
    "optionsEn": [
      "Cap the daily ceiling of transit ridership during peak morning commuting rushes",
      "Fund the physical widening of tolled highways into remote agricultural zones",
      "Incentivize solo commuter motorists to transition towards public transport networks",
      "Phase out human bus operators in favor of autonomous self-driving shuttles"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q25",
    "paperNumber": 1,
    "questionNumber": 25,
    "typology": "RADIO",
    "level": "B2",
    "title": "Société & Tendances — Les matériauthèques citoyennes",
    "speakingRate": 1.06,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueur tendances"
    ],
    "audioFr": "Tendances de société. Pourquoi acheter une perceuse que l'on n'utilise en moyenne que douze minutes dans sa vie ? Face à l'absurdité de la surconsommation d'outillage, les bibliothèques d'objets se multiplient dans les quartiers. Moyennant une cotisation symbolique annuelle, chacun peut emprunter tondeuses, tentes de camping ou projecteurs vidéo, tout en bénéficiant de conseils de bricolage partagés.",
    "audioEn": "Societal Trends. Why purchase a power drill that is only used twelve minutes on average in its entire lifespan? Faced with the absurdity of overconsuming tools, neighborhood lending tool-libraries are multiplying. In exchange for a modest annual fee, anyone can borrow lawnmowers, tents, or video projectors while sharing DIY trade tips.",
    "questionFr": "Sur quel principe philosophique et pratique ce concept repose-t-il ?",
    "questionEn": "On what philosophical and practical premise is this concept based?",
    "optionsFr": [
      "L'interdiction commerciale de fabriquer du matériel de bricolage grand public",
      "L'obligation légale de recycler tout appareil électrique après deux ans",
      "La gratuité universelle de tous les services de dépannage à domicile",
      "La primauté de l'usage partagé sur la propriété individuelle d'équipements"
    ],
    "optionsEn": [
      "A commercial prohibition on manufacturing consumer-grade DIY power equipment",
      "A statutory mandate to discard and recycle all power tools after two seasons",
      "Universal zero-cost home appliance emergency handyman repair calls",
      "The primacy of collaborative utility access over individual asset ownership"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q26",
    "paperNumber": 1,
    "questionNumber": 26,
    "typology": "RADIO",
    "level": "B2",
    "title": "Technologie & Éthique — Protection des mineurs en ligne",
    "speakingRate": 1.06,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Journaliste numérique"
    ],
    "audioFr": "Numérique et société. L'autorité de régulation des communications vient d'adopter des directives strictes encadrant les interfaces de divertissement à destination des adolescents. Les fonctionnalités de défilement infini et les récompenses algorithmiques quotidiennes devront obligatoirement être désactivées par défaut pour tous les comptes d'utilisateurs âgés de moins de seize ans.",
    "audioEn": "Digital & Society. The telecommunications regulatory authority has just enacted rigorous guidelines governing entertainment interfaces aimed at teenagers. Infinite scroll algorithms and gamified daily engagement streaks must mandatorily be toggled off by default for all user accounts under the age of sixteen.",
    "questionFr": "Quelle mesure contraignante est imposée aux plateformes numériques ?",
    "questionEn": "What binding obligation is levied upon social media platforms?",
    "optionsFr": [
      "L'interdiction absolue d'accéder à Internet après vingt-deux heures pour les mineurs",
      "La désactivation automatique des mécanismes favorisant la dépendance chez les jeunes",
      "La vérification d'identité par empreinte rétinienne lors de chaque connexion",
      "La suppression de toute publicité commerciale sur l'ensemble du réseau mondial"
    ],
    "optionsEn": [
      "An absolute curfew ban preventing minor internet usage past 10 PM",
      "Automatic deactivation of addictive design loops for young user accounts",
      "Mandatory biometric iris recognition verification on every session sign-in",
      "The complete abolition of promotional sponsor ads across the entire global web"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q27",
    "paperNumber": 1,
    "questionNumber": 27,
    "typology": "RADIO",
    "level": "B2",
    "title": "Météo & Climat — Résilience face aux inondations",
    "speakingRate": 1.06,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Météorologue spécialiste climat"
    ],
    "audioFr": "Bulletin spécial environnement. Avec le réchauffement des hivers, la fonte accélérée du manteau neigeux conjuguée aux précipitations torrentielles accroît la récurrence des crues printanières. Pour protéger les zones habitées sans construire des digues de béton austères, les urbanistes réhabilitent les zones humides d'expansion de crues, permettant d'absorber naturellement les surplus d'eau en amont.",
    "audioEn": "Environmental Special Bulletin. With warming winter seasons, premature snowpack thaw paired with intense torrential downpours magnifies the frequency of spring freshet flooding. To protect settled residential zones without erecting sterile concrete dikes, planners are re-naturalizing upstream flood absorption wetlands to buffer excess volume.",
    "questionFr": "Quelle démarche d'aménagement est privilégiée pour contenir les eaux ?",
    "questionEn": "Which civil planning approach is prioritized to manage floodwaters?",
    "optionsFr": [
      "La restauration d'espaces tampons naturels capables d'absorber les débordements",
      "L'édification de barrages hydroélectriques géants sur tous les affluents fluviaux",
      "L'évacuation permanente et le démantèlement de toutes les villes riveraines",
      "Le dragage profond des fonds marins pour accélérer l'écoulement vers l'océan"
    ],
    "optionsEn": [
      "The restoration of natural ecological floodplain buffers to absorb surges",
      "The construction of massive hydroelectric impoundment dams on all tributaries",
      "The permanent forced resettlement and demolition of all historic river basin cities",
      "Deep riverbed dredging along estuaries to speed up discharges to the ocean"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q28",
    "paperNumber": 1,
    "questionNumber": 28,
    "typology": "RADIO",
    "level": "B2",
    "title": "Éducation & Pédagogie — La classe en plein air",
    "speakingRate": 1.06,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse éducation"
    ],
    "audioFr": "Éducation d'avenir. Dans plus de cinquante écoles de la région, élèves et enseignants quittent une demi-journée par semaine les quatre murs de leur classe pour faire cours en forêt ou dans les parcs municipaux. Mesurer la circonférence d'un tronc pour les mathématiques, observer les mousses en sciences : ce contact direct stimule la curiosité et réduit drastiquement les troubles de l'attention.",
    "audioEn": "Future of Education. In more than fifty district elementary schools, pupils and teachers venture outside the four classroom walls for half a day every week to hold class in surrounding woods or public parks. Measuring tree circumferences for geometry, cataloging forest mosses in biology: direct sensory contact ignites curiosity and reduces attention deficits.",
    "questionFr": "Quel bénéfice pédagogique majeur est mis en avant dans cette initiative ?",
    "questionEn": "What major pedagogical benefit is highlighted in this experiential initiative?",
    "optionsFr": [
      "L'élimination définitive de tout devoir écrit et de toute évaluation chiffrée",
      "La réduction du nombre total d'heures de présence scolaire imposées aux élèves",
      "L'amélioration des facultés de concentration grâce à l'apprentissage sensoriel concret",
      "L'apprentissage exclusif des disciplines sportives d'endurance physique"
    ],
    "optionsEn": [
      "The complete elimination of all graded assessments and written homework tasks",
      "A substantial decrease in the statutory weekly instructional hours expected of pupils",
      "Improved cognitive focus facilitated by immersive, hands-on sensory learning",
      "An exclusive curricular focus centered on outdoor endurance athletic training"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q29",
    "paperNumber": 1,
    "questionNumber": 29,
    "typology": "GRAND_ENTRETIEN",
    "level": "B2",
    "title": "Grand Entretien — Le mythe des heures présentielles (Partie 1)",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Dr. Maxime Vasseur, vous publiez un essai remarqué sur la réduction du temps de travail. En observant les entreprises qui testent la semaine de quatre jours sans baisse de salaire, vous affirmez que le modèle hérité de la révolution industrielle est devenu contre-productif. Pourquoi ?\nDr. Vasseur : Parce que notre modèle salarial reste obsédé par le présentéisme physique, c'est-à-dire le temps passé sur une chaise, plutôt que par l'efficience réelle. Or, les données physiologiques et cognitives montrent qu'un travailleur de la connaissance n'est pleinement créatif et concentré que quatre à cinq heures par jour. Le reste n'est souvent que réunionite stérile et navigation de façade.",
    "audioEn": "Host: Dr. Maxime Vasseur, you have just published a noted essay on shortening working hours. Observing companies piloting four-day workweeks with no pay cuts, you assert that our industrial-era work model has grown counterproductive. Why?\nDr. Vasseur: Because our labor culture remains obsessed with physical presenteeism—sitting in a chair—rather than actual value output. Yet physiological and cognitive data reveals knowledge workers operate at peak creative concentration for merely four to five hours daily. The remainder is largely sterile meeting sprawl and surface multitasking.",
    "questionFr": "Selon le Dr. Vasseur, quelle faille majeure caractérise l'organisation actuelle du travail ?",
    "questionEn": "According to Dr. Vasseur, what major flaw characterizes present workplace models?",
    "optionsFr": [
      "Le refus des salariés de s'adapter aux outils de vidéoconférence modernes",
      "La valorisation artificielle de la présence temporelle au détriment de l'efficacité réelle",
      "L'insuffisance criante du nombre d'heures travaillées par rapport aux décennies passées",
      "L'absence totale de hiérarchie managériale dans les structures entrepreneuriales"
    ],
    "optionsEn": [
      "Employees' systemic refusal to adapt to modern remote video collaboration tools",
      "The artificial valorization of desk-bound face-time over genuine output efficiency",
      "A sharp shortfall in total weekly worked hours compared to past historical eras",
      "The complete absence of middle-management oversight inside corporate hierarchies"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q30",
    "paperNumber": 1,
    "questionNumber": 30,
    "typology": "GRAND_ENTRETIEN",
    "level": "B2",
    "title": "Grand Entretien — Réticences patronales et culture d'entreprise",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Pourtant, les organisations patronales redoutent souvent une perte immédiate de compétitivité. Quels sont les principaux freins que vous rencontrez sur le terrain ?\nDr. Vasseur : Ce n'est pas un blocage économique, mais une angoisse culturelle de perte de contrôle. Beaucoup de managers assimilent l'autonomie accordée à un risque de relâchement. Pourtant, dès lors qu'on rationalise les processus — en éliminant les réunions inutiles de plus de quinze minutes et en sanctuarisant des plages de travail asynchrone —, le volume de production ne fléchit absolument pas.",
    "audioEn": "Host: Yet employers' confederations frequently dread an immediate drop in business competitiveness. What are the key bottlenecks you encounter on the ground?\nDr. Vasseur: It is not an economic hurdle, but a cultural anxiety over losing oversight. Many managers equate granting autonomy with risking widespread slacking. Yet once workflows are streamlined—pruning meetings down to 15 minutes and safeguarding uninterrupted async focus blocks—aggregate production does not decline whatsoever.",
    "questionFr": "D'après l'intervenant, d'où proviennent principalement les réticences des directions ?",
    "questionEn": "According to the guest, where does management hesitation primarily originate?",
    "optionsFr": [
      "De contraintes juridiques insurmontables imposées par le code du travail fédéral",
      "D'un surcoût financier insurmontable lié aux cotisations patronales obligatoires",
      "D'une opposition unanime des syndicats ouvriers à toute flexibilité d'horaires",
      "D'une appréhension psychologique liée à la délégation de l'autonomie aux salariés"
    ],
    "optionsEn": [
      "From rigid legal statutory barriers enforced under federal labor codes",
      "From insurmountable financial overhead incurred by mandatory corporate taxes",
      "From unanimous labor union opposition resisting any flexible shift scheduling",
      "From psychological anxieties over delegating day-to-day autonomy to workers"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q31",
    "paperNumber": 1,
    "questionNumber": 31,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien — Impacts sanitaires et rétention des talents",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Parlons des résultats concrets. Que constate-t-on dans les entreprises ayant franchi le pas de manière pérenne ?\nDr. Vasseur : Les bénéfices les plus spectaculaires touchent la santé mentale et la fidélisation. Dans notre échantillon de cinquante entreprises pilotes, le taux d'absentéisme pour épuisement professionnel s'est effondré de 65 %. Par ailleurs, le turnover a chuté de moitié : une entreprise qui offre ce temps de respiration attire les meilleurs profils sans avoir à surenchérir sur les salaires.",
    "audioEn": "Host: Let's discuss concrete results. What patterns emerge across firms that have permanently adopted the shift?\nDr. Vasseur: The most spectacular benefits manifest in mental health and staff retention. Across our sample of fifty pilot firms, absenteeism tied to professional burnout plummeted by 65%. Furthermore, employee turnover was halved: a company offering this restorative breather attracts top-tier talent without having to inflate salaries.",
    "questionFr": "Quel impact bénéfique inattendu a été mesuré chez les entreprises expérimentatrices ?",
    "questionEn": "What unexpected beneficial impact was measured across pilot companies?",
    "optionsFr": [
      "Une diminution drastique des arrêts maladie et une fidélisation renforcée du personnel",
      "Une hausse spectaculaire des investissements en mobilier ergonomique de bureau",
      "Le transfert systématique de toutes les activités manuelles vers des robots",
      "La disparition intégrale des congés annuels payés demandés par les salariés"
    ],
    "optionsEn": [
      "A drastic reduction in sick leave and markedly reinforced employee retention",
      "A dramatic increase in capital expenditures allocated for ergonomic office desks",
      "The complete wholesale offloading of all manual fabrication tasks onto robots",
      "The total voluntary forfeiture of paid annual vacation requested by employees"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q32",
    "paperNumber": 1,
    "questionNumber": 32,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien — L'équité face aux métiers non télétravaillables",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Mais n'y a-t-il pas une injustice flagrante pour les secteurs essentiels, comme le milieu hospitalier, le transport ou la logistique, où l'on ne peut pas simplement condenser les tâches ?\nDr. Vasseur : C'est l'objection cardinale, et elle est légitime. Si la semaine réduite ne profite qu'aux cadres de bureau, elle créera une fracture sociale explosive. Dans les services continus, la solution passe par des embauches compensatoires financées par les gains de productivité globaux et des allègements fiscaux ciblés, afin de permettre des roulements d'équipes plus humains.",
    "audioEn": "Host: But isn't there a glaring injustice for front-line sectors—such as hospitals, transport, or warehousing—where tasks cannot simply be compressed?\nDr. Vasseur: That is the pivotal objection, and it is legitimate. If shortened weeks exclusively benefit white-collar workers, it will spawn explosive social fracture. In round-the-clock operations, the remedy requires compensatory hiring financed through macro productivity gains and targeted tax relief to permit humane team shifts.",
    "questionFr": "Quelle réponse l'expert apporte-t-il au risque d'inégalité sociale ?",
    "questionEn": "What answer does the expert formulate regarding the danger of social inequality?",
    "optionsFr": [
      "L'augmentation obligatoire des cadences journalières dans les unités de production",
      "L'exclusion définitive des professions soignantes du champ d'application de la réforme",
      "L'embauche de personnel d'appoint financée par des mécanismes d'allègement fiscal",
      "L'abandon pur et simple du projet pour préserver une égalité absolue entre tous"
    ],
    "optionsEn": [
      "Mandating faster hourly assembly line speeds across manufacturing facilities",
      "The permanent statutory exclusion of nursing and healthcare workers from reforms",
      "Compensatory staffing hires underwritten by targeted fiscal incentive mechanisms",
      "Outright abandonment of the project to maintain uniform parity among sectors"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q33",
    "paperNumber": 1,
    "questionNumber": 33,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien — Condition sine qua non de réussite",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Si vous deviez isoler une condition indispensable pour qu'une structure réussisse sa transition sans imploser ?\nDr. Vasseur : C'est la refonte démocratique du travail au sein des équipes. Si la direction impose une cadence accélérée d'en haut pour faire tenir quarante heures de charge mentale en trente-deux, on court droit au désastre et à la surcharge cognitive. Il faut que chaque collectif d'employés décide collectivement quelles tâches accessoires doivent être supprimées.",
    "audioEn": "Host: If you were to isolate one indispensable condition for an organization to transition without imploding?\nDr. Vasseur: It is the democratic re-engineering of tasks from within workgroups. If top management imposes accelerated rhythms to squeeze forty hours of cognitive load into thirty-two, disaster and burnout loom. Collective teams must determine democratically which dispensable micro-tasks to scrap.",
    "questionFr": "Quelle condition impérative garantit la viabilité de la transition ?",
    "questionEn": "What imperative condition ensures the viability of the transition?",
    "optionsFr": [
      "L'imposition stricte d'objectifs de cadence chiffrés par la direction générale",
      "Une concertation participative où les employés redéfinissent eux-mêmes leurs tâches",
      "La suppression immédiate de toute pause de repos au cours de la journée de travail",
      "Le recours exclusif à des consultants externes pour surveiller le temps d'écran"
    ],
    "optionsEn": [
      "Top-down enforcement of strict hourly volumetric output quotas by senior management",
      "Participatory deliberation where team members self-determine dispensable tasks",
      "Immediate elimination of all rest intervals and watercooler breaks during the shift",
      "Exclusive reliance on outside workflow consultants tracking real-time screen activity"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q34",
    "paperNumber": 1,
    "questionNumber": 34,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien — Horizon sociétal et nouveau contrat social",
    "speakingRate": 1.08,
    "prepTimeSeconds": 20,
    "answerTimeSeconds": 25,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Animateur)",
      "Dr. Maxime Vasseur (Sociologue du travail)"
    ],
    "audioFr": "Animateur : Dr. Vasseur, en conclusion, est-ce une simple mode managériale ou l'amorce d'un nouveau contrat de civilisation ?\nDr. Vasseur : C'est une mutation historique inéluctable. Au vingtième siècle, nous sommes passés de six à cinq jours grâce aux gains d'automatisation. Aujourd'hui, avec l'intelligence artificielle et la crise écologique, le bien le plus précieux n'est plus l'accumulation matérielle, mais le temps disponible pour le soin aux proches, l'engagement civique et l'épanouissement personnel.",
    "audioEn": "Host: Dr. Vasseur, in closing, is this a fleeting management fad or the harbinger of a new civilizational contract?\nDr. Vasseur: It is an inevitable historical mutation. In the twentieth century, we transitioned from six to five days powered by mechanization gains. Today, with artificial intelligence and ecological limits, our most precious asset is no longer material hoarding, but disposable time for caretaking, civic engagement, and self-actualization.",
    "questionFr": "Quelle perspective d'ensemble Dr. Vasseur dessine-t-il pour l'avenir ?",
    "questionEn": "What overarching long-term perspective does Dr. Vasseur outline for the future?",
    "optionsFr": [
      "La stagnation définitive des gains de productivité face aux contraintes technologiques",
      "Le retour inéluctable aux cadences de six jours par semaine sous la pression économique",
      "La disparition intégrale de toute forme de salariat au profit du travail précaire individuel",
      "Une réorientation sociétale valorisant le temps libéré plutôt que la consommation matérielle"
    ],
    "optionsEn": [
      "The irreversible plateauing of productivity gains stymied by technical bottlenecks",
      "An inevitable reversion to six-day workweeks driven by international cost pressures",
      "The complete eclipse of wage employment in favor of precarious gig economy labor",
      "A societal shift valuing liberated personal time over material consumerism"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q35",
    "paperNumber": 1,
    "questionNumber": 35,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Reportage — L'essor du réemploi solidaire et de la seconde main",
    "speakingRate": 1.06,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Journaliste d'investigation économique"
    ],
    "audioFr": "Longtemps cantonnée aux brocantes de quartier et aux réseaux d'entraide caritatifs, la filière de la seconde main s'impose aujourd'hui comme un rouage économique à part entière. Poussés par l'inflation et une volonté de réduire leur empreinte carbone, près de six ménages sur dix déclarent désormais privilégier le matériel électronique ou vestimentaire reconditionné, incitant les géants de la distribution à ouvrir leurs propres rayons de réemploi.",
    "audioEn": "Long confined to neighborhood flea markets and charitable mutual-aid networks, the second-hand economy is establishing itself as a full-fledged financial driver. Spurred by inflation and a desire to shrink their carbon footprint, nearly six in ten households now report prioritizing refurbished electronics or garments, prompting retail powerhouses to launch their own in-house reconditioned aisles.",
    "questionFr": "D'après la chronique, quelle évolution majeure caractérise le marché de la seconde main ?",
    "questionEn": "According to the broadcast, what major development characterizes the second-hand market?",
    "optionsFr": [
      "Sa transformation en secteur économique majeur adopté par la grande distribution",
      "Son déclin progressif en raison du manque d'intérêt des consommateurs",
      "Sa limitation exclusive aux structures caritatives d'urgence",
      "L'interdiction légale de commercialiser des appareils reconditionnés"
    ],
    "optionsEn": [
      "Its transformation into a major economic sector embraced by mainstream retail",
      "Its gradual decline due to a widespread lack of consumer interest",
      "Its strict containment within emergency non-profit charities",
      "A legal prohibition preventing the sale of refurbished consumer electronics"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q36",
    "paperNumber": 1,
    "questionNumber": 36,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Environnement — La transition agroécologique en zone périurbaine",
    "speakingRate": 1.08,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse scientifique"
    ],
    "audioFr": "Dans les ceintures vertes encerclant nos grandes métropoles, les parcelles maraîchères expérimentent de nouveaux modèles d'agroécologie régénérative. En associant haies bocagères, cultures intercalaires et zéro intrant chimique, ces fermes périurbaines parviennent non seulement à préserver les nappes phréatiques, mais elles approvisionnent directement les cantines scolaires des communes avoisinantes en circuits ultra-courts.",
    "audioEn": "Across greenbelts encircling major metropolitan hubs, vegetable farming plots are testing novel models of regenerative agroecology. By pairing hedgerows, companion planting, and zero synthetic chemical inputs, these peri-urban farms not only safeguard groundwater tables, but directly supply neighboring municipal school cafeterias through hyper-localized distribution loops.",
    "questionFr": "Quel double avantage les fermes maraîchères périurbaines apportent-elles ?",
    "questionEn": "What dual advantage do peri-urban vegetable farms deliver?",
    "optionsFr": [
      "Une hausse spectaculaire des exportations de denrées vers les marchés étrangers",
      "La préservation écologique des eaux et l'approvisionnement direct des cantines locales",
      "La suppression de toutes les terres agricoles au profit de nouveaux lotissements",
      "L'obligation pour les élèves de financer eux-mêmes leurs repas scolaires"
    ],
    "optionsEn": [
      "A dramatic increase in food exports targeting overseas markets",
      "Ecological water table protection and direct supply to local cafeterias",
      "The complete conversion of farmland into residential housing tracts",
      "A mandatory requirement that students personally finance their school meals"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p1-co-q37",
    "paperNumber": 1,
    "questionNumber": 37,
    "typology": "REPORTAGE_DEBAT",
    "level": "C1",
    "title": "Débat de Société — L'impact de la dématérialisation administrative",
    "speakingRate": 1.08,
    "prepTimeSeconds": 15,
    "answerTimeSeconds": 20,
    "speakerCount": 1,
    "speakers": [
      "Médiatrice des services publics"
    ],
    "audioFr": "Si la numérisation des démarches administratives a indéniablement allégé les délais de traitement pour une large majorité de citoyens connectés, elle a simultanément creusé une fracture insidieuse pour les publics vulnérables. Sans accompagnement humain de proximité au sein de guichets physiques, l'obligation du tout-en-ligne risque de transformer un outil de modernisation en un facteur d'exclusion civique et de non-recours aux droits.",
    "audioEn": "While streamlining administrative procedures online has undeniably shortened processing delays for a tech-savvy majority, it has concurrently widened an insidious divide for vulnerable populations. Without localized face-to-face assistance at physical service counters, all-digital mandates risk converting a modernization instrument into an engine of civic disenfranchisement and unclaimed social benefits.",
    "questionFr": "Quelle mise en garde la médiatrice formule-t-elle à l'égard du tout-numérique ?",
    "questionEn": "What cautionary warning does the ombudsman issue regarding all-digital procedures?",
    "optionsFr": [
      "La disparition programmée de tout formulaire ou document administratif",
      "L'impossibilité technique de stocker des données sur des serveurs sécurisés",
      "Le risque d'exclure les populations fragiles privées d'accompagnement physique",
      "L'obligation générale de retourner aux dossiers exclusivement manuscrits"
    ],
    "optionsEn": [
      "The scheduled complete disappearance of all administrative forms and documents",
      "The technical impossibility of storing citizen records on secured servers",
      "The hazard of disenfranchising vulnerable groups deprived of physical in-person guidance",
      "A blanket mandate enforcing a total return to handwritten paper files"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p1-co-q38",
    "paperNumber": 1,
    "questionNumber": 38,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Discrimination — Détection de l'ironie et du registre implicite",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Collègue sarcastique"
    ],
    "audioFr": "Ah formidable ! Réduire le budget de recherche en intelligence artificielle de 30 % juste au moment où tous nos concurrents mondiaux triplent leurs investissements... Quelle brillante stratégie visionnaire !",
    "audioEn": "Oh marvelous! Slashing our artificial intelligence research budget by 30% right when all our global rivals are tripling investments... What a brilliant, visionary strategy!",
    "questionFr": "Écoutez attentivement l'intonation de la phrase. Que pense réellement l'intervenant de cette décision ?",
    "questionEn": "Listen closely to the sentence's intonation. What does the speaker truly think of this decision?",
    "optionsFr": [
      "Il annonce son intention d'investir ses économies personnelles dans la filiale",
      "Il félicite chaleureusement la direction pour sa prudence financière avisée",
      "Il propose spontanément de doubler ses propres heures d'effort au laboratoire",
      "Il exprime une critique acerbe et ironique d'une décision qu'il juge absurde"
    ],
    "optionsEn": [
      "He announces his intent to invest his personal savings into the venture",
      "He warmly congratulates leadership for prudent financial austerity",
      "He spontaneously offers to double his own working hours in the lab",
      "He voices sharp, ironic criticism against a decision he deems absurd"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p1-co-q39",
    "paperNumber": 1,
    "questionNumber": 39,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Discrimination — Nuance temporelle conditionnel vs futur",
    "speakingRate": 1.1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Négociatrice"
    ],
    "audioFr": "Si les conditions de financement étaient validées par le conseil d'administration vendredi matin, nous pourrions signer le protocole d'accord dès le début de la semaine suivante.",
    "audioEn": "If financing conditions were validated by the board of directors on Friday morning, we could sign the memorandum of understanding as early as the beginning of next week.",
    "questionFr": "Écoutez la phrase prononcée. L'engagement de signature est-il certain ou hypothétique ?",
    "questionEn": "Listen to the spoken sentence. Is the signing commitment certain or hypothetical?",
    "optionsFr": [
      "Il s'agit d'une simple éventualité subordonnée à une approbation préalable",
      "La signature est d'ores et déjà confirmée et définitivement arrêtée pour lundi",
      "L'accord est expressément rejeté par l'ensemble des administrateurs financiers",
      "Le projet est ajourné d'office en raison d'un litige judiciaire insoluble"
    ],
    "optionsEn": [
      "It represents a mere eventuality conditioned upon prior formal approval",
      "The signing is already definitively sealed and confirmed for Monday",
      "The accord is expressly and unanimously rejected by the board",
      "The project is suspended indefinitely due to intractable legal disputes"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p1-co-q40",
    "paperNumber": 1,
    "questionNumber": 40,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Discrimination — Acte de parole : le refus diplomatique",
    "speakingRate": 1.1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Haut fonctionnaire diplomate"
    ],
    "audioFr": "Votre proposition témoigne d'une grande audace intellectuelle que nous saluons avec intérêt. Toutefois, au vu des impératifs budgétaires actuels et de l'état d'avancement des négociations bilatérales, il nous paraît opportun de réserver notre arbitrage pour des cycles ultérieurs.",
    "audioEn": "Your proposal demonstrates great intellectual boldness which we salute with interest. However, in light of current budgetary constraints and the status of bilateral talks, we consider it opportune to reserve our ruling for subsequent cycles.",
    "questionFr": "Quel acte de parole est implicitement accompli dans cette déclaration ?",
    "questionEn": "What speech act is implicitly performed in this statement?",
    "optionsFr": [
      "Une convocation solennelle pour entamer la rédaction définitive du contrat",
      "Une acceptation enthousiaste accompagnée d'un déblocage immédiat de crédits",
      "Un refus courtois dissimulant une fin de non-recevoir diplomatique",
      "Une mise en demeure juridique exigeant l'arrêt immédiat des travaux"
    ],
    "optionsEn": [
      "A formal summons to initiate final contractual drafting proceedings",
      "An enthusiastic acceptance paired with immediate funds disbursement",
      "A courteous refusal conveying a diplomatic, veiled rejection",
      "A legal formal notice demanding the immediate cessation of project operations"
    ],
    "correctIndex": 2
  }
];
