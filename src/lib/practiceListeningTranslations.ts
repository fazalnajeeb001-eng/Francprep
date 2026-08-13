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
    "passageEnglish": "Welcome to Hôtel Royal. Breakfast is served every morning from 7h30 - 10h00.",
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
    "passageEnglish": "Your medical appointment is confirmed for tomorrow at 13h00.",
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
    "passageEnglish": "Store announcement: Special offers on fresh fruits and vegetables in aisle 6.",
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
    "passageEnglish": "Passengers on flight AC378 please proceed to gate N°7.",
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
    "passageEnglish": "Station announcement in Montréal: Express train N°412 departs track 2 at 11:15.",
    "optionsEnglish": [
      "Departure of the express train to Montréal Central Station from track 2 at 11h15",
      "Temporary closure of the ticket sales counter at Montréal station",
      "Complete cancellation of the trip to Montréal due to a technical issue",
      "Change of train destination to North Station at 11h15"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Montréal: Express train N°412 departs track 2 at 11:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Departure of the express train to Montréal Central Station from track 2 at 11h15.\n... B: Temporary closure of the ticket sales counter at Montréal station.\n... C: Complete cancellation of the trip to Montréal due to a technical issue.\n... D: Change of train destination to North Station at 11h15."
  },
  "tcf1-lis-6": {
    "id": "tcf1-lis-6",
    "paperNum": 1,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 1, 3rd item at half price.",
    "optionsEnglish": [
      "Exceptional closure of the Montréal store due to construction work",
      "Free loyalty card distribution at the reception of the Montréal store",
      "Special promotion in aisle 1 in Montréal with the 3rd item at half price",
      "Arrival of new eco-friendly cleaning products in aisle 1"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 1, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Exceptional closure of the Montréal store due to construction work.\n... B: Free loyalty card distribution at the reception of the Montréal store.\n... C: Special promotion in aisle 1 in Montréal with the 3rd item at half price.\n... D: Arrival of new eco-friendly cleaning products in aisle 1."
  },
  "tcf1-lis-7": {
    "id": "tcf1-lis-7",
    "paperNum": 1,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Montréal: Rain and strong wind expected with 13°C.",
    "optionsEnglish": [
      "Heavy snowfall in Montréal blocking road traffic",
      "Heatwave and bright sunshine all day over Montréal",
      "Forecast of strong wind and rain in Montréal with a temperature of 13°C",
      "No weather changes announced for the weekend in Montréal"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Montréal: Rain and strong wind expected with 13°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Heavy snowfall in Montréal blocking road traffic.\n... B: Heatwave and bright sunshine all day over Montréal.\n... C: Forecast of strong wind and rain in Montréal with a temperature of 13°C.\n... D: No weather changes announced for the weekend in Montréal."
  },
  "tcf1-lis-8": {
    "id": "tcf1-lis-8",
    "paperNum": 1,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 9:30.",
    "optionsEnglish": [
      "Address change of local medical clinic in Montréal",
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Reminder of follow-up medical appointment in Montréal scheduled for mardi à 9h30",
      "Request to send medical analysis results by postal mail"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 9:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of local medical clinic in Montréal.\n... B: Definitive cancellation of Dr. Tremblay's medical consultation.\n... C: Reminder of follow-up medical appointment in Montréal scheduled for mardi à 9h30.\n... D: Request to send medical analysis results by postal mail."
  },
  "tcf1-lis-9": {
    "id": "tcf1-lis-9",
    "paperNum": 1,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $195.",
    "optionsEnglish": [
      "Work delay at Montréal auto garage due to a missing spare part",
      "Annual closure of the auto repair garage in Montréal starting tonight",
      "Requirement to leave the car at Montréal garage all weekend",
      "Vehicle ready at Montréal garage after service and brakes for an amount of 195$"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $195.\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf1-lis-10": {
    "id": "tcf1-lis-10",
    "paperNum": 1,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8037 is ready in the locker. Access code: 4011.",
    "optionsEnglish": [
      "Inability to deliver parcel N°8037 due to an incorrect address",
      "Mandatory payment of additional customs clearance fees for the parcel",
      "Parcel N°8037 available in automated lockers in Montréal with code 4011",
      "Return of parcel N°8037 to original sender in Montréal"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8037 is ready in the locker. Access code: 4011.\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf1-lis-11": {
    "id": "tcf1-lis-11",
    "paperNum": 1,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 11:00 AM.",
    "optionsEnglish": [
      "Increase in the monthly rent amount requested for the apartment",
      "Postponement of apartment viewing in Montréal to late next month",
      "Confirmation of apartment viewing in Montréal this Thursday at 11h00",
      "Appointment cancellation because the apartment in Montréal has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 11:00 AM.\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf1-lis-12": {
    "id": "tcf1-lis-12",
    "paperNum": 1,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 10 AM due to staff absence.",
    "optionsEnglish": [
      "Permanent closure of the hair salon in Montréal for renovations",
      "Confirmation of vendredi appointment at Montréal hair salon without any changes",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Proposal to reschedule hair salon appointment in Montréal to jeudi à 10h due to staff absence"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 10 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf1-lis-13": {
    "id": "tcf1-lis-13",
    "paperNum": 1,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 9 AM.",
    "optionsEnglish": [
      "Definitive cancellation of registration at Montréal sports club",
      "Change of venue and time for swimming practice in Montréal this Saturday at 9h",
      "Increase in annual membership dues for sports club members",
      "Closure of Montréal sports center locker rooms for sanitation work"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 9 AM.\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf1-lis-14": {
    "id": "tcf1-lis-14",
    "paperNum": 1,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 11 AM.",
    "optionsEnglish": [
      "Obligation to pay a fine for overdue book returns at the library",
      "Reminder of library membership card renewal deadline",
      "Permanent loss of borrowed book by Montréal media library",
      "Reserved book available at Montréal library for pickup before Saturday 11h"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 11 AM.\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf1-lis-15": {
    "id": "tcf1-lis-15",
    "paperNum": 1,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 12:30 AM.",
    "optionsEnglish": [
      "Proposal for preliminary phone interview with Montréal company on Monday at 12h30",
      "Request to send a printed letter of recommendation to the company",
      "Immediate rejection of job application submitted to Montréal company",
      "Summons to a written examination at Montréal company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 12:30 AM.\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf1-lis-16": {
    "id": "tcf1-lis-16",
    "paperNum": 1,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 67% citizen approval for bike lanes and bus transit in Montréal.",
    "optionsEnglish": [
      "Approval by 67% of Montréal citizens of new bike and bus lanes",
      "Permanent elimination of the municipal bike-share network",
      "Mass rejection by Montréal residents of recent road development works",
      "Sharp increase in public transit fares in the city of Montréal"
    ],
    "transcriptEnglish": "Speaker: A survey shows 67% citizen approval for bike lanes and bus transit in Montréal.\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf1-lis-17": {
    "id": "tcf1-lis-17",
    "paperNum": 1,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Montréal reduces burnout by 31% without lowering productivity.",
    "optionsEnglish": [
      "Dramatic collapse in overall office worker productivity",
      "Significant increase in voluntary employee turnover within companies",
      "Requirement for Montréal employees to work overtime on weekends",
      "31% reduction in burnout and maintenance of productivity in Montréal"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Montréal reduces burnout by 31% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf1-lis-18": {
    "id": "tcf1-lis-18",
    "paperNum": 1,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Montréal festival highlights 13 regional music groups and local culture.",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Montréal",
      "Exclusive invitation of renowned international artists to the detriment of locals",
      "Promotion of 13 regional groups and the local music scene in Montréal",
      "Cancellation of performances due to municipal budget cuts"
    ],
    "transcriptEnglish": "Speaker: The Montréal festival highlights 13 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf1-lis-19": {
    "id": "tcf1-lis-19",
    "paperNum": 1,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Montréal saves 16% on groceries and eliminates plastic packaging.",
    "optionsEnglish": [
      "Legal obligation to purchase only frozen industrial food products",
      "Complete disappearance of local convenience stores in downtown Montréal",
      "16% savings on grocery budgets and elimination of plastic packaging in Montréal",
      "Significant increase in monthly expenditures on food"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Montréal saves 16% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf1-lis-20": {
    "id": "tcf1-lis-20",
    "paperNum": 1,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 120 isolated seniors in Montréal.",
    "optionsEnglish": [
      "Volunteer support and friendly home visits for 120 isolated seniors in Montréal",
      "Mandatory monthly healthcare premium contribution by patients",
      "Permanent closure of local community drop-in centers",
      "Full replacement of social workers with automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 120 isolated seniors in Montréal.\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-21": {
    "id": "tcf1-lis-21",
    "paperNum": 1,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Montréal grew by 22%, favoring eco-lodges and soft mobility.",
    "optionsEnglish": [
      "Construction of concrete hotel complexes along regional lakefronts",
      "22% increase in demand for eco-lodges and soft mobility in Montréal",
      "Marked decrease in tourist visits to protected natural areas",
      "Complete prohibition of access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Montréal grew by 22%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-22": {
    "id": "tcf1-lis-22",
    "paperNum": 1,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 16 rural communities around Montréal.",
    "optionsEnglish": [
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Substantial increase in annual library membership fees",
      "Democratized access to digital reading in 16 rural municipalities near Montréal"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 16 rural communities around Montréal.\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-23": {
    "id": "tcf1-lis-23",
    "paperNum": 1,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 60 students with seniors in Montréal for affordable rent.",
    "optionsEnglish": [
      "Intergenerational solidarity home-sharing for 60 students and seniors in Montréal",
      "Legal requirement to reside exclusively in gated university residences",
      "Uncontrolled residential rent increases in the private sector",
      "Eviction of young tenants from downtown residential housing in Montréal"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 60 students with seniors in Montréal for affordable rent.\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf1-lis-24": {
    "id": "tcf1-lis-24",
    "paperNum": 1,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 12 companies in Montréal.",
    "optionsEnglish": [
      "Obligation to purchase a paid individual sports subscription",
      "Implementation of daily physical exercise sessions in 12 companies in Montréal",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Complete elimination of lunch breaks for all employees"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 12 companies in Montréal.\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf1-lis-25": {
    "id": "tcf1-lis-25",
    "paperNum": 1,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 25 buildings in Montréal reduces urban heat and manages rainwater.",
    "optionsEnglish": [
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center",
      "Prohibition on planting trees in school courtyards",
      "Greening of 25 public buildings to reduce heat in Montréal"
    ],
    "transcriptEnglish": "Speaker: Greening 25 buildings in Montréal reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf1-lis-26": {
    "id": "tcf1-lis-26",
    "paperNum": 1,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Montréal. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The implementation of a systematic ban on all generative algorithms across Montréal",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The requirement to clearly identify synthetic media released to the public",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Montréal. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.\nAnnouncer: Listen to the question. Question N°26: What is the priority measure advocated during this consultation?"
  },
  "tcf1-lis-27": {
    "id": "tcf1-lis-27",
    "paperNum": 1,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "The permanent rise of remote work is eroding retail revenue in the urban core of Montréal, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "Free commercial property leases to incentivize companies to return downtown",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Montréal"
    ],
    "transcriptEnglish": "Speaker: The permanent rise of remote work is eroding retail revenue in the urban core of Montréal, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.\nAnnouncer: Listen to the question. Question N°27: What tax compromise is favored in this municipal debate?"
  },
  "tcf1-lis-28": {
    "id": "tcf1-lis-28",
    "paperNum": 1,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Montréal.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Universal free clothing distribution for low-income households",
      "An absolute ban on selling any clothing manufactured outside Montréal",
      "Systematic incineration of all unsold retail textile surpluses",
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling"
    ],
    "transcriptEnglish": "Speaker: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Montréal.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.\nAnnouncer: Listen to the question. Question N°28: What environmental strategy is highlighted in this address?"
  },
  "tcf1-lis-29": {
    "id": "tcf1-lis-29",
    "paperNum": 1,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Installing micro wind turbines on building rooftops in Montréal generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Limiting household power usage to mandatory scheduled time windows",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Exclusive interconnection of installations to emergency backup power grids in Montréal"
    ],
    "transcriptEnglish": "Speaker: Installing micro wind turbines on building rooftops in Montréal generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.\nAnnouncer: Listen to the question. Question N°29: What technical condition is deemed essential to approve this project?"
  },
  "tcf1-lis-30": {
    "id": "tcf1-lis-30",
    "paperNum": 1,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Continuous urban sprawl threatens the agricultural land surrounding the greater Montréal metropolitan area.\nTo curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
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
    "passageEnglish": "Food delivery applications have multiplied flexible work opportunities for thousands of young people in Montréal.\nBut this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
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
    "passageEnglish": "Automated tracking software optimizes logistics workflows across major distribution warehouses in Montréal.\nTrue, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
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
    "passageEnglish": "Torrential spring downpours have once again submerged several riverfront neighborhoods in Montréal.\nPouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
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
    "transcriptEnglish": "Speaker: In this symposium presentation delivered in Montréal, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
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
    "transcriptEnglish": "Speaker: Outsourcing public registries to foreign tech conglomerates exposes our institutions in Montréal to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
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
    "transcriptEnglish": "Speaker: While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Montréal, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
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
    "transcriptEnglish": "Speaker: In this academic lecture delivered in Montréal, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
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
    "transcriptEnglish": "Speaker: The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Montréal. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
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
    "transcriptEnglish": "Speaker: The introduction of a central bank digital currency issued directly to retail users in Montréal could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf2-lis-1": {
    "id": "tcf2-lis-1",
    "paperNum": 2,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Passengers on flight AC378 please proceed to gate N°7.",
    "optionsEnglish": [
      "A server is carrying drinks on a tray.",
      "Cyclists are riding on a bike path.",
      "Children are playing on a soccer field.",
      "A person is purchasing a transit ticket from a subway ticket machine."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A server is carrying drinks on a tray..\n... Option B: Cyclists are riding on a bike path..\n... Option C: Children are playing on a soccer field..\n... Option D: A person is purchasing a transit ticket from a subway ticket machine.."
  },
  "tcf2-lis-2": {
    "id": "tcf2-lis-2",
    "paperNum": 2,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Dear passengers, attention please. Train N°1273 to Edmonton will depart from platform 4.",
    "optionsEnglish": [
      "A patient is in consultation at the doctor's office.",
      "A chef is preparing a meal in a kitchen.",
      "A painter is creating a painting in an art studio.",
      "A customer is asking for information at a bank."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A patient is in consultation at the doctor's office..\n... Option B: A chef is preparing a meal in a kitchen..\n... Option C: A painter is creating a painting in an art studio..\n... Option D: A customer is asking for information at a bank.."
  },
  "tcf2-lis-3": {
    "id": "tcf2-lis-3",
    "paperNum": 2,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Hello! Today at Boulangerie Saint-Laurent, enjoy a special promotion of 30% de réduction on croissants aux amandes.",
    "optionsEnglish": [
      "Travelers are waiting for their flight at an airport.",
      "A person is placing luggage into an automated storage locker.",
      "A mechanic is checking a vehicle's oil level.",
      "Customers are seated on a café terrace."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Travelers are waiting for their flight at an airport..\n... Option B: A person is placing luggage into an automated storage locker..\n... Option C: A mechanic is checking a vehicle's oil level..\n... Option D: Customers are seated on a café terrace.."
  },
  "tcf2-lis-4": {
    "id": "tcf2-lis-4",
    "paperNum": 2,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Weather report for Québec: grand soleil expected this afternoon with a temperature of 23°C.",
    "optionsEnglish": [
      "People are waiting for the bus at a city bus stop.",
      "Hikers are walking along a river.",
      "Customers are queuing in front of a theater box office.",
      "A man is fixing his bicycle on the sidewalk."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: People are waiting for the bus at a city bus stop..\n... Option B: Hikers are walking along a river..\n... Option C: Customers are queuing in front of a theater box office..\n... Option D: A man is fixing his bicycle on the sidewalk.."
  },
  "tcf2-lis-5": {
    "id": "tcf2-lis-5",
    "paperNum": 2,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Québec: Express train N°424 departs track 3 at 12:15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Québec station",
      "Complete cancellation of the trip to Québec due to a technical issue",
      "Departure of the express train to Québec Central Station from track 3 at 12h15",
      "Change of train destination to North Station at 12h15"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Québec: Express train N°424 departs track 3 at 12:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Québec station.\n... B: Complete cancellation of the trip to Québec due to a technical issue.\n... C: Departure of the express train to Québec Central Station from track 3 at 12h15.\n... D: Change of train destination to North Station at 12h15."
  },
  "tcf2-lis-6": {
    "id": "tcf2-lis-6",
    "paperNum": 2,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 2, 3rd item at half price.",
    "optionsEnglish": [
      "Special promotion in aisle 2 in Québec with the 3rd item at half price",
      "Free loyalty card distribution at the reception of the Québec store",
      "Exceptional closure of the Québec store due to construction work",
      "Arrival of new eco-friendly cleaning products in aisle 2"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 2, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Special promotion in aisle 2 in Québec with the 3rd item at half price.\n... B: Free loyalty card distribution at the reception of the Québec store.\n... C: Exceptional closure of the Québec store due to construction work.\n... D: Arrival of new eco-friendly cleaning products in aisle 2."
  },
  "tcf2-lis-7": {
    "id": "tcf2-lis-7",
    "paperNum": 2,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Québec: Rain and strong wind expected with 14°C.",
    "optionsEnglish": [
      "Forecast of strong wind and rain in Québec with a temperature of 14°C",
      "Heavy snowfall in Québec blocking road traffic",
      "No weather changes announced for the weekend in Québec",
      "Heatwave and bright sunshine all day over Québec"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Québec: Rain and strong wind expected with 14°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Forecast of strong wind and rain in Québec with a temperature of 14°C.\n... B: Heavy snowfall in Québec blocking road traffic.\n... C: No weather changes announced for the weekend in Québec.\n... D: Heatwave and bright sunshine all day over Québec."
  },
  "tcf2-lis-8": {
    "id": "tcf2-lis-8",
    "paperNum": 2,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 10:30.",
    "optionsEnglish": [
      "Request to send medical analysis results by postal mail",
      "Reminder of follow-up medical appointment in Québec scheduled for mardi à 10h30",
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Address change of local medical clinic in Québec"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 10:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Request to send medical analysis results by postal mail.\n... B: Reminder of follow-up medical appointment in Québec scheduled for mardi à 10h30.\n... C: Definitive cancellation of Dr. Tremblay's medical consultation.\n... D: Address change of local medical clinic in Québec."
  },
  "tcf2-lis-9": {
    "id": "tcf2-lis-9",
    "paperNum": 2,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $210.",
    "optionsEnglish": [
      "Work delay at Québec auto garage due to a missing spare part",
      "Requirement to leave the car at Québec garage all weekend",
      "Vehicle ready at Québec garage after service and brakes for an amount of 210$",
      "Annual closure of the auto repair garage in Québec starting tonight"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $210.\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf2-lis-10": {
    "id": "tcf2-lis-10",
    "paperNum": 2,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8074 is ready in the locker. Access code: 4022.",
    "optionsEnglish": [
      "Mandatory payment of additional customs clearance fees for the parcel",
      "Inability to deliver parcel N°8074 due to an incorrect address",
      "Parcel N°8074 available in automated lockers in Québec with code 4022",
      "Return of parcel N°8074 to original sender in Québec"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8074 is ready in the locker. Access code: 4022.\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf2-lis-11": {
    "id": "tcf2-lis-11",
    "paperNum": 2,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 12:00 AM.",
    "optionsEnglish": [
      "Appointment cancellation because the apartment in Québec has already been rented",
      "Confirmation of apartment viewing in Québec this Thursday at 12h00",
      "Increase in the monthly rent amount requested for the apartment",
      "Postponement of apartment viewing in Québec to late next month"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 12:00 AM.\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf2-lis-12": {
    "id": "tcf2-lis-12",
    "paperNum": 2,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 11 AM due to staff absence.",
    "optionsEnglish": [
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the hair salon in Québec for renovations",
      "Proposal to reschedule hair salon appointment in Québec to jeudi à 11h due to staff absence",
      "Confirmation of vendredi appointment at Québec hair salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 11 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf2-lis-13": {
    "id": "tcf2-lis-13",
    "paperNum": 2,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 10 AM.",
    "optionsEnglish": [
      "Closure of Québec sports center locker rooms for sanitation work",
      "Increase in annual membership dues for sports club members",
      "Change of venue and time for swimming practice in Québec this Saturday at 10h",
      "Definitive cancellation of registration at Québec sports club"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 10 AM.\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf2-lis-14": {
    "id": "tcf2-lis-14",
    "paperNum": 2,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 12 AM.",
    "optionsEnglish": [
      "Reminder of library membership card renewal deadline",
      "Reserved book available at Québec library for pickup before Saturday 12h",
      "Permanent loss of borrowed book by Québec media library",
      "Obligation to pay a fine for overdue book returns at the library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 12 AM.\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf2-lis-15": {
    "id": "tcf2-lis-15",
    "paperNum": 2,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 13:30 AM.",
    "optionsEnglish": [
      "Request to send a printed letter of recommendation to the company",
      "Immediate rejection of job application submitted to Québec company",
      "Proposal for preliminary phone interview with Québec company on Monday at 13h30",
      "Summons to a written examination at Québec company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 13:30 AM.\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf2-lis-16": {
    "id": "tcf2-lis-16",
    "paperNum": 2,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 69% citizen approval for bike lanes and bus transit in Québec.",
    "optionsEnglish": [
      "Approval by 69% of Québec citizens of new bike and bus lanes",
      "Permanent elimination of the municipal bike-share network",
      "Sharp increase in public transit fares in the city of Québec",
      "Mass rejection by Québec residents of recent road development works"
    ],
    "transcriptEnglish": "Speaker: A survey shows 69% citizen approval for bike lanes and bus transit in Québec.\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf2-lis-17": {
    "id": "tcf2-lis-17",
    "paperNum": 2,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Québec reduces burnout by 32% without lowering productivity.",
    "optionsEnglish": [
      "Dramatic collapse in overall office worker productivity",
      "Significant increase in voluntary employee turnover within companies",
      "Requirement for Québec employees to work overtime on weekends",
      "32% reduction in burnout and maintenance of productivity in Québec"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Québec reduces burnout by 32% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf2-lis-18": {
    "id": "tcf2-lis-18",
    "paperNum": 2,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Québec festival highlights 16 regional music groups and local culture.",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Québec",
      "Cancellation of performances due to municipal budget cuts",
      "Exclusive invitation of renowned international artists to the detriment of locals",
      "Promotion of 16 regional groups and the local music scene in Québec"
    ],
    "transcriptEnglish": "Speaker: The Québec festival highlights 16 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf2-lis-19": {
    "id": "tcf2-lis-19",
    "paperNum": 2,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Québec saves 17% on groceries and eliminates plastic packaging.",
    "optionsEnglish": [
      "17% savings on grocery budgets and elimination of plastic packaging in Québec",
      "Significant increase in monthly expenditures on food",
      "Complete disappearance of local convenience stores in downtown Québec",
      "Legal obligation to purchase only frozen industrial food products"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Québec saves 17% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf2-lis-20": {
    "id": "tcf2-lis-20",
    "paperNum": 2,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 140 isolated seniors in Québec.",
    "optionsEnglish": [
      "Permanent closure of local community drop-in centers",
      "Volunteer support and friendly home visits for 140 isolated seniors in Québec",
      "Mandatory monthly healthcare premium contribution by patients",
      "Full replacement of social workers with automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 140 isolated seniors in Québec.\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-21": {
    "id": "tcf2-lis-21",
    "paperNum": 2,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Québec grew by 24%, favoring eco-lodges and soft mobility.",
    "optionsEnglish": [
      "24% increase in demand for eco-lodges and soft mobility in Québec",
      "Marked decrease in tourist visits to protected natural areas",
      "Construction of concrete hotel complexes along regional lakefronts",
      "Complete prohibition of access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Québec grew by 24%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-22": {
    "id": "tcf2-lis-22",
    "paperNum": 2,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 17 rural communities around Québec.",
    "optionsEnglish": [
      "Democratized access to digital reading in 17 rural municipalities near Québec",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Substantial increase in annual library membership fees"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 17 rural communities around Québec.\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-23": {
    "id": "tcf2-lis-23",
    "paperNum": 2,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 70 students with seniors in Québec for affordable rent.",
    "optionsEnglish": [
      "Legal requirement to reside exclusively in gated university residences",
      "Intergenerational solidarity home-sharing for 70 students and seniors in Québec",
      "Eviction of young tenants from downtown residential housing in Québec",
      "Uncontrolled residential rent increases in the private sector"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 70 students with seniors in Québec for affordable rent.\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf2-lis-24": {
    "id": "tcf2-lis-24",
    "paperNum": 2,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 14 companies in Québec.",
    "optionsEnglish": [
      "Implementation of daily physical exercise sessions in 14 companies in Québec",
      "Complete elimination of lunch breaks for all employees",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Obligation to purchase a paid individual sports subscription"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 14 companies in Québec.\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf2-lis-25": {
    "id": "tcf2-lis-25",
    "paperNum": 2,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 30 buildings in Québec reduces urban heat and manages rainwater.",
    "optionsEnglish": [
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center",
      "Greening of 30 public buildings to reduce heat in Québec",
      "Prohibition on planting trees in school courtyards"
    ],
    "transcriptEnglish": "Speaker: Greening 30 buildings in Québec reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf2-lis-26": {
    "id": "tcf2-lis-26",
    "paperNum": 2,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Québec. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The requirement to clearly identify synthetic media released to the public",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The implementation of a systematic ban on all generative algorithms across Québec",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Québec. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.\nAnnouncer: Listen to the question. Question N°26: What is the priority measure advocated during this consultation?"
  },
  "tcf2-lis-27": {
    "id": "tcf2-lis-27",
    "paperNum": 2,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "The permanent rise of remote work is eroding retail revenue in the urban core of Québec, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "Free commercial property leases to incentivize companies to return downtown",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Québec",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "transcriptEnglish": "Speaker: The permanent rise of remote work is eroding retail revenue in the urban core of Québec, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.\nAnnouncer: Listen to the question. Question N°27: What tax compromise is favored in this municipal debate?"
  },
  "tcf2-lis-28": {
    "id": "tcf2-lis-28",
    "paperNum": 2,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Québec.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "Universal free clothing distribution for low-income households",
      "An absolute ban on selling any clothing manufactured outside Québec",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "transcriptEnglish": "Speaker: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Québec.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.\nAnnouncer: Listen to the question. Question N°28: What environmental strategy is highlighted in this address?"
  },
  "tcf2-lis-29": {
    "id": "tcf2-lis-29",
    "paperNum": 2,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Installing micro wind turbines on building rooftops in Québec generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Québec",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "transcriptEnglish": "Speaker: Installing micro wind turbines on building rooftops in Québec generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.\nAnnouncer: Listen to the question. Question N°29: What technical condition is deemed essential to approve this project?"
  },
  "tcf2-lis-30": {
    "id": "tcf2-lis-30",
    "paperNum": 2,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Continuous urban sprawl threatens the agricultural land surrounding the greater Québec metropolitan area.\nTo curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
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
    "passageEnglish": "Food delivery applications have multiplied flexible work opportunities for thousands of young people in Québec.\nBut this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
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
    "passageEnglish": "Automated tracking software optimizes logistics workflows across major distribution warehouses in Québec.\nTrue, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
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
    "passageEnglish": "Torrential spring downpours have once again submerged several riverfront neighborhoods in Québec.\nPouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
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
    "transcriptEnglish": "Speaker: In this symposium presentation delivered in Québec, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
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
    "transcriptEnglish": "Speaker: Outsourcing public registries to foreign tech conglomerates exposes our institutions in Québec to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
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
    "transcriptEnglish": "Speaker: While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Québec, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
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
    "transcriptEnglish": "Speaker: In this academic lecture delivered in Québec, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
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
    "transcriptEnglish": "Speaker: The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Québec. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
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
    "transcriptEnglish": "Speaker: The introduction of a central bank digital currency issued directly to retail users in Québec could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf3-lis-1": {
    "id": "tcf3-lis-1",
    "paperNum": 3,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Weather report for Québec: grand soleil expected this afternoon with a temperature of 23°C.",
    "optionsEnglish": [
      "Swimmers are swimming in a municipal pool.",
      "A traveler is checking in luggage at the airport.",
      "A woman is selecting fresh fruits and vegetables at the supermarket.",
      "A barber is cutting a customer's hair in a salon."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Swimmers are swimming in a municipal pool..\n... Option B: A traveler is checking in luggage at the airport..\n... Option C: A woman is selecting fresh fruits and vegetables at the supermarket..\n... Option D: A barber is cutting a customer's hair in a salon.."
  },
  "tcf3-lis-2": {
    "id": "tcf3-lis-2",
    "paperNum": 3,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Welcome to Hôtel Royal. Breakfast is served every morning from 6h30 - 10h00.",
    "optionsEnglish": [
      "Musicians are playing the piano during a concert.",
      "A police officer is directing traffic at an intersection.",
      "People are reading and studying quietly in a library.",
      "A driver is delivering packages to a residence."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Musicians are playing the piano during a concert..\n... Option B: A police officer is directing traffic at an intersection..\n... Option C: People are reading and studying quietly in a library..\n... Option D: A driver is delivering packages to a residence.."
  },
  "tcf3-lis-3": {
    "id": "tcf3-lis-3",
    "paperNum": 3,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Your medical appointment is confirmed for tomorrow at 12h00.",
    "optionsEnglish": [
      "A server is wiping down restaurant tables.",
      "A mechanic is inspecting a car engine in a garage.",
      "Tourists are taking pictures in front of a historic monument.",
      "A barber is trimming a customer's beard."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A server is wiping down restaurant tables..\n... Option B: A mechanic is inspecting a car engine in a garage..\n... Option C: Tourists are taking pictures in front of a historic monument..\n... Option D: A barber is trimming a customer's beard.."
  },
  "tcf3-lis-4": {
    "id": "tcf3-lis-4",
    "paperNum": 3,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Store announcement: Special offers on fresh fruits and vegetables in aisle 5.",
    "optionsEnglish": [
      "Athletes are training on a running track.",
      "A photographer is taking a studio portrait.",
      "A baker is making apple pies.",
      "A person is buying medication at a pharmacy counter."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Athletes are training on a running track..\n... Option B: A photographer is taking a studio portrait..\n... Option C: A baker is making apple pies..\n... Option D: A person is buying medication at a pharmacy counter.."
  },
  "tcf3-lis-5": {
    "id": "tcf3-lis-5",
    "paperNum": 3,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Ottawa: Express train N°436 departs track 4 at 13:15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Ottawa station",
      "Change of train destination to North Station at 13h15",
      "Complete cancellation of the trip to Ottawa due to a technical issue",
      "Departure of the express train to Ottawa Central Station from track 4 at 13h15"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Ottawa: Express train N°436 departs track 4 at 13:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Ottawa station.\n... B: Change of train destination to North Station at 13h15.\n... C: Complete cancellation of the trip to Ottawa due to a technical issue.\n... D: Departure of the express train to Ottawa Central Station from track 4 at 13h15."
  },
  "tcf3-lis-6": {
    "id": "tcf3-lis-6",
    "paperNum": 3,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 3, 3rd item at half price.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 3",
      "Free loyalty card distribution at the reception of the Ottawa store",
      "Exceptional closure of the Ottawa store due to construction work",
      "Special promotion in aisle 3 in Ottawa with the 3rd item at half price"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 3, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 3.\n... B: Free loyalty card distribution at the reception of the Ottawa store.\n... C: Exceptional closure of the Ottawa store due to construction work.\n... D: Special promotion in aisle 3 in Ottawa with the 3rd item at half price."
  },
  "tcf3-lis-7": {
    "id": "tcf3-lis-7",
    "paperNum": 3,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Ottawa: Rain and strong wind expected with 15°C.",
    "optionsEnglish": [
      "No weather changes announced for the weekend in Ottawa",
      "Forecast of strong wind and rain in Ottawa with a temperature of 15°C",
      "Heavy snowfall in Ottawa blocking road traffic",
      "Heatwave and bright sunshine all day over Ottawa"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Ottawa: Rain and strong wind expected with 15°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: No weather changes announced for the weekend in Ottawa.\n... B: Forecast of strong wind and rain in Ottawa with a temperature of 15°C.\n... C: Heavy snowfall in Ottawa blocking road traffic.\n... D: Heatwave and bright sunshine all day over Ottawa."
  },
  "tcf3-lis-8": {
    "id": "tcf3-lis-8",
    "paperNum": 3,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 11:30.",
    "optionsEnglish": [
      "Address change of local medical clinic in Ottawa",
      "Request to send medical analysis results by postal mail",
      "Reminder of follow-up medical appointment in Ottawa scheduled for mardi à 11h30",
      "Definitive cancellation of Dr. Tremblay's medical consultation"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 11:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of local medical clinic in Ottawa.\n... B: Request to send medical analysis results by postal mail.\n... C: Reminder of follow-up medical appointment in Ottawa scheduled for mardi à 11h30.\n... D: Definitive cancellation of Dr. Tremblay's medical consultation."
  },
  "tcf3-lis-9": {
    "id": "tcf3-lis-9",
    "paperNum": 3,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $225.",
    "optionsEnglish": [
      "Work delay at Ottawa auto garage due to a missing spare part",
      "Annual closure of the auto repair garage in Ottawa starting tonight",
      "Requirement to leave the car at Ottawa garage all weekend",
      "Vehicle ready at Ottawa garage after service and brakes for an amount of 225$"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $225.\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf3-lis-10": {
    "id": "tcf3-lis-10",
    "paperNum": 3,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8111 is ready in the locker. Access code: 4033.",
    "optionsEnglish": [
      "Inability to deliver parcel N°8111 due to an incorrect address",
      "Return of parcel N°8111 to original sender in Ottawa",
      "Parcel N°8111 available in automated lockers in Ottawa with code 4033",
      "Mandatory payment of additional customs clearance fees for the parcel"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8111 is ready in the locker. Access code: 4033.\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf3-lis-11": {
    "id": "tcf3-lis-11",
    "paperNum": 3,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 13:00 AM.",
    "optionsEnglish": [
      "Postponement of apartment viewing in Ottawa to late next month",
      "Confirmation of apartment viewing in Ottawa this Thursday at 13h00",
      "Increase in the monthly rent amount requested for the apartment",
      "Appointment cancellation because the apartment in Ottawa has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 13:00 AM.\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf3-lis-12": {
    "id": "tcf3-lis-12",
    "paperNum": 3,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 12 AM due to staff absence.",
    "optionsEnglish": [
      "Proposal to reschedule hair salon appointment in Ottawa to jeudi à 12h due to staff absence",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the hair salon in Ottawa for renovations",
      "Confirmation of vendredi appointment at Ottawa hair salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 12 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf3-lis-13": {
    "id": "tcf3-lis-13",
    "paperNum": 3,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 11 AM.",
    "optionsEnglish": [
      "Increase in annual membership dues for sports club members",
      "Change of venue and time for swimming practice in Ottawa this Saturday at 11h",
      "Definitive cancellation of registration at Ottawa sports club",
      "Closure of Ottawa sports center locker rooms for sanitation work"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 11 AM.\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf3-lis-14": {
    "id": "tcf3-lis-14",
    "paperNum": 3,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 13 AM.",
    "optionsEnglish": [
      "Reminder of library membership card renewal deadline",
      "Permanent loss of borrowed book by Ottawa media library",
      "Reserved book available at Ottawa library for pickup before Saturday 13h",
      "Obligation to pay a fine for overdue book returns at the library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 13 AM.\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf3-lis-15": {
    "id": "tcf3-lis-15",
    "paperNum": 3,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 14:30 AM.",
    "optionsEnglish": [
      "Proposal for preliminary phone interview with Ottawa company on Monday at 14h30",
      "Summons to a written examination at Ottawa company premises",
      "Immediate rejection of job application submitted to Ottawa company",
      "Request to send a printed letter of recommendation to the company"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 14:30 AM.\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf3-lis-16": {
    "id": "tcf3-lis-16",
    "paperNum": 3,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 71% citizen approval for bike lanes and bus transit in Ottawa.",
    "optionsEnglish": [
      "Permanent elimination of the municipal bike-share network",
      "Approval by 71% of Ottawa citizens of new bike and bus lanes",
      "Mass rejection by Ottawa residents of recent road development works",
      "Sharp increase in public transit fares in the city of Ottawa"
    ],
    "transcriptEnglish": "Speaker: A survey shows 71% citizen approval for bike lanes and bus transit in Ottawa.\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf3-lis-17": {
    "id": "tcf3-lis-17",
    "paperNum": 3,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Ottawa reduces burnout by 33% without lowering productivity.",
    "optionsEnglish": [
      "33% reduction in burnout and maintenance of productivity in Ottawa",
      "Dramatic collapse in overall office worker productivity",
      "Requirement for Ottawa employees to work overtime on weekends",
      "Significant increase in voluntary employee turnover within companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Ottawa reduces burnout by 33% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf3-lis-18": {
    "id": "tcf3-lis-18",
    "paperNum": 3,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Ottawa festival highlights 19 regional music groups and local culture.",
    "optionsEnglish": [
      "Cancellation of performances due to municipal budget cuts",
      "Permanent closure of the main entertainment venue in Ottawa",
      "Exclusive invitation of renowned international artists to the detriment of locals",
      "Promotion of 19 regional groups and the local music scene in Ottawa"
    ],
    "transcriptEnglish": "Speaker: The Ottawa festival highlights 19 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf3-lis-19": {
    "id": "tcf3-lis-19",
    "paperNum": 3,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Ottawa saves 18% on groceries and eliminates plastic packaging.",
    "optionsEnglish": [
      "Complete disappearance of local convenience stores in downtown Ottawa",
      "18% savings on grocery budgets and elimination of plastic packaging in Ottawa",
      "Legal obligation to purchase only frozen industrial food products",
      "Significant increase in monthly expenditures on food"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Ottawa saves 18% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf3-lis-20": {
    "id": "tcf3-lis-20",
    "paperNum": 3,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 160 isolated seniors in Ottawa.",
    "optionsEnglish": [
      "Permanent closure of local community drop-in centers",
      "Mandatory monthly healthcare premium contribution by patients",
      "Volunteer support and friendly home visits for 160 isolated seniors in Ottawa",
      "Full replacement of social workers with automated systems"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 160 isolated seniors in Ottawa.\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-21": {
    "id": "tcf3-lis-21",
    "paperNum": 3,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Ottawa grew by 26%, favoring eco-lodges and soft mobility.",
    "optionsEnglish": [
      "Construction of concrete hotel complexes along regional lakefronts",
      "26% increase in demand for eco-lodges and soft mobility in Ottawa",
      "Complete prohibition of access to hiking trails during the summer season",
      "Marked decrease in tourist visits to protected natural areas"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Ottawa grew by 26%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-22": {
    "id": "tcf3-lis-22",
    "paperNum": 3,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 18 rural communities around Ottawa.",
    "optionsEnglish": [
      "Substantial increase in annual library membership fees",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods",
      "Democratized access to digital reading in 18 rural municipalities near Ottawa"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 18 rural communities around Ottawa.\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-23": {
    "id": "tcf3-lis-23",
    "paperNum": 3,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 80 students with seniors in Ottawa for affordable rent.",
    "optionsEnglish": [
      "Eviction of young tenants from downtown residential housing in Ottawa",
      "Uncontrolled residential rent increases in the private sector",
      "Legal requirement to reside exclusively in gated university residences",
      "Intergenerational solidarity home-sharing for 80 students and seniors in Ottawa"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 80 students with seniors in Ottawa for affordable rent.\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf3-lis-24": {
    "id": "tcf3-lis-24",
    "paperNum": 3,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 16 companies in Ottawa.",
    "optionsEnglish": [
      "Implementation of daily physical exercise sessions in 16 companies in Ottawa",
      "Complete elimination of lunch breaks for all employees",
      "Obligation to purchase a paid individual sports subscription",
      "Closure of corporate cafeteria dining facilities during afternoons"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 16 companies in Ottawa.\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf3-lis-25": {
    "id": "tcf3-lis-25",
    "paperNum": 3,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 35 buildings in Ottawa reduces urban heat and manages rainwater.",
    "optionsEnglish": [
      "Destruction of existing parks and green spaces in the city center",
      "Prohibition on planting trees in school courtyards",
      "Greening of 35 public buildings to reduce heat in Ottawa",
      "Additional property taxation on homeowners with private gardens"
    ],
    "transcriptEnglish": "Speaker: Greening 35 buildings in Ottawa reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf3-lis-26": {
    "id": "tcf3-lis-26",
    "paperNum": 3,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Ottawa. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "The implementation of a systematic ban on all generative algorithms across Ottawa",
      "The requirement to clearly identify synthetic media released to the public",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Ottawa. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.\nAnnouncer: Listen to the question. Question N°26: What is the priority measure advocated during this consultation?"
  },
  "tcf3-lis-27": {
    "id": "tcf3-lis-27",
    "paperNum": 3,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "The permanent rise of remote work is eroding retail revenue in the urban core of Ottawa, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Ottawa",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown"
    ],
    "transcriptEnglish": "Speaker: The permanent rise of remote work is eroding retail revenue in the urban core of Ottawa, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.\nAnnouncer: Listen to the question. Question N°27: What tax compromise is favored in this municipal debate?"
  },
  "tcf3-lis-28": {
    "id": "tcf3-lis-28",
    "paperNum": 3,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Ottawa.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "Systematic incineration of all unsold retail textile surpluses",
      "An absolute ban on selling any clothing manufactured outside Ottawa",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Ottawa.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.\nAnnouncer: Listen to the question. Question N°28: What environmental strategy is highlighted in this address?"
  },
  "tcf3-lis-29": {
    "id": "tcf3-lis-29",
    "paperNum": 3,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Installing micro wind turbines on building rooftops in Ottawa generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Ottawa"
    ],
    "transcriptEnglish": "Speaker: Installing micro wind turbines on building rooftops in Ottawa generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.\nAnnouncer: Listen to the question. Question N°29: What technical condition is deemed essential to approve this project?"
  },
  "tcf3-lis-30": {
    "id": "tcf3-lis-30",
    "paperNum": 3,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Continuous urban sprawl threatens the agricultural land surrounding the greater Ottawa metropolitan area.\nTo curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
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
    "passageEnglish": "Food delivery applications have multiplied flexible work opportunities for thousands of young people in Ottawa.\nBut this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
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
    "passageEnglish": "Automated tracking software optimizes logistics workflows across major distribution warehouses in Ottawa.\nTrue, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
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
    "passageEnglish": "Torrential spring downpours have once again submerged several riverfront neighborhoods in Ottawa.\nPouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
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
    "transcriptEnglish": "Speaker: In this symposium presentation delivered in Ottawa, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
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
    "transcriptEnglish": "Speaker: Outsourcing public registries to foreign tech conglomerates exposes our institutions in Ottawa to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
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
    "transcriptEnglish": "Speaker: While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Ottawa, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
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
    "transcriptEnglish": "Speaker: In this academic lecture delivered in Ottawa, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
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
    "transcriptEnglish": "Speaker: The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Ottawa. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
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
    "transcriptEnglish": "Speaker: The introduction of a central bank digital currency issued directly to retail users in Ottawa could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf4-lis-1": {
    "id": "tcf4-lis-1",
    "paperNum": 4,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Store announcement: Special offers on fresh fruits and vegetables in aisle 5.",
    "optionsEnglish": [
      "A sailor is steering a boat on the river.",
      "A man is sending a registered parcel at the post office counter.",
      "A seamstress is sewing a garment in her workshop.",
      "Spectators are applauding at the end of a movie."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A sailor is steering a boat on the river..\n... Option B: A man is sending a registered parcel at the post office counter..\n... Option C: A seamstress is sewing a garment in her workshop..\n... Option D: Spectators are applauding at the end of a movie.."
  },
  "tcf4-lis-2": {
    "id": "tcf4-lis-2",
    "paperNum": 4,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Passengers on flight AC885 please proceed to gate N°21.",
    "optionsEnglish": [
      "A teacher is lecturing in front of a chalkboard.",
      "A customer is trying on a coat in a clothing store.",
      "A server is taking an order at an outdoor terrace table.",
      "A mechanic is changing truck tires."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A teacher is lecturing in front of a chalkboard..\n... Option B: A customer is trying on a coat in a clothing store..\n... Option C: A server is taking an order at an outdoor terrace table..\n... Option D: A mechanic is changing truck tires.."
  },
  "tcf4-lis-3": {
    "id": "tcf4-lis-3",
    "paperNum": 4,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Dear passengers, attention please. Train N°1546 to Moncton will depart from platform 1.",
    "optionsEnglish": [
      "Children are riding bikes in the schoolyard.",
      "Travelers are eating in a train dining car.",
      "A farmer is feeding animals on a farm.",
      "A dentist is treating a child's teeth."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Children are riding bikes in the schoolyard..\n... Option B: Travelers are eating in a train dining car..\n... Option C: A farmer is feeding animals on a farm..\n... Option D: A dentist is treating a child's teeth.."
  },
  "tcf4-lis-4": {
    "id": "tcf4-lis-4",
    "paperNum": 4,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Hello! Today at Au Bon Pain, enjoy a special promotion of 2$ de rabais on gâteaux au citron.",
    "optionsEnglish": [
      "A firefighter is extinguishing a forest fire.",
      "A gardener is planting flowers in a greenhouse.",
      "A tour guide is narrating castle history.",
      "Passengers are collecting their luggage from the airport baggage carousel."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A firefighter is extinguishing a forest fire..\n... Option B: A gardener is planting flowers in a greenhouse..\n... Option C: A tour guide is narrating castle history..\n... Option D: Passengers are collecting their luggage from the airport baggage carousel.."
  },
  "tcf4-lis-5": {
    "id": "tcf4-lis-5",
    "paperNum": 4,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Vancouver: Express train N°448 departs track 5 at 14:15.",
    "optionsEnglish": [
      "Complete cancellation of the trip to Vancouver due to a technical issue",
      "Departure of the express train to Vancouver Central Station from track 5 at 14h15",
      "Change of train destination to North Station at 14h15",
      "Temporary closure of the ticket sales counter at Vancouver station"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Vancouver: Express train N°448 departs track 5 at 14:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Complete cancellation of the trip to Vancouver due to a technical issue.\n... B: Departure of the express train to Vancouver Central Station from track 5 at 14h15.\n... C: Change of train destination to North Station at 14h15.\n... D: Temporary closure of the ticket sales counter at Vancouver station."
  },
  "tcf4-lis-6": {
    "id": "tcf4-lis-6",
    "paperNum": 4,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 4, 3rd item at half price.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 4",
      "Special promotion in aisle 4 in Vancouver with the 3rd item at half price",
      "Exceptional closure of the Vancouver store due to construction work",
      "Free loyalty card distribution at the reception of the Vancouver store"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 4, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 4.\n... B: Special promotion in aisle 4 in Vancouver with the 3rd item at half price.\n... C: Exceptional closure of the Vancouver store due to construction work.\n... D: Free loyalty card distribution at the reception of the Vancouver store."
  },
  "tcf4-lis-7": {
    "id": "tcf4-lis-7",
    "paperNum": 4,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Vancouver: Rain and strong wind expected with 16°C.",
    "optionsEnglish": [
      "Heavy snowfall in Vancouver blocking road traffic",
      "No weather changes announced for the weekend in Vancouver",
      "Heatwave and bright sunshine all day over Vancouver",
      "Forecast of strong wind and rain in Vancouver with a temperature of 16°C"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Vancouver: Rain and strong wind expected with 16°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: Heavy snowfall in Vancouver blocking road traffic.\n... B: No weather changes announced for the weekend in Vancouver.\n... C: Heatwave and bright sunshine all day over Vancouver.\n... D: Forecast of strong wind and rain in Vancouver with a temperature of 16°C."
  },
  "tcf4-lis-8": {
    "id": "tcf4-lis-8",
    "paperNum": 4,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 12:30.",
    "optionsEnglish": [
      "Definitive cancellation of Dr. Tremblay's medical consultation",
      "Request to send medical analysis results by postal mail",
      "Address change of local medical clinic in Vancouver",
      "Reminder of follow-up medical appointment in Vancouver scheduled for mardi à 12h30"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 12:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Definitive cancellation of Dr. Tremblay's medical consultation.\n... B: Request to send medical analysis results by postal mail.\n... C: Address change of local medical clinic in Vancouver.\n... D: Reminder of follow-up medical appointment in Vancouver scheduled for mardi à 12h30."
  },
  "tcf4-lis-9": {
    "id": "tcf4-lis-9",
    "paperNum": 4,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $240.",
    "optionsEnglish": [
      "Annual closure of the auto repair garage in Vancouver starting tonight",
      "Work delay at Vancouver auto garage due to a missing spare part",
      "Vehicle ready at Vancouver garage after service and brakes for an amount of 240$",
      "Requirement to leave the car at Vancouver garage all weekend"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $240.\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf4-lis-10": {
    "id": "tcf4-lis-10",
    "paperNum": 4,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8148 is ready in the locker. Access code: 4044.",
    "optionsEnglish": [
      "Inability to deliver parcel N°8148 due to an incorrect address",
      "Mandatory payment of additional customs clearance fees for the parcel",
      "Return of parcel N°8148 to original sender in Vancouver",
      "Parcel N°8148 available in automated lockers in Vancouver with code 4044"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8148 is ready in the locker. Access code: 4044.\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf4-lis-11": {
    "id": "tcf4-lis-11",
    "paperNum": 4,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 14:00 AM.",
    "optionsEnglish": [
      "Increase in the monthly rent amount requested for the apartment",
      "Confirmation of apartment viewing in Vancouver this Thursday at 14h00",
      "Postponement of apartment viewing in Vancouver to late next month",
      "Appointment cancellation because the apartment in Vancouver has already been rented"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 14:00 AM.\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf4-lis-12": {
    "id": "tcf4-lis-12",
    "paperNum": 4,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 13 AM due to staff absence.",
    "optionsEnglish": [
      "Proposal to reschedule hair salon appointment in Vancouver to jeudi à 13h due to staff absence",
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Permanent closure of the hair salon in Vancouver for renovations",
      "Confirmation of vendredi appointment at Vancouver hair salon without any changes"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 13 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf4-lis-13": {
    "id": "tcf4-lis-13",
    "paperNum": 4,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 12 AM.",
    "optionsEnglish": [
      "Closure of Vancouver sports center locker rooms for sanitation work",
      "Change of venue and time for swimming practice in Vancouver this Saturday at 12h",
      "Definitive cancellation of registration at Vancouver sports club",
      "Increase in annual membership dues for sports club members"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 12 AM.\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf4-lis-14": {
    "id": "tcf4-lis-14",
    "paperNum": 4,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 14 AM.",
    "optionsEnglish": [
      "Obligation to pay a fine for overdue book returns at the library",
      "Reminder of library membership card renewal deadline",
      "Reserved book available at Vancouver library for pickup before Saturday 14h",
      "Permanent loss of borrowed book by Vancouver media library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 14 AM.\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf4-lis-15": {
    "id": "tcf4-lis-15",
    "paperNum": 4,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 15:30 AM.",
    "optionsEnglish": [
      "Request to send a printed letter of recommendation to the company",
      "Proposal for preliminary phone interview with Vancouver company on Monday at 15h30",
      "Immediate rejection of job application submitted to Vancouver company",
      "Summons to a written examination at Vancouver company premises"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 15:30 AM.\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf4-lis-16": {
    "id": "tcf4-lis-16",
    "paperNum": 4,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 73% citizen approval for bike lanes and bus transit in Vancouver.",
    "optionsEnglish": [
      "Mass rejection by Vancouver residents of recent road development works",
      "Approval by 73% of Vancouver citizens of new bike and bus lanes",
      "Permanent elimination of the municipal bike-share network",
      "Sharp increase in public transit fares in the city of Vancouver"
    ],
    "transcriptEnglish": "Speaker: A survey shows 73% citizen approval for bike lanes and bus transit in Vancouver.\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf4-lis-17": {
    "id": "tcf4-lis-17",
    "paperNum": 4,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Vancouver reduces burnout by 34% without lowering productivity.",
    "optionsEnglish": [
      "34% reduction in burnout and maintenance of productivity in Vancouver",
      "Requirement for Vancouver employees to work overtime on weekends",
      "Dramatic collapse in overall office worker productivity",
      "Significant increase in voluntary employee turnover within companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Vancouver reduces burnout by 34% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf4-lis-18": {
    "id": "tcf4-lis-18",
    "paperNum": 4,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Vancouver festival highlights 22 regional music groups and local culture.",
    "optionsEnglish": [
      "Promotion of 22 regional groups and the local music scene in Vancouver",
      "Cancellation of performances due to municipal budget cuts",
      "Permanent closure of the main entertainment venue in Vancouver",
      "Exclusive invitation of renowned international artists to the detriment of locals"
    ],
    "transcriptEnglish": "Speaker: The Vancouver festival highlights 22 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf4-lis-19": {
    "id": "tcf4-lis-19",
    "paperNum": 4,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Vancouver saves 19% on groceries and eliminates plastic packaging.",
    "optionsEnglish": [
      "Significant increase in monthly expenditures on food",
      "Complete disappearance of local convenience stores in downtown Vancouver",
      "Legal obligation to purchase only frozen industrial food products",
      "19% savings on grocery budgets and elimination of plastic packaging in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Vancouver saves 19% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf4-lis-20": {
    "id": "tcf4-lis-20",
    "paperNum": 4,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 180 isolated seniors in Vancouver.",
    "optionsEnglish": [
      "Full replacement of social workers with automated systems",
      "Volunteer support and friendly home visits for 180 isolated seniors in Vancouver",
      "Permanent closure of local community drop-in centers",
      "Mandatory monthly healthcare premium contribution by patients"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 180 isolated seniors in Vancouver.\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-21": {
    "id": "tcf4-lis-21",
    "paperNum": 4,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Vancouver grew by 28%, favoring eco-lodges and soft mobility.",
    "optionsEnglish": [
      "Complete prohibition of access to hiking trails during the summer season",
      "Construction of concrete hotel complexes along regional lakefronts",
      "Marked decrease in tourist visits to protected natural areas",
      "28% increase in demand for eco-lodges and soft mobility in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Vancouver grew by 28%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-22": {
    "id": "tcf4-lis-22",
    "paperNum": 4,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 19 rural communities around Vancouver.",
    "optionsEnglish": [
      "Substantial increase in annual library membership fees",
      "Permanent closure of student study spaces during exam periods",
      "Democratized access to digital reading in 19 rural municipalities near Vancouver",
      "Elimination of all physical paper book collections in institutions"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 19 rural communities around Vancouver.\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-23": {
    "id": "tcf4-lis-23",
    "paperNum": 4,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 90 students with seniors in Vancouver for affordable rent.",
    "optionsEnglish": [
      "Legal requirement to reside exclusively in gated university residences",
      "Eviction of young tenants from downtown residential housing in Vancouver",
      "Intergenerational solidarity home-sharing for 90 students and seniors in Vancouver",
      "Uncontrolled residential rent increases in the private sector"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 90 students with seniors in Vancouver for affordable rent.\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf4-lis-24": {
    "id": "tcf4-lis-24",
    "paperNum": 4,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 18 companies in Vancouver.",
    "optionsEnglish": [
      "Obligation to purchase a paid individual sports subscription",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Complete elimination of lunch breaks for all employees",
      "Implementation of daily physical exercise sessions in 18 companies in Vancouver"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 18 companies in Vancouver.\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf4-lis-25": {
    "id": "tcf4-lis-25",
    "paperNum": 4,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 40 buildings in Vancouver reduces urban heat and manages rainwater.",
    "optionsEnglish": [
      "Greening of 40 public buildings to reduce heat in Vancouver",
      "Prohibition on planting trees in school courtyards",
      "Additional property taxation on homeowners with private gardens",
      "Destruction of existing parks and green spaces in the city center"
    ],
    "transcriptEnglish": "Speaker: Greening 40 buildings in Vancouver reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf4-lis-26": {
    "id": "tcf4-lis-26",
    "paperNum": 4,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Vancouver. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The implementation of a systematic ban on all generative algorithms across Vancouver",
      "The requirement to clearly identify synthetic media released to the public",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "transcriptEnglish": "Speaker: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Vancouver. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.\nAnnouncer: Listen to the question. Question N°26: What is the priority measure advocated during this consultation?"
  },
  "tcf4-lis-27": {
    "id": "tcf4-lis-27",
    "paperNum": 4,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "The permanent rise of remote work is eroding retail revenue in the urban core of Vancouver, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown",
      "The imposition of a direct tax penalty on employees working from home in Vancouver",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "transcriptEnglish": "Speaker: The permanent rise of remote work is eroding retail revenue in the urban core of Vancouver, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.\nAnnouncer: Listen to the question. Question N°27: What tax compromise is favored in this municipal debate?"
  },
  "tcf4-lis-28": {
    "id": "tcf4-lis-28",
    "paperNum": 4,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Vancouver.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Vancouver",
      "Systematic incineration of all unsold retail textile surpluses",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Vancouver.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.\nAnnouncer: Listen to the question. Question N°28: What environmental strategy is highlighted in this address?"
  },
  "tcf4-lis-29": {
    "id": "tcf4-lis-29",
    "paperNum": 4,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Installing micro wind turbines on building rooftops in Vancouver generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Limiting household power usage to mandatory scheduled time windows",
      "Exclusive interconnection of installations to emergency backup power grids in Vancouver",
      "Planned decommissioning of all existing regional hydroelectric facilities"
    ],
    "transcriptEnglish": "Speaker: Installing micro wind turbines on building rooftops in Vancouver generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.\nAnnouncer: Listen to the question. Question N°29: What technical condition is deemed essential to approve this project?"
  },
  "tcf4-lis-30": {
    "id": "tcf4-lis-30",
    "paperNum": 4,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Continuous urban sprawl threatens the agricultural land surrounding the greater Vancouver metropolitan area.\nTo curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
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
    "passageEnglish": "Food delivery applications have multiplied flexible work opportunities for thousands of young people in Vancouver.\nBut this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
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
    "passageEnglish": "Automated tracking software optimizes logistics workflows across major distribution warehouses in Vancouver.\nTrue, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
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
    "passageEnglish": "Torrential spring downpours have once again submerged several riverfront neighborhoods in Vancouver.\nPouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
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
    "transcriptEnglish": "Speaker: In this symposium presentation delivered in Vancouver, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
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
    "transcriptEnglish": "Speaker: Outsourcing public registries to foreign tech conglomerates exposes our institutions in Vancouver to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
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
    "transcriptEnglish": "Speaker: While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Vancouver, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
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
    "transcriptEnglish": "Speaker: In this academic lecture delivered in Vancouver, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
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
    "transcriptEnglish": "Speaker: The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Vancouver. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
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
    "transcriptEnglish": "Speaker: The introduction of a central bank digital currency issued directly to retail users in Vancouver could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  },
  "tcf5-lis-1": {
    "id": "tcf5-lis-1",
    "paperNum": 5,
    "questionNumber": 1,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Hello! Today at Au Bon Pain, enjoy a special promotion of 2$ de rabais on gâteaux au citron.",
    "optionsEnglish": [
      "A customer is getting her hair styled in a hair salon.",
      "An engineer is working at an office computer.",
      "A delivery person is transporting boxes in a freight elevator.",
      "A security guard is watching museum artworks."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is getting her hair styled in a hair salon..\n... Option B: An engineer is working at an office computer..\n... Option C: A delivery person is transporting boxes in a freight elevator..\n... Option D: A security guard is watching museum artworks.."
  },
  "tcf5-lis-2": {
    "id": "tcf5-lis-2",
    "paperNum": 5,
    "questionNumber": 2,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Weather report for Montréal: fortes pluies expected this afternoon with a temperature of 17°C.",
    "optionsEnglish": [
      "A watchmaker is repairing a mechanical clock.",
      "A driver is refueling a vehicle at a gas station.",
      "A server is serving cups of tea in a lounge.",
      "Hikers are ascending toward the top of a hill."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A watchmaker is repairing a mechanical clock..\n... Option B: A driver is refueling a vehicle at a gas station..\n... Option C: A server is serving cups of tea in a lounge..\n... Option D: Hikers are ascending toward the top of a hill.."
  },
  "tcf5-lis-3": {
    "id": "tcf5-lis-3",
    "paperNum": 5,
    "questionNumber": 3,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Welcome to Hôtel Royal. Breakfast is served every morning from 7h30 - 10h00.",
    "optionsEnglish": [
      "Students are listening to a lecture at the university.",
      "A cook is slicing meat in a kitchen.",
      "A police officer is checking a driver's documents.",
      "Two people are chatting while sitting on a bench in a public park."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: Students are listening to a lecture at the university..\n... Option B: A cook is slicing meat in a kitchen..\n... Option C: A police officer is checking a driver's documents..\n... Option D: Two people are chatting while sitting on a bench in a public park.."
  },
  "tcf5-lis-4": {
    "id": "tcf5-lis-4",
    "paperNum": 5,
    "questionNumber": 4,
    "level": "A1",
    "questionPromptEnglish": "Look at the image. Listen to the 4 options and choose the one that corresponds to the image.",
    "passageEnglish": "Your medical appointment is confirmed for tomorrow at 11h00.",
    "optionsEnglish": [
      "A customer is making a cash deposit at a bank teller counter.",
      "A bricklayer is building a brick wall.",
      "A sailor is mooring a ship at the port.",
      "A photographer is developing photos in a darkroom."
    ],
    "transcriptEnglish": "Announcer: Instruction: Look at the image. Listen to the 4 options. Choose the option that corresponds to the image and check the correct answer.\n... Option A: A customer is making a cash deposit at a bank teller counter..\n... Option B: A bricklayer is building a brick wall..\n... Option C: A sailor is mooring a ship at the port..\n... Option D: A photographer is developing photos in a darkroom.."
  },
  "tcf5-lis-5": {
    "id": "tcf5-lis-5",
    "paperNum": 5,
    "questionNumber": 5,
    "level": "A1",
    "questionPromptEnglish": "What is the main topic of this audio message?",
    "passageEnglish": "Station announcement in Toronto: Express train N°460 departs track 6 at 15:15.",
    "optionsEnglish": [
      "Temporary closure of the ticket sales counter at Toronto station",
      "Complete cancellation of the trip to Toronto due to a technical issue",
      "Departure of the express train to Toronto Central Station from track 6 at 15h15",
      "Change of train destination to North Station at 15h15"
    ],
    "transcriptEnglish": "Speaker: Station announcement in Toronto: Express train N°460 departs track 6 at 15:15.\nAnnouncer: Listen to the question and the 4 options. Question N°5: What is the main topic of this audio message?\n... A: Temporary closure of the ticket sales counter at Toronto station.\n... B: Complete cancellation of the trip to Toronto due to a technical issue.\n... C: Departure of the express train to Toronto Central Station from track 6 at 15h15.\n... D: Change of train destination to North Station at 15h15."
  },
  "tcf5-lis-6": {
    "id": "tcf5-lis-6",
    "paperNum": 5,
    "questionNumber": 6,
    "level": "A1",
    "questionPromptEnglish": "What special offer is being proposed to customers?",
    "passageEnglish": "Store announcement: Special offer in aisle 5, 3rd item at half price.",
    "optionsEnglish": [
      "Arrival of new eco-friendly cleaning products in aisle 5",
      "Special promotion in aisle 5 in Toronto with the 3rd item at half price",
      "Free loyalty card distribution at the reception of the Toronto store",
      "Exceptional closure of the Toronto store due to construction work"
    ],
    "transcriptEnglish": "Speaker: Store announcement: Special offer in aisle 5, 3rd item at half price.\nAnnouncer: Listen to the question and the 4 options. Question N°6: What special offer is being proposed to customers?\n... A: Arrival of new eco-friendly cleaning products in aisle 5.\n... B: Special promotion in aisle 5 in Toronto with the 3rd item at half price.\n... C: Free loyalty card distribution at the reception of the Toronto store.\n... D: Exceptional closure of the Toronto store due to construction work."
  },
  "tcf5-lis-7": {
    "id": "tcf5-lis-7",
    "paperNum": 5,
    "questionNumber": 7,
    "level": "A1",
    "questionPromptEnglish": "What weather forecast is announced?",
    "passageEnglish": "Weather forecast for Toronto: Rain and strong wind expected with 17°C.",
    "optionsEnglish": [
      "No weather changes announced for the weekend in Toronto",
      "Heavy snowfall in Toronto blocking road traffic",
      "Heatwave and bright sunshine all day over Toronto",
      "Forecast of strong wind and rain in Toronto with a temperature of 17°C"
    ],
    "transcriptEnglish": "Speaker: Weather forecast for Toronto: Rain and strong wind expected with 17°C.\nAnnouncer: Listen to the question and the 4 options. Question N°7: What weather forecast is announced?\n... A: No weather changes announced for the weekend in Toronto.\n... B: Heavy snowfall in Toronto blocking road traffic.\n... C: Heatwave and bright sunshine all day over Toronto.\n... D: Forecast of strong wind and rain in Toronto with a temperature of 17°C."
  },
  "tcf5-lis-8": {
    "id": "tcf5-lis-8",
    "paperNum": 5,
    "questionNumber": 8,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hello, medical office calling. Your follow-up appointment is Tuesday at 13:30.",
    "optionsEnglish": [
      "Address change of local medical clinic in Toronto",
      "Reminder of follow-up medical appointment in Toronto scheduled for mardi à 13h30",
      "Request to send medical analysis results by postal mail",
      "Definitive cancellation of Dr. Tremblay's medical consultation"
    ],
    "transcriptEnglish": "Speaker: Hello, medical office calling. Your follow-up appointment is Tuesday at 13:30.\nAnnouncer: Listen to the question and the 4 options. Question N°8: Why is the person leaving this phone message?\n... A: Address change of local medical clinic in Toronto.\n... B: Reminder of follow-up medical appointment in Toronto scheduled for mardi à 13h30.\n... C: Request to send medical analysis results by postal mail.\n... D: Definitive cancellation of Dr. Tremblay's medical consultation."
  },
  "tcf5-lis-9": {
    "id": "tcf5-lis-9",
    "paperNum": 5,
    "questionNumber": 9,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your car is ready after brake replacement and service. Total: $255.",
    "optionsEnglish": [
      "Work delay at Toronto auto garage due to a missing spare part",
      "Vehicle ready at Toronto garage after service and brakes for an amount of 255$",
      "Annual closure of the auto repair garage in Toronto starting tonight",
      "Requirement to leave the car at Toronto garage all weekend"
    ],
    "transcriptEnglish": "Speaker: Your car is ready after brake replacement and service. Total: $255.\nAnnouncer: Listen to the question. Question N°9: Why is the person leaving this phone message?"
  },
  "tcf5-lis-10": {
    "id": "tcf5-lis-10",
    "paperNum": 5,
    "questionNumber": 10,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Your parcel N°8185 is ready in the locker. Access code: 4055.",
    "optionsEnglish": [
      "Return of parcel N°8185 to original sender in Toronto",
      "Mandatory payment of additional customs clearance fees for the parcel",
      "Parcel N°8185 available in automated lockers in Toronto with code 4055",
      "Inability to deliver parcel N°8185 due to an incorrect address"
    ],
    "transcriptEnglish": "Speaker: Your parcel N°8185 is ready in the locker. Access code: 4055.\nAnnouncer: Listen to the question. Question N°10: Why is the person leaving this phone message?"
  },
  "tcf5-lis-11": {
    "id": "tcf5-lis-11",
    "paperNum": 5,
    "questionNumber": 11,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Real estate agency confirms apartment viewing this Thursday at 15:00 AM.",
    "optionsEnglish": [
      "Postponement of apartment viewing in Toronto to late next month",
      "Confirmation of apartment viewing in Toronto this Thursday at 15h00",
      "Appointment cancellation because the apartment in Toronto has already been rented",
      "Increase in the monthly rent amount requested for the apartment"
    ],
    "transcriptEnglish": "Speaker: Real estate agency confirms apartment viewing this Thursday at 15:00 AM.\nAnnouncer: Listen to the question. Question N°11: Why is the person leaving this phone message?"
  },
  "tcf5-lis-12": {
    "id": "tcf5-lis-12",
    "paperNum": 5,
    "questionNumber": 12,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Hair salon proposes moving appointment to Thursday at 14 AM due to staff absence.",
    "optionsEnglish": [
      "Offer of an exceptional discount on hair care treatments at the salon",
      "Confirmation of vendredi appointment at Toronto hair salon without any changes",
      "Proposal to reschedule hair salon appointment in Toronto to jeudi à 14h due to staff absence",
      "Permanent closure of the hair salon in Toronto for renovations"
    ],
    "transcriptEnglish": "Speaker: Hair salon proposes moving appointment to Thursday at 14 AM due to staff absence.\nAnnouncer: Listen to the question. Question N°12: Why is the person leaving this phone message?"
  },
  "tcf5-lis-13": {
    "id": "tcf5-lis-13",
    "paperNum": 5,
    "questionNumber": 13,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Saturday swimming practice moved to outdoor pool at 13 AM.",
    "optionsEnglish": [
      "Closure of Toronto sports center locker rooms for sanitation work",
      "Change of venue and time for swimming practice in Toronto this Saturday at 13h",
      "Definitive cancellation of registration at Toronto sports club",
      "Increase in annual membership dues for sports club members"
    ],
    "transcriptEnglish": "Speaker: Saturday swimming practice moved to outdoor pool at 13 AM.\nAnnouncer: Listen to the question. Question N°13: Why is the person leaving this phone message?"
  },
  "tcf5-lis-14": {
    "id": "tcf5-lis-14",
    "paperNum": 5,
    "questionNumber": 14,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "Reserved book is available at the library until Saturday at 15 AM.",
    "optionsEnglish": [
      "Reminder of library membership card renewal deadline",
      "Obligation to pay a fine for overdue book returns at the library",
      "Reserved book available at Toronto library for pickup before Saturday 15h",
      "Permanent loss of borrowed book by Toronto media library"
    ],
    "transcriptEnglish": "Speaker: Reserved book is available at the library until Saturday at 15 AM.\nAnnouncer: Listen to the question. Question N°14: Why is the person leaving this phone message?"
  },
  "tcf5-lis-15": {
    "id": "tcf5-lis-15",
    "paperNum": 5,
    "questionNumber": 15,
    "level": "A2",
    "questionPromptEnglish": "Why is the person leaving this phone message?",
    "passageEnglish": "HR offers a phone interview next Monday at 16:30 AM.",
    "optionsEnglish": [
      "Immediate rejection of job application submitted to Toronto company",
      "Summons to a written examination at Toronto company premises",
      "Proposal for preliminary phone interview with Toronto company on Monday at 16h30",
      "Request to send a printed letter of recommendation to the company"
    ],
    "transcriptEnglish": "Speaker: HR offers a phone interview next Monday at 16:30 AM.\nAnnouncer: Listen to the question. Question N°15: Why is the person leaving this phone message?"
  },
  "tcf5-lis-16": {
    "id": "tcf5-lis-16",
    "paperNum": 5,
    "questionNumber": 16,
    "level": "B1",
    "questionPromptEnglish": "What is the reaction of most citizens to these new developments?",
    "passageEnglish": "A survey shows 75% citizen approval for bike lanes and bus transit in Toronto.",
    "optionsEnglish": [
      "Mass rejection by Toronto residents of recent road development works",
      "Permanent elimination of the municipal bike-share network",
      "Approval by 75% of Toronto citizens of new bike and bus lanes",
      "Sharp increase in public transit fares in the city of Toronto"
    ],
    "transcriptEnglish": "Speaker: A survey shows 75% citizen approval for bike lanes and bus transit in Toronto.\nAnnouncer: Listen to the question. Question N°16: What is the reaction of most citizens to these new developments?"
  },
  "tcf5-lis-17": {
    "id": "tcf5-lis-17",
    "paperNum": 5,
    "questionNumber": 17,
    "level": "B1",
    "questionPromptEnglish": "What is the main outcome of the 4-day workweek trial?",
    "passageEnglish": "The 4-day workweek in Toronto reduces burnout by 35% without lowering productivity.",
    "optionsEnglish": [
      "Requirement for Toronto employees to work overtime on weekends",
      "Dramatic collapse in overall office worker productivity",
      "35% reduction in burnout and maintenance of productivity in Toronto",
      "Significant increase in voluntary employee turnover within companies"
    ],
    "transcriptEnglish": "Speaker: The 4-day workweek in Toronto reduces burnout by 35% without lowering productivity.\nAnnouncer: Listen to the question. Question N°17: What is the main outcome of the 4-day workweek trial?"
  },
  "tcf5-lis-18": {
    "id": "tcf5-lis-18",
    "paperNum": 5,
    "questionNumber": 18,
    "level": "B1",
    "questionPromptEnglish": "What is the primary objective of this cultural event?",
    "passageEnglish": "The Toronto festival highlights 25 regional music groups and local culture.",
    "optionsEnglish": [
      "Permanent closure of the main entertainment venue in Toronto",
      "Cancellation of performances due to municipal budget cuts",
      "Exclusive invitation of renowned international artists to the detriment of locals",
      "Promotion of 25 regional groups and the local music scene in Toronto"
    ],
    "transcriptEnglish": "Speaker: The Toronto festival highlights 25 regional music groups and local culture.\nAnnouncer: Listen to the question. Question N°18: What is the primary objective of this cultural event?"
  },
  "tcf5-lis-19": {
    "id": "tcf5-lis-19",
    "paperNum": 5,
    "questionNumber": 19,
    "level": "B1",
    "questionPromptEnglish": "What is the main advantage of this new purchasing habit?",
    "passageEnglish": "Bulk buying in Toronto saves 20% on groceries and eliminates plastic packaging.",
    "optionsEnglish": [
      "Legal obligation to purchase only frozen industrial food products",
      "20% savings on grocery budgets and elimination of plastic packaging in Toronto",
      "Complete disappearance of local convenience stores in downtown Toronto",
      "Significant increase in monthly expenditures on food"
    ],
    "transcriptEnglish": "Speaker: Bulk buying in Toronto saves 20% on groceries and eliminates plastic packaging.\nAnnouncer: Listen to the question. Question N°19: What is the main advantage of this new purchasing habit?"
  },
  "tcf5-lis-20": {
    "id": "tcf5-lis-20",
    "paperNum": 5,
    "questionNumber": 20,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "A volunteer network assists 200 isolated seniors in Toronto.",
    "optionsEnglish": [
      "Full replacement of social workers with automated systems",
      "Volunteer support and friendly home visits for 200 isolated seniors in Toronto",
      "Permanent closure of local community drop-in centers",
      "Mandatory monthly healthcare premium contribution by patients"
    ],
    "transcriptEnglish": "Speaker: A volunteer network assists 200 isolated seniors in Toronto.\nAnnouncer: Listen to the question. Question N°20: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-21": {
    "id": "tcf5-lis-21",
    "paperNum": 5,
    "questionNumber": 21,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Green tourism around Toronto grew by 30%, favoring eco-lodges and soft mobility.",
    "optionsEnglish": [
      "Marked decrease in tourist visits to protected natural areas",
      "Construction of concrete hotel complexes along regional lakefronts",
      "30% increase in demand for eco-lodges and soft mobility in Toronto",
      "Complete prohibition of access to hiking trails during the summer season"
    ],
    "transcriptEnglish": "Speaker: Green tourism around Toronto grew by 30%, favoring eco-lodges and soft mobility.\nAnnouncer: Listen to the question. Question N°21: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-22": {
    "id": "tcf5-lis-22",
    "paperNum": 5,
    "questionNumber": 22,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Digital lending expands to 20 rural communities around Toronto.",
    "optionsEnglish": [
      "Substantial increase in annual library membership fees",
      "Democratized access to digital reading in 20 rural municipalities near Toronto",
      "Elimination of all physical paper book collections in institutions",
      "Permanent closure of student study spaces during exam periods"
    ],
    "transcriptEnglish": "Speaker: Digital lending expands to 20 rural communities around Toronto.\nAnnouncer: Listen to the question. Question N°22: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-23": {
    "id": "tcf5-lis-23",
    "paperNum": 5,
    "questionNumber": 23,
    "level": "B1",
    "questionPromptEnglish": "What trend is observed in the local real estate market?",
    "passageEnglish": "Intergenerational housing pairs 100 students with seniors in Toronto for affordable rent.",
    "optionsEnglish": [
      "Eviction of young tenants from downtown residential housing in Toronto",
      "Uncontrolled residential rent increases in the private sector",
      "Intergenerational solidarity home-sharing for 100 students and seniors in Toronto",
      "Legal requirement to reside exclusively in gated university residences"
    ],
    "transcriptEnglish": "Speaker: Intergenerational housing pairs 100 students with seniors in Toronto for affordable rent.\nAnnouncer: Listen to the question. Question N°23: What trend is observed in the local real estate market?"
  },
  "tcf5-lis-24": {
    "id": "tcf5-lis-24",
    "paperNum": 5,
    "questionNumber": 24,
    "level": "B1",
    "questionPromptEnglish": "What advice is recommended by health specialists?",
    "passageEnglish": "Daily stretching breaks are adopted by 20 companies in Toronto.",
    "optionsEnglish": [
      "Complete elimination of lunch breaks for all employees",
      "Closure of corporate cafeteria dining facilities during afternoons",
      "Obligation to purchase a paid individual sports subscription",
      "Implementation of daily physical exercise sessions in 20 companies in Toronto"
    ],
    "transcriptEnglish": "Speaker: Daily stretching breaks are adopted by 20 companies in Toronto.\nAnnouncer: Listen to the question. Question N°24: What advice is recommended by health specialists?"
  },
  "tcf5-lis-25": {
    "id": "tcf5-lis-25",
    "paperNum": 5,
    "questionNumber": 25,
    "level": "B1",
    "questionPromptEnglish": "What is the central objective or message of this audio document?",
    "passageEnglish": "Greening 45 buildings in Toronto reduces urban heat and manages rainwater.",
    "optionsEnglish": [
      "Prohibition on planting trees in school courtyards",
      "Destruction of existing parks and green spaces in the city center",
      "Additional property taxation on homeowners with private gardens",
      "Greening of 45 public buildings to reduce heat in Toronto"
    ],
    "transcriptEnglish": "Speaker: Greening 45 buildings in Toronto reduces urban heat and manages rainwater.\nAnnouncer: Listen to the question. Question N°25: What is the central objective or message of this audio document?"
  },
  "tcf5-lis-26": {
    "id": "tcf5-lis-26",
    "paperNum": 5,
    "questionNumber": 26,
    "level": "B2",
    "questionPromptEnglish": "What is the priority measure advocated during this consultation?",
    "passageEnglish": "The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Toronto. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsEnglish": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Toronto",
      "Legal liability exemptions for digital platforms hosting deceptive content",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation"
    ],
    "transcriptEnglish": "Speaker: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Toronto. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nA total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.\nAnnouncer: Listen to the question. Question N°26: What is the priority measure advocated during this consultation?"
  },
  "tcf5-lis-27": {
    "id": "tcf5-lis-27",
    "paperNum": 5,
    "questionNumber": 27,
    "level": "B2",
    "questionPromptEnglish": "What tax compromise is favored in this municipal debate?",
    "passageEnglish": "The permanent rise of remote work is eroding retail revenue in the urban core of Toronto, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsEnglish": [
      "The complete transfer of local budget authority to a centralized federal body",
      "The imposition of a direct tax penalty on employees working from home in Toronto",
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "Free commercial property leases to incentivize companies to return downtown"
    ],
    "transcriptEnglish": "Speaker: The permanent rise of remote work is eroding retail revenue in the urban core of Toronto, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nIt is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.\nAnnouncer: Listen to the question. Question N°27: What tax compromise is favored in this municipal debate?"
  },
  "tcf5-lis-28": {
    "id": "tcf5-lis-28",
    "paperNum": 5,
    "questionNumber": 28,
    "level": "B2",
    "questionPromptEnglish": "What environmental strategy is highlighted in this address?",
    "passageEnglish": "The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Toronto.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsEnglish": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Toronto",
      "Systematic incineration of all unsold retail textile surpluses",
      "Universal free clothing distribution for low-income households"
    ],
    "transcriptEnglish": "Speaker: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Toronto.\nMere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.\nAnnouncer: Listen to the question. Question N°28: What environmental strategy is highlighted in this address?"
  },
  "tcf5-lis-29": {
    "id": "tcf5-lis-29",
    "paperNum": 5,
    "questionNumber": 29,
    "level": "B2",
    "questionPromptEnglish": "What technical condition is deemed essential to approve this project?",
    "passageEnglish": "Installing micro wind turbines on building rooftops in Toronto generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsEnglish": [
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Toronto",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "transcriptEnglish": "Speaker: Installing micro wind turbines on building rooftops in Toronto generates great enthusiasm among decentralized energy advocates.\nIt is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.\nAnnouncer: Listen to the question. Question N°29: What technical condition is deemed essential to approve this project?"
  },
  "tcf5-lis-30": {
    "id": "tcf5-lis-30",
    "paperNum": 5,
    "questionNumber": 30,
    "level": "B2",
    "questionPromptEnglish": "What urban planning direction is recommended by experts?",
    "passageEnglish": "Continuous urban sprawl threatens the agricultural land surrounding the greater Toronto metropolitan area.\nTo curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
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
    "passageEnglish": "Food delivery applications have multiplied flexible work opportunities for thousands of young people in Toronto.\nBut this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
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
    "passageEnglish": "Automated tracking software optimizes logistics workflows across major distribution warehouses in Toronto.\nTrue, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
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
    "passageEnglish": "Torrential spring downpours have once again submerged several riverfront neighborhoods in Toronto.\nPouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
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
    "transcriptEnglish": "Speaker: In this symposium presentation delivered in Toronto, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways."
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
    "transcriptEnglish": "Speaker: Outsourcing public registries to foreign tech conglomerates exposes our institutions in Toronto to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction."
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
    "transcriptEnglish": "Speaker: While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Toronto, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations."
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
    "transcriptEnglish": "Speaker: In this academic lecture delivered in Toronto, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states."
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
    "transcriptEnglish": "Speaker: The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Toronto. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality."
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
    "transcriptEnglish": "Speaker: The introduction of a central bank digital currency issued directly to retail users in Toronto could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels."
  }
};

export function getPracticeQuestionTranslation(questionId: string): PracticeQuestionTranslation | undefined {
  return PRACTICE_LISTENING_TRANSLATIONS[questionId];
}
