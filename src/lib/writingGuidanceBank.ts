export interface WritingGuidanceEntry {
  paperNum: number;
  taskNum: number;
  trapAlert: string;
  trapAlertEn: string;
  writingCoach: string;
  writingCoachEn: string;
  modelBreakdown: string;
  modelBreakdownEn: string;
}

export const WRITING_GUIDANCE_BANK: Record<string, WritingGuidanceEntry> = {
  // =========================================================================
  // 📄 PAPER 1
  // =========================================================================
  "1-1": {
    paperNum: 1,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DU REGISTRE ET DE LA SALUTATION :\n• N'utilisez JAMAIS le tutoiement (« tu/ton/ta ») face à un propriétaire ou une administration — cela plafonne la note à 3/5.\n• N'oubliez pas la formule de politesse finale formelle (« Je vous prie d'agréer mes salutations distinguées »).\n• Les phrases recopiées textuellement de la consigne sont décomptées et n'apportent aucun point.",
    trapAlertEn: "⚠️ REGISTER & SALUTATION TRAP:\n• NEVER use informal 'tu' with a landlord or administrative official — it automatically caps your Task Fulfillment score at 3/5.\n• Never omit the formal closing salutation ('Je vous prie d'agréer mes salutations distinguées').\n• Sentences copied verbatim from the prompt instructions are excluded from your word count and earn zero credit.",
    writingCoach: "✍️ STRATÉGIE NCLC 7+ (B2) EN 3 ÉTAPES :\n1. Salutation & Motif : « Monsieur le Propriétaire, Je vous écris en urgence afin de vous signaler... »\n2. Conséquence & Demande polie : « Depuis hier soir, la température a chuté... En conséquence, je vous saurais gré d'intervenir... » (Utiliser le conditionnel de politesse).\n3. Disponibilité & Clôture : Indiquez votre joignabilité téléphonique et terminez par une formule formelle complète.",
    writingCoachEn: "✍️ NCLC 7+ (B2) 3-STEP STRATEGY & FRENCH PHRASING:\n1. Formal Salutation & Urgent Purpose: State the heating failure clearly: 'I am writing to you urgently to report a major problem...' (French: « Je vous écris en urgence afin de vous signaler... »)\n2. Cause & Polite Conditional Demand: Describe the freezing temperature and request an emergency repair technician: 'Consequently, I would be grateful if you could intervene as soon as possible...' (French: « En conséquence, je vous saurais gré d'intervenir dans les plus brefs délais... »)\n3. Availability & Formal Closing: State your phone availability and sign off formally: 'Thanking you warmly for your responsiveness and understanding, please accept my distinguished regards.' (French: « En vous remerciant pour votre réactivité, je vous prie d'agréer mes salutations distinguées. »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• Adéquation : 105 mots (cible 60–120). Registre formel impeccable avec « vous ».\n• Cohérence : Connecteurs logiques variés (« afin de », « en conséquence », « pour »).\n• Lexique & Morphosyntaxe : Vocabulaire précis (« défaillance », « température négative », « technicien qualifié ») et subjonctif après « afin de ».",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• Task Fulfillment: 105 words (target 60–120). Flawless formal register with 'vous'.\n• Coherence: Varied logical transitions ('afin de', 'en conséquence', 'pour').\n• Lexicon & Morphosyntax: Precise terminology ('défaillance', 'température négative', 'technicien qualifié') and accurate subjunctive mood."
  },
  "1-2": {
    paperNum: 1,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DE LA MONOTONIE NARRATIVE ET DES TEMPS DU PASSÉ :\n• Ne faites pas une simple liste d'actions au présent de l'indicatif.\n• Vous DEVEZ alterner le Passé Composé (actions ponctuelles) et l'Imparfait (descriptions et états d'esprit).\n• L'oubli de vos impressions personnelles et émotions empêche d'atteindre le niveau B2.",
    trapAlertEn: "⚠️ NARRATIVE FLATNESS & PAST TENSE TRAP:\n• Do NOT write a basic chronological list in the present tense.\n• You MUST alternate between Passé Composé (specific events) and Imparfait (background descriptions and emotions).\n• Omitting personal impressions and feelings will prevent you from reaching the B2 benchmark.",
    writingCoach: "✍️ STRATÉGIE NCLC 7+ (B2) EN 3 PARAGRAPHES :\n1. Cadre spatio-temporel : « Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable... »\n2. Péripéties & Sensations : Utilisez des adjectifs valorisants (« féerique », « spectaculaire », « chaleureuse »).\n3. Bilan & Recommandation : « En définitive, cette immersion m'a permis de... Je recommande chaleureusement cette destination ! »",
    writingCoachEn: "✍️ NCLC 7+ (B2) 3-PARAGRAPH STRATEGY & FRENCH PHRASING:\n1. Setting & Context: Introduce the winter carnival setting: 'During my recent stay in Quebec, I experienced a memorable adventure...' (French: « Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable... »)\n2. Activities & Sensory Impressions: Describe the ice sculptures and canoe race with vivid adjectives: 'I had the chance to admire impressive ice sculptures...' (French: « J'ai eu la chance d'admirer d'impressionnantes sculptures sur glace... »)\n3. Reflection & Recommendation: Conclude with personal warmth: 'Ultimately, this cultural immersion allowed me to connect with welcoming locals... I warmly recommend this magical destination!' (French: « Je garde un souvenir impérissable et je recommande chaleureusement cette destination féerique ! »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• Volume : 126 mots (cible 120–150). Maîtrise parfaite de la narration au passé.\n• Lexique : Adjectifs riches et évocateurs (« cité historique », « sculptures sur glace », « souvenir impérissable »).\n• Connecteurs temporels : « Dès mon arrivée », « Pendant mon séjour », « En outre ».",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• Word Count: 126 words (target 120–150). Masterful handling of past tenses.\n• Lexicon: Evocative adjectives ('cité historique', 'sculptures sur glace', 'souvenir impérissable').\n• Temporal Markers: 'Dès mon arrivée', 'Pendant mon séjour', 'En outre'."
  },
  "1-3": {
    paperNum: 1,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU FORMAT LETTRE (NOTE ÉLIMINATOIRE 0/20) :\n• Ne commencez JAMAIS par « Bonjour » ou « Je vous écris » — Tâche 3 est un article ou essai d'opinion pour un forum/journal, JAMAIS une lettre !\n• Ne présentez pas une opinion unilatérale sans examiner les deux points de vue (Document A vs Document B).",
    trapAlertEn: "⚠️ THE EMAIL FORMAT TRAP (FATAL 0/20 ELIMINATORY SCORE):\n• NEVER start with 'Bonjour' or 'Je vous écris' — Task 3 is an argumentative article for a public forum/magazine, NEVER a personal letter!\n• Do not present a one-sided bias without first comparing and contrasting both opposing viewpoints (Document A vs Document B).",
    writingCoach: "✍️ STRUCTURE DIALECTIQUE EN 4 PARAGRAPHES (NCLC 8–10) :\n1. Introduction (15–20 mots) : Poser la problématique sociétale sans formule d'appel.\n2. Thèse / Arguments favorables (40–50 mots) : « D'un côté, les partisans soulignent... De surcroît... »\n3. Antithèse / Contre-arguments (40–50 mots) : « D'un autre côté, certains économistes rappellent... »\n4. Synthèse & Prise de position personnelle (30–40 mots) : « En conclusion, bien que... il me semble préférable de... » (utiliser le subjonctif).",
    writingCoachEn: "✍️ 4-PARAGRAPH DIALECTIC STRUCTURE & FRENCH CONNECTORS:\n1. Introduction (15–20 words): Introduce the societal debate without any greeting: 'Universal free public transport is currently the subject of passionate debate...' (French: « La gratuité totale des transports fait aujourd'hui l'objet d'un débat passionné... »)\n2. Supporting Thesis (40–50 words): Detail environmental and social benefits: 'On one hand, proponents rightly argue that it accelerates the ecological transition...' (French: « D'un côté, les partisans soutiennent avec raison que... De surcroît... »)\n3. Counter-Arguments (40–50 words): Detail municipal financial costs: 'On the other hand, certain economists emphasize the colossal financial cost...' (French: « D'un autre côté, certains économistes soulignent le coût financier... »)\n4. Synthesis & Conclusion (30–40 words): Propose balanced income-adjusted pricing: 'In conclusion, although free transit is appealing, it seems preferable to...' (French: « En conclusion, bien que la gratuité soit séduisante, il me semble préférable de... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• Structure : Plan dialectique équilibré de 149 mots (cible 120–180).\n• Connecteurs avancés B2/C1 : « D'un côté », « De surcroît », « D'un autre côté », « En conclusion », « bien que + subjonctif ».\n• Nuance : Proposition d'une tarification sociale équilibrée.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• Structure: Balanced dialectic essay of 149 words (target 120–180).\n• Advanced B2/C1 Connectors: 'D'un côté', 'De surcroît', 'D'un autre côté', 'En conclusion', 'bien que + subjunctive'.\n• Nuance: Recommends means-tested progressive pricing rather than binary extremes."
  },

  // =========================================================================
  // 📄 PAPER 2
  // =========================================================================
  "2-1": {
    paperNum: 2,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DE LA DEMANDE INCOMPLÈTE :\n• Ne vous contentez pas de dire « je veux venir » : vous devez formuler au moins 2 questions précises (tarifs, horaires, équipement).\n• Évitez les abréviations de type SMS (svp, rdv).",
    trapAlertEn: "⚠️ INCOMPLETE INQUIRY TRAP:\n• Do not merely say 'I want to come': you must formulate at least 2 distinct concrete inquiries (tariffs, schedules, required equipment).\n• Avoid text message slang or abbreviations (svp, rdv).",
    writingCoach: "✍️ FORMULES DE POLITESSE FORMELLES :\n• « Je vous écris afin d'obtenir des renseignements complémentaires... »\n• « Pourriez-vous m'indiquer la grille tarifaire ainsi que... »\n• « De plus, j'aimerais savoir si... »\n• « En vous remerciant par avance pour votre attention... »",
    writingCoachEn: "✍️ FORMAL INQUIRY FORMULAS & STRATEGY:\n• Opening Purpose: State your enthusiasm for the workshop: 'I am writing to obtain additional information regarding the Quebec cooking workshop...' (French: « Je vous écris afin d'obtenir des renseignements complémentaires... »)\n• Polite Conditional Inquiry: Inquire about fees and technical requirements: 'Could you please indicate the pricing schedule as well as any prerequisites?' (French: « Pourriez-vous m'indiquer la grille tarifaire ainsi que... »)\n• Secondary Question: Inquire about provided cooking gear: 'Furthermore, I would like to know if culinary equipment is provided on site...' (French: « De plus, j'aimerais savoir si le matériel est fourni... »)\n• Formal Sign-Off: 'Thanking you in advance for your attention, please accept my distinguished regards.' (French: « En vous remerciant par avance, je vous prie d'agréer mes salutations distinguées. »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• Respect des 87 mots (cible 60–120).\n• Intégration parfaite du conditionnel de politesse (« Pourriez-vous », « j'aimerais savoir »).",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• Respects the 87-word count (target 60–120).\n• Seamless integration of polite conditional mood ('Pourriez-vous', 'j'aimerais savoir')."
  },
  "2-2": {
    paperNum: 2,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DE L'INSERTION DE MOTS ANGLAIS :\n• L'emploi d'anglicismes non admis (« super cool », « show », « vibe ») plafonne la note de vocabulaire à 1/5.\n• Utilisez des termes francophones élégants : « atmosphère vibrante », « concert mémorable », « convivialité ».",
    trapAlertEn: "⚠️ ENGLISH WORDS INSERTION TRAP:\n• Using unauthorized English words ('super cool', 'show', 'vibe') caps your Vocabulary score at 1/5.\n• Use refined French alternatives: 'atmosphère vibrante', 'concert mémorable', 'convivialité'.",
    writingCoach: "✍️ VOCABULAIRE DES SENSATIONS ÉVÉNEMENTIELLES :\n• « Dès mon arrivée sur les lieux... »\n• « J'ai été immédiatement émerveillé par... »\n• « Les artistes pétris de talent... »\n• « Une expérience d'une richesse exceptionnelle... »",
    writingCoachEn: "✍️ SENSORY & EMOTIONAL NARRATIVE STRATEGY:\n• Scene Setting: Open with your arrival at the festival plaza: 'Upon my arrival at the festival square, I was immediately amazed by the vibrant atmosphere...' (French: « Dès mon arrivée, j'ai été immédiatement émerveillé par l'atmosphère festive... »)\n• Live Performance Highlights: Describe the open-air concerts: 'For three consecutive days, I attended memorable concerts and discovered local talent...' (French: « Pendant trois jours consécutifs, j'ai pu assister à des concerts en plein air... »)\n• Emotional Wrap-Up: Recommend the event enthusiastically: 'I highly recommend this cultural event to anyone wishing to immerse themselves in Montreal's musical soul!' (French: « Je recommande vivement cet événement culturel... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 124 mots parfaitement calibrés pour le blog de voyage (120–150).\n• Style enthousiaste et dynamique avec une recommandation chaleureuse.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 124 words perfectly calibrated for a travel blog (120–150).\n• Enthusiastic and dynamic tone with a warm closing recommendation."
  },
  "2-3": {
    paperNum: 2,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DE L'ARGUMENTATION SIMPLISTE :\n• Évitez de répéter « c'est bien » ou « c'est mauvais ».\n• Utilisez des termes abstraits : « plasticité cérébrale », « surcharge cognitive », « assimilation intuitive ».",
    trapAlertEn: "⚠️ SIMPLISTIC ARGUMENTATION TRAP:\n• Avoid repetitive basic phrases like 'c'est bien' or 'c'est mauvais'.\n• Use sophisticated abstract concepts: 'plasticité cérébrale' (brain plasticity), 'surcharge cognitive' (cognitive overload), 'assimilation intuitive' (intuitive learning).",
    writingCoach: "✍️ ARTICULATION DES CONNECTEURS LOGIQUES :\n• Thèse : « D'une part, les défenseurs soulignent à juste titre... De surcroît... »\n• Antithèse : « D'autre part, les détracteurs mettent en garde contre... »\n• Conclusion : « En somme, bien que ces réserves soient légitimes, je demeure convaincu que... »",
    writingCoachEn: "✍️ LOGICAL CONNECTOR PROGRESSION & STRATEGY:\n• Pro-Early Language Stance: Emphasize childhood neural plasticity: 'On one hand, advocates rightly emphasize the exceptional brain plasticity of young children...' (French: « D'une part, les défenseurs soulignent à juste titre la plasticité cérébrale... De surcroît... »)\n• Skeptics Stance: Warn against cognitive overload of core subjects: 'On the other hand, critics warn against the risk of curriculum overload...' (French: « D'autre part, les détracteurs mettent en garde contre le risque de surcharge... »)\n• Balanced Conclusion: 'In sum, although these reservations are legitimate, I remain convinced that early language learning is essential provided playful pedagogy is used.' (French: « En somme, bien que ces réserves soient légitimes, je demeure convaincu que... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 141 mots conformes à l'exigence B2/C1.\n• Utilisation exemplaire du subjonctif et des structures concessives (« bien que »).",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 141 words strictly complying with B2/C1 requirements.\n• Exemplary use of the subjunctive mood and concessive clauses ('bien que')."
  },

  // =========================================================================
  // 📄 PAPER 3
  // =========================================================================
  "3-1": {
    paperNum: 3,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DU MANQUE DE PRÉCISION :\n• Précisez toujours la période visée (saison à venir) et vos disponibilités.\n• Conservez un vouvoiement strict et une structure aérée.",
    trapAlertEn: "⚠️ LACK OF SPECIFICITY TRAP:\n• Always state the target timeframe (upcoming season) and your availability.\n• Maintain strict 'vous' address and clean paragraph spacing.",
    writingCoach: "✍️ ÉTAPES CLÉS DE LA DEMANDE FORMELLE :\n1. Objet & Salutation : « Madame, Monsieur, Je vous adresse ce courriel afin de... »\n2. Questions ciblées : formules d'abonnement, horaires, séance d'essai gratuite.\n3. Formule de politesse : « Dans l'attente de votre retour, je vous prie de... »",
    writingCoachEn: "✍️ KEY STEPS FOR FORMAL INQUIRY & PHRASING:\n1. Purpose & Subject: State your intention to join: 'I am addressing this email to obtain precise information regarding registration at your Montreal sports complex...' (French: « Je vous adresse ce courriel afin d'obtenir des informations précises... »)\n2. Specific Inquiries: Ask for membership tiers and trial sessions: 'Could you please indicate the range of subscription plans and opening hours? Furthermore, is a free trial session possible?' (French: « Pourriez-vous m'indiquer la diversité des formules... Par ailleurs, une séance d'essai est-elle envisageable ? »)\n3. Respectful Sign-Off: 'Thanking you for your clarifications, please accept my respectful greetings.' (French: « En vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses. »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 77 mots concis et efficaces (cible 60–120).\n• Clarté administrative et politesse sans lourdeur.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 77 concise and effective words (target 60–120).\n• Administrative clarity and natural politeness."
  },
  "3-2": {
    paperNum: 3,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DU TON IMPERSONNEL :\n• Tâche 2 exige vos impressions VÉCUES : partagez ce que vous avez ressenti lors de cette mission caritative.\n• Utilisez des connecteurs de sentiment : « s'est révélée profondément enrichissante », « gratitude sincère ».",
    trapAlertEn: "⚠️ IMPERSONAL TONE TRAP:\n• Task 2 requires personal lived experience: share genuine emotions from your volunteer work.\n• Use emotional connectors: 's'est révélée profondément enrichissante' (proved deeply enriching), 'gratitude sincère' (heartfelt gratitude).",
    writingCoach: "✍️ LEXIQUE DE LA SOLIDARITÉ SOCIALE :\n• « Consacrer mes fins de semaine au bénévolat... »\n• « Au sein d'une équipe bienveillante... »\n• « Moment de partage inestimable... »\n• « Renforcer mon empathie citoyenne... »",
    writingCoachEn: "✍️ SOLIDARITY VOCABULARY & NARRATIVE PROGRESSION:\n• Commitment Opening: 'Last fall, I decided to dedicate my weekends to volunteering at the Moisson Montréal food bank...' (French: « L'automne dernier, j'ai décidé de consacrer mes fins de semaine au bénévolat... »)\n• Action & Interactions: Describe sorting groceries and greeting recipients: 'Within a caring team, my main task was sorting collected groceries... The warm smiles turned every day into an invaluable moment of sharing.' (French: « Au sein d'une équipe bienveillante... les sourires chaleureux ont transformé chaque journée... »)\n• Civic Impact: 'Ultimately, this community journey strengthened my empathy... I urge everyone to try civic volunteering!' (French: « En définitive, cette aventure a renforcé mon empathie... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 118 mots touchants et équilibrés (cible 120–150).\n• Parfaite alternance imparfait de description et passé composé d'action.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 118 touching, well-paced words (target 120–150).\n• Flawless alternation between descriptive imperfect and active compound past."
  },
  "3-3": {
    paperNum: 3,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU MANQUE DE NUANCE (TOUT BLANC OU TOUT NOIR) :\n• Ne prenez pas parti dès la première ligne sans avoir analysé les inconvénients (isolement, culture d'entreprise).\n• Les examinateurs FEI recherchent la pondération et la synthèse.",
    trapAlertEn: "⚠️ BLACK-OR-WHITE BIAS TRAP:\n• Do not jump to a rigid conclusion on line 1 without examining drawbacks (social isolation, corporate culture).\n• FEI examiners look for balanced critical thinking and nuance.",
    writingCoach: "✍️ STRATÉGIE DE L'ESSAI SUR LE TRAVAIL MODERNE :\n1. Introduction : « La généralisation du télétravail représente une mutation majeure... »\n2. Pros : flexibilité, réduction des transports, concentration.\n3. Cons : frontière vie privée/pro floue, affaiblissement de la cohésion.\n4. Solution : modèle hybride comme équilibre pérenne.",
    writingCoachEn: "✍️ MODERN WORKPLACE ESSAY STRATEGY & CONNECTORS:\n1. Context Hook: 'The widespread adoption of remote work represents one of the defining professional shifts of our time...' (French: « La généralisation du télétravail représente l'une des mutations les plus marquantes... »)\n2. Pro-Remote Arguments: Highlight work-life harmony and zero commute stress: 'For its proponents, remote work offers flexibility that fosters a better work-life balance...' (French: « Pour ses partisans, le travail à distance offre une flexibilité appréciable... »)\n3. Counter-Arguments: Highlight social disconnection and blurred boundaries: 'Nevertheless, several observers warn of potential isolation and weakening team cohesion...' (French: « Néanmoins, plusieurs observateurs alertent sur les dérives de l'isolement social... »)\n4. Balanced Policy Synthesis: Advocate for a hybrid model: 'In conclusion, a hybrid model combining remote work and office presence represents the most balanced solution.' (French: « En conclusion, un modèle hybride constitue la solution la plus équilibrée... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 129 mots structurés avec rigueur (cible 120–180).\n• Conclusion équilibrée prônant le travail hybride.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 129 rigorously structured words (target 120–180).\n• Balanced synthesis advocating for a hybrid workplace model."
  },

  // =========================================================================
  // 📄 PAPER 4
  // =========================================================================
  "4-1": {
    paperNum: 4,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DU JARGON INADAPTÉ :\n• Restez sobre et courtois : expliquez vos motivations professionnelles sans prétention excessive.\n• Vérifiez l'accord du participe passé dans les formules passives.",
    trapAlertEn: "⚠️ AWKWARD JARGON TRAP:\n• Keep it professional and polite: explain your career motivations clearly without excessive embellishment.\n• Double check past participle agreements in passive constructions.",
    writingCoach: "✍️ FORMULATION DU PROJET PROFESSIONNEL :\n• « Titulaire d'un diplôme en..., je souhaite vivement perfectionner... »\n• « Pourriez-vous me transmettre la brochure détaillée ainsi que... »\n• « De surcroît, j'aimerais savoir si ce programme donne droit à... »",
    writingCoachEn: "✍️ PROFESSIONAL ASPIRATION FORMULATIONS & TRANSLATIONS:\n• Professional Background: State your degree: 'Holding a degree in commercial management, I am keen to enhance my business French skills...' (French: « Titulaire d'un diplôme en gestion, je souhaite vivement perfectionner... »)\n• Course Inquiries: 'Could you please send me the detailed brochure as well as assessment dates?' (French: « Pourriez-vous me transmettre la brochure détaillée ainsi que les dates... »)\n• Accreditation Question: 'Furthermore, I would like to know if this program grants an official certification...' (French: « De surcroît, j'aimerais savoir si ce programme donne droit à une certification... »)\n• Polite Closing: 'Thanking you in advance for your support, please accept my distinguished regards.' (French: « En vous remerciant pour votre accompagnement, je vous prie d'agréer mes salutations... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 82 mots précis et professionnels (cible 60–120).\n• Utilisation naturelle du connecteur de haut niveau « De surcroît ».",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 82 precise and professional words (target 60–120).\n• Natural usage of high-register transition 'De surcroît'."
  },
  "4-2": {
    paperNum: 4,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DE LA DESCRIPTION GÉOGRAPHIQUE FROIDE :\n• Ne récitez pas une fiche Wikipédia du parc.\n• Décrivez vos sensations physiques : le bruit des rames sur l'eau, le grand air revigorant, le sentiment de plénitude.",
    trapAlertEn: "⚠️ COLD GEOGRAPHIC FACT TRAP:\n• Do not regurgitate a travel encyclopedia entry.\n• Describe physical sensations: the sound of paddles in the water, invigorating fresh air, a feeling of pure tranquility.",
    writingCoach: "✍️ LEXIQUE DES GRANDS ESPACES CANADIENS :\n• « Les paysages flamboyants offraient un spectacle grandiose... »\n• « La quiétude des lieux et la pureté de l'air ambiant... »\n• « Sentiment de plénitude exceptionnel... »\n• « Immersion grandeur nature... »",
    writingCoachEn: "✍️ CANADIAN WILDERNESS VOCABULARY & DESCRIPTIVE STEPS:\n• Autumn Landscape Hook: 'Last month, I had the pleasure of roaming the trails of Mauricie National Park in peak Quebec autumn...' (French: « Le mois dernier, j'ai eu le bonheur de parcourir les sentiers sauvages... »)\n• Sensory Immersion: Describe canoeing and fresh air: 'The blazing maple colors reflected on calm lakes... The tranquility of the park brought an exceptional sense of fulfillment.' (French: « Les paysages flamboyants offraient un spectacle grandiose... La quiétude des lieux m'a procuré une plénitude... »)\n• Closing Tip: 'I warmly recommend this life-sized nature immersion to all outdoor lovers!' (French: « Je conseille vivement cette immersion grandeur nature... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 117 mots immersifs et poétiques (cible 120–150).\n• Excellente variété stylistique sans répétitions lexicales.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 117 evocative, immersive words (target 120–150).\n• Superb stylistic variety without vocabulary repetition."
  },
  "4-3": {
    paperNum: 4,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU DISCOURS ÉMOTIONNEL NON ÉTAYÉ :\n• N'écrivez pas juste « la planète va mourir ».\n• Développez des arguments économiques et environnementaux concrets (contamination marine, coûts d'adaptation pour les PME, économie circulaire).",
    trapAlertEn: "⚠️ UNSUBSTANTIATED EMOTIONAL PLEA TRAP:\n• Do not write generic emotional slogans like 'the planet is dying'.\n• Develop structured environmental and economic arguments (marine ecosystems, SME adaptation costs, circular economy).",
    writingCoach: "✍️ PROGRESSION ARGUMENTATIVE ÉCOLOGIQUE :\n• Constat : « La prolifération des déchets plastiques constitue un défi urgent... »\n• Écologie : préservation des écosystèmes, développement d'alternatives durables.\n• Économie : impact financier pour les petits commerces.\n• Synthèse : interdiction progressive avec incitations fiscales.",
    writingCoachEn: "✍️ ENVIRONMENTAL ESSAY PROGRESSION & CONNECTORS:\n• Problem Hook: 'The proliferation of single-use plastic waste represents an urgent planetary ecological challenge...' (French: « La prolifération des déchets plastiques constitue un défi écologique planétaire urgent... »)\n• Environmental Case: 'On one hand, environmentalists rightly demand a total ban to protect oceans and foster circular innovation...' (French: « D'un côté, les écologistes réclament l'interdiction totale pour préserver les écosystèmes marins... »)\n• Business Impact Nuance: 'On the other hand, industry representatives note that rapid transitions impose high costs on small businesses...' (French: « D'un autre côté, certains industriels font valoir des coûts considérables pour les PME... »)\n• Phased Synthesis: 'A progressive ban combined with green subsidies represents the most sustainable path.' (French: « Une interdiction progressive accompagnée d'incitations financières représente la voie la plus prometteuse... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 127 mots structurés de façon exemplaire (cible 120–180).\n• Richesse syntaxique et conclusions pragmatiques.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 127 exemplarily structured words (target 120–180).\n• Syntactic richness and pragmatic policy synthesis."
  },

  // =========================================================================
  // 📄 PAPER 5
  // =========================================================================
  "5-1": {
    paperNum: 5,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DE L'AGRESSIVITÉ OU DU LANGAGE FAMILIER :\n• Ne menacez pas et n'utilisez pas de jurons (« vous êtes des voleurs »).\n• Restez dans le registre juridique et formel (« réclamation », « défectueux », « préjudice », « exiger le remboursement »).",
    trapAlertEn: "⚠️ AGGRESSIVE OR INFORMAL LANGUAGE TRAP:\n• Do not use threats or slang ('you guys are thieves').\n• Maintain a firm, legal, and formal administrative tone ('réclamation', 'défectueux', 'exiger le remboursement').",
    writingCoach: "✍️ FORMULATION DE LA RÉCLAMATION FERME :\n• « Je me permets de vous contacter au sujet de ma commande N°... »\n• « Non seulement la livraison a accusé un retard inacceptable, mais... »\n• « Par conséquent, j'exige le remplacement immédiat sans frais ou... »\n• « Dans l'attente d'une résolution rapide de ce litige... »",
    writingCoachEn: "✍️ FIRM COMPLAINT FORMULATIONS & STRATEGY:\n• Order Reference: Cite your tracking number: 'I am contacting you regarding my order N°CA-89211 placed on November 5th...' (French: « Je me permets de vous contacter au sujet de ma commande... »)\n• Correlative Complaint: State the delay and damage: 'Not only did the delivery suffer an unacceptable two-week delay, but the computer arrived damaged...' (French: « Non seulement la livraison a accusé un retard inacceptable, mais le matériel est arrivé endommagé... »)\n• Firm Remedy Demand: 'Consequently, I demand an immediate free replacement or a full refund within 48 hours.' (French: « Par conséquent, j'exige le remplacement immédiat ou le remboursement intégral... »)\n• Administrative Sign-Off: 'Awaiting a prompt resolution to this dispute, please accept my regards.' (French: « Dans l'attente d'une résolution rapide de ce litige, je vous prie d'agréer... »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 91 mots d'une rigueur juridique remarquable (cible 60–120).\n• Structure corrélative « Non seulement... mais... » valorisée au niveau C1.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 91 words of exemplary administrative firmness (target 60–120).\n• Advanced correlative structure 'Non seulement... mais...' scoring C1 credit."
  },
  "5-2": {
    paperNum: 5,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DU COMPTE-RENDU TROP COURT :\n• Assurez-vous d'atteindre au moins 120 mots en décrivant à la fois l'emménagement, l'accueil des voisins et votre sentiment général.",
    trapAlertEn: "⚠️ UNDER-LENGTH NARRATIVE TRAP:\n• Make sure you reach at least 120 words by describing the move, neighborly welcome, and your overall outlook.",
    writingCoach: "✍️ CHRONOLOGIE DE L'INSTALLATION :\n• « Il y a tout juste trois mois, j'ai posé mes valises à... »\n• « Dès les premiers jours, j'ai été séduit par l'harmonie entre... »\n• « L'installation s'est déroulée avec fluidité grâce à... »\n• « Je me sens désormais pleinement intégré et épanoui... »",
    writingCoachEn: "✍️ RELOCATION TIMELINE PHRASES & DESCRIPTIVE STEPS:\n• Timeline Hook: 'Just three months ago, I moved to the charming city of Sherbrooke in Quebec...' (French: « Il y a tout juste trois mois, j'ai posé mes valises dans la charmante ville de Sherbrooke... »)\n• Neighborhood Welcoming: 'From the very first days, I was captivated by the harmony of nature and student life... Neighbors guided me with great warmth.' (French: « Dès les premiers jours, j'ai été séduit par l'harmonie... mes voisins m'ont spontanément guidé. »)\n• Integration Sentiment: 'I now feel fully integrated and fulfilled in this vibrant community!' (French: « Je me sens désormais pleinement intégré et épanoui dans cette communauté ! »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 119 mots équilibrés et vivants (cible 120–150).\n• Expression authentique du sentiment d'intégration au Canada.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 119 balanced and vibrant words (target 120–150).\n• Authentic narrative reflecting Canadian community integration."
  },
  "5-3": {
    paperNum: 5,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU MANQUE DE RECUL TECHNOLOGIQUE :\n• Ne vous limitez pas à vanter la rapidité de ChatGPT.\n• Discutez des enjeux éthiques fondamentaux : pensée critique, dépendance cognitive, intégrité académique.",
    trapAlertEn: "⚠️ SUPERFICIAL TECH DISCUSSION TRAP:\n• Do not simply praise the speed of AI chatbots.\n• Address deeper academic challenges: critical thinking, cognitive dependence, academic integrity.",
    writingCoach: "✍️ VOCABULAIRE ÉDUCATIF DE HAUT NIVEAU :\n• « L'émergence spectaculaire des outils d'IA bouleverse... »\n• « Tuteur personnalisé vs affaiblissement de la pensée critique... »\n• « Dépendance cognitive et risques de plagiat... »\n• « Charte éthique et usage réfléchi... »",
    writingCoachEn: "✍️ ADVANCED ACADEMIC VOCABULARY & ESSAY STRUCTURE:\n• Context Opening: 'The spectacular emergence of generative artificial intelligence is radically transforming higher education...' (French: « L'émergence spectaculaire des outils d'IA bouleverse les méthodes pédagogiques... »)\n• Pedagogical Benefits: 'On one hand, supporters note that AI acts as a personalized tutor preparing students for digital careers...' (French: « D'un côté, les partisans soutiennent que l'IA permet d'individualiser l'apprentissage... »)\n• Cognitive Risks: 'On the other hand, faculty fear plagiarism and cognitive atrophy that may weaken critical thinking...' (French: « D'un autre côté, de nombreux enseignants s'inquiètent des risques de plagiat et de dépendance cognitive... »)\n• Ethical Framework Conclusion: 'Banning AI is futile; we must instead establish clear ethical guidelines for critical usage.' (French: « Il convient plutôt d'élaborer une charte éthique et d'enseigner un usage critique et réfléchi. »)",
    modelBreakdown: "🔍 ANALYSE DE LA RÉPONSE MODÈLE :\n• 125 mots d'un haut niveau d'abstraction (cible 120–180).\n• Rejet de l'interdiction stérile au profit d'un encadrement éthique.",
    modelBreakdownEn: "🔍 MODEL ANSWER BREAKDOWN:\n• 125 words exhibiting high abstract reasoning (target 120–180).\n• Rejects blanket bans in favor of enlightened ethical oversight."
  },

  // =========================================================================
  // 📄 PAPERS 6 TO 10
  // =========================================================================
  "6-1": {
    paperNum: 6,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DU MANQUE D'ÉLÉMENTS CLÉS :\n• Mentionnez le loyer exact, le quartier et les critères de sélection (calme, non-fumeur).",
    trapAlertEn: "⚠️ MISSING KEY DETAILS TRAP:\n• State the exact rent, neighborhood, and tenant requirements (quiet, non-smoker).",
    writingCoach: "✍️ ANNONCE DE COLOCATION EFFICACE :\n• Accroche accueillante (« Bonjour à tous, Je propose... »)\n• Caractéristiques du 4 1/2 meublé et localisation.\n• Modalités financières (charges incluses) et contact.",
    writingCoachEn: "✍️ EFFECTIVE ROOMMATE LISTING STRATEGY:\n• Opening Hook: 'Hello everyone, I am offering a spacious bedroom in a 4 1/2 apartment in Saint-Roch, Quebec...' (French: « Bonjour à tous, Je propose une chambre spacieuse dans le quartier Saint-Roch... »)\n• Terms & Amenities: 'Rent is $650/month including utilities and high-speed internet. Looking for a quiet, non-smoking roommate.' (French: « Le loyer est de 650 $ tout inclus... Je recherche une personne calme et non-fumeuse. »)\n• Call to Action: 'Feel free to send a private message to schedule a visit!' (French: « N'hésitez pas à me contacter en privé pour planifier une visite ! »)",
    modelBreakdown: "🔍 89 mots structurés et engageants (cible 60–120).",
    modelBreakdownEn: "🔍 89 well-structured, engaging words (target 60–120)."
  },
  "6-2": {
    paperNum: 6,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DE L'OUBLI DE L'IMPACT ÉCOLOGIQUE :\n• Donnez un résultat concret à cette corvée citoyenne (kilos de déchets ramassés, arbres plantés).",
    trapAlertEn: "⚠️ MISSING TANGIBLE RESULTS TRAP:\n• Include concrete achievements (kilos of trash collected, trees planted).",
    writingCoach: "✍️ LEXIQUE DU CIVISME ENVIRONNEMENTAL :\n• « Corvée citoyenne », « ambiance festive et intergénérationnelle », « solidarité locale ».",
    writingCoachEn: "✍️ CIVIC CLEANUP VOCABULARY & STEPS:\n• Mobilization Hook: 'Last Saturday, over a hundred neighbors enthusiastically joined the Lafontaine Park cleanup...' (French: « Samedi dernier, plus d'une centaine d'habitants se sont mobilisés avec ardeur... »)\n• Concrete Results: 'Teams gathered 300 kg of plastic waste and planted native saplings along the riverbank.' (French: « Les équipes ont collecté plus de 300 kilos de déchets et planté des arbustes indigènes. »)\n• Community Spirit: 'This inspiring civic day strengthened neighborhood ties.' (French: « Ce moment de civisme a renforcé la solidarité locale. »)",
    modelBreakdown: "🔍 120 mots dynamiques et citoyens (cible 120–150).",
    modelBreakdownEn: "🔍 120 dynamic, inspiring words (target 120–150)."
  },
  "6-3": {
    paperNum: 6,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU DOGMATISME :\n• Ne qualifiez pas les opposants d'égoïstes : leurs arguments sur la liberté individuelle sont légitimes.",
    trapAlertEn: "⚠️ DOGMATIC BIAS TRAP:\n• Do not dismiss opponents as selfish: arguments regarding individual freedom and delayed studies are legally valid.",
    writingCoach: "✍️ NCLC 8+ ESSAI CIVIQUE :\n• Cohésion nationale vs liberté individuelle.\n• Valoriser le volontariat incitatif plutôt que la contrainte légale.",
    writingCoachEn: "✍️ NCLC 8+ CIVIC ESSAY STRATEGY:\n• Pro-Civic Service: 'Mandatory civic service would foster national unity and bridge social divides across diverse backgrounds...' (French: « Le service civique obligatoire renforcerait la cohésion nationale et la mixité sociale... »)\n• Freedom & Career Concerns: 'However, critics argue that state compulsion infringes on individual freedom and delays university studies...' (French: « D'un autre côté, ses détracteurs dénoncent une atteinte à la liberté individuelle... »)\n• Synthesis: 'Promoting attractive, rewarded volunteerism is far wiser than legal coercion.' (French: « Il me semble plus pertinent de promouvoir un volontariat attractif plutôt qu'une obligation stricte. »)",
    modelBreakdown: "🔍 126 mots d'un équilibre sociologique parfait (cible 120–180).",
    modelBreakdownEn: "🔍 126 words of exemplary sociological balance (target 120–180)."
  },
  "7-1": {
    paperNum: 7,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DU VAGUE BUDGÉTAIRE :\n• Indiquez toujours un montant ou une demande matérielle claire auprès de la mairie.",
    trapAlertEn: "⚠️ VAGUE FINANCIAL REQUEST TRAP:\n• Always state a specific funding amount ($1,500) or concrete logistical request.",
    writingCoach: "✍️ DEMANDE FORMELLE AUX ÉLUS :\n• Salutation solennelle, présentation de l'association, justification d'utilité publique.",
    writingCoachEn: "✍️ FORMAL MUNICIPAL GRANT PETITION STRATEGY:\n• Association Delegation: 'On behalf of the Plateau Residents Association, I am petitioning for municipal funding for our intercultural street festival...' (French: « Au nom de l'Association des Riverains, je me permets de solliciter un soutien financier... »)\n• Clear Justification: 'A municipal grant of $1,500 would cover community security and lighting expenses...' (French: « Une contribution de 1 500 $ permettrait de couvrir les frais de sécurité... »)\n• Formal Closing: 'Standing ready to present our full proposal, please accept my distinguished regards.' (French: « Restant à votre disposition pour vous présenter notre dossier, je vous prie d'agréer... »)",
    modelBreakdown: "🔍 97 mots rédigés avec solennité et précision (cible 60–120).",
    modelBreakdownEn: "🔍 97 words of respectful administrative eloquence (target 60–120)."
  },
  "7-2": {
    paperNum: 7,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DU CLICHÉ TOURISTIQUE SUPERFICIEL :\n• Décrivez l'expérience sensorielle de la tire sur la neige et la chaleur humaine du repas.",
    trapAlertEn: "⚠️ SUPERFICIAL TOURIST CLICHÉ TRAP:\n• Describe the sensory joy of hot maple taffy on snow and the communal folk feast.",
    writingCoach: "✍️ TRADITION DU TEMPS DES SUCRES :\n• « Sirop d'érable bouillant », « festin traditionnel », « violon folklorique ».",
    writingCoachEn: "✍️ SUGAR SHACK TRADITIONS & PHRASES:\n• Spring Tradition Hook: 'Early last spring, I experienced an authentic sugar shack in the Laurentians...' (French: « Au début du printemps, j'ai vécu une tradition québécoise dans une cabane à sucre... »)\n• Feast & Music: 'We enjoyed fluffy soufflés and caramelized ham to the rhythm of lively folk fiddles...' (French: « Nous avons savouré un festin traditionnel rythmé par des airs de violon folklorique... »)\n• Maple Taffy Magic: 'The highlight was tasting hot maple taffy cooled on fresh snow. A magical springtime memory!' (French: « Le moment magique fut la dégustation de la tire d'érable sur la neige... »)",
    modelBreakdown: "🔍 120 mots chaleureux et évocateurs (cible 120–150).",
    modelBreakdownEn: "🔍 120 warm and evocative words (target 120–150)."
  },
  "7-3": {
    paperNum: 7,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DE L'ILLUSION TECHNIQUE :\n• Abordez à la fois l'urgence climatique et les défis réels (bornes de recharge, coût d'achat pour les foyers modestes).",
    trapAlertEn: "⚠️ OVERSIMPLIFIED TECH TRAP:\n• Address both climate urgency and real obstacles (charging networks, high vehicle purchase costs).",
    writingCoach: "✍️ TRANSITION ÉNERGÉTIQUE ARGUMENTÉE :\n• Baisse des émissions vs réseau de recharge et subventions publiques.",
    writingCoachEn: "✍️ ELECTRIC VEHICLE TRANSITION ESSAY STRATEGY:\n• Environmental Imperative: 'Phasing out gas cars by 2035 is vital to slash greenhouse gases and clean urban air...' (French: « L'électrification des transports est indispensable pour réduire les émissions de gaz à effet de serre... »)\n• Financial & Infrastructure Hurdles: 'However, high purchase prices and insufficient rural charging stations pose real barriers...' (French: « Cependant, le prix d'achat prohibitif et le manque de bornes constituent des obstacles réels... »)\n• Policy Synthesis: 'Success depends on generous purchase subsidies and massive grid upgrades.' (French: « La réussite dépendra de subventions massives et de la modernisation du réseau électrique. »)",
    modelBreakdown: "🔍 131 mots rigoureusement argumentés (cible 120–180).",
    modelBreakdownEn: "🔍 131 rigorously reasoned words (target 120–180)."
  },
  "8-1": {
    paperNum: 8,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DE LA CANDIDATURE BÂCLÉE :\n• Mettez en avant vos compétences techniques précises et mentionnez toujours le CV joint.",
    trapAlertEn: "⚠️ SLOPPY APPLICATION TRAP:\n• Highlight concrete professional skills and always cite your attached resume.",
    writingCoach: "✍️ LETTRE DE MOTIVATION STAGE (60–120 MOTS) :\n• Formation en cours, compétences financières, formule de demande d'entretien.",
    writingCoachEn: "✍️ INTERNSHIP COVER EMAIL STRATEGY:\n• Academic Credentials: 'Currently in the final year of my accounting degree in Montreal, I am submitting my application for a 3-month internship...' (French: « Actuellement étudiant en dernière année de sciences comptables, je sollicite un stage de 3 mois... »)\n• Technical Strengths: 'Proficient in financial software and tax analysis, I am eager to contribute to your reputable firm.' (French: « Rigoureux, j'ai acquis une solide maîtrise des logiciels financiers et fiscaux... »)\n• Enclosed Resume & Interview: 'Please find my resume attached. I look forward to an interview opportunity.' (French: « Vous trouverez mon CV ci-joint. Dans l'attente d'un entretien... »)",
    modelBreakdown: "🔍 87 mots percutants et professionnels (cible 60–120).",
    modelBreakdownEn: "🔍 87 sharp, career-focused words (target 60–120)."
  },
  "8-2": {
    paperNum: 8,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DE L'HISTOIRE TROP PARFAITE :\n• Racontez vos débuts hésitants et vos chutes pour donner de l'authenticité et de l'humour à votre texte.",
    trapAlertEn: "⚠️ UNREALISTIC PERFECTION TRAP:\n• Share your initial wobbles and falls to add warmth, authenticity, and humor.",
    writingCoach: "✍️ RÉCIT D'APPRENTISSAGE HIVERNAL :\n• « Manque d'équilibre », « conseils avisés du moniteur », « sensation de glisse fluide ».",
    writingCoachEn: "✍️ ICE SKATING NARRATIVE STRATEGY:\n• Hesitant Start: 'Last winter, I stepped onto ice skates for the first time at Jeanne-Mance Park, where clumsy falls sparked friendly laughter...' (French: « L'hiver dernier, j'ai chaussé des patins à glace... les chutes ont suscité des fous rires... »)\n• Coaching & Progress: 'Thanks to an encouraging instructor, I learned to coordinate my stride into a smooth, exhilarating glide.' (French: « Grâce aux conseils d'un moniteur, la sensation de glisse fluide est devenue grisante... »)\n• Winter Joy: 'I overcame my fear and now eagerly await the next freezing season!' (French: « J'ai surmonté mes appréhensions et j'attends avec impatience le retour de l'hiver ! »)",
    modelBreakdown: "🔍 123 mots humoristiques et inspirants (cible 120–150).",
    modelBreakdownEn: "🔍 123 witty and uplifting words (target 120–150)."
  },
  "8-3": {
    paperNum: 8,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DE LA GÉNÉRALISATION ABUSIVE :\n• N'oubliez pas que certains métiers (santé, sécurité) ne peuvent pas fermer 3 jours par semaine.",
    trapAlertEn: "⚠️ OVERGENERALIZATION TRAP:\n• Remember that essential continuous industries (healthcare, emergency services) require tailored staffing models.",
    writingCoach: "✍️ SEMAINE DE 4 JOURS :\n• Équilibre vie/travail et productivité vs défis logistiques sectoriels.",
    writingCoachEn: "✍️ 4-DAY WORK WEEK ESSAY STRATEGY:\n• Well-being & Productivity: 'Advocates emphasize that a 4-day work week reduces burnout and enhances focus, preserving output...' (French: « Les défenseurs soulignent que la réduction du temps de travail diminue le burn-out et accroît la créativité... »)\n• Operational Challenges: 'However, business leaders in healthcare and retail note that 24/7 coverage raises staffing costs...' (French: « D'un autre côté, certains chefs d'entreprise craignent une désorganisation dans les services continus... »)\n• Sector Adaptation Synthesis: 'Tailoring the policy flexibly to specific industries offers a promising reimagining of work.' (French: « Lorsqu'elle est adaptée avec discernement à chaque secteur, la semaine de 4 jours réinvente le travail moderne. »)",
    modelBreakdown: "🔍 147 mots d'une finesse économique remarquable (cible 120–180).",
    modelBreakdownEn: "🔍 147 words exhibiting sharp economic nuance (target 120–180)."
  },
  "9-1": {
    paperNum: 9,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DE LA LOCALISATION APPROXIMATIVE :\n• Précisez les rues exactes pour permettre une intervention rapide des services municipaux.",
    trapAlertEn: "⚠️ VAGUE LOCATION TRAP:\n• Provide the exact street cross-sections to allow immediate municipal technical response.",
    writingCoach: "✍️ SIGNALEMENT CITOYEN URBAIN :\n• Localisation précise, mise en garde sur la sécurité nocturne, demande d'intervention diligente.",
    writingCoachEn: "✍️ MUNICIPAL NOTICE STRATEGY:\n• Precise Location: 'I wish to report a lighting failure on Laurier Avenue, between Saint-Denis and Saint-Hubert streets...' (French: « Je tiens à attirer votre attention sur un dysfonctionnement de l'éclairage sur l'avenue Laurier... »)\n• Public Safety Risk: 'The darkness raises night safety hazards for evening pedestrians...' (French: « Cette obscurité persistante accroît les risques d'accidents pour les piétons... »)\n• Action Request: 'I would be grateful if you dispatched a crew promptly.' (French: « Je vous serais reconnaissant de bien vouloir diligenter une équipe technique dans les meilleurs délais. »)",
    modelBreakdown: "🔍 94 mots administratifs impeccables (cible 60–120).",
    modelBreakdownEn: "🔍 94 impeccably drafted municipal notice words (target 60–120)."
  },
  "9-2": {
    paperNum: 9,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DU COMPTE-RENDU BANAL :\n• Soulignez la diversité culinaire et les échanges interculturels entre voisins.",
    trapAlertEn: "⚠️ BLAND EVENT SUMMARY TRAP:\n• Highlight the culinary diversity and intercultural bonds forged with neighbors.",
    writingCoach: "✍️ FÊTE DES VOISINS MONTRÉALAISE :\n• Ruelle verte, plats partagés, rires et cohésion communautaire durable.",
    writingCoachEn: "✍️ BLOCK PARTY NARRATIVE STRATEGY:\n• Community Setting: 'Last Saturday, our Montreal alleyway turned into a colorful street party for our annual neighbors celebration...' (French: « Samedi dernier, notre ruelle montréalaise s'est transformée en un formidable lieu de réjouissances... »)\n• Cultural Sharing: 'Families shared homemade specialties, ambient music, and children games, forging deep community bonds.' (French: « Entre dégustations culinaires et jeux coopératifs, une atmosphère de fraternité s'est installée... »)\n• Enduring Fellowship: 'A wonderful tradition cementing local friendship for years to come!' (French: « Une merveilleuse tradition qui continuera d'animer notre communauté ! »)",
    modelBreakdown: "🔍 113 mots pleins de convivialité (cible 120–150).",
    modelBreakdownEn: "🔍 113 vibrant community-centered words (target 120–150)."
  },
  "9-3": {
    paperNum: 9,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DU DÉBAT MORALISATEUR :\n• Traitez de la santé mentale des adolescents avec des arguments scientifiques et éducatifs.",
    trapAlertEn: "⚠️ PREACHY TONE TRAP:\n• Discuss teen mental health using pedagogical, psychological, and sociological evidence.",
    writingCoach: "✍️ RÉSEAUX SOCIAUX & JEUNESSE :\n• Cyberharcèlement et anxiété vs liberté d'expression et éducation aux médias.",
    writingCoachEn: "✍️ SOCIAL MEDIA ESSAY STRATEGY:\n• Teen Protection: 'Proponents of strict age limits highlight cyberbullying, sleep disruption, and anxiety from toxic algorithms...' (French: « Les partisans d'une régulation stricte rappellent les dangers : cyberharcèlement, anxiété et perte d'estime... »)\n• Social Isolation Risks: 'However, bans risk isolating teenagers from contemporary peer groups and driving covert usage...' (French: « D'un autre côté, certains spécialistes craignent d'isoler les jeunes et d'encourager le contournement... »)\n• Digital Literacy Synthesis: 'Empowering media literacy in schools alongside parental guidance is far more effective than bans.' (French: « Renforcer l'éducation aux médias et l'accompagnement parental s'avère bien plus efficace qu'une prohibition. »)",
    modelBreakdown: "🔍 133 mots équilibrés et perspicaces (cible 120–180).",
    modelBreakdownEn: "🔍 133 balanced, insightful words (target 120–180)."
  },
  "10-1": {
    paperNum: 10,
    taskNum: 1,
    trapAlert: "⚠️ PIÈGE DE LA CANDIDATURE SANS COMPÉTENCES :\n• Ne dites pas juste « j'aime le festival » : mettez en avant votre bilinguisme et votre sens de l'accueil.",
    trapAlertEn: "⚠️ SKILL-FREE VOLUNTEER TRAP:\n• Do not just say 'I love the festival': emphasize your bilingualism and logistics readiness.",
    writingCoach: "✍️ BÉNÉVOLAT FESTIVAL INTERNATIONAL :\n• Enthousiasme francophone, compétences relationnelles, disponibilité complète.",
    writingCoachEn: "✍️ INTERNATIONAL FESTIVAL VOLUNTEERING STRATEGY:\n• Passion & Profile: 'Passionate about francophone culture, I wish to join your volunteer crew for the upcoming summer edition...' (French: « Passionné par le rayonnement de la francophonie, je souhaite vivement rejoindre votre équipe... »)\n• Practical Skills: 'Bilingual and energetic, I am available full-time for guest reception, artist guidance, and logistics.' (French: « Bilingue et dynamique, je suis disponible à temps plein pour l'accueil du public et la logistique... »)\n• Enthusiastic Sign-Off: 'Hoping to contribute to this unifying celebration, please accept my regards.' (French: « Espérant avoir l'opportunité de contribuer au succès de ce bel événement, je vous prie d'agréer... »)",
    modelBreakdown: "🔍 84 mots enthousiastes et professionnels (cible 60–120).",
    modelBreakdownEn: "🔍 84 energetic, professional words (target 60–120)."
  },
  "10-2": {
    paperNum: 10,
    taskNum: 2,
    trapAlert: "⚠️ PIÈGE DU COMPTE-RENDU STATIQUE :\n• Faites ressentir le frisson de l'apparition des baleines et la majesté du fjord.",
    trapAlertEn: "⚠️ STATIC DESCRIPTIVE TRAP:\n• Convey the awe of the whale breach and the silence of the fjord.",
    writingCoach: "✍️ SAFARI MARIN À TADOUSSAC :\n• « Rorqual commun », « bélugas blancs », « émotion collective indicible ».",
    writingCoachEn: "✍️ TADOUSSAC MARINE SAFARI STRATEGY:\n• Fjord Setting: 'Last summer, I experienced pure enchantment during a marine wildlife cruise where the Saguenay meets the St. Lawrence...' (French: « L'été dernier, j'ai vécu un moment de féerie lors d'une croisière à Tadoussac... »)\n• Whale Sighting: 'The powerful breach of a fin whale and graceful pod of white belugas created collective awe...' (French: « Le souffle d'un rorqual et le spectacle gracieux des bélugas blancs ont suscité une émotion collective... »)\n• Conservation Closing: 'An unforgettable encounter deeply inspiring ocean stewardship!' (French: « Une rencontre inoubliable qui m'a profondément sensibilisé aux écosystèmes marins. »)",
    modelBreakdown: "🔍 119 mots d'une puissance descriptive mémorable (cible 120–150).",
    modelBreakdownEn: "🔍 119 words of memorable descriptive power (target 120–150)."
  },
  "10-3": {
    paperNum: 10,
    taskNum: 3,
    trapAlert: "⚠️ PIÈGE DE L'UTOPIE SANS FINANCEMENT :\n• N'omettez pas le problème crucial du coût fiscal et du risque de désincitation au travail.",
    trapAlertEn: "⚠️ UNFINANCED UTOPIAN TRAP:\n• Do not ignore the critical challenges of taxation cost and labor market participation.",
    writingCoach: "✍️ REVENU UNIVERSEL GARANTI :\n• Éradication de la pauvreté et sécurité sociale vs charge fiscale et valeur travail.",
    writingCoachEn: "✍️ UNIVERSAL BASIC INCOME ESSAY STRATEGY:\n• Social Safety Argument: 'Proponents argue that unconditional basic income creates an essential safety net, eradicating extreme poverty and fostering civic entrepreneurship...' (French: « Les partisans affirment qu'il constitue un bouclier social éradiquant la grande pauvreté... »)\n• Fiscal Burden Concerns: 'However, opponents warn of massive tax increases and risks of weakening labor participation...' (French: « D'un autre côté, ses opposants dénoncent un coût budgétaire colossal et craignent de décourager l'effort... »)\n• Empirical Trials Synthesis: 'Local pilot studies are imperative to assess fiscal feasibility before any national rollout.' (French: « Le revenu universel nécessiterait des expérimentations locales afin d'évaluer sa viabilité financière. »)",
    modelBreakdown: "🔍 136 mots d'une haute tenue philosophique et économique (cible 120–180).",
    modelBreakdownEn: "🔍 136 words of high philosophical and economic caliber (target 120–180)."
  }
};

export function getWritingGuidance(paperNum: number, taskNum: number): WritingGuidanceEntry {
  const p = Math.max(1, Math.min(10, paperNum));
  const t = Math.max(1, Math.min(3, taskNum));
  const key = `${p}-${t}`;
  return WRITING_GUIDANCE_BANK[key] || WRITING_GUIDANCE_BANK["1-1"];
}
