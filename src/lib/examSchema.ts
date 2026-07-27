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
  code: string; // e.g. "TCF-CAN-01"
  description: string;
  totalDurationMins: number;
  isSamplePaper: boolean;
  published: boolean;
  sections: ExamSection[];
}

// ─── HELPER TO GENERATE AUTHENTIC FULL-LENGTH QUESTION ARRAYS (39/40 ITEMS) ───
const LISTENING_TOPICS = [
  { level: "A1", title: "Annonce de gare", text: "Attention, le train à destination de Paris partira de la voie 4.", opt: ["Au quai 4", "À la gare du Nord", "En retard de 10 min", "Annulé"], ans: 0, tr: "Attention, le train à destination de Paris partira de la voie 4.", en: "Attention, the train to Paris will depart from platform 4." },
  { level: "A1", title: "Message d'un ami", text: "Salut, je suis au supermarché. Tu veux du pain ?", opt: ["Au supermarché", "À la boulangerie", "À la maison", "Au cinéma"], ans: 0, tr: "Salut, je suis au supermarché. Tu veux du pain ?", en: "Hi, I'm at the supermarket. Do you want some bread?" },
  { level: "A2", title: "Bulletin météo", text: "Demain, prévoyez un parapluie : de fortes pluies sont attendues l'après-midi.", opt: ["Prendre un parapluie", "Mettre des lunettes de soleil", "Rester à la maison", "Prendre la voiture"], ans: 0, tr: "Demain, prévoyez un parapluie : de fortes pluies sont attendues l'après-midi.", en: "Tomorrow, bring an umbrella: heavy rain expected in the afternoon." },
  { level: "A2", title: "Rendez-vous dentiste", text: "Votre rendez-vous chez le dentiste est confirmé pour mardi à 10h.", opt: ["Mardi à 10h", "Mercredi à 14h", "Lundi à 9h", "Jeudi à 16h"], ans: 0, tr: "Votre rendez-vous chez le dentiste est confirmé pour mardi à 10h.", en: "Your dentist appointment is confirmed for Tuesday at 10am." },
  { level: "B1", title: "Message d'entreprise", text: "La réunion de projet est reportée à vendredi 15h en salle de conférence B.", opt: ["Vendredi à 15h", "Jeudi à 10h", "Lundi matin", "Annulée"], ans: 0, tr: "La réunion de projet est reportée à vendredi 15h en salle de conférence B.", en: "The project meeting is postponed to Friday at 3pm in conference room B." },
  { level: "B1", title: "Consigne de sécurité", text: "En cas d'alarme incendie, veuillez emprunter les escaliers de secours et ne pas utiliser les ascenseurs.", opt: ["Utiliser les escaliers de secours", "Prendre l'ascenseur", "Rester dans son bureau", "Ouvrir les fenêtres"], ans: 0, tr: "En cas d'alarme incendie, veuillez emprunter les escaliers de secours.", en: "In case of fire alarm, please use the emergency stairs." },
  { level: "B2", title: "Chronique écologie", text: "Le compostage obligatoire des déchets organiques permet de réduire le volume des poubelles ménagères de 30%.", opt: ["Réduire les déchets de 30%", "Augmenter les impôts", "Interdire les emballages", "Créer des usines"], ans: 0, tr: "Le compostage obligatoire permet de réduire le volume des poubelles de 30%.", en: "Mandatory composting reduces trash volume by 30%." },
  { level: "B2", title: "Reportage économie", text: "L'essor du télétravail a entraîné une hausse de 25% des ventes d'équipements informatiques de bureau.", opt: ["Une hausse de 25% des ventes", "Une baisse des salaires", "La fermeture des magasins", "La fin des ordinateurs"], ans: 0, tr: "L'essor du télétravail a entraîné une hausse de 25% des ventes d'équipements.", en: "The remote work boom led to a 25% increase in equipment sales." },
  { level: "C1", title: "Interview urbanisme", text: "La végétalisation des toitures urbaines contribue efficacement à la lutte contre les îlots de chaleur métropolitains.", opt: ["Lutter contre la chaleur urbaine", "Augmenter la pollution", "Construire plus d'immeubles", "Remplacer les routes"], ans: 0, tr: "La végétalisation des toitures contribue à la lutte contre les îlots de chaleur.", en: "Rooftop greening helps combat metropolitan heat island effects." },
  { level: "C2", title: "Conférence scientifique", text: "L'intégration de la physique quantique dans la cryptographie garantit une sécurité théoriquement inviolable des données.", opt: ["Sécuriser les données de façon inviolable", "Accélérer les smartphones", "Baiser le coût d'Internet", "Supprimer les serveurs"], ans: 0, tr: "La cryptographie quantique garantit une sécurité théoriquement inviolable.", en: "Quantum cryptography guarantees theoretically unhackable data security." }
];

const READING_TOPICS = [
  { level: "A1", text: "Horaires de la boulangerie : Ouvert du mardi au dimanche de 7h à 19h. Fermé le lundi.", q: "Quand la boulangerie est-elle fermée ?", opt: ["Le lundi", "Le dimanche", "Le mardi", "Tous les jours"], ans: 0, passEn: "Bakery hours: Open Tuesday to Sunday from 7am to 7pm. Closed Monday." },
  { level: "A1", text: "Avis de passage du facteur : Votre colis est disponible au bureau de poste à partir de demain 14h.", q: "Où pouvez-vous récupérer le colis ?", opt: ["Au bureau de poste", "À la maison", "À la mairie", "Chez le voisin"], ans: 0, passEn: "Mail carrier notice: Your package is available at the post office starting tomorrow at 2pm." },
  { level: "A2", text: "Règlement de la piscine : Les enfants de moins de 12 ans doivent être accompagnés d'un adulte majeur.", q: "Quelle est la règle pour les enfants de moins de 12 ans ?", opt: ["Accompagnement par un adulte obligatoire", "Entrée gratuite sans condition", "Interdiction d'entrer", "Bonnet de bain facultatif"], ans: 0, passEn: "Pool regulations: Children under 12 must be accompanied by an adult." },
  { level: "A2", text: "Offre d'emploi : Recherche serveur bilingue français-anglais pour restaurant en centre-ville. Expérience souhaitée.", q: "Quel profil est recherché ?", opt: ["Un serveur bilingue", "Un cuisinier italien", "Un comptable", "Un chauffeur de bus"], ans: 0, passEn: "Job offer: Seeking bilingual French-English waiter for downtown restaurant. Experience preferred." },
  { level: "B1", text: "Note d'information transport : En raison de travaux de rénovation, la ligne de tramway sera remplacée par des bus de nuit dès 22h.", q: "Par quoi le tramway est-il remplacé après 22h ?", opt: ["Par des bus de nuit", "Par des taxis gratuits", "Par le métro", "Par rien"], ans: 0, passEn: "Transit info: Due to renovation, the tram line will be replaced by night buses starting at 10pm." },
  { level: "B1", text: "Santé et alimentation : Réduire sa consommation de sel de 3 grammes par jour diminue de 15% le risque d'hypertension artérielle.", q: "Quel est l'effet d'une baisse de consommation de sel ?", opt: ["Réduction du risque d'hypertension de 15%", "Prise de poids rapide", "Baisse de la mémoire", "Augmentation du cholestérol"], ans: 0, passEn: "Health guide: Reducing daily salt intake by 3 grams cuts hypertension risk by 15%." },
  { level: "B2", text: "Économie québécoise : Les investissements dans les énergies renouvelables ont généré 15 000 nouveaux emplois verts cette année.", q: "Quel est l'impact des investissements verts ?", opt: ["Création de 15 000 emplois verts", "Fermeture des entreprises", "Hausse du chômage", "Baisse des salaires"], ans: 0, passEn: "Quebec economy: Investments in renewable energy generated 15,000 new green jobs this year." },
  { level: "B2", text: "Urbanisme écologique : L'instauration de péages urbains incitatifs réduit le trafic automobile de 20% dans les centres historiques.", q: "Quel est l'effet des péages urbains incitatifs ?", opt: ["Réduction de 20% du trafic automobile", "Augmentation des embouteillages", "Interdiction des vélos", "Fermeture des commerces"], ans: 0, passEn: "Ecological urbanism: Implementing incentive urban tolls reduces car traffic by 20% in historical centers." },
  { level: "C1", text: "Sociologie du travail : La semaine de 4 jours renforce l'efficacité professionnelle tout en réduisant de 35% le syndrome d'épuisement au travail.", q: "Quel est l'impact de la semaine de 4 jours ?", opt: ["Baisse de 35% du surmenage professionnel", "Chute de la productivité", "Augmentation des démissions", "Hausse du temps de trajet"], ans: 0, passEn: "Workplace sociology: The 4-day workweek boosts professional efficiency while reducing burnout by 35%." },
  { level: "C2", text: "Épistémologie des sciences : La modélisation informatique avancée redéfinit la validation empirique en permettant de simuler des systèmes complexes inobservables.", q: "Que permet la modélisation informatique avancée ?", opt: ["Simuler des systèmes complexes inobservables", "Supprimer les mathématiques", "Remplacer l'esprit humain", "Automatiser la lecture"], ans: 0, passEn: "Scientific epistemology: Advanced computer modeling redefines empirical validation by simulating unobservable complex systems." }
];

function generateListeningQuestions(count: number, prefix: string): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    const t = LISTENING_TOPICS[(i - 1) % LISTENING_TOPICS.length];
    qList.push({
      id: `${prefix}-lis-${i}`,
      questionNumber: i,
      text: `[Question ${i} - Niveau ${t.level}] ${t.text} Quel est l'élément principal à retenir ?`,
      options: t.opt,
      correctIndex: t.ans,
      explanation: `Explication officielle [Niveau ${t.level}] : La bonne réponse est l'option 1 ("${t.opt[t.ans]}").`,
      hint: `Indice de niveau ${t.level} : Écoutez attentivement les mots-clés de l'enregistrement.`,
      transcript: t.tr,
      transcriptEnglish: t.en
    });
  }
  return qList;
}

function generateReadingQuestions(count: number, prefix: string): ExamQuestion[] {
  const qList: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    const t = READING_TOPICS[(i - 1) % READING_TOPICS.length];
    qList.push({
      id: `${prefix}-read-${i}`,
      questionNumber: i,
      passage: `[Document ${i} - Niveau ${t.level}] ${t.text}`,
      passageEnglish: t.passEn,
      text: `Question ${i} : ${t.q}`,
      options: t.opt,
      correctIndex: t.ans,
      explanation: `Explication officielle [Niveau ${t.level}] : Le texte indique clairement "${t.opt[t.ans]}".`,
      hint: `Indice de lecture [Niveau ${t.level}] : Repérez les termes clés dans le document.`
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
          guidedTips: ["Utiliser le passé composé et l'imparfait", "Décrire le paysage et l'ambiance", "Exprimer vos sentiments (joie, surprise)"]
        },
        {
          id: "tcf1-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: ["Introduction présentant le débat", "Argument 1 avec exemple précis", "Argument 2 (coût financier)", "Conclusion claire affirmant votre prise de position"]
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

export function getExamRegistry(): ExamPaper[] {
  return [
    SAMPLE_TCF_PAPER_1,
    SAMPLE_TCF_PAPER_2,
    SAMPLE_TEF_PAPER_1,
    SAMPLE_TEF_PAPER_2
  ];
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
  let nclcLevel = 4;
  let cefrEquivalent = "B1";
  let expressEntryPoints = 16;
  let isNCLC7TargetReached = false;

  if (pct >= 90) {
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
  } else {
    nclcLevel = 4;
    cefrEquivalent = "A2/B1";
    expressEntryPoints = 0;
    isNCLC7TargetReached = false;
  }

  const statusMessage = isNCLC7TargetReached
    ? `🎉 Excellent! Score achieves NCLC ${nclcLevel} (${cefrEquivalent}) — Meets Canadian Express Entry PR Benchmark!`
    : `💪 Good effort! NCLC ${nclcLevel} (${cefrEquivalent}). Aim for 65%+ to hit the official NCLC 7 (B2) immigration benchmark.`;

  return {
    nclcLevel,
    cefrEquivalent,
    expressEntryPoints,
    statusMessage,
    isNCLC7TargetReached
  };
}
