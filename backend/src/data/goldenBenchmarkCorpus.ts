export interface WritingBenchmarkSample {
  id: string;
  module: 'writing';
  taskNumber: 1 | 2 | 3;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  expectedText: string;
  candidateText: string;
  humanGroundTruth: {
    scoreOutOf20: number;
    nclcLevel: string;
    subscores: {
      taskFulfillment: number;
      coherence: number;
      lexical: number;
      grammar: number;
    };
  };
}

export interface SpeakingBenchmarkSample {
  id: string;
  module: 'speaking';
  taskNumber: 1 | 2 | 3;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  expectedText: string;
  transcript: string;
  acousticMetrics: {
    speechRateWpm: number;
    hesitationPauseCount: number;
    totalSilenceDurationSec: number;
    fluencyIndexPct: number;
  };
  humanGroundTruth: {
    scoreOutOf20: number;
    nclcLevel: string;
    subscores: {
      taskFulfillment: number;
      coherence: number;
      lexical: number;
      grammar: number;
    };
  };
}

export const WRITING_BENCHMARK_CORPUS: WritingBenchmarkSample[] = [
  // --- TÂCHE 1 (A1 - B1 RANGE) ---
  {
    id: 'w-t1-a1-01',
    module: 'writing',
    taskNumber: 1,
    cefrLevel: 'A1',
    expectedText: 'Écrivez un message à un ami pour l\'inviter à votre fête d\'anniversaire (60-120 mots).',
    candidateText: 'Salut Paul. Mon anniversaire est samedi. Viens à ma maison à 18h. Merci.',
    humanGroundTruth: { scoreOutOf20: 4, nclcLevel: 'NCLC 3', subscores: { taskFulfillment: 2, coherence: 1, lexical: 1, grammar: 1 } }
  },
  {
    id: 'w-t1-a2-01',
    module: 'writing',
    taskNumber: 1,
    cefrLevel: 'A2',
    expectedText: 'Écrivez un courriel à votre collègue pour expliquer votre absence demain (60-120 mots).',
    candidateText: 'Bonjour Marc, Je ne peux pas venir demain au bureau parce que je suis malade. J\'ai de la fièvre et le médecin dit de rester au lit. Je vais travailler un peu de la maison si possible. Merci de votre compréhension. Cordialement, Thomas.',
    humanGroundTruth: { scoreOutOf20: 8, nclcLevel: 'NCLC 5', subscores: { taskFulfillment: 4, coherence: 3, lexical: 2, grammar: 2 } }
  },
  {
    id: 'w-t1-b1-01',
    module: 'writing',
    taskNumber: 1,
    cefrLevel: 'B1',
    expectedText: 'Écrivez une carte postale à un ami pour raconter vos vacances (60-120 mots).',
    candidateText: 'Chère Sophie, Je t\'écris depuis Montréal où je passe des vacances magnifiques. Le temps est ensoleillé et les gens sont très accueillants. Hier, j\'ai visité le Vieux-Port et goûté la poutine traditionnelle. Demain, nous prévoyons de faire une randonnée sur le Mont-Royal. J\'espère que tu vas bien et j\'ai hâte de te revoir bientôt ! Amitiés, Luc.',
    humanGroundTruth: { scoreOutOf20: 12, nclcLevel: 'NCLC 7', subscores: { taskFulfillment: 5, coherence: 4, lexical: 4, grammar: 3 } }
  },

  // --- TÂCHE 2 (A2 - B2 RANGE) ---
  {
    id: 'w-t2-b1-01',
    module: 'writing',
    taskNumber: 2,
    cefrLevel: 'B1',
    expectedText: 'Écrivez un article pour raconter un voyage marquant de votre vie (120-150 mots).',
    candidateText: 'L\'année dernière, j\'ai effectué un voyage inoubliable en Gaspésie. C\'était la première fois que je découvrais l\'est du Canada. Nous avons loué une voiture à Québec et nous avons roulé le long du fleuve Saint-Laurent. Les paysages étaient fantastiques, avec des falaises impressionnantes et une mer à perte de vue. J\'ai eu la chance d\'observer des baleines à Tadoussac, ce qui reste le meilleur souvenir de ma vie. Les habitants locaux sont chaleureux et généreux. Je recommande vivement cette destination à tous les amoureux de la nature.',
    humanGroundTruth: { scoreOutOf20: 13, nclcLevel: 'NCLC 7', subscores: { taskFulfillment: 4, coherence: 4, lexical: 3, grammar: 3 } }
  },
  {
    id: 'w-t2-b2-01',
    module: 'writing',
    taskNumber: 2,
    cefrLevel: 'B2',
    expectedText: 'Rédigez une lettre de réclamation suite à un problème lors de votre séjour à l\'hôtel (120-150 mots).',
    candidateText: 'Monsieur le Directeur, Je vous adresse ce courriel afin de vous exprimer mon mécontentement concernant mon récent séjour dans votre établissement du 12 au 15 août. En effet, la chambre attribuée ne correspondait nullement à la réservation effectuée sur votre site internet. La climatisation était défectueuse et le bruit de la rue a rendu nos nuits particulièrement agitées. De surcroît, le service de nettoyage a omis de changer le linge de maison durant trois jours. Malgré nos réclamations répétées auprès de la réception, aucune solution satisfaisante n\'a été proposée. En conséquence, je sollicite un remboursement partiel du montant réglé. Dans l\'attente de votre retour, veuillez agréer, Monsieur, mes salutations distinguées.',
    humanGroundTruth: { scoreOutOf20: 16, nclcLevel: 'NCLC 9', subscores: { taskFulfillment: 5, coherence: 5, lexical: 4, grammar: 4 } }
  },

  // --- TÂCHE 3 (B2 - C2 RANGE) ---
  {
    id: 'w-t3-b2-01',
    module: 'writing',
    taskNumber: 3,
    cefrLevel: 'B2',
    expectedText: 'Comparez deux points de vue sur le télétravail et exprimez votre opinion (120-180 mots).',
    candidateText: 'Le télétravail suscite aujourd\'hui de nombreux débats au sein de la société. D\'un côté, certains mettent en avant la flexibilité d\'organisation et le gain de temps lié à l\'absence de trajets quotidiens. Cette formule permet en effet de concilier plus harmonieusement vie professionnelle et vie personnelle. D\'un autre côté, plusieurs observateurs soulignent le risque d\'isolement social et la détérioration de la cohésion d\'équipe. Selon moi, bien que le travail à distance présente des avantages indéniables, il convient d\'adopter un modèle hybride afin d\'en préserver les bénéfices tout en maintenant des liens humains essentiels au bon fonctionnement des entreprises.',
    humanGroundTruth: { scoreOutOf20: 15, nclcLevel: 'NCLC 8', subscores: { taskFulfillment: 4, coherence: 4, lexical: 4, grammar: 4 } }
  },
  {
    id: 'w-t3-c1-01',
    module: 'writing',
    taskNumber: 3,
    cefrLevel: 'C1',
    expectedText: 'Rédigez un essai argumenté sur l\'impact de l\'intelligence artificielle sur les emplois de demain (120-180 mots).',
    candidateText: 'L\'essor fulgurant de l\'intelligence artificielle suscite des réactions ambivalentes entre fascination technologique et crainte d\'une obsolescence humaine généralisée. Certes, l\'automatisation de tâches répétitives favorise un accroissement inédit de la productivité tout en libérant du temps pour des activités créatives. Néanmoins, l\'amplitude des mutations économiques à venir risque de fragiliser de nombreux secteurs d\'activité si des mesures d\'accompagnement adéquates ne sont pas instaurées. À mon sens, l\'IA ne doit pas être perçue comme un substitut à la force de travail humaine, mais plutôt comme un catalyseur exigeant une restructuration profonde des compétences professionnelles et des politiques éducatives.',
    humanGroundTruth: { scoreOutOf20: 18, nclcLevel: 'NCLC 10', subscores: { taskFulfillment: 5, coherence: 5, lexical: 5, grammar: 5 } }
  }
];

export const SPEAKING_BENCHMARK_CORPUS: SpeakingBenchmarkSample[] = [
  // --- TÂCHE 1 (A1 - B1 RANGE) ---
  {
    id: 's-t1-a1-01',
    module: 'speaking',
    taskNumber: 1,
    cefrLevel: 'A1',
    expectedText: 'Présentation personnelle et professionnelle.',
    transcript: 'Je m\'appelle Ali. Je viens de Tunisie. J\'habite à Tunis. Je suis développeur informatique.',
    acousticMetrics: { speechRateWpm: 70, hesitationPauseCount: 5, totalSilenceDurationSec: 8, fluencyIndexPct: 55 },
    humanGroundTruth: { scoreOutOf20: 5, nclcLevel: 'NCLC 4', subscores: { taskFulfillment: 2, coherence: 1, lexical: 2, grammar: 2 } }
  },
  {
    id: 's-t1-b1-01',
    module: 'speaking',
    taskNumber: 1,
    cefrLevel: 'B1',
    expectedText: 'Présentation personnelle et projet d\'immigration au Canada.',
    transcript: 'Bonjour, je m\'appelle Élodie, j\'ai 29 ans et je travaille comme ingénieure en gestion de projet depuis cinq ans à Lyon. J\'ai toujours eu une grande passion pour les grands espaces et le mode de vie canadien. Mon objectif principal est de m\'installer à Montréal afin de poursuivre ma carrière et de découvrir la culture québécoise. Pendant mon temps libre, j\'aime faire de la randonnée et voyager.',
    acousticMetrics: { speechRateWpm: 125, hesitationPauseCount: 2, totalSilenceDurationSec: 2, fluencyIndexPct: 88 },
    humanGroundTruth: { scoreOutOf20: 13, nclcLevel: 'NCLC 7', subscores: { taskFulfillment: 4, coherence: 4, lexical: 3, grammar: 3 } }
  },

  // --- TÂCHE 2 (A2 - B2 ROLEPLAY RANGE) ---
  {
    id: 's-t2-b2-01',
    module: 'speaking',
    taskNumber: 2,
    cefrLevel: 'B2',
    expectedText: 'Rôle: Demande d\'informations sur les cours de soutien linguistique.',
    transcript: 'Bonjour Monsieur. Je me permets de vous contacter car je souhaiterais m\'inscrire à vos cours de préparation au TCF. Pourriez-vous tout d\'abord me préciser les horaires disponibles durant la semaine ? De plus, j\'aimerais savoir quel est le nombre maximum d\'étudiants par groupe afin de m\'assurer d\'un suivi personnalisé. Enfin, proposez-vous des facilités de paiement en plusieurs fois ? Avez-vous d\'autres informations sur les inscriptions ?',
    acousticMetrics: { speechRateWpm: 135, hesitationPauseCount: 1, totalSilenceDurationSec: 1, fluencyIndexPct: 92 },
    humanGroundTruth: { scoreOutOf20: 16, nclcLevel: 'NCLC 9', subscores: { taskFulfillment: 5, coherence: 5, lexical: 4, grammar: 4 } }
  },

  // --- TÂCHE 3 (B2 - C2 DEBATE RANGE) ---
  {
    id: 's-t3-c1-01',
    module: 'speaking',
    taskNumber: 3,
    cefrLevel: 'C1',
    expectedText: 'Débat: Faut-il interdire l\'utilisation des téléphones portables dans les écoles ?',
    transcript: 'À mon avis, l\'interdiction des smartphones au sein des établissements scolaires constitue une mesure essentielle pour préserver un environnement propice à la concentration et aux apprentissages. En effet, l\'usage compulsif des réseaux sociaux perturbe l\'attention des élèves et nuit gravement à la qualité des interactions sociales directes pendant les récréations. Certes, certains prétendent que le téléphone représente un outil pédagogique moderne, mais je reste convaincu que ses effets distractifs l\'emportent largement sur ses bénéfices éducatifs.',
    acousticMetrics: { speechRateWpm: 145, hesitationPauseCount: 1, totalSilenceDurationSec: 1, fluencyIndexPct: 95 },
    humanGroundTruth: { scoreOutOf20: 18, nclcLevel: 'NCLC 10', subscores: { taskFulfillment: 5, coherence: 5, lexical: 5, grammar: 5 } }
  }
];
