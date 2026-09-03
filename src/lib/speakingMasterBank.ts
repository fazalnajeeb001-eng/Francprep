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
        "openingPromptFrench": "Bonjour ! Je m'appelle Henri, votre examinateur certifié pour l'épreuve d'expression orale du TCF Canada. Nous commençons la première tâche, un entretien dirigé de deux minutes sans préparation. Pouvez-vous vous présenter, me décrire votre métier actuel et m'expliquer vos motivations pour vous installer au Canada ?",
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
      "trapAlert": "• Évitez les réponses trop courtes (1-2 mots) : développez toujours vos idées avec des exemples.\n• Ne récitez pas un texte appris par cœur : l'examinateur évalue la spontanéité.\n• Respectez le vouvoiement ('vous') avec l'examinateur.",
      "trapAlertEn": "• Avoid single-word answers: always expand your thoughts with concrete examples.\n• Do not recite a memorized text word-for-word: the examiner evaluates natural spontaneity.\n• Use formal register ('vous') when addressing the examiner.",
      "speakingCoach": "• Structurez votre présentation en 3 phases : 1. Identité & Métier 2. Parcours professionnel 3. Motivations pour le Canada.\n• Utilisez des connecteurs naturels : 'Tout d'abord', 'En effet', 'C'est pourquoi', 'En conclusion'.\n• Parlez clairement avec un débit régulier (100 à 130 mots par minute).",
      "speakingCoachEn": "• Structure your introduction in 3 steps: 1. Identity & Job 2. Career background 3. Motivations for Canada.\n• Use natural transition connectors: 'First of all', 'Indeed', 'That is why', 'In conclusion'.\n• Speak clearly at a steady pace (100 to 130 words per minute)."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Vous avez eu deux minutes de préparation pour étudier le document de location d'appartement à Québec. Nous commençons notre exercice en interaction de trois minutes et demie. Je suis le propriétaire, M. Henri. Je vous écoute, quelles sont vos questions ?",
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
      "trapAlert": "• Ne posez pas moins de 8 questions : vous risquez une pénalité sous le niveau B1.\n• Évitez de répéter la même structure d'interrogation ('Est-ce que...').\n• N'oubliez pas de conclure l'échange poliment en demandant la démarche de réservation.",
      "trapAlertEn": "• Do not ask fewer than 8 questions: asking fewer leads to a B1 grade cap penalty.\n• Avoid repeating the exact same question form ('Est-ce que...') over and over.\n• Remember to conclude politely by asking for booking/payment next steps.",
      "speakingCoach": "• Varier vos questions : utilisez l'inversion ('Auriez-vous... ?'), le conditionnel ('Serait-il possible de... ?') et l'interrogation indirecte ('Je souhaiterais savoir si...').\n• Balayez les thèmes clé : tarifs, équipements, localisation, modalités de réservation, conditions d'annulation.\n• Réagissez aux réponses du propriétaire : 'Très bien', 'Parfait', 'D'accord, je comprends'.",
      "speakingCoachEn": "• Vary your interrogative forms: use inversion ('Would you have...?'), conditional ('Would it be possible to...?'), and indirect forms ('I would like to know if...').\n• Cover key themes: pricing, amenities, location, booking procedure, cancellation policy.\n• Acknowledge landlord replies naturally: 'Very good', 'Perfect', 'Alright, I understand'.",
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
        "openingPromptFrench": "Passons à la troisième et dernière tâche d'une durée de quatre minutes et demie. Le sujet est le suivant : 'Le télétravail généralisé nuit-il à la cohésion sociale et à la culture d'entreprise ?' Présentez-moi votre argumentation de manière structurée.",
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
      "trapAlert": "• Ne donnez pas un avis tranché sans nuance : le niveau B2/C1 exige un débat équilibré.\n• N'ignorez pas les contre-arguments de l'examinateur.\n• Évitez le vocabulaire familier ou les expressions d'opinion vagues ('C'est bien', 'C'est mauvais').",
      "trapAlertEn": "• Avoid absolute one-sided claims: B2/C1 bands require a balanced, nuanced argument.\n• Do not ignore the examiner's counter-arguments or objections.\n• Avoid informal slang or vague opinion phrases ('It's good', 'It's bad').",
      "speakingCoach": "• Suivez le plan dialectique TCF : 1. Accroche & Thèse (2 min) 2. Antithèse & Nuances (1 min) 3. Conclusion & Synthèse (1 min).\n• Utilisez des connecteurs argumentatifs riches : 'En premier lieu', 'Certes... mais', 'Néanmoins', 'Il n'en reste pas moins que'.\n• Défendez fermement votre position tout en concédant les objections valides de l'examinateur.",
      "speakingCoachEn": "• Follow the TCF dialectic framework: 1. Introduction & Thesis (2 min) 2. Antithesis & Nuance (1 min) 3. Conclusion & Synthesis (1 min).\n• Use advanced logical connectors: 'In the first place', 'Admittedly... but', 'Nevertheless', 'The fact remains that'.\n• Firmly defend your position while acknowledging the examiner's valid counter-arguments."
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
        "openingPromptFrench": "Bonjour ! Je suis Denise, votre examinatrice officielle pour cette épreuve d'expression orale du TCF Canada. Pour la première tâche sans préparation de deux minutes, faisons connaissance. Pouvez-vous vous présenter, me décrire votre parcours professionnel et me parler de vos loisirs préférés ?",
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
      "trapAlert": "• Évitez de lister vos diplômes de manière scolaire : racontez votre parcours comme une histoire.\n• Attention aux temps du passé : maîtrisez le passé composé et l'imparfait.\n• Ne parlez pas trop vite : privilégiez l'articulation et la clarté.",
      "trapAlertEn": "• Avoid listing qualifications like a resume: frame your career as a natural narrative.\n• Mind your past tenses: combine passé composé (completed actions) and imparfait (background/habits).\n• Do not rush: focus on clear articulation and proper phrasing.",
      "speakingCoach": "• Structurez votre récit : 1. Poste actuel 2. Expériences marquantes 3. Projets d'avenir au Canada.\n• Intégrez des connecteurs temporels : 'Après avoir obtenu mon diplôme', 'Pendant trois ans', 'Désormais'.\n• Mettez en valeur vos compétences transversales et votre adaptabilité.",
      "speakingCoachEn": "• Structure your story: 1. Current position 2. Key past experiences 3. Future Canada plans.\n• Integrate temporal connectors: 'After obtaining my degree', 'For three years', 'From now on'.\n• Highlight your transferable skills and intercultural adaptability."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur l'inscription aux cours de français intensifs à Montréal sont terminées. Échangeons pendant trois minutes et demie. Je suis la directrice pédagogique, Denise. Posez-moi toutes vos questions !",
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
      "trapAlert": "• Ne vous contentez pas de demander les tarifs : explorez la pédagogie, le nombre d'étudiants et les horaires.\n• N'interrompez pas l'examinateur pendant qu'il répond.\n• Ne manquez pas de vous présenter brièvement au début de l'appel.",
      "trapAlertEn": "• Do not focus only on prices: inquire about teaching methods, class sizes, and schedules.\n• Do not interrupt the examiner while they are answering your question.\n• Remember to introduce yourself briefly at the start of the call.",
      "speakingCoach": "• Saluez et présentez le motif : 'Bonjour, je vous appelle suite à votre annonce pour les cours de langue'.\n• Posez 8 à 10 questions précises : test de niveau, horaires du soir, certificats délivrés, méthodes d'apprentissage.\n• Proposez un rendez-vous ou une séance d'essai pour conclure l'échange.",
      "speakingCoachEn": "• Greet and state your objective: 'Hello, I am calling regarding your language course advertisement'.\n• Ask 8 to 10 targeted questions: placement test, evening schedules, certificates issued, teaching materials.\n• Propose a trial lesson or appointment to conclude the phone conversation.",
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
        "openingPromptFrench": "Voici la troisième tâche d'une durée de quatre minutes et demie. Le sujet est : 'L'intelligence artificielle et la technologie doivent-elles occuper une place centrale dans l'éducation moderne ?' Développez votre point de vue avec des arguments précis.",
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
      "trapAlert": "• Ne dites pas simplement 'Les écrans sont dangereux' : analysez les impacts éducatifs et sociaux.\n• Évitez de généraliser sans données ou exemples concrets.\n• Ne vous laissez pas déstabiliser par la contre-question de l'examinateur.",
      "trapAlertEn": "• Do not simply state 'Screens are dangerous': analyze educational, health, and social impacts.\n• Avoid broad generalizations without supporting examples or reasoning.\n• Do not get flustered by the examiner's counter-question.",
      "speakingCoach": "• Présentez les deux facettes : 1. Avantages éducatifs et accès à la connaissance 2. Risques de sédentarité et d'isolement.\n• Formulez des propositions nuancées : 'Il convient d'encadrer l'usage plutôt que de l'interdire'.\n• Concluez sur le rôle d'accompagnement des parents et des enseignants.",
      "speakingCoachEn": "• Present both sides: 1. Educational benefits and knowledge access 2. Risks of sedentary behavior and isolation.\n• Offer nuanced solutions: 'Usage should be guided rather than strictly banned'.\n• Conclude by stressing the guiding role of parents and educators."
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
        "openingPromptFrench": "Bonjour ! Je m'appelle Jean, votre examinateur certifié TCF Canada. Pour cette première tâche de deux minutes sans préparation, nous menons un entretien dirigé. Pouvez-vous vous présenter, me décrire votre quartier, votre logement et m'expliquer ce que vous appréciez dans votre cadre de vie ?",
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
      "trapAlert": "• Ne décrivez pas seulement votre logement : abordez votre quartier, les transports et les commerces.\n• Attention au vocabulaire descriptif : variez les adjectifs qualificatifs.\n• Ne parlez pas d'un ton monotone.",
      "trapAlertEn": "• Do not describe only your apartment: discuss your neighborhood, public transport, and local shops.\n• Watch your descriptive vocabulary: vary your adjectives beyond 'grand' and 'beau'.\n• Avoid a flat, monotone delivery.",
      "speakingCoach": "• Développez 3 axes : 1. Localisation et transports 2. Ambiance du quartier 3. Ce que vous appréciez le plus.\n• Utilisez des formules de goût : 'Ce qui me plaît particulièrement, c'est...', 'J'apprécie la proximité de...'.\n• Adoptez un rythme dynamique et expressif.",
      "speakingCoachEn": "• Develop 3 angles: 1. Location and transit 2. Neighborhood atmosphere 3. What you enjoy most.\n• Use preference phrases: 'What I particularly enjoy is...', 'I appreciate the proximity of...'.\n• Maintain an engaging and expressive delivery speed."
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
        "openingPromptFrench": "Nous abordons la deuxième tâche. Vous avez préparé vos questions pendant deux minutes d'après le programme de nettoyage écologique à Ottawa. Nous entamons trois minutes et demie d'interaction. Je suis l'agent des services citoyens, M. Jean. Je vous écoute !",
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
      "trapAlert": "• Ne faites pas de monologue : laissez l'examinateur répondre à chaque question.\n• N'oubliez pas d'aborder les aspects logistiques (budget, sécurité, lieu).\n• N'utilisez pas le tutoiement ('tu').",
      "trapAlertEn": "• Do not monologue: let the examiner answer after each question.\n• Remember to cover logistical aspects (budget, safety, venue, permit).\n• Do not use informal register ('tu').",
      "speakingCoach": "• Structurez votre entretien d'organisation : objectif, date, participants, matériel, autorisation municipale.\n• Posez au moins 8 questions structurées : 'Quel budget devez-vous prévoir ?', 'Où aura lieu l'événement ?'.\n• Montrez votre enthousiasme et proposez votre aide pour l'organisation.",
      "speakingCoachEn": "• Structure your planning call: goal, date, expected attendees, equipment, city permits.\n• Ask at least 8 structured questions: 'What budget should we allocate?', 'Where will the event be held?'.\n• Show enthusiasm and offer your assistance with planning.",
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
        "openingPromptFrench": "Passons à la troisième tâche de quatre minutes et demie. Exprimez votre opinion argumentée sur la question suivante : 'La gratuité des transports en commun est-elle la solution idéale pour préserver l'environnement urbain ?' La parole est à vous.",
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
      "trapAlert": "• Évitez de vous concentrer uniquement sur le coût : examinez l'environnement et l'équité sociale.\n• Ne rejetez pas brutalement l'opinion contraire.\n• Veillez à la correction grammaticale des phrases complexes.",
      "trapAlertEn": "• Avoid focusing solely on cost: examine environmental and social equity impacts.\n• Do not bluntly dismiss opposing viewpoints.\n• Ensure grammatical accuracy in complex sentence structures.",
      "speakingCoach": "• Argumentez avec méthode : 1. Impact écologique (réduction de la pollution) 2. Justice sociale 3. Financement public.\n• Utilisez des structures d'hypothèse : 'Si les transports étaient gratuits, la circulation diminuerait sensiblement'.\n• Rebondissez sur l'objection de l'examinateur concernant les impôts.",
      "speakingCoachEn": "• Argue methodically: 1. Ecological impact (pollution reduction) 2. Social equity 3. Public funding challenges.\n• Use conditional hypotheses: 'If public transit were free, traffic congestion would decrease significantly'.\n• Address the examiner's tax counter-argument directly and diplomatically."
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
        "openingPromptFrench": "Bonjour ! Je suis Sylvie, votre examinatrice officielle pour le TCF Canada. Pour cette première tâche sans préparation de deux minutes, nous faisons un entretien dirigé. Pouvez-vous vous présenter, me parler de vos habitudes alimentaires, de vos plats préférés et de vos sorties au restaurant ?",
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
      "trapAlert": "• Ne dites pas simplement 'J'aime manger au restaurant' : décrivez vos habitudes et plats préférés.\n• Évitez les erreurs de genre des mots fréquents (un/une restaurant, la/le cuisine).\n• Développez chaque réponse.",
      "trapAlertEn": "• Do not just say 'I like eating out': describe your habits, favorite dishes, and dining experiences.\n• Avoid gender errors on common words (un restaurant, la cuisine).\n• Elaborate on every point.",
      "speakingCoach": "• Enchaînez les idées : vos habitudes de repas ➔ vos spécialités culinaires ➔ vos sorties entre amis.\n• Enrichissez votre vocabulaire gastronomique : 'ingrédients régionaux', 'saveurs authentiques', 'convivialité'.\n• Répondez spontanément aux relances de l'examinateur.",
      "speakingCoachEn": "• Connect your thoughts: dining habits ➔ culinary specialties ➔ social outings with friends.\n• Enrich your culinary vocabulary: 'regional ingredients', 'authentic flavors', 'conviviality'.\n• Reply spontaneously to follow-up questions from the examiner."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur l'annonce de la librairie-café de Sherbrooke sont écoulées. Échangeons pendant trois minutes et demie. Je suis la gérante de la librairie, Sylvie. Posez-moi vos questions !",
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
      "trapAlert": "• Ne posez pas de questions vagues ('C'est quel travail ?') : demandez les missions exactes.\n• Ne négligez pas de vous renseigner sur les conditions de travail (horaires, tenue, logement).\n• Gardez un profil professionnel.",
      "trapAlertEn": "• Avoid vague questions ('What is the job?'): inquire about specific daily responsibilities.\n• Do not forget to ask about working conditions (hours, dress code, accommodation).\n• Maintain a professional candidate posture.",
      "speakingCoach": "• Conduisez l'entretien de candidature : compétences requises, salaire horaire, date de début, logement fourni.\n• Utilisez des formules de politesse professionnelle : 'Je me permets de vous contacter pour le poste de...'.\n• Concluez en envoyant ou proposant de transmettre votre CV.",
      "speakingCoachEn": "• Lead your job inquiry call: required skills, hourly pay, start date, provided housing.\n• Use formal job inquiry phrasing: 'I am contacting you regarding the seasonal job posting for...'.\n• Conclude by offering to forward your CV or schedule an interview.",
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
        "openingPromptFrench": "Voici la troisième tâche de quatre minutes et demie. Le sujet de débat est : 'La consommation responsable et le tri sélectif doivent-ils devenir obligatoires sous peine de sanctions financières ?' Présentez votre point de vue.",
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
      "trapAlert": "• Ne diabolisez pas et n'idéalisez pas l'IA : apportez une réflexion équilibrée et prospective.\n• Attention à la prononciation des termes techniques en français.\n• Respectez le temps imparti (4.5 min).",
      "trapAlertEn": "• Neither demonize nor overly praise AI: offer a balanced, forward-looking reflection.\n• Mind the French pronunciation of technical terms ('intelligence artificielle').\n• Respect the 4.5-minute time limit.",
      "speakingCoach": "• Construisez une argumentation solide : 1. Gain de productivité 2. Menaces sur certains emplois 3. Nécessité d'une régulation.\n• Employez le subjonctif : 'Bien qu'il soit indéniable que l'IA transforme l'économie...'.\n• Concluez sur la complémentarité entre l'intelligence humaine et artificielle.",
      "speakingCoachEn": "• Build a solid argument: 1. Productivity gains 2. Job displacement threats 3. Need for ethical regulation.\n• Use the subjunctive mood: 'While it is undeniable that AI transforms the economy...'.\n• Conclude by emphasizing the complementarity of human and artificial intelligence."
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
        "openingPromptFrench": "Bonjour ! Je m'appelle Rémy, votre examinateur certifié pour le TCF Canada. Pour cette première tâche de deux minutes sans préparation, nous réalisons un entretien dirigé. Pouvez-vous vous présenter et m'expliquer comment vous organisez vos journées de travail ou d'études ?",
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
      "trapAlert": "• Ne vous limitez pas à une liste de pays : racontez un souvenir de voyage marquant.\n• Attention à l'accord des adjectifs et au choix des prépositions (en France, au Canada, aux États-Unis).\n• Exprimez des émotions.",
      "trapAlertEn": "• Do not limit yourself to a list of countries: share a memorable travel story.\n• Mind country prepositions (en France, au Canada, aux États-Unis) and adjective agreement.\n• Express personal feelings and discoveries.",
      "speakingCoach": "• Racontez avec passion : destination ➔ paysage/culture ➔ rencontre inoubliable.\n• Utilisez des structures d'appréciation : 'Ce qui m'a le plus marqué, c'est...', 'J'ai été fasciné par...'.\n• Liez vos voyages à votre projet d'immigration au Canada.",
      "speakingCoachEn": "• Tell an engaging story: destination ➔ landscape/culture ➔ unforgettable encounter.\n• Use appreciation structures: 'What struck me most was...', 'I was fascinated by...'.\n• Connect your travel experience to your Canada immigration goals."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Après vos deux minutes de préparation sur la brochure du Musée national des beaux-arts du Québec, nous entamons trois minutes et demie d'échange. Je suis le responsable des visites de groupe, Rémy. Je vous écoute, quelles sont vos questions ?",
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
      "trapAlert": "• Ne laissez pas l'examinateur mener l'échange : c'est à vous de poser les questions.\n• N'oubliez pas les aspects pratiques (assurances, visa, hébergement, transport).\n• Respectez les 3.5 minutes.",
      "trapAlertEn": "• Do not let the examiner drive the conversation: you must lead with questions.\n• Do not forget practical aspects (insurance, visa support, accommodation, flights).\n• Manage the 3.5-minute duration effectively.",
      "speakingCoach": "• Interrogez l'organisme de séjour : programme d'études, familles d'accueil, budget total, accompagnement sur place.\n• Formulez 8 à 10 questions variées au conditionnel de politesse.\n• Concluez en demandant la documentation officielle par courriel.",
      "speakingCoachEn": "• Question the study agency: curriculum, host families, total budget, local support.\n• Formulate 8 to 10 varied questions using the polite conditional tense.\n• Conclude by requesting official documentation via email.",
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
        "openingPromptFrench": "Passons à la troisième tâche d'une durée de quatre minutes et demie. Développez votre réflexion sur le sujet suivant : 'Les réseaux sociaux favorisent-ils l'isolement individuel plutôt que le rapprochement humain ?' Présentez votre argumentation.",
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
      "trapAlert": "• Ne dites pas 'Le tourisme est mauvais' : distinguez retombées économiques et dégradations environnementales.\n• Ne vous perdez pas dans des anecdotes personnelles inutiles.\n• Maintenez un niveau de langue soutenu.",
      "trapAlertEn": "• Avoid saying 'Tourism is bad': balance economic benefits against environmental degradation.\n• Avoid getting lost in irrelevant personal anecdotes.\n• Maintain a formal B2/C1 register throughout.",
      "speakingCoach": "• Développez une thèse B2/C1 : 1. Apport économique pour les régions 2. Nuisances (pollution, hausse des loyers) 3. Ecotourisme et régulation.\n• Utilisez des formules de concession : 'Certes le tourisme génère des emplois, toutefois...'.\n• Répondez de manière structurée aux objections de l'examinateur.",
      "speakingCoachEn": "• Develop a B2/C1 thesis: 1. Economic benefits for regions 2. Drawbacks (pollution, rent inflation) 3. Ecotourism & regulation.\n• Use concessive phrasing: 'Admittedly tourism creates jobs, however...'.\n• Respond constructively to counter-arguments from the examiner."
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
        "openingPromptFrench": "Bonjour ! Je suis Vivienne, votre examinatrice officielle pour le TCF Canada. Pour cette première tâche de deux minutes sans préparation, pouvez-vous vous présenter et me décrire une journée habituelle dans votre vie (matin, travail, repas, soirée) ?",
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
      "trapAlert": "• Ne décrivez pas une journée banale sans relief : mettez en valeur votre organisation et vos loisirs.\n• Attention aux connecteurs chronologiques (d'abord, ensuite, enfin).\n• Soignez l'intonation.",
      "trapAlertEn": "• Avoid describing a dull daily routine: highlight your organization, hobbies, and balance.\n• Use chronological connectors smoothly (first, then, finally).\n• Focus on natural intonation.",
      "speakingCoach": "• Presentez votre journée type : matinée professionnelle ➔ pauses et loisirs ➔ activités de soirée.\n• Utilisez des adverbes de fréquence : 'habituellement', 'rarement', 'régulièrement'.\n• Montrez votre capacité à concilier vie professionnelle et personnelle.",
      "speakingCoachEn": "• Present your typical day: work morning ➔ breaks & hobbies ➔ evening activities.\n• Use frequency adverbs: 'usually', 'rarely', 'regularly'.\n• Demonstrate your ability to balance work and personal life."
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
        "openingPromptFrench": "Nous entamons la deuxième tâche. Vos deux minutes de préparation sur la brochure d'Auto-Express Trois-Rivières sont terminées. Échangeons pendant trois minutes et demie. Je suis la conseillère d'agence, Vivienne. Posez-moi vos questions !",
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
      "trapAlert": "• Ne vous contentez pas de demander le prix au jour : demandez les assurances, la caution et le kilométrage.\n• Vérifiez les conditions du permis de conduire.\n• Remerciez chaleureusement l'agent.",
      "trapAlertEn": "• Do not just ask for the daily rate: inquire about insurance, deposit, and mileage limits.\n• Confirm driver's license requirements.\n• Thank the agent warmly at the end.",
      "speakingCoach": "• Menez la réservation de véhicule : catégorie de voiture, carburant, kilométrage illimité, deuxième conducteur.\n• Alignez 8 à 10 questions précises et professionnelles.\n• Validez les modalités de retrait du véhicule le jour J.",
      "speakingCoachEn": "• Lead your car rental call: vehicle class, fuel policy, unlimited mileage, second driver fee.\n• Ask 8 to 10 precise, professional questions.\n• Confirm pickup arrangements for the rental date.",
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
        "openingPromptFrench": "Voici la troisième et dernière tâche de quatre minutes et demie. Votre sujet de réflexion est le suivant : 'Les applications mobiles et l'intelligence artificielle remplaceront-elles à terme les enseignants de langues en classe ?' Exprimez votre point de vue.",
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
      "trapAlert": "• Ne dites pas 'Les applications remplacent les profs' : nuancez l'autonomie et le manque d'interaction humaine.\n• Soignez les structures syntaxiques complexes.\n• Ne dépassez pas les 4.5 minutes.",
      "trapAlertEn": "• Avoid claiming 'Apps replace teachers': balance self-paced learning against lack of human interaction.\n• Pay attention to complex syntactic structures.\n• Stay within the 4.5-minute allocation.",
      "speakingCoach": "• Opposez méthodes traditionnelles et numériques : 1. Souplesse et accessibilité des applications 2. Importance de l'immersion et de l'échange humain.\n• Proposez une approche hybride comme solution idéale.\n• Concluez de manière convaincante et fluide.",
      "speakingCoachEn": "• Contrast traditional and digital methods: 1. Flexibility and accessibility of apps 2. Importance of human interaction & immersion.\n• Propose a blended learning approach as the optimal solution.\n• Conclude fluently and persuasively."
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
        "name": "Examiner Élodie",
        "role": "Examinatrice certifiée FEI — Format TCF Canada.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bonjour ! Je m'appelle Élodie, votre examinatrice certifiée pour le TCF Canada. Pour la première tâche sans préparation de deux minutes, nous menons un entretien dirigé. Pouvez-vous vous présenter, me décrire votre domaine d'activité actuel et m'expliquer vos objectifs professionnels pour le Canada ?",
        "openingPromptEnglish": "Hello! I am Élodie Martin. Welcome. Tell me what sector you work in and what your future project is in Canada."
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
      "trapAlert": "• Ne parlez pas de vos projets de manière floue : soyez précis sur vos objectifs au Canada.\n• Attention au futur simple et au conditionnel.\n• Articulez chaque phrase avec soin.",
      "trapAlertEn": "• Do not talk about your goals vaguely: be specific about your career objectives in Canada.\n• Watch your future simple and conditional tenses.\n• Articulate every phrase clearly.",
      "speakingCoach": "• Articulez votre projet : compétences actuelles ➔ secteur visé au Canada ➔ démarches entreprises.\n• Valorisez votre motivation francophone et votre intégration future.\n• Restez positif et très professionnel.",
      "speakingCoachEn": "• Articulate your project: current skills ➔ targeted sector in Canada ➔ steps already taken.\n• Highlight your Francophone motivation and future community integration.\n• Remain positive and highly professional throughout."
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
        "name": "Examiner Élodie",
        "role": "Responsable du complexe aquatique et sportif de Gatineau.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Vous avez préparé vos questions pendant deux minutes d'après la fiche du complexe aquatique et sportif de Gatineau. Nous échangeons pendant trois minutes et demie. Je suis la responsable du centre, Élodie. Je vous écoute !",
        "openingPromptEnglish": "Hello! Welcome to Gatineau Sports Complex, I am Élodie. Would you like information about our facilities?",
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
      "trapAlert": "• Ne manquez pas de vous renseigner sur les équipements sportifs et les abonnements.\n• N'oubliez pas de demander les tarifs préférentiels (famille, étudiant).\n• Posez au moins 8 questions.",
      "trapAlertEn": "• Do not miss asking about sports facilities and membership packages.\n• Remember to inquire about discount rates (family, student, senior).\n• Ask at least 8 distinct questions.",
      "speakingCoach": "• Informez-vous sur le nouveau centre sportif : cours collectifs, entraîneurs personnels, horaires d'ouverture, vestiaires.\n• Variez vos structures interrogatives avec élégance.\n• Demandez s'il est possible de faire une journée portes ouvertes.",
      "speakingCoachEn": "• Inquire about the new sports center: group classes, personal trainers, opening hours, locker rooms.\n• Vary your question structures gracefully.\n• Ask if a free open-house trial pass is available.",
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
        "name": "Examiner Élodie",
        "role": "Examinatrice stimulant le débat environnemental.",
        "gender": "female",
        "voiceId": "fr-FR-DeniseNeural",
        "openingPromptFrench": "Passons à la troisième tâche d'une durée de quatre minutes et demie. Débattez sur le sujet suivant : 'Devrions-nous interdire la vente de produits à usage unique non recyclables pour imposer une économie circulaire intégrale ?' Présentez vos arguments.",
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
      "trapAlert": "• Ne vous perdez pas dans une explication trop technique : privilégiez les enjeux sociétaux et économiques.\n• Ne négligez pas les obstacles au changement (coûts de transition).\n• Exprimez-vous au niveau C1.",
      "trapAlertEn": "• Do not get lost in overly technical jargon: focus on societal and economic issues.\n• Do not overlook transition barriers for businesses and consumers.\n• Express yourself at a C1 benchmark level.",
      "speakingCoach": "• Développez la thématique de la sobriété : 1. Réduction des déchets et réutilisation 2. Freins industriels et financiers 3. Évolution des mentalités.\n• Utilisez des connecteurs de haut niveau : 'En somme', 'Conséquemment', 'Nonobstant'.\n• Défendez une vision réaliste et pragmatique.",
      "speakingCoachEn": "• Develop the circular economy theme: 1. Waste reduction & reuse 2. Industrial & financial hurdles 3. Shift in consumer mindsets.\n• Use advanced discourse markers: 'In short', 'Consequently', 'Notwithstanding'.\n• Defend a realistic and pragmatic economic vision."
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
        "openingPromptFrench": "Bonjour ! Je suis Brigitte, votre examinatrice certifiée pour le TCF Canada. Pour cet entretien dirigé de deux minutes sans préparation, pouvez-vous vous présenter, me parler de vos goûts musicaux, de vos films préférés et de vos dernières activités culturelles ?",
        "openingPromptEnglish": "Hello! Welcome to your oral exam. My name is Brigitte. Tell me what you like to watch or listen to in order to relax."
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
      "trapAlert": "• Ne dites pas seulement 'J'aime le cinéma' : commentez un film ou une pièce récente.\n• Attention au vocabulaire culturel en français.\n• Répondez avec aisance et sourire.",
      "trapAlertEn": "• Do not just say 'I like movies': discuss a recent film, book, or cultural event.\n• Watch cultural vocabulary terms in French.\n• Respond with ease and confidence.",
      "speakingCoach": "• Partagez vos goûts culturels : genres préférés ➔ dernier spectacle/exposition ➔ importance de la culture dans votre vie.\n• Employez des termes variés : 'chef-d'œuvre', 'scénario captive', 'expérience enrichissante'.\n• Entrez naturellement dans la discussion.",
      "speakingCoachEn": "• Share your cultural interests: preferred genres ➔ last show/exhibition ➔ role of culture in your life.\n• Use varied vocabulary: 'masterpiece', 'captivating plot', 'enriching experience'.\n• Engage naturally in the conversation."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Vos deux minutes de préparation sur le dépliant du réseau solidaire alimentaire sont écoulées. Échangeons pendant trois minutes et demie. Je suis la coordonnatrice, Mme Brigitte. Posez-moi toutes vos questions !",
        "openingPromptEnglish": "Welcome to the second task. Your two minutes of preparation on the food bank volunteering document are complete. I am the coordinator, Ms. Brigitte. What questions do you have for me?",
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
      "trapAlert": "• Ne demandez pas uniquement 'Comment aider ?' : précisez les missions du bénévole.\n• Renseignez-vous sur le temps d'engagement requis.\n• Restez très chaleureux et engagé.",
      "trapAlertEn": "• Do not just ask 'How can I help?': inquire about specific volunteer tasks.\n• Inquire about the time commitment expected per week/month.\n• Maintain a warm and dedicated tone.",
      "speakingCoach": "• Interrogez l'association caritative : publics aidés, actions sur le terrain, formations offertes aux bénévoles.\n• Posez 8 à 10 questions bien construites.\n• Proposez vos compétences spécifiques (informatique, langues, logistique).",
      "speakingCoachEn": "• Question the charity organization: communities served, field actions, volunteer training offered.\n• Formulate 8 to 10 well-crafted questions.\n• Offer your specific skills (IT, languages, logistics support).",
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
        "openingPromptFrench": "Voici la troisième tâche de quatre minutes et demie. Exprimez votre avis argumenté sur la question : 'Le port de l'uniforme obligatoire à l'école est-il une mesure efficace pour réduire les inégalités sociales et favoriser l'égalité ?' À vous la parole.",
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
      "trapAlert": "• Ne rejetez pas l'uniforme sans écouter les arguments d'égalité sociale.\n• Évitez les propos simplistes ('C'est pas beau').\n• Construisez un débat équilibré.",
      "trapAlertEn": "• Do not dismiss school uniforms without considering social equality arguments.\n• Avoid simplistic remarks ('It doesn't look nice').\n• Build a balanced educational debate.",
      "speakingCoach": "• Évaluez le port de l'uniforme à l'école : 1. Réduction des inégalités visibles et du harcèlement 2. Frein à la liberté d'expression individuelle 3. Compromis possible.\n• Intégrez des structures de comparaison et de nuance.\n• Respondez poliment à l'objection de l'examinateur.",
      "speakingCoachEn": "• Evaluate school uniforms: 1. Reduction of visible social inequality & bullying 2. Constraint on individual self-expression 3. Possible compromise.\n• Integrate comparative and concessive sentence structures.\n• Respond politely to the examiner's objections."
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
        "openingPromptFrench": "Bonjour ! Je m'appelle Pierre, votre examinateur certifié pour le TCF Canada. Pour la première tâche sans préparation de deux minutes, pouvez-vous vous présenter, me parler de votre hygiène de vie, de vos activités physiques et de la manière dont vous gérez le stress ?",
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
      "trapAlert": "• Ne donnez pas de détails médicaux intimes : restez sur l'hygiène de vie et le bien-être général.\n• Attention aux faux amis en anglais (ex: 'gym' = salle de sport, 'exercise' = activité physique).\n• Soignez votre diction.",
      "trapAlertEn": "• Do not share private medical details: focus on healthy lifestyle habits and general wellness.\n• Beware of English false friends (gym = salle de sport, exercise = activité physique).\n• Focus on clear pronunciation.",
      "speakingCoach": "• Décrivez votre routine de santé : alimentation équilibrée ➔ activité physique régulière ➔ gestion du stress.\n• Utilisez du vocabulaire adapté : 'vitalité', 'équilibre de vie', 'prévention'.\n• Transmettez un message positif et structuré.",
      "speakingCoachEn": "• Describe your wellness routine: balanced diet ➔ regular physical activity ➔ stress management.\n• Use appropriate vocabulary: 'vitality', 'work-life balance', 'prevention'.\n• Convey a positive, well-structured message."
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
        "openingPromptFrench": "Bienvenue dans la deuxième tâche. Après vos deux minutes de préparation sur l'annonce de l'espace de coworking Innova-Work, nous entamons trois minutes et demie d'interaction. Je suis le gestionnaire du centre, M. Pierre. Je vous écoute !",
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
      "trapAlert": "• Ne demandez pas seulement le tarif au mois : vérifiez la connexion Internet, la salle de réunion et l'accès 24/7.\n• Renseignez-vous sur la réservation de postes individuels.\n• Gardez un ton professionnel.",
      "trapAlertEn": "• Do not ask only about monthly rent: verify Wi-Fi speed, meeting rooms, and 24/7 access.\n• Inquire about hot-desk vs dedicated desk reservations.\n• Maintain a professional business tone.",
      "speakingCoach": "• Questionnez le responsable du coworking : équipements informatiques, espace café, contrat de flexibilité, événements de réseau.\n• Formulez 8 à 10 questions précises.\n• Demandez une visite guidée des lieux avant de souscrire.",
      "speakingCoachEn": "• Question the coworking manager: IT infrastructure, coffee amenities, flexible contracts, networking events.\n• Ask 8 to 10 precise business questions.\n• Request a guided tour of the facility before signing up.",
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
        "openingPromptFrench": "Passons à la troisième tâche d'une durée de quatre minutes et demie. Défendez votre opinion sur le sujet : 'L'instauration d'un revenu universel inconditionnel versé à tous les citoyens permettrait-elle d'éliminer la pauvreté ou découragerait-elle le travail ?' Présentez votre argumentation.",
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
      "trapAlert": "• Ne considérez pas le revenu de base comme une utopie irréaliste : étudiez les expérimentations réelles.\n• Ne négligez pas la question du financement fiscal.\n• Visez le niveau C1/C2.",
      "trapAlertEn": "• Do not dismiss universal basic income as an impossible utopia: examine real pilot tests.\n• Do not overlook the key question of tax funding mechanisms.\n• Target a C1/C2 advanced level of discourse.",
      "speakingCoach": "• Analysez le revenu universel : 1. Éradication de la pauvreté et sécurité financière 2. Risque de démotivation au travail et coût budgétaire 3. Modèle d'avenir avec l'automatisation.\n• Maniez les connecteurs logiques de haut niveau avec aisance.\n• Rebondissez intelligemment sur la contre-argumentation de l'examinateur.",
      "speakingCoachEn": "• Analyze universal basic income: 1. Poverty eradication & financial security 2. Potential work disincentives & fiscal costs 3. Future model amid automation.\n• Use advanced logical connectors with confidence.\n• Rebound intelligently against the examiner's counter-arguments."
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
        "openingPromptFrench": "Bonjour ! Je suis Sophie, votre examinatrice officielle pour le TCF Canada. Commençons par la première tâche sans préparation de deux minutes. Pouvez-vous vous présenter, me parler de votre utilisation d'Internet, de votre téléphone portable et des applications qui vous aident au quotidien ?",
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
      "trapAlert": "• Ne dites pas simplement 'J'utilise mon téléphone' : expliquez comment la technologie facilite votre travail et vos loisirs.\n• Attention aux erreurs de prononciation des mots numériques.\n• Soyez fluide.",
      "trapAlertEn": "• Do not just say 'I use my smartphone': explain how technology facilitates your work and daily life.\n• Mind the pronunciation of tech terms in French.\n• Keep your speech smooth and continuous.",
      "speakingCoach": "• Détaillez votre usage du numérique : outils de travail à distance ➔ applications de vie quotidienne ➔ limites personnelles.\n• Utilisez du vocabulaire technique approprié : 'numérisation', 'efficacité', 'déconnexion'.\n• Exprimez-vous de façon naturelle et structurée.",
      "speakingCoachEn": "• Detail your digital usage: remote work tools ➔ daily lifestyle apps ➔ personal boundaries.\n• Use appropriate tech terms: 'digitization', 'efficiency', 'disconnecting'.\n• Express your thoughts naturally and clearly."
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
        "openingPromptFrench": "Nous abordons la deuxième tâche. Vos deux minutes de préparation sur la brochure du club de lecture sont terminées. Échangeons pendant trois minutes et demie. Je suis l'animatrice du club, Mme Sophie. Posez-moi toutes vos questions !",
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
      "trapAlert": "• Ne demandez pas uniquement 'C'est quand les réunions ?' : explorez les genres littéraires et les modalités d'échange.\n• Vérifiez la cotisation annuelle.\n• Soyez très chaleureux.",
      "trapAlertEn": "• Do not ask only about meeting dates: explore literary genres, format of discussions, and book choices.\n• Inquire about annual membership fees.\n• Be warm and engaging throughout.",
      "speakingCoach": "• Interrogez l'animateur du club de lecture : choix des livres, fréquence des rencontres, débats en ligne ou en présentiel.\n• Posez 8 à 10 questions enthousiastes et variées.\n• Proposez de participer à la prochaine rencontre comme invité.",
      "speakingCoachEn": "• Question the book club coordinator: book selection process, meeting frequency, online vs in-person format.\n• Ask 8 to 10 enthusiastic, varied questions.\n• Propose attending the upcoming session as a guest.",
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
        "openingPromptFrench": "Voici la troisième et dernière tâche de quatre minutes et demie. Exprimez votre opinion de manière structurée sur le sujet : 'Les gouvernements doivent-ils accorder des financements prioritaires pour sauvegarder les langues et cultures minoritaires menacées d'extinction ?' Développez vos arguments.",
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
      "trapAlert": "• Ne qualifiez pas la sauvegarde des langues de 'pauvre tradition' : étudiez le patrimoine culturel et la diversité linguistique.\n• Évitez le manque de nuance économique.\n• Argumentez au niveau C1/C2.",
      "trapAlertEn": "• Do not dismiss regional language preservation as obsolete: evaluate cultural heritage and linguistic diversity.\n• Avoid lack of economic nuance regarding preservation costs.\n• Structure a C1/C2 level argument.",
      "speakingCoach": "• Débattez de la préservation linguistique : 1. Richesse du patrimoine culturel et de l'identité 2. Coût de l'enseignement et prédominance des langues mondiales 3. Équilibre et bilinguisme.\n• Employez un vocabulaire académique riche et nuancé.\n• Défendez votre point de vue avec concision et pertinence.",
      "speakingCoachEn": "• Debate linguistic preservation: 1. Cultural heritage & identity richness 2. Educational costs & dominance of global languages 3. Balanced bilingualism.\n• Use rich, academic vocabulary and complex syntax.\n• Defend your viewpoint concisely and persuasively."
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
