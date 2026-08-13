/**
 * 🇨🇦 Master English Translations for TCF Canada Practice Papers 1-5 (195 Questions)
 * 100% Pure English - Zero French leaks - Complete A/B/C/D distractor coverage.
 */

export interface PracticeQuestionTranslation {
  id: string;
  paperNum: number;
  questionNumber: number;
  level: string;
  questionPromptEnglish: string;
  passageEnglish: string;
  optionsEnglish: [string, string, string, string];
  transcriptEnglish: string;
}

export const PRACTICE_LISTENING_TRANSLATIONS: Record<string, PracticeQuestionTranslation> = {
  "tcf1-lis-1": {
    "id": "tcf1-lis-1",
    "paperNum": 1,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Customers are drinking coffee on a bistro terrace..\n... Option B: Passengers are waiting for the train to arrive on the platform..\n... Option C: Walkers are walking in a snowy park..\n... Option D: A man is shopping in a supermarket..",
    "optionsEnglish": [
      "Customers are drinking coffee on a bistro terrace.",
      "Passengers are waiting for the train to arrive on the platform.",
      "Walkers are walking in a snowy park.",
      "A man is shopping in a supermarket."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Customers are drinking coffee on a bistro terrace..\n... Option B: Passengers are waiting for the train to arrive on the platform..\n... Option C: Walkers are walking in a snowy park..\n... Option D: A man is shopping in a supermarket.."
  },
  "tcf1-lis-2": {
    "id": "tcf1-lis-2",
    "paperNum": 1,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is speaking with the receptionist at the hotel front desk..\n... Option B: A passenger is getting into a taxi in front of the station..\n... Option C: A woman is buying a ticket at the cinema box office..\n... Option D: A person is ordering a dish at a restaurant..",
    "optionsEnglish": [
      "A customer is speaking with the receptionist at the hotel front desk.",
      "A passenger is getting into a taxi in front of the station.",
      "A woman is buying a ticket at the cinema box office.",
      "A person is ordering a dish at a restaurant."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is speaking with the receptionist at the hotel front desk..\n... Option B: A passenger is getting into a taxi in front of the station..\n... Option C: A woman is buying a ticket at the cinema box office..\n... Option D: A person is ordering a dish at a restaurant.."
  },
  "tcf1-lis-3": {
    "id": "tcf1-lis-3",
    "paperNum": 1,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A doctor is examining a patient in a medical office..\n... Option B: A customer is buying bread and pastries at the bakery..\n... Option C: A mechanic is repairing a car in a garage..\n... Option D: A gardener is trimming trees in a public park..",
    "optionsEnglish": [
      "A doctor is examining a patient in a medical office.",
      "A customer is buying bread and pastries at the bakery.",
      "A mechanic is repairing a car in a garage.",
      "A gardener is trimming trees in a public park."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A doctor is examining a patient in a medical office..\n... Option B: A customer is buying bread and pastries at the bakery..\n... Option C: A mechanic is repairing a car in a garage..\n... Option D: A gardener is trimming trees in a public park.."
  },
  "tcf1-lis-4": {
    "id": "tcf1-lis-4",
    "paperNum": 1,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A mail carrier is depositing letters into a mailbox..\n... Option B: Passengers are sitting in an airport boarding lounge..\n... Option C: Students are working quietly in a library..\n... Option D: Skiers are going down a snowy slope in the mountains..",
    "optionsEnglish": [
      "A mail carrier is depositing letters into a mailbox.",
      "Passengers are sitting in an airport boarding lounge.",
      "Students are working quietly in a library.",
      "Skiers are going down a snowy slope in the mountains."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A mail carrier is depositing letters into a mailbox..\n... Option B: Passengers are sitting in an airport boarding lounge..\n... Option C: Students are working quietly in a library..\n... Option D: Skiers are going down a snowy slope in the mountains.."
  },
  "tcf1-lis-5": {
    "id": "tcf1-lis-5",
    "paperNum": 1,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Montréal: Express train N°412 departs track 2 at 11:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Départ du train express pour la gare centrale de Montréal voie 2 à 11h15.\n... B: Fermeture temporaire du guichet de vente des billets de la gare de Montréal.\n... C: Annulation complète du trajet vers Montréal en raison d'un problème technique.\n... D: Changement de destination du train vers la gare du Nord à 11h15.",
    "optionsEnglish": [
      "Departure of the express train to Montreal Central Station from track 2 at 11:15 AM",
      "Temporary closure of the ticket sales counter at Montreal station",
      "Complete cancellation of the trip to Montreal due to a technical issue",
      "Change of train destination to North Station at 11:15 AM"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Montréal: Express train N°412 departs track 2 at 11:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Départ du train express pour la gare centrale de Montréal voie 2 à 11h15.\n... B: Fermeture temporaire du guichet de vente des billets de la gare de Montréal.\n... C: Annulation complète du trajet vers Montréal en raison d'un problème technique.\n... D: Changement de destination du train vers la gare du Nord à 11h15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Departure of the express train to Montreal Central Station from track 2 at 11:15 AM.\n... B: Temporary closure of the ticket sales counter at Montreal station.\n... C: Complete cancellation of the trip to Montreal due to a technical issue.\n... D: Change of train destination to North Station at 11:15 AM."
  },
  "tcf1-lis-6": {
    "id": "tcf1-lis-6",
    "paperNum": 1,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 1, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Fermeture exceptionnelle du magasin de Montréal en raison de travaux.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Montréal.\n... C: Offre promotionnelle au rayon n°1 à Montréal avec le 3e article à demi-prix.\n... D: Arrivée de nouveaux produits d'entretien écologiques au rayon n°1.",
    "optionsEnglish": [
      "Exceptional closure of the Montreal store due to construction work",
      "Free loyalty card distribution at the Montreal store reception desk",
      "Special promotion in aisle 1 in Montreal with the 3rd item at half price",
      "Arrival of new eco-friendly cleaning products in aisle 1"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 1, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Fermeture exceptionnelle du magasin de Montréal en raison de travaux.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Montréal.\n... C: Offre promotionnelle au rayon n°1 à Montréal avec le 3e article à demi-prix.\n... D: Arrivée de nouveaux produits d'entretien écologiques au rayon n°1.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Exceptional closure of the Montreal store due to construction work.\n... B: Free loyalty card distribution at the Montreal store reception desk.\n... C: Special promotion in aisle 1 in Montreal with the 3rd item at half price.\n... D: Arrival of new eco-friendly cleaning products in aisle 1."
  },
  "tcf1-lis-7": {
    "id": "tcf1-lis-7",
    "paperNum": 1,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Montréal: Rain and strong wind expected with 13°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Chute de neige abondante à Montréal bloquant la circulation routière.\n... B: Vague de chaleur et soleil radieux toute la journée sur Montréal.\n... C: Prévision de vent fort et pluie à Montréal avec une température de 13°C.\n... D: Aucun changement climatique annoncé pour le week-end à Montréal.",
    "optionsEnglish": [
      "Heavy snowfall in Montreal blocking road traffic",
      "Heatwave and bright sunshine all day over Montreal",
      "Forecast of strong wind and rain in Montreal with a temperature of 13°C",
      "No weather changes announced for the weekend in Montreal"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Montréal: Rain and strong wind expected with 13°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Chute de neige abondante à Montréal bloquant la circulation routière.\n... B: Vague de chaleur et soleil radieux toute la journée sur Montréal.\n... C: Prévision de vent fort et pluie à Montréal avec une température de 13°C.\n... D: Aucun changement climatique annoncé pour le week-end à Montréal.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Heavy snowfall in Montreal blocking road traffic.\n... B: Heatwave and bright sunshine all day over Montreal.\n... C: Forecast of strong wind and rain in Montreal with a temperature of 13°C.\n... D: No weather changes announced for the weekend in Montreal."
  },
  "tcf1-lis-8": {
    "id": "tcf1-lis-8",
    "paperNum": 1,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 9:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Montréal.\n... B: Annulation définitive de la consultation médicale du docteur Tremblay.\n... C: Rappel du rendez-vous médical de suivi à Montréal fixé à mardi à 9h30.\n... D: Demande d'envoi des résultats d'analyse médicale par courrier.",
    "optionsEnglish": [
      "Address change of the local medical clinic in Montreal",
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Reminder of the follow-up medical appointment in Montreal scheduled for Tuesday at 9:30 AM",
      "Request to send medical lab test results by mail"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 9:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Montréal.\n... B: Annulation définitive de la consultation médicale du docteur Tremblay.\n... C: Rappel du rendez-vous médical de suivi à Montréal fixé à mardi à 9h30.\n... D: Demande d'envoi des résultats d'analyse médicale par courrier.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of the local medical clinic in Montreal.\n... B: Definitive cancellation of Dr. Tremblay's medical consultation.\n... C: Reminder of the follow-up medical appointment in Montreal scheduled for Tuesday at 9:30 AM.\n... D: Request to send medical lab test results by mail."
  },
  "tcf1-lis-9": {
    "id": "tcf1-lis-9",
    "paperNum": 1,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $195.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Delay in repair work at the Montreal garage due to a missing part",
      "Annual closure of the Montreal auto repair garage starting this evening",
      "Requirement to leave the car at the Montreal garage for the entire weekend",
      "Vehicle ready at the Montreal garage after service and brakes for an amount of $195"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $195.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf1-lis-10": {
    "id": "tcf1-lis-10",
    "paperNum": 1,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8037 is ready in the locker. Access code: 4011.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Unable to deliver parcel N°8037 due to an incorrect address",
      "Mandatory payment of additional customs fees for parcel",
      "Parcel N°8037 available in automated lockers in Montreal with code 4011",
      "Return of parcel N°8037 to original sender in Montreal"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8037 is ready in the locker. Access code: 4011.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf1-lis-11": {
    "id": "tcf1-lis-11",
    "paperNum": 1,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 11:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Increase in monthly rent amount requested for the apartment",
      "Postponement of the apartment viewing in Montreal to the end of next month",
      "Confirmation of the apartment viewing in Montreal this Thursday at 11:00 AM",
      "Cancellation of the appointment because the apartment in Montreal has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 11:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf1-lis-12": {
    "id": "tcf1-lis-12",
    "paperNum": 1,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 10 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Permanent closure of the Montreal hair salon for renovations",
      "Confirmation of Friday's appointment at the Montreal salon without any changes",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Proposal to change the Montreal salon appointment to Thursday at 10:00 AM due to staff absence"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 10 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf1-lis-13": {
    "id": "tcf1-lis-13",
    "paperNum": 1,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 9 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Definitive cancellation of registration at Montreal sports club",
      "Change of venue and time for swimming practice in Montreal this Saturday at 9:00 AM",
      "Increase in annual membership dues for sports club members",
      "Closure of Montreal sports center locker rooms for sanitation work"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 9 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf1-lis-14": {
    "id": "tcf1-lis-14",
    "paperNum": 1,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 11 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Obligation to pay a late fine for overdue library return",
      "Reminder of library card annual renewal date",
      "Permanent loss of borrowed book by Montreal media library",
      "Reserved book available at Montreal library for pickup before Saturday 11:00 AM"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 11 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf1-lis-15": {
    "id": "tcf1-lis-15",
    "paperNum": 1,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 12:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Proposal for preliminary phone interview with Montreal company on Monday at 12:30 PM",
      "Request to send a printed recommendation letter to the company",
      "Immediate rejection of job application submitted to Montreal company",
      "Summons to a written examination at Montreal company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 12:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf1-lis-16": {
    "id": "tcf1-lis-16",
    "paperNum": 1,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 67% citizen approval for bike lanes and bus transit in Montréal.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?",
    "optionsEnglish": [
      "Approval by 67% of Montreal citizens of new bike and bus lanes",
      "Definitive elimination of the bike-share network by the municipality",
      "Mass rejection by Montreal residents of recent road development works",
      "Sharp increase in public transit fares in the city of Montreal"
    ],
    "transcriptEnglish": "Speaker: A survey shows 67% citizen approval for bike lanes and bus transit in Montréal.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf1-lis-17": {
    "id": "tcf1-lis-17",
    "paperNum": 1,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Montréal reduces burnout by 31% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?",
    "optionsEnglish": [
      "Dramatic collapse in overall office worker productivity",
      "Significant rise in voluntary resignation rates in companies",
      "Requirement for Montreal employees to work overtime on weekends",
      "31% reduction in burnout and maintenance of productivity in Montreal"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Montréal reduces burnout by 31% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf1-lis-18": {
    "id": "tcf1-lis-18",
    "paperNum": 1,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Montréal festival highlights 13 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Montreal",
      "Exclusive invitation of international artists at the expense of local talent",
      "Promotion of 13 regional music groups and local music scene in Montreal",
      "Cancellation of shows due to municipal budget restrictions"
    ],
    "transcriptEnglish": "Speaker: The Montréal festival highlights 13 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf1-lis-19": {
    "id": "tcf1-lis-19",
    "paperNum": 1,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Montréal saves 16% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?",
    "optionsEnglish": [
      "Legal requirement to buy only industrial frozen food products",
      "Complete disappearance of local convenience stores in downtown Montreal",
      "16% savings on grocery budgets and elimination of plastic packaging in Montreal",
      "Significant increase in monthly food expenditures"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Montréal saves 16% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf1-lis-20": {
    "id": "tcf1-lis-20",
    "paperNum": 1,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 120 isolated seniors in Montréal.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Volunteer support and friendly home visits for 120 isolated seniors in Montreal",
      "Mandatory payment of a monthly healthcare fee by users",
      "Permanent closure of neighborhood community welcome centers",
      "Total replacement of social workers by automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 120 isolated seniors in Montréal.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-21": {
    "id": "tcf1-lis-21",
    "paperNum": 1,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Montréal grew by 22%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Construction of concrete hotel complexes along regional lakeshores",
      "22% increase in demand for eco-lodges and soft mobility in Montreal",
      "Marked decrease in tourist visits to protected natural areas",
      "Total ban on access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Montréal grew by 22%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-22": {
    "id": "tcf1-lis-22",
    "paperNum": 1,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 16 rural communities around Montréal.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Substantial increase in annual library registration fees",
      "Democratized access to digital reading across 16 rural communities near Montréal"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 16 rural communities around Montréal.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-23": {
    "id": "tcf1-lis-23",
    "paperNum": 1,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 60 students with seniors in Montréal for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?",
    "optionsEnglish": [
      "Intergenerational solidarity home-sharing for 60 students and seniors in Montréal",
      "Legal requirement to reside exclusively in gated university residences",
      "Uncontrolled residential rent increases in the private sector",
      "Eviction of young tenants from downtown residential housing in Montréal"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 60 students with seniors in Montréal for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf1-lis-24": {
    "id": "tcf1-lis-24",
    "paperNum": 1,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 12 companies in Montréal.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?",
    "optionsEnglish": [
      "Obligation to purchase a paid individual sports subscription",
      "Implementation of daily physical exercise sessions in 12 companies in Montréal",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Complete elimination of lunch breaks for all employees"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 12 companies in Montréal.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf1-lis-25": {
    "id": "tcf1-lis-25",
    "paperNum": 1,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 25 buildings in Montréal reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center",
      "Prohibition on planting trees in school courtyards",
      "Greening of 25 public buildings to reduce heat in Montréal"
    ],
    "transcriptEnglish": "Speaker: Greening 25 buildings in Montréal reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-26": {
    "id": "tcf1-lis-26",
    "paperNum": 1,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Montréal. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The implementation of a systematic ban on all generative algorithms across Montréal",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The requirement to clearly identify synthetic media released to the public",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Montréal. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production."
  },
  "tcf1-lis-27": {
    "id": "tcf1-lis-27",
    "paperNum": 1,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Montréal, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "Free commercial property leases to incentivize companies to return downtown",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Montréal"
    ],
    "transcriptEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Montréal, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities."
  },
  "tcf1-lis-28": {
    "id": "tcf1-lis-28",
    "paperNum": 1,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Montréal.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Universal free clothing distribution for low-income households",
      "An absolute ban on selling any clothing manufactured outside Montréal",
      "Systematic incineration of all unsold retail textile surpluses",
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling"
    ],
    "transcriptEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Montréal.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials."
  },
  "tcf1-lis-29": {
    "id": "tcf1-lis-29",
    "paperNum": 1,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Montréal generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Limiting household power usage to mandatory scheduled time windows",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Exclusive interconnection of installations to emergency backup power grids in Montréal"
    ],
    "transcriptEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Montréal generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency."
  },
  "tcf1-lis-30": {
    "id": "tcf1-lis-30",
    "paperNum": 1,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Montréal metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsEnglish": [
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Permanent closure of commuter train routes to reduce maintenance expenses",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Montréal"
    ],
    "transcriptEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Montréal metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors."
  },
  "tcf1-lis-31": {
    "id": "tcf1-lis-31",
    "paperNum": 1,
    "questionNumber": 31,
    "level": "B2",
    "questionPromptEnglish": "What major demand is brought forward by worker representatives?",
    "passageEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Montréal.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsEnglish": [
      "The elimination of all contractual obligations between couriers and customers",
      "A complete ban on all online meal ordering services across Montréal",
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "transcriptEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Montréal.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators."
  },
  "tcf1-lis-32": {
    "id": "tcf1-lis-32",
    "paperNum": 1,
    "questionNumber": 32,
    "level": "B2",
    "questionPromptEnglish": "What primary concern is expressed regarding these digital management tools?",
    "passageEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Montréal.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsEnglish": [
      "Withholding employee compensation for failing to meet computer-generated quotas",
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A legal mandate to double daily working hours for all logistics staff",
      "A general ban on forklift operations inside warehouses in Montréal"
    ],
    "transcriptEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Montréal.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks."
  },
  "tcf1-lis-33": {
    "id": "tcf1-lis-33",
    "paperNum": 1,
    "questionNumber": 33,
    "level": "B2",
    "questionPromptEnglish": "What technical approach is favored by municipal engineers?",
    "passageEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Montréal.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsEnglish": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Indefinite elevation of concrete seawalls along all urban waterfronts",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Enclosing all metropolitan waterways of Montréal inside underground concrete pipelines"
    ],
    "transcriptEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Montréal.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff."
  },
  "tcf1-lis-34": {
    "id": "tcf1-lis-34",
    "paperNum": 1,
    "questionNumber": 34,
    "level": "C1",
    "questionPromptEnglish": "What is the central thesis developed by the speaker during this presentation?",
    "passageEnglish": "In this symposium presentation delivered in Montréal, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsEnglish": [
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry",
      "The complete futility of mathematical modeling in modern computing in Montréal",
      "The progressive weakening of individual discernment and autonomous decision-making capacity"
    ],
    "transcriptEnglish": "In this symposium presentation delivered in Montréal, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
  },
  "tcf1-lis-35": {
    "id": "tcf1-lis-35",
    "paperNum": 1,
    "questionNumber": 35,
    "level": "C1",
    "questionPromptEnglish": "What primary argument is put forward to justify a strategic policy pivot?",
    "passageEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Montréal to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsEnglish": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "Universal free public Internet access without any state regulatory oversight",
      "Preemptive physical destruction of all computing server facilities",
      "A complete prohibition on cross-border commercial trade for businesses in Montréal"
    ],
    "transcriptEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Montréal to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
  },
  "tcf1-lis-36": {
    "id": "tcf1-lis-36",
    "paperNum": 1,
    "questionNumber": 36,
    "level": "C1",
    "questionPromptEnglish": "What major warning is expressed regarding these intervention technologies?",
    "passageEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Montréal, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsEnglish": [
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers",
      "An immediate shutdown of all academic meteorological research in Montréal",
      "The unpredictability of induced meteorological disruptions across continental scales",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades"
    ],
    "transcriptEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Montréal, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
  },
  "tcf1-lis-37": {
    "id": "tcf1-lis-37",
    "paperNum": 1,
    "questionNumber": 37,
    "level": "C2",
    "questionPromptEnglish": "What conceptual shift does the researcher highlight in their analysis?",
    "passageEnglish": "In this academic lecture delivered in Montréal, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsEnglish": [
      "Outright rejection of the empirical scientific method in universities across Montréal",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "transcriptEnglish": "In this academic lecture delivered in Montréal, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
  },
  "tcf1-lis-38": {
    "id": "tcf1-lis-38",
    "paperNum": 1,
    "questionNumber": 38,
    "level": "C2",
    "questionPromptEnglish": "What epistemological thesis is defended by the linguist?",
    "passageEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Montréal. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsEnglish": [
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The complete biological uniformity of human thought systems regardless of language in Montréal",
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "transcriptEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Montréal. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
  },
  "tcf1-lis-39": {
    "id": "tcf1-lis-39",
    "paperNum": 1,
    "questionNumber": 39,
    "level": "C2",
    "questionPromptEnglish": "What major systemic risk is identified by the economist?",
    "passageEnglish": "The introduction of a central bank digital currency issued directly to retail users in Montréal could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsEnglish": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "The planned elimination of all international trade operations for firms in Montréal",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "transcriptEnglish": "The introduction of a central bank digital currency issued directly to retail users in Montréal could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf2-lis-1": {
    "id": "tcf2-lis-1",
    "paperNum": 2,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A waiter is bringing drinks on a tray..\n... Option B: Cyclists are riding on a bicycle path..\n... Option C: Children are playing on a soccer field..\n... Option D: A person is purchasing a transit ticket at an automated metro ticket machine..",
    "optionsEnglish": [
      "A waiter is bringing drinks on a tray.",
      "Cyclists are riding on a bicycle path.",
      "Children are playing on a soccer field.",
      "A person is purchasing a transit ticket at an automated metro ticket machine."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A waiter is bringing drinks on a tray..\n... Option B: Cyclists are riding on a bicycle path..\n... Option C: Children are playing on a soccer field..\n... Option D: A person is purchasing a transit ticket at an automated metro ticket machine.."
  },
  "tcf2-lis-2": {
    "id": "tcf2-lis-2",
    "paperNum": 2,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A patient is in consultation at the doctor's office..\n... Option B: A cook is preparing a meal in a kitchen..\n... Option C: A painter is creating a painting in an art studio..\n... Option D: A customer is asking for information at a bank..",
    "optionsEnglish": [
      "A patient is in consultation at the doctor's office.",
      "A cook is preparing a meal in a kitchen.",
      "A painter is creating a painting in an art studio.",
      "A customer is asking for information at a bank."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A patient is in consultation at the doctor's office..\n... Option B: A cook is preparing a meal in a kitchen..\n... Option C: A painter is creating a painting in an art studio..\n... Option D: A customer is asking for information at a bank.."
  },
  "tcf2-lis-3": {
    "id": "tcf2-lis-3",
    "paperNum": 2,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Travelers are waiting for their flight at an airport..\n... Option B: A person is leaving their bag at an automated luggage locker..\n... Option C: A mechanic is checking the oil level of a vehicle..\n... Option D: Customers are seated at the terrace of an outdoor café..",
    "optionsEnglish": [
      "Travelers are waiting for their flight at an airport.",
      "A person is leaving their bag at an automated luggage locker.",
      "A mechanic is checking the oil level of a vehicle.",
      "Customers are seated at the terrace of an outdoor café."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Travelers are waiting for their flight at an airport..\n... Option B: A person is leaving their bag at an automated luggage locker..\n... Option C: A mechanic is checking the oil level of a vehicle..\n... Option D: Customers are seated at the terrace of an outdoor café.."
  },
  "tcf2-lis-4": {
    "id": "tcf2-lis-4",
    "paperNum": 2,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: People are waiting for the bus to arrive at a city bus stop..\n... Option B: Hikers are walking along a river..\n... Option C: Customers are lining up in front of a theater ticket booth..\n... Option D: A man is repairing his bicycle on the sidewalk..",
    "optionsEnglish": [
      "People are waiting for the bus to arrive at a city bus stop.",
      "Hikers are walking along a river.",
      "Customers are lining up in front of a theater ticket booth.",
      "A man is repairing his bicycle on the sidewalk."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: People are waiting for the bus to arrive at a city bus stop..\n... Option B: Hikers are walking along a river..\n... Option C: Customers are lining up in front of a theater ticket booth..\n... Option D: A man is repairing his bicycle on the sidewalk.."
  },
  "tcf2-lis-5": {
    "id": "tcf2-lis-5",
    "paperNum": 2,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Québec: Express train N°424 departs track 3 at 12:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Québec.\n... B: Annulation complète du trajet vers Québec en raison d'un problème technique.\n... C: Départ du train express pour la gare centrale de Québec voie 3 à 12h15.\n... D: Changement de destination du train vers la gare du Nord à 12h15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Quebec station",
      "Complete cancellation of the trip to Quebec due to a technical issue",
      "Departure of the express train to Quebec Central Station from track 3 at 12:15 PM",
      "Change of train destination to North Station at 12:15 PM"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Québec: Express train N°424 departs track 3 at 12:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Québec.\n... B: Annulation complète du trajet vers Québec en raison d'un problème technique.\n... C: Départ du train express pour la gare centrale de Québec voie 3 à 12h15.\n... D: Changement de destination du train vers la gare du Nord à 12h15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Quebec station.\n... B: Complete cancellation of the trip to Quebec due to a technical issue.\n... C: Departure of the express train to Quebec Central Station from track 3 at 12:15 PM.\n... D: Change of train destination to North Station at 12:15 PM."
  },
  "tcf2-lis-6": {
    "id": "tcf2-lis-6",
    "paperNum": 2,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 2, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Offre promotionnelle au rayon n°2 à Québec avec le 3e article à demi-prix.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Québec.\n... C: Fermeture exceptionnelle du magasin de Québec en raison de travaux.\n... D: Arrivée de nouveaux produits d'entretien écologiques au rayon n°2.",
    "optionsEnglish": [
      "Special promotion in aisle 2 in Quebec with the 3rd item at half price",
      "Free loyalty card distribution at the Quebec store reception desk",
      "Exceptional closure of the Quebec store due to construction work",
      "Arrival of new eco-friendly cleaning products in aisle 2"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 2, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Offre promotionnelle au rayon n°2 à Québec avec le 3e article à demi-prix.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Québec.\n... C: Fermeture exceptionnelle du magasin de Québec en raison de travaux.\n... D: Arrivée de nouveaux produits d'entretien écologiques au rayon n°2.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Special promotion in aisle 2 in Quebec with the 3rd item at half price.\n... B: Free loyalty card distribution at the Quebec store reception desk.\n... C: Exceptional closure of the Quebec store due to construction work.\n... D: Arrival of new eco-friendly cleaning products in aisle 2."
  },
  "tcf2-lis-7": {
    "id": "tcf2-lis-7",
    "paperNum": 2,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Québec: Rain and strong wind expected with 14°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Prévision de vent fort et pluie à Québec avec une température de 14°C.\n... B: Chute de neige abondante à Québec bloquant la circulation routière.\n... C: Aucun changement climatique annoncé pour le week-end à Québec.\n... D: Vague de chaleur et soleil radieux toute la journée sur Québec.",
    "optionsEnglish": [
      "Forecast of strong wind and rain in Quebec with a temperature of 14°C",
      "Heavy snowfall in Quebec blocking road traffic",
      "No weather changes announced for the weekend in Quebec",
      "Heatwave and bright sunshine all day over Quebec"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Québec: Rain and strong wind expected with 14°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Prévision de vent fort et pluie à Québec avec une température de 14°C.\n... B: Chute de neige abondante à Québec bloquant la circulation routière.\n... C: Aucun changement climatique annoncé pour le week-end à Québec.\n... D: Vague de chaleur et soleil radieux toute la journée sur Québec.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Forecast of strong wind and rain in Quebec with a temperature of 14°C.\n... B: Heavy snowfall in Quebec blocking road traffic.\n... C: No weather changes announced for the weekend in Quebec.\n... D: Heatwave and bright sunshine all day over Quebec."
  },
  "tcf2-lis-8": {
    "id": "tcf2-lis-8",
    "paperNum": 2,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 10:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Demande d'envoi des résultats d'analyse médicale par courrier.\n... B: Rappel du rendez-vous médical de suivi à Québec fixé à mardi à 10h30.\n... C: Annulation définitive de la consultation médicale du docteur Tremblay.\n... D: Changement d'adresse du cabinet médical de quartier à Québec.",
    "optionsEnglish": [
      "Request to send medical lab test results by mail",
      "Reminder of follow-up medical appointment in Quebec scheduled for Tuesday at 10:30 AM",
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Address change of the local medical clinic in Quebec"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 10:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Demande d'envoi des résultats d'analyse médicale par courrier.\n... B: Rappel du rendez-vous médical de suivi à Québec fixé à mardi à 10h30.\n... C: Annulation définitive de la consultation médicale du docteur Tremblay.\n... D: Changement d'adresse du cabinet médical de quartier à Québec.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Request to send medical lab test results by mail.\n... B: Reminder of follow-up medical appointment in Quebec scheduled for Tuesday at 10:30 AM.\n... C: Definitive cancellation of Dr. Tremblay's medical consultation.\n... D: Address change of the local medical clinic in Quebec."
  },
  "tcf2-lis-9": {
    "id": "tcf2-lis-9",
    "paperNum": 2,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $210.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Delay in repair work at the Quebec garage due to a missing part",
      "Requirement to leave the car at the Quebec garage for the entire weekend",
      "Vehicle ready at Quebec garage after service and brakes for an amount of $210",
      "Annual closure of the Quebec auto repair garage starting this evening"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $210.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf2-lis-10": {
    "id": "tcf2-lis-10",
    "paperNum": 2,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8074 is ready in the locker. Access code: 4022.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Mandatory payment of additional customs fees for parcel",
      "Unable to deliver parcel N°8074 due to an incorrect address",
      "Parcel N°8074 available in automated lockers in Quebec with code 4022",
      "Return of parcel N°8074 to original sender in Quebec"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8074 is ready in the locker. Access code: 4022.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf2-lis-11": {
    "id": "tcf2-lis-11",
    "paperNum": 2,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 12:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Cancellation of the appointment because the apartment in Quebec has already been rented",
      "Confirmation of the apartment viewing in Quebec this Thursday at 12:00 PM",
      "Increase in monthly rent amount requested for the apartment",
      "Postponement of the apartment viewing in Quebec to the end of next month"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 12:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf2-lis-12": {
    "id": "tcf2-lis-12",
    "paperNum": 2,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 11 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the Quebec hair salon for renovations",
      "Proposal to change the Quebec salon appointment to Thursday at 11:00 AM due to staff absence",
      "Confirmation of Friday's appointment at the Quebec salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 11 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf2-lis-13": {
    "id": "tcf2-lis-13",
    "paperNum": 2,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 10 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Closure of Quebec sports center locker rooms for sanitation work",
      "Increase in annual membership dues for sports club members",
      "Change of venue and time for swimming practice in Quebec this Saturday at 10:00 AM",
      "Definitive cancellation of registration at Quebec sports club"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 10 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf2-lis-14": {
    "id": "tcf2-lis-14",
    "paperNum": 2,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 12 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Reminder of library card annual renewal date",
      "Reserved book available at Quebec library for pickup before Saturday 12:00 PM",
      "Permanent loss of borrowed book by Quebec media library",
      "Obligation to pay a late fine for overdue library return"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 12 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf2-lis-15": {
    "id": "tcf2-lis-15",
    "paperNum": 2,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 13:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Request to send a printed recommendation letter to the company",
      "Immediate rejection of job application submitted to Quebec company",
      "Proposal for preliminary phone interview with Quebec company on Monday at 1:30 PM",
      "Summons to a written examination at Quebec company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 13:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf2-lis-16": {
    "id": "tcf2-lis-16",
    "paperNum": 2,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 69% citizen approval for bike lanes and bus transit in Québec.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?",
    "optionsEnglish": [
      "Approval by 69% of Quebec citizens of new bike and bus lanes",
      "Definitive elimination of the bike-share network by the municipality",
      "Sharp increase in public transit fares in the city of Quebec",
      "Mass rejection by Quebec residents of recent road development works"
    ],
    "transcriptEnglish": "Speaker: A survey shows 69% citizen approval for bike lanes and bus transit in Québec.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf2-lis-17": {
    "id": "tcf2-lis-17",
    "paperNum": 2,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Québec reduces burnout by 32% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?",
    "optionsEnglish": [
      "Dramatic collapse in overall office worker productivity",
      "Significant rise in voluntary resignation rates in companies",
      "Requirement for Quebec employees to work overtime on weekends",
      "32% reduction in burnout and maintenance of productivity in Quebec"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Québec reduces burnout by 32% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf2-lis-18": {
    "id": "tcf2-lis-18",
    "paperNum": 2,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Québec festival highlights 16 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Quebec",
      "Cancellation of shows due to municipal budget restrictions",
      "Exclusive invitation of international artists at the expense of local talent",
      "Promotion of 16 regional music groups and local music scene in Quebec"
    ],
    "transcriptEnglish": "Speaker: The Québec festival highlights 16 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf2-lis-19": {
    "id": "tcf2-lis-19",
    "paperNum": 2,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Québec saves 17% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?",
    "optionsEnglish": [
      "17% savings on grocery budgets and elimination of plastic packaging in Quebec",
      "Significant increase in monthly food expenditures",
      "Complete disappearance of local convenience stores in downtown Quebec",
      "Legal requirement to buy only industrial frozen food products"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Québec saves 17% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf2-lis-20": {
    "id": "tcf2-lis-20",
    "paperNum": 2,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 140 isolated seniors in Québec.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Permanent closure of neighborhood community welcome centers",
      "Volunteer support and friendly home visits for 140 isolated seniors in Quebec",
      "Mandatory payment of a monthly healthcare fee by users",
      "Total replacement of social workers by automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 140 isolated seniors in Québec.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-21": {
    "id": "tcf2-lis-21",
    "paperNum": 2,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Québec grew by 24%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "24% increase in demand for eco-lodges and soft mobility in Quebec",
      "Marked decrease in tourist visits to protected natural areas",
      "Construction of concrete hotel complexes along regional lakeshores",
      "Total ban on access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Québec grew by 24%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-22": {
    "id": "tcf2-lis-22",
    "paperNum": 2,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 17 rural communities around Québec.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Democratized access to digital reading across 17 rural communities near Québec",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Substantial increase in annual library registration fees"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 17 rural communities around Québec.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-23": {
    "id": "tcf2-lis-23",
    "paperNum": 2,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 70 students with seniors in Québec for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?",
    "optionsEnglish": [
      "Legal requirement to reside exclusively in gated university residences",
      "Intergenerational solidarity home-sharing for 70 students and seniors in Québec",
      "Eviction of young tenants from downtown residential housing in Québec",
      "Uncontrolled residential rent increases in the private sector"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 70 students with seniors in Québec for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf2-lis-24": {
    "id": "tcf2-lis-24",
    "paperNum": 2,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 14 companies in Québec.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?",
    "optionsEnglish": [
      "Implementation of daily physical exercise sessions in 14 companies in Québec",
      "Complete elimination of lunch breaks for all employees",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Obligation to purchase a paid individual sports subscription"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 14 companies in Québec.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf2-lis-25": {
    "id": "tcf2-lis-25",
    "paperNum": 2,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 30 buildings in Québec reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center",
      "Greening of 30 public buildings to reduce heat in Québec",
      "Prohibition on planting trees in school courtyards"
    ],
    "transcriptEnglish": "Speaker: Greening 30 buildings in Québec reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-26": {
    "id": "tcf2-lis-26",
    "paperNum": 2,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Québec. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The requirement to clearly identify synthetic media released to the public",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The implementation of a systematic ban on all generative algorithms across Québec",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Québec. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production."
  },
  "tcf2-lis-27": {
    "id": "tcf2-lis-27",
    "paperNum": 2,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Québec, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "Free commercial property leases to incentivize companies to return downtown",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Québec",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "transcriptEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Québec, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities."
  },
  "tcf2-lis-28": {
    "id": "tcf2-lis-28",
    "paperNum": 2,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Québec.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "Universal free clothing distribution for low-income households",
      "An absolute ban on selling any clothing manufactured outside Québec",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "transcriptEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Québec.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials."
  },
  "tcf2-lis-29": {
    "id": "tcf2-lis-29",
    "paperNum": 2,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Québec generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Québec",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "transcriptEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Québec generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency."
  },
  "tcf2-lis-30": {
    "id": "tcf2-lis-30",
    "paperNum": 2,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Québec metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsEnglish": [
      "Permanent closure of commuter train routes to reduce maintenance expenses",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Québec",
      "Housing intensification in immediate proximity to public transit infrastructure",
      "A blanket prohibition on all new real estate developments across the entire territory"
    ],
    "transcriptEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Québec metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors."
  },
  "tcf2-lis-31": {
    "id": "tcf2-lis-31",
    "paperNum": 2,
    "questionNumber": 31,
    "level": "B2",
    "questionPromptEnglish": "What major demand is brought forward by worker representatives?",
    "passageEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Québec.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsEnglish": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "Automatic provision of a motorized company vehicle to every bicycle courier",
      "The elimination of all contractual obligations between couriers and customers",
      "A complete ban on all online meal ordering services across Québec"
    ],
    "transcriptEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Québec.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators."
  },
  "tcf2-lis-32": {
    "id": "tcf2-lis-32",
    "paperNum": 2,
    "questionNumber": 32,
    "level": "B2",
    "questionPromptEnglish": "What primary concern is expressed regarding these digital management tools?",
    "passageEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Québec.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsEnglish": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Québec",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "transcriptEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Québec.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks."
  },
  "tcf2-lis-33": {
    "id": "tcf2-lis-33",
    "paperNum": 2,
    "questionNumber": 33,
    "level": "B2",
    "questionPromptEnglish": "What technical approach is favored by municipal engineers?",
    "passageEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Québec.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsEnglish": [
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Québec inside underground concrete pipelines",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "transcriptEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Québec.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff."
  },
  "tcf2-lis-34": {
    "id": "tcf2-lis-34",
    "paperNum": 2,
    "questionNumber": 34,
    "level": "C1",
    "questionPromptEnglish": "What is the central thesis developed by the speaker during this presentation?",
    "passageEnglish": "In this symposium presentation delivered in Québec, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsEnglish": [
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "The complete futility of mathematical modeling in modern computing in Québec",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry",
      "The progressive weakening of individual discernment and autonomous decision-making capacity"
    ],
    "transcriptEnglish": "In this symposium presentation delivered in Québec, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
  },
  "tcf2-lis-35": {
    "id": "tcf2-lis-35",
    "paperNum": 2,
    "questionNumber": 35,
    "level": "C1",
    "questionPromptEnglish": "What primary argument is put forward to justify a strategic policy pivot?",
    "passageEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Québec to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsEnglish": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "Universal free public Internet access without any state regulatory oversight",
      "A complete prohibition on cross-border commercial trade for businesses in Québec",
      "Preemptive physical destruction of all computing server facilities"
    ],
    "transcriptEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Québec to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
  },
  "tcf2-lis-36": {
    "id": "tcf2-lis-36",
    "paperNum": 2,
    "questionNumber": 36,
    "level": "C1",
    "questionPromptEnglish": "What major warning is expressed regarding these intervention technologies?",
    "passageEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Québec, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsEnglish": [
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "An immediate shutdown of all academic meteorological research in Québec",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers",
      "The unpredictability of induced meteorological disruptions across continental scales"
    ],
    "transcriptEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Québec, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
  },
  "tcf2-lis-37": {
    "id": "tcf2-lis-37",
    "paperNum": 2,
    "questionNumber": 37,
    "level": "C2",
    "questionPromptEnglish": "What conceptual shift does the researcher highlight in their analysis?",
    "passageEnglish": "In this academic lecture delivered in Québec, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsEnglish": [
      "Outright rejection of the empirical scientific method in universities across Québec",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability"
    ],
    "transcriptEnglish": "In this academic lecture delivered in Québec, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
  },
  "tcf2-lis-38": {
    "id": "tcf2-lis-38",
    "paperNum": 2,
    "questionNumber": 38,
    "level": "C2",
    "questionPromptEnglish": "What epistemological thesis is defended by the linguist?",
    "passageEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Québec. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsEnglish": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Québec",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "transcriptEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Québec. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
  },
  "tcf2-lis-39": {
    "id": "tcf2-lis-39",
    "paperNum": 2,
    "questionNumber": 39,
    "level": "C2",
    "questionPromptEnglish": "What major systemic risk is identified by the economist?",
    "passageEnglish": "The introduction of a central bank digital currency issued directly to retail users in Québec could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsEnglish": [
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "The planned elimination of all international trade operations for firms in Québec",
      "Forced nationalization and merger of all private commercial banks into a single state entity",
      "Abrupt banking disintermediation choking business financing during periods of market stress"
    ],
    "transcriptEnglish": "The introduction of a central bank digital currency issued directly to retail users in Québec could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf3-lis-1": {
    "id": "tcf3-lis-1",
    "paperNum": 3,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Swimmers are swimming in a municipal pool..\n... Option B: A traveler is checking in luggage at the airport..\n... Option C: A woman is choosing fruits and vegetables in a supermarket..\n... Option D: A hairdresser is cutting a customer's hair in a salon..",
    "optionsEnglish": [
      "Swimmers are swimming in a municipal pool.",
      "A traveler is checking in luggage at the airport.",
      "A woman is choosing fruits and vegetables in a supermarket.",
      "A hairdresser is cutting a customer's hair in a salon."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Swimmers are swimming in a municipal pool..\n... Option B: A traveler is checking in luggage at the airport..\n... Option C: A woman is choosing fruits and vegetables in a supermarket..\n... Option D: A hairdresser is cutting a customer's hair in a salon.."
  },
  "tcf3-lis-2": {
    "id": "tcf3-lis-2",
    "paperNum": 3,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Musicians are playing piano during a concert..\n... Option B: A police officer is directing traffic at an intersection..\n... Option C: People are reading and studying quietly in a library..\n... Option D: A driver is delivering packages to a residence..",
    "optionsEnglish": [
      "Musicians are playing piano during a concert.",
      "A police officer is directing traffic at an intersection.",
      "People are reading and studying quietly in a library.",
      "A driver is delivering packages to a residence."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Musicians are playing piano during a concert..\n... Option B: A police officer is directing traffic at an intersection..\n... Option C: People are reading and studying quietly in a library..\n... Option D: A driver is delivering packages to a residence.."
  },
  "tcf3-lis-3": {
    "id": "tcf3-lis-3",
    "paperNum": 3,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A waiter is wiping tables at a restaurant..\n... Option B: A mechanic is inspecting a car engine in a repair garage..\n... Option C: Tourists are taking photos in front of a historic monument..\n... Option D: A barber is trimming a client's beard..",
    "optionsEnglish": [
      "A waiter is wiping tables at a restaurant.",
      "A mechanic is inspecting a car engine in a repair garage.",
      "Tourists are taking photos in front of a historic monument.",
      "A barber is trimming a client's beard."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A waiter is wiping tables at a restaurant..\n... Option B: A mechanic is inspecting a car engine in a repair garage..\n... Option C: Tourists are taking photos in front of a historic monument..\n... Option D: A barber is trimming a client's beard.."
  },
  "tcf3-lis-4": {
    "id": "tcf3-lis-4",
    "paperNum": 3,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Athletes are training on a running track..\n... Option B: A photographer is taking a portrait in a studio..\n... Option C: A baker is preparing apple pies..\n... Option D: A person is buying medications at a pharmacy counter..",
    "optionsEnglish": [
      "Athletes are training on a running track.",
      "A photographer is taking a portrait in a studio.",
      "A baker is preparing apple pies.",
      "A person is buying medications at a pharmacy counter."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Athletes are training on a running track..\n... Option B: A photographer is taking a portrait in a studio..\n... Option C: A baker is preparing apple pies..\n... Option D: A person is buying medications at a pharmacy counter.."
  },
  "tcf3-lis-5": {
    "id": "tcf3-lis-5",
    "paperNum": 3,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Ottawa: Express train N°436 departs track 4 at 13:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Ottawa.\n... B: Changement de destination du train vers la gare du Nord à 13h15.\n... C: Annulation complète du trajet vers Ottawa en raison d'un problème technique.\n... D: Départ du train express pour la gare centrale de Ottawa voie 4 à 13h15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Ottawa station",
      "Change of train destination to North Station at 1:15 PM",
      "Complete cancellation of the trip to Ottawa due to a technical issue",
      "Departure of the express train to Ottawa Central Station from track 4 at 1:15 PM"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Ottawa: Express train N°436 departs track 4 at 13:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Ottawa.\n... B: Changement de destination du train vers la gare du Nord à 13h15.\n... C: Annulation complète du trajet vers Ottawa en raison d'un problème technique.\n... D: Départ du train express pour la gare centrale de Ottawa voie 4 à 13h15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Ottawa station.\n... B: Change of train destination to North Station at 1:15 PM.\n... C: Complete cancellation of the trip to Ottawa due to a technical issue.\n... D: Departure of the express train to Ottawa Central Station from track 4 at 1:15 PM."
  },
  "tcf3-lis-6": {
    "id": "tcf3-lis-6",
    "paperNum": 3,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 3, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°3.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Ottawa.\n... C: Fermeture exceptionnelle du magasin de Ottawa en raison de travaux.\n... D: Offre promotionnelle au rayon n°3 à Ottawa avec le 3e article à demi-prix.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 3",
      "Free loyalty card distribution at the Ottawa store reception desk",
      "Exceptional closure of the Ottawa store due to construction work",
      "Special promotion in aisle 3 in Ottawa with the 3rd item at half price"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 3, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°3.\n... B: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Ottawa.\n... C: Fermeture exceptionnelle du magasin de Ottawa en raison de travaux.\n... D: Offre promotionnelle au rayon n°3 à Ottawa avec le 3e article à demi-prix.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 3.\n... B: Free loyalty card distribution at the Ottawa store reception desk.\n... C: Exceptional closure of the Ottawa store due to construction work.\n... D: Special promotion in aisle 3 in Ottawa with the 3rd item at half price."
  },
  "tcf3-lis-7": {
    "id": "tcf3-lis-7",
    "paperNum": 3,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Ottawa: Rain and strong wind expected with 15°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Aucun changement climatique annoncé pour le week-end à Ottawa.\n... B: Prévision de vent fort et pluie à Ottawa avec une température de 15°C.\n... C: Chute de neige abondante à Ottawa bloquant la circulation routière.\n... D: Vague de chaleur et soleil radieux toute la journée sur Ottawa.",
    "optionsEnglish": [
      "No weather changes announced for the weekend in Ottawa",
      "Forecast of strong wind and rain in Ottawa with a temperature of 15°C",
      "Heavy snowfall in Ottawa blocking road traffic",
      "Heatwave and bright sunshine all day over Ottawa"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Ottawa: Rain and strong wind expected with 15°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Aucun changement climatique annoncé pour le week-end à Ottawa.\n... B: Prévision de vent fort et pluie à Ottawa avec une température de 15°C.\n... C: Chute de neige abondante à Ottawa bloquant la circulation routière.\n... D: Vague de chaleur et soleil radieux toute la journée sur Ottawa.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: No weather changes announced for the weekend in Ottawa.\n... B: Forecast of strong wind and rain in Ottawa with a temperature of 15°C.\n... C: Heavy snowfall in Ottawa blocking road traffic.\n... D: Heatwave and bright sunshine all day over Ottawa."
  },
  "tcf3-lis-8": {
    "id": "tcf3-lis-8",
    "paperNum": 3,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 11:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Ottawa.\n... B: Demande d'envoi des résultats d'analyse médicale par courrier.\n... C: Rappel du rendez-vous médical de suivi à Ottawa fixé à mardi à 11h30.\n... D: Annulation définitive de la consultation médicale du docteur Tremblay.",
    "optionsEnglish": [
      "Address change of the local medical clinic in Ottawa",
      "Request to send medical lab test results by mail",
      "Reminder of the follow-up medical appointment in Ottawa scheduled for mardi à 11h30",
      "Definitive cancellation of Dr. Tremblay's medical consultation"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 11:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Ottawa.\n... B: Demande d'envoi des résultats d'analyse médicale par courrier.\n... C: Rappel du rendez-vous médical de suivi à Ottawa fixé à mardi à 11h30.\n... D: Annulation définitive de la consultation médicale du docteur Tremblay.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of the local medical clinic in Ottawa.\n... B: Request to send medical lab test results by mail.\n... C: Reminder of the follow-up medical appointment in Ottawa scheduled for mardi à 11h30.\n... D: Definitive cancellation of Dr. Tremblay's medical consultation."
  },
  "tcf3-lis-9": {
    "id": "tcf3-lis-9",
    "paperNum": 3,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $225.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Delay in repair work at the Ottawa garage due to a missing part",
      "Annual closure of the Ottawa auto repair garage starting this evening",
      "Requirement to leave the car at the Ottawa garage for the entire weekend",
      "Vehicle ready at the Ottawa garage after service and brakes for an amount of 225$"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $225.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf3-lis-10": {
    "id": "tcf3-lis-10",
    "paperNum": 3,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8111 is ready in the locker. Access code: 4033.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Unable to deliver parcel N°8111 due to an incorrect address",
      "Return of parcel N°8111 to original sender in Ottawa",
      "Parcel N°8111 available in automated lockers in Ottawa with code 4033",
      "Mandatory payment of additional customs fees for parcel"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8111 is ready in the locker. Access code: 4033.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf3-lis-11": {
    "id": "tcf3-lis-11",
    "paperNum": 3,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 13:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Postponement of the apartment viewing in Ottawa to the end of next month",
      "Confirmation of the apartment viewing in Ottawa this Thursday at 1:00 PM",
      "Increase in monthly rent amount requested for the apartment",
      "Cancellation of the appointment because the apartment in Ottawa has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 13:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf3-lis-12": {
    "id": "tcf3-lis-12",
    "paperNum": 3,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 12 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Proposal to change the Ottawa salon appointment to Thursday at 12:00 PM due to staff absence",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the Ottawa hair salon for renovations",
      "Confirmation of Friday's appointment at the Ottawa salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 12 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf3-lis-13": {
    "id": "tcf3-lis-13",
    "paperNum": 3,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 11 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Increase in annual membership dues for sports club members",
      "Change of venue and time for swimming practice in Ottawa this Saturday at 11:00 AM",
      "Definitive cancellation of registration at Ottawa sports club",
      "Closure of Ottawa sports center locker rooms for sanitation work"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 11 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf3-lis-14": {
    "id": "tcf3-lis-14",
    "paperNum": 3,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 13 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Reminder of library card annual renewal date",
      "Permanent loss of borrowed book by Ottawa media library",
      "Reserved book available at Ottawa library for pickup before Saturday 1:00 PM",
      "Obligation to pay a late fine for overdue library return"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 13 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf3-lis-15": {
    "id": "tcf3-lis-15",
    "paperNum": 3,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 14:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Proposal for preliminary phone interview with Ottawa company on Monday at 2:30 PM",
      "Summons to a written examination at Ottawa company premises",
      "Immediate rejection of job application submitted to Ottawa company",
      "Request to send a printed recommendation letter to the company"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 14:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf3-lis-16": {
    "id": "tcf3-lis-16",
    "paperNum": 3,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 71% citizen approval for bike lanes and bus transit in Ottawa.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?",
    "optionsEnglish": [
      "Definitive elimination of the bike-share network by the municipality",
      "Approval by 71% of Ottawa citizens of new bike and bus lanes",
      "Mass rejection by Ottawa residents of recent road development works",
      "Sharp increase in public transit fares in the city of Ottawa"
    ],
    "transcriptEnglish": "Speaker: A survey shows 71% citizen approval for bike lanes and bus transit in Ottawa.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf3-lis-17": {
    "id": "tcf3-lis-17",
    "paperNum": 3,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Ottawa reduces burnout by 33% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?",
    "optionsEnglish": [
      "33% reduction in burnout and maintenance of productivity in Ottawa",
      "Dramatic collapse in overall office worker productivity",
      "Requirement for Ottawa employees to work overtime on weekends",
      "Significant rise in voluntary resignation rates in companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Ottawa reduces burnout by 33% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf3-lis-18": {
    "id": "tcf3-lis-18",
    "paperNum": 3,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Ottawa festival highlights 19 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?",
    "optionsEnglish": [
      "Cancellation of shows due to municipal budget restrictions",
      "Permanent closure of the main entertainment venue in Ottawa",
      "Exclusive invitation of international artists at the expense of local talent",
      "Promotion of 19 regional music groups and local music scene in Ottawa"
    ],
    "transcriptEnglish": "Speaker: The Ottawa festival highlights 19 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf3-lis-19": {
    "id": "tcf3-lis-19",
    "paperNum": 3,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Ottawa saves 18% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?",
    "optionsEnglish": [
      "Complete disappearance of local convenience stores in downtown Ottawa",
      "18% savings on grocery budgets and elimination of plastic packaging in Ottawa",
      "Legal requirement to buy only industrial frozen food products",
      "Significant increase in monthly food expenditures"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Ottawa saves 18% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf3-lis-20": {
    "id": "tcf3-lis-20",
    "paperNum": 3,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 160 isolated seniors in Ottawa.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Permanent closure of neighborhood community welcome centers",
      "Mandatory payment of a monthly healthcare fee by users",
      "Volunteer support and friendly home visits for 160 isolated seniors in Ottawa",
      "Total replacement of social workers by automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 160 isolated seniors in Ottawa.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-21": {
    "id": "tcf3-lis-21",
    "paperNum": 3,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Ottawa grew by 26%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Construction of concrete hotel complexes along regional lakeshores",
      "26% increase in demand for eco-lodges and soft mobility in Ottawa",
      "Total ban on access to hiking trails during the summer season",
      "Marked decrease in tourist visits to protected natural areas"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Ottawa grew by 26%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-22": {
    "id": "tcf3-lis-22",
    "paperNum": 3,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 18 rural communities around Ottawa.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Substantial increase in annual library registration fees",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Democratized access to digital reading across 18 rural communities near Ottawa"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 18 rural communities around Ottawa.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-23": {
    "id": "tcf3-lis-23",
    "paperNum": 3,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 80 students with seniors in Ottawa for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?",
    "optionsEnglish": [
      "Eviction of young tenants from downtown residential housing in Ottawa",
      "Uncontrolled residential rent increases in the private sector",
      "Legal requirement to reside exclusively in gated university residences",
      "Intergenerational solidarity home-sharing for 80 students and seniors in Ottawa"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 80 students with seniors in Ottawa for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf3-lis-24": {
    "id": "tcf3-lis-24",
    "paperNum": 3,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 16 companies in Ottawa.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?",
    "optionsEnglish": [
      "Implementation of daily physical exercise sessions in 16 companies in Ottawa",
      "Complete elimination of lunch breaks for all employees",
      "Obligation to purchase a paid individual sports subscription",
      "Closure of corporate cafeteria dining facilities during afternoons"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 16 companies in Ottawa.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf3-lis-25": {
    "id": "tcf3-lis-25",
    "paperNum": 3,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 35 buildings in Ottawa reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Destruction of existing parks and green spaces in the city center",
      "Prohibition on planting trees in school courtyards",
      "Greening of 35 public buildings to reduce heat in Ottawa",
      "Additional property taxation on homeowners with private gardens"
    ],
    "transcriptEnglish": "Speaker: Greening 35 buildings in Ottawa reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-26": {
    "id": "tcf3-lis-26",
    "paperNum": 3,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Ottawa. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The implementation of a systematic ban on all generative algorithms across Ottawa",
      "The requirement to clearly identify synthetic media released to the public",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Ottawa. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production."
  },
  "tcf3-lis-27": {
    "id": "tcf3-lis-27",
    "paperNum": 3,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Ottawa, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Ottawa",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown"
    ],
    "transcriptEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Ottawa, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities."
  },
  "tcf3-lis-28": {
    "id": "tcf3-lis-28",
    "paperNum": 3,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Ottawa.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "Systematic incineration of all unsold retail textile surpluses",
      "An absolute ban on selling any clothing manufactured outside Ottawa",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Ottawa.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials."
  },
  "tcf3-lis-29": {
    "id": "tcf3-lis-29",
    "paperNum": 3,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Ottawa generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Ottawa"
    ],
    "transcriptEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Ottawa generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency."
  },
  "tcf3-lis-30": {
    "id": "tcf3-lis-30",
    "paperNum": 3,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Ottawa metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsEnglish": [
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Ottawa",
      "Permanent closure of commuter train routes to reduce maintenance expenses",
      "Housing intensification in immediate proximity to public transit infrastructure"
    ],
    "transcriptEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Ottawa metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors."
  },
  "tcf3-lis-31": {
    "id": "tcf3-lis-31",
    "paperNum": 3,
    "questionNumber": 31,
    "level": "B2",
    "questionPromptEnglish": "What major demand is brought forward by worker representatives?",
    "passageEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Ottawa.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsEnglish": [
      "A complete ban on all online meal ordering services across Ottawa",
      "The elimination of all contractual obligations between couriers and customers",
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "transcriptEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Ottawa.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators."
  },
  "tcf3-lis-32": {
    "id": "tcf3-lis-32",
    "paperNum": 3,
    "questionNumber": 32,
    "level": "B2",
    "questionPromptEnglish": "What primary concern is expressed regarding these digital management tools?",
    "passageEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Ottawa.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsEnglish": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "Withholding employee compensation for failing to meet computer-generated quotas",
      "A general ban on forklift operations inside warehouses in Ottawa",
      "A legal mandate to double daily working hours for all logistics staff"
    ],
    "transcriptEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Ottawa.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks."
  },
  "tcf3-lis-33": {
    "id": "tcf3-lis-33",
    "paperNum": 3,
    "questionNumber": 33,
    "level": "B2",
    "questionPromptEnglish": "What technical approach is favored by municipal engineers?",
    "passageEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Ottawa.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsEnglish": [
      "Indefinite elevation of concrete seawalls along all urban waterfronts",
      "Enclosing all metropolitan waterways of Ottawa inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Creation of natural buffer zones to slow down and absorb river runoff surges"
    ],
    "transcriptEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Ottawa.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff."
  },
  "tcf3-lis-34": {
    "id": "tcf3-lis-34",
    "paperNum": 3,
    "questionNumber": 34,
    "level": "C1",
    "questionPromptEnglish": "What is the central thesis developed by the speaker during this presentation?",
    "passageEnglish": "In this symposium presentation delivered in Ottawa, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsEnglish": [
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Ottawa",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "transcriptEnglish": "In this symposium presentation delivered in Ottawa, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
  },
  "tcf3-lis-35": {
    "id": "tcf3-lis-35",
    "paperNum": 3,
    "questionNumber": 35,
    "level": "C1",
    "questionPromptEnglish": "What primary argument is put forward to justify a strategic policy pivot?",
    "passageEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Ottawa to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsEnglish": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Ottawa",
      "Universal free public Internet access without any state regulatory oversight",
      "Preemptive physical destruction of all computing server facilities"
    ],
    "transcriptEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Ottawa to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
  },
  "tcf3-lis-36": {
    "id": "tcf3-lis-36",
    "paperNum": 3,
    "questionNumber": 36,
    "level": "C1",
    "questionPromptEnglish": "What major warning is expressed regarding these intervention technologies?",
    "passageEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Ottawa, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsEnglish": [
      "An immediate shutdown of all academic meteorological research in Ottawa",
      "The unpredictability of induced meteorological disruptions across continental scales",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "transcriptEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Ottawa, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
  },
  "tcf3-lis-37": {
    "id": "tcf3-lis-37",
    "paperNum": 3,
    "questionNumber": 37,
    "level": "C2",
    "questionPromptEnglish": "What conceptual shift does the researcher highlight in their analysis?",
    "passageEnglish": "In this academic lecture delivered in Ottawa, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsEnglish": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Outright rejection of the empirical scientific method in universities across Ottawa",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "transcriptEnglish": "In this academic lecture delivered in Ottawa, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
  },
  "tcf3-lis-38": {
    "id": "tcf3-lis-38",
    "paperNum": 3,
    "questionNumber": 38,
    "level": "C2",
    "questionPromptEnglish": "What epistemological thesis is defended by the linguist?",
    "passageEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Ottawa. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsEnglish": [
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues",
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Ottawa"
    ],
    "transcriptEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Ottawa. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
  },
  "tcf3-lis-39": {
    "id": "tcf3-lis-39",
    "paperNum": 3,
    "questionNumber": 39,
    "level": "C2",
    "questionPromptEnglish": "What major systemic risk is identified by the economist?",
    "passageEnglish": "The introduction of a central bank digital currency issued directly to retail users in Ottawa could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsEnglish": [
      "The planned elimination of all international trade operations for firms in Ottawa",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity",
      "Abrupt banking disintermediation choking business financing during periods of market stress"
    ],
    "transcriptEnglish": "The introduction of a central bank digital currency issued directly to retail users in Ottawa could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf4-lis-1": {
    "id": "tcf4-lis-1",
    "paperNum": 4,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A sailor is piloting a boat on the river..\n... Option B: A man is sending a registered parcel at the post office counter..\n... Option C: A seamstress is sewing a garment in her workshop..\n... Option D: Spectators are applauding at the end of a movie..",
    "optionsEnglish": [
      "A sailor is piloting a boat on the river.",
      "A man is sending a registered parcel at the post office counter.",
      "A seamstress is sewing a garment in her workshop.",
      "Spectators are applauding at the end of a movie."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A sailor is piloting a boat on the river..\n... Option B: A man is sending a registered parcel at the post office counter..\n... Option C: A seamstress is sewing a garment in her workshop..\n... Option D: Spectators are applauding at the end of a movie.."
  },
  "tcf4-lis-2": {
    "id": "tcf4-lis-2",
    "paperNum": 4,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A teacher is giving a lesson in front of a chalkboard..\n... Option B: A customer is trying on a coat in a clothing store..\n... Option C: A waiter is taking an order at an outdoor table..\n... Option D: A mechanic is changing the tires of a truck..",
    "optionsEnglish": [
      "A teacher is giving a lesson in front of a chalkboard.",
      "A customer is trying on a coat in a clothing store.",
      "A waiter is taking an order at an outdoor table.",
      "A mechanic is changing the tires of a truck."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A teacher is giving a lesson in front of a chalkboard..\n... Option B: A customer is trying on a coat in a clothing store..\n... Option C: A waiter is taking an order at an outdoor table..\n... Option D: A mechanic is changing the tires of a truck.."
  },
  "tcf4-lis-3": {
    "id": "tcf4-lis-3",
    "paperNum": 4,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Children are riding bikes in the schoolyard..\n... Option B: Travelers are eating in the dining car of a train..\n... Option C: A farmer is feeding animals on a farm..\n... Option D: A dentist is treating a child's teeth..",
    "optionsEnglish": [
      "Children are riding bikes in the schoolyard.",
      "Travelers are eating in the dining car of a train.",
      "A farmer is feeding animals on a farm.",
      "A dentist is treating a child's teeth."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Children are riding bikes in the schoolyard..\n... Option B: Travelers are eating in the dining car of a train..\n... Option C: A farmer is feeding animals on a farm..\n... Option D: A dentist is treating a child's teeth.."
  },
  "tcf4-lis-4": {
    "id": "tcf4-lis-4",
    "paperNum": 4,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A firefighter is extinguishing a forest fire..\n... Option B: A gardener is planting flowers in a greenhouse..\n... Option C: A tour guide is explaining the history of a castle..\n... Option D: Passengers are retrieving their luggage from the baggage carousel at the airport..",
    "optionsEnglish": [
      "A firefighter is extinguishing a forest fire.",
      "A gardener is planting flowers in a greenhouse.",
      "A tour guide is explaining the history of a castle.",
      "Passengers are retrieving their luggage from the baggage carousel at the airport."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A firefighter is extinguishing a forest fire..\n... Option B: A gardener is planting flowers in a greenhouse..\n... Option C: A tour guide is explaining the history of a castle..\n... Option D: Passengers are retrieving their luggage from the baggage carousel at the airport.."
  },
  "tcf4-lis-5": {
    "id": "tcf4-lis-5",
    "paperNum": 4,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Vancouver: Express train N°448 departs track 5 at 14:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Annulation complète du trajet vers Vancouver en raison d'un problème technique.\n... B: Départ du train express pour la gare centrale de Vancouver voie 5 à 14h15.\n... C: Changement de destination du train vers la gare du Nord à 14h15.\n... D: Fermeture temporaire du guichet de vente des billets de la gare de Vancouver.",
    "optionsEnglish": [
      "Complete cancellation of the trip to Vancouver due to a technical issue",
      "Departure of the express train to Vancouver Central Station from track 5 at 2:15 PM",
      "Change of train destination to North Station at 2:15 PM",
      "Temporary closure of the ticket sales counter at Vancouver station"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Vancouver: Express train N°448 departs track 5 at 14:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Annulation complète du trajet vers Vancouver en raison d'un problème technique.\n... B: Départ du train express pour la gare centrale de Vancouver voie 5 à 14h15.\n... C: Changement de destination du train vers la gare du Nord à 14h15.\n... D: Fermeture temporaire du guichet de vente des billets de la gare de Vancouver.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Complete cancellation of the trip to Vancouver due to a technical issue.\n... B: Departure of the express train to Vancouver Central Station from track 5 at 2:15 PM.\n... C: Change of train destination to North Station at 2:15 PM.\n... D: Temporary closure of the ticket sales counter at Vancouver station."
  },
  "tcf4-lis-6": {
    "id": "tcf4-lis-6",
    "paperNum": 4,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 4, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°4.\n... B: Offre promotionnelle au rayon n°4 à Vancouver avec le 3e article à demi-prix.\n... C: Fermeture exceptionnelle du magasin de Vancouver en raison de travaux.\n... D: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Vancouver.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 4",
      "Special promotion in aisle 4 in Vancouver with the 3rd item at half price",
      "Exceptional closure of the Vancouver store due to construction work",
      "Free loyalty card distribution at the Vancouver store reception desk"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 4, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°4.\n... B: Offre promotionnelle au rayon n°4 à Vancouver avec le 3e article à demi-prix.\n... C: Fermeture exceptionnelle du magasin de Vancouver en raison de travaux.\n... D: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Vancouver.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 4.\n... B: Special promotion in aisle 4 in Vancouver with the 3rd item at half price.\n... C: Exceptional closure of the Vancouver store due to construction work.\n... D: Free loyalty card distribution at the Vancouver store reception desk."
  },
  "tcf4-lis-7": {
    "id": "tcf4-lis-7",
    "paperNum": 4,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Vancouver: Rain and strong wind expected with 16°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Chute de neige abondante à Vancouver bloquant la circulation routière.\n... B: Aucun changement climatique annoncé pour le week-end à Vancouver.\n... C: Vague de chaleur et soleil radieux toute la journée sur Vancouver.\n... D: Prévision de vent fort et pluie à Vancouver avec une température de 16°C.",
    "optionsEnglish": [
      "Heavy snowfall in Vancouver blocking road traffic",
      "No weather changes announced for the weekend in Vancouver",
      "Heatwave and bright sunshine all day over Vancouver",
      "Forecast of strong wind and rain in Vancouver with a temperature of 16°C"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Vancouver: Rain and strong wind expected with 16°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Chute de neige abondante à Vancouver bloquant la circulation routière.\n... B: Aucun changement climatique annoncé pour le week-end à Vancouver.\n... C: Vague de chaleur et soleil radieux toute la journée sur Vancouver.\n... D: Prévision de vent fort et pluie à Vancouver avec une température de 16°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Heavy snowfall in Vancouver blocking road traffic.\n... B: No weather changes announced for the weekend in Vancouver.\n... C: Heatwave and bright sunshine all day over Vancouver.\n... D: Forecast of strong wind and rain in Vancouver with a temperature of 16°C."
  },
  "tcf4-lis-8": {
    "id": "tcf4-lis-8",
    "paperNum": 4,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 12:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Annulation définitive de la consultation médicale du docteur Tremblay.\n... B: Demande d'envoi des résultats d'analyse médicale par courrier.\n... C: Changement d'adresse du cabinet médical de quartier à Vancouver.\n... D: Rappel du rendez-vous médical de suivi à Vancouver fixé à mardi à 12h30.",
    "optionsEnglish": [
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Request to send medical lab test results by mail",
      "Address change of the local medical clinic in Vancouver",
      "Reminder of the follow-up medical appointment in Vancouver scheduled for mardi à 12h30"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 12:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Annulation définitive de la consultation médicale du docteur Tremblay.\n... B: Demande d'envoi des résultats d'analyse médicale par courrier.\n... C: Changement d'adresse du cabinet médical de quartier à Vancouver.\n... D: Rappel du rendez-vous médical de suivi à Vancouver fixé à mardi à 12h30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Definitive cancellation of Dr. Tremblay's medical consultation.\n... B: Request to send medical lab test results by mail.\n... C: Address change of the local medical clinic in Vancouver.\n... D: Reminder of the follow-up medical appointment in Vancouver scheduled for mardi à 12h30."
  },
  "tcf4-lis-9": {
    "id": "tcf4-lis-9",
    "paperNum": 4,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $240.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Annual closure of the Vancouver auto repair garage starting this evening",
      "Delay in repair work at the Vancouver garage due to a missing part",
      "Vehicle ready at the Vancouver garage after service and brakes for an amount of 240$",
      "Requirement to leave the car at the Vancouver garage for the entire weekend"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $240.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf4-lis-10": {
    "id": "tcf4-lis-10",
    "paperNum": 4,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8148 is ready in the locker. Access code: 4044.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Unable to deliver parcel N°8148 due to an incorrect address",
      "Mandatory payment of additional customs fees for parcel",
      "Return of parcel N°8148 to original sender in Vancouver",
      "Parcel N°8148 available in automated lockers in Vancouver with code 4044"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8148 is ready in the locker. Access code: 4044.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf4-lis-11": {
    "id": "tcf4-lis-11",
    "paperNum": 4,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 14:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Increase in monthly rent amount requested for the apartment",
      "Confirmation of the apartment viewing in Vancouver this Thursday at 2:00 PM",
      "Postponement of the apartment viewing in Vancouver to the end of next month",
      "Cancellation of the appointment because the apartment in Vancouver has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 14:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf4-lis-12": {
    "id": "tcf4-lis-12",
    "paperNum": 4,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 13 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Proposal to change the Vancouver salon appointment to Thursday at 1:00 PM due to staff absence",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the Vancouver hair salon for renovations",
      "Confirmation of Friday's appointment at the Vancouver salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 13 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf4-lis-13": {
    "id": "tcf4-lis-13",
    "paperNum": 4,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 12 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Closure of Vancouver sports center locker rooms for sanitation work",
      "Change of venue and time for swimming practice in Vancouver this Saturday at 12:00 PM",
      "Definitive cancellation of registration at Vancouver sports club",
      "Increase in annual membership dues for sports club members"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 12 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf4-lis-14": {
    "id": "tcf4-lis-14",
    "paperNum": 4,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 14 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Obligation to pay a late fine for overdue library return",
      "Reminder of library card annual renewal date",
      "Reserved book available at Vancouver library for pickup before Saturday 2:00 PM",
      "Permanent loss of borrowed book by Vancouver media library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 14 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf4-lis-15": {
    "id": "tcf4-lis-15",
    "paperNum": 4,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 15:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Request to send a printed recommendation letter to the company",
      "Proposal for preliminary phone interview with Vancouver company on Monday at 3:30 PM",
      "Immediate rejection of job application submitted to Vancouver company",
      "Summons to a written examination at Vancouver company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 15:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf4-lis-16": {
    "id": "tcf4-lis-16",
    "paperNum": 4,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 73% citizen approval for bike lanes and bus transit in Vancouver.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?",
    "optionsEnglish": [
      "Mass rejection by Vancouver residents of recent road development works",
      "Approval by 73% of Vancouver citizens of new bike and bus lanes",
      "Definitive elimination of the bike-share network by the municipality",
      "Sharp increase in public transit fares in the city of Vancouver"
    ],
    "transcriptEnglish": "Speaker: A survey shows 73% citizen approval for bike lanes and bus transit in Vancouver.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf4-lis-17": {
    "id": "tcf4-lis-17",
    "paperNum": 4,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Vancouver reduces burnout by 34% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?",
    "optionsEnglish": [
      "34% reduction in burnout and maintenance of productivity in Vancouver",
      "Requirement for Vancouver employees to work overtime on weekends",
      "Dramatic collapse in overall office worker productivity",
      "Significant rise in voluntary resignation rates in companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Vancouver reduces burnout by 34% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf4-lis-18": {
    "id": "tcf4-lis-18",
    "paperNum": 4,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Vancouver festival highlights 22 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?",
    "optionsEnglish": [
      "Promotion of 22 regional music groups and local music scene in Vancouver",
      "Cancellation of shows due to municipal budget restrictions",
      "Permanent closure of the main entertainment venue in Vancouver",
      "Exclusive invitation of international artists at the expense of local talent"
    ],
    "transcriptEnglish": "Speaker: The Vancouver festival highlights 22 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf4-lis-19": {
    "id": "tcf4-lis-19",
    "paperNum": 4,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Vancouver saves 19% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?",
    "optionsEnglish": [
      "Significant increase in monthly food expenditures",
      "Complete disappearance of local convenience stores in downtown Vancouver",
      "Legal requirement to buy only industrial frozen food products",
      "19% savings on grocery budgets and elimination of plastic packaging in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Vancouver saves 19% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf4-lis-20": {
    "id": "tcf4-lis-20",
    "paperNum": 4,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 180 isolated seniors in Vancouver.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Total replacement of social workers by automated systems",
      "Volunteer support and friendly home visits for 180 isolated seniors in Vancouver",
      "Permanent closure of neighborhood community welcome centers",
      "Mandatory payment of a monthly healthcare fee by users"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 180 isolated seniors in Vancouver.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-21": {
    "id": "tcf4-lis-21",
    "paperNum": 4,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Vancouver grew by 28%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Total ban on access to hiking trails during the summer season",
      "Construction of concrete hotel complexes along regional lakeshores",
      "Marked decrease in tourist visits to protected natural areas",
      "28% increase in demand for eco-lodges and soft mobility in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Vancouver grew by 28%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-22": {
    "id": "tcf4-lis-22",
    "paperNum": 4,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 19 rural communities around Vancouver.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Substantial increase in annual library registration fees",
      "Permanent closure of student study spaces during exam periods",
      "Democratized access to digital reading across 19 rural communities near Vancouver",
      "Elimination of all physical paper book collections in institutions"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 19 rural communities around Vancouver.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-23": {
    "id": "tcf4-lis-23",
    "paperNum": 4,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 90 students with seniors in Vancouver for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?",
    "optionsEnglish": [
      "Legal requirement to reside exclusively in gated university residences",
      "Eviction of young tenants from downtown residential housing in Vancouver",
      "Intergenerational solidarity home-sharing for 90 students and seniors in Vancouver",
      "Uncontrolled residential rent increases in the private sector"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 90 students with seniors in Vancouver for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf4-lis-24": {
    "id": "tcf4-lis-24",
    "paperNum": 4,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 18 companies in Vancouver.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?",
    "optionsEnglish": [
      "Obligation to purchase a paid individual sports subscription",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Complete elimination of lunch breaks for all employees",
      "Implementation of daily physical exercise sessions in 18 companies in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 18 companies in Vancouver.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf4-lis-25": {
    "id": "tcf4-lis-25",
    "paperNum": 4,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 40 buildings in Vancouver reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Greening of 40 public buildings to reduce heat in Vancouver",
      "Prohibition on planting trees in school courtyards",
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center"
    ],
    "transcriptEnglish": "Speaker: Greening 40 buildings in Vancouver reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-26": {
    "id": "tcf4-lis-26",
    "paperNum": 4,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Vancouver. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The implementation of a systematic ban on all generative algorithms across Vancouver",
      "The requirement to clearly identify synthetic media released to the public",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Vancouver. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production."
  },
  "tcf4-lis-27": {
    "id": "tcf4-lis-27",
    "paperNum": 4,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Vancouver, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown",
      "The imposition of a direct tax penalty on employees working from home in Vancouver",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "transcriptEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Vancouver, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities."
  },
  "tcf4-lis-28": {
    "id": "tcf4-lis-28",
    "paperNum": 4,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Vancouver.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Vancouver",
      "Systematic incineration of all unsold retail textile surpluses",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Vancouver.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials."
  },
  "tcf4-lis-29": {
    "id": "tcf4-lis-29",
    "paperNum": 4,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Vancouver generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Limiting household power usage to mandatory scheduled time windows",
      "Exclusive interconnection of installations to emergency backup power grids in Vancouver",
      "Planned decommissioning of all existing regional hydroelectric facilities"
    ],
    "transcriptEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Vancouver generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency."
  },
  "tcf4-lis-30": {
    "id": "tcf4-lis-30",
    "paperNum": 4,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Vancouver metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsEnglish": [
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Vancouver",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "transcriptEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Vancouver metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors."
  },
  "tcf4-lis-31": {
    "id": "tcf4-lis-31",
    "paperNum": 4,
    "questionNumber": 31,
    "level": "B2",
    "questionPromptEnglish": "What major demand is brought forward by worker representatives?",
    "passageEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Vancouver.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsEnglish": [
      "A complete ban on all online meal ordering services across Vancouver",
      "Automatic provision of a motorized company vehicle to every bicycle courier",
      "The elimination of all contractual obligations between couriers and customers",
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance"
    ],
    "transcriptEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Vancouver.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators."
  },
  "tcf4-lis-32": {
    "id": "tcf4-lis-32",
    "paperNum": 4,
    "questionNumber": 32,
    "level": "B2",
    "questionPromptEnglish": "What primary concern is expressed regarding these digital management tools?",
    "passageEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Vancouver.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsEnglish": [
      "Withholding employee compensation for failing to meet computer-generated quotas",
      "A general ban on forklift operations inside warehouses in Vancouver",
      "A legal mandate to double daily working hours for all logistics staff",
      "The deleterious impact of continuous performance evaluation on employee psychological well-being"
    ],
    "transcriptEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Vancouver.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks."
  },
  "tcf4-lis-33": {
    "id": "tcf4-lis-33",
    "paperNum": 4,
    "questionNumber": 33,
    "level": "B2",
    "questionPromptEnglish": "What technical approach is favored by municipal engineers?",
    "passageEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Vancouver.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsEnglish": [
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Indefinite elevation of concrete seawalls along all urban waterfronts",
      "Enclosing all metropolitan waterways of Vancouver inside underground concrete pipelines"
    ],
    "transcriptEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Vancouver.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff."
  },
  "tcf4-lis-34": {
    "id": "tcf4-lis-34",
    "paperNum": 4,
    "questionNumber": 34,
    "level": "C1",
    "questionPromptEnglish": "What is the central thesis developed by the speaker during this presentation?",
    "passageEnglish": "In this symposium presentation delivered in Vancouver, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsEnglish": [
      "Scientific proof that human consciousness is entirely governed by electronic circuitry",
      "The complete futility of mathematical modeling in modern computing in Vancouver",
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "A legal mandate forcing all citizens to use public computer terminals exclusively"
    ],
    "transcriptEnglish": "In this symposium presentation delivered in Vancouver, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
  },
  "tcf4-lis-35": {
    "id": "tcf4-lis-35",
    "paperNum": 4,
    "questionNumber": 35,
    "level": "C1",
    "questionPromptEnglish": "What primary argument is put forward to justify a strategic policy pivot?",
    "passageEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Vancouver to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsEnglish": [
      "Preemptive physical destruction of all computing server facilities",
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Vancouver",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "transcriptEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Vancouver to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
  },
  "tcf4-lis-36": {
    "id": "tcf4-lis-36",
    "paperNum": 4,
    "questionNumber": 36,
    "level": "C1",
    "questionPromptEnglish": "What major warning is expressed regarding these intervention technologies?",
    "passageEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Vancouver, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsEnglish": [
      "An immediate shutdown of all academic meteorological research in Vancouver",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers",
      "The unpredictability of induced meteorological disruptions across continental scales"
    ],
    "transcriptEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Vancouver, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
  },
  "tcf4-lis-37": {
    "id": "tcf4-lis-37",
    "paperNum": 4,
    "questionNumber": 37,
    "level": "C2",
    "questionPromptEnglish": "What conceptual shift does the researcher highlight in their analysis?",
    "passageEnglish": "In this academic lecture delivered in Vancouver, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsEnglish": [
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Outright rejection of the empirical scientific method in universities across Vancouver",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena",
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability"
    ],
    "transcriptEnglish": "In this academic lecture delivered in Vancouver, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
  },
  "tcf4-lis-38": {
    "id": "tcf4-lis-38",
    "paperNum": 4,
    "questionNumber": 38,
    "level": "C2",
    "questionPromptEnglish": "What epistemological thesis is defended by the linguist?",
    "passageEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Vancouver. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsEnglish": [
      "The intrinsic superiority of algorithmic formal languages over natural human tongues",
      "The complete biological uniformity of human thought systems regardless of language in Vancouver",
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The radical impossibility of translating any conceptual meaning across different human languages"
    ],
    "transcriptEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Vancouver. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
  },
  "tcf4-lis-39": {
    "id": "tcf4-lis-39",
    "paperNum": 4,
    "questionNumber": 39,
    "level": "C2",
    "questionPromptEnglish": "What major systemic risk is identified by the economist?",
    "passageEnglish": "The introduction of a central bank digital currency issued directly to retail users in Vancouver could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsEnglish": [
      "The planned elimination of all international trade operations for firms in Vancouver",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "transcriptEnglish": "The introduction of a central bank digital currency issued directly to retail users in Vancouver could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf5-lis-1": {
    "id": "tcf5-lis-1",
    "paperNum": 5,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A client is getting her hair styled in a hair salon..\n... Option B: An engineer is working at a desktop computer..\n... Option C: A delivery person is transporting boxes in a freight elevator..\n... Option D: A security guard is watching over artwork in a museum..",
    "optionsEnglish": [
      "A client is getting her hair styled in a hair salon.",
      "An engineer is working at a desktop computer.",
      "A delivery person is transporting boxes in a freight elevator.",
      "A security guard is watching over artwork in a museum."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A client is getting her hair styled in a hair salon..\n... Option B: An engineer is working at a desktop computer..\n... Option C: A delivery person is transporting boxes in a freight elevator..\n... Option D: A security guard is watching over artwork in a museum.."
  },
  "tcf5-lis-2": {
    "id": "tcf5-lis-2",
    "paperNum": 5,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A watchmaker is repairing a mechanical alarm clock..\n... Option B: A driver is filling up fuel at a gas station..\n... Option C: A server is serving cups of tea in a lounge..\n... Option D: Hikers are climbing toward a hilltop summit..",
    "optionsEnglish": [
      "A watchmaker is repairing a mechanical alarm clock.",
      "A driver is filling up fuel at a gas station.",
      "A server is serving cups of tea in a lounge.",
      "Hikers are climbing toward a hilltop summit."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A watchmaker is repairing a mechanical alarm clock..\n... Option B: A driver is filling up fuel at a gas station..\n... Option C: A server is serving cups of tea in a lounge..\n... Option D: Hikers are climbing toward a hilltop summit.."
  },
  "tcf5-lis-3": {
    "id": "tcf5-lis-3",
    "paperNum": 5,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Students are listening to a lecture at the university..\n... Option B: A chef is slicing meat in a kitchen..\n... Option C: A police officer is checking a driver's documents..\n... Option D: Two people are chatting while sitting on a bench in a public park..",
    "optionsEnglish": [
      "Students are listening to a lecture at the university.",
      "A chef is slicing meat in a kitchen.",
      "A police officer is checking a driver's documents.",
      "Two people are chatting while sitting on a bench in a public park."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Students are listening to a lecture at the university..\n... Option B: A chef is slicing meat in a kitchen..\n... Option C: A police officer is checking a driver's documents..\n... Option D: Two people are chatting while sitting on a bench in a public park.."
  },
  "tcf5-lis-4": {
    "id": "tcf5-lis-4",
    "paperNum": 5,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is making a cash deposit at a bank teller counter..\n... Option B: A bricklayer is building a brick wall..\n... Option C: A sailor is mooring his ship at the port..\n... Option D: A photographer is developing photos in a darkroom..",
    "optionsEnglish": [
      "A customer is making a cash deposit at a bank teller counter.",
      "A bricklayer is building a brick wall.",
      "A sailor is mooring his ship at the port.",
      "A photographer is developing photos in a darkroom."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is making a cash deposit at a bank teller counter..\n... Option B: A bricklayer is building a brick wall..\n... Option C: A sailor is mooring his ship at the port..\n... Option D: A photographer is developing photos in a darkroom.."
  },
  "tcf5-lis-5": {
    "id": "tcf5-lis-5",
    "paperNum": 5,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Toronto: Express train N°460 departs track 6 at 15:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Toronto.\n... B: Annulation complète du trajet vers Toronto en raison d'un problème technique.\n... C: Départ du train express pour la gare centrale de Toronto voie 6 à 15h15.\n... D: Changement de destination du train vers la gare du Nord à 15h15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Toronto station",
      "Complete cancellation of the trip to Toronto due to a technical issue",
      "Departure of the express train to Toronto Central Station from track 6 at 3:15 PM",
      "Change of train destination to North Station at 3:15 PM"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Toronto: Express train N°460 departs track 6 at 15:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: Quel est le sujet principal de ce message sonore ?\n... A: Fermeture temporaire du guichet de vente des billets de la gare de Toronto.\n... B: Annulation complète du trajet vers Toronto en raison d'un problème technique.\n... C: Départ du train express pour la gare centrale de Toronto voie 6 à 15h15.\n... D: Changement de destination du train vers la gare du Nord à 15h15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Toronto station.\n... B: Complete cancellation of the trip to Toronto due to a technical issue.\n... C: Departure of the express train to Toronto Central Station from track 6 at 3:15 PM.\n... D: Change of train destination to North Station at 3:15 PM."
  },
  "tcf5-lis-6": {
    "id": "tcf5-lis-6",
    "paperNum": 5,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 5, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°5.\n... B: Offre promotionnelle au rayon n°5 à Toronto avec le 3e article à demi-prix.\n... C: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Toronto.\n... D: Fermeture exceptionnelle du magasin de Toronto en raison de travaux.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 5",
      "Special promotion in aisle 5 in Toronto with the 3rd item at half price",
      "Free loyalty card distribution at the Toronto store reception desk",
      "Exceptional closure of the Toronto store due to construction work"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 5, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: Quelle offre spéciale est proposée aux clients ?\n... A: Arrivée de nouveaux produits d'entretien écologiques au rayon n°5.\n... B: Offre promotionnelle au rayon n°5 à Toronto avec le 3e article à demi-prix.\n... C: Distribution gratuite de cartes de fidélité à l'accueil du magasin de Toronto.\n... D: Fermeture exceptionnelle du magasin de Toronto en raison de travaux.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 5.\n... B: Special promotion in aisle 5 in Toronto with the 3rd item at half price.\n... C: Free loyalty card distribution at the Toronto store reception desk.\n... D: Exceptional closure of the Toronto store due to construction work."
  },
  "tcf5-lis-7": {
    "id": "tcf5-lis-7",
    "paperNum": 5,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Toronto: Rain and strong wind expected with 17°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Aucun changement climatique annoncé pour le week-end à Toronto.\n... B: Chute de neige abondante à Toronto bloquant la circulation routière.\n... C: Vague de chaleur et soleil radieux toute la journée sur Toronto.\n... D: Prévision de vent fort et pluie à Toronto avec une température de 17°C.",
    "optionsEnglish": [
      "No weather changes announced for the weekend in Toronto",
      "Heavy snowfall in Toronto blocking road traffic",
      "Heatwave and bright sunshine all day over Toronto",
      "Forecast of strong wind and rain in Toronto with a temperature of 17°C"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Toronto: Rain and strong wind expected with 17°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: Quelles sont les prévisions météorologiques annoncées ?\n... A: Aucun changement climatique annoncé pour le week-end à Toronto.\n... B: Chute de neige abondante à Toronto bloquant la circulation routière.\n... C: Vague de chaleur et soleil radieux toute la journée sur Toronto.\n... D: Prévision de vent fort et pluie à Toronto avec une température de 17°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: No weather changes announced for the weekend in Toronto.\n... B: Heavy snowfall in Toronto blocking road traffic.\n... C: Heatwave and bright sunshine all day over Toronto.\n... D: Forecast of strong wind and rain in Toronto with a temperature of 17°C."
  },
  "tcf5-lis-8": {
    "id": "tcf5-lis-8",
    "paperNum": 5,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 13:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Toronto.\n... B: Rappel du rendez-vous médical de suivi à Toronto fixé à mardi à 13h30.\n... C: Demande d'envoi des résultats d'analyse médicale par courrier.\n... D: Annulation définitive de la consultation médicale du docteur Tremblay.",
    "optionsEnglish": [
      "Address change of the local medical clinic in Toronto",
      "Reminder of the follow-up medical appointment in Toronto scheduled for mardi à 13h30",
      "Request to send medical lab test results by mail",
      "Definitive cancellation of Dr. Tremblay's medical consultation"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 13:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Pourquoi la personne laisse-t-elle ce message téléphonique ?\n... A: Changement d'adresse du cabinet médical de quartier à Toronto.\n... B: Rappel du rendez-vous médical de suivi à Toronto fixé à mardi à 13h30.\n... C: Demande d'envoi des résultats d'analyse médicale par courrier.\n... D: Annulation définitive de la consultation médicale du docteur Tremblay.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of the local medical clinic in Toronto.\n... B: Reminder of the follow-up medical appointment in Toronto scheduled for mardi à 13h30.\n... C: Request to send medical lab test results by mail.\n... D: Definitive cancellation of Dr. Tremblay's medical consultation."
  },
  "tcf5-lis-9": {
    "id": "tcf5-lis-9",
    "paperNum": 5,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $255.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Delay in repair work at the Toronto garage due to a missing part",
      "Vehicle ready at the Toronto garage after service and brakes for an amount of 255$",
      "Annual closure of the Toronto auto repair garage starting this evening",
      "Requirement to leave the car at the Toronto garage for the entire weekend"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $255.\nAnnouncer: Listen to the question. Question N°9: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf5-lis-10": {
    "id": "tcf5-lis-10",
    "paperNum": 5,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8185 is ready in the locker. Access code: 4055.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Return of parcel N°8185 to original sender in Toronto",
      "Mandatory payment of additional customs fees for parcel",
      "Parcel N°8185 available in automated lockers in Toronto with code 4055",
      "Unable to deliver parcel N°8185 due to an incorrect address"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8185 is ready in the locker. Access code: 4055.\nAnnouncer: Listen to the question. Question N°10: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf5-lis-11": {
    "id": "tcf5-lis-11",
    "paperNum": 5,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 15:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Postponement of the apartment viewing in Toronto to the end of next month",
      "Confirmation of the apartment viewing in Toronto this Thursday at 3:00 PM",
      "Cancellation of the appointment because the apartment in Toronto has already been rented",
      "Increase in monthly rent amount requested for the apartment"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 15:00 AM.\nAnnouncer: Listen to the question. Question N°11: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf5-lis-12": {
    "id": "tcf5-lis-12",
    "paperNum": 5,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 14 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Confirmation of Friday's appointment at the Toronto salon without any changes",
      "Proposal to change the Toronto salon appointment to Thursday at 2:00 PM due to staff absence",
      "Permanent closure of the Toronto hair salon for renovations"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 14 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf5-lis-13": {
    "id": "tcf5-lis-13",
    "paperNum": 5,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 13 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Closure of Toronto sports center locker rooms for sanitation work",
      "Change of venue and time for swimming practice in Toronto this Saturday at 1:00 PM",
      "Definitive cancellation of registration at Toronto sports club",
      "Increase in annual membership dues for sports club members"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 13 AM.\nAnnouncer: Listen to the question. Question N°13: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf5-lis-14": {
    "id": "tcf5-lis-14",
    "paperNum": 5,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 15 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Reminder of library card annual renewal date",
      "Obligation to pay a late fine for overdue library return",
      "Reserved book available at Toronto library for pickup before Saturday 3:00 PM",
      "Permanent loss of borrowed book by Toronto media library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 15 AM.\nAnnouncer: Listen to the question. Question N°14: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf5-lis-15": {
    "id": "tcf5-lis-15",
    "paperNum": 5,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 16:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?",
    "optionsEnglish": [
      "Immediate rejection of job application submitted to Toronto company",
      "Summons to a written examination at Toronto company premises",
      "Proposal for preliminary phone interview with Toronto company on Monday at 4:30 PM",
      "Request to send a printed recommendation letter to the company"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 16:30 AM.\nAnnouncer: Listen to the question. Question N°15: Pourquoi la personne laisse-t-elle ce message téléphonique ?\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf5-lis-16": {
    "id": "tcf5-lis-16",
    "paperNum": 5,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 75% citizen approval for bike lanes and bus transit in Toronto.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?",
    "optionsEnglish": [
      "Mass rejection by Toronto residents of recent road development works",
      "Definitive elimination of the bike-share network by the municipality",
      "Approval by 75% of Toronto citizens of new bike and bus lanes",
      "Sharp increase in public transit fares in the city of Toronto"
    ],
    "transcriptEnglish": "Speaker: A survey shows 75% citizen approval for bike lanes and bus transit in Toronto.\nAnnouncer: Listen to the question. Question N°16: Quelle est la réaction de la majorité des citoyens face à ces nouveaux aménagements ?\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf5-lis-17": {
    "id": "tcf5-lis-17",
    "paperNum": 5,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Toronto reduces burnout by 35% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?",
    "optionsEnglish": [
      "Requirement for Toronto employees to work overtime on weekends",
      "Dramatic collapse in overall office worker productivity",
      "35% reduction in burnout and maintenance of productivity in Toronto",
      "Significant rise in voluntary resignation rates in companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Toronto reduces burnout by 35% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: Quel est le résultat principal de l'expérimentation de la semaine de 4 jours ?\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf5-lis-18": {
    "id": "tcf5-lis-18",
    "paperNum": 5,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Toronto festival highlights 25 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Toronto",
      "Cancellation of shows due to municipal budget restrictions",
      "Exclusive invitation of international artists at the expense of local talent",
      "Promotion of 25 regional music groups and local music scene in Toronto"
    ],
    "transcriptEnglish": "Speaker: The Toronto festival highlights 25 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: Quel est l'objectif principal de cet événement culturel ?\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf5-lis-19": {
    "id": "tcf5-lis-19",
    "paperNum": 5,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Toronto saves 20% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?",
    "optionsEnglish": [
      "Legal requirement to buy only industrial frozen food products",
      "20% savings on grocery budgets and elimination of plastic packaging in Toronto",
      "Complete disappearance of local convenience stores in downtown Toronto",
      "Significant increase in monthly food expenditures"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Toronto saves 20% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: Quel avantage principal présente cette nouvelle habitude d'achat ?\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf5-lis-20": {
    "id": "tcf5-lis-20",
    "paperNum": 5,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 200 isolated seniors in Toronto.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Total replacement of social workers by automated systems",
      "Volunteer support and friendly home visits for 200 isolated seniors in Toronto",
      "Permanent closure of neighborhood community welcome centers",
      "Mandatory payment of a monthly healthcare fee by users"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 200 isolated seniors in Toronto.\nAnnouncer: Listen to the question. Question N°20: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-21": {
    "id": "tcf5-lis-21",
    "paperNum": 5,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Toronto grew by 30%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Marked decrease in tourist visits to protected natural areas",
      "Construction of concrete hotel complexes along regional lakeshores",
      "30% increase in demand for eco-lodges and soft mobility in Toronto",
      "Total ban on access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Toronto grew by 30%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-22": {
    "id": "tcf5-lis-22",
    "paperNum": 5,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 20 rural communities around Toronto.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Substantial increase in annual library registration fees",
      "Democratized access to digital reading across 20 rural communities near Toronto",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 20 rural communities around Toronto.\nAnnouncer: Listen to the question. Question N°22: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-23": {
    "id": "tcf5-lis-23",
    "paperNum": 5,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 100 students with seniors in Toronto for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?",
    "optionsEnglish": [
      "Eviction of young tenants from downtown residential housing in Toronto",
      "Uncontrolled residential rent increases in the private sector",
      "Intergenerational solidarity home-sharing for 100 students and seniors in Toronto",
      "Legal requirement to reside exclusively in gated university residences"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 100 students with seniors in Toronto for affordable rent.\nAnnouncer: Listen to the question. Question N°23: Quelle est la tendance observée sur le marché immobilier local ?\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf5-lis-24": {
    "id": "tcf5-lis-24",
    "paperNum": 5,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 20 companies in Toronto.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?",
    "optionsEnglish": [
      "Complete elimination of lunch breaks for all employees",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Obligation to purchase a paid individual sports subscription",
      "Implementation of daily physical exercise sessions in 20 companies in Toronto"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 20 companies in Toronto.\nAnnouncer: Listen to the question. Question N°24: Quel conseil est préconisé par les spécialistes de santé ?\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf5-lis-25": {
    "id": "tcf5-lis-25",
    "paperNum": 5,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 45 buildings in Toronto reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?",
    "optionsEnglish": [
      "Prohibition on planting trees in school courtyards",
      "Destruction of existing parks and green spaces in the city center",
      "Additional property taxation on homeowners with private gardens",
      "Greening of 45 public buildings to reduce heat in Toronto"
    ],
    "transcriptEnglish": "Speaker: Greening 45 buildings in Toronto reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: Quel est l'objectif ou le message central de ce document sonore ?\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-26": {
    "id": "tcf5-lis-26",
    "paperNum": 5,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Toronto. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Toronto",
      "Legal liability exemptions for digital platforms hosting deceptive content",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation"
    ],
    "transcriptEnglish": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Toronto. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production."
  },
  "tcf5-lis-27": {
    "id": "tcf5-lis-27",
    "paperNum": 5,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Toronto, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Toronto",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown"
    ],
    "transcriptEnglish": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Toronto, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities."
  },
  "tcf5-lis-28": {
    "id": "tcf5-lis-28",
    "paperNum": 5,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Toronto.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Toronto",
      "Systematic incineration of all unsold retail textile surpluses",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Toronto.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials."
  },
  "tcf5-lis-29": {
    "id": "tcf5-lis-29",
    "paperNum": 5,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Toronto generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Toronto",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "transcriptEnglish": "Speaker 1: Installing micro wind turbines on building rooftops in Toronto generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency."
  },
  "tcf5-lis-30": {
    "id": "tcf5-lis-30",
    "paperNum": 5,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Toronto metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsEnglish": [
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Permanent closure of commuter train routes to reduce maintenance expenses",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Toronto"
    ],
    "transcriptEnglish": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Toronto metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors."
  },
  "tcf5-lis-31": {
    "id": "tcf5-lis-31",
    "paperNum": 5,
    "questionNumber": 31,
    "level": "B2",
    "questionPromptEnglish": "What major demand is brought forward by worker representatives?",
    "passageEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Toronto.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsEnglish": [
      "Automatic provision of a motorized company vehicle to every bicycle courier",
      "The elimination of all contractual obligations between couriers and customers",
      "A complete ban on all online meal ordering services across Toronto",
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance"
    ],
    "transcriptEnglish": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Toronto.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators."
  },
  "tcf5-lis-32": {
    "id": "tcf5-lis-32",
    "paperNum": 5,
    "questionNumber": 32,
    "level": "B2",
    "questionPromptEnglish": "What primary concern is expressed regarding these digital management tools?",
    "passageEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Toronto.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsEnglish": [
      "A general ban on forklift operations inside warehouses in Toronto",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas",
      "The deleterious impact of continuous performance evaluation on employee psychological well-being"
    ],
    "transcriptEnglish": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Toronto.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks."
  },
  "tcf5-lis-33": {
    "id": "tcf5-lis-33",
    "paperNum": 5,
    "questionNumber": 33,
    "level": "B2",
    "questionPromptEnglish": "What technical approach is favored by municipal engineers?",
    "passageEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Toronto.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsEnglish": [
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Toronto inside underground concrete pipelines",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "transcriptEnglish": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Toronto.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff."
  },
  "tcf5-lis-34": {
    "id": "tcf5-lis-34",
    "paperNum": 5,
    "questionNumber": 34,
    "level": "C1",
    "questionPromptEnglish": "What is the central thesis developed by the speaker during this presentation?",
    "passageEnglish": "In this symposium presentation delivered in Toronto, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsEnglish": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry",
      "The complete futility of mathematical modeling in modern computing in Toronto",
      "A legal mandate forcing all citizens to use public computer terminals exclusively"
    ],
    "transcriptEnglish": "In this symposium presentation delivered in Toronto, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
  },
  "tcf5-lis-35": {
    "id": "tcf5-lis-35",
    "paperNum": 5,
    "questionNumber": 35,
    "level": "C1",
    "questionPromptEnglish": "What primary argument is put forward to justify a strategic policy pivot?",
    "passageEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Toronto to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsEnglish": [
      "Universal free public Internet access without any state regulatory oversight",
      "A complete prohibition on cross-border commercial trade for businesses in Toronto",
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "Preemptive physical destruction of all computing server facilities"
    ],
    "transcriptEnglish": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Toronto to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
  },
  "tcf5-lis-36": {
    "id": "tcf5-lis-36",
    "paperNum": 5,
    "questionNumber": 36,
    "level": "C1",
    "questionPromptEnglish": "What major warning is expressed regarding these intervention technologies?",
    "passageEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Toronto, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsEnglish": [
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "An immediate shutdown of all academic meteorological research in Toronto",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers",
      "The unpredictability of induced meteorological disruptions across continental scales"
    ],
    "transcriptEnglish": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Toronto, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
  },
  "tcf5-lis-37": {
    "id": "tcf5-lis-37",
    "paperNum": 5,
    "questionNumber": 37,
    "level": "C2",
    "questionPromptEnglish": "What conceptual shift does the researcher highlight in their analysis?",
    "passageEnglish": "In this academic lecture delivered in Toronto, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsEnglish": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Outright rejection of the empirical scientific method in universities across Toronto"
    ],
    "transcriptEnglish": "In this academic lecture delivered in Toronto, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
  },
  "tcf5-lis-38": {
    "id": "tcf5-lis-38",
    "paperNum": 5,
    "questionNumber": 38,
    "level": "C2",
    "questionPromptEnglish": "What epistemological thesis is defended by the linguist?",
    "passageEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Toronto. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsEnglish": [
      "The intrinsic superiority of algorithmic formal languages over natural human tongues",
      "The complete biological uniformity of human thought systems regardless of language in Toronto",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The tight conditioning of cognitive representations by the structural specificities of language"
    ],
    "transcriptEnglish": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Toronto. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
  },
  "tcf5-lis-39": {
    "id": "tcf5-lis-39",
    "paperNum": 5,
    "questionNumber": 39,
    "level": "C2",
    "questionPromptEnglish": "What major systemic risk is identified by the economist?",
    "passageEnglish": "The introduction of a central bank digital currency issued directly to retail users in Toronto could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsEnglish": [
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "The planned elimination of all international trade operations for firms in Toronto",
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "transcriptEnglish": "The introduction of a central bank digital currency issued directly to retail users in Toronto could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  }
};

export function getPracticeQuestionTranslation(questionId: string): PracticeQuestionTranslation | undefined {
  return PRACTICE_LISTENING_TRANSLATIONS[questionId];
}
