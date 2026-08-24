export interface SpeakingTaskData {
  id: string;
  taskNumber: 1 | 2 | 3;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  prompt: string;
  promptEnglish: string;
  prepTimeMins: number;
  speakingTimeMins: number;
  examinerPersona: {
    name: string;
    gender: "male" | "female";
    voiceId: string;
    roleDescription: string;
    greetingText: string;
    greetingTextEnglish: string;
    roleplayPrompt?: string;
    counterArgumentPrompt?: string;
  };
  guidedTips: string[];
  sampleTranscript?: string;
}

export interface PaperSpeakingSuite {
  paperNum: number;
  examinerName: string;
  examinerVoiceId: string;
  examinerGender: "male" | "female";
  tasks: SpeakingTaskData[];
}

export const MASTER_SPEAKING_SUITE: PaperSpeakingSuite[] = [
  // PAPER 1: Examiner Henri (fr-FR-HenriNeural, Male)
  {
    paperNum: 1,
    examinerName: "Examiner Henri",
    examinerVoiceId: "fr-FR-HenriNeural",
    examinerGender: "male",
    tasks: [
      {
        id: "spk-p1-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Présentation personnelle)",
        prompt: "Présentez-vous brièvement à l'examinateur : votre nom, votre profession, votre ville d'origine et vos motivations pour vous installer au Canada.",
        promptEnglish: "Briefly introduce yourself to the examiner: your name, profession, hometown, and your motivations for moving to Canada.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Henri",
          gender: "male",
          voiceId: "fr-FR-HenriNeural",
          roleDescription: "Examinateur senior courtois et bienveillant.",
          greetingText: "Bonjour et bienvenue à l'épreuve d'expression orale. Je m'appelle Henri. Pouvez-vous vous présenter brièvement et me parler de vos projets ?",
          greetingTextEnglish: "Hello and welcome to the speaking examination. My name is Henri. Could you briefly introduce yourself and tell me about your plans?"
        },
        guidedTips: [
          "Dites votre nom, âge et profession clairement.",
          "Expliquez en 1 à 2 phrases pourquoi vous apprenez le français.",
          "Maintenez un ton poli et naturel."
        ]
      },
      {
        id: "spk-p1-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Réservation de logement de vacances)",
        prompt: "Vous souhaitez louer un appartement de vacances à Québec pour deux semaines. Vous appelez le propriétaire (l'examinateur). Posez-lui une dizaine de questions sur le logement, les tarifs et les équipements.",
        promptEnglish: "You want to rent a vacation apartment in Quebec City for two weeks. You call the landlord (the examiner). Ask about 10 questions regarding the accommodation, prices, and amenities.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Henri (Propriétaire)",
          gender: "male",
          voiceId: "fr-FR-HenriNeural",
          roleDescription: "Propriétaire d'un appartement meublé à Québec.",
          greetingText: "Bonjour, M. Henri à l'appareil, propriétaire du logement du Vieux-Québec. Je vous écoute, quelles sont vos questions ?",
          greetingTextEnglish: "Hello, Mr. Henri speaking, owner of the Old Quebec apartment. I'm listening, what questions do you have?",
          roleplayPrompt: "Vous êtes le propriétaire. Répondez de manière réaliste et concise aux questions du candidat. Terminez par 'Avez-vous d'autres questions ?'."
        },
        guidedTips: [
          "Utilisez le vouvoiement formel ('Vous').",
          "Variez les structures de questions (Est-ce que... ?, Pourriez-vous... ?, Combien... ?).",
          "Demandez des précisions sur le loyer, la caution, le Wi-Fi et les transports."
        ]
      },
      {
        id: "spk-p1-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (Le travail à distance)",
        prompt: "Le télétravail généralisé nuit-il à la cohésion sociale et à la culture d'entreprise ? Exprimez votre opinion de manière structurée et argumentée.",
        promptEnglish: "Does widespread remote work harm social cohesion and company culture? Express your opinion in a structured, reasoned manner.",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Henri",
          gender: "male",
          voiceId: "fr-FR-HenriNeural",
          roleDescription: "Examinateur stimulant proposant une contre-argumentation polie.",
          greetingText: "Merci. Pour cette troisième tâche, que pensez-vous de l'impact du télétravail sur les relations professionnelles et la culture d'entreprise ?",
          greetingTextEnglish: "Thank you. For this third task, what do you think about the impact of remote work on professional relationships and corporate culture?",
          counterArgumentPrompt: "Écoutez l'argument du candidat puis posez une contre-question délicate (ex: 'C'est vrai, mais ne craignez-vous pas l'isolement des nouveaux employés ?')."
        },
        guidedTips: [
          "Structurez avec une introduction, deux arguments et une conclusion.",
          "Utilisez des connecteurs logiques (Tout d'abord, en revanche, par conséquent).",
          "Nuancez votre réponse face à l'objection de l'examinateur."
        ]
      }
    ]
  },

  // PAPER 2: Examiner Denise (fr-FR-DeniseNeural, Female)
  {
    paperNum: 2,
    examinerName: "Examiner Denise",
    examinerVoiceId: "fr-FR-DeniseNeural",
    examinerGender: "female",
    tasks: [
      {
        id: "spk-p2-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Parcours professionnel et loisirs)",
        prompt: "Présentez-vous à l'examinatrice : parlez de votre domaine d'études ou de travail, de vos centres d'intérêt et de vos activités du week-end.",
        promptEnglish: "Introduce yourself to the examiner: talk about your field of study or work, your interests, and your weekend activities.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Denise",
          gender: "female",
          voiceId: "fr-FR-DeniseNeural",
          roleDescription: "Examinatrice accueillante et dynamique.",
          greetingText: "Bonjour et bienvenue. Je m'appelle Denise. Racontez-moi un peu votre parcours professionnel et ce que vous aimez faire pendant votre temps libre.",
          greetingTextEnglish: "Hello and welcome. My name is Denise. Tell me a bit about your professional background and what you like to do in your free time."
        },
        guidedTips: [
          "Décrivez vos passe-temps (sport, lecture, voyages).",
          "Utilisez le présent de l'indicatif.",
          "Répondez avec assurance et clarté."
        ]
      },
      {
        id: "spk-p2-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Inscription à un cours de langue)",
        prompt: "Vous souhaitez vous inscrire à un cours de français intensif à Montréal. Vous contactez la responsable du centre (l'examinatrice). Posez-lui des questions sur les horaires, les niveaux, les tests de placement et les frais.",
        promptEnglish: "You want to enroll in an intensive French course in Montreal. You contact the center director (the examiner). Ask questions about schedules, levels, placement tests, and fees.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Denise (Directrice du centre)",
          gender: "female",
          voiceId: "fr-FR-DeniseNeural",
          roleDescription: "Directrice pédagogique d'une école de langues à Montréal.",
          greetingText: "Bonjour, école de langues de Montréal, Denise à l'appareil. Comment puis-je vous renseigner sur nos formations ?",
          greetingTextEnglish: "Hello, Montreal language school, Denise speaking. How can I help you with our training programs?",
          roleplayPrompt: "Répondez aux questions sur les horaires et les tarifs puis demandez si le candidat a d'autres interrogations."
        },
        guidedTips: [
          "Demandez la durée de la session et la taille des groupes.",
          "Informez-vous sur la délivrance d'une attestation officielle.",
          "Gardez un registre formel tout au long de l'échange."
        ]
      },
      {
        id: "spk-p2-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (L'usage des écrans chez les jeunes)",
        prompt: "Faut-il réglementer strictement l'accès aux réseaux sociaux et aux écrans pour les mineurs ? Défendez votre opinion avec des exemples précis.",
        promptEnglish: "Should access to social media and screens for minors be strictly regulated? Defend your opinion with specific examples.",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Denise",
          gender: "female",
          voiceId: "fr-FR-DeniseNeural",
          roleDescription: "Examinatrice perspicace testant la capacité de nuance du candidat.",
          greetingText: "Passons à la troisième partie. Selon vous, les pouvoirs publics doivent-ils limiter le temps d'écran et l'accès aux réseaux sociaux pour les adolescents ?",
          greetingTextEnglish: "Moving to the third part. In your view, should public authorities limit screen time and social media access for teenagers?",
          counterArgumentPrompt: "Posez une contre-question sur l'autonomie des familles et l'éducation numérique."
        },
        guidedTips: [
          "Présentez les risques de la surconsommation numérique (santé mentale, sommeil).",
          "Mentionnez l'importance de l'éducation plutôt que la simple interdiction.",
          "Concluez avec une perspective équilibrée."
        ]
      }
    ]
  },

  // PAPER 3: Examiner Jean (fr-CA-JeanNeural, Male Canadian)
  {
    paperNum: 3,
    examinerName: "Examiner Jean",
    examinerVoiceId: "fr-CA-JeanNeural",
    examinerGender: "male",
    tasks: [
      {
        id: "spk-p3-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (La vie quotidienne et la ville)",
        prompt: "Présentez-vous à l'examinateur : parlez de votre quartier, de votre logement et de ce que vous appréciez dans votre cadre de vie.",
        promptEnglish: "Introduce yourself to the examiner: talk about your neighborhood, your housing, and what you appreciate about your living environment.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Jean",
          gender: "male",
          voiceId: "fr-CA-JeanNeural",
          roleDescription: "Examinateur canadien chaleureux et à l'écoute.",
          greetingText: "Bonjour ! Je m'appelle Jean. Bienvenue à l'épreuve d'expression orale. Parlez-moi un peu de l'endroit où vous habitez et de votre quotidien.",
          greetingTextEnglish: "Hello! My name is Jean. Welcome to the oral examination. Tell me a bit about where you live and your daily routine."
        },
        guidedTips: [
          "Décrivez les commerces et transports à proximité de chez vous.",
          "Exprimez vos préférences (calme, verdure, vie culturelle).",
          "Soyez spontané et souriant."
        ]
      },
      {
        id: "spk-p3-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Organisation d'une activité communautaire)",
        prompt: "Vous souhaitez organiser une journée de nettoyage écologique dans votre quartier à Ottawa. Vous contactez le responsable des services municipaux (l'examinateur). Posez-lui des questions sur les autorisations, le matériel et la communication.",
        promptEnglish: "You want to organize a neighborhood eco-cleanup day in Ottawa. You contact the municipal services officer (the examiner). Ask questions about permits, supplies, and publicity.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Jean (Agent municipal)",
          gender: "male",
          voiceId: "fr-CA-JeanNeural",
          roleDescription: "Agent des services communautaires de la Ville d'Ottawa.",
          greetingText: "Bonjour, services citoyens de la Ville d'Ottawa, Jean à l'appareil. Je vous écoute pour votre projet de journée verte.",
          greetingTextEnglish: "Hello, City of Ottawa citizen services, Jean speaking. I'm listening regarding your green day project.",
          roleplayPrompt: "Répondez clairement sur la fourniture de sacs et de gants puis demandez si le candidat souhaite d'autres détails."
        },
        guidedTips: [
          "Interrogez sur les démarches administratives indispensables.",
          "Proposez une date et demandez si la mairie peut prêter du matériel.",
          "Maintenez une interaction fluide et structurée."
        ]
      },
      {
        id: "spk-p3-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (Gratuité des transports en commun)",
        prompt: "La gratuité totale des transports publics urbains est-elle la solution idéale pour lutter contre le changement climatique et les embouteillages ?",
        promptEnglish: "Is free public transit in urban areas the ideal solution to combat climate change and traffic congestion?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Jean",
          gender: "male",
          voiceId: "fr-CA-JeanNeural",
          roleDescription: "Examinateur rigoureux sollicitant des exemples économiques et sociaux.",
          greetingText: "Pour la dernière tâche, pensez-vous que rendre les autobus et métros entièrement gratuits soit une mesure efficace et financièrement viable ?",
          greetingTextEnglish: "For the final task, do you think making buses and subways completely free is an effective and financially viable measure?",
          counterArgumentPrompt: "Relancez sur le coût d'entretien des infrastructures et l'impact sur les impôts locaux."
        },
        guidedTips: [
          "Opposez les avantages environnementaux aux défis de financement public.",
          "Utilisez des verbes d'opinion (Je soutiens que, il me semble incontestable que).",
          "Répondez avec maturité aux contre-arguments."
        ]
      }
    ]
  },

  // PAPER 4: Examiner Sylvie (fr-CA-SylvieNeural, Female Canadian)
  {
    paperNum: 4,
    examinerName: "Examiner Sylvie",
    examinerVoiceId: "fr-CA-SylvieNeural",
    examinerGender: "female",
    tasks: [
      {
        id: "spk-p4-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Habitudes alimentaires et sorties)",
        prompt: "Présentez-vous à l'examinatrice : parlez de vos habitudes alimentaires, de vos plats préférés et de vos sorties au restaurant.",
        promptEnglish: "Introduce yourself to the examiner: speak about your eating habits, favorite dishes, and restaurant outings.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Sylvie",
          gender: "female",
          voiceId: "fr-CA-SylvieNeural",
          roleDescription: "Examinatrice canadienne bienveillante et communicative.",
          greetingText: "Bonjour ! Bienvenue à votre épreuve d'expression orale. Je suis Sylvie. Parlez-moi de votre cuisine préférée et de ce que vous aimez partager en famille.",
          greetingTextEnglish: "Hello! Welcome to your oral exam. I am Sylvie. Tell me about your favorite food and meals shared with family."
        },
        guidedTips: [
          "Mentionnez des spécialités de votre pays d'origine.",
          "Expliquez si vous aimez cuisiner vous-même.",
          "Articulez avec soin."
        ]
      },
      {
        id: "spk-p4-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Recherche d'un emploi d'été)",
        prompt: "Vous cherchez un emploi à temps partiel dans une librairie-café à Sherbrooke. Vous rencontrez la gérante (l'examinatrice). Posez-lui des questions sur les tâches, les horaires, le salaire et le profil recherché.",
        promptEnglish: "You are looking for a part-time job at a bookstore café in Sherbrooke. You meet the manager (the examiner). Ask questions about duties, hours, pay, and candidate requirements.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Sylvie (Gérante de librairie)",
          gender: "female",
          voiceId: "fr-CA-SylvieNeural",
          roleDescription: "Propriétaire engagée d'une librairie culturelle à Sherbrooke.",
          greetingText: "Bonjour ! Je suis Sylvie, la gérante de la librairie. Vous veniez vous informer pour le poste d'assistant ? Je vous écoute.",
          greetingTextEnglish: "Hello! I am Sylvie, the bookstore manager. You came to inquire about the assistant position? I'm listening.",
          roleplayPrompt: "Donnez des réponses précises sur le travail du samedi et le taux horaire puis demandez si tout est clair."
        },
        guidedTips: [
          "Présentez votre disponibilité hebdomadaire.",
          "Informez-vous sur les compétences requises (gestion de la caisse, service).",
          "Concluez en proposant de laisser votre curriculum vitae."
        ]
      },
      {
        id: "spk-p4-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (L'intelligence artificielle au travail)",
        prompt: "L'essor de l'intelligence artificielle générative menace-t-il l'emploi humain ou constitue-t-il un levier de productivité bénéfique ?",
        promptEnglish: "Does the rise of generative artificial intelligence threaten human employment or serve as a beneficial productivity driver?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Sylvie",
          gender: "female",
          voiceId: "fr-CA-SylvieNeural",
          roleDescription: "Examinatrice analytique évaluant la structuration logique du discours.",
          greetingText: "Abordons le troisième sujet. Quel est votre regard sur le développement de l'intelligence artificielle dans le monde professionnel ?",
          greetingTextEnglish: "Let's approach the third topic. What is your perspective on the development of artificial intelligence in the professional world?",
          counterArgumentPrompt: "Faites remarquer le risque d'automations destructrices de métiers créatifs et intellectuels."
        },
        guidedTips: [
          "Distinguez la substitution de tâches répétitives de la création de nouvelles valeurs.",
          "Abordez la nécessité de formations tout au long de la vie.",
          "Nuancez les craintes catastrophistes avec un pragmatisme éclairé."
        ]
      }
    ]
  },

  // PAPER 5: Examiner Marc (fr-FR-ClaudeNeural, Male)
  {
    paperNum: 5,
    examinerName: "Examiner Marc",
    examinerVoiceId: "fr-FR-ClaudeNeural",
    examinerGender: "male",
    tasks: [
      {
        id: "spk-p5-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Voyages et découvertes culturelles)",
        prompt: "Présentez-vous à l'examinateur : parlez des pays ou régions que vous avez visités et de vos destinations de rêve.",
        promptEnglish: "Introduce yourself to the examiner: talk about countries or regions you have visited and your dream destinations.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Marc",
          gender: "male",
          voiceId: "fr-FR-ClaudeNeural",
          roleDescription: "Examinateur calme et encourageant.",
          greetingText: "Bonjour et bienvenue. Je suis Marc. Racontez-moi un souvenir de voyage marquant ou l'endroit que vous aimeriez visiter prochainement.",
          greetingTextEnglish: "Hello and welcome. I am Marc. Tell me about a memorable travel memory or a place you would like to visit soon."
        },
        guidedTips: [
          "Utilisez le passé composé pour décrire un voyage antérieur.",
          "Expliquez ce qui vous attire (paysages, monuments, gastronomie).",
          "Adoptez un débit de parole fluide."
        ]
      },
      {
        id: "spk-p5-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Organisation d'un voyage d'études)",
        prompt: "Vous organisez une sortie culturelle pour votre groupe de camarades. Vous contactez le responsable d'un musée (l'examinateur). Posez des questions sur les visites guidées, les tarifs de groupe et les réservations.",
        promptEnglish: "You are organizing a cultural field trip for your study group. You contact a museum officer (the examiner). Ask about guided tours, group discounts, and booking requirements.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Marc (Responsable du musée)",
          gender: "male",
          voiceId: "fr-FR-ClaudeNeural",
          roleDescription: "Responsable de la billetterie et des groupes culturels.",
          greetingText: "Bonjour, service des réservations du musée, Marc à votre service. Comment puis-je vous aider à planifier votre visite ?",
          greetingTextEnglish: "Hello, museum booking department, Marc at your service. How can I help you plan your visit?",
          roleplayPrompt: "Expliquez la gratuité pour les accompagnateurs et demandez si le candidat souhaite réserver un créneau horaire précis."
        },
        guidedTips: [
          "Demandez s'il existe des dépliants en plusieurs langues.",
          "Vérifiez l'accès aux personnes à mobilité réduite.",
          "Remerciez chaleureusement à la fin."
        ]
      },
      {
        id: "spk-p5-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (Le tourisme de masse)",
        prompt: "Faut-il instaurer des quotas stricts d'accès aux sites naturels et historiques pour contrer les dégradations dues au surtourisme ?",
        promptEnglish: "Should strict access quotas be introduced for natural and historical sites to combat damage caused by overtourism?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Marc",
          gender: "male",
          voiceId: "fr-FR-ClaudeNeural",
          roleDescription: "Examinateur poussant à l'argumentation socio-économique.",
          greetingText: "Passons au sujet d'actualité. Le surtourisme menace de nombreux espaces naturels et monuments. Soutenez-vous la régulation par des quotas d'entrée ?",
          greetingTextEnglish: "Let's move to the topical subject. Overtourism threatens many natural spaces and monuments. Do you support regulation through entry quotas?",
          counterArgumentPrompt: "Soulignez l'impact économique négatif sur les commerçants locaux dépendants des visiteurs."
        },
        guidedTips: [
          "Pesez la protection de l'environnement face au développement économique.",
          "Illustrez avec des exemples connus (Venise, parcs nationaux).",
          "Formulez des propositions alternatives (étalement de la fréquentation)."
        ]
      }
    ]
  },

  // PAPER 6: Examiner Claire (fr-FR-BrigitteNeural, Female)
  {
    paperNum: 6,
    examinerName: "Examiner Claire",
    examinerVoiceId: "fr-FR-BrigitteNeural",
    examinerGender: "female",
    tasks: [
      {
        id: "spk-p6-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Activités quotidiennes et rythme de vie)",
        prompt: "Présentez-vous à l'examinatrice : décrivez une journée habituelle dans votre vie (matin, travail, repas, soirée).",
        promptEnglish: "Introduce yourself to the examiner: describe a typical day in your life (morning, work, meals, evening).",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Claire",
          gender: "female",
          voiceId: "fr-FR-BrigitteNeural",
          roleDescription: "Examinatrice attentive et bienveillante.",
          greetingText: "Bonjour ! Je m'appelle Claire. Soyez le bienvenu. Racontez-moi comment se déroule généralement votre journée de la semaine.",
          greetingTextEnglish: "Hello! My name is Claire. Welcome. Tell me how your typical weekday usually unfolds."
        },
        guidedTips: [
          "Utilisez des verbes pronominaux (se lever, se préparer).",
          "Indiquez les moments de la journée avec précision.",
          "Gardez un ton naturel."
        ]
      },
      {
        id: "spk-p6-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Location de voiture pour le week-end)",
        prompt: "Vous souhaitez louer un véhicule pour visiter la région ce week-end. Vous vous adressez à l'agent de l'agence de location (l'examinatrice). Posez des questions sur les modèles disponibles, l'assurance, le kilométrage et le dépôt de garantie.",
        promptEnglish: "You want to rent a car to visit the region this weekend. You speak to the rental agent (the examiner). Ask questions about available models, insurance, mileage, and security deposit.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Claire (Agent de location)",
          gender: "female",
          voiceId: "fr-FR-BrigitteNeural",
          roleDescription: "Conseillère chez Auto-Location Express.",
          greetingText: "Bonjour ! Bienvenue chez Auto-Express, je suis Claire. Quel type de véhicule recherchez-vous pour votre séjour ?",
          greetingTextEnglish: "Hello! Welcome to Auto-Express, I am Claire. What type of vehicle are you looking for during your trip?",
          roleplayPrompt: "Répondez aux questions sur les formules tout compris puis demandez si le candidat souhaite ajouter un conducteur secondaire."
        },
        guidedTips: [
          "Précisez la durée de la location et le nombre de passagers.",
          "Demandez si le carburant est inclus ou à restituer plein.",
          "Conservez une politesse courtoise."
        ]
      },
      {
        id: "spk-p6-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (L'apprentissage des langues par les nouvelles technologies)",
        prompt: "Les applications mobiles et l'intelligence artificielle remplaceront-elles à terme les enseignants de langues en classe ?",
        promptEnglish: "Will mobile apps and artificial intelligence eventually replace human language teachers in the classroom?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Claire",
          gender: "female",
          voiceId: "fr-FR-BrigitteNeural",
          roleDescription: "Examinatrice interrogeant l'humain face à la technologie.",
          greetingText: "Abordons notre troisième sujet. Pensez-vous que les outils numériques éducatifs puissent rendre l'enseignant de langue obsolète ?",
          greetingTextEnglish: "Let's address our third topic. Do you think digital educational tools can make human language teachers obsolete?",
          counterArgumentPrompt: "Insistez sur la disponibilité 24/7 et la personnalisation instantanée offertes par les algorithmes."
        },
        guidedTips: [
          "Mettez en avant la valeur irremplaçable de l'interaction humaine et de la culture.",
          "Reconnaissez la complémentarité des outils technologiques.",
          "Concluez par une vision hybride de l'éducation."
        ]
      }
    ]
  },

  // PAPER 7: Examiner Antoine (fr-CA-AntoineNeural, Male Canadian)
  {
    paperNum: 7,
    examinerName: "Examiner Antoine",
    examinerVoiceId: "fr-CA-AntoineNeural",
    examinerGender: "male",
    tasks: [
      {
        id: "spk-p7-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (Vie professionnelle et projets d'avenir)",
        prompt: "Présentez-vous à l'examinateur : parlez de votre domaine d'activité actuel et des objectifs professionnels que vous visez au Canada.",
        promptEnglish: "Introduce yourself to the examiner: speak about your current field of work and the professional goals you aim to achieve in Canada.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Antoine",
          gender: "male",
          voiceId: "fr-CA-AntoineNeural",
          roleDescription: "Examinateur canadien chaleureux et direct.",
          greetingText: "Bonjour ! Je suis Antoine. Bienvenue. Dites-moi dans quel secteur vous travaillez et quel est votre projet d'avenir au Canada.",
          greetingTextEnglish: "Hello! I am Antoine. Welcome. Tell me what sector you work in and what your future project is in Canada."
        },
        guidedTips: [
          "Décrivez vos responsabilités actuelles.",
          "Expliquez vos aspirations en matière d'intégration professionnelle.",
          "Maintenez une prononciation nette."
        ]
      },
      {
        id: "spk-p7-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Inauguration d'un centre sportif)",
        prompt: "Un nouveau complexe sportif ouvre dans votre municipalité à Gatineau. Vous vous renseignez auprès du responsable (l'examinateur). Posez des questions sur les abonnements, les cours collectifs, les équipements et les horaires d'ouverture.",
        promptEnglish: "A new sports complex is opening in your municipality in Gatineau. You inquire with the manager (the examiner). Ask questions about memberships, group classes, equipment, and opening hours.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Antoine (Directeur du centre)",
          gender: "male",
          voiceId: "fr-CA-AntoineNeural",
          roleDescription: "Directeur du complexe aquatique et sportif de Gatineau.",
          greetingText: "Allo ! Bienvenue au Complexe Sportif de Gatineau, je suis Antoine. Vous souhaitez des infos sur nos installations ?",
          greetingTextEnglish: "Hello! Welcome to Gatineau Sports Complex, I am Antoine. Would you like information about our facilities?",
          roleplayPrompt: "Présentez la piscine olympique et la salle d'entraînement puis demandez si le candidat désire une séance d'essai."
        },
        guidedTips: [
          "Informez-vous sur les tarifs pour étudiants ou familles.",
          "Demandez si la réservation préalable des cours est obligatoire.",
          "Montrez votre enthousiasme durant l'échange."
        ]
      },
      {
        id: "spk-p7-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (L'économie circulaire)",
        prompt: "Devrions-nous interdire la vente de produits à usage unique non recyclables pour imposer une économie circulaire intégrale ?",
        promptEnglish: "Should we ban the sale of non-recyclable single-use products to mandate a full circular economy?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Antoine",
          gender: "male",
          voiceId: "fr-CA-AntoineNeural",
          roleDescription: "Examinateur stimulant le débat environnemental.",
          greetingText: "Pour la troisième tâche, pensez-vous que l'État doive bannir totalement les plastiques et emballages éphémères pour forcer la transition écologique ?",
          greetingTextEnglish: "For the third task, do you think the State should totally ban plastics and disposable packaging to force ecological transition?",
          counterArgumentPrompt: "Relancez sur le coût supplémentaire répercuté sur le pouvoir d'achat des consommateurs modestes."
        },
        guidedTips: [
          "Argumentez en faveur de la réduction des déchets sauvages.",
          "Reconnaissez la nécessité d'une période d'adaptation pour les entreprises.",
          "Nuancez avec des incitations fiscales plutôt que des contraintes punitives."
        ]
      }
    ]
  },

  // PAPER 8: Examiner Isabelle (fr-FR-CelesteNeural, Female)
  {
    paperNum: 8,
    examinerName: "Examiner Isabelle",
    examinerVoiceId: "fr-FR-CelesteNeural",
    examinerGender: "female",
    tasks: [
      {
        id: "spk-p8-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (La culture et les sorties)",
        prompt: "Présentez-vous à l'examinatrice : parlez de vos goûts musicaux, de vos films préférés et de vos dernières activités culturelles.",
        promptEnglish: "Introduce yourself to the examiner: talk about your musical tastes, favorite movies, and recent cultural activities.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Isabelle",
          gender: "female",
          voiceId: "fr-FR-CelesteNeural",
          roleDescription: "Examinatrice souriante et très expressive.",
          greetingText: "Bonjour ! Bienvenue à votre épreuve d'oral. Je m'appelle Isabelle. Racontez-moi ce que vous aimez regarder ou écouter pour vous détendre.",
          greetingTextEnglish: "Hello! Welcome to your oral exam. My name is Isabelle. Tell me what you like to watch or listen to in order to relax."
        },
        guidedTips: [
          "Mentionnez un artiste ou un réalisateur que vous appréciez.",
          "Exprimez vos émotions (J'adore, cela me passionne).",
          "Gardez un bon rythme de réponse."
        ]
      },
      {
        id: "spk-p8-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Inscriptions à une association caritative)",
        prompt: "Vous souhaitez vous engager comme bénévole dans une banque alimentaire locale. Vous rencontrez la responsable (l'examinatrice). Posez-lui des questions sur les missions, le temps requis, les horaires et les formations fournies.",
        promptEnglish: "You want to volunteer at a local food bank. You meet the coordinator (the examiner). Ask questions about duties, time commitments, schedules, and training provided.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Isabelle (Coordonnatrice)",
          gender: "female",
          voiceId: "fr-FR-CelesteNeural",
          roleDescription: "Coordonnatrice du réseau de solidarité alimentaire.",
          greetingText: "Bonjour ! Merci d'être venu me voir pour le bénévolat. Je suis Isabelle. Quelles sont les interrogations que vous avez sur nos actions ?",
          greetingTextEnglish: "Hello! Thanks for coming to see me about volunteering. I am Isabelle. What questions do you have about our actions?",
          roleplayPrompt: "Expliquez l'importance du travail en équipe le samedi matin et demandez si le candidat est disponible."
        },
        guidedTips: [
          "Précisez vos compétences utiles (logistique, contact humain).",
          "Demandez si une attestation d'engagement peut être délivrée.",
          "Terminez sur une note d'enthousiasme citoyen."
        ]
      },
      {
        id: "spk-p8-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (L'uniforme scolaire)",
        prompt: "Le port de l'uniforme obligatoire à l'école est-il une mesure efficace pour réduire les inégalités sociales et favoriser l'égalité ?",
        promptEnglish: "Is mandatory school uniforms an effective measure to reduce social inequality and promote equality?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Isabelle",
          gender: "female",
          voiceId: "fr-FR-CelesteNeural",
          roleDescription: "Examinatrice attentive au débat éducatif.",
          greetingText: "Passons au sujet éducatif. Que pensez-vous du retour du port de l'uniforme dans les établissements scolaires ?",
          greetingTextEnglish: "Moving to the educational topic. What do you think about bringing back school uniforms in educational institutions?",
          counterArgumentPrompt: "Opposez le risque d'étouffer l'individualité et l'expression personnelle des élèves."
        },
        guidedTips: [
          "Mettez en balance le sentiment d'appartenance et la liberté d'expression.",
          "Citez l'impact sur le climat scolaire et les taquineries.",
          "Concluez avec une réflexion nuancée sur la laïcité et l'équité."
        ]
      }
    ]
  },

  // PAPER 9: Examiner Pierre (fr-FR-AlainNeural, Male)
  {
    paperNum: 9,
    examinerName: "Examiner Pierre",
    examinerVoiceId: "fr-FR-AlainNeural",
    examinerGender: "male",
    tasks: [
      {
        id: "spk-p9-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (La santé et le bien-être)",
        prompt: "Présentez-vous à l'examinateur : parlez de votre hygiène de vie, de vos activités physiques et de la manière dont vous gérez le stress.",
        promptEnglish: "Introduce yourself to the examiner: speak about your healthy lifestyle, physical activities, and how you manage stress.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Pierre",
          gender: "male",
          voiceId: "fr-FR-AlainNeural",
          roleDescription: "Examinateur expérimenté au ton posé.",
          greetingText: "Bonjour. Je m'appelle Pierre. Soyez le bienvenu. Expliquez-moi quelles habitudes vous adoptez pour rester en bonne santé.",
          greetingTextEnglish: "Hello. My name is Pierre. Welcome. Explain to me what habits you adopt to stay in good health."
        },
        guidedTips: [
          "Décrivez les sports que vous pratiquez (marche, course, natation).",
          "Parlez de votre sommeil et de vos moments de détente.",
          "Gardez des phrases courtes et précises."
        ]
      },
      {
        id: "spk-p9-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Réservation d'un espace de coworking)",
        prompt: "Vous recherchez un bureau partagé pour votre activité d'entrepreneur. Vous contactez le gestionnaire du centre (l'examinateur). Posez-lui des questions sur les tarifs mensuels, l'accès aux salles de réunion, la connexion haut débit et les services de secrétariat.",
        promptEnglish: "You are looking for a shared office for your entrepreneurial business. You contact the center manager (the examiner). Ask about monthly rates, meeting room access, high-speed internet, and secretarial services.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Pierre (Gestionnaire)",
          gender: "male",
          voiceId: "fr-FR-AlainNeural",
          roleDescription: "Gestionnaire d'un espace de travail partagé innovant.",
          greetingText: "Bonjour ! Pierre à l'appareil, responsable de l'espace de coworking. Comment puis-je vous présenter nos offres de bureaux ?",
          greetingTextEnglish: "Hello! Pierre speaking, coworking space manager. How can I introduce our office packages to you?",
          roleplayPrompt: "Présentez la formule nomade et la formule bureau dédié puis demandez si le candidat désire faire une visite."
        },
        guidedTips: [
          "Vérifiez l'ouverture 24h/24 et 7j/7 avec badge sécurisé.",
          "Demandez si les boissons chaudes sont incluses dans le forfait.",
          "Gardez un ton professionnel et dynamique."
        ]
      },
      {
        id: "spk-p9-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (Le revenu universel de base)",
        prompt: "L'instauration d'un revenu universel inconditionnel versé à tous les citoyens permettrait-elle d'éliminer la pauvreté ou découragerait-elle le travail ?",
        promptEnglish: "Would introducing an unconditional basic universal income for all citizens eradicate poverty or discourage work?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Pierre",
          gender: "male",
          voiceId: "fr-FR-AlainNeural",
          roleDescription: "Examinateur évaluant l'analyse socio-économique approfondie.",
          greetingText: "Passons au troisième sujet. Pensez-vous qu'un revenu de base garanti pour chacun soit une solution viable face aux mutations de l'emploi ?",
          greetingTextEnglish: "Moving to the third topic. Do you think a guaranteed basic income for everyone is a viable solution facing employment shifts?",
          counterArgumentPrompt: "Invoquez le risque d'une hausse massive des prélèvements fiscaux et de la démotivation au travail."
        },
        guidedTips: [
          "Pesez la réduction de la précarité face au coût budgétaire collectif.",
          "Mentionnez l'émancipation et la possibilité de reprise d'études ou de projets.",
          "Concluez avec rigueur argumentative."
        ]
      }
    ]
  },

  // PAPER 10: Examiner Sophie (fr-FR-VivienneNeural, Female)
  {
    paperNum: 10,
    examinerName: "Examiner Sophie",
    examinerVoiceId: "fr-FR-VivienneNeural",
    examinerGender: "female",
    tasks: [
      {
        id: "spk-p10-t1",
        taskNumber: 1,
        level: "A1",
        title: "Tâche 1 : Entretien dirigé (La technologie au quotidien)",
        prompt: "Présentez-vous à l'examinatrice : parlez de votre utilisation d'Internet, de votre téléphone portable et des applications qui vous aident au quotidien.",
        promptEnglish: "Introduce yourself to the examiner: speak about your internet use, mobile phone, and the applications that help you daily.",
        prepTimeMins: 0,
        speakingTimeMins: 2,
        examinerPersona: {
          name: "Examiner Sophie",
          gender: "female",
          voiceId: "fr-FR-VivienneNeural",
          roleDescription: "Examinatrice dynamique et très à l'écoute.",
          greetingText: "Bonjour et bienvenue à votre épreuve d'oral. Je m'appelle Sophie. Racontez-moi quelle place occupe la technologie dans votre vie de tous les jours.",
          greetingTextEnglish: "Hello and welcome to your oral exam. My name is Sophie. Tell me what role technology plays in your everyday life."
        },
        guidedTips: [
          "Citez des exemples concrets (GPS, réseaux, messages).",
          "Expliquez si vous passez beaucoup de temps en ligne.",
          "Exprimez-vous avec clarté."
        ]
      },
      {
        id: "spk-p10-t2",
        taskNumber: 2,
        level: "B1",
        title: "Tâche 2 : Exercice en interaction (Adhésion à un club de lecture)",
        prompt: "Vous souhaitez rejoindre un club de lecture francophone dans votre municipalité. Vous contactez la responsable (l'examinatrice). Posez des questions sur le rythme des réunions, la sélection des livres, le lieu de rencontre et les événements spéciaux.",
        promptEnglish: "You want to join a Francophone book club in your municipality. You contact the leader (the examiner). Ask questions about meeting frequency, book selection, meeting location, and special events.",
        prepTimeMins: 2,
        speakingTimeMins: 3.5,
        examinerPersona: {
          name: "Examiner Sophie (Animatrice du club)",
          gender: "female",
          voiceId: "fr-FR-VivienneNeural",
          roleDescription: "Animatrice passionnée du club de lecture municipal.",
          greetingText: "Bonjour ! Bienvenue au club de lecture, je m'appelle Sophie. Vous êtes intéressé par nos rencontres littéraires ? Dites-moi tout !",
          greetingTextEnglish: "Hello! Welcome to the book club, my name is Sophie. Are you interested in our literary meetings? Tell me everything!",
          roleplayPrompt: "Expliquez que le groupe se réunit le premier mardi de chaque mois et demandez si le candidat lit des romans ou des essais."
        },
        guidedTips: [
          "Demandez si les ouvrages sont prêtés gratuitement par la bibliothèque.",
          "Interrogez-vous sur les débats d'auteurs invités.",
          "Montrez votre passion pour la langue française."
        ]
      },
      {
        id: "spk-p10-t3",
        taskNumber: 3,
        level: "B2",
        title: "Tâche 3 : Expression d'un point de vue (La préservation des langues régionales)",
        prompt: "Les gouvernements doivent-ils accorder des financements prioritaires pour sauvegarder les langues et cultures minoritaires menacées d'extinction ?",
        promptEnglish: "Should governments allocate priority funding to safeguard minority languages and cultures threatened with extinction?",
        prepTimeMins: 0,
        speakingTimeMins: 4.5,
        examinerPersona: {
          name: "Examiner Sophie",
          gender: "female",
          voiceId: "fr-FR-VivienneNeural",
          roleDescription: "Examinatrice sollicitant une réflexion sociolinguistique poussée.",
          greetingText: "Pour conclure cette épreuve, estimez-vous que la défense du patrimoine linguistique minoritaire doive être financée par des fonds publics prioritaires ?",
          greetingTextEnglish: "To conclude this exam, do you believe defending minority linguistic heritage should be funded by priority public money?",
          counterArgumentPrompt: "Relancez sur l'urgence d'investir plutôt dans la santé et la transition énergétique globale."
        },
        guidedTips: [
          "Soulignez la richesse cognitive et culturelle portée par chaque langue.",
          "Reconnaissez les dilemmes d'arbitrage budgétaire public.",
          "Concluez avec une thèse synthétique et percutante."
        ]
      }
    ]
  }
];

export function getSpeakingPaperSuite(paperId: number): PaperSpeakingSuite {
  const index = (paperId - 1) % MASTER_SPEAKING_SUITE.length;
  return MASTER_SPEAKING_SUITE[index] || MASTER_SPEAKING_SUITE[0];
}
