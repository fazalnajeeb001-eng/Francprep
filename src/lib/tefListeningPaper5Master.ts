/**
 * 🇨🇦 Official TEF Canada Listening Master Bank (Paper 5 - 40 Questions)
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

export const TEF_PAPER_5_LISTENING_ITEMS: TefListeningItem[] = [
  {
    "id": "tef-p5-co-q01",
    "paperNumber": 5,
    "questionNumber": 1,
    "typology": "DESSINS",
    "level": "A1",
    "title": "Pressing — Dépôt d'une veste de costume pour nettoyage à sec",
    "speakingRate": 0.94,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Client",
      "Employée"
    ],
    "speakerPersonas": [
      {
        "role": "Client",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Employée",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Client : Bonjour madame, j'ai taché cette veste de costume avec de la sauce. Est-ce que ce sera prêt pour vendredi soir ?\nEmployée : Bonjour monsieur. Ne vous inquiétez pas, notre traitement à sec élimine parfaitement ce type de tache. Vous pourrez venir la chercher vendredi dès 16 heures.",
    "audioEn": "Customer: Hello ma'am, I stained this suit jacket with sauce. Will it be ready by Friday evening?\nClerk: Hello sir. Don't worry, our dry cleaning treatment removes this type of stain completely. You can pick it up Friday starting at 4:00 PM.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un horloger réparant les aiguilles d'une pendule ancienne dans son atelier",
      "Dessin B : Un agent de tri postal séparant des enveloppes dans des casiers numérotés",
      "Dessin C : Un client déposant une veste de costume sur le comptoir d'un pressing pour un nettoyage à sec",
      "Dessin D : Un conducteur payant son stationnement à la barrière de péage d'un parking"
    ],
    "optionsEn": [
      "Drawing A: A clockmaker repairing the hands of an antique pendulum clock in his workshop",
      "Drawing B: A mail sorting clerk distributing envelopes into numbered cubbies",
      "Drawing C: A customer dropping off a suit jacket at a dry cleaner's counter for dry cleaning",
      "Drawing D: A driver paying parking fees at an automated exit barrier"
    ],
    "correctIndex": 2,
    "mainImage": "/illustrations/tef/tef_p5_q1_c.png",
    "optionImages": [
      "/illustrations/tef/tef_p5_q1_a.png",
      "/illustrations/tef/tef_p5_q1_b.png",
      "/illustrations/tef/tef_p5_q1_c.png",
      "/illustrations/tef/tef_p5_q1_d.png"
    ]
  },
  {
    "id": "tef-p5-co-q02",
    "paperNumber": 5,
    "questionNumber": 2,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Atelier de cordonnerie — Réparation de semelles et talons",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Cliente",
      "Cordonnier"
    ],
    "speakerPersonas": [
      {
        "role": "Cliente",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      },
      {
        "role": "Cordonnier",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Cliente : Bonjour monsieur, est-ce que vous pourriez poser des patins en caoutchouc et refaire les deux talons de ces bottines ?\nCordonnier : Bonjour. Oui tout à fait, le cuir est en bon état. Venez les récupérer vendredi après-midi, ce sera prêt.",
    "audioEn": "Customer: Hello sir, could you put rubber protective soles and replace the two heels on these ankle boots?\nCobbler: Hello. Yes absolutely, the leather is in good shape. Come pick them up Friday afternoon, they will be ready.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un artisan cordonnier inspectant une botte en cuir sur son établi de travail",
      "Dessin B : Un céramiste façonnant une poterie en argile sur son tour de potier",
      "Dessin C : Un maçon posant une rangée de briques sur un chantier de rénovation",
      "Dessin D : Un luthier ajustant les cordes d'un violon dans son atelier musical"
    ],
    "optionsEn": [
      "Drawing A: A master cobbler inspecting a leather boot on his workshop workbench",
      "Drawing B: A ceramic artist shaping clay pottery on an electric pottery wheel",
      "Drawing C: A bricklayer aligning masonry blocks on a renovation construction site",
      "Drawing D: A luthier tuning and adjusting strings on a handcrafted violin"
    ],
    "correctIndex": 0,
    "mainImage": "/illustrations/tef/tef_p5_q2_a.png",
    "optionImages": [
      "/illustrations/tef/tef_p5_q2_a.png",
      "/illustrations/tef/tef_p5_q2_b.png",
      "/illustrations/tef/tef_p5_q2_c.png",
      "/illustrations/tef/tef_p5_q2_d.png"
    ]
  },
  {
    "id": "tef-p5-co-q03",
    "paperNumber": 5,
    "questionNumber": 3,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Agence de location de matériel nautique — Réservation de kayak de mer",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Client",
      "Moniteur"
    ],
    "speakerPersonas": [
      {
        "role": "Client",
        "gender": "male",
        "voiceId": "fr-CA-AntoineNeural"
      },
      {
        "role": "Moniteur",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Client : Bonjour, nous voudrions louer un kayak biplace pour faire le tour de la baie pendant deux heures.\nMoniteur : Parfait. Enfilez ces deux gilets de sauvetage obligatoires et prenez cette pochette étanche pour vos téléphones. Les pagaies sont sur le râtelier.",
    "audioEn": "Customer: Hello, we would like to rent a two-person kayak to paddle around the bay for two hours.\nInstructor: Perfect. Put on these two mandatory life jackets and take this waterproof pouch for your phones. The paddles are on the rack.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un archéologue dégageant avec précaution un fragment sur un site de fouilles",
      "Dessin B : Un chef d'orchestre dirigeant des musiciens lors d'une répétition classique",
      "Dessin C : Un mécanicien réparant le moteur d'une voiture sous un pont élévateur",
      "Dessin D : Un moniteur remettant des gilets de sauvetage et des pagaies de kayak sur un ponton de plage"
    ],
    "optionsEn": [
      "Drawing A: An archaeologist meticulously dusting artifacts at an excavation site",
      "Drawing B: A conductor leading musicians during an orchestral rehearsal",
      "Drawing C: A mechanic servicing a car engine beneath a hydraulic lift",
      "Drawing D: An instructor handing out life vests and kayak paddles at a beach pontoon"
    ],
    "correctIndex": 3,
    "mainImage": "/illustrations/tef/tef_p5_q3_d.png",
    "optionImages": [
      "/illustrations/tef/tef_p5_q3_a.png",
      "/illustrations/tef/tef_p5_q3_b.png",
      "/illustrations/tef/tef_p5_q3_c.png",
      "/illustrations/tef/tef_p5_q3_d.png"
    ]
  },
  {
    "id": "tef-p5-co-q04",
    "paperNumber": 5,
    "questionNumber": 4,
    "typology": "DESSINS",
    "level": "A2",
    "title": "Guichet de mairie — Retrait de passeport biométrique",
    "speakingRate": 0.95,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Usager",
      "Agente"
    ],
    "speakerPersonas": [
      {
        "role": "Usager",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      },
      {
        "role": "Agente",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Usager : Bonjour, j'ai reçu un message texte confirmant que mon nouveau passeport biométrique est disponible.\nAgente : Bonjour madame. Donnez-moi votre récépissé de dépôt et placez votre index droit sur le lecteur d'empreintes digitales pour la vérification.",
    "audioEn": "Citizen: Hello, I received a text message confirming that my new biometric passport is ready for pickup.\nClerk: Hello ma'am. Please hand me your application receipt and place your right index finger on the fingerprint scanner for verification.",
    "questionFr": "Regardez les 4 dessins. Quel dessin correspond à la conversation entendue ?",
    "questionEn": "Look at the 4 drawings. Which drawing corresponds to the conversation heard?",
    "optionsFr": [
      "Dessin A : Un commissaire-priseur adjugeant un tableau de maître d'un coup de marteau",
      "Dessin B : Une agente municipale vérifiant les empreintes digitales d'une usagère au guichet d'état civil",
      "Dessin C : Un régisseur réglant les projecteurs suspendus sur la scène d'un théâtre",
      "Dessin D : Un moniteur d'équitation ajustant une selle sur un poney dans un centre équestre"
    ],
    "optionsEn": [
      "Drawing A: An auctioneer striking the gavel to award an artwork at an art auction",
      "Drawing B: A municipal civil clerk verifying a citizen's fingerprint at a service counter",
      "Drawing C: A stage technician adjusting overhead spotlight beams in a theater auditorium",
      "Drawing D: A horse riding trainer adjusting a saddle on a pony at an equestrian club"
    ],
    "correctIndex": 1,
    "mainImage": "/illustrations/tef/tef_p5_q4_b.png",
    "optionImages": [
      "/illustrations/tef/tef_p5_q4_a.png",
      "/illustrations/tef/tef_p5_q4_b.png",
      "/illustrations/tef/tef_p5_q4_c.png",
      "/illustrations/tef/tef_p5_q4_d.png"
    ]
  },
  {
    "id": "tef-p5-co-q05",
    "paperNumber": 5,
    "questionNumber": 5,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Centre aquatique municipal — Vidange technique semestrielle et fermeture",
    "speakingRate": 0.96,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Répondeur"
    ],
    "speakerPersonas": [
      {
        "role": "Répondeur",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Vous êtes bien sur le répondeur de la piscine municipale des Dauphins. Nous informons nos usagers que l'établissement sera entièrement fermé du lundi 15 au dimanche 21 octobre inclus pour la vidange technique obligatoire et le nettoyage des bassins. Réouverture le lundi 22 dès 7 heures.",
    "audioEn": "You have reached the voicemail of the Dolphins Municipal Aquatic Center. We inform visitors that the facility will be completely closed from Monday October 15 to Sunday October 21 inclusive for mandatory technical draining and pool sanitizing. Reopening Monday the 22nd at 7:00 AM.",
    "questionFr": "Quel est le but principal de ce message téléphonique ?",
    "questionEn": "What is the main purpose of this telephone message?",
    "optionsFr": [
      "Lancer une campagne de recrutement de maîtres-nageurs pour la saison estivale",
      "Proposer des tarifs promotionnels sur les abonnements annuels de natation",
      "Organiser une compétition de water-polo interuniversitaire en accès libre",
      "Avertir de la fermeture temporaire des bassins pour entretien réglementaire"
    ],
    "optionsEn": [
      "Launch a lifeguard recruitment drive for the summer season",
      "Offer promotional discounted rates on annual swimming passes",
      "Organize an open-access intercollegiate water polo championship",
      "Warn visitors of a temporary pool facility closure for regulatory maintenance"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q06",
    "paperNumber": 5,
    "questionNumber": 6,
    "typology": "MESSAGES",
    "level": "A2",
    "title": "Laboratoire d'analyses médicales — Résultats disponibles en ligne",
    "speakingRate": 0.96,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Secrétaire"
    ],
    "speakerPersonas": [
      {
        "role": "Secrétaire",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Bonjour madame, laboratoire Bio-Santé. Vos analyses sanguines de ce matin sont terminées et validées par le biologiste. Vous pouvez consulter vos résultats dès maintenant sur notre portail sécurisé grâce à l'identifiant envoyé par SMS, ou passer les retirer au secrétariat avec votre carte vitale.",
    "audioEn": "Hello ma'am, Bio-Santé Laboratory. Your blood test from this morning is completed and approved by the pathologist. You can view your results now on our secure patient portal using the credentials sent via SMS, or pick them up at the front desk with your healthcare card.",
    "questionFr": "Pourquoi le laboratoire médical contacte-t-il cette patiente ?",
    "questionEn": "Why is the medical laboratory contacting this patient?",
    "optionsFr": [
      "Lui demander de refaire un prélèvement sanguin suite à une erreur technique",
      "L'informer de la disponibilité immédiate de ses résultats d'analyses",
      "Lui réclamer des justificatifs de mutuelle manquants dans son dossier",
      "L'alerter sur un changement d'adresse de l'antenne de dépistage"
    ],
    "optionsEn": [
      "Ask her to repeat a blood draw following a laboratory processing error",
      "Notify her of the immediate availability of her medical test results",
      "Request missing supplementary health insurance papers for her file",
      "Alert her to a change of address for the community testing clinic"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q07",
    "paperNumber": 5,
    "questionNumber": 7,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Compagnie aérienne — Retard de vol consécutif au brouillard givrant",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Agent aéroportuaire"
    ],
    "speakerPersonas": [
      {
        "role": "Agent aéroportuaire",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un épais brouillard givrant sur l'aéroport de destination à Montréal, le vol Air Boréal 412 initialement prévu à 14h30 est différé à 17h45. Un bon de rafraîchissement d'une valeur de quinze dollars est à retirer auprès du personnel en porte B12.",
    "audioEn": "Ladies and gentlemen, your attention please. Due to dense freezing fog at the destination airport in Montreal, Air Boréal flight 412 initially scheduled for 2:30 PM is delayed until 5:45 PM. A meal and refreshment voucher worth fifteen dollars can be collected from staff at gate B12.",
    "questionFr": "Quelle annonce est transmise aux passagers dans le terminal ?",
    "questionEn": "What announcement is conveyed to passengers in the airport terminal?",
    "optionsFr": [
      "Le report du décollage de plusieurs heures assorti de bons de collation",
      "L'annulation définitive du vol sans possibilité de réacheminement",
      "Le transfert immédiat des passagers vers la gare centrale en navette",
      "Une vérification supplémentaire de sécurité sur l'ensemble des bagages cabine"
    ],
    "optionsEn": [
      "A flight departure delay of several hours paired with refreshment vouchers",
      "The definitive cancellation of the flight with no rebooking options",
      "Immediate passenger transfer to the central train station via coach",
      "An additional mandatory security screening on all carry-on baggage"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q08",
    "paperNumber": 5,
    "questionNumber": 8,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Atelier de carrosserie automobile — Devis et pièces de rechange",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Garagiste"
    ],
    "speakerPersonas": [
      {
        "role": "Garagiste",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Bonjour monsieur, ici le garage Moderne. Nous avons démonté le pare-chocs avant de votre berline : l'optique de phare gauche et l'aile sont également fissurées. Les pièces d'origine sont en commande et arriveront jeudi. Le coût total s'élève à 640 euros, merci de nous rappeler pour donner votre accord.",
    "audioEn": "Hello sir, this is Garage Moderne. We disassembled the front bumper of your sedan: the left headlight unit and fender are also cracked. Original replacement parts are ordered and will arrive Thursday. The total cost is 640 euros; please call us back to confirm approval.",
    "questionFr": "Quel est le motif de cet appel téléphonique ?",
    "questionEn": "What is the reason for this phone call?",
    "optionsFr": [
      "Annoncer que le véhicule est entièrement réparé et disponible à l'accueil",
      "Signaler que le garage refuse de prendre en charge le véhicule accidenté",
      "Présenter les réparations complémentaires nécessaires et demander validation du devis",
      "Proposer une extension de garantie d'assurance auto tous risques"
    ],
    "optionsEn": [
      "Announce that the car is fully repaired and ready at reception",
      "State that the repair garage refuses to service the damaged vehicle",
      "Present additional required repairs and request formal quote approval",
      "Offer an extended comprehensive vehicle insurance warranty"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q09",
    "paperNumber": 5,
    "questionNumber": 9,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Syndic de copropriété — Travaux d'étanchéité de toiture et accès terrasses",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Gestionnaire"
    ],
    "speakerPersonas": [
      {
        "role": "Gestionnaire",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Avis aux résidents de l'immeuble Les Cèdres. Des travaux de réfection complète de l'étanchéité de la toiture-terrasse débuteront ce lundi pour une durée de trois semaines. Pour des impératifs stricts de sécurité, l'accès au dernier étage et aux terrasses privatives sera rigoureusement interdit pendant les heures de chantier.",
    "audioEn": "Notice to residents of Les Cèdres building. Complete rooftop waterproofing refurbishment will commence this Monday for a duration of three weeks. For strict safety compliance, access to top-floor balconies and rooftop terraces is prohibited during construction hours.",
    "questionFr": "Quelle consigne est communiquée aux copropriétaires ?",
    "questionEn": "What instruction is communicated to condominium residents?",
    "optionsFr": [
      "Respecter l'interdiction formelle d'accès aux terrasses supérieures pendant les travaux",
      "Évacuer l'immeuble durant l'ensemble des trois semaines du chantier",
      "Régler une cotisation extraordinaire par chèque avant la fin de la semaine",
      "Participer au vote d'assemblée générale sur le choix des matériaux de toiture"
    ],
    "optionsEn": [
      "Comply with a strict prohibition on accessing upper roof terraces during works",
      "Evacuate the apartment building throughout the entire three-week duration",
      "Pay an extraordinary assessment fee by check before the end of the week",
      "Attend an emergency general meeting vote on roofing material selection"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q10",
    "paperNumber": 5,
    "questionNumber": 10,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Centre de formation professionnelle — Report de session linguistique",
    "speakingRate": 0.98,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Coordinatrice"
    ],
    "speakerPersonas": [
      {
        "role": "Coordinatrice",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Bonjour monsieur, ici l'Institut des Langues Appliquées. Nous sommes au regret de vous informer que notre formateur pour le module de français des affaires est souffrant cette semaine. Votre session initiale du mercredi 8 octobre est donc décalée au mercredi 22 octobre aux mêmes horaires. Veuillez nous confirmer votre disponibilité.",
    "audioEn": "Hello sir, this is the Institute of Applied Languages. We regret to inform you that our instructor for the Business French module is ill this week. Your initial session on Wednesday October 8 is therefore rescheduled to Wednesday October 22 at the same hours. Please confirm your availability.",
    "questionFr": "Quel changement organisationnel est annoncé par l'institut ?",
    "questionEn": "What organizational change is announced by the institute?",
    "optionsFr": [
      "L'annulation définitive du cursus faute d'inscriptions suffisantes",
      "Le passage obligatoire de l'ensemble de la formation en visioconférence",
      "Le décalage d'un cours de deux semaines en raison de l'absence du professeur",
      "Une augmentation des frais de scolarité pour les cours particuliers"
    ],
    "optionsEn": [
      "Permanent cancellation of the course due to insufficient enrollment",
      "Mandatory transition of all training sessions to videoconferencing",
      "Rescheduling of a class by two weeks due to teacher illness",
      "An increase in tuition fees for individualized private tutoring"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q11",
    "paperNumber": 5,
    "questionNumber": 11,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Réseau de transport urbain — Perturbation sur la ligne de tramway T2",
    "speakingRate": 1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Annonceur réseau"
    ],
    "speakerPersonas": [
      {
        "role": "Annonceur réseau",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Alerte info trafic réseau Bus-Tram. En raison d'un incident technique sur les caténaires électriques à la station République, la circulation de la ligne de tramway T2 est interrompue entre les stations Gare Centrale et Université. Des bus de substitution identifiés Navette Tram circulent toutes les sept minutes au départ des arrêts signalés.",
    "audioEn": "Transit network traffic alert. Due to a technical overhead power cable incident at République station, tramway line T2 service is suspended between Central Station and University. Marked Tram Shuttle replacement buses run every seven minutes from designated street stops.",
    "questionFr": "Quelle information pratique est délivrée aux voyageurs du tramway ?",
    "questionEn": "What practical information is delivered to tram passengers?",
    "optionsFr": [
      "La gratuité intégrale de toutes les lignes de bus pendant le week-end",
      "La mise en place de bus de remplacement suite à une panne sur un tronçon",
      "L'obligation de composter deux titres de transport par voyageur",
      "La fermeture anticipée de l'ensemble du réseau dès 20 heures ce soir"
    ],
    "optionsEn": [
      "Free rides across all bus transit routes throughout the weekend",
      "Deployment of substitute buses following a power fault on a track section",
      "Mandatory validation of two tickets per passenger during peak times",
      "Early shutdown of the entire transit network starting at 8:00 PM tonight"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q12",
    "paperNumber": 5,
    "questionNumber": 12,
    "typology": "MESSAGES",
    "level": "B1",
    "title": "Service des impôts — Campagne de déclaration des biens immobiliers",
    "speakingRate": 1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Voix officielle"
    ],
    "speakerPersonas": [
      {
        "role": "Voix officielle",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Rappel de la Direction Générale des Finances Publiques. Tous les propriétaires de logements ont l'obligation légale de déclarer la situation d'occupation de leurs biens sur leur espace numérique personnel avant le 30 juin à minuit. Cette démarche permet d'identifier les résidences principales exonérées de taxe d'habitation.",
    "audioEn": "Reminder from the Public Revenue Directorate. All residential property owners are legally required to declare occupancy status on their personal online portal before June 30 at midnight. This filing identifies primary residences exempt from local housing tax.",
    "questionFr": "Que rappelle l'administration fiscale aux propriétaires de biens immobiliers ?",
    "questionEn": "What does the tax authority remind real estate owners to do?",
    "optionsFr": [
      "Payer un acompte exceptionnel de taxe foncière dans les trésoreries de quartier",
      "Mettre en vente leurs logements vacants sous peine d'expropriation",
      "Contester le montant de leur taxe d'enlèvement des ordures ménagères",
      "Remplir en ligne la déclaration obligatoire d'occupation avant la date limite"
    ],
    "optionsEn": [
      "Pay an exceptional advance property tax installment at local cash offices",
      "List vacant apartments for sale under penalty of municipal seizure",
      "Dispute the assessment calculation of their household waste collection fee",
      "Complete the mandatory online occupancy declaration before the deadline"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q13",
    "paperNumber": 5,
    "questionNumber": 13,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 1 (Thomas)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Thomas"
    ],
    "speakerPersonas": [
      {
        "role": "Thomas",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Thomas : C'est une mesure formidable pour concilier vie personnelle et vie professionnelle. Avec un jour de repos supplémentaire, on passe plus de temps avec ses enfants, on fait du sport, et on revient le lundi avec une énergie et une concentration décuplées. Toutes les études prouvent que la productivité ne baisse pas !",
    "audioEn": "Thomas: It's a wonderful measure for work-life balance. With an extra rest day, you spend more time with your children, exercise, and return Monday with tenfold energy and focus. Every study proves productivity does not decline!",
    "questionFr": "Quelle est l'opinion de Thomas sur la semaine de quatre jours ?",
    "questionEn": "What is Thomas's opinion regarding the four-day workweek?",
    "optionsFr": [
      "Totalement sceptique quant à la rentabilité économique globale",
      "Très enthousiaste, soulignant le bien-être personnel et le gain d'énergie",
      "Opposé car il craint une surcharge de travail insoutenable sur quatre jours",
      "Favorable uniquement si les salaires sont réduits proportionnellement"
    ],
    "optionsEn": [
      "Entirely skeptical regarding macroeconomic profitability",
      "Very enthusiastic, highlighting personal well-being and renewed energy",
      "Opposed because he fears an unbearable workload compression over four days",
      "Favorable only if salaries are trimmed proportionately"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q14",
    "paperNumber": 5,
    "questionNumber": 14,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 2 (Nathalie)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Nathalie"
    ],
    "speakerPersonas": [
      {
        "role": "Nathalie",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Nathalie : En théorie c'est séduisant, mais pour nous, petits commerçants et restaurateurs, c'est tout simplement inapplicable ! Si mes employés ne travaillent que quatre jours sans baisser leurs salaires, je devrai embaucher du personnel supplémentaire pour ouvrir six jours sur sept. Mes marges ne le supporteront jamais.",
    "audioEn": "Nathalie: In theory it sounds attractive, but for us, small shop owners and restaurateurs, it is completely unworkable! If my staff only work four days without pay cuts, I will have to hire extra staff to stay open six days a week. My margins could never handle it.",
    "questionFr": "Quelle est la position de Nathalie à l'égard de cette mesure ?",
    "questionEn": "What is Nathalie's position regarding this measure?",
    "optionsFr": [
      "Favorable car cela incitera les clients à consommer davantage en semaine",
      "Neutre en attendant les résultats d'expérimentations dans les grands groupes",
      "Optimiste sur la possibilité d'adapter les plannings du secteur de la restauration",
      "Formellement hostile en raison du surcoût d'embauche intenable pour le petit commerce"
    ],
    "optionsEn": [
      "Favorable because it will encourage customers to spend more on weekdays",
      "Neutral while awaiting experimental results in multinational corporations",
      "Optimistic about adapting scheduling logistics in the restaurant sector",
      "Formally hostile due to unsustainable staffing overheads for small retail"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q15",
    "paperNumber": 5,
    "questionNumber": 15,
    "typology": "MICRO_TROTTOIR",
    "level": "B1",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 3 (Sébastien)",
    "speakingRate": 1.02,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Sébastien"
    ],
    "speakerPersonas": [
      {
        "role": "Sébastien",
        "gender": "male",
        "voiceId": "fr-CA-AntoineNeural"
      }
    ],
    "audioFr": "Sébastien : Je suis pour, mais attention à la façon dont on l'applique ! Si c'est pour faire des journées de dix heures éreintantes du lundi au jeudi avec des réunions à n'en plus finir, on va droit au burn-out. Il faut véritablement réduire le temps de travail hebdomadaire à 32 heures réelles sans compression horaire.",
    "audioEn": "Sébastien: I'm in favor, but watch out for implementation! If it means grueling 10-hour days from Monday to Thursday packed with endless meetings, we are heading straight for burnout. We must genuinely reduce weekly working hours to 32 actual hours without hour-packing.",
    "questionFr": "Comment Sébastien envisage-t-il la mise en œuvre de cette réforme ?",
    "questionEn": "How does Sébastien view the implementation of this reform?",
    "optionsFr": [
      "Favorable sous réserve d'une baisse réelle à 32 heures sans journées de 10 heures",
      "Catégoriquement opposé car il préfère faire des heures supplémentaires payées",
      "Désintéressé car il exerce une activité indépendante non salariée",
      "Favorable au maintien de 39 heures compressées sur trois jours consécutifs"
    ],
    "optionsEn": [
      "Favorable subject to genuine 32-hour workweeks without crammed 10-hour workdays",
      "Categorically opposed because he prefers paid overtime hours",
      "Indifferent because he works as a freelance self-employed professional",
      "Favorable to keeping 39 hours compressed across three consecutive days"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q16",
    "paperNumber": 5,
    "questionNumber": 16,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 4 (Malika)",
    "speakingRate": 1.04,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Malika"
    ],
    "speakerPersonas": [
      {
        "role": "Malika",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Malika : D'un point de vue environnemental, c'est une opportunité majeure : un jour de transport en moins chaque semaine pour des millions de travailleurs, cela représente des économies considérables de carburant et une chute spectaculaire des émissions de gaz à effet de serre aux heures de pointe.",
    "audioEn": "Malika: From an environmental perspective, it is a major opportunity: one fewer commuting day per week for millions of workers represents substantial fuel savings and a dramatic drop in peak-hour greenhouse gas emissions.",
    "questionFr": "Quel argument prioritaire Malika avance-t-elle en faveur du dispositif ?",
    "questionEn": "What primary argument does Malika put forward in support of the initiative?",
    "optionsFr": [
      "La revalorisation salariale immédiate pour compenser l'effort des salariés",
      "La simplification administrative de la gestion des congés payés annuels",
      "Le bénéfice écologique direct lié à la suppression d'une journée de navette pendulaire",
      "L'obligation imposée aux entreprises d'investir dans des robots d'automatisation"
    ],
    "optionsEn": [
      "Immediate wage increases to compensate workers for increased pace",
      "Administrative streamlining of annual paid leave management",
      "Direct environmental benefits resulting from eliminating one weekly commuting day",
      "A mandate forcing corporations to invest heavily in factory automation robots"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q17",
    "paperNumber": 5,
    "questionNumber": 17,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenant 5 (François)",
    "speakingRate": 1.04,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "François"
    ],
    "speakerPersonas": [
      {
        "role": "François",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "François : Je crains que cette réforme ne creuse une fracture intolérable entre les cols blancs des bureaux, qui pourront télétravailler et organiser leurs 4 jours facilement, et les soignants, ouvriers du bâtiment ou chauffeurs-livreurs, pour qui la continuité de service empêchera tout aménagement. C'est une inégalité sociale en puissance.",
    "audioEn": "François: I fear this reform will widen an intolerable divide between white-collar office staff who can easily telework and organize four days, and healthcare workers, builders, or delivery drivers whose continuous service demands preclude adjustments. It's a looming social injustice.",
    "questionFr": "Quelle réserve majeure François exprime-t-il ?",
    "questionEn": "What major reservation does François express?",
    "optionsFr": [
      "La baisse inévitable de la qualité des produits exportés à l'international",
      "Le manque d'équipements informatiques pour les salariés à domicile",
      "Le risque de voir les banques refuser les crédits immobiliers aux salariés",
      "Le creusement d'inégalités entre cadres de bureau et personnels de terrain indispensables"
    ],
    "optionsEn": [
      "An inevitable decline in exported manufactured product quality",
      "A shortage of secure computer hardware for home telecommuters",
      "The risk of financial institutions denying residential mortgage loans",
      "The widening of disparities between white-collar staff and essential frontline workers"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q18",
    "paperNumber": 5,
    "questionNumber": 18,
    "typology": "MICRO_TROTTOIR",
    "level": "B2",
    "title": "Micro-Trottoir : Semaine de 4 jours — Intervenante 6 (Amandine)",
    "speakingRate": 1.04,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Amandine"
    ],
    "speakerPersonas": [
      {
        "role": "Amandine",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Amandine : Dans notre start-up, nous l'avons testée pendant six mois : le résultat a été spectaculaire ! Nos recrutements ont bondi, le taux d'absentéisme a chuté de moitié et les collaborateurs sont infiniment plus créatifs. C'est le meilleur levier d'attractivité pour fidéliser les jeunes talents.",
    "audioEn": "Amandine: In our tech startup, we tested it for six months: the outcome was spectacular! Job applications surged, sick leave dropped by half, and teammates are immensely more creative. It is the ultimate attraction magnet to retain young talent.",
    "questionFr": "Quel bilan Amandine dresse-t-elle de son expérience vécue ?",
    "questionEn": "What assessment does Amandine draw from her real-world trial?",
    "optionsFr": [
      "Une expérience mitigée marquée par des tensions internes sur les plannings",
      "Un succès remarquable en termes d'attractivité, de créativité et de baisse de l'absentéisme",
      "Un échec financier ayant contraint la direction à revenir aux cinq jours",
      "Un désintérêt des jeunes candidats qui privilégient les primes financières"
    ],
    "optionsEn": [
      "A mixed experience marred by internal team friction over shift schedules",
      "A remarkable success in terms of recruitment appeal, creativity, and reduced absenteeism",
      "A financial failure forcing management to revert back to five working days",
      "A lack of interest from young candidates who prefer cash bonuses"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q19",
    "paperNumber": 5,
    "questionNumber": 19,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Transition — La méthanisation agricole et la production de biométhane",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Journaliste"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "En recyclant les déjections d'élevage et les résidus de récolte dans des digesteurs hermétiques, plus de six cents exploitations agricoles françaises produisent désormais du biométhane injecté directement dans le réseau national de gaz. Cette filière valorise les déchets en fertilisant naturel tout en créant un revenu complémentaire stable et décarboné pour le monde rural.",
    "audioEn": "By fermenting livestock manure and crop residues in sealed anaerobic digesters, over six hundred French farming operations now produce biomethane injected directly into the national gas grid. This sector converts waste into organic fertilizer while providing farmers with a stable, low-carbon secondary revenue stream.",
    "questionFr": "Quel est le double bénéfice de la méthanisation agricole décrit dans le document ?",
    "questionEn": "What dual benefit of agricultural methanation is described in the recording?",
    "optionsFr": [
      "La valorisation agronomique des effluents et la diversification économique des agriculteurs",
      "La fin définitive de toute consommation d'engrais et l'abandon de l'élevage intensif",
      "La baisse des cours mondiaux du gaz naturel sur les marchés financiers",
      "L'interdiction des camions-citernes dans les départements ruraux"
    ],
    "optionsEn": [
      "Agronomic valorization of farm effluents and economic diversification for farmers",
      "The definitive end of all fertilizer consumption and immediate phase-out of livestock",
      "A plunge in international wholesale natural gas commodity prices",
      "A ban on pressurized road tanker trucks across rural provinces"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q20",
    "paperNumber": 5,
    "questionNumber": 20,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Santé — La télémédecine d'urgence en zones de haute montagne",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueuse",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Isolés par les tempêtes de neige ou l'éloignement géographique, les refuges et dispensaires alpins expérimentent des valises de télémédecine par satellite haute définition. Connectés en temps réel avec les urgentistes du CHU de Grenoble, les secouristes de haute montagne peuvent réaliser électrocardiogrammes et échographies guidées, décidant en quelques minutes d'un hélitreuillage vital.",
    "audioEn": "Isolated by blizzards or sheer geographic remoteness, Alpine mountain refuges and clinics are trialing high-definition satellite telemedicine kits. Connected in real-time with trauma specialists at Grenoble University Hospital, mountain rescuers perform guided ECGs and ultrasounds, deciding in minutes whether a vital helicopter evacuation is required.",
    "questionFr": "En quoi la télémédecine satellite révolutionne-t-elle le secours en montagne ?",
    "questionEn": "How does satellite telemedicine revolutionize alpine rescue operations?",
    "optionsFr": [
      "Elle supprime totalement l'intervention humaine des secouristes sur place",
      "Elle évite aux stations de ski de devoir entretenir des pistes d'hélicoptères",
      "Elle permet un télédiagnostic d'urgence pour arbitrer rapidement les évacuations critiques",
      "Elle remplace l'équipement radio classique par des téléphones grand public"
    ],
    "optionsEn": [
      "It completely eliminates the need for human on-site rescue teams",
      "It relieves ski resorts from the expense of maintaining helicopter landing pads",
      "It enables instant remote emergency diagnosis to decide on critical helicopter evacuations",
      "It replaces standard VHF tactical radios with commercial consumer smartphones"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q21",
    "paperNumber": 5,
    "questionNumber": 21,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Écologie urbaine — Les « cours oasis » dans les écoles primaires",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Journaliste"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Fini l'asphalte noir surchauffé qui transformait les récréations en fournaises estivales : plusieurs métropoles transforment leurs cours d'école en « cours oasis ». En desimperméabilisant les sols au profit de copeaux de bois, de noues végétales et d'arbres d'ombrage, la température ressentie baisse de 4 à 6 degrés tout en favorisant la biodiversité et l'infiltration naturelle des eaux pluviales.",
    "audioEn": "Gone is the overheated black asphalt turning recesses into summer ovens: several metropolitan areas are re-engineering schoolyards into \"oasis courtyards\". By replacing paved ground with wood mulch, planted drainage bioswales, and shade trees, ambient temperatures drop 4 to 6 degrees while bolstering biodiversity and natural rainwater absorption.",
    "questionFr": "Quel est l'objectif premier des aménagements en « cours oasis » ?",
    "questionEn": "What is the primary objective of \"oasis schoolyard\" urban redevelopments?",
    "optionsFr": [
      "Réduire les coûts de gardiennage des établissements scolaires",
      "Lutter contre les îlots de chaleur urbains et favoriser l'infiltration de l'eau",
      "Construire de nouvelles salles de classe préfabriquées dans les cours",
      "Interdire aux élèves toute activité physique pendant les récréations"
    ],
    "optionsEn": [
      "Cut building security maintenance costs for primary school properties",
      "Mitigate urban heat islands and promote natural soil stormwater infiltration",
      "Erect modular prefabricated classrooms within school playground spaces",
      "Prohibit students from engaging in physical play during school recesses"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q22",
    "paperNumber": 5,
    "questionNumber": 22,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Énergie de la mer — L'essor des hydroliennes sous-marines",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueur"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Contrairement à l'éolien ou au solaire soumis aux aléas météorologiques, les courants de marée présentent une régularité astronomique millimétrée. Immergées au large du Cotentin, les turbines hydroliennes captent l'énergie cinétique des courants marins pour injecter une électricité décarbonée et parfaitement prévisible, sans aucun impact visuel depuis le littoral.",
    "audioEn": "Unlike wind or solar power subject to erratic weather swings, tidal currents follow strict astronomical predictability. Submerged off the Cotentin peninsula, tidal stream turbines harvest the kinetic energy of ocean currents to supply predictable zero-carbon electricity with zero visual shoreline footprint.",
    "questionFr": "Quel atout distinctif des hydroliennes marines est souligné dans la chronique ?",
    "questionEn": "What distinctive advantage of tidal stream turbines is emphasized in the report?",
    "optionsFr": [
      "Leur coût de fabrication inférieur à celui de toutes les autres énergies",
      "Leur capacité à fonctionner exclusivement lors des tempêtes maritimes violentes",
      "La possibilité de les déplacer facilement d'un océan à l'autre chaque mois",
      "La prévisibilité mathématique absolue de la ressource et l'absence d'impact paysager"
    ],
    "optionsEn": [
      "Manufacturing costs far below all competing renewable energy sources",
      "An operational requirement to run solely during severe oceanic storm surges",
      "The ease of towing and redeploying them across oceans on a monthly cycle",
      "Total mathematical resource predictability combined with zero coastal visual impact"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q23",
    "paperNumber": 5,
    "questionNumber": 23,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Consommation — Le passeport numérique des produits textiles",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Journaliste"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Bientôt obligatoire sur tous les vêtements vendus dans l'Union européenne, le passeport numérique de produit prend la forme d'un code QR tissé dans l'étiquette. En le scannant, le consommateur accède à la traçabilité complète de l'article : origine géographique du coton, usines de filature et de teinture, empreinte carbone réelle et consignes précises de recyclage en fin de vie.",
    "audioEn": "Soon to become mandatory for all clothing sold across the European Union, the Digital Product Passport appears as a QR code woven into garment labels. Scanning it grants shoppers complete supply-chain traceability: cotton source, spinning and dye mills, carbon footprint, and end-of-life recycling guidance.",
    "questionFr": "À quoi servira concrètement le passeport numérique sur les vêtements ?",
    "questionEn": "What practical purpose will the garment Digital Product Passport serve?",
    "optionsFr": [
      "Fournir une transparence complète sur la chaîne de production et le recyclage",
      "Imposer le paiement d'une taxe douanière à chaque achat en boutique",
      "Bloquer la revente de vêtements d'occasion sur les plateformes entre particuliers",
      "Remplacer les cartes de crédit lors du passage en cabine d'essayage"
    ],
    "optionsEn": [
      "Provide complete transparency regarding the supply chain, footprint, and recycling",
      "Levy a mandatory customs tariff directly on consumers during checkout",
      "Prohibit the peer-to-peer resale of pre-owned garments on digital platforms",
      "Replace payment cards during automated fitting room checkouts"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q24",
    "paperNumber": 5,
    "questionNumber": 24,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Agronomie — La renaissance des haies bocagères",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueuse"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueuse",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Arrachées massivement lors des remembrements d'après-guerre pour faciliter le passage des grands tracteurs, les haies bocagères font leur grand retour dans les campagnes. Véritables barrières coupe-vent, elles freinent l'érosion des sols arables, retiennent l'eau dans les parcelles lors des sécheresses et abritent les insectes auxiliaires prédateurs des ravageurs de cultures.",
    "audioEn": "Ripped out en masse during postwar land consolidations to accommodate industrial tractors, hedgerows are making a strong comeback in rural landscapes. Acting as natural windbreaks, they curb topsoil erosion, retain ground moisture during drought, and house beneficial predator insects that combat crop pests.",
    "questionFr": "Quels rôles écologiques majeurs les haies bocagères remplissent-elles ?",
    "questionEn": "What primary ecological roles do agricultural hedgerows play?",
    "optionsFr": [
      "Augmenter la surface disponible pour la monoculture intensive de maïs",
      "Remplacer les clôtures électriques pour confiner le bétail en plein air",
      "Limiter l'érosion éolienne, préserver l'humidité et abriter des auxiliaires biologiques",
      "Accélérer l'évacuation rapide des eaux de pluie vers les fleuves"
    ],
    "optionsEn": [
      "Expand usable surface area for industrial monoculture grain crops",
      "Replace perimeter electric fences to pen free-range cattle outdoors",
      "Curb wind erosion, conserve soil moisture, and harbor natural pest predators",
      "Accelerate the fast drainage of runoff rainwater into major river basins"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q25",
    "paperNumber": 5,
    "questionNumber": 25,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Économie circulaire — Le retour de la consigne des bouteilles en verre",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Journaliste"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Plutôt que de broyer et refondre le verre à 1500 degrés dans des fours énergivores, plusieurs régions réimplantent des laveuses industrielles de bouteilles consignées. Lavée et réutilisée jusqu'à trente fois, une bouteille en verre consigne économise 75 % d'énergie et 33 % d'eau par rapport au recyclage traditionnel par refonte thermique.",
    "audioEn": "Rather than crushing and remelting glass at 1500°C in energy-hungry furnaces, multiple regions are reinstalling industrial bottle-washing hubs. Cleaned and reused up to thirty times, a returnable deposit bottle saves 75% energy and 33% water compared to conventional remelting recycling.",
    "questionFr": "Pourquoi le réemploi par consigne surpasse-t-il le recyclage traditionnel du verre ?",
    "questionEn": "Why does bottle deposit reuse outperform traditional glass recycling?",
    "optionsFr": [
      "Parce qu'il permet de fabriquer du verre incassable et beaucoup plus léger",
      "Parce qu'il réduit drastiquement l'énergie consommée en évitant la refonte thermique du matériau",
      "Parce qu'il supprime totalement la nécessité de nettoyer les bouteilles entre deux usages",
      "Parce qu'il oblige les consommateurs à n'acheter que des boissons produites localement"
    ],
    "optionsEn": [
      "Because it produces shatterproof glassware that is significantly lighter",
      "Because it drastically slashes energy use by avoiding thermal remelting",
      "Because it completely eliminates the need to sanitize bottles between uses",
      "Because it forces shoppers to purchase exclusively locally bottled drinks"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q26",
    "paperNumber": 5,
    "questionNumber": 26,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Logistique — La relance du fret ferroviaire nocturne",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueur"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Pour désengorger les autoroutes saturées et atteindre les objectifs de décarbonation du transport de marchandises, les opérateurs logistiques investissent dans des trains de fret express circulant la nuit. Un seul convoi ferroviaire de conteneurs retire l'équivalent de cinquante poids lourds des grands axes routiers, divisant par neuf les émissions de CO2 à la tonne transportée.",
    "audioEn": "To unclog crowded motorways and meet freight transport decarbonization goals, logistics carriers are investing in overnight express freight trains. A single container train replaces fifty diesel semi-trucks on major highway arteries, dividing CO2 emissions per ton-kilometer by nine.",
    "questionFr": "Quel argument décisif motive la relance des trains de fret nocturnes ?",
    "questionEn": "What decisive rationale motivates the revival of overnight freight trains?",
    "optionsFr": [
      "La gratuité totale des péages ferroviaires accordée par l'Union européenne",
      "L'interdiction future des livraisons de marchandises par véhicules utilitaires",
      "La transformation des wagons de marchandises en dortoirs pour les chauffeurs routiers",
      "Le retrait massif de camions des autoroutes et une division par neuf de l'empreinte carbone"
    ],
    "optionsEn": [
      "Total waiver of railway track access fees granted by the European Union",
      "A scheduled ban on all light commercial freight delivery vehicles",
      "Converting freight rolling stock into sleeper cabins for long-haul truck drivers",
      "Mass removal of trucks from motorways and a ninefold reduction in carbon emissions"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q27",
    "paperNumber": 5,
    "questionNumber": 27,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Territoires — Les tiers-lieux ruraux et la revitalisation villageoise",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Journaliste"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Installés dans d'anciennes gares réhabilitées ou d'anciens corps de ferme, les tiers-lieux se multiplient dans les zones rurales. Réunissant espace de cotravail en fibre optique, café associatif, atelier partagé de réparation et point relais pour les producteurs locaux, ils recréent du lien social tout en permettant aux actifs de vivre et travailler au vert.",
    "audioEn": "Housed in restored disused railway stations or historic farmsteads, community hubs are proliferating in rural towns. Combining fiber-optic coworking, cooperative cafes, shared repair workshops, and local farmer pickup lockers, they foster social vitality while enabling professionals to live and work locally.",
    "questionFr": "Quel rôle jouent les tiers-lieux dans la dynamique des campagnes ?",
    "questionEn": "What role do rural co-working and maker hubs play in village revitalization?",
    "optionsFr": [
      "Ils stimulent le lien social et l'activité économique en mutualisant services et travail",
      "Ils remplacent l'ensemble des administrations municipales et des bureaux de poste",
      "Ils imposent aux résidents de renoncer à l'usage de leurs véhicules individuels",
      "Ils servent exclusivement de résidences secondaires pour les cadres urbains"
    ],
    "optionsEn": [
      "They stimulate social connection and economic activity by pooling services and workspaces",
      "They replace municipal town halls and national post offices entirely",
      "They require all village residents to surrender private vehicle ownership",
      "They serve exclusively as seasonal secondary vacation homes for metropolitan executives"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q28",
    "paperNumber": 5,
    "questionNumber": 28,
    "typology": "REPORTAGE_DEBAT",
    "level": "B2",
    "title": "Chronique Innovation énergétique — Le stockage thermique par sels fondus",
    "speakingRate": 1.05,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Chroniqueur"
    ],
    "speakerPersonas": [
      {
        "role": "Chroniqueur",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Face à l'intermittence du solaire et de l'éolien, une technologie prometteuse utilise des mélanges de sels de nitrate portés à plus de 500 degrés dans d'immenses cuves calorifugées. Cette chaleur stockée pendant les heures de surproduction peut être convertie en vapeur pour alimenter des turbines électriques plusieurs heures après le coucher du soleil avec un rendement exceptionnel.",
    "audioEn": "To address wind and solar intermittency, a promising technology uses nitrate salt mixtures heated to over 500°C inside giant insulated thermal reservoirs. This heat accumulated during daytime overgeneration can drive steam turbines hours after sunset with exceptional thermal conversion efficiency.",
    "questionFr": "Quel est le principe technologique du stockage par sels fondus ?",
    "questionEn": "What is the core technical principle of molten-salt thermal energy storage?",
    "optionsFr": [
      "Dissoudre du sel marin dans l'eau potable pour alimenter des piles à hydrogène",
      "Remplacer les centrales nucléaires par des brûleurs à gaz d'appoint",
      "Conserver l'électricité sous forme de chaleur liquide à très haute température pour la restituer la nuit",
      "Refroidir les câbles souterrains des réseaux de distribution par cryogénie"
    ],
    "optionsEn": [
      "Dissolving sea salt in tap water to generate power for hydrogen fuel cells",
      "Replacing baseload nuclear power stations with auxiliary natural gas peakers",
      "Storing energy as high-temperature liquid heat to generate power hours later at night",
      "Cryogenically chilling underground utility distribution cables"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q29",
    "paperNumber": 5,
    "questionNumber": 29,
    "typology": "GRAND_ENTRETIEN",
    "level": "B2",
    "title": "Grand Entretien : IA & Travail intellectuel — Une rupture historique",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : Dre Vasseur, pendant des décennies, l'automatisation n'a touché que les tâches manuelles ou répétitives. Avec les modèles de langage génératifs, assiste-t-on à un basculement inédit ?\nDre Vasseur : Absolument. C'est la première fois dans l'histoire industrielle que la machine pénètre le cœur de l'expertise cognitive : la rédaction juridique, l'analyse financière, le diagnostic médical et le codage logiciel. Ce ne sont plus les ouvriers qui sont bousculés, mais les diplômés du supérieur.",
    "audioEn": "Journalist: Dr. Vasseur, for decades, automation solely disrupted manual or repetitive tasks. With generative large language models, are we witnessing an unprecedented turning point?\nDr. Vasseur: Absolutely. For the first time in industrial history, machinery penetrates the core of cognitive expertise: legal drafting, financial analysis, clinical diagnostics, and software development. It is no longer factory floor workers feeling the shockwaves, but university graduates.",
    "questionFr": "En quoi la vague actuelle d'IA diffère-t-elle des précédentes vagues d'automatisation ?",
    "questionEn": "How does the current wave of AI differ from prior waves of industrial automation?",
    "optionsFr": [
      "Elle n'affecte que les secteurs primaires de l'agriculture et de la pêche",
      "Elle concerne exclusivement les chaînes de montage et les usines de fabrication",
      "Elle réduit les rémunérations des travailleurs non qualifiés dans les services",
      "Elle automatise pour la première fois des compétences cognitives complexes et expertes"
    ],
    "optionsEn": [
      "It solely impacts primary economic sectors such as agriculture and fishing",
      "It exclusively affects factory assembly lines and manufacturing plants",
      "It depresses wage earnings for unskilled service sector workers",
      "It automates advanced cognitive expertise and high-qualification intellectual tasks for the first time"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q30",
    "paperNumber": 5,
    "questionNumber": 30,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : IA & Travail intellectuel — L'illusion du grand remplacement",
    "speakingRate": 1.06,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : Faut-il alors redouter une suppression massive et brutale d'emplois chez les cols blancs ?\nDre Vasseur : Les discours catastrophistes sur le « grand remplacement » des travailleurs par les algorithmes relèvent du fantasme marketing. L'IA ne détruit pas des métiers dans leur globalité, elle décompose des faisceaux de tâches. La question n'est pas de savoir si un avocat sera remplacé par une machine, mais comment un avocat équipé d'IA évincera celui qui la refuse.",
    "audioEn": "Journalist: Should we then fear a massive and abrupt wipeout of white-collar employment?\nDr. Vasseur: Catastrophic predictions regarding total worker replacement by algorithms are marketing hype. AI does not obliterate entire professions; it unpacks bundles of discrete tasks. The real question is not whether a machine replaces a lawyer, but how a lawyer augmented by AI outperforms one who refuses to use it.",
    "questionFr": "Quelle analyse Dre Vasseur porte-t-elle sur les prédictions de destruction d'emplois ?",
    "questionEn": "What analysis does Dr. Vasseur offer regarding job destruction predictions?",
    "optionsFr": [
      "Elle confirme la disparition totale et définitive de 80 % des professions libérales d'ici trois ans",
      "Elle réfute le remplacement intégral des métiers, soulignant plutôt la reconfiguration des tâches",
      "Elle conseille aux étudiants d'abandonner immédiatement les filières de droit et de médecine",
      "Elle préconise l'interdiction légale de tout logiciel génératif dans les entreprises"
    ],
    "optionsEn": [
      "She confirms the total and permanent wipeout of 80% of professional practices within three years",
      "She refutes wholesale career replacement, highlighting instead the reconfiguration of task sets",
      "She advises university students to abandon legal and medical academic tracks immediately",
      "She advocates a nationwide statutory ban on deploying generative software within corporations"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q31",
    "paperNumber": 5,
    "questionNumber": 31,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : IA & Travail intellectuel — Le risque de la perte de compétences",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : N'y a-t-il pas un péril insidieux à déléguer systématiquement la synthèse et la rédaction à l'IA ?\nDre Vasseur : C'est précisément là que réside le véritable danger : l'atrophie cognitive. Si les jeunes collaborateurs délèguent la rédaction d'analyses préliminaires ou le premier jet d'un code, comment développeront-ils l'esprit critique, la capacité d'abstraction et l'intuition qui ne s'acquièrent que par l'effort de la confrontation directe avec la complexité ?",
    "audioEn": "Journalist: Isn't there an insidious peril in systematically outsourcing synthesis and drafting to AI?\nDr. Vasseur: That is precisely where the genuine danger lies: cognitive atrophy. If junior associates delegate preliminary analysis or first-draft coding, how will they cultivate the critical discernment, abstraction skills, and intuition gained only through direct struggle with intellectual complexity?",
    "questionFr": "Quelle menace majeure Dre Vasseur identifie-t-elle pour les jeunes professionnels ?",
    "questionEn": "What major hazard does Dr. Vasseur identify for early-career professionals?",
    "optionsFr": [
      "Une chute des salaires d'embauche imposée par les régulations gouvernementales",
      "Une impossibilité technique d'accéder aux bibliothèques numériques universitaires",
      "L'atrophie de l'esprit critique et des capacités de raisonnement par excès de délégation",
      "Le risque de voir les ordinateurs surchauffer lors des sessions de travail intensives"
    ],
    "optionsEn": [
      "A drop in entry-level salary tiers dictated by federal regulatory bodies",
      "Technical lockouts barring access to university digital repository databases",
      "The atrophy of critical thinking and analytical reasoning caused by excessive task delegation",
      "The hardware danger of computer processors overheating during demanding workloads"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q32",
    "paperNumber": 5,
    "questionNumber": 32,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : IA & Travail intellectuel — La transformation de la valeur travail",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : Quelles qualités humaines deviendront alors les plus précieuses sur le marché du travail de demain ?\nDre Vasseur : Tout ce que l'algorithme ne peut ni ressentir ni arbitrer : l'empathie relationnelle, la créativité divergente, le discernement éthique et la capacité à poser les bonnes questions plutôt que de simplement collecter des réponses toutes faites. La valeur migre de l'exécution vers le jugement.",
    "audioEn": "Journalist: Which human faculties will then command the highest value in tomorrow's labor market?\nDr. Vasseur: Everything an algorithm can neither experience nor mediate: interpersonal empathy, divergent creativity, ethical judgment, and the discernment to formulate probing questions rather than merely querying canned answers. Value is migrating from procedural execution to qualitative judgment.",
    "questionFr": "Vers quelles aptitudes la valeur professionnelle est-elle appelée à se déplacer ?",
    "questionEn": "Toward which professional skill sets is economic value slated to shift?",
    "optionsFr": [
      "L'empathie, le discernement éthique, l'esprit d'interrogation et la créativité singulière",
      "La mémorisation mécanique de vastes bases de données chiffrées",
      "La maîtrise de la saisie au clavier à très haute vitesse",
      "La répétition fidèle de protocoles standardisés sans aucune improvisation"
    ],
    "optionsEn": [
      "Empathy, ethical discernment, probing inquiry, and genuine creative flair",
      "Rote memorization of massive factual datasets and statistical tables",
      "Mastery of high-speed typing and verbatim transcription entry",
      "Strict compliance with rigid standardized protocols without improvisation"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q33",
    "paperNumber": 5,
    "questionNumber": 33,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : IA & Travail intellectuel — La régulation et la transparence",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : Le cadre réglementaire européen, avec l'AI Act, est-il suffisant pour encadrer cette mutation ?\nDre Vasseur : Il pose des balises indispensables, notamment sur la transparence des données d'entraînement et la traçabilité des contenus générés. Mais la régulation ne doit pas se limiter au droit : les entreprises doivent instaurer une gouvernance éthique interne pour auditer les biais algorithmiques et garantir qu'un être humain garde toujours le dernier mot dans les décisions critiques.",
    "audioEn": "Journalist: Is the European statutory framework, with the AI Act, sufficient to govern this profound shift?\nDr. Vasseur: It establishes critical guardrails, particularly around training data transparency and generated content provenance. But regulation must reach beyond statutory law: enterprises must institute robust internal ethical governance to audit algorithmic bias and ensure human agency retains the final veto in consequential decisions.",
    "questionFr": "Que préconise Dre Vasseur au-delà des lois européennes ?",
    "questionEn": "What does Dr. Vasseur advocate beyond statutory European regulations?",
    "optionsFr": [
      "La fermeture de tous les centres de recherche en informatique sur le territoire national",
      "L'abandon des exigences de traçabilité pour ne pas ralentir les jeunes entreprises",
      "La délégation totale des décisions d'embauche et de licenciement aux algorithmes",
      "Une gouvernance éthique en entreprise garantissant un contrôle humain systématique"
    ],
    "optionsEn": [
      "The shutdown of all computer science research departments within national borders",
      "Scrapping traceability requirements to avoid hamstringing young tech startups",
      "Delegating hiring and layoff decisions entirely to automated predictive algorithms",
      "Internal enterprise ethics governance ensuring mandatory human oversight on key rulings"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q34",
    "paperNumber": 5,
    "questionNumber": 34,
    "typology": "GRAND_ENTRETIEN",
    "level": "C1",
    "title": "Grand Entretien : IA & Travail intellectuel — Conclusion et perspective",
    "speakingRate": 1.08,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 2,
    "speakers": [
      "Journaliste",
      "Dre Vasseur"
    ],
    "speakerPersonas": [
      {
        "role": "Journaliste",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      },
      {
        "role": "Dre Vasseur",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Journaliste : Un dernier mot, Dre Vasseur : face à ce tourbillon technologique, quel conseil donneriez-vous aux jeunes générations ?\nDre Vasseur : Ne soyez ni des technophobes effrayés qui se réfugient dans le déni, ni des consommateurs passifs béats devant la machine. Apprenez à dompter l'outil tout en cultivant votre singularité humaniste, votre culture générale et votre curiosité. C'est votre humanité, et non votre vitesse de calcul, qui fera votre irremplaçabilité.",
    "audioEn": "Journalist: A closing takeaway, Dr. Vasseur: faced with this technological whirlwind, what advice would you share with younger generations?\nDr. Vasseur: Be neither fearful technophobes hiding in denial, nor uncritical passive consumers bowing to machines. Learn to master the tool while cultivating humanist singularity, broad cultural literacy, and relentless curiosity. Your humanity, not your computational speed, will secure your indispensability.",
    "questionFr": "Quel message d'orientation Dre Vasseur adresse-t-elle aux jeunes actifs ?",
    "questionEn": "What guiding perspective does Dr. Vasseur address to upcoming professionals?",
    "optionsFr": [
      "Éviter toute formation technologique pour préserver une pureté intellectuelle totale",
      "Maîtriser l'outil technique tout en fortifiant sa singularité humaine et sa culture critique",
      "Se conformer strictement aux suggestions algorithmiques pour maximiser sa rentabilité",
      "S'orienter exclusivement vers des métiers manuels protégés de tout écran d'ordinateur"
    ],
    "optionsEn": [
      "Avoid all technology training to preserve pure intellectual detachment",
      "Master the technological tool while fortifying human distinctiveness and broad critical culture",
      "Conform strictly to algorithmic suggestions to maximize personal productivity metrics",
      "Pursue exclusively manual crafts entirely divorced from digital computer displays"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q35",
    "paperNumber": 5,
    "questionNumber": 35,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Acte de parole — Réunion de direction / Désaveu poli sous forme d'interrogation",
    "speakingRate": 1.1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Directeur"
    ],
    "speakerPersonas": [
      {
        "role": "Directeur",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Est-il véritablement raisonnable de consacrer les deux tiers de nos liquidités de trésorerie à l'acquisition d'une start-up dont le chiffre d'affaires n'a jamais dépassé celui d'une épicerie de quartier ?",
    "audioEn": "Is it genuinely reasonable to commit two-thirds of our available cash reserves to acquiring a startup whose annual turnover has never surpassed that of a corner grocery store?",
    "questionFr": "Quelle est l'intention implicite véritable de l'orateur ?",
    "questionEn": "What is the speaker's true underlying communicative intent?",
    "optionsFr": [
      "Exprimer une admiration sincère pour le dynamisme commercial de la jeune entreprise",
      "Proposer d'augmenter le montant de l'offre financière pour finaliser la transaction",
      "Désapprouver formellement le rachat en soulignant l'absurdité économique de l'opération",
      "Demander des informations complémentaires sur la rentabilité future du commerce de détail"
    ],
    "optionsEn": [
      "Express genuine admiration for the business momentum of the small firm",
      "Propose boosting the buyout offer to ensure swift closing of the deal",
      "Formally reject the acquisition by highlighting the economic absurdity of the proposed expenditure",
      "Inquire into future profitability projections within the corner retail grocery market"
    ],
    "correctIndex": 2
  },
  {
    "id": "tef-p5-co-q36",
    "paperNumber": 5,
    "questionNumber": 36,
    "typology": "ACTES_DE_PAROLE",
    "level": "C1",
    "title": "Acte de parole — Soutenance universitaire / Compliment de façade et rejet de fond",
    "speakingRate": 1.1,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Président de jury"
    ],
    "speakerPersonas": [
      {
        "role": "Président de jury",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "On ne peut que saluer le brio rhétorique et l'élégance stylistique de votre mémoire... Il est simplement regrettable que cette maestria verbale serve à dissimuler une indigence bibliographique aussi criante.",
    "audioEn": "One cannot fail to applaud the rhetorical brilliance and stylistic elegance of your dissertation... It is merely regrettable that this verbal flair serves to conceal such glaring bibliographic poverty.",
    "questionFr": "Quel jugement le président du jury porte-t-il sur le travail présenté ?",
    "questionEn": "What judgment does the dissertation committee chair pass on the candidate's submission?",
    "optionsFr": [
      "Une condamnation sévère du manque de rigueur scientifique malgré des qualités d'écriture",
      "Une approbation enthousiaste garantissant l'obtention des félicitations du jury",
      "Un encouragement chaleureux à publier immédiatement l'ouvrage sans modification",
      "Une invitation bienveillante à poursuivre ses études dans un département de littérature"
    ],
    "optionsEn": [
      "A scathing critique of scientific and bibliographic shallowness despite polished writing style",
      "An enthusiastic endorsement guaranteeing top honors from the examination panel",
      "A warm recommendation to publish the manuscript commercially without revision",
      "A polite invitation to transfer enrollment to a comparative literature faculty"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q37",
    "paperNumber": 5,
    "questionNumber": 37,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Négociation commerciale / Recadrage ferme sous politesse glaciale",
    "speakingRate": 1.12,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Négociatrice"
    ],
    "speakerPersonas": [
      {
        "role": "Négociatrice",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural"
      }
    ],
    "audioFr": "Nous vous remercions chaleureusement pour cette offre tarifaire pour le moins audacieuse... Permettez-nous cependant de vous rappeler qu'un partenariat suppose une communauté d'intérêts et non une tentative d'asphyxie unilatérale de votre sous-traitant.",
    "audioEn": "We warmly thank you for this pricing proposal which is audacious to say the least... Allow us however to remind you that a genuine partnership implies shared mutual interest rather than an attempt to strangle your subcontractor unilaterally.",
    "questionFr": "Quel acte de communication la négociatrice accomplit-elle dans cette réplique ?",
    "questionEn": "What communicative act does the negotiator perform in this statement?",
    "optionsFr": [
      "Une capitulation complète acceptant l'ensemble des conditions imposées par le client",
      "Une réplique cinglante dénonçant des exigences abusives sous un vernis de courtoisie",
      "Une demande d'arbitrage judiciaire auprès du tribunal de commerce pour rupture de pourparlers",
      "Une proposition de fusion amicale entre les deux entreprises partenaires"
    ],
    "optionsEn": [
      "Total surrender conceding to every single contract requirement dictated by the client",
      "A cutting rebuke denouncing predatory commercial demands beneath a veneer of icy etiquette",
      "A formal petition for judicial arbitration over wrongful termination of business talks",
      "A proposal for an amicable merger between the two commercial partners"
    ],
    "correctIndex": 1
  },
  {
    "id": "tef-p5-co-q38",
    "paperNumber": 5,
    "questionNumber": 38,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Conseil municipal / Ironie mordante sur une promesse électorale",
    "speakingRate": 1.12,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Conseiller d'opposition"
    ],
    "speakerPersonas": [
      {
        "role": "Conseiller d'opposition",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural"
      }
    ],
    "audioFr": "Promettre la gratuité universelle des transports scolaires tout en diminuant de 15 % les taxes locales relève d'une virtuosité budgétaire dont même les illusionnistes les plus réputés n'oseraient pas se vanter !",
    "audioEn": "Promising universal free school bus transit while concurrently slashing local tax revenue by 15% demonstrates an act of budgetary wizardry that even stage illusionists would hesitate to claim!",
    "questionFr": "Quelle posture l'élu d'opposition adopte-t-il vis-à-vis du projet de la majorité ?",
    "questionEn": "What stance does the opposition councilor take regarding the governing party's proposal?",
    "optionsFr": [
      "Un ralliement loyal aux orientations financières présentées en séance",
      "Une demande de suspension de séance pour recompter les suffrages exprimés",
      "Une invitation à embaucher des prestataires de spectacle pour les fêtes de fin d'année",
      "Une raillerie féroce dénonçant une promesse démagogique et financièrement intenable"
    ],
    "optionsEn": [
      "A loyal alignment endorsing the financial policy presented to council",
      "A formal procedural motion to suspend proceedings for a recount of tallied ballots",
      "A humorous suggestion to contract stage entertainment performers for civic winter galas",
      "A scathing mockery exposing an irresponsible, financially impossible populist promise"
    ],
    "correctIndex": 3
  },
  {
    "id": "tef-p5-co-q39",
    "paperNumber": 5,
    "questionNumber": 39,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Entretien d'évaluation / Mise en garde déguisée",
    "speakingRate": 1.12,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Directrice des ressources humaines"
    ],
    "speakerPersonas": [
      {
        "role": "Directrice des ressources humaines",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural"
      }
    ],
    "audioFr": "Votre indépendance d'esprit est une qualité fort estimable dans la recherche fondamentale... Il serait toutefois fâcheux qu'elle vous conduise à oublier que le respect des délais contractuels n'est pas une suggestion philosophique mais une clause obligatoire de votre maintien dans cette équipe.",
    "audioEn": "Your intellectual independence is a highly commendable attribute in basic scientific research... It would however be unfortunate if it led you to forget that meeting contract deadlines is not an optional philosophical prompt, but an enforceable condition of your continued employment.",
    "questionFr": "Quelle est la nature véritable du message adressé au collaborateur ?",
    "questionEn": "What is the true nature of the communication delivered to the employee?",
    "optionsFr": [
      "Un ultimatum solennel rappelant que le respect des échéances conditionne son poste",
      "Une proposition de promotion vers un poste de chercheur émérite indépendant",
      "Une invitation cordiale à animer des séminaires de réflexion philosophique en entreprise",
      "Une dispense totale d'obligations horaires pour favoriser sa créativité intellectuelle"
    ],
    "optionsEn": [
      "A stern ultimatum warning that strict adherence to delivery deadlines dictates his job security",
      "An offer of promotion to an independent senior research fellow chair",
      "A friendly invitation to lead lunchtime philosophical seminars within the corporate campus",
      "A total exemption from contractual working hours to foster uninhibited intellectual creativity"
    ],
    "correctIndex": 0
  },
  {
    "id": "tef-p5-co-q40",
    "paperNumber": 5,
    "questionNumber": 40,
    "typology": "ACTES_DE_PAROLE",
    "level": "C2",
    "title": "Acte de parole — Débat télévisé / Réfutation péremptoire par l'absurde",
    "speakingRate": 1.12,
    "prepTimeSeconds": 10,
    "answerTimeSeconds": 15,
    "speakerCount": 1,
    "speakers": [
      "Éditorialiste"
    ],
    "speakerPersonas": [
      {
        "role": "Éditorialiste",
        "gender": "male",
        "voiceId": "fr-FR-AlainNeural"
      }
    ],
    "audioFr": "Prétendre relancer la natalité en interdisant les téléphones portables après vingt heures, voilà sans doute la trouvaille sociologique du siècle ! Pourquoi ne pas également rétablir le couvre-feu et la lampe à huile pour s'assurer que les couples n'aient d'autre distraction que la procréation ?",
    "audioEn": "Claiming to boost birth rates by outlawing smartphones after 8:00 PM is undoubtedly the sociological breakthrough of the century! Why not also reinstate mandatory curfews and kerosene oil lamps to ensure couples have no other recreation than procreation?",
    "questionFr": "Comment l'éditorialiste disqualifie-t-il la mesure proposée par son contradicteur ?",
    "questionEn": "How does the editorialist discredit his opponent's proposed policy measure?",
    "optionsFr": [
      "En présentant des données démographiques officielles collectées par l'INSEE",
      "En réclamant un temps de parole supplémentaire auprès de l'autorité de régulation audiovisuelle",
      "En poussant le raisonnement adverse jusqu'à l'absurde grotesque pour en révéler l'inanité",
      "En saluant l'audace novatrice de son adversaire politique avant d'exprimer une réserve mineure"
    ],
    "optionsEn": [
      "By presenting verified demographic statistics released by the national census bureau",
      "By demanding additional rebuttal speaking time from broadcast regulatory authorities",
      "By pushing his opponent's logic to grotesque absurdity to reveal its total foolishness",
      "By acknowledging his political rival's visionary originality before voicing minor technical caveats"
    ],
    "correctIndex": 2
  }
];
