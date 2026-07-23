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

// Built-in Sample Papers Registry
export const SAMPLE_TCF_PAPER: ExamPaper = {
  id: "tcf-canada-sample-1",
  title: "TCF Canada Official Mock Exam 1",
  code: "TCF-CAN-01",
  type: "TCF_CANADA",
  description: "Full-length official simulator for TCF Canada Express Entry PR Points (NCLC 7+ B2 Target).",
  totalDurationMins: 119,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Listen to French audio clips and answer multiple-choice questions.",
      durationMins: 35,
      totalQuestions: 6,
      questions: [
        {
          id: "tcf-lis-1",
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
          id: "tcf-lis-2",
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
          id: "tcf-lis-3",
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
      totalQuestions: 3,
      questions: [
        {
          id: "tcf-read-1",
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
          id: "tcf-read-2",
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
      totalQuestions: 3,
      writingTasks: [
        {
          id: "tcf-[#101828]-w1",
          taskNumber: 1,
          title: "Tâche 1 : Message court (Message to a Friend)",
          prompt: "Vous avez loué un appartement pour vos vacances mais le chauffage ne fonctionne pas. Écrivez un message au propriétaire (60 à 120 mots) pour expliquer la situation et demander une solution rapide.",
          wordCountMin: 60,
          wordCountMax: 120,
          timeLimitMins: 15,
          guidedTips: [
            "Salutation formelle ou semi-formelle (Bonjour M./Mme...)",
            "Expliquer le problème clairement (le chauffage ne fonctionne pas / il fait froid)",
            "Demander une intervention urgente",
            "Formule de politesse (Cordialement / Dans l'attente de votre retour)"
          ],
          sampleResponse: "Bonjour Monsieur Dupont,\n\nJe vous contacte concernant l'appartement que je loue cette semaine. Malheureusement, le chauffage ne fonctionne pas du tout depuis ce matin et la température est très basse.\n\nPourriez-vous envoyer un technicien dans les plus brefs délais ?\n\nJe vous remercie d'avance pour votre aide.\n\nCordialement,\nJean Martin"
        },
        {
          id: "tcf-w2",
          taskNumber: 2,
          title: "Tâche 2 : Compte-rendu ou Article de Blog",
          prompt: "Racontez dans un blog (120 à 150 mots) une expérience marquante de voyage écologique que vous avez faite récemment.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: [
            "Introduction captivante (Lieu, date, contexte)",
            "Description des actions écologiques (train, vélo, hébergement vert)",
            "Réflexion personnelle et conclusion"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive oral interaction with AI examiner feedback.",
      durationMins: 12,
      totalQuestions: 3,
      speakingTasks: [
        {
          id: "tcf-spk-1",
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
          ],
          aiCoachPrompt: "Ensure you speak continuously for 2 minutes using clear present tense and connector words like 'de plus' and 'en effet'."
        }
      ]
    }
  ]
};

export const SAMPLE_TEF_PAPER: ExamPaper = {
  id: "tef-canada-sample-1",
  title: "TEF Canada Official Mock Exam 1",
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
      totalQuestions: 4,
      questions: [
        {
          id: "tef-lis-1",
          questionNumber: 1,
          text: "Annonce dans un aéroport : 'Le vol Air Canada 870 à destination de Paris-CDG est retardé de 45 minutes en raison du dégivrage de l'appareil.' Quelle est la cause du retard ?",
          options: [
            "Une grève du personnel navigant.",
            "Des opérations de dégivrage de l'avion.",
            "La perte des bagages de soute.",
            "Une panne d'électricité à l'aéroport."
          ],
          correctIndex: 1,
          explanation: "The announcement specifically attributes the delay to 'dégivrage de l'appareil' (de-icing).",
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
      totalQuestions: 3,
      questions: [
        {
          id: "tef-read-1",
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
      totalQuestions: 2,
      writingTasks: [
        {
          id: "tef-w1",
          taskNumber: 1,
          title: "Section A : Article de Fait Divers (Newspaper Item)",
          prompt: "Terminez l'article à partir de la première phrase suivante (80 mots minimum) : 'Hier après-midi, un chat a bloqué la circulation du pont Jacques-Cartier pendant deux heures...'",
          wordCountMin: 80,
          wordCountMax: 120,
          timeLimitMins: 25,
          guidedTips: [
            "Employer le passé composé et l'imparfait",
            "Décrire l'intervention de la police ou des pompiers",
            "Conclure par la fin heureuse de l'incident"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Section A (Information Gathering) and Section B (Persuasive Argumentation).",
      durationMins: 15,
      totalQuestions: 2,
      speakingTasks: [
        {
          id: "tef-spk-1",
          taskNumber: 1,
          title: "Section A : Demande d'informations (10-12 Questions)",
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

export function getExamRegistry(): ExamPaper[] {
  return [SAMPLE_TCF_PAPER, SAMPLE_TEF_PAPER];
}
