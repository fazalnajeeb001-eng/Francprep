import type { ReadingItem } from "./examSchema";

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

// Master Reading Question Bank for 10 Papers x 39 Questions = 390 Calibrated Authentic Reading Questions.
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
      "docType": "Avis d'établissement culturel",
      "text": "VILLE DE QUÉBEC — CINÉMA LE CAPITOLE : Les séances du matin sont au tarif unique de 7 euros pour tous les spectateurs jusqu'à 12h00. La billetterie automatique ouvre 20 minutes avant le premier film.",
      "q": "Quel est le prix du billet de cinéma le matin avant midi ?",
      "opt": [
        "7 euros",
        "5 euros",
        "9 euros",
        "12 euros"
      ],
      "ans": 0,
      "passEn": "QUEBEC CITY — LE CAPITOLE CINEMA: Morning screenings are offered at a flat rate of 7 euros for all moviegoers until 12:00 PM. Automatic ticketing opens 20 minutes prior to the first film.",
      "qEn": "What is the movie ticket price for morning screenings before noon?",
      "optEn": [
        "7 euros",
        "5 euros",
        "9 euros",
        "12 euros"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 2,
      "level": "A1",
      "docType": "Panneau d'information municipale",
      "text": "COMMUNAUTÉ URBAINE — PARC DES CHUTES : Les chiens doivent être tenus en laisse sur l'ensemble des sentiers de randonnée. Les sacs pour déjections canines sont gratuits à l'entrée du parc.",
      "q": "Quelle règle s'applique aux chiens dans le parc ?",
      "opt": [
        "Ils sont strictement interdits",
        "Ils doivent rester tenus en laisse",
        "Ils peuvent courir sans surveillance",
        "Ils doivent porter une muselière noire"
      ],
      "ans": 1,
      "passEn": "URBAN COMMUNITY — WATERFALLS PARK: Dogs must be kept on a leash across all hiking trails. Waste bags are free of charge at the park main entrance.",
      "qEn": "What rule applies to dogs inside the park?",
      "optEn": [
        "They are strictly prohibited",
        "They must remain kept on a leash",
        "They can run around unsupervised",
        "They must wear a black muzzle"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 3,
      "level": "A1",
      "docType": "Annonce de laverie automatique",
      "text": "SERVICES DE QUARTIER — LAVERIE EXPRESS : Ouvert 7 jours sur 7 de 07h00 à 22h00. Le paiement s'effectue par carte bancaire ou pièces de monnaie. Détergent biologique inclus automatiquement.",
      "q": "Comment les usagers peuvent-ils payer leur lessive ?",
      "opt": [
        "Uniquement par chèque bancaire",
        "Uniquement par virement mobile",
        "Par carte bancaire ou pièces de monnaie",
        "Par réservation mensuelle au guichet"
      ],
      "ans": 2,
      "passEn": "NEIGHBORHOOD SERVICES — EXPRESS LAUNDROMAT: Open 7 days a week from 7:00 AM to 10:00 PM. Payment accepted via credit card or coins. Organic detergent included automatically.",
      "qEn": "How can users pay for their laundry wash?",
      "optEn": [
        "Exclusively by paper check",
        "Exclusively via mobile transfer",
        "By credit card or coin payments",
        "By monthly counter subscription"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 4,
      "level": "A1",
      "docType": "Consigne de stationnement",
      "text": "VOIRIE MUNICIPALE — ZONE BLEUE : Stationnement gratuit limité à 1 heure et 30 minutes avec disque obligatoire du lundi au samedi de 09h00 à 18h00. Le disque doit être bien visible derrière le pare-brise.",
      "q": "Où le disque de stationnement doit-il être placé ?",
      "opt": [
        "Sur le siège passager arrière",
        "Sur la plaque d'immatriculation",
        "Dans le coffre du véhicule",
        "Derrière le pare-brise avant"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL ROADWAYS — BLUE ZONE: Free parking limited to 1 hour 30 minutes with mandatory parking disc Monday through Saturday from 9:00 AM to 6:00 PM. Disc must be visible behind the windshield.",
      "qEn": "Where should the parking disc be placed?",
      "optEn": [
        "On the rear passenger seat",
        "On the license plate exterior",
        "Inside the vehicle trunk",
        "Behind the front windshield"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 5,
      "level": "A2",
      "docType": "SMS d'invitation amicale",
      "text": "MESSAGE PERSONNEL — Salut Émilie ! On organise un piquenique participatif ce dimanche à 12h30 au parc du Domaine. Chacun apporte un plat salé ou sucré à partager. N'oublie pas d'apporter ta nappe de piquenique ! Bises, Clara.",
      "q": "Que demande Clara à Émilie d'apporter au piquenique ?",
      "opt": [
        "Sa nappe de piquenique et un plat à partager",
        "Une grande bouteille de jus de fruits",
        "Des chaises pliantes pour tout le groupe",
        "Un ballon de volley-ball neuf"
      ],
      "ans": 0,
      "passEn": "PERSONAL MESSAGE — Hi Emilie! We're organizing a potluck picnic this Sunday at 12:30 PM at Domaine Park. Everyone brings a savory or sweet dish to share. Don't forget your picnic blanket! Hugs, Clara.",
      "qEn": "What does Clara ask Emilie to bring to the picnic?",
      "optEn": [
        "Her picnic blanket and a dish to share",
        "A large bottle of fruit juice",
        "Folding chairs for the entire group",
        "A brand new volleyball"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce d'atelier créatif",
      "text": "CENTRE CULTUREL — ATELIER DE POTERIE ET CÉRAMIQUE : Initiez-vous au façonnage de la terre cuite chaque mercredi de 18h00 à 20h00. Matériel et cuisson des pièces inclus dans l'inscription. Tarif : 25 euros la séance. Réservation obligatoire avant lundi soir.",
      "q": "Quelle prestation est déjà comprise dans le tarif de l'atelier ?",
      "opt": [
        "Le transport en bus jusqu'au centre",
        "La fourniture du matériel et la cuisson des pièces",
        "Un livre illustré sur l'histoire de l'art",
        "Un diplôme d'artisan céramiste d'État"
      ],
      "ans": 1,
      "passEn": "CULTURAL CENTER — POTTERY AND CERAMICS WORKSHOP: Learn clay shaping every Wednesday from 6:00 PM to 8:00 PM. Materials and firing included in fee. Price: 25 euros per session. Booking required by Monday evening.",
      "qEn": "What service is already included in the workshop price?",
      "optEn": [
        "Bus transit to the cultural center",
        "Materials supply and piece firing",
        "An illustrated book on art history",
        "A state ceramic artisan diploma"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 7,
      "level": "A2",
      "docType": "Avis de santé vétérinaire",
      "text": "CLINIQUE VÉTÉRINAIRE — PRÉVENTION CANINE : Les fortes chaleurs estivales augmentent les risques de déshydratation chez les animaux. Pensez à renouveler l'eau fraîche de votre chien plusieurs fois par jour et évitez les promenades soutenues aux heures les plus chaudes (entre 12h00 et 16h00).",
      "q": "Quelle précaution horaire est recommandée pour les promenades ?",
      "opt": [
        "Se promener uniquement entre 12h00 et 16h00",
        "Faire courir son chien à minuit uniquement",
        "Éviter les sorties intenses entre 12h00 et 16h00",
        "Sortir toutes les heures sans interruption"
      ],
      "ans": 2,
      "passEn": "VETERINARY CLINIC — CANINE PREVENTION: Summer heatwaves increase dehydration risks in pets. Remember to refresh your dog's water bowl several times daily and avoid strenuous walks during peak heat hours (12:00 PM to 4:00 PM).",
      "qEn": "What timing precaution is recommended for dog walks?",
      "optEn": [
        "Walking exclusively between 12:00 PM and 4:00 PM",
        "Running with your dog at midnight exclusively",
        "Avoiding intense walks between 12:00 PM and 4:00 PM",
        "Walking outside every hour continuously"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 8,
      "level": "A2",
      "docType": "Petite annonce de troc",
      "text": "ÉCHANGE CITOYEN — PETITE ANNONCE : Échange vélo de ville pour adulte en très bon état (6 vitesses, panier avant et éclairage fonctionnel) contre une tondeuse à gazon manuelle ou électrique. Me contacter par SMS au 06 11 22 33 44 pour convenir d'un rendez-vous.",
      "q": "Contre quel objet le propriétaire souhaite-t-il échanger son vélo ?",
      "opt": [
        "Une perceuse électrique de chantier",
        "Une paire de skis de fond avec bâtons",
        "Un ordinateur portable d'occasion",
        "Une tondeuse à gazon manuelle ou électrique"
      ],
      "ans": 3,
      "passEn": "CITIZEN EXCHANGE — CLASSIFIED AD: Exchanging adult city bicycle in great condition (6 gears, front basket, working lights) for a manual or electric lawnmower. Contact me via text at 06 11 22 33 44 to arrange a trade.",
      "qEn": "For what item does the owner wish to trade their bicycle?",
      "optEn": [
        "A heavy-duty construction power drill",
        "A pair of cross-country skis with poles",
        "A pre-owned portable laptop computer",
        "A manual or electric lawnmower"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 9,
      "level": "A2",
      "docType": "Annonce d'exposition locale",
      "text": "GALERIE MUNICIPALE — EXPOSITION DE PHOTOGRAPHIE ANCIENNE : Venez découvrir 100 clichés inédits retraçant la vie de notre commune de 1900 à 1950 ! Entrée libre du mardi au dimanche de 14h00 à 18h00. Visites guidées gratuites le samedi à 15h00 sur inscription.",
      "q": "Quel créneau est réservé aux visites guidées gratuites ?",
      "opt": [
        "Le samedi après-midi à 15h00",
        "Le mardi matin à 10h00",
        "Le dimanche soir à 18h00",
        "Tous les jours à midi"
      ],
      "ans": 0,
      "passEn": "MUNICIPAL GALLERY — HISTORIC PHOTOGRAPHY EXHIBIT: Discover 100 unpublished photos showcasing our town's history from 1900 to 1950! Free admission Tuesday through Sunday 2:00 PM to 6:00 PM. Free guided tours Saturday at 3:00 PM upon booking.",
      "qEn": "What time slot is reserved for free guided tours?",
      "optEn": [
        "Saturday afternoon at 3:00 PM",
        "Tuesday morning at 10:00 AM",
        "Sunday evening at 6:00 PM",
        "Daily at 12:00 PM sharp"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 10,
      "level": "A2",
      "docType": "Note d'information de cantine",
      "text": "ÉDUCATION MUNICIPALE — RESTAURATION SCOLAIRE : À compter de la rentrée de novembre, un repas 100 % végétarien composé de produits locaux et biologiques sera servi chaque jeudi dans toutes les écoles primaires de la ville. Les menus mensuels sont consultables sur le portail familles.",
      "q": "Quelle nouveauté concerne les repas de la cantine scolaire ?",
      "opt": [
        "La fermeture de la cantine tous les jeudis",
        "La mise en place d'un menu végétarien le jeudi",
        "L'obligation pour les parents de cuisiner à l'école",
        "La hausse de 50 % des tarifs de restauration"
      ],
      "ans": 1,
      "passEn": "MUNICIPAL EDUCATION — SCHOOL CAFETERIA: Starting November term, a 100% vegetarian meal made from local organic produce will be served every Thursday across all city elementary schools. Monthly menus are viewable on the family portal.",
      "qEn": "What new policy applies to school cafeteria meals?",
      "optEn": [
        "Closing the cafeteria every Thursday",
        "Serving a vegetarian menu on Thursdays",
        "Mandating parents to cook at school",
        "A 50% price increase on school meals"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 11,
      "level": "A2",
      "docType": "Information de sécurité routière",
      "text": "POLICE MUNICIPALE — PRÉVENTION ROUTIÈRE EN VILLE : À l'approche de la période hivernale, vérifiez l'état et la pression de vos pneumatiques ainsi que l'efficacité du système de freinage. Le port du gilet réfléchissant est obligatoire en cas d'arrêt d'urgence sur le bas-côté.",
      "q": "Quel équipement de sécurité est obligatoire lors d'un arrêt d'urgence ?",
      "opt": [
        "Une couverture chauffante en laine",
        "Un triangle de signalisation luminescent blanc",
        "Un gilet de sécurité réfléchissant",
        "Une paire de gants de travail renforcés"
      ],
      "ans": 2,
      "passEn": "MUNICIPAL POLICE — ROAD SAFETY NOTICE: As winter approaches, inspect tire condition and pressure as well as brake responsiveness. Wearing a reflective safety vest is mandatory during roadside emergency stops.",
      "qEn": "What safety item is mandatory during emergency roadside stops?",
      "optEn": [
        "A wool warming blanket",
        "A luminescent white warning triangle",
        "A reflective safety vest",
        "A pair of reinforced work gloves"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 12,
      "level": "A2",
      "docType": "Avis de concert de quartier",
      "text": "ANIMATION DE LA CITÉ — CONCERT GRATUIT EN PLEIN AIR : L'harmonie municipale vous invite à son concert d'automne ce vendredi à 19h30 dans le parc de l'Hôtel de Ville. Au programme : musiques de films et grands classiques de la chanson française. En cas de pluie, repli dans la salle des fêtes.",
      "q": "Où le concert aura-t-il lieu en cas de mauvais temps ?",
      "opt": [
        "Sous les arbres du parc municipal",
        "Le concert sera purement annulé",
        "Dans le sous-sol de la bibliothèque",
        "Dans la salle des fêtes de la mairie"
      ],
      "ans": 3,
      "passEn": "CITY ANIMATION — FREE OUTDOOR CONCERT: The municipal band invites you to its autumn concert this Friday at 7:30 PM in City Hall park. Program: movie soundtracks and French classics. In case of rain, moved inside the main hall.",
      "qEn": "Where will the concert take place in case of bad weather?",
      "optEn": [
        "Under the trees in municipal park",
        "The concert will be canceled outright",
        "Inside the library basement area",
        "Inside City Hall's main event hall"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "INNOVATION RURALE — REVUE DES TERRITOIRES : LA RENAISSANCE DES ÉPICERIES ITINÉRANTES DANS LES VILLAGES ISOLÉS.\n\nFace au déclin des commerces de proximité dans les petites communes rurales, plusieurs jeunes entrepreneurs relancent avec succès le concept du camion-épicerie ambulant. Équipés de véhicules frigorifiques modernes, ces commerçants sillonnent quotidiennement les hameaux éloignés pour proposer des produits frais, du pain artisanal et des denrées de première nécessité.\n\nAu-delà de la simple vente de marchandises, ce service itinérant joue un rôle social crucial en recréant du lien humain et en maintenant l'autonomie des personnes âgées dépendantes privées de moyen de transport.",
      "q": "Quel rôle essentiel ce service d'épicerie ambulante remplit-il dans les zones rurales ?",
      "opt": [
        "Maintenir l'approvisionnement local et préserver le lien social des aînés",
        "Remplacer les banques traditionnelles par des distributeurs automatiques",
        "Obliger les habitants des villages à faire leurs courses par internet",
        "Distribuer gratuitement des carburants pour les véhicules agricoles"
      ],
      "ans": 0,
      "passEn": "RURAL INNOVATION — REGIONAL REVIEW: REVIVAL OF MOBILE GROCERY TRUCKS IN ISOLATED VILLAGES.\n\nAddressing retail decline in small rural hamlets, young entrepreneurs are successfully relaunching mobile grocery trucks. Outfitted with modern refrigerated vehicles, vendors travel daily to remote villages supplying fresh produce, bakery goods, and household staples.\n\nBeyond selling goods, this mobile service plays a vital social role by restoring human connection and supporting independence for elderly residents lacking cars.",
      "qEn": "What vital role does this mobile grocery service fulfill in rural areas?",
      "optEn": [
        "Maintaining local food supplies and social bonds for seniors",
        "Replacing local banks with automated cash machines",
        "Forcing village residents to shop exclusively online",
        "Distributing free fuel for agricultural machinery"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur le recyclage textile",
      "text": "ENVIRONNEMENT ET MODE — REVUE DU TEXTILE DURABLE : LA RECYCLERIE DE VÊTEMENTS ET LA LUTTE CONTRE LA FAST-FASHION.\n\nL'industrie de la mode jetable génère chaque année des millions de tonnes de déchets textiles envoyés à l'incinération. Pour enrayer ce gaspillage colossal, la municipalité soutient l'ouverture d'une grande recyclerie textile associative au cœur du centre-ville. Les citoyens peuvent y déposer leurs vêtements usagés qui seront triés, réparés puis revendus à prix solidaire.\n\nLes textiles trop détériorés pour être portés sont quant à eux transformés en isolants thermiques pour le bâtiment ou en chiffons d'essuyage industriel, s'inscrivant ainsi dans une démarche d'économie circulaire exemplaire.",
      "q": "Comment les textiles trop abîmés pour être portés sont-ils valorisés ?",
      "opt": [
        "Ils sont immédiatement brûlés dans les centrales thermiques",
        "Ils sont transformés en matériaux d'isolation et en chiffons industriels",
        "Ils sont réexpédiés gratuitement dans leurs pays de fabrication",
        "Ils sont stockés dans des décharges sous-marines sécurisées"
      ],
      "ans": 1,
      "passEn": "ENVIRONMENT AND FASHION — SUSTAINABLE TEXTILE REVIEW: CLOTHING RECYCLING CENTERS COMBATING FAST FASHION.\n\nFast fashion generates millions of tons of textile waste sent to incinerators annually. Countering this waste, the city supports opening a non-profit clothing recycling center downtown. Citizens drop off used clothes to be sorted, repaired, and resold at accessible prices.\n\nTextiles too worn to be worn are repurposed into building insulation materials or industrial wiping rags, embodying circular economy principles.",
      "qEn": "How are textiles too damaged for wear repurposed?",
      "optEn": [
        "Burned immediately in municipal thermal power plants",
        "Repurposed into insulation materials and industrial rags",
        "Shipped back free to their manufacturing origin countries",
        "Stored in secured underwater landfill storage sites"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur le covoiturage",
      "text": "TRANSPORTS ET MOBILITÉ — BULLETIN DU DÉPLACEMENT DURABLE : LE COVOITURAGE DOMICILE-TRAVAIL EN ZONE PÉRIURBAINE.\n\nPour réduire les embouteillages aux entrées des métropoles et alléger le budget carburant des ménages, la communauté d'agglomération vient d'inaugurer dix parkings de covoiturage connectés aux axes routiers majeurs. Une application mobile dédiée permet d'associer automatiquement les conducteurs et les passagers effectuant des trajets quotidiens similaires.\n\nAfin d'encourager la pratique, les conducteurs transportant au moins deux passagers bénéficient d'une prime financière mensuelle versée par la collectivité et de l'accès à une voie réservée aux heures de pointe.",
      "q": "Incitation financière et routière mise en place pour les conducteurs covoitureurs :",
      "opt": [
        "Le remboursement intégral du prix d'achat du véhicule neuf",
        "La gratuité de l'assurance automobile pendant cinq ans",
        "Une prime mensuelle et l'accès à une voie de circulation réservée",
        "L'interdiction de circuler pour les véhicules sans passagers"
      ],
      "ans": 2,
      "passEn": "TRANSIT AND MOBILITY — SUSTAINABLE COMMUTING BULLETIN: PERI-URBAN CARPOOLING FOR WORKERS.\n\nTo curb metro entry traffic jams and lower household fuel spending, the regional authority opened ten carpool parking lots along major highways. A dedicated mobile app matches drivers and passengers sharing daily commuting routes.\n\nEncouraging participation, drivers carrying at least two passengers receive a monthly municipal cash bonus and access to a dedicated rush-hour lane.",
      "qEn": "Financial and transit incentive created for carpooling drivers:",
      "optEn": [
        "Full reimbursement of the vehicle purchase price",
        "Free auto insurance coverage for five consecutive years",
        "Monthly bonus and access to a dedicated transit lane",
        "Banning single-occupant vehicles from driving entirely"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur l'autonomie énergétique",
      "text": "ÉNERGIE ET SOCIÉTÉ — REVUE DE LA TRANSITION ÉCOLOGIQUE : LES COMMUNAUTÉS ÉNERGÉTIQUES CITOYENNES.\n\nDes collectifs de riverains se regroupent de plus en plus en coopératives citoyennes pour financer et installer des panneaux photovoltaïques sur les toits des bâtiments publics et des écoles de leur commune. L'électricité renouvelable ainsi produite est prioritairement consommée par les bâtiments du quartier, l'excédent étant revendu au réseau national.\n\nCette réappropriation citoyenne de la production d'énergie favorise la sobriété énergétique tout en garantissant des retombées financières réinvesties dans des projets écologiques locaux.",
      "q": "Destination prioritaire de l'électricité produite par ces coopératives :",
      "opt": [
        "Alimenter les centres de données informatiques des géants du web",
        "Alimenter uniquement les bornes de recharge des voitures de luxe",
        "Exporter l'intégralité de la production vers les pays voisins",
        "Couvrir en priorité les besoins énergétiques des bâtiments du quartier"
      ],
      "ans": 3,
      "passEn": "ENERGY AND SOCIETY — ECOLOGICAL TRANSITION REVIEW: CITIZEN ENERGY COOPERATIVES.\n\nResident collectives are forming citizen cooperatives to fund and install solar panels on municipal roofs and school buildings. Renewable electricity generated is consumed primarily by local neighborhood buildings, with surplus sold to national grids.\n\nThis citizen-led energy production fosters energy restraint while ensuring financial returns are reinvested into local green projects.",
      "qEn": "Primary destination for electricity produced by these citizen cooperatives:",
      "optEn": [
        "Powering data centers for global internet corporations",
        "Powering charging stations for luxury sports cars exclusively",
        "Exporting all electricity output to neighboring countries",
        "Meeting energy needs of local neighborhood buildings first"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur la biodiversité urbaine",
      "text": "NATURE EN VILLE — REVUE D'ÉCOLOGIE URBAINE : LA PROTECTION DES INSECTES POLLINISATEURS PAR LE FAUCHAGE RAISONNÉ.\n\nAfin de préserver la faune sauvage et de favoriser la biodiversité végétale, la direction des espaces verts municipaux a adopté le principe du 'fauchage raisonné' dans l'ensemble des parcs et dépendances vertes. Cette technique consiste à réduire la fréquence de tonte des pelouses et à laisser des prairies fleuries s'épanouir naturellement durant la période estivale.\n\nCes espaces de nature sauvage servent d'abris précieux et de sources de nourriture pour les abeilles, papillons et oiseaux, tout en réduisant la consommation de carburant des tondeuses municipales.",
      "q": "Changement de pratique adopté par la ville pour protéger les insectes :",
      "opt": [
        "Réduire la fréquence de tonte des pelouses pour laisser pousser les prairies",
        "Planter uniquement des arbres synthétiques dans les jardins",
        "Utiliser des engrais chimiques puissants sur toutes les pelouses",
        "Interdire l'accès des parcs publics aux citoyens durant l'été"
      ],
      "ans": 0,
      "passEn": "URBAN NATURE — URBAN ECOLOGY REVIEW: PROTECTING POLLINATORS THROUGH REDUCED MOWING.\n\nTo protect wildlife and plant biodiversity, city parks departments adopted 'reduced mowing' practices across green spaces. This technique decreases lawn mowing frequency, allowing wildflower meadows to flourish during summer.\n\nThese natural spaces offer shelters and food for bees, butterflies, and birds while reducing municipal lawnmower fuel consumption.",
      "qEn": "Practice change adopted by the city to protect pollinating insects:",
      "optEn": [
        "Reducing lawn mowing frequency to allow wildflower meadows",
        "Planting synthetic plastic trees across public gardens",
        "Applying heavy chemical synthetic fertilizers on all lawns",
        "Closing public parks to citizens throughout the summer"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur l'éducation à l'environnement",
      "text": "ÉDUCATION ET NATURE — CAHIERS PÉDAGOGIQUES : L'ÉCOLE EN DEHORS DES MURS ET L'APPRENTISSAGE PAR LA NATURE.\n\nInspirée des pédagogies scandinaves, l'initiative de 'l'école dans la forêt' se développe dans de nombreux établissements scolaires. Une fois par semaine, des classes d'école maternelle et élémentaire passent une journée entière en extérieur, dans un parc ou un bois voisin, quelle que soit la météo.\n\nLes enseignants observent que ce contact direct avec le milieu naturel améliore la concentration, stimule la coopération entre les enfants et développe une prise de conscience concrète du respect de l'environnement dès le plus jeune âge.",
      "q": "Bénéfice pédagogique observé chez les enfants pratiquant l'école en forêt :",
      "opt": [
        "L'abandon complet de l'apprentissage de la lecture et de l'écriture",
        "Une hausse de la capacité de concentration et de la coopération entre élèves",
        "L'obligation pour les enfants de construire leur propre cabane pour dormir",
        "Une baisse des capacités physiques et de l'endurance à la marche"
      ],
      "ans": 1,
      "passEn": "EDUCATION AND NATURE — PEDAGOGICAL PAPERS: OUTDOOR FOREST SCHOOL LEARNING.\n\nInspired by Scandinavian education, 'forest school' programs are expanding across elementary schools. Once weekly, kindergarten and primary classes spend a full day outdoors in nearby woods regardless of weather.\n\nTeachers note that direct contact with nature enhances concentration, fosters student cooperation, and builds early environmental awareness.",
      "qEn": "Pedagogical benefit observed among children participating in forest school:",
      "optEn": [
        "Complete abandonment of reading and writing instruction",
        "Enhanced concentration skills and peer cooperation",
        "Requirement for children to build overnight shelters",
        "Decline in physical agility and walking endurance"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur le patrimoine artisanal",
      "text": "ARTISANAT ET TRADITION — REVUE DU PATRIMOINE RÉGIONAL : LA TRANSMISSION DE LA MÉTALLURGIE D'ART.\n\nLes derniers ateliers de ferronnerie d'art et de métallurgie traditionnelle font face à un défi de succession sans précédent. Alors que la demande pour des éléments architecturaux sur mesure (portails ouvragés, rampes d'escalier historiques) reste forte, les maîtres artisans peinent à recruter des jeunes motivés par l'apprentissage manuel de précision.\n\nPour préserver ce savoir-faire seculaire, une fondation régionale crée des bourses d'études et des stages d'immersion afin d'encourager les vocations d'artisans d'art.",
      "q": "Action entreprise par la fondation régionale pour préserver la ferronnerie d'art :",
      "opt": [
        "Importer des portails industriels fabriqués en série à l'étranger",
        "Fermer définitivement les ateliers de forge traditionnels",
        "Créer des bourses d'études et des stages pour susciter des vocations",
        "Remplacer l'usage du métal par du plastique recyclé"
      ],
      "ans": 2,
      "passEn": "CRAFTS AND TRADITION — REGIONAL HERITAGE REVIEW: PRESERVING ARTISTIC METALWORKING.\n\nTraditional ornamental ironwork studios face unprecedented succession challenges. While demand for custom architectural ironwork (detailed gates, historic railings) remains strong, master artisans struggle to recruit apprentices drawn to precision manual crafts.\n\nPreserving centuries-old techniques, a regional foundation established scholarships and immersion internships to encourage young craft vocations.",
      "qEn": "Action taken by the regional foundation to preserve artistic ironwork:",
      "optEn": [
        "Importing mass-produced industrial gates from abroad",
        "Permanently closing traditional blacksmith forge studios",
        "Creating scholarships and internships to foster craft vocations",
        "Replacing metal usage with recycled plastic composites"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur l'urbanisme citoyen",
      "text": "CITOYENNETÉ ET VILLE — REVUE D'AMÉNAGEMENT URBAIN : LES BUDGETS PARTICIPATIFS MUNICIPAUX.\n\nChaque année, la municipalité réserve 5 % de son budget d'investissement à des projets directement proposés et votés par les habitants. Du fleurissement des ruelles à l'installation d'aires de jeux accessibles aux enfants handicapés, cette démarche permet aux citoyens de devenir acteurs de l'embellissement de leur quartier.\n\nCe dispositif renforce le sentiment d'appartenance communautaire et permet de concrétiser des aménagements de proximité répondant aux besoins réels formulés par la population.",
      "q": "Principe de fonctionnement du budget participatif municipal :",
      "opt": [
        "Les habitants financent la mairie en payant une taxe supplémentaire",
        "Les entreprises privées choisissent les projets urbains réalisés",
        "La mairie décide seule de tous les investissements sans consultation",
        "Les citoyens proposent et votent des projets financés par la ville"
      ],
      "ans": 3,
      "passEn": "CITIZENSHIP AND CITY — URBAN PLANNING REVIEW: MUNICIPAL PARTICIPATORY BUDGETS.\n\nEach year, the city council allocates 5% of capital budgets to projects proposed and voted directly by residents. From street greening to accessible playgrounds for disabled children, this process enables citizens to actively shape neighborhood improvements.\n\nThis system strengthens community belonging and delivers local amenities addressing real needs expressed by residents.",
      "qEn": "Operating principle of the municipal participatory budget:",
      "optEn": [
        "Residents fund city hall by paying additional taxes",
        "Private corporations select which urban projects get built",
        "City hall decides all capital investments without input",
        "Citizens propose and vote on projects funded by the city"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur la santé au travail",
      "text": "SANTÉ AU TRAVAIL — BULLETIN D'ERGONOMIE : LA PRÉVENTION DES TROUBLES MUSCULOSQUELETTIQUES (TMS).\n\nLes troubles musculosquelettiques constituent la première cause d'arrêt de travail dans les métiers de la bureautique et de la manutention. L'adoption de postures prolongées inadéquates ou la répétition de gestes pénibles provoque des douleurs chroniques aux cervicales et au dos.\n\nPour prévenir ces pathologies, les ergonomes préconisent le réglage personnalisé des postes de travail (hauteur d'écran, sièges réglables) et l'instauration de courtes pauses actives de trois minutes toutes les heures pour effectuer des étirements légers.",
      "q": "Mesure de prévention préconisée par les ergonomes contre les maux de dos :",
      "opt": [
        "Ajuster l'ergonomie du poste et effectuer de courtes pauses actives",
        "Travailler debout sans jamais s'asseoir durant toute la journée",
        "Prendre des médicaments anti-douleurs avant chaque journée de travail",
        "Supprimer définitivement l'usage des écrans et des ordinateurs"
      ],
      "ans": 0,
      "passEn": "OCCUPATIONAL HEALTH — ERGONOMICS BULLETIN: PREVENTING MUSCULOSKELETAL DISORDERS (MSDS).\n\nMusculoskeletal disorders represent the leading cause of sick leave in office and handling roles. Prolonged poor posture or repetitive tasks induce chronic neck and back pain.\n\nPreventing these pathologies, ergonomists recommend customized workstation setups (screen height, adjustable seating) alongside short active three-minute stretching breaks every hour.",
      "qEn": "Prevention measure recommended by ergonomists against back pain:",
      "optEn": [
        "Adjusting workstation setup and taking short active breaks",
        "Working standing up without ever sitting down all day",
        "Taking painkilling medication before every workday begins",
        "Permanently banning all computer screen usage in offices"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur la culture de proximité",
      "text": "CULTURE POUR TOUS — BULLETIN DES INITIATIVES CULTURELLES : LES BIBLIOTHÈQUES DE RUE EN LIBRE ACCÈS.\n\nLes 'boîtes à livres' artisanales installées dans les parcs et sur les places publiques rencontrent un succès populaire ininterrompu. Basées sur le principe du don et du partage gratuit, ces petites cabanes en bois permettent à chacun d'y déposer un livre déjà lu ou d'en emprunter un librement sans inscription ni contrainte horaire.\n\nCette initiative conviviale favorise le goût de la lecture chez les enfants et permet la circulation d'ouvrages variés au cœur des quartiers.",
      "q": "Principe d'utilisation des boîtes à livres de rue :",
      "opt": [
        "Acheter des livres neufs en payant par carte bancaire",
        "Déposer ou emprunter gratuitement des livres en libre accès",
        "Réserver ses lectures à l'avance sur une application payante",
        "Rendre obligatoirement les livres sous 48 heures au commissariat"
      ],
      "ans": 1,
      "passEn": "CULTURE FOR ALL — CULTURAL INITIATIVES BULLETIN: FREE OPEN-ACCESS STREET LIBRARIES.\n\nHandcrafted 'book nooks' installed in public parks and squares enjoy continuous community popularity. Based on free sharing, these small wooden boxes allow anyone to leave a read book or borrow one freely without registration or time limits.\n\nThis friendly initiative fosters reading habits among children and circulates diverse books throughout neighborhood streets.",
      "qEn": "Usage principle for street book sharing boxes:",
      "optEn": [
        "Buying brand new books by paying with credit cards",
        "Dropping off or borrowing books freely without registration",
        "Reserving reading titles ahead on a paid mobile app",
        "Mandatory book returns within 48 hours to police stations"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la gestion urbaine",
      "text": "MUTATIONS URBAINES — REVUE DE SOCIOLOGIE LOCALE : LES DÉFIS DE LACOHABITATION DANS LES NOUVEAUX ÉCOQUARTIER.\n\nLa création d'écoquartiers modèles combinant logements haute performance énergétique, espaces verts et mobilité douce est régulièrement saluée comme le symbole de la transition écologique réussie. Toutefois, les enquêtes sociologiques de terrain révèlent des tensions sous-jacentes d'appropriation de l'espace public. Les règles de vie collective relatives au tri sélectif, au bruit et à la gestion des espaces communs partagés font parfois l'objet d'incompréhensions entre nouveaux résidents et habitants historiques.\n\nFaute d'un accompagnement médiateur régulier, la rigueur écologique imposée peut produire un sentiment d'exclusion chez les ménages les moins accoutumés aux normes écoresponsables strictes.",
      "q": "Difficulté identifiée par l'étude au sein des nouveaux écoquartiers :",
      "opt": [
        "L'absence complète d'isolation thermique dans les nouveaux logements",
        "L'interdiction absolue pour les enfants de jouer dans les espaces verts",
        "Des tensions d'usage et des divergences sur les règles collectives",
        "La hausse des coûts de chauffage due à la mauvaise qualité du bois"
      ],
      "ans": 2,
      "passEn": "URBAN MUTATIONS — LOCAL SOCIOLOGY REVIEW: COHABITATION CHALLENGES IN NEW ECO-NEIGHBORHOODS.\n\nDesigning model eco-districts featuring energy-efficient housing, parks, and gentle transit is praised as successful green transition. However, sociological field studies reveal underlying spatial tensions. Shared rules regarding sorting, noise, and common space management sometimes trigger friction between newcomers and long-time residents.\n\nWithout ongoing community mediation, strict ecological guidelines can create feelings of exclusion among households less accustomed to green norms.",
      "qEn": "Challenge identified by the study inside new eco-districts:",
      "optEn": [
        "Complete lack of thermal insulation in newly built apartments",
        "Absolute prohibitions preventing children from playing in parks",
        "Usage friction and disagreements regarding shared collective rules",
        "Increased heating costs caused by low-quality timber building materials"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur la transition industrielle",
      "text": "ÉCONOMIE INDUSTRIELLE — REVUE DE LA TRANSITION PRODUCTIVE : LA RECONVERSION DES FILIÈRES DE L'AUTOMOBILE.\n\nLa transition forcée de l'industrie automobile du moteur thermique vers le moteur 100 % électrique bouleverse profondément le tissu industriel des régions spécialisées dans la sous-traitance mécanique. La fabrication d'un moteur électrique nécessitant nettement moins de pièces complexes qu'un moteur thermique, des milliers d'emplois d'usinage et de fonderie se trouvent directement menacés.\n\nPour éviter une crise sociale majeure, les pouvoirs publics et les industriels doivent financer des programmes de reconversion massive des salariés vers les filières d'avenir comme la fabrication de batteries et le recyclage des métaux rares.",
      "q": "Conséquence industrielle directe du passage au véhicule électrique :",
      "opt": [
        "L'augmentation du nombre de pièces mécaniques à fabriquer dans les usines",
        "La fermeture définitive de l'intégralité des routes et autoroutes",
        "L'obligation de construire des voitures fonctionnant au charbon de bois",
        "La menace d'obsolescence pesant sur les emplois de la sous-traitance thermique"
      ],
      "ans": 3,
      "passEn": "INDUSTRIAL ECONOMICS — MANUFACTURING TRANSITION REVIEW: RECONVERTING AUTOMOTIVE SUPPLY CHAINS.\n\nThe forced automotive transition from internal combustion engines to electric vehicles deeply disrupts industrial regions specialized in mechanical subcontracting. Manufacturing electric motors requires significantly fewer complex parts, directly threatening thousands of machining and foundry jobs.\n\nAverting severe labor crises, public authorities and manufacturers must fund massive worker retraining programs toward emerging sectors like battery manufacturing and rare metal recycling.",
      "qEn": "Direct industrial consequence of transitioning to electric vehicles:",
      "optEn": [
        "Surge in the number of complex mechanical engine parts manufactured",
        "Permanent closure of all national highways and interstate road systems",
        "Mandatory requirements to build passenger cars running on charcoal",
        "Obsolescence threats weighing on combustion engine subcontracting jobs"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la préservation du patrimoine marin",
      "text": "OCÉANOGRAPHIE — BULLETIN DE LA CONSERVATION MARINE : L'IMPACT DU BRUIT ANTHROPIQUE SUR LES MAMMIFÈRES MARINS.\n\nL'augmentation constante du trafic maritime commercial et l'usage de sonars industriels génèrent une pollution sonore sous-marine d'une intensité inédite. Ce brouhaha acoustique permanent perturbe gravement les facultés d'écholocalisation des baleines, dauphins et cachalots, indispensables pour s'orienter, chasser et communiquer entre eux.\n\nFace à cette dégradation de l'habitat marin, des scientifiques préconisent la création de zones maritimes protégées où la vitesse des navires marchands est obligatoirement réduite pour abaisser le niveau des nuisances sonores sous-marines.",
      "q": "Mesure préconisée par les scientifiques pour protéger les mammifères marins :",
      "opt": [
        "Réduire la vitesse des navires dans les zones maritimes sensibles",
        "Interdire la pêche continentale dans toutes les rivières et lacs",
        "Installer des haut-parleurs sous-marins pour diffuser de la musique",
        "Capturer les baleines pour les placer dans des bassins artificiels"
      ],
      "ans": 0,
      "passEn": "OCEANOGRAPHY — MARINE CONSERVATION BULLETIN: ANTHROPOGENIC NOISE IMPACT ON MARINE MAMMALS.\n\nGrowing commercial shipping traffic and industrial sonar usage create unprecedented underwater noise pollution. This constant acoustic disturbance severely disrupts echolocation in whales, dolphins, and porpoises, essential for navigation, hunting, and communication.\n\nMitigating marine habitat degradation, scientists advocate creating protected marine sanctuaries where commercial ship speeds are reduced to lower underwater noise levels.",
      "qEn": "Measure recommended by scientists to protect marine mammals:",
      "optEn": [
        "Reducing commercial vessel speeds in sensitive marine sanctuaries",
        "Banning inland freshwater fishing across all rivers and lakes",
        "Installing underwater loudspeakers to broadcast classical music",
        "Capturing wild whales to place them inside artificial aquariums"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur l'éducation et le numérique",
      "text": "PEDAGOGIE CONTEMPORAINE — CAHIERS DE L'ÉDUCATION : LES EFFETS DUNUMÉRIQUE SUR LES CAPACITÉS DE LECTURE.\n\nL'intégration massive des tablettes et des manuels numériques dans les établissements d'enseignement secondaire fait l'objet d'évaluations contrastées chez les chercheurs en sciences de l'éducation. Si la numérisation facilite l'accès à une documentation riche et interactive, des tests comparatifs révèlent une baisse de la compréhension fine des textes longs lus sur écran par rapport au support papier.\n\nLa lecture numérique a tendance à favoriser un survol rapide au détriment de l'analyse synthétique approfondie. Les experts recommandent de maintenir une pratique régulière de la lecture sur livre imprimé pour consolider les facultés de réflexion critique.",
      "q": "Constat établi par les chercheurs concernant la lecture sur écran :",
      "opt": [
        "Elle augmente la capacité de mémorisation des détails textuels complexes",
        "Elle favorise une lecture de survol rapide au détriment de l'analyse fine",
        "Elle rend les étudiants totalement incapables de s'exprimer à l'oral",
        "Elle élimine le besoin d'apprendre la grammaire et l'orthographe"
      ],
      "ans": 1,
      "passEn": "CONTEMPORARY PEDAGOGY — EDUCATION PAPERS: DIGITAL SCREEN EFFECTS ON READING SKILLS.\n\nIntegrating tablets and digital textbooks across secondary schools yields mixed evaluations among education researchers. While digital tools facilitate access to rich interactive media, comparative tests reveal lower comprehension of long texts read on screens versus print.\n\nDigital reading promotes rapid scanning over deep synthetic analysis. Experts recommend maintaining regular print book reading to solidify critical thinking skills.",
      "qEn": "Finding established by researchers regarding reading on digital screens:",
      "optEn": [
        "Increases long-term recall capacity for complex textual details",
        "Promotes rapid scanning over deep synthetic textual analysis",
        "Renders students completely incapable of speaking orally in class",
        "Eliminates requirements to learn grammar and spelling rules"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la souveraineté alimentaire",
      "text": "AGRICULTURE ET GEOPOLITIQUE — REVUE DE LA SOUVERAINETÉ ALIMENTAIRE : LA DÉPENDANCE AUX ENGRAIS SYNTHÉTIQUES IMPORTEES.\n\nLa fragilité des chaînes d'approvisionnement mondiales remet en lumière la vulnérabilité des systèmes agricoles dépendants d'engrais chimiques synthétiques importés. La hausse brutale du coût des engrais azotés et potassiques pèse lourdement sur la rentabilité des exploitations agricoles et répercute la hausse des prix sur les consommateurs.\n\nPour renforcer l'autonomie alimentaire du territoire, agronomes et économistes plaident pour un virage vers l'agroécologie, axé sur la valorisation des engrais organiques locaux et l'allongement des rotations de cultures enrichissantes pour les sols.",
      "q": "Stratégie recommandée par les agronomes pour renforcer la souveraineté agricole :",
      "opt": [
        "Multiplier par dix les importations d'engrais chimiques synthétiques",
        "Remplacer toutes les cultures vivrières par des plantations de fleurs",
        "Développer l'agroécologie et l'usage d'engrais organiques locaux",
        "Interdire aux agriculteurs d'utiliser des tracteurs mécanisés"
      ],
      "ans": 2,
      "passEn": "AGRICULTURE AND GEOPOLITICS — FOOD SOVEREIGNTY REVIEW: DEPENDENCY ON IMPORTED SYNTHETIC FERTILIZERS.\n\nGlobal supply chain fragility highlights farm system vulnerabilities dependent on imported synthetic fertilizers. Spiking nitrogen and potash fertilizer costs burden farm profitability and drive up consumer grocery prices.\n\nStrengthening regional food autonomy, agronomists and economists advocate transitioning toward agroecology, emphasizing local organic fertilizers and soil-enriching crop rotations.",
      "qEn": "Strategy recommended by agronomists to strengthen agricultural sovereignty:",
      "optEn": [
        "Tenfold increase in synthetic chemical fertilizer imports",
        "Replacing food crop production entirely with ornamental flowers",
        "Developing agroecology and expanding local organic fertilizer usage",
        "Prohibiting farmers from operating mechanized agricultural tractors"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la santé publique",
      "text": "SANTÉ ET ENVIRONNEMENT — BULLETIN ÉPIDÉMIOLOGIQUE : LES RISQUES LIÉS À LA POLLUTION PAR LES MICROPLASTIQUES.\n\nLa dégradation continue des déchets plastiques abandonnés dans l'environnement génère une contamination omniprésente par les microplastiques. Désormais détectés dans l'eau potable, la nourriture et l'air ambient, ces fragments microscopiques s'accumulent dans l'organisme humain avec des effets reprotoxiques et perturbateurs endocriniens très préoccupants.\n\nFace à cette menace sanitaire diffuse, les autorités médicales appellent à une réglementation internationale stricte visant la réduction drastique de la production de plastiques vierges et le bannissement complet des plastiques jetables inutiles.",
      "q": "Action sanitaire urgente réclamée par les autorités médicales :",
      "opt": [
        "Augmenter la fabrication de bouteilles plastiques à usage unique",
        "Fermer les usines de traitement et de filtration de l'eau potable",
        "Obliger les citoyens à boire exclusivement de l'eau gazeuse en boîte",
        "Réduire drastiquement la production de plastiques et interdire le jetable"
      ],
      "ans": 3,
      "passEn": "HEALTH AND ENVIRONMENT — EPIDEMIOLOGICAL BULLETIN: MICROPLASTIC POLLUTION RISKS.\n\nContinuous breakdown of environmental plastic waste causes pervasive microplastic contamination. Now detected in drinking water, food, and ambient air, these microscopic particles accumulate in human tissues, raising endocrine disruption concerns.\n\nAddressing this health threat, medical authorities urge strict international regulations to drastically cut virgin plastic manufacturing and ban unnecessary single-use plastics.",
      "qEn": "Urgent health action demanded by medical authorities:",
      "optEn": [
        "Increasing single-use disposable plastic bottle manufacturing",
        "Closing municipal drinking water filtration and treatment plants",
        "Mandating citizens to drink carbonated canned water exclusively",
        "Drastically cutting plastic production and banning disposable items"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la politique de la ville",
      "text": "SOCIOLOGIE DU LOGEMENT — CAHIERS DE LA DYNAMIQUE URBAINE : LES ENJEUX DU RELOGEMENT DANS LES OPÉRATIONS DE RRENOUVELLEMENT URBAIN.\n\nLes grands programmes de démolition-reconstruction des barres de logements sociaux dégradées visent officiellement à casser la concentration de la pauvreté et à favoriser la mixité sociale. Cependant, les retours d'expérience montrent que les opérations de relogement provisoire déstructurent profondément le tissu de solidarité de voisinage élaboré depuis des décennies par les habitants.\n\nSi les nouveaux logements offrent un confort matériel indiscutablement supérieur, le sentiment d'éloignement géographique et la perte des repères communautaires génèrent une souffrance sociale réelle chez les ménages déplacés.",
      "q": "Effet pervers des opérations de relogement souligné par le rapport :",
      "opt": [
        "La déstructuration des réseaux de solidarité et la perte de repères",
        "La baisse immédiate du niveau de confort matériel des appartements neufs",
        "L'obligation de payer un loyer dix fois supérieur dans les nouveaux immeubles",
        "L'interdiction pour les familles relogées d'inscrire leurs enfants à l'école"
      ],
      "ans": 0,
      "passEn": "HOUSING SOCIOLOGY — URBAN DYNAMICS PAPERS: REHOUSING CHALLENGES IN URBAN RENEWAL PROJECTS.\n\nDemolishing aging public housing blocks aims to break poverty concentration and foster social mixing. However, field studies reveal that temporary rehousing efforts disrupt long-established neighborhood solidarity networks.\n\nWhile new apartments offer superior physical comfort, geographic displacement and loss of community anchors create genuine social suffering among relocated families.",
      "qEn": "Unintended consequence of rehousing projects highlighted in the report:",
      "optEn": [
        "Disruption of neighborhood solidarity networks and loss of community anchors",
        "Immediate drop in physical living comfort in newly built apartments",
        "Requirements to pay ten times higher rent in newly assigned units",
        "Prohibiting relocated families from enrolling children in local schools"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial socio-économique",
      "text": "CRITIQUE ÉCONOMIQUE — TRIBUNE DE SOCIOLOGIE DU TRAVAIL : LA MARCHANDISATION DU SOIN ET LA DÉVALORISATION DES MÉTIERS DU CARE.\n\nLa pénétration des logiques de rentabilité financière et de rationalisation comptable au sein des institutions de santé et du secteur du soin aux personnes âgées produit une dégradation alarmante de la qualité de la prise en charge. En appliquant des métriques d'efficience industrielle à des activités fondées sur l'empathie, l'écoute et le temps humain — comme la limitation chronométrée de la durée des soins ou la réduction des effectifs soignants —, les directions de gestion ravalent le soin à une prestation marchande interchangeable.\n\nCette marchandisation du 'care' génère une crise de sens profonde chez les professionnels de santé, confrontés à une souffrance éthique aiguë lorsqu'ils ne peuvent plus accomplir leur mission avec la dignité requise. Revaloriser les métiers du soin exige d'extraire la relation d'aide de la dictature du rendement financier pour lui restituer sa valeur humaine fondamentale.",
      "q": "Quelle critique majeure l'auteur formule-t-il contre l'application du modèle marchand au secteur du soin ?",
      "opt": [
        "Il provoque une hausse excessive des salaires des aides-soignants et des infirmiers",
        "Il dégrade la qualité humaine des soins en soumettant l'empathie à des métriques financières",
        "Il interdit l'utilisation des technologies médicales modernes dans les hôpitaux",
        "Il oblige les familles à prendre en charge gratuitement l'ensemble des soins médicaux"
      ],
      "ans": 1,
      "passEn": "ECONOMIC CRITIQUE — LABOR SOCIOLOGY ESSAY: COMMODIFICATION AND DEVALUATION OF CARE WORK.\n\nApplying financial profitability and accounting metrics to healthcare and eldercare produces alarming drops in care quality. Enforcing industrial efficiency metrics on empathy-driven work—such as timing patient care visits or cutting nursing staff—reduces care to interchangeable market commodities.\n\nCare commercialization breeds profound ethical distress among healthcare workers unable to perform duties with dignity. Revaluing care professions requires liberating human care relationships from financial yield pressures.",
      "qEn": "What major critique does the author level against applying commercial market models to healthcare?",
      "optEn": [
        "Causes excessive salary increases for nursing assistants and nurses",
        "Degrades care quality by subjecting human empathy to financial metrics",
        "Bans the usage of modern medical technology inside public hospitals",
        "Requires families to take over full medical care duties at home for free"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai de sociologie politique",
      "text": "DÉBAT DÉMOCRATIQUE — REVUE DE SCIENCE POLITIQUE : LE RECUL DE LA THÉMATIQUE SOCIALE DANS LE DISCOURS MÉDIATIQUE.\n\nL'analyse du discours politique contemporain révèle un effacement progressif de la critique des inégalités socio-économiques au profit de controverses identitaires et sécuritaires omniprésentes dans l'espace public. Dans un paysage médiatique dominé par la recherche du choc émotionnel immédiat, du sensationnalisme et de la polarisation partisane, les questions fondamentales touchant au partage des richesses, aux conditions de travail et à l'accès universel aux services publics se trouvent reléguées au second plan du débat républicain.\n\nCette focalisation sur des affrontements culturels secondaires opère une véritable dépolitisation des enjeux majeurs de justice sociale. En détournant l'attention des citoyens des mécanismes structurels de domination économique, le système médiatique dominant contribue à maintenir le statu quo socio-économique tout en avivant les tensions communautaires de manière artificielle. Réhabiliter le débat démocratique exige de replacer les questions sociales au cœur de l'information publique.",
      "q": "Selon l'analyse, quel est l'impact de la surreprésentation des controverses identitaires dans les médias ?",
      "opt": [
        "Une amélioration rapide de la répartition des richesses entre toutes les classes",
        "L'obligation d'organiser des référendums populaires chaque mois",
        "Le détournement de l'attention publique des inégalités socio-économiques structurelles",
        "La disparition définitive de toute forme de tension culturelle dans le pays"
      ],
      "ans": 2,
      "passEn": "DEMOCRATIC DEBATE — POLITICAL SCIENCE REVIEW: DECLINE OF SOCIAL ISSUES IN MEDIA DISCOURSE.\n\nAnalyzing political discourse reveals the displacement of socio-economic inequality critiques by pervasive identity and security controversies. In media landscapes driven by emotional outrage and partisan polarization, core issues regarding wealth distribution, labor rights, and public services are sidelined.\n\nThis focus on cultural clashes depoliticizes social justice issues. By diverting public attention away from structural economic domination, dominant media preserves socio-economic status quos while inflaming community tensions. Rebuilding public debate requires centering social questions in news.",
      "qEn": "According to the analysis, what is the impact of media overrepresentation of identity controversies?",
      "optEn": [
        "Rapid improvements in wealth distribution across all social classes",
        "Mandating monthly public referendums on economic policy",
        "Diverting public attention away from structural socio-economic inequalities",
        "Permanent elimination of all cultural tensions across society"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse d'histoire et d'esthétique",
      "text": "ESTHÉTIQUE INDUSTRIELLE — CAHIERS DU DESIGN CONTEMPORAIN : LE DESIGN JETABLE ET L'ÉROSION DE LA CULTURE DU BEAU DURABLE.\n\nL'émergence du design d'équipement à bas coût et la production industrielle en série d'objets destinés à un remplacement rapide ont profondément altéré le statut esthétique et fonctionnel des objets quotidiens. Autrefois conçus pour traverser les générations grâce à des matériaux nobles et des assemblages traditionnels réparables, les biens d'équipement contemporains sont désormais façonnés selon des impératifs d'obsolescence esthétique programmée et de renouvellement frénétique.\n\nCette dévalorisation de la durabilité matérielle appauvrit la relation affective et culturelle entre l'usager et son environnement quotidien. En habituant la société à considérer l'objet comme un consommable éphémère jetable, le modèle industriel marchand érode la culture du beau durable et favorise une surconsommation destructrice des ressources naturelles de la planète. Redonner de la valeur à l'objet exige de réhabiliter la réparabilité et le soin artisanal.",
      "q": "Quelle transformation statutaire des objets quotidiens l'auteur dénonce-t-il ?",
      "opt": [
        "Leur coût d'acquisition devenu inaccessible pour la majorité des ménages",
        "La hausse de la qualité de fabrication due à l'utilisation de matériaux plastiques",
        "L'obligation d'acheter uniquement des objets fabriqués artisanalement à la main",
        "Leur passage du statut d'objet durable et transmissible à celui de consommable jetable"
      ],
      "ans": 3,
      "passEn": "INDUSTRIAL AESTHETICS — CONTEMPORARY DESIGN PAPERS: DISPOSABLE DESIGN AND DURABILITY EROSION.\n\nLow-cost appliance design and mass production for rapid replacement altered the aesthetic status of everyday goods. Once built to endure across generations using quality materials and repairable joints, modern goods are engineered under programmed aesthetic obsolescence.\n\nThis devaluation of material durability weakens emotional connections between users and their possessions. By conditioning society to view goods as disposable items, industrial commercialism erodes durable design cultures and drives resource overconsumption. Revaluing objects requires championing repairability and artisan care.",
      "qEn": "What status shift regarding everyday objects does the author criticize?",
      "optEn": [
        "Product purchase costs becoming completely unaffordable for most households",
        "Surging manufacturing build quality driven by plastic materials usage",
        "Mandates requiring purchase of handcrafted artisanal goods strictly",
        "Shift from durable transmissible goods to short-lived disposable consumables"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai d'écologie culturelle",
      "text": "ÉCOLOGIE ET SOCIÉTÉ — CAHIERS DE LA TRANSITION CULTURELLE : LA NORMALISATION DU CONFORT THERMIQUE ET LA PERTE DE LA SENSIBILITÉ CLIMATIQUE.\n\nLa généralisation de la climatisation intégrale et du chauffage centralisé à température constante dans les bâtiments contemporains a produit un phénomène d'étanchéité sensorielle entre l'être humain et les rythmes des saisons. En maintenant artificiellement une température intérieure uniforme tout au long de l'année, l'architecture moderne a atrophié l'acclimatation naturelle du corps humain et altéré notre sensibilité profonde aux variations climatiques extérieures et aux nuances du temps.\n\nCette dépendance énergétique au confort thermique absolu alimente une fuite en avant consommocrate particulièrement destructrice pour l'environnement. Dépasser la crise écologique exige de réévaluer nos normes de confort et de réapprendre une sobriété thermique adaptée aux saisons, fondée sur une architecture bioclimatique attentive aux conditions locales, à l'orientation solaire et respectueuse du vivant sous toutes ses formes.",
      "q": "Conséquence sensorielle et écologique de la régulation thermique constante des bâtiments :",
      "opt": [
        "L'atrophie de l'acclimatation corporelle naturelle et l'augmentation des besoins énergétiques",
        "Une amélioration de l'endurance physique des citadins face aux intempéries",
        "La baisse des factures d'électricité durant les périodes de canicule estivale",
        "L'obligation de vivre à l'extérieur durant la totalité de la saison hivernale"
      ],
      "ans": 0,
      "passEn": "CULTURAL ECOLOGY — CULTURAL TRANSITION PAPERS: THERMAL COMFORT AND CLIMATE AWARENESS LOSS.\n\nWidespread air conditioning and constant central heating create sensory insulation between humans and seasonal cycles. Maintaining uniform indoor temperatures year-round atrophies natural body acclimatization and alters perception of outdoor climate variations.\n\nEnergy dependency on absolute thermal comfort fuels consumption. Overcoming climate crises requires re-evaluating comfort norms and adopting seasonal thermal restraint grounded in local bioclimatic architecture respectful of nature.",
      "qEn": "Sensory and ecological consequence of constant building thermal regulation:",
      "optEn": [
        "Atrophy of natural body acclimatization and increased energy demand",
        "Improved physical endurance among city dwellers during extreme weather",
        "Lower electric power bills during extreme summer heatwaves",
        "Requirements to live outdoors throughout the entire winter season"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 34,
      "level": "C1",
      "docType": "Analyse de sociologie de l'éducation",
      "text": "ÉDUCATION ET SOCIÉTÉ — REVUE COMPARAISON ÉDUCATIVE : LE MYTHE DE LA MÉRITOCRATIE ET LA REPRODUCTION DES INÉGALITÉS SCOLAIRES.\n\nLe discours politique traditionnel célèbre l'institution scolaire comme le lieu par excellence de la méritocratie républicaine, où les réussites individuelles ne dépendraient que du talent et de l'effort personnel de chaque élève. Cependant, les travaux sociologiques approfondis démontrent que le système éducatif continue de faire fonctionner un puissant filtre de reproduction sociale, légitimant les privilèges des héritiers culturels sous le masque neutre de l'excellence académique.\n\nEn valorisant des codes linguistiques et des références culturelles implicites principalement transmis au sein des familles aisées, l'école transforme des inégalités sociales de départ en inégalités de mérite scolaire auto-justifiées. Déconstruire ce mythe méritocratique s'avère indispensable pour élaborer de véritables politiques de démocratisation de la réussite éducative et offrir des chances réelles à tous les enfants.",
      "q": "Quelle réalité sociologique l'auteur oppose-t-il au mythe méritocratique de l'école ?",
      "opt": [
        "La réussite scolaire absolue de tous les élèves issus de milieux défavorisés",
        "La reproduction des privilèges sociaux dissimulée sous des critères de mérite académique",
        "L'absence totale de critères de notation dans les examens nationaux",
        "L'égalité parfaite des ressources financières entre tous les établissements"
      ],
      "ans": 1,
      "passEn": "EDUCATION SOCIOLOGY — EDUCATIONAL COMPARISON REVIEW: MERITOCRACY MYTHS AND CLASS REPRODUCTION.\n\nPolitical rhetoric celebrates public schooling as a meritocratic space where success reflects talent and effort alone. However, sociological research demonstrates that education systems act as powerful social reproduction mechanisms, legitimizing class privilege behind academic merit masks.\n\nBy rewarding implicit linguistic codes and cultural references passed down in affluent families, schools turn initial social advantages into academic merit. Deconstructing meritocracy myths is essential for genuine educational democratization providing real opportunities to all children.",
      "qEn": "What sociological reality does the author oppose to meritocracy myths in schooling?",
      "optEn": [
        "Flawless academic success achieved by all students from disadvantaged backgrounds",
        "Reproduction of social class privilege masked behind academic merit criteria",
        "Complete absence of grading criteria in national standardized examinations",
        "Flawless equality of financial funding across all public school districts"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai sur l'économie numérique",
      "text": "ÉCONOMIE DU NUMÉRIQUE — CAHIERS DE LA PROSPECTIVE TECHNOLOGIQUE : LA CAPTURE DE LA VALEUR DANS L'ÉCONOMIE DES PLATEFORMES.\n\nL'émergence des géants du numérique fondés sur le modèle de plateforme a profondément réorganisé la création et la captation de la valeur économique à l'échelle mondiale. En se positionnant comme des intermédiaires incontournables entre offreurs et demandeurs de services, ces monopoles technologiques prélèvent des rentes considérables tout en transférant les coûts d'infrastructure et les risques d'activité sur les travailleurs indépendants ou les prestataires locaux.\n\nCette féodalisation numérique précarise le travail et asphyxie l'innovation locale au profit d'actionnaires lointains. Sans régulation publique ferme et sans soutien actif au développement d'alternatives coopératives en logiciel libre, la concentration de la valeur au sein de quelques firmes multinationales menace directement la souveraineté économique, industrielle et politique des territoires métropolitains et ruraux. Préserver la souveraineté numérique exige dès lors de soutenir la transition vers des plateformes publiques coopératives.",
      "q": "Comment les plateformes numériques dominantes captent-elles la valeur économique ?",
      "opt": [
        "En redistribuant l'intégralité de leurs bénéfices aux artisans et travailleurs locaux",
        "En finançant la construction d'infrastructures publiques gratuites dans les villes",
        "En prélevant des rentes d'intermédiation tout en transférant les risques sur les prestataires",
        "En interdisant l'utilisation d'Internet pour les transactions commerciales"
      ],
      "ans": 2,
      "passEn": "DIGITAL ECONOMY — TECH FORESIGHT PAPERS: VALUE CAPTURE IN PLATFORM ECONOMIES.\n\nDigital giants operating platform models restructured global economic value creation and capture. Acting as gatekeepers between service buyers and providers, these monopolies extract rents while shifting infrastructure costs and operational risks onto independent workers or local vendors.\n\nThis digital feudalism destabilizes labor and suffocates local innovation. Without public regulation and support for open-source cooperative alternatives, value concentration within multinational monopolies directly threatens regional economic and political sovereignty. Preserving digital sovereignty requires supporting transitions toward public cooperative platforms.",
      "qEn": "How do dominant digital platforms capture economic value?",
      "optEn": [
        "By redistributing all corporate profits to local artisans and workers",
        "By funding free public infrastructure construction across cities",
        "By extracting gatekeeper rents while shifting operational risks onto providers",
        "By banning the use of the internet for commercial retail transactions"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le temps",
      "text": "PHILOSOPHIE EXISTENTIELLE — ANNALES DE LA PENSÉE CONTEMPORAINE : LA REIFICATION DU TEMPS ET L'ÉROSION DE LA DUREE VÉCUE.\n\nLa réduction systématique de la temporalité humaine à une unité de mesure comptable et négociable au sein des économies de marché a progressivement désarticulé l'expérience subjective du temps. Soumis à la tyrannie des échéances immédiates et au rendement permanent, l'individu contemporain ne parvient plus à habiter la durée avec sérénité. Le temps vécu se trouve morcelé en une juxtaposition d'instants fonctionnels, dénués de continuité narrative et d'épaisseur symbolique.\n\nCette réification de la temporalité produit une forme grave d'aliénation existentielle. En transformant chaque minute disponible en une ressource à rentabiliser ou à consommer de manière compulsive, le modèle marchande asphyxie les moments de jachère réflexive où s'élabore la conscience de soi. Reconquérir une existence authentique exige de réhabiliter la primauté de la durée vécue contre la commodification du temps.",
      "q": "Quelle thèse centrale l'auteur soutient-il quant à l'impact de la marchandisation du temps ?",
      "opt": [
        "Elle augmente la longévité biologique et améliore la santé mentale des individus",
        "Elle garantit la liberté absolue de choix pour l'organisation des loisirs personnels",
        "Elle permet de supprimer définitivement le besoin de sommeil chez les travailleurs",
        "Elle morcelle le temps en instants comptables, détruisant la continuité narrative de l'existence"
      ],
      "ans": 3,
      "passEn": "EXISTENTIAL PHILOSOPHY — CONTEMPORARY THOUGHT ANNALS: TIME REIFICATION AND LIVED DURATION EROSION.\n\nReducing human time to countable market assets has fragmented subjective temporal experience. Subject to constant deadlines and productivity demands, modern individuals struggle to inhabit duration peacefully. Lived time shrinks to disconnected functional moments lacking narrative continuity or symbolic depth.\n\nThis time reification breeds existential alienation. Converting every available minute into a monetized or compulsively consumed resource suffocates reflective downtime essential for self-awareness. Reclaiming authentic living requires asserting lived duration over time commodification.",
      "qEn": "What central thesis does the author maintain regarding time commodification?",
      "optEn": [
        "Increases human lifespan and enhances individual mental health outcomes",
        "Guarantees absolute freedom of choice for organizing personal leisure",
        "Permanently eliminates sleep requirements among corporate workers",
        "Fragments time into countable units, destroying narrative existential continuity"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie politique",
      "text": "ÉPISTÉMOLOGIE POLITIQUE — REVUE DE PHILOSOPHIE CRITIQUE : LE SCIENTISME AUTORITAIRE ET LA CONFISCATION DU DÉBAT ÉTHIQUE.\n\nLa tentation récurrente d'ériger les vérités scientifiques temporaires et les modèles prospectifs en dogmes politiques indiscutables constitue une dérive technocratique majeure. En affirmant que la décision publique découle automatiquement d'une 'nécessité scientifique' pure affranchie de tout choix éthique, le discours scientiste neutralise la délibération démocratique et disqualifie par avance toute contestation citoyenne comme de l'irrationalité ou de l'ignorance.\n\nOr, la science empirique produit des connaissances factuelles mais ne saurait dicter les choix de valeurs morals qui fondent la justice sociale. Confondre le constat scientifique et l'arbitrage politique revient à instaurer une tyrannie des experts qui dépossède les citoyens de leur pouvoir de décision éthique. Restaurer la démocratie exige de réaffirmer que la politique relève de la délibération citoyenne sur les fins et non de la simple exécution de diktats technologiques.",
      "q": "Quelle dérive majeure l'auteur dénonce-t-il dans l'invocation de la 'nécessité scientifique' en politique ?",
      "opt": [
        "La confiscation du débat éthique et la disqualification de la délibération démocratique",
        "L'augmentation incontrôlable des budgets attribués aux laboratoires de recherche",
        "L'obligation d'enseigner les mathématiques à l'université pour tous les citoyens",
        "La fermeture définitive des centres d'archivage des données publiques"
      ],
      "ans": 0,
      "passEn": "POLITICAL EPISTEMOLOGY — CRITICAL PHILOSOPHY REVIEW: AUTHORITARIAN SCIENTISM AND ETHICAL DEPRIVATION.\n\nElevating temporary scientific models into unquestionable political dogmas represents a major technocratic risk. Claiming public decisions stem automatically from 'scientific necessity' free of ethical choices neutralizes democratic debate and dismisses citizen dissent as irrationality.\n\nEmpirical science produces factual knowledge but cannot dictate moral choices underpinning social justice. Confusing scientific facts with political choices establishes expert technocracy, stripping citizens of ethical decision-making. Restoring democracy requires affirming that politics is citizen deliberation over moral ends.",
      "qEn": "What major danger does the author denounce regarding 'scientific necessity' in politics?",
      "optEn": [
        "Confiscating ethical debate and dismissing democratic public deliberation",
        "Uncontrolled surges in public funding allocated to research laboratories",
        "Mandating advanced mathematics university degrees for all voting citizens",
        "Permanent closure of all public data collection and archival centers"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion philosophique sur l'art",
      "text": "ESTHÉTIQUE CONTEMPORAINE — CAHIERS DE LA CRITIQUE D'ART : L'AUTONOMIE DE L'ŒUVRE D'ART FACE À LA DICTATURE DE L'UTILITÉ IMMÉDIATE.\n\nLa pression croissante exercée sur les institutions culturelles et les créateurs pour justifier la valeur des œuvres d'art à l'aune de leur rentabilité économique ou de leur utilité sociale directe procède d'un malentendu ontologique profond. En exigeant de la création artistique qu'elle serve de vecteur de communication commerciale, de levier touristique ou d'outil de sensibilisation civique, le modèle utilitariste dénie à l'art sa fonction essentielle de subversion poétique et d'énigme esthétique.\n\nL'œuvre d'art authentique vaut précisément par sa capacité à résister à l'assimilation immédiate et à la logique du profit. En ménageant un espace d'inutilité féconde, la création artistique affranchit l'esprit humain de la dictature du rendement et offre au spectateur l'expérience d'une liberté contemplative irremplaçable dans une société obsédée par la performance.",
      "q": "Selon la réflexion, quelle est la fonction essentielle de l'œuvre d'art authentique ?",
      "opt": [
        "Produire des bénéfices financiers immédiats pour les investisseurs publics",
        "Ménager une subversion poétique et une liberté contemplative hors de l'utilité marchande",
        "Servir d'outil de propagande gouvernementale pour les célébrations nationales",
        "Enseigner la gestion comptable et le marketing aux étudiants des beaux-arts"
      ],
      "ans": 1,
      "passEn": "CONTEMPORARY AESTHETICS — ART CRITICISM PAPERS: ARTWORK AUTONOMY VERSUS IMMEDIATE UTILITY.\n\nPressuring cultural institutions to justify artwork value through economic profitability or direct utility stems from deep ontological misunderstandings. Requiring artistic creation to serve marketing, tourism, or civic PR strips art of its poetic subversion and aesthetic mystery.\n\nAuthentic artwork excels precisely in resisting instant assimilation and profit logic. By preserving spaces of fertile non-utility, art frees minds from performance pressures, providing viewers irreplaceable contemplative freedom in efficiency-obsessed societies.",
      "qEn": "According to the passage, what is the essential function of authentic artwork?",
      "optEn": [
        "Generating immediate monetary profits for public art market investors",
        "Preserving poetic subversion and contemplative freedom outside commercial utility",
        "Serving as government PR tools for national celebratory holidays",
        "Teaching accounting management and marketing to fine arts students"
      ]
    },
    {
      "paperNum": 5,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai d'anthropologie philosophique",
      "text": "ANTHROPOLOGIE PHILOSOPHIQUE — REVUE DES ÉTUDES HUMANISTES : LE SYMBOLISME RITUEL ET LA CONSTITUTION DE L'INTERSUBJECTIVITÉ.\n\nLa faculté humaine d'élaborer des mythes, des symboles et des rituels partagés ne saurait être interprétée comme un simple résidu superstitieux de notre histoire évolutive ou comme un divertissement culturel accessoire. Elle constitue au contraire l'armature ontologique fondamentale sur laquelle s'édifie l'intersubjectivité humaine, permettant à des individus biologiques distincts de se reconnaître au sein d'une communauté morale de valeurs et de destins partagés.\n\nEn médiatisant la relation au monde et à autrui à travers des formes symboliques vivantes, le rituel protège la communauté contre l'angoisse du néant et l'atomisation individualiste. Occulter cette dimension symbolique au profit d'un matérialisme réducteur revient à déposséder l'humanité de la structure narrative fondamentale qui fonde sa dignité éthique, son imaginaire poétique et sa solidarité collective à travers les générations.",
      "q": "Quelle thèse centrale l'auteur défend-il quant au rôle du symbolisme rituel ?",
      "opt": [
        "Il s'agit d'une habitude archaïque inutile devant être éliminée par la science",
        "Il empêche la recherche médicale et le développement des technologies modernes",
        "Il fonde l'armature ontologique de l'intersubjectivité et la solidarité de la communauté",
        "Il sert exclusivement à divertir les populations lors des jours de fête légale"
      ],
      "ans": 2,
      "passEn": "PHILOSOPHICAL ANTHROPOLOGY — HUMANIST STUDIES REVIEW: RITUAL SYMBOLISM AND INTERSUBJECTIVITY.\n\nHuman capacity to create shared myths, symbols, and rituals cannot be dismissed as superstitious evolutionary residue or secondary cultural entertainment. It constitutes the fundamental ontological framework building human intersubjectivity, enabling distinct biological individuals to recognize each other within shared moral communities.\n\nBy mediating relationships to others via shared symbolic forms, ritual protects communities against existential dread and individualistic atomization. Obscuring symbolic dimensions in favor of reductive materialism strips humanity of ethical dignity, imagination, and collective solidarity.",
      "qEn": "What central thesis does the author defend regarding the role of ritual symbolism?",
      "optEn": [
        "It represents useless archaic habit that science must eradicate",
        "Impeder of medical research progress and modern technological growth",
        "Founding the ontological framework of intersubjectivity and community solidarity",
        "Serving exclusively to entertain populations during public holiday events"
      ]
    }
  ],
  [
    {
      "paperNum": 6,
      "qNum": 1,
      "level": "A1",
      "docType": "Panneau de transport public",
      "text": "RÉSEAU FERROVIAIRE — GARE CENTRALE : Les guichets de vente de billets sont ouverts du lundi au vendredi de 06h00 à 20h00. En dehors de ces heures, utilisez les bornes automatiques bleues disponibles dans le hall principal.",
      "q": "Comment acheter un billet en dehors des heures d'ouverture des guichets ?",
      "opt": [
        "Sur les bornes automatiques bleues du hall",
        "Auprès du conducteur du train",
        "Par téléphone uniquement au guichet",
        "En s'adressant aux agents de sécurité"
      ],
      "ans": 0,
      "passEn": "RAILWAY NETWORK — CENTRAL STATION: Ticket counters are open Monday to Friday 6:00 AM to 8:00 PM. Outside these hours, use the blue self-service kiosks in the main hall.",
      "qEn": "How can passengers buy tickets outside counter opening hours?",
      "optEn": [
        "At the blue self-service kiosks in the hall",
        "From the train conductor on board",
        "By phone strictly at ticket offices",
        "By asking station security guards"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 2,
      "level": "A1",
      "docType": "Message d'information de magasin",
      "text": "SUPERMARCHÉ DE LA POSTE — HORAIRES D'ÉTÉ : Votre magasin sera ouvert tous les dimanches matin de 08h30 à 12h30 du 1er juillet au 31 août. Livraison à domicile gratuite dès 50 euros d'achats.",
      "q": "À quelle condition la livraison à domicile est-elle gratuite ?",
      "opt": [
        "Dès 30 euros d'achats",
        "Dès 50 euros d'achats",
        "Pour tous les clients seniors",
        "Sur présentation du ticket de caisse"
      ],
      "ans": 1,
      "passEn": "SUPERMARKET — SUMMER HOURS: Your store will be open every Sunday morning from 8:30 AM to 12:30 PM from July 1st to August 31st. Free home delivery on orders of 50 euros or more.",
      "qEn": "On what condition is home delivery free of charge?",
      "optEn": [
        "For orders of 30 euros or more",
        "For orders of 50 euros or more",
        "For senior citizen shoppers strictly",
        "Upon presenting receipt at customer service"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 3,
      "level": "A1",
      "docType": "Consigne d'établissement sportif",
      "text": "PISCINE MUNICIPALE — ACCÈS AU GRAND BASSIN : La douche est obligatoire avant d'entrer dans l'eau. Les shorts de bain sont interdits ; seul le maillot de bain classique est autorisé.",
      "q": "Quel tenue de baignade est autorisée dans le grand bassin ?",
      "opt": [
        "Le short de bain de plage",
        "Le bermuda en toile de coton",
        "Le maillot de bain classique",
        "La combinaison de plongée en néoprène"
      ],
      "ans": 2,
      "passEn": "MUNICIPAL POOL — MAIN POOL RULES: Showers are mandatory before entering the water. Swim shorts are prohibited; only standard swimsuits are permitted.",
      "qEn": "What swimwear is permitted in the main pool?",
      "optEn": [
        "Beach board shorts",
        "Cotton bermuda shorts",
        "Standard classic swimsuit",
        "Neoprene diving wetsuit"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 4,
      "level": "A1",
      "docType": "Panneau de cabinet médical",
      "text": "CABINET MÉDICAL — CONSULTATIONS : Sur rendez-vous uniquement du lundi au vendredi de 08h00 à 19h00. En cas d'urgence le soir ou le weekend, composez directement le 15.",
      "q": "Que faut-il faire pour consulter un médecin au cabinet ?",
      "opt": [
        "Venir sans prévenir le matin",
        "Envoyer une lettre recommandée",
        "Attendre dans la rue dès 07h00",
        "Prendre obligatoirement rendez-vous"
      ],
      "ans": 3,
      "passEn": "MEDICAL CLINIC — APPOINTMENTS: By appointment only Monday to Friday 8:00 AM to 7:00 PM. In case of evening or weekend emergency, dial 15 directly.",
      "qEn": "What step is required to see a doctor at the clinic?",
      "optEn": [
        "Walk in without calling in the morning",
        "Send a registered letter via postal mail",
        "Wait outside on the street from 7:00 AM",
        "Schedule a mandatory appointment"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 5,
      "level": "A2",
      "docType": "Avis d'objet trouvé",
      "text": "ACCUEIL MUNICIPAL — OBJET TROUVÉ : Trousseau de trois clés avec un porte-clés en cuir marron trouvé hier après-midi devant la boulangerie de la Grande Rue. Le propriétaire peut venir le récupérer à l'accueil de la mairie sur présentation d'une pièce d'identité.",
      "q": "Que doit présenter le propriétaire pour récupérer son trousseau de clés ?",
      "opt": [
        "Une pièce d'identité à l'accueil de la mairie",
        "Le ticket de caisse de la boulangerie",
        "Une photo montrant son porte-clés",
        "Une attestation écrite du boulanger"
      ],
      "ans": 0,
      "passEn": "MUNICIPAL DESK — LOST ITEM: Keychain with three keys and a brown leather fob found yesterday afternoon outside Grande Rue bakery. Owner can retrieve it at city hall reception upon presenting ID.",
      "qEn": "What must the owner present to retrieve their keychain?",
      "optEn": [
        "Photo ID card at city hall reception",
        "Bakery store purchase receipt",
        "Photograph showing their keychain",
        "Written certificate from the baker"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 6,
      "level": "A2",
      "docType": "Message d'information de bibliothèque",
      "text": "MÉDIATHÈQUE DU PARC — FERMETURE POUR INVENTAIRE : La médiathèque sera fermée au public du lundi 3 au samedi 8 novembre pour la réalisation de l'inventaire annuel. La boîte de retour extérieure reste accessible 24h/24 pour déposer vos livres.",
      "q": "Comment rendre ses livres pendant la semaine de fermeture de la médiathèque ?",
      "opt": [
        "Les conserver chez soi jusqu'à la réouverture",
        "Les déposer dans la boîte de retour extérieure",
        "Les envoyer par la poste au directeur",
        "Les donner au gardien du parc municipal"
      ],
      "ans": 1,
      "passEn": "PARK MEDIA LIBRARY — INVENTORY CLOSURE: The library will be closed Monday Nov 3 through Saturday Nov 8 for annual inventory audit. The outdoor drop box remains open 24/7 for book returns.",
      "qEn": "How can patrons return books during the library closure week?",
      "optEn": [
        "Keep them at home until reopening day",
        "Deposit them in the outdoor drop box",
        "Mail them via post office to the director",
        "Hand them to the municipal park ranger"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 7,
      "level": "A2",
      "docType": "Annonce d'excursion nature",
      "text": "ASSOCIATION DE RANDONNÉE — SORTIE DÉCOUVERTE DE LA FORÊT : Sortie guidée de 3 heures ce dimanche à 09h00 à la découverte des arbres remarquables de la région. Rendez-vous au parking de la maison forestière. Prévoir des chaussures de marche étanches et une gourde d'eau.",
      "q": "Quel équipement personnel est recommandé pour la randonnée ?",
      "opt": [
        "Des baskets en toile légère",
        "Un sac de couchage et une tente",
        "Des chaussures de marche étanches et de l'eau",
        "Une carte topographique professionnelle"
      ],
      "ans": 2,
      "passEn": "HIKING CLUB — FOREST DISCOVERY NATURE WALK: Guided 3-hour walk this Sunday at 9:00 AM discovering remarkable regional trees. Meet at forest station parking lot. Bring waterproof hiking boots and a water bottle.",
      "qEn": "What personal equipment is recommended for the hike?",
      "optEn": [
        "Light canvas sneakers",
        "Sleeping bag and camping tent",
        "Waterproof hiking boots and water",
        "Professional topographic map"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 8,
      "level": "A2",
      "docType": "Information de centre de loisirs",
      "text": "INFORMA TION FAMILLES — INSCRIPTIONS DU CENTRE DE VACANCES : Les inscriptions pour le centre de loisirs de la Toussaint ouvrent ce lundi dès 08h30 sur le portal internet de la ville. Attention, le nombre de places est limité et les dossiers incomplets ne seront pas traités.",
      "q": "Quelle mise en garde est adressée aux parents lors de l'inscription ?",
      "opt": [
        "Le paiement doit obligatoirement être fait en espèces",
        "L'inscription se fait exclusivement par courrier postal",
        "Les enfants doivent habiter en centre-ville uniquement",
        "Le nombre de places est limité et les dossiers doivent être complets"
      ],
      "ans": 3,
      "passEn": "FAMILY NOTICE — VACATION CENTER REGISTRATION: Registration for autumn holiday youth camps opens Monday at 8:30 AM on the city website. Note: spots are limited and incomplete files will not be processed.",
      "qEn": "What warning is given to parents regarding registration?",
      "optEn": [
        "Payment must be settled in cash strictly",
        "Registration occurs by postal mail only",
        "Children must live downtown exclusively",
        "Spot numbers are limited and files must be complete"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 9,
      "level": "A2",
      "docType": "Annonce d'exposition artisanale",
      "text": "ARTISANAT LOCAL — SALON DES CRÉATEURS DE PROVENCE : Venez rencontrer 40 artisans et créateurs locaux ce weekend de 10h00 à 19h00 au hall des expositions. Bijoux, céramiques, objets en bois sculpté et textiles artisanaux. Entrée : 3 euros, gratuit pour les moins de 12 ans.",
      "q": "À partir de quel âge l'entrée au salon devient-elle payante ?",
      "opt": [
        "À partir de 12 ans",
        "À partir de 6 ans",
        "À partir de 18 ans",
        "L'entrée est gratuite pour tout le monde"
      ],
      "ans": 0,
      "passEn": "LOCAL CRAFTS — PROVENCE CREATORS FAIR: Meet 40 local artisans and makers this weekend 10:00 AM to 7:00 PM at exhibition hall. Jewelry, ceramics, carved wood, and textiles. Entry: 3 euros, free under 12.",
      "qEn": "At what age does fair entry become subject to ticket fees?",
      "optEn": [
        "Starting at 12 years old",
        "Starting at 6 years old",
        "Starting at 18 years old",
        "Entry is free of charge for everyone"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 10,
      "level": "A2",
      "docType": "Note de chantier de voirie",
      "text": "TRAVAUX DE VOIRIE — RUE DE LA RÉPUBLIQUE : Des travaux d'installation de la fibre optique nécessitent la fermeture d'une voie de circulation du 10 au 14 novembre. Un feu tricolore temporaire alternera le passage des véhicules. Ralentissement prévu aux heures de pointe.",
      "q": "Dispositif mis en place pour gérer la circulation durant les travaux :",
      "opt": [
        "La déviation de tout le trafic par la nationale",
        "Un feu tricolore temporaire alternant la circulation",
        "La fermeture totale de la rue dans les deux sens",
        "L'obligation de circuler à vélo uniquement"
      ],
      "ans": 1,
      "passEn": "ROADWORKS NOTICE — REPUBLIQUE STREET: Fiber optic cable installation requires closing one traffic lane November 10 to 14. Temporary traffic lights will alternate vehicle passage. Expect rush-hour delays.",
      "qEn": "System implemented to manage traffic flow during roadworks:",
      "optEn": [
        "Detouring all traffic via highway bypass",
        "Temporary traffic lights alternating single-lane flow",
        "Complete street closure in both directions",
        "Mandating bicycle traffic strictly"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 11,
      "level": "A2",
      "docType": "Message de club de sport",
      "text": "CLUB DE GYMNASTIQUE — REPRISE DES ENTRAÎNEMENTS : Tous les cours enfants et adultes reprennent à partir du lundi 15 septembre selon les horaires habituels. N'oubliez pas d'apporter votre certificat médical de non-contre-indication à la pratique sportive lors du premier cours.",
      "q": "Quel document obligatoire doit être rendu au premier cours de gymnastique ?",
      "opt": [
        "Une attestation de domicile récente",
        "Une copie du brevet de natation",
        "Un certificat médical de non-contre-indication",
        "La quittance de loyer du mois en cours"
      ],
      "ans": 2,
      "passEn": "GYMNASTICS CLUB — PRACTICE RESUMPTION: All youth and adult classes resume Monday September 15 per schedule. Remember to bring your medical fitness clearance certificate to your first practice session.",
      "qEn": "What mandatory document must be handed in at the first gymnastics class?",
      "optEn": [
        "Recent proof of home residency",
        "Copy of swimming proficiency badge",
        "Medical fitness clearance certificate",
        "Current month rent payment receipt"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 12,
      "level": "A2",
      "docType": "Avis de prévention incendie",
      "text": "SÉCURITÉ CIVILE — PRÉVENTION INCENDIE EN FORET : En raison de la sécheresse marquée, l'allumage de feux, les barbecues et le jet de mégots sont strictement interdits dans tous les massifs forestiers du département sous peine d'amende forfaitaire de 135 euros.",
      "q": "Sanction encourue par les contrevenants à l'interdiction de feu en forêt :",
      "opt": [
        "Un avertissement verbal sans conséquence",
        "Une confiscation définitive du véhicule",
        "L'obligation d'effectuer des travaux d'intérêt général",
        "Une amende forfaitaire de 135 euros"
      ],
      "ans": 3,
      "passEn": "CIVIL PROTECTION — FOREST FIRE PREVENTION: Due to severe drought, lighting fires, outdoor barbecues, and dropping cigarette butts are strictly banned across all county forests subject to a 135 euro fine.",
      "qEn": "Penalty faced by violators of the forest fire prohibition:",
      "optEn": [
        "Verbal warning with no further action",
        "Permanent confiscation of driver's vehicle",
        "Mandatory community service work hours",
        "Fixed fine of 135 euros"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse locale",
      "text": "DEVELOPPEMENT DURABLE — REVUE DES INITIATIVES MUNICIPALES : LA VÉGÉTALISATION DES TOITS D'ÉDIFICES PUBLICS.\n\nLa municipalité vient de terminer l'aménagement de toitures végétalisées sur le toit de trois grands groupes scolaires de la ville. Composées de plantes vivaces résistantes et de substrats drainants, ces structures vertes permettent de retenir les eaux de pluie tout en apportant une isolation thermique naturelle aux salles de classe situées dessous.\n\nEn luttant contre l'effet d'îlot de chaleur urbain, ce projet modèle démontre comment l'architecture publique peut concilier économie d'énergie et rafraîchissement naturel des bâtiments sans recourir à la climatisation.",
      "q": "Bénéfice direct apporté aux salles de classe sous les toits végétalisés :",
      "opt": [
        "Une isolation thermique naturelle réduisant les besoins en climatisation",
        "La suppression définitive de l'éclairage électrique",
        "La création de potagers de légumes pour la cantine",
        "L'accès direct des élèves au toit par des escaliers mécaniques"
      ],
      "ans": 0,
      "passEn": "SUSTAINABLE DEVELOPMENT — MUNICIPAL INITIATIVES REVIEW: GREENING PUBLIC BUILDING ROOFS.\n\nThe city completed installing green roofs on three major school complexes. Made of hardy perennial plants and draining substrates, these green roofs absorb rainwater while providing natural insulation for classrooms below.\n\nMitigating urban heat island effects, this project shows how public architecture reconciles energy efficiency and natural cooling without air conditioning.",
      "qEn": "Direct benefit provided to classrooms located underneath green roofs:",
      "optEn": [
        "Natural thermal insulation reducing air conditioning needs",
        "Complete elimination of electric classroom lighting",
        "Building rooftop vegetable gardens for school lunches",
        "Direct student rooftop access via escalators"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur l'autonomie citoyenne",
      "text": "SOCIÉTÉ ET CADRE DE VIE — BULLETIN DE LA TRANSITION URBAINE : LES ATELIERS DE RÉPARATOIRE DE VÉLOS EN COOPÉRATIVE.\n\nDes associations de quartier développent des ateliers participatifs où les cyclistes apprennent à entretenir et réparer eux-mêmes leur bicyclette. Moyennant une adhésion annuelle modique, les usagers disposent de tous les outils spécialisés nécessaires et des conseils avertis de mécaniciens bénévoles passionnés.\n\nCette démarche d'auto-réparation favorise le réemploi de pièces détachées d'occasion tout en développant l'autonomie des usagers, réduisant ainsi le coût financier de l'usage quotidien du vélo.",
      "q": "Objectif poursuivi par ces ateliers participatifs de réparation de vélos :",
      "opt": [
        "Vendre des vélos neufs haut de gamme fabriqués à l'étranger",
        "Autonomiser les usagers par l'apprentissage de la mécanique vélo",
        "Interdire la circulation des vélos anciens non conformes",
        "Remplacer les magasins de cycles professionnels par des banques"
      ],
      "ans": 1,
      "passEn": "SOCIETY AND LIVING ENVIRONMENT — URBAN TRANSITION BULLETIN: COOPERATIVE BIKE REPAIR SHOPS.\n\nNeighborhood non-profits are expanding DIY workshops where cyclists learn to maintain and fix their bikes. For a small annual fee, members access specialized tools and guidance from volunteer mechanics.\n\nThis DIY approach encourages reusing spare parts while building user self-reliance, significantly lowering daily cycling costs.",
      "qEn": "Goal pursued by these participatory DIY bicycle repair workshops:",
      "optEn": [
        "Selling brand-new luxury bicycles imported from abroad",
        "Empowering users by teaching bicycle mechanics self-reliance",
        "Banning older non-compliant bicycles from city streets",
        "Replacing professional bike shops with retail banks"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur le travail coopératif",
      "text": "ÉCONOMIE SOCIALE — REVUE DU TRAVAIL INDÉPENDANT : LE DÉVELOPPEMENT DES ESPACES DE COWORKING RURAUX.\n\nLongtemps cantonnés aux hypercentres métropolitains, les espaces de travail partagés (coworking) s'implantent désormais au cœur des petites communes rurales et des bourgs de campagne. Aménagés dans d'anciennes gares ou des bâtiments communaux réhabilités, ils offrent aux télétravailleurs et indépendants une connexion internet très haut débit et un équipement professionnel adapté.\n\nCette dynamique permet de rompre l'isolement du travail à domicile tout en évitant les longs déplacements quotidiens vers les grandes agglomérations.",
      "q": "Avantage offert par les tiers-lieux de coworking ruraux aux télétravailleurs :",
      "opt": [
        "L'obtention d'un logement gratuit financé par la commune",
        "L'obligation de travailler exclusivement pour la mairie locale",
        "Rompre l'isolement tout en évitant les trajets quotidiens vers les métropoles",
        "Le remboursement des repas du soir pris au restaurant"
      ],
      "ans": 2,
      "passEn": "SOCIAL ECONOMY — INDEPENDENT WORK REVIEW: EXPANSION OF RURAL COWORKING SPACES.\n\nOnce confined to big city centers, shared coworking spaces are establishing footholds in rural towns. Set up in renovated historic train stations or municipal buildings, they provide remote workers high-speed internet and professional office setups.\n\nThis trend breaks home-working isolation while eliminating long daily commutes to big metropolitan areas.",
      "qEn": "Advantage offered by rural coworking hubs to remote workers:",
      "optEn": [
        "Securing free housing funded by municipal councils",
        "Mandatory requirements to work for local city hall strictly",
        "Breaking isolation while avoiding daily commutes to big cities",
        "Full reimbursement of evening restaurant dinners"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur la préservation de la faune",
      "text": "ENVIRONNEMENT — NOUVELLES DE LA FAUNE SAUVAGE : LA CRÉATION DE CRAPAUDUCS SUR LES ROUTES EN FORÊT.\n\nLors de la migration printanière vers leurs sites de reproduction aquatiques, des milliers de batraciens (crapauds, grenouilles, salamandres) se font écraser en traversant les routes départementales bordant les forêts. Pour stopper cette mortalité catastrophique, des écologistes et des services de voirie installent des 'crapauducs' : des tunnels souterrains guidés par des bâchettes thermoplastiques.\n\nCes aménagements spécifiques permettent aux amphibiens de franchir les chaussées en toute sécurité, préservant ainsi des maillons essentiels de la chaîne alimentaire locale.",
      "q": "Rôle des tunnels souterrains (crapauducs) installés sous les routes :",
      "opt": [
        "Permettre l'écoulement rapide des eaux d'inondation en ville",
        "Servir de zones de stockage pour le sel de déneigement hivernal",
        "Faciliter le passage des cyclistes et des piétons sous la route",
        "Permettre la traversée sécurisée des amphibiens durant leur migration"
      ],
      "ans": 3,
      "passEn": "ENVIRONMENT — WILDLIFE NEWS: BUILDING AMPHIBIAN TUNNELS ALONG FOREST ROADS.\n\nDuring spring migration to breeding ponds, thousands of amphibians (toads, frogs, salamanders) are crushed crossing forest highways. Halting this mortality, conservationists and highway crews install 'amphibian tunnels': small underpasses lined with plastic fencing.\n\nThese structures allow amphibians to cross highways safely, preserving vital links in local food webs.",
      "qEn": "Role of underground tunnels (amphibian passes) installed beneath roads:",
      "optEn": [
        "Enabling rapid drainage of urban floodwaters",
        "Serving as winter road-deicing salt storage units",
        "Facilitating pedestrian and cyclist underpass travel",
        "Permitting safe highway crossings for migrating amphibians"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur la culture intergénérationnelle",
      "text": "SOLIDARITÉ SOCIALE — BULLETIN DE LA COHÉSION LOCALE : LES LECTURES INTERGÉNÉRATIONNELLES EN ÉCOLE ET EHPAD.\n\nUne association locale organise des rencontres hebdomadaires de lecture à haute voix associant des retraités bénévoles et des enfants des écoles primaires. Organisées en alternance dans les bibliothèques d'école et les résidences pour aînés, ces séances permettent le partage de contes, de récits historiques et d'albums illustrés.\n\nCette initiative crée des ponts chaleureux entre les générations, stimulant l'apprentissage de la lecture chez les plus jeunes tout en apportant une stimulation intellectuelle et affective précieuse aux seniors.",
      "q": "Impact positif de ces ateliers de lecture partagée :",
      "opt": [
        "La création de liens intergénérationnels et la stimulation de la lecture",
        "Le remplacement des enseignants par des bénévoles seniors",
        "L'obligation pour les seniors de passer des examens scolaires",
        "La fermeture définitive des bibliothèques municipales traditionnelles"
      ],
      "ans": 0,
      "passEn": "SOCIAL SOLIDARITY — COMMUNITY COHESION BULLETIN: INTERGENERATIONAL READING IN SCHOOLS AND ELDER CARE.\n\nA local non-profit organizes weekly read-aloud sessions pairing retired volunteers with primary school children. Hosted alternately in school libraries and senior residences, sessions feature storytelling, historic accounts, and picture books.\n\nThis project builds warm intergenerational bridges, boosting reading skills in youth while providing valuable cognitive and emotional stimulation for seniors.",
      "qEn": "Positive impact of these shared intergenerational reading workshops:",
      "optEn": [
        "Building intergenerational bonds and boosting reading skills",
        "Replacing certified primary teachers with senior volunteers",
        "Requirements for seniors to sit for standardized school exams",
        "Permanent closure of traditional municipal public libraries"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur la gestion de l'eau",
      "text": "RESSOURCES ET ÉCOLOGIE — REVUE DE LA CONSERVATION DE L'EAU : L'INSTALLATION DE RECUPÉRATEURS D'EAU DE PLUIE MUNICIPAUX.\n\nFace à la répétition des sécheresses estivales et aux restrictions d'arrosage, la municipalité équipe progressivement l'ensemble de ses bâtiments publics et serres municipales de grands cuves de récupération d'eaux pluviales. L'eau stockée durant l'hiver et le printemps sert à l'arrosage des jardins publics et au nettoyage des espaces urbains.\n\nCette démarche d'économie d'eau potable permet de réduire significativement la facture d'eau de la commune tout en préservant les ressources en nappe phréatique en période de crise hydrique.",
      "q": "Usage réservé aux eaux de pluie collectées par la commune :",
      "opt": [
        "Alimenter le réseau d'eau potable des appartements du centre",
        "L'arrosage des parcs publics et le nettoyage des espaces urbains",
        "La vente d'eau embouteillée aux commerçants de la ville",
        "La fabrication de neige artificielle en station de ski"
      ],
      "ans": 1,
      "passEn": "RESOURCES AND ECOLOGY — WATER CONSERVATION REVIEW: INSTALLING MUNICIPAL RAINWATER HARVESTING SYSTEMS.\n\nFacing recurrent summer droughts and watering bans, the city is equipping public buildings and greenhouses with large rainwater harvesting tanks. Stored rainwater collected in winter and spring is used for park irrigation and street cleaning.\n\nThis drinking water conservation effort reduces city utility bills while protecting groundwater aquifers during droughts.",
      "qEn": "Usage designated for rainwater collected by municipal tanks:",
      "optEn": [
        "Supplying drinking water pipes to downtown apartments",
        "Irrigating public parks and cleaning municipal street spaces",
        "Selling bottled water to local retail shopkeepers",
        "Manufacturing artificial snow at mountain ski resorts"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur le sport citoyen",
      "text": "SPORTS ET SANTÉ — REVUE DE L'ACTIVITÉ PHYSIQUE : LE SUCCÈS DES PARCOURS DE REMISE EN FORME URBAINS.\n\nDans le cadre de sa politique de promotion du sport pour tous, la direction des sports a aménagé cinq parcours de remise en forme en accès libre le long des berges du fleuve. Chaque station propose des équipements de musculation et de cardio doux adaptés à tous les âges et accompagnés de consignes d'utilisation illustrées.\n\nCes aménagements extérieurs encouragent la pratique d'une activité physique régulière et gratuite au cœur de la ville, attirant aussi bien les pratiquants réguliers que les débutants.",
      "q": "Caractéristique principale des équipements sportifs installés sur les berges :",
      "opt": [
        "Ils sont réservés aux sportifs professionnels sur présentation d'une licence",
        "Ils nécessitent le paiement d'un abonnement mensuel par carte bancaire",
        "Ils sont en accès libre, gratuits et adaptés à tous les publics",
        "Ils sont utilisables uniquement la nuit avec un coach privé"
      ],
      "ans": 2,
      "passEn": "SPORTS AND HEALTH — PHYSICAL ACTIVITY REVIEW: POPULARITY OF URBAN FITNESS TRAILS.\n\nPromoting sports for all, the city parks department installed five open-access fitness trails along riverbanks. Each station features cardio and strength equipment suitable for all ages alongside illustrated user guides.\n\nThese outdoor installations encourage free regular physical exercise downtown, attracting seasoned runners and beginners alike.",
      "qEn": "Main feature of the outdoor fitness equipment installed along riverbanks:",
      "optEn": [
        "Reserved for certified professional athletes showing sports licenses",
        "Requires paying monthly credit card membership subscription fees",
        "Free open-access equipment adapted to all fitness levels and ages",
        "Usable at night exclusively under supervision of private coaches"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur l'alimentation biologique",
      "text": "AGRICULTURE ET SANTÉ — BULLETIN DE LA NUTRITION DURABLE : L'APPROVISIONNEMENT LOCAL ET BIO DANS LA RESTAURATION COLLECTIVE.\n\nUne nouvelle loi municipale impose désormais que 60 % des denrées alimentaires servies dans les cantines scolaires, hôpitaux et maisons de retraite de la ville soient issues de producteurs locaux et de l'agriculture biologique. Cette mesure favorise les circuits courts et garantit une alimentation saine et de saison aux usagers.\n\nCe partenariat pérenne apporte aux agriculteurs de la région un débouché commercial stable et prévisible, soutenant l'économie agricole locale face aux fluctuations des cours mondiaux.",
      "q": "Bénéfice de cette mesure d'approvisionnement bio pour les agriculteurs locaux :",
      "opt": [
        "La possibilité de vendre leurs terres à des promoteurs immobiliers",
        "La suppression de l'exigence de qualité sanitaire des aliments",
        "L'obligation de transformer leurs fermes en parcs d'attractions",
        "Un débouché commercial stable et prévisible pour leurs récoltes"
      ],
      "ans": 3,
      "passEn": "AGRICULTURE AND HEALTH — SUSTAINABLE NUTRITION BULLETIN: LOCAL ORGANIC FOOD IN PUBLIC CAFETERIAS.\n\nA new municipal ordinance requires 60% of food served in school, hospital, and senior home cafeterias to come from local organic farms. This policy supports short supply chains and guarantees healthy seasonal meals.\n\nThis sustained partnership offers regional farmers stable, predictable market demand, insulating local agricultural economies from global commodity price swings.",
      "qEn": "Benefit of this local organic sourcing policy for regional farmers:",
      "optEn": [
        "Opportunities to sell farmland to commercial real estate developers",
        "Eliminating health and quality inspection standards for produce",
        "Mandatory requirements to turn farms into commercial theme parks",
        "A stable, predictable commercial market outlet for their harvests"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur le tourisme vert",
      "text": "TOURISME ET PATRIMOINE — CAHIERS DE LA DÉCOUVERTE : LA VALORISATION DES SENTIERS DE GRANDE RANDONNÉE CYCLISTE.\n\nLe développement d'itinéraires cyclables balisés traversant les régions ruraux attire une nouvelle clientèle touristique adepte de voyages itinérants à vélo. Équipés de sacoches et empruntant des voies vertes réservées, ces cyclotouristes découvrent le patrimoine local à un rythme apaisé.\n\nCette forme de tourisme durable bénéficie directement aux hébergements de charme, gîtes ruraux et petits restaurants du terroir situés le long des parcours, dynamisant l'économie rurale en dehors des grandes stations touristiques traditionnelles.",
      "q": "Retombée économique du cyclotourisme itinérant sur les territoires ruraux :",
      "opt": [
        "La redynamisation des hébergements et commerces locaux situés le long des voies",
        "La construction d'autoroutes payantes réservées aux voitures",
        "La fermeture des petits restaurants au profit de fast-foods industriels",
        "L'interdiction de séjourner plus de 24 heures dans un gîte rural"
      ],
      "ans": 0,
      "passEn": "TOURISM AND HERITAGE — DISCOVERY PAPERS: PROMOTING REGIONAL CYCLE TOURING ROUTES.\n\nDeveloping marked cycle touring routes across countryside regions attracts travelers seeking slow-paced bike trips. Outfitted with panniers along car-free greenways, cycle tourists explore local heritage.\n\nThis sustainable tourism directly benefits local inns, rural B&Bs, and regional restaurants along routes, boosting rural economies outside traditional resort hubs.",
      "qEn": "Economic impact of cycle touring on rural communities:",
      "optEn": [
        "Revitalizing local inns and restaurants along greenway routes",
        "Building toll highways reserved exclusively for passenger cars",
        "Closing local diners in favor of industrial fast-food chains",
        "Prohibiting stays longer than 24 hours at rural bed-and-breakfasts"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur l'artisanat du bois",
      "text": "SOCIÉTÉ ET PATRIMOINE — REVUE DES SAVOIR-FAIRE : LE RENOUVEAU DE LA MENUISERIE ET DE L'ÉBÉNISTERIE ÉCO-CONÇUE.\n\nFace à la saturation des meubles industriels jetables fabriqués en panneaux de particules, les ateliers d'ébénisterie et de menuiserie artisanale connaissent un regain de commandes. Les clients recherchent désormais des meublements sur mesure en bois massif local, façonnés selon des techniques d'assemblage traditionnelles et traités avec des huiles naturelles non toxiques.\n\nCes créations durables et réparables s'inscrivent dans une démarche de consommation responsable qui valorise la beauté du bois véritable et le travail manuel de qualité.",
      "q": "Critères de qualité recherchés par la clientèle des ateliers d'ébénisterie :",
      "opt": [
        "Des meubles jetables en plastique bon marché fabriqués à la chaîne",
        "Du sur-mesure en bois massif local durable et des assemblages traditionnels",
        "L'usage exclusif de vernis chimiques synthétiques toxiques",
        "La livraison de meubles démontables livrés en pièces détachées sans notice"
      ],
      "ans": 1,
      "passEn": "SOCIETY AND HERITAGE — CRAFT REVIEW: RESURGENCE OF ECO-FRIENDLY WOODWORKING AND CABINETMAKING.\n\nWeary of disposable particleboard furniture, artisan woodworking studios report growing order volumes. Customers seek custom solid-wood furniture built with traditional joinery and finished with non-toxic natural oils.\n\nThese durable, repairable creations embrace responsible consumption, celebrating real wood beauty and quality manual craftsmanship.",
      "qEn": "Quality criteria sought by customers ordering from artisan woodworking studios:",
      "optEn": [
        "Cheap mass-produced disposable plastic furniture items",
        "Custom durable local solid wood crafted with traditional joinery",
        "Exclusive usage of toxic synthetic chemical varnishes",
        "Disassembled flat-pack furniture delivered without instructions"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse d'urbanisme commercial",
      "text": "AMÉNAGEMENT DU TERRITOIRE — REVUE COMMERCIALE : LA LUTTE CONTRE LA DÉSER TIFICATION DES CENTRES-VILLES.\n\nLa multiplication incontrôlée des zones commerciales en périphérie métropolitaine a entraîné la fermeture massive des commerces de détail indépendants au cœur des villes moyennes. Pour stopper cette dévitalisation urbaine et commerciale, plusieurs municipalités appliquent le dispositif de moratorium sur la création de nouvelles surfaces commerciales périurbaines.\n\nEn réhabilitant le logement de centre-ville et en soutenant l'implantation d'enseignes de proximité de qualité, ces politiques publiques parviennent à recréer de l'attractivité et de la convivialité marchande au cœur des cités.",
      "q": "Mesure clé adoptée par les villes pour enrayer le déclin des commerces de centre-ville :",
      "opt": [
        "Subventionner l'ouverture de nouveaux centres commerciaux géants en banlieue",
        "Interdire aux citoyens d'acheter des produits frais dans les magasins",
        "Geler l'extension des zones commerciales de périphérie et rénover le centre",
        "Obliger tous les commerçants de centre-ville à fermer à 15h00"
      ],
      "ans": 2,
      "passEn": "REGIONAL PLANNING — COMMERCIAL REVIEW: COMBATING CITY CENTER DOWNTOWN DESERTIFICATION.\n\nUncontrolled expansion of suburban shopping parks led to widespread closures of independent retail shops in mid-sized city centers. Halting this urban decay, municipalities are enforcing moratoriums on new suburban commercial developments.\n\nRenovating downtown housing and supporting quality local retail, public policies restore foot traffic, commercial vitality, and neighborhood charm to city centers.",
      "qEn": "Key measure adopted by cities to halt the decline of downtown retail shops:",
      "optEn": [
        "Subsidizing massive new mega-mall developments in outer suburbs",
        "Prohibiting citizens from buying fresh produce in grocery stores",
        "Freezing suburban shopping park expansion and renovating downtowns",
        "Forcing all downtown retail shopkeepers to close daily at 3:00 PM"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur la santé auditive",
      "text": "SANTÉ PUBLIQUE — BULLETIN D'AUDITION : LES RISQUES LIÉS À L'ÉCOUTE PROLONGÉE DE MUSIQUE AU CASQUE.\n\nL'usage quotidien et prolongé d'écouteurs et de casques audio à un volume élevé provoque une usure prématurée des cellules ciliées de l'oreille interne chez les adolescents et jeunes adultes. Ces lésions auditives irréversibles se traduisent par l'apparition précoce d'acouphènes (sifflements permanents) et une perte progressive de l'acuité auditive.\n\nLes spécialistes de la santé recommandent d'appliquer la règle des 60-60 : ne pas dépasser 60 % du volume maximal de l'appareil et limiter la durée d'écoute continue à 60 minutes avant d'effectuer une pause auditive.",
      "q": "Règle de prévention préconisée par les ORL pour préserver l'audition :",
      "opt": [
        "Écouter de la musique au volume maximum uniquement pendant 4 heures",
        "Dormir chaque nuit en gardant son casque audio allumé",
        "Ne plus jamais écouter de musique ni aller dans des salles de concert",
        "Limiter le volume à 60 % du maximum et faire une pause après 60 minutes"
      ],
      "ans": 3,
      "passEn": "PUBLIC HEALTH — AUDIOLOGY BULLETIN: RISKS OF PROLONGED HIGH-VOLUME HEADPHONE LISTENING.\n\nDaily high-volume headphone listening causes premature inner ear hair cell damage among teens and young adults. Irreversible auditory damage triggers early-onset tinnitus (constant ringing) and progressive hearing loss.\n\nAudiologists recommend the 60-60 rule: keep volume under 60% of maximum and limit continuous listening to 60 minutes before taking an auditory break.",
      "qEn": "Prevention rule recommended by audiologists to protect hearing health:",
      "optEn": [
        "Listening at maximum volume for 4 continuous hours strictly",
        "Sleeping overnight with audio headphones powered on and playing",
        "Banning all music listening and concert attendance permanently",
        "Limiting volume to 60% of maximum and taking a break after 60 minutes"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la gestion des déchets",
      "text": "ÉCOLOGIE URBAINE — REVUE DU RECYCLAGE : LA MISE EN PLACE DU TRI SÉLECTIF DÉLIÉS AUX DÉCHETS ALIMENTAIRES.\n\nDans le cadre de la loi sur la transition écologique, le tri à la source et la valorisation des biodéchets (épluchures, restes de repas, déchets de jardin) deviennent obligatoires pour tous les ménages. Les collectivités mettent à disposition des bacs de compostage individuel ou déploient des bornes d'apport volontaire réservées aux déchets organiques dans les quartiers dense.\n\nTransformés en compost agricole fertiles ou en méthanisation pour produire du gaz vert, ces biodéchets ne sont plus incinérés inutilement, réduisant ainsi l'empreinte carbone collective.",
      "q": "Bénéfice écologique du tri et de la valorisation des déchets organiques :",
      "opt": [
        "La production de compost agricole ou de gaz vert au lieu de l'incinération",
        "L'augmentation du volume de déchets envoyés à l'incinération municipale",
        "La suppression de l'obligation de trier le verre et le papier carton",
        "La hausse des factures d'enlèvement des ordures pour tous les foyers"
      ],
      "ans": 0,
      "passEn": "URBAN ECOLOGY — RECYCLING REVIEW: IMPLEMENTING MANDATORY FOOD WASTE SORTING.\n\nUnder green transition laws, source sorting of organic waste (food scraps, yard waste) is mandatory for all households. Cities provide home composting bins or set up organic drop-off kiosks in dense residential areas.\n\nRepurposed into agricultural compost or biogas via anaerobic digestion, organic waste is no longer incinerated, cutting collective carbon footprints.",
      "qEn": "Ecological benefit of sorting and repurposing household organic waste:",
      "optEn": [
        "Producing agricultural compost or green biogas instead of incineration",
        "Increasing waste volumes sent to municipal waste incinerators",
        "Eliminating mandatory sorting for glass, paper, and cardboard",
        "Surging household garbage collection utility bills for all residents"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur la mobilité durable",
      "text": "TRANSPORTS ET CLIMAT — BULLETIN DE LA MOBILITÉ DOUCE : LE DÉVELOPPEMENT DES VOIES DE COVOITURAGE DÉDIÉES.\n\nAfin de désengorger les accès autoroutiers aux grandes métropoles durant les heures de pointe, les directions des routes créent des voies de circulation réservées aux véhicules de covoiturage (transportant au moins deux personnes), aux transports en commun et aux voitures électriques.\n\nContrôlées par des radars thermiques intelligents capables de compter le nombre d'occupants dans l'habitable, ces voies spécifiques permettent de fluidifier le trafic tout en incitant financièrement et moralement les automobilistes à partager leurs trajets quotidiens.",
      "q": "Moyen technique utilisé pour contrôler le respect des voies de covoiturage réservées :",
      "opt": [
        "La présence permanente de barrages de police à chaque kilomètre",
        "Des radars thermiques intelligents comptant les occupants dans l'habitable",
        "L'interdiction d'emprunter l'autoroute pour les véhicules d'occasion",
        "L'obligation d'installer une puce GPS dans chaque voiture particulière"
      ],
      "ans": 1,
      "passEn": "TRANSIT AND CLIMATE — SUSTAINABLE MOBILITY BULLETIN: DEDICATED CARPOOLING HIGHWAY LANES.\n\nRelieving rush-hour highway traffic entering major cities, transit authorities are adding dedicated lanes for carpools (carrying 2+ passengers), buses, and electric vehicles.\n\nMonitored by smart thermal cameras that count vehicle occupants, these dedicated lanes speed up traffic flow while rewarding drivers who share daily commutes.",
      "qEn": "Technical method used to monitor compliance on dedicated carpooling lanes:",
      "optEn": [
        "Permanent police checkpoints stationed at every highway kilometer",
        "Smart thermal cameras counting vehicle occupants inside the cabin",
        "Prohibiting pre-owned vehicles from driving on highways entirely",
        "Mandating installation of GPS tracking chips inside private cars"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la préservation du littoral",
      "text": "AMÉNAGEMENT CÔTIER — REVUE DE GEOGRAPHIE LITTORALE : LA RECULADE STRATÉGIQUE FACE À L'ÉROSION CÔTIÈRE.\n\nL'élévation du niveau de la mer et la répétition des tempêtes côtières accélèrent l'érosion des falaises et le recul du trait de côte sur de nombreux littoraux. Face à l'inefficacité à long terme des digues en béton coûteuses à entretenir, certaines communes littorales adoptent la stratégie de la 'gestion souple du trait de côte' ou 'repli stratégique'.\n\nCette démarche consiste à déplacer progressivement les infrastructures privées et publiques exposées vers l'intérieur des terres, permettant au littoral de retrouver sa dynamique naturelle d'absorption des vagues.",
      "q": "Principe de la stratégie de 'repli stratégique' sur les côtes menacées :",
      "opt": [
        "Construire des digues en béton de 20 mètres de haut sur toute la côte",
        "Interdire définitivement l'accès des plages aux résidents locaux",
        "Déplacer progressivement les bâtiments exposés vers l'intérieur des terres",
        "Pomper l'eau de mer pour faire baisser le niveau mondial des océans"
      ],
      "ans": 2,
      "passEn": "COASTAL PLANNING — COASTAL GEOGRAPHY REVIEW: STRATEGIC RETREAT FROM COASTAL EROSION.\n\nRising sea levels and intense coastal storms accelerate cliff erosion and shoreline retreat. Facing the long-term futility of expensive concrete seawalls, coastal towns are adopting 'managed retreat' strategies.\n\nThis approach gradually moves vulnerable public and private infrastructure inland, allowing shorelines to regain natural wave-absorption dynamics.",
      "qEn": "Principle of 'managed retreat' strategies on threatened coastlines:",
      "optEn": [
        "Building 20-meter high concrete seawalls along entire coastlines",
        "Banning local residents from accessing public beaches permanently",
        "Gradually relocating vulnerable buildings further inland away from shores",
        "Pumping seawater inland to artificially lower global ocean levels"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la rénovation énergétique",
      "text": "LOGEMENT ET ÉNERGIE — BULLETIN DU BÂTIMENT DURABLE : LA RENOVA TION ÉNERGÉTIQUE GLOBALE DES COPROPRIÉTÉS.\n\nLa lutte contre les passoires thermiques dans le parc de logements collectifs privés exige d'abandonner les travaux d'isolation morcelés au profit de rénovations énergétiques globales. En isolant simultanément les façades, la toiture et en remplaçant les chaudières collectives obsolètes, les copropriétés réalisent des gains d'efficacité spectaculaires pouvant atteindre 60 % d'économie d'énergie.\n\nPour financer ces chantiers d'envergure, les aides publiques de l'État s'accompagnent de prêts à taux zéro remboursables directement sur les économies de charges réalisées par les résidents.",
      "q": "Avantage majeur de la rénovation énergétique globale des immeubles :",
      "opt": [
        "La hausse de 50 % de la consommation de chauffage individuel",
        "La suppression de l'obligation de payer les factures d'électricité",
        "L'obligation d'évacuer son appartement pendant toute la durée des travaux",
        "Des gains d'efficacité massifs pouvant atteindre 60 % d'économie d'énergie"
      ],
      "ans": 3,
      "passEn": "HOUSING AND ENERGY — SUSTAINABLE BUILDING BULLETIN: COMPREHENSIVE CONDO ENERGY RETROFITS.\n\nEliminating energy-inefficient apartment buildings requires moving from piecemeal fixes to comprehensive retrofits. Simultaneously insulating facades and roofs while replacing old boilers delivers efficiency gains up to 60% energy savings.\n\nFunding these major retrofits, state subsidies pair with zero-interest loans repaid directly through residents' reduced monthly utility bills.",
      "qEn": "Major advantage of comprehensive energy retrofits for apartment buildings:",
      "optEn": [
        "Surge of 50% in individual household heating energy consumption",
        "Eliminating obligations to pay monthly electric utility bills",
        "Mandatory requirements to vacate apartments throughout construction",
        "Massive efficiency gains reaching up to 60% in energy savings"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 29,
      "level": "B2",
      "docType": "Article sur l'emploi des jeunes",
      "text": "INSERTION PROFESSIONNELLE — REVUE DU MARCHÉ DU TRAVAIL : L'APPRENTISSAGE COMME TREMPLIN VERS L'EMPLOI DURABLE.\n\nLa réforme de l'apprentissage et le développement des formations en alternance du CAP au diplôme d'ingénieur ont profondément revalorisé cette voie de formation professionnelle. En combinant enseignements théoriques en centre de formation et immersion pratique rémunérée en entreprise, l'alternance garantit un taux d'insertion professionnelle remarquable dès l'obtention du diplôme.\n\nLes entreprises plébiscitent ce mode de recrutement qui leur permet de former sur mesure leurs futurs collaborateurs aux compétences spécifiques de leur secteur.",
      "q": "Atout majeur de la formation en alternance souligné par l'article :",
      "opt": [
        "Une immersion pratique rémunérée garantissant un fort taux d'embauche",
        "L'absence complète de cours théoriques dispensés à l'école",
        "L'obligation pour les apprentis de travailler sans aucune rémunération",
        "La possibilité d'obtenir un diplôme sans jamais aller en entreprise"
      ],
      "ans": 0,
      "passEn": "JOB INCLUSION — LABOR MARKET REVIEW: APPRENTICESHIPS AS STEPPING STONES TO LASTING JOBS.\n\nApprenticeship reforms and work-study degree options expanded vocational training appeals. Combining classroom theory with paid hands-on corporate immersion, work-study programs ensure high job placement rates upon graduation.\n\nEmployers favor work-study hiring as it allows tailored training for future staff in sector-specific skills.",
      "qEn": "Major asset of work-study vocational training highlighted in the article:",
      "optEn": [
        "Paid hands-on corporate immersion ensuring high job placement rates",
        "Complete absence of classroom academic instruction at school",
        "Mandatory requirements for apprentices to work without compensation",
        "Opportunities to earn degrees without ever stepping foot in a company"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial de philosophie politique",
      "text": "PHILOSOPHIE POLITIQUE — TRIBUNE DU DEBAT DÉMOCRATIQUE : LE DANGER DU POPULISME ALGORITHMIQUE ET LA DISSOLUTION DE LA DÉLIBÉRATION.\n\nL'adaptation du discours politique aux logiques de fonctionnement des plateformes de réseaux sociaux opère une altération dramatique de la délibération démocratique. En soumettant la communication publique aux algorithmes de recommandation conçus pour susciter l'indignation et la polarisation partisane, le débat politique se trouve réduit à des affrontements de slogans viraux et à des caricatures d'idées. La nuance conceptuelle et le compromis républicain sont systématiquement pénalisés par un système d'information qui récompense la véhémence verbale et le clash médiatique.\n\nCette dérive vers un populisme algorithmique affaiblit les fondements de la citoyenneté éclairée. En habituant l'opinion publique à réagir sous l'empire de l'émotion immédiate plutôt que d'analyser la complexité des faits politiques, le modèle numérique dissout la possibilité d'une communauté de débat fondée sur la raison critique. Reconstruire la démocratie exige d'imposer des régulations strictes à la captation attentionnelle et de réhabiliter la confrontation d'idées argumentée.",
      "q": "Quelle dérive majeure l'auteur dénonce-t-il au sujet de l'usage des réseaux sociaux en politique ?",
      "opt": [
        "Le coût excessif des abonnements internet pour les partis politiques",
        "La réduction du débat public à la véhémence émotionnelle et aux slogans viraux",
        "L'obligation légale pour les politiciens de publier leurs livres en format numérique",
        "La fermeture définitive des parlements et des assemblées démocratiques"
      ],
      "ans": 1,
      "passEn": "POLITICAL PHILOSOPHY — DEMOCRATIC DEBATE ESSAY: ALGORITHMIC POPULISM AND DEBATE EROSION.\n\nAdapting political discourse to social media algorithms dramatically alters democratic public deliberation. Subjecting public communication to recommendation algorithms designed for outrage and partisan polarization reduces political debate to viral sound bites and caricatures. Nuance and compromise are penalized by systems rewarding verbal hostility.\n\nThis drift toward algorithmic populism weakens informed citizenship foundations. Conditioning public opinion to react emotionally rather than analyze policy facts, digital models dissolve critical public debate communities. Rebuilding democracy demands strict regulations on attention capture and championing reasoned policy debate.",
      "qEn": "What major drift does the author denounce regarding social media usage in politics?",
      "optEn": [
        "Excessive internet subscription costs for political party organizations",
        "Shrinking public debate to emotional hostility and viral sound bites",
        "Legal mandates requiring politicians to publish books in digital formats",
        "Permanent closure of democratic parliamentary assemblies"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai de sociologie de la culture",
      "text": "SOCIOLOGIE DU PATRIMOINE — CAHIERS D'ESTHÉTIQUE URBAINE : LA MARCHANDISATION DU DÉCOR HISTORIQUE ET L'ÉVIDEMENT CULTUREL.\n\nLa politique de préservation patrimoniale menée dans les centres historiques des grandes métropoles mondialisées s'accompagne d'un paradoxe sociologique troublant. En transformant des quartiers anciens en zones touristiques et commerciales exclusives, les municipalités parviennent à restaurer magnifiquement les façades et le décor architectural du passé. Toutefois, cette restauration de surface s'effectue au prix de l'expulsion des populations populaires historiques et des commerces traditionnels au profit de chaînes de luxe interchangeables.\n\nCette marchandisation du patrimoine réduit l'espace urbain à une pure valeur de consommation visuelle pour visiteurs de passage. Le quartier conserve son enveloppe historique extérieure mais perd son âme sociologique et sa mémoire vivante. Sous couvert de valorisation culturelle, cette muséification stérile aliène l'identité des citadins et transforme la ville en un parc d'attractions théâtralisé déconnecté de la vie réelle.",
      "q": "Comment l'auteur caractérise-t-il la transformation des quartiers historiques restaurés ?",
      "opt": [
        "Un enrichissement culturel durable profitant équitablement à tous les habitants",
        "La destruction complète des monuments anciens pour construire des tours en verre",
        "Un évidement sociologique remplaçant la mémoire vivante par un décor marchand",
        "Une mesure écologique indispensable pour supprimer la pollution routière"
      ],
      "ans": 2,
      "passEn": "CULTURAL SOCIOLOGY — URBAN AESTHETICS PAPERS: HISTORIC DECOR COMMERCIALIZATION AND CULTURAL EMPTYING.\n\nHeritage preservation policies in historic centers of global cities carry a troubling sociological paradox. Transforming ancient quarters into exclusive tourist zones, cities restore historic facades magnificently. However, surface restoration comes at the price of displacing working-class populations and traditional shops for luxury chains.\n\nThis heritage commercialization reduces urban space to visual consumption for transient tourists. Quarters retain historic shells but lose sociological souls and living memory. Beneath cultural preservation, sterile museumification alienates resident identity, turning cities into staged theme parks detached from real life.",
      "qEn": "How does the author characterize turning restored historic quarters into tourist spaces?",
      "optEn": [
        "Lasting cultural enrichment benefiting all residents equitably",
        "Complete demolition of historic monuments to erect glass skyscrapers",
        "Sociological emptying replacing living memory with commercial staging",
        "Indispensable ecological measure to eliminate road pollution entirely"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse sur la théorie de la connaissance",
      "text": "ÉPISTÉMOLOGIE DE LA RECHERCHE — REVUE DES SCIENCES HUMAINES : L'ILLUSION DE L'OMNISCIENCE ALGORITHMIQUE ET LA PERTE DE LA SÉRÉNDIPITÉ.\n\nL'utilisation généralisée des algorithmes de recommandation et du traitement des données massives dans la recherche scientifique et documentaire transforme profondément les modalités d'accès à la connaissance. En orientant l'usager vers des contenus strictement calibrés selon ses préférences antérieures, les systèmes intelligents prétendent offrir une efficacité d'information maximale. Cependant, cette personnalisation algorithmique enferme le chercheur dans des 'bulles de filtres' cognitifs qui restreignent la confrontation féconde à l'inattendu.\n\nCette disparition de la sérénité — cette faculté de faire des découvertes heureuses et imprévues en s'égarant hors des sentiers battus — appauvrit la dynamique de l'invention scientifique. La véritable innovation intellectuelle émerge fréquemment de rapprochements imprévus entre des domaines disciplinaires éloignés, que l'optimisation algorithmique a tendance à éliminer systématiquement de ses suggestions.",
      "q": "Quel risque majeur l'auteur attribue-t-il à la personnalisation algorithmique de l'information ?",
      "opt": [
        "L'augmentation incontrôlable des coûts d'accès aux bases de données universitaires",
        "La baisse du niveau d'exigence des diplômes universitaires de recherche",
        "L'interdiction de publier des articles scientifiques dans des revues imprimées",
        "L'enfermement cognitif et la perte de la sérénité indispensable à l'innovation"
      ],
      "ans": 3,
      "passEn": "RESEARCH EPISTEMOLOGY — HUMAN SCIENCES REVIEW: ALGORITHMIC OMNISCIENCE ILLUSIONS AND SERENDIPITY LOSS.\n\nWidespread reliance on recommendation algorithms and big data in research alters knowledge access. Guiding users to content tailored to past preferences, smart systems claim optimal information efficiency. However, algorithmic customization traps researchers in cognitive filter bubbles, blocking unexpected insights.\n\nThis loss of serendipity—the ability to make fortunate unexpected discoveries by straying off paths—impoverishes scientific innovation. True intellectual breakthroughs emerge from unforeseen connections across disciplines, which algorithmic optimization systematically eliminates.",
      "qEn": "What major risk does the author link to algorithmic customization of information?",
      "optEn": [
        "Uncontrolled surges in university database access subscription fees",
        "Declining academic qualification standards for doctoral research degrees",
        "Prohibitions against publishing scientific papers in printed journals",
        "Cognitive enclosure and loss of serendipity vital for scientific innovation"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai de sociologie du travail",
      "text": "SOCIOLOGIE DU TRAVAIL — CAHIERS DE L'ÉCONOMIE CRITIQUE : LE MYTHE DU TRAVAILLEUR INDÉPENDANT LIBRE DANS L'ÉCONOMIE DES PLATEFORMES.\n\nLe discours promotionnel de l'économie des plateformes numériques célèbre la figure du travailleur indépendant comme l'incarnation de l'autonomie moderne, débarrassée des contraintes de la hiérarchie salariale traditionnelle. Libre de choisir ses horaires et sa charge de travail, l'auto-entrepreneur plateforme est présenté comme le maître de sa trajectoire professionnelle. Toutefois, l'analyse sociologique des conditions de travail réelles dément ce récit lénifiant.\n\nEn réalité, la subordination salariale classique se trouve remplacée par un contrôle algorithmique opaque et impitoyable. Soumis à la fixation unilatérale des tarifs, aux sanctions de déconnexion automatique et à la concurrence exacerbée entre paires, ces travailleurs subissent une précarisation aiguë sans bénéficier des protections sociales collectives du salariat. Reconquérir des droits fondamentaux exige une syndicalisation renforcée et des régulations publiques contraignantes.",
      "q": "Quelle réalité sociologique l'auteur oppose-t-il au mythe de l'autonomie du travailleur de plateforme ?",
      "opt": [
        "Un contrôle algorithmique opaque combiné à une précarité sans protection sociale",
        "Un niveau de salaire cinq fois supérieur au salaire moyen national",
        "L'obligation de travailler exclusivement dans les locaux de l'entreprise",
        "L'obtention automatique d'une retraite à taux plein après deux ans de travail"
      ],
      "ans": 0,
      "passEn": "LABOR SOCIOLOGY — CRITICAL ECONOMICS PAPERS: THE FREELANCE AUTONOMY MYTH IN PLATFORM WORK.\n\nPR campaigns for digital platforms celebrate platform freelancers as modern autonomous workers free from traditional corporate hierarchy. Choosing schedules and workloads, freelancers are framed as masters of their careers. However, sociological analysis of real working conditions debunks this smooth story.\n\nTraditional employment subordination is replaced by opaque, ruthless algorithmic control. Subject to unilateral rate settings, automated disconnection penalties, and fierce peer competition, platform workers endure precarity stripped of collective labor protections. Reclaiming rights requires unionization.",
      "qEn": "What sociological reality does the author oppose to platform worker autonomy myths?",
      "optEn": [
        "Opaque algorithmic control combined with precarity lacking social safety nets",
        "Average earnings five times higher than national median salary levels",
        "Requirements to work physically inside corporate offices strictly",
        "Automatic full pension benefits awarded after two years of platform work"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 34,
      "level": "C1",
      "docType": "Réflexion sur l'écologie industrielle",
      "text": "ÉCOLOGIE INDUSTRIELLE — REVUE DE LA TRANSITION PRODUCTIVE : LE PARADOXE DU RECYCLAGE ET L'ILLUSION DE LA CONSOMMATION SANS FIN.\n\nLa promotion intensive du recyclage comme solution idéale à la gestion des déchets industriels et ménagers fait l'objet d'une analyse critique croissante chez les économistes de l'environnement. En présentant le recyclage comme un geste garantissant la réutilisation infinie des matières premières, le discours marchand déculpabilise le consommateur et valide la poursuite de l'hyperconsommation de produits jetables.\n\nOr, le recyclage industriel consomme lui-même des quantités massives d'énergie et de produits chimiques, tout en entraînant une perte de qualité progressive des matériaux recyclés (décyclage). Prétendre résoudre la crise des ressources par le seul recyclage sans réduire la production à la source constitue un mirage qui perpétue le gaspillage productiviste. La vraie sobriété exige la réduction impérative à la source et le réemploi.",
      "q": "Pourquoi le seul recyclage ne suffit-il pas à résoudre la crise des ressources selon l'auteur ?",
      "opt": [
        "Parce que le recyclage est une technologie totalement interdite dans les pays développés",
        "Parce qu'il consomme beaucoup d'énergie et déculpabilise l'hyperconsommation sans réduire la production",
        "Parce que les citoyens refusent catégoriquement de trier leurs déchets ménagers",
        "Parce que les matériaux recyclés coûtent dix fois plus cher que les matières vierges"
      ],
      "ans": 1,
      "passEn": "INDUSTRIAL ECOLOGY — MANUFACTURING TRANSITION REVIEW: RECYCLING PARADOXES AND UNLIMITED CONSUMPTION.\n\nPromoting recycling as the ideal waste management solution faces growing criticism among environmental economists. Framing recycling as infinite material reuse dampens consumer guilt and validates continuous hyperconsumption of disposables.\n\nHowever, industrial recycling consumes massive energy and chemicals while degrading material quality (downcycling). Claiming recycling alone solves resource crises without cutting production at the source is a mirage sustaining productivist waste. True sustainability demands source reduction.",
      "qEn": "Why is recycling alone insufficient to solve resource crises according to the author?",
      "optEn": [
        "Because recycling technology is strictly prohibited across developed nations",
        "Because it consumes heavy energy and excuses hyperconsumption without cutting output",
        "Because citizens categorically refuse to sort household garbage at home",
        "Because recycled materials cost ten times more than virgin raw materials"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai d'esthétique et de philosophie",
      "text": "ESTHÉTIQUE DU PAYSAGE — CAHIERS DE LA DÉCOUVERTE PATRIMONIALE : LA DÉNATURATION DES PAYSAGES PAR LA STANDARDISATION VISUELLE.\n\nL'aménagement contemporain des périphéries urbaines et des entrées de villes offre le spectacle d'une uniformisation esthétique particulièrement désolante. La prolifération de zones commerciales aux architectures de tôles métalliques, de panneaux publicitaires lumineux et de ronds-points standardisés efface la singularité des identités paysagères régionales au profit d'un paysage générique mondialisé.\n\nCette laideur ordinaire dégrade le cadre de vie quotidien et altère la relation sensible et affective des habitants à leur territoire d'origine. Réenchanter le paysage exige de dépasser la seule logique du rendement foncier marchand pour réimposer des exigences d'harmonie architecturale, de sobriété visuelle et d'intégration paysagère respectueuses de l'histoire locale et du patrimoine environnant. Préserver le cadre de vie exige d'encadrer impérativement l'extension commerciale périurbaine par des Chartes d’Aménagement Paysager régionales contraignantes.",
      "q": "Quelle critique l'auteur formule-t-il à l'encontre de l'aménagement des périphéries urbaines ?",
      "opt": [
        "Son coût de construction excessif qui ruine les communes locales",
        "L'interdiction absolue d'y implanter des commerces de grande distribution",
        "L'uniformisation esthétique et la perte de l'identité paysagère régionale",
        "Son manque d'éclairage nocturne qui empêche la circulation des véhicules"
      ],
      "ans": 2,
      "passEn": "LANDSCAPE AESTHETICS — HERITAGE DISCOVERY PAPERS: LANDSCAPE DEGRADATION VIA VISUAL STANDARDIZATION.\n\nModern urban fringe developments present depressing aesthetic uniformity. Proliferating retail parks with corrugated metal architecture, illuminated billboards, and generic roundabouts erase unique regional landscape identities in favor of generic global landscapes.\n\nThis mundane ugliness degrades daily living environments and alters residents' sensory connection to their land. Re-enchanting landscapes requires moving beyond commercial real estate yields to enforce architectural harmony respectful of local history and heritage. Protecting living environments requires binding regional landscaping charters.",
      "qEn": "What critique does the author level against suburban fringe development?",
      "optEn": [
        "Excessive construction costs that bankrupt local municipal councils",
        "Absolute prohibition against building retail shopping parks",
        "Aesthetic uniformity and loss of unique regional landscape identity",
        "Lack of night streetlighting preventing vehicle traffic flow"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique contemporaine",
      "text": "PHILOSOPHIE SOCIALE — ANNALES DE LA PENSÉE CONTEMPORAINE : LA TYRANNIE DE LA TRANSPARENCE ET LA DESTRUCTION DE L'INTIMITÉ.\n\nL'injonction contemporaine à la transparence intégrale — encouragée par l'exposition permanente de soi sur les réseaux sociaux et la surveillance numérique généralisée — opère une altération profonde de la subjectivité humaine. En érigeant la mise en scène publique de la vie privée en norme de sociabilité désirable, la culture numérique dominante dissout la frontière protectrice entre l'espace intime et la sphère publique. L'individu se trouve incité à convertir ses sentiments, ses doutes et ses secrets en contenus consommables et évaluables par des pairs anonymes.\n\nCette tyrannie de la transparence mène à une véritable atrophie de l'intériorité. En traquant le secret et l'ombre au nom de l'authenticité affichée, le modèle numérique prive l'esprit de l'espace de réserve et de jardin secret indispensable à l'élaboration d'une pensée autonome. Reconquérir la liberté individuelle exige d'affirmer le droit au secret et à l'opacité contre l'exhibitionnisme marchande de la société du spectacle.",
      "q": "Quelle thèse centrale l'auteur défend-il quant au droit au secret et à l'intimité ?",
      "opt": [
        "Ils constituent des obstacles au développement de la sécurité publique nationale",
        "Ils doivent être strictement interdits par la loi dans les sociétés modernes",
        "Ils favorisent la propagation des maladies psychologiques chez les adolescents",
        "Ils représentent des espaces de réserve indispensables à l'élaboration de la pensée autonome"
      ],
      "ans": 3,
      "passEn": "SOCIAL PHILOSOPHY — CONTEMPORARY THOUGHT ANNALS: TYRANNY OF TRANSPARENCY AND INTIMACY LOSS.\n\nModern transparency imperatives—fueled by social media self-exposure and digital surveillance—alter human subjectivity. Framing public display of private life as desirable social norms, dominant digital culture dissolves protective boundaries between intimate and public spheres. Individuals are incentivized to turn emotions, doubts, and secrets into consumable content rated by peers.\n\nThis transparency tyranny leads to inner life atrophy. Hunting down secrets in the name of displayed authenticity, digital models strip minds of private reserves essential for autonomous thought. Reclaiming individual freedom requires defending rights to privacy over commercial exhibitionism.",
      "qEn": "What central thesis does the author defend regarding rights to privacy and secrecy?",
      "optEn": [
        "Representing obstacles to expanding national public safety security",
        "Requiring strict legal bans across all modern democratic societies",
        "Fostering the spread of psychological illness among teenagers",
        "Representing essential private reserves vital for cultivating autonomous thought"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie critique",
      "text": "ÉPISTÉMOLOGIE DES SCIENCES — REVUE DE PHILOSOPHIE CONTEMPORAINE : LA RÉDUCTION QUANTITATIVE DU RÉEL ET LA PERTE DE LA QUALITÉ VÉCUE.\n\nLa domination exclusive de la méthode quantitative et de l'ingénierie statistique dans les sciences humaines et la gestion publique opère une réification pernicieuse de la réalité sociale. En prétendant traduire l'intégralité de l'expérience humaine — de la santé à l'éducation en passant par la création artistique — en métriques chiffrées et en indicateurs de performance, le paradigme positiviste évacue la dimension qualitative, la complexité vécue et la singularité des situations humaines.\n\nCette réduction comptable du réel crée une véritable cécité institutionnelle. En refusant d'accorder une valeur épistémologique au témoignage subjectif et au récit qualitatif, le système de gestion technocratique prend des décisions rationnelles sur le plan comptable mais profondément absurdes et déshumanisantes sur le plan de l'existence concrète. Restaurer la rigueur de l'analyse exige de réhabiliter l'herméneutique qualitative aux côtés de la mesure chiffrée.",
      "q": "Quel danger consubstantiel à la domination de la méthode quantitative est dénoncé par l'auteur ?",
      "opt": [
        "La réduction comptable du réel évacuant la complexité vécue et déshumanisant les décisions",
        "La hausse des coûts d'acquisition des calculateurs informatiques",
        "L'interdiction légale pour les scientifiques d'utiliser les mathématiques",
        "L'abandon complet des statistiques dans les études démographiques"
      ],
      "ans": 0,
      "passEn": "SCIENCE EPISTEMOLOGY — CONTEMPORARY PHILOSOPHY REVIEW: QUANTITATIVE REDUCTION OF REALITY.\n\nDominance of quantitative methods and statistical engineering across social sciences and public management works a pernicious reification of social reality. Claiming to reduce human experience—from health to education and art—into numerical metrics and performance indicators, positivism discards qualitative dimensions and lived human complexity.\n\nThis accounting reduction of reality creates institutional blindness. Rejecting qualitative narratives, technocratic systems make decisions logically sound on paper but absurd and dehumanizing in lived reality. Restoring analytical rigor demands re-establishing qualitative hermeneutics alongside numerical measurement.",
      "qEn": "What danger inherent to quantitative method dominance is denounced by the author?",
      "optEn": [
        "Accounting reduction of reality discarding lived complexity and dehumanizing choices",
        "Surges in purchasing costs for high-performance computing hardware",
        "Legal prohibitions preventing scientists from employing mathematics",
        "Complete abandonment of statistics across demographic population studies"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion d'anthropologie de la mémoire",
      "text": "ANTHROPOLOGIE DE LA MÉMOIRE — CAHIERS HUMANISTES : L'AMNÉSIE DU PRÉSENTISME ET LA DÉPOSSESSION DU FUTUR.\n\nLe concept de 'présentisme' caractérise la condition temporelle contemporaine dans laquelle le présent, dilaté par les technologies de l'immédiateté numérique et l'urgence de l'actualité permanente, s'est totalement déconnecté de la profondeur historique. En coupant les communautés humaines de l'héritage d'un passé devenu illisible et en les privant de la capacité à concevoir un projet d'avenir émancipateur à long terme, le système marchande enferme l'existence dans une gestion frénétique du statu quo.\n\nCette asphyxie de la conscience prospective paralyse toute action politique transformationnelle. En présentant l'ordre économique existant comme l'unique horizon possible, le présentisme condamne la société à la résignation et à la répétition. Réenchanter l'engagement citoyen exige d'interrompre le flux de l'immédiateté pour réinsérer l'action humaine dans la durée historique et la vision prospective.",
      "q": "Quelle critique centrale l'auteur formule-t-il à l'encontre du phénomène du 'présentisme' ?",
      "opt": [
        "Il ralentit excessivement le rythme des échanges commerciaux internationaux",
        "Il enferme la société dans un présent perpétuel qui paralyse toute vision prospective d'avenir",
        "Il oblige les citoyens à consacrer leur temps à l'étude des civilisations anciennes",
        "Il supprime la possibilité d'utiliser des outils de communication modernes"
      ],
      "ans": 1,
      "passEn": "MEMORY ANTHROPOLOGY — HUMANIST PAPERS: PRESENTISM AMNESIA AND FUTURE DEPRIVATION.\n\n'Presentism' describes contemporary temporal conditions where the present, expanded by digital immediacy and constant news urgency, severs ties with historical depth. Cutting human communities off from past heritage and long-term future projects, market systems lock existence into managing the status quo.\n\nThis suffocation of prospective consciousness paralyzes transformative political action. Framing current economic orders as sole possible horizons, presentism dooms society to resignation. Re-enchanting civic engagement requires interrupting immediacy to re-embed human action into historical duration.",
      "qEn": "What central critique does the author level against the phenomenon of 'presentism'?",
      "optEn": [
        "Excessively slowing the pace of international commercial trade exchanges",
        "Locking society in a perpetual present paralyzing long-term future vision",
        "Forcing citizens to dedicate their time to studying ancient civilizations",
        "Eliminating opportunities to utilize modern digital communication tools"
      ]
    },
    {
      "paperNum": 6,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai philosophique sur le langage",
      "text": "PHILOSOPHIE DU LANGAGE — REVUE D'ÉTUDES LITTÉRAIRES : LA RÉSISTANCE POÉTIQUE FACE À LA NORMALISATION DU LANGAGE UTILITAIRE.\n\nL'invasion de la sphère publique et des échanges quotidiens par le jargon technocratique et la communication marchande opère un appauvrissement insidieux de la langue naturelle. En réduisant le verbe à des slogans lénifiants, des anglicismes fonctionnels et des acronymes étanches conçus pour l'efficacité opérationnelle immédiate, le prêt-à-penser marchand prive le sujet pensant des nuances lexicales nécessaires pour exprimer la complexité du monde intérieur et social.\n\nFace à cette normalisation utilitaire qui étouffe la pensée critique, la création poétique et littéraire constitue un acte de résistance ontologique majeur. En travaillant la langue dans sa charge subversive, son ambiguïté créatrice et sa mémoire historique, la poésie restitue au mot sa puissance d'évocation et offre à l'esprit humain le moyen de préserver sa liberté réflexive contre le conformisme du discours dominant.",
      "q": "Selon l'auteur, quelle fonction essentielle remplit la création poétique face au jargon utilitaire ?",
      "opt": [
        "Elle permet d'apprendre la grammaire commerciale pour rédiger des publicités efficaces",
        "Elle oblige les lecteurs à traduire tous les textes littéraires en langues étrangères",
        "Elle constitue un acte de résistance restituant au mot sa charge subversive et sa liberté",
        "Elle sert à simplifier les romans pour les rendre accessibles aux enfants"
      ],
      "ans": 2,
      "passEn": "LANGUAGE PHILOSOPHY — LITERARY STUDIES REVIEW: POETIC RESISTANCE TO UTILITARIAN LANGUAGE.\n\nThe invasion of public discourse by technocratic jargon and corporate marketing insidiously impoverishes natural language. Reducing speech to soothing slogans, functional Anglicisms, and rigid acronyms engineered for instant operational efficiency deprives thinking subjects of lexical nuance needed to express complex inner and social reality.\n\nFacing utilitarian normalization that suffocates critical thought, poetic creation stands as a major act of ontological resistance. Working language through subversive depth, creative ambiguity, and historic memory, poetry restores evocative power to words, preserving reflective freedom against conformist discourse.",
      "qEn": "According to the author, what essential function does poetic creation fulfill against utilitarian jargon?",
      "optEn": [
        "Teaching corporate grammar to write effective commercial advertisements",
        "Requiring readers to translate all literary works into foreign languages",
        "Standing as an act of resistance restoring subversive depth and freedom to words",
        "Simplifying classic novels to make them accessible for young children"
      ]
    }
  ],
  [
    {
      "paperNum": 7,
      "qNum": 1,
      "level": "A1",
      "docType": "Annonce d'épicerie fine",
      "text": "MARCHÉ DU PORT — DÉGUSTATION DE FROMAGES : Venez déguster gratuitement nos spécialités régionales ce samedi de 10h00 à 13h00. Remise de 15 % sur tout le rayon crèmerie durant la matinée.",
      "q": "Quelle offre spéciale est proposée ce samedi matin ?",
      "opt": [
        "Une remise de 15 % et des dégustations gratuites",
        "Un cours de cuisine gratuit avec un chef étoilé",
        "La distribution gratuite d'un panier de fruits",
        "La livraison à domicile offerte l'après-midi"
      ],
      "ans": 0,
      "passEn": "HARBOR MARKET — CHEESE TASTING: Enjoy free tastings of local regional specialties this Saturday from 10:00 AM to 1:00 PM. 15% discount across dairy counters all morning.",
      "qEn": "What special offer is available this Saturday morning?",
      "optEn": [
        "A 15% discount and free food tastings",
        "A free cooking class with a Michelin chef",
        "Free distribution of a fruit gift basket",
        "Free home delivery service in the afternoon"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 2,
      "level": "A1",
      "docType": "Panneau de transport en commun",
      "text": "TRANSPORTS URBAINS — LIGNE DE TRAMWAY 2 : En raison de travaux d'entretien, la station 'Place des Arts' n'est pas desservie aujourd'hui. Veuillez utiliser la station 'Hôtel de Ville' située à 300 mètres.",
      "q": "Quelle station de remplacement est conseillée aux usagers ?",
      "opt": [
        "La station 'Gare Centrale'",
        "La station 'Hôtel de Ville'",
        "La station 'Aéroport Nord'",
        "La station 'Université du Lac'"
      ],
      "ans": 1,
      "passEn": "URBAN TRANSIT — TRAM LINE 2: Due to maintenance work, 'Place des Arts' station is not served today. Please use 'Hôtel de Ville' station located 300 meters away.",
      "qEn": "Which alternative station is recommended for passengers?",
      "optEn": [
        "'Gare Centrale' station",
        "'Hôtel de Ville' station",
        "'Aéroport Nord' station",
        "'Université du Lac' station"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 3,
      "level": "A1",
      "docType": "Consigne d'hôtel",
      "text": "HÔTEL DU PARC — SERVICE DE PETIT-DÉJEUNER : Le petit-déjeuner buffet est servi en salle au rez-de-chaussée de 07h00 à 10h30. Pour un service en chambre, composez le 9 depuis le téléphone de votre chambre.",
      "q": "Comment commander le petit-déjeuner dans sa chambre ?",
      "opt": [
        "En descendant directement à l'accueil",
        "En envoyant un courriel au directeur",
        "En composant le numéro 9 sur le téléphone",
        "En remplissant un formulaire papier"
      ],
      "ans": 2,
      "passEn": "PARK HOTEL — BREAKFAST SERVICE: Buffet breakfast is served in the ground floor dining room 7:00 AM to 10:30 AM. For room service, dial 9 on your room telephone.",
      "qEn": "How can guests order breakfast in their room?",
      "optEn": [
        "By walking down to the reception desk",
        "By emailing the hotel manager directly",
        "By dialing number 9 on the room phone",
        "By filling out a paper room form"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 4,
      "level": "A1",
      "docType": "Avis de stationnement",
      "text": "PARKING MUNICIPAL — FORFAIT WEEK-END : Stationnez votre véhicule du vendredi 19h00 au lundi 08h00 pour un tarif forfaitaire unique de 10 euros. Ticket payable à la borne automatique avant la sortie.",
      "q": "Combien coûte le forfait de stationnement pour tout le week-end ?",
      "opt": [
        "5 euros",
        "20 euros",
        "15 euros",
        "10 euros"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL PARKING — WEEKEND FLAT RATE: Park your vehicle from Friday 7:00 PM to Monday 8:00 AM for a single flat rate of 10 euros. Ticket payable at kiosk prior to exit.",
      "qEn": "How much does the flat-rate parking ticket cost for the weekend?",
      "optEn": [
        "5 euros",
        "20 euros",
        "15 euros",
        "10 euros"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 5,
      "level": "A2",
      "docType": "SMS de réservation de restaurant",
      "text": "MESSAGE AUTOMATIQUE — RESTAURANT L'ARDOISE : Votre réservation pour 4 personnes ce soir à 20h00 est confirmée. Merci de nous informer au moins 1 heure à l'avance en cas d'annulation ou de modification du nombre de convives.",
      "q": "Que demande le restaurant en cas d'annulation ?",
      "opt": [
        "Prévenir au moins 1 heure avant l'heure prévue",
        "Payer l'intégralité du repas par avance",
        "Trouver d'autres clients pour remplacer la table",
        "Envoyer un justificatif médical signé"
      ],
      "ans": 0,
      "passEn": "AUTOMATED MESSAGE — L'ARDOISE RESTAURANT: Your table reservation for 4 people tonight at 8:00 PM is confirmed. Please inform us at least 1 hour in advance if canceling or changing guest numbers.",
      "qEn": "What does the restaurant request in case of cancellation?",
      "optEn": [
        "Notify at least 1 hour before scheduled time",
        "Pay for the entire meal in advance online",
        "Find replacement guests to fill the table",
        "Send a signed medical certificate"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce d'atelier bricolage",
      "text": "MAGASIN DE BRICOLAGE — ATELIER MENUISERIE DE BASE : Apprenez à fabriquer une étagère en bois massif ce samedi de 14h00 à 17h00. Matériel et bois fournis sur place. Tarif : 30 euros. Inscription obligatoire à l'accueil avant vendredi.",
      "q": "Que fabriqueront les participants durant l'atelier ?",
      "opt": [
        "Une chaise pliante pour le jardin",
        "Une étagère en bois massif personnalisée",
        "Une armoire à vêtements avec portes",
        "Une table basse pour le salon"
      ],
      "ans": 1,
      "passEn": "HARDWARE STORE — BASIC WOODWORKING WORKSHOP: Learn to build a solid wood shelf this Saturday 2:00 PM to 5:00 PM. Tools and timber provided. Price: 30 euros. Booking required at desk by Friday.",
      "qEn": "What will participants build during the workshop?",
      "optEn": [
        "A folding wooden garden chair",
        "A custom solid wood wall shelf",
        "A clothing wardrobe with doors",
        "A living room coffee table"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 7,
      "level": "A2",
      "docType": "Avis de jardin communautaire",
      "text": "JARDIN CITOYEN — RÉUNION DES ADHÉRENTS : Tous les membres du jardin partagé sont invités à l'assemblée printanière ce dimanche à 10h30. Au programme : distribution des graines bio et attribution des parcelles de potager pour la saison.",
      "q": "Quel est l'objet principal de la réunion de dimanche ?",
      "opt": [
        "Organiser la revente des légumes au marché",
        "Voter l'exclusion des membres en retard",
        "Distribuer les graines et attribuer les parcelles",
        "Détruire la serre collective pour la reconstruire"
      ],
      "ans": 2,
      "passEn": "COMMUNITY GARDEN — MEMBER MEETING: All shared garden members are invited to the spring assembly this Sunday at 10:30 AM. Program: distributing organic seeds and allocating garden plots.",
      "qEn": "What is the primary purpose of Sunday's meeting?",
      "optEn": [
        "Organizing vegetable resale at market",
        "Voting to evict late-paying members",
        "Distributing seeds and allocating plots",
        "Demolishing the collective greenhouse"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 8,
      "level": "A2",
      "docType": "Consigne d'exposition temporaire",
      "text": "MUSÉE BEAUX-ARTS — EXPOSITION SCULPTURE : Les photographies sans flash sont autorisées dans les salles d'exposition temporaire. Les sacs à dos volumineux et les parapluies doivent être déposés au vestiaire gratuit à l'entrée.",
      "q": "Quelle consigne s'applique aux sacs à dos volumineux ?",
      "opt": [
        "Ils doivent être gardés à la main durant la visite",
        "Ils sont strictement interdits dans tout le bâtiment",
        "Ils sont autorisés moyennant un supplément de 2 euros",
        "Ils doivent être déposés au vestiaire gratuit"
      ],
      "ans": 3,
      "passEn": "FINE ARTS MUSEUM — SCULPTURE EXHIBIT: No-flash photography is allowed in temporary galleries. Large backpacks and umbrellas must be deposited at the free coat check at the entrance.",
      "qEn": "What rule applies to large backpacks?",
      "optEn": [
        "They must be carried by hand in galleries",
        "Strictly banned anywhere inside the building",
        "Permitted upon paying a 2 euro extra fee",
        "They must be left at the free coat check"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 9,
      "level": "A2",
      "docType": "Message de prévention routière",
      "text": "PRÉFECTURE — SÉCURITÉ ROUTIÈRE EN MONTAGNE : Les équipements spéciaux (pneus hiver ou chaînes à neige dans le coffre) sont obligatoires sur l'ensemble du réseau routier départemental du 1er novembre au 31 mars.",
      "q": "À quelle période les équipements hiver sont-ils obligatoires ?",
      "opt": [
        "Du 1er novembre au 31 mars",
        "Du 1er décembre au 31 janvier uniquement",
        "Toute l'année sans interruption",
        "Uniquement les jours de fortes chutes de neige"
      ],
      "ans": 0,
      "passEn": "PREFECTURE — MOUNTAIN ROAD SAFETY: Special equipment (winter tires or snow chains in trunk) is mandatory across county roads November 1st through March 31st.",
      "qEn": "During what period are winter car equipments mandatory?",
      "optEn": [
        "November 1st through March 31st",
        "December 1st to January 31st exclusively",
        "Year-round continuously without break",
        "Exclusively on days with heavy snowfalls"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 10,
      "level": "A2",
      "docType": "Annonce de brocante de quartier",
      "text": "COMITÉ DE QUARTIER — VIDE-GRENIER ANNUEL : Le grand vide-grenier de printemps aura lieu ce dimanche de 07h00 à 18h00 dans la rue commerçante. Plus de 120 exposants particuliers. Buvette et restauration légère sur place.",
      "q": "Qui sont les exposants de ce vide-grenier ?",
      "opt": [
        "Des commerçants professionnels uniquement",
        "Des résidents particuliers de la commune",
        "Des fabricants d'antiquités de luxe",
        "Des artistes venus de l'étranger"
      ],
      "ans": 1,
      "passEn": "NEIGHBORHOOD COMMITTEE — ANNUAL FLEA MARKET: Spring flea market this Sunday 7:00 AM to 6:00 PM along main shopping street. Over 120 private individual sellers. Refreshments on site.",
      "qEn": "Who are the vendors selling items at this flea market?",
      "optEn": [
        "Professional retail merchants strictly",
        "Private individual residents of town",
        "Manufacturers of luxury antiques",
        "Visiting artists coming from abroad"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 11,
      "level": "A2",
      "docType": "Information de club informatique",
      "text": "ESPACE NUMÉRIQUE — INITIATION AUX TABLETTES : Le centre social propose un cours gratuit d'initiation aux outils numériques pour les débutants tous les mardis de 09h30 à 11h00. Prêt de matériel possible sur place sur réservation.",
      "q": "Qui peut participer à ce cours informatique ?",
      "opt": [
        "Les informaticiens professionnels avancés",
        "Les étudiants en université de technologie",
        "Les débutants souhaitant s'initier aux outils numériques",
        "Les enfants de moins de 6 ans uniquement"
      ],
      "ans": 2,
      "passEn": "DIGITAL SPACE — TABLET INTRODUCTORY WORKSHOP: Community center offers free digital tool intro classes for beginners Tuesdays 9:30 AM to 11:00 AM. Equipment loan available upon booking.",
      "qEn": "Who can attend this computer workshop?",
      "optEn": [
        "Advanced IT industry professionals",
        "University technology computer science majors",
        "Beginners wanting to learn digital tools",
        "Children under 6 years old exclusively"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 12,
      "level": "A2",
      "docType": "Note de résidence universitaire",
      "text": "LOGEMENT ÉTUDIANT — NETTOYAGE DES ESPACES COMMUNS : Le nettoyage approfondi des cuisines collectives a lieu tous les vendredis matin entre 08h00 et 10h00. Merci de libérer le plan de travail et d'emporter vos affaires personnelles.",
      "q": "Que doivent faire les étudiants le vendredi matin avant 08h00 ?",
      "opt": [
        "Faire la cuisine pour toute la résidence",
        "Nettoyer eux-mêmes l'ensemble du bâtiment",
        "Rester enfermés dans leur chambre d'étudiant",
        "Vider le plan de travail de leurs affaires personnelles"
      ],
      "ans": 3,
      "passEn": "STUDENT HOUSING — COMMON AREA CLEANING: Deep cleaning of shared kitchens occurs Fridays 8:00 AM to 10:00 AM. Please clear countertops and remove personal belongings.",
      "qEn": "What must students do Friday morning before 8:00 AM?",
      "optEn": [
        "Cook breakfast for the entire residence",
        "Clean the entire housing building themselves",
        "Stay locked inside their student bedrooms",
        "Clear countertops of personal belongings"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "INNOVATION AGRICOLE — BULLETIN DU MONDE RURAL : LE DÉVELOPPEMENT DE L'AGROFORESTERIE DANS LES EXPLOITATIONS.\n\nPour lutter contre l'érosion des sols et protéger les cultures des vents violents, un nombre croissant d'agriculteurs replantent des alignements d'arbres et des haies champêtres au milieu de leurs champs de céréales. Cette pratique ancestrale, appelée agroforesterie, permet d'améliorer la rétention d'eau dans les sols tout en offrant un habitat naturel aux oiseaux et insectes auxiliaires.\n\nLes arbres apportent également une ombre bénéfique en période de fortes chaleurs et permettent de diversifier les revenus de la ferme grâce à la production future de bois de qualité.",
      "q": "Avantage environnemental majeur apporté par l'agroforesterie souligné dans l'article :",
      "opt": [
        "La protection contre l'érosion et l'amélioration de la rétention d'eau",
        "La possibilité de supprimer l'arrosage automatique dans les fermes",
        "L'obligation de vendre la ferme à des entreprises forestières",
        "La baisse des rendements de céréales pour favoriser le bois"
      ],
      "ans": 0,
      "passEn": "AGRICULTURAL INNOVATION — RURAL BULLETIN: EXPANDING AGROFORESTRY ON FARMS.\n\nCombating soil erosion and shielding crops from high winds, farmers are replanting tree lines and hedgerows across grain fields. Known as agroforestry, this ancient technique improves soil water retention while providing natural habitats for birds and beneficial insects.\n\nTrees also supply cooling shade during summer heatwaves and diversify farm income through future timber production.",
      "qEn": "Major environmental advantage provided by agroforestry highlighted in the article:",
      "optEn": [
        "Soil erosion protection and improved water retention",
        "Eliminating automated farm irrigation systems entirely",
        "Mandatory requirements to sell farmland to forestry companies",
        "Reducing grain harvest yields to prioritize timber growth"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur l'urbanisme collaboratif",
      "text": "VIE DE QUARTIER — REVUE DES INITIATIVES CITOYENNES : LES JARDINS DE RUE EN PERMACULTURE.\n\nÀ l'initiative d'associations de riverains, de nombreuses municipalités autorisent les habitants à planter des fleurs, des plantes aromatiques et des petits fruits au pied des arbres d'alignement ou dans les bacs de rue. Cette végétalisation participative transforme les trottoirs en espaces verdoyants et accueillants.\n\nEn s'occupant collectivement de ces micro-jardins, les voisins nouent des liens d'amitié et contribuent activement à l'embellissement et au rafraîchissement de leur environnement urbain quotidien.",
      "q": "Bénéfice social direct généré par la végétalisation participative des trottoirs :",
      "opt": [
        "Le remplacement des services municipaux d'entretien des rues",
        "Le renforcement des liens d'amitié et de cohésion entre voisins",
        "La baisse des impôts fonciers pour tous les participants",
        "L'interdiction de circuler à pied sur les trottoirs végétalisés"
      ],
      "ans": 1,
      "passEn": "NEIGHBORHOOD LIFE — CITIZEN INITIATIVES REVIEW: PERMACULTURE STREET GARDENS.\n\nLed by resident associations, cities permit citizens to plant flowers, herbs, and small berries around street trees and planter boxes. This participatory greening turns sidewalks into lush spaces.\n\nBy caring for these micro-gardens together, neighbors build friendships and actively contribute to beautifying and cooling daily urban environments.",
      "qEn": "Direct social benefit generated by participatory sidewalk greening:",
      "optEn": [
        "Replacing municipal street maintenance departments",
        "Strengthening friendship bonds and neighbor cohesion",
        "Lowering property tax bills for all participating gardeners",
        "Prohibiting pedestrian walking on greened sidewalks"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur la préservation du livre",
      "text": "CULTURE ET PATRIMOINE — REVUE DE LA LECTURE : LA SAUVEGARDE DES RELIURES ANCIENNES EN BIBLIOTHÈQUE.\n\nLes ateliers de restauration des bibliothèques patrimoniales effectuent un travail minutieux pour préserver des milliers d'ouvrages rares menacés par l'usure du temps et l'humidité. Grâce à des techniques artisanales spécialisées (dépoussiérage manuel, consolidation des cuirs, réemboîtage), les restaurateurs prolongent la durée de vie de ces trésors de l'écrit.\n\nParallèlement, la numérisation systématique des pages permet de mettre ces précieux documents à la disposition des chercheurs du monde entier sans risquer d'endommager les originaux.",
      "q": "Rôle de la numérisation des livres anciens patrimoniaux :",
      "opt": [
        "Vendre les livres originaux aux enchères internationales",
        "Remplacer définitivement les bibliothécaires par des robots",
        "Permettre la consultation par les chercheurs sans abîmer l'original",
        "Détruire les originaux en papier pour gagner de la place"
      ],
      "ans": 2,
      "passEn": "CULTURE AND HERITAGE — READING REVIEW: PRESERVING RARE BOOK BINDINGS IN LIBRARIES.\n\nRestoration studios in heritage libraries perform meticulous work preserving thousands of rare books threatened by age and moisture. Using specialized artisan techniques (dusting, leather repair, re-binding), conservators extend book lifespans.\n\nSimultaneously, systematically digitizing pages allows global researchers to consult precious texts without risking damage to delicate originals.",
      "qEn": "Role of digitizing rare heritage books:",
      "optEn": [
        "Selling original rare books at international auctions",
        "Permanently replacing professional librarians with robots",
        "Enabling research access without damaging delicate originals",
        "Destroying original paper volumes to save storage space"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur le recyclage informatique",
      "text": "TECHNOLOGIE ET SOLIDARITÉ — BULLETIN DE L'INCLUSION NUMÉRIQUE : LE RECONDITIONNEMENT DES ORDINATEURS USAGÉS.\n\nPour réduire la fracture numérique et lutter contre le gaspillage électronique, une entreprise sociale récupère le matériel informatique obsolète auprès des grandes entreprises. Après effacement sécurisé des données, nettoyage complet et réinstallation d'un système d'exploitation libre, ces ordinateurs sont distribués à des étudiants modestes ou des familles défavorisées.\n\nCette seconde vie donnée aux équipements numériques permet d'allier solidarité sociale et réduction de l'empreinte environnementale du secteur informatique.",
      "q": "Public bénéficiaire des ordinateurs rééquipés et reconditionnés :",
      "opt": [
        "Les dirigeants de grandes multinationales technologiques",
        "Les centres de données de recherche spatiale",
        "Les commerçants de matériels informatiques neufs",
        "Des étudiants modestes et des familles défavorisées"
      ],
      "ans": 3,
      "passEn": "TECH AND SOLIDARITY — DIGITAL INCLUSION BULLETIN: REFURBISHING PRE-OWNED COMPUTERS.\n\nClosing digital divides and reducing e-waste, a social enterprise collects old office IT hardware from corporations. Following secure data wipes, cleaning, and open-source OS installations, computers are distributed to low-income students and families.\n\nGiving tech gear a second life combines social solidarity with lowering IT environmental footprints.",
      "qEn": "Target audience benefiting from refurbished computer distribution:",
      "optEn": [
        "Executives of major multinational tech corporations",
        "Supercomputing research space data centers",
        "Commercial retail stores selling new IT hardware",
        "Low-income students and disadvantaged families"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur l'artisanat textile",
      "text": "SAVOIR-FAIRE RÉGIONAUX — REVUE DES MÉTIERS D'ART : LA RELANCE DU TISSAGE TRADITIONNEL EN LAINE LOCALE.\n\nPlusieurs ateliers textiles d'une vallée montagneuse relancent le tissage de couvertures et de vêtements en laine de brebis locale. En maîtrisant toutes les étapes de la filière — du lavage écologique de la toison au filage et à la teinture végétale —, ces artisans produisent des articles textiles d'une qualité et d'une durabilité exceptionnelles.\n\nCette valorisation de la ressource locale garantit un prix d'achat rémunérateur aux éleveurs ovins de la région tout en maintenant un savoir-faire artisanal emblématique.",
      "q": "Bénéfice de cette filière textile pour les éleveurs de moutons locaux :",
      "opt": [
        "Un prix d'achat rémunérateur et garanti pour leur production de laine",
        "L'obligation d'abandonner l'élevage pour devenir tisseurs",
        "La gratuité des vêtements fabriqués dans les ateliers",
        "L'importation de laine synthétique bon marché de l'étranger"
      ],
      "ans": 0,
      "passEn": "REGIONAL SKILLS — CRAFT REVIEW: REVIVING TRADITIONAL LOCAL WOOL WEAVING.\n\nTextile studios in a mountain valley are reviving sheep wool weaving for blankets and apparel. Controlling all production stages—from eco-washing fleeces to spinning and plant dyeing—craftspeople make exceptional textiles.\n\nUtilizing local wool guarantees fair purchase prices for regional sheep farmers while preserving iconic artisan heritage.",
      "qEn": "Benefit of this local wool supply chain for regional sheep farmers:",
      "optEn": [
        "Fair guaranteed purchase prices for their wool production",
        "Mandatory requirements to quit farming to become weavers",
        "Free clothing items produced in artisan weaving studios",
        "Importing cheap synthetic wool fibers from overseas"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur la santé et la nutrition",
      "text": "ALIMENTATION ET SANTÉ — BULLETIN DE LA NUTRITION PREVENTIVE : L'INFLUENCE DU FAIT-MAISON SUR LA SANTÉ NUTRITIONNELLE.\n\nDes études nutritionnelles récentes montrent que la préparation quotidienne des repas à partir de produits bruts et frais réduit significativement les risques d'obésité et de maladies cardiovasculaires. Contrairement aux plats industriels ultratransformés riches en additifs, en sel et en sucres masqués, la cuisine maison permet de contrôler précisément la composition de son assiette.\n\nLes spécialistes encouragent la réintroduction de cours de cuisine simples dès l'école primaire pour redonner aux enfants le plaisir de cuisiner et les bons réflexes alimentaires.",
      "q": "Avantage nutritionnel de la cuisine maison souligné par les spécialistes :",
      "opt": [
        "La garantie de manger plus vite sans perdre de temps à table",
        "Le contrôle précis des ingrédients en évitant les additifs industriels",
        "L'obligation d'acheter uniquement des produits surgelés",
        "La suppression de la nécessité de consommer des légumes"
      ],
      "ans": 1,
      "passEn": "FOOD AND HEALTH — PREVENTIVE NUTRITION BULLETIN: HOME COOKING INFLUENCE ON NUTRITIONAL HEALTH.\n\nNutrition studies show cooking daily meals from whole fresh ingredients significantly reduces obesity and heart disease risks. Unlike ultra-processed foods loaded with additives, salt, and hidden sugars, home cooking allows precise control over meal quality.\n\nExperts advocate reintroducing basic cooking classes in primary schools to teach children healthy eating habits and cooking joy.",
      "qEn": "Nutritional advantage of home cooking highlighted by specialists:",
      "optEn": [
        "Guaranteed faster eating without wasting time at dinner tables",
        "Precise ingredient control while avoiding industrial additives",
        "Mandatory requirements to buy frozen pre-packaged foods strictly",
        "Eliminating obligations to consume fresh vegetables"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur le tourisme éco-responsable",
      "text": "TOURISME DURABLE — BULLETIN DU VOYAGEUR CITOYEN : LE DÉVELOPPEMENT DES GÎTES ÉCOLOGIQUES EN MONTAGNE.\n\nDe nombreux propriétaires de gîtes de montagne rénovent leurs hébergements en adoptant des standards écoresponsables stricts : chauffe-eau solaires, toilettes à compost, isolation en fibre de bois et approvisionnement en produits du terroir. Ces aménagements répondent à une demande croissante des randonneurs désireux d'imposer une empreinte carbone minimale à leurs vacances.\n\nCe tourisme vert respectueux de l'environnement permet de préserver la beauté sauvage des massifs tout en soutenant l'économie locale.",
      "q": "Attente des voyageurs séjournant dans ces gîtes écologiques de montagne :",
      "opt": [
        "Disposer de climatiseurs puissants dans chaque pièce",
        "Exiger le service de repas industriels importés",
        "Réduire au minimum l'empreinte carbone de leur séjour",
        "Accéder aux sommets uniquement en hélicoptère privé"
      ],
      "ans": 2,
      "passEn": "SUSTAINABLE TOURISM — CITIZEN TRAVELER BULLETIN: EXPANDING ECO-LODGES IN MOUNTAINS.\n\nMountain lodge owners are renovating accommodations to meet strict green standards: solar water heaters, compost toilets, wood fiber insulation, and local food sourcing. These upgrades meet growing demands from hikers seeking low-carbon vacations.\n\nEco-friendly tourism protects wild mountain beauty while supporting local businesses.",
      "qEn": "Expectation of travelers staying in these mountain eco-lodges:",
      "optEn": [
        "Having powerful air conditioners running in every room",
        "Requesting imported industrial pre-packaged meals daily",
        "Minimizing the environmental carbon footprint of their stay",
        "Accessing mountain peaks strictly via private helicopters"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur l'autonomie des aînés",
      "text": "SENIORS ET SOCIÉTÉ — REVUE DE L'AUTONOMIE : LES HABITATS REGROUPÉS ET INTERGÉNÉRATIONNELS.\n\nPour offrir une alternative à l'entrée en maison de retraite, plusieurs communes rurales construisent des béguinages modernes : de petits ensembles de logements individuels de plain-pied organisés autour d'une salle commune et de jardins partagés. Ces structures permettent aux personnes âgées autonomes de conserver leur indépendance tout en bénéficiant d'une présence rassurante.\n\nDes activités partagées avec les écoles du village et les associations locales maintiennent une vie sociale riche et préviennent le sentiment de solitude.",
      "q": "Objectif poursuivi par la création des béguinages modernes pour seniors :",
      "opt": [
        "Forcer les seniors à vivre dans une maison de retraite médicalisée",
        "Isoler totalement les personnes âgées du reste de la population",
        "Obliger les résidents à travailler dans les fermes environnantes",
        "Préserver l'autonomie des aînés dans un cadre sécurisant et convivial"
      ],
      "ans": 3,
      "passEn": "SENIORS AND SOCIETY — AUTONOMY REVIEW: SHARED INTERGENERATIONAL HOUSING FOR AGING ADULTS.\n\nOffering alternatives to nursing homes, rural towns are building modern senior housing clusters: small single-story homes centered around common halls and gardens. These setups allow independent seniors to maintain autonomy in a reassuring setting.\n\nShared activities with village schools and local non-profits foster rich social lives, preventing isolation.",
      "qEn": "Goal pursued by building modern shared housing clusters for seniors:",
      "optEn": [
        "Forcing seniors to enter institutional nursing homes",
        "Isolating elderly residents completely from local communities",
        "Mandating residents to work on surrounding agricultural farms",
        "Preserving senior independence inside reassuring social settings"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur la préservation des abeilles",
      "text": "ÉCOLOGIE URBAINE — BULLETIN DE LA BIODIVERSITÉ : L'IMPLANTATION DE RUCHES SUR LES TOITS EN VILLE.\n\nDe nombreuses entreprises et institutions publiques installent des ruches sur les toits de leurs édifices urbains. Étonnamment, les abeilles trouvent en ville une ressource florale variée et abondante grâce à la diversité des parcs, balcons et jardins publics exempts de pesticides agricoles.\n\nLa récolte du miel urbain donne lieu à des animations pédagogiques auprès du personnel et des riverains, sensibilisant le grand public au rôle irremplaçable des insectes pollinisateurs dans l'équilibre des écosystèmes.",
      "q": "Raison pour laquelle les abeilles s'épanouissent bien en milieu urbain :",
      "opt": [
        "La présence de fleurs variées et l'absence de pesticides agricoles",
        "L'abondance de produits sucrés industriels jetés dans la rue",
        "La chaleur permanente dégagée par les moteurs de voiture",
        "L'absence totale d'oiseaux prédateurs dans les villes"
      ],
      "ans": 0,
      "passEn": "URBAN ECOLOGY — BIODIVERSITY BULLETIN: INSTALLING ROOFTOP HONEYBEE HIVES IN CITIES.\n\nCorporations and public institutions are setting up beehives on city roofs. Remarkably, urban bees find rich, diverse floral resources in parks, balconies, and public gardens free from agricultural pesticides.\n\nHarvesting urban honey powers educational workshops for staff and neighbors, raising public awareness of pollinators' essential ecological role.",
      "qEn": "Reason why honeybees thrive inside urban city environments:",
      "optEn": [
        "Abundant diverse flowers and freedom from agricultural pesticides",
        "Abundance of sugary industrial food waste discarded on streets",
        "Constant ambient heat released by automobile engines",
        "Complete absence of predatory birds inside metropolitan areas"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur le sport citoyen",
      "text": "ACTIVITÉ PHYSIQUE — REVUE SPORT ET SANTÉ : L'ENGOUEMENT POUR LES MARCHES D'ENTRETIEN ET PLOGGING.\n\nLa pratique du 'plogging' — une activité combinant le jogging léger ou la marche rapide avec le ramassage des déchets jetés dans la nature — gagne de nombreux adeptes. Équipés de gants et de sacs poubelles réutilisables, les pratiquants arpentent les parcs et les sentiers pour nettoyer l'environnement tout en brûlant des calories.\n\nCette discipline citoyenne associe exercice physique bénéfique pour la santé et action écologique concrète, démontrant que chacun peut devenir acteur de la propreté de son territoire.",
      "q": "Principe fondamental de l'activité sportive appelée 'plogging' :",
      "opt": [
        "Courir le plus vite possible pour battre des records olympiques",
        "Associer la course ou la marche au nettoyage des déchets dans la nature",
        "S'entraîner uniquement dans des salles de sport climatisées payantes",
        "Marcher les yeux fermés pour développer son sens de l'équilibre"
      ],
      "ans": 1,
      "passEn": "PHYSICAL ACTIVITY — SPORTS AND HEALTH REVIEW: POPULARITY OF FITNESS WALKING AND PLOGGING.\n\n'Plogging'—combining light jogging or fitness walking with litter pickup—is gaining popularity. Outfitted with gloves and reusable bags, runners clean parks and trails while burning calories.\n\nThis civic activity pairs health-boosting exercise with direct eco-action, proving anyone can help keep local environments clean.",
      "qEn": "Core principle of the fitness activity known as 'plogging':",
      "optEn": [
        "Running as fast as possible to break Olympic world records",
        "Combining jogging or walking with picking up outdoor litter",
        "Exercising exclusively inside paid air-conditioned indoor gyms",
        "Walking with eyes closed to develop body spatial balance"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la gestion de l'eau",
      "text": "RESSOURCES EN EAU — REVUE DE L'ÉCOLOGIE HYDRIQUE : LA REUTILISATION DES EAUX USÉES TRAITÉES (REUT).\n\nFace au stress hydrique récurrent qui frappe les régions méditerranéennes durant l'été, la réutilisation des eaux usées traitées (REUT) en sortie de station d'épuration s'impose comme une solution d'avenir pour l'arrosage agricole et le nettoyage urbain. Alors que la France n'utilise que 1 % de ses eaux usées traitées, certains pays voisins en recyclent plus de 10 % pour irriguer leurs cultures sans prélever dans les nappes phréatiques.\n\nLe frein principal réside dans la lourdeur des réglementations sanitaires actuelles. Une simplification des normes d'usage permettrait d'économiser des millions de m³ d'eau potable.",
      "q": "Frein majeur au développement du recyclage des eaux usées en France :",
      "opt": [
        "L'absence complète de stations d'épuration sur le territoire",
        "Le refus catégorique des agriculteurs d'irriguer leurs champs",
        "La complexité et la lourdeur des réglementations sanitaires en vigueur",
        "Le coût de traitement devenu dix fois supérieur à l'eau potable"
      ],
      "ans": 2,
      "passEn": "WATER RESOURCES — HYDROLOGICAL ECOLOGY REVIEW: REUSING TREATED WASTEWATER (REUT).\n\nAddressing Mediterranean summer water stress, reusing treated wastewater from purification plants offers solutions for farm irrigation and street washing. While France recycles under 1% of treated wastewater, neighboring nations recycle over 10% for crops without depleting aquifers.\n\nThe main hurdle lies in overly strict health regulations. Streamlining regulatory standards could save millions of cubic meters of drinking water annually.",
      "qEn": "Major hurdle to expanding wastewater recycling in France highlighted in the text:",
      "optEn": [
        "Complete absence of water purification treatment plants nationwide",
        "Farmers' categorical refusal to irrigate their crops with recycled water",
        "Complexity and strictness of current health regulatory frameworks",
        "Treatment costs becoming ten times higher than drinking water supply"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur la mobilité urbaine",
      "text": "TRANSPORTS ET VILLE — BULLETIN DE LA MOBILITÉ ÉLECTRIQUE : LES DÉFIS DU DÉPLOIEMENT DES BORNES DE RECHARGE.\n\nL'électrification rapide du parc automobile métropolitain se heurte au défi logistique de l'installation de bornes de recharge rapides dans les zones résidentielles denses. Dans les centres-villes où la majorité des habitants ne dispose pas de garage privé avec prise électrique, la recharge nocturne dépend entièrement du réseau de bornes publiques installées sur la voie publique.\n\nAfin d'éviter la saturation des stations de recharge et les conflits d'usage, les municipalités doivent inciter les opérateurs privés à déployer des bornes de recharge dans les parkings souterrains et les centres commerciaux.",
      "q": "Obstacle logistique rencontré par les propriétaires de véhicules électriques en centre-ville :",
      "opt": [
        "L'interdiction absolue de circuler la nuit pour les voitures électriques",
        "Le manque de modèles de véhicules électriques sur le marché",
        "L'obligation de payer l'électricité trois fois plus cher qu'à la campagne",
        "L'absence de garage individuel privé pour effectuer la recharge à domicile"
      ],
      "ans": 3,
      "passEn": "TRANSIT AND CITY — ELECTRIC MOBILITY BULLETIN: EV CHARGING INFRASTRUCTURE CHALLENGES.\n\nRapid EV adoption faces infrastructure hurdles installing fast charging stations in dense residential areas. Downtown, where most residents lack private garages with power outlets, overnight charging relies entirely on public curbside stations.\n\nPreventing station congestion and usage conflicts, cities must incentivize private operators to install charging hubs inside underground parking structures and malls.",
      "qEn": "Logistical obstacle faced by downtown electric vehicle owners:",
      "optEn": [
        "Absolute prohibitions banning EV driving during nighttime hours",
        "Shortage of electric vehicle models available on consumer markets",
        "Requirements to pay three times higher electricity rates than rural areas",
        "Lack of private individual garages for home overnight charging"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la sobriété numérique",
      "text": "NUMÉRIQUE ET ENVIRONNEMENT — REVUE DE LA TRANSITION DIGITALE : LA POLLUTION CACHÉE DE LA CONSERVATION DES DONNÉES (CLOUD).\n\nLe stockage massif de données personnelles et professionnelles dans les centres de données mondiaux (Cloud) génère une consommation d'électricité et d'eau de refroidissement en croissance exponentielle. L'accumulation de milliers de photographies en haute définition, de courriels obsolètes avec pièces jointes et de vidéos inutilisées contribue directement à l'empreinte carbone globale du numérique.\n\nLes experts préconisent l'apprentissage de l'hygiène numérique : l'effacement régulier des fichiers inutiles, la désinscription des lettres d'information non lues et la réduction de la résolution des vidéos visionnées en ligne.",
      "q": "Recommandation formulée par les experts pour réduire l'empreinte carbone numérique :",
      "opt": [
        "Adopter une hygiène numérique en supprimant régulièrement les fichiers inutiles",
        "Conserver tous ses courriels et photos sur dix serveurs différents",
        "Interdire définitivement l'usage de l'ordinateur pour le travail",
        "Acheter un nouvel ordinateur portable tous les six mois"
      ],
      "ans": 0,
      "passEn": "DIGITAL AND ENVIRONMENT — DIGITAL TRANSITION REVIEW: HIDDEN DATA CLOUD STORAGE POLLUTION.\n\nMassive storage of personal and corporate data in global data centers consumes exponentially growing electricity and cooling water. Accumulating thousands of high-def photos, old attachment-heavy emails, and unwatched videos inflates digital carbon footprints.\n\nExperts advocate digital hygiene practices: regularly deleting obsolete files, unsubscribing from unread newsletters, and lowering online video streaming resolution.",
      "qEn": "Recommendation provided by experts to lower digital carbon footprints:",
      "optEn": [
        "Practicing digital hygiene by regularly deleting obsolete files",
        "Storing all emails and photos across ten different cloud servers",
        "Banning computer usage permanently for professional work",
        "Purchasing a brand-new laptop computer every six months"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur l'économie circulaire",
      "text": "ÉCONOMIE INDUSTRIELLE — REVUE DU RECYCLAGE MATÉRIEL : LA CONSIGNATION ET LE RÉEMPLOI DES EMBALLAGES EN VERRE.\n\nL'abandon progressif de la bouteille en verre consignée au profit des emballages en plastique jetables constitue un recul écologique majeur. Pour inverser cette tendance, plusieurs régions expérimentent le retour du système de consigne solidaire auprès des grandes surfaces et des brasseries artisanales. Les usagers rapportent leurs bouteilles vides qui sont lavées et réutilisées jusqu'à 20 fois.\n\nCe système de réemploi consomme nettement moins d'énergie et d'eau que le recyclage par refonte complète du verre, tout en évitant la production de milliers de tonnes de déchets plastiques.",
      "q": "Avantage du réemploi des bouteilles consignées par rapport au recyclage traditionnel :",
      "opt": [
        "Il nécessite de refondre complètement le verre à 1500 degrés",
        "Il consomme nettement moins d'énergie et d'eau en évitant la refonte",
        "Il oblige les consommateurs à jeter les bouteilles après usage",
        "Il augmente la production de déchets plastiques jetables"
      ],
      "ans": 1,
      "passEn": "INDUSTRIAL ECONOMICS — MATERIAL RECYCLING REVIEW: GLASS CONTAINER DEPOSIT AND REUSE SYSTEMS.\n\nPhasing out returnable glass bottles for disposable plastic packaging marked a major environmental setback. Reversing this trend, regions are trialing returnable glass deposit systems with retailers and craft breweries. Customers return empty bottles to be washed and refilled up to 20 times.\n\nContainer reuse consumes far less energy and water than melting glass down for recycling, avoiding thousands of tons of plastic waste.",
      "qEn": "Advantage of returnable bottle reuse compared to traditional melting recycling:",
      "optEn": [
        "Requires melting glass down completely at 1500 degrees Celsius",
        "Consumes significantly less energy and water by avoiding melting",
        "Forces consumers to discard glass bottles immediately after use",
        "Surges single-use disposable plastic waste production nationwide"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la santé mentale et le travail",
      "text": "SANTÉ AU TRAVAIL — BULLETIN DE PSYCHOLOGIE ERGONOMIQUE : L'IMPACT DE L'HYPERCONNEXION PROFESSIONNELLE SUR LE DROIT AU REPOS.\n\nLa généralisation des outils de communication mobiles et du travail à distance efface progressivement la frontière étanche entre vie professionnelle et sphère privée. Recevoir des courriels ou des messages instantanés professionnels le soir ou durant les week-ends maintient les salariés dans un état d'alerte psychologique permanente, favorisant le syndrome d'épuisement professionnel (burn-out).\n\nPour préserver la santé mentale des équipes, l'application effective du 'droit à la déconnexion' — interdisant l'envoi de messages professionnels en dehors des heures de travail — s'impose comme une obligation managériale stricte.",
      "q": "Risque psychologique majeur lié à l'hyperconnexion professionnelle du soir :",
      "opt": [
        "Une hausse de la créativité et de la motivation au travail",
        "La baisse immédiate du temps de trajet pour aller au bureau",
        "Le maintien d'un état d'alerte permanente favorisant le burn-out",
        "L'augmentation des salaires distribués en fin de mois"
      ],
      "ans": 2,
      "passEn": "OCCUPATIONAL HEALTH — ERGONOMIC PSYCHOLOGY BULLETIN: IMPACT OF WORK OVER-CONNECTION ON REST RIGHTS.\n\nWidespread mobile communication and remote work erode boundaries separating professional duties from private lives. Receiving work emails or messages evenings and weekends keeps staff in constant psychological alert, fueling professional burnout.\n\nProtecting employee mental health, enforcing 'rights to disconnect'—prohibiting off-hours work communication—is a mandatory management obligation.",
      "qEn": "Major psychological risk linked to off-hours professional over-connection:",
      "optEn": [
        "Surging creativity and daily work motivation levels",
        "Immediate reduction in physical office commuting times",
        "Sustained constant psychological alert state fueling burnout",
        "Higher monthly salary bonus payouts distributed to staff"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la biodiversité agricole",
      "text": "AGRICULTURE ET ÉCOLOGIE — BULLETIN DES VARIÉTÉS ANCIENNES : LA PRESERVATION DES SEMENCES PAYSANNES TRADITIONNELLES.\n\nLa standardisation de la production agricole industrielle a entraîné la disparition de milliers de variétés anciennes de céréales, de fruits et de légumes au profit d'un nombre restreint de semences hybrides commerciales brevetées. Pour préserver la biodiversité cultivée, des réseaux d'agriculteurs et de jardiniers conservent et échangent des 'semences paysannes' adaptées à leur terroir.\n\nCes variétés anciennes présentent une résistance naturelle accrue aux maladies et aux aléas climatiques, réduisant ainsi le besoin de traitements chimiques tout en offrant des qualités gustatives exceptionnelles.",
      "q": "Atout agronomique des semences paysannes anciennes mis en avant dans l'étude :",
      "opt": [
        "L'obligation d'utiliser des engrais chimiques synthétiques puissants",
        "L'impossibilité de conserver les récoltes plus de 24 heures",
        "La nécessité de racheter des graines brevetées chaque année",
        "Une résistance naturelle supérieure aux maladies et aux aléas climatiques"
      ],
      "ans": 3,
      "passEn": "AGRICULTURE AND ECOLOGY — HEIRLOOM VARIETIES BULLETIN: PRESERVING TRADITIONAL HEIRLOOM SEEDS.\n\nIndustrial farm standardization led to the loss of thousands of heirloom grain, fruit, and vegetable varieties replaced by a few patented commercial hybrid seeds. Preserving crop biodiversity, farmer networks save and trade heirloom seeds adapted to local soils.\n\nHeirloom varieties feature superior natural resilience against diseases and climate stress, reducing chemical treatment needs while yielding exceptional flavor.",
      "qEn": "Agronomic asset of traditional heirloom seeds highlighted in the study:",
      "optEn": [
        "Mandatory requirements to apply heavy synthetic chemical fertilizers",
        "Inability to store harvested produce longer than 24 hours",
        "Necessity to purchase new patented seeds from corporations annually",
        "Superior natural resilience against plant diseases and climate stress"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la politique de la ville",
      "text": "AMÉNAGEMENT URBAIN — CAHIERS DU LOGEMENT SOCIAL : LA LUTTE CONTRE LA VACANCE IMMOBILIÈRE EN CENTRE-VILLE.\n\nAlors que des milliers de ménages peinent à trouver un logement abordable dans les agglomérations tendues, de nombreux immeubles du centre-ville restent inoccupés ou abandonnés par leurs propriétaires pour des raisons d'indivision successorale ou de spéculation foncière. Pour lutter contre ce gaspillage immobilier, des municipalités appliquent la taxe sur les logements vacants et mobilisent des procédures d'expropriation pour cause d'utilité publique.\n\nCes logements remis sur le marché après rénovation permettent de reloger des familles modestes au plus près des transports et des services publics.",
      "q": "Objectif poursuivi par les municipalités en taxant les logements vacants :",
      "opt": [
        "Remettre les logements inoccupés sur le marché pour reloger des familles",
        "Favoriser la spéculation immobilière pour augmenter les prix du marché",
        "Raser les immeubles du centre-ville pour construire des autoroutes",
        "Interdire aux familles modestes d'habiter dans le centre-ville"
      ],
      "ans": 0,
      "passEn": "URBAN PLANNING — PUBLIC HOUSING PAPERS: COMBATING DOWNTOWN VACANT HOUSING STOCKS.\n\nWhile thousands struggle to find affordable housing in tight markets, downtown buildings sit empty due to inheritance disputes or land speculation. Combating housing waste, cities enforce vacant property taxes and initiate public eminent domain procedures.\n\nRenovating and returning these homes to market provides affordable housing close to public transit and services for low-income families.",
      "qEn": "Goal pursued by municipal councils taxing vacant property stocks:",
      "optEn": [
        "Returning vacant units to market to rehouse low-income families",
        "Promoting real estate land speculation to inflate market home prices",
        "Demolishing downtown apartment buildings to construct highways",
        "Prohibiting low-income families from living in city centers"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial de philosophie politique",
      "text": "PHILOSOPHIE POLITIQUE — TRIBUNE DE SCIENCE CIVIQUE : LA DECONSTRUCTION DU COMPORTEMENTALISME ET LA MANIPULATION NUDGE DANS LES POLITIQUES PUBLIQUES.\n\nL'émergence des politiques publiques d'inspiration comportementaliste, fondées sur l'utilisation des 'nudges' (incitations douces sous forme de modifications de l'environnement de choix), est régulièrement présentée comme une méthode moderne et bienveillante pour guider les citoyens vers des comportements responsables sans recourir à l'interdiction administrative ou à la taxation dissuasive. Qu'il s'agisse d'encourager le tri sélectif des déchets ménagers ou l'épargne retraite individuelle, ces techniques prétendent orienter les décisions individuelles pour le bien commun.\n\nToutefois, des politologues et philosophes formulent des critiques éthiques sévères contre cette ingénierie comportementale contemporaine. En exploitant les biais cognitifs inconscients des individus au lieu de faire appel à leur jugement réflexif conscient et délibératif, le paternalisme libertarien opère une manipulation comportementale sous-jacente. Cette approche contourne la délibération démocratique authentique et infantilise les citoyens, réduisant l'action publique à du dressage social automatisé au détriment de l'émancipation civique.",
      "q": "Quelle critique éthique majeure les politologues adressent-ils aux politiques de 'nudge' ?",
      "opt": [
        "Elles augmentent considérablement le montant des impôts payés par les citoyens",
        "Elles manipulent les biais inconscients au lieu de stimuler le jugement réflexif conscient",
        "Elles obligent les gouvernements à supprimer l'intégralité des lois existantes",
        "Elles empêchent les entreprises privées de vendre leurs produits sur le marché"
      ],
      "ans": 1,
      "passEn": "POLITICAL PHILOSOPHY — CIVIC SCIENCE ESSAY: DECONSTRUCTING NUDGE BEHAVIORALISM IN PUBLIC POLICY.\n\nBehavioral public policies using 'nudges' (subtle environment choice architecture) are framed as modern methods guiding citizens toward responsible behavior without bans or taxes. Whether encouraging household recycling or retirement savings, these techniques claim to steer individual choices for public good.\n\nHowever, political scientists raise serious ethical critiques against behavioral engineering. Exploiting unconscious cognitive biases rather than engaging conscious reflective judgment, libertarian paternalism operates underlying manipulation. This circumvents democratic debate and infantilizes citizens, reducing public policy to social conditioning at the expense of civic empowerment.",
      "qEn": "What major ethical critique do political scientists direct against 'nudge' public policies?",
      "optEn": [
        "Significantly increasing the amount of taxes paid by working citizens",
        "Manipulating unconscious biases instead of engaging conscious reflective judgment",
        "Forcing national governments to repeal all existing written laws",
        "Prohibiting private corporations from selling products on markets"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai de sociologie de l'information",
      "text": "SOCIOLOGIE DES MÉDIAS — CAHIERS DE LA COMMUNICATION : L'ACCLIMATATION À L'INSTANTANÉITÉ ET LA PERTE DE LA CONTINUITÉ NARRATIVE HISTORIQUE EN DÉBAT PUBLIC.\n\nL'immersion quotidienne dans le flux ininterrompu d'informations en continu et d'alertes numériques produit une mutation profonde du rapport au temps social et à la mémoire collective. Soumis à une succession frénétique d'actualités éphémères qui se chassent les unes les autres sans aucun temps de digestion critique ou de recul analytique, l'individu contemporain développe une mémoire de travail morcelée, incapable de s'inscrire dans une perspective historique longue et structurée.\n\nCette acclimatation systématique à l'instantanéité appauvrit la capacité collective à appréhender la complexité des transformations sociales. En privilégiant l'émotion immédiate, la réaction épidermique et le scandale passager sur l'analyse causale approfondie, le système d'information marchande désarticule la continuité narrative indispensable à la construction d'un projet politique collectif pérenne et véritablement démocratique.",
      "q": "Impact de l'immersion dans le flux d'information continue selon l'analyse :",
      "opt": [
        "Une meilleure compréhension des causes historiques des conflits mondiaux",
        "L'obligation pour les citoyens d'écrire des livres d'histoire personnelle",
        "La fragmentation de la mémoire et la perte de la capacité d'analyse historique longue",
        "La hausse de la qualité rédactionnelle des journaux télévisés"
      ],
      "ans": 2,
      "passEn": "INFORMATION SOCIOLOGY — MEDIA PAPERS: INSTANTaneity AND NARRATIVE HISTORICAL CONTINUITY EROSION.\n\nDaily immersion in continuous news feeds and digital alerts alters connections to social time and memory. Subject to ephemeral news items replacing each other without time for critical reflection, modern individuals develop fragmented working memory unable to engage long historical perspectives.\n\nAdapting to instantaneity weakens capacities to comprehend complex social transformations. Prioritizing immediate emotion and temporary outrage over deep causal analysis, commercial news systems disrupt narrative continuity vital for building lasting collective projects.",
      "qEn": "Impact of constant immersion in continuous news feeds according to the analysis:",
      "optEn": [
        "Enhanced comprehension of underlying historical causes of global conflicts",
        "Mandatory requirements for citizens to author personal history books",
        "Memory fragmentation and loss of long-term historical analytical capacities",
        "Surging editorial writing quality across nightly television newscasts"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse sur la théorie de la justice",
      "text": "PHILOSOPHIE DU DROIT — REVUE D'ÉTHIQUE SOCIALE : LA CONFISCATION DU DÉBAT ÉCONOMIQUE PAR L'EXPERTISE COMPTABLE ET FINANCIÈRE.\n\nLa tendance croissante à présenter les arbitrages budgétaires majeurs comme des impératifs comptables indiscutables dictés par les marchés financiers opère une dépolitisation pernicieuse de la sphère publique. En transformant des choix fondamentaux de valeurs de société — comme le niveau des retraites, le financement de la santé publique ou l'investissement éducatif — en simples problèmes d'ajustement technique et d'équilibre chiffré, le modèle managérial neutralise le conflit idéologique légitime et indispensable.\n\nCette confiscation du choix citoyen sous couvert de rationalité budgétaire fragilise gravement les fondements de la démocratie représentative. Lorsque la légitimité politique s'appuie exclusivement sur la conformité à des normes comptables extérieures plutôt que sur la délibération éthique sur la justice sociale, les citoyens se trouvent dépossédés de leur pouvoir constitutionnel de décider collectivement de leur avenir commun.",
      "q": "Quelle dérive majeure l'auteur dénonce-t-il dans la présentation des choix budgétaires ?",
      "opt": [
        "L'augmentation du nombre d'experts comptables travaillant dans les administrations",
        "La fermeture définitive des marchés financiers et des banques nationales",
        "L'obligation d'enseigner la comptabilité générale dès l'école primaire",
        "La dépolitisation des choix de société réduits à de simples arbitrages comptables neutres"
      ],
      "ans": 3,
      "passEn": "LEGAL PHILOSOPHY — SOCIAL ETHICS REVIEW: FINANCIAL EXPERTISE AND DEBATE CONFISCATION.\n\nFraming major budget decisions as unquestionable accounting imperatives dictated by financial markets works a pernicious depoliticization of public spheres. Turning core societal choices—pensions, healthcare funding, education investment—into technical adjustments neutralizes legitimate ideological debate.\n\nConfiscating citizen choice under budget rationality disguises weakens democratic foundations. When political legitimacy rests solely on accounting compliance rather than ethical deliberation over social justice, citizens are stripped of collective self-determination.",
      "qEn": "What major drift does the author denounce regarding the presentation of budget choices?",
      "optEn": [
        "Surging numbers of certified accountants working inside public civil services",
        "Permanent closure of national financial markets and retail banks",
        "Mandating general accounting courses starting in primary school classrooms",
        "Depoliticizing societal choices reduced to neutral accounting adjustments"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai d'écologie humaine",
      "text": "ÉCOLOGIE HUMAINE — CAHIERS DE LA TRANSITION TERRE-MER : L'ACCÉLÉRATION DE L'AMNÉSIE ENVIRONNEMENTALE INTERGÉNÉRATIONNELLE.\n\nLe concept d'amnésie environnementale intergénérationnelle désigne le phénomène psychologique et social par lequel chaque nouvelle génération accepte l'état de dégradation de la nature dans lequel elle est née comme la norme écologique de référence. N'ayant pas connu la richesse biologique, l'abondance de la faune sauvage ou la pureté des rivières des décennies précédentes, les jeunes générations mesurent le déclin environnemental par rapport à un point de départ déjà considérablement appauvri.\n\nCette amnésie progressive produit une tolérance collective anormale et dangereuse à la destruction des écosystèmes. En décalant continuellement le seuil de ce qui est considéré comme 'naturel' ou 'acceptable', la société perd la mémoire de l'abondance passée et s'accommode d'un monde de plus en plus stérile sans ressentir la mesure réelle du désastre écologique en cours.",
      "q": "Conséquence majeure de l'amnésie environnementale intergénérationnelle :",
      "opt": [
        "Une tolérance collective accrue au déclin écologique mesuré sur des normes appauvries",
        "Une hausse de la mobilisation citoyenne pour la restauration des rivières",
        "L'obligation d'apprendre par cœur les noms des espèces animales disparues",
        "La fermeture des parcs naturels nationaux pour protéger la faune sauvage"
      ],
      "ans": 0,
      "passEn": "HUMAN ECOLOGY — TERRESTRIAL TRANSITION PAPERS: INTERGENERATIONAL ENVIRONMENTAL AMNESIA.\n\nIntergenerational environmental amnesia describes how each new generation accepts the degraded nature of their birth as the baseline norm. Lacking lived experience of historical biological wealth, wildlife abundance, or pristine rivers, younger generations gauge decline against an already impoverished baseline.\n\nThis progressive amnesia creates abnormal collective tolerance for ecosystem destruction. By shifting thresholds of what is deemed 'natural', society loses memories of past abundance, adapting to increasingly sterile environments without grasping ongoing disaster scales.",
      "qEn": "Major consequence of intergenerational environmental amnesia described in the essay:",
      "optEn": [
        "Increased collective tolerance for ecological decline measured against degraded baselines",
        "Surging citizen mobilization demanding historic river restoration projects",
        "Mandatory requirements to memorize extinct animal species names in school",
        "Closing national nature parks to protect wild animals from humans"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 34,
      "level": "C1",
      "docType": "Analyse de philosophie du travail",
      "text": "PHILOSOPHIE DU TRAVAIL — CAHIERS DE LA CULTURE PROFESSIONNELLE : LA DESQUALIFICATION PAR LA PARCELLISATION ALGORITHMIQUE DU TRAVAIL DANS LES ENTREPRISES.\n\nL'introduction des systèmes d'intelligence artificielle et du management par algorithme dans les secteurs tertiaires et industriels opère une parcellisation inédite des tâches professionnelles. En décomposant le travail complexe en une suite d'instructions élémentaires dictées par des écrans, les directions d'entreprise retirent aux salariés l'exercice du jugement autonome, du savoir-faire artisanal et de la créativité décisionnelle dans l'accomplissement quotidien de leurs missions.\n\nCette disqualification méthodique du travail réduit le professionnel au rang de simple exécutant automatisé de procédures conçues par d'autres. Privé de la possibilité d'exercer son initiative et d'éprouver la fierté du travail bien fait, le salarié subit une perte de sens aiguë et une aliénation professionnelle profonde qui sapent durablement les fondements de la santé au travail et de l'épanouissement personnel.",
      "q": "Conséquence du management algorithmique sur le statut du travailleur soulignée par l'auteur :",
      "opt": [
        "Une augmentation de l'autonomie et de la créativité dans l'organisation du travail",
        "La perte de l'initiative autonome et la réduction du salarié au rang d'exécutant",
        "L'obligation légale de travailler à mi-temps sans réduction de salaire",
        "La disparition complète des maladies professionnelles et du stress au bureau"
      ],
      "ans": 1,
      "passEn": "WORK PHILOSOPHY — PROFESSIONAL CULTURE PAPERS: DESKILLING VIA ALGORITHMIC TASK FRAGMENTATION.\n\nIntroducing AI systems and algorithmic management across service and industrial sectors fragments professional tasks. Decomposing complex work into elementary screen-prompted steps, corporate management strips employees of autonomous judgment, artisan expertise, and creative choice.\n\nThis task deskilling reduces professionals to automated procedure executors. Deprived of initiative and pride in quality work, employees endure acute loss of meaning and professional alienation undermining workplace health.",
      "qEn": "Consequence of algorithmic management on worker status highlighted by the author:",
      "optEn": [
        "Increased autonomy and creative freedom in organizing daily work tasks",
        "Loss of autonomous initiative reducing workers to automated procedure executors",
        "Legal requirements to work part-time without reductions in monthly salary",
        "Complete elimination of occupational illnesses and office stress"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai d'esthétique contemporaine",
      "text": "CRITIQUE ARTISTIQUE — REVUE DES ARTS PLASTIQUES : LA SPECTACULARISATION DE L'ART ET LA PERTE DE LA PROFONDEUR CONTEMPLATIVE.\n\nLa transformation des grands musées et des biennales d'art contemporain en lieux de divertissement de masse et en vecteurs de stratégie touristique a profondément altéré l'expérience de la réception artistique. En privilégiant les œuvres spectaculaires, immersives et immédiatement 'photogéniques' conçues pour être partagées sur les réseaux sociaux, le marché de l'art dominant favorise l'impact visuel superficiel au détriment de l'épaisseur conceptuelle et de l'ambiguïté poétique.\n\nCette spectacularisation réduit la confrontation à l'œuvre à une consommation récréative rapide et superficielle. Le spectateur est sollicité comme un consommateur d'attractions visuelles plutôt que comme un sujet réflexif invité à un dialogue silencieux et exigeant avec la création. Restaurer la puissance émancipatrice de l'art exige de réhabiliter la lenteur contemplative contre le spectacle marchand de masse.",
      "q": "Ce que la transformation des musées en lieux de divertissement de masse dégrade :",
      "opt": [
        "Le prix de vente des billets d'entrée qui devient trop bon marché",
        "La possibilité pour les artistes de fabriquer des œuvres de grande taille",
        "L'expérience contemplative profonde au profit du spectacle visuel éphémère",
        "L'utilisation des technologies d'éclairage LED dans les galeries"
      ],
      "ans": 2,
      "passEn": "ART CRITICISM — FINE ARTS REVIEW: ART SPECTACULARIZATION AND CONTEMPLATIVE LOSS.\n\nTurning major museums and contemporary art biennials into mass entertainment hubs and tourism PR vectors altered artistic reception. Prioritizing large-scale, immersive, 'social-media friendly' installations, dominant art markets favor visual shock over conceptual depth and poetic ambiguity.\n\nThis spectacularization reduces artwork encounters to fast recreational consumption. Viewers are addressed as attraction consumers rather than reflective subjects invited to silent, demanding dialogues with creation. Restoring art's emancipatory power requires championing contemplative slowness over commercial spectacles.",
      "qEn": "What turning museums into mass entertainment venues degrades according to the text:",
      "optEn": [
        "Museum ticket purchase prices becoming unrealistically too cheap",
        "Opportunities for working artists to construct large-scale sculptures",
        "Deep contemplative experience sacrificed for temporary visual shock",
        "Usage of energy-efficient LED lighting fixtures inside art galleries"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le langage",
      "text": "PHILOSOPHIE DE LA CONNAISSANCE — ANNALES DE LA PENSÉE CRITIQUE : LA MARCHANDISATION DU VERBE ET L'APPAUVRISSEMENT DU LANGAGE CONCEPTUEL.\n\nL'envahissement progressif du discours public, des médias et des échanges institutionnels par la rhétorique managériale et la communication marchande opère un appauvrissement insidieux de la langue naturelle. En réduisant la richesse sémantique du vocabulaire à un lexique utilitaire standardisé — composé de slogans lénifiants, d'acronymes opérationnels et d'anglicismes fonctionnels conçus pour l'efficacité immédiate —, le prêt-à-penser marchand prive le sujet de la subtilité lexicale nécessaire pour exprimer les nuances complexes de l'expérience humaine et sociale.\n\nCet appauvrissement linguistique étouffe l'imagination conceptuelle et la liberté de pensée. En amputant la langue de sa charge subversive, de son ambiguïté poétique et de sa mémoire historique, le conformisme verbal impose une vision unidimensionnelle du monde qui entrave l'émergence de représentations alternatives et asphyxie le dialogue démocratique authentique. Défendre la pluralité et la profondeur de la langue vivante s'impose ainsi comme un acte fondamental de résistance politique et culturelle.",
      "q": "Quelle thèse centrale l'auteur soutient-il concernant l'impact du jargon managérial sur le langage ?",
      "opt": [
        "Il simplifie l'apprentissage de la lecture pour les enfants en difficulté",
        "Il enrichit le vocabulaire en créant des concepts scientifiques nouveaux",
        "Il permet de traduire automatiquement toutes les langues sans erreur",
        "Il appauvrit la langue et étouffe la pensée critique en imposant un lexique utilitaire"
      ],
      "ans": 3,
      "passEn": "KNOWLEDGE PHILOSOPHY — CRITICAL THOUGHT ANNALS: COMMODIFICATION OF LANGUAGE AND CONCEPTUAL POVERTY.\n\nInfecting public discourse with corporate jargon and marketing buzzwords insidiously degrades natural language semantics. Reducing vocabulary to standardized utilitarian lexicons—functional Anglicisms, rigid acronyms, soothing euphemisms—corporate newspeak deprives subjects of lexical nuance needed to express reality.\n\nThis linguistic impoverishment stifles poetic imagination and conceptual autonomy. By stripping language of subversive depth and history, marketing newspeak enforces a one-dimensional worldview that stifles alternative thought and authentic democratic dialogue. Defending living language is a major act of cultural and political resistance.",
      "qEn": "What central thesis does the author maintain regarding corporate jargon's impact on language?",
      "optEn": [
        "Simplifies reading acquisition for children experiencing learning difficulties",
        "Enriches national vocabulary by engineering innovative scientific concepts",
        "Enables automatic error-free translation across all world languages",
        "Impoverishes language and stifles critical thought through utilitarian newspeak"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie de la décision",
      "text": "ÉPISTÉMOLOGIE DE LA DÉCISION — REVUE DE PHILOSOPHIE SOCIALE : LA TYRANNIE DU COURT-TERMISME ET LA DÉPOSSESSION DU FUTUR.\n\nLa dictature de la rentabilité financière à court terme et le rythme frénétique imposé par les marchés mondialisés ont progressivement imposé le 'présentisme' comme le mode de gestion hégémonique des institutions publiques et privées. En soumettant la décision stratégique à la recherche de résultats trimestriels immédiats ou au calendrier électoral à court terme, le modèle managérial dominant se trouve dans l'incapacité structurelle de prendre en compte les enjeux de long terme indispensables à la survie de la civilisation, tels que la transition écologique, la préservation des ressources ou le financement de la recherche fondamentale.\n\nCette obsession du présent immédiat opère une véritable confiscation de l'avenir. En sacrifiant le temps long de la prospective et de la transmission intergénérationnelle sur l'autel de la performance instantanée, le système économique marchand condamne la société à la gestion de la crise permanente et à la répétition stérile du statu quo. Réenchanter l'action politique exige d'imposer le temps long du futur comme le critère ultime de la légitimité des décisions publiques.",
      "q": "Quelle dérive majeure liée au court-termisme hégémonique est dénoncée dans l'essai ?",
      "opt": [
        "L'incapacité structurelle de prendre en compte les enjeux de long terme et la confiscation du futur",
        "L'augmentation excessive des investissements consacrés à la recherche scientifique",
        "L'obligation pour les dirigeants d'organiser des élections chaque trimestre",
        "La baisse des taux d'intérêt bancaires pour l'achat de logements"
      ],
      "ans": 0,
      "passEn": "DECISION EPISTEMOLOGY — SOCIAL PHILOSOPHY REVIEW: TYRANNY OF SHORT-TERMISM AND FUTURE CONFISCATION.\n\nDictat of short-term financial returns and global market frenzy imposed 'presentism' as dominant public/private management. Subjecting strategy to quarterly earnings or short election cycles, current models are structurally incapable of addressing long-term civilizational challenges like climate transition, resource preservation, or basic research.\n\nShort-term obsession confiscates future possibilities. Sacrificing long-term planning for instant metrics, market systems condemn society to perpetual crisis management and status quo repetition. Re-enchanting politics requires establishing long-term futures as ultimate benchmarks for policy legitimacy.",
      "qEn": "What major danger linked to dominant short-termism is denounced in the essay?",
      "optEn": [
        "Structural inability to address long-term challenges and confiscating the future",
        "Excessive surges in capital investments allocated to scientific research",
        "Mandating corporate executives to hold shareholder elections every quarter",
        "Lowering commercial bank interest rates for residential home purchases"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion d'anthropologie de la mémoire",
      "text": "ANTHROPOLOGIE CULTURELLE — CAHIERS DE LA MÉMOIRE VIVANTE : LA DIGITALISATION DE LA MÉMOIRE ET LA PERTE DE L'ANCRAGE CORPOREL.\n\nLa numérisation intégrale des traces de l'existence humaine et le stockage externalisé des souvenirs sur des serveurs distants (Cloud) ont profondément altéré la nature de la mémoire individuelle et collective. Autrefois ancrée dans la matérialité des lieux, la transmission orale et la manipulation d'objets témoins transmis de génération en génération, la mémoire contemporaine se trouve dématérialisée et dispersée dans un flux d'informations numériques fluides mais fondamentalement volatils.\n\nCette externalisation technique de la mémoire produit un paradoxe troublant. Alors que la société accumule une quantité inédite de données numériques sur son passé, l'individu éprouve un sentiment croissant de désancrage historique et d'amnésie culturelle. Privée de l'expérience corporelle et de la continuité matérielle du souvenir, la mémoire numérique risque de se réduire à un fétichisme de l'archive chiffrée, déconnecté de la vivacité de l'expérience humaine vécue.",
      "q": "Quel paradoxe consubstantiel à la numérisation massive des souvenirs est mis en lumière ?",
      "opt": [
        "L'augmentation de la capacité de mémorisation biologique du cerveau humain",
        "L'accumulation inédite de données chiffrées associée à un désancrage et une amnésie culturelle",
        "L'obligation de détruire tous les ordinateurs pour retrouver la mémoire",
        "La gratuité absolue du stockage de données dans tous les pays"
      ],
      "ans": 1,
      "passEn": "CULTURAL ANTHROPOLOGY — LIVING MEMORY PAPERS: MEMORY DIGITALIZATION AND BODILY UNGROUNDING.\n\nDigitizing human memory traces onto remote cloud servers altered individual and collective recall. Once rooted in physical spaces, oral storytelling, and tangible heirlooms passed down generations, modern memory is dematerialized across fluid yet volatile digital data streams.\n\nThis technical memory offloading creates a troubling paradox. While storing unprecedented digital data volumes about the past, individuals experience growing historical disorientation and cultural amnesia. Stripped of physical experience and material continuity, digital memory risks shrinking into sterile archival data disconnected from lived human reality.",
      "qEn": "What paradox inherent to mass digital memory storage is highlighted in the text?",
      "optEn": [
        "Enhanced biological memory recall capacity within the human brain",
        "Unprecedented data storage volumes paired with historical disorientation and cultural amnesia",
        "Requirements to destroy all computers to restore human memory capacity",
        "Complete free availability of cloud data storage across all nations"
      ]
    },
    {
      "paperNum": 7,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai philosophique sur la technique",
      "text": "PHILOSOPHIE DE LA TECHNIQUE — REVUE DES ÉTUDES HUMANISTES : L'AUTONOMISATION DE LA TECHNIQUE ET LE DESSAISISSEMENT DE L'HUMAIN.\n\nLa thèse centrale de la critique philosophique de la technique moderne réside dans le constat de son autonomisation progressive par rapport aux fins morales de l'humanité. Loin d'être un simple outil neutre et malléable au service du bien-être humain, le système technicien contemporain obéit à sa propre logique interne d'auto-accroissement, d'optimisation permanente et d'efficacité maximale. Chaque innovation technique impose ses propres exigences de fonctionnement à la société, contraignant l'être humain à s'adapter au rythme de la machine plutôt que l'inverse.\n\nCe dessaisissement de la volonté humaine constitue le défi politique majeur du siècle. En transformant la société en un vaste système automatisé où chaque activité doit être quantifiée et optimisée, la rationalité technicienne évacue le débat sur les finalités morales et le sens de l'existence. Reprendre le contrôle du progrès exige de réaffirmer la primauté de la délibération éthique sur l'impératif d'efficacité technique.",
      "q": "Quelle thèse majeure l'auteur soutient-il au sujet du système technicien moderne ?",
      "opt": [
        "Il s'agit d'un instrument neutre parfaitement contrôlé par les citoyens",
        null,
        null,
        "Il garantit la paix mondiale en supprimant toutes les rivalités économiques"
      ],
      "passEn": "PHILOSOPHICAL TECHNIQUE — HUMANIST STUDIES REVIEW: AUTONOMIZATION OF TECHNOLOGY AND HUMAN DISPLACEMENT.\n\nCore philosophical critiques of modern tech assert its progressive autonomization from moral human ends. Far from neutral tools serving human wellbeing, technological systems follow internal logics of self-expansion and maximum efficiency. Each technical innovation enforces operational demands on society, forcing humans to adapt to machine paces rather than vice versa.\n\nThis displacement of human agency represents a major political challenge. Transforming society into automated systems where every activity is quantified, technical rationality discards moral debate. Reclaiming control over progress demands asserting ethical deliberation over technical efficiency imperatives.",
      "qEn": "What major thesis does the author defend regarding modern technical systems?",
      "optEn": [
        "Representing neutral tools flawlessly controlled by democratic citizens",
        null,
        null,
        "Guaranteeing global world peace by eliminating all commercial economic rivalries"
      ],
      "ans": 2
    }
  ],
  [
    {
      "paperNum": 8,
      "qNum": 1,
      "level": "A1",
      "docType": "Avis de bibliothèque municipale",
      "text": "MÉDIATHÈQUE DU PARC — FERMETURE HEBDOMADAIRE : La médiathèque est fermée au public tous les lundis. Les usagers peuvent déposer leurs livres empruntés dans la boîte aux lettres extérieure située à côté de l'entrée.",
      "q": "Où déposer ses livres le lundi quand la médiathèque est fermée ?",
      "opt": [
        "Dans la boîte aux lettres extérieure",
        "Auprès du gardien du jardin public",
        "Au guichet de la mairie centrale",
        "Sur les bancs situés devant la porte"
      ],
      "ans": 0,
      "passEn": "PARK MEDIA LIBRARY — WEEKLY CLOSURE: The library is closed to the public every Monday. Patrons can return borrowed books using the outdoor drop box next to the main entrance.",
      "qEn": "Where can patrons drop off books on Mondays when the library is closed?",
      "optEn": [
        "In the outdoor return drop box",
        "With the public park security guard",
        "At central city hall reception desk",
        "On benches located outside the door"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 2,
      "level": "A1",
      "docType": "Annonce d'auto-école",
      "text": "AUTO-ÉCOLE DU CENTRE — STAGE INTENSIF : Obtenez votre code de la route en 3 jours seulement durant les vacances scolaires ! Cours théoriques du lundi au mercredi de 09h00 à 17h00. Places limitées.",
      "q": "Combien de temps dure le stage intensif pour le code ?",
      "opt": [
        "1 semaine",
        "3 jours",
        "2 semaines",
        "1 mois"
      ],
      "ans": 1,
      "passEn": "CENTER DRIVING SCHOOL — INTENSIVE COURSE: Pass your driver theory test in just 3 days during school holidays! Theory classes Monday to Wednesday 9:00 AM to 5:00 PM. Limited spots.",
      "qEn": "How long does the intensive driver theory course last?",
      "optEn": [
        "1 week",
        "3 days",
        "2 weeks",
        "1 month"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 3,
      "level": "A1",
      "docType": "Panneau de magasin de chaussures",
      "text": "BOUTIQUE CHAUSSURES — PROMOTION D'AUTOMNE : Deuxième paire de chaussures achetée à moitié prix sur tous les modèles femme et enfant. Offre valable jusqu'à samedi soir dans la limite des stocks.",
      "q": "Quelle remise s'applique sur la deuxième paire de chaussures ?",
      "opt": [
        "20 % de réduction",
        "Une paire gratuite",
        "Moitié prix (50 %)",
        "10 euros de réduction"
      ],
      "ans": 2,
      "passEn": "SHOE BOUTIQUE — AUTUMN SALE: Buy one pair, get second pair at half price across all women and children shoes. Offer valid through Saturday evening while stocks last.",
      "qEn": "What discount applies to the second pair of shoes purchased?",
      "optEn": [
        "20% off discount",
        "One free pair gift",
        "Half price (50% off)",
        "10 euros off total"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 4,
      "level": "A1",
      "docType": "Consigne de musée d'histoire",
      "text": "MUSÉE HISTORIQUE — RÈGLES DE VISITE : Les photos sont autorisées sans flash uniquement. Les boissons et la nourriture sont strictement interdites dans les salles d'exposition.",
      "q": "Quelle interdiction s'applique à l'intérieur des salles du musée ?",
      "opt": [
        "Prendre des photos sans flash",
        "Porter des lunettes de soleil",
        "Parler à voix basse avec les guides",
        "Consommer des boissons et de la nourriture"
      ],
      "ans": 3,
      "passEn": "HISTORIC MUSEUM — VISITOR RULES: Photography allowed without flash only. Food and drinks are strictly prohibited inside exhibit galleries.",
      "qEn": "What rule prohibits actions inside museum exhibit galleries?",
      "optEn": [
        "Taking photos without flash",
        "Wearing dark sunglasses indoors",
        "Speaking quietly with guides",
        "Consuming food and drinks"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 5,
      "level": "A2",
      "docType": "SMS de confirmation de rendez-vous",
      "text": "CENTRE D'EXAMENS — CONFIRMATION : Votre rendez-vous pour la prise d'empreintes est confirmé pour demain à 14h15 au guichet 3. Merci de vous présenter 10 minutes à l'avance muni de votre pièce d'identité originale et de votre convocation.",
      "q": "Quelle consigne horaire le candidat doit-il respecter ?",
      "opt": [
        "Arriver 10 minutes en avance",
        "Arriver exactement à l'heure du rendez-vous",
        "Venir 30 minutes après l'heure fixée",
        "Attendre l'appel téléphonique du guichet"
      ],
      "ans": 0,
      "passEn": "TESTING CENTER — CONFIRMATION: Your fingerprinting appointment is confirmed for tomorrow at 2:15 PM at Counter 3. Please arrive 10 minutes early with your original ID and official summons letter.",
      "qEn": "What timing instruction must the candidate follow?",
      "optEn": [
        "Arrive 10 minutes early",
        "Arrive exactly at appointment time",
        "Come 30 minutes after scheduled time",
        "Wait for phone call from counter"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce de cours de cuisine",
      "text": "ATELIER GOURMAND — CUISINE ITALIENNE : Apprenez à préparer des pâtes fraîches artisanales et du véritable tiramisu ce vendredi de 18h30 à 21h00. Ingrédients bio et fiches recettes fournis. Dégustation conviviale en fin de cours. Tarif : 45 euros.",
      "q": "Que feront les participants à la fin du cours de cuisine ?",
      "opt": [
        "Nettoyer la cuisine du centre",
        "Déguster ensemble les plats préparés",
        "Vendre les restes aux passants",
        "Emporter tous les ustensiles de cuisine"
      ],
      "ans": 1,
      "passEn": "GOURMET WORKSHOP — ITALIAN COOKING CLASS: Learn to make fresh pasta and authentic tiramisu this Friday 6:30 PM to 9:00 PM. Organic ingredients and recipe cards provided. Shared food tasting at end. Price: 45 euros.",
      "qEn": "What will participants do at the end of the cooking class?",
      "optEn": [
        "Clean the commercial studio kitchen",
        "Taste and enjoy prepared dishes together",
        "Sell leftovers to passing pedestrians",
        "Take home all kitchen utensils used"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 7,
      "level": "A2",
      "docType": "Note de sécurité d'un parc aquatique",
      "text": "COMPLEXE AQUATIQUE — MESURES DE SÉCURITÉ : La surveillance des enfants de moins de 10 ans reste sous la responsabilité exclusive des parents accompagnateurs. Le port du bonnet de bain est obligatoire dans tous les bassins extérieurs et intérieurs.",
      "q": "Quel équipement est obligatoire pour se baigner dans les bassins ?",
      "opt": [
        "Des lunettes de plongée avec tuba",
        "Des bouchons d'oreilles étanches",
        "Le bonnet de bain obligatoire",
        "Des palmes de natation souples"
      ],
      "ans": 2,
      "passEn": "WATER PARK — SAFETY RULES: Supervising children under 10 remains sole parent responsibility. Wearing swim caps is mandatory across all outdoor and indoor pools.",
      "qEn": "What equipment is mandatory for swimming in the pools?",
      "optEn": [
        "Diving goggles with snorkel",
        "Waterproof earplugs",
        "Mandatory swim cap",
        "Flexible swimming fins"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 8,
      "level": "A2",
      "docType": "Avis de club de randonnée",
      "text": "CLUB DE MONTAGNE — SORTIE EN RAQUETTES : Première randonnée en raquettes de la saison ce dimanche. Départ en bus à 07h30 depuis la place du marché. Niveau facile, accessible aux familles. Prévoir des vêtements chauds et imperméables.",
      "q": "Où se fera le départ des participants le dimanche matin ?",
      "opt": [
        "Au sommet de la montagne",
        "À la gare ferroviaire",
        "Devant la mairie centrale",
        "Sur la place du marché en bus"
      ],
      "ans": 3,
      "passEn": "MOUNTAIN CLUB — SNOWSHOE HIKE: Season's first snowshoe trek this Sunday. Bus departure at 7:30 AM from market square. Easy level suitable for families. Bring warm waterproof clothes.",
      "qEn": "Where will participants depart Sunday morning?",
      "optEn": [
        "At the mountain summit directly",
        "At central railway station",
        "In front of central city hall",
        "From market square via bus"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 9,
      "level": "A2",
      "docType": "Message d'information de pharmacie",
      "text": "PHARMACIE DU MARCHÉ — SERVICE DE GARDE : Votre pharmacie sera de garde ce dimanche de 09h00 à 19h00 sans interruption. Pour l'obtention de médicaments soumis à ordonnance, présentez votre carte vitale et la prescription médicale.",
      "q": "Que faut-il présenter pour obtenir un médicament sur ordonnance le dimanche ?",
      "opt": [
        "La carte vitale et la prescription médicale",
        "Un justificatif de domicile récent",
        "Une pièce d'identité avec photo uniquement",
        "Le ticket de caisse des achats précédents"
      ],
      "ans": 0,
      "passEn": "MARKET PHARMACY — ON-CALL SERVICE: Pharmacy is on call this Sunday 9:00 AM to 7:00 PM continuously. Prescription medications require health card and prescription form.",
      "qEn": "What must be presented to obtain prescription medication on Sunday?",
      "optEn": [
        "Health card and doctor prescription",
        "Recent proof of residence document",
        "Photo ID card exclusively",
        "Store receipt from prior purchases"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 10,
      "level": "A2",
      "docType": "Annonce de festival de théâtre",
      "text": "CULTURE EN CITÉ — FESTIVAL DE THÉÂTRE DE RUE : 15 compagnies théâtrales investissent les places du centre-ville ce samedi de 14h00 à 23h00. Spectacles gratuits tout public. Programme détaillé disponible à l'office de tourisme.",
      "q": "Où obtenir le programme détaillé des spectacles du festival ?",
      "opt": [
        "Auprès des comédiens dans la rue",
        "À l'office de tourisme de la ville",
        "Sur les panneaux d'affichage des bus",
        "Par courrier postal sur demande"
      ],
      "ans": 1,
      "passEn": "CITY CULTURE — STREET THEATRE FESTIVAL: 15 theater companies perform across downtown squares Saturday 2:00 PM to 11:00 PM. Free family shows. Detailed programs at tourist office.",
      "qEn": "Where can visitors obtain detailed festival show schedules?",
      "optEn": [
        "From actors performing on streets",
        "At city tourist office desk",
        "On public bus display boards",
        "By postal mail request strictly"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 11,
      "level": "A2",
      "docType": "Information de garage automobile",
      "text": "GARAGE DU LAC —RÉVISION ESTIVALE : Bénéficiez d'un contrôle gratuit des 20 points de sécurité de votre véhicule avant votre départ en vacances (freins, pneus, éclairage, niveau d'huile). Prise de rendez-vous en ligne ou par téléphone.",
      "q": "Quelle prestation gratuite est proposée par le garage ?",
      "opt": [
        "Le lavage complet de la carrosserie",
        "La vidange d'huile et le changement de filtre",
        "Le contrôle gratuit de 20 points de sécurité",
        "Le remplacement des quatre pneumatiques"
      ],
      "ans": 2,
      "passEn": "LAKE GARAGE — SUMMER CAR CHECK: Free 20-point safety inspection before holiday travel (brakes, tires, lights, oil levels). Book online or by phone.",
      "qEn": "What free service is offered by the auto garage?",
      "optEn": [
        "Full exterior car wash service",
        "Engine oil drain and filter change",
        "Free 20-point safety inspection",
        "Replacing all four vehicle tires"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 12,
      "level": "A2",
      "docType": "Consigne d'aire de jeux pour enfants",
      "text": "VILLE DE QUÉBEC — AIRE DE JEUX DU PARC : Espace réservé aux enfants de 2 à 8 ans sous la surveillance constante des parents. Les chaussures à crampons et les vélos sont strictement interdits dans l'enceinte du parc à jeux.",
      "q": "Quel équipement ou objet est interdit dans l'aire de jeux ?",
      "opt": [
        "Les chaussures de sport souples",
        "Les gourdes d'eau en plastique",
        "Les chapeaux de soleil pour enfants",
        "Les vélos et les chaussures à crampons"
      ],
      "ans": 3,
      "passEn": "QUEBEC CITY — PARK PLAYGROUND RULES: Reserved for children 2 to 8 under constant parent supervision. Cleated shoes and bicycles are strictly prohibited inside playground area.",
      "qEn": "What object or equipment is banned inside the playground?",
      "optEn": [
        "Soft athletic sports sneakers",
        "Plastic water drinking bottles",
        "Children sun protection hats",
        "Bicycles and cleated shoes"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "RENOVATION URBAINE — BULLETIN DU CADRE DE VIE : LA TRANSFORMATION DES ANCIENNES FRICHES INDUSTRIELLES EN PARCS BRUTS.\n\nPlutôt que d'artificialiser de nouvelles terres agricoles en périphérie, la métropole entreprend la réhabilitation systématique des anciens sites industriels abandonnés. Ces friches en béton sont dépolluées, déconstruites puis transformées en espaces verts naturels intégrés au tissu urbain.\n\nCette stratégie d'urbanisme circulaire permet de créer de véritables îlots de fraîcheur au cœur des quartiers denses tout en préservant les terres naturelles environnantes de l'étalement urbain.",
      "q": "Objectif principal de la transformation des friches industrielles en espaces verts :",
      "opt": [
        "Créer des îlots de fraîcheur et éviter l'étalement urbain",
        "Construire de nouveaux centres commerciaux géants en béton",
        "Vendre les terrains à des usines chimiques étrangères",
        "Interdire aux citoyens de se promener dans les parcs neufs"
      ],
      "ans": 0,
      "passEn": "URBAN RENEWAL — LIVING ENVIRONMENT BULLETIN: TURNING ABANDONED INDUSTRIAL SITES INTO PARKS.\n\nAvoiding rural farmland destruction, the city is rehabilitating abandoned industrial sites. Concrete brownfields are decontaminated, demolished, and converted into urban green spaces.\n\nThis circular urban planning strategy creates cooling islands in dense neighborhoods while preserving surrounding countryside from urban sprawl.",
      "qEn": "Primary goal of converting industrial brownfield sites into green parks:",
      "optEn": [
        "Creating cooling islands and preventing urban sprawl",
        "Building massive new concrete shopping malls",
        "Selling land to foreign chemical manufacturing plants",
        "Banning citizens from walking in newly opened parks"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur la préservation du patrimoine culinaire",
      "text": "GASTRONOMIE ET TERROIR — REVUE DU PATRIMOINE CULINAIRE : LA SAUVEGARDE DES RECETTES TRADITIONNELLES RÉGIONALES.\n\nFace à la standardisation des habitudes alimentaires et à l'hégémonie des produits industriels prêts à consommer, une confrérie de cuisiniers et d'historiens répertorie les recettes traditionnelles menacées d'oubli. En publiant des inventaires détaillés du patrimoine gourmand local, ces passionnés transmettent le savoir-faire des anciens aux jeunes générations.\n\nDes ateliers de cuisine intergénérationnels organisés dans les écoles permettent d'initier les enfants aux saveurs authentiques des produits du terroir régional.",
      "q": "Action menée par la confrérie pour préserver le patrimoine culinaire local :",
      "opt": [
        "Fabriquer des plats surgelés industriels bon marché",
        "Répertorier les recettes traditionnelles et transmettre le savoir-faire",
        "Interdire la vente de produits frais dans les épiceries",
        "Obliger les restaurants à cuisiner uniquement des plats étrangers"
      ],
      "ans": 1,
      "passEn": "GASTRONOMY AND REGIONAL HERITAGE — CULINARY REVIEW: SAFEGUARDING TRADITIONAL REGIONAL RECIPES.\n\nCountering food standardization and industrial convenience meal dominance, a guild of chefs and historians catalogs traditional recipes at risk of disappearing. Publishing regional culinary heritage inventories, they pass down ancestral cooking knowledge.\n\nIntergenerational cooking workshops in schools introduce children to authentic regional food flavors.",
      "qEn": "Action taken by the culinary guild to preserve local food heritage:",
      "optEn": [
        "Manufacturing cheap industrial frozen ready-to-eat meals",
        "Cataloging traditional recipes and passing down cooking skills",
        "Banning fresh food sales across retail grocery stores",
        "Mandating restaurants to cook foreign imported dishes only"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur l'autonomie énergétique",
      "text": "ENERGIE PROPRE — BULLETIN DES ÉNERGIES RENOUVELABLES : LE DÉVELOPPEMENT DES CHAUFFERIES AU BOIS DÉCHET LOCAL.\n\nPour remplacer les vieilles chaudières au fioul polluantes dans les bâtiments publics, la communauté de communes installe des chaufferies centrales alimentées par du bois déchet issu de l'entretien des forêts locales. Ce réseau de chaleur renouvelable chauffe de manière écologique les écoles, la mairie et le gymnase municipal.\n\nCette solution énergétique locale permet de réduire l'empreinte carbone de la collectivité tout en créant des emplois non délocalisables dans la filière forestière régionale.",
      "q": "Combustible utilisé pour alimenter le réseau de chauffage des bâtiments publics :",
      "opt": [
        "Du charbon de terre importé de pays lointains",
        "Du mazout lourd hautement polluant",
        "Du bois déchet issu de l'entretien des forêts locales",
        "Du gaz naturel fossile extrait en haute mer"
      ],
      "ans": 2,
      "passEn": "CLEAN ENERGY — RENEWABLE ENERGY BULLETIN: EXPANDING LOCAL WASTE-WOOD HEATING PLANTS.\n\nReplacing polluting oil boilers in public buildings, the district is installing central biomass heating plants powered by wood waste from local forest maintenance. This green heating grid warms schools, city hall, and gyms.\n\nThis local energy solution lowers municipal carbon footprints while creating non-relocatable forestry jobs.",
      "qEn": "Fuel used to power the heating grid for public municipal buildings:",
      "optEn": [
        "Imported coal shipped from distant overseas countries",
        "Heavy polluting heating oil fuel",
        "Waste wood sourced from local forest maintenance projects",
        "Offshore extracted fossil natural gas"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur la biodiversité végétale",
      "text": "BOTANIQUE URBAINE — BULLETIN DE LA FLORE CIVIQUE : LA PRÉSERVATION DES VERGERS CONSERVATOIRES MUNICIPAUX.\n\nPour éviter la disparition des variétés anciennes d'arbres fruitiers (pommiers, poiriers, pruniers locaux), la direction des espaces verts a implanté deux vergers conservatoires en lisière de ville. Libres d'accès, ces vergers abritent plus de 80 variétés traditionnelles adaptées aux spécificités du climat régional.\n\nLes citoyens participer à des séances de taille, de greffage et à la récolte partagée des fruits en automne, découvrant ainsi la richesse gustative des fruits d'autrefois.",
      "q": "Rôle essentiel des vergers conservatoires implantés par la municipalité :",
      "opt": [
        "Vendre des fruits exotiques importés par avion",
        "Interdire aux citoyens de consommer des fruits frais",
        "Remplacer les arbres fruitiers par des places de parking",
        "Préserver les variétés anciennes d'arbres fruitiers locaux"
      ],
      "ans": 3,
      "passEn": "URBAN BOTANY — CIVIC FLORA BULLETIN: PRESERVING MUNICIPAL CONSERVATORY ORCHARDS.\n\nPreventing the extinction of heirloom fruit tree varieties (local apples, pears, plums), city parks established two conservatory orchards on the city outskirts. Open access, these orchards host over 80 traditional varieties adapted to regional climates.\n\nCitizens participate in pruning, grafting, and autumn fruit harvests, discovering historical fruit flavors.",
      "qEn": "Essential role of conservatory orchards planted by the municipal council:",
      "optEn": [
        "Selling exotic tropical fruit imported via air freight",
        "Prohibiting citizens from consuming fresh fruit produce",
        "Replacing fruit trees with asphalt vehicle parking spaces",
        "Preserving traditional heirloom local fruit tree varieties"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur l'inclusion numérique",
      "text": "SOLIDARITÉ DIGITALE — REVUE DE L'INSERTION NUMÉRIQUE : LES CONSEILLERS NUMÉRIQUES ITINÉRANTS DANS LES QUARTIER.\n\nAfin d'accompagner les personnes isolées ou peu habituées aux démarches administratives en ligne, la collectivité déploie une équipe de conseillers numériques itinérants. Présents dans les maisons de quartier et les médiathèques, ces professionnels aident gratuitement les usagers à remplir leurs formulaires, créer leurs espaces personnels et utiliser leurs courriels.\n\nCette présence humaine bienveillante permet de lutter efficacement contre l'illectronisme et de garantir l'accès aux droits sociaux pour tous les citoyens.",
      "q": "Mission principale des conseillers numériques itinérants auprès des citoyens :",
      "opt": [
        "Accompagner gratuitement les usagers dans leurs démarches en ligne",
        "Vendre des abonnements internet et des téléphones chers",
        "Obliger les résidents à passer des examens informatiques",
        "Remplacer l'ensemble des guichets d'accueil physiques par des écrans"
      ],
      "ans": 0,
      "passEn": "DIGITAL SOLIDARITY — DIGITAL INCLUSION REVIEW: MOBILE DIGITAL COUNSELORS IN NEIGHBORHOODS.\n\nAssisting isolated residents unaccustomed to online administration, the city deployed mobile digital counselors. Stationed in community centers and libraries, these professionals offer free assistance with online forms, personal accounts, and email setup.\n\nThis supportive human presence combats digital illiteracy and secures access to social benefits for all citizens.",
      "qEn": "Main mission of mobile digital counselors assisting local citizens:",
      "optEn": [
        "Offering free assistance with online administrative tasks",
        "Selling expensive internet subscriptions and mobile phones",
        "Forcing residents to pass formal computer literacy exams",
        "Replacing all physical walk-in reception desks with screens"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur le recyclage des textiles",
      "text": "ÉCONOMIE CIRCULAIRE — BULLETIN DU TEXTILE RECYCLÉ : LA TRANSFORMATION DES VIEUX JEANS EN ISOLANT D'IMMEUBLE.\n\nUne entreprise de recyclage solidaire collecte les pantalons en jean usagés non réutilisables pour les transformer en isolant thermique et acoustique pour le bâtiment. Après effilochage mécanique et traitement ignifuge écologique, le coton recyclé remplace avantageusement la laine de verre synthétique dans la rénovation des logements.\n\nCette filière industrielle écologique valorise des déchets textiles destinés à la décharge tout en offrant un isolant performant et respectueux de la santé des artisans poseurs.",
      "q": "Usage innovant donné aux anciens jeans en coton non réutilisables :",
      "opt": [
        "Les brûler pour fabriquer du plastique souple",
        "Les transformer en matériau d'isolation thermique pour le bâtiment",
        "Les exporter comme chiffons dans des pays lointains",
        "Les enterrer dans les sols agricoles pour enrichir la terre"
      ],
      "ans": 1,
      "passEn": "CIRCULAR ECONOMY — RECYCLED TEXTILE BULLETIN: TURNING OLD JEANS INTO BUILDING INSULATION.\n\nA social recycling firm collects unwearable denim jeans to turn them into thermal and acoustic building insulation. Following mechanical shredding and eco-friendly fireproofing, recycled cotton replaces synthetic glass wool in home retrofits.\n\nThis green industrial supply chain upcycles textile waste while providing high-performance insulation safe for installers.",
      "qEn": "Innovative usage given to unwearable old cotton denim jeans:",
      "optEn": [
        "Burning them to manufacture flexible plastic compounds",
        "Converting them into building thermal insulation materials",
        "Exporting them as industrial rags to distant countries",
        "Burying them in agricultural soils to enrich farmland"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur le commerce solidaire",
      "text": "COMMERCE ÉQUITABLE — REVUE DES INITIATIVES SOLIDAIRES : LES ÉPICERIES SOCIALES ÉTIQUETÉES À PETITS PRIX.\n\nLes épiceries sociales de quartier offrent aux familles modestes orientées par les travailleurs sociaux la possibilité de faire leurs courses alimentaires en ne payant que 10 à 20 % du prix réel des produits. Approvisionnées par les banques alimentaires et la grande distribution, ces épiceries proposent des produits frais, des produits d'hygiène et des denrées équilibrées.\n\nCe dispositif préserve la dignité des personnes accueillies en leur permettant de choisir librement leurs achats plutôt que de recevoir un colis alimentaire imposé.",
      "q": "Avantage du système de l'épicerie sociale pour la dignité des familles :",
      "opt": [
        "Recevoir gratuitement un colis de nourriture pré-composé sans choix",
        "Obliger les familles à travailler dans l'épicerie gratuitement",
        "Choisir librement ses achats alimentaires en payant un prix très réduit",
        "Interdire aux bénéficiaires d'acheter des fruits et légumes frais"
      ],
      "ans": 2,
      "passEn": "FAIR TRADE — SOLIDARITY INITIATIVES REVIEW: DISCOUNTED NEIGHBORHOOD SOCIAL GROCERY STORES.\n\nNeighborhood social grocery stores allow low-income families referred by social workers to shop paying only 10% to 20% of retail food prices. Stocked by food banks and grocers, stores supply fresh produce and hygiene items.\n\nThis system preserves shopper dignity by allowing free choice of items rather than handing out pre-set food hampers.",
      "qEn": "Advantage of social grocery store systems for family dignity:",
      "optEn": [
        "Receiving a free pre-packed food hamper with no choice",
        "Mandating families to volunteer work inside the grocery store",
        "Freely choosing groceries while paying deeply discounted prices",
        "Prohibiting beneficiaries from purchasing fresh fruits and vegetables"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur l'artisanat du verre",
      "text": "ARTS DU VERRE — CAHIERS DE LA CRÉATION ARTISANALE : LA PRESERVATION DU SOUFFLAGE DE VERRE TRADITIONNEL.\n\nLes derniers maîtres verriers de la région luttent pour maintenir vivante la tradition du verre soufflé à la bouche. Travaillant devant des fours portés à plus de 1100 degrés, ces artisans façonnent des vases, des luminaires et des pièces d'art aux formes uniques et aux reflets nuancés.\n\nPour assurer la transmission de cet art exigeant, les ateliers ouvrent leurs portes au public et proposent des stages d'initiation permettant aux amateurs d'expérimenter le travail de la matière en fusion.",
      "q": "Action menée par les maîtres verriers pour transmettre leur savoir-faire au public :",
      "opt": [
        "Vendre des objets industriels fabriqués en plastique transparent",
        "Exporter toutes les pièces d'art sans jamais les montrer en France",
        "Fermer les fours et arrêter définitivement la production de verre",
        "Ouvrir les ateliers au public et proposer des stages d'initiation"
      ],
      "ans": 3,
      "passEn": "GLASS ARTS — ARTISAN CREATION PAPERS: PRESERVING TRADITIONAL HAND-BLOWN GLASSMAKING.\n\nRegional master glassblowers fight to keep mouth-blown glass traditions alive. Working before 1100-degree furnaces, artisans shape unique vases, lighting fixtures, and art pieces.\n\nEnsuring transmission of this craft, studios open doors to the public and offer introductory workshops allowing amateurs to experience working molten glass.",
      "qEn": "Action taken by master glassblowers to transmit their craft knowledge to the public:",
      "optEn": [
        "Selling industrial mass-produced items made from clear plastic",
        "Exporting all art pieces overseas without exhibiting them locally",
        "Shutting down furnaces and permanently ending glassmaking production",
        "Opening studios to the public and offering introductory workshops"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur les éco-gestes au bureau",
      "text": "SOCIÉTÉ ET TRAVAIL — BULLETIN DE L'ÉCO-RESPONSABILITÉ : LA RÉDUCTION DU GASPILLAGE DE PAPIER EN ENTREPRISE.\n\nAfin d'atteindre leurs objectifs de réduction de leur empreinte carbone, de nombreuses entreprises mettent en place des politiques d'impression raisonnée. En paramétrant les imprimantes par défaut en recto-verso et noir et blanc, et en exigeant un badge personnel pour débloquer les impressions, les sociétés réduisent de 30 % leur consommation de papier.\n\nCes gestes simples s'accompagnent de bacs de recyclage réservés au papier de bureau, permettant sa transformation directe en carton d'emballage.",
      "q": "Mesure technique appliquée aux imprimantes pour économiser le papier :",
      "opt": [
        "Paramétrer les imprimantes par défaut en recto-verso et noir et blanc",
        "Interdire totalement l'impression de tout document de travail",
        "Obliger les salariés à payer leurs impressions par carte bancaire",
        "Utiliser uniquement du papier couleur de luxe très coûteux"
      ],
      "ans": 0,
      "passEn": "SOCIETY AND WORK — ECO-RESPONSIBILITY BULLETIN: REDUCING OFFICE PAPER WASTE IN COMPANIES.\n\nTargeting reduced carbon footprints, corporations are adopting smart printing policies. Setting printers default to double-sided black-and-white, and requiring staff ID badges to release print jobs, cuts paper consumption by 30%.\n\nThese measures pair with dedicated office paper recycling bins, transforming used paper into cardboard packaging.",
      "qEn": "Technical configuration applied to office printers to save paper:",
      "optEn": [
        "Setting printers default to double-sided black-and-white mode",
        "Banning printing of all professional work documents entirely",
        "Mandating employees to pay for print jobs using credit cards",
        "Using expensive luxury colored paper sheets exclusively"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur l'autonomie alimentaire",
      "text": "AGRICULTURE URBAINE — REVUE DES FERMES EN CITÉ : L'EXPLOITATION DES SERRES POTAGÈRES SUR LES TOITS.\n\nDes serres maraîchères automatisées installées sur les toits d'immeubles de bureaux permettent de produire des légumes frais (salades, tomates, fraises) en utilisant la chaleur résiduelle du bâtiment. Alimentées par la récupération d'eau de pluie et fonctionnant en hydroponie, ces fermes urbaines fournissent quotidiennement la cantine de l'entreprise et les habitants du quartier.\n\nCette agriculture ultra-locale garantit une fraîcheur imbattable des aliments tout en supprimant les émissions de CO2 liées au transport routier des marchandises.",
      "q": "Avantage direct des fermes maraîchères installées sur les toits des immeubles :",
      "opt": [
        "L'obligation d'utiliser des engrais chimiques industriels lourds",
        "Une production de légumes frais sans émission de CO2 liée au transport",
        "L'augmentation des factures de chauffage pour les bureaux",
        "La suppression de l'accès au toit pour des raisons de sécurité"
      ],
      "ans": 1,
      "passEn": "URBAN AGRICULTURE — CITY FARMS REVIEW: ROOFTOP VEGETABLE GREENHOUSE FARMING.\n\nAutomated rooftop greenhouses on office buildings produce fresh vegetables (lettuce, tomatoes, strawberries) utilizing building waste heat. Powered by rainwater harvesting and hydroponics, these urban farms supply corporate cafeterias and local neighbors daily.\n\nThis ultra-local farming ensures unmatched produce freshness while eliminating CO2 emissions from road freight transport.",
      "qEn": "Direct advantage of vegetable greenhouse farms installed on building rooftops:",
      "optEn": [
        "Mandatory requirements to apply heavy industrial chemical fertilizers",
        "Fresh produce supply with zero CO2 transport freight emissions",
        "Increased building heating utility bills for office spaces",
        "Eliminating rooftop access entirely due to safety concerns"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la gestion des forêts",
      "text": "FORESTERIE ET CLIMAT — REVUE DE L'ÉCOLOGIE SYLVICOLE : L'ADAPTATION DES ESSENCES FORESTIÈRES AU RÉCHAUFFEMENT CLIMATIQUE.\n\nLa sécheresse récurrente et les attaques de parasites comme le scolyte provoquent un dépérissement massif des plantations de résineux et de hêtres dans de nombreux massifs forestiers. Face à ce constat alarmant, les gestionnaires forestiers modifient en profondeur leurs méthodes de reboisement en remplaçant les monocultures fragiles par des peuplements mélangés d'essences méditerranéennes ou résilientes (chênes pubescents, pins maritimes, cèdres).\n\nCette diversification sylvicole renforce la résistance biologique des forêts face aux incendies et aux tempêtes tout en garantissant la pérennité de la ressource en bois.",
      "q": "Changement fondamental apporté à la gestion forestière pour faire face au climat :",
      "opt": [
        "La plantation massive d'arbres synthétiques en plastique incassable",
        "La coupe rase définitive de toutes les forêts sans aucun reboisement",
        "Le remplacement des monocultures par la diversification des essences d'arbres",
        "L'arrosage quotidien de toutes les forêts avec de l'eau potable"
      ],
      "ans": 2,
      "passEn": "FORESTRY AND CLIMATE — FORESTRY ECOLOGY REVIEW: ADAPTING TREE SPECIES TO CLIMATE CHANGE.\n\nRecurrent droughts and bark beetle infestations cause widespread die-offs in conifer and beech forests. Addressing this crisis, forestry managers are overhauling reforestation methods, replacing fragile monocultures with mixed stands of resilient or Mediterranean species (downy oak, maritime pine, cedar).\n\nThis species diversification enhances forest biological resilience against fires and storms while securing long-term timber supply.",
      "qEn": "Fundamental change brought to forest management to cope with climate stress:",
      "optEn": [
        "Massive planting of unbreakable synthetic plastic trees",
        "Clear-cutting all forests permanently without any replanting",
        "Replacing monocultures with diverse resilient tree species stands",
        "Irrigating entire forests daily using municipal drinking water"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur la santé environnementale",
      "text": "SANTÉ PUBLIQUE — BULLETIN D'ÉPIDÉMIOLOGIE ENVIRONNEMENTALE : LES EFFETS DES PERTURBATEURS ENDOCRINIENS DANS LES EMBALLAGES.\n\nLa présence de composés chimiques synthétiques (phtalates, bisphénols, PFAS) dans les emballages alimentaires et les produits cosmétiques du quotidien suscite de vives inquiétudes chez les épidémiologistes. Capables d'interférer avec le système hormonal humain même à très faible dose, ces perturbateurs endocriniens sont suspectés de contribuer à l'augmentation des troubles de la fertilité et des maladies métaboliques.\n\nPour protéger les populations vulnérables (femmes enceintes et jeunes enfants), les autorités sanitaires recommandent l'interdiction de ces substances toxiques et le retour aux emballages neutres en verre ou inox.",
      "q": "Recommandation des autorités sanitaires pour protéger la population des perturbateurs endocriniens :",
      "opt": [
        "Multiplier par deux l'usage des emballages plastiques jetables",
        "Interdire la vente de produits alimentaires frais en magasin",
        "Obliger les consommateurs à prendre des pilules neutralisantes",
        "Bannir les substances toxiques et privilégier les emballages neutres (verre, inox)"
      ],
      "ans": 3,
      "passEn": "PUBLIC HEALTH — ENVIRONMENTAL EPIDEMIOLOGY BULLETIN: ENDOCRINE DISRUPTOR EFFECTS IN PACKAGING.\n\nSynthetic chemical compounds (phthalates, bisphenols, PFAS) in food packaging and cosmetics raise severe epidemiologist concerns. Interfering with human hormonal systems even at low doses, these endocrine disruptors are linked to rising fertility disorders and metabolic illnesses.\n\nProtecting vulnerable populations (pregnant women, young children), health authorities urge banning these toxic substances and returning to neutral glass or stainless steel packaging.",
      "qEn": "Health authority recommendation to protect populations from endocrine disruptors:",
      "optEn": [
        "Doubling single-use plastic packaging production nationwide",
        "Prohibiting sales of fresh food produce across grocery stores",
        "Mandating consumers to swallow daily chemical neutralizing pills",
        "Banning toxic chemicals and adopting neutral glass/steel packaging"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la rénovation des bâtiments",
      "text": "BÂTIMENT ET ÉNERGIE — REVUE DE L'HABITAT DURABLE : L'USAGE DES MATÉRIAUX BIOSOURCÉS EN CONSTRUCTION.\n\nL'empreinte carbone de la construction neuve et de la rénovation thermique dépend fortement des matériaux employés. L'isolation classique en polystyrène ou en laine de verre synthétique, issue de la pétrochimie, génère une forte dette écologique à la fabrication. Pour décarboner le secteur du bâtiment, les architectes privilégient désormais les isolants biosourcés issus de ressources renouvelables (paille, chanvre, ouate de cellulose, laine de bois).\n\nCes matériaux écologiques stockent le carbone durant toute la durée de vie du bâtiment tout en offrant un confort d'été supérieur grâce à leur forte inertie thermique.",
      "q": "Atout majeur des isolants biosourcés (paille, chanvre, bois) en construction :",
      "opt": [
        "Le stockage du carbone et un confort thermique d'été supérieur",
        "Leur coût de fabrication dix fois supérieur aux isolants pétrochimiques",
        "L'obligation de démolir le bâtiment tous les cinq ans",
        "Leur forte sensibilité aux attaques d'insectes et au feu"
      ],
      "ans": 0,
      "passEn": "BUILDING AND ENERGY — SUSTAINABLE HOUSING REVIEW: USING BIO-SOURCED CONSTRUCTION MATERIALS.\n\nCarbon footprints of building construction and retrofits depend heavily on materials used. Traditional petrochemical insulation (polystyrene, glass wool) carries high manufacturing ecological debt. Decarbonizing construction, architects prioritize bio-sourced insulation from renewable resources (straw, hemp, cellulose, wood wool).\n\nThese green materials store carbon throughout building lifespans while delivering superior summer thermal comfort due to high thermal inertia.",
      "qEn": "Major asset of bio-sourced insulation (straw, hemp, wood) in construction:",
      "optEn": [
        "Long-term carbon storage and superior summer thermal comfort",
        "Manufacturing costs ten times higher than petrochemical insulation",
        "Mandatory requirements to demolish buildings every five years",
        "Extreme vulnerability to insect attacks and structural fire hazards"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur l'économie de la fonctionnalité",
      "text": "ÉCONOMIE INDUSTRIELLE — REVUE DES NOUVEAUX MODÈLES : L'ÉCONOMIE DE LA FONCTIONNALITÉ ET LA LOCATION D'USAGE.\n\nL'économie de la fonctionnalité repose sur la substitution de la vente d'un bien par la vente de son usage ou de sa performance. Plutôt que de vendre des pneus, des photocopieurs ou des appareils ménagers, les industriels louent l'usage du matériel tout en restant propriétaires de l'équipement et responsables de son entretien et de son recyclage.\n\nCe modèle économique inciter directement le fabricant à concevoir des produits extrêmement durables, réparables et faciles à démonter, mettant fin à la logique d'obsolescence programmée destructrice de ressources.",
      "q": "Changement de logique pour le fabricant dans l'économie de la fonctionnalité :",
      "opt": [
        "Fabriquer des produits jetables pour vendre du neuf le plus souvent possible",
        "Concevoir des produits durables et réparables dont il reste propriétaire",
        "Obliger les clients à réparer eux-mêmes le matériel sans assistance",
        "Fermer les ateliers d'entretien et licencier les techniciens"
      ],
      "ans": 1,
      "passEn": "INDUSTRIAL ECONOMICS — NEW MODELS REVIEW: FUNCTIONALITY ECONOMY AND USAGE LEASING.\n\nFunctionality economics replaces product sales with selling usage or performance outcomes. Rather than selling tires, copiers, or home appliances, manufacturers lease equipment usage while retaining ownership, maintenance, and recycling responsibilities.\n\nThis business model directly incentivizes manufacturers to build highly durable, repairable, easily disassembled goods, ending resource-wasting planned obsolescence.",
      "qEn": "Shift in manufacturer logic under functionality economics models:",
      "optEn": [
        "Building disposable goods to maximize new product retail sales frequency",
        "Designing durable repairable goods while retaining product ownership",
        "Forcing customers to repair equipment themselves without support",
        "Closing maintenance service centers and laying off technicians"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la préservation de la nuit",
      "text": "ENVIRONNEMENT ET NUIT — BULLETIN DE L'ÉCOLOGIE NOCTURNE : LA LUTTE CONTRE LA POLLUTION LUMINEUSE ET LA PROTECTION DES TÉNÈBRES.\n\nL'éclairage artificiel nocturne excessif des monuments, des vitrines commerciales et des axes routiers perturbe gravement la biodiversité nocturne. En aveuglant les insectes, les chauves-souris et les oiseaux migrateurs, le sur-éclairage désoriente la faune sauvage tout en privant les citoyens de la contemplation du ciel étoilé.\n\nPour préserver l'environnement nocturne, de nombreuses communes éteignent l'éclairage public au cœur de la nuit (entre 23h00 et 05h00) ou installent des lampadaires LED orientés vers le sol et à intensité variable.",
      "q": "Mesure concrète adoptée par les communes pour protéger l'environnement nocturne :",
      "opt": [
        "Multiplier par deux la puissance des projecteurs de rue toute la nuit",
        "Interdire aux citoyens de sortir de chez eux après 22h00",
        "Éteindre l'éclairage en milieu de nuit et orienter les lampadaires vers le sol",
        "Remplacer l'ensemble des arbres par des pylônes d'éclairage"
      ],
      "ans": 2,
      "passEn": "ENVIRONMENT AND NIGHT — NOCTURNAL ECOLOGY BULLETIN: COMBATING LIGHT POLLUTION AND PROTECTING DARKNESS.\n\nExcessive nighttime artificial lighting on monuments, storefronts, and roads severely harms nocturnal biodiversity. Blinding insects, bats, and migratory birds, over-lighting disorients wildlife while stripping citizens of starry skies.\n\nProtecting night environments, towns are turning off public streetlights mid-night (11:00 PM to 5:00 AM) or installing downward-shielded, dimmable LED fixtures.",
      "qEn": "Concrete action taken by towns to protect nocturnal environments:",
      "optEn": [
        "Doubling street floodlight brightness continuously all night",
        "Prohibiting citizens from leaving their homes after 10:00 PM",
        "Turning off mid-night lighting and aiming streetlights downward",
        "Replacing all city trees with high-voltage light towers"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la santé et les transports",
      "text": "SANTÉ PUBLIQUE — BULLETIN DE LA MOBILITÉ ACTIVE : LES BÉNÉFICES SANITAIRES DU DÉPLACEMENT À VÉLO AU QUOTIDIEN.\n\nL'utilisation régulière du vélo ou de la marche pour effectuer ses trajets quotidiens domicile-travail constitue le moyen le plus efficace de lutter contre la sédentarité et l'hypertension. Des études médicales comparatives démontrent que 30 minutes de vélo quotidien réduisent de 40 % les risques de développement du diabète de type 2 et des maladies coronariennes.\n\nLes bénéfices pour la santé individuelle et la réduction des dépenses de sécurité sociale dépassent largement les risques liés aux accidents de la route ou à l'exposition à la pollution de l'air.",
      "q": "Constat établi par les études médicales sur la pratique quotidienne du vélo :",
      "opt": [
        "Elle augmente la fatigue cardiaque et accélère le vieillissement",
        "Elle exige un entraînement physique intensif de niveau olympique",
        "Elle est moins bénéfique que de rester assis dans les embouteillages",
        "Elle réduit de 40 % les risques de maladies cardiovasculaires et de diabète"
      ],
      "ans": 3,
      "passEn": "PUBLIC HEALTH — ACTIVE MOBILITY BULLETIN: HEALTH BENEFITS OF DAILY COMMUTING BY BICYCLE.\n\nRegularly cycling or walking for daily work commutes represents the most effective strategy against sedentary lifestyles and hypertension. Comparative medical studies prove 30 minutes of daily cycling cuts type-2 diabetes and heart disease risks by 40%.\n\nIndividual health gains and social security savings far outweigh risks from traffic accidents or air pollution exposure.",
      "qEn": "Finding established by medical studies regarding daily bicycle commuting:",
      "optEn": [
        "Increases cardiac strain and accelerates biological aging rates",
        "Requires intensive physical training at Olympic athlete levels",
        "Offers fewer health benefits than sitting inside traffic jams",
        "Reduces cardiovascular disease and diabetes risks by 40%"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la gestion foncière",
      "text": "SOCIOLOGIE RURALE — CAHIERS DE L'AMÉNAGEMENT DU TERRITOIRE : LA PRÉSERVATION DES TERRES AGRICOLES CONTRE L'ARTIFICIALISATION.\n\nL'extension continue des zones pavillonnaires et des infrastructures routières grignote chaque année des milliers d'hectares de terres agricoles fertiles. Cette artificialisation irréversible des sols détruit de précieux réservoirs de biodiversité et menace l'autonomie alimentaire future des territoires.\n\nPour enrayer ce mitage du paysage, la loi 'Zéro Artificialisation Nette' (ZAN) impose aux collectivités locales de densifier prioritairement le tissu urbain existant et de réhabiliter les friches avant de pouvoir autoriser toute nouvelle construction sur des terres naturelles.",
      "q": "Obligation imposée aux collectivités par la loi contre l'artificialisation des sols :",
      "opt": [
        "Densifier la ville existante et rénover les friches avant toute construction",
        "Bétonner immédiatement l'intégralité des champs agricoles environnants",
        "Interdire aux agriculteurs de cultiver leurs céréales",
        "Obliger les habitants à déménager dans des tours de 50 étages"
      ],
      "ans": 0,
      "passEn": "RURAL SOCIOLOGY — REGIONAL PLANNING PAPERS: PRESERVING FARMLAND AGAINST SOIL ARTIFICIALIZATION.\n\nSuburban housing sprawl and road infrastructure devour thousands of hectares of fertile farmland annually. Irreversible soil sealing destroys precious biodiversity reservoirs and threatens future food autonomy.\n\nHalting landscape fragmentation, 'Net Zero Soil Sealing' laws mandate local councils to prioritize infill density in existing urban areas and redevelop brownfields before building on natural land.",
      "qEn": "Obligation imposed on local councils by laws against soil sealing:",
      "optEn": [
        "Densifying existing cities and retrofitting brownfields before new builds",
        "Paving over surrounding agricultural fields with concrete immediately",
        "Prohibiting regional farmers from cultivating grain crops",
        "Forcing residents to relocate into 50-story residential towers"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial socio-politique",
      "text": "SOCIOLOGIE POLITIQUE — TRIBUNE DU DÉBAT SOCIAL : LA RATIONALISATION MANAGÉRIALE ET LA DISSOLUTION DU SENS AU TRAVAIL.\n\nL'imposition généralisée des méthodes de gestion managériale axées sur le reporting permanent, les indicateurs chiffrés de performance et la réduction des coûts au sein des services publics (hôpital, éducation, justice) opère une dégradation profonde de la qualité du travail. En remplaçant l'autonomie professionnelle et la déontologie du métier par des objectifs quantitatifs arbitraires fixés par des gestionnaires extérieurs au terrain, le système managérial dépossède les agents de leur expertise métier.\n\nCette rationalisation comptable génère une perte de sens généralisée et une souffrance éthique aiguë. Lorsque le soignant, l'enseignant ou le magistrat ne dispose plus du temps nécessaire pour accomplir sa mission avec la rigueur et l'humanité requises, l'institution publique perd sa légitimité démocratique et se transforme en une machine bureaucratisée déconnectée du bien commun.",
      "q": "Conséquence majeure de l'imposition des métriques chiffrées dans les services publics :",
      "opt": [
        "Une augmentation spectaculaire de la satisfaction des usagers et du personnel",
        "La dépossession de l'expertise professionnelle et la perte de sens éthique du travail",
        "La baisse des impôts grâce à l'efficacité du système managérial",
        "L'obligation pour les fonctionnaires de travailler gratuitement le weekend"
      ],
      "ans": 1,
      "passEn": "POLITICAL SOCIOLOGY — SOCIAL DEBATE ESSAY: MANAGERIAL RATIONALIZATION AND LOSS OF WORK MEANING.\n\nWidespread adoption of corporate management practices—constant reporting, numerical KPIs, cost-cutting—across public services (hospitals, schools, courts) degrades work quality. Replacing professional autonomy and vocational ethics with arbitrary numerical targets set by remote managers deprives workers of field expertise.\n\nThis accounting rationalization causes widespread loss of meaning and ethical distress. When nurses, teachers, or judges lack time to perform duties with care and humanity, public institutions lose democratic legitimacy, becoming sterile bureaucracies detached from the common good.",
      "qEn": "Major consequence of enforcing numerical performance metrics across public services:",
      "optEn": [
        "Spectacular surges in citizen user and staff professional satisfaction",
        "Deprivation of professional expertise and loss of ethical meaning in work",
        "Tax cuts achieved through corporate management efficiency gains",
        "Mandatory requirements for civil servants to work unpaid weekends"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai d'histoire et de sociologie",
      "text": "SOCIOLOGIE DU PATRIMOINE — CAHIERS DE LA CULTURE ÉCRITE : LA MARCHANDISATION DU LIVRE ET L'ÉROSION DE LA DIVERSITY ÉDITORIALE.\n\nLa concentration industrielle du secteur de l'édition au sein de grands groupes financiers mondialisés transforme profondément les logiques de production littéraire. Soumises à des exigences de rentabilité financière à court terme et à l'impératif du 'bestseller' immédiat, les grandes maisons d'édition privilégient les ouvrages prévisibles, les récits calibrés et les auteurs médiatiques au détriment de la création littéraire exigeante et des essais d'analyse critique.\n\nCette marchandisation de l'écrit menace la diversité éditoriale et la vitalité intellectuelle de la société. En asphyxiant les petites maisons d'édition indépendantes qui prennent le risque de publier de jeunes auteurs ou des travaux de recherche originaux, le marché du livre dominant uniformise la pensée et réduit la lecture à un divertissement marchand de consommation rapide.",
      "q": "Menace qui pèse sur le monde du livre selon l'analyse de l'auteur :",
      "opt": [
        "La fermeture définitive de toutes les imprimeries de livres papier",
        "L'interdiction légale pour les citoyens d'acheter des livres d'occasion",
        "L'uniformisation de la pensée et la perte de la diversité éditoriale au profit du profit immédiat",
        "La hausse du prix du papier qui rend la lecture totalement inaccessible"
      ],
      "ans": 2,
      "passEn": "HERITAGE SOCIOLOGY — WRITTEN CULTURE PAPERS: BOOK COMMODIFICATION AND EDITORIAL DIVERSITY EROSION.\n\nPublishing industry consolidation into multinational conglomerates reshapes literary production. Driven by short-term financial returns and immediate bestseller demands, major publishers prioritize predictable titles, formulaic writing, and celebrity authors over demanding literature and critical essays.\n\nThis book commodification threatens editorial diversity and intellectual vitality. By suffocating small independent presses that risk publishing new authors or original research, dominant book markets standardize thought, shrinking reading into fast commercial entertainment.",
      "qEn": "Threat weighing on the publishing world according to the author's analysis:",
      "optEn": [
        "Permanent closure of all traditional paper book printing plants",
        "Legal prohibitions preventing citizens from purchasing second-hand books",
        "Thought standardization and loss of editorial diversity driven by short-term profit",
        "Surging paper prices rendering reading completely unaffordable for all"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse sur la théorie de la culture",
      "text": "CRITIQUE CULTURELLE — REVUE D'ESTHÉTIQUE CONTEMPORAINE : LA STANDARDISATION DE L'ÉCOUTE ET LA PERTE DE LA DIVERSITÉ MUSICALE DANS LE STREAMING.\n\nL'accès universel à la musique via les plateformes de streaming et les algorithmes de recommandation automatisés a transformé les modes de consommation sonore. En analysant en temps réel les habitudes des auditeurs pour leur proposer des morceaux similaires calibrés selon les standards de la pop internationale, les systèmes intelligents prétendent offrir une personnalisation musicale optimale. Toutefois, cette personnalisation algorithmique produit un effet d'homogénéisation sonore massif et insidieux.\n\nEn privilégiant les structures harmoniques simples, les rythmes répétitifs et les formats courts adaptés au formatage radio, les algorithmes marginalisent la création musicale indépendante, la musique classique et les traditions sonores régionales. Cette dictature de l'accessibilité immédiate appauvrit l'oreille de l'auditeur et érode la diversité esthétique mondiale au profit du profit marchand.",
      "q": "Conséquence culturelle de la recommandation musicale par algorithme soulignée par le texte :",
      "opt": [
        "Une découverte permanente de genres musicaux rares et oubliés",
        "La baisse de la qualité sonore des enregistrements musicaux",
        "L'obligation d'apprendre à jouer d'un instrument de musique classique",
        "Une homogénéisation sonore et la marginalisation de la création indépendante"
      ],
      "ans": 3,
      "passEn": "CULTURAL CRITICISM — CONTEMPORARY AESTHETICS REVIEW: MUSIC STREAMING STANDARDIZATION.\n\nUniversal music access via streaming apps and automated algorithms reshaped listening habits. Analyzing listener data in real time to recommend similar tracks tailored to global pop standards, smart systems claim optimal personalization. However, algorithmic customization causes massive acoustic homogenization.\n\nPrioritizing simple harmonies, repetitive rhythms, and short radio-friendly tracks, algorithms sideline independent music, classical compositions, and regional traditions. Dictated by instant accessibility, this newspeak impoverishes listener ears and erodes aesthetic diversity.",
      "qEn": "Cultural consequence of algorithmic music recommendation highlighted in the text:",
      "optEn": [
        "Continuous discovery of rare and forgotten musical genres",
        "Declining audio recording quality standards across music releases",
        "Mandatory requirements to learn to play a classical musical instrument",
        "Acoustic homogenization and marginalization of independent musical creation"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai d'écologie politique",
      "text": "ÉCOLOGIE POLITIQUE — CAHIERS DE LA TRANSITION ÉCONOMIQUE : LE PARADOXE DE LA CROISSANCE VERTE ET L'ILLUSION DE LA DÉCOUPLAGE.\n\nLe discours politique dominant fait la promotion de la 'croissance verte' comme le modèle idéal permettant de concilier la poursuite de l'expansion économique et la préservation de la planète grâce aux innovations technologiques et aux énergies renouvelables. Selon cette théorie du 'découplage', le progrès technique permettrait d'augmenter le produit intérieur brut tout en réduisant l'extraction de ressources et les émissions de carbone.\n\nToutefois, des économistes de l'environnement démontrent que le découplage absolu et mondial entre croissance du PIB et empreinte écologique n'a jamais été observé dans l'histoire. Les gains d'efficacité technologique sont systématiquement absorbés par la hausse globale des volumes de consommation (effet rebond). Prétendre résoudre la crise écologique sans remettre en cause l'impératif de croissance illimitée constitue une illusion dangereuse.",
      "q": "Pourquoi la 'croissance verte' est-elle qualifiée d'illusion par les économistes critiques ?",
      "opt": [
        "Parce que le découplage absolu entre hausse du PIB et empreinte écologique n'a jamais été constaté",
        "Parce que le progrès technologique n'existe pas dans le secteur de l'énergie",
        "Parce que les énergies renouvelables coûtent trop cher à installer",
        "Parce que les citoyens refusent d'utiliser des appareils électriques efficients"
      ],
      "ans": 0,
      "passEn": "POLITICAL ECOLOGY — ECONOMIC TRANSITION PAPERS: GREEN GROWTH PARADOXES AND DECOUPLING ILLUSIONS.\n\nDominant political rhetoric promotes 'green growth' as ideal model reconciling economic expansion and environmental protection through tech innovation and renewables. Under 'decoupling' theories, technical progress allows GDP growth while cutting resource extraction and carbon emissions.\n\nHowever, environmental economists demonstrate that absolute global decoupling between GDP growth and ecological footprints has never occurred historically. Tech efficiency gains are absorbed by surging consumption volumes (rebound effect). Claiming to solve climate crises without questioning growth imperatives represents a dangerous illusion.",
      "qEn": "Why is 'green growth' characterized as an illusion by critical economists?",
      "optEn": [
        "Because absolute decoupling between GDP growth and ecological footprint has never occurred",
        "Because technological progress does not exist inside clean energy sectors",
        "Because renewable energy installations are far too expensive to build",
        "Because citizens categorically refuse to use energy-efficient electric appliances"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 34,
      "level": "C1",
      "docType": "Analyse de philosophie du droit",
      "text": "PHILOSOPHIE DU DROIT — CAHIERS DE LA JUSTICE CIVIQUE : LA DECONSTRUCTION DE LA JUSTICE PRÉDICTIVE ALGORITHMIQUE ET LA DIGNITÉ DU JUGEMENT.\n\nL'introduction des systèmes d'intelligence artificielle dits de 'justice prédictive' au sein de l'institution judiciaire fait l'objet d'évaluations très controversées chez les juristes et philosophes du droit. En analysant des milliers de décisions de justice antérieures pour estimer le montant des indemnités ou la probabilité de récidive d'un prévenu, ces outils informatiques prétendent apporter une harmonisation et une efficacité inédites à l'œuvre de justice.\n\nToutefois, cette automatisation du jugement comporte des risques majeurs pour les libertés fondamentales et la dignité humaine. En reproduisant et en amplifiant les biais de discrimination contenus dans les données historiques, la justice algorithmique enferme les individus dans des profils statistiques déterministes. Le jugement humain exige l'évaluation singulière de la situation vivante de la personne, que l'analyse probabiliste est fondamentalement incapable de saisir.",
      "q": "Major danger de la 'justice prédictive' par ordinateur dénoncé par les juristes :",
      "opt": [
        "L'augmentation du salaire des juges et des avocats dans les tribunaux",
        "La reproduction des biais de discrimination et l'enfermement dans des profils statistiques",
        "L'obligation d'annuler toutes les peines de prison pour les délinquants",
        "La suppression de tous les codes de lois écrits dans le pays"
      ],
      "ans": 1,
      "passEn": "LEGAL PHILOSOPHY — CIVIC JUSTICE PAPERS: DECONSTRUCTING ALGORITHMIC PREDICTIVE JUSTICE.\n\nIntroducing AI 'predictive justice' systems across courts generates fierce controversy among legal scholars. Analyzing past court rulings to estimate settlement amounts or recidivism odds, these tools claim to harmonize and streamline justice work.\n\nHowever, automated sentencing poses severe risks to fundamental liberties. Reproducing and amplifying historical bias in past court data, algorithmic justice locks individuals into deterministic statistical profiles. Human judicial judgment demands assessing individual unique circumstances, which probabilistic software cannot grasp.",
      "qEn": "Major danger of computer 'predictive justice' denounced by legal scholars:",
      "optEn": [
        "Surging salary levels paid to court judges and trial attorneys",
        "Reproducing historical discrimination bias and locking individuals into statistical profiles",
        "Mandatory requirements to vacate all prison sentences for offenders",
        "Complete repeal of all written legal codes and statutes nationwide"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai de sociologie du cadre de vie",
      "text": "SOCIOLOGIE URBAINE — REVUE DE L'AMÉNAGEMENT DU TERRITOIRE : LA GENTRIFICATION DES ESPACES PUBLICS ET L'ÉVICTION INVISIBLE.\n\nLes grands projets de rénovation esthétique et de piétonnisation des centres-villes, bien que présentés comme des améliorations écologiques profitant à l'ensemble de la population, dissimulent fréquemment des dynamiques d'éviction sociale particulièrement subtiles. En réaménageant l'espace public selon des standards esthétiques haut de gamme et en installant un mobilier urbain sélectif, les municipalités transforment la rue en un espace réservé aux catégories sociales aisées.\n\nCette gentrification du cadre de vie se traduit par une présence policière renforcée, la disparition du mobilier urbain de repos (bancs anti-homeless) et l'augmentation des prix des commerces de proximité. Sans que des mesures d'exclusion explicites ne soient votées, les populations populaires et défavorisées se trouvent progressivement chassées du cœur de la cité par un sentiment d'invisibilisation et de rejet symbolique.",
      "q": "Processus d'éviction sociale décrit dans le texte concernant la rénovation des centres-villes :",
      "opt": [
        "L'expulsion physique immédiate de tous les habitants par l'armée",
        "L'obligation pour les pauvres de payer un droit de passage pour entrer en ville",
        "Une exclusion symbolique progressive causée par la gentrification et le coût de la vie",
        "La fermeture de tous les espaces publics et des parcs municipaux"
      ],
      "ans": 2,
      "passEn": "URBAN SOCIOLOGY — REGIONAL PLANNING REVIEW: GENTRIFICATION OF PUBLIC SPACES AND INVISIBLE DISPLACEMENT.\n\nDowntown pedestrianization and aesthetic renewal projects, while framed as green upgrades benefiting everyone, often mask subtle social displacement dynamics. Redesigning public spaces to luxury standards with selective street furniture, cities convert streets into spaces tailored to affluent classes.\n\nThis living space gentrification manifests through heightened policing, removing resting benches (anti-homeless architecture), and spiking retail prices. Without passing explicit ban laws, low-income populations are gradually pushed out of city centers through symbolic rejection and rising living costs.",
      "qEn": "Social displacement process described in the text regarding downtown urban renewal:",
      "optEn": [
        "Immediate physical eviction of all residents carried out by military force",
        "Requirements for low-income citizens to pay entry toll fees entering downtown",
        "Progressive symbolic exclusion driven by gentrification and rising living costs",
        "Closure of all public spaces, streets, and municipal parks permanently"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le progrès",
      "text": "PHILOSOPHIE EXISTENTIELLE — ANNALES DE LA PENSÉE CONTEMPORAINE : LA CONFUSION ENTRE PROGRÈS TECHNIQUE ET ÉMANCIPATION HUMAINE.\n\nL'assimilation systématique du progrès technique au progrès humain constitue l'une des illusions idéologiques les plus tenaces de la modernité industrielle. En identifiant l'accumulation d'innovations technologiques, l'augmentation de la vitesse des transports et la puissance de calcul des machines à un accroissement de la liberté et du bonheur individuel, le discours technocratique opère une confusion pernicieuse entre les moyens d'existence et les fins morales de la société.\n\nOr, l'histoire démontre que l'accélération technique peut parfaitement coexister avec une dégradation grave de la justice sociale, une précarisation du travail et la destruction des équilibres écologiques majeurs. L'accumulation de puissance matérielle ne garantit aucunement le progrès éthique de l'humanité. Réhabiliter l'idée de progrès exige d'affirmer que l'émancipation humaine ne se mesure pas au nombre de gigaoctets échangés mais à la dignité de la vie, au respect de la liberté réflexive et à la justice sociale.",
      "q": "Quelle thèse centrale l'auteur défend-il concernant la notion de progrès ?",
      "opt": [
        "Le produit intérieur brut est le seul indicateur valide pour mesurer le progrès d'un pays",
        "Le progrès technique garantit automatiquement le bonheur et la liberté de tous les hommes",
        "La technologie doit être totalement détruite pour retrouver le bonheur originel",
        "Le progrès humain authentique se mesure à la justice et à la dignité, non à la puissance technique"
      ],
      "ans": 3,
      "passEn": "EXISTENTIAL PHILOSOPHY — CONTEMPORARY THOUGHT ANNALS: TECH PROGRESS VERSUS HUMAN EMANCIPATION.\n\nEquating technical progress with human emancipation represents one of industrial modernity's most persistent illusions. Identifying tech innovation, faster transport, and computing power with expanded individual freedom and happiness, technocratic discourse conflates existence tools with society's moral ends.\n\nHistory demonstrates that technical acceleration coexists with degrading social justice, precarious labor, and ecosystem destruction. Accumulating material power guarantees no ethical human progress. Reclaiming genuine progress demands asserting that human emancipation is measured by life dignity, reflective freedom, and social justice rather than gigabytes.",
      "qEn": "What central thesis does the author defend regarding the concept of progress?",
      "optEn": [
        "Gross domestic product is the sole valid metric for measuring national progress",
        "Technical progress automatically guarantees human happiness and individual freedom",
        "Technology must be destroyed completely to restore original human happiness",
        "Authentic human progress is measured by justice and dignity, not technical power"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie de l'art",
      "text": "ESTHÉTIQUE ET PHILOSOPHIE — REVUE DE LA CRITIQUE LITTÉRAIRE : L'ÉLOGE DE L'AMBIGUÏTÉ NARRATIVE CONTRE LA DICTATURE DU SENS UNIVOQUE.\n\nLa création littéraire authentique se distingue par sa capacité fondamentale à préserver l'ambiguïté, la polyphonie et la complexité des sentiments humains face aux tentatives de simplification idéologique. Contrairement au discours marchand ou à la propagande politique qui exigent la clarté univoque, le slogan immédiatement assimilable et la leçon de morale simpliste, le roman d'art ménage des espaces de doute, des hésitations éthiques et des contradictions indépassables chez ses personnages.\n\nCette résistance à la réduction simplificatrice fait de la fiction littéraire un refuge irremplaçable pour la pensée critique. En refusant de délivrer des réponses dogmatiques ou des conclusions morales toutes faites, l'œuvre littéraire invite le lecteur à éprouver la complexité du monde et à exercer son jugement herméneutique autonome face aux certitudes arrogantes des discours dominants. C'est dans ce pouvoir d'émancipation esthétique que réside la valeur intemporelle des chefs-d'œuvre.",
      "q": "Selon l'auteur, quelle est la vertu essentielle de la création littéraire authentique ?",
      "opt": [
        "Préserver l'ambiguïté et la complexité humaine pour stimuler le jugement herméneutique autonome",
        "Délivrer des leçons de morale simples et faciles à retenir pour le public",
        "Rédiger des histoires divertissantes qui font oublier la réalité du monde",
        "Respecter les règles de grammaire académique établies au XVIIIe siècle"
      ],
      "ans": 0,
      "passEn": "AESTHETICS AND PHILOSOPHY — LITERARY CRITICISM REVIEW: IN PRAISE OF NARRATIVE AMBIGUITY.\n\nAuthentic literary creation is distinguished by its fundamental capacity to preserve ambiguity, polyphony, and emotional complexity against ideological simplification. Unlike marketing discourse or political propaganda demanding single clear messages, artistic fiction preserves spaces of doubt and moral hesitation in its characters.\n\nThis resistance to reductive simplification makes literary fiction an irreplaceable haven for critical thought. By refusing canned moral lessons or dogmatic conclusions, literature invites readers to experience world complexity and exercise autonomous hermeneutic judgment against dominant certainty. In this aesthetic emancipation lies timeless literary value.",
      "qEn": "According to the author, what is the essential virtue of authentic literary creation?",
      "optEn": [
        "Preserving human ambiguity and complexity to stimulate autonomous hermeneutic judgment",
        "Delivering simple, easy-to-remember moral lessons for the reading public",
        "Writing entertaining stories that help people forget real-world struggles",
        "Strictly following academic grammar rules established in the 18th century"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion d'anthropologie politique",
      "text": "ANTHROPOLOGIE POLITIQUE — REVUE DES ÉTUDES CITOYENNES : LA CONFISCATION DU BIEN COMMUN PAR LA RENTE CAPITALISTE.\n\nLa marchandisation progressive des éléments fondamentaux de la vie — l'eau potable, les semences agricoles, le savoir scientifique et l'espace public — opère une enclosure pernicieuse du bien commun mondial. En transformant des ressources indispensables à la survie et au développement humain en biens d'équipement privés soumis aux règles du profit et de l'exclusion par les prix, le système économique dominant dépossède la collectivité de sa souveraineté légitime.\n\nCette privatisation de l'existant remet en cause le pacte démocratique. En érigeant la propriété privée marchande en droit absolu primant sur les besoins fondamentaux des populations, le modèle capitaliste produit une précarisation généralisée et des inégalités scandaleuses. Réinventer la politique exige de consacrer la notion de 'Biens Communs Inaliénables' qu'aucune logique financière ne saurait approprier ni marchandiser.",
      "q": "Quelle exigence politique fondamentale l'auteur formule-t-il pour préserver la société ?",
      "opt": [
        "Privatiser l'ensemble des services publics pour les rendre plus rentables",
        "Consacrer la notion de Biens Communs Inaliénables soustraits à la logique financière",
        "Interdire aux citoyens d'être propriétaires de leur logement personnel",
        "Supprimer toute forme de monnaie pour revenir au troc préhistorique"
      ],
      "ans": 1,
      "passEn": "POLITICAL ANTHROPOLOGY — CITIZEN STUDIES REVIEW: CONFISCATING COMMON GOODS FOR CAPITAL RENTS.\n\nCommodifying life's essential elements—drinking water, crop seeds, scientific knowledge, public space—works a pernicious enclosure of global common goods. Turning resources essential for human survival into private commercial property subject to price exclusion deprives communities of legitimate sovereignty.\n\nPrivatizing existence undermines democratic pacts. Elevating commercial private property into absolute rights overriding fundamental human needs breeds precarity and extreme inequality. Re-enchanting politics requires establishing 'Inalienable Common Goods' immune to financial appropriation and commodification.",
      "qEn": "What fundamental political demand does the author formulate to preserve society?",
      "optEn": [
        "Privatizing all public civil services to make them financially profitable",
        "Establishing Inalienable Common Goods immune to financial market logic",
        "Prohibiting citizens from owning private personal housing real estate",
        "Eliminating all forms of paper currency to return to prehistoric barter"
      ]
    },
    {
      "paperNum": 8,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai sur l'éthique de la mémoire",
      "text": "ÉTHIQUE ET HISTOIRE — REVUE DE LA MÉMOIRE CONTEMPORAINE : LE DEVOIR DE MÉMOIRE FACE À LA TENTATION DE L'AMNÉSIE COLLECTIVE.\n\nLa tentation récurrente d'effacer les pages sombres de l'histoire nationale au profit d'un récit officiel héroïque et apaisé constitue une dérive mémorielle majeure. En occultant les erreurs passées, les injustices subies par les minorités et les dérives autoritaires au nom de la cohésion nationale artificielle, le discours d'État amnésique prive la société de la capacité d'apprendre des leçons tragiques de son histoire.\n\nOr, le véritable devoir de mémoire ne consiste pas à célébrer un passé mythifié mais à affronter la vérité historique dans toute sa complexité douloureuse. C'est uniquement par l'exercice d'un examen critique lucide et par la reconnaissance des souffrances des victimes que les communautés humaines peuvent élaborer une conscience éthique vigilante capable d'empêcher le retour des barbaries passées.",
      "q": "En quoi consiste le véritable 'devoir de mémoire' selon l'auteur ?",
      "opt": [
        "À célébrer uniquement les victoires militaires glorieuses du pays",
        null,
        null,
        "À pardonner automatiquement tous les crimes sans jamais faire de procès"
      ],
      "passEn": "ETHICS AND HISTORY — CONTEMPORARY MEMORY REVIEW: MEMORY DUTIES VERSUS COLLECTIVE AMNESIA.\n\nErasing dark national history chapters in favor of peaceful, heroic official narratives represents a major memory drift. Obscuring past errors, minority injustices, and authoritarian drifts in the name of artificial national cohesion deprives society of learning from tragic history lessons.\n\nTrue memory duty consists not of celebrating mythologized pasts but confronting painful historical truths lucidly. Only through critical examination and recognizing victim suffering can human communities cultivate vigilant ethical consciousness preventing past barbarities from recurring.",
      "qEn": "What does true 'duty of memory' consist of according to the author?",
      "optEn": [
        "Celebrating country military victories exclusively during national holidays",
        null,
        null,
        "Automatically forgiving all crimes without ever conducting legal trials"
      ],
      "ans": 2
    }
  ],
  [
    {
      "paperNum": 9,
      "qNum": 1,
      "level": "A1",
      "docType": "Annonce de boulangerie",
      "text": "BOULANGERIE DU COIN — HORAIRES D'ÉTÉ : La boulangerie sera ouverte tous les jours de 06h30 à 19h30 sans interruption. Fermeture exceptionnelle le lundi 15 août.",
      "q": "Quel jour la boulangerie sera-t-elle fermée ?",
      "opt": [
        "Le lundi 15 août",
        "Le dimanche 14 août",
        "Le mardi 16 août",
        "Tous les lundis d'été"
      ],
      "ans": 0,
      "passEn": "CORNER BAKERY — SUMMER HOURS: Open daily 6:30 AM to 7:30 PM continuously. Exceptional closure on Monday, August 15th.",
      "qEn": "On which specific day will the bakery be closed?",
      "optEn": [
        "Monday, August 15th",
        "Sunday, August 14th",
        "Tuesday, August 16th",
        "Every Monday of summer"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 2,
      "level": "A1",
      "docType": "Panneau de piscine municipale",
      "text": "PISCINE MUNICIPALE — COURS D'AQUAGYM : Cours d'aquagym gratuits pour les résidents de la commune tous les jeudis à 18h30. Inscription obligatoire à l'accueil sur présentation d'un justificatif.",
      "q": "Pour qui les cours d'aquagym sont-ils gratuits ?",
      "opt": [
        "Les touristes étrangers uniquement",
        "Les résidents de la commune",
        "Les enfants de moins de 5 ans",
        "Les maîtres-nageurs du centre"
      ],
      "ans": 1,
      "passEn": "MUNICIPAL POOL — WATER AEROBICS: Free water aerobics classes for town residents every Thursday at 6:30 PM. Mandatory registration at desk with proof of residence.",
      "qEn": "For whom are the water aerobics classes free?",
      "optEn": [
        "Visiting foreign tourists exclusively",
        "Town local residents",
        "Children under 5 years old",
        "Pool certified lifeguards"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 3,
      "level": "A1",
      "docType": "Note d'information d'école",
      "text": "ÉCOLE PRIMAIRE — PHOTO DE CLASSE : La photo de classe annuelle aura lieu ce mardi matin. Merci de veiller à la ponctualité des élèves dès 08h20.",
      "q": "Quand aura lieu la photo de classe ?",
      "opt": [
        "Samedi toute la journée",
        "Ce vendredi après-midi à 16h00",
        "Ce mardi matin dès 08h20",
        "Le mois prochain sans date fixe"
      ],
      "ans": 2,
      "passEn": "PRIMARY SCHOOL — CLASS PHOTO: Annual class photo shoot scheduled for this Tuesday morning. Please ensure student promptness starting at 8:20 AM.",
      "qEn": "When will the annual class photo shoot take place?",
      "optEn": [
        "All day Saturday during weekend",
        "This Friday afternoon at 4:00 PM",
        "This Tuesday morning starting 8:20 AM",
        "Next month without fixed date"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 4,
      "level": "A1",
      "docType": "Panneau de gare routière",
      "text": "GARE ROUTIÈRE — VENTE DE BILLETS : Le guichet de vente de billets est ouvert du lundi au samedi de 07h00 à 19h00. Le dimanche, utilisez les automates extérieurs.",
      "q": "Comment acheter un billet le dimanche ?",
      "opt": [
        "Auprès du conducteur du bus",
        "En réservant uniquement par téléphone",
        "Au guichet principal de la gare",
        "En utilisant les automates extérieurs"
      ],
      "ans": 3,
      "passEn": "BUS STATION — TICKET SALES: Ticket office open Monday to Saturday 7:00 AM to 7:00 PM. On Sundays, please use outdoor ticket kiosks.",
      "qEn": "How can passengers purchase a bus ticket on Sunday?",
      "optEn": [
        "Directly from the bus driver",
        "By telephone reservation strictly",
        "At the main ticket office counter",
        "Using outdoor ticket kiosks"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 5,
      "level": "A2",
      "docType": "SMS de cabinet médical",
      "text": "CABINET MÉDICAL — RAPPEL DE RENDEZ-VOUS : Votre rendez-vous avec le Dr Martin est prévu demain à 10h45. En cas d'empêchement, merci d'annuler au moins 24 heures à l'avance via le lien SMS.",
      "q": "Que doit faire le patient s'il ne peut pas venir ?",
      "opt": [
        "Annuler au moins 24 heures à l'avance via SMS",
        "Venir sans prévenir le lendemain",
        "Payer une amende à la pharmacie",
        "Envoyer une lettre recommandée au médecin"
      ],
      "ans": 0,
      "passEn": "MEDICAL CLINIC — APPOINTMENT REMINDER: Your appointment with Dr. Martin is set for tomorrow at 10:45 AM. If unable to attend, please cancel at least 24 hours prior via SMS link.",
      "qEn": "What must the patient do if unable to attend?",
      "optEn": [
        "Cancel at least 24 hours prior via SMS",
        "Show up unannounced the next day",
        "Pay a fine at the local pharmacy",
        "Send a certified letter to the doctor"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce de cours de poterie",
      "text": "ATELIER DES ARTS — POTERIE ET CÉRAMIQUE : Initiez-vous au tournage de la terre ce samedi de 14h30 à 17h30. Matériel et cuisson des pièces inclus. Réservation obligatoire avant jeudi soir. Tarif : 40 euros.",
      "q": "Qu'inclus le tarif du cours de poterie ?",
      "opt": [
        "Le repas du midi et les boissons",
        "Le matériel et la cuisson des pièces",
        "Un diplôme d'art céramique",
        "La livraison des pièces à domicile"
      ],
      "ans": 1,
      "passEn": "ARTS STUDIO — POTTERY AND CERAMICS: Learn pottery wheel turning this Saturday 2:30 PM to 5:30 PM. Clay materials and piece firing included. Booking required by Thursday. Fee: 40 euros.",
      "qEn": "What is included in the pottery class fee?",
      "optEn": [
        "Lunch meal and refreshing drinks",
        "Clay materials and piece firing",
        "A ceramic art master's diploma",
        "Home delivery of finished pieces"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 7,
      "level": "A2",
      "docType": "Information de résidence privée",
      "text": "RÉSIDENCE DU LAC — ENTRETIEN DE L'ASCENSEUR : L'ascenseur du bâtiment B sera hors service ce jeudi de 08h30 à 12h00 pour le contrôle annuel de sécurité. Merci d'utiliser l'escalier durant les travaux.",
      "q": "Pourquoi l'ascenseur sera-t-il hors service jeudi matin ?",
      "opt": [
        "Pour cause de panne électrique définitive",
        "Pour remplacer la cabine par une neuve",
        "Pour le contrôle annuel de sécurité",
        "Pour être nettoyé à l'eau de javel"
      ],
      "ans": 2,
      "passEn": "LAKE RESIDENCE — ELEVATOR MAINTENANCE: Building B elevator out of service Thursday 8:30 AM to 12:00 PM for annual safety inspection. Please use stairs during work.",
      "qEn": "Why will the elevator be out of service Thursday morning?",
      "optEn": [
        "Due to permanent electrical breakdown",
        "Replacing cabin with a new model",
        "For annual safety inspection",
        "Deep cleaning with liquid bleach"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 8,
      "level": "A2",
      "docType": "Consigne de parc zoologique",
      "text": "PARC ZOOLOOGIQUE — RÈGLES DE SÉCURITÉ : Il est strictement interdit de nourrir les animaux du parc avec de la nourriture personnelle. Des sachets d'aliments adaptés sont en vente aux distributeurs automatiques.",
      "q": "Comment les visiteurs peuvent-ils nourrir les animaux ?",
      "opt": [
        "En apportant leur propre pain rassis",
        "En demandant l'autorisation au gardien",
        "En leur donnant des fruits achetés au supermarché",
        "Avec des aliments adaptés vendus aux distributeurs"
      ],
      "ans": 3,
      "passEn": "ZOOLOGICAL PARK — SAFETY RULES: Strictly prohibited to feed animals personal food. Approved animal food packs available at automatic vending machines inside.",
      "qEn": "How can visitors feed animals inside the zoo?",
      "optEn": [
        "Bringing their own stale bread",
        "Asking verbal permission from guards",
        "Giving fruits bought at supermarkets",
        "Using approved food packs from vending machines"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 9,
      "level": "A2",
      "docType": "Avis d'épicerie vrac",
      "text": "ÉPICERIE ÉCO-VRAC — NOUVEAU SERVICE : Apportez vos propres bocaux et sachets réutilisables en magasin et bénéficiez d'une remise de 5 % sur le montant total de vos achats de denrées sèches.",
      "q": "Comment bénéficier de 5 % de réduction à l'épicerie vrac ?",
      "opt": [
        "En apportant ses propres contenants réutilisables",
        "En achetant plus de 50 kilos de riz",
        "En payant uniquement en liquide",
        "En venant faire ses courses le dimanche"
      ],
      "ans": 0,
      "passEn": "ECO-BULK GROCERY — NEW SERVICE: Bring your own reusable jars and bags to the store and get 5% off your total purchase of dry bulk goods.",
      "qEn": "How can shoppers get 5% off at the bulk grocery store?",
      "optEn": [
        "Bringing their own reusable containers",
        "Purchasing over 50 kilograms of rice",
        "Paying strictly in cash banknotes",
        "Shopping exclusively on Sunday mornings"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 10,
      "level": "A2",
      "docType": "Annonce de club de tennis",
      "text": "TENNIS CLUB — RÉSERVATION DES COURTS : La réservation des terrains de tennis s'effectue désormais exclusivement en ligne via l'application mobile du club 48 heures maximum avant l'heure de jeu souhaitée.",
      "q": "Comment réserver un court de tennis au club ?",
      "opt": [
        "En appelant le secrétariat par téléphone",
        "Exclusivement via l'application mobile du club",
        "En s'inscrivant sur le tableau papier du club-house",
        "En payant directement le gardien sur le court"
      ],
      "ans": 1,
      "passEn": "TENNIS CLUB — COURT BOOKING: Court reservations now handled exclusively online via the mobile app maximum 48 hours prior to desired play time.",
      "qEn": "How must members book a tennis court at the club?",
      "optEn": [
        "Calling the secretariat by phone",
        "Exclusively via the mobile app",
        "Signing paper board at clubhouse",
        "Paying cash to guard on court"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 11,
      "level": "A2",
      "docType": "Information de pressing écologique",
      "text": "PRESSING VERT — NETTOYAGE ÉCOLOGIQUE : Vos vêtements confiés au pressing sont nettoyés à l'eau sans solvant chimique toxique. Retrait des articles sous 48 heures à compter de la date de dépôt.",
      "q": "Quel est le délai de retrait des vêtements nettoyés ?",
      "opt": [
        "24 heures exactement",
        "1 semaine complète",
        "Sous 48 heures après le dépôt",
        "Le jour même en 1 heure"
      ],
      "ans": 2,
      "passEn": "GREEN CLEANERS — ECO CLEANING: Clothes cleaned using solvent-free water process. Pickup items within 48 hours from deposit date.",
      "qEn": "What is the pickup timeframe for cleaned clothing?",
      "optEn": [
        "24 hours exactly",
        "1 full calendar week",
        "Within 48 hours from deposit",
        "Same day within 1 hour"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 12,
      "level": "A2",
      "docType": "Avis de plage municipale",
      "text": "VILLE DE CANNES — BAIGNADE SURVEILLÉE : La baignade est surveillée tous les jours de 10h00 à 19h00. Le drapeau vert indique une mer calme sans danger. Les chiens sont interdits sur le sable du 1er juin au 30 septembre.",
      "q": "Que signifie le pavillon vert hissé sur la plage ?",
      "opt": [
        "L'interdiction absolue de se baigner",
        "La fermeture imminente du poste de secours",
        "La présence de méduses toxiques près du bord",
        "Une mer calme avec baignade sans danger"
      ],
      "ans": 3,
      "passEn": "CANNES CITY — SUPERVISED BEACH: Swimming supervised daily 10:00 AM to 7:00 PM. Green flag indicates calm safe water. Dogs prohibited on sand June 1st to September 30th.",
      "qEn": "What does the green flag raised on the beach indicate?",
      "optEn": [
        "Absolute ban on swimming",
        "Imminent closure of lifeguard station",
        "Presence of toxic jellyfish near shore",
        "Calm sea with safe swimming conditions"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse environnementale",
      "text": "ÉCONOMIE D'ÉNERGIE — BULLETIN DE L'ISOLATION D'URGENCE : LE DÉPLOIEMENT DU RACCORDEMENT AUX RÉSEAUX DE CHALEUR URBAINS.\n\nAfin de décarboner le chauffage des immeubles collectifs et des équipements publics, de nombreuses métropoles étendent leurs réseaux de chaleur souterrains. Alimentés par la combustion des déchets ménagers non recyclables ou par la géothermie profonde, ces réseaux fournissent de l'eau chaude et du chauffage à un coût stable et prévisible.\n\nCe système collectif réduit la dépendance aux énergies fossiles importées tout en préservant le pouvoir d'achat des résidents face aux fluctuations des marchés énergétiques mondiaux.",
      "q": "Bénéfice majeur pour les résidents raccordés au réseau de chaleur urbain :",
      "opt": [
        "Un coût de chauffage stable et une réduction de la dépendance aux fossiles",
        "L'obligation d'acheter leur propre chaudière individuelle au fioul",
        "La gratuité totale de toutes les factures d'électricité du logement",
        "La suppression de l'eau chaude sanitaire durant la saison hivernale"
      ],
      "ans": 0,
      "passEn": "ENERGY SAVINGS — EMERGENCY INSULATION BULLETIN: EXPANDING URBAN HEATING GRIDS.\n\nDecarbonizing apartment heating and public facilities, cities expand underground district heating networks. Powered by non-recyclable waste incineration or deep geothermal energy, grids supply heat at stable costs.\n\nThis collective system cuts dependence on imported fossil fuels while safeguarding resident purchasing power against global energy market spikes.",
      "qEn": "Major benefit for residents connected to the urban district heating grid:",
      "optEn": [
        "Stable heating costs and reduced fossil fuel dependency",
        "Mandatory requirements to purchase individual home oil boilers",
        "Complete free electricity for all household appliances",
        "Eliminating hot water access during winter season"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur l'artisanat du meuble",
      "text": "SAVOIR-FAIRE ARTISANAL — REVUE DE L'ÉBÉNISTERIE DURABLE : LA RESTAURATION DU MOBILIER ANCIEN EN BOIS NOBLE.\n\nFace à la prolifération de meubles en panneaux de particules jetables à faible durée de vie, des artisans ébénistes remettent à l'honneur la rénovation du mobilier traditionnel en bois massif. En réparant les assemblages, en décapant les vernis toxiques et en appliquant des huiles naturelles de finition, ces professionnels redonnent vie à des meubles familiaux transmis sur plusieurs générations.\n\nCette démarche d'économie circulaire permet de conserver des pièces de valeur sentimentale tout en luttant activement contre le gaspillage des ressources forestières.",
      "q": "Intérêt écologique de la rénovation de meubles en bois massif souligné dans l'article :",
      "opt": [
        "Fabriquer des meubles légers jetables tous les trois ans",
        "Lutter contre le gaspillage forestier en prolongeant la durée de vie des meubles",
        "Obliger les clients à acheter uniquement des meubles en plastique",
        "Utiliser des vernis chimiques toxiques pour accélérer le séchage"
      ],
      "ans": 1,
      "passEn": "ARTISAN SKILLS — SUSTAINABLE WOODWORKING REVIEW: RESTORING HEIRLOOM WOODEN FURNITURE.\n\nCountering disposable particle-board furniture proliferation, woodcraft artisans champion solid wood furniture restoration. Repairing joints, stripping toxic varnishes, and applying natural finishing oils, craftspeople restore multi-generational furniture.\n\nThis circular economy practice preserves sentimental heirlooms while actively fighting forest resource waste.",
      "qEn": "Ecological value of solid wood furniture restoration highlighted in the article:",
      "optEn": [
        "Manufacturing lightweight disposable furniture every three years",
        "Fighting forest resource waste by extending furniture lifespans",
        "Forcing customers to purchase plastic furniture items strictly",
        "Using toxic chemical varnishes to speed up drying processes"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur la biodiversité fluviale",
      "text": "PROTECTION DE LA NATURE — BULLETIN DES FLEUVES ET RIVIÈRES : LA DÉCONSTRUCTION DES BARRAGES DÉSUETS POUR LES POISSONS MIGRATEURS.\n\nAfin de rétablir la continuité écologique des cours d'eau, des syndicats mixtes de rivières engagent la déconstruction de vieux barrages industriels à l'abandon. Ces obstacles en béton empêchaient le franchissement des rivières par les poissons migrateurs (saumons, anguilles) venus se reproduire en amont.\n\nLa suppression de ces seuils artificiels permet au lit de la rivière de retrouver son débit naturel, améliorant l'oxygénation de l'eau et favorisant le retour d'une biodiversité aquatique exceptionnelle.",
      "q": "Impact positif de la déconstruction des vieux barrages sur la faune aquatique :",
      "opt": [
        "Le blocage définitif du passage des poissons vers l'amont",
        "L'assèchement complet du lit de la rivière durant l'été",
        "Le retour du débit naturel permettant la reproduction des poissons migrateurs",
        "La transformation de la rivière en autoroute pour bateaux à moteur"
      ],
      "ans": 2,
      "passEn": "NATURE PROTECTION — RIVERS AND STREAMS BULLETIN: REMOVING OBSOLETE DAMS FOR MIGRATORY FISH.\n\nRestoring river ecological continuity, river boards are removing obsolete industrial dams. These concrete barriers blocked migratory fish (salmon, eels) from traveling upstream to spawn.\n\nRemoving artificial obstacles restores natural water flow, improving oxygenation and bringing back rich aquatic biodiversity.",
      "qEn": "Positive impact of removing obsolete dams on aquatic river wildlife:",
      "optEn": [
        "Permanently blocking fish migration paths upstream",
        "Completely drying out the river bed during summer months",
        "Restoring natural flow allowing migratory fish reproduction",
        "Converting the river into a highway for motorboats"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur le compostage collectif",
      "text": "DÉCHETS ET VILLE — REVUE DU TRI MUNICIPAL : LA GÉNÉRALISATION DES COMPOSTEURS DE QUARTIER.\n\nPour respecter l'obligation légale de tri à la source des biodéchets, de nombreuses collectivités déploient des pavillons de compostage collectif au pied des résidences et dans les parcs publics. Accompagnés par des maîtres-composteurs bénévoles, les habitants y déposent leurs épluchures de légumes, marcs de café et restes de repas d'origine végétale.\n\nLe compost mûr produit gratuitement est redistribué aux résidents pour leurs plantes de balcon ou utilisé par les jardiniers municipaux pour fertiliser les massifs de fleurs de la commune.",
      "q": "Destination du compost produit dans les composteurs collectifs de quartier :",
      "opt": [
        "Être incinéré dans des usines de traitement des ordures",
        "Être jeté dans les rivières pour nourrir les poissons",
        "Être vendu à des prix élevés dans les jardineries privées",
        "Être distribué gratuitement aux habitants ou utilisé par la ville"
      ],
      "ans": 3,
      "passEn": "WASTE AND CITY — MUNICIPAL RECYCLING REVIEW: EXPANDING NEIGHBORHOOD COMPOST BINS.\n\nMeeting mandatory organic waste sorting laws, cities deploy community compost pavilions outside housing complexes and in parks. Guided by volunteer compost stewards, residents deposit vegetable scraps, coffee grounds, and plant food waste.\n\nFinished organic compost is redistributed free to residents for balcony plants or used by city gardeners to fertilize flower beds.",
      "qEn": "Destination of finished compost produced inside neighborhood community bins:",
      "optEn": [
        "Incinerated in municipal trash treatment plants",
        "Dumped into rivers to feed wild swimming fish",
        "Sold at high prices inside private retail garden centers",
        "Distributed free to residents or used for town flower beds"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur l'alphabétisation",
      "text": "INCLUSION SOCIALE — BULLETIN DES APPRENTISSAGES CIVIQUES : LES ATELIERS DE FRANÇAIS LANGUE D'INTÉGRATION.\n\nPour faciliter l'insertion socioprofessionnelle des nouveaux arrivants, un réseau d'associations propose des cours du soir de français langue d'intégration. À travers des mises en situation pratiques (faire des courses, prendre les transports, remplir un formulaire administratif), les apprenants acquièrent l'autonomie linguistique nécessaire à leur quotidien.\n\nCette maîtrise de la langue française constitue le premier vecteur d'émancipation sociale et d'accès à l'emploi qualifié pour les personnes résidant sur le territoire.",
      "q": "Méthode pédagogique privilégiée lors de ces cours de français d'intégration :",
      "opt": [
        "L'utilisation de mises en situation pratiques de la vie quotidienne",
        "L'apprentissage par cœur de règles de grammaire complexes",
        "L'interdiction absolue de parler pendant la durée des cours",
        "La traduction écrite de romans littéraires du XVIIe siècle"
      ],
      "ans": 0,
      "passEn": "SOCIAL INCLUSION — CIVIC LEARNING BULLETIN: FRENCH INTEGRATION LANGUAGE WORKSHOPS.\n\nFacilitating socio-professional integration for newcomers, non-profits offer evening French language classes. Through practical roleplay (grocery shopping, public transit, administrative forms), learners gain everyday linguistic independence.\n\nMastering French represents the key driver for social empowerment and accessing qualified employment opportunities.",
      "qEn": "Preferred teaching method used during these French integration language classes:",
      "optEn": [
        "Using practical roleplay simulations of daily life situations",
        "Rote memorization of complex academic grammar rules",
        "Strict prohibitions banning talking during class sessions",
        "Written translation of 17th-century literary classic novels"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur l'art textile éco-responsable",
      "text": "MODE ET ÉCOLOGIE — BULLETIN DU TEXTILE DURABLE : LE RECOURS AUX TEINTURES VÉGÉTALES DANS LE PRÊT-À-PORTER.\n\nPour éliminer les solvants chimiques et les métaux lourds toxiques rejetés par l'industrie textile traditionnelle, des créateurs de mode adoptent la teinture végétale artisanale. En utilisant des pigments extraits de plantes tinctoriales (garance, pastel, pelures d'oignons, noix), ces ateliers colorent les fibres naturelles de coton bio et de lin.\n\nCes teintures naturelles préservent la santé des ouvriers textiles et la pureté des eaux de rivière tout en apportant des nuances subtiles et vivantes aux vêtements éco-conçus.",
      "q": "Avantage sanitaire et écologique majeur de l'usage des teintures végétales :",
      "opt": [
        "La possibilité de fabriquer des vêtements en plastique brillant",
        "L'élimination des métaux lourds toxiques et la protection des eaux",
        "L'obligation de décolorer les vêtements au chlore après lavage",
        "La hausse de la pollution des rivières près des usines"
      ],
      "ans": 1,
      "passEn": "FASHION AND ECOLOGY — SUSTAINABLE TEXTILE BULLETIN: PLANT-BASED DYES IN APPAREL.\n\nEliminating toxic chemical solvents and heavy metals discharged by traditional textile mills, fashion designers embrace artisan plant dyeing. Utilizing pigments from dye plants (madder, woad, onion skins, walnut), studios color organic cotton and linen.\n\nNatural plant dyes protect textile worker health and river purity while bestowing subtle, vibrant shades onto eco-friendly garments.",
      "qEn": "Major health and environmental advantage of using plant-based textile dyes:",
      "optEn": [
        "Enabling production of shiny plastic apparel items",
        "Eliminating toxic heavy metals and protecting river waters",
        "Mandatory requirements to bleach clothes with chlorine after washing",
        "Surging river water pollution near apparel manufacturing mills"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur l'habitat partagé",
      "text": "HABITAT CITOYEN — REVUE DE L'ÉCO-LOGEMENT : L'ÉCO-HABITAT PARTICIPATIF EN MILIEU URBAIN.\n\nL'habitat participatif permet à des groupes de futurs habitants de concevoir collectivement leur immeuble en partenariat avec un architecte. Outre leurs logements privatifs, les résidents partagent des espaces communs évolutifs : buanderie collective, chambre d'hôtes pour les invités, atelier de bricolage et potager sur le toit.\n\nCette mutualisation des équipements réduit les dépenses d'équipement de chaque ménage tout en favorisant une entraide de proximité au quotidien (garde d'enfants, prêt d'outils).",
      "q": "Intérêt financier direct de la mutualisation des équipements en habitat participatif :",
      "opt": [
        "La hausse des loyers mensuels pour payer les espaces communs",
        "L'obligation de vendre sa voiture personnelle à la copropriété",
        "La réduction des dépenses d'équipement individuel de chaque ménage",
        "La gratuité totale de la construction de l'immeuble"
      ],
      "ans": 2,
      "passEn": "CITIZEN HOUSING — ECO-HOUSING REVIEW: PARTICIPATORY ECO-HOUSING IN URBAN AREAS.\n\nParticipatory housing lets groups of future residents co-design their apartment building with an architect. Alongside private units, residents share flexible common spaces: shared laundry, guest room, DIY workshop, and rooftop garden.\n\nSharing amenities lowers equipment costs for each household while fostering daily neighbor mutual aid (childcare, tool lending).",
      "qEn": "Direct financial benefit of sharing amenities in co-designed housing developments:",
      "optEn": [
        "Surging monthly rent payments to cover shared amenities",
        "Mandatory requirements to sell personal cars to co-op boards",
        "Lowering individual household equipment purchase costs",
        "Complete free construction of the entire housing building"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur la préservation du patrimoine maritime",
      "text": "CULTURE ET MER — REVUE DE LA NAVIGATION TRADITIONNELLE : LA RESTAURATION DES ANCIENS VOILIERS EN BOIS.\n\nDes charpentiers de marine passionnés restaurent d'anciens voiliers de pêche en bois sauvegardés du démantèlement. En utilisant des techniques traditionnelles de calfatage à la étoupe et de façonnage des pièces de chêne, ces artisans préservent un patrimoine naval inestimable.\n\nRemis à l'eau, ces gréements traditionnels participent à des régates patrimoniales et embarquent des jeunes en insertion pour des stages de navigation hauturière basés sur le travail d'équipe et le respect des éléments.",
      "q": "Objectif pédagogique des stages de navigation sur les voiliers traditionnels restaurés :",
      "opt": [
        "Former des pilotes de bateaux à moteur de course rapide",
        "Vendre du poisson frais capturé en mer au marché local",
        "Obliger les stagiaires à démanteler les bateaux en bois",
        "Développer le travail d'équipe et le respect des éléments marins"
      ],
      "ans": 3,
      "passEn": "MARITIME CULTURE — TRADITIONAL SAILING REVIEW: RESTORING HISTORIC WOODEN SAILBOATS.\n\nPassionate shipwrights restore historic wooden fishing sailboats saved from scrapping. Employing traditional oak-shaping and oakum-caulking techniques, artisans preserve invaluable naval heritage.\n\nRefloated, these traditional rigs join heritage regattas and host youth integration sailing trips centered on teamwork and marine element respect.",
      "qEn": "Educational goal of sailing trips aboard restored historic wooden sailboats:",
      "optEn": [
        "Training high-speed motor race boat drivers",
        "Selling fresh sea-caught fish at local commercial markets",
        "Forcing trainees to scrap wooden sailboats for firewood",
        "Developing teamwork and respect for marine elements"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur la réparation collaborative",
      "text": "VIE PRATIQUE — BULLETIN DU RÉPARER-ENSEMBLE : LE SUCCÈS GRANDISSANT DES REPAIR CAFÉS DE QUARTIER.\n\nPour lutter contre le gaspillage et l'obsolescence, des bénévoles bricoleurs et électriciens animent des ateliers 'Repair Café' tous les premiers samedis du mois. Les habitants y apportent leurs appareils ménagers en panne, vêtements déchirés ou vélos défectueux pour les réparer gratuitement ensemble autour d'un café.\n\nCette initiative solidaire permet d'éviter l'achat d'équipements neufs tout en transmettant des notions pratiques de bricolage et de dépannage aux visiteurs.",
      "q": "Principe fondamental du fonctionnement des Repair Cafés de quartier :",
      "opt": [
        "Réparer gratuitement ses objets en panne avec l'aide de bénévoles",
        "Acheter des appareils électroménagers neufs sous garantie",
        "Jeter tous ses objets défectueux dans des conteneurs spéciaux",
        "Payer des réparateurs professionnels au tarif fort"
      ],
      "ans": 0,
      "passEn": "PRACTICAL LIFE — REPAIR-TOGETHER BULLETIN: RISING POPULARITY OF NEIGHBORHOOD REPAIR CAFES.\n\nFighting waste and planned obsolescence, volunteer mechanics and electricians host monthly 'Repair Café' events. Residents bring broken home appliances, torn clothing, or faulty bikes to fix them together for free over coffee.\n\nThis community initiative avoids new gear purchases while teaching practical DIY troubleshooting skills to visitors.",
      "qEn": "Core operational principle of neighborhood community Repair Cafes:",
      "optEn": [
        "Fixing broken items for free with volunteer assistance",
        "Purchasing brand-new home appliances under retail warranty",
        "Discarding all faulty items into special waste containers",
        "Paying expensive rates to commercial repair technicians"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur la biodiversité urbaine",
      "text": "ÉCOLOGIE CIVIQUE — BULLETIN DE LA FAUNE URBAINE : L'INSTALLATION DE NICHOIRS À CHAUVES-SOURIS EN VILLE.\n\nPour favoriser le retour des chauves-souris en milieu urbain, la direction des espaces verts installe des nichoirs en bois imputrescible dans les parcs publics et sur les façades des écoles. Prédatrices naturelles redoutables, les chauves-souris consomment chaque nuit jusqu'à 3000 insectes volants, notamment des moustiques.\n\nCette régulation biologique naturelle évite le recours aux insecticides chimiques toxiques dans les zones résidentielles tout en protégeant une espèce animale menacée.",
      "q": "Bénéfice direct de la présence des chauves-souris en ville pour la population :",
      "opt": [
        "La production de miel biologique récolté sur les toits",
        "La consommation massive d'insectes évitant les insecticides chimiques",
        "L'éclairage naturel des parcs la nuit grâce à leur pelage",
        "La destruction des nids d'oiseaux migrateurs dans les arbres"
      ],
      "ans": 1,
      "passEn": "CIVIC ECOLOGY — URBAN WILDLIFE BULLETIN: INSTALLING BAT BOXES ACROSS THE CITY.\n\nEncouraging bat populations in urban areas, city parks departments install rot-proof wooden bat boxes across public parks and school facades. Formidable natural predators, bats consume up to 3,000 flying insects, including mosquitoes, each night.\n\nThis natural biological control avoids toxic chemical insecticide sprays in residential areas while protecting threatened mammal species.",
      "qEn": "Direct benefit of urban bat presence for metropolitan residents:",
      "optEn": [
        "Organic honey production harvested on building roofs",
        "Massive insect consumption eliminating toxic chemical sprays",
        "Natural park illumination at night via shiny bat fur",
        "Destruction of migratory bird nests inside city trees"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la préservation des sols",
      "text": "AGRICULTURE DURABLE — REVUE DE LA SANTE DES SOLS : L'ABANDON DU LABOUR PROFOND ET LE COUVERT VEGETAL PERMANENT.\n\nLe labour profond traditionnel au tracteur, en retournant brutalement les couches de terre, détruit la structure biologique du sol et accélère la disparition des vers de terre et des champignons utiles. Pour restaurer la fertilité naturelle de leurs parcelles, de nombreux agriculteurs adoptent l'agriculture de conservation des sols : absence de travail de la terre et semis direct sous couvert végétal permanent.\n\nCette couverture végétale continue protège les sols de l'érosion pluviale, maintient l'humidité en été et stocke durablement du carbone organique dans le sol, améliorant ainsi la résilience de l'exploitation face au réchauffement climatique.",
      "q": "Bénéfice agronomique principal de l'agriculture de conservation des sols sans labour :",
      "opt": [
        "L'obligation d'utiliser deux fois plus de carburant pour les tracteurs",
        "La baisse des rendements nécessitant l'abandon définitif des cultures",
        "La protection contre l'érosion et l'enrichissement en carbone organique",
        "La destruction complète de la faune microscopique du sol"
      ],
      "ans": 2,
      "passEn": "SUSTAINABLE AGRICULTURE — SOIL HEALTH REVIEW: ENDING DEEP PLOWING AND ADOPTING COVER CROPS.\n\nTraditional deep tractor plowing, by violently turning soil layers, destroys biological soil structures and accelerates earthworm and beneficial fungi loss. Restoring natural plot fertility, farmers embrace conservation agriculture: no-till farming and direct seeding into permanent cover crops.\n\nContinuous plant cover shields soil from rain erosion, retains summer moisture, and stores organic carbon long-term, boosting farm climate resilience.",
      "qEn": "Primary agronomic benefit of no-till conservation agriculture highlighted in the text:",
      "optEn": [
        "Mandatory requirements to burn twice as much tractor diesel fuel",
        "Collapsing crop yields forcing permanent farming abandonment",
        "Erosion protection and organic carbon soil enrichment",
        "Complete destruction of microscopic beneficial soil fauna"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur la gestion des déchets électroniques",
      "text": "ÉCONOMIE CIRCULAIRE — BULLETIN DES ÉQUIPEMENTS ÉLECTRIQUES : L'INDICE DE RÉPARABILITÉ OBLIGATOIRE SUR L'ÉLECTROMÉNAGER.\n\nAfin de lutter contre l'obsolescence programmée et d'inciter les consommateurs à réparer plutôt qu'à remplacer leurs appareils, la loi impose l'affichage d'un 'indice de réparabilité' sur les téléviseurs, lave-linge et ordinateurs. Cette note sur 10, calculée selon la disponibilité des pièces détachées, la facilité de démontage et le prix des composants, permet d'éclairer le choix d'achat.\n\nCe dispositif contraint les fabricants technologiques à revoir la conception de leurs produits pour obtenir de bonnes notes commerciales, favorisant l'émergence d'équipements plus durables et réparables à moindre coût.",
      "q": "Effet recherché de l'indice de réparabilité obligatoire sur les fabricants d'électroménager :",
      "opt": [
        "Les inciter à fabriquer des appareils scellés impossibles à ouvrir",
        "Interdire la vente d'ordinateurs et de téléviseurs neufs",
        "Les obliger à augmenter le prix des pièces détachées de 50 %",
        "Les contraindre à concevoir des produits durables et faciles à démonter"
      ],
      "ans": 3,
      "passEn": "CIRCULAR ECONOMY — ELECTRICAL EQUIPMENT BULLETIN: MANDATORY REPAIRABILITY INDEX ON APPLIANCES.\n\nCombating planned obsolescence and encouraging repair over replacement, laws mandate displaying a 'repairability index' score on TVs, washers, and computers. This 10-point score, based on spare part availability, disassembly ease, and part prices, guides buying decisions.\n\nThis measure forces tech manufacturers to redesign products for higher ratings, fostering more durable and affordably repairable appliances.",
      "qEn": "Intended effect of mandatory repairability index scores on appliance manufacturers:",
      "optEn": [
        "Encouraging them to build sealed appliances impossible to open",
        "Banning sales of brand-new computers and televisions",
        "Mandating them to raise spare part prices by 50%",
        "Forcing them to design durable products easily disassembled"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la préservation de la biodiversité marine",
      "text": "ÉCOLOGIE MARINE — BULLETIN DE L'OCÉANOGRAPHIE CIVIQUE : L'EFFICACITÉ DES ZONES DE CANTONNEMENT PÊCHE INTERDITE.\n\nFace à l'effondrement des stocks de poissons côtiers sous l'effet de la surpêche industrielle, la création de zones marines protégées (ZMP) renforcées — où toute activité d'extraction ou de pêche est strictement interdite — produit des résultats écologiques spectaculaires. Dans ces réserves intégrales, la biomasse de poissons se régénère en quelques années, permettant le retour de grands prédateurs (mérous, thons, requins).\n\nCet 'effet réserve' profite directement aux pêcheurs artisanaux voisins, les poissons adultes se multipliant et débordant naturellement hors des limites de la zone protégée pour réensemencer les eaux adjacentes.",
      "q": "Bénéfice de l'effet réserve pour les pêcheurs artisanaux travaillant à proximité :",
      "opt": [
        "Le débordement naturel des poissons régénérés qui réensemencent les eaux adjacentes",
        "L'obligation de vendre leurs bateaux de pêche à l'État",
        "La baisse définitive de la biomasse de poissons dans toute la région",
        "L'interdiction absolue de pêcher dans tout l'océan"
      ],
      "ans": 0,
      "passEn": "MARINE ECOLOGY — CIVIC OCEANOGRAPHY BULLETIN: EFFECTIVENESS OF NO-TAKE MARINE RESERVES.\n\nAddressing coastal fish stock collapses from industrial overfishing, creating strict no-take marine protected areas (MPAs)—banning all fishing and extraction—yields dramatic eco-results. Inside strict reserves, fish biomass regenerates within years, bringing back apex predators.\n\nThis 'spillover effect' directly benefits nearby artisanal fishers, as multiplying adult fish naturally overflow reserve boundaries to restock adjacent fishing waters.",
      "qEn": "Benefit of reserve spillover effects for nearby working artisanal fishers:",
      "optEn": [
        "Natural overflow of regenerated fish restocking adjacent fishing waters",
        "Mandatory requirements to sell fishing boats to government agencies",
        "Permanent decline in fish biomass across the entire ocean region",
        "Absolute prohibitions banning fishing across the entire ocean"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur la qualité de l'air intérieur",
      "text": "SANTÉ ET HABITAT — BULLETIN DE LA QUALITÉ DE L'AIR INTÉRIEUR : LA POLLUTION CACHÉE DES LOGEMENTS CONFINÉS.\n\nL'air intérieur des logements et des bureaux est fréquemment deux à cinq fois plus pollué que l'air extérieur en raison de l'accumulation de composés organiques volatils (COV) émis par les peintures synthétiques, les colles de meubles, les produits ménagers chimiques et les bougies parfumées. Dans des bâtiments fortement isolés sans ventilation efficace, cette pollution invisible favorise les allergies allergiques et le sifflement respiratoire.\n\nLes spécialistes de la santé environnementale préconisent l'aération quotidienne des pièces pendant 10 minutes matin et soir et l'utilisation de matériaux d'aménagement labellisés sans émission de substances toxiques.",
      "q": "Recommandation simple des experts sanitaires pour assainir l'air intérieur des logements :",
      "opt": [
        "Garder les fenêtres fermées toute l'année pour éviter la poussière",
        "Aérer les pièces 10 minutes matin et soir et choisir des matériaux sains",
        "Utiliser quotidiennement des sprays chimiques désodorisants puissants",
        "Chauffer les pièces à plus de 30 degrés pour détruire les bactéries"
      ],
      "ans": 1,
      "passEn": "HEALTH AND HOME — INDOOR AIR QUALITY BULLETIN: HIDDEN POLLUTION IN CONFINED HOMES.\n\nIndoor home and office air is often 2 to 5 times more polluted than outdoor air due to volatile organic compound (VOC) buildup from synthetic paints, furniture glues, chemical cleaners, and scented candles. In sealed buildings lacking proper ventilation, this invisible pollution triggers allergies and respiratory wheezing.\n\nEnvironmental health specialists advise opening windows for 10 minutes morning and evening and selecting certified non-toxic building materials.",
      "qEn": "Simple recommendation from health experts to purify indoor home air:",
      "optEn": [
        "Keeping windows closed year-round to prevent dust ingress",
        "Airing rooms 10 minutes morning and evening and choosing non-toxic materials",
        "Using powerful chemical deodorizing sprays daily indoors",
        "Heating rooms above 30 degrees Celsius to kill airborne bacteria"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la transition vestimentaire",
      "text": "ÉCONOMIE DU TEXTILE — CAHIERS DE LA FAST-FASHION : LES RUPTURES D'APPROVISIONNEMENT ET L'IMPACT DE LA SECONDE MAIN.\n\nL'essor des plateformes de vente de vêtements d'occasion en ligne transforme en profondeur le secteur de l'habillement. Autrefois réservé à une frange marginale de consommateurs motivés par la recherche de prix bas, l'achat de vêtements de seconde main séduit désormais une large clientèle soucieuse de réduire son empreinte environnementale et de trouver des pièces uniques d'excellente facture.\n\nCette mutation des modes d'achat contraint les enseignes de la 'fast-fashion' à développer leurs propres rayons de seconde main ou à intégrer des services de réparation en magasin pour conserver leurs clients.",
      "q": "Facteur majeur expliquant le succès grandissant de l'achat de vêtements d'occasion :",
      "opt": [
        "L'obligation légale de porter des vêtements d'occasion au travail",
        "L'interdiction de fabriquer des vêtements neufs en coton bio",
        "La volonté de réduire son empreinte écologique et de dénicher des pièces uniques",
        "La baisse de la qualité des pièces vintage par rapport au neuf"
      ],
      "ans": 2,
      "passEn": "TEXTILE ECONOMICS — FAST-FASHION PAPERS: SUPPLY CHAIN DISRUPTIONS AND SECOND-HAND IMPACTS.\n\nThe boom in online second-hand clothing platforms is reshaping the apparel industry. Once restricted to bargain-hunting consumers, buying pre-owned clothing now attracts mainstream shoppers seeking to lower environmental impacts and find unique quality items.\n\nThis shopping shift forces fast-fashion retailers to launch in-store pre-owned sections or offer clothing repair services to retain customers.",
      "qEn": "Major factor explaining the growing success of buying pre-owned clothing:",
      "optEn": [
        "Legal mandates requiring employees to wear second-hand clothes at work",
        "Prohibitions banning new organic cotton clothing manufacturing",
        "Desire to lower ecological footprints and find unique quality pieces",
        "Declining quality of vintage pieces compared to new retail clothing"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la santé auditive",
      "text": "SANTÉ PUBLIQUE — BULLETIN D'AUDIOLOGIE PREVENTIVE : LES DANGERS DE L'ÉCOUTE PROLONGÉE AU CASQUE DU SON AMPLIFIÉ.\n\nL'usage quotidien et prolongé d'écouteurs ou de casques audio à volume élevé chez les adolescents et jeunes adultes provoque des lésions irréversibles des cellules ciliées de l'oreille interne. L'exposition continue à des niveaux sonores dépassant 85 décibels entraîne l'apparition précoce d'acouphènes (sifflements permanents) et une baisse prématurée de l'acuité auditive dès l'âge de 30 ans.\n\nLes ORL recommandent d'appliquer la règle des '60/60' : écouter la musique à moins de 60 % du volume maximal de l'appareil pendant une durée maximale de 60 minutes d'affilée sans pause.",
      "q": "Consigne de prévention recommandée par les médecins ORL (règle des 60/60) :",
      "opt": [
        "Écouter le son au volume maximum pendant 60 heures d'affilée",
        "Remplacer les casques par des enceintes de concert surpuissantes",
        "Interdire définitivement l'écoute de toute musique chez les jeunes",
        "Limiter le volume à 60 % et la durée d'écoute continue à 60 minutes"
      ],
      "ans": 3,
      "passEn": "PUBLIC HEALTH — PREVENTIVE AUDIOLOGY BULLETIN: DANGERS OF PROLONGED HIGH-VOLUME HEADPHONE LISTENING.\n\nDaily, extended headphone use at high volumes among youth causes irreversible inner ear hair cell damage. Continuous exposure to sound levels exceeding 85 decibels leads to early tinnitus (constant ringing) and premature hearing loss by age 30.\n\nENT specialists recommend the '60/60' rule: listening below 60% maximum device volume for no longer than 60 minutes continuously without taking breaks.",
      "qEn": "Preventive guidelines recommended by ENT specialists ('60/60' rule):",
      "optEn": [
        "Listening at maximum device volume continuously for 60 hours",
        "Replacing personal headphones with high-powered concert speakers",
        "Banning youth from listening to any recorded music permanently",
        "Limiting volume under 60% and continuous listening under 60 minutes"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la gestion foncière et agricole",
      "text": "SOCIOLOGIE RURALE — CAHIERS DE LA TRANSMISSION AGRICOLE : LE DÉFI DU RENOUVELLEMENT DES GÉNÉRATIONS EN AGRICULTURE.\n\nAlors que plus d'un tiers des exploitants agricoles partiront à la retraite d'ici dix ans, la reprise des fermes par de jeunes agriculteurs se heurte au coût exorbitant du foncier et de l'équipement d'exploitation. Les candidats à l'installation hors cadre familial peinent à obtenir des prêts bancaires face à des investissements initiaux se comptant en centaines de milliers d'euros.\n\nPour faciliter l'accès à la terre, des foncières citoyennes et solidaires achètent des terres agricoles grâce à l'épargne citoyenne pour les louer à bas prix à de jeunes maraîchers engagés dans l'agriculture biologique.",
      "q": "Obstacle majeur à l'installation des jeunes agriculteurs hors cadre familial :",
      "opt": [
        "Le coût financier exorbitant du foncier et des équipements d'exploitation",
        "Le refus des jeunes de travailler en plein air dans les champs",
        "L'interdiction de vendre des légumes bio sur les marchés",
        "L'absence complète de terres agricoles vacantes dans le pays"
      ],
      "ans": 0,
      "passEn": "RURAL SOCIOLOGY — FARM TRANSITION PAPERS: GENERATIONAL RENEWAL CHALLENGES IN AGRICULTURE.\n\nWith over a third of farmers retiring within ten years, young non-family farmers face hurdles purchasing farmland and equipment. Newcomers struggle to secure bank loans given initial capital investments exceeding hundreds of thousands of euros.\n\nEasing land access, citizen land trusts purchase farmland using community savings to lease affordably to young organic produce farmers.",
      "qEn": "Major obstacle preventing young non-family farmers from establishing farms:",
      "optEn": [
        "Exorbitant financial costs of land acquisition and farm equipment",
        "Youth refusal to work outdoors across agricultural fields",
        "Prohibitions banning organic vegetable sales at retail markets",
        "Complete absence of vacant agricultural farmland nationwide"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial de sociologie de la culture",
      "text": "SOCIOLOGIE DE LA CULTURE — TRIBUNE DES PRATIQUES ESTHÉTIQUES : LA MARCHANDISATION DU CADRE DE VIE ET L'ÉVICTION SYMBOLIQUE URBAINE.\n\nLa transformation des quartiers populaires historiques des métropoles en vitrines touristiques et en espaces de consommation haut de gamme s'accompagne d'une esthétisation sélective de l'espace public. En remplaçant les commerces de proximité traditionnels par des boutiques de luxe éphémères et des cafés conceptuels calibrés pour les réseaux sociaux, l'aménagement urbain contemporain privilégie la valeur de spectacle marchand sur la valeur d'usage citoyenne.\n\nCette gentrification commerciale produit une forme subtile mais dévastatrice d'éviction symbolique. Sans qu'aucune mesure de bannissement explicite ne soit prononcée, les résidents historiques des classes populaires se sentent progressivement étrangers dans leur propre quartier. Privés de commerces abordables et de lieux de sociabilité informels adaptés à leurs moyens, les habitants modestes subissent un sentiment de relégation culturelle qui érode la cohésion sociale.",
      "q": "Impact majeur de la transformation esthétique et commerciale des quartiers populaires :",
      "opt": [
        "Une hausse de la solidarité spontanée entre toutes les classes sociales",
        "Une éviction symbolique et un sentiment de relégation culturelle des habitants modestes",
        "L'obligation pour les commerçants de donner leurs produits gratuitement",
        "La baisse des prix de l'immobilier permettant à tous d'acheter un logement"
      ],
      "ans": 1,
      "passEn": "CULTURAL SOCIOLOGY — AESTHETIC PRACTICES ESSAY: COMMODIFICATION OF LIVING SPACES AND URBAN EVICTION.\n\nConverting working-class historic neighborhoods into tourist showcases and luxury retail zones pairs with selective public space aestheticization. Replacing traditional neighborhood stores with pop-up luxury boutiques and social-media tailored cafes, modern urban design favors commercial spectacle over citizen utility.\n\nThis commercial gentrification inflicts a subtle yet devastating form of symbolic displacement. Without passing explicit exclusion laws, historic working-class residents feel increasingly alien inside their own neighborhoods. Deprived of affordable shops and informal social hubs matching their means, low-income residents endure cultural marginalization eroding social cohesion.",
      "qEn": "Major impact of the commercial aesthetic conversion of working-class neighborhoods:",
      "optEn": [
        "Surging spontaneous solidarity uniting all socio-economic classes",
        "Symbolic eviction and cultural marginalization of low-income residents",
        "Mandatory requirements for retailers to distribute products free of charge",
        "Collapsing real estate prices allowing everyone to purchase homes"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai d'éthique de la technologie",
      "text": "PHILOSOPHIE DE L'INNOVATION — CAHIERS DE LA PENSÉE NUMÉRIQUE : L'AUTOMATISATION DE LA DÉCISION ET L'EFFACEMENT D'UNE RESPONSABILITÉ DÉMOCRATIQUE DANS LES INSTITUTIONS.\n\nL'intégration d'algorithmes d'apprentissage profond et de systèmes autonomes dans la prise de décision médicale, judiciaire ou financière modifie profondément la nature de la responsabilité morale et juridique. En confiant à des machines des choix qui relevaient autrefois de l'arbitrage éthique et du jugement humain contextualisé, les institutions courent le risque majeur de créer des zones de non-responsabilité diluée où la décision n'appartient plus à personne.\n\nLorsque l'algorithme refuse un crédit, établit un diagnostic médical erroné ou évalue le risque d'un prévenu, la complexité 'boîte noire' du code empêche de retracer la chaîne d'intentionnalité humaine. Cette dilution de la responsabilité sous couvert de neutralité technologique fragilise la justice sociale. Le citoyen lésé se heurte à une bureaucratie automatisée face à laquelle tout recours humain devient impossible.",
      "q": "Risque éthique fondamental lié à la délégation des décisions aux algorithmes 'boîte noire' :",
      "opt": [
        "L'augmentation de la transparence et de la rapidité des recours juridiques",
        "L'obligation de remplacer tous les juges et médecins par des robots",
        "L'effacement de la responsabilité humaine et l'impossibilité de contester les erreurs",
        "La suppression de tous les frais bancaires et des taux d'intérêt"
      ],
      "ans": 2,
      "passEn": "TECHNOLOGY ETHICS — DIGITAL THOUGHT PAPERS: DECISION AUTOMATION AND RESPONSIBILITY ERASE.\n\nIntegrating deep learning algorithms and autonomous systems into medical, legal, or financial decisions alters moral and legal responsibility. Entrusting machines with choices once requiring human ethical judgment risks creating zones of diluted accountability where decisions belong to no one.\n\nWhen algorithms deny loans, issue misdiagnoses, or score offender risks, the code's 'black box' complexity obscures human intent. This accountability dilution under technology neutrality disguises harms social justice. Injured citizens face automated bureaucracies where human appeal becomes impossible.",
      "qEn": "Core ethical risk linked to delegating decision-making to 'black box' algorithms:",
      "optEn": [
        "Increased transparency and speed of legal appeal procedures",
        "Mandatory requirements to replace all judges and doctors with robots",
        "Erasing human accountability and preventing contestation of errors",
        "Complete elimination of bank fees and interest rates nationwide"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse d'économie politique",
      "text": "ÉCONOMIE POLITIQUE — REVUE DE LA TRANSITION PRODUCTIVE : L'ILLUSION DE LA SOBRIÉTÉ INDIVIDUELLE SANS TRANSFORMATION STRUCTURELLE DE L'APPAREIL PRODUCTIF.\n\nLe discours culpabilisateur axé exclusivement sur l'adoption de 'petits gestes' écologiques individuels (éteindre les lumières, réduire ses tirages papier, couper l'eau) masque fréquemment le refus des pouvoirs publics d'imposer des régulations contraignantes aux grands secteurs industriels et financiers. Bien que l'engagement citoyen soit nécessaire, attribuer la responsabilité principale de la crise climatique aux habitudes de consommation individuelle relève d'une mystification politique dangereuse.\n\nDes études scientifiques récentes démontrent que même si l'ensemble des citoyens adoptait un comportement individuel parfait, les émissions globales de gaz à effet de serre ne diminueraient que de 20 %. Sans une transformation structurelle profonde des modes de production, du système de transport de marchandises et des choix énergétiques nationaux, la sobriété individuelle reste impuissante à enrayer le réchauffement climatique.",
      "q": "Ce que démontrent les études scientifiques concernant la sobriété exclusivement individuelle :",
      "opt": [
        "Elle suffit à elle seule à résoudre intégralement la crise climatique mondiale",
        "Elle augmente les émissions de gaz à effet de serre de 50 %",
        "Elle oblige les entreprises à fermer leurs usines immédiatement",
        "Elle est insuffisante sans transformation structurelle des modes de production industriels"
      ],
      "ans": 3,
      "passEn": "POLITICAL ECONOMY — PRODUCTIVE TRANSITION REVIEW: INDIVIDUAL SOBRIETY ILLUSIONS WITHOUT SYSTEMIC CHANGE.\n\nGuilt-driven narratives focusing solely on individual eco-actions (turning off lights, cutting paper printing, saving water) mask public failure to enforce binding regulations on major industrial sectors. While citizen engagement is vital, shifting climate crisis blame onto consumer habits represents political mystification.\n\nStudies show that even if all citizens adopted perfect eco-habits, global emissions would drop by only 20%. Without deep structural transformations of production models, transport systems, and energy choices, individual sobriety alone cannot halt global warming.",
      "qEn": "What scientific studies demonstrate regarding exclusively individual eco-sobriety:",
      "optEn": [
        "Sufficient on its own to completely solve global climate crises",
        "Increases national greenhouse gas emissions by 50%",
        "Forces corporations to shut down manufacturing plants immediately",
        "Insufficient without structural transformation of industrial production models"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai de sociologie du travail",
      "text": "SOCIOLOGIE DU TRAVAIL — CAHIERS DE L'ORGANISATION INDUSTRIELLE : LE MANAGEMENT PAR PROJET ET L'ÉROSION DES SOLIDARITÉS DU SYNDICALISME DANS L'ENTREPRISE MODERNISÉE EN CRISE.\n\nLa généralisation du management par projet et du travail en réseau au sein des grandes entreprises privées et publiques a profondément déstructuré les communautés de travail traditionnelles. En remplaçant les équipes stables et les métiers identifiés par des groupes de projet éphémères continuellement recomposés au gré des objectifs financiers de court terme, l'organisation managériale individualise la relation d'emploi.\n\nCette mise en concurrence permanente des salariés érode les solidarités collectives et fragilise l'action syndicale. Isolé face à des objectifs d'évaluation individualisés et des indicateurs de performance stricts, le salarié ne peut plus s'appuyer sur la force du collectif pour défendre ses conditions de travail et négocier ses droits fondamentaux, subissant une vulnérabilité accrue face au pouvoir patronal.",
      "q": "Effet de la généralisation du management par projet éphémère sur les salariés :",
      "opt": [
        "L'individualisation de la relation de travail et l'érosion des solidarités collectives",
        "Le renforcement de la solidarité ouvrière et des syndicats",
        "L'augmentation automatique des salaires de 30 % pour tous",
        "La diminution du stress professionnel et de la charge de travail"
      ],
      "ans": 0,
      "passEn": "WORK SOCIOLOGY — INDUSTRIAL ORGANIZATION PAPERS: PROJECT MANAGEMENT AND TRADE UNION EROSION.\n\nWidespread adoption of project-based management across corporations restructured traditional work communities. Replacing stable teams with temporary project groups constantly reshuffled for short-term targets, corporate management individualizes employment relationships.\n\nThis continuous employee competition erodes collective solidarity and weakens union bargaining. Isolated facing individualized performance metrics, workers can no longer rely on collective strength to defend working conditions, enduring heightened vulnerability.",
      "qEn": "Effect of widespread temporary project-based management on corporate employees:",
      "optEn": [
        "Individualizing work relationships and eroding collective worker solidarity",
        "Strengthening worker solidarity and trade union collective bargaining power",
        "Automatic salary increases of 30% across all corporate positions",
        "Declining workplace stress and overall workload requirements"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 34,
      "level": "C1",
      "docType": "Analyse sur la théorie du droit",
      "text": "PHILOSOPHIE DU DROIT — CAHIERS DU DROIT CONSTITUTIONNEL : LA JUDICIARISATION DU DÉBAT POLITIQUE ET LE GOUVERNEMENT DES JUGES EN DÉMOCRATIE REPRÉSENTATIVE CONTEMPORAINE.\n\nLa tendance croissante à recourir aux tribunaux et aux cours suprêmes pour trancher des controverses éthiques ou sociétales majeures — traditionnellement débattues au Parlement — opère un déplacement inédit du centre de gravité démocratique. En confiant à des juges non élus l'arbitrage suprême sur la définition des valeurs et des choix de la cité, la société prend le risque majeur de judiciariser la politique.\n\nCette judiciarisation du débat public affablit la délibération démocratique parlementaire et le pouvoir citoyen. Lorsque les citoyens perçoivent que les choix fondamentaux dépendent de décisions de jurisprudence plutôt que du vote direct de leurs representatives élus, la légitimité des institutions politiques s'érode au profit d'un technocratisme juridique perçu comme distant, froid et autoritaire.",
      "q": "Risque institutionnel majeur lié à la judiciarisation des controverses politiques :",
      "opt": [
        "L'augmentation du nombre de députés élus au Parlement",
        "L'affaiblissement du débat parlementaire au profit d'arbitrages par des juges non élus",
        "L'obligation de supprimer tous les tribunaux du pays",
        "La gratuité totale de tous les frais d'avocat pour les citoyens"
      ],
      "ans": 1,
      "passEn": "LEGAL THEORY — CONSTITUTIONAL LAW PAPERS: POLITICS JUDICIALIZATION AND JUDICIAL GOVERNMENT.\n\nTurning to courts and supreme benches to settle major societal controversies traditionally debated in parliament shifts democratic centers of gravity. Entrusting non-elected judges with supreme choices over societal values risks judicializing politics.\n\nJudicializing public debate weakens parliamentary deliberation. When citizens view core choices as depending on judicial case law rather than votes by elected representatives, political institutional legitimacy erodes into distance legal technocracy.",
      "qEn": "Major institutional risk linked to judicializing political controversies:",
      "optEn": [
        "Surging numbers of elected members of parliament in government",
        "Weakening parliamentary debate in favor of rulings by non-elected judges",
        "Mandatory requirements to abolish all courts of law nationwide",
        "Complete free coverage of all attorney legal fees for citizens"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai d'esthétique de l'architecture",
      "text": "ARCHITECTURE ET VILLE — REVUE D'URBANISME CONTEMPORAIN : LA STANDARDISATION DES FAÇADES ET LA PERTE DE L'ANCRAGE RÉGIONAL DANS LES MÉTROPOLES MONDIALISÉES MODERNES ET CONTEMPORAINES.\n\nLa généralisation des matériaux industriels standardisés (bardages métalliques, façades de verre miroir, béton préfabriqué) dans la construction contemporaine produit un paysage urbain générique, répétitif et interchangeable. Des centres d'affaires de Tokyo aux entrées de ville européennes, la répétition des mêmes formes architecturales neutres efface l'identité matérielle et l'histoire séculaire des territoires.\n\nCette perte de l'ancrage régional dégrade profondément le sentiment d'appartenance des habitants à leur quartier d'origine. Privée de continuité stylistique avec le patrimoine local et insensible aux contraintes du climat régional, l'architecture mondialisée réduit la ville à un assemblage fonctionnel froid qui étouffe la sensibilité et l'expérience poétique quotidienne du cadre de vie. Réenchanter l'urbanisme exige de réimposer impérativement l'usage de matériaux biosourcés et locaux.",
      "q": "Conséquence majeure de la standardisation des matériaux dans l'architecture contemporaine :",
      "opt": [
        "Le renforcement de l'identité visuelle et historique des villes",
        "La baisse des coûts de chauffage grâce aux façades en verre",
        "L'effacement de l'ancrage régional et la création d'un paysage urbain générique",
        "L'obligation de construire uniquement des maisons en bois massif"
      ],
      "ans": 2,
      "passEn": "ARCHITECTURE AND CITY — URBAN PLANNING REVIEW: FACADE STANDARDIZATION AND REGIONAL UNGROUNDING.\n\nWidespread adoption of standardized industrial materials (metal cladding, glass curtain walls, precast concrete) creates generic, interchangeable urban landscapes. From Tokyo business districts to European city entrances, repeating neutral architectural forms erases territorial history.\n\nLosing regional identity weakens resident sense of place. Stripped of stylistic continuity with local heritage and indifferent to regional climate demands, globalized architecture shrinks cities into cold functional assemblies stifling daily poetic experience.",
      "qEn": "Major consequence of material standardization in contemporary architecture:",
      "optEn": [
        "Strengthening historical and visual identity across regional cities",
        "Drastic heating utility cost reductions enabled by glass facades",
        "Erasing regional identity and creating generic, interchangeable urban landscapes",
        "Mandatory requirements to construct solid wood homes strictly"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur l'éducation",
      "text": "PHILOSOPHIE DE L'ÉDUCATION — ANNALES DE LA PENSÉE PÉDAGOGIQUE : LA DÉRIVE UTILITARISTE DE L'ENSEIGNEMENT ET LA PERTE DE LA CULTURE GÉNÉRALE.\n\nLa soumission progressive des systèmes éducatifs nationaux aux exigences de l'économie de marché et à l'impératif d'employabilité immédiate opère une transformation profonde de la mission de l'école. En remplaçant la transmission de la culture générale, de l'histoire des idées et de la pensée critique par l'acquisition de 'compétences opérationnelles' à faible valeur réflexive, la réforme utilitariste de l'enseignement réduit la formation humaine à un simple dressage à l'adaptation professionnelle.\n\nCette marchandisation du savoir affaiblit les fondements de la citoyenneté démocratique. En privant les jeunes générations de l'accès aux grands textes littéraires, à la philosophie et à la rigueur des sciences fondamentales au profit de savoirs techniques éphémères, l'institution scolaire forme des exécutants dociles mais incapables de questionner l'ordre établi et d'analyser la complexité du monde. Réhabiliter l'école démocratique exige de réaffirmer que l'éducation n'a pas pour fin de servir le marché mais de former des êtres libres et lucides.",
      "q": "Quelle critique centrale l'auteur adresse-t-il à la réforme utilitariste de l'enseignement ?",
      "opt": [
        "Elle donne trop d'importance à la philosophie et à la culture générale",
        "Elle augmente le nombre d'heures de sport au détriment des mathématiques",
        "Elle oblige tous les étudiants à devenir des enseignants universitaires",
        "Elle réduit la formation humaine à un dressage professionnel en sacrifiant la culture générale"
      ],
      "ans": 3,
      "passEn": "EDUCATION PHILOSOPHY — PEDAGOGICAL THOUGHT ANNALS: UTILITARIAN EDUCATION DRIFTS AND GENERAL CULTURE LOSS.\n\nSubordinating national education systems to market economy demands and instant employability overhauls school missions. Replacing general culture, history of ideas, and critical thought with 'operational skills' of low reflective value, utilitarian educational reforms shrink human development into job market training.\n\nKnowledge commodification weakens democratic citizenship foundations. Depriving youth of access to classic literature, philosophy, and basic science in favor of ephemeral technical skills, schools train compliant workers incapable of questioning established orders or analyzing world complexity. Reclaiming democratic schooling requires asserting education exists to form free, lucid individuals.",
      "qEn": "What core critique does the author direct against utilitarian education reform?",
      "optEn": [
        "Granting far too much importance to philosophy and general human culture",
        "Increasing sports class hours at the expense of basic mathematics",
        "Mandating all university students to become academic professors",
        "Shrinking human development into job training while sacrificing general culture"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie de l'information",
      "text": "ÉPISTÉMOLOGIE DES MÉDIAS — REVUE DE LA PENSÉE CRITIQUE : LA FABRIQUE DE L'IGNORANCE ET LES STRATÉGIES DE DÉSINFORMATION INDUSTRIELLE.\n\nL'analyse contemporaine des théories de l'information met en lumière le développement de l'agnotologie : l'étude de la production culturelle et scientifique de l'ignorance orchestrée par des intérêts industriels ou politiques. En financant des études biaisées, en entretenant un faux doute scientifique sur des sujets éprouvés (tabagisme, réchauffement climatique, perturbateurs endocriniens) et en inondant l'espace médiatique de controverses artificielles, certains lobbies parviennent à paralyser la décision publique.\n\nCette fabrique délibérée du doute opère une falsification du débat démocratique. En exploitant la naïveté du public et en mettant sur le même plan le consensus scientifique rigoureux et l'opinion d'experts autoproclamés, la stratégie agnotologique détruit la confiance citoyenne dans la science. Restaurer l'intégrité de la vérité publique exige de protéger la recherche scientifique indépendante des ingérences financières.",
      "q": "Méthode centrale utilisée par les lobbies industriels dans la 'fabrique de l'ignorance' :",
      "opt": [
        "Entretenir un faux doute scientifique et financer des études biaisées pour paralyser les décisions",
        "Financer la recherche indépendante sans intervenir dans les résultats",
        "Publier l'intégralité des données brutes dans des revues internationales gratuites",
        "Interdire aux journalistes de parler de science dans les médias"
      ],
      "ans": 0,
      "passEn": "MEDIA EPISTEMOLOGY — CRITICAL THOUGHT REVIEW: MANUFACTURING IGNORANCE AND INDUSTRIAL DISINFORMATION STRATEGIES.\n\nContemporary information theory highlights agnotology: analyzing the cultural/scientific production of ignorance orchestrated by industrial interests. Funding biased studies, manufacturing fake doubt on proven topics (tobacco, climate change, endocrine disruptors), and flooding media with artificial controversies, lobbies paralyze public policy.\n\nThis deliberate doubt manufacturing falsifies democratic debate. Exploiting public gullibility and equating rigorous scientific consensus with self-appointed expert opinions, agnotological strategies destroy public trust in science. Restoring public truth integrity demands shielding independent research from corporate influence.",
      "qEn": "Core method used by industrial lobbies in 'manufacturing ignorance':",
      "optEn": [
        "Manufacturing fake scientific doubt and funding biased studies to paralyze decisions",
        "Funding independent research without interfering in findings",
        "Publishing raw complete data sets inside free international journals",
        "Prohibiting journalists from discussing science across news media"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion sur l'éthique de la science",
      "text": "ETHIQUE DES SCIENCES — CAHIERS DE LA RECHERCHE RESPONSABLE : LE PARADOXE DU SOLIPSISE TECHNOLOGIQUE ET LA NÉGATION DES LIMITES TERRESTRES.\n\nLa croyance aveugle dans la capacité de l'innovation technologique à résoudre mécaniquement tous les désordres écologiques engendrés par l'expansion industrielle relève d'une forme de solipsisme technologique dangereux. En prétendant inventer des solutions de géo-ingénierie à grande échelle — comme la capture du carbone dans l'atmosphère, la modification du rayonnement solaire ou la colonisation d'autres planètes —, le techno-solutionnisme marchand refuse d'affronter la réalité des limites physiques et biologiques de la planète Terre.\n\nCette fuite en avant dans le messianisme technologique retarde la prise de décision politique courageuse. En faisant miroiter un avenir où l'humanité pourrait poursuivre son hyperconsommation sans altérer son mode de vie grâce à des technologies miracles incertaines, les élites économiques évitent de procéder à la réorganisation démocratique nécessaire de la production. L'éthique de la responsabilité exige d'accepter la finitude des ressources et d'adapter notre société aux limites du monde vivant.",
      "q": "Quelle illusion majeure du 'techno-solutionnisme' est dénoncée dans l'essai ?",
      "opt": [
        "Croire que la science ne peut rien inventer pour aider la médecine",
        "Croire que la technologie résoudra les crises écologiques sans modifier les modes de vie",
        "Obliger les scientifiques à abandonner toute recherche fondamentale",
        "Considérer que la Terre dispose de ressources infinies gratuites pour tous"
      ],
      "ans": 1,
      "passEn": "SCIENCE ETHICS — RESPONSIBLE RESEARCH PAPERS: TECHNOLOGICAL SOLIPSISM AND TERRESTRIAL LIMIT DENIAL.\n\nBlind faith in tech innovation mechanics to solve ecological breakdowns caused by industrial growth stems from dangerous technological solipsism. Claiming geo-engineering fixes—atmospheric carbon capture, solar radiation manipulation, off-world colonization—tech-solutionism refuses to confront physical terrestrial limits.\n\nThis flight into tech messianism delays courageous policy choices. Promising futures where hyperconsumption continues without lifestyle shifts via unproven miracle tech, economic elites avoid necessary democratic production redesigns. Responsibility ethics demands accepting finite resource limits and adapting society to living world boundaries.",
      "qEn": "What major illusion of 'techno-solutionism' is denounced in the essay?",
      "optEn": [
        "Believing that scientific research cannot innovate medical treatments",
        "Believing tech will fix ecological crises without shifting consumption lifestyles",
        "Forcing working scientists to abandon basic fundamental research",
        "Viewing Earth as possessing infinite free resources for all humans"
      ]
    },
    {
      "paperNum": 9,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai philosophique sur la démocratie",
      "text": "PHILOSOPHIE POLITIQUE — REVUE DE LA DÉMOCRATIE PARTICIPATIVE : LA SOUVERAINETÉ POPULAIRE FACE À LA GOVERNANCE ALGORITHMIQUE.\n\nL'érosion des institutions démocratiques traditionnelles s'accélère sous l'effet de l'extension de la 'gouvernance algorithmique' et du gouvernement par les données. En prétendant substituer à la délibération politique contradictoire et au conflit idéologique légitime une optimisation mathématique permanente des choix publics basée sur l'analyse du Big Data, la technocratie contemporaine dépossède le peuple de sa souveraineté politique originelle.\n\nCette rationalisation informatique transforme le citoyen en un simple producteur de données comportementales réagissant à des incitations automatisées. Privée de lieux de débat contradictoire où s'élabore la volonté collective, la démocratie se réduit à une gestion managériale des flux et des risques. Réhabiliter la souveraineté populaire exige de réaffirmer que la politique n'est pas un calcul d'optimisation numérique mais un choix collectif de valeurs et de destin partagé.",
      "q": "Quelle thèse centrale l'auteur défend-il au sujet de la gouvernance par les données (Big Data) ?",
      "opt": [
        "Elle garantit l'égalité parfaite et la liberté de tous les citoyens",
        "Elle oblige les gouvernements à distribuer un revenu universel à tous les habitants",
        "Elle dépossède le peuple de sa souveraineté en remplaçant le débat politique par un calcul mathématique",
        "Elle élimine la corruption et les erreurs administratives dans les ministères"
      ],
      "ans": 2,
      "passEn": "POLITICAL PHILOSOPHY — PARTICIPATORY DEMOCRACY REVIEW: POPULAR SOVEREIGNTY VERSUS ALGORITHMIC GOVERNANCE.\n\nTraditional democratic institution erosion accelerates under expanding 'algorithmic governance' and data-driven rule. Claiming to replace political debate and ideological choices with continuous mathematical policy optimization via Big Data, modern technocracy strips citizens of political sovereignty.\n\nThis computational rationalization shrinks citizens into behavioral data producers responding to automated prompts. Stripped of debate forums where collective wills form, democracy reduces to managing flows and risks. Reclaiming popular sovereignty requires asserting politics is not algorithmic optimization but collective value choices and shared destiny.",
      "qEn": "What central thesis does the author defend regarding data-driven algorithmic governance?",
      "optEn": [
        "Guarantees flawless equality and political freedom for all citizens",
        "Forces governments to distribute universal basic income to all residents",
        "Deprives citizens of sovereignty by replacing political debate with math calculations",
        "Eliminates corruption and administrative errors across government ministries"
      ]
    }
  ],
  [
    {
      "paperNum": 10,
      "qNum": 1,
      "level": "A1",
      "docType": "Annonce de fleuriste",
      "text": "FLEURS DU MARCHÉ — PROMOTION DE PRINTEMPS : Tous les bouquets de tulipes et de jonquilles sont à 5 euros ce week-end. Livraison gratuite en centre-ville à partir de 20 euros d'achat.",
      "q": "Combien coûte un bouquet de tulipes ce week-end ?",
      "opt": [
        "5 euros",
        "3 euros",
        "10 euros",
        "20 euros"
      ],
      "ans": 0,
      "passEn": "MARKET FLOWERS — SPRING SALE: All tulip and daffodil bouquets at 5 euros this weekend. Free downtown delivery for purchases over 20 euros.",
      "qEn": "How much does a tulip bouquet cost this weekend?",
      "optEn": [
        "5 euros",
        "3 euros",
        "10 euros",
        "20 euros"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 2,
      "level": "A1",
      "docType": "Consigne de patinoire municipale",
      "text": "PATINOIRE MUNICIPALE — ACCÈS ET SÉCURITÉ : Le port des gants est obligatoire sur la piste de glace pour tous les patineurs. Location de patins possible sur place au guichet 2.",
      "q": "Quel équipement est obligatoire sur la piste de glace ?",
      "opt": [
        "Un casque de protection rigide",
        "Le port des gants obligatoire",
        "Des genouillères rembourrées",
        "Un blouson de ski imperméable"
      ],
      "ans": 1,
      "passEn": "MUNICIPAL ICE RINK — ACCESS AND SAFETY: Wearing gloves is mandatory on the ice rink for all skaters. Skate rental available at counter 2.",
      "qEn": "What equipment is mandatory on the ice rink?",
      "optEn": [
        "Hard protective safety helmet",
        "Mandatory gloves worn",
        "Padded protective knee pads",
        "Waterproof ski jacket coat"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 3,
      "level": "A1",
      "docType": "Avis de pressing municipal",
      "text": "PRESSING EXPRESS — SERVICE NETTOYAGE : Déposez vos vêtements avant 10h00 du matin et récupérez-les propres et repassés le jour même dès 17h00.",
      "q": "À partir de quelle heure peut-on récupérer ses vêtements nettoyés ?",
      "opt": [
        "Dès 10h00 du matin",
        "Le lendemain matin à 08h00",
        "Dès 17h00 le jour même",
        "48 heures plus tard uniquement"
      ],
      "ans": 2,
      "passEn": "EXPRESS CLEANERS — CLEANING SERVICE: Drop off clothes before 10:00 AM and pick them up clean and ironed same day starting at 5:00 PM.",
      "qEn": "From what time can customers pick up cleaned clothing items?",
      "optEn": [
        "Starting 10:00 AM in the morning",
        "Next morning at 8:00 AM",
        "Starting 5:00 PM same day",
        "48 hours later exclusively"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 4,
      "level": "A1",
      "docType": "Note de résidence sénior",
      "text": "RÉSIDENCE DU SOLEIL — ACTIVITÉ GYM DOUCE : Cours de gym douce ouvert à tous les résidents ce vendredi de 15h00 à 16h00 dans la grande salle commune.",
      "q": "Où se déroule le cours de gym douce ?",
      "opt": [
        "Dans le jardin extérieur",
        "À la piscine municipale",
        "Dans les chambres individuelles",
        "Dans la grande salle commune"
      ],
      "ans": 3,
      "passEn": "SUNSHINE RESIDENCE — GENTLE GYM CLASS: Gentle fitness class open to all residents this Friday 3:00 PM to 4:00 PM in the main common hall.",
      "qEn": "Where takes place the gentle fitness class?",
      "optEn": [
        "In the outdoor garden area",
        "At the municipal town pool",
        "Inside individual bedrooms",
        "In the main common hall"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 5,
      "level": "A2",
      "docType": "SMS d'agence immobilière",
      "text": "AGENCE DU PARC — VISITE D'APPARTEMENT : Votre visite de l'appartement 3 pièces est confirmée pour ce samedi à 11h00 au 12 rue des Fleurs. Merci de prévenir par SMS en cas de retard.",
      "q": "Que demande l'agence en cas de retard à la visite ?",
      "opt": [
        "Prévenir l'agent par SMS",
        "Payer des frais de visite supplémentaires",
        "Reprendre rendez-vous la semaine suivante",
        "Attendre devant l'immeuble sans téléphoner"
      ],
      "ans": 0,
      "passEn": "PARK REALTY — APARTMENT VIEWING: Your 2-bedroom apartment viewing is confirmed for Saturday at 11:00 AM at 12 Rue des Fleurs. Please notify by SMS if running late.",
      "qEn": "What does the agency request if running late for the viewing?",
      "optEn": [
        "Notify the real estate agent by SMS",
        "Pay additional viewing cancellation fees",
        "Reschedule viewing for the following week",
        "Wait outside building without calling"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 6,
      "level": "A2",
      "docType": "Annonce d'atelier de couture",
      "text": "COUTURE ET CRÉATION — ATELIER RETOUCHES : Apprenez à faire des ourlets de pantalons et à poser des fermetures éclair ce samedi de 09h30 à 12h30. Machines et fils fournis. Tarif : 25 euros.",
      "q": "Que feront les participants durant cet atelier de couture ?",
      "opt": [
        "Fabriquer un manteau en laine épais",
        "Apprendre à faire des ourlets et poser des fermetures",
        "Dessiner des modèles de haute couture",
        "Vendre des tissus au mètre"
      ],
      "ans": 1,
      "passEn": "SEWING STUDIO — ALTERATIONS WORKSHOP: Learn pants hemming and zipper installation this Saturday 9:30 AM to 12:30 PM. Sewing machines and thread provided. Fee: 25 euros.",
      "qEn": "What will participants practice during the sewing workshop?",
      "optEn": [
        "Tailoring a heavy wool winter coat",
        "Learning pants hemming and zipper installs",
        "Sketching high fashion designer gowns",
        "Selling fabric rolls by the meter"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 7,
      "level": "A2",
      "docType": "Avis de médiathèque de quartier",
      "text": "MÉDIATHÈQUE DU CENTRE — CLUB DE LECTURE : Le club de lecture pour adultes se réunit ce jeudi à 18h00 autour des romans policiers scandinaves. Entrée libre et gratuite. Thé et biscuits offerts.",
      "q": "Quel est le thème de la réunion du club de lecture de jeudi ?",
      "opt": [
        "La poésie classique française du XIXe",
        "Les livres de cuisine méditerranéenne",
        "Les romans policiers scandinaves",
        "Les bandes dessinées pour enfants"
      ],
      "ans": 2,
      "passEn": "CENTER MEDIA LIBRARY — BOOK CLUB: Adult book club meets Thursday at 6:00 PM discussing Scandinavian crime fiction novels. Free admission. Tea and cookies provided.",
      "qEn": "What is the theme of Thursday's book club meeting?",
      "optEn": [
        "Classical 19th-century French poetry",
        "Mediterranean recipe cookbooks",
        "Scandinavian crime fiction novels",
        "Children's comic book graphic novels"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 8,
      "level": "A2",
      "docType": "Consigne d'aire de pique-nique",
      "text": "PARC RURAL — AIRE DE PIQUE-NIQUE : Les feux de camp et les barbecues à charbon sont strictement interdits dans tout le domaine forestier. Merci de remporter vos déchets ménagers à la fin de votre journée.",
      "q": "Quelle interdiction s'applique dans l'aire de pique-nique ?",
      "opt": [
        "Manger des sandwichs sur l'herbe",
        "S'asseoir sur les tables en bois",
        "Utiliser des gourdes d'eau réutilisables",
        "Faire des feux de camp et barbecues à charbon"
      ],
      "ans": 3,
      "passEn": "RURAL PARK — PICNIC AREA: Campfires and charcoal barbecues are strictly banned across forest lands. Please pack out all personal trash at the end of your day.",
      "qEn": "What restriction applies inside the forest picnic area?",
      "optEn": [
        "Eating picnic sandwiches on the grass",
        "Sitting down on outdoor wooden tables",
        "Using reusable water drinking bottles",
        "Making campfires and charcoal barbecues"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 9,
      "level": "A2",
      "docType": "Message de prévention chaleur",
      "text": "SANTÉ PUBLIQUE — ALERTE CANICULE : En cas de fortes chaleurs, buvez de l'eau régulièrement sans attendre d'avoir soif, évitez les efforts physiques aux heures les plus chaudes (12h00-16h00) et gardez les volets fermés.",
      "q": "Que recommande la prévention sanitaire durant la canicule ?",
      "opt": [
        "Boire régulièrement de l'eau sans attendre la soif",
        "Faire du jogging léger en plein soleil à 14h00",
        "Ouvrir toutes les fenêtres aux heures chaudes",
        "Ne boire de l'eau que le soir au coucher"
      ],
      "ans": 0,
      "passEn": "PUBLIC HEALTH — HEATWAVE WARNING: During high heat, drink water regularly before feeling thirsty, avoid physical exercise during peak hot hours (12-4 PM), and keep shutters closed.",
      "qEn": "What does health prevention advise during a heatwave?",
      "optEn": [
        "Drinking water regularly before feeling thirsty",
        "Jogging in direct sunlight at 2:00 PM",
        "Opening all windows during peak hot hours",
        "Drinking water strictly at bedtime at night"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 10,
      "level": "A2",
      "docType": "Annonce d'atelier de réparation vélo",
      "text": "CYCLO-SERVICE — ATELIER AUTO-RÉPARATION : Apprenez à réparer une crevaison et à régler vos freins de vélo tous les mercredis de 16h00 à 19h00. Outils et conseils fournis gratuitement par des mécaniciens bénévoles.",
      "q": "Qui fournit les conseils de réparation au club vélo ?",
      "opt": [
        "Des réparateurs professionnels payants",
        "Des mécaniciens bénévoles du club",
        "Les agents de la police municipale",
        "Les constructeurs de vélos neufs"
      ],
      "ans": 1,
      "passEn": "CYCLO-SERVICE — SELF-REPAIR SHOP: Learn to fix flat tires and adjust bike brakes every Wednesday 4:00 PM to 7:00 PM. Tools and guidance provided free by volunteer mechanics.",
      "qEn": "Who provides repair guidance at the community bike shop?",
      "optEn": [
        "Paid commercial bike technicians",
        "Volunteer club mechanics",
        "Municipal city police officers",
        "New bicycle retail manufacturers"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 11,
      "level": "A2",
      "docType": "Information de boulangerie bio",
      "text": "PAIN DU TERROIR — BOULANGERIE ARTISANALE : Tous nos pains sont fabriqués avec des farines biologiques locales et cuits au feu de bois. Pains spéciaux disponibles sur commande 24 heures à l'avance.",
      "q": "Comment sont cuits les pains de cette boulangerie ?",
      "opt": [
        "Dans des fours à micro-ondes industriels",
        "Dans des fours à gaz importés",
        "Au feu de bois de manière artisanale",
        "Par séchage solaire sous serre"
      ],
      "ans": 2,
      "passEn": "TERROIR BREAD — ARTISAN BAKERY: All our breads are made using local organic flour and baked in wood-fired ovens. Specialty breads available on 24-hour advance order.",
      "qEn": "How are the breads baked at this artisan bakery?",
      "optEn": [
        "Inside industrial microwave ovens",
        "Inside imported gas convection ovens",
        "In wood-fired artisan ovens",
        "Via solar drying inside greenhouses"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 12,
      "level": "A2",
      "docType": "Consigne de salle de spectacle",
      "text": "THÉÂTRE MUNICIPAL — CONSIGNES D'ENTRÉE : Les portes de la salle sont fermées dès le début du spectacle à 20h00 précise. Les retardataires ne pourront accéder à leur siège qu'à l'entracte.",
      "q": "Que se passe-t-il pour les spectateurs en retard ?",
      "opt": [
        "Ils doivent rembourser leur billet d'entrée",
        "Ils doivent s'asseoir sur la scène avec les acteurs",
        "Ils sont reconduits chez eux en navette",
        "Ils ne peuvent accéder à la salle qu'à l'entracte"
      ],
      "ans": 3,
      "passEn": "MUNICIPAL THEATRE — ENTRY RULES: Auditorium doors close promptly at showtime at 8:00 PM. Latecomers will only be admitted during intermission.",
      "qEn": "What happens to theatergoers who arrive late?",
      "optEn": [
        "They must refund their admission ticket",
        "Seated directly on stage alongside actors",
        "Escorted home via complimentary shuttle",
        "Admitted to seats only during intermission"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 13,
      "level": "B1",
      "docType": "Article de presse régionale",
      "text": "INNOVATION URBAINE — BULLETIN DE LA CITÉ VERTE : L'INSTALLATION DE TOITS VÉGÉTALISÉS SUR LES BÂTIMENTS PUBLICS.\n\nPour lutter contre les îlots de chaleur urbains et améliorer l'isolation thermique des édifices publics, la municipalité généralise l'installation de toits végétalisés sur les écoles et les gymnases. Recouverts de plantes vivaces résistantes à la sécheresse, ces toits captent l'eau de pluie tout en rafraîchissant naturellement l'air intérieur en été.\n\nCette isolation naturelle permet de réduire les factures de climatisation des bâtiments de 25 % tout en offrant un refuge précieux aux oiseaux et insectes pollinisateurs en ville.",
      "q": "Bénéfice majeur apporté par la végétalisation des toits des édifices publics :",
      "opt": [
        "Le rafraîchissement naturel et la baisse de 25 % des coûts de climatisation",
        "La hausse des dépenses de chauffage en été",
        "L'obligation de démolir les écoles pour reconstruire des parcs",
        "La suppression de l'accès aux gymnases municipaux"
      ],
      "ans": 0,
      "passEn": "URBAN INNOVATION — GREEN CITY BULLETIN: ROOFTOP GREENING ON PUBLIC BUILDINGS.\n\nCombating urban heat islands and boosting thermal insulation, the city installs green roofs across schools and gyms. Covered in drought-hardy perennials, green roofs harvest rainwater while cooling indoor air naturally during summer.\n\nThis natural insulation cuts summer AC power bills by 25% while creating sanctuaries for urban birds and pollinators.",
      "qEn": "Major benefit delivered by installing green roofs on public buildings:",
      "optEn": [
        "Natural cooling and cutting AC power bills by 25%",
        "Surging summer heating utility expenses",
        "Mandatory requirements to demolish schools for parks",
        "Closing municipal gym access to residents"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 14,
      "level": "B1",
      "docType": "Article sur l'artisanat de la reliure",
      "text": "SAVOIR-FAIRE DULIVRE — REVUE DE LA RELIURE ARTISANALE : LA PRESERVATION DE LA RELIURE EN CUIR SUR MESURE.\n\nLes derniers maîtres relieurs préservent l'art délicat de la reliure cousue main et de la dorure à la feuille d'or pour restaurer les ouvrages précieux du patrimoine ou habiller des carnets sur mesure. En assemblant les cahiers avec du fil de lin et en façonnant des couvertures en cuir végétal, ces artisans garantissent une durabilité séculaire aux livres confiés.\n\nCette transmission artisanale préserve des gestes minutieux inchangés depuis le XVIIIe siècle, offrant une alternative d'une élégance rare face aux livres brochés collés de grande consommation.",
      "q": "Garantie offerte par la reliure artisanale cousue main par rapport au livre industriel :",
      "opt": [
        "Un prix de vente divisé par dix en librairie",
        "Une durabilité séculaire et une élégance artisanale rare",
        "La possibilité de lire les livres sans les ouvrir",
        "L'obligation de détruire le livre après la première lecture"
      ],
      "ans": 1,
      "passEn": "BOOK ARTS — HAND BINDING REVIEW: PRESERVING CUSTOM LEATHER BOOKBINDING.\n\nMaster bookbinders preserve hand-sewn binding and gold-leaf tooling to restore rare volumes or craft bespoke journals. Sewing signatures with linen thread and shaping vegetable-tanned leather covers, artisans guarantee centuries of durability.\n\nPreserving 18th-century technique, hand binding delivers timeless elegance missing from mass glued paperbacks.",
      "qEn": "Guarantee delivered by hand-sewn artisan bookbinding over mass printing:",
      "optEn": [
        "Bookstore retail price tag cut ten-fold",
        "Centuries of durability and rare artisan elegance",
        "Ability to read books without opening pages",
        "Mandatory requirements to destroy books after reading"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 15,
      "level": "B1",
      "docType": "Article sur l'agriculture urbaine solidaire",
      "text": "CITOYENNETÉ ET ALIMENTATION — BULLETIN DES JARDINS PARTAGÉS : LA CULTURE POTAGÈRE SUR PARCELLES SOCIALES.\n\nDes associations de quartier aménagent des jardins potagers partagés destinés aux familles modestes vivant en appartement. Encadrés par des jardiniers bénévoles expérimentés, les résidents y cultivent des tomates, des courgettes et des herbes aromatiques sans aucun pesticide chimique.\n\nCette production potagère ultra-locale permet d'améliorer la qualité nutritionnelle de l'alimentation des résidents tout en créant des lieux de convivilaité et d'échanges intergénérationnels très appréciés au cœur des cités.",
      "q": "Bénéfice social et sanitaire apporté par les jardins potagers partagés :",
      "opt": [
        "L'obligation d'acheter tous ses légumes au supermarché",
        "L'obligation de vendre sa récolte à des grossistes privés",
        "Une meilleure qualité nutritionnelle et le renforcement des liens sociaux",
        "La fermeture définitive des espaces verts du quartier"
      ],
      "ans": 2,
      "passEn": "CITIZENSHIP AND FOOD — COMMUNITY GARDENS BULLETIN: VEGETABLE FARMING ON SOCIAL PLOTS.\n\nNeighborhood associations develop shared vegetable gardens for low-income apartment families. Guided by experienced volunteer gardeners, residents grow tomatoes, zucchini, and herbs without chemical pesticides.\n\nThis ultra-local produce upgrades family meal nutrition while creating cherished intergenerational social hubs in housing projects.",
      "qEn": "Social and health benefit delivered by shared community vegetable gardens:",
      "optEn": [
        "Mandatory requirements to purchase all groceries at supermarkets",
        "Requirements to sell harvests to commercial wholesale distributors",
        "Upgraded meal nutrition and strengthened community social bonds",
        "Permanent closure of all neighborhood public green parks"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 16,
      "level": "B1",
      "docType": "Article sur l'énergie citoyenne",
      "text": "TRANSITION ÉNERGÉTIQUE — BULLETIN DES COOPÉRATIVES SOLAIRES : LE DÉVELOPPEMENT DES CENTRALES VILLAGEOISES ENERGIE.\n\nDes citoyens se regroupent au sein de coopératives locales pour financer et installer des panneaux photovoltaïques sur les toits des bâtiments publics et des granges agricoles. L'électricité renouvelable produite est réinjectée dans le réseau local ou consommée en autoconsommation collective par les habitants du village.\n\nCette réappropriation citoyenne de la production d'énergie permet de conserver les retombées financières sur le territoire tout en accélérant la transition écologique locale.",
      "q": "Principe des centrales villageoises d'énergie solaire coopératives :",
      "opt": [
        "Vendre l'électricité produite à des multinationales étrangères à bas prix",
        "Interdire aux habitants de produire leur propre énergie",
        "Obliger les résidents à couper le courant chaque soir à 20h00",
        "Regrouper l'épargne citoyenne pour installer des panneaux solaires locaux"
      ],
      "ans": 3,
      "passEn": "ENERGY TRANSITION — CO-OP SOLAR BULLETIN: EXPANDING VILLAGE COMMUNITY SOLAR PLANTS.\n\nCitizens form local co-ops to fund and install solar panels on public building roofs and barn tops. The clean electricity generated feeds the local grid or powers collective self-consumption for village residents.\n\nThis community energy ownership retains financial returns locally while accelerating regional green energy transitions.",
      "qEn": "Principle behind cooperative village community solar power initiatives:",
      "optEn": [
        "Selling generated power cheaply to foreign energy conglomerates",
        "Prohibiting residents from generating personal clean energy",
        "Forcing residents to cut off home power at 8:00 PM nightly",
        "Pooling citizen savings to install local solar arrays on community roofs"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 17,
      "level": "B1",
      "docType": "Article sur la préservation du littoral",
      "text": "ÉCOLOGIE CÔTIÈRE — BULLETIN DE LA MER : LA RESTAURATION DES DUNES DE SABLE ET DES OYATS.\n\nAfin de protéger le littoral contre l'érosion marine et les tempêtes hivernales, le Conservatoire du littoral plante des oyats (plantes à enracinement profond) et installe des ganivelles en bois pour fixer le sable des dunes. En canalisant le passage des promeneurs sur des passerelles en bois surélevées, ces aménagements évitent le piétinement de la végétation dunaire fragile.\n\nCette protection biologique naturelle constitue un rempart efficace contre l'avancée de la mer tout en préservant des écosystèmes sableux d'une grande richesse.",
      "q": "Rôle des oyats et des passerelles en bois dans la protection des dunes :",
      "opt": [
        "Fixer le sable et éviter le piétinement destructeur de la végétation",
        "Permettre aux voitures de circuler librement sur le sable",
        "Bétonner intégralement les plages pour construire des digues",
        "Interdire définitivement l'accès à la mer pour tous les citoyens"
      ],
      "ans": 0,
      "passEn": "COASTAL ECOLOGY — OCEAN BULLETIN: RESTORING SAND DUNES AND BEACHGRASS.\n\nShielding shorelines from marine erosion and winter storms, coastal conservancies plant beachgrass (deep-rooting plants) and install wooden fencing to stabilize dunal sand. Guiding walkers along raised wooden boardwalks prevents trampling delicate dune flora.\n\nThis natural bio-protection creates effective barriers against rising seas while preserving rich coastal ecosystems.",
      "qEn": "Role of beachgrass plantings and wooden boardwalks in dune preservation:",
      "optEn": [
        "Stabilizing sand and preventing destructive trampling of flora",
        "Allowing passenger vehicles to drive freely across beach sand",
        "Paving beaches completely with concrete sea walls",
        "Permanently banning ocean access for all citizens"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 18,
      "level": "B1",
      "docType": "Article sur l'inclusion par le sport",
      "text": "SPORT ET CITOYENNETÉ — REVUE DU SPORT ADAPTÉ : L'ORGANISATION DE SESSIONS HANDISPORT INCLUSIVES.\n\nUn club sportif municipal propose des séances d'entraînement partagées réunissant athlètes valides et personnes en situation de handicap physique ou mental. Équipés de fauteuils roulants spécifiques ou guidés par des accompagnateurs formés, les participants pratiquent le basket-fauteuil, la natation et l'athlétisme en équipe mixte.\n\nCette pratique sportive inclusive permet d'abattre les préjugés sur le handicap tout en favorisant le dépassement de soi et l'intégration sociale par le jeu collectif.",
      "q": "Objectif social majeur des sessions de sport adapté inclusif :",
      "opt": [
        "Séparer les athlètes en fonction de leurs capacités physiques",
        "Abattre les préjugés sur le handicap et favoriser l'intégration",
        "Forcer les participants à passer des compétitions professionnelles",
        "Supprimer les équipements de sport adaptés dans la commune"
      ],
      "ans": 1,
      "passEn": "SPORTS AND CITIZENSHIP — ADAPTED SPORTS REVIEW: INCLUSIVE ADAPTED ATHLETICS SESSIONS.\n\nA municipal sports club hosts shared training bringing together able-bodied athletes and individuals with physical or mental disabilities. Using specialized sports wheelchairs or guided by trained partners, participants compete in mixed team wheelchair basketball, swimming, and track.\n\nThis inclusive athletic practice breaks down disability prejudice while fostering self-improvement and social integration through team sports.",
      "qEn": "Major social objective of inclusive adapted sports sessions:",
      "optEn": [
        "Separating athletes strictly according to physical capabilities",
        "Dismantling disability prejudice and fostering social integration",
        "Forcing participants to enter professional Olympic competitions",
        "Removing adapted sports gear across municipal facilities"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 19,
      "level": "B1",
      "docType": "Article sur la préservation du patrimoine horloger",
      "text": "ARTISANAT DE PRÉCISION — REVUE DE L'HORLOGERIE TRADITIONNELLE : LA RESTAURATION DES HORLOGES MONUMENTALES.\n\nDes maîtres horlogers spécialisés restaurent les mécanismes complexes des horloges de clochers et de beffrois datant du XIXe siècle. En démontant rouage par rouage, en nettoyant les roulements en bronze et en taillant des engrenages de remplacement en acier, ces artisans redonnent la parole aux géantes du temps.\n\nCe travail d'une précision millimétrique préserve un patrimoine mécanique exceptionnel et permet aux cloches de continuer à rythmer la vie quotidienne des habitants des villes et villages.",
      "q": "Action effectuée par les maîtres horlogers pour réparer les horloges monumentales :",
      "opt": [
        "Remplacer tous les mécanismes par des horloges digitales à piles",
        "Fermer les clochers et arrêter définitivement la sonnerie des cloches",
        "Démonter et fabriquer des engrenages de remplacement sur mesure",
        "Vendre les rouages anciens à des antiquaires étrangers"
      ],
      "ans": 2,
      "passEn": "PRECISION CRAFTS — TRADITIONAL HOROLOGY REVIEW: RESTORING MONUMENTAL TOWER CLOCKS.\n\nMaster horologists restore complex 19th-century church tower and belfry clock mechanisms. Disassembling gear by gear, cleaning bronze bearings, and machining custom replacement steel gears, artisans bring mechanical giants back to life.\n\nThis high-precision work preserves mechanical heritage, enabling bells to keep marking daily life for town residents.",
      "qEn": "Action performed by master horologists to repair monumental tower clocks:",
      "optEn": [
        "Replacing all gear mechanisms with battery digital clocks",
        "Closing belfries permanently and silencing bell ringing",
        "Disassembling and machining custom replacement gears",
        "Selling antique gear parts to foreign antique dealers"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 20,
      "level": "B1",
      "docType": "Article sur l'écologie ménagère",
      "text": "VIE QUOTIDIENNE — BULLETIN DES PRODUITS NATURELS : LA FABRICATION ARTISANALE DES PRODUITS MÉNAGERS MAISON.\n\nPour éliminer les substances chimiques toxiques des produits d'entretien industriels, de plus en plus de ménages fabriquent leurs propres nettoyants à partir d'ingrédients naturels simples : vinaigre blanc, bicarbonate de soude, savon de Marseille et huiles essentielles.\n\nCes recettes écologiques économiques permettent de nettoyer efficacement la maison sans polluer l'air intérieur ni rejeter de détergents polluants dans les eaux usées, tout en réduisant considérablement la quantité d'emballages plastiques jetés.",
      "q": "Avantage sanitaire et environnemental des produits ménagers faits maison :",
      "opt": [
        "Leur coût de fabrication beaucoup plus élevé que les produits de marque",
        "La pollution accrue des eaux de lavage par rapport aux détergents",
        "L'obligation d'acheter des gants spéciaux jetables pour faire le ménage",
        "La suppression des produits chimiques toxiques et la réduction du plastique"
      ],
      "ans": 3,
      "passEn": "DAILY LIFE — NATURAL PRODUCTS BULLETIN: DIY NATURAL HOME CLEANING PRODUCTS.\n\nEliminating toxic chemicals found in commercial cleaners, households make personal cleaning solutions using simple natural ingredients: white vinegar, baking soda, Marseille soap, and essential oils.\n\nThese economical eco-friendly recipes clean effectively without polluting indoor air or discharging toxic detergents into wastewater, while drastically cutting plastic container waste.",
      "qEn": "Health and environmental advantage of DIY natural home cleaning products:",
      "optEn": [
        "Manufacturing costs significantly higher than commercial brands",
        "Increased wastewater pollution compared to commercial detergents",
        "Mandatory requirements to buy disposable plastic gloves for cleaning",
        "Eliminating toxic chemicals and reducing plastic packaging waste"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 21,
      "level": "B1",
      "docType": "Article sur le covoiturage spontané",
      "text": "MOBILITÉ RURALE — BULLETIN DES TRANSPORTS CITOYENS : LES ARRÊTS DE COVOITURAGE SPONTANÉ EN ZONE RURALE.\n\nPour désenclaver les villages isolés dépourvus de lignes de bus régulières, la communauté de communes installe des panneaux d'arrêt de 'covoiturage spontané' aux sorties des bourgs. Les habitants souhaitant se rendre en ville s'y postent muni d'un panneau indiquant leur destination, et les automobilistes de passage s'arrêtent pour les prendre gratuitement au passage.\n\nCe système de solidarité rurale basé sur la confiance mutuelle crée de la convivialité entre voisins tout en réduisant le nombre de voitures en circulation.",
      "q": "Principe de fonctionnement du covoiturage spontané en zone rurale :",
      "opt": [
        "Attendre à un arrêt équipé avec un panneau de destination pour un trajet gratuit",
        "Payer un chauffeur professionnel via une application payante chère",
        "Réserver son trajet trois semaines à l'avance auprès de la mairie",
        "Attendre le passage du train de campagne deux fois par jour"
      ],
      "ans": 0,
      "passEn": "RURAL MOBILITY — CITIZEN TRANSIT BULLETIN: SPONTANEOUS CARPOOL STOPS IN RURAL AREAS.\n\nConnecting isolated villages lacking regular bus routes, rural districts install 'spontaneous carpool' signposted stops at village exits. Residents needing rides stand with signs showing destinations, and passing drivers stop to offer free rides.\n\nThis rural solidarity system built on mutual trust fosters neighbor connection while reducing cars on roads.",
      "qEn": "Operational principle behind spontaneous rural carpool stops:",
      "optEn": [
        "Waiting at signposted stops with destination signs for free rides",
        "Paying professional drivers via expensive booking apps",
        "Booking rides three weeks in advance through town hall",
        "Waiting for rural trains arriving twice daily"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 22,
      "level": "B1",
      "docType": "Article sur le recyclage des métaux",
      "text": "ÉCONOMIE CIRCULAIRE — BULLETIN DE LA MÉTALLURGIE RECYCLÉE : LA VALORISATION DE L'ALUMINIUM DES CANETTES.\n\nL'aluminium présent dans les canettes de boisson usagées présente la propriété remarquable d'être recyclable à l'infini sans aucune perte de ses qualités mécaniques. En recyclant les canettes collectées dans les bacs de tri au lieu d'extraire de la bauxite minérale, l'industrie métallurgique économise 95 % de l'énergie nécessaire à la production d'aluminium neuf.\n\nCette filière de recyclage performante évite le rejet de millions de tonnes de CO2 dans l'atmosphère tout en préservant les ressources minières de la planète.",
      "q": "Économie d'énergie réalisée en recyclant l'aluminium par rapport à sa fabrication neuve :",
      "opt": [
        "Une économie d'énergie minimale de 5 % seulement",
        "Une économie d'énergie de 95 % par rapport à l'extraction neuve",
        "Une surconsommation d'électricité trois fois supérieure",
        "Aucune économie d'énergie mesurable dans les usines"
      ],
      "ans": 1,
      "passEn": "CIRCULAR ECONOMY — RECYCLED METALS BULLETIN: RECOVERING ALUMINUM BEVERAGE CANS.\n\nAluminum in used beverage cans boasts the remarkable property of being infinitely recyclable with zero loss of mechanical quality. Recycling collected cans instead of mining bauxite ore saves 95% of energy needed for virgin aluminum production.\n\nThis efficient recycling process prevents millions of tons of CO2 emissions while preserving global mineral resources.",
      "qEn": "Energy savings achieved by recycling aluminum versus virgin mining production:",
      "optEn": [
        "Minimal energy savings amounting to only 5%",
        "95% energy savings compared to virgin bauxite extraction",
        "Three-fold increase in electrical power consumption",
        "No measurable energy savings achieved across recycling mills"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 23,
      "level": "B2",
      "docType": "Analyse sur la sobriété foncière",
      "text": "AMÉNAGEMENT URBAIN — REVUE DU CADRE DE VIE : LA DENSULATION DOUCE ET LA SURÉLÉVATION DES IMMEUBLES D'HABITATION.\n\nAfin de créer de nouveaux logements abordables en centre-ville sans détruire les espaces verts urbains ni s'étendre sur les terres agricoles périphériques, les architectes privilégient la 'densification douce'. Cette stratégie consiste à surélever les immeubles existants de deux à trois étages en utilisant des structures légères en bois préfabriqué.\n\nCette méthode de construction rapide préserve l'emprise au sol des bâtiments tout en finançant la rénovation énergétique globale de l'immeuble d'origine grâce à la vente des nouveaux appartements créés sur le toit.",
      "q": "Avantage de la surélévation en bois des immeubles existants pour la ville :",
      "opt": [
        "Démolir les immeubles anciens pour construire des tours en béton",
        "Obliger les résidents du dernier étage à déménager définitivement",
        "Créer des logements neufs sans artificialiser de nouveaux sols en étendant la ville",
        "Augmenter les factures de chauffage de tous les locataires"
      ],
      "ans": 2,
      "passEn": "URBAN PLANNING — LIVING ENVIRONMENT REVIEW: GENTLE DENSITY AND BUILDING ROOFTOP EXTENSIONS.\n\nCreating affordable downtown housing without destroying urban parks or encroaching on rural farmland, architects favor 'gentle densification'. This strategy adds 2 to 3 timber-framed stories atop existing buildings.\n\nThis rapid building method preserves ground footprints while funding overall energy retrofits for original buildings through sales of new rooftop units.",
      "qEn": "Advantage of adding timber rooftop extensions to existing downtown buildings:",
      "optEn": [
        "Demolishing old buildings to construct concrete towers",
        "Forcing top-floor residents to relocate permanently",
        "Creating new homes without sealing new ground via urban sprawl",
        "Increasing heating bills for all building tenants"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 24,
      "level": "B2",
      "docType": "Rapport sur l'économie de la réutilisation",
      "text": "ÉCONOMIE INDUSTRIELLE — BULLETIN DU RÉEMPLOI MATÉRIEL : LES MATÉRIAUTHÈQUES POUR LE BÂTIMENT ET LES CHANTIERS.\n\nLe secteur du bâtiment génère plus de 40 millions de tonnes de déchets de chantier par an, constitués en grande partie de matériaux neufs inutilisés ou de composants en parfait état issus de déconstructions (portes, fenêtres, parquets, sanitaires). Pour éviter le gaspillage de ces ressources, des 'matériauthèques' solidaire collectent, nettoient et mettent en vente ces matériaux à bas prix auprès des professionnels et des particuliers.\n\nCe réemploi direct réduit l'empreinte carbone des chantiers tout en rendant les travaux de rénovation thermique accessibles aux ménages modestes.",
      "q": "Rôle essentiel des matériauthèques solidaire dans le secteur du bâtiment :",
      "opt": [
        "Incinérer les matériaux neufs pour fabriquer de l'électricité",
        "Interdire aux particuliers de faire des travaux de rénovation chez eux",
        "Obliger les constructeurs à utiliser uniquement des matériaux importés",
        "Collecter et revendre à bas prix des matériaux de chantier réutilisables"
      ],
      "ans": 3,
      "passEn": "INDUSTRIAL ECONOMICS — REUSE BULLETIN: CONSTRUCTION MATERIAL BANKS AND JOB SITES.\n\nConstruction produces over 40 million tons of job site waste yearly, much of it unused new materials or sound salvaged components (doors, windows, flooring, fixtures). Preventing resource waste, non-profit 'building material banks' salvage, clean, and resell materials affordably.\n\nDirect material reuse cuts job site carbon footprints while making home retrofits affordable for low-income families.",
      "qEn": "Essential role of non-profit building material banks in construction:",
      "optEn": [
        "Incinerating brand-new materials to generate electricity",
        "Prohibiting homeowners from renovating personal residences",
        "Forcing builders to use imported materials exclusively",
        "Salvaging and reselling reusable building materials affordably"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 25,
      "level": "B2",
      "docType": "Analyse sur la protection de la ressource en eau",
      "text": "HYDROLOGIE ET ENVIRONNEMENT — BULLETIN DE LA GESTION DE L'EAU : LA RESTAURATION DES ZONES HUMIDES ET DES MARÉCAGES.\n\nLes zones humides (marais, tourbières, prairies inondables) ont longtemps été asséchées pour l'extension de l'agriculture intensive et de l'urbanisation. Or, ces écosystèmes jouent un rôle irremplaçable 'd'éponges naturelles' : ils absorbent l'excès d'eau lors des crues hivernales pour prévenir les inondations et restituent progressivement cette eau en période de sécheresse estivale.\n\nLa restauration écologique de ces réservoirs naturels purifie également l'eau par filtration biologique tout en abritant un tiers des espèces animales et végétales menacées du territoire.",
      "q": "Fonction essentielle 'd'éponge naturelle' assurée par les zones humides restaurées :",
      "opt": [
        "Absorber les crues en hiver et restituer l'eau en période de sécheresse",
        "Assécher définitivement toutes les nappes phréatiques de la région",
        "Multiplier les risques d'inondation violente dans les villes",
        "Empêcher la végétation et les animaux sauvages de vivre"
      ],
      "ans": 0,
      "passEn": "HYDROLOGY AND ENVIRONMENT — WATER MANAGEMENT BULLETIN: RESTORING WETLANDS AND MARSHES.\n\nWetlands (marshes, peat bogs, floodplains) were long drained for intensive farming and urban development. Yet these ecosystems act as irreplaceable 'natural sponges': absorbing floodwaters in winter to prevent flooding and releasing water during summer droughts.\n\nEcologically restoring these natural reservoirs also purifies water through bio-filtration while sheltering a third of threatened native species.",
      "qEn": "Essential 'natural sponge' function delivered by restored wetlands:",
      "optEn": [
        "Absorbing winter floods and releasing water during summer droughts",
        "Draining all regional aquifers permanently dry",
        "Increasing violent flooding risks across urban cities",
        "Preventing wild animals and flora from thriving"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 26,
      "level": "B2",
      "docType": "Rapport sur la mobilité douce",
      "text": "TRANSPORTS ET CITÉ — BULLETIN DES DÉPLACEMENTS ACTIFS : LES VOIES VERTE ET VÉLOROUTES DE LONGUE DISTANCE.\n\nLe développement de réseaux de véloroutes et de voies vertes réservées aux déplacements non motorisés (vélos, piétons, rollers) transforme la mobilité touristique et quotidienne dans les territoires ruraux et périurbains. Aménagées le long des anciens chemins de halage ou des voies ferrées désaffectées, ces pistes sécurisées permettent de se déplacer en toute sécurité à l'écart du trafic automobile.\n\nOutre l'engouement pour le tourisme à vélo écoresponsable, ces infrastructures sont largement adoptées par les résidents locaux pour effectuer leurs trajets quotidiens domicile-travail.",
      "q": "Atout majeur des voies vertes aménagées le long des anciennes voies ferrées :",
      "opt": [
        "Permettre aux voitures de rouler très vite à l'écart des villes",
        "Offrir des itinéraires sécurisés séparés du trafic automobile pour le quotidien et le tourisme",
        "Obliger les cyclistes à payer une taxe de passage sur les pistes",
        "Interdire aux habitants de marcher à pied sur les chemins"
      ],
      "ans": 1,
      "passEn": "TRANSIT AND CITY — ACTIVE TRAVEL BULLETIN: LONG-DISTANCE GREENWAYS AND BIKEWAYS.\n\nExpanding bikeways and greenways reserved for non-motorized travel (bikes, pedestrians, skates) transforms daily and tourist travel in rural areas. Built along former canal towpaths or disused rail lines, protected paths allow safe travel away from car traffic.\n\nBeyond boosting eco-friendly cycle tourism, these routes are widely adopted by local residents for daily work commutes.",
      "qEn": "Major asset of greenway paths built along former railway corridors:",
      "optEn": [
        "Allowing cars to drive fast away from urban centers",
        "Offering safe paths separated from car traffic for daily commutes and tourism",
        "Forcing cyclists to pay path usage toll fees",
        "Prohibiting local residents from walking along paths"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 27,
      "level": "B2",
      "docType": "Analyse sur la préservation du ciel nocturne",
      "text": "ÉCOLOGIE DE LA NUIT — BULLETIN DES RÉSERVES DE CIEL ÉTOILÉ : L'OBTENTION DU LABEL 'RÉSERVE DE CIEL ÉTOILÉ'.\n\nPour préserver l'obscurité naturelle et protéger les écosystèmes nocturnes, plusieurs parcs naturels nationaux obtiennent le label international de 'Réserve Internationale de Ciel Étoilé' (RICE). Cette distinction récompense les territoires qui éteignent l'éclairage public inutile la nuit, remplacent les lampadaires polluants par des LED ambrées dirigées vers le sol et sensibilisent les habitants.\n\nCette préservation de la nuit noire bénéficie directement aux populations d'insectes et de chauves-souris tout en développant un astrotourisme scientifique et contemplatif très créateur d'emplois locaux.",
      "q": "Bénéfice économique direct découlant de la préservation de la nuit noire dans les parcs :",
      "opt": [
        "La hausse des ventes d'électricité pour éclairer les monuments",
        "L'obligation pour les touristes de dormir pendant la journée",
        "Le développement de l'astrotourisme scientifique et contemplatif local",
        "La fermeture de tous les hôtels et restaurants du territoire"
      ],
      "ans": 2,
      "passEn": "NIGHT ECOLOGY — STARRY SKY RESERVES BULLETIN: SECURING STARRY SKY RESERVE LABELS.\n\nPreserving natural darkness and nocturnal ecosystems, several national parks achieved International Dark Sky Reserve status. This designation rewards regions shutting off unnecessary public lighting, replacing polluting streetlights with amber downward LEDs, and educating residents.\n\nPreserving dark nights directly aids insect and bat populations while driving scientific astro-tourism that creates local jobs.",
      "qEn": "Direct economic benefit arising from dark night preservation inside parks:",
      "optEn": [
        "Surging electricity sales to illuminate monuments all night",
        "Mandatory requirements for tourists to sleep during day hours",
        "Growth of scientific and contemplative local astro-tourism",
        "Closing all local hotels and restaurants across the territory"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 28,
      "level": "B2",
      "docType": "Rapport sur la santé et l'exposition au bruit",
      "text": "SANTÉ PUBLIQUE — BULLETIN D'ÉVALUATION ACOUSTIQUE : L'IMPACT DU BRUIT ROUTIER SUR LE SOMMEIL ET LE CŒUR.\n\nL'exposition chronique au bruit de la circulation automobile supérieure à 55 décibels la nuit perturbe gravement l'architecture du sommeil sans que les personnes endormies ne s'en rendent compte consciemment. Cette pollution sonore invisible déclenche la sécrétion continue d'hormones de stress (cortisol, adrénaline), augmentant de 20 % les risques d'accident vasculaire cérébral et de crise cardiaque.\n\nPour protéger la santé des riverains, les autorités étendent l'installation de murs anti-bruit végétalisés, posent des enrobés phoniques réducteurs de bruit sur les chaussées et abaissent la vitesse maximale autorisée la nuit.",
      "q": "Conséquence sanitaire grave de la pollution sonore routière nocturne continue :",
      "opt": [
        "Une amélioration de la qualité du sommeil profond",
        "L'obligation de porter des boules Quies pour travailler le jour",
        "La baisse immédiate du taux de cholestérol dans le sang",
        "La sécrétion d'hormones de stress augmentant les risques cardiovasculaires"
      ],
      "ans": 3,
      "passEn": "PUBLIC HEALTH — ACOUSTIC EVALUATION BULLETIN: ROAD NOISE IMPACTS ON SLEEP AND HEART HEALTH.\n\nChronic night exposure to traffic noise above 55 decibels severely disrupts sleep architecture without sleeping individuals consciously realizing it. This invisible noise pollution triggers continuous stress hormone release (cortisol), raising stroke and heart attack risks by 20%.\n\nProtecting resident health, authorities install green noise barrier walls, lay sound-dampening asphalt, and lower night speed limits.",
      "qEn": "Severe health consequence of continuous nocturnal road traffic noise pollution:",
      "optEn": [
        "Improved deep sleep quality during nighttime hours",
        "Mandatory requirements to wear earplugs during daytime work",
        "Immediate reductions in blood cholesterol levels",
        "Stress hormone release increasing cardiovascular disease risks"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 29,
      "level": "B2",
      "docType": "Analyse sur la gouvernance alimentaire",
      "text": "POLITIQUE ALIMENTAIRE — CAHIERS DE LA SOUVERAINETÉ LOCALE : LES PROJETS ALIMENTAIRES TERRITORIAUX (PAT).\n\nLes Projets Alimentaires Territoriaux (PAT) réunissent agriculteurs, cantines scolaires, transformateurs locaux et élus pour réorganiser l'approvisionnement alimentaire à l'échelle d'un bassin de vie. L'objectif consiste à augmenter massivement la part des produits bio et locaux dans la restauration collective (écoles, hôpitaux, maisons de retraite) tout en garantissant des débouchés stables aux producteurs régionaux.\n\nCette relocalisation de l'alimentation réduit la dépendance aux flux logistiques mondialisés et améliore la santé des convives tout en renforçant la souveraineté alimentaire des territoires.",
      "q": "Objectif central des Projets Alimentaires Territoriaux (PAT) à l'échelle locale :",
      "opt": [
        "Augmenter la part de produits bio et locaux dans la restauration collective",
        "Importer l'intégralité des repas des cantines depuis l'étranger",
        "Interdire aux agriculteurs régionaux de vendre leurs produits aux cantines",
        "Fermer les cantines scolaires pour obliger les enfants à rentrer chez eux"
      ],
      "ans": 0,
      "passEn": "FOOD GOVERNANCE — LOCAL SOVEREIGNTY PAPERS: TERRITORIAL FOOD PROJECTS (PAT).\n\nTerritorial Food Projects bring together farmers, school cafeterias, local processors, and elected officials to restructure food supply chains locally. The goal is to dramatically increase organic and local produce shares in public catering (schools, hospitals, senior homes) while securing stable markets for regional farmers.\n\nRelocalizing food reduces vulnerability to global logistics spikes and improves diner health while strengthening regional food sovereignty.",
      "qEn": "Central objective of local Territorial Food Projects across communities:",
      "optEn": [
        "Boosting organic and local produce shares in public catering",
        "Importing all cafeteria meals from overseas countries",
        "Prohibiting regional farmers from selling produce to cafeterias",
        "Closing school cafeterias forcing children to eat at home"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 30,
      "level": "C1",
      "docType": "Éditorial de philosophie du langage",
      "text": "PHILOSOPHIE DU LANGAGE — TRIBUNE DE LA PENSÉE CRITIQUE : LA STANDARDISATION LEXICALE ET LA PERTE DE NUANCE DANS LE DISCOURS PUBLICS.\n\nL'invasion progressive de la communication publique et des échanges institutionnels par un jargon managérial stéréotypé — composé de mots-valises à la mode, d'acronymes technocratiques et d'eufémismes lénifiants — opère un appauvrissement insidieux de la pensée conceptuelle. En réduisant la complexité des réalités sociales à des slogans simplificateurs conçus pour l'adhésion immédiate, ce prêt-à-penser verbal prive les citoyens des outils lexicaux indispensables pour exprimer le doute, la nuance et la contradiction.\n\nCet appauvrissement linguistique étouffe l'esprit critique et infantilise le débat démocratique. Lorsque la langue naturelle est amputée de sa charge subversive, de son ambiguïté poétique et de sa mémoire historique, la société perd la capacité de concevoir des alternatives au modèle dominant. Défendre la pluralité et la précision de la langue vivante constitue ainsi un devoir civique fondamental pour préserver l'autonomie de la pensée.",
      "q": "Thèse centrale développée par l'auteur sur les effets du jargon managérial stéréotypé :",
      "opt": [
        "Il enrichit la langue en permettant de communiquer plus rapidement",
        "Il appauvrit la pensée critique et prive les citoyens de nuances conceptuelles",
        "Il garantit l'égalité parfaite entre tous les interlocuteurs",
        "Il permet de résoudre automatiquement tous les conflits sociaux"
      ],
      "ans": 1,
      "passEn": "LANGUAGE PHILOSOPHY — CRITICAL THOUGHT ESSAY: LEXICAL STANDARDIZATION AND NUANCE LOSS IN PUBLIC DISCOURSE.\n\nInfecting public communication with stereotyped corporate jargon—trendy buzzwords, technocratic acronyms, soothing euphemisms—insidiously impoverishes conceptual thought. Reducing complex social realities to simplistic slogans crafted for instant buy-in, corporate newspeak deprives citizens of lexical tools needed to express doubt, nuance, and contradiction.\n\nThis linguistic impoverishment stifles critical thought and infantilizes democratic debate. Stripping natural language of subversive depth, poetic ambiguity, and history, society loses capacities to imagine alternatives to dominant models. Defending living language precision represents a fundamental civic duty to preserve intellectual autonomy.",
      "qEn": "Central thesis defended by the author regarding stereotyped corporate jargon effects:",
      "optEn": [
        "Enriches language by allowing significantly faster communication",
        "Impoverishes critical thought and deprives citizens of conceptual nuance",
        "Guarantees absolute equality among all speaking participants",
        "Automatically resolves all underlying social conflicts in society"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 31,
      "level": "C1",
      "docType": "Essai d'éthique de la recherche",
      "text": "ÉTHIQUE DES SCIENCES — CAHIERS DE LA RECHERCHE RESPONSABLE : LA CONFISCATION DU SAVOIR SCIENTIFIQUE PAR LE BREVETAGE DU VIVANT.\n\nLa tendance croissante des grands groupes de la biotechnologie et de l'agrochimie à déposer des brevets exclusifs sur des séquences génétiques de plantes, de bactéries ou d'organismes vivants opère une privatisation inadmissible du patrimoine génétique mondial. En s'appropriant des découvertes scientifiques souvent issues de la recherche publique ou de savoirs traditionnels séculaires, ces firmes soumettent le vivant à la logique stricte du profit marchand et du monopole commercial.\n\nCette marchandisation du vivant menace la sécurité alimentaire mondiale et la liberté de la recherche. En interdisant aux agriculteurs de resemé leurs propres récoltes et en bloquant le travail des chercheurs indépendants par des menaces de poursuites judiciaires, le système du brevetage exclusif étouffe l'innovation ouverte. Le vivant, ressource commune de l'humanité, doit être préservé de l'appropriation financière privée.",
      "q": "Menace majeure découlant du brevetage exclusif des ressources génétiques du vivant :",
      "opt": [
        "L'augmentation de la gratuité des semences pour tous les agriculteurs",
        "L'obligation pour les scientifiques de publier leurs travaux dans les journaux",
        "La privatisation du patrimoine commun du vivant et le blocage de la recherche indépendante",
        "La fermeture définitive de toutes les entreprises de biotechnologie"
      ],
      "ans": 2,
      "passEn": "SCIENCE ETHICS — RESPONSIBLE RESEARCH PAPERS: CONFISCATING SCIENTIFIC KNOWLEDGE VIA PATENTING LIFE.\n\nBiotech and agrochemical conglomerates filing exclusive patents on plant, bacterial, or living genetic sequences works an unacceptable privatization of global genetic heritage. Appropriating scientific discoveries derived from public research or traditional knowledge, corporations subject life to strict profit logic and commercial monopoly.\n\nPatenting life threatens global food security and research freedom. Prohibiting farmers from saving harvested seeds and blocking independent researchers with lawsuit threats, exclusive patent systems stifle open innovation. Life, humanity's shared commons, must be shielded from private financial appropriation.",
      "qEn": "Major threat arising from exclusive patenting of living genetic resources:",
      "optEn": [
        "Increasing free seed availability for all regional farmers",
        "Mandating scientists to publish research findings inside newspapers",
        "Privatizing life's shared heritage and blocking independent research",
        "Permanent closure of all biotechnology commercial firms"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 32,
      "level": "C1",
      "docType": "Analyse de philosophie sociale",
      "text": "SOCIOLOGIE DU TRAVAIL — REVUE DES DYNAMIQUES PROFESSIONNELLES : L'INJONCTION À L'AUTONOMIE ET LA NOUVELLE ALIENATION DU SALARIÉ DANS LES ENTREPRISES MODERNES EN MUTATION.\n\nLe discours managérial contemporain fait la promotion constante de l'autonomie, de la flexibilité et du 'leadership individuel' des salariés au sein des organisations horizontales. Toutefois, des sociologues du travail mettent en lumière le caractère paradoxal et trompeur de cette liberté affichée. En réalité, cette autonomie accordée s'accompagne d'un contrôle à distance renforcé par des objectifs chiffrés toujours plus ambitieux et des contrôles de performance permanents.\n\nCette fausse autonomie transforme le salarié en son propre exploiteur au quotidien. En intériorisant les contraintes de rentabilité de l'entreprise sous couvert de liberté d'organisation, l'individu s'impose une surcharge de travail et un stress permanent qui conduisent à l'épuisement professionnel. L'injonction à l'autonomie masque ainsi une forme d'aliénation renouvelée particulièrement perverse.",
      "q": "Ce que dissimule la 'fausse autonomie' promue par le discours managérial moderne :",
      "opt": [
        "Une diminution réelle du temps de travail et une hausse des salaires",
        "La suppression de tous les objectifs chiffrés et du stress au bureau",
        "L'obligation de prendre six mois de vacances payées par an",
        "Un contrôle à distance renforcé conduisant à l'auto-exploitation et au burn-out"
      ],
      "ans": 3,
      "passEn": "SOCIAL PHILOSOPHY — PROFESSIONAL DYNAMICS REVIEW: AUTONOMY MANDATES AND NEW WORKER ALIENATION.\n\nModern management rhetoric constantly promotes employee autonomy, flexibility, and 'personal leadership' inside flat organizations. However, work sociologists expose the paradoxical, misleading nature of this advertised freedom. In reality, granted autonomy is paired with heightened remote surveillance through ambitious targets and constant performance metrics.\n\nThis false autonomy turns workers into their own exploiters. Internalizing corporate profit constraints under self-management disguises, individuals inflict excessive workloads and constant stress leading to burnout. Autonomy mandates mask pernicious renewed alienation.",
      "qEn": "What the 'false autonomy' promoted by modern corporate management hides:",
      "optEn": [
        "Genuine work hour reductions and higher employee salary bonuses",
        "Complete elimination of numerical targets and office stress",
        "Mandatory requirements to take six months of paid vacation yearly",
        "Heightened remote surveillance driving self-exploitation and burnout"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 33,
      "level": "C1",
      "docType": "Essai d'écologie humaine",
      "text": "ÉCOLOGIE HUMAINE — CAHIERS DU PASEO URBAIN : LA PERTE DU CONTACT AVEC LA NATURE ET LE SYNDROME DU MANQUE DE NATURE EN MILIEU URBAIN DENSE ET CONFINÉ CONTEMPORAIN.\n\nL'urbanisation massive et la sédentarité numérique confinent les populations urbaines contemporaines dans des espaces clos artificiels, coupés du rythme des saisons et du monde vivant. Des chercheurs en santé environnementale identifient les conséquences physiologiques et psychologiques gravissimes de cet éloignement : augmentation des troubles de l'attention chez les enfants, hausse de l'anxiété chronique et affaiblissement du système immunitaire.\n\nCe 'syndrome de manque de nature' met en évidence la dépendance vitale de l'être humain envers le monde vivant. Réintroduire des forêts urbaines denses, des parcs sauvages et imposer des sorties régulières en pleine nature dès l'école primaire constituent des mesures d'urgence sanitaire indispensables pour restaurer durablement l'équilibre physique et psychique des citoyens.",
      "q": "Conséquence sanitaire majeure de l'éloignement de la nature chez les citadins :",
      "opt": [
        "Une hausse des troubles anxieux, de l'inattention et de l'affaiblissement immunitaire",
        "Une baisse de l'anxiété et une amélioration de la concentration",
        "L'obligation de vivre à la campagne toute l'année",
        "La disparition de toutes les maladies physiques chez les enfants"
      ],
      "ans": 0,
      "passEn": "HUMAN ECOLOGY — URBAN SPACE PAPERS: LOSS OF NATURE CONTACT AND NATURE DEFICIT DISORDER.\n\nMass urbanization and digital sedentariness confine modern urban populations to artificial indoor spaces, detached from seasonal rhythms and the living world. Environmental health researchers identify physical and psychological impacts: surging child attention disorders, chronic anxiety, and weakened immune systems.\n\nThis 'nature deficit disorder' highlights human reliance on living ecosystems. Reintroducing dense urban forests and mandating regular school outdoor trips represent urgent public health measures to restore citizen wellbeing.",
      "qEn": "Major health consequence of urban residents' detachment from nature:",
      "optEn": [
        "Increased anxiety disorders, attention deficits, and weakened immune systems",
        "Reduced anxiety levels and improved mental concentration capacity",
        "Mandatory requirements to live in rural countryside year-round",
        "Complete elimination of all physical childhood illnesses"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 34,
      "level": "C1",
      "docType": "Analyse de philosophie de la culture",
      "text": "PHILOSOPHIE DU PATRIMOINE — CAHIERS DE LA MÉMOIRE CRITIQUE : LA SPECTACULARISATION DU PATRIMOINE ET LA MUSEIFICATION DES VILLES HISTORIQUES CONTEMPORAINES.\n\nLa transformation des centres historiques en musées à ciel ouvert réservés au tourisme de masse opère une muséification stérile du patrimoine architectural. En expulsant les habitants permanents, les commerces de proximité et la vie artisanale au profit de boutiques de souvenirs standardisées et de logements touristiques saisonniers, les politiques d'urbanisme patrimonial transforment la cité en un décor de théâtre figé.\n\nCette spectacularisation du passé détruit la dimension vivante de l'histoire locale et populaire. Privé de sa communauté d'habitants et de ses usages quotidiens, le patrimoine architectural se réduit à une coquille vide marchandisée. Préserver le patrimoine authentique exige de maintenir impérativement la vie sociale, les services publics et le logement populaire abordable et décent au cœur des pierres historiques.",
      "q": "Ce que dénonce l'auteur dans la 'muséification' des centres historiques :",
      "opt": [
        "L'augmentation du nombre de vrais musées d'art dans les villes",
        "La transformation du patrimoine en décor stérile expulsant la vie sociale locale",
        "L'obligation de démolir les monuments historiques pour reconstruire du neuf",
        "La gratuité totale de l'accès aux monuments pour les touristes"
      ],
      "ans": 1,
      "passEn": "HERITAGE PHILOSOPHY — CRITICAL MEMORY PAPERS: HERITAGE SPECTACULARIZATION AND CITY MUSEUMIFICATION.\n\nConverting historic city centers into open-air museums for mass tourism works a sterile museumification of architectural heritage. Expelling permanent residents, local shops, and artisan crafts for standardized souvenir stores and seasonal vacation rentals converts cities into frozen stage sets.\n\nThis past spectacularization destroys history's living dimension. Stripped of resident communities and daily utility, architectural heritage shrinks into commodified empty shells. Preserving authentic heritage demands maintaining social life, public services, and affordable housing within historic stones.",
      "qEn": "What the author denounces regarding the 'museumification' of historic city centers:",
      "optEn": [
        "Surging numbers of authentic fine art museums built inside cities",
        "Converting heritage into sterile stage sets expelling local social life",
        "Mandatory requirements to demolish historic monuments for new builds",
        "Complete free admission access to monuments for visiting tourists"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 35,
      "level": "C1",
      "docType": "Essai de sociologie des médias",
      "text": "SOCIOLOGIE DE L'INFORMATION — REVUE DE LA COMMUNICATION : LA DICTATURE DU CLIC ET L'ÉROSION DU JOURNALISME D'INVESTIGATION.\n\nLa dépendance économique des médias numériques envers les revenus publicitaires et la mesure d'audience en temps réel (taux de clic) opère une dégradation grave de l'exigence journalistique. En contraignant les rédactions à produire en permanence des contenus sensationnalistes, des titres accrocheurs et des polémiques superficielles calibrées pour générer du trafic immédiat, le modèle économique du web marginalise le journalisme d'investigation au long cours.\n\nCette course frénétique au clic affaiblit le rôle de contre-pouvoir de la presse. Privés du temps et des moyens financiers nécessaires pour mener des enquêtes approfondies sur les scandales financiers ou les dérives politiques, les journalistes se trouvent réduits à des commentateurs d'actualités éphémères. Financer un journalisme indépendant affranchi de la dictature de l'audience constitue un impératif démocratique majeur.",
      "q": "Conséquence majeure de la 'dictature du clic' sur la qualité du journalisme :",
      "opt": [
        "Une augmentation des moyens consacrés aux grandes enquêtes d'investigation",
        "L'obligation pour les citoyens de payer dix abonnements de presse différents",
        "La marginalisation du journalisme d'investigation au profit du sensationnalisme éphémère",
        "La fermeture définitive de tous les sites d'information sur Internet"
      ],
      "ans": 2,
      "passEn": "MEDIA SOCIOLOGY — COMMUNICATION REVIEW: CLICKBAIT DICTATORSHIP AND INVESTIGATIVE JOURNALISM EROSION.\n\nDigital media financial reliance on ad revenue and real-time click metrics severely degrades journalistic standards. Forcing newsrooms to churn out sensationalist content, clickbait headlines, and superficial outrage engineered for immediate traffic, web business models sideline long-form investigative reporting.\n\nThis frantic click race weakens press watchdogs. Lacking time and funding to investigate financial scandals or political corruption, journalists shrink into ephemeral news commentators. Funding independent journalism free from click metrics represents a crucial democratic imperative.",
      "qEn": "Major consequence of the 'clickbait dictatorship' on journalism quality:",
      "optEn": [
        "Increased funding allocated to major long-form investigative reporting",
        "Mandatory requirements for citizens to purchase ten newspaper subscriptions",
        "Marginalizing investigative journalism in favor of short-term sensationalism",
        "Permanent closure of all news media websites across the internet"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 36,
      "level": "C2",
      "docType": "Chronique philosophique sur le temps",
      "text": "PHILOSOPHIE DU TEMPS — ANNALES DE LA PENSÉE CONTEMPORAINE : LA CONFISCATION DU TEMPS DISPONIBLE PAR L'HYPER-SOLICITATION NUMÉRIQUE.\n\nL'invasion de la sphère intime et du temps libre par l'usage compulsif des écrans, des notifications de messagerie et des flux infinis de vidéos opère une colonisation inédite de la conscience humaine. En captant l'attention de l'individu dès le réveil jusqu'au coucher, le système technicien marchand détruit la possibilité de la vacance de l'esprit, de la rêverie créatrice et du temps improductif indispensable à la maturation de la pensée.\n\nCette confiscation du temps disponible appauvrit l'expérience existentielle. Soumis à une hyper-solicitation cognitive permanente qui fragmente la concentration et suscite une anxiété diffuse, le sujet contemporain perd la capacité de s'ennuyer — état pourtant fondamental où s'élabore le désir propre, la mémoire réflexive et la création artistique. Réhabiliter le droit au temps non marchand et à la déconnexion constitue une condition essentielle de l'émancipation individuelle.",
      "q": "Quelle thèse centrale l'auteur défend-il concernant l'hyper-sollicitation numérique ?",
      "opt": [
        "Elle augmente la capacité d'invention artistique et de création poétique",
        "Elle élimine totalement l'anxiété et le stress chez les utilisateurs",
        "Elle permet de travailler deux fois plus vite en dormant moins la nuit",
        "Elle colonise la conscience et détruit le temps improductif nécessaire à la maturation de la pensée"
      ],
      "ans": 3,
      "passEn": "TIME PHILOSOPHY — CONTEMPORARY THOUGHT ANNALS: CONFISCATING FREE TIME VIA DIGITAL HYPER-SOLICITATION.\n\nInvading private spheres and leisure through compulsive screen use, messaging alerts, and endless video feeds executes unprecedented human consciousness colonization. Capturing individual attention from waking to sleeping, commercial tech systems destroy possibilities for mental rest, creative daydreaming, and unproductive time vital for thought maturation.\n\nConfiscating free time impoverishes existential experience. Subject to constant cognitive hyper-solicitation fragmenting focus and fueling anxiety, modern subjects lose capacities to experience boredom—a foundational state where personal desire, memory, and artistic creation take root. Championing non-commercial time and disconnection rights is essential for personal freedom.",
      "qEn": "What central thesis does the author defend regarding digital hyper-solicitation?",
      "optEn": [
        "Increases artistic invention capacities and poetic creative output",
        "Completely eliminates human anxiety and stress among tech users",
        "Enables working twice as fast while sleeping significantly fewer hours",
        "Colonizes consciousness and destroys unproductive time vital for thought maturation"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 37,
      "level": "C2",
      "docType": "Essai d'épistémologie sociale",
      "text": "ÉPISTÉMOLOGIE SOCIALE — REVUE DE LA CRITIQUE DÉMOCRATIQUE : LA POLARISATION ALGORITHMIQUE ET L'ÉROSION DU SOCLE DE VÉRITÉ COMMUNE.\n\nL'organisation de la circulation de l'information sur les réseaux sociaux par des algorithmes de recommandation conçus pour maximiser l'engagement émotionnel produit une fragmentation sans précédent de l'espace public. En enfermant les utilisateurs dans des 'bulles de filtres' idéologiques et des chambres d'écho où ne s'affichent que des opinions confirmant leurs préjugés initiaux, les plateformes numériques détruisent la possibilité d'un débat contradictoire fondé sur des faits partagés.\n\nCette polarisation algorithmique menace les fondements de la démocratie. Lorsque des fractions de la population vivent dans des réalités informationnelles étanches nourries de théories du complot et de fausses nouvelles, la délibération citoyenne devient impossible. Restaurer un socle de vérité commune exige de réguler les algorithmes d'amplification de la haine et de réhabiliter des médias d'information de service public indépendants et rigoureux.",
      "q": "Danger majeur de l'enfermement dans les 'bulles de filtres' algorithmiques dénoncé par le texte :",
      "opt": [
        "La destruction d'un socle de vérité commune rendant la délibération démocratique impossible",
        "La hausse de la tolérance et du respect entre groupes politiques opposés",
        "L'obligation pour les citoyens d'utiliser le même réseau social",
        "La baisse du temps passé sur les écrans par l'ensemble de la population"
      ],
      "ans": 0,
      "passEn": "SOCIAL EPISTEMOLOGY — DEMOCRATIC CRITICISM REVIEW: ALGORITHMIC POLARIZATION AND COMMON TRUTH EROSION.\n\nStructuring news flow on social media via recommendation algorithms designed to maximize emotional engagement creates unprecedented public sphere fragmentation. Locking users inside ideological 'filter bubbles' and echo chambers showing only prejudice-confirming views, digital platforms destroy fact-based debate.\n\nAlgorithmic polarization threatens democratic foundations. When population segments live inside isolated information realities fed by conspiracy theories and fake news, citizen deliberation becomes impossible. Restoring shared truth foundations requires regulating hate-amplifying algorithms and funding independent public broadcasting.",
      "qEn": "Major danger of confinement inside algorithmic 'filter bubbles' denounced in the text:",
      "optEn": [
        "Destroying shared truth baselines rendering democratic deliberation impossible",
        "Surging tolerance and respect uniting opposing political factions",
        "Mandatory requirements for citizens to use a single social media network",
        "Drastic reductions in screen time across the general population"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 38,
      "level": "C2",
      "docType": "Réflexion d'anthropologie de la nature",
      "text": "ANTHROPOLOGIE DE LA NATURE — CAHIERS DU MONDE VIVANT : LA DECONSTRUCTION DU DUALISME NATURE/CULTURE ET LA RECONNAISSANCE DES ANIMAUX NON-HUMAINS.\n\nLa tradition philosophique occidentale s'est construite sur une séparation étanche entre l'être humain — seul sujet doué de raison, de langage et de culture — et le reste du monde vivant, réduit au statut d'objets mécaniques sans conscience au service des besoins humains. Cette conception anthropocentrique a légitimé l'exploitation industrielle de la nature, la destruction des habitats sauvages et l'élevage intensif des animaux réduits à des ressources marchandes.\n\nOr, les découvertes de l'éthologie et de la biologie contemporaines déconstruisent radicalement ce dualisme archaïque. En démontrant l'existence de formes de conscience, de sensibilité à la douleur, de cultures transmises et d'émotions complexes chez de nombreuses espèces animales, la science moderne nous oblige à repenser nos devoirs moraux. Sortir de la crise écologique exige d'élargir la communauté de la justice aux êtres non-humains et d'inventer de nouvelles formes de cohabitation respectueuses de l'altérité vivante.",
      "q": "Ce que la science moderne exige au sujet de notre rapport au monde vivant non-humain :",
      "opt": [
        "Poursuivre et intensifier l'exploitation industrielle des espèces animales",
        "Déconstruire le dualisme anthropocentrique et élargir la communauté de la justice aux non-humains",
        "Interdire toute recherche scientifique sur le comportement des animaux",
        "Considérer que les animaux sont des machines sans sensibilité à la douleur"
      ],
      "ans": 1,
      "passEn": "NATURE ANTHROPOLOGY — LIVING WORLD PAPERS: DECONSTRUCTING NATURE/CULTURE DUALISM AND ANIMAL RIGHTS.\n\nWestern philosophy built upon strict divisions separating humans—sole subjects possessing reason and language—from the living world, reduced to mindless resources serving human needs. This anthropocentric view legitimized industrial nature exploitation, habitat destruction, and factory farming.\n\nYet ethology and biology radically deconstruct this archaic dualism. Demonstrating consciousness, pain sentience, transmitted culture, and complex emotions in animals, modern science compels overhauling moral duties. Overcoming ecological crises requires expanding justice communities to non-humans and inventing respectful cohabitation.",
      "qEn": "What modern science demands regarding our relationship with the non-human living world:",
      "optEn": [
        "Continuing and intensifying industrial exploitation of animal species",
        "Deconstructing anthropocentric dualism and expanding justice communities to non-humans",
        "Prohibiting all scientific research on animal behavioral ethology",
        "Viewing animals as mindless machines lacking pain sentience"
      ]
    },
    {
      "paperNum": 10,
      "qNum": 39,
      "level": "C2",
      "docType": "Essai philosophique sur la mémoire et la justice",
      "text": "PHILOSOPHIE DE L'HISTOIRE — REVUE DES ÉTUDES HUMANISTES : LA RECONNAISSANCE DES PREJUDICES HISTORIQUES ET LE DEVOIR DE RÉPARATION.\n\nLe refus récurrent des nations dominantes d'affronter les Injustices majeures commises au cours de leur histoire coloniale ou industrielle — au nom d'un apaisement mémoriel artificiel ou de la sauvegarde de la cohésion nationale — constitue un obstacle majeur à la justice internationale. En occultant les traumatismes subis par les peuples dominés, les discriminations systémiques et les pillages de ressources, le récit national officiel entretient des blessures mémorielles qui empoisonnent le présent.\n\nOr, une paix démocratique durable ne peut s'édifier sur le déni de la vérité historique. L'accomplissement du véritable devoir de justice exige la reconnaissance lucide des fautes commises, la restitution des biens culturels spoliés et la mise en œuvre de réparations matérielles et symboliques envers les descendants des victimes. C'est uniquement à ce prix que les peuples peuvent bâtir des relations de confiance réciproque fondées sur le respect mutuel et l'égale dignité.",
      "q": "Condition fondamentale pour bâtir une paix et des relations durables entre les peuples :",
      "opt": [
        "Oublier le passé et interdire la restitution des biens culturels spoliés",
        "Forcer les victimes à signer des accords de silence sans compensation",
        "Affronter la vérité historique, reconnaître les fautes et mettre en œuvre des réparations",
        "Réécrire l'histoire pour célébrer uniquement les aspects glorieux de la colonisation"
      ],
      "ans": 2,
      "passEn": "HISTORY PHILOSOPHY — HUMANIST STUDIES REVIEW: RECOGNIZING HISTORIC INJUSTICES AND REPARATION DUTIES.\n\nDominant nations' refusal to confront historical injustices committed during colonial or industrial eras—in the name of artificial memory peace or national cohesion—represents a major barrier to international justice. Obscuring indigenous traumas, systemic discrimination, and resource plunder, official national myths sustain memory wounds poisoning the present.\n\nYet lasting democratic peace cannot rest on historical truth denial. Fulfilling true justice duties requires lucid fault acknowledgment, returning stolen cultural heritage, and implementing material/symbolic reparations for victim descendants. Only then can nations build mutual trust founded on equal dignity.",
      "qEn": "Fundamental condition for building lasting peace and trust among nations:",
      "optEn": [
        "Forgetting past history and prohibiting restitution of stolen cultural heritage",
        "Forcing victims to sign confidentiality agreements without compensation",
        "Confronting historical truth, acknowledging past faults, and implementing reparations",
        "Rewriting history to celebrate colonial conquest aspects exclusively"
      ]
    }
  ]
];

export function getReadingPaperItems(paperId: number): ReadingItem[] {
  const index = (paperId - 1) % AUTHENTIC_READING_MASTER_BANK.length;
  return AUTHENTIC_READING_MASTER_BANK[index] || AUTHENTIC_READING_MASTER_BANK[0];
}
