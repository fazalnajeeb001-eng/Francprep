import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(examSchemaPath, 'utf8');

const fnDef = `function translateOptionToEnglish(opt: string): string {
  if (!opt) return "";
  let s = opt;

  s = s.replace("Un usager demande un renseignement à un guichet d'information de gare.", "A passenger asks for information at a station information desk.")
       .replace("Un mécanicien vérifie la pression des pneus d'une voiture dans un garage.", "A mechanic checks the tire pressure of a car in a garage.")
       .replace("Une personne paie ses achats avec une carte bancaire au supermarché.", "A person pays for purchases with a bank card at a supermarket.")
       .replace("Un serveur apporte une boisson chaude à une table en terrasse de café.", "A waiter brings a hot drink to a table at a sidewalk café.")
       .replace("Un facteur dépose une lettre dans une boîte aux lettres résidentielle.", "A mail carrier delivers a letter to a residential mailbox.")
       .replace("Un médecin ausculte un patient avec un stéthoscope dans un cabinet.", "A doctor examines a patient with a stethoscope in a medical office.")
       .replace("Une femme choisit un livre sur une étagère dans une bibliothèque.", "A woman chooses a book from a shelf in a library.")
       .replace("Un jardinier taille des buissons dans un parc public de la ville.", "A gardener trims bushes in a city public park.")
       .replace("Un voyageur montre son billet de bus au conducteur en montant.", "A traveler shows their bus ticket to the driver while boarding.")
       .replace("Une cliente règle ses achats en espèces auprès du caissier.", "A customer pays for purchases in cash to the cashier.")
       .replace("Un technicien répare un ordinateur portable sur un bureau de travail.", "A technician repairs a laptop on a workbench.")
       .replace("Une personne composte des épluchures de légumes dans un bac.", "A person composts vegetable peels in an outdoor bin.")
       .replace("Un usager achète un titre de transport à une borne automatique.", "A passenger buys a transit ticket at an automated kiosk.")
       .replace("Une femme demande son chemin à un passant dans une rue piétonne.", "A woman asks for directions from a passerby in a pedestrian street.")
       .replace("Un livreur dépose un carton sur le pas d'une porte d'entrée.", "A delivery worker places a box on the doorstep.")
       .replace("Des passagers attendent l'arrivée de leur vol dans une salle d'embarquement.", "Passengers wait for their flight arrival in a boarding lounge.")
       .replace("Un cuisinier découpe des légumes sur une planche dans une cuisine.", "A chef chops vegetables on a cutting board in a kitchen.")
       .replace("Un client essaie une paire de chaussures dans un magasin de sport.", "A customer tries on a pair of shoes in a sporting goods store.")
       .replace("Un pompier déroule un tuyau d'incendie lors d'un exercice d'entraînement.", "A firefighter unrolls a fire hose during a training drill.")
       .replace("Une personne arrose des plantes vertes sur le balcon d'un appartement.", "A person waters green plants on an apartment balcony.")
       .replace("Un coiffeur lave les cheveux d'une cliente avant une coupe.", "A hair stylist washes a client's hair before a haircut.")
       .replace("Un boulanger dispose des baguettes fraîches dans des paniers en osier.", "A baker places fresh baguettes into wicker baskets.")
       .replace("Une personne valide son passe de transport au portillon du métro.", "A person taps their transit pass at the subway turnstile.")
       .replace("Un peintre applique de la peinture fraîche sur la façade d'un bâtiment.", "A painter applies fresh paint to a building facade.")
       .replace("Un infirmier prend la tension d'un patient.", "A nurse takes a patient's blood pressure.")
       .replace("Des passagers montent à bord d'un taxi à une station en ville.", "Passengers board a taxi at a downtown taxi stand.")
       .replace("Des jardiniers arrosent les fleurs d'un jardin public.", "Gardeners water flowers in a public park.")
       .replace("Un client parcourt des ouvrages sur les étagères d'une librairie.", "A customer browses books on shelves in a bookstore.")
       .replace("Un mécanicien vérifie les freins d'une motocyclette.", "A mechanic checks motorcycle brakes.")
       .replace("Un maître-nageur surveille une plage surveillée.", "A lifeguard watches over a supervised beach.")
       .replace("Un chauffeur charge du fret dans une camionnette.", "A driver loads cargo into a van.")
       .replace("Un charpentier fabrique un meuble en bois.", "A carpenter builds wooden furniture.")
       .replace("Un client choisit une monture de lunettes chez un opticien.", "A customer selects eyeglass frames at an optician.")
       .replace("Un arbitre siffle une faute pendant un match.", "A referee blows the whistle during a game.")
       .replace("Un contrôleur vérifie les billets dans le train.", "A conductor checks tickets on a train.")
       .replace("Des visiteurs admirent des tableaux accrochés dans une galerie de musée.", "Visitors admire paintings hanging in a museum gallery.")
       .replace("Un cuisinier dresse des assiettes pour le service du soir.", "A chef plates meals for evening service.")
       .replace("Un fermier ramasse des légumes dans son potager.", "A farmer harvests vegetables from a garden.")
       .replace("Un coiffeur applique une coloration capillaire.", "A hairdresser applies hair dye.")
       .replace("Des clients achètent des glaces auprès d'un marchand ambulant.", "Customers buy ice cream from a street vendor.")
       .replace("Un serrurier remplace la serrure d'une porte d'entrée.", "A locksmith replaces a front door lock.")
       .replace("Un pompier inspecte un extincteur de sécurité.", "A firefighter inspects a safety extinguisher.")
       .replace("Un comptable vérifie des factures sur un ordinateur.", "An accountant verifies invoices on a computer.")
       .replace("Un plongeur explore les fonds marins.", "A diver explores the seabed.")
       .replace("Des consommateurs achètent des fruits frais sur un marché en plein air.", "Shoppers buy fresh fruit at an outdoor market.")
       .replace("Un réparateur ajuste la chaîne d'une bicyclette.", "A mechanic adjusts a bicycle chain.")
       .replace("Un hôte d'accueil accueille des visiteurs dans une exposition.", "A receptionist greets visitors at an exhibition.")
       .replace("Un usager demande un itinéraire au guichet d'information de la gare.", "A commuter asks for directions at a station info counter.")
       .replace("Un couturier dessine le patron d'une robe.", "A tailor draws a dress pattern.")
       .replace("Un ouvrier manœuvre une grue sur un chantier.", "A worker operates a crane on a construction site.")
       .replace("Un serveur sert des desserts dans un salon de thé.", "A waiter serves desserts in a tea room.")
       .replace("Une personne lave son linge dans une laverie automatique.", "A person washes clothes at a laundromat.")
       .replace("Un journaliste interviewe un passant dans la rue.", "A journalist interviews a passerby on the street.")
       .replace("Un boulanger enfourne des tartes aux cerises.", "A baker bakes cherry pies in an oven.")
       .replace("Un client regarde des bijoux exposés dans la vitrine d'une bijouterie.", "A customer looks at jewelry displayed in a shop window.")
       .replace("Un steward ferme les coffres à bagages d'un avion.", "A flight attendant closes overhead luggage bins on a plane.")
       .replace("Un agriculteur conduit un tracteur dans un champ.", "A farmer drives a tractor in a field.")
       .replace("Un plombier répare une fuite sous un évier.", "A plumber fixes a leak under a sink.")
       .replace("Un serveur prépare un sandwich derrière le comptoir d'une cafétéria.", "A server prepares a sandwich behind a cafeteria counter.")
       .replace("Un déménageur transporte un meuble lourd dans les escaliers.", "A mover carries heavy furniture up stairs.")
       .replace("Un maître d'hôtel accueille les clients à l'entrée du restaurant.", "A head waiter greets guests at the restaurant entrance.")
       .replace("Un botaniste étudie des plantes sous une serre.", "A botanist studies plants inside a greenhouse.")
       .replace("Un bricoleur choisit des outils dans un magasin de bricolage.", "A handyman selects tools in a hardware store.")
       .replace("Un marin dresse la voile d'un voilier.", "A sailor hoists a sailboat sail.")
       .replace("Un masseur prodigue un soin dans un spa.", "A masseur provides a spa treatment.")
       .replace("Des skieurs s'équipent au pied des pistes enneigées d'une station.", "Skiers suit up at the base of snowy ski slopes.")
       .replace("Un guichetier vend des billets de loterie dans un kiosque.", "A clerk sells lottery tickets at a kiosk.")
       .replace("Un technicien répare une ligne téléphonique.", "A technician repairs a telephone line.")
       .replace("Un photographe ajuste son objectif d'appareil photo.", "A photographer adjusts a camera lens.")
       .replace("Des étudiants écoutent attentivement un cours dans un grand amphithéâtre.", "Students listen attentively to a lecture in a large auditorium.")
       .replace("Un facteur distribue le courrier dans les boîtes.", "A mail carrier delivers mail into boxes.")
       .replace("Un vétérinaire osculte un chat sur une table d'examen.", "A vet examines a cat on an exam table.")
       .replace("Un barbier rase le visage d'un client au rasoir.", "A barber shaves a client's face with a razor.")
       .replace("Un conducteur paie au péage d'une autoroute.", "A driver pays at a highway toll booth.")
       .replace("Un musicien essaie une guitare dans un magasin d'instruments.", "A musician tries a guitar in an instrument shop.")
       .replace("Un bagagiste transporte des valises sur un chariot.", "A porter moves luggage on a cart.")
       .replace("Un automobiliste paie son stationnement à un horodateur dans la rue.", "A driver pays for parking at a street parking meter.");

  if (s === opt) {
    s = s.replace("Départ du train", "Train departure")
         .replace("Offre promotionnelle", "Promotional offer")
         .replace("Annonce de pluie", "Rain announcement")
         .replace("Demande de rappel", "Callback request")
         .replace("Réparation terminée", "Repair completed")
         .replace("Report du rendez-vous", "Appointment rescheduled")
         .replace("L'interdiction", "Interdiction of")
         .replace("La fermeture", "Closure of")
         .replace("L'annulation", "Cancellation of")
         .replace("La hausse", "Increase of")
         .replace("La baisse", "Decrease of")
         .replace("Le maintien", "Maintenance of")
         .replace("La création", "Creation of")
         .replace("La suppression", "Suppression of");
  }

  return s;
}\n\n`;

// Insert translateOptionToEnglish before generateListeningQuestions
const targetAnchor = 'function generateListeningQuestions(';
if (!code.includes(targetAnchor)) {
  console.error("❌ Target anchor 'function generateListeningQuestions(' not found!");
  process.exit(1);
}

// Remove any duplicate translateOptionToEnglish
code = code.replace(/function translateOptionToEnglish[\s\S]*?(?=function generateListeningQuestions)/g, '');

const parts = code.split(targetAnchor);
code = parts[0] + fnDef + targetAnchor + parts[1];

fs.writeFileSync(examSchemaPath, code);
console.log("✅ Successfully inserted translateOptionToEnglish into src/lib/examSchema.ts!");
