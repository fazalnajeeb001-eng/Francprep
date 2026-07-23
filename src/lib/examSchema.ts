export type ExamType = "TCF_CANADA" | "TEF_CANADA";
export type ExamMode = "EXAM" | "PRACTICE";
export type SectionType = "COMPREHENSION_ORALE" | "COMPREHENSION_ECRITE" | "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  audioUrl?: string;
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
  aiCoachPrompt?: string;
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

// ─── 1. OFFICIAL TCF CANADA PAPER 1 (TCF-CAN-01) ───
export const SAMPLE_TCF_PAPER_1: ExamPaper = {
  id: "tcf-canada-sample-1",
  title: "TCF Canada Official Practice Paper 1",
  code: "TCF-CAN-01",
  type: "TCF_CANADA",
  description: "Full-length official FEI standard simulator for TCF Canada Express Entry PR Points.",
  totalDurationMins: 119,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Listen to French audio clips and answer multiple-choice questions.",
      durationMins: 35,
      totalQuestions: 3,
      questions: [
        {
          id: "tcf1-lis-1",
          questionNumber: 1,
          text: "Vous entendez ce message à la radio : 'Attention, en raison de travaux sur la ligne 4, la station Châtelet sera fermée tout le week-end.' Quel est l'objectif de ce message ?",
          options: [
            "Annoncer l'ouverture d'une nouvelle ligne.",
            "Informer d'une interruption de trafic le week-end.",
            "Proposer des réductions sur les billets de métro.",
            "Inviter les usagers à une inauguration."
          ],
          correctIndex: 1,
          explanation: "The message warns about a station closure over the weekend due to construction work.",
          hint: "Focus on words like 'station fermée tout le week-end'.",
          transcript: "Attention, en raison de travaux sur la ligne 4, la station Châtelet sera fermée tout le week-end. Merci de prendre vos dispositions.",
          transcriptEnglish: "Attention, due to maintenance on line 4, Châtelet station will be closed all weekend. Please make alternative arrangements."
        },
        {
          id: "tcf1-lis-2",
          questionNumber: 2,
          text: "Une amie vous laisse un message vocal : 'Salut ! Je suis devant le café, mais il pleut trop. Je t'attends à l'intérieur près de la fenêtre.' Où se trouve l'amie ?",
          options: [
            "Dans sa voiture.",
            "Sous un parapluie dans la rue.",
            "À l'intérieur du café.",
            "À la station de bus."
          ],
          correctIndex: 2,
          explanation: "She explicitly says 'Je t'attends à l'intérieur' (I'm waiting inside).",
          hint: "Listen for location keywords like 'à l'intérieur'.",
          transcript: "Salut ! Je suis devant le café, mais il pleut trop. Je t'attends à l'intérieur près de la fenêtre.",
          transcriptEnglish: "Hi! I'm in front of the café, but it's raining too hard. I'm waiting for you inside near the window."
        },
        {
          id: "tcf1-lis-3",
          questionNumber: 3,
          text: "Dans un extrait de conférence sur le télétravail : 'L'autonomie offerte par le travail à distance nécessite une gestion rigoureuse du temps.' Que recommande l'intervenant ?",
          options: [
            "Supprimer toutes les réunions d'équipe.",
            "Développer une organisation stricte du temps de travail.",
            "Travailler exclusivement le week-end.",
            "Préférer le travail en présentiel."
          ],
          correctIndex: 1,
          explanation: "'Gestion rigoureuse du temps' means strict time organization.",
          hint: "Rigoureuse = strict / disciplined.",
          transcript: "L'autonomie offerte par le travail à distance nécessite une gestion rigoureuse du temps afin d'éviter le surmenage.",
          transcriptEnglish: "The autonomy offered by remote work requires rigorous time management to avoid burnout."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Read French articles, emails, and academic texts to test your reading comprehension.",
      durationMins: 60,
      totalQuestions: 2,
      questions: [
        {
          id: "tcf1-read-1",
          questionNumber: 1,
          passage: "Bibliothèque Municipale de Montréal : Chers usagers, les retards de retour de livres ne donneront plus lieu à des pénalités financières à compter du 1er septembre. Nous vous invitons toutefois à rapporter les ouvrages à temps pour en faire profiter les autres lecteurs.",
          passageEnglish: "Montreal Municipal Library: Dear patrons, late book returns will no longer incur financial penalties starting September 1st. However, we encourage you to return books on time for other readers.",
          text: "Quelle est la décision principale annoncée par la bibliothèque ?",
          options: [
            "L'augmentation des tarifs d'abonnement.",
            "La suppression des amendes pour retards.",
            "La fermeture définitive de la bibliothèque.",
            "L'obligation d'acheter les livres en retard."
          ],
          correctIndex: 1,
          explanation: "'ne donneront plus lieu à des pénalités financières' means penalties are eliminated.",
          hint: "Look for 'pénalités financières' in the text."
        },
        {
          id: "tcf1-read-2",
          questionNumber: 2,
          passage: "Économie Circulaire au Québec : Le réemploi d'équipements électroniques usagés connaît une croissance de 25% cette année. Les centres de reconditionnement agréés permettent de prolonger la durée de vie des appareils tout en créant des emplois locaux.",
          passageEnglish: "Circular Economy in Quebec: The reuse of pre-owned electronic equipment has grown by 25% this year. Certified refurbishing centers extend device lifespan while creating local jobs.",
          text: "Quel est l'un des bénéfices majeurs mentionnés dans le texte ?",
          options: [
            "La baisse du salaire des employés.",
            "La création d'emplois locaux et la baisse des déchets.",
            "L'arrêt complet des importations d'ordinateurs.",
            "La fermeture des usines d'électronique."
          ],
          correctIndex: 1,
          explanation: "The article highlights creating local jobs ('créant des emplois locaux') and device longevity.",
          hint: "Notice 'créant des emplois locaux'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Compose short messages, social articles, and argumentative essays.",
      durationMins: 60,
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tcf1-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message court (Message to a Landlord)",
          prompt: "Vous avez loué un appartement pour vos vacances mais le chauffage ne fonctionne pas. Écrivez un message au propriétaire (60 à 120 mots) pour expliquer la situation et demander une solution rapide.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: [
            "Salutation formelle (Bonjour Monsieur/Madame)",
            "Expliquer l'absence de chauffage",
            "Demander une réparation urgente",
            "Formule de politesse finale"
          ],
          sampleResponse: "Bonjour Monsieur Dupont,\n\nJe vous écris car le chauffage de l'appartement ne fonctionne pas depuis ce matin. La température est très basse.\n\nPourriez-vous faire venir un réparateur au plus vite ?\n\nMerci d'avance.\n\nCordialement,\nJean Martin"
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive oral interaction with AI examiner feedback.",
      durationMins: 12,
      totalQuestions: 1,
      speakingTasks: [
        {
          id: "tcf1-spk-1",
          taskNumber: 1,
          title: "Tâche 1 : Entretien dirigé (Personal Presentation)",
          scenario: "Présentez-vous à l'examinateur. Parlez de votre parcours professionnel, de vos centres d'intérêt et de vos motivations pour vous installer au Canada.",
          prepTimeMins: 0,
          speakingTimeMins: 2,
          keyPhrases: [
            "Je m'appelle...",
            "Actuellement, je travaille en tant que...",
            "Mon objectif principal au Canada est...",
            "Dans mon temps libre, j'aime..."
          ]
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
  description: "Advanced TCF Canada examination paper for Express Entry NCLC 8 / B2 Vantage targets.",
  totalDurationMins: 119,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, interviews, and public service announcements.",
      durationMins: 35,
      totalQuestions: 2,
      questions: [
        {
          id: "tcf2-lis-1",
          questionNumber: 1,
          text: "Message à la gare de Lyon : 'Le TGV numéro 6820 à destination de Marseille partira de la voie 12. L'accès au train sera fermé 2 minutes avant le départ.' Que doivent faire les voyageurs ?",
          options: [
            "Montez immédiatement en voiture avant la fermeture des portes.",
            "Changer de billet au guichet principal.",
            "Attendre le prochain train pour Marseille.",
            "Demander un remboursement immédiat."
          ],
          correctIndex: 0,
          explanation: "Access closes 2 minutes prior, so passengers must board immediately.",
          hint: "Notice 'l'accès au train sera fermé 2 minutes avant'.",
          transcript: "Le TGV numéro 6820 à destination de Marseille partira de la voie 12. L'accès au train sera fermé 2 minutes avant le départ.",
          transcriptEnglish: "TGV 6820 to Marseille will depart from platform 12. Train access closes 2 minutes prior to departure."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles and environmental press reports.",
      durationMins: 60,
      totalQuestions: 2,
      questions: [
        {
          id: "tcf2-read-1",
          questionNumber: 1,
          passage: "Transition Énergétique en France : L'installation de panneaux solaires chez les particuliers a quadruplé en trois ans. Les aides gouvernementales et la hausse des tarifs d'électricité encouragent l'autoconsommation.",
          passageEnglish: "Energy Transition in France: Solar panel installations by home owners have quadrupled in three years. Government subsidies and rising electricity costs spur self-consumption.",
          text: "Pourquoi l'installation de panneaux solaires augmente-t-elle ?",
          options: [
            "Grâce aux subventions publiques et à la hausse du prix de l'électricité.",
            "En raison de l'interdiction des éoliennes.",
            "Parce que les panneaux solaires sont devenus gratuits.",
            "À cause de la baisse du nombre de centrales."
          ],
          correctIndex: 0,
          explanation: "Government aid ('aides gouvernementales') and electricity cost hikes spur installations.",
          hint: "Look for 'aides gouvernementales et la hausse des tarifs'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Argumentative essay writing for Canadian Express Entry.",
      durationMins: 60,
      totalQuestions: 1,
      writingTasks: [
        {
          id: "tcf2-w1",
          taskNumber: 1,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: [
            "Introduction présentatant le débat",
            "Argument 1 avec exemple précis (environnement ou pouvoir d'achat)",
            "Argument 2 (coût financier pour la municipalité)",
            "Conclusion claire affirmant votre prise de position"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive debate with oral examiner.",
      durationMins: 12,
      totalQuestions: 1,
      speakingTasks: [
        {
          id: "tcf2-spk-1",
          taskNumber: 1,
          title: "Tâche 3 : Expression d'un point de vue (Oral Debate)",
          scenario: "Que pensez-vous du travail à distance généralisé ? Présentez les avantages et les inconvénients puis donnez votre avis personnel à l'examinateur.",
          prepTimeMins: 1,
          speakingTimeMins: 4.5,
          keyPhrases: [
            "Selon moi...",
            "D'un côté..., mais d'un autre côté...",
            "En ce qui concerne les avantages...",
            "Pour conclure, je dirais que..."
          ]
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
  description: "Full-length simulator tailored for TEF Canada Paris Chamber of Commerce (CCI) standards.",
  totalDurationMins: 135,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, public announcements, and conversations.",
      durationMins: 40,
      totalQuestions: 2,
      questions: [
        {
          id: "tef1-lis-1",
          questionNumber: 1,
          text: "Annonce dans un aéroport : 'Le vol Air Canada 870 à destination de Paris-CDG est retardé de 45 minutes en raison du dégivrage de l'appareil.' Quelle est la cause du retard ?",
          options: [
            "Une grève du personnel navigant.",
            "Des opérations de dégivrage de l'avion.",
            "La perte des bagages de soute.",
            "Une panne d'électricité à l'aéroport."
          ],
          correctIndex: 1,
          explanation: "The announcement attributes the delay to 'dégivrage de l'appareil' (de-icing).",
          hint: "Listen for 'en raison du dégivrage'.",
          transcript: "Le vol Air Canada 870 à destination de Paris-CDG est retardé de 45 minutes en raison du dégivrage de l'appareil.",
          transcriptEnglish: "Air Canada flight 870 to Paris-CDG is delayed by 45 minutes due to aircraft de-icing."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles, administrative documents, and synthesis questions.",
      durationMins: 60,
      totalQuestions: 2,
      questions: [
        {
          id: "tef1-read-1",
          questionNumber: 1,
          passage: "Transport collectif gratuit à Dunkerque : Cinq ans après la gratuité totale des bus, la ville constate une hausse de 85% de la fréquentation et une réduction notable de l'usage de la voiture individuelle en centre-ville.",
          passageEnglish: "Free public transit in Dunkirk: Five years after implementing free buses, the city reports an 85% increase in ridership and a notable drop in private car usage downtown.",
          text: "Quel est le résultat principal observé à Dunkerque ?",
          options: [
            "Une augmentation de l'usage de la voiture.",
            "Une hausse massive de la fréquentation des bus.",
            "La faillite des entreprises de transport.",
            "La fermeture des lignes de bus."
          ],
          correctIndex: 1,
          explanation: "The text notes an 85% increase in bus ridership ('hausse de 85% de la fréquentation').",
          hint: "Focus on 'hausse de 85%'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section A (Fait divers article) and Section B (Argumentative letter).",
      durationMins: 60,
      totalQuestions: 1,
      writingTasks: [
        {
          id: "tef1-w1",
          taskNumber: 1,
          title: "Section A : Article de Fait Divers (Newspaper Article Continuation)",
          prompt: "Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          guidedTips: [
            "Employer le passé composé et l'imparfait",
            "Décrire l'intervention des pompiers",
            "Conclure par la réouverture de la circulation"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section A (Information Gathering) and Section B (Persuasive Argumentation).",
      durationMins: 15,
      totalQuestions: 1,
      speakingTasks: [
        {
          id: "tef1-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (10 Questions)",
          scenario: "Vous voyez une annonce pour une offre d'emploi à mi-temps dans un journal. Appelez le recruteur pour poser au moins 10 questions sur le poste.",
          prepTimeMins: 0,
          speakingTimeMins: 5,
          keyPhrases: [
            "Quelles sont les heures de travail ?",
            "Quel est le salaire proposé ?",
            "Quelles sont les qualifications requises ?"
          ]
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
  description: "Advanced TEF Canada examination paper tailored for CCI Paris standards.",
  totalDurationMins: 135,
  isSamplePaper: false,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Radio interviews and complex dialogs.",
      durationMins: 40,
      totalQuestions: 2,
      questions: [
        {
          id: "tef2-lis-1",
          questionNumber: 1,
          text: "Bulletin d'information météorologique : 'Météo Canada émet un avertissement de tempête hivernale pour le sud du Québec. Les automobilistes sont invités à éviter tout déplacement inutile.' Quelle est la consigne officielle ?",
          options: [
            "Limiter les déplacements en voiture au strict nécessaire.",
            "Prendre l'autoroute uniquement à grande vitesse.",
            "Partir immédiatement en voyage vers le nord.",
            "Fermer les stations de gaz propane."
          ],
          correctIndex: 0,
          explanation: "Official directive is to avoid unnecessary travel ('éviter tout déplacement inutile').",
          hint: "Focus on 'éviter tout déplacement inutile'.",
          transcript: "Météo Canada émet un avertissement de tempête hivernale pour le sud du Québec. Les automobilistes sont invités à éviter tout déplacement inutile.",
          transcriptEnglish: "Environment Canada issues a winter storm warning for southern Quebec. Drivers are urged to avoid non-essential travel."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Editorial columns and economic synthesis.",
      durationMins: 60,
      totalQuestions: 2,
      questions: [
        {
          id: "tef2-read-1",
          questionNumber: 1,
          passage: "Urbanisme Vert à Vancouver : La municipalité impose désormais la présence de toits végétaux sur tous les nouveaux édifices commerciaux afin de lutter contre les îlots de chaleur urbains.",
          passageEnglish: "Green Urbanism in Vancouver: The city now mandates green roofs on all new commercial buildings to combat urban heat island effects.",
          text: "Quel est l'objectif de la mesure adoptée à Vancouver ?",
          options: [
            "Réduire l'effet d'îlot de chaleur urbain.",
            "Augmenter le nombre de parkings en centre-ville.",
            "Interdire la construction de tours de bureaux.",
            "Remplacer le réseau de métro aérien."
          ],
          correctIndex: 0,
          explanation: "Green roofs combat urban heat island effects ('lutter contre les îlots de chaleur urbains').",
          hint: "Notice 'lutter contre les îlots de chaleur'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section B (Formal Persuasive Letter to an Editor).",
      durationMins: 60,
      totalQuestions: 1,
      writingTasks: [
        {
          id: "tef2-w1",
          taskNumber: 1,
          title: "Section B : Lettre d'argumentation (Letter to a Friend / Newspaper)",
          prompt: "Un de vos amis refuse d'utiliser le recyclage et jette tout dans les poubelles ordinaires. Écrivez-lui une lettre persuasive (200 mots minimum) pour le convaincre d'adopter des habitudes écologiques.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: [
            "Salutation amicale",
            "Exprimer sa surprise tout en restant bienveillant",
            "Présenter 2 arguments environnementaux concrets",
            "Proposer des gestes simples pour commencer dès aujourd'hui"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section B (Persuasive Oral Argumentation).",
      durationMins: 15,
      totalQuestions: 1,
      speakingTasks: [
        {
          id: "tef2-spk-1",
          taskNumber: 1,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Votre ami hésite à participer à un programme de bénévolat communautaire le week-end. Convainquez-le de s'inscrire avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: [
            "Tu sais, c'est une opportunité unique pour...",
            "Je comprends ton hésitation, mais pense au fait que...",
            "On pourrait y aller ensemble, ce sera beaucoup plus amusant !"
          ]
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
