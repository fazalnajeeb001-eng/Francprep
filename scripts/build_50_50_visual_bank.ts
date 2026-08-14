console.log("=== 🚀 DESIGNING AUTHENTIC 50/50 VISUAL BANK (Q1-Q4 ACROSS 10 PAPERS) ===");

export interface VisualQuestionItem {
  sceneIdx: number;
  paperNum: number;
  qNum: number;
  type: "SPEECH_ACT" | "SCENE_DESCRIPTION";
  theme: string;
  options: [string, string, string, string];
  optionsEnglish: [string, string, string, string];
  correctIndex: number;
}

export const MASTER_40_VISUAL_ITEMS: VisualQuestionItem[] = [
  // ==================== 📄 PAPER 1 ====================
  // P1 Q1 (Scene 0: Train Station Platform) - SPEECH ACT
  {
    sceneIdx: 0,
    paperNum: 1,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Gare ferroviaire (Quai)",
    options: [
      "Pardon monsieur, à quelle heure arrive le train sur ce quai ?",
      "L'addition s'il vous plaît, nous allons régler par carte bancaire.",
      "Où se trouvent les cabines d'essayage pour essayer ce pantalon ?",
      "Deux places pour la séance de vingt heures, s'il vous plaît."
    ],
    optionsEnglish: [
      "Excuse me sir, what time does the train arrive at this platform?",
      "The check please, we will pay by credit card.",
      "Where are the fitting rooms to try on these pants?",
      "Two tickets for the eight o'clock movie screening, please."
    ],
    correctIndex: 0
  },
  // P1 Q2 (Scene 1: Hotel Reception Desk) - SCENE DESCRIPTION
  {
    sceneIdx: 1,
    paperNum: 1,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Réception d'hôtel",
    options: [
      "Une personne commande un plat au restaurant.",
      "Un client s'adresse au réceptionniste à l'accueil de l'hôtel.",
      "Un passager monte dans un taxi devant la gare.",
      "Une femme achète un billet au guichet du cinéma."
    ],
    optionsEnglish: [
      "A person is ordering a dish at a restaurant.",
      "A guest is speaking with the receptionist at the hotel front desk.",
      "A passenger is getting into a taxi in front of the train station.",
      "A woman is buying a ticket at the cinema box office."
    ],
    correctIndex: 1
  },
  // P1 Q3 (Scene 2: Bakery Storefront) - SPEECH ACT
  {
    sceneIdx: 2,
    paperNum: 1,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Boulangerie",
    options: [
      "Faites le plein de carburant sans-plomb, s'il vous plaît.",
      "Ouvrez grand la bouche et respirez profondément.",
      "Bonjour, je voudrais une baguette tradition et deux croissants, s'il vous plaît.",
      "Pourriez-vous vérifier la pression des quatre pneus ?"
    ],
    optionsEnglish: [
      "Fill up the tank with unleaded fuel, please.",
      "Open your mouth wide and breathe deeply.",
      "Hello, I would like a traditional baguette and two croissants, please.",
      "Could you check the pressure in all four tires?"
    ],
    correctIndex: 2
  },
  // P1 Q4 (Scene 3: Airport Gate & Plane) - SCENE DESCRIPTION
  {
    sceneIdx: 3,
    paperNum: 1,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Salle d'embarquement aéroport",
    options: [
      "Les passagers s'installent dans une salle d'embarquement à l'aéroport.",
      "Des skieurs descendent une piste enneigée en montagne.",
      "Des étudiants travaillent au calme dans une bibliothèque.",
      "Un facteur dépose des lettres dans une boîte postale."
    ],
    optionsEnglish: [
      "Passengers are sitting in an airport departure boarding lounge.",
      "Skiers are heading down a snowy mountain ski slope.",
      "Students are working quietly inside a library.",
      "A mail carrier is placing letters into a mailbox."
    ],
    correctIndex: 0
  },

  // ==================== 📄 PAPER 2 ====================
  // P2 Q1 (Scene 4: Metro Ticket Machine) - SPEECH ACT
  {
    sceneIdx: 4,
    paperNum: 2,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Distributeur automatique métro",
    options: [
      "Une table pour deux personnes en terrasse, s'il vous plaît.",
      "Pour acheter un carnet de dix tickets, je sélectionne cette touche sur l'écran.",
      "Pourriez-vous me couper les cheveux un peu plus court sur les côtés ?",
      "Avez-vous ce modèle de veste en taille quarante ?"
    ],
    optionsEnglish: [
      "A table for two on the outdoor terrace, please.",
      "To buy a booklet of ten tickets, I select this button on the screen.",
      "Could you cut my hair a bit shorter on the sides?",
      "Do you have this jacket model in size forty?"
    ],
    correctIndex: 1
  },
  // P2 Q2 (Scene 5: Doctor Office) - SCENE DESCRIPTION
  {
    sceneIdx: 5,
    paperNum: 2,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Cabinet médical",
    options: [
      "Un client demande un renseignement dans une agence bancaire.",
      "Un peintre réalise une toile dans son atelier.",
      "Un patient est en consultation médicale chez le médecin.",
      "Un cuisinier prépare un repas dans une cuisine de restaurant."
    ],
    optionsEnglish: [
      "A customer is asking for information at a bank branch.",
      "A painter is creating a canvas in an art studio.",
      "A patient is in a medical consultation with the doctor.",
      "A chef is preparing a meal inside a restaurant kitchen."
    ],
    correctIndex: 2
  },
  // P2 Q3 (Scene 6: Outdoor Terrace Cafe) - SPEECH ACT
  {
    sceneIdx: 6,
    paperNum: 2,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Terrasse de café",
    options: [
      "Garçon, nous prendrons deux cafés crème et un verre d'eau, s'il vous plaît.",
      "À quelle porte d'embarquement part le vol vers Montréal ?",
      "Je souhaite envoyer ce colis volumineux en recommandé.",
      "Pourriez-vous faire la vidange d'huile de mon moteur ?"
    ],
    optionsEnglish: [
      "Waiter, we will have two white coffees and a glass of water, please.",
      "Which boarding gate does the flight to Montreal depart from?",
      "I would like to send this large parcel by registered mail.",
      "Could you perform an oil change on my engine?"
    ],
    correctIndex: 0
  },
  // P2 Q4 (Scene 7: Bus Stop & Street) - SCENE DESCRIPTION
  {
    sceneIdx: 7,
    paperNum: 2,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Arrêt de bus urbain",
    options: [
      "Des randonneurs marchent le long d'un sentier forestier.",
      "Des usagers attendent l'arrivée du bus à un arrêt en ville.",
      "Un homme répare la roue de son vélo sur le trottoir.",
      "Des clients font la queue devant l'entrée d'un théâtre."
    ],
    optionsEnglish: [
      "Hikers are walking along a forest nature trail.",
      "Commuters are waiting for the bus arrival at an urban bus stop.",
      "A man is repairing his bicycle wheel on the sidewalk.",
      "Customers are standing in line in front of a theater entrance."
    ],
    correctIndex: 1
  },

  // ==================== 📄 PAPER 3 ====================
  // P3 Q1 (Scene 8: Supermarket Grocery Aisle) - SPEECH ACT
  {
    sceneIdx: 8,
    paperNum: 3,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Rayon fruits et légumes supermarché",
    options: [
      "Votre passeport et carte d'embarquement, s'il vous plaît.",
      "Combien coûte le kilo de ces pommes rouges bio ?",
      "Votre chambre se trouve au troisième étage avec ascenseur.",
      "Prenez ce médicament trois fois par jour avant chaque repas."
    ],
    optionsEnglish: [
      "Your passport and boarding pass, please.",
      "How much does a kilogram of these organic red apples cost?",
      "Your room is on the third floor with elevator access.",
      "Take this medication three times a day before each meal."
    ],
    correctIndex: 1
  },
  // P3 Q2 (Scene 9: Library Reading Room) - SCENE DESCRIPTION
  {
    sceneIdx: 9,
    paperNum: 3,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Bibliothèque",
    options: [
      "Un agent de police régule la circulation à un carrefour.",
      "Des personnes lisent et étudient silencieusement dans une bibliothèque.",
      "Un livreur dépose des cartons volumineux à un domicile.",
      "Des musiciens jouent d'un instrument lors d'un concert."
    ],
    optionsEnglish: [
      "A police officer is directing traffic at an intersection.",
      "People are quietly reading and studying in a library.",
      "A delivery driver is dropping off large boxes at a residence.",
      "Musicians are playing instruments during a concert."
    ],
    correctIndex: 1
  },
  // P3 Q3 (Scene 10: Car Repair Garage) - SPEECH ACT
  {
    sceneIdx: 10,
    paperNum: 3,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Garage automobile",
    options: [
      "Il y a un bruit anormal sous le capot, pouvez-vous inspecter le moteur ?",
      "Je voudrais réserver une table près de la fenêtre pour ce soir.",
      "Avez-vous une boîte de pansements et du désinfectant ?",
      "Ce livre est emprunté pour une durée de trois semaines."
    ],
    optionsEnglish: [
      "There is an unusual noise under the hood, can you inspect the engine?",
      "I would like to reserve a table near the window for this evening.",
      "Do you have a box of bandages and antiseptic disinfectant?",
      "This book is borrowed for a period of three weeks."
    ],
    correctIndex: 0
  },
  // P3 Q4 (Scene 11: Pharmacy Counter) - SCENE DESCRIPTION
  {
    sceneIdx: 11,
    paperNum: 3,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Pharmacie",
    options: [
      "Un boulanger enfourne des baguettes dans le four.",
      "Une cliente achète des médicaments au comptoir d'une pharmacie.",
      "Un photographe réalise un portrait dans son studio.",
      "Des athlètes courent sur une piste d'athlétisme."
    ],
    optionsEnglish: [
      "A baker is putting baguettes into the bread oven.",
      "A customer is buying medicine at a pharmacy counter.",
      "A photographer is taking a portrait in an art studio.",
      "Athletes are running on an athletic track."
    ],
    correctIndex: 1
  },

  // ==================== 📄 PAPER 4 ====================
  // P4 Q1 (Scene 12: Post Office Counter) - SPEECH ACT
  {
    sceneIdx: 12,
    paperNum: 4,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Bureau de poste",
    options: [
      "Je voudrais peser ce paquet et l'envoyer en courrier recommandé international.",
      "Pourriez-vous nous apporter la carte des desserts ?",
      "Je viens pour ma consultation médicale de quatorze heures.",
      "Un aller simple pour Marseille en seconde classe, s'il vous plaît."
    ],
    optionsEnglish: [
      "I would like to weigh this parcel and send it by international registered mail.",
      "Could you bring us the dessert menu?",
      "I am here for my two o'clock medical appointment.",
      "A one-way second-class ticket to Marseille, please."
    ],
    correctIndex: 0
  },
  // P4 Q2 (Scene 13: Clothing Store) - SCENE DESCRIPTION
  {
    sceneIdx: 13,
    paperNum: 4,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Magasin de vêtements",
    options: [
      "Un serveur prend la commande d'une table en terrasse.",
      "Un mécanicien change les pneus d'un véhicule.",
      "Une cliente essaie un manteau devant un miroir dans un magasin de vêtements.",
      "Un enseignant donne un cours magistral devant un tableau."
    ],
    optionsEnglish: [
      "A waiter is taking an order from an outdoor terrace table.",
      "A mechanic is changing tires on a vehicle.",
      "A customer is trying on a coat in front of a mirror in a clothing store.",
      "A teacher is giving a lecture in front of a board."
    ],
    correctIndex: 2
  },
  // P4 Q3 (Scene 14: Train Dining Car) - SPEECH ACT
  {
    sceneIdx: 14,
    paperNum: 4,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Wagon-restaurant TGV",
    options: [
      "Bonjour, un sandwich au fromage et une bouteille d'eau gazeuse, s'il vous plaît.",
      "Vos bagages dépassent la limite de vingt-trois kilos autorisée.",
      "Veuillez présenter votre carte d'identité pour retirer ce colis.",
      "Je cherche le rayon des ustensiles de cuisine."
    ],
    optionsEnglish: [
      "Hello, a cheese sandwich and a bottle of sparkling water, please.",
      "Your luggage exceeds the twenty-three kilogram baggage allowance.",
      "Please present your identity card to collect this parcel.",
      "I am looking for the kitchenware department."
    ],
    correctIndex: 0
  },
  // P4 Q4 (Scene 15: Airport Baggage Claim) - SCENE DESCRIPTION
  {
    sceneIdx: 15,
    paperNum: 4,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Tapis à bagages aéroport",
    options: [
      "Des pompiers interviennent sur un lieu d'accident.",
      "Des voyageurs récupèrent leurs valises sur le tapis roulant de l'aéroport.",
      "Un jardinier plante des arbustes dans un parc.",
      "Un guide touristique présente l'histoire d'un monument."
    ],
    optionsEnglish: [
      "Firefighters are responding to an accident scene.",
      "Travelers are picking up their suitcases from the airport baggage carousel.",
      "A gardener is planting shrubs in a park.",
      "A tour guide is presenting the history of a monument."
    ],
    correctIndex: 1
  },

  // ==================== 📄 PAPER 5 ====================
  // P5 Q1 (Scene 16: Hair Salon) - SPEECH ACT
  {
    sceneIdx: 16,
    paperNum: 5,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Salon de coiffure",
    options: [
      "Je voudrais juste rafraîchir la coupe et désépaissir les pointes.",
      "Le plein de carburant et vérification du niveau d'huile, s'il vous plaît.",
      "À quelle heure ferme le guichet de retrait des billets ?",
      "Avez-vous des comprimés contre le mal de tête ?"
    ],
    optionsEnglish: [
      "I would just like a trim and to thin out the ends.",
      "A full tank of fuel and oil level check, please.",
      "What time does the ticket pickup counter close?",
      "Do you have tablets for a headache?"
    ],
    correctIndex: 0
  },
  // P5 Q2 (Scene 17: Gas Station) - SCENE DESCRIPTION
  {
    sceneIdx: 17,
    paperNum: 5,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Station-service",
    options: [
      "Un automobiliste fait le plein de carburant à une station-service.",
      "Un serveur apporte des consommations dans un salon de thé.",
      "Des randonneurs grimpent le long d'un sentier escarpé.",
      "Un horloger répare le mécanisme d'une pendule ancienne."
    ],
    optionsEnglish: [
      "A driver is refueling their car at a gas service station.",
      "A waiter is serving beverages inside a tea salon.",
      "Hikers are climbing along a steep mountain path.",
      "A watchmaker is repairing the mechanism of an antique clock."
    ],
    correctIndex: 0
  },
  // P5 Q3 (Scene 18: Public Park Bench) - SPEECH ACT
  {
    sceneIdx: 18,
    paperNum: 5,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Banc de parc public",
    options: [
      "Vos billets de train et pièces d'identité, s'il vous plaît.",
      "Il fait un temps magnifique aujourd'hui, asseyons-nous quelques minutes au soleil.",
      "Voici l'ordonnance pour vos médicaments à prendre matin et soir.",
      "Le tarif est de quinze euros de l'heure pour cette prestation."
    ],
    optionsEnglish: [
      "Your train tickets and identity documents, please.",
      "The weather is beautiful today, let's sit for a few minutes in the sunshine.",
      "Here is the medical prescription for your medication to take morning and evening.",
      "The rate is fifteen euros per hour for this service."
    ],
    correctIndex: 1
  },
  // P5 Q4 (Scene 19: Bank Teller Counter) - SCENE DESCRIPTION
  {
    sceneIdx: 19,
    paperNum: 5,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Guichet bancaire",
    options: [
      "Un maçon bâtit un mur avec des briques.",
      "Un client effectue une opération bancaire au guichet d'une banque.",
      "Un marin arrime son navire au quai d'un port.",
      "Un photographe effectue des retouches d'images dans son studio."
    ],
    optionsEnglish: [
      "A bricklayer is building a wall with bricks.",
      "A customer is completing a banking transaction at a bank counter.",
      "A sailor is securing a ship to a port dock.",
      "A photographer is retouching photos in a studio."
    ],
    correctIndex: 1
  },

  // ==================== 📄 PAPER 6 ====================
  // P6 Q1 (Scene 20: Florist Shop) - SPEECH ACT
  {
    sceneIdx: 20,
    paperNum: 6,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Fleuriste",
    options: [
      "Pourriez-vous me composer un beau bouquet de roses et de lys pour un anniversaire ?",
      "Je cherche une paire de baskets de course en pointure quarante-deux.",
      "Pouvez-vous me réparer cette serrure de porte d'entrée ?",
      "Deux billets aller-retour pour la gare centrale, s'il vous plaît."
    ],
    optionsEnglish: [
      "Could you arrange a beautiful bouquet of roses and lilies for a birthday?",
      "I am looking for a pair of running sneakers in size forty-two.",
      "Can you repair this front door lock for me?",
      "Two round-trip tickets to the central station, please."
    ],
    correctIndex: 0
  },
  // P6 Q2 (Scene 21: Shoe Store) - SCENE DESCRIPTION
  {
    sceneIdx: 21,
    paperNum: 6,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Magasin de chaussures",
    options: [
      "Un serveur verse une boisson dans un verre.",
      "Un client essaie une paire de chaussures assis dans un magasin.",
      "Un électricien installe des câbles dans un logement.",
      "Un pêcheur prépare ses filets sur une barque."
    ],
    optionsEnglish: [
      "A server is pouring a drink into a glass.",
      "A customer is trying on a pair of shoes while seated in a store.",
      "An electrician is installing cables inside a home.",
      "A fisherman is preparing nets on a small boat."
    ],
    correctIndex: 1
  },
  // P6 Q3 (Scene 22: Gym Sports Center) - SPEECH ACT
  {
    sceneIdx: 22,
    paperNum: 6,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Salle de sport",
    options: [
      "Je termine ma série d'exercices sur ce tapis de course et je vous laisse la place.",
      "Deux menus du jour avec entrée et plat principal, s'il vous plaît.",
      "Votre compte bancaire présente un solde créditeur positif.",
      "Veuillez composter votre titre de transport avant de monter à bord."
    ],
    optionsEnglish: [
      "I am finishing my workout set on this treadmill and will let you have the spot.",
      "Two daily set menus with appetizer and main course, please.",
      "Your bank account shows a positive credit balance.",
      "Please validate your transit ticket before boarding."
    ],
    correctIndex: 0
  },
  // P6 Q4 (Scene 23: Cinema Ticket Booth) - SCENE DESCRIPTION
  {
    sceneIdx: 23,
    paperNum: 6,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Guichet de cinéma",
    options: [
      "Un livreur transporte un paquet dans les escaliers.",
      "Un serveur prépare des boissons derrière un bar.",
      "Des spectateurs achètent leurs places au guichet d'un cinéma.",
      "Un artisan pétrit de la pâte dans son atelier."
    ],
    optionsEnglish: [
      "A delivery worker is carrying a parcel up the stairs.",
      "A server is making drinks behind a bar counter.",
      "Spectators are purchasing movie tickets at a cinema box office.",
      "A craftsman is kneading dough in a workshop."
    ],
    correctIndex: 2
  },

  // ==================== 📄 PAPER 7 ====================
  // P7 Q1 (Scene 24: Taxi Stand) - SPEECH ACT
  {
    sceneIdx: 24,
    paperNum: 7,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Station de taxi urbaine",
    options: [
      "Bonjour chauffeur, pouvez-vous m'emmener à l'aéroport international, s'il vous plaît ?",
      "Je prends rendez-vous pour un contrôle dentaire mardi matin.",
      "Pourriez-vous me montrer les montures de lunettes en vitrine ?",
      "Je souhaite réserver une table pour quatre personnes ce soir."
    ],
    optionsEnglish: [
      "Hello driver, could you take me to the international airport, please?",
      "I am making an appointment for a dental check-up on Tuesday morning.",
      "Could you show me the spectacle frames in the display window?",
      "I would like to book a table for four people tonight."
    ],
    correctIndex: 0
  },
  // P7 Q2 (Scene 25: Bookstore) - SCENE DESCRIPTION
  {
    sceneIdx: 25,
    paperNum: 7,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Librairie",
    options: [
      "Un sauveteur surveille l'océan depuis son poste de garde.",
      "Un client feuillette des livres devant les étagères d'une librairie.",
      "Un garagiste vérifie le système de freinage d'un scooter.",
      "Un chauffeur charge des bagages dans le coffre d'un véhicule."
    ],
    optionsEnglish: [
      "A lifeguard is watching the ocean from a lifeguard station.",
      "A customer is browsing books in front of bookstore shelves.",
      "A mechanic is checking the braking system of a scooter.",
      "A driver is loading luggage into the trunk of a vehicle."
    ],
    correctIndex: 1
  },
  // P7 Q3 (Scene 26: Optician Shop) - SPEECH ACT
  {
    sceneIdx: 26,
    paperNum: 7,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Magasin d'optique",
    options: [
      "Puis-je essayer cette monture noire devant le miroir pour voir si elle me va bien ?",
      "Deux boules de glace chocolat et pistache dans un cornet, s'il vous plaît.",
      "Pouvez-vous peser ce paquet et y coller un timbre prioritaire ?",
      "Quel est le prix au kilo de ces bananes mûres ?"
    ],
    optionsEnglish: [
      "May I try on these black frames in front of the mirror to see if they suit me?",
      "Two scoops of chocolate and pistachio ice cream in a cone, please.",
      "Can you weigh this package and affix a priority stamp?",
      "What is the price per kilogram for these ripe bananas?"
    ],
    correctIndex: 0
  },
  // P7 Q4 (Scene 27: Museum Art Gallery) - SCENE DESCRIPTION
  {
    sceneIdx: 27,
    paperNum: 7,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Galerie de musée d'art",
    options: [
      "Un cuisinier prépare des entrées froides en cuisine.",
      "Un agriculteur récolte des légumes dans un champ.",
      "Un coiffeur applique un soin capillaire sur cheveux mouillés.",
      "Des visiteurs contemplent des tableaux exposés sur les murs d'un musée."
    ],
    optionsEnglish: [
      "A chef is preparing cold appetizers in the kitchen.",
      "A farmer is harvesting vegetables in a field.",
      "A hairdresser is applying a hair treatment to wet hair.",
      "Visitors are admiring paintings displayed on museum gallery walls."
    ],
    correctIndex: 3
  },

  // ==================== 📄 PAPER 8 ====================
  // P8 Q1 (Scene 28: Ice Cream Stand) - SPEECH ACT
  {
    sceneIdx: 28,
    paperNum: 8,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Kiosque marchand de glaces",
    options: [
      "Une glace deux boules vanille et fraise avec un peu de chantilly, s'il vous plaît.",
      "À quelle voie part le train rapide pour Strasbourg ?",
      "Combien de temps dure le cycle de lavage à soixante degrés ?",
      "Je voudrais acheter une boîte d'outils de bricolage."
    ],
    optionsEnglish: [
      "A two-scoop vanilla and strawberry ice cream with whipped cream, please.",
      "Which track does the high-speed train to Strasbourg leave from?",
      "How long does the sixty-degree laundry wash cycle take?",
      "I would like to buy a DIY home tool box."
    ],
    correctIndex: 0
  },
  // P8 Q2 (Scene 29: Outdoor Fruit Market) - SCENE DESCRIPTION
  {
    sceneIdx: 29,
    paperNum: 8,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Marché de primeurs en plein air",
    options: [
      "Un plongeur explore la faune marine sous l'eau.",
      "Des passants achètent des fruits et légumes frais sur un marché de rue.",
      "Un réparateur ajuste les freins d'une bicyclette.",
      "Un réceptionniste accueille des congressistes dans un hall d'hôtel."
    ],
    optionsEnglish: [
      "A scuba diver is exploring underwater marine life.",
      "Passersby are buying fresh fruits and vegetables at an open-air street market.",
      "A bicycle repair technician is adjusting bicycle brakes.",
      "A hotel receptionist is welcoming conference attendees in a hotel lobby."
    ],
    correctIndex: 1
  },
  // P8 Q3 (Scene 30: Train Ticket Info Counter) - SPEECH ACT
  {
    sceneIdx: 30,
    paperNum: 8,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Comptoir information gare",
    options: [
      "Bonjour madame, pouvez-vous m'indiquer le quai de correspondance pour le prochain train ?",
      "Apportez-moi un café serré et l'addition, s'il vous plaît.",
      "Je voudrais essayer ce collier en or exposé dans la vitrine.",
      "À quelle heure commence la séance de cinéma ?"
    ],
    optionsEnglish: [
      "Hello madam, could you tell me the connecting platform for the next train?",
      "Please bring me a strong espresso coffee and the bill.",
      "I would like to try on this gold necklace displayed in the glass cabinet.",
      "What time does the movie screening begin?"
    ],
    correctIndex: 0
  },
  // P8 Q4 (Scene 31: Laundromat Dry Cleaner) - SCENE DESCRIPTION
  {
    sceneIdx: 31,
    paperNum: 8,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Laverie automatique",
    options: [
      "Un journaliste pose des questions à un passant dans la rue.",
      "Une cliente charge du linge dans une machine à laver automatique.",
      "Un mécanicien vérifie le niveau d'huile d'une voiture.",
      "Un pâtissier étale de la pâte sur un plan de travail."
    ],
    optionsEnglish: [
      "A journalist is asking questions to a pedestrian on the street.",
      "A customer is loading laundry into an automatic washing machine.",
      "A mechanic is checking engine oil level in a car.",
      "A pastry chef is rolling out dough on a work counter."
    ],
    correctIndex: 1
  },

  // ==================== 📄 PAPER 9 ====================
  // P9 Q1 (Scene 32: Jewelry Store) - SPEECH ACT
  {
    sceneIdx: 32,
    paperNum: 9,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Bijouterie",
    options: [
      "Pourriez-vous me montrer cette montre argentée exposée dans la vitrine ?",
      "Un sandwich baguette au thon et crudités, s'il vous plaît.",
      "Combien coûte ce marteau et ce jeu de tournevis ?",
      "Quelle est la météo sur les pistes de ski ce matin ?"
    ],
    optionsEnglish: [
      "Could you show me this silver watch displayed inside the glass case?",
      "A tuna and vegetable baguette sandwich, please.",
      "How much does this claw hammer and screwdriver set cost?",
      "What is the weather forecast on the ski slopes this morning?"
    ],
    correctIndex: 0
  },
  // P9 Q2 (Scene 33: Fast Food Cafeteria Counter) - SCENE DESCRIPTION
  {
    sceneIdx: 33,
    paperNum: 9,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Comptoir cafétéria",
    options: [
      "Un déménageur monte un canapé lourd dans les escaliers.",
      "Un jardinier arrose des plantes dans une serre tropicale.",
      "Un employé prépare un sandwich frais derrière le comptoir d'une cafétéria.",
      "Un maître d'hôtel guide des convives vers leur table réservée."
    ],
    optionsEnglish: [
      "A mover is carrying a heavy sofa up the staircase.",
      "A gardener is watering plants inside a tropical greenhouse.",
      "An employee is preparing a fresh sandwich behind a cafeteria counter.",
      "A head waiter is guiding dinner guests to their reserved table."
    ],
    correctIndex: 2
  },
  // P9 Q3 (Scene 34: Hardware Store Tools) - SPEECH ACT
  {
    sceneIdx: 34,
    paperNum: 9,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Magasin de bricolage",
    options: [
      "Je cherche une boîte de vis et des chevilles adaptées pour fixer une étagère au mur.",
      "Je voudrais prendre un forfait de ski pour la journée.",
      "Combien de temps faut-il pour faire vacciner mon chat ?",
      "Puis-je essayer cette guitare classique dans la cabine insonorisée ?"
    ],
    optionsEnglish: [
      "I am looking for a box of screws and wall anchors to mount a shelf on the wall.",
      "I would like to buy a one-day ski lift pass.",
      "How long does it take to get my cat vaccinated?",
      "May I try this classical guitar in the soundproof testing room?"
    ],
    correctIndex: 0
  },
  // P9 Q4 (Scene 35: Ski Resort Snow Station) - SCENE DESCRIPTION
  {
    sceneIdx: 35,
    paperNum: 9,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Station de ski alpine",
    options: [
      "Un vendeur de journaux sert des clients dans un kiosque de presse.",
      "Un agent technique répare un réverbère dans la rue.",
      "Des skieurs en tenue d'hiver ajustent leur matériel au bas des pistes.",
      "Un serveur apporte un plateau de boissons chaudes dans un refuge."
    ],
    optionsEnglish: [
      "A newsagent is serving customers at a press kiosk.",
      "A maintenance technician is repairing a street lamppost.",
      "Skiers in winter gear are adjusting their equipment at the base of the slopes.",
      "A waiter is carrying a tray of hot drinks inside a mountain chalet."
    ],
    correctIndex: 2
  },

  // ==================== 📄 PAPER 10 ====================
  // P10 Q1 (Scene 36: University Lecture Hall) - SPEECH ACT
  {
    sceneIdx: 36,
    paperNum: 10,
    qNum: 1,
    type: "SPEECH_ACT",
    theme: "Amphithéâtre universitaire",
    options: [
      "Excusez-moi professeur, pourriez-vous réexpliquer la formule écrite au tableau ?",
      "Mon chat ne mange plus depuis deux jours, pouvez-vous l'examiner ?",
      "Je voudrais acheter un jeu de cordes pour guitare acoustique.",
      "Il me faut de la monnaie pour payer l'horodateur de stationnement."
    ],
    optionsEnglish: [
      "Excuse me professor, could you please re-explain the formula written on the board?",
      "My cat hasn't eaten for two days, can you examine him?",
      "I would like to buy a set of acoustic guitar strings.",
      "I need some coins to pay for the parking meter."
    ],
    correctIndex: 0
  },
  // P10 Q2 (Scene 37: Pet Clinic Vet Office) - SCENE DESCRIPTION
  {
    sceneIdx: 37,
    paperNum: 10,
    qNum: 2,
    type: "SCENE_DESCRIPTION",
    theme: "Clinique vétérinaire",
    options: [
      "Un vétérinaire en blouse ausculte un chat posé sur une table de consultation.",
      "Un coiffeur rase la barbe d'un client au coupe-choux.",
      "Un automobiliste règle son péage à une barrière d'autoroute.",
      "Un mécanicien remplace une roue crevée sur un utilitaire."
    ],
    optionsEnglish: [
      "A veterinarian in a white coat is examining a cat on an examination table.",
      "A barber is shaving a customer's beard with a straight razor.",
      "A driver is paying toll at a highway toll booth.",
      "A mechanic is replacing a flat tire on a van."
    ],
    correctIndex: 0
  },
  // P10 Q3 (Scene 38: Music Store Guitars) - SPEECH ACT
  {
    sceneIdx: 38,
    paperNum: 10,
    qNum: 3,
    type: "SPEECH_ACT",
    theme: "Magasin de musique",
    options: [
      "Puis-je accorder cette guitare acoustique et la tester quelques minutes ?",
      "Un ticket de stationnement pour deux heures dans cette zone, s'il vous plaît.",
      "Avez-vous des manuels d'histoire pour les cours universitaires ?",
      "Ce médicament pour animal est-il délivré sans ordonnance ?"
    ],
    optionsEnglish: [
      "May I tune this acoustic guitar and test it out for a few minutes?",
      "A two-hour parking ticket for this street zone, please.",
      "Do you have history textbooks for university courses?",
      "Is this pet medication available without a prescription?"
    ],
    correctIndex: 0
  },
  // P10 Q4 (Scene 39: Parking Meter Street) - SCENE DESCRIPTION
  {
    sceneIdx: 39,
    paperNum: 10,
    qNum: 4,
    type: "SCENE_DESCRIPTION",
    theme: "Horodateur de rue",
    options: [
      "Un cuisinier fait griller des aliments sur une plaque chauffante.",
      "Un automobiliste insère de la monnaie dans un horodateur sur le trottoir.",
      "Un marin décharge des caisses de poissons d'un chalutier.",
      "Un serveur nettoie les verres au bar d'un bistrot."
    ],
    optionsEnglish: [
      "A cook is grilling food on a hot griddle plate.",
      "A motorist is inserting coins into a sidewalk parking meter.",
      "A fisherman is unloading crates of fish from a trawler.",
      "A server is wiping glasses at a bistro bar."
    ],
    correctIndex: 1
  }
];

console.log(`✅ Successfully defined 40 items with 50/50 balance (20 Speech Acts + 20 Scene Descriptions)!`);
