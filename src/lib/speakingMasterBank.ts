/**
 * 🇨🇦 FrancPrep Master Authentic Speaking Bank
 * Official France Éducation International (FEI) TCF Canada Standard
 * 30 Authentic Tasks across Papers 1 to 10 (Tâche 1, Tâche 2, Tâche 3)
 */

export interface MasterSpeakingTask {
  id: string;
  paperNumber: number;
  taskNumber: 1 | 2 | 3;
  title: string;
  titleEn: string;
  cefrTarget: "A1-B1" | "B1-C1" | "B2-C2";
  scenario: string;
  scenarioEn: string;
  stimulusDocument?: {
    title: string;
    category: string;
    organization: string;
    content: string;
    details: string[];
    contactInfo: string;
  };
  examinerPersona: {
    name: string;
    role: string;
    gender: "female" | "male";
    openingPromptFrench: string;
    openingPromptEnglish: string;
    followUpCounterQuestion?: string;
  };
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases: string[];
  recommendedConnectors: string[];
  modelAnswerB2C1: string;
  modelAnswerEn: string;
  trapAlert: string;
  trapAlertEn: string;
  speakingCoach: string;
  speakingCoachEn: string;
}

export const MASTER_SPEAKING_BANK: Record<number, MasterSpeakingTask[]> = {
  1: [
    {
      id: "tcf1-spk-1",
      paperNumber: 1,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Présentation & Projet Canadien",
      titleEn: "Task 1: Directed Interview — Personal Background & Canadian Plans",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur. Parlez de votre formation, de votre parcours professionnel actuel, de votre vie quotidienne et des motivations qui vous poussent à vous installer au Canada.",
      scenarioEn: "Introduce yourself to the examiner. Talk about your educational background, current professional career, daily life, and your motivations for moving to Canada.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Certifiée France Éducation International",
        gender: "female",
        openingPromptFrench: "Bonjour et bienvenue à votre épreuve d'expression orale du TCF Canada. Pour commencer cette première tâche, pouvez-vous vous présenter, me parler de votre profession et m'expliquer ce qui vous motive à vous installer au Canada ?",
        openingPromptEnglish: "Hello and welcome to your TCF Canada oral examination. To begin this first task, could you please introduce yourself, tell me about your profession, and explain what motivates you to move to Canada?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: [
        "Je m'appelle...",
        "Je suis diplômé(e) en...",
        "J'exerce actuellement le métier de...",
        "Ce qui m'attire tout particulièrement au Canada, c'est...",
        "Je prépare mon installation depuis plusieurs mois afin de..."
      ],
      recommendedConnectors: ["actuellement", "de plus", "c'est pourquoi", "en effet", "par ailleurs"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Alex et je suis ravi d'être ici aujourd'hui. Je suis titulaire d'un diplôme d'ingénieur logiciel obtenu à l'université, et j'exerce ce métier depuis maintenant cinq ans au sein d'une entreprise technologique. Dans mon quotidien, je conçois des applications web et je collabore étroitement avec des équipes pluridisciplinaires.

En dehors de mon activité professionnelle, je suis passionné de randonnée en plein air et de lecture, ce qui me permet de maintenir un équilibre de vie sain.

Ce qui me motive profondément à m'installer au Canada, c'est avant tout le dynamisme exceptionnel du secteur des technologies à Montréal et à Toronto, ainsi que la qualité de vie reconnue du pays. De plus, les valeurs d'inclusivité, de multiculturalisme et le cadre bilingue correspondent parfaitement à mes aspirations personnelles et professionnelles. C'est pourquoi je souhaite m'établir durablement au Canada avec ma famille.`,
      modelAnswerEn: `Hello. My name is Alex and I am delighted to be here today. I hold a degree in software engineering and have been working in this field for five years now within a technology company. In my daily work, I design web applications and collaborate closely with cross-functional teams.

Outside of work, I am passionate about outdoor hiking and reading, which helps me maintain a healthy work-life balance.

What deeply motivates me to move to Canada is primarily the exceptional dynamism of the tech sector in Montreal and Toronto, as well as the country's renowned quality of life. Furthermore, Canada's values of inclusivity, multiculturalism, and bilingual environment perfectly align with my personal and professional aspirations. That is why I wish to permanently settle in Canada with my family.`,
      trapAlert: "• Ne donnez pas de réponses monosyllabiques d'un seul mot.\n• N'attendez pas que l'examinateur vous relance : enchaînez naturellement votre présentation.\n• Variez les temps verbaux (présent, passé composé, futur proche).",
      trapAlertEn: "• Avoid one-word answers.\n• Do not wait for the examiner to prompt you; deliver a smooth, continuous self-introduction.\n• Use a variety of tenses (present, passé composé, future).",
      speakingCoach: "Structurez votre réponse en 4 temps : 1. Identité et formation 2. Expérience professionnelle 3. Centres d'intérêt 4. Projet précis au Canada.",
      speakingCoachEn: "Structure your response in 4 steps: 1. Identity & education 2. Career experience 3. Hobbies 4. Specific plans in Canada."
    },
    {
      id: "tcf1-spk-2",
      paperNumber: 1,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Inscription à l'Institut Linguistique de Montréal",
      titleEn: "Task 2: Interactive Role-Play — Enrolling in the Montreal Language Institute",
      cefrTarget: "B1-C1",
      scenario: "Vous avez vu une annonce pour des cours intensifs de perfectionnement en français des affaires à Montréal. Vous téléphonez au responsable pour poser au moins 8 à 10 questions précises sur les horaires, les tarifs, le niveau requis et les modalités pédagogiques.",
      scenarioEn: "You saw an advertisement for intensive business French immersion courses in Montreal. You call the coordinator to ask at least 8 to 10 specific questions regarding schedules, fees, entry requirements, and teaching methods.",
      stimulusDocument: {
        title: "INSTITUT LINGUISTIQUE INTERNATIONAL DE MONTRÉAL",
        category: "Formation Professionnelle & Perfectionnement",
        organization: "Institut Linguistique Montréal (Agréé FEI & Ministère de l'Immigration)",
        content: "Sessions intensives de français professionnel et préparation aux examens officiels. Groupes réduits (max 10 apprenants). Cours en présentiel au centre-ville ou formule hybride interactive.",
        details: [
          "📅 Sessions : Début chaque lundi, sessions de 4 à 12 semaines",
          "⏰ Horaires : Du lundi au vendredi (9h00 - 13h00 ou 18h00 - 21h00)",
          "💰 Tarifs : 380 $ CAD / semaine (Matériel pédagogique inclus)",
          "💻 Options : Ateliers de rédaction professionnelle et simulations d'entretien",
          "🎓 Attestation officielle remise en fin de cursus"
        ],
        contactInfo: "📍 1250 Boulevard René-Lévesque Ouest, Montréal • 📞 514-555-0192 • ✉️ admission@institut-montreal.qc.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Directeur des Admissions — Institut Linguistique de Montréal",
        gender: "male",
        openingPromptFrench: "Bonjour ! Institut Linguistique de Montréal, Laurent Dubois au téléphone. Je vous remercie de votre intérêt pour notre programme intensif. Quelles sont vos questions concernant nos formations ?",
        openingPromptEnglish: "Hello! Montreal Language Institute, Laurent Dubois speaking. Thank you for your interest in our intensive program. What questions do you have regarding our courses?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Pourriez-vous me préciser si...",
        "Est-il nécessaire de passer un test de niveau préalable ?",
        "Quels sont les modes de paiement acceptés ?",
        "Proposez-vous des facilités de paiement ou des bourses ?",
        "Dans l'hypothèse où je manquerais un cours, est-il possible de le rattraper ?"
      ],
      recommendedConnectors: ["d'ailleurs", "par ailleurs", "en ce qui concerne", "serait-il possible", "qu'en est-il de"],
      modelAnswerB2C1: `— Bonjour Monsieur Dubois. Je vous appelle car votre annonce pour les cours intensifs de français professionnel a retenu toute mon attention. J'aurais plusieurs questions précises à vous poser.
— Tout d'abord, pourriez-vous me préciser si un test de positionnement est obligatoire avant le premier cours pour évaluer mon niveau ?
— Très bien. Concernant les horaires, la formule du soir entre 18h et 21h est-elle disponible toute l'année, y compris pendant la période estivale ?
— Parfait. Qu'en est-il du nombre maximal d'étudiants par classe ? Garantissez-vous que les effectifs ne dépassent pas 10 personnes ?
— C'est une excellente nouvelle. J'aimerais également savoir si les supports de cours et les manuels sont intégralement inclus dans les frais de 380 $ par semaine.
— Proposez-vous une réduction tarifaire si je m'engage sur une durée de 12 semaines complètes ?
— Est-il possible d'effectuer une séance d'essai gratuite avant de finaliser l'inscription ?
— Enfin, dans le cas où j'aurais un impératif professionnel, quelles sont vos conditions d'annulation ou de report ?`,
      modelAnswerEn: `— Hello Mr. Dubois. I am calling because your advertisement for intensive professional French courses caught my full attention. I have several specific questions to ask you.
— First of all, could you specify whether a placement test is mandatory before the first class to evaluate my level?
— Great. Regarding schedules, is the evening option between 6 PM and 9 PM available year-round, including during the summer period?
— Perfect. What about the maximum number of students per class? Do you guarantee class sizes do not exceed 10 people?
— That is excellent news. I would also like to know if learning materials and textbooks are fully included in the $380 per week fee.
— Do you offer a tuition discount if I commit to a full 12-week program?
— Is it possible to attend a free trial session before finalizing registration?
— Finally, in case of a professional conflict, what are your cancellation or postponement policies?`,
      trapAlert: "• Vous devez poser au minimum 8 à 10 questions variées : ne laissez pas l'examinateur mener l'entretien.\n• Variez vos structures interrogatives (inversion, 'est-ce que', conditionnel de politesse).\n• N'utilisez pas le tutoiement ('tu') avec un responsable.",
      trapAlertEn: "• You must ask at least 8 to 10 varied questions; do not let the examiner dominate the dialogue.\n• Vary question formats (inversion, conditional politeness).\n• Always use formal 'vous'.",
      speakingCoach: "Alternez questions pratiques (prix, horaires, localisation) et questions qualitatives (méthode, effectifs, diplôme, annulation).",
      speakingCoachEn: "Alternate between practical inquiries (prices, hours, location) and qualitative questions (teaching method, class size, certification, refund policy)."
    },
    {
      id: "tcf1-spk-3",
      paperNumber: 1,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — L'Intelligence Artificielle dans l'Éducation",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Artificial Intelligence in Education",
      cefrTarget: "B2-C2",
      scenario: "L'intégration croissante des outils d'intelligence artificielle dans l'enseignement scolaire et universitaire suscite de vifs débats. Présentez un exposé structuré et nuancé sur les opportunités et les risques de l'IA pour l'apprentissage, puis défendez votre position face aux questions de l'examinateur.",
      scenarioEn: "The growing integration of artificial intelligence tools in school and university education sparks intense debate. Present a structured, nuanced argument on the opportunities and risks of AI in learning, then defend your position against examiner counter-questions.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior TCF Canada",
        gender: "female",
        openingPromptFrench: "Voici votre sujet de société pour cette troisième tâche : 'L'intelligence artificielle représente-t-elle une opportunité majeure ou un danger pour l'avenir de l'éducation ?' Vous disposez d'environ 4 minutes et demie pour exposer votre analyse argumentée. Je vous écoute.",
        openingPromptEnglish: "Here is your societal topic for this third task: 'Does artificial intelligence represent a major opportunity or a danger for the future of education?' You have about 4.5 minutes to present your argued analysis. I am listening.",
        followUpCounterQuestion: "Certes, mais ne craignez-vous pas que l'usage systématique de l'IA n'atrophie l'esprit critique et les capacités de réflexion autonome des élèves ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: [
        "Ce sujet soulève une problématique centrale...",
        "D'un côté, il est indéniable que...",
        "Toutefois, il convient de souligner les dérives potentielles...",
        "Force est de constater que...",
        "En somme, la solution réside dans un encadrement pédagogique équilibré..."
      ],
      recommendedConnectors: ["indéniablement", "d'une part", "d'autre part", "toutefois", "néanmoins", "par conséquent", "en guise de conclusion"],
      modelAnswerB2C1: `L'irruption fulgurante des technologies d'intelligence artificielle au sein du système éducatif constitue indéniablement l'un des débats les plus cruciaux de notre époque. Si certains observateurs y voient une révolution émancipatrice, d'autres redoutent une détérioration des apprentissages fondamentaux.

D'une part, force est de reconnaître que l'intelligence artificielle offre des opportunités pédagogiques sans précédent. Elle permet notamment une personnalisation poussée des parcours scolaires : chaque apprenant peut progresser à son propre rythme grâce à des exercices adaptatifs et des rétroactions instantanées. De surcroît, pour les enseignants, l'automatisation des tâches administratives répétitives libère un temps précieux pour un accompagnement humain et personnalisé.

Toutefois, il convient de nuancer cet enthousiasme en examinant les risques majeurs associés à cette technologie. Le premier écueil réside dans la dépendance intellectuelle : si les élèves s'en remettent aveuglément à des générateurs de texte, ils risquent d'affaiblir leur esprit critique, leur mémoire de travail et leur capacité de raisonnement autonome. Par ailleurs, la question de la véracité des données et des biais algorithmiques pose un véritable défi éthique.

En conclusion, je suis convaincu que l'intelligence artificielle ne doit être ni diabolisée ni adoptée sans discernement. Elle doit constituer un outil d'assistance au service du pédagogue, et non un substitut à la réflexion humaine. La clé réside dans l'éducation aux médias et le renforcement de l'esprit critique dès le plus jeune âge.`,
      modelAnswerEn: `The sudden surge of artificial intelligence technologies within education undeniably constitutes one of the most crucial debates of our time. While some observers view it as an emancipatory revolution, others fear a deterioration of foundational learning.

On the one hand, one must recognize that artificial intelligence offers unprecedented pedagogical opportunities. It enables deep personalization of learning paths: every student can progress at their own pace thanks to adaptive exercises and instantaneous feedback. Moreover, for educators, the automation of repetitive administrative tasks frees up valuable time for personalized human mentoring.

However, one must nuance this enthusiasm by examining the major risks associated with this technology. The primary pitfall lies in intellectual dependency: if students rely blindly on text generators, they risk weakening their critical thinking, working memory, and capacity for autonomous reasoning. Furthermore, data accuracy and algorithmic biases pose a genuine ethical challenge.

In conclusion, I am convinced that artificial intelligence should neither be demonized nor adopted uncritically. It must serve as an assistant tool for educators, rather than a substitute for human reflection. The key lies in media literacy and cultivating critical thinking from an early age.`,
      trapAlert: "• Ne donnez pas un avis tranché en une seule phrase : vous devez obligatoirement adopter une démarche dialectique (Thèse / Antithèse / Synthèse).\n• Utilisez un registre soutenu (évitez les 'trucs', 'choses', 'c'est cool').\n• N'omettez pas la conclusion finale.",
      trapAlertEn: "• Do not give a simplistic one-sided view; you must adopt a balanced dialectic approach (Thesis / Antithesis / Synthesis).\n• Use advanced formal vocabulary.\n• Always provide a clear concluding synthesis.",
      speakingCoach: "Suivez le plan canonique : 1. Accroche et définition du problème 2. Arguments favorables étayés 3. Limites et contre-arguments 4. Synthèse et prise de position personnelle.",
      speakingCoachEn: "Follow the standard blueprint: 1. Hook & problem definition 2. Favorable arguments with examples 3. Limitations & objections 4. Final synthesis & personal stance."
    }
  ],

  2: [
    {
      id: "tcf2-spk-1",
      paperNumber: 2,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Métier & Habitudes de Vie",
      titleEn: "Task 1: Directed Interview — Career & Daily Routine",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en mettant l'accent sur votre routine quotidienne, votre environnement professionnel et votre ville de résidence actuelle.",
      scenarioEn: "Introduce yourself to the examiner emphasizing your daily routine, your professional working environment, and your current city of residence.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Agréé FEI",
        gender: "male",
        openingPromptFrench: "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter, me décrire une journée type dans votre travail et me parler de votre ville actuelle ?",
        openingPromptEnglish: "Hello! Welcome to your oral exam. Could you introduce yourself, describe a typical working day, and talk about your current city?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je vis actuellement à...", "Mes responsabilités principales consistent à...", "Dans une journée typique, je...", "Ce que j'apprécie particulièrement..."],
      recommendedConnectors: ["habituellement", "en règle générale", "ensuite", "de surcroît"],
      modelAnswerB2C1: `Bonjour Monsieur. Je m'appelle Sarah et je vis actuellement à Lyon. Je travaille en tant que cheffe de projet marketing au sein d'une entreprise internationale.

Dans une journée type, je commence par animer la réunion d'équipe du matin afin de coordonner les priorités de la journée. Ensuite, je consacre mon temps à l'analyse des données de performance et à la conception de campagnes promotionnelles. Ce que j'apprécie particulièrement dans mon travail, c'est la diversité des défis et l'interaction constante avec des professionnels d'horizons variés.

En fin de journée, j'aime pratiquer la course à pied le long des quais du Rhône ou découvrir les richesses culturelles de Lyon. Mon projet est d'apporter cette expérience et ce dynamisme au marché canadien.`,
      modelAnswerEn: `Hello. My name is Sarah and I currently live in Lyon. I work as a marketing project manager in an international company.

On a typical day, I start by leading our morning team briefing to coordinate the day's priorities. Then, I dedicate time to analyzing performance data and designing promotional campaigns. What I particularly appreciate in my job is the diversity of challenges and continuous interaction with diverse professionals.

At the end of the day, I enjoy jogging along the Rhône riverbanks or exploring Lyon's cultural heritage. My goal is to bring this experience and energy to the Canadian job market.`,
      trapAlert: "• Évitez de réciter un texte mémorisé sur un ton monocorde.\n• Répondez précisément aux trois volets demandés (identité, routine, ville).",
      trapAlertEn: "• Do not recite a memorized text in a monotone voice.\n• Cover all three requested topics (identity, routine, city).",
      speakingCoach: "Maintenez un débit fluide et naturel, avec des liaisons correctes.",
      speakingCoachEn: "Maintain a natural conversational cadence with proper French liaisons."
    },
    {
      id: "tcf2-spk-2",
      paperNumber: 2,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Location d'un Éco-Appartement à Québec",
      titleEn: "Task 2: Interactive Role-Play — Renting an Eco-Apartment in Quebec City",
      cefrTarget: "B1-C1",
      scenario: "Vous cherchez un logement durable à Québec pour votre installation. Vous appelez le propriétaire d'un appartement écologique pour lui poser au moins 8 à 10 questions précises sur le bail, l'isolation, les charges, le stationnement et les transports en commun.",
      scenarioEn: "You are looking for sustainable housing in Quebec City. You call the landlord of an eco-friendly apartment to ask 8 to 10 detailed questions regarding the lease, insulation, utility charges, parking, and transit.",
      stimulusDocument: {
        title: "RÉSIDENCE ÉCO-LOGIS SAINT-ROCH (QUÉBEC)",
        category: "Location Résidentielle Éco-Responsable",
        organization: "Gestion Immobilière Durable Québec",
        content: "Magnifique 4 ½ lumineux entièrement rénové selon les normes écologiques LEED. Isolation thermique renforcée, fenêtres triple vitrage, électroménagers basse consommation et balcon végétalisé.",
        details: [
          "💰 Loyer : 1 450 $ CAD / mois (Chauffage géothermique et eau chaude inclus)",
          "🚗 Stationnement : Emplacement extérieur avec borne de recharge électrique (50 $/mois)",
          "🚲 Espace vélo sécurisé et local de rangement inclus",
          "🚌 Transports : Arrêt Métrobus 800 et 801 au pied de l'immeuble (10 min du Vieux-Québec)",
          "📅 Disponibilité : 1er du mois prochain • Bail de 12 mois minimum"
        ],
        contactInfo: "📍 450 Rue Saint-Joseph Est, Québec (QC) • 📞 418-555-0144 • ✉️ location@ecologis-quebec.ca"
      },
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Propriétaire Bailleur — Résidence Éco-Logis",
        gender: "male",
        openingPromptFrench: "Bonjour ! Thomas Laurent à l'appareil, propriétaire de l'appartement du quartier Saint-Roch. Je vous écoute, quelles sont vos questions ?",
        openingPromptEnglish: "Hello! Thomas Laurent speaking, owner of the Saint-Roch apartment. What questions do you have for me?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Pourriez-vous me confirmer le montant exact des charges ?",
        "Les animaux de compagnie sont-ils autorisés dans l'immeuble ?",
        "Le chauffage géothermique est-il réglable individuellement ?",
        "Quelle est l'orientation de l'appartement ?",
        "Quels documents demandez-vous pour constituer le dossier de candidature ?"
      ],
      recommendedConnectors: ["concernant", "en ce qui a trait à", "par ailleurs", "serait-il envisageable"],
      modelAnswerB2C1: `— Bonjour Monsieur Laurent. Je vous contacte concernant votre annonce pour l'appartement LEED dans le quartier Saint-Roch.
— Pourriez-vous tout d'abord me confirmer si l'appartement est orienté au sud et bénéficie d'un bon ensoleillement ?
— Très bien. Concernant le chauffage géothermique inclus dans le loyer, chaque pièce dispose-t-elle de son propre thermostat indépendant ?
— C'est parfait. J'ai une voiture électrique : la borne de recharge est-elle dédiée ou partagée avec d'autres locataires ?
— Qu'en est-il du niveau sonore du quartier, notamment en soirée ?
— Les animaux de compagnie, comme un petit chat, sont-ils acceptés ?
— Quelles sont les garanties financières et pièces justificatives nécessaires pour le dossier ?
— Enfin, serait-il envisageable d'organiser une visite en présentiel ou par vidéo dès cette fin de semaine ?`,
      modelAnswerEn: `— Hello Mr. Laurent. I am contacting you regarding your listing for the LEED apartment in Saint-Roch.
— First, could you confirm whether the apartment faces south and gets plenty of sunlight?
— Great. Regarding the geothermal heating included in rent, does each room have its own independent thermostat?
— That's perfect. I have an electric car: is the charging station dedicated or shared?
— What about noise levels in the neighborhood, especially in the evening?
— Are pets, such as a small cat, permitted?
— What financial guarantees and documents do you require for the application?
— Finally, would it be possible to schedule a visit in person or via video this weekend?`,
      trapAlert: "• N'oubliez pas d'aborder les aspects spécifiques du document (géothermie, borne, bail).\n• Évitez de vous répéter.",
      trapAlertEn: "• Don't forget to address specific details in the document (geothermal heating, charger, lease).\n• Avoid repetitive phrasing.",
      speakingCoach: "Préparez vos questions par thèmes pendant les 2 minutes : 1. Confort intérieur 2. Énergie 3. Services 4. Démarches administratives.",
      speakingCoachEn: "Organize questions by themes during prep time: 1. Interior comfort 2. Utilities 3. Amenities 4. Paperwork."
    },
    {
      id: "tcf2-spk-3",
      paperNumber: 2,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — Le Télétravail Généralisé",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Widespread Remote Work",
      cefrTarget: "B2-C2",
      scenario: "Le recours massif au travail à distance transforme profondément l'économie et la vie des salariés. Présentez un discours dialectique sur les avantages et les inconvénients du télétravail pour les travailleurs et les entreprises.",
      scenarioEn: "The widespread adoption of remote work deeply transforms the economy and employee lifestyles. Present a dialectic argument on the pros and cons of teleworking for workers and companies.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Senior FEI",
        gender: "male",
        openingPromptFrench: "Voici votre sujet : 'Le télétravail à 100 % représente-t-il l'avenir du travail ou une menace pour la cohésion d'équipe et la productivité ?' Présentez votre argumentation.",
        openingPromptEnglish: "Here is your topic: 'Does 100% remote work represent the future of employment or a threat to team cohesion and productivity?' Present your argument.",
        followUpCounterQuestion: "Mais ne pensez-vous pas que l'isolement professionnel freine l'innovation spontanée qui naît autour de la machine à café ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'essor du travail à distance...", "Sur le plan individuel...", "Néanmoins, sur le plan collectif...", "La formule hybride s'impose comme..."],
      recommendedConnectors: ["d'un côté", "en contrepartie", "il n'en demeure pas moins", "en définitive"],
      modelAnswerB2C1: `La généralisation du télétravail constitue sans doute l'une des mutations sociétales les plus profondes de cette dernière décennie.

D'un point de vue individuel, le travail à domicile offre des gains considérables en matière de qualité de vie. La suppression des temps de transport quotidiens réduit le stress et l'empreinte carbone, tout en offrant une flexibilité précieuse pour concilier vie personnelle et engagements professionnels. Pour les entreprises, cela permet également de recruter des talents sans contrainte géographique.

Néanmoins, le télétravail exclusif comporte des dérives non négligeables. L'effritement du sentiment d'appartenance et la diminution des interactions informelles nuisent à la créativité collective. De plus, la frontière floue entre vie privée et vie professionnelle expose certains salariés au surmenage.

En définitive, je préconise un modèle hybride équilibré de deux à trois jours en présentiel, permettant d'allier autonomie individuelle et synergie collective.`,
      modelAnswerEn: `The generalization of teleworking is arguably one of the most profound societal shifts of this past decade.

From an individual standpoint, working from home provides significant quality-of-life benefits. Eliminating daily commuting reduces stress and carbon footprints while offering flexibility to balance personal life and career. For employers, it enables recruiting talent regardless of geography.

However, exclusive remote work carries notable drawbacks. The erosion of team belonging and loss of informal interactions harm collective creativity. Furthermore, blurred boundaries between personal and work life expose employees to burnout.

Ultimately, I advocate for a balanced hybrid model of two to three days in the office, combining individual autonomy with collective synergy.`,
      trapAlert: "• Évitez de présenter une réponse purement négative ou purement positive.\n• Proposez une solution de synthèse nuancée.",
      trapAlertEn: "• Do not present a purely positive or negative response.\n• Propose a nuanced synthetic resolution.",
      speakingCoach: "Mobilisez des connecteurs logiques de haut niveau (certes, néanmoins, force est d'admettre).",
      speakingCoachEn: "Use advanced logical connectors to structure the transition between points."
    }
  ],

  3: [
    {
      id: "tcf3-spk-1",
      paperNumber: 3,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Voyages & Expériences Culturelles",
      titleEn: "Task 1: Directed Interview — Travel & Cultural Experiences",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en évoquant un voyage marquant que vous avez réalisé, ce que cette expérience vous a apporté et vos attentes culturelles au Canada.",
      scenarioEn: "Introduce yourself to the examiner by discussing a memorable trip you took, what you learned from it, and your cultural expectations in Canada.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Certifiée FEI",
        gender: "female",
        openingPromptFrench: "Bonjour ! Pour cette première partie, présentez-vous et racontez-moi une expérience de voyage marquante qui a enrichi votre vision du monde.",
        openingPromptEnglish: "Hello! For this first part, introduce yourself and tell me about a memorable travel experience that enriched your worldview."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "Il y a quelques années, j'ai eu la chance de...", "Cette expérience m'a appris à...", "J'ai hâte de découvrir..."],
      recommendedConnectors: ["notamment", "grâce à cela", "par la suite", "ainsi"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Julien et je travaille dans le domaine de la logistique.

Il y a trois ans, j'ai eu l'opportunité d'effectuer un séjour immersif de trois mois en Amérique latine. Ce voyage a été un véritable tournant personnel car il m'a appris à m'adapter rapidement à des environnements inconnus et à communiquer avec des personnes aux parcours très divers.

Cette expérience a développé mon ouverture d'esprit et ma résilience, deux atouts essentiels pour mon projet d'immigration au Canada, où la diversité culturelle et les grands espaces m'inspirent énormément.`,
      modelAnswerEn: `Hello. My name is Julien and I work in logistics.

Three years ago, I had the opportunity to spend three immersive months traveling in Latin America. That trip was a true personal turning point because it taught me to adapt quickly to unfamiliar settings and communicate with people from diverse backgrounds.

This experience fostered my open-mindedness and resilience, two essential qualities for my immigration project to Canada, where cultural diversity and wide open spaces inspire me immensely.`,
      trapAlert: "• Utilisez les temps du passé (imparfait pour le décor, passé composé pour les actions).",
      trapAlertEn: "• Use past tenses accurately (imparfait for context, passé composé for events).",
      speakingCoach: "Reliez toujours votre anecdote de voyage à vos compétences pour le Canada.",
      speakingCoachEn: "Connect your travel story to your adaptability skills for Canada."
    },
    {
      id: "tcf3-spk-2",
      paperNumber: 3,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Club Multisports & Plein Air à Gatineau",
      titleEn: "Task 2: Interactive Role-Play — Multisport & Outdoor Club in Gatineau",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez adhérer à un club d'activités sportives et de plein air à Gatineau. Vous contactez le responsable pour poser au moins 8 à 10 questions précises sur les forfaits, le matériel prêté, les sorties de groupe et les assurances.",
      scenarioEn: "You want to join a sports and outdoor club in Gatineau. You contact the club manager to ask 8 to 10 questions regarding packages, equipment rental, group outings, and insurance.",
      stimulusDocument: {
        title: "CLUB PLEIN AIR DES COLLINES (GATINEAU)",
        category: "Activités Sportives 4 Saisons",
        organization: "Association Sportive de l'Outaouais",
        content: "Randonnée, kayak, ski de fond et raquettes dans le parc de la Gatineau. Encadrement par des guides certifiés. Activités pour tous les niveaux du débutant à l'expert.",
        details: [
          "💰 Forfait Annuel : 320 $ CAD / an (Accès illimité aux sorties du week-end)",
          "🛶 Prêt de matériel : Kayaks, canots, raquettes et skis inclus sans supplément",
          "🚌 Transport : Navette partagée au départ d'Ottawa et Gatineau chaque samedi",
          "🛡️ Assurance responsabilité civile incluse dans l'adhésion",
          "📅 Séances d'initiation gratuites le premier samedi de chaque mois"
        ],
        contactInfo: "📍 180 Promenade du Portage, Gatineau (QC) • 📞 819-555-0188 • ✉️ contact@pleinair-gatineau.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Responsable du Club Plein Air",
        gender: "male",
        openingPromptFrench: "Bonjour ! Club Plein Air des Collines, Laurent Dubois à votre service. Quelles informations désirez-vous obtenir sur nos activités sportives ?",
        openingPromptEnglish: "Hello! Collines Outdoor Club, Laurent Dubois at your service. What information would you like regarding our sports activities?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Faut-il réserver le matériel à l'avance ?",
        "Les sorties sont-elles maintenues en cas d'intempéries ?",
        "Y a-t-il des tarifs préférentiels pour les couples ou les familles ?",
        "Faut-il fournir un certificat médical d'aptitude ?",
        "Proposez-vous des sorties nocturnes ou des week-ends camping ?"
      ],
      recommendedConnectors: ["par ailleurs", "qu'en est-il de", "serait-il possible de savoir"],
      modelAnswerB2C1: `— Bonjour Monsieur Dubois. Votre annonce pour le Club Plein Air m'intéresse beaucoup.
— Tout d'abord, pourriez-vous me préciser si l'adhésion annuelle donne accès à toutes les activités sans frais additionnels ?
— Concernant le matériel, faut-il le réserver plusieurs jours à l'avance ou est-il disponible sur place le jour même ?
— Comment s'organise le système de navette depuis le centre de Gatineau ? Faut-il s'inscrire au préalable ?
— En cas de mauvais temps, les sorties sont-elles reportées ou annulées avec remboursement ?
— Faut-il fournir un certificat médical d'aptitude sportive lors de l'inscription ?
— Proposez-vous un tarif réduit pour les étudiants ou les nouveaux arrivants ?
— Est-il possible de participer à une sortie d'essai avant de souscrire l'abonnement annuel ?`,
      modelAnswerEn: `— Hello Mr. Dubois. Your listing for the Outdoor Club interests me greatly.
— First, could you clarify whether the annual membership gives access to all activities without extra fees?
— Regarding equipment, does it need to be reserved days in advance or is it available on-site?
— How is the shuttle system from downtown Gatineau organized? Is advance signup required?
— In case of bad weather, are outings postponed or refunded?
— Must a medical fitness certificate be submitted upon registration?
— Do you offer discounted rates for students or newcomers?
— Is it possible to join a trial outing before committing to the annual membership?`,
      trapAlert: "• Posez des questions concrètes basées sur le texte et sur la sécurité.",
      trapAlertEn: "• Ask concrete questions based on the text and safety guidelines.",
      speakingCoach: "Formulez vos questions avec politesse et assurance.",
      speakingCoachEn: "Formulate your questions politely and confidently."
    },
    {
      id: "tcf3-spk-3",
      paperNumber: 3,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — La Gratuité des Transports Publics",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Free Public Transportation",
      cefrTarget: "B2-C2",
      scenario: "Certaines métropoles expérimentent la gratuité totale des réseaux de transport en commun. Présentez un exposé argumenté sur la viabilité économique et l'impact écologique d'une telle mesure.",
      scenarioEn: "Certain metropolitan areas are experimenting with completely free public transit. Present an argument on the economic viability and ecological impact of such a policy.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior FEI",
        gender: "female",
        openingPromptFrench: "Voici votre sujet : 'La gratuité des transports publics est-elle une mesure écologique efficace ou une utopie financière irréaliste ?' Exposez votre analyse.",
        openingPromptEnglish: "Here is your topic: 'Is free public transit an effective ecological measure or an unrealistic financial utopia?' Present your analysis.",
        followUpCounterQuestion: "Si les transports deviennent gratuits, comment les villes financeront-elles la modernisation et la sécurité des rames de métro ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'accessibilité des transports...", "D'un point de vue environnemental...", "Sur le plan budgétaire...", "Une tarification solidaire modulée..."],
      recommendedConnectors: ["indubitablement", "à l'inverse", "force est de constater", "en somme"],
      modelAnswerB2C1: `La question de la gratuité des transports publics touche au cœur des défis contemporains d'équité sociale et de transition écologique.

D'un côté, instaurer la gratuité encourage le report modal de l'automobile vers les transports collectifs, diminuant ainsi la pollution urbaine et les embouteillages. C'est également une mesure de justice sociale majeure pour les ménages modestes.

Cependant, sur le plan financier, la billetterie représente souvent 30 à 40 % des revenus des réseaux. Supprimer cette ressource risque d'entraîner une baisse de la qualité du service, des retards d'entretien et un manque d'investissement dans les nouvelles infrastructures.

En conclusion, je privilégie plutôt une tarification solidaire et progressive selon les revenus, couplée à un investissement massif dans la fréquence et le confort du réseau.`,
      modelAnswerEn: `The question of free public transit touches the core of contemporary challenges in social equity and ecological transition.

On one hand, making transit free encourages shifting from cars to public transit, reducing urban pollution and gridlock. It is also a significant measure of social justice for lower-income households.

However, financially, fare revenue often accounts for 30 to 40% of transit budgets. Eliminating this source risks degrading service quality, maintenance delays, and underinvestment in infrastructure.

In conclusion, I favor progressive income-based fares combined with massive investment in network frequency and comfort.`,
      trapAlert: "• Ne traitez pas seulement de l'aspect écologique : abordez obligatoirement la dimension financière.",
      trapAlertEn: "• Do not focus solely on ecology: you must address the economic and budget feasibility.",
      speakingCoach: "Structurez avec clarté : 1. Enjeu 2. Atouts écologiques 3. Défis budgétaires 4. Recommandation.",
      speakingCoachEn: "Structure clearly: 1. Stakes 2. Eco benefits 3. Fiscal challenges 4. Recommendation."
    }
  ],

  4: [
    {
      id: "tcf4-spk-1",
      paperNumber: 4,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Ville d'Origine & Intégration",
      titleEn: "Task 1: Directed Interview — Hometown & Integration Plans",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en décrivant votre ville d'origine, son patrimoine et la façon dont vous préparez votre intégration dans la société canadienne.",
      scenarioEn: "Introduce yourself to the examiner describing your hometown, its heritage, and how you are preparing to integrate into Canadian society.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Agréé FEI",
        gender: "male",
        openingPromptFrench: "Bonjour ! Présentez-vous, décrivez-moi votre ville d'origine et expliquez-moi comment vous préparez votre installation au Canada.",
        openingPromptEnglish: "Hello! Introduce yourself, describe your hometown, and explain how you are preparing your settlement in Canada."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je suis originaire de...", "C'est une ville réputée pour...", "Pour faciliter mon intégration, je...", "Je m'informe activement sur..."],
      recommendedConnectors: ["d'ailleurs", "en conséquence", "c'est ainsi que"],
      modelAnswerB2C1: `Bonjour Monsieur. Je m'appelle Maxime et je suis comptable professionnel agréé. Je suis originaire de Bordeaux, une métropole réputée pour son architecture historique et sa gastronomie.

Pour préparer mon intégration au Canada, je perfectionne activement mon français et mon anglais professionnel, et je me renseigne sur les démarches d'équivalence de diplôme auprès des ordres professionnels québécois et canadiens. Je suis très motivé à l'idée de contribuer à la vitalité économique de ma future province d'accueil.`,
      modelAnswerEn: `Hello. My name is Maxime and I am a chartered professional accountant. I come from Bordeaux, a city renowned for its historic architecture and gastronomy.

To prepare my integration into Canada, I am actively honing my professional French and English, and researching diploma equivalence procedures with Canadian professional accounting bodies. I am deeply motivated to contribute to the economic vitality of my future home province.`,
      trapAlert: "• Restez précis sur vos démarches concrètes d'intégration.",
      trapAlertEn: "• Be specific about concrete steps you take to integrate.",
      speakingCoach: "Montrez votre proactivité et votre maturité professionnelle.",
      speakingCoachEn: "Showcase proactivity and professional maturity."
    },
    {
      id: "tcf4-spk-2",
      paperNumber: 4,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Mission de Bénévolat Alimentaire à Laval",
      titleEn: "Task 2: Interactive Role-Play — Food Bank Volunteering in Laval",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez vous engager comme bénévole dans une banque alimentaire à Laval. Vous appelez le coordonnateur pour poser au moins 8 à 10 questions sur les missions, les horaires, les compétences requises et les formations offertes.",
      scenarioEn: "You wish to volunteer at a food bank in Laval. You call the coordinator to ask 8 to 10 questions about duties, schedules, required skills, and training provided.",
      stimulusDocument: {
        title: "BANQUE ALIMENTAIRE SOLIDAIRE DE LAVAL",
        category: "Engagement Citoyen & Bénévolat",
        organization: "Entraide Communautaire Laval",
        content: "Distribution de paniers alimentaires et lutte contre le gaspillage. Nous recherchons des bénévoles engagés pour trier les denrées, préparer les colis et accueillir les bénéficiaires.",
        details: [
          "⏰ Horaires : Créneaux flexibles de 3 heures (matin, après-midi ou samedi)",
          "📦 Missions : Tri alimentaire, préparation des commandes, livraison à domicile",
          "🤝 Formation initiale de 2 heures offerte à chaque nouveau bénévole",
          "☕ Espace convivial et repas partagé avec l'équipe de bénévoles",
          "📜 Attestation d'heures de bénévolat remise pour le CV"
        ],
        contactInfo: "📍 720 Boulevard Saint-Martin Ouest, Laval (QC) • 📞 450-555-0167 • ✉️ benevolat@entraide-laval.qc.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Coordonnateur du Bénévolat — Entraide Laval",
        gender: "male",
        openingPromptFrench: "Bonjour ! Entraide Laval, Laurent Dubois. Merci de proposer votre aide. Quelles sont vos questions concernant nos missions de bénévolat ?",
        openingPromptEnglish: "Hello! Entraide Laval, Laurent Dubois speaking. Thank you for offering your help. What questions do you have regarding our volunteer missions?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Quel est l'engagement horaire minimum exigé par semaine ?",
        "Une expérience préalable dans le secteur associatif est-elle requise ?",
        "Le permis de conduire est-il nécessaire pour les livraisons ?",
        "Organisez-vous des activités en soirée pour les personnes qui travaillent le jour ?",
        "Quelle est la procédure pour s'inscrire à la formation initiale ?"
      ],
      recommendedConnectors: ["de plus", "en ce qui touche", "serait-il utile"],
      modelAnswerB2C1: `— Bonjour Monsieur Dubois. Je souhaite donner de mon temps pour soutenir votre banque alimentaire.
— Quel est le nombre d'heures minimum que vous demandez par semaine ou par mois ?
— Concernant la formation initiale de deux heures, a-t-elle lieu en ligne ou directement sur place à Laval ?
— Pour les missions de livraison à domicile, faut-il utiliser son propre véhicule ou disposez-vous d'une camionnette de l'organisme ?
— Fournissez-vous les équipements de sécurité comme les gants et les chaussures renforcées pour le tri des denrées ?
— Est-il possible de participer uniquement le samedi si l'on travaille la semaine ?
— Délivrez-vous une attestation officielle du nombre d'heures accomplies pour les dossiers d'immigration ou d'emploi ?
— À quelle date commence la prochaine session d'accueil ?`,
      modelAnswerEn: `— Hello Mr. Dubois. I would like to volunteer my time to support your food bank.
— What is the minimum number of hours required per week or month?
— Regarding the two-hour initial training, does it take place online or on-site in Laval?
— For home delivery missions, do volunteers use their own vehicles or do you provide an organization van?
— Do you provide safety gear such as gloves and protective footwear for food sorting?
— Is it possible to participate only on Saturdays if one works during the week?
— Do you issue official certificates of completed volunteer hours for immigration or job applications?
— When does the next onboarding orientation take place?`,
      trapAlert: "• Démontrez de l'empathie et un intérêt sincère pour la mission communautaire.",
      trapAlertEn: "• Demonstrate genuine empathy and interest in the community mission.",
      speakingCoach: "Posez des questions d'organisation pratique et de sécurité.",
      speakingCoachEn: "Focus on practical scheduling, logistics, and safety gear."
    },
    {
      id: "tcf4-spk-3",
      paperNumber: 4,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — L'Interdiction des Smartphones à l'École",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Banning Smartphones in Schools",
      cefrTarget: "B2-C2",
      scenario: "De nombreux pays débattent de l'interdiction complète des téléphones cellulaires dans les écoles primaires et secondaires. Développez une argumentation structurée sur cette mesure.",
      scenarioEn: "Many countries are debating the complete ban of cell phones in primary and secondary schools. Develop a structured argument on this policy.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior FEI",
        gender: "female",
        openingPromptFrench: "Voici votre thème de débat : 'L'interdiction des téléphones portables dans les établissements scolaires est-elle indispensable pour protéger l'attention des élèves ?' Présentez votre point de vue.",
        openingPromptEnglish: "Here is your debate theme: 'Is banning cellphones in schools indispensable to protect student attention?' Present your point of view.",
        followUpCounterQuestion: "Les smartphones ne sont-ils pas devenus des outils pédagogiques incontournables pour préparer les jeunes au monde numérique ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'omniprésence des écrans...", "Cette interdiction favorise la concentration...", "Cependant, sur le plan éducatif...", "Il convient d'éduquer plutôt que d'interdire..."],
      recommendedConnectors: ["d'un côté", "en contrepartie", "toutefois", "en conclusion"],
      modelAnswerB2C1: `L'omniprésence des téléphones intelligents chez les jeunes élèves suscite des inquiétudes légitimes quant à la baisse de concentration et au cyberharcèlement en milieu scolaire.

D'une part, bannir les téléphones des salles de classe crée un environnement propice à l'apprentissage serein. Les élèves sont moins distraits par les notifications et interagissent davantage entre eux lors des récréations, ce qui renforce les liens sociaux et la santé mentale.

D'autre part, interdire purement et simplement prive l'école de l'opportunité d'enseigner un usage responsable et critique des technologies. Le smartphone peut aussi servir d'outil de recherche interactive sous la supervision de l'enseignant.

En conclusion, je soutiens une interdiction stricte pendant les heures de cours, accompagnée d'ateliers réguliers d'éducation numérique pour responsabiliser les élèves.`,
      modelAnswerEn: `The ubiquity of smartphones among young students raises legitimate concerns regarding shortened attention spans and cyberbullying in schools.

On one hand, banning phones from classrooms creates an environment conducive to focused learning. Students are less distracted by notifications and interact more during recess, strengthening social bonds and mental health.

On the other hand, an outright ban deprives schools of the opportunity to teach responsible and critical technology usage. Smartphones can also serve as interactive research tools under teacher supervision.

In conclusion, I support a strict ban during class hours accompanied by regular digital literacy workshops to foster student responsibility.`,
      trapAlert: "• Ne confondez pas interdiction en classe et interdiction générale de la technologie.",
      trapAlertEn: "• Distinguish between in-class smartphone bans and general bans on technology.",
      speakingCoach: "Mettez en avant le rôle pédagogique de l'école dans la conclusion.",
      speakingCoachEn: "Highlight the pedagogical role of education in your concluding synthesis."
    }
  ],

  5: [
    {
      id: "tcf5-spk-1",
      paperNumber: 5,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Loisirs & Vie Communautaire",
      titleEn: "Task 1: Directed Interview — Hobbies & Community Life",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en parlant de vos passions, de vos loisirs et des activités associatives auxquelles vous aimeriez participer au Canada.",
      scenarioEn: "Introduce yourself to the examiner discussing your passions, hobbies, and community activities you would like to join in Canada.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice FEI",
        gender: "female",
        openingPromptFrench: "Bonjour ! Présentez-vous, parlez-moi de vos activités de loisirs préférées et des projets associatifs qui vous tiennent à cœur.",
        openingPromptEnglish: "Hello! Introduce yourself, tell me about your favorite hobbies and community projects close to your heart."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "Pendant mon temps libre, j'aime...", "Je m'intéresse beaucoup à...", "Au Canada, j'aimerais m'investir dans..."],
      recommendedConnectors: ["particulièrement", "de ce fait", "en outre"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Clara et je travaille comme graphiste designer.

Pendant mon temps libre, je pratique la peinture à l'huile et la photographie urbaine. Ces activités artistiques stimulent ma créativité et m'incitent à poser un regard attentif sur mon environnement. Par ailleurs, je fais du bénévolat dans une bibliothèque de quartier pour promouvoir la lecture chez les enfants.

Une fois installée au Canada, je souhaite vivement rejoindre des collectifs d'artistes locaux et m'impliquer dans des initiatives de verdissement urbain.`,
      modelAnswerEn: `Hello. My name is Clara and I work as a graphic designer.

In my free time, I practice oil painting and urban photography. These artistic pursuits stimulate my creativity and encourage me to look closely at my surroundings. Furthermore, I volunteer at a neighborhood library to foster reading among children.

Once settled in Canada, I look forward to joining local artist collectives and getting involved in urban greening initiatives.`,
      trapAlert: "• Soyez dynamique et précis dans vos explications.",
      trapAlertEn: "• Be dynamic and specific in your answers.",
      speakingCoach: "Exprimez vos émotions avec un vocabulaire riche.",
      speakingCoachEn: "Express enthusiasm using evocative, varied vocabulary."
    },
    {
      id: "tcf5-spk-2",
      paperNumber: 5,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Abonnement Vélopartage Électrique à Sherbrooke",
      titleEn: "Task 2: Interactive Role-Play — Electric Bike-Share Subscription in Sherbrooke",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez souscrire un abonnement de vélo en libre-service électrique à Sherbrooke. Vous contactez le service client pour poser au moins 8 à 10 questions sur le fonctionnement, les tarifs, l'autonomie et les assurances.",
      scenarioEn: "You wish to subscribe to an electric bike-share service in Sherbrooke. You call customer service to ask 8 to 10 questions about usage, pricing, battery range, and insurance.",
      stimulusDocument: {
        title: "SHERB-ÉCO-VÉLO : SERVICE DE VÉLOPARTAGE ÉLECTRIQUE",
        category: "Mobilité Urbaine Verte",
        organization: "Société de Transport de Sherbrooke",
        content: "Flotte de 300 vélos à assistance électrique répartis dans 40 stations à travers la ville. Déverrouillage instantané via application mobile. Idéal pour les trajets domicile-travail.",
        details: [
          "💰 Abonnement Annuel : 89 $ CAD / an (30 premières minutes gratuites par trajet)",
          "⚡ Autonomie des batteries : Jusqu'à 60 km d'assistance",
          "📱 Application : Localisation en temps réel et réservation de vélo 15 min à l'avance",
          "❄️ Service actif d'avril à novembre (pause hivernale)",
          "⛑️ Casque obligatoire fourni gratuitement sur demande"
        ],
        contactInfo: "📍 100 Rue du Dépôt, Sherbrooke (QC) • 📞 819-555-0133 • ✉️ info@sherbecovelo.ca"
      },
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Conseiller Clientèle — Sherb-Éco-Vélo",
        gender: "male",
        openingPromptFrench: "Bonjour ! Sherb-Éco-Vélo, Thomas Laurent à votre service. Quelles questions avez-vous sur notre service de vélopartage électrique ?",
        openingPromptEnglish: "Hello! Sherb-Éco-Vélo, Thomas Laurent at your service. What questions do you have about our electric bike-share service?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Que se passe-t-il si un trajet dépasse les 30 minutes gratuites ?",
        "Comment procède-t-on si une station de destination est entièrement pleine ?",
        "Une caution est-elle bloquée sur la carte de crédit ?",
        "Que couvre l'assurance en cas de vol ou d'accident ?",
        "Existe-t-il une offre combinée avec le réseau d'autobus urbain ?"
      ],
      recommendedConnectors: ["notamment", "dans le cas où", "serait-il possible"],
      modelAnswerB2C1: `— Bonjour Monsieur Laurent. Je souhaite utiliser votre service de vélos électriques pour mes déplacements quotidiens.
— Tout d'abord, quel est le coût de la minute supplémentaire si mon trajet excède les 30 minutes gratuites ?
— Si la station où je souhaite déposer mon vélo est complète, comment fait-on pour ne pas être surfacturé ?
— Une caution bancaire est-elle prélevée lors de la création du compte sur l'application ?
— Fournissez-vous un casque ou faut-il obligatoirement utiliser son propre équipement ?
— Que doit-on faire en cas de crevaison ou de problème mécanique en cours de route ?
— Proposez-vous un tarif combiné avantageux pour les abonnés du réseau d'autobus de Sherbrooke ?
— L'assistance électrique fonctionne-t-elle correctement dans les montées abruptes de la ville ?`,
      modelAnswerEn: `— Hello Mr. Laurent. I would like to use your electric bike service for my daily commute.
— First, what is the cost per additional minute if my ride exceeds the free 30 minutes?
— If the station where I want to return the bike is completely full, how do I avoid overtime fees?
— Is a security deposit held on the credit card when creating an account?
— Do you provide a helmet or must riders bring their own?
— What should one do in case of a flat tire or mechanical issue mid-ride?
— Do you offer a combined discounted rate for Sherbrooke bus pass holders?
— Does the electric motor provide enough power on the city's steep hills?`,
      trapAlert: "• Vérifiez les détails techniques du document pour enrichir vos questions.",
      trapAlertEn: "• Check technical details in the document to enrich your inquiries.",
      speakingCoach: "Posez des questions sur les imprévus (panne, station pleine, batterie faible).",
      speakingCoachEn: "Ask about contingency situations (breakdowns, full docks, low battery)."
    },
    {
      id: "tcf5-spk-3",
      paperNumber: 5,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — Le Revenu Universel de Base",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Universal Basic Income",
      cefrTarget: "B2-C2",
      scenario: "L'instauration d'un revenu universel inconditionnel pour tous les citoyens suscite de vifs débats économiques. Présentez une réflexion dialectique approfondie sur sa faisabilité et ses impacts sociaux.",
      scenarioEn: "The establishment of an unconditional universal basic income for all citizens sparks intense economic debate. Present an in-depth dialectic argument on its feasibility and social impacts.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Senior FEI",
        gender: "male",
        openingPromptFrench: "Voici votre sujet : 'Le revenu universel de base est-il une solution d'avenir pour éliminer la précarité ou un frein à la valeur travail ?' Je vous écoute.",
        openingPromptEnglish: "Here is your topic: 'Is universal basic income a forward-looking solution to eradicate poverty or a deterrent to the value of work?' I am listening.",
        followUpCounterQuestion: "Mais ne risquons-nous pas une pénurie de main-d'œuvre dans les métiers pénibles si chacun reçoit un revenu garanti sans travailler ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["La précarité économique...", "Cette mesure garantit la dignité...", "Cependant, la question du financement fiscal...", "En conclusion, un socle de sécurité conditionné..."],
      recommendedConnectors: ["incontestablement", "à l'opposé", "dès lors", "pour conclure"],
      modelAnswerB2C1: `Face aux bouleversements technologiques et à la précarisation de certains emplois, le revenu de base universel s'impose comme une proposition audacieuse.

D'un côté, ce dispositif assure un filet de sécurité inconditionnel, éliminant l'extrême pauvreté et permettant aux individus de se former, d'entreprendre ou de s'occuper de leurs proches sans angoisse financière immédiate.

De l'autre côté, son coût budgétaire colossal exigerait une hausse massive de la fiscalité. De plus, certains économistes craignent un désincitatif au travail dans les secteurs essentiels mais peu valorisés.

En somme, plutôt qu'un revenu aveugle et universel, je préconise un revenu minimum garanti ciblé sur la formation continue et l'insertion sociale.`,
      modelAnswerEn: `Faced with technological disruption and job precarity, universal basic income emerges as a bold policy proposal.

On one hand, this measure ensures an unconditional safety net, eliminating extreme poverty and empowering individuals to study, innovate, or care for loved ones without immediate financial dread.

On the other hand, its immense fiscal cost would require substantial tax hikes. Furthermore, some economists fear a disincentive to work in essential but demanding sectors.

In summary, rather than a blanket universal payment, I advocate for a targeted guaranteed minimum income linked to continuing education and social reintegration.`,
      trapAlert: "• Appuyez vos arguments sur des concepts économiques clairs (fiscalité, incitation, pouvoir d'achat).",
      trapAlertEn: "• Support your points with clear economic concepts (taxation, incentives, purchasing power).",
      speakingCoach: "Démontrez votre capacité à conceptualiser et synthétiser des débats de haut niveau.",
      speakingCoachEn: "Demonstrate high-level conceptualization and synthesis skills."
    }
  ],

  6: [
    {
      id: "tcf6-spk-1",
      paperNumber: 6,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Formation & Compétences Clés",
      titleEn: "Task 1: Directed Interview — Training & Core Competencies",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous en détaillant vos études, vos compétences professionnelles majeures et vos atouts pour vous adapter au marché de l'emploi canadien.",
      scenarioEn: "Introduce yourself detailing your academic studies, key professional competencies, and your strengths for adapting to the Canadian job market.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Certifiée FEI",
        gender: "female",
        openingPromptFrench: "Bonjour ! Présentez-vous à moi en me parlant de votre formation universitaire et de vos compétences professionnelles clés.",
        openingPromptEnglish: "Hello! Introduce yourself to me by discussing your university education and your key professional skills."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je suis titulaire d'un...", "Au cours de mes études, j'ai acquis...", "Mes points forts sont...", "Je suis prêt(e) à relever ce défi."],
      recommendedConnectors: ["notamment", "ainsi", "par conséquent"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Antoine et je suis titulaire d'un master en gestion des ressources humaines.

Au cours de mes sept années de carrière, j'ai développé une solide expertise dans le recrutement de talents, la gestion des relations de travail et l'élaboration de programmes de formation continue. Mes principaux atouts sont mon sens de l'écoute, ma capacité à résoudre les conflits avec diplomatie et mon adaptabilité aux environnements multiculturels.

Je suis convaincu que ces compétences me permettront de m'intégrer rapidement au sein d'une organisation canadienne.`,
      modelAnswerEn: `Hello. My name is Antoine and I hold a Master's degree in Human Resources Management.

Throughout my seven-year career, I have developed solid expertise in talent acquisition, labor relations, and continuing education programs. My main strengths are active listening, diplomatic conflict resolution, and adaptability to multicultural environments.

I am confident that these skills will allow me to integrate swiftly into a Canadian organization.`,
      trapAlert: "• Ne récitez pas une simple liste de diplômes : valorisez vos compétences opérationnelles.",
      trapAlertEn: "• Don't just list diplomas; emphasize real-world operational competencies.",
      speakingCoach: "Adoptez un ton professionnel et structuré.",
      speakingCoachEn: "Adopt a professional, confident, and well-structured tone."
    },
    {
      id: "tcf6-spk-2",
      paperNumber: 6,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Réservation d'un Espace de Coworking à Trois-Rivières",
      titleEn: "Task 2: Interactive Role-Play — Reserving a Coworking Space in Trois-Rivières",
      cefrTarget: "B1-C1",
      scenario: "Travailleur autonome, vous cherchez un espace de travail partagé à Trois-Rivières. Vous contactez le gérant pour poser 8 à 10 questions sur les abonnements, l'équipement informatique, les salles de réunion et les accès 24/7.",
      scenarioEn: "As a freelancer, you are looking for a coworking space in Trois-Rivières. You call the manager to ask 8 to 10 questions about memberships, IT equipment, meeting rooms, and 24/7 access.",
      stimulusDocument: {
        title: "ESPACE CO-TRAVAIL LA MAURICIE (TROIS-RIVIÈRES)",
        category: "Espace Professionnel Partagé & Réseautage",
        organization: "Hub Innovation Trois-Rivières",
        content: "Bureaux partagés ultra-modernes au cœur du centre historique. Connexion fibre optique dédiée, cabines insonorisées pour appels et café de spécialité illimité.",
        details: [
          "💰 Forfait Flex : 195 $ CAD / mois (Accès aux postes nomades 24h/24 et 7j/7)",
          "🏢 Salles de réunion équipées pour visioconférences (5h gratuites par mois)",
          "🖨️ Impression et numérisation professionnelles incluses",
          "☕ Cuisine équipée, terrasse sur le fleuve et événements de réseautage hebdomadaires",
          "📅 Sans engagement de durée (résiliation avec préavis de 15 jours)"
        ],
        contactInfo: "📍 350 Rue des Forges, Trois-Rivières (QC) • 📞 819-555-0155 • ✉️ contact@cotravail-mauricie.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Gérant — Espace Co-Travail Mauricie",
        gender: "male",
        openingPromptFrench: "Bonjour ! Espace Co-Travail La Mauricie, Laurent Dubois. En quoi puis-je vous renseigner sur nos formules de coworking ?",
        openingPromptEnglish: "Hello! Mauricie Coworking Space, Laurent Dubois speaking. How can I help you regarding our workspace plans?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "L'accès sécurisé 24/7 fonctionne-t-il par badge ou code numérique ?",
        "La connexion internet dispose-t-elle d'une ligne de secours en cas de panne ?",
        "Les salles de réunion doivent-elles être réservées via une application ?",
        "Est-il possible d'utiliser l'adresse pour domicilier son entreprise ?",
        "Proposez-vous une journée découverte gratuite pour tester les lieux ?"
      ],
      recommendedConnectors: ["également", "par ailleurs", "qu'en est-il de"],
      modelAnswerB2C1: `— Bonjour Monsieur Dubois. Je suis travailleur autonome et votre espace de coworking à Trois-Rivières m'intéresse beaucoup.
— Tout d'abord, pour le forfait Flex à 195 $, comment s'effectue l'accès en dehors des heures de bureau la fin de semaine ?
— La connexion internet fibre optique est-elle garantie avec un débit symétrique pour les visioconférences lourdes ?
— Y a-t-il suffisamment de cabines insonorisées pour passer des appels clients sans réservation ?
— Comment réserve-t-on les 5 heures de salle de réunion incluses par mois ?
— Proposez-vous un service de casier fermé sécurisé pour y laisser du matériel la nuit ?
— Le forfait inclut-il la domiciliation commerciale et la réception du courrier postal ?
— Serait-il possible de venir passer une journée d'essai demain pour tester l'ambiance de travail ?`,
      modelAnswerEn: `— Hello Mr. Dubois. I am a freelancer and your coworking space in Trois-Rivières interests me greatly.
— First, for the $195 Flex plan, how is access handled outside of office hours and on weekends?
— Is the fiber internet connection guaranteed with symmetric high-speed bandwidth for video calls?
— Are there enough soundproof phone booths for taking client calls without prior booking?
— How are the 5 included meeting room hours booked each month?
— Do you provide secure lockable storage lockers to leave equipment overnight?
— Does the membership include business address registration and mail handling?
— Would it be possible to come for a trial workday tomorrow to experience the working environment?`,
      trapAlert: "• Posez des questions orientées vers l'efficacité professionnelle et le confort.",
      trapAlertEn: "• Focus on productivity, connectivity, and practical workspace needs.",
      speakingCoach: "Soyez dynamique et posez vos questions avec clarté.",
      speakingCoachEn: "Be proactive, organized, and speak with confidence."
    },
    {
      id: "tcf6-spk-3",
      paperNumber: 6,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — La Taxe Carbone et la Transition Écologique",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Carbon Taxation & Climate Policy",
      cefrTarget: "B2-C2",
      scenario: "La tarification du carbone suscite des oppositions politiques et populaires sur le pouvoir d'achat. Développez une réflexion dialectique sur l'efficacité de la taxe carbone face à l'urgence climatique.",
      scenarioEn: "Carbon pricing sparks political and public opposition over purchasing power. Develop a dialectic argument on the effectiveness of carbon taxation in addressing climate emergencies.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior FEI",
        gender: "female",
        openingPromptFrench: "Voici votre sujet : 'La taxe carbone est-elle un levier indispensable pour inciter à la transition écologique ou une charge fiscale injuste pour les ménages ?' Présentez votre argumentation.",
        openingPromptEnglish: "Here is your topic: 'Is the carbon tax an indispensable lever for ecological transition or an unfair tax burden on households?' Present your argument.",
        followUpCounterQuestion: "Les ménages modestes qui dépendent de leur voiture en milieu rural ne sont-ils pas pénalisés injustement par cette taxe ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'urgence climatique...", "Le principe pollueur-payeur...", "Cependant, sans alternatives viables...", "En conclusion, la redistribution intégrale..."],
      recommendedConnectors: ["indubitablement", "néanmoins", "par conséquent", "en guise de bilan"],
      modelAnswerB2C1: `La mise en place d'une tarification sur les émissions de carbone se trouve à la croisée de l'impératif environnemental et de la justice sociale.

D'un côté, le principe pollueur-payeur crée un signal-prix indispensable. Il incite économiquement les entreprises et les particuliers à modifier leurs comportements en réduisant leur consommation d'énergies fossiles et en investissant dans les technologies vertes.

D'un autre côté, cette taxe pèse lourdement sur les ménages des régions périphériques et rurales qui n'ont pas d'alternative à l'automobile. Sans mesures d'accompagnement, elle risque d'accroître les inégalités sociales.

En conclusion, la taxe carbone n'est acceptable et efficace que si l'intégralité des recettes fiscales est redistribuée sous forme de chèques énergie aux ménages vulnérables et investie dans les transports propres.`,
      modelAnswerEn: `Implementing a price on carbon emissions lies at the intersection of environmental urgency and social justice.

On one hand, the polluter-pays principle creates an essential price signal. It economically incentivizes corporations and households to reduce fossil fuel consumption and invest in green technologies.

On the other hand, this tax disproportionately affects rural and suburban households lacking public transit alternatives. Without support measures, it risks exacerbating social inequality.

In conclusion, a carbon tax is only acceptable and effective if all tax revenues are fully rebated to vulnerable households via climate dividends and reinvested into clean transit infrastructure.`,
      trapAlert: "• Ne négligez pas l'impact sur les ménages ruraux et modestes.",
      trapAlertEn: "• Do not overlook the impact on low-income and rural households.",
      speakingCoach: "Intégrez la dimension de la redistribution fiscale dans votre synthèse.",
      speakingCoachEn: "Incorporate revenue recycling and climate dividends into your synthesis."
    }
  ],

  7: [
    {
      id: "tcf7-spk-1",
      paperNumber: 7,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Gastronomie & Convivialité",
      titleEn: "Task 1: Directed Interview — Gastronomy & Traditions",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en parlant de vos traditions culinaires familiales et de votre intérêt pour la découverte de la cuisine québécoise et canadienne.",
      scenarioEn: "Introduce yourself to the examiner discussing your family's culinary traditions and your interest in exploring Quebec and Canadian gastronomy.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Agréé FEI",
        gender: "male",
        openingPromptFrench: "Bonjour ! Présentez-vous et parlez-moi de votre cuisine préférée ainsi que des traditions culinaires de votre pays.",
        openingPromptEnglish: "Hello! Introduce yourself and tell me about your favorite cuisine and the culinary traditions of your country."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "La cuisine est pour moi un symbole de...", "Dans ma région d'origine...", "J'ai hâte de goûter aux spécialités locales."],
      recommendedConnectors: ["notamment", "c'est ainsi que", "par ailleurs"],
      modelAnswerB2C1: `Bonjour Monsieur. Je m'appelle Nadia et je suis conseillère financière.

Pour moi, la cuisine représente bien plus qu'une simple nourriture : c'est un moment privilégié de partage et de convivialité en famille. Dans ma culture d'origine, nous préparons traditionnellement des plats mijotés aux épices douces lors des réunions du dimanche.

J'adore découvrir de nouvelles cultures à travers leurs saveurs, et j'ai très hâte de déguster la vraie tourtière québécoise, les produits de l'érable et les fromages artisanaux du Québec.`,
      modelAnswerEn: `Hello. My name is Nadia and I am a financial advisor.

To me, food represents much more than nourishment: it is a cherished moment of sharing and family bonding. In my culture, we traditionally prepare slow-cooked spiced stews during Sunday family gatherings.

I love discovering new cultures through their flavors, and I look forward to tasting authentic Quebec tourtière, maple products, and artisanal Quebec cheeses.`,
      trapAlert: "• Utilisez un vocabulaire sensoriel et descriptif varié.",
      trapAlertEn: "• Use sensory, descriptive vocabulary.",
      speakingCoach: "Parlez avec chaleur et enthousiasme.",
      speakingCoachEn: "Speak with warmth, authentic enthusiasm, and varied vocabulary."
    },
    {
      id: "tcf7-spk-2",
      paperNumber: 7,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Inscription à un Atelier Culinaire Éco-Responsable",
      titleEn: "Task 2: Interactive Role-Play — Eco-Cooking Workshop in Chicoutimi",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez participer à un atelier de cuisine zéro déchet et produits du terroir à Chicoutimi. Vous téléphonez au chef pour poser 8 à 10 questions sur le déroulement, les ingrédients, le matériel et les dégustations.",
      scenarioEn: "You want to join a zero-waste local products cooking workshop in Chicoutimi. You call the chef to ask 8 to 10 questions about the schedule, ingredients, equipment, and tastings.",
      stimulusDocument: {
        title: "ATELIERS DU TERROIR & CUISINE ZÉRO DÉCHET (CHICOUTIMI)",
        category: "Gastronomie Locale & Écologie",
        organization: "École Culinaire du Saguenay",
        content: "Apprenez à cuisiner les produits boréaux du Saguenay-Lac-Saint-Jean sans aucun déchet. Cours pratiques de 3 heures dispensés par un chef réputé.",
        details: [
          "💰 Tarif : 85 $ CAD / atelier (Tous ingrédients biologiques et fiches recettes inclus)",
          "⏰ Horaires : Samedi de 10h00 à 13h00 ou jeudi de 18h00 à 21h00",
          "🍷 Dégustation sur place des plats préparés avec accord mets et cidres locaux",
          "👨‍🍳 Tabliers, couteaux et contenants réutilisables fournis",
          "👥 Petits groupes limités à 8 participants"
        ],
        contactInfo: "📍 210 Rue Racine Est, Chicoutimi (QC) • 📞 418-555-0177 • ✉️ chef@cuisine-saguenay.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Chef Formateur — École Culinaire du Saguenay",
        gender: "male",
        openingPromptFrench: "Bonjour ! École Culinaire du Saguenay, chef Laurent à l'appareil. Quelles sont vos questions concernant nos ateliers de cuisine zéro déchet ?",
        openingPromptEnglish: "Hello! Saguenay Culinary School, Chef Laurent speaking. What questions do you have regarding our zero-waste cooking workshops?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Adaptez-vous les recettes en cas d'allergies ou de régime végétarien ?",
        "Peut-on emporter les portions restantes à la maison ?",
        "Faut-il avoir des compétences avancées en cuisine pour participer ?",
        "Les enfants ou adolescents peuvent-ils participer à l'atelier ?",
        "Proposez-vous des cartes-cadeaux ou des tarifs de groupe ?"
      ],
      recommendedConnectors: ["concernant", "serait-il possible", "qu'en est-il de"],
      modelAnswerB2C1: `— Bonjour Chef Laurent. Votre atelier de cuisine boréale zéro déchet m'intéresse beaucoup.
— Tout d'abord, adaptez-vous les recettes proposées si un participant est végétarien ou a des intolérances au gluten ?
— Les participants doivent-ils apporter leurs propres contenants pour ramener les surplus chez eux ?
— Le cours convient-il à des personnes débutantes qui n'ont jamais cuisiné de produits du terroir ?
— Quels types de produits boréaux allez-vous nous apprendre à cuisiner lors de la prochaine session ?
— Les boissons et cidres régionaux servis lors de la dégustation sont-ils compris dans le tarif de 85 $ ?
— Est-il possible d'inscrire deux personnes ensemble et de bénéficier d'une remise pour les duos ?
— Quelle est votre politique en cas de besoin d'annulation ou de report de date ?`,
      modelAnswerEn: `— Hello Chef Laurent. Your zero-waste boreal cooking workshop interests me greatly.
— First, do you adapt the recipes if a participant is vegetarian or gluten-intolerant?
— Must participants bring their own reusable containers to take home leftover food?
— Is the class suitable for beginners who have never cooked with local boreal ingredients?
— What types of boreal products will we learn to cook in the upcoming session?
— Are the local ciders and drinks served during the tasting included in the $85 fee?
— Is it possible to register two people together and receive a duo discount?
— What is your cancellation or rescheduling policy?`,
      trapAlert: "• Posez des questions sur les régimes alimentaires et les compétences requises.",
      trapAlertEn: "• Ask about dietary restrictions and required skill levels.",
      speakingCoach: "Soyez curieux et interactif.",
      speakingCoachEn: "Be inquisitive, engaging, and professional."
    },
    {
      id: "tcf7-spk-3",
      paperNumber: 7,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — L'Impact des Réseaux Sociaux sur la Jeunesse",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Social Media Impact on Youth",
      cefrTarget: "B2-C2",
      scenario: "Les réseaux sociaux sont accusés d'affecter la santé mentale des adolescents. Exposez une réflexion critique et nuancée sur les opportunités et les dangers des plateformes numériques.",
      scenarioEn: "Social media platforms are accused of impacting teenage mental health. Present a critical, nuanced argument on the opportunities and dangers of digital platforms.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Senior FEI",
        gender: "male",
        openingPromptFrench: "Voici votre sujet : 'Les réseaux sociaux représentent-ils un vecteur d'ouverture pour la jeunesse ou une menace pour leur santé mentale ?' Exposez votre point de vue.",
        openingPromptEnglish: "Here is your topic: 'Do social media platforms represent an opening to the world for youth or a threat to their mental health?' Present your point of view.",
        followUpCounterQuestion: "Les réseaux sociaux ne permettent-ils pas aux jeunes isolés de trouver une communauté solidaire ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'omniprésence des plateformes...", "D'une part, ils facilitent l'accès à l'information...", "Cependant, la quête permanente de validation...", "Il est crucial d'instaurer..."],
      recommendedConnectors: ["certes", "néanmoins", "par conséquent", "en résumé"],
      modelAnswerB2C1: `L'influence considérable des réseaux sociaux sur les jeunes générations constitue un enjeu de société majeur.

D'un côté, ces plateformes offrent des espaces d'expression inédits. Elles permettent aux jeunes de s'informer en temps réel, de développer leur créativité et de maintenir des liens avec des pairs partageant les mêmes passions à travers le globe.

Cependant, les algorithmes conçus pour capter l'attention favorisent la dépendance, les troubles du sommeil et la comparaison sociale destructrice. Les phénomènes de cyberintimidation peuvent avoir des conséquences dramatiques sur l'estime de soi.

En conclusion, la régulation des plateformes par les pouvoirs publics et l'apprentissage de l'autonomie numérique à l'école sont indispensables pour protéger les adolescents.`,
      modelAnswerEn: `The immense influence of social media on younger generations constitutes a major societal challenge.

On one hand, these platforms offer unprecedented creative outlets. They allow youth to access real-time information, hone creativity, and connect with peers sharing common passions globally.

However, algorithms designed to maximize screen time foster addiction, sleep disorders, and destructive social comparison. Cyberbullying can have devastating effects on self-esteem.

In conclusion, government regulation of platforms and teaching digital literacy in schools are vital to protect adolescents.`,
      trapAlert: "• Ne tombez pas dans le cliché : nuancez les aspects positifs et négatifs.",
      trapAlertEn: "• Avoid clichés: balance positive and negative dimensions.",
      speakingCoach: "Proposez des solutions concrètes de régulation.",
      speakingCoachEn: "Propose concrete regulatory and educational solutions."
    }
  ],

  8: [
    {
      id: "tcf8-spk-1",
      paperNumber: 8,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Cinéma & Événements Culturels",
      titleEn: "Task 1: Directed Interview — Cinema & Cultural Events",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous en parlant de vos goûts cinématographiques, des festivals culturels auxquels vous avez assisté et de votre intérêt pour la scène artistique canadienne.",
      scenarioEn: "Introduce yourself discussing your cinema preferences, cultural festivals you attended, and your interest in the Canadian arts scene.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Certifiée FEI",
        gender: "female",
        openingPromptFrench: "Bonjour ! Présentez-vous, décrivez-moi votre genre de film ou de spectacle préféré et parlez-moi d'un événement culturel marquant.",
        openingPromptEnglish: "Hello! Introduce yourself, describe your favorite movie or performance genre, and tell me about a memorable cultural event."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "Je suis un(e) grand(e) passionné(e) de...", "Ce que j'aime dans le cinéma, c'est...", "J'ai très envie de participer à..."],
      recommendedConnectors: ["d'ailleurs", "en effet", "c'est la raison pour laquelle"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Rémi et je suis analyste d'affaires.

Je suis passionné par le cinéma d'auteur et les documentaires historiques. Ce que j'apprécie dans le septième art, c'est sa faculté à nous faire découvrir des réalités humaines complexes et à susciter l'empathie. L'an dernier, j'ai assisté à un festival de cinéma international qui m'a profondément marqué.

J'ai hâte de découvrir la créativité du cinéma québécois et d'assister à des événements majeurs comme le Festival International de Jazz de Montréal.`,
      modelAnswerEn: `Hello. My name is Rémi and I am a business analyst.

I am passionate about independent cinema and historical documentaries. What I appreciate about film is its power to reveal complex human realities and inspire empathy. Last year, I attended an international film festival that left a lasting impression on me.

I look forward to discovering Quebec cinema's creativity and attending landmark events like the Montreal International Jazz Festival.`,
      trapAlert: "• Illustrez votre propos par un exemple concret.",
      trapAlertEn: "• Illustrate your point with a concrete example.",
      speakingCoach: "Faites le lien entre vos goûts culturels et votre projet canadien.",
      speakingCoachEn: "Connect your cultural interests to Canadian cultural life."
    },
    {
      id: "tcf8-spk-2",
      paperNumber: 8,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Bénévolat au Festival Francophone de Rimouski",
      titleEn: "Task 2: Interactive Role-Play — Volunteering at the Rimouski Francophone Festival",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez participer à l'organisation bénévole d'un festival de musique et de théâtre francophone à Rimouski. Vous contactez la responsable pour poser 8 à 10 questions sur les postes, l'hébergement, les avantages et les dates.",
      scenarioEn: "You wish to volunteer at a Francophone music and theater festival in Rimouski. You call the coordinator to ask 8 to 10 questions about roles, accommodation, perks, and dates.",
      stimulusDocument: {
        title: "FESTIVAL DES ARTS FRANCOPHONES DE RIMOUSKI",
        category: "Événementiel Culturel & Musique",
        organization: "Comité des Fêtes du Bas-Saint-Laurent",
        content: "5 jours de concerts, pièces de théâtre et spectacles de rue au bord du fleuve Saint-Laurent. Plus de 80 artistes francophones invités.",
        details: [
          "📅 Dates : Du 14 au 18 juillet prochain",
          "🤝 Postes : Accueil des artistes, billetterie, logistique des scènes, communication",
          "⛺ Hébergement gratuit en camping aménagé pour les bénévoles venant de l'extérieur",
          "🎟️ Pass festival VIP offert pour assister aux concerts en dehors des heures de service",
          "👕 T-shirt officiel et repas chauds fournis chaque jour"
        ],
        contactInfo: "📍 85 Rue Saint-Germain Ouest, Rimouski (QC) • 📞 418-555-0199 • ✉️ benevoles@festival-rimouski.ca"
      },
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Coordonnatrice des Bénévoles — Festival Rimouski",
        gender: "female",
        openingPromptFrench: "Bonjour ! Festival des Arts de Rimouski, Élodie Martin. Merci pour votre enthousiasme. Quelles sont vos questions concernant le bénévolat au festival ?",
        openingPromptEnglish: "Hello! Rimouski Arts Festival, Élodie Martin. Thank you for your enthusiasm. What questions do you have regarding volunteering at the festival?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Faut-il être présent durant l'intégralité des 5 jours du festival ?",
        "Peut-on choisir son secteur d'affectation préféré lors de l'inscription ?",
        "L'hébergement en camping fournit-il des tentes ou faut-il apporter son matériel ?",
        "Y a-t-il une navette entre le site du camping et les scènes de concert ?",
        "Une réunion préparatoire est-elle organisée avant le début de l'événement ?"
      ],
      recommendedConnectors: ["concernant", "serait-il possible", "par ailleurs"],
      modelAnswerB2C1: `— Bonjour Madame Martin. Je serais ravi de m'investir pour la réussite de votre festival à Rimouski.
— Tout d'abord, est-il obligatoire d'être disponible sur les 5 jours complets ou peut-on s'engager sur 2 ou 3 jours ?
— Pour l'accueil des artistes, un niveau d'anglais intermédiaire est-il exigé en plus du français ?
— Concernant l'hébergement en camping gratuit, les sanitaires et douches chaudes sont-ils disponibles sur place ?
— Fournissez-vous les tentes ou les bénévoles doivent-ils apporter leur équipement de couchage ?
— Les repas chauds sont-ils adaptés pour les personnes ayant des restrictions alimentaires ?
— Le pass VIP permet-il d'accéder aux coulisses pour rencontrer les artistes ?
— Quand aura lieu la séance d'information et d'attribution des postes ?`,
      modelAnswerEn: `— Hello Mrs. Martin. I would love to volunteer to help make your festival in Rimouski a success.
— First, is it mandatory to be available all 5 full days or can one commit for 2 or 3 days?
— For artist hospitality, is intermediate English required in addition to French?
— Regarding the free campground lodging, are hot showers and facilities available on-site?
— Do you provide tents or must volunteers bring their own sleeping gear?
— Are the hot meals adapted for people with dietary restrictions?
— Does the VIP festival pass grant backstage access to meet the artists?
— When will the orientation and role assignment meeting take place?`,
      trapAlert: "• Variez les thèmes de questions (logistique, hébergement, missions, pass).",
      trapAlertEn: "• Vary question themes (logistics, lodging, roles, passes).",
      speakingCoach: "Montrez votre disponibilité et votre esprit d'équipe.",
      speakingCoachEn: "Showcase availability and collaborative team spirit."
    },
    {
      id: "tcf8-spk-3",
      paperNumber: 8,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — La Semaine de Travail de Quatre Jours",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — The Four-Day Work Week",
      cefrTarget: "B2-C2",
      scenario: "La réduction du temps de travail à quatre jours par semaine sans baisse de salaire est expérimentée dans plusieurs pays. Exposez votre analyse argumentée sur la productivité et le bien-être au travail.",
      scenarioEn: "Reducing the workweek to four days with no reduction in salary is being tested across several nations. Present an argued analysis on productivity and workplace well-being.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior FEI",
        gender: "female",
        openingPromptFrench: "Voici votre sujet : 'La semaine de travail de 4 jours représente-t-elle un modèle gagnant-gagnant pour les salariés et les entreprises ou un frein économique ?' Exposez votre point de vue.",
        openingPromptEnglish: "Here is your topic: 'Does the 4-day workweek represent a win-win model for employees and employers or an economic barrier?' Present your point of view.",
        followUpCounterQuestion: "Les petites entreprises avec des marges réduites peuvent-elles vraiment maintenir la même production en fermant un jour par semaine ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["L'organisation du temps de travail...", "Les études démontrent un gain de productivité...", "Toutefois, pour les secteurs de service continu...", "Une mise en œuvre sectorielle modulée..."],
      recommendedConnectors: ["incontestablement", "à l'inverse", "dès lors", "en conclusion"],
      modelAnswerB2C1: `Le débat sur la semaine de quatre jours sans diminution de rémunération redéfinit notre rapport au travail et à la performance.

D'un côté, les expérimentations menées démontrent que des salariés plus reposés sont plus concentrés et motivés. La réduction du temps de travail diminue drastiquement l'absentéisme et le surmenage professionnel, tout en rendant les entreprises attractives pour les jeunes talents.

Cependant, ce modèle ne peut s'appliquer uniformément. Dans les secteurs nécessitant une présence continue comme la santé, l'enseignement ou le commerce de proximité, cette mesure exigerait des embauches massives souvent insoutenables pour les petites structures.

En conclusion, la semaine de quatre jours constitue une formidable opportunité si elle est appliquée avec souplesse et adaptée aux réalités opérationnelles de chaque secteur.`,
      modelAnswerEn: `The debate on a four-day workweek with no salary reduction redefines our relationship to work and performance.

On one hand, real-world trials demonstrate that well-rested employees are significantly more focused and motivated. Reducing work hours drastically lowers absenteeism and burnout while making companies highly attractive to young talent.

However, this model cannot be applied uniformly. In continuous-coverage sectors like healthcare, education, or retail, it would necessitate massive hiring that small businesses cannot financially sustain.

In conclusion, the four-day workweek represents a tremendous opportunity provided it is implemented with flexibility and tailored to operational sector realities.`,
      trapAlert: "• Nuancez selon les types d'entreprises (grandes entreprises tech vs commerces de proximité).",
      trapAlertEn: "• Nuance across business types (large tech firms vs small local businesses).",
      speakingCoach: "Citez des exemples concrets pour crédibiliser votre propos.",
      speakingCoachEn: "Cite concrete workplace examples to strengthen credibility."
    }
  ],

  9: [
    {
      id: "tcf9-spk-1",
      paperNumber: 9,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Logement & Cadre de Vie Idéal",
      titleEn: "Task 1: Directed Interview — Housing & Ideal Living Environment",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en décrivant votre logement actuel, ce qui vous plaît dans votre quartier et le type de cadre de vie que vous recherchez au Canada.",
      scenarioEn: "Introduce yourself to the examiner describing your current housing, what you like in your neighborhood, and the living environment you seek in Canada.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Agréé FEI",
        gender: "male",
        openingPromptFrench: "Bonjour ! Présentez-vous, décrivez-moi votre logement et votre quartier, et dites-moi dans quel type d'environnement vous aimeriez vivre au Canada.",
        openingPromptEnglish: "Hello! Introduce yourself, describe your housing and neighborhood, and tell me what living environment you want in Canada."
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "J'habite dans un appartement lumineux situé...", "Mon quartier est très dynamique car...", "Au Canada, je recherche un équilibre entre..."],
      recommendedConnectors: ["en outre", "c'est la raison pour laquelle", "ainsi"],
      modelAnswerB2C1: `Bonjour Monsieur. Je m'appelle Thomas et je suis consultant en développement durable.

J'habite actuellement un appartement au centre de Nantes, dans un quartier calme et bordé d'espaces verts. Ce que j'apprécie particulièrement, c'est la proximité des commerces locaux et du réseau de tramway qui me permet de me déplacer sans voiture.

Pour mon installation au Canada, je recherche un environnement similaire : une ville dynamique à taille humaine qui allie transports durables, vie culturelle et accès facile à la nature.`,
      modelAnswerEn: `Hello. My name is Thomas and I am a sustainable development consultant.

I currently live in an apartment in downtown Nantes, in a quiet neighborhood surrounded by parks. What I particularly value is the proximity to local shops and the tram network, allowing me to live car-free.

For my settlement in Canada, I seek a similar environment: a vibrant, human-scale city combining green transit, cultural life, and easy access to nature.`,
      trapAlert: "• Évitez de vous limiter à une description matérielle : parlez de votre style de vie.",
      trapAlertEn: "• Don't limit yourself to physical descriptions; discuss your lifestyle.",
      speakingCoach: "Adoptez une élocution fluide et positive.",
      speakingCoachEn: "Adopt a fluid, articulate, and positive delivery."
    },
    {
      id: "tcf9-spk-2",
      paperNumber: 9,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Adhésion à un Service d'Autopartage Communautaire",
      titleEn: "Task 2: Interactive Role-Play — Joining a Community Car-Sharing Club",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez vous inscrire à un réseau d'autopartage de véhicules hybrides et électriques à Longueuil. Vous contactez le service client pour poser 8 à 10 questions sur les forfaits, la réservation, le carburant et les assurances.",
      scenarioEn: "You want to join a hybrid and electric car-sharing network in Longueuil. You call customer service to ask 8 to 10 questions about plans, reservations, gas, and insurance.",
      stimulusDocument: {
        title: "COMMUN-AUTO LONGUEUIL : AUTOPARTAGE ÉCO-INTELLIGENT",
        category: "Mobilité Partagée & Écologique",
        organization: "Réseau Mobilité Rive-Sud",
        content: "Accédez à plus de 150 véhicules récents (hybrides et électriques) stationnés dans des zones réservées. Facturation à l'heure et au kilomètre parcouru.",
        details: [
          "💰 Forfait Liberté : 15 $ CAD / mois + 4,50 $ / heure et 0,25 $ / km",
          "⛽ Carburant, recharge électrique, entretien et stationnement réservé inclus",
          "📱 Réservation instantanée via smartphone ou jusqu'à 30 jours à l'avance",
          "🛡️ Assurance collision tous risques incluse (franchise réductible à 0 $)",
          "🔑 Déverrouillage des portières sans clé avec votre téléphone"
        ],
        contactInfo: "📍 50 Rue Saint-Charles Ouest, Longueuil (QC) • 📞 450-555-0182 • ✉️ support@communauto-longueuil.ca"
      },
      examinerPersona: {
        name: "M. Laurent Dubois",
        role: "Conseiller Mobilité — Commun-Auto Longueuil",
        gender: "male",
        openingPromptFrench: "Bonjour ! Commun-Auto Longueuil, Laurent Dubois. En quoi puis-je vous aider concernant notre service d'autopartage ?",
        openingPromptEnglish: "Hello! Commun-Auto Longueuil, Laurent Dubois. How can I help you regarding our car-sharing service?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Un permis de conduire étranger ou international est-il accepté ?",
        "Comment paye-t-on le carburant lors d'un long trajet ?",
        "Que se passe-t-il si je ramène le véhicule avec un retard imprévu ?",
        "Existe-t-il un forfait journalier plafonné pour les départs en week-end ?",
        "L'assurance couvre-t-elle un second conducteur inscrit sur le même compte ?"
      ],
      recommendedConnectors: ["notamment", "dans l'éventualité où", "par ailleurs"],
      modelAnswerB2C1: `— Bonjour Monsieur Dubois. Je souhaite adhérer à votre service d'autopartage à Longueuil.
— Tout d'abord, un permis de conduire international valide est-il accepté lors de l'inscription en ligne ?
— Comment procède-t-on pour payer le carburant ? Y a-t-il une carte de paiement fournie dans la boîte à gants ?
— Existe-t-il un tarif plafonné à la journée si je prévois de faire un voyage de trois jours en région ?
— Que se passe-t-il en cas d'embouteillage si je rends le véhicule avec 30 minutes de retard ?
— Le forfait inclut-il le passage aux péages autoroutiers ou s'agit-il d'un supplément ?
— Peut-on ajouter un conjoint comme conducteur secondaire sans frais additionnels ?
— Les véhicules sont-ils tous équipés de pneus d'hiver certifiés pendant la saison hivernale ?`,
      modelAnswerEn: `— Hello Mr. Dubois. I want to join your car-sharing service in Longueuil.
— First, is a valid international driver's license accepted during online registration?
— How is fuel paid for? Is a fuel card provided in the glove compartment?
— Is there a capped daily rate if I plan a three-day weekend trip to the regions?
— What happens in case of traffic jams if I return the car 30 minutes late?
— Does the plan include highway toll transponders or is that an extra charge?
— Can a spouse be added as a secondary driver without additional membership fees?
— Are all vehicles equipped with certified winter tires during the winter season?`,
      trapAlert: "• Posez des questions sur les conditions québécoises (pneus d'hiver, permis international).",
      trapAlertEn: "• Ask about Quebec-specific driving conditions (winter tires, international licenses).",
      speakingCoach: "Adoptez un débit dynamique et fluide.",
      speakingCoachEn: "Maintain a dynamic and articulate conversational flow."
    },
    {
      id: "tcf9-spk-3",
      paperNumber: 9,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — L'Âge Obligatoire de Départ à la Retraite",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Mandatory Retirement Age",
      cefrTarget: "B2-C2",
      scenario: "Face à l'allongement de l'espérance de vie, certains préconisent de supprimer tout âge légal obligatoire de départ à la retraite pour permettre aux aînés de travailler aussi longtemps qu'ils le souhaitent. Exposez votre analyse.",
      scenarioEn: "Faced with increasing life expectancy, some advocate abolishing any mandatory retirement age to let seniors work as long as they choose. Present your analysis.",
      examinerPersona: {
        name: "M. Thomas Laurent",
        role: "Examinateur Senior FEI",
        gender: "male",
        openingPromptFrench: "Voici votre sujet : 'Faut-il supprimer tout âge limite obligatoire pour la retraite et laisser chacun décider de la fin de sa carrière ?' Présentez votre argumentation.",
        openingPromptEnglish: "Here is your topic: 'Should mandatory retirement age limits be abolished, leaving everyone free to decide when to end their career?' Present your argument.",
        followUpCounterQuestion: "Le maintien prolongé des aînés en poste ne risque-t-il pas de bloquer l'ascension professionnelle des jeunes diplômés ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["Le vieillissement démographique...", "Permettre aux aînés de transmettre leur savoir...", "Toutefois, pour les métiers à forte pénibilité...", "En conclusion, un modèle de retraite flexible à la carte..."],
      recommendedConnectors: ["d'un côté", "en contrepartie", "force est de constater", "en définitive"],
      modelAnswerB2C1: `L'évolution démographique et la prolongation de la durée de vie en bonne santé remettent profondément en question les modèles rigides de retraite.

D'un côté, supprimer un âge couperet obligatoire valorise l'expérience des aînés, combat l'âgisme et permet à ceux qui le désirent de rester actifs tout en soutenant l'économie face aux pénuries de main-d'œuvre.

Cependant, il faut veiller à ce que la liberté de travailler ne se transforme pas en obligation économique pour les travailleurs précaires. De plus, pour les métiers physiquement éprouvants, le droit à une retraite précoce et digne doit demeurer inaliénable.

En définitive, je suis favorable à une retraite flexible et progressive à la carte, permettant le cumul emploi-retraite sans pénaliser ceux dont le métier use le corps.`,
      modelAnswerEn: `Demographic trends and extended healthy life expectancy challenge rigid, traditional retirement models.

On one hand, eliminating a mandatory retirement age values seniors' expertise, combats ageism, and allows those who wish to remain active to contribute to the economy amid labor shortages.

However, one must ensure that the freedom to work does not turn into an economic necessity for precarious workers. Furthermore, for physically grueling trades, the right to an early and dignified retirement must remain protected.

Ultimately, I favor a flexible, progressive retirement model enabling partial retirement and mentoring without penalizing those in physically demanding jobs.`,
      trapAlert: "• Abordez la distinction cruciale entre travail intellectuel et métiers pénibles.",
      trapAlertEn: "• Highlight the distinction between office work and physically demanding labor.",
      speakingCoach: "Concluez avec une vision humaniste et économique équilibrée.",
      speakingCoachEn: "Conclude with a balanced humanistic and economic resolution."
    }
  ],

  10: [
    {
      id: "tcf10-spk-1",
      paperNumber: 10,
      taskNumber: 1,
      title: "Tâche 1 : Entretien dirigé — Ambitions Professionnelles & Vie au Canada",
      titleEn: "Task 1: Directed Interview — Career Ambitions & Canadian Life",
      cefrTarget: "A1-B1",
      scenario: "Présentez-vous à l'examinateur en résumant votre parcours, vos ambitions de carrière à long terme au Canada et votre attachement à la langue française.",
      scenarioEn: "Introduce yourself to the examiner summarizing your career, long-term ambitions in Canada, and your commitment to the French language.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Certifiée FEI",
        gender: "female",
        openingPromptFrench: "Bonjour et bienvenue à cette dernière session d'expression orale. Pouvez-vous vous présenter, me détailler votre projet professionnel au Canada et m'expliquer la place de la langue française dans votre vie ?",
        openingPromptEnglish: "Hello and welcome to this final speaking examination. Could you introduce yourself, detail your professional project in Canada, and explain the place of the French language in your life?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 2,
      keyPhrases: ["Je m'appelle...", "J'exerce avec passion le métier de...", "Mon projet au Canada s'articule autour de...", "La langue française représente pour moi..."],
      recommendedConnectors: ["particulièrement", "de surcroît", "en conclusion"],
      modelAnswerB2C1: `Bonjour Madame. Je m'appelle Karim et je suis gestionnaire de projets dans les énergies renouvelables.

Au cours des huit dernières années, j'ai piloté des installations solaires et éoliennes d'envergure. Mon ambition au Canada est de rejoindre une entreprise innovante dans la transition énergétique et de participer aux grands projets de décarbonation au Québec et au Nouveau-Brunswick.

La langue française a toujours été au cœur de ma vie intellectuelle et professionnelle. C'est une langue de culture, de précision et d'ouverture qui me permettra de m'intégrer pleinement dans la société canadienne francophone.`,
      modelAnswerEn: `Hello. My name is Karim and I am a project manager in renewable energy.

Over the past eight years, I have led major solar and wind energy installation projects. My ambition in Canada is to join an innovative clean-tech firm and contribute to green decarbonization initiatives in Quebec and New Brunswick.

The French language has always been central to my intellectual and professional life. It is a language of culture, precision, and global connection that will allow me to integrate deeply into Canadian Francophone society.`,
      trapAlert: "• Concluez votre présentation avec enthousiasme et fierté francophone.",
      trapAlertEn: "• Conclude your self-presentation with pride in your French communication skills.",
      speakingCoach: "Terminez cette Tâche 1 avec assurance et clarté.",
      speakingCoachEn: "Deliver this Task 1 with poise, clear diction, and confidence."
    },
    {
      id: "tcf10-spk-2",
      paperNumber: 10,
      taskNumber: 2,
      title: "Tâche 2 : Interaction — Inscription à un Programme Universitaire Continu à McGill",
      titleEn: "Task 2: Interactive Role-Play — University Continuing Education at McGill",
      cefrTarget: "B1-C1",
      scenario: "Vous souhaitez vous inscrire à un certificat professionnel de perfectionnement en intelligence d'affaires à Montréal. Vous appelez la conseillère pédagogique pour poser 8 à 10 questions précises sur les critères d'admission, les bourses, le calendrier et les stages.",
      scenarioEn: "You wish to enroll in a professional certificate in business intelligence in Montreal. You call the academic advisor to ask 8 to 10 detailed questions about admissions, scholarships, schedules, and internships.",
      stimulusDocument: {
        title: "CERTIFICAT DE PERFECTIONNEMENT EN ANALYSE DE DONNÉES & IA",
        category: "Formation Universitaire pour Professionnels",
        organization: "École d'Éducation Permanente — Université de Montréal / McGill",
        content: "Programme accrédité de 30 crédits conçu pour les professionnels en emploi. Cours du soir et fin de semaine. Mentorat par des leaders industriels.",
        details: [
          "🎓 Diplôme universitaire reconnu par les ordres professionnels",
          "💰 Frais de scolarité : 4 200 $ CAD (Admissible aux prêts et bourses du gouvernement québécois)",
          "⏰ Formule hybride : 60 % en ligne interactif, 40 % en présentiel sur le campus",
          "💼 Stage optionnel en entreprise de 3 mois en fin de cursus",
          "📅 Rentrée : Sessions d'automne (septembre) et d'hiver (janvier)"
        ],
        contactInfo: "📍 688 Rue Sherbrooke Ouest, Montréal (QC) • 📞 514-555-0111 • ✉️ admission-continue@universite-montreal.ca"
      },
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Conseillère aux Admissions Universitaires",
        gender: "female",
        openingPromptFrench: "Bonjour ! Université de Montréal, Éducation Permanente, Élodie Martin à votre écoute. Quelles questions avez-vous concernant notre certificat professionnel en analyse de données ?",
        openingPromptEnglish: "Hello! University Continuing Education, Élodie Martin speaking. What questions do you have regarding our professional certificate in data analytics?"
      },
      prepTimeMins: 2,
      speakingTimeMins: 3.5,
      keyPhrases: [
        "Quels sont les diplômes préalables requis pour être admissible ?",
        "Une évaluation des acquis de l'expérience professionnelle est-elle possible ?",
        "Les étudiants internationaux sont-ils éligibles aux mêmes tarifs ?",
        "Le stage optionnel de fin de cursus est-il rémunéré par les entreprises partenaires ?",
        "Quel est le délai de réponse après l'envoi du dossier de candidature ?"
      ],
      recommendedConnectors: ["concernant", "dans quelle mesure", "serait-il possible de savoir"],
      modelAnswerB2C1: `— Bonjour Madame Martin. Je m'intéresse vivement à votre certificat professionnel en analyse de données.
— Tout d'abord, un diplôme universitaire obtenu à l'étranger nécessite-t-il une évaluation comparative officielle avant l'admission ?
— Acceptez-vous les candidatures basées sur l'expérience professionnelle si le diplôme d'origine est dans un autre domaine ?
— Concernant la formule hybride, les cours du soir ont-ils lieu à des horaires fixes en direct ou en différé ?
— Les étudiants nouvellement arrivés au Québec peuvent-ils bénéficier des bourses d'études et des prêts gouvernementaux ?
— Le stage de trois mois en entreprise est-il garanti par l'université ou l'étudiant doit-il démarcher les employeurs ?
— Ce stage en entreprise est-il généralement rémunéré par les partenaires technologiques ?
— Quelle est la date limite pour déposer mon dossier pour la rentrée d'automne ?`,
      modelAnswerEn: `— Hello Mrs. Martin. I am keenly interested in your professional certificate in data analytics.
— First, does a university degree earned abroad require an official comparative evaluation prior to admission?
— Do you accept applications based on professional experience if the original degree is in another field?
— Regarding the hybrid format, do evening classes take place live at fixed times or asynchronously?
— Can newly arrived residents in Quebec qualify for government student financial aid and bursaries?
— Is the three-month corporate internship arranged by the university or must students find employers independently?
— Is this corporate internship typically paid by partnering tech companies?
— What is the application deadline for the fall intake?`,
      trapAlert: "• Posez des questions précises sur l'insertion professionnelle et la reconnaissance des diplômes.",
      trapAlertEn: "• Ask precise questions about career placement and foreign credential recognition.",
      speakingCoach: "Structurez vos questions avec un vocabulaire académique et professionnel de haut niveau.",
      speakingCoachEn: "Structure your inquiries using formal academic and professional French."
    },
    {
      id: "tcf10-spk-3",
      paperNumber: 10,
      taskNumber: 3,
      title: "Tâche 3 : Point de vue — Le Bilinguisme et la Diversité Linguistique au Canada",
      titleEn: "Task 3: Expressing an Argumented Viewpoint — Bilingualism & Linguistic Diversity in Canada",
      cefrTarget: "B2-C2",
      scenario: "Le statut bilingue officiel du Canada et la protection de la langue française face à l'anglais prédominent dans les débats nationaux. Présentez un discours dialectique sur les atouts et les défis du bilinguisme canadien.",
      scenarioEn: "Canada's official bilingual status and protecting French alongside predominant English dominate national discourse. Present a dialectic argument on the assets and challenges of Canadian bilingualism.",
      examinerPersona: {
        name: "Mme Élodie Martin",
        role: "Examinatrice Senior FEI",
        gender: "female",
        openingPromptFrench: "Voici votre sujet de clôture : 'Le bilinguisme officiel constitue-t-il une force économique et culturelle majeure pour le Canada ou un défi complexe au quotidien ?' Développez votre analyse.",
        openingPromptEnglish: "Here is your closing topic: 'Does official bilingualism constitute a major economic and cultural asset for Canada or a complex daily challenge?' Present your analysis.",
        followUpCounterQuestion: "La prédominance mondiale de l'anglais ne rend-elle pas l'exigence du bilinguisme trop coûteuse pour les institutions publiques ?"
      },
      prepTimeMins: 0,
      speakingTimeMins: 4.5,
      keyPhrases: ["Le modèle linguistique canadien...", "C'est une richesse culturelle et un atout diplomatique...", "Toutefois, la préservation du français exige une vigilance constante...", "En conclusion, le bilinguisme incarne l'identité même du pays..."],
      recommendedConnectors: ["indéniablement", "en contrepoint", "force est de constater", "en somme"],
      modelAnswerB2C1: `Le bilinguisme institutionnel français-anglais constitue l'un des piliers fondateurs de l'identité et du rayonnement international du Canada.

D'une part, maîtriser les deux langues officielles confère un avantage économique et diplomatique considérable. Cela facilite les échanges avec la Francophonie internationale comme avec le monde anglophone, tout en enrichissant le capital culturel des citoyens et en favorisant l'inclusion.

D'autre part, dans un continent nord-américain massivement anglophone, la préservation de la vitalité du français exige des efforts constants, des investissements publics majeurs et des politiques linguistiques rigoureuses, particulièrement dans les milieux de travail et l'espace numérique.

En conclusion, loin d'être un fardeau, le bilinguisme représente une force motrice inestimable qui forge la spécificité démocratique et la tolérance canadienne.`,
      modelAnswerEn: `Institutional French-English bilingualism constitutes one of the founding pillars of Canada's identity and international prestige.

On one hand, mastering both official languages confers a massive economic and diplomatic advantage. It facilitates commerce with the global Francophonie as well as the Anglophone world, enriching citizens' cultural capital and fostering social inclusion.

On the other hand, in a predominantly Anglophone North American continent, preserving the vitality of French demands relentless efforts, major public investments, and robust language policies, especially in the workplace and digital space.

In conclusion, far from being a burden, bilingualism represents an invaluable driving force shaping Canadian democratic tolerance and uniqueness.`,
      trapAlert: "• Concluez votre épreuve orale avec une réflexion philosophique et institutionnelle élevée.",
      trapAlertEn: "• Conclude your speaking exam with high-level institutional and philosophical depth.",
      speakingCoach: "Utilisez les plus beaux connecteurs de la langue française pour couronner votre épreuve.",
      speakingCoachEn: "Use sophisticated French discourse markers to crown your oral examination."
    }
  ]
};

/**
 * Helper to fetch speaking tasks for a given paper ID or paper number
 */
export function getMasterSpeakingTasks(paperIdOrNumber: string | number): MasterSpeakingTask[] {
  let paperNum = 1;
  if (typeof paperIdOrNumber === "number") {
    paperNum = Math.min(10, Math.max(1, paperIdOrNumber));
  } else {
    const matched = paperIdOrNumber.match(/\d+/);
    if (matched) {
      paperNum = Math.min(10, Math.max(1, parseInt(matched[0], 10)));
    }
  }

  return MASTER_SPEAKING_BANK[paperNum] || MASTER_SPEAKING_BANK[1];
}
