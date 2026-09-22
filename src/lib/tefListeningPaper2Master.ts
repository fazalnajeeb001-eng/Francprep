/**
 * 🇨🇦 Official TEF Canada Listening Master Bank (Paper 2 - 40 Questions)
 * Official CCI Paris Structure:
 *   - Section A (Q1-Q4): Identification de dessins (A1-A2) [Balanced keys: 1A, 1B, 1C, 1D]
 *   - Section B (Q5-Q12): Messages téléphoniques & annonces publiques (A2-B1)
 *   - Section C (Q13-Q18): Micro-trottoirs (opinions de 6 intervenants sur les emballages plastiques) (B1-B2)
 *   - Section D (Q19-Q28): Reportages d'actualité & chroniques sociétales (B2)
 *   - Section D (Q29-Q34): Le Grand Entretien — Pr. Hélène Rousseau / IA et Humanités (B2-C1)
 *   - Section E (Q35-Q40): Actes de parole & intentions implicites (C1-C2)
 *
 * 100% Balanced Key Distribution: 10 A (25%), 10 B (25%), 10 C (25%), 10 D (25%).
 */

import type { TefListeningItem } from "./tefListeningMasterBank";

export const TEF_PAPER_2_LISTENING_ITEMS: TefListeningItem[] = [
  // ── SECTION A : IDENTIFICATION DE DESSINS (Q1 - Q4) ──
  {
    id: "tef-p2-co-q01",
    paperNumber: 2,
    questionNumber: 1,
    typology: "DESSINS",
    level: "A1",
    title: "Boulangerie artisanale — Commande de viennoiseries et pain",
    speakingRate: 0.92,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Client", "Boulangère"],
    speakerPersonas: [
      { role: "Client", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Boulangère", gender: "female", voiceId: "fr-FR-DeniseNeural" }
    ],
    audioFr: "Client : Bonjour madame. Je voudrais deux croissants au beurre et une baguette tradition bien dorée, s'il vous plaît.\nBoulangère : Très bien monsieur. Et avec ceci ? Ce sera tout ? Ça vous fera trois euros cinquante.",
    audioEn: "Customer: Hello ma'am. I would like two butter croissants and a well-baked traditional baguette, please.\nBaker: Very well, sir. And with that? Will that be all? That will be three euros fifty.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Un client achète un journal dans un kiosque de presse",
      "Dessin B : Un client choisit des fruits et légumes sur un étal de marché",
      "Dessin C : Un client achète du pain et des viennoiseries au comptoir d'une boulangerie",
      "Dessin D : Un client commande une tasse de café au comptoir d'un bistrot"
    ],
    optionsEn: [
      "Drawing A: A customer buys a newspaper at a street newsstand",
      "Drawing B: A customer selects fruits and vegetables at a market stall",
      "Drawing C: A customer buys bread and pastries at a bakery counter",
      "Drawing D: A customer orders a cup of coffee at a bistro counter"
    ],
    correctIndex: 2, // Key C
    mainImage: "/illustrations/tef/tef_p2_q1_a.png",
    optionImages: [
      "/illustrations/tef/tef_p2_q1_a.png",
      "/illustrations/tef/tef_p2_q1_b.png",
      "/illustrations/tef/tef_p2_q1_c.png",
      "/illustrations/tef/tef_p2_q1_d.png"
    ]
  },
  {
    id: "tef-p2-co-q02",
    paperNumber: 2,
    questionNumber: 2,
    typology: "DESSINS",
    level: "A2",
    title: "Pharmacie de quartier — Achat de médicaments sans ordonnance",
    speakingRate: 0.94,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Cliente", "Pharmacien"],
    speakerPersonas: [
      { role: "Cliente", gender: "female", voiceId: "fr-CA-SylvieNeural" },
      { role: "Pharmacien", gender: "male", voiceId: "fr-FR-AlainNeural" }
    ],
    audioFr: "Cliente : Bonjour monsieur, j'ai la gorge très irritée depuis hier soir. Auriez-vous des pastilles adoucissantes et du sérum physiologique ?\nPharmacien : Bonjour madame. Oui, bien sûr. Prenez ces pastilles au miel toutes les trois heures, et faites des lavages de nez matin et soir.",
    audioEn: "Customer: Hello sir, my throat has been very sore since yesterday evening. Would you have soothing lozenges and physiological saline?\nPharmacist: Hello ma'am. Yes, of course. Take these honey lozenges every three hours, and rinse your nose morning and night.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Une cliente demande conseil à un pharmacien devant des rayonnages de médicaments",
      "Dessin B : Une patiente consulte un médecin dans un cabinet d'auscultation stéthoscope en main",
      "Dessin C : Une cliente paie des cosmétiques au comptoir d'un salon de beauté",
      "Dessin D : Une chercheuse manipule des tubes à essai dans un laboratoire d'analyses"
    ],
    optionsEn: [
      "Drawing A: A customer asks advice from a pharmacist in front of medicine shelves",
      "Drawing B: A patient consults a doctor in an examination room with a stethoscope",
      "Drawing C: A customer pays for cosmetics at a beauty salon checkout",
      "Drawing D: A researcher handles test tubes in an analytical laboratory"
    ],
    correctIndex: 0, // Key A
    mainImage: "/illustrations/tef/tef_p2_q2_a.png",
    optionImages: [
      "/illustrations/tef/tef_p2_q2_a.png",
      "/illustrations/tef/tef_p2_q2_b.png",
      "/illustrations/tef/tef_p2_q2_c.png",
      "/illustrations/tef/tef_p2_q2_d.png"
    ]
  },
  {
    id: "tef-p2-co-q03",
    paperNumber: 2,
    questionNumber: 3,
    typology: "DESSINS",
    level: "A2",
    title: "Bibliothèque municipale — Recherche d'ouvrage documentaire",
    speakingRate: 0.95,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Étudiant", "Bibliothécaire"],
    speakerPersonas: [
      { role: "Étudiant", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Bibliothécaire", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Étudiant : Excusez-moi madame, je cherche le manuel d'histoire contemporaine du professeur Laurent. Est-il disponible en rayon ?\nBibliothécaire : Bonjour. Attendez, je vérifie sur l'ordinateur... Oui, il se trouve au deuxième étage, travée 4, section sciences humaines.",
    audioEn: "Student: Excuse me ma'am, I am looking for Professor Laurent's contemporary history textbook. Is it available on the shelf?\nLibrarian: Hello. Wait, let me check on the computer... Yes, it is located on the second floor, aisle 4, humanities section.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Un étudiant achète un roman dans les allées d'une librairie commerciale",
      "Dessin B : Une conférence universitaire dispensée par un professeur dans un grand amphithéâtre",
      "Dessin C : Deux étudiants révisent en silence assis à une table dans une cafétéria",
      "Dessin D : Un usager demande l'emplacement d'un livre à la banque d'accueil d'une bibliothèque"
    ],
    optionsEn: [
      "Drawing A: A student purchases a novel in the aisles of a commercial bookstore",
      "Drawing B: A university lecture delivered by a professor in a large amphitheater",
      "Drawing C: Two students review silently seated at a cafeteria table",
      "Drawing D: A patron inquires about a book's shelf location at a library help desk"
    ],
    correctIndex: 3, // Key D
    mainImage: "/illustrations/tef/tef_p2_q3_a.png",
    optionImages: [
      "/illustrations/tef/tef_p2_q3_a.png",
      "/illustrations/tef/tef_p2_q3_b.png",
      "/illustrations/tef/tef_p2_q3_c.png",
      "/illustrations/tef/tef_p2_q3_d.png"
    ]
  },
  {
    id: "tef-p2-co-q04",
    paperNumber: 2,
    questionNumber: 4,
    typology: "DESSINS",
    level: "A2",
    title: "Magasin de chaussures — Essayage de pointure",
    speakingRate: 0.94,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Cliente", "Vendeur"],
    speakerPersonas: [
      { role: "Cliente", gender: "female", voiceId: "fr-FR-DeniseNeural" },
      { role: "Vendeur", gender: "male", voiceId: "fr-FR-AlainNeural" }
    ],
    audioFr: "Cliente : Bonjour monsieur, ces bottines en cuir marron me plaisent beaucoup en vitrine. Les auriez-vous en pointure 39 ?\nVendeur : Bonjour madame. Je vais voir en réserve tout de suite. Asseyez-vous sur la banquette, je vous apporte la boîte dans un instant.",
    audioEn: "Customer: Hello sir, I really like these brown leather ankle boots in the window. Would you have them in shoe size 39?\nSalesperson: Hello ma'am. I will check in the back room right away. Please have a seat on the bench, I'll bring you the box in a moment.",
    questionFr: "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    questionEn: "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    optionsFr: [
      "Dessin A : Une cliente essaie un manteau d'hiver devant une cabine d'habillage",
      "Dessin B : Une cliente assise sur une banquette fait vérifier une pointure de chaussures par un vendeur",
      "Dessin C : Un artisan cordonnier répare une semelle avec une machine dans son atelier",
      "Dessin D : Une cliente règle des sacs à main à la caisse d'une maroquinerie de luxe"
    ],
    optionsEn: [
      "Drawing A: A customer tries on a winter coat in front of a clothing fitting room",
      "Drawing B: A customer seated on a bench has shoe sizing checked by a store clerk",
      "Drawing C: A cobbler repairs a shoe sole with machinery in his workshop",
      "Drawing D: A customer pays for handbags at the counter of a luxury leather boutique"
    ],
    correctIndex: 1, // Key B
    mainImage: "/illustrations/tef/tef_p2_q4_a.png",
    optionImages: [
      "/illustrations/tef/tef_p2_q4_a.png",
      "/illustrations/tef/tef_p2_q4_b.png",
      "/illustrations/tef/tef_p2_q4_c.png",
      "/illustrations/tef/tef_p2_q4_d.png"
    ]
  },

  // ── SECTION B : MESSAGES TÉLÉPHONIQUES & ANNONCES PUBLIQUES (Q5 - Q12) ──
  {
    id: "tef-p2-co-q05",
    paperNumber: 2,
    questionNumber: 5,
    typology: "MESSAGES",
    level: "A2",
    title: "Annonce centre commercial — Maintenance caisses rapides",
    speakingRate: 0.98,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Hôtesse du magasin"],
    speakerPersonas: [{ role: "Hôtesse du magasin", gender: "female", voiceId: "fr-FR-DeniseNeural" }],
    audioFr: "Chers clients, en raison d'une mise à jour de notre système informatique, l'îlot des caisses automatiques est momentanément suspendu. Nous vous invitons à rejoindre les caisses traditionnelles numéro 3 à 8 où nos hôtesses vous accueillent sans attente. Nous vous remercions de votre compréhension.",
    audioEn: "Dear customers, due to an IT system update, the self-checkout island is temporarily suspended. We invite you to proceed to traditional registers 3 to 8 where our cashiers welcome you without delay. Thank you for your understanding.",
    questionFr: "Quel est l'objet principal de cette annonce ?",
    questionEn: "What is the main purpose of this announcement?",
    optionsFr: [
      "Orienter la clientèle vers les caisses manuelles suite à un incident technique",
      "Informer d'une fermeture anticipée de l'ensemble du supermarché pour inventaire",
      "Annoncer une promotion exceptionnelle sur les articles de l'îlot central",
      "Recruter des caissiers supplémentaires pour faire face à l'affluence du samedi"
    ],
    optionsEn: [
      "Direct customers to staffed registers following a technical disruption",
      "Notify of an early supermarket closure for full inventory audit",
      "Announce an exceptional discount on items in the central aisle",
      "Recruit additional cashiers to handle heavy Saturday customer traffic"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q06",
    paperNumber: 2,
    questionNumber: 6,
    typology: "MESSAGES",
    level: "A2",
    title: "Cabinet dentaire — Modification d'horaire pour urgence médicale",
    speakingRate: 0.98,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Secrétaire médicale"],
    speakerPersonas: [{ role: "Secrétaire médicale", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Bonjour madame Vasseur, ici le cabinet du docteur Mercier. Le docteur doit pratiquer une intervention chirurgicale imprévue en début d'après-midi. Votre séance de détartrage prévue aujourd'hui à 14 heures est donc décalée à 17 heures 30. Merci de nous rappeler si cet horaire ne vous convient pas.",
    audioEn: "Hello Mrs. Vasseur, this is Dr. Mercier's office. The doctor has an unexpected surgical procedure early this afternoon. Your scaling appointment scheduled for today at 2:00 PM is therefore pushed back to 5:30 PM. Please call us back if this time does not suit you.",
    questionFr: "Pourquoi la secrétaire contacte-t-elle la patiente ?",
    questionEn: "Why is the secretary contacting the patient?",
    optionsFr: [
      "Pour annuler définitivement son traitement en raison d'un départ à la retraite",
      "Pour lui transmettre les résultats d'une radiographie dentaire urgente",
      "Pour reporter son rendez-vous de début d'après-midi en fin de journée",
      "Pour lui réclamer le règlement d'une facture de soins impayée"
    ],
    optionsEn: [
      "To permanently cancel her dental treatment due to a doctor's retirement",
      "To share the laboratory findings of an urgent dental X-ray",
      "To postpone her early afternoon appointment to late afternoon",
      "To demand payment for an overdue healthcare treatment invoice"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q07",
    paperNumber: 2,
    questionNumber: 7,
    typology: "MESSAGES",
    level: "B1",
    title: "Aéroport international — Changement de porte d'embarquement",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Agent d'escale"],
    speakerPersonas: [{ role: "Agent d'escale", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Dernier appel pour les passagers du vol Air France 742 à destination de Montréal. Veuillez noter que la porte d'embarquement a été modifiée : veuillez vous diriger immédiatement vers la porte B14 au niveau 2, et non plus en porte C22. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
    audioEn: "Final call for passengers on Air France flight 742 bound for Montreal. Please note that the departure gate has been changed: please proceed immediately to gate B14 on level 2, rather than gate C22. Passengers traveling with young children are invited to board first.",
    questionFr: "Quelle instruction est donnée aux passagers du vol 742 ?",
    questionEn: "What instruction is given to passengers of flight 742?",
    optionsFr: [
      "Récupérer leurs bagages au tapis roulant C22 pour vérification douanière",
      "Se rendre sans délai à une porte d'embarquement différente de celle affichée",
      "Se présenter au comptoir de réenregistrement suite à une surréservation",
      "Attendre dans la salle d'embarquement initiale l'arrivée de l'équipage"
    ],
    optionsEn: [
      "Retrieve luggage at carousel C22 for custom security inspections",
      "Proceed without delay to a boarding gate different from the initial display",
      "Report to the re-ticketing desk following a flight overbooking situation",
      "Wait inside the initial departure lounge for the arrival of flight crew"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q08",
    paperNumber: 2,
    questionNumber: 8,
    typology: "MESSAGES",
    level: "B1",
    title: "Centre socioculturel — Clôture des inscriptions aux ateliers jeunesse",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Coordinatrice municipale"],
    speakerPersonas: [{ role: "Coordinatrice municipale", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Bonjour, vous êtes bien sur la messagerie du service jeunesse de la mairie. Nous vous informons que les inscriptions pour les ateliers de théâtre et de robotique des vacances d'automne se clôturent ce vendredi à 17 heures. Les dossiers incomplets ou déposés après ce délai seront automatiquement placés sur liste d'attente.",
    audioEn: "Hello, you have reached the youth services voicemail of the municipal council. We inform you that registrations for autumn holiday theater and robotics workshops close this Friday at 5:00 PM. Incomplete applications or submissions received after this deadline will automatically be placed on the waiting list.",
    questionFr: "Quel est l'avertissement formulé dans ce message ?",
    questionEn: "What warning is stated in this message?",
    optionsFr: [
      "Les ateliers de théâtre sont annulés faute d'un nombre suffisant d'animateurs",
      "Le tarif des activités périscolaires augmentera à compter du mois prochain",
      "Les inscriptions doivent désormais obligatoirement s'effectuer sur place au guichet",
      "Les candidatures tardives ou incomplètes perdront leur priorité d'admission"
    ],
    optionsEn: [
      "Theater workshops are canceled due to an insufficient number of facilitators",
      "Extracurricular activity fees will increase starting from next month",
      "Registrations must now strictly be completed in person at the front desk",
      "Late or incomplete registration files will lose their admission priority"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q09",
    paperNumber: 2,
    questionNumber: 9,
    typology: "MESSAGES",
    level: "B1",
    title: "Communication d'entreprise — Report d'une soutenance client",
    speakingRate: 1.02,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Julien (collègue de travail)"],
    speakerPersonas: [{ role: "Julien", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Salut Clara, c'est Julien. Je sors d'une réunion avec la direction : notre client québécois a décalé notre présentation budgétaire à jeudi matin à 9 heures au lieu de demain après-midi. Ça nous laisse une journée de plus pour finaliser les maquettes financières et intégrer les derniers chiffres de vente.",
    audioEn: "Hi Clara, it's Julien. I just came out of a meeting with management: our Quebec client moved our budget pitch to Thursday morning at 9:00 AM instead of tomorrow afternoon. That gives us one extra day to finalize the financial mockups and include the latest sales numbers.",
    questionFr: "Quelle nouvelle Julien transmet-il à Clara ?",
    questionEn: "What news does Julien share with Clara?",
    optionsFr: [
      "La rupture définitive du contrat commercial suite à un désaccord tarifaire",
      "Le report de leur présentation professionnelle leur accordant un délai de travail",
      "L'obligation de présenter le projet en visioconférence depuis leur domicile",
      "La démission imprévue du responsable des affaires financières du groupe"
    ],
    optionsEn: [
      "The definitive termination of the commercial contract due to pricing disputes",
      "The rescheduling of their professional pitch granting them additional working time",
      "The requirement to deliver the presentation remotely via home videoconference",
      "The unexpected resignation of the group's chief financial officer"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q10",
    paperNumber: 2,
    questionNumber: 10,
    typology: "MESSAGES",
    level: "B1",
    title: "Gare routière régionale — Retard d'autocar pour accident de circulation",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Voix de régulation des transports"],
    speakerPersonas: [{ role: "Voix de régulation", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Avis aux voyageurs en attente de la ligne express 12 en provenance de Chambéry : suite à un important carambolage sur l'autoroute A40, la circulation est interrompue. L'autocar enregistre un retard estimé à quarante-cinq minutes. Les voyageurs en correspondance pour Genève sont invités à se signaler auprès de l'agent d'accueil.",
    audioEn: "Notice to passengers awaiting express line 12 from Chambéry: following a major pile-up on the A40 motorway, traffic has been halted. The coach is experiencing an estimated delay of forty-five minutes. Passengers connecting to Geneva are asked to report to the information agent.",
    questionFr: "Quelle situation perturbe le trajet des voyageurs ?",
    questionEn: "What situation is disrupting the travelers' journey?",
    optionsFr: [
      "Une panne mécanique majeure survenue dans le moteur du véhicule",
      "Une grève inattendue des conducteurs du réseau d'autocars régionaux",
      "Des chutes de neige abondantes rendant les routes secondaires impraticables",
      "Un incident routier sur l'axe principal provoquant un retard conséquent"
    ],
    optionsEn: [
      "A major mechanical breakdown occurring within the vehicle's engine",
      "An unexpected walkout strike by regional coach network drivers",
      "Heavy snowfall rendering regional secondary mountain roads impassable",
      "A highway traffic accident on the main thoroughfare causing a substantial delay"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q11",
    paperNumber: 2,
    questionNumber: 11,
    typology: "MESSAGES",
    level: "B1",
    title: "Complexe aquatique municipal — Fermeture technique périodique",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Direction des sports"],
    speakerPersonas: [{ role: "Direction des sports", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Chers abonnés du centre aquatique, nous vous rappelons que le bassin olympique sera totalement inaccessible du lundi 12 au dimanche 18 octobre inclus pour l'opération annuelle de vidange sanitaire et de révision des filtres. Les espaces de remise en forme et le sauna resteront ouverts selon les horaires habituels.",
    audioEn: "Dear aquatic center members, we remind you that the Olympic swimming pool will be completely inaccessible from Monday October 12 to Sunday October 18 inclusive for the annual sanitary drainage and filtration maintenance. The fitness facilities and sauna will remain open according to normal operating hours.",
    questionFr: "Quelle modalité concerne les usagers de la piscine ?",
    questionEn: "Which condition affects swimming pool patrons?",
    optionsFr: [
      "L'inaccessibilité temporaire des bassins en raison d'obligations d'hygiène",
      "Une augmentation définitive des tarifs d'accès aux équipements sportifs",
      "La suppression définitive des créneaux horaires réservés aux adultes le soir",
      "L'obligation de souscrire un abonnement annuel pour accéder au sauna"
    ],
    optionsEn: [
      "The temporary inaccessibility of the swimming pools due to sanitary obligations",
      "A permanent fee hike for general admission across all sports facilities",
      "The permanent cancellation of adult evening lap swim scheduling slots",
      "The mandatory purchase of an annual subscription pass to use the sauna"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q12",
    paperNumber: 2,
    questionNumber: 12,
    typology: "MESSAGES",
    level: "B1",
    title: "Garage automobile — Disponibilité d'un devis de révision",
    speakingRate: 1.0,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Chef d'atelier"],
    speakerPersonas: [{ role: "Chef d'atelier", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Bonjour monsieur Garnier, c'est le garage des Érables. Nous avons examiné votre véhicule ce matin : les disques et plaquettes de frein avant sont trop usés pour passer le contrôle technique. Nous avons chiffré l'intervention à deux cent quatre-vingts euros pièces et main-d'œuvre. Merci de nous donner votre accord avant midi pour commander les pièces.",
    audioEn: "Hello Mr. Garnier, this is Érables Garage. We inspected your vehicle this morning: the front brake pads and rotors are too worn to pass the technical vehicle inspection. We quoted the repair at two hundred and eighty euros including parts and labor. Please give us your approval before noon so we can order the parts.",
    questionFr: "Qu'attend le garagiste de son client ?",
    questionEn: "What is the mechanic expecting from his customer?",
    optionsFr: [
      "Qu'il vienne récupérer immédiatement sa voiture non réparable",
      "Qu'il dépose sa carte grise originale pour refaire la plaque d'immatriculation",
      "Qu'il valide l'estimation financière des réparations pour lancer les travaux",
      "Qu'il contacte sa compagnie d'assurance pour déclarer un sinistre mécanique"
    ],
    optionsEn: [
      "That he come pick up his vehicle immediately as it cannot be repaired",
      "That he hand over vehicle registration papers to re-stamp the license plate",
      "That he authorize the financial repair estimate so work can commence",
      "That he contact his car insurance provider to file an accidental damage claim"
    ],
    correctIndex: 2, // Key C
  },

  // ── SECTION C : MICRO-TROTTOIRS (Q13 - Q18) ──
  // Sujet : Interdiction progressive des emballages plastiques à usage unique
  {
    id: "tef-p2-co-q13",
    paperNumber: 2,
    questionNumber: 13,
    typology: "MICRO_TROTTOIR",
    level: "B1",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenante 1 (Sophie)",
    speakingRate: 1.04,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Sophie (étudiante en biologie)"],
    speakerPersonas: [{ role: "Sophie", gender: "female", voiceId: "fr-FR-DeniseNeural" }],
    audioFr: "Sophie : Franchement, il était grand temps de légiférer ! Quand on voit nos océans saturés de microplastiques et les décharges qui débordent, interdire ces barquettes et emballages jetables est une urgence absolue. Acheter en vrac avec ses propres bocaux réutilisables, c'est un réflexe tellement simple à adopter au quotidien.",
    audioEn: "Sophie: Frankly, it was high time to pass legislation! When we see our oceans choked with microplastics and landfills overflowing, banning these disposable trays and wrappers is an absolute emergency. Buying in bulk with our own reusable glass jars is such an easy daily habit to adopt.",
    questionFr: "Quelle est la position de Sophie sur l'interdiction des emballages plastiques ?",
    questionEn: "What is Sophie's stance on banning single-use plastic packaging?",
    optionsFr: [
      "Hostile : elle juge cette réglementation liberticide pour les consommateurs",
      "Favorable sans réserve : elle la considère comme une mesure écologique salutaire et urgente",
      "Indifférente : elle estime que cela n'aura aucun impact concret sur l'environnement",
      "Partagée : elle approuve les sanctions mais redoute une hausse des prix alimentaires"
    ],
    optionsEn: [
      "Hostile: she considers this regulation to infringe on consumer freedoms",
      "Fully supportive: she considers it a healthy and urgent environmental measure",
      "Indifferent: she believes it will have zero concrete impact on the environment",
      "Divided: she supports penalties but fears a surge in grocery prices"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q14",
    paperNumber: 2,
    questionNumber: 14,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenant 2 (Patrick)",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Patrick (commerçant boucher-charcutier)"],
    speakerPersonas: [{ role: "Patrick", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Patrick : Dans mon métier de boucher, cette loi est une absurdité totale ! Le plastique garantit une hygiène irréprochable et la chaîne du froid pour la viande fraîche. Les barquettes biosourcées coûtent trois fois plus cher et ne sont pas étanches. On fait peser des coûts exorbitants sur les petits commerces de quartier qui luttent déjà pour survivre.",
    audioEn: "Patrick: In my butcher business, this law is total nonsense! Plastic guarantees impeccable hygiene and cold chain safety for fresh meat. Bio-sourced trays cost three times as much and are not leakproof. We are placing exorbitant costs on small independent shopkeepers who are already struggling to survive.",
    questionFr: "Quelle est la position de Patrick sur cette mesure ?",
    questionEn: "What is Patrick's position regarding this measure?",
    optionsFr: [
      "Favorable : il y voit une opportunité d'attirer une clientèle éco-responsable",
      "Partagée : il approuve l'abandon du plastique pour les fruits mais pas pour la viande",
      "Indifférente : il affirme que les clients acceptent spontanément le surcoût",
      "Hostile : il dénonce les contraintes d'hygiène et la charge financière imposée aux commerçants"
    ],
    optionsEn: [
      "Supportive: he sees it as an opportunity to attract eco-conscious shoppers",
      "Divided: he supports eliminating plastic for fruit but not for butchery meat",
      "Indifferent: he claims customers voluntarily absorb the price difference",
      "Hostile: he decries hygiene constraints and the heavy financial burden placed on shopkeepers"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q15",
    paperNumber: 2,
    questionNumber: 15,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenante 3 (Camille)",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Camille (mère de famille active)"],
    speakerPersonas: [{ role: "Camille", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Camille : L'intention écologique est tout à fait respectable et je trie mes déchets scrupuleusement. Mais sur le plan pratique, c'est extrêmement contraignant pour une famille avec trois enfants : les rayons en vrac sont souvent beaucoup plus chers que les produits emballés standards. Si l'écologie devient un luxe réservé aux personnes aisées, la transition ne fonctionnera jamais.",
    audioEn: "Camille: The environmental intention is entirely commendable and I sort my household waste scrupulously. But practically, it is extremely burdensome for a family with three children: bulk food sections are often significantly more expensive than standard packaged goods. If ecology becomes a luxury reserved for the affluent, this transition will never succeed.",
    questionFr: "Quelle est la position de Camille ?",
    questionEn: "What is Camille's stance?",
    optionsFr: [
      "Partagée : elle soutient le principe écologique mais déplore l'inégalité de coût pour les ménages",
      "Favorable inconditionnelle : elle milite pour l'interdiction immédiate de tout suremballage",
      "Résolument hostile : elle refuse tout effort de tri domestique par principe idéologique",
      "Neutre : elle ne fréquente jamais les grandes surfaces alimentaires ni les magasins bio"
    ],
    optionsEn: [
      "Divided: she supports the eco principle but deplores the cost inequality for households",
      "Unconditionally supportive: she campaigns for an immediate ban on all overpackaging",
      "Decidedly hostile: she refuses any household recycling sorting out of principle",
      "Neutral: she never shops at supermarkets or organic bulk grocery stores"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q16",
    paperNumber: 2,
    questionNumber: 16,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenant 4 (Thomas)",
    speakingRate: 1.03,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Thomas (employé de bureau)"],
    speakerPersonas: [{ role: "Thomas", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Thomas : Moi, vous savez, emballé sous plastique ou dans du carton recyclé, je ne fais pas vraiment attention. Je prends ce qui se trouve sur l'étagère du supermarché le plus proche de chez moi. Si les magasins changent leurs boîtes, je m'adapterai sans problème, mais je ne vais pas passer des heures à comparer les matières.",
    audioEn: "Thomas: Me, you know, packaged in plastic or recycled cardboard, I don't really pay much attention. I grab whatever is on the shelf at the supermarket closest to my place. If stores switch containers, I'll adapt without an issue, but I'm not going to spend hours comparing materials.",
    questionFr: "Quelle est la position de Thomas ?",
    questionEn: "What is Thomas's position?",
    optionsFr: [
      "Engagée : il boycotte systématiquement les enseignes vendant du plastique",
      "Critique : il exige le retour exclusif des bouteilles en verre consigné",
      "Indifférente : il s'accommode passivement des changements sans attacher d'importance au sujet",
      "Hostile : il dépose des recours légaux contre les nouvelles directives environnementales"
    ],
    optionsEn: [
      "Actively committed: he systematically boycotts stores stocking plastic packaging",
      "Critical: he demands an exclusive return to returnable deposit glass bottles",
      "Indifferent: he passively accommodates changes without attaching personal importance to the topic",
      "Hostile: he files legal appeals against newly mandated environmental directives"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q17",
    paperNumber: 2,
    questionNumber: 17,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenante 5 (Amina)",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Amina (fondatrice d'une épicerie zéro déchet)"],
    speakerPersonas: [{ role: "Amina", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Amina : C'est une immense victoire collective ! L'industrie agroalimentaire nous a fait croire pendant cinquante ans qu'on ne pouvait pas vivre sans plastique jetable. En réalité, quand on généralise les contenants consignés et les sacs en tissu, les déchets ménagers diminuent de 40 % dès le premier mois. Il faut aller encore plus vite et sanctionner les industriels récalcitrants.",
    audioEn: "Amina: It's a huge collective victory! The food industry made us believe for fifty years that we could not live without disposable plastic. In reality, when we normalize returnable containers and cloth bags, household waste decreases by 40% in the very first month. We must move even faster and penalize recalcitrant manufacturers.",
    questionFr: "Quelle est l'opinion d'Amina ?",
    questionEn: "What is Amina's opinion?",
    optionsFr: [
      "Défaitiste : elle affirme que les habitudes de consommation sont impossibles à modifier",
      "Fervente partisane : elle salue une avancée capitale et réclame une accélération des réformes",
      "Nuancée : elle estime que l'interdiction fragilise l'exportation des produits du terroir",
      "Opposée : elle regrette la disparition du plastique qui facilitait la conservation longue"
    ],
    optionsEn: [
      "Defeatist: she claims consumer grocery habits are impossible to transform",
      "Fervent supporter: she hails a pivotal advance and calls for accelerating reforms",
      "Nuanced: she believes the ban undermines local regional agricultural exports",
      "Opposed: she regrets the phase-out of plastic which facilitated long-term food preservation"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q18",
    paperNumber: 2,
    questionNumber: 18,
    typology: "MICRO_TROTTOIR",
    level: "B2",
    title: "Micro-Trottoir : Plastique à usage unique — Intervenant 6 (Laurent)",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 10,
    speakerCount: 1,
    speakers: ["Laurent (artisan électricien)"],
    speakerPersonas: [{ role: "Laurent", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Laurent : Moi, je cours toute la journée sur les chantiers, je déjeune sur le pouce entre deux interventions. Devoir trimballer ses propres boîtes en verre dans sa camionnette ou laver des couverts dans une station-service, c'est totalement irréaliste pour les artisans nomades. On crée des tracasseries administratives et pratiques quotidiennes sans penser à ceux qui bossent dehors.",
    audioEn: "Laurent: I run around job sites all day long, grabbing lunch on the fly between call-outs. Having to carry your own glass containers in a work van or wash cutlery at a petrol station is completely unrealistic for mobile tradespeople. We are inventing bureaucratic and practical everyday headaches without considering those who work outdoors.",
    questionFr: "Quel reproche majeur Laurent adresse-t-il à cette réglementation ?",
    questionEn: "What major criticism does Laurent level at this regulation?",
    optionsFr: [
      "Le risque sanitaire élevé lié au stockage prolongé des aliments dans les camionnettes",
      "L'absence totale d'informations claires communiquées par les chambres de métiers",
      "L'insuffisance des aides financières de l'État pour moderniser l'outillage professionnel",
      "L'incompatibilité des contraintes matérielles avec le rythme de travail des professionnels nomades"
    ],
    optionsEn: [
      "The elevated health hazard tied to prolonged food storage inside work vehicles",
      "The complete lack of clear guidance communicated by vocational trade guilds",
      "The inadequacy of government grant subsidies to modernize professional equipment",
      "The incompatibility of practical physical hassles with the workflow of mobile workers"
    ],
    correctIndex: 3, // Key D
  },

  // ── SECTION D : REPORTAGES D'ACTUALITÉ & CHRONIQUES (Q19 - Q28) ──
  {
    id: "tef-p2-co-q19",
    paperNumber: 2,
    questionNumber: 19,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Environnement — Renaturation des rivières urbaines",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le journaliste environnement"],
    speakerPersonas: [{ role: "Journaliste environnement", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Dans les années 1960, de nombreuses municipalités avaient fait le choix de canaliser ou d'enfouir sous des dalles de béton leurs petits cours d'eau pour faciliter l'urbanisation routière. Aujourd'hui, face à la multiplication des vagues de chaleur caniculaire, la tendance s'inverse spectaculairement : plusieurs métropoles rouvrent ces rivières à l'air libre. En recréant des méandres naturels et des berges végétalisées, la température ressentie baisse localement de trois à quatre degrés en plein cœur de ville tout en restaurant des corridors écologiques pour la faune.",
    audioEn: "In the 1960s, many municipal councils chose to canalize or bury small streams beneath concrete slabs to ease urban highway expansion. Today, facing multiplying heatwaves, the trend is dramatically reversing: several metropolitan centers are daylighting these buried rivers. By recreating natural meanders and vegetated banks, ambient temperatures drop locally by three to four degrees in downtown cores while restoring wildlife migration corridors.",
    questionFr: "Quel est le bénéfice climatique direct de la réouverture des rivières urbaines ?",
    questionEn: "What is the direct climate benefit of daylighting urban rivers?",
    optionsFr: [
      "Une atténuation mesurable des îlots de chaleur urbains grâce aux berges végétalisées",
      "L'élimination définitive du risque d'inondation en aval lors des tempêtes automnales",
      "La production hydroélectrique suffisante pour éclairer les quartiers périphériques",
      "L'installation de voies navigables commerciales pour décongestionner le trafic routier"
    ],
    optionsEn: [
      "A measurable mitigation of urban heat islands thanks to vegetated waterways",
      "The definitive elimination of downstream flooding risks during autumn storm surges",
      "Hydroelectric output sufficient to power street lighting across suburban districts",
      "The installation of commercial barge waterways to decongest highway traffic"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q20",
    paperNumber: 2,
    questionNumber: 20,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Économie circulaire — Ressourceries de matériaux du bâtiment",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La chroniqueuse économique"],
    speakerPersonas: [{ role: "Chroniqueuse économique", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Le secteur du bâtiment génère chaque année plus de quarante millions de tonnes de déchets en France, dont une part considérable de matériaux en parfait état issus de démolitions. Pour enrayer ce gaspillage colossal, les ressourceries de matériaux connaissent un essor fulgurant : charpentes en chêne, briques anciennes, portes en bois massif et carrelages rétro sont désormais démontés proprement, répertoriés sur des plateformes numériques et revendus 40 à 60 % moins cher que du neuf à des artisans ou des particuliers.",
    audioEn: "The construction sector generates over forty million tonnes of waste annually in France, a substantial portion of which comprises pristine materials salvaged from demolitions. To halt this colossal squandering, salvage material ressourceries are surging: oak rafters, reclaimed heritage bricks, solid wood doors, and vintage tiles are carefully disassembled, cataloged on digital platforms, and sold 40 to 60% below new prices to contractors and homeowners.",
    questionFr: "Quel modèle d'affaires ces nouvelles ressourceries valorisent-elles ?",
    questionEn: "What business model do these new architectural salvage hubs champion?",
    optionsFr: [
      "La destruction thermique des gravats pour fabriquer des ciments industriels décarbonés",
      "L'exportation exclusive de bois brut vers les chantiers de construction internationaux",
      "Le sauvetage et la revente à coût réduit de composants architecturaux réutilisables",
      "La transformation obligatoire de tous les déchets de chantier en combustible de chauffage"
    ],
    optionsEn: [
      "The thermal incineration of rubble to produce low-carbon industrial cements",
      "The exclusive export of raw timber to international skyscraper construction sites",
      "The salvaging and discounted resale of reusable architectural building elements",
      "The mandatory conversion of all construction site debris into solid biomass heating fuel"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q21",
    paperNumber: 2,
    questionNumber: 21,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Santé — Luminothérapie et travail posté de nuit",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le journaliste santé"],
    speakerPersonas: [{ role: "Journaliste santé", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Les personnels de santé et les ouvriers travaillant en horaires décalés de nuit subissent un dérèglement chronique de leur horloge biologique interne. Une étude clinique menée auprès de cinq cents infirmiers révèle qu'une exposition ciblée à une lumière blanche enrichie en bleu de dix mille lux pendant trente minutes, dès la fin de leur poste avant le coucher, permet de recalibrer la sécrétion de mélatonine. Les participants rapportent une amélioration de 45 % de la qualité du sommeil diurne et une baisse significative de la fatigue cognitive.",
    audioEn: "Healthcare workers and factory staff working overnight shifts suffer from chronic disruptions to their internal circadian clock. A clinical trial involving five hundred nurses reveals that targeted exposure to blue-enriched white light at ten thousand lux for thirty minutes, immediately following shift completion before sleep, recalibrates melatonin secretion. Participants reported a 45% improvement in daytime sleep quality and a significant reduction in cognitive fatigue.",
    questionFr: "Quel résultat probant cette étude clinique met-elle en avant ?",
    questionEn: "What definitive finding does this clinical trial highlight?",
    optionsFr: [
      "La suppression totale du travail de nuit dans les services d'urgence hospitaliers",
      "L'efficacité supérieure des somnifères de synthèse par rapport à la lumière naturelle",
      "La nécessité d'interdire les écrans de smartphone aux infirmiers pendant leur journée",
      "L'action bénéfique d'un protocole d'exposition lumineuse sur la récupération du sommeil"
    ],
    optionsEn: [
      "The complete abolition of overnight shifts across hospital emergency services",
      "The superior clinical efficacy of synthetic sedatives compared to natural light",
      "The necessity of barring nurse smartphone screen usage throughout daytime hours",
      "The beneficial impact of a calibrated light exposure protocol on sleep recovery"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q22",
    paperNumber: 2,
    questionNumber: 22,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Culture & Patrimoine — Numérisation 3D des fresques médiévales",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La chroniqueuse patrimoine"],
    speakerPersonas: [{ role: "Chroniqueuse patrimoine", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Dans les cryptes romanes et les chapelles isolées, l'humidité et les variations thermiques altèrent irrémédiablement les pigments des fresques du douzième siècle. Une équipe internationale de restaurateurs et d'ingénieurs en photonique utilise désormais un scanner laser photogrammétrique ultra-haute résolution. Cette technologie enregistre la texture picturale au micromètre près et reconstitue la palette originale des couleurs sous les couches de suie, permettant de créer des jumeaux numériques immersifs ouverts aux chercheurs sans toucher aux parois fragiles.",
    audioEn: "In Romanesque crypts and remote chapels, humidity and thermal swings permanently degrade the pigments of twelfth-century wall frescoes. An international team of art conservators and photonics engineers is now utilizing an ultra-high-resolution photogrammetric laser scanner. This technology captures pictorial textures down to the micrometer and reconstructs original color palettes beneath layers of soot, generating immersive digital twins for scholars without disturbing fragile surfaces.",
    questionFr: "Quelle avancée majeure apporte cette méthode de numérisation patrimoniale ?",
    questionEn: "What major advancement does this heritage digitization technique bring?",
    optionsFr: [
      "Le décapage chimique intégral des peintures murales pour appliquer un vernis plastique",
      "La préservation numérique fidèle des œuvres murales sans contact physique destructeur",
      "La reconstruction physique à l'identique de tous les édifices religieux menacés d'effondrement",
      "Le remplacement des restaurateurs d'art humains par des bras robotisés automatisés"
    ],
    optionsEn: [
      "The comprehensive chemical stripping of frescoes to apply an impervious acrylic varnish",
      "The faithful digital preservation of wall paintings without destructive physical contact",
      "The full-scale brick-and-mortar replica construction of all crumbling medieval chapels",
      "The replacement of human art restorers with fully automated robotic spray arms"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q23",
    paperNumber: 2,
    questionNumber: 23,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Technologie — Balises acoustiques et protection des baleines",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le journaliste scientifique"],
    speakerPersonas: [{ role: "Journaliste scientifique", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Dans le golfe du Saint-Laurent, les collisions avec les grands navires marchands constituent la première cause de mortalité des rorquals bleus et des baleines franches. Pour parer à ce danger, un réseau de bouées hydrophoniques intelligentes a été immergé le long des couloirs maritimes. Grâce à des algorithmes de reconnaissance bioacoustique, les bouées détectent les chants de baleines en temps réel et transmettent automatiquement une alerte aux cargos, qui réduisent immédiatement leur vitesse à moins de dix nœuds, diminuant le risque de choc fatal de près de 80 %.",
    audioEn: "In the Gulf of St. Lawrence, collisions with giant merchant vessels are the leading cause of mortality among blue whales and North Atlantic right whales. To counter this peril, an intelligent hydrophone buoy network has been anchored along commercial shipping lanes. Powered by bioacoustic machine learning algorithms, the buoys detect whale vocalizations in real time and automatically transmit warnings to freighters, which immediately throttle speed below ten knots, reducing fatal collision risk by nearly 80%.",
    questionFr: "Comment ce système technologique prévient-il les collisions marines ?",
    questionEn: "How does this technological system prevent maritime collisions?",
    optionsFr: [
      "En alertant les cargos pour ralentir dès la détection acoustique des cétacés",
      "En diffusant des ondes sonores agressives pour effrayer et chasser les baleines",
      "En fermant complètement le golfe maritime à tout transport commercial international",
      "En escortant militairement chaque porte-conteneurs jusqu'aux quais de déchargement"
    ],
    optionsEn: [
      "By alerting freighters to throttle down as soon as cetaceans are detected acoustically",
      "By broadcasting loud deterrence shockwaves to frighten and drive whales out to sea",
      "By permanently closing the entire maritime gulf to international shipping traffic",
      "By assigning armed naval escorts to guide every container ship to port moorings"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q24",
    paperNumber: 2,
    questionNumber: 24,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Société — Cantines scolaires 100% bio et circuits courts",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La journaliste société"],
    speakerPersonas: [{ role: "Journaliste société", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Servir mille repas quotidiens entièrement biologiques et locaux sans augmenter le prix de la cantine pour les familles : c'est le défi réussi par la ville de Mouans-Sartoux. La municipalité a créé sa propre régie agricole communale sur six hectares de terres préservées, cultivant cinquante tonnes de légumes par an. Pour compenser le surcoût des denrées de qualité, la cheffe de cuisine a traqué le gaspillage alimentaire, passant de 150 grammes de déchets par plateau à moins de 30 grammes, réalisant ainsi une économie budgétaire réinvestie dans l'achat de viandes locales labellisées.",
    audioEn: "Serving a thousand daily school meals that are 100% organic and locally grown without hiking lunch fees for parents: this is the feat achieved by the town of Mouans-Sartoux. The municipality established its own municipal farm across six hectares of protected land, producing fifty tonnes of vegetables annually. To offset higher ingredient expenses, the head chef tackled kitchen food waste, dropping discards from 150 grams per plate to under 30 grams, channeling the savings into purchasing certified regional meats.",
    questionFr: "Quelle stratégie financière a permis d'équilibrer le budget de ces cantines ?",
    questionEn: "What financial strategy enabled balancing the budget for these school cafeterias?",
    optionsFr: [
      "Une hausse substantielle des impôts locaux votée par le conseil municipal",
      "La suppression des repas chauds au profit de sandwichs froids apportés de la maison",
      "La réduction drastique du gaspillage alimentaire pour financer des produits nobles",
      "L'abandon total des contrôles sanitaires pour acheter des invendus périmés"
    ],
    optionsEn: [
      "A substantial municipal property tax hike passed by the town council",
      "The elimination of hot lunches in favor of cold home-packed sandwiches",
      "A drastic reduction in kitchen plate food waste to fund high-grade ingredients",
      "The outright abandonment of health inspections to purchase expired clearance surplus"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q25",
    paperNumber: 2,
    questionNumber: 25,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Sciences — Bactéries fixatrices d'azote et agriculture sans engrais",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le chroniqueur recherche"],
    speakerPersonas: [{ role: "Chroniqueur recherche", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "Les engrais azotés de synthèse représentent près de 5 % des émissions mondiales de gaz à effet de serre et contaminent les nappes phréatiques. Des chercheurs de l'INRAE ont isolé une souche bactérienne endophyte capable de coloniser les racines des céréales comme le blé et le maïs. Ces micro-organismes captent l'azote de l'air et le transforment en nutriments directement assimilables par la plante. Les premiers essais en plein champ montrent un rendement équivalent avec une diminution de 70 % des apports en engrais chimiques, marquant un tournant décisif vers une fertilisation biologique autonome.",
    audioEn: "Synthetic nitrogen fertilizers account for nearly 5% of global greenhouse emissions and contaminate groundwater aquifers. Researchers at INRAE have isolated an endophytic bacterial strain capable of colonizing cereal root systems such as wheat and corn. These microorganisms capture airborne nitrogen and convert it into plant-ready bioavailable nutrients. Initial field trials demonstrate equivalent crop yields alongside a 70% reduction in chemical fertilizer inputs, marking a decisive shift toward autonomous bio-fertilization.",
    questionFr: "Quel est l'impact environnemental majeur de cette innovation biologique ?",
    questionEn: "What is the major environmental impact of this biological innovation?",
    optionsFr: [
      "L'augmentation des besoins en irrigation par inondation des parcelles agricoles",
      "Une baisse massive de l'utilisation des fertilisants azotés polluants à rendement égal",
      "L'éradication complète de toutes les espèces d'insectes dans les zones cultivées",
      "La modification génétique obligatoire de toutes les variétés de semences céréalières"
    ],
    optionsEn: [
      "An increase in surface flood irrigation requirements across agricultural plots",
      "A massive reduction in polluting nitrogen fertilizer usage while sustaining yields",
      "The wholesale extermination of all insect pollinator species across farmlands",
      "The mandatory genetic modification of all staple cereal grain crop varieties"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q26",
    paperNumber: 2,
    questionNumber: 26,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Transports — Réseau express vélo interurbain",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La journaliste mobilité"],
    speakerPersonas: [{ role: "Journaliste mobilité", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "Le vélo n'est plus réservé aux seuls déplacements intramuros. Dans les agglomérations de Rennes et Strasbourg, les nouveaux réseaux express vélo relient les communes périphériques distantes de quinze à vingt kilomètres au cœur de métropole. Il s'agit de véritables autoroutes cyclables : pistes larges de quatre mètres, séparées physiquement du trafic routier, éclairées par détection de mouvement et bénéficiant d'une priorité absolue aux carrefours. Avec le boom des vélos à assistance électrique, ces corridors sécurisés captent déjà un navetteur sur quatre sur les trajets pendulaires domicile-travail.",
    audioEn: "Cycling is no longer confined solely to inner-city neighborhoods. In the metropolitan regions of Rennes and Strasbourg, newly built express cycle networks connect peripheral towns fifteen to twenty kilometers away directly to the urban core. These are genuine cycle highways: four meters wide, physically partitioned from motor traffic, illuminated by motion sensors, and enjoying full priority at intersections. With the boom in e-bikes, these protected corridors already capture one in four suburban commuters.",
    questionFr: "Qu'est-ce qui caractérise ce réseau express cyclable interurbain ?",
    questionEn: "What characterizes this interurban express bicycle network?",
    optionsFr: [
      "Son tracé strictement limité aux chemins de terre des parcs municipaux",
      "L'obligation de payer un péage kilométrique pour amortir les coûts de bitume",
      "L'interdiction absolue des vélos électriques pour préserver la quiétude des piétons",
      "Des voies larges et sécurisées offrant un itinéraire rapide et prioritaire aux banlieusards"
    ],
    optionsEn: [
      "Its route being strictly restricted to unpaved dirt pathways within public city parks",
      "The requirement to pay a per-kilometer distance toll to recoup asphalt surfacing costs",
      "The complete prohibition of electric bikes to protect pedestrian tranquility",
      "Wide, segregated lanes providing a rapid, prioritized commuting corridor for suburbanites"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q27",
    paperNumber: 2,
    questionNumber: 27,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Éducation — Initiation à l'algorithmique sans écran",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le chroniqueur éducation"],
    speakerPersonas: [{ role: "Chroniqueur éducation", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "Comment familiariser les élèves de primaire à la pensée informatique sans les surexposer aux écrans tactiles ? C'est le pari de la méthode du « code débranché » expérimentée dans deux cents écoles élémentaires. À l'aide de tapis quadrillés au sol, de jetons en bois et de cartes de déplacement, les enfants apprennent à concevoir des boucles logiques et à corriger des erreurs de séquençage en guidant physiquement un camarade qui joue le rôle du robot. Les enseignants constatent un renforcement spectaculaire du repérage spatial et de la coopération entre élèves.",
    audioEn: "How can elementary school pupils be introduced to computational thinking without exacerbating screen exposure? That is the aim of the 'unplugged coding' method tested in two hundred primary schools. Using floor grid mats, wooden tokens, and directional command cards, children learn to build logical loops and debug sequencing errors by physically guiding a classmate acting as the robot. Teachers report dramatic improvements in spatial reasoning and collaborative teamwork.",
    questionFr: "Quel est le principe fondamental de la méthode pédagogique présentée ?",
    questionEn: "What is the core principle of the showcased educational method?",
    optionsFr: [
      "Manipuler des supports physiques et corporels pour assimiler la logique de programmation",
      "Fournir une tablette numérique individuelle connectée à chaque élève dès la maternelle",
      "Supprimer les cours de mathématiques au profit de jeux vidéo de stratégie en ligne",
      "Remplacer les instituteurs par des logiciels d'intelligence artificielle conversationnelle"
    ],
    optionsEn: [
      "Using tangible physical tools and body movements to grasp algorithmic logic",
      "Equipping every kindergarten pupil with an individual connected digital tablet",
      "Scrapping conventional arithmetic lessons in favor of online competitive strategy video games",
      "Replacing human elementary school teachers with conversational AI software bots"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q28",
    paperNumber: 2,
    questionNumber: 28,
    typology: "REPORTAGE_DEBAT",
    level: "B2",
    title: "Chronique Urbanisme — Toitures végétalisées et gestion des eaux pluviales",
    speakingRate: 1.05,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["La journaliste urbanisme"],
    speakerPersonas: [{ role: "Journaliste urbanisme", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "Face à l'imperméabilisation croissante des sols urbains, les réseaux d'assainissement saturent au moindre orage violent, provoquant des inondations de sous-sols et des rejets d'eaux usées en milieu naturel. La métropole de Lyon a instauré une obligation de toiture végétale pour toute nouvelle construction commerciale supérieure à mille mètres carrés. Composées d'un substrat drainant et de sédums rustiques, ces toitures retiennent jusqu'à 70 % des précipitations, les restituant lentement par évapotranspiration, ce qui désengorge durablement les canalisations tout en améliorant l'isolation phonique des bâtiments.",
    audioEn: "Faced with compounding urban soil sealing, stormwater sewer systems overflow during intense downpours, causing basement flooding and untreated wastewater spills into rivers. The Lyon metropolitan authority enacted a green roof mandate for any new commercial building exceeding one thousand square meters. Engineered with a specialized drainage substrate and hardy sedums, these living roofs retain up to 70% of rainfall, releasing it gradually through evapotranspiration, providing lasting relief to storm drains while enhancing acoustic insulation.",
    questionFr: "Quelle fonction primordiale remplissent ces toitures écologiques en ville ?",
    questionEn: "What paramount function do these urban eco-roofs serve?",
    optionsFr: [
      "Permettre l'atterrissage d'hélicoptères de secours sur les toits d'usines",
      "Produire des légumes bio pour approvisionner les supermarchés situés au rez-de-chaussée",
      "Réguler le débit des eaux de pluie pour prévenir la saturation des réseaux d'évacuation",
      "Créer des terrasses privatisées réservées exclusivement aux dirigeants d'entreprise"
    ],
    optionsEn: [
      "Enable emergency rescue helicopter landings atop industrial manufacturing buildings",
      "Produce organic vegetables to supply supermarket storefronts situated on the ground floor",
      "Buffer stormwater runoff velocity to prevent the overloading of municipal drainage conduits",
      "Construct exclusive private leisure rooftop decks reserved for corporate executive board members"
    ],
    correctIndex: 2, // Key C
  },

  // ── SECTION D : LE GRAND ENTRETIEN (Q29 - Q34) ──
  // Thème : « L'intelligence artificielle générative et l'avenir des humanités » (Pr. Hélène Rousseau)
  {
    id: "tef-p2-co-q29",
    paperNumber: 2,
    questionNumber: 29,
    typology: "GRAND_ENTRETIEN",
    level: "B2",
    title: "Grand Entretien : IA et Humanités — Objectif de recherche initial",
    speakingRate: 1.06,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Professeure Hélène Rousseau, vous dirigez le département d'épistémologie comparée à l'Université de Genève. Qu'est-ce qui a motivé votre laboratoire à lancer cette vaste enquête sur l'intégration des modèles de langage dans l'enseignement supérieur ?\nPr. Rousseau : Bonjour Marc. Nous voulions dépasser la simple panique morale autour du plagiat pour observer rigoureusement la métamorphose du geste d'écriture. Notre démarche visait à analyser comment la médiation algorithmique reconfigure la structuration de la pensée chez les étudiants de licence et de master confrontés à des textes philosophiques complexes.",
    audioEn: "Marc: Professor Hélène Rousseau, you head the comparative epistemology department at the University of Geneva. What motivated your laboratory to launch this extensive inquiry into the adoption of large language models in higher education?\nProf. Rousseau: Hello Marc. We wanted to move beyond the knee-jerk moral panic surrounding plagiarism to rigorously examine how the act of writing is being transformed. Our objective was to analyze how algorithmic mediation reshapes the structuring of thought among undergraduate and graduate students engaging with complex philosophical texts.",
    questionFr: "Quelle intention guidait la recherche universitaire du Pr. Rousseau ?",
    questionEn: "What intention guided Professor Rousseau's academic inquiry?",
    optionsFr: [
      "Développer un logiciel anti-triche commercial pour sanctionner les étudiants coupables",
      "Interdire définitivement l'utilisation des ordinateurs portables dans les bibliothèques",
      "Démontrer la supériorité absolue de l'intelligence artificielle sur l'esprit humain",
      "Étudier en profondeur les transformations cognitives induites par les outils génératifs sur l'écriture"
    ],
    optionsEn: [
      "Develop a proprietary commercial anti-cheating software suite to penalize dishonest students",
      "Ban laptop computers permanently from all university libraries and seminar lecture halls",
      "Demonstrate the absolute cognitive superiority of artificial neural networks over human intellect",
      "Investigate in depth the cognitive shifts induced by generative tools on critical writing practices"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q30",
    paperNumber: 2,
    questionNumber: 30,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : IA et Humanités — Le paradoxe de la fluidité stylistique",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Et quelles observations empiriques vous ont le plus frappée au fil des semestres ?\nPr. Rousseau : C'est ce que nous appelons le piège de la prose lissée. Les devoirs soumis présentent une syntaxe irréprochable, une grammaire parfaite et un vocabulaire soutenu. Mais sous ce vernis d'éloquence empruntée, on constate une dramatique atrophie de la prise de risque conceptuelle : les arguments s'enchaînent par consensus mou, sans aspérités, sans doute méthodologique personnel. L'aisance formelle masque un désert d'audace intellectuelle.",
    audioEn: "Marc: And what empirical observations struck you most across the semesters?\nProf. Rousseau: It is what we termed the smoothed prose illusion. The essays submitted display impeccable syntax, perfect grammar, and elevated vocabulary. But beneath this veneer of borrowed eloquence, we observe a dramatic atrophy in conceptual risk-taking: arguments unroll via bland consensus, devoid of friction, devoid of personal methodological skepticism. Formal polish masks a desert of intellectual daring.",
    questionFr: "Quel travers majeur le Pr. Rousseau dénonce-t-elle dans les travaux d'étudiants assistés par l'IA ?",
    questionEn: "What major flaw does Professor Rousseau decry in AI-assisted student submissions?",
    optionsFr: [
      "Une multiplication anormale des fautes d'orthographe et de grammaire élémentaire",
      "Une correction stylistique de surface qui dissimule une perte d'originalité et d'esprit critique",
      "Une réduction drastique de la longueur des dissertations universitaires remises aux professeurs",
      "L'insertion massive de dialectes argotiques incompatibles avec les exigences académiques"
    ],
    optionsEn: [
      "An abnormal spike in elementary spelling mistakes and rudimentary grammatical errors",
      "A polished superficial style that masks an erosion of conceptual originality and critical rigor",
      "A drastic shrinkage in the total page count of academic essays submitted to evaluators",
      "The massive injection of colloquial slang expressions incompatible with academic standards"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q31",
    paperNumber: 2,
    questionNumber: 31,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : IA et Humanités — L'illusion de la conscience discursive",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : N'est-ce pas simplement une nouvelle génération d'encyclopédie interactive, au fond ?\nPr. Rousseau : C'est précisément l'illusion la plus pernicieuse ! Une encyclopédie ou un dictionnaire répertorie des savoirs vérifiés rédigés par des spécialistes. Un grand modèle de langage n'a aucune intention communicative, aucun rapport au vrai ni au faux : il calcule la probabilité statistique d'occurrence du mot suivant. Quand un étudiant le consulte comme un oracle omniscient, il abdique sa propre capacité à confronter des thèses contradictoires.",
    audioEn: "Marc: Isn't this fundamentally just a newer generation of interactive encyclopedia?\nProf. Rousseau: That is precisely the most pernicious illusion! An encyclopedia or a dictionary catalogs verified knowledge drafted by subject specialists. A large language model has zero communicative intent, no relationship to truth or falsehood: it computes the statistical probability of the next token. When a student treats it as an omniscient oracle, they abdicate their own faculty to weigh competing contradictory theses.",
    questionFr: "Quelle distinction épistémologique essentielle le Pr. Rousseau établit-elle ?",
    questionEn: "What crucial epistemological distinction does Professor Rousseau highlight?",
    optionsFr: [
      "Les modèles linguistiques calculent des suites de mots probabilistes sans compréhension de la vérité",
      "Les encyclopédies en ligne coûtent infiniment plus cher que les serveurs informatiques d'IA",
      "Les professeurs d'université possèdent une mémoire encyclopédique supérieure aux algorithmes",
      "Les étudiants utilisent l'intelligence artificielle uniquement pour traduire des textes anciens"
    ],
    optionsEn: [
      "Language models compute probabilistic token sequences without any comprehension of truth",
      "Online encyclopedias are infinitely more expensive to maintain than commercial AI server farms",
      "University professors possess a broader photographic memory than distributed algorithmic clusters",
      "Students exclusively deploy generative artificial intelligence to translate ancient texts"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q32",
    paperNumber: 2,
    questionNumber: 32,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : IA et Humanités — Réinvention de l'évaluation pédagogique",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Face à cette réalité, comment l'université doit-elle repenser ses modalités d'examen ?\nPr. Rousseau : La dissertation solitaire rédigée à la maison a vécu ; elle n'évalue plus qu'une habileté au prompt engineering. Dans notre faculté, nous avons réhabilité la disputatio médiévale : la soutenance orale contradictoire en face-à-face, où l'étudiant doit défendre une thèse à chaud, expliciter son cheminement logique et démonter des contre-arguments improvisés. C'est dans l'interaction verbale directe que se mesure la véritable souveraineté intellectuelle.",
    audioEn: "Marc: In light of this reality, how should higher education redesign its examination formats?\nProf. Rousseau: The take-home solitary essay is effectively dead; it now merely assesses one's knack for prompt engineering. In our faculty, we resurrected the medieval disputatio: live adversarial oral defense, where the student must defend a thesis spontaneously, unpack their logical progression, and dismantle surprise counter-arguments. Genuine intellectual sovereignty is forged through live, unscripted verbal interaction.",
    questionFr: "Quelle refonte des examens le Pr. Rousseau préconise-t-elle ?",
    questionEn: "What examination overhaul does Professor Rousseau advocate?",
    optionsFr: [
      "Remplacer toutes les épreuves universitaires par des questionnaires à choix multiples automatisés",
      "Interdire aux étudiants de s'exprimer oralement en classe pour privilégier le silence",
      "Valoriser l'argumentation orale vivante et la confrontation dialectique en temps réel",
      "Confier la notation intégrale des copies d'examen à des algorithmes prédictifs certifiés"
    ],
    optionsEn: [
      "Replace all university evaluations with standardized automated multiple-choice tests",
      "Forbid students from speaking aloud in class to enforce strict contemplative silence",
      "Champion live spoken debate and real-time dialectical defense over static take-home essays",
      "Delegate the complete grading of student exam manuscripts to certified predictive AI engines"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q33",
    paperNumber: 2,
    questionNumber: 33,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : IA et Humanités — Risque d'homogénéisation culturelle",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : Vous soulignez également un risque géopolitique et culturel pour la francophonie et la diversité linguistique...\nPr. Rousseau : Absolument. Les jeux de données d'entraînement proviennent massivement du corpus numérique anglo-saxon et des normes communicationnelles de la Silicon Valley. Si nous déléguons la production textuelle à ces systèmes, nous importons insidieusement des schémas de pensée uniformisés, un conformisme rhétorique qui marginalise les singularités stylistiques francophones et les voix dissidentes.",
    audioEn: "Marc: You also emphasize a geopolitical and cultural threat to Francophonie and linguistic diversity...\nProf. Rousseau: Absolutely. Training datasets derive overwhelmingly from Anglo-Saxon digital corpora and Silicon Valley communication norms. If we outsource text generation to these architectures, we insidiously import standardized reasoning frameworks, a rhetorical conformity that marginalizes Francophone stylistic nuances and heterodox intellectual perspectives.",
    questionFr: "Quelle menace culturelle majeure le Pr. Rousseau pointe-t-elle du doigt ?",
    questionEn: "What major cultural threat does Professor Rousseau spotlight?",
    optionsFr: [
      "La disparition complète des réseaux internet en Europe au cours de la prochaine décennie",
      "L'impossibilité technique de traduire la langue française vers d'autres idiomes étrangers",
      "La censure systématique exercée par les gouvernements nationaux sur les œuvres littéraires",
      "L'imposition insidieuse d'une pensée unique anglo-saxonne étouffant les nuances stylistiques"
    ],
    optionsEn: [
      "The complete physical shutdown of European telecommunication networks over the coming decade",
      "The technical impossibility of translating the French language into other foreign idioms",
      "Systematic state censorship deployed by national governments against classic literary works",
      "The insidious imposition of uniform Anglo-American frameworks stifling stylistic nuances"
    ],
    correctIndex: 3, // Key D
  },
  {
    id: "tef-p2-co-q34",
    paperNumber: 2,
    questionNumber: 34,
    typology: "GRAND_ENTRETIEN",
    level: "C1",
    title: "Grand Entretien : IA et Humanités — Message de clôture",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 2,
    speakers: ["Journaliste (Marc)", "Pr. Hélène Rousseau"],
    speakerPersonas: [
      { role: "Journaliste", gender: "male", voiceId: "fr-FR-HenriNeural" },
      { role: "Pr. Hélène Rousseau", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }
    ],
    audioFr: "Marc : En conclusion, professeure Rousseau, quel message adressez-vous aux étudiants et aux enseignants qui nous écoutent ?\nPr. Rousseau : Ne soyez ni des technophobes réactionnaires qui refusent d'ouvrir la porte, ni des consommateurs naïfs fascinés par la vitesse. Utilisez la machine comme un miroir critique pour éprouver vos propres arguments, mais gardez jalousement le monopole de l'incertitude, de l'émotion esthétique et du jugement éthique. C'est précisément là que réside ce que l'algorithme ne possédera jamais : une âme.",
    audioEn: "Marc: In conclusion, Professor Rousseau, what message do you extend to the students and educators listening to us?\nProf. Rousseau: Be neither reactionary Luddites who slam the door shut, nor naive consumers mesmerized by mere speed. Deploy the machine as a critical mirror to test your own hypotheses, but fiercely guard your monopoly over epistemic uncertainty, aesthetic emotion, and ethical judgment. That is precisely where lies what the algorithm will never possess: a soul.",
    questionFr: "Quelle attitude équilibrée le Pr. Rousseau recommande-t-elle d'adopter ?",
    questionEn: "What balanced mindset does Professor Rousseau urge everyone to adopt?",
    optionsFr: [
      "Rejeter violemment toute innovation technologique et revenir aux parchemins manuscrits",
      "Exploiter l'outil pour éprouver sa propre réflexion tout en préservant le discernement éthique humain",
      "Déléguer l'ensemble des décisions politiques et éducatives aux serveurs d'intelligence artificielle",
      "Interrompre définitivement les études littéraires pour s'orienter vers l'ingénierie financière"
    ],
    optionsEn: [
      "Violently reject all technological innovations and return strictly to handwritten quill manuscripts",
      "Use the tool as an intellectual stress-test while fiercely preserving human ethical discernment",
      "Delegate all future political and educational policymaking to autonomous AI server arrays",
      "Abandon literary and humanities degrees permanently to pursue quantitative financial engineering"
    ],
    correctIndex: 1, // Key B
  },

  // ── SECTION E : ACTES DE PAROLE & PRAGMATIQUE (Q35 - Q40) ──
  {
    id: "tef-p2-co-q35",
    paperNumber: 2,
    questionNumber: 35,
    typology: "ACTES_DE_PAROLE",
    level: "C1",
    title: "Acte de parole — Critique gastronomique / Ironie mordante",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Un critique gastronomique"],
    speakerPersonas: [{ role: "Critique gastronomique", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "« On ne peut qu'admirer la virtuosité géométrique déployée par le chef pour disposer trois billes de carotte et une émulsion invisible dans une assiette de cinquante centimètres. C'est d'une audace conceptuelle inouïe... surtout pour le porte-monnaie, qui se trouve allégé avec une ponctualité tout à fait remarquable. »",
    audioEn: "\"One can only admire the geometric virtuosity demonstrated by the chef in arranging three carrot spheres and an invisible foam across a fifty-centimeter plate. It is an extraordinary conceptual daring... especially for one's wallet, which is emptied with truly remarkable punctuality.\"",
    questionFr: "Quel sentiment le locuteur exprime-t-il réellement à travers cette déclaration ?",
    questionEn: "What underlying sentiment does the speaker truly convey through this statement?",
    optionsFr: [
      "Une ironie acerbe fustigeant des portions dérisoires facturées à un tarif exorbitant",
      "Un hommage ému et sincère saluant le génie culinaire avant-gardiste d'un jeune chef",
      "Une réclamation juridique formelle contestant le non-respect des normes sanitaires",
      "Un enthousiasme débordant incitant les auditeurs à réserver immédiatement une table"
    ],
    optionsEn: [
      "A biting irony excoriating meager portions billed at an exorbitant price",
      "A heartfelt and sincere tribute saluting the avant-garde culinary genius of a young chef",
      "A formal legal complaint disputing failure to comply with restaurant sanitary codes",
      "An overflowing enthusiasm encouraging listeners to book a table immediately"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q36",
    paperNumber: 2,
    questionNumber: 36,
    typology: "ACTES_DE_PAROLE",
    level: "C1",
    title: "Acte de parole — Délibération technique / Réserve conditionnelle",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'ingénieur en chef"],
    speakerPersonas: [{ role: "Ingénieur en chef", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "« L'architecture logicielle proposée répond incontestablement à nos exigences de montée en charge sur banc d'essai. Pour autant, subordonner l'homologation définitive à cette seule batterie de tests en milieu clos me semblerait faire preuve d'un optimisme que nos obligations de sûreté nucléaire nous interdisent formellement. »",
    audioEn: "\"The proposed software architecture undoubtedly satisfies our load-scaling requirements on the test bench. Nonetheless, subordinating final safety certification strictly to this isolated lab battery would, in my view, display an optimism that our nuclear safety obligations strictly prohibit.\"",
    questionFr: "Quelle est l'intention communicative de l'ingénieur ?",
    questionEn: "What is the engineer's communicative intent?",
    optionsFr: [
      "Valider sans condition le déploiement opérationnel immédiat du système informatique",
      "Exiger la démission sur-le-champ de l'équipe responsable des bancs d'essai de laboratoire",
      "Formuler une réserve circonspecte exigeant des garanties supplémentaires avant certification",
      "Dénoncer un sabotage industriel perpétré par des agents infiltrés concurrents"
    ],
    optionsEn: [
      "Unconditionally approve the immediate live operational deployment of the IT software suite",
      "Demand the immediate dismissal of the engineering team in charge of lab test benches",
      "Formulate a prudent, conditional reserve requiring additional safeguards prior to certification",
      "Denounce an act of industrial sabotage carried out by undercover competing corporate agents"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q37",
    paperNumber: 2,
    questionNumber: 37,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Négociation institutionnelle / Refus diplomatique",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le représentant du bailleur de fonds"],
    speakerPersonas: [{ role: "Représentant institutionnel", gender: "female", voiceId: "fr-CA-SylvieNeural" }],
    audioFr: "« Votre dossier témoigne d'une ambition prospective que notre comité d'investissement a examinée avec la plus grande bienveillance. Néanmoins, eu égard aux réajustements structurels de notre portefeuille d'engagements pour l'exercice biennal en cours, nous nous voyons contraints de surseoir à tout cofinancement direct pour cette phase d'amorçage. »",
    audioEn: "\"Your proposal demonstrates a forward-looking ambition that our investment committee reviewed with utmost benevolence. Nevertheless, having regard to structural adjustments in our commitment portfolio for the current biennial cycle, we find ourselves constrained to defer any direct co-financing for this seed stage.\"",
    questionFr: "Quelle décision est dissimulée sous cette formule protocolaire ?",
    questionEn: "What decision is concealed beneath this protocol formulation?",
    optionsFr: [
      "Une fin de non-recevoir diplomatique rejetant la demande de subvention financière",
      "Une confirmation formelle d'octroi immédiat de tous les crédits budgétaires sollicités",
      "Une injonction pénale exigeant la restitution immédiate de fonds publics détournés",
      "Une proposition d'embauche immédiate du porteur de projet au sein du comité de direction"
    ],
    optionsEn: [
      "A diplomatic, polite rejection turning down the financial grant application",
      "A formal confirmation of immediate disbursement for all requested budget appropriations",
      "A criminal court injunction demanding the instant repayment of misappropriated public grants",
      "An executive job employment offer extended directly to the project lead within the board"
    ],
    correctIndex: 0, // Key A
  },
  {
    id: "tef-p2-co-q38",
    paperNumber: 2,
    questionNumber: 38,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Conseil d'administration / Feinte concession",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Un administrateur principal"],
    speakerPersonas: [{ role: "Administrateur principal", gender: "male", voiceId: "fr-FR-HenriNeural" }],
    audioFr: "« Je reconnais volontiers que la rationalisation des coûts logistiques défendue par notre directeur général présente une élégance comptable séduisante sur le papier. Reste que détruire le tiers de notre réseau de distribution de proximité pour économiser quelques centimes par colis revient à scier méthodiquement la branche sur laquelle repose toute notre rentabilité historique. »",
    audioEn: "\"I readily concede that the streamlining of logistics costs championed by our chief executive offers seductive accounting elegance on paper. The fact remains that gutting one third of our local brick-and-mortar distribution network to shave a few pennies off per parcel amounts to methodically sawing off the branch upon which our historical profitability rests.\"",
    questionFr: "Quel est l'acte de parole accompli par l'administrateur ?",
    questionEn: "What speech act is performed by the board director?",
    optionsFr: [
      "Une capitulation inconditionnelle devant la vision managériale du directeur général",
      "Une demande expresse de mise en faillite immédiate de l'ensemble du groupe logistique",
      "Une feinte concession polie introduisant une opposition catégorique au plan de restructuration",
      "Une félicitation chaleureuse adressée aux équipes de distribution pour leurs résultats financiers"
    ],
    optionsEn: [
      "An unconditional surrender before the chief executive's managerial roadmap",
      "An express motion petitioning for the immediate corporate bankruptcy of the group",
      "A polite feigned concession introducing a categorical opposition to the restructuring plan",
      "A warm commendation addressed to delivery logistics staff celebrating their quarterly margins"
    ],
    correctIndex: 2, // Key C
  },
  {
    id: "tef-p2-co-q39",
    paperNumber: 2,
    questionNumber: 39,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Réunion juridique / Mise en garde déguisée",
    speakingRate: 1.07,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["L'avocate-conseil d'entreprise"],
    speakerPersonas: [{ role: "Avocate-conseil", gender: "female", voiceId: "fr-FR-VivienneMultilingualNeural" }],
    audioFr: "« La direction générale est évidemment souveraine pour décider du calendrier de commercialisation de notre nouvelle molécule thérapeutique. Je me permettrais toutefois de rappeler, à toutes fins utiles, que les tribunaux arbitraux européens ont coutume d'assortir les manquements au principe de précaution d'astreintes journalières dont nos capitaux propres ne se relèveraient sans doute pas. »",
    audioEn: "\"Executive leadership is naturally sovereign in deciding the marketing launch schedule for our new therapeutic molecule. I would, however, venture to recall, for all pertinent purposes, that European arbitral tribunals are accustomed to pairing breaches of the precautionary principle with daily penalty assessments from which our equity reserves would likely not recover.\"",
    questionFr: "Quelle intention sous-tend l'intervention de l'avocate ?",
    questionEn: "What intention underlies the corporate counsel's intervention?",
    optionsFr: [
      "Encourager un lancement commercial immédiat sans attendre les homologations cliniques",
      "Adresser une mise en garde sévère contre des risques contentieux aux conséquences fatales",
      "Résilier sur-le-champ son contrat de conseil juridique avec le laboratoire pharmaceutique",
      "Célébrer la victoire éclatante de l'entreprise devant les juridictions arbitrales européennes"
    ],
    optionsEn: [
      "Encourage an immediate commercial rollout without awaiting final clinical drug approvals",
      "Issue a stern, veiled warning against legal litigation risks carrying fatal solvency consequences",
      "Terminate her outside legal advisory retainer immediately with the pharmaceutical firm",
      "Celebrate the company's resounding court victory before European arbitration tribunals"
    ],
    correctIndex: 1, // Key B
  },
  {
    id: "tef-p2-co-q40",
    paperNumber: 2,
    questionNumber: 40,
    typology: "ACTES_DE_PAROLE",
    level: "C2",
    title: "Acte de parole — Débriefing de crise / Sarcasme mordant",
    speakingRate: 1.08,
    prepTimeSeconds: 10,
    answerTimeSeconds: 15,
    speakerCount: 1,
    speakers: ["Le directeur des opérations"],
    speakerPersonas: [{ role: "Directeur des opérations", gender: "male", voiceId: "fr-FR-AlainNeural" }],
    audioFr: "« Supprimer tous les contrôles qualité en bout de chaîne pour gagner deux jours sur les délais de livraison était, à n'en pas douter, un coup de maître stratégique. Les trois cent mille rappels de produits et la démission de nos trois plus gros clients internationaux viennent d'ailleurs d'en apporter la démonstration la plus éclatante. »",
    audioEn: "\"Scrapping all end-of-line quality controls to shave two days off dispatch timelines was, beyond any shadow of doubt, a strategic stroke of genius. The three hundred thousand product recalls and the resignation of our three largest global accounts have just provided the most dazzling proof of it.\"",
    questionFr: "Quelle tonalité et quel message le locuteur transmet-il ?",
    questionEn: "What tone and communicative message does the speaker convey?",
    optionsFr: [
      "Une fierté sincère face aux gains de productivité records réalisés par les équipes d'usine",
      "Une proposition technique visant à robotiser entièrement les chaînes de fabrication",
      "Une notification formelle de félicitations adressée aux ingénieurs qualité de l'entreprise",
      "Un sarcasme cinglant soulignant la débâcle provoquée par une décision managériale inconsidérée"
    ],
    optionsEn: [
      "A sincere pride in record manufacturing productivity margins achieved by plant crews",
      "A technical proposal aiming to automate factory assembly lines with industrial robotics",
      "A formal congratulatory notification presented to the firm's quality control engineers",
      "A scathing sarcasm spotlighting the disaster provoked by an ill-advised executive decision"
    ],
    correctIndex: 3, // Key D
  }
];
