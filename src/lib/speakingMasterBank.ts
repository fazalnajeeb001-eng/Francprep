/**
 * 🇨🇦 FrancPrep Master Authentic Speaking Bank (Phase 2 Voice-Fixed)
 * Official France Éducation International (FEI) TCF Canada Standard
 * 30 Authentic Tasks across Papers 1 to 10 with Valid Neural Voice Personas
 */

export interface StimulusDocument {
  title: string;
  category: string;
  organization: string;
  content: string;
  details: string[];
  contactInfo: string;
}

export interface MasterSpeakingTask {
  id: string;
  paperNumber: number;
  taskNumber: 1 | 2 | 3;
  title: string;
  titleEn: string;
  cefrTarget: "A1-B1" | "B1-C1" | "B2-C2";
  scenario: string;
  scenarioEn: string;
  stimulusDocument?: StimulusDocument;
  examinerPersona: {
    name: string;
    role: string;
    gender: "female" | "male";
    voiceId: string;
    openingPromptFrench: string;
    openingPromptEnglish: string;
    followUpCounterQuestion?: string;
    roleplayPrompt?: string;
  };
  prepTimeMins: number;
  speakingTimeMins: number;
  keyPhrases: string[];
  recommendedConnectors: string[];
  trapAlert: string;
  trapAlertEn: string;
  speakingCoach: string;
  speakingCoachEn: string;
}

export const MASTER_SPEAKING_BANK: Record<number, MasterSpeakingTask[]> = {
  "1": [
    {
      "id": "spk-p1-t1",
      "paperNumber": 1,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Présentation personnelle)",
      "titleEn": "Tâche 1 : Entretien dirigé (Présentation personnelle)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous brièvement à l'examinateur : votre nom, votre profession, votre ville d'origine et vos motivations pour vous installer au Canada.",
      "scenarioEn": "Briefly introduce yourself to the examiner: your name, profession, hometown, and your motivations for moving to Canada.",
      "examinerPersona": {
        "name": "Examiner Henri",
        "role": "Examinateur senior courtois et bienveillant.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Bonjour ! Bienvenue à votre épreuve d'expression orale. Pouvez-vous vous présenter ?",
        "openingPromptEnglish": "Hello and welcome to the speaking examination. My name is Henri. Could you briefly introduce yourself and tell me about your plans?"
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Dites votre nom, âge et profession clairement.",
        "Expliquez en 1 à 2 phrases pourquoi vous apprenez le français.",
        "Maintenez un ton poli et naturel."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Dites votre nom, âge et profession clairement.\nExpliquez en 1 à 2 phrases pourquoi vous apprenez le français.\nMaintenez un ton poli et naturel.",
      "trapAlertEn": "Dites votre nom, âge et profession clairement.\nExpliquez en 1 à 2 phrases pourquoi vous apprenez le français.\nMaintenez un ton poli et naturel.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Présentation personnelle) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Présentation personnelle): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p1-t2",
      "paperNumber": 1,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Réservation de logement de vacances)",
      "titleEn": "Tâche 2 : Exercice en interaction (Réservation de logement de vacances)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez louer un appartement de vacances à Québec pour deux semaines. Vous appelez le propriétaire (l'examinateur). Posez-lui une dizaine de questions sur le logement, les tarifs et les équipements.",
      "scenarioEn": "You want to rent a vacation apartment in Quebec City for two weeks. You call the landlord (the examiner). Ask about 10 questions regarding the accommodation, prices, and amenities.",
      "examinerPersona": {
        "name": "Examiner Henri",
        "role": "Propriétaire d'un appartement meublé à Québec.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Bonjour ! Thomas Laurent à l'appareil, propriétaire de l'appartement du quartier Saint-Roch. Je vous écoute, quelles sont vos questions ?",
        "openingPromptEnglish": "Hello, Mr. Henri speaking, owner of the Old Quebec apartment. I'm listening, what questions do you have?",
        "roleplayPrompt": "Vous êtes le propriétaire. Répondez de manière réaliste et concise aux questions du candidat. Terminez par 'Avez-vous d'autres questions ?'."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Utilisez le vouvoiement formel ('Vous').",
        "Variez les structures de questions (Est-ce que... ?, Pourriez-vous... ?, Combien... ?).",
        "Demandez des précisions sur le loyer, la caution, le Wi-Fi et les transports."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Utilisez le vouvoiement formel ('Vous').\nVariez les structures de questions (Est-ce que... ?, Pourriez-vous... ?, Combien... ?).\nDemandez des précisions sur le loyer, la caution, le Wi-Fi et les transports.",
      "trapAlertEn": "Utilisez le vouvoiement formel ('Vous').\nVariez les structures de questions (Est-ce que... ?, Pourriez-vous... ?, Combien... ?).\nDemandez des précisions sur le loyer, la caution, le Wi-Fi et les transports.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Réservation de logement de vacances) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Réservation de logement de vacances): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "INSTITUT LINGUISTIQUE INTERNATIONAL DE MONTRÉAL",
        "category": "Formation Professionnelle & Perfectionnement",
        "organization": "Institut Linguistique Montréal (Agréé FEI & Ministère de l'Immigration)",
        "content": "Sessions intensives de français professionnel et préparation aux examens officiels. Groupes réduits (max 10 apprenants). Cours en présentiel au centre-ville ou formule hybride interactive.",
        "details": [
          "📅 Sessions : Début chaque lundi, sessions de 4 à 12 semaines",
          "⏰ Horaires : Du lundi au vendredi (9h00 - 13h00 ou 18h00 - 21h00)",
          "💰 Tarifs : 380 $ CAD / semaine (Matériel pédagogique inclus)",
          "💻 Options : Ateliers de rédaction professionnelle et simulations d'entretien",
          "🎓 Attestation officielle remise en fin de cursus"
        ],
        "contactInfo": "📍 1250 Boulevard René-Lévesque Ouest, Montréal • 📞 514-555-0192 • ✉️ admission@institut-montreal.qc.ca"
      }
    },
    {
      "id": "spk-p1-t3",
      "paperNumber": 1,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (Le travail à distance)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (Le travail à distance)",
      "cefrTarget": "B2-C2",
      "scenario": "Le télétravail généralisé nuit-il à la cohésion sociale et à la culture d'entreprise ? Exprimez votre opinion de manière structurée et argumentée.",
      "scenarioEn": "Does widespread remote work harm social cohesion and company culture? Express your opinion in a structured, reasoned manner.",
      "examinerPersona": {
        "name": "Examiner Henri",
        "role": "Examinateur stimulant proposant une contre-argumentation polie.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Voici votre sujet : 'Le télétravail à 100 % représente-t-il l'avenir du travail ou une menace pour la cohésion d'équipe et la productivité ?' Présentez votre argumentation.",
        "openingPromptEnglish": "Thank you. For this third task, what do you think about the impact of remote work on professional relationships and corporate culture?",
        "followUpCounterQuestion": "Écoutez l'argument du candidat puis posez une contre-question délicate (ex: 'C'est vrai, mais ne craignez-vous pas l'isolement des nouveaux employés ?')."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Structurez avec une introduction, deux arguments et une conclusion.",
        "Utilisez des connecteurs logiques (Tout d'abord, en revanche, par conséquent).",
        "Nuancez votre réponse face à l'objection de l'examinateur."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Structurez avec une introduction, deux arguments et une conclusion.\nUtilisez des connecteurs logiques (Tout d'abord, en revanche, par conséquent).\nNuancez votre réponse face à l'objection de l'examinateur.",
      "trapAlertEn": "Structurez avec une introduction, deux arguments et une conclusion.\nUtilisez des connecteurs logiques (Tout d'abord, en revanche, par conséquent).\nNuancez votre réponse face à l'objection de l'examinateur.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (Le travail à distance) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (Le travail à distance): Maintain a natural tone and respect the formal register."
    }
  ],
  "2": [
    {
      "id": "spk-p2-t1",
      "paperNumber": 2,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Parcours professionnel et loisirs)",
      "titleEn": "Tâche 1 : Entretien dirigé (Parcours professionnel et loisirs)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinatrice : parlez de votre domaine d'études ou de travail, de vos centres d'intérêt et de vos activités du week-end.",
      "scenarioEn": "Introduce yourself to the examiner: talk about your field of study or work, your interests, and your weekend activities.",
      "examinerPersona": {
        "name": "Examiner Denise",
        "role": "Examinatrice accueillante et dynamique.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bonjour ! Pour cette première partie, présentez-vous et racontez-moi une expérience de voyage marquante qui a enrichi votre vision du monde.",
        "openingPromptEnglish": "Hello and welcome. My name is Denise. Tell me a bit about your professional background and what you like to do in your free time."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Décrivez vos passe-temps (sport, lecture, voyages).",
        "Utilisez le présent de l'indicatif.",
        "Répondez avec assurance et clarté."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Décrivez vos passe-temps (sport, lecture, voyages).\nUtilisez le présent de l'indicatif.\nRépondez avec assurance et clarté.",
      "trapAlertEn": "Décrivez vos passe-temps (sport, lecture, voyages).\nUtilisez le présent de l'indicatif.\nRépondez avec assurance et clarté.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Parcours professionnel et loisirs) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Parcours professionnel et loisirs): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p2-t2",
      "paperNumber": 2,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Inscription à un cours de langue)",
      "titleEn": "Tâche 2 : Exercice en interaction (Inscription à un cours de langue)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez vous inscrire à un cours de français intensif à Montréal. Vous contactez la responsable du centre (l'examinatrice). Posez-lui des questions sur les horaires, les niveaux, les tests de placement et les frais.",
      "scenarioEn": "You want to enroll in an intensive French course in Montreal. You contact the center director (the examiner). Ask questions about schedules, levels, placement tests, and fees.",
      "examinerPersona": {
        "name": "Examiner Denise",
        "role": "Directrice pédagogique d'une école de langues à Montréal.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bonjour ! Club Plein Air des Collines, Laurent Dubois à votre service. Quelles informations désirez-vous obtenir sur nos activités sportives ?",
        "openingPromptEnglish": "Hello, Montreal language school, Denise speaking. How can I help you with our training programs?",
        "roleplayPrompt": "Répondez aux questions sur les horaires et les tarifs puis demandez si le candidat a d'autres interrogations."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Demandez la durée de la session et la taille des groupes.",
        "Informez-vous sur la délivrance d'une attestation officielle.",
        "Gardez un registre formel tout au long de l'échange."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Demandez la durée de la session et la taille des groupes.\nInformez-vous sur la délivrance d'une attestation officielle.\nGardez un registre formel tout au long de l'échange.",
      "trapAlertEn": "Demandez la durée de la session et la taille des groupes.\nInformez-vous sur la délivrance d'une attestation officielle.\nGardez un registre formel tout au long de l'échange.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Inscription à un cours de langue) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Inscription à un cours de langue): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "RÉSIDENCE ÉCO-RESPONSABLE DU VIEUX-QUÉBEC",
        "category": "Immobilier & Location Saisonnière",
        "organization": "Gestion Immobilière Québec Panoramique",
        "content": "Superbes appartements meublés de 2 à 4 pièces situés au cœur du quartier historique. Idéal pour séjours de vacances ou déplacements professionnels.",
        "details": [
          "🏢 Logements : T2 et T3 entièrement équipés avec balcon",
          "🔑 Disponibilité : Location à la semaine ou au mois",
          "💰 Tarifs : À partir de 750 $ CAD / semaine (charges comprises)",
          "🌱 Équipements : Wi-Fi haut débit, stationnement privé, lave-linge",
          "🐾 Animaux : Acceptés sur demande préalable"
        ],
        "contactInfo": "📍 45 Rue Saint-Jean, Québec (QC) • 📞 418-555-0144 • ✉️ contact@quebec-loc.ca"
      }
    },
    {
      "id": "spk-p2-t3",
      "paperNumber": 2,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (L'usage des écrans chez les jeunes)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (L'usage des écrans chez les jeunes)",
      "cefrTarget": "B2-C2",
      "scenario": "Faut-il réglementer strictement l'accès aux réseaux sociaux et aux écrans pour les mineurs ? Défendez votre opinion avec des exemples précis.",
      "scenarioEn": "Should access to social media and screens for minors be strictly regulated? Defend your opinion with specific examples.",
      "examinerPersona": {
        "name": "Examiner Denise",
        "role": "Examinatrice perspicace testant la capacité de nuance du candidat.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Voici votre sujet : 'La gratuité des transports publics est-elle une mesure écologique efficace ou une utopie financière irréaliste ?' Exposez votre analyse.",
        "openingPromptEnglish": "Moving to the third part. In your view, should public authorities limit screen time and social media access for teenagers?",
        "followUpCounterQuestion": "Posez une contre-question sur l'autonomie des familles et l'éducation numérique."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Présentez les risques de la surconsommation numérique (santé mentale, sommeil).",
        "Mentionnez l'importance de l'éducation plutôt que la simple interdiction.",
        "Concluez avec une perspective équilibrée."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Présentez les risques de la surconsommation numérique (santé mentale, sommeil).\nMentionnez l'importance de l'éducation plutôt que la simple interdiction.\nConcluez avec une perspective équilibrée.",
      "trapAlertEn": "Présentez les risques de la surconsommation numérique (santé mentale, sommeil).\nMentionnez l'importance de l'éducation plutôt que la simple interdiction.\nConcluez avec une perspective équilibrée.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (L'usage des écrans chez les jeunes) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (L'usage des écrans chez les jeunes): Maintain a natural tone and respect the formal register."
    }
  ],
  "3": [
    {
      "id": "spk-p3-t1",
      "paperNumber": 3,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (La vie quotidienne et la ville)",
      "titleEn": "Tâche 1 : Entretien dirigé (La vie quotidienne et la ville)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinateur : parlez de votre quartier, de votre logement et de ce que vous appréciez dans votre cadre de vie.",
      "scenarioEn": "Introduce yourself to the examiner: talk about your neighborhood, your housing, and what you appreciate about your living environment.",
      "examinerPersona": {
        "name": "Examiner Jean",
        "role": "Examinateur canadien chaleureux et à l'écoute.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous, décrivez-moi votre ville d'origine et expliquez-moi comment vous préparez votre installation au Canada.",
        "openingPromptEnglish": "Hello! My name is Jean. Welcome to the oral examination. Tell me a bit about where you live and your daily routine."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Décrivez les commerces et transports à proximité de chez vous.",
        "Exprimez vos préférences (calme, verdure, vie culturelle).",
        "Soyez spontané et souriant."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Décrivez les commerces et transports à proximité de chez vous.\nExprimez vos préférences (calme, verdure, vie culturelle).\nSoyez spontané et souriant.",
      "trapAlertEn": "Décrivez les commerces et transports à proximité de chez vous.\nExprimez vos préférences (calme, verdure, vie culturelle).\nSoyez spontané et souriant.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (La vie quotidienne et la ville) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (La vie quotidienne et la ville): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p3-t2",
      "paperNumber": 3,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Organisation d'une activité communautaire)",
      "titleEn": "Tâche 2 : Exercice en interaction (Organisation d'une activité communautaire)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez organiser une journée de nettoyage écologique dans votre quartier à Ottawa. Vous contactez le responsable des services municipaux (l'examinateur). Posez-lui des questions sur les autorisations, le matériel et la communication.",
      "scenarioEn": "You want to organize a neighborhood eco-cleanup day in Ottawa. You contact the municipal services officer (the examiner). Ask questions about permits, supplies, and publicity.",
      "examinerPersona": {
        "name": "Examiner Jean",
        "role": "Agent des services communautaires de la Ville d'Ottawa.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Bonjour ! Entraide Laval, Laurent Dubois. Merci de proposer votre aide. Quelles sont vos questions concernant nos missions de bénévolat ?",
        "openingPromptEnglish": "Hello, City of Ottawa citizen services, Jean speaking. I'm listening regarding your green day project.",
        "roleplayPrompt": "Répondez clairement sur la fourniture de sacs et de gants puis demandez si le candidat souhaite d'autres détails."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Interrogez sur les démarches administratives indispensables.",
        "Proposez une date et demandez si la mairie peut prêter du matériel.",
        "Maintenez une interaction fluide et structurée."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Interrogez sur les démarches administratives indispensables.\nProposez une date et demandez si la mairie peut prêter du matériel.\nMaintenez une interaction fluide et structurée.",
      "trapAlertEn": "Interrogez sur les démarches administratives indispensables.\nProposez une date et demandez si la mairie peut prêter du matériel.\nMaintenez une interaction fluide et structurée.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Organisation d'une activité communautaire) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Organisation d'une activité communautaire): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "GRAND NETTOYAGE ÉCOLOGIQUE MUNICIPAL DE RIDEAU",
        "category": "Vie Communautaire & Environnement",
        "organization": "Ville d'Ottawa — Direction des Services Citoyens",
        "content": "Initiative citoyenne de dépollution des berges du canal Rideau. Matériel fourni par la municipalité, inscription requise pour les groupes.",
        "details": [
          "📅 Date : Samedi 14 mai de 9h00 à 16h00",
          "🛠️ Matériel : Gants, sacs recyclables et pinces fournis",
          "🚌 Accès : Navettes gratuites depuis le centre-ville",
          "🥪 Restauration : Collation bio offerte à tous les bénévoles",
          "📜 Attestation : Certificat d'engagement citoyen délivré"
        ],
        "contactInfo": "📍 Parc de la Confédération, Ottawa • 📞 613-555-0188 • ✉️ benevolat@ottawa.ca"
      }
    },
    {
      "id": "spk-p3-t3",
      "paperNumber": 3,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (Gratuité des transports en commun)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (Gratuité des transports en commun)",
      "cefrTarget": "B2-C2",
      "scenario": "La gratuité totale des transports publics urbains est-elle la solution idéale pour lutter contre le changement climatique et les embouteillages ?",
      "scenarioEn": "Is free public transit in urban areas the ideal solution to combat climate change and traffic congestion?",
      "examinerPersona": {
        "name": "Examiner Jean",
        "role": "Examinateur rigoureux sollicitant des exemples économiques et sociaux.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Voici votre thème de débat : 'L'interdiction des téléphones portables dans les établissements scolaires est-elle indispensable pour protéger l'attention des élèves ?' Présentez votre point de vue.",
        "openingPromptEnglish": "For the final task, do you think making buses and subways completely free is an effective and financially viable measure?",
        "followUpCounterQuestion": "Relancez sur le coût d'entretien des infrastructures et l'impact sur les impôts locaux."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Opposez les avantages environnementaux aux défis de financement public.",
        "Utilisez des verbes d'opinion (Je soutiens que, il me semble incontestable que).",
        "Répondez avec maturité aux contre-arguments."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Opposez les avantages environnementaux aux défis de financement public.\nUtilisez des verbes d'opinion (Je soutiens que, il me semble incontestable que).\nRépondez avec maturité aux contre-arguments.",
      "trapAlertEn": "Opposez les avantages environnementaux aux défis de financement public.\nUtilisez des verbes d'opinion (Je soutiens que, il me semble incontestable que).\nRépondez avec maturité aux contre-arguments.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (Gratuité des transports en commun) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (Gratuité des transports en commun): Maintain a natural tone and respect the formal register."
    }
  ],
  "4": [
    {
      "id": "spk-p4-t1",
      "paperNumber": 4,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Habitudes alimentaires et sorties)",
      "titleEn": "Tâche 1 : Entretien dirigé (Habitudes alimentaires et sorties)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinatrice : parlez de vos habitudes alimentaires, de vos plats préférés et de vos sorties au restaurant.",
      "scenarioEn": "Introduce yourself to the examiner: speak about your eating habits, favorite dishes, and restaurant outings.",
      "examinerPersona": {
        "name": "Examiner Sylvie",
        "role": "Examinatrice canadienne bienveillante et communicative.",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous, parlez-moi de vos activités de loisirs préférées et des projets associatifs qui vous tiennent à cœur.",
        "openingPromptEnglish": "Hello! Welcome to your oral exam. I am Sylvie. Tell me about your favorite food and meals shared with family."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Mentionnez des spécialités de votre pays d'origine.",
        "Expliquez si vous aimez cuisiner vous-même.",
        "Articulez avec soin."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Mentionnez des spécialités de votre pays d'origine.\nExpliquez si vous aimez cuisiner vous-même.\nArticulez avec soin.",
      "trapAlertEn": "Mentionnez des spécialités de votre pays d'origine.\nExpliquez si vous aimez cuisiner vous-même.\nArticulez avec soin.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Habitudes alimentaires et sorties) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Habitudes alimentaires et sorties): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p4-t2",
      "paperNumber": 4,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Recherche d'un emploi d'été)",
      "titleEn": "Tâche 2 : Exercice en interaction (Recherche d'un emploi d'été)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous cherchez un emploi à temps partiel dans une librairie-café à Sherbrooke. Vous rencontrez la gérante (l'examinatrice). Posez-lui des questions sur les tâches, les horaires, le salaire et le profil recherché.",
      "scenarioEn": "You are looking for a part-time job at a bookstore café in Sherbrooke. You meet the manager (the examiner). Ask questions about duties, hours, pay, and candidate requirements.",
      "examinerPersona": {
        "name": "Examiner Sylvie",
        "role": "Propriétaire engagée d'une librairie culturelle à Sherbrooke.",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural",
        "openingPromptFrench": "Bonjour ! Sherb-Éco-Vélo, Thomas Laurent à votre service. Quelles questions avez-vous sur notre service de vélopartage électrique ?",
        "openingPromptEnglish": "Hello! I am Sylvie, the bookstore manager. You came to inquire about the assistant position? I'm listening.",
        "roleplayPrompt": "Donnez des réponses précises sur le travail du samedi et le taux horaire puis demandez si tout est clair."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Présentez votre disponibilité hebdomadaire.",
        "Informez-vous sur les compétences requises (gestion de la caisse, service).",
        "Concluez en proposant de laisser votre curriculum vitae."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Présentez votre disponibilité hebdomadaire.\nInformez-vous sur les compétences requises (gestion de la caisse, service).\nConcluez en proposant de laisser votre curriculum vitae.",
      "trapAlertEn": "Présentez votre disponibilité hebdomadaire.\nInformez-vous sur les compétences requises (gestion de la caisse, service).\nConcluez en proposant de laisser votre curriculum vitae.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Recherche d'un emploi d'été) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Recherche d'un emploi d'été): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "LIBRAIRIE-CAFÉ 'LES PAGES DU SAVOIR' — SHERBROOKE",
        "category": "Offre d'Emploi Étudiant & Temps Partiel",
        "organization": "Librairie Culturelle Sherbrooke Inc.",
        "content": "Recherche assistants polyvalents pour la saison estivale. Accueil des clients, gestion du rayon francophone et service au café-lecture.",
        "details": [
          "💼 Poste : Assistant(e) librairie et service café",
          "⏰ Horaire : 15 à 25 heures / semaine (week-ends inclus)",
          "💵 Rémunération : 16,50 $ CAD / heure + avantages",
          "🎓 Exigences : Bon niveau de français parlé, sens du contact",
          "📅 Début : Prise de poste début juin"
        ],
        "contactInfo": "📍 88 Rue Wellington Nord, Sherbrooke • 📞 819-555-0122 • ✉️ rh@pages-savoir.qc.ca"
      }
    },
    {
      "id": "spk-p4-t3",
      "paperNumber": 4,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (L'intelligence artificielle au travail)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (L'intelligence artificielle au travail)",
      "cefrTarget": "B2-C2",
      "scenario": "L'essor de l'intelligence artificielle générative menace-t-il l'emploi humain ou constitue-t-il un levier de productivité bénéfique ?",
      "scenarioEn": "Does the rise of generative artificial intelligence threaten human employment or serve as a beneficial productivity driver?",
      "examinerPersona": {
        "name": "Examiner Sylvie",
        "role": "Examinatrice analytique évaluant la structuration logique du discours.",
        "gender": "female",
        "voiceId": "fr-CA-SylvieNeural",
        "openingPromptFrench": "Voici votre sujet : 'Le revenu universel de base est-il une solution d'avenir pour éliminer la précarité ou un frein à la valeur travail ?' Je vous écoute.",
        "openingPromptEnglish": "Let's approach the third topic. What is your perspective on the development of artificial intelligence in the professional world?",
        "followUpCounterQuestion": "Faites remarquer le risque d'automations destructrices de métiers créatifs et intellectuels."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Distinguez la substitution de tâches répétitives de la création de nouvelles valeurs.",
        "Abordez la nécessité de formations tout au long de la vie.",
        "Nuancez les craintes catastrophistes avec un pragmatisme éclairé."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Distinguez la substitution de tâches répétitives de la création de nouvelles valeurs.\nAbordez la nécessité de formations tout au long de la vie.\nNuancez les craintes catastrophistes avec un pragmatisme éclairé.",
      "trapAlertEn": "Distinguez la substitution de tâches répétitives de la création de nouvelles valeurs.\nAbordez la nécessité de formations tout au long de la vie.\nNuancez les craintes catastrophistes avec un pragmatisme éclairé.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (L'intelligence artificielle au travail) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (L'intelligence artificielle au travail): Maintain a natural tone and respect the formal register."
    }
  ],
  "5": [
    {
      "id": "spk-p5-t1",
      "paperNumber": 5,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Voyages et découvertes culturelles)",
      "titleEn": "Tâche 1 : Entretien dirigé (Voyages et découvertes culturelles)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinateur : parlez des pays ou régions que vous avez visités et de vos destinations de rêve.",
      "scenarioEn": "Introduce yourself to the examiner: talk about countries or regions you have visited and your dream destinations.",
      "examinerPersona": {
        "name": "Examiner Rémy",
        "role": "Examinateur calme et encourageant.",
        "gender": "male",
        "voiceId": "fr-FR-RemyMultilingualNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous à moi en me parlant de votre formation universitaire et de vos compétences professionnelles clés.",
        "openingPromptEnglish": "Hello and welcome. I am Marc. Tell me about a memorable travel memory or a place you would like to visit soon."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Utilisez le passé composé pour décrire un voyage antérieur.",
        "Expliquez ce qui vous attire (paysages, monuments, gastronomie).",
        "Adoptez un débit de parole fluide."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Utilisez le passé composé pour décrire un voyage antérieur.\nExpliquez ce qui vous attire (paysages, monuments, gastronomie).\nAdoptez un débit de parole fluide.",
      "trapAlertEn": "Utilisez le passé composé pour décrire un voyage antérieur.\nExpliquez ce qui vous attire (paysages, monuments, gastronomie).\nAdoptez un débit de parole fluide.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Voyages et découvertes culturelles) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Voyages et découvertes culturelles): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p5-t2",
      "paperNumber": 5,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Organisation d'un voyage d'études)",
      "titleEn": "Tâche 2 : Exercice en interaction (Organisation d'un voyage d'études)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous organisez une sortie culturelle pour votre groupe de camarades. Vous contactez le responsable d'un musée (l'examinateur). Posez des questions sur les visites guidées, les tarifs de groupe et les réservations.",
      "scenarioEn": "You are organizing a cultural field trip for your study group. You contact a museum officer (the examiner). Ask about guided tours, group discounts, and booking requirements.",
      "examinerPersona": {
        "name": "Examiner Rémy",
        "role": "Responsable de la billetterie et des groupes culturels.",
        "gender": "male",
        "voiceId": "fr-FR-RemyMultilingualNeural",
        "openingPromptFrench": "Bonjour ! Espace Co-Travail La Mauricie, Laurent Dubois. En quoi puis-je vous renseigner sur nos formules de coworking ?",
        "openingPromptEnglish": "Hello, museum booking department, Marc at your service. How can I help you plan your visit?",
        "roleplayPrompt": "Expliquez la gratuité pour les accompagnateurs et demandez si le candidat souhaite réserver un créneau horaire précis."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Demandez s'il existe des dépliants en plusieurs langues.",
        "Vérifiez l'accès aux personnes à mobilité réduite.",
        "Remerciez chaleureusement à la fin."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Demandez s'il existe des dépliants en plusieurs langues.\nVérifiez l'accès aux personnes à mobilité réduite.\nRemerciez chaleureusement à la fin.",
      "trapAlertEn": "Demandez s'il existe des dépliants en plusieurs langues.\nVérifiez l'accès aux personnes à mobilité réduite.\nRemerciez chaleureusement à la fin.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Organisation d'un voyage d'études) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Organisation d'un voyage d'études): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "MUSÉE NATIONAL DES BEAUX-ARTS DU QUÉBEC",
        "category": "Sorties Culturelles & Groupes Scolaires",
        "organization": "Direction de l'Action Culturelle du MNBAQ",
        "content": "Visites guidées thématiques et ateliers créatifs pour groupes d'étudiants. Tarifs préférentiels et créneaux réservés sur demande.",
        "details": [
          "🎨 Visites : Parcours thématiques 'Art et Histoire du Canada'",
          "👥 Groupes : De 10 à 30 personnes (réservation préalable)",
          "🎟️ Tarifs : 12 $ CAD par étudiant (gratuit pour accompagnateurs)",
          "🎧 Outils : Audioguides en français inclus",
          "☕ Espace : Salle de pique-nique et café disponibles"
        ],
        "contactInfo": "📍 Parc des Champs-de-Bataille, Québec • 📞 418-555-0199 • ✉️ groupes@mnbaq.org"
      }
    },
    {
      "id": "spk-p5-t3",
      "paperNumber": 5,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (Le tourisme de masse)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (Le tourisme de masse)",
      "cefrTarget": "B2-C2",
      "scenario": "Faut-il instaurer des quotas stricts d'accès aux sites naturels et historiques pour contrer les dégradations dues au surtourisme ?",
      "scenarioEn": "Should strict access quotas be introduced for natural and historical sites to combat damage caused by overtourism?",
      "examinerPersona": {
        "name": "Examiner Rémy",
        "role": "Examinateur poussant à l'argumentation socio-économique.",
        "gender": "male",
        "voiceId": "fr-FR-RemyMultilingualNeural",
        "openingPromptFrench": "Voici votre sujet : 'La taxe carbone est-elle un levier indispensable pour inciter à la transition écologique ou une charge fiscale injuste pour les ménages ?' Présentez votre argumentation.",
        "openingPromptEnglish": "Let's move to the topical subject. Overtourism threatens many natural spaces and monuments. Do you support regulation through entry quotas?",
        "followUpCounterQuestion": "Soulignez l'impact économique négatif sur les commerçants locaux dépendants des visiteurs."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Pesez la protection de l'environnement face au développement économique.",
        "Illustrez avec des exemples connus (Venise, parcs nationaux).",
        "Formulez des propositions alternatives (étalement de la fréquentation)."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Pesez la protection de l'environnement face au développement économique.\nIllustrez avec des exemples connus (Venise, parcs nationaux).\nFormulez des propositions alternatives (étalement de la fréquentation).",
      "trapAlertEn": "Pesez la protection de l'environnement face au développement économique.\nIllustrez avec des exemples connus (Venise, parcs nationaux).\nFormulez des propositions alternatives (étalement de la fréquentation).",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (Le tourisme de masse) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (Le tourisme de masse): Maintain a natural tone and respect the formal register."
    }
  ],
  "6": [
    {
      "id": "spk-p6-t1",
      "paperNumber": 6,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Activités quotidiennes et rythme de vie)",
      "titleEn": "Tâche 1 : Entretien dirigé (Activités quotidiennes et rythme de vie)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinatrice : décrivez une journée habituelle dans votre vie (matin, travail, repas, soirée).",
      "scenarioEn": "Introduce yourself to the examiner: describe a typical day in your life (morning, work, meals, evening).",
      "examinerPersona": {
        "name": "Examiner Vivienne",
        "role": "Examinatrice attentive et bienveillante.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous et parlez-moi de votre cuisine préférée ainsi que des traditions culinaires de votre pays.",
        "openingPromptEnglish": "Hello! My name is Claire. Welcome. Tell me how your typical weekday usually unfolds."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Utilisez des verbes pronominaux (se lever, se préparer).",
        "Indiquez les moments de la journée avec précision.",
        "Gardez un ton naturel."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Utilisez des verbes pronominaux (se lever, se préparer).\nIndiquez les moments de la journée avec précision.\nGardez un ton naturel.",
      "trapAlertEn": "Utilisez des verbes pronominaux (se lever, se préparer).\nIndiquez les moments de la journée avec précision.\nGardez un ton naturel.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Activités quotidiennes et rythme de vie) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Activités quotidiennes et rythme de vie): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p6-t2",
      "paperNumber": 6,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Location de voiture pour le week-end)",
      "titleEn": "Tâche 2 : Exercice en interaction (Location de voiture pour le week-end)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez louer un véhicule pour visiter la région ce week-end. Vous vous adressez à l'agent de l'agence de location (l'examinatrice). Posez des questions sur les modèles disponibles, l'assurance, le kilométrage et le dépôt de garantie.",
      "scenarioEn": "You want to rent a car to visit the region this weekend. You speak to the rental agent (the examiner). Ask questions about available models, insurance, mileage, and security deposit.",
      "examinerPersona": {
        "name": "Examiner Vivienne",
        "role": "Conseillère chez Auto-Location Express.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Bonjour ! École Culinaire du Saguenay, chef Laurent à l'appareil. Quelles sont vos questions concernant nos ateliers de cuisine zéro déchet ?",
        "openingPromptEnglish": "Hello! Welcome to Auto-Express, I am Claire. What type of vehicle are you looking for during your trip?",
        "roleplayPrompt": "Répondez aux questions sur les formules tout compris puis demandez si le candidat souhaite ajouter un conducteur secondaire."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Précisez la durée de la location et le nombre de passagers.",
        "Demandez si le carburant est inclus ou à restituer plein.",
        "Conservez une politesse courtoise."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Précisez la durée de la location et le nombre de passagers.\nDemandez si le carburant est inclus ou à restituer plein.\nConservez une politesse courtoise.",
      "trapAlertEn": "Précisez la durée de la location et le nombre de passagers.\nDemandez si le carburant est inclus ou à restituer plein.\nConservez une politesse courtoise.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Location de voiture pour le week-end) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Location de voiture pour le week-end): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "AUTO-EXPRESS TROIS-RIVIÈRES",
        "category": "Location de Véhicules Tous Gammes",
        "organization": "Agence Régionale de Mobilité",
        "content": "Location de voitures économiques, hybrides et VUS pour vos déplacements en Mauricie. Formules week-end avec kilométrage illimité.",
        "details": [
          "🚗 Modèles : Citadines, berlines et VUS 100% électriques",
          "⛽ Formules : Kilométrage illimité ou forfait 500 km",
          "🛡️ Assurance : Protection tous risques et assistance 24/7",
          "💳 Conditions : Permis valide depuis 1 an, dépôt de garantie",
          "👶 Options : Sièges enfants et GPS disponibles"
        ],
        "contactInfo": "📍 1500 Boulevard des Forges, Trois-Rivières • 📞 819-555-0155 • ✉️ info@auto-express-tr.ca"
      }
    },
    {
      "id": "spk-p6-t3",
      "paperNumber": 6,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (L'apprentissage des langues par les nouvelles technologies)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (L'apprentissage des langues par les nouvelles technologies)",
      "cefrTarget": "B2-C2",
      "scenario": "Les applications mobiles et l'intelligence artificielle remplaceront-elles à terme les enseignants de langues en classe ?",
      "scenarioEn": "Will mobile apps and artificial intelligence eventually replace human language teachers in the classroom?",
      "examinerPersona": {
        "name": "Examiner Vivienne",
        "role": "Examinatrice interrogeant l'humain face à la technologie.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Voici votre sujet : 'Les réseaux sociaux représentent-ils un vecteur d'ouverture pour la jeunesse ou une menace pour leur santé mentale ?' Exposez votre point de vue.",
        "openingPromptEnglish": "Let's address our third topic. Do you think digital educational tools can make human language teachers obsolete?",
        "followUpCounterQuestion": "Insistez sur la disponibilité 24/7 et la personnalisation instantanée offertes par les algorithmes."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Mettez en avant la valeur irremplaçable de l'interaction humaine et de la culture.",
        "Reconnaissez la complémentarité des outils technologiques.",
        "Concluez par une vision hybride de l'éducation."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Mettez en avant la valeur irremplaçable de l'interaction humaine et de la culture.\nReconnaissez la complémentarité des outils technologiques.\nConcluez par une vision hybride de l'éducation.",
      "trapAlertEn": "Mettez en avant la valeur irremplaçable de l'interaction humaine et de la culture.\nReconnaissez la complémentarité des outils technologiques.\nConcluez par une vision hybride de l'éducation.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (L'apprentissage des langues par les nouvelles technologies) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (L'apprentissage des langues par les nouvelles technologies): Maintain a natural tone and respect the formal register."
    }
  ],
  "7": [
    {
      "id": "spk-p7-t1",
      "paperNumber": 7,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (Vie professionnelle et projets d'avenir)",
      "titleEn": "Tâche 1 : Entretien dirigé (Vie professionnelle et projets d'avenir)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinateur : parlez de votre domaine d'activité actuel et des objectifs professionnels que vous visez au Canada.",
      "scenarioEn": "Introduce yourself to the examiner: speak about your current field of work and the professional goals you aim to achieve in Canada.",
      "examinerPersona": {
        "name": "Examiner Antoine",
        "role": "Examinateur canadien chaleureux et direct.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous, décrivez-moi votre genre de film ou de spectacle préféré et parlez-moi d'un événement culturel marquant.",
        "openingPromptEnglish": "Hello! I am Antoine. Welcome. Tell me what sector you work in and what your future project is in Canada."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Décrivez vos responsabilités actuelles.",
        "Expliquez vos aspirations en matière d'intégration professionnelle.",
        "Maintenez une prononciation nette."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Décrivez vos responsabilités actuelles.\nExpliquez vos aspirations en matière d'intégration professionnelle.\nMaintenez une prononciation nette.",
      "trapAlertEn": "Décrivez vos responsabilités actuelles.\nExpliquez vos aspirations en matière d'intégration professionnelle.\nMaintenez une prononciation nette.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (Vie professionnelle et projets d'avenir) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (Vie professionnelle et projets d'avenir): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p7-t2",
      "paperNumber": 7,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Inauguration d'un centre sportif)",
      "titleEn": "Tâche 2 : Exercice en interaction (Inauguration d'un centre sportif)",
      "cefrTarget": "B1-C1",
      "scenario": "Un nouveau complexe sportif ouvre dans votre municipalité à Gatineau. Vous vous renseignez auprès du responsable (l'examinateur). Posez des questions sur les abonnements, les cours collectifs, les équipements et les horaires d'ouverture.",
      "scenarioEn": "A new sports complex is opening in your municipality in Gatineau. You inquire with the manager (the examiner). Ask questions about memberships, group classes, equipment, and opening hours.",
      "examinerPersona": {
        "name": "Examiner Antoine",
        "role": "Directeur du complexe aquatique et sportif de Gatineau.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Bonjour ! Festival des Arts de Rimouski, Élodie Martin. Merci pour votre enthousiasme. Quelles sont vos questions concernant le bénévolat au festival ?",
        "openingPromptEnglish": "Hello! Welcome to Gatineau Sports Complex, I am Antoine. Would you like information about our facilities?",
        "roleplayPrompt": "Présentez la piscine olympique et la salle d'entraînement puis demandez si le candidat désire une séance d'essai."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Informez-vous sur les tarifs pour étudiants ou familles.",
        "Demandez si la réservation préalable des cours est obligatoire.",
        "Montrez votre enthousiasme durant l'échange."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Informez-vous sur les tarifs pour étudiants ou familles.\nDemandez si la réservation préalable des cours est obligatoire.\nMontrez votre enthousiasme durant l'échange.",
      "trapAlertEn": "Informez-vous sur les tarifs pour étudiants ou familles.\nDemandez si la réservation préalable des cours est obligatoire.\nMontrez votre enthousiasme durant l'échange.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Inauguration d'un centre sportif) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Inauguration d'un centre sportif): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "COMPLEXE AQUATIQUE ET SPORTIF MUNICIPAL DE GATINEAU",
        "category": "Loisirs, Santé & Sports",
        "organization": "Ville de Gatineau — Direction des Sports",
        "content": "Inauguration des nouvelles infrastructures : piscine olympique, salles de musculation, terrains de badminton et cours collectifs animés.",
        "details": [
          "🏊 Infrastructures : Bassin 50m, sauna et salle de fitness",
          "📅 Ouverture : Portes ouvertes avec séances d'essai gratuites",
          "💳 Abonnements : Tarifs dégressifs résidents / non-résidents",
          "🏋️ Cours : Yoga, aquagym, spinning et zumba",
          "👨‍👩‍👧 Formules : Pass famille et réductions étudiants"
        ],
        "contactInfo": "📍 850 Boulevard de la Gappe, Gatineau • 📞 819-555-0177 • ✉️ sports@gatineau.ca"
      }
    },
    {
      "id": "spk-p7-t3",
      "paperNumber": 7,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (L'économie circulaire)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (L'économie circulaire)",
      "cefrTarget": "B2-C2",
      "scenario": "Devrions-nous interdire la vente de produits à usage unique non recyclables pour imposer une économie circulaire intégrale ?",
      "scenarioEn": "Should we ban the sale of non-recyclable single-use products to mandate a full circular economy?",
      "examinerPersona": {
        "name": "Examiner Antoine",
        "role": "Examinateur stimulant le débat environnemental.",
        "gender": "male",
        "voiceId": "fr-CA-JeanNeural",
        "openingPromptFrench": "Voici votre sujet : 'La semaine de travail de 4 jours représente-t-elle un modèle gagnant-gagnant pour les salariés et les entreprises ou un frein économique ?' Exposez votre point de vue.",
        "openingPromptEnglish": "For the third task, do you think the State should totally ban plastics and disposable packaging to force ecological transition?",
        "followUpCounterQuestion": "Relancez sur le coût supplémentaire répercuté sur le pouvoir d'achat des consommateurs modestes."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Argumentez en faveur de la réduction des déchets sauvages.",
        "Reconnaissez la nécessité d'une période d'adaptation pour les entreprises.",
        "Nuancez avec des incitations fiscales plutôt que des contraintes punitives."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Argumentez en faveur de la réduction des déchets sauvages.\nReconnaissez la nécessité d'une période d'adaptation pour les entreprises.\nNuancez avec des incitations fiscales plutôt que des contraintes punitives.",
      "trapAlertEn": "Argumentez en faveur de la réduction des déchets sauvages.\nReconnaissez la nécessité d'une période d'adaptation pour les entreprises.\nNuancez avec des incitations fiscales plutôt que des contraintes punitives.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (L'économie circulaire) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (L'économie circulaire): Maintain a natural tone and respect the formal register."
    }
  ],
  "8": [
    {
      "id": "spk-p8-t1",
      "paperNumber": 8,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (La culture et les sorties)",
      "titleEn": "Tâche 1 : Entretien dirigé (La culture et les sorties)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinatrice : parlez de vos goûts musicaux, de vos films préférés et de vos dernières activités culturelles.",
      "scenarioEn": "Introduce yourself to the examiner: talk about your musical tastes, favorite movies, and recent cultural activities.",
      "examinerPersona": {
        "name": "Examiner Brigitte",
        "role": "Examinatrice souriante et très expressive.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bonjour ! Présentez-vous, décrivez-moi votre logement et votre quartier, et dites-moi dans quel type d'environnement vous aimeriez vivre au Canada.",
        "openingPromptEnglish": "Hello! Welcome to your oral exam. My name is Isabelle. Tell me what you like to watch or listen to in order to relax."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Mentionnez un artiste ou un réalisateur que vous appréciez.",
        "Exprimez vos émotions (J'adore, cela me passionne).",
        "Gardez un bon rythme de réponse."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Mentionnez un artiste ou un réalisateur que vous appréciez.\nExprimez vos émotions (J'adore, cela me passionne).\nGardez un bon rythme de réponse.",
      "trapAlertEn": "Mentionnez un artiste ou un réalisateur que vous appréciez.\nExprimez vos émotions (J'adore, cela me passionne).\nGardez un bon rythme de réponse.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (La culture et les sorties) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (La culture et les sorties): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p8-t2",
      "paperNumber": 8,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Inscriptions à une association caritative)",
      "titleEn": "Tâche 2 : Exercice en interaction (Inscriptions à une association caritative)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez vous engager comme bénévole dans une banque alimentaire locale. Vous rencontrez la responsable (l'examinatrice). Posez-lui des questions sur les missions, le temps requis, les horaires et les formations fournies.",
      "scenarioEn": "You want to volunteer at a local food bank. You meet the coordinator (the examiner). Ask questions about duties, time commitments, schedules, and training provided.",
      "examinerPersona": {
        "name": "Examiner Brigitte",
        "role": "Coordonnatrice du réseau de solidarité alimentaire.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bonjour ! Commun-Auto Longueuil, Laurent Dubois. En quoi puis-je vous aider concernant notre service d'autopartage ?",
        "openingPromptEnglish": "Hello! Thanks for coming to see me about volunteering. I am Isabelle. What questions do you have about our actions?",
        "roleplayPrompt": "Expliquez l'importance du travail en équipe le samedi matin et demandez si le candidat est disponible."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Précisez vos compétences utiles (logistique, contact humain).",
        "Demandez si une attestation d'engagement peut être délivrée.",
        "Terminez sur une note d'enthousiasme citoyen."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Précisez vos compétences utiles (logistique, contact humain).\nDemandez si une attestation d'engagement peut être délivrée.\nTerminez sur une note d'enthousiasme citoyen.",
      "trapAlertEn": "Précisez vos compétences utiles (logistique, contact humain).\nDemandez si une attestation d'engagement peut être délivrée.\nTerminez sur une note d'enthousiasme citoyen.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Inscriptions à une association caritative) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Inscriptions à une association caritative): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "RÉSEAU SOLIDAIREMENT ALIMENTAIRE DE RIMOUSKI",
        "category": "Bénévolat & Action Sociale",
        "organization": "Association Caritative Bas-Saint-Laurent",
        "content": "Appel à bénévoles pour le tri, l'emballage et la distribution de denrées alimentaires aux familles défavorisées de la région.",
        "details": [
          "🤝 Missions : Tri de denrées, préparation de colis, accueil",
          "⏰ Disponibilités : 3 à 6 heures par semaine (flexible)",
          "🚌 Transport : Remboursement des frais de déplacement",
          "🎓 Formation : Sensibilisation à la sécurité alimentaire offerte",
          "📜 Attestation : Certificat de bénévolat communautaire"
        ],
        "contactInfo": "📍 210 Avenue de la Cathédrale, Rimouski • 📞 418-555-0133 • ✉️ benevoles@solidarite-rimouski.ca"
      }
    },
    {
      "id": "spk-p8-t3",
      "paperNumber": 8,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (L'uniforme scolaire)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (L'uniforme scolaire)",
      "cefrTarget": "B2-C2",
      "scenario": "Le port de l'uniforme obligatoire à l'école est-il une mesure efficace pour réduire les inégalités sociales et favoriser l'égalité ?",
      "scenarioEn": "Is mandatory school uniforms an effective measure to reduce social inequality and promote equality?",
      "examinerPersona": {
        "name": "Examiner Brigitte",
        "role": "Examinatrice attentive au débat éducatif.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Voici votre sujet : 'Faut-il supprimer tout âge limite obligatoire pour la retraite et laisser chacun décider de la fin de sa carrière ?' Présentez votre argumentation.",
        "openingPromptEnglish": "Moving to the educational topic. What do you think about bringing back school uniforms in educational institutions?",
        "followUpCounterQuestion": "Opposez le risque d'étouffer l'individualité et l'expression personnelle des élèves."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Mettez en balance le sentiment d'appartenance et la liberté d'expression.",
        "Citez l'impact sur le climat scolaire et les taquineries.",
        "Concluez avec une réflexion nuancée sur la laïcité et l'équité."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Mettez en balance le sentiment d'appartenance et la liberté d'expression.\nCitez l'impact sur le climat scolaire et les taquineries.\nConcluez avec une réflexion nuancée sur la laïcité et l'équité.",
      "trapAlertEn": "Mettez en balance le sentiment d'appartenance et la liberté d'expression.\nCitez l'impact sur le climat scolaire et les taquineries.\nConcluez avec une réflexion nuancée sur la laïcité et l'équité.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (L'uniforme scolaire) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (L'uniforme scolaire): Maintain a natural tone and respect the formal register."
    }
  ],
  "9": [
    {
      "id": "spk-p9-t1",
      "paperNumber": 9,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (La santé et le bien-être)",
      "titleEn": "Tâche 1 : Entretien dirigé (La santé et le bien-être)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinateur : parlez de votre hygiène de vie, de vos activités physiques et de la manière dont vous gérez le stress.",
      "scenarioEn": "Introduce yourself to the examiner: speak about your healthy lifestyle, physical activities, and how you manage stress.",
      "examinerPersona": {
        "name": "Examiner Pierre",
        "role": "Examinateur expérimenté au ton posé.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Bonjour et bienvenue à cette dernière session d'expression orale. Pouvez-vous vous présenter, me détailler votre projet professionnel au Canada et m'expliquer la place de la langue française dans votre vie ?",
        "openingPromptEnglish": "Hello. My name is Pierre. Welcome. Explain to me what habits you adopt to stay in good health."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Décrivez les sports que vous pratiquez (marche, course, natation).",
        "Parlez de votre sommeil et de vos moments de détente.",
        "Gardez des phrases courtes et précises."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Décrivez les sports que vous pratiquez (marche, course, natation).\nParlez de votre sommeil et de vos moments de détente.\nGardez des phrases courtes et précises.",
      "trapAlertEn": "Décrivez les sports que vous pratiquez (marche, course, natation).\nParlez de votre sommeil et de vos moments de détente.\nGardez des phrases courtes et précises.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (La santé et le bien-être) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (La santé et le bien-être): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p9-t2",
      "paperNumber": 9,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Réservation d'un espace de coworking)",
      "titleEn": "Tâche 2 : Exercice en interaction (Réservation d'un espace de coworking)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous recherchez un bureau partagé pour votre activité d'entrepreneur. Vous contactez le gestionnaire du centre (l'examinateur). Posez-lui des questions sur les tarifs mensuels, l'accès aux salles de réunion, la connexion haut débit et les services de secrétariat.",
      "scenarioEn": "You are looking for a shared office for your entrepreneurial business. You contact the center manager (the examiner). Ask about monthly rates, meeting room access, high-speed internet, and secretarial services.",
      "examinerPersona": {
        "name": "Examiner Pierre",
        "role": "Gestionnaire d'un espace de travail partagé innovant.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Bonjour ! Université de Montréal, Éducation Permanente, Élodie Martin à votre écoute. Quelles questions avez-vous concernant notre certificat professionnel en analyse de données ?",
        "openingPromptEnglish": "Hello! Pierre speaking, coworking space manager. How can I introduce our office packages to you?",
        "roleplayPrompt": "Présentez la formule nomade et la formule bureau dédié puis demandez si le candidat désire faire une visite."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Vérifiez l'ouverture 24h/24 et 7j/7 avec badge sécurisé.",
        "Demandez si les boissons chaudes sont incluses dans le forfait.",
        "Gardez un ton professionnel et dynamique."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Vérifiez l'ouverture 24h/24 et 7j/7 avec badge sécurisé.\nDemandez si les boissons chaudes sont incluses dans le forfait.\nGardez un ton professionnel et dynamique.",
      "trapAlertEn": "Vérifiez l'ouverture 24h/24 et 7j/7 avec badge sécurisé.\nDemandez si les boissons chaudes sont incluses dans le forfait.\nGardez un ton professionnel et dynamique.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Réservation d'un espace de coworking) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Réservation d'un espace de coworking): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "ESPACE COWORKING 'INNOVA-WORK' LAVAL",
        "category": "Bureaux Partagés & Flex-Office",
        "organization": "Innova-Work Québec Inc.",
        "content": "Espaces de travail modernes pour travailleurs autonomes, startups et professionnels nomades. Postes flexibles ou bureaux fermés.",
        "details": [
          "🖥️ Postes : Formule nomade (open-space) ou bureau dédié",
          "☕ Services : Café bio à volonté, imprimante laser, Wi-Fi 1Gb/s",
          "📅 Accès : Accès sécurisé 24/7 par badge électronique",
          "🤝 Salles : 4 salles de réunion équipées en visioconférence",
          "💰 Tarifs : Forfaits journée (35$) ou mensuel (290$)"
        ],
        "contactInfo": "📍 3050 Boulevard Saint-Martin Ouest, Laval • 📞 450-555-0166 • ✉️ contact@innova-work.ca"
      }
    },
    {
      "id": "spk-p9-t3",
      "paperNumber": 9,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (Le revenu universel de base)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (Le revenu universel de base)",
      "cefrTarget": "B2-C2",
      "scenario": "L'instauration d'un revenu universel inconditionnel versé à tous les citoyens permettrait-elle d'éliminer la pauvreté ou découragerait-elle le travail ?",
      "scenarioEn": "Would introducing an unconditional basic universal income for all citizens eradicate poverty or discourage work?",
      "examinerPersona": {
        "name": "Examiner Pierre",
        "role": "Examinateur évaluant l'analyse socio-économique approfondie.",
        "gender": "male",
        "voiceId": "fr-FR-HenriNeural",
        "openingPromptFrench": "Voici votre sujet de clôture : 'Le bilinguisme officiel constitue-t-il une force économique et culturelle majeure pour le Canada ou un défi complexe au quotidien ?' Développez votre analyse.",
        "openingPromptEnglish": "Moving to the third topic. Do you think a guaranteed basic income for everyone is a viable solution facing employment shifts?",
        "followUpCounterQuestion": "Invoquez le risque d'une hausse massive des prélèvements fiscaux et de la démotivation au travail."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Pesez la réduction de la précarité face au coût budgétaire collectif.",
        "Mentionnez l'émancipation et la possibilité de reprise d'études ou de projets.",
        "Concluez avec rigueur argumentative."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Pesez la réduction de la précarité face au coût budgétaire collectif.\nMentionnez l'émancipation et la possibilité de reprise d'études ou de projets.\nConcluez avec rigueur argumentative.",
      "trapAlertEn": "Pesez la réduction de la précarité face au coût budgétaire collectif.\nMentionnez l'émancipation et la possibilité de reprise d'études ou de projets.\nConcluez avec rigueur argumentative.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (Le revenu universel de base) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (Le revenu universel de base): Maintain a natural tone and respect the formal register."
    }
  ],
  "10": [
    {
      "id": "spk-p10-t1",
      "paperNumber": 10,
      "taskNumber": 1,
      "title": "Tâche 1 : Entretien dirigé (La technologie au quotidien)",
      "titleEn": "Tâche 1 : Entretien dirigé (La technologie au quotidien)",
      "cefrTarget": "A1-B1",
      "scenario": "Présentez-vous à l'examinatrice : parlez de votre utilisation d'Internet, de votre téléphone portable et des applications qui vous aident au quotidien.",
      "scenarioEn": "Introduce yourself to the examiner: speak about your internet use, mobile phone, and the applications that help you daily.",
      "examinerPersona": {
        "name": "Examiner Sophie",
        "role": "Examinatrice dynamique et très à l'écoute.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Bonjour ! Bienvenue à votre épreuve d'expression orale du TCF Canada. Pour commencer cette première tâche, pouvez-vous vous présenter ?",
        "openingPromptEnglish": "Hello and welcome to your oral exam. My name is Sophie. Tell me what role technology plays in your everyday life."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 2,
      "keyPhrases": [
        "Citez des exemples concrets (GPS, réseaux, messages).",
        "Expliquez si vous passez beaucoup de temps en ligne.",
        "Exprimez-vous avec clarté."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Citez des exemples concrets (GPS, réseaux, messages).\nExpliquez si vous passez beaucoup de temps en ligne.\nExprimez-vous avec clarté.",
      "trapAlertEn": "Citez des exemples concrets (GPS, réseaux, messages).\nExpliquez si vous passez beaucoup de temps en ligne.\nExprimez-vous avec clarté.",
      "speakingCoach": "Conseil pour Tâche 1 : Entretien dirigé (La technologie au quotidien) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 1 : Entretien dirigé (La technologie au quotidien): Maintain a natural tone and respect the formal register."
    },
    {
      "id": "spk-p10-t2",
      "paperNumber": 10,
      "taskNumber": 2,
      "title": "Tâche 2 : Exercice en interaction (Adhésion à un club de lecture)",
      "titleEn": "Tâche 2 : Exercice en interaction (Adhésion à un club de lecture)",
      "cefrTarget": "B1-C1",
      "scenario": "Vous souhaitez rejoindre un club de lecture francophone dans votre municipalité. Vous contactez la responsable (l'examinatrice). Posez des questions sur le rythme des réunions, la sélection des livres, le lieu de rencontre et les événements spéciaux.",
      "scenarioEn": "You want to join a Francophone book club in your municipality. You contact the leader (the examiner). Ask questions about meeting frequency, book selection, meeting location, and special events.",
      "examinerPersona": {
        "name": "Examiner Sophie",
        "role": "Animatrice passionnée du club de lecture municipal.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Bonjour ! Institut Linguistique de Montréal, Laurent Dubois au téléphone. Je vous écoute, quelles sont vos questions ?",
        "openingPromptEnglish": "Hello! Welcome to the book club, my name is Sophie. Are you interested in our literary meetings? Tell me everything!",
        "roleplayPrompt": "Expliquez que le groupe se réunit le premier mardi de chaque mois et demandez si le candidat lit des romans ou des essais."
      },
      "prepTimeMins": 2,
      "speakingTimeMins": 3.5,
      "keyPhrases": [
        "Demandez si les ouvrages sont prêtés gratuitement par la bibliothèque.",
        "Interrogez-vous sur les débats d'auteurs invités.",
        "Montrez votre passion pour la langue française."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Demandez si les ouvrages sont prêtés gratuitement par la bibliothèque.\nInterrogez-vous sur les débats d'auteurs invités.\nMontrez votre passion pour la langue française.",
      "trapAlertEn": "Demandez si les ouvrages sont prêtés gratuitement par la bibliothèque.\nInterrogez-vous sur les débats d'auteurs invités.\nMontrez votre passion pour la langue française.",
      "speakingCoach": "Conseil pour Tâche 2 : Exercice en interaction (Adhésion à un club de lecture) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 2 : Exercice en interaction (Adhésion à un club de lecture): Maintain a natural tone and respect the formal register.",
      "stimulusDocument": {
        "title": "CLUB DE LECTURE FRANC-PARLER DE MONTRÉAL",
        "category": "Culture, Littérature & Échanges",
        "organization": "Réseau des Bibliothèques Municipales de Montréal",
        "content": "Rencontres mensuelles conviviales autour de romans, essais et œuvres théâtrales francophones. Débats passionnants et rencontres d'auteurs.",
        "details": [
          "📚 Rencontres : Le 1er mardi de chaque mois (18h30 - 20h30)",
          "📖 Prêt : Emprunt gratuit des ouvrages sélectionnés",
          "☕ Ambiance : Échanges informels avec thé et rafraîchissements",
          "🎟️ Cotisation : Adhésion annuelle 25 $ CAD (gratuite pour abonnés)",
          "🎭 Événements : Conférences privées avec des écrivains invités"
        ],
        "contactInfo": "📍 Bibliothèque Grande Bibliothèque, Montréal • 📞 514-555-0111 • ✉️ club-lecture@banq.qc.ca"
      }
    },
    {
      "id": "spk-p10-t3",
      "paperNumber": 10,
      "taskNumber": 3,
      "title": "Tâche 3 : Expression d'un point de vue (La préservation des langues régionales)",
      "titleEn": "Tâche 3 : Expression d'un point de vue (La préservation des langues régionales)",
      "cefrTarget": "B2-C2",
      "scenario": "Les gouvernements doivent-ils accorder des financements prioritaires pour sauvegarder les langues et cultures minoritaires menacées d'extinction ?",
      "scenarioEn": "Should governments allocate priority funding to safeguard minority languages and cultures threatened with extinction?",
      "examinerPersona": {
        "name": "Examiner Sophie",
        "role": "Examinatrice sollicitant une réflexion sociolinguistique poussée.",
        "gender": "female",
        "voiceId": "fr-FR-VivienneMultilingualNeural",
        "openingPromptFrench": "Voici votre sujet de société pour cette troisième tâche : 'L'intelligence artificielle représente-t-elle une opportunité majeure ou une menace pour l'emploi qualifié ?'",
        "openingPromptEnglish": "To conclude this exam, do you believe defending minority linguistic heritage should be funded by priority public money?",
        "followUpCounterQuestion": "Relancez sur l'urgence d'investir plutôt dans la santé et la transition énergétique globale."
      },
      "prepTimeMins": 0,
      "speakingTimeMins": 4.5,
      "keyPhrases": [
        "Soulignez la richesse cognitive et culturelle portée par chaque langue.",
        "Reconnaissez les dilemmes d'arbitrage budgétaire public.",
        "Concluez avec une thèse synthétique et percutante."
      ],
      "recommendedConnectors": [
        "tout d'abord",
        "en revanche",
        "de surcroît",
        "en conclusion"
      ],
      "trapAlert": "Soulignez la richesse cognitive et culturelle portée par chaque langue.\nReconnaissez les dilemmes d'arbitrage budgétaire public.\nConcluez avec une thèse synthétique et percutante.",
      "trapAlertEn": "Soulignez la richesse cognitive et culturelle portée par chaque langue.\nReconnaissez les dilemmes d'arbitrage budgétaire public.\nConcluez avec une thèse synthétique et percutante.",
      "speakingCoach": "Conseil pour Tâche 3 : Expression d'un point de vue (La préservation des langues régionales) : Maintenez un ton naturel et respectez le registre de langue.",
      "speakingCoachEn": "Advice for Tâche 3 : Expression d'un point de vue (La préservation des langues régionales): Maintain a natural tone and respect the formal register."
    }
  ]
};

export function getMasterSpeakingTasks(paperIdOrNumber: string | number): MasterSpeakingTask[] {
  let paperNum = 1;
  if (typeof paperIdOrNumber === "number") {
    paperNum = Math.min(10, Math.max(1, paperIdOrNumber));
  } else {
    const matched = String(paperIdOrNumber).match(/\d+/);
    if (matched) {
      paperNum = Math.min(10, Math.max(1, parseInt(matched[0], 10)));
    }
  }

  return MASTER_SPEAKING_BANK[paperNum] || MASTER_SPEAKING_BANK[1];
}
