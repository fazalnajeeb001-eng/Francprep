export interface WritingTaskData {
  id: string;
  taskNumber: number;
  title: string;
  prompt: string;
  wordCountMin: number;
  wordCountMax: number;
  timeLimitMins: number;
  guidedTips: string[];
  sampleResponse: string;
}

export const AUTHENTIC_TCF_WRITING_BANK: WritingTaskData[][] = [
  // =========================================================================
  // 📄 PAPER 1 (TCF Canada Paper 1)
  // =========================================================================
  [
    {
      id: "tcf1-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message court (Problème de chauffage)",
      prompt: "Vous louez un appartement au Québec. Le système de chauffage ne fonctionne plus en plein hiver. Rédigez un courriel au propriétaire (60 à 120 mots) pour expliquer la situation et demander une réparation urgente.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle adaptée (ex: Monsieur le Propriétaire)",
        "Exposer clairement le problème et la baisse critique de température",
        "Demander l'intervention rapide d'un technicien qualifié",
        "Formule de politesse formelle et coordonnées"
      ],
      sampleResponse: "Monsieur le Propriétaire,\n\nJe vous écris en urgence afin de vous signaler un problème majeur dans l'appartement que je loue au 45 rue Saint-Denis. Depuis hier soir, le système de chauffage central est totalement en panne et la température intérieure a chuté de manière préoccupante en raison des températures négatives extérieures.\n\nEn conséquence, je vous saurais gré d'intervenir dans les plus brefs délais ou d'envoyer un technicien qualifié dès aujourd'hui pour procéder aux réparations nécessaires. Je reste joignable par téléphone à tout moment pour faciliter l'accès au logement.\n\nEn vous remerciant vivement pour votre réactivité et votre compréhension, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf1-w2",
      taskNumber: 2,
      title: "Tâche 2 : Compte-rendu (Récit de voyage au Canada)",
      prompt: "Racontez dans un journal de voyage une expérience marquante lors d'un séjour au Canada (120 à 150 mots). Décrivez le lieu, les activités faites et vos impressions.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Introduction accrocheuse présentant la destination et le contexte",
        "Récit au passé (passé composé / imparfait) avec connecteurs temporels",
        "Description sensorielle des activités et de l'atmosphère",
        "Conclusion avec impressions personnelles et recommandation"
      ],
      sampleResponse: "Lors de mon récent séjour au Québec, j'ai vécu une aventure mémorable en assistant au traditionnel Carnaval d'hiver de la ville de Québec. Dès mon arrivée dans le Vieux-Québec, la cité historique était magnifiquement recouverte d'un manteau de neige féerique et illuminée de mille feux.\n\nPendant mon séjour, j'ai eu la chance d'admirer d'impressionnantes sculptures sur glace réalisées par des artistes internationaux et d'assister à la spectaculaire course de canot sur le fleuve Saint-Laurent glacé. L'atmosphère était chaleureuse et festive, malgré les températures froides.\n\nEn outre, cette immersion culturelle exceptionnelle m'a permis d'échanger avec des habitants accueillants et d'enrichir considérablement mes connaissances régionales. Bien que le climat fût rigoureux, je garde un souvenir impérissable de cette escapade nordique et je recommande chaleureusement cette destination féerique !"
    },
    {
      id: "tcf1-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Transports en commun gratuits)",
      prompt: "Certaines villes envisagent de rendre les transports en commun entièrement gratuits. Êtes-vous pour ou contre cette mesure ? Exprimez votre point de vue dans un texte structuré (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction concise posant la problématique sans formule de lettre",
        "Présentation des arguments favorables (transition écologique, équité sociale)",
        "Présentation des arguments défavorables (coût budgétaire, investissements)",
        "Conclusion personnelle synthétique et nuancée"
      ],
      sampleResponse: "La gratuité totale des transports en commun fait aujourd'hui l'objet d'un débat passionné au sein des métropoles contemporaines.\n\nD'un côté, les partisans de cette mesure soutiennent avec raison qu'elle favoriserait la transition écologique en incitant massivement les citoyens à délaisser leur véhicule individuel au profit du bus ou du métro, réduisant ainsi la pollution urbaine et l'empreinte carbone. De surcroît, elle constituerait une avancée sociale majeure pour les ménages à faibles revenus en augmentant directement leur pouvoir d'achat.\n\nD'un autre côté, certains économistes soulignent le coût financier considérable pour les collectivités locales. Sans recettes tarifaires, la rénovation, la sécurité et la modernisation des infrastructures risqueraient d'être compromises à long terme.\n\nEn conclusion, bien que la gratuité soit séduisante sur le plan environnemental et social, il me semble préférable de privilégier une tarification sociale adaptée aux revenus afin de garantir la pérennité et la qualité du réseau de transport public."
    }
  ],

  // =========================================================================
  // 📄 PAPER 2 (TCF Canada Paper 2)
  // =========================================================================
  [
    {
      id: "tcf2-w1",
      taskNumber: 1,
      title: "Tâche 1 : Demande d'informations (Atelier culinaire régional)",
      prompt: "Vous souhaitez vous inscrire à un atelier de cuisine québécoise. Écrivez un courriel à l'organisateur (60 à 120 mots) pour demander les horaires, tarifs et prérequis.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle polie (ex: Monsieur le Directeur / Madame la Responsable)",
        "Exprimer votre intérêt pour l'atelier gastronomique",
        "Poser 2 à 3 questions précises (tarifs, horaires, matériel fourni)",
        "Formule de politesse et remerciements anticipés"
      ],
      sampleResponse: "Monsieur le Directeur,\n\nJe vous écris afin d'obtenir des renseignements complémentaires concernant l'atelier de cuisine québécoise prévu le mois prochain dans votre établissement. Passionné par la gastronomie régionale, je souhaiterais m'y inscrire avec enthousiasme.\n\nPourriez-vous m'indiquer la grille tarifaire ainsi que les éventuels prérequis techniques ? De plus, j'aimerais savoir si le matériel culinaire est fourni sur place ou s'il convient d'apporter notre propre équipement personnel.\n\nEn vous remerciant par avance pour votre attention et dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf2-w2",
      taskNumber: 2,
      title: "Tâche 2 : Article de témoignage (Festival de Jazz de Montréal)",
      prompt: "Écrivez un article pour un blog de voyage (120 à 150 mots) racontant votre participation à un festival culturel local au Canada.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Titre accrocheur et mise en situation spatio-temporelle",
        "Récit vivant des concerts et de l'ambiance urbaine",
        "Vocabulaire sensoriel et émotionnel varié",
        "Conseil chaleureux pour les futurs voyageurs"
      ],
      sampleResponse: "Lors de mon dernier séjour au Canada, j'ai eu l'immense privilège de participer au prestigieux Festival International de Jazz de Montréal. Dès mon arrivée sur la place des Festivals, j'ai été immédiatement émerveillé par l'atmosphère festive et l'énergie vibrante des milliers de spectateurs réunis.\n\nPendant trois jours consécutifs, j'ai pu assister à des concerts en plein air mémorables et découvrir des artistes locaux pétris de talent. La diversité des styles musicaux présentés et la convivialité légendaire des Québécois ont rendu cette expérience absolument inoubliable.\n\nEn outre, les dégustations culinaires proposées sur place ont agréablement complété cette escapade. Je recommande vivement cet événement culturel à quiconque souhaite s'immerger dans l'âme musicale montréalaise. C'est une expérience festive d'une richesse exceptionnelle que vous ne regretterez pas !"
    },
    {
      id: "tcf2-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Langues étrangères dès l'école primaire)",
      prompt: "Pensez-vous que l'apprentissage des langues étrangères devrait être obligatoire dès l'école primaire ? Rédigez un texte argumenté (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction synthétique sur le débat éducatif moderne",
        "Thèse favorable : plasticité cérébrale, atout professionnel et ouverture culturelle",
        "Antithèse : risque de surcharge cognitive pour les apprentissages fondamentaux",
        "Conclusion équilibrée prônant une approche pédagogique ludique"
      ],
      sampleResponse: "L'opportunité d'imposer l'apprentissage obligatoire des langues étrangères dès le niveau primaire suscite d'intenses débats éducatifs et sociétaux à travers le monde.\n\nD'une part, les défenseurs de cette mesure soulignent à juste titre la plasticité cérébrale exceptionnelle des jeunes enfants, qui favorise une assimilation naturelle et intuitive des phonèmes et structures linguistiques. De surcroît, une maîtrise précoce des langues étrangères constitue un atout culturel et professionnel indiscutable dans une société globale hautement interconnectée.\n\nD'autre part, les détracteurs mettent en garde contre le risque d'une surcharge des programmes scolaires qui pourrait entraver l'acquisition fondamentale des compétences de base en langue maternelle et en mathématiques.\n\nEn somme, bien que ces réserves soient parfaitement légitimes, je demeure convaincu que l'apprentissage précoce des langues demeure un levier d'ouverture culturelle et d'épanouissement personnel indispensable, à condition toutefois d'adapter une pédagogie ludique au rythme d'apprentissage de chaque élève."
    }
  ],

  // =========================================================================
  // 📄 PAPER 3 (TCF Canada Paper 3)
  // =========================================================================
  [
    {
      id: "tcf3-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message formel (Inscription complexe sportif)",
      prompt: "Vous désirez vous inscrire à un club de sport à Montréal. Écrivez un courriel à l'administration (60 à 120 mots) pour demander des précisions sur les abonnements et les cours collectifs.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle polie (Madame, Monsieur)",
        "Demander les formules d'abonnements et horaires d'accès",
        "Renseignements sur les cours collectifs et séance d'essai",
        "Formule de politesse respectueuse"
      ],
      sampleResponse: "Madame, Monsieur,\n\nJe vous adresse ce courriel afin d'obtenir des informations précises concernant les modalités d'inscription à votre complexe sportif à Montréal pour la saison à venir.\n\nPourriez-vous m'indiquer la diversité des formules d'abonnement disponibles ainsi que les horaires d'ouverture des installations en semaine et le week-end ? Par ailleurs, j'aimerais savoir si une séance d'essai gratuite est envisageable avant tout engagement annuel.\n\nEn vous remerciant pour vos précisions, je vous prie de recevoir mes salutations respectueuses."
    },
    {
      id: "tcf3-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'expérience (Bénévolat dans une banque alimentaire)",
      prompt: "Racontez dans un article de témoignage votre engagement bénévole au sein d'une organisation caritative au Canada (120 à 150 mots). Expliquez vos missions et votre ressenti.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter le cadre de la mission bénévole",
        "Décrire les actions accomplies (tri des denrées, accueil, distribution)",
        "Exprimer le sentiment de solidarité et d'enrichissement humain",
        "Appel à l'engagement citoyen en conclusion"
      ],
      sampleResponse: "L'automne dernier, j'ai décidé de consacrer mes fins de semaine au bénévolat au sein de la banque alimentaire Moisson Montréal. Cette expérience solidaire s'est révélée profondément enrichissante sur le plan humain.\n\nAu sein d'une équipe dynamique et bienveillante, ma tâche principale consistait à trier les denrées alimentaires collectées auprès des supermarchés locaux et à préparer les paniers de secours destinés aux familles défavorisées. Malgré l'effort physique soutenu, les sourires chaleureux et la gratitude sincère des bénéficiaires ont transformé chaque journée en un moment de partage inestimable.\n\nEn définitive, cette aventure communautaire a renforcé mon empathie et m'a permis de tisser des liens solides avec des citoyens engagés. Je conseille à chacun de tenter l'expérience du volontariat associatif !"
    },
    {
      id: "tcf3-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Le télétravail généralisé)",
      prompt: "Le télétravail à temps plein est-il bénéfique pour les entreprises et les employés ? Présentez votre argumentation dans un texte structuré (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction posant la transformation du travail moderne",
        "Avantages : conciliation vie pro/perso, flexibilité, réduction des transports",
        "Inconvénients : isolement social, érosion de la culture d'entreprise",
        "Synthèse : modèle hybride comme équilibre optimal"
      ],
      sampleResponse: "La généralisation du télétravail représente l'une des mutations professionnelles les plus marquantes de notre époque contemporaine.\n\nPour ses partisans, le travail à distance offre une flexibilité appréciable qui favorise un meilleur équilibre entre vie professionnelle et vie personnelle. En supprimant les temps de trajet quotidiens stressants, il permet d'accroître la concentration et l'efficacité des salariés, tout en réduisant l'empreinte environnementale liée aux déplacements urbains.\n\nNéanmoins, plusieurs observateurs alertent sur les dérives potentielles de l'isolement social. L'absence d'interactions physiques informelles risque d'affaiblir la cohésion d'équipe et la culture collective d'entreprise. De plus, la frontière entre travail et vie privée tend parfois à s'estomper dangereusement.\n\nEn conclusion, il apparaît qu'un modèle hybride, combinant télétravail et présence au bureau, constitue la solution la plus équilibrée pour concilier productivité et bien-être des collaborateurs."
    }
  ],

  // =========================================================================
  // 📄 PAPER 4 (TCF Canada Paper 4)
  // =========================================================================
  [
    {
      id: "tcf4-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message d'inscription (Cours de perfectionnement linguistique)",
      prompt: "Vous souhaitez vous inscrire à un cours de perfectionnement en français des affaires. Écrivez un courriel à l'université (60 à 120 mots) pour présenter votre profil et demander les modalités.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle polie (Madame la Responsable des admissions)",
        "Présenter brièvement votre parcours et votre besoin professionnel",
        "Demander le calendrier de formation et les tests de classement",
        "Formule de clôture respectueuse"
      ],
      sampleResponse: "Madame la Responsable,\n\nTitulaire d'un diplôme en gestion commerciale, je souhaite vivement perfectionner mes compétences en français professionnel afin de faciliter mon intégration sur le marché du travail québécois.\n\nPourriez-vous me transmettre la brochure détaillée de la formation ainsi que les dates des prochaines sessions d'évaluation diagnostique ? De surcroît, j'aimerais savoir si ce programme donne droit à une certification officielle reconnue par les ordres professionnels.\n\nEn vous remerciant par avance pour votre précieux accompagnement, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf4-w2",
      taskNumber: 2,
      title: "Tâche 2 : Compte-rendu (Excursion au Parc National de la Mauricie)",
      prompt: "Rédigez un compte-rendu dans un magazine de plein air (120 à 150 mots) pour décrire une randonnée en pleine nature canadienne.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Situer le lieu et la saison de la randonnée",
        "Raconter les paysages observés (lacs, forêts d'érables, faune sauvage)",
        "Partager les émotions de déconnexion et de ressourcement",
        "Conseil pratique pour les passionnés de nature"
      ],
      sampleResponse: "Le mois dernier, j'ai eu le bonheur de parcourir les sentiers sauvages du Parc National de la Mauricie en plein cœur de l'automne québécois. Les paysages flamboyants offraient un spectacle grandiose où le rouge des érables se reflétait majestueusement sur les eaux calmes des lacs.\n\nDurant cette journée revigorante, nous avons pagayé en canot traditionnel avant d'entreprendre une randonnée jusqu'au belvédère du Passage. La quiétude des lieux et la pureté de l'air ambiant m'ont procuré un sentiment de plénitude exceptionnel, loin de l'effervescence urbaine.\n\nPar ailleurs, l'observation discrète de castors et d'oiseaux migrateurs a constitué le point culminant de cette excursion. Je conseille vivement cette immersion grandeur nature à tous les amoureux d'espaces préservés et d'authenticité !"
    },
    {
      id: "tcf4-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Interdiction des plastiques à usage unique)",
      prompt: "Faut-il interdire totalement les emballages et objets en plastique à usage unique ? Donnez votre avis dans un texte argumentatif structuré (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur l'urgence écologique de la pollution plastique",
        "Pour l'interdiction : préservation des océans, santé publique, économie circulaire",
        "Contre / Nuance : impact économique pour les PME et manque d'alternatives abordables",
        "Conclusion : interdiction progressive assortie d'aides à l'innovation durable"
      ],
      sampleResponse: "La prolifération des déchets plastiques dans notre environnement constitue aujourd'hui un défi écologique planétaire urgent.\n\nD'un côté, les écologistes réclament l'interdiction immédiate et totale des plastiques à usage unique afin de stopper la contamination dramatique des écosystèmes marins et de préserver la biodiversité. Cette mesure radicale encouragerait le développement d'alternatives durables et stimulerait l'économie circulaire responsable.\n\nD'un autre côté, certains représentants industriels font valoir que cette transition abrupte imposerait des coûts de réadaptation considérables aux petites entreprises et aux commerces de proximité, tout en augmentant parfois les prix pour les consommateurs.\n\nEn définitive, bien que les contraintes économiques soient réelles, l'impératif écologique doit prévaloir. Une interdiction progressive, accompagnée d'incitations financières pour la recherche de matériaux biodégradables, représente la voie la plus prometteuse pour bâtir un avenir durable."
    }
  ],

  // =========================================================================
  // 📄 PAPER 5 (TCF Canada Paper 5)
  // =========================================================================
  [
    {
      id: "tcf5-w1",
      taskNumber: 1,
      title: "Tâche 1 : Courriel de réclamation (Retard de livraison colis)",
      prompt: "Vous avez commandé du matériel informatique qui est arrivé endommagé avec un retard important. Rédigez un courriel au service client (60 à 120 mots) pour exiger un remboursement ou un remplacement.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Référence de commande précise et objet du litige",
        "Description du retard et de l'état défectueux du colis",
        "Demande formelle de remplacement ou remboursement intégral",
        "Formule de politesse ferme et professionnelle"
      ],
      sampleResponse: "Madame, Monsieur du Service Client,\n\nJe me permets de vous contacter au sujet de ma commande N°CA-89211 passée le 5 novembre dernier sur votre site internet. Non seulement la livraison a accusé un retard inacceptable de deux semaines, mais le matériel informatique est arrivé dans un emballage gravement endommagé, rendant l'ordinateur inutilisable.\n\nPar conséquent, j'exige le remplacement immédiat de cet article sans frais supplémentaires ou, à défaut, le remboursement intégral de la facture sous 48 heures.\n\nDans l'attente d'une résolution rapide de ce litige, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf5-w2",
      taskNumber: 2,
      title: "Tâche 2 : Témoignage personnel (Installation dans une nouvelle ville)",
      prompt: "Écrivez un témoignage (120 à 150 mots) racontant votre emménagement dans une nouvelle ville au Canada, vos premières découvertes et vos impressions.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter la ville d'accueil et le contexte d'installation",
        "Raconter les étapes de l'emménagement et la découverte du quartier",
        "Souligner l'accueil des voisins et les commodités locales",
        "Bilan enthousiaste sur ce nouveau chapitre de vie"
      ],
      sampleResponse: "Il y a tout juste trois mois, j'ai posé mes valises dans la charmante ville de Sherbrooke au Québec pour débuter un nouveau chapitre professionnel. Dès les premiers jours, j'ai été séduit par l'harmonie parfaite entre dynamisme universitaire et espaces verts paisibles.\n\nL'installation dans mon nouvel appartement s'est déroulée avec une fluidité remarquable grâce à l'extrême gentillesse de mes voisins, qui m'ont spontanément guidé vers les services essentiels du quartier. J'ai pris plaisir à explorer les marchés fermiers locaux et à me promener le long de la rivière Magog.\n\nCette transition, bien qu'exigeante sur le plan logistique, s'est transformée en une expérience humaine formidable. Je me sens désormais pleinement intégré et épanoui dans cette communauté accueillante et vibrante !"
    },
    {
      id: "tcf5-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (L'intelligence artificielle à l'université)",
      prompt: "L'utilisation de l'intelligence artificielle générative dans l'enseignement universitaire doit-elle être encouragée ou interdite ? Rédigez un essai argumenté (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur l'essor fulgurant des outils d'IA dans les études",
        "Arguments pour : tuteur personnalisé, gain de temps, préparation au marché du travail",
        "Arguments contre : tricherie, atrophie de la pensée critique et paresse intellectuelle",
        "Synthèse : intégration éthique et pédagogique encadrée"
      ],
      sampleResponse: "L'émergence spectaculaire des outils d'intelligence artificielle générative bouleverse en profondeur les méthodes pédagogiques traditionnelles dans l'enseignement supérieur.\n\nD'un côté, les partisans de ces technologies soutiennent qu'elles constituent des assistants d'apprentissage révolutionnaires. L'IA permet d'individualiser les explications complexes, de stimuler la curiosité intellectuelle et de préparer efficacement les étudiants aux compétences numériques exigées par le monde professionnel de demain.\n\nD'un autre côté, de nombreux enseignants s'inquiètent des risques de plagiat et de la dépendance cognitive qu'elles peuvent engendrer, redoutant un affaiblissement de la pensée critique et des capacités d'analyse autonome des étudiants.\n\nPour ma part, je considère qu'interdire l'intelligence artificielle serait une illusion stérile. Il convient plutôt d'élaborer une charte éthique rigoureuse et d'enseigner aux étudiants un usage critique, responsable et réfléchi de ces technologies novatrices."
    }
  ],

  // =========================================================================
  // 📄 PAPER 6 (TCF Canada Paper 6)
  // =========================================================================
  [
    {
      id: "tcf6-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message informatif (Recherche de colocation)",
      prompt: "Vous publiez une annonce pour rechercher un colocataire à Québec. Rédigez un message (60 à 120 mots) décrivant l'appartement, le quartier et le profil recherché.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Accroche claire et description du logement (luminosité, transports)",
        "Montant du loyer et charges incluses",
        "Profil de colocataire souhaité (calme, respectueux, non-fumeur)",
        "Invitation à une visite et contact"
      ],
      sampleResponse: "Bonjour à tous,\n\nJe propose une chambre spacieuse et lumineuse dans un bel appartement 4 1/2 situé dans le quartier Saint-Roch à Québec, à deux pas des transports et des commerces. Le logement est entièrement meublé et dispose d'une cuisine équipée moderne.\n\nLe loyer est de 650 $ par mois, incluant le chauffage, l'électricité et internet haut débit. Je recherche une personne calme, respectueuse et non-fumeuse pour partager ce lieu de vie convivial.\n\nN'hésitez pas à me contacter par message privé pour planifier une visite dès cette semaine !"
    },
    {
      id: "tcf6-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'événement (Journée de corvée environnementale)",
      prompt: "Racontez dans un bulletin municipal (120 à 150 mots) votre participation à une grande journée de nettoyage citoyen dans un parc local.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter la mobilisation citoyenne et les objectifs de la journée",
        "Raconter les actions menées en équipe (ramassage, recyclage, plantation)",
        "Mettre en valeur l'ambiance conviviale et le résultat concret",
        "Message d'encouragement pour la protection de l'environnement"
      ],
      sampleResponse: "Samedi dernier, plus d'une centaine d'habitants de notre quartier se sont mobilisés avec ardeur à l'occasion de la grande corvée citoyenne de nettoyage du parc Lafontaine. Munis de gants et de sacs de tri, nous avons sillonné les allées dès les premières lueurs du jour.\n\nDans une ambiance festive et intergénérationnelle, les équipes ont réussi à collecter plus de 300 kilos de déchets plastiques et ont procédé à la plantation de jeunes arbustes indigènes le long des berges. Cette action collective a redonné à notre espace vert toute sa splendeur naturelle.\n\nCe moment de civisme exemplaire a permis de renforcer la solidarité locale et de sensibiliser les plus jeunes à l'écoresponsabilité. Une formidable initiative communautaire à renouveler sans hésitation !"
    },
    {
      id: "tcf6-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Service civique obligatoire pour les jeunes)",
      prompt: "Devrait-on instaurer un service civique ou communautaire obligatoire pour tous les jeunes de 18 ans ? Développez votre réflexion dans un texte argumentatif (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur le rôle de la jeunesse et l'engagement citoyen",
        "Pour : mixité sociale, apprentissage de la solidarité, cohésion nationale",
        "Contre : contrainte liberticide, report des études ou de l'entrée dans la vie active",
        "Synthèse : valoriser un volontariat incitatif plutôt qu'une obligation stricte"
      ],
      sampleResponse: "L'instauration d'un service civique obligatoire pour tous les jeunes adultes suscite de vifs débats sociologiques et politiques.\n\nD'un côté, les partisans de cette mesure affirment qu'elle renforcerait puissamment la cohésion nationale et le sentiment d'appartenance collective. En réunissant des individus de divers horizons socioculturels autour de projets d'intérêt général, le service civique favoriserait la mixité sociale et inculquerait des valeurs civiques fondamentales.\n\nD'un autre côté, ses détracteurs dénoncent une atteinte à la liberté individuelle des jeunes, arguant qu'une telle contrainte pourrait retarder leur cursus académique ou leur insertion professionnelle précoce.\n\nEn conclusion, bien que l'engagement citoyen soit une valeur cardinale, il me semble plus pertinent de promouvoir un service civique volontaire attractif et valorisé dans les parcours universitaires, plutôt que de recourir à une obligation contraignante."
    }
  ],

  // =========================================================================
  // 📄 PAPER 7 (TCF Canada Paper 7)
  // =========================================================================
  [
    {
      id: "tcf7-w1",
      taskNumber: 1,
      title: "Tâche 1 : Courriel formel (Demande de subvention municipale)",
      prompt: "Vous représentez une association locale et demandez une subvention à la mairie pour organiser une fête de quartier. Écrivez un courriel (60 à 120 mots) présentant le projet.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle (Monsieur le Maire / Madame la Conseillère municipale)",
        "Présenter brièvement le projet festif et ses objectifs de cohésion",
        "Indiquer le montant ou le soutien logistique sollicité",
        "Formule de politesse officielle et proposition de rencontre"
      ],
      sampleResponse: "Monsieur le Conseiller municipal,\n\nAu nom de l'Association des Riverains du Plateau, je me permets de vous solliciter afin de requérir un soutien financier et logistique dans le cadre de l'organisation de notre festival interculturel prévu en juin prochain.\n\nCet événement rassembleur a pour vocation de célébrer la diversité culturelle de notre arrondissement à travers des concerts gratuits et des ateliers éducatifs. Une contribution municipale de 1 500 $ nous permettrait de couvrir les frais de sécurité et d'éclairage.\n\nRestant à votre entière disposition pour vous présenter notre dossier complet, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf7-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'immersion (Séjour dans une cabane à sucre québécoise)",
      prompt: "Racontez dans un carnet de voyage (120 à 150 mots) votre première expérience traditionnelle dans une cabane à sucre au printemps.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter la tradition du temps des sucres au Québec",
        "Décrire l'ambiance festive, les musiques traditionnelles et le repas",
        "Raconter la dégustation de la tire d'érable sur la neige",
        "Impression chaleureuse et coup de cœur gastronomique"
      ],
      sampleResponse: "Au début du printemps dernier, j'ai eu la chance de vivre une tradition québécoise incontournable en me rendant dans une authentique cabane à sucre située dans la région des Laurentides. Dès notre arrivée, l'odeur sucrée du sirop d'érable bouillant nous a immédiatement enveloppés.\n\nAutour de grandes tables en bois, nous avons savouré un festin traditionnel composé d'omelettes soufflées, de fèves au lard et de jambon caramélisé, le tout rythmé par des airs de violon folklorique entraînants. Le moment magique fut incontestablement la dégustation de la fameuse tire d'érable figée sur de la neige fraîche.\n\nCette immersion conviviale au cœur des coutumes locales m'a laissé un souvenir impérissable. C'est une célébration printanière chaleureuse que chaque voyageur se doit de découvrir !"
    },
    {
      id: "tcf7-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Transition vers les véhicules 100% électriques)",
      prompt: "L'interdiction de vente des voitures à essence au profit des véhicules 100% électriques d'ici 2035 est-elle une solution réaliste et efficace ? Développez votre avis (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction posant les objectifs de décarbonation du transport",
        "Avantages : réduction drastique des émissions de CO2, amélioration de la qualité de l'air",
        "Défis : coût d'achat élevé, recyclage des batteries, robustesse du réseau de recharge",
        "Synthèse : investissements massifs dans les infrastructures nécessaires pour réussir"
      ],
      sampleResponse: "La volonté des gouvernements d'interdire la vente des véhicules thermiques d'ici 2035 suscite d'importantes interrogations quant à sa faisabilité technique et économique.\n\nLes partisans de cette transition énergétique majeure font valoir que l'électrification des transports est indispensable pour réduire drastiquement les émissions de gaz à effet de serre et assainir l'air de nos agglomérations. De surcroît, le coût d'entretien des moteurs électriques s'avère nettement plus avantageux sur le long terme.\n\nCependant, les détracteurs soulignent des obstacles non négligeables, notamment le prix d'achat encore prohibitif pour de nombreux ménages modestes, ainsi que l'insuffisance flagrante des bornes de recharge rapide dans les régions éloignées.\n\nEn somme, si l'objectif environnemental est impératif, sa réussite dépendra de la capacité des pouvoirs publics à subventionner massivement l'accès aux véhicules propres et à moderniser le réseau électrique."
    }
  ],

  // =========================================================================
  // 📄 PAPER 8 (TCF Canada Paper 8)
  // =========================================================================
  [
    {
      id: "tcf8-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message professionnel (Demande de stage en entreprise)",
      prompt: "Vous écrivez au responsable des ressources humaines d'une entreprise montréalaise pour solliciter un stage de 3 mois en comptabilité (60 à 120 mots).",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle (Madame la Directrice des Ressources Humaines)",
        "Présenter votre formation et la période de stage visée",
        "Mettre en avant votre motivation et vos compétences clés",
        "Formule de politesse professionnelle et mention du CV joint"
      ],
      sampleResponse: "Madame la Directrice,\n\nActuellement étudiant en dernière année de baccalauréat en sciences comptables à Montréal, je vous sollicite afin de vous proposer ma candidature pour un stage conventionné de trois mois à compter de mai prochain.\n\nRigoureux et motivé, j'ai acquis une solide maîtrise des logiciels financiers et de l'analyse fiscale. Intégrer votre cabinet réputé représenterait pour moi une formidable opportunité de mettre mes compétences au service de vos clients.\n\nVous trouverez mon curriculum vitae ci-joint. Dans l'attente d'un entretien, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf8-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'apprentissage (Découverte du patinage sur glace)",
      prompt: "Racontez dans une chronique personnelle (120 à 150 mots) votre tout premier cours de patinage sur une patinoire extérieure au Canada.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Mise en contexte sur la patinoire extérieure par temps froid",
        "Récit humoristique des premières chutes et de la perte d'équilibre",
        "Progression encourageante grâce aux conseils reçus",
        "Sentiment de fierté et amour pour ce sport hivernal"
      ],
      sampleResponse: "L'hiver dernier, j'ai chaussé pour la première fois de ma vie des patins à glace sur l'immense anneau gelé du parc Jeanne-Mance à Montréal. Dès mes premiers pas sur la glace vive, le manque d'équilibre et les chutes inévitables ont suscité de nombreux fous rires parmi mes amis.\n\nCependant, grâce aux conseils avisés d'un moniteur local bienveillant, j'ai rapidement appris à fléchir les genoux et à coordonner mes mouvements. Après une heure d'efforts persévérants, la sensation de glisse fluide dans l'air vivifiant de la soirée est devenue grisante et apaisante.\n\nCette expérience sportive emblématique m'a permis de surmonter mes appréhensions et de savourer pleinement la magie de l'hiver canadien. Je n'attends désormais qu'une chose : le retour de la prochaine saison glacée !"
    },
    {
      id: "tcf8-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (La semaine de travail de 4 jours)",
      prompt: "Le passage à la semaine de travail de 4 jours (32 heures) sans réduction de salaire est-il un progrès souhaitable ? Présentez votre argumentation (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur l'évolution du temps de travail et la productivité",
        "Avantages : santé mentale, réduction du burn-out, équilibre personnel, hausse de l'efficacité",
        "Inconvénients : difficultés d'organisation pour les services continus et coût pour les PME",
        "Synthèse : une mesure innovante à adapter selon les secteurs d'activité"
      ],
      sampleResponse: "L'instauration de la semaine de travail de quatre jours suscite un engouement croissant au sein des réflexions sur le bien-être au travail.\n\nD'un côté, les défenseurs de ce modèle soulignent que la réduction du temps de travail améliore significativement la santé mentale des salariés en diminuant le stress et le risque d'épuisement professionnel. De nombreuses études démontrent d'ailleurs que des employés reposés affichent une concentration et une créativité accrues, maintenant ainsi un niveau de productivité équivalent.\n\nD'un autre côté, certains chefs d'entreprise craignent une désorganisation opérationnelle, notamment dans les secteurs de la santé ou du commerce où la continuité de service exige une présence constante, ce qui pourrait engendrer des surcoûts d'embauche.\n\nEn conclusion, bien que son application universelle présente des défis logistiques, la semaine de quatre jours constitue une formidable opportunité de réinventer le travail moderne lorsqu'elle est adaptée avec discernement aux spécificités de chaque secteur."
    }
  ],

  // =========================================================================
  // 📄 PAPER 9 (TCF Canada Paper 9)
  // =========================================================================
  [
    {
      id: "tcf9-w1",
      taskNumber: 1,
      title: "Tâche 1 : Message municipal (Signalement d'éclairage défectueux)",
      prompt: "Dans votre quartier, plusieurs lampadaires sont éteints depuis plusieurs jours, posant un problème de sécurité nocturne. Écrivez au service municipal (60 à 120 mots) pour demander une intervention.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle (Monsieur le Responsable des services techniques)",
        "Localisation précise du tronçon de rue plongé dans le noir",
        "Explication des risques de sécurité pour les piétons en soirée",
        "Demande d'intervention urgente et formule de politesse"
      ],
      sampleResponse: "Monsieur le Responsable,\n\nJe tiens à attirer votre attention sur un dysfonctionnement majeur de l'éclairage public sur l'avenue Laurier, entre les rues Saint-Denis et Saint-Hubert. Depuis près d'une semaine, plusieurs lampadaires consécutifs sont totalement hors service.\n\nCette obscurité persistante engendre un sentiment d'insécurité croissant et accroît considérablement les risques d'accidents pour les nombreux piétons qui empruntent ce secteur en soirée.\n\nJe vous serais donc très reconnaissant de bien vouloir diligenter une équipe technique afin de rétablir l'éclairage dans les meilleurs délais.\n\nEn vous remerciant pour votre diligence, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf9-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'intégration (Première fête des voisins)",
      prompt: "Racontez dans un journal communautaire (120 à 150 mots) l'organisation et le déroulement de la fête des voisins dans votre ruelle à Montréal.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter le projet de ruelle verte et l'initiative citoyenne",
        "Décrire les mets partagés, les rires et les activités pour enfants",
        "Souligner le sentiment de convivialité et d'entraide",
        "Bilan sur la force des liens de voisinage créés"
      ],
      sampleResponse: "Samedi dernier, notre ruelle montréalaise s'est transformée en un formidable lieu de réjouissances à l'occasion de notre toute première fête des voisins estivale. Dès midi, chaque famille a dressé des tables colorées et apporté des spécialités culinaires issues de leurs pays d'origine.\n\nEntre dégustations de mets savoureux, musique d'ambiance et jeux coopératifs organisés pour les enfants, une atmosphère de chaleureuse fraternité s'est spontanément installée. Ce moment de partage simple a permis de faire connaissance avec des résidents que nous ne faisions jusqu'alors que croiser brièvement.\n\nCet événement communautaire a renforcé notre sentiment de sécurité et d'appartenance à notre quartier. Une merveilleuse tradition qui continuera d'animer notre communauté pour les années à venir !"
    },
    {
      id: "tcf9-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Régulation des réseaux sociaux chez les adolescents)",
      prompt: "L'accès aux réseaux sociaux devrait-il être strictement limité ou interdit aux mineurs de moins de 15 ans ? Rédigez un texte argumenté (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur l'omniprésence des plateformes numériques chez les jeunes",
        "Arguments pour la régulation : santé mentale, cyberharcèlement, troubles du sommeil",
        "Arguments contre : liberté d'expression, maintien du lien social, inefficacité technique du blocage",
        "Synthèse : privilégier l'éducation aux médias et la responsabilité parentale"
      ],
      sampleResponse: "L'impact des plateformes numériques sur le développement psychologique des adolescents constitue une préoccupation majeure pour les éducateurs et les parents.\n\nD'un côté, les partisans d'une régulation stricte rappellent avec insistance les dangers avérés liés à une exposition précoce : cyberharcèlement, troubles anxieux, perte d'estime de soi et détérioration du sommeil. Pour eux, restreindre l'accès avant 15 ans permettrait de protéger la jeunesse de ces dérives algorithmiques toxiques.\n\nD'un autre côté, certains spécialistes estiment qu'une interdiction légale serait difficilement applicable et risquerait d'isoler les jeunes de leurs cercles de socialisation contemporains, tout en les incitant à contourner les contrôles par des moyens détournés.\n\nEn définitive, plutôt qu'une prohibition illusoire, il me semble indispensable de renforcer l'éducation aux médias à l'école et d'encourager un accompagnement parental bienveillant pour forger un esprit critique face aux écrans."
    }
  ],

  // =========================================================================
  // 📄 PAPER 10 (TCF Canada Paper 10)
  // =========================================================================
  [
    {
      id: "tcf10-w1",
      taskNumber: 1,
      title: "Tâche 1 : Courriel de candidature (Bénévolat festival francophone)",
      prompt: "Vous souhaitez devenir bénévole lors d'un grand festival francophone international au Canada. Écrivez un courriel à l'équipe d'organisation (60 à 120 mots) pour proposer vos services.",
      wordCountMin: 60,
      wordCountMax: 120,
      timeLimitMins: 15,
      guidedTips: [
        "Salutation formelle (Madame, Monsieur de l'équipe organisatrice)",
        "Exprimer votre enthousiasme pour la culture francophone",
        "Préciser vos disponibilités et vos compétences d'accueil / logistique",
        "Formule de politesse chaleureuse et professionnelle"
      ],
      sampleResponse: "Madame, Monsieur,\n\nPassionné par la culture et le rayonnement de la francophonie, je souhaite vivement rejoindre votre équipe de bénévoles à l'occasion de la prochaine édition de votre festival d'été.\n\nDynamique, bilingue et doté d'un excellent sens relationnel, je suis disponible à temps plein durant toute la durée de l'événement pour participer à l'accueil du public, à l'orientation des artistes ou à l'assistance logistique.\n\nEspérant avoir l'opportunité de contribuer activement au succès de ce bel événement rassembleur, je vous prie d'agréer mes salutations distinguées."
    },
    {
      id: "tcf10-w2",
      taskNumber: 2,
      title: "Tâche 2 : Récit d'excursion (Safari d'observation des baleines à Tadoussac)",
      prompt: "Rédigez un compte-rendu dans un carnet de découvertes (120 à 150 mots) racontant votre excursion d'observation des baleines dans le fjord du Saguenay.",
      wordCountMin: 120,
      wordCountMax: 150,
      timeLimitMins: 20,
      guidedTips: [
        "Présenter le lieu emblématique de Tadoussac et le départ en bateau",
        "Décrire l'apparition majestueuse des bélugas et rorquals dans le fleuve",
        "Partager l'émerveillement et le respect pour la faune marine",
        "Conseil passionné pour les voyageurs éco-responsables"
      ],
      sampleResponse: "L'été dernier, j'ai vécu un moment de pure féerie lors d'une croisière d'observation marine à Tadoussac, là où les eaux du Saguenay rencontrent le fleuve Saint-Laurent. Dès que notre embarcation s'est éloignée du rivage embrumé, le silence grandiose de la nature a suspendu le temps.\n\nSoudain, à quelques dizaines de mètres, le souffle puissant d'un rorqual commun a déchiré les flots, suivi par le spectacle gracieux d'un groupe de bélugas blancs nageant paisiblement. La majesté de ces géants des mers dans leur sanctuaire naturel a suscité une émotion collective indicible parmi tous les passagers.\n\nCette rencontre exceptionnelle m'a profondément sensibilisé à la fragilité des écosystèmes marins. C'est une aventure inoubliable que je recommande à quiconque visite le Québec !"
    },
    {
      id: "tcf10-w3",
      taskNumber: 3,
      title: "Tâche 3 : Essai argumentatif (Le revenu universel garanti)",
      prompt: "L'instauration d'un revenu de base universel inconditionnel pour chaque citoyen est-elle souhaitable ? Rédigez un texte argumenté (120 à 180 mots).",
      wordCountMin: 120,
      wordCountMax: 180,
      timeLimitMins: 25,
      guidedTips: [
        "Introduction sur les transformations économiques et l'automatisation",
        "Avantages : éradication de la grande pauvreté, filet de sécurité sociale, émancipation citoyenne",
        "Défis : financement fiscal colossal, risque d'affaiblissement de la valeur travail",
        "Synthèse : expérimentations ciblées avant toute généralisation"
      ],
      sampleResponse: "L'idée d'octroyer à chaque citoyen un revenu minimum universel et inconditionnel suscite d'intenses controverses économiques et philosophiques.\n\nD'un côté, les partisans de cette mesure affirment qu'elle constitue un bouclier social indispensable face aux mutations technologiques et à la précarité croissante. En garantissant un filet de sécurité financier, le revenu universel éradiquerait la pauvreté extrême et permettrait aux individus d'entreprendre ou de se consacrer à des activités citoyennes et éducatives valorisantes.\n\nD'un autre côté, ses opposants dénoncent un coût budgétaire colossal qui exigerait une hausse massive des impôts, tout en craignant qu'une telle allocation ne décourage l'effort et la participation active au marché du travail.\n\nEn conclusion, bien que séduisant sur le plan humaniste, le revenu universel nécessiterait des expérimentations locales approfondies afin d'évaluer sa viabilité financière et son impact réel sur l'économie avant toute généralisation nationale."
    }
  ]
];

export function getWritingPaperTasks(paperNum: number): WritingTaskData[] {
  const zeroIndexed = Math.max(0, Math.min(9, paperNum - 1));
  return AUTHENTIC_TCF_WRITING_BANK[zeroIndexed] || AUTHENTIC_TCF_WRITING_BANK[0];
}
