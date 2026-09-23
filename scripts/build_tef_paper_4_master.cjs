const fs = require('fs');
const path = require('path');

const items = [
  // ── SECTION A : IDENTIFICATION DE DESSINS (Q1 - Q4) ──
  {
    id: "tef-p4-co-q01",
    paperNumber: 4,
    questionNumber: 1,
    typology: "DESSINS",
    level: "A1",
    title: "Clinique vétérinaire — Consultation féline et rappel de vaccin",
    speakingRate: 0.94,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Propriétaire", "Vétérinaire"],
    speakerPersonas: [
      { role: "Propriétaire", gender: "female", voiceId: "fr-FR-DeniseNeural" },
      { role: "Vétérinaire", gender: "male", voiceId: "fr-FR-HenriNeural" }
    ],
    audioFr: "Propriétaire : Bonjour docteur, j'emmène mon chaton Félix pour son rappel de vaccin annuel et vérifier ses oreilles.\nVétérinaire : Bonjour madame. Posez sa cage de transport sur la table d'auscultation, je vais commencer par prendre sa température.",
    audioEn: "Owner: Hello doctor, I brought my kitten Félix for his annual booster shot and to check his ears.\nVeterinarian: Hello ma'am. Please place his pet carrier on the examination table, I will begin by taking his temperature.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Un client faisant peser des bananes à la balance d'une épicerie",
      "Dessin B : Un vétérinaire examinant un chat posé sur une table d'auscultation",
      "Dessin C : Une femme achetant des médicaments au comptoir d'une pharmacie",
      "Dessin D : Un voyageur présentant son passeport à la douane d'un aéroport"
    ],
    optionsEn: [
      "Drawing A: A customer weighing bananas on a scale in a grocery shop",
      "Drawing B: A veterinarian examining a cat placed on an examination table",
      "Drawing C: A woman buying medication at a pharmacy medicine counter",
      "Drawing D: A passenger presenting his passport at an airport customs checkpoint"
    ],
    correctIndex: 1, // Key B
    mainImage: "/illustrations/tef/tef_p4_q1_b.png",
    optionImages: [
      "/illustrations/tef/tef_p4_q1_a.png",
      "/illustrations/tef/tef_p4_q1_b.png",
      "/illustrations/tef/tef_p4_q1_c.png",
      "/illustrations/tef/tef_p4_q1_d.png"
    ]
  },
  {
    id: "tef-p4-co-q02",
    paperNumber: 4,
    questionNumber: 2,
    typology: "DESSINS",
    level: "A2",
    title: "Boutique de fleuriste — Confection d'un bouquet pour un anniversaire",
    speakingRate: 0.95,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Client", "Fleuriste"],
    speakerPersonas: [
      { role: "Client", gender: "male", voiceId: "fr-FR-AlainNeural" },
      { role: "Fleuriste", gender: "female", voiceId: "fr-CA-SylvieNeural" }
    ],
    audioFr: "Client : Bonjour, je voudrais composer un bouquet rond avec des roses blanches et quelques brins d'eucalyptus pour l'anniversaire de ma mère.\nFleuriste : Très bon choix monsieur. Je vous prépare un bel arrangement champêtre avec un ruban assorti. Ce sera prêt dans cinq minutes.",
    audioEn: "Customer: Hello, I would like to compose a round bouquet with white roses and some eucalyptus sprigs for my mother's birthday.\nFlorist: Excellent choice, sir. I will prepare a lovely rustic arrangement for you with a matching ribbon. It will be ready in five minutes.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Une serveuse apportant une carafe d'eau à la terrasse d'une brasserie",
      "Dessin B : Un étudiant consultant un plan mural dans le couloir d'une université",
      "Dessin C : Un homme mesurant une planche en bois avec un mètre dans un atelier",
      "Dessin D : Une fleuriste attachant un ruban autour d'un bouquet de fleurs fraîches"
    ],
    optionsEn: [
      "Drawing A: A waitress serving a water pitcher on a brasserie outdoor terrace",
      "Drawing B: A student looking at a wall map inside a university hallway",
      "Drawing C: A man measuring a wooden board with a tape in a carpentry workshop",
      "Drawing D: A florist tying a decorative ribbon around a fresh floral bouquet"
    ],
    correctIndex: 3, // Key D
    mainImage: "/illustrations/tef/tef_p4_q2_d.png",
    optionImages: [
      "/illustrations/tef/tef_p4_q2_a.png",
      "/illustrations/tef/tef_p4_q2_b.png",
      "/illustrations/tef/tef_p4_q2_c.png",
      "/illustrations/tef/tef_p4_q2_d.png"
    ]
  },
  {
    id: "tef-p4-co-q03",
    paperNumber: 3,
    questionNumber: 3,
    typology: "DESSINS",
    level: "A2",
    title: "Atelier de réparation de cycles — Crevaison et réglage des freins",
    speakingRate: 0.95,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Cycliste", "Mécanicien vélo"],
    speakerPersonas: [
      { role: "Cycliste", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" },
      { role: "Mécanicien", gender: "male", voiceId: "fr-FR-HenriNeural" }
    ],
    audioFr: "Cycliste : Bonjour, ma roue arrière est complètement à plat et les patins de frein avant grincent quand je m'arrête.\nMécanicien : Laissez-moi regarder... Oui, la chambre à air est percée. Je vais la remplacer et resserrer les câbles de frein. Votre vélo sera prêt à 17 heures.",
    audioEn: "Cyclist: Hello, my rear bicycle tire is completely flat and the front brake pads screech when I stop.\nMechanic: Let me take a look... Yes, the inner tube is punctured. I will replace it and tighten your brake cables. Your bike will be ready at 5:00 PM.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Un réparateur travaillant sur la roue d'une bicyclette dans un atelier de vélo",
      "Dessin B : Un automobiliste lavant son pare-brise dans une station de lavage",
      "Dessin C : Un voyageur poinçonnant son ticket au portillon d'accès d'un métro",
      "Dessin D : Un client essayant un casque audio au rayon multimédia d'un magasin"
    ],
    optionsEn: [
      "Drawing A: A mechanic working on a bicycle wheel inside a bike repair shop",
      "Drawing B: A motorist wiping his car windshield at an automotive carwash",
      "Drawing C: A subway commuter stamping a transit pass at a station turnstile",
      "Drawing D: A shopper trying on headphones in an electronics store department"
    ],
    correctIndex: 0, // Key A
    mainImage: "/illustrations/tef/tef_p4_q3_a.png",
    optionImages: [
      "/illustrations/tef/tef_p4_q3_a.png",
      "/illustrations/tef/tef_p4_q3_b.png",
      "/illustrations/tef/tef_p4_q3_c.png",
      "/illustrations/tef/tef_p4_q3_d.png"
    ]
  },
  {
    id: "tef-p4-co-q04",
    paperNumber: 4,
    questionNumber: 4,
    typology: "DESSINS",
    level: "A2",
    title: "Kiosque de presse — Achat d'un hebdomadaire et de carnets de timbres",
    speakingRate: 0.96,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Client", "Kiosquière"],
    speakerPersonas: [
      { role: "Client", gender: "male", voiceId: "fr-FR-AlainNeural" },
      { role: "Kiosquière", gender: "female", voiceId: "fr-FR-DeniseNeural" }
    ],
    audioFr: "Client : Bonjour madame, je vais prendre le journal d'aujourd'hui, ce magazine scientifique et un carnet de dix tickets de bus s'il vous plaît.\nKiosquière : Voilà pour vous monsieur. Ça vous fait un total de vingt-deux euros cinquante. Vous réglez par carte ou en liquide ?",
    audioEn: "Customer: Hello ma'am, I will take today's newspaper, this science magazine, and a book of ten bus tickets, please.\nKiosk Clerk: Here you are, sir. That comes to a total of twenty-two euros fifty. Will you pay by card or in cash?",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Un patient tendant une ordonnance au pharmacien devant des flacons",
      "Dessin B : Un usager rendant un chariot à roulettes à l'entrée d'un supermarché",
      "Dessin C : Un client achetant un journal et des revues au comptoir d'un kiosque de presse",
      "Dessin D : Un passager récupérant une valise volumineuse sur le tapis roulant d'une gare"
    ],
    optionsEn: [
      "Drawing A: A patient handing a prescription slip to a pharmacist in front of bottles",
      "Drawing B: A shopper returning a grocery rolling cart at a supermarket entrance",
      "Drawing C: A customer buying a newspaper and magazines at a street newsstand counter",
      "Drawing D: A passenger retrieving heavy luggage from a train station luggage carousel"
    ],
    correctIndex: 2, // Key C
    mainImage: "/illustrations/tef/tef_p4_q4_c.png",
    optionImages: [
      "/illustrations/tef/tef_p4_q4_a.png",
      "/illustrations/tef/tef_p4_q4_b.png",
      "/illustrations/tef/tef_p4_q4_c.png",
      "/illustrations/tef/tef_p4_q4_d.png"
    ]
  },

  // ── SECTION B : MESSAGES TÉLÉPHONIQUES & ANNONCES PUBLIQUES (Q5 - Q12) ──
  {
    id: "tef-p4-co-q05",
    paperNumber: 4,
    questionNumber: 5,
    typology: "MESSAGES",
    level: "A2",
    title: "Musée d'art contemporain — Nocturne étudiante et visite guidée",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Voix d'accueil du musée"],
    speakerPersonas: [{ role: "Accueil musée", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Bonjour, vous êtes bien sur le répondeur du musée d'art moderne. Nous vous informons que ce jeudi soir, l'accès à nos galeries d'exposition est prolongé jusqu'à 22 heures pour la nocturne des étudiants. L'entrée est gratuite pour les moins de vingt-six ans et une visite guidée commentée débutera à 20 heures dans le grand hall.",
    audioEn: "Hello, you have reached the voicemail of the modern art museum. We inform you that this Thursday evening, gallery access is extended until 10:00 PM for student late night. Admission is free for visitors under twenty-six and a guided commentary tour will commence at 8:00 PM in the grand foyer.",
    questionFr: "Quel événement particulier est proposé aux visiteurs ce jeudi soir ?",
    questionEn: "What special event is offered to museum visitors this Thursday evening?",
    optionsFr: [
      "Une vente aux enchères privée réservée aux collectionneurs d'œuvres d'art",
      "La fermeture définitive du musée pour travaux de désamiantage des plafonds",
      "Une ouverture en soirée avec entrée gratuite pour la jeunesse et visite commentée",
      "Un concert de musique symphonique payant dans les jardins extérieurs du parc"
    ],
    optionsEn: [
      "A private art auction sale reserved for international fine art collectors",
      "The definitive closure of the museum for ceiling asbestos remediation work",
      "An evening opening with free admission for young people and a guided tour",
      "A ticketed symphony orchestra music concert on the exterior park grounds"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q06",
    paperNumber: 4,
    questionNumber: 6,
    typology: "MESSAGES",
    level: "A2",
    title: "Agence immobilière — Confirmation de rendez-vous de visite locative",
    speakingRate: 1.01,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Agent immobilier"],
    speakerPersonas: [{ role: "Agent immobilier", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Bonjour monsieur Giraud, c'est l'agence Immobilière du Parc. Je vous appelle pour confirmer notre visite de l'appartement de deux pièces rue des Lilas demain matin à 11 heures 30. Le propriétaire sera présent. Pensez à apporter votre dossier complet avec vos trois derniers bulletins de paie et une pièce d'identité.",
    audioEn: "Hello Mr. Giraud, this is Parc Real Estate Agency. I am calling to confirm our inspection visit for the two-room apartment on Rue des Lilas tomorrow morning at 11:30 AM. The landlord will be present. Please remember to bring your completed rental file with your last three pay slips and an ID card.",
    questionFr: "Qu'attend le professionnel de son interlocuteur pour le rendez-vous ?",
    questionEn: "What does the estate agent expect from his client for the appointment?",
    optionsFr: [
      "Qu'il vienne avec les justificatifs demandés pour la visite de l'appartement",
      "Qu'il verse un chèque de caution de garantie dès aujourd'hui par la poste",
      "Qu'il repousse la signature du bail d'un mois suite au départ du propriétaire",
      "Qu'il fasse évaluer la valeur vénale de son bien par un notaire assermenté"
    ],
    optionsEn: [
      "That he arrive with required supporting documents for the apartment viewing",
      "That he post a security deposit cashier check today via registered mail",
      "That he postpone signing the residential lease by one month due to landlord travel",
      "That he have his property market valuation appraised by a licensed notary"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q07",
    paperNumber: 4,
    questionNumber: 7,
    typology: "MESSAGES",
    level: "B1",
    title: "SNCF — Alerte vents violents et limitation de vitesse ferroviaire",
    speakingRate: 1.02,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Voix de gare ferroviaire"],
    speakerPersonas: [{ role: "Voix officielle", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Avis aux voyageurs : en raison du passage de la tempête Éole et de rafales de vent dépassant cent dix kilomètres-heure, la vitesse de tous les trains régionaux sur l'axe littoral est limitée par mesure de sécurité à quatre-vingts kilomètres-heure. Des retards de vingt à trente minutes sont à prévoir sur l'ensemble de la journée. Nous vous invitons à consulter les panneaux d'affichage.",
    audioEn: "Notice to passengers: due to storm Éole bringing gale-force wind gusts exceeding 110 km/h, the operating speed of all regional trains on the coastal line is capped at 80 km/h for safety precautions. Delays of 20 to 30 minutes are expected across the day. We invite you to check station departure monitors.",
    questionFr: "Quelle perturbation affecte la circulation des trains aujourd'hui ?",
    questionEn: "What disruption is impacting train operations today?",
    optionsFr: [
      "Une interruption totale du réseau ferré causée par une grève surprise",
      "Une panne électrique généralisée sur les lignes à grande vitesse vers Paris",
      "L'obligation pour tous les passagers de changer de gare de correspondance",
      "Des retards généralisés causés par un ralentissement préventif face à la tempête"
    ],
    optionsEn: [
      "A complete rail network shutdown caused by an unannounced flash strike",
      "A widespread electrical power outage on high-speed rail lines heading to Paris",
      "A mandatory requirement for all travelers to switch connecting train stations",
      "Widespread delays triggered by precautionary speed limits during the storm"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q08",
    paperNumber: 4,
    questionNumber: 8,
    typology: "MESSAGES",
    level: "B1",
    title: "Médiathèque municipale — Rappel d'échéance de prêt documentaire",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Médiathécaire"],
    speakerPersonas: [{ role: "Médiathécaire", gender: "female", voiceId: "fr-FR-DeniseNeural" }],
    audioFr: "Bonjour monsieur Fabre, c'est la médiathèque George-Sand. Votre période d'emprunt pour les quatre bandes dessinées et le coffret DVD arrivait à échéance hier soir. Vous pouvez prolonger votre prêt de quinze jours directement sur notre portail en ligne ou déposer les documents dans la boîte de retour extérieure située devant l'entrée.",
    audioEn: "Hello Mr. Fabre, this is the George Sand Public Library. Your borrowing loan period for the four graphic novels and the DVD box set expired yesterday evening. You can renew your loan for fifteen days directly on our online web portal or drop the items into the outdoor returns drop-box in front of the entrance.",
    questionFr: "Quelle option la médiathèque propose-t-elle à l'usager ?",
    questionEn: "What option does the library offer to the borrower?",
    optionsFr: [
      "Acheter définitivement les documents empruntés à moitié prix",
      "Renouveler le délai d'emprunt sur internet ou restituer les œuvres dans la boîte extérieure",
      "Payer une pénalité financière immédiate au guichet sous peine d'exclusion",
      "Faire don de nouveaux livres pour compenser le retard de restitution"
    ],
    optionsEn: [
      "Purchase the borrowed library items permanently at half their retail price",
      "Renew the loan period online or return the materials via the outside drop-box",
      "Pay an immediate financial penalty fine at the desk under threat of banishment",
      "Donate brand-new replacement books to compensate for the overdue return"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q09",
    paperNumber: 4,
    questionNumber: 9,
    typology: "MESSAGES",
    level: "B1",
    title: "Centre de contrôle technique — Rappel d'échéance obligatoire",
    speakingRate: 1.01,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Responsable du centre technique"],
    speakerPersonas: [{ role: "Responsable centre", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Bonjour madame Bertrand, ici SécuriAuto. Nous vous rappelons que le contrôle technique périodique de votre véhicule arrive à expiration le 28 du mois en cours. Rouler avec un contrôle technique périmé vous expose à une contravention de cent trente-cinq euros et à une immobilisation du véhicule. Rendez-vous sur notre site pour réserver votre créneau de contrôle.",
    audioEn: "Hello Mrs. Bertrand, this is SécuriAuto Inspection. We remind you that your vehicle's periodic safety inspection expires on the 28th of the current month. Driving with an expired certificate exposes you to a 135-euro fine and vehicle impoundment. Please visit our website to book your inspection timeslot.",
    questionFr: "Quelle mise en garde légale est formulée dans ce message ?",
    questionEn: "What legal warning is stated in this message?",
    optionsFr: [
      "L'obligation de changer le moteur du véhicule avant la fin de l'année",
      "Une augmentation des tarifs d'assurance pour tous les véhicules de plus de cinq ans",
      "L'interdiction formelle de circuler sur autoroute en cas de contrôle de police",
      "Le risque de sanction financière et de blocage du véhicule si le contrôle expire"
    ],
    optionsEn: [
      "The obligation to replace the vehicle engine prior to the end of the calendar year",
      "An increase in insurance premium rates for all motor vehicles older than five years",
      "A formal ban on driving on toll motorways during random police highway patrols",
      "The risk of financial penalties and vehicle impoundment if inspection expires"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q10",
    paperNumber: 4,
    questionNumber: 10,
    typology: "MESSAGES",
    level: "B1",
    title: "Fournisseur d'énergie — Coupure programmée pour renforcement du réseau",
    speakingRate: 1.02,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Voix de notification Enedis"],
    speakerPersonas: [{ role: "Voix Enedis", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Chers résidents du quartier des Tilleuls, afin d'améliorer la qualité de distribution électrique et de raccorder de nouvelles installations solaires, une interruption programmée de l'alimentation électrique aura lieu ce mardi de 8 heures à 12 heures. Nous vous conseillons de débrancher vos appareils électroniques sensibles avant le début des travaux.",
    audioEn: "Dear residents of the Tilleuls district, in order to improve power distribution reliability and connect new solar arrays, a scheduled electrical outage will take place this Tuesday from 8:00 AM to 12:00 PM. We advise you to unplug sensitive electronic equipment prior to the start of maintenance works.",
    questionFr: "Quelle consigne pratique est recommandée aux riverains ?",
    questionEn: "What practical precaution is recommended to local residents?",
    optionsFr: [
      "Quitter impérativement leur logement pendant toute la matinée du mardi",
      "Débrancher leurs équipements électriques délicats avant la coupure annoncée",
      "Installer immédiatement un compteur électrique individuel à leurs frais",
      "Remplacer toutes leurs ampoules par des modèles à faible consommation"
    ],
    optionsEn: [
      "Evacuate their residential homes during Tuesday morning without exception",
      "Disconnect delicate electronic equipment ahead of the scheduled outage",
      "Install an individual smart electricity meter immediately at their own cost",
      "Replace all household incandescent bulbs with energy-efficient LED models"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q11",
    paperNumber: 4,
    questionNumber: 11,
    typology: "MESSAGES",
    level: "B1",
    title: "Centre de remise en forme — Nouveaux cours collectifs de yoga",
    speakingRate: 1.01,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Responsable club de sport"],
    speakerPersonas: [{ role: "Responsable club", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Avis à tous les adhérents de Fit'Club ! Dès lundi prochain, nous ouvrons trois nouveaux créneaux hebdomadaires de yoga dynamique et de renforcement postural le mardi et le jeudi soir à 18 heures 30. Les séances sont incluses dans votre abonnement privilège, mais la réservation préalable sur notre application mobile est obligatoire pour garantir votre tapis.",
    audioEn: "Notice to all Fit'Club members! Starting next Monday, we are opening three new weekly sessions of dynamic yoga and core conditioning on Tuesday and Thursday evenings at 6:30 PM. Classes are included in your premium membership pass, but advance booking via our mobile app is mandatory to secure your mat.",
    questionFr: "Quelle condition est exigée pour participer aux nouveaux cours de yoga ?",
    questionEn: "What condition is required to attend the new yoga classes?",
    optionsFr: [
      "Réserver obligatoirement sa place à l'avance sur l'application du club",
      "Payer un supplément tarifaire de dix euros à l'entrée de chaque séance",
      "Présenter un diplôme officiel d'aptitude aux arts martiaux traditionnels",
      "Venir avec son propre matériel de sonorisation et son enregistrement musical"
    ],
    optionsEn: [
      "Mandatorily reserve one's spot in advance on the gym's mobile application",
      "Pay an additional ten-euro surcharge fee at the entrance of each session",
      "Present an official black-belt certificate of proficiency in martial arts",
      "Bring personal speaker audio equipment and music playlists to class"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q12",
    paperNumber: 4,
    questionNumber: 12,
    typology: "MESSAGES",
    level: "B1",
    title: "Service municipal des déchets — Collecte exceptionnelle d'encombrants",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Agent communal des déchets"],
    speakerPersonas: [{ role: "Agent communal", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Bonjour, ici le service propreté de la mairie. Nous vous informons que le ramassage des encombrants dans votre secteur est programmé pour le premier mercredi du mois. Les meubles et appareils électroménagers doivent être déposés proprement sur le trottoir la veille au soir après 20 heures, sans entraver le passage des piétons. Tout dépôt sauvage en dehors de ce créneau fera l'objet d'une amende forfaitaire.",
    audioEn: "Hello, this is the municipal sanitation department. We inform you that bulky waste collection in your sector is scheduled for the first Wednesday of the month. Furniture and domestic appliances must be placed neatly on the sidewalk the night before after 8:00 PM, without obstructing pedestrian walkways. Any fly-tipping outside this window will incur a fixed penalty fine.",
    questionFr: "Quelle consigne précise régit le dépôt des objets encombrants ?",
    questionEn: "What specific instruction governs the disposal of bulky household waste?",
    optionsFr: [
      "Les transporter personnellement jusqu'au centre de tri situé à cinquante kilomètres",
      "Les déposer le matin même après le passage des camions de voirie municipale",
      "Les sortir sur le trottoir la veille au soir sans gêner la circulation piétonne",
      "Payer une redevance en espèces directement aux éboueurs lors de la collecte"
    ],
    optionsEn: [
      "Transport them personally to the central processing dump fifty kilometers away",
      "Place them on curbs the morning of pickup after municipal street trucks have passed",
      "Place them on the sidewalk the night before without obstructing foot traffic",
      "Pay a cash handling gratuity directly to sanitation collectors during pickup"
    ],
    correctIndex: 2, // Key C
  },

  // ── SECTION C : MICRO-TROTTOIRS (Q13 - Q18) ──
  // Sujet : L'instauration des péages urbains et des zones à faibles émissions (ZFE) en centre-ville
  {
    id: "tef-p4-co-q13",
    paperNumber: 4,
    questionNumber: 13,
    typology: "MICRO_TROTTOIR",
    level: "B1",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenante 1 (Valérie)",
    speakingRate: 1.04,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Valérie (mère de deux enfants asthmatiques)"],
    speakerPersonas: [{ role: "Valérie", gender: "female", voiceId: "fr-FR-DeniseNeural" }],
    audioFr: "Valérie : Pour moi, c'est une mesure de santé publique vitale ! Mes deux enfants souffrent d'asthme sévère, et depuis que la ZFE limite les vieux diesels polluants autour de leur école, leurs crises respiratoires ont diminué de moitié. On ne peut plus sacrifier les poumons de nos enfants pour le confort des automobilistes solitaires.",
    audioEn: "Valérie: For me, this is a vital public health measure! Both my children suffer from severe asthma, and since the low-emission zone banned polluting diesel vehicles around their school, their respiratory attacks dropped by half. We can no longer sacrifice our children's lungs for the convenience of solo drivers.",
    questionFr: "Pourquoi Valérie soutient-elle fermement la mise en place de la ZFE ?",
    questionEn: "Why does Valérie strongly support the establishment of the low-emission zone?",
    optionsFr: [
      "Elle espère une baisse des prix des carburants dans les stations-service de quartier",
      "Elle souhaite que tous les trajets scolaires se fassent obligatoirement en calèche",
      "Elle milite pour l'interdiction totale de tout moyen de transport motorisé dans le pays",
      "Elle constate une nette amélioration de la santé respiratoire de ses enfants asthmatiques"
    ],
    optionsEn: [
      "She hopes for a drop in retail fuel prices at neighborhood service stations",
      "She wishes for all school commutes to be made strictly by horse-drawn carriages",
      "She advocates for a nationwide total ban on all motorized means of transit",
      "She observes a marked improvement in the respiratory health of her asthmatic children"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q14",
    paperNumber: 4,
    questionNumber: 14,
    typology: "MICRO_TROTTOIR",
    level: "B1",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenant 2 (Bruno)",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Bruno (artisan plombier indépendant)"],
    speakerPersonas: [{ role: "Bruno", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Bruno : C'est une injustice économique totale pour les artisans ! Mon fourgon diesel de 2014 fonctionne parfaitement, mais il est classé Crit'Air 3. Acheter une camionnette électrique équivalente me coûterait cinquante mille euros, ce qui est impossible pour mon entreprise. Si je dois payer un péage de quinze euros à chaque intervention, je devrai refuser tous les chantiers en centre-ville.",
    audioEn: "Bruno: This is a total economic injustice for independent tradespeople! My 2014 diesel work van runs perfectly, but it is classified as Crit'Air 3. Buying an equivalent electric van would cost me fifty thousand euros, which is impossible for my small business. If I must pay a fifteen-euro toll for every call-out, I will have to turn down all downtown jobs.",
    questionFr: "Quel problème financier majeur Bruno expose-t-il ?",
    questionEn: "What major financial hurdle does Bruno point out?",
    optionsFr: [
      "La hausse imprévue du coût des assurances habitation pour les particuliers",
      "L'impossibilité d'amortir le coût exorbitant d'un véhicule électrique pour ses dépannages",
      "La diminution des tarifs horaires appliqués par les chambres de métiers",
      "Le refus des banques d'accorder des comptes de dépôt aux artisans du bâtiment"
    ],
    optionsEn: [
      "An unexpected increase in homeowners insurance premium rates for individuals",
      "The impossibility of financing the steep cost of an electric van for service call-outs",
      "The reduction in hourly wage rates enforced by vocational trade chambers",
      "The outright refusal of commercial banks to open deposit accounts for plumbers"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q15",
    paperNumber: 4,
    questionNumber: 15,
    typology: "MICRO_TROTTOIR",
    level: "B1",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenante 3 (Yasmina)",
    speakingRate: 1.04,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Yasmina (étudiante habitant en grande banlieue)"],
    speakerPersonas: [{ role: "Yasmina", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Yasmina : L'intention écologique est louable, mais cette mesure pénalise injustement ceux qui vivent loin. J'habite dans une commune périphérique où il n'y a que deux bus par jour et pas de gare. Si je ne peux plus entrer en ville avec ma petite voiture d'occasion pour aller à l'université ou à mon travail étudiant le soir, je suis totalement bloquée. Il fallait d'abord développer des transports en commun fiables avant d'interdire les voitures.",
    audioEn: "Yasmina: The ecological intent is commendable, but this policy unfairly penalizes peripheral suburbanites. I live in a rural town with only two buses a day and no railway station. If I can no longer drive my secondhand car into the city for university lectures or my evening student job, I am completely stranded. They should have developed reliable public transit before banning cars.",
    questionFr: "Quel reproche principal Yasmina formule-t-elle à l'encontre de la mesure ?",
    questionEn: "What primary criticism does Yasmina voice regarding the measure?",
    optionsFr: [
      "Le manque criant d'alternatives en transports publics pour les habitants de la périphérie",
      "La suppression des bourses universitaires pour les étudiants résidant en banlieue",
      "L'obligation de posséder deux véhicules pour obtenir son diplôme d'études supérieures",
      "La fermeture définitive des bibliothèques universitaires après dix-neuf heures"
    ],
    optionsEn: [
      "The glaring absence of viable public transit alternatives for peripheral suburbanites",
      "The cancellation of higher education university scholarships for suburban students",
      "The requirement to own two passenger vehicles in order to graduate from college",
      "The permanent closure of academic campus libraries after seven o'clock in the evening"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q16",
    paperNumber: 4,
    questionNumber: 16,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenant 4 (Philippe)",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Dr. Philippe (médecin pneumologue hospitalier)"],
    speakerPersonas: [{ role: "Dr. Philippe", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Dr. Philippe : En tant que praticien hospitalier, les chiffres sont sans appel : les particules fines et le dioxyde d'azote émis par le trafic routier dense provoquent des milliers d'accidents vasculaires et d'insuffisances respiratoires chaque année. Les villes pionnières qui ont instauré un péage urbain ont enregistré une chute de 20 % des hospitalisations pour détresse pulmonaire. C'est une mesure de survie collective dont le coût économique est largement compensé par les économies de santé.",
    audioEn: "Dr. Philippe: As a hospital physician, the clinical data is indisputable: fine particulate matter and nitrogen dioxide from congested traffic cause thousands of strokes and respiratory failures annually. Pioneer cities that launched congestion tolling recorded a 20% drop in emergency hospitalizations for pulmonary distress. It is a collective survival measure whose economic cost is vastly offset by healthcare savings.",
    questionFr: "Quelle justification médicale le Dr. Philippe apporte-t-il en faveur des péages urbains ?",
    questionEn: "What clinical justification does Dr. Philippe provide in favor of urban congestion tolls?",
    optionsFr: [
      "La possibilité de financer de nouveaux laboratoires de recherche pharmaceutique privée",
      "L'obligation pour les conducteurs de passer un examen cardiologique tous les six mois",
      "Une diminution prouvée des hospitalisations d'urgence grâce à la baisse des polluants de l'air",
      "La réduction du temps de travail des personnels soignants dans les blocs opératoires"
    ],
    optionsEn: [
      "The opportunity to fund brand-new commercial private pharmaceutical laboratories",
      "A mandate requiring drivers to undergo cardiac stress exams every six months",
      "A proven decline in emergency hospital admissions driven by reduced air pollution",
      "A reduction in weekly working hours for hospital surgical operating theater staff"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q17",
    paperNumber: 4,
    questionNumber: 17,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenante 5 (Corinne)",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Corinne (commerçante d'habillement en centre-ville)"],
    speakerPersonas: [{ role: "Corinne", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Corinne : Dans ma boutique de prêt-à-porter, près de 40 % de ma clientèle vient des zones rurales environnantes qui n'ont pas accès au train. Depuis qu'on leur complique l'accès avec des vignettes et la menace d'un péage, ils ne viennent plus : ils préfèrent commander sur des plateformes américaines ou se rendre dans les grands centres commerciaux de périphérie où les parkings sont gratuits. On est en train d'asphyxier le petit commerce urbain sous prétexte d'écologie.",
    audioEn: "Corinne: In my clothing boutique, nearly 40% of my client base comes from surrounding rural districts with no rail links. Since access was made cumbersome with stickers and the threat of toll fees, they stopped coming: they prefer ordering from American online portals or driving to suburban shopping malls with free parking. We are strangling downtown independent retail under the pretext of ecology.",
    questionFr: "Quelle conséquence commerciale négative Corinne déplore-t-elle ?",
    questionEn: "What negative retail consequence does Corinne lament?",
    optionsFr: [
      "Une hausse exorbitante des tarifs de gros imposée par ses fabricants de textile",
      "La perte de ses clients périurbains au profit du commerce en ligne et des centres périphériques",
      "L'obligation de vendre uniquement des vêtements fabriqués à partir de coton biologique",
      "Une pénurie de personnel de vente causée par la fermeture des écoles de commerce"
    ],
    optionsEn: [
      "An exorbitant wholesale cost increase levied by her overseas garment manufacturers",
      "The loss of rural customers switching to online shopping and suburban shopping malls",
      "The regulatory mandate to exclusively stock garments manufactured from organic cotton",
      "A retail sales staffing shortage triggered by the closure of regional business schools"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q18",
    paperNumber: 4,
    questionNumber: 18,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : ZFE & Péages urbains — Intervenant 6 (Romain)",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Romain (cycliste urbain et père de famille)"],
    speakerPersonas: [{ role: "Romain", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Romain : Rouler à vélo en ville est enfin devenu une expérience agréable et sécurisante ! La réduction du trafic automobile a libéré de l'espace pour de vraies pistes cyclables larges et continues, loin du vacarme assourdissant des embouteillages. Les piétons se réapproprient les trottoirs, les terrasses respirent et la ville redevient un espace convivial à taille humaine où l'on peut laisser ses enfants marcher sans panique.",
    audioEn: "Romain: Cycling around town has finally become a pleasurable and reassuring experience! Slashed vehicle traffic liberated roadway space for wide, unbroken bike paths, far from the deafening roar of traffic jams. Pedestrians are reclaiming sidewalks, café terraces breathe easy, and the city is becoming a convivial human-scale habitat where children can walk safely.",
    questionFr: "Quels changements urbains positifs Romain célèbre-t-il dans son quotidien ?",
    questionEn: "What positive urban transformations does Romain celebrate in his daily life?",
    optionsFr: [
      "L'autorisation accordée aux cyclistes de circuler à grande vitesse sur les voies d'autobus",
      "La gratuité intégrale de toutes les réparations mécaniques dans les ateliers de vélo",
      "La transformation de tous les boulevards urbains en pistes d'atterrissage pour drones",
      "L'apaisement sonore, la sécurité accrue des déplacements cyclables et la convivialité des rues"
    ],
    optionsEn: [
      "The authorization granting cyclists permission to speed across express bus lanes",
      "The total free provision of mechanical maintenance repairs across municipal bike shops",
      "The conversion of all downtown boulevards into automated delivery drone runways",
      "A quieter soundscape, heightened cycling safety, and child-friendly walkable streets"
    ],
    correctIndex: 3, // Key D
  },

  // ── SECTION D : REPORTAGES D'ACTUALITÉ & CHRONIQUES (Q19 - Q28) ──
  {
    id: "tef-p4-co-q19",
    paperNumber: 4,
    questionNumber: 19,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Énergie — La géothermie de surface pour le chauffage urbain",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le journaliste énergie"],
    speakerPersonas: [{ role: "Journaliste énergie", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "À quelques mètres sous nos pieds, la température du sous-sol reste stable toute l'année, oscillant entre douze et quinze degrés. Dans l'écoquartier de Bordeaux-Bastide, un réseau de deux cents sondes géothermiques verticales puise cette chaleur naturelle pour alimenter cinq mille logements en eau chaude et en chauffage via des pompes à chaleur collectives. En été, le système s'inverse pour climatiser les appartements par géocooling passif sans consommer d'électricité pour des climatiseurs, divisant par cinq les rejets de gaz à effet de serre du quartier.",
    audioEn: "Just a few meters below our feet, subsoil temperatures remain constant year-round between 12 and 15 degrees Celsius. In the Bordeaux-Bastide eco-district, a network of two hundred vertical geothermal borehole loops taps this natural warmth to supply 5,000 homes with heating and hot water via centralized heat pumps. In summer, the cycle reverses to cool apartments via passive geocooling without running power-hungry air conditioning, cutting local carbon emissions by 80%.",
    questionFr: "Quel double avantage thermique ce réseau géothermique offre-t-il aux logements ?",
    questionEn: "What dual thermal advantage does this geothermal network offer to homes?",
    optionsFr: [
      "Un chauffage hivernal performant et un rafraîchissement estival passif très économe en énergie",
      "La production gratuite d'eau minérale gazeuse distribuée directement aux robinets de cuisine",
      "L'élimination définitive de toute facture d'eau et d'électricité pour les copropriétaires",
      "L'obligation de fermer les volets de tous les appartements pendant les trois mois d'été"
    ],
    optionsEn: [
      "High-efficiency winter heating combined with highly energy-efficient passive summer cooling",
      "The free extraction of sparkling mineral water piped straight into kitchen sink taps",
      "The complete eradication of all water and power utility bills for building residents",
      "A mandatory requirement to keep all apartment window shutters closed all summer long"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q20",
    paperNumber: 4,
    questionNumber: 20,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Médecine — L'intelligence artificielle et le dépistage rétinien",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La chroniqueuse santé"],
    speakerPersonas: [{ role: "Chroniqueuse santé", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "La rétinopathie diabétique est la première cause de cécité évitable chez les adultes en âge de travailler. Dans les zones rurales où les délais pour consulter un ophtalmologiste dépassent souvent huit mois, un nouvel algorithme d'apprentissage profond intégré à une caméra rétinienne portable change la donne. Utilisé par des infirmiers de campagne, l'appareil analyse le fond d'œil en moins de trente secondes avec une précision de 97 %, détectant les micro-anévrismes précoces bien avant l'apparition des premiers troubles visuels.",
    audioEn: "Diabetic retinopathy is the leading cause of preventable blindness among working-age adults. In rural regions where ophthalmologist wait times frequently exceed eight months, a novel deep-learning algorithm coupled to a handheld fundus camera is transforming care. Operated by community nurses, the device evaluates retinal scans in under thirty seconds with 97% diagnostic accuracy, catching microaneurysms well before visual symptoms emerge.",
    questionFr: "Quelle avancée clinique ce dispositif d'intelligence artificielle apporte-t-il ?",
    questionEn: "What clinical advance does this artificial intelligence device deliver?",
    optionsFr: [
      "Le remplacement chirurgical de la rétine humaine par une puce électronique en titane",
      "La guérison instantanée du diabète de type 1 par administration d'ondes lumineuses",
      "Un dépistage ultra-rapide et décentralisé des lésions oculaires précoces en milieu isolé",
      "L'interdiction pour les patients diabétiques de pratiquer des activités sportives en plein air"
    ],
    optionsEn: [
      "The surgical replacement of human retinas with a bioengineered titanium microchip",
      "The instantaneous cure of type 1 diabetes through calibrated laser light emissions",
      "Ultra-fast, decentralized screening of early ocular lesions in underserved rural areas",
      "A strict medical prohibition barring diabetic patients from outdoor sports activities"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q21",
    paperNumber: 4,
    questionNumber: 21,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Biodiversité marine — La restauration des herbiers de posidonie",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le biologiste marin"],
    speakerPersonas: [{ role: "Biologiste marin", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Souvent qualifiée de poumon vert de la Méditerranée, la posidonie n'est pas une algue, mais une plante à fleurs sous-marine qui capture jusqu'à sept fois plus de carbone par hectare que la forêt amazonienne. Dévastés pendant des décennies par le mouillage des ancres de yachts de luxe, ces herbiers font l'objet d'un vaste programme de replantation. Des plongeurs scientifiques fixent des boutures saines sur des nattes en fibres de coco biodégradables, restaurant ainsi les nurseries naturelles de poissons et stabilisant le sable littoral contre l'érosion côtière.",
    audioEn: "Often termed the green lung of the Mediterranean, Posidonia oceanica is not seaweed, but an underwater flowering seagrass that captures up to seven times more carbon per hectare than the Amazon rainforest. Devastated for decades by mega-yacht anchor dragging, these meadows are undergoing a massive restoration campaign. Marine biologists pin healthy cuttings onto biodegradable coconut fiber mats, restoring juvenile fish nurseries while anchoring coastal sands against erosion.",
    questionFr: "Pourquoi la sauvegarde des herbiers de posidonie est-elle cruciale pour l'environnement ?",
    questionEn: "Why is the preservation of Posidonia seagrass meadows crucial for the environment?",
    optionsFr: [
      "Elle permet de produire du carburant d'aviation biologique pour les vols commerciaux",
      "Elle favorise l'amarrage d'un plus grand nombre de navires de croisière le long des côtes",
      "Elle remplace définitivement les digues rocheuses artificielles autour des ports pétroliers",
      "Elle constitue un puits de carbone exceptionnel et protège les plages contre l'érosion"
    ],
    optionsEn: [
      "It allows the production of sustainable bio-kerosene fuel for commercial aviation flights",
      "It facilitates the anchoring of larger fleets of cruise ships directly against shorelines",
      "It permanently eliminates the need for rock breakwaters around oil tanker terminals",
      "It serves as an extraordinary carbon sink while protecting beaches against coastal erosion"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q22",
    paperNumber: 4,
    questionNumber: 22,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Gestion de l'eau — La réutilisation des eaux usées en irrigation agricole",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ingénieure agronome"],
    speakerPersonas: [{ role: "Ingénieure agronome", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Alors qu'Israël recycle près de 90 % de ses eaux usées pour l'agriculture, la France n'en valorise encore que moins de 1 %, rejetant chaque jour des milliards de litres d'eau traitée dans l'océan. En Vendée, une station d'épuration innovante soumet l'eau issue des stations urbaines à un traitement par ultrafiltration membranaire et rayonnement ultraviolet. L'eau purifiée obtenue, totalement exempte de bactéries et de micropolluants, est réinjectée dans les réseaux d'irrigation des vergers et des maraîchers locaux, sécurisant les récoltes sans puiser dans les nappes phréatiques déficitaires.",
    audioEn: "While Israel recycles nearly 90% of its wastewater for agricultural irrigation, France repurposes under 1%, discharging billions of liters of treated effluent into the ocean daily. In Vendée, a pioneering purification facility subjects municipal wastewater to membrane ultrafiltration and ultraviolet radiation. The purified water, completely free of pathogens and micropollutants, is channeled into irrigation networks for local orchards and vegetable farms, securing crops without draining depleted aquifers.",
    questionFr: "Quel bénéfice écologique majeur cette technologie de filtration apporte-t-elle au monde agricole ?",
    questionEn: "What major ecological benefit does this filtration technology bring to agriculture?",
    optionsFr: [
      "Irriguer durablement les cultures avec de l'eau purifiée sans épuiser les nappes souterraines",
      "Supprimer l'obligation de laver les fruits et légumes avant leur commercialisation",
      "Interdire l'usage de tout pesticide chimique sur l'ensemble du territoire européen",
      "Remplacer les engrais organiques par des poudres synthétiques à base de plastique"
    ],
    optionsEn: [
      "Sustainably irrigating crops with purified water without depleting groundwater aquifers",
      "Eliminating the legal sanitary requirement to wash fresh fruits before retail sale",
      "Banning the application of all synthetic chemical pesticides across European agriculture",
      "Replacing organic compost fertilizers with microplastic synthetic powder additives"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q23",
    paperNumber: 4,
    questionNumber: 23,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Numérique — Le reconditionnement industriel des serveurs de données",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le spécialiste en sobriété numérique"],
    speakerPersonas: [{ role: "Spécialiste numérique", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "L'empreinte environnementale du numérique est à 80 % liée à la fabrication des équipements matériels et non à leur utilisation quotidienne. Dans la plupart des grands centres de données, les serveurs informatiques sont systématiquement remplacés tous les trois ans par simple précaution contractuelle, alors que leurs composants sont en parfait état. Une filière industrielle de reconditionnement démonte ces serveurs, teste rigoureusement les microprocesseurs, remplace les ventilateurs et offre une garantie de trois ans à des prix 60 % inférieurs. Prolonger la durée de vie de ces serveurs de trois à six ans permet d'éviter l'extraction de tonnes de métaux rares.",
    audioEn: "Eighty percent of digital technology's carbon footprint stems from hardware manufacturing rather than day-to-day electrical consumption. In most commercial data centers, computing servers are routinely decommissioned every three years purely as contractual precautions, even though their components are in pristine condition. An industrial refurbishment sector now dismantles these servers, stress-tests processors, replaces cooling fans, and offers three-year warranties at 60% lower costs. Doubling server lifespans from three to six years avoids extracting tonnes of rare metals.",
    questionFr: "Pourquoi le reconditionnement des serveurs informatiques est-il décisif pour le climat ?",
    questionEn: "Why is data center server refurbishment crucial for the climate?",
    optionsFr: [
      "Parce qu'il permet de fermer tous les centres de données pour revenir au stockage papier",
      "Parce que les serveurs reconditionnés consomment zéro watt d'électricité en fonctionnement",
      "Parce qu'étendre la durée de vie du matériel évite la fabrication polluante d'appareils neufs",
      "Parce que les nouveaux serveurs sont obligatoirement alimentés au charbon thermique"
    ],
    optionsEn: [
      "Because it allows shutting down all server farms to return to paper archival storage",
      "Because refurbished computing servers consume zero watts of electricity during operation",
      "Because extending hardware lifespan avoids the carbon-heavy manufacturing of new units",
      "Because newly manufactured servers are legally mandated to run on thermal coal power"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q24",
    paperNumber: 4,
    questionNumber: 24,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Urbanisme — Les enrobés phoniques antibruit sur les rocades urbaines",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ingénieur acousticien"],
    speakerPersonas: [{ role: "Ingénieur acousticien", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Le bruit de roulement des pneus sur le bitume représente plus de 70 % des nuisances sonores perçues par les riverains d'autoroutes périurbaines dès que les véhicules dépassent cinquante kilomètres-heure. Sur la rocade de Grenoble, la métropole a expérimenté un enrobé phonique poreux composé de caoutchouc issu de pneus recyclés et de granulats drainants. Cette surface spéciale piège les ondes sonores dans ses cavités microscopiques au lieu de les réverbérer vers les habitations, réduisant le niveau sonore mesuré de six décibels, ce qui correspond pour l'oreille humaine à une division par quatre du vacarme de circulation.",
    audioEn: "Tire-road contact friction accounts for over 70% of noise pollution experienced by highway neighbors once vehicle speeds exceed 50 km/h. Along the Grenoble bypass, regional authorities tested a porous acoustic asphalt blend composed of recycled tire crumb rubber and drainage aggregate. This engineered surface traps sound pressure waves within microscopic air pockets rather than echoing them toward homes, cutting decibel readings by six decibels, which to human ears represents a fourfold reduction in perceived traffic roar.",
    questionFr: "Quel résultat acoustique remarquable cet enrobé novateur procure-t-il aux habitants ?",
    questionEn: "What remarkable acoustic benefit does this innovative asphalt provide to residents?",
    optionsFr: [
      "Une interdiction absolue de circuler de nuit pour tous les camions de transport de fret",
      "Une division par quatre du bruit perçu grâce à l'absorption des ondes sonores de roulement",
      "La transformation obligatoire de tous les véhicules particuliers en voitures volantes",
      "L'obligation pour les riverains de porter des casques antibruit individuels dans leur jardin"
    ],
    optionsEn: [
      "A complete ban on night driving enforced across all heavy freight transport trucks",
      "A fourfold reduction in perceived noise thanks to the absorption of tire rolling sound",
      "A mandatory requirement converting all private passenger automobiles into flying vehicles",
      "A requirement for roadside residents to wear noise-cancelling ear protection in their yards"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q25",
    paperNumber: 4,
    questionNumber: 25,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Mode durable — Le retour du chanvre textile local",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La styliste éco-responsable"],
    speakerPersonas: [{ role: "Styliste", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "La culture conventionnelle du coton consomme des quantités astronomiques d'eau et engloutit un quart des insecticides mondiaux, tandis que les fibres synthétiques comme le polyester libèrent des microplastiques à chaque lavage. En Normandie et en Bourgogne, une filière textile réhabilite le chanvre : cette plante rustique pousse sans aucun pesticide, réclame deux fois moins d'eau que le coton et capte le carbone à grande vitesse. Grâce à de nouveaux procédés de défibrage mécanique doux, les fils obtenus rivalisent en souplesse et en douceur avec le lin, tout en offrant des propriétés naturellement antibactériennes et thermorégulatrices.",
    audioEn: "Conventional cotton farming consumes astronomical volumes of water and absorbs a quarter of global agricultural insecticides, while synthetic polymers like polyester shed microplastics during every washing cycle. In Normandy and Burgundy, a revived textile sector is championing industrial hemp: this hardy plant requires zero chemical pesticides, drinks half the water of cotton, and sequesters atmospheric carbon at high rates. Thanks to new gentle mechanical unravelling techniques, spun hemp yarns rival linen in softness while offering naturally antibacterial and temperature-regulating properties.",
    questionFr: "Quels atouts écologiques et textiles majeurs caractérisent le chanvre cultivé localement ?",
    questionEn: "What major ecological and textile strengths characterize locally grown industrial hemp?",
    optionsFr: [
      "L'obligation d'utiliser des colorants fluorescents artificiels pour teindre les étoffes",
      "La nécessité d'importer l'intégralité des matières premières depuis des fermes tropicales",
      "Un tissu rugueux réservé exclusivement à la fabrication de voiles de bateaux anciens",
      "Une culture sans pesticides très économe en eau produisant des fibres douces et thermorégulatrices"
    ],
    optionsEn: [
      "The obligation to use synthetic fluorescent chemical dyes to color finished fabrics",
      "The requirement to import all raw textile materials from offshore tropical plantations",
      "A rough, scratchy cloth restricted strictly to rigging canvas sails on historic wooden ships",
      "A pesticide-free, water-efficient crop yielding soft, naturally breathable and thermoregulating fibers"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q26",
    paperNumber: 4,
    questionNumber: 26,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Société — L'habitat participatif et la mutualisation d'espaces",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le sociologue de l'habitat"],
    speakerPersonas: [{ role: "Sociologue", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Rompre avec l'individualisme des copropriétés classiques sans renoncer à son intimité familiale : c'est le modèle de l'habitat participatif qui séduit de plus en plus de foyers urbains. À Strasbourg, vingt familles ont conçu ensemble leur immeuble en associant des appartements privatifs à de vastes espaces communs partagés : buanderie collective avec lave-linge professionnels, chambre d'amis partagée pour recevoir des invités, potager en toiture et atelier de bricolage. Ce partage d'équipements permet d'économiser 20 % sur le coût global de construction tout en tissant des solidarités quotidiennes concrètes entre générations.",
    audioEn: "Breaking free from the isolation of traditional apartment blocks without sacrificing domestic privacy: this is the co-housing model attracting growing numbers of urban families. In Strasbourg, twenty households collaboratively designed their building, combining private apartments with expansive shared communal facilities: a commercial laundry room, a shared guest suite for visiting relatives, a rooftop vegetable allotment, and a workshop. This pooling of amenities cuts overall construction costs by 20% while fostering vibrant intergenerational solidarity in daily life.",
    questionFr: "Quel est le principe d'organisation de cet habitat participatif ?",
    questionEn: "What is the organizational principle behind this co-housing model?",
    optionsFr: [
      "Associer des logements privatifs à des espaces et équipements mutualisés pour réduire les coûts",
      "Supprimer toute pièce privative pour obliger les familles à vivre ensemble dans une seule salle",
      "Interdire aux familles d'inviter des proches ou des amis extérieurs dans le bâtiment",
      "Imposer le tirage au sort annuel des appartements pour forcer les résidents à déménager"
    ],
    optionsEn: [
      "Pairing private family homes with shared communal amenities to slash overhead costs",
      "Eliminating private living quarters to force all households into a single communal dormitory",
      "Prohibiting families from inviting outside relatives or personal guests into the complex",
      "Mandating an annual random lottery reshuffle of apartments forcing families to move rooms"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q27",
    paperNumber: 4,
    questionNumber: 27,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Écologie rurale — Les jachères mellifères pour sauver les abeilles sauvages",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'entomologiste de terrain"],
    speakerPersonas: [{ role: "Entomologiste", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Les paysages de monoculture céréalière intensive créent de véritables déserts alimentaires pour les insectes pollinisateurs dès la fin des floraisons de printemps. Dans la Beauce, un collectif d'agriculteurs et d'apiculteurs a semé des bandes fleuries de dix mètres de large le long des parcelles de blé, composées d'un mélange de trèfle, de phacélie, de bleuet et de tournesol tardif. Ces corridors mellifères garantissent une source continue de nectar et de pollen jusqu'aux premières gelées d'automne, permettant aux populations d'abeilles solitaires et de bourdons de multiplier par trois leur taux de survie hivernale.",
    audioEn: "Intensive grain monoculture landscapes create acute food deserts for pollinating insects once spring blossoms fade. Across the Beauce plain, a coalition of farmers and beekeepers planted ten-meter-wide wildflower strips bordering wheat fields, featuring crimson clover, phacelia, cornflower, and late-blooming sunflower. These nectar corridors secure an unbroken food supply until autumn frosts arrive, enabling solitary wild bees and bumblebees to triple their overwintering survival rates.",
    questionFr: "Quel rôle déterminant ces bandes florales remplissent-elles pour les pollinisateurs ?",
    questionEn: "What crucial role do these floral buffer strips serve for insect pollinators?",
    optionsFr: [
      "Empêcher les insectes de traverser les routes départementales pour éviter les collisions",
      "Fournir des fibres végétales pour fabriquer des vêtements de protection apicole",
      "Offrir une ressource alimentaire florale continue garantissant la survie des abeilles en hiver",
      "Remplacer entièrement les récoltes de blé et d'orge par des champs de fleurs d'ornement"
    ],
    optionsEn: [
      "Preventing insects from crossing regional highways to avert motor vehicle strikes",
      "Supplying specialized plant fibers to manufacture protective beekeeper suits",
      "Providing an uninterrupted nectar food supply ensuring honeybee and pollinator winter survival",
      "Completely substituting wheat and barley food crops with decorative floral bouquets"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q28",
    paperNumber: 4,
    questionNumber: 28,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Stockage d'énergie — Le volant d'inertie mécanique",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ingénieur en génie électrique"],
    speakerPersonas: [{ role: "Ingénieur électrique", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Pour stabiliser les réseaux électriques alimentés par des énergies éoliennes et solaires intermittentes, les batteries chimiques présentent des limites de vieillissement et de recyclage. Une alternative purement mécanique gagne du terrain : le volant d'inertie cinétique sous vide. Il s'agit d'un rotor cylindrique en fibre de carbone monté sur des paliers magnétiques sans friction, tournant à plus de soixante mille tours par minute. L'électricité excédentaire est convertie en énergie cinétique de rotation, puis restituée en quelques millisecondes sur le réseau en cas de baisse soudaine de tension, sans aucune perte de capacité après un million de cycles.",
    audioEn: "To balance power grids energized by intermittent solar and wind installations, chemical battery banks face cycle degradation and recycling limitations. A purely mechanical solution is gaining momentum: the vacuum kinetic flywheel. Engineered with a carbon-fiber cylinder spinning at 60,000 RPM suspended on frictionless magnetic levitation bearings, it stores surplus grid power as rotational kinetic energy. It injects power back onto the grid within milliseconds during frequency dips, maintaining pristine capacity even after a million charge-discharge cycles.",
    questionFr: "Quel atout distinctif le volant d'inertie mécanique possède-t-il par rapport aux batteries chimiques ?",
    questionEn: "What distinctive advantage does the kinetic flywheel possess over chemical battery banks?",
    optionsFr: [
      "La capacité de fonctionner sans aucune pièce mécanique ni moteur en mouvement",
      "Une longévité opérationnelle quasi illimitée et un temps de réaction instantané sans dégradation",
      "L'obligation d'utiliser des minerais radioactifs pour maintenir la vitesse de rotation",
      "La production continue de vapeur d'eau chaude pour chauffer les villes voisines"
    ],
    optionsEn: [
      "The capacity to operate without any mechanical moving components or motors",
      "Near-unlimited operational durability and instantaneous response without capacity fade",
      "The requirement to utilize radioactive uranium ores to sustain rotating flywheel speed",
      "The steady generation of pressurized steam heat to warm neighboring residential suburbs"
    ],
    correctIndex: 1, // Key B
  },

  // ── SECTION D : LE GRAND ENTRETIEN (Q29 - Q34) ──
  // Thème : « L'aménagement du territoire face au recul du trait de côte et à l'élévation marine » (Pr. Élisabeth Vasseur)
  {
    id: "tef-p4-co-q29",
    paperNumber: 4,
    questionNumber: 29,
    typology: "GRAND_ENTRETIEN",
    level: "B2",
    title: "Grand Entretien : Recul du trait de côte — Constat scientifique et érosion",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Professeure Élisabeth Vasseur, vous êtes géographe du littoral et directrice de l'Observatoire des dynamiques côtières. Dans votre dernier rapport interministériel, vous soulignez que l'érosion marine n'est plus un risque lointain, mais une réalité quotidienne. Quelle est l'ampleur du phénomène sur nos côtes françaises ?\nPr. Vasseur : Bonjour Marc. La situation est désormais critique : près de vingt pour cent du littoral métropolitain est en recul actif. Sur certaines falaises de Normandie ou sur les cordons dunaires de Nouvelle-Aquitaine, la mer avance de un à trois mètres par an. Avec la montée inexorable du niveau des océans et la multiplication des tempêtes hivernales, ce ne sont plus seulement des plages de sable qui disparaissent, mais des routes, des digues et des immeubles résidentiels entiers construits trop près des flots.",
    audioEn: "Marc: Professor Élisabeth Vasseur, you are a coastal geographer and director of the Coastal Dynamics Observatory. In your latest interministerial report, you state that marine erosion is no longer a distant risk, but a daily reality. What is the scale of the phenomenon on French coastlines?\nProf. Vasseur: Hello Marc. The situation is now critical: nearly twenty percent of the mainland coastline is in active retreat. Along certain Normandy chalk cliffs or Nouvelle-Aquitaine coastal dunes, the sea encroaches by one to three meters annually. With inexorable sea level rise and compounding winter storm surges, it is no longer just sandy beaches vanishing, but roads, sea walls, and entire residential apartment buildings built too close to the tide.",
    questionFr: "Quelle réalité alarmante le Pr. Vasseur décrit-elle au sujet du littoral ?",
    questionEn: "What alarming reality does Professor Vasseur describe regarding the coastline?",
    optionsFr: [
      "La baisse historique du niveau des mers provoquant l'assèchement des ports de commerce",
      "Une avancée rapide et continue de la mer qui menace directement les infrastructures humaines",
      "L'interdiction absolue de toute activité de baignade sur l'ensemble des plages européennes",
      "La prolifération d'algues tropicales toxiques bloquant le départ des navires marchands"
    ],
    optionsEn: [
      "A historic drop in ocean sea levels causing commercial shipping ports to dry up",
      "A rapid, continuous encroachment of the sea directly threatening human infrastructure",
      "A total permanent ban on public swimming across all European recreational beaches",
      "The proliferation of toxic tropical seaweeds halting the departure of cargo freighters"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q30",
    paperNumber: 4,
    questionNumber: 30,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : Recul du trait de côte — L'impasse des digues en béton",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Pourquoi ne peut-on pas simplement continuer à bétonner et à ériger des digues toujours plus hautes pour protéger les stations balnéaires ?\nPr. Vasseur : Parce que c'est une illusion d'ingénierie ruineuse et contre-productive ! Les digues rigides modifient les courants marins et accentuent l'érosion juste à côté, privant les plages de réapprovisionnement naturel en sédiments. De plus, face à une surcote marine de deux mètres, aucune digue ne résiste éternellement ; lorsqu'elle cède, la submersion est brutale et dévastatrice. Dépenser des millions d'euros d'argent public pour repousser l'inévitable de cinq ou dix ans relève d'un déni scientifique absolu.",
    audioEn: "Marc: Why can't we simply continue pouring concrete and erecting ever-taller sea walls to defend coastal resort towns?\nProf. Vasseur: Because that is a ruinous and counterproductive engineering illusion! Rigid concrete barriers distort littoral currents and accelerate scouring immediately adjacent, starving beaches of natural sediment replenishment. Furthermore, confronting a two-meter storm surge, no wall holds forever; when it breaches, catastrophic flash flooding ensues. Squandering millions of euros of public funds to delay the inevitable by five or ten years represents pure scientific denialism.",
    questionFr: "Pourquoi le Pr. Vasseur condamne-t-elle l'édification systématique de digues de protection ?",
    questionEn: "Why does Professor Vasseur condemn the routine construction of concrete sea walls?",
    optionsFr: [
      "Parce que le béton armé contamine l'eau potable des nappes phréatiques côtières",
      "Parce que les promoteurs immobiliers refusent de payer des impôts sur les fronts de mer",
      "Parce que les digues attirent des bancs de requins dangereux à proximité des plages",
      "Parce qu'elles aggravent l'érosion environnante et procurent un faux sentiment de sécurité éphémère"
    ],
    optionsEn: [
      "Because reinforced concrete leaches contaminants into coastal groundwater drinking aquifers",
      "Because beachfront property developers categorically refuse to pay taxes on waterfront sites",
      "Because sea walls attract predatory shark schools into close proximity to bathing beaches",
      "Because they worsen adjacent erosion and foster a false, short-lived sense of security"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p4-co-q31",
    paperNumber: 4,
    questionNumber: 31,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : Recul du trait de côte — Le repli stratégique concerté",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Alors quelle est la véritable alternative réaliste si la résistance frontale est vouée à l'échec ?\nPr. Vasseur : C'est ce que nous appelons la recomposition spatiale ou le repli stratégique concerté. Il faut organiser dès aujourd'hui la relocalisation progressive des habitations, des campings et des commerces menacés vers l'intérieur des terres, sur des plateaux sécurisés. Cela exige d'anticiper sur trente ans, d'indemniser équitablement les propriétaires et de restituer le bord de mer à son rôle naturel d'amortisseur écologique : des dunes végétalisées et des marais maritimes capables d'absorber la houle sans dégâts humains.",
    audioEn: "Marc: So what is the genuine realistic alternative if frontal physical resistance is doomed to fail?\nProf. Vasseur: It is what we term spatial recomposition or managed strategic retreat. We must organize the gradual relocation of threatened homes, campgrounds, and businesses further inland onto safe plateaus starting today. This requires planning across thirty-year horizons, compensating owners fairly, and restoring the coastline to its natural function as a living buffer: vegetated dunes and salt marshes capable of absorbing wave energy without human loss.",
    questionFr: "Quelle stratégie d'aménagement territorial le Pr. Vasseur préconise-t-elle pour l'avenir ?",
    questionEn: "What spatial planning strategy does Professor Vasseur advocate for the future?",
    optionsFr: [
      "Déplacer méthodiquement les biens et activités vers l'intérieur tout en restaurant les espaces naturels tampons",
      "Construire des îles artificielles au large pour y transférer l'ensemble de la population littorale",
      "Interdire définitivement l'accès des plages à tous les citoyens pour les réserver aux oiseaux marins",
      "Transformer les stations balnéaires en complexes hôteliers flottants sur des plates-formes pétrolières"
    ],
    optionsEn: [
      "Methodically relocating assets and human activities inland while restoring natural ecological buffer zones",
      "Constructing offshore artificial islands to transfer the entire coastal population into the open sea",
      "Permanently closing all coastal beaches to humans to reserve shoreline habitat exclusively for seabirds",
      "Converting beach resort towns into floating hotel casinos constructed atop decommissioned oil rigs"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q32",
    paperNumber: 4,
    questionNumber: 32,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : Recul du trait de côte — La résistance psychologique et financière",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Pourquoi cette politique de relocalisation suscite-t-elle de si violentes contestations locales ?\nPr. Vasseur : Parce qu'elle touche à deux piliers intouchables : le droit de propriété et l'attachement affectif au paysage. Pour un particulier qui a investi les économies de toute une vie dans une maison vue sur mer, s'entendre dire que son bien ne vaut plus rien et qu'il doit déménager est un choc psychologique brutal. De leur côté, de nombreux maires refusent d'admettre la réalité car ils redoutent la perte de leurs recettes fiscales foncières et la désertification de leur commune. Nous devons inventer un nouveau pacte de solidarité nationale pour financer ces déménagements avant que la catastrophe ne frappe.",
    audioEn: "Marc: Why does this managed retreat policy trigger such fierce local resistance?\nProf. Vasseur: Because it collides with two untouchable pillars: private property rights and deep emotional attachment to place. For a family who poured their life savings into an oceanfront home, being told their property has zero market value and that they must vacate is a brutal psychological trauma. For their part, many municipal mayors refuse to face reality because they dread the loss of local property tax revenues and community decline. We must establish a new national solidarity fund to finance these moves before tragedy strikes.",
    questionFr: "Quels sont les deux freins majeurs qui bloquent l'acceptation de la relocalisation côtière ?",
    questionEn: "What are the two major obstacles hindering the acceptance of coastal relocation?",
    optionsFr: [
      "La pénurie de camions de déménagement et le manque d'essence sur le littoral",
      "L'opposition des compagnies d'électricité à raccorder les nouvelles habitations dans les terres",
      "Le traumatisme de la dépréciation immobilière pour les familles et la peur de la perte fiscale pour les maires",
      "L'interdiction légale pour les citoyens français de changer de commune de résidence"
    ],
    optionsEn: [
      "A national shortage of household moving vans and gasoline supplies across coastal areas",
      "The refusal of electric utility providers to connect new inland housing subdivisions",
      "The trauma of home equity wipeout for families and mayors' fear of lost municipal tax receipts",
      "A statutory prohibition barring French citizens from moving their domicile between municipalities"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q33",
    paperNumber: 4,
    questionNumber: 33,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : Recul du trait de côte — La solidarité territoriale",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Qui doit payer la facture colossale de ces relocalisations : les seuls habitants du bord de mer ou l'ensemble des contribuables ?\nPr. Vasseur : C'est le cœur du débat civique. On ne peut pas laisser les seules petites communes littorales assumer des milliards d'euros de réaménagement. Le littoral est un bien commun, un patrimoine national que tous les Français fréquentent pour leurs vacances. Il est donc juste qu'une caisse de solidarité alimentée par l'ensemble de la collectivité finance l'acquisition progressive des biens menacés. En contrepartie, il faut interdire sans la moindre exception toute nouvelle construction dans les zones à risque d'ici 2100.",
    audioEn: "Marc: Who should foot the colossal bill for these relocations: seaside residents alone or all national taxpayers?\nProf. Vasseur: That is the crux of the civic debate. We cannot leave tiny coastal villages to absorb billions of euros in redevelopment costs on their own. The coastline is a public commons, a national heritage that all citizens enjoy during holidays. It is therefore equitable for a national solidarity endowment funded by all taxpayers to underwrite the phased acquisition of threatened properties. In exchange, all future building construction in hazard zones must be strictly prohibited through 2100.",
    questionFr: "Quel équilibre de responsabilité le Pr. Vasseur propose-t-elle pour financer ces transitions ?",
    questionEn: "What balance of civic responsibility does Professor Vasseur propose to fund these transitions?",
    optionsFr: [
      "Faire payer l'intégralité des coûts par les seuls pêcheurs artisans traditionnels",
      "Une solidarité financière nationale pour racheter les biens couplée à un gel strict de nouvelles constructions",
      "Vendre l'ensemble des plages françaises à des investisseurs immobiliers étrangers",
      "Exiger des banques qu'elles effacent toutes les dettes souveraines de l'État"
    ],
    optionsEn: [
      "Requiring traditional artisanal fishermen to shoulder the entire financial burden alone",
      "National taxpayer solidarity to repurchase homes coupled with a strict freeze on new building permits",
      "Selling off all French public coastal beaches to international private real estate investors",
      "Demanding commercial banks erase all sovereign national government debt balances"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q34",
    paperNumber: 4,
    questionNumber: 34,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : Recul du trait de côte — Message d'action et courage politique",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Élisabeth Vasseur"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Élisabeth Vasseur", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : En conclusion, professeure Vasseur, que diriez-vous aux élus et aux citoyens qui hésitent encore à agir ?\nPr. Vasseur : Le temps des atermoiements est révolu. Reculer n'est pas une défaite ni un abandon, c'est au contraire la décision la plus courageuse et la plus intelligente pour sauver des vies et réinventer notre rapport à la nature. Chaque année perdue à construire des digues éphémères alourdit la facture finale et nous rapproche d'une catastrophe humaine prévisible. L'adaptation n'attend pas la prochaine tempête centennale : elle se décide maintenant.",
    audioEn: "Marc: In conclusion, Professor Vasseur, what would you say to officials and citizens who still hesitate to act?\nProf. Vasseur: The time for procrastination has passed. Managed retreat is neither a defeat nor an act of cowardice; it is, on the contrary, the bravest and most rational decision to save human lives and reinvent our relationship with the natural world. Every year wasted erecting ephemeral sea walls inflates the ultimate bill and inches us closer to a predictable human catastrophe. Climate adaptation cannot wait for the next hundred-year storm: it must be enacted now.",
    questionFr: "Quelle vision le Pr. Vasseur défend-elle en conclusion de cet entretien ?",
    questionEn: "What final perspective does Professor Vasseur advocate at the close of the interview?",
    optionsFr: [
      "Attendre la survenue d'une tempête destructrice majeure avant de voter la moindre loi",
      "Abandonner définitivement toutes les régions côtières sans indemnisation pour les citoyens",
      "Construire des remparts métalliques sur l'ensemble des trois mille kilomètres de côtes",
      "Considérer le repli stratégique non comme un échec mais comme un choix d'adaptation courageux et urgent"
    ],
    optionsEn: [
      "Waiting for a catastrophic hundred-year storm surge to strike before enacting legislation",
      "Abandoning all coastal regions permanently without offering any citizen compensation",
      "Building fortified metallic barrier ramparts across all three thousand kilometers of shoreline",
      "Viewing managed retreat not as a defeat but as a courageous, urgent adaptation choice"
    ],
    correctIndex: 3, // Key D
  },

  // ── SECTION E : ACTES DE PAROLE & PRAGMATIQUE (Q35 - Q40) ──
  {
    id: "tef-p4-co-q35",
    paperNumber: 4,
    questionNumber: 35,
    typology: "ACTES_DE_PAROLE",
    level: "C1",
    title: "Acte de parole — Critique littéraire / Ironie mordante",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Un critique littéraire"],
    speakerPersonas: [{ role: "Critique littéraire", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "« On ne peut que saluer le courage héroïque de l'auteur, qui est parvenu à étirer sur huit cents pages une intrigue tenant initialement sur un ticket de métro. Les dialogues brillent d'une telle profondeur philosophique que même les personnages semblent s'oublier eux-mêmes au milieu de leurs propres phrases. Un chef-d'œuvre incontestable pour les insomniaques en quête de repos réparateur. »",
    audioEn: "\"One can only salute the heroic courage of the author, who succeeded in stretching across eight hundred pages a plot that could easily fit onto a subway ticket. The dialogues sparkle with such philosophical depth that even the characters seem to forget themselves halfway through their own sentences. An indisputable masterpiece for insomniacs seeking restorative sleep.\"",
    questionFr: "Quel jugement le critique porte-t-il sur l'ouvrage présenté ?",
    questionEn: "What judgment does the critic deliver regarding the book reviewed?",
    optionsFr: [
      "Une dérision caustique dénonçant un roman interminable, creux et assommant",
      "Un hommage sincère saluant le souffle narratif et le suspense haletant de l'intrigue",
      "Une réclamation juridique pour plagiat d'un roman classique du dix-neuvième siècle",
      "Une invitation enthousiaste à décerner immédiatement le prix Goncourt à l'écrivain"
    ],
    optionsEn: [
      "A scathing mockery denouncing a bloated, vacuous, and sleep-inducing novel",
      "A sincere tribute praising the sweeping narrative power and thrilling suspense",
      "A legal plagiarism lawsuit claiming infringement of a 19th-century classic work",
      "An enthusiastic recommendation to immediately award the author the Goncourt prize"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q36",
    paperNumber: 4,
    questionNumber: 36,
    typology: "ACTES_DE_PAROLE",
    level: "C1",
    title: "Acte de parole — Débat parlementaire / Feinte concession",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Un député d'opposition"],
    speakerPersonas: [{ role: "Député", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "« Je concède bien volontiers à monsieur le rapporteur que son amendement budgétaire brille par une pureté arithmétique tout à fait remarquable. Reste que supprimer les subventions de transport pour les étudiants des zones rurales au nom de l'orthodoxie comptable revient à organiser méthodiquement l'abandon scolaire d'une génération entière. »",
    audioEn: "\"I readily grant the committee rapporteur that his budget amendment sparkles with truly remarkable arithmetic purity. The fact remains that eliminating transit subsidies for rural students in the name of fiscal orthodoxy amounts to methodically engineering the educational abandonment of an entire generation.\"",
    questionFr: "Quel est l'acte de parole accompli par le député ?",
    questionEn: "What speech act is performed by the member of parliament?",
    optionsFr: [
      "Une acceptation totale et inconditionnelle des propositions de la majorité parlementaire",
      "Une demande expresse de dissolution immédiate de l'Assemblée nationale par le président",
      "Une feinte concession courtoise servant de tremplin pour dénoncer une mesure injuste et désastreuse",
      "Une félicitation chaleureuse adressée aux syndicats d'étudiants pour leur sens des responsabilités"
    ],
    optionsEn: [
      "A total and unconditional acceptance of the parliamentary majority's proposals",
      "An explicit petition demanding the President immediately dissolve the National Assembly",
      "A polite feigned concession serving as a springboard to attack an unjust and disastrous policy",
      "A warm commendation addressed to student unions celebrating their fiscal responsibility"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q37",
    paperNumber: 4,
    questionNumber: 37,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Négociation diplomatique / Refus protocolaire",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ambassadeur plénipotentiaire"],
    speakerPersonas: [{ role: "Ambassadeur", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "« Le mémorandum transmis par votre gouvernement témoigne d'une grande hauteur de vue que nos autorités ont examinée avec l'attention la plus scrupuleuse. Néanmoins, eu égard aux équilibres géopolitiques régionaux et aux engagements multilatéraux préexistants de notre pays, nous nous trouvons dans l'impossibilité d'accéder, en l'état, aux requêtes formulées dans ce texte. »",
    audioEn: "\"The memorandum conveyed by your government demonstrates elevated vision which our authorities examined with the most scrupulous attention. Nevertheless, having regard to regional geopolitical balances and our country's preexisting multilateral commitments, we find ourselves unable, in the current state of affairs, to accede to the requests formulated in this text.\"",
    questionFr: "Quelle décision diplomatique est exprimée derrière cette formule officielle ?",
    questionEn: "What diplomatic decision is conveyed beneath this official protocol language?",
    optionsFr: [
      "Une fin de non-recevoir formelle rejetant les demandes de l'État partenaire",
      "Une ratification solennelle marquant l'entrée en vigueur immédiate du traité d'alliance",
      "Une déclaration de guerre imminente accompagnée du rappel de tous les diplomates",
      "Une offre de prêt financier sans intérêt accordée sans aucune condition préalable"
    ],
    optionsEn: [
      "A formal diplomatic rejection turning down the partner state's requests",
      "A solemn ratification enacting the immediate entry into force of the alliance treaty",
      "An imminent declaration of war accompanied by the recall of all diplomatic corps",
      "An interest-free financial loan offer granted without any preliminary conditions"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p4-co-q38",
    paperNumber: 4,
    questionNumber: 38,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Réunion de chantier / Mise en garde technique",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ingénieure en chef des structures"],
    speakerPersonas: [{ role: "Ingénieure structure", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "« La direction de projet est évidemment libre d'exiger le coulage du tablier du pont dès ce vendredi pour tenir les délais électoraux de l'inauguration. Je me permettrais toutefois de rappeler, à toutes fins utiles, que le béton à prise rapide soumis à des températures négatives développe des microfissures internes que notre assurance décennale refusera catégoriquement de couvrir en cas d'effondrement partiel. »",
    audioEn: "\"Project management is naturally entitled to demand pouring the bridge deck this Friday to meet inaugural political timelines. I would, however, venture to recall, for all pertinent purposes, that rapid-setting concrete poured during subzero temperatures develops internal microfractures that our decennial warranty insurance will categorically refuse to cover in the event of partial collapse.\"",
    questionFr: "Quelle intention communicative sous-tend l'avertissement de l'ingénieure ?",
    questionEn: "What communicative intention underlies the engineer's warning?",
    optionsFr: [
      "Approuver chaleureusement l'accélération des travaux pour satisfaire les élus locaux",
      "Exiger la démission immédiate de l'ensemble des ouvriers présents sur le chantier",
      "Formuler une mise en garde solennelle sur les risques d'effondrement et l'absence de garantie financière",
      "Annoncer l'annulation définitive de la construction du pont pour des raisons budgétaires"
    ],
    optionsEn: [
      "Warmly endorse rushing the construction schedule to please local political leaders",
      "Demand the immediate resignation of all construction laborers present on the job site",
      "Issue a solemn warning regarding structural collapse risks and the total loss of insurance coverage",
      "Announce the permanent cancellation of the bridge project due to budgetary constraints"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p4-co-q39",
    paperNumber: 4,
    questionNumber: 39,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Conseil de surveillance / Dérision acerbe",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'administratrice principale"],
    speakerPersonas: [{ role: "Administratrice", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "« Dépenser un million d'euros dans une campagne d'affichage célébrant nos valeurs éco-responsables pendant que nos usines continuent de rejeter des solvants toxiques non filtrés dans la rivière voisine était, à n'en pas douter, un éclair de génie managérial. L'enquête judiciaire ouverte par le parquet et le boycott massif de nos produits par les consommateurs viennent d'ailleurs d'en démontrer toute la rentabilité. »",
    audioEn: "\"Spending one million euros on a billboard campaign trumpeting our eco-responsible values while our chemical plants continue venting unfiltered toxic solvents into the local river was, beyond doubt, a stroke of managerial genius. The criminal prosecutor's investigation and the consumer boycott of our products have just demonstrated its dazzling profitability.\"",
    questionFr: "Quelle tonalité et quel jugement l'administratrice exprime-t-elle ?",
    questionEn: "What tone and judgment does the board member express?",
    optionsFr: [
      "Une fierté sincère face aux retombées commerciales exceptionnelles de la publicité",
      "Une ironie féroce condamnant une hypocrisie de communication ayant conduit au désastre",
      "Une proposition technique d'embaucher de nouvelles agences de communication à New York",
      "Une félicitation solennelle adressée aux magistrats du parquet pour leur rapidité d'action"
    ],
    optionsEn: [
      "Sincere pride celebrating the exceptional commercial sales impact of the ad campaign",
      "Fierce sarcasm condemning public relations hypocrisy that triggered complete corporate disaster",
      "A technical motion proposing to retain additional advertising PR agencies in New York",
      "A solemn tribute congratulating public criminal prosecutors for their prompt court intervention"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p4-co-q40",
    paperNumber: 4,
    questionNumber: 40,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Comité de crise / Sarcasme mordant",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le directeur de la sécurité des systèmes d'information"],
    speakerPersonas: [{ role: "Directeur sécurité", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "« Refuser d'investir cinquante mille euros dans la mise à jour de nos pare-feu informatiques sous prétexte de réaliser des économies budgétaires était une intuition financière véritablement visionnaire. La rançon de dix millions d'euros exigée ce matin par les pirates pour débloquer l'ensemble de nos serveurs hospitaliers prouve avec éclat à quel point notre comité d'audit avait vu juste. »",
    audioEn: "\"Refusing to invest fifty thousand euros in updating our cybersecurity firewalls under the pretext of budget savings was a truly visionary financial insight. The ten-million-euro ransom demanded this morning by hackers to unlock all our hospital servers provides dazzling proof of how right our audit committee was.\"",
    questionFr: "Quel message le responsable de sécurité transmet-il à sa direction ?",
    questionEn: "What message does the cybersecurity director convey to executive leadership?",
    optionsFr: [
      "Une demande d'augmentation de salaire pour récompenser la gestion financière du comité",
      "Une proposition de payer immédiatement la rançon demandée avec les fonds publics de l'hôpital",
      "Un appel au calme assurant que l'incident informatique sera résolu en quelques minutes sans frais",
      "Un sarcasme cinglant soulignant la débâcle catastrophique provoquée par une économie dérisoire"
    ],
    optionsEn: [
      "A pay raise request rewarding the audit committee's prudent financial management",
      "A motion proposing to immediately pay the demanded ransom using public hospital funds",
      "A reassuring call for calm asserting that the computer glitch will be fixed in minutes free of charge",
      "Scathing sarcasm spotlighting the catastrophic disaster triggered by petty, shortsighted penny-pinching"
    ],
    correctIndex: 3, // Key D
  }
];

// Audit key distribution
const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
items.forEach(q => counts[q.correctIndex]++);
console.log("Paper 4 Master Items Key Counts:", counts);

if (counts[0] !== 10 || counts[1] !== 10 || counts[2] !== 10 || counts[3] !== 10) {
  console.error("ERROR: Key counts are not 10 each!", counts);
  process.exit(1);
}

if (items.length !== 40) {
  console.error("ERROR: Items count is not 40!", items.length);
  process.exit(1);
}

const header = `/**
 * 🇨🇦 Official TEF Canada Listening Master Bank (Paper 4 - 40 Questions)
 * Official CCI Paris Structure:
 *   - Groupe 1 (Q1-Q4): Identification de dessins (A1-A2) [Balanced keys: 1A, 1B, 1C, 1D]
 *   - Groupe 2 (Q5-Q12): Messages téléphoniques & annonces publiques (A2-B1)
 *   - Groupe 3 (Q13-Q18): Micro-trottoirs (opinions de 6 intervenants) (B1-B2)
 *   - Groupe 4 (Q19-Q28): Reportages d'actualité & débats sociétaux (B2)
 *   - Groupe 5 (Q29-Q34): Le Grand Entretien (B2-C1)
 *   - Groupe 6 (Q35-Q40): Actes de parole & intentions implicites (C1-C2)
 *
 * 100% Balanced Key Distribution: 10 A (25%), 10 B (25%), 10 C (25%), 10 D (25%).
 */

import type { TefListeningItem } from "./tefListeningMasterBank";

export const TEF_PAPER_4_LISTENING_ITEMS: TefListeningItem[] = `;

const outputPath = path.join(__dirname, "../src/lib/tefListeningPaper4Master.ts");
fs.writeFileSync(outputPath, header + JSON.stringify(items, null, 2) + ";\n", "utf-8");
console.log(`Successfully generated Paper 4 Master Bank at: ${outputPath}`);
