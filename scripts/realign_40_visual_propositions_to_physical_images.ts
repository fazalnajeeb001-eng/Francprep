import * as fs from "fs";

console.log("=== 🔬 REALIGNING ALL 40 VISUAL PROPOSITIONS TO PHYSICAL IMAGES ===");

// We define all 40 scenes mapped directly to the actual image file:
// Format Rule:
// Q1 & Q3: Direct Speech Act (1st/2nd Person)
// Q2 & Q4: Scene Action Description (3rd Person)

export const ALIGNED_40_SCENES = [
  // ==================== 📄 PAPER 1 ====================
  // P1Q1: tcf_p1_q1.png (Gare ferroviaire - Quai) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 0,
    paper: 1,
    qNum: 1,
    imgKey: "tcf_p1_q1",
    type: "SPEECH_ACT",
    situation: "Train Station Platform",
    opt: [
      "Pardon monsieur, à quelle heure arrive le train sur ce quai ?",
      "L'addition s'il vous plaît, nous allons régler par carte bancaire.",
      "Où se trouvent les cabines d'essayage pour essayer ce pantalon ?",
      "Deux places pour la séance de vingt heures, s'il vous plaît."
    ],
    optEn: [
      "Excuse me sir, what time does the train arrive at this platform?",
      "The check please, we will pay by credit card.",
      "Where are the fitting rooms to try on these pants?",
      "Two tickets for the eight o'clock movie screening, please."
    ],
    ans: 0
  },
  // P1Q2: tcf_p1_q2.png (Boulangerie - Vente de pain) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 1,
    paper: 1,
    qNum: 2,
    imgKey: "tcf_p1_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Bakery Storefront",
    opt: [
      "Un mécanicien répare une voiture dans un garage.",
      "Un client achète du pain et des croissants dans une boulangerie.",
      "Des passagers montent à bord d'un avion sur la piste.",
      "Une femme fait du sport sur un tapis de course."
    ],
    optEn: [
      "A mechanic is repairing a car inside a garage.",
      "A customer is buying bread and croissants in a bakery.",
      "Passengers are boarding an airplane on the tarmac.",
      "A woman is exercising on a treadmill."
    ],
    ans: 1
  },
  // P1Q3: tcf_p1_q3.png (Aéroport - Salle d'embarquement / avion) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 2,
    paper: 1,
    qNum: 3,
    imgKey: "tcf_p1_q3",
    type: "SPEECH_ACT",
    situation: "Airport Boarding Lounge",
    opt: [
      "Avez-vous une table libre pour quatre personnes en terrasse ?",
      "Pourriez-vous me prescrire un sirop pour la toux ?",
      "Mon vol pour Montréal est-il bien prévu à l'heure à cette porte d'embarquement ?",
      "Je cherche le rayon des produits laitiers et des œufs frais."
    ],
    optEn: [
      "Do you have an available table for four people on the terrace?",
      "Could you prescribe me a cough syrup?",
      "Is my flight to Montreal scheduled on time at this boarding gate?",
      "I am looking for the dairy products and fresh eggs aisle."
    ],
    ans: 2
  },
  // P1Q4: tcf_p1_q4.png (Cabinet médical - Médecin et patiente) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 3,
    paper: 1,
    qNum: 4,
    imgKey: "tcf_p1_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Doctor Medical Consultation",
    opt: [
      "Un médecin écoute et conseille une patiente assise dans son cabinet de consultation.",
      "Un serveur prend la commande de clients au restaurant.",
      "Un facteur dépose une lettre dans une boîte postale.",
      "Des musiciens répètent un morceau dans une salle de concert."
    ],
    optEn: [
      "A doctor is listening to and advising a patient seated in his consultation office.",
      "A waiter is taking customer orders at a restaurant.",
      "A mail carrier is dropping a letter into a mailbox.",
      "Musicians are rehearsing a piece in a concert hall."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 2 ====================
  // P2Q1: tcf_p2_q1.png (Supermarché - Caisse) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 4,
    paper: 2,
    qNum: 1,
    imgKey: "tcf_p2_q1",
    type: "SPEECH_ACT",
    situation: "Supermarket Checkout Counter",
    opt: [
      "Bonjour, je vais régler mes courses par carte bancaire sans contact, s'il vous plaît.",
      "Où se trouve le quai pour prendre le train vers Québec ?",
      "Pourriez-vous me couper les cheveux un peu plus court sur les côtés ?",
      "Deux billets pour la pièce de théâtre de ce soir, s'il vous plaît."
    ],
    optEn: [
      "Hello, I will pay for my groceries with contactless debit card, please.",
      "Where is the platform to catch the train to Quebec City?",
      "Could you cut my hair a bit shorter on the sides?",
      "Two tickets for tonight's theater play, please."
    ],
    ans: 0
  },
  // P2Q2: tcf_p2_q2.png (Arrêt de bus sous la pluie) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 5,
    paper: 2,
    qNum: 2,
    imgKey: "tcf_p2_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Bus Stop in the Rain",
    opt: [
      "Des skieurs descendent une piste de montagne enneigée.",
      "Une femme avec un parapluie attend le bus sous l'abribus pendant qu'un autobus arrive.",
      "Un cuisinier prépare un repas dans une cuisine de restaurant.",
      "Un client essaie une paire de chaussures dans un magasin."
    ],
    optEn: [
      "Skiers are heading down a snowy mountain slope.",
      "A woman with an umbrella is waiting under a bus shelter as a bus arrives.",
      "A cook is preparing a meal in a restaurant kitchen.",
      "A customer is trying on a pair of shoes in a store."
    ],
    ans: 1
  },
  // P2Q3: tcf_p2_q3.png (Café en terrasse) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 6,
    paper: 2,
    qNum: 3,
    imgKey: "tcf_p2_q3",
    type: "SPEECH_ACT",
    situation: "Terrace Cafe",
    opt: [
      "Pouvez-vous vérifier la pression des pneus de ma voiture ?",
      "Mon passeport expire dans deux mois, puis-je voyager ?",
      "Garçon, nous prendrons deux cafés crème et un verre d'eau, s'il vous plaît.",
      "Je cherche des timbres pour envoyer une carte postale à l'étranger."
    ],
    optEn: [
      "Could you check the tire pressure on my car?",
      "My passport expires in two months, can I travel?",
      "Waiter, we will have two white coffees and a glass of water, please.",
      "I am looking for stamps to send a postcard abroad."
    ],
    ans: 2
  },
  // P2Q4: tcf_p2_q4.png (Distributeur automatique de tickets métro) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 7,
    paper: 2,
    qNum: 4,
    imgKey: "tcf_p2_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Metro Ticket Vending Machine",
    opt: [
      "Un voyageur achète un titre de transport sur un distributeur automatique dans une station de métro.",
      "Des clients dégustent des pâtisseries dans un salon de thé.",
      "Un médecin examine un patient dans un hôpital.",
      "Un jardinier arrose des fleurs dans un parc public."
    ],
    optEn: [
      "A commuter is purchasing a transit ticket on an automated vending machine inside a subway station.",
      "Customers are tasting pastries in a tea room.",
      "A doctor is examining a patient in a hospital.",
      "A gardener is watering flowers in a public park."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 3 ====================
  // P3Q1: tcf_p3_q1.png (Rayon fruits et légumes épicerie) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 8,
    paper: 3,
    qNum: 1,
    imgKey: "tcf_p3_q1",
    type: "SPEECH_ACT",
    situation: "Supermarket Produce Aisle",
    opt: [
      "Combien coûte le kilo de ces belles tomates fraîches ?",
      "À quelle heure part le prochain vol pour Paris ?",
      "Avez-vous une chambre d'hôtel avec vue sur la mer ?",
      "Je souhaite faire réparer le frein arrière de mon vélo."
    ],
    optEn: [
      "How much does a kilogram of these fresh tomatoes cost?",
      "What time does the next flight to Paris depart?",
      "Do you have a hotel room with a sea view?",
      "I would like to have the rear brake of my bicycle repaired."
    ],
    ans: 0
  },
  // P3Q2: tcf_p3_q2.png (Aéroport - Tapis à bagages) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 9,
    paper: 3,
    qNum: 2,
    imgKey: "tcf_p3_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Airport Baggage Carousel",
    opt: [
      "Des spectateurs assistent à une projection de film au cinéma.",
      "Des voyageurs attendent et récupèrent leurs valises autour du tapis roulant de l'aéroport.",
      "Un facteur distribue le courrier dans un immeuble résidentiel.",
      "Des étudiants prennent des notes dans un amphithéâtre universitaire."
    ],
    optEn: [
      "Spectators are watching a movie screening at the cinema.",
      "Travelers are waiting for and collecting their suitcases around the airport baggage carousel.",
      "A mail carrier is delivering mail in a residential building.",
      "Students are taking notes in a university lecture hall."
    ],
    ans: 1
  },
  // P3Q3: tcf_p3_q3.png (Boulangerie - Pâtisserie) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 10,
    paper: 3,
    qNum: 3,
    imgKey: "tcf_p3_q3",
    type: "SPEECH_ACT",
    situation: "Bakery Pastry Counter",
    opt: [
      "Pourriez-vous me faire le plein d'essence sans plomb ?",
      "Je prendrai deux croissants au beurre et cette tartelette aux fruits, s'il vous plaît.",
      "Avez-vous des médicaments contre le mal de tête ?",
      "Où se trouve la porte d'embarquement numéro douze ?"
    ],
    optEn: [
      "Could you fill up the tank with unleaded gasoline?",
      "I will take two butter croissants and this fruit tartlet, please.",
      "Do you have any medication for headaches?",
      "Where is boarding gate number twelve located?"
    ],
    ans: 1
  },
  // P3Q4: tcf_p3_q4.png (Touriste avec plan au carrefour de rue) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 11,
    paper: 3,
    qNum: 4,
    imgKey: "tcf_p3_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Tourist with City Map at Street Corner",
    opt: [
      "Un jeune homme consulte un plan de ville au coin d'une rue pour trouver son chemin.",
      "Un cuisinier découpe des légumes sur une planche en bois.",
      "Un mécanicien gonfle les pneus d'un camion dans un atelier.",
      "Une cliente essaie des lunettes devant une vitrine."
    ],
    optEn: [
      "A young man is consulting a city map at a street corner to find his way.",
      "A cook is cutting vegetables on a wooden cutting board.",
      "A mechanic is inflating truck tires in a workshop.",
      "A customer is trying on glasses in front of a storefront."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 4 ====================
  // P4Q1: tcf_p4_q1.png (Cabinet médical - Médecin et patiente) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 12,
    paper: 4,
    qNum: 1,
    imgKey: "tcf_p4_q1",
    type: "SPEECH_ACT",
    situation: "Medical Clinic Consultation",
    opt: [
      "Docteur, j'ai des douleurs au dos depuis quelques jours, pouvez-vous m'examiner ?",
      "Un billet aller-retour pour Montréal en seconde classe, s'il vous plaît.",
      "Combien coûte cette paire de bottes d'hiver en vitrine ?",
      "Je voudrais commander une pizza quatre fromages à emporter."
    ],
    optEn: [
      "Doctor, I have had back pain for a few days, could you examine me?",
      "A round-trip ticket to Montreal in standard class, please.",
      "How much does this pair of winter boots in the window cost?",
      "I would like to order a four-cheese pizza for takeout."
    ],
    ans: 0
  },
  // P4Q2: tcf_p4_q2.png (Bibliothèque - Comptoir retour de livres) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 13,
    paper: 4,
    qNum: 2,
    imgKey: "tcf_p4_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Library Book Return Counter",
    opt: [
      "Des passagers s'enregistrent pour un vol international.",
      "Un lecteur rend des livres à la bibliothécaire au comptoir d'une bibliothèque.",
      "Des athlètes s'entraînent sur une piste d'athlétisme.",
      "Un boulanger prépare de la pâte à pain dans son fournil."
    ],
    optEn: [
      "Passengers are checking in for an international flight.",
      "A reader is returning books to the librarian at a library service desk.",
      "Athletes are training on a running track.",
      "A baker is preparing bread dough in his bakehouse."
    ],
    ans: 1
  },
  // P4Q3: tcf_p4_q3.png (Distributeur automatique métro) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 14,
    paper: 4,
    qNum: 3,
    imgKey: "tcf_p4_q3",
    type: "SPEECH_ACT",
    situation: "Metro Ticket Vending Machine",
    opt: [
      "Pouvez-vous me couper les pointes et faire un brushing ?",
      "Je sélectionne sur l'écran tactile pour acheter mon titre de transport mensuel.",
      "Avez-vous une chambre calme avec salle de bain privée ?",
      "Quel est le plat du jour aujourd'hui au menu ?"
    ],
    optEn: [
      "Could you trim my ends and do a blowout hairstyle?",
      "I am selecting on the touchscreen to buy my monthly transit pass.",
      "Do you have a quiet room with a private bathroom?",
      "What is the daily special on today's menu?"
    ],
    ans: 1
  },
  // P4Q4: tcf_p4_q4.png (Marché de fruits et légumes) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 15,
    paper: 4,
    qNum: 4,
    imgKey: "tcf_p4_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Open-Air Farmers Market",
    opt: [
      "Des clients choisissent des fruits et légumes frais sur les étals d'un marché en plein air.",
      "Un automobiliste fait laver sa voiture dans une station automatique.",
      "Des voyageurs montent les marches d'un escalier mécanique.",
      "Un serveur nettoie des verres derrière le comptoir d'un bar."
    ],
    optEn: [
      "Customers are choosing fresh fruits and vegetables at stalls in an open-air market.",
      "A driver is getting their car washed at an automated car wash.",
      "Travelers are going up the steps of an escalator.",
      "A bartender is cleaning glasses behind a bar counter."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 5 ====================
  // P5Q1: tcf_p5_q1.png (Garage mécanique automobile) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 16,
    paper: 5,
    qNum: 1,
    imgKey: "tcf_p5_q1",
    type: "SPEECH_ACT",
    situation: "Auto Repair Garage",
    opt: [
      "Le moteur fait un bruit anormal sous le capot, pouvez-vous vérifier les bougies et l'huile ?",
      "Deux timbres pour l'Europe et une enveloppe matelassée, s'il vous plaît.",
      "Où se trouve le rayon des pantalons et des chemises pour hommes ?",
      "Pouvez-vous me prêter ce livre pour trois semaines ?"
    ],
    optEn: [
      "The engine is making an unusual noise under the hood, could you check the spark plugs and oil?",
      "Two stamps for Europe and a padded envelope, please.",
      "Where is the men's trousers and shirts department located?",
      "Could you lend me this book for three weeks?"
    ],
    ans: 0
  },
  // P5Q2: tcf_p5_q2.png (Comptoir enregistrement aéroport) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 17,
    paper: 5,
    qNum: 2,
    imgKey: "tcf_p5_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Airport Check-In Counter",
    opt: [
      "Un client commande un café au comptoir d'un bistrot.",
      "Un passager présente son passeport à l'agente au comptoir d'enregistrement de l'aéroport.",
      "Un vendeur emballe un bouquet de fleurs chez le fleuriste.",
      "Un policier contrôle les papiers d'un automobiliste sur la route."
    ],
    optEn: [
      "A customer is ordering a coffee at a bistro counter.",
      "A passenger is presenting his passport to the agent at an airport check-in desk.",
      "A florist is wrapping a bouquet of flowers in a flower shop.",
      "A police officer is inspecting a driver's documents on the road."
    ],
    ans: 1
  },
  // P5Q3: tcf_p5_q3.png (Supermarché - Caisse enregistreuse) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 18,
    paper: 5,
    qNum: 3,
    imgKey: "tcf_p5_q3",
    type: "SPEECH_ACT",
    situation: "Supermarket Cashier Checkout",
    opt: [
      "À quelle heure ferme le musée des beaux-arts ce soir ?",
      "Avez-vous besoin d'un sac pour ranger vos courses alimentaires ?",
      "Puis-je essayer cette veste en cuir dans la cabine du fond ?",
      "Pouvez-vous m'indiquer le chemin pour rejoindre la mairie ?"
    ],
    optEn: [
      "What time does the fine arts museum close tonight?",
      "Do you need a grocery bag to pack your food items?",
      "May I try on this leather jacket in the fitting room at the back?",
      "Could you tell me the directions to reach the city hall?"
    ],
    ans: 1
  },
  // P5Q4: tcf_p5_q4.png (Magasin de vêtements - Essayage manteau devant miroir) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 19,
    paper: 5,
    qNum: 4,
    imgKey: "tcf_p5_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Clothing Store Mirror Fitting",
    opt: [
      "Une cliente essaie un manteau d'hiver devant un miroir dans une boutique de vêtements.",
      "Une femme fait réparer sa bicyclette dans un atelier associatif.",
      "Des spectateurs applaudissent à la fin d'une pièce de théâtre.",
      "Un facteur dépose des colis dans un casier postal."
    ],
    optEn: [
      "A customer is trying on a winter coat in front of a mirror in a clothing boutique.",
      "A woman is getting her bicycle repaired in a community workshop.",
      "Audience members are applauding at the end of a theatrical play.",
      "A postal worker is placing parcels into a parcel locker."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 6 ====================
  // P6Q1: tcf_p6_q1.png (Restaurant - Service en salle) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 20,
    paper: 6,
    qNum: 1,
    imgKey: "tcf_p6_q1",
    type: "SPEECH_ACT",
    situation: "Restaurant Dining Table Service",
    opt: [
      "Voici vos deux plats chauds, bon appétit à vous deux !",
      "Pourriez-vous me peser ce paquet pour un envoi express ?",
      "Avez-vous ce modèle de baskets de sport en pointure 42 ?",
      "Combien coûte le plein d'essence pour cette voiture ?"
    ],
    optEn: [
      "Here are your two hot entrees, enjoy your meal to both of you!",
      "Could you weigh this package for express shipping?",
      "Do you have this sneaker model in shoe size 42?",
      "How much does a full tank of gas cost for this vehicle?"
    ],
    ans: 0
  },
  // P6Q2: tcf_p6_q2.png (Magasin de chaussures - Essayage) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 21,
    paper: 6,
    qNum: 2,
    imgKey: "tcf_p6_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Shoe Store Fitting",
    opt: [
      "Un cuisinier dresse des assiettes gastronomiques en cuisine.",
      "Un client essaie une paire de chaussures en cuir aidé par une vendeuse dans un magasin.",
      "Un voyageur composte son billet à l'entrée du train.",
      "Un étudiant consulte des dictionnaires dans une bibliothèque."
    ],
    optEn: [
      "A chef is plating gourmet dishes in a restaurant kitchen.",
      "A customer is trying on a pair of leather shoes assisted by a sales clerk in a store.",
      "A commuter is validating their train ticket at the station entrance.",
      "A student is consulting dictionaries in a library."
    ],
    ans: 1
  },
  // P6Q3: tcf_p6_q3.png (Salle de sport - Tapis de course et musculation) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 22,
    paper: 6,
    qNum: 3,
    imgKey: "tcf_p6_q3",
    type: "SPEECH_ACT",
    situation: "Fitness Gym Workout",
    opt: [
      "Quel est le prix de cette boîte de chocolats artisanaux ?",
      "Je termine ma série sur ce tapis de course dans deux minutes si vous voulez la machine.",
      "Pouvez-vous me couper les cheveux plus court sur la nuque ?",
      "À quelle heure décolle le vol vers Vancouver ce soir ?"
    ],
    optEn: [
      "What is the price of this box of artisanal chocolates?",
      "I am finishing my workout set on this treadmill in two minutes if you want the machine.",
      "Could you cut my hair shorter on the back of the neck?",
      "What time does the flight to Vancouver take off tonight?"
    ],
    ans: 1
  },
  // P6Q4: tcf_p6_q4.png (Cinéma - Guichet billetterie) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 23,
    paper: 6,
    qNum: 4,
    imgKey: "tcf_p6_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Cinema Box Office",
    opt: [
      "Des clients font la queue au guichet pour acheter des places de cinéma.",
      "Des randonneurs marchent le long d'un lac en montagne.",
      "Un mécanicien change la roue d'un véhicule utilitaire.",
      "Une coiffeuse fait un shampoing à une cliente dans un salon."
    ],
    optEn: [
      "Customers are waiting in line at the box office to purchase cinema tickets.",
      "Hikers are walking along a mountain lake trail.",
      "A mechanic is replacing a wheel on a utility vehicle.",
      "A hairdresser is shampooing a client's hair in a salon."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 7 ====================
  // P7Q1: tcf_p7_q1.png (Taxi parisien) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 24,
    paper: 7,
    qNum: 1,
    imgKey: "tcf_p7_q1",
    type: "SPEECH_ACT",
    situation: "Parisian Taxi Stand",
    opt: [
      "Bonjour chauffeur, pouvez-vous m'emmener à l'aéroport international, s'il vous plaît ?",
      "Une baguette pas trop cuite et deux croissants, s'il vous plaît.",
      "Puis-je essayer cette paire de chaussures en taille 41 ?",
      "Où se trouve la pharmacie de garde la plus proche ?"
    ],
    optEn: [
      "Hello driver, could you take me to the international airport, please?",
      "A lightly baked baguette and two croissants, please.",
      "May I try on this pair of shoes in size 41?",
      "Where is the nearest on-duty pharmacy located?"
    ],
    ans: 0
  },
  // P7Q2: tcf_p7_q2.png (Librairie) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 25,
    paper: 7,
    qNum: 2,
    imgKey: "tcf_p7_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Bookstore Aisles",
    opt: [
      "Un mécanicien répare une voiture dans un garage.",
      "Un client feuillette des livres devant les étagères d'une librairie.",
      "Des passagers montent dans un train à la gare.",
      "Un médecin ausculte un patient dans son cabinet."
    ],
    optEn: [
      "A mechanic is repairing a car in a garage.",
      "A customer is browsing books in front of bookstore shelves.",
      "Passengers are boarding a train at the railway station.",
      "A doctor is examining a patient in his clinic."
    ],
    ans: 1
  },
  // P7Q3: tcf_p7_q3.png (Opticien - Lunettes) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 26,
    paper: 7,
    qNum: 3,
    imgKey: "tcf_p7_q3",
    type: "SPEECH_ACT",
    situation: "Optician Shop",
    opt: [
      "Une table pour deux personnes en terrasse, s'il vous plaît.",
      "Puis-je essayer cette monture noire devant le miroir pour voir si elle me va bien ?",
      "Quel est le prix du billet de train pour Montréal ?",
      "Pouvez-vous me couper les cheveux plus court sur les côtés ?"
    ],
    optEn: [
      "A table for two on the terrace, please.",
      "May I try on these black frames in front of the mirror to see if they suit me?",
      "What is the train ticket price to Montreal?",
      "Could you cut my hair shorter on the sides?"
    ],
    ans: 1
  },
  // P7Q4: tcf_p7_q4.png (Galerie de musée) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 27,
    paper: 7,
    qNum: 4,
    imgKey: "tcf_p7_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Museum Art Gallery",
    opt: [
      "Des visiteurs contemplent des tableaux exposés sur les murs d'un musée.",
      "Des clients font leurs courses dans un supermarché.",
      "Un serveur apporte des boissons à des clients au café.",
      "Des voyageurs attendent un bus sous un abribus."
    ],
    optEn: [
      "Visitors are admiring paintings displayed on museum gallery walls.",
      "Customers are doing their grocery shopping in a supermarket.",
      "A waiter is bringing drinks to customers at a cafe.",
      "Commuters are waiting for a bus under a bus shelter."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 8 ====================
  // P8Q1: tcf_p8_q1.png (Glacier artisanal) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 28,
    paper: 8,
    qNum: 1,
    imgKey: "tcf_p8_q1",
    type: "SPEECH_ACT",
    situation: "Ice Cream Parlor",
    opt: [
      "Une glace deux boules vanille et fraise avec un peu de chantilly, s'il vous plaît.",
      "Je souhaite renouveler mon abonnement de transport mensuel.",
      "Avez-vous une boîte de pansements stériles et de l'alcool ?",
      "Pourriez-vous vérifier la batterie de mon véhicule ?"
    ],
    optEn: [
      "A two-scoop vanilla and strawberry ice cream with whipped cream, please.",
      "I would like to renew my monthly transit pass.",
      "Do you have a box of sterile bandages and rubbing alcohol?",
      "Could you check the battery on my car?"
    ],
    ans: 0
  },
  // P8Q2: tcf_p8_q2.png (Marché de fruits et légumes bio) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 29,
    paper: 8,
    qNum: 2,
    imgKey: "tcf_p8_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Open-Air Organic Market",
    opt: [
      "Un automobiliste fait le plein d'essence à la station-service.",
      "Des passants achètent des fruits et légumes frais sur un marché de rue.",
      "Une cliente essaie une robe dans une boutique de mode.",
      "Des spectateurs achètent des billets au guichet du théâtre."
    ],
    optEn: [
      "A motorist is filling up with gas at a gas station.",
      "Passersby are buying fresh fruits and vegetables at an open-air street market.",
      "A customer is trying on a dress in a fashion boutique.",
      "Spectators are purchasing tickets at a theater box office."
    ],
    ans: 1
  },
  // P8Q3: tcf_p8_q3.png (Guichet information gare ferroviaire) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 30,
    paper: 8,
    qNum: 3,
    imgKey: "tcf_p8_q3",
    type: "SPEECH_ACT",
    situation: "Railway Information Counter",
    opt: [
      "Je voudrais commander une formule déjeuner avec boisson.",
      "Bonjour madame, pouvez-vous m'indiquer le quai de correspondance pour le prochain train ?",
      "Combien coûte cette paire de lunettes de soleil ?",
      "Puis-je avoir un rendez-vous avec le médecin pour demain matin ?"
    ],
    optEn: [
      "I would like to order a lunch meal with beverage.",
      "Hello madam, could you tell me the connecting platform for the next train?",
      "How much does this pair of sunglasses cost?",
      "May I have an appointment with the doctor for tomorrow morning?"
    ],
    ans: 1
  },
  // P8Q4: tcf_p8_q4.png (Laverie automatique) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 31,
    paper: 8,
    qNum: 4,
    imgKey: "tcf_p8_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Laundromat",
    opt: [
      "Une cliente charge du linge dans une machine à laver automatique.",
      "Des voyageurs enregistrent leurs valises à l'aéroport.",
      "Un cuisinier fait cuire des steaks sur une grille.",
      "Des enfants jouent au ballon dans la cour d'école."
    ],
    optEn: [
      "A customer is loading laundry into an automatic washing machine.",
      "Travelers are checking in their suitcases at the airport.",
      "A cook is grilling steaks on a grill.",
      "Children are playing ball in a schoolyard."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 9 ====================
  // P9Q1: tcf_p9_q1.png (Bijouterie - Montres) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 32,
    paper: 9,
    qNum: 1,
    imgKey: "tcf_p9_q1",
    type: "SPEECH_ACT",
    situation: "Jewelry Boutique",
    opt: [
      "Pourriez-vous me montrer cette montre argentée exposée dans la vitrine ?",
      "Un café noir et un croissant pur beurre, s'il vous plaît.",
      "À quelle heure arrive le train en provenance de Québec ?",
      "Où se trouve la cabine d'essayage pour essayer ce manteau ?"
    ],
    optEn: [
      "Could you show me this silver watch displayed inside the glass case?",
      "A black coffee and a pure butter croissant, please.",
      "What time does the train arriving from Quebec City get in?",
      "Where is the fitting room to try on this coat?"
    ],
    ans: 0
  },
  // P9Q2: tcf_p9_q2.png (Cafétéria - Préparation sandwich) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 33,
    paper: 9,
    qNum: 2,
    imgKey: "tcf_p9_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Cafeteria Sandwich Counter",
    opt: [
      "Un chauffeur de taxi attend des clients devant la gare.",
      "Une employée prépare un sandwich frais derrière le comptoir d'une cafétéria.",
      "Un photographe prend des clichés dans un studio photo.",
      "Un facteur distribue des lettres dans des boîtes postales."
    ],
    optEn: [
      "A taxi driver is waiting for customers outside the train station.",
      "An employee is preparing a fresh sandwich behind a cafeteria counter.",
      "A photographer is taking shots in a photo studio.",
      "A mail carrier is delivering letters into mailboxes."
    ],
    ans: 1
  },
  // P9Q3: tcf_p9_q3.png (Magasin de bricolage - Outils / marteau) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 34,
    paper: 9,
    qNum: 3,
    imgKey: "tcf_p9_q3",
    type: "SPEECH_ACT",
    situation: "Hardware Tool Store",
    opt: [
      "Deux billets pour la séance de cinéma de vingt heures.",
      "Je cherche une boîte de vis et des chevilles adaptées pour fixer une étagère au mur.",
      "Quel est le montant de l'addition pour la table numéro cinq ?",
      "Mon ordonnance médicale est-elle prête à la pharmacie ?"
    ],
    optEn: [
      "Two tickets for the eight o'clock movie screening.",
      "I am looking for a box of screws and wall anchors to mount a shelf on the wall.",
      "What is the check amount for table number five?",
      "Is my medical prescription ready at the pharmacy?"
    ],
    ans: 1
  },
  // P9Q4: tcf_p9_q4.png (Piste de ski alpin) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 35,
    paper: 9,
    qNum: 4,
    imgKey: "tcf_p9_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Alpine Ski Resort",
    opt: [
      "Des skieurs en tenue d'hiver ajustent leur matériel au bas des pistes.",
      "Des baigneurs profitent du soleil sur une plage en été.",
      "Un serveur apporte un plateau de boissons dans un restaurant.",
      "Un garagiste effectue la vidange d'une voiture."
    ],
    optEn: [
      "Skiers in winter gear are adjusting their equipment at the base of the slopes.",
      "Swimmers are enjoying the sunshine on a beach in summer.",
      "A server is carrying a tray of drinks in a restaurant.",
      "A mechanic is changing the oil on a car."
    ],
    ans: 0
  },

  // ==================== 📄 PAPER 10 ====================
  // P10Q1: tcf_p10_q1.png (Amphithéâtre universitaire) -> SPEECH_ACT (Q1)
  {
    sceneIdx: 36,
    paper: 10,
    qNum: 1,
    imgKey: "tcf_p10_q1",
    type: "SPEECH_ACT",
    situation: "University Amphitheater",
    opt: [
      "Excusez-moi professeur, pourriez-vous réexpliquer la formule écrite au tableau ?",
      "Il me faut de la monnaie pour payer l'horodateur de stationnement.",
      "Mon chat ne mange plus depuis deux jours, pouvez-vous l'examiner ?",
      "Je voudrais acheter un jeu de cordes pour guitare acoustique."
    ],
    optEn: [
      "Excuse me professor, could you please re-explain the formula written on the board?",
      "I need some coins to pay for the parking meter.",
      "My cat hasn't eaten for two days, can you examine him?",
      "I would like to buy a set of acoustic guitar strings."
    ],
    ans: 0
  },
  // P10Q2: tcf_p10_q2.png (Clinique vétérinaire) -> SCENE_DESCRIPTION (Q2)
  {
    sceneIdx: 37,
    paper: 10,
    qNum: 2,
    imgKey: "tcf_p10_q2",
    type: "SCENE_DESCRIPTION",
    situation: "Veterinary Clinic",
    opt: [
      "Un coiffeur rase la barbe d'un client au coupe-choux.",
      "Un automobiliste règle son péage à une barrière d'autoroute.",
      "Un mécanicien remplace une roue crevée sur un utilitaire.",
      "Un vétérinaire en blouse ausculte un chat posé sur une table de consultation."
    ],
    optEn: [
      "A barber is shaving a customer's beard with a straight razor.",
      "A driver is paying toll at a highway toll booth.",
      "A mechanic is replacing a flat tire on a van.",
      "A veterinarian in a white coat is examining a cat on an examination table."
    ],
    ans: 3
  },
  // P10Q3: tcf_p10_q3.png (Magasin d'instruments de musique) -> SPEECH_ACT (Q3)
  {
    sceneIdx: 38,
    paper: 10,
    qNum: 3,
    imgKey: "tcf_p10_q3",
    type: "SPEECH_ACT",
    situation: "Musical Instrument Store",
    opt: [
      "Avez-vous des manuels d'histoire pour les cours universitaires ?",
      "Ce médicament pour animal est-il délivré sans ordonnance ?",
      "Un ticket de stationnement pour deux heures dans cette zone, s'il vous plaît.",
      "Puis-je accorder cette guitare acoustique et la tester quelques minutes ?"
    ],
    optEn: [
      "Do you have history textbooks for university courses?",
      "Is this pet medication available without a prescription?",
      "A two-hour parking ticket for this street zone, please.",
      "May I tune this acoustic guitar and test it out for a few minutes?"
    ],
    ans: 3
  },
  // P10Q4: tcf_p10_q4.png (Horodateur de rue) -> SCENE_DESCRIPTION (Q4)
  {
    sceneIdx: 39,
    paper: 10,
    qNum: 4,
    imgKey: "tcf_p10_q4",
    type: "SCENE_DESCRIPTION",
    situation: "Street Parking Meter",
    opt: [
      "Un automobiliste insère de la monnaie dans un horodateur sur le trottoir.",
      "Un cuisinier fait griller des aliments sur une plaque chauffante.",
      "Un serveur nettoie les verres au bar d'un bistrot.",
      "Un marin décharge des caisses de poissons d'un chalutier."
    ],
    optEn: [
      "A motorist is inserting coins into a sidewalk parking meter.",
      "A cook is grilling food on a hot griddle plate.",
      "A server is wiping glasses at a bistro bar.",
      "A fisherman is unloading crates of fish from a trawler."
    ],
    ans: 0
  }
];

console.log(`✅ Loaded ${ALIGNED_40_SCENES.length} perfectly calibrated scenes.`);
