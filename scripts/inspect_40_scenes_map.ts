import * as fs from "fs";

// Let's print the scenes from getDrawingPropositions(sceneIdx)
const scenes = [
  "0 (P1Q1): Des voyageurs attendent l'arrivée du train sur le quai.",
  "1 (P1Q2): Un client s'adresse au réceptionniste à l'accueil de l'hôtel.",
  "2 (P1Q3): Une cliente achète du pain et des viennoiseries à la boulangerie.",
  "3 (P1Q4): Les passagers s'installent dans une salle d'embarquement à l'aéroport.",
  "4 (P2Q1): Une personne achète un titre de transport à un distributeur automatique du métro.",
  "5 (P2Q2): Un patient est en consultation chez le médecin.",
  "6 (P2Q3): Des clients sont installés à la terrasse d'un café.",
  "7 (P2Q4): Des personnes attendent l'arrivée du bus à un arrêt en ville.",
  "8 (P3Q1): Une femme choisit des fruits et légumes au supermarché.",
  "9 (P3Q2): Des personnes lisent et étudient silencieusement dans une bibliothèque.",
  "10 (P3Q3): Un mécanicien inspecte le moteur d'une voiture dans un garage.",
  "11 (P3Q4): Une personne achète des médicaments au comptoir d'une pharmacie.",
  "12 (P4Q1): Un homme envoie un colis recommandé au guichet de la poste.",
  "13 (P4Q2): Une cliente essaie un manteau dans un magasin de vêtements.",
  "14 (P4Q3): Des voyageurs mangent dans le wagon-restaurant d'un train.",
  "15 (P4Q4): Des passagers récupèrent leurs bagages sur le tapis roulant à l'aéroport.",
  "16 (P5Q1): Une cliente se fait coiffer dans un salon de coiffure.",
  "17 (P5Q2): Un conducteur fait le plein de carburant à une station-service.",
  "18 (P5Q3): Deux personnes discutent assises sur un banc dans un parc public.",
  "19 (P5Q4): Un client effectue un dépôt d'argent au guichet d'une banque.",
  "20 (P6Q1): Une fleuriste compose un bouquet de fleurs fraîches dans sa boutique.",
  "21 (P6Q2): Un client essaie une paire de chaussures dans un magasin.",
  "22 (P6Q3): Des personnes font du sport et s'entraînent dans une salle de gym.",
  "23 (P6Q4): Des spectateurs achètent leurs billets au guichet d'un cinéma.",
  "24 (P7Q1): Des passagers montent à bord d'un taxi à une station en ville.",
  "25 (P7Q2): Un client parcourt des ouvrages sur les étagères d'une librairie.",
  "26 (P7Q3): Un client choisit une monture de lunettes chez un opticien.",
  "27 (P7Q4): Des visiteurs admirent des tableaux accrochés dans une galerie de musée.",
  "28 (P8Q1): Des clients achètent des glaces auprès d'un marchand ambulant.",
  "29 (P8Q2): Des consommateurs achètent des fruits frais sur un marché en plein air.",
  "30 (P8Q3): Un usager demande un itinéraire au guichet d'information de la gare.",
  "31 (P8Q4): Une personne lave son linge dans une laverie automatique.",
  "32 (P9Q1): Un client regarde des bijoux exposés dans la vitrine d'une bijouterie.",
  "33 (P9Q2): Un serveur prépare un sandwich derrière le comptoir d'une cafétéria.",
  "34 (P9Q3): Un bricoleur choisit des outils dans un magasin de bricolage.",
  "35 (P9Q4): Des skieurs s'équipent au pied des pistes enneigées d'une station.",
  "36 (P10Q1): Des étudiants écoutent attentivement un cours dans un grand amphithéâtre.",
  "37 (P10Q2): Un vétérinaire osculte un chat sur une table d'examen.",
  "38 (P10Q3): Un musicien essaie une guitare dans un magasin d'instruments.",
  "39 (P10Q4): Un automobiliste paie son stationnement à un horodateur dans la rue."
];

console.log("=== 40 UNIQUE SCENES MAPPED ACROSS 10 PAPERS ===");
scenes.forEach(s => console.log(s));
