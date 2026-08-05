export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "PRACTICE" | "EXAM";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  transcript?: string;
  transcriptEnglish?: string;
  passage?: string;
  passageEnglish?: string;
  questionInAudio?: boolean;
  perQuestionTimerSeconds?: number;
}

export interface WritingTask {
  id: string;
  taskNumber: number;
  title: string;
  prompt: string;
  wordCountMin: number;
  wordCountMax: number;
  timeLimitMins: number;
  guidedTips?: string[];
  sampleResponse?: string;
}

export interface SpeakingTask {
  id: string;
  taskNumber: number;
  title: string;
  scenario: string;
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases?: string[];
}

export interface ExamSection {
  type: SectionType;
  title: string;
  description: string;
  durationMins: number;
  totalQuestions: number;
  questions?: ExamQuestion[];
  writingTasks?: WritingTask[];
  speakingTasks?: SpeakingTask[];
}

export interface ExamPaper {
  id: string;
  title: string;
  type: ExamType;
  code: string; // e.g. "TCF-PRAC-01" or "TCF-EXAM-01"
  description: string;
  totalDurationMins: number;
  isSamplePaper: boolean;
  published: boolean;
  recommendedMode?: ExamMode;
  sections: ExamSection[];
}

// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
const LISTENING_TOPICS = [
  {
    level: "A1",
    title: "Annonce de gare SNCF / Via Rail",
    text: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    opt: ["Au quai / voie 4", "À la gare du Nord", "En retard de 45 minutes", "Annulé sans correspondance"],
    ans: 0,
    tr: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    en: "Dear passengers, attention please. TGV train 7842 to Paris-Gare de Lyon, originally scheduled for 2:15pm, will exceptionally depart from platform 4. Please proceed to immediate boarding.",
    hint: "⚠️ Trap Alert: Notice how the speaker mentions initial departure time (14h15) first, but pay attention to the shift marker 'exceptionnellement'.\n🔄 Paraphrase Key: The phrase 'partira de la voie 4' defines the exact platform location.\n🎧 Acoustic Cues: Listen for 'voie' or 'quai' to catch platform departure announcements."
  },
  {
    level: "A1",
    title: "Message vocal d'un ami",
    text: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    opt: ["Au supermarché", "À la boulangerie du quartier", "À la maison", "Au cinéma municipal"],
    ans: 0,
    tr: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    en: "Hi Thomas! It's Marc. I'm currently at the downtown supermarket doing weekly grocery shopping. Tell me, do you need me to pick up fresh bread or cheese for dinner tonight?",
    hint: "⚠️ Trap Alert: Do not confuse items the speaker offers to buy (bread/cheese) with where the speaker currently is.\n🔄 Paraphrase Key: The phrase 'je suis actuellement au...' establishes the speaker's real-time physical location.\n🎧 Acoustic Cues: Listen for location prepositions like 'au', 'à la', or 'dans'."
  },
  {
    level: "A2",
    title: "Bulletin météo radio",
    text: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues sur l'ensemble de la région au cours de l'après-midi.",
    opt: ["Prendre un parapluie pour les averses", "Mettre des lunettes de soleil", "Rester à la maison toute la journée", "Prendre la voiture pour éviter la neige"],
    ans: 0,
    tr: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues sur l'ensemble de la région au cours de l'après-midi.",
    en: "Hello everyone, here is your weather forecast for Tuesday. Be sure to bring a sturdy umbrella this morning, as heavy thunderstorm showers are expected across the region in the afternoon.",
    hint: "⚠️ Trap Alert: Distinguish morning weather conditions from afternoon weather changes.\n🔄 Paraphrase Key: The term 'parapluie' (umbrella) directly relates to 'averses' (rain showers).\n🎧 Acoustic Cues: Listen for weather gear recommendations given after 'pensez à vous équiper de...'."
  },
  {
    level: "A2",
    title: "Rappel de rendez-vous médical",
    text: "Bonjour, vous êtes bien sur le répondeur du cabinet dentaire. Nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    opt: ["Mardi à 10h00", "Mercredi à 14h00", "Lundi matin à 9h00", "Jeudi en fin d'après-midi"],
    ans: 0,
    tr: "Bonjour, nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    en: "Hello, we are reminding you that your annual dental check-up with Dr. Mercier is confirmed for this Tuesday at exactly 10:00am.",
    hint: "⚠️ Trap Alert: Distinguish between the dentist office name and the confirmed appointment day/time.\n🔄 Paraphrase Key: 'confirmé pour ce mardi à 10h00' confirms the official schedule.\n🎧 Acoustic Cues: Pay close attention to numbers and days of the week stated after 'rendez-vous'."
  },
  {
    level: "B1",
    title: "Annonce d'organisation d'entreprise",
    text: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique initialement programmée ce jeudi matin est reportée à vendredi 15h00 dans la grande salle de conférence B au deuxième étage.",
    opt: ["Vendredi à 15h00 en salle B", "Jeudi matin en salle A", "Lundi matin au rez-de-chaussée", "Annulée définitivement"],
    ans: 0,
    tr: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique est reportée à vendredi 15h00 dans la grande salle de conférence B au deuxième étage.",
    en: "Hello project team. Please note that the strategic meeting is postponed to Friday at 3:00pm in large conference room B on the second floor.",
    hint: "⚠️ Trap Alert: The initial schedule (Thursday morning) is overridden by the shift marker 'reportée à'.\n🔄 Paraphrase Key: 'reportée à vendredi 15h00' establishes the actual rescheduled meeting.\n🎧 Acoustic Cues: Watch for workplace change verbs like 'reporté', 'déplacé', or 'annulé'."
  },
  {
    level: "B1",
    title: "Consigne de sécurité incendie",
    text: "Attention, exercice de sécurité incendie dans le bâtiment. En cas d'alarme sonore, veuillez évacuer calmement les locaux en empruntant exclusivement les escaliers de secours et ne pas utiliser les ascenseurs.",
    opt: ["Utiliser les escaliers de secours", "Prendre les ascenseurs principaux", "Rester enfermé dans son bureau", "Ouvrir toutes les fenêtres"],
    ans: 0,
    tr: "Attention, exercice de sécurité incendie. En cas d'alarme, veuillez évacuer calmement en empruntant exclusivement les escaliers de secours et ne pas utiliser les ascenseurs.",
    en: "Attention, fire safety drill. In case of alarm, please evacuate calmly using exclusively the emergency stairs and do not use elevators.",
    hint: "⚠️ Trap Alert: Listen for mandatory safety actions vs explicitly forbidden actions (like elevators).\n🔄 Paraphrase Key: 'empruntant exclusivement' means using only the specified exit path.\n🎧 Acoustic Cues: Focus on imperative safety commands following 'en cas d'alarme'."
  },
  {
    level: "B2",
    title: "Chronique environnementale radio",
    text: "Selon la nouvelle réglementation municipale entrée en vigueur ce mois-ci, la collecte sélective et le compostage obligatoire des déchets organiques permettent d'abaisser le volume global des ordures ménagères de 30 % dans les arrondissements pilotes.",
    opt: ["Réduire le volume des poubelles de 30%", "Augmenter la taxe d'enlèvement d'ordures", "Interdire la vente d'emballages en plastique", "Construire de nouvelles usines d'incinération"],
    ans: 0,
    tr: "La collecte sélective et le compostage obligatoire permettent d'abaisser le volume global des ordures ménagères de 30 % dans les arrondissements pilotes.",
    en: "Selective collection and mandatory composting reduce household waste volume by 30% in pilot boroughs.",
    hint: "⚠️ Trap Alert: Watch for percentage figures (30%) associated with waste reduction vs fee increases.\n🔄 Paraphrase Key: The verb 'abaisser le volume' in the speech is synonymous with 'réduire le volume'.\n🎧 Acoustic Cues: Listen for environmental statistics and municipal policy terms."
  },
  {
    level: "B2",
    title: "Reportage économique et marché du travail",
    text: "L'accélération du travail hybride au Québec a stimulé les ventes d'équipements informatiques et d'ergonomie de bureau, enregistrant une hausse nette de 25 % du chiffre d'affaires du secteur au cours du dernier trimestre.",
    opt: ["Une hausse de 25% des ventes d'équipements", "Une baisse drastique des salaires", "La fermeture massive des commerces physiques", "La fin du matériel informatique de bureau"],
    ans: 0,
    tr: "L'accélération du travail hybride a stimulé les ventes d'équipements, enregistrant une hausse nette de 25 % du chiffre d'affaires.",
    en: "The acceleration of hybrid work boosted equipment sales, recording a net 25% increase in revenue.",
    hint: "⚠️ Trap Alert: Connect financial trends ('hausse' vs 'baisse') with the correct percentage (25%).\n🔄 Paraphrase Key: 'stimulé les ventes... hausse nette' translates to an increase in equipment sales.\n🎧 Acoustic Cues: Focus on economic trajectory words following 'chiffre d'affaires'."
  },
  {
    level: "C1",
    title: "Interview radio d'urbanisme métropolitain",
    text: "Dans cette perspective d'adaptation climatique, l'aménagement de micro-forêts urbaines et la végétalisation systématique des toitures contribuent de manière décisive à l'atténuation des îlots de chaleur au cœur des grandes métropoles.",
    opt: ["Combattre les îlots de chaleur urbains", "Accélérer la bétonisation des voies publiques", "Augmenter la vitesse de circulation automobile", "Remplacer les espaces vert par des parkings"],
    ans: 0,
    tr: "La végétalisation systématique des toitures contribue de manière décisive à l'atténuation des îlots de chaleur au cœur des grandes métropoles.",
    en: "Systematic rooftop greening contributes decisively to mitigating urban heat islands in major metropolitan centers.",
    hint: "⚠️ Trap Alert: Distinguish climate adaptation goals from negative urban development distractor options.\n🔄 Paraphrase Key: 'atténuation des îlots de chaleur' matches the concept of fighting urban heat islands.\n🎧 Acoustic Cues: Listen for ecological urban planning terms like 'végétalisation' and 'micro-forêts'."
  },
  {
    level: "C2",
    title: "Conférence de recherche scientifique",
    text: "L'avènement de la cryptographie quantique intégrée aux protocoles de communication de nouvelle génération permet d'envisager une étanchéité théoriquement absolue des flux de données face aux risques de cyber-intrusion.",
    opt: ["Garantir une étanchéité théoriquement absolue des données", "Accélérer les composants électroniques mobiles", "Diminuer les investissements dans la recherche", "Remplacer les serveurs informatiques distants"],
    ans: 0,
    tr: "L'avènement de la cryptographie quantique permet d'envisager une étanchéité théoriquement absolue des flux de données.",
    en: "The advent of quantum cryptography allows for theoretically absolute data flow security against cyber intrusions.",
    hint: "⚠️ Trap Alert: Avoid mistaking technical cryptography hardware for server or investment options.\n🔄 Paraphrase Key: 'étanchéité théoriquement absolue' paraphrases total data security guarantees.\n🎧 Acoustic Cues: Focus on academic scientific definitions in high-level lecture discourse."
  }
];

const READING_TOPICS = [
  // A1 DISCOVERY (1-10)
  { level: "A1", text: "Horaires de la boulangerie 'La Parisis' : Ouvert du mardi au dimanche de 7h00 à 19h00 sans interruption. Fermeture hebdomadaire le lundi.", q: "Quand la boulangerie est-elle fermée ?", opt: ["Le lundi", "Le dimanche", "Le mardi", "Tous les après-midis"], ans: 0, passEn: "Bakery hours 'La Parisis': Open Tuesday to Sunday from 7:00am to 7:00pm non-stop. Closed weekly on Monday.", hint: "⚠️ Trap Alert: Do not confuse daily operating hours with the weekly closure day.\n🔄 Paraphrase Key: 'Fermeture hebdomadaire le lundi' directly specifies the closed day.\n📖 Structural Cue: Look for exact day names following 'Fermeture'." },
  { level: "A1", text: "Avis de passage de la Poste canadienne : Votre colis recommandé est disponible au bureau central à partir de demain 14h. Veuillez vous munir d'une pièce d'identité.", q: "Où et quand récupérer votre colis ?", opt: ["Au bureau central dès demain 14h", "À la maison aujourd'hui", "À la mairie la semaine prochaine", "Chez le voisin ce soir"], ans: 0, passEn: "Canada Post delivery notice: Your registered package is available at the central branch starting tomorrow at 2pm. Bring ID.", hint: "⚠️ Trap Alert: Distinguish the pick-up location (bureau central) from home delivery.\n🔄 Paraphrase Key: 'disponible à partir de demain 14h' defines the precise availability time.\n📖 Structural Cue: Focus on location prepositions after 'au'." },
  { level: "A1", text: "Annonce de la bibliothèque municipale : Les ateliers de lecture pour enfants ont lieu chaque samedi matin de 10h00 à 11h30. Entrée libre et gratuite.", q: "À quel moment ont lieu les ateliers de lecture ?", opt: ["Le samedi matin de 10h00 à 11h30", "Le vendredi soir", "Le dimanche après-midi", "Tous les jours à midi"], ans: 0, passEn: "Library notice: Children's reading workshops every Saturday from 10:00 to 11:30am. Free admission.", hint: "⚠️ Trap Alert: Watch for specific day/time combinations.\n🔄 Paraphrase Key: 'chaque samedi matin de 10h00 à 11h30' answers the workshop time.\n📖 Structural Cue: Identify day markers after 'ont lieu'." },
  { level: "A1", text: "Message de la clinique médicale : Le cabinet du docteur Roy sera exceptionnellement fermé du 15 au 20 août pour congés annuels.", q: "Pourquoi le cabinet médical est-il fermé ?", opt: ["Pour congés annuels du docteur", "Pour rénovation complète", "En raison d'un problème technique", "Pour déménagement"], ans: 0, passEn: "Medical clinic notice: Dr. Roy's office will be closed August 15-20 for annual leave.", hint: "⚠️ Trap Alert: Pay attention to the reason given after 'pour'.\n🔄 Paraphrase Key: 'congés annuels' means annual vacation leave.\n📖 Structural Cue: Look for cause prepositions like 'pour'." },
  { level: "A1", text: "Pharmacie du Centre — Service de garde : En dehors des heures d'ouverture normales, adressez-vous à la pharmacie Saint-Jean située au 12 rue de la Paix.", q: "Où se rendre en dehors des heures d'ouverture ?", opt: ["À la pharmacie Saint-Jean rue de la Paix", "À l'hôpital général de nuit", "Chez le médecin de famille", "À la mairie du quartier"], ans: 0, passEn: "Center Pharmacy after-hours: Outside normal hours, go to Saint-Jean Pharmacy at 12 rue de la Paix.", hint: "⚠️ Trap Alert: Distinguish the primary pharmacy from the after-hours referral pharmacy.\n🔄 Paraphrase Key: 'adressez-vous à...' points to the emergency destination.\n📖 Structural Cue: Note address details following location directives." },
  { level: "A1", text: "Musée des Beaux-Arts de Montréal : Tarif réduit pour tous les étudiants et les jeunes de moins de 25 ans sur présentation de leur carte.", q: "Qui peut obtenir un tarif réduit au musée ?", opt: ["Les étudiants et jeunes de moins de 25 ans", "Seulement les enfants de moins de 5 ans", "Uniquement les professeurs d'université", "Tous les groupes de touristes"], ans: 0, passEn: "Montreal Museum of Fine Arts: Discounted rate for students and youth under 25 with student ID.", hint: "⚠️ Trap Alert: Identify the eligible age/status criteria mentioned in the notice.\n🔄 Paraphrase Key: 'étudiants et jeunes de moins de 25 ans' specifies the discount group.\n📖 Structural Cue: Look for qualification criteria after 'pour'." },

  // A2 BREAKTHROUGH (11-18)
  { level: "A2", text: "Règlement municipal de la piscine municipale : Les enfants âgés de moins de 12 ans doivent obligatoirement être accompagnés d'un adulte majeur dans l'enceinte des bassins.", q: "Quelle condition est exigée pour les enfants de moins de 12 ans ?", opt: ["Être accompagné par un adulte majeur", "Avoir un certificat médical", "Venir uniquement le matin", "Payer un tarif spécial"], ans: 0, passEn: "Municipal pool rule: Children under 12 must be accompanied by an adult inside the pool area.", hint: "⚠️ Trap Alert: Listen for mandatory requirements ('doivent obligatoirement').\n🔄 Paraphrase Key: 'accompagnés d'un adulte majeur' matches the required condition.\n📖 Structural Cue: Focus on obligation modal verbs like 'doivent'." },
  { level: "A2", text: "Offre d'emploi spécialisée : Restaurant gastronomique du Vieux-Montréal recherche un serveur bilingue français-anglais avec 2 ans d'expérience au service en salle.", q: "Quel profil correspond exactement à cette offre ?", opt: ["Un serveur bilingue expérimenté", "Un cuisinier italien débutant", "Un comptable à mi-temps", "Un gérant de magasin"], ans: 0, passEn: "Job posting: Upscale restaurant in Old Montreal seeks bilingual French-English server with 2 years table service experience.", hint: "⚠️ Trap Alert: Match both language fluency (bilingue) and experience requirements.\n🔄 Paraphrase Key: '2 ans d'expérience' translates to an experienced server.\n📖 Structural Cue: Identify job title keywords preceding experience requirements." },
  { level: "A2", text: "Note d'information aux résidents : Des travaux de réfection de la chaussée auront lieu dans la rue Sherbrooke le mercredi 12 octobre. Le stationnement sera interdit de 7h à 18h.", q: "Quelle interdiction concerne les résidents le mercredi 12 octobre ?", opt: ["L'interdiction de stationner dans la rue de 7h à 18h", "L'interdiction de sortir de chez soi", "L'interdiction de prendre le bus", "L'interdiction d'utiliser l'eau courante"], ans: 0, passEn: "Notice to residents: Street resurfacing on Sherbrooke St on Wednesday Oct 12. Parking prohibited 7am-6pm.", hint: "⚠️ Trap Alert: Note the prohibited action ('stationnement interdit') vs general street access.\n🔄 Paraphrase Key: 'stationnement interdit' directly means parking prohibition.\n📖 Structural Cue: Pay attention to specific time restrictions given." },
  { level: "A2", text: "Annonce du centre communautaire : Inscriptions aux cours de langue italienne et espagnole ouvertes pour la session d'automne. Tarif réduit pour les étudiants et retraités.", q: "Qui peut bénéficier d'un tarif réduit ?", opt: ["Les étudiants et les retraités", "Seulement les enfants de moins de 5 ans", "Uniquement les professeurs", "Tous les touristes de passage"], ans: 0, passEn: "Community center notice: Italian and Spanish fall course enrollment open. Discounted rate for students and seniors.", hint: "⚠️ Trap Alert: Distinguish eligible discount groups from general public.\n🔄 Paraphrase Key: 'étudiants et retraités' defines the beneficiaries.\n📖 Structural Cue: Look for recipient nouns following 'pour'." },
  { level: "A2", text: "Avis de coupure d'eau potable : En raison de travaux de maintenance sur le réseau aqueduc, l'alimentation en eau sera interrompue ce jeudi de 22h00 à 05h00 du matin.", q: "À quel moment l'eau sera-t-elle coupée ?", opt: ["Ce jeudi durant la nuit de 22h à 05h", "Vendredi toute la journée", "Samedi après-midi", "Lundi matin à partir de 8h"], ans: 0, passEn: "Water supply interruption notice: Maintenance work will cause a water shut-off this Thursday from 10pm to 5am.", hint: "⚠️ Trap Alert: Notice the overnight time window (22h00 à 05h00).\n🔄 Paraphrase Key: 'interrompue ce jeudi de 22h00 à 05h00' defines the exact shut-off period.\n📖 Structural Cue: Track time range prepositions 'de... à'." },

  // B1 THRESHOLD (19-26)
  {
    level: "B1",
    text: `ÉCONOMIE ET NUTRITION — LE POUVOIR D'ACHAT ET LA SANTÉ AU QUÉBEC\n\nUn rapport récent de l'Institut National de Santé Publique du Québec souligne l'importance des choix alimentaires quotidiens sur la santé cardiaque. Selon les chercheurs, réduire sa consommation de sel de seulement 3 grammes par jour diminuerait de 15 % les risques d'hypertension artérielle à l'échelle nationale.\n\nCette recommandation s'inscrit dans une campagne globale d'éducation à la nutrition. Les professionnels du secteur médical encouragent les consommateurs à privilégier les aliments frais préparés à la maison plutôt que les plats industriels transformés, souvent riches en sodium et en conservateurs artificiels.\n\nEn outre, les autorités canadiennes envisagent d'imposer un étiquetage nutritionnel plus clair sur la face avant des emballages afin d'aider les familles à identifier rapidement les produits à forte teneur en sel et en sucres ajoutés.`,
    q: "Selon l'étude, quel est l'impact direct d'une diminution quotidienne de 3 grammes de sel ?",
    opt: ["Une baisse de 15% des risques d'hypertension artérielle", "Une hausse de 20% du pouvoir d'achat des ménages", "La fermeture immédiate des usines agroalimentaires", "Une réduction automatique de la consommation de sucre"],
    ans: 0,
    passEn: "HEALTH AND NUTRITION — PURCHASING POWER AND HEALTH IN QUEBEC\n\nA recent report highlights that reducing daily salt intake by 3g cuts hypertension risk by 15% nationwide.",
    hint: "⚠️ Trap Alert: Link the 3g salt reduction directly to hypertension risk statistics, not sugar or purchasing power.\n🔄 Paraphrase Key: 'diminuerait de 15% les risques' matches 'Une baisse de 15% des risques'.\n📖 Structural Cue: Locate the causal percentage figure in paragraph 1."
  },
  {
    level: "B1",
    text: `TRANSPORT URBAIN ET MOBILITÉ DURABLE — ROULEZ VERT À MONTRÉAL\n\nLa Société de Transport de Montréal (STM) a annoncé une restructuration majeure de son réseau routier nocturne. Afin de poursuivre les travaux d'électrification des infrastructures, les lignes de tramway et de métro léger seront remplacées par des bus électriques articulés dès 22h00 les soirs de semaine.\n\nCette transition permettra non seulement d'accélérer la rénovation des voies ferroviaires, mais garantira également un niveau de bruit réduit pour les résidents des quartiers centraux. Les usagers sont invités à consulter la nouvelle application mobile pour suivre la position des bus en temps réel.\n\nMalgré quelques réticences initiales liées aux légers retards de correspondance, la majorité des voyageurs salue cette initiative moderne qui s'inscrit pleinement dans le plan climat de la métropole.`,
    q: "Quelle mesure la Société de Transport prend-elle les soirs de semaine dès 22h00 ?",
    opt: ["Le remplacement des lignes ferroviaires par des bus électriques", "La gratuité totale de l'ensemble du réseau de métro", "L'arrêt complet de tous les transports collectifs", "L'interdiction de circuler pour les piétons"],
    ans: 0,
    passEn: "URBAN TRANSIT & SUSTAINABLE MOBILITY\n\nTram lines will be replaced by electric buses starting at 10:00pm on weeknights for infrastructure upgrades.",
    hint: "⚠️ Trap Alert: Note the shift to electric buses at 22h00, not a total shutdown or free fares.\n🔄 Paraphrase Key: 'remplacées par des bus électriques' matches the correct replacement action.\n📖 Structural Cue: Focus on action verbs following 'dès 22h00'."
  },
  {
    level: "B1",
    text: `ÉDUCATION ET TECHNOLOGIE — LES MANUELS NUMÉRIQUES DANS LES ÉCOLES\n\nL'introduction généralisée des tablettes numériques dans les établissements secondaires du Nouveau-Brunswick suscite des débats passionnés parmi les enseignants et les parents d'élèves. Selon une enquête menée auprès de 500 éducateurs, 68 % constatent une augmentation significative de l'engagement des étudiants lors des activités de recherche documentaire.\n\nCependant, plusieurs spécialistes en pédiatrie mettent en garde contre l'augmentation du temps d'écran quotidien et soulignent l'importance de maintenir un équilibre avec l'apprentissage sur support papier traditionnel. Les écoles mettent donc en place des chartes d'utilisation responsable pour encadrer cet usage en classe.`,
    q: "Que constate la majorité des enseignants enquêtés concernant les tablettes ?",
    opt: ["Une hausse de l'engagement des élèves dans la recherche documentaire", "Une baisse drastique des résultats scolaires généraux", "L'abandon complet de tous les cours de lecture", "Le refus des parents d'acheter des fournitures"],
    ans: 0,
    passEn: "EDUCATION & TECH — DIGITAL TEXTBOOKS IN SCHOOLS\n\n68% of surveyed educators note increased student engagement in documentary research using digital tablets.",
    hint: "⚠️ Trap Alert: Focus on the positive survey statistic (68%) before the pediatrician warning contrast ('Cependant').\n🔄 Paraphrase Key: 'augmentation significative de l'engagement' equates to 'hausse de l'engagement'.\n📖 Structural Cue: Locate the statistic '68%' in paragraph 1."
  },
  {
    level: "B1",
    text: `ENVIRONNEMENT ET GESTION DES DÉCHETS — LE COMPOSTAGE OBLIGATOIRE\n\nDans le cadre de son plan de réduction de l'empreinte carbone, la Ville de Québec a rendu obligatoire le bac brun pour la collecte des résidus alimentaires ménagers. Cette mesure vise à détourner 40 000 tonnes de matière organique des sites d'enfouissement chaque année.\n\nLe compost produit sera redistribué gratuitement aux agriculteurs régionaux et aux jardins communautaires urbains. Cette démarche écologique contribue à enrichir les sols sans recourir aux engrais chimiques industriels.`,
    q: "Quel est l'objectif principal de la collecte obligatoire du bac brun ?",
    opt: ["Détourner la matière organique des sites d'enfouissement", "Vendre le compost aux entreprises étrangères", "Interdire les jardins communautaires urbains", "Augmenter la taxe de collecte des ordures"],
    ans: 0,
    passEn: "ENVIRONMENT & WASTE MANAGEMENT — MANDATORY COMPOSTING\n\nQuebec City makes brown bins mandatory to divert 40,000 tons of organic waste from landfills.",
    hint: "⚠️ Trap Alert: Identify the environmental goal (diverting organic waste) vs tax or commercial options.\n🔄 Paraphrase Key: 'détourner 40 000 tonnes de matière organique' answers the primary objective.\n📖 Structural Cue: Look for purpose expressions following 'vise à'."
  },

  // B2 VANTAGE TARGET (27-34) — 8 UNIQUE B2 TEXTS FOR NCLC 7 TARGET
  {
    level: "B2",
    text: `URBANISME ÉCOLOGIQUE ET ÎLOTS DE CHALEUR MÉTROPOLITAINS\n\nDans la plupart des grandes agglomérations nord-américaines, la multiplication des îlots de chaleur constitue désormais un enjeu sanitaire et environnemental préoccupant. L'accumulation d'asphalte et de béton accentue l'absorption thermique, entraînant des températures estivales étouffantes au cœur des cités.\n\nPour contrer ce phénomène, les urbanistes préconisent la mise en place de péages urbains incitatifs couplée à un vaste programme de végétalisation des toitures d'immeubles. Les premiers résultats observés dans les quartiers pilotes démontrent une réduction de 20 % de la circulation automobile, corrélée à une baisse mesurable de la pollution atmosphérique.\n\nCependant, les commerçants du centre-ville expriment des inquiétudes quant à la baisse potentielle du chalandage. Les municipalités s'engagent donc à compenser ces effets en renforçant la fréquence des transports en commun.`,
    q: "Selon l'article, quel est l'effet combiné de la végétalisation et des péages incitatifs ?",
    opt: ["Une baisse de 20% du trafic automobile et une réduction de la pollution", "La disparition complète des commerces de proximité", "Une hausse de la température estivale au centre-ville", "L'obligation d'utiliser uniquement des véhicules électriques"],
    ans: 0,
    passEn: "ECOLOGICAL URBANISM & METROPOLITAN HEAT ISLANDS\n\nPilot programs combining green rooftops and incentive urban tolls reduced car traffic by 20% and lowered air pollution.",
    hint: "⚠️ Trap Alert: Watch for the 20% reduction figure linked to car traffic, not business closures.\n🔄 Paraphrase Key: 'réduction de 20% de la circulation' equates to 'baisse de 20% du trafic'.\n📖 Structural Cue: Locate the pilot result data in paragraph 2."
  },
  {
    level: "B2",
    text: `INTELLIGENCE ARTIFICIELLE ET DIAGNOSTIC MÉDICAL AU CANADA\n\nL'intégration d'algorithmes d'apprentissage profond dans le réseau hospitalier canadien révolutionne le dépistage précoce des pathologies radiologiques. En analysant des milliers d'imageries médicales en quelques secondes, ces outils d'intelligence artificielle assistent efficacement les médecins dans la détection d'anomalies microscopiques.\n\nNéanmoins, les comités de bioéthique rappellent que la décision thérapeutique finale doit impérativement demeurer sous la responsabilité exclusive du praticien humain. La technologie est conçue comme un puissant levier d'aide à la décision et non comme un substitut à l'expertise clinique.\n\nDe plus, la protection de la confidentialité des données médicales des patients exige le déploiement de protocoles de cryptage de haute sécurité avant tout partage interhospitalier.`,
    q: "Quelle est la recommandation majeure des comités de bioéthique concernant l'IA médicale ?",
    opt: ["La décision thérapeutique finale doit rester sous responsabilité humaine", "L'IA doit remplacer définitivement les radiologues", "Les données des patients peuvent être publiées librement", "Les examens d'imagerie doivent être supprimés"],
    ans: 0,
    passEn: "AI AND MEDICAL DIAGNOSTICS IN CANADA\n\nBioethics committees emphasize that final treatment decisions must remain under human medical responsibility.",
    hint: "⚠️ Trap Alert: Note the bioethics contrast marker 'Néanmoins' preserving human clinical authority.\n🔄 Paraphrase Key: 'demeurer sous la responsabilité exclusive du praticien humain' defines human control.\n📖 Structural Cue: Pay close attention to paragraph 2 bioethical guidelines."
  },
  {
    level: "B2",
    text: `ÉCONOMIE CIRCULAIRE ET RECYCLAGE DES ÉQUIPEMENTS ÉLECTRONIQUES\n\nLa gestion des déchets électroniques représente un défi environnemental majeur à l'ère du numérique. Chaque année, des millions de tonnes d'ordinateurs, téléphones et batteries usagées sont jetées sans subir de traitement approprié, provoquant le gaspillage de métaux précieux comme le cobalt, le lithium et l'or.\n\nFace à ce constat, plusieurs provinces canadiennes adoptent une législation sur la Responsabilité Élargie des Producteurs (REP). Cette réglementation oblige désormais les fabricants de matériel informatique à financer et organiser la collecte ainsi que le recyclage sécurisé de leurs produits en fin de vie.\n\nCette démarche favorise l'émergence d'une véritable économie circulaire, créatrice d'emplois locaux spécialisés dans la décontamination et le réemploi des composants électroniques.`,
    q: "Que stipule la réglementation sur la Responsabilité Élargie des Producteurs (REP) ?",
    opt: ["Les fabricants doivent financer la collecte et le recyclage de leurs produits", "Les consommateurs doivent payer une amende pour chaque téléphone jeté", "L'importation de matériel électronique est désormais interdite", "Toutes les batteries usagées doivent être incinérées sans tri"],
    ans: 0,
    passEn: "CIRCULAR ECONOMY & ELECTRONIC WASTE RECYCLING\n\nEPR legislation requires electronics manufacturers to fund and organize end-of-life recycling for their devices.",
    hint: "⚠️ Trap Alert: Note that EPR obligates manufacturers to fund recycling, not individual consumer fines.\n🔄 Paraphrase Key: 'oblige les fabricants... à financer la collecte' answers the REP requirement.\n📖 Structural Cue: Read the legislative mandate in paragraph 2."
  },
  {
    level: "B2",
    text: `IMMIGRATION FRANCOPHONE HORS QUÉBEC ET DYNAMISME COMMUNAUTAIRE\n\nLe gouvernement fédéral canadien intensifie ses efforts pour atteindre les objectifs de recrutement d'immigrants francophones s'établissant dans les communautés en minorité linguistique hors du Québec, notamment en Ontario, au Nouveau-Brunswick et au Manitoba.\n\nL'installation de nouveaux arrivants d'expression française contribue au dynamisme économique régional, à la pérennité des écoles de langue française et à l'enrichissement culturel des collectivités locales. Des services d'accueil personnalisés facilitent leur intégration professionnelle dès leur arrivée.\n\nDes programmes de parrainage communautaire permettent également aux familles immigrantes de tisser rapidement des liens sociaux durables et de trouver un logement adapté.`,
    q: "Quel est l'impact recherché de l'immigration francophone hors Québec ?",
    opt: ["Renforcer le dynamisme économique et la vitalité culturelle des collectivités", "Obliger toutes les provinces à devenir exclusivement unilingues françaises", "Fermer les centres d'accueil communautaires régionaux", "Limiter l'accès aux écoles publiques d'expression française"],
    ans: 0,
    passEn: "FRANCOPHONE IMMIGRATION OUTSIDE QUEBEC\n\nTargeted immigration enhances regional economic dynamism, school sustainability, and community vitality.",
    hint: "⚠️ Trap Alert: Focus on positive community vitality and school sustainability goals.\n🔄 Paraphrase Key: 'contribue au dynamisme économique... et à l'enrichissement culturel' answers the core goal.\n📖 Structural Cue: Identify positive impact nouns in paragraph 2."
  },
  {
    level: "B2",
    text: `TRANSITION ÉNERGÉTIQUE ET ARCHITECTURE BIOCLIMATIQUE\n\nLa construction de bâtiments à haute performance énergétique s'impose progressivement comme la norme architecturale dans les projets de rénovation urbaine. L'intégration de matériaux isolants biosourcés, comme la fibre de bois ou le chanvre, permet de réduire considérablement la consommation de chauffage en hiver.\n\nDe plus, la conception bioclimatique exploite l'orientation naturelle du soleil pour optimiser la luminosité et la chaleur passive. Des systèmes de ventilation à double flux avec récupération d'énergie assurent un renouvellement continu de l'air intérieur sans déperdition thermique.\n\nLes propriétaires bénéficient d'aides financières gouvernementales incitatives pour compenser le surcoût initial des travaux de rénovation verte.`,
    q: "Quel principe fondamental caractérise la conception bioclimatique ?",
    opt: ["Exploiter l'orientation du soleil pour optimiser la chaleur passive", "Utiliser exclusivement de la climatisation électrique en continu", "Supprimer toutes les fenêtres des façades exposées au nord", "Consommer plus de mazout durant les périodes de grand froid"],
    ans: 0,
    passEn: "ENERGY TRANSITION & BIOCLIMATIC ARCHITECTURE\n\nBioclimatic design optimizes building orientation to capture passive solar heat and reduce energy consumption.",
    hint: "⚠️ Trap Alert: Identify natural passive solar design vs heavy electric HVAC usage.\n🔄 Paraphrase Key: 'exploite l'orientation naturelle du soleil' matches solar heat optimization.\n📖 Structural Cue: Focus on technical definitions in paragraph 2."
  },

  // C1 AUTONOMOUS (35-37)
  {
    level: "C1",
    text: `SOCIOLOGIE DU TRAVAIL — LA MUTATION DES MODÈLES ORGANISATIONNELS\n\nL'expérimentation à grande échelle de la semaine de travail de quatre jours dans le secteur tertiaire suscite un intérêt croissant auprès des chercheurs en gestion et des décideurs économiques. Loin de nuire au rendement des entreprises, ce modèle fondé sur la réduction du temps de travail sans baisse de salaire démontre une préservation, voire une amélioration de la productivité globale.\n\nSur le plan de la santé mentale des salariés, les données recueillies indiquent une diminution remarquable de 35 % des épisodes de surmenage professionnel et de syndrome d'épuisement (burnout). Les employés bénéficiant d'un équilibre renforcé entre vie privée et engagement professionnel affichent une fidélité accrue envers leur organisation.\n\nNéanmoins, la transposabilité de cette organisation aux secteurs industriels à feu continu ou aux services d'urgence médicale soulève des défis logistiques majeurs.`,
    q: "Quel résultat marquant ressort de l'analyse sociologique de la semaine de 4 jours ?",
    opt: ["Une diminution de 35% du surmenage professionnel chez les salariés", "Une baisse inévitable de la productivité globale de l'entreprise", "Une augmentation généralisée du taux d'absentéisme", "L'obligation de baisser les salaires des employés"],
    ans: 0,
    passEn: "WORKPLACE SOCIOLOGY — ORGANIZATIONAL MODEL MUTATION\n\n4-day workweek trials show sustained productivity alongside a 35% reduction in professional burnout.",
    hint: "⚠️ Trap Alert: Note the 35% burnout reduction figure, contrasting with false productivity loss claims.\n🔄 Paraphrase Key: 'diminution remarquable de 35% des épisodes de surmenage' matches 'diminution de 35% du surmenage'.\n📖 Structural Cue: Locate mental health survey results in paragraph 2."
  },
  {
    level: "C1",
    text: `AMÉNAGEMENT DU TERRITOIRE ET GESTION DES RESSOURCES EN EAU\n\nLa gestion concertée des bassins versants face aux aléas pluviométriques extrêmes exige le dépassement des découpages administratifs traditionnels au profit de gouvernances environnementales intégrées. L'accentuation des épisodes de sécheresse estivale couplée aux risques de ruissellement torrentiel impose une réévaluation fondamentale des schémas d'aménagement urbain et agricole.\n\nLes spécialistes de l'hydrologie préconisent la restauration prioritaire des zones humides naturelles qui jouent le rôle d'éponges écologiques régulatrices. Ces écosystèmes absorbent les surplus d'eau lors des crue printanières et restituent progressivement l'humidité durant les périodes d'étiage.\n\nCette approche fondée sur la nature s'avère économiquement plus pérenne que le dimensionnement perpétuel d'ouvrages de génie civil lourds.`,
    q: "Quel rôle écologique majeur remplissent les zones humides naturelles ?",
    opt: ["Réguler le cycle de l'eau en absorbant les crues et restituant l'humidité", "Accélérer l'assèchement définitif des terres agricoles", "Favoriser le ruissellement torrentiel vers les zones urbaines", "Remplacer l'eau douce par des réservoirs d'eau de mer"],
    ans: 0,
    passEn: "TERRITORIAL PLANNING & WATER MANAGEMENT\n\nRestoring natural wetlands acts as ecological sponges, absorbing floodwaters and releasing moisture during droughts.",
    hint: "⚠️ Trap Alert: Pay attention to the natural sponge concept (absorbing floods, releasing moisture).\n🔄 Paraphrase Key: 'éponges écologiques régulatrices... absorbent les surplus... restituent l'humidité' defines water regulation.\n📖 Structural Cue: Focus on hydrological function definitions in paragraph 2."
  },

  // C2 MASTERY (38-39)
  {
    level: "C2",
    text: `ÉPISTÉMOLOGIE ET NARRATIFS DE LA TRANSITION ÉCOLOGIQUE\n\nLa déconstruction des paradigmes extractivistes contemporains requiert un réexamen épistémologique profond de notre rapport à la matérialité du monde et aux communs terrestres. L'obsolescence théorique des modèles de croissance linéaire illimitée impose l'élaboration de nouvelles métriques de prospérité intégrant les limites planétaires infranchissables.\n\nDans cette perspective, la pensée complexe rejette les solutions technocratiques réductrices qui prétendent résoudre la crise systémique par un simple ajustement marginal des mécanismes de marché. Il s'agit d'opérer une mutation culturelle refondant les représentations collectives de l'abondance et du progrès.\n\nCette réorientation philosophique implique une redéfinition globale des responsabilités éthiques envers les générations futures et le vivant non humain.`,
    q: "Que préconise l'analyse épistémologique face à la crise systémique ?",
    opt: ["Une mutation culturelle refondant les représentations collectives du progrès", "La poursuite indéfinie des modèles de croissance linéaire illimitée", "L'abandon de toute réflexion éthique envers les générations futures", "Le recours exclusif à des ajustements marchands marginaux"],
    ans: 0,
    passEn: "EPISTEMOLOGY & ECOLOGICAL TRANSITION NARRATIVES\n\nSystemic ecological crises demand a deep cultural shift reframing collective concepts of progress and planetary limits.",
    hint: "⚠️ Trap Alert: Reject technocratic market-only fixes in favor of deep epistemological cultural shift.\n🔄 Paraphrase Key: 'opérer une mutation culturelle refondant les représentations' answers the core recommendation.\n📖 Structural Cue: Analyze complex philosophical stance in paragraph 2."
  }
];

function getTargetLevel(questionNum: number): string {
  if (questionNum <= 10) return "A1";
  if (questionNum <= 18) return "A2";
  if (questionNum <= 26) return "B1";
  if (questionNum <= 34) return "B2";
  if (questionNum <= 37) return "C1";
  return "C2";
}

function shuffleOptions(rawOpt: string[], origCorrectIdx: number) {
  const correctText = rawOpt[origCorrectIdx];
  const indexed = rawOpt.map((optText, i) => ({ optText, isCorrect: i === origCorrectIdx }));

  // Deterministic shuffle using option text lengths to vary option order
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = (indexed[i].optText.length + i) % (i + 1);
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  const options = indexed.map((item) => item.optText);
  const correctIndex = indexed.findIndex((item) => item.isCorrect);
  return { options, correctIndex, correctText };
}

function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingTopics = LISTENING_TOPICS.filter(t => t.level === targetLevel || (targetLevel === "C2" && t.level === "C1"));
    const pool = matchingTopics.length > 0 ? matchingTopics : LISTENING_TOPICS;
    const t = pool[(i - 1 + seedOffset) % pool.length];

    const isQuestionInAudio = i <= 29;
    const { options, correctIndex, correctText } = shuffleOptions(t.opt, t.ans);

    const specificHint = (t as any).hint || `Level ${t.level} Listening Guidance: Focus on the speaker's main intent and tone. Pay attention to key transition words (e.g. "cependant", "en revanche") to identify the correct message without guessing.`;

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      text: isQuestionInAudio
        ? `Écoutez le document sonore et la question audio N°${i} [Niveau ${t.level}]. Choisissez la bonne option.`
        : `[Question ${i} - Niveau ${t.level}] ${t.text} Quel est l'élément principal à retenir ?`,
      options,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The spoken document confirms "${correctText}".`,
      hint: specificHint,
      transcript: t.tr,
      transcriptEnglish: t.en,
      questionInAudio: isQuestionInAudio,
      perQuestionTimerSeconds: 15
    });
  }
  return qList;
}

function generateReadingQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingTopics = READING_TOPICS.filter(t => t.level === targetLevel || (targetLevel === "C2" && t.level === "C1"));
    const pool = matchingTopics.length > 0 ? matchingTopics : READING_TOPICS;
    const t = pool[(i - 1 + seedOffset) % pool.length];

    const { options, correctIndex, correctText } = shuffleOptions(t.opt, t.ans);

    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options,
      correctIndex,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The text states "${correctText}".`,
      hint: `Level ${t.level} Reading Guidance: Scan paragraph 1 and 2 for synonyms and key thematic terms. Eliminate distractor options containing extreme words like "toujours" or "jamais" unless explicitly in the passage.`
    });
  }
  return qList;
}

// ─── 1. OFFICIAL TCF CANADA PAPER 1 (TCF-CAN-01) ───
export const SAMPLE_TCF_PAPER_1: ExamPaper = {
  id: "tcf-canada-sample-1",
  title: "TCF Canada Official Practice Paper 1",
  code: "TCF-CAN-01",
  type: "TCF_CANADA",
  description: "Full-length official FEI standard simulator for TCF Canada Express Entry PR Points (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf1-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez obtenir des informations concernant la location d'un appartement au Québec. Rédigez un courriel au propriétaire (60 à 120 mots) pour demander les détails sur le loyer, les charges et la date de disponibilité.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation formelle (Monsieur/Madame)", "Formuler 3 questions précises sur le logement", "Formule de politesse formelle de fin"],
          sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'appartement de trois pièces actuellement proposé à la location. Intéressé par votre annonce, je souhaiterais obtenir des précisions avant d'envisager une visite.\n\nPourriez-vous m'indiquer le montant exact du loyer mensuel ainsi que la nature des charges incluses (chauffage, électricité, eau) ? De plus, j'aimerais connaître la date exacte à partir de laquelle le logement sera disponible.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf1-w2",
          taskNumber: 2,
          title: "Tâche 2 : Compte-rendu d'expérience (Travel Experience Report)",
          prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Utiliser le passé composé et l'imparfait", "Décrire le paysage et l'ambiance", "Exprimer vos sentiments (joie, surprise)"],
          sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une expérience inoubliable en assistant au Carnaval d'hiver de Québec. Dès mon arrivée, la ville historique était magnifiquement recouverte d'un manteau de neige et illuminée de mille feux.\n\nJ'ai eu la chance d'admirer d'impressionnantes sculptures sur glace et d'assister à la traditionnelle course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était à la fois féerique et très chaleureuse, malgré des températures extrêmement froides.\n\nCette immersion culturelle exceptionnelle m'a permis d'enrichir mon vocabulaire français et d'échanger avec des habitants chaleureux. Je garde un souvenir impérissable de cette aventure nordique et je recommande vivement cette destination !"
        },
        {
          id: "tcf1-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Introduction présentant le débat", "Argument 1 avec exemple précis", "Argument 2 (coût financier)", "Conclusion claire affirmant votre prise de position"],
          sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un vif débat au sein des municipalités modernes.\n\nD'un côté, les partisans de cette mesure soutiennent qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour la collectivité. Sans recettes de billetterie, la rénovation et la modernisation des infrastructures risqueraient d'être compromises.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité du réseau."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf1-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
          scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2,
          keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est...", "Dans mon temps libre, j'aime..."]
        },
        {
          id: "tcf1-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice en interaction (Information Gathering)",
          scenario: "Vous voulez vous inscrire à un cours de sport. Posez au moins 5 questions à l'examinateur sur les horaires, les tarifs et l'équipement requis.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5,
          keyPhrases: ["Quels sont les jours de cours ?", "Combien coûte l'abonnement mensuel ?", "Est-il nécessaire d'apporter son propre matériel ?"]
        },
        {
          id: "tcf1-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Que pensez-vous du travail à distance généralisé ? Présentez les avantages et les inconvénients puis donnez votre avis personnel à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5,
          keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "En ce qui concerne les avantages...", "Pour conclure, je dirais que..."]
        }
      ]
    }
  ]
};

// ─── 2. OFFICIAL TCF CANADA PAPER 2 (TCF-CAN-02) ───
export const SAMPLE_TCF_PAPER_2: ExamPaper = {
  id: "tcf-canada-sample-2",
  title: "TCF Canada Official Practice Paper 2",
  code: "TCF-CAN-02",
  type: "TCF_CANADA",
  description: "Advanced TCF Canada examination paper for Express Entry NCLC 8 / B2 Vantage targets (84 Items / 119 Mins).",
  totalDurationMins: 119,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, interviews, and public service announcements (39 Questions / 35 Mins).",
      durationMins: 35,
      totalQuestions: 39,
      questions: generateListeningQuestions(39, "tcf2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles and environmental press reports (39 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 39,
      questions: generateReadingQuestions(39, "tcf2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Argumentative essay writing for Canadian Express Entry (3 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf2-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message de demande d'informations",
          prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation courtoise", "Formuler 3 questions claires", "Remercier à la fin"],
          sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
        },
        {
          id: "tcf2-w2",
          taskNumber: 2,
          title: "Tâche 2 : Article de témoignage",
          prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Décrire l'ambiance", "Utiliser le passé composé", "Expliquer pourquoi vous recommandez cet événement"],
          sampleResponse: "Lors de mon dernier séjour au Québec, j'ai eu l'immense privilège de participer au Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été émerveillé par l'atmosphère festive et l'énergie vibrante des spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux et la convivialité des Québécois ont rendu cette expérience inoubliable.\n\nJe recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une immersion festive sans égale que vous ne regretterez pas !"
        },
        {
          id: "tcf2-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Présenter la problématique", "Développer 2 arguments solides", "Conclure avec une synthèse claire"],
          sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite de vifs débats sociétaux.\n\nD'une part, les partisans soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des structures phonétiques. De surcroît, une maîtrise précoce constitue un atout indiscutable dans un monde professionnel globalisé.\n\nD'autre part, les détracteurs craignent qu'une surcharge cognitive n'entrave l'acquisition fondamentale de la langue maternelle et du calcul.\n\nEn somme, bien que ces réserves soient légitimes, je suis convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle indispensable, à condition d'adapter la pédagogie au rythme de chaque élève."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive debate with oral examiner (3 Tasks / 12 Mins).",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf2-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé",
          scenario: "Décrivez votre profession actuelle, vos compétences principales et pourquoi vous souhaitez poursuivre votre carrière au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2
        },
        {
          id: "tcf2-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice d'interaction (Recherche de logement)",
          scenario: "Vous cherchez un appartement à louer. Interrogez le propriétaire (l'examinateur) sur les charges, le quartier et la date de disponibilité.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5
        },
        {
          id: "tcf2-spk-3",
          taskNumber: 3,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Faut-il limiter l'utilisation des écrans chez les adolescents ? Présentez votre opinion à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5
        }
      ]
    }
  ]
};

// ─── 3. OFFICIAL TEF CANADA PAPER 1 (TEF-CAN-01) ───
export const SAMPLE_TEF_PAPER_1: ExamPaper = {
  id: "tef-canada-sample-1",
  title: "TEF Canada Official Practice Paper 1",
  code: "TEF-CAN-01",
  type: "TEF_CANADA",
  description: "Full-length simulator tailored for TEF Canada Paris Chamber of Commerce (CCI) standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef1")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef1")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef1-w1",
          taskNumber: 1,
          title: "Section A : Article de Fait Divers (Newspaper Article Continuation)",
          prompt: "Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          guidedTips: ["Employer le passé composé et l'imparfait", "Décrire l'intervention des pompiers", "Conclure par la réouverture de la circulation"],
          sampleResponse: "Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures. L'animal effrayé s'était réfugié au sommet d'une structure métallique, refusant de descendre malgré les appels des automobilistes immobilisés.\n\nAvertis rapidement, les pompiers de Montréal et la patrouille policière sont arrivés sur les lieux afin d'établir un périmètre de sécurité. Un secouriste expérimenté a dû escalader la structure équipé d'une nacelle spéciale pour récupérer le félin sain et sauf.\n\nAprès cette opération spectaculaire saluée par les applaudissements des riverains, la circulation a pu reprendre progressivement en fin d'après-midi."
        },
        {
          id: "tef1-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'opinion persuasive (Letter to Editor)",
          prompt: "La municipalité souhaite remplacer une place publique historique par un centre commercial. Écrivez une lettre au maire (200 mots minimum) pour défendre la préservation du patrimoine urbain.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation formelle (Monsieur le Maire)", "Exprimer l'inquiétude des habitants", "Présenter 2 arguments patrimoniaux et écologiques", "Formule de politesse formelle"],
          sampleResponse: "Monsieur le Maire,\n\nJe vous adresse cette lettre en tant que citoyen soucieux de l'avenir de notre ville afin de vous faire part de ma profonde inquiétude concernant le projet de démolition de la place Saint-Jean au profit d'un complexe commercial.\n\nD'une part, cette place constitue un fleuron incontestable de notre patrimoine architectural et historique. Elle représente un lieu de mémoire collective où les générations se croisent et tissent des liens sociaux essentiels à la vitalité de notre communauté.\n\nD'autre part, la destruction de cet espace vert au cœur du centre-ville accentuera les îlots de chaleur urbains et aggravera l'empreinte carbone municipale. À l'heure où la transition écologique exige la sauvegarde de la biodiversité urbaine, remplacer un havre de paix végétalisé par des structures bétonnées m'apparaît comme un choix à contre-courant des impératifs environnementaux actuels.\n\nEn somme, je vous prie de bien vouloir reconsidérer cette décision et d'envisager la réhabilitation de la place dans le respect de son identité d'origine.\n\nDans l'attente de votre prise en considération, je vous prie d'agréer, Monsieur le Maire, l'expression de ma haute considération."
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef1-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (10 Questions)",
          scenario: "Vous voyez une annonce pour une offre d'emploi à mi-temps dans un journal. Appelez le recruteur pour poser au moins 10 questions sur le poste.",
          prepTimeMins: 0,
          speakingTimeMins: 5,
          keyPhrases: ["Quelles sont les heures de travail ?", "Quel est le salaire proposé ?", "Quelles sont les qualifications requises ?"]
        },
        {
          id: "tef1-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Un ami hésite à partir faire du camping sauvage ce week-end. Convainquez-le d'accepter cette aventure avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Pense à la beauté des paysages !", "Je m'occupe de tout le matériel.", "C'est l'occasion idéale de se déconnecter."]
        }
      ]
    }
  ]
};

// ─── 4. OFFICIAL TEF CANADA PAPER 2 (TEF-CAN-02) ───
export const SAMPLE_TEF_PAPER_2: ExamPaper = {
  id: "tef-canada-sample-2",
  title: "TEF Canada Official Practice Paper 2",
  code: "TEF-CAN-02",
  type: "TEF_CANADA",
  description: "Advanced TEF Canada examination paper tailored for CCI Paris standards (84 Items / 135 Mins).",
  totalDurationMins: 135,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Radio interviews and complex dialogs (40 Questions / 40 Mins).",
      durationMins: 40,
      totalQuestions: 40,
      questions: generateListeningQuestions(40, "tef2")
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Editorial columns and economic synthesis (40 Questions / 60 Mins).",
      durationMins: 60,
      totalQuestions: 40,
      questions: generateReadingQuestions(40, "tef2")
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section B (Formal Persuasive Letter to an Editor) (2 Tasks / 60 Mins).",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef2-w1",
          taskNumber: 1,
          title: "Section A : Fait divers (Continuation)",
          prompt: "Rédigez la suite d'un fait divers à partir du début suivant (80 mots minimum) : 'Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          sampleResponse: "Ce matin, l'ouverture d'un nouveau parc d'attractions a provoqué un embouteillage monstre sur l'autoroute 15. Des milliers de familles impatientes ont afflué dès l'aube, saturant complètement les voies d'accès principales.\n\nFace à cette paralysie du réseau routier, la sûreté du Québec a dû déployer en urgence plusieurs unités de motards pour rediriger les usagers vers des itinéraires secondaires. Malgré la frustration initiale des conducteurs, aucun incident majeur n'a été déploré.\n\nLa direction du parc a rapidement présenté ses excuses et s'est engagée à renforcer l'organisation des parkings pour les jours à venir."
        },
        {
          id: "tef2-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'argumentation (Letter to a Friend / Newspaper)",
          prompt: "Un de vos amis refuse d'utiliser le recyclage et jette tout dans les poubelles ordinaires. Écrivez-lui une lettre persuasive (200 mots minimum) pour le convaincre d'adopter des habitudes écologiques.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation amicale", "Exprimer sa surprise tout en restant bienveillant", "Présenter 2 arguments environnementaux concrets", "Proposer des gestes simples pour commencer dès aujourd'hui"],
          sampleResponse: "Cher Alexandre,\n\nJe me permets de t'écrire après notre discussion de la semaine dernière, car ton scepticisme concernant le tri sélectif m'a beaucoup fait réfléchir.\n\nEn premier lieu, saches que le recyclage des déchets n'est pas une simple contrainte administrative, mais un acte citoyen essentiel pour limiter le gaspillage des ressources naturelles. Lorsque nous jetons du plastique ou du papier dans les ordures ménagères, ces matériaux finissent enfouis ou incinérés, générant des gaz à effet de serre néfastes pour notre atmosphère.\n\nEn second lieu, adopter le tri au quotidien est aujourd'hui d'une simplicité enfantine. Il suffit d'installer deux bacs distincts dans sa cuisine. Par ce geste minime qui ne prend que quelques secondes par jour, tu participes activement à la réutilisation des matières premières et à la protection des écosystèmes.\n\nJe sais que tu es une personne responsable et attentive à ton environnement. Pourquoi ne pas essayer ensemble dès ce week-end ? Je serais ravi de t'aider à mettre en place ce système chez toi.\n\nAmicalement,\nThomas"
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section B (Persuasive Oral Argumentation) (2 Tasks / 15 Mins).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef2-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (Logement de vacances)",
          scenario: "Vous lisez une annonce pour la location d'un chalet à la montagne. Posez 10 questions au propriétaire sur le prix, la capacité et les activités à proximité.",
          prepTimeMins: 0,
          speakingTimeMins: 5
        },
        {
          id: "tef2-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Votre ami hésite à participer à un programme de bénévolat communautaire le week-end. Convainquez-le de s'inscrire avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: ["Tu sais, c'est une opportunité unique pour...", "Je comprends ton hésitation, mais pense au fait que...", "On pourrait y aller ensemble, ce sera beaucoup plus amusant !"]
        }
      ]
    }
  ]
};

// ─── DYNAMIC GENERATOR FOR 10 UNIQUE TCF CANADA PAPERS & 10 UNIQUE TEF CANADA PAPERS ───

const TCF_WRITING_SUITE = [
  [
    {
      title: "Tâche 1 : Message court (Problème de chauffage)",
      prompt: "Vous avez loué un appartement pour vos vacances mais le chauffage ne fonctionne pas. Écrivez un message au propriétaire (60 à 120 mots) pour expliquer la situation et demander une solution rapide.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur le Propriétaire,\n\nJe vous écris afin de vous signaler un problème urgent concernant l'appartement loué pour cette semaine. Depuis ce matin, le système de chauffage est entièrement hors service et la température intérieure a chuté de façon préoccupante.\n\nPourriez-vous faire intervenir un technicien dans les plus brefs délais afin de rétablir le chauffage ? De plus, pourriez-vous m'indiquer si des appareils d'appoint sont disponibles en attendant la réparation ?\n\nDans l'attente de votre intervention rapide, je vous prie d'agréer, Monsieur, mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)",
      prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour au Canada (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une expérience inoubliable en assistant au Carnaval d'hiver de Québec. Dès mon arrivée, la ville historique était magnifiquement recouverte d'un manteau de neige et illuminée de mille feux.\n\nJ'ai eu la chance d'admirer d'impressionnantes sculptures sur glace et d'assister à la traditionnelle course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était à la fois féerique et très chaleureuse, malgré des températures extrêmement froides.\n\nCette immersion culturelle exceptionnelle m'a permis d'enrichir mon vocabulaire français et d'échanger avec des habitants chaleureux. Je garde un souvenir impérissable de cette aventure nordique et je recommande vivement cette destination !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Transports gratuits)",
      prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un vif débat au sein des municipalités modernes.\n\nD'un côté, les partisans de cette mesure soutiennent qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour la collectivité. Sans recettes de billetterie, la rénovation et la modernisation des infrastructures risquerient d'être compromises.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité du réseau."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande d'informations (Atelier culinaire)",
      prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Article de témoignage (Festival culturel)",
      prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Lors de mon dernier séjour au Québec, j'ai eu l'immense privilège de participer au Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été émerveillé par l'atmosphère festive et l'énergie vibrante des spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux et la convivialité des Québécois ont rendu cette expérience inoubliable.\n\nJe recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une immersion festive sans égale que vous ne regretterez pas !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Langues à l'école)",
      prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite de vifs débats sociétaux.\n\nD'une part, les partisans soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des structures phonétiques. De surcroît, une maîtrise précoce constitue un atout indiscutable dans un monde professionnel globalisé.\n\nD'autre part, les détracteurs craignent qu'une surcharge cognitive n'entrave l'acquisition fondamentale de la langue maternelle et du calcul.\n\nEn somme, bien que ces réserves soient légitimes, je suis convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle indispensable, à condition d'adapter la pédagogie au rythme de chaque élève."
    }
  ],
  [
    {
      title: "Tâche 1 : Message formel (Inscription au club de sport)",
      prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame, Monsieur,\n\nJe vous adresse ce courriel afin d'obtenir des informations précises concernant les modalités d'inscription à votre complexe sportif à Montréal pour la saison à venir.\n\nPourriez-vous m'indiquer la diversité des formules d'abonnement disponibles ainsi que les horaires d'ouverture des installations en semaine et le week-end ? Par ailleurs, j'aimerais savoir si une séance d'essai gratuite est envisageable avant tout engagement annuel.\n\nEn vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Compte-rendu (Action bénévole)",
      prompt: "Rédigez un court article pour le bulletin d'information de votre quartier (120 à 150 mots) résumant une journée d'action bénévole.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Samedi dernier, notre quartier a été le théâtre d'une magnifique journée de solidarité consacrée au nettoyage des berges du parc local. Plus de cinquante citoyens de tous âges se sont rassemblés dès le matin munis de gants et de sacs écologiques.\n\nGrâce à l'effort collectif et à une organisation impeccable, nous avons réussi à collecter plus de deux cents kilos de déchets plastiques et recyclables. Cette journée s'est clôturée autour d'un repas partagé convivial plein d'échanges chaleureux.\n\nCette initiative inspirante prouve que l'engagement citoyen local peut transformer positivement notre environnement. Une expérience enrichissante à renouveler sans hésiter !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Télétravail à 100%)",
      prompt: "Le télétravail à 100% est-il bénéfique pour l'épanouissement des salariés et la cohésion d'équipe ? Donnez votre opinion (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La généralisation du télétravail à temps plein transforme en profondeur l'organisation contemporaine du monde du travail.\n\nD'un côté, les avantages pour les employés sont indéniables : élimination des temps de transport stressants, meilleure gestion de l'équilibre entre vie privée et professionnelle, et autonomie accrue dans l'exécution des tâches quotidiennes.\n\nCependant, un isolement professionnel prolongé risque d'altérer la cohésion d'équipe et d'affaiblir le sentiment d'appartenance à l'entreprise. En outre, la frontière entre sphère personnelle et obligations professionnelles devient parfois perméable.\n\nEn conclusion, bien que le travail à distance offre une flexibilité appréciable, le modèle hybride associant présentiel et distanciel me paraît être l'équation optimale pour préserver le bien-être individuel et la dynamique collective."
    }
  ],
  [
    {
      title: "Tâche 1 : Courriel de réclamation (Achat en ligne défectueux)",
      prompt: "Vous avez commandé du matériel informatique mais vous avez reçu un article défectueux. Écrivez au service client (60 à 120 mots) pour réclamer un échange.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Responsable du Service Client,\n\nJe vous écris suite à la réception de ma commande N°84920 contenant un ordinateur portable. À ma grande surprise, l'écran présente un défaut d'affichage majeur dès l'allumage.\n\nLe matériel étant sous garantie, je sollicite par la présente un échange standard ou le remboursement intégral de mon achat. Pourriez-vous me transmettre la procédure de retour ainsi que le bon d'expédition prépayé ?\n\nDans l'attente d'une prise en charge rapide de ma réclamation, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit personnel (Changement de carrière)",
      prompt: "Dans une lettre à un ami collègue (120 à 150 mots), expliquez les raisons qui vous ont poussé à changer de domaine professionnel.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Cher Julien,\n\nJe prends enfin le temps de t'écrire pour partager avec toi une grande nouvelle : j'ai officiellement décidé de réorienter ma carrière professionnelle vers les éco-technologies.\n\nAprès dix années stimulantes dans la finance, je ressentais le besoin fondamental de donner davantage de sens à mon quotidien et de contribuer activement à des projets durables. J'ai donc entrepris une formation intensive de six mois en gestion de projets environnementaux.\n\nBien que ce changement exige de sortir de ma zone de confort, je me sens immensément motivé par ce nouveau défi. J'espère que nous pourrons nous voir très vite pour en discuter autour d'un café !\n\nAmicalement,\nMarc"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Interdiction des véhicules à essence)",
      prompt: "Les gouvernements devraient-ils interdire la vente de véhicules thermiques neufs d'ici 2035 ? Présentez votre argumentation (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'interdiction projetée des véhicules thermiques neufs d'ici 2035 suscite d'intenses débats entre impératifs écologiques et réalités économiques.\n\nD'une part, les partisans de cette mesure rappellent que le secteur des transports est le principal émetteur de gaz à effet de serre. Interdire les moteurs à essence constitue donc une étape décisive pour lutter contre le réchauffement climatique et assainir la qualité de l'air urbain.\n\nD'autre part, les opposants mettent en avant les coûts élevés des véhicules électriques et l'insuffisance actuelle des infrastructures de recharge. De plus, les répercussions sociales sur l'industrie automobile et l'emploi sont préoccupantes.\n\nEn conclusion, il est incontestable que la décarbonation des transports est nécessaire, mais sa réussite dépendra d'un accompagnement financier équitable des citoyens et d'un investissement massif dans les réseaux de recharge."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de renseignements (Bibliothèque municipale)",
      prompt: "Écrivez à la bibliothèque municipale de votre ville (60 à 120 mots) pour vous renseigner sur les horaires et le prêt numérique.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Madame la Bibliothécaire,\n\nJe vous adresse ce courriel afin de me renseigner sur les conditions d'adhésion et les services numériques offerts par la bibliothèque municipale.\n\nPourriez-vous me préciser les documents justificatifs requis pour l'établissement de la carte d'usager ainsi que le tarif annuel pour les résidents ? De plus, j'aimerais savoir si votre catalogue de livres numériques est accessible à distance depuis une tablette personnelle.\n\nEn vous remerciant pour vos informations, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Intégration au Québec)",
      prompt: "Racontez vos premiers mois d'installation au Canada dans un billet de blog (120 à 150 mots) en donnant des conseils pratiques aux nouveaux arrivants.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Installé à Montréal depuis maintenant six mois, je souhaite partager mon expérience d'intégration avec les futurs arrivants. Le choc culturel initial s'est rapidement dissipé grâce à l'accueil d'une bienveillance remarquable réservé par les Québécois.\n\nDès les premières semaines, je me suis inscrit à des ateliers de réseautage et j'ai exploré les différents quartiers de la ville. Bien que les procédures administratives exigent de la patience et de la rigueur, l'environnement social et professionnel canadien offre des perspectives d'épanouissement exceptionnelles.\n\nUn conseil essentiel : n'hésitez pas à aller au-devant des gens et à participer aux événements communautaires locaux. C'est la clé d'une intégration réussie et épanouissante !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Intelligence Artificielle et Emploi)",
      prompt: "L'intelligence artificielle représente-t-elle une menace ou une opportunité majeure pour le marché du travail de demain ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'essor fulgurant de l'intelligence artificielle suscite de profondes inquiétudes quant à l'avenir du marché de l'emploi mondial.\n\nD'un côté, les détracteurs soulignent le risque d'automatisation massive qui pourrait détruire de nombreux emplois administratifs et techniques, créant une précarité accrue pour les travailleurs non qualifiés.\n\nD'un autre côté, les défenseurs de l'IA rappellent que chaque révolution technologique génère de nouveaux métiers et libère les humains des tâches répétitives au profit d'activités créatives et stratégiques. De surcroît, l'IA constitue un multiplicateur de productivité sans précédent.\n\nEn somme, l'intelligence artificielle ne doit pas être crainte mais encadrée par des politiques de formation continue ambitieuses pour accompagner la reconversion des professionnels."
    }
  ],
  [
    {
      title: "Tâche 1 : Message d'absence (Congé exceptionnel)",
      prompt: "Écrivez un message à votre responsable hiérarchique (60 à 120 mots) pour demander une autorisation d'absence exceptionnelle de 3 jours.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur le Directeur,\n\nJe vous adresse ce courriel afin de solliciter une autorisation d'absence exceptionnelle de trois jours, du 12 au 14 du mois prochain, pour des raisons familiales impérieuses.\n\nJ'ai pris soin d'avancer mes dossiers en cours et de planifier l'intérim de mes projets avec mon collègue Thomas afin d'éviter tout retard de livraison. Je resterai joignable par courriel en cas d'urgence absolue.\n\nEn vous remerciant par avance pour votre compréhension, je vous prie d'agréer mes salutations respectueuses."
    },
    {
      title: "Tâche 2 : Critique culturelle (Exposition d'art)",
      prompt: "Rédigez une critique d'une exposition culturelle ou d'un musée récent auquel vous avez assisté (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Week-end dernier, j'ai visité la nouvelle exposition immersive consacrée à l'impressionnisme au Musée des Beaux-Arts. Dès l'entrée, les projections numériques géantes accompagnées d'une symphonie captivante transportent immédiatement le visiteur au cœur des chefs-d'œuvre.\n\nLa scénographie audacieuse et l'éclairage méticuleusement étudié mettent en valeur la texture et les nuances chromatiques de chaque toile. Ce parcours sensoriel original offre un regard totalement renouvelé sur des œuvres classiques.\n\nUne visite incontournable que je recommande chaleureusement à tous les passionnés d'art et d'histoire !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Écrans et réseaux sociaux)",
      prompt: "Faut-il réglementer strictement l'utilisation des téléphones portables et des réseaux sociaux chez les jeunes adolescents ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "L'omniprésence des smartphones et des réseaux sociaux dans la vie des adolescents soulève des interrogations légitimes quant aux risques d'addiction.\n\nD'un côté, les partisans d'une réglementation stricte mettent en garde contre les ravages du cyberharcèlement, la détérioration du sommeil et la baisse de la concentration scolaire provoquée par la surconsommation d'écrans.\n\nD'un autre côté, interdire totalement ces technologies semble illusoire à l'ère numérique. Les réseaux sociaux constituent également des espaces d'expression créative et de socialisation précieuses pour la jeunesse.\n\nEn conclusion, plus qu'une interdiction autoritaire, il convient de privilégier une éducation aux médias numériques dès le collège pour responsabiliser les jeunes."
    }
  ],
  [
    {
      title: "Tâche 1 : Invitation (Fête des voisins)",
      prompt: "Invitez vos voisins de quartier (60 à 120 mots) à une fête communautaire que vous organisez le mois prochain.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Chers Voisins,\n\nAfin de renforcer les liens de convivialité au sein de notre résidence, j'ai le plaisir de vous inviter à notre traditionnelle fête des voisins qui se tiendra le samedi 15 du mois prochain à partir de 18 heures dans le jardin collectif.\n\nChacun est invité à apporter une spécialité culinaire ou une boisson à partager. Ce sera l'occasion idéale d'accueillir les nouveaux résidents et d'échanger un moment chaleureux.\n\nMerci de bien vouloir me confirmer votre présence avant le 10 afin d'organiser au mieux cet événement !"
    },
    {
      title: "Tâche 2 : Récit d'initiative (Jardin collectif)",
      prompt: "Décrivez la création d'un jardin collectif dans votre quartier (120 à 150 mots) et son impact sur la vie de quartier.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Au printemps dernier, les résidents de notre quartier se sont mobilisés pour transformer une friche abandonnée en un jardin potager communautaire verdoyant. Grâce au soutien de la mairie et au travail enthousiaste de bénévole de tous âges, nous avons aménagé des bacs de culture écologiques.\n\nAujourd'hui, ce jardin est devenu un lieu de rencontre intergénérationnel dynamique où voisins échangent conseils de jardinage et légumes frais dans une ambiance conviviale.\n\nUne réussite collective remarquable qui a revitalisé notre quartier et renforcé le sentiment d'appartenance citoyenne !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Semaine de 4 jours)",
      prompt: "La semaine de travail de 4 jours devrait-elle être généralisée à l'ensemble des entreprises ? Argumentez votre position (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le passage à la semaine de travail de quatre jours sans réduction de salaire s'impose comme une expérimentation sociale majeure.\n\nD'un côté, les entreprises ayant testé ce modèle observent une réduction spectaculaire du burn-out, une baisse de l'absentéisme et un regain de motivation des salariés, ce qui compense largement le jour chômé.\n\nCependant, certains secteurs d'activité comme la santé, les transports ou le commerce de détail peineraient à financer la réorganisation des plannings et les embauches compensatoires nécessaires.\n\nEn conclusion, bien que la semaine de quatre jours offre un équilibre de vie remarquable, sa mise en œuvre doit rester flexible et adaptée aux spécificités de chaque secteur d'activité."
    }
  ],
  [
    {
      title: "Tâche 1 : Demande de réservation (Chalet à la montagne)",
      prompt: "Écrivez un courriel à un propriétaire de chalet (60 à 120 mots) pour réserver un séjour en famille pendant les vacances d'hiver.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Bonjour Monsieur,\n\nJe vous adresse ce courriel afin de me renseigner sur la disponibilité de votre chalet à Mont-Tremblant pour la semaine du 10 au 17 février pour une famille de cinq personnes.\n\nPourriez-vous me confirmer le tarif total de la location ainsi que le montant du dépôt de garantie ? De plus, j'aimerais savoir si le chalet dispose d'un espace de rangement sécurisé pour les équipements de ski.\n\nDans l'attente de vos précisions, je vous prie d'agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Témoignage (Formation professionnelle)",
      prompt: "Racontez une formation continue récente que vous avez suivie (120 à 150 mots) et expliquez ses apports concrets.",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "J'ai récemment suivi un stage de formation intensive consacrée au marketing numérique et aux stratégies de médias sociaux. Durant deux semaines stimulantes, des experts du secteur nous ont initiés aux derniers outils d'analyse de données et d'optimisation de campagnes.\n\nGrâce aux cas pratiques traités en équipe, j'ai pu acquérir des compétences directement applicables dans mes fonctions quotidiennes, ce qui m'a permis d'augmenter la visibilité en ligne de mon entreprise de 30%.\n\nUne expérience d'apprentissage extrêmement valorisante que je recommande à tout professionnel désireux de faire évoluer sa carrière !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Consommation de produits locaux)",
      prompt: "Acheter exclusivement des produits alimentaires locaux et de saison est-il un objectif réaliste pour tous les ménages ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "La promotion du locavorisme, prônant la consommation exclusive d'aliments produits localement, gagne une grande popularité face aux défis écologiques actuels.\n\nD'une part, privilegier les circuits courts permet de soutenir l'économie rurale régionale et de réduire considérablement l'empreinte carbone liée au transport des marchandises.\n\nD'autre part, exigez le 100% local se heurte à des contraintes financières pour les ménages à budget modeste, car les produits d'agriculture locale sont souvent plus chers que les produits importés en masse. De plus, la diversité alimentaire hivernale reste limitée sous certains climats nordiques.\n\nEn somme, si la consommation locale est un idéal vertueux, elle doit s'inscrire dans une démarche progressive sans devenir une contrainte punitive pour les ménages."
    }
  ],
  [
    {
      title: "Tâche 1 : Remerciement formel (Fin de stage)",
      prompt: "Rédigez un courriel de remerciement à votre maître de stage (60 à 120 mots) à la fin de votre période en entreprise.",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Directeur,\n\nAlors que mon stage au sein de votre entreprise touche à sa fin, je tiens à vous exprimer ma sincère gratitude pour l'accueil chaleureux et la confiance que vous m'avez accordés tout au long de ces trois mois.\n\nCette expérience professionnelle m'a permis d'approfondir mes connaissances pratiques et de développer des compétences solides en gestion de projets. Je remercie également toute l'équipe pour sa disponibilité et ses précieux conseils.\n\nEn vous souhaitant une excellente continuation, je vous prie d'agréer l'expression de mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Récit d'événement (Marathon de Montréal)",
      prompt: "Décrivez votre participation ou votre soutien lors d'un événement sportif populaire (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Dimanche dernier, j'ai participé pour la première fois au Marathon de Montréal aux côtés de milliers de coureurs venus du monde entier. Le parcours sillonnait les plus beaux quartiers de la ville sous les encouragements enthousiastes d'une foule nombreuse.\n\nBien que la deuxième moitié de la course ait exigé un effort physique et mental intense, l'énergie collective et les orchestres disposés le long du trajet m'ont porté jusqu'à la ligne d'arrivée.\n\nFranchir la ligne d'arrivée après 42 kilomètres de course a été un moment d'intense fierté et une aventure humaine gravée à jamais dans ma mémoire !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Quotas touristiques)",
      prompt: "Faut-il imposer des quotas stricts d'accès à certains sites naturels et patrimoniaux pour protéger la planète ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Face aux ravages du surtourisme, l'instauration de quotas d'accès aux sites naturels et monuments historiques divise l'opinion publique.\n\nD'un côté, les défenseurs de l'environnement soulignent que la surfréquentation touristique dégrade irréversiblement les écosystèmes fragiles, érode le patrimoine et détruit la qualité de vie des habitants locaux. Restreindre le nombre de visiteurs est donc l'unique moyen d'assurer la préservation de ces trésors pour les générations futures.\n\nD'un autre côté, les acteurs du secteur économique craignent des pertes financières massives et dénoncent une mesure discriminatoire qui réserverait l'accès à la culture à une minorité privilégiée.\n\nEn conclusion, la régulation des flux touristiques est devenue inévitable, mais elle doit s'accompagner d'une sensibilisation au tourisme responsable."
    }
  ],
  [
    {
      title: "Tâche 1 : Proposition de partenariat (Association locale)",
      prompt: "Proposez un partenariat commercial à un commerce de quartier au nom de votre association étudiante (60 à 120 mots).",
      min: 60,
      max: 120,
      time: 15,
      sampleResponse: "Monsieur le Gérant,\n\nAu nom de l'association étudiante de l'Université de Montréal, je vous écris afin de vous proposer un partenariat commercial à l'occasion de notre rentrée universitaire.\n\nNous souhaiterions offrir à nos 500 membres des réductions exclusives dans votre établissement en échange d'une visibilité prioritaire sur nos réseaux sociaux et nos supports de communication.\n\nSeriez-vous disponible la semaine prochaine pour une courte rencontre afin d'échanger sur cette opportunité mutually bénéfique ?\n\nDans l'attente de votre réponse, veuillez agréer mes salutations distinguées."
    },
    {
      title: "Tâche 2 : Résumé de conférence (Développement durable)",
      prompt: "Rédigez le compte-rendu d'une conférence publique sur la transition écologique (120 à 150 mots).",
      min: 120,
      max: 150,
      time: 20,
      sampleResponse: "Hier soir, l'Hôtel de Ville accueillait une conférence captivante consacrée aux stratégies de transition écologique dans les grandes métropoles. Trois experts renommés ont présenté des solutions innovantes axées sur la rénovation thermique des bâtiments et la mobilité douce.\n\nLes intervenants ont insisté sur l'urgence d'une action concertée entre citoyens, entreprises et collectivités territoriales pour atteindre la neutralité carbone d'ici 2050.\n\nCette présentation claire et inspirante s'est conclue par un débat passionnant avec le public, démontrant une prise de conscience collective prometteuse pour notre avenir urbain !"
    },
    {
      title: "Tâche 3 : Essai argumentatif (Université gratuite)",
      prompt: "L'accès aux études supérieures devrait-il être entièrement gratuit et financé par l'État pour tous les étudiants ? (140 à 180 mots).",
      min: 140,
      max: 180,
      time: 25,
      sampleResponse: "Le débat sur la gratuité totale de l'enseignement supérieur ravive les discussions autour de l'égalité des chances et du financement public.\n\nD'une part, garantir la gratuité universitaire permettrait d'éliminer les barrières financières qui freinent l'accès des jeunes issus de milieux défavorisés aux diplômes du supérieur, favorisant ainsi une méritocratie réelle et la mobilité sociale.\n\nD'autre part, la gratuité universelle représenterait un coût budgétaire colossal pour l'État, risquant de dégrader la qualité des infrastructures et du corps professoral sans financement privé complémentaire.\n\nEn conclusion, l'accès à l'université doit être garanti à tous, mais une gratuité ciblée sous forme de bourses sociales élevées me semble plus équitable qu'une gratuité aveugle bénéficiant également aux ménages aisés."
    }
  ]
];

let _cachedRegistry: ExamPaper[] | null = null;

export function getExamRegistry(): ExamPaper[] {
  if (_cachedRegistry) return _cachedRegistry;
  const registry: ExamPaper[] = [];

  // Generate 10 TCF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;
    const writingSet = TCF_WRITING_SUITE[i - 1];

    // Different question pool seed offset for Real Exam Mode to guarantee ZERO cheating
    const seedOffset = isPractice ? (i * 3) : (i * 7 + 13);

    registry.push({
      id: isPractice ? `tcf-canada-practice-paper-${paperNum}` : `tcf-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TCF Canada Guided Practice Paper ${paperNum}` : `TCF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TCF-PRAC-${numStr}` : `TCF-EXAM-${numStr}`,
      type: "TCF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper with step-by-step hints, audio transcripts, and 2-attempt answer validation (84 Items / 119 Mins).`
        : `Strict official FEI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 119 Mins).`,
      totalDurationMins: 119,
      isSamplePaper: paperNum <= 2,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Listen to French audio clips and answer multiple-choice questions (39 Questions / 35 Mins).",
          durationMins: 35,
          totalQuestions: 39,
          questions: generateListeningQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Read French articles, emails, administrative notices, and academic texts (39 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 39,
          questions: generateReadingQuestions(39, `tcf${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Compose short messages, social articles, and argumentative essays (3 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 3,
          writingTasks: writingSet.map((wt, idx) => ({
            id: `tcf${i}-w${idx + 1}`,
            taskNumber: idx + 1,
            title: wt.title,
            prompt: wt.prompt,
            wordCountMin: wt.min,
            wordCountMax: wt.max,
            timeLimitMins: wt.time,
            guidedTips: ["Introduction claire", "Présenter 2 arguments développés", "Conclusion synthétique avec prise de position"],
            sampleResponse: wt.sampleResponse
          }))
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Interactive oral interaction with AI examiner feedback (3 Tasks / 12 Mins).",
          durationMins: 12,
          totalQuestions: 3,
          speakingTasks: [
            {
              id: `tcf${i}-spk-1`,
              taskNumber: 1,
              title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
              scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
              prepTimeMins: 0,
              speakingTimeMins: 2,
              keyPhrases: ["Je m'appelle...", "Actuellement, je travaille en tant que...", "Mon objectif principal au Canada est..."]
            },
            {
              id: `tcf${i}-spk-2`,
              taskNumber: 2,
              title: "Tâche 2 : Exercice en interaction (Recherche d'informations)",
              scenario: `Vous souhaitez obtenir des informations sur un service public au Québec (Sujet épreuve ${i}). Posez au moins 5 questions à l'examinateur sur les conditions d'accès, tarifs et démarches.`,
              prepTimeMins: 1,
              speakingTimeMins: 3.5,
              keyPhrases: ["Quels sont les documents requis ?", "Combien coûte l'inscription ?", "Est-il possible de faire les démarches en ligne ?"]
            },
            {
              id: `tcf${i}-spk-3`,
              taskNumber: 3,
              title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
              scenario: `Exprimez et défendez votre opinion à l'examinateur sur l'impact de la numérisation des services publics dans la société actuelle.`,
              prepTimeMins: 1,
              speakingTimeMins: 4.5,
              keyPhrases: ["Selon moi...", "D'un côté..., mais d'un autre côté...", "Pour conclure, je dirais que..."]
            }
          ]
        }
      ]
    });
  }

  // Generate 10 TEF Canada Papers (5 Practice Mode Papers + 5 Real Exam Mode Papers)
  for (let i = 1; i <= 10; i++) {
    const isPractice = i <= 5;
    const paperNum = isPractice ? i : i - 5;
    const numStr = `0${paperNum}`;

    // Distinct seed offset for Real Exam Mode
    const seedOffset = isPractice ? (i * 4) : (i * 9 + 17);

    registry.push({
      id: isPractice ? `tef-canada-practice-paper-${paperNum}` : `tef-canada-official-exam-paper-${paperNum}`,
      title: isPractice ? `TEF Canada Guided Practice Paper ${paperNum}` : `TEF Canada Official Real Exam Paper ${paperNum}`,
      code: isPractice ? `TEF-PRAC-${numStr}` : `TEF-EXAM-${numStr}`,
      type: "TEF_CANADA",
      recommendedMode: isPractice ? "PRACTICE" : "EXAM",
      description: isPractice
        ? `Guided practice paper tailored for TEF Canada Paris Chamber of Commerce (CCI) standards with hints and transcripts (84 Items / 135 Mins).`
        : `Strict official CCI test-center exam paper with unpausable timers, zero hints, and authentic candidate scoring (84 Items / 135 Mins).`,
      totalDurationMins: 135,
      isSamplePaper: paperNum <= 2,
      published: true,
      sections: [
        {
          type: "COMPREHENSION_ORALE",
          title: "Compréhension Orale (Listening)",
          description: "Audio passages, public announcements, and conversations (40 Questions / 40 Mins).",
          durationMins: 40,
          totalQuestions: 40,
          questions: generateListeningQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "COMPREHENSION_ECRITE",
          title: "Compréhension Écrite (Reading)",
          description: "Press articles, administrative documents, and synthesis questions (40 Questions / 60 Mins).",
          durationMins: 60,
          totalQuestions: 40,
          questions: generateReadingQuestions(40, `tef${i}`, seedOffset)
        },
        {
          type: "EXPRESSION_ECRITE",
          title: "Expression Écrite (Writing)",
          description: "Section A (Fait divers article) and Section B (Argumentative letter) (2 Tasks / 60 Mins).",
          durationMins: 60,
          totalQuestions: 2,
          writingTasks: [
            {
              id: `tef${i}-w1`,
              taskNumber: 1,
              title: "Section A : Article de Fait Divers (Newspaper Continuation)",
              prompt: `Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un événement inattendu a perturbé le centre-ville de Montréal (Sujet épreuve ${i})...'`,
              wordCountMin: 80,
              wordCountMax: 120,
              timeLimitMins: 25,
              guidedTips: ["Employer le passé composé et l'imparfait", "Décrire la réaction des passants et des secours", "Conclure par un retour au calme"]
            },
            {
              id: `tef${i}-w2`,
              taskNumber: 2,
              title: "Section B : Lettre d'opinion persuasive (Letter to Editor / Mayor)",
              prompt: `Rédigez une lettre d'opinion au journal local (200 mots minimum) pour exprimer votre accord ou désaccord sur l'aménagement de nouvelles pistes cyclables au détriment des voies de stationnement.`,
              wordCountMin: 200,
              wordCountMax: 250,
              timeLimitMins: 35,
              guidedTips: ["Salutation formelle", "Présenter 2 arguments environnementaux et de sécurité", "Conclure par une formule de politesse adaptée"]
            }
          ]
        },
        {
          type: "EXPRESSION_ORALE",
          title: "Expression Orale (Speaking)",
          description: "Section A (Information Gathering) and Section B (Persuasive Argumentation) (2 Tasks / 15 Mins).",
          durationMins: 15,
          totalQuestions: 2,
          speakingTasks: [
            {
              id: `tef${i}-spk-1`,
              taskNumber: 1,
              title: "Section A : Demande d'informations (10 Questions)",
              scenario: `Vous voyez une annonce pour une offre d'emploi ou un service à mi-temps. Appelez le responsable pour poser au moins 10 questions précises sur le poste (Épreuve ${i}).`,
              prepTimeMins: 0,
              speakingTimeMins: 5,
              keyPhrases: ["Quelles sont les compétences requises ?", "Quel est le salaire horaire proposé ?", "Quand commence le contrat ?"]
            },
            {
              id: `tef${i}-spk-2`,
              taskNumber: 2,
              title: "Section B : Convaincre un ami (Persuasive Speaking)",
              scenario: `Un ami hésite à s'inscrire à une aventure sportive ou culturelle ce week-end. Convainquez-le d'accepter cette opportunité avec vous (Épreuve ${i}).`,
              prepTimeMins: 1,
              speakingTimeMins: 10,
              keyPhrases: ["Pense à tous les bénéfices !", "Je m'occupe de la logistique.", "C'est le moment idéal de tenter l'expérience."]
            }
          ]
        }
      ]
    });
  }

  _cachedRegistry = registry;
  return registry;
}

export interface NCLCScoreResult {
  nclcLevel: number; // 1 to 12
  cefrEquivalent: string; // A1, A2, B1, B2, C1, C2
  expressEntryPoints: number; // CLB points for Express Entry
  statusMessage: string;
  isNCLC7TargetReached: boolean;
}

export function calculateNCLCScore(pctScore: number, _examType: ExamType, _sectionType: SectionType): NCLCScoreResult {
  const pct = Math.max(0, Math.min(100, pctScore));
  let nclcLevel = 0;
  let cefrEquivalent = "Unrated";
  let expressEntryPoints = 0;
  let isNCLC7TargetReached = false;

  if (pct === 0) {
    nclcLevel = 0;
    cefrEquivalent = "Unrated";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  } else if (pct >= 90) { // 35-39 / 39 (C2 Mastery)
    nclcLevel = 10;
    cefrEquivalent = "C2";
    expressEntryPoints = 34;
    isNCLC7TargetReached = true;
  } else if (pct >= 77) { // 30-34 / 39 (C1 Advanced)
    nclcLevel = 9;
    cefrEquivalent = "C1";
    expressEntryPoints = 31;
    isNCLC7TargetReached = true;
  } else if (pct >= 69) { // 27-29 / 39 (NCLC 8 B2)
    nclcLevel = 8;
    cefrEquivalent = "B2";
    expressEntryPoints = 23;
    isNCLC7TargetReached = true;
  } else if (pct >= 59) { // 23-26 / 39 (NCLC 7 B2 Benchmark Target for Express Entry)
    nclcLevel = 7;
    cefrEquivalent = "B2";
    expressEntryPoints = 17;
    isNCLC7TargetReached = true;
  } else if (pct >= 48) { // 19-22 / 39 (NCLC 6 B1 Intermediate)
    nclcLevel = 6;
    cefrEquivalent = "B1";
    expressEntryPoints = 12;
    isNCLC7TargetReached = false;
  } else if (pct >= 38) { // 15-18 / 39 (NCLC 5 B1 Threshold)
    nclcLevel = 5;
    cefrEquivalent = "B1";
    expressEntryPoints = 6;
    isNCLC7TargetReached = false;
  } else if (pct >= 25) { // 10-14 / 39 (NCLC 4 A2 Elementary)
    nclcLevel = 4;
    cefrEquivalent = "A2";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  } else {
    nclcLevel = 3;
    cefrEquivalent = "A1";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  }

  const statusMessage = pct === 0
    ? `⚠️ No questions attempted or 0% score recorded. Please complete the test questions in each section to receive a diagnostic NCLC rating.`
    : isNCLC7TargetReached
    ? `🎉 Excellent! Score achieves NCLC ${nclcLevel} (${cefrEquivalent}) — Meets Canadian Express Entry PR Benchmark!`
    : `💪 NCLC ${nclcLevel} (${cefrEquivalent}) recorded. Aim for 65%+ to hit the official NCLC 7 (B2) immigration benchmark.`;

  return {
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    statusMessage,
    isNCLC7TargetReached
  };
}
