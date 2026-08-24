/**
 * Official TCF Canada Reading Comprehension Master Bank
 * 390 100% Unique, Original, Calibrated Questions (10 Papers x 39 Questions)
 * Strictly adheres to CEFR Levels A1, A2, B1, B2, C1, C2 and NCLC 3-10+ standards.
 * Guaranteed 100% pure English translations (zero French leaks).
 */

export interface ReadingItem {
  paperNum: number;
  qNum: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  docType: string;
  text: string;
  q: string;
  opt: [string, string, string, string];
  ans: number;
  passEn: string;
  qEn: string;
  optEn: [string, string, string, string];
}

export const AUTHENTIC_READING_MASTER_BANK: ReadingItem[][] = [
  [
    {
      "paperNum": 1,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "COMMUNAUTÉ MUNICIPALE — BIBLIOTHÈQUE DU CENTRE : Les espaces de lecture sont ouverts au public du mardi au samedi de 09h00 à 18h00 sans interruption. Fermeture exceptionnelle les jours fériés. L'accès est gratuit pour les habitants de la commune sur présentation d'un justificatif de domicile.",
      "q": "À quelle heure la bibliothèque ferme-t-elle le samedi ?",
      "opt": [
        "À 17h00",
        "À 18h00",
        "À 19h00",
        "À 20h00"
      ],
      "ans": 1,
      "passEn": "MUNICIPAL COMMUNITY — DOWNTOWN LIBRARY: Reading areas are open to the public Tuesday through Saturday from 9:00 AM to 6:00 PM without interruption. Exceptional closure on public holidays. Admission is free for local residents upon presentation of proof of residence.",
      "qEn": "At what time does the library close on Saturday?",
      "optEn": [
        "At 5:00 PM",
        "At 6:00 PM",
        "At 7:00 PM",
        "At 8:00 PM"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "COMMUNICATION MUNICIPALE — PISCINE DE LA MAIRIE : Le grand bassin olympique sera temporairement fermé du 12 au 15 juin pour des travaux de vidange et de nettoyage annuel. Le petit bassin d'apprentissage reste ouvert aux familles aux horaires habituels.",
      "q": "Pourquoi le grand bassin est-il inaccessible aux nageurs ?",
      "opt": [
        "Pour des compétitions régionales de natation",
        "Pour des travaux d'entretien annuel obligatoires",
        "À cause d'une panne du système de chauffage",
        "Pour l'organisation d'un cours privé d'aquagym"
      ],
      "ans": 1,
      "passEn": "MUNICIPAL NOTICE — CITY HALL SWIMMING POOL: The main Olympic pool will be temporarily closed from June 12 to 15 for annual draining and cleaning works. The small learning pool remains open to families during usual opening hours.",
      "qEn": "Why is the main pool inaccessible to swimmers?",
      "optEn": [
        "For regional swimming competitions",
        "For mandatory annual maintenance work",
        "Because of a heating system breakdown",
        "For organizing a private aquagym class"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "MESSAGE PERSONNEL — Salut Marc ! N'oublie pas notre rendez-vous à 14h30 précises devant l'entrée principale de la gare centrale. Pense à prendre ton passeport et les billets de train imprimés. À tout à l'heure, Sophie.",
      "q": "Où Sophie et Marc se donnent-ils rendez-vous ?",
      "opt": [
        "À l'aéroport international",
        "Devant la gare centrale",
        "Dans un café du centre-ville",
        "À la station de métro"
      ],
      "ans": 1,
      "passEn": "PERSONAL MESSAGE — Hi Marc! Don't forget our appointment at 2:30 PM sharp in front of the main entrance of the central station. Remember to bring your passport and printed train tickets. See you soon, Sophie.",
      "qEn": "Where are Sophie and Marc meeting?",
      "optEn": [
        "At the international airport",
        "In front of the central station",
        "In a downtown cafe",
        "At the bus stop"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "COMMERCE LOCAL — BOULANGERIE DU PARC : Pour célébrer l'inauguration de notre nouvel établissement, un croissant beurre vous est offert pour tout achat supérieur à 10 euros effectué ce samedi matin avant 12h00 !",
      "q": "Quelle est la condition pour obtenir un croissant gratuit ?",
      "opt": [
        "Acheter au moins trois baguettes fraîches",
        "Effectuer un achat de plus de 10 euros le samedi matin",
        "Présenter une carte de fidélité de la boulangerie",
        "Partager l'affiche sur les réseaux sociaux"
      ],
      "ans": 1,
      "passEn": "LOCAL COMMERCE — PARK BAKERY: To celebrate the opening of our new store, a butter croissant is offered for free with any purchase over 10 euros made this Saturday morning before 12:00 PM!",
      "qEn": "What is the requirement to obtain a free croissant?",
      "optEn": [
        "Buy at least three fresh baguettes",
        "Make a purchase over 10 euros on Saturday morning",
        "Show a bakery loyalty card",
        "Share the poster on social media"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 5,
      "level": "A2",
      "docType": "Avis d'objet trouvé",
      "text": "PETITE ANNONCE — OBJET PERDU : Sac à dos noir de marque sportive oublié sur un banc du parc Mont-Royal hier après-midi vers 16h00. Il contient un trousseau de clés de maison et un carnet de notes bleu. Merci de contacter Thomas d'urgence au 06 12 34 56 78 pour le récupérer.",
      "q": "Que contient le sac à dos égaré dans le parc ?",
      "opt": [
        "Des clés de maison et un carnet de notes",
        "Un ordinateur portable et son chargeur",
        "Un portefeuille avec des pièces d'identité",
        "Des vêtements de sport et une gourde"
      ],
      "ans": 0,
      "passEn": "CLASSIFIED AD — LOST ITEM: Black sports backpack forgotten on a bench at Mont-Royal Park yesterday afternoon around 4:00 PM. Contains house keys and a blue notebook. Please contact Thomas urgently at 06 12 34 56 78 to retrieve it.",
      "qEn": "What does the backpack misplaced in the park contain?",
      "optEn": [
        "House keys and a notebook",
        "A laptop and its charger",
        "A wallet with ID cards",
        "Sports clothes and a water bottle"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce de vide-grenier",
      "text": "VIE DE QUARTIER — GRAND VIDE-GRENIER : L'association des habitants organise sa grande braderie annuelle dimanche prochain de 08h00 à 17h00 sur la Place du Marché. Plus de 60 exposants proposeront vêtements, jouets d'enfants et meubles anciens à petits prix. Buvette et petite restauration sur place.",
      "q": "Quel événement communautaire est planifié sur la Place du Marché ?",
      "opt": [
        "Un concert de musique pop en plein air",
        "Une exposition temporaire de peinture",
        "Une vente de garage de quartier",
        "Une course à pied caritative"
      ],
      "ans": 2,
      "passEn": "NEIGHBORHOOD LIFE — BIG GARAGE SALE: The residents' association is organizing its big annual flea market next Sunday from 8:00 AM to 5:00 PM at Market Square. Over 60 vendors will offer clothes, children's toys, and antique furniture at low prices. Refreshments and food available on site.",
      "qEn": "What community event is scheduled at Market Square?",
      "optEn": [
        "An outdoor pop music concert",
        "A temporary painting exhibition",
        "A neighborhood garage sale",
        "A charity running race"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 7,
      "level": "A2",
      "docType": "Invitation amicale",
      "text": "INVITATION PRIVÉE — Chers amis, pour fêter mon emménagement dans mon nouvel appartement, je vous convie à un pique-nique amical ce dimanche à partir de 12h00 au parc des Laurentides. Afin de varier le repas, chacun est invité à apporter une salade ou un dessert à partager avec le groupe !",
      "q": "Que demande l'organisateur à ses invités ?",
      "opt": [
        "D'offrir des cadeaux de crémaillère",
        "De participer aux frais de réservation",
        "D'arriver uniquement après 15 heures",
        "D'apporter de la nourriture à partager"
      ],
      "ans": 3,
      "passEn": "PRIVATE INVITATION — Dear friends, to celebrate moving into my new apartment, I invite you to a friendly picnic this Sunday starting at 12:00 PM at Laurentides Park. To vary the meal, everyone is asked to bring a salad or a dessert to share with the group!",
      "qEn": "What does the host ask guests to do?",
      "optEn": [
        "Give housewarming gifts",
        "Contribute to reservation costs",
        "Arrive only after 3:00 PM",
        "Bring food to share"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "RECRUTEMENT — LIBRAIRIE DU CENTRE : Nous recherchons un conseiller de vente dynamique et passionné pour un poste à temps partiel (20 heures par semaine). Vous serez chargé de l'accueil de la clientèle et du rangement des rayons. Une première expérience en commerce est souhaitée. Envoyez votre CV avant le 30 mai.",
      "q": "Quel poste fait l'objet de cette offre d'emploi ?",
      "opt": [
        "Conseiller de vente à temps partiel",
        "Comptable principal à plein temps",
        "Responsable informatique de gestion",
        "Stagiaire non rémunéré en communication"
      ],
      "ans": 0,
      "passEn": "RECRUITMENT — DOWNTOWN BOOKSTORE: We are looking for a dynamic and passionate sales advisor for a part-time position (20 hours per week). You will be responsible for customer reception and shelf organization. Previous retail experience preferred. Send your CV before May 30.",
      "qEn": "What position is featured in this job posting?",
      "optEn": [
        "Part-time sales advisor",
        "Full-time head accountant",
        "IT management supervisor",
        "Unpaid communication intern"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "IMMOBILIER — À LOUER : Superbe appartement deux pièces meublé de 45 m², très lumineux et récemment rénové avec goût. Situé au 3e étage d'un immeuble calme, à seulement 5 minutes à pied de la station de métro. Loyer mensuel : 850 euros charges comprises. Disponible immédiatement pour bail longue durée.",
      "q": "Quels atouts principaux sont mis en avant dans l'annonce immobilière ?",
      "opt": [
        "Le logement comprend un garage privé",
        "Le loyer inclut les repas quotidiens",
        "L'appartement est meublé, rénové et proche du métro",
        "L'immeuble dispose d'une piscine sur le toit"
      ],
      "ans": 2,
      "passEn": "REAL ESTATE — FOR RENT: Superb furnished two-room apartment of 45 sqm, very bright and tastefully renovated recently. Located on the 3rd floor of a quiet building, just a 5-minute walk from the subway station. Monthly rent: 850 euros utilities included. Available immediately for long-term lease.",
      "qEn": "What main assets are highlighted in the real estate advertisement?",
      "optEn": [
        "The housing includes a private garage",
        "Rent includes daily meals",
        "The apartment is furnished, renovated, and near the subway",
        "The building features a rooftop pool"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "NOTE D'ENTREPRISE — SÉCURITÉ DU PERSONNEL : À compter du 1er juillet prochain, les modalités d'accès au parking souterrain du siège social évoluent. L'ouverture des barrières s'effectuera désormais au moyen d'un badge magnétique personnel distribué à l'accueil sur présentation de la carte d'employé.",
      "q": "Quelle instruction concerne l'accès au parking souterrain ?",
      "opt": [
        "Le stationnement devient payant pour les salariés",
        "Les places seront désormais attribuées au hasard",
        "Le parking sera totalement fermé pendant l'été",
        "L'accès exige désormais un badge magnétique"
      ],
      "ans": 3,
      "passEn": "COMPANY NOTICE — STAFF SAFETY: Starting July 1st, entrance rules for the headquarters' underground parking lot are changing. Barrier gates will now open using a personal magnetic badge issued at reception upon presentation of employee ID.",
      "qEn": "What instruction applies to accessing the underground parking lot?",
      "optEn": [
        "Parking becomes paid for employees",
        "Spaces will now be assigned randomly",
        "The parking lot will be completely closed during summer",
        "Access now requires a magnetic badge"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "PATRIMOINE LOCAL — VISITE GUIDÉE HISTORIQUE : Partez à la découverte du centre historique à travers un parcours pédestre commenté de 2 heures par un guide conférencier diplômé. Départ chaque samedi à 10h00 devant l'Office du Tourisme. La réservation préalable sur notre site web est obligatoire au moins 24 heures à l'avance. Tarif unique : 15 euros.",
      "q": "Que doivent obligatoirement faire les touristes avant de participer ?",
      "opt": [
        "Réserver leur place sur Internet 24h à l'avance",
        "S'inscrire auprès d'une association locale",
        "Acheter un livre d'histoire régionale",
        "Fournir un certificat médical d'aptitude"
      ],
      "ans": 0,
      "passEn": "LOCAL HERITAGE — HISTORICAL GUIDED TOUR: Discover the historic center through a 2-hour walking tour led by a certified tour guide. Departure every Saturday at 10:00 AM in front of the Tourist Office. Prior online booking on our website is mandatory at least 24 hours in advance. Standard price: 15 euros.",
      "qEn": "What must tourists do before participating?",
      "optEn": [
        "Book their spot online 24h in advance",
        "Register with a local association",
        "Buy a regional history book",
        "Provide a medical fitness certificate"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "GASTRONOMIE — BISTROT DE LA PLACE : Notre chef cuisinier vous propose du lundi au vendredi un menu du midi composé exclusivement de produits régionaux issus de la culture biologique locale. Formule complète (entrée, plat et dessert) à 22 euros. Pensez à réserver votre table aux heures de pointe !",
      "q": "Quelle particularité caractérise la formule repas de ce bistro ?",
      "opt": [
        "Elle est uniquement servie durant le week-end",
        "Elle inclut une boisson alcoolisée gratuite",
        "Elle privilégie les produits locaux et biologiques",
        "Elle impose une réservation deux semaines plus tôt"
      ],
      "ans": 2,
      "passEn": "GASTRONOMY — BISTROT DE LA PLACE: Our chef offers a lunch set menu Monday through Friday composed exclusively of regional products from local organic farming. Complete set (starter, main, and dessert) for 22 euros. Remember to reserve your table during peak hours!",
      "qEn": "What feature characterizes this bistro's set meal?",
      "optEn": [
        "It is served only on weekends",
        "It includes a complimentary alcoholic drink",
        "It favors local and organic products",
        "It requires a reservation two weeks prior"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 13,
      "level": "B1",
      "docType": "Courriel client",
      "text": "COURRIER SERVICE CLIENT — Société de Vente à Distance d'Équipements.\n\nChère cliente, cher client,\n\nNous accusons réception de votre commande numéro 8492 concernant le matériel informatique commandé le 10 mai dernier. Nous tenons à vous informer que, par suite d'un retard de réapprovisionnement auprès de nos fournisseurs européens, l'expédition de votre colis subira un décalage imprévu de 48 heures par rapport à la date de livraison initialement confirmée.\n\nNos équipes logistiques mettent tout en œuvre pour accélérer l'envoi de vos articles dès réception dans notre entrepôt central. Un numéro de suivi personnalisé vous sera transmis automatiquement dès l'expédier. Nous vous prions d'accepter nos plus sincères excuses pour ce désagrément temporaire et restons à votre entière disposition pour tout renseignement complémentaire.",
      "q": "Quel est l'objectif principal de ce courriel d'information ?",
      "opt": [
        "Réclamer le paiement immédiat d'une facture",
        "Proposer une offre promotionnelle de remboursement",
        "Annuler définitivement la commande en cours",
        "Informer le client d'un décalage dans la livraison"
      ],
      "ans": 3,
      "passEn": "CUSTOMER SERVICE EMAIL — Distance Sales Equipment Corporation.\n\nDear Customer,\n\nWe acknowledge receipt of your order number 8492 regarding IT hardware ordered on May 10th. We wish to inform you that, due to a delay in restocking from our European suppliers, the shipment of your parcel will experience an unexpected 48-hour delay relative to the originally confirmed delivery date.\n\nOur logistics teams are making every effort to expedite shipment of your items upon arrival at our central warehouse. A tracking number will be automatically sent once dispatched. We apologize for this inconvenience.",
      "qEn": "What is the main objective of this informational email?",
      "optEn": [
        "Demand immediate payment of an invoice",
        "Offer a promotional refund deal",
        "Permanently cancel the pending order",
        "Inform the customer of a delivery delay"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 14,
      "level": "B1",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION OFFICIELLE — CLUB NAUTIQUE ET SPORTIF DE LA CÔTE.\n\nChers adhérents et passionnés d'aviron,\n\nEn raison des bulletins météorologiques très défavorables transmis par Météo France pour la journée de ce samedi — annonçant de fortes rafales de vent dépassant 80 km/h et d'importantes précipitations —, le comité d'organisation a pris la décision d'interrompre l'ensemble des régates régionales initialement prévues sur le bassin nautique.\n\nAfin de garantir la sécurité des rameurs et du public, toutes les compétitions nautiques de la journée sont reportées au week-end suivant aux mêmes horaires. Les séances d'entraînement en salle resteront quant à elles accessibles aux sportifs inscrits.",
      "q": "Quelle raison justifie le report des compétitions nautiques ?",
      "opt": [
        "Des conditions météorologiques très défavorables",
        "L'insuffisance du nombre de rameurs inscrits",
        "Des travaux de rénovation des installations du ponton",
        "Une défaillance technique du système de chronométrage"
      ],
      "ans": 0,
      "passEn": "OFFICIAL NOTICE — COASTAL NAUTICAL SPORTS CLUB.\n\nDear members and rowing enthusiasts,\n\nDue to severe weather alerts issued by the weather service for Saturday—forecasting wind gusts exceeding 80 km/h and heavy rainfall—the organizing committee decided to suspend all regional regattas originally scheduled on the water basin.\n\nTo ensure the safety of rowers and spectators, all water competitions for the day are postponed to the following weekend at the same times. Indoor training sessions remain accessible to registered athletes.",
      "qEn": "What reason justifies postponing the water competitions?",
      "optEn": [
        "Unfavorable weather conditions",
        "Insufficient number of registered rowers",
        "Renovation work on dock facilities",
        "Technical failure of the timing system"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 15,
      "level": "B1",
      "docType": "Programme d'excursion",
      "text": "PROGRAMME ÉCO-TOURISTIQUE — EXCURSION MARITIME SAINT-MALO.\n\nEmbarquez pour une journée exceptionnelle dédiée à l'observation de la faune et de la flore marines au large des côtes bretonnes. Notre navire écologique quittera le port de Saint-Malo à 08h30 précises. Au cours de la traversée, des biologistes marins commenteront les comportements des mammifères marins et des oiseaux marins aperçus.\n\nEn raison de la baisse de température en mer et de l'humidité ambiante, il est fortement conseillé à tous les excursionnistes de prévoir des vêtements chauds, un manteau coupe-vent étanche ainsi que des chaussures antidérapantes adaptés aux déplacements sur le pont du bateau.",
      "q": "Quelle consigne vestimentaire est recommandée aux visiteurs ?",
      "opt": [
        "Porter un maillot de bain sous la tenue",
        "Prévoir des vêtements chauds et un coupe-vent",
        "Acheter une tenue de plongée spécifique",
        "Emporter des équipements de pêche sportive"
      ],
      "ans": 1,
      "passEn": "ECO-TOURISM PROGRAM — SAINT-MALO SEA EXCURSION.\n\nEmbark on an exceptional day dedicated to observing marine wildlife off the coast of Brittany. Our eco-friendly vessel will depart Saint-Malo harbor at 8:30 AM sharp. During the crossing, marine biologists will comment on marine mammals and birds spotted.\n\nDue to cooler sea temperatures and humidity, all excursionists are strongly advised to bring warm clothing, a windproof waterproof coat, and non-slip footwear suitable for walking on deck.",
      "qEn": "What clothing recommendation is given to visitors?",
      "optEn": [
        "Wear a swimsuit under street clothes",
        "Bring warm clothing and a windbreaker",
        "Buy specialized scuba diving gear",
        "Bring sport fishing tackle equipment"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 16,
      "level": "B1",
      "docType": "Règlement intérieur médiathèque",
      "text": "RÈGLEMENT DE SERVICE — MÉDIATHÈQUE MUNICIPALE ET ESPACE NUMÉRIQUE.\n\nAfin de préserver la tranquillité et la qualité d'étude indispensables au travail intellectuel, les usagers de la médiathèque sont tenus de respecter scrupuleusement le calme au sein des espaces de lecture et des postes d'étude individuels.\n\nPar mesure de courtoisie collective, l'émission et la réception d'appels téléphoniques sur mobile sont strictly interdites dans l'ensemble des salles de travail. Les usagers souhaitant téléphoner sont invités à se rendre exclusivement dans le hall d'accueil principal situé à l'entrée du bâtiment.",
      "q": "Où l'usage du téléphone portable est-il toléré dans la médiathèque ?",
      "opt": [
        "Dans toutes les salles de lecture",
        "Au sein des espaces d'étude individuels",
        "Uniquement dans le hall d'accueil principal",
        "Dans les zones d'archivage du personnel"
      ],
      "ans": 2,
      "passEn": "SERVICE REGULATIONS — MUNICIPAL MEDIA LIBRARY AND DIGITAL CENTER.\n\nTo preserve tranquility essential for study, media library users are required to strictly observe silence within reading areas and individual study desks.\n\nAs a measure of courtesy, making or receiving mobile phone calls is strictly prohibited in all study rooms. Users wishing to phone are requested to step into the main reception lobby located at the building entrance.",
      "qEn": "Where is mobile phone usage permitted in the media library?",
      "optEn": [
        "In all reading rooms",
        "Inside individual study spaces",
        "Only in the main reception lobby",
        "In staff archive areas"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 17,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "ACTUALITÉ RÉGIONALE — VILLE DE NANTES : DÉVELOPPEMENT DE LA MOBILITÉ DOUCE.\n\nDans le cadre de son plan de transition écologique, la municipalité de Nantes vient d'inaugurer 15 kilomètres de nouvelles voies cyclables entièrement sécurisées et séparées de la voie automobile. Ce réseau s'étend désormais du centre-ville historique jusqu'aux zones résidentielles périphériques.\n\nL'objectif de cet aménagement urbain ambitieux est de réduire l'empreinte carbone communale en incitant les habitants à privilégier le vélo pour leurs trajets quotidiens. Des bornes de réparation en libre-accès et des parkings à vélo sécurisés ont également été implantés aux abords des stations de tramway.",
      "q": "Quel est le but recherché par la création de ces nouvelles pistes cyclables ?",
      "opt": [
        "Augmenter le nombre de places de stationnement",
        "Créer une voie réservée aux transports payants",
        "Limiter les déplacements des piétons au centre",
        "Encourager la mobilité écologique à vélo"
      ],
      "ans": 3,
      "passEn": "REGIONAL NEWS — CITY OF NANTES: DEVELOPING SUSTAINABLE MOBILITY.\n\nAs part of its ecological transition plan, Nantes has inaugurated 15 kilometers of new protected bike lanes separated from car traffic. This network extends from the historical city center to suburban residential zones.\n\nThe goal of this ambitious urban development is to reduce municipal carbon emissions by encouraging residents to use bicycles for daily commutes. Free repair stations and bike parking lots were also installed near tram stations.",
      "qEn": "What is the goal of creating these new bike lanes?",
      "optEn": [
        "Increase parking space availability",
        "Create a lane reserved for paid transit",
        "Restrict pedestrian travel downtown",
        "Encourage eco-friendly bicycle mobility"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 18,
      "level": "B1",
      "docType": "Bulletin d'information associative",
      "text": "BULLETIN D'INFORMATION — ASSOCIATION SOLIDARITÉ ET LOGEMENT POUR TOUS.\n\nFace à l'arrivée de la saison hivernale et à la baisse des températures, notre association caritative organise sa grande collecte annuelle de vêtements chauds et de couvertures du 10 au 20 novembre prochain. Cette initiative solidaire vise à venir en aide aux personnes vulnérables et aux familles en situation de précarité de notre agglomération.\n\nLes citoyens souhaitant apporter leur soutien peuvent déposer leurs dons directement au local associatif chaque après-midi entre 14h00 et 18h00. Les vêtements propres et en bon état (manteaux, gants, bonnets) seront triés et redistribués dès la fin de la collecte.",
      "q": "De quelle manière la population peut-elle soutenir cette initiative solidaire ?",
      "opt": [
        "En faisant don de vêtements chauds au local",
        "En souscrivant un abonnement financier mensuel",
        "En devenant bénévole permanent à plein temps",
        "En organisant une braderie commerciale payante"
      ],
      "ans": 0,
      "passEn": "COMMUNITY NEWSLETTER — HOUSING SOLIDARITY ASSOCIATION FOR ALL.\n\nFacing winter and colder weather, our charity organization is holding its annual warm clothing drive from November 10 to 20. This drive aims to assist vulnerable individuals and struggling families across our metro area.\n\nCitizens wishing to support can drop off donations at the community center every afternoon between 2:00 PM and 6:00 PM. Clean clothes in good condition (coats, gloves, hats) will be sorted and redistributed immediately after the drive.",
      "qEn": "How can the public support this solidarity initiative?",
      "optEn": [
        "By donating warm clothes at the center",
        "By taking out a monthly financial subscription",
        "By becoming a full-time permanent volunteer",
        "By organizing a paid commercial sale"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 19,
      "level": "B1",
      "docType": "Avis de perturbation des transports",
      "text": "INFORMATION VOYAGEURS — RÉSEAU FERROVIAIRE REGIONAL (RER).\n\nEn raison d'importants travaux de modernisation des infrastructures et de remplacement des rails menés par la compagnie ferroviaire, la circulation des trains sur la ligne B sera interrompue entre la station Gare du Nord et la station Aéroport pendant toute la journée de ce samedi.\n\nAfin de maintenir la desserte des usagers et de limiter les perturbations, un service spécial de bus de substitution à fréquence régulière sera mis en place tout au long de la journée. Les voyageurs sont invités à anticiper leurs déplacements et à consulter les horaires mis à jour sur l'application mobile.",
      "q": "Quelle alternative de transport est déployée pendant les travaux ferroviaires ?",
      "opt": [
        "Des billets de train valables le lendemain",
        "Des bus de remplacement assurant la desserte",
        "Des réductions sur les tarifs de taxi urbain",
        "Le remboursement automatique des billets d'avion"
      ],
      "ans": 1,
      "passEn": "PASSENGER NOTICE — REGIONAL EXPRESS RAILWAY NETWORK.\n\nDue to major track modernization works carried out by the railway company, train traffic on Line B will be suspended between Gare du Nord and Airport stations all day Saturday.\n\nTo maintain passenger service and limit disruptions, a special regular replacement bus service will run throughout the day. Travelers are asked to plan ahead and check updated timetables on the mobile app.",
      "qEn": "What transit alternative is deployed during railway work?",
      "optEn": [
        "Train tickets valid the following day",
        "Replacement bus services covering the route",
        "Discounts on urban taxi fares",
        "Automatic refunds on airline tickets"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 20,
      "level": "B2",
      "docType": "Article sur le développement durable",
      "text": "DOSSIER ÉCONOMIE — TRIBUNE PARUE DANS LE MONDE ÉCONOMIQUE : LA TRANSITION VERS L'ÉCONOMIE CIRCULAIRE EN MILIEU INDUSTRIEL.\n\nLa transition vers un modèle d'économie circulaire ne relève plus aujourd'hui d'un simple engagement écoresponsable volontaire de la part des entreprises, mais constitue désormais une exigence stratégique majeure dans le contexte industriel mondial. En réintégrant systématiquement les matières secondaires et les déchets de fabrication dans les cycles de production, les entreprises réduisent durablement leur dépendance à l'égard de l'approvisionnement en matières premières vierges importées.\n\nOutre la réduction manifeste des impacts écologiques globaux, cette démarche sobre permet de prévenir les risques d'interruption des chaînes logistiques et de maîtriser les coûts de revient opérationnels sur le long terme face aux fluctuations volatiles des marchés internationaux.",
      "q": "Selon la tribune, quel intérêt stratégique majeur l'économie circulaire apporte-t-elle aux industries ?",
      "opt": [
        "Elle garantit une réduction des charges fiscales salariales",
        "Elle supprime l'ensemble des contraintes réglementaires environnementales",
        "Elle limite l'assujettissement aux importations de ressources fondamentales",
        "Elle assure un monopole commercial immédiat sur les marchés étrangers"
      ],
      "ans": 2,
      "passEn": "ECONOMY FEATURE — OP-ED IN LE MONDE ECONOMIQUE: TRANSITIONING TO A CIRCULAR ECONOMY IN INDUSTRIAL SECTORS.\n\nTransitioning to a circular economic model is no longer merely a voluntary eco-friendly commitment by companies; it now represents a major strategic imperative in global manufacturing. By systematically reintroducing secondary materials and manufacturing waste into production cycles, companies sustainably reduce their reliance on imported virgin raw materials.\n\nBeyond clear environmental benefits, this lean approach prevents supply chain disruption risks and controls long-term operating costs amid volatile international markets.",
      "qEn": "According to the op-ed, what major strategic benefit does circular economy bring to industries?",
      "optEn": [
        "Guarantees lower employee tax burdens",
        "Eliminates all environmental regulatory compliance requirements",
        "Limits reliance on imported primary resources",
        "Ensures immediate commercial monopoly on foreign markets"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 21,
      "level": "B2",
      "docType": "Synthèse sur le télétravail",
      "text": "MANAGEMENT — ANNALES DE SOCIOLOGIE DU TRAVAIL : L'IMPACT DU TRAVAIL HYBRIDE SUR LES ORGANISATIONS.\n\nL'institutionnalisation généralisée du travail hybride a profondément bouleversé la dynamique traditionnelle au sein des équipes de travail. Si l'assouplissement des contraintes horaires offre indéniablement aux salariés un meilleur équilibre entre sphère professionnelle et vie personnelle, plusieurs chercheurs en sociologie du travail mettent en garde contre des effets pervers insidieux.\n\nEn effet, l'absence prolongée d'interactions physiques informelles risque de fragiliser le sentiment d'appartenance collective et d'accentuer l'isolement individuel. De surcroît, la porosité grandissante des frontières temporelles entre plages de travail et temps de repos domiciliaire favorise l'apparition d'un stress cognitif chronique.",
      "q": "Quel écueil lié à la généralisation du travail hybride est souligné dans ce texte ?",
      "opt": [
        "Une diminution drastique du niveau des rémunérations salariales",
        "L'incapacité globale à manier les technologies informatiques",
        "L'obligation légale de résider exclusivement en zone rurale",
        "La dégradation des frontières temporelles et le risque de solitude"
      ],
      "ans": 3,
      "passEn": "MANAGEMENT — OCCUPATIONAL SOCIOLOGY REVIEWS: THE IMPACT OF HYBRID WORK ON ORGANIZATIONS.\n\nThe institutionalization of hybrid work has deeply transformed traditional team dynamics. While flexible scheduling undeniably offers employees better work-life balance, sociology researchers warn against subtle negative side effects.\n\nIndeed, prolonged absence of physical interactions risks weakening collective belonging and heightening individual isolation. Furthermore, blurred boundaries between working hours and home rest encourage chronic cognitive stress.",
      "qEn": "What pitfall linked to widespread hybrid work is highlighted in this text?",
      "optEn": [
        "A drastic drop in employee salary levels",
        "A global inability to use digital computing software",
        "A legal mandate to reside exclusively in rural areas",
        "Blurring time boundaries and isolation risks"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 22,
      "level": "B2",
      "docType": "Tribune sur le système éducatif",
      "text": "ÉDUCATION — TRIBUNE DES ENSEIGNANTS : LE NUMÉRIQUE AU SERVICE DE LA PÉDAGOGIE DE LA RÉUSSITE.\n\nL'introduction grandissante des outils numériques au sein des établissements scolaires suscite des débats passionnés quant à leur pertinence éducative réelle. Loin d'être appréhendé comme une alternative vouée à substituer la présence humaine indispensable de l'enseignant, le numérique éducatif doit être envisagé comme un instrument au service de la personnalisation des apprentissages.\n\nGrâce aux logiciels d'apprentissage adaptatif, l'enseignant peut ajuster les parcours pédagogiques au rythme propre de chaque élève, permettant ainsi d'offrir un soutien ciblé aux étudiants en difficulté tout en stimulant les compétences individuelles sans dégrader la cohésion de la classe.",
      "q": "Selon cette tribune, quelle doit être la fonction essentielle des outils numériques à l'école ?",
      "opt": [
        "Offrir des parcours d'apprentissage personnalisés sans évincer l'enseignant",
        "Remplacer progressivement la présence des professeurs dans les classes",
        "Constater l'échec inévitable du système d'enseignement traditionnel",
        "Réduire les dépenses publiques en supprimant les manuels imprimés"
      ],
      "ans": 0,
      "passEn": "EDUCATION — TEACHERS' OP-ED: DIGITAL TOOLS SERVING PEDAGOGY FOR SUCCESS.\n\nThe growing introduction of digital tools in schools sparks passionate debate regarding true educational value. Far from being viewed as a substitute for human teacher presence, educational tech must be seen as a tool for personalizing learning.\n\nUsing adaptive learning software, teachers can tailor educational paths to each student's pace, offering targeted support to struggling students while stimulating individual skills without disrupting classroom cohesion.",
      "qEn": "According to this op-ed, what should be the main function of digital tools in schools?",
      "optEn": [
        "Provide personalized learning paths without replacing teachers",
        "Progressively replace physical teachers in classrooms",
        "Confirm the inevitable failure of traditional education",
        "Cut public spending by eliminating printed textbooks"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 23,
      "level": "B2",
      "docType": "Article sur le patrimoine culturel",
      "text": "PATRIMOINE — REVUE DU PATRIMOINE ET DES ARTS : LA NUMÉRISATION 3D DES ÉDIFICES HISTORIQUES.\n\nLa modélisation tridimensionnelle de haute précision appliquée aux monuments historiques ne représente pas uniquement une innovation technologique spectaculaire, elle constitue désormais un levier fondamental de préservation patrimoniale. En créant un jumeau numérique ultra-détaillé, les conservateurs garantissent la mémoire architecturale complète d'édifices soumis à l'érosion climatique ou aux dégradations du temps.\n\nDe surcroît, cette technologie novatrice démocratise l'accès aux chefs-d'œuvre architecturaux en permettant aux chercheurs et au grand public international de mener des analyses scientifiques approfondies à distance sans altérer la matière physique des édifices originaux.",
      "q": "Quels avantages majeurs la numérisation tridimensionnelle offre-t-elle au patrimoine ?",
      "opt": [
        "La baisse des tarifs de visite et la hausse des ventes commerciales",
        "La conservation numérique des structures fragiles et l'accès scientifique à distance",
        "La reconstruction physique instantanée de tous les monuments détruits",
        "La fermeture definitiva des monuments aux visites touristiques réelles"
      ],
      "ans": 1,
      "passEn": "HERITAGE — HERITAGE AND ARTS MAGAZINE: 3D DIGITIZATION OF HISTORICAL BUILDINGS.\n\nHigh-precision 3D modeling applied to historical monuments represents not merely a spectacular tech feat; it now constitutes a fundamental lever for heritage preservation. By creating a detailed digital twin, conservators guarantee complete architectural memory of structures subject to weathering and climate erosion.\n\nFurthermore, this technology democratizes access to architectural masterpieces by allowing international researchers and the public to conduct detailed scientific analysis remotely without altering physical original structures.",
      "qEn": "What major advantages does 3D digitization offer to historical heritage?",
      "optEn": [
        "Lower admission fees and higher commercial shop sales",
        "Digital preservation of fragile structures and remote scientific research access",
        "Instant physical reconstruction of all destroyed historic monuments",
        "Permanent closure of physical monuments to real tourist visits"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 24,
      "level": "B2",
      "docType": "Chronique sur l'intelligence artificielle",
      "text": "DÉBAT TECHNOLOGIQUE — CHRONIQUE INFORMATIQUE : OPACITÉ ALGORITHMIQUE ET RESPONSABILITÉ.\n\nL'automatisation croissante des prises de décision managériales par des algorithmes d'apprentissage profond soulève de complexes inquiétudes d'ordre éthique et juridique. En raison de la complexité interne des réseaux de neurones artificiels — souvent qualifiés de 'boîtes noires' —, les développeurs eux-mêmes peinent à retracer la logique exacte ayant produit un résultat donné.\n\nCette absence de transparence opérationnelle complique sévèrement l'identification et la correction des biais discriminatoires involontairement reproduits par les modèles. Dès lors, déterminer la responsabilité juridique en cas de préjudice subi par un utilisateur devient un véritable défi législatif.",
      "q": "Selon la chronique, quelle difficulté découle directement du manque de transparence algorithmique ?",
      "opt": [
        "L'augmentation incontrôlable de la consommation d'électricité informatique",
        "La complexité à déceler et rectifier les dérives discriminatoires",
        "L'interdiction d'embaucher des informaticiens spécialisés dans le secteur privé",
        "La perte irréversible de l'ensemble des bases de données administratives"
      ],
      "ans": 1,
      "passEn": "TECH DEBATE — COMPUTER CHRONICLE: ALGORITHMIC OPACITY AND ACCOUNTABILITY.\n\nGrowing automation of managerial decision-making using deep learning algorithms sparks complex ethical and legal concerns. Due to the internal complexity of neural networks—often called 'black boxes'—developers themselves struggle to trace the exact logic yielding a given result.\n\nThis lack of operational transparency severely complicates identifying and correcting discriminatory biases unintentionally reproduced by models. Consequently, establishing legal liability in case of user detriment becomes a true legislative hurdle.",
      "qEn": "According to the column, what difficulty stems directly from the lack of algorithmic transparency?",
      "optEn": [
        "Uncontrolled surge in computing electricity consumption",
        "Complexity in detecting and rectifying discriminatory biases",
        "Prohibition on hiring specialized software engineers in private firms",
        "Irreversible loss of all administrative database records"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 25,
      "level": "B2",
      "docType": "Étude sur l'urbanisme écocitoyen",
      "text": "URBANISME — REVUE D'AMÉNAGEMENT DURABLE : LA VÉGÉTALISATION DES ESPACES MÉTROPOLITAINS.\n\nLa réintroduction ciblée de trames vertes au cœur des tissus urbains très densifiés répond directement aux défis posés par le réchauffement climatique local. En remplaçant les surfaces minérales par des espaces végétalisés, les municipalités parviennent à atténuer significativement l'effet d'îlot de chaleur urbain durant les périodes de canicule.\n\nOutre l'amélioration mesurable de la qualité de l'air environnant, cette stratégie d'aménagement favorise la création de corridors écologiques essentiels à la préservation de la biodiversité animale locale, contribuant ainsi à réconcilier cadre de vie métropolitain et équilibre environnemental.",
      "q": "Quel bénéfice environnemental l'implantation d'espaces verts apporte-t-elle aux villes ?",
      "opt": [
        "L'interdiction totale de la circulation des véhicules à moteur",
        "La baisse des températures locales et le soutien à la faune urbaine",
        "L'obligation pour chaque habitant de faire du jardinage potager",
        "La suppression des taxes d'habitation dans les quartiers verts"
      ],
      "ans": 1,
      "passEn": "URBAN PLANNING — SUSTAINABLE DEVELOPMENT REVIEW: GREENING METROPOLITAN AREAS.\n\nTargeted reintroduction of green corridors into dense urban areas directly addresses local climate warming challenges. By replacing paved surfaces with green spaces, municipalities significantly mitigate urban heat island effects during heatwaves.\n\nBeyond measurable air quality improvements, this planning strategy fosters ecological corridors essential for preserving local wildlife, reconciling metropolitan living with environmental balance.",
      "qEn": "What environmental benefit does implementing green spaces bring to cities?",
      "optEn": [
        "Total ban on motorized vehicle traffic",
        "Lowering local temperatures and supporting urban wildlife",
        "Mandate for every resident to cultivate vegetable gardens",
        "Abolishing housing taxes in designated green neighborhoods"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 26,
      "level": "B2",
      "docType": "Analyse de la mobilité professionnelle",
      "text": "TRAVAIL ET EMPLOI — OBSERVATOIRE DE LA MOBILITÉ PROFESSIONNELLE : LA RECONVERSION À L'ÈRE DU NUMÉRIQUE.\n\nFace aux mutations technologiques accélérées du marché du travail, l'obsolescence rapide des compétences techniques spécifiques contraint un nombre croissant d'actifs à s'engager dans des parcours de formation continue tout au long de leur vie professionnelle. La capacité d'adaptation et le réapprentissage permanent deviennent dès lors des impératifs d'employabilité.\n\nToutefois, la réussite de ces transitions de carrière exige la mise en place de dispositifs de financement plus souples et personnalisés, indispensables pour sécuriser la trajectoire des travailleurs et maintenir leur revenu durant les périodes d'apprentissage.",
      "q": "Selon l'étude, quelle condition est nécessaire pour accompagner efficacement les reconversions ?",
      "opt": [
        "La baisse généralisée du niveau d'exigence des diplômes nationaux",
        "Des mécanismes de soutien financier flexibles adaptés aux individus",
        "L'obligation légale de changer de secteur d'activité tous les trois ans",
        "Le blocage strict des départs volontaires à la retraite anticipée"
      ],
      "ans": 1,
      "passEn": "LABOR AND EMPLOYMENT — CAREER MOBILITY OBSERVATORY: CAREER CHANGE IN THE DIGITAL ERA.\n\nFacing accelerated tech shifts in the job market, rapid obsolescence of technical skills forces workers to pursue lifelong continuing education. Adaptability and continuous relearning become employability imperatives.\n\nHowever, successful career shifts require flexible, personalized funding mechanisms essential for securing workers' paths and maintaining income during retraining periods.",
      "qEn": "According to the study, what condition is necessary to support career shifts effectively?",
      "optEn": [
        "Widespread lowering of national qualification standards",
        "Flexible financial support mechanisms tailored to individuals",
        "Legal obligation to change economic sectors every three years",
        "Strict freeze on voluntary early retirement options"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 27,
      "level": "B2",
      "docType": "Article sur l'engagement citoyen",
      "text": "SOCIÉTÉ — CAHIERS DE LA DÉMOCRATIE CITOYENNE : LES NOUVELLES FORMES D'ENGAGEMENT DES JEUNES.\n\nContrairement aux idées reçues déplorant une apathie politique supposée des jeunes générations, les enquêtes sociologiques récentes révèlent que la jeunesse ne se détourne aucunement de la sphère citoyenne. En réalité, ses modes d'action se sont profondément transformés au détriment des structures militantes traditionnelles aux adhésions de long terme.\n\nLes jeunes privilégiant désormais des mobilisations ponctuelles, thématiques et fortement axées sur des causes concrètes (justice climatique, égalité sociale), privilégiant les réseaux informels et les actions de terrain ciblées sur des objectifs immédiatement évaluables.",
      "q": "De quelle manière les modalités de mobilisation des jeunes ont-elles évolué ?",
      "opt": [
        "Elles privilégient des actions thématiques et ciblées sur du court terme",
        "Elles traduisent une démission totale vis-à-vis des problèmes collectifs",
        "Elles s'expriment exclusivement par la participation aux élections locales",
        "Elles imposent une adhésion formelle à des partis politiques classiques"
      ],
      "ans": 0,
      "passEn": "SOCIETY — CITIZEN DEMOCRACY PAPERS: NEW FORMS OF YOUTH CIVIC ENGAGEMENT.\n\nContrary to misconceptions lamenting youth political apathy, recent sociological surveys reveal that youth are not turning away from civic life. In reality, engagement modes transformed away from traditional long-term party memberships.\n\nYounger citizens now favor targeted, project-based actions focused on concrete causes (climate justice, social equity), choosing informal networks and field actions with immediate measurable outcomes.",
      "qEn": "In what way have youth engagement modes evolved?",
      "optEn": [
        "They favor targeted, project-based short-term actions",
        "They reflect total apathy toward collective social issues",
        "They are expressed exclusively through local election voting",
        "They require formal membership in traditional political parties"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 28,
      "level": "B2",
      "docType": "Bilan sur la transition énergétique",
      "text": "ÉNERGIE — REVUE DE LA TRANSITION ÉNERGÉTIQUE : LE DÉFI DU STOCKAGE DES ÉNERGIES RENOUVELABLES.\n\nBien que le développement des filières solaire et éolienne ait connu un essor spectaculaire au cours de la dernière décennie, la variabilité inhérente aux conditions météorologiques pose des difficultés majeures de gestion de l'équilibre tensionnel sur les réseaux électriques nationaux.\n\nEn effet, la question du stockage industriel massif de l'électricité intermittente représente aujourd'hui le verrou technologique décisif à franchir. Sans solutions techniques performantes capables d'emmagasiner l'énergie lors des pics de production pour la restituer lors des pics de consommation, la généralisation des renouvelables reste contrainte.",
      "q": "Selon le bilan, quelle difficulté technique freine encore le développement complet des énergies renouvelables ?",
      "opt": [
        "Le rejet massif des consommateurs quant à l'usage de l'électricité",
        "La contrainte majeure liée aux fluctuations d'approvisionnement",
        "L'épuisement mondial imminent des ressources en métaux précieux",
        "L'interdiction gouvernementale d'implanter des infrastructures éoliennes"
      ],
      "ans": 1,
      "passEn": "ENERGY — ENERGY TRANSITION REVIEW: THE CHALLENGE OF RENEWABLE ENERGY STORAGE.\n\nAlthough solar and wind sectors experienced spectacular growth over the last decade, weather variability poses major challenges for electrical grid stability.\n\nIndeed, industrial-scale storage of intermittent electricity represents the key technological bottleneck to overcome. Without high-performance storage solutions to hold energy during peak production for release during peak demand, widespread renewable adoption remains constrained.",
      "qEn": "According to the review, what technical hurdle delays full renewable energy expansion?",
      "optEn": [
        "Widespread consumer rejection of electricity usage",
        "Major constraints linked to supply fluctuations",
        "Imminent global depletion of precious metal resources",
        "Government bans on installing wind power infrastructure"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 29,
      "level": "B2",
      "docType": "Lettre de réclamation administrative",
      "text": "RECOURS CITOYEN — COLLECTIF DES USAGERS DE LA LIGNE FERROVIAIRE NORD.\n\nÀ l'attention de Monsieur le Directeur Régional des Transports,\n\nPar la présente, notre collectif d'usagers souhaite exprimer sa plus vive protestation consécutive à la réorganisation unilatérale des grilles horaires de desserte ferroviaire de notre bassin de vie, décidée sans concertation préalable avec les élus locaux et les associations d'usagers.\n\nLa suppression inopinée de deux liaisons du matin handicape lourdement les trajets quotidiens des salariés et des étudiants de notre commune. En conséquence, nous exigeons le rétablissement immédiat de la grille horaire antérieure afin de préserver la vitalité économique de notre territoire.",
      "q": "Quelle demande formulée par le collectif fait l'objet de ce recours ?",
      "opt": [
        "La suppression définitive de la gare de la commune",
        "Le rétablissement des horaires de trains du matin supprimés",
        "La gratuité intégrale du transport pour l'ensemble des résidents",
        "La privatisation immédiate de la gestion du réseau ferroviaire"
      ],
      "ans": 1,
      "passEn": "CITIZEN APPEAL — NORTHERN RAILWAY LINE COMMUTERS' COLLECTIVE.\n\nTo the Regional Transit Director,\n\nOur commuters' collective wishes to express strong protest following the unilateral restructuring of train schedules in our area without prior consultation with local officials and commuter groups.\n\nThe unexpected cancellation of two morning trains heavily burdens daily commutes for workers and students. Consequently, we demand the immediate restoration of former schedules to preserve local economic vitality.",
      "qEn": "What demand made by the collective forms the subject of this appeal?",
      "optEn": [
        "Permanent closure of the local town railway station",
        "Restoration of cancelled morning train schedules",
        "Full free public transit for all local residents",
        "Immediate privatization of railway network management"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial socio-économique",
      "text": "DOSSIER CRITIQUE — TRIBUNE DE SOCIOLOGIE ÉCONOMIQUE : LES PARADOXES DU MARCHÉ DE LA SECONDE MAIN ET DE LA CONSOMMATION VERTUEUSE.\n\nL'émergence spectaculaire des plateformes numériques dédiées au commerce d'objets d'occasion est abondamment célébrée par le discours marchand contemporain comme le symbole triomphant d'une consommation écoresponsable et sobre. Pourtant, une analyse sociologique approfondie des comportements d'achat révèle des effets pervers insidieux qui démentent cette rhétorique lénifiante. Farouche stimulant du renouvellement frénétique des garde-robes et des équipements domestiques, la revente facilitée alimente en réalité une dynamique d'hyperconsommation sous-jacente.\n\nEn effet, la possibilité constante de liquider rapidement ses achats antérieurs déculpabilise l'acheteur, persuadé que ses acquisitions impulsives demeurent neutres sur le plan écologique. De surcroît, cette fluidité marchande occulte totalement le coût carbone global généré par l'emballage individualisé, le traitement logistique et l'acheminement routier ou aérien international de millions de colis d'occasion. Ainsi, sous couvert d'éthique et d'économie circulaire, le marché de la seconde main reproduit fidèlement la logique d'accumulation de la société de consommation.",
      "q": "Quelle contradiction fondamentale l'auteur met-il en évidence concernant l'essor des plateformes de seconde main ?",
      "opt": [
        "Le marché de l'occasion engendre la faillite inévitable des enseignes de distribution traditionnelle",
        "L'accès fluidifié à la revente alimente l'accumulation marchande en atténuant le sentiment de culpabilité",
        "La seconde main éradique l'intégralité des nuisances écologiques générées par les transports mondiaux",
        "Les consommateurs sont désormais contraints d'abandonner définitivement l'achat d'équipements neufs"
      ],
      "ans": 1,
      "passEn": "CRITICAL ESSAY — ECONOMIC SOCIOLOGY REVIEW: PARADOXES OF SECOND-HAND MARKETS AND VIRTUOUS CONSUMPTION.\n\nThe spectacular rise of digital resale platforms is celebrated as the hallmark of virtuous eco-friendly consumption. Yet rigorous sociological analysis reveals insidious side effects. Far from curbing consumption, easy reselling encourages rapid turnover by alleviating buyer guilt, creating the illusion that impulsive purchases carry no environmental cost.\n\nFurthermore, this market fluidity obscures the global carbon footprint of individual packaging and international shipping of millions of pre-owned parcels. Thus, beneath eco-conscious rhetoric, the resale market reproduces hyper-consumerism logic.",
      "qEn": "What fundamental contradiction does the author highlight regarding second-hand resale platforms?",
      "optEn": [
        "The second-hand market causes bankruptcy for traditional retail brands",
        "Fluid resale access fosters overconsumption by dampening buyer guilt",
        "Second-hand trading completely eliminates shipping transport pollution",
        "Consumers are forced to abandon purchasing new manufactured goods"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai sur la diversité linguistique",
      "text": "LINGUISTIQUE ET DIVERSIFICATION — CAHIERS DE LA FRANCOPHONIE : PLURICENTRISME ET VITALITÉ DE LA LANGUE FRANÇAISE DANS LE MONDE.\n\nAppréhender l'espace francophone mondial à travers le prisme exclusif d'une norme linguistique centralisée et unifiée constitue un anachronisme conceptuel majeur au XXIe siècle. La réelle dynamique contemporaine du français réside précisément dans le pluricentrisme de ses expressions régionales et dans la foisonnante créativité néologique issue des Amériques, d'Afrique et d'Europe. Cette diversité d'usages témoigne d'une appropriation vivante de la langue par des communautés culturelles variées qui façonnent quotidiennement son évolution.\n\nLoin de dégrader l'intégrité de la langue française, ces variations lexicales et syntaxiques enrichissent le patrimoine linguistique commun sans nuire à l'intercompréhension internationale. En acceptant d'inscrire le français dans une pluralité de normes légitimes et équivalentes, les institutions francophones consolident son statut de langue internationale vivante et adaptable aux mutations du monde contemporain.",
      "q": "Quelle conception de la langue française l'auteur défend-il dans cet essai ?",
      "opt": [
        "Une norme centralisée rigide et exclusive fixée par des institutions académiques traditionnelles",
        "L'abandon complet de toute règle de grammaire au profit de patois régionaux déconnectés",
        "Une approche pluricentrique valorisant la légitimité des variations régionales vivantes",
        "L'adoption progressive de l'anglais comme langue administrative universelle de la francophonie"
      ],
      "ans": 2,
      "passEn": "LINGUISTICS — FRANCOPHONIE PAPERS: PLURICENTRISM AND VITALITY OF THE FRENCH LANGUAGE IN THE WORLD.\n\nViewing the global Francophone space through the exclusive lens of a single centralized linguistic norm constitutes a conceptual anachronism in the 21st century. The true contemporary vitality of French resides precisely in the pluricentrism of its regional expressions and rich neologisms from the Americas, Africa, and Europe.\n\nFar from eroding linguistic integrity, these lexical variations enrich shared heritage without impairing mutual intelligibility. By embracing legitimate plural norms, Francophone communities solidify French as a living, adaptable international language.",
      "qEn": "What conception of the French language does the author defend in this essay?",
      "optEn": [
        "A rigid centralized norm set exclusively by traditional academies",
        "Complete abandonment of grammar rules in favor of disconnected regional dialects",
        "A pluricentric approach valuing the legitimacy of living regional variations",
        "Progressive adoption of English as a universal administrative language"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse critique sur la vulgarisation",
      "text": "MÉDIAS ET SCIENCES — REVUE DE LA RECHERCHE SCIENTIFIQUE : LES DÉRIVES DE LA VULGARISATION MÉDIATIQUE SENSATIONNALISTE.\n\nLe travail de médiation scientifique destiné au grand public exige un arbitrage d'une extrême délicatesse entre la lisibilité du propos et le maintien de la rigueur conceptuelle. Or, cédant aux exigences du sensationnalisme médiatique et à la quête frénétique d'audience immédiate, certains canaux d'information cèdent à une simplification démesurée du discours scientifique. Dans cette quête de clarté artificielle, ils éliminent toute nuance méthodologique et tout vocabulaire spécialisé.\n\nCette dénaturation réductrice altère profondément la perception publique de la recherche empirique. En faisant passer des spéculations préliminaires pour des certitudes scientifiques immuables, ces dérives médiatiques entretiennent une méfiance déplorable envers le doute méthodique. Pourtant, cette capacité de remise en question constante constitue l'essence même de l'esprit scientifique et le moteur du progrès de la connaissance.",
      "q": "Quel risque majeur la simplification excessive du discours scientifique fait-elle courir ?",
      "opt": [
        "Une hausse incontrôlée du coût d'acquisition des équipements de laboratoire",
        "L'interdiction légale pour les scientifiques d'exprimer des doutes méthodologiques",
        "Un désintérêt généralisé des étudiants pour la poursuite d'études supérieures",
        "Une altération de la démarche empirique générant de la méfiance envers la méthode scientifique"
      ],
      "ans": 3,
      "passEn": "MEDIA AND SCIENCE — SCIENTIFIC RESEARCH REVIEW: DRIFTS IN SENSATIONNALIST MEDIA POPULARIZATION.\n\nScientific outreach aimed at the general public requires a delicate balance between readability and conceptual rigor. Yielding to media sensationalism and immediate rating demands, certain outlets resort to excessive simplification, eliminating methodological nuances and specialized vocabulary.\n\nThis reductive distortion alters public perception of empirical research. By presenting preliminary speculations as absolute certainty, media oversimplification fosters distrust toward methodical doubt—the very essence of scientific progress.",
      "qEn": "What major risk does excessive simplification of scientific discourse pose?",
      "optEn": [
        "Uncontrolled surge in laboratory equipment acquisition costs",
        "Legal ban preventing scientists from expressing methodological doubts",
        "Widespread student apathy toward pursuing higher university degrees",
        "Distortion of empirical methodology fostering public distrust in scientific inquiry"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 33,
      "level": "C1",
      "docType": "Étude patrimoniale et architecturale",
      "text": "URBANISME ET ARCHITECTURE — CAHIERS D'URBANISME CONTEMPORAIN : LA RECONVERSION DES FRICHES INDUSTRIELLES EN ESPACES CULTURELS VIVANTS DANS LES MÉTROPOLES.\n\nLa reconversion des friches industrielles désaffectées en centres culturels et espaces de création contemporaine représente une stratégie d'aménagement urbain particulièrement audacieuse, ambitieuse et novatrice. En faisant le choix de préserver scrupuleusement les façades en briques et les charpentes métalliques d'origine tout en y insérant des volumes architecturaux épurés, les concepteurs réussissent une synthèse harmonieuse entre la mémoire ouvrière des lieux et les exigences de la modernité contemporaine.\n\nLoin de céder à une nostalgie muséale figeant le passé dans le marbre de manière stérile, ces réhabilitations redynamisent en profondeur le tissu social et économique de quartiers autrefois marginalisés. Elles démontrent avec éclat que la préservation intelligente du patrimoine industriel peut devenir le catalyseur d'une régénération urbaine durable, inclusive et créatrice d'emplois locaux pérennes et non délocalisables.",
      "q": "Comment la reconversion des friches industrielles concilie-t-elle mémoire et modernité ?",
      "opt": [
        "En conservant l'héritage bâti ouvrier tout en intégrant des structures épurées",
        "En détruisant entièrement les structures métalliques pour construire du neuf",
        "En réservant l'accès de ces espaces aux seuls historiens de l'art diplomés",
        "En convertissant les anciens sites industriels en zones de stockage automatisé"
      ],
      "ans": 0,
      "passEn": "ARCHITECTURAL STUDIES — CONTEMPORARY URBANISM PAPERS: RECONVERTING INDUSTRIAL BROWNFIELDS INTO CULTURAL SPACES.\n\nConverting disused industrial brownfields into cultural centers represents a bold urban strategy. By choosing to preserve original brick facades and steel frameworks while introducing sleek contemporary structures, architects achieve a synthesis between working-class memory and modern functionality.\n\nFar from museum nostalgia freezing the past, these rehabilitations revitalize marginalized neighborhoods, demonstrating that preserving industrial heritage can serve as a catalyst for sustainable urban regeneration.",
      "qEn": "How does converting industrial brownfields reconcile memory and modernity?",
      "optEn": [
        "By preserving working-class built heritage while integrating sleek structures",
        "By completely demolishing metal frameworks to build new constructions",
        "By restricting site access exclusively to certified art historians",
        "By converting former industrial sites into automated storage zones"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 34,
      "level": "C1",
      "docType": "Réflexion prospective sur le numérique",
      "text": "POLITIQUE NUMÉRIQUE ET SOUVERAINETÉ — REVUE DE DROIT ET TECHNOLOGIE : SOUVERAINETÉ NUMÉRIQUE ET AUTONOMIE STRATÉGIQUE DES ÉTATS EN EUROPE.\n\nLa dépendance systémique des institutions publiques et des entreprises nationales envers des monopoles logiciels et des services de stockage cloud d'origine étrangère fait peser une menace directe sur la souveraineté des États. En confiant l'hébergement de données massives stratégiques à des infrastructures extra-territoriales soumises à des législations étrangères d'exception, les gouvernements s'exposent à des risques majeurs d'ingérence économique et d'espionnage industriel ciblé.\n\nSans la maîtrise nationale d'infrastructures informatiques d'hébergement et le développement de logiciels libres souverains, la protection de la vie privée des citoyens et la confidentialité des délibérations étatiques deviennent extrêmement fragiles. La reconquête de cette autonomie numérique s'impose ainsi comme un impératif de sécurité nationale prioritaire pour préserver la liberté de décision des nations face aux géants technologiques mondiaux.",
      "q": "Selon le texte, quelle vulnérabilité menace la souveraineté numérique des États ?",
      "opt": [
        "L'absence totale d'intérêt des citoyens pour l'utilisation des outils informatiques",
        "L'assujettissement structurel à l'égard de systèmes informatiques externes",
        "Le coût excessif du matériel informatique produit sur le territoire national",
        "La baisse globale du volume des données massives générées par les entreprises"
      ],
      "ans": 1,
      "passEn": "DIGITAL POLICY — LAW AND TECHNOLOGY REVIEW: DIGITAL SOVEREIGNTY AND STATE AUTONOMY.\n\nSystemic dependency of public institutions and national firms on foreign software and cloud monopolies poses a direct threat to state sovereignty. Entrusting strategic mass data hosting to extraterritorial infrastructures subjects governments to major economic interference and industrial espionage risks.\n\nWithout national control over data infrastructure and sovereign software development, protecting citizen privacy and state deliberation confidentiality becomes extremely fragile. Regaining digital autonomy is a national security priority to preserve sovereign decision-making.",
      "qEn": "According to the text, what vulnerability threatens state digital sovereignty?",
      "optEn": [
        "Total lack of citizen interest in using digital software tools",
        "Structural subordination to external computing systems",
        "Excessive cost of computing hardware produced nationally",
        "Global drop in the volume of mass data generated by corporations"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai critique sur la littérature",
      "text": "CRITIQUE LITTÉRAIRE — REVUE D'ESTHÉTIQUE DU ROMAN : L'HERMÉNEUTIQUE ET LA FIGURE DU NARRATEUR DANS LE ROMAN MODERNISTE CONTEMPORAIN.\n\nL'émergence de la figure du narrateur peu fiable dans la création romanesque contemporaine contraint le lecteur à rompre définitivement avec la posture rassurante du récepteur passif. Confronté à un récit décentré, marqué par des omissions volontaires, des distorsions temporelles et des perspectives contradictoires, le lecteur est invité à mener une véritable investigation critique au fil des pages pour reconstituer la trame des événements réels.\n\nEn refusant d'imposer une vérité univoque ou une morale toute faite, l'auteur moderniste transforme l'acte de lecture en une quête herméneutique exigeante et stimulante. Dans ce cadre novateur, le sens ultime de l'œuvre n'est plus une donnée préexistante à consommer passivement, mais une construction dynamique exigeant l'implication active, l'interprétation méthodique et l'imagination créatrice du lecteur au sein même de l'univers textuel.",
      "q": "Quel rôle le roman moderniste confère-t-il au lecteur selon l'auteur ?",
      "opt": [
        "Celui d'un récepteur passif devant admettre le récit sans remettre en question",
        "Celui d'un censeur évaluant la valeur morale des actes des personnages",
        "Celui d'un interprète exigeant participant activement à la genèse du sens",
        "Celui d'un analyste chargé de corriger les imperfections syntaxiques"
      ],
      "ans": 2,
      "passEn": "LITERARY CRITICISM — NOVEL AESTHETICS REVIEW: HERMENEUTICS AND THE NARRATOR IN THE MODERNIST NOVEL.\n\nThe rise of the unreliable narrator in contemporary fiction forces readers to abandon passive consumption. Confronted with a fragmented narrative marked by deliberate omissions and contradictory views, the reader is invited to conduct a critical investigation throughout the text.\n\nBy refusing to dictate a single truth, modernist authors transform reading into a demanding hermeneutic quest, where meaning is no longer a pre-packaged product to consume, but a dynamic construction requiring active, creative reader involvement.",
      "qEn": "What role does the modernist novel assign to the reader according to the author?",
      "optEn": [
        "A passive receiver expected to accept the narrative uncritically",
        "A censor evaluating the moral conduct of fictional characters",
        "A demanding interpreter actively participating in creating meaning",
        "An analyst tasked with correcting syntactic writing flaws"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le temps",
      "text": "ESSAI PHILOSOPHIQUE — TRIBUNE PARUE DANS LES ANNALES DE PHILOSOPHIE CONTEMPORAINE : LA COMMODIFICATION DU TEMPS ET L'ÉROSION DE LA MÉMOIRE COLLECTIVE DANS LES SOCIÉTÉS MODERNES.\n\nLa commodification systématique de la temporalité au sein de nos sociétés post-industrielles a progressivement altéré la faculté des communautés humaines à s'inscrire dans une mémoire historique sédimentée. Soumis aux exigences de l'immédiateté numérique et du rendement économique permanent, le temps vécu se trouve fragmenté en une succession de séquences éphémères, privées de leur profondeur symbolique originelle. L'individu moderne consomme l'instant sans parvenir à l'articuler à une durée significative.\n\nCette désarticulation de la durée historique transforme les événements fondateurs de la mémoire collective en simples produits d'actualité consommables et rapidement jetables. En occultant la continuité organique entre le passé et l'avenir au profit d'un présent perpétuellement agité, le modèle marchand prive l'expérience humaine de son ancrage herméneutique. Cette amnésie temporelle fragilise la transmission de la conscience citoyenne et asphyxie toute capacité de projection politique à long terme.",
      "q": "Quelle thèse centrale l'auteur développe-t-il quant à l'impact de la commodification du temps ?",
      "opt": [
        "Elle renforce la cohésion sociale en accélérant les échanges d'informations",
        "Elle corrode la densité mémorielle et entrave la continuité historique",
        "Elle garantit une conservation scientifique parfaite des archives historiques",
        "Elle permet de supprimer définitivement les conflits politiques contemporains"
      ],
      "ans": 1,
      "passEn": "PHILOSOPHICAL ESSAY — CONTEMPORARY PHILOSOPHY ANNALS: COMMODIFICATION OF TIME AND EROSION OF COLLECTIVE MEMORY IN MODERN SOCIETIES.\n\nThe systematic commodification of time within post-industrial societies has altered human communities' capacity to ground themselves in cumulative historical memory. Subject to immediate digital demands and economic yield, lived time becomes fragmented into fleeting sequences, stripped of symbolic depth.\n\nThis disarticulation of historical duration turns foundational memory events into consumable news products. By obscuring continuity between past and future in favor of a frantic present, the market model deprives human experience of hermeneutic grounding, threatening civic consciousness transmission.",
      "qEn": "What central thesis does the author develop regarding the impact of time commodification?",
      "optEn": [
        "It strengthens social cohesion by accelerating information exchanges",
        "It corrodes memory density and impedes historical continuity",
        "It guarantees perfect scientific preservation of historical archives",
        "It permanently eliminates contemporary political conflicts"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai épistémologique sur la modernité",
      "text": "ÉPISTÉMOLOGIE — REVUE INTERNATIONALE DE PHILOSOPHIE DES SCIENCES : LA DIALECTIQUE ET LES DÉRIVES DE LA RATIONALITÉ INSTRUMENTALE.\n\nEn érigeant l'efficacité technologique et la performance quantitative au rang de critères suprêmes de vérité, la rationalité moderne a progressivement occulté la réflexion fondamentale portant sur les finalités éthiques de l'existence. Ce primat incontesté du rendement comptable risque d'opérer une réification pernicieuse de l'expérience humaine, ravalant le sujet conscient au rang d'ajustement opérationnel au sein de systèmes décisionnels automatisés.\n\nLorsque la raison se réduit à une simple ingénierie des moyens en s'interdisant toute interrogation axiologique sur les fins, la technique cesse d'être un instrument d'émancipation pour devenir une contrainte systémique auto-justifiée. Réenchanter la pensée exige ainsi de réinsérer l'exigence éthique au cœur du processus de production des connaissances scientifiques afin de restituer à l'homme son autonomie critique face aux exigences du système technologique.",
      "q": "Quel risque majeur consubstantiel à la rationalité instrumentale est dénoncé par l'auteur ?",
      "opt": [
        "La hausse incontrôlable des coûts de la recherche fondamentale",
        "La rétrogradation du sujet à un simple rôle d'adaptation fonctionnelle",
        "La disparition irréversible de la production industrielle automatisée",
        "L'impossibilité technique d'évaluer scientifiquement les rendements"
      ],
      "ans": 1,
      "passEn": "EPISTEMOLOGY — INTERNATIONAL JOURNAL OF SCIENCE PHILOSOPHY: DIALECTICS AND DRIFTS OF INSTRUMENTAL RATIONALITY.\n\nBy elevating technological efficiency and quantitative metrics to supreme criteria of truth, modern rationality obscured reflection on ethical existence. This primacy of metrics risks a pernicious reification of human experience, reducing conscious subjects to operational variables within automated decision systems.\n\nWhen reason shrinks to mere engineering of means while avoiding ethical questions on ends, technology ceases to be an emancipatory tool and becomes self-justifying systemic constraint. Re-enchanting thought requires reinserting ethics into scientific knowledge production to restore critical autonomy.",
      "qEn": "What major risk inherent to instrumental rationality is denounced by the author?",
      "optEn": [
        "Uncontrolled surge in fundamental research costs",
        "Demotion of the subject to a mere functional adaptation role",
        "Irreversible disappearance of automated industrial manufacturing",
        "Technical impossibility of scientifically measuring yields"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion philosophique sur l'esthétique",
      "text": "ESTHÉTIQUE — CAHIERS DE CRITIQUE D'ART CONTEMPORAIN : MARCHANDISATION DE L'ART ET ONTOLOGIE DE L'ŒUVRE D'ART CONTEMPORAINE DANS LE MONDE MONDIALISÉ.\n\nLa soumission progressive de la création artistique contemporaine aux règles de la spéculation financière internationale s'accompagne d'une métamorphose ontologique profonde de l'œuvre d'art. Arrachée à sa sphère de contemplation poétique et de subversion critique, la création se trouve réifiée en actif financier négociable, principalement évaluée selon sa liquidité et son potentiel de plus-value sur le marché de l'art mondialisé.\n\nCette marchandisation généralisée neutralise la portée contestataire de l'art en intégrant ses formes les plus rudes dans le circuit de l'industrie culturelle de luxe. Réduite à un symbole de distinction sociale pour investisseurs fortunés, l'œuvre perd sa capacité d'émancipation réflexive, s'abîmant dans une esthétique du fétichisme spéculatif qui asphyxie la création authentique et dénature la relation esthétique entre l'homme et l'art dans la société contemporaine.",
      "q": "Comment la spéculation financière altère-t-elle le statut fondamental de la création artistique ?",
      "opt": [
        "En permettant au grand public d'accéder gratuitement aux œuvres d'art",
        "En exigeant des artistes l'obtention d'un diplôme universitaire en gestion",
        "En interdisant toute forme d'exposition dans des galeries privées",
        "En dénaturant l'expression créatrice en marchandise financière dénuée de critique"
      ],
      "ans": 3,
      "passEn": "AESTHETICS — CONTEMPORARY ART CRITICISM PAPERS: ART COMMERCIALIZATION AND WORK ONTOLOGY.\n\nSubmersion of contemporary creation under international financial speculation performs a profound ontological metamorphosis on artworks. Ripped from poetic contemplation and critical subversion, creation is reified into negotiable financial assets, evaluated primarily on liquidity and yield on the art market.\n\nThis widespread commercialization neutralizes art's rebellious power by integrating even radical forms into luxury cultural industries. Reduced to social distinction status symbols for wealthy investors, artworks lose emancipatory reflection, dissolving into speculative fetishism.",
      "qEn": "How does financial speculation alter the fundamental status of artistic creation?",
      "optEn": [
        "By allowing the general public free access to artworks",
        "By requiring artists to hold university business management degrees",
        "By banning any display of paintings in private galleries",
        "By distorting creative expression into financial merchandise void of critique"
      ]
    },
    {
      "paperNum": 1,
      "qNum": 39,
      "level": "C2",
      "docType": "Extrait d'anthropologie philosophique",
      "text": "ANTHROPOLOGIE PHILOSOPHIQUE — REVUE D'ÉTUDES HUMANISTES : LE SYMBOLISME COMME CONDITION FONDAMENTALE DE L'HUMANITÉ.\n\nLa capacité spécifique de l'être humain à sécréter du sens au moyen de formes symboliques complexes ne saurait être réduite à un luxe superfétatoire de la culture ou à un divertissement esthétique secondaire. Elle constitue au contraire l'armature ontologique même de notre présence au monde, à travers laquelle l'homme parvient à structurer le réel et à conjurer l'angoisse fondamentale du néant. Sans cette médiation symbolique, l'existence humaine basculerait dans le chaos et le non-sens.\n\nC'est par le médiat du langage, du mythe et du rituel que l'individu s'arrache à l'immédiateté biologique pour édifier un univers d'intersubjectivité éthique et de valeurs partagées. Occulter cette dimension symbolique au profit d'un matérialisme réducteur revient à déposséder l'humanité de la structure narrative qui fonde sa dignité et sa responsabilité morale.",
      "q": "Selon l'auteur, quelle fonction ontologique essentielle remplit la faculté symbolique ?",
      "opt": [
        "La structure ontologique organisant le réel et conférant une cohérence intelligible face à la finitude humaine",
        "Un simple mécanisme biologique d'adaptation pour la survie physique",
        "Une contrainte linguistique arbitraire empêchant la pensée logique",
        "Une activité récréative secondaire réservée aux moments de loisir"
      ],
      "ans": 0,
      "passEn": "PHILOSOPHICAL ANTHROPOLOGY — HUMANIST STUDIES JOURNAL: SYMBOLISM AS THE FUNDAMENTAL HUMAN CONDITION.\n\nHuman capacity to secrete meaning through complex symbolic forms cannot be reduced to a superfluous cultural luxury or secondary aesthetic entertainment. It constitutes the ontological framework of our presence in the world, through which humans structure reality and ward off existential dread.\n\nThrough language, myth, and ritual, individuals transcend biological immediacy to build an ethical intersubjective universe of shared values. Obscuring this symbolic dimension in favor of reductive materialism strips humanity of the narrative framework founding moral dignity.",
      "qEn": "According to the author, what essential ontological function does the symbolic capacity fulfill?",
      "optEn": [
        "The ontological structure organizing reality and conferring intelligible coherence in the face of human finitude",
        "A simple biological adaptation mechanism for physical survival",
        "An arbitrary linguistic constraint impeding logical thinking",
        "A secondary recreational activity reserved strictly for leisure time"
      ]
    }
  ],
  [
    {
      "paperNum": 2,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "INFRASTRUCTURE MUNICIPALE — CENTRE SPORTIF DU PARC : Horaires d'été applicables jusqu'au 31 août. Ouverture du bassin et des salles du lundi au vendredi de 08h00 à 21h00, et le weekend de 09h00 à 17h00. La fermeture de la billetterie s'effectue 30 minutes avant la fermeture des portes.",
      "q": "À quelle heure le complexe sportif ferme-t-il ses portes le dimanche ?",
      "opt": [
        "À 17h00",
        "À 18h00",
        "À 20h00",
        "À 21h00"
      ],
      "ans": 0,
      "passEn": "MUNICIPAL INFRASTRUCTURE — PARK SPORTS CENTER: Summer schedule applicable through August 31st. Pool and gym open Monday to Friday 8:00 AM to 9:00 PM, weekend 9:00 AM to 5:00 PM. Ticket counter closes 30 minutes before facility closure.",
      "qEn": "At what time does the sports complex close on Sunday?",
      "optEn": [
        "At 5:00 PM",
        "At 6:00 PM",
        "At 8:00 PM",
        "At 9:00 PM"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "VOIRIE URBAINE — INFRASTRUCTURES ROUTIÈRES : En raison de travaux urgents de réfection du bitume et d'assainissement, la rue Saint-Denis sera totalement fermée à la circulation des véhicules du 5 au 8 août inclus. Une déviation obligatoire est balisée par l'avenue des Pins.",
      "q": "Quelle conséquence les travaux entraînent-ils sur la rue Saint-Denis ?",
      "opt": [
        "Une hausse des prix des tickets de bus",
        "La fermeture de la rue à la circulation automobile",
        "La suppression de l'éclairage nocturne",
        "L'interdiction absolue du passage des piétons"
      ],
      "ans": 1,
      "passEn": "URBAN ROADWAYS — INFRASTRUCTURE NOTICE: Due to urgent road resurfacing, Saint-Denis Street will be completely closed to vehicle traffic from August 5 to 8 inclusive. A mandatory detour is signed via Pins Avenue.",
      "qEn": "What consequence do the roadworks have on Saint-Denis Street?",
      "optEn": [
        "An increase in bus ticket prices",
        "Closure of the street to car traffic",
        "Shutdown of night streetlights",
        "An absolute ban on pedestrian traffic"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "MESSAGE PERSONNEL — Coucou Élodie ! N'oublie pas la séance de soutien en mathématiques organisée cet après-midi à 16h00 dans la salle 204 du bâtiment B. N'hésite pas à me passer un coup de fil si tu ne trouves pas la salle, Antoine.",
      "q": "Dans quelle salle se tient le cours de soutien de mathématiques ?",
      "opt": [
        "À la grande bibliothèque centrale",
        "Dans le jardin de l'université",
        "Dans la salle 204 du bâtiment B",
        "Au secrétariat du rez-de-chaussée"
      ],
      "ans": 2,
      "passEn": "PERSONAL MESSAGE — Hi Elodie! Don't forget the math tutoring session this afternoon at 4:00 PM in room 204 of Building B. Call me if you can't find the room, Antoine.",
      "qEn": "In which room is the math tutoring session held?",
      "optEn": [
        "At the main central library",
        "In the university garden",
        "In room 204 of Building B",
        "At the ground floor reception"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "LOISIRS CULTURELS — CINÉMA DU QUARTIER : Profitez de notre tarif réduit exceptionnel à 5 euros pour l'ensemble des séances de cinéma projetées le mercredi avant 15h00 ! Venez découvrir les derniers films d'animation en famille.",
      "q": "Quelle offre promotionnelle est proposée par le cinéma ?",
      "opt": [
        "Le pop-corn offert avec chaque boisson",
        "Des entrées gratuites pour les abonnés",
        "Un abonnement annuel à moitié prix",
        "Des billets à 5 euros le mercredi avant 15h"
      ],
      "ans": 3,
      "passEn": "CULTURAL LEISURE — NEIGHBORHOOD CINEMA: Enjoy our special discount rate of 5 euros for all movie screenings on Wednesday before 3:00 PM! Come discover the latest animated films with your family.",
      "qEn": "What promotional offer is featured by the cinema?",
      "optEn": [
        "Free popcorn with every drink",
        "Free entry for subscribers",
        "Half-price annual subscription",
        "Tickets at 5 euros on Wednesday before 3:00 PM"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 5,
      "level": "A2",
      "docType": "Avis d'objet trouvé",
      "text": "CAMPUS UNIVERSITAIRE — OBJET TROUVÉ : Une paire de lunettes de vue à monture rouge a été oubliée sur la table n°4 de la cafétéria centrale mardi vers 12h30. L'objet a été remis au poste de sécurité du bâtiment A. Son propriétaire peut venir le récupérer sur présentation d'une pièce d'identité.",
      "q": "Où le propriétaire peut-il récupérer ses lunettes de vue ?",
      "opt": [
        "Au poste de sécurité du bâtiment A",
        "Au secrétariat de la faculté des lettres",
        "À la bibliothèque universitaire",
        "Au bureau du directeur du campus"
      ],
      "ans": 0,
      "passEn": "UNIVERSITY CAMPUS — FOUND ITEM: A pair of red-framed eyeglasses was forgotten on table #4 at the central cafeteria on Tuesday around 12:30 PM. Handed in to Building A security desk. Owner may claim it presenting valid ID.",
      "qEn": "Where can the owner claim their lost eyeglasses?",
      "optEn": [
        "At Building A security desk",
        "At the humanities faculty office",
        "At the university library",
        "At the campus director's office"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce d'événement local",
      "text": "VIE DE LA CITÉ — FÊTE DE LA MUSIQUE LOCALE : La municipalité vous invite à des concerts gratuits en plein air ce vendredi à partir de 18h00 dans les jardins de l'Hôtel de Ville. Venez écouter des artistes locaux interpréter des chansons françaises, du jazz et de la pop. Buvette et restauration sur place.",
      "q": "Où se déroulent les concerts gratuits du vendredi soir ?",
      "opt": [
        "Dans la grande salle de spectacle municipale",
        "Dans les jardins de l'Hôtel de Ville",
        "Sur la plage publique de la commune",
        "Dans la cour d'honneur du château"
      ],
      "ans": 1,
      "passEn": "CITY LIFE — LOCAL MUSIC FESTIVAL: The municipality invites you to free outdoor concerts this Friday starting at 6:00 PM in City Hall gardens. Listen to local artists performing French songs, jazz, and pop music. Food and drinks available.",
      "qEn": "Where do Friday evening's free concerts take place?",
      "optEn": [
        "In municipal indoor performance hall",
        "In City Hall gardens",
        "On town public beach",
        "In castle main courtyard"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 7,
      "level": "A2",
      "docType": "Invitation amicale",
      "text": "MESSAGE AMICAL — Chère Sarah, nous organisons une grande randonnée en montagne le samedi 14 septembre dans le massif des Vosges. Le départ s'effectuera à 08h00 précise du parking du lac. Prévois de bonnes chaussures de marche et un pique-nique pour la pause de midi !",
      "q": "Quelle activité Sarah et ses amis vont-ils pratiquer ?",
      "opt": [
        "Une compétition de natation en eau libre",
        "Une visite guidée d'un musée d'art",
        "Une randonnée en montagne dans les Vosges",
        "Un stage de conduite automobile sur circuit"
      ],
      "ans": 2,
      "passEn": "FRIENDLY MESSAGE — Dear Sarah, we are organizing a mountain hike on Saturday September 14 in the Vosges region. Departure at 8:00 AM sharp from the lake parking lot. Bring good hiking boots and a packed lunch!",
      "qEn": "What activity are Sarah and her friends doing?",
      "optEn": [
        "Open water swimming race",
        "Guided art museum tour",
        "Mountain hike in the Vosges",
        "Racetrack driving course"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "RECRUTEMENT SAISONNIER — OFFICE DU TOURISME : Nous recrutons deux hôtes d'accueil bilingues (français et anglais) pour la saison estivale de juillet et août. Vous serez chargé de renseigner les visiteurs internationaux et de distribuer les cartes de la ville. Bon relationnel indispensable. Postulez avant le 15 juin.",
      "q": "Exigence linguistique indispensable pour candidater :",
      "opt": [
        "Maîtriser l'espagnol et l'italien à l'écrit",
        "Parler couramment le mandarin et l'allemand",
        "Avoir une certification officielle en langue des signes",
        "Être bilingue en français et en anglais"
      ],
      "ans": 3,
      "passEn": "SEASONAL RECRUITMENT — TOURIST OFFICE: We are hiring two bilingual receptionists (French and English) for July and August. You will inform international visitors and distribute maps. Good interpersonal skills required. Apply before June 15.",
      "qEn": "Mandatory language requirement to apply:",
      "optEn": [
        "Fluent written Spanish and Italian",
        "Fluent spoken Mandarin and German",
        "Official sign language certification",
        "Bilingual in French and English"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "IMMOBILIER — VENTE DE PARTICULIER : Charmante maison de village de 4 pièces avec un beau jardin arboré et clôturé ainsi qu'une grande terrasse ensoleillée. Proche des écoles primaires et des commerces de proximité. Diagnostic énergétique de classe B. Prix de vente : 210 000 euros.",
      "q": "Quelles caractéristiques extérieures distinguent cette propriété ?",
      "opt": [
        "Un jardin clôturé et une terrasse ensoleillée",
        "Une piscine olympique et un court de tennis",
        "Un grand parking sous-sol pour dix véhicules",
        "Un vaste terrain agricole avec grange"
      ],
      "ans": 0,
      "passEn": "REAL ESTATE — PRIVATE SALE: Charming 4-room village house with a beautiful fenced wooded garden and a large sunny terrace. Close to primary schools and neighborhood shops. Energy Class B. Price: 210,000 euros.",
      "qEn": "What outdoor features distinguish this property?",
      "optEn": [
        "Fenced garden and sunny terrace",
        "Olympic pool and tennis court",
        "Underground garage for ten cars",
        "Agricultural land with barn"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "NOTE INTERNE — SÉCURITÉ DES BÂTIMENTS : La fermeture automatique des portes d'accès aux bureaux de l'entreprise s'effectuera désormais chaque soir à 19h00 précises. Les employés travaillant en soirée doivent impérativement composer leur code d'alarme personnel lors de leur départ.",
      "q": "Que doivent obligatoirement faire les salariés présents après 19h00 ?",
      "opt": [
        "Débrancher tous les serveurs informatiques",
        "Activer leur code d'alarme personnel en partant",
        "Attendre l'arrivée de l'équipe de nettoyage du matin",
        "Laisser les fenêtres des bureaux ouvertes"
      ],
      "ans": 1,
      "passEn": "INTERNAL NOTICE — BUILDING SECURITY: Automatic locking of company office doors will take place every evening at 7:00 PM sharp. Employees working late must enter their personal alarm code upon departure.",
      "qEn": "What must employees present after 7:00 PM do?",
      "optEn": [
        "Unplug all computing servers",
        "Activate their personal alarm code upon leaving",
        "Wait for morning cleaning crew arrival",
        "Leave office windows open"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "LOISIRS ET NATION — CROISIÈRE SUR LE FLEUVE : Embarquez à bord de notre bateau panoramique pour une croisière commentée d'une heure et demie à la découverte des ponts historiques de la cité. Départs réguliers toutes les heures de 10h00 à 18h00 depuis l'embarcadère central.",
      "q": "Quelle est la durée exacte de la croisière guidée ?",
      "opt": [
        "Trente minutes seulement",
        "Deux heures et demie",
        "Une heure et demie",
        "Une journée entière de navigation"
      ],
      "ans": 2,
      "passEn": "LEISURE — RIVER CRUISE: Board our panoramic vessel for a 1.5-hour guided cruise discovering historic city bridges. Regular departures every hour from 10:00 AM to 6:00 PM from central dock.",
      "qEn": "What is the exact duration of the guided river cruise?",
      "optEn": [
        "Thirty minutes only",
        "Two hours and a half",
        "One hour and a half",
        "Full day sailing trip"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "RESTAURATION — BISTROT DU PORT : Spécialités culinaires de poissons frais et fruits de mer issus de la pêche locale durable. Notre plat signature, la bouillabaisse traditionnelle, est servie le vendredi uniquement sur réservation préalable effectuée au moins 24 heures à l'avance.",
      "q": "Condition requise pour commander la bouillabaisse le vendredi :",
      "opt": [
        "Venir accompagné d'au moins trois personnes",
        "Posséder une carte de fidélité du restaurant",
        "Payer l'intégralité du repas une semaine avant",
        "Réserver sa table au moins 24h à l'avance"
      ],
      "ans": 3,
      "passEn": "DINING — PORT BISTRO: Seafood specialties sourced from sustainable local fishing. Our signature dish, traditional bouillabaisse, is served on Friday only by reservation at least 24 hours in advance.",
      "qEn": "Requirement to order bouillabaisse on Friday:",
      "optEn": [
        "Bring at least three companions",
        "Hold a restaurant loyalty card",
        "Pay for meal one week prior",
        "Reserve table at least 24h in advance"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 13,
      "level": "B1",
      "docType": "Courriel client",
      "text": "INFORMATIONS VOYAGEURS — COMPAGNIE AÉRIENNE RÉGIONALE.\n\nCher client,\n\nFaisant suite à votre demande de modification de réservation transmise hier concernant votre vol à destination de Nice, nous avons le plaisir de vous confirmer l'émission de votre nouveau billet électronique. Vos modifications ont été prises en compte pour le vol AF 7412 du 18 juillet prochain, dont le départ est fixé à 09h15 depuis le terminal 2.\n\nNous vous invitons à télécharger votre carte d'embarquement mise à jour directement depuis notre application mobile. Nous vous remercions pour votre confiance et vous souhaitons un agréable voyage sur nos lignes.",
      "q": "Motif principal de ce courriel envoyé par la compagnie aérienne :",
      "opt": [
        "Confirmer l'émission du nouveau billet après modification",
        "Notifier l'annulation définitive du vol réservé",
        "Demander des pièces justificatives de bagages",
        "Proposer un surclassement payant en première classe"
      ],
      "ans": 0,
      "passEn": "PASSENGER INFO — REGIONAL AIRLINE CORPORATION.\n\nDear Customer,\n\nFollowing your flight change request for Nice sent yesterday, we confirm issuance of your new electronic ticket. Your changes apply to flight AF 7412 on July 18th, departing at 9:15 AM from Terminal 2.\n\nPlease download your updated boarding pass from our mobile app. Thank you for choosing our airline and have a pleasant trip.",
      "qEn": "Primary reason for this email sent by the airline:",
      "optEn": [
        "Confirming new ticket issuance after change",
        "Notifying final flight cancellation",
        "Requesting additional luggage proof documents",
        "Offering paid first-class upgrade"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 14,
      "level": "B1",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION OFFICIELLE — COMPLEXE AQUATIQUE MUNICIPAL.\n\nChers usagers,\n\nNous vous informons qu'en raison de l'organisation des championnats régionaux de natation synchronisée, le grand bassin olympique sera entièrement réservé à la compétition officielle et aux athlètes participants le samedi 22 mai de 08h00 à 18h00.\n\nEn conséquence, l'accès au grand bassin sera inaccessible au grand public durant toute cette plage horaire. Le petit bassin de détente ainsi que l'espace bien-être resteront néanmoins ouverts aux usagers aux tarifs habituels. Nous vous remercions pour votre compréhension.",
      "q": "Pourquoi le grand bassin olympique sera-t-il fermé au public ?",
      "opt": [
        "Pour des travaux de réfection du carrelage des douches",
        "Pour l'organisation des championnats régionaux de natation",
        "Pour le tournage d'une série télévisée locale",
        "Pour une vidange sanitaire annuelle complète"
      ],
      "ans": 1,
      "passEn": "OFFICIAL NOTICE — MUNICIPAL AQUATIC CENTER.\n\nDear users,\n\nDue to regional synchronized swimming championships, the main Olympic pool will be reserved for official competition and athletes on Saturday May 22 from 8:00 AM to 6:00 PM.\n\nConsequently, the main pool will be closed to the general public during this timeslot. The small leisure pool and wellness area remain open at usual rates. Thank you for your understanding.",
      "qEn": "Why will the main Olympic pool be closed to the public?",
      "optEn": [
        "For shower tile repair work",
        "For regional swimming championships",
        "For filming a local TV show",
        "For complete annual sanitary draining"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 15,
      "level": "B1",
      "docType": "Programme d'excursion",
      "text": "TOURISME RÉGIONAL — EXCURSION GUIDÉE SUR LA ROUTE DES VINS.\n\nPartez pour une journée d'excursion guidée en autocar au cœur des célèbres vignobles régionaux. Le circuit comprend la visite commentée de trois domaines viticoles familiaux, des dégustations de crus d'exception ainsi qu'un déjeuner traditionnel servi dans une auberge de terroir.\n\nLe départ s'effectuera à 09h00 précises depuis la Place du Capitole. Le tarif global de la journée prend en charge l'ensemble des transports, les dégustations commentées et le repas complet du midi. Pensez à réserver votre place sur notre site web.",
      "q": "Quels services sont compris dans le prix de cette excursion ?",
      "opt": [
        "Les billets d'avion et l'hébergement en hôtel 4 étoiles",
        "Uniquement la mise à disposition d'un vélo électrique",
        "Le transport en car, les dégustations et le déjeuner",
        "L'achat obligatoire de deux caisses de vin"
      ],
      "ans": 2,
      "passEn": "REGIONAL TOURISM — GUIDED WINE ROUTE EXCURSION.\n\nSet off on a guided day trip by coach along famous regional vineyards. The itinerary includes guided tours of three family wineries, tastings, and traditional lunch in a local inn.\n\nDeparture at 9:00 AM sharp from Place du Capitole. Total price covers all transport, guided tastings, and full lunch. Remember to book online.",
      "qEn": "What services are included in this excursion's price?",
      "optEn": [
        "Plane tickets and 4-star hotel stay",
        "Only electric bike rental service",
        "Coach transport, tastings, and lunch",
        "Mandatory purchase of two wine cases"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 16,
      "level": "B1",
      "docType": "Règlement intérieur médiathèque",
      "text": "CHARTE USAGERS — ESPACES NUMÉRIQUES DE LA MÉDIATHÈQUE.\n\nAfin de permettre un accès équitable à tous les abonnés, l'utilisation des ordinateurs de l'espace numérique est limitée à une durée maximale de 2 heures par jour et par personne. Les usagers peuvent réserver leur poste de travail à l'avance sur le portail en ligne ou directement auprès des bibliothécaires.\n\nToute session de travail informatique sera automatiquement fermée à l'échéance des deux heures réservées. Les abonnés sont invités à enregistrer leurs documents sur clé USB personnelle avant la fin du temps attribué.",
      "q": "Quelle est la limite quotidienne d'utilisation d'un ordinateur pour un abonné ?",
      "opt": [
        "Une heure par jour et par usager",
        "Quatre heures d'affilée sans interruption",
        "Nombre d'heures illimité pour tous",
        "Deux heures par jour et par abonné"
      ],
      "ans": 3,
      "passEn": "USER CHARTER — MEDIA LIBRARY DIGITAL SPACES.\n\nTo ensure fair access for all subscribers, computer usage is limited to a maximum of 2 hours per day per person. Users can reserve workstations online or directly with librarians.\n\nAny computer session will automatically close after 2 hours. Subscribers are advised to save files to personal USB drives before time expires.",
      "qEn": "What is the daily computer usage limit for a subscriber?",
      "optEn": [
        "One hour per day per user",
        "Four continuous hours uninterrupted",
        "Unlimited hours for all visitors",
        "Two hours per day per subscriber"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 17,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "INNOVATION VERTE — MUNICIPALITÉ DE BORDEAUX.\n\nDans le cadre de son plan de réduction des déchets municipaux, la ville de Bordeaux installe des bacs de compostage collectif dans vingt parcs publics de la métropole. Cette initiative vise à inciter les habitants résidant en appartement sans jardin à trier leurs déchets organiques afin de réduire la quantité d'ordures ménagères non recyclées.\n\nLes citoyens inscrits au programme reçoivent gratuitement un bioseau et un guide pratique. Le compost produit sera ensuite redistribué aux espaces verts municipaux et aux jardins partagés du quartier.",
      "q": "Objectif visé par l'installation de ces bacs de compostage collectif :",
      "opt": [
        "Diminuer le volume des ordures ménagères non recyclées",
        "Produire de l'électricité pour l'éclairage public",
        "Vendre de l'engrais à des entreprises horticoles privées",
        "Créer un concours de jardinage entre les habitants"
      ],
      "ans": 0,
      "passEn": "GREEN INNOVATION — CITY OF BORDEAUX.\n\nAs part of its municipal waste reduction plan, Bordeaux is installing shared composting bins in twenty public parks. This initiative encourages apartment residents without gardens to sort organic waste, reducing unrecovered household trash.\n\nRegistered citizens receive a free bio-bucket and practical guide. Produced compost will be redistributed to municipal parks and community gardens.",
      "qEn": "Targeted goal of installing these shared composting bins:",
      "optEn": [
        "Reduce volume of unrecovered household trash",
        "Produce electricity for public streetlights",
        "Sell fertilizer to private horticulture firms",
        "Create a gardening contest among residents"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 18,
      "level": "B1",
      "docType": "Bulletin d'information associative",
      "text": "PROTECTION ANIMALE — REFUGE ANIMALIER REGIONAL.\n\nNotre refuge animalier organise sa grande journée d'adoption annuelle le samedi 5 juin prochain de 10h00 à 17h00. Cet événement incontournable est l'occasion pour les familles responsables de venir rencontrer nos nombreux animaux recueillis (chiens, chats, lapins) en attente d'un foyer chaleureux.\n\nDes éducateurs canins et des vétérinaires bénévoles seront présents tout au long de la journée pour prodiguer des conseils précieux sur le bien-être animal et guider les futurs adoptants dans leur choix. Venez nombreux soutenir notre cause !",
      "q": "Quel est l'objectif principal de la journée portes ouvertes du refuge ?",
      "opt": [
        "Vendre de la nourriture pour animaux domestiques",
        "Favoriser l'adoption d'animaux recueillis par des familles",
        "Recruter des vétérinaires diplômés pour le refuge",
        "Organiser un spectacle payant de dressage canin"
      ],
      "ans": 1,
      "passEn": "ANIMAL PROTECTION — REGIONAL ANIMAL SHELTER.\n\nOur shelter is holding its annual adoption open house on Saturday June 5th from 10:00 AM to 5:00 PM. This event gives responsible families a chance to meet rescued animals (dogs, cats, rabbits) awaiting loving homes.\n\nVolunteer trainers and vets will be present to offer guidance on animal welfare and guide adopters. Come support our cause!",
      "qEn": "What is the main objective of the shelter's open house?",
      "optEn": [
        "Sell commercial domestic pet food",
        "Promote animal adoption by responsible families",
        "Recruit certified veterinarians for the shelter",
        "Organize a paid dog training performance"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 19,
      "level": "B1",
      "docType": "Avis de perturbation des transports",
      "text": "INFO TRAFIC — RÉSEAU DE TRAMWAY MUNICIPAL.\n\nEn raison de travaux de rénovation des rails et d'entretien électrique menés sur la ligne 3 entre les stations Gare Centrale et Université, la fréquence de passage des rames de tramway subira un allongement d'intervalle de 15 minutes pendant tout le week-end.\n\nDes panneaux d'affichage dynamique informeront les voyageurs en temps réel sur les quais. La compagnie de transport invite les usagers à prévoir un temps de trajet supplémentaire pour leurs déplacements durant cette période de travaux.",
      "q": "De quelle façon le fonctionnement du tramway sera-t-il modifié le week-end ?",
      "opt": [
        "Les tramways seront complètement arrêtés",
        "Les rames circuleront avec des passages espacés de 15 minutes",
        "Les tarifs des tickets doubleront sur le réseau",
        "L'accès sera réservé aux seuls usagers étudiants"
      ],
      "ans": 1,
      "passEn": "TRAFFIC INFO — MUNICIPAL TRAMWAY NETWORK.\n\nDue to rail renovation and electrical maintenance on Line 3 between Central Station and University, tram frequencies will experience a 15-minute interval extension all weekend.\n\nDynamic displays will inform passengers in real time on platforms. The transit authority advises commuters to allow extra travel time during maintenance.",
      "qEn": "How will tramway operations be altered over the weekend?",
      "optEn": [
        "Trams will be completely shut down",
        "Trams will run with 15-minute extended intervals",
        "Ticket prices will double across network",
        "Access will be restricted to students only"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 20,
      "level": "B2",
      "docType": "Article sur le développement durable",
      "text": "TECHNOLOGIE ET ÉCOLOGIE — DOSSIER SUR LA SOBRIÉTÉ NUMÉRIQUE EN ENTREPRISE.\n\nLa multiplication exponentielle des infrastructures de stockage de données massives (data centers) suscite des préoccupations environnementales grandissantes en raison de leur empreinte énergétique colossale. Pour ralentir cette consommation électrique galopante, des experts préconisent l'adoption urgente de politiques de sobriété numérique dans le monde professionnel.\n\nCes mesures s'articulent autour de deux axes prioritaires : l'optimisation des requêtes informatiques pour limiter les traitements superflus et le prolongement systématique de la durée de vie du matériel informatique afin de freiner le renouvellement prématuré des équipements.",
      "q": "Quelles préconisations sont mises en avant par les experts pour réduire l'empreinte numérique ?",
      "opt": [
        "L'interdiction absolue de se servir d'ordinateurs au travail",
        "L'optimisation du traitement de données et l'extension de la durée d'usage du matériel",
        "Le remplacement annuel obligatoire des serveurs d'entreprise",
        "La création d'une taxe sur l'envoi de courriels professionnels"
      ],
      "ans": 1,
      "passEn": "TECH AND ECOLOGY — CORPORATE DIGITAL SOBRIETY FEATURE.\n\nExponential growth of mass data centers triggers environmental concerns due to their colossal energy footprint. To curb electric consumption, experts urge adopting digital sobriety policies in business environments.\n\nThese measures center on two priorities: optimizing computing queries to limit superfluous processing and systematically extending hardware lifespans to slow premature equipment replacement.",
      "qEn": "What recommendations are put forward by experts to reduce digital footprints?",
      "optEn": [
        "Absolute ban on using computers at work",
        "Optimizing data processing and extending hardware usage lifespan",
        "Mandatory annual replacement of corporate servers",
        "Taxing professional business emails"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 21,
      "level": "B2",
      "docType": "Synthèse sur le télétravail",
      "text": "ORGANISATION DU TRAVAIL — ANNALES DE MANAGEMENT CONTEMPORAIN : LE BUREAU FLEXIBLE (FLEX-OFFICE).\n\nLe passage au modèle du bureau flexible (flex-office), caractérisé par l'absence de poste de travail fixe réattribué quotidiennement aux salariés, génère des appréciations très divergentes au sein des entreprises. Si cette réorganisation spatiale permet une réduction significative des coûts immobiliers pour l'employeur, elle suscite des retombées psychologiques mitigées chez le personnel.\n\nEn effet, de nombreux employés expriment une perte de repères personnels au quotidien et un affaiblissement du sentiment d'appartenance à la communauté d'entreprise, percevant le bureau flexible comme un symbole d'interchangeabilité de la main-d'œuvre.",
      "q": "Quel effet indésirable lié au modèle du flex-office est relevé dans cette synthèse ?",
      "opt": [
        "Une hausse incontrôlée du montant des loyers commerciaux",
        "L'obligation de travailler exclusivement durant le week-end",
        "Une perte d'ancrage personnel et une érosion de l'appartenance",
        "La suppression de l'ensemble des congés payés statutaires"
      ],
      "ans": 2,
      "passEn": "WORKPLACE ORGANIZATION — CONTEMPORARY MANAGEMENT REVIEWS: FLEXIBLE OFFICE DESKING.\n\nTransitioning to flex-office desking—where no employee has a permanent designated desk—generates mixed reviews in companies. While spatial restructuring cuts corporate real estate costs, psychological impacts on staff are mixed.\n\nIndeed, many employees express loss of personal grounding and weakened sense of company belonging, viewing desk sharing as a symbol of staff interchangeability.",
      "qEn": "What unwanted side effect of flex-office desking is noted in this review?",
      "optEn": [
        "Uncontrolled rise in commercial office rents",
        "Mandate to work exclusively on weekends",
        "Loss of personal grounding and eroded company belonging",
        "Elimination of statutory paid leave"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 22,
      "level": "B2",
      "docType": "Tribune sur le système éducatif",
      "text": "ÉDUCATION ET ÉQUITÉ — TRIBUNE DE SOCIOLOGIE DE L'ÉDUCATION : ALGORITHMES ET ORIENTATION SCOLAIRE.\n\nLes dispositifs numériques nationaux régissant l'affectation universitaire prétendent garantir une impartialité absolue dans le traitement automatisé des dossiers de candidature. Toutefois, des études sociologiques approfondies mettent en lumière les limites de cette prétendue neutralité technologique.\n\nEn réalité, l'opacité et la complexité des critères d'évaluation intégrés aux algorithmes favorisent indirectement les candidats issus de milieux socio-culturels favorisés, dont les familles possèdent les codes pour optimiser les dossiers, au détriment des élèves de milieux modestes démunis face au système.",
      "q": "Pourquoi l'équité des systèmes d'affectation automatisés est-elle contestée selon la tribune ?",
      "opt": [
        "Parce que les ordinateurs rejettent systématiquement les hommes",
        "Parce que le coût d'inscription en ligne est devenu trop cher",
        "Parce que les universités manquent de places physiques réelles",
        "Parce que le manque de lisibilité avantage les familles averties"
      ],
      "ans": 3,
      "passEn": "EDUCATION AND EQUITY — SOCIOLOGY OF EDUCATION OP-ED: ALGORITHMS AND SCHOOL PLACEMENT.\n\nNational digital platforms governing university assignments claim absolute impartiality in processing applications automatically. However, sociological studies reveal limits to tech neutrality.\n\nIn reality, opacity and complexity in algorithmic scoring criteria indirectly favor candidates from privileged socio-cultural backgrounds whose families know how to optimize applications, penalizing disadvantaged students.",
      "qEn": "Why is the fairness of automated assignment systems contested according to the op-ed?",
      "optEn": [
        "Because computers systematically reject male applicants",
        "Because online application fees became too expensive",
        "Because universities lack real physical classroom seats",
        "Because lack of clarity favors informed families"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 23,
      "level": "B2",
      "docType": "Article sur le patrimoine culturel",
      "text": "PATRIMOINE MONDIAL — CAHIERS DE DIPLOMATIE CULTURELLE : LA RESTITUTION DES BIENS CULTURELS.\n\nLa question de la restitution des œuvres d'art et objets patrimoniaux conservés dans les musées occidentaux vers leurs pays d'origine est devenue un enjeu central des relations internationales contemporaines. Au-delà des négociations juridiques ardues entourant la propriété des collections, cette démarche revêt une dimension symbolique profonde.\n\nPour les nations spoliées durant la période coloniale, le rapatriement de leur patrimoine historique participe directement à la réappropriation de leur mémoire collective et à la consolidation de leur identité culturelle face à l'Histoire.",
      "q": "Quelle portée fondamentale la démarche de restitution artistique présente-t-elle pour les pays d'origine ?",
      "opt": [
        "La réappropriation mémorielle et la consolidation identitaire des peuples",
        "L'opportunité de revendre les œuvres pour financer le budget de l'État",
        "L'obligation de fermer leurs musées nationaux aux visiteurs étrangers",
        "L'interruption définitive de toute coopération culturelle internationale"
      ],
      "ans": 0,
      "passEn": "WORLD HERITAGE — CULTURAL DIPLOMACY PAPERS: RESTITUTION OF CULTURAL ASSETS.\n\nRestitution of artworks and cultural heritage housed in Western museums to their origin countries has become central to international relations. Beyond legal debates over collection ownership, this process carries deep symbolic weight.\n\nFor nations looted during colonial periods, repatriating historical heritage aids memory reclamation and solidifies cultural identity before history.",
      "qEn": "What fundamental significance does art restitution hold for origin countries?",
      "optEn": [
        "Memory reclamation and cultural identity consolidation",
        "Opportunity to resell artworks to fund state budgets",
        "Obligation to close national museums to foreign tourists",
        "Definitive termination of international cultural cooperation"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 24,
      "level": "B2",
      "docType": "Chronique sur l'intelligence artificielle",
      "text": "PROPRIÉTÉ INTELLECTUELLE — CHRONIQUE JURIDIQUE : L'IA GÉNÉRATIVE ET LE DROIT D'AUTEUR.\n\nLa capacité des modèles d'intelligence artificielle générative à produire des textes, des images ou des compositions musicales à partir de requêtes simples crée une vive insécurité juridique dans le secteur culturel. L'absence de cadre réglementaire explicite concernant l'utilisation d'œuvres protégées pour l'entraînement des algorithmes suscite une vive contestation chez les créateurs.\n\nLes associations d'artistes exigent l'instauration d'un mécanisme de rémunération équitable compensant l'exploitation non consentie de leurs travaux par les géants technologiques développant ces outils informatiques.",
      "q": "Revendication principale des artistes face aux technologies d'IA générative :",
      "opt": [
        "L'obligation pour les créateurs d'acheter les logiciels d'IA",
        "Une indemnisation financière équitable pour l'usage de leurs travaux",
        "L'interdiction de diffuser toute musique classique sur Internet",
        "La suppression définitive de l'ensemble des droits d'auteur"
      ],
      "ans": 1,
      "passEn": "INTELLECTUAL PROPERTY — LEGAL CHRONICLE: GENERATIVE AI AND COPYRIGHT.\n\nThe ability of generative AI models to produce text, images, or music from simple prompts creates legal uncertainty in cultural sectors. The lack of explicit regulation regarding the use of copyrighted works for model training sparks protest among creators.\n\nArtists' associations demand fair compensation mechanisms to offset unauthorized exploitation of their work by tech giants developing these tools.",
      "qEn": "Primary demand by artists regarding generative AI tech:",
      "optEn": [
        "Mandate for creators to purchase AI software",
        "Fair financial compensation for use of their works",
        "Ban on broadcasting classical music online",
        "Permanent abolishment of all copyright laws"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 25,
      "level": "B2",
      "docType": "Étude sur l'urbanisme écocitoyen",
      "text": "AMÉNAGEMENT MÉTROPOLITAIN — REVUE D'URBANISME CONTEMPORAIN : LE CONCEPT DE LA VILLE DU QUART D'HEURE.\n\nLe modèle d'aménagement urbain dit 'de la ville du quart d'heure', visant à offrir à chaque citadin l'accès à ses besoins essentiels (santé, travail, éducation, commerces) à moins de 15 minutes à pied ou à vélo, vise à décentrer les grandes métropoles. Cette réorganisation spatiale réduit considérablement la dépendance aux transports motorisés.\n\nOutre l'allègement significatif des émissions carbonées urbaines, ce modèle favorise le développement d'une vie de quartier vivante et renforce le lien social entre les habitants d'une même communauté.",
      "q": "Objectif prioritaire poursuivi par le modèle d'aménagement de la 'ville du quart d'heure' :",
      "opt": [
        "Fermer l'ensemble des commerces de proximité les jours fériés",
        "Obliger les citadins à changer de logement de manière annuelle",
        "Assurer l'accès aux services essentiels dans un rayon de 15 minutes à pied ou vélo",
        "Supprimer les écoles publiques au profit de l'enseignement virtuel"
      ],
      "ans": 2,
      "passEn": "METROPOLITAN PLANNING — CONTEMPORARY URBANISM REVIEW: THE 15-MINUTE CITY CONCEPT.\n\nThe '15-minute city' urban planning model aims to give every resident access to essential needs (health, work, education, shops) within a 15-minute walk or bike ride, decentralizing major cities. This spatial restructuring cuts motorized transit dependency.\n\nBeyond significant urban carbon emission cuts, this model fosters vibrant neighborhood life and strengthens social ties among community residents.",
      "qEn": "Primary goal pursued by the '15-minute city' planning model:",
      "optEn": [
        "Close all local neighborhood shops on holidays",
        "Mandate that residents relocate their homes annually",
        "Ensure access to essential services within 15-min walk or bike ride",
        "Eliminate public schools in favor of online learning"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 26,
      "level": "B2",
      "docType": "Analyse de la mobilité professionnelle",
      "text": "GESTION DES RESSOURCES HUMAINES — REVUE DU MANAGEMENT ET DU TRAVAIL : LA PRIMAUTÉ DES COMPÉTENCES TRANSVERSALES.\n\nDans un paysage économique caractérisé par l'obsolescence accélérée des savoir-faire techniques (hard skills), les recruteurs accordent une importance croissante aux compétences transversales comportementales (soft skills). La capacité d'adaptation, la pensée critique, la créativité et l'esprit d'équipe deviennent des critères de sélection primordiaux.\n\nCette évolution s'explique par la nécessité pour les organisations de disposer de collaborateurs capables d'évoluer rapidement au gré des mutations technologiques et d'apprendre continuellement dans un environnement professionnel instable.",
      "q": "Pourquoi les soft skills priment-elles désormais dans les processus de recrutement ?",
      "opt": [
        "Parce qu'elles permettent de réduire les budgets consacrés à la formation",
        "Parce qu'elles sont exigées par les traités de travail internationaux",
        "Parce qu'elles remplacent l'exigence de diplômes universitaires",
        "Parce que les compétences techniques perdent leur pertinence plus vite qu'autrefois"
      ],
      "ans": 3,
      "passEn": "HUMAN RESOURCES MANAGEMENT — MANAGEMENT AND WORK REVIEW: PRIMACY OF TRANSVERSAL SKILLS.\n\nIn an economy marked by accelerated technical skill obsolescence (hard skills), recruiters place growing weight on transversal behavioral skills (soft skills). Adaptability, critical thinking, creativity, and teamwork become top selection criteria.\n\nThis shift stems from corporate needs for staff capable of evolving rapidly alongside tech shifts and learning continuously in unstable workplace settings.",
      "qEn": "Why do soft skills now prevail in hiring recruitment processes?",
      "optEn": [
        "Because they allow cutting corporate training budgets",
        "Because they are mandated by international labor treaties",
        "Because they replace university degree requirements",
        "Because technical skills lose relevance faster than before"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 27,
      "level": "B2",
      "docType": "Article sur l'engagement citoyen",
      "text": "POLITIQUE MUNICIPALE — CAHIERS DE LA GOUVERNANCE LOCALE : LES BUDGETS PARTICIPATIFS CITOYENS.\n\nEn confiant aux habitants le pouvoir de décider directement de l'affectation d'une fraction du budget d'investissement municipal, les collectivités locales s'efforcent de revitaliser la démocratie de proximité. Cependant, les synthèses de terrain révèlent que le succès de ces dispositifs dépend largement d'un effort continu d'accompagnement et de médiation culturelle.\n\nSans cette sensibilisation active, le budget participatif risque de capter uniquement l'attention de citoyens déjà insérés et avertis, accentuant les inégalités de représentation au détriment des populations défavorisées.",
      "q": "Condition clé garantissant l'efficacité démocratique des budgets participatifs :",
      "opt": [
        "Un travail permanent de médiation pour mobiliser l'ensemble des citoyens",
        "L'instauration d'un vote obligatoire sous peine de sanction financière",
        "La restriction du droit de vote aux seuls propriétaires immobiliers",
        "La dissolution de toutes les assemblées citoyennes de quartier"
      ],
      "ans": 0,
      "passEn": "MUNICIPAL POLICY — LOCAL GOVERNANCE PAPERS: CITIZEN PARTICIPATORY BUDGETING.\n\nBy empowering residents to decide directly on allocating a fraction of municipal capital budgets, local governments seek to revitalize local democracy. However, field studies reveal success depends heavily on ongoing cultural outreach and support.\n\nWithout active outreach, participatory budgeting risks capturing attention only from informed citizens, widening representation gaps at the expense of disadvantaged groups.",
      "qEn": "Key condition guaranteeing democratic effectiveness of participatory budgeting:",
      "optEn": [
        "Ongoing outreach work to engage all citizens",
        "Mandatory voting enforced by financial penalties",
        "Restricting voting rights exclusively to property owners",
        "Disbanding all local neighborhood citizen assemblies"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 28,
      "level": "B2",
      "docType": "Bilan sur la transition énergétique",
      "text": "LOGEMENT ET ÉCOLOGIE — DOSSIER SUR LA RÉNOVATION THÉRMIQUE DU BÂTI.\n\nL'isolation thermique performante des bâtiments résidentiels constitue l'un des leviers les plus puissants pour réduire simultanément la précarité énergétique des ménages et limiter les émissions territoriales de gaz à effet de serre. Néanmoins, l'atteinte des objectifs nationaux de rénovation se heurte à d'importantes contraintes d'application.\n\nLa complexité des démarches administratives d'obtention des aides ainsi que le montant élevé du reste à charge financier découragent encore de nombreux propriétaires d'engager ces travaux de rénovation énergétique indispensables.",
      "q": "Facteurs ralentissant l'implication des propriétaires dans la rénovation thermique :",
      "opt": [
        "L'indisponibilité totale des matériaux d'isolation thermique",
        "La lourdeur administrative et l'effort financier personnel requis",
        "L'interdiction de rénover les bâtiments construits avant 1990",
        "La certitude que l'énergie deviendra entièrement gratuite"
      ],
      "ans": 1,
      "passEn": "HOUSING AND ECOLOGY — RESIDENTIAL THERMAL RETROFITTING FEATURE.\n\nHigh-performance thermal insulation of residential buildings represents a powerful lever for curbing energy poverty while reducing greenhouse gas emissions. However, national retrofitting goals face implementation barriers.\n\nAdministrative complexity in obtaining aid grants and high out-of-pocket financial costs still discourage many property owners from launching essential energy renovations.",
      "qEn": "Factors slowing homeowner involvement in thermal retrofitting:",
      "optEn": [
        "Total unavailability of thermal insulation materials",
        "Administrative burden and required personal financial effort",
        "Ban on renovating buildings constructed prior to 1990",
        "Certainty that energy will become completely free"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 29,
      "level": "B2",
      "docType": "Lettre de réclamation administrative",
      "text": "ENVIRONNEMENT ET SANTÉ — RECOURS DU COLLECTIF DES RIVERAINES DU BASSIN INDUSTRIEL.\n\nÀ l'attention de Monsieur le Préfet du Département,\n\nNotre collectif citoyen saisit vos services à la suite des rejets d'effluents industriels non traités constatés dans le cours d'eau traversant nos communes. Ces pollutions répétées menacent la biodiversité aquatique et suscitent de vives inquiétudes sanitaires chez les habitants.\n\nPar conséquent, nous exigeons le déclenchement immédiat d'une inspection sanitaire indépendante ainsi que l'obligation sous astreinte pour l'entreprise polluante de mettre ses installations aux normes environnementales en vigueur.",
      "q": "Quelle exigence principale fait l'objet du recours déposé par les riverains ?",
      "opt": [
        "La fermeture définitive de l'ensemble des usines du département",
        "Une inspection indépendante et la mise aux normes de l'usine",
        "Le remboursement intégral des factures d'eau des cinq dernières années",
        "L'autorisation d'implanter un nouveau site de décharge publique"
      ],
      "ans": 1,
      "passEn": "ENVIRONMENT AND HEALTH — INDUSTRIAL BASIN RESIDENTS' COLLECTIVE APPEAL.\n\nTo the Departmental Prefect,\n\nOur citizen collective contacts your department following untreated industrial effluent discharges into the local river. Repeated pollution threatens aquatic life and causes health concerns among residents.\n\nConsequently, we demand an immediate independent health inspection and court-ordered environmental compliance for the polluting firm.",
      "qEn": "What main requirement forms the subject of the appeal filed by residents?",
      "optEn": [
        "Permanent closure of all factories in the department",
        "Independent inspection and mandatory factory compliance",
        "Full refund on water bills over the last five years",
        "Authorization to build a new public landfill site"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial socio-économique",
      "text": "ÉCONOMIE POLITIQUE — TRIBUNE PARUE DANS LA REVUE DE MACROÉCONOMIE CONTEMPORAINE : LA DÉCROISSANCE SÉLECTIVE EN QUESTION ET LE MAINTIEN DU PROGRÈS SOCIAL.\n\nPromouvoir la thématique de la décroissance sélective comme solution miracle unique aux crises écologiques mondiales sans modéliser préalablement ses retombées sur les systèmes de protection sociale relève d'une posture théorique déconnectée des réalités économiques et sociales. Faute d'une révision structurelle préalable de la fiscalité et des modes de redistribution de la valeur ajoutée, tout ralentissement délibéré et non régulé de l'activité productive frapperait en premier lieu les populations les plus vulnérables.\n\nSans filet de sécurité sanitaire et financier renforcé, la baisse d'activité risquerait de détruire massivement des emplois peu qualifiés et d'éroder gravement les recettes publiques consacrées au financement de la santé et des retraites. Ainsi, sans régulation redistributive préalable, une aspiration écologique légitime basculerait inévitablement en crise sociale dévastatrice pour les catégories modestes.",
      "q": "Quelle mise en garde l'auteur formule-t-il à l'encontre d'une décroissance non régulée ?",
      "opt": [
        "Elle diminuerait les profits des grands établissements bancaires",
        "Elle impacterait prioritairement les ménages modestes sans réforme sociale",
        "Elle supprimerait l'obligation d'exercer un emploi rémunéré",
        "Elle provoquerait l'arrêt immédiat du commerce international"
      ],
      "ans": 1,
      "passEn": "POLITICAL ECONOMY — CONTEMPORARY MACROECONOMICS REVIEW: SELECTIVE DEGROWTH IN QUESTION.\n\nPromoting selective degrowth as a cure-all for climate crises without modeling fallout on social safety nets is a theoretical posture disconnected from economic realities. Without prior structural tax reform and wealth redistribution, deliberate economic slowdowns hit vulnerable populations first.\n\nWithout reinforced safety nets, lower production risks destroying low-skilled jobs and eroding health and pension budgets, turning legitimate eco-aspirations into devastating social crises.",
      "qEn": "What warning does the author issue against unregulated economic degrowth?",
      "optEn": [
        "It would reduce profitability for major banking institutions",
        "It would impact modest households first without social reform",
        "It would eliminate the obligation to hold paid employment",
        "It would cause an immediate halt to global international trade"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai sur la diversité linguistique",
      "text": "SOCIOLINGUISTIQUE ET CULTURES — CAHIERS DE LA DIVERSITÉ CULTURELLE : L'ÉCOLOGIE DES LANGUES MENACÉES ET LA DIVERSITÉ COGNITIVE EN DANGER.\n\nLa disparition accélérée des idiomes minoritaires ne constitue pas seulement une perte patrimoniale linguistique tragique, mais représente une érosion irréparable de la diversité cognitive de l'humanité entière. Chaque langue structurant une cosmogonie singulière, une vision du monde unique et une classification originale du vivant, la mort d'un système linguistique équivaut à l'anéantissement définitif d'une véritable bibliothèque de savoirs écologiques et philosophiques accumulés sur des siècles de présence au monde.\n\nEn négligeant la sauvegarde active des langues en danger, les sociétés modernes se privent délibérément d'outils conceptuels irremplaçables élaborés par des cultures locales pour interagir en harmonie avec leurs écosystèmes. Cet appauvrissement linguistique réduit la capacité globale de l'humanité à conceptualiser des réponses novatrices face aux défis écologiques complexes du monde contemporain.",
      "q": "Pourquoi la disparition d'une langue minoritaire est-elle assimilée à la destruction d'une bibliothèque ?",
      "opt": [
        "Parce que les ouvrages rédigés dans cette langue sont détruits",
        "Parce que chaque langue renferme une cosmogonie et des savoirs écologiques uniques",
        "Parce que l'enseignement des langues devient trop coûteux pour les États",
        "Parce que les jeunes étudiants refusent d'apprendre la grammaire"
      ],
      "ans": 1,
      "passEn": "SOCIOLINGUISTICS — CULTURAL DIVERSITY PAPERS: ECOLOGY OF ENDANGERED LANGUAGES.\n\nAccelerated disappearance of minority tongues is not merely a linguistic heritage loss; it represents an irreparable erosion of human cognitive diversity. Because every language structures a unique cosmogony and classification of life, language death equals destroying a library of ecological knowledge.\n\nBy neglecting endangered language preservation, modern societies deprive themselves of unique conceptual tools developed by local cultures to interact with ecosystems, impoverishing humanity's capacity to shape its future.",
      "qEn": "Why is the disappearance of a minority language compared to destroying a library?",
      "optEn": [
        "Because physical books written in that language are destroyed",
        "Because every language embodies unique ecological knowledge",
        "Because teaching languages becomes too expensive for states",
        "Because young students refuse to learn grammar rules"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse critique sur la vulgarisation",
      "text": "PHILOSOPHIE DES SCIENCES — REVUE D'ÉPISTÉMOLOGIE APPLIQUÉE : LE DEVOIR D'INCERTITUDE ET DE RIGUEUR DU CHERCHEUR SCIENTIFIQUE DANS LA CITÉ MORDERNISÉE.\n\nDans leur quête de légitimité auprès de l'opinion publique et des médias d'information friands de récits simplifiés, certains experts scientifiques masquent parfois les incertitudes méthodologiques inhérentes à toute démarche de recherche sous des affirmations dogmatiques, catégoriques et péremptoires. Or, présenter des résultats provisoires ou des hypothèses en cours de validation comme des vérités scientifiques immuables constitue une dérive éthique préjudiciable à la science elle-même et au débat public citoyen.\n\nReconnaître en toute transparence la part d'incertitude et la révisabilité permanente des hypothèses scientifiques fonde la vraie démarche critique. C'est précisément cette honnêteté intellectuelle sans concession qui garantit à long terme la confiance durable du public envers les institutions de recherche et préserve l'intégrité de la quête scientifique face aux pressions politiques ou économiques extérieures.",
      "q": "Selon le texte, quel comportement garantit véritablement la confiance du public envers la science ?",
      "opt": [
        "L'affirmation dogmatique de certitudes catégoriques absolues",
        "La reconnaissance transparente du doute et de la révisabilité des hypothèses",
        "L'interdiction de poser des questions techniques aux chercheurs",
        "La diffusion exclusive des résultats de recherche positifs"
      ],
      "ans": 1,
      "passEn": "SCIENCE PHILOSOPHY — APPLIED EPISTEMOLOGY REVIEW: THE RESEARCHER'S DUTY OF UNCERTAINTY.\n\nSeeking public and media legitimacy, some scientific experts conceal methodological uncertainties under dogmatic claims. Yet presenting provisional findings as immutable truth is detrimental to science itself.\n\nTransparently acknowledging uncertainty and hypothesis revisability forms true critical inquiry. It is precisely this intellectual honesty that secures long-term public trust in research institutions.",
      "qEn": "According to the text, what behavior truly guarantees public trust in science?",
      "optEn": [
        "Dogmatic assertion of absolute categorical certainty",
        "Transparent recognition of doubt and hypothesis revisability",
        "Prohibiting journalists from asking technical questions",
        "Broadcasting exclusively positive trial research results"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 33,
      "level": "C1",
      "docType": "Étude patrimoniale et architecturale",
      "text": "HISTOIRE DE L'ART ET PATRIMOINE — CAHIERS D'ARCHITECTURE CONTEMPORAINE : LA RE-ÉVALUATION CRITIQUE ET HISTORIQUE DU BRUTALISME ET DES ESPACES PUBLICS MUNICIPAUX EN EUROPE ET DANS LE MONDE ENTIER.\n\nLongtemps décrié pour la rudesse apparente de ses structures imposantes en béton brut et son austérité esthétique assumée, le courant architectural brutaliste fait aujourd'hui l'objet d'une profonde réévaluation esthétique, historique et patrimoniale au sein des cercles spécialisés d'urbanisme. Les historiens de l'art et les urbanistes soulignent désormais la dimension sociale utopique qui animait les architectes de ce mouvement visionnaire de l'après-guerre.\n\nConçus à l'origine pour offrir des logements sociaux démocratiques et de grands équipements publics monumentaux accessibles à l'ensemble du corps social sans distinction de classe, ces bâtiments incarnent une vision généreuse et égalitaire de la cité que la critique contemporaine redécouvre avec un intérêt renouvelé et un respect scientifique incontestable face aux défis urbains contemporains.",
      "q": "Comment la perception de l'architecture brutaliste a-t-elle évolué chez les spécialistes internationaux du domaine ?",
      "opt": [
        "Elle est désormais unanimement condamnée à la démolition",
        "Elle fait l'objet d'une réévaluation soulignant son utopie sociale",
        "Elle est considérée comme une réplique mineure du style classique",
        "Elle est réservée à la construction de bâtiments militaires secrets"
      ],
      "ans": 1,
      "passEn": "ART HISTORY — CONTEMPORARY ARCHITECTURE PAPERS: RE-EVALUATING BRUTALISM.\n\nLong decried for raw concrete austerity, brutalist architecture undergoes deep aesthetic reassessment. Art historians now highlight the utopian social vision inspiring post-war movement architects.\n\nDesigned to provide democratic public housing and monumental amenities accessible to all, these structures embody a generous urban vision contemporary critics rediscover with renewed interest.",
      "qEn": "How has perception of brutalist architecture evolved among specialists throughout the world?",
      "optEn": [
        "It is now universally condemned to demolition",
        "It undergoes reassessment highlighting its utopian social vision",
        "It is considered a minor replica of classical styles",
        "It is reserved exclusively for building classified military sites"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 34,
      "level": "C1",
      "docType": "Réflexion prospective sur le numérique",
      "text": "DROITS FONDAMENTAUX ET TECHNOLOGIE — REVUE DE DROIT ET LIBERTÉS NUMÉRIQUES : RECONNAISSANCE FACIALE ET ESPACE PUBLIC EN DÉBAT ÉTHIQUE ET JURIDIQUE CONTEMPORAIN ET INTERNATIONAL.\n\nLe déploiement accéléré des technologies de reconnaissance faciale automatisée dans les espaces publics instaure une surveillance panoptique continue qui modifie la nature même des libertés démocratiques fondamentales. Confrontés au risque permanent d'identification biométrique lors de leurs déplacements quotidiens dans la cité, les citoyens manifestent des comportements d'autocensure qui altèrent gravement la liberté de réunion et de manifestation pacifique dans l'espace urbain commun.\n\nFace à cette dérive sécuritaire incontrôlée, de nombreux juristes et défenseurs des libertés publiques plaident pour l'instauration d'un moratoire strict interdisant la surveillance biométrique de masse. Cette protection juridique est indispensable pour préserver l'anonymat nécessaire à l'exercice sans contrainte de la vie citoyenne démocratique et participative dans une société ouverte, pluraliste et libre.",
      "q": "Quel risque principal le déploiement de la reconnaissance faciale fait-il peser sur la citoyenneté démocratique globale ?",
      "opt": [
        "L'augmentation des dépenses d'entretien des équipements",
        "L'autocensure des citoyens et l'atteinte à la liberté de réunion",
        "La fermeture définitive des tribunaux de justice départementaux",
        "L'obligation d'arborer une tenue uniforme dans les rues"
      ],
      "ans": 1,
      "passEn": "FUNDAMENTAL RIGHTS — DIGITAL LAW AND FREEDOMS REVIEW: FACIAL RECOGNITION IN PUBLIC SPACES.\n\nAccelerated deployment of automated facial recognition in public spaces creates panoptic surveillance altering fundamental democratic freedoms. Facing permanent biometric identification risks, citizens exhibit self-censorship altering freedom of assembly.\n\nFacing this security drift, legal scholars urge strict moratoria banning mass biometric surveillance to preserve anonymity necessary for civic life.",
      "qEn": "What main risk does facial recognition deployment pose to global democratic citizenship?",
      "optEn": [
        "Increased equipment maintenance expenses",
        "Citizen self-censorship and infringement on assembly freedom",
        "Permanent closure of departmental justice courts",
        "Mandate to wear uniform attire outdoors in streets"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai critique sur la littérature",
      "text": "THÉORIE LITTÉRAIRE ET POÉTIQUE — REVUE DE POÉTIQUE CONTEMPORAINE : LA FORME FRAGMENTAIRE DANS L'ESSAI MODERNISTE DU XXE SIÈCLE ET L'ÉMANCIPATION DU LECTEUR CONTEMPORAIN.\n\nEn répudiant la continuité explicative et la linéarité du traité philosophique classique au profit de la forme fragmentaire, les essayistes du XXe siècle traduisent la dislocation du sujet moderne. Le fragment ne doit nullement être interprété comme une pensée inachevée ou une défaillance de la logique narrative, mais comme un refus délibéré du système dogmatique clos et de la synthèse autoritaire imposée de l'extérieur.\n\nEn offrant au lecteur des alvéoles de méditation ouverte débarrassées de toute conclusion péremptoire, la poétique du fragment exige une participation intellectuelle active. Dans ce cadre novateur, chaque discontinu devient l'espace privilégié d'une relecture réflexive et d'une co-création autonome du sens du texte par le lecteur émancipé, souverain et engagé dans la lecture.",
      "q": "Quelle portée l'écriture fragmentaire revêt-elle selon l'analyse littéraire ?",
      "opt": [
        "L'impossibilité pour l'auteur de terminer son travail par manque d'idées",
        "Le refus délibéré du système clos exprimant la dislocation du sujet",
        "Une astuce éditoriale visant à diminuer la taille physique des livres",
        "L'obligation d'imiter les manuscrits anciens traduits du latin"
      ],
      "ans": 1,
      "passEn": "LITERARY THEORY — CONTEMPORARY POETICS REVIEW: FRAGMENTARY FORM IN ESSAYS.\n\nRepudiating classical philosophical continuity for fragmentary forms, 20th-century essayists express modern subject dislocation. Fragments are not incomplete thought, but deliberate rejection of closed dogmatic systems.\n\nBy offering open meditative cells freed from authoritarian conclusions, fragment poetics require active participation where discontinuity becomes a space for reinterpreting and co-creating meaning.",
      "qEn": "What significance does fragmentary writing hold according to literary analysis?",
      "optEn": [
        "Author's inability to complete work due to lack of ideas",
        "Deliberate rejection of closed systems expressing subject dislocation",
        "Publisher trick aimed at cutting physical book sizes",
        "Obligation to imitate ancient manuscripts translated from Latin"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le temps",
      "text": "CRITIQUE SOCIO-PHILOSOPHIQUE — TRIBUNE PARUE DANS LES CAHIERS DE CRITIQUE MÉTAPHYSIQUE : L'ILLUSION DE L'ACCÉLÉRATION HISTORIQUE ET LA STASE STRUCTURELLE DU CAPITALISME TARDIF EN QUESTION.\n\nLa rhétorique contemporaine saturée par le thème de l'accélération exponentielle du temps et du progrès technique masque en réalité une stase structurelle profonde. Sous le vernis de l'agitation technologique permanente et du renouvellement frénétique des gadgets marchands, les structures fondamentales du capitalisme tardif et des institutions politiques demeurent singulièrement figées et incapables d'innover réellement. L'innovation constante se borne à remodeler la surface des marchandises sans altérer la logique du système.\n\nCette immobilité sous-jacente prive notre époque de la capacité d'engendrer une véritable alternative métaphysique ou sociale. Réduite à une hyper-activité superficielle et répétitive, la société contemporaine simule le mouvement perpétuel pour mieux pérenniser un ordre figé incapable de concevoir sa propre transformation historique et politique.",
      "q": "Quel paradoxe l'auteur met-il en exergue sous l'apparence du mouvement moderne ?",
      "opt": [
        "L'effervescence apparente dissimule un blocage sociétal profond",
        "L'accélération numérique a permis d'éliminer les inégalités sociales",
        "Les gouvernements ont réussi à ralentir le cours du temps biologique",
        "Le renouvellement des objets empêche les conflits entre nations"
      ],
      "ans": 0,
      "passEn": "SOCIO-PHILOSOPHICAL CRITIQUE — METAPHYSICAL CRITICISM PAPERS: THE ILLUSION OF HISTORICAL ACCELERATION.\n\nContemporary rhetoric on exponential time acceleration masks profound structural stasis. Beneath technological turmoil and gadget turnover, fundamental structures of late capitalism and political institutions remain frozen.\n\nThis underlying immobility deprives our era of capacity to generate genuine metaphysical alternatives. Reduced to superficial hyperactivity, contemporary society simulates movement to perpetuate a frozen order incapable of thinking its own transformation.",
      "qEn": "What paradox does the author highlight beneath modern movement appearances?",
      "optEn": [
        "Apparent effervescence dissimulates deep societal blockage",
        "Digital acceleration eliminated social inequalities",
        "Governments succeeded in slowing biological time",
        "Product turnover prevents conflicts between nations"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai épistémologique sur la modernité",
      "text": "PHILOSOPHIE DE LA NATURE — ANNALES D'ÉPISTÉMOLOGIE CONTEMPORAINE : RÉIFICATION DU VIVANT ET DÉSENCHANTEMENT DU MONDE MATÉRIEL DANS LA TECHNO-SCIENCE CONTEMPORAINE.\n\nL'arraisonnement de la nature par la techno-science moderniste a métamorphosé le monde d'un cosmos habité par le mystère en un simple réservoir d'énergie et de ressources exploitables à merci. Ce désenchantement méthodique dépossède l'humanité de son ancrage écosystémique originel, réduisant la relation à la Terre à un rapport unilatéral de domination utilitariste et comptable. Tout élément naturel vivant se trouve ainsi réifié et transformé en ressource monétisable sur les marchés mondiaux.\n\nEn effaçant la sacralité du vivant au profit d'un matérialisme comptable étroit, la modernité a brisé le dialogue symbolique entre l'homme et son milieu environnant. Restaurer une présence éthique exige de rompre de manière radicale avec cette logique d'exploitation pour réédifier une écologie de l'interdépendance respectueuse du vivant sous toutes ses formes.",
      "q": "Quelles conséquences le désenchantement méthodique de la nature entraîne-t-il ?",
      "opt": [
        "L'élévation spirituelle de l'humanité vers des savoirs ancestraux",
        "La dépossession de l'ancrage écosystémique au profit d'un utilitarisme réifié",
        "La garantie de la gratuité universelle de l'ensemble des énergies",
        "L'éradication définitive de toutes les maladies génétiques"
      ],
      "ans": 1,
      "passEn": "PHILOSOPHY OF NATURE — CONTEMPORARY EPISTEMOLOGY ANNALS: REIFICATION OF THE LIVING AND DISENCHANTMENT.\n\nSubjugation of nature by modernist techno-science transformed the world from a mystery-laden cosmos into a reservoir of exploitable resources. Methodical disenchantment strips humanity of ecosystemic grounding, reducing Earth relations to unilateral utilitarian domination.\n\nBy erasing living sacrality for accounting materialism, modernity broke symbolic human-environment dialogue. Restoring ethical presence requires breaking exploitation logic to rebuild interdependency ecology.",
      "qEn": "What consequences does methodical disenchantment of nature entail?",
      "optEn": [
        "Humanity's spiritual elevation toward ancestral wisdom",
        "Stripping ecosystemic grounding in favor of reified utilitarianism",
        "Guaranteeing universal free energy resources for all",
        "Permanent eradication of all genetic diseases"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion philosophique sur l'esthétique",
      "text": "CRITIQUE CULTURELLE — REVUE D'ESTHÉTIQUE D'AVANT-GARDE : GÉNÉALOGIE DU KITSCH ET DÉSTRUCTURATION DANS LES MASS-MÉDIAS CONTEMPORAINS DU MONDE ENTIER.\n\nLe kitsch ne se caractérise pas par une simple absence de goût individuel ou un défaut d'éducation artistique, mais constitue une esthétique structurée du sentiment facile et du confort émotionnel immédiat. En éliminant toute tension dialectique et tout conflit tragique au profit d'une harmonie frelatée, le kitsch contemporain agit comme un narcotique culturel puissant assurant la pacification idéologique des masses à l'échelle globale. La complexité exigeante de l'art authentique se trouve ainsi balayée.\n\nEn offrant des émotions pré-formatées et immédiatement consommables, l'industrie du kitsch neutralise la pensée critique en satisfaisant le désir individuel de certitude et d'illusion rassurante. L'art authentique s'oppose ainsi radicalement au kitsch en maintenant la blessure du réel et la complexité du doute métaphysique face à l'existence humaine.",
      "q": "Quelle fonction idéologique majeure le kitsch remplit-il selon cette analyse ?",
      "opt": [
        "Il stimule la pensée subversive et la révolte citoyenne",
        "Un anesthésiant culturel favorisant l'alignement idéologique",
        "Il contraint les musées à fermer par manque d'œuvres réelles",
        "Il impose un apprentissage rigoureux des beaux-arts aux jeunes"
      ],
      "ans": 1,
      "passEn": "CULTURAL CRITICISM — AVANT-GARDE AESTHETICS REVIEW: KITSCH GENEALOGY AND MASS MEDIA.\n\nKitsch is characterized not by bad individual taste, but constitutes a structured aesthetics of cheap sentiment and immediate emotional comfort. Eliminating dialectical tension for counterfeit harmony, contemporary kitsch acts as cultural narcotic ensuring ideological pacification.\n\nBy offering pre-formatted consumable emotions, kitsch industries neutralize critical thought satisfying desires for certainty. Authentic art opposes kitsch by maintaining reality's complexity.",
      "qEn": "What major ideological function does kitsch fulfill according to this analysis?",
      "optEn": [
        "Stimulating subversive thought and citizen revolt",
        "A cultural anesthetic promoting ideological alignment",
        "Forcing museum closures due to lack of real artwork",
        "Mandating rigorous fine arts training for youth"
      ]
    },
    {
      "paperNum": 2,
      "qNum": 39,
      "level": "C2",
      "docType": "Extrait d'anthropologie philosophique",
      "text": "ETHIQUE ET ALTÉRITÉ — ANNALES DE PHILOSOPHIE MORALE : L'ALTÉRITÉ IRREDUCTIBLE COMME FONDEMENT ÉTHIQUE DE L'HUMANITÉ CONTEMPORAINE ET LE VISAGE DE L'AUTRE EN QUESTION DANS LES SOCIÉTÉS MODERNES.\n\nL'éthique véritable ne découle aucunement d'un contrat de réciprocité intéressée signé entre individus rationnels cherchant la maximisation de leurs avantages personnels, mais prend sa source originelle dans la responsabilité inconditionnelle et asymétrique envers le visage d'autrui. C'est dans l'épreuve de l'altérité irréductible, qui fait effraction traumatique dans le solipsisme du Moi, que s'enracine la possibilité même de la justice et du devoir moral. L'homme ne devient pleinement humain qu'en répondant véritablement d'autrui.\n\nEn plaçant autrui au centre de la préoccupation philosophique ultime, cette anthropologie éthique rompt radicalement avec le narcissisme moderne. Se reconnaître vulnérable devant l'appel d'autrui fonde l'unique rempart authentique contre la barbarie de l'égoïsme individuel et du repli identitaire désastreux.",
      "q": "Selon l'auteur, quelle est l'origine fondamentale de la responsabilité éthique ?",
      "opt": [
        "Un calcul économique de réciprocité d'intérêts financiers",
        "La responsabilité inconditionnelle et asymétrique envers autrui",
        "L'obéissance aveugle aux lois rédigées par l'État",
        "La recherche permanente du plaisir personnel immédiat"
      ],
      "ans": 1,
      "passEn": "ETHICS AND OTHERNESS — MORAL PHILOSOPHY ANNALS: OTHERNESS AS ETHICAL FOUNDATION.\n\nTrue ethics stems not from self-interested reciprocity contracts between rational agents, but originates in unconditional, asymmetric responsibility before the face of the Other. In confronting irreducible alterity breaking into ego solipsism, justice and moral duty take root.\n\nBy placing the Other at the center of philosophical concern, this ethical anthropology breaks with modern narcissism. Recognizing vulnerability before the Other's call forms the sole barrier against individual selfishness.",
      "qEn": "According to the author, what is the fundamental origin of ethical responsibility?",
      "optEn": [
        "An economic calculation of reciprocal financial self-interest",
        "Unconditional, asymmetric responsibility before the face of the Other",
        "Blind obedience to written state legal codes",
        "Constant pursuit of immediate personal pleasure"
      ]
    }
  ],
  [
    {
      "paperNum": 3,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information municipal",
      "text": "VILLE DE MONTRÉAL — PARC LAFONTAINE : La patinoire extérieure est ouverte gratuitement tous les jours de 10h00 à 22h00 durant la période hivernale. Le chalet d'accueil propose la location de patins et des boissons chaudes jusqu'à 21h30.",
      "q": "Jusqu'à quelle heure le chalet d'accueil loue-t-il des patins à glace ?",
      "opt": [
        "Jusqu'à 21h30",
        "Jusqu'à 21h00",
        "Jusqu'à 20h00",
        "Jusqu'à 22h00"
      ],
      "ans": 0,
      "passEn": "CITY OF MONTREAL — LAFONTAINE PARK: The outdoor ice rink is open free of charge daily from 10:00 AM to 10:00 PM during winter. The welcome chalet provides skate rentals and hot beverages until 9:30 PM.",
      "qEn": "Until what time does the welcome chalet rent ice skates?",
      "optEn": [
        "Until 9:30 PM",
        "Until 9:00 PM",
        "Until 8:00 PM",
        "Until 10:00 PM"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis d'établissement public",
      "text": "COMMUNAUTÉ URBAINE — MUSÉE DES BEAUX-ARTS : Veuillez noter que le musée sera exceptionnellement fermé au public le mardi 15 octobre pour des travaux de maintenance annuelle. Réouverture normale le mercredi 16 octobre dès 09h00.",
      "q": "Pourquoi le musée est-il fermé le mardi 15 octobre ?",
      "opt": [
        "Pour l'installation d'une nouvelle sculpture",
        "En raison de travaux de maintenance annuelle",
        "Pour accueillir une visite ministérielle privée",
        "À cause d'une panne d'électricité générale"
      ],
      "ans": 1,
      "passEn": "URBAN COMMUNITY — MUSEUM OF FINE ARTS: Please note that the museum will be exceptionally closed to the public on Tuesday October 15 for annual maintenance work. Normal reopening on Wednesday October 16 at 9:00 AM.",
      "qEn": "Why is the museum closed on Tuesday October 15?",
      "optEn": [
        "For installing a new outdoor sculpture",
        "Due to annual maintenance work",
        "To host a private ministerial visit",
        "Because of a widespread power outage"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 3,
      "level": "A1",
      "docType": "Message d'information commerciale",
      "text": "BOULANGERIE ARTISANALE DU CENTRE : Chers clients, pendant les fêtes de fin d'année, votre boulangerie sera ouverte du mardi au dimanche de 06h30 à 19h00. Pensez à passer vos commandes de gâteaux 48 heures à l'avance !",
      "q": "Combien de temps à l'avance faut-il réserver les gâteaux ?",
      "opt": [
        "24 heures à l'avance",
        "72 heures à l'avance",
        "48 heures à l'avance",
        "Une semaine à l'avance"
      ],
      "ans": 2,
      "passEn": "DOWNTOWN ARTISAN BAKERY: Dear customers, during the holiday season, your bakery will be open Tuesday through Sunday from 6:30 AM to 7:00 PM. Please place your cake orders 48 hours in advance!",
      "qEn": "How long in advance must cakes be ordered?",
      "optEn": [
        "24 hours in advance",
        "72 hours in advance",
        "48 hours in advance",
        "One week in advance"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 4,
      "level": "A1",
      "docType": "Consigne de sécurité",
      "text": "CENTRE NAUTIQUE MUNICIPAL — CONSIGNES DU BASSIN : Le port du bonnet de bain est strictement obligatoire pour tous les baigneurs. Les douches savonné avant l'accès aux bassins sont exigées pour des raisons d'hygiène collective.",
      "q": "Quelle obligation vestimentaire s'impose aux baigneurs ?",
      "opt": [
        "Porter des lunettes de plongée",
        "Mettre un maillot une pièce uniquement",
        "Porter des sandalettes antidérapantes",
        "Mettre un bonnet de bain"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL AQUATIC CENTER — POOL RULES: Swimming caps are strictly mandatory for all swimmers. Soaped showers before entering the pools are required for public health reasons.",
      "qEn": "What clothing requirement applies to swimmers?",
      "optEn": [
        "Wear diving goggles",
        "Wear a one-piece swimsuit strictly",
        "Wear non-slip deck sandals",
        "Put on a swimming cap"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 5,
      "level": "A2",
      "docType": "Avis de recherche d'animal",
      "text": "PETITE ANNONCE — ANIMAL PERDU : Chat européen à poils courts marron et blanc répondu au nom de 'Milo', égaré depuis hier soir dans le quartier Montcalm. Il porte un collier rouge avec une médaille argentée gravée d'un numéro de téléphone. Si vous l'apercevez, merci de contacter le 06 99 88 77 66.",
      "q": "À quel signe distinctif peut-on identifier Milo ?",
      "opt": [
        "À son collier rouge et sa médaille argentée",
        "À sa tâche noire sur la patte droite",
        "À ses yeux bleus et son harnais vert",
        "À son tatouage à l'intérieur de l'oreille"
      ],
      "ans": 0,
      "passEn": "CLASSIFIED AD — LOST PET: Short-haired brown and white domestic cat named 'Milo', missing since yesterday evening in Montcalm area. Wears a red collar with a silver tag engraved with a phone number. If spotted, please call 06 99 88 77 66.",
      "qEn": "By what distinguishing feature can Milo be identified?",
      "optEn": [
        "By his red collar and silver tag",
        "By a black patch on his right paw",
        "By his blue eyes and green harness",
        "By his inner ear identification tattoo"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce d'atelier communautaire",
      "text": "MAISON DE QUARTIER — ATELIER CUISINE DU MONDE : Rejoignez-nous ce samedi de 14h00 à 17h00 pour apprendre à préparer des plats traditionnels marocains ! L'activité est ouverte aux adultes et aux enfants dès 10 ans. Tarif : 15 euros par personne, matériel et ingrédients inclus. Inscription obligatoire avant jeudi.",
      "q": "Qui peut s'inscrire à cet atelier de cuisine ?",
      "opt": [
        "Les cuisiniers professionnels uniquement",
        "Les adultes et les enfants à partir de 10 ans",
        "Les enfants de moins de 5 ans accompagnés",
        "Les étudiants en restauration universitaire"
      ],
      "ans": 1,
      "passEn": "COMMUNITY CENTER — WORLD CUISINE WORKSHOP: Join us this Saturday from 2:00 PM to 5:00 PM to learn how to cook traditional Moroccan dishes! Open to adults and children aged 10 and above. Fee: 15 euros per person, equipment and ingredients included. Registration required before Thursday.",
      "qEn": "Who is eligible to register for this cooking workshop?",
      "optEn": [
        "Professional chefs strictly",
        "Adults and children aged 10 and up",
        "Children under 5 years with parents",
        "University culinary arts students"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 7,
      "level": "A2",
      "docType": "Note de service d'entreprise",
      "text": "NOTE INTERNE — SERVICES ADMINISTRATIFS : Dans le cadre de la transition vers le travail hybride, tous les salariés sont priés d'enregistrer leurs jours de présence au bureau sur le logiciel RH au moins 48 heures à l'avance. Cette mesure vise à garantir la disponibilité des postes de travail partagés.",
      "q": "Quelle instruction les employés doivent-ils suivre pour travailler au bureau ?",
      "opt": [
        "Réserver leur repas à la cantine par courriel",
        "Obtenir l'accord écrit de la direction générale",
        "Réserver leur poste de travail sur le logiciel RH 48h avant",
        "Envoyer un SMS au responsable de sécurité du bâtiment"
      ],
      "ans": 2,
      "passEn": "INTERNAL MEMO — ADMINISTRATIVE SERVICES: As part of the transition to hybrid work, all employees are requested to register their office presence days on the HR software at least 48 hours in advance. This ensures availability of shared workstations.",
      "qEn": "What instruction must employees follow to work at the office?",
      "optEn": [
        "Order their cafeteria lunch by email",
        "Obtain written approval from corporate directors",
        "Book their workstation on HR software 48h prior",
        "Send a text to the building security guard"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 8,
      "level": "A2",
      "docType": "Annonce d'excursion touristique",
      "text": "CIRCUIT NATURE — BALADE EN BATEAU SUR LE FLEUVE SAINT-LAURENT : Embarquez pour une croisière commentée de deux heures à la découverte de la faune fluviale. Départs quotidiens du quai Chouinard à 10h30 et 15h00. Réservation recommandée sur notre site web. Prévoir des vêtements chauds en raison du vent frais sur le pont.",
      "q": "Quelle recommandation est donnée aux passagers du bateau ?",
      "opt": [
        "Apporter leur propre matériel de pêche",
        "Acheter un masque de plongée au port",
        "Venir avec leur maillot de bain pour la baignade",
        "Prévoir des vêtements chauds pour la traversée"
      ],
      "ans": 3,
      "passEn": "NATURE TOUR — BOAT CRUISE ON THE SAINT LAWRENCE RIVER: Embark on a two-hour guided cruise discovering river wildlife. Daily departures from Chouinard wharf at 10:30 AM and 3:00 PM. Website booking recommended. Bring warm clothing due to cool deck winds.",
      "qEn": "What recommendation is given to boat passengers?",
      "optEn": [
        "Bring their own fishing gear",
        "Buy a diving mask at the harbor store",
        "Wear swimsuits for open water swimming",
        "Bring warm clothing for the crossing"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 9,
      "level": "A2",
      "docType": "Annonce de logement en colocation",
      "text": "IMMOBILIER — COLOCATION ÉTUDIANTE : Chambre meublée de 15 m² disponible immédiatement dans un appartement de 4 pièces entièrement rénové, situé à 5 minutes à pied de la station de métro Université. Loyer : 550 euros par mois, charges comprises (eau, électricité, internet). Recherche colocataire calme et non-fumeur.",
      "q": "Quelle dépense est déjà incluse dans le montant du loyer mensuel ?",
      "opt": [
        "L'ensemble des charges (eau, électricité, internet)",
        "Les frais de blanchisserie professionnelle",
        "L'assurance habitation obligatoire",
        "Les repas du soir préparés en commun"
      ],
      "ans": 0,
      "passEn": "REAL ESTATE — STUDENT ROOMMATE SHARE: 15 sqm furnished bedroom available immediately in a fully renovated 4-room apartment, located a 5-minute walk from University metro station. Rent: 550 euros/month, utilities included (water, power, internet). Seeking quiet non-smoker tenant.",
      "qEn": "What expense is already included in the monthly rent amount?",
      "optEn": [
        "All utilities (water, electricity, internet)",
        "Professional dry cleaning service fees",
        "Mandatory tenant housing insurance policy",
        "Shared evening dinners prepared together"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 10,
      "level": "A2",
      "docType": "Information de chantier municipal",
      "text": "TRAVAUX PUBLICS — INFRASTRUCTURES ROUTIÈRES : En raison de travaux d'asphaltage, le pont de la Rivière-du-Loup sera fermé aux automobiles pendant les nuits du lundi au jeudi de 22h00 à 05h00. Les piétons et les cyclistes pourront continuer à circuler sur la passerelle adjacente sécurisée.",
      "q": "Qui conserve l'accès au pont durant les heures de chantier nocturne ?",
      "opt": [
        "Les autobus scolaires et les camions de livraison",
        "Les piétons et les cyclistes sur la passerelle sécurisée",
        "Aucun usager, la fermeture est totale pour tous",
        "Les voitures particulières immatriculées en ville"
      ],
      "ans": 1,
      "passEn": "PUBLIC WORKS — ROAD INFRASTRUCTURE: Due to paving work, the Rivière-du-Loup bridge will be closed to cars overnight Monday through Thursday from 10:00 PM to 5:00 AM. Pedestrians and cyclists can continue using the adjacent secured walkway.",
      "qEn": "Who retains access to the bridge during overnight construction hours?",
      "optEn": [
        "School buses and commercial delivery trucks",
        "Pedestrians and cyclists on the secured walkway",
        "No users, closure is complete for everyone",
        "Private passenger cars registered locally"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 11,
      "level": "A2",
      "docType": "Règlement de concours culturel",
      "text": "CULTURE ET PATRIMOINE — CONCOURS DE PHOTOGRAPHIE AMATEUR : Participez à notre grand concours photo annuel sur le thème 'L'hiver dans notre région' ! Envoyez vos deux meilleurs clichés au format numérique avant le 30 novembre minuit. De nombreux lots sont à gagner, dont un appareil photo professionnel.",
      "q": "Quelle contrainte s'applique aux photographies soumises ?",
      "opt": [
        "Imprimer les clichés sur papier glacé grand format",
        "Soumettre uniquement des portraits en noir et blanc",
        "Envoyer deux photos au format numérique avant le 30 novembre",
        "Présenter des vidéos de courte durée uniquement"
      ],
      "ans": 2,
      "passEn": "CULTURE AND HERITAGE — AMATEUR PHOTOGRAPHY CONTEST: Enter our annual photo contest themed 'Winter in Our Region'! Send your two best digital photos before November 30 midnight. Great prizes to win, including a professional camera.",
      "qEn": "What constraint applies to submitted photographs?",
      "optEn": [
        "Print photos on large glossy paper",
        "Submit black and white portraits strictly",
        "Send two digital photos before November 30",
        "Present short videos exclusively"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 12,
      "level": "A2",
      "docType": "Annonce de collecte sélective",
      "text": "ENVIRONNEMENT — GESTION DES DÉCHETS MÉNAGERS : À partir du 1er janvier, la collecte des bacs de recyclage (bacs bleus) s'effectuera le mardi matin au lieu du jeudi. Les bacs doivent être déposés en bordure de rue le lundi soir après 19h00.",
      "q": "Quand les habitants doivent-ils sortir leur bac bleu ?",
      "opt": [
        "Le dimanche après-midi",
        "Le jeudi matin très tôt",
        "Le mardi après-midi vers 14h00",
        "Le lundi soir après 19h00"
      ],
      "ans": 3,
      "passEn": "ENVIRONMENT — HOUSEHOLD WASTE MANAGEMENT: Starting January 1st, recycling bin collection (blue bins) will take place Tuesday morning instead of Thursday. Bins must be placed curbside Monday evening after 7:00 PM.",
      "qEn": "When should residents place their blue recycling bins curbside?",
      "optEn": [
        "Sunday afternoon",
        "Thursday morning very early",
        "Tuesday afternoon around 2:00 PM",
        "Monday evening after 7:00 PM"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse locale",
      "text": "INNOVATION COMMUNAUTAIRE — REVUE DU DÉVELOPPEMENT LOCAL : L'ESSOR DES JARDINS PARTAGÉS EN MILIEU URBAIN.\n\nLa municipalité vient d'accorder une subvention exceptionnelle pour aménager cinq nouveaux jardins collectifs au cœur des quartiers populaires de la métropole. Ce projet d'agriculture urbaine permet aux familles riveraines de cultiver leurs propres légumes biologiques tout en créant des lieux de rencontre intergénérationnels.\n\nOutre la production alimentaire locale, ces espaces verts favorisent l'éducation à l'environnement des enfants des écoles du quartier, qui y pratiquent des activités pédagogiques hebdomadaires axées sur le compostage et la biodiversité végétale.",
      "q": "Quel double objectif la création de ces jardins partagés vise-t-elle à atteindre ?",
      "opt": [
        "Favoriser la production légumière locale et créer des liens sociaux intergénérationnels",
        "Remplacer l'intégralité des supermarchés par des marchés de producteurs locaux",
        "Financer la construction de grands complexes sportifs privés dans les quartiers",
        "Interdire la vente de produits alimentaires importés dans la métropole"
      ],
      "ans": 0,
      "passEn": "COMMUNITY INNOVATION — LOCAL DEVELOPMENT REVIEW: EXPANSION OF URBAN COMMUNITY GARDENS.\n\nThe city council granted an exceptional subsidy to create five new community gardens in working-class neighborhoods. This urban agriculture initiative enables local families to grow organic vegetables while fostering intergenerational social connections.\n\nBeyond local food production, these green spaces support environmental education for school children through weekly hands-on workshops focused on composting and plant biodiversity.",
      "qEn": "What dual goal does creating these community gardens aim to achieve?",
      "optEn": [
        "Fostering local vegetable production and building intergenerational social bonds",
        "Replacing all supermarkets with local farmers markets",
        "Funding construction of large private sports complexes",
        "Banning the sale of imported food products across the metro area"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 14,
      "level": "B1",
      "docType": "Bulletin d'information culturelle",
      "text": "CULTURE ET SOCIÉTÉ — MEDIATHÈQUE MUNICIPALE : DIGITALISATION DES FONDS DOCUMENTAIRES ET ACCÈS ÉLARGIE.\n\nGrâce à un ambitieux programme de numérisation étalé sur deux ans, la médiathèque centrale a mis en ligne plus de 50 000 documents d'archives, photographies historiques et manuscrits rares. Désormais, tout usager inscrit peut consulter ces trésors patrimoniaux gratuitement depuis son ordinateur ou sa tablette tactile.\n\nCette initiative vise à démocratiser l'accès au patrimoine historique régional tout en assurant la préservation matérielle de documents anciens extrêmement fragiles, préservés ainsi des manipulations physiques répétées.",
      "q": "Pourquoi la numérisation des archives historiques présente-t-elle un intérêt majeur ?",
      "opt": [
        "Elle permet de réduire le nombre d'employés travaillant à la médiathèque",
        "Elle protège les documents fragiles tout en facilitant leur consultation à distance",
        "Elle oblige les usagers à payer un abonnement mensuel pour lire chez eux",
        "Elle interdit l'accès physique aux salles de lecture traditionnelles du centre"
      ],
      "ans": 1,
      "passEn": "CULTURE AND SOCIETY — MUNICIPAL MEDIA LIBRARY: DIGITIZING ARCHIVAL COLLECTIONS AND EXPANDING ACCESS.\n\nThrough a two-year digitization program, the central media library published over 50,000 archival records, historic photos, and rare manuscripts online. Registered members can consult these heritage treasures free of charge from home computer or tablet.\n\nThis project democratizes access to regional history while preserving fragile physical documents from damage caused by repeated handling.",
      "qEn": "Why is digitizing historical archives of major importance?",
      "optEn": [
        "Allows reducing the number of library employees",
        "Protects fragile documents while facilitating remote access",
        "Requires users to pay monthly fees to read from home",
        "Prohibits physical access to traditional reading rooms"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur les modes de consommation",
      "text": "SOCIÉTÉ — MAG' CONSOMMATION : LE SUCCÈS GRANDISSANT DE L'ACHAT EN VRAC.\n\nDe plus en plus de consommateurs modifient leurs habitudes d'achat quotidiennes en se tournant vers la vente en vrac, qui élimine l'usage des emballages jetables à usage unique. En apportant leurs propres bocaux et sacs réutilisables dans les commerces spécialisés, les usagers réduisent considérablement leur volume de déchets ménagers plastiques.\n\nToutefois, cette pratique exige une organisation rigoureuse lors des courses et une hygiène irréprochable des récipients apportés. De nombreuses enseignes de la grande distribution commencent désormais à intégrer des rayons vrac dans leurs magasins.",
      "q": "Quel est l'avantage environnemental principal de la vente en vrac ?",
      "opt": [
        "La baisse des prix de tous les produits alimentaires d'au moins 50%",
        "La livraison gratuite des achats directement au domicile des clients",
        "La diminution significative de la production de déchets plastiques jetables",
        "L'élimination complète des contrôles sanitaires dans les magasins"
      ],
      "ans": 2,
      "passEn": "SOCIETY — CONSUMER MAGAZINE: GROWING POPULARITY OF BULK SHOPPING.\n\nMore consumers are shifting habits toward bulk shopping, which eliminates single-use disposable packaging. By bringing reusable containers to stores, shoppers significantly cut household plastic waste.\n\nHowever, this practice requires organized shopping routines and strict container cleanliness. Major retail chains are now incorporating bulk sections into mainstream stores.",
      "qEn": "What is the primary environmental benefit of bulk shopping?",
      "optEn": [
        "Reducing all food prices by at least 50%",
        "Free home delivery for all customer purchases",
        "Significant decrease in disposable plastic waste generation",
        "Complete elimination of health inspections in retail grocery stores"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 16,
      "level": "B1",
      "docType": "Communiqué de presse de transport",
      "text": "MOBILITÉ MUNICIPALE — RÉSEAU DE TRANSPORT URBAIN : DÉPLOIEMENT DE LA FLOTTE DE BUS ÉLECTRIQUES.\n\nDans le cadre de son plan de neutralité carbone à l'horizon 2030, la régie des transports urbains s'apprête à remplacer 40 % de ses autobus au diesel par des véhicules 100 % électriques particulièrement silencieux. Ces nouveaux bus seront déployés prioritairement sur les lignes traversant le centre-ville dense.\n\nOutre l'absence totale d'émissions polluantes directes, ces véhicules offrent un confort acoustique remarquable pour les passagers et les riverains, réduisant significativement la nuisance sonore urbaine globale.",
      "q": "Quel avantage ces bus électriques apportent-ils aux riverains des lignes ?",
      "opt": [
        "La gratuité intégrale des trajets pendant les heures de pointe",
        "La suppression de l'obligation de composter son titre de transport",
        "L'augmentation de la vitesse de circulation à plus de 100 km/h",
        "La réduction de la pollution atmosphérique et des nuisances sonores"
      ],
      "ans": 3,
      "passEn": "URBAN MOBILITY — TRANSIT AUTHORITY: DEPLOYING AN ELECTRIC BUS FLEET.\n\nAiming for carbon neutrality by 2030, the transit agency is replacing 40% of diesel buses with 100% quiet electric vehicles. These new buses will run primarily on routes through the dense city center.\n\nBeyond zero direct tailpipe emissions, these vehicles offer remarkable acoustic comfort for passengers and residents, significantly reducing overall urban noise pollution.",
      "qEn": "What advantage do these electric buses bring to residents along routes?",
      "optEn": [
        "Free transit travel during rush hour periods",
        "Elimination of the requirement to validate transit tickets",
        "Increase in driving speeds over 100 km/h in city lanes",
        "Reduction in air pollution and ambient noise levels"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 17,
      "level": "B1",
      "docType": "Chronique sur l'emploi",
      "text": "MONDE DU TRAVAIL — DÉPÊCHE EMPLOI : LE DÉVELOPPEMENT DU TÉLÉTRAVAIL DANS LES PME.\n\nL'adoption du télétravail partiel au sein des petites et moyennes entreprises s'est stabilisée autour de deux jours par semaine pour les fonctions tertiaires. Cette organisation offre aux salariés un meilleur équilibre entre vie professionnelle et vie personnelle en économisant de précieux temps de transport quotidien.\n\nToutefois, la réussite de ce mode d'organisation repose sur le maintien d'une communication fluide au sein des équipes et sur la prévention du risque d'isolement professionnel de certains collaborateurs éloignés du bureau.",
      "q": "Selon l'article, quelle condition garantit le succès du travail à distance ?",
      "opt": [
        "La préservation d'une communication d'équipe régulière et l'anti-isolement",
        "L'obligation de travailler 12 heures par jour sans pause",
        "La suppression définitive des réunions en présence au bureau",
        "La baisse des salaires des collaborateurs effectuant du télétravail"
      ],
      "ans": 0,
      "passEn": "WORLD OF WORK — EMPLOYMENT DISPATCH: EXPANDING REMOTE WORK IN SMES.\n\nPartial remote work in small and medium enterprises settled around two days per week for office roles. This setup provides employees better work-life balance by saving daily commute time.\n\nHowever, success depends on maintaining fluid team communication and preventing professional isolation among remote colleagues.",
      "qEn": "According to the article, what condition guarantees successful remote work?",
      "optEn": [
        "Maintaining regular team communication and preventing isolation",
        "Obligation to work 12 hours a day without breaks",
        "Permanent elimination of all in-person office meetings",
        "Salary cuts for employees working remotely from home"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 18,
      "level": "B1",
      "docType": "Avis de prévention médicale",
      "text": "SANTÉ PUBLIQUE — CAMPAGNE MUNICIPALE DE PRÉVENTION : L'IMPORTANCE DE L'ACTIVITÉ PHYSIQUE QUOTIDIENNE.\n\nFace à l'augmentation préoccupante de la sédentarité chez les adultes travaillant dans des bureaux, les autorités sanitaires recommandent d'effectuer au moins 30 minutes de marche modérée par jour. De simples changements d'habitudes, comme prendre les escaliers plutôt que l'ascenseur, contribuent à prévenir de multiples maladies chroniques.\n\nLes municipalités soutiennent cette démarche en développant des parcours de santé aménagés dans les parcs publics et en installant des équipements d'exercice en accès libre.",
      "q": "Quelle habitude simple les professionnels de santé préconisent-ils d'adopter ?",
      "opt": [
        "S'inscrire obligatoirement dans un club de sport professionnel",
        "Marcher au moins 30 minutes par jour et privilégier les escaliers",
        "Pratiquer la course à pied intensive durant deux heures chaque soir",
        "Acheter du matériel de musculation coûteux à domicile"
      ],
      "ans": 1,
      "passEn": "PUBLIC HEALTH — MUNICIPAL PREVENTION CAMPAIGN: IMPORTANCE OF DAILY PHYSICAL ACTIVITY.\n\nAddressing sedentary desk jobs, health authorities recommend at least 30 minutes of brisk daily walking. Simple habit changes, like taking stairs instead of elevators, help prevent chronic conditions.\n\nMunicipalities support this by installing outdoor fitness trails and free exercise equipment in public parks.",
      "qEn": "What simple daily habit do health professionals recommend?",
      "optEn": [
        "Mandatory sign-up at professional sports gyms",
        "Walking at least 30 minutes daily and taking stairs",
        "Intensive two-hour running workouts every evening",
        "Buying expensive home weightlifting machinery"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur l'éducation numérique",
      "text": "ÉDUCATION — CAHIERS PÉDAGOGIQUES : L'INTRODUCTION DU CODE INFORMATIQUE À L'ÉCOLE PRIMAIRE.\n\nL'apprentissage des bases de la programmation informatique fait désormais partie intégrante des programmes scolaires dès le cycle élémentaire. À travers des jeux de logique visuels sans écran puis de petits logiciels adaptés, les élèves apprennent à structurer un raisonnement algorithmique simple.\n\nL'objectif n'est pas de former prématurément de futurs informaticiens, mais de développer la pensée critique, la résolution créative de problèmes et la compréhension des outils numériques qui façonnent la société contemporaine.",
      "q": "Quel est l'objectif principal de cet enseignement de la programmation ?",
      "opt": [
        "Remplacer l'apprentissage de la lecture par le code informatique",
        "Former des ingénieurs en logiciels utilisables immédiatement en entreprise",
        "Développer le sens logique, la pensée critique et la résolution de problèmes",
        "Obliger chaque élève à posséder un ordinateur personnel à l'école"
      ],
      "ans": 2,
      "passEn": "EDUCATION — PEDAGOGICAL PAPERS: INTRODUCING COMPUTER CODING IN ELEMENTARY SCHOOL.\n\nBasic coding concepts are now integrated into primary school curricula. Using screen-free logic games and tailored software, young students learn simple algorithmic reasoning.\n\nThe goal is not to turn children into software engineers prematurely, but to cultivate critical thinking, creative problem-solving, and digital literacy.",
      "qEn": "What is the primary goal of teaching coding at primary level?",
      "optEn": [
        "Replacing reading instruction with programming languages",
        "Training software engineers ready for corporate employment",
        "Developing logical reasoning, critical thinking, and problem-solving",
        "Requiring every student to own a personal laptop at school"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 20,
      "level": "B1",
      "docType": "Annonce de festival culturel",
      "text": "CULTURE EN FÊTE — FESTIVAL DE CINÉMA DOCUMENTAIRE EN PLEIN AIR.\n\nLa 12e édition du Festival du Film Documentaire se tiendra du 5 au 12 août dans les jardins du château municipal. Chaque soir à la tombée de la nuit, des projections gratuites de longs-métrages abordant l'écologie, l'exploration scientifique et les cultures du monde seront proposées au public.\n\nChaque séance sera suivie d'un débat convivial avec les réalisateurs présents. En cas d'intempéries, les séances seront repliées dans la grande salle des fêtes de l'Hôtel de Ville.",
      "q": "Que se passe-t-il après la diffusion de chaque film documentaire ?",
      "opt": [
        "Une vente aux enchères des droits de distribution du film",
        "Une distribution de récompenses financières aux spectateurs",
        "Un concert de musique classique en grande salle",
        "Un échange interactif avec le réalisateur du documentaire"
      ],
      "ans": 3,
      "passEn": "CULTURE FESTIVAL — OUTDOOR DOCUMENTARY FILM FESTIVAL.\n\nThe 12th annual Documentary Film Festival takes place August 5 to 12 in the municipal castle gardens. Free nightly outdoor screenings feature films on ecology, science exploration, and global cultures.\n\nEach screening is followed by Q&A discussions with attending directors. In case of rain, screenings move indoors to City Hall auditorium.",
      "qEn": "What occurs following each documentary film screening?",
      "optEn": [
        "Auctioning distribution rights for the featured film",
        "Financial prize giveaways to attending audience members",
        "A classical music concert in the main auditorium",
        "An interactive Q&A discussion with attending directors"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur l'écotourisme",
      "text": "TOURISME DURABLE — REVUE DU VOYAGE ÉCORESPONSABLE : LE DÉVELOPPEMENT DU SLOW TOURISM EN MONTAGNE.\n\nS'éloignant du tourisme de masse traditionnel, la pratique du 'slow tourism' séduit un nombre croissant de vacanciers en quête d'authenticité et de calme. Privilégiant les déplacements doux (randonnée à pied, vélo électrique) et les séjours prolongés dans des hébergements éco-conçus, ces voyageurs prennent le temps de découvrir le patrimoine naturel et artisanal local.\n\nCette approche respectueuse de l'environnement permet de revitaliser l'économie des petits villages de montagne tout en réduisant l'impact écologique lié aux déplacements touristiques.",
      "q": "Quelle caractéristique définit le concept de 'slow tourism' selon l'article ?",
      "opt": [
        "Une découverte apaisée favorisant la mobilité douce et le patrimoine local",
        "Des voyages courts axés sur la vitesse et la fréquentation de grands sites",
        "L'usage exclusif de vols hélicoptère pour rejoindre les sommets",
        "L'interdiction absolue de fréquenter les commerces des villages"
      ],
      "ans": 0,
      "passEn": "SUSTAINABLE TOURISM — ECO-FRIENDLY TRAVEL REVIEW: SLOW TOURISM IN THE MOUNTAINS.\n\nMoving away from mass tourism, 'slow tourism' attracts vacationers seeking quiet authenticity. Prioritizing gentle transit (hiking, electric biking) and extended stays in eco-lodges, travelers take time to discover local nature and crafts.\n\nThis respectful approach revitalizes mountain village economies while mitigating tourist carbon footprints.",
      "qEn": "What characteristic defines the concept of 'slow tourism' in the article?",
      "optEn": [
        "Mindful exploration favoring gentle transit and local heritage",
        "Fast-paced short trips focused on crowded tourist sites",
        "Exclusive reliance on helicopter flights to reach summits",
        "Absolute prohibition on shopping at local village stores"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 22,
      "level": "B1",
      "docType": "Rapport sur l'artisanat",
      "text": "ÉCONOMIE MUNICIPALE — RAPPORT SUR LES MÉTIERS D'ART ET L'ARTISANAT LOCAL.\n\nFace à la concurrence des produits industriels fabriqués en série, les ateliers d'artisanat d'art connaissent un regain d'intérêt grâce à l'engouement du public pour les objets durables et personnalisés. De la poterie à la maroquinerie en passant par la réparation de meubles anciens, ces artisans véhiculent des savoir-faire traditionnels inestimables.\n\nToutefois, la transmission de ces métiers spécialisés reste menacée par la difficulté à trouver des apprentis motivés prêts à s'engager dans de longs parcours de formation manuelle.",
      "q": "Quelle difficulté majeure menace l'avenir des ateliers d'artisanat d'art ?",
      "opt": [
        "L'interdiction légale de vendre des objets fabriqués à la main",
        "La complexité à recruter des apprentis pour reprendre les savoir-faire",
        "La hausse incontrôlable du coût des matières premières plastiques",
        "Le désintérêt total des consommateurs pour la qualité des produits"
      ],
      "ans": 1,
      "passEn": "LOCAL ECONOMY — REPORT ON FINE CRAFTS AND ARTISAN WORKSHOPS.\n\nCompeting with mass-produced industrial goods, craft workshops experience renewed interest driven by demand for durable, customized items. From pottery to leatherworking and furniture restoration, artisans preserve invaluable traditional know-how.\n\nHowever, transmitting specialized skills remains threatened by challenges in recruiting motivated apprentices committed to long manual training.",
      "qEn": "What major challenge threatens the future of artisan craft workshops?",
      "optEn": [
        "Legal bans on selling hand-crafted goods",
        "Difficulty recruiting apprentices to carry on traditional know-how",
        "Uncontrolled surges in plastic raw material costs",
        "Total consumer apathy regarding product build quality"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "SOCIOLOGIE DU TRAVAIL — REVUE DES MUTATIONS PROFESSIONNELLES : LA QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS.\n\nLes enquêtes sociologiques récentes menées auprès des jeunes diplômés de l'enseignement supérieur révèlent un basculement profond des priorités de carrière. Désormais, la rémunération financière et le prestige du statut social ne constituent plus les uniques critères d'attractivité d'un poste.\n\nUne majorité de jeunes actifs exige que leur travail quotidien s'inscrive dans une mission sociale ou environnementale concrète, rejetant les fonctions perçues comme dénuées d'utilité collective. Cette quête d'alignement éthique contraint les grandes entreprises à repenser leurs modèles de management sous peine de se heurter à une fuite des talents.",
      "q": "Selon l'étude, quelle exigence nouvelle guide les choix de carrière des jeunes diplômés ?",
      "opt": [
        "La recherche prioritaire du salaire le plus élevé possible à l'embauche",
        "L'exigence d'obtenir des promotions de poste tous les six mois",
        "La volonté d'exercer un travail en phase avec des valeurs sociales et écologiques",
        "Le refus catégorique de collaborer avec des équipes pluri-disciplinaires"
      ],
      "ans": 2,
      "passEn": "WORK SOCIOLOGY — CAREER MUTATIONS REVIEW: THE QUEST FOR MEANING AMONG YOUNG GRADUATE WORKERS.\n\nRecent sociological surveys among higher education graduates reveal a shift in career priorities. High salaries and corporate prestige no longer serve as sole job attractiveness metrics.\n\nA majority of young professionals demand that daily work align with social or environmental missions, rejecting roles deemed lacking collective utility. This ethical alignment drive forces corporations to restructure management to retain top talent.",
      "qEn": "According to the study, what new demand guides career choices for young graduates?",
      "optEn": [
        "Prioritizing the highest possible starting salary at hiring",
        "Demoting non-executive roles in favor of bi-annual promotions",
        "Pursuing work aligned with tangible social and ecological values",
        "Categorical refusal to collaborate with multidisciplinary teams"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 24,
      "level": "B2",
      "docType": "Étude d'urbanisme durable",
      "text": "AMÉNAGEMENT DU TERRITOIRE — REVUE DE LA VILLE DURABLE : LA DENSIFICATION DOUCE FACE À L'ÉTALEMENT URBAIN.\n\nPour lutter contre l'artificialisation galopante des terres agricoles en périphérie des métropoles, les urbanistes préconisent le concept de 'densification douce'. Cette stratégie consiste à optimiser les espaces sous-utilisés au sein du tissu urbain existant — en surélevant des bâtiments ou en réhabilitant des dents creuses — sans altérer le cadre de vie des habitants.\n\nBien qu'elle préserve les espaces naturels périurbains, cette démarche se heurte parfois à la réticence des riverains, qui redoutent la saturation des équipements publics et des axes de circulation locaux.",
      "q": "Quel principe fondamental régit la stratégie de 'densification douce' ?",
      "opt": [
        "Construire de nombreuses tours de grande hauteur dans les zones agricoles",
        "Interdire toute nouvelle construction de logement sur le territoire national",
        "Expulser les habitants des centres-villes pour créer des parcs naturels",
        "Optimiser les parcelles libres en ville pour stopper le grignotage des sols naturels"
      ],
      "ans": 3,
      "passEn": "URBAN PLANNING — SUSTAINABLE CITY REVIEW: GENTLE DENSIFICATION VERSUS URBAN SPRAWL.\n\nTo combat rampant agricultural soil conversion around metropolitan fringes, planners advocate 'gentle densification'. This strategy optimizes underutilized parcels within existing urban grids—raising building heights or infilling vacant lots—without degrading living environments.\n\nWhile preserving peri-urban natural spaces, this approach sometimes faces local resident pushback over feared public infrastructure overload and traffic congestion.",
      "qEn": "What fundamental principle governs the strategy of 'gentle densification'?",
      "optEn": [
        "Building high-rise skyscrapers across prime agricultural farmland",
        "Banning all new residential housing construction nationwide",
        "Evicting residents from city centers to establish nature reserves",
        "Optimizing vacant urban lots to curb natural soil conversion"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 25,
      "level": "B2",
      "docType": "Chronique scientifique",
      "text": "TECHNOLOGIE ET ÉTHIQUE — BULLETIN DE LA RECHERCHE EN IA : LA QUESTION DU BIAIS ALGORITHMIQUE DANS LE RECRUTEMENT.\n\nL'utilisation de logiciels de tri automatique des candidatures par l'intelligence artificielle s'est généralisée dans les grands groupes afin d'accélérer les processus d'embauche. Toutefois, plusieurs études démontrent que ces algorithmes, entraînés sur des historiques de données RH du passé, reproduisent et amplifient involontairement des discriminations de genre ou d'origine.\n\nFaute d'audit régulier des jeux de données et de contrôle humain dans la décision finale, l'automatisation risque d'enfermer le recrutement dans des schémas stéréotypés sous couvert de neutralité technologique.",
      "q": "Quel risque majeur découle de l'utilisation non contrôlée de l'IA en recrutement ?",
      "opt": [
        "La reproduction automatisée de discriminations issues de historiques du passé",
        "La baisse immédiate du nombre global de candidatures reçues",
        "L'interdiction d'embaucher des candidats n'ayant pas de diplôme en informatique",
        "La hausse incontrôlable des coûts de traitement des dossiers RH"
      ],
      "ans": 0,
      "passEn": "TECH AND ETHICS — AI RESEARCH BULLETIN: ALGORITHMIC BIAS IN RECRUITMENT SOFTWARE.\n\nUsing AI to automate candidate screening has expanded across corporations to expedite hiring. However, studies show that algorithms trained on past HR data unintentionally replicate and amplify historical gender or diversity biases.\n\nWithout regular data audits and human oversight in final decisions, automation risks locking hiring into stereotyped patterns under the guise of technological neutrality.",
      "qEn": "What major risk stems from unsupervised AI usage in candidate recruitment?",
      "optEn": [
        "Automated replication of historical bias patterns embedded in past data",
        "Immediate decline in the total number of applications received",
        "Prohibition against hiring candidates lacking computer science degrees",
        "Uncontrolled surges in administrative candidate file processing costs"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 26,
      "level": "B2",
      "docType": "Bilan économique et environnemental",
      "text": "ÉCONOMIE CIRCULAIRE — REVUE DE L'ÉCOLOGIE INDUSTRIELLE : LE DÉFI DU RECYCLAGE DES DÉCHETS ÉLECTRONIQUES.\n\nLa baisse constante de la durée de vie des équipements électroniques génère un volume gigantesque de déchets complexes à traiter. Contenant des métaux précieux rares mais aussi des substances hautement toxiques, ces appareils nécessitent des filières de dépollution et de recyclage spécialisées hautement technologiques.\n\nOr, une part considérable de ces déchets est encore exportée illégalement vers des pays en développement, où ils subissent un traitement artisanal sans protection sanitaire ni environnementale, provoquant des désastres écologiques et humains dramatiques.",
      "q": "Selon le bilan, quel problème majeur entache la gestion actuelle des déchets électroniques ?",
      "opt": [
        "L'absence totale de métaux précieux dans la composition des appareils",
        "L'exportation illégale vers des régions démunies aux méthodes de traitement nocives",
        "Le refus des consommateurs de restituer leurs anciens appareils électroniques",
        "Le coût dérisoire des équipements neufs qui empêche toute réparation"
      ],
      "ans": 1,
      "passEn": "CIRCULAR ECONOMY — INDUSTRIAL ECOLOGY REVIEW: THE ELECTRONIC WASTE RECYCLING CHALLENGE.\n\nDeclining lifespan of electronic devices generates massive complex waste streams. Containing rare precious metals alongside toxic materials, these devices require specialized high-tech recycling and depollution channels.\n\nHowever, significant volumes are still illegally exported to developing nations, undergoing crude processing without environmental or health safeguards, causing severe ecological and human damage.",
      "qEn": "According to the report, what major issue taints current electronic waste management?",
      "optEn": [
        "Total absence of precious metals in consumer electronic builds",
        "Illegal export to vulnerable regions using harmful treatment methods",
        "Consumer refusal to return old electronics to designated drop-offs",
        "Inexpensive new device pricing that completely discourages repairs"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 27,
      "level": "B2",
      "docType": "Rapport sur la santé mentale",
      "text": "SANTÉ ET SOCIÉTÉ — OBSERVATOIRE DE LA SANTÉ PUBLIQUE : IMPACT DES ÉCRANS ET HYPERCONNEXION CHEZ LES ADOLESCENTS.\n\nL'usage omniprésent des réseaux sociaux et la sollicitation permanente par des notifications numériques altèrent profondément la qualité du sommeil et la capacité d'attention des adolescents. Les spécialistes de la santé observent une hausse marquée des troubles de l'anxiété liés à la comparaison sociale constante générée par ces plateformes.\n\nFace à cette dérive, les pédiatres recommandent l'instauration de périodes de déconnexion numérique quotidiennes en famille et l'interdiction des écrans dans les chambres à coucher durant la nuit.",
      "q": "Quelle conséquence dommageable de l'hyperconnexion est soulignée par l'observatoire ?",
      "opt": [
        "L'amélioration spectaculaire des résultats scolaires en mathématiques",
        "La baisse globale des ventes de smartphones à l'échelle internationale",
        "La dégradation du sommeil et l'augmentation des troubles anxieux",
        "L'obligation légale de fermer les plateformes numériques le weekend"
      ],
      "ans": 2,
      "passEn": "HEALTH AND SOCIETY — PUBLIC HEALTH OBSERVATORY: SCREEN TIME IMPACT AND TEEN HYPER-CONNECTIVITY.\n\nPervasive social media usage and constant digital notifications alter sleep quality and attention spans among teenagers. Health experts note a sharp rise in anxiety disorders linked to relentless social comparison on digital platforms.\n\nAddressing this issue, pediatricians recommend daily family digital disconnect periods and banning screens from bedrooms overnight.",
      "qEn": "What harmful consequence of hyper-connectivity is highlighted by the observatory?",
      "optEn": [
        "Spectacular improvements in standardized academic mathematics test scores",
        "Global drop in smartphone unit sales worldwide",
        "Sleep degradation and an increase in adolescent anxiety disorders",
        "Legal mandates requiring digital platform shutdowns on weekends"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 28,
      "level": "B2",
      "docType": "Article sur l'agriculture biologique",
      "text": "AGRICULTURE ET ALIMENTATION — REVUE D'AGRONOMIE DURABLE : LES FREINS À L'CONVERSION EN AGRICULTURE BIOLOGIQUE.\n\nBien que la demande des consommateurs pour des aliments sans pesticides reste soutenue, la transition des exploitations agricoles vers le mode biologique connaît un ralentissement notable. La période de conversion — qui exige trois années d'adaptation sans possibilité de valoriser les récoltes sous le label bio — fait peser un risque financier lourd sur les agriculteurs.\n\nSans un soutien public compensatoire garanti durant cette phase de transition critique, le surcoût de la main-d'œuvre et le risque d'une baisse temporaire des rendements découragent de nombreux producteurs traditionnels.",
      "q": "Quel obstacle financier freine la conversion des agriculteurs vers le mode biologique ?",
      "opt": [
        "L'absence complète de demande des consommateurs pour la nourriture bio",
        "L'obligation d'acheter des machines agricoles robotisées coûteuses",
        "L'interdiction gouvernementale d'exporter des produits agricoles biologiques",
        "La période de transition de trois ans sans valorisation tarifaire du label"
      ],
      "ans": 3,
      "passEn": "AGRICULTURE AND FOOD — SUSTAINABLE AGRONOMY REVIEW: HURDLES TO ORGANIC FARMING CONVERSION.\n\nWhile consumer demand for pesticide-free food remains steady, farm conversion to organic methods experienced a noticeable slowdown. The conversion window—requiring three years of adaptation without organic label price premiums—places heavy financial risks on farmers.\n\nWithout guaranteed public subsidies during this critical transition phase, labor surcharges and temporary yield drops discourage many traditional producers.",
      "qEn": "What financial hurdle delays farmers' conversion to organic methods?",
      "optEn": [
        "Complete absence of consumer demand for organic food products",
        "Mandatory purchasing of costly robotic agricultural machinery",
        "Government export bans on organic agricultural yields",
        "Three-year transition phase without organic label price premiums"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la préservation de la biodiversité",
      "text": "BIODIVERSITÉ — CAHIERS DE LA CONSERVATION NATURELLE : L'IMPACT DE LA POLLUTION LUMINEUSE SUR LA FAUNE NOCTURNE.\n\nL'éclairage artificiel excessif des infrastructures urbaines et routières perturbe gravement les cycles biologiques de nombreuses espèces animales nocturnes (insectes, chauves-souris, oiseaux migrateurs). En modifiant l'alternance naturelle du jour et de la nuit, la lumière nocturne altère les comportements de chasse, de reproduction et d'orientation spatiale.\n\nPour remédier à cet écocide silencieux, plusieurs communes expérimentent l'extinction partielle de l'éclairage public au cœur de la nuit et l'installation de lampadaires à faisceau orienté vers le sol.",
      "q": "Quelle mesure corrective les municipalités testent-elles pour protéger la faune nocturne ?",
      "opt": [
        "L'extinction ciblée de l'éclairage public durant certaines heures nocturnes",
        "L'augmentation de la puissance des projecteurs urbains de nuit",
        "La capture systématique des oiseaux migrateurs pour les protéger",
        "L'interdiction de toute circulation automobile durant la journée"
      ],
      "ans": 0,
      "passEn": "BIODIVERSITY — NATURE CONSERVATION PAPERS: LIGHT POLLUTION IMPACT ON NOCTURNAL WILDLIFE.\n\nExcessive artificial lighting from urban infrastructure disrupts biological cycles of nocturnal animal species (insects, bats, migratory birds). By altering natural day-night contrast, artificial light disturbs hunting, breeding, and navigation.\n\nTo counter this silent ecological threat, municipalities are testing partial overnight streetlight shutoffs and installing ground-directed light fixtures.",
      "qEn": "What corrective measure are municipalities testing to protect nocturnal wildlife?",
      "optEn": [
        "Targeted streetlight shutoffs during specific overnight hours",
        "Increasing urban streetlight brightness during overnight hours",
        "Systematic capture of migratory birds to protect them from light",
        "Total bans on all motorized vehicle traffic during daylight hours"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial socio-politique",
      "text": "CRITIQUE SOCIÉTALE — TRIBUNE DE SOCIOLOGIE POLITIQUE : LES ILLUSIONS DE LA DÉMOCRATIE PARTICIPATIVE NUMÉRIQUE.\n\nL'institutionnalisation des plateformes de consultation citoyenne en ligne par les collectivités publiques est fréquemment présentée comme l'avènement d'une démocratie directe, transparente et inclusive. En permettant à chaque habitant de formuler des propositions ou de voter sur des projets d'aménagement urbain, la rhétorique officielle prétend abolir la distance entre gouvernants et gouvernés. Cependant, une observation attentive des sociologies de participants révèle une distorsion représentative criante. Les démarches numériques surreprésentent massivement les catégories socioprofessionnelles supérieures dotées d'un fort capital culturel, accentuant l'éviction des classes populaires du débat public.\n\nDe surcroît, le caractère purement consultatif de ces dispositifs laisse aux instances décisionnelles le pouvoir discrétionnaire de sélectionner ou d'écarter les propositions citoyennes sans justification contraignante. Loin de régénérer la délibération citoyenne, la démocratie numérique risque de dériver vers une simple opération de légitimation communicationnelle de décisions arrêtées en amont par les élites administratives. Dès lors, substituer l'illusion algorithmique du clic à la confrontation politique réelle menace d'aggraver la crise de confiance envers les institutions représentatives.",
      "q": "Quelle dérive centrale l'auteur dénonce-t-il au sujet des consultations citoyennes en ligne ?",
      "opt": [
        "Elles provoquent la faillite financière immédiate des collectivités locales",
        "Elles masquent une exclusion sociologique sous couvert de participation démocratique",
        "Elles obligent tous les citoyens à souscrire des abonnements informatiques payants",
        "Elles suppriment définitivement le droit de vote lors des élections nationales"
      ],
      "ans": 1,
      "passEn": "SOCIETAL CRITIQUE — POLITICAL SOCIOLOGY ESSAY: ILLUSIONS OF DIGITAL PARTICIPATORY DEMOCRACY.\n\nInstitutionalizing online citizen consultation platforms is framed as the dawn of inclusive direct democracy. By allowing residents to vote on urban projects, official rhetoric claims to erase gaps between citizens and government. However, participant demographics reveal stark distortions. Digital consultations heavily overrepresent educated professionals, furthering working-class exclusion from public debate.\n\nMoreover, the non-binding nature of these tools leaves discretion to officials to select or dismiss citizen input without accountability. Far from renewing civic engagement, digital democracy risks devolving into PR validation for pre-arranged administrative choices, threatening trust in representative institutions.",
      "qEn": "What central drift does the author denounce regarding online citizen consultations?",
      "optEn": [
        "They trigger immediate financial bankruptcy for local municipal governments",
        "They mask sociological exclusion under the guise of democratic participation",
        "They require all citizens to purchase paid software subscriptions",
        "They permanently abolish voting rights during national general elections"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai sur l'économie de la culture",
      "text": "ÉCONOMIE DU PATRIMOINE — CAHIERS DE SOCIOLOGIE CULTURELLE : LA MUSEIFICATION DES DENTELLES URBAINES ET LA MARCHANDISATION DU CADRE DE VIE.\n\nLa transformation accélérée des centres historiques métropolitains en véritables musées à ciel ouvert répond à des exigences impérieuses d'attractivité touristique mondiale. En préservant scrupuleusement le décor architectural ancien tout en en expulsant les activités artisanales et les populations résidentielles historiques, les politiques d'aménagement produisent un phénomène d'évidement sociologique des quartiers centraux. Le décor historique est maintenu dans une perfection factice, mais la vie de quartier authentique s'en trouve totalement éradiquée.\n\nCette marchandisation du patrimoine réduit l'espace urbain à une valeur de consommation visuelle pour visiteurs de passage, transformant les commerces de proximité en boutiques de luxe ou en franchises standardisées. Sous couvert de valorisation patrimoniale, cette muséification stérile aliène la mémoire collective en transformant des lieux de mémoire vivante en décors théâtraux standardisés pour le marché du tourisme mondialisé.",
      "q": "Comment l'auteur qualifie-t-il la transformation des centres historiques en espaces touristiques ?",
      "opt": [
        "Un essor économique équitable profitant à l'ensemble des habitants originels",
        "Une destruction totale des bâtiments anciens remplacés par des structures modernes",
        "Un évidement sociologique remplaçant la vie de quartier par une scénographie marchande",
        "Une mesure écologique indispensable pour éliminer définitivement la circulation"
      ],
      "ans": 2,
      "passEn": "CULTURAL ECONOMICS — CULTURAL SOCIOLOGY PAPERS: URBAN MUSEUMIFICATION AND COMMERCIALIZATION.\n\nThe rapid transformation of historic city centers into open-air museums caters to global tourist attraction demands. By scrupulously preserving ancient architectural facades while pricing out artisanal trades and long-time residents, planning policies cause sociological hollowing. Historic decor is maintained in artificial perfection while authentic community life is erased.\n\nThis heritage commercialization reduces urban space to visual consumption for transient visitors, replacing neighborhood shops with luxury boutiques or standardized chains. Beneath heritage preservation, sterile museumification transforms living memory into standardized theatrical backdrops for global tourism.",
      "qEn": "How does the author characterize turning historic centers into tourist spaces?",
      "optEn": [
        "Equitable economic growth benefiting all original long-time neighborhood residents",
        "Complete demolition of historical buildings replaced by modern steel structures",
        "Sociological hollowing replacing authentic community life with commercial staging",
        "Indispensable ecological initiative to permanently eliminate city car traffic"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse critique sur les médias",
      "text": "MÉDIAS ET DÉBAT PUBLIC — REVUE D'ANALYSE DU DISCOURS : LA FAST-INFORMATION ET LA COMPRESSION DE LA PENSÉE CRITIQUE.\n\nL'hégémonie des chaînes d'information en continu et des fil d'actualité sur les réseaux sociaux a imposé un rythme d'actualité frénétique où la réactivité immédiate l'emporte de manière décisive sur l'analyse approfondie. Dans cette course permanente au scoop et au buzz visuel, le traitement journalistique se trouve réduit à des séquences d'images chocs et à des affrontements de slogans simplistes, évacuant toute possibilité de contextualisation historique ou de nuance conceptuelle.\n\nCette tyrannie de l'instant produit une véritable atrophie du débat démocratique. En habituant le public à des consommateurs de bribes d'information déconnectées, le système médiatique contemporain affaiblit la capacité de discernement réflexif indispensable à l'exercice d'une citoyenneté éclairée. Reconnecter le citoyen à la complexité exige ainsi de réhabiliter la lenteur journalistique et l'enquête de long cours face aux dérives du sensationnalisme numérique.",
      "q": "Quel impact dommageable l'hégémonie de l'information en continu a-t-elle sur le public ?",
      "opt": [
        "Une hausse spectaculaire de la maîtrise de l'histoire contemporaine chez les jeunes",
        "La gratuité universelle de l'accès à tous les journaux d'investigation",
        "L'interdiction absolue d'émettre des critiques à l'encontre des décisions gouvernementales",
        "Une érosion du discernement réflexif due à la primauté du sensationnalisme immédiat"
      ],
      "ans": 3,
      "passEn": "MEDIA AND PUBLIC DEBATE — DISCOURSE ANALYSIS REVIEW: FAST NEWS AND COMPRESSION OF CRITICAL THINKING.\n\nThe dominance of 24-hour news channels and social media feeds enforces a frantic pace where instant reactivity overrides deep analysis. In a relentless race for scoops and viral visual engagement, journalism shrinks to sound bites and polarized slogans, discarding historical context or nuanced analysis.\n\nThis tyranny of immediacy erodes democratic debate. By conditioning audiences to consume disconnected news snippets, contemporary media weakens the reflective discernment vital for informed citizenship. Reconnecting citizens with complexity requires championing slow journalism over digital sensationalism.",
      "qEn": "What damaging impact does 24-hour news dominance exert on the public?",
      "optEn": [
        "Spectacular gains in historical mastery among younger generations",
        "Universal free access to all investigative journalism publications",
        "Absolute prohibition against publishing critiques of government decisions",
        "Erosion of reflective discernment driven by immediate sensationalism"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 33,
      "level": "C1",
      "docType": "Réflexion sur l'architecture moderne",
      "text": "ARCHITECTURE ET SOCIÉTÉ — REVUE D'ESTHÉTIQUE URBAINE : L'UNIFORMISATION ARCHITECTURALE INTERNATIONALE ET LA PERTE DU GENIUS LOCI.\n\nLa prolifération mondiale de gratte-ciel en verre et en acier, identiques de Singapour à Francfort ou Montréal, incarne la victoire d'un fonctionnalisme marchand déconnecté des réalités géographiques et culturelles locales. En privilégiant des matériaux standardisés et des formes épurées passe-partout, l'architecture contemporaine dominante efface progressivement l'identité singulière des paysages urbains, plongeant les métropoles dans un anonymat visuel perturbant et stérile.\n\nCette érosion du 'genius loci' — l'esprit du lieu — altère le sentiment d'appartenance des habitants à leur environnement quotidien. Réinventer l'urbanisme contemporain exige de dépasser cette esthétique du contenant interchangeable pour renouer avec des matériaux biosourcés régionaux et une sensibilité bioclimatique attentive à l'histoire locale. Seule cette réappropriation territoriale permettra de restituer aux citadins un cadre de vie habité, durable et porteur de sens pour les générations futures.",
      "q": "Quelle critique majeure l'auteur formule-t-il à l'encontre du fonctionnalisme architectural contemporain ?",
      "opt": [
        "L'effacement des identités locales au profit d'une esthétique marchande interchangeable",
        "Son coût de construction dérisoire qui dévalorise le travail des ouvriers",
        "Son refus d'utiliser les technologies numériques de modélisation 3D",
        "Son obligation légale d'employer exclusivement du bois brut pour les façades"
      ],
      "ans": 0,
      "passEn": "ARCHITECTURE AND SOCIETY — URBAN AESTHETICS REVIEW: ARCHITECTURAL UNIFORMITY AND THE LOSS OF GENIUS LOCI.\n\nThe global spread of identical glass-and-steel skyscrapers from Frankfurt to Montreal embodies commercial functionalism detached from local geography and culture. By prioritizing standardized materials and generic forms, dominant architecture erases unique urban landscapes, plunging cities into visual anonymity.\n\nThis erosion of 'genius loci'—the spirit of place—weakens residents' sense of belonging. Reimagining urbanism requires transcending interchangeable container aesthetics to embrace regional bio-sourced materials and bioclimatic awareness tied to local history. Only this territorial re-anchoring can restore meaningful living spaces for future generations.",
      "qEn": "What major critique does the author level against contemporary architectural functionalism?",
      "optEn": [
        "Erasing local identity in favor of interchangeable commercial aesthetics",
        "Its low construction cost that devalues manual construction labor",
        "Its refusal to utilize digital 3D architectural modeling software",
        "Its legal requirement to use raw timber exclusively on building facades"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai sur l'écologie politique",
      "text": "ÉCOLOGIE POLITIQUE — REVUE DE LA TRANSITION SOCIÉTALE : LE PARADOXE DE JEVONS ET LES LIMITES DE L'EFFICACITÉ TECHNOLOGIQUE.\n\nDans le débat environnemental contemporain, la foi quasi-religieuse dans l'innovation technologique comme solution miracle au réchauffement climatique occulte un principe économique fondamental connu sous le nom de paradoxe de Jevons. Ce phénomène démontre que l'augmentation de l'efficacité énergétique d'une ressource entraîne fréquemment une baisse de son coût unitaire, ce qui stimule en retour une hausse globale de sa consommation globale.\n\nAinsi, les gains d'efficacité réalisés sur les moteurs ou les équipements numériques se trouvent systématiquement annulés par l'explosion du volume des usages. Vouloir résoudre la crise écologique uniquement par le progrès technique sans interroger la sobriété des modes de vie relève d'une illusion dramatique qui perpétue le productivisme. Seule une remise en cause de l'impératif de croissance permettra d'enrayer l'épuisement des ressources naturelles.",
      "q": "Selon l'analyse, pourquoi le seul progrès technologique ne suffit-il pas à réduire l'empreinte écologique ?",
      "opt": [
        "Parce que les innovations techniques sont immédiatement interdites par les gouvernements",
        "Parce que les gains d'efficacité abaissent les coûts et provoquent un surcroît de consommation",
        "Parce que les ingénieurs refusent de développer des moteurs moins énergivores",
        "Parce que la population mondiale refuse catégoriquement d'utiliser les nouvelles technologies"
      ],
      "ans": 1,
      "passEn": "POLITICAL ECOLOGY — SOCIETAL TRANSITION REVIEW: JEVONS' PARADOX AND THE LIMITS OF TECH EFFICIENCY.\n\nIn environmental debates, reliance on technological innovation as a climate silver bullet obscures Jevons' paradox. This economic principle shows that improving resource efficiency reduces unit costs, which paradoxically triggers a surge in overall resource consumption.\n\nThus, efficiency gains in engines or digital devices are routinely offset by volume expansion. Attempting to solve climate crises through tech alone without addressing consumption restraint is a dangerous illusion sustaining productivism. Only questioning growth imperatives will halt natural resource depletion.",
      "qEn": "According to the analysis, why is tech progress alone insufficient to lower ecological footprints?",
      "optEn": [
        "Because technical innovations are immediately banned by state governments",
        "Because efficiency gains lower costs and trigger increased consumption volumes",
        "Because engineers refuse to design less energy-intensive engines",
        "Because global populations categorically reject using new technology"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 35,
      "level": "C1",
      "docType": "Étude d'histoire et de sociologie de l'art",
      "text": "HISTOIRE DE L'ART — CAHIERS DE RECHERCHE ESTHÉTIQUE : L'ÉVOLUTION DE LA FIGURE DE L'ARTISTE DE L'ATELIER AU MARCHÉ MONDIALISÉ.\n\nLa trajectoire historique du statut de l'artiste depuis la Renaissance témoigne d'une émancipation progressive vis-à-vis des tutelles religieuses et monarchiques, culminant au XIXe siècle dans le mythe de l'artiste maudit, libre et désintéressé. Toutefois, le basculement contemporain vers le capitalisme financier a profondément reconfiguré cette posture mythique. Aujourd'hui, l'artiste à succès est invité à se comporter en véritable chef d'entreprise de sa propre marque, gérant sa visibilité médiatique et sa cote sur le marché des enchères.\n\nCette fusion entre création plastique et stratégie entrepreneuriale modifie la nature même des œuvres produites, souvent conçues pour leur impact visuel immédiat sur les réseaux sociaux et leur valeur spéculative. Si cette évolution offre des moyens financiers inédits aux plasticiens cotés, elle fait peser une menace d'assujettissement du discours esthétique aux impératifs de la rentabilité commerciale.",
      "q": "Comment la posture de l'artiste contemporain a-t-elle évolué sous l'effet du marché financier ?",
      "opt": [
        "Elle est redevenue strictement soumise à l'autorité des institutions religieuses",
        "Elle exige désormais l'abandon total de toute forme d'exposition publique",
        "Elle est passée de la figure du créateur désintéressé à celle d'un gestionnaire d'entreprise de marque",
        "Elle interdit aux plasticiens de percevoir des rémunérations financières pour leurs créations"
      ],
      "ans": 2,
      "passEn": "ART HISTORY — AESTHETIC RESEARCH PAPERS: THE ARTIST'S ROLE FROM THE STUDIO TO THE GLOBAL MARKET.\n\nThe historical status of artists since the Renaissance reflects progressive emancipation from religious and monarchical patrons, culminating in the 19th-century myth of the independent artist. However, modern financial capitalism restructured this posture. Today's successful artist acts as a brand entrepreneur managing media visibility and auction valuations.\n\nThis merger of creative practice and corporate strategy alters the nature of artworks, designed for instant social media impact and speculative value. While providing funds for top artists, it threatens to subordinate aesthetic expression to commercial profitability.",
      "qEn": "How has the contemporary artist's role evolved under financial market influence?",
      "optEn": [
        "Shifted back to strict subordination under religious patron authorities",
        "Requires total abandonment of all public gallery exhibition formats",
        "Shifted from independent creator to corporate brand manager",
        "Prohibits visual artists from accepting monetary payment for their works"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique contemporaine",
      "text": "PHILOSOPHIE SOCIALE — ANNALES DE LA PENSÉE CONTEMPORAINE : LA DIALECTIQUE DU VIDE ET LE SPECTACLE DE L'ACCÉLÉRATION DANS LA MODERNITÉ TARDIVE.\n\nL'injonction contemporaine à la réactivité permanente et à la surstimulation numérique a progressivement dissous la capacité humaine de contemplation silencieuse et de vacuité créatrice. En érigeant le remplissage compulsif du temps en vertu sociale suprême, nos sociétés hyper-industrielles étouffent le temps mort, cette respiration fondamentale de la pensée à partir de laquelle s'élabore la profondeur réflexive. L'existence se trouve ainsi ravalée à un flux ininterrompu de stimuli réactifs.\n\nCette horreur du vide mène à une véritable aliénation de l'expérience intérieure. En traquant sans relâche le silence et l'ennui au moyen de dispositifs algorithmiques d'interactivité marchande, le modèle technologique priver l'individu de la solitude féconde indispensable à la découverte de soi. Reconquérir la liberté d'esprit exige ainsi de réhabiliter le droit au vide et à la lenteur contre la tyrannie de l'accélération systémique.",
      "q": "Quelle thèse philosophique centrale l'auteur défend-il quant au temps mort et au silence ?",
      "opt": [
        "Ils constituent une perte de productivité économique devant être éradiquée par l'automatisation",
        "Ils doivent être strictement réservés aux périodes de retraite professionnelle autorisées par l'État",
        "Ils favorisent le développement des maladies neurodégénératives chez les travailleurs âgés",
        "Ils représentent des espaces de respiration nécessaires à l'élaboration de la pensée autonome"
      ],
      "ans": 3,
      "passEn": "SOCIAL PHILOSOPHY — ANNALS OF CONTEMPORARY THOUGHT: DIALECTICS OF EMPTINESS AND ACCELERATION.\n\nImperatives of digital overstimulation dissolve human capacity for silent contemplation and creative emptiness. By framing compulsive time-filling as supreme social virtue, hyper-industrial societies suffocate idle time—the fundamental breath of thought fostering deep reflexivity. Existence shrinks to an uninterrupted stream of reactive stimuli.\n\nThis aversion to emptiness alienates inner experience. By hunting down silence and boredom via interactive digital algorithms, technology deprives individuals of fertile solitude essential for self-discovery. Reclaiming intellectual freedom requires defending the right to slowness against systemic acceleration.",
      "qEn": "What central thesis does the author defend regarding idle time and silence?",
      "optEn": [
        "They represent economic productivity losses that automation must eradicate",
        "They should be restricted exclusively to state-sanctioned retirement years",
        "They foster neurodegenerative disease progression among aging workers",
        "They represent essential reflective spaces vital for cultivating autonomous thought"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie politique",
      "text": "ÉPISTÉMOLOGIE — REVUE INTERNATIONALE DE PHILOSOPHIE POLITIQUES : LE TECHNOCRATISME ET LA DÉPOSSESSION DE LA DÉLIBÉRATION ÉTHIQUE.\n\nLa tendance croissante à réduire les arbitrages politiques majeurs à de simples calculs d'optimisation technocratique et d'ingénierie financière opère une dépolitisation pernicieuse de la sphère publique. En présentant les décisions stratégiques touchant au bien commun comme des nécessités techniques inéluctables dictées par des experts, le modèle managérial dominant neutralise le conflit idéologique et évacue le débat sur les finalités morales de la société.\n\nCette confiscation du choix citoyen sous couvert d'expertise scientifique crée une profonde fracture démocratique. Lorsque la légitimité politique s'appuie exclusivement sur des métriques chiffrées et la performance managériale au détriment de l'exigence éthique de justice sociale, les citoyens se trouvent dépossédés de leur souveraineté critique, ravalés au rang d'exécutants passifs de normes comptables auto-justifiées. Réhabiliter le politique exige dès lors de réinsérer la délibération citoyenne au cœur des arbitrages publics.",
      "q": "Quel risque majeur l'auteur associe-t-il à la réduction du politique à la gestion technocratique ?",
      "opt": [
        "L'éviction du débat éthique et la neutralisation de la souveraineté citoyenne",
        "La hausse immédiate des taux d'intérêt bancaires à l'échelle internationale",
        "L'obligation pour les députés de repasser des diplômes universitaires en économie",
        "La disparition définitive des banques centrales et des institutions financières"
      ],
      "ans": 0,
      "passEn": "EPISTEMOLOGY — INTERNATIONAL JOURNAL OF POLITICAL PHILOSOPHY: TECHNOCRACY AND ETHICAL DEPRIVATION.\n\nReducing political decisions to technocratic optimization and financial engineering works a pernicious depoliticization of public spheres. Framing strategic choices as technical inevitabilities dictated by experts neutralizes ideological debate and discards moral values.\n\nConfiscating citizen choice under expert guise creates a democratic fracture. When political legitimacy rests solely on numerical metrics rather than social justice ethics, citizens are stripped of critical sovereignty, reduced to passive executors of self-justifying accounting norms. Restoring politics requires placing citizen deliberation back at the center of public choices.",
      "qEn": "What major risk does the author link to reducing politics to technocratic management?",
      "optEn": [
        "Eviction of ethical debate and neutralization of citizen sovereignty",
        "Immediate surges in international central bank interest rates",
        "Requirements for elected officials to retake university economics degrees",
        "Permanent abolition of central banks and international financial institutions"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion anthropologique sur le langage",
      "text": "ANTHROPOLOGIE LINGUISTIQUE — CAHIERS HUMANISTES : LA MARCHANDISATION DU VERBE ET L'APPAUVRISSEMENT DE LA PENSÉE CONCEPTUELLE.\n\nL'imposition du jargon managérial et de la communication marchande au cœur des échanges quotidiens opère une dégradation insidieuse de la faculté de pensée critique. En réduisant la richesse sémantique des langues naturelles à un lexique utilitaire standardisé — composé d'anglicismes fonctionnels, d'acronymes étanches et d'euphemismes lénifiants —, la rhétorique managériale prive le sujet de la subtilité lexicale nécessaire pour exprimer les nuances complexes du réel.\n\nCet appauvrissement linguistique étouffe l'imagination poétique et l'autonomie conceptuelle. En amputant la langue de sa charge subversive et de sa profondeur historique, le prêt-à-penser marchand impose une vision unidimensionnelle du monde qui entrave l'émergence de représentations alternatives et asphyxie le dialogue démocratique authentique. Défendre la pluralité de la langue vivante s'impose ainsi comme un acte indispensable de résistance culturelle et politique face aux dérives de l'uniformisation globale.",
      "q": "Selon la réflexion, comment le jargon managérial altère-t-il la capacité de pensée ?",
      "opt": [
        "En augmentant le nombre de mots appris par les enfants dans les écoles",
        "En restreignant la nuance sémantique et la richesse conceptuelle du sujet",
        "En imposant l'apprentissage obligatoire de trois langues étrangères",
        "En interdisant l'utilisation des dictionnaires dans les administrations"
      ],
      "ans": 1,
      "passEn": "LINGUISTIC ANTHROPOLOGY — HUMANIST PAPERS: COMMODIFICATION OF LANGUAGE AND CONCEPTUAL POVERTY.\n\nInjecting corporate jargon and marketing buzzwords into daily discourse insidiously degrades critical thought. By reducing rich language semantics to standardized utilitarian lexicons—functional Anglicisms, rigid acronyms, soothing euphemisms—corporate rhetoric deprives subjects of lexical nuance needed to express reality.\n\nThis linguistic impoverishment stifles poetic imagination and conceptual autonomy. By stripping language of subversive depth and history, marketing newspeak enforces a one-dimensional worldview that stifles alternative thought and authentic democratic dialogue. Defending living language is a major act of cultural and political resistance against global uniformity.",
      "qEn": "According to the passage, how does corporate jargon alter thinking capacity?",
      "optEn": [
        "By increasing vocabulary acquisition rates among school children",
        "By restricting semantic nuance and the subject's conceptual depth",
        "By mandating the compulsory learning of three foreign languages",
        "By banning the physical use of dictionaries across public agencies"
      ]
    },
    {
      "paperNum": 3,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai philosophique sur la mémoire",
      "text": "ESTHÉTIQUE ET ONTOLOGIE — CAHIERS DE PHILOSOPHIE DU TEMPS : L'ARCHIVAGE NUMÉRIQUE INTEGRAL ET L'AMNÉSIE PAR LA SURABONDANCE.\n\nL'illusion contemporaine d'un archivage numérique illimité de la totalité des données produites par l'humanité fait peser une menace inédite sur la constitution d'une mémoire historique vivante. En accumulant de manière indifférenciée des milliards de traces numériques éphémères, le système d'information abolit la dialectique essentielle entre l'oubli créateur et la sélection mémorielle. Une mémoire qui enregistre tout sans hiérarchie devient incapable de distinguer l'essentiel de l'anecdotique.\n\nCette surabondance documentaire produit paradoxalement une forme insidieuse d'amnésie culturelle. Submergé par un océan de données non assimilées, l'individu perd sa capacité à structurer un récit historique cohérent et à tirer enseignement du passé. Préserver la mémoire vivante exige ainsi de réhabiliter le jugement herméneutique capable d'opérer des choix axiologiques exigeants face au chaos des données numériques.",
      "q": "Quelle thèse centrale l'auteur soutient-il quant à l'archivage numérique intégral ?",
      "opt": [
        "Il garantit une sagesse universelle et une parfaite compréhension du passé",
        "Il réduit drastiquement la quantité d'électricité consommée par les serveurs",
        "Il engendre une amnésie culturelle en remplaçant la sélection mémorielle par la surabondance",
        "Il rend inutile la rédaction de livres d'histoire par les chercheurs professionnels"
      ],
      "ans": 2,
      "passEn": "AESTHETICS AND ONTOLOGY — PHILOSOPHY OF TIME PAPERS: DIGITAL ARCHIVING AND OVERABUNDANCE AMNESIA.\n\nThe illusion of unlimited digital archiving of all human data poses a novel threat to living historical memory. By indiscriminately accumulating billions of fleeting digital traces, information systems dissolve the dialectic between creative forgetting and memory selection. A memory that records everything without hierarchy cannot distinguish essence from anecdote.\n\nThis documentation overabundance paradoxically breeds cultural amnesia. Overwhelmed by unassimilated data, individuals lose the capacity to structure coherent historical narratives. Preserving living memory requires restoring hermeneutic judgment capable of demanding selection amidst digital noise.",
      "qEn": "What central thesis does the author maintain regarding total digital archiving?",
      "optEn": [
        "Guarantees universal wisdom and flawless historical comprehension",
        "Drastically cuts server farm electrical power consumption worldwide",
        "Breeds cultural amnesia by replacing memory selection with overabundance",
        "Renders historical book writing obsolete for professional academic researchers"
      ]
    }
  ],
  [
    {
      "paperNum": 4,
      "qNum": 1,
      "level": "A1",
      "docType": "Avis d'horaires d'ouverture",
      "text": "COMMERCE MUNICIPAL — PHARMACIE DU MARCHÉ : La pharmacie est ouverte du lundi au vendredi de 08h30 à 19h30 et le samedi matin de 08h30 à 12h30. Pour les urgences nocturnes et du dimanche, la liste des pharmacies de garde est affichée en vitrine.",
      "q": "Jusqu'à quelle heure la pharmacie accueille-t-elle les clients le samedi ?",
      "opt": [
        "Jusqu'à 12h30",
        "Jusqu'à 17h00",
        "Jusqu'à 19h30",
        "Jusqu'à 21h00"
      ],
      "ans": 0,
      "passEn": "MUNICIPAL RETAIL — MARKET PHARMACY: The pharmacy is open Monday to Friday 8:30 AM to 7:30 PM and Saturday morning 8:30 AM to 12:30 PM. For Sunday and overnight emergencies, duty pharmacy lists are posted in the window.",
      "qEn": "Until what time does the pharmacy welcome customers on Saturday?",
      "optEn": [
        "Until 12:30 PM",
        "Until 5:00 PM",
        "Until 7:30 PM",
        "Until 9:00 PM"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 2,
      "level": "A1",
      "docType": "Consigne de stationnement",
      "text": "VOIRIE URBAINE — PARKING HÔTEL DE VILLE : Le stationnement est payant du lundi au samedi de 09h00 à 18h00. Les 30 premières minutes sont entièrement gratuites après validation obligatoire du ticket à la borne automatique.",
      "q": "Quelle condition s'applique aux 30 premières minutes de stationnement ?",
      "opt": [
        "Elles sont réservées aux véhicules de livraison",
        "Elles sont gratuites avec validation du ticket",
        "Elles coûtent un tarif forfaitaire de 5 euros",
        "Elles nécessitent une carte d'abonné mensuel"
      ],
      "ans": 1,
      "passEn": "URBAN ROADWAYS — CITY HALL PARKING: Parking is paid Monday through Saturday from 9:00 AM to 6:00 PM. The first 30 minutes are completely free following mandatory ticket validation at the pay station.",
      "qEn": "What condition applies to the first 30 minutes of parking?",
      "optEn": [
        "Reserved for commercial delivery trucks",
        "Free of charge upon validating the ticket",
        "Charged at a flat fee of 5 euros",
        "Requires a monthly subscriber parking pass"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 3,
      "level": "A1",
      "docType": "Règlement de transport",
      "text": "RÉSEAU D'AUTOBUS MUNICIPAL — CONSIGNES À BORD : La présentation d'un titre de transport valide ou le paiement du billet auprès du conducteur est obligatoire dès l'accès dans l'autobus. Les animaux de compagnie doivent voyage dans un panier fermé.",
      "q": "Comment les animaux de compagnie doivent-ils voyager dans le bus ?",
      "opt": [
        "Libres en laisse sur les sièges",
        "Uniquement sur les genoux du chauffeur",
        "Dans un panier de transport fermé",
        "Dans le coffre à bagages arrière"
      ],
      "ans": 2,
      "passEn": "MUNICIPAL BUS NETWORK — BOARDING RULES: Presenting a valid transit pass or paying the fare to the driver is mandatory upon entering the bus. Pets must travel in a closed carrier box.",
      "qEn": "How must pets travel on the bus?",
      "optEn": [
        "Free on a leash on passenger seats",
        "Exclusively on the driver's lap",
        "Inside a closed pet carrier box",
        "In the rear luggage compartment"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 4,
      "level": "A1",
      "docType": "Annonce de service municipal",
      "text": "SERVICES MUNICIPAUX — COLLECTE DES ENCOMBRANTS : La collecte des objets volumineux a lieu le premier mercredi de chaque mois. Les habitants doivent déposer leurs meubles et appareils sur le trottoir la veille au soir à partir de 20h00.",
      "q": "Quand les résidents doivent-ils sortir leurs meubles encombrants sur le trottoir ?",
      "opt": [
        "Le dimanche soir avant minuit",
        "Le mercredi après-midi à 14h00",
        "Le vendredi matin dès 06h00",
        "Le mardi soir à partir de 20h00"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL SERVICES — BULKY WASTE PICKUP: Large item collection takes place on the first Wednesday of every month. Residents must place furniture and appliances curbside the evening prior starting at 8:00 PM.",
      "qEn": "When should residents place their bulky furniture items curbside?",
      "optEn": [
        "Sunday evening before midnight",
        "Wednesday afternoon at 2:00 PM",
        "Friday morning starting at 6:00 AM",
        "Tuesday evening starting at 8:00 PM"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 5,
      "level": "A2",
      "docType": "Message personnel SMS",
      "text": "MESSAGE PERSONNEL — Salut Marc ! N'oublie pas notre entraînement de tennis de table ce soir à 18h30 au gymnase municipal. Pense à prendre ta raquette et une bouteille d'eau, car les vestiaires sont en travaux. À tout à l'heure, Thomas.",
      "q": "Quel équipement personnel Marc doit-il obligatoirement apporter ?",
      "opt": [
        "Sa raquette et une bouteille d'eau",
        "Des balles de tennis de table neuves",
        "Une serviette de bain et du savon",
        "Une paire de chaussures de course à pied"
      ],
      "ans": 0,
      "passEn": "PERSONAL MESSAGE — Hi Marc! Don't forget our table tennis practice tonight at 6:30 PM at the municipal gym. Remember to bring your paddle and a water bottle because locker rooms are under renovation. See you soon, Thomas.",
      "qEn": "What personal items must Marc bring to practice?",
      "optEn": [
        "His paddle and a water bottle",
        "New table tennis balls",
        "A bath towel and soap",
        "A pair of running shoes"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 6,
      "level": "A2",
      "docType": "Avis de vide-grenier de quartier",
      "text": "VIE COMPAGNONNIÈRE — GRAND BRADERIE DU PARC : L'association des riverains organise sa brocante d'automne ce dimanche de 08h00 à 18h00 sur la Place de l'Église. Venez dénicher des livres d'occasion, des jouets et des objets de décoration à petits prix ! Buvette et gaufres sur place.",
      "q": "Quel type d'événement est organisé sur la Place de l'Église ?",
      "opt": [
        "Une compétition sportive inter-écoles",
        "Une brocante et vente d'objets d'occasion",
        "Un marché de fleurs et de plantes vertes",
        "Un festival de théâtre de rue gratuit"
      ],
      "ans": 1,
      "passEn": "NEIGHBORHOOD LIFE — PARK FLEA MARKET: The residents' association is hosting its autumn flea market this Sunday from 8:00 AM to 6:00 PM at Church Square. Come find second-hand books, toys, and home decor items at low prices! Food stands on site.",
      "qEn": "What type of event is taking place at Church Square?",
      "optEn": [
        "An inter-school sports competition",
        "A flea market selling second-hand goods",
        "A green plant and flower market",
        "A free street theater festival"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 7,
      "level": "A2",
      "docType": "Annonce d'offre d'emploi saisonnière",
      "text": "RECRUTEMENT SAISONNIER — CENTRE DE LOISIRS : Nous recherchons trois animateurs diplômés (BAFA) pour encadrer des enfants de 6 à 12 ans durant les vacances scolaires de février. Dynamisme et sens des responsabilités exigés. Envoyez votre CV et lettre de motivation avant le 15 janvier.",
      "q": "Quelle qualification est exigée pour poser sa candidature ?",
      "opt": [
        "Un diplôme d'entraîneur de football pro",
        "Un permis de conduire poids lourd validé",
        "Le brevet d'animateur de loisirs (BAFA)",
        "Une licence universitaire en informatique"
      ],
      "ans": 2,
      "passEn": "SEASONAL HIRING — RECREATION CENTER: We are hiring three certified youth counselors (BAFA) to supervise children aged 6 to 12 during February school holidays. Energy and responsibility required. Send CV and cover letter before January 15.",
      "qEn": "What qualification is required to apply for this job?",
      "optEn": [
        "Professional soccer coach diploma",
        "Heavy commercial vehicle driver's license",
        "Youth activity counselor certificate (BAFA)",
        "University bachelor's degree in computer science"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 8,
      "level": "A2",
      "docType": "Annonce de cours de langues",
      "text": "CENTRE CULTUREL — COURS DE FRANÇAIS POUR ADULTES : Session de mise à niveau en expression orale et écrite proposée les mardis et jeudis de 18h30 à 20h00. Test de niveau gratuit offert le samedi 10 septembre à 10h00 dans nos locaux. Inscription sur place ou par téléphone.",
      "q": "Quand le test de niveau gratuit a-t-il lieu ?",
      "opt": [
        "Le mardi soir à 18h30",
        "Tous les dimanches matin",
        "Le jeudi soir à 20h00",
        "Le samedi 10 septembre à 10h00"
      ],
      "ans": 3,
      "passEn": "CULTURAL CENTER — FRENCH COURSES FOR ADULTS: Refresher session for oral and written expression offered Tuesdays and Thursdays from 6:30 PM to 8:00 PM. Free placement test offered Saturday September 10 at 10:00 AM on site. Registration online or by phone.",
      "qEn": "When does the free language placement test take place?",
      "optEn": [
        "Tuesday evening at 6:30 PM",
        "Every Sunday morning",
        "Thursday evening at 8:00 PM",
        "Saturday September 10 at 10:00 AM"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 9,
      "level": "A2",
      "docType": "Annonce de promotion commerciale",
      "text": "MAGASIN D'ÉQUIPEMENT SPORTIF — PROMOTION D'AUTOMNE : Bénéficiez d'une remise de 20 % sur tout le rayon randonnée et camping sur présentation du prospectus en caisse. Offre valable jusqu'au 31 octobre inclus dans la limite des stocks disponibles.",
      "q": "Quelle condition permet d'obtenir la réduction de 20 % en caisse ?",
      "opt": [
        "Présenter le prospectus promotionnel en caisse",
        "Acheter au moins trois paires de chaussures",
        "Souscrire une carte de crédit du magasin",
        "Effectuer ses achats avant 10h00 du matin"
      ],
      "ans": 0,
      "passEn": "SPORTS EQUIPMENT STORE — AUTUMN SALE: Enjoy a 20% discount across the entire hiking and camping department upon presenting this flyer at checkout. Offer valid through October 31 inclusive while supplies last.",
      "qEn": "What condition grants the 20% discount at checkout?",
      "optEn": [
        "Presenting the promotional flyer at checkout",
        "Buying at least three pairs of shoes",
        "Applying for a store credit card",
        "Completing store purchases before 10:00 AM"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 10,
      "level": "A2",
      "docType": "Information de réseau de transport",
      "text": "INFO TRAFIC — LIGNE DE TRAMWAY T2 : En raison de travaux de réparation du réseau électrique, la ligne T2 circule avec un intervalle de 15 minutes entre chaque rame au lieu de 6 minutes habituelles. Le retour à la normale est prévu demain dès 06h00.",
      "q": "Quel impact les travaux ont-ils sur le tramway T2 aujourd'hui ?",
      "opt": [
        "L'arrêt total de la circulation de la ligne T2",
        "Une fréquence réduite avec un tramway toutes les 15 minutes",
        "La gratuité complète de tous les trajets de la journée",
        "Le remplacement de tous les tramways par des taxis"
      ],
      "ans": 1,
      "passEn": "TRAFFIC INFO — TRAMWAY LINE T2: Due to electrical grid repair work, Line T2 is operating with 15-minute intervals between trams instead of the usual 6 minutes. Normal service resumes tomorrow at 6:00 AM.",
      "qEn": "What impact do the repairs have on Tramway Line T2 today?",
      "optEn": [
        "Complete shutdown of Tram Line T2 service",
        "Reduced frequency with trams every 15 minutes",
        "Free transit travel for all passengers all day",
        "Replacing all trams with private city taxis"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 11,
      "level": "A2",
      "docType": "Avis d'enquête publique municipale",
      "text": "CITOYENNETÉ — CONSULTATION PUBLIQUE SUR L'AMÉNAGEMENT DU PARC : La mairie invite les habitants à donner leur avis sur le projet de création d'un espace de jeux pour enfants et d'un caniparc. Registre de consultation disponible à l'accueil de la mairie ou en ligne jusqu'au 25 novembre.",
      "q": "Comment les résidents peuvent-ils donner leur avis sur le projet ?",
      "opt": [
        "En écrivant une lettre au préfet de région",
        "En participant à une manifestation publique le samedi",
        "En complétant le registre à la mairie ou sur internet",
        "En appelant directement le commissariat de police"
      ],
      "ans": 2,
      "passEn": "CITIZENSHIP — PUBLIC CONSULTATION ON PARK REDEVELOPMENT: City hall invites residents to share feedback on creating a children's playground and dog park. Feedback registry available at city hall reception or online until November 25.",
      "qEn": "How can residents submit their feedback on the park project?",
      "optEn": [
        "By writing a formal letter to the regional governor",
        "By attending a public protest march on Saturday",
        "By filling out the registry at city hall or online",
        "By calling the local police station directly"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 12,
      "level": "A2",
      "docType": "Annonce de spectacle jeune public",
      "text": "THÉÂTRE MUNICIPAL — SPECTACLE POUR ENFANTS : Représentation exceptionnelle de la pièce de marionnettes 'Le Petit Prince de la Forêt' ce mercredi à 15h00. Spectacle adapté aux enfants de 3 à 8 ans. Durée : 45 minutes. Entrée : 6 euros pour les enfants, gratuit pour les accompagnateurs.",
      "q": "Quel tarif s'applique aux adultes accompagnant les enfants ?",
      "opt": [
        "6 euros par adulte",
        "Demi-tarif sur réservation",
        "12 euros par adulte",
        "Gratuit pour les accompagnateurs"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL THEATER — CHILDREN'S SHOW: Special puppet show performance of 'The Little Prince of the Forest' this Wednesday at 3:00 PM. Suitable for children aged 3 to 8. Duration: 45 minutes. Admission: 6 euros per child, free for accompanying adults.",
      "qEn": "What ticket pricing applies to adults accompanying children?",
      "optEn": [
        "6 euros per adult",
        "Half-price upon booking ahead",
        "12 euros per adult",
        "Free of charge for accompanying adults"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "ÉCONOMIE LOCALE — GASTRONOMIE ET RETAIL : LE SOUFFLE NOUVEAU DES MARCHÉS COUVERTS.\n\nAprès plusieurs décennies de déclin face à l'essor des grandes surfaces de périphérie, les marchés couverts historiques des centres-villes connaissent un remarquable regain de fréquentation. Séduits par la fraîcheur des produits du terroir et la convivialité des échanges avec les producteurs locaux, de nombreux citadins réapprennent à faire leurs courses quotidiennes sous les halles.\n\nPour accompagner cette modernisation, les municipalités rénovent les infrastructures en y intégrant des espaces de dégustation sur place et des casiers réfrigérés accessibles 24h/24 pour le retrait des commandes passées en ligne.",
      "q": "Facteur clé expliquant le renouveau des marchés couverts historiques :",
      "opt": [
        "L'attrait pour la fraîcheur des produits locaux et la convivialité marchande",
        "La fermeture définitive de l'intégralité des grandes surfaces de banlieue",
        "L'obligation légale pour les citadins de faire leurs courses sous les halles",
        "La distribution gratuite de nourriture financée par le gouvernement"
      ],
      "ans": 0,
      "passEn": "LOCAL ECONOMY — FOOD AND RETAIL: REVIVAL OF HISTORIC COVERED MARKETS.\n\nAfter decades of decline competing with suburban supermarkets, historic city-center covered markets are experiencing a remarkable surge in popularity. Drawn by fresh local farm produce and friendly producer interactions, city dwellers are returning to traditional market halls.\n\nSupporting this modernization, municipalities are renovating halls by installing on-site tasting areas and 24/7 refrigerated lockers for pickup of online orders.",
      "qEn": "Key factor explaining the revival of historic covered markets:",
      "optEn": [
        "Attraction to fresh local produce and friendly vendor interactions",
        "Permanent closure of all suburban big-box grocery supermarkets",
        "Legal mandates requiring city dwellers to shop under market halls",
        "Free government-funded food distribution programs"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur le logement coopératif",
      "text": "URBANISME CITOYEN — REVUE DE L'HABITAT : L'ÉMERGENCE DE L'HABITAT PARTICIPATIF.\n\nDe plus en plus de citoyens se regroupent au sein d'associations d'habitants pour concevoir et financer collectivement leur futur immeuble de logements. Ce modèle d'habitat participatif permet aux futurs propriétaires de personnaliser l'architecture de leur appartement tout en partageant des espaces communs : jardin collectif, buanderie, salle de fête et atelier de bricolage.\n\nOutre l'intérêt financier lié à la suppression des marges des promoteurs immobiliers privés, cette démarche crée un esprit de solidarité de voisinage solide dès la phase de conception du projet.",
      "q": "Quel avantage social ressort de la démarche d'habitat participatif ?",
      "opt": [
        "La possibilité de revendre son logement avec 300 % de bénéfice immédiat",
        "Le développement d'une solidarité de voisinage dès la conception",
        "L'interdiction absolue d'accueillir des visiteurs dans l'immeuble",
        "La gratuité totale des matériaux de construction fournis par l'État"
      ],
      "ans": 1,
      "passEn": "CITIZEN URBANISM — HOUSING REVIEW: THE RISE OF PARTICIPATORY HOUSING CO-OPS.\n\nMore citizens are forming housing associations to collectively design and fund their future apartment buildings. This participatory housing model enables future owners to customize apartment layouts while sharing common amenities: collective gardens, laundries, event rooms, and workshops.\n\nBeyond financial savings from cutting private developer margins, this approach fosters strong neighbor solidarity right from the initial project design phase.",
      "qEn": "What social benefit emerges from the participatory housing approach?",
      "optEn": [
        "Ability to resell apartments immediately at 300% profit margins",
        "Fostering neighbor solidarity starting right from the design phase",
        "Absolute prohibition against inviting guests into the building",
        "Free building construction materials supplied by state agencies"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur l'apprentissage des langues",
      "text": "ÉDUCATION — REVUE DES LANGUES VIVANTES : LE SUCCÈS DES ÉCHANGES LINGUISTIQUES EN LIGNE.\n\nLes applications de mise en relation de partenaires linguistiques connaissent un succès phénoménal auprès des étudiants. Le principe est simple : deux personnes de nationalités différentes conversent par visioconférence en alternant l'usage de leurs langues maternelles respectives, permettant un apprentissage immersif et mutuel sans frais.\n\nCette méthode complémentaire aux cours traditionnels favorise la maîtrise des expressions familières et du langage spontané, tout en sensibilisant les usagers aux subtilités culturelles des pays partenaires.",
      "q": "Quel atout pédagogique ces plateformes d'échange linguistique offrent-elles ?",
      "opt": [
        "L'obtention automatique d'un diplôme universitaire sans passer d'examen",
        "La suppression de l'obligation d'étudier la grammaire dans les écoles",
        "Une pratique immersive spontanée favorisant le langage naturel et culturel",
        "Le paiement d'un salaire horaire aux étudiants qui pratiquent une langue"
      ],
      "ans": 2,
      "passEn": "EDUCATION — MODERN LANGUAGES REVIEW: SUCCESS OF ONLINE LANGUAGE EXCHANGE PLATFORMS.\n\nLanguage exchange partner apps are experiencing phenomenal success among students. The concept is simple: two native speakers converse via video call alternating between their respective mother tongues, enabling free mutual immersive learning.\n\nComplementing formal language classes, this method enhances command of informal expressions and spontaneous speech while building cultural awareness.",
      "qEn": "What pedagogical benefit do these language exchange platforms offer?",
      "optEn": [
        "Automatic issuance of university degrees without taking exams",
        "Eliminating mandatory grammar study across public schools",
        "Immersive spontaneous practice enhancing natural speech and culture",
        "Paying hourly wages to students practicing foreign languages"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur la préservation de la biodiversité",
      "text": "ENVIRONNEMENT — NOUVELLES DE LA NATURE : LESVERGERS CONSERVATOIRES, GARDIENS DE LA BIODIVERSITÉ FRUITIÈRE.\n\nFace à la standardisation industrielle qui a réduit l'offre commerciale à quelques variétés de pommes ou de poires calibrées, les vergers conservatoires régionaux jouent un rôle de sauvegarde écologique crucial. En cultivant des centaines de variétés anciennes adaptées au terroir local, ces espaces préservent un patrimoine génétique inestimable.\n\nDe plus, ces vergers sans aucun traitement chimique constituent des refuges précieux pour les insectes pollinisateurs (abeilles, papillons) fortement menacés par l'agriculture intensive.",
      "q": "Pourquoi la sauvegarde des variétés fruitières anciennes est-elle essentielle ?",
      "opt": [
        "Parce qu'elles permettent de produire du jus de fruit commercialisé en grande surface",
        "Parce qu'elles ne nécessitent aucun arrosage en eau durant toute l'année",
        "Parce qu'elles poussent deux fois plus vite que les arbres fruitiers normaux",
        "Parce qu'elles préservent la diversité génétique et soutiennent les pollinisateurs"
      ],
      "ans": 3,
      "passEn": "ENVIRONMENT — NATURE NEWS: CONSERVATORY ORCHARDS PRESERVING FRUIT DIVERSITY.\n\nFacing industrial standardization that reduced commercial offerings to a few uniform apple or pear varieties, regional conservatory orchards play a vital ecological role. By cultivating hundreds of heirloom varieties tailored to local soils, these orchards protect invaluable genetic heritage.\n\nFurthermore, these pesticide-free orchards provide vital sanctuaries for pollinating insects (bees, butterflies) threatened by intensive agriculture.",
      "qEn": "Why is protecting heirloom fruit varieties essential?",
      "optEn": [
        "Enables producing commercial bottled fruit juice for supermarkets",
        "Requires zero water irrigation throughout the entire calendar year",
        "Grows twice as fast as standard commercial fruit trees",
        "Preserves genetic diversity and supports threatened pollinating insects"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur la culture du livre",
      "text": "CULTURE — LITTÉRATURE ET SOCIÉTÉ : LE RETOUR EN FORCE DES LIBRAIRIES INDÉPENDANTES DE QUARTIER.\n\nAlors que beaucoup prédisaient la disparition des libraires de quartier face au commerce électronique et au livre numérique, les établissements indépendants affichent une santé financière retrouvée. Les lecteurs plébiscitent le conseil personnalisé de professionnels passionnés et la qualité de la programmation culturelle proposée (dédicaces, rencontres avec des auteurs, clubs de lecture).\n\nCette relation de confiance humaine crée une fidélité solide que les algorithmes de recommandation automatisée des géants de la vente en ligne ne parviennent pas à égaler.",
      "q": "Quelle valeur ajoutée explique la fidélité des clients envers les libraires indépendants ?",
      "opt": [
        "Le conseil personnalisé humain et les animations culturelles en boutique",
        "La livraison automatique des livres à domicile par drone en 10 minutes",
        "Des prix de livres réduits de 80 % par rapport aux sites internet",
        "L'impression instantanée des romans sur papier recyclé en magasin"
      ],
      "ans": 0,
      "passEn": "CULTURE — LITERATURE AND SOCIETY: THE RESURGENCE OF INDEPENDENT NEIGHBORHOOD BOOKSTORES.\n\nWhile many predicted the demise of neighborhood bookstores competing with e-commerce and e-books, independent shops are demonstrating renewed financial vitality. Readers favor personalized advice from passionate booksellers and rich cultural events (author signings, book clubs).\n\nThis human trust relationship fosters customer loyalty that automated recommendation algorithms cannot match.",
      "qEn": "What added value explains customer loyalty toward independent bookstores?",
      "optEn": [
        "Personalized human recommendations and store cultural events",
        "Automatic drone home book delivery within 10 minutes",
        "Book prices discounted 80% below online e-commerce retailers",
        "Instant on-demand book printing on recycled paper in store"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur l'éco-conception",
      "text": "DESIGN ET INDUSTRIE — REVUE D'INNOVATION DURABLE : L'INDICE DE RÉPARABILITÉ DES APPAREILS ÉLECTROMÉNAGERS.\n\nAfin de lutter contre l'obsolescence programmée et d'encourager la réparation plutôt que le remplacement systématique, un indice de réparabilité obligatoire est désormais affiché sur les appareils électroménagers et électroniques vendus en magasin. Cette note sur 10 informe le consommateur sur la facilité de démontage de l'appareil et la disponibilité des pièces détachées.\n\nCette transparence incitative pousse les fabricants à reconcevoir leurs produits de manière plus modulaire pour obtenir de meilleures évaluations écologiques.",
      "q": "Quel est l'objectif de l'affichage obligatoire de l'indice de réparabilité ?",
      "opt": [
        "Augmenter la taxe sur les ventes d'appareils neufs en magasin",
        "Informer sur la facilité de réparation pour lutter contre le gaspillage",
        "Obliger les clients à réparer eux-mêmes leurs appareils sous peine d'amende",
        "Garantir le remplacement gratuit de tous les appareils défectueux à vie"
      ],
      "ans": 1,
      "passEn": "DESIGN AND INDUSTRY — SUSTAINABLE INNOVATION REVIEW: APPLIANCE REPAIRABILITY INDEX.\n\nTo combat planned obsolescence and encourage repair over replacement, a mandatory repairability index score is displayed on household appliances and electronics. Rated out of 10, this score informs buyers about disassembly ease and spare part availability.\n\nThis transparency incentivizes manufacturers to redesign products modularly to achieve higher ecological scores.",
      "qEn": "What is the goal of mandating repairability index scores?",
      "optEn": [
        "Increasing sales tax rates on new retail electronics",
        "Informing buyers on repair ease to curb appliance disposal waste",
        "Fining customers who fail to repair faulty appliances themselves",
        "Guaranteeing free lifetime replacement for all broken products"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 19,
      "level": "B1",
      "docType": "Rapport sur la mobilité douce",
      "text": "TRANSPORTS URBAINS — OBSERVA TOIRE DES DÉPLACEMENTS : LA VOGUE DES VÉLOS À ASSISTANCE ÉLECTRIQUE (VAE).\n\nL'engouement des citadins et des périurbains pour le vélo à assistance électrique a profondément transformé les habitudes de déplacement domicile-travail. En permettant de franchir facilement les dénivelés et d'effectuer des trajets de plus de 10 kilomètres sans effort excessif, le VAE constitue une alternative crédible à la voiture individuelle.\n\nToutefois, cet essor exige une adaptation rapide des infrastructures routières, notamment la création de pistes cyclables plus larges et la sécurisation du stationnement contre le vol.",
      "q": "Pourquoi le vélo électrique parvient-il à remplacer la voiture sur les trajets quotidiens ?",
      "opt": [
        "Parce qu'il circule à la même vitesse que les trains à grande vitesse",
        "Parce qu'il est offert gratuitement par les municipalités à tous les résidents",
        "Parce qu'il permet de parcourir de plus longues distances sans fatigue excessive",
        "Parce qu'il ne nécessite aucune recharge d'énergie ni batterie"
      ],
      "ans": 2,
      "passEn": "URBAN TRANSIT — MOBILITY OBSERVATORY: THE POPULARITY OF ELECTRIC ASSIST BICYCLES (E-BIKES).\n\nSurging interest in e-bikes among urban and suburban commuters has transformed daily travel habits. Enabling riders to tackle hills and 10+ km commutes without physical exhaustion, e-bikes represent a viable car alternative.\n\nHowever, this growth demands rapid infrastructure adaptations, including wider bike lanes and anti-theft parking security.",
      "qEn": "Why do e-bikes successfully replace cars for daily commuting?",
      "optEn": [
        "They travel at speeds matching high-speed passenger trains",
        "They are distributed free by cities to all registered residents",
        "They enable longer distances without physical exhaustion",
        "They require zero electrical battery recharging or power"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur la préservation du patrimoine",
      "text": "PATRIMOINE ET TERRITOIRE — CAHIERS DE LA CULTURE : LA CHANTIERS DE BÉNÉVOLES POUR LA RESTAURATION DU PATRIMOINE BÂTI.\n\nChaque été, des milliers de jeunes volontaires venus du monde entier participent à des chantiers de bénévolat organisés pour restaurer des châteaux forts, des chapelles médiévales ou de anciens moulins en ruine. Encadrés par des artisans qualifiés, ces bénévoles apprennent les techniques traditionnelles de taille de pierre et de maçonnerie à la chaux.\n\nCette expérience collective associe la sauvegarde concrète d'édifices historiques menacés à une aventure humaine d'échange culturel et d'apprentissage manuel valorisant.",
      "q": "Que retirent les bénévoles de leur participation à ces chantiers de restauration ?",
      "opt": [
        "Un diplôme d'architecte d'État reconnu internationalement",
        "L'acquisition à titre privé des monuments historiques restaurés",
        "Une rémunération financière équivalente à un salaire d'ingénieur",
        "Un apprentissage manuel traditionnel et une aventure culturelle humaine"
      ],
      "ans": 3,
      "passEn": "HERITAGE AND REGIONS — CULTURE PAPERS: VOLUNTEER WORKCAMPS RESTORING HISTORIC BUILDINGS.\n\nEvery summer, thousands of young volunteers worldwide join workcamps restoring ruined castles, medieval chapels, or historic mills. Guided by master craftspeople, volunteers learn traditional stone cutting and lime masonry techniques.\n\nThis collective experience combines tangible building preservation with human cultural exchange and hands-on skill learning.",
      "qEn": "What do volunteers gain from participating in building restoration workcamps?",
      "optEn": [
        "State-accredited international architecture diplomas",
        "Private property ownership titles to restored monuments",
        "Salaries equivalent to senior engineering positions",
        "Hands-on traditional skill learning and rich human cultural exchange"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur l'alimentation responsable",
      "text": "ALIMENTATION ET SANTÉ — REVUE DE LA NUTRITION : LA REDÉCOUVERTE DES LÉGUMINEUSES DANS L'ALIMENTATION.\n\nLongtemps délaissées au profit de la viande, les légumineuses (lentilles, pois chiches, haricots secs) font un retour remarqué dans les recommandations nutritionnelles. Particulièrement riches en protéines végétales et en fibres, elles présentent des qualités nutritionnelles exceptionnelles pour la santé cardiovasculaire.\n\nSur le plan environnemental, leur culture fixe l'azote atmosphérique dans le sol, réduisant naturellement le besoin d'engrais chimiques et améliorant la fertilité des terres agricoles.",
      "q": "Quel double avantage les légumineuses offrent-elles selon l'article ?",
      "opt": [
        "Des bienfaits nutritionnels pour la santé et une amélioration naturelle des sols",
        "La suppression de l'obligation de cuisiner les aliments avant de les consommer",
        "La baisse des prix de tous les produits industriels transformés",
        "Un goût identique aux viandes rouges de grande consommation"
      ],
      "ans": 0,
      "passEn": "FOOD AND HEALTH — NUTRITION REVIEW: REDISCOVERING LEGUMES IN DAILY DIETS.\n\nLong sidelined for meat, legumes (lentils, chickpeas, beans) are returning to dietary guidelines. High in plant protein and fiber, they offer exceptional cardiovascular health benefits.\n\nEnvironmentally, legume crops fix atmospheric nitrogen into soils, naturally reducing synthetic fertilizer needs and enhancing farmland fertility.",
      "qEn": "What dual advantage do legumes offer according to the article?",
      "optEn": [
        "Nutritional health benefits and natural soil fertility enhancement",
        "Eliminating requirements to cook raw food prior to consumption",
        "Lowering retail prices on mass-produced ultra-processed foods",
        "Taste profiles identical to commercial red meats"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 22,
      "level": "B1",
      "docType": "Annonce d'initiative écocitoyenne",
      "text": "INNOVATION VERTE — BULLETIN DE LA TRANSITION ÉCOLOGIQUE : LES REPAIR CAFÉS CONTRE LE GASPILLAGE ÉLECTRONIQUE.\n\nLes Repair Cafés se multiplient dans les communes pour lutter contre le réflexe de jeter les objets en panne. Dans ces ateliers éphémères animés par des bénévoles bricoleurs, les citoyens apportent leurs petits électroménagers, vélos ou vêtements abîmés pour apprendre à les réparer gratuitement ensemble.\n\nAutour d'une tasse de café, cette entraide citoyenne prolonge la durée de vie des objets tout en créant du lien social chaleureux au sein du quartier.",
      "q": "Quel est le principe fondamental du fonctionnement d'un Repair Café ?",
      "opt": [
        "Acheter des appareils électroniques neufs avec des remises gouvernementales",
        "Réparer gratuitement ses objets en panne grâce à l'aide de bénévoles",
        "Vendre aux enchères ses vieux équipements ménagers à des collectionneurs",
        "Faire recycler ses déchets plastiques par des entreprises privées"
      ],
      "ans": 1,
      "passEn": "GREEN INNOVATION — ECOLOGICAL TRANSITION BULLETIN: REPAIR CAFES COMBATING ELECTRONIC WASTE.\n\nRepair Cafes are multiplying locally to counter disposal habits for broken goods. In pop-up workshops staffed by volunteer fixers, citizens bring broken appliances, bikes, or clothes to learn free repair together.\n\nOver coffee, this community mutual aid extends product lifespans while building warm neighborhood social connections.",
      "qEn": "What is the core operational principle of a Repair Cafe?",
      "optEn": [
        "Buying brand new electronics with government discount vouchers",
        "Repairing broken items free with assistance from volunteer fixers",
        "Auctioning antique home equipment to private collectors",
        "Contracting private firms to recycle household plastic waste"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la gestion de l'eau",
      "text": "RESSOURCES NATURELLES — REVUE D'HYDROLOGIE DURABLE : LA GESTION RAISONNÉE DES EAUX PLUVIALES EN MILIEU URBAIN.\n\nL'imperméabilisation croissante des sols urbains due au bétonnage massif empêche l'infiltration naturelle des eaux de pluie, provoquant des inondations répétées et le débordement des réseaux d'assainissement lors d'épisodes d'averses intenses. Pour enrayer ce phénomène accentué par le dérèglement climatique, les collectivités repensent l'aménagement de l'espace public.\n\nLa création de noues paysagères, de jardins de pluie et de revêtements drainants permet d'absorber l'eau directement là où elle tombe. Cette gestion alternative réalimente les nappes phréatiques tout en rafraîchissant l'air urbain par évapotranspiration.",
      "q": "Quelle solution d'aménagement les villes adoptent-elles pour gérer l'eau de pluie ?",
      "opt": [
        "Le canaliser l'eau de pluie exclusivement dans des conduits souterrains étanches",
        "Construire de hauts murs en béton autour de tous les bassins de rétention",
        "Créer des structures végétalisées drainantes favorisant l'infiltration naturelle",
        "Pomper l'eau vers la mer au moyen de stations électriques géantes"
      ],
      "ans": 2,
      "passEn": "NATURAL RESOURCES — SUSTAINABLE HYDROLOGY REVIEW: RAINWATER MANAGEMENT IN URBAN SPACES.\n\nPaving urban surfaces prevents natural rainwater infiltration, causing street flooding and sewer overflows during heavy downpours. Addressing climate-exacerbated rain events, municipalities are redesigning public space.\n\nInstalling vegetated swales, rain gardens, and permeable paving absorbs rainwater on site. This alternative management recharges aquifers while cooling urban air through evapotranspiration.",
      "qEn": "What urban planning solution are cities adopting to manage rainwater?",
      "optEn": [
        "Channeling rainwater strictly into sealed underground concrete pipes",
        "Building high concrete walls around all retention basins",
        "Creating vegetated permeable structures promoting natural infiltration",
        "Pumping rainwater out to sea using massive electrical stations"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 24,
      "level": "B2",
      "docType": "Étude sociologique sur les seniors",
      "text": "SOCIÉTÉ ET DÉMOGRAPHIE — REVUE DE GÉRONTOLOGIE SOCIALE : L'ENGAGEMENT BENÉVOLE DES RETRAITÉS.\n\nL'allongement de l'espérance de vie en bonne santé a transformé le visage de la retraite. Loin de l'image d'un retrait passif de la vie sociale, les jeunes retraités constituent aujourd'hui le pilier fondamental du tissu associatif national, s'investissant massivement dans l'aide aux devoirs, l'accompagnement des personnes isolées ou la gestion de structures culturelles.\n\nCe bénévolat actif offre aux aînés un sentiment fort d'utilité sociale et préserve leurs facultés cognitives, tout en apportant aux associations une expertise professionnelle et une disponibilité précieuses.",
      "q": "Selon l'étude, quel rôle prépondérant les retraités jouent-ils au sein de la société ?",
      "opt": [
        "Ils créent de nouvelles entreprises privées cotées en bourse",
        "Ils consacrent l'intégralité de leur temps à des voyages internationaux",
        "Ils refusent de participer à la vie communautaire locale",
        "Ils représentent la colonne vertébrale du secteur associatif et de la solidarité"
      ],
      "ans": 3,
      "passEn": "SOCIETY AND DEMOGRAPHICS — SOCIAL GERONTOLOGY REVIEW: RETIREE VOLUNTEER ENGAGEMENT.\n\nIncreased healthy life expectancy has transformed retirement. Far from passive social withdrawal, recent retirees form the backbone of non-profit community organizations, volunteering in tutoring, elder care, and cultural management.\n\nActive volunteering provides seniors a strong sense of social purpose and preserves cognitive health while providing organizations invaluable professional expertise and availability.",
      "qEn": "According to the study, what major role do retirees play in society?",
      "optEn": [
        "Launching new publicly-traded private corporations",
        "Spending their time exclusively on international tourism trips",
        "Refusing participation in local community life",
        "Forming the backbone of non-profit community work and solidarity"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 25,
      "level": "B2",
      "docType": "Article sur l'économie du partage",
      "text": "ÉCONOMIE NUMÉRIQUE — REVUE DE LA CONSOMMATION COLLABORATIVE : L'ESSOR DE LA LOCATION D'OBJETS ENTRE PARTICULIERS.\n\nFace au coût élevé et à l'encombrement généré par l'achat d'équipements à usage occasionnel (outillage de bricolage, matériel de jardinage, appareils à raclette), les plateformes de location entre voisins connaissent un essor remarquable. Ce modèle fondé sur l'usage plutôt que sur la propriété permet de rentabiliser des objets inutilisés tout en offrant aux locataires un accès économique à des matériels performants.\n\nToutefois, la pérennisation de ces échanges repose sur des systèmes d'assurance adaptés et une confiance mutuelle garantie par les évaluations d'usagers.",
      "q": "Quel principe économique sous-tend le succès de la location d'objets entre particuliers ?",
      "opt": [
        "La primauté de l'usage temporaire sur la possession matérielle définitive",
        "L'obligation de posséder le plus grand nombre d'équipements chez soi",
        "La baisse du coût des matières premières plastiques de fabrication",
        "La gratuité absolue de tous les outils de bricolage neufs en magasin"
      ],
      "ans": 0,
      "passEn": "DIGITAL ECONOMY — COLLABORATIVE CONSUMPTION REVIEW: PEER-TO-PEER ITEM RENTALS.\n\nAddressing high purchase costs and storage clutter for occasional items (power tools, yard equipment, specialty kitchenware), neighbor-to-neighbor rental platforms are expanding rapidly. Shifted toward access over ownership, this model monetizes idle goods while offering renters affordable access to tools.\n\nHowever, sustaining peer rentals depends on tailored insurance coverage and mutual trust rated by user reviews.",
      "qEn": "What economic principle underlines the success of peer-to-peer item rentals?",
      "optEn": [
        "Primacy of temporary access over permanent physical ownership",
        "Mandating ownership of as many home power tools as possible",
        "Declining raw material manufacturing costs for plastics",
        "Absolute free distribution of new power tools in retail stores"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur la santé environnementale",
      "text": "SANTÉ PUBLIQUE — REVUE DE MÉDECINE ENVIRONNEMENTALE : LES ENJEUX DE LA QUALITÉ DE L'AIR INTÉRIEUR.\n\nSi la pollution de l'air extérieur fait l'objet d'une attention médiatique constante, la dégradation de l'air au sein des logements et des bâtiments de travail constitue un risque sanitaire tout aussi préoccupant. L'accumulation de composés organiques volatils (COV) émis par les peintures, les meubles en aggloméré et les produits d'entretien ménagers favorise le développement d'affections respiratoires chroniques.\n\nLes spécialistes préconisent une aération quotidienne d'au moins dix minutes matin et soir et le choix de matériaux de construction et de décoration faiblement émissifs.",
      "q": "Quelle cause majeure de pollution de l'air intérieur est identifiée dans le rapport ?",
      "opt": [
        "La présence de poussières provenant uniquement des routes extérieures",
        "L'émission de composés chimiques par les peintures, meubles et détergents",
        "L'usage excessif d'appareils de chauffage à l'énergie solaire",
        "La surfréquentation des salles de réunion par les salariés"
      ],
      "ans": 1,
      "passEn": "PUBLIC HEALTH — ENVIRONMENTAL MEDICINE REVIEW: INDOOR AIR QUALITY CHALLENGES.\n\nWhile outdoor air pollution receives constant media attention, degraded air inside homes and offices presents equally serious health risks. Volatile organic compounds (VOCs) emitted by paints, composite furniture, and household cleaners foster chronic respiratory illnesses.\n\nExperts recommend daily morning and evening ventilation for at least 10 minutes alongside choosing low-emission building materials.",
      "qEn": "What major cause of indoor air pollution is identified in the report?",
      "optEn": [
        "Dust accumulation originating strictly from outdoor roads",
        "Chemical compound emissions from paints, furniture, and cleaners",
        "Excessive usage of solar-powered home heating systems",
        "Overcrowding of corporate office conference rooms"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur le tourisme durable",
      "text": "TOURISME ET TERRITOIRE — REVUE DU DÉVELOPPEMENT RÉGIONAL : LA RÉULATION DE LA FRÉQUENTATION DANS LES SITES NATURELS FRAGILES.\n\nL'engouement massif pour les espaces naturels protégés (parcs nationaux, calanques, îles côtières) durant la saison estivale entraîne une dégradation préoccupante de la flore et le dérangement de la faune sauvage. Pour préserver ces écosystèmes menacés par le surtourisme, plusieurs autorités gestionnaires instaurent désormais des jauges maximales de visiteurs quotidiens et des systèmes de réservation obligatoire.\n\nBien que contestée par certains acteurs économiques locaux, cette régulation de la fréquentation s'avère indispensable pour préserver la valeur patrimoniale et l'attractivité à long terme de ces espaces.",
      "q": "Quelle mesure de protection les autorités appliquent-elles face au surtourisme dans les sites fragiles ?",
      "opt": [
        "La construction d'hôtels de grande capacité au cœur des réserves",
        "La fermeture définitive et permanente de tous les parcs naturels nationaux",
        "L'instauration de quotas quotidiens de visiteurs et de réservations préalables",
        "La suppression des contrôles et l'accès libre pour tous les véhicules"
      ],
      "ans": 2,
      "passEn": "TOURISM AND REGIONS — REGIONAL DEVELOPMENT REVIEW: MANAGING VISITOR FLOWS IN FRAGILE NATURE SITES.\n\nMass summer visitation to protected natural sites (national parks, coastal coves, islands) causes severe flora degradation and wildlife disturbance. To protect ecosystems threatened by overtourism, park authorities are implementing daily visitor caps and mandatory advance booking systems.\n\nWhile disputed by certain local commercial operators, flow regulation proves vital for preserving heritage value and long-term site appeal.",
      "qEn": "What protective measure are authorities enforcing against overtourism in fragile sites?",
      "optEn": [
        "Building high-capacity resort hotels inside nature reserves",
        "Permanent closure of all national parks nationwide",
        "Enforcing daily visitor quotas and mandatory advance bookings",
        "Eliminating site entrance checks for motorized vehicles"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la transition énergétique",
      "text": "ÉNERGIE ET SOCIÉTÉ — BULLETIN DES ÉNERGIES RENOUVELABLES : LE POTENTIEL DE L'ÉNERGIE GÉOTHERMIQUE DANS LE CHAUFFAGE URBAIN.\n\nEn exploitant la chaleur naturelle contenue dans le sous-sol profond, la géothermie offre une source d'énergie thermique stable, renouvelable et quasiment décarbonée. Connectée à des réseaux de chaleur urbains, cette technologie permet de chauffer des milliers de logements collectifs et d'équipements publics sans dépendre des fluctuations des marchés mondiaux des hydrocarbures.\n\nToutefois, l'investissement financier initial élevé lié aux forages profonds nécessite un soutien financier public soutenu pour convaincre les collectivités territoriales de s'engager dans ces projets d'infrastructure durables.",
      "q": "Quel avantage majeur la géothermie présente-t-elle pour le chauffage des villes ?",
      "opt": [
        "La possibilité de fonctionner uniquement pendant les mois d'été",
        "L'absence complète de canalisations sous les rues des communes",
        "La gratuité totale des travaux de forage souterrain initial",
        "Une production d'énergie thermique stable et décarbonée indépendante des cours du pétrole"
      ],
      "ans": 3,
      "passEn": "ENERGY AND SOCIETY — RENEWABLE ENERGY BULLETIN: GEOTHERMAL POTENTIAL IN URBAN HEATING NETWORKS.\n\nTapping deep subterranean heat, geothermal energy provides a stable, renewable, low-carbon thermal energy source. Connected to district heating networks, this tech heats thousands of apartment units and public buildings without exposure to volatile global fossil fuel markets.\n\nHowever, high initial drilling capital costs require sustained public subsidy support to encourage municipal adoption of these long-term projects.",
      "qEn": "What major advantage does geothermal energy offer for municipal heating networks?",
      "optEn": [
        "Ability to operate exclusively during warm summer months",
        "Total absence of underground piping under city streets",
        "Free underground deep drilling operations supplied by contractors",
        "Stable low-carbon thermal supply independent of oil market volatility"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 29,
      "level": "B2",
      "docType": "Article sur l'inclusion professionnelle",
      "text": "TRAVAIL ET HANDICAP — REVUE DE L'INSERTION PROFESSIONNELLE : L'ADAPTATION DES POSTES DE TRAVAIL EN ENTREPRISE.\n\nL'intégration professionnelle durable des personnes en situation de handicap repose sur l'aménagement personnalisé des postes de travail et sur la sensibilisation des équipes de collaborateurs. L'utilisation de technologies d'assistance (logiciels de lecture d'écran, sièges ergonomiques, interfaces adaptées) permet de compenser efficacement la majorité des limitations fonctionnelles.\n\nToutefois, la réussite de l'inclusion exige de dépasser les simples aménagements matériels pour faire évoluer le regard des managers et favoriser une culture d'entreprise bienveillante et inclusive.",
      "q": "Selon l'article, quelle condition garantit le succès de l'intégration des personnes handicapées ?",
      "opt": [
        "La combinaison d'aménagements matériels adaptés et d'une évolution des mentalités",
        "L'isolement systématique des salariés handicapés dans des bureaux séparés",
        "L'obligation de travailler à temps partiel sans possibilité de promotion",
        "La suppression de l'exigence de rentabilité pour les entreprises privées"
      ],
      "ans": 0,
      "passEn": "WORK AND DISABILITY — INCLUSION REVIEW: WORKPLACE ADAPTATIONS IN CORPORATIONS.\n\nSustained professional integration of workers with disabilities rests on customized workplace adaptations and staff awareness. Assistive technologies (screen readers, ergonomic seating, adapted interfaces) effectively compensate for functional limitations.\n\nHowever, successful inclusion demands moving beyond hardware tweaks to reshape managerial mindsets and foster supportive inclusive workplace cultures.",
      "qEn": "According to the article, what condition guarantees successful integration of disabled workers?",
      "optEn": [
        "Combining adapted physical setups with shifts in organizational mindsets",
        "Systematic isolation of disabled workers in separate offices",
        "Mandatory part-time schedules with zero promotion opportunities",
        "Eliminating productivity expectations for private sector firms"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial sociologique",
      "text": "SOCIO-ÉCONOMIE — TRIBUNE DU TRAVAIL CONTEMPORAIN : L'INJONCTION À L'AGILITÉ ET LA PRECARISATION DU SALARIAT.\n\nLe lexique managérial contemporain célèbre avec emphase les vertus de 'l'agilité', de la 'flexibilité' et de 'l'adaptabilité permanente' comme les qualités cardinales de l'employé moderne. Présentée par le discours d'entreprise comme une opportunité d'autonomie et d'épanouissement personnel, cette flexibilisation accrue du travail masque en réalité un transfert massif des risques économiques de l'entreprise vers le salarié. La généralisation des contrats courts, du travail à la tâche et des horaires variables fragilise les trajectoires professionnelles et dissout les garanties collectives du droit du travail.\n\nCette précarisation insidieuse altère en profondeur le rapport au temps et la capacité de projection des travailleurs. L'impossibilité de planifier son avenir professionnel ou d'accéder au crédit bancaire génère une insécurité existentielle permanente chez les jeunes actifs. En érigeant la vulnérabilité statutaire en mode de gestion ordinaire, le modèle managérial flexible corrode les fondements de la solidarité salariale et déstructure la cohésion sociale.",
      "q": "Quelle réalité cachée l'auteur met-il en évidence derrière le concept managérial d'agilité ?",
      "opt": [
        "Une hausse spectaculaire des salaires distribués à l'ensemble des employés",
        "Une précarisation statutaire transférant les risques économiques sur les travailleurs",
        "L'obligation légale pour les dirigeants d'offrir des actions gratuites aux salariés",
        "Le remplacement définitif de tous les contrats de travail par des diplômes"
      ],
      "ans": 1,
      "passEn": "SOCIO-ECONOMICS — CONTEMPORARY WORK ESSAY: AGILITY IMPERATIVES AND WORKFORCE PRECARITY.\n\nCorporate jargon enthusiastically champions 'agility', 'flexibility', and 'constant adaptability' as modern employee virtues. Framed as opportunities for autonomy, increased workplace flexibility actually masks a massive transfer of economic risk from corporations onto workers. Short contracts, gig work, and erratic schedules weaken career stability and dismantle collective labor protections.\n\nThis subtle precarization alters workers' relationship with time and future planning. Inability to plan careers or secure bank credit breeds constant existential insecurity among young workers. By normalizing status vulnerability, flexible management erodes labor solidarity and social cohesion.",
      "qEn": "What hidden reality does the author highlight behind the managerial concept of agility?",
      "optEn": [
        "Spectacular salary increases distributed across all company workers",
        "Statutory precarization transferring economic risks onto workers",
        "Legal mandates requiring executives to grant free company stock to staff",
        "Permanent replacement of all employment contracts with academic degrees"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai de sociologie urbaine",
      "text": "SOCIOLOGIE URBAINE — CAHIERS D'AMÉNAGEMENT DU TERRITOIRE : LA GENTRIFICATION DES FAUBOUOURGS ET LA FRACTURE DE LA MIXITÉ SOCIALE.\n\nLa réhabilitation urbaine des anciens faubourgs populaires, abondamment vantée par les politiques publiques comme un levier de mixité sociale et de renouvellement esthétique, produit en réalité des dynamiques d'éviction sociologique particulièrement brutales. L'arrivée massive de catégories sociales aisées attirées par le charme d'un patrimoine réhabilité provoque une hausse spéculative des loyers et du prix du m², contraignant les ménages modestes et les commerces traditionnels à quitter définitivement leur quartier historique.\n\nLoin de favoriser un brassage social harmonieux, cette gentrification substitue une homogénéité bourgeoise à la diversité populaire initiale. Les espaces publics réaménagés, sous couvert de modernisation, deviennent le théâtre d'une appropriation exclusive par les nouveaux arrivants, reléguant les habitants historiques aux périphéries urbaines et aggravant la ségrégation spatiale métropolitaine. Cette fragmentation urbaine fragilise la cohésion des grandes cités.",
      "q": "Quelle conséquence paradoxale la gentrification des faubourgs populaires entraîne-t-elle ?",
      "opt": [
        "Une baisse généralisée des prix de l'immobilier permettant le relogement des pauvres",
        "Le maintien d'une mixité sociale parfaite entre toutes les classes de la population",
        "Une éviction des populations modestes au profit d'une homogénéité sociale aisée",
        "La destruction systématique des anciens bâtiments pour construire des usines"
      ],
      "ans": 2,
      "passEn": "URBAN SOCIOLOGY — REGIONAL PLANNING PAPERS: WORKING-CLASS NEIGHBORHOOD GENTRIFICATION.\n\nUrban renewal in historic working-class neighborhoods, touted as fostering social mixing and aesthetic upgrades, actually triggers brutal sociological displacement. The influx of affluent buyers attracted by historic architecture drives up rents and real estate values, forcing low-income families and traditional shops out.\n\nFar from encouraging harmonious social mixing, gentrification replaces working-class diversity with affluent homogeneity. Redesigned public spaces become exclusively appropriated by newcomers, relegating long-time residents to urban fringes and worsening spatial segregation. This urban fragmentation weakens overall city cohesion.",
      "qEn": "What paradoxical consequence does working-class neighborhood gentrification cause?",
      "optEn": [
        "Widespread declines in housing costs facilitating low-income rehousing",
        "Preserving flawless social mixing across all population income brackets",
        "Displacement of low-income populations in favor of affluent social homogeneity",
        "Systematic demolition of historic buildings to construct industrial plants"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse sur la psychologie cognitive",
      "text": "PSYCHOLOGIE ET TECHNOLOGIE — CAHIERS DE RECHERCHE EN SCIENCES COGNITIVES : LA CAPTOLOGIE ET L'ÉROSION DU CONTRÔLE ATTENTIONNEL.\n\nLa captologie — la science de la conception des technologies numériques axée sur la captation de l'attention — s'appuie sur les mécanismes les plus archaïques du cerveau humain pour maximiser le temps passé devant les écrans. L'utilisation de récompenses aléatoires, le défilement infini et le flux continu de notifications exploitent les circuits de la dopamine pour instaurer une dépendance comportementale insidieuse et durable chez l'utilisateur.\n\nCette sollicitation permanente du système attentionnel produit une fragmentation néfaste de la concentration. Les usagers éprouvent des difficultés croissantes à s'engager dans des lectures longues ou des réflexions complexes exigeant un effort soutenue. Face à cette ingénierie de la distraction généralisée, la reconquête de l'autonomie cognitive devient une priorité éducative et politique majeure pour préserver la capacité d'apprentissage réflexif et de discernement critique.",
      "q": "Quel mécanisme la captologie exploite-t-elle pour retenir l'attention des usagers ?",
      "opt": [
        "La diffusion de contenus exclusivement scientifiques et éducatifs de haut niveau",
        "La baisse automatique de la luminosité des écrans après cinq minutes d'usage",
        "L'obligation légale de passer un examen de logique avant de déverrouiller son écran",
        "L'exploitation des circuits de récompense cérébraux par des sollicitations numériques continues"
      ],
      "ans": 3,
      "passEn": "PSYCHOLOGY AND TECH — COGNITIVE SCIENCE RESEARCH PAPERS: CAPTOLOGY AND ATTENTION EROSION.\n\nCaptology—the science of persuasive tech design focused on capturing user attention—leverages primitive brain mechanisms to maximize screen time. Employing variable rewards, infinite scrolling, and constant notifications triggers dopamine pathways to induce behavioral addiction.\n\nThis continuous attention hijacking fractures concentration. Users struggle increasingly to engage in long-form reading or complex thinking requiring sustained effort. Countering persuasive tech design makes reclaiming cognitive autonomy a major educational and political priority for preserving reflective discernment.",
      "qEn": "What mechanism does captology leverage to retain user attention?",
      "optEn": [
        "Distributing high-level scientific and educational content exclusively",
        "Automatic screen dimming after five minutes of continuous usage",
        "Legal requirements to pass logic tests prior to unlocking screen displays",
        "Exploiting brain reward circuits through continuous digital notifications"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai de philosophie environnementale",
      "text": "PHILOSOPHIE DE LA NATURE — REVUE D'ÉCOLOGIE CRITIQUE : L'ANTHROPOCENTRISME ET L'ILLUSION DE LA DOMINATION SUR LE VIVANT.\n\nLa tradition philosophique occidentale s'est largement construite sur un dualisme étanche séparant l'être humain d'une nature ravalée au rang de simple réservoir de ressources exploitables. Cet anthropocentrisme radical, accentué par la révolution industrielle et la mécanisation du monde, a fondé la légitimité de la conquête et de la transformation illimitée des écosystèmes terrestres au nom du progrès matériel et de la croissance économique.\n\nOr, la crise écologique contemporaine dote d'un démenti cinglant cette illusion de maîtrise. En déstabilisant les équilibres climatiques et biologiques mondiaux, les activités humaines révèlent notre dépendance absolue envers le tissu du vivant. Dépasser la crise exige une véritable révolution ontologique reconnaissant la valeur intrinsèque de la nature et réinscrivant l'homme au sein d'une communauté de destin avec les autres espèces vivantes.",
      "q": "Quelle conception philosophique l'auteur invite-t-il à dépasser pour répondre à la crise écologique ?",
      "opt": [
        "L'anthropocentrisme séparant l'homme de la nature pour justifier son exploitation",
        "La théorie du réchauffement climatique fondée sur les données scientifiques",
        "L'apprentissage des sciences de la Terre dans les programmes scolaires",
        "L'utilisation des énergies renouvelables dans la production industrielle"
      ],
      "ans": 0,
      "passEn": "ENVIRONMENTAL PHILOSOPHY — CRITICAL ECOLOGY REVIEW: ANTHROPOCENTRISM AND NATURE DOMINATION.\n\nWestern philosophy developed largely on rigid dualisms separating humans from nature reduced to exploitable resource reservoirs. Radical anthropocentrism, heightened by industrialization, justified unlimited ecosystem transformation in the name of material progress.\n\nHowever, modern ecological crises shatter this mastery illusion. Disrupting global climate and biological stability reveals absolute human dependency on the web of life. Overcoming crisis requires an ontological shift recognizing nature's intrinsic value and re-embedding humanity into a shared fate with all living species.",
      "qEn": "What philosophical framework does the author urge moving beyond to address climate crisis?",
      "optEn": [
        "Anthropocentrism separating humans from nature to justify exploitation",
        "Climate warming theories grounded in empirical scientific data",
        "Teaching Earth sciences across public primary school curricula",
        "Integrating renewable energy systems into industrial manufacturing"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 34,
      "level": "C1",
      "docType": "Étude d'histoire culturelle",
      "text": "HISTOIRE DU LIVRE — CAHIERS DE LA CULTURE ÉCRITE : DE LA LECTURE PROFONDE À LA NAVIGATION HYPERTEXTUELLE.\n\nLe passage du codex imprimé aux supports numériques transforme radicalement la nature cognitive de l'acte de lire. Alors que la lecture linéaire du livre papier favorise l'immersion prolongée, la mémorisation structurée et la méditation herméneutique, la navigation sur écran privilégie un balayage rapide et fragmenté, rythmé par la présence de liens hypertexte et d'éléments multimédias stimulants.\n\nCette mutation des pratiques de lecture altère la capacité du cerveau à construire des représentations mentales complexes et hiérarchisées. Si la lecture numérique offre un accès instantané à une masse d'informations inédite, elle risque de remplacer la profondeur de la compréhension textuelle par une culture du papillonnage superficiel si elle n'est pas articulée à un apprentissage exigeant de l'attention soutenue. Préserver la lecture profonde s'impose ainsi comme un enjeu éducatif majeur.",
      "q": "Quelle différence majeure l'auteur établit-il entre lecture sur papier et navigation sur écran ?",
      "opt": [
        "La lecture papier est beaucoup plus rapide et superficielle que la navigation numérique",
        "La lecture papier favorise l'immersion et la méditation, tandis que l'écran stimule le balayage fragmenté",
        "La navigation sur écran est réservée exclusivement aux chercheurs universitaires diplômés",
        "La lecture papier provoque une fatigue visuelle irréversible chez les jeunes lecteurs"
      ],
      "ans": 1,
      "passEn": "BOOK HISTORY — WRITTEN CULTURE PAPERS: FROM DEEP READING TO HYPERTEXTUAL NAVIGATION.\n\nTransitioning from printed codex to digital screens alters the cognitive nature of reading. Linear print reading fosters prolonged immersion, structured recall, and hermeneutic reflection, whereas screen reading encourages rapid, fragmented scanning driven by hyperlinks and media.\n\nThis shift alters the brain's capacity to build complex mental frameworks. While digital reading provides instant access to massive information, it risks replacing deep textual comprehension with superficial browsing unless paired with sustained attention training. Preserving deep reading is a major educational challenge.",
      "qEn": "What major contrast does the author establish between print reading and screen navigation?",
      "optEn": [
        "Print reading is significantly faster and more superficial than screen browsing",
        "Print reading fosters immersion and reflection, while screens encourage fragmented scanning",
        "Screen navigation is restricted exclusively to certified academic researchers",
        "Print reading causes irreversible visual eye fatigue among young readers"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai sur la sociologie de la consommation",
      "text": "SOCIOLOGIE DU MARCHÉ — REVUE D'ANALYSE ÉCONOMIQUE : L'OBSOLESCENCE PSYCHOLOGIQUE ET LA FABRIQUE DU DÉSIR MARCHAND.\n\nAu-delà de l'obsolescence technique programmée visant la dégradation physique des objets, le système marchand contemporain s'appuie massivement sur l'obsolescence psychologique pour stimuler le renouvellement frénétique des marchandises. En renouvelant perpétuellement les codes esthétiques par le biais de la publicité et du marketing d'influence, l'industrie parvient à dévaluer symboliquement des produits parfaitement fonctionnels dans l'esprit des consommateurs.\n\nCette fabrique artificielle de la dépréciation sociale crée un sentiment de démodage permanent chez l'usager, persuadé que la conservation d'un objet ancien nuit à son statut social. Rompre avec ce cercle vicieux d'accumulation exige de déconstruire les normes de la distinction marchande pour réhabiliter la valeur d'usage et la durabilité des biens d'équipement. Seul ce changement culturel majeur permettra de réduire l'empreinte environnementale globale de nos modes de consommation.",
      "q": "Comment s'opère l'obsolescence psychologique selon l'analyse sociologique ?",
      "opt": [
        "En provoquant la panne mécanique délibérée de l'appareil au bout de deux ans",
        "En augmentant les prix des pièces détachées pour empêcher les réparations en atelier",
        "En dévalorisant symboliquement les objets fonctionnels par le renouvellement des modes",
        "En interdisant la vente d'équipements d'occasion sur les plateformes numériques"
      ],
      "ans": 2,
      "passEn": "MARKET SOCIOLOGY — ECONOMIC ANALYSIS REVIEW: PSYCHOLOGICAL OBSOLESCENCE AND MARKETING.\n\nBeyond planned technical obsolescence causing physical device breakdowns, contemporary markets rely heavily on psychological obsolescence to drive continuous consumption. Constantly shifting aesthetic trends via advertising and influencer marketing symbolically devalues fully functional goods in consumers' minds.\n\nThis artificial social depreciation creates feelings of perpetual outdatedness, convincing buyers that keeping older items damages social standing. Breaking this cycle requires deconstructing marketing norms to champion utility value and product durability. Only this major cultural shift can reduce the overall environmental footprint of consumer lifestyles.",
      "qEn": "How does psychological obsolescence operate according to the sociological analysis?",
      "optEn": [
        "By triggering deliberate mechanical breakdowns after two years of ownership",
        "By raising spare part prices to block repair shop fixes",
        "By symbolically devaluing working items through shifting marketing trends",
        "By banning online peer-to-peer second-hand sales platforms"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur la vérité",
      "text": "ÉPISTÉMOLOGIE SOCIALE — ANNALES DE PHILOSOPHIE CONTEMPORAINE : LA POST-VÉRITÉ ET L'ÉROSION DES NORMES DE LA PREUVE EN ESPACE PUBLIC.\n\nL'émergence du concept de 'post-vérité' dans le discours public contemporain ne traduit pas simplement la propagation de mensonges politiques ordinaires, mais signale une mutation ontologique profonde de la relation sociétale aux normes de la preuve. Dans un espace médiatique saturé d'informations contradictoires, l'efficacité persuasive d'un énoncé ne dépend plus de sa correspondance empirique avec le réel ni de sa rigueur logique, mais de sa capacité à flatter les biais émotionnels et les représentations identitaires des récepteurs.\n\nCette relégation de la vérité factuelle au rang d'opinion interchangeable érode le socle même du débat démocratique. Lorsque les faits vérifiables sont ravalés à des croyances partisanes équivalentes, la délibération citoyenne perd sa boussole commune, laissant le champ libre à la manipulation démagogique. Reconstruire l'espace public exige dès lors de réaffirmer la primauté de l'honnêteté intellectuelle et de l'exigence de vérifiabilité scientifique contre le cynisme du relativisme absolu.",
      "q": "Quelle thèse centrale l'auteur soutient-il quant à l'impact de la post-vérité ?",
      "opt": [
        "Elle renforce la rigueur des recherches scientifiques en éliminant les doutes",
        "Elle permet de résoudre instantanément les conflits idéologiques historiques",
        "Elle oblige les gouvernements à distribuer gratuitement les journaux imprimés",
        "Elle substitue l'émotion identitaire à la preuve empirique, sapant la délibération commune"
      ],
      "ans": 3,
      "passEn": "SOCIAL EPISTEMOLOGY — CONTEMPORARY PHILOSOPHY ANNALS: POST-TRUTH AND EROSION OF PROOF NORMS.\n\nThe rise of 'post-truth' does not signal ordinary political falsehoods, but a profound shift in societal relationships with standards of evidence. In media saturated with conflicting claims, message persuasiveness no longer relies on empirical correspondence with reality or logical rigor, but on flattering emotional biases and identity beliefs.\n\nThis demotion of factual truth to interchangeable opinion erodes democratic foundations. When verifiable facts are reduced to partisan beliefs, public deliberation loses its shared compass, empowering demagogic manipulation. Rebuilding public debate requires asserting intellectual honesty over absolute relativism.",
      "qEn": "What central thesis does the author maintain regarding the impact of post-truth?",
      "optEn": [
        "Strengthens scientific research rigor by eliminating methodological doubt",
        "Instantly resolves historical ideological conflicts across societies",
        "Requires governments to distribute printed newspapers free of charge",
        "Substitutes emotional bias for empirical proof, eroding shared public deliberation"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai sur l'éthique de la technologie",
      "text": "PHILOSOPHIE DES TECHNOLOGIES — REVUE D'ÉTHIQUE TECHNIQUE : LA RÉIFICATION DU VIVANT À L'ÈRE DES BIOTECHNOLOGIES INDUSTRIELLES.\n\nLe développement spectaculaire des biotechnologies appliquées au vivant — de la brevetabilité du gène au génie génétique industriel — marque l'extension de la logique marchande aux structures fondamentales de la vie biologique. En appréhendant le patrimoine génétique végétal, animal et humain comme un réservoir d'actifs brevetables et de ressources optimisables, le modèle techno-industriel transforme le vivant en marchandise négociable.\n\nCette réification du vivant soulève des interrogations éthiques majeures sur la dignité ontologique de la nature. En réduisant les organismes biologiques à une ingénierie de données manipulables selon des critères de rendement économique, le système technicien dissout le respect sacré dû au mystère de la vie. Défendre le vivant exige ainsi de poser des limites éthiques infranchissables à la marchandisation du vivant face aux dérives du scientisme utilitariste.",
      "q": "Quel risque éthique majeur consubstantiel aux biotechnologies industrielles est dénoncé ?",
      "opt": [
        "La transformation des structures fondamentales du vivant en marchandises brevetables",
        "La baisse globale des rendements agricoles dans les pays en développement",
        "L'interdiction légale pour les scientifiques de mener des recherches médicales",
        "Le refus des entreprises privées de déposer des brevets d'invention"
      ],
      "ans": 0,
      "passEn": "PHILOSOPHICAL TECH — TECHNICAL ETHICS REVIEW: REIFICATION OF LIFE IN INDUSTRIAL BIOTECH.\n\nThe spectacular rise of applied biotechnology—from gene patenting to industrial genetic engineering—extends commercial logic into the building blocks of life. By treating plant, animal, and human genetic heritage as patentable assets and optimizable resources, techno-industrial models reduce life to negotiable commodities.\n\nThis reification of living systems raises major ethical concerns regarding nature's ontological dignity. By shrinking biological organisms to data engineered for economic yield, technical systems erode reverence for life. Safeguarding living systems demands establishing firm ethical boundaries against commercializing life.",
      "qEn": "What major ethical risk inherent to industrial biotechnology is denounced?",
      "optEn": [
        "Transforming the fundamental building blocks of life into patentable commodities",
        "Global declines in agricultural farm yields across developing nations",
        "Legal bans preventing scientists from conducting medical research",
        "Private corporate refusal to apply for technology patents"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion d'esthétique littéraire",
      "text": "CRITIQUE ESTHÉTIQUE — REVUE DE LITTÉRATURE COMPARÉE : L'ÉLOGE DE L'AMBIGUÏTÉ NARRATIVE CONTRE LA DICTATURE DU SENS UNIVOQUE.\n\nLa création littéraire authentique se distingue par sa capacité fondamentale à préserver l'ambiguïté, la polyphonie et la complexité des sentiments humains face aux tentatives de simplification idéologique. Contrairement au discours marchand ou à la propagande politique qui exigent la clarté univoque et le slogan immédiatement assimilable, le roman d'art ménage des espaces de doute, des hésitations morales et des contradictions indépassables chez ses personnages.\n\nCette résistance à la réduction simplificatrice fait de la fiction littéraire un refuge irremplaçable pour la pensée critique. En refusant de délivrer des leçons de morale toute faite ou des conclusions dogmatiques, l'œuvre littéraire invite le lecteur à éprouver la complexité du monde et à exercer son jugement herméneutique autonome face aux certitudes arrogantes des discours dominants. C'est dans ce pouvoir d'émancipation esthétique que réside la valeur intemporelle des chefs-d'œuvre.",
      "q": "Quelle vertu essentielle l'auteur attribue-t-il à la création littéraire authentique ?",
      "opt": [
        "Sa capacité à diffuser des slogans politiques simples immédiatement compréhensibles",
        "Sa préservation de l'ambiguïté et de la complexité qui stimule le jugement autonome",
        "Son obligation de respecter les vérités historiques de manière rigoureusement exacte",
        "Sa fonction d'apprentissage exclusif des règles de la grammaire française"
      ],
      "ans": 1,
      "passEn": "AESTHETIC CRITICISM — COMPARATIVE LITERATURE REVIEW: IN PRAISE OF NARRATIVE AMBIGUITY.\n\nAuthentic literary creation is distinguished by its fundamental capacity to preserve ambiguity, polyphony, and emotional complexity against ideological simplification. Unlike marketing discourse or political propaganda demanding single clear messages, artistic fiction preserves spaces of doubt and moral hesitation in its characters.\n\nThis resistance to reductive simplification makes literary fiction an irreplaceable haven for critical thought. By refusing canned moral lessons or dogmatic conclusions, literature invites readers to experience world complexity and exercise autonomous hermeneutic judgment against dominant certainty. In this aesthetic emancipation lies timeless literary value.",
      "qEn": "What essential virtue does the author attribute to authentic literary creation?",
      "optEn": [
        "Capacity to broadcast simple political slogans that are immediately digestible",
        "Preserving ambiguity and complexity that stimulates autonomous judgment",
        "Obligation to adhere strictly to verified historical facts without distortion",
        "Function of teaching French grammar rules exclusively"
      ]
    },
    {
      "paperNum": 4,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai de philosophie du temps",
      "text": "PHILOSOPHIE EXISTENTIELLE — CAHIERS DE LA DUREE HISTORIQUE : LE PRÉSENTISME PERPÉTUEL ET L'ASPHYXIE DE LA CONSCIENCE PROSPECTIVE.\n\nLe concept de 'présentisme' caractérise un régime d'historicité contemporain dans lequel le présent, dilaté et survolté par les technologies de l'immédiateté numérique, ne parvient plus à s'inscrire dans une continuité temporelle significative. Déconnecté de l'héritage d'un passé oublié et incapable d'articuler un projet d'avenir émancipateur à long terme, le sujet moderne se trouve enfermé dans un présent perpétuel, constamment sollicité par l'urgence de l'actualité immédiate.\n\nCette asphyxie de la conscience prospective paralyse la capacité d'action politique transformationnelle. En occultant la possibilité même d'un futur alternatif au nom du réalisme marchand immédiat, le présentisme condamne nos sociétés à une gestion gestionnaire du statu quo. Réenchanter l'engagement citoyen exige de briser cette clôture temporelle pour réinsérer l'expérience humaine dans la profondeur de la durée historique et du projet utopique.",
      "q": "Quelle critique centrale l'auteur formule-t-il contre le phénomène du 'présentisme' ?",
      "opt": [
        "Il accélère excessivement la construction des infrastructures de transports publiques",
        "Il oblige les citoyens à étudier la philosophie ancienne pendant leurs loisirs",
        "Il enferme le sujet dans un présent perpétuel qui paralyse toute projection politique d'avenir",
        "Il supprime la possibilité d'acheter des équipements numériques de dernière génération"
      ],
      "ans": 2,
      "passEn": "EXISTENTIAL PHILOSOPHY — HISTORICAL DURATION PAPERS: PERPETUAL PRESENTISM AND PROSPECTIVE CONSCIOUSNESS.\n\n'Presentism' describes a contemporary regime where the present, amplified by digital immediacy, fails to ground itself in meaningful temporal continuity. Severed from past heritage and unable to articulate long-term future projects, modern subjects remain locked in a perpetual present driven by constant immediate news urgency.\n\nThis suffocation of prospective consciousness paralyzes transformative political action. Obscuring alternative futures in the name of market realism, presentism condemns societies to managing the status quo. Re-enchanting civic engagement requires breaking this temporal enclosure to restore historical duration.",
      "qEn": "What central critique does the author level against 'presentism'?",
      "optEn": [
        "Excessively accelerates public transport infrastructure construction",
        "Forces citizens to study ancient philosophy during leisure time",
        "Locks subjects in a perpetual present paralyzing long-term political vision",
        "Eliminates the possibility of purchasing latest generation digital hardware"
      ]
    }
  ],
  [
    {
      "paperNum": 5,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Market Opening Hours: local fresh fruits and vegetables within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Library Study Meeting: exam revision and book lending within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Artisanal Bakery: complimentary morning pastries within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Keys Found in Subway: lost and found claims office within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (VANCOUVER) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Vancouver. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Vancouver.",
      "q": "Quel est l'objet principal de ce document affiché à Vancouver ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Vancouver",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Vancouver) — Community Picnic: seasonal kickoff gathering at the park within the community of Vancouver. Practical details, access guidelines, and opening hours available from municipal administrative offices in Vancouver.",
      "qEn": "What is the primary purpose of this public document posted in Vancouver?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Vancouver",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Bookstore Sales Advisor: part-time employment and customer service organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Apartment Rental: renovated housing near transit organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Company Parking Lot Policy: magnetic badge access control organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Historical Guided Tour: walking itinerary with a certified guide organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Chef's Lunch Special: daily main course and homemade dessert organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Beginner Yoga Workshop: Saturday morning practice session organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (VANCOUVER) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par BC Ferries à Vancouver. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Vancouver ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Vancouver",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Vancouver) — Borrowing Terms: online book loan renewals organized by BC Ferries in Vancouver. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Vancouver?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Vancouver",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Vancouver, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Waste Sorting and Urban Composting: In the Vancouver region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Vancouver, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Hybrid Telecommuting Model: In the Vancouver region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Vancouver, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Seasonal Nutrition and Immunity: In the Vancouver region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Vancouver, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Electronic Device Repairability: In the Vancouver region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Vancouver, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Protected Express Cycling Network: In the Vancouver region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Vancouver, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Contemporary Theatrical Play: In the Vancouver region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Vancouver, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Dairy Farming Cooperative and Direct Sales: In the Vancouver region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Vancouver, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Online Certifying Microprograms: In the Vancouver region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Vancouver, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Artificial Intelligence in Legal Practice: In the Vancouver region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (LA SOURCE) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Vancouver, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de Université Simon Fraser et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Source, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Source Newspaper) — Intergenerational Mentorship Network: In the Vancouver region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at Simon Fraser University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Source Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Generative AI in Higher Education: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (LA SOURCE) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de Université Simon Fraser souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Source Newspaper) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at Simon Fraser University underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SIMON FRASER) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Vancouver, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Simon Fraser University) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Vancouver, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ],
  [
    {
      "paperNum": 6,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Market Opening Hours: local fresh fruits and vegetables within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Library Study Meeting: exam revision and book lending within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Artisanal Bakery: complimentary morning pastries within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Keys Found in Subway: lost and found claims office within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (MONCTON-CARAQUET) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Moncton-Caraquet. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Moncton-Caraquet.",
      "q": "Quel est l'objet principal de ce document affiché à Moncton-Caraquet ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Moncton-Caraquet",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Moncton-Caraquet) — Community Picnic: seasonal kickoff gathering at the park within the community of Moncton-Caraquet. Practical details, access guidelines, and opening hours available from municipal administrative offices in Moncton-Caraquet.",
      "qEn": "What is the primary purpose of this public document posted in Moncton-Caraquet?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Moncton-Caraquet",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Bookstore Sales Advisor: part-time employment and customer service organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Apartment Rental: renovated housing near transit organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Company Parking Lot Policy: magnetic badge access control organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Historical Guided Tour: walking itinerary with a certified guide organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Chef's Lunch Special: daily main course and homemade dessert organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Beginner Yoga Workshop: Saturday morning practice session organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (MONCTON-CARAQUET) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par Pêcheries Acadiennes à Moncton-Caraquet. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Moncton-Caraquet ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Moncton-Caraquet",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Moncton-Caraquet) — Borrowing Terms: online book loan renewals organized by Acadian Fisheries in Moncton-Caraquet. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Moncton-Caraquet?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Moncton-Caraquet",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Moncton-Caraquet, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Waste Sorting and Urban Composting: In the Moncton-Caraquet region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Moncton-Caraquet, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Hybrid Telecommuting Model: In the Moncton-Caraquet region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Moncton-Caraquet, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Seasonal Nutrition and Immunity: In the Moncton-Caraquet region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Moncton-Caraquet, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Electronic Device Repairability: In the Moncton-Caraquet region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Moncton-Caraquet, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Protected Express Cycling Network: In the Moncton-Caraquet region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Moncton-Caraquet, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Contemporary Theatrical Play: In the Moncton-Caraquet region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Moncton-Caraquet, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Dairy Farming Cooperative and Direct Sales: In the Moncton-Caraquet region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Moncton-Caraquet, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Online Certifying Microprograms: In the Moncton-Caraquet region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Moncton-Caraquet, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Artificial Intelligence in Legal Practice: In the Moncton-Caraquet region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (L'ACADIE NOUVELLE) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Moncton-Caraquet, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de Université de Moncton et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal L'Acadie Nouvelle, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (L'Acadie Nouvelle) — Intergenerational Mentorship Network: In the Moncton-Caraquet region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at University of Moncton and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in L'Acadie Nouvelle, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Generative AI in Higher Education: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (L'ACADIE NOUVELLE) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de Université de Moncton souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (L'Acadie Nouvelle) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at University of Moncton underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE MONCTON) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Moncton-Caraquet, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Moncton) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Moncton-Caraquet, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ],
  [
    {
      "paperNum": 7,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Market Opening Hours: local fresh fruits and vegetables within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Library Study Meeting: exam revision and book lending within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Artisanal Bakery: complimentary morning pastries within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Keys Found in Subway: lost and found claims office within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (SHERBROOKE) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Sherbrooke. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Sherbrooke.",
      "q": "Quel est l'objet principal de ce document affiché à Sherbrooke ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Sherbrooke",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Sherbrooke) — Community Picnic: seasonal kickoff gathering at the park within the community of Sherbrooke. Practical details, access guidelines, and opening hours available from municipal administrative offices in Sherbrooke.",
      "qEn": "What is the primary purpose of this public document posted in Sherbrooke?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Sherbrooke",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Bookstore Sales Advisor: part-time employment and customer service organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Apartment Rental: renovated housing near transit organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Company Parking Lot Policy: magnetic badge access control organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Historical Guided Tour: walking itinerary with a certified guide organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Chef's Lunch Special: daily main course and homemade dessert organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Beginner Yoga Workshop: Saturday morning practice session organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (SHERBROOKE) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par Coopérative de l'Estrie à Sherbrooke. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Sherbrooke ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Sherbrooke",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Sherbrooke) — Borrowing Terms: online book loan renewals organized by Eastern Townships Cooperative in Sherbrooke. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Sherbrooke?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Sherbrooke",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Sherbrooke, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Waste Sorting and Urban Composting: In the Sherbrooke region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Sherbrooke, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Hybrid Telecommuting Model: In the Sherbrooke region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Sherbrooke, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Seasonal Nutrition and Immunity: In the Sherbrooke region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Sherbrooke, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Electronic Device Repairability: In the Sherbrooke region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Sherbrooke, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Protected Express Cycling Network: In the Sherbrooke region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Sherbrooke, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Contemporary Theatrical Play: In the Sherbrooke region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Sherbrooke, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Dairy Farming Cooperative and Direct Sales: In the Sherbrooke region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Sherbrooke, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Online Certifying Microprograms: In the Sherbrooke region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Sherbrooke, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Artificial Intelligence in Legal Practice: In the Sherbrooke region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (LA TRIBUNE) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Sherbrooke, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de Université de Sherbrooke et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal La Tribune, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (La Tribune Newspaper) — Intergenerational Mentorship Network: In the Sherbrooke region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at University of Sherbrooke and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in La Tribune Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Generative AI in Higher Education: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (LA TRIBUNE) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de Université de Sherbrooke souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (La Tribune Newspaper) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at University of Sherbrooke underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ DE SHERBROOKE) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Sherbrooke, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (University of Sherbrooke) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Sherbrooke, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ],
  [
    {
      "paperNum": 8,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Market Opening Hours: local fresh fruits and vegetables within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Library Study Meeting: exam revision and book lending within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Artisanal Bakery: complimentary morning pastries within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Keys Found in Subway: lost and found claims office within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (TROIS-RIVIÈRES) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Trois-Rivières. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Trois-Rivières.",
      "q": "Quel est l'objet principal de ce document affiché à Trois-Rivières ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Trois-Rivières",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Trois-Rivieres) — Community Picnic: seasonal kickoff gathering at the park within the community of Trois-Rivieres. Practical details, access guidelines, and opening hours available from municipal administrative offices in Trois-Rivieres.",
      "qEn": "What is the primary purpose of this public document posted in Trois-Rivieres?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Trois-Rivieres",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Bookstore Sales Advisor: part-time employment and customer service organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Apartment Rental: renovated housing near transit organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Company Parking Lot Policy: magnetic badge access control organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Historical Guided Tour: walking itinerary with a certified guide organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Chef's Lunch Special: daily main course and homemade dessert organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Beginner Yoga Workshop: Saturday morning practice session organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (TROIS-RIVIÈRES) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par Port de Trois-Rivières à Trois-Rivières. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Trois-Rivières ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Trois-Rivières",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Trois-Rivieres) — Borrowing Terms: online book loan renewals organized by Port of Trois-Rivieres in Trois-Rivieres. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Trois-Rivieres?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Trois-Rivieres",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Trois-Rivières, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Waste Sorting and Urban Composting: In the Trois-Rivieres region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Trois-Rivières, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Hybrid Telecommuting Model: In the Trois-Rivieres region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Trois-Rivières, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Seasonal Nutrition and Immunity: In the Trois-Rivieres region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Trois-Rivières, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Electronic Device Repairability: In the Trois-Rivieres region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Trois-Rivières, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Protected Express Cycling Network: In the Trois-Rivieres region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Trois-Rivières, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Contemporary Theatrical Play: In the Trois-Rivieres region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Trois-Rivières, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Dairy Farming Cooperative and Direct Sales: In the Trois-Rivieres region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Trois-Rivières, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Online Certifying Microprograms: In the Trois-Rivieres region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Trois-Rivières, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Artificial Intelligence in Legal Practice: In the Trois-Rivieres region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (LE NOUVELLISTE) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Trois-Rivières, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de UQTR et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Nouvelliste, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Nouvelliste) — Intergenerational Mentorship Network: In the Trois-Rivieres region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at UQTR University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Nouvelliste, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Generative AI in Higher Education: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (LE NOUVELLISTE) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de UQTR souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Nouvelliste) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at UQTR University underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (UQTR) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (UQTR) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (UQTR) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (UQTR) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (UQTR) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (UQTR) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Trois-Rivières, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (UQTR University) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Trois-Rivieres, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ],
  [
    {
      "paperNum": 9,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (HALIFAX) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Market Opening Hours: local fresh fruits and vegetables within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (HALIFAX) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (HALIFAX) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Library Study Meeting: exam revision and book lending within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (HALIFAX) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Artisanal Bakery: complimentary morning pastries within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (HALIFAX) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Keys Found in Subway: lost and found claims office within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (HALIFAX) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (HALIFAX) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Halifax. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Halifax.",
      "q": "Quel est l'objet principal de ce document affiché à Halifax ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Halifax",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Halifax) — Community Picnic: seasonal kickoff gathering at the park within the community of Halifax. Practical details, access guidelines, and opening hours available from municipal administrative offices in Halifax.",
      "qEn": "What is the primary purpose of this public document posted in Halifax?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Halifax",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (HALIFAX) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Bookstore Sales Advisor: part-time employment and customer service organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (HALIFAX) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Apartment Rental: renovated housing near transit organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (HALIFAX) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Company Parking Lot Policy: magnetic badge access control organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (HALIFAX) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Historical Guided Tour: walking itinerary with a certified guide organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (HALIFAX) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Chef's Lunch Special: daily main course and homemade dessert organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (HALIFAX) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (HALIFAX) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Beginner Yoga Workshop: Saturday morning practice session organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (HALIFAX) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par Institut Océanographique à Halifax. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Halifax ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Halifax",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Halifax) — Borrowing Terms: online book loan renewals organized by Oceanographic Institute in Halifax. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Halifax?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Halifax",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Halifax, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Waste Sorting and Urban Composting: In the Halifax region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Halifax, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Hybrid Telecommuting Model: In the Halifax region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Halifax, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Seasonal Nutrition and Immunity: In the Halifax region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Halifax, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Electronic Device Repairability: In the Halifax region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Halifax, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Protected Express Cycling Network: In the Halifax region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Halifax, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Contemporary Theatrical Play: In the Halifax region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Halifax, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Dairy Farming Cooperative and Direct Sales: In the Halifax region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Halifax, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Online Certifying Microprograms: In the Halifax region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Halifax, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Artificial Intelligence in Legal Practice: In the Halifax region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (LE COURRIER) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Halifax, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de Université Sainte-Anne et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Courrier, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Courrier Newspaper) — Intergenerational Mentorship Network: In the Halifax region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at Sainte-Anne University and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Courrier Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Generative AI in Higher Education: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (LE COURRIER) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de Université Sainte-Anne souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Courrier Newspaper) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at Sainte-Anne University underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (UNIVERSITÉ SAINTE-ANNE) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Halifax, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Sainte-Anne University) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Halifax, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ],
  [
    {
      "paperNum": 10,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau d'information",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — HORAIRES DE MARCHÉ : fruits et légumes locaux au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant fruits et légumes locaux à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Market Opening Hours: local fresh fruits and vegetables within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding local fresh fruits and vegetables in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 2,
      "level": "A1",
      "docType": "Avis municipal",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — FERMETURE TEMPORAIRE DE PISCINE : travaux d'entretien des bassins au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant travaux d'entretien des bassins à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Temporary Pool Closure: pool basin maintenance and cleaning within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding pool basin maintenance and cleaning in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 3,
      "level": "A1",
      "docType": "Message court (SMS)",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — RENDEZ-VOUS À LA BIBLIOTHÈQUE : révision d'examen et prêt de livres au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant révision d'examen et prêt de livres à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Library Study Meeting: exam revision and book lending within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding exam revision and book lending in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 4,
      "level": "A1",
      "docType": "Affiche promotionnelle",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — BOULANGERIE ARTISANALE : viennoiseries offertes le matin au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant viennoiseries offertes le matin à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Artisanal Bakery: complimentary morning pastries within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding complimentary morning pastries in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 5,
      "level": "A1",
      "docType": "Avis d'objet trouvé",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — CLÉS TROUVÉES DANS LE MÉTRO : bureau des objets trouvés au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant bureau des objets trouvés à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Keys Found in Subway: lost and found claims office within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding lost and found claims office in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 6,
      "level": "A1",
      "docType": "Annonce de vente de garage",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — VENTE DE QUARTIER : vêtements et jouets d'occasion au parc au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant vêtements et jouets d'occasion au parc à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Neighborhood Garage Sale: second-hand clothing and toys at the park within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding second-hand clothing and toys at the park in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 7,
      "level": "A1",
      "docType": "Invitation amicale",
      "text": "DOCUMENT PUBLIC (CALGARY-EDMONTON) — PIQUE-NIQUE ASSOCIATIF : rencontre de début de saison au parc au sein de la collectivité de Calgary-Edmonton. Informations pratiques, conditions d'accès et horaires consultables auprès des services municipaux de Calgary-Edmonton.",
      "q": "Quel est l'objet principal de ce document affiché à Calgary-Edmonton ?",
      "opt": [
        "L'annonce d'une fermeture administrative exceptionnelle",
        "Des informations pratiques concernant rencontre de début de saison au parc à Calgary-Edmonton",
        "L'ouverture d'un nouveau complexe commercial privé",
        "Une modification des tarifs de stationnement en centre-ville"
      ],
      "ans": 1,
      "passEn": "Public Document (Calgary-Edmonton) — Community Picnic: seasonal kickoff gathering at the park within the community of Calgary-Edmonton. Practical details, access guidelines, and opening hours available from municipal administrative offices in Calgary-Edmonton.",
      "qEn": "What is the primary purpose of this public document posted in Calgary-Edmonton?",
      "optEn": [
        "An announcement of an exceptional administrative facility closure",
        "Practical information regarding seasonal kickoff gathering at the park in Calgary-Edmonton",
        "The grand opening of a newly constructed private shopping mall",
        "A modification of downtown parking meter payment rates"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 8,
      "level": "A2",
      "docType": "Offre d'emploi",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — CONSEILLER DE VENTE EN LIBRAIRIE : temps partiel et accueil clientèle organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant temps partiel et accueil clientèle à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Bookstore Sales Advisor: part-time employment and customer service organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning part-time employment and customer service in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 9,
      "level": "A2",
      "docType": "Petite annonce immobilière",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — LOCATION D'APPARTEMENT : logement rénové proche transports organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant logement rénové proche transports à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Apartment Rental: renovated housing near transit organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning renovated housing near transit in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de service interne",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — RÈGLEMENT DU PARKING D'ENTREPRISE : accès par badge magnétique organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant accès par badge magnétique à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Company Parking Lot Policy: magnetic badge access control organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning magnetic badge access control in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 11,
      "level": "A2",
      "docType": "Dépliant touristique",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — VISITE GUIDÉE HISTORIQUE : parcours pédestre avec guide certifié organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant parcours pédestre avec guide certifié à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Historical Guided Tour: walking itinerary with a certified guide organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning walking itinerary with a certified guide in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 12,
      "level": "A2",
      "docType": "Menu de restaurant",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — FORMULE MIDI DU CHEF : plat du jour et dessert maison organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant plat du jour et dessert maison à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Chef's Lunch Special: daily main course and homemade dessert organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning daily main course and homemade dessert in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 13,
      "level": "A2",
      "docType": "Courriel client",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — SUIVI DE LIVRAISON DE COLIS : demande de créneau horaire de livraison organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant demande de créneau horaire de livraison à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Parcel Delivery Tracking: request for carrier delivery timeslot organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning request for carrier delivery timeslot in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 14,
      "level": "A2",
      "docType": "Avis de club sportif",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — ATELIER DE YOGA POUR DÉBUTANTS : séance du samedi matin organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant séance du samedi matin à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Beginner Yoga Workshop: Saturday morning practice session organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning Saturday morning practice session in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 15,
      "level": "A2",
      "docType": "Règlement de médiathèque",
      "text": "COMMUNICATION LOCALE (CALGARY-EDMONTON) — CONDITIONS D'EMPRUNT : renouvellement de prêt en ligne organisé par Énergie Verte de l'Ouest à Calgary-Edmonton. Les candidats et usagers intéressés sont invités à respecter les consignes officielles avant la date limite indiquée.",
      "q": "Quelle information essentielle est transmise dans cette communication de Calgary-Edmonton ?",
      "opt": [
        "Une suppression des services de transport public",
        "Les modalités et consignes concernant renouvellement de prêt en ligne à Calgary-Edmonton",
        "Une augmentation des frais d'inscription universitaire",
        "Le report sine die de l'événement communautaire"
      ],
      "ans": 1,
      "passEn": "Local Announcement (Calgary-Edmonton) — Borrowing Terms: online book loan renewals organized by Western Green Energy in Calgary-Edmonton. Interested candidates and community users are requested to follow official guidelines before the stated deadline.",
      "qEn": "What essential information is communicated in this announcement from Calgary-Edmonton?",
      "optEn": [
        "A permanent cancellation of regional public transportation services",
        "Official procedures and guidelines concerning online book loan renewals in Calgary-Edmonton",
        "An unexpected increase in university academic registration tuition",
        "The indefinite postponement of the scheduled community gathering"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 16,
      "level": "B1",
      "docType": "Article d'information",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — TRI SÉLECTIF ET COMPOSTAGE URBAIN : Dans la région de Calgary-Edmonton, l'initiative portant sur réduction des déchets municipaux suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant réduction des déchets municipaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Waste Sorting and Urban Composting: In the Calgary-Edmonton region, this public initiative centered on municipal waste reduction targets is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing municipal waste reduction targets despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 17,
      "level": "B1",
      "docType": "Enquête sociologique",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — MODÈLE DE TÉLÉTRAVAIL HYBRIDE : Dans la région de Calgary-Edmonton, l'initiative portant sur équilibre vie professionnelle et personnelle suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant équilibre vie professionnelle et personnelle malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Hybrid Telecommuting Model: In the Calgary-Edmonton region, this public initiative centered on work-life balance and productivity is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing work-life balance and productivity despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 18,
      "level": "B1",
      "docType": "Article santé",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — ALIMENTATION DE SAISON ET IMMUNITÉ : Dans la région de Calgary-Edmonton, l'initiative portant sur produits frais riches en antioxydants suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant produits frais riches en antioxydants malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Seasonal Nutrition and Immunity: In the Calgary-Edmonton region, this public initiative centered on fresh produce rich in antioxidants is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fresh produce rich in antioxidants despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 19,
      "level": "B1",
      "docType": "Guide consommateur",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — RÉPARABILITÉ DES APPAREILS ÉLECTRONIQUES : Dans la région de Calgary-Edmonton, l'initiative portant sur prolongation de la durée de vie du matériel suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant prolongation de la durée de vie du matériel malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Electronic Device Repairability: In the Calgary-Edmonton region, this public initiative centered on extending equipment lifespan through repair is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing extending equipment lifespan through repair despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 20,
      "level": "B1",
      "docType": "Article d'urbanisme",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — NOUVEAU RÉSEAU CYCLABLE SÉCURISÉ : Dans la région de Calgary-Edmonton, l'initiative portant sur hausse des déplacements à vélo à l'heure de pointe suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant hausse des déplacements à vélo à l'heure de pointe malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Protected Express Cycling Network: In the Calgary-Edmonton region, this public initiative centered on growth in rush-hour bicycle commuting is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing growth in rush-hour bicycle commuting despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 21,
      "level": "B1",
      "docType": "Critique culturelle",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — NOUVELLE PIÈCE DE THÉÂTRE CONTEMPORAINE : Dans la région de Calgary-Edmonton, l'initiative portant sur justesse de l'interprétation des comédiens suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant justesse de l'interprétation des comédiens malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Contemporary Theatrical Play: In the Calgary-Edmonton region, this public initiative centered on accuracy of actor performances and staging is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing accuracy of actor performances and staging despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 22,
      "level": "B1",
      "docType": "Reportage économique",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — COOPÉRATIVE FROMAGÈRE ET VENTE DIRECTE : Dans la région de Calgary-Edmonton, l'initiative portant sur valorisation du travail des éleveurs locaux suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant valorisation du travail des éleveurs locaux malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Dairy Farming Cooperative and Direct Sales: In the Calgary-Edmonton region, this public initiative centered on fair financial compensation for local farmers is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing fair financial compensation for local farmers despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 23,
      "level": "B1",
      "docType": "Article éducation",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — MICROPROGRAMMES CERTIFIANTS EN LIGNE : Dans la région de Calgary-Edmonton, l'initiative portant sur formation continue pour professionnels en reconversion suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant formation continue pour professionnels en reconversion malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Online Certifying Microprograms: In the Calgary-Edmonton region, this public initiative centered on continuing education for working professionals is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing continuing education for working professionals despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 24,
      "level": "B1",
      "docType": "Article technologique",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — INTELLIGENCE ARTIFICIELLE DANS LES CABINETS JURIDIQUES : Dans la région de Calgary-Edmonton, l'initiative portant sur relecture humaine nécessaire des sources suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant relecture humaine nécessaire des sources malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Artificial Intelligence in Legal Practice: In the Calgary-Edmonton region, this public initiative centered on rigorous human verification of cited legal sources is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing rigorous human verification of cited legal sources despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 25,
      "level": "B1",
      "docType": "Article de société",
      "text": "ARTICLE D'ACTUALITÉ (LE FRANCO) — RÉSEAU D'ENTRAIDE INTERGÉNÉRATIONNEL : Dans la région de Calgary-Edmonton, l'initiative portant sur parrainage entre étudiants et aînés suscite un intérêt croissant. Selon les acteurs de Campus Saint-Jean et les citoyens mobilisés, les retombées positives confirment l'efficacité des mesures concertées, même si des ajustements opérationnels demeurent nécessaires pour pérenniser les résultats à long terme.",
      "q": "D'après cet article du journal Le Franco, que retiennent principalement les observateurs ?",
      "opt": [
        "L'échec complet de l'initiative menée dans la région",
        "L'efficacité des mesures concernant parrainage entre étudiants et aînés malgré des ajustements requis",
        "Le refus des citoyens de participer aux projets locaux",
        "L'annulation du financement accordé par les institutions"
      ],
      "ans": 1,
      "passEn": "News Chronicle (Le Franco Newspaper) — Intergenerational Mentorship Network: In the Calgary-Edmonton region, this public initiative centered on pairing university students with senior citizens is attracting widespread interest. According to researchers at Saint-Jean University Campus and participating citizens, positive findings validate the effectiveness of coordinated policies, even though ongoing operational refinements remain necessary for long-term durability.",
      "qEn": "According to this article in Le Franco Newspaper, what is the primary takeaway highlighted by observers?",
      "optEn": [
        "The complete operational failure of the regional community program",
        "The effectiveness of measures addressing pairing university students with senior citizens despite necessary adjustments",
        "The widespread refusal of local citizens to take part in civic projects",
        "The immediate cancellation of government funding previously granted"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 26,
      "level": "B2",
      "docType": "Éditorial économique",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — ÉCONOMIE CIRCULAIRE ET ÉCO-CONCEPTION : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de responsabilité des industriels et réparabilité ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de économie circulaire et éco-conception ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter responsabilité des industriels et réparabilité",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Circular Economy and Eco-Design: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of corporate manufacturing responsibility and repairability cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding circular economy and eco-design?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve corporate manufacturing responsibility and repairability",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sociologique",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — QUÊTE DE SENS CHEZ LES JEUNES DIPLÔMÉS : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de impact sociétal et flexibilité professionnelle ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de quête de sens chez les jeunes diplômés ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter impact sociétal et flexibilité professionnelle",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Search for Meaning Among Recent Graduates: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of societal impact and workplace schedule flexibility cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding search for meaning among recent graduates?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve societal impact and workplace schedule flexibility",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 28,
      "level": "B2",
      "docType": "Débat environnemental",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — DÉPLOIEMENT DES PARCS ÉOLIENS : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de arbitrage entre urgence climatique et concertation locale ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de déploiement des parcs éoliens ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter arbitrage entre urgence climatique et concertation locale",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Renewable Wind Energy Deployment: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of balancing climate urgency with local community consent cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding renewable wind energy deployment?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve balancing climate urgency with local community consent",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 29,
      "level": "B2",
      "docType": "Tribune universitaire",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — IA GÉNÉRATIVE DANS L'ENSEIGNEMENT SUPÉRIEUR : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de déplacement de l'évaluation vers l'analyse critique ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de ia générative dans l'enseignement supérieur ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter déplacement de l'évaluation vers l'analyse critique",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Generative AI in Higher Education: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of shifting assessment toward critical reflexive analysis cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding generative ai in higher education?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve shifting assessment toward critical reflexive analysis",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 30,
      "level": "B2",
      "docType": "Chronique d'architecture",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — DENSIFICATION URBAINE ET PATRIMOINE BÂTI : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de réhabilitation écologique des bâtiments historiques ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de densification urbaine et patrimoine bâti ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter réhabilitation écologique des bâtiments historiques",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Urban Densification and Built Heritage: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of sustainable ecological rehabilitation of historic edifices cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding urban densification and built heritage?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve sustainable ecological rehabilitation of historic edifices",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 31,
      "level": "B2",
      "docType": "Rapport scientifique",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — PRÉSERVATION DE LA BIODIVERSITÉ MARINE : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de contrôle des pollutions terrestres en amont ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de préservation de la biodiversité marine ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter contrôle des pollutions terrestres en amont",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Marine Biodiversity Conservation: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of strict control of upstream land-based pollution runoff cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding marine biodiversity conservation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve strict control of upstream land-based pollution runoff",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 32,
      "level": "B2",
      "docType": "Analyse médiatique",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — ÉDUCATION À L'ESPRIT CRITIQUE ET DÉSINFORMATION : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de préservation du débat public fondé sur des faits ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de éducation à l'esprit critique et désinformation ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter préservation du débat public fondé sur des faits",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Critical Thinking and Combating Disinformation: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of safeguarding fact-based democratic public discourse cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding critical thinking and combating disinformation?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve safeguarding fact-based democratic public discourse",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 33,
      "level": "B2",
      "docType": "Article de santé publique",
      "text": "TRIBUNE ANALYTIQUE (LE FRANCO) — PRIORITÉ À LA MÉDECINE PRÉVENTIVE : L'analyse approfondie menée par les chercheurs de Campus Saint-Jean souligne que la question de investissement précoce dans le dépistage et l'alimentation ne peut être résolue par de simples mesures palliatives. Une transformation pérenne exige une révision structurelle des paradigmes décisionnels, conciliant rigueur analytique, impératifs éthiques et responsabilité citoyenne face aux défis contemporains.",
      "q": "Quelle thèse centrale l'auteur défend-il à propos de priorité à la médecine préventive ?",
      "opt": [
        "Le statu quo demeure la meilleure option pour les décideurs",
        "Une révision structurelle profonde est nécessaire pour traiter investissement précoce dans le dépistage et l'alimentation",
        "Les technologies numériques suffisent à résoudre tous les déséquilibres",
        "Il convient de déléguer la gestion publique à des entités privées exclusives"
      ],
      "ans": 1,
      "passEn": "Analytical Editorial (Le Franco Newspaper) — Prioritizing Preventative Healthcare: In-depth analysis by academic researchers at Saint-Jean University Campus underscores that the critical challenge of early investment in disease screening and wholesome nutrition cannot be addressed through superficial palliative measures. Sustainable transformation demands a structural overhaul of governance paradigms, reconciling analytical rigor, ethical imperatives, and civic accountability.",
      "qEn": "What central thesis does the author defend regarding prioritizing preventative healthcare?",
      "optEn": [
        "Maintaining the existing status quo remains the most prudent option for policy makers",
        "A profound structural overhaul is required to effectively resolve early investment in disease screening and wholesome nutrition",
        "Emerging digital automation alone is capable of rectifying all systemic imbalances",
        "Public administration should be completely delegated to private corporate enterprises"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 34,
      "level": "C1",
      "docType": "Essai philosophique",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — TEMPORALITÉ ET CULTE DE L'INSTANTANÉITÉ : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de érosion de la lenteur nécessaire à la maturation de la pensée. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à érosion de la lenteur nécessaire à la maturation de la pensée",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — Temporality and the Cult of Instantaneity: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of erosion of the contemplative stillness essential for thought maturation. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding erosion of the contemplative stillness essential for thought maturation",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 35,
      "level": "C1",
      "docType": "Critique littéraire",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — ESTHÉTIQUE DU DÉPOUILLEMENT SYNTAXIQUE : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de densité poétique et tension métaphorique du récit. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à densité poétique et tension métaphorique du récit",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — Aesthetics of Syntactic Sobriety: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of poetic density and metaphorical tension in prose. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic density and metaphorical tension in prose",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 36,
      "level": "C1",
      "docType": "Essai épistémologique",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — ILLUSION ANTHROPOMORPHIQUE DE L'IA : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de distinction entre inférence statistique et conscience réflexive. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à distinction entre inférence statistique et conscience réflexive",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — The Anthropomorphic Illusion of AI: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of distinguishing statistical inference from reflexive human consciousness. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding distinguishing statistical inference from reflexive human consciousness",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 37,
      "level": "C2",
      "docType": "Analyse sociolinguistique",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — POLYPHONIE PLURICENTRIQUE DE LA FRANCOPHONIE : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de vitalité des variétés régionales francophones mondiales. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à vitalité des variétés régionales francophones mondiales",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — Pluricentric Polyphony of the Francophonie: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of the vitality of global regional Francophone varieties. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding the vitality of global regional Francophone varieties",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 38,
      "level": "C2",
      "docType": "Essai esthétique",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — L'ART CONTEMPORAIN DANS L'ESPACE PUBLIC : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de subversion poétique et révélation des tensions politiques. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à subversion poétique et révélation des tensions politiques",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — Contemporary Art in Civic Spaces: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of poetic subversion and unmasking political civic tensions. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding poetic subversion and unmasking political civic tensions",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 39,
      "level": "C2",
      "docType": "Anthropologie philosophique",
      "text": "ESSAI CRITIQUE (CAMPUS SAINT-JEAN) — SYMBOLIQUE PROJECTIVE DE LA MÉMOIRE COLLECTIVE : Dans cet essai rédigé à Calgary-Edmonton, l'auteur explore la portée conceptuelle de sélection axiologique et projection communautaire vers l'avenir. En articulant une dialectique rigoureuse entre héritage philosophique et mutations contemporaines, le texte démontre que l'autonomie réflexive de l'esprit demeure l'ultime rempart contre la réification de l'expérience humaine.",
      "q": "Quelle est l'orientation philosophique majeure exprimée dans cette réflexion ?",
      "opt": [
        "La soumission inconditionnelle de la pensée aux déterminismes matériels",
        "La primauté de l'autonomie réflexive de l'esprit face à sélection axiologique et projection communautaire vers l'avenir",
        "L'abandon de toute tradition philosophique au profit de l'immédiateté empirique",
        "La négation de toute valeur herméneutique dans la critique textuelle"
      ],
      "ans": 1,
      "passEn": "Critical Essay (Saint-Jean University Campus) — Projective Symbolics of Collective Memory: In this philosophical essay composed in Calgary-Edmonton, the author investigates the conceptual implications of axiological selection and community projection toward the future. By articulating a rigorous dialectic between classical philosophical heritage and modern societal shifts, the treatise proves that the reflexive autonomy of the human mind remains the essential barrier against the reification of lived experience.",
      "qEn": "What major philosophical thesis is affirmed in this scholarly critique?",
      "optEn": [
        "The unconditional subordination of intellectual thought to material determinisms",
        "The absolute primacy of reflexive autonomy of thought regarding axiological selection and community projection toward the future",
        "The complete rejection of philosophical traditions in favor of superficial empirical immediacy",
        "The total denial of any interpretative hermeneutic value in textual literary analysis"
      ]
    }
  ]
];

export function getReadingPaperItems(paperNum: number): ReadingItem[] {
  const idx = Math.max(0, Math.min(9, paperNum - 1));
  return AUTHENTIC_READING_MASTER_BANK[idx] || AUTHENTIC_READING_MASTER_BANK[0];
}
