export interface DELFQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

export interface DELFSection {
  id: string;
  title: string;
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  instructions: string;
  audioUrl?: string;
  transcript?: string;
  readingPassage?: string;
  writingPrompt?: string;
  speakingPrompt?: string;
  questions?: DELFQuestion[];
  durationMinutes: number;
}

export interface DELFExamPaper {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  diplomaType: 'DELF' | 'DALF';
  totalDurationMinutes: number;
  passingScorePercentage: number;
  sections: DELFSection[];
}

export const OFFICIAL_DELF_DALF_PAPERS: DELFExamPaper[] = [
  // ─── DELF A1 MILESTONE EXAM PAPER ───
  {
    id: 'delf-a1-official-1',
    title: 'DELF A1 Diplôme d\'Études en Langue Française — Epreuve Officielle',
    level: 'A1',
    diplomaType: 'DELF',
    totalDurationMinutes: 80,
    passingScorePercentage: 70,
    sections: [
      {
        id: 'a1-listening',
        title: 'Épreuve 1: Compréhension de l\'oral (Listening)',
        type: 'listening',
        instructions: 'Vous allez entendre deux documents sonores. Répondez aux questions.',
        transcript: 'Bonjour Thomas ! Tu es disponible samedi soir ? On organise un dîner chez Marie à 19h30. N\'oublie pas d\'apporter des fruits !',
        durationMinutes: 20,
        questions: [
          {
            id: 'a1-l1',
            type: 'multiple_choice',
            question: 'À quelle heure est prévu le dîner ?',
            options: ['18h30', '19h30', '20h00', '20h30'],
            correctAnswer: 1,
            points: 5,
          },
          {
            id: 'a1-l2',
            type: 'multiple_choice',
            question: 'Que doit apporter Thomas ?',
            options: ['Du pain', 'Du fromage', 'Des fruits', 'Une boisson'],
            correctAnswer: 2,
            points: 5,
          },
        ],
      },
      {
        id: 'a1-reading',
        title: 'Épreuve 2: Compréhension des écrits (Reading)',
        type: 'reading',
        instructions: 'Lisez le document et répondez aux questions.',
        readingPassage: 'Avis aux étudiants : La bibliothèque municipale sera fermée le lundi 14 juillet (fête nationale). Ouverture exceptionnelle le dimanche 13 juillet de 10h à 18h.',
        durationMinutes: 30,
        questions: [
          {
            id: 'a1-r1',
            type: 'multiple_choice',
            question: 'Pourquoi la bibliothèque est-elle fermée le 14 juillet ?',
            options: ['Pour travaux', 'Fête nationale', 'Congés d\'été', 'Week-end normal'],
            correctAnswer: 1,
            points: 5,
          },
          {
            id: 'a1-r2',
            type: 'multiple_choice',
            question: 'Quelles sont les heures d\'ouverture du dimanche 13 juillet ?',
            options: ['08h - 16h', '09h - 17h', '10h - 18h', 'Fermé toute la journée'],
            correctAnswer: 2,
            points: 5,
          },
        ],
      },
      {
        id: 'a1-writing',
        title: 'Épreuve 3: Production écrite (Writing)',
        type: 'writing',
        instructions: 'Rédigez un message à un ami français pour lui décrire votre appartement (40 à 50 mots).',
        writingPrompt: 'Vous habitez un nouvel appartement à Paris. Écrivez une carte postale ou un courriel à un ami français pour lui présenter votre logement (nombre de pièces, endroit, meubles).',
        durationMinutes: 15,
      },
      {
        id: 'a1-speaking',
        title: 'Épreuve 4: Production orale (Speaking)',
        type: 'speaking',
        instructions: 'Entretien dirigé et jeu de rôle oral (5 à 7 minutes).',
        speakingPrompt: 'Présentez-vous (nom, âge, nationalité, ville, loisirs). Ensuite, achetez un billet de train au guichet avec l\'examinateur AI.',
        durationMinutes: 15,
      },
    ],
  },

  // ─── DELF A2 MILESTONE EXAM PAPER ───
  {
    id: 'delf-a2-official-1',
    title: 'DELF A2 Diplôme d\'Études en Langue Française — Epreuve Officielle',
    level: 'A2',
    diplomaType: 'DELF',
    totalDurationMinutes: 100,
    passingScorePercentage: 70,
    sections: [
      {
        id: 'a2-listening',
        title: 'Épreuve 1: Compréhension de l\'oral (Listening)',
        type: 'listening',
        instructions: 'Écoutez les documents et choisissez la bonne réponse.',
        transcript: 'Chers voyageurs, en raison d\'un problème technique, le train N° 4502 à destination de Lyon Part-Dieu partira de la voie B au lieu de la voie A.',
        durationMinutes: 25,
        questions: [
          {
            id: 'a2-l1',
            type: 'multiple_choice',
            question: 'Quelle est la destination du train N° 4502 ?',
            options: ['Paris Nord', 'Lyon Part-Dieu', 'Marseille Saint-Charles', 'Bordeaux St-Jean'],
            correctAnswer: 1,
            points: 5,
          },
          {
            id: 'a2-l2',
            type: 'multiple_choice',
            question: 'De quelle voie partira le train ?',
            options: ['Voie A', 'Voie B', 'Voie C', 'Voie D'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'a2-reading',
        title: 'Épreuve 2: Compréhension des écrits (Reading)',
        type: 'reading',
        instructions: 'Lisez l\'article ci-dessous et répondez aux questions.',
        readingPassage: 'La mairie de Nantes annonce une nouvelle initiative : des vélos en libre-service gratuits pour tous les résidents pendant les week-ends d\'été afin d\'encourager la mobilité verte.',
        durationMinutes: 30,
        questions: [
          {
            id: 'a2-r1',
            type: 'multiple_choice',
            question: 'Quel est l\'objectif principal de cette initiative municipale ?',
            options: ['Augmenter les impôts', 'Favoriser la mobilité verte', 'Vendre des vélos neufs', 'Fermer le centre-ville'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'a2-writing',
        title: 'Épreuve 3: Production écrite (Writing)',
        type: 'writing',
        instructions: 'Écrivez une lettre d\'invitation formelle ou amicale (60 à 80 mots).',
        writingPrompt: 'Vous organisez une fête pour votre anniversaire. Écrivez un courriel à vos collègues de travail pour les inviter (date, heure, lieu, programme).',
        durationMinutes: 20,
      },
      {
        id: 'a2-speaking',
        title: 'Épreuve 4: Production orale (Speaking)',
        type: 'speaking',
        instructions: 'Monologue suivi et débat interactif (6 à 8 minutes).',
        speakingPrompt: 'Exposez vos activités préférées pendant les vacances. Puis débattez avec l\'examinateur sur les avantages des vacances à la montagne par rapport à la mer.',
        durationMinutes: 25,
      },
    ],
  },

  // ─── DELF B1 MILESTONE EXAM PAPER ───
  {
    id: 'delf-b1-official-1',
    title: 'DELF B1 Diplôme d\'Études en Langue Française — Epreuve Officielle',
    level: 'B1',
    diplomaType: 'DELF',
    totalDurationMinutes: 115,
    passingScorePercentage: 70,
    sections: [
      {
        id: 'b1-listening',
        title: 'Épreuve 1: Compréhension de l\'oral (Listening)',
        type: 'listening',
        instructions: 'Vous allez entendre une émission de radio. Répondez aux questions.',
        transcript: 'Bienvenue dans notre émission "Santé & Société". Aujourd\'hui nous discutons du télétravail. Selon une récente étude, 65% des salariés déclarent travailler plus efficacement à domicile.',
        durationMinutes: 25,
        questions: [
          {
            id: 'b1-l1',
            type: 'multiple_choice',
            question: 'Quel est le sujet principal de l\'émission ?',
            options: ['Les transports en commun', 'Le télétravail', 'Le salaire minimum', 'La retraite'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'b1-reading',
        title: 'Épreuve 2: Compréhension des écrits (Reading)',
        type: 'reading',
        instructions: 'Lisez l\'article d\'opinion et répondez aux questions.',
        readingPassage: 'L\'utilisation de l\'intelligence artificielle dans le domaine éducatif suscite des débats passionnés. Certains y voient un tuteur personnalisé inestimable, tandis que d\'autres redoutent une perte d\'interaction humaine essentielle.',
        durationMinutes: 45,
        questions: [
          {
            id: 'b1-r1',
            type: 'multiple_choice',
            question: 'Quelle crainte est exprimée par les détracteurs de l\'IA à l\'école ?',
            options: ['La hausse des coûts', 'La perte d\'interaction humaine', 'Le manque d\'électricité', 'La baisse des notes'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'b1-writing',
        title: 'Épreuve 3: Production écrite (Writing)',
        type: 'writing',
        instructions: 'Exprimez votre opinion personnelle dans un article ou un courrier des lecteurs (160 à 180 mots).',
        writingPrompt: 'Un journal local s\'interroge : "Faut-il interdire les voitures dans le centre des grandes villes ?" Écrivez une lettre au rédacteur en chef pour donner votre opinion argumentée.',
        durationMinutes: 45,
      },
      {
        id: 'b1-speaking',
        title: 'Épreuve 4: Production orale (Speaking)',
        type: 'speaking',
        instructions: 'Présentation d\'un document déclencheur et débat d\'opinion (15 minutes).',
        speakingPrompt: 'Défendez votre point de vue face à l\'examinateur AI sur l\'utilisation des réseaux sociaux par les adolescents.',
        durationMinutes: 15,
      },
    ],
  },

  // ─── DELF B2 MILESTONE EXAM PAPER ───
  {
    id: 'delf-b2-official-1',
    title: 'DELF B2 Diplôme d\'Études en Langue Française — Epreuve Officielle',
    level: 'B2',
    diplomaType: 'DELF',
    totalDurationMinutes: 150,
    passingScorePercentage: 70,
    sections: [
      {
        id: 'b2-listening',
        title: 'Épreuve 1: Compréhension de l\'oral (Listening)',
        type: 'listening',
        instructions: 'Écoutez la conférence académique et répondez avec précision.',
        transcript: 'La transition écologique impose une refonte complète de nos modèles énergétiques. L\'essor de la géothermie offre une alternative prometteuse mais requiert d\'importants investissements initiaux.',
        durationMinutes: 30,
        questions: [
          {
            id: 'b2-l1',
            type: 'multiple_choice',
            question: 'Quel est l\'obstacle majeur au développement de la géothermie mentionné dans la conférence ?',
            options: ['Le manque de technologie', 'Les investissements initiaux importants', 'L\'opposition du public', 'La pollution atmosphérique'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'b2-reading',
        title: 'Épreuve 2: Compréhension des écrits (Reading)',
        type: 'reading',
        instructions: 'Lisez le dossier de presse argumentatif et répondez aux questions d\'analyse critique.',
        readingPassage: 'La souveraineté numérique est devenue un enjeu stratégique majeur pour les États européens. Face aux géants américains et asiatiques de la technologie, la création de clouds souverains européens s\'impose comme une nécessité absolue.',
        durationMinutes: 60,
        questions: [
          {
            id: 'b2-r1',
            type: 'multiple_choice',
            question: 'Quel impératif stratégique est mis en avant dans ce texte ?',
            options: ['Réduire les budgets IT', 'Créer des clouds souverains européens', 'Acheter des serveurs usagés', 'Privatiser les données de santé'],
            correctAnswer: 1,
            points: 5,
          },
        ],
      },
      {
        id: 'b2-writing',
        title: 'Épreuve 3: Production écrite (Writing)',
        type: 'writing',
        instructions: 'Rédigez une contribution argumentée et structurée (250 mots minimum).',
        writingPrompt: 'En tant que représentant des citoyens, vous écrivez au maire de votre ville pour proposer l\'instauration de la semaine de travail de 4 jours dans les services municipaux.',
        durationMinutes: 60,
      },
      {
        id: 'b2-speaking',
        title: 'Épreuve 4: Production orale (Speaking)',
        type: 'speaking',
        instructions: 'Exposé d\'opinion et débat contradictoire avec l\'examinateur AI (20 minutes).',
        speakingPrompt: 'Présentez une synthèse claire sur l\'impact de l\'automatisation sur le marché du travail futur, puis soutenez le débat contre l\'examinateur AI.',
        durationMinutes: 20,
      },
    ],
  },
];
