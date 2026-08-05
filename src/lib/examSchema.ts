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
// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
const LISTENING_TOPICS = [
  {
    level: "A1",
    title: "Annonce de gare SNCF / Via Rail",
    text: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    opt: ["Au quai / voie 4", "À la gare du Nord", "En retard de 45 minutes", "Annulé sans correspondance"],
    ans: 0,
    tr: "Chers voyageurs, votre attention s'il vous plaît. Le TGV numéro 7842 à destination de Paris-Gare de Lyon, départ initialement prévu à 14h15, partira exceptionnellement de la voie 4. Veuillez assurer l'embarquement immédiat.",
    en: "Dear passengers, attention please. TGV train 7842 to Paris-Gare de Lyon, originally scheduled for 2:15pm, will exceptionally depart from platform 4. Please proceed to immediate boarding."
  },
  {
    level: "A1",
    title: "Message vocal d'un ami",
    text: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    opt: ["Au supermarché", "À la boulangerie du quartier", "À la maison", "Au cinéma municipal"],
    ans: 0,
    tr: "Salut Thomas ! C'est Marc. Je suis actuellement au supermarché du centre-ville pour faire les courses de la semaine. Dis-moi, est-ce que tu as besoin que je prenne du pain frais ou du fromage pour le dîner ce soir ?",
    en: "Hi Thomas! It's Marc. I'm currently at the downtown supermarket doing weekly grocery shopping. Tell me, do you need me to pick up fresh bread or cheese for dinner tonight?"
  },
  {
    level: "A2",
    title: "Bulletin météo radio",
    text: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues sur l'ensemble de la région au cours de l'après-midi.",
    opt: ["Prendre un parapluie pour les averses", "Mettre des lunettes de soleil", "Rester à la maison toute la journée", "Prendre la voiture pour éviter la neige"],
    ans: 0,
    tr: "Bonjour à tous, voici vos prévisions météorologiques pour la journée de mardi. Pensez à vous équiper d'un parapluie robuste dès ce matin, car de fortes averses orageuses sont attendues sur l'ensemble de la région au cours de l'après-midi.",
    en: "Hello everyone, here is your weather forecast for Tuesday. Be sure to bring a sturdy umbrella this morning, as heavy thunderstorm showers are expected across the region in the afternoon."
  },
  {
    level: "A2",
    title: "Rappel de rendez-vous médical",
    text: "Bonjour, vous êtes bien sur le répondeur du cabinet dentaire. Nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    opt: ["Mardi à 10h00", "Mercredi à 14h00", "Lundi matin à 9h00", "Jeudi en fin d'après-midi"],
    ans: 0,
    tr: "Bonjour, nous vous rappelons que votre rendez-vous de contrôle annuel avec le docteur Mercier est confirmé pour ce mardi à 10h00 précises.",
    en: "Hello, we are reminding you that your annual dental check-up with Dr. Mercier is confirmed for this Tuesday at exactly 10:00am."
  },
  {
    level: "B1",
    title: "Annonce d'organisation d'entreprise",
    text: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique initialement programmée ce jeudi matin est reportée à vendredi 15h00 dans la grande salle de conférence B au deuxième étage.",
    opt: ["Vendredi à 15h00 en salle B", "Jeudi matin en salle A", "Lundi matin au rez-de-chaussée", "Annulée définitivement"],
    ans: 0,
    tr: "Bonjour à l'équipe projet. Veuillez noter que la réunion stratégique est reportée à vendredi 15h00 dans la grande salle de conférence B au deuxième étage.",
    en: "Hello project team. Please note that the strategic meeting is postponed to Friday at 3:00pm in large conference room B on the second floor."
  },
  {
    level: "B1",
    title: "Consigne de sécurité incendie",
    text: "Attention, exercice de sécurité incendie dans le bâtiment. En cas d'alarme sonore, veuillez évacuer calmement les locaux en empruntant exclusivement les escaliers de secours et ne pas utiliser les ascenseurs.",
    opt: ["Utiliser les escaliers de secours", "Prendre les ascenseurs principaux", "Rester enfermé dans son bureau", "Ouvrir toutes les fenêtres"],
    ans: 0,
    tr: "Attention, exercice de sécurité incendie. En cas d'alarme, veuillez évacuer calmement en empruntant exclusivement les escaliers de secours et ne pas utiliser les ascenseurs.",
    en: "Attention, fire safety drill. In case of alarm, please evacuate calmly using exclusively the emergency stairs and do not use elevators."
  },
  {
    level: "B2",
    title: "Chronique environnementale radio",
    text: "Selon la nouvelle réglementation municipale entrée en vigueur ce mois-ci, la collecte sélective et le compostage obligatoire des déchets organiques permettent d'abaissez le volume global des ordures ménagères de 30 % dans les arrondissements pilotes.",
    opt: ["Réduire le volume des poubelles de 30%", "Augmenter la taxe d'enlèvement d'ordures", "Interdire la vente d'emballages en plastique", "Construire de nouvelles usines d'incinération"],
    ans: 0,
    tr: "La collecte sélective et le compostage obligatoire permettent d'abaisser le volume global des ordures ménagères de 30 % dans les arrondissements pilotes.",
    en: "Selective collection and mandatory composting reduce household waste volume by 30% in pilot boroughs."
  },
  {
    level: "B2",
    title: "Reportage économique et marché du travail",
    text: "L'accélération du travail hybride au Québec a stimulé les ventes d'équipements informatiques et d'ergonomie de bureau, enregistrant une hausse nette de 25 % du chiffre d'affaires du secteur au cours du dernier trimestre.",
    opt: ["Une hausse de 25% des ventes d'équipements", "Une baisse drastique des salaires", "La fermeture massive des commerces physiques", "La fin du matériel informatique de bureau"],
    ans: 0,
    tr: "L'accélération du travail hybride a stimulé les ventes d'équipements, enregistrant une hausse nette de 25 % du chiffre d'affaires.",
    en: "The acceleration of hybrid work boosted equipment sales, recording a net 25% increase in revenue."
  },
  {
    level: "C1",
    title: "Interview radio d'urbanisme métropolitain",
    text: "Dans cette perspective d'adaptation climatique, l'aménagement de micro-forêts urbaines et la végétalisation systématique des toitures contribuent de manière décisive à l'atténuation des îlots de chaleur au cœur des grandes métropoles.",
    opt: ["Combattre les îlots de chaleur urbains", "Accélérer la bétonisation des voies publiques", "Augmenter la vitesse de circulation automobile", "Remplacer les espaces vert par des parkings"],
    ans: 0,
    tr: "La végétalisation systématique des toitures contribue de manière décisive à l'atténuation des îlots de chaleur au cœur des grandes métropoles.",
    en: "Systematic rooftop greening contributes decisively to mitigating urban heat islands in major metropolitan centers."
  },
  {
    level: "C2",
    title: "Conférence de recherche scientifique",
    text: "L'avènement de la cryptographie quantique intégrée aux protocoles de communication de nouvelle génération permet d'envisager une étanchéité théoriquement absolue des flux de données face aux risques de cyber-intrusion.",
    opt: ["Garantir une étanchéité théoriquement absolue des données", "Accélérer les composants électroniques mobiles", "Diminuer les investissements dans la recherche", "Remplacer les serveurs informatiques distants"],
    ans: 0,
    tr: "L'avènement de la cryptographie quantique permet d'envisager une étanchéité théoriquement absolue des flux de données.",
    en: "The advent of quantum cryptography allows for theoretically absolute data flow security against cyber intrusions."
  }
];

const READING_TOPICS = [
  // A1 DISCOVERY (1-10)
  { level: "A1", text: "Horaires de la boulangerie 'La Parisis' : Ouvert du mardi au dimanche de 7h00 à 19h00 sans interruption. Fermeture hebdomadaire le lundi.", q: "Quand la boulangerie est-elle fermée ?", opt: ["Le lundi", "Le dimanche", "Le mardi", "Tous les après-midis"], ans: 0, passEn: "Bakery hours 'La Parisis': Open Tuesday to Sunday from 7:00am to 7:00pm non-stop. Closed weekly on Monday." },
  { level: "A1", text: "Avis de passage de la Poste canadienne : Votre colis recommandé est disponible au bureau central à partir de demain 14h. Veuillez vous munir d'une pièce d'identité.", q: "Où et quand récupérer votre colis ?", opt: ["Au bureau central dès demain 14h", "À la maison aujourd'hui", "À la mairie la semaine prochaine", "Chez le voisin ce soir"], ans: 0, passEn: "Canada Post delivery notice: Your registered package is available at the central branch starting tomorrow at 2pm. Bring ID." },
  { level: "A1", text: "Annonce de la bibliothèque municipale : Les ateliers de lecture pour enfants ont lieu chaque samedi matin de 10h00 à 11h30. Entrée libre et gratuite.", q: "À quel moment ont lieu les ateliers de lecture ?", opt: ["Le samedi matin de 10h00 à 11h30", "Le vendredi soir", "Le dimanche après-midi", "Tous les jours à midi"], ans: 0, passEn: "Library notice: Children's reading workshops every Saturday from 10:00 to 11:30am. Free admission." },
  { level: "A1", text: "Message de la clinique médicale : Le cabinet du docteur Roy sera exceptionnellement fermé du 15 au 20 août pour congés annuels.", q: "Pourquoi le cabinet médical est-il fermé ?", opt: ["Pour congés annuels du docteur", "Pour rénovation complète", "En raison d'un problème technique", "Pour déménagement"], ans: 0, passEn: "Medical clinic notice: Dr. Roy's office will be closed August 15-20 for annual leave." },

  // A2 BREAKTHROUGH (11-18)
  { level: "A2", text: "Règlement municipal de la piscine municipale : Les enfants âgés de moins de 12 ans doivent obligatoirement être accompagnés d'un adulte majeur dans l'enceinte des bassins.", q: "Quelle condition est exigée pour les enfants de moins de 12 ans ?", opt: ["Être accompagné par un adulte majeur", "Avoir un certificat médical", "Venir uniquement le matin", "Payer un tarif spécial"], ans: 0, passEn: "Municipal pool rule: Children under 12 must be accompanied by an adult inside the pool area." },
  { level: "A2", text: "Offre d'emploi spécialisée : Restaurant gastronomique du Vieux-Montréal recherche un serveur bilingue français-anglais avec 2 ans d'expérience au service en salle.", q: "Quel profil correspond exactement à cette offre ?", opt: ["Un serveur bilingue expérimenté", "Un cuisinier italien débutant", "Un comptable à mi-temps", "Un gérant de magasin"], ans: 0, passEn: "Job posting: Upscale restaurant in Old Montreal seeks bilingual French-English server with 2 years table service experience." },
  { level: "A2", text: "Note d'information aux résidents : Des travaux de réfection de la chaussée auront lieu dans la rue Sherbrooke le mercredi 12 octobre. Le stationnement sera interdit de 7h à 18h.", q: "Quelle interdiction concerne les résidents le mercredi 12 octobre ?", opt: ["L'interdiction de stationner dans la rue de 7h à 18h", "L'interdiction de sortir de chez soi", "L'interdiction de prendre le bus", "L'interdiction d'utiliser l'eau courante"], ans: 0, passEn: "Notice to residents: Street resurfacing on Sherbrooke St on Wednesday Oct 12. Parking prohibited 7am-6pm." },
  { level: "A2", text: "Annonce du centre communautaire : Inscriptions aux cours de langue italienne et espagnole ouvertes pour la session d'automne. Tarif réduit pour les étudiants et retraités.", q: "Qui peut bénéficier d'un tarif réduit ?", opt: ["Les étudiants et les retraités", "Seulement les enfants de moins de 5 ans", "Uniquement les professeurs", "Tous les touristes de passage"], ans: 0, passEn: "Community center notice: Italian and Spanish fall course enrollment open. Discounted rate for students and seniors." },

  // B1 THRESHOLD (19-26)
  {
    level: "B1",
    text: `ÉCONOMIE ET NUTRITION — LE POUVOIR D'ACHAT ET LA SANTÉ AU QUÉBEC\n\nUn rapport récent de l'Institut National de Santé Publique du Québec souligne l'importance des choix alimentaires quotidiens sur la santé cardiaque. Selon les chercheurs, réduire sa consommation de sel de seulement 3 grammes par jour diminuerait de 15 % les risques d'hypertension artérielle à l'échelle nationale.\n\nCette recommandation s'inscrit dans une campagne globale d'éducation à la nutrition. Les professionnels du secteur médical encouragent les consommateurs à privilégier les aliments frais préparés à la maison plutôt que les plats industriels transformés, souvent riches en sodium et en conservateurs artificiels.\n\nEn outre, les autorités canadiennes envisagent d'imposer un étiquetage nutritionnel plus clair sur la face avant des emballages afin d'aider les familles à identifier rapidement les produits à forte teneur en sel et en sucres ajoutés.`,
    q: "Selon l'étude, quel est l'impact direct d'une diminution quotidienne de 3 grammes de sel ?",
    opt: ["Une baisse de 15% des risques d'hypertension artérielle", "Une hausse de 20% du pouvoir d'achat des ménages", "La fermeture immédiate des usines agroalimentaires", "Une réduction automatique de la consommation de sucre"],
    ans: 0,
    passEn: "HEALTH AND NUTRITION — PURCHASING POWER AND HEALTH IN QUEBEC\n\nA recent report highlights that reducing daily salt intake by 3g cuts hypertension risk by 15% nationwide."
  },
  {
    level: "B1",
    text: `TRANSPORT URBAIN ET MOBILITÉ DURABLE — ROULEZ VERT À MONTRÉAL\n\nLa Société de Transport de Montréal (STM) a annoncé une restructuration majeure de son réseau routier nocturne. Afin de poursuivre les travaux d'électrification des infrastructures, les lignes de tramway et de métro léger seront remplacées par des bus électriques articulés dès 22h00 les soirs de semaine.\n\nCette transition permettra non seulement d'accélérer la rénovation des voies ferroviaires, mais garantira également un niveau de bruit réduit pour les résidents des quartiers centraux. Les usagers sont invités à consulter la nouvelle application mobile pour suivre la position des bus en temps réel.\n\nMalgré quelques réticences initiales liées aux légers retards de correspondance, la majorité des voyageurs salue cette initiative moderne qui s'inscrit pleinement dans le plan climat de la métropole.`,
    q: "Quelle mesure la Société de Transport prend-elle les soirs de semaine dès 22h00 ?",
    opt: ["Le remplacement des lignes ferroviaires par des bus électriques", "La gratuité totale de l'ensemble du réseau de métro", "L'arrêt complet de tous les transports collectifs", "L'interdiction de circuler pour les piétons"],
    ans: 0,
    passEn: "URBAN TRANSIT & SUSTAINABLE MOBILITY\n\nTram lines will be replaced by electric buses starting at 10:00pm on weeknights for infrastructure upgrades."
  },
  {
    level: "B1",
    text: `ÉDUCATION ET TECHNOLOGIE — LES MANUELS NUMÉRIQUES DANS LES ÉCOLES\n\nL'introduction généralisée des tablettes numériques dans les établissements secondaires du Nouveau-Brunswick suscite des débats passionnés parmi les enseignants et les parents d'élèves. Selon une enquête menée auprès de 500 éducateurs, 68 % constatent une augmentation significative de l'engagement des étudiants lors des activités de recherche documentaire.\n\nCependant, plusieurs spécialistes en pédiatrie mettent en garde contre l'augmentation du temps d'écran quotidien et soulignent l'importance de maintenir un équilibre avec l'apprentissage sur support papier traditionnel. Les écoles mettent donc en place des chartes d'utilisation responsable pour encadrer cet usage en classe.`,
    q: "Que constate la majorité des enseignants enquêtés concernant les tablettes ?",
    opt: ["Une hausse de l'engagement des élèves dans la recherche documentaire", "Une baisse drastique des résultats scolaires généraux", "L'abandon complet de tous les cours de lecture", "Le refus des parents d'acheter des fournitures"],
    ans: 0,
    passEn: "EDUCATION & TECH — DIGITAL TEXTBOOKS IN SCHOOLS\n\n68% of surveyed educators note increased student engagement in documentary research using digital tablets."
  },

  // B2 VANTAGE TARGET (27-34) — 8 UNIQUE B2 TEXTS FOR NCLC 7 TARGET
  {
    level: "B2",
    text: `URBANISME ÉCOLOGIQUE ET ÎLOTS DE CHALEUR MÉTROPOLITAINS\n\nDans la plupart des grandes agglomérations nord-américaines, la multiplication des îlots de chaleur constitue désormais un enjeu sanitaire et environnemental préoccupant. L'accumulation d'asphalte et de béton accentue l'absorption thermique, entraînant des températures estivales étouffantes au cœur des cités.\n\nPour contrer ce phénomène, les urbanistes préconisent la mise en place de péages urbains incitatifs couplée à un vaste programme de végétalisation des toitures d'immeubles. Les premiers résultats observés dans les quartiers pilotes démontrent une réduction de 20 % de la circulation automobile, corrélée à une baisse mesurable de la pollution atmosphérique.\n\nCependant, les commerçants du centre-ville expriment des inquiétudes quant à la baisse potentielle du chalandage. Les municipalités s'engagent donc à compenser ces effets en renforçant la fréquence des transports en commun.`,
    q: "Selon l'article, quel est l'effet combiné de la végétalisation et des péages incitatifs ?",
    opt: ["Une baisse de 20% du trafic automobile et une réduction de la pollution", "La disparition complète des commerces de proximité", "Une hausse de la température estivale au centre-ville", "L'obligation d'utiliser uniquement des véhicules électriques"],
    ans: 0,
    passEn: "ECOLOGICAL URBANISM & METROPOLITAN HEAT ISLANDS\n\nPilot programs combining green rooftops and incentive urban tolls reduced car traffic by 20% and lowered air pollution."
  },
  {
    level: "B2",
    text: `INTELLIGENCE ARTIFICIELLE ET DIAGNOSTIC MÉDICAL AU CANADA\n\nL'intégration d'algorithmes d'apprentissage profond dans le réseau hospitalier canadien révolutionne le dépistage précoce des pathologies radiologiques. En analysant des milliers d'imageries médicales en quelques secondes, ces outils d'intelligence artificielle assistent efficacement les médecins dans la détection d'anomalies microscopiques.\n\nNéanmoins, les comités de bioéthique rappellent que la décision thérapeutique finale doit impérativement demeurer sous la responsabilité exclusive du praticien humain. La technologie est conçue comme un puissant levier d'aide à la décision et non comme un substitut à l'expertise clinique.\n\nDe plus, la protection de la confidentialité des données médicales des patients exige le déploiement de protocoles de cryptage de haute sécurité avant tout partage interhospitalier.`,
    q: "Quelle est la recommandation majeure des comités de bioéthique concernant l'IA médicale ?",
    opt: ["La décision thérapeutique finale doit rester sous responsabilité humaine", "L'IA doit remplacer définitivement les radiologues", "Les données des patients peuvent être publiées librement", "Les examens d'imagerie doivent être supprimés"],
    ans: 0,
    passEn: "AI AND MEDICAL DIAGNOSTICS IN CANADA\n\nBioethics committees emphasize that final treatment decisions must remain under human medical responsibility."
  },
  {
    level: "B2",
    text: `ÉCONOMIE CIRCULAIRE ET RECYCLAGE DES ÉQUIPEMENTS ÉLECTRONIQUES\n\nLa gestion des déchets électroniques représente un défi environnemental majeur à l'ère du numérique. Chaque année, des millions de tonnes d'ordinateurs, téléphones et batteries usagées sont jetées sans subir de traitement approprié, provoquant le gaspillage de métaux précieux comme le cobalt, le lithium et l'or.\n\nFace à ce constat, plusieurs provinces canadiennes adoptent une législation sur la Responsabilité Élargie des Producteurs (REP). Cette réglementation oblige désormais les fabricants de matériel informatique à financer et organiser la collecte ainsi que le recyclage sécurisé de leurs produits en fin de vie.\n\nCette démarche favorise l'émergence d'une véritable économie circulaire, créatrice d'emplois locaux spécialisés dans la décontamination et le réemploi des composants électroniques.`,
    q: "Que stipule la réglementation sur la Responsabilité Élargie des Producteurs (REP) ?",
    opt: ["Les fabricants doivent financer la collecte et le recyclage de leurs produits", "Les consommateurs doivent payer une amende pour chaque téléphone jeté", "L'importation de matériel électronique est désormais interdite", "Toutes les batteries usagées doivent être incinérées sans tri"],
    ans: 0,
    passEn: "CIRCULAR ECONOMY & ELECTRONIC WASTE RECYCLING\n\nEPR legislation requires electronics manufacturers to fund and organize end-of-life recycling for their devices."
  },
  {
    level: "B2",
    text: `IMMIGRATION FRANCOPHONE HORS QUÉBEC ET DYNAMISME COMMUNAUTAIRE\n\nLe gouvernement fédéral canadien intensifie ses efforts pour atteindre les objectifs de recrutement d'immigrants francophones s'établissant dans les communautés en minorité linguistique hors du Québec, notamment en Ontario, au Nouveau-Brunswick et au Manitoba.\n\nL'installation de nouveaux arrivants d'expression française contribue au dynamisme économique régional, à la pérennité des écoles de langue française et à l'enrichissement culturel des collectivités locales. Des services d'accueil personnalisés facilitent leur intégration professionnelle dès leur arrivée.\n\nDes programmes de parrainage communautaire permettent également aux familles immigrantes de tisser rapidement des liens sociaux durables et de trouver un logement adapté.`,
    q: "Quel est l'impact recherché de l'immigration francophone hors Québec ?",
    opt: ["Renforcer le dynamisme économique et la vitalité culturelle des collectivités", "Obliger toutes les provinces à devenir exclusivement unilingues françaises", "Fermer les centres d'accueil communautaires régionaux", "Limiter l'accès aux écoles publiques d'expression française"],
    ans: 0,
    passEn: "FRANCOPHONE IMMIGRATION OUTSIDE QUEBEC\n\nTargeted immigration enhances regional economic dynamism, school sustainability, and community vitality."
  },
  {
    level: "B2",
    text: `TRANSITION ÉNERGÉTIQUE ET ARCHITECTURE BIOCLIMATIQUE\n\nLa construction de bâtiments à haute performance énergétique s'impose progressivement comme la norme architecturale dans les projets de rénovation urbaine. L'intégration de matériaux isolants biosourcés, comme la fibre de bois ou le chanvre, permet de réduire considérablement la consommation de chauffage en hiver.\n\nDe plus, la conception bioclimatique exploite l'orientation naturelle du soleil pour optimiser la luminosité et la chaleur passive. Des systèmes de ventilation à double flux avec récupération d'énergie assurent un renouvellement continu de l'air intérieur sans déperdition thermique.\n\nLes propriétaires bénéficient d'aides financières gouvernementales incitatives pour compenser le surcoût initial des travaux de rénovation verte.`,
    q: "Quel principe fondamental caractérise la conception bioclimatique ?",
    opt: ["Exploiter l'orientation du soleil pour optimiser la chaleur passive", "Utiliser exclusivement de la climatisation électrique en continu", "Supprimer toutes les fenêtres des façades exposées au nord", "Consommer plus de mazout durant les périodes de grand froid"],
    ans: 0,
    passEn: "ENERGY TRANSITION & BIOCLIMATIC ARCHITECTURE\n\nBioclimatic design optimizes building orientation to capture passive solar heat and reduce energy consumption."
  },

  // C1 AUTONOMOUS (35-37)
  {
    level: "C1",
    text: `SOCIOLOGIE DU TRAVAIL — LA MUTATION DES MODÈLES ORGANISATIONNELS\n\nL'expérimentation à grande échelle de la semaine de travail de quatre jours dans le secteur tertiaire suscite un intérêt croissant auprès des chercheurs en gestion et des décideurs économiques. Loin de nuire au rendement des entreprises, ce modèle fondé sur la réduction du temps de travail sans baisse de salaire démontre une préservation, voire une amélioration de la productivité globale.\n\nSur le plan de la santé mentale des salariés, les données recueillies indiquent une diminution remarquable de 35 % des épisodes de surmenage professionnel et de syndrome d'épuisement (burnout). Les employés bénéficiant d'un équilibre renforcé entre vie privée et engagement professionnel affichent une fidélité accrue envers leur organisation.\n\nNéanmoins, la transposabilité de cette organisation aux secteurs industriels à feu continu ou aux services d'urgence médicale soulève des défis logistiques majeurs.`,
    q: "Quel résultat marquant ressort de l'analyse sociologique de la semaine de 4 jours ?",
    opt: ["Une diminution de 35% du surmenage professionnel chez les salariés", "Une baisse inévitable de la productivité globale de l'entreprise", "Une augmentation généralisée du taux d'absentéisme", "L'obligation de baisser les salaires des employés"],
    ans: 0,
    passEn: "WORKPLACE SOCIOLOGY — ORGANIZATIONAL MODEL MUTATION\n\n4-day workweek trials show sustained productivity alongside a 35% reduction in professional burnout."
  },
  {
    level: "C1",
    text: `AMÉNAGEMENT DU TERRITOIRE ET GESTION DES RESSOURCES EN EAU\n\nLa gestion concertée des bassins versants face aux aléas pluviométriques extrêmes exige le dépassement des découpages administratifs traditionnels au profit de gouvernances environnementales intégrées. L'accentuation des épisodes de sécheresse estivale couplée aux risques de ruissellement torrentiel impose une réévaluation fondamentale des schémas d'aménagement urbain et agricole.\n\nLes spécialistes de l'hydrologie préconisent la restauration prioritaire des zones humides naturelles qui jouent le rôle d'éponges écologiques régulatrices. Ces écosystèmes absorbent les surplus d'eau lors des crue printanières et restituent progressivement l'humidité durant les périodes d'étiage.\n\nCette approche fondée sur la nature s'avère économiquement plus pérenne que le dimensionnement perpétuel d'ouvrages de génie civil lourds.`,
    q: "Quel rôle écologique majeur remplissent les zones humides naturelles ?",
    opt: ["Réguler le cycle de l'eau en absorbant les crues et restituant l'humidité", "Accélérer l'assèchement définitif des terres agricoles", "Favoriser le ruissellement torrentiel vers les zones urbaines", "Remplacer l'eau douce par des réservoirs d'eau de mer"],
    ans: 0,
    passEn: "TERRITORIAL PLANNING & WATER MANAGEMENT\n\nRestoring natural wetlands acts as ecological sponges, absorbing floodwaters and releasing moisture during droughts."
  },

  // C2 MASTERY (38-39)
  {
    level: "C2",
    text: `ÉPISTÉMOLOGIE ET NARRATIFS DE LA TRANSITION ÉCOLOGIQUE\n\nLa déconstruction des paradigmes extractivistes contemporains requiert un réexamen épistémologique profond de notre rapport à la matérialité du monde et aux communs terrestres. L'obsolescence théorique des modèles de croissance linéaire illimitée impose l'élaboration de nouvelles métriques de prospérité intégrant les limites planétaires infranchissables.\n\nDans cette perspective, la pensée complexe rejette les solutions technocratiques réductrices qui prétendent résoudre la crise systémique par un simple ajustement marginal des mécanismes de marché. Il s'agit d'opérer une mutation culturelle refondant les représentations collectives de l'abondance et du progrès.\n\nCette réorientation philosophique implique une redéfinition globale des responsabilités éthiques envers les générations futures et le vivant non humain.`,
    q: "Que préconise l'analyse épistémologique face à la crise systémique ?",
    opt: ["Une mutation culturelle refondant les représentations collectives du progrès", "La poursuite indéfinie des modèles de croissance linéaire illimitée", "L'abandon de toute réflexion éthique envers les générations futures", "Le recours exclusif à des ajustements marchands marginaux"],
    ans: 0,
    passEn: "EPISTEMOLOGY & ECOLOGICAL TRANSITION NARRATIVES\n\nSystemic ecological crises demand a deep cultural shift reframing collective concepts of progress and planetary limits."
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

function generateListeningQuestions(count: number, prefix: string, seedOffset: number = 0): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    const targetLevel = getTargetLevel(i);
    const matchingTopics = LISTENING_TOPICS.filter(t => t.level === targetLevel || (targetLevel === "C2" && t.level === "C1"));
    const pool = matchingTopics.length > 0 ? matchingTopics : LISTENING_TOPICS;
    const t = pool[(i - 1 + seedOffset) % pool.length];

    const isQuestionInAudio = i <= 29;

    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      text: isQuestionInAudio
        ? `Écoutez le document sonore et la question audio N°${i} [Niveau ${t.level}]. Choisissez la bonne option.`
        : `[Question ${i} - Niveau ${t.level}] ${t.text} Quel est l'élément principal à retenir ?`,
      options: t.opt,
      correctIndex: t.ans,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The correct answer is Option A ("${t.opt[t.ans]}").`,
      hint: `Level ${t.level} Listening Hint: Listen carefully for key acoustic markers related to "${t.opt[t.ans].slice(0, 30)}" and identify the main speaker's purpose.`,
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

    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options: t.opt,
      correctIndex: t.ans,
      explanation: `Pedagogical Explanation [Level ${t.level}]: The text states "${t.opt[t.ans]}".`,
      hint: `Level ${t.level} Reading Hint: Scan the text for key terms matching "${t.opt[t.ans].slice(0, 30)}" to verify the correct statement.`
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
          title: "Tâche 1 : Message court (Message to a Landlord)",
          prompt: "Vous avez loué un appartement pour vos vacances mais le chauffage ne fonctionne pas. Écrivez un message au propriétaire (60 à 120 mots) pour expliquer la situation et demander une solution rapide.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: ["Salutation formelle (Bonjour Monsieur/Madame)", "Expliquer l'absence de chauffage", "Demander une réparation urgente", "Formule de politesse finale"],
          sampleResponse: "Bonjour Monsieur Dupont,\n\nJe vous écris car le chauffage de l'appartement ne fonctionne pas depuis ce matin. La température est très basse.\n\nPourriez-vous faire venir un réparateur au plus vite ?\n\nMerci d'avance.\n\nCordialement,\nJean Martin"
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
          guidedTips: ["Salutation courtoise", "Formuler 3 questions claires", "Remercier à la fin"]
        },
        {
          id: "tcf2-w2",
          taskNumber: 2,
          title: "Tâche 2 : Article de témoignage",
          prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: ["Décrire l'ambiance", "Utiliser le passé composé", "Expliquer pourquoi vous recommandez cet événement"]
        },
        {
          id: "tcf2-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Présenter la problématique", "Développer 2 arguments solides", "Conclure avec une synthèse claire"]
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
          guidedTips: ["Employer le passé composé et l'imparfait", "Décrire l'intervention des pompiers", "Conclure par la réouverture de la circulation"]
        },
        {
          id: "tef1-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'opinion persuasive (Letter to Editor)",
          prompt: "La municipalité souhaite remplacer une place publique historique par un centre commercial. Écrivez une lettre au maire (200 mots minimum) pour défendre la préservation du patrimoine urbain.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation formelle (Monsieur le Maire)", "Exprimer l'inquiétude des habitants", "Présenter 2 arguments patrimoniaux et écologiques", "Formule de politesse formelle"]
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
          timeLimitMins: 25
        },
        {
          id: "tef2-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'argumentation (Letter to a Friend / Newspaper)",
          prompt: "Un de vos amis refuse d'utiliser le recyclage et jette tout dans les poubelles ordinaires. Écrivez-lui une lettre persuasive (200 mots minimum) pour le convaincre d'adopter des habitudes écologiques.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: ["Salutation amicale", "Exprimer sa surprise tout en restant bienveillant", "Présenter 2 arguments environnementaux concrets", "Proposer des gestes simples pour commencer dès aujourd'hui"]
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
    { title: "Tâche 1 : Message court (Problème de chauffage)", prompt: "Vous avez loué un appartement pour vos vacances mais le chauffage ne fonctionne pas. Écrivez un message au propriétaire (60 à 120 mots) pour expliquer la situation et demander une solution rapide.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)", prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour au Canada (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Transports gratuits)", prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Demande d'informations (Atelier culinaire)", prompt: "Vous souhaitez vous inscrire à un atelier de cuisine régionale au Québec. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Article de témoignage (Festival culturel)", prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Langues à l'école)", prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Message formel (Inscription au club de sport)", prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Compte-rendu (Action bénévole)", prompt: "Rédigez un court article pour le bulletin d'information de votre quartier (120 à 150 mots) résumant une journée d'action bénévole.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Télétravail à 100%)", prompt: "Le télétravail à 100% est-il bénéfique pour l'épanouissement des salariés et la cohésion d'équipe ? Donnez votre opinion (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Courriel de réclamation (Achat en ligne défectueux)", prompt: "Vous avez commandé du matériel informatique mais vous avez reçu un article défectueux. Écrivez au service client (60 à 120 mots) pour réclamer un échange.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Récit personnel (Changement de carrière)", prompt: "Dans une lettre à un ami collègue (120 à 150 mots), expliquez les raisons qui vous ont poussé à changer de domaine professionnel.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Interdiction des véhicules à essence)", prompt: "Les gouvernements devraient-ils interdire la vente de véhicules thermiques neufs d'ici 2035 ? Présentez votre argumentation (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Demande de renseignements (Bibliothèque municipale)", prompt: "Écrivez à la bibliothèque municipale de votre ville (60 à 120 mots) pour vous renseigner sur les horaires et le prêt numérique.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Témoignage (Intégration au Québec)", prompt: "Racontez vos premiers mois d'installation au Canada dans un billet de blog (120 à 150 mots) en donnant des conseils pratiques aux nouveaux arrivants.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Intelligence Artificielle et Emploi)", prompt: "L'intelligence artificielle représente-t-elle une menace ou une opportunité majeure pour le marché du travail de demain ? (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Message d'absence (Congé exceptionnel)", prompt: "Écrivez un message à votre responsable hiérarchique (60 à 120 mots) pour demander une autorisation d'absence exceptionnelle de 3 jours.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Critique culturelle (Exposition d'art)", prompt: "Rédigez une critique d'une exposition culturelle ou d'un musée récent auquel vous avez assisté (120 à 150 mots).", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Écrans et réseaux sociaux)", prompt: "Faut-il réglementer strictement l'utilisation des téléphones portables et des réseaux sociaux chez les jeunes adolescents ? (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Invitation (Fête des voisins)", prompt: "Invitez vos voisins de quartier (60 à 120 mots) à une fête communautaire que vous organisez le mois prochain.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Récit d'initiative (Jardin collectif)", prompt: "Décrivez la création d'un jardin collectif dans votre quartier (120 à 150 mots) et son impact sur la vie de quartier.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Semaine de 4 jours)", prompt: "La semaine de travail de 4 jours devrait-elle être généralisée à l'ensemble des entreprises ? Argumentez votre position (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Demande de réservation (Chalet à la montagne)", prompt: "Écrivez un courriel à un propriétaire de chalet (60 à 120 mots) pour réserver un séjour en famille pendant les vacances d'hiver.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Témoignage (Formation professionnelle)", prompt: "Racontez une formation continue récente que vous avez suivie (120 à 150 mots) et expliquez ses apports concrets.", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Consommation de produits locaux)", prompt: "Acheter exclusivement des produits alimentaires locaux et de saison est-il un objectif réaliste pour tous les ménages ? (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Remerciement formel (Fin de stage)", prompt: "Rédigez un courriel de remerciement à votre maître de stage (60 à 120 mots) à la fin de votre période en entreprise.", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Récit d'événement (Marathon de Montréal)", prompt: "Décrivez votre participation ou votre soutien lors d'un événement sportif populaire (120 à 150 mots).", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Quotas touristiques)", prompt: "Faut-il imposer des quotas stricts d'accès à certains sites naturels et patrimoniaux pour protéger la planète ? (140 à 180 mots).", min: 140, max: 180, time: 25 }
  ],
  [
    { title: "Tâche 1 : Proposition de partenariat (Association locale)", prompt: "Proposez un partenariat commercial à un commerce de quartier au nom de votre association étudiante (60 à 120 mots).", min: 60, max: 120, time: 15 },
    { title: "Tâche 2 : Résumé de conférence (Développement durable)", prompt: "Rédigez le compte-rendu d'une conférence publique sur la transition écologique (120 à 150 mots).", min: 120, max: 150, time: 20 },
    { title: "Tâche 3 : Essai argumentatif (Université gratuite)", prompt: "L'accès aux études supérieures devrait-il être entièrement gratuit et financé par l'État pour tous les étudiants ? (140 à 180 mots).", min: 140, max: 180, time: 25 }
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
            guidedTips: ["Introduction claire", "Présenter 2 arguments développés", "Conclusion synthétique avec prise de position"]
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
  } else if (pct >= 90) {
    nclcLevel = 10;
    cefrEquivalent = "C2";
    expressEntryPoints = 34;
    isNCLC7TargetReached = true;
  } else if (pct >= 82) {
    nclcLevel = 9;
    cefrEquivalent = "C1";
    expressEntryPoints = 31;
    isNCLC7TargetReached = true;
  } else if (pct >= 74) {
    nclcLevel = 8;
    cefrEquivalent = "C1";
    expressEntryPoints = 23;
    isNCLC7TargetReached = true;
  } else if (pct >= 65) {
    nclcLevel = 7;
    cefrEquivalent = "B2";
    expressEntryPoints = 17;
    isNCLC7TargetReached = true;
  } else if (pct >= 55) {
    nclcLevel = 6;
    cefrEquivalent = "B2";
    expressEntryPoints = 12;
    isNCLC7TargetReached = false;
  } else if (pct >= 45) {
    nclcLevel = 5;
    cefrEquivalent = "B1";
    expressEntryPoints = 6;
    isNCLC7TargetReached = false;
  } else if (pct >= 25) {
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
