/**
 * 🇨🇦 Official TEF Canada Listening Master Bank (Paper 3 - 40 Questions)
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

export const TEF_PAPER_3_LISTENING_ITEMS: TefListeningItem[] = [
  {
    "id": "tef-p3-co-q01",
    "paperNumber": 3,
    "questionNumber": 1,
    "typology": "DESSINS",
    "level": "A1",
    "title": "Salon de coiffure — Coupe et brushing",
    "speakingRate": 0.94,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Cliente",
      "Coiffeur"
    ],
    "speakerPersonas": [
      {
        "role": "Cliente",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      },
      {
        "role": "Coiffeur",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Cliente : Bonjour monsieur, j'ai rendez-vous à 10 heures pour une coupe et un brushing.\nCoiffeur : Parfait madame, installez-vous au bac de lavage pour le shampoing, je m'occupe de vous tout de suite.",
    "audioEn": "Customer: Hello sir, I have an appointment at 10:00 for a haircut and blow-dry.\nHairdresser: Wonderful ma'am, please take a seat at the wash basin for the shampoo, I will take care of you right away.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Une cliente choisissant une paire de lunettes chez un opticien",
      "Dessin B : Un voyageur demandant son chemin à l'accueil d'un office de tourisme",
      "Dessin C : Une femme essayant un manteau dans une boutique de prêt-à-porter",
      "Dessin D : Une cliente installée devant le miroir d'un salon de coiffure"
    ],
    "optionsEn": [
      "Drawing A: A customer choosing a pair of eyeglasses at an optometrist's shop",
      "Drawing B: A traveler asking for directions at a tourist information desk",
      "Drawing C: A woman trying on a winter coat in a clothing boutique",
      "Drawing D: A customer seated in front of the mirror at a hair salon"
    ],
    "correctIndex": 3,
    "mainImage": "/illustrations/tef/tef_p3_q1_d.png",
    "optionImages": [
      "/illustrations/tef/tef_p3_q1_a.png",
      "/illustrations/tef/tef_p3_q1_b.png",
      "/illustrations/tef/tef_p3_q1_c.png",
      "/illustrations/tef/tef_p3_q1_d.png"
    ]
  },
  {
    "id": "tef-p3-co-q02",
    "paperNumber": 3,
    "questionNumber": 2,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Bureau de poste — Envoi d'un colis recommandé",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Usager",
      "Guichetière"
    ],
    "speakerPersonas": [
      {
        "role": "Usager",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      },
      {
        "role": "Guichetière",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Usager : Bonjour, je voudrais envoyer ce carton de livres en recommandé avec avis de réception pour Montréal.\nGuichetière : Très bien. Posez-le sur la balance s'il vous plaît... Il fait deux kilos trois cents. Remplissez ce bordereau vert avec l'adresse du destinataire.",
    "audioEn": "Patron: Hello, I would like to send this box of books by registered mail with return receipt to Montreal.\nPostal Clerk: Very well. Please place it on the scale... It weighs two point three kilograms. Fill out this green customs slip with the recipient's address.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un voyageur achetant un billet de train au guichet d'une gare ferroviaire",
      "Dessin B : Un usager déposant un colis sur la balance au guichet d'un bureau de poste",
      "Dessin C : Un client payant son plein d'essence à la caisse d'une station-service",
      "Dessin D : Une personne empruntant des revues à la banque de prêt d'une médiathèque"
    ],
    "optionsEn": [
      "Drawing A: A passenger buying a train ticket at a railway station ticket counter",
      "Drawing B: A customer placing a parcel on the scale at a post office counter",
      "Drawing C: A driver paying for petrol at an automotive service station register",
      "Drawing D: A person borrowing periodicals at the circulation desk of a public library"
    ],
    "correctIndex": 1,
    "mainImage": "/illustrations/tef/tef_p3_q2_b.png",
    "optionImages": [
      "/illustrations/tef/tef_p3_q2_a.png",
      "/illustrations/tef/tef_p3_q2_b.png",
      "/illustrations/tef/tef_p3_q2_c.png",
      "/illustrations/tef/tef_p3_q2_d.png"
    ]
  },
  {
    "id": "tef-p3-co-q03",
    "paperNumber": 3,
    "questionNumber": 3,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Magasin de chaussures — Essayage de bottes d'hiver",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Client",
      "Vendeuse"
    ],
    "speakerPersonas": [
      {
        "role": "Client",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Vendeuse",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "Client : Bonjour, est-ce que vous auriez ce modèle de bottes fourrées en pointure 42 ?\nVendeuse : Attendez, je vais vérifier dans notre réserve... Oui, il nous reste justement une paire en cuir noir. Asseyez-vous sur la banquette pour les essayer.",
    "audioEn": "Customer: Hello, do you happen to have this model of lined winter boots in size 42?\nSalesclerk: One moment, let me check in our stockroom... Yes, we have exactly one pair left in black leather. Please have a seat on the bench to try them on.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un client essayant des bottes assis sur la banquette d'un magasin de chaussures",
      "Dessin B : Un chef cuisinier dressant des assiettes devant les fourneaux d'un restaurant",
      "Dessin C : Un homme mesurant un cadre en bois dans un atelier d'ébénisterie",
      "Dessin D : Un client sélectionnant un flacon de parfum dans une boutique de cosmétiques"
    ],
    "optionsEn": [
      "Drawing A: A customer trying on boots while seated on a bench in a shoe store",
      "Drawing B: A chef plating dishes before the cooking stoves in a restaurant kitchen",
      "Drawing C: A craftsman measuring a wooden frame in a woodworking shop",
      "Drawing D: A customer selecting a fragrance bottle in a cosmetics perfumery"
    ],
    "correctIndex": 0,
    "mainImage": "/illustrations/tef/tef_p3_q3_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p3_q3_a.png",
      "/illustrations/tef/tef_p3_q3_b.png",
      "/illustrations/tef/tef_p3_q3_c.png",
      "/illustrations/tef/tef_p3_q3_d.png"
    ]
  },
  {
    "id": "tef-p3-co-q04",
    "paperNumber": 3,
    "questionNumber": 4,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Hôtel — Arrivée et remise de clé de chambre",
    "speakingRate": 0.96,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Voyageur",
      "Réceptionniste"
    ],
    "speakerPersonas": [
      {
        "role": "Voyageur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      },
      {
        "role": "Réceptionniste",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Voyageur : Bonsoir, j'ai une réservation pour deux nuits au nom de Moreau.\nRéceptionniste : Bonsoir monsieur Moreau. Voici votre carte magnétique pour la chambre 304 au troisième étage. L'ascenseur se trouve juste à votre gauche et le petit-déjeuner est servi dès 7 heures.",
    "audioEn": "Traveler: Good evening, I have a reservation for two nights under the name of Moreau.\nReceptionist: Good evening Mr. Moreau. Here is your keycard for room 304 on the third floor. The elevator is just to your left and breakfast is served starting at 7:00 AM.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un passager enregistrant ses bagages devant le tapis d'un aéroport",
      "Dessin B : Un étudiant réglant son inscription auprès du secrétariat d'un campus",
      "Dessin C : Un client recevant sa carte magnétique à la réception d'un hôtel",
      "Dessin D : Un lecteur présentant sa carte d'adhérent au portillon d'une bibliothèque"
    ],
    "optionsEn": [
      "Drawing A: A passenger checking luggage in front of an airport conveyor belt",
      "Drawing B: A student settling tuition at a university campus administration desk",
      "Drawing C: A hotel guest receiving his keycard at the reception front desk",
      "Drawing D: A reader scanning a membership card at a public library turnstile"
    ],
    "correctIndex": 2,
    "mainImage": "/illustrations/tef/tef_p3_q4_c.png",
    "optionImages": [
      "/illustrations/tef/tef_p3_q4_a.png",
      "/illustrations/tef/tef_p3_q4_b.png",
      "/illustrations/tef/tef_p3_q4_c.png",
      "/illustrations/tef/tef_p3_q4_d.png"
    ]
  },
  {
    "id": "tef-p3-co-q05",
    "paperNumber": 3,
    "questionNumber": 5,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Cabinet dentaire — Déplacement de rendez-vous médical",
    "speakingRate": 1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Secrétaire médicale"
    ],
    "speakerPersonas": [
      {
        "role": "Secrétaire",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Bonjour madame Vasseur, ici le secrétariat du docteur Belkacem. Le docteur a une urgence chirurgicale demain matin et doit décaler votre détartrage de 9 heures à 14 heures 30. Si cet horaire ne vous convient pas, merci de nous rappeler avant 18 heures pour convenir d'une autre date.",
    "audioEn": "Hello Mrs. Vasseur, this is Dr. Belkacem's clinic. The doctor has an urgent surgical procedure tomorrow morning and needs to reschedule your dental cleaning from 9:00 AM to 2:30 PM. If this time does not suit you, please call us back before 6:00 PM to arrange another date.",
    "questionFr": "Quel est le motif de cet appel téléphonique ?",
    "questionEn": "What is the reason for this telephone call?",
    "optionsFr": [
      "Confirmer l'annulation définitive du traitement dentaire en cours",
      "Proposer un changement d'horaire pour une consultation de soins",
      "Demander le règlement immédiat d'une facture d'intervention impayée",
      "Transmettre les résultats d'une radiographie pulmonaire par courrier"
    ],
    "optionsEn": [
      "Confirm the permanent cancellation of ongoing dental treatment",
      "Propose a schedule change for a care consultation appointment",
      "Request the immediate payment of an overdue treatment invoice",
      "Transmit the results of a chest X-ray examination by postal mail"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q06",
    "paperNumber": 3,
    "questionNumber": 6,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Agence de voyages — Modification d'horaire de vol charter",
    "speakingRate": 1.01,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Conseillère voyages"
    ],
    "speakerPersonas": [
      {
        "role": "Conseillère",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Bonjour monsieur Caron, ici l'agence Horizon Voyages. La compagnie aérienne nous signale que votre vol retour de Fort-de-France prévu dimanche à 18 heures partira finalement à 22 heures 15. Vous bénéficierez d'un bon de restauration utilisable dans tous les restaurants de l'aéroport. Vos cartes d'embarquement mises à jour sont disponibles sur votre espace client.",
    "audioEn": "Hello Mr. Caron, this is Horizon Travel Agency. The airline informed us that your return flight from Fort-de-France scheduled for Sunday at 6:00 PM will now depart at 10:15 PM. You will receive a meal voucher redeemable across all airport restaurants. Your updated boarding passes are available in your customer portal.",
    "questionFr": "Quelle information essentielle la conseillère communique-t-elle à son client ?",
    "questionEn": "What essential information does the travel agent convey to her client?",
    "optionsFr": [
      "La suppression de l'escale prévue et le changement de destination finale",
      "L'obligation de payer un supplément tarifaire pour les bagages en soute",
      "L'annulation totale du voyage en raison de conditions météo extrêmes",
      "Le départ différé d'un vol accompagné d'un dédommagement de restauration"
    ],
    "optionsEn": [
      "The elimination of the scheduled layover and a change of destination",
      "The requirement to pay an additional tariff surcharge for checked luggage",
      "The complete cancellation of the journey due to severe weather conditions",
      "The delayed departure of a flight accompanied by a complimentary meal voucher"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q07",
    "paperNumber": 3,
    "questionNumber": 7,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Supermarché — Animation culinaire et promotion éphémère",
    "speakingRate": 1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Animateur magasin"
    ],
    "speakerPersonas": [
      {
        "role": "Animateur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Avis à notre aimable clientèle ! Rendez-vous dès maintenant à l'entrée du rayon traiteur pour une dégustation gratuite de fromages et de miels artisanaux de nos producteurs savoyards. Pour deux produits du terroir achetés aujourd'hui, le troisième vous est offert en caisse sur présentation de votre carte de fidélité.",
    "audioEn": "Notice to our valued shoppers! Head over right now to the deli entrance for a free tasting of artisan cheeses and honey from our regional Savoyard farmers. For any two local specialty items purchased today, you will receive a third item free at checkout upon presenting your loyalty card.",
    "questionFr": "Quel avantage promotionnel est annoncé aux clients du magasin ?",
    "questionEn": "What promotional offer is announced to supermarket shoppers?",
    "optionsFr": [
      "Une gratuité sur un produit du terroir sous condition d'achat multiple",
      "Un remboursement intégral en espèces de tous les achats alimentaires",
      "La livraison à domicile offerte pour toute commande passée sur internet",
      "Un tirage au sort pour gagner un séjour gastronomique à la montagne"
    ],
    "optionsEn": [
      "A complimentary regional product conditioned on multiple purchases",
      "A full cash refund on all grocery purchases made in the store",
      "Free home delivery for any grocery order placed via the website",
      "A prize raffle ticket to win a gourmet vacation getaway in the Alps"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q08",
    "paperNumber": 3,
    "questionNumber": 8,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Réseau de métro métropolitain — Travaux d'infrastructure et déviation",
    "speakingRate": 1.02,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Voix d'information voyageur"
    ],
    "speakerPersonas": [
      {
        "role": "Voix officielle",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "Chers voyageurs, en raison du renouvellement des voies et de la modernisation des appareils d'aiguillage, le trafic de la ligne 2 sera totalement interrompu entre les stations République et Nation tout ce week-end. Des bus de substitution identifiés par le sigle « Navette Bus 2 » circuleront en surface toutes les sept minutes au départ des arrêts signalés.",
    "audioEn": "Dear passengers, due to track renewal and modernization of switching equipment, traffic on Line 2 will be completely suspended between République and Nation stations throughout this weekend. Replacement shuttle buses marked 'Navette Bus 2' will operate on surface streets every seven minutes from marked bus stops.",
    "questionFr": "Quelle disposition exceptionnelle est mise en place pour les usagers ?",
    "questionEn": "What exceptional arrangement is instituted for transit passengers?",
    "optionsFr": [
      "La gratuité intégrale de toutes les lignes de taxi du centre-ville",
      "L'ouverture nocturne continue de toutes les stations souterraines",
      "Un service d'autobus de remplacement assurant la liaison en surface",
      "L'interdiction absolue de voyager avec des bagages volumineux"
    ],
    "optionsEn": [
      "Free fare rides on all downtown city taxicab fleets throughout the area",
      "Continuous all-night opening hours for every underground metro station",
      "A surface replacement shuttle bus service providing transit connections",
      "A strict ban on travelling with bulky parcels or suitcases on the network"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q09",
    "paperNumber": 3,
    "questionNumber": 9,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Pressing écologique — Mise à disposition des articles nettoyés",
    "speakingRate": 1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Employé du pressing"
    ],
    "speakerPersonas": [
      {
        "role": "Employé",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Bonjour madame Lambert, c'est le pressing Blanch'Éco. Nous vous informons que votre manteau en laine et vos deux rideaux de salon sont nettoyés, repassés et disponibles au comptoir. Vous pouvez venir les retirer dès cet après-midi jusqu'à 19 heures. N'oubliez pas d'apporter votre ticket de dépôt pour récupérer vos articles.",
    "audioEn": "Hello Mrs. Lambert, this is Blanch'Éco Cleaners. We inform you that your wool winter coat and your two living room curtains are cleaned, pressed, and ready at the front desk. You may come pick them up starting this afternoon until 7:00 PM. Please remember to bring your claim ticket to retrieve your items.",
    "questionFr": "Quel message le commerçant transmet-il à sa cliente ?",
    "questionEn": "What message does the shop employee convey to his customer?",
    "optionsFr": [
      "Un retard de livraison dû à une panne technique des lave-linge",
      "L'impossibilité de détacher le vêtement nécessitant un traitement spécial",
      "La disponibilité immédiate de ses effets nettoyés au magasin",
      "Une augmentation tarifaire imprévue à régler lors du retrait"
    ],
    "optionsEn": [
      "A delivery delay caused by a mechanical breakdown of washing machines",
      "The impossibility of removing stains requiring specialized treatment",
      "The immediate readiness of her cleaned articles at the shop counter",
      "An unforeseen price increase to be settled upon in-person pickup"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q10",
    "paperNumber": 3,
    "questionNumber": 10,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Garderie périscolaire — Fermeture exceptionnelle pour formation",
    "speakingRate": 1.02,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Directrice de la garderie"
    ],
    "speakerPersonas": [
      {
        "role": "Directrice",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Chers parents, nous vous rappelons que l'accueil périscolaire du soir fermera exceptionnellement ses portes ce vendredi à 16 heures 30 au lieu de 18 heures 30, en raison d'une session obligatoire de formation aux premiers secours pour l'ensemble de notre équipe éducative. Nous vous remercions de prendre vos dispositions pour récupérer vos enfants à l'heure indiquée.",
    "audioEn": "Dear parents, we remind you that evening after-school daycare will exceptionally close its doors this Friday at 4:30 PM instead of 6:30 PM, due to a mandatory first-aid training session for our entire educational staff. We thank you for making arrangements to collect your children at the designated time.",
    "questionFr": "Quelle consigne particulière s'adresse aux parents d'élèves ?",
    "questionEn": "What specific instruction is addressed to parents of students?",
    "optionsFr": [
      "Venir chercher leurs enfants plus tôt que d'habitude ce vendredi",
      "Fournir un certificat médical d'aptitude sportive pour la semaine",
      "Participer personnellement à la session de secourisme de l'école",
      "Régler la cotisation semestrielle des activités extrascolaires"
    ],
    "optionsEn": [
      "Collect their children earlier than usual on this coming Friday",
      "Provide a medical health certificate of sports fitness for the week",
      "Personally take part in the school's emergency first-aid session",
      "Pay the semi-annual membership fee for extracurricular activities"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q11",
    "paperNumber": 3,
    "questionNumber": 11,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Aéroport international — Dernier appel d'embarquement",
    "speakingRate": 1.04,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Agent d'embarquement aéroportuaire"
    ],
    "speakerPersonas": [
      {
        "role": "Agent d'embarquement",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Dernier appel pour les passagers retardataires du vol Air Transat 542 à destination de Montréal. L'embarquement s'effectue en porte B14 et fermera définitivement dans cinq minutes. Les passagers n'ayant pas franchi la porte d'embarquement verront leurs bagages débarqués de la soute conformément aux protocoles internationaux de sûreté.",
    "audioEn": "Final boarding call for remaining passengers on Air Transat flight 542 bound for Montreal. Boarding is taking place at gate B14 and will close definitively in five minutes. Passengers who have not passed through the gate will have their luggage offloaded in compliance with international security protocols.",
    "questionFr": "Quelle mise en garde urgente est annoncée aux passagers ?",
    "questionEn": "What urgent warning is announced to airline passengers?",
    "optionsFr": [
      "Le vol est annulé suite à une fermeture imprévue de l'espace aérien",
      "Les passagers doivent changer immédiatement de terminal de départ",
      "Une taxe de surcharge bagage sera appliquée à l'arrivée au Canada",
      "L'accès à bord sera refusé et les bagages retirés en cas de retard"
    ],
    "optionsEn": [
      "The flight is canceled following an unexpected airspace closure",
      "Passengers must transfer immediately to another departure terminal",
      "An excess baggage surcharge tax will be levied upon arrival in Canada",
      "Boarding will be denied and luggage removed if passengers arrive late"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q12",
    "paperNumber": 3,
    "questionNumber": 12,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Entreprise de plomberie — Report d'intervention à domicile",
    "speakingRate": 1.01,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Artisan plombier"
    ],
    "speakerPersonas": [
      {
        "role": "Artisan plombier",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Bonjour monsieur Dupont, c'est l'entreprise Plomberie Express. Notre technicien est actuellement retenu sur une fuite d'eau majeure dans un immeuble collectif et ne pourra pas honorer votre rendez-vous de pose de chauffe-eau prévu à 14 heures. Nous pouvons décaler l'intervention à demain matin dès 8 heures ou jeudi après-midi selon vos disponibilités. Merci de nous confirmer votre créneau.",
    "audioEn": "Hello Mr. Dupont, this is Plomberie Express. Our technician is currently held up by a major water pipe burst in an apartment building and cannot make your 2:00 PM water heater installation appointment. We can reschedule the job for tomorrow morning at 8:00 AM or Thursday afternoon depending on your availability. Please call us to confirm your preferred slot.",
    "questionFr": "Quelle est la situation expliquée par l'artisan ?",
    "questionEn": "What situation is explained by the contractor?",
    "optionsFr": [
      "La rupture de stock définitive du modèle de chauffe-eau commandé",
      "L'impossibilité d'intervenir à l'heure convenue en raison d'un dépannage urgent",
      "Une erreur de facturation sur le devis initial nécessitant une renégociation",
      "Le refus définitif de réaliser les travaux d'installation dans le logement"
    ],
    "optionsEn": [
      "A permanent out-of-stock shortage of the ordered water heater unit",
      "The inability to arrive at the agreed time due to an emergency repair call",
      "A billing calculation error on the initial quote requiring renegotiation",
      "A definitive refusal to carry out the installation works in the residence"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q13",
    "paperNumber": 3,
    "questionNumber": 13,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 1 (Camille)",
    "speakingRate": 1.03,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Camille (chargée de communication)"
    ],
    "speakerPersonas": [
      {
        "role": "Camille",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Camille : Pour moi, c'est une révolution humaine et écologique indispensable ! Travailler quatre jours permet de récupérer du sommeil, de passer du temps avec ses enfants et de faire des démarches administratives en semaine sans stress. On revient le lundi avec les idées claires, beaucoup plus concentré et efficace sur ses missions professionnelles.",
    "audioEn": "Camille: For me, this is an indispensable human and ecological revolution! Working four days lets people catch up on sleep, spend quality time with their kids, and handle administrative errands during the week without stress. You return on Monday with a clear mind, far more focused and effective on your professional tasks.",
    "questionFr": "Quel argument principal Camille met-elle en avant en faveur des 4 jours ?",
    "questionEn": "What main argument does Camille highlight in favor of the 4-day work week?",
    "optionsFr": [
      "Un meilleur équilibre de vie personnelle favorisant une plus grande productivité au travail",
      "La suppression de l'obligation de payer des impôts sur le revenu pour les salariés",
      "La possibilité de cumuler deux emplois à temps plein pour doubler ses revenus",
      "La réduction du nombre de jours de congés payés accordés annuellement"
    ],
    "optionsEn": [
      "A healthier personal work-life balance boosting workplace focus and productivity",
      "The elimination of personal income tax liabilities for four-day payroll employees",
      "The opportunity to work two concurrent full-time jobs to double monthly income",
      "The reduction in the total number of paid annual vacation days granted to staff"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q14",
    "paperNumber": 3,
    "questionNumber": 14,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 2 (Thierry)",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Thierry (patron de PME dans l'artisanat)"
    ],
    "speakerPersonas": [
      {
        "role": "Thierry",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Thierry : C'est une belle utopie de cadres de bureau, mais sur le terrain, c'est inapplicable ! Si mes menuisiers ne travaillent plus le vendredi, nos délais de chantier explosent de 25 %. Embaucher du personnel supplémentaire pour compenser est financièrement impossible avec nos marges actuelles. Cela pénaliserait directement la survie de nos petites entreprises.",
    "audioEn": "Thierry: It's a nice pipe dream for corporate office workers, but out on job sites, it's completely unworkable! If my carpenters stop working on Fridays, our project delivery timelines blow out by 25%. Hiring additional personnel to offset the lost hours is financially impossible given our tight profit margins. It would directly jeopardize small business survival.",
    "questionFr": "Pourquoi Thierry s'oppose-t-il fermement à cette mesure ?",
    "questionEn": "Why does Thierry firmly oppose this measure?",
    "optionsFr": [
      "Il craint une baisse drastique de la qualité des matières premières de menuiserie",
      "Il juge le salaire des artisans manuels déjà excessif par rapport aux cadres",
      "Il anticipe des retards de production insolubles et des surcoûts d'embauche intenables",
      "Il affirme que les employés préfèrent travailler six jours par semaine pour gagner plus"
    ],
    "optionsEn": [
      "He fears a dramatic decline in the quality of raw woodworking materials",
      "He believes manual tradesmen's wages are already excessive compared to desk workers",
      "He anticipates insurmountable production delays and unsustainable hiring overhead",
      "He asserts that tradespeople prefer working six days weekly to earn overtime pay"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q15",
    "paperNumber": 3,
    "questionNumber": 15,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 3 (Nadia)",
    "speakingRate": 1.04,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Nadia (infirmière hospitalière)"
    ],
    "speakerPersonas": [
      {
        "role": "Nadia",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Nadia : Dans le secteur de la santé, nous sommes déjà en sous-effectif critique au quotidien. Si on passe aux 32 heures sans créer massivement de nouveaux postes soignants, cela veut dire concentrer les gardes sur des journées de 10 ou 11 heures éprouvantes, augmentant l'épuisement professionnel et le risque d'erreur médicale. L'idée est séduisante, mais sans embauches massives, c'est dangereux.",
    "audioEn": "Nadia: In the healthcare sector, we are already coping with critical daily staff shortages. If we switch to 32 hours without massive hiring of nursing staff, it means cramming shifts into grueling 10 or 11-hour days, worsening burnout and medical error risks. The idea is appealing, but without massive recruitment, it is dangerous.",
    "questionFr": "Quelle nuance Nadia formule-t-elle au sujet des hôpitaux ?",
    "questionEn": "What nuanced concern does Nadia express regarding hospital wards?",
    "optionsFr": [
      "L'allongement excessif de la durée des études universitaires de médecine",
      "Le risque d'alourdir la fatigue quotidienne des soignants si les effectifs restent constants",
      "La fermeture définitive des services d'urgence pendant tous les week-ends",
      "L'opposition catégorique des syndicats de médecins à toute réduction du temps de travail"
    ],
    "optionsEn": [
      "The excessive lengthening of university medical school degree programs",
      "The risk of compounding healthcare worker fatigue if staffing numbers remain flat",
      "The permanent closure of emergency trauma departments on all weekends",
      "The outright refusal of medical physician unions to discuss working hour reductions"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q16",
    "paperNumber": 3,
    "questionNumber": 16,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 4 (Marc)",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Marc (développeur informatique)"
    ],
    "speakerPersonas": [
      {
        "role": "Marc",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Marc : Notre entreprise de logiciels a adopté la formule il y a six mois du mardi au vendredi. Résultat : notre absentéisme est tombé à zéro et nous avons recruté les meilleurs talents de la région qui fuyaient les entreprises traditionnelles. Les réunions inutiles ont disparu pour aller à l'essentiel. C'est un levier d'attractivité formidable pour l'économie moderne.",
    "audioEn": "Marc: Our software firm adopted the 4-day schedule six months ago running Tuesday through Friday. Outcome: our absenteeism dropped to zero and we recruited top-tier talent in the region fleeing traditional workplaces. Pointless meetings were scrapped in favor of high-impact work. It is a fantastic talent magnet for modern businesses.",
    "questionFr": "Quel bénéfice constaté Marc rapporte-t-il sur son entreprise ?",
    "questionEn": "What observed corporate benefit does Marc report regarding his company?",
    "optionsFr": [
      "Une réduction drastique de la facture de chauffage grâce au télétravail intégral",
      "L'obligation de sous-traiter tous les projets informatiques dans des filiales étrangères",
      "L'augmentation des démissions chez les jeunes diplômés préférant les horaires de nuit",
      "Une attraction accrue des profils qualifiés et la disparition des absences non planifiées"
    ],
    "optionsEn": [
      "A drastic reduction in corporate heating bills due to 100% remote teleworking",
      "The requirement to outsource all software engineering projects to offshore affiliates",
      "An increase in resignations among recent graduates who prefer overnight shifts",
      "An enhanced recruitment of skilled professionals and the elimination of absenteeism"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q17",
    "paperNumber": 3,
    "questionNumber": 17,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 5 (Élodie)",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Élodie (commerçante de centre-ville)"
    ],
    "speakerPersonas": [
      {
        "role": "Élodie",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "Élodie : Moi, en tant que gérante de librairie de quartier, un jour de congé supplémentaire pour les salariés signifie un afflux direct de clients le vendredi ! Les gens flânent, lisent, consomment dans les commerces de proximité et s'inscrivent à des ateliers culturels. C'est une manne économique inespérée pour revitaliser nos cœurs de ville face aux géants du commerce en ligne.",
    "audioEn": "Élodie: As the owner of an independent neighborhood bookstore, an extra day off for employees means a direct surge in foot traffic on Fridays! People stroll, read, patronize local downtown shops, and register for cultural workshops. It is an unexpected economic windfall to revitalize city centers against online e-commerce giants.",
    "questionFr": "Quel impact économique positif Élodie associe-t-elle à cette réforme ?",
    "questionEn": "What positive economic impact does Élodie attribute to this reform?",
    "optionsFr": [
      "La redynamisation du commerce physique de proximité grâce au temps libre des citoyens",
      "La fermeture le week-end des grandes surfaces de la grande distribution internationale",
      "Une baisse généralisée des prix des livres et fournitures scolaires en rayon",
      "La suppression de la taxe sur la valeur ajoutée pour les petites boutiques de centre-ville"
    ],
    "optionsEn": [
      "The revitalized footfall of brick-and-mortar local retail fueled by citizen leisure time",
      "The weekend shutdown of global suburban big-box retail supermarkets",
      "An across-the-board price drop on published books and stationery supplies",
      "The complete exemption of value-added tax for small independent downtown shops"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q18",
    "paperNumber": 3,
    "questionNumber": 18,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 6 (Sébastien)",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 10,
    "speakerCount": 1,
    "speakers": [
      "Sébastien (ouvrier dans l'industrie agroalimentaire)"
    ],
    "speakerPersonas": [
      {
        "role": "Sébastien",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Sébastien : Dans mon usine, ils ont testé la semaine de quatre jours en gardant le volume horaire de 35 heures : on faisait des journées de près de neuf heures debout sur les lignes d'emballage. En fin de journée, les cadences devenaient insupportables et les douleurs musculaires ont explosé. Si c'est pour compresser le même travail avec plus d'intensité, c'est un piège pour la santé physique des ouvriers.",
    "audioEn": "Sébastien: In my factory, they piloted the four-day week while keeping the full 35-hour volume: we worked nearly nine-hour days standing on packing conveyor lines. By late afternoon, production paces became unbearable and musculoskeletal injuries spiked. If it just means compressing identical output with higher physical strain, it's a trap for factory workers' health.",
    "questionFr": "Quel danger physique Sébastien dénonce-t-il dans l'application de cette mesure ?",
    "questionEn": "What physical danger does Sébastien highlight regarding the implementation of this policy?",
    "optionsFr": [
      "Le travail nocturne forcé imposé durant les périodes de grand froid",
      "L'exposition accrue aux solvants chimiques dangereux dans les ateliers d'usinage",
      "L'intensification excessive de la pénibilité corporelle due à des journées trop longues",
      "La baisse des indemnités journalières en cas d'arrêt de travail pour maladie"
    ],
    "optionsEn": [
      "Mandatory night shifts imposed during severe winter freezing conditions",
      "Heightened exposure to toxic chemical industrial solvents on machining lines",
      "The extreme intensification of physical strain caused by excessively long workdays",
      "A reduction in statutory daily sick leave compensation payments for medical absences"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q19",
    "paperNumber": 3,
    "questionNumber": 19,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Agriculture — L'agroforesterie et la régénération des sols",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le journaliste agronome"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste agronome",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Planter des rangées d'arbres feuillus au beau milieu des parcelles de céréales : c'est le pari de l'agroforesterie qui séduit de plus en plus d'exploitants agricoles. En plongeant leurs racines à plusieurs mètres de profondeur, les noyers et les frênes captent l'eau et les minéraux inaccessibles aux blés tout en créant un microclimat ombragé qui protège les récoltes des sécheresses estivales. Les mesures agronomiques confirment une hausse de 30 % de la biodiversité microbienne du sol et une réduction d'un tiers des besoins en arrosage.",
    "audioEn": "Planting rows of deciduous trees right through the center of grain crop fields: this is the premise of agroforestry winning over growing numbers of farmers. By driving roots deep into subsoil layers, walnut and ash trees absorb water and minerals unreachable by wheat while creating a shaded canopy that buffers crops from summer droughts. Agronomic field assessments confirm a 30% surge in soil microbial biodiversity alongside a one-third reduction in irrigation requirements.",
    "questionFr": "Quel bénéfice direct l'agroforesterie procure-t-elle aux cultures céréalières ?",
    "questionEn": "What direct benefit does agroforestry provide to grain crops?",
    "optionsFr": [
      "La disparition complète du besoin de moissonner les champs à la fin de l'été",
      "Une résilience hydrique accrue face à la chaleur couplée à un enrichissement biologique du sol",
      "L'interdiction légale d'utiliser des tracteurs agricoles sur les parcelles boisées",
      "L'élimination automatique de tous les oiseaux migrateurs des zones agricoles"
    ],
    "optionsEn": [
      "The complete elimination of harvesting grain fields at the end of summer",
      "Heightened drought resilience against extreme heat paired with biological soil enrichment",
      "A legal prohibition against operating mechanized tractors across timbered plots",
      "The automatic deterrence of all migratory birds away from agricultural cropland"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q20",
    "paperNumber": 3,
    "questionNumber": 20,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Industrie — Le recyclage en boucle fermée des batteries électriques",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "La chroniqueuse industrie"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueuse industrie",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Avec l'essor fulgurant des véhicules électriques, la gestion des batteries en fin de vie représente un défi environnemental et géopolitique stratégique. Dans le nord de la France, une méga-usine d'hydrométallurgie parvient à recycler 95 % des métaux critiques contenus dans les accumulateurs usagés : cobalt, nickel et lithium sont purifiés chimiquement en circuit fermé et réinjectés directement dans la production de cellules neuves. Ce procédé pionnier réduit de 70 % l'empreinte carbone liée à l'extraction minière primaire.",
    "audioEn": "With the surging rollout of electric vehicles, managing end-of-life battery packs represents a vital environmental and geopolitical challenge. In northern France, a hydrometallurgical gigafactory successfully recovers 95% of critical metals contained within spent batteries: cobalt, nickel, and lithium are chemically refined in a closed loop and fed directly back into new cell manufacturing. This pioneering process slashes mining-related lifecycle carbon emissions by 70%.",
    "questionFr": "Quelle prouesse environnementale cette usine de recyclage accomplit-elle ?",
    "questionEn": "What environmental achievement does this recycling plant accomplish?",
    "optionsFr": [
      "L'enfouissement sécurisé des déchets toxiques dans d'anciennes mines de charbon désaffectées",
      "L'exportation de toutes les batteries usagées vers des décharges maritimes internationales",
      "La fabrication de moteurs à combustion thermique fonctionnant à l'énergie solaire",
      "La récupération et réutilisation quasi intégrale des métaux critiques sans passer par les mines"
    ],
    "optionsEn": [
      "The deep geological burial of hazardous toxic wastes in abandoned underground coal mines",
      "The export of all spent lithium batteries to international oceanic offshore dump sites",
      "The assembly of fossil combustion engines operating exclusively on solar thermal fuel",
      "The near-total recovery and closed-loop reuse of critical minerals bypassing raw mining"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q21",
    "paperNumber": 3,
    "questionNumber": 21,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Santé — Sommeil des adolescents et filtres de lumière bleue",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le médecin chercheur"
    ],
    "speakerPersonas": [
      {
        "role": "Médecin chercheur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Près de 70 % des adolescents consultent leur smartphone dans leur lit avant de s'endormir, ce qui retarde l'endormissement d'une moyenne de quarante-cinq minutes. Contrairement à une idée répandue, les filtres logiciels de lumière bleue dits « mode nuit » ne suffisent pas à neutraliser l'impact négatif sur le cerveau : l'hyper-stimulation cognitive provoquée par les notifications et le défilement continu des réseaux sociaux maintient le cortex préfrontal en état d'alerte, bloquant la transition vers le sommeil profond.",
    "audioEn": "Nearly 70% of teenagers browse their smartphones in bed before falling asleep, delaying sleep onset by an average of forty-five minutes. Contrary to popular belief, software blue-light filters known as 'night mode' fail to neutralize negative neurobiological impacts: cognitive hyper-arousal triggered by notifications and continuous social media scrolling keeps the prefrontal cortex in a state of high alert, blocking the transition into restorative deep sleep.",
    "questionFr": "Pourquoi les filtres de lumière bleue s'avèrent-ils insuffisants selon les chercheurs ?",
    "questionEn": "Why do blue-light filters prove insufficient according to sleep researchers?",
    "optionsFr": [
      "Parce que la sollicitation intellectuelle continue des réseaux sociaux maintient le cerveau éveillé",
      "Parce que les smartphones émettent des micro-ondes radioactifs altérant la rétine oculaire",
      "Parce que les adolescents éteignent systématiquement le mode nuit dès qu'il s'active",
      "Parce que les batteries des téléphones chauffent excessivement sous les oreillers"
    ],
    "optionsEn": [
      "Because continuous intellectual stimulation from social apps keeps the brain wired awake",
      "Because smartphone antennas emit radioactive microwaves damaging eye retina tissues",
      "Because adolescents systematically turn off night mode as soon as it engages automatically",
      "Because lithium phone batteries heat up dangerously beneath bedside sleeping pillows"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q22",
    "paperNumber": 3,
    "questionNumber": 22,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Archéologie — Drones sous-marins et épaves antiques",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "L'archéologue marin"
    ],
    "speakerPersonas": [
      {
        "role": "Archéologue",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "À plus de mille mètres de profondeur au large de la Corse, les plongeurs humains ne peuvent pas s'aventurer sans risque mortel. C'est désormais un robot submersible autonome doté de caméras acoustiques et de bras articulés délicats qui explore les cargaisons d'amphores romaines vieilles de deux mille ans. Capable de cartographier un site englouti en 3D sans remuer les sédiments sablonneux protecteurs, ce drone permet aux chercheurs d'étudier les routes commerciales maritimes de l'Empire sans perturber l'équilibre fragile des fonds marins.",
    "audioEn": "At depths exceeding one thousand meters off the coast of Corsica, human scuba divers cannot venture without lethal peril. Now, an autonomous submersible robot fitted with acoustic sonar cameras and delicate articulated manipulator arms explores two-thousand-year-old Roman amphora shipwrecks. Capable of mapping a submerged wreck in 3D without kicking up protective sand sediments, this drone enables historians to study ancient trade routes without disturbing delicate seabed ecosystems.",
    "questionFr": "Quel est l'atout technique majeur de ce drone sous-marin pour l'archéologie ?",
    "questionEn": "What major technical advantage does this submersible drone bring to archaeology?",
    "optionsFr": [
      "La destruction des récifs rocheux pour extraire rapidement des trésors en or",
      "La capacité de remorquer des bateaux de croisière en détresse jusqu'au littoral",
      "L'exploration et la modélisation 3D d'épaves profondes sans dégrader les vestiges",
      "Le remplacement permanent de tous les musées d'histoire par des casques virtuels"
    ],
    "optionsEn": [
      "The dynamiting of rocky reefs to rapidly extract gold treasure chests",
      "The capacity to tow stranded commercial cruise ships back to mainland shores",
      "The exploration and 3D modeling of deep wrecks without damaging delicate remains",
      "The permanent substitution of brick-and-mortar museums with virtual reality headsets"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q23",
    "paperNumber": 3,
    "questionNumber": 23,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Sylviculture — Surveillance des mégafeux par caméras thermiques IA",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le garde-forestier ingénieur"
    ],
    "speakerPersonas": [
      {
        "role": "Ingénieur forestier",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Dans le massif des Landes, la détection précoce des départs de feu est devenue une course contre la montre. Un réseau de pylônes équipés de caméras optiques et thermiques à trois cent soixante degrés scrute l'horizon forestier en continu. Couplées à un algorithme entraîné sur des milliers d'images de fumées, ces sentinelles électroniques repèrent un panache suspect à plus de vingt kilomètres en moins de trois minutes, alertant instantanément les pompiers avant que l'incendie ne gagne la cime des pins maritimes.",
    "audioEn": "In the Landes pine forest, detecting fire ignitions early has become a race against the clock. A network of watchtowers equipped with 360-degree optical and thermal infrared cameras scans the forest canopy around the clock. Linked to an algorithm trained on thousands of smoke signatures, these electronic sentinels spot suspicious smoke plumes over twenty kilometers away in under three minutes, alerting firefighters before flames reach the maritime pine canopies.",
    "questionFr": "Comment ce dispositif permet-il d'éviter la propagation des mégafeux ?",
    "questionEn": "How does this system prevent the runaway spread of mega-wildfires?",
    "optionsFr": [
      "En arrosant automatiquement l'ensemble de la forêt avec de l'eau de mer traitée",
      "En localisant et signalant les départs de fumée en quelques minutes sur de vastes distances",
      "En rasant méthodiquement toutes les zones arborées situées à proximité des habitations",
      "En interdisant aux promeneurs et touristes de pénétrer dans les parcs nationaux en été"
    ],
    "optionsEn": [
      "By automatically showering the entire forest expanse with desalinated seawater",
      "By detecting and flagging smoke outbreaks in minutes across extensive distances",
      "By clearcutting all wooded tracts located anywhere within range of residential towns",
      "By barring hikers and tourists from entering national park nature preserves all summer"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q24",
    "paperNumber": 3,
    "questionNumber": 24,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Espaces verts — L'éco-pâturage en milieu urbain",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "La responsable municipale"
    ],
    "speakerPersonas": [
      {
        "role": "Responsable municipale",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Remplacer les tondeuses à gazon bruyantes et consommatrices de carburant par des troupeaux de moutons d'Ouessant et de chèvres des fossés : c'est le choix fait par plus de quatre-vingts communes en France. En pâturant sur les talus escarpés des voies ferrées et les parcs d'entreprises, ces animaux rustiques entretiennent la végétation sans bruit ni pollution atmosphérique. Mieux encore, leurs sabots et leurs déjections stimulent la réapparition d'espèces végétales pionnières et d'insectes pollinisateurs disparus depuis des décennies.",
    "audioEn": "Replacing noisy, fuel-burning lawnmowers with herds of Ouessant sheep and heritage ditch goats: this is the policy embraced by over eighty municipalities across France. Grazing steep railway embankments and corporate business parks, these hardy animals maintain vegetation without engine noise or exhaust emissions. Even better, their hooves and droppings spark the resurgence of pioneer plant species and insect pollinators absent for decades.",
    "questionFr": "Quels sont les avantages combinés de l'éco-pâturage urbain ?",
    "questionEn": "What are the combined advantages of urban conservation grazing?",
    "optionsFr": [
      "L'approvisionnement des cantines scolaires en viande d'agneau fraîchement abattue",
      "L'élimination définitive de tous les arbres et buissons des parcs municipaux",
      "La transformation des pelouses urbaines en terrains de golf internationaux payants",
      "Un entretien silencieux sans carburant qui favorise la biodiversité florale et animale"
    ],
    "optionsEn": [
      "Supplying municipal school cafeterias with freshly slaughtered local lamb meat",
      "The permanent removal of all mature trees and shrubs across municipal public parks",
      "The conversion of downtown park lawns into fee-paying international golf courses",
      "Quiet, fuel-free landscape maintenance that promotes floral and insect biodiversity"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q25",
    "paperNumber": 3,
    "questionNumber": 25,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Logistique — La décarbonation du fret par le rail semi-remorque",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "L'économiste des transports"
    ],
    "speakerPersonas": [
      {
        "role": "Économiste",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Le transport routier de marchandises est responsable de plus de 20 % des émissions de CO2 en Europe. Pour contourner la saturation des autoroutes, les autoroutes ferroviaires enregistrent une croissance record : des wagons surbaissés permettent de charger directement les remorques de camions sans leurs tracteurs en moins de cinq minutes sur des trains de huit cent cinquante mètres. Un seul convoi ferroviaire retire ainsi cinquante-cinq poids lourds du réseau routier entre Calais et Turin, divisant par neuf les rejets de gaz à effet de serre par tonne transportée.",
    "audioEn": "Freight road haulage accounts for over 20% of European carbon emissions. To bypass congested highway corridors, rolling motorway rail systems are recording unprecedented growth: low-floor wagons allow truck trailers to be loaded directly without tractor cabs in under five minutes onto 850-meter-long trains. A single freight train takes fifty-five tractor-trailers off the roads between Calais and Turin, slashing greenhouse emissions by a factor of nine per freight tonne.",
    "questionFr": "Quel est l'impact environnemental majeur de ce mode de transport combiné ?",
    "questionEn": "What is the major environmental impact of this multimodal rail system?",
    "optionsFr": [
      "Une division spectaculaire des rejets polluants en transférant les remorques sur le rail",
      "La suppression totale du réseau autoroutier pour les véhicules particuliers",
      "L'obligation pour les chauffeurs routiers de conduire les trains de nuit eux-mêmes",
      "Une hausse substantielle des taxes de péage sur tous les ponts suspendus d'Europe"
    ],
    "optionsEn": [
      "A dramatic slash in polluting emissions by transferring cargo trailers onto rail lines",
      "The complete abolition of the interurban highway network for private passenger cars",
      "A mandate requiring freight truck drivers to personally pilot freight train locomotives",
      "A substantial hike in road transit toll fees across all suspension bridges in Europe"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q26",
    "paperNumber": 3,
    "questionNumber": 26,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Biotechnologies — L'impression 3D de tissus dermiques",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "La chercheuse en bio-ingénierie"
    ],
    "speakerPersonas": [
      {
        "role": "Chercheuse",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "Pour les grands brûlés, les greffes de peau traditionnelles prélevées sur d'autres parties du corps restent extrêmement douloureuses et limitées par la surface disponible. Des bio-ingénieurs nantais ont mis au point une bio-imprimante 3D qui dépose couche par couche des cellules cutanées du patient mélangées à un gel d'alginate protecteur. En moins de deux heures, l'appareil fabrique un substitut dermique vascularisé parfaitement compatible, réduisant drastiquement les risques de rejet immunitaire et accélérant la cicatrisation cutanée.",
    "audioEn": "For severe burn victims, conventional autologous skin grafts harvested from uninjured body areas remain intensely agonizing and constrained by donor surface limits. Bioengineers in Nantes developed a 3D bioprinter that deposits patient skin cells blended within a protective alginate hydrogel layer by layer. In under two hours, the device constructs a vascularized, fully compatible dermal substitute, drastically mitigating immune rejection risks while accelerating skin wound healing.",
    "questionFr": "Quelle amélioration clinique cette bio-impression offre-t-elle aux patients ?",
    "questionEn": "What clinical improvement does this bioprinting technology offer patients?",
    "optionsFr": [
      "La production de cœurs artificiels mécaniques autonomes fonctionnant par batterie",
      "L'éradication complète de toutes les cicatrices de brûlure en quelques secondes",
      "La création de greffons sur mesure parfaitement tolérés sans prélèvement cutané douloureux",
      "Le remplacement de tout le personnel soignant des blocs opératoires hospitaliers"
    ],
    "optionsEn": [
      "The manufacturing of autonomous artificial mechanical hearts operating on battery cells",
      "The complete instantaneous eradication of burn scars within a matter of seconds",
      "The creation of bespoke compatible skin grafts without agonizing donor tissue harvesting",
      "The wholesale substitution of surgical operating room teams with robotic arms"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q27",
    "paperNumber": 3,
    "questionNumber": 27,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Consommation — Les bricothèques et l'économie de la fonctionnalité",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le sociologue de la consommation"
    ],
    "speakerPersonas": [
      {
        "role": "Sociologue",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "En moyenne, une perceuse électrique achetée par un particulier n'est utilisée que douze minutes sur toute sa durée de vie. Face à cette sous-utilisation absurde, les bricothèques citoyennes se multiplient dans les quartiers : moyennant une adhésion annuelle modique de vingt euros, les adhérents peuvent emprunter nettoyeurs haute pression, scies sauteuses ou ponceuses pour quelques jours. Ce passage de la possession à l'usage partagé permet à chaque foyer d'économiser plusieurs centaines d'euros par an tout en réduisant l'extraction de métaux pour des machines qui dorment au placard.",
    "audioEn": "On average, a power drill bought by an individual is used for just twelve minutes across its entire working lifespan. Confronting this absurd underutilization, neighborhood tool-sharing libraries are blossoming: for a modest annual subscription fee of twenty euros, members can check out pressure washers, jigsaws, or sanders for several days. This transition from individual ownership to shared utility saves households hundreds of euros annually while curtailing raw metal mining for tools gathering closet dust.",
    "questionFr": "Quel est le principe directeur mis en pratique dans ces bricothèques ?",
    "questionEn": "What guiding principle is put into practice within these tool libraries?",
    "optionsFr": [
      "L'obligation pour les particuliers de fabriquer leurs propres meubles à la main",
      "Privilégier l'accès et l'emprunt d'outils plutôt que l'achat individuel peu rentable",
      "La distribution gratuite et inconditionnelle de matériel de chantier neuf aux usagers",
      "L'interdiction de réaliser des travaux de bricolage les samedis et dimanches"
    ],
    "optionsEn": [
      "The legal requirement for households to manufacture all furniture furnishings by hand",
      "Prioritizing access and temporary tool borrowing over uneconomical private ownership",
      "The unconditional free giveaway of brand-new contractor power machinery to residents",
      "A ban on carrying out DIY home improvement repairs on Saturdays and Sundays"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q28",
    "paperNumber": 3,
    "questionNumber": 28,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Habitat — La rénovation thermique globale des passoires thermiques",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "L'architecte énergéticien"
    ],
    "speakerPersonas": [
      {
        "role": "Architecte énergéticien",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Changer uniquement sa vieille chaudière ou remplacer deux fenêtres ne suffit plus : les spécialistes de l'énergie préconisent désormais la rénovation thermique globale en une seule intervention coordonnée. En associant simultanément l'isolation extérieure des murs par de la laine de bois, l'étanchéité des combles, une ventilation double flux et une pompe à chaleur géothermique, la facture de chauffage des pavillons des années 70 est divisée par quatre. Les aides publiques conditionnées à ce saut d'au moins deux classes énergétiques incitent les propriétaires à franchir le pas.",
    "audioEn": "Merely swapping an aging boiler or replacing two drafty windows is no longer enough: energy consultants now advocate comprehensive single-stage home deep retrofits. By pairing exterior wall wood-fiber insulation, roof airtightness, balanced heat recovery ventilation, and a geothermal heat pump simultaneously, winter heating bills in 1970s suburban homes drop by 75%. Government grants conditioned on leaping at least two energy performance ratings incentivize homeowners to take the plunge.",
    "questionFr": "Pourquoi les experts recommandent-ils une rénovation thermique globale plutôt que partielle ?",
    "questionEn": "Why do experts recommend a comprehensive retrofit rather than piecemeal repairs?",
    "optionsFr": [
      "Parce que les matériaux isolants ne sont vendus que par lots de cent tonnes en usine",
      "Parce que la loi impose la démolition complète des maisons chauffées au gaz ou au fioul",
      "Parce que les propriétaires refusent catégoriquement de changer leurs habitudes de chauffage",
      "Parce que traiter l'ensemble de l'enveloppe et des systèmes garantit une chute drastique des dépenses"
    ],
    "optionsEn": [
      "Because insulation manufacturing mills exclusively sell insulation batches in hundred-tonne lots",
      "Because building regulations mandate the total demolition of any home fueled by gas or heating oil",
      "Because homeowners obstinately refuse to adjust their baseline thermostat heating settings",
      "Because addressing the complete building envelope and mechanics guarantees dramatic utility bill drops"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q29",
    "paperNumber": 3,
    "questionNumber": 29,
    "typology": "GRAND_ENTRETIEN",
    "level": "B2",
    "title": "Grand Entretien : Métaux critiques — Le paradoxe de la dépendance minérale",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : Docteur Alexandre Mercier, vous êtes économiste des ressources à l'Institut des matières premières stratégiques. Dans votre nouvel essai, vous affirmez que la transition énergétique ne nous affranchit pas de l'extractivisme, mais le déplace. Que voulez-vous dire par là ?\nDr. Mercier : Bonjour Marc. On présente souvent les énergies renouvelables comme immatérielles, car le vent et le soleil sont gratuits. Mais capturer cette énergie exige des infrastructures physiques colossales : une voiture électrique réclame six fois plus de minéraux qu'un véhicule thermique, et une éolienne en mer nécessite des dizaines de tonnes de cuivre et de terres rares. En sortant de la dépendance aux hydrocarbures, nous basculons dans une ère d'hyper-dépendance aux métaux critiques.",
    "audioEn": "Marc: Dr. Alexandre Mercier, you are a resource economist at the Strategic Raw Materials Institute. In your new book, you argue that the energy transition does not free us from extractivism, but merely displaces it. What do you mean by that?\nDr. Mercier: Hello Marc. We often portray renewable energy as immaterial because wind and sunlight are free. But capturing that energy demands colossal physical infrastructure: an electric vehicle requires six times more mineral mass than a combustion car, and an offshore wind turbine requires tens of tonnes of copper and rare earths. By exiting fossil hydrocarbon dependency, we plunge into an era of hyper-dependency on critical minerals.",
    "questionFr": "Quel paradoxe fondamental le Dr. Mercier met-il en évidence dès le début de l'entretien ?",
    "questionEn": "What fundamental paradox does Dr. Mercier emphasize at the start of the interview?",
    "optionsFr": [
      "Le passage aux énergies vertes déplace la dépendance du pétrole vers une consommation massive de minerais",
      "L'énergie solaire coûte désormais dix fois plus cher à produire que le charbon thermique traditionnel",
      "Les voitures électriques n'ont besoin d'aucun composant métallique pour faire fonctionner leurs batteries",
      "La production éolienne mondiale a diminué en raison d'un manque persistant de vents côtiers"
    ],
    "optionsEn": [
      "Shifting to green energy shifts our reliance from petroleum to massive critical mineral consumption",
      "Solar electricity has now become ten times more expensive to generate than legacy thermal coal",
      "Electric automobiles require zero metallic hardware components to power their onboard battery packs",
      "Global wind turbine power output collapsed due to a persistent shortage of coastal ocean breezes"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q30",
    "paperNumber": 3,
    "questionNumber": 30,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : Métaux critiques — La concentration géographique du raffinage",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : Mais ces métaux ne sont-ils pas répartis de manière équitable sur la croûte terrestre ?\nDr. Mercier : L'extraction géologique est une chose, le raffinage chimique en est une autre, bien plus décisive. Aujourd'hui, un seul pays, la Chine, contrôle près de 70 % du raffinage mondial du lithium, 85 % des terres rares et 65 % du cobalt. Même lorsque les minerais sont extraits en Australie ou en République démocratique du Congo, ils transitent presque tous par des fonderies asiatiques pour être purifiés. Cette concentration industrielle asymétrique crée un goulet d'étranglement géopolitique inédit dans l'histoire moderne.",
    "audioEn": "Marc: But aren't these minerals fairly well distributed across the Earth's continental crust?\nDr. Mercier: Geological extraction is one thing; chemical refining is another, and far more decisive. Today, a single country, China, controls nearly 70% of global lithium refining, 85% of rare earths, and 65% of cobalt. Even when ores are extracted in Australia or the Democratic Republic of the Congo, almost all of them transit through Asian smelters for chemical processing. This asymmetric industrial concentration creates a geopolitical bottleneck unprecedented in modern history.",
    "questionFr": "Où réside la vulnérabilité géopolitique majeure soulignée par l'invité ?",
    "questionEn": "Where does the major geopolitical vulnerability highlighted by the guest lie?",
    "optionsFr": [
      "Dans l'absence totale de mines de cuivre et de lithium sur les continents américain et européen",
      "Dans l'impossibilité technique de transporter des minerais bruts par voie maritime transocéanique",
      "Dans le quasi-monopole exercé par une seule puissance sur les capacités de raffinage et de purification",
      "Dans la décision unanime des pays producteurs de cesser définitivement toute activité minière"
    ],
    "optionsEn": [
      "In the total absence of copper and lithium mines across the American and European continents",
      "In the technical impossibility of shipping raw mineral ores via commercial transoceanic vessels",
      "In the virtual monopoly held by a single nation over refining and chemical processing capacities",
      "In the unanimous pact of mineral-rich producer nations to shut down all mining extraction"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q31",
    "paperNumber": 3,
    "questionNumber": 31,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : Métaux critiques — L'impasse du recyclage à court terme",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : Le recyclage des batteries et des équipements en fin de vie ne suffira-t-il pas à nous rendre autonomes ?\nDr. Mercier : C'est une illusion d'optique temporelle ! Le recyclage est absolument indispensable à l'horizon 2040, mais nous sommes aujourd'hui dans une phase d'installation primaire des infrastructures. Les batteries mises en circulation aujourd'hui rouleront pendant dix à quinze ans avant de devenir des déchets recyclables. Dans l'intervalle, pour alimenter la croissance exponentielle de la demande de transition, nous n'avons d'autre choix que d'extraire des millions de tonnes de matière vierge du sous-sol.",
    "audioEn": "Marc: Won't recycling end-of-life battery packs and retired equipment suffice to make us self-sufficient?\nDr. Mercier: That is a temporal optical illusion! Recycling is absolutely imperative looking ahead to 2040, but we are currently in an initial primary infrastructure installation phase. The batteries deployed on roads today will operate for ten to fifteen years before turning into recyclable scrap feedstock. In the meantime, to feed exponentially surging transition demand, we have no alternative but to unearth millions of tonnes of virgin material from underground deposits.",
    "questionFr": "Pourquoi le recyclage ne peut-il pas résoudre la tension sur les métaux à court terme ?",
    "questionEn": "Why can't recycling resolve critical mineral pressures in the immediate short term?",
    "optionsFr": [
      "Parce que les technologies de séparation chimique détruisent définitivement les molécules de lithium",
      "Parce que le stock de matériel usagé disponible est pour l'instant insuffisant face aux besoins immédiats",
      "Parce que les gouvernements européens ont interdit le recyclage des batteries automobiles",
      "Parce que le coût énergétique du recyclage dépasse de loin celui de l'extraction de pétrole lourd"
    ],
    "optionsEn": [
      "Because chemical separation technologies irreversibly disintegrate lithium molecules during processing",
      "Because the volume of available end-of-life equipment is currently insufficient relative to urgent demand",
      "Because European national authorities enacted legislation banning the recycling of car batteries",
      "Because the energy requirements of battery recycling far exceed the extraction costs of heavy crude oil"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q32",
    "paperNumber": 3,
    "questionNumber": 32,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : Métaux critiques — Le tabou de la réouverture minière en Europe",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : Face à cela, plusieurs États européens envisagent de rouvrir des mines de lithium et de tungstène sur leur sol. Est-ce acceptable socialement ?\nDr. Mercier : C'est le grand impensé démocratique de nos sociétés occidentales. Nous voulons tous rouler en véhicule zéro émission et chauffer nos maisons avec des pompes à chaleur, mais nous refusons catégoriquement d'en assumer l'empreinte territoriale chez nous. Délocaliser la pollution minière dans des pays du Sud aux normes sociales et environnementales dégradées est une forme d'hypocrisie écologique insoutenable. Si l'Europe veut la souveraineté, elle doit accepter d'extraire chez elle, selon les standards environnementaux les plus exigeants de la planète.",
    "audioEn": "Marc: In response, several European governments are contemplating reopening lithium and tungsten mines on domestic soil. Is that socially acceptable?\nDr. Mercier: This is the glaring democratic blind spot of our Western societies. We all wish to drive zero-emission cars and heat our homes using geothermal heat pumps, yet we categorically refuse to shoulder the local footprint at home. Outsourcing mining degradation to developing Global South nations with lax environmental and labor laws is an untenable ecological hypocrisy. If Europe genuinely desires sovereignty, it must accept domestic mining under the most stringent environmental standards on the globe.",
    "questionFr": "Quelle contradiction éthique le Dr. Mercier dénonce-t-il chez les pays occidentaux ?",
    "questionEn": "What ethical contradiction does Dr. Mercier expose within Western nations?",
    "optionsFr": [
      "Leur désir de subventionner massivement les compagnies pétrolières au détriment des énergies solaires",
      "Leur volonté d'interdire l'achat de véhicules électriques aux ménages de la classe moyenne",
      "Leur refus d'adopter des technologies de chauffage modernes pour conserver les cheminées à bois",
      "Leur exigence de biens décarbonés tout en rejetant sur autrui les nuisances de l'extraction minière"
    ],
    "optionsEn": [
      "Their desire to massively subsidize oil drilling majors at the expense of residential solar arrays",
      "Their determination to prohibit middle-income families from buying roadworthy electric cars",
      "Their refusal to install modern heating infrastructure in order to maintain open-hearth wood fireplaces",
      "Their demand for zero-emission goods while dumping the environmental burdens of mining onto others"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q33",
    "paperNumber": 3,
    "questionNumber": 33,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : Métaux critiques — La sobriété matérielle incontournable",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : Ouvrir des mines européennes suffira-t-il pour autant à combler le déficit minéral prévisible ?\nDr. Mercier : Non, mathématiquement non. Même en multipliant les mines, la croissance exponentielle des usages dépasse les capacités d'approvisionnement géologique d'ici 2050. La véritable variable d'ajustement, c'est la sobriété dimensionnelle. Remplacer un million de SUV thermiques de deux tonnes par un million de SUV électriques de deux tonnes et demie avec des batteries surdimensionnées est une aberration physique. Il faut concevoir des véhicules légers, privilégier le transport ferroviaire et repenser l'urbanisme pour limiter les trajets contraints.",
    "audioEn": "Marc: Will opening European mines suffice to close the anticipated mineral supply gap?\nDr. Mercier: No, mathematically not. Even if we multiply new mines, exponential consumption outstrips geological supply limits between now and 2050. The authentic balancing lever is dimensional sobriety. Swapping one million two-tonne combustion SUVs for one million 2.5-tonne electric SUVs packing oversized battery packs is a physical absurdity. We must build lighter micro-vehicles, expand passenger rail, and redesign urban space to reduce commuting distances.",
    "questionFr": "Quelle orientation stratégique prioritaire le Dr. Mercier préconise-t-il ?",
    "questionEn": "What priority strategic direction does Dr. Mercier advocate?",
    "optionsFr": [
      "Augmenter la taille des batteries automobiles pour offrir deux mille kilomètres d'autonomie",
      "Réduire le poids et le gabarit des véhicules plutôt que de reproduire des excès consuméristes",
      "Interdire définitivement le transport ferroviaire de voyageurs pour laisser la place au fret",
      "Construire des autoroutes plus larges pour fluidifier la circulation des gros camions électriques"
    ],
    "optionsEn": [
      "Enlarging passenger car battery capacities to deliver two thousand kilometers of highway range",
      "Downsizing vehicle weight and battery footprint rather than replicating consumerist excess",
      "Abolishing passenger rail transit permanently to free up track capacity for mineral freight",
      "Constructing wider multi-lane highways to ease the flow of heavy battery-powered freight trucks"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q34",
    "paperNumber": 3,
    "questionNumber": 34,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : Métaux critiques — Message conclusif et lucidité",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste (Marc)",
      "Dr. Alexandre Mercier"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dr. Alexandre Mercier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Marc : En conclusion, docteur Mercier, quel message aimeriez-vous laisser à nos auditeurs et aux décideurs politiques ?\nDr. Mercier : Ne nous berçons pas de récits magiques où la technologie nous dispenserait de choisir. La transition écologique est une nécessité impérieuse face au chaos climatique, mais elle n'est ni gratuite, ni indolore, ni écologiquement neutre. Plus tôt nous regarderons en face le coût matériel de nos modes de vie, plus nous serons capables de construire une souveraineté lucide et solidaire, plutôt que de subir les chocs géopolitiques à venir.",
    "audioEn": "Marc: In conclusion, Dr. Mercier, what message would you like to impart to our listeners and political policymakers?\nDr. Mercier: Let us not lull ourselves with magic narratives where tech absolves us from making tough choices. The ecological transition is an imperative necessity confronting climate disruption, but it is neither cost-free, painless, nor environmentally neutral. The sooner we face up to the physical material reality of our lifestyles, the better equipped we will be to build a lucid, collective sovereignty rather than being blindsided by coming geopolitical shocks.",
    "questionFr": "Quelle conclusion générale le Dr. Mercier formule-t-il sur la transition énergétique ?",
    "questionEn": "What overarching conclusion does Dr. Mercier draw regarding the energy transition?",
    "optionsFr": [
      "Elle permettra d'enrichir immédiatement tous les citoyens sans aucun effort d'adaptation",
      "Elle doit être suspendue indéfiniment en attendant l'invention de technologies parfaites",
      "Elle est indispensable mais requiert d'affronter avec lucidité ses exigences matérielles et écologiques",
      "Elle sera entièrement financée et gérée par les multinationales du secteur numérique"
    ],
    "optionsEn": [
      "It will effortlessly enrich all global citizens without demanding any lifestyle adjustments",
      "It must be indefinitely put on hold pending the eventual discovery of flawless technologies",
      "It is imperative yet demands confronting its physical and ecological costs with clear-eyed realism",
      "It will be entirely funded and managed by Silicon Valley multinational technology giants"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p3-co-q35",
    "paperNumber": 3,
    "questionNumber": 35,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Acte de parole — Critique théâtrale / Dérision satirique",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Un critique théâtral"
    ],
    "speakerPersonas": [
      {
        "role": "Critique théâtral",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "« La mise en scène a eu l'audace prodigieuse de nous infliger trois heures d'immobilité sépulcrale sous un éclairage blafard, où les acteurs chuchotaient des alexandrins déconstruits. Une performance assurément mémorable... surtout pour les fauteuils de velours du parterre, qui n'avaient jamais vu autant de spectateurs s'endormir avec un tel ensemble dès l'entracte. »",
    "audioEn": "\"The stage direction had the prodigious daring to inflict three hours of sepulchral immobility under drab fluorescent lighting upon us, with actors mumbling deconstructed alexandrines. A truly memorable performance... especially for the velvet orchestra stalls, which had never seen so many patrons falling asleep in such perfect unison by the intermission.\"",
    "questionFr": "Quel jugement le critique porte-t-il en réalité sur cette pièce de théâtre ?",
    "questionEn": "What judgment does the critic truly deliver regarding this theatrical play?",
    "optionsFr": [
      "Une admiration passionnée pour l'interprétation poétique et la mise en scène lumineuse",
      "Une recommandation pressante d'emmener des classes de collégiens assister au spectacle",
      "Une contestation syndicale portant sur les conditions de sécurité de la salle de spectacle",
      "Une dérision sarcastique fustigeant un spectacle prétentieux d'un ennui mortel"
    ],
    "optionsEn": [
      "A passionate admiration for the poetic acting performance and radiant lighting choices",
      "An urgent recommendation to take secondary school students to attend the evening show",
      "A labor union protest challenging the technical safety compliance of the playhouse auditorium",
      "A scathing satirical mockery excoriating a pretentious and desperately boring production"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q36",
    "paperNumber": 3,
    "questionNumber": 36,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Acte de parole — Conseil municipal / Réserve feutrée",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Une conseillère municipale d'opposition"
    ],
    "speakerPersonas": [
      {
        "role": "Conseillère municipale",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural"
      }
    ],
    "audioFr": "« Le projet de complexe aquatique métropolitain présenté par monsieur le maire séduit indéniablement par ses esquisses architecturales futuristes. Cela étant posé, engager les finances de notre collectivité sur un emprunt de quarante millions d'euros alors même que nos écoles primaires manquent d'enseignants me paraît témoigner d'un sens des priorités tout à fait singulier. »",
    "audioEn": "\"The metropolitan aquatic leisure complex presented by the mayor undeniably charms with its futuristic architectural renderings. That having been established, committing our municipality's finances to a forty-million-euro loan while our elementary schools are facing teacher shortages strikes me as displaying a most peculiar sense of priorities.\"",
    "questionFr": "Quelle est la portée communicative de cette déclaration politique ?",
    "questionEn": "What is the true communicative intent of this political statement?",
    "optionsFr": [
      "Une contestation acerbe du projet d'équipement jugé déconnecté des besoins essentiels de la population",
      "Un vote de confiance inconditionnel soutenant l'ensemble de la politique budgétaire du maire",
      "Une proposition technique d'agrandir encore le bassin olympique pour accueillir des compétitions mondiales",
      "Une demande de démission immédiate adressée au corps enseignant des écoles de la commune"
    ],
    "optionsEn": [
      "A caustic challenge against the leisure project deemed out of touch with citizens' basic needs",
      "An unconditional vote of confidence supporting the mayor's comprehensive financial roadmap",
      "A technical motion proposing to expand the Olympic swimming pool to host world championships",
      "An immediate resignation demand addressed to the municipality's elementary school teaching staff"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q37",
    "paperNumber": 3,
    "questionNumber": 37,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Négociation commerciale / Refus protocolaire",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le directeur des achats"
    ],
    "speakerPersonas": [
      {
        "role": "Directeur des achats",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "« Votre offre de composants électroniques présente des spécifications techniques dont notre département d'ingénierie a mesuré toute la pertinence. Pour autant, au vu de l'harmonisation de notre panel de fournisseurs pour la zone EMEA, nous sommes au regret de devoir ajourner l'ouverture de tout nouveau compte fournisseur pour cet exercice. »",
    "audioEn": "\"Your electronic component offering displays technical specifications of which our engineering department fully recognized the relevance. Nonetheless, in light of the harmonization of our preferred supplier panel for the EMEA zone, we regret that we must defer opening any new vendor account for this operating cycle.\"",
    "questionFr": "Quelle décision commerciale est formulée sous cette courtoisie d'usage ?",
    "questionEn": "What commercial decision is conveyed beneath this conventional etiquette?",
    "optionsFr": [
      "Une confirmation formelle de commande immédiate pour équiper toutes les usines du groupe",
      "Une fin de non-recevoir polie signifiant le rejet de la proposition commerciale",
      "Une menace de poursuites judiciaires pour violation de brevets technologiques",
      "Une invitation à fusionner les deux entreprises pour former un consortium international"
    ],
    "optionsEn": [
      "A formal purchase order confirmation to equip all manufacturing facilities across the group",
      "A polite but definitive rejection turning down the commercial vendor proposal",
      "A legal threat of court litigation for industrial technological patent infringement",
      "An invitation to merge both corporate entities into a joint international consortium"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p3-co-q38",
    "paperNumber": 3,
    "questionNumber": 38,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Réunion de direction / Feinte concession",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Le directeur financier"
    ],
    "speakerPersonas": [
      {
        "role": "Directeur financier",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "« J'entends bien l'argument de notre directrice marketing selon lequel lancer une campagne publicitaire mondiale sur les réseaux sociaux doperait notre notoriété auprès des jeunes. Mais dilapider la moitié de notre trésorerie opérationnelle dans des vidéos éphémères alors que nos usines manquent de fonds de roulement pour honorer les commandes en cours relève, à mon sens, d'une pure dérive suicidaire. »",
    "audioEn": "\"I hear our marketing director's argument that rolling out a global social media advertising campaign would boost brand recognition among young consumers. However, squandering half of our operational treasury on fleeting video spots when our factories lack working capital to fulfill existing orders amounts, in my view, to outright corporate suicide.\"",
    "questionFr": "Quel procédé oratoire l'orateur emploie-t-il pour rejeter la proposition ?",
    "questionEn": "What rhetorical device does the speaker employ to dismiss the proposal?",
    "optionsFr": [
      "Une adhésion enthousiaste et immédiate préconisant de doubler le budget marketing",
      "Une proposition de licencier sur-le-champ l'ensemble des salariés des chaînes d'assemblage",
      "Une analyse impartiale démontrant que les deux options sont financièrement équivalentes",
      "Une concession d'ouverture feinte suivie d'une disqualification virulente de la dépense"
    ],
    "optionsEn": [
      "An enthusiastic, immediate endorsement recommending doubling the marketing budget allocation",
      "A motion proposing the immediate dismissal of all manufacturing assembly line workers",
      "An impartial financial appraisal demonstrating that both alternatives are strictly equivalent",
      "A feigned opening concession immediately followed by a scathing dismissal of the expenditure"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p3-co-q39",
    "paperNumber": 3,
    "questionNumber": 39,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Commission environnementale / Avertissement réglementaire",
    "speakingRate": 1.07,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "L'inspectrice des installations classées"
    ],
    "speakerPersonas": [
      {
        "role": "Inspectrice",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "« L'exploitant du site chimique est libre d'estimer que le rehaussement des digues de rétention représente une dépense superflue au regard des crues historiques. Je me contenterai toutefois de souligner que les cours d'appel pénales n'ont pas pour habitude de faire preuve de mansuétude envers les dirigeants coupables de mise en danger délibérée de la vie d'autrui. »",
    "audioEn": "\"The chemical plant operator is entitled to deem heightening containment retention levees a superfluous expense in light of historical flood marks. I will, however, confine myself to noting that criminal appellate courts are not in the habit of showing leniency toward corporate officers guilty of deliberate endangerment of human lives.\"",
    "questionFr": "Quel avertissement solennel l'inspectrice adresse-t-elle à l'industriel ?",
    "questionEn": "What solemn warning does the environmental inspector issue to the industrial plant operator?",
    "optionsFr": [
      "Une menace explicite de lourdes sanctions pénales en cas de négligence coupable sur la sécurité",
      "Une promesse d'exemption fiscale pour récompenser les économies financières réalisées sur le site",
      "Une autorisation définitive d'augmenter le volume des rejets chimiques dans le fleuve voisin",
      "Une demande d'attribution de la médaille du mérite industriel à l'équipe de direction de l'usine"
    ],
    "optionsEn": [
      "An explicit threat of severe criminal prison sanctions in the event of culpable safety negligence",
      "A pledge of corporate tax exemptions to reward financial cost-cutting measures at the facility",
      "A definitive permit authorizing the expansion of chemical wastewater discharge into the river",
      "A nomination recommendation to award the industrial medal of merit to plant executive management"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p3-co-q40",
    "paperNumber": 3,
    "questionNumber": 40,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Débat architectural / Ironie caustique",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Un critique d'urbanisme"
    ],
    "speakerPersonas": [
      {
        "role": "Critique d'urbanisme",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "« Ériger une tour de verre réfléchissante de quarante étages en plein cœur d'un secteur sauvegardé du dix-huitième siècle sous prétexte de dialoguer avec l'histoire est un trait de génie conceptuel. Les riverains éblouis au troisième degré par la réverbération du soleil et privés de toute intimité sauront gré à notre jury d'avoir ainsi célébré la beauté brute du béton spéculatif. »",
    "audioEn": "\"Erecting a forty-story mirrored glass skyscraper right in the heart of an eighteenth-century heritage district under the pretext of conversing with history is a stroke of conceptual genius. Residents third-degree blinded by solar glare reflection and stripped of all domestic privacy will surely thank our jury for thus celebrating the raw beauty of speculative concrete.\"",
    "questionFr": "Quelle tonalité et quelle opinion le locuteur exprime-t-il sur ce projet immobilier ?",
    "questionEn": "What tone and opinion does the speaker convey regarding this real estate project?",
    "optionsFr": [
      "Un éloge vibrant et sincère louant l'intégration harmonieuse du verre moderne dans le quartier historique",
      "Une proposition technique d'ajouter dix étages supplémentaires pour héberger des réfugiés climatiques",
      "Une ironie féroce condamnant une construction disproportionnée défigurant le patrimoine et nuisant aux habitants",
      "Une demande formelle d'indemnisation financière destinée exclusivement aux membres du jury d'architecture"
    ],
    "optionsEn": [
      "A vibrant and sincere commendation praising the harmonious fusion of modern glass in the heritage quarter",
      "A technical proposal recommending adding ten additional stories to house displaced climate refugees",
      "A fierce sarcasm condemning an outsized development defacing cultural heritage and harming residents",
      "A formal request for personal financial compensation allocated exclusively to architecture jury members"
    ],
    "correctIndex": 2
  }
];
