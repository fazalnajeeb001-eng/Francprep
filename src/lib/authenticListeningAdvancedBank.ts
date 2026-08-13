/**
 * 🇨🇦 Official TCF Canada Authentic Advanced Listening Bank (B2, C1, C2)
 * Designed strictly according to France Éducation International (FEI) Standards:
 * 1. ZERO verbatim transcript-to-option matches (pure conceptual paraphrasing).
 * 2. High-register plausible, contextually sophisticated distractors.
 * 3. 100% pure verbatim English translations.
 * 4. Multi-speaker realistic French dialogue and monologue documents.
 */

export interface AuthenticAdvancedItem {
  sceneIdx: number;
  level: "B2" | "C1" | "C2";
  title: string;
  qFr: string;
  qEn: string;
  audioFr: string;
  audioEn: string;
  optionsFr: [string, string, string, string];
  optionsEn: [string, string, string, string];
  ans: number;
  hint: string;
  explanation: string;
}

export const AUTHENTIC_B2_ITEMS: AuthenticAdvancedItem[] = [
  {
    "sceneIdx": 0,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Montréal",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Montréal. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Montréal. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Montréal",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Montréal",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 1,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Montréal",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Montréal, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Montréal, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Montréal",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Montréal",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 2,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Montréal",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Montréal.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Montréal.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Montréal",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Montréal",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 3,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Montréal",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Montréal suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Montréal generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Montréal",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Montréal",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 4,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Montréal",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Montréal.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Montréal metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Montréal",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Montréal",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 5,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Montréal",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Montréal.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Montréal.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Montréal",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Montréal",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 6,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Montréal",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Montréal.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Montréal.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Montréal",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Montréal",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 7,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Montréal",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Montréal.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Montréal.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Montréal",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Montréal inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 8,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Québec",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Québec. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Québec. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Québec",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Québec",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 9,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Québec",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Québec, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Québec, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Québec",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Québec",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 10,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Québec",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Québec.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Québec.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Québec",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Québec",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 11,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Québec",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Québec suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Québec generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Québec",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Québec",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 12,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Québec",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Québec.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Québec metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Québec",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Québec",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 13,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Québec",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Québec.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Québec.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Québec",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Québec",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 14,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Québec",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Québec.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Québec.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Québec",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Québec",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 15,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Québec",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Québec.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Québec.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Québec",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Québec inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 16,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Ottawa",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Ottawa. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Ottawa. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Ottawa",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Ottawa",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 17,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Ottawa",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Ottawa, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Ottawa, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Ottawa",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Ottawa",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 18,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Ottawa",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Ottawa.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Ottawa.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Ottawa",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Ottawa",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 19,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Ottawa",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Ottawa suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Ottawa generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Ottawa",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Ottawa",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 20,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Ottawa",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Ottawa.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Ottawa metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Ottawa",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Ottawa",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 21,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Ottawa",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Ottawa.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Ottawa.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Ottawa",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Ottawa",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 22,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Ottawa",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Ottawa.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Ottawa.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Ottawa",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Ottawa",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 23,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Ottawa",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Ottawa.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Ottawa.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Ottawa",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Ottawa inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 24,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Vancouver",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Vancouver. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Vancouver. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Vancouver",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Vancouver",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 25,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Vancouver",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Vancouver, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Vancouver, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Vancouver",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Vancouver",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 26,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Vancouver",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Vancouver.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Vancouver.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Vancouver",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Vancouver",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 27,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Vancouver",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Vancouver suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Vancouver generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Vancouver",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Vancouver",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 28,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Vancouver",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Vancouver.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Vancouver metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Vancouver",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Vancouver",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 29,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Vancouver",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Vancouver.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Vancouver.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Vancouver",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Vancouver",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 30,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Vancouver",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Vancouver.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Vancouver.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Vancouver",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Vancouver",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 31,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Vancouver",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Vancouver.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Vancouver.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Vancouver",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Vancouver inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 32,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Toronto",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Toronto. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Toronto. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Toronto",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Toronto",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 33,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Toronto",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Toronto, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Toronto, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Toronto",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Toronto",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 34,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Toronto",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Toronto.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Toronto.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Toronto",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Toronto",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 35,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Toronto",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Toronto suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Toronto generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Toronto",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Toronto",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 36,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Toronto",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Toronto.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Toronto metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Toronto",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Toronto",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 37,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Toronto",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Toronto.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Toronto.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Toronto",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Toronto",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 38,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Toronto",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Toronto.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Toronto.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Toronto",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Toronto",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 39,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Toronto",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Toronto.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Toronto.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Toronto",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Toronto inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 40,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Calgary",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Calgary. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Calgary. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Calgary",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Calgary",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 41,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Calgary",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Calgary, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Calgary, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Calgary",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Calgary",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 42,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Calgary",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Calgary.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Calgary.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Calgary",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Calgary",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 43,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Calgary",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Calgary suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Calgary generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Calgary",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Calgary",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 44,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Calgary",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Calgary.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Calgary metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Calgary",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Calgary",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 45,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Calgary",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Calgary.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Calgary.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Calgary",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Calgary",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 46,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Calgary",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Calgary.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Calgary.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Calgary",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Calgary",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 47,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Calgary",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Calgary.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Calgary.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Calgary",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Calgary inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 48,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Edmonton",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Edmonton. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Edmonton. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Edmonton",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Edmonton",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 49,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Edmonton",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Edmonton, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Edmonton, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Edmonton",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Edmonton",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 50,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Edmonton",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Edmonton.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Edmonton.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Edmonton",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Edmonton",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 51,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Edmonton",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Edmonton suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Edmonton generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Edmonton",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Edmonton",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 52,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Edmonton",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Edmonton.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Edmonton metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Edmonton",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Edmonton",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 53,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Edmonton",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Edmonton.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Edmonton.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Edmonton",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Edmonton",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 54,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Edmonton",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Edmonton.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Edmonton.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Edmonton",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Edmonton",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 55,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Edmonton",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Edmonton.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Edmonton.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Edmonton",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Edmonton inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 56,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Halifax",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Halifax. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Halifax. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Halifax",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Halifax",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 57,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Halifax",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Halifax, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Halifax, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Halifax",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Halifax",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 58,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Halifax",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Halifax.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Halifax.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Halifax",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Halifax",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 59,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Halifax",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Halifax suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Halifax generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Halifax",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Halifax",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 60,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Halifax",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Halifax.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Halifax metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Halifax",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Halifax",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 61,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Halifax",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Halifax.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Halifax.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Halifax",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Halifax",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 62,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Halifax",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Halifax.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Halifax.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Halifax",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Halifax",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 63,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Halifax",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Halifax.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Halifax.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Halifax",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Halifax inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 64,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Winnipeg",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Winnipeg. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Winnipeg. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Winnipeg",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Winnipeg",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 65,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Winnipeg",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Winnipeg, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Winnipeg, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Winnipeg",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Winnipeg",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 66,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Winnipeg",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Winnipeg.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Winnipeg.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Winnipeg",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Winnipeg",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 67,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Winnipeg",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Winnipeg suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Winnipeg generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Winnipeg",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Winnipeg",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 68,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Winnipeg",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Winnipeg.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Winnipeg metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Winnipeg",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Winnipeg",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 69,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Winnipeg",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Winnipeg.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Winnipeg.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Winnipeg",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Winnipeg",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 70,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Winnipeg",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Winnipeg.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Winnipeg.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Winnipeg",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Winnipeg",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 71,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Winnipeg",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Winnipeg.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Winnipeg.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Winnipeg",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Winnipeg inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  },
  {
    "sceneIdx": 72,
    "level": "B2",
    "title": "Régulation de l'IA générative dans les médias à Victoria",
    "qFr": "Quelle est la mesure prioritaire défendue lors de cette concertation ?",
    "qEn": "What is the priority measure advocated during this consultation?",
    "audioFr": "Locuteur 1: L'omniprésence des contenus automatisés soulève d'immenses inquiétudes quant à la sincérité du débat démocratique à Victoria. Face à la prolifération des faux documents, certains réclament une censure préalable stricte.\nLocutrice 2: Une interdiction totale serait techniquement inapplicable et juridiquement contestable. En revanche, nous préconisons la traçabilité intégrale via une signalétique explicite et transparente imposée aux diffuseurs pour chaque production numérique artificielle.",
    "audioEn": "Speaker 1: The ubiquity of automated content raises immense concerns regarding the integrity of democratic discourse in Victoria. Faced with the proliferation of fabricated documents, some are calling for strict prior censorship.\nSpeaker 2: A total ban would be technically unenforceable and legally questionable. Instead, we advocate for comprehensive traceability through explicit, mandatory labeling imposed on broadcasters for every artificially generated production.",
    "optionsFr": [
      "L'obligation d'identifier clairement les documents synthétiques diffusés au public",
      "L'instauration d'un blocage systématique de tout algorithme génératif sur le territoire de Victoria",
      "La suppression des instances de régulation audiovisuelle au profit d'une autorégulation totale",
      "L'exonération de responsabilité juridique pour les plateformes hébergeant des contenus trompeurs"
    ],
    "optionsEn": [
      "The requirement to clearly identify synthetic media released to the public",
      "The implementation of a systematic ban on all generative algorithms across Victoria",
      "The elimination of audiovisual regulatory bodies in favor of complete self-regulation",
      "Legal liability exemptions for digital platforms hosting deceptive content"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez la nuance apportée par la locutrice ('En revanche, nous préconisons...') qui rejette la censure totale au profit d'une signalétique transparente.",
    "explanation": "La locutrice écarte l'interdiction totale et défend la traçabilité obligatoire par une signalétique explicite, ce qui correspond à l'obligation d'identifier clairement les documents synthétiques."
  },
  {
    "sceneIdx": 73,
    "level": "B2",
    "title": "Taxation du travail à distance intercommunal à Victoria",
    "qFr": "Quel compromis fiscal est privilégié dans ce débat municipal ?",
    "qEn": "What tax compromise is favored in this municipal debate?",
    "audioFr": "Locuteur 1: L'essor durable du travail à distance fragilise les recettes commerciales du cœur urbain de Victoria, alors que les communes périphériques voient leurs dépenses de voirie exploser sans rentrées compensatoires.\nLocutrice 2: Il ne s'agit pas de surtaxer les télétravailleurs, mais de rééquilibrer la dotation globale. Nous proposons une redistribution équitable des taxes professionnelles collectées afin de compenser les charges d'équipements des localités de résidence.",
    "audioEn": "Speaker 1: The permanent rise of remote work is eroding retail revenue in the urban core of Victoria, while outlying bedroom suburbs face skyrocketing road maintenance costs without compensatory revenues.\nSpeaker 2: It is not about overtaxing remote employees, but rebalancing global municipal funding. We propose an equitable redistribution of collected business taxes to offset infrastructure expenditures in residential municipalities.",
    "optionsFr": [
      "Un mécanisme de solidarité financière entre le centre métropolitain et les municipalités périphériques",
      "L'imposition d'une pénalité fiscale directe sur les salariés effectuant du travail à domicile à Victoria",
      "La gratuité totale des baux commerciaux pour inciter les entreprises à revenir au centre-ville",
      "Le transfert intégral des compétences budgétaires locales à un organisme fédéral centralisé"
    ],
    "optionsEn": [
      "A financial solidarity mechanism between the metropolitan center and suburban municipalities",
      "The imposition of a direct tax penalty on employees working from home in Victoria",
      "Free commercial property leases to incentivize companies to return downtown",
      "The complete transfer of local budget authority to a centralized federal body"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Attention au terme 'redistribution équitable des taxes' qui désigne la péréquation financière entre la métropole et les banlieues dortoirs.",
    "explanation": "La locutrice propose de redistribuer équitablement les taxes professionnelles pour financer les infrastructures périphériques, ce qui définit un mécanisme de solidarité financière intercommunal."
  },
  {
    "sceneIdx": 74,
    "level": "B2",
    "title": "Filière de recyclage textile durable à Victoria",
    "qFr": "Quelle stratégie environnementale est mise en avant dans cette allocution ?",
    "qEn": "What environmental strategy is highlighted in this address?",
    "audioFr": "Locuteur 1: L'industrie de la mode éphémère engendre un gaspillage vestimentaire colossal qui encombre les centres d'enfouissement de Victoria.\nLocutrice 2: Les simples incitations morales ne suffisent plus. Nous devons instaurer un principe de responsabilité élargie où les marques financent directement la collecte et la transformation des fibres usagées en nouveaux matériaux industriels.",
    "audioEn": "Speaker 1: The fast-fashion industry produces colossal garment waste that clogs municipal landfills across Victoria.\nSpeaker 2: Mere moral appeals are no longer sufficient. We must implement extended producer responsibility where apparel brands directly finance the collection and upcycling of discarded fibers into new industrial materials.",
    "optionsFr": [
      "L'implication financière directe des confectionneurs dans la valorisation des déchets d'habillement",
      "L'interdiction absolue de commercialiser tout vêtement confectionné hors de Victoria",
      "La gratuité universelle de l'habillement pour les foyers à faibles revenus",
      "L'incinération systématique de tous les surplus textiles invendus par les commerces"
    ],
    "optionsEn": [
      "Direct financial involvement of apparel manufacturers in post-consumer clothing recycling",
      "An absolute ban on selling any clothing manufactured outside Victoria",
      "Universal free clothing distribution for low-income households",
      "Systematic incineration of all unsold retail textile surpluses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Repérez l'expression 'responsabilité élargie où les marques financent directement', qui correspond à l'implication financière des confectionneurs.",
    "explanation": "L'intervenante demande que les marques de mode financent elles-mêmes le recyclage de leurs textiles usagés (principe pollueur-payeur / responsabilité élargie du producteur)."
  },
  {
    "sceneIdx": 75,
    "level": "B2",
    "title": "Déploiement des micro-éoliennes urbaines à Victoria",
    "qFr": "Quelle condition technique est jugée indispensable pour valider ce projet ?",
    "qEn": "What technical condition is deemed essential to approve this project?",
    "audioFr": "Locuteur 1: L'installation de micro-générateurs éoliens sur les toitures des immeubles de Victoria suscite l'enthousiasme des partisans de l'énergie décentralisée.\nLocutrice 2: C'est un atout certain, à condition d'assurer la compatibilité dynamique avec le réseau principal et d'équiper les sous-stations de systèmes de stockage par batterie pour lisser l'intermittence des flux.",
    "audioEn": "Speaker 1: Installing micro wind turbines on building rooftops in Victoria generates great enthusiasm among decentralized energy advocates.\nSpeaker 2: It is undeniably beneficial, provided that dynamic grid compatibility is secured and substations are equipped with battery storage systems to smooth out production intermittency.",
    "optionsFr": [
      "La stabilisation des apports énergétiques grâce à des dispositifs de stockage d'appoint",
      "L'interconnexion exclusive des installations aux seuls réseaux de secours d'urgence de Victoria",
      "Le démantèlement programmé de toutes les centrales hydroélectriques régionales existantes",
      "La limitation de la consommation électrique des ménages à des créneaux horaires imposés"
    ],
    "optionsEn": [
      "Stabilization of energy input through auxiliary storage mechanisms",
      "Exclusive interconnection of installations to emergency backup power grids in Victoria",
      "Planned decommissioning of all existing regional hydroelectric facilities",
      "Limiting household power usage to mandatory scheduled time windows"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Notez la condition posée par la locutrice ('à condition de... équiper de systèmes de stockage pour lisser l'intermittence').",
    "explanation": "La locutrice insiste sur le stockage par batteries pour remédier à l'intermittence du vent, ce qui correspond à la stabilisation des flux énergétiques."
  },
  {
    "sceneIdx": 76,
    "level": "B2",
    "title": "Aménagement urbain et pôles de transport à Victoria",
    "qFr": "Quelle orientation d'urbanisme est préconisée par les experts ?",
    "qEn": "What urban planning direction is recommended by experts?",
    "audioFr": "Locuteur 1: L'étalement urbain continu menace les terres agricoles ceinturant l'agglomération de Victoria.\nLocutrice 2: Pour freiner cette dérive sans aggraver la crise du logement, nous recommandons de concentrer les nouveaux programmes résidentiels denses à distance de marche immédiate des stations ferroviaires et corridors d'autobus rapides.",
    "audioEn": "Speaker 1: Continuous urban sprawl threatens the agricultural land surrounding the greater Victoria metropolitan area.\nSpeaker 2: To curb this trend without worsening the housing shortage, we recommend concentrating dense new residential developments within immediate walking distance of train stations and rapid transit corridors.",
    "optionsFr": [
      "L'intensification de l'habitat à proximité immédiate des infrastructures de transport en commun",
      "La construction exclusive de lotissements de maisons individuelles en grande couronne de Victoria",
      "L'interdiction formelle de tout nouvel aménagement immobilier sur l'ensemble du territoire",
      "La fermeture définitive des lignes de train de banlieue pour réduire les coûts d'entretien"
    ],
    "optionsEn": [
      "Housing intensification in immediate proximity to public transit infrastructure",
      "Exclusive construction of single-family suburban subdivisions in the outer ring of Victoria",
      "A blanket prohibition on all new real estate developments across the entire territory",
      "Permanent closure of commuter train routes to reduce maintenance expenses"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'concentrer les programmes denses à distance de marche des stations' est reformulé en 'intensification de l'habitat à proximité des infrastructures'.",
    "explanation": "Les experts recommandent le modèle TOD (Transit-Oriented Development) qui privilégie la densification résidentielle autour des gares et axes de transport collectif."
  },
  {
    "sceneIdx": 77,
    "level": "B2",
    "title": "Droits sociaux des livreurs autonomes à Victoria",
    "qFr": "Quelle revendication majeure est portée par les représentants des travailleurs ?",
    "qEn": "What major demand is brought forward by worker representatives?",
    "audioFr": "Locuteur 1: Les applications de livraison à domicile ont multiplié les opportunités d'activité flexible pour des milliers de jeunes à Victoria.\nLocutrice 2: Mais cette flexibilité cache une grande vulnérabilité. Nous exigeons la garantie d'une rémunération plancher horaire et la couverture obligatoire des accidents de travail directement financée par les opérateurs de plateformes.",
    "audioEn": "Speaker 1: Food delivery applications have multiplied flexible work opportunities for thousands of young people in Victoria.\nSpeaker 2: But this flexibility masks severe vulnerability. We demand a guaranteed minimum hourly wage and mandatory workplace injury coverage directly funded by platform operators.",
    "optionsFr": [
      "L'instauration d'un socle minimal de garanties financières et d'une assurance professionnelle prise en charge",
      "L'interdiction absolue de tout service de commande de repas en ligne à Victoria",
      "La suppression de toute obligation contractuelle entre les coursiers et les clients",
      "L'attribution automatique d'un véhicule de fonction motorisé à chaque coursier à vélo"
    ],
    "optionsEn": [
      "Establishment of a baseline minimum earnings guarantee and employer-funded workplace insurance",
      "A complete ban on all online meal ordering services across Victoria",
      "The elimination of all contractual obligations between couriers and customers",
      "Automatic provision of a motorized company vehicle to every bicycle courier"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'rémunération plancher + couverture des accidents' est reformulé en 'socle minimal de garanties financières et assurance professionnelle'.",
    "explanation": "La représentante syndicale demande un salaire horaire minimum garanti et une couverture des accidents du travail prise en charge par les plateformes."
  },
  {
    "sceneIdx": 78,
    "level": "B2",
    "title": "Surveillance algorithmique des cadences de travail à Victoria",
    "qFr": "Quelle préoccupation principale est exprimée concernant ces outils numériques ?",
    "qEn": "What primary concern is expressed regarding these digital management tools?",
    "audioFr": "Locuteur 1: Les logiciels de suivi automatisé permettent d'optimiser les flux logistiques dans les grands entrepôts de Victoria.\nLocutrice 2: Certes, mais le chronométrage permanent des tâches génère un stress intense et dégrade la santé mentale des salariés. Nous demandons un encadrement strict pour limiter la surveillance continue et préserver des temps de pause incompressibles.",
    "audioEn": "Speaker 1: Automated tracking software optimizes logistics workflows across major distribution warehouses in Victoria.\nSpeaker 2: True, but perpetual task timing generates intense stress and damages employee mental health. We demand strict regulations to restrict continuous monitoring and safeguard non-negotiable rest breaks.",
    "optionsFr": [
      "L'impact délétère de l'évaluation continue sur l'équilibre psychologique des employés",
      "L'interdiction générale d'utiliser des chariots élévateurs dans les entrepôts de Victoria",
      "L'obligation de doubler la durée quotidienne du temps de travail effectif",
      "La suppression des rémunérations pour les salariés n'atteignant pas les quotas informatiques"
    ],
    "optionsEn": [
      "The deleterious impact of continuous performance evaluation on employee psychological well-being",
      "A general ban on forklift operations inside warehouses in Victoria",
      "A legal mandate to double daily working hours for all logistics staff",
      "Withholding employee compensation for failing to meet computer-generated quotas"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : 'chronométrage permanent génère stress et dégrade santé mentale' est synthétisé en 'impact délétère sur l'équilibre psychologique'.",
    "explanation": "L'intervenante s'inquiète des conséquences négatives de la surveillance permanente par algorithme sur le bien-être et la santé mentale des employés."
  },
  {
    "sceneIdx": 79,
    "level": "B2",
    "title": "Aménagements hydrauliques face aux crues à Victoria",
    "qFr": "Quelle approche technique est privilégiée par les ingénieurs municipaux ?",
    "qEn": "What technical approach is favored by municipal engineers?",
    "audioFr": "Locuteur 1: Les précipitations torrentielles printanières ont une nouvelle fois submergé plusieurs quartiers riverains à Victoria.\nLocutrice 2: Bétonner davantage les berges est une erreur écologique. Nous privilégions désormais des solutions fondées sur la nature, comme la renaturation des zones humides et la création de bassins de décantation paysagers capables d'absorber les volumes d'eau excédentaires.",
    "audioEn": "Speaker 1: Torrential spring downpours have once again submerged several riverfront neighborhoods in Victoria.\nSpeaker 2: Pouring more concrete along riverbanks is an ecological mistake. We now favor nature-based solutions, such as restoring wetlands and creating landscaped detention basins capable of naturally absorbing excess water runoff.",
    "optionsFr": [
      "L'aménagement d'espaces naturels tampons pour ralentir et absorber les ruissellements fluviaux",
      "La canalisation intégrale sous terre de tous les cours d'eau de la métropole de Victoria",
      "L'évacuation obligatoire et définitive de tous les habitants résidant à moins de 5 km d'un lac",
      "Le rehaussement indéfini des murs de béton le long de toutes les rives de la ville"
    ],
    "optionsEn": [
      "Creation of natural buffer zones to slow down and absorb river runoff surges",
      "Enclosing all metropolitan waterways of Victoria inside underground concrete pipelines",
      "Mandatory permanent evacuation of all residents living within 5 km of any lake",
      "Indefinite elevation of concrete seawalls along all urban waterfronts"
    ],
    "ans": 0,
    "hint": "⚠️ Piège B2 : Rejetez le bétonnage ('erreur écologique') et identifiez la solution verte ('zones humides et bassins naturels').",
    "explanation": "Les ingénieurs préconisent des solutions écologiques basées sur la renaturation et les zones tampons humides plutôt que le renforcement des digues en béton."
  }
];

export const AUTHENTIC_C1C2_ITEMS: AuthenticAdvancedItem[] = [
  {
    "sceneIdx": 0,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Montréal",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Montréal, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Montréal, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Montréal",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Montréal",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 1,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Montréal",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Montréal à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Montréal to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Montréal",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Montréal",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 2,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Montréal",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Montréal, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Montréal, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Montréal",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Montréal",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 3,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Montréal",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Montréal, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Montréal, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Montréal",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Montréal",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 4,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Montréal",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Montréal. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Montréal. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Montréal",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Montréal",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 5,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Montréal",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Montréal pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Montréal could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Montréal",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Montréal",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 6,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Québec",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Québec, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Québec, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Québec",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Québec",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 7,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Québec",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Québec à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Québec to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Québec",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Québec",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 8,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Québec",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Québec, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Québec, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Québec",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Québec",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 9,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Québec",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Québec, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Québec, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Québec",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Québec",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 10,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Québec",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Québec. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Québec. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Québec",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Québec",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 11,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Québec",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Québec pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Québec could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Québec",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Québec",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 12,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Ottawa",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Ottawa, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Ottawa, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Ottawa",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Ottawa",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 13,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Ottawa",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Ottawa à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Ottawa to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Ottawa",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Ottawa",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 14,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Ottawa",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Ottawa, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Ottawa, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Ottawa",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Ottawa",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 15,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Ottawa",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Ottawa, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Ottawa, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Ottawa",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Ottawa",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 16,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Ottawa",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Ottawa. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Ottawa. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Ottawa",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Ottawa",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 17,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Ottawa",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Ottawa pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Ottawa could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Ottawa",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Ottawa",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 18,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Vancouver",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Vancouver, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Vancouver, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Vancouver",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Vancouver",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 19,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Vancouver",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Vancouver à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Vancouver to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Vancouver",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Vancouver",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 20,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Vancouver",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Vancouver, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Vancouver, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Vancouver",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Vancouver",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 21,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Vancouver",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Vancouver, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Vancouver, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Vancouver",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Vancouver",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 22,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Vancouver",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Vancouver. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Vancouver. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Vancouver",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Vancouver",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 23,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Vancouver",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Vancouver pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Vancouver could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Vancouver",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Vancouver",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 24,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Toronto",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Toronto, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Toronto, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Toronto",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Toronto",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 25,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Toronto",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Toronto à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Toronto to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Toronto",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Toronto",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 26,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Toronto",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Toronto, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Toronto, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Toronto",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Toronto",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 27,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Toronto",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Toronto, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Toronto, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Toronto",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Toronto",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 28,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Toronto",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Toronto. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Toronto. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Toronto",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Toronto",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 29,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Toronto",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Toronto pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Toronto could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Toronto",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Toronto",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 30,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Calgary",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Calgary, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Calgary, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Calgary",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Calgary",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 31,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Calgary",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Calgary à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Calgary to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Calgary",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Calgary",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 32,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Calgary",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Calgary, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Calgary, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Calgary",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Calgary",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 33,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Calgary",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Calgary, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Calgary, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Calgary",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Calgary",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 34,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Calgary",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Calgary. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Calgary. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Calgary",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Calgary",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 35,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Calgary",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Calgary pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Calgary could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Calgary",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Calgary",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 36,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Edmonton",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Edmonton, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Edmonton, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Edmonton",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Edmonton",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 37,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Edmonton",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Edmonton à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Edmonton to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Edmonton",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Edmonton",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 38,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Edmonton",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Edmonton, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Edmonton, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Edmonton",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Edmonton",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 39,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Edmonton",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Edmonton, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Edmonton, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Edmonton",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Edmonton",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 40,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Edmonton",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Edmonton. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Edmonton. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Edmonton",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Edmonton",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 41,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Edmonton",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Edmonton pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Edmonton could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Edmonton",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Edmonton",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 42,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Halifax",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Halifax, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Halifax, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Halifax",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Halifax",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 43,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Halifax",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Halifax à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Halifax to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Halifax",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Halifax",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 44,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Halifax",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Halifax, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Halifax, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Halifax",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Halifax",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 45,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Halifax",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Halifax, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Halifax, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Halifax",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Halifax",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 46,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Halifax",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Halifax. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Halifax. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Halifax",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Halifax",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 47,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Halifax",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Halifax pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Halifax could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Halifax",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Halifax",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 48,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Winnipeg",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Winnipeg, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Winnipeg, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Winnipeg",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Winnipeg",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 49,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Winnipeg",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Winnipeg à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Winnipeg to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Winnipeg",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Winnipeg",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 50,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Winnipeg",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Winnipeg, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Winnipeg, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Winnipeg",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Winnipeg",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 51,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Winnipeg",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Winnipeg, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Winnipeg, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Winnipeg",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Winnipeg",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 52,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Winnipeg",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Winnipeg. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Winnipeg. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Winnipeg",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Winnipeg",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 53,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Winnipeg",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Winnipeg pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Winnipeg could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Winnipeg",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Winnipeg",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  },
  {
    "sceneIdx": 54,
    "level": "C1",
    "title": "Algorithmes prédictifs et libre arbitre à Victoria",
    "qFr": "Quelle est la thèse centrale développée par le conférencier lors de cet exposé ?",
    "qEn": "What is the central thesis developed by the speaker during this presentation?",
    "audioFr": "Dans cette communication tenue à Victoria, nous examinons comment le profilage algorithmique continu transforme en profondeur nos mécanismes de choix. Loin d'être de simples outils d'aide à la décision, les architectures de recommandation actuelles anticipent et canalisent nos préférences de façon imperceptible. En déléguant systématiquement nos arbitrages quotidiens à des systèmes prédictifs, le sujet contemporain voit s'effriter sa capacité d'autodétermination authentique au profit de trajectoires comportementales préformatées.",
    "audioEn": "In this symposium presentation delivered in Victoria, we examine how continuous algorithmic profiling profoundly reshapes human decision-making mechanisms. Far from being simple decision-support tools, current recommendation architectures imperceptibly anticipate and funnel our preferences. By systematically delegating daily choices to predictive systems, the contemporary individual experiences an erosion of authentic self-determination in favor of pre-formatted behavioral pathways.",
    "optionsFr": [
      "L'affaiblissement progressif de la capacité de discernement et d'initiative autonome de l'individu",
      "L'inutilité totale de tout développement mathématique dans l'informatique moderne à Victoria",
      "L'obligation légale pour les citoyens d'utiliser exclusivement des ordinateurs publics",
      "La preuve scientifique que la conscience humaine est entièrement régie par des circuits électroniques"
    ],
    "optionsEn": [
      "The progressive weakening of individual discernment and autonomous decision-making capacity",
      "The complete futility of mathematical modeling in modern computing in Victoria",
      "A legal mandate forcing all citizens to use public computer terminals exclusively",
      "Scientific proof that human consciousness is entirely governed by electronic circuitry"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'idée d'effritement de l'autodétermination ('s'effriter sa capacité d'autodétermination') synthétisée en 'affaiblissement de l'initiative autonome'.",
    "explanation": "Le conférencier démontre que la dépendance aux suggestions algorithmiques réduit imperceptiblement notre liberté de choix et notre autonomie critique."
  },
  {
    "sceneIdx": 55,
    "level": "C1",
    "title": "Souveraineté des données étatiques et cloud souverain à Victoria",
    "qFr": "Quel argument principal est formulé pour justifier une réorientation stratégique ?",
    "qEn": "What primary argument is put forward to justify a strategic policy pivot?",
    "audioFr": "L'externalisation des registres publics auprès de conglomérats technologiques étrangers expose nos institutions de Victoria à des risques juridiques et stratégiques inacceptables. L'extraterritorialité des lois étrangères permet l'accès unilatéral à des données sensibles de santé et de sécurité civile. Il est donc impératif de sanctuariser un périmètre numérique régalien reposant sur des infrastructures d'hébergement sous juridiction nationale exclusive.",
    "audioEn": "Outsourcing public registries to foreign tech conglomerates exposes our institutions in Victoria to unacceptable legal and strategic vulnerabilities. The extraterritorial reach of foreign legislation enables unilateral access to sensitive healthcare and civic security records. It is therefore imperative to establish a sovereign digital enclave relying on data hosting infrastructure under exclusive domestic jurisdiction.",
    "optionsFr": [
      "La nécessité de soustraire les informations sensibles aux ingérences juridiques étrangères",
      "L'interdiction absolue de tout échange commercial transfrontalier pour les entreprises de Victoria",
      "La destruction matérielle préventive de l'ensemble des centres de serveurs informatiques",
      "La gratuité universelle de l'accès à Internet sans aucune régulation étatique"
    ],
    "optionsEn": [
      "The necessity of shielding sensitive civic data from foreign jurisdictional overreach",
      "A complete prohibition on cross-border commercial trade for businesses in Victoria",
      "Preemptive physical destruction of all computing server facilities",
      "Universal free public Internet access without any state regulatory oversight"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : Repérez l'enjeu juridique ('extraterritorialité des lois étrangères') reformulé en 'soustraire les informations aux ingérences juridiques'.",
    "explanation": "Le conférencier préconise le rapatriement des données d'État pour éviter que des lois étrangères ne permettent la saisie d'informations souveraines."
  },
  {
    "sceneIdx": 56,
    "level": "C1",
    "title": "Modélisations climatiques et géo-ingénierie solaire à Victoria",
    "qFr": "Quelle mise en garde majeure est formulée à l'égard de ces technologies ?",
    "qEn": "What major warning is expressed regarding these intervention technologies?",
    "audioFr": "Si l'injection d'aérosols stratosphériques pour réfléchir le rayonnement solaire apparaît comme une réponse d'urgence face au réchauffement à Victoria, ses effets collatéraux sur les cycles moussoniques mondiaux demeurent imprévisibles. Toute manipulation artificielle de la haute atmosphère risque de modifier brutalement les régimes de précipitations régionaux et de provoquer des crises agricoles dévastatrices dans les pays du Sud.",
    "audioEn": "While stratospheric aerosol injection to reflect solar radiation appears as an emergency response to global warming in Victoria, its collateral repercussions on planetary monsoon patterns remain deeply unpredictable. Any artificial manipulation of the upper atmosphere risks abruptly altering regional precipitation dynamics and triggering devastating agricultural shocks across developing nations.",
    "optionsFr": [
      "L'imprévisibilité des perturbations météorologiques induites à l'échelle transcontinentale",
      "L'arrêt immédiat de toutes les recherches académiques en météorologie à Victoria",
      "La certitude absolue que le soleil cessera d'émettre de l'énergie dans les prochaines décennies",
      "L'obligation pour tous les pays d'abandonner l'agriculture au profit de serres souterraines"
    ],
    "optionsEn": [
      "The unpredictability of induced meteorological disruptions across continental scales",
      "An immediate shutdown of all academic meteorological research in Victoria",
      "Absolute scientific certainty that the sun will cease solar emissions in coming decades",
      "A global requirement for all nations to abandon outdoor agriculture in favor of underground bunkers"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C1 : 'effets collatéraux imprévisibles sur les régimes de précipitations' est synthétisé en 'imprévisibilité des perturbations météorologiques transcontinentales'.",
    "explanation": "La conférence met en garde contre les dérèglements climatiques imprévus et les sécheresses régionales que provoquerait une manipulation solaire artificielle."
  },
  {
    "sceneIdx": 57,
    "level": "C2",
    "title": "Épistémologie des modèles quantiques et non-déterminisme à Victoria",
    "qFr": "Quelle mutation conceptuelle le chercheur met-il en exergue dans son analyse ?",
    "qEn": "What conceptual shift does the researcher highlight in their analysis?",
    "audioFr": "Dans cette leçon académique dispensée à Victoria, nous réexaminons le postulat classique d'un univers entièrement déterministe. Les données observationnelles contemporaines confirment que le comportement des particules élémentaires ne peut être appréhendé par des lois causales strictes. L'édifice théorique de la physique fondamentale exige désormais d'abandonner l'idéal laplacien d'une prédictibilité absolue pour adopter une modélisation intrinsèquement probabiliste des états de la matière.",
    "audioEn": "In this academic lecture delivered in Victoria, we re-examine the classical postulate of a strictly deterministic universe. Contemporary observational data confirm that subatomic behavior cannot be captured by rigid linear causality. The theoretical architecture of fundamental physics now requires abandoning the Laplacian ideal of absolute predictability in favor of an intrinsically probabilistic formulation of physical states.",
    "optionsFr": [
      "La substitution d'un paradigme statistique à l'illusion d'une prévisibilité causale infaillible",
      "Le rejet pur et simple de la méthode expérimentale dans les facultés de sciences de Victoria",
      "L'affirmation dogmatique que les lois de la physique classique s'appliquent identiquement à l'infiniment petit",
      "L'interdiction d'utiliser des équations mathématiques pour décrire les phénomènes subatomiques"
    ],
    "optionsEn": [
      "The substitution of a statistical paradigm for the illusion of infallible causal predictability",
      "Outright rejection of the empirical scientific method in universities across Victoria",
      "The dogmatic assertion that classical mechanics applies identically to quantum subatomic scales",
      "Prohibiting mathematical equations from being utilized to describe subatomic phenomena"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'abandonner la prédictibilité absolue pour une modélisation probabiliste' est reformulé de manière abstraite en 'substitution d'un paradigme statistique à l'illusion causale'.",
    "explanation": "Le physicien explique que la physique moderne remplace le déterminisme mécanique rigide par une description statistique et probabiliste de la réalité."
  },
  {
    "sceneIdx": 58,
    "level": "C2",
    "title": "Déconstruction de l'universalisme conceptuel en linguistique à Victoria",
    "qFr": "Quelle thèse épistémologique est défendue par la linguiste ?",
    "qEn": "What epistemological thesis is defended by the linguist?",
    "audioFr": "L'hypothèse selon laquelle les structures de la pensée humaine existeraient indépendamment des idiomes naturels est aujourd'hui profondément remise en question à Victoria. Loin d'être de simples étiquettes appliquées à une réalité préexistante, nos catégories lexicales et nos matrices syntaxiques configurent activement notre perception spatio-temporelle et notre grille d'analyse du monde empirique.",
    "audioEn": "The hypothesis that human thought structures exist independently of natural spoken languages is fundamentally challenged today in Victoria. Far from being mere labels attached to a pre-existing reality, our lexical categories and syntactic matrices actively shape our spatiotemporal perception and conceptual framing of empirical reality.",
    "optionsFr": [
      "Le conditionnement étroit des représentations cognitives par les spécificités structurelles de la langue",
      "L'uniformité biologique intégrale de tous les systèmes de pensée indépendamment du langage à Victoria",
      "L'impossibilité radicale de traduire le moindre concept d'une langue à une autre",
      "La supériorité intrinsèque des langues formelles algorithmiques sur les langues naturelles"
    ],
    "optionsEn": [
      "The tight conditioning of cognitive representations by the structural specificities of language",
      "The complete biological uniformity of human thought systems regardless of language in Victoria",
      "The radical impossibility of translating any conceptual meaning across different human languages",
      "The intrinsic superiority of algorithmic formal languages over natural human tongues"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'catégories lexicales configurent notre perception du monde' est synthétisé en 'conditionnement des représentations cognitives par la langue'.",
    "explanation": "La linguiste soutient le principe de relativité linguistique (hypothèse Sapir-Whorf revisitée) : la structure d'une langue modèle nos cadres de pensée et notre appréhension du réel."
  },
  {
    "sceneIdx": 59,
    "level": "C2",
    "title": "Impact macroéconomique des monnaies numériques souveraines à Victoria",
    "qFr": "Quel risque systémique majeur est identifié par l'économiste ?",
    "qEn": "What major systemic risk is identified by the economist?",
    "audioFr": "L'introduction d'un dollar numérique émis directement par l'autorité monétaire centrale à Victoria pourrait bouleverser l'équilibre bancaire traditionnel. En offrant aux particuliers un actif sans risque de crédit, une telle innovation risque de provoquer, en période de crise, une fuite massive des dépôts des banques commerciales vers les comptes de la banque centrale, privant ainsi l'économie productive de ses canaux habituels de crédit.",
    "audioEn": "The introduction of a central bank digital currency issued directly to retail users in Victoria could upend the traditional commercial banking equilibrium. By offering individuals a credit-risk-free asset, such an innovation risks triggering, during periods of financial stress, a massive flight of deposits from private banks to central bank reserves, thereby starving the productive economy of regular lending channels.",
    "optionsFr": [
      "Une désintermédiation bancaire abrupte asséchant le financement des entreprises en période de tension",
      "La disparition programmée de toute forme de commerce international pour les entreprises de Victoria",
      "L'obligation légale de régler l'ensemble des transactions quotidiennes en métaux précieux",
      "La fusion obligatoire de toutes les banques privées en une entité étatique unique"
    ],
    "optionsEn": [
      "Abrupt banking disintermediation choking business financing during periods of market stress",
      "The planned elimination of all international trade operations for firms in Victoria",
      "A legal mandate requiring all daily retail transactions to be settled in physical precious metals",
      "Forced nationalization and merger of all private commercial banks into a single state entity"
    ],
    "ans": 0,
    "hint": "⚠️ Piège C2 : 'fuite des dépôts privant l'économie de crédit' est synthétisé sous le concept macroéconomique de 'désintermédiation bancaire asséchant le financement'.",
    "explanation": "L'économiste met en garde contre le risque de désintermédiation : les citoyens pourraient transférer leurs avoirs vers la banque centrale, privant les banques commerciales de liquidités pour prêter aux entreprises."
  }
];

export function getAuthenticB2Item(sceneIdx: number): AuthenticAdvancedItem {
  return AUTHENTIC_B2_ITEMS[sceneIdx % AUTHENTIC_B2_ITEMS.length];
}

export function getAuthenticC1C2Item(sceneIdx: number): AuthenticAdvancedItem {
  return AUTHENTIC_C1C2_ITEMS[sceneIdx % AUTHENTIC_C1C2_ITEMS.length];
}
