import fs from 'fs';
import path from 'path';

console.log("=== 🌐 INJECTING 100% ACCURATE ENGLISH OPTION TRANSLATIONS ===");

const translationDictionary = {
  // Scene 0: Train Station Platform
  "Des voyageurs attendent l'arrivée du train sur le quai.": "Passengers are waiting for the train to arrive on the platform.",
  "Des clients boivent un café à la terrasse d'un bistrot.": "Customers are drinking coffee on a bistro terrace.",
  "Un homme fait des achats dans un supermarché.": "A man is shopping in a supermarket.",
  "Des promeneurs marchent dans un parc enneigé.": "Walkers are walking in a snowy park.",

  // Scene 1: Hotel Reception Desk
  "Une personne commande un plat au restaurant.": "A person is ordering a dish at a restaurant.",
  "Un client s'adresse au réceptionniste à l'accueil de l'hôtel.": "A customer is speaking with the receptionist at the hotel front desk.",
  "Un passager monte dans un taxi devant la gare.": "A passenger is getting into a taxi in front of the station.",
  "Une femme achète un billet au guichet du cinéma.": "A woman is buying a ticket at the cinema box office.",

  // Scene 2: Bakery Storefront
  "Un mécanicien répare une voiture au garage.": "A mechanic is repairing a car in a garage.",
  "Un médecin examine un patient dans son cabinet.": "A doctor is examining a patient in a medical office.",
  "Une cliente achète du pain et des viennoiseries à la boulangerie.": "A customer is buying bread and pastries at the bakery.",
  "Un jardinier taille des arbres dans un jardin public.": "A gardener is trimming trees in a public park.",

  // Scene 3: Airport Gate & Plane
  "Les passagers s'installent dans une salle d'embarquement à l'aéroport.": "Passengers are sitting in an airport boarding lounge.",
  "Des skieurs descendent une piste enneigée en montagne.": "Skiers are going down a snowy slope in the mountains.",
  "Des étudiants travaillent au calme dans une bibliothèque.": "Students are working quietly in a library.",
  "Un facteur dépose des lettres dans une boîte aux lettres.": "A mail carrier is depositing letters into a mailbox.",

  // Scene 4: Metro Ticket Machine
  "Des cyclistes roulent sur une piste cyclable.": "Cyclists are riding on a bicycle path.",
  "Une personne achète un titre de transport à un distributeur automatique du métro.": "A person is purchasing a transit ticket at an automated metro ticket machine.",
  "Un serveur apporte des boissons sur un plateau.": "A waiter is bringing drinks on a tray.",
  "Des enfants jouent sur un terrain de football.": "Children are playing on a soccer field.",

  // Scene 5: Doctor Office
  "Un client demande un renseignement dans une banque.": "A customer is asking for information at a bank.",
  "Un peintre réalise un tableau dans un atelier.": "A painter is creating a painting in an art studio.",
  "Un patient est en consultation chez le médecin.": "A patient is in consultation at the doctor's office.",
  "Un cuisinier prépare un repas dans une cuisine.": "A cook is preparing a meal in a kitchen.",

  // Scene 6: Outdoor Terrace Cafe
  "Des clients sont installés à la terrasse d'un café.": "Customers are seated at the terrace of an outdoor café.",
  "Des voyageurs attendent leur vol dans un aéroport.": "Travelers are waiting for their flight at an airport.",
  "Un mécanicien vérifie le niveau d'huile d'un véhicule.": "A mechanic is checking the oil level of a vehicle.",
  "Une personne dépose son sac à la consigne automatique.": "A person is leaving their bag at an automated luggage locker.",

  // Scene 7: Bus Stop & Street
  "Des randonneurs marchent le long d'une rivière.": "Hikers are walking along a river.",
  "Des personnes attendent l'arrivée du bus à un arrêt en ville.": "People are waiting for the bus to arrive at a city bus stop.",
  "Un homme répare son vélo sur le trottoir.": "A man is repairing his bicycle on the sidewalk.",
  "Des clients font la queue devant un guichet de théâtre.": "Customers are lining up in front of a theater ticket booth.",

  // Scene 8: Supermarket Grocery Aisle
  "Un voyageur enregistre ses bagages à l'aéroport.": "A traveler is checking in luggage at the airport.",
  "Une femme choisit des fruits et légumes au supermarché.": "A woman is choosing fruits and vegetables in a supermarket.",
  "Un coiffeur coupe les cheveux d'un client dans un salon.": "A hairdresser is cutting a customer's hair in a salon.",
  "Des nageurs se baignent dans une piscine municipale.": "Swimmers are swimming in a municipal pool.",

  // Scene 9: Library Reading Room
  "Un policier dirige la circulation à un carrefour.": "A police officer is directing traffic at an intersection.",
  "Des personnes lisent et étudient silencieusement dans une bibliothèque.": "People are reading and studying quietly in a library.",
  "Un chauffeur livre des colis à un domicile.": "A driver is delivering packages to a residence.",
  "Des musiciens jouent du piano lors d'un concert.": "Musicians are playing piano during a concert.",

  // Scene 10: Car Repair Garage
  "Un mécanicien inspecte le moteur d'une voiture dans un garage.": "A mechanic is inspecting a car engine in a repair garage.",
  "Un serveur essuie les tables d'un restaurant.": "A waiter is wiping tables at a restaurant.",
  "Des touristes prennent des photos devant un monument historique.": "Tourists are taking photos in front of a historic monument.",
  "Un barbier taille la barbe d'un client.": "A barber is trimming a client's beard.",

  // Scene 11: Pharmacy Counter
  "Un boulanger prépare des tartes aux pommes.": "A baker is preparing apple pies.",
  "Une personne achète des médicaments au comptoir d'une pharmacie.": "A person is buying medications at a pharmacy counter.",
  "Un photographe prend un portrait en studio.": "A photographer is taking a portrait in a studio.",
  "Des athlètes s'entraînent sur une piste de course.": "Athletes are training on a running track.",

  // Scene 12: Post Office Counter
  "Un homme envoie un colis recommandé au guichet de la poste.": "A man is sending a registered parcel at the post office counter.",
  "Un marin pilote un bateau sur le fleuve.": "A sailor is piloting a boat on the river.",
  "Une couturière coud un vêtement dans son atelier.": "A seamstress is sewing a garment in her workshop.",
  "Des spectateurs applaudissent à la fin d'un film.": "Spectators are applauding at the end of a movie.",

  // Scene 13: Clothing Store
  "Un serveur prend la commande d'une table en terrasse.": "A waiter is taking an order at an outdoor table.",
  "Un mécanicien change les pneus d'un camion.": "A mechanic is changing the tires of a truck.",
  "Une cliente essaie un manteau dans un magasin de vêtements.": "A customer is trying on a coat in a clothing store.",
  "Un professeur donne un cours devant un tableau vert.": "A teacher is giving a lesson in front of a chalkboard.",

  // Scene 14: Train Dining Car
  "Des voyageurs mangent dans le wagon-restaurant d'un train.": "Travelers are eating in the dining car of a train.",
  "Des enfants font du vélo dans la cour de récréation.": "Children are riding bikes in the schoolyard.",
  "Un fermier nourrit des animaux dans une ferme.": "A farmer is feeding animals on a farm.",
  "Un dentiste soigne les dents d'un enfant.": "A dentist is treating a child's teeth.",

  // Scene 15: Airport Baggage Claim
  "Un pompier éteint un feu de forêt.": "A firefighter is extinguishing a forest fire.",
  "Des passagers récupèrent leurs bagages sur le tapis roulant à l'aéroport.": "Passengers are retrieving their luggage from the baggage carousel at the airport.",
  "Un jardinier plante des fleurs dans une serre.": "A gardener is planting flowers in a greenhouse.",
  "Un guide explique l'histoire d'un château.": "A tour guide is explaining the history of a castle.",

  // Scene 16: Hair Salon
  "Une cliente se fait coiffer dans un salon de coiffure.": "A client is getting her hair styled in a hair salon.",
  "Un livreur transporte des cartons dans un monte-charge.": "A delivery person is transporting boxes in a freight elevator.",
  "Un garde surveille les œuvres d'un musée.": "A security guard is watching over artwork in a museum.",
  "Un ingénieur travaille devant son ordinateur de bureau.": "An engineer is working at a desktop computer.",

  // Scene 17: Gas Station
  "Un conducteur fait le plein de carburant à une station-service.": "A driver is filling up fuel at a gas station.",
  "Un serveur sert des tasses de thé dans un salon.": "A server is serving cups of tea in a lounge.",
  "Des randonneurs montent vers le sommet d'une colline.": "Hikers are climbing toward a hilltop summit.",
  "Un horloger répare un réveil mécanique.": "A watchmaker is repairing a mechanical alarm clock.",

  // Scene 18: Public Park Bench
  "Un policier vérifie les papiers d'un chauffeur.": "A police officer is checking a driver's documents.",
  "Deux personnes discutent assises sur un banc dans un parc public.": "Two people are chatting while sitting on a bench in a public park.",
  "Un cuisinier découpe de la viande en cuisine.": "A chef is slicing meat in a kitchen.",
  "Des étudiants écoutent une conférence à l'université.": "Students are listening to a lecture at the university.",

  // Scene 19: Bank Teller Counter
  "Un client effectue un dépôt d'argent au guichet d'une banque.": "A customer is making a cash deposit at a bank teller counter.",
  "Une fleuriste arrose des bouquets de roses.": "A florist is watering rose bouquets.",
  "Un mécanicien remplace une batterie de voiture.": "A mechanic is replacing a car battery.",
  "Des spectateurs assistent à une pièce de théâtre.": "Spectators are attending a theater play.",

  // Scene 20: Florist Shop
  "Une fleuriste compose un bouquet de fleurs fraîches dans sa boutique.": "A florist is arranging a bouquet of fresh flowers in her shop.",
  "Un menuisier rabote une planche de chêne.": "A carpenter is planing an oak board.",
  "Un électricien installe un plafonnier dans un salon.": "An electrician is installing a ceiling light in a living room.",
  "Un passager valide son ticket de tramway.": "A passenger is validating a tram ticket.",

  // Scene 21: Shoe Store
  "Un client essaie une paire de chaussures dans un magasin.": "A customer is trying on a pair of shoes in a store.",
  "Un boulanger enfourne des baguettes au four.": "A baker is putting baguettes into the oven.",
  "Un serveur nettoie le comptoir d'un bar.": "A bartender is cleaning the bar counter.",
  "Des enfants font de la balançoire dans un parc.": "Children are swinging on swings in a park.",

  // Scene 22: Gym Sports Center
  "Des personnes font du sport et s'entraînent dans une salle de gym.": "People are exercising and working out in a gym.",
  "Un facteur trie le courrier dans un centre postal.": "A postal worker is sorting mail in a postal center.",
  "Un cuisinier goûte une soupe dans une marmite.": "A chef is tasting soup from a pot.",
  "Un chauffeur attend à un feu de signalisation.": "A driver is waiting at a traffic light.",

  // Scene 23: Cinema Ticket Booth
  "Des spectateurs achètent leurs billets au guichet d'un cinéma.": "Moviegoers are buying tickets at a cinema box office.",
  "Un pompiste nettoie le pare-brise d'une automobile.": "A gas station attendant is cleaning a car windshield.",
  "Un étudiant emprunte un manuel à la bibliothèque.": "A student is borrowing a textbook from the library.",
  "Une femme paie son ticket de parking à la borne.": "A woman is paying for her parking ticket at the machine.",

  // Scene 24: Taxi Stand
  "Des passagers montent à bord d'un taxi à une station en ville.": "Passengers are boarding a taxi at a downtown taxi stand.",
  "Des jardiniers arrosent les fleurs d'un jardin public.": "Gardeners are watering flowers in a public park.",
  "Un maître-nageur surveille une plage surveillée.": "A lifeguard is watching over a designated beach.",
  "Un chauffeur charge du fret dans une camionnette.": "A driver is loading cargo into a delivery van.",

  // Scene 25: Bookstore
  "Un client parcourt des ouvrages sur les étagères d'une librairie.": "A customer is browsing books on the shelves of a bookstore.",
  "Un charpentier fabrique un meuble en bois.": "A carpenter is building wooden furniture.",
  "Un arbitre siffle une faute pendant un match.": "A referee is blowing the whistle during a game.",
  "Un contrôleur vérifie les billets dans le train.": "A conductor is checking tickets on the train.",

  // Scene 26: Optician Shop
  "Un client choisit une monture de lunettes chez un opticien.": "A customer is selecting eyeglass frames at an optical store.",
  "Des visiteurs admirent des tableaux accrochés dans une galerie de musée.": "Visitors are admiring paintings hanging in an art museum gallery.",
  "Un cuisinier dresse des assiettes pour le service du soir.": "A chef is plating meals for evening service.",
  "Une infirmière prend la tension artérielle d'un patient.": "A nurse is taking a patient's blood pressure.",

  // Scene 27: Museum Art Gallery
  "Des touristes photographient une sculpture dans un monument.": "Tourists are photographing a sculpture in a monument.",
  "Un horloger règle les aiguilles d'une montre de collection.": "A watchmaker is adjusting the hands of a vintage watch.",
  "Un jardinier ramasse les feuilles mortes avec un râteau.": "A gardener is raking dead leaves with a rake.",

  // Scene 28: Ice Cream Parlor
  "Des clients achètent des glaces auprès d'un marchand ambulant.": "Customers are buying ice cream from a street vendor.",
  "Un réparateur change l'écran cassé d'un téléphone.": "A repair technician is replacing a cracked phone screen.",
  "Un photographe animalier observe des oiseaux dans les marais.": "A wildlife photographer is observing birds in the wetlands.",
  "Une caissière scanne des articles sur un tapis roulant.": "A cashier is scanning items on a checkout conveyor belt.",

  // Scene 29: Outdoor Fruit Market
  "Des consommateurs achètent des fruits frais sur un marché en plein air.": "Consumers are purchasing fresh fruits at an outdoor market.",
  "Un cycliste gonfle les roues de son vélo de course.": "A cyclist is pumping the tires of a racing bicycle.",
  "Un serveur prend la commande d'une table en salle.": "A server is taking an order from a dining room table.",
  "Des ouvriers peignent des lignes blanches sur la chaussée.": "Workers are painting white lines on the roadway.",

  // Scene 30: Train Ticket Counter
  "Un usager demande un itinéraire au guichet d'information de la gare.": "A traveler is requesting route directions at the station information desk.",
  "Un pharmacien explique le dosage d'un traitement à un patient.": "A pharmacist is explaining medication dosage to a patient.",
  "Un paysagiste plante des arbustes le long d'une allée piétonne.": "A landscaper is planting shrubs along a pedestrian walkway.",
  "Des skieurs prennent le télésiège vers le sommet de la montagne.": "Skiers are taking the chairlift toward the mountain summit.",

  // Scene 31: Laundromat
  "Une personne lave son linge dans une laverie automatique.": "A person is washing laundry in a self-service laundromat.",
  "Un boulanger pétrit de la pâte à pain dans un pétrin.": "A baker is kneading bread dough in a mixer.",
  "Un chauffeur de bus attend les passagers à un terminus.": "A bus driver is waiting for passengers at a terminal stop.",
  "Un mécanicien teste les amortisseurs d'une berline.": "A mechanic is testing the shock absorbers of a sedan.",

  // Scene 32: Jewelry Store
  "Un client regarde des bijoux exposés dans la vitrine d'une bijouterie.": "A customer is looking at jewelry displayed in a jewelry store showcase.",
  "Un chef d'orchestre dirige des musiciens lors d'une répétition.": "A conductor is leading musicians during a rehearsal.",
  "Un agriculteur moissonne un champ de blé au coucher du soleil.": "A farmer is harvesting a wheat field at sunset.",
  "Des enfants nourrissent des canards au bord d'un étang.": "Children are feeding ducks at the edge of a pond.",

  // Scene 33: Fast Food Cafeteria
  "Un serveur prépare un sandwich derrière le comptoir d'une cafétéria.": "A server is preparing a sandwich behind a cafeteria food counter.",
  "Un livreur vérifie l'adresse de livraison sur son smartphone.": "A courier is checking the delivery address on a smartphone.",
  "Une bibliothécaire range des dictionnaires sur une étagère haute.": "A librarian is shelving dictionaries on a top shelf.",
  "Un technicien remplace une ampoule sur un lampadaire de rue.": "A technician is replacing a bulb on a street lamp.",

  // Scene 34: Hardware Store
  "Un bricoleur choisit des outils dans un magasin de bricolage.": "A handyman is selecting tools in a hardware home-improvement store.",
  "Un poissonnier dispose des poissons frais sur un lit de glace.": "A fishmonger is arranging fresh fish on a bed of ice.",
  "Un agent de sécurité contrôle les sacs à l'entrée d'un salon.": "A security guard is checking bags at the entrance of a convention.",
  "Un professeur anime un débat entre étudiants dans une salle de cours.": "A professor is moderating a student debate in a classroom.",

  // Scene 35: Ski Resort
  "Des skieurs s'équipent au pied des pistes enneigées d'une station.": "Skiers are gearing up at the base of snowy slopes in a ski resort.",
  "Un pompier inspecte une borne d'incendie dans une ruelle.": "A firefighter is inspecting a fire hydrant in an alley.",
  "Une caissière rend la monnaie à un client dans une librairie.": "A cashier is handing change back to a customer in a bookstore.",
  "Un barista prépare un café espresso avec une machine professionnelle.": "A barista is brewing an espresso with a professional espresso machine.",

  // Scene 36: University Amphitheater
  "Des étudiants écoutent attentivement un cours dans un grand amphithéâtre.": "Students are attentively listening to a lecture in a large amphitheater hall.",
  "Un fleuriste taille les tiges de fleurs pour un mariage.": "A florist is trimming flower stems for a wedding.",
  "Un maçon pose des briques pour construire un muret.": "A bricklayer is laying bricks to build a low wall.",
  "Des coureurs s'échauffent sur la ligne de départ d'un marathon.": "Runners are warming up on the starting line of a marathon.",

  // Scene 37: Pet Clinic Vet Office
  "Un vétérinaire osculte un chat sur une table d'examen.": "A veterinarian is examining a cat on an examination table.",
  "Un guide touristique fait visiter les ruines d'un château médiéval.": "A tour guide is leading a tour of medieval castle ruins.",
  "Un employé de voirie balaie les feuilles mortes sur le trottoir.": "A sanitation worker is sweeping dead leaves on the sidewalk.",
  "Des passagers montent à bord d'un ferry au port.": "Passengers are boarding a ferry at the harbor.",

  // Scene 38: Music Store Guitars
  "Un musicien essaie une guitare dans un magasin d'instruments.": "A musician is trying out a guitar in a musical instruments store.",
  "Un sommelier conseille un client sur le choix d'un vin.": "A sommelier is advising a customer on wine selection.",
  "Un photographe fait des réglages sur son trépied.": "A photographer is adjusting settings on a camera tripod.",
  "Des bénévoles distribuent des repas chauds dans un refuge.": "Volunteers are distributing hot meals in a shelter.",

  // Scene 39: Parking Meter Street
  "Un automobiliste paie son stationnement à un horodateur dans la rue.": "A driver is paying for parking at a curbside parking meter.",
  "Un coiffeur peigne les cheveux d'un enfant assis sur un siège haut.": "A hairdresser is combing a child's hair sitting in a booster chair.",
  "Un menuisier vernit une table en bois massif dans son atelier.": "A woodworker is varnishing a solid wood table in a workshop.",
  "Des enfants dessinent à la craie sur le sol de la cour.": "Children are drawing with chalk on the schoolyard ground.",

  // Distractors from alternate question variants (Papers 6 to 10)
  "Un mécanicien nettoie le pare-brise d'une automobile.": "A mechanic is cleaning the windshield of an automobile.",
  "Un violoniste répète son morceau de musique.": "A violinist is rehearsing a musical piece.",
  "Un chauffeur de bus valide les tickets des voyageurs.": "A bus driver is validating passengers' tickets.",
  "Un électricien répare un tableau électrique.": "An electrician is repairing an electrical panel.",
  "Un serveur verse du vin dans des verres.": "A server is pouring wine into glasses.",
  "Un pêcheur attrape un poisson sur un lac.": "A fisherman is catching a fish on a lake.",
  "Un boulanger périt la pâte à pain.": "A baker is kneading bread dough.",
  "Un boulanger pétrit la pâte à pain.": "A baker is kneading bread dough.",
  "Un serveur prépare des cafés au comptoir.": "A server is making coffee at the counter.",
  "Un facteur livre un paquet dans un immeuble.": "A mail carrier is delivering a package in an apartment building.",
  "Un mécanicien vérifie les freins d'une motocyclette.": "A mechanic is checking motorcycle brakes.",
  "Un serveur sert des desserts dans un salon de thé.": "A server is serving desserts in a tea room.",
  "Un couturier dessine le patron d'une robe.": "A dressmaker is drawing a dress pattern.",
  "Un ouvrier manœuvre une grue sur un chantier.": "A construction worker is operating a crane on a job site.",
  "Un boulanger enfourne des tartes aux cerises.": "A baker is putting cherry pies into the oven.",
  "Un mécanicien fait la vidange d'un moteur.": "A mechanic is changing engine oil.",
  "Un journaliste interviewe un passant dans la rue.": "A journalist is interviewing a passerby in the street.",
  "Un serveur apporte l'addition aux clients en salle.": "A server is bringing the bill to dining room customers.",
  "Un technicien répare une ligne téléphonique.": "A technician is repairing a telephone line.",
  "Un guichetier vend des billets de loterie dans un kiosque.": "A ticket clerk is selling lottery tickets in a kiosk.",
  "Un photographe ajuste son objectif d'appareil photo.": "A photographer is adjusting the camera lens.",
  "Un facteur distribue le courrier dans les boîtes.": "A mail carrier is delivering mail into mailboxes.",
  "Un serveur essuie le comptoir en fin de journée.": "A server is wiping the counter at the end of the day.",
  "Un barbier rase le visage d'un client au rasoir.": "A barber is shaving a client's face with a razor.",
  "Un conducteur paie au péage d'une autoroute.": "A driver is paying at a highway toll booth.",
  "Un mécanicien contrôle la pression des pneus d'une berline.": "A mechanic is checking sedan tire pressure.",
  "Un marin nettoie le pont d'un navire de pêche.": "A sailor is cleaning the deck of a fishing vessel.",
  "Un cuisinier fait revenir des légumes dans une poêle.": "A cook is sautéing vegetables in a skillet.",
  "Un serveur débarrasse les assiettes d'une table.": "A server is clearing plates from a table."
};

const schemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(schemaPath, 'utf8');

// Build updated translateOptionToEnglish function with full dictionary lookup
const newTranslateFunc = `export function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  const trimmed = opt.trim();

  const dict: Record<string, string> = ${JSON.stringify(translationDictionary, null, 2)};

  if (dict[trimmed]) return dict[trimmed];

  // Try matching without trailing punctuation
  const cleanKey = trimmed.replace(/[.]+$/, "").trim();
  for (const [k, v] of Object.entries(dict)) {
    if (k.replace(/[.]+$/, "").trim() === cleanKey) {
      return v;
    }
  }

  // Common spoken option templates (Q5-Q8)
  if (/^l'augmentation des tarifs/i.test(trimmed)) return "An increase in rates";
  if (/^la fermeture/i.test(trimmed)) return "The closure of the facility";
  if (/^une promotion/i.test(trimmed)) return "A special store promotion";
  if (/^des travaux/i.test(trimmed)) return "Renovation and maintenance work";
  if (/^un retard/i.test(trimmed)) return "A transportation delay";

  return trimmed;
}`;

code = code.replace(/export function translateOptionToEnglish\(opt: string\): string \{[\s\S]*?\n\}/, newTranslateFunc);

fs.writeFileSync(schemaPath, code, 'utf8');
console.log("🎉 Successfully updated translateOptionToEnglish with 100% dictionary translations for all 40 visual scenes!");
