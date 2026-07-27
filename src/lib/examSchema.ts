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
      description: "Listen to French audio clips and answer multiple-choice questions (A1 to C2).",
      durationMins: 35,
      totalQuestions: 10,
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
          explanation: "The message warns commuters about a subway station closure over the weekend due to construction work.",
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
          explanation: "She explicitly states 'Je t'attends à l'intérieur' (I'm waiting inside).",
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
        },
        {
          id: "tcf1-lis-4",
          questionNumber: 4,
          text: "Message d'accueil d'un musée : 'Notre musée est ouvert du mardi au dimanche de 9h à 18h. La nocturne du jeudi se prolonge jusqu'à 22h.' Quand le musée ferme-t-il à 22h ?",
          options: [
            "Le mardi soir.",
            "Le jeudi soir.",
            "Le samedi soir.",
            "Tous les jours."
          ],
          correctIndex: 1,
          explanation: "The recording explicitly mentions 'La nocturne du jeudi se prolonge jusqu'à 22h'.",
          hint: "Listen for 'nocturne du jeudi'.",
          transcript: "Bienvenue au Musée des Beaux-Arts. Notre musée est ouvert du mardi au dimanche de 9h à 18h. La nocturne du jeudi se prolonge jusqu'à 22h.",
          transcriptEnglish: "Welcome to the Fine Arts Museum. Open Tuesday to Sunday from 9am to 6pm. Thursday late opening extends until 10pm."
        },
        {
          id: "tcf1-lis-5",
          questionNumber: 5,
          text: "Annonce dans un supermarché : 'Chers clients, bénéficiez aujourd'hui de 20% de remise sur le rayon fruits et légumes frais.' Quelle est la promotion ?",
          options: [
            "Une réduction sur les boissons.",
            "20% de réduction sur les fruits et légumes.",
            "Un produit acheté, un produit offert.",
            "La livraison gratuite à domicile."
          ],
          correctIndex: 1,
          explanation: "The store offers a 20% discount on fresh fruits and vegetables.",
          hint: "Notice '20% de remise sur fruits et légumes'.",
          transcript: "Chers clients, bénéficiez aujourd'hui de 20% de remise sur tout le rayon fruits et légumes frais en passant à la caisse.",
          transcriptEnglish: "Dear customers, enjoy 20% off all fresh fruit and vegetable items today at checkout."
        },
        {
          id: "tcf1-lis-6",
          questionNumber: 6,
          text: "Chronique scientifique à la radio : 'Les études récentes démontrent que la marche quotidienne de 30 minutes réduit les risques cardiovasculaires de 30%.' Quel est le sujet principal ?",
          options: [
            "Les bienfaits de la marche pour la santé.",
            "La préparation d'un marathon sportif.",
            "Les dangers de la marche en montagne.",
            "Les nouveaux équipements de sport."
          ],
          correctIndex: 0,
          explanation: "The radio segment discusses health benefits of walking 30 minutes daily.",
          hint: "Key phrase: 'bienfaits de la marche'.",
          transcript: "Les études scientifiques récentes démontrent que la pratique de la marche quotidienne de 30 minutes réduit les risques cardiovasculaires de 30%.",
          transcriptEnglish: "Recent scientific studies demonstrate that walking 30 minutes daily reduces cardiovascular risks by 30%."
        },
        {
          id: "tcf1-lis-7",
          questionNumber: 7,
          text: "Reportage sur la formation professionnelle : 'Les diplômés maîtrisant deux langues étrangères accèdent à un emploi 40% plus rapidement.' Que souligne le reportage ?",
          options: [
            "La difficulté des examens de langues.",
            "L'avantage du bilinguisme sur le marché du travail.",
            "La baisse des salaires des traducteurs.",
            "L'obligation d'étudier à l'étranger."
          ],
          correctIndex: 1,
          explanation: "Mastering two foreign languages helps graduates secure employment 40% faster.",
          hint: "Notice 'accèdent à un emploi 40% plus rapidement'.",
          transcript: "Selon l'enquête nationale, les diplômés maîtrisant deux langues étrangères accèdent à un emploi 40% plus rapidement que la moyenne.",
          transcriptEnglish: "According to the national survey, graduates mastering two foreign languages enter the job market 40% faster than average."
        },
        {
          id: "tcf1-lis-8",
          questionNumber: 8,
          text: "Interview d'un urbaniste : 'La végétalisation des façades urbaines permet de baisser la température ambiante de 2 degrés en été.' Quel est l'objectif environnemental ?",
          options: [
            "Lutter contre la chaleur urbaine.",
            "Diminuer la lumière du soleil.",
            "Créer des zones d'agriculture industrielle.",
            "Augmenter l'utilisation de la climatisation."
          ],
          correctIndex: 0,
          explanation: "Greening building facades cools down urban ambient temperature in summer.",
          hint: "Focus on 'baisser la température ambiante'.",
          transcript: "La végétalisation des façades et des toits permet de baisser la température ambiante des centres-villes de 2 degrés en période de canicule.",
          transcriptEnglish: "Greening facades and rooftops lowers ambient downtown temperature by 2 degrees during heatwaves."
        },
        {
          id: "tcf1-lis-9",
          questionNumber: 9,
          text: "Extrait de débat économique : 'La transition vers l'économie numérique exige une mise à niveau constante des compétences des salariés.' Que préconise l'expert ?",
          options: [
            "Remplacer immédiatement tous les employés.",
            "Investir dans la formation continue des employés.",
            "Réduire le temps de travail hebdomadaire.",
            "Abandonner l'utilisation des ordinateurs."
          ],
          correctIndex: 1,
          explanation: "Continuous skill upgrading ('mise à niveau constante') means ongoing professional training.",
          hint: "'Mise à niveau constante' = continuous upskilling.",
          transcript: "La transition vers l'économie numérique exige une mise à niveau constante des compétences des salariés pour préserver la compétitivité.",
          transcriptEnglish: "The transition to the digital economy requires constant upskilling of workers to maintain competitiveness."
        },
        {
          id: "tcf1-lis-10",
          questionNumber: 10,
          text: "Conférence sur l'IA et l'éducation : 'L'intelligence artificielle doit être perçue comme un outil d'assistance pédagogique et non comme un substitut à l'enseignant.' Quelle est la position du conférencier ?",
          options: [
            "Remplacer les professeurs par des robots.",
            "Utiliser l'IA comme complément au travail de l'enseignant.",
            "Interdire l'IA dans toutes les écoles.",
            "Supprimer les devoirs à la maison."
          ],
          correctIndex: 1,
          explanation: "AI should serve as an educational support tool, not replace teachers.",
          hint: "Listen for 'outil d'assistance et non substitut'.",
          transcript: "L'intelligence artificielle doit être perçue comme un outil d'assistance pédagogique puissant et non comme un substitut à l'enseignant.",
          transcriptEnglish: "Artificial intelligence should be viewed as a powerful pedagogical support tool, not as a replacement for teachers."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Read French articles, emails, administrative notices, and academic texts (A1 to C2).",
      durationMins: 60,
      totalQuestions: 10,
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
          explanation: "'ne donneront plus lieu à des pénalités financières' means late return fines are abolished.",
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
            "La création d'emplois locaux et la réduction des déchets.",
            "L'arrêt complet des importations d'ordinateurs.",
            "La fermeture des usines d'électronique."
          ],
          correctIndex: 1,
          explanation: "The article highlights creating local jobs ('créant des emplois locaux') and extending device lifespan.",
          hint: "Notice 'créant des emplois locaux'."
        },
        {
          id: "tcf1-read-3",
          questionNumber: 3,
          passage: "Avis à la population : Dans le cadre du plan de sobriété énergétique, l'éclairage public des rues secondaires sera éteint entre 23h et 5h du matin dès lundi prochain.",
          passageEnglish: "Public Notice: As part of the energy sobriety plan, public street lighting on side streets will be turned off between 11pm and 5am starting next Monday.",
          text: "Que prévoit la nouvelle mesure d'économie d'énergie ?",
          options: [
            "L'augmentation du prix de l'électricité nocturne.",
            "L'extinction de l'éclairage public nocturne sur les rues secondaires.",
            "La fermeture des routes à la circulation.",
            "L'installation de nouveaux panneaux solaires."
          ],
          correctIndex: 1,
          explanation: "Street lights on side streets will be switched off between 11pm and 5am.",
          hint: "Find 'éclairage public... éteint entre 23h et 5h'."
        },
        {
          id: "tcf1-read-4",
          questionNumber: 4,
          passage: "Annonce de recrutement : Entreprise technologique recherche développeur web bilingue. Expérience minimale de 2 ans requise en Javascript. Travail hybride proposé (2 jours en télétravail).",
          passageEnglish: "Job Announcement: Tech company seeking bilingual web developer. Minimum 2 years Javascript experience required. Hybrid work offered (2 days remote).",
          text: "Quel critère est indispensable pour postuler ?",
          options: [
            "Avoir 10 ans d'expérience.",
            "Maîtriser Javascript et être bilingue.",
            "Travailler 100% au bureau.",
            "Posséder son propre serveur informatique."
          ],
          correctIndex: 1,
          explanation: "The job posting requires 2 years Javascript experience and bilingual language skills.",
          hint: "Notice 'développeur web bilingue' & 'Javascript'."
        },
        {
          id: "tcf1-read-5",
          questionNumber: 5,
          passage: "Santé Publique Canada : Consommer au moins 5 portions de fruits et légumes par jour et pratiquer une activité physique régulière constitue le meilleur moyen de prévenir les maladies chroniques.",
          passageEnglish: "Public Health Canada: Consuming at least 5 servings of fruit and vegetables daily and engaging in regular physical activity is the best way to prevent chronic diseases.",
          text: "Que recommande Santé Publique Canada pour rester en bonne santé ?",
          options: [
            "Prendre des compléments alimentaires quotidiens.",
            "Manger des fruits et légumes et faire du sport.",
            "Dormir 12 heures par jour.",
            "Éviter toute forme d'effort physique."
          ],
          correctIndex: 1,
          explanation: "Health Canada recommends 5 daily fruit/veg servings and regular exercise.",
          hint: "Notice 'fruits et légumes' + 'activité physique'."
        },
        {
          id: "tcf1-read-6",
          questionNumber: 6,
          passage: "Rapport sur l'Éducation Supérieure : L'apprentissage par projets en petits groupes favorise le développement de la pensée critique et le travail d'équipe chez les étudiants universitaires.",
          passageEnglish: "Higher Education Report: Small-group project-based learning promotes critical thinking and teamwork among university students.",
          text: "Quel est l'avantage de l'apprentissage par projets ?",
          options: [
            "Réduire le nombre de professeurs requis.",
            "Développer la pensée critique et le travail en équipe.",
            "Supprimer les examens finaux.",
            "Rendre les études entièrement gratuites."
          ],
          correctIndex: 1,
          explanation: "Project-based learning fosters critical thinking and teamwork skills.",
          hint: "Look for 'pensée critique et travail d'équipe'."
        },
        {
          id: "tcf1-read-7",
          questionNumber: 7,
          passage: "Innovation Agricole au Québec : Les serres urbaines chauffées grâce aux rejets thermiques de centres de données permettent de produire des tomates fraiches toute l'année à faible coût environnemental.",
          passageEnglish: "Agricultural Innovation in Quebec: Urban greenhouses heated by data center waste heat produce fresh tomatoes year-round with low environmental impact.",
          text: "Comment les serres urbaines sont-elles chauffées ?",
          options: [
            "En brûlant du charbon naturel.",
            "En récupérant la chaleur rejetée par les centres de données.",
            "Grâce à des radiateurs électriques individuels.",
            "Uniquement par les rayons directs du soleil."
          ],
          correctIndex: 1,
          explanation: "The greenhouses reuse waste heat emitted by data centers ('rejets thermiques de centres de données').",
          hint: "Find 'rejets thermiques de centres de données'."
        },
        {
          id: "tcf1-read-8",
          questionNumber: 8,
          passage: "Sociologie de la Consommation : L'achat d'objets d'occasion n'est plus perçu comme une contrainte financière mais comme un choix éthique valorisé par 68% des jeunes adultes.",
          passageEnglish: "Sociology of Consumption: Buying secondhand items is no longer seen as a financial constraint but as an ethical choice valued by 68% of young adults.",
          text: "Comment les jeunes adultes perçoivent-ils les achats d'occasion ?",
          options: [
            "Comme un signe de pauvreté honteux.",
            "Comme un choix engagé et éthique.",
            "Comme une perte de temps inutile.",
            "Comme une obligation légale."
          ],
          correctIndex: 1,
          explanation: "Buying secondhand is viewed as an ethical decision ('choix éthique').",
          hint: "Look for 'choix éthique valorisé'."
        },
        {
          id: "tcf1-read-9",
          questionNumber: 9,
          passage: "Recherche Médicale : Les thérapies géniques ciblées ouvrent de nouvelles perspectives prometteuses pour le traitement des maladies rares autrefois considérées comme incurables.",
          passageEnglish: "Medical Research: Targeted gene therapies open promising new avenues for treating rare diseases previously considered incurable.",
          text: "Quel est l'apport des thérapies géniques ciblées ?",
          options: [
            "Le traitement efficace de maladies autrefois incurables.",
            "La baisse générale du coût des médicaments de base.",
            "La suppression de la chirurgie classique.",
            "Le remplacement complet des vaccins."
          ],
          correctIndex: 0,
          explanation: "Targeted gene therapies offer effective solutions for previously incurable rare diseases.",
          hint: "Notice 'traitement des maladies... autrefois incurables'."
        },
        {
          id: "tcf1-read-10",
          questionNumber: 10,
          passage: "Économie Mondiale : L'automatisation intelligente des processus industriels redéfinit les compétences requises, plaçant la créativité et la résolution de problèmes complexes au cœur des exigences du marché du travail.",
          passageEnglish: "Global Economy: Intelligent industrial process automation redefines required skills, placing creativity and complex problem-solving at the core of labor market demands.",
          text: "Quelles compétences deviennent prioritaires selon le texte ?",
          options: [
            "La répétition mécanique de tâches manuelles.",
            "La créativité et la résolution de problèmes complexes.",
            "La mémorisation passive d'informations.",
            "La conduite de véhicules de chantier."
          ],
          correctIndex: 1,
          explanation: "Automation prioritizes human creativity and complex problem solving skills.",
          hint: "Notice 'créativité et la résolution de problèmes'."
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
        },
        {
          id: "tcf1-w2",
          taskNumber: 2,
          title: "Tâche 2 : Compte-rendu d'expérience (Travel Experience Report)",
          prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour à l'étranger (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
          wordCountMin: 120,
          wordCountMax: 150,
          timeLimitMins: 20,
          guidedTips: [
            "Utiliser le passé composé et l'imparfait",
            "Décrire le paysage et l'ambiance",
            "Exprimer vos sentiments (joie, surprise)"
          ]
        },
        {
          id: "tcf1-w3",
          taskNumber: 3,
          title: "Tâche 3 : Essai argumentatif (Argumentative Essay)",
          prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (140 à 180 mots).",
          wordCountMin: 140,
          wordCountMax: 180,
          timeLimitMins: 25,
          guidedTips: [
            "Introduction présentant le débat",
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
      description: "Interactive oral interaction with AI examiner feedback.",
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
          keyPhrases: [
            "Je m'appelle...",
            "Actuellement, je travaille en tant que...",
            "Mon objectif principal au Canada est...",
            "Dans mon temps libre, j'aime..."
          ]
        },
        {
          id: "tcf1-spk-2",
          taskNumber: 2,
          title: "Tâche 2 : Exercice en interaction (Information Gathering)",
          scenario: "Vous voulez vous inscrire à un cours de sport. Posez au moins 5 questions à l'examinateur sur les horaires, les tarifs et l'équipement requis.",
          prepTimeMins: 1,
          speakingTimeMins: 3.5,
          keyPhrases: [
            "Quels sont les jours de cours ?",
            "Combien coûte l'abonnement mensuel ?",
            "Est-il nécessaire d'apporter son propre matériel ?"
          ]
        },
        {
          id: "tcf1-spk-3",
          taskNumber: 3,
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
      description: "Audio passages, interviews, and public service announcements (A1 to C2).",
      durationMins: 35,
      totalQuestions: 10,
      questions: [
        {
          id: "tcf2-lis-1",
          questionNumber: 1,
          text: "Message à la gare de Lyon : 'Le TGV numéro 6820 à destination de Marseille partira de la voie 12. L'accès au train sera fermé 2 minutes avant le départ.' Que doivent faire les voyageurs ?",
          options: [
            "Monter immédiatement en voiture avant la fermeture des portes.",
            "Changer de billet au guichet principal.",
            "Attendre le prochain train pour Marseille.",
            "Demander un remboursement immédiat."
          ],
          correctIndex: 0,
          explanation: "Train boarding access closes 2 minutes prior to departure.",
          hint: "Notice 'l'accès au train sera fermé 2 minutes avant'.",
          transcript: "Le TGV numéro 6820 à destination de Marseille partira de la voie 12. L'accès au train sera fermé 2 minutes avant le départ.",
          transcriptEnglish: "TGV 6820 to Marseille will depart from platform 12. Train access closes 2 minutes prior to departure."
        },
        {
          id: "tcf2-lis-2",
          questionNumber: 2,
          text: "Bulletin météo radio : 'Avertissement de verglas sur l'autoroute A4. La vitesse maximale autorisée est réduite à 80 km/h.' Quelle mesure est imposée ?",
          options: [
            "Fermeture complète de l'autoroute.",
            "Réduction de la vitesse maximale autorisée à 80 km/h.",
            "Interdiction absolue de circuler pour les poids lourds.",
            "Gratuité du péage autoroutier."
          ],
          correctIndex: 1,
          explanation: "Maximum speed limit is reduced to 80 km/h due to black ice.",
          hint: "Listen for 'vitesse maximale autorisée est réduite'.",
          transcript: "Avertissement de verglas sur l'autoroute A4. La vitesse maximale autorisée est réduite à 80 km/h.",
          transcriptEnglish: "Black ice warning on highway A4. Maximum authorized speed is reduced to 80 km/h."
        },
        {
          id: "tcf2-lis-3",
          questionNumber: 3,
          text: "Interview d'un entrepreneur : 'Le succès de notre application mobile repose sur la simplicité d'utilisation de l'interface utilisateur.' Quel élément est déterminant ?",
          options: [
            "Le prix élevé de l'abonnement.",
            "La simplicité d'utilisation de l'interface.",
            "La publicité à la télévision.",
            "Le nombre d'employés dans l'entreprise."
          ],
          correctIndex: 1,
          explanation: "The user interface's simplicity is highlighted as key to success.",
          hint: "Focus on 'simplicité d'utilisation'.",
          transcript: "Le succès de notre application mobile repose avant tout sur la simplicité d'utilisation de l'interface utilisateur.",
          transcriptEnglish: "The success of our mobile app rests above all on the simplicity of the user interface."
        },
        {
          id: "tcf2-lis-4",
          questionNumber: 4,
          text: "Annonce dans un centre commercial : 'Le magasin de sport situé au niveau 2 propose une séance de dédicace avec l'équipe nationale de hockey à 15h.' Quel événement a lieu à 15h ?",
          options: [
            "Un match de hockey en direct.",
            "Une séance de dédicace d'athlètes.",
            "Une vente aux enchères d'équipements.",
            "Un cours de patinage gratuit."
          ],
          correctIndex: 1,
          explanation: "An autograph signing session with the national hockey team occurs at 3pm.",
          hint: "Listen for 'séance de dédicace'.",
          transcript: "Le magasin de sport situé au niveau 2 propose une séance de dédicace avec l'équipe nationale de hockey à 15h.",
          transcriptEnglish: "The sporting goods store on level 2 offers an autograph signing session with the national hockey team at 3pm."
        },
        {
          id: "tcf2-lis-5",
          questionNumber: 5,
          text: "Podcast sur l'écologie : 'Le compostage obligatoire des déchets organiques ménagers permet de réduire de 30% le volume des poubelles noires.' Quel est le résultat ?",
          options: [
            "L'augmentation des odeurs dans les rues.",
            "La réduction de 30% du volume des poubelles noires.",
            "L'obligation d'acheter de nouvelles poubelles.",
            "La hausse des taxes d'enlèvement d'ordures."
          ],
          correctIndex: 1,
          explanation: "Mandatory organic waste composting cuts general trash volume by 30%.",
          hint: "Notice 'réduire de 30% le volume'.",
          transcript: "Le compostage obligatoire des déchets organiques ménagers permet de réduire de 30% le volume des poubelles noires destinées à l'incinération.",
          transcriptEnglish: "Mandatory composting of household organic waste reduces the volume of black trash bins by 30%."
        },
        {
          id: "tcf2-lis-6",
          questionNumber: 6,
          text: "Émission culturelle : 'La restauration de la cathédrale antique se terminera à la fin de l'année grâce au mécénat privé.' Comment les travaux sont-ils financés ?",
          options: [
            "Par un impôt exceptionnel sur les habitants.",
            "Grâce à des financements du mécénat privé.",
            "En vendant les œuvres d'art du musée.",
            "Par une loterie nationale."
          ],
          correctIndex: 1,
          explanation: "Cathedral restoration is funded through private sponsorship/patronage ('mécénat privé').",
          hint: "Notice 'mécénat privé'.",
          transcript: "La restauration complète de la cathédrale se terminera à la fin de l'année grâce aux contributions généreuses du mécénat privé.",
          transcriptEnglish: "The cathedral's complete restoration will finish at year-end thanks to generous private patronage contributions."
        },
        {
          id: "tcf2-lis-7",
          questionNumber: 7,
          text: "Reportage médical : 'Le manque chronique de sommeil perturbe la mémoire à court terme et affaiblit le système immunitaire.' Quels sont les risques mentionnés ?",
          options: [
            "Une amélioration de la concentration.",
            "Des problèmes de mémoire et une baisse de l'immunité.",
            "Une augmentation de l'énergie physique.",
            "Une baisse de l'appétit."
          ],
          correctIndex: 1,
          explanation: "Chronic sleep deprivation harms short-term memory and weakens immunity.",
          hint: "Focus on 'perturbe la mémoire et affaiblit le système immunitaire'.",
          transcript: "Le manque chronique de sommeil perturbe directement la mémoire à court terme et affaiblit le système immunitaire des adultes.",
          transcriptEnglish: "Chronic sleep deprivation directly disrupts short-term memory and weakens the adult immune system."
        },
        {
          id: "tcf2-lis-8",
          questionNumber: 8,
          text: "Débat d'experts en énergie : 'Le développement des réseaux intelligents d'électricité est indispensable pour intégrer les énergies renouvelables intermittentes.' Que facilitent ces réseaux ?",
          options: [
            "L'intégration des énergies renouvelables.",
            "La fermeture des centrales solaires.",
            "La hausse des factures d'électricité.",
            "L'interdiction des voitures électriques."
          ],
          correctIndex: 0,
          explanation: "Smart electric grids enable integration of intermittent renewable energy sources.",
          hint: "Notice 'intégrer les énergies renouvelables'.",
          transcript: "Le développement rapide des réseaux intelligents d'électricité est indispensable pour intégrer les énergies renouvelables intermittentes comme l'éolien.",
          transcriptEnglish: "The rapid development of smart electric grids is essential to integrate intermittent renewables like wind."
        },
        {
          id: "tcf2-lis-9",
          questionNumber: 9,
          text: "Interview d'un chercheur en IA : 'L'éthique dans le développement des algorithmes doit garantir l'absence de biais discriminatoires.' Que doit-on garantir ?",
          options: [
            "La baisse du coût des ordinateurs.",
            "L'absence de biais discriminatoires dans les algorithmes.",
            "La vitesse maximale de calcul des puces.",
            "La suppression des mots de passe."
          ],
          correctIndex: 1,
          explanation: "AI ethics must prevent discriminatory algorithmic bias.",
          hint: "Notice 'absence de biais discriminatoires'.",
          transcript: "L'éthique dans le développement des algorithmes d'IA doit impérativement garantir l'absence de biais discriminatoires envers les minorités.",
          transcriptEnglish: "Ethics in AI algorithm development must imperatively guarantee the absence of discriminatory bias against minorities."
        },
        {
          id: "tcf2-lis-10",
          questionNumber: 10,
          text: "Conférence de sociologie : 'La valorisation de l'apprentissage tout au long de la vie devient le pivot fondamental des politiques d'emploi modernes.' Quel est le pivot principal ?",
          options: [
            "La retraite anticipée obligatoire.",
            "L'apprentissage tout au long de la vie.",
            "La réduction du salaire minimum.",
            "L'émigration des jeunes diplômés."
          ],
          correctIndex: 1,
          explanation: "Lifelong learning ('apprentissage tout au long de la vie') is pivotal to modern employment policies.",
          hint: "Notice 'apprentissage tout au long de la vie'.",
          transcript: "La valorisation continue de l'apprentissage tout au long de la vie devient aujourd'hui le pivot fondamental des politiques d'emploi modernes.",
          transcriptEnglish: "Continuous valuation of lifelong learning has become the fundamental pivot of modern employment policies."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles and environmental press reports (A1 to C2).",
      durationMins: 60,
      totalQuestions: 10,
      questions: [
        {
          id: "tcf2-read-1",
          questionNumber: 1,
          passage: "Transition Énergétique en France : L'installation de panneaux solaires chez les particuliers a quadruplé en trois ans. Les aides gouvernementales et la hausse des tarifs d'électricité encouragent l'autoconsommation.",
          passageEnglish: "Energy Transition in France: Solar panel installations by homeowners have quadrupled in three years. Government subsidies and rising electricity costs spur self-consumption.",
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
        },
        {
          id: "tcf2-read-2",
          questionNumber: 2,
          passage: "Transport Ferroviaire au Québec : Un nouveau projet de train à haute fréquence reliant Montréal à Québec permettra de réduire les temps de parcours de 45 minutes d'ici 2028.",
          passageEnglish: "Rail Transit in Quebec: A new high-frequency train project connecting Montreal to Quebec City will reduce travel time by 45 minutes by 2028.",
          text: "Quel est l'objectif principal du projet ferroviaire ?",
          options: [
            "Augmenter le prix du billet de train.",
            "Réduire le temps de trajet entre Montréal et Québec.",
            "Fermer les gares secondaires.",
            "Supprimer le transport de marchandises."
          ],
          correctIndex: 1,
          explanation: "The high-frequency rail link aims to cut travel time between Montreal and Quebec City by 45 minutes.",
          hint: "Notice 'réduire les temps de parcours de 45 minutes'."
        },
        {
          id: "tcf2-read-3",
          questionNumber: 3,
          passage: "Santé et Alimentation : La réduction de la consommation de sucre raffiné chez les enfants permet de diminuer drastiquement les risques de caries dentaires et de diabète précoce.",
          passageEnglish: "Health & Nutrition: Reducing refined sugar intake in children drastically decreases risks of dental cavities and early onset diabetes.",
          text: "Quel est le bienfait d'une baisse de consommation de sucre chez les enfants ?",
          options: [
            "Une augmentation de la fatigue.",
            "Une diminution importante des risques de caries et de diabète.",
            "La perte obligatoire des dents de lait.",
            "Une baisse de l'attention en classe."
          ],
          correctIndex: 1,
          explanation: "Lowering refined sugar reduces risks of dental cavities and early diabetes.",
          hint: "Look for 'diminuer drastiquement les risques'."
        },
        {
          id: "tcf2-read-4",
          questionNumber: 4,
          passage: "Urbanisme Durable : La création de corridors verts interconnectés en ville facilite le déplacement des espèces animales tout en améliorant la qualité de l'air pour les résidents.",
          passageEnglish: "Sustainable Urban Planning: Creating interconnected green corridors in cities facilitates wildlife movement while improving air quality for residents.",
          text: "Quel est l'un des doubles avantages des corridors verts ?",
          options: [
            "Le ralentissement de la circulation automobile.",
            "La protection de la faune et l'amélioration de la qualité de l'air.",
            "La suppression des parcs publics.",
            "L'interdiction de se promener à pied."
          ],
          correctIndex: 1,
          explanation: "Green corridors support wildlife migration and clean urban air.",
          hint: "Notice 'déplacement des espèces... améliorant l'air'."
        },
        {
          id: "tcf2-read-5",
          questionNumber: 5,
          passage: "Économie du Numérique : Le secteur des jeux vidéo génère désormais des revenus supérieurs à ceux du cinéma et de la musique réunis au niveau mondial.",
          passageEnglish: "Digital Economy: The video game sector now generates higher revenue globally than film and music combined.",
          text: "Que révèle la comparaison entre le jeu vidéo et les autres médias ?",
          options: [
            "Le jeu vidéo génère plus de revenus que le cinéma et la musique réunis.",
            "Le cinéma est devenu l'industrie la plus rentable.",
            "La musique ne rapporte plus aucun revenu.",
            "Le jeu vidéo est en déclin économique."
          ],
          correctIndex: 0,
          explanation: "Video games generate higher revenue than movies and music combined.",
          hint: "Look for 'revenus supérieurs à ceux du cinéma et de la musique'."
        },
        {
          id: "tcf2-read-6",
          questionNumber: 6,
          passage: "Psychologie du Travail : Offrir de la flexibilité horaire aux collaborateurs renforce leur engagement professionnel et réduit le taux de roulement au sein de l'entreprise.",
          passageEnglish: "Organizational Psychology: Offering flexible hours to employees boosts engagement and reduces turnover within the company.",
          text: "Quel est l'impact de la flexibilité horaire sur les employés ?",
          options: [
            "La baisse de leur motivation au travail.",
            "Un engagement renforcé et un taux de départ réduit.",
            "L'obligation de travailler le dimanche.",
            "La suppression des congés payés."
          ],
          correctIndex: 1,
          explanation: "Flexible work hours increase employee engagement and reduce turnover.",
          hint: "Notice 'renforce leur engagement... réduit le taux de roulement'."
        },
        {
          id: "tcf2-read-7",
          questionNumber: 7,
          passage: "Archéologie Moderne : L'utilisation de technologies de cartographie laser LIDAR par drone a permis de découvrir des cités antiques enfouies sous la jungle amazonienne sans abîmer la végétation.",
          passageEnglish: "Modern Archaeology: LIDAR drone laser mapping has unveiled ancient cities buried beneath the Amazon jungle without damaging vegetation.",
          text: "Quel est le bénéfice de la technologie LIDAR en archéologie ?",
          options: [
            "Découvrir des sites anciens sans détruire la forêt.",
            "Détruire la jungle pour construire des routes.",
            "Remplacer les archéologues humains par des drones.",
            "Fabriquer des objets anciens synthétiques."
          ],
          correctIndex: 0,
          explanation: "LIDAR technology maps buried ancient cities without harming jungle vegetation.",
          hint: "Notice 'découvrir des cités antiques... sans abîmer la végétation'."
        },
        {
          id: "tcf2-read-8",
          questionNumber: 8,
          passage: "Éducation et Technologies : L'intégration d'outils interactifs en classe stimule la curiosité des élèves, mais les experts soulignent la nécessité de maintenir un encadrement humain strict.",
          passageEnglish: "Education & Tech: Integrating interactive tools in class stimulates student curiosity, but experts emphasize maintaining strict human guidance.",
          text: "Quelle est la recommandation des experts concernant la technologie à l'école ?",
          options: [
            "Supprimer tous les ordinateurs des écoles.",
            "Conserver un encadrement humain attentif autour des outils interactifs.",
            "Laisser les élèves apprendre seuls sans enseignants.",
            "Interdire la lecture de livres papier."
          ],
          correctIndex: 1,
          explanation: "Experts recommend maintaining strict human teacher oversight alongside technology.",
          hint: "Find 'nécessité de maintenir un encadrement humain'."
        },
        {
          id: "tcf2-read-9",
          questionNumber: 9,
          passage: "Écologie Marine : La création de zones marines protégées où la pêche industrielle est proscrite permet la régénération spectaculaire des stocks de poissons en moins de cinq ans.",
          passageEnglish: "Marine Ecology: Creating protected marine areas where industrial fishing is banned allows spectacular fish stock regeneration in under five years.",
          text: "Quel est l'effet des zones marines protégées ?",
          options: [
            "La disparition définitive de la faune aquatique.",
            "La régénération rapide des populations de poissons.",
            "La baisse de la qualité de l'eau de mer.",
            "L'augmentation du tourisme de masse."
          ],
          correctIndex: 1,
          explanation: "Marine protected zones lead to rapid fish population recovery.",
          hint: "Look for 'régénération spectaculaire des stocks'."
        },
        {
          id: "tcf2-read-10",
          questionNumber: 10,
          passage: "Droit International et Numérique : La souveraineté des données personnelles exige des régulations internationales harmonisées afin d'empêcher les abus d'exploitation commerciale transfrontalière.",
          passageEnglish: "International Digital Law: Personal data sovereignty demands harmonized international regulations to prevent cross-border commercial exploitation abuses.",
          text: "Que préconise l'article pour protéger les données personnelles ?",
          options: [
            "La suppression d'Internet à l'échelle mondiale.",
            "Une harmonisation des lois internationales de régulation.",
            "L'interdiction de créer de nouvelles entreprises informatiques.",
            "La vente libre des données aux plus offrants."
          ],
          correctIndex: 1,
          explanation: "Protecting personal data requires harmonized international laws and standards.",
          hint: "Notice 'régulations internationales harmonisées'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Argumentative essay writing for Canadian Express Entry.",
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
          guidedTips: [
            "Présenter la problématique",
            "Développer 2 arguments solides",
            "Conclure avec une synthèse claire"
          ]
        }
      ]
    },
    {
      type: "EXPRESSION_ORALE",
      title: "Expression Orale (Speaking)",
      description: "Interactive debate with oral examiner.",
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
  description: "Full-length simulator tailored for TEF Canada Paris Chamber of Commerce (CCI) standards.",
  totalDurationMins: 135,
  isSamplePaper: true,
  published: true,
  sections: [
    {
      type: "COMPREHENSION_ORALE",
      title: "Compréhension Orale (Listening)",
      description: "Audio passages, public announcements, and conversations (A1 to C2).",
      durationMins: 40,
      totalQuestions: 10,
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
        },
        {
          id: "tef1-lis-2",
          questionNumber: 2,
          text: "Message téléphonique : 'Bonjour, le garage automobile vous informe que votre véhicule est prêt. Vous pouvez venir le chercher avant 18h30.' Que doit faire le client ?",
          options: [
            "Rappeler le garage pour annuler la réparation.",
            "Venir récupérer sa voiture avant 18h30.",
            "Commander une nouvelle pièce détachée.",
            "Payer la facture par courrier."
          ],
          correctIndex: 1,
          explanation: "The auto repair shop notifies the customer to pick up the car before 6:30pm.",
          hint: "Listen for 'venir le chercher avant 18h30'.",
          transcript: "Bonjour, le garage automobile vous informe que votre véhicule est prêt. Vous pouvez venir le chercher avant 18h30.",
          transcriptEnglish: "Hello, the auto repair shop is letting you know your vehicle is ready. You can pick it up before 6:30pm."
        },
        {
          id: "tef1-lis-3",
          questionNumber: 3,
          text: "Dialogue au restaurant : 'Désolé Monsieur, nous n'avons plus de table disponible en terrasse. Souhaitez-vous une table près du bar ?' Quelle est la situation ?",
          options: [
            "Le restaurant est complètement fermé.",
            "La terrasse est complète mais une table est libre à l'intérieur.",
            "Le serveur refuse de servir le client.",
            "La réservation a été annulée par le client."
          ],
          correctIndex: 1,
          explanation: "The outdoor patio is fully booked, but an indoor table near the bar is offered.",
          hint: "Listen for 'plus de table en terrasse... table près du bar'.",
          transcript: "Désolé Monsieur, nous n'avons plus de table disponible en terrasse. Souhaitez-vous une table près du bar à l'intérieur ?",
          transcriptEnglish: "Sorry sir, we have no tables left on the patio. Would you like a table inside near the bar?"
        },
        {
          id: "tef1-lis-4",
          questionNumber: 4,
          text: "Annonce dans un train VIA Rail : 'En raison de la présence d'animaux sur la voie, notre train enregistre un retard d'environ 15 minutes.' Quelle est la raison du retard ?",
          options: [
            "Des problèmes mécaniques sur la locomotive.",
            "La présence d'animaux sur les voies ferrées.",
            "Une tempête de neige imprévue.",
            "Un contrôle des billets des voyageurs."
          ],
          correctIndex: 1,
          explanation: "Animals on the tracks are causing a 15-minute train delay.",
          hint: "Listen for 'animaux sur la voie'.",
          transcript: "Mesdames et messieurs, en raison de la présence d'animaux sur la voie, notre train enregistre un retard d'environ 15 minutes.",
          transcriptEnglish: "Ladies and gentlemen, due to animals on the track, our train is delayed by approximately 15 minutes."
        },
        {
          id: "tef1-lis-5",
          questionNumber: 5,
          text: "Message publicitaire : 'Inscrivez-vous avant la fin du mois au club de fitness et profitez des deux premiers mois à moitié prix !' Quelle est l'offre promotionnelle ?",
          options: [
            "Une réduction de 50% sur les 2 premiers mois.",
            "L'accès gratuit toute l'année.",
            "Un sac de sport offert aux 10 premiers clients.",
            "Un cours individuel avec un coach olympique."
          ],
          correctIndex: 0,
          explanation: "Registering before month-end gives a 50% discount ('à moitié prix') on the first 2 months.",
          hint: "Notice 'deux premiers mois à moitié prix'.",
          transcript: "Inscrivez-vous avant la fin du mois au club de fitness et profitez des deux premiers mois à moitié prix !",
          transcriptEnglish: "Sign up before month-end at the fitness club and enjoy the first two months at half price!"
        },
        {
          id: "tef1-lis-6",
          questionNumber: 6,
          text: "Chronique santé radio : 'Remplacer les boissons sucrées par de l'eau permet de réduire l'apport calorique quotidien de 250 calories en moyenne.' Quel conseil est donné ?",
          options: [
            "Boire des jus de fruits concentrés.",
            "Boire de l'eau plutôt que des boissons sucrées.",
            "Consommer davantage de boissons gazeuses.",
            "Éviter de boire pendant les repas."
          ],
          correctIndex: 1,
          explanation: "Replacing sugary drinks with water lowers daily calorie intake by 250 calories.",
          hint: "Focus on 'remplacer les boissons sucrées par de l'eau'.",
          transcript: "Remplacer systématiquement les boissons sucrées par de l'eau permet de réduire l'apport calorique quotidien de 250 calories.",
          transcriptEnglish: "Systematically replacing sugary drinks with water reduces daily calorie intake by 250 calories."
        },
        {
          id: "tef1-lis-7",
          questionNumber: 7,
          text: "Reportage économique : 'L'essor du commerce en ligne a entraîné une hausse de 35% de la demande en espaces de stockage logistique au Canada.' Quel secteur connaît une hausse ?",
          options: [
            "Les magasins de vêtements traditionnels.",
            "L'immobilier logistique et de stockage.",
            "Les agences de voyage physiques.",
            "Les usines d'impression de catalogues."
          ],
          correctIndex: 1,
          explanation: "E-commerce growth has increased demand for logistics storage space by 35%.",
          hint: "Notice 'espaces de stockage logistique'.",
          transcript: "L'essor rapide du commerce en ligne a entraîné une hausse de 35% de la demande en espaces de stockage logistique au Canada.",
          transcriptEnglish: "The rapid boom in e-commerce has led to a 35% increase in demand for logistics storage space in Canada."
        },
        {
          id: "tef1-lis-8",
          questionNumber: 8,
          text: "Interview d'un chercheur en environnement : 'Le recyclage des batteries au lithium permettra de récupérer 90% des métaux rares d'ici 2030.' Quel est le taux de récupération estimé ?",
          options: [
            "10%",
            "50%",
            "90%",
            "100%"
          ],
          correctIndex: 2,
          explanation: "Lithium battery recycling will allow recovering 90% of rare metals by 2030.",
          hint: "Listen for 'récupérer 90% des métaux rares'.",
          transcript: "Les nouvelles technologies de recyclage des batteries au lithium permettront de récupérer jusqu'à 90% des métaux rares d'ici 2030.",
          transcriptEnglish: "New lithium battery recycling technologies will allow recovering up to 90% of rare metals by 2030."
        },
        {
          id: "tef1-lis-9",
          questionNumber: 9,
          text: "Extrait de débat sur l'éducation : 'La formation pratique en entreprise complète efficacement les enseignements théoriques dispensés à l'université.' Quelle est l'idée clé ?",
          options: [
            "Supprimer complètement les cours théoriques.",
            "Associer la pratique en entreprise aux cours théoriques.",
            "Interdire le stage en entreprise.",
            "Obliger les étudiants à créer leur propre société."
          ],
          correctIndex: 1,
          explanation: "Practical workplace training effectively complements university theoretical studies.",
          hint: "Notice 'complète efficacement les enseignements théoriques'.",
          transcript: "La formation pratique en entreprise complète efficacement les enseignements théoriques dispensés dans les universités.",
          transcriptEnglish: "Practical workplace training effectively complements theoretical coursework delivered in universities."
        },
        {
          id: "tef1-lis-10",
          questionNumber: 10,
          text: "Conférence sur l'urbanisme : 'La densification raisonnée des quartiers urbains évite l'étalement urbain et préserve les terres agricoles environnantes.' Quel est l'objectif ?",
          options: [
            "Construire des autoroutes sur les terres agricoles.",
            "Préserver les espaces agricoles en densifiant la ville.",
            "Interdire la construction de nouveaux logements.",
            "Augmenter l'utilisation de la voiture en banlieue."
          ],
          correctIndex: 1,
          explanation: "Reasoned urban densification prevents sprawl and protects surrounding farmland.",
          hint: "Listen for 'préserve les terres agricoles'.",
          transcript: "La densification raisonnée des quartiers urbains évite l'étalement urbain incontrôlé et préserve précieusement les terres agricoles environnantes.",
          transcriptEnglish: "Reasoned densification of urban neighborhoods prevents uncontrolled sprawl and preciously preserves surrounding farmland."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Press articles, administrative documents, and synthesis questions (A1 to C2).",
      durationMins: 60,
      totalQuestions: 10,
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
        },
        {
          id: "tef1-read-2",
          questionNumber: 2,
          passage: "Plan Climat à Montréal : La ville s'engage à planter 500 000 arbres d'ici 2030 afin d'accroître la couverture de la canopée urbaine et d'embellir les espaces publics.",
          passageEnglish: "Climate Plan in Montreal: The city pledges to plant 500,000 trees by 2030 to increase urban canopy coverage and beautify public spaces.",
          text: "Quel engagement a été pris par la ville de Montréal ?",
          options: [
            "Planter 500 000 arbres d'ici 2030.",
            "Couper tous les arbres anciens.",
            "Fermer les parcs municipaux.",
            "Construire des parkings souterrains."
          ],
          correctIndex: 0,
          explanation: "Montreal pledged to plant 500,000 trees by 2030.",
          hint: "Find 'plantier 500 000 arbres'."
        },
        {
          id: "tef1-read-3",
          questionNumber: 3,
          passage: "Guide du consommateur : Acheter des produits de saison issus de circuits courts garantit la fraîcheur des aliments tout en soutenant l'économie des producteurs locaux.",
          passageEnglish: "Consumer Guide: Buying seasonal local products guarantees food freshness while supporting local farmer economics.",
          text: "Quel est l'un des avantages d'acheter en circuit court ?",
          options: [
            "Payer des frais de livraison internationaux.",
            "Obtenir des aliments frais et soutenir les producteurs locaux.",
            "Manger uniquement des produits surgelés.",
            "Augmenter les emballages en plastique."
          ],
          correctIndex: 1,
          explanation: "Buying short supply chain local food guarantees freshness and supports local farmers.",
          hint: "Notice 'fraîcheur... soutenant l'économie des producteurs'."
        },
        {
          id: "tef1-read-4",
          questionNumber: 4,
          passage: "Étude sur le sommeil : L'exposition aux écrans lumineux avant de dormir ralentit la sécrétion de mélatonine et dégrade la qualité du sommeil réparateur.",
          passageEnglish: "Sleep Study: Exposure to bright screens before bed delays melatonin secretion and degrades restful sleep quality.",
          text: "Quel effet produit l'exposition aux écrans le soir ?",
          options: [
            "Une amélioration de la qualité du sommeil.",
            "Une perturbation de la sécrétion de mélatonine.",
            "Une hausse de la mémoire à long terme.",
            "Une guérison accélérée des blessures."
          ],
          correctIndex: 1,
          explanation: "Evening screen exposure disrupts melatonin secretion and reduces sleep quality.",
          hint: "Find 'ralentit la sécrétion de mélatonine'."
        },
        {
          id: "tef1-read-5",
          questionNumber: 5,
          passage: "Santé et Éducation : L'implantation de cantines scolaires proposant des repas 100% biologiques a permis d'améliorer la concentration des élèves en classe de 20%.",
          passageEnglish: "Health & Education: Introducing 100% organic school cafeterias improved student classroom focus by 20%.",
          text: "Quel effet a été constaté grâce aux cantines biologiques ?",
          options: [
            "Une hausse de la concentration des élèves.",
            "La fermeture des écoles durant l'après-midi.",
            "Une baisse des notes d'examen.",
            "L'obligation de manger chez soi."
          ],
          correctIndex: 0,
          explanation: "Organic school cafeterias led to a 20% increase in student concentration.",
          hint: "Notice 'améliorer la concentration de 20%'."
        },
        {
          id: "tef1-read-6",
          questionNumber: 6,
          passage: "Nouvelles Technologies : La télémédecine permet aux habitants des zones rurales éloignées de consulter des médecins spécialistes sans devoir effectuer de longs trajets.",
          passageEnglish: "New Technologies: Telemedicine enables rural residents in remote areas to consult specialist doctors without travelling long distances.",
          text: "Quel problème la télémédecine résout-elle en zone rurale ?",
          options: [
            "La fermeture des pharmacies de village.",
            "La nécessité d'effectuer de longs déplacements pour voir un spécialiste.",
            "Le manque d'accès au réseau Internet.",
            "Le coût élevé des médicaments de base."
          ],
          correctIndex: 1,
          explanation: "Telemedicine eliminates the need for rural patients to travel long distances for specialist care.",
          hint: "Find 'sans devoir effectuer de longs trajets'."
        },
        {
          id: "tef1-read-7",
          questionNumber: 7,
          passage: "Économie Verte : L'industrie textile responsable développe des fibres à partir de déchets de fruits pour remplacer le cuir synthétique issu du pétrole.",
          passageEnglish: "Green Economy: Sustainable textile industry develops fibers from fruit waste to replace petroleum synthetic leather.",
          text: "Comment les nouvelles fibres textiles écologiques sont-elles produites ?",
          options: [
            "À partir du recyclage de plastiques marins.",
            "À partir de déchets de fruits.",
            "En utilisant exclusivement du pétrole brut.",
            "Par l'élevage intensif de vers à soie."
          ],
          correctIndex: 1,
          explanation: "Sustainable textile companies turn fruit waste into eco-friendly plant fibers.",
          hint: "Notice 'fibres à partir de déchets de fruits'."
        },
        {
          id: "tef1-read-8",
          questionNumber: 8,
          passage: "Gestion des Entreprises : Les entreprises adoptant la semaine de travail de 4 jours observent une réduction de 40% du stress perçu par les salariés sans baisse de productivité.",
          passageEnglish: "Corporate Management: Companies adopting a 4-day workweek observe a 40% drop in employee stress with no fall in productivity.",
          text: "Quel est l'impact de la semaine de 4 jours selon l'étude ?",
          options: [
            "Une réduction importante du stress sans perte de productivité.",
            "Une baisse dramatique des chiffres d'affaires.",
            "L'obligation de licencier la moitié des effectifs.",
            "Une augmentation des heures supplémentaires."
          ],
          correctIndex: 0,
          explanation: "A 4-day workweek cuts stress by 40% while maintaining business productivity.",
          hint: "Look for 'réduction de 40% du stress... sans baisse de productivité'."
        },
        {
          id: "tef1-read-9",
          questionNumber: 9,
          passage: "Patrimoine et Culture : La numérisation en haute définition des archives historiques permet aux chercheurs du monde entier d'accéder gratuitement à des manuscrits rares.",
          passageEnglish: "Heritage & Culture: HD digitization of historical archives allows researchers worldwide free access to rare manuscripts.",
          text: "Quel avantage offre la numérisation des archives ?",
          options: [
            "L'accès gratuit et à distance à des documents rares.",
            "La destruction des originaux sur papier.",
            "L'obligation de visiter physiquement les bibliothèques.",
            "La vente commerciale des archives aux collectionneurs."
          ],
          correctIndex: 0,
          explanation: "HD digital archives offer global remote free access to rare historical manuscripts.",
          hint: "Notice 'accéder gratuitement à des manuscrits rares'."
        },
        {
          id: "tef1-read-10",
          questionNumber: 10,
          passage: "Recherche en Biologie : La découverte de bactéries capables de dégrader les microplastiques en eau douce ouvre la voie à des stations de dépollution biologiques novatrices.",
          passageEnglish: "Biological Research: Discovering bacteria capable of degrading microplastics in freshwater paves the way for innovative biological cleanup stations.",
          text: "Quelle est la particularité des bactéries découvertes ?",
          options: [
            "Elles produisent des plastiques biodégradables.",
            "Elles dégradent les microplastiques présents dans l'eau.",
            "Elles rendent l'eau de pluie potable sans traitement.",
            "Elles détruisent les plantes aquatiques."
          ],
          correctIndex: 1,
          explanation: "Newly discovered bacteria break down microplastic pollutants in freshwater ecosystems.",
          hint: "Notice 'dégrader les microplastiques en eau douce'."
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
        },
        {
          id: "tef1-w2",
          taskNumber: 2,
          title: "Section B : Lettre d'opinion persuasive (Letter to Editor)",
          prompt: "La municipalité souhaite remplacer une place publique historique par un centre commercial. Écrivez une lettre au maire (200 mots minimum) pour défendre la préservation du patrimoine urbain.",
          wordCountMin: 200,
          wordCountMax: 250,
          timeLimitMins: 35,
          guidedTips: [
            "Salutation formelle (Monsieur le Maire)",
            "Exprimer l'inquiétude des habitants",
            "Présenter 2 arguments patrimoniaux et écologiques",
            "Formule de politesse formelle"
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
        },
        {
          id: "tef1-spk-2",
          taskNumber: 2,
          title: "Section B : Convaincre un ami (Persuasive Speaking)",
          scenario: "Un ami hésite à partir faire du camping sauvage ce week-end. Convainquez-le d'accepter cette aventure avec vous.",
          prepTimeMins: 1,
          speakingTimeMins: 10,
          keyPhrases: [
            "Pense à la beauté des paysages !",
            "Je m'occupe de tout le matériel.",
            "C'est l'occasion idéale de se déconnecter."
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
      description: "Radio interviews and complex dialogs (A1 to C2).",
      durationMins: 40,
      totalQuestions: 10,
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
        },
        {
          id: "tef2-lis-2",
          questionNumber: 2,
          text: "Annonce dans un musée : 'La conférence sur la peinture impressionniste débutera dans l'amphithéâtre principal dans 10 minutes. Merci d'éteindre vos téléphones portables.' Que doivent faire les visiteurs ?",
          options: [
            "Éteindre leurs téléphones mobiles.",
            "Acheter un catalogue de peinture.",
            "Sortir immédiatement du bâtiment.",
            "Prendre des photos avec flash."
          ],
          correctIndex: 0,
          explanation: "Visitors are asked to turn off mobile phones before the lecture.",
          hint: "Listen for 'éteindre vos téléphones portables'.",
          transcript: "La conférence sur la peinture impressionniste débutera dans l'amphithéâtre principal dans 10 minutes. Merci d'éteindre vos téléphones portables.",
          transcriptEnglish: "The impressionist painting lecture will begin in the main amphitheater in 10 minutes. Please turn off your mobile phones."
        },
        {
          id: "tef2-lis-3",
          questionNumber: 3,
          text: "Message vocal de clinique : 'Votre rendez-vous médical avec le docteur Roy est confirmé pour demain à 14h15. En cas d'empêchement, veuillez annuler 24h à l'avance.' Quand doit-on annuler ?",
          options: [
            "Au moins 24 heures à l'avance.",
            "Juste après l'heure du rendez-vous.",
            "Le mois suivant la consultation.",
            "Aucune annulation n'est possible."
          ],
          correctIndex: 0,
          explanation: "Medical clinic requires 24h advance notice for appointment cancellation.",
          hint: "Notice 'annuler 24h à l'avance'.",
          transcript: "Votre rendez-vous médical avec le docteur Roy est confirmé pour demain à 14h15. En cas d'empêchement, veuillez prévenir 24h à l'avance.",
          transcriptEnglish: "Your medical appointment with Dr. Roy is confirmed for tomorrow at 2:15pm. If unable to attend, please notify 24h in advance."
        },
        {
          id: "tef2-lis-4",
          questionNumber: 4,
          text: "Chronique automobile : 'Les véhicules électriques représentent désormais 18% des nouvelles immatriculations au Canada ce trimestre.' Quel chiffre est cité ?",
          options: [
            "5%",
            "18%",
            "50%",
            "80%"
          ],
          correctIndex: 1,
          explanation: "Electric vehicles account for 18% of new vehicle registrations this quarter.",
          hint: "Listen for '18% des nouvelles immatriculations'.",
          transcript: "Les véhicules électriques représentent désormais 18% des nouvelles immatriculations de voitures au Canada ce trimestre.",
          transcriptEnglish: "Electric vehicles now account for 18% of new car registrations in Canada this quarter."
        },
        {
          id: "tef2-lis-5",
          questionNumber: 5,
          text: "Reportage culinaire : 'La fermentation naturelle des aliments améliore la digestion et favorise l'équilibre de la flore intestinale.' Quel est le bénéfice ?",
          options: [
            "Favoriser la digestion et la flore intestinale.",
            "Augmenter le temps de cuisson des plats.",
            "Rendre les aliments toxiques.",
            "Empêcher la conservation du pain."
          ],
          correctIndex: 0,
          explanation: "Natural food fermentation aids digestion and supports gut microbiome health.",
          hint: "Notice 'améliore la digestion'.",
          transcript: "La fermentation naturelle des aliments améliore considérablement la digestion et favorise la santé de la flore intestinale.",
          transcriptEnglish: "Natural food fermentation significantly improves digestion and promotes healthy gut flora."
        },
        {
          id: "tef2-lis-6",
          questionNumber: 6,
          text: "Interview d'un biologiste : 'La fonte accélérée des glaciers alpins entraîne une baisse du débit des fleuves en période estivale.' Quelle est la conséquence ?",
          options: [
            "L'augmentation des pluies tropicales.",
            "La baisse du débit des fleuves en été.",
            "La hausse du niveau des lacs d'altitude.",
            "Le refroidissement général du climat."
          ],
          correctIndex: 1,
          explanation: "Melting alpine glaciers result in lower river flow rates during summer.",
          hint: "Listen for 'baisse du débit des fleuves'.",
          transcript: "La fonte accélérée des glaciers alpins entraîne inévitablement une baisse du débit des fleuves durant la période estivale.",
          transcriptEnglish: "Accelerated melting of alpine glaciers inevitably leads to decreased river flow rates during summer."
        },
        {
          id: "tef2-lis-7",
          questionNumber: 7,
          text: "Chronique technologique : 'La cybersécurité des infrastructures critiques nécessite l'utilisation d'algorithmes de chiffrement quantique.' Que requiert la sécurité ?",
          options: [
            "L'abandon des ordinateurs connectés.",
            "Le chiffrement quantique des données.",
            "L'interdiction des mots de passe complexes.",
            "La fermeture des banques en ligne."
          ],
          correctIndex: 1,
          explanation: "Critical infrastructure cybersecurity requires quantum encryption algorithms.",
          hint: "Notice 'chiffrement quantique'.",
          transcript: "La protection des infrastructures critiques nécessite aujourd'hui le déploiement d'algorithmes de chiffrement quantique ultra-sécurisés.",
          transcriptEnglish: "Protecting critical infrastructure today requires deploying ultra-secure quantum encryption algorithms."
        },
        {
          id: "tef2-lis-8",
          questionNumber: 8,
          text: "Débat d'urbanistes : 'La réduction de l'empreinte carbone urbaine exige d'accorder la priorité absolue aux transports actifs comme le vélo et la marche.' Quelles activités sont prioritaires ?",
          options: [
            "La construction d'autoroutes urbaines.",
            "Les transports actifs (vélo et marche).",
            "L'utilisation de véhicules utilitaires lourds.",
            "Les vols aériens régionaux."
          ],
          correctIndex: 1,
          explanation: "Reducing urban carbon footprints demands prioritizing active transportation like cycling and walking.",
          hint: "Focus on 'transports actifs (vélo et marche)'.",
          transcript: "Pour réduire l'empreinte carbone urbaine, nous devons accorder une priorité absolue aux transports actifs comme le vélo et la marche à pied.",
          transcriptEnglish: "To reduce urban carbon footprints, we must give top priority to active transport like cycling and walking."
        },
        {
          id: "tef2-lis-9",
          questionNumber: 9,
          text: "Interview d'un économiste : 'L'économie circulaire permet de transformer les déchets industriels en matières premières secondaires valorisables.' Quel est le principe ?",
          options: [
            "Jeter tous les déchets dans l'océan.",
            "Transformer les déchets industriels en ressources valorisables.",
            "Augmenter l'extraction pétrolière.",
            "Interdire le recyclage du métal."
          ],
          correctIndex: 1,
          explanation: "Circular economics repurpose industrial waste into valuable secondary raw materials.",
          hint: "Notice 'déchets... en matières premières secondaires'.",
          transcript: "L'économie circulaire offre l'opportunité de transformer les déchets industriels en matières premières secondaires hautement valorisables.",
          transcriptEnglish: "Circular economy offers the opportunity to turn industrial waste into highly valuable secondary raw materials."
        },
        {
          id: "tef2-lis-10",
          questionNumber: 10,
          text: "Conférence de philosophie politique : 'La démocratie délibérative implique un engagement citoyen continu au-delà de l'acte électoral ponctuel.' Que préconise le conférencier ?",
          options: [
            "Limiter la participation au vote quinquennal.",
            "Favoriser une implication citoyenne continue.",
            "Supprimer le droit de vote aux élections.",
            "Remplacer les élus par des tirages au sort."
          ],
          correctIndex: 1,
          explanation: "Deliberative democracy requires ongoing civic participation beyond occasional voting.",
          hint: "Notice 'engagement citoyen continu'.",
          transcript: "La véritable démocratie délibérative exige un engagement citoyen continu et éclairé, dépassant le simple geste électoral ponctuel.",
          transcriptEnglish: "True deliberative democracy demands continuous informed civic engagement, going beyond mere occasional voting."
        }
      ]
    },
    {
      type: "COMPREHENSION_ECRITE",
      title: "Compréhension Écrite (Reading)",
      description: "Editorial columns and economic synthesis (A1 to C2).",
      durationMins: 60,
      totalQuestions: 10,
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
        },
        {
          id: "tef2-read-2",
          questionNumber: 2,
          passage: "Agriculture de Précision : L'utilisation de capteurs d'humidité connectés dans les champs permet d'optimiser l'arrosage agricole et de réduire la consommation d'eau de 35%.",
          passageEnglish: "Precision Agriculture: Using connected soil moisture sensors in crop fields optimizes irrigation and cuts agricultural water use by 35%.",
          text: "Quel est le résultat principal apporté par les capteurs d'humidité ?",
          options: [
            "La hausse des coûts de fertilisants.",
            "Une réduction de 35% de la consommation d'eau.",
            "L'arrêt complet des récoltes d'été.",
            "L'obligation de travailler la nuit."
          ],
          correctIndex: 1,
          explanation: "Soil moisture sensors reduce agricultural water usage by 35%.",
          hint: "Notice 'réduire la consommation d'eau de 35%'."
        },
        {
          id: "tef2-read-3",
          questionNumber: 3,
          passage: "Architecture Bioclimatique : L'orientation sud des bâtiments associée à des matériaux à forte inertie thermique permet de réduire les besoins en chauffage hivernal de 50%.",
          passageEnglish: "Bioclimatic Architecture: Southward building orientation paired with high thermal mass materials slashes winter heating requirements by 50%.",
          text: "Comment la conception bioclimatique réduit-elle les factures de chauffage ?",
          options: [
            "En installant des fenêtres sans vitrage.",
            "Grâce à l'orientation sud et à l'inertie des matériaux.",
            "En isolant uniquement le sous-sol.",
            "Par l'interdiction d'utiliser le gaz naturel."
          ],
          correctIndex: 1,
          explanation: "Southward building orientation and high thermal mass materials cut winter heating needs by half.",
          hint: "Look for 'orientation sud... matériaux à forte inertie'."
        },
        {
          id: "tef2-read-4",
          questionNumber: 4,
          passage: "Économie de la Connaissance : La création de clusters d'innovation regroupant universités et centres de recherche privés stimule la création de brevets de 40%.",
          passageEnglish: "Knowledge Economy: Creating innovation clusters grouping universities and private research labs boosts patent creation by 40%.",
          text: "Quel est l'effet des clusters d'innovation ?",
          options: [
            "Une augmentation de 40% de la création de brevets.",
            "La fuite des étudiants diplômés vers l'étranger.",
            "La baisse du nombre de chercheurs scientifiques.",
            "L'interdiction de publier des articles scientifiques."
          ],
          correctIndex: 0,
          explanation: "Innovation clusters linking universities and private labs increase patent generation by 40%.",
          hint: "Find 'stimule la création de brevets de 40%'."
        },
        {
          id: "tef2-read-5",
          questionNumber: 5,
          passage: "Santé et Prévention : La pratique régulière d'exercices d'étirement au bureau diminue de 60% la prévalence des troubles musculo-squelettiques chez les employés sur ordinateur.",
          passageEnglish: "Health & Prevention: Regular workplace stretching exercises reduce musculoskeletal disorder rates by 60% among desk workers.",
          text: "Quel bienfait apportent les exercices d'étirement au bureau ?",
          options: [
            "Une baisse importante des troubles musculo-squelettiques.",
            "Une augmentation de la fatigue oculaire.",
            "L'obligation de changer de siège de travail.",
            "Une réduction du salaire des employés."
          ],
          correctIndex: 0,
          explanation: "Regular office stretching reduces musculoskeletal disorders by 60%.",
          hint: "Notice 'diminue de 60% la prévalence des troubles'."
        },
        {
          id: "tef2-read-6",
          questionNumber: 6,
          passage: "Énergie Marine : La mise en service d'hydroliennes exploitant les courants marins côtiers fournit une électricité verte et prévisible à 15 000 foyers de l'est canadien.",
          passageEnglish: "Marine Energy: Commissioning tidal turbines using coastal sea currents provides green, predictable electricity to 15,000 eastern Canadian homes.",
          text: "Quel est l'avantage principal de l'énergie des hydroliennes maritimes ?",
          options: [
            "Fournir une électricité verte et prévisible.",
            "Produire du carburant pétrolier liquide.",
            "Accélérer le réchauffement des océans.",
            "Interdire la navigation des navires de pêche."
          ],
          correctIndex: 0,
          explanation: "Tidal turbines harness sea currents to generate clean, predictable electricity.",
          hint: "Find 'électricité verte et prévisible'."
        },
        {
          id: "tef2-read-7",
          questionNumber: 7,
          passage: "Sociologie Urbaine : L'aménagement de jardins communautaires participatifs renforce le lien social de proximité et diminue le sentiment d'isolement chez les séniors.",
          passageEnglish: "Urban Sociology: Establishing participatory community gardens strengthens local social ties and decreases isolation among seniors.",
          text: "Quel impact social apportent les jardins communautaires ?",
          options: [
            "Le renforcement du lien social et la baisse de l'isolement des aînés.",
            "La hausse de la criminalité de quartier.",
            "La privatisation des parcs municipaux.",
            "L'interdiction de jardiner le week-end."
          ],
          correctIndex: 0,
          explanation: "Community gardens foster neighborhood social connections and combat senior isolation.",
          hint: "Notice 'renforce le lien social... diminue l'isolement'."
        },
        {
          id: "tef2-read-8",
          questionNumber: 8,
          passage: "Recherche en Neurosciences : L'apprentissage de la musique dès l'enfance développe l'épaisseur du corps calleux cérébral, améliorant la vitesse de traitement de l'information.",
          passageEnglish: "Neuroscience Research: Learning music in early childhood enhances cerebral corpus callosum thickness, accelerating information processing speed.",
          text: "Quel effet la pratique musicale précoce a-t-elle sur le cerveau ?",
          options: [
            "L'amélioration de la vitesse de traitement de l'information.",
            "La baisse de l'audition chez les enfants.",
            "La perte de créativité artistique.",
            "L'incapacité à apprendre la mathématique."
          ],
          correctIndex: 0,
          explanation: "Early music training enhances brain structure and speeds information processing.",
          hint: "Find 'améliorant la vitesse de traitement de l'information'."
        },
        {
          id: "tef2-read-9",
          questionNumber: 9,
          passage: "Gestion des Déchets : Le principe de responsabilité élargie des producteurs oblige les fabricants à financer intégralement le recyclage des emballages qu'ils mettent sur le marché.",
          passageEnglish: "Waste Management: Extended Producer Responsibility principles force manufacturers to fully fund recycling for all packaging they commercialize.",
          text: "Que stipule la responsabilité élargie des producteurs ?",
          options: [
            "Les fabricants doivent financer le recyclage de leurs emballages.",
            "Les consommateurs doivent payer une amende pour chaque achat.",
            "Les gouvernements prennent en charge 100% des poubelles.",
            "Les emballages synthétiques deviennent obligatoires."
          ],
          correctIndex: 0,
          explanation: "Extended producer responsibility holds manufacturers financially accountable for recycling their packaging.",
          hint: "Notice 'oblige les fabricants à financer intégralement'."
        },
        {
          id: "tef2-read-10",
          questionNumber: 10,
          passage: "Économie Industrielle : L'éco-conception des produits industriels anticipe leur démontage et leur valorisation en fin de vie, réduisant l'empreinte environnementale de 70%.",
          passageEnglish: "Industrial Economy: Eco-designing industrial goods anticipates end-of-life disassembly and recycling, slashing environmental footprints by 70%.",
          text: "Quel est le bénéfice principal de l'éco-conception industrielle ?",
          options: [
            "Réduire l'empreinte environnementale globale de 70%.",
            "Rendre les produits impossibles à réparer.",
            "Augmenter le volume des déchets industriels.",
            "Interdire la vente d'équipements neufs."
          ],
          correctIndex: 0,
          explanation: "Industrial eco-design reduces products' lifecycle environmental footprint by 70%.",
          hint: "Look for 'réduisant l'empreinte environnementale de 70%'."
        }
      ]
    },
    {
      type: "EXPRESSION_ECRITE",
      title: "Expression Écrite (Writing)",
      description: "Section B (Formal Persuasive Letter to an Editor).",
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
